(function (ng) {
    'use strict';

    ng.module('timeline', ['ng', 'ngRoute', 'ui', 'cfp.loadingBar', 'angular-loading-bar', 'event-repository'])
    .config(['$routeProvider', 'cfpLoadingBarProvider', function ($route, loadingBar) {
        $route
            .when('/', { templateUrl: 'scripts/timeline/timeline.tmpl.html', controller: 'timeline-ctrl' });
        loadingBar.includeSpinner = false;
    }]);

})(this.angular);