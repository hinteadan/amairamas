(function () {

    'use strict';

    var timestampNow = 0;

    function formatTime(timestamp) {
        var now = new Date().getTime();
        return { time: Math.floor(Math.abs((timestamp - now) / 1000)), unit: 's', past: timestamp <= now };
    }

    describe('Time formatter', function () {

        it('displays number of seconds when span is 60 seconds or less', function () {
            expect(formatTime(new Date().getTime() + 60 * 1000)).toEqual({ time: 60, unit: 's', past: false });
            expect(formatTime(new Date().getTime() + 10 * 1000)).toEqual({ time: 10, unit: 's', past: false });

            expect(formatTime(new Date().getTime())).toEqual({ time: 0, unit: 's', past: true });

            expect(formatTime(new Date().getTime() - 10 * 1000)).toEqual({ time: 10, unit: 's', past: true });
            expect(formatTime(new Date().getTime() - 60 * 1000)).toEqual({ time: 60, unit: 's', past: true });
        });

    });

})();