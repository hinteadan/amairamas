(function ($, moment, ds, Counter) {
    'use strict';

    var counterJq = $('.counter'),
        endDate = moment('24-12-2013 19:30:00', 'DD-MM-YYYY HH:mm:ss'),
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

    var dataStore = new ds.Store();
    $('#ButtonSave').click(function () {
        Counter.addTo(new ds.Store())
            .having(new Date(2014, 1, 28), 'H\'s Birthday', 'The 2013 birthday of H')
            .save()
            .then(function (/*result*/) { });
    });
    $('#ButtonQueryMeta').click(function () {
        Counter
            .findAllFrom(new ds.Store())
            .then(function (result) {
                console.log(result);
            });
    });
    $('#ButtonQuery').click(function () {
        Counter
            .findAllFrom(new ds.Store())
            .fullEntities()
            .then(function (result) {
                console.log(result);
            });
    });
    $('#ButtonDelete').click(function () {
        dataStore.Delete('a2b0312e-0e0c-4628-97f8-15405e8c849d');
    });
    $('#ButtonLoad').click(function () {
        Counter.findFrom(new ds.Store()).byId('a327d832-011f-4357-a9c9-6d32b21b9d91').then(function (result) {
            console.log(result);
        });
    });

})(this.$, this.moment, this.DataStore, this.Counter);