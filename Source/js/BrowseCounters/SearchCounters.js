(function (_, query, model, chk, undefined) {
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

            function createCounterFromEntityMeta(metaEntry) {
                chk.notEmpty(metaEntry, 'metaEntry');
                var entry = {};
                entry[metaEntry.Key] = model.Counter.fromDtoMeta(metaEntry.Value)
                return entry;
            }

            query
                .findAllFrom(store)
                .then(function (result) {
                    /// <param name='result' type='DataStore.OperationResult' />
                    if (doThisOnCallback) {
                        doThisOnCallback.call(result, result, result.isSuccess ? _.map(result.data, createCounterFromEntityMeta) : undefined);
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

}).call(this, this._, this.Counter.Query, this.model, this.H.Check);