'use strict';

var test = require('tape');

var Exporter = require('../index');

test('testling', function (t) {
    t.plan(1);
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

    var svgString = require('../example/mock');
    var imageExporter = new Exporter(exportOpts);

    imageExporter.on('success', function (imgData) {
        var mockImageData = require('./image-data');
        t.ok(imgData === mockImageData);
        t.end();
    });

    imageExporter.on('error', function (err) {
        console.log('error', err);
    });

    imageExporter.encode(svgString);
});
