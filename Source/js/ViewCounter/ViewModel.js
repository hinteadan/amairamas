﻿(function (eventId, chk, useCase, ko, notify, moment, defaultInterval, sharing, defaultWallpaper, undefined) {
    'use strict';

    function momentUtc() {
        var now = moment();
        return moment.utc([now.year(), now.month(), now.date(), now.hour(), now.minute(), now.second()]);
    }

    function ViewModel(loadCounter, eventId) {
        /// <param name='loadCounter' type='useCase' />
        chk.notEmpty(loadCounter, 'loadCounter');
        if (chk.isEmpty(eventId)) {
            notify.error('Invalid event');
            chk.notEmpty(eventId, 'eventId');
        }

        var resolution = defaultInterval || 1000,
            title = ko.observable('Loading event...'),
            description = ko.observable('Please wait...'),
            countdownFormatted = ko.observable(null),
            endsOnDateFormatted = ko.observable(null),
            endsOnTimeFormatted = ko.observable(null),
            wallpaper = ko.observable(),
            defaultMessageFor = {
                unknownError: 'Some unknown error has occurred, please try again or contact us.'
            };

        function pad(v, desiredLength) {
            var length = desiredLength || 2,
                paddedValue = String(v);
            while (paddedValue.length < length) {
                paddedValue = '0' + paddedValue;
            }
            return paddedValue;
        }

        function updateCounter(endDate) {
            if (momentUtc().isAfter(endDate) || momentUtc().isSame(endDate)) {
                countdownFormatted('Concluded!');
                return false;
            }

            var now = momentUtc(),
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
                        notify.error(result.reason || defaultMessageFor.unknownError);
                        return;
                    }
                    title(counter.title);
                    description(counter.description);
                    wallpaper(counter.wallUrl || defaultWallpaper);
                    endsOnDateFormatted(counter.endsOnMoment().format('ddd, MMMM D, YYYY'));
                    endsOnTimeFormatted(counter.endsOnMoment().format('HH:mm:ss'));
                    startCountdown(counter.endsOnMoment());
                    new sharing.SocialShare()
                        .includeTwitter()
                        .includeFacebookShare()
                        .includeGooglePlusShare();
                });
        }

        initializeCounter();

        this.title = title;
        this.description = description;
        this.wallpaper = wallpaper;
        this.countdown = countdownFormatted;
        this.endsOnDate = endsOnDateFormatted;
        this.endsOnTime = endsOnTimeFormatted;
    }

    this.ko.applyBindings(new ViewModel(new this.Counter.load(new this.ds.Store(this.app.config.connectionString.dbName, this.app.config.connectionString.httpDataStore)), eventId), this.$('html')[0]);

}).call(this, this.$.query.GET().e, this.H.Check, this.Counter, this.ko, this.notify, this.moment, this.app.config.counterUpdateInterval, this.Sharing, this.app.config.defaultWallpaper);