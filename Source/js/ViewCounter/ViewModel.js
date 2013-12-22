(function (eventId, chk, useCase, ko, notify, moment, defaultInterval, undefined) {
    'use strict';

    function ViewModel(loadCounter, eventId) {
        /// <param name='loadCounter' type='useCase' />
        chk.notEmpty(loadCounter, 'loadCounter');
        if (chk.isEmpty(eventId)) {
            notify.error('Invalid event');
            chk.notEmpty(eventId, 'eventId');
        }

        var resolution = defaultInterval || 1000,
            title = ko.observable(null),
            description = ko.observable(null),
            countdownFormatted = ko.observable(null);

        function pad(v, desiredLength) {
            var length = desiredLength || 2,
                paddedValue = String(v);
            while (paddedValue.length < length) {
                paddedValue = '0' + paddedValue;
            }
            return paddedValue;
        }

        function updateCounter(endDate) {
            if (moment().isAfter(endDate) || moment().isSame(endDate)) {
                countdownFormatted('Event already happened on ' + endDate.format('MMMM Do, YYYY') + ' at ' + endDate.format('HH:mm:ss'));
                return false;
            }

            var now = moment(),
                hours = pad(endDate.diff(now, 'hours')),
                minutes = pad(endDate.diff(now, 'minutes') - 60 * hours),
                seconds = pad(endDate.diff(now, 'seconds') - hours * 60 * 60 - 60 * minutes)/*,
                mseconds = pad(endDate.diff(now, 'milliseconds') - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000, 3)*/;
            countdownFormatted(hours + 'h ' + minutes + 'm ' + seconds + 's');
            return true;
        }

        function updateCounterAndQueueAnother(endDate) {
            if (updateCounter(endDate)) {
                setTimeout(updateCounterAndQueueAnother, resolution, endDate);
            }
        }

        function startCountdown(endsOn) {
            ///<param name='endsOn' type='moment' />
            updateCounterAndQueueAnother(endsOn);
        }

        function initializeCounter() {
            loadCounter
                .byId(eventId)
                .then(function (result, counter) {
                    /// <param name='result' type='ds.OperationResult' />
                    /// <param name='counter' type='model.Counter' />
                    if (!result.isSuccess) {
                        notify.error(result.reason);
                        return;
                    }
                    title(counter.title);
                    description(counter.description);
                    startCountdown(counter.endsOnMoment());
                });
        }

        initializeCounter();

        this.title = title;
        this.countdown = countdownFormatted;
    }

    this.ko.applyBindings(new ViewModel(new this.Counter.load(new this.ds.Store(this.app.config.connectionString.dbName, this.app.config.connectionString.httpDataStore)), eventId));

}).call(this, this.$.query.GET().e, this.H.Check, this.Counter, this.ko, this.notify, this.moment, this.app.config.counterUpdateInterval);