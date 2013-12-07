(function (ko, moment, _, undefined) {
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

    function ViewModel() {
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
    }

    ko.applyBindings(new ViewModel());

}).call(this, this.ko, this.moment, this._);