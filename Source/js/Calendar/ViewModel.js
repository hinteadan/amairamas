﻿(function (ko, undefined) {
    'use strict';

    function ViewModel() {
        this.weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        this.monthNames = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
        this.year = ko.observable(2013);
        this.month = ko.observable(11);
        this.weeks = [
            [25, 26, 27, 28, 29, 30, 1],
            [2, 3, 4, 5, 6, 7, 8],
            [9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20, 21, 22],
            [23, 24, 25, 26, 27, 28, 29],
            [30, 31, 1, 2, 3, 4, 5]
        ];
    }

    ko.applyBindings(new ViewModel());

}).call(this, this.ko);