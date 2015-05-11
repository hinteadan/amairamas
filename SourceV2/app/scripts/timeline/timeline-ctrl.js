(function (ng, _, time) {
    'use strict';

    ng.module('timeline').controller('timeline-ctrl', ['$scope', 'unitLabel', 'hangOutEvents', function ($s, unitLabel, events) {

        function timestampToTimelineDate(timestamp) {
            var d = new Date(timestamp);
            return d.getFullYear() + ',' + (d.getMonth() + 1) + ',' + d.getDate() /*+ ',' + d.getHours() + ',' + d.getMinutes() + ',' + d.getSeconds()*/;
        }

        function textForEvent(evt) {
            var amr = time(evt.timestamp),
                unitLabels = unitLabel.withPluralsFor(amr.unit),
                unit = unitLabels[amr.time] || unitLabels.other;

            return amr.time + ' ' + unit + ' ' + (amr.past ? ' since it happened' : ' until it begins') + '. <a href="#/' + evt.id + '">View Countdown</a>.';
        }

        function convertEventToTimelineEntry(evt) {
            return {
                'startDate': timestampToTimelineDate(evt.timestamp),
                'endDate': timestampToTimelineDate(evt.timestamp),
                'headline': evt.label,
                'text': textForEvent(evt),
                'asset': {
                    'media': 'http://www.recognos.ro',
                    'credit': 'by Recognos',
                    'caption': 'Recognos stuff'
                }
            };
        }

        function createTimelineData() {
            events.all().then(function (events) {
                $s.events = {
                    timeline: {
                        type: 'default',
                        date: _.map(events, convertEventToTimelineEntry)
                    }
                };
            });
        }

        $s.events = null;

        createTimelineData();

    }]);

})(this.angular, this._, this.H.formatTime);