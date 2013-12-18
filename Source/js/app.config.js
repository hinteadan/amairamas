(function (undefined) {
    'use strict';

    var appConfig = {
        connectionString: {
            httpDataStore: 'http://localhost/HttpDataStore/'
        }
    };

    this.app = this.app || {};
    this.app.config = appConfig;

}).call(this);