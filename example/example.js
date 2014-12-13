'use strict';

var Exporter = require('../index');

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



