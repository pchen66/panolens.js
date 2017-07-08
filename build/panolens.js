/**
 * Panolens.js
 * @author pchen66
 * @namespace PANOLENS
 */

var PANOLENS = { REVISION: '9' };
;/*! npm.im/iphone-inline-video 2.2.2 */
var enableInlineVideo=function(){"use strict";/*! npm.im/intervalometer */
function e(e,i,n,r){function t(n){d=i(t,r),e(n-(a||n)),a=n}var d,a;return{start:function(){d||t(0)},stop:function(){n(d),d=null,a=0}}}function i(i){return e(i,requestAnimationFrame,cancelAnimationFrame)}function n(e,i,n){function r(r){n&&!n(e,i)||r.stopImmediatePropagation()}return e.addEventListener(i,r),r}function r(e,i,n,r){function t(){return n[i]}function d(e){n[i]=e}r&&d(e[i]),Object.defineProperty(e,i,{get:t,set:d})}function t(e,i,n){n.addEventListener(i,function(){return e.dispatchEvent(new Event(i))})}function d(e,i){Promise.resolve().then(function(){e.dispatchEvent(new Event(i))})}function a(e){var i=new Audio;return t(e,"play",i),t(e,"playing",i),t(e,"pause",i),i.crossOrigin=e.crossOrigin,i.src=e.src||e.currentSrc||"data:",i}function u(e,i,n){(m||0)+200<Date.now()&&(e[h]=!0,m=Date.now()),n||(e.currentTime=i),k[++T%3]=100*i|0}function o(e){return e.driver.currentTime>=e.video.duration}function s(e){var i=this;i.video.readyState>=i.video.HAVE_FUTURE_DATA?(i.hasAudio||(i.driver.currentTime=i.video.currentTime+e*i.video.playbackRate/1e3,i.video.loop&&o(i)&&(i.driver.currentTime=0)),u(i.video,i.driver.currentTime)):i.video.networkState===i.video.NETWORK_IDLE&&0===i.video.buffered.length&&i.video.load(),i.video.ended&&(delete i.video[h],i.video.pause(!0))}function c(){var e=this,i=e[g];if(e.webkitDisplayingFullscreen)return void e[E]();"data:"!==i.driver.src&&i.driver.src!==e.src&&(u(e,0,!0),i.driver.src=e.src),e.paused&&(i.paused=!1,0===e.buffered.length&&e.load(),i.driver.play(),i.updater.start(),i.hasAudio||(d(e,"play"),i.video.readyState>=i.video.HAVE_ENOUGH_DATA&&d(e,"playing")))}function v(e){var i=this,n=i[g];n.driver.pause(),n.updater.stop(),i.webkitDisplayingFullscreen&&i[w](),n.paused&&!e||(n.paused=!0,n.hasAudio||d(i,"pause"),i.ended&&!i.webkitDisplayingFullscreen&&(i[h]=!0,d(i,"ended")))}function p(e,n){var r={};e[g]=r,r.paused=!0,r.hasAudio=n,r.video=e,r.updater=i(s.bind(r)),n?r.driver=a(e):(e.addEventListener("canplay",function(){e.paused||d(e,"playing")}),r.driver={src:e.src||e.currentSrc||"data:",muted:!0,paused:!0,pause:function(){r.driver.paused=!0},play:function(){r.driver.paused=!1,o(r)&&u(e,0)},get ended(){return o(r)}}),e.addEventListener("emptied",function(){var i=!r.driver.src||"data:"===r.driver.src;r.driver.src&&r.driver.src!==e.src&&(u(e,0,!0),r.driver.src=e.src,i||!n&&e.autoplay?r.driver.play():r.updater.stop())},!1),e.addEventListener("webkitbeginfullscreen",function(){e.paused?n&&0===r.driver.buffered.length&&r.driver.load():(e.pause(),e[E]())}),n&&(e.addEventListener("webkitendfullscreen",function(){r.driver.currentTime=e.currentTime}),e.addEventListener("seeking",function(){k.indexOf(100*e.currentTime|0)<0&&(r.driver.currentTime=e.currentTime)}))}function l(e){var i=e[h];return delete e[h],!e.webkitDisplayingFullscreen&&!i}function f(e){var i=e[g];e[E]=e.play,e[w]=e.pause,e.play=c,e.pause=v,r(e,"paused",i.driver),r(e,"muted",i.driver,!0),r(e,"playbackRate",i.driver,!0),r(e,"ended",i.driver),r(e,"loop",i.driver,!0),n(e,"seeking",function(e){return!e.webkitDisplayingFullscreen}),n(e,"seeked",function(e){return!e.webkitDisplayingFullscreen}),n(e,"timeupdate",l),n(e,"ended",l)}function y(e,i){if(void 0===i&&(i={}),!e[g]){if(!i.everywhere){if(!b)return;if(!(i.iPad||i.ipad?/iPhone|iPod|iPad/:/iPhone|iPod/).test(navigator.userAgent))return}e.pause();var n=e.autoplay;e.autoplay=!1,p(e,!e.muted),f(e),e.classList.add("IIV"),e.muted&&n&&(e.play(),e.addEventListener("playing",function i(){e.autoplay=!0,e.removeEventListener("playing",i)})),/iPhone|iPod|iPad/.test(navigator.platform)||console.warn("iphone-inline-video is not guaranteed to work in emulated environments")}}var m,b="object"==typeof document&&"object-fit"in document.head.style&&!matchMedia("(-webkit-video-playable-inline)").matches,g="bfred-it:iphone-inline-video",h="bfred-it:iphone-inline-video:event",E="bfred-it:iphone-inline-video:nativeplay",w="bfred-it:iphone-inline-video:nativepause",k=[],T=0;return y}();
;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var TWEEN = TWEEN || (function () {

	var _tweens = [];

	return {

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function (tween) {

			_tweens.push(tween);

		},

		remove: function (tween) {

			var i = _tweens.indexOf(tween);

			if (i !== -1) {
				_tweens.splice(i, 1);
			}

		},

		update: function (time, preserve) {

			if (_tweens.length === 0) {
				return false;
			}

			var i = 0;

			time = time !== undefined ? time : TWEEN.now();

			while (i < _tweens.length) {

				if (_tweens[i].update(time) || preserve) {
					i++;
				} else {
					_tweens.splice(i, 1);
				}

			}

			return true;

		}
	};

})();


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof (window) !== 'undefined' &&
         window.performance !== undefined &&
		 window.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = window.performance.now.bind(window.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _valuesStartRepeat = {};
	var _duration = 1000;
	var _repeat = 0;
	var _repeatDelayTime;
	var _yoyo = false;
	var _isPlaying = false;
	var _reversed = false;
	var _delayTime = 0;
	var _startTime = null;
	var _easingFunction = TWEEN.Easing.Linear.None;
	var _interpolationFunction = TWEEN.Interpolation.Linear;
	var _chainedTweens = [];
	var _onStartCallback = null;
	var _onStartCallbackFired = false;
	var _onUpdateCallback = null;
	var _onCompleteCallback = null;
	var _onStopCallback = null;

	this.to = function (properties, duration) {

		_valuesEnd = properties;

		if (duration !== undefined) {
			_duration = duration;
		}

		return this;

	};

	this.start = function (time) {

		TWEEN.add(this);

		_isPlaying = true;

		_onStartCallbackFired = false;

		_startTime = time !== undefined ? time : TWEEN.now();
		_startTime += _delayTime;

		for (var property in _valuesEnd) {

			// Check if an Array was provided as property value
			if (_valuesEnd[property] instanceof Array) {

				if (_valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (_object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			_valuesStart[property] = _object[property];

			if ((_valuesStart[property] instanceof Array) === false) {
				_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			_valuesStartRepeat[property] = _valuesStart[property] || 0;

		}

		return this;

	};

	this.stop = function () {

		if (!_isPlaying) {
			return this;
		}

		TWEEN.remove(this);
		_isPlaying = false;

		if (_onStopCallback !== null) {
			_onStopCallback.call(_object, _object);
		}

		this.stopChainedTweens();
		return this;

	};

	this.end = function () {

		this.update(_startTime + _duration);
		return this;

	};

	this.stopChainedTweens = function () {

		for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
			_chainedTweens[i].stop();
		}

	};

	this.delay = function (amount) {

		_delayTime = amount;
		return this;

	};

	this.repeat = function (times) {

		_repeat = times;
		return this;

	};

	this.repeatDelay = function (amount) {

		_repeatDelayTime = amount;
		return this;

	};

	this.yoyo = function (yoyo) {

		_yoyo = yoyo;
		return this;

	};


	this.easing = function (easing) {

		_easingFunction = easing;
		return this;

	};

	this.interpolation = function (interpolation) {

		_interpolationFunction = interpolation;
		return this;

	};

	this.chain = function () {

		_chainedTweens = arguments;
		return this;

	};

	this.onStart = function (callback) {

		_onStartCallback = callback;
		return this;

	};

	this.onUpdate = function (callback) {

		_onUpdateCallback = callback;
		return this;

	};

	this.onComplete = function (callback) {

		_onCompleteCallback = callback;
		return this;

	};

	this.onStop = function (callback) {

		_onStopCallback = callback;
		return this;

	};

	this.update = function (time) {

		var property;
		var elapsed;
		var value;

		if (time < _startTime) {
			return true;
		}

		if (_onStartCallbackFired === false) {

			if (_onStartCallback !== null) {
				_onStartCallback.call(_object, _object);
			}

			_onStartCallbackFired = true;
		}

		elapsed = (time - _startTime) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;

		value = _easingFunction(elapsed);

		for (property in _valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (_valuesStart[property] === undefined) {
				continue;
			}

			var start = _valuesStart[property] || 0;
			var end = _valuesEnd[property];

			if (end instanceof Array) {

				_object[property] = _interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					_object[property] = start + (end - start) * value;
				}

			}

		}

		if (_onUpdateCallback !== null) {
			_onUpdateCallback.call(_object, value);
		}

		if (elapsed === 1) {

			if (_repeat > 0) {

				if (isFinite(_repeat)) {
					_repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in _valuesStartRepeat) {

					if (typeof (_valuesEnd[property]) === 'string') {
						_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
					}

					if (_yoyo) {
						var tmp = _valuesStartRepeat[property];

						_valuesStartRepeat[property] = _valuesEnd[property];
						_valuesEnd[property] = tmp;
					}

					_valuesStart[property] = _valuesStartRepeat[property];

				}

				if (_yoyo) {
					_reversed = !_reversed;
				}

				if (_repeatDelayTime !== undefined) {
					_startTime = time + _repeatDelayTime;
				} else {
					_startTime = time + _delayTime;
				}

				return true;

			} else {

				if (_onCompleteCallback !== null) {

					_onCompleteCallback.call(_object, _object);
				}

				for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					_chainedTweens[i].start(_startTime + _duration);
				}

				return false;

			}

		}

		return true;

	};

};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (typeof define === 'function' && define.amd) {

		// AMD
		define([], function () {
			return TWEEN;
		});

	} else if (typeof module !== 'undefined' && typeof exports === 'object') {

		// Node.js
		module.exports = TWEEN;

	} else if (root !== undefined) {

		// Global variable
		root.TWEEN = TWEEN;

	}

})(this);
;/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.frameId;

	// API

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the control orbits around
	// and where it pans with respect to.
	this.target = new THREE.Vector3();

	// center is old, deprecated; use "target" instead
	this.center = this.target;

	// This option actually enables dollying in and out; left as "zoom" for
	// backwards compatibility
	this.noZoom = false;
	this.zoomSpeed = 1.0;

	// Limits to how far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// Limits to how far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// Set to true to disable this control
	this.noRotate = false;
	this.rotateSpeed = -0.15;

	// Set to true to disable this control
	this.noPan = true;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// Momentum
  	this.momentumDampingFactor = 0.90;
  	this.momentumScalingFactor = -0.005;
  	this.momentumKeydownFactor = 20;

  	// Fov
  	this.minFov = 30;
  	this.maxFov = 120;

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to disable use of the keys
	this.noKeys = false;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	////////////
	// internals

	var scope = this;

	var EPS = 10e-8;
	var MEPS = 10e-5;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();
	var panOffset = new THREE.Vector3();

	var offset = new THREE.Vector3();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	var theta;
	var phi;
	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;
	var pan = new THREE.Vector3();

	var lastPosition = new THREE.Vector3();
	var lastQuaternion = new THREE.Quaternion();

	var momentumLeft = 0, momentumUp = 0;
	var eventCurrent, eventPrevious;
	var momentumOn = false;

	var keyUp, keyBottom, keyLeft, keyRight;

	var STATE = { NONE : -1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

	var state = STATE.NONE;

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	// so camera.up is the orbit axis

	var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
	var quatInverse = quat.clone().inverse();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	this.setLastQuaternion = function ( quaternion ) {
		lastQuaternion.copy( quaternion );
		scope.object.quaternion.copy( quaternion );
	};

	this.getLastPosition = function () {
		return lastPosition;
	}

	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;


	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	// pass in distance in world space to move left
	this.panLeft = function ( distance ) {

		var te = this.object.matrix.elements;

		// get X column of matrix
		panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
		panOffset.multiplyScalar( - distance );

		pan.add( panOffset );

	};

	// pass in distance in world space to move up
	this.panUp = function ( distance ) {

		var te = this.object.matrix.elements;

		// get Y column of matrix
		panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
		panOffset.multiplyScalar( distance );

		pan.add( panOffset );

	};

	// pass in x,y of change desired in pixel space,
	// right and down are positive
	this.pan = function ( deltaX, deltaY ) {

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			// perspective
			var position = scope.object.position;
			var offset = position.clone().sub( scope.target );
			var targetDistance = offset.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

			// we actually don't use screenWidth, since perspective camera is fixed to screen height
			scope.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
			scope.panUp( 2 * deltaY * targetDistance / element.clientHeight );

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			// orthographic
			scope.panLeft( deltaX * (scope.object.right - scope.object.left) / element.clientWidth );
			scope.panUp( deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight );

		} else {

			// camera neither orthographic or perspective
			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

		}

	};

	this.momentum = function(){
		
		if ( !momentumOn ) return;

		if ( Math.abs( momentumLeft ) < MEPS && Math.abs( momentumUp ) < MEPS ) { 

			momentumOn = false; 
			return;
		}

		momentumUp   *= this.momentumDampingFactor;
		momentumLeft *= this.momentumDampingFactor;

		thetaDelta -= this.momentumScalingFactor * momentumLeft;
		phiDelta   -= this.momentumScalingFactor * momentumUp;

	};

	this.dollyIn = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

		}

	};

	this.dollyOut = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

		}

	};

	this.update = function ( ignoreUpdate ) {

		var position = this.object.position;

		offset.copy( position ).sub( this.target );

		// rotate offset to "y-axis-is-up" space
		offset.applyQuaternion( quat );

		// angle from z-axis around y-axis

		theta = Math.atan2( offset.x, offset.z );

		// angle from y-axis

		phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

		if ( this.autoRotate && state === STATE.NONE ) {

			this.rotateLeft( getAutoRotationAngle() );

		}

		this.momentum();

		theta += thetaDelta;
		phi += phiDelta;

		// restrict theta to be between desired limits
		theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

		// restrict phi to be betwee EPS and PI-EPS
		phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

		var radius = offset.length() * scale;

		// restrict radius to be between desired limits
		radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

		// move target to panned location
		this.target.add( pan );

		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );

		// rotate offset back to "camera-up-vector-is-up" space
		offset.applyQuaternion( quatInverse );

		position.copy( this.target ).add( offset );

		this.object.lookAt( this.target );

		thetaDelta = 0;
		phiDelta = 0;
		scale = 1;
		pan.set( 0, 0, 0 );

		// update condition is:
		// min(camera displacement, camera rotation in radians)^2 > EPS
		// using small-angle approximation cos(x/2) = 1 - x^2 / 8
		if ( lastPosition.distanceToSquared( this.object.position ) > EPS
		    || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {

			ignoreUpdate !== true && this.dispatchEvent( changeEvent );

			lastPosition.copy( this.object.position );
			lastQuaternion.copy (this.object.quaternion );

		}

	};


	this.reset = function () {

		state = STATE.NONE;

		this.target.copy( this.target0 );
		this.object.position.copy( this.position0 );
		this.object.zoom = this.zoom0;

		this.object.updateProjectionMatrix();
		this.dispatchEvent( changeEvent );

		this.update();

	};

	this.getPolarAngle = function () {

		return phi;

	};

	this.getAzimuthalAngle = function () {

		return theta

	};

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function onMouseDown( event ) {

		momentumOn = false;

   		momentumLeft = momentumUp = 0;

		if ( scope.enabled === false ) return;
		event.preventDefault();

		if ( event.button === scope.mouseButtons.ORBIT ) {
			if ( scope.noRotate === true ) return;

			state = STATE.ROTATE;

			rotateStart.set( event.clientX, event.clientY );

		} else if ( event.button === scope.mouseButtons.ZOOM ) {
			if ( scope.noZoom === true ) return;

			state = STATE.DOLLY;

			dollyStart.set( event.clientX, event.clientY );

		} else if ( event.button === scope.mouseButtons.PAN ) {
			if ( scope.noPan === true ) return;

			state = STATE.PAN;

			panStart.set( event.clientX, event.clientY );

		}

		if ( state !== STATE.NONE ) {
			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );
			scope.dispatchEvent( startEvent );
		}

		scope.update();

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( state === STATE.ROTATE ) {

			if ( scope.noRotate === true ) return;

			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			// rotating across whole screen goes 360 degrees around
			scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

			rotateStart.copy( rotateEnd );

			if( eventPrevious ){
				momentumLeft = event.clientX - eventPrevious.clientX;
				momentumUp = event.clientY - eventPrevious.clientY;
			}

			eventPrevious = event;

		} else if ( state === STATE.DOLLY ) {

			if ( scope.noZoom === true ) return;

			dollyEnd.set( event.clientX, event.clientY );
			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				scope.dollyIn();

			} else if ( dollyDelta.y < 0 ) {

				scope.dollyOut();

			}

			dollyStart.copy( dollyEnd );

		} else if ( state === STATE.PAN ) {

			if ( scope.noPan === true ) return;

			panEnd.set( event.clientX, event.clientY );
			panDelta.subVectors( panEnd, panStart );

			scope.pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		if ( state !== STATE.NONE ) scope.update();

	}

	function onMouseUp( /* event */ ) {

		momentumOn = true;

		eventPrevious = undefined;

		if ( scope.enabled === false ) return;

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );
		scope.dispatchEvent( endEvent );
		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.noZoom === true || state !== STATE.NONE ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}

		if ( delta > 0 ) {

			//scope.dollyOut();
			scope.object.fov = ( scope.object.fov < scope.maxFov ) 
				? scope.object.fov + 1
				: scope.maxFov;
			scope.object.updateProjectionMatrix();

		} else if ( delta < 0 ) {

			//scope.dollyIn();
			scope.object.fov = ( scope.object.fov > scope.minFov ) 
				? scope.object.fov - 1
				: scope.minFov;
			scope.object.updateProjectionMatrix();

		}

		scope.update();
		scope.dispatchEvent( changeEvent );
		scope.dispatchEvent( startEvent );
		scope.dispatchEvent( endEvent );

	}

	function onKeyUp ( event ) {

		switch ( event.keyCode ) {

			case scope.keys.UP:
				keyUp = false;
				break;

			case scope.keys.BOTTOM:
				keyBottom = false;
				break;

			case scope.keys.LEFT:
				keyLeft = false;
				break;

			case scope.keys.RIGHT:
				keyRight = false;
				break;

		}

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.noKeys === true || scope.noRotate === true ) return;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				keyUp = true;
				break;

			case scope.keys.BOTTOM:
				keyBottom = true;
				break;

			case scope.keys.LEFT:
				keyLeft = true;
				break;

			case scope.keys.RIGHT:
				keyRight = true;
				break;

		}

		if (keyUp || keyBottom || keyLeft || keyRight) {

			momentumOn = true;

			if (keyUp) momentumUp = - scope.rotateSpeed * scope.momentumKeydownFactor;
			if (keyBottom) momentumUp = scope.rotateSpeed * scope.momentumKeydownFactor;
			if (keyLeft) momentumLeft = - scope.rotateSpeed * scope.momentumKeydownFactor;
			if (keyRight) momentumLeft = scope.rotateSpeed * scope.momentumKeydownFactor;

		}

	}

	function touchstart( event ) {

		momentumOn = false;

		momentumLeft = momentumUp = 0;

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.noRotate === true ) return;

				state = STATE.TOUCH_ROTATE;

				rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			case 2:	// two-fingered touch: dolly

				if ( scope.noZoom === true ) return;

				state = STATE.TOUCH_DOLLY;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				break;

			case 3: // three-fingered touch: pan

				if ( scope.noPan === true ) return;

				state = STATE.TOUCH_PAN;

				panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

	}

	function touchmove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.noRotate === true ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return;

				rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				rotateDelta.subVectors( rotateEnd, rotateStart );

				// rotating across whole screen goes 360 degrees around
				scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
				// rotating up and down along whole screen attempts to go 360, but limited to 180
				scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

				rotateStart.copy( rotateEnd );

				if( eventPrevious ){
					momentumLeft = event.touches[ 0 ].pageX - eventPrevious.pageX;
					momentumUp = event.touches[ 0 ].pageY - eventPrevious.pageY;
				}

				eventPrevious = {
					pageX: event.touches[ 0 ].pageX,
					pageY: event.touches[ 0 ].pageY,
				};

				scope.update();
				break;

			case 2: // two-fingered touch: dolly

				if ( scope.noZoom === true ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				if ( event.scale < 1 ) {

					scope.object.fov = ( scope.object.fov < scope.maxFov ) 
						? scope.object.fov + 1
						: scope.maxFov;
					scope.object.updateProjectionMatrix();

				} else if ( event.scale > 1 ) {

					scope.object.fov = ( scope.object.fov > scope.minFov ) 
						? scope.object.fov - 1
						: scope.minFov;
					scope.object.updateProjectionMatrix();

				}

				scope.update();
				scope.dispatchEvent( changeEvent );
				break;

			case 3: // three-fingered touch: pan

				if ( scope.noPan === true ) return;
				if ( state !== STATE.TOUCH_PAN ) return;

				panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				panDelta.subVectors( panEnd, panStart );

				scope.pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

				scope.update();
				break;

			default:

				state = STATE.NONE;

		}

	}

	function touchend( /* event */ ) {

		momentumOn = true;

		eventPrevious = undefined;

		if ( scope.enabled === false ) return;

		scope.dispatchEvent( endEvent );
		state = STATE.NONE;

	}

	//this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
	this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keyup', onKeyUp, false );
	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start
	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;;/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function( camera, domElement ) {

	var scope = this;
	var changeEvent = { type: 'change' };

	var rotY = 0;
	var rotX = 0;
	var tempX = 0;
	var tempY = 0;

	this.camera = camera;
	this.camera.rotation.reorder( "YXZ" );
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alpha = 0;
	this.alphaOffsetAngle = 0;


	var onDeviceOrientationChangeEvent = function( event ) {

		scope.deviceOrientation = event;

	};

	var onScreenOrientationChangeEvent = function() {

		scope.screenOrientation = window.orientation || 0;

	};

	var onTouchStartEvent = function (event) {

		event.preventDefault();
		event.stopPropagation();

		tempX = event.touches[ 0 ].pageX;
		tempY = event.touches[ 0 ].pageY;

	};

	var onTouchMoveEvent = function (event) {

		event.preventDefault();
		event.stopPropagation();

		rotY += THREE.Math.degToRad( ( event.touches[ 0 ].pageX - tempX ) / 4 );
		rotX += THREE.Math.degToRad( ( tempY - event.touches[ 0 ].pageY ) / 4 );

		scope.updateAlphaOffsetAngle( rotY );

		tempX = event.touches[ 0 ].pageX;
		tempY = event.touches[ 0 ].pageY;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setCameraQuaternion = function( quaternion, alpha, beta, gamma, orient ) {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		var vectorFingerY;
		var fingerQY = new THREE.Quaternion();
		var fingerQX = new THREE.Quaternion();

		if ( scope.screenOrientation == 0 ) {

			vectorFingerY = new THREE.Vector3( 1, 0, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

		} else if ( scope.screenOrientation == 180 ) {

			vectorFingerY = new THREE.Vector3( 1, 0, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, rotX );

		} else if ( scope.screenOrientation == 90 ) {

			vectorFingerY = new THREE.Vector3( 0, 1, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, rotX );

		} else if ( scope.screenOrientation == - 90) {

			vectorFingerY = new THREE.Vector3( 0, 1, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

		}

		q1.multiply( fingerQY );
		q1.multiply( fingerQX );

		euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

		quaternion.setFromEuler( euler ); // orient the device

		quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

		quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

	};

	this.connect = function() {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', this.update.bind( this ), false );

		scope.domElement.addEventListener( "touchstart", onTouchStartEvent, false );
		scope.domElement.addEventListener( "touchmove", onTouchMoveEvent, false );

		scope.enabled = true;

	};

	this.disconnect = function() {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', this.update.bind( this ), false );

		scope.domElement.removeEventListener( "touchstart", onTouchStartEvent, false );
		scope.domElement.removeEventListener( "touchmove", onTouchMoveEvent, false );

		scope.enabled = false;

	};

	this.update = function( ignoreUpdate ) {

		if ( scope.enabled === false ) return;

		var alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) + this.alphaOffsetAngle : 0; // Z
		var beta = scope.deviceOrientation.beta ? THREE.Math.degToRad( scope.deviceOrientation.beta ) : 0; // X'
		var gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
		var orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

		setCameraQuaternion( scope.camera.quaternion, alpha, beta, gamma, orient );
		this.alpha = alpha;

		ignoreUpdate !== true && this.dispatchEvent( changeEvent );

	};

	this.updateAlphaOffsetAngle = function( angle ) {

		this.alphaOffsetAngle = angle;
		this.update();

	};

	this.dispose = function() {

		this.disconnect();

	};

	this.connect();

};

THREE.DeviceOrientationControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.DeviceOrientationControls.prototype.constructor = THREE.DeviceOrientationControls;; /** The Bend modifier lets you bend the current selection up to 90 degrees about a single axis,
 * producing a uniform bend in an object's geometry.
 * You can control the angle and direction of the bend on any of three axes.
 * The geometry has to have rather large number of polygons!
 * options:
 * 	 direction - deformation direction (in local coordinates!). 
 * 	 axis - deformation axis (in local coordinates!). Vector of direction and axis are perpendicular.
 * 	 angle - deformation angle.
 * @author Vildanov Almaz / alvild@gmail.com
 * The algorithm of a bend is based on the chain line cosh: y = 1/b * cosh(b*x) - 1/b. It can be used only in three.js.
 */

THREE.BendModifier = function () {

};

THREE.BendModifier.prototype = {

    constructor: THREE.BendModifier,

    set: function ( direction, axis, angle ) {
        this.direction = new THREE.Vector3(); this.direction.copy( direction );
		this.axis = new THREE.Vector3(); this.axis.copy( axis );
        this.angle = angle;
        return this
    },

	_sign: function (a) {
        return 0 > a ? -1 : 0 < a ? 1 : 0
    },

	_cosh: function( x )  {
		return ( Math.exp( x ) + Math.exp( -x ) ) / 2;
	},

	_sinhInverse: function( x )  {
			return  Math.log( Math.abs( x ) + Math.sqrt( x * x + 1 ) );
	},

    modify: function ( geometry ) {

		var thirdAxis = new THREE.Vector3();  thirdAxis.crossVectors( this.direction, this.axis );

		// P - matrices of the change-of-coordinates
		var P = new THREE.Matrix4();
		P.set ( thirdAxis.x, thirdAxis.y, thirdAxis.z, 0, 
			this.direction.x, this.direction.y, this.direction.z, 0, 
			this.axis.x, this.axis.y, this.axis.z, 0, 
			0, 0, 0, 1 ).transpose();

		var InverseP =  new THREE.Matrix4().getInverse( P );
		var newVertices = []; var oldVertices = []; var anglesBetweenOldandNewVertices = [];

		var meshGeometryBoundingBoxMaxx = 0; var meshGeometryBoundingBoxMinx = 0;
		var meshGeometryBoundingBoxMaxy = 0; var meshGeometryBoundingBoxMiny = 0;

		for (var i = 0; i < geometry.vertices.length; i++)  {

			newVertices[i] = new THREE.Vector3(); newVertices[i].copy( geometry.vertices[i] ).applyMatrix4( InverseP );
			if ( newVertices[i].x > meshGeometryBoundingBoxMaxx ) { meshGeometryBoundingBoxMaxx = newVertices[i].x; }
			if ( newVertices[i].x < meshGeometryBoundingBoxMinx ) { meshGeometryBoundingBoxMinx = newVertices[i].x; }
			if ( newVertices[i].y > meshGeometryBoundingBoxMaxy ) { meshGeometryBoundingBoxMaxy = newVertices[i].y; }
			if ( newVertices[i].y < meshGeometryBoundingBoxMiny ) { meshGeometryBoundingBoxMiny = newVertices[i].y; }

		}

		var meshWidthold =  meshGeometryBoundingBoxMaxx - meshGeometryBoundingBoxMinx;
		var meshDepth =  meshGeometryBoundingBoxMaxy - meshGeometryBoundingBoxMiny;
		var ParamB = 2 * this._sinhInverse( Math.tan( this.angle ) ) / meshWidthold;
		var oldMiddlex = (meshGeometryBoundingBoxMaxx + meshGeometryBoundingBoxMinx) / 2;
		var oldMiddley = (meshGeometryBoundingBoxMaxy + meshGeometryBoundingBoxMiny) / 2;

		for (var i = 0; i < geometry.vertices.length; i++ )  {

			oldVertices[i] = new THREE.Vector3(); oldVertices[i].copy( newVertices[i] );
			newVertices[i].x = this._sign( newVertices[i].x - oldMiddlex ) * 1 / ParamB * this._sinhInverse( ( newVertices[i].x - oldMiddlex ) * ParamB );

		}

		var meshWidth = 2 / ParamB * this._sinhInverse( meshWidthold / 2 * ParamB );

		var NewParamB = 2 * this._sinhInverse( Math.tan( this.angle ) ) / meshWidth;

		var rightEdgePos = new THREE.Vector3( meshWidth / 2, -meshDepth / 2, 0 );
		rightEdgePos.y = 1 / NewParamB * this._cosh( NewParamB * rightEdgePos.x ) - 1 / NewParamB - meshDepth / 2;

		var bendCenter = new THREE.Vector3( 0, rightEdgePos.y  + rightEdgePos.x / Math.tan( this.angle ), 0 );

		for ( var i = 0; i < geometry.vertices.length; i++ )  {

			var x0 = this._sign( oldVertices[i].x - oldMiddlex ) * 1 / ParamB * this._sinhInverse( ( oldVertices[i].x - oldMiddlex ) * ParamB );
			var y0 = 1 / NewParamB * this._cosh( NewParamB * x0 ) - 1 / NewParamB;

			var k = new THREE.Vector3( bendCenter.x - x0, bendCenter.y - ( y0 - meshDepth / 2 ), bendCenter.z ).normalize();

			var Q = new THREE.Vector3();
			Q.addVectors( new THREE.Vector3( x0, y0 - meshDepth / 2, oldVertices[i].z ), k.multiplyScalar( oldVertices[i].y + meshDepth / 2 ) );
			newVertices[i].x = Q.x;  newVertices[i].y = Q.y;

		}	

		var middle = oldMiddlex * meshWidth / meshWidthold;

		for ( var i = 0; i < geometry.vertices.length; i++ )  {

			var O = new THREE.Vector3( oldMiddlex, oldMiddley, oldVertices[i].z );
			var p = new THREE.Vector3(); p.subVectors( oldVertices[i], O );
			var q = new THREE.Vector3(); q.subVectors( newVertices[i], O );

			anglesBetweenOldandNewVertices[i] = Math.acos( 1 / this._cosh( ParamB * newVertices[i].x ) )  * this._sign( newVertices[i].x );

			newVertices[i].x = newVertices[i].x + middle;
			geometry.vertices[i].copy( newVertices[i].applyMatrix4( P ) );

		}

		geometry.computeFaceNormals();
		geometry.verticesNeedUpdate = true;
		geometry.normalsNeedUpdate = true;

		// compute Vertex Normals
		var fvNames = [ 'a', 'b', 'c', 'd' ];

		for ( var f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

			var face = geometry.faces[ f ];
			if ( face.vertexNormals === undefined ) {
				continue;
			}
			for ( var v = 0, vl = face.vertexNormals.length; v < vl; v ++ ) {

				var angle = anglesBetweenOldandNewVertices[ face[ fvNames[ v ] ] ];
				var x = this.axis.x,
					y = this.axis.y,
					z = this.axis.z;

				var rotateMatrix = new THREE.Matrix3();
				rotateMatrix.set ( Math.cos(angle) + (1-Math.cos(angle))*x*x, (1-Math.cos(angle))*x*y - Math.sin(angle)*z, (1-Math.cos(angle))*x*z + Math.sin(angle)*y,
								(1-Math.cos(angle))*y*x + Math.sin(angle)*z, Math.cos(angle) + (1-Math.cos(angle))*y*y, (1-Math.cos(angle))*y*z - Math.sin(angle)*x,
								(1-Math.cos(angle))*z*x - Math.sin(angle)*y, (1-Math.cos(angle))*z*y + Math.sin(angle)*x, Math.cos(angle) + (1-Math.cos(angle))*z*z );

				face.vertexNormals[ v ].applyMatrix3( rotateMatrix );

				}

			}
		// end compute Vertex Normals			

		return this			
    }	
};/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.CardboardEffect = function ( renderer ) {

	var _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	var _scene = new THREE.Scene();

	var _stereo = new THREE.StereoCamera();
	_stereo.aspect = 0.5;

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	var _renderTarget = new THREE.WebGLRenderTarget( 512, 512, _params );
	_renderTarget.scissorTest = true;
	_renderTarget.texture.generateMipmaps = false;

	// Distortion Mesh ported from:
	// https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js

	var distortion = new THREE.Vector2( 0.441, 0.156 );

	var geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 20 ).removeAttribute( 'normal' ).toNonIndexed();

	var positions = geometry.attributes.position.array;
	var uvs = geometry.attributes.uv.array;

	// duplicate
	geometry.attributes.position.count *= 2;
	geometry.attributes.uv.count *= 2;

	var positions2 = new Float32Array( positions.length * 2 );
	positions2.set( positions );
	positions2.set( positions, positions.length );

	var uvs2 = new Float32Array( uvs.length * 2 );
	uvs2.set( uvs );
	uvs2.set( uvs, uvs.length );

	var vector = new THREE.Vector2();
	var length = positions.length / 3;

	for ( var i = 0, l = positions2.length / 3; i < l; i ++ ) {

		vector.x = positions2[ i * 3 + 0 ];
		vector.y = positions2[ i * 3 + 1 ];

		var dot = vector.dot( vector );
		var scalar = 1.5 + ( distortion.x + distortion.y * dot ) * dot;

		var offset = i < length ? 0 : 1;

		positions2[ i * 3 + 0 ] = ( vector.x / scalar ) * 1.5 - 0.5 + offset;
		positions2[ i * 3 + 1 ] = ( vector.y / scalar ) * 3.0;

		uvs2[ i * 2 ] = ( uvs2[ i * 2 ] + offset ) * 0.5;

	}

	geometry.attributes.position.array = positions2;
	geometry.attributes.uv.array = uvs2;

	//

	// var material = new THREE.MeshBasicMaterial( { wireframe: true } );
	var material = new THREE.MeshBasicMaterial( { map: _renderTarget.texture } );
	var mesh = new THREE.Mesh( geometry, material );
	_scene.add( mesh );

	//

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

		var pixelRatio = renderer.getPixelRatio();

		_renderTarget.setSize( width * pixelRatio, height * pixelRatio );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		var width = _renderTarget.width / 2;
		var height = _renderTarget.height;

		_renderTarget.scissor.set( 0, 0, width, height );
		_renderTarget.viewport.set( 0, 0, width, height );
		renderer.render( scene, _stereo.cameraL, _renderTarget );

		_renderTarget.scissor.set( width, 0, width, height );
		_renderTarget.viewport.set( width, 0, width, height );
		renderer.render( scene, _stereo.cameraR, _renderTarget );

		renderer.render( _scene, _camera );

	};

};;/**
 * @author alteredq / http://alteredqualia.com/
 * @authod mrdoob / http://mrdoob.com/
 * @authod arodic / http://aleksandarrodic.com/
 * @authod fonserbc / http://fonserbc.github.io/
*/

THREE.StereoEffect = function ( renderer ) {

	var _stereo = new THREE.StereoCamera();
	_stereo.aspect = 0.5;

	this.setEyeSeparation = function ( eyeSep ) {

		_stereo.eyeSep = eyeSep;

	};

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		var size = renderer.getSize();

		if ( renderer.autoClear ) renderer.clear();
		renderer.setScissorTest( true );

		renderer.setScissor( 0, 0, size.width / 2, size.height );
		renderer.setViewport( 0, 0, size.width / 2, size.height );
		renderer.render( scene, _stereo.cameraL );

		renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
		renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
		renderer.render( scene, _stereo.cameraR );

		renderer.setScissorTest( false );

	};

};
;var GSVPANO = GSVPANO || {};
GSVPANO.PanoLoader = function (parameters) {

	'use strict';

	var _parameters = parameters || {},
		_location,
		_zoom,
		_panoId,
		_panoClient = new google.maps.StreetViewService(),
		_count = 0,
		_total = 0,
		_canvas = [],
		_ctx = [],
		_wc = 0,
		_hc = 0,
		result = null,
		rotation = 0,
		copyright = '',
		onSizeChange = null,
		onPanoramaLoad = null;

	var levelsW = [ 1, 2, 4, 7, 13, 26 ],
		levelsH = [ 1, 1, 2, 4, 7, 13 ];

	var widths = [ 416, 832, 1664, 3328, 6656, 13312 ],
		heights = [ 416, 416, 832, 1664, 3328, 6656 ];

	var gl = null;
	try{
		var canvas = document.createElement( 'canvas' );
	    gl = canvas.getContext('experimental-webgl');
	    if(gl == null){
	        gl = canvas.getContext('webgl');
	    }
	}
	catch(error){}

	var maxW = 1024,
		maxH = 1024;

	if( gl ) {
		var maxTexSize = Math.max( gl.getParameter(gl.MAX_TEXTURE_SIZE), 6656 );
		//alert( 'MAX_TEXTURE_SIZE ' + maxTexSize );
		maxW = maxH = maxTexSize;
	}
		
	this.setProgress = function (loaded, total) {
	
		if (this.onProgress) {
			this.onProgress({loaded: loaded, total: total});
		}
		
	};

	this.throwError = function (message) {
	
		if (this.onError) {
			this.onError(message);
		} else {
			console.error(message);
		}
		
	};

	this.adaptTextureToZoom = function () {
	
		var w = levelsW[ _zoom ] * 416,
			h = levelsH[ _zoom ] * 416;

		w = widths [ _zoom ];
		h = heights[ _zoom ];

		_wc = Math.ceil( w / maxW );
		_hc = Math.ceil( h / maxH );

		_canvas = []; _ctx = [];

		var ptr = 0;
		for( var y = 0; y < _hc; y++ ) {
			for( var x = 0; x < _wc; x++ ) {
				var c = document.createElement('canvas');
				if( x < ( _wc - 1 ) ) c.width = maxW; else c.width = w - ( maxW * x );
				if( y < ( _hc - 1 ) ) c.height = maxH; else c.height = h - ( maxH * y );
				_canvas.push( c );
				_ctx.push( c.getContext('2d') );
				ptr++;
			}
		}

	};

	this.composeFromTile = function (x, y, texture) {
	
		x *= 512;
		y *= 512;
		var px = Math.floor( x / maxW ), py = Math.floor( y / maxH );

		x -= px * maxW;
		y -= py * maxH;

		_ctx[ py * _wc + px ].drawImage(texture, 0, 0, texture.width, texture.height, x, y, 512, 512 );
		this.progress();
		
	}; 

	this.progress = function() {

		_count++;
		
		var p = Math.round(_count * 100 / _total);
		this.setProgress(_count, _total);
		
		if (_count === _total) {
			this.canvas = _canvas;
			this.panoId = _panoId;
			this.zoom = _zoom;
			if (this.onPanoramaLoad) {
				this.onPanoramaLoad(_canvas[0]);
			}
		}
	}

	this.loadFromId = function( id ) {

		_panoId = id;
		this.composePanorama();

	};

	this.composePanorama = function () {
	
		this.setProgress(0, 1);
		
		var w = levelsW[ _zoom ],
			h = levelsH[ _zoom ],
			self = this,
			url,
			x,
			y;
			
		_count = 0;
		_total = w * h;

		var self = this;
		for( var y = 0; y < h; y++ ) {
			for( var x = 0; x < w; x++ ) {
				var url = 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile&zoom=' + _zoom + '&x=' + x + '&y=' + y + '&panoid=' + _panoId + '&nbt&fover=2';
				( function( x, y ) { 
					if( _parameters.useWebGL ) {
						var texture = THREE.ImageUtils.loadTexture( url, null, function() {
							self.composeFromTile( x, y, texture );
						} );
					} else {
						var img = new Image();
						img.addEventListener( 'load', function() {
							self.composeFromTile( x, y, this );			
						} );
						img.crossOrigin = '';
						img.src = url;
					}
				} )( x, y );
			}
		}
		
	};
	
	this.load = function ( panoid ) {
	
		this.loadPano( panoid );

	};

	this.loadPano = function( id ) {

		var self = this;
		_panoClient.getPanoramaById( id, function (result, status) {
			if (status === google.maps.StreetViewStatus.OK) {
				self.result = result;
				if( self.onPanoramaData ) self.onPanoramaData( result );
				//var h = google.maps.geometry.spherical.computeHeading(location, result.location.latLng);
				//rotation = (result.tiles.centerHeading - h) * Math.PI / 180.0;
				copyright = result.copyright;
				self.copyright = result.copyright;
				_panoId = result.location.pano;
				self.location = location;
				self.composePanorama();
			} else {
				if( self.onNoPanoramaData ) self.onNoPanoramaData( status );
				self.throwError('Could not retrieve panorama for the following reason: ' + status);
			}
		});
		
	};
	
	this.setZoom = function( z ) {
		_zoom = z;
		this.adaptTextureToZoom();
	};

	this.setZoom( _parameters.zoom || 1 );

};;(function(){

    'use strict';

    /**
     * Data Image Source
     * @type {String}
     */
    PANOLENS.DataImageSource = 'https://pchen66.github.io/Panolens/asset/icon/';

    /**
     * Data Image
     * @memberOf PANOLENS
     * @enum {string}
     */
    PANOLENS.DataImage = {
        Info:               PANOLENS.DataImageSource + 'information.png',
        Arrow:              PANOLENS.DataImageSource + 'arrow-up.png',
        FullscreenEnter:    PANOLENS.DataImageSource + 'fullscreen.png',
        FullscreenLeave:    PANOLENS.DataImageSource + 'fullscreen-exit.png',
        VideoPlay:          PANOLENS.DataImageSource + 'video-play.png',
        VideoPause:         PANOLENS.DataImageSource + 'pause.png',
        WhiteTile:          PANOLENS.DataImageSource + 'tiles.png',
        ReticleIdle:        PANOLENS.DataImageSource + 'reticle-idle.png',
        Setting:            PANOLENS.DataImageSource + 'setting.png',
        ChevronRight:       PANOLENS.DataImageSource + 'chevron-right.png',
        Check:              PANOLENS.DataImageSource + 'check.png',
        ViewIndicator:      PANOLENS.DataImageSource + 'view-indicator.svg',
        ReticleDwell:       PANOLENS.DataImageSource + 'reticle-animation.png'
    };

})();;(function(){

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

})();;(function(){
	
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

})();;(function(){
	
	'use strict';

	/**
	 * Image loader with progress based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js}
	 * @memberOf PANOLENS.Utils
	 * @namespace
	 */
	PANOLENS.Utils.ImageLoader = {};

	/**
	 * Load an image with XMLHttpRequest to provide progress checking
	 * @param  {string}   url        - An image url
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {HTMLImageElement}    - DOM image element
	 */

	PANOLENS.Utils.ImageLoader.load = function ( url, onLoad, onProgress, onError ) {

		var cached, request, arrayBufferView, blob, urlCreator, image, reference;

		// Reference key
		for ( var iconName in PANOLENS.DataImage ) {

			if ( PANOLENS.DataImage.hasOwnProperty( iconName ) 
				&& url === PANOLENS.DataImage[ iconName ] ) {

				reference = iconName;

			}

		}

		// Cached
		cached = THREE.Cache.get( reference ? reference : url );

		if ( cached !== undefined ) {

			if ( onLoad ) {

				setTimeout( function () {

					if ( onProgress ) {

						onProgress( { loaded: 1, total: 1 } );

					} 
					
					onLoad( cached );

				}, 0 );

			}

			return cached;

		}
		
		// Construct a new XMLHttpRequest
		urlCreator = window.URL || window.webkitURL;
		image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );

		// Add to cache
		THREE.Cache.add( reference ? reference : url, image );

		function onImageLoaded () {

			urlCreator.revokeObjectURL( image.src );
			onLoad && onLoad( image );

		}

		if ( url.indexOf( 'data:' ) === 0 ) {

			image.addEventListener( 'load', onImageLoaded, false );
			image.src = url;
			return image;
		}

		image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';

		request = new XMLHttpRequest();
		request.open( 'GET', url, true );
		request.responseType = 'arraybuffer';
		request.onprogress = function ( event ) {

		    if ( event.lengthComputable ) {

		      onProgress && onProgress( { loaded: event.loaded, total: event.total } );

		    }

		};
		request.onloadend = function( event ) {

		    arrayBufferView = new Uint8Array( this.response );
		    blob = new Blob( [ arrayBufferView ] );
		    
		    image.addEventListener( 'load', onImageLoaded, false );
			image.src = urlCreator.createObjectURL( blob );

		};

		request.send(null);

	};

	// Enable cache
	THREE.Cache.enabled = true;

})();;(function(){
	
	'use strict';

	/**
	 * Texture loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js}
	 * @memberOf PANOLENS.Utils
	 * @namespace
	 */
	PANOLENS.Utils.TextureLoader = {};

	/**
	 * Load image texture
	 * @param  {string}   url        - An image url
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {THREE.Texture}   	 - Image texture
	 */
	PANOLENS.Utils.TextureLoader.load = function ( url, onLoad, onProgress, onError ) {

		var texture = new THREE.Texture(); 

		PANOLENS.Utils.ImageLoader.load( url, function ( image ) {

			texture.image = image;
			texture.needsUpdate = true;

			onLoad && onLoad( texture );

		}, onProgress, onError );

		return texture;

	};

})();;(function(){
	
	'use strict';

	/**
	 * Cube Texture Loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/CubeTextureLoader.js}
	 * @memberOf PANOLENS.Utils
	 * @namespace
	 */
	PANOLENS.Utils.CubeTextureLoader = {};

	/**
	 * Load 6 images as a cube texture
	 * @param  {array}   urls        - Array with 6 image urls
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {THREE.CubeTexture}   - Cube texture
	 */
	PANOLENS.Utils.CubeTextureLoader.load = function ( urls, onLoad, onProgress, onError ) {

		var texture, loaded, progress, all, loadings;

		texture = new THREE.CubeTexture( [] );

		loaded = 0;
		progress = {};
		all = {};

		urls.map( function ( url, index ) {

			PANOLENS.Utils.ImageLoader.load( url, function ( image ) {

				texture.images[ index ] = image;

				loaded++;

				if ( loaded === 6 ) {

					texture.needsUpdate = true;

					onLoad && onLoad( texture );

				}

			}, function ( event ) {

				progress[ index ] = { loaded: event.loaded, total: event.total };

				all.loaded = 0;
				all.total = 0;
				loadings = 0;

				for ( var i in progress ) {

					loadings++;
					all.loaded += progress[ i ].loaded;
					all.total += progress[ i ].total;

				}

				if ( loadings < 6 ) {

					all.total = all.total / loadings * 6;

				}

				onProgress && onProgress( all );

			}, onError );

		} );

		return texture;

	};

})();;/**
 * Stereographic projection shader
 * based on http://notlion.github.io/streetview-stereographic
 * @author pchen66
 */

PANOLENS.StereographicShader = {

	uniforms: {

		"tDiffuse":   { value: new THREE.Texture() },
		"resolution": { value: 1.0 },
		"transform":  { value: new THREE.Matrix4() },
		"zoom": 	  { value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = vec4( position, 1.0 );",

		"}" 

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float resolution;",
		"uniform mat4 transform;",
		"uniform float zoom;",

		"varying vec2 vUv;",

		"const float PI = 3.141592653589793;",

		"void main(){",

			"vec2 position = -1.0 +  2.0 * vUv;",

			"position *= vec2( zoom * resolution, zoom * 0.5 );",

			"float x2y2 = position.x * position.x + position.y * position.y;",
			"vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );",

			"sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );",

			"vec2 sampleUV = vec2(",
				"(atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,",
				"(asin(sphere_pnt.z) / PI + 0.5)",
			");",

			"gl_FragColor = texture2D( tDiffuse, sampleUV );",

		"}"

	].join( "\n" )

};;( function () {

	'use strict';

	/**
	 * Skeleton panorama derived from THREE.Mesh
	 * @constructor
	 * @param {THREE.Geometry} geometry - The geometry for this panorama
	 * @param {THREE.Material} material - The material for this panorama
	 */
	PANOLENS.Panorama = function ( geometry, material ) {

		THREE.Mesh.call( this );

		this.type = 'panorama';

		this.ImageQualityLow = 1;
		this.ImageQualityFair = 2;
		this.ImageQualityMedium = 3;
		this.ImageQualityHigh = 4;
		this.ImageQualitySuperHigh = 5;

		this.animationDuration = 1000;

		this.defaultInfospotSize = 350;

		this.container = undefined;

		this.loaded = false;

		this.linkedSpots = [];

		this.isInfospotVisible = false;
		
		this.linkingImageURL = undefined;
		this.linkingImageScale = undefined;

		this.geometry = geometry;

		this.material = material;
		this.material.side = THREE.DoubleSide;
		this.material.visible = false;

		this.scale.x *= -1;

		this.infospotAnimation = new TWEEN.Tween( this ).to( {}, this.animationDuration / 2 );

		this.addEventListener( 'load', this.fadeIn.bind( this ) );
		this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
		this.addEventListener( 'click', this.onClick.bind( this ) );

		this.setupTransitions();

	}

	PANOLENS.Panorama.prototype = Object.create( THREE.Mesh.prototype );

	PANOLENS.Panorama.prototype.constructor = PANOLENS.Panorama;

	/**
	 * Adding an object
	 * To counter the scale.x = -1, it will automatically add an 
	 * empty object with inverted scale on x
	 * @param {THREE.Object3D} object - The object to be added
	 */
	PANOLENS.Panorama.prototype.add = function ( object ) {

		var scope, invertedObject;

		scope = this;

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		// In case of infospots
		if ( object instanceof PANOLENS.Infospot ) {

			invertedObject = object;

			if ( object.dispatchEvent ) {

				this.container && object.dispatchEvent( { type: 'panolens-container', container: this.container } );
				
				object.dispatchEvent( { type: 'panolens-infospot-focus', method: function ( vector, duration, easing ) {

					/**
		        	 * Infospot focus handler event
		        	 * @type {object}
		        	 * @event PANOLENS.Panorama#panolens-viewer-handler
		        	 * @property {string} method - Viewer function name
		        	 * @property {*} data - The argument to be passed into the method
		        	 */
		        	scope.dispatchEvent( { type : 'panolens-viewer-handler', method: 'tweenControlCenter', data: [ vector, duration, easing ] } );


				} } );
			}

		} else {

			// Counter scale.x = -1 effect
			invertedObject = new THREE.Object3D();
			invertedObject.scale.x = -1;
			invertedObject.scalePlaceHolder = true;
			invertedObject.add( object );

		}

		THREE.Object3D.prototype.add.call( this, invertedObject );

	};

	PANOLENS.Panorama.prototype.load = function () {

		this.onLoad();
		
	};

	/**
	 * Click event handler
	 * @param  {object} event - Click event
	 * @fires PANOLENS.Infospot#dismiss
	 */
	PANOLENS.Panorama.prototype.onClick = function ( event ) {

		if ( event.intersects && event.intersects.length === 0 ) {

			this.traverse( function ( object ) {

				/**
				 * Dimiss event
				 * @type {object}
				 * @event PANOLENS.Infospot#dismiss
				 */
				object.dispatchEvent( { type: 'dismiss' } );

			} );

		}

	};

	/**
	 * Set container of this panorama 
	 * @param {HTMLElement|object} data - Data with container information
	 * @fires PANOLENS.Infospot#panolens-container
	 */
	PANOLENS.Panorama.prototype.setContainer = function ( data ) {

		var container;

		if ( data instanceof HTMLElement ) {

			container = data;

		} else if ( data && data.container ) {

			container = data.container;

		}

		if ( container ) {

			this.children.forEach( function ( child ) {

				if ( child instanceof PANOLENS.Infospot && child.dispatchEvent ) {

					/**
					 * Set container event
					 * @type {object}
					 * @event PANOLENS.Infospot#panolens-container
					 * @property {HTMLElement} container - The container of this panorama
					 */
					child.dispatchEvent( { type: 'panolens-container', container: container } );

				}

			} );

			this.container = container;

		}
		

	};

	/**
	 * This will be called when panorama is loaded
	 * @fires PANOLENS.Panorama#load
	 */
	PANOLENS.Panorama.prototype.onLoad = function () {

		this.loaded = true;

		/**
		 * Load panorama event
		 * @type {object}
		 * @event PANOLENS.Panorama#load
		 */
		this.dispatchEvent( { type: 'load' } );

	};

	/**
	 * This will be called when panorama is in progress
	 * @fires PANOLENS.Panorama#progress
	 */
	PANOLENS.Panorama.prototype.onProgress = function ( progress ) {

		/**
		 * Loading panorama progress event
		 * @type {object}
		 * @event PANOLENS.Panorama#progress
	 	 * @property {object} progress - The progress object containing loaded and total amount
		 */
		this.dispatchEvent( { type: 'progress', progress: progress } );

	};

	/**
	 * This will be called when panorama loading has error
	 * @fires PANOLENS.Panorama#error
	 */
	PANOLENS.Panorama.prototype.onError = function () {

		/**
		 * Loading panorama error event
		 * @type {object}
		 * @event PANOLENS.Panorama#error
		 */
		this.dispatchEvent( { type: 'error' } );

	};

	/**
	 * Get zoom level based on window width
	 * @return {number} zoom level indicating image quality
	 */
	PANOLENS.Panorama.prototype.getZoomLevel = function () {

		var zoomLevel;

		if ( window.innerWidth <= 800 ) {

			zoomLevel = this.ImageQualityFair;

		} else if ( window.innerWidth > 800 &&  window.innerWidth <= 1280 ) {

			zoomLevel = this.ImageQualityMedium;

		} else if ( window.innerWidth > 1280 && window.innerWidth <= 1920 ) {

			zoomLevel = this.ImageQualityHigh;

		} else if ( window.innerWidth > 1920 ) {

			zoomLevel = this.ImageQualitySuperHigh;

		} else {

			zoomLevel = this.ImageQualityLow;

		}

		return zoomLevel;

	};

	/**
	 * Update texture of a panorama
	 * @param {THREE.Texture} texture - Texture to be updated
	 */
	PANOLENS.Panorama.prototype.updateTexture = function ( texture ) {

		this.material.map = texture;

		this.material.needsUpdate = true;

	};

	/**
	 * Toggle visibility of infospots in this panorama
	 * @param  {boolean} isVisible - Visibility of infospots
	 * @param  {number} delay - Delay in milliseconds to change visibility
	 * @fires PANOLENS.Panorama#infospot-animation-complete
	 */
	PANOLENS.Panorama.prototype.toggleInfospotVisibility = function ( isVisible, delay ) {

		delay = ( delay !== undefined ) ? delay : 0;

		var scope, visible;

		scope = this;
		visible = ( isVisible !== undefined ) ? isVisible : ( this.isInfospotVisible ? false : true );

		this.traverse( function ( object ) {

			if ( object instanceof PANOLENS.Infospot ) {

				visible ? object.show( delay ) : object.hide( delay );

			}

		} );

		this.isInfospotVisible = visible;

		// Animation complete event
		this.infospotAnimation.onComplete( function () {

			/**
			 * Complete toggling infospot visibility
			 * @event PANOLENS.Panorama#infospot-animation-complete
			 * @type {object} 
			 */
			scope.dispatchEvent( { type : 'infospot-animation-complete', visible: visible } );

		} ).delay( delay ).start();

	};

	/**
	 * Set image of this panorama's linking infospot
	 * @param {string} url   - Url to the image asset
	 * @param {number} scale - Scale factor of the infospot
	 */
	PANOLENS.Panorama.prototype.setLinkingImage = function ( url, scale ) {

		this.linkingImageURL = url;
		this.linkingImageScale = scale;

	};

	/**
	 * Link one-way panorama
	 * @param  {PANOLENS.Panorama} pano  - The panorama to be linked to
	 * @param  {THREE.Vector3} position - The position of infospot which navigates to the pano
	 * @param  {number} [imageScale=300] - Image scale of linked infospot
	 * @param  {string} [imageSrc=PANOLENS.DataImage.Arrow] - The image source of linked infospot
	 */
	PANOLENS.Panorama.prototype.link = function ( pano, position, imageScale, imageSrc ) {

		var scope = this, spot, scale, img;

		this.visible = true;

		if ( !position ) {

			console.warn( 'Please specify infospot position for linking' );

			return;

		}

		// Infospot scale
		if ( imageScale !== undefined ) {

			scale = imageScale;

		} else if ( pano.linkingImageScale !== undefined ) {

			scale = pano.linkingImageScale;

		} else {

			scale = 300;

		}


		// Infospot image
		if ( imageSrc ) {

			img = imageSrc

		} else if ( pano.linkingImageURL ) {

			img = pano.linkingImageURL;

		} else {

			img = PANOLENS.DataImage.Arrow;

		}

		// Creates a new infospot
		spot = new PANOLENS.Infospot( scale, img );
        spot.position.copy( position );
        spot.toPanorama = pano;
        spot.addEventListener( 'click', function () {

        	/**
        	 * Viewer handler event
        	 * @type {object}
        	 * @event PANOLENS.Panorama#panolens-viewer-handler
        	 * @property {string} method - Viewer function name
        	 * @property {*} data - The argument to be passed into the method
        	 */
        	scope.dispatchEvent( { type : 'panolens-viewer-handler', method: 'setPanorama', data: pano } );

        } );

        this.linkedSpots.push( spot );

        this.add( spot );

        this.visible = false;

	};

	PANOLENS.Panorama.prototype.reset = function () {

		this.children.length = 0;	

	};

	PANOLENS.Panorama.prototype.setupTransitions = function () {

		this.fadeInAnimation = new TWEEN.Tween( this.material )
			.easing( TWEEN.Easing.Quartic.Out )
			.onStart( function () {

				this.visible = true;
				this.material.visible = true;

				/**
				 * Enter panorama fade in start event
				 * @event PANOLENS.Panorama#enter-fade-start
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-fade-start' } );

			}.bind( this ) );

		this.fadeOutAnimation = new TWEEN.Tween( this.material )
			.easing( TWEEN.Easing.Quartic.Out )
			.onComplete( function () {

				this.visible = false;
				this.material.visible = true;

				/**
				 * Leave panorama complete event
				 * @event PANOLENS.Panorama#leave-complete
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'leave-complete' } );

			}.bind( this ) );

		this.enterTransition = new TWEEN.Tween( this )
			.easing( TWEEN.Easing.Quartic.Out )
			.onComplete( function () {

				/**
				 * Enter panorama and animation complete event
				 * @event PANOLENS.Panorama#enter-animation-complete
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-animation-complete' } );

			}.bind ( this ) )
			.start();

		this.leaveTransition = new TWEEN.Tween( this )
			.easing( TWEEN.Easing.Quartic.Out );

	};

	/**
	 * Start fading in animation
	 * @fires PANOLENS.Panorama#enter-fade-complete
	 */
	PANOLENS.Panorama.prototype.fadeIn = function ( duration ) {

		duration = duration >= 0 ? duration : this.animationDuration;

		this.fadeOutAnimation.stop();
		this.fadeInAnimation
		.to( { opacity: 1 }, duration )
		.onComplete( function () {

				this.toggleInfospotVisibility( true, duration / 2 );

				/**
				 * Enter panorama fade complete event
				 * @event PANOLENS.Panorama#enter-fade-complete
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-fade-complete' } );			

			}.bind( this ) )
		.start();

	};

	/**
	 * Start fading out animation
	 */
	PANOLENS.Panorama.prototype.fadeOut = function ( duration ) {

		duration = duration >= 0 ? duration : this.animationDuration;

		this.fadeInAnimation.stop();
		this.fadeOutAnimation.to( { opacity: 0 }, duration ).start();

	};

	/**
	 * This will be called when entering a panorama 
	 * @fires PANOLENS.Panorama#enter
	 * @fires PANOLENS.Panorama#enter-animation-start
	 */
	PANOLENS.Panorama.prototype.onEnter = function () {

		var duration = this.animationDuration;

		this.leaveTransition.stop();
		this.enterTransition
			.to( {}, duration )
			.onStart( function () {

				/**
				 * Enter panorama and animation starting event
				 * @event PANOLENS.Panorama#enter-animation-start
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-animation-start' } );
				
				if ( this.loaded ) {

					this.fadeIn( duration );

				} else {

					this.load();

				}
				
			}.bind( this ) )
			.start();

		/**
		 * Enter panorama event
		 * @event PANOLENS.Panorama#enter
		 * @type {object} 
		 */
		this.dispatchEvent( { type: 'enter' } );

	};

	/**
	 * This will be called when leaving a panorama
	 * @fires PANOLENS.Panorama#leave
	 */
	PANOLENS.Panorama.prototype.onLeave = function () {

		var duration = this.animationDuration;

		this.enterTransition.stop();
		this.leaveTransition
			.to( {}, duration )
			.onStart( function () {

				/**
				 * Leave panorama and animation starting event
				 * @event PANOLENS.Panorama#leave-animation-start
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'leave-animation-start' } );

				this.fadeOut( duration );
				this.toggleInfospotVisibility( false );

			}.bind( this ) )
			.start();

		/**
		 * Leave panorama event
		 * @event PANOLENS.Panorama#leave
		 * @type {object} 
		 */
		this.dispatchEvent( { type: 'leave' } );

	};

	/**
	 * Dispose panorama
	 */
	PANOLENS.Panorama.prototype.dispose = function () {

		/**
    	 * On panorama dispose handler
    	 * @type {object}
    	 * @event PANOLENS.Panorama#panolens-viewer-handler
    	 * @property {string} method - Viewer function name
    	 * @property {*} data - The argument to be passed into the method
    	 */
    	this.dispatchEvent( { type : 'panolens-viewer-handler', method: 'onPanoramaDispose', data: this } );

		// recursive disposal on 3d objects
		function recursiveDispose ( object ) {

			for ( var i = object.children.length - 1; i >= 0; i-- ) {

				recursiveDispose( object.children[i] );
				object.remove( object.children[i] );

			}

			if ( object instanceof PANOLENS.Infospot ) {

				object.dispose();

			}
			
			object.geometry && object.geometry.dispose();
			object.material && object.material.dispose();
		}

		recursiveDispose( this );

		if ( this.parent ) {

			this.parent.remove( this );

		}

	};

} )();;(function(){
	
	'use strict';
	
	/**
	 * Equirectangular based image panorama
	 * @constructor
	 * @param {string} image - Image url or HTMLImageElement
	 * @param {number} [radius=5000] - Radius of panorama
	 */
	PANOLENS.ImagePanorama = function ( image, radius ) {

		radius = radius || 5000;

		var geometry = new THREE.SphereGeometry( radius, 60, 40 ),
			material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

		PANOLENS.Panorama.call( this, geometry, material );

		this.src = image;

	}

	PANOLENS.ImagePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.ImagePanorama.prototype.constructor = PANOLENS.ImagePanorama;

	/**
	 * Load image asset
	 * @param  {*} src - Url or image element
	 */
	PANOLENS.ImagePanorama.prototype.load = function ( src ) {

		src = src || this.src;

		if ( !src ) { 

			console.warn( 'Image source undefined' );

			return; 

		} else if ( typeof src === 'string' ) {

			PANOLENS.Utils.TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

		} else if ( src instanceof HTMLImageElement ) {

			this.onLoad( new THREE.Texture( src ) );

		}

	};

	/**
	 * This will be called when image is loaded
	 * @param  {THREE.Texture} texture - Texture to be updated
	 */
	PANOLENS.ImagePanorama.prototype.onLoad = function ( texture ) {

		texture.minFilter = texture.magFilter = THREE.LinearFilter;

		texture.needsUpdate = true;

		this.updateTexture( texture );

		// Call onLoad after second frame being painted
		window.requestAnimationFrame(function(){

			window.requestAnimationFrame(function(){

				PANOLENS.Panorama.prototype.onLoad.call( this );
				

			}.bind(this));

		}.bind(this));

		

	};

	PANOLENS.ImagePanorama.prototype.reset = function () {

		PANOLENS.Panorama.prototype.reset.call( this );

	};

})();;(function(){

	'use strict';
	
	/**
	 * Google streetview panorama
	 * 
	 * [How to get Panorama ID]{@link http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id}
	 * @constructor
	 * @param {string} panoId - Panorama id from Google Streetview 
	 * @param {number} [radius=5000] - The minimum radius for this panoram
	 */
	PANOLENS.GoogleStreetviewPanorama = function ( panoId, radius ) {

		PANOLENS.ImagePanorama.call( this, undefined, radius );

		this.panoId = panoId;

		this.gsvLoader = undefined;

		this.loadRequested = false;

		this.setupGoogleMapAPI();

	}

	PANOLENS.GoogleStreetviewPanorama.prototype = Object.create( PANOLENS.ImagePanorama.prototype );

	PANOLENS.GoogleStreetviewPanorama.constructor = PANOLENS.GoogleStreetviewPanorama;

	/**
	 * Load Google Street View by panorama id
	 * @param {string} panoId - Gogogle Street View panorama id
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.load = function ( panoId ) {

		this.loadRequested = true;

		panoId = ( panoId || this.panoId ) || {};

		if ( panoId && this.gsvLoader ) {

			this.loadGSVLoader( panoId );

		} else {

			this.gsvLoader = {};

		}

	};

	/**
	 * Setup Google Map API
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.setupGoogleMapAPI = function () {

		var script = document.createElement( 'script' );
		script.src = 'https://maps.googleapis.com/maps/api/js';
		script.onreadystatechange = this.setGSVLoader.bind( this );
    	script.onload = this.setGSVLoader.bind( this );

		document.getElementsByTagName('head')[0].appendChild( script );

	};

	/**
	 * Set GSV Loader
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.setGSVLoader = function () {

		this.gsvLoader = new GSVPANO.PanoLoader();

		if ( this.gsvLoader === {} || this.loadRequested ) {

			this.load();

		}

	};

	/**
	 * Get GSV Loader
	 * @return {object} GSV Loader instance
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.getGSVLoader = function () {

		return this.gsvLoader;

	};

	/**
	 * Load GSV Loader
	 * @param  {string} panoId - Gogogle Street View panorama id
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.loadGSVLoader = function ( panoId ) {

		this.loadRequested = false;

		this.gsvLoader.onProgress = this.onProgress.bind( this );

		this.gsvLoader.onPanoramaLoad = this.onLoad.bind( this );

		this.gsvLoader.setZoom( this.getZoomLevel() );

		this.gsvLoader.load( panoId );

		this.gsvLoader.loaded = true;
	};

	/**
	 * This will be called when panorama is loaded
	 * @param  {HTMLCanvasElement} canvas - Canvas where the tiles have been drawn
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.onLoad = function ( canvas ) {

		if ( !this.gsvLoader ) { return; }

		PANOLENS.ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.reset = function () {

		this.gsvLoader = undefined;

		PANOLENS.ImagePanorama.prototype.reset.call( this );

	};

})();;(function(){
	
	'use strict';
	
	/**
	 * Cubemap-based panorama
	 * @constructor
	 * @param {array} images - An array of cubetexture containing six images
	 * @param {number} [edgeLength=10000] - The length of cube's edge
	 */
	PANOLENS.CubePanorama = function ( images, edgeLength ){

		var shader, geometry, material;

		this.images = images || [];

		edgeLength = edgeLength || 10000;
		shader = JSON.parse( JSON.stringify( THREE.ShaderLib[ 'cube' ] ) );

		geometry = new THREE.BoxGeometry( edgeLength, edgeLength, edgeLength );
		material = new THREE.ShaderMaterial( {

			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			side: THREE.BackSide

		} );

		PANOLENS.Panorama.call( this, geometry, material );

	}

	PANOLENS.CubePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.CubePanorama.prototype.constructor = PANOLENS.CubePanorama;

	/**
	 * Load 6 images and bind listeners
	 */
	PANOLENS.CubePanorama.prototype.load = function () {

		PANOLENS.Utils.CubeTextureLoader.load( 	

			this.images, 

			this.onLoad.bind( this ), 
			this.onProgress.bind( this ), 
			this.onError.bind( this ) 

		);

	};

	/**
	 * This will be called when 6 textures are ready
	 * @param  {THREE.CubeTexture} texture - Cube texture
	 */
	PANOLENS.CubePanorama.prototype.onLoad = function ( texture ) {
		
		this.material.uniforms[ 'tCube' ].value = texture;

		PANOLENS.Panorama.prototype.onLoad.call( this );

	};

})();;(function(){

	'use strict';

	/**
	 * Basic panorama with 6 faces tile images
	 * @constructor
	 * @param {number} [edgeLength=10000] - The length of cube's edge
	 */
	PANOLENS.BasicPanorama = function ( edgeLength ) {
		
		var tile = PANOLENS.DataImage.WhiteTile;

		PANOLENS.CubePanorama.call( this, [ tile, tile, tile, tile, tile, tile ], edgeLength );

	}

	PANOLENS.BasicPanorama.prototype = Object.create( PANOLENS.CubePanorama.prototype );

	PANOLENS.BasicPanorama.prototype.constructor = PANOLENS.BasicPanorama;

})();;(function(){

	'use strict';

	/**
	 * Video Panorama
	 * @constructor
	 * @param {string} src - Equirectangular video url
	 * @param {object} [options] - Option for video settings
	 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
	 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
	 * @param {boolean} [options.muted=false] - Mute the video or not
	 * @param {boolean} [options.autoplay=false] - Specify if the video should auto play
	 * @param {boolean} [options.playsinline=true] - Specify if video should play inline for iOS. If you want it to auto play inline, set both autoplay and muted options to true
	 * @param {string} [options.crossOrigin="anonymous"] - Sets the cross-origin attribute for the video, which allows for cross-origin videos in some browsers (Firefox, Chrome). Set to either "anonymous" or "use-credentials".
	 * @param {number} [radius=5000] - The minimum radius for this panoram
	 */
	PANOLENS.VideoPanorama = function ( src, options, radius ) {

		radius = radius || 5000;

		var geometry = new THREE.SphereGeometry( radius, 60, 40 ),
			material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

		PANOLENS.Panorama.call( this, geometry, material );

		this.src = src;
		this.options = options || {};
		this.options.playsinline = this.options.playsinline !== false ? true : false;

		this.videoElement = undefined;
		this.videoRenderObject = undefined;
		this.videoProgress = 0;

		this.isIOS = /iPhone|iPad|iPod/i.test( navigator.userAgent );
		this.isMobile = this.isIOS || /Android|BlackBerry|Opera Mini|IEMobile/i.test( navigator.userAgent );

		this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.addEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
		this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	};

	PANOLENS.VideoPanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.VideoPanorama.constructor = PANOLENS.VideoPanorama;

	/**
	 * Load video panorama
	 * @param  {string} src     - The video url
	 * @param  {object} options - Option object containing videoElement
	 * @fires  PANOLENS.Panorama#panolens-viewer-handler
	 */
	PANOLENS.VideoPanorama.prototype.load = function ( src, options ) {

		var scope = this;

		src = ( src || this.src ) || '';
		options = ( options || this.options ) || {};

		this.videoElement = options.videoElement || document.createElement( 'video' );

		this.videoElement.muted = options.muted || false;
		this.videoElement.loop = ( options.loop !== undefined ) ? options.loop : true;
		this.videoElement.autoplay = ( options.autoplay !== undefined ) ? options.autoplay : false;
		this.videoElement.crossOrigin = ( options.crossOrigin !== undefined ) ? options.crossOrigin : "anonymous";
		
		// iphone inline player
		if (options.playsinline) {
			this.videoElement.setAttribute( "playsinline", "" );
			this.videoElement.setAttribute( "webkit-playsinline", "" );
		} 

		var onloadeddata = function(){

			scope.onProgress( { loaded: 1, total: 1 } );
			scope.setVideoTexture( scope.videoElement );

			if ( scope.videoElement.autoplay ) {

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'updateVideoPlayButton'
				 * @property {boolean} data - Pause video or not
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

			}

			// For mobile silent autoplay
			if ( scope.isMobile ) {

				if ( scope.videoElement.autoplay && scope.videoElement.muted ) {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 */
					scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

				} else {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 */
					scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

				}
				
			}

			scope.onLoad();
		};

		/**
		 * Ready state of the audio/video element
		 * 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
		 * 1 = HAVE_METADATA - metadata for the audio/video is ready
		 * 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
		 * 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
		 * 4 = HAVE_ENOUGH_DATA - enough data available to start playing
		 */
		if ( this.videoElement.readyState > 2 ) {

			onloadeddata();

		} else {

			if ( !this.videoElement.querySelectorAll('source').length || !this.videoElement.src ) {

				this.videoElement.src =  src;

			}

			this.videoElement.load();
		}

		this.videoElement.onloadeddata = onloadeddata;
		

		this.videoElement.ontimeupdate = function ( event ) {

			scope.videoProgress = this.duration >= 0 ? this.currentTime / this.duration : 0;

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onVideoUpdate'
			 * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: scope.videoProgress } );

		};

		this.videoElement.addEventListener( 'ended', function () {
			
			if ( !scope.options.loop ) {

				scope.resetVideo();
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

			}

		}, false ); 

	};

	/**
	 * Set video texture
	 * @param {HTMLVideoElement} video  - The html5 video element
	 * @fires PANOLENS.Panorama#panolens-viewer-handler
	 */
	PANOLENS.VideoPanorama.prototype.setVideoTexture = function ( video ) {

		var videoTexture, videoRenderObject, scene;

		if ( !video ) return;

		videoTexture = new THREE.VideoTexture( video );
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.format = THREE.RGBFormat;

		videoRenderObject = {

			video : video,
			videoTexture: videoTexture

		};

		if ( this.isIOS ){

			enableInlineVideo( video );

		}

		this.updateTexture( videoTexture );

		this.videoRenderObject = videoRenderObject;
	
	};

	PANOLENS.VideoPanorama.prototype.reset = function () {

		this.videoElement = undefined;	

		PANOLENS.Panorama.prototype.reset.call( this );

	};

	/**
	 * Check if video is paused
	 * @return {boolean} - is video paused or not
	 */
	PANOLENS.VideoPanorama.prototype.isVideoPaused = function () {

		return this.videoRenderObject.video.paused;

	};

	/**
	 * Toggle video to play or pause
	 */
	PANOLENS.VideoPanorama.prototype.toggleVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			if ( this.isVideoPaused() ) {

				this.videoRenderObject.video.play();


			} else {

				this.videoRenderObject.video.pause();

			}

		}

	};

	/**
	 * Set video currentTime
	 * @param {object} event - Event contains percentage. Range from 0.0 to 1.0
	 */
	PANOLENS.VideoPanorama.prototype.setVideoCurrentTime = function ( event ) {

		if ( this.videoRenderObject && this.videoRenderObject.video && !Number.isNaN(event.percentage) && event.percentage !== 1 ) {

			this.videoRenderObject.video.currentTime = this.videoRenderObject.video.duration * event.percentage;

			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: event.percentage } );

		}

	};

	/**
	 * Play video
	 */
	PANOLENS.VideoPanorama.prototype.playVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && this.isVideoPaused() ) {

			this.videoRenderObject.video.play();

		}

		/**
		 * Play event
		 * @type {object}
		 * @event 'play'
		 * */
		this.dispatchEvent( { type: 'play' } );

	};

	/**
	 * Pause video
	 */
	PANOLENS.VideoPanorama.prototype.pauseVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && !this.isVideoPaused() ) {

			this.videoRenderObject.video.pause();

		}

		/**
		 * Pause event
		 * @type {object}
		 * @event 'pause'
		 * */
		this.dispatchEvent( { type: 'pause' } );

	};

	/**
	 * Resume video
	 */
	PANOLENS.VideoPanorama.prototype.resumeVideoProgress = function () {

		if ( this.videoElement.autoplay && !this.isMobile ) {

			this.playVideo();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'updateVideoPlayButton'
			 * @property {boolean} data - Pause video or not
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

		} else {

			this.pauseVideo();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'updateVideoPlayButton'
			 * @property {boolean} data - Pause video or not
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

		}

		this.setVideoCurrentTime( { percentage: this.videoProgress } );

	};

	/**
	 * Reset video at stating point
	 */
	PANOLENS.VideoPanorama.prototype.resetVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			this.setVideoCurrentTime( { percentage: 0 } );

		}

	};

	/**
	* Check if video is muted
	* @return {boolean} - is video muted or not
	*/
	PANOLENS.VideoPanorama.prototype.isVideoMuted = function () {

		return this.videoRenderObject.video.muted;

	};

	/**
	 * Mute video
	 */
	PANOLENS.VideoPanorama.prototype.muteVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && !this.isVideoMuted() ) {

			this.videoRenderObject.video.muted = true;

		}

		this.dispatchEvent( { type: 'volumechange' } );

	};

	/**
	 * Unmute video
	 */
	PANOLENS.VideoPanorama.prototype.unmuteVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && this.isVideoMuted() ) {

			this.videoRenderObject.video.muted = false;

		}

		this.dispatchEvent( { type: 'volumechange' } );

	};

	/**
	 * Returns the video element
	 */
	PANOLENS.VideoPanorama.prototype.getVideoElement = function () {

		return this.videoRenderObject.video;

	};

	/**
	 * Dispose video panorama
	 */
	PANOLENS.VideoPanorama.prototype.dispose = function () {

		this.resetVideo();
		this.pauseVideo();
		
		this.removeEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.removeEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
		this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

		PANOLENS.Panorama.prototype.dispose.call( this );

	};

})();;(function(){

	'use strict';

	/**
	 * Empty panorama
	 * @constructor
	 * @param {number} [radius=5000] - Radius of panorama
	 */
	PANOLENS.EmptyPanorama = function ( radius ) {

		radius = radius || 5000;

		var geometry = new THREE.Geometry(),
			material = new THREE.MeshBasicMaterial( { 
				color: 0x000000, opacity: 1, transparent: true 
			} );

		PANOLENS.Panorama.call( this, geometry, material );

	}

	PANOLENS.EmptyPanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.EmptyPanorama.prototype.constructor = PANOLENS.EmptyPanorama;

})();;( function () {

	/**
	 * Little Planet
	 * @constructor
	 * @param {string} type 		- Type of little planet basic class
	 * @param {string} source 		- URL for the image source
	 * @param {number} [size=10000] - Size of plane geometry
	 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
	 */
	PANOLENS.LittlePlanet = function ( type, source, size, ratio ) {

		type = type || 'image';

		type === 'image' && PANOLENS.ImagePanorama.call( this, source, size );

		this.size = size || 10000;
		this.ratio = ratio || 0.5;
		this.EPS = 0.000001;
		this.frameId;

		this.geometry = this.createGeometry();
		this.material = this.createMaterial( this.size );

		this.dragging = false;
		this.userMouse = new THREE.Vector2();

		this.quatA = new THREE.Quaternion();
		this.quatB = new THREE.Quaternion();
		this.quatCur = new THREE.Quaternion();
		this.quatSlerp = new THREE.Quaternion();

		this.vectorX = new THREE.Vector3( 1, 0, 0 );
		this.vectorY = new THREE.Vector3( 0, 1, 0 );

		this.addEventListener( 'window-resize', this.onWindowResize );

	};

	PANOLENS.LittlePlanet.prototype = Object.create( PANOLENS.ImagePanorama.prototype );

	PANOLENS.LittlePlanet.prototype.constructor = PANOLENS.LittlePlanet;

	PANOLENS.LittlePlanet.prototype.createGeometry = function () {

		return new THREE.PlaneGeometry( this.size, this.size * this.ratio );

	};

	PANOLENS.LittlePlanet.prototype.createMaterial = function ( size ) {

		var uniforms = PANOLENS.StereographicShader.uniforms;
		uniforms.zoom.value = size;

		return new THREE.ShaderMaterial( {

			uniforms: uniforms,
			vertexShader: PANOLENS.StereographicShader.vertexShader,
			fragmentShader: PANOLENS.StereographicShader.fragmentShader

		} );
		
	};

	PANOLENS.LittlePlanet.prototype.registerMouseEvents = function () {

		this.container.addEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
		this.container.addEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
		this.container.addEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
		this.container.addEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
		this.container.addEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
		this.container.addEventListener( 'touchend', this.onMouseUp.bind( this ), false );
		this.container.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
		this.container.addEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
		this.container.addEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
		
	};

	PANOLENS.LittlePlanet.prototype.unregisterMouseEvents = function () {

		this.container.removeEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
		this.container.removeEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
		this.container.removeEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
		this.container.removeEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
		this.container.removeEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
		this.container.removeEventListener( 'touchend', this.onMouseUp.bind( this ), false );
		this.container.removeEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
		this.container.removeEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
		this.container.removeEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
		
	};

	PANOLENS.LittlePlanet.prototype.onMouseDown = function ( event ) {

		var x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
		var y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

		var inputCount = ( event.touches && event.touches.length ) || 1 ;

		switch ( inputCount ) {

			case 1:

				this.dragging = true;
				this.userMouse.set( x, y );

				break;

			case 2:

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );
				this.userMouse.pinchDistance = distance;

				break;

			default:

				break;

		}

		this.onUpdateCallback();

	};

	PANOLENS.LittlePlanet.prototype.onMouseMove = function ( event ) {

		var x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
		var y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

		var inputCount = ( event.touches && event.touches.length ) || 1 ;

		switch ( inputCount ) {

			case 1:

				var angleX = THREE.Math.degToRad( x - this.userMouse.x ) * 0.4;
				var angleY = THREE.Math.degToRad( y - this.userMouse.y ) * 0.4;

				if ( this.dragging ) {
					this.quatA.setFromAxisAngle( this.vectorY, angleX );
					this.quatB.setFromAxisAngle( this.vectorX, angleY );
					this.quatCur.multiply( this.quatA ).multiply( this.quatB );
					this.userMouse.set( x, y );
				}

				break;

			case 2:

				var uniforms = this.material.uniforms;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				this.addZoomDelta( this.userMouse.pinchDistance - distance );

				break;

			default:

				break;

		}

	};

	PANOLENS.LittlePlanet.prototype.onMouseUp = function ( event ) {

		this.dragging = false;

	};

	PANOLENS.LittlePlanet.prototype.onMouseWheel = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}

		this.addZoomDelta( delta );
		this.onUpdateCallback();

	};

	PANOLENS.LittlePlanet.prototype.addZoomDelta = function ( delta ) {

		var uniforms = this.material.uniforms;
		var lowerBound = this.size * 0.1;
		var upperBound = this.size * 10;

		uniforms.zoom.value += delta;

		if ( uniforms.zoom.value <= lowerBound ) {

			uniforms.zoom.value = lowerBound;

		} else if ( uniforms.zoom.value >= upperBound ) {

			uniforms.zoom.value = upperBound;

		}

	};

	PANOLENS.LittlePlanet.prototype.onUpdateCallback = function () {

		this.frameId = window.requestAnimationFrame( this.onUpdateCallback.bind( this ) );
		
		this.quatSlerp.slerp( this.quatCur, 0.1 );
		this.material.uniforms.transform.value.makeRotationFromQuaternion( this.quatSlerp );
		
		if ( !this.dragging && 1.0 - this.quatSlerp.clone().dot( this.quatCur ) < this.EPS ) {
			
			window.cancelAnimationFrame( this.frameId );

		}

	};

	PANOLENS.LittlePlanet.prototype.reset = function () {

		this.quatCur.set( 0, 0, 0, 1 );
		this.quatSlerp.set( 0, 0, 0, 1 );
		this.onUpdateCallback();

	};

	PANOLENS.LittlePlanet.prototype.onLoad = function () {

		this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

		this.registerMouseEvents();
		this.onUpdateCallback();
		
		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' } );
		
	};

	PANOLENS.LittlePlanet.prototype.onLeave = function () {

		this.unregisterMouseEvents();

		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: PANOLENS.Controls.ORBIT } );

		window.cancelAnimationFrame( this.frameId );

		PANOLENS.Panorama.prototype.onLeave.call( this );
		
	};

	PANOLENS.LittlePlanet.prototype.onWindowResize = function () {

		this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

	};

	PANOLENS.LittlePlanet.prototype.onContextMenu = function () {

		this.dragging = false;

	};

})();;( function () {

	/**
	 * Image Little Planet
	 * @constructor
	 * @param {string} source 		- URL for the image source
	 * @param {number} [size=10000] - Size of plane geometry
	 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
	 */
	PANOLENS.ImageLittlePlanet = function ( source, size, ratio ) {

		PANOLENS.LittlePlanet.call( this, 'image', source, size, ratio );

	};

	PANOLENS.ImageLittlePlanet.prototype = Object.create( PANOLENS.LittlePlanet.prototype );
	
	PANOLENS.ImageLittlePlanet.prototype.constructor = PANOLENS.ImageLittlePlanet;

	PANOLENS.ImageLittlePlanet.prototype.onLoad = function ( texture ) {

		this.updateTexture( texture );

		PANOLENS.ImagePanorama.prototype.onLoad.call( this, texture );
		PANOLENS.LittlePlanet.prototype.onLoad.call( this );

	};

	PANOLENS.ImageLittlePlanet.prototype.updateTexture = function ( texture ) {

		texture.minFilter = texture.magFilter = THREE.LinearFilter;
		
		this.material.uniforms[ "tDiffuse" ].value = texture;

	};

} )();;(function(){
	
	/**
	 * Reticle 3D Sprite
	 * @constructor
	 * @param {THREE.Color} [color=0xfffff] - Color of the reticle sprite
	 * @param {boolean} [autoSelect=true] - Auto selection
	 * @param {string} [idleImageUrl=PANOLENS.DataImage.ReticleIdle] - Image asset url
	 * @param {string} [dwellImageUrl=PANOLENS.DataImage.ReticleDwell] - Image asset url
	 * @param {number} [dwellTime=1500] - Duration for dwelling sequence to complete
	 * @param {number} [dwellSpriteAmount=45] - Number of dwelling sprite sequence
	 */
	PANOLENS.Reticle = function ( color, autoSelect, idleImageUrl, dwellImageUrl, dwellTime, dwellSpriteAmount ) {

		color = color || 0xffffff;

		this.autoSelect = autoSelect != undefined ? autoSelect : true;

		this.dwellTime = dwellTime || 1500;
		this.dwellSpriteAmount = dwellSpriteAmount || 45;
		this.dwellInterval = this.dwellTime / this.dwellSpriteAmount;

		this.IDLE = 0;
		this.DWELLING = 1;
		this.status;

		this.scaleIdle = new THREE.Vector3( 0.2, 0.2, 1 );
		this.scaleDwell = new THREE.Vector3( 1, 0.8, 1 );

		this.textureLoaded = false;
		this.idleImageUrl = idleImageUrl || PANOLENS.DataImage.ReticleIdle;
		this.dwellImageUrl = dwellImageUrl || PANOLENS.DataImage.ReticleDwell;
		this.idleTexture = new THREE.Texture();
		this.dwellTexture = new THREE.Texture();

		THREE.Sprite.call( this, new THREE.SpriteMaterial( { color: color, depthTest: false } ) );

		this.currentTile = 0;
		this.startTime = 0;

		this.visible = false;
		this.renderOrder = 10;
		this.timerId;

		// initial update
		this.updateStatus( this.IDLE );

	};

	PANOLENS.Reticle.prototype = Object.create( THREE.Sprite.prototype );

	PANOLENS.Reticle.prototype.constructor = PANOLENS.Reticle;

	/**
	 * Make reticle visible
	 */
	PANOLENS.Reticle.prototype.show = function () {

		this.visible = true;

	};

	/**
	 * Make reticle invisible
	 */
	PANOLENS.Reticle.prototype.hide = function () {

		this.visible = false;

	};

	/**
	 * Load reticle textures
	 */
	PANOLENS.Reticle.prototype.loadTextures = function () {

		this.idleTexture = PANOLENS.Utils.TextureLoader.load( this.idleImageUrl );
		this.dwellTexture = PANOLENS.Utils.TextureLoader.load( this.dwellImageUrl );

		this.material.map = this.idleTexture;
		this.setupDwellSprite( this.dwellTexture );
		this.textureLoaded = true;

	};

	/**
	 * Start reticle timer selection
	 * @param  {function} completeCallback - Callback after dwell completes
	 */
	PANOLENS.Reticle.prototype.select = function ( completeCallback ) {

		if ( performance.now() - this.startTime >= this.dwellTime ) {

			this.completeDwelling();
			completeCallback();

		} else if ( this.autoSelect ){

			this.updateDwelling( performance.now() );
			this.timerId = window.requestAnimationFrame( this.select.bind( this, completeCallback ) );

		}

	};

	/**
	 * Clear and reset reticle timer
	 */
	PANOLENS.Reticle.prototype.clearTimer = function () {

		window.cancelAnimationFrame( this.timerId );
		this.timerId = null;

	};

	/**
	 * Setup dwell sprite animation
	 */
	PANOLENS.Reticle.prototype.setupDwellSprite = function ( texture ) {

		texture.wrapS = THREE.RepeatWrapping;
		texture.repeat.set( 1 / this.dwellSpriteAmount, 1 );

	}

	/**
	 * Update reticle status
	 * @param {number} status - Reticle status
	 */
	PANOLENS.Reticle.prototype.updateStatus = function ( status ) {

		this.status = status;

		if ( status === this.IDLE ) {
			this.scale.copy( this.scaleIdle );
			this.material.map = this.idleTexture;
		} else if ( status === this.DWELLING ) {
			this.scale.copy( this.scaleDwell );
			this.material.map = this.dwellTexture;
		}

		this.currentTile = 0;
		this.material.map.offset.x = 0;

	};

	/**
	 * Start dwelling sequence
	 */
	PANOLENS.Reticle.prototype.startDwelling = function ( completeCallback ) {

		if ( !this.autoSelect ) {

			return;

		}

		this.startTime = performance.now();
		this.updateStatus( this.DWELLING );
		this.select( completeCallback );

	};

	/**
	 * Update dwelling sequence
	 * @param  {number} time - Timestamp for elasped time
	 */
	PANOLENS.Reticle.prototype.updateDwelling = function ( time ) {

		var elasped = time - this.startTime;

		if ( this.currentTile <= this.dwellSpriteAmount ) {
			this.currentTile = Math.floor( elasped / this.dwellTime * this.dwellSpriteAmount );
			this.material.map.offset.x = this.currentTile / this.dwellSpriteAmount;
		} else {
			this.updateStatus( this.IDLE );
		}

	};

	/**
	 * Cancel dwelling
	 */
	PANOLENS.Reticle.prototype.cancelDwelling = function () {
		this.clearTimer();
		this.updateStatus( this.IDLE );

	};

	/**
	 * Complete dwelling
	 */
	PANOLENS.Reticle.prototype.completeDwelling = function () {
		this.clearTimer();	
		this.updateStatus( this.IDLE );
	};

})();;( function () {
	
	/**
	 * Creates a tile with bent capability
	 * @constructor
	 * @param {number}  [width=10]                      				- Width along the X axis
	 * @param {number}  [height=5]                      				- Height along the Y axis
	 * @param {number}  [widthSegments=20]              				- Width segments
	 * @param {number}  [heightSegments=20]             				- Height segments
	 * @param {THREE.Vector3} [forceDirection=THREE.Vector3( 0, 0, 1 )] - Force direction
	 * @param {THREE.Vector3} [forceAxis=THREE.Vector3( 0, 1, 0 )] 		- Along this axis
	 * @param {number} [forceAngle=Math.PI/12] 							- Angle to bend in radians
	 */
	PANOLENS.Tile = function ( width, height, widthSegments, heightSegments, forceDirection, forceAxis, forceAngle ) {

		var scope = this;

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			forceDirection: forceDirection,
			forceAxis: forceAxis,
			forceAngle: forceAngle
		};

		width = width || 10;
		height = height || 5;
		widthSegments = widthSegments || 1;
		heightSegments = heightSegments || 1;
		forceDirection = forceDirection || new THREE.Vector3( 0, 0, 1 );
		forceAxis = forceAxis || new THREE.Vector3( 0, 1, 0 );
		forceAngle = forceAngle !== undefined ? forceAngle : 0;

		THREE.Mesh.call( this, 
			new THREE.PlaneGeometry( width, height, widthSegments, heightSegments ),
			new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true } )
		);

		this.bendModifier = new THREE.BendModifier();

		this.entity = undefined;

		this.animationDuration = 500;
		this.animationFadeOut = undefined;
		this.animationFadeIn = undefined;
		this.animationTranslation = undefined;
		this.tweens = {};

		if ( forceAngle !== 0 ) {

			this.bend( forceDirection, forceAxis, forceAngle );

		}
		
		this.originalGeometry = this.geometry.clone();
	}

	PANOLENS.Tile.prototype = Object.create( THREE.Mesh.prototype );

	PANOLENS.Tile.prototype.constructor = PANOLENS.Tile;

	PANOLENS.Tile.prototype.clone = function (){

		var parameters = this.parameters, tile;

		tile = new PANOLENS.Tile(
			parameters.width,
			parameters.height,
			parameters.widthSegments,
			parameters.heightSegments,
			parameters.forceDirection,
			parameters.forceAxis,
			parameters.forceAngle
		);

		tile.setEntity( this.entity );
		tile.material = this.material.clone();

		return tile;

	};

	/**
	 * Bend panel with direction, axis, and angle
	 * @param  {THREE.Vector3} direction - Force direction
	 * @param  {THREE.Vector3} axis - Along this axis
	 * @param  {number} angle - Angle to bend in radians
	 */
	PANOLENS.Tile.prototype.bend = function ( direction, axis, angle ) {

		this.bendModifier.set( direction, axis, angle ).modify( this.geometry );

	};

	/**
	 * Restore geometry back to initial state 
	 */
	PANOLENS.Tile.prototype.unbend = function () {

		var geometry = this.geometry;

		this.geometry = this.originalGeometry;
		this.originalGeometry = this.geometry.clone();

		geometry.dispose();
		geometry = null;

	};

	/**
	 * Create a tween object for animation
	 * based on - {@link https://github.com/tweenjs/tween.js}
	 * @param  {string} name       - Name of the tween animation
	 * @param  {object} object     - Object to be tweened
	 * @param  {object} toState    - Final state of the object's properties
	 * @param  {number} duration   - Tweening duration
	 * @param  {TWEEN.Easing} easing     - Easing function
	 * @param  {number} delay      - Animation delay time
	 * @param  {Function} onStart    - On start function
	 * @param  {Function} onUpdate   - On update function
	 * @param  {Function} onComplete - On complete function
	 * @return {TWEEN.Tween}         - Tween object
	 */
	PANOLENS.Tile.prototype.tween = function ( name, object, toState, duration, easing, delay, onStart, onUpdate, onComplete ) {

		object = object || this;
    	toState = toState || {};
    	duration = duration || this.animationDuration;
    	easing = easing || TWEEN.Easing.Exponential.Out;
    	delay = delay !== undefined ? delay : 0;
    	onStart = onStart ? onStart : null;
    	onUpdate = onUpdate ? onUpdate : null;
    	onComplete = onComplete ? onComplete : null;

    	if ( !this.tweens[name] ) {
    		this.tweens[name] = new TWEEN.Tween( object )
    			.to( toState, duration )
	        	.easing( easing )
	        	.delay( delay )
	        	.onStart( onStart )
	        	.onUpdate( onUpdate )
	        	.onComplete( onComplete );
    	}

    	return this.tweens[name];

    };

    /**
     * Short-hand for displaying a single ripple effect
     * by duplicating itself and fadeout
     * @param  {number} scale    - The duplicated self fadeout scale
     * @param  {number} duration - Effect duration
     * @param  {TWEEN.Easing} easing   - Easing function
     */
    PANOLENS.Tile.prototype.ripple = function ( scale, duration, easing ) {

    	scale = scale || 2;
    	duration = duration || 200;
    	easing = easing || TWEEN.Easing.Cubic.Out;

    	var scope = this, ripple = this.clone();

        new TWEEN.Tween( ripple.scale )
        .to({x: scale, y: scale}, duration )
        .easing( easing )
        .start();

        new TWEEN.Tween( ripple.material )
        .to({opacity: 0}, duration )
        .easing( easing )
        .onComplete(function(){
            scope.remove( ripple );
            ripple.geometry.dispose();
            ripple.material.dispose();
        })
        .start();

        this.add( ripple );

    };

    /**
	 * Set entity if multiple objects are considered as one entity
	 * @param {object} entity - Entity represents whole group structure
	 */
	PANOLENS.Tile.prototype.setEntity = function ( entity ) {

		this.entity = entity;

	};

} )();;(function(){
	
	'use strict';

    /**
     * Group consists of tile array
     * @constructor
     * @param {array}  tileArray         - Tile array of PANOLENS.Tile 
     * @param {number} verticalGap       - Vertical gap between each tile
     * @param {number} depthGap          - Depth gap between each tile
     * @param {number} animationDuration - Animation duration
     * @param {number} offset            - Offset index
     */
	PANOLENS.TileGroup = function ( tileArray, verticalGap, depthGap, animationDuration, offset ) {

		var scope = this, textureLoader;

		THREE.Object3D.call( this );

		this.tileArray = tileArray || [];
		this.offset = offset !== undefined ? offset : 0;
		this.v_gap = verticalGap !== undefined ? verticalGap : 6;
		this.d_gap = depthGap !== undefined ? depthGap : 2;
		this.animationDuration = animationDuration !== undefined ? animationDuration : 200;
		this.animationEasing = TWEEN.Easing.Exponential.Out;
		this.visibleDelta = 2;

		this.tileArray.map( function ( tile, index ) {

			if ( tile.image ) {

				PANOLENS.Utils.TextureLoader.load( tile.image, scope.setTexture.bind( tile ) );

			}

			tile.position.set( 0, index * -scope.v_gap, index * -scope.d_gap );
			tile.originalPosition = tile.position.clone();
			tile.setEntity( scope );
			scope.add( tile );

		} );

		this.updateVisbility();

	}

	PANOLENS.TileGroup.prototype = Object.create( THREE.Object3D.prototype );

	PANOLENS.TileGroup.prototype.constructor = PANOLENS.TileGroup;

    /**
     * Update corresponding tile textures
     * @param  {array} imageArray - Image array with index to index image update
     */
	PANOLENS.TileGroup.prototype.updateTexture = function ( imageArray ) {

		var scope = this;

		imageArray = imageArray || [];
		this.children.map( function ( child, index ) {
			if ( child instanceof PANOLENS.Tile && imageArray[index] ) {
				PANOLENS.Utils.TextureLoader.load( imageArray[index], scope.setTexture.bind( child ) );
	    		if ( child.outline ) {
	    			child.outline.material.visible = true;
	    		}
			}
		} );

	};

    /**
     * Update all tile textures and hide the remaining ones
     * @param  {array} imageArray - Image array with index to index image update
     */
	PANOLENS.TileGroup.prototype.updateAllTexture = function ( imageArray ) {

		this.updateTexture( imageArray );

		if ( imageArray.length < this.children.length ) {
			for ( var i = imageArray.length; i < this.children.length; i++ ) {
				if ( this.children[i] instanceof PANOLENS.Tile ) {
					this.children[i].material.visible = false;
					if ( this.children[i].outline ) {
						this.children[i].outline.material.visible = false;
					}
				}
			}
		}

	}

    /**
     * Set individual texture
     * @param {THREE.Texture} texture - Texture to be updated
     */
	PANOLENS.TileGroup.prototype.setTexture = function ( texture ) {

        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        this.material.visible = true;
        this.material.map = texture;
        this.material.needsUpdate = true;

    };

    /**
     * Update visibility
     */
    PANOLENS.TileGroup.prototype.updateVisbility = function () {

    	this.children[this.offset].visible = true;
    	new TWEEN.Tween( this.children[this.offset].material )
		.to( { opacity: 1 }, this.animationDuration )
		.easing( this.animationEasing )
		.start();
    	
    	if ( this.children[this.offset].outline ) {

    		this.children[this.offset].outline.visible = true;

    	}

    	// Backward
    	for ( var i = this.offset - 1; i >= 0 ; i-- ) {

    		if ( this.tileArray.indexOf(this.children[i]) === -1 ) { continue; }

    		if ( this.offset - i <= this.visibleDelta ) {

    			this.children[i].visible = true;
    			new TWEEN.Tween( this.children[i].material )
    			.to( { opacity: 1 / ( this.offset - i ) * 0.5 }, this.animationDuration )
    			.easing( this.animationEasing )
    			.start();

    		} else {

    			this.children[i].visible = false;

    		}

    		this.children[i].outline && (this.children[i].outline.visible = false);

    	}

    	// Forward
    	for ( var i = this.offset + 1; i < this.children.length ; i++ ) {

    		if ( this.tileArray.indexOf(this.children[i]) === -1 ) { continue; }

    		if ( i - this.offset <= this.visibleDelta ) {

    			this.children[i].visible = true;
    			new TWEEN.Tween( this.children[i].material )
    			.to( { opacity: 1 / ( i - this.offset ) * 0.5 }, this.animationDuration )
    			.easing( this.animationEasing )
    			.start();

    		} else {

    			this.children[i].visible = false;

    		}

    		this.children[i].outline && (this.children[i].outline.visible = false);

    	}

    };

    /**
     * Scroll up
     * @param  {number} duration - Scroll up duration
     */
    PANOLENS.TileGroup.prototype.scrollUp = function ( duration ) {

    	var tiles = this.tileArray, offset;

    	duration = duration !== undefined ? duration : this.animationDuration;

    	offset = this.offset + 1;

    	if ( this.offset < tiles.length - 1 && tiles[ this.offset + 1 ].material.visible ) {

    		for ( var i = tiles.length - 1; i >= 0; i-- ) {
	    		
    			new TWEEN.Tween( tiles[i].position )
    			.to({ y: ( i - offset ) * -this.v_gap,
    				  z: Math.abs( i - offset ) * -this.d_gap }, duration )
    			.easing( this.animationEasing )
    			.start();
	    		
	    	}

	    	this.offset ++;
	    	this.updateVisbility();
	    	this.dispatchEvent( { type: 'scroll', direction: 'up' } );

    	}

    };

    /**
     * Scroll down 
     * @param  {number} duration - Scroll up duration
     */
    PANOLENS.TileGroup.prototype.scrollDown = function ( duration ) {

    	var tiles = this.tileArray, offset;

    	duration = duration !== undefined ? duration : this.animationDuration;

    	offset = this.offset - 1;

    	if ( this.offset > 0 && tiles[ this.offset - 1 ].material.visible ) {

    		for ( var i = 0; i < tiles.length; i++ ) {

	    		new TWEEN.Tween( tiles[i].position )
    			.to({ y: ( i - offset ) * -this.v_gap,
    				  z: Math.abs( i - offset ) * -this.d_gap }, duration )
    			.easing( this.animationEasing )
    			.start();
	    		
	    	}

	    	this.offset --;
	    	this.updateVisbility();
	    	this.dispatchEvent( { type: 'scroll', direction: 'down' } );

    	}

    };

    PANOLENS.TileGroup.prototype.reset = function () {

    	this.tileArray.map( function ( child, index ) {

    		child.position.copy( child.originalPosition );

    	} );

    	this.offset = 0;
    	this.updateVisbility();

    };

    /**
     * Get current index
     * @return {number} Index of the group. Range from 0 to this.tileArray.length
     */
    PANOLENS.TileGroup.prototype.getIndex = function () {

    	return this.offset;

    };

    /**
     * Get visible tile counts
     * @return {number} Number of visible tiles
     */
    PANOLENS.TileGroup.prototype.getTileCount = function () {

    	var count = 0;

    	this.tileArray.map( function ( tile ) {

    		if ( tile.material.visible ) {

    			count ++;

    		}

    	} );

    	return count;

    };

})();;(function(){
	
	'use strict';

	var sharedFont, sharedTexture;
	var pendingQueue = [];

	/**
	 * Sprite text based on {@link https://github.com/Jam3/three-bmfont-text}
	 * @constructor
	 * @param {string} text     - Text to be displayed
	 * @param {number} maxWidth	- Max width
	 * @param {number} color    - Color in hexadecimal
	 * @param {number} opacity  - Text opacity
	 * @param {object} options  - Options to create text geometry
	 */
	PANOLENS.SpriteText = function ( text, maxWidth, color, opacity, options ) {

		THREE.Object3D.call( this );

		this.text = text || '';
		this.maxWidth = maxWidth || 2000;
		this.color = color || 0xffffff;
		this.opacity = opacity !== undefined ? opacity : 1;
		this.options = options || {};

		this.animationDuration = 500;
		this.animationFadeOut = undefined;
		this.animationFadeIn = undefined;
		this.tweens = {};

		this.addText( text );

	}

	PANOLENS.SpriteText.prototype = Object.create( THREE.Object3D.prototype );

	PANOLENS.SpriteText.prototype.constructor = PANOLENS.SpriteText;

	// Reference function will be overwritten by Bmfont.js
	PANOLENS.SpriteText.prototype.generateTextGeometry = function () {};
	PANOLENS.SpriteText.prototype.generateSDFShader = function () {};

	/**
	 * Set BMFont
	 * @param {Function} callback - Callback after font is loaded
	 * @param {object}   font     - The font to be loaded
	 * @param {THREE.Texture}   texture  - Font texture
	 */
	PANOLENS.SpriteText.prototype.setBMFont = function ( callback, font, texture ) {

		texture.needsUpdate = true;
	  	texture.minFilter = THREE.LinearMipMapLinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.generateMipmaps = true;
		texture.anisotropy = 8;

		sharedFont = font;
		sharedTexture = texture;

		for ( var i = pendingQueue.length - 1; i >= 0; i-- ) {
			pendingQueue[ i ].target.addText( pendingQueue[ i ].text );
		}

		while ( pendingQueue.length > 0 ) {
			pendingQueue.pop();
		}

		callback && callback();

	};

	/**
	 * Add text mesh
	 * @param {string} text - Text to be displayed
	 */
	PANOLENS.SpriteText.prototype.addText = function ( text ) {

		if ( !sharedFont || !sharedTexture ) {
			pendingQueue.push( { target: this, text: text } );
			return;
		}

		var textAnchor = new THREE.Object3D();

		this.options.text = text;
		this.options.font = sharedFont;
		this.options.width = this.maxWidth;

		var geometry = this.generateTextGeometry( this.options );
		geometry.computeBoundingBox();
		geometry.computeBoundingSphere();

		var material = new THREE.RawShaderMaterial(this.generateSDFShader({
		    map: sharedTexture,
		    side: THREE.DoubleSide,
		    transparent: true,
		    color: this.color,
		    opacity: this.opacity
		}));

		var layout = geometry.layout;
		var textMesh = new THREE.Mesh( geometry, material );

		textMesh.entity = this;
		textMesh.position.x = -layout.width / 2;
		textMesh.position.y = layout.height * 1.035;

		textAnchor.scale.x = textAnchor.scale.y = -0.05;
		textAnchor.add( textMesh );

		this.mesh = textMesh;
		this.add( textAnchor );

	};

	/**
	 * Update text geometry
	 * @param  {object} options - Geometry options based on
	 *  https://github.com/Jam3/three-bmfont-text#geometry--createtextopt
	 */
	PANOLENS.SpriteText.prototype.update = function ( options ) {

		var mesh;

		options = options || {};

		mesh = this.mesh;

		mesh.geometry.update( options );
		mesh.position.x = -mesh.geometry.layout.width / 2;
		mesh.position.y = mesh.geometry.layout.height * 1.035;

	};

	/**
	 * Create a tween object for animation
	 * based on - {@link https://github.com/tweenjs/tween.js}
	 * @param  {string} name       - Name of the tween animation
	 * @param  {object} object     - Object to be tweened
	 * @param  {object} toState    - Final state of the object's properties
	 * @param  {number} duration   - Tweening duration
	 * @param  {TWEEN.Easing} easing     - Easing function
	 * @param  {number} delay      - Animation delay time
	 * @param  {Function} onStart    - On start function
	 * @param  {Function} onUpdate   - On update function
	 * @param  {Function} onComplete - On complete function
	 * @return {TWEEN.Tween}         - Tween object
	 */
	PANOLENS.SpriteText.prototype.tween = function ( name, object, toState, duration, easing, delay, onStart, onUpdate, onComplete ) {

		object = object || this;
		toState = toState || {};
		duration = duration || this.animationDuration;
		easing = easing || TWEEN.Easing.Exponential.Out;
		delay = delay !== undefined ? delay : 0;
		onStart = onStart ? onStart : null;
		onUpdate = onUpdate ? onUpdate : null;
		onComplete = onComplete ? onComplete : null;

		if ( !this.tweens[name] ) {
			this.tweens[name] = new TWEEN.Tween( object )
				.to( toState, duration )
	        	.easing( easing )
	        	.delay( delay )
	        	.onStart( onStart )
	        	.onUpdate( onUpdate )
	        	.onComplete( onComplete );
		}

		return this.tweens[name];

	};

	/**
	 * Get geometry layout
	 * @return {object} Text geometry layout 
	 */
	PANOLENS.SpriteText.prototype.getLayout = function () {

		return this.mesh && this.mesh.geometry && this.mesh.geometry.layout || {};

	};

	/**
	 * Set entity if multiple objects are considered as one entity
	 * @param {object} entity - Entity represents whole group structure
	 */
	PANOLENS.SpriteText.prototype.setEntity = function ( entity ) {

		this.entity = entity;

	};

})();;(function () {
	
	/**
	 * Widget for controls
	 * @constructor
	 * @param {HTMLElement} container - A domElement where default control widget will be attached to
	 */
	PANOLENS.Widget = function ( container ) {

		THREE.EventDispatcher.call( this );

		this.DEFAULT_TRANSITION  = 'all 0.27s ease';
		this.TOUCH_ENABLED = PANOLENS.Utils.checkTouchSupported();
		this.PREVENT_EVENT_HANDLER = function ( event ) {
			event.preventDefault();
			event.stopPropagation();
		};

		this.container = container;

		this.barElement;
		this.fullscreenElement;
		this.videoElement;
		this.settingElement;

		this.mainMenu;

		this.activeMainItem;
		this.activeSubMenu;
		this.mask;

	}

	PANOLENS.Widget.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Widget.prototype.constructor = PANOLENS.Widget;

	/**
	 * Add control bar
	 */
	PANOLENS.Widget.prototype.addControlBar = function () {

		if ( !this.container ) {

			console.warn( 'Widget container not set' ); 
			return; 
		}

		var scope = this, bar, styleTranslate, styleOpacity, gradientStyle;

		gradientStyle = 'linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))';

		bar = document.createElement( 'div' );
		bar.style.width = '100%';
		bar.style.height = '44px';
		bar.style.float = 'left';
		bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = 'translateY(-100%)';
		bar.style.background = '-webkit-' + gradientStyle;
		bar.style.background = '-moz-' + gradientStyle;
		bar.style.background = '-o-' + gradientStyle;
		bar.style.background = '-ms-' + gradientStyle;
		bar.style.background = gradientStyle;
		bar.style.transition = this.DEFAULT_TRANSITION;
		bar.style.pointerEvents = 'none';
		bar.isHidden = false;
		bar.toggle = function () {
			bar.isHidden = !bar.isHidden;
			styleTranslate = bar.isHidden ? 'translateY(0)' : 'translateY(-100%)';
			styleOpacity = bar.isHidden ? 0 : 1;
			bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = styleTranslate;
			bar.style.opacity = styleOpacity;
		};

		// Menu
		var menu = this.createDefaultMenu();
		this.mainMenu = this.createMainMenu( menu );
		bar.appendChild( this.mainMenu );

		// Mask
		var mask = this.createMask();
		this.mask = mask;
		this.container.appendChild( mask );

		// Dispose
		bar.dispose = function () {

			if ( scope.fullscreenElement ) {

				bar.removeChild( scope.fullscreenElement );
				scope.fullscreenElement.dispose();
				scope.fullscreenElement = null;

			}

			if ( scope.settingElement ) {

				bar.removeChild( scope.settingElement );
				scope.settingElement.dispose();
				scope.settingElement = null;

			}

			if ( scope.videoElement ) {

				bar.removeChild( scope.videoElement );
				scope.videoElement.dispose();
				scope.videoElement = null;

			}

		};

		this.container.appendChild( bar );

		// Mask events
		this.mask.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			scope.mask.hide();
			scope.settingElement.deactivate();

		}, false );

		// Event listener
		this.addEventListener( 'control-bar-toggle', bar.toggle );

		this.barElement = bar;

	};

	/**
	 * Create default menu
	 */
	PANOLENS.Widget.prototype.createDefaultMenu = function () {

		var scope = this, handler;

		handler = function ( method, data ) {

			return function () {

				scope.dispatchEvent( { 

					type: 'panolens-viewer-handler', 
					method: method, 
					data: data 

				} ); 

			}

		};

		return [

			{ 
				title: 'Control', 
				subMenu: [ 
					{ 
						title: this.TOUCH_ENABLED ? 'Touch' : 'Mouse', 
						handler: handler( 'enableControl', PANOLENS.Controls.ORBIT )
					},
					{ 
						title: 'Sensor', 
						handler: handler( 'enableControl', PANOLENS.Controls.DEVICEORIENTATION ) 
					} 
				]
			},

			{ 
				title: 'Mode', 
				subMenu: [ 
					{ 
						title: 'Normal',
						handler: handler( 'disableEffect' )
					}, 
					{ 
						title: 'Cardboard',
						handler: handler( 'enableEffect', PANOLENS.Modes.CARDBOARD )
					},
					{ 
						title: 'Stereoscopic',
						handler: handler( 'enableEffect', PANOLENS.Modes.STEREO )
					}
				]
			}

		];

	};

	/**
	 * Add buttons on top of control bar
	 * @param {string} name - The control button name to be created
	 */
	PANOLENS.Widget.prototype.addControlButton = function ( name ) {

		var element;

		switch( name ) {

			case 'fullscreen':

				element = this.createFullscreenButton();
				this.fullscreenElement = element; 

				break;

			case 'setting':

				element = this.createSettingButton();
				this.settingElement = element;

				break;

			case 'video':

				element = this.createVideoControl();
				this.videoElement = element;

				break;

			default:

				return;

		}

		if ( !element ) {

			return;

		}

		this.barElement.appendChild( element );

	};

	PANOLENS.Widget.prototype.createMask = function () {

		var element = document.createElement( 'div' );
		element.style.position = 'absolute';
		element.style.top = 0;
		element.style.left = 0;
		element.style.width = '100%';
		element.style.height = '100%';
		element.style.background = 'transparent';
		element.style.display = 'none';

		element.show = function () {

			this.style.display = 'block';

		};

		element.hide = function () {

			this.style.display = 'none';

		};

		return element;

	};

	/**
	 * Create Setting button to toggle menu
	 */
	PANOLENS.Widget.prototype.createSettingButton = function () {

		var scope = this, item;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			scope.mainMenu.toggle();

			if ( this.activated ) {
	
				this.deactivate();

			} else {

				this.activate();

			}

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataImage.Setting + '")',
				webkitTransition : this.DEFAULT_TRANSITION,
				transition : this.DEFAULT_TRANSITION

			},

			onTap: onTap

		} );

		item.activate = function () {

			this.style.transform = 'rotate3d(0,0,1,90deg)';
			this.activated = true;
			scope.mask.show();

		};

		item.deactivate = function () {

			this.style.transform = 'rotate3d(0,0,0,0)';
			this.activated = false;
			scope.mask.hide();

			if ( scope.mainMenu && scope.mainMenu.visible ) {

				scope.mainMenu.hide();
				
			}

			if ( scope.activeSubMenu && scope.activeSubMenu.visible ) {

				scope.activeSubMenu.hide();

			}

			if ( scope.mainMenu && scope.mainMenu._width ) {

				scope.mainMenu.changeSize( scope.mainMenu._width );
				scope.mainMenu.unslideAll();

			}
			
		};

		item.activated = false;

		return item;

	};

	/**
	 * Create Fullscreen button
	 * @return {HTMLSpanElement} - The dom element icon for fullscreen
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	PANOLENS.Widget.prototype.createFullscreenButton = function () {

		var scope = this, item, isFullscreen = false, tapSkipped = true, stylesheetId;

		stylesheetId = 'panolens-style-addon';

		// Don't create button if no support
		if ( !document.fullscreenEnabled       && 
			 !document.webkitFullscreenEnabled &&
			 !document.mozFullScreenEnabled    &&
			 !document.msFullscreenEnabled ) {
			return;
		}

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			tapSkipped = false;

			if ( !isFullscreen ) {
			    scope.container.requestFullscreen && scope.container.requestFullscreen();
			    scope.container.msRequestFullscreen && scope.container.msRequestFullscreen();
			    scope.container.mozRequestFullScreen && scope.container.mozRequestFullScreen();
			    scope.container.webkitRequestFullscreen && scope.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				isFullscreen = true;
			} else {
			    document.exitFullscreen && document.exitFullscreen();
			    document.msExitFullscreen && document.msExitFullscreen();
			    document.mozCancelFullScreen && document.mozCancelFullScreen();
			    document.webkitExitFullscreen && document.webkitExitFullscreen();
				isFullscreen = false;
			}

			this.style.backgroundImage = ( isFullscreen ) 
				? 'url("' + PANOLENS.DataImage.FullscreenLeave + '")' 
				: 'url("' + PANOLENS.DataImage.FullscreenEnter + '")';

		}

		function onFullScreenChange (e) {

			if ( tapSkipped ) {

				isFullscreen = !isFullscreen; 

				item.style.backgroundImage = ( isFullscreen ) 
				? 'url("' + PANOLENS.DataImage.FullscreenLeave + '")' 
				: 'url("' + PANOLENS.DataImage.FullscreenEnter + '")';

			}

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onWindowResize' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onWindowResize', data: false } );

			tapSkipped = true;

		}

		document.addEventListener( 'fullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'webkitfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'mozfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'MSFullscreenChange', onFullScreenChange, false );

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataImage.FullscreenEnter + '")' 

			},

			onTap : onTap

		} );

		// Add fullscreen stlye if not exists
		if ( !document.querySelector( stylesheetId ) ) {
			var sheet = document.createElement( 'style' );
			sheet.id = stylesheetId;
			sheet.innerHTML = ':-webkit-full-screen { width: 100% !important; height: 100% !important }';
			document.body.appendChild( sheet );
		}
		
		return item;

	};

	/**
	 * Create video control container
	 * @return {HTMLSpanElement} - The dom element icon for video control
	 */
	PANOLENS.Widget.prototype.createVideoControl = function () {

		var item;

		item = document.createElement( 'span' );
		item.style.display = 'none';
		item.show = function () { 

			item.style.display = '';

		};

		item.hide = function () { 

			item.style.display = 'none';
			item.controlButton.paused = true;
			item.controlButton.update();

		};

		item.controlButton = this.createVideoControlButton();
		item.seekBar = this.createVideoControlSeekbar();
		
		item.appendChild( item.controlButton );
		item.appendChild( item.seekBar );

		item.dispose = function () {

			item.removeChild( item.controlButton );
			item.removeChild( item.seekBar );

			item.controlButton.dispose();
			item.controlButton = null;

			item.seekBar.dispose();
			item.seekBar = null;

		};

		this.addEventListener( 'video-control-show', item.show );
		this.addEventListener( 'video-control-hide', item.hide );

		return item;

	};

	/**
	 * Create video control button
	 * @return {HTMLSpanElement} - The dom element icon for video control
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	PANOLENS.Widget.prototype.createVideoControlButton = function () {

		var scope = this, item;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'toggleVideoPlay' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay', data: !this.paused } );

			this.paused = !this.paused;

			item.update();

		};

		item = this.createCustomItem( { 

			style : { 

				float : 'left',
				backgroundImage : 'url("' + PANOLENS.DataImage.VideoPlay + '")'

			},

			onTap : onTap

		} );

		item.paused = true;

		item.update = function ( paused ) {

			this.paused = paused !== undefined ? paused : this.paused;

			this.style.backgroundImage = 'url("' + ( this.paused 
				? PANOLENS.DataImage.VideoPlay 
				: PANOLENS.DataImage.VideoPause ) + '")';

		};

		return item;

	};

	/**
	 * Create video seekbar
	 * @return {HTMLSpanElement} - The dom element icon for video seekbar
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	PANOLENS.Widget.prototype.createVideoControlSeekbar = function () {

		var scope = this, item, progressElement, progressElementControl,
			isDragging = false, mouseX, percentageNow, percentageNext;

		progressElement = document.createElement( 'div' );
		progressElement.style.width = '0%';
		progressElement.style.height = '100%';
		progressElement.style.backgroundColor = '#fff';

		progressElementControl = document.createElement( 'div' );
		progressElementControl.style.float = 'right';
		progressElementControl.style.width = '14px';
		progressElementControl.style.height = '14px';
		progressElementControl.style.transform = 'translate(7px, -5px)';
		progressElementControl.style.borderRadius = '50%';
		progressElementControl.style.backgroundColor = '#ddd';

		progressElementControl.addEventListener( 'mousedown', onMouseDown, false );
		progressElementControl.addEventListener( 'touchstart', onMouseDown, false );

		function onMouseDown ( event ) {

			event.stopPropagation();
			
			isDragging = true;
			
			mouseX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );

			percentageNow = parseInt( progressElement.style.width ) / 100;

			addControlListeners();
		}

		function onVideoControlDrag ( event ) {

			var clientX;

			if( isDragging ){

				clientX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );
				
				percentageNext = ( clientX - mouseX ) / item.clientWidth;

				percentageNext = percentageNow + percentageNext;

				percentageNext = percentageNext > 1 ? 1 : ( ( percentageNext < 0 ) ? 0 : percentageNext );

				item.setProgress ( percentageNext );

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'setVideoCurrentTime' function call on PANOLENS.Viewer
				 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentageNext } );

			}

		}

		function onVideoControlStop ( event ) {

			event.stopPropagation();

			isDragging = false;

			removeControlListeners();

		}

		function addControlListeners () {

			scope.container.addEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.addEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.addEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.addEventListener( 'touchend', onVideoControlStop, false );


		}

		function removeControlListeners () {

			scope.container.removeEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.removeEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'touchend', onVideoControlStop, false );

		}

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			var percentage;

			if ( event.target === progressElementControl ) { return; }

			percentage = ( event.changedTouches && event.changedTouches.length > 0 )
				? ( event.changedTouches[0].pageX - event.target.getBoundingClientRect().left ) / this.clientWidth
				: event.offsetX / this.clientWidth;

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'setVideoCurrentTime' function call on PANOLENS.Viewer
			 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentage } );

			item.setProgress( event.offsetX / this.clientWidth );

		};

		function onDispose () {

			removeControlListeners();
			progressElement = null;
			progressElementControl = null;

		}

		progressElement.appendChild( progressElementControl );

		item = this.createCustomItem( {

			style : { 

				float : 'left',
				width : '30%',
				height : '4px',
				marginTop : '20px',
				backgroundColor : 'rgba(188,188,188,0.8)'

			},

			onTap : onTap,
			onDispose: onDispose

		} );

		item.appendChild( progressElement );

		item.setProgress = function( percentage ) {

			progressElement.style.width = percentage * 100 + '%';

		};		

		this.addEventListener( 'video-update', function ( event ) { 

			item.setProgress( event.percentage ); 

		} );

		return item;

	};

	/**
	 * Create menu item
	 * @param  {string} title - Title to display
	 * @return {HTMLDomElement} - An anchor tag element
	 */
	PANOLENS.Widget.prototype.createMenuItem = function ( title ) {

		var scope = this, item = document.createElement( 'a' );
		item.textContent = title;
		item.style.display = 'block';
		item.style.padding = '10px';
		item.style.textDecoration = 'none';
		item.style.cursor = 'pointer';
		item.style.pointerEvents = 'auto';
		item.style.transition = this.DEFAULT_TRANSITION;

		item.slide = function ( right ) {

			this.style.transform = 'translateX(' + ( right ? '' : '-' ) + '100%)';

		};

		item.unslide = function () {

			this.style.transform = 'translateX(0)';

		};

		item.setIcon = function ( url ) {

			if ( this.icon ) {

				this.icon.style.backgroundImage = 'url(' + url + ')';

			}

		};

		item.setSelectionTitle = function ( title ) {

			if ( this.selection ) {

				this.selection.textContent = title;

			}

		};

		item.addSelection = function ( name ) {
			
			var selection = document.createElement( 'span' );
			selection.style.fontSize = '13px';
			selection.style.fontWeight = '300';
			selection.style.float = 'right';

			this.selection = selection;
			this.setSelectionTitle( name );
			this.appendChild( selection );
			
			return this;

		};

		item.addIcon = function ( url, left, flip ) {

			url = url || PANOLENS.DataImage.ChevronRight;
			left = left || false;
			flip = flip || false;
			
			var element = document.createElement( 'span' );
			element.style.float = left ? 'left' : 'right';
			element.style.width = '17px';
			element.style.height = '17px';
			element.style[ 'margin' + ( left ? 'Right' : 'Left' ) ] = '12px';
			element.style.backgroundSize = 'cover';

			if ( flip ) {

				element.style.transform = 'rotateZ(180deg)';

			}

			this.icon = element;
			this.setIcon( url );
			this.appendChild( element );

			return this;

		};

		item.addSubMenu = function ( title, items ) {

			this.subMenu = scope.createSubMenu( title, items );

			return this;

		};

		item.addEventListener( 'mouseenter', function () {
			
			this.style.backgroundColor = '#e0e0e0';

		}, false );

		item.addEventListener( 'mouseleave', function () {
			
			this.style.backgroundColor = '#fafafa';

		}, false );

		return item;

	};

	/**
	 * Create menu item header
	 * @param  {string} title - Title to display
	 * @return {HTMLDomElement} - An anchor tag element
	 */
	PANOLENS.Widget.prototype.createMenuItemHeader = function ( title ) {

		var header = this.createMenuItem( title );

		header.style.borderBottom = '1px solid #333';
		header.style.paddingBottom = '15px';

		return header;

	};

	/**
	 * Create main menu
	 * @param  {array} menus - Menu array list
	 * @return {HTMLDomElement} - A span element
	 */
	PANOLENS.Widget.prototype.createMainMenu = function ( menus ) {
		
		var scope = this, menu = this.createMenu(), subMenu;

		menu._width = 200;
		menu.changeSize( menu._width );

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			var mainMenu = scope.mainMenu, subMenu = this.subMenu;

			function onNextTick () {

				mainMenu.changeSize( subMenu.clientWidth );
				subMenu.show();
				subMenu.unslideAll();

			}

			mainMenu.hide();
			mainMenu.slideAll();
			mainMenu.parentElement.appendChild( subMenu );

			scope.activeMainItem = this;
			scope.activeSubMenu = subMenu;

			window.requestAnimationFrame( onNextTick );

		};

		for ( var i = 0; i < menus.length; i++ ) {

			var item = menu.addItem( menus[ i ].title );

			item.style.paddingLeft = '20px';

			item.addIcon()
				.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

			if ( menus[ i ].subMenu && menus[ i ].subMenu.length > 0 ) {

				var title = menus[ i ].subMenu[ 0 ].title;

				item.addSelection( title )
					.addSubMenu( menus[ i ].title, menus[ i ].subMenu );

			}

		}

		return menu;

	};

	/**
	 * Create sub menu
	 * @param {string} title - Sub menu title
	 * @param {array} items - Item array list
	 * @return {HTMLDomElement} - A span element
	 */
	PANOLENS.Widget.prototype.createSubMenu = function ( title, items ) {

		var scope = this, menu, subMenu = this.createMenu();

		subMenu.items = items;
		subMenu.activeItem;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			menu = scope.mainMenu;
			menu.changeSize( menu._width );
			menu.unslideAll();
			menu.show();
			subMenu.slideAll( true );
			subMenu.hide();

			if ( this.type !== 'header' ) {

				subMenu.setActiveItem( this );
				scope.activeMainItem.setSelectionTitle( this.textContent );

				this.handler && this.handler();

			}

		}

		subMenu.addHeader( title ).addIcon( undefined, true, true ).addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

		for ( var i = 0; i < items.length; i++ ) {

			var item = subMenu.addItem( items[ i ].title );

			item.style.fontWeight = 300;
			item.handler = items[ i ].handler;
			item.addIcon( ' ', true );
			item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

			if ( !subMenu.activeItem ) {

				subMenu.setActiveItem( item );

			}

		}

		subMenu.slideAll( true );

		return subMenu;
		
	};

	/**
	 * Create general menu
	 * @return {HTMLDomElement} - A span element
	 */
	PANOLENS.Widget.prototype.createMenu = function () {

		var scope = this, menu = document.createElement( 'span' ), style;

		style = menu.style;

		style.padding = '5px 0';
		style.position = 'fixed';
		style.bottom = '100%';
		style.right = '14px';
		style.backgroundColor = '#fafafa';
		style.fontFamily = 'Helvetica Neue';
		style.fontSize = '14px';
		style.visibility = 'hidden';
		style.opacity = 0;
		style.boxShadow = '0 0 12pt rgba(0,0,0,0.25)';
  		style.borderRadius = '2px';
		style.overflow = 'hidden';
		style.willChange = 'width, height, opacity';
		style.pointerEvents = 'auto';
		style.transition = this.DEFAULT_TRANSITION;

		menu.visible = false;

		menu.changeSize = function ( width, height ) {

			if ( width ) {

				this.style.width = width + 'px';

			}

			if ( height ) {

				this.style.height = height + 'px';

			}

		};

		menu.show = function () {

			this.style.opacity = 1;
			this.style.visibility = 'visible';
			this.visible = true;

		};

		menu.hide = function () {

			this.style.opacity = 0;
			this.style.visibility = 'hidden';
			this.visible = false;

		};

		menu.toggle = function () {

			if ( this.visible ) {

				this.hide();

			} else {

				this.show();

			}

		};

		menu.slideAll = function ( right ) {

			for ( var i = 0; i < menu.children.length; i++ ){

				if ( menu.children[ i ].slide ) {

					menu.children[ i ].slide( right );

				}

			}

		};

		menu.unslideAll = function () {

			for ( var i = 0; i < menu.children.length; i++ ){

				if ( menu.children[ i ].unslide ) {

					menu.children[ i ].unslide();

				}

			}

		};

		menu.addHeader = function ( title ) {

			var header = scope.createMenuItemHeader( title );
			header.type = 'header';

			this.appendChild( header );

			return header;

		};

		menu.addItem = function ( title ) {

			var item = scope.createMenuItem( title );
			item.type = 'item';

			this.appendChild( item );

			return item;

		};

		menu.setActiveItem = function ( item ) {

			if ( this.activeItem ) {

				this.activeItem.setIcon( ' ' );

			}

			item.setIcon( PANOLENS.DataImage.Check );

			this.activeItem = item;

		};

		menu.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
		menu.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
		menu.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );

		return menu;

	};

	/**
	 * Create custom item element
	 * @return {HTMLSpanElement} - The dom element icon
	 */
	PANOLENS.Widget.prototype.createCustomItem = function ( options ) {

		options = options || {};

		var scope = this,
			item = options.element || document.createElement( 'span' );

		item.style.cursor = 'pointer';
		item.style.float = 'right';
		item.style.width = '44px';
		item.style.height = '100%';
		item.style.backgroundSize = '60%';
		item.style.backgroundRepeat = 'no-repeat';
		item.style.backgroundPosition = 'center';
		item.style.webkitUserSelect = 
		item.style.MozUserSelect = 
		item.style.userSelect = 'none';
		item.style.position = 'relative';
		item.style.pointerEvents = 'auto';

		// White glow on icon
		item.addEventListener( scope.TOUCH_ENABLED ? 'touchstart' : 'mouseenter', function() {
			item.style.filter = 
			item.style.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
		});
		item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'mouseleave', function() {
			item.style.filter = 
			item.style.webkitFilter = '';
		});

		item = this.mergeStyleOptions( item, options.style );

		if ( options.onTap ) {

			item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

		}

		item.dispose = function () {

			item.removeEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

			options.onDispose && options.onDispose();

		};
		
		return item;

	};

	/**
	 * Merge item css style
	 * @param  {HTMLDOMElement} element - The element to be merged with style
	 * @param  {object} options - The style options
	 * @return {HTMLDOMElement} - The same element with merged styles
	 */
	PANOLENS.Widget.prototype.mergeStyleOptions = function ( element, options ) {

		options = options || {};

		for ( var property in options ){

			if ( options.hasOwnProperty( property ) ) {

				element.style[ property ] = options[ property ];

			}

		}

		return element;

	};

	/**
	 * Dispose widgets by detaching dom elements from container
	 */
	PANOLENS.Widget.prototype.dispose = function () {

		if ( this.barElement ) {
			this.container.removeChild( this.barElement );
			this.barElement.dispose();
			this.barElement = null;

		}

	};

})();;( function () {

	/**
	 * Information spot attached to panorama
	 * @constructor
	 * @param {number} [scale=300] - Infospot scale
	 * @param {imageSrc} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
	 * @param {boolean} [animated=true] - Enable default hover animation
	 */
	PANOLENS.Infospot = function ( scale, imageSrc, animated ) {
		
		var scope = this, ratio, startScale, endScale, duration;

		scale = scale || 300;
		imageSrc = imageSrc || PANOLENS.DataImage.Info;
		duration = 500;

		THREE.Sprite.call( this );

		this.type = 'infospot';

		this.animated = animated !== undefined ? animated : true;
		this.isHovering = false;
		this.visible = false;

		this.element;
		this.toPanorama;
		this.cursorStyle;

		this.mode = PANOLENS.Modes.UNKNOWN;

		this.scale.set( scale, scale, 1 );
		this.rotation.y = Math.PI;
		this.scaleFactor = 1.3;

		this.container;

		// Event Handler
		this.HANDLER_FOCUS;

		PANOLENS.Utils.TextureLoader.load( imageSrc, postLoad );		

		function postLoad ( texture ) {

			texture.wrapS = THREE.RepeatWrapping;
			texture.repeat.x = - 1;

			texture.image.width = texture.image.naturalWidth || 64;
			texture.image.height = texture.image.naturalHeight || 64;

			ratio = texture.image.width / texture.image.height;
			scope.scale.set( ratio * scale, scale, 1 );

			startScale = scope.scale.clone();

			scope.scaleUpAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: startScale.x * scope.scaleFactor, y: startScale.y * scope.scaleFactor }, duration )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.scaleDownAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: startScale.x, y: startScale.y }, duration )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.material.side = THREE.DoubleSide;
			scope.material.map = texture;
			scope.material.depthTest = false;
			scope.material.needsUpdate = true;

		}

		function show () {

			this.visible = true;

		}

		function hide () {

			this.visible = false;

		}

		// Add show and hide animations
		this.showAnimation = new TWEEN.Tween( this.material )
			.to( { opacity: 1 }, duration )
			.onStart( show.bind( this ) )
			.easing( TWEEN.Easing.Quartic.Out );

		this.hideAnimation = new TWEEN.Tween( this.material )
			.to( { opacity: 0 }, duration )
			.onComplete( hide.bind( this ) )
			.easing( TWEEN.Easing.Quartic.Out );

		// Attach event listeners
		this.addEventListener( 'click', this.onClick );
		this.addEventListener( 'hover', this.onHover );
		this.addEventListener( 'hoverenter', this.onHoverStart );
		this.addEventListener( 'hoverleave', this.onHoverEnd );
		this.addEventListener( 'panolens-dual-eye-effect', this.onDualEyeEffect );
		this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
		this.addEventListener( 'dismiss', this.onDismiss );
		this.addEventListener( 'panolens-infospot-focus', this.setFocusMethod );

	};

	PANOLENS.Infospot.prototype = Object.create( THREE.Sprite.prototype );

	/**
	 * Set infospot container
	 * @param {HTMLElement|object} data - Data with container information
	 */
	PANOLENS.Infospot.prototype.setContainer = function ( data ) {

		var container;

		if ( data instanceof HTMLElement ) {

			container = data;

		} else if ( data && data.container ) {

			container = data.container;

		}

		// Append element if exists
		if ( container && this.element ) {

			container.appendChild( this.element );

		}

		this.container = container;

	};

	/**
	 * Get container
	 * @return {HTMLElement} - The container of this infospot
	 */
	PANOLENS.Infospot.prototype.getContainer = function () {

		return this.container;

	};

	/**
	 * This will be called by a click event
	 * Translate and lock the hovering element if any
	 * @param  {object} event - Event containing mouseEvent with clientX and clientY
	 */
	PANOLENS.Infospot.prototype.onClick = function ( event ) {

		if ( this.element && this.getContainer() ) {

			this.onHoverStart( event );

			// Lock element
			this.lockHoverElement();

		}

	};

	/**
	 * Dismiss current element if any
	 * @param  {object} event - Dismiss event
	 */
	PANOLENS.Infospot.prototype.onDismiss = function ( event ) {

		if ( this.element ) {

			this.unlockHoverElement();
			this.onHoverEnd();

		}

	};

	/**
	 * This will be called by a mouse hover event
	 * Translate the hovering element if any
	 * @param  {object} event - Event containing mouseEvent with clientX and clientY
	 */
	PANOLENS.Infospot.prototype.onHover = function ( event ) {

	};

	/**
	 * This will be called on a mouse hover start
	 * Sets cursor style to 'pointer', display the element and scale up the infospot
	 */
	PANOLENS.Infospot.prototype.onHoverStart = function ( event ) {

		if ( !this.getContainer() ) { return; }

		var cursorStyle = this.cursorStyle || ( this.mode === PANOLENS.Modes.NORMAL ? 'pointer' : 'default' );

		this.isHovering = true;
		this.container.style.cursor = cursorStyle;
		
		if ( this.animated ) {

			this.scaleDownAnimation && this.scaleDownAnimation.stop();
			this.scaleUpAnimation && this.scaleUpAnimation.start();

		}
		
		if ( this.element && event.mouseEvent.clientX >= 0 && event.mouseEvent.clientY >= 0 ) {

			if ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) {

				this.element.style.display = 'none';
				this.element.left && ( this.element.left.style.display = 'block' );
				this.element.right && ( this.element.right.style.display = 'block' );

				// Store element width for reference
				this.element._width = this.element.left.clientWidth;
				this.element._height = this.element.left.clientHeight;

			} else {

				this.element.style.display = 'block';
				this.element.left && ( this.element.left.style.display = 'none' );
				this.element.right && ( this.element.right.style.display = 'none' );

				// Store element width for reference
				this.element._width = this.element.clientWidth;
				this.element._height = this.element.clientHeight;

			}
			
		}

	};

	/**
	 * This will be called on a mouse hover end
	 * Sets cursor style to 'default', hide the element and scale down the infospot
	 */
	PANOLENS.Infospot.prototype.onHoverEnd = function () {

		if ( !this.getContainer() ) { return; }

		this.isHovering = false;
		this.container.style.cursor = 'default';

		if ( this.animated ) {

			this.scaleUpAnimation && this.scaleUpAnimation.stop();
			this.scaleDownAnimation && this.scaleDownAnimation.start();

		}

		if ( this.element && !this.element.locked ) {

			this.element.style.display = 'none';
			this.element.left && ( this.element.left.style.display = 'none' );
			this.element.right && ( this.element.right.style.display = 'none' );

			this.unlockHoverElement();

		}

	};

	/**
	 * On dual eye effect handler
	 * Creates duplicate left and right element
	 * @param  {object} event - panolens-dual-eye-effect event
	 */
	PANOLENS.Infospot.prototype.onDualEyeEffect = function ( event ) {
		
		if ( !this.getContainer() ) { return; }

		var element, halfWidth, halfHeight;

		this.mode = event.mode;

		element = this.element;

		halfWidth = this.container.clientWidth / 2;
		halfHeight = this.container.clientHeight / 2;

		if ( !element ) {

			return;

		}

		if ( !element.left || !element.right ) {

			element.left = element.cloneNode( true );
			element.right = element.cloneNode( true );

		}

		if ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) {

			element.left.style.display = element.style.display;
			element.right.style.display = element.style.display;
			element.style.display = 'none';

		} else {

			element.style.display = element.left.style.display;
			element.left.style.display = 'none';
			element.right.style.display = 'none';

		}

		// Update elements translation
		this.translateElement( halfWidth, halfHeight );

		this.container.appendChild( element.left );
		this.container.appendChild( element.right );

	};

	/**
	 * Translate the hovering element by css transform
	 * @param  {number} x - X position on the window screen
	 * @param  {number} y - Y position on the window screen
	 */
	PANOLENS.Infospot.prototype.translateElement = function ( x, y ) {

		if ( !this.element._width || !this.element._height || !this.getContainer() ) {

			return;

		}

		var left, top, element, width, height, delta, container;

		container = this.container;
		element = this.element;
		width = element._width / 2;
		height = element._height / 2;
		delta = element.verticalDelta !== undefined ? element.verticalDelta : 40;

		left = x - width;
		top = y - height - delta;

		if ( ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) 
				&& element.left && element.right
				&& !( x === container.clientWidth / 2 && y === container.clientHeight / 2 ) ) {

			left = container.clientWidth / 4 - width + ( x - container.clientWidth / 2 );
			top = container.clientHeight / 2 - height - delta + ( y - container.clientHeight / 2 );

			this.setElementStyle( 'transform', element.left, 'translate(' + left + 'px, ' + top + 'px)' );

			left += container.clientWidth / 2;

			this.setElementStyle( 'transform', element.right, 'translate(' + left + 'px, ' + top + 'px)' );

		} else {

			this.setElementStyle( 'transform', element, 'translate(' + left + 'px, ' + top + 'px)' );

		}

	};

	/**
	 * Set vendor specific css
	 * @param {string} type - CSS style name
	 * @param {HTMLElement} element - The element to be modified
	 * @param {string} value - Style value
	 */
	PANOLENS.Infospot.prototype.setElementStyle = function ( type, element, value ) {

		var style = element.style;

		if ( type === 'transform' ) {

			style.webkitTransform = style.msTransform = style.transform = value;

		}

	};

	/**
	 * Set hovering text content
	 * @param {string} text - Text to be displayed
	 */
	PANOLENS.Infospot.prototype.setText = function ( text ) {

		if ( this.element ) {

			this.element.textContent = text;

		}

	};

	/**
	 * Set cursor css style on hover
	 */
	PANOLENS.Infospot.prototype.setCursorHoverStyle = function ( style ) {

		this.cursorStyle = style;

	};

	/**
	 * Add hovering text element
	 * @param {string} text - Text to be displayed
	 * @param {number} [delta=40] - Vertical delta to the infospot
	 */
	PANOLENS.Infospot.prototype.addHoverText = function ( text, delta ) {

		if ( !this.element ) {

			this.element = document.createElement( 'div' );
			this.element.style.display = 'none';
			this.element.style.color = '#fff';
			this.element.style.top = 0;
			this.element.style.maxWidth = '50%';
			this.element.style.maxHeight = '50%';
			this.element.style.textShadow = '0 0 3px #000000';
			this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
			this.element.style.position = 'absolute';
			this.element.classList.add( 'panolens-infospot' );
			this.element.verticalDelta = delta !== undefined ? delta : 40;

		}

		this.setText( text );

	};

	/**
	 * Add hovering element by cloning an element
	 * @param {HTMLDOMElement} el - Element to be cloned and displayed
	 * @param {number} [delta=40] - Vertical delta to the infospot
	 */
	PANOLENS.Infospot.prototype.addHoverElement = function ( el, delta ) {

		if ( !this.element ) { 

			this.element = el.cloneNode( true );
			this.element.style.display = 'none';
			this.element.style.top = 0;
			this.element.style.position = 'absolute';
			this.element.classList.add( 'panolens-infospot' );
			this.element.verticalDelta = delta !== undefined ? delta : 40;

		}

	};

	/**
	 * Remove hovering element
	 */
	PANOLENS.Infospot.prototype.removeHoverElement = function () {

		if ( this.element ) { 

			if ( this.element.left ) {

				this.container.removeChild( this.element.left );
				this.element.left = null;

			}

			if ( this.element.right ) {

				this.container.removeChild( this.element.right );
				this.element.right = null;

			}

			this.container.removeChild( this.element );
			this.element = null;

		}

	};

	/**
	 * Lock hovering element
	 */
	PANOLENS.Infospot.prototype.lockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = true;

		}

	};

	/**
	 * Unlock hovering element
	 */
	PANOLENS.Infospot.prototype.unlockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = false;

		}

	};

	/**
	 * Show infospot
	 * @param  {number} [delay=0] - Delay time to show
	 */
	PANOLENS.Infospot.prototype.show = function ( delay ) {

		delay = delay || 0;

		if ( this.animated ) {

			this.hideAnimation && this.hideAnimation.stop();
			this.showAnimation && this.showAnimation.delay( delay ).start();

		}

	};

	/**
	 * Hide infospot
	 * @param  {number} [delay=0] - Delay time to hide
	 */
	PANOLENS.Infospot.prototype.hide = function ( delay ) {

		delay = delay || 0;

		if ( this.animated ) {

			this.showAnimation && this.showAnimation.stop();
			this.hideAnimation && this.hideAnimation.delay( delay ).start();

		}
		
		
	};

	/**
	 * Set focus event handler
	 */
	PANOLENS.Infospot.prototype.setFocusMethod = function ( event ) {

		if ( event ) {

			this.HANDLER_FOCUS = event.method;

		}

	};

	/**
	 * Focus camera center to this infospot
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	PANOLENS.Infospot.prototype.focus = function ( duration, easing ) {

		if ( this.HANDLER_FOCUS ) {

			this.HANDLER_FOCUS( this.position, duration, easing );
			this.onDismiss();

		}

	};

	/**
	 * Dispose infospot
	 */
	PANOLENS.Infospot.prototype.dispose = function () {

		this.removeHoverElement();
		this.material.dispose();

		if ( this.parent ) {

			this.parent.remove( this );

		}

	};

} )();;( function () {

	'use strict';

	/**
	 * Viewer contains pre-defined scene, camera and renderer
	 * @constructor
	 * @param {object} [options] - Use custom or default config options
	 * @param {HTMLElement} [options.container] - A HTMLElement to host the canvas
	 * @param {THREE.Scene} [options.scene=THREE.Scene] - A THREE.Scene which contains panorama and 3D objects
	 * @param {THREE.Camera} [options.camera=THREE.PerspectiveCamera] - A THREE.Camera to view the scene
	 * @param {THREE.WebGLRenderer} [options.renderer=THREE.WebGLRenderer] - A THREE.WebGLRenderer to render canvas
	 * @param {boolean} [options.controlBar=true] - Show/hide control bar on the bottom of the container
	 * @param {array}   [options.controlButtons=[]] - Button names to mount on controlBar if controlBar exists, Defaults to ['fullscreen', 'setting', 'video']
	 * @param {boolean} [options.autoHideControlBar=false] - Auto hide control bar when click on non-active area
	 * @param {boolean} [options.autoHideInfospot=true] - Auto hide infospots when click on non-active area
	 * @param {boolean} [options.horizontalView=false] - Allow only horizontal camera control
	 * @param {number}  [options.clickTolerance=10] - Distance tolerance to tigger click / tap event
	 * @param {number}  [options.cameraFov=60] - Camera field of view value
	 * @param {boolean} [options.reverseDragging=false] - Reverse dragging direction
	 * @param {boolean} [options.enableReticle=false] - Enable reticle for mouseless interaction other than VR mode
	 * @param {number}  [options.dwellTime=1500] - Dwell time for reticle selection
	 * @param {boolean} [options.autoReticleSelect=true] - Auto select a clickable target after dwellTime
	 * @param {boolean} [options.viewIndicator=false] - Adds an angle view indicator in upper left corner
	 * @param {number}  [options.indicatorSize=30] - Size of View Indicator
	 * @param {string}  [options.output='none'] - Whether and where to output raycast position. Could be 'console' or 'overlay'
	 */
	PANOLENS.Viewer = function ( options ) {

		THREE.EventDispatcher.call( this );

		if ( !THREE ) {

			console.error('Three.JS not found');

			return;
		}

		var container;

		options = options || {};
		options.controlBar = options.controlBar !== undefined ? options.controlBar : true;
		options.controlButtons = options.controlButtons || [ 'fullscreen', 'setting', 'video' ];
		options.autoHideControlBar = options.autoHideControlBar !== undefined ? options.autoHideControlBar : false;
		options.autoHideInfospot = options.autoHideInfospot !== undefined ? options.autoHideInfospot : true;
		options.horizontalView = options.horizontalView !== undefined ? options.horizontalView : false;
		options.clickTolerance = options.clickTolerance || 10;
		options.cameraFov = options.cameraFov || 60;
		options.reverseDragging = options.reverseDragging || false;
		options.enableReticle = options.enableReticle || false;
		options.dwellTime = options.dwellTime || 1500;
		options.autoReticleSelect = options.autoReticleSelect !== undefined ? options.autoReticleSelect : true;
		options.viewIndicator = options.viewIndicator !== undefined ? options.viewIndicator : false;
		options.indicatorSize = options.indicatorSize || 30;
		options.output = options.output ? options.output : 'none';

		this.options = options;

		// Container
		if ( options.container ) {

			container = options.container;
			container._width = container.clientWidth;
			container._height = container.clientHeight;

		} else {

			container = document.createElement( 'div' );
			container.classList.add( 'panolens-container' );
			container.style.width = '100%';
			container.style.height = '100%';
			container._width = window.innerWidth;
			container._height = window.innerHeight;
			document.body.appendChild( container );

		}

		this.container = container;

		this.camera = options.camera || new THREE.PerspectiveCamera( this.options.cameraFov, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
		this.scene = options.scene || new THREE.Scene();
		this.renderer = options.renderer || new THREE.WebGLRenderer( { alpha: true, antialias: false } );

		this.viewIndicatorSize = options.indicatorSize;

		this.reticle = {};
		this.tempEnableReticle = this.options.enableReticle;

		this.mode = PANOLENS.Modes.NORMAL;

		this.OrbitControls;
		this.DeviceOrientationControls;

		this.CardboardEffect;
		this.StereoEffect;

		this.controls;
		this.effect;
		this.panorama;
		this.widget;

		this.hoverObject;
		this.infospot;
		this.pressEntityObject;
		this.pressObject;

		this.raycaster = new THREE.Raycaster();
		this.raycasterPoint = new THREE.Vector2();
		this.userMouse = new THREE.Vector2();
		this.updateCallbacks = [];
		this.requestAnimationId;

		this.cameraFrustum = new THREE.Frustum();
		this.cameraViewProjectionMatrix = new THREE.Matrix4();

		this.outputDivElement;

		// Handler references
		this.HANDLER_MOUSE_DOWN = this.onMouseDown.bind( this );
		this.HANDLER_MOUSE_UP = this.onMouseUp.bind( this );
		this.HANDLER_MOUSE_MOVE = this.onMouseMove.bind( this );
		this.HANDLER_WINDOW_RESIZE = this.onWindowResize.bind( this );
		this.HANDLER_KEY_DOWN = this.onKeyDown.bind( this );
		this.HANDLER_KEY_UP = this.onKeyUp.bind( this );
		this.HANDLER_TAP = this.onTap.bind( this, {
			clientX: this.container.clientWidth / 2,
			clientY: this.container.clientHeight / 2
		} );

		// Flag for infospot output
		this.OUTPUT_INFOSPOT = false;

		// Animations
		this.tweenLeftAnimation = new TWEEN.Tween();
		this.tweenUpAnimation = new TWEEN.Tween();

		// Renderer
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.renderer.setClearColor( 0x000000, 1 );
		this.renderer.sortObjects = false;

		// Append Renderer Element to container
		this.renderer.domElement.classList.add( 'panolens-canvas' );
		this.renderer.domElement.style.display = 'block';
		this.container.style.backgroundColor = '#000';
		this.container.appendChild( this.renderer.domElement );

		// Camera Controls
		this.OrbitControls = new THREE.OrbitControls( this.camera, this.container );
		this.OrbitControls.name = 'orbit';
		this.OrbitControls.minDistance = 1;
		this.OrbitControls.noPan = true;
		this.DeviceOrientationControls = new THREE.DeviceOrientationControls( this.camera, this.container );
		this.DeviceOrientationControls.name = 'device-orientation';
		this.DeviceOrientationControls.enabled = false;
		this.camera.position.z = 1;

		// Register change event if passiveRenering
		if ( this.options.passiveRendering ) {

			console.warn( 'passiveRendering is now deprecated' );

		}

		// Controls
		this.controls = [ this.OrbitControls, this.DeviceOrientationControls ];
		this.control = this.OrbitControls;

		// Cardboard effect
		this.CardboardEffect = new THREE.CardboardEffect( this.renderer );
		this.CardboardEffect.setSize( this.container.clientWidth, this.container.clientHeight );

		// Stereo effect
		this.StereoEffect = new THREE.StereoEffect( this.renderer );
		this.StereoEffect.setSize( this.container.clientWidth, this.container.clientHeight );

		this.effect = this.CardboardEffect;

		// Add default hidden reticle
		this.addReticle();

		// Lock horizontal view
		if ( this.options.horizontalView ) {
			this.OrbitControls.minPolarAngle = Math.PI / 2;
			this.OrbitControls.maxPolarAngle = Math.PI / 2;
		}

		// Add Control UI
		if ( this.options.controlBar !== false ) {
			this.addDefaultControlBar( this.options.controlButtons );
		}

		// Add View Indicator
		if ( this.options.viewIndicator ) {
			this.addViewIndicator();
		}

		// Reverse dragging direction
		if ( this.options.reverseDragging ) {
			this.reverseDraggingDirection();
		}

		// Register event if reticle is enabled, otherwise defaults to mouse
		if ( this.options.enableReticle ) {
			this.enableReticleControl();
		} else {
			this.registerMouseAndTouchEvents();
		}

		if ( this.options.output === 'overlay' ) {
			this.addOutputElement();
		}

		// Register dom event listeners
		this.registerEventListeners();

		// Animate
		this.animate.call( this );

	};

	PANOLENS.Viewer.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Viewer.prototype.constructor = PANOLENS.Viewer;

	/**
	 * Add an object to the scene
	 * Automatically hookup with panolens-viewer-handler listener
	 * to communicate with viewer method
	 * @param {THREE.Object3D} object - The object to be added
	 */
	PANOLENS.Viewer.prototype.add = function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		this.scene.add( object );

		// All object added to scene has 'panolens-viewer-handler' event to handle viewer communication
		if ( object.addEventListener ) {

			object.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

		}

		// All object added to scene being passed with container
		if ( object instanceof PANOLENS.Panorama && object.dispatchEvent ) {

			object.dispatchEvent( { type: 'panolens-container', container: this.container } );

		}

		// Hookup default panorama event listeners
		if ( object.type === 'panorama' ) {

			this.addPanoramaEventListener( object );

			if ( !this.panorama ) {

				this.setPanorama( object );

			}

		}

	};

	/**
	 * Remove an object from the scene
	 * @param  {THREE.Object3D} object - Object to be removed
	 */
	PANOLENS.Viewer.prototype.remove = function ( object ) {

		if ( object.removeEventListener ) {

			object.removeEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

		}

		this.scene.remove( object );

	};

	/**
	 * Add default control bar
	 * @param {array} array - The control buttons array
	 */
	PANOLENS.Viewer.prototype.addDefaultControlBar = function ( array ) {

		var scope = this;

		if ( this.widget ) {

			console.warn( 'Default control bar exists' );
			return;

		}

		this.widget = new PANOLENS.Widget( this.container );
		this.widget.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );
		this.widget.addControlBar();
		array.forEach( function( buttonName ){

			scope.widget.addControlButton( buttonName );

		} );

	};

	/**
	 * Set a panorama to be the current one
	 * @param {PANOLENS.Panorama} pano - Panorama to be set
	 */
	PANOLENS.Viewer.prototype.setPanorama = function ( pano ) {

		var scope = this, leavingPanorama = this.panorama;

		if ( pano.type === 'panorama' && leavingPanorama !== pano ) {

			// Clear exisiting infospot
			this.hideInfospot();

			var afterEnterComplete = function () {

				leavingPanorama && leavingPanorama.onLeave();
				pano.removeEventListener( 'enter-fade-start', afterEnterComplete );

			};

			pano.addEventListener( 'enter-fade-start', afterEnterComplete );

			// Assign and enter panorama
			(this.panorama = pano).onEnter();
			
		}

	};

	/**
	 * Event handler to execute commands from child objects
	 * @param {object} event - The dispatched event with method as function name and data as an argument
	 */
	PANOLENS.Viewer.prototype.eventHandler = function ( event ) {

		if ( event.method && this[ event.method ] ) {

			this[ event.method ]( event.data );

		}

	};

	/**
	 * Dispatch event to all descendants
	 * @param  {object} event - Event to be passed along
	 */
	PANOLENS.Viewer.prototype.dispatchEventToChildren = function ( event ) {

		this.scene.traverse( function ( object ) {

			if ( object.dispatchEvent ) {

				object.dispatchEvent( event );

			}

		});

	};

	/**
	 * Set widget content
	 * @param  {integer} controlIndex - Control index
	 * @param  {PANOLENS.Modes} mode - Modes for effects
	 */
	PANOLENS.Viewer.prototype.activateWidgetItem = function ( controlIndex, mode ) {

		var mainMenu = this.widget.mainMenu;
		var ControlMenuItem = mainMenu.children[ 0 ];
		var ModeMenuItem = mainMenu.children[ 1 ];

		var item;

		if ( controlIndex !== undefined ) {

			switch ( controlIndex ) {

				case 0:

					item = ControlMenuItem.subMenu.children[ 1 ];

					break;

				case 1:

					item = ControlMenuItem.subMenu.children[ 2 ];

					break;
					
				default:

					item = ControlMenuItem.subMenu.children[ 1 ];

					break;	

			}

			ControlMenuItem.subMenu.setActiveItem( item )
			ControlMenuItem.setSelectionTitle( item.textContent );

		}

		if ( mode !== undefined ) {

			switch( mode ) {

				case PANOLENS.Modes.CARDBOARD:

					item = ModeMenuItem.subMenu.children[ 2 ];

					break;

				case PANOLENS.Modes.STEREO:

					item = ModeMenuItem.subMenu.children[ 3 ];
					
					break;

				default:

					item = ModeMenuItem.subMenu.children[ 1 ];

					break;
			}

			ModeMenuItem.subMenu.setActiveItem( item )
			ModeMenuItem.setSelectionTitle( item.textContent );

		}

	};

	/**
	 * Enable rendering effect
	 * @param  {PANOLENS.Modes} mode - Modes for effects
	 */
	PANOLENS.Viewer.prototype.enableEffect = function ( mode ) {

		if ( this.mode === mode ) { return; }
		if ( mode === PANOLENS.Modes.NORMAL ) { this.disableEffect(); return; }
		else { this.mode = mode; }

		var fov = this.camera.fov;

		switch( mode ) {

			case PANOLENS.Modes.CARDBOARD:

				this.effect = this.CardboardEffect;
				this.enableReticleControl();

				break;

			case PANOLENS.Modes.STEREO:

				this.effect = this.StereoEffect;
				this.enableReticleControl();
				
				break;

			default:

				this.effect = null;
				this.disableReticleControl();

				break;

		}

		this.activateWidgetItem( undefined, this.mode );

		/**
		 * Dual eye effect event
		 * @type {object}
		 * @event PANOLENS.Viewer#panolens-dual-eye-effect
		 * @event PANOLENS.Infospot#panolens-dual-eye-effect
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

		// Force effect stereo camera to update by refreshing fov
		this.camera.fov = fov + 10e-3;
		this.effect.setSize( this.container.clientWidth, this.container.clientHeight );
		this.render();
		this.camera.fov = fov;

	};

	/**
	 * Disable additional rendering effect
	 */
	PANOLENS.Viewer.prototype.disableEffect = function () {

		if ( this.mode === PANOLENS.Modes.NORMAL ) { return; }

		this.mode = PANOLENS.Modes.NORMAL;
		this.disableReticleControl();

		this.activateWidgetItem( undefined, this.mode );

		/**
		 * Dual eye effect event
		 * @type {object}
		 * @event PANOLENS.Viewer#panolens-dual-eye-effect
		 * @event PANOLENS.Infospot#panolens-dual-eye-effect
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.render();
	};

	/**
	 * Enable reticle control
	 */
	PANOLENS.Viewer.prototype.enableReticleControl = function () {

		if ( this.reticle.visible ) { return; }
		if ( !this.reticle.textureLoaded ) { this.reticle.loadTextures(); }

		this.tempEnableReticle = true;

		// Register reticle event and unregister mouse event
		this.unregisterMouseAndTouchEvents();
		this.reticle.show();
		this.registerReticleEvent();
		this.updateReticleEvent();

	};

	/**
	 * Disable reticle control
	 */
	PANOLENS.Viewer.prototype.disableReticleControl = function () {

		this.tempEnableReticle = false;

		// Register mouse event and unregister reticle event
		if ( !this.options.enableReticle ) {

			this.reticle.hide();
			this.unregisterReticleEvent();
			this.registerMouseAndTouchEvents();

		} else {

			this.updateReticleEvent();

		}

	};

	/**
	 * Toggle video play or stop
	 * @fires PANOLENS.Viewer#video-toggle
	 */
	PANOLENS.Viewer.prototype.toggleVideoPlay = function ( pause ) {

		if ( this.panorama instanceof PANOLENS.VideoPanorama ) {

			/**
			 * Toggle video event
			 * @type {object}
			 * @event PANOLENS.Viewer#video-toggle
			 */
			this.panorama.dispatchEvent( { type: 'video-toggle', pause: pause } );

		}

	};

	/**
	 * Set currentTime in a video
	 * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	 * @fires PANOLENS.Viewer#video-time
	 */
	PANOLENS.Viewer.prototype.setVideoCurrentTime = function ( percentage ) {

		if ( this.panorama instanceof PANOLENS.VideoPanorama ) {

			/**
			 * Setting video time event
			 * @type {object}
			 * @event PANOLENS.Viewer#video-time
			 * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
			 */
			this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

		}

	};

	/**
	 * This will be called when video updates if an widget is present
	 * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	 * @fires PANOLENS.Viewer#video-update
	 */
	PANOLENS.Viewer.prototype.onVideoUpdate = function ( percentage ) {

		/**
		 * Video update event
		 * @type {object}
		 * @event PANOLENS.Viewer#video-update
		 * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-update', percentage: percentage } );

	};

	/**
	 * Add update callback to be called every animation frame
	 */
	PANOLENS.Viewer.prototype.addUpdateCallback = function ( fn ) {

		if ( fn ) {

			this.updateCallbacks.push( fn );

		}

	};

	/**
	 * Remove update callback
	 * @param  {Function} fn - The function to be removed
	 */
	PANOLENS.Viewer.prototype.removeUpdateCallback = function ( fn ) {

		var index = this.updateCallbacks.indexOf( fn );

		if ( fn && index >= 0 ) {

			this.updateCallbacks.splice( index, 1 );

		}

	};

	/**
	 * Show video widget
	 */
	PANOLENS.Viewer.prototype.showVideoWidget = function () {

		/**
		 * Show video widget event
		 * @type {object}
		 * @event PANOLENS.Viewer#video-control-show
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-control-show' } );

	};

	/**
	 * Hide video widget
	 */
	PANOLENS.Viewer.prototype.hideVideoWidget = function () {

		/**
		 * Hide video widget
		 * @type {object}
		 * @event PANOLENS.Viewer#video-control-hide
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-control-hide' } );

	};

	PANOLENS.Viewer.prototype.updateVideoPlayButton = function ( paused ) {

		if ( this.widget && 
			 this.widget.videoElement && 
			 this.widget.videoElement.controlButton ) {

			this.widget.videoElement.controlButton.update( paused );

		}

	};

	/**
	 * Add default panorama event listeners
	 * @param {PANOLENS.Panorama} pano - The panorama to be added with event listener
	 */
	PANOLENS.Viewer.prototype.addPanoramaEventListener = function ( pano ) {

		var scope = this;

		// Set camera control on every panorama
		pano.addEventListener( 'enter-fade-start', this.setCameraControl.bind( this ) );

		// Show and hide widget event only when it's PANOLENS.VideoPanorama
		if ( pano instanceof PANOLENS.VideoPanorama ) {

			pano.addEventListener( 'enter-fade-start', this.showVideoWidget.bind( this ) );
			pano.addEventListener( 'leave', function () {

				if ( !(this.panorama instanceof PANOLENS.VideoPanorama) ) {

					this.hideVideoWidget.call( this );

				}
				
			}.bind( this ) );

		}

	};

	/**
	 * Set camera control
	 */
	PANOLENS.Viewer.prototype.setCameraControl = function () {

		this.OrbitControls.target.copy( this.panorama.position );

	};

	/**
	 * Get current camera control
	 * @return {object} - Current navigation control. THREE.OrbitControls or THREE.DeviceOrientationControls
	 */
	PANOLENS.Viewer.prototype.getControl = function () {

		return this.control;

	},

	/**
	 * Get scene
	 * @return {THREE.Scene} - Current scene which the viewer is built on
	 */
	PANOLENS.Viewer.prototype.getScene = function () {

		return this.scene;

	};

	/**
	 * Get camera
	 * @return {THREE.Camera} - The scene camera
	 */
	PANOLENS.Viewer.prototype.getCamera = function () {

		return this.camera;

	},

	/**
	 * Get renderer
	 * @return {THREE.WebGLRenderer} - The renderer using webgl
	 */
	PANOLENS.Viewer.prototype.getRenderer = function () {

		return this.renderer;

	};

	/**
	 * Get container
	 * @return {HTMLDOMElement} - The container holds rendererd canvas
	 */
	PANOLENS.Viewer.prototype.getContainer = function () {

		return this.container;

	};

	/**
	 * Get control name
	 * @return {string} - Control name. 'orbit' or 'device-orientation'
	 */
	PANOLENS.Viewer.prototype.getControlName = function () {

		return this.control.name;

	};

	/**
	 * Get next navigation control name
	 * @return {string} - Next control name
	 */
	PANOLENS.Viewer.prototype.getNextControlName = function () {

		return this.controls[ this.getNextControlIndex() ].name;

	};

	/**
	 * Get next navigation control index
	 * @return {number} - Next control index
	 */
	PANOLENS.Viewer.prototype.getNextControlIndex = function () {

		var controls, control, nextIndex;

		controls = this.controls;
		control = this.control;
		nextIndex = controls.indexOf( control ) + 1;

		return ( nextIndex >= controls.length ) ? 0 : nextIndex;

	};

	/**
	 * Set field of view of camera
	 */
	PANOLENS.Viewer.prototype.setCameraFov = function ( fov ) {

		this.camera.fov = fov;
		this.camera.updateProjectionMatrix();

	};

	/**
	 * Enable control by index
	 * @param  {PANOLENS.Controls} index - Index of camera control
	 */
	PANOLENS.Viewer.prototype.enableControl = function ( index ) {

		index = ( index >= 0 && index < this.controls.length ) ? index : 0;

		this.control.enabled = false;

		this.control = this.controls[ index ];

		this.control.enabled = true;

		switch ( index ) {

			case PANOLENS.Controls.ORBIT:

				this.camera.position.copy( this.panorama.position );
				this.camera.position.z += 1;

				break;

			case PANOLENS.Controls.DEVICEORIENTATION:

				this.camera.position.copy( this.panorama.position );

				break;

			default:

				break;
		}

		this.control.update();

		this.activateWidgetItem( index, undefined );

	};

	/**
	 * Disable current control
	 */
	PANOLENS.Viewer.prototype.disableControl = function () {

		this.control.enabled = false;

	};

	/**
	 * Toggle next control
	 */
	PANOLENS.Viewer.prototype.toggleNextControl = function () {

		this.enableControl( this.getNextControlIndex() );

	};

	/**
	 * Screen Space Projection
	 */
	PANOLENS.Viewer.prototype.getScreenVector = function ( worldVector ) {

		var vector = worldVector.clone();
		var widthHalf = ( this.container.clientWidth ) / 2;
		var heightHalf = this.container.clientHeight / 2;

		vector.project( this.camera );

		vector.x = ( vector.x * widthHalf ) + widthHalf;
		vector.y = - ( vector.y * heightHalf ) + heightHalf;
		vector.z = 0;

		return vector;

	};

	/**
	 * Check Sprite in Viewport
	 */
	PANOLENS.Viewer.prototype.checkSpriteInViewport = function ( sprite ) {

		this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
		this.cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
		this.cameraFrustum.setFromMatrix( this.cameraViewProjectionMatrix );

		return sprite.visible && this.cameraFrustum.intersectsSprite( sprite );

	};

	/**
	 * Reverse dragging direction
	 */
	PANOLENS.Viewer.prototype.reverseDraggingDirection = function () {

		this.OrbitControls.rotateSpeed *= -1;
		this.OrbitControls.momentumScalingFactor *= -1;

	};

	/**
	 * Add reticle 
	 */
	PANOLENS.Viewer.prototype.addReticle = function () {

		this.reticle = new PANOLENS.Reticle( 0xffffff, 
			this.options.autoReticleSelect,
			PANOLENS.DataImage.ReticleIdle, 
			PANOLENS.DataImage.ReticleDwell, 
			this.options.dwellTime,
			45 );
		this.reticle.position.z = -10;
		this.camera.add( this.reticle );
		this.scene.add( this.camera );

	};

	/**
	 * Tween control looking center
	 * @param {THREE.Vector3} vector - Vector to be looked at the center
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	PANOLENS.Viewer.prototype.tweenControlCenter = function ( vector, duration, easing ) {

		if ( this.control !== this.OrbitControls ) {

			return;

		}

		// Pass in arguments as array
		if ( vector instanceof Array ) {

			duration = vector[ 1 ];
			easing = vector[ 2 ];
			vector = vector[ 0 ];

		}

		duration = duration !== undefined ? duration : 1000;
		easing = easing || TWEEN.Easing.Exponential.Out;

		var scope, ha, va, chv, cvv, hv, vv, vptc, ov, nv;

		scope = this;

		chv = this.camera.getWorldDirection();
		cvv = chv.clone();

		vptc = this.panorama.getWorldPosition().sub( this.camera.getWorldPosition() );

		hv = vector.clone();
		// Scale effect
		hv.x *= -1;
		hv.add( vptc ).normalize();
		vv = hv.clone();

		chv.y = 0;
		hv.y = 0;

		ha = Math.atan2( hv.z, hv.x ) - Math.atan2( chv.z, chv.x );
		ha = ha > Math.PI ? ha - 2 * Math.PI : ha;
		ha = ha < -Math.PI ? ha + 2 * Math.PI : ha;
		va = Math.abs( cvv.angleTo( chv ) + ( cvv.y * vv.y <= 0 ? vv.angleTo( hv ) : -vv.angleTo( hv ) ) );
		va *= vv.y < cvv.y ? 1 : -1;

		ov = { left: 0, up: 0 };
		nv = { left: 0, up: 0 };

		this.tweenLeftAnimation.stop();
		this.tweenUpAnimation.stop();

		this.tweenLeftAnimation = new TWEEN.Tween( ov )
			.to( { left: ha }, duration )
			.easing( easing )
			.onUpdate(function(){
				scope.control.rotateLeft( this.left - nv.left );
				nv.left = this.left;
			})
			.start();

		this.tweenUpAnimation = new TWEEN.Tween( ov )
			.to( { up: va }, duration )
			.easing( easing )
			.onUpdate(function(){
				scope.control.rotateUp( this.up - nv.up );
				nv.up = this.up;
			})
			.start();

	};

	/**
	 * Tween control looking center by object
	 * @param {THREE.Object3D} object - Object to be looked at the center
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	PANOLENS.Viewer.prototype.tweenControlCenterByObject = function ( object, duration, easing ) {

		var isUnderScalePlaceHolder = false;

		object.traverseAncestors( function ( ancestor ) {

			if ( ancestor.scalePlaceHolder ) {

				isUnderScalePlaceHolder = true;

			}
		} );

		if ( isUnderScalePlaceHolder ) {

			var invertXVector = new THREE.Vector3( -1, 1, 1 );

			this.tweenControlCenter( object.getWorldPosition().multiply( invertXVector ), duration, easing );

		} else {

			this.tweenControlCenter( object.getWorldPosition(), duration, easing );

		}

	};

	/**
	 * This is called when window size is changed
	 * @fires PANOLENS.Viewer#window-resize
	 * @param {number} [windowWidth] - Specify if custom element has changed width
	 * @param {number} [windowHeight] - Specify if custom element has changed height
	 */
	PANOLENS.Viewer.prototype.onWindowResize = function ( windowWidth, windowHeight ) {

		var width, height, expand;

		expand = this.container.classList.contains( 'panolens-container' ) || this.container.isFullscreen;

		if ( windowWidth !== undefined && windowHeight !== undefined ) {

			width = windowWidth;
			height = windowHeight;
			this.container._width = windowWidth;
			this.container._height = windowHeight;

		} else {

			width = expand ? Math.max(document.documentElement.clientWidth, window.innerWidth || 0) : this.container.clientWidth;
			height = expand ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : this.container.clientHeight;
			this.container._width = width;
			this.container._height = height;

		}

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( width, height );

		// Update reticle
		if ( this.options.enableReticle || this.tempEnableReticle ) {

			this.updateReticleEvent();

		}

		/**
		 * Window resizing event
		 * @type {object}
		 * @event PANOLENS.Viewer#window-resize
		 * @property {number} width  - Width of the window
		 * @property {number} height - Height of the window
		 */
		this.dispatchEvent( { type: 'window-resize', width: width, height: height });
		this.scene.traverse( function ( object ) {

			if ( object.dispatchEvent ) {

				object.dispatchEvent( { type: 'window-resize', width: width, height: height });

			}

		} );

	};

	PANOLENS.Viewer.prototype.addOutputElement = function () {

		var element = document.createElement( 'div' );
		element.style.position = 'absolute';
		element.style.right = '10px';
		element.style.top = '10px';
		element.style.color = "#fff";
		this.container.appendChild( element );
		this.outputDivElement = element;

	};

	/**
	 * Output infospot attach position in developer console by holding down Ctrl button
	 */
	PANOLENS.Viewer.prototype.outputInfospotPosition = function () {

		var intersects, point, panoramaWorldPosition, outputPosition;

		intersects = this.raycaster.intersectObject( this.panorama, true );

		if ( intersects.length > 0 ) {

			point = intersects[0].point;
			panoramaWorldPosition = this.panorama.getWorldPosition();

			// Panorama is scaled -1 on X axis
			outputPosition = new THREE.Vector3(
				-(point.x - panoramaWorldPosition.x).toFixed(2),
				(point.y - panoramaWorldPosition.y).toFixed(2),
				(point.z - panoramaWorldPosition.z).toFixed(2)
			);

			switch ( this.options.output ) {

				case 'console':
					console.info( outputPosition.x + ', ' + outputPosition.y + ', ' + outputPosition.z );
					break;

				case 'overlay':
					this.outputDivElement.textContent = outputPosition.x + ', ' + outputPosition.y + ', ' + outputPosition.z;
					break;

				default:
					break;

			}

		}

	};

	PANOLENS.Viewer.prototype.onMouseDown = function ( event ) {

		event.preventDefault();

		this.userMouse.x = ( event.clientX >= 0 ) ? event.clientX : event.touches[0].clientX;
		this.userMouse.y = ( event.clientY >= 0 ) ? event.clientY : event.touches[0].clientY;
		this.userMouse.type = 'mousedown';
		this.onTap( event );

	};

	PANOLENS.Viewer.prototype.onMouseMove = function ( event ) {

		event.preventDefault();
		this.userMouse.type = 'mousemove';
		this.onTap( event );

	};

	PANOLENS.Viewer.prototype.onMouseUp = function ( event ) {

		var onTarget = false, type;

		this.userMouse.type = 'mouseup';

		type = ( this.userMouse.x >= event.clientX - this.options.clickTolerance 
				&& this.userMouse.x <= event.clientX + this.options.clickTolerance
				&& this.userMouse.y >= event.clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.clientY + this.options.clickTolerance ) 
				||  ( event.changedTouches 
				&& this.userMouse.x >= event.changedTouches[0].clientX - this.options.clickTolerance
				&& this.userMouse.x <= event.changedTouches[0].clientX + this.options.clickTolerance 
				&& this.userMouse.y >= event.changedTouches[0].clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.changedTouches[0].clientY + this.options.clickTolerance ) 
		? 'click' : undefined;

		// Event should happen on canvas
		if ( event && event.target && !event.target.classList.contains( 'panolens-canvas' ) ) { return; }

		event.preventDefault();

		if ( event.changedTouches && event.changedTouches.length === 1 ) {

			onTarget = this.onTap( { clientX : event.changedTouches[0].clientX, clientY : event.changedTouches[0].clientY }, type );
		
		} else {

			onTarget = this.onTap( event, type );

		}

		this.userMouse.type = 'none';

		if ( onTarget ) { 

			return; 

		}

		if ( type === 'click' ) {

			this.options.autoHideInfospot && this.panorama && this.panorama.toggleInfospotVisibility();
			this.options.autoHideControlBar && this.toggleControlBar();

		}

	};

	PANOLENS.Viewer.prototype.onTap = function ( event, type ) {

		var intersects, intersect_entity, intersect;

		this.raycasterPoint.x = ( ( event.clientX - this.container.offsetLeft ) / this.container.clientWidth ) * 2 - 1;
		this.raycasterPoint.y = - ( ( event.clientY - this.container.offsetTop ) / this.container.clientHeight ) * 2 + 1;

		this.raycaster.setFromCamera( this.raycasterPoint, this.camera );

		// Return if no panorama 
		if ( !this.panorama ) { 

			return; 

		}

		// output infospot information
		if ( event.type !== 'mousedown' && PANOLENS.Utils.checkTouchSupported() || this.OUTPUT_INFOSPOT ) { 

			this.outputInfospotPosition(); 

		}

		intersects = this.raycaster.intersectObjects( this.panorama.children, true );

		intersect_entity = this.getConvertedIntersect( intersects );

		intersect = ( intersects.length > 0 ) ? intersects[0].object : intersect;

		if ( this.userMouse.type === 'mouseup'  ) {

			if ( intersect_entity && this.pressEntityObject === intersect_entity && this.pressEntityObject.dispatchEvent ) {

				this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

			}

			this.pressEntityObject = undefined;

		}

		if ( this.userMouse.type === 'mouseup'  ) {

			if ( intersect && this.pressObject === intersect && this.pressObject.dispatchEvent ) {

				this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

			}

			this.pressObject = undefined;

		}

		if ( type === 'click' ) {

			this.panorama.dispatchEvent( { type: 'click', intersects: intersects, mouseEvent: event } );

			if ( intersect_entity && intersect_entity.dispatchEvent ) {

				intersect_entity.dispatchEvent( { type: 'click-entity', mouseEvent: event } );

			}

			if ( intersect && intersect.dispatchEvent ) {

				intersect.dispatchEvent( { type: 'click', mouseEvent: event } );

			}

		} else {

			this.panorama.dispatchEvent( { type: 'hover', intersects: intersects, mouseEvent: event } );

			if ( ( this.hoverObject && intersects.length > 0 && this.hoverObject !== intersect_entity )
				|| ( this.hoverObject && intersects.length === 0 ) ){

				if ( this.hoverObject.dispatchEvent ) {

					this.hoverObject.dispatchEvent( { type: 'hoverleave', mouseEvent: event } );

					// Cancel dwelling
					this.reticle.cancelDwelling();

				}

				this.hoverObject = undefined;

			}

			if ( intersect_entity && intersects.length > 0 ) {

				if ( this.hoverObject !== intersect_entity ) {

					this.hoverObject = intersect_entity;

					if ( this.hoverObject.dispatchEvent ) {

						this.hoverObject.dispatchEvent( { type: 'hoverenter', mouseEvent: event } );

						// Start reticle timer
						if ( this.options.autoReticleSelect && this.options.enableReticle || this.tempEnableReticle ) {
							this.reticle.startDwelling( this.onTap.bind( this, event, 'click' ) );
						}

					}

				}

				if ( this.userMouse.type === 'mousedown' && this.pressEntityObject != intersect_entity ) {

					this.pressEntityObject = intersect_entity;

					if ( this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressstart-entity', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousedown' && this.pressObject != intersect ) {

					this.pressObject = intersect;

					if ( this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressstart', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousemove' || this.options.enableReticle ) {

					if ( intersect && intersect.dispatchEvent ) {

						intersect.dispatchEvent( { type: 'hover', mouseEvent: event } );

					}

					if ( this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressmove-entity', mouseEvent: event } );

					}

					if ( this.pressObject && this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressmove', mouseEvent: event } );

					}

				}

			}

			if ( !intersect_entity && this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

				this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

				this.pressEntityObject = undefined;

			}

			if ( !intersect && this.pressObject && this.pressObject.dispatchEvent ) {

				this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

				this.pressObject = undefined;

			}

		}

		// Infospot handler
		if ( intersect && intersect instanceof PANOLENS.Infospot ) {

			this.infospot = intersect;
			
			if ( type === 'click' ) {

				return true;

			}
			

		} else if ( this.infospot ) {

			this.hideInfospot();

		}

	};

	PANOLENS.Viewer.prototype.getConvertedIntersect = function ( intersects ) {

		var intersect;

		for ( var i = 0; i < intersects.length; i++ ) {

			if ( intersects[i].distance >= 0 && intersects[i].object && !intersects[i].object.passThrough ) {

				if ( intersects[i].object.entity && intersects[i].object.entity.passThrough ) {
					continue;
				} else if ( intersects[i].object.entity && !intersects[i].object.entity.passThrough ) {
					intersect = intersects[i].object.entity;
					break;
				} else {
					intersect = intersects[i].object;
					break;
				}

			}

		}

		return intersect;

	};

	PANOLENS.Viewer.prototype.hideInfospot = function ( intersects ) {

		if ( this.infospot ) {

			this.infospot.onHoverEnd();

			this.infospot = undefined;

		}

	};

	/**
	 * Toggle control bar
	 * @fires [PANOLENS.Viewer#control-bar-toggle]
	 */
	PANOLENS.Viewer.prototype.toggleControlBar = function () {

		/**
		 * Toggle control bar event
		 * @type {object}
		 * @event PANOLENS.Viewer#control-bar-toggle
		 */
		this.widget && this.widget.dispatchEvent( { type: 'control-bar-toggle' } );

	};

	PANOLENS.Viewer.prototype.onKeyDown = function ( event ) {

		if ( this.options.output && this.options.output !== 'none' && event.key === 'Control' ) {

			this.OUTPUT_INFOSPOT = true;

		}

	};

	PANOLENS.Viewer.prototype.onKeyUp = function ( event ) {

		this.OUTPUT_INFOSPOT = false;

	};

	/**
	 * Update control and callbacks
	 */
	PANOLENS.Viewer.prototype.update = function () {

		TWEEN.update();

		this.updateCallbacks.forEach( function( callback ){ callback(); } );

		this.control.update();

		this.scene.traverse( function( child ){
			if ( child instanceof PANOLENS.Infospot 
				&& child.element 
				&& ( this.hoverObject === child 
					|| child.element.style.display !== 'none' 
					|| (child.element.left && child.element.left.style.display !== 'none')
					|| (child.element.right && child.element.right.style.display !== 'none') ) ) {
				if ( this.checkSpriteInViewport( child ) ) {
					var vector = this.getScreenVector( child.getWorldPosition() );
					child.translateElement( vector.x, vector.y );
				} else {
					child.onDismiss();
				}
				
			}
		}.bind(this) );

	};

	/**
	 * Rendering function to be called on every animation frame
	 */
	PANOLENS.Viewer.prototype.render = function () {

		if ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) {

			this.effect.render( this.scene, this.camera );

		} else {

			this.renderer.render( this.scene, this.camera );

		}

	};

	PANOLENS.Viewer.prototype.animate = function () {

		this.requestAnimationId = window.requestAnimationFrame( this.animate.bind( this ) );

		this.onChange();

	};

	PANOLENS.Viewer.prototype.onChange = function () {

		this.update();
		this.render();

	};

	/**
	 * Register mouse and touch event on container
	 */
	PANOLENS.Viewer.prototype.registerMouseAndTouchEvents = function () {

		this.container.addEventListener( 'mousedown' , 	this.HANDLER_MOUSE_DOWN, false );
		this.container.addEventListener( 'mousemove' , 	this.HANDLER_MOUSE_MOVE, false );
		this.container.addEventListener( 'mouseup'	 , 	this.HANDLER_MOUSE_UP  , false );
		this.container.addEventListener( 'touchstart', 	this.HANDLER_MOUSE_DOWN, false );
		this.container.addEventListener( 'touchend'  , 	this.HANDLER_MOUSE_UP  , false );

	};

	/**
	 * Unregister mouse and touch event on container
	 */
	PANOLENS.Viewer.prototype.unregisterMouseAndTouchEvents = function () {

		this.container.removeEventListener( 'mousedown' ,  this.HANDLER_MOUSE_DOWN, false );
		this.container.removeEventListener( 'mousemove' ,  this.HANDLER_MOUSE_MOVE, false );
		this.container.removeEventListener( 'mouseup'	,  this.HANDLER_MOUSE_UP  , false );
		this.container.removeEventListener( 'touchstart',  this.HANDLER_MOUSE_DOWN, false );
		this.container.removeEventListener( 'touchend'  ,  this.HANDLER_MOUSE_UP  , false );
	};

	/**
	 * Register reticle event
	 */
	PANOLENS.Viewer.prototype.registerReticleEvent = function () {

		this.addUpdateCallback( this.HANDLER_TAP );

	};

	/**
	 * Unregister reticle event
	 */
	PANOLENS.Viewer.prototype.unregisterReticleEvent = function () {

		this.removeUpdateCallback( this.HANDLER_TAP );

	};

	/**
	 * Update reticle event
	 */
	PANOLENS.Viewer.prototype.updateReticleEvent = function () {

		var centerX, centerY;

		centerX = this.container.clientWidth / 2 + this.container.offsetLeft;
		centerY = this.container.clientHeight / 2;

		this.removeUpdateCallback( this.HANDLER_TAP );
		this.HANDLER_TAP = this.onTap.bind( this, { clientX: centerX, clientY: centerY } );
		this.addUpdateCallback( this.HANDLER_TAP );

	};

	/**
	 * Register container and window listeners
	 */
	PANOLENS.Viewer.prototype.registerEventListeners = function () {

		// Resize Event
		window.addEventListener( 'resize' , this.HANDLER_WINDOW_RESIZE, true );

		// Keyboard Event
		window.addEventListener( 'keydown', this.HANDLER_KEY_DOWN, true );
		window.addEventListener( 'keyup'  , this.HANDLER_KEY_UP	 , true );

	};

	/**
	 * Unregister container and window listeners
	 */
	PANOLENS.Viewer.prototype.unregisterEventListeners = function () {

		// Resize Event
		window.removeEventListener( 'resize' , this.HANDLER_WINDOW_RESIZE, true );

		// Keyboard Event
		window.removeEventListener( 'keydown', this.HANDLER_KEY_DOWN, true );
		window.removeEventListener( 'keyup'  , this.HANDLER_KEY_UP  , true );

	};

	/**
	 * Dispose all scene objects and clear cache
	 */
	PANOLENS.Viewer.prototype.dispose = function () {

		// Unregister dom event listeners
		this.unregisterEventListeners();

		// recursive disposal on 3d objects
		function recursiveDispose ( object ) {

			for ( var i = object.children.length - 1; i >= 0; i-- ) {

				recursiveDispose( object.children[i] );
				object.remove( object.children[i] );

			}

			if ( object instanceof PANOLENS.Infospot ) {

				object.dispose();

			}

			object.geometry && object.geometry.dispose();
			object.material && object.material.dispose();
		}

		recursiveDispose( this.scene );

		// dispose widget
		if ( this.widget ) {

			this.widget.dispose();
			this.widget = null;

		}

		// clear cache
		if ( THREE.Cache && THREE.Cache.enabled ) {

			THREE.Cache.clear();

		}

	};

	/**
	 * Destory viewer by disposing and stopping requestAnimationFrame
	 */
	PANOLENS.Viewer.prototype.destory = function () {

		this.dispose();
		this.render();
		window.cancelAnimationFrame( this.requestAnimationId );		

	};

	/**
	 * On panorama dispose
	 */
	PANOLENS.Viewer.prototype.onPanoramaDispose = function ( panorama ) {

		if ( panorama instanceof PANOLENS.VideoPanorama ) {

			this.hideVideoWidget();

		}

		if ( panorama === this.panorama ) {

			this.panorama = null;

		}

	};

	/**
	 * Load ajax call
	 * @param {string} url - URL to be requested
	 * @param {function} [callback] - Callback after request completes
	 */
	PANOLENS.Viewer.prototype.loadAsyncRequest = function ( url, callback ) {

		var request = new XMLHttpRequest();
		request.onloadend = function ( event ) {
			callback && callback( event );
		};
		request.open( "GET", url, true );
		request.send( null );

	};

	/**
	 * View indicator in upper left
	 * */
	PANOLENS.Viewer.prototype.addViewIndicator = function () {

		var scope = this;

		function loadViewIndicator ( asyncEvent ) {

			if ( asyncEvent.loaded === 0 ) return;

			var viewIndicatorDiv = asyncEvent.target.responseXML.documentElement;
			viewIndicatorDiv.style.width = scope.viewIndicatorSize + "px";
			viewIndicatorDiv.style.height = scope.viewIndicatorSize + "px";
			viewIndicatorDiv.style.position = "absolute";
			viewIndicatorDiv.style.top = "10px";
			viewIndicatorDiv.style.left = "10px";
			viewIndicatorDiv.style.opacity = "0.5";
			viewIndicatorDiv.style.cursor = "pointer";
			viewIndicatorDiv.id = "panolens-view-indicator-container";

			scope.container.appendChild( viewIndicatorDiv );

			var indicator = viewIndicatorDiv.querySelector( "#indicator" );
			var setIndicatorD = function () {

				scope.radius = scope.viewIndicatorSize * 0.225;
				scope.currentPanoAngle = scope.camera.rotation.y - THREE.Math.degToRad( 90 );
				scope.fovAngle = THREE.Math.degToRad( scope.camera.fov ) ;
				scope.leftAngle = -scope.currentPanoAngle - scope.fovAngle / 2;
				scope.rightAngle = -scope.currentPanoAngle + scope.fovAngle / 2;
				scope.leftX = scope.radius * Math.cos( scope.leftAngle );
				scope.leftY = scope.radius * Math.sin( scope.leftAngle );
				scope.rightX = scope.radius * Math.cos( scope.rightAngle );
				scope.rightY = scope.radius * Math.sin( scope.rightAngle );
				scope.indicatorD = "M " + scope.leftX + " " + scope.leftY + " A " + scope.radius + " " + scope.radius + " 0 0 1 " + scope.rightX + " " + scope.rightY;

				if ( scope.leftX && scope.leftY && scope.rightX && scope.rightY && scope.radius ) {

					indicator.setAttribute( "d", scope.indicatorD );

				}

			};

			scope.addUpdateCallback( setIndicatorD );

			var indicatorOnMouseEnter = function () {

				this.style.opacity = "1";

			};

			var indicatorOnMouseLeave = function () {

				this.style.opacity = "0.5";

			};

			viewIndicatorDiv.addEventListener( "mouseenter", indicatorOnMouseEnter );
			viewIndicatorDiv.addEventListener( "mouseleave", indicatorOnMouseLeave );
		}

		this.loadAsyncRequest( PANOLENS.DataImage.ViewIndicator, loadViewIndicator );

	};

	/**
	 * Append custom control item to existing control bar
	 * @param {object} [option={}] - Style object to overwirte default element style. It takes 'style', 'onTap' and 'group' properties.
	 */
	PANOLENS.Viewer.prototype.appendControlItem = function ( option ) {

		var item = this.widget.createCustomItem( option );		

		if ( option.group === 'video' ) {

			this.widget.videoElement.appendChild( item );

		} else {

			this.widget.barElement.appendChild( item );

		}

		return item;

	};

} )();
;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	var createLayout = require('layout-bmfont-text')
	var inherits = require('inherits')
	var createIndices = require('quad-indices')
	var buffer = require('three-buffer-vertex-data')
	var assign = require('object-assign')

	var vertices = require('./lib/vertices')
	var utils = require('./lib/utils')

	var Base = THREE.BufferGeometry

	module.exports = function createTextGeometry (opt) {
	  return new TextGeometry(opt)
	}

	function TextGeometry (opt) {
	  Base.call(this)

	  if (typeof opt === 'string') {
	    opt = { text: opt }
	  }

	  // use these as default values for any subsequent
	  // calls to update()
	  this._opt = assign({}, opt)

	  // also do an initial setup...
	  if (opt) this.update(opt)
	}

	inherits(TextGeometry, Base)

	TextGeometry.prototype.update = function (opt) {
	  if (typeof opt === 'string') {
	    opt = { text: opt }
	  }

	  // use constructor defaults
	  opt = assign({}, this._opt, opt)

	  if (!opt.font) {
	    throw new TypeError('must specify a { font } in options')
	  }

	  this.layout = createLayout(opt)

	  // get vec2 texcoords
	  var flipY = opt.flipY !== false

	  // the desired BMFont data
	  var font = opt.font

	  // determine texture size from font file
	  var texWidth = font.common.scaleW
	  var texHeight = font.common.scaleH

	  // get visible glyphs
	  var glyphs = this.layout.glyphs.filter(function (glyph) {
	    var bitmap = glyph.data
	    return bitmap.width * bitmap.height > 0
	  })

	  // provide visible glyphs for convenience
	  this.visibleGlyphs = glyphs

	  // get common vertex data
	  var positions = vertices.positions(glyphs)
	  var uvs = vertices.uvs(glyphs, texWidth, texHeight, flipY)
	  var indices = createIndices({
	    clockwise: true,
	    type: 'uint16',
	    count: glyphs.length
	  })

	  // update vertex data
	  buffer.index(this, indices, 1, 'uint16')
	  buffer.attr(this, 'position', positions, 2)
	  buffer.attr(this, 'uv', uvs, 2)

	  // update multipage data
	  if (!opt.multipage && 'page' in this.attributes) {
	    // disable multipage rendering
	    this.removeAttribute('page')
	  } else if (opt.multipage) {
	    var pages = vertices.pages(glyphs)
	    // enable multipage rendering
	    buffer.attr(this, 'page', pages, 1)
	  }
	}

	TextGeometry.prototype.computeBoundingSphere = function () {
	  if (this.boundingSphere === null) {
	    this.boundingSphere = new THREE.Sphere()
	  }

	  var positions = this.attributes.position.array
	  var itemSize = this.attributes.position.itemSize
	  if (!positions || !itemSize || positions.length < 2) {
	    this.boundingSphere.radius = 0
	    this.boundingSphere.center.set(0, 0, 0)
	    return
	  }
	  utils.computeSphere(positions, this.boundingSphere)
	  if (isNaN(this.boundingSphere.radius)) {
	    console.error('THREE.BufferGeometry.computeBoundingSphere(): ' +
	      'Computed radius is NaN. The ' +
	      '"position" attribute is likely to have NaN values.')
	  }
	}

	TextGeometry.prototype.computeBoundingBox = function () {
	  if (this.boundingBox === null) {
	    this.boundingBox = new THREE.Box3()
	  }

	  var bbox = this.boundingBox
	  var positions = this.attributes.position.array
	  var itemSize = this.attributes.position.itemSize
	  if (!positions || !itemSize || positions.length < 2) {
	    bbox.makeEmpty()
	    return
	  }
	  utils.computeBox(positions, bbox)
	}

	},{"./lib/utils":2,"./lib/vertices":3,"inherits":4,"layout-bmfont-text":5,"object-assign":26,"quad-indices":27,"three-buffer-vertex-data":31}],2:[function(require,module,exports){
	var itemSize = 2
	var box = { min: [0, 0], max: [0, 0] }

	function bounds (positions) {
	  var count = positions.length / itemSize
	  box.min[0] = positions[0]
	  box.min[1] = positions[1]
	  box.max[0] = positions[0]
	  box.max[1] = positions[1]

	  for (var i = 0; i < count; i++) {
	    var x = positions[i * itemSize + 0]
	    var y = positions[i * itemSize + 1]
	    box.min[0] = Math.min(x, box.min[0])
	    box.min[1] = Math.min(y, box.min[1])
	    box.max[0] = Math.max(x, box.max[0])
	    box.max[1] = Math.max(y, box.max[1])
	  }
	}

	module.exports.computeBox = function (positions, output) {
	  bounds(positions)
	  output.min.set(box.min[0], box.min[1], 0)
	  output.max.set(box.max[0], box.max[1], 0)
	}

	module.exports.computeSphere = function (positions, output) {
	  bounds(positions)
	  var minX = box.min[0]
	  var minY = box.min[1]
	  var maxX = box.max[0]
	  var maxY = box.max[1]
	  var width = maxX - minX
	  var height = maxY - minY
	  var length = Math.sqrt(width * width + height * height)
	  output.center.set(minX + width / 2, minY + height / 2, 0)
	  output.radius = length / 2
	}

	},{}],3:[function(require,module,exports){
	module.exports.pages = function pages (glyphs) {
	  var pages = new Float32Array(glyphs.length * 4 * 1)
	  var i = 0
	  glyphs.forEach(function (glyph) {
	    var id = glyph.data.page || 0
	    pages[i++] = id
	    pages[i++] = id
	    pages[i++] = id
	    pages[i++] = id
	  })
	  return pages
	}

	module.exports.uvs = function uvs (glyphs, texWidth, texHeight, flipY) {
	  var uvs = new Float32Array(glyphs.length * 4 * 2)
	  var i = 0
	  glyphs.forEach(function (glyph) {
	    var bitmap = glyph.data
	    var bw = (bitmap.x + bitmap.width)
	    var bh = (bitmap.y + bitmap.height)

	    // top left position
	    var u0 = bitmap.x / texWidth
	    var v1 = bitmap.y / texHeight
	    var u1 = bw / texWidth
	    var v0 = bh / texHeight

	    if (flipY) {
	      v1 = (texHeight - bitmap.y) / texHeight
	      v0 = (texHeight - bh) / texHeight
	    }

	    // BL
	    uvs[i++] = u0
	    uvs[i++] = v1
	    // TL
	    uvs[i++] = u0
	    uvs[i++] = v0
	    // TR
	    uvs[i++] = u1
	    uvs[i++] = v0
	    // BR
	    uvs[i++] = u1
	    uvs[i++] = v1
	  })
	  return uvs
	}

	module.exports.positions = function positions (glyphs) {
	  var positions = new Float32Array(glyphs.length * 4 * 2)
	  var i = 0
	  glyphs.forEach(function (glyph) {
	    var bitmap = glyph.data

	    // bottom left position
	    var x = glyph.position[0] + bitmap.xoffset
	    var y = glyph.position[1] + bitmap.yoffset

	    // quad size
	    var w = bitmap.width
	    var h = bitmap.height

	    // BL
	    positions[i++] = x
	    positions[i++] = y
	    // TL
	    positions[i++] = x
	    positions[i++] = y + h
	    // TR
	    positions[i++] = x + w
	    positions[i++] = y + h
	    // BR
	    positions[i++] = x + w
	    positions[i++] = y
	  })
	  return positions
	}

	},{}],4:[function(require,module,exports){
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}

	},{}],5:[function(require,module,exports){
	var wordWrap = require('word-wrapper')
	var xtend = require('xtend')
	var findChar = require('indexof-property')('id')
	var number = require('as-number')

	var X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z']
	var M_WIDTHS = ['m', 'w']
	var CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


	var TAB_ID = '\t'.charCodeAt(0)
	var SPACE_ID = ' '.charCodeAt(0)
	var ALIGN_LEFT = 0, 
	    ALIGN_CENTER = 1, 
	    ALIGN_RIGHT = 2

	module.exports = function createLayout(opt) {
	  return new TextLayout(opt)
	}

	function TextLayout(opt) {
	  this.glyphs = []
	  this._measure = this.computeMetrics.bind(this)
	  this.update(opt)
	}

	TextLayout.prototype.update = function(opt) {
	  opt = xtend({
	    measure: this._measure
	  }, opt)
	  this._opt = opt
	  this._opt.tabSize = number(this._opt.tabSize, 4)

	  if (!opt.font)
	    throw new Error('must provide a valid bitmap font')

	  var glyphs = this.glyphs
	  var text = opt.text||'' 
	  var font = opt.font
	  this._setupSpaceGlyphs(font)
	  
	  var lines = wordWrap.lines(text, opt)
	  var minWidth = opt.width || 0

	  //clear glyphs
	  glyphs.length = 0

	  //get max line width
	  var maxLineWidth = lines.reduce(function(prev, line) {
	    return Math.max(prev, line.width, minWidth)
	  }, 0)

	  //the pen position
	  var x = 0
	  var y = 0
	  var lineHeight = number(opt.lineHeight, font.common.lineHeight)
	  var baseline = font.common.base
	  var descender = lineHeight-baseline
	  var letterSpacing = opt.letterSpacing || 0
	  var height = lineHeight * lines.length - descender
	  var align = getAlignType(this._opt.align)

	  //draw text along baseline
	  y -= height
	  
	  //the metrics for this text layout
	  this._width = maxLineWidth
	  this._height = height
	  this._descender = lineHeight - baseline
	  this._baseline = baseline
	  this._xHeight = getXHeight(font)
	  this._capHeight = getCapHeight(font)
	  this._lineHeight = lineHeight
	  this._ascender = lineHeight - descender - this._xHeight
	    
	  //layout each glyph
	  var self = this
	  lines.forEach(function(line, lineIndex) {
	    var start = line.start
	    var end = line.end
	    var lineWidth = line.width
	    var lastGlyph
	    
	    //for each glyph in that line...
	    for (var i=start; i<end; i++) {
	      var id = text.charCodeAt(i)
	      var glyph = self.getGlyph(font, id)
	      if (glyph) {
	        if (lastGlyph) 
	          x += getKerning(font, lastGlyph.id, glyph.id)

	        var tx = x
	        if (align === ALIGN_CENTER) 
	          tx += (maxLineWidth-lineWidth)/2
	        else if (align === ALIGN_RIGHT)
	          tx += (maxLineWidth-lineWidth)

	        glyphs.push({
	          position: [tx, y],
	          data: glyph,
	          index: i,
	          line: lineIndex
	        })  

	        //move pen forward
	        x += glyph.xadvance + letterSpacing
	        lastGlyph = glyph
	      }
	    }

	    //next line down
	    y += lineHeight
	    x = 0
	  })
	  this._linesTotal = lines.length;
	}

	TextLayout.prototype._setupSpaceGlyphs = function(font) {
	  //These are fallbacks, when the font doesn't include
	  //' ' or '\t' glyphs
	  this._fallbackSpaceGlyph = null
	  this._fallbackTabGlyph = null

	  if (!font.chars || font.chars.length === 0)
	    return

	  //try to get space glyph
	  //then fall back to the 'm' or 'w' glyphs
	  //then fall back to the first glyph available
	  var space = getGlyphById(font, SPACE_ID) 
	          || getMGlyph(font) 
	          || font.chars[0]

	  //and create a fallback for tab
	  var tabWidth = this._opt.tabSize * space.xadvance
	  this._fallbackSpaceGlyph = space
	  this._fallbackTabGlyph = xtend(space, {
	    x: 0, y: 0, xadvance: tabWidth, id: TAB_ID, 
	    xoffset: 0, yoffset: 0, width: 0, height: 0
	  })
	}

	TextLayout.prototype.getGlyph = function(font, id) {
	  var glyph = getGlyphById(font, id)
	  if (glyph)
	    return glyph
	  else if (id === TAB_ID) 
	    return this._fallbackTabGlyph
	  else if (id === SPACE_ID) 
	    return this._fallbackSpaceGlyph
	  return null
	}

	TextLayout.prototype.computeMetrics = function(text, start, end, width) {
	  var letterSpacing = this._opt.letterSpacing || 0
	  var font = this._opt.font
	  var curPen = 0
	  var curWidth = 0
	  var count = 0
	  var glyph
	  var lastGlyph

	  if (!font.chars || font.chars.length === 0) {
	    return {
	      start: start,
	      end: start,
	      width: 0
	    }
	  }

	  end = Math.min(text.length, end)
	  for (var i=start; i < end; i++) {
	    var id = text.charCodeAt(i)
	    var glyph = this.getGlyph(font, id)

	    if (glyph) {
	      //move pen forward
	      var xoff = glyph.xoffset
	      var kern = lastGlyph ? getKerning(font, lastGlyph.id, glyph.id) : 0
	      curPen += kern

	      var nextPen = curPen + glyph.xadvance + letterSpacing
	      var nextWidth = curPen + glyph.width

	      //we've hit our limit; we can't move onto the next glyph
	      if (nextWidth >= width || nextPen >= width)
	        break

	      //otherwise continue along our line
	      curPen = nextPen
	      curWidth = nextWidth
	      lastGlyph = glyph
	    }
	    count++
	  }
	  
	  //make sure rightmost edge lines up with rendered glyphs
	  if (lastGlyph)
	    curWidth += lastGlyph.xoffset

	  return {
	    start: start,
	    end: start + count,
	    width: curWidth
	  }
	}

	//getters for the private vars
	;['width', 'height', 
	  'descender', 'ascender',
	  'xHeight', 'baseline',
	  'capHeight',
	  'lineHeight' ].forEach(addGetter)

	function addGetter(name) {
	  Object.defineProperty(TextLayout.prototype, name, {
	    get: wrapper(name),
	    configurable: true
	  })
	}

	//create lookups for private vars
	function wrapper(name) {
	  return (new Function([
	    'return function '+name+'() {',
	    '  return this._'+name,
	    '}'
	  ].join('\n')))()
	}

	function getGlyphById(font, id) {
	  if (!font.chars || font.chars.length === 0)
	    return null

	  var glyphIdx = findChar(font.chars, id)
	  if (glyphIdx >= 0)
	    return font.chars[glyphIdx]
	  return null
	}

	function getXHeight(font) {
	  for (var i=0; i<X_HEIGHTS.length; i++) {
	    var id = X_HEIGHTS[i].charCodeAt(0)
	    var idx = findChar(font.chars, id)
	    if (idx >= 0) 
	      return font.chars[idx].height
	  }
	  return 0
	}

	function getMGlyph(font) {
	  for (var i=0; i<M_WIDTHS.length; i++) {
	    var id = M_WIDTHS[i].charCodeAt(0)
	    var idx = findChar(font.chars, id)
	    if (idx >= 0) 
	      return font.chars[idx]
	  }
	  return 0
	}

	function getCapHeight(font) {
	  for (var i=0; i<CAP_HEIGHTS.length; i++) {
	    var id = CAP_HEIGHTS[i].charCodeAt(0)
	    var idx = findChar(font.chars, id)
	    if (idx >= 0) 
	      return font.chars[idx].height
	  }
	  return 0
	}

	function getKerning(font, left, right) {
	  if (!font.kernings || font.kernings.length === 0)
	    return 0

	  var table = font.kernings
	  for (var i=0; i<table.length; i++) {
	    var kern = table[i]
	    if (kern.first === left && kern.second === right)
	      return kern.amount
	  }
	  return 0
	}

	function getAlignType(align) {
	  if (align === 'center')
	    return ALIGN_CENTER
	  else if (align === 'right')
	    return ALIGN_RIGHT
	  return ALIGN_LEFT
	}
	},{"as-number":6,"indexof-property":7,"word-wrapper":8,"xtend":9}],6:[function(require,module,exports){
	module.exports = function numtype(num, def) {
	  return typeof num === 'number'
	    ? num 
	    : (typeof def === 'number' ? def : 0)
	}
	},{}],7:[function(require,module,exports){
	module.exports = function compile(property) {
	  if (!property || typeof property !== 'string')
	    throw new Error('must specify property for indexof search')

	  return new Function('array', 'value', 'start', [
	    'start = start || 0',
	    'for (var i=start; i<array.length; i++)',
	    '  if (array[i]["' + property +'"] === value)',
	    '      return i',
	    'return -1'
	  ].join('\n'))
	}
	},{}],8:[function(require,module,exports){
	var newline = /\n/
	var newlineChar = '\n'
	var whitespace = /\s/

	module.exports = function(text, opt) {
	    var lines = module.exports.lines(text, opt)
	    return lines.map(function(line) {
	        return text.substring(line.start, line.end)
	    }).join('\n')
	}

	module.exports.lines = function wordwrap(text, opt) {
	    opt = opt||{}

	    //zero width results in nothing visible
	    if (opt.width === 0 && opt.mode !== 'nowrap') 
	        return []

	    text = text||''
	    var width = typeof opt.width === 'number' ? opt.width : Number.MAX_VALUE
	    var start = Math.max(0, opt.start||0)
	    var end = typeof opt.end === 'number' ? opt.end : text.length
	    var mode = opt.mode

	    var measure = opt.measure || monospace
	    if (mode === 'pre')
	        return pre(measure, text, start, end, width)
	    else
	        return greedy(measure, text, start, end, width, mode)
	}

	function idxOf(text, chr, start, end) {
	    var idx = text.indexOf(chr, start)
	    if (idx === -1 || idx > end)
	        return end
	    return idx
	}

	function isWhitespace(chr) {
	    return whitespace.test(chr)
	}

	function pre(measure, text, start, end, width) {
	    var lines = []
	    var lineStart = start
	    for (var i=start; i<end && i<text.length; i++) {
	        var chr = text.charAt(i)
	        var isNewline = newline.test(chr)

	        //If we've reached a newline, then step down a line
	        //Or if we've reached the EOF
	        if (isNewline || i===end-1) {
	            var lineEnd = isNewline ? i : i+1
	            var measured = measure(text, lineStart, lineEnd, width)
	            lines.push(measured)
	            
	            lineStart = i+1
	        }
	    }
	    return lines
	}

	function greedy(measure, text, start, end, width, mode) {
	    //A greedy word wrapper based on LibGDX algorithm
	    //https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
	    var lines = []

	    var testWidth = width
	    //if 'nowrap' is specified, we only wrap on newline chars
	    if (mode === 'nowrap')
	        testWidth = Number.MAX_VALUE

	    while (start < end && start < text.length) {
	        //get next newline position
	        var newLine = idxOf(text, newlineChar, start, end)

	        //eat whitespace at start of line
	        while (start < newLine) {
	            if (!isWhitespace( text.charAt(start) ))
	                break
	            start++
	        }

	        //determine visible # of glyphs for the available width
	        var measured = measure(text, start, newLine, testWidth)

	        var lineEnd = start + (measured.end-measured.start)
	        var nextStart = lineEnd + newlineChar.length

	        //if we had to cut the line before the next newline...
	        if (lineEnd < newLine) {
	            //find char to break on
	            while (lineEnd > start) {
	                if (isWhitespace(text.charAt(lineEnd)))
	                    break
	                lineEnd--
	            }
	            if (lineEnd === start) {
	                if (nextStart > start + newlineChar.length) nextStart--
	                lineEnd = nextStart // If no characters to break, show all.
	            } else {
	                nextStart = lineEnd
	                //eat whitespace at end of line
	                while (lineEnd > start) {
	                    if (!isWhitespace(text.charAt(lineEnd - newlineChar.length)))
	                        break
	                    lineEnd--
	                }
	            }
	        }
	        if (lineEnd >= start) {
	            var result = measure(text, start, lineEnd, testWidth)
	            lines.push(result)
	        }
	        start = nextStart
	    }
	    return lines
	}

	//determines the visible number of glyphs within a given width
	function monospace(text, start, end, width) {
	    var glyphs = Math.min(width, end-start)
	    return {
	        start: start,
	        end: start+glyphs
	    }
	}
	},{}],9:[function(require,module,exports){
	module.exports = extend

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}

	},{}],10:[function(require,module,exports){
	(function (Buffer){
	var xhr = require('xhr')
	var noop = function(){}
	var parseASCII = require('parse-bmfont-ascii')
	var parseXML = require('parse-bmfont-xml')
	var readBinary = require('parse-bmfont-binary')
	var isBinaryFormat = require('./lib/is-binary')
	var xtend = require('xtend')

	var xml2 = (function hasXML2() {
	  return window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest
	})()

	module.exports = function(opt, cb) {
	  cb = typeof cb === 'function' ? cb : noop

	  if (typeof opt === 'string')
	    opt = { uri: opt }
	  else if (!opt)
	    opt = {}

	  var expectBinary = opt.binary
	  if (expectBinary)
	    opt = getBinaryOpts(opt)

	  xhr(opt, function(err, res, body) {
	    if (err)
	      return cb(err)
	    if (!/^2/.test(res.statusCode))
	      return cb(new Error('http status code: '+res.statusCode))
	    if (!body)
	      return cb(new Error('no body result'))

	    var binary = false 

	    //if the response type is an array buffer,
	    //we need to convert it into a regular Buffer object
	    if (isArrayBuffer(body)) {
	      var array = new Uint8Array(body)
	      body = new Buffer(array, 'binary')
	    }

	    //now check the string/Buffer response
	    //and see if it has a binary BMF header
	    if (isBinaryFormat(body)) {
	      binary = true
	      //if we have a string, turn it into a Buffer
	      if (typeof body === 'string') 
	        body = new Buffer(body, 'binary')
	    } 

	    //we are not parsing a binary format, just ASCII/XML/etc
	    if (!binary) {
	      //might still be a buffer if responseType is 'arraybuffer'
	      if (Buffer.isBuffer(body))
	        body = body.toString(opt.encoding)
	      body = body.trim()
	    }

	    var result
	    try {
	      var type = res.headers['content-type']
	      if (binary)
	        result = readBinary(body)
	      else if (/json/.test(type) || body.charAt(0) === '{')
	        result = JSON.parse(body)
	      else if (/xml/.test(type)  || body.charAt(0) === '<')
	        result = parseXML(body)
	      else
	        result = parseASCII(body)
	    } catch (e) {
	      cb(new Error('error parsing font '+e.message))
	      cb = noop
	    }
	    cb(null, result)
	  })
	}

	function isArrayBuffer(arr) {
	  var str = Object.prototype.toString
	  return str.call(arr) === '[object ArrayBuffer]'
	}

	function getBinaryOpts(opt) {
	  //IE10+ and other modern browsers support array buffers
	  if (xml2)
	    return xtend(opt, { responseType: 'arraybuffer' })
	  
	  if (typeof window.XMLHttpRequest === 'undefined')
	    throw new Error('your browser does not support XHR loading')

	  //IE9 and XML1 browsers could still use an override
	  var req = new window.XMLHttpRequest()
	  req.overrideMimeType('text/plain; charset=x-user-defined')
	  return xtend({
	    xhr: req
	  }, opt)
	}
	}).call(this,require("buffer").Buffer)
	},{"./lib/is-binary":11,"buffer":37,"parse-bmfont-ascii":13,"parse-bmfont-binary":14,"parse-bmfont-xml":15,"xhr":18,"xtend":25}],11:[function(require,module,exports){
	(function (Buffer){
	var equal = require('buffer-equal')
	var HEADER = new Buffer([66, 77, 70, 3])

	module.exports = function(buf) {
	  if (typeof buf === 'string')
	    return buf.substring(0, 3) === 'BMF'
	  return buf.length > 4 && equal(buf.slice(0, 4), HEADER)
	}
	}).call(this,require("buffer").Buffer)
	},{"buffer":37,"buffer-equal":12}],12:[function(require,module,exports){
	var Buffer = require('buffer').Buffer; // for use with browserify

	module.exports = function (a, b) {
	    if (!Buffer.isBuffer(a)) return undefined;
	    if (!Buffer.isBuffer(b)) return undefined;
	    if (typeof a.equals === 'function') return a.equals(b);
	    if (a.length !== b.length) return false;
	    
	    for (var i = 0; i < a.length; i++) {
	        if (a[i] !== b[i]) return false;
	    }
	    
	    return true;
	};

	},{"buffer":37}],13:[function(require,module,exports){
	module.exports = function parseBMFontAscii(data) {
	  if (!data)
	    throw new Error('no data provided')
	  data = data.toString().trim()

	  var output = {
	    pages: [],
	    chars: [],
	    kernings: []
	  }

	  var lines = data.split(/\r\n?|\n/g)

	  if (lines.length === 0)
	    throw new Error('no data in BMFont file')

	  for (var i = 0; i < lines.length; i++) {
	    var lineData = splitLine(lines[i], i)
	    if (!lineData) //skip empty lines
	      continue

	    if (lineData.key === 'page') {
	      if (typeof lineData.data.id !== 'number')
	        throw new Error('malformed file at line ' + i + ' -- needs page id=N')
	      if (typeof lineData.data.file !== 'string')
	        throw new Error('malformed file at line ' + i + ' -- needs page file="path"')
	      output.pages[lineData.data.id] = lineData.data.file
	    } else if (lineData.key === 'chars' || lineData.key === 'kernings') {
	      //... do nothing for these two ...
	    } else if (lineData.key === 'char') {
	      output.chars.push(lineData.data)
	    } else if (lineData.key === 'kerning') {
	      output.kernings.push(lineData.data)
	    } else {
	      output[lineData.key] = lineData.data
	    }
	  }

	  return output
	}

	function splitLine(line, idx) {
	  line = line.replace(/\t+/g, ' ').trim()
	  if (!line)
	    return null

	  var space = line.indexOf(' ')
	  if (space === -1) 
	    throw new Error("no named row at line " + idx)

	  var key = line.substring(0, space)

	  line = line.substring(space + 1)
	  //clear "letter" field as it is non-standard and
	  //requires additional complexity to parse " / = symbols
	  line = line.replace(/letter=[\'\"]\S+[\'\"]/gi, '')  
	  line = line.split("=")
	  line = line.map(function(str) {
	    return str.trim().match((/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g))
	  })

	  var data = []
	  for (var i = 0; i < line.length; i++) {
	    var dt = line[i]
	    if (i === 0) {
	      data.push({
	        key: dt[0],
	        data: ""
	      })
	    } else if (i === line.length - 1) {
	      data[data.length - 1].data = parseData(dt[0])
	    } else {
	      data[data.length - 1].data = parseData(dt[0])
	      data.push({
	        key: dt[1],
	        data: ""
	      })
	    }
	  }

	  var out = {
	    key: key,
	    data: {}
	  }

	  data.forEach(function(v) {
	    out.data[v.key] = v.data;
	  })

	  return out
	}

	function parseData(data) {
	  if (!data || data.length === 0)
	    return ""

	  if (data.indexOf('"') === 0 || data.indexOf("'") === 0)
	    return data.substring(1, data.length - 1)
	  if (data.indexOf(',') !== -1)
	    return parseIntList(data)
	  return parseInt(data, 10)
	}

	function parseIntList(data) {
	  return data.split(',').map(function(val) {
	    return parseInt(val, 10)
	  })
	}
	},{}],14:[function(require,module,exports){
	var HEADER = [66, 77, 70]

	module.exports = function readBMFontBinary(buf) {
	  if (buf.length < 6)
	    throw new Error('invalid buffer length for BMFont')

	  var header = HEADER.every(function(byte, i) {
	    return buf.readUInt8(i) === byte
	  })

	  if (!header)
	    throw new Error('BMFont missing BMF byte header')

	  var i = 3
	  var vers = buf.readUInt8(i++)
	  if (vers > 3)
	    throw new Error('Only supports BMFont Binary v3 (BMFont App v1.10)')
	  
	  var target = { kernings: [], chars: [] }
	  for (var b=0; b<5; b++)
	    i += readBlock(target, buf, i)
	  return target
	}

	function readBlock(target, buf, i) {
	  if (i > buf.length-1)
	    return 0

	  var blockID = buf.readUInt8(i++)
	  var blockSize = buf.readInt32LE(i)
	  i += 4

	  switch(blockID) {
	    case 1: 
	      target.info = readInfo(buf, i)
	      break
	    case 2:
	      target.common = readCommon(buf, i)
	      break
	    case 3:
	      target.pages = readPages(buf, i, blockSize)
	      break
	    case 4:
	      target.chars = readChars(buf, i, blockSize)
	      break
	    case 5:
	      target.kernings = readKernings(buf, i, blockSize)
	      break
	  }
	  return 5 + blockSize
	}

	function readInfo(buf, i) {
	  var info = {}
	  info.size = buf.readInt16LE(i)

	  var bitField = buf.readUInt8(i+2)
	  info.smooth = (bitField >> 7) & 1
	  info.unicode = (bitField >> 6) & 1
	  info.italic = (bitField >> 5) & 1
	  info.bold = (bitField >> 4) & 1
	  
	  //fixedHeight is only mentioned in binary spec 
	  if ((bitField >> 3) & 1)
	    info.fixedHeight = 1
	  
	  info.charset = buf.readUInt8(i+3) || ''
	  info.stretchH = buf.readUInt16LE(i+4)
	  info.aa = buf.readUInt8(i+6)
	  info.padding = [
	    buf.readInt8(i+7),
	    buf.readInt8(i+8),
	    buf.readInt8(i+9),
	    buf.readInt8(i+10)
	  ]
	  info.spacing = [
	    buf.readInt8(i+11),
	    buf.readInt8(i+12)
	  ]
	  info.outline = buf.readUInt8(i+13)
	  info.face = readStringNT(buf, i+14)
	  return info
	}

	function readCommon(buf, i) {
	  var common = {}
	  common.lineHeight = buf.readUInt16LE(i)
	  common.base = buf.readUInt16LE(i+2)
	  common.scaleW = buf.readUInt16LE(i+4)
	  common.scaleH = buf.readUInt16LE(i+6)
	  common.pages = buf.readUInt16LE(i+8)
	  var bitField = buf.readUInt8(i+10)
	  common.packed = 0
	  common.alphaChnl = buf.readUInt8(i+11)
	  common.redChnl = buf.readUInt8(i+12)
	  common.greenChnl = buf.readUInt8(i+13)
	  common.blueChnl = buf.readUInt8(i+14)
	  return common
	}

	function readPages(buf, i, size) {
	  var pages = []
	  var text = readNameNT(buf, i)
	  var len = text.length+1
	  var count = size / len
	  for (var c=0; c<count; c++) {
	    pages[c] = buf.slice(i, i+text.length).toString('utf8')
	    i += len
	  }
	  return pages
	}

	function readChars(buf, i, blockSize) {
	  var chars = []

	  var count = blockSize / 20
	  for (var c=0; c<count; c++) {
	    var char = {}
	    var off = c*20
	    char.id = buf.readUInt32LE(i + 0 + off)
	    char.x = buf.readUInt16LE(i + 4 + off)
	    char.y = buf.readUInt16LE(i + 6 + off)
	    char.width = buf.readUInt16LE(i + 8 + off)
	    char.height = buf.readUInt16LE(i + 10 + off)
	    char.xoffset = buf.readInt16LE(i + 12 + off)
	    char.yoffset = buf.readInt16LE(i + 14 + off)
	    char.xadvance = buf.readInt16LE(i + 16 + off)
	    char.page = buf.readUInt8(i + 18 + off)
	    char.chnl = buf.readUInt8(i + 19 + off)
	    chars[c] = char
	  }
	  return chars
	}

	function readKernings(buf, i, blockSize) {
	  var kernings = []
	  var count = blockSize / 10
	  for (var c=0; c<count; c++) {
	    var kern = {}
	    var off = c*10
	    kern.first = buf.readUInt32LE(i + 0 + off)
	    kern.second = buf.readUInt32LE(i + 4 + off)
	    kern.amount = buf.readInt16LE(i + 8 + off)
	    kernings[c] = kern
	  }
	  return kernings
	}

	function readNameNT(buf, offset) {
	  var pos=offset
	  for (; pos<buf.length; pos++) {
	    if (buf[pos] === 0x00) 
	      break
	  }
	  return buf.slice(offset, pos)
	}

	function readStringNT(buf, offset) {
	  return readNameNT(buf, offset).toString('utf8')
	}
	},{}],15:[function(require,module,exports){
	var parseAttributes = require('./parse-attribs')
	var parseFromString = require('xml-parse-from-string')

	//In some cases element.attribute.nodeName can return
	//all lowercase values.. so we need to map them to the correct 
	//case
	var NAME_MAP = {
	  scaleh: 'scaleH',
	  scalew: 'scaleW',
	  stretchh: 'stretchH',
	  lineheight: 'lineHeight',
	  alphachnl: 'alphaChnl',
	  redchnl: 'redChnl',
	  greenchnl: 'greenChnl',
	  bluechnl: 'blueChnl'
	}

	module.exports = function parse(data) {
	  data = data.toString()
	  
	  var xmlRoot = parseFromString(data)
	  var output = {
	    pages: [],
	    chars: [],
	    kernings: []
	  }

	  //get config settings
	  ;['info', 'common'].forEach(function(key) {
	    var element = xmlRoot.getElementsByTagName(key)[0]
	    if (element)
	      output[key] = parseAttributes(getAttribs(element))
	  })

	  //get page info
	  var pageRoot = xmlRoot.getElementsByTagName('pages')[0]
	  if (!pageRoot)
	    throw new Error('malformed file -- no <pages> element')
	  var pages = pageRoot.getElementsByTagName('page')
	  for (var i=0; i<pages.length; i++) {
	    var p = pages[i]
	    var id = parseInt(p.getAttribute('id'), 10)
	    var file = p.getAttribute('file')
	    if (isNaN(id))
	      throw new Error('malformed file -- page "id" attribute is NaN')
	    if (!file)
	      throw new Error('malformed file -- needs page "file" attribute')
	    output.pages[parseInt(id, 10)] = file
	  }

	  //get kernings / chars
	  ;['chars', 'kernings'].forEach(function(key) {
	    var element = xmlRoot.getElementsByTagName(key)[0]
	    if (!element)
	      return
	    var childTag = key.substring(0, key.length-1)
	    var children = element.getElementsByTagName(childTag)
	    for (var i=0; i<children.length; i++) {      
	      var child = children[i]
	      output[key].push(parseAttributes(getAttribs(child)))
	    }
	  })
	  return output
	}

	function getAttribs(element) {
	  var attribs = getAttribList(element)
	  return attribs.reduce(function(dict, attrib) {
	    var key = mapName(attrib.nodeName)
	    dict[key] = attrib.nodeValue
	    return dict
	  }, {})
	}

	function getAttribList(element) {
	  //IE8+ and modern browsers
	  var attribs = []
	  for (var i=0; i<element.attributes.length; i++)
	    attribs.push(element.attributes[i])
	  return attribs
	}

	function mapName(nodeName) {
	  return NAME_MAP[nodeName.toLowerCase()] || nodeName
	}
	},{"./parse-attribs":16,"xml-parse-from-string":17}],16:[function(require,module,exports){
	//Some versions of GlyphDesigner have a typo
	//that causes some bugs with parsing. 
	//Need to confirm with recent version of the software
	//to see whether this is still an issue or not.
	var GLYPH_DESIGNER_ERROR = 'chasrset'

	module.exports = function parseAttributes(obj) {
	  if (GLYPH_DESIGNER_ERROR in obj) {
	    obj['charset'] = obj[GLYPH_DESIGNER_ERROR]
	    delete obj[GLYPH_DESIGNER_ERROR]
	  }

	  for (var k in obj) {
	    if (k === 'face' || k === 'charset') 
	      continue
	    else if (k === 'padding' || k === 'spacing')
	      obj[k] = parseIntList(obj[k])
	    else
	      obj[k] = parseInt(obj[k], 10) 
	  }
	  return obj
	}

	function parseIntList(data) {
	  return data.split(',').map(function(val) {
	    return parseInt(val, 10)
	  })
	}
	},{}],17:[function(require,module,exports){
	module.exports = (function xmlparser() {
	  //common browsers
	  if (typeof window.DOMParser !== 'undefined') {
	    return function(str) {
	      var parser = new window.DOMParser()
	      return parser.parseFromString(str, 'application/xml')
	    }
	  } 

	  //IE8 fallback
	  if (typeof window.ActiveXObject !== 'undefined'
	      && new window.ActiveXObject('Microsoft.XMLDOM')) {
	    return function(str) {
	      var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM")
	      xmlDoc.async = "false"
	      xmlDoc.loadXML(str)
	      return xmlDoc
	    }
	  }

	  //last resort fallback
	  return function(str) {
	    var div = document.createElement('div')
	    div.innerHTML = str
	    return div
	  }
	})()
	},{}],18:[function(require,module,exports){
	"use strict";
	var window = require("global/window")
	var once = require("once")
	var isFunction = require("is-function")
	var parseHeaders = require("parse-headers")
	var xtend = require("xtend")

	module.exports = createXHR
	createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
	createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

	forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
	    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
	        options = initParams(uri, options, callback)
	        options.method = method.toUpperCase()
	        return _createXHR(options)
	    }
	})

	function forEachArray(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i])
	    }
	}

	function isEmpty(obj){
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)) return false
	    }
	    return true
	}

	function initParams(uri, options, callback) {
	    var params = uri

	    if (isFunction(options)) {
	        callback = options
	        if (typeof uri === "string") {
	            params = {uri:uri}
	        }
	    } else {
	        params = xtend(options, {uri: uri})
	    }

	    params.callback = callback
	    return params
	}

	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback)
	    return _createXHR(options)
	}

	function _createXHR(options) {
	    var callback = options.callback
	    if(typeof callback === "undefined"){
	        throw new Error("callback argument missing")
	    }
	    callback = once(callback)

	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            loadFunc()
	        }
	    }

	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined

	        if (xhr.response) {
	            body = xhr.response
	        } else if (xhr.responseType === "text" || !xhr.responseType) {
	            body = xhr.responseText || xhr.responseXML
	        }

	        if (isJson) {
	            try {
	                body = JSON.parse(body)
	            } catch (e) {}
	        }

	        return body
	    }

	    var failureResponse = {
	                body: undefined,
	                headers: {},
	                statusCode: 0,
	                method: method,
	                url: uri,
	                rawRequest: xhr
	            }

	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer)
	        if(!(evt instanceof Error)){
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
	        }
	        evt.statusCode = 0
	        callback(evt, failureResponse)
	    }

	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return
	        var status
	        clearTimeout(timeoutTimer)
	        if(options.useXDR && xhr.status===undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200
	        } else {
	            status = (xhr.status === 1223 ? 204 : xhr.status)
	        }
	        var response = failureResponse
	        var err = null

	        if (status !== 0){
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            }
	            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders(xhr.getAllResponseHeaders())
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error")
	        }
	        callback(err, response, response.body)

	    }

	    var xhr = options.xhr || null

	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest()
	        }else{
	            xhr = new createXHR.XMLHttpRequest()
	        }
	    }

	    var key
	    var aborted
	    var uri = xhr.url = options.uri || options.url
	    var method = xhr.method = options.method || "GET"
	    var body = options.body || options.data || null
	    var headers = xhr.headers = options.headers || {}
	    var sync = !!options.sync
	    var isJson = false
	    var timeoutTimer

	    if ("json" in options) {
	        isJson = true
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json)
	        }
	    }

	    xhr.onreadystatechange = readystatechange
	    xhr.onload = loadFunc
	    xhr.onerror = errorFunc
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    }
	    xhr.ontimeout = errorFunc
	    xhr.open(method, uri, !sync, options.username, options.password)
	    //has to be after open
	    if(!sync) {
	        xhr.withCredentials = !!options.withCredentials
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0 ) {
	        timeoutTimer = setTimeout(function(){
	            aborted=true//IE9 may still call readystatechange
	            xhr.abort("timeout")
	            var e = new Error("XMLHttpRequest timeout")
	            e.code = "ETIMEDOUT"
	            errorFunc(e)
	        }, options.timeout )
	    }

	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key])
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }

	    if ("responseType" in options) {
	        xhr.responseType = options.responseType
	    }

	    if ("beforeSend" in options &&
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr)
	    }

	    xhr.send(body)

	    return xhr


	}

	function noop() {}

	},{"global/window":19,"is-function":20,"once":21,"parse-headers":24,"xtend":25}],19:[function(require,module,exports){
	(function (global){
	if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}

	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],20:[function(require,module,exports){
	module.exports = isFunction

	var toString = Object.prototype.toString

	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};

	},{}],21:[function(require,module,exports){
	module.exports = once

	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})

	function once (fn) {
	  var called = false
	  return function () {
	    if (called) return
	    called = true
	    return fn.apply(this, arguments)
	  }
	}

	},{}],22:[function(require,module,exports){
	var isFunction = require('is-function')

	module.exports = forEach

	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty

	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }

	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}

	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}

	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}

	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}

	},{"is-function":20}],23:[function(require,module,exports){

	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};

	},{}],24:[function(require,module,exports){
	var trim = require('trim')
	  , forEach = require('for-each')
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }

	module.exports = function (headers) {
	  if (!headers)
	    return {}

	  var result = {}

	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))

	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )

	  return result
	}
	},{"for-each":22,"trim":23}],25:[function(require,module,exports){
	arguments[4][9][0].apply(exports,arguments)
	},{"dup":9}],26:[function(require,module,exports){
	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
	  if (val === null || val === undefined) {
	    throw new TypeError('Object.assign cannot be called with null or undefined');
	  }

	  return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
	  var from;
	  var to = toObject(target);
	  var symbols;

	  for (var s = 1; s < arguments.length; s++) {
	    from = Object(arguments[s]);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }

	    if (Object.getOwnPropertySymbols) {
	      symbols = Object.getOwnPropertySymbols(from);
	      for (var i = 0; i < symbols.length; i++) {
	        if (propIsEnumerable.call(from, symbols[i])) {
	          to[symbols[i]] = from[symbols[i]];
	        }
	      }
	    }
	  }

	  return to;
	};

	},{}],27:[function(require,module,exports){
	var dtype = require('dtype')
	var anArray = require('an-array')
	var isBuffer = require('is-buffer')

	var CW = [0, 2, 3]
	var CCW = [2, 1, 3]

	module.exports = function createQuadElements(array, opt) {
	    //if user didn't specify an output array
	    if (!array || !(anArray(array) || isBuffer(array))) {
	        opt = array || {}
	        array = null
	    }

	    if (typeof opt === 'number') //backwards-compatible
	        opt = { count: opt }
	    else
	        opt = opt || {}

	    var type = typeof opt.type === 'string' ? opt.type : 'uint16'
	    var count = typeof opt.count === 'number' ? opt.count : 1
	    var start = (opt.start || 0) 

	    var dir = opt.clockwise !== false ? CW : CCW,
	        a = dir[0], 
	        b = dir[1],
	        c = dir[2]

	    var numIndices = count * 6

	    var indices = array || new (dtype(type))(numIndices)
	    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
	        var x = i + start
	        indices[x + 0] = j + 0
	        indices[x + 1] = j + 1
	        indices[x + 2] = j + 2
	        indices[x + 3] = j + a
	        indices[x + 4] = j + b
	        indices[x + 5] = j + c
	    }
	    return indices
	}
	},{"an-array":28,"dtype":29,"is-buffer":30}],28:[function(require,module,exports){
	var str = Object.prototype.toString

	module.exports = anArray

	function anArray(arr) {
	  return (
	       arr.BYTES_PER_ELEMENT
	    && str.call(arr.buffer) === '[object ArrayBuffer]'
	    || Array.isArray(arr)
	  )
	}

	},{}],29:[function(require,module,exports){
	module.exports = function(dtype) {
	  switch (dtype) {
	    case 'int8':
	      return Int8Array
	    case 'int16':
	      return Int16Array
	    case 'int32':
	      return Int32Array
	    case 'uint8':
	      return Uint8Array
	    case 'uint16':
	      return Uint16Array
	    case 'uint32':
	      return Uint32Array
	    case 'float32':
	      return Float32Array
	    case 'float64':
	      return Float64Array
	    case 'array':
	      return Array
	    case 'uint8_clamped':
	      return Uint8ClampedArray
	  }
	}

	},{}],30:[function(require,module,exports){
	/**
	 * Determine if an object is Buffer
	 *
	 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * License:  MIT
	 *
	 * `npm install is-buffer`
	 */

	module.exports = function (obj) {
	  return !!(obj != null &&
	    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
	      (obj.constructor &&
	      typeof obj.constructor.isBuffer === 'function' &&
	      obj.constructor.isBuffer(obj))
	    ))
	}

	},{}],31:[function(require,module,exports){
	var flatten = require('flatten-vertex-data')

	module.exports.attr = setAttribute
	module.exports.index = setIndex

	function setIndex (geometry, data, itemSize, dtype) {
	  if (typeof itemSize !== 'number') itemSize = 1
	  if (typeof dtype !== 'number') dtype = 'uint16'

	  var isR69 = !geometry.index && typeof geometry.setIndex !== 'function'
	  var attrib = isR69 ? geometry.getAttribute('index') : geometry.index
	  var newAttrib = updateAttribute(attrib, data, itemSize, dtype)
	  if (newAttrib) {
	    if (isR69) geometry.addAttribute('index', newAttrib)
	    else geometry.index = newAttrib
	  }
	}

	function setAttribute (geometry, key, data, itemSize, dtype) {
	  if (typeof itemSize !== 'number') itemSize = 3
	  if (typeof dtype !== 'number') dtype = 'float32'
	  if (Array.isArray(data) &&
	    Array.isArray(data[0]) &&
	    data[0].length !== itemSize) {
	    throw new Error('Nested vertex array has unexpected size; expected ' +
	      itemSize + ' but found ' + data[0].length)
	  }

	  var attrib = geometry.getAttribute(key)
	  var newAttrib = updateAttribute(attrib, data, itemSize, dtype)
	  if (newAttrib) {
	    geometry.addAttribute(key, newAttrib)
	  }
	}

	function updateAttribute (attrib, data, itemSize, dtype) {
	  data = data || []
	  if (!attrib || rebuildAttribute(attrib, data, itemSize)) {
	    // create a new array with desired type
	    data = flatten(data, dtype)
	    attrib = new THREE.BufferAttribute(data, itemSize)
	    attrib.needsUpdate = true
	    return attrib
	  } else {
	    // copy data into the existing array
	    flatten(data, attrib.array)
	    attrib.needsUpdate = true
	    return null
	  }
	}

	// Test whether the attribute needs to be re-created,
	// returns false if we can re-use it as-is.
	function rebuildAttribute (attrib, data, itemSize) {
	  if (attrib.itemSize !== itemSize) return true
	  if (!attrib.array) return true
	  var attribLength = attrib.array.length
	  if (Array.isArray(data) && Array.isArray(data[0])) {
	    // [ [ x, y, z ] ]
	    return attribLength !== data.length * itemSize
	  } else {
	    // [ x, y, z ]
	    return attribLength !== data.length
	  }
	}

	},{"flatten-vertex-data":32}],32:[function(require,module,exports){
	/*eslint new-cap:0*/
	var dtype = require('dtype')
	module.exports = flattenVertexData
	function flattenVertexData (data, output, offset) {
	  if (!data) throw new TypeError('must specify data as first parameter')
	  offset = +(offset || 0) | 0

	  if (Array.isArray(data) && Array.isArray(data[0])) {
	    var dim = data[0].length
	    var length = data.length * dim

	    // no output specified, create a new typed array
	    if (!output || typeof output === 'string') {
	      output = new (dtype(output || 'float32'))(length + offset)
	    }

	    var dstLength = output.length - offset
	    if (length !== dstLength) {
	      throw new Error('source length ' + length + ' (' + dim + 'x' + data.length + ')' +
	        ' does not match destination length ' + dstLength)
	    }

	    for (var i = 0, k = offset; i < data.length; i++) {
	      for (var j = 0; j < dim; j++) {
	        output[k++] = data[i][j]
	      }
	    }
	  } else {
	    if (!output || typeof output === 'string') {
	      // no output, create a new one
	      var Ctor = dtype(output || 'float32')
	      if (offset === 0) {
	        output = new Ctor(data)
	      } else {
	        output = new Ctor(data.length + offset)
	        output.set(data, offset)
	      }
	    } else {
	      // store output in existing array
	      output.set(data, offset)
	    }
	  }

	  return output
	}

	},{"dtype":33}],33:[function(require,module,exports){
	arguments[4][29][0].apply(exports,arguments)
	},{"dup":29}],34:[function(require,module,exports){
	var assign = require('object-assign')

	module.exports = function createSDFShader (opt) {
	  opt = opt || {}
	  var opacity = typeof opt.opacity === 'number' ? opt.opacity : 1
	  var alphaTest = typeof opt.alphaTest === 'number' ? opt.alphaTest : 0.0001
	  var precision = opt.precision || 'highp'
	  var color = opt.color
	  var map = opt.map

	  // remove to satisfy r73
	  delete opt.map
	  delete opt.color
	  delete opt.precision
	  delete opt.opacity

	  return assign({
	    uniforms: {
	      opacity: { type: 'f', value: opacity },
	      map: { type: 't', value: map || new THREE.Texture() },
	      color: { type: 'c', value: new THREE.Color(color) }
	    },
	    vertexShader: [
	      'attribute vec2 uv;',
	      'attribute vec4 position;',
	      'uniform mat4 projectionMatrix;',
	      'uniform mat4 modelViewMatrix;',
	      'varying vec2 vUv;',
	      'void main() {',
	      'vUv = uv;',
	      'gl_Position = projectionMatrix * modelViewMatrix * position;',
	      '}'
	    ].join('\n'),
	    fragmentShader: [
	      '#ifdef GL_OES_standard_derivatives',
	      '#extension GL_OES_standard_derivatives : enable',
	      '#endif',
	      'precision ' + precision + ' float;',
	      'uniform float opacity;',
	      'uniform vec3 color;',
	      'uniform sampler2D map;',
	      'varying vec2 vUv;',

	      'float aastep(float value) {',
	      '  #ifdef GL_OES_standard_derivatives',
	      '    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;',
	      '  #else',
	      '    float afwidth = (1.0 / 32.0) * (1.4142135623730951 / (2.0 * gl_FragCoord.w));',
	      '  #endif',
	      '  return smoothstep(0.5 - afwidth, 0.5 + afwidth, value);',
	      '}',

	      'void main() {',
	      '  vec4 texColor = texture2D(map, vUv);',
	      '  float alpha = aastep(texColor.a);',
	      '  gl_FragColor = vec4(color, opacity * alpha);',
	      alphaTest === 0
	        ? ''
	        : '  if (gl_FragColor.a < ' + alphaTest + ') discard;',
	      '}'
	    ].join('\n')
	  }, opt)
	}

	},{"object-assign":26}],35:[function(require,module,exports){
	var loadFont = require('load-bmfont')
	//global.THREE = require('three')

	// A utility to load a font, then a texture
	module.exports = function (opt, cb) {
	  loadFont(opt.font, function (err, font) {
	    if (err) throw err
		PANOLENS.Utils.TextureLoader.load( opt.image, function (tex) {
	      cb(font, tex)
	    } );
	  })
	}

	},{"load-bmfont":10}],36:[function(require,module,exports){

	var createText = require('../')
	var SDFShader = require('../shaders/sdf')

	if ( PANOLENS && PANOLENS.Utils && PANOLENS.SpriteText ) {
		PANOLENS.Utils.loadBMFont = function(fontObject, callback){
			require('./load')(fontObject, PANOLENS.SpriteText.prototype.setBMFont.bind(PANOLENS.SpriteText.prototype, callback));
		};
		PANOLENS.SpriteText.prototype.generateTextGeometry = createText;
		PANOLENS.SpriteText.prototype.generateSDFShader = SDFShader;
	}

	},{"../":1,"../shaders/sdf":34,"./load":35}],37:[function(require,module,exports){
	(function (global){
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = require('base64-js')
	var ieee754 = require('ieee754')
	var isArray = require('isarray')

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  //array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(array)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// Even though this property is private, it shouldn't be removed because it is
	// used by `is-buffer` to detect buffer instances in Safari 5-7.
	Buffer.prototype._isBuffer = true

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"base64-js":38,"ieee754":39,"isarray":40}],38:[function(require,module,exports){
	;(function (exports) {
	  'use strict'

	  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

	  var PLUS = '+'.charCodeAt(0)
	  var SLASH = '/'.charCodeAt(0)
	  var NUMBER = '0'.charCodeAt(0)
	  var LOWER = 'a'.charCodeAt(0)
	  var UPPER = 'A'.charCodeAt(0)
	  var PLUS_URL_SAFE = '-'.charCodeAt(0)
	  var SLASH_URL_SAFE = '_'.charCodeAt(0)

	  function decode (elt) {
	    var code = elt.charCodeAt(0)
	    if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
	    if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
	    if (code < NUMBER) return -1 // no match
	    if (code < NUMBER + 10) return code - NUMBER + 26 + 26
	    if (code < UPPER + 26) return code - UPPER
	    if (code < LOWER + 26) return code - LOWER + 26
	  }

	  function b64ToByteArray (b64) {
	    var i, j, l, tmp, placeHolders, arr

	    if (b64.length % 4 > 0) {
	      throw new Error('Invalid string. Length must be a multiple of 4')
	    }

	    // the number of equal signs (place holders)
	    // if there are two placeholders, than the two characters before it
	    // represent one byte
	    // if there is only one, then the three characters before it represent 2 bytes
	    // this is just a cheap hack to not do indexOf twice
	    var len = b64.length
	    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

	    // base64 is 4/3 + up to two characters of the original data
	    arr = new Arr(b64.length * 3 / 4 - placeHolders)

	    // if there are placeholders, only get up to the last complete 4 chars
	    l = placeHolders > 0 ? b64.length - 4 : b64.length

	    var L = 0

	    function push (v) {
	      arr[L++] = v
	    }

	    for (i = 0, j = 0; i < l; i += 4, j += 3) {
	      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
	      push((tmp & 0xFF0000) >> 16)
	      push((tmp & 0xFF00) >> 8)
	      push(tmp & 0xFF)
	    }

	    if (placeHolders === 2) {
	      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
	      push(tmp & 0xFF)
	    } else if (placeHolders === 1) {
	      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
	      push((tmp >> 8) & 0xFF)
	      push(tmp & 0xFF)
	    }

	    return arr
	  }

	  function uint8ToBase64 (uint8) {
	    var i
	    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
	    var output = ''
	    var temp, length

	    function encode (num) {
	      return lookup.charAt(num)
	    }

	    function tripletToBase64 (num) {
	      return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
	    }

	    // go through the array every three bytes, we'll deal with trailing stuff later
	    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
	      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	      output += tripletToBase64(temp)
	    }

	    // pad the end with zeros, but make sure to not forget the extra bytes
	    switch (extraBytes) {
	      case 1:
	        temp = uint8[uint8.length - 1]
	        output += encode(temp >> 2)
	        output += encode((temp << 4) & 0x3F)
	        output += '=='
	        break
	      case 2:
	        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
	        output += encode(temp >> 10)
	        output += encode((temp >> 4) & 0x3F)
	        output += encode((temp << 2) & 0x3F)
	        output += '='
	        break
	      default:
	        break
	    }

	    return output
	  }

	  exports.toByteArray = b64ToByteArray
	  exports.fromByteArray = uint8ToBase64
	}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

	},{}],39:[function(require,module,exports){
	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}

	},{}],40:[function(require,module,exports){
	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

},{}]},{},[36]);