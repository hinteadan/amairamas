(function (ng) {
    'use strict';

    ng.module('timeline').controller('timeline-ctrl', ['$scope', 'dummyEventsRepository', function ($s, events) {

        $s.events = events.all();

    }]);

})(this.angular);