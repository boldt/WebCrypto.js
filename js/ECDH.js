/*global define,crypto,Uint8Array*/

/*
 * ECDH
 * ECDH parameters are x, y and a curve (crv)
 * https://www.w3.org/TR/WebCryptoAPI/#ecdh
 */

var ecdh = {};
ecdh.name = "ECDH";
ecdh.extractable = false;
ecdh.curve = "P-256"; // P-256, P-384, or P-512
ecdh.keyUsages = ["deriveBits"];
ecdh.exportMethod = 'jwk'; // jwk or raw,raw
ecdh.KeyGenParams = {
  name: ecdh.name,
  namedCurve: ecdh.curve
};

var ECDH = function() {}

// Creates a public and a private key
ECDH.prototype.generateKeys = function (callback) {
  window.crypto.subtle.generateKey(ecdh.KeyGenParams, ecdh.extractable, ecdh.keyUsages).then(callback);
};

// This exports the public key as raw/or jwt
ECDH.prototype.exportKey = function (key, callback) {
  window.crypto.subtle.exportKey(ecdh.exportMethod, key)
  .then(function(keydata){
    if(ecdh.exportMethod == "raw") {
      console.log('keydata', keydata); // contains crv, x, y
      callback(new Uint8Array(keydata));
    } else if(ecdh.exportMethod == "jwk") {
      console.log('keydata', keydata); // JSON object
      console.log('crv', keydata.crv);
      console.log('x', keydata.x);
      console.log('y', keydata.y);
      callback(keydata);
    }
  }).catch(function (err) {
    console.log(err);
  });
};

// This imports a public key
ECDH.prototype.importKey = function (key, callback) {
  // empty array, if importing an public key
  window.crypto.subtle.importKey(ecdh.exportMethod, key, ecdh.KeyGenParams, ecdh.extractable, [])
  .then(callback);
};

// This generate the bites
ECDH.prototype.deriveBits = function (publicKey, privateKey, length, callback) {
  var KeyGenParams = ecdh.KeyGenParams;
  KeyGenParams.public = publicKey;

  window.crypto.subtle.deriveBits(KeyGenParams, privateKey, length).then(function(bits){
    callback(new Uint8Array(bits));
  }).catch(function(err){
    console.error(err);
  });
};

module.exports = ECDH;
