module.exports = {
  "bundles": {
    "dist/app-build": {
      "includes": [
        "[**/*.js]",
        "**/*.html!text",
        "**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": false
      }
    },
    "dist/aurelia": {
      "includes": [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "aurelia-i18n",
        "aurelia-binding",
        "reqwest",
        "jquery",
        "text",
        "bootstrap",
        "bootstrap/css/bootstrap.css!text",
        "i18next-xhr-backend",
        "moment",
        "pnotify",
        "pnotify/dist/pnotify.animate",
        "pnotify/dist/pnotify.buttons",
        "pnotify/dist/pnotify.nonblock",
        "pnotify/dist/pnotify.callbacks",
        "pnotify/dist/pnotify.confirm",
        "pnotify/dist/pnotify.desktop",
        "pnotify/dist/pnotify.history",
        "pnotify/dist/pnotify.mobile",
        "pnotify/dist/pnotify.css!text",
        "pnotify/src/pnotify.nonblock.css!text",
        "pnotify/dist/pnotify.buttons.css!text",
        "pnotify/dist/pnotify.history.css!text",
        "pnotify/dist/pnotify.mobile.css!text"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": false,
        "rev": false
      }
    }
  }
};
