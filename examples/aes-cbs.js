require(["AESCBS"], function(AESCBS){

    var text = "Hello World!";
    console.log("Data: ", text);

    var encoder = new TextEncoder("utf-8");
    var data = encoder.encode(text);

    AESCBS.generateKey(function(key) {
        console.log("Key: ", key);
        AESCBS.encrypt(key, data, function(data_enc) {
	        console.log("Encrypted data: ", new Uint8Array(data_enc));
	        AESCBS.exportKey(key, function(key_ex) {
		        console.log("Exported key", new Uint8Array(key_ex));
		        AESCBS.importKey(key_ex, function(key_im) {
			        console.log("Imported key", key_im);
			        AESCBS.decrypt(key_im, data_enc, function(data_dec) {
				        var decoder = new TextDecoder("utf-8");
				        var text = decoder.decode(new Uint8Array(data_dec));
				        console.log("Decrypted data: ", text);
			        });
		        });
	        });
        });
    });
});
