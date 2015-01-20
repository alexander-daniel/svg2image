'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var hat = require('hat');

// leave in for node webkit context
var Image = window.Image;
var Blob = window.Blob;

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

module.exports = Exporter;

inherits(Exporter, EventEmitter);

Exporter.prototype.encode = function (svgString) {

    var self = this;
    var img = new Image();
    var format = this.exportFormat;
    var DOMURL = window.URL || window.webkitURL;
    var svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    self.on('ready', function () {
        var imgData;
        switch (format) {
            case 'jpeg':
                imgData = self.canvas.toDataURL('image/jpeg');
                break;
            case 'png':
                imgData = self.canvas.toDataURL('image/png');
                break;
            case 'webp':
                imgData = self.canvas.toDataURL('image/webp');
                break;
            case 'svg':
                imgData = svgString;
                break;
            default:
                return self.emit('error', 'Image format is not jpeg, png or svg');
        }

        return self.emit('success', imgData);
    });

    img.onload = function() {
        DOMURL.revokeObjectURL(url);
        self.ctx.drawImage(img, 0, 0);
        self.emit('ready');
    };

    img.onerror = function() {
        DOMURL.revokeObjectURL(url);
        return self.emit('error', 'Image failed on load');
    };

    img.src = url;


};
