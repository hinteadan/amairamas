(function (ng, _) {
    'use strict';

    function Event(timestamp, label) {
        var self = this;
        this.timestamp = timestamp || new Date().getTime();
        this.id = this.timestamp;
        this.label = label || 'Unknown event ' + this.timestamp;

        this.set = function (property, value) {
            self[property] = value;
            return self;
        };
    }

    ng.module('event-repository').service('hangOutEvents', ['$q', 'dataStore', 'model', function ($q, data, m) {

        var events = [],
            mostRecentEvent = null,
            deffAll = $q.defer(),
            deffRecent = $q.defer();
        
        function eventImage(urls) {
            var img = '';
            if (!urls || !urls.length) {
                return null;
            }

            img = urls[_.random(0, urls.length - 1, false)];

            if (img.substr(0, 3) === '../') {
                img = img.replace('..', 'http://h-hang-out.azurewebsites.net');
            }

            return img;
        }

        function initialize() {
            $q
                .all({
                    past: data.pastActivities(),
                    future: data.activitiesToJoin(new m.Individual('none', 'none'))
                })
                .then(function (e) {
                    var now = new Date().getTime();
                    events = _.map(e.past.concat(e.future), function (activityEntry) {
                        return new Event(activityEntry.startsOn, activityEntry.activity.title)
                        .set('details', activityEntry.activity.description || null)
                        .set('image', eventImage(activityEntry.activity.imageUrls))
                        .set('url', 'http://h-hang-out.azurewebsites.net/#!/activity/' + activityEntry.id);
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