require(["WebCrypto"], function(WebCrypto){

    var text = "Hello World!";
    console.log("Data: ", text);

    var encoder = new TextEncoder("utf-8");
    var data = encoder.encode(text);

    WebCrypto.RSAOAEP.generateKeys(function(keys){
	    console.log("Keys: ", keys);
	    WebCrypto.RSAOAEP.exportKey(keys.publicKey, function(key_exported) {
		    console.log("Key exported: ", new Uint8Array(key_exported));
		    WebCrypto.RSAOAEP.importKey(key_exported, function(key_imported) {
		        console.log("Imported key", key_imported);
			    WebCrypto.RSAOAEP.encrypt(key_imported, data, function(encryptedData) {
		            console.log("Encrypted data: ", new Uint8Array(encryptedData));
				    WebCrypto.RSAOAEP.decrypt(keys.privateKey, encryptedData, function(decryptedData) {
					    var decoder = new TextDecoder("utf-8");
					    var text = decoder.decode(new Uint8Array(decryptedData));
					    console.log("Decrypted data: ", text);
				    });
			    });
		    });
	    });
    });

});
