(function(){
	
	'use strict';

	/**
	 * Utility
	 * @namespace PANOLENS.Utils
	 * @memberOf PANOLENS
	 * @type {object}
	 */
	PANOLENS.Utils = {};

	PANOLENS.Utils.checkTouchSupported = function () {

		return window ? 'ontouchstart' in window || window.navigator.msMaxTouchPoints : false;

	};

	PANOLENS.Utils.isIOS = window ? /iPhone|iPad|iPod/i.test( window.navigator.userAgent ) : false;

	PANOLENS.Utils.isAndroid = window ? /Android/i.test( window.navigator.userAgent ) : false;

	PANOLENS.Utils.isMobile = window 
		? PANOLENS.Utils.isIOS || PANOLENS.Utils.isAndroid || /BlackBerry|Opera Mini|IEMobile/i.test( window.navigator.userAgent ) 
		: false;

})();