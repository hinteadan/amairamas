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
        };

        this.for = function (unit) {
            return labels[unit] || '';
        };

    }]);

})(this.angular);