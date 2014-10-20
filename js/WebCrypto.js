define([], 
    function() {

        var WebCrypto = {};

        /*
         * RSA OAEP
         * http://www.w3.org/TR/WebCryptoAPI/#rsa-oaep
         */

        // RSA OAEP config
        WebCrypto.rsaoaep = {};
        WebCrypto.rsaoaep.algorithmName = "RSA-OAEP";
        WebCrypto.rsaoaep.modLength = 2048;
        WebCrypto.rsaoaep.exponent = new Uint8Array([1, 0, 1]); // 24 bit representation of 65537
        WebCrypto.rsaoaep.hashAlgo = "SHA-256";
        WebCrypto.rsaoaep.extractable = true; // can extract it later if we want
        WebCrypto.rsaoaep.keyUsages = ["encrypt", "decrypt"];
        WebCrypto.rsaoaep.exportMethod = 'spki';
        WebCrypto.rsaoaep.rsaOaepParams =  {
	        name: WebCrypto.rsaoaep.algorithmName,
	        modulusLength: WebCrypto.rsaoaep.modLength,
	        publicExponent: WebCrypto.rsaoaep.exponent,
	        hash: {
		        name: WebCrypto.rsaoaep.hashAlgo
	        }
        };
        WebCrypto.rsaoaep.rsaHashedImportParams = {
            name: WebCrypto.rsaoaep.algorithmName,
            hash: {
                name: WebCrypto.rsaoaep.hashAlgo
            }
        };

        // RSA OAEP
        WebCrypto.RSAOAEP = function() {};

        WebCrypto.RSAOAEP.generateKeys = function(callback) {
	        crypto.subtle.generateKey(WebCrypto.rsaoaep.rsaOaepParams, WebCrypto.rsaoaep.extractable, WebCrypto.rsaoaep.keyUsages).then(callback);
        };

        WebCrypto.RSAOAEP.exportKey = function(key_public, callback) {
	        crypto.subtle.exportKey(WebCrypto.rsaoaep.exportMethod, key_public).then(callback);
        };

        WebCrypto.RSAOAEP.importKey = function(key_public, callback) {
	        crypto.subtle.importKey(WebCrypto.rsaoaep.exportMethod, key_public, WebCrypto.rsaoaep.rsaHashedImportParams, true, ["encrypt"]).then(callback);
        };

        WebCrypto.RSAOAEP.encrypt = function(key_public, data_raw, callback) {
            crypto.subtle.encrypt(WebCrypto.rsaoaep.rsaOaepParams, key_public, data_raw).then(callback);
        };

        WebCrypto.RSAOAEP.decrypt = function(key_private, data_encrypted, callback) {
	        crypto.subtle.decrypt(WebCrypto.rsaoaep.rsaOaepParams, key_private, data_encrypted).then(callback);
        };


        /* 
         * AES CBS
         * http://www.w3.org/TR/WebCryptoAPI/#aes-cbc
         */
        WebCrypto.AESCBS = function() {};

        // AES CBS config
        WebCrypto.aescbs = {};
        WebCrypto.aescbs.algorithmName = 'AES-CBC';
        WebCrypto.aescbs.extractable = true;
        WebCrypto.aescbs.keyUsages = ['encrypt', 'decrypt'];
        WebCrypto.aescbs.exportMethod = 'raw';
        WebCrypto.aescbs.keyLengthBits = 128;
        WebCrypto.aescbs.aesKeyGenParams = {
	        name: WebCrypto.aescbs.algorithmName,
	        length: WebCrypto.aescbs.keyLengthBits 
        };
        WebCrypto.aescbs.ivBuf = crypto.getRandomValues(new Uint8Array(16))
        WebCrypto.aescbs.aesCbcParams  = {
	        name: WebCrypto.aescbs.algorithmName,
	        iv: WebCrypto.aescbs.ivBuf
        };
        WebCrypto.aescbs.aesImportParams  = {
	        name: WebCrypto.aescbs.algorithmName
        };

        // AES CBS
        WebCrypto.AESCBS.generateKey = function(callback) {
	        crypto.subtle.generateKey(WebCrypto.aescbs.aesKeyGenParams, WebCrypto.aescbs.extractable, WebCrypto.aescbs.keyUsages).then(callback);
        };

        WebCrypto.AESCBS.exportKey = function(key, callback) {
	        crypto.subtle.exportKey(WebCrypto.aescbs.exportMethod, key).then(callback);
        };

        WebCrypto.AESCBS.importKey = function(key, callback) {
	        crypto.subtle.importKey(WebCrypto.aescbs.exportMethod, key, WebCrypto.aescbs.aesImportParams, true, WebCrypto.aescbs.keyUsages).then(callback);
        };

        WebCrypto.AESCBS.encrypt = function(key, data_raw, callback) {
	        crypto.subtle.encrypt(WebCrypto.aescbs.aesCbcParams , key, data_raw).then(callback);
        };

        WebCrypto.AESCBS.decrypt = function(key, data_encrypted, callback) {
	        crypto.subtle.decrypt(WebCrypto.aescbs.aesCbcParams , key, data_encrypted).then(callback);
        };

        // SHA-1

        WebCrypto.sha1 = function(ab, callback) {
	        crypto.subtle.digest({ name: 'sha-1' }, ab).then(callback);
        }

        return WebCrypto;
    }
);

