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
            $('body')
                .append('<script id="twitter-wjs" src="' + protocol + '://platform.twitter.com/widgets.js"></script>');

            return self;
        }

        function loadFacebookShareButtonApi() {
            ///<return type='SocialShare' />
            if ($('#facebook-jssdk').length) {
                return;
            }

            $('body')
                .append('<div id="fb-root"></div>')
                .append('<script id="facebook-jssdk" src="' + protocol + '://connect.facebook.net/en_US/all.js#xfbml=1"></script>');

            return self;
        }

        function loadGooglePlusShareButtonApi() {
            ///<return type='SocialShare' />
            if ($('#googleplus-jssdk').length) {
                return;
            }

            $('<script id="googleplus-jssdk" type="text/javascript" src="https://apis.google.com/js/platform.js"></script>')
                .attr('async', true)
                .appendTo('body');

            return self;
        }

        this.includeTwitter = loadTwitterWidgetApi;
        this.includeFacebookShare = loadFacebookShareButtonApi;
        this.includeGooglePlusShare = loadGooglePlusShareButtonApi;
    }

    this.Sharing = this.Sharing || {};
    this.Sharing.SocialShare = SocialShare;

}).call(this, this.$);

/*
<!-- Place this tag where you want the share button to render. -->
<div class="g-plus" data-action="share" data-annotation="bubble"></div>

<!-- Place this tag after the last share tag. -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
*/