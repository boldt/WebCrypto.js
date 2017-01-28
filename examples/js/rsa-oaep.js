/*global require, Uint8Array, console, TextEncoder, TextDecoder*/

    "use strict";
	
	var Shims = require('shims');
	var webcrypto = require('../../js/webcrypto');

	var TextEncoder = Shims.TextEncoder;
	var TextDecoder = Shims.TextDecoder;
	var RSAOAEP = webcrypto.RSAOAEP;

    var text = "Hello World!",
        encoder = new TextEncoder("utf-8"),
        data = encoder.encode(text);

    console.log("Data: ", text);

    RSAOAEP.generateKeys(function (keys) {
	    console.log("Keys: ", keys);
	    RSAOAEP.exportKey(keys.publicKey, function (key_exported) {
		    console.log("Key exported: ", new Uint8Array(key_exported));
		    RSAOAEP.importKey(key_exported, function (key_imported) {
		        console.log("Imported key", key_imported);
			    RSAOAEP.encrypt(key_imported, data, function (data_encrypted) {
		            console.log("Encrypted data: ", new Uint8Array(data_encrypted));
				    RSAOAEP.decrypt(keys.privateKey, data_encrypted, function (data_decrypted) {
					    var decoder = new TextDecoder("utf-8"),
                            text = decoder.decode(new Uint8Array(data_decrypted));
					    console.log("Decrypted data: ", text);
				    });
			    });
		    });
	    });
    });

