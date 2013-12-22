(function (undefined) {
    'use strict';

    this.infuser.defaults.templateSuffix = '.tmpl.html';
    this.$.support.cors = true;

    var appConfig = {
        connectionString: {
            httpDataStore: 'http://localhost/HttpDataStore/',
            dbName: 'TrialAndError'
        },
        counterUpdateInterval: 1000
    };

    this.app = this.app || {};
    this.app.config = appConfig;

}).call(this);