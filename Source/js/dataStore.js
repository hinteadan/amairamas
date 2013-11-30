(function ($, undefined) {
    'use strict';

    var chainOperation = {
            And: { id: 0, value: 'And' },
            Or: { id: 1, value: 'Or' }
        },
        operator = {
            Equal: { id: 0, value: 'Equals' }
        };

    function Entity(data, meta) {
        this.Id = null;
        this.Meta = meta || {};
        this.Data = data || null;
    }

    function OperationResult(isSuccess, reason, data) {
        this.isSuccess = isSuccess === true ? true : false;
        this.reason = reason || null;
        this.data = data;
    }

    function HttpDataStore(storeUrl) {

        storeUrl = storeUrl || 'http://localhost/HttpDataStore/';

        function doHttpRequest(url, type, data, onSuccess, onError) {
            $.ajax(url || storeUrl, {
                accepts: {
                    json: 'application/json'
                },
                contentType: 'application/json',
                processData: false,
                data: JSON.stringify(data),
                error: onError,
                success: onSuccess,
                type: type || 'GET'
            });
        }

        function doCallback(callback, argsArray) {
            if (typeof (callback) !== 'function') {
                return;
            }
            callback.apply(null, argsArray);
        }

        function loadEntity(id, callback) {
            doHttpRequest(storeUrl + id, 'GET', undefined,
                function (entityData, textStatus, jqXHR) {
                    var entity = new Entity(entityData.Data, entityData.Meta);
                    entity.Id = entityData.Id;
                    doCallback(callback, [new OperationResult(true, null, entity)]);
                },
                function (jqXHR, textStatus, errorThrown) {
                    doCallback(callback, [new OperationResult(false, errorThrown)]);
                });
        }

        function saveEntity(entity, callback) {
            /// <param name='entity' type='Entity' />
            doHttpRequest(storeUrl, 'PUT', entity,
                function (id, textStatus, jqXHR) {
                    entity.Id = id;
                    doCallback(callback, [new OperationResult(true, null, entity)]);
                },
                function (jqXHR, textStatus, errorThrown) {
                    doCallback(callback, [new OperationResult(false, errorThrown)]);
                });
        }

        function queryMetaData(chainWith, callback) {
            var chain = chainWith || chainOperation.And;
            doHttpRequest(storeUrl + 'meta?chainWith=' + chain.value, 'GET', undefined,
                function (queryResult, textStatus, jqXHR) {
                    doCallback(callback, [new OperationResult(true, null, queryResult)]);
                },
                function (jqXHR, textStatus, errorThrown) {
                    doCallback(callback, [new OperationResult(false, errorThrown)]);
                });
        }

        function deleteEntity(id, callback) {
            doHttpRequest(storeUrl + id, 'DELETE', undefined,
                function () {
                    doCallback(callback, [new OperationResult(true, null, undefined)]);
                },
                function (jqXHR, textStatus, errorThrown) {
                    doCallback(callback, [new OperationResult(false, errorThrown)]);
                });
        }

        this.Save = saveEntity;
        this.Load = loadEntity;
        this.QueryMeta = queryMetaData;
        this.Delete = deleteEntity;
    }

    this.DataStore = {
        Store: HttpDataStore,
        Entity: Entity,
        chainBy: chainOperation,
        is: operator,
        OperationResult: OperationResult
    };

}).call(this, this.jQuery);