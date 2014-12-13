'use strict';

var exporter = require('../index');

var div = window.document.createElement('div');
var canvasContainer = window.document.body.appendChild(div);
var canvas = window.document.createElement('canvas');
var canvasEl = canvasContainer.appendChild(canvas);

var exportOpts = {
    format: 'png',
    width: 1200,
    height: 500,
    canvas: canvas,
    canvasContainer: canvasContainer, 
    canvasEl: canvasEl
};

var svgString = require('./mock');
var imageExporter = exporter(svgString, exportOpts);

imageExporter.on('success', function (imgData) {
	console.log('success', imgData);
});

imageExporter.on('error', function (err) {
	console.log('error', err);
});

imageExporter.encode();


