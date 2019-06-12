import browserEnv from 'browser-env';
import { XMLHttpRequest } from 'xmlhttprequest';

global.desktopUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36';
global.mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1';
global.userAgent = global.desktopUserAgent;

browserEnv(['window', 'HTMLElement', 'HTMLImageElement', 'HTMLScriptElement', 'performance', 'DOMParser']);
window.requestAnimationFrame = func => { return setTimeout( func, 16.67 ) };
window.cancelAnimationFrame = id => { clearTimeout( id ) };
window.Blob = function(){};
window.URL.createObjectURL = () => {};
window.URL.revokeObjectURL = () => {};
window.innerWidth = 1920;
window.innerHeight = 1080;
window.DeviceOrientationEvent = function(){
	const event = new window.Event( 'deviceorientation' );
	let gamma = 0, alpha = 0, beta = 0;
	Object.defineProperties( event, {
		'gamma': { get: () => gamma, set: g => gamma = g },
		'beta':  { get: () => beta, set: b => beta = b },
		'alpha':  { get: () => alpha, set: a => alpha = a }
	});
	return event;
};
window.MouseWheelEvent = function ( delta = 1 ){
	window.Event.prototype.preventDefault = () => {};
	window.Event.prototype.stopPropagation = () => {};
	const event = new window.CustomEvent( 'mousewheel' );
	event.preventDefault = () => {};
	event.stopPropagation = () => {};
	event.wheelDelta = delta;
	return event;
};
window.navigator.__defineGetter__('userAgent', function () {
	return global.userAgent;
});
window.navigator.__defineGetter__('mediaDevices', function () {
	const mockDeviceList = [{"deviceId":"default","kind":"audioinput","label":"","groupId":"efbcec8b3001c22e09cdc62068aae0bf0fab7b0cd65416416685b03ed1455726"},{"deviceId":"775a6902891d3af31df97bda1f2e928f4c468311b553e9e13f3dbe0d42bffad1","kind":"audioinput","label":"","groupId":"efbcec8b3001c22e09cdc62068aae0bf0fab7b0cd65416416685b03ed1455726"},{"deviceId":"c71a9bc3a3d4853fdedf6362b8097974222e20bc284793024b8d6abc0703c373","kind":"videoinput","label":"","groupId":"18cd3111c2acb54b85e10a79d9dfa1b7feb90d553c9fc0aafec86427e5f6e3a5"},{"deviceId":"default","kind":"audiooutput","label":"","groupId":"efbcec8b3001c22e09cdc62068aae0bf0fab7b0cd65416416685b03ed1455726"},{"deviceId":"1766c4f812e0b83aca0ae86e1584f78329f5ed8d5919217a6fb5890965134d08","kind":"audiooutput","label":"","groupId":"efbcec8b3001c22e09cdc62068aae0bf0fab7b0cd65416416685b03ed1455726"}];
	const enumerateDevices = () => {
		return new Promise( (resolve, reject ) => {
			resolve(mockDeviceList);
		});
	};
	const getUserMedia = () => {
		return new Promise((resolve, reject) => {
			const tracks = [{stop: () => { stream.active = false; }}];
			const stream = { active: true, getTracks: () => tracks };
			resolve( stream );
		});
	};
	return { enumerateDevices, getUserMedia };
});
window.XMLHttpRequest = (function () {

    const request = new XMLHttpRequest();
    const listeners = {};
    const oldAdd = request.addEventListener;
    const oldDispatch = request.dispatchEvent;

    request.addEventListener = ( type, listener ) => {

        if ( !listeners[ type ] ) listeners[ type ] = [];
        listeners[ type ].push( listener );

        oldAdd( type, listener );

    };

    request.dispatchEvent = ( type, event ) => {

        if ( listeners[ type ] ) {

			listeners[ type ].forEach( listener => { listener( event ); } );

		}

        oldDispatch( type );

    };

    request.onreadystatechange = function() {

        if ( this.readyState === 1  ) {
            
            request.dispatchEvent( 'progress', { loaded: 1, total: 1, lengthComputable: true } );
        }

        if ( this.readyState === 4  ) {

			const mockEvent = { loaded: 1, target: { responseXML: {documentElement: {}}}, currentTarget: { response: '' } };

			if ( request.onloadend ) {

				request.onloadend( mockEvent );

			} else {

				request.dispatchEvent( 'loadend', mockEvent );

			}
			
        }
    };
    
    return function XMLHttpRequest () {

        return request;

    };

})();

const customDocument = function () {

	const listeners = {};

	this.fullscreenEnabled = false;
	this.exitFullscreen = () => {};

	this.dispatchEvent = function( event ){
		const self = this;
		const { type, ...rest } = event;
		if (listeners[ type ]){
			for(let i = 0; i < listeners[ type ].length; i++){
				listeners[ type ][ i ].call( self, rest);
			}
		}
	};

	this.addEventListener = function( type, listener ) {
		
		if (!listeners[ type ]) { listeners[ type ] = []; }
		listeners[ type ].push( listener );
		
	};

	this.removeEventListener = function ( type, listener ) {

		if (!listeners[ type ]) { return; }

		const index = listeners[ type ].indexOf( listener );
		if (index >= 0) {
			listeners[ type ].splice( index, 1 );
		}

	};

	this.body = {
		appendChild: () => {}
	};

	this.querySelector = function ( selector ) {

		if ( selector === 'panolens-style-addon' ) { return null; }

		return new customElement();

	};

	this.documentElement = function () {

		return new customElement();

	};

    this.createElement = function ( elementName ) {

        if ( elementName === 'canvas' ) {

            return new customCanvas();

        } else if ( elementName === 'video'  ) {

			return new customVideo();

		} else if ( elementName === 'script'  ) {

			return new customScript();

		} else {

			return new customElement();

		}

    };

	this.createElementNS = function ( namespace, elementName ) {

		if ( namespace === "http://www.w3.org/1999/xhtml" && elementName === "canvas" ) {

			return new customCanvas();

		} else if ( namespace === "http://www.w3.org/1999/xhtml" && elementName === "img" ) {

            return new customImage();

        } else {

			throw new Error( "customDocument.CreateElementNS has not implemented following element " + elementName + " from namespace " + namespace + "." );

		}

	};

};

function customElement () {

	const children = [];
	const listeners = {};
	let textContent = null;
	let clientWidth = 1920;
	let clientHeight = 1080;
	let offsetLeft = 0;
	let offsetTop = 0;
	let id = '';
	let innerHTML = '';
	let parentElement = null;
	const style = {};
	const boundingClientRect = { left: 0, top: 0 };

	this.appendChild = element => { 

		children.push( element ); 
		parentElement = this;
	
	};

	this.removeChild = element => { 
		const index = children.indexOf( element );
		children.splice( index, 1 );
	};

	this.dispatchEvent = function( event ){
		const self = this;
		const { type, ...rest } = event;
		if (listeners[ type ]){
			for(let i = 0; i < listeners[ type ].length; i++){
				listeners[ type ][ i ].call( self, rest);
			}
		}
	};

	this.addEventListener = function( type, listener ) {
		
		if (!listeners[ type ]) { listeners[ type ] = []; }
		listeners[ type ].push( listener );
		
	};

	this.removeEventListener = function ( type, listener ) {

		if (!listeners[ type ]) { return; }

		const index = listeners[ type ].indexOf( listener );
		if (index >= 0) {
			listeners[ type ].splice( index, 1 );
		}

	};

	this.querySelector = () => new customElement();

	this.querySelectorAll = function ( name ) {
		return [];
	};

	this.cloneNode = function (){
		return new customElement();
	};
	
	this.contains = function ( node ) {
		let found = false;
		children.forEach( function( child ){
			if ( child === node ) {
				found = true;
			} else {
				child.contains( node );
			}
		} );
		return found;
	};

	this.setAttribute = () => {};

	this.getBoundingClientRect = () => boundingClientRect;

	this.requestFullscreen = () => {};

	function  myclassList (){
		const classes = [];
		this.add = item => classes.push( item );
		this.contains = item => classes.includes( item );
	};

	const classList = new myclassList();

	Object.defineProperties( this, {
		'classList': {
			get: () => classList
		},
		'clientWidth': {
			get: function(){ return clientWidth; },
			set: width => clientWidth = width
		},
		'clientHeight': {
			get: function(){ return clientHeight; },
			set: height => clientHeight = height
		},
		'style': {
			get: function(){ return style; }
		},
		children: {
			get: function(){ return children; }
		},
		textContent: {
			get: () => { return textContent; },
			set: ( content ) => { textContent = content; }
		},
		'id': {
			get: () => id,
			set: _id => id = _id
		},
		'offsetLeft': {
			get: () => offsetLeft
		},
		'offsetTop': {
			get: () => offsetTop
		},
		'innerHTML': {
			get: () => innerHTML,
			set: html => innerHTML = html
		},
		'parentElement': {
			get: () => parentElement,
			set: el => parentElement = el
		}
	} );

};

customElement.prototype = Object.assign( Object.create( window.HTMLElement.prototype ), {

	constructor: customElement

} );

function customImage () {

	customElement.call( this );
	
	setTimeout( function () {

		this.dispatchEvent( { type: 'progress', progress: { loaded: 0.5, total: 1 } } );

	}.bind( this ), 1000 );

	setTimeout( function () {

		this.dispatchEvent( { type: 'load' } );

	}.bind( this ), 2000 );
	
}

customImage.prototype = Object.assign( Object.create( customElement.prototype ), {

	constructor: customImage,

	src: {
		get: function(){ return this.src; },
		set: function( url ){ this.src = url; }
	},

	crossOrigin: '*'

} );

function customVideo () {

	let loop = false, 
		autoplay = false, 
		playsinline = false, 
		crossOrigin = '*', 
		muted = false, 
		paused = true, 
		currentTime = 0,
		duration = 10,
		readyState = 0,
		playIntervalId = null;

	customElement.call( this );

	const dispatchEvent = this.dispatchEvent.bind( this );

	const onLoadedData = () => {  readyState = 4; dispatchEvent( { type: 'loadeddata' } ); };
	const onEnded = () => {  dispatchEvent( { type: 'ended' } ); };
	const onTimeUpdate = () => {  

		currentTime += 0.02;
		if ( currentTime >= duration ) {
			currentTime = duration;
			clearInterval( playIntervalId );
			onEnded();
		}
		dispatchEvent( { type: 'timeupdate' } ); 
	
	};

	this.setAttribute = function ( name, value ) {
		this[ name ] = value;
	};

	this.play = function () {
		this.paused = false;
		playIntervalId = setInterval( onTimeUpdate, 10 );
		return Promise.resolve();
	};
	this.pause = function () {
		this.paused = true;
	};

	this.load = function () {
		
		setTimeout( onLoadedData, 500);
		setTimeout( onEnded, 500 + duration);
	}

	Object.defineProperties( this, {
		loop: {
			get: () => loop,
			set: ( enabled ) => { loop = enabled; }
		},
		autoplay: {
			get: () => autoplay,
			set: ( enabled ) => { autoplay = enabled; }
		},
		playsinline: {
			get: () => playsinline,
			set: ( enabled ) => { playsinline = enabled; }
		},
		crossOrigin: {
			get: () => crossOrigin,
			set: ( origin ) => { crossOrigin = origin; }
		},
		muted: {
			get: () => muted,
			set: ( enabled ) => { muted = enabled; }
		},
		paused: {
			get: () => paused,
			set: ( enabled ) => { paused = enabled; }
		},
		currentTime: {
			get: () => currentTime,
			set: ( value ) => { currentTime = value; }
		},
		duration: {
			get: () => duration
		},
		readyState: {
			get: () => readyState,
			set: state => readyState = state
		},
		videoWidth: {
			get: () => 640
		},
		videoHeight: {
			get: () => 480
		}
	} );
	
}

customVideo.prototype = Object.assign( Object.create( customElement.prototype ), {

	constructor: customVideo,

	src: {
		get: function(){ return this.src; },
		set: function( url ){ this.src = url; }
	},

	crossOrigin: '*'

} );

const customScript = function () {

	let src = null;
	let onload = () => {};

	Object.defineProperties( this, {
		'src': {
			get: function(){ return src; },
			set: function( url ){ src = url; }
		},
		'onload': {
			get: function(){ return onload; },
			set: function( func ){ onload = func; }
		}
	} );

	setTimeout( () => {
		global.google = {
			maps: {
				StreetViewStatus: {
					OK: 1
				},
				StreetViewService: function(){
					this.getPanoramaById = (id, callback) => {
						//emulate google street view service
						setTimeout( () => {
							const result = { copyright: 'MIT', location: { pano: 'panoId' } };
							const status = 1;
							callback(result, status);
						}, 1000);
					};
				}
			}
		};
		onload();
	}, 1000 );

};

customScript.prototype = Object.create( HTMLScriptElement.prototype );
customScript.prototype.constructor = customScript;

const custom2dContext = function () {
    this.scale = function () {};
    this.clearRect = function(){};
    this.beginPath = function(){};
    this.arc = function(){};
    this.fill = function(){};
    this.stroke = function(){};
    this.closePath = function(){};
    this.strokeStyle = null;
    this.fillStyle = null;
    this.lineWidth = 1;
    this.shadowBlur = 5;
	this.shadowColor = 'rgba(200,200,200,0.9)';
	this.drawImage = () => {};
};

const customCanvas = function () {

	this.width = 200;
    this.height = 200;
    this.style = {};
    this.classList = {
        add: () => {}
    };
	this.addEventListener = function () {};
	this.getContext = function ( contextName ) {

		if ( contextName === "webgl" ) {

			return new customWebGLContext();

		} else if ( contextName === '2d' ) {

            return new custom2dContext();

        } else {

			return null;

		}

	};

};

const customWebGLContext = function () {

	this.DEPTH_BUFFER_BIT = 256;
	this.STENCIL_BUFFER_BIT = 1024;
	this.COLOR_BUFFER_BIT = 16384;
	this.POINTS = 0;
	this.LINES = 1;
	this.LINE_LOOP = 2;
	this.LINE_STRIP = 3;
	this.TRIANGLES = 4;
	this.TRIANGLE_STRIP = 5;
	this.TRIANGLE_FAN = 6;
	this.ZERO = 0;
	this.ONE = 1;
	this.SRC_COLOR = 768;
	this.ONE_MINUS_SRC_COLOR = 769;
	this.SRC_ALPHA = 770;
	this.ONE_MINUS_SRC_ALPHA = 771;
	this.DST_ALPHA = 772;
	this.ONE_MINUS_DST_ALPHA = 773;
	this.DST_COLOR = 774;
	this.ONE_MINUS_DST_COLOR = 775;
	this.SRC_ALPHA_SATURATE = 776;
	this.FUNC_ADD = 32774;
	this.BLEND_EQUATION = 32777;
	this.BLEND_EQUATION_RGB = 32777;
	this.BLEND_EQUATION_ALPHA = 34877;
	this.FUNC_SUBTRACT = 32778;
	this.FUNC_REVERSE_SUBTRACT = 32779;
	this.BLEND_DST_RGB = 32968;
	this.BLEND_SRC_RGB = 32969;
	this.BLEND_DST_ALPHA = 32970;
	this.BLEND_SRC_ALPHA = 32971;
	this.CONSTANT_COLOR = 32769;
	this.ONE_MINUS_CONSTANT_COLOR = 32770;
	this.CONSTANT_ALPHA = 32771;
	this.ONE_MINUS_CONSTANT_ALPHA = 32772;
	this.BLEND_COLOR = 32773;
	this.ARRAY_BUFFER = 34962;
	this.ELEMENT_ARRAY_BUFFER = 34963;
	this.ARRAY_BUFFER_BINDING = 34964;
	this.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
	this.STREAM_DRAW = 35040;
	this.STATIC_DRAW = 35044;
	this.DYNAMIC_DRAW = 35048;
	this.BUFFER_SIZE = 34660;
	this.BUFFER_USAGE = 34661;
	this.CURRENT_VERTEX_ATTRIB = 34342;
	this.FRONT = 1028;
	this.BACK = 1029;
	this.FRONT_AND_BACK = 1032;
	this.TEXTURE_2D = 3553;
	this.CULL_FACE = 2884;
	this.BLEND = 3042;
	this.DITHER = 3024;
	this.STENCIL_TEST = 2960;
	this.DEPTH_TEST = 2929;
	this.SCISSOR_TEST = 3089;
	this.POLYGON_OFFSET_FILL = 32823;
	this.SAMPLE_ALPHA_TO_COVERAGE = 32926;
	this.SAMPLE_COVERAGE = 32928;
	this.NO_ERROR = 0;
	this.INVALID_ENUM = 1280;
	this.INVALID_VALUE = 1281;
	this.INVALID_OPERATION = 1282;
	this.OUT_OF_MEMORY = 1285;
	this.CW = 2304;
	this.CCW = 2305;
	this.LINE_WIDTH = 2849;
	this.ALIASED_POINT_SIZE_RANGE = 33901;
	this.ALIASED_LINE_WIDTH_RANGE = 33902;
	this.CULL_FACE_MODE = 2885;
	this.FRONT_FACE = 2886;
	this.DEPTH_RANGE = 2928;
	this.DEPTH_WRITEMASK = 2930;
	this.DEPTH_CLEAR_VALUE = 2931;
	this.DEPTH_FUNC = 2932;
	this.STENCIL_CLEAR_VALUE = 2961;
	this.STENCIL_FUNC = 2962;
	this.STENCIL_FAIL = 2964;
	this.STENCIL_PASS_DEPTH_FAIL = 2965;
	this.STENCIL_PASS_DEPTH_PASS = 2966;
	this.STENCIL_REF = 2967;
	this.STENCIL_VALUE_MASK = 2963;
	this.STENCIL_WRITEMASK = 2968;
	this.STENCIL_BACK_FUNC = 34816;
	this.STENCIL_BACK_FAIL = 34817;
	this.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
	this.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
	this.STENCIL_BACK_REF = 36003;
	this.STENCIL_BACK_VALUE_MASK = 36004;
	this.STENCIL_BACK_WRITEMASK = 36005;
	this.VIEWPORT = 2978;
	this.SCISSOR_BOX = 3088;
	this.COLOR_CLEAR_VALUE = 3106;
	this.COLOR_WRITEMASK = 3107;
	this.UNPACK_ALIGNMENT = 3317;
	this.PACK_ALIGNMENT = 3333;
	this.MAX_TEXTURE_SIZE = 3379;
	this.MAX_VIEWPORT_DIMS = 3386;
	this.SUBPIXEL_BITS = 3408;
	this.RED_BITS = 3410;
	this.GREEN_BITS = 3411;
	this.BLUE_BITS = 3412;
	this.ALPHA_BITS = 3413;
	this.DEPTH_BITS = 3414;
	this.STENCIL_BITS = 3415;
	this.POLYGON_OFFSET_UNITS = 10752;
	this.POLYGON_OFFSET_FACTOR = 32824;
	this.TEXTURE_BINDING_2D = 32873;
	this.SAMPLE_BUFFERS = 32936;
	this.SAMPLES = 32937;
	this.SAMPLE_COVERAGE_VALUE = 32938;
	this.SAMPLE_COVERAGE_INVERT = 32939;
	this.COMPRESSED_TEXTURE_FORMATS = 34467;
	this.DONT_CARE = 4352;
	this.FASTEST = 4353;
	this.NICEST = 4354;
	this.GENERATE_MIPMAP_HINT = 33170;
	this.BYTE = 5120;
	this.UNSIGNED_BYTE = 5121;
	this.SHORT = 5122;
	this.UNSIGNED_SHORT = 5123;
	this.INT = 5124;
	this.UNSIGNED_INT = 5125;
	this.FLOAT = 5126;
	this.DEPTH_COMPONENT = 6402;
	this.ALPHA = 6406;
	this.RGB = 6407;
	this.RGBA = 6408;
	this.LUMINANCE = 6409;
	this.LUMINANCE_ALPHA = 6410;
	this.UNSIGNED_SHORT_4_4_4_4 = 32819;
	this.UNSIGNED_SHORT_5_5_5_1 = 32820;
	this.UNSIGNED_SHORT_5_6_5 = 33635;
	this.FRAGMENT_SHADER = 35632;
	this.VERTEX_SHADER = 35633;
	this.MAX_VERTEX_ATTRIBS = 34921;
	this.MAX_VERTEX_UNIFORM_VECTORS = 36347;
	this.MAX_VARYING_VECTORS = 36348;
	this.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
	this.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
	this.MAX_TEXTURE_IMAGE_UNITS = 34930;
	this.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
	this.SHADER_TYPE = 35663;
	this.DELETE_STATUS = 35712;
	this.LINK_STATUS = 35714;
	this.VALIDATE_STATUS = 35715;
	this.ATTACHED_SHADERS = 35717;
	this.ACTIVE_UNIFORMS = 35718;
	this.ACTIVE_ATTRIBUTES = 35721;
	this.SHADING_LANGUAGE_VERSION = 35724;
	this.CURRENT_PROGRAM = 35725;
	this.NEVER = 512;
	this.LESS = 513;
	this.EQUAL = 514;
	this.LEQUAL = 515;
	this.GREATER = 516;
	this.NOTEQUAL = 517;
	this.GEQUAL = 518;
	this.ALWAYS = 519;
	this.KEEP = 7680;
	this.REPLACE = 7681;
	this.INCR = 7682;
	this.DECR = 7683;
	this.INVERT = 5386;
	this.INCR_WRAP = 34055;
	this.DECR_WRAP = 34056;
	this.VENDOR = 7936;
	this.RENDERER = 7937;
	this.VERSION = 7938;
	this.NEAREST = 9728;
	this.LINEAR = 9729;
	this.NEAREST_MIPMAP_NEAREST = 9984;
	this.LINEAR_MIPMAP_NEAREST = 9985;
	this.NEAREST_MIPMAP_LINEAR = 9986;
	this.LINEAR_MIPMAP_LINEAR = 9987;
	this.TEXTURE_MAG_FILTER = 10240;
	this.TEXTURE_MIN_FILTER = 10241;
	this.TEXTURE_WRAP_S = 10242;
	this.TEXTURE_WRAP_T = 10243;
	this.TEXTURE = 5890;
	this.TEXTURE_CUBE_MAP = 34067;
	this.TEXTURE_BINDING_CUBE_MAP = 34068;
	this.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
	this.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
	this.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
	this.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
	this.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
	this.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
	this.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
	this.TEXTURE0 = 33984;
	this.TEXTURE1 = 33985;
	this.TEXTURE2 = 33986;
	this.TEXTURE3 = 33987;
	this.TEXTURE4 = 33988;
	this.TEXTURE5 = 33989;
	this.TEXTURE6 = 33990;
	this.TEXTURE7 = 33991;
	this.TEXTURE8 = 33992;
	this.TEXTURE9 = 33993;
	this.TEXTURE10 = 33994;
	this.TEXTURE11 = 33995;
	this.TEXTURE12 = 33996;
	this.TEXTURE13 = 33997;
	this.TEXTURE14 = 33998;
	this.TEXTURE15 = 33999;
	this.TEXTURE16 = 34000;
	this.TEXTURE17 = 34001;
	this.TEXTURE18 = 34002;
	this.TEXTURE19 = 34003;
	this.TEXTURE20 = 34004;
	this.TEXTURE21 = 34005;
	this.TEXTURE22 = 34006;
	this.TEXTURE23 = 34007;
	this.TEXTURE24 = 34008;
	this.TEXTURE25 = 34009;
	this.TEXTURE26 = 34010;
	this.TEXTURE27 = 34011;
	this.TEXTURE28 = 34012;
	this.TEXTURE29 = 34013;
	this.TEXTURE30 = 34014;
	this.TEXTURE31 = 34015;
	this.ACTIVE_TEXTURE = 34016;
	this.REPEAT = 10497;
	this.CLAMP_TO_EDGE = 33071;
	this.MIRRORED_REPEAT = 33648;
	this.FLOAT_VEC2 = 35664;
	this.FLOAT_VEC3 = 35665;
	this.FLOAT_VEC4 = 35666;
	this.INT_VEC2 = 35667;
	this.INT_VEC3 = 35668;
	this.INT_VEC4 = 35669;
	this.BOOL = 35670;
	this.BOOL_VEC2 = 35671;
	this.BOOL_VEC3 = 35672;
	this.BOOL_VEC4 = 35673;
	this.FLOAT_MAT2 = 35674;
	this.FLOAT_MAT3 = 35675;
	this.FLOAT_MAT4 = 35676;
	this.SAMPLER_2D = 35678;
	this.SAMPLER_CUBE = 35680;
	this.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
	this.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
	this.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
	this.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
	this.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
	this.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
	this.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
	this.IMPLEMENTATION_COLOR_READ_TYPE = 35738;
	this.IMPLEMENTATION_COLOR_READ_FORMAT = 35739;
	this.COMPILE_STATUS = 35713;
	this.LOW_FLOAT = 36336;
	this.MEDIUM_FLOAT = 36337;
	this.HIGH_FLOAT = 36338;
	this.LOW_INT = 36339;
	this.MEDIUM_INT = 36340;
	this.HIGH_INT = 36341;
	this.FRAMEBUFFER = 36160;
	this.RENDERBUFFER = 36161;
	this.RGBA4 = 32854;
	this.RGB5_A1 = 32855;
	this.RGB565 = 36194;
	this.DEPTH_COMPONENT16 = 33189;
	this.STENCIL_INDEX8 = 36168;
	this.DEPTH_STENCIL = 34041;
	this.RENDERBUFFER_WIDTH = 36162;
	this.RENDERBUFFER_HEIGHT = 36163;
	this.RENDERBUFFER_INTERNAL_FORMAT = 36164;
	this.RENDERBUFFER_RED_SIZE = 36176;
	this.RENDERBUFFER_GREEN_SIZE = 36177;
	this.RENDERBUFFER_BLUE_SIZE = 36178;
	this.RENDERBUFFER_ALPHA_SIZE = 36179;
	this.RENDERBUFFER_DEPTH_SIZE = 36180;
	this.RENDERBUFFER_STENCIL_SIZE = 36181;
	this.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
	this.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
	this.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
	this.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
	this.COLOR_ATTACHMENT0 = 36064;
	this.DEPTH_ATTACHMENT = 36096;
	this.STENCIL_ATTACHMENT = 36128;
	this.DEPTH_STENCIL_ATTACHMENT = 33306;
	this.NONE = 0;
	this.FRAMEBUFFER_COMPLETE = 36053;
	this.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
	this.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
	this.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
	this.FRAMEBUFFER_UNSUPPORTED = 36061;
	this.FRAMEBUFFER_BINDING = 36006;
	this.RENDERBUFFER_BINDING = 36007;
	this.MAX_RENDERBUFFER_SIZE = 34024;
	this.INVALID_FRAMEBUFFER_OPERATION = 1286;
	this.UNPACK_FLIP_Y_WEBGL = 37440;
	this.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
	this.CONTEXT_LOST_WEBGL = 37442;
	this.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
	this.BROWSER_DEFAULT_WEBGL = 37444;


	this.activeTexture = function () {};
	this.attachShader = function () {};
	this.bindAttribLocation = function () {};
	this.bindBuffer = function () {};
	this.bindFramebuffer = function () {};
	this.bindRenderbuffer = function () {};
	this.bindTexture = function () {};
	this.blendColor = function () {};
	this.blendEquation = function () {};
	this.blendEquationSeparate = function () {};
	this.blendFunc = function () {};
	this.blendFuncSeparate = function () {};
	this.bufferData = function () {};
	this.bufferSubData = function () {};
	this.checkFramebufferStatus = function () {};
	this.clear = function () {};
	this.clearColor = function () {};
	this.clearDepth = function () {};
	this.clearStencil = function () {};
	this.colorMask = function () {};
	this.compileShader = function () {};
	this.compressedTexImage2D = function () {};
	this.compressedTexSubImage2D = function () {};
	this.copyTexImage2D = function () {};
	this.copyTexSubImage2D = function () {};
	this.createBuffer = function () {};
	this.createFramebuffer = function () {};
	this.createProgram = function () {};
	this.createRenderbuffer = function () {};
	this.createShader = function () {};
	this.createTexture = function () {};
	this.cullFace = function () {};
	this.deleteBuffer = function () {};
	this.deleteFramebuffer = function () {};
	this.deleteProgram = function () {};
	this.deleteRenderbuffer = function () {};
	this.deleteShader = function () {};
	this.deleteTexture = function () {};
	this.depthFunc = function () {};
	this.depthMask = function () {};
	this.depthRange = function () {};
	this.detachShader = function () {};
	this.disable = function () {};
	this.disableVertexAttribArray = function () {};
	this.drawArrays = function () {};
	this.drawElements = function () {};
	this.enable = function () {};
	this.enableVertexAttribArray = function () {};
	this.finish = function () {};
	this.flush = function () {};
	this.framebufferRenderbuffer = function () {};
	this.framebufferTexture2D = function () {};
	this.frontFace = function () {};
	this.generateMipmap = function () {};
	this.getActiveAttrib = function () {};
	this.getActiveUniform = function () {};
	this.getAttachedShaders = function () {};
	this.getAttribLocation = function () {};
	this.getBufferParameter = function () {};
	this.getContextAttributes = function () {};
	this.getError = function () {};
	this.getExtension = function () {};
	this.getFramebufferAttachmentParameter = function () {};

	var parameters = {};
	parameters[ this.VERSION ] = "Custom";
	parameters[ this.MAX_TEXTURE_SIZE ] = 4096;
	this.getParameter = function ( parameterID ) {

		return parameters[ parameterID ];

	};

	this.getProgramParameter = function () {};
	this.getProgramInfoLog = function () { return ''; };
	this.getRenderbufferParameter = function () {};
	this.getShaderParameter = function () {};
	this.getShaderInfoLog = function () { return ''; };
	this.getShaderPrecisionFormat = function () {

		return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };

	};
	this.getShaderSource = function () {};
	this.getSupportedExtensions = function () {};
	this.getTexParameter = function () {};
	this.getUniform = function () {};
	this.getUniformLocation = function () {};
	this.getVertexAttrib = function () {};
	this.getVertexAttribOffset = function () {};
	this.hint = function () {};
	this.isBuffer = function () {};
	this.isContextLost = function () {};
	this.isEnabled = function () {};
	this.isFramebuffer = function () {};
	this.isProgram = function () {};
	this.isRenderbuffer = function () {};
	this.isShader = function () {};
	this.isTexture = function () {};
	this.lineWidth = function () {};
	this.linkProgram = function () {};
	this.pixelStorei = function () {};
	this.polygonOffset = function () {};
	this.readPixels = function () {};
	this.renderbufferStorage = function () {};
	this.sampleCoverage = function () {};
	this.scissor = function () {};
	this.shaderSource = function () {};
	this.stencilFunc = function () {};
	this.stencilFuncSeparate = function () {};
	this.stencilMask = function () {};
	this.stencilMaskSeparate = function () {};
	this.stencilOp = function () {};
	this.stencilOpSeparate = function () {};
	this.texParameterf = function () {};
	this.texParameteri = function () {};
	this.texImage2D = function () {};
	this.texSubImage2D = function () {};
	this.uniform1f = function () {};
	this.uniform1fv = function () {};
	this.uniform1i = function () {};
	this.uniform1iv = function () {};
	this.uniform2f = function () {};
	this.uniform2fv = function () {};
	this.uniform2i = function () {};
	this.uniform2iv = function () {};
	this.uniform3f = function () {};
	this.uniform3fv = function () {};
	this.uniform3i = function () {};
	this.uniform3iv = function () {};
	this.uniform4f = function () {};
	this.uniform4fv = function () {};
	this.uniform4i = function () {};
	this.uniform4iv = function () {};
	this.uniformMatrix2fv = function () {};
	this.uniformMatrix3fv = function () {};
	this.uniformMatrix4fv = function () {};
	this.useProgram = function () {};
	this.validateProgram = function () {};
	this.vertexAttrib1f = function () {};
	this.vertexAttrib1fv = function () {};
	this.vertexAttrib2f = function () {};
	this.vertexAttrib2fv = function () {};
	this.vertexAttrib3f = function () {};
	this.vertexAttrib3fv = function () {};
	this.vertexAttrib4f = function () {};
	this.vertexAttrib4fv = function () {};
	this.vertexAttribPointer = function () {};
	this.viewport = function () {};

};

global.document = new customDocument();
global.customCanvas = customCanvas;
global.customWebGLContext = customWebGLContext;
global.customElement = customElement;
global.Image = customImage;