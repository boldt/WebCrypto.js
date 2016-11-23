/*global define,crypto,Uint8Array*/

/*
 * ECDH
 * ECDH parameters are x, y and a curve (crv)
 * https://www.w3.org/TR/WebCryptoAPI/#ecdh
 */

define([], function () {

  "use strict";

  var ECDH = function() {
    var ecdh = {};
    ecdh.algorithmName = "ECDH";
    ecdh.extractable = true;
    ecdh.curve = "P-256"; //can be "P-256", "P-384", or "P-521"
    ecdh.keyUsages = ["deriveBits"];
    ecdh.exportMethod = 'raw'; // jwk or raw
    ecdh.KeyGenParams = {
      name: ecdh.algorithmName,
      namedCurve: ecdh.curve
    };
    this.ecdh = ecdh;
  }

  // Creates a public and a private key
  ECDH.prototype.generateKeys = function (callback) {
    crypto.subtle.generateKey(this.ecdh.KeyGenParams, this.ecdh.extractable, this.ecdh.keyUsages).then(callback);
  };

  // This exports the public key as raw/or jwt
  ECDH.prototype.exportKey = function (key, callback) {
    var that = this;
    crypto.subtle.exportKey(this.ecdh.exportMethod, key)
    .then(function(keydata){
      if(that.ecdh.exportMethod == "raw") {
        console.log('keydata', keydata); // contains crv, x, y
      } else if(that.ecdh.exportMethod == "jwk") {
        console.log('keydata', keydata); // JSON object
        console.log('crv', keydata.crv);
        console.log('x', keydata.x);
        console.log('y', keydata.y);
      }
      callback(keydata);
    });
  };

  // This imports a public key
  ECDH.prototype.importKey = function (key, callback) {
    var that = this;
    crypto.subtle.importKey(this.ecdh.exportMethod, key, this.ecdh.KeyGenParams, this.ecdh.extractable, []) // empty array, if importing an public key
    .then(function(publicKey){
      console.log(publicKey);
      callback(publicKey);
    });
  };

  // This generate the bites
  ECDH.prototype.deriveBits = function (publicKey, privateKey, length, callback) {
    var that = this;
    var KeyGenParams = this.ecdh.KeyGenParams;
    KeyGenParams.public = publicKey;

    crypto.subtle.deriveBits(KeyGenParams, privateKey, length).then(function(bits){
      callback(new Uint8Array(bits));
    }).catch(function(err){
      console.error(err);
    });
  };

  return ECDH;
});

