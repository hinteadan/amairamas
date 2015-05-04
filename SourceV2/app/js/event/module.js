(function (ng) {
    'use strict';

    ng.module('event', ['ng', 'ngRoute'])
    .config(['$routeProvider', function ($route) {
        $route
            .when('/:id', { templateUrl: 'js/event/event.tmpl.html' })
    }]);

})(this.angular);