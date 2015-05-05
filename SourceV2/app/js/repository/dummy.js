(function (ng) {
    'use strict';

    function Event(timestamp, label)
    {
        this.timestamp = timestamp || new Date().getTime();
        this.label = label || 'Unknown event ' + this.timestamp;
    }

    ng.module('event-repository').service('dummyEventsRepository', [function () {

        var maxEvents = 100,
            events = [];

        function generateEvents() {
            for (var i = 0; i < maxEvents; i++) {
                events.push(new Event(new Date().getTime() + Math.round(Math.random() * maxEvents * 5000 * 60  * 1000)));
            }
        }

        this.all = function () {
            return events;
        };

        this.recent = function () {
            return events[0];
        };

        generateEvents();

    }]);

})(this.angular);