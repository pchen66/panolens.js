(function(){

	'use strict';
	
	/**
	 * Control Index Enum
	 * @memberOf PANOLENS
	 * @enum {number}
	 */
	
	PANOLENS.Controls = {

		ORBIT: 0,

		DEVICEORIENTATION: 1

	};

	/**
	 * Effect Mode Enum
	 * @memberOf PANOLENS
	 * @enum {number}
	 */
	PANOLENS.Modes = {

		/** Unknown */
		UNKNOWN: 0,

		/** Normal */
		NORMAL: 1,

		/** Google Cardboard*/
		CARDBOARD: 2,

		/** Stereoscopic **/
		STEREO: 3

	};

})();