module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.png"
  ],
  "swDest": "public/js/sw.js",
  "swSrc": "public/js/service-worker.js"
};

//to build - workbox injectManifest workbox-config.js