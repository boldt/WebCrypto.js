/*global require, Uint8Array, console, TextEncoder, TextDecoder*/

require(["AESCBC"], function (AESCBC) {

    "use strict";
    
    var text = "Hello World!",
        encoder = new TextEncoder("utf-8"),
        data = encoder.encode(text),
        aescbc = new AESCBC(),
        aescbc2 = new AESCBC();
    
    console.log("Data: ", text);

    aescbc.generateKey(function (key) {
        console.log("Key: ", key);
        aescbc.encrypt(key, data, function (data_encrypted) {
	        console.log("Encrypted data: ", new Uint8Array(data_encrypted));
	        aescbc.exportKey(key, function (key_exported) {
		        console.log("Exported key", new Uint8Array(key_exported));
		        aescbc2.importKey(key_exported, function (key_imported) {
			        console.log("Imported key", key_imported);
			        aescbc2.decrypt(key_imported, data_encrypted, function (data_decrypted) {
				        var decoder = new TextDecoder("utf-8"),
                            text = decoder.decode(new Uint8Array(data_decrypted));
				        console.log("Decrypted data: ", text);
			        });
		        });
	        });
        });
    });
});
