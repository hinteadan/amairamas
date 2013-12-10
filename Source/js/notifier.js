(function (chk, undefined) {
    'use strict';

    function Notifier() {

        var defaultMessageFor = {
            success: 'Operation completed successfully',
            failure: 'Cannot complete the operation, please try again or contact us'
        };

        function defaultMessageForOperation(operation) {
            /// <param name='operation' type='DataStore.OperationResult' />
            return operation.isSuccess ? defaultMessageFor.success : defaultMessageFor.failure;
        }

        function notifyOperation(operation) {
            /// <param name='operation' type='DataStore.OperationResult' />
            chk.notEmpty(operation);

            alert(!chk.isEmpty(operation.reason) ? operation.reason : defaultMessageForOperation(operation));
        }

        function notifyMessage(message) {
            chk.notEmpty(message);
            alert(message);
        }

        this.operation = notifyOperation;
        this.message = notifyMessage;
    }

    this.notify = new Notifier();

}).call(this, this.H.Check);