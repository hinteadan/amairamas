﻿(function (ds, chk, undefined) {
    'use strict';

    function LoadCounter(store) {
        /// <param name='store' type='ds.Store' />
        chk.notEmpty(store, 'store');

        function loadCounterById(id) {
            chk.notEmpty(id, 'id');
            var doThisOnCallback;
            function then(doThis) {
                if (typeof (doThis) !== 'function') {
                    return;
                }
                doThisOnCallback = doThis;
            }
            store.Load(id, function (result) {
                ///<param name='result' type='ds.OperationResult' />
                if (doThisOnCallback) {
                    doThisOnCallback.call(result, result);
                }
            });
            return {
                then: then
            };
        }

        this.byId = loadCounterById;
    }

    function QueryCounters(chainBy, store) {
        /// <param name='store' type='ds.Store' />
        chk.notEmpty(store, 'store');

        var dataStoreQuery = new ds.Query(chainBy),
            self = this;

        function whereWrapper(name) {
            return function (operator) {
                return function (value) {
                    dataStoreQuery.where(name)(operator)(value);
                    return self;
                };
            };
        }

        function doQuery() {
            var doThisOnCallback;
            function then(doThis) {
                if (typeof (doThis) !== 'function') {
                    return;
                }
                doThisOnCallback = doThis;
            }
            store.Query(dataStoreQuery, function (result) {
                ///<param name='result' type='ds.OperationResult' />
                if (doThisOnCallback) {
                    doThisOnCallback.call(result, result);
                }
            });
            return {
                then: then
            };
        }

        this.where = whereWrapper;
        this.then = function (callback) {
            return doQuery().then(callback);
        };
    }

    this.Counter = this.Counter || {};
    this.Counter.findFrom = function (store) {
        return new LoadCounter(store);
    };
    this.Counter.findAllFrom = function (store) {
        return new QueryCounters(ds.chainBy.And, store);
    };
    this.Counter.findAnyFrom = function (store) {
        return new QueryCounters(ds.chainBy.Or, store);
    };

    /*
    Counter.findFrom(store).byId(id).then(f(){});
    Counter.findAllFrom(store)
        .where('name')(ds.is.EqualTo)('danish')
        .where('name')(ds.is.EqualTo)('danish')
        .then(function(result){
        });
    */

}).call(this, this.DataStore, this.H.Check);