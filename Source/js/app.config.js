(function (undefined) {
    'use strict';

    this.infuser.defaults.templateSuffix = '.tmpl.html';
    this.$.support.cors = true;

    var appConfig = {
        connectionString: {
            httpDataStore: 'http://localhost/HttpDataStore/',
            dbName: 'Events'
        },
        counterUpdateInterval: 1000,
        defaultWallpaper: 'img/walls/Winter-Snow-Wallpaper-43.jpg'
    };

    this.app = this.app || {};
    this.app.config = appConfig;

}).call(this);