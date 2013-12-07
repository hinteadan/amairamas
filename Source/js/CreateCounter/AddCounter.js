(function (ds, chk, model, undefined) {
    'use strict';

    function isFunction(f) {
        return typeof (f) === 'function';
    }

    function CreateCounter(store) {
        /// <param name='store' type='ds.Store' />
        chk.notEmpty(store, 'store');

        function createCounterEntity(endsOnDate, title, description) {
            var counter = new model.Counter(endsOnDate, title, description);
            return new ds.Entity(counter, counter.Meta());
        }

        function storeCounter(counterEntity) {
            var doThisOnCallback;

            function then(doThis) {
                if (!isFunction(doThis)) {
                    return;
                }
                doThisOnCallback = doThis;
            }
            store.Save(counterEntity, function (result) {
                ///<param name='result' type='ds.OperationResult' />
                if (doThisOnCallback) {
                    doThisOnCallback.call(result, result);
                }
            });
            return {
                then: then
            };
        }

        this.having = function (endsOnDate, title, description) {
            return {
                save: function (butFirstDoThis) {
                    var entity = createCounterEntity(endsOnDate, title, description);
                    if (isFunction(butFirstDoThis)) {
                        butFirstDoThis.call(undefined, entity);
                    }
                    return storeCounter(entity);
                }
            };
        };
    }

    this.Counter = this.Counter || {};
    this.Counter.addTo = function (store) {
        return new CreateCounter(store);
    };

}).call(this, this.DataStore, this.H.Check, this.model);