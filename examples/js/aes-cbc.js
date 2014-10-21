/*global require, Uint8Array, console, TextEncoder, TextDecoder*/

require(["AESCBC"], function (AESCBC) {

    "use strict";
    
    var text = "Hello World!",
        encoder = new TextEncoder("utf-8"),
        data = encoder.encode(text);
    
    console.log("Data: ", text);

	var aescbc = new AESCBC();
	var aescbc2 = new AESCBC();

    aescbc.generateKey(function (key) {
        console.log("Key: ", key);
        aescbc.encrypt(key, data, function (data_enc) {
	        console.log("Encrypted data: ", new Uint8Array(data_enc));
	        aescbc.exportKey(key, function (key_ex) {
		        console.log("Exported key + IV", new Uint8Array(key_ex));
		        aescbc2.importKey(key_ex, function (key_im) {
			        console.log("Imported key", key_im);
			        aescbc2.decrypt(key_im, data_enc, function (data_dec) {
				        var decoder = new TextDecoder("utf-8"),
                            text = decoder.decode(new Uint8Array(data_dec));
				        console.log("Decrypted data: ", text);
			        });
		        });
	        });
        });
    });
});
