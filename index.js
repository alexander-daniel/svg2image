'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var hat = require('hat');

module.exports = Exporter;

function Exporter(svg, opts) {
	var self = this;
	EventEmitter.call(this);

	self.imageFormat = opts.format || 'png';
    self.svg = svg;
    self.height = opts.height || 150;
    self.width = opts.width || 300;
    
    var div = document.createElement('div');
    var canvasContainer = document.body.appendChild(div);

	canvasContainer.id =  hat();
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.top = 0;
    canvasContainer.style.left = 0;
    canvasContainer.style['z-index'] = 1000;

    var canvas = document.createElement('canvas');
    var canvasEl = canvasContainer.appendChild(canvas);

    canvasEl.id = hat();
    canvasEl.width = self.width;
    canvasEl.height = self.height;

    self.canvas = canvas;
    self.canvasContainer = canvasContainer;
    self.ctx = canvas.getContext('2d');
    self._svg = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});

    var DOMURL = window.URL || window.webkitURL;
    var img = new Image();
    var url = DOMURL.createObjectURL(self._svg);
    
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
}

inherits(Exporter, EventEmitter);

Exporter.prototype.encode = function () {
    var self = this;
    var imgData;

    if (self.imageFormat === 'jpeg') imgData = self.canvas.toDataURL('image/jpeg');
    else if (self.imageFormat === 'png') imgData = self.canvas.toDataURL('image/png');
    else if (self.imageFormat === 'svg') imgData = self.svg;
    else return self.emit('error', 'Image format is not jpeg, png or svg');

    self.canvasContainer.innerHTML = '';

    if (imgData) return self.emit('success', imgData);
    else return self.emit('error', 'Image is Empty');
};


