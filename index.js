'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var hat = require('hat');
var Blob = require('w3c-blob');

module.exports = Exporter;

function Exporter(opts) {

    EventEmitter.call(this);
    this.exportFormat = opts.format || 'png';
    this.exportHeight = opts.height || 150;
    this.exportWidth = opts.width || 300;
    this.canvasContainer = opts.canvasContainer;
    this.canvas = opts.canvas;
    this.canvasEl = this.canvasContainer.appendChild(this.canvas);
    this.canvasEl.id = hat();
    this.canvasEl.width = this.exportWidth;
    this.canvasEl.height = this.exportHeight;
    this.ctx = this.canvas.getContext('2d');

}

inherits(Exporter, EventEmitter);

Exporter.prototype.encode = function (svg) {

    var self = this;
    var DOMURL = window.URL || window.webkitURL;
    var img = new Image();
    var svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = function() {
        self.ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        self.emit('ready');
    };

    img.onerror = function() {
        DOMURL.revokeObjectURL(url);
        return self.emit('error', 'image did not load');
    };

    img.src = url;

    self.on('ready', function () {
        var imgData;

        if (self.exportFormat === 'jpeg') imgData = self.canvas.toDataURL('image/jpeg');
        else if (self.exportFormat === 'png') imgData = self.canvas.toDataURL('image/png');
        else if (self.exportFormat === 'svg') imgData = self.svg;
        else return self.emit('error', 'Image format is not jpeg, png or svg');
        self.canvasContainer.innerHTML = ''; // clear canvas

        if (imgData) return self.emit('success', imgData);
        else return self.emit('error', 'Image is Empty');
    });
};
