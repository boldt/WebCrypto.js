/*global require, Uint8Array, console, TextEncoder*/
/*jslint bitwise: true */

"use strict";

var SHA = require('../../js/SHA');
var Shims = require('shims');

var TextEncoder = Shims.TextEncoder;
var TextDecoder = Shims.TextDecoder;


var sha1ArrayBufferToString,
    encoder = new TextEncoder("utf-8"),
    data = encoder.encode("abc");

sha1ArrayBufferToString = function (buffer) {

    var i,
        cvt_hex,
        uint8 = new Uint8Array(buffer),
        temp = "";

    cvt_hex = function (val) {
	    var str = "",
	        i,
	        v;

	    for (i = 1; i >= 0; i = i - 1) {
		    v = (val >>> (i * 4)) & 0x0f;
		    str += v.toString(16);
	    }
	    return str;
    };
    
    for (i = 0; i < uint8.length; i = i + 1) {
	    temp += cvt_hex(uint8[i]);
    }
    return temp.toLowerCase();
};

SHA.sha1(data, function (hash) {
    // Expect: a9993e364706816aba3e25717850c26c9cd0d89d
    console.log('SHA-1: ', sha1ArrayBufferToString(hash));
});

