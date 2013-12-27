(function (chk, moment, undefined) {
    'use strict';

    function Counter(to, title, description) {
        var endsOn = moment.utc(to);

        if (arguments[arguments.length - 1] !== true) {
            chk.condition(endsOn.isAfter(moment.utc()), 'Counter must not end in the past');
            chk.notEmpty(title, 'title');
        }

        this.endsOn = to;
        this.endsOnAsJson = endsOn.toJSON();
        this.endsOnAsUnix = endsOn.unix();
        this.title = title;
        this.description = description;
        this.endsOnMoment = function () {
            return endsOn;
        };

        this.Meta = function () {
            return {
                title: this.title,
                endsOn: this.endsOn,
                endsOnAsUnix: this.endsOnAsUnix
            };
        };
    }

    Counter.fromDto = function (dto) {
        return new Counter(dto.endsOnAsJson, dto.title, dto.description, true);
    };

    this.model = this.model || {};
    this.model.Counter = Counter;

}).call(this, this.H.Check, this.moment);