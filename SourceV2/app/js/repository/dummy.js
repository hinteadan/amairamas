(function (ng, _) {
    'use strict';

    function Event(timestamp, label)
    {
        this.timestamp = timestamp || new Date().getTime();
        this.id = this.timestamp;
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

        this.single = function (id) {
            return _.find(events, { id: id });
        };

        generateEvents();

    }]);

})(this.angular, this._);