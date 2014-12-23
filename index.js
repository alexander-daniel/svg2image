'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var hat = require('hat');

module.exports = Exporter;

function Exporter(opts) {

    EventEmitter.call(this);

    this.imageFormat = opts.format || 'png';
    this.exportHeight = opts.height || 150;
    this.exportWidth = opts.width || 300;

    var div = window.document.createElement('div');
    var canvasContainer = window.document.body.appendChild(div);
	var canvas = window.document.createElement('canvas');
    var canvasEl = canvasContainer.appendChild(canvas);

    canvasContainer.id =  hat();
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.top = 0;
    canvasContainer.style.left = 0;
    canvasContainer.style['z-index'] = 1000;


    canvasEl.id = hat();
    canvasEl.width = this.exportWidth;
    canvasEl.height = this.exportHeight;

    this.canvas = canvas;
    this.canvasContainer = canvasContainer;
    this.ctx = canvas.getContext('2d');
}

inherits(Exporter, EventEmitter);

Exporter.prototype.encode = function (svg) {

	var self = this;
	var DOMURL = window.URL || window.webkitURL;
	var img = new Image();
    self._svg = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
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

    self.on('ready', function () {
		var imgData;

	    if (self.imageFormat === 'jpeg') imgData = self.canvas.toDataURL('image/jpeg');
	    else if (self.imageFormat === 'png') imgData = self.canvas.toDataURL('image/png');
	    else if (self.imageFormat === 'svg') imgData = self.svg;
	    else return self.emit('error', 'Image format is not jpeg, png or svg');

	    self.canvasContainer.innerHTML = '';

	    if (imgData) return self.emit('success', imgData);
	    else return self.emit('error', 'Image is Empty');
	});
};
