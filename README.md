# persianDatepicker

## Based on Afghanistan calendar
<p>without jquery - only javascript</p>

    ![alt text](https://github.com/alipanahi/persianDatepicker/blob/main/img/datepicker.png?raw=true)
    
### Include <strong>style.css</strong> inside tag head

    <head>
        <link href="style.css" rel="stylesheet">
    </head>

### Add class <strong>datepicker-farsi</strong> to the input text

    <input type="text" class="datepicker-farsi>

### Include <strong>index.min.js</strong> at the bottom of tag body

    <script src="index.min.js"></script>

### Add a <strong>settings</strong> object in order to change the default settings
        
    <script>
        settings = {
            format: 'dd/mm/yyyy',
            dateSeparator: '-',
            autoClose: true,
            labelLanguage: 'dari' // 'pashto','farsi'
        }
    </script>
