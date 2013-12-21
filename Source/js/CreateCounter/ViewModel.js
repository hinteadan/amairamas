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

    function ViewModel(dataStore, calendarViewModel) {
        /// <param name='dataStore' type='ds.Store' />
        /// <param name='calendarViewModel' type='model.CalendarViewModel' />
        chk.notEmpty(dataStore, 'dataStore');
        chk.notEmpty(calendarViewModel, 'calendarViewModel');

        var self = this,
            now = moment(),
            yearsToShow = 10,
            months = fetchMonths();

        function defaultResultHandler(result) {
            /// <param name='result' type='ds.OperationResult' />
            self.isSaving(false);
            notify.operation(result);
            reset();
        }

        function reset() {
            self.year(now.year());
            self.month(months[now.month()]);
            self.day(now.date());
            self.hour(now.hour());
            self.minute(now.minute());
            self.second(now.second());
            self.title('');
            calendarViewModel.reset();
        }

        this.calendar = calendarViewModel;

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
            if (chk.isEmpty(this.title())) {
                notify.warning('Please enter a title for the event');
                return;
            }
            if (chk.isEmpty(calendarViewModel.selectedDate.asDate())) {
                notify.warning('Select a date first');
                return;
            }

            var eventMoment = calendarViewModel.selectedDate.asMomentUtc();
            
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
                notify.warning(err.message);
            }
        };
    }

    ko.applyBindings(new ViewModel(new ds.Store(this.app.config.connectionString.dbName), new this.model.CalendarViewModel()));

}).call(this, this.ko, this.moment, this._, this.Counter, this.DataStore, this.H.Check, this.notify);