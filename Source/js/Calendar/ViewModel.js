(function (ko, chk, undefined) {
    'use strict';

    function ViewModel() {
        var today = ko.observable(19),
            year = ko.observable(2013),
            month = ko.observable(11),
            yearsToShow = 10,
            years = ko.observableArray([]),
            months = [
                { Label: 'Ian', Index: 0 },
                { Label: 'Feb', Index: 1 },
                { Label: 'Mar', Index: 2 },
                { Label: 'Apr', Index: 3 },
                { Label: 'Mai', Index: 4 },
                { Label: 'Iun', Index: 5 },
                { Label: 'Iul', Index: 6 },
                { Label: 'Aug', Index: 7 },
                { Label: 'Sep', Index: 8 },
                { Label: 'Oct', Index: 9 },
                { Label: 'Noi', Index: 10 },
                { Label: 'Dec', Index: 11 }
            ],
            weeks = ko.observableArray([]),
            selectedDate = ko.observable(null);

        function initializeYears() {
            for (var y = year() ; y < year() + yearsToShow; y++) {
                years.push(y);
            }
        }

        function initializeWeeks() {
            weeks.removeAll();
            weeks([
                    [25, 26, 27, 28, 29, 30, 1],
                    [2, 3, 4, 5, 6, 7, 8],
                    [9, 10, 11, 12, 13, 14, 15],
                    [16, 17, 18, 19, 20, 21, 22],
                    [23, 24, 25, 26, 27, 28, 29],
                    [30, 31, 1, 2, 3, 4, 5]
                ]);
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

        function generateDate(dayOfMonth, mt, y, h, m, s) {
            chk.notEmpty(dayOfMonth, 'dayOfMonth');
            return new Date(y || year(), mt || month(), dayOfMonth, h || 0, m || 0, s || 0);
        }

        function setSelectedDate(dayOfMonth) {
            selectedDate(generateDate(dayOfMonth));
        }

        initializeYears();
        initializeWeeks();

        this.today = today;
        this.dayClass = generateDayCssClass;
        this.weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        this.months = months;
        this.years = years;
        this.year = year;
        this.month = month;
        this.weeks = weeks;
        this.setDate = setSelectedDate;
        this.selectedDate = selectedDate;
    }

    ko.applyBindings(new ViewModel());

}).call(this, this.ko, this.H.Check);