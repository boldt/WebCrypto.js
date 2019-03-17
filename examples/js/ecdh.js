/*global require, Uint8Array, console, TextEncoder*/
/*jslint bitwise: true */

"use strict";

var adapters = require('adapters');
var webcrypto = require('../../js/webcrypto');

var TextEncoder = adapters.TextEncoder;
var TextDecoder = adapters.TextDecoder;
var ECDH = webcrypto.ECDH;

  var length = 256; // #Bit

  var e = new ECDH();
  e.generateKeys(function(keys) {
    var publicKey = keys.publicKey;
    var privateKey = keys.privateKey;
    e.exportKey(publicKey, function(exportKey) {
      console.info('exportKey', exportKey);
      e.importKey(exportKey, function(importKey) {
        console.info('importKey', importKey);
        e.generateKeys(function(keys2) {
          var publicKey2 = keys2.publicKey;
          var privateKey2 = keys2.privateKey;
          e.deriveBits(importKey, privateKey2, length, function(bits) {
            console.info('bits 1', bits);
            e.exportKey(publicKey2, function(exportKey2) {
              console.info('exportKey2', exportKey2);
              e.importKey(exportKey2, function(importKey2) {
                console.info('importKey2', importKey2);
                e.deriveBits(importKey2, privateKey, length, function(bits2) {
                  console.info('bits2', bits2);
                  var b = true;
                  for(var i = 0; i <= bits.length; i++) {
                      b &= (bits[i] == bits2[i]);
                  }
                  if(b) {
                      console.log('Shared key is the same!');
                  }
                });
              });
            });
          });
        });
      });
    });
  });

