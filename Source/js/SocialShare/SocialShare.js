(function ($, undefined) {
    'use strict';

    var protocol = /^http:/.test(this.window.location.href) ? 'http' : 'https';

    function SocialShare() {

        var self = this;

        function loadTwitterWidgetApi() {
            if ($('#twitter-wjs').length) {
                return;
            }
            $('head')
                .append('<script id="twitter-wjs" src="' + protocol + '://platform.twitter.com/widgets.js"></script>');

            return self;
        }

        this.includeTwitter = loadTwitterWidgetApi;
    }

    new SocialShare()
        .includeTwitter();

}).call(this, this.$);