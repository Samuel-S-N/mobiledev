const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// expo-sqlite uses WebAssembly on web, which requires SharedArrayBuffer.
// SharedArrayBuffer is only available in cross-origin isolated contexts, so
// we must send COOP + COEP headers from the dev server.
config.resolver.assetExts.push("wasm");

config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
