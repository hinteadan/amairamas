(function (ko, moment, _, counter, ds, chk, notify, undefined) {
    'use strict';

    var window = this.window;

    function redirectTo(url) {
        window.location.href = url;
    }

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
            months = fetchMonths(),
            lastAddedId = ko.observable(null);

        function defaultResultHandler(result) {
            /// <param name='result' type='ds.OperationResult' />
            self.isSaving(false);
            notify.operation(result);
            lastAddedId(result.data.Id);
            reset();
        }

        function goToLatestAddedEvent() {
            redirectTo('view.html?e=' + lastAddedId());
        }

        function isUrlStringValid(url) {
            if (chk.isEmpty(url)) {
                return false;
            }
            return (/^https?:\/\/.+?/i).test(url);
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
        this.wallpaperUrl = ko.observable(null);

        this.years = ko.observableArray(_.range(this.year(), this.year() + yearsToShow));
        this.months = ko.observableArray(months);
        this.days = ko.observableArray(_.range(1, 31));

        this.latestId = lastAddedId;
        this.viewLatestEvent = goToLatestAddedEvent;
        this.isSaving = ko.observable(false);
        this.isAdvanced = ko.observable(false);

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
                var c = counter
                    .addTo(dataStore)
                    .having(eventMoment.toDate(), this.title());
                if(isUrlStringValid(this.wallpaperUrl())){
                    c = c.andDetails(this.wallpaperUrl());
                }

                c.save(function () { self.isSaving(true); })
                .then(defaultResultHandler);
            }
            catch(err)
            {
                /// <param name='err' type='Error' />
                notify.warning(err.message);
            }
        };
    }

    ko.applyBindings(new ViewModel(new ds.Store(this.app.config.connectionString.dbName, this.app.config.connectionString.httpDataStore), new this.model.CalendarViewModel()));

}).call(this, this.ko, this.moment, this._, this.Counter, this.DataStore, this.H.Check, this.notify);