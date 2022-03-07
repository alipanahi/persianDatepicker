# persianDatepicker
<html>
    <head>
       
        <title>Afghani Datepicker</title>
        <link href="style.css" rel="stylesheet">
        <meta charset="utf-8"/>
        <style>
            form{
                background: #454545;
                margin-top: 20px;
                padding: 1em;
                color: wheat;
                font-size: 1.5em;
            }
            input{
                border: 0;
                padding: .5em;
                border-radius: 5px;
            }
            label{
                padding: 0 .5em;
                font-weight: 500;
            }
            .tag{
                background: gray; 
                padding: 1em;
            }
            
        </style>
    </head>
    <body>
        <header>
            <h1 style="margin-bottom: .5em;">Date pickers: </h1>
            <h2 style="margin-top: 1em;">Include <strong>sytle.css</strong> inside tag head</h2>
            <span class="tag">
                &lt;head&gt;
                &lt;link href="style.css" rel="stylesheet"&gt;
                &lt;/head&gt;
                
            </span>
            <h2 style="margin-top: 1em;">Add class <strong>datepicker-farsi</strong> to the input text</h2>
            <span class="tag">
                
                &lt;input type="text" class="datepicker-farsi"&gt;
              
                
            </span>
        </header>
        <form action="#" method="GET">
            <section style="width:90%;display: flex;margin: 0 auto;justify-content: space-between;">
                <div style="width: 30%;">
                    <label>start Date:</label>
                    <input type="text" class="datepicker-farsi" >
                    
                </div>
                
            
                <div style="width: 30%;">
                    <label>End Date:</label>
                    <input type="text" class="datepicker-farsi">
                </div>
            
                <div style="width: 30%;">
                    <label>Date of Birth:</label>
                    <input type="text" class="datepicker-farsi" >
                    
                </div>
                
            </section>
        </form>
        <h2 style="margin-top: 1em;">Include <strong>index.min.js</strong> at the bottom of tag body</h2>
        <span class="tag">
            &lt;script src="index.min.js"&gt;
            &lt;/script&gt;
            &lt;/body&gt;
        </span>
        <h2 style="margin-top: 1em;">Add a <strong>settings</strong> object in order to change the default settings</h2>
        
<pre class="tag" style="width: 30%;">
&lt;script&gt;
    settings = {
        format: 'dd/mm/yyyy',
        dateSeparator: '-',
        autoClose: true,
        labelLanguage: 'dari' // 'pashto','farsi'
    }
&lt;/script&gt;
</pre>
        <script src="index.min.js"></script>
        <script>
            settings = {
                format: "dd/mm/yyyy",
                dateSeparator: "-",
                autoClose: true,
                labelLanguage: 'dari'
            }
        </script>
    </body>
</html>
