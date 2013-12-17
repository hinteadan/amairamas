(function (ko, undefined) {
    'use strict';

    function ViewModel() {
        var today = ko.observable(19),
            year = ko.observable(2013),
            yearsToShow = 10,
            years = ko.observableArray([]);

        function initializeYears() {
            for (var y = year() ; y < year() + yearsToShow; y++) {
                years.push(y);
            }
        }

        function calculateDayLevel(day) {
            return Math.abs(today() - day);
        }

        function generateDayCssClass(day) {
            var level = calculateDayLevel(day);
            if(level > 3){
                return null;
            }
            return 'day' + level;
        }

        initializeYears();

        this.today = today;
        this.dayClass = generateDayCssClass;
        this.weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        this.monthNames = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
        this.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.years = years;
        this.year = year;
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