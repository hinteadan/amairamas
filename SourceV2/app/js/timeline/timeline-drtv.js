(function (ng, createTimeline) {
    'use strict';

    ng.module('timeline').directive('timeline', [function () {

        return {
            restrict: 'A',
            replace: false,
            transclude: false,
            scope: {
                config: '=',
                source: '=timeline'
            },
            link: function ($s, $e, $a) {
                /*jshint unused: false*/
                var id = 'timeline_' + new Date().getTime();
                $e.attr('id', id);

                createTimeline({
                    type: 'timeline',
                    width: '100%',
                    height: '100%',
                    source: $s.source,
                    embed_id: id // jshint ignore:line
                });
            }
        };

    }]);

})(this.angular, this.createStoryJS);