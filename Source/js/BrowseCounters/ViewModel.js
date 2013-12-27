(function (ko, chk, undefined) {
    'use strict';

    var dummyCounter = new this.model.Counter(new Date(2013, 12, 31), 'Happy New Year !'),
        tileType = {
            large: { css: 'tile-large', quadrants: 4 },
            wide: { css: 'tile-wide', quadrants: 2 },
            medium: { css: 'tile-medium', quadrants: 1 },
            small: { css: 'tile-small', quadrants: 0.25 }
        };

    function EventTile(counter, type){
        /// <param name='counter' type='model.Counter' />
        chk.notEmpty(counter, 'counter');
        chk.notEmpty(type, 'type');

        this.counter = counter;
        this.endsOnFormatted = counter.endsOnMoment().format('ddd, MMMM D, YYYY');
        this.type = type;
    }

    function EventTileGroup(counters) {
        /// <param name='counters' type='Array' elementType='EventTile' />
        chk.notEmpty(counters, 'counters');
        chk.condition(counters.length > 0, 'A group must have some events');

        var availableQuadrants = 4,
            groupedCounters = [];

        for (var counterIndex = 0; counterIndex < counters.length; counterIndex++) {
            var tile = counters[counterIndex];
            if (availableQuadrants < tile.type.quadrants) {
                throw new Error('Insufficient space in group for the given counter tiles. Change the group or tile types.');
            }
            availableQuadrants -= tile.type.quadrants;
            if (tile.type.quadrants < 1) {
                var isFirstInGroup = counterIndex === 0 || groupedCounters[groupedCounters.length - 1].length === undefined;
                if (isFirstInGroup) {
                    groupedCounters.push([]);
                }
                groupedCounters[groupedCounters.length - 1].push(tile);
            }
            if (tile.type.quadrants >= 1) {
                groupedCounters.push(tile);
                availableQuadrants = Math.floor(availableQuadrants);
            }
        }

        this.counters = groupedCounters;
    }

    function ViewModel() {
        var events = ko.observableArray([
            new EventTileGroup([new EventTile(dummyCounter, tileType.wide), new EventTile(dummyCounter, tileType.wide)]),
            new EventTileGroup([
                new EventTile(dummyCounter, tileType.wide),
                new EventTile(dummyCounter, tileType.small),
                new EventTile(dummyCounter, tileType.small),
                new EventTile(dummyCounter, tileType.small),
                new EventTile(dummyCounter, tileType.medium)
            ]),
        ]);

        this.events = events;
    }

    this.ko.applyBindings(new ViewModel());

}).call(this, this.ko, this.H.Check);