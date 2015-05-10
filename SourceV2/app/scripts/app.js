(function (ng) {
    'use strict';

    ng.module('amr', ['ng', 'ngRoute', 'timeline', 'event'])
    .config(['$routeProvider', function ($route) {
        $route
            .otherwise('/');
    }]);

})(this.angular);