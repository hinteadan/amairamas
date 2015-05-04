(function (formatTime) {

    'use strict';

    var timestampNow = 0;

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

        it('displays number of hours when span is 1 to 23 hours', function () {
            expect(formatTime(new Date().getTime() + 60 * 60 * 1000)).toEqual({ time: 1, unit: 'h', past: false });
            expect(formatTime(new Date().getTime() - 60 * 60 * 1000)).toEqual({ time: 1, unit: 'h', past: true });

            expect(formatTime(new Date().getTime() + 23 * 60 * 60 * 1000)).toEqual({ time: 23, unit: 'h', past: false });
            expect(formatTime(new Date().getTime() - 23 * 60 * 60 * 1000)).toEqual({ time: 23, unit: 'h', past: true });
        });

        it('displays number of days when span is 1 to 29 days', function () {
            expect(formatTime(new Date().getTime() + 24 * 60 * 60 * 1000)).toEqual({ time: 1, unit: 'd', past: false });
            expect(formatTime(new Date().getTime() - 24 * 60 * 60 * 1000)).toEqual({ time: 1, unit: 'd', past: true });

            expect(formatTime(new Date().getTime() + 29 * 24 * 60 * 60 * 1000)).toEqual({ time: 29, unit: 'd', past: false });
            expect(formatTime(new Date().getTime() - 29 * 24 * 60 * 60 * 1000)).toEqual({ time: 29, unit: 'd', past: true });
        });

        it('displays number of months when span is 30 days to 11 months', function () {
            expect(formatTime(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 1, unit: 'M', past: false });
            expect(formatTime(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 1, unit: 'M', past: true });

            expect(formatTime(new Date().getTime() + 11 * 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 11, unit: 'M', past: false });
            expect(formatTime(new Date().getTime() - 11 * 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 11, unit: 'M', past: true });
        });

        it('displays number of years when span is 12 months or more', function () {
            expect(formatTime(new Date().getTime() + 12 * 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 1, unit: 'y', past: false });
            expect(formatTime(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 1, unit: 'y', past: true });

            expect(formatTime(new Date().getTime() + 166 * 12 * 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 166, unit: 'y', past: false });
            expect(formatTime(new Date().getTime() - 111 * 12 * 30 * 24 * 60 * 60 * 1000)).toEqual({ time: 111, unit: 'y', past: true });
        });

    });

})(H.formatTime);