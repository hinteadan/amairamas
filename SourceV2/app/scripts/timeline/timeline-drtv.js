(function (ng, createTimeline) {
    'use strict';

    ng.module('timeline').directive('timeline', [function () {

        /*jshint unused: false*/
        var timelineEvents = {
            loaded: 'LOADED',
            update: 'UPDATE',
            message: 'MESSAGE',
            messege: 'MESSEGE',
            dataReady: 'DATAREADY',
            headline: 'HEADLINE',
            slideChange: 'SLIDE_CHANGE',
            dragUpdate: 'DRAGUPDATE'
        };

        return {
            restrict: 'A',
            replace: false,
            transclude: false,
            scope: {
                source: '=timeline'
            },
            link: function ($s, $e, $a) {
                /*jshint unused: false*/
                var id = 'timeline_' + new Date().getTime();
                $e.attr('id', id);

                //VMM.bindEvent($e, function () {
                //    console.log('UPDATE');
                //    console.log(arguments);
                //}, 'UPDATE');

                createTimeline({
                    type: 'timeline',
                    font: 'default',
                    width: '100%',
                    height: '100%',
                    source: $s.source,
                    embed_id: id // jshint ignore:line
                });
            }
        };

    }]);

})(this.angular, this.createStoryJS);