/*global define,crypto,Uint8Array*/

/*
 * AES CBS
 * http://www.w3.org/TR/WebCryptoAPI/#aes-cbc
 */

define([], function () {

  "use strict";

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
  config.aesCbcParams  = {
    name: config.algorithmName,
    iv: crypto.getRandomValues(new Uint8Array(16))
  };
  config.aesImportParams  = {
    name: config.algorithmName
  };

  var AESCBC = function () {};

  AESCBC.prototype.generateKey = function (callback) {
    crypto.subtle.generateKey(config.aesKeyGenParams, config.extractable, config.keyUsages).then(callback);
  };

  AESCBC.prototype.exportKey = function (key, callback) {
    crypto.subtle.exportKey(config.exportMethod, key).then(function(key_ex) {
      var ivandkey = new Uint8Array(32);
      ivandkey.set(new Uint8Array(key_ex), 0);
      ivandkey.set(config.aesCbcParams.iv, 16);
      callback(ivandkey);
    });
  };

  AESCBC.prototype.importKey = function (ivandkey, callback) {
    var key = new Uint8Array(new Uint8Array(ivandkey).subarray(0,16));
    var iv = new Uint8Array(new Uint8Array(ivandkey).subarray(16,32));
    config.aesCbcParams.iv = iv;
    crypto.subtle.importKey(config.exportMethod, key, config.aesImportParams, true, config.keyUsages).then(callback);
  };

  AESCBC.prototype.encrypt = function (key, data_raw, callback) {
    crypto.subtle.encrypt(config.aesCbcParams, key, data_raw).then(callback);
  };

  AESCBC.prototype.decrypt = function (key, data_encrypted, callback) {
    crypto.subtle.decrypt(config.aesCbcParams, key, data_encrypted).then(callback);
  };

  return AESCBC;
});

