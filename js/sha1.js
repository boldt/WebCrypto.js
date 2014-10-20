require(["WebCrypto"], function(WebCrypto){

    var sha1ArrayBufferToString = function(buffer) {

	    // From sha1.js
	    var cvt_hex = function (val) {
		    var str = "";
		    var i;
		    var v;

		    for (i = 1; i >= 0; i--) {
			    v = (val >>> (i * 4)) & 0x0f;
			    str += v.toString(16);
		    }
		    return str;
	    };

	    var uint8 = new Uint8Array(buffer);
	    var temp = "";
	    for(var i=0;i<uint8.length; i++) {
		    temp += cvt_hex(uint8[i]);
	    }
	    return temp.toLowerCase();
    };

    var encoder = new TextEncoder("utf-8");
    var data = encoder.encode("abc");

    WebCrypto.sha1(data, function(hash) {
	    // Expect: a9993e364706816aba3e25717850c26c9cd0d89d
	    console.log(sha1ArrayBufferToString(hash));
    });

});
