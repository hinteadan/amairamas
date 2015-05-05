(function (ng, _) {
    'use strict';

    ng.module('timeline').controller('timeline-ctrl', ['$scope', 'dummyEventsRepository', function ($s, events) {

        function timestampToTimelineDate(timestamp) {
            var d = new Date(timestamp);
            return d.getFullYear() + ',' + (d.getMonth() + 1) + ',' + d.getDate() /*+ ',' + d.getHours() + ',' + d.getMinutes() + ',' + d.getSeconds()*/;
        }

        function convertEventToTimelineEntry(evt) {
            return {
                'startDate': timestampToTimelineDate(evt.timestamp),
                'endDate': timestampToTimelineDate(evt.timestamp),
                'headline': evt.label,
                'text': ''
            };
        }

        function createTimelineData() {
            var main = convertEventToTimelineEntry(events.recent());
            return {
                timeline: {
                    headline: main.headline,
                    type: 'default',
                    text: '',
                    date: _.map(events.all(), convertEventToTimelineEntry)
                }
            };
        }

        $s.events = createTimelineData();

    }]);

})(this.angular, this._);