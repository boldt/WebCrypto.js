/*global define,crypto,Uint8Array*/

/*
 * RSA OAEP
 * http://www.w3.org/TR/WebCryptoAPI/#rsa-oaep
 */

var crypto = window.crypto;

var config = {};
config.algorithmName = "RSA-OAEP";
config.modLength = 2048;
config.exponent = new Uint8Array([1, 0, 1]); // 24 bit representation of 65537
config.hashAlgo = "SHA-256";
config.extractable = true; // can extract it later if we want
config.keyUsages = ["encrypt", "decrypt"];
config.exportMethod = 'spki';
config.rsaOaepParams =  {
  name: config.algorithmName,
  modulusLength: config.modLength,
  publicExponent: config.exponent,
  hash: {
    name: config.hashAlgo
  }
};
config.rsaHashedImportParams = {
  name: config.algorithmName,
  hash: {
    name: config.hashAlgo
  }
};

var RSAOAEP = function () {};

RSAOAEP.generateKeys = function (callback) {
  crypto.subtle.generateKey(config.rsaOaepParams, config.extractable, config.keyUsages).then(callback);
};

RSAOAEP.exportKey = function (key_public, callback) {
  crypto.subtle.exportKey(config.exportMethod, key_public).then(callback);
};

RSAOAEP.importKey = function (key_public, callback) {
  crypto.subtle.importKey(config.exportMethod, key_public, config.rsaHashedImportParams, true, ["encrypt"]).then(callback);
};

RSAOAEP.encrypt = function (key_public, data_raw, callback) {
  crypto.subtle.encrypt(config.rsaOaepParams, key_public, data_raw).then(callback);
};

RSAOAEP.decrypt = function (key_private, data_encrypted, callback) {
  crypto.subtle.decrypt(config.rsaOaepParams, key_private, data_encrypted).then(callback);
};

module.exports = RSAOAEP;
