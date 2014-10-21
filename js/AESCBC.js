/*global define,crypto,Uint8Array*/

/* 
 * AES CBS
 * http://www.w3.org/TR/WebCryptoAPI/#aes-cbc
 */

define([], function () {

    "use strict";

    // AES CBS config
    var AESCBC = function () {
		var aescbc = {};
		aescbc.algorithmName = 'AES-CBC';
		aescbc.extractable = true;
		aescbc.keyUsages = ['encrypt', 'decrypt'];
		aescbc.exportMethod = 'raw';
		aescbc.keyLengthBits = 128;
		aescbc.aesKeyGenParams = {
		    name: aescbc.algorithmName,
		    length: aescbc.keyLengthBits
		};
		aescbc.aesCbcParams  = {
		    name: aescbc.algorithmName,
		    iv: crypto.getRandomValues(new Uint8Array(16))
		};
		aescbc.aesImportParams  = {
		    name: aescbc.algorithmName
		};
		this.aescbc = aescbc;
	};
    

    AESCBC.prototype.generateKey = function (callback) {
        crypto.subtle.generateKey(this.aescbc.aesKeyGenParams, this.aescbc.extractable, this.aescbc.keyUsages).then(callback);
    };

    AESCBC.prototype.exportKey = function (key, callback) {
		var that = this;
        crypto.subtle.exportKey(this.aescbc.exportMethod, key).then(function(key_ex) {
			var ivandkey = new Uint8Array(32);
			ivandkey.set(new Uint8Array(key_ex), 0);
			ivandkey.set(that.aescbc.aesCbcParams.iv, 16);
			callback(ivandkey);
		});
    };

    AESCBC.prototype.importKey = function (ivandkey, callback) {
		var key = new Uint8Array(new Uint8Array(ivandkey).subarray(0,16));
		var iv = new Uint8Array(new Uint8Array(ivandkey).subarray(16,32));
		this.aescbc.aesCbcParams.iv = iv;
        crypto.subtle.importKey(this.aescbc.exportMethod, key, this.aescbc.aesImportParams, true, this.aescbc.keyUsages).then(callback);
    };

    AESCBC.prototype.encrypt = function (key, data_raw, callback) {
        crypto.subtle.encrypt(this.aescbc.aesCbcParams, key, data_raw).then(callback);
    };

    AESCBC.prototype.decrypt = function (key, data_encrypted, callback) {
        crypto.subtle.decrypt(this.aescbc.aesCbcParams, key, data_encrypted).then(callback);
    };

    return AESCBC;
});

