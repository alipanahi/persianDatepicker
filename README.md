# persianDatepicker

<h2>Based on Afghanistan calendar</h2>
<p>without jquery - only javascript</p>
<h2 style="margin-top: 1em;">Include <strong>style.css</strong> inside tag head</h2>
<span>
    &lt;head&gt;
    &lt;link href="style.css" rel="stylesheet"&gt;
    &lt;/head&gt;
</span>
<h2 style="margin-top: 1em;">Add class <strong>datepicker-farsi</strong> to the input text</h2>
<span class="tag">
    &lt;input type="text" class="datepicker-farsi"&gt;
</span>
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
