(function (ng) {
    'use strict';

    ng.module('ui').service('unitLabel', [function () {

        var labels = {
            s: 'second(s)',
            m: 'minute(s)',
            h: 'hour(s)',
            d: 'day(s)',
            M: 'month(s)',
            y: 'year(s)'
        },
            labelsWithPlurals = {
                s: { '1': 'second', 'other': 'seconds' },
                m: { '1': 'minute', 'other': 'minutes' },
                h: { '1': 'hour', 'other': 'hours' },
                d: { '1': 'day', 'other': 'days' },
                M: { '1': 'month', 'other': 'months' },
                y: { '1': 'year', 'other': 'years' }
            };

        this.for = function (unit) {
            return labels[unit] || '';
        };

        this.withPluralsFor = function (unit) {
            return labelsWithPlurals[unit] || { '0': '', '1': '', 'other': '' };
        };

    }]);

})(this.angular);