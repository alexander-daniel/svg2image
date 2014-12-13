# SVG2Image
Simple SVG string conversion to PNG or JPEG.

# Example
```javascript
var Exporter = require('svg2image');

var exportOpts = {
    format: 'png',
    width: 1200,
    height: 500
};

var svg = require('./mock');
var imageExporter = new Exporter(svg, exportOpts);

imageExporter.on('ready', function () {
    imageExporter.encode();
});

imageExporter.on('success', function (imgData) {
	console.log('success', imgData);
	var img = document.getElementById('example');
	img.src = imgData;
});

imageExporter.on('error', function (err) {
	console.log('error', err);
});

```

# Methods
```javascript
var Exporter = require('svg2image');
```

## var imageExporter = new Exporter(svgString, options)
Returns a new instance of an ImageExporter. One-sy.

#### `svgString`
Plain SVG string. Not an SVG node. Just a string.

#### `options` is an object to specify export settings.
- `format` : `'png'` or `'jpeg'`
- `width` : `int` (px)
- `height` : `int` (px)

## imageExporter.on('ready')
After the environment for exporting is setup, the instance of Exporter will emit a `'ready'` event.

## imageExporter.encode()
This will encode the SVG and emit either a `success` or `error` event.

## imageExporter.on('success', imgData)
`success` event comes with the imgData in the format specified.

## imageExporter.on('error', err)
`error` event fires if something went wrong during the conversion.

