(function (eventId, chk, undefined) {
    'use strict';

    function ViewModel(id) {
        chk.notEmpty(id, 'id');
    }

    this.ko.applyBindings(new ViewModel(eventId));

}).call(this, this.$.query.GET().e, this.H.Check);