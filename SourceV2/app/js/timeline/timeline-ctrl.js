(function (ng, _, time) {
    'use strict';

    ng.module('timeline').controller('timeline-ctrl', ['$scope', 'unitLabel', 'dummyEventsRepository', function ($s, unitLabel, events) {

        function timestampToTimelineDate(timestamp) {
            var d = new Date(timestamp);
            return d.getFullYear() + ',' + (d.getMonth() + 1) + ',' + d.getDate() /*+ ',' + d.getHours() + ',' + d.getMinutes() + ',' + d.getSeconds()*/;
        }

        function textForEvent(evt) {
            var amr = time(evt.timestamp);
            return amr.time + ' ' + unitLabel.for(amr.unit) + ' ' + (amr.past ? ' since it happened' : ' until it begins ') + '. <a href="#/' + evt.id + '">View Countdown</a>.';
        }

        function convertEventToTimelineEntry(evt) {
            return {
                'startDate': timestampToTimelineDate(evt.timestamp),
                'endDate': timestampToTimelineDate(evt.timestamp),
                'headline': evt.label,
                'text': textForEvent(evt)
            };
        }

        function createTimelineData() {
            var main = convertEventToTimelineEntry(events.recent());
            return {
                timeline: {
                    headline: main.headline,
                    type: 'default',
                    text: textForEvent(events.recent()),
                    date: _.map(events.all(), convertEventToTimelineEntry)
                }
            };
        }

        $s.events = createTimelineData();

    }]);

})(this.angular, this._, this.H.formatTime);