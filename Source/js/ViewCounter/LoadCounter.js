(function (chk, ds, undefined) {
    'use strict';

    function isFunction(f) {
        return typeof (f) === 'function';
    }

    function LoadCounter(store) {
        /// <param name='store' type='ds.Store' />
        chk.notEmpty(store, 'store');

        function loadById(id){
            chk.notEmpty(id, 'id');

            var doThisOnCallback;

            function then(doThis) {
                if (!isFunction(doThis)) {
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

        this.byId = loadById;
    }

    this.Counter = this.Counter || {};
    this.Counter.load = function (store) {
        return new LoadCounter(store);
    };

}).call(this, this.H.Check, this.DataStore);