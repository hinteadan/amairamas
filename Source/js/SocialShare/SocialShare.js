﻿(function ($, undefined) {
    'use strict';

    var protocol = /^http:/.test(this.window.location.href) ? 'http' : 'https';

    function SocialShare() {

        var self = this;

        function loadTwitterWidgetApi() {
            ///<return type='SocialShare' />
            if ($('#twitter-wjs').length) {
                return;
            }
            $('head')
                .append('<script id="twitter-wjs" src="' + protocol + '://platform.twitter.com/widgets.js"></script>');

            return self;
        }

        function loadFacebookShareButtonApi() {
            ///<return type='SocialShare' />
            if ($('#facebook-jssdk').length) {
                return;
            }
            $('head')
                .append('<div id="fb-root"></div>')
                .append('<script id="facebook-jssdk" src="' + protocol + '://connect.facebook.net/en_US/all.js#xfbml=1"></script>');

            return self;
        }

        this.includeTwitter = loadTwitterWidgetApi;
        this.includeFacebookShare = loadFacebookShareButtonApi;
    }

    new SocialShare()
        .includeTwitter()
        .includeFacebookShare();

}).call(this, this.$);