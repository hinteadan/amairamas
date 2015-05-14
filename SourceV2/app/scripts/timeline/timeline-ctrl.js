(function (ng, _, time) {
    'use strict';

    ng.module('timeline').controller('timeline-ctrl', ['$scope', '$q', 'cfpLoadingBar', 'unitLabel', 'hangOutEvents', function ($s, $q, load, unitLabel, events) {

        function timestampToTimelineDate(timestamp) {
            var d = new Date(timestamp);
            return d.getFullYear() + ',' + (d.getMonth() + 1) + ',' + d.getDate() /*+ ',' + d.getHours() + ',' + d.getMinutes() + ',' + d.getSeconds()*/;
        }

        function textForEvent(evt) {
            var amr = time(evt.timestamp),
                unitLabels = unitLabel.withPluralsFor(amr.unit),
                unit = unitLabels[amr.time] || unitLabels.other;

            return (evt.details ? '<p>' + evt.details + '</p>' : '') +
                '<p>' + amr.time + ' ' + unit + ' ' + (amr.past ? ' since it happened' : ' until it begins') + '. <a href="#/' + evt.id + '">View Countdown</a>.</p>' +
                '<p><a href="' + evt.url + '" target="_blank">View Event</a></p>';
        }

        function convertEventToTimelineEntry(evt) {
            return {
                'startDate': timestampToTimelineDate(evt.timestamp),
                'endDate': timestampToTimelineDate(evt.timestamp),
                'headline': evt.label,
                'text': textForEvent(evt),
                'asset': {
                    'media': evt.image ? evt.image : evt.url,
                    'thumbnail': evt.image,
                    'credit': 'by Hang-out',
                    'caption': null
                }
            };
        }

        function createTimelineData() {

            load.start();

            $q.all({ all: events.all(), recent: events.recent() })
                .then(function (hangoutEvents) {
                    $s.options = {
                        start_at_slide: _.indexOf(hangoutEvents.all, hangoutEvents.recent),// jshint ignore:line
                        start_zoom_adjust: 0// jshint ignore:line
                    };
                    $s.events = {
                        timeline: {
                            type: 'default',
                            date: _.map(hangoutEvents.all, convertEventToTimelineEntry)
                        }
                    };
                }).finally(function () {
                    load.complete();
                });
        }

        $s.events = null;
        $s.options = null;

        createTimelineData();

    }]);

})(this.angular, this._, this.H.formatTime, this.cfp);