﻿(function (ng) {
    'use strict';

    ng.module('amr', ['ng', 'ngRoute', 'event'])
    .config(['$routeProvider', function ($route) {
        $route
            .otherwise('/test');
    }]);

})(this.angular);