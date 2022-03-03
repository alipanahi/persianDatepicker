const miladi_month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const shamsi_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
const shamsi_months = ["حمل", "ثور", "جوزا", "سرطان","اسد","سنبله","میزان","عقرب","قوس","جدی","دلو","حوت"]
const miladi_months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
//create all elements needed for datepicker inside body
let body = document.getElementsByTagName('body')[0]
let section = document.createElement('section')//main container
section.setAttribute('id','container')
body.appendChild(section)
let sectionContent = `
<header>
    <button class="today" id="todayBtn">امروز</button>
    <h1><span id="shamsiDate"></span></h1>
    <div class="week-days" dir="rtl">
        <p>ش</p>
        <p>ی</p>
        <p>د</p>
        <p>س</p>
        <p>چ</p>
        <p>پ</p>
        <p>ج</p>
    </div>
    <div id="days" dir="rtl"></div>
</header>
<div class="actions">
    <button id="nextMonth" aria-label="Previous Slidex"><</button>
    <button id="previousMonth" aria-label="Next Slide">></button>
</div>
<div id="modal" style="display:none">
    <select id="select_year"></select>
    <select id="select_month"></select>
    <button id="modalBtn" class="modalBtn">انتخاب</button>
</div>
`
section.innerHTML = sectionContent
section.style.display='none'
//DOMs
const shamsiDateSpan = document.getElementById('shamsiDate')
const daysDiv = document.getElementById('days')
const nextBtn = document.getElementById('nextMonth')
const previousBtn = document.getElementById('previousMonth')
const modalOpen = document.getElementById('modalBtn')
const todayBtn = document.getElementById('todayBtn')
let selectedMonth = 0//selected month by action buttons and dropdowns
let selectedYear = 0//selected year by action buttons and dropdowns
let currentSYear = 0//the current year shamsi
let currentSMonth = 0//the current month shamsi
let currentSDay = 0//the current day shamsi
let isCurrentMoth = true//used for highlight the current day
let paired = []//used for pairing the shamsi days with its corresponding miladi days
let settings = {format:"yyyy/mm/dd",autoClose:true,dateSeperator:"/"}
nextBtn.addEventListener('click',loadNextMonth)
previousBtn.addEventListener('click',loadPreviousMonth)
shamsiDateSpan.addEventListener('click',LoadModal)
modalOpen.addEventListener('click',renderModal)
todayBtn.addEventListener('click',renderToday)
//according to today's date, render the current month
let unixdate = Date.now()
let today = new Date(unixdate)
let todayDate = today.toLocaleDateString()
let todayArray = todayDate.split('/')
let miladi_m = todayArray[0]//current miladi month
let miladi_d = todayArray[1]//current miladi day
let miladi_y = todayArray[2]//current miladi year

let shamsiDate = dateToShamsi(miladi_y,miladi_m,miladi_d)//convert the current date to shamsi
renderCalendar(shamsiDate[0],shamsiDate[1],shamsiDate[2])//load the calendar base on current date
//event for today button listener to render the current month
function renderToday(){
    //empty old data
    shamsiDateSpan.innerHTML=''
    daysDiv.innerHTML=''
    isCurrentMoth = false

    selectedYear = shamsiDate[0]
    selectedMonth = shamsiDate[1]

    renderCalendar(shamsiDate[0],shamsiDate[1],shamsiDate[2])
}
//function to convert the miladi date to shamsi
function dateToShamsi(miladi_y,miladi_m,miladi_d){

    let mY = miladi_y-1600
    let mM = miladi_m-1
    let mD = miladi_d-1
    let miladi_day_no = 365*mY+div(mY+3,4)-div(mY+99,100)+div(mY+399,400);

    for (let i=0; i < mM; ++i){
        miladi_day_no += miladi_month_days[i]
    }

    if (mM>1 && ((mY%4==0 && mY%100!=0) || (mY%400==0))){
        /* leap and after Feb */
        ++miladi_day_no
    }

    miladi_day_no += mD

    let shamsi_day_no = miladi_day_no-79
    let shamsi_np = div(shamsi_day_no, 12053)

    shamsi_day_no %= 12053

    let sY = 979+33*shamsi_np+4*div(shamsi_day_no,1461)

    shamsi_day_no %= 1461;
    if (shamsi_day_no >= 366) {
        sY += div(shamsi_day_no-1, 365);
        shamsi_day_no = (shamsi_day_no-1)%365;
    }

    let day = 0;
    for (let i = 0; i < 11 && shamsi_day_no >= shamsi_month_days[i]; ++i) {
        shamsi_day_no -= shamsi_month_days[i];
        day = i+1 
    }
    let sM = day + 1
    selectedMonth = sM
    selectedYear = sY
    currentSMonth = sM
    currentSYear = sY
    let sD = shamsi_day_no+1
    currentSDay = sD
    return [sY,sM,sD]
}
//main function to render the calendar base on given date
function renderCalendar(sY,sM,sD){
    //check if redndering current month to display the current day
    if(sM == currentSMonth || sM == 0){
        isCurrentMoth = true
    }
    shamsiDateSpan.textContent=sY+' '+shamsi_months[sM-1]//shamsi month header

    let sMiladiArray = dateToMiladi(sY,sM,1)//get the miladi date of start date for pairing and day week
    let shamsiLeapMonth = shamsi_month_days[sM-1]//as array index starts from 0, then -1 to get the real one
    if(sM ==12 && shamsiIsLeap(sY)){//month 12 and leap year
        shamsiLeapMonth = 30
    }
    let eMiladiArray = dateToMiladi(sY,sM,shamsiLeapMonth)//miladi date of end day of shamsi month
    
    //pairing shamsi with correspond miladi day
    pairShamsiWithMiladi(sMiladiArray[0],sMiladiArray[1],sMiladiArray[2],eMiladiArray[2])
    //finding the first day of shamsi of the current month
    //0:sun ... 6: sat
    let sWeekDay = new Date(sMiladiArray[0],sMiladiArray[1]-1,sMiladiArray[2]).getDay()
    let eWeekDay = new Date(eMiladiArray[0],eMiladiArray[1]-1,eMiladiArray[2]).getDay()
    if(sWeekDay != 6){
        for(let j = 0;j<=sWeekDay;j++){
            let squar = document.createElement('span')
            squar.classList.add('day')
            daysDiv.appendChild(squar)
        }
    }

    for(let i = 1; i <= shamsiLeapMonth; i++){
        let squar = document.createElement('div')
        squar.setAttribute('id','day_'+i)
        squar.setAttribute('onclick','putDate('+i+')')
        squar.classList.add('day')
        if(i==currentSDay && isCurrentMoth){
            squar.classList.add('current-day')
        }
        daysDiv.appendChild(squar)
        let sSpan = document.createElement('span')
        sSpan.classList.add('shamsi_day')
        sSpan.textContent=i
        document.getElementById('day_'+i).appendChild(sSpan)
        
        

    }
    if(eWeekDay != 6){
        for(let j = eWeekDay;j<5;j++){
            let squar = document.createElement('span')
            squar.classList.add('day')
            daysDiv.appendChild(squar)
        }
    }else{
        let squar = document.createElement('span')
        squar.classList.add('day')
        daysDiv.appendChild(squar)
    }
}
//function to convert the shamsi date to miladi
function dateToMiladi(y,m,d){
    let shY = y-979
    let shM = m-1
    let shD = d-1
    let sh_day_no = 365*shY + div(shY,33)*8 + div(((shY%33)+3),4)

    for (let i=0; i < shM; ++i){
        sh_day_no += shamsi_month_days[i]
    }
    
    sh_day_no += shD
    let m_day_no = sh_day_no+79

    let miY = 1600+400*div(m_day_no,146097)
    m_day_no =m_day_no%146097
    let leap=1

    if (m_day_no >= 36525) {
        m_day_no =m_day_no-1
        //36524 = 365*100 + 100/4 - 100/100
        miY +=100* div(m_day_no,36524)
        m_day_no=m_day_no % 36524

        if(m_day_no>=365){
            m_day_no = m_day_no+1
        }
        else{
            leap=0
        }
    }
    miY += 4*div(m_day_no,1461)
    m_day_no %=1461
    if(m_day_no>=366)
    {
        leap=0
        m_day_no=m_day_no-1
        miY += div(m_day_no,365)
        m_day_no=m_day_no %365
    }
    let i=0
    let tmp=0
    while (m_day_no>= (miladi_month_days[i]+tmp))
    {
        if(i==1 && leap==1){
            tmp=1
        }else{
            tmp=0
        }
        m_day_no -= miladi_month_days[i]+tmp
        i=i+1
    }
    let miM=i+1
    let miD=m_day_no+1
    return [miY,miM,miD]
    
}
//doing MOD %
function div(a, b) {
    return Math.floor(a / b);
 }
 //funtion for render next month
 function loadNextMonth(){
     //clear old date
    shamsiDateSpan.innerHTML=''
    daysDiv.innerHTML=''
    isCurrentMoth = false

    if(selectedMonth == 12){//if the current month is 12, then the next month is the first month of next year
        selectedMonth = 1
        selectedYear = selectedYear+1
    }
    else{
        selectedMonth = selectedMonth+1
    }
    
    renderCalendar(selectedYear,selectedMonth,1)
 }
 //funtion for render the previous month
 function loadPreviousMonth(){
     //empty old date
    shamsiDateSpan.innerHTML=''
    daysDiv.innerHTML=''
    isCurrentMoth = false

    if(selectedMonth == 1){//if the current is first month
        selectedMonth = 12//the previous is the 12th month of last year
        selectedYear = selectedYear-1
    }
    else{
        selectedMonth = selectedMonth-1
    }
    
    renderCalendar(selectedYear,selectedMonth,1)
 }
 //pairing the shamsi date with its corresponing miladi date to show on calendar
 function pairShamsiWithMiladi(mSY,mSM,mSD,mED){
    let miladiLeapMonth = miladi_month_days[mSM-1]//as array index start from 0, -1 to get the real one
    if(mSM == 2 && miladiIsLeap(mSY)){//if it is Feb and leap year
        miladiLeapMonth = 29
    }
    paired = []
    while(mSD <= miladiLeapMonth){//pair the first month of miladi in shamsi month
        paired.push(mSD) 
        mSD++
    }
    paired.push(miladi_months[mSM])
    for(let j = 2;j<=mED;j++){//pair the second month of miladi
        paired.push(j) 
    }
}
//check if miladi year is leap
function miladiIsLeap (year)
{
    return ((year%4) == 0 && ((year%100) != 0 || (year%400) == 0));
}
//check if shamsi date is leap  
function shamsiIsLeap (year)
{
    year = (year - 474) % 128;
    year = ((year >= 30) ? 0 : 29) + year;
    year = year -Math.floor(year/33) - 1;
    return ((year % 4) == 0);
}
//load modal for selecting year and month
function LoadModal(){
    for(let i=currentSYear-50;i<=currentSYear+1;i++){
        let option = document.createElement('option')
        option.setAttribute('value',i)
        if(i==selectedYear){
            option.setAttribute('selected','selected')
        }
        option.textContent=i
        document.getElementById('select_year').appendChild(option)
    }
    for (let i = 0;i<shamsi_months.length;i++){
        let option = document.createElement('option')
        option.setAttribute('value',i+1)
        if(i+1==selectedMonth){
            option.setAttribute('selected','selected')
        }
        option.textContent=shamsi_months[i]
        document.getElementById('select_month').appendChild(option)
    }
    document.getElementById('modal').style.display= "block";
    
}
 
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display= "none";
    }
    
}
//render the calendar base on date from modal
function renderModal(){
    //take the value from select boxes
    let modalYear = document.getElementById('select_year').value
    let modalMonth = document.getElementById('select_month').value
    //clear old date
    shamsiDateSpan.innerHTML=''
    daysDiv.innerHTML=''
    isCurrentMoth = false
    //convet the value to integer
    selectedYear = parseInt(modalYear)
    selectedMonth = parseInt(modalMonth)

    document.getElementById('modal').style.display= "none";
    renderCalendar(modalYear,modalMonth,1)
}
window.addEventListener('mouseup', function(e) {
    if(e.target.classList == 'datepicker'){
        e.target.addEventListener('click',loadDatepicer(e.target))
    }
});
//when user click on input text with class datepicker, render the datepicker
function loadDatepicer(e){
    if(e.value==''){//if input text is empty
        renderToday() /* render datepicker as default */
    }
    else{//if input field has already date inside
        //empty old date
        shamsiDateSpan.innerHTML=''
        daysDiv.innerHTML=''
        isCurrentMoth = false
        let seperator = "/"
        if(settings["dateSeperator"]){
            seperator = settings["dateSeperator"]
        }
        //take the date from input
        let textValue = e.value.split(seperator)
        
        let y,m,d
        if(settings["format"]){
            let format = settings["format"].split("/")
            if(format[0]==='yyyy' && format[1]==='mm' && format[2] === 'dd'){
                y = textValue[0]
                m = textValue[1]
                d = textValue[2]
            }else if(format[0]==='yyyy' && format[1]==='dd' && format[2] === 'mm'){
                y = textValue[0]
                m = textValue[2]
                d = textValue[1]
            }else if(format[0]==='dd' && format[1]==='mm' && format[2] === 'yyyy'){
                y = textValue[2]
                m = textValue[1]
                d = textValue[0]
            }
            else if(format[0]==='dd' && format[1]==='yyyy' && format[2] === 'mm'){
                y = textValue[1]
                m = textValue[2]
                d = textValue[0]
            }
            else if(format[0]==='mm' && format[1]==='dd' && format[2] === 'yyyy'){
                y = textValue[2]
                m = textValue[0]
                d = textValue[1]
            }
            else if(format[0]==='mm' && format[1]==='yyyy' && format[2] === 'dd'){
                y = textValue[1]
                m = textValue[0]
                d = textValue[2]
            }
        }else{
            y = textValue[0]
            m = textValue[1]
            d = textValue[2]
        }
        renderCalendar(y,m,d)
    }
    textBox = e
    let top = e.getBoundingClientRect().top
    let height = e.getBoundingClientRect().height
    let left = e.getBoundingClientRect().left
    document.getElementById('container').style.left=left+'px'
    document.getElementById('container').style.top=top+height+'px'
    document.getElementById('container').style.display='block'
    document.addEventListener('mouseup', function(event) {
        var container = document.getElementById('container');
        if (!container.contains(event.target)) {
            document.getElementById('modal').style.display = 'none';
            container.style.display = 'none';
        }
    });
    
    
}
//put the date inside input text
function putDate(day){
    let seperator = "/"
    if(settings["dateSeperator"]){
        seperator = settings["dateSeperator"]
    }
    if(settings["format"]){
        let format = settings["format"].split("/")
        if(format[0]==='yyyy' && format[1]==='mm' && format[2] === 'dd'){
            textBox.value = selectedYear+seperator+selectedMonth+seperator+day
        }else if(format[0]==='yyyy' && format[1]==='dd' && format[2] === 'mm'){
            textBox.value = selectedYear+seperator+day+seperator+selectedMonth
        }else if(format[0]==='dd' && format[1]==='mm' && format[2] === 'yyyy'){
            textBox.value = day+seperator+selectedMonth+seperator+selectedYear
        }
        else if(format[0]==='dd' && format[1]==='yyyy' && format[2] === 'mm'){
            textBox.value = day+seperator+selectedYear+seperator+selectedMonth
        }
        else if(format[0]==='mm' && format[1]==='dd' && format[2] === 'yyyy'){
            textBox.value = selectedMonth+seperator+day+sseperator+selectedYear
        }
        else if(format[0]==='mm' && format[1]==='yyyy' && format[2] === 'dd'){
            textBox.value = selectedMonth+seperator+selectedYear+seperator+day
        }
    }
    else{
        textBox.value = selectedYear+seperator+selectedMonth+seperator+day
    }
    if(settings["autoClose"]===false){
        document.getElementById('container').style.display='block'
    }
    else{
        document.getElementById('container').style.display='none'
    }
}