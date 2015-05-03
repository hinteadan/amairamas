(function () {

    'use strict';

    var timestampNow = 0;

    function formatTime(timestamp) {
        var units = ['s', 'm', 'h', 'd', 'M', 'y'],
            unitBases = [1000, 60, 60, 24, 30, 12],
            now = new Date().getTime(),
            diff = Math.abs(timestamp - now),
            unit = units[0];

        for (var i = 0; i < units.length; i++) {
            if(Math.floor(diff / unitBases[i]) === 0){
                break;
            }
            diff = Math.floor(diff / unitBases[i]);
            unit = units[i];
        }

        return { time: diff, unit: unit, past: timestamp <= now };
    }

    describe('Time formatter', function () {

        it('displays number of seconds when span is 59 seconds or less', function () {
            expect(formatTime(new Date().getTime() + 59 * 1000)).toEqual({ time: 59, unit: 's', past: false });
            expect(formatTime(new Date().getTime() + 10 * 1000)).toEqual({ time: 10, unit: 's', past: false });

            expect(formatTime(new Date().getTime())).toEqual({ time: 0, unit: 's', past: true });

            expect(formatTime(new Date().getTime() - 10 * 1000)).toEqual({ time: 10, unit: 's', past: true });
            expect(formatTime(new Date().getTime() - 59 * 1000)).toEqual({ time: 59, unit: 's', past: true });
        });

        it('displays number of minutes when span is 1 to 59 minutes', function () {
            expect(formatTime(new Date().getTime() + 60 * 1000)).toEqual({ time: 1, unit: 'm', past: false });
            expect(formatTime(new Date().getTime() - 60 * 1000)).toEqual({ time: 1, unit: 'm', past: true });

            expect(formatTime(new Date().getTime() + 59 * 60 * 1000)).toEqual({ time: 59, unit: 'm', past: false });
            expect(formatTime(new Date().getTime() - 59 * 60 * 1000)).toEqual({ time: 59, unit: 'm', past: true });
        });

    });

})();