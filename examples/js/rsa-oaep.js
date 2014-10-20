/*global require, Uint8Array, console, TextEncoder, TextDecoder*/

require(["RSAOAEP"], function (RSAOAEP) {

    "use strict";
    
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
			    RSAOAEP.encrypt(key_imported, data, function (encryptedData) {
		            console.log("Encrypted data: ", new Uint8Array(encryptedData));
				    RSAOAEP.decrypt(keys.privateKey, encryptedData, function (decryptedData) {
					    var decoder = new TextDecoder("utf-8"),
                            text = decoder.decode(new Uint8Array(decryptedData));
					    console.log("Decrypted data: ", text);
				    });
			    });
		    });
	    });
    });

});
