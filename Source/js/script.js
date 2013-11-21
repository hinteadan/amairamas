(function ($, moment) {
    'use strict';

    var counterJq = $('.counter'),
        endDate = moment("23-11-2013 12:30:00", "DD-MM-YYYY HH:mm:ss"),
        resolution = 100;

    function pad(v, desiredLength) {
        var length = desiredLength || 2,
            paddedValue = String(v);
        while (paddedValue.length < length) {
            paddedValue = '0' + paddedValue;
        }
        return paddedValue;
    }

    function updateCounter() {

        if (moment().isAfter(endDate) || moment().isSame(endDate)) {
            counterJq.html('Event already happened on ' + endDate.format('MMMM Do, YYYY') + ' at ' + endDate.format('HH:mm:ss'));
            return false;
        }

        var now = moment(),
            hours = pad(endDate.diff(now, 'hours')),
            minutes = pad(endDate.diff(now, 'minutes') - 60 * hours),
            seconds = pad(endDate.diff(now, 'seconds') - hours * 60 * 60 - 60 * minutes),
            mseconds = pad(endDate.diff(now, 'milliseconds') - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000, 3);
        counterJq.html(hours + 'h ' + minutes + 'm ' + seconds + '.' + mseconds + 's');
        return true;
    }

    function updateCounterAndQueueAnother() {
        if (updateCounter()) {
            setTimeout(updateCounterAndQueueAnother, resolution);
        }
    }

    updateCounterAndQueueAnother();

})(this.$, this.moment);