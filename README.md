
# persianDatepicker [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Get%20persianDatePicker%20developed%20using%20only%20javascript%20here:%20&url=https://github.com/alipanahi/persianDatepicker&hashtags=javascript,developers)

Datepicker for web sites base on Afghanistan and Iran Calendar

![datepicker](/img/datepicker.png) ![datepicker](/img/datepicker-2.png)

### Prerequisites

Nothing needs to be installed since it uses only javascript and css


### Installing

#### Include ***style.css*** inside tag head

    <head>
        <link href="style.css" rel="stylesheet">
    </head>

#### Add class ***datepicker-farsi*** to the input text

    <input type="text" class="datepicker-farsi>

#### Include ***index.min.js*** at the bottom of tag body

    <script src="index.min.js"></script>

#### Add a ***settings*** object in order to change the default settings
        
    <script>
        settings = {
            format: 'dd/mm/yyyy',
            dateSeparator: '-',
            autoClose: true,
            labelLanguage: 'dari' // 'pashto','farsi'
        }
    </script>

## Built With

* [javascript](https://www.javascript.com/)

## Versioning

1.0 

## Authors

* **Ali Hussain Panahi**
