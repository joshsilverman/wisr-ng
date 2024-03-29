'use strict';

/**
 * @ngdoc directive
 * @name wisrNgApp.directive:wsrSmartWebBanner
 * @description
 * # wsrSmartWebBanner
 */
angular.module('wisrNgApp')
  .directive('wsrSmartWebBanner', function ($rootScope) {
    function load() {
      var iconURL;

      (function($){
      	$.fn.smartWebBanner = function(options){

      		// Find out about the device being used
      		var iPad = navigator.userAgent.match(/iPad/i) != null; // Check if using an iPad
      		var iPhone = navigator.userAgent.match(/iPhone/i) != null; // Check if using an iPhone
      		var Safari = (/Safari/i).test(navigator.appVersion) || (/AppleWebKit/i).test(navigator.appVersion); // Check if using Safari (making sure to exclude Chrome for iOS)
      		var standalone = navigator.standalone; // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)

      		// Find out about the website itself
      		var origHtmlMargin = parseFloat($('html').css('margin-top')); // Get the original margin-top of the HTML element so we can take that into account
      		var bannerHeight; // Make variable global (updated in createBanner)
      		var originalTitle = document.title; // Save the page's <title>
      		var originalURL = window.location.href; // Save the page's url

      		if(typeof options == 'string'){ // If they specified a command (like "show" or "hide")
      			bannerHeight = $('#smartWebBanner').height(); // Accomodate different sized banners
      			if(typeof opts == 'undefined')
      				var opts = $.fn.smartWebBanner.defaults;
      			switch(options){
      				case 'show':
      					if(!$('#smartWebBanner').hasClass('shown')){
      						showBanner();
      					}
      					return false;
      				case 'hide':
      					if($('#smartWebBanner').hasClass('shown')){
      						origHtmlMargin = origHtmlMargin-bannerHeight; // The "original" value actually includes the banner's added margin when this is called so we need to take it out
      						closeBanner();
      					}
      					return false;
      			}
      		}else{ // Check for options
      			var opts = $.extend({}, $.fn.smartWebBanner.defaults, options);
      		}

      		if(opts.autoApp && $('meta[name="apple-mobile-web-app-capable"]').length == 0) // Auto-add web app capable tag if it's missing
      			$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');

      		function createBanner(){
      			$('body').append('<div id="smartWebBanner"><a href="#" id="swb-close">×</a><a href="https://itunes.apple.com/us/app/wisr/id887180306?mt=8&uo=4" target="itunes_store" id="swb-icon"></a><div id="swb-info"><strong>'+opts.title+'</strong><span>'+opts.author+'</span></div><a href="https://itunes.apple.com/us/app/wisr/id887180306?mt=8&uo=4" target="itunes_store" id="swb-save">View</a></div><div id="swb-instructions">Tap <span class="icon"></span> and then <strong>Add to Home Screen.</strong><div class="arrow"></div></div>');
      			if(iPad)
      				$('#smartWebBanner,#swb-instructions').addClass('ipad');
      			if(!iPad && !iPhone)
      				$('#swb-instructions').html('<strong>It appears this isn\'t an iOS device.</strong> This is a preview of the iPhone popup design though.');
      			if(opts.showFree)
      				$('#smartWebBanner').addClass('free');
      			if(opts.theme.toLowerCase() == 'auto'){
      				$('#smartWebBanner,#swb-instructions').addClass('ios7');
      			}
      			if(opts.theme.toLowerCase() == 'ios 7')
      				$('#smartWebBanner,#swb-instructions').addClass('ios7');
      			if(opts.theme.toLowerCase() == 'ios 6')
      				$('#smartWebBanner,#swb-instructions').addClass('ios6');
      			if(opts.theme.toLowerCase() == 'dark')
      				$('#smartWebBanner,#swb-instructions').addClass('dark');
      			if(opts.useIcon){
      				if($('link[rel="apple-touch-icon-precomposed"]').length > 0){
      					iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href');
      				}else if($('link[rel="apple-touch-icon"]').length > 0){
      					iconURL = $('link[rel="apple-touch-icon"]').attr('href');
      					if(opts.iconGloss != false) // Don't auto-add gloss if they chose to not show it
      						$('#swb-icon').addClass('gloss');
      				}
      				if(opts.iconGloss == true) // Add gloss no matter what since they want to show it
      					$('#swb-icon').addClass('gloss');
      				if(opts.iconOverwrite != '')
      					iconURL = opts.iconOverwrite;
      				$('#swb-icon').css('background-image','url('+iconURL+')');
      			}
      			if(!opts.useIcon || !iconURL){
      				$('#smartWebBanner').addClass('no-icon');
      			}
      			bannerHeight = $('#smartWebBanner').height(); // Accomodate different sized banners
      		}
      		function showBanner(){
      			$('#smartWebBanner').stop().animate({
      				top:0
      			},opts.speedIn).addClass('shown');
      			$('html').animate({
      				marginTop:origHtmlMargin+bannerHeight
      			},opts.speedIn);
      			$('#swb-close').on('click',function(){
      				closeBanner();
      				return false;
      			});
      			$('#swb-save,#swb-icon').on('click',function(){
      				openAppStore();
      				return true;
      			});
      		}
      		function closeBanner(){
      			$('#smartWebBanner').stop().animate({
      				top:-(bannerHeight+(bannerHeight/3))
      			},opts.speedOut).removeClass('shown');
      			$('html').animate({
      				marginTop:origHtmlMargin
      			},opts.speedOut);
      			hideInstructions();
      			setCookie('swb-closed','true',opts.daysHidden);
      		}
      		function openAppStore(){
      			mixpanel.track("Open App Store");
      		}
      		function setCookie(name,value,exdays){
      			var exdate = new Date();
      			exdate.setDate(exdate.getDate()+exdays);
      			var value=escape(value)+((exdays==null)?'':'; expires='+exdate.toUTCString());
      			document.cookie=name+'='+value+'; path=/;';
      		}
      		function getCookie(name){
      			var i,x,y,ARRcookies = document.cookie.split(";");
      			for(i=0;i<ARRcookies.length;i++){
      				x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      				y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      				x = x.replace(/^\s+|\s+$/g,"");
      				if(x==name){
      					return unescape(y);
      				}
      			}
      		}

      		if(opts.debug || ((iPhone || iPad) && Safari && !standalone && typeof getCookie('swb-closed') == 'undefined' && typeof getCookie('swb-saved') == 'undefined')){ // Show if debug. Show if iPhone/iPad in Mobile Safari & don't have cookies already.
      			createBanner();
      			showBanner();
      		}

      	};

      	// override these globally if you like (they are all optional)
      	$.fn.smartWebBanner.defaults = {
      		title: 'Web App', // What the title of the "app" should be in the banner
      		titleSwap: true, // Whether or not to use the title specified here has the default label of the home screen icon (otherwise uses the page's <title> tag)
      		url: '', // URL to mask the page as before saving to home screen (allows for having it save the homepage of a site no matter what page the visitor is on)
      		author: 'Save to Home Screen', // What the author of the "app" should be in the banner
      		speedIn: 300, // Show animation speed of the banner
      		speedOut: 400, // Close animation speed of the banner
      		useIcon: true, // Whether or not it should show site's apple touch icon (located via <link> tag)
      		iconOverwrite: '', // Force the URL of the icon (even if found via <link> tag)
      		iconGloss: 'auto', // Whether or not to show the gloss over the icon (true/false/"auto" [auto doesn't show if precomposed <link> tag is used])
      		showFree: true, // Whether or not to show "Free" at bottom of info
      		daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
      		daysReminder: 90, // Duration to hide the banner after "Save" is clicked *separate from when the close button is clicked* (0 = always show banner)
      		popupDuration: 6000, // How long the instructions are shown before fading out (0 = show until manually closed)
      		popupSpeedIn: 200, // Show animation speed of the popup
      		popupSpeedOut: 900, // Close animation speed of the popup
      		theme: 'auto', // Change between "auto" (detect iOS version), "iOS 6", "iOS 7", and "dark" theme to fit your site design & visitors
      		autoApp: false, // Whether or not it should auto-add the mobile-web-app meta tag that makes it open as an app rather than in mobile safari
      		debug: false // Whether or not it should always be shown (even for non-iOS devices & if cookies have previously been set) *This is helpful for testing and/or previewing
      	};
      })(jQuery);
    }

    function link(scope, element, attrs) {
      if (!$().smartWebBanner) load();

      setTimeout(
        function() {
          if ($('body.phone-variant').length > 0) return;

          $().smartWebBanner({
            title: "Wisr", // What the title of the "app" should be in the banner | Default: "Web App"
            titleSwap: false, // Whether or not to use the title specified here has the default label of the home screen icon (otherwise uses the page's <title> tag) | Default: true
            url: 'https://itunes.apple.com/us/app/wisr/id887180306', // URL to mask the page as before saving to home screen (allows for having it save the homepage of a site no matter what page the visitor is on) | Default: ''
            author: "Wisr", // What the author of the "app" should be in the banner | Default: "Save to Home Screen"
            speedIn: 0, // Show animation speed of the banner | Default: 300
            speedOut: 0, // Close animation speed of the banner | Default: 400
            daysHidden: 1, // Duration to hide the banner after being closed (0 = always show banner) | Default: 15
            daysReminder: 1, // Duration to hide the banner after "Save" is clicked *separate from when the close button is clicked* (0 = always show banner) | Default: 90
            useIcon: true, // Whether or not it should show site's apple touch icon (located via <link> tag) | Default: true
            // debug: true,
            iconOverwrite: "http://a5.mzstatic.com/us/r30/Purple/v4/fe/aa/81/feaa81a9-0821-d244-c577-5e386819380c/mzl.jihrktfn.175x175-75.jpg"
        })}, 800
      );

    }

    return {
      link: link
    };
  });
