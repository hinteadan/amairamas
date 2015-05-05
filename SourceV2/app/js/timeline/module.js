﻿(function (ng) {
    'use strict';

    ng.module('timeline', ['ng', 'ngRoute', 'ui', 'event-repository'])
    .config(['$routeProvider', function ($route) {
        $route
            .when('/', { templateUrl: 'js/timeline/timeline.tmpl.html', controller: 'timeline-ctrl' });
    }]);

})(this.angular);