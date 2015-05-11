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
                source: '=timeline',
                options: '='
            },
            link: function ($s, $e, $a) {
                /*jshint unused: false*/
                var id = 'timeline_' + new Date().getTime();
                $e.attr('id', id);

                //VMM.bindEvent($e, function () {
                //    console.log('UPDATE');
                //    console.log(arguments);
                //}, 'UPDATE');

                $s.$watch('source', function (timelineData) {
                    var opt = $s.options || {};

                    if (!timelineData || !timelineData.timeline) {
                        return;
                    }

                    createTimeline({
                        type: 'timeline',
                        font: 'default',
                        width: '100%',
                        height: '100%',
                        source: timelineData,
                        embed_id: id,// jshint ignore:line
                        start_at_end: ng.isDefined(opt.start_at_end) ? opt.start_at_end : false,// jshint ignore:line
                        start_at_slide: ng.isDefined(opt.start_at_slide) ? opt.start_at_slide : 0,// jshint ignore:line
                        start_zoom_adjust: ng.isDefined(opt.start_zoom_adjust) ? opt.start_zoom_adjust : 0,// jshint ignore:line
                        hash_bookmark: ng.isDefined(opt.hash_bookmark) ? opt.hash_bookmark : false// jshint ignore:line
                    });
                });
            }
        };

    }]);

})(this.angular, this.createStoryJS);