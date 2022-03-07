# persianDatepicker

<h2>Based on Afghanistan calendar</h2>
<p>without jquery - only javascript</p>
Include <strong>style.css</strong> inside tag head

    <head>
        <link href="style.css" rel="stylesheet">
    </head>

<h2>Add class <strong>datepicker-farsi</strong> to the input text</h2>

    <input type="text" class="datepicker-farsi>

<h2>Include <strong>index.min.js</strong> at the bottom of tag body</h2>

    <script src="index.min.js"></script>

<h2>Add a <strong>settings</strong> object in order to change the default settings</h2>
        
    <script>
    settings = {
        format: 'dd/mm/yyyy',
        dateSeparator: '-',
        autoClose: true,
        labelLanguage: 'dari' // 'pashto','farsi'
    }
    </script>
