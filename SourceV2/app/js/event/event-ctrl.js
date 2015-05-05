(function (ng, time) {
    'use strict';

    ng.module('event').controller('event-ctrl', ['$scope', '$location', '$routeParams', '$timeout', 'unitLabel', 'dummyEventsRepository', function ($s, $l, $p, $t, unitLabel, events) {

        var event = events.single(Number($p.id)) || {},
            refreshInterval = {
                s: 250,
                m: 1000,
                h: 1000 * 60,
                d: 1000 * 60 * 60,
                M: 1000 * 60 * 60 * 24,
                y: 1000 * 60 * 60 * 24 * 28
            };

        if (!event.id) {
            $l.path('/');
            return;
        }

        function refreshCountdown() {
            var amr = time(event.id),
                unitLabels = unitLabel.withPluralsFor(amr.unit),
                unit = unitLabels[amr.time] || unitLabels.other;

            $s.time = amr.time;
            $s.unit = unit + ' ' + (amr.past ? ' since it happened' : ' until it begins');
            return amr;
        }

        function runRefreshCycle() {
            var amr = refreshCountdown(),
                nextRefreshIn = refreshInterval[amr.unit] || 1000;

            console.log(nextRefreshIn);

            $t(runRefreshCycle, nextRefreshIn);
        }

        $s.title = event.label;
        $s.time = '';
        $s.unit = '';

        runRefreshCycle();
    }]);

})(this.angular, this.H.formatTime);