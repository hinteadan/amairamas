(function (undefined) {
    'use strict';

    this.infuser.defaults.templateSuffix = '.tmpl.html';

    var appConfig = {
        connectionString: {
            httpDataStore: 'http://localhost/HttpDataStore/'
        }
    };

    this.app = this.app || {};
    this.app.config = appConfig;

}).call(this);