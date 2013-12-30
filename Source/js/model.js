(function (chk, moment, defaultWallpaper, undefined) {
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
        this.wallUrl = defaultWallpaper;
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
        var counter = new Counter(dto.endsOnAsJson, dto.title, dto.description, true);
        if (dto.wallUrl) {
            counter.wallUrl = dto.wallUrl;
        }
        return counter;
    };

    Counter.fromDtoMeta = function (meta) {
        return new Counter(meta.endsOn, meta.title, null, true);
    };

    this.model = this.model || {};
    this.model.Counter = Counter;

}).call(this, this.H.Check, this.moment, this.app.config.defaultWallpaper);