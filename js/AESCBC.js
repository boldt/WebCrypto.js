/*global define,crypto,Uint8Array*/

/*
 * AES CBS
 * http://www.w3.org/TR/WebCryptoAPI/#aes-cbc
 */

"use strict";

var adapters = require('adapters');
var crypto = adapters.crypto;

var config = {};
config.algorithmName = 'AES-CBC';
config.extractable = true;
config.keyUsages = ['encrypt', 'decrypt'];
config.exportMethod = 'raw';
config.keyLengthBits = 128;
config.aesKeyGenParams = {
  name: config.algorithmName,
  length: config.keyLengthBits
};
config.aesImportParams  = {
  name: config.algorithmName
};

var AESCBC = function () {};
AESCBC.prototype.generateKey = function (callback) {
  var aesCbcParams  = {
    name: config.algorithmName,
    iv: crypto.getRandomValues(new Uint8Array(16))
  };
  crypto.subtle.generateKey(config.aesKeyGenParams, config.extractable, config.keyUsages).then(function(key) {
	callback({
      key: key,
      aesCbcParams: aesCbcParams
    });
  });
};

AESCBC.prototype.exportKey = function (key, callback) {
  console.log('####################################################');
  crypto.subtle.exportKey(config.exportMethod, key.key).then(function(key_ex) {
    var ivandkey = new Uint8Array(32);
    ivandkey.set(new Uint8Array(key_ex), 0);
    ivandkey.set(key.aesCbcParams.iv, 16);
    callback(ivandkey);
  });
};

AESCBC.prototype.importKey = function (ivandkey, callback) {
  var key = new Uint8Array(new Uint8Array(ivandkey).subarray(0,16));
  var iv = new Uint8Array(new Uint8Array(ivandkey).subarray(16,32));
  var aesCbcParams  = {
    name: config.algorithmName,
    iv: iv
  };
  crypto.subtle.importKey(config.exportMethod, key, config.aesImportParams, true, config.keyUsages).then(function(keyImported) {
    callback({
      key: keyImported,
      aesCbcParams: aesCbcParams
    })
  });
};

AESCBC.prototype.encrypt = function (key, data_raw, callback) {
  crypto.subtle.encrypt(key.aesCbcParams, key.key, data_raw).then(callback);
};

AESCBC.prototype.decrypt = function (key, data_encrypted, callback) {
  crypto.subtle.decrypt(key.aesCbcParams, key.key, data_encrypted).then(callback);
};

module.exports = AESCBC;

