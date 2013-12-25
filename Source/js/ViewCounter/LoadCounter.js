(function (chk, ds, model, undefined) {
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

            function createCounterFromEntity(entity){
                ///<param name='entity' type='ds.Entity' />
                chk.notEmpty(entity, 'entity');
                return new model.Counter.fromDto(entity.Data);
            }

            store.Load(id, function (result) {
                ///<param name='result' type='ds.OperationResult' />
                if (doThisOnCallback) {
                    doThisOnCallback.call(result, result, result.isSuccess ? createCounterFromEntity(result.data) : undefined);
                }
            });

            return {
                then: then
            };
        }

        this.byId = loadById;
    }

    this.Counter = this.Counter || {};
    this.Counter.load = LoadCounter;

}).call(this, this.H.Check, this.DataStore, this.model);