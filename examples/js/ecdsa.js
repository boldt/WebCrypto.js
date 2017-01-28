/*global require, Uint8Array, console, TextEncoder*/
/*jslint bitwise: true */

"use strict";

var adapters = require('adapters');
var webcrypto = require('../../js/webcrypto');

var TextEncoder = adapters.TextEncoder;
var TextDecoder = adapters.TextDecoder;
var ECDSA = webcrypto.ECDSA;


  var text = "Hello World!",
      encoder = new TextEncoder("utf-8"),
      data = encoder.encode(text);

  console.log('data: ', data);

  var e = new ECDSA();
  e.generateKeys(function(keys) {

    var publicKey = keys.publicKey;
    var privateKey = keys.privateKey;

    console.log('publicKey: ', publicKey);
    console.log('privateKey: ', privateKey);

    e.sign(privateKey, data, function(signature) {
      console.log('signature:', signature);

      e.exportKey(publicKey, function(exportedkey) {
        console.log('exportedkey:', exportedkey);

        e.importKey(exportedkey, function(importedKey) {
          console.log('importedKey:', importedKey);

          e.verify(importedKey, signature, data, function(isValid) {
            console.log('isValid:', isValid);
          });

        });

      });

    });

  });

