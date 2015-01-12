# SVG2Image
Simple SVG string conversion to PNG or JPEG.

# Example
```javascript
var Exporter = require('svg2image');

var div = window.document.createElement('div');
var canvasContainer = document.body.appendChild(div);
var canvas = document.createElement('canvas');

var exportOpts = {
    format: 'png',
    width: 1200,
    height: 500,
    canvasContainer: canvasContainer,
    canvas: canvas
};

var svgString = require('./mock');
var imageExporter = new Exporter(exportOpts);

imageExporter.on('success', function (imgData) {
    console.log(imgData) // -> data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
});

imageExporter.on('error', function (err) {
    console.log('error', err);
});

imageExporter.encode(svgString);

```

# Methods
```javascript
var Exporter = require('svg2image');
```

## var imageExporter = new Exporter(options)
Returns a new instance of an ImageExporter.

`options.format` - `'png'`, `'jpeg'` | **default:** `'png'`

`options.height` - height in px. | **default:** 150

`options.width` - width in px. | **default:** 300

`options.canvasContainer` - DOM element to hold `options.canvas` | **Required**

`options.canvas` - Canvas DOM element | **Required**

## imageExporter.encode(svgString)
This will encode the SVG and `imageExporter` will emit either a `success` or `error` event.

#### `svgString`
Plain SVG string. Not an SVG node. Just a string.

## imageExporter.on('success', imgData)
`success` event comes with the imgData in the format specified.

## imageExporter.on('error', err)
`error` event fires if something went wrong during the conversion.


# Install
```bash
npm install svg2image
```

# License
MIT
