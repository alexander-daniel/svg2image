'use strict';

var Exporter = require('../index');

var exportOpts = {
    format: 'png',
    width: 1200,
    height: 500
};

var svgString = require('./mock');
var imageExporter = new Exporter(exportOpts);

imageExporter.on('success', function (imgData) {
    console.log('success', imgData);
    var img = document.getElementById('example');
    img.src = imgData;
});

imageExporter.on('error', function (err) {
    console.log('error', err);
});

imageExporter.encode(svgString);
