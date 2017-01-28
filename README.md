# WebCrypto.js

WebCrypto.js is a simple JavaScript library for the [Web Cryptography API](http://www.w3.org/TR/WebCryptoAPI/).

In an browser environment, this library uses the raw Web Cryptography API.
In a node environment, this library uses corresponding **node-webcrypto-ossl**.

**Hint: work is still in progress**

## Supported Crypto

- [x] SHA-1
- [x] SHA-256
- [x] SHA-384
- [x] SHA-512
- [x] AES-CBC
- [x] RSA-OAEP
- [x] ECDH
- [x] ECDSA
- [ ] AES-CTR
- [ ] AES-CMAC
- [ ] AES-GCM
- [ ] AES-KW
- [ ] AES-CFB
- [ ] HMAC
- [ ] RSASSA-PKCS1-v1_5
- [ ] RSA-PSS
- [ ] PBKDF2
- [ ] DH

## Examples

### Browser

Install dependencies:

```
npm install
```

We creates a Makefile to bundle the examples (uses **jspm**):

```
make
```

### Node

Install dependencies:

```
npm install
```

Run examples:

```
node examples/js/sha1.js
node examples/js/aes-cbc.js
node examples/js/aes-cbc-2.js
node examples/js/ecdsa.js
node examples/js/rsa-oaep.js
node examples/js/ecdh.js // DOES NOT WORK
```

## Supported Browsers

* Chrome 54.0
* Firefox 50.0

## Examples

* https://boldt.github.io/WebCrypto.js/

## Links

* https://diafygi.github.io/webcrypto-examples/

## TODO

* bower.js
* semver.org
