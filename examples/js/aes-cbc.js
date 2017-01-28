"use strict";

var adapters = require('adapters');
var webcrypto = require('../../js/webcrypto');
var AESCBC = webcrypto.AESCBC;

var TextEncoder = adapters.TextEncoder;
var TextDecoder = adapters.TextDecoder;

var text = "Hello World!";
var encoder = new TextEncoder("utf-8");
var data = encoder.encode(text);

var aescbc = new AESCBC();
aescbc.generateKey(function (key) {
    console.log("Key: ", key.key);
    aescbc.encrypt(key, data, function (data_encrypted) {
        console.log("Encrypted data: ", new Uint8Array(data_encrypted));
        aescbc.exportKey(key, function (key_exported) {
	        console.log("Exported key", new Uint8Array(key_exported));
	        aescbc.importKey(key_exported, function (key_imported) {
		        console.log("Imported key", key_imported);
		        aescbc.decrypt(key_imported, data_encrypted, function (data_decrypted) {
			        var decoder = new TextDecoder("utf-8"),
                        text = decoder.decode(new Uint8Array(data_decrypted));
			        console.log("Decrypted data: ", text);
		        });
	        });
        });
    });
});

