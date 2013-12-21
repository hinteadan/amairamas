(function (ko, chk, moment, undefined) {
    'use strict';

    function ViewModel() {
        var now = moment(),
            today = ko.observable(now.date()),
            year = ko.observable(now.year()),
            month = ko.observable(now.month()),
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
            selectedDate = ko.observable(null),
            selectedMoment = ko.observable(null),
            selectedMomentUtc = ko.observable(null);

        function initializeYears() {
            for (var y = year() ; y < year() + yearsToShow; y++) {
                years.push(y);
            }
        }

        function ensureFullWeek(week) {
            ///<param name='week' type='Array' elementType='Number' />
            if (week.length === 7) {
                return;
            }
            var fillDay = week[0] === 1 ? week.unshift : week.push,
                daysToFill = 7 - week.length;
            for (var i = 0; i < daysToFill; i++) {
                fillDay.call(week, null);
            }
        }

        function initializeWeeks() {
            var now = moment([year(), month()]),
                daysInMonth = now.daysInMonth(),
                week = [];
            weeks.removeAll();

            for (var dayInMonth = 1; dayInMonth <= daysInMonth; dayInMonth++) {
                var weekDay = now.date(dayInMonth).isoWeekday();
                week.push(dayInMonth);
                if (weekDay === 7 || dayInMonth === daysInMonth) {
                    ensureFullWeek(week);
                    weeks.push(week);
                    week = [];
                }
            }

            if (weeks().length < 6) {
                weeks.push([null, null, null, null, null, null, null]);
            }
        }

        function calculateDayLevel(day) {
            return Math.abs(today() - day);
        }

        function generateDayCssClass(day) {
            var level = calculateDayLevel(day);
            if(level > 3){
                return day ? 'clickable' : null;
            }
            return 'day' + level + ' clickable';
        }

        function generateDate(dayOfMonth, mt, y, h, m, s) {
            chk.notEmpty(dayOfMonth, 'dayOfMonth');
            return new Date(y || year(), mt || month(), dayOfMonth, h || 0, m || 0, s || 0);
        }

        function setSelectedDate(dayOfMonth) {
            if (!dayOfMonth) {
                return;
            }
            selectedDate(generateDate(dayOfMonth));
            selectedMoment(moment([year(), month(), dayOfMonth]));
            selectedMomentUtc(moment.utc([year(), month(), dayOfMonth]));
        }

        function moveToNextYear() {
            if(year() === years()[years().length - 1]){
                return;
            }
            year(year() + 1);
        }
        function moveToPrevYear() {
            if (year() === years()[0]) {
                return;
            }
            year(year() - 1);
        }

        function moveToNextMonth(){
            if(month() < 11){
                month(month() + 1);
            }
            else {
                month(0);
                moveToNextYear();
            }
        }

        function moveToPrevMonth() {
            if (month() > 0) {
                month(month() - 1);
            }
            else {
                month(11);
                moveToPrevYear();
            }
        }

        function moveToToday() {
            month(now.month());
            year(now.year());
        }

        function reset() {
            moveToToday();
            selectedDate(null);
            selectedMoment(null);
            selectedMomentUtc(null);
        }

        initializeYears();
        initializeWeeks();
        month.subscribe(initializeWeeks);
        year.subscribe(initializeWeeks);

        this.today = today;
        this.dayClass = generateDayCssClass;
        this.weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        this.months = months;
        this.years = years;
        this.year = year;
        this.month = month;
        this.weeks = weeks;
        this.setDate = setSelectedDate;
        this.selectedDate = {
            asDate: selectedDate,
            asMoment: selectedMoment,
            asMomentUtc: selectedMomentUtc
        };
        this.reset = reset;
        this.nextMonth = moveToNextMonth;
        this.nextYear = moveToNextYear;
        this.prevMonth = moveToPrevMonth;
        this.prevYear = moveToPrevYear;
        this.moveToToday = moveToToday;
    }

    this.model = this.model || {};
    this.model.CalendarViewModel = ViewModel;

}).call(this, this.ko, this.H.Check, this.moment);