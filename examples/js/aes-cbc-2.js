/*global require, Uint8Array, console, TextEncoder, TextDecoder*/

require(["AESCBC", "SHA"], function (AESCBC, SHA) {

    "use strict";

    // Generated with pwgen
    var password = "Ce8joosuLe6phais",
        text = "Hello World!",
        encoder = new TextEncoder("utf-8"),
        password_encoded = encoder.encode(password),
        data = encoder.encode(text),
        aescbc = new AESCBC(),
        aescbc2 = new AESCBC();

    console.log("Data: ", text);
    console.log("Password encoded:", password_encoded);


    /*
     * Here we use a trick:
     * SHA-256 generates a hash of length 32 byte. AES-CBC uses a key of length
     * 16 byte and an IV of length 16 byte, so we derive both from the SHA-256
     * hash value.
     */
    SHA.sha256(password_encoded, function (password_sha256) {
	    console.log("Password as SHA-256:", new Uint8Array(password_sha256));
        aescbc.importKey(password_sha256, function (key_imported) {
            console.log("Imported key", key_imported);
            aescbc.encrypt(key_imported, data, function (data_encrypted) {
	            console.log("Encrypted data: ", new Uint8Array(data_encrypted));
                aescbc2.importKey(password_sha256, function (key_imported2) {
	                aescbc2.decrypt(key_imported2, data_encrypted, function (data_decrypted) {
		                var decoder = new TextDecoder("utf-8"),
                            text = decoder.decode(new Uint8Array(data_decrypted));
		                console.log("Decrypted data: ", text);
	                });
                });
            });
        });
    });    
});
