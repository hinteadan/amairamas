(function (ng, time) {
    'use strict';

    ng.module('event').controller('event-ctrl', ['$scope', '$location', '$routeParams', 'unitLabel', 'dummyEventsRepository', function ($s, $l, $p, unitLabel, events) {

        var event = events.single(Number($p.id)) || {},
            amr = time(event.id);

        if (!event.id) {
            $l.path('/');
            return;
        }

        $s.title = event.label;
        $s.time = amr.time;
        $s.unit = unitLabel.for(amr.unit) + ' ' + (amr.past ? ' since it happened' : ' until it begins');

    }]);

})(this.angular, this.H.formatTime);