(function (ng) {
    'use strict';

    ng.module('event', ['ng', 'ngRoute', 'ui', 'event-repository'])
    .config(['$routeProvider', function ($route) {
        $route
            .when('/:id', { templateUrl: 'js/event/event.tmpl.html', controller: 'event-ctrl' });
    }]);

})(this.angular);