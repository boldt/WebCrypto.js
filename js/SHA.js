/*global define,crypto*/

/*
 * SHA
 * http://www.w3.org/TR/WebCryptoAPI/#sha
 */

var SHA = {};

SHA.sha1 = function (ab, callback) {
  window.crypto.subtle.digest({ name: 'sha-1' }, ab).then(callback);
};

SHA.sha256 = function (ab, callback) {
  window.crypto.subtle.digest({ name: 'sha-256' }, ab).then(callback);
};

SHA.sha384 = function (ab, callback) {
  window.crypto.subtle.digest({ name: 'sha-384' }, ab).then(callback);
};

SHA.sha512 = function (ab, callback) {
  window.crypto.subtle.digest({ name: 'sha-512' }, ab).then(callback);
};

module.exports = SHA;
