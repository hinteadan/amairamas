﻿(function (ko, chk, UseCase, _, notify, undefined) {
    'use strict';

    var window = this.window;

    function redirectTo(url) {
        window.location.href = url;
    }

    /* jshint ignore:start */
    function ResultModel(id, counter) {
        /// <param name='counter' type='model.Counter' />
        this.id = '';
        this.counter = counter;
    }
    /* jshint ignore:end */

    var loaderCounter = new this.model.Counter(new Date(2100, 1), 'Loading events', 'Please Wait...'),
        tileType = {
            large: { css: 'tile-large', quadrants: 4 },
            wide: { css: 'tile-wide', quadrants: 2 },
            medium: { css: 'tile-medium', quadrants: 1 },
            small: { css: 'tile-small', quadrants: 0.25 }
        };

    function EventTile(id, counter, type){
        /// <param name='counter' type='model.Counter' />
        chk.notEmpty(id, 'id');
        chk.notEmpty(counter, 'counter');
        chk.notEmpty(type, 'type');

        function viewEvent() {
            redirectTo('view.html?e=' + id);
        }

        this.id = id;
        this.counter = counter;
        this.endsOnFormatted = counter.endsOnMoment().format('ddd, MMMM D, YYYY');
        this.type = type;
        this.view = viewEvent;
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
        this.availableQuadrants = function () {
            return availableQuadrants;
        };
    }

    function ViewModel(search) {
        /// <param name='search' type='UseCase' />
        chk.notEmpty(search, 'search');

        var events = ko.observableArray([
            new EventTileGroup([new EventTile('Loader', loaderCounter, tileType.large)]),
        ]);

        function generateLargeTiles(searchResults) {
            /// <param name='searchResults' type='Array' elementType='ResultModel' />
            return _.map(searchResults, function (r) {
                return new EventTileGroup([
                    new EventTile(r.id, r.counter, tileType.large)
                ]);
            });
        }

        function generateRandomTileGroups(searchResults) {
            /// <param name='searchResults' type='Array' elementType='ResultModel' />
            var countLarge = Math.floor(0.15 * searchResults.length),
                countWide = Math.floor(0.25 * searchResults.length),
                countMedium = Math.floor(0.35 * searchResults.length),
                group = {
                    /// <field type='Array' elementType='EventTileGroup' />
                    large: [],
                    /// <field type='Array' elementType='EventTileGroup' />
                    wide: [],
                    /// <field type='Array' elementType='EventTileGroup' />
                    medium: [],
                    /// <field type='Array' elementType='EventTileGroup' />
                    small: []
                };

            function lastGroupWithSpaceForTile(tile) {
                /// <param name='tile' type='EventTile' />
                if (group.wide.length && _.last(group.wide).availableQuadrants() >= tile.type.quadrants) {
                    return group.wide;
                }
                if (group.medium.length && _.last(group.medium).availableQuadrants() >= tile.type.quadrants) {
                    return group.medium;
                }
                if (group.small.length && _.last(group.small).availableQuadrants() >= tile.type.quadrants) {
                    return group.small;
                }
                return null;
            }

            for (var i = 0; i < countLarge; i++) {
                group.large.push(new EventTileGroup([
                    new EventTile(searchResults[i].id, searchResults[i].counter, tileType.large)
                ]));
            }
            var tile, groupWithSpaceAvailable, last;
            for (i = countLarge; i < countLarge + countWide; i++) {
                tile = new EventTile(searchResults[i].id, searchResults[i].counter, tileType.wide);
                groupWithSpaceAvailable = lastGroupWithSpaceForTile(tile);
                last = groupWithSpaceAvailable ? groupWithSpaceAvailable[groupWithSpaceAvailable.length - 1] : null;
                if (last && last.availableQuadrants() >= tile.type.quadrants) {
                    groupWithSpaceAvailable[groupWithSpaceAvailable.length - 1] = new EventTileGroup(_.union(last.counters, [tile]));
                }
                else {
                    group.wide.push(new EventTileGroup([tile]));
                }
            }
            for (i = countLarge + countWide; i < countLarge + countWide + countMedium; i++) {
                tile = new EventTile(searchResults[i].id, searchResults[i].counter, tileType.medium);
                groupWithSpaceAvailable = lastGroupWithSpaceForTile(tile);
                last = groupWithSpaceAvailable ? groupWithSpaceAvailable[groupWithSpaceAvailable.length - 1] : null;
                if (last && last.availableQuadrants() >= tile.type.quadrants) {
                    groupWithSpaceAvailable[groupWithSpaceAvailable.length - 1] = new EventTileGroup(_.union(last.counters, [tile]));
                }
                else {
                    group.medium.push(new EventTileGroup([tile]));
                }
            }
            for (i = countLarge + countWide + countMedium; i < searchResults.length; i++) {
                tile = new EventTile(searchResults[i].id, searchResults[i].counter, tileType.small);
                groupWithSpaceAvailable = lastGroupWithSpaceForTile(tile);
                last = groupWithSpaceAvailable ? groupWithSpaceAvailable[groupWithSpaceAvailable.length - 1] : null;
                if (last && last.availableQuadrants() >= tile.type.quadrants) {
                    groupWithSpaceAvailable[groupWithSpaceAvailable.length - 1] = new EventTileGroup(_.union(_.flatten(last.counters), [tile]));
                }
                else {
                    group.small.push(new EventTileGroup([tile]));
                }
            }

            return _.shuffle(_.union(group.large, group.wide, group.medium, group.small));
        }

        function generateTileGroups(searchResults) {
            /// <param name='searchResults' type='Array' elementType='ResultModel' />
            searchResults.sort(function (a, b) {
                return a.counter.endsOnAsUnix > b.counter.endsOnAsUnix ? 1 :
                    a.counter.endsOnAsUnix < b.counter.endsOnAsUnix ? -1 : 0;
            });
            if (searchResults.length <= 6) {
                return generateLargeTiles(searchResults);
            }
            return generateRandomTileGroups(searchResults);
        }

        search
            .all()
            .then(function (result, entries) {
                /// <param name='result' type='DataStore.OperationResult' />
                if (!result.isSuccess) {
                    notify.error('Cannot load events because ' + result.reason);
                    return;
                }
                events(generateTileGroups(entries));
            });

        this.events = events;
    }

    this.ko.applyBindings(new ViewModel(new UseCase(new this.ds.Store(this.app.config.connectionString.dbName, this.app.config.connectionString.httpDataStore))));

}).call(this, this.ko, this.H.Check, this.Counter.search, this._, this.notify);