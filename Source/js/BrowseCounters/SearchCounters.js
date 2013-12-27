﻿(function (query, model, chk, undefined) {
    'use strict';

    function isFunction(f) {
        return typeof (f) === 'function';
    }

    function SearchCounters(store) {
        /// <param name='store' type='ds.Store' />
        chk.notEmpty(store, 'store');

        function fetchAllCounters() {

            var doThisOnCallback;

            function then(doThis) {
                if (!isFunction(doThis)) {
                    return;
                }
                doThisOnCallback = doThis;
            }

            function mapQueryResultsToCounters(queryResults) {
                chk.notEmpty(queryResults, 'queryResults');
                var counters = [];
                for (var i = 0; i < queryResults.length; i++) {
                    counters.push({
                        id: queryResults[i].Key,
                        counter: model.Counter.fromDtoMeta(queryResults[i].Value)
                    });
                }
                return counters;
            }

            query
                .findAllFrom(store)
                .then(function (result) {
                    /// <param name='result' type='DataStore.OperationResult' />
                    if (doThisOnCallback) {
                        doThisOnCallback.call(result, result, result.isSuccess ? mapQueryResultsToCounters(result.data) : undefined);
                    }
                });

            return {
                then: then
            };
        }

        this.all = fetchAllCounters;
    }

    this.Counter = this.Counter || {};
    this.Counter.search = SearchCounters;

}).call(this, this.Counter.Query, this.model, this.H.Check);