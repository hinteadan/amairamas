(function (ko, moment, _, counter, ds, chk, notify, undefined) {
    'use strict';

    function Month(name, index) {
        this.name = name;
        this.index = index;
    }

    function fetchMonths(){
        var m = moment();
        return _(_.range(0, 12)).map(function(i){
            return new Month(m.month(i).format('MMM'), i);
        }).value();
    }

    function ViewModel(dataStore) {
        /// <param name='dataStore' type='ds.Store' />
        chk.notEmpty(dataStore, 'dataStore');

        var self = this,
            now = moment(),
            yearsToShow = 10,
            months = fetchMonths();

        function defaultResultHandler(result) {
            /// <param name='result' type='ds.OperationResult' />
            self.isSaving(false);
            notify.operation(result);
        }

        this.year = ko.observable(now.year());
        this.month = ko.observable(months[now.month()]);
        this.day = ko.observable(now.date());
        this.hour = ko.observable(now.hour());
        this.minute = ko.observable(now.minute());
        this.second = ko.observable(now.second());
        this.title = ko.observable('');

        this.years = ko.observableArray(_.range(this.year(), this.year() + yearsToShow));
        this.months = ko.observableArray(months);
        this.days = ko.observableArray(_.range(1, 31));

        this.isSaving = ko.observable(false);

        this.add = function () {
            var eventMoment = moment.utc([this.year(), this.month().index, this.day(), this.hour(), this.minute(), this.second()]);

            try
            {
                counter
                    .addTo(dataStore)
                    .having(eventMoment.toDate(), this.title())
                    .save(function () { self.isSaving(true); })
                    .then(defaultResultHandler);
            }
            catch(err)
            {
                /// <param name='err' type='Error' />
                notify.message(err.message, notify.type.warning);
            }
        };
    }

    ko.applyBindings(new ViewModel(new ds.Store()));

}).call(this, this.ko, this.moment, this._, this.Counter, this.DataStore, this.H.Check, this.notify);