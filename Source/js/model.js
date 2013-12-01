﻿(function (chk, moment, undefined) {
    'use strict';

    function Counter(to, title, description) {
        var endsOn = moment(to);

        chk.condition(endsOn.isBefore(moment()), 'Counter must not end in the past');
        chk.notEmpty(title, 'title');

        this.endsOn = to;
        this.endsOnAsJson = endsOn.toJSON();
        this.endsOnAsUnix = endsOn.unix();
        this.title = title;
        this.description = description;

        this.Meta = function () {
            return {
                title: this.title,
                endsOn: this.endsOn,
                endsOnAsUnix: this.endsOnAsUnix
            };
        }
    }

    this.model = {
        Counter: Counter
    };

}).call(this, this.H.Check, this.moment);