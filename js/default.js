'use strict';

let functions = require('./functions');

let pages = {
	kaart: require('./pages/kaart')
};
let app = {
	init: function () {

		pages.kaart.initSlider();

		if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
	    {
	      	$("body").addClass("ie");
	    }  

		if(('ontouchstart' in window || navigator.msMaxTouchPoints > 0) && window.matchMedia('screen and (max-width: 1024px)').matches) {
			$('html').addClass('touch');
		} else {
			$('html').addClass('no-touch');
		}
	},
	winLoad: function () {

	},
	winResize: function () {
		
	}
};

$(function() {
	app.init();
});

$(window).on('load', function() {
	app.winLoad();
});

$(window).on('resize', function() {
	app.winResize();
});