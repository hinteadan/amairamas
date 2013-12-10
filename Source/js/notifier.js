(function (chk, noty, notyDefaults, undefined) {
    'use strict';

    notyDefaults.layout = 'bottom';

    var noteType = {
        alert: 'alert',
        success: 'success',
        error: 'error',
        warning: 'warning',
        information: 'information',
        confirm: 'confirm'
    };

    function showUiMessage(message, type) {
        noty({ text: message, type: type || noteType.alert });
    }

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

            showUiMessage(!chk.isEmpty(operation.reason) ? operation.reason : defaultMessageForOperation(operation));
        }

        function notifyMessage(message) {
            chk.notEmpty(message);
            showUiMessage(message);
        }

        this.operation = notifyOperation;
        this.message = notifyMessage;
    }

    this.notify = new Notifier();

}).call(this, this.H.Check, this.noty, this.$.noty.defaults);