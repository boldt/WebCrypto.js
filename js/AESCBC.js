/*global define,crypto,Uint8Array*/

/* 
 * AES CBS
 * http://www.w3.org/TR/WebCryptoAPI/#aes-cbc
 */

define([], function () {

    "use strict";

    // AES CBS config
    var aescbc = {},
        AESCBC = function () {};
    
    aescbc.algorithmName = 'AES-CBC';
    aescbc.extractable = true;
    aescbc.keyUsages = ['encrypt', 'decrypt'];
    aescbc.exportMethod = 'raw';
    aescbc.keyLengthBits = 128;
    aescbc.aesKeyGenParams = {
        name: aescbc.algorithmName,
        length: aescbc.keyLengthBits
    };
    aescbc.ivBuf = crypto.getRandomValues(new Uint8Array(16));
    aescbc.aesCbcParams  = {
        name: aescbc.algorithmName,
        iv: aescbc.ivBuf
    };
    aescbc.aesImportParams  = {
        name: aescbc.algorithmName
    };

    AESCBC.generateKey = function (callback) {
        crypto.subtle.generateKey(aescbc.aesKeyGenParams, aescbc.extractable, aescbc.keyUsages).then(callback);
    };

    AESCBC.exportKey = function (key, callback) {
        crypto.subtle.exportKey(aescbc.exportMethod, key).then(callback);
    };

    AESCBC.importKey = function (key, callback) {
        crypto.subtle.importKey(aescbc.exportMethod, key, aescbc.aesImportParams, true, aescbc.keyUsages).then(callback);
    };

    AESCBC.encrypt = function (key, data_raw, callback) {
        crypto.subtle.encrypt(aescbc.aesCbcParams, key, data_raw).then(callback);
    };

    AESCBC.decrypt = function (key, data_encrypted, callback) {
        crypto.subtle.decrypt(aescbc.aesCbcParams, key, data_encrypted).then(callback);
    };

    return AESCBC;
});

