exports.config = {
  "modules": [
    "copy",
    "jshint",
    "csslint",
    "server",
    "require",
    "minify-js",
    "minify-css",
    "live-reload"
  ],
  "watch": {
    "sourceDir": "public",
    "compiledDir": "public",
    "javascriptDir": "js",
    "exclude": ["lib"]
  }
}
