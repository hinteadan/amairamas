(function (ctx) {
    'use strict';

    function formatTime(timestamp) {
        var units = ['s', 'm', 'h', 'd', 'M', 'y'],
            unitBases = [1000, 60, 60, 24, 30, 12],
            now = new Date().getTime(),
            diff = Math.abs(timestamp - now),
            unit = units[0];

        for (var i = 0; i < units.length; i++) {
            if (Math.floor(diff / unitBases[i]) === 0) {
                break;
            }
            diff = Math.floor(diff / unitBases[i]);
            unit = units[i];
        }

        return { time: diff, unit: unit, past: timestamp <= now };
    }

    ctx.H = ctx.H || {};
    ctx.H.formatTime = formatTime;

})(this.window);