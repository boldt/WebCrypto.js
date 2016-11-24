/*global define,crypto,Uint8Array*/

/*
 * RSA OAEP
 * http://www.w3.org/TR/WebCryptoAPI/#rsa-oaep
 */
define([], function () {

  "use strict";

  var config = {};
  config.name = "ECDSA";
  config.extractable = false;
  config.curve = "P-256"; // P-256, P-384, or P-512
  config.keyUsages = ["sign", "verify"];
  config.exportMethod = 'raw'; // jwk or raw
  config.hash = "SHA-256"; // SHA-1, SHA-256, SHA-384, or SHA-512
  config.keyGenParams = {
    name: config.name,
    namedCurve: config.curve,
    hash: {
      name: config.hash
    }
  };

  var ECDSA = function () {};

  ECDSA.prototype.generateKeys = function (callback) {
    crypto.subtle.generateKey(config.keyGenParams, config.extractable, config.keyUsages).then(callback);
  };

  ECDSA.prototype.sign = function (privateKey, data, callback) {
    crypto.subtle.sign(config.keyGenParams, privateKey,data).then(function(signature){
      callback(new Uint8Array(signature));
    });
  };

  ECDSA.prototype.verify = function (publicKey, signature, data, callback) {
    crypto.subtle.verify(config.keyGenParams, publicKey, signature, data).then(callback);
  };

  ECDSA.prototype.exportKey = function (key, callback) {
    crypto.subtle.exportKey(config.exportMethod, key).then(function(keydata){
      if(config.exportMethod == "raw") {
        console.log('keydata', keydata); // contains crv, x, y
        callback(new Uint8Array(keydata));
      } else if(config.exportMethod == "jwk") {
        console.log('keydata', keydata); // JSON object
        console.log('crv', keydata.crv);
        console.log('x', keydata.x);
        console.log('y', keydata.y);
        callback(keydata);
      }
    });
  };

  // This imports a public key
  ECDSA.prototype.importKey = function (key, callback) {
    crypto.subtle.importKey(config.exportMethod, key, config.keyGenParams, false, ["verify"])    .then(callback);
  };

  return ECDSA;

});
