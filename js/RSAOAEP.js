/*global define,crypto,Uint8Array*/

/*
 * RSA OAEP
 * http://www.w3.org/TR/WebCryptoAPI/#rsa-oaep
 */
define([], function () {

    "use strict";

    // RSA OAEP config
    var rsaoaep = {},
        RSAOAEP = function () {};
    
    rsaoaep.algorithmName = "RSA-OAEP";
    rsaoaep.modLength = 2048;
    rsaoaep.exponent = new Uint8Array([1, 0, 1]); // 24 bit representation of 65537
    rsaoaep.hashAlgo = "SHA-256";
    rsaoaep.extractable = true; // can extract it later if we want
    rsaoaep.keyUsages = ["encrypt", "decrypt"];
    rsaoaep.exportMethod = 'spki';
    rsaoaep.rsaOaepParams =  {
        name: rsaoaep.algorithmName,
        modulusLength: rsaoaep.modLength,
        publicExponent: rsaoaep.exponent,
        hash: {
            name: rsaoaep.hashAlgo
        }
    };
    rsaoaep.rsaHashedImportParams = {
        name: rsaoaep.algorithmName,
        hash: {
            name: rsaoaep.hashAlgo
        }
    };

    RSAOAEP.generateKeys = function (callback) {
        crypto.subtle.generateKey(rsaoaep.rsaOaepParams, rsaoaep.extractable, rsaoaep.keyUsages).then(callback);
    };

    RSAOAEP.exportKey = function (key_public, callback) {
        crypto.subtle.exportKey(rsaoaep.exportMethod, key_public).then(callback);
    };

    RSAOAEP.importKey = function (key_public, callback) {
        crypto.subtle.importKey(rsaoaep.exportMethod, key_public, rsaoaep.rsaHashedImportParams, true, ["encrypt"]).then(callback);
    };

    RSAOAEP.encrypt = function (key_public, data_raw, callback) {
        crypto.subtle.encrypt(rsaoaep.rsaOaepParams, key_public, data_raw).then(callback);
    };

    RSAOAEP.decrypt = function (key_private, data_encrypted, callback) {
        crypto.subtle.decrypt(rsaoaep.rsaOaepParams, key_private, data_encrypted).then(callback);
    };

    return RSAOAEP;
});

