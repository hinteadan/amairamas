(function (chk, noty, notyDefaults, undefined) {
    'use strict';

    notyDefaults.layout = 'topRight';
    notyDefaults.timeout = 5000;
    notyDefaults.animation.speed = 200;

    var noteType = {
        alert: 'alert',
        success: 'success',
        error: 'error',
        warning: 'warning',
        information: 'information',
        confirm: 'confirm'
    };

    function showUiMessage(message, type) {
        noty({ text: message.toString(), type: type || noteType.alert });
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

            showUiMessage(
                !chk.isEmpty(operation.reason) ? operation.reason : defaultMessageForOperation(operation),
                operation.isSuccess ? noteType.success : noteType.error);
        }

        function notifyMessage(message, type) {
            chk.notEmpty(message);
            showUiMessage(message, type);
        }

        this.operation = notifyOperation;
        this.message = notifyMessage;
        this.warning = function (message) {
            notifyMessage(message, noteType.warning);
        };
        this.type = noteType;
    }

    this.notify = new Notifier();

}).call(this, this.H.Check, this.noty, this.$.noty.defaults);