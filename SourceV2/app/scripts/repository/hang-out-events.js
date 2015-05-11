(function (ng, _) {
    'use strict';

    function Event(timestamp, label) {
        this.timestamp = timestamp || new Date().getTime();
        this.id = this.timestamp;
        this.label = label || 'Unknown event ' + this.timestamp;
    }

    ng.module('event-repository').service('hangOutEvents', ['$q', 'dataStore', 'model', function ($q, data, m) {

        var events = [],
            mostRecentEvent = null,
            deffAll = $q.defer(),
            deffRecent = $q.defer();
        
        function initialize() {
            $q
                .all({
                    past: data.pastActivities(),
                    future: data.activitiesToJoin(new m.Individual('none', 'none'))
                })
                .then(function (e) {
                    var now = new Date().getTime();
                    events = _.map(e.past.concat(e.future), function (activityEntry) {
                        return new Event(activityEntry.startsOn, activityEntry.activity.title);
                    });
                    mostRecentEvent = _.min(events, function (e) {
                        return Math.abs(e.timestamp - now);
                    });
                    deffAll.resolve(events);
                    deffRecent.resolve(mostRecentEvent);
                });
        }

        this.all = function () {
            return deffAll.promise;
        };

        this.recent = function () {
            return deffRecent.promise;
        };

        this.single = function (id) {
            return _.find(events, { id: id });
        };

        initialize();

    }]);

})(this.angular, this._);