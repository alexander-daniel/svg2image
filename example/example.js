'use strict';

var Exporter = require('../index');

var div = window.document.createElement('div');
var canvasContainer = window.document.body.appendChild(div);
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
    console.log('success', imgData);

    var dataDiv = document.getElementById('dataDiv');
    var img = document.getElementById('example');
    dataDiv.innerHTML = imgData;
    img.src = imgData;
});

imageExporter.on('error', function (err) {
    console.log('error', err);
});

imageExporter.encode(svgString);
