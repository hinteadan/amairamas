(function ($, moment, ds) {
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
        dataStore.Save(new ds.Entity({ Name: 'Danish' }, { Name: 'Danish', Username: 'dan.hintea' }));
    });
    $('#ButtonQueryMeta').click(function () {
        dataStore.QueryMeta(new ds.Query().where('Name')(ds.is.EqualTo)('Danish'));
    });
    $('#ButtonQuery').click(function () {
        dataStore.Query(new ds.Query().where('Name')(ds.is.EqualTo)('Danish'));
    });
    $('#ButtonDelete').click(function () {
        dataStore.Delete('a2b0312e-0e0c-4628-97f8-15405e8c849d');
    });
    $('#ButtonLoad').click(function () {
        dataStore.Load('b71aff3c-7911-42fe-9757-64cc951ba4bd');
    });

})(this.$, this.moment, this.DataStore);