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

})();