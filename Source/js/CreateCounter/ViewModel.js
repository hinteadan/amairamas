(function (ko, moment, _, counter, ds, chk, undefined) {
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

        var now = moment(),
            yearsToShow = 10,
            months = fetchMonths();

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

        this.add = function () {
            var entity = new ds.Entity(),
                eventMoment = moment.utc([this.year(), this.month().index, this.day(), this.hour(), this.minute(), this.second()]);
            counter
                .addTo(dataStore)
                .having(eventMoment.toDate(), this.title())
                .save()
                .then(function (result) {
                    /// <param name='result' type='ds.OperationResult' />
                    console.log(result);
                });
        };
    }

    ko.applyBindings(new ViewModel(new ds.Store()));

}).call(this, this.ko, this.moment, this._, this.Counter, this.DataStore, this.H.Check);