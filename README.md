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

#### `options` is an object to specify export settings.
- `format` : `'png'` or `'jpeg'`
- `width` : `int` (px)
- `height` : `int` (px)

## imageExporter.encode(svgString)
This will encode the SVG and emit either a `success` or `error` event.

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
