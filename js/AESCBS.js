/* 
 * AES CBS
 * http://www.w3.org/TR/WebCryptoAPI/#aes-cbc
 */

define([], 
    function() {

        // AES CBS config
        var aescbs = {};
        aescbs.algorithmName = 'AES-CBC';
        aescbs.extractable = true;
        aescbs.keyUsages = ['encrypt', 'decrypt'];
        aescbs.exportMethod = 'raw';
        aescbs.keyLengthBits = 128;
        aescbs.aesKeyGenParams = {
	        name: aescbs.algorithmName,
	        length: aescbs.keyLengthBits 
        };
        aescbs.ivBuf = crypto.getRandomValues(new Uint8Array(16))
        aescbs.aesCbcParams  = {
	        name: aescbs.algorithmName,
	        iv: aescbs.ivBuf
        };
        aescbs.aesImportParams  = {
	        name: aescbs.algorithmName
        };

        var AESCBS = function() {};

        AESCBS.generateKey = function(callback) {
	        crypto.subtle.generateKey(aescbs.aesKeyGenParams, aescbs.extractable, aescbs.keyUsages).then(callback);
        };

        AESCBS.exportKey = function(key, callback) {
	        crypto.subtle.exportKey(aescbs.exportMethod, key).then(callback);
        };

        AESCBS.importKey = function(key, callback) {
	        crypto.subtle.importKey(aescbs.exportMethod, key, aescbs.aesImportParams, true, aescbs.keyUsages).then(callback);
        };

        AESCBS.encrypt = function(key, data_raw, callback) {
	        crypto.subtle.encrypt(aescbs.aesCbcParams , key, data_raw).then(callback);
        };

        AESCBS.decrypt = function(key, data_encrypted, callback) {
	        crypto.subtle.decrypt(aescbs.aesCbcParams , key, data_encrypted).then(callback);
        };

        return AESCBS;
    }
);

