(function (ng) {
    'use strict';

    ng.module('event').controller('event-ctrl', ['$scope', function ($s) {

        $s.title = 'Time to Wimbledon';
        $s.time = 69;
        $s.unit = 'days';

    }]);

})(this.angular);