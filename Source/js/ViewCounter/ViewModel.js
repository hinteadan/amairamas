(function (eventId, chk, useCase, ko, notify, undefined) {
    'use strict';

    function ViewModel(loadCounter, id) {
        /// <param name='loadCounter' type='useCase' />
        chk.notEmpty(loadCounter, 'loadCounter');
        chk.notEmpty(id, 'id');

        var title = ko.observable('test'),
            countdownFormatted = ko.observable('00:00:00');

        function initializeCounter() {
            loadCounter
                .byId(id)
                .then(function (result) {
                    /// <param name='result' type='ds.OperationResult' />
                    if (!result.isSuccess) {
                        notify.error(result.reason);
                        return;
                    }
                    title(result.data.Data.title);
                });
        }

        initializeCounter();

        this.title = title;
        this.countdown = countdownFormatted;
    }

    this.ko.applyBindings(new ViewModel(new this.Counter.load(new ds.Store(this.app.config.connectionString.dbName, this.app.config.connectionString.httpDataStore)), eventId));

}).call(this, this.$.query.GET().e, this.H.Check, this.Counter, this.ko, this.notify);