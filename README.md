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

Install dependencies:

```
nvm install
npm install
```

### Browser

```
npm run build-node
```

Open examples folder.

### Node

```
npm run build-node
```

Run examples:

```
node dist/node/sha1.js
node dist/node/aes-cbc.js
node dist/node/aes-cbc-2.js
node dist/node/ecdsa.js
node dist/node/rsa-oaep.js
node dist/node/ecdh.js
```

## Supported Environments

* Node 8.11.1
* Chrome 54.0
* Firefox 50.0

## Examples

* https://boldt.github.io/WebCrypto.js/

## Links

* https://diafygi.github.io/webcrypto-examples/

## TODO

* bower.js
* semver.org
