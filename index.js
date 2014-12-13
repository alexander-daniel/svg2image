'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var hat = require('hat');

module.exports = Exporter;

function Exporter(svg, opts) {
    var exporter = new EventEmitter();

	exporter.imageFormat = opts.format || 'png';
    exporter.svg = svg;
    exporter.height = opts.height || 150;
    exporter.width = opts.width || 300;

    var canvasContainer = opts.canvasContainer;
    var canvasEl = opts.canvasEl;

	canvasContainer.id =  hat();
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.top = 0;
    canvasContainer.style.left = 0;
    canvasContainer.style['z-index'] = 1000;

    canvasEl.id = hat();
    canvasEl.width = exporter.width;
    canvasEl.height = exporter.height;

    exporter.canvas = opts.canvas;
    exporter.canvasContainer = canvasContainer;
    exporter.ctx = exporter.canvas.getContext('2d');
    exporter._svg = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});

    exporter.encode = function () {
        var exporter = this;
        var imgData;

        if (exporter.imageFormat === 'jpeg') imgData = exporter.canvas.toDataURL('image/jpeg');
        else if (exporter.imageFormat === 'png') imgData = exporter.canvas.toDataURL('image/png');
        else if (exporter.imageFormat === 'svg') imgData = exporter.svg;
        else return exporter.emit('error', 'Image format is not jpeg, png or svg');

        exporter.canvasContainer.innerHTML = '';

        if (imgData) return exporter.emit('success', imgData);
        else return exporter.emit('error', 'Image is Empty');
    };

    var DOMURL = window.URL || window.webkitURL;
    var img = new Image();
    var url = DOMURL.createObjectURL(exporter._svg);
    
    img.onload = function() {
        exporter.ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        exporter.emit('ready');
    };
    img.onerror = function() {
        DOMURL.revokeObjectURL(url);
        return exporter.emit('error', 'image did not load');
    };
    img.src = url;
    return exporter;
}



