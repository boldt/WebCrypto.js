// Shims for Browsers

var Shims = {
  crypto: window.crypto,
  TextEncoder: window.TextEncoder,
  TextDecoder: window.TextDecoder
}

module.exports = Shims;
