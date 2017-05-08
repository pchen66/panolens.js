/**
 * Panolens.js
 * @author pchen66
 * @namespace PANOLENS
 */

var PANOLENS = { REVISION: '5' };
;/*! npm.im/iphone-inline-video 2.0.2 */
var enableInlineVideo=function(){"use strict";/*! npm.im/intervalometer */
function e(e,i,n,r){function t(n){d=i(t,r),e(n-(a||n)),a=n}var d,a;return{start:function(){d||t(0)},stop:function(){n(d),d=null,a=0}}}function i(i){return e(i,requestAnimationFrame,cancelAnimationFrame)}function n(e,i,n,r){function t(i){Boolean(e[n])===Boolean(r)&&i.stopImmediatePropagation(),delete e[n]}return e.addEventListener(i,t,!1),t}function r(e,i,n,r){function t(){return n[i]}function d(e){n[i]=e}r&&d(e[i]),Object.defineProperty(e,i,{get:t,set:d})}function t(e,i,n){n.addEventListener(i,function(){return e.dispatchEvent(new Event(i))})}function d(e,i){Promise.resolve().then(function(){e.dispatchEvent(new Event(i))})}function a(e){var i=new Audio;return t(e,"play",i),t(e,"playing",i),t(e,"pause",i),i.crossOrigin=e.crossOrigin,i.src=e.src||e.currentSrc||"data:",i}function o(e,i,n){(m||0)+200<Date.now()&&(e[b]=!0,m=Date.now()),n||(e.currentTime=i),w[++T%3]=100*i|0}function u(e){return e.driver.currentTime>=e.video.duration}function s(e){var i=this;i.video.readyState>=i.video.HAVE_FUTURE_DATA?(i.hasAudio||(i.driver.currentTime=i.video.currentTime+e*i.video.playbackRate/1e3,i.video.loop&&u(i)&&(i.driver.currentTime=0)),o(i.video,i.driver.currentTime)):i.video.networkState===i.video.NETWORK_IDLE&&0===i.video.buffered.length&&i.video.load(),i.video.ended&&(delete i.video[b],i.video.pause(!0))}function c(){var e=this,i=e[h];return e.webkitDisplayingFullscreen?void e[g]():("data:"!==i.driver.src&&i.driver.src!==e.src&&(o(e,0,!0),i.driver.src=e.src),void(e.paused&&(i.paused=!1,0===e.buffered.length&&e.load(),i.driver.play(),i.updater.start(),i.hasAudio||(d(e,"play"),i.video.readyState>=i.video.HAVE_ENOUGH_DATA&&d(e,"playing")))))}function v(e){var i=this,n=i[h];n.driver.pause(),n.updater.stop(),i.webkitDisplayingFullscreen&&i[E](),n.paused&&!e||(n.paused=!0,n.hasAudio||d(i,"pause"),i.ended&&(i[b]=!0,d(i,"ended")))}function p(e,n){var r=e[h]={};r.paused=!0,r.hasAudio=n,r.video=e,r.updater=i(s.bind(r)),n?r.driver=a(e):(e.addEventListener("canplay",function(){e.paused||d(e,"playing")}),r.driver={src:e.src||e.currentSrc||"data:",muted:!0,paused:!0,pause:function(){r.driver.paused=!0},play:function(){r.driver.paused=!1,u(r)&&o(e,0)},get ended(){return u(r)}}),e.addEventListener("emptied",function(){var i=!r.driver.src||"data:"===r.driver.src;r.driver.src&&r.driver.src!==e.src&&(o(e,0,!0),r.driver.src=e.src,i?r.driver.play():r.updater.stop())},!1),e.addEventListener("webkitbeginfullscreen",function(){e.paused?n&&0===r.driver.buffered.length&&r.driver.load():(e.pause(),e[g]())}),n&&(e.addEventListener("webkitendfullscreen",function(){r.driver.currentTime=e.currentTime}),e.addEventListener("seeking",function(){w.indexOf(100*e.currentTime|0)<0&&(r.driver.currentTime=e.currentTime)}))}function l(e){var i=e[h];e[g]=e.play,e[E]=e.pause,e.play=c,e.pause=v,r(e,"paused",i.driver),r(e,"muted",i.driver,!0),r(e,"playbackRate",i.driver,!0),r(e,"ended",i.driver),r(e,"loop",i.driver,!0),n(e,"seeking"),n(e,"seeked"),n(e,"timeupdate",b,!1),n(e,"ended",b,!1)}function f(e,i){if(void 0===i&&(i={}),!e[h]){if(!i.everywhere){if(!y)return;if(!(i.iPad||i.ipad?/iPhone|iPod|iPad/:/iPhone|iPod/).test(navigator.userAgent))return}!e.paused&&e.webkitDisplayingFullscreen&&e.pause(),p(e,!e.muted),l(e),e.classList.add("IIV"),e.muted&&e.autoplay&&e.play(),/iPhone|iPod|iPad/.test(navigator.platform)||console.warn("iphone-inline-video is not guaranteed to work in emulated environments")}}var m,y="object"==typeof document&&"object-fit"in document.head.style&&!matchMedia("(-webkit-video-playable-inline)").matches,h="bfred-it:iphone-inline-video",b="bfred-it:iphone-inline-video:event",g="bfred-it:iphone-inline-video:nativeplay",E="bfred-it:iphone-inline-video:nativepause",w=[],T=0;return f}();
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

THREE.OrbitControls = function ( object, domElement, passiveUpdate ) {

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.frameId;

	// API

	// Set to false to disable this control
	this.enabled = true;

	this.passiveUpdate = passiveUpdate;

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

		// Passive update with autonomous animation frame
		if ( ignoreUpdate !== true && this.passiveUpdate ) {

			window.cancelAnimationFrame( this.frameId );
			this.frameId = window.requestAnimationFrame( this.update.bind( this ) );

			if( state === STATE.NONE 
				&& Math.abs(momentumLeft) < MEPS 
				&& Math.abs(momentumUp) < MEPS ) {
				window.cancelAnimationFrame( this.frameId );
			}
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

		if ( state !== STATE.NONE && !this.passiveUpdate ) scope.update();

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

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.noKeys === true || scope.noPan === true ) return;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				scope.pan( 0, scope.keyPanSpeed );
				scope.update();
				scope.dispatchEvent( changeEvent );
				break;

			case scope.keys.BOTTOM:
				scope.pan( 0, - scope.keyPanSpeed );
				scope.update();
				scope.dispatchEvent( changeEvent );
				break;

			case scope.keys.LEFT:
				scope.pan( scope.keyPanSpeed, 0 );
				scope.update();
				scope.dispatchEvent( changeEvent );
				break;

			case scope.keys.RIGHT:
				scope.pan( - scope.keyPanSpeed, 0 );
				scope.update();
				scope.dispatchEvent( changeEvent );
				break;

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
				//dollyStart.set( 0, distance );
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

				/*dollyEnd.set( 0, distance );
				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					scope.dollyOut();

				} else if ( dollyDelta.y < 0 ) {

					scope.dollyIn();

				}

				dollyStart.copy( dollyEnd );*/

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

				//console.log(distance, event);

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

		//console.log( _canvas );

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
		//console.log('Loading panorama for zoom ' + _zoom + '...');
		
		var w = levelsW[ _zoom ],
			h = levelsH[ _zoom ],
			self = this,
			url,
			x,
			y;

			//console.log( w, h, w * 512, h * 512 );
			
		_count = 0;
		_total = w * h;

		var self = this;
		for( var y = 0; y < h; y++ ) {
			for( var x = 0; x < w; x++ ) {
				var url = 'https://cbks0.googleapis.com/cbk?output=tile&cb_client=maps_photos.ugc&v=4&gl=US&zoom=' + _zoom + '&x=' + x + '&y=' + y + '&panoid=' + _panoId;

				( function( x, y ) { 
					if( _parameters.useWebGL ) {
						var texture = THREE.ImageUtils.loadTexture( url, null, function() {
							//console.log( 'loaded ' + url );
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
	
		//console.log('Load for', location);
		var self = this;

		//var url = 'https://maps.google.com/cbk?output=json&hl=x-local&ll=' + location.lat() + ',' + location.lng() + '&cb_client=maps_sv&v=3';
		//url = 'https://cbks1.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=polygon&it=1%3A1&rank=closest&ll=' + location.lat() + ',' + location.lng() + '&radius=350';
		//url = 'https://cbks1.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=json&ll=' + location.lat() + ',' + location.lng();
		var url = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=json&panoid=' + panoid;

		/*var http_request = new XMLHttpRequest();
		http_request.withCredentials = true;
		http_request.open( "GET", url, true );
		http_request.onreadystatechange = function () {
			if ( http_request.readyState == 4 && http_request.status == 200 ) {
				var data = JSON.parse( http_request.responseText );
				self.loadPano( location, data.Location.panoId );
				//self.loadPano( location, data.result[ 0 ].id );
			}
		};
		http_request.send(null);*/
		self.loadPano( panoid );

	};

	this.loadPano = function( id ) {

		//console.log( 'Load ' + id );
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
		//console.log( z );
		this.adaptTextureToZoom();
	};

	this.setZoom( _parameters.zoom || 1 );

};;(function(){

	'use strict';

	/**
	 * Data Image
	 * @memberOf PANOLENS
	 * @enum {string}
	 */
	PANOLENS.DataImage = {

		Info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADBklEQVR42u2bP08UQRiHnzFaSYCI/xoksdBIqGwIiYWRUBISExpCQ0ej38FWOmlIKKhoMPEbaCxsrrHiYrQgOSlQEaICrT+LHSPZzNzt3s3c3Hn7lHvLzvv82L2dm30XKioqKgYY062BJF0HpoA7wARwBbhsPz4DjoEG8AnYNcZ8Sx1Op8IXJM1KWpdUV3nq9m9nJV1I7VNGfEzSM0mNNqR9NOwxx1L7NRMflbQm6SSgeJ4TO8Zoat+8/LKkg4jieQ4kLaf2RtKwpJ0uiufZkTScSn5S0l5C+b/sSZrstvyMpKPU5uc4kjTTjkvpeYCkaeA1/+7hvcIZMGuMqUULQNIU8Aa4ltrWwyHwyBizGzwASSPAe+B2assW7AH3jTE/i+xcZoa12Qfy2Bo3i+5cKABl99zF1GYlWFTBeULLS0DZrOsDcDNggTXgc27bLWA64BhfgHvGmB8dHUXZ1DM0S45xliKMs9bKr+klIOkqsBrwv9JtVq1DewEAT4Ch1BYdMGQdygeg7Df4SmqDAKyoyXpCszPgITCeuvoAjFuX0gE8jljUdv7bCtiOOJ7XpdUZ8L/gdXHOA5QtYH5NXXVgbrgWWn1nwFTqaiPgdPIFcDd1tRFwOl307DwRuZgXwLvctgfA04hjOp18AcReZ6sZY16e3yDpUuQxnU6+S2AkcjEpcDr1zxOXSPgCKLSa0mc4nXwB/EpdbQScTr4AGqmrjYDTyRfAx9TVRsDp5Aug8LJyH+F0cgZg58z11BUHpO5ruGh2G3ybuuqAeF2aBfAqddUB8bq0OgP2U1cegH3aOQOMMb+BrdTVB2DLupQLwLIOnKY26IBT6+ClaQDGmO/ARmqLDtiwDn7HVkcY+EdjNoTlCI+tYhO2iUppm6HKslPUq2qQKHpUe8AFsjaUXuUQWCgqXyoAG8IuME/WkNRrnAHzZfqDSgdgQ6gBc2Td3b3CMTBXtkOsIzTIjZLnQhjcVtlcEIPZLJ0LoVvt8s/Va+3yuSAG84UJRxB98cpM9dJURUVFxSDzBxKde4Lk3/h2AAAAAElFTkSuQmCC',
		Arrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADPklEQVR42u2bMUscQRiG30/SRaJEI1ZKUiRErNIELRUbQYSAnX8hpVUgkDYp0wgWVjYW+QcJaQzYpLojJIXhtDDEKBpj65ti58ixmdmb2ZvZ7+T2AUHudmfmeXf2bnb3O6CmpqZmgJGqOiI5AWAWwEMA0wDuArht3r4CcAagBeAbgIaI/NQOp1fhIZKLJN+SbDKcptl3keSQtk+I+BjJVyRbJaRdtEybY9p+ReKjJN+QvIwonufS9DGq7ZuXXyd5nFA8zzHJdW1vkLxDcrdC8Ty7JO9oyc+QPFCUb3NAcqZq+TmSp9rmHZySnCvjErwOIPkUwHv8+w7vF64ALIrIfrIASM4C+ADgnratgxMACyLSiB4AyREAnwE80LbswgGAJyJy4bNxyApr6wbIw4xxy3djrwCYfeeuaZsFsEbPdULXU4DZqusLgMkEA21P05EEbf8A8FhEzos28pkBLxLKL5s/r/M1kEkz9vKQHGeatf05yfmOfubNa7G5JDle5NhtBjwHMBz5yFwAWBaRT+0XzP8pZsKwcQiH2fX8Ycojb+kzxUw4ZJn7CSQXqpRPHMKCq7+iZJ71Mvdy/DftXSQ6HcJdSDaqPPKW/mPOBO+lcbvzCU35RCFM2PpwnQKzZQfdgfe0dxH5dLA6uQJ4pC2fIASrkyuA6X6QjxyC1ckVQNn7bNHlI4ZgdXIFUObiJJl8pBCsTjGfuIwA2Cv4FN7xbYjkjqsRAHuIePXoCiDF1Zk2VidXAL+1R5sAq5MrgJb2aBNgdXIF8FV7tAmwOrkCCFs73wysTtYATHFCU3vEEWm6Ci6KvgY/ao86Ik6XogDeaY86Ik6XbjPgSHvkEThCwQy45XpDRK5JbgN4GWkgUyR9H65MRQxgW0SunZ5FezK7pfwd8e8MV8UfAPdF5Jdrg8JrAbPjprZFD2wWyQP6j8ZSEufRmGlgQ9umBBvd5IOgbjFUKLu+XnWBhG+rpsFVZGUo/coJgFVf+aAATAgNACvICpL6jSsAKyH1QcEBmBD2ASwhq+7uF84ALIVWiPUEB7lQsiOEwS2VzQUxmMXSuRCqKpd/zX4rl88FMZg/mLAEcSN+MlP/aKqmpqZmkPkL0hSjwOpNKxwAAAAASUVORK5CYII=',
		FullscreenEnter: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik03IDE0SDV2NWg1di0ySDd2LTN6bS0yLTRoMlY3aDNWNUg1djV6bTEyIDdoLTN2Mmg1di01aC0ydjN6TTE0IDV2MmgzdjNoMlY1aC01eiIvPgo8L3N2Zz4=',
		FullscreenLeave: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE0SDE5VjE2SDE2VjE5SDE0VjE0TTUsMTRIMTBWMTlIOFYxNkg1VjE0TTgsNUgxMFYxMEg1VjhIOFY1TTE5LDhWMTBIMTRWNUgxNlY4SDE5WiIgLz48L3N2Zz4=',
		VideoPlay: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTgsNS4xNFYxOS4xNEwxOSwxMi4xNEw4LDUuMTRaIiAvPjwvc3ZnPg==',
		VideoPause: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE5LjE0SDE4VjUuMTRIMTRNNiwxOS4xNEgxMFY1LjE0SDZWMTkuMTRaIiAvPjwvc3ZnPg==',
		WhiteTile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAtiABQAAACRQTFRFAAAAAAAABgYGBwcHHh4eKysrx8fHy8vLzMzM7OzsAAAABgYG+q7SZgAAAAp0Uk5TAP7+/v7+/v7+/iJx/a8AAAOwSURBVHja7d0hbsNAEAVQo6SFI6XEcALDcgNLvUBvEBQVhpkWVYWlhSsVFS7t5QIshRt695lEASZP+8c7a1kzDL1fz+/zyuvzp6FbvoddrL6uDd1yGZ5eXldeb18N3fIx7A+58prmhm65DfvDcd0952lu6JabFbD/zVprZj1lzcys+fj9z8xTZtbT8rv8yWlu6BYAIgAAAAAAAAAAAABAM6QXEAEAAAAAAAAAgJ2gnaAIiIA3Q2qAGgAAAAAAAAAAAAAAAAAAAAAAAAAAQJsADkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBVlfAcZ3aeZobusUKMGBhV6KUElHGKBERJR6/fxExRkQZl9/lT8S1oVsuhqyYMmPKjCkzvfcCpsxohrwY0Q06EAEAAAAAAAAAAACgGdILiAAAAAAAAAAAwE7QTlAERMCbITVADQAAAAAAAAAAAAAAAAAAAAAAAAAAwKmwQ1ERAAAAAACPQY9BERABERABERABERABERABAAAAAAAAAICdoJ2gCIiAT2bUADVADRABEQAAQBFUBEVABERgEyvAlJm+V4ApM6bMmDJjyowpM6bMdN0LmDKjGfJiRDfoQAQAAAAAAAAAAACAZkgvIAIAAAAAAAAAADtBO0EREAFvhtQANQAAAAAAAAAAAAAAAAAAAAAAAAAAAKfCDkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBTawAU2b6XgGmzJgyY8qMKTOmzJgy03UvYMqMZsiLEd2gAxEAAAAAAAAAAAAAmiG9gAgAAAAAAAAAAOwE7QRFQAS8GVID1AAAAAAAAAAAAAAAAAAAAAAAAAAAAJwKOxQVAQAAAADwGPQYFAEREAEREAEREAEREAERAAAAAAAAAADYCdoJioAI+GRGDVAD1AAREAEAABRBRVAEREAENrECTJnpewWYMmPKjCkzpsyYMmPKTNe9gCkzmiEvRnSDDkQAAAAAAAAAAAAAaIb0AiIAAAAAAAAAALATtBMUARHwZkgNUAMAAAAAAAAAAAAAAAAAAAAAAAAAAHAq7FBUBAAAAADAY9BjUAREQAREQAREQAREQAREAAAAAAAAAABgJ2gnKAIi4JMZNUANUANEQAQAAFAEFUEREAER2MQKMGWm7xVgyowpM50PWen9ugNGXz1XaocAFgAAAABJRU5ErkJggg==',
		ReticleIdle: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAgAAAAIACH+pydAAAAu0lEQVRYw+2VOw7CMAyGbcZeACGGDtyp3LG9StQbMDAgxCk+BtKlSMQNicrD3xbFj9+24og4jvPvaK4jsBWRQzyeVPVWXS2gwBEIPBPiXXZRqeQN0JOmB5oalQ+G5BND0U4A3YLkE11JASFDQLDETrYJ2InIxWI7dxWRvapeXxltDIHajORTcW3KyCKgKhYBZ3m0cylE3/cExBmOGQLG1PztpXzAM1x3EUUR663iWSeKfkbf9R07jvOT3AGjPsjlLIgibgAAAABJRU5ErkJggg==',
		Setting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADn0lEQVR42u2bzUsVURjGnyO6CPzAMnTjppAo3LTwH1CqTfaxbeOiRS37A0wXtROFVi1aRBs3LWohSIGbQAQXViBGRhG0UIRKUCpK7q/FnOB2uc6cOXNmRnGe3eW+H8/7zLln3vNxpQoVKlQ4wjBFJAFOSRqX1O7osivpvjHmU1nChBZglvSYLYJbS0EanCvIJzWK+gnsyH34/8OuMaYjb265jwCgz6N4SWq3vodbAEmnS/KtBDgoAgyU5BteAOAkMAPcBroc7PskDWfgN+wyDwBdltMMcDI3tYBnde/pHeARMNTErgd4APzweP834oeN1dMkz5DlsFNn/yyv4kdiSK4At4AO4CqwGaDwRmza2B0210qM7YhrXU59ANAq6bWkwQTTn5KO5fIE0uVYlXTeGLOXFMx1DrjlULwKKN41x6DlnIjEEQCckPRe0okCiguJr5LOGGO+xhm5jICJQ1i8LOeJJKPYEQAMKvrtt5ZdjSf2FM0Fq/sZJI2A6UNcvCz36TiDfUcAcE1SPu/U6Mm8k/TFfu6XdFb5iX3dGPM8lQfwNod3+TowBnQ3yddtv1vPIe+b1JIBiwEJ1IAJ208k5W21trWA+V/5CHAcmAtU/A2P/DcCiTAHHE8tgCVhgLvAXgYCk17Jo/yTGfLuWe7Zd72AC8CWB4n3OAz7mLytNkZabAEXMhfeQKYfWEpJZCxA3rGUOZeA/qDF15FpAz47EvlNk9neI2e3jeWCz0BbmvipNkSMMX8kuSZYM8Z8zyqAjbHmaN5mOeYjgIXrU93MWrxHrNQjrqiDkQMLHwG+OdqF3NN3jeXKzU8AoF1SzdH8XKhJUO7HZDXLMbwAwICkJUULFxe0SbqSVQAbw3Xi7Ze0ZLmGAzAKbHs0JGU1QtvAaIjCW4B7ZOvJy2qFa5a730RPtBiaz0CgnkiZi6F5fBZDVMvho7EhcuS3xJJ2hV9IupgTqaLw0hhzab8vq23xOG/r+LDsKjLgYVzxUnU0ltwK2wDezUyJmEwqXgp/PL4rvxthaeCSI+zxuA10J8ZkWdJNSb2SLkvayKHwDRu71+ZajrG941J8agALDQ3GU/a/IvMkYCPzmCbtLNEVmacNtgs5iP9fYVNEV1Q6Hez7yNZSL+J2SarTcpqiyV2iUkG0IvPFvbz5FbEn+KEk3wMjwMeSfCsBXFBdly9CAPk9ydyffpECuB5tZfVJjaKWueOSfinln6YK4lahQoUKRxd/AcRPGTcQCAUQAAAAAElFTkSuQmCC',
		ChevronRight: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNTksMTYuNThMMTMuMTcsMTJMOC41OSw3LjQxTDEwLDZMMTYsMTJMMTAsMThMOC41OSwxNi41OFoiIC8+PC9zdmc+',
		Check: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WiIgLz48L3N2Zz4=',
		ViewIndicator: '<svg id="view-indicator" height="30" width="30" viewBox="-2.5 -1 30 30"><style type="text/css">.st0{stroke-width:2;stroke-miterlimit:10;fill:none;}.st1{stroke-width:6;stroke-miterlimit:10;}</style><g><path class="st0" d="M 12.5 0 A 12.5 12.5 0 0 0 -12.5 0 A 12.5 12.5 0 0 0 12.5 0" transform="matrix(1,0,0,1,13,15.5)"></path><path class="st2" d="M 13 0 L 10 2 L 16 2 Z"></path><path class="st2" d="M 2 0 A 2 2 0 0 0 -2 0 A 2 2 0 0 0 2 0" transform="matrix(1,0,0,1,13,15.5)"></path><path class="st1" id="indicator" transform="matrix(1,0,0,1,13,15.5)"></path></g></svg>',
		ReticleDwell: 'data:image/png;base64,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DenX79mcEAubDT1EX1tTzPyo81c84E5fu7jSp8dPxZi++FQs06/j0t2QcVG4VzhntXvBxxjOwR6n1mg8/MxJxEfIsY8YomBcP5a1oHONES+RerjyJYeus49PN+S57ZqvffZkDntf+jWOMlw6BNc1Pte6NuKJE3nFca+zD6bFodyzmJgS/jTJtcAZxz7EMePZo/PXsc4b86X1GhteY+NHnDliHnNoDMYbA536GkN71U3JNdaU/UXSsZear21r19c8mcOaT23w3p/nUO1T84iNem2JXfuOc84pjk+NBRbp4yue6avXFlUj/Fw/3HHuxzPZGOg5x+kbizHasUHaa+wLy8UcjoFPEXF8vdBOLKnK6uBz+urDnJ5B5OVlIPM8txfzAmfv9qt/jaFcOeN4z+V5U8cq99e1n6de795Xm/opfFUcizG541kLsmunj+y19gxwHvTonA8OGU9edchTe8PXefDpidyBa6+Ba6y8H0PfueCO7f2YGxvkHi56L+bPbXvdtSPzRU6MY97o24iDzO8JzR26nryucIgxkP0qo7OJqW19feBgR/zQp1Wq82FjHTU2e6h4rnb9iFfjTPXRVcLfdVW9suf1thzqC3d+1mcu5dVPufqpe5G5edq257q/un9zh73q9Tc2nN+Fc+bMEbH4rAIs1bhT/tqZE7mOQbZfOZjBt/prj/oS9fHrOMawH30YiFwxqb8+9vGdI2M4pvfj9c6/RfBamXN5P8a+/vbnOH51/r4/N+551LN2rtM+e9en3zv7wqadPmSf+F6TZpj4AV78DK6a61xTeuw27Y5RL+9x3Pf78fTZA34QMnuBiKlenNd58bWP/y7Cl/1PjSGWf4dTzwb0kPyid7WfxKBNzX+1iM92lPvZNzdzfsZhN/rIue78LRSvpXMERvh8QazoR56ncq1err+86pXhldRXHXLvh451sR9tjnWP9vGVel/1UxzfOVzj35/X+Ds39irTvwrV/V1l/Is6hn3vm7/qh+z7xqm9i4kpXM/5oxc31cdY6uxXrg0+FUN93UM/vo6rch/bGHM++mOf+tzRtXBe7/pMyViDX+DU3D/JfPAcMndec009r3lOPXQ9+Pe4od/HQTflF/UjpF8f25jaGYis/pFAeyrcf41bh/ocwmufc8351nGH+NZxQ76cAa+x+cSKvOu85rr6vpExzwu5n4qhurfrWifxt53Xfs5Xn6+va27juK+6V21Plfsm5qlOOiYbGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBl4jjPAH3jyB+T80S1t9cknn7SGrC7FaVbbWvwg/Gtb5ssyiXmeL+F2DvwGjQxcWwbyZaxiDqwdgdMPP/yQgs0Ud1y+//77yOcUm6awY4qYnqd40VmKdJ2muBKFn1tLUUUKQN9PsVO+FO0BXDn6jR9jU3jsDE6sFEVinvO33367xU9/9cEHHyxZw49//GPWJlVZ3eAjA3MZEC8rsJyijUuwRqGvFHds+E2fonYPUrDrNHhsxczht25965v4UeT8TvB9J2PvpH87/rfTpwA6/E7uAXzuRn8X37UP/W+yqG+4H8K5Lyic/oBiZBTaY97M0+6lyMsU3XN9rpk9bb4Qmc6gkYF1BsAIZ3RqjC5XOXcbdlIgMd3lEoyl1t1p8HmaLv8IdC/9+yl/dy8YBZd3g8U7OezvhN+O7uvobqe1gurhFYPpXiKKrXO+30v8e/A0Xgdagb3EolgkFaQplOp6qL23fP3119vry7e//e1t8S9NNjo3KgMN1//1X/+12XQw1EAEA1MNVxSUTj9ONHRnwST/8HUaPQe8RZgTUOgAAEAASURBVNMb3jbBdgiJQeEoxnjuNjnxdowc5pGB6QwETw3TWL/3ve+1cy8YbZTX/0vnYHuDt8YaOAwctTccJsTBQFxjmsJQ/h8g/5hoO6Ikb4pLr/9Z8bxVL13bj1LAPfZWnDeqQSMDDzNQcY02Z+Qa1Q+rQueZQPzCm53zO5jyfDXgwbhmYCpKc4M07HJGg3XU/JCiX2TODa7js8h7TYpRj2LSJmnwmoGVBSVRvvvuu6s8tzbsBjdHeR/YGjZwnEZBafBsAWkxHyQulg87jNiPCq4bls/PW3HMC3wH83nPeRRMN1vusYbtvJa04OAb2m+m4XWDMrDKZ8ibc9bDOq/xFaKrfBYBtpo5ucmTwcXzcH0GXusOTt0al41lAjC64MYhUO6h1krQVjQdXDMAyueDxTzEkYGWAfArrlfvvfce/dU333xTcd0cwXUa5zX+tmbjRyCGLuMeGbrxmREy9OJ4vrCvFjx3FN+NzHmd15DNF+rks5uNrfgPcWSg4ThpqGBc47MlR33lYrrqcLbfBh7wA2xWfG7rY5t8j3nAfMP1Jc8Av2ukAGS3zdrvZTEt9rXD1XXh9upuwzUB5uxVv9dEw+nRDAQHx3kGpPGwyRdx+ZroOVLzjDzZ8kx79NOf/nRBqz4ff/yx8eHaHl3INWl4ANiC64pZ5NrEd13JVXE9tU90U4TenGOf85saexN15EqcKtPnCyb9AlA4XzpZC6fzJe80i6fD3yx9bBRY189i68aBE9cv8WdO1yFnPbZrvY7gOiR+lcUv/Uroxa5ce7WpO4TXfSHbiFHlvt/bsN9kAifkBDI3YqfyHtt8wGSrMVqg7gd2cS2e4dwX4Nk4Pa4Zx7ysyznsR3V9VHAttsV07TNh1YvpqtMH21XIa8DYel2MVXXmpOZHv8EvMkCOzBOamitl9TW3ytj2JbFS/ad01a6s31XmNcYjPLgWm9U2pcOuXl4xjE6811j7yOzJpr/7rFwfOb5VduzgDzNAfiq+K97NXdU9HPn4kjiZ4kbHBlUf+/DFP/3TP+lDf5LyLI1eP/Y1R3WeKoNd8WwcY2yLp88+nDz7+mTuGdfL+8R62XxqDrbtTT94pYrxqn+aMrgRQxVPrqHiTYzVMcqMVYb3zXhw/ZyPPtTn50L7ZH96jsAr9X1srrP6KWvzWqt/nvlUvg9d/5T/VNynmQeuhdeDeZXl6vTr9drFNHZleR3by/jwp051HPLTpG243uf61Ota5ae5h+uca5891/mm7v8ao8p13HXK4qrGrDhSrnxuTPURw8attrnxjpEztsrGelJcDM7lverdT9W5rqpDrn19XjR+yB7mfM3FnP1J5MTrROwqO9eUrvfVB+6Z63jxWX20oat6ZeyO0xeuP7Y52id3Uz7oPK97e9+fm7vqGXOVcTXGyyCbA/Nh373N6bXDve5TvPpNyRVTvX1XPO3gzf+LVSfvY071q+8UrhlT9X2OGL+NzGHvg34O073vvv25ufYd/yL69Xu2D4d6rk59c3oCPyouxFivY9qq27aMGkO5H28sufGqvzrH9r69vfarXPM8lcs5neNqrCHvjwNytS2HU8/lfX695lPXqPed64sp+Zwf+uqjDK+kvuqQq1/vQ9+zecqv6vq4u/o1NzXfVb8rxjY7a6txt/m+TLZt+TMfvY/6XXmYu959vF1xsBtrbqx2Y9EXi1WHXt8q6zPF9XOcPurt93yXvfenX/dnnqtuaswu3eOO3xX/RbHvkwdz/iT2JB56HPVzbbNj24XrPp595699YkF1zt7vwuPhz+r7ULu/tM91mIvWj+37c+NeFv0UPtVN5ULdIc8h15GrbRhxTf08/RhxKNd/mx8+vd1xu/i2ceRvat3obFPxt9mm/IduewbqNeB61f62kduu7dy4udhz+rk4u+beZTcufr1v39f3EM5+tu1pl33XXNti7xr7Itsf59rsk/ND4u/y3WWfug6MqeOU5VNj1PVj1Ve+K86cXbyZQ/vErnKda8hPJwP75H8fbEytdg4PU77PUrdrnbvsrN087uur/7Pc98s0d80n8tzz4fO0532wss965+LM6feJWfO5j/8L7bPPm7EXeoNj8SMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjA/tmgC9bLY1iSfSXP/vZz1pDXn8pPP/4yBeV7Gr8UWsrusRY4uWL8o3b5tp3bcNvZOCADDTcxh/8bdqPfvSjVjj9Bz/4wXmK4J2laPp5inCdv/HGG2f0v/Wtb52m0BKFph/Q7t27RyHoB2+99db9vqVoHQXWz/BL0bHT+J5l7BmxaMRNgb3lr3/96yXF2rOO+o/HbU3cDwfsabje8AyAl08++YQsrMByMLcEY+HnKfJ4nkJcFI8+pUX/IP73g9O7Dx48+CbtbvR3UsiLdjv6r2JvLcXMG4+eiutfJf6X2Nb928H4HcamrsndFB/5hhYfCqY/yJyNEo/7pxVGz9znKVy2TPG9VeZd/fjHPxbncvYwaGSgZQBcR2gNPL/zzjvLv/7rvz7P+Xp+/sor52e3b1MQHazdj9+9yPfCweLdVMO5nf7X6dPA7FfBJfj9kn7anbRtBJa/jj9+dzP+m7R7AfL9YP5+9A/SP02jEPv50f37mTYT37179NVXX7VCwdFTaHJge1uWb6At2GmYznPGMs8DS8/H4GWZ5woK7C6DaQo4ngVS57SMQaadIqedJnXgMP1HvvRyW1Z5zj7PAvKM3mK3Z5DEpcgv41bBOPjdFmPYRgYeyUBfGCw4a1QdwZn9Kldd8Lz22bhq3skzYfOBK69x3fTBNUXROZcXtJ0Bh8PIwMUzyCYPgNpOzukjcJRnggrWKusKb/pyC1TbFvliuoxrgtwBYFrZQun087pylPecmgYfGbiUgRSTnMPpxi94qj4rngtoFcO5HarPZuxVBLDc45s467N6kfeNLezA9VWye/PGvP/++zwHLPIZ3OaMTBYW4ppzGzzzTMCx7rMCctqVcM29sR6/SbhfTsBcUOZtPJ+PwOvamv4Pf/hD4+PHyMBEBjZ4yWfMvbnHbN/Hf63bhOlj7OzvMXKRz843ce7c2fVxy8Z1CDcsA+sieHXXc/CqWK4y/jR0VV9j7pKNsctv2EcGrjMDFa9Vdg7vhSmbPtfFneu64t3UOO09TJ4Dj1MElJz6RWbK9G3qeCCca/oaB7+my3s4da3PeyfmhcfnadPcnHPYndPvs+46V5X3GXvjfcBHfmd8/Mtf/tLcwcUSshgTk7eio6g5rRY75wOmN9ftrfC3095Je3fd3lv30dGw0/BlHOMtom7hdN4UUTzdwumuoWE8+rbm68b5zHOI+cm0jSpmleX6wKd01b5N7uec8sWH9jjzTMV9WXXmS4zDwRW4loM5mjjHtu1aEIN7AQxXHKOrWK7x5jCdIY1cn/3r4FMYmduXvvI6/5Su2g+R5+Y/JMbwvciA2K78OnNj3MeJWbFzXde+xmRtU3GrD3Lt1/3M6atPL8+NmVoHY+f0fdzRn79O5PBp53EKN6yh18/hYfZ65v1BP8aYvd4Y2u3D1T3JvJj3JzlH3dPLKPe5M6fPcq+sQaz165tbl/7b7Pi0vy2ac4pen13xtoS4FpM52Gcd23JUbVW+lkU+oSD77HnX1Oy17neqvyvGddldB9y99Zy5+jVOzc84x2rv++qdl371QdZW9Y57ktx5+zlYx1XWMhevj/+89q+yZ/YyNY5cPMl81Dn7uarNXPdrsT/lO7cnY82Ncdw2uzGum7ufPhe75nkWa921pufBbj5dS+1XWftV+LY422zM5XWb8tOmX+27TnRV3/f1O5TXmFNjd9kZ0/uwR9vcOqfyMDX/0F1vBuauxyGz1Bhz19541VfdNr7Lf8pedVO4wt7TlK73metPzYHvnH4uzlXHbIv3Itim8lR1yvUaVfmQPV51XJ3D9airfeLXOWq/yo6F1/FVf6hc590nZvWvczF2bvzcmDr+psp9zqbyqM915ZE41xWrXrdtMd1D9a/y3Ng5fR2rPDeH+m2x8NHPePjXMVM++h7C+7iHjH3RfWs+99lLf032GaPPoXMd6u888v662p/DjfapedXp4xw916/X23fuuTyq3zWP8QY/LAPmt47ymlTd05Cn1rILP1PrmorT+1Wfuf0+DuaMP8XVuaa+r37w7Rk4JG/i6JAx22d/Nta6/ipPrWbO/ji4rnmciz+1lseZcyreTdGRt33zvK/fk8yd+LjOOZ5EzOtc34i1OwNXxea+4/a9T/p4jNtn7POMwW1rc7/y3VdqeFxnBqbyrk5+nfNdZyzvjeuM2cfaht3e93H7T2M/j7vGl3n88473Xbm/DqwaQz41J3myTdlfGh1/OD9oZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGA6A/7x84b//Oc/p7DoIW0zNlNs+wPW6RUM7cjAFTOwLuzFl1OCu/YllSmcnoK4R0sKk//mN785T8Gi86+//jo1pm+fppD6WQrObRqFzP/zP//zNIWeH8TvtLYUGjuj4Z/ikOdvvfXWOXJ05zTipkj08oc//CHF2i+qgV3sY0UBVe6h9boutOPnyMAeGUghkCX4+dWvfrXxTnHp8+B5CV5T8O40xeZOU3juNEXu7kdPxfJv1u1u9HdS+Pl2CtTdjp3C5xRMh38Nx7bm9JHje3In/imO/uDu6Wkrvk4B9nvBPXM8yNgHzMl9kAKOy3fffZe1LCP32N+seQgjAxMZWHJmgqHPP/98Feyeg+Nbb77ZcPbqq6/eD87uZ9z96MH03bQ7abfBbzg4/jL2LyN/EfkPkT9Lo4h6/+xB/09pfw7mv2BsGvG+CabvRn8vc9xLDOZ8kDWdxu/85PXXz3IvUMx9+eabb1JUcvXf//3fR7ye5Jwnpi3ioJGBo9WHH364DEaWgc8yzxmB2ArcQOfBNHg6D87OTk4WZzGdRT5NdSfk0zQq4d4Hh/n/rtPw+iyxLb34nV3EOeKZhzmWwfR58H3OEsJbi7zBbNazyvPLtrjDdsMzkHPu0j9lBi+X+jU9wdgqraqQF4vj41Y87cIwO7wf1wpSA9c1ZrEjit/GMyVzIjdjnomW4Jr+oJGBmQwsUiRtA1QKSkMpbtvASZHbPN8eBUubos7IoUXO7xytqST9kJp8WfXQOC+1t4RrDB+D3eUFtFOx7QLPDcN5HSHEKkWBl3nPucqzyMD2fFJvuuUSrklGnrE3eEXI8y3qhtlgC446kDtuAsY1VYyr28nBcAY2XON8koLr4DlzNA6ecw9haj48S2dNDdP5HAX9oJGBRzJQz+s///nPj9gv3vYdLcA0H1XEgbP6mD5nNgPAZtqVcA1+L0IE35GD4IR6+OxBfLANZf4VrT6H5HPFo+9973vNPn6MDJQMiMd2BkZPXx1urQ+OkRuWg+sAvPoUXBuGoXtRUNyw7IcmDedlpAGbHlzHpq64DXFk4GEGUgTvEj7XFnVy1Mi2dm6vfWHgTFtR7y1WrFaZALWvLN97guF4czLAQTmB6x7LJEQdXExXHIMzSL+L3v4/Hc+IKczusu8/0/AkA4uPP/6Y60hRaa9n02NbNwtOy/nAwELU6PqGzcLRcO3Et4kfbE2Xv8nIJ15Xe4ZNjEmawDX4EZtiyb77rZy41T45zw5lj2P7lROi9pEHPczAIr8zXvzkJz9RwzURS3BwJC7BnEXMKWxOgfPX0yx8/mbkt0t7NzLtnbXOvlzft2JnLHHgxDU2hdiZV9y7pn6dYimuV6cJXPfBmKdvrMn19P5X7YtZxiuLXfva2geDV53ohozzmoltr5d4kot3cEfzPMY+R8TivgCzYFjscm+g914Ry3JiO6+8rss1x+3xCFyHmIOYU9TPpa96uRicirGPbhd2tU/xfeLfNJ+aJ/Zuf0p+nNx4/Y1hXz6lZy0SftCG57lE+cJyhZ/r5xqw2lMf2z68NsZp62X6+1LNO2Ps1xxUfY2rj7zabrLsdWkf/pdEkCdf85TtF7crixUfczLBvV69z1Umdq91rHHRaVe3i9cxrrPGvopsruF9zL5/lfg3ZUyfK/PZ6592PsQU61Cua1Anr88I+mmrHL8pX8bop904zyIXzilnLciHni39ePf0PHOuw3VQv/fa78/x65hvLkad172JNTlj8dO36rGBSUi9fEqHDSIWcsV8j2198X8aRN5tdb59cV1zxHjzVWO9SPKh+Xe/U+P63Fx3Huqc/VxT+Nw1P/FqTGX1fb+PV+0V11Xux1xn3xzIp2Jjk+p61cm3xdDnZeZT+1cnn9o/tkMIf/HVj9tmw9frV+dU1qZf31cvdw3Vby4WYyB9Xae6x8V7jdcmyg90tLnXSe36D75/Bshdpan+rvxW/PTyttjaHGO/cucWb/rK9bVf/apNuef4V8wi1775qDrnMJZz2++5e5jTO0dvn8N771f7c7Gqz02TzUm9bsjqD8lHjdGP2xavYmTOT586hzrmUu75VLwaw3VO6bQZ374xK+61yfGpTb3cGPbljrE/x/f1mxv/ounn8lX3oc+2a6lPHTcni6V9cm1cOTEd369nqi+W6vh+XYzDryfnQW9s41Sb46pNXeXGqLoqO15dnQObTTu8H1NtU/KuNUyNeRl05umQ/TPm0NfDOs8hc5HjXf5TdnRVX/vqWZPrYh6o+l1oHv6stio/9Hgo7bI/9Lws1fVU+bLXYb3rinPYrM+f9648YN+F610xpnbtmDlMaHesfj3Hrk7fQzhjK9VY1Vb11X8fmfyxH/dUeZWJZR/5KsR421XGvyxjzMFcPtHzTxxz9uclD1MYFIt17ci1z/r1e5y91Pn7OHXOOnfV92MO7W+b/9BYN8Wf82bXmU0urpLbep135XNb/GpDrv1dcav9qmO3jWOPntl1rio/LsYPyWOd92WQr7r3fTBtfq46h+PhU5jchhvH1HFVrrGn5F2xp8b0urn5tuH1OnLVr2P098/AtmtDFHExd233n+l6PF3P9UTbL8quvV8Fw7vyvt/KhtdcBq5yTeZiPSn9Llw9qXkPiXsjcDr1oeohSRq+IwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDz2kGKMyVRvFb/jh6849BKWK6TOHS1ZdffrmkQC+Fp+/du7dMwbnz6M9TmOs8RcXOUqjuLD7nFDSn0LothRfPsOP7H//xH8Q6//Wvf7384IMPWiziMgeN1KRYGaytIV+MvOufxvAdNDLwSAbAcQrOrH784x837AZv5ylOvgKXKS6NvExBrvMUUDwNZltLQcVWQD1jKSR9L7Z78aOoeUwP7mUSWiuonqKmrfh5+L18+fa9xMqYswfrsQ9ee21xP/dEK4ae8alBdt4KWzNvCqJzfyx///vfr9Jvha/ZANj/5JNPuA/pDhoZeCQDv/jFL1bByFHOy2Z79913lylse06RWzAGcQYHk5zlrSA6GD159eSb4PGbmL+JnurqrSGnwOJnCfb7tL+kUUjdf+SH0/9/M+7z8NtpVD3/5uTk6F50D7h/wltx9sRcZq50l20hFfOR2z8vue7EoBpw00UeNDJw9Jvf/GZhoc/geQWQ1oVAA61WuSPVG4/PU8MpbXWWdp7DEg5GT9PA/Vl4s4Xvg68WizEp5cg9Y59Y7TkkjHmXwXyNNwpKJ2mDpjMQzLSCUtUKpmsfOXhrL/ZhFCc7SQvf/KM8NlwOfiDIrUN4fjQhcQl06cxlqtjbmtbndsN8fLn3HlkrAQfd7AyAI4uknZycLPLscEyhdLKSZ9qjnNfAleLRx8FQ+wJA+hl3jCG6DZbXdiroHpTUC2wuLgC+LoieGK1IemxHOaubnPW1YtI8D+U5pfl//fXXvB84aL7hfHMy8Omnn7Yz9y9/+csGp3m+brpgCAw3XIP9ZCVQO262yPKjHJ5NadYw7EUXNwJncHMPYBFay/2Err1fRMj8PGu35/TXXntt9frrr3MLHHYjEWjQy56BBj9xzRnsec3G6Z+dLTin21kdXF2AOjgPvpBxaUXSPa8PT1jDJedvg2gDan5wVqOjcVbT1j58jtier9sAvAaNDFzOwOa8jfr4iy++qH1kMR1YtbOaZw91sa+QwT9sXRi4yfT3JT6rC4gXDctBecOvzx8JsuJzj/XZzTPIeZ6P+Pz84kbYd5bhd5MyAAhtDaPrvjnAhp4CrQJWXOOjzhjoDiVw3M7r9cCG68g9x4yO55B2mK/76AaNDNQMiEc5NrGqLI57Xsdoq7H3lcGluO5l+rXh1+N633mGH8nMZ2Aff/zxMYXVu4R4PbmWnGNwdHCLrKPf1aZ8xYcxE6bR4qOPPtLm/Noeh7s3Y9onZtV5XqNzHXWN6uv4fddVscwYMV7Hq6u+4r36DfnydfMacq24hmJO/kp0FDK38DnFzm0UQX877Z20d9cN+a20N9Ow05AdY9F0iqXbmMPGvN4XFTMVN1WO+2OTOTBu7YthdOJaWT99Dl1IxSpjK16RoeojxtXr0xzHj5aBmpMqe628dmBMzIs3+ruI8fh7T8jBMrL3Cxwsy5HFT+VRXzpH6V8X1T0bUx17UHY99vGtOsfuyytmGTOFW3y8Pthpknr7g18+B8ydeaNvjrWRsyrvm0PGQGChYkBZXu3eS4yrdnyO8ndKsOsiMSo3rv06v+vChh5Shl+Fak6Re9xqh7fPr8PVOd9V53b8y8DNSeVimP2Jbfh1v09hTojrIB7Ah3jpZf0YI77gVU/M9edsuM1SP8b5nVv7Lr3rYBy+7ml24gMMxCLn/K2J14Hh6L1G8uuclzleBNp3z/jpq2zentU+WYeYYQ08n/RYFlvq4b4fAGuSdrFLH9m+fnDGqfdZqNqfpjx3DdBDXrNebsa1vfepff2eRz61TnRT+rn1T+XPM/rQWHNzHKIXk+BPEpuuB5+KwR6rxpBrh9dmnMp7X2zojBXxiRLXwzZ1HdX1vF+UuUJf5d7vZe3XPSvDpSqru24uroxrXyyJK/vVLk49Z+lL+tFHxuZZrT82qNqdT32N05yfwA/zDBfXU9Poh01ZXv3Rqa9y9XnZZffvPs2rXP3jcLEB30b6VWwpOxaObqpVH2PBxXE/hrVUP+R+vupTc+U47IeSceSOp0/e4VO2Kb1j5/hVxszFepH15hNOjqdInynb3PVGL+mzDxdnjMVfbPay/amYjvG8rjGN249HL2HryXnQT+Vjaowx8HdM9UPneaLdMYfwGp9xjxPrkHmfF99+v/Q9L1ij+al+vc/UXuq10o5OPPV2+uqIX/t1jPqqIz56dOrRSY6RT/ngqx0OTfUvLA/nw8ccVZsx1E3xmlPtxpqy6TP4oxno820eq2fNaZX1QefnqOp6zjzgB3IOdP382NX3HBuk/qJ3+afx9Kn9OlZ7xb6+vZ+4lztWP1egvs+R/RrfMXJ97MPNk7zaDpWNMTXPobFeBn+uhbmA17Pb/aHfhWt8++tq3/jGU9+PmdLXsdhtYhAuaYOjt1V9lY3B+CrTxw+SK9d+c1j/qHGrXtlnDfghxP7NgXxq/DbblP9N003lB52fBc7lo17XqWuvnfG9XZt6+3Wuaqsxqu+U7Lg6psZVrn5zuhpfn8q32cV1n9++X+MdItc4U3s5JNaL6ltzUOWp/Zijfc7r/swjnuONbV/e62u/98GmDj41n+N7X8dpp1+b/ur0q3yXjfVMETkW11PnNfZd12EqbtVdR4wa70WXuVb75HQfXBOrp11Y6P1r33W5RuOrr75zsvPLp/y0GX/OZ0pfddvGs2axXcdcp8wch+TmOud+1rGuuu99ciY+9tljvw7Hot+Gjz72nK/x8Pdc73316fX9HPZ3+c2d145nb2C737v2wZ9uBrgO+57XYqVf4aHXcgpDc7Gda84+p6/jlHfxqXUxBr33z1QMMS2u5+JMjR2668tAxWG9JlMz6Ps8Xqt91tT79H33PKfHjs2mf+Xm0FxV23XJxH6S8fdeJ39ENmhkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZODlzkArQE59rvU2Fymi7h9dL1LA+dIfN//qV79a/N3f/d1G97vf/e7k+9///qafGMsf/OAHLdQHH3xwiVsMmsLnKSq5orj1z3/+81bzK4WVaow2bvwYGTgkA2AoeFrmC7bbPwX86U9/On/nnXeOv/3tby9SNPEsxUtbcbAUultRQJ1idynOdZZ2C5kCi3FoRfIs/vjgwQPGHqVA3dGaryguSrG8jNsUsYv9LDq+IBg8n+GTWKs33njj7PT0lGLtK4qRxu4/2Rx9/vnnq5/97Geb/iF7Hb43IwPr8xHcHP/2t79dfvjhh4sU3qWo3Hmwif40uD+OfBYOBcrHZ2dnq3w5WivEyBcaU+QcP3B+L8VO737zzTevfOc73/l/0v9h7BQkoVjDX9LuxP6/Yv8iQe6nfy9jv2F8ot2N7m6wfBps38vYB+A+99Jp5FZMHdxn7Ordd99d5n5Z5vVildcT1kkbNDLwSAYo0EyxdFpw7XlIUedArVXC5Vw9TUHHB8Ew7TT9B2n30r5J44vmwS/nPv8H5fNLxEcoOF7dz0PPvcS5H/lBGvEbflM78owajsF5iqcf5x9L2z30SJChGBmYykCeARY5GzmEFzkHFykAepSzmX++PQnOTmKnoPRJsNf+ITe8fYll/E8CdcqTcoK30CnDu/ehyYGf8esCpUe8FoDpTLVsuswdPLdnbM5hik7zHEMh03a/5TlllXW2ecePkYF1BhZ5j7ZYF6yhQPRxnmXbA0Ze94/TToKhk0AI7MZ8C4zfik8r8hS83aIfbMNfCRfzPCTvleTz84ZrXxPAMOc0/SWYT8iG5dxzy8ybsC3wKs/6K4rv3r59++itt6i/Nmhk4CIDgcjJJ5980jr5jGKR92G8RzzO+7PA6OT4zp07DcvB963gmrP6VrDWCn7Efot+Bm8auA4I26EdGyf4Pqle8aCRu8Azmy+x4LBeLrJAQqbfMJxuk1+JwEMQz9fB+tG3vkWNtUEjAxcZADbBdQOfuM57vEU+BzkJnk7y+h7snt3KI/atvDe7BZYzBhy3Z5BA6xK2wXVsGzA3bO9O9ursjLebS58z2pmNIuMzxcXzyMXz9aKd4ZF5/m9nOuFzXu/34rB7LcPjJcgAuM42xCF88d577/F8fRLc+CXwG86zCAd5/E4CqvDjWwlAv53ZweE+hcnifonA5EULjnNDcV6f59xvuI7cPuPjGTxTt/N6PTrL33y2PnC9TspgfLLw8LxOPhquw8E6WIVvnjHWOvsN253dc9z7JOa9CEyKV3jDdacT+/oR2HHIg0YGNhnIZ9aPnNcxotsH05tzOv5i2vthM8cegpgVp2JXrr5ywtpX3mOq4eI1/+lPf1rPH2SxoFz76PRXvy2ZXJup5jWV43P0k5/8hL7n7FHW5nst1AeTe8xA1y2fOo/FceXKnuP77LlfZ90/+6sNm/3qV/XEoz/oIfa8jnCuSb2efJbF7xZof5XGm27aG2mvFfn1yN9J+7/S3knDl9+f/c+6/TGcD1j5XBaOjUYMfodh4VF04APy/HNdrpMYENeRjwvAtbpmOOQHzyHEmWg1FzUn4ndKh814hywDX7ArVtvnIWtd1WPvG76D9s8A11ryutNH9prCqx/2KcKHaw7nHgCH/H4O/INzmvcJ+ttp3Ev48fs7rzPzeV2xtfdo14TrhLuEb/c4hePe1vuA7UOJfUFwz+fK3bd2+/gMejQDfZ6qh7lDV3OMXG11zDYZXNdzUDxUDmbow/G1iSUwjgz+jXfla1vO64S7hGvXWdfmulwL/fb7mXD9GMe6DqWaU/bovTyXd69bv3f0N5lqHs1FzZX5RNe368gb114sgA2bWOnxYr/Hu9iGiyd+J8ga+2uuXV+4GBWP3keuDY5P7bvWqTXF9cpknmsAdPVaiXd9HNM2rPIl5uyf12pyv23P2PAzPxE3pG7b+I3zExLEHvsAcxX3rNs9eu0rlhnr2sWrGOU5R1zCeQ6qOufxPor5qZP532di99n7ojcnh8Tr4zyLPtevknthP+6p2pHNA9wzQF31ZTx6/ZgLjDxJIj54Am9y1lExyZp5FoHANjbXCSZdpzr66Gts+owzrjiveu1wY8KfNLlu5tlnvjkf4sxhgNjYL5F/V3BJ+Xx0WCvXnWtY8zO1On0f2d96bMU1Mo3Y10XeI3BxI5YqDtGJSfQ0cAghsyavrXvC3/Uj2xwPJy68P6v10c5Y14eNvmuKeK3kmqeuST8RPrbeRr+37RNzKs7zoGPtYo9r4PWua6v7M4/Vrmxe4Po5Fu4zjP49x8f54VNNfMD1Fzf4owfDfG6iD/tzbnQ0yRhw12wcsY2/Mpw8qTOefeyuG52+2rXFNEmMnyPWx15Yq+Sa4XPEnFIdq06ObZtdvxeFkxP2vs+ezGPva07ML/mn2ccO1vpxUV0irr/XQQxULr70YbA6uRgSV6wDmbXYIm6orhGl8xmv58SqDTt9xulrDPXa4jJL+sCnyJyaazhr35XTGmtfX+eoY18k2dywZq/J3Pr1ncIGY/pc2JfzuxTkOeJ6+rrNHPSrv/jh+mKz9Xr62NQTy3sMnIkF4+jvXDVujdNjuZ7F2owFt2FTb+yo2hrhEjZiwqeI9wg01i+ZW7n6yt1X1fUyc26Lgf/cuvpYz0vf/cztX/0+ftVHmX0i+3sT5Kkcoetxjc4GNhyrTi6G4MTwvqAvliM2wlZ19l1vjYlMjKoz5hRe9ZPjo1zjRH2J8MHOszvyFIFpXvO4H1mrxPprX71cG3zOlzmx6+vYF5U/7l7qeHLGtYHUmyf43TSuyRx5XcWcucYfmYYPsezL0dP0qbLxXBN9yPXKL7QXP41rPPFZ4yrrI0dfGxFrPOQpYsy2P/rnXKBVbLon+VTcXofvHG2zzY15XvXkiVzvu6eaw3qNql5ZzNDnd97bcE0sPhvm+uo3ta46J7ItYpPBIPOhF4+uRz02ZOZy/xE3ZMyKz15HH6o+yuj1V8ZWdegrYedvB4xbbcj+rYzvgdGxB6nK6uDotcnVw+t81Y7tRSb24rWte5zbE/5T+9+mw7bPeQ2ueY7w8+a6HmSuPWuthI74dQ/42hzj+H6d+lW9OjhEDHXIta9eX/wh+r1fM8z8wJ+/g2FMT9jANee1uGa9rrmfO6YrUY15pQDP0SBzA98nP3N+NSfK+sL5ezyuyRxxPf1sWFxXX9ZGI1Yl9eiQiVPnRw85tvrUsTUuekh7j09jaJc7pg1ej1eHzzZiDv7+ET5Fntfcv67VfeKvbmrsITrWeV2xDpn3WfrW67drHeTGa4l8J433PVOEH9cTXNfzuvc1nlw7fa9FlV1D1dWxdQyx+n6N38vGgSvjY1/ej7Pfc/bP8/UUronFWc3Z0L9eRXWt5F7MxbUGf4rBXL/7edypiVevKTI6rsvUORz1xt/fT/t8jU0yjv3Kqw0Zcl8Xvcs/q49yHVN16O3Dq7xtjjoOGXLsRe/yT94LzOEaT84EmrjeNTdjBl1fBvprR59rsQvXnFPieg7/+6yS+bzmyvJ+/Jy+96OP75MkcQ3vibnJydTnfL3vS9HnRXvQyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjADchAvmi7/QH4+sta3TG6S3/EvS7mrH2RgtT+04A6uX9Q/kg/hRmajuLWEfjyen0GHxl4rAykWKmYpfD40W9+8xtxuEzh9BY7xUFP3nnnnVUKT1Ogl8K5FPFapOBjwzIyxUzhIQr4pqbjBU+AVnyRQNEtU+zL8ecUPCdW7qHzFCdrsdB9+umnqxTiW373u99d/ehHP3I9qxQkmbt32jrHj5GBmoEf/OAHKa54dgTG/vCHP5wHU6sUuAV3p+AwRHF0cMs/uVEEjwrQp2A3NjBOQVMK6D5IkVMKh3z9/vvv/yl1Hl+LTPHHO/G/n/viy3BiEYdC6fdSI+QstVH558cH8afA9INgPDVMz2nnKcR3nvuEe4qipW3ZWatYb/3xY2RgKgMU/AQ7wRNnapNz/i45O4M14HUeLJ8Fk62webDKP3bR/Edzikzzz3L8Mxz/FDf1D2FgkUaV6AepfH6ayU6jOM0Nwz1ymsMYfpba7WfxOU9M7pnzzMt90MZHT9F05EEjA2ZgUyg9uF188cUXYPA4uF5QMB0KbDi3WxH14Oc4eD6OGj8efhdAnH78WkF1xqcf435QK7hsBdEZC1QTp/XBLHimobt1qz3HtHWliDuvI0dZ+36TJcCglz8DH3/88TEFpLPT9gYt8lGenRcplL7I6/0imAGrFtsFr2D4FrqMoVF4usno17qIwXXaPkQx6dNTjuP2/JIzmSLSreBZK7RLJ/dO2LL1Mx+vH4vXX3+dMausc8Xry/e+972B7X0SfgN8fvnLXy7Acj6HWHz22WeLnH+L4OY4uDl58803W7H04PPkQv1Ke54IlDa4XsuvgO343QqYc5oeDK9VxnA2t2cMeFKPrinz+rA5u5ED6vZwwuX51re+tcqz0eqPf/zjKvfjUbB9A67a2OKuDATXnNcN1/ENNBeL4OM4n2scv/HGG8d5Fslz8QWuY2q4ztn5SuRbYDrtlZyjDdfBNs/QvKlsB3U+Dtk1vfYMWAS7tIvi6JzNPAFF155B4siZveIZH5mBWSPPH0dZJzZUjfL5jeLgNzcDYBUCi8ibdu/eveOchydgOzhuz9A5LwFrw3F4njt4Hlm9EiiHLzizN7iOfV8CpxdncgDN2Z0XDXSXGmc1ba0ndnsGKX10g0YGyMBxPgM2ExtMo09r5++aa+MZ2i/8gdvQ0xiz34N1HAttsB2d2FVX8a3NodWGPOj5ycA+OHgi1+yjjz4Cr1J/ZldcI4t1MSymxfnj4Lqd15mjcvZsfwq/Vece4Pvks/rfJHnxr//6rwveV/m73WxeDHj94Z5PXnNypB1dn2P74rReG64hxMMiMrbN57RrHTHRL3POwonXx4xqP8rvFut4ZOLb5nANjrFVXKszHzEfRG1PGdHj2Dxg1wcuqbcPNx9Vd1Nlr6/XVM4Z5HkEt6A5X6pI4xfLf532f6b932l8mTlj+B3F99P+J+1f0/gCVn5PQeOXZH7pu9gRU3C/gLheR69fvc5N9n1anm3r9U6Yvch94+ye5a5Njh65ntc1P9rwO4Tq3iqu3au8+rFu96ve/iFzvyy+de/mg71VufarP3px0HNs2wh/rrf3BrjuG7+rw24TP3CwDm64xuKrneXXiGvXSHznYE5leV2Xa4Wjx584hxA5Fs/1tcprUu1i3PjVB1k6dA2OexF5nwP7dS/mV44Pcn0eMPfoDyWwUXExJ4MPsAK3MdbrhdzW/xRwXeev66prd63oWNsh5HXo86y+cq8Leah6ZKnK6l5G7v7dW80fOu3wqXyZJziYvg5iHvECFpArTqqsH9jh+QbcoGMtyPZZH3tzvd4DUTWqfWTHOt6+88mZd6rVNTL2Osgc8/rk+SF3X3Bl96QOX23y61jXs47R79P9si7ket21qat2ZKnK6p4GZy9gC/x4HsJ5Pqd5vb2W7INnG7DvWPdYMVsxaizjamNO53ZsVE+V2IPXk4ndr9eJ/dqw42u/XjNzoA8cqj4Xmvzks4JN59kKU+tD5x5dnftDL6nr+73+ae6VucCS56Xc85G1cZ7RRxbjETc4YDz7dB/E7OMwvuKaPrh2Hv0rf5p5YO2Vat99wd0nvlXv2Cmdtkf4+u9lHtE/Rwr3XJeEDpL3sjmSm5M2aD0OG2cH1xj741xrY4gdYoNJsKWMj2cmeghc05gfLLIeyH2Ja2JAxoAzF3a457Pza3O+qq+2KifMYxFr9rmj7gO9+2Hd7MU+cj2/0217RF/90EOOIw5UY19oLn5i17fqn7Xcr7tff99nverg5ARCniLzJuc13zFT/qwHjPT5Ir7YqTJ+Nu21D54gz2tk5hcP9CHXRwzJdYhJz+XKtcGnmjFcm33X6FyV4zNF5lt8yvGdyj86G/tTrr5VJs6ViPfiV/zc9Erz7Rg0ldu5faqH2wivLFbl+uMjZrgOfB4Nx878PXFNORMtpoLdOcQEOtcurrBpV5aLN+ZFdj1Ta6y6frxxwLUyXD9439emf91zlTN0kxP2P0WsjT14VrMP+nPkXuB9Y0zVzcWoa9R/zvd51LNmSH7Rm947+XSPcPuMUY8MVTvXgwKl8DkijxTo5PcyvR8286wsBzdcY3HUc3Hl+uqaiVH76TZCPxfHeNj1k/dj9MEuIde+enz5/dWUDR9e77zn65rNMz7IkHud4hceD33t9+PU15jqnne+bd/us3LyOUU1DnauTdWBu6/TerxGtSGuKwU6v0zrzyLiYScmcm3oafrY7zlj1SH3VHV9rIplY8B7v2qrdvwqYavE3MzB72B7m378Lor/ZSQ3XId6LRg/1cR/3VtcN1THbJQzwqUY+buCo/wv/Izrc6F2vfJ+UerhytWnXrPqg94+1+KrtB6vNQ7X8600Xos5myoRy4YeWdyo7zk4gVgDvq4dzvUWP/QZW2kqPv62fi77xKiyfcZVPXIl+jzjsH/XVe3IYHoK16zfhh9Ev6feB3vVTY0xxjabPs8r79duv3Jl9oBc+1UHbrhW+nBOcw7zOjpH4PCdNF6L8a+xp3CAbqpF/YgerFScu646B+PsE1csyhmPXBu6qTWgg+Tb5OaYH+D6vTTXqV7O89ntNM9r14rd/SAfQnPjamzjTemwscc5m2OfJz61VnReK+Tep++zH3TimtfSOQIv4Jpn7LnzmrHiirishYbOe8m+rw36wCHt/Vq1X3g9/FnHO7e6Gk8dHD+4pK32leUV13Ws9opr1l7Xr6xe7ljt9qfia4Pjj08/DtuLRObB/cytXbv7dZz+6ulrg4Mxnq+3nddggb/5A9f9eR3Vhuo1QbbhUG21j55zkHWwHv2YE6rrvtBcjqtOvDoePic7pvpUnbKc5y/u66nzmhjgmhy6h7rmKsdlQ65to9hDmIs1p98j5DN1Yd01D32fxdW9eb3qGH3qWOycpbyG7jqveb7kvRPP4saoc0a9IeJqq2vo9dXHmJsgRcAmzot6IxK3b+J847QW6np6G/3e7tzgeu6zPp6tySGvZe4p4pWJNRCnj9Xr+v6VJ3wGA93bVL5dTm9TL6924vV9zps5XOMPRt5MA9ecS5Druug9/GnsOo+yHJ86vvar/DDq5TVXfS87vxx7laf85+zoWafn9RSu8fFv0j2v+zl29Z1nl9+wb89AxRTPFZw1c88h+PJ8Ca6nnq+jvhaq2KrrOzQ4cWqsQ8dP+YNnXq/IwxRxJvi7rWqveK1y9dkmX2XMtnjXYptLwrUEH0FGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgaevwysvwhp84feflHxxEr9Y+6Nb+fDPxxtKHGV5/y1Dz4ycOUMgF+IAOuCJO2fiFNIbvHBBx8sP/300+O33377KMUelxTGozgdRXvxTyExij4nxGLx5z//eeqfG3HbEMVFU4BsGU7RrxXjU/z3KAVHqUjaCkVnjmW+FHL14YcfsqZ6T/CtY+Ne2GRzCDMZACfUBQVDy9/97ncNs++8807D13vvvXdGwVuKNwdzFJAGwPwvyAmFFCNT7O4ouD5f66lI/Urwenz37t1bafyTEfZNYfPY8T1lTOh+4j5In39I4p9p+Keas+hP084SB/k8RYGXr776aiucniKO5ynIt1xjfpX7kKKUGTZoZODRDHhWBqftHE1BXgqVn9OPN0VyOU/BFhg8DT/NKf8g1dTvB3r34wvG+TJivvRqGzH+fm4m/pEXHN/PzXI/EzzIC8CDxHiQW4Z/gmTuzfzp81qxCr43xabff//9Zc7+cX4nOTed8uVdix/96Ec8QyxyHrYW/CwoKJ1zmecIzuWT4IezOy7UKW0PKifBMVVELV7aCpjG93jztLzn/0wmbismnbFgHAw3vj63z8LRLXO/tOeOM6z552AwfefOHV4n2vmPHUP2M7BNIm4ogd9svcGQZ4480x7nXG7FpF9//fXj27dvbwql5/y9dXZ21gruBj+3gu9WLD2Yorg0/6Tbnke4B0hndEfxQdxJwDpO7TUgjzEN47w2RCemG64Tm9eMhu+sM/XSHxyFt4LSxPjss8+OwPn6mWTnvMPh5cxAzur2BSPr51EwfQKWg1vwfMyZHUYLho9fOT198ErOSAqjvxrMWiA9xaRXrwbH4LoVTw/PvbII5k4avndlD0zmwTlhVhv8ZgzvPzmZ23M0/RCYX2XRsNVrr73WCkp/+eWX7bzOc/Yq92c7r1+AL5LclZZhv1oGFjyDMHSN68Vvf/vbk2DlJJ9N3Mp5fUKR9LzX43nkVjD+ymuvXfBAivOZZ+dXsOUcB9fgu2E7+pzWi7w/3A/X8V/lkw+g2p6hE6s9y0cvptsZnv4yc/HZyzI+q9xbjNlQzuv2XMJzyMB1snUzaYPr9fYXf/zjH9szNVh98803eR7hQYLnZlS3eP5IH0xvcJ0zFTy/lhbd6ha+sbf7JfwQ4lmEz0bOcxrz3hS5PWfnPG/vVYPjxjmXeQ4pwZFtRT3EG5YBPqA++sUvflHxxzNJw/EEr3hW5rxGprWzu/Tb8036+xKYbFgOb88ia95wvZbRa8MXEtti2n61Ncfx49oz0DA0FRVc8Xp5FcpZ5rB6LdXt4htc+wySAQTcheuK6YrlKuOzWdyuhazt7GEbrts5HZ8e14ZnvA3d6pNPPtE2eMkAz54fffTRYn3dsXAG0bhmyvbBAzK8t6OHvNbyS9chdq8ZerBhn/Fe14iN8CEOfPnxxx+3OX7605+2587msf1HvdeIYxPXzK8Mp0/zGWTzHLLW17Mbm3uOuBexD/bbt3pemwM5gRkHwW324TedvK5cDxp9uNcX7pkEpwgoX7zHl0q+m/Z/pP1N2rfTGEuOub7Y/ULVP0XmCyj9Yjo4c4gVZBvXzjV5HYnJdYdD1YdxfEiwF67jR+xG69+TOxcYJpY4FttiWk4OzIfrp++4tp70DyH2I66RpzCNvebD+GLa3Mi1v+yc37NyBtc8KLN3ZXnVmZtqEw/adnH8uf7cFxQyoIFv+8jYLXLAF1uKFbnXH8y5loNwnXHcAxtsp+s+Kq7FNFw8VwyL62pzjY+La/ENF9/uW1zHtLnHyQNkPuQX2pvx0xxM5cGcyWt+p2T8DiUw5JkITsAHTXyAcWXs4orryzj6rAXu9btuXBO7b2K2YhsZfcU4/aeBa/ee6Tb45np4feXYXzZy7/VsUlf3jSyWK5/CMrqav8fJmTgFQ2Kj5+JIDIl5vhDdddS91PXVfbNO+95bYrfHrHPVuZVdn+tQT/9xyevgGe1e2CcyevcMV3b/8KkW9QbvyM8rsXavUV2je0KHnT57l+ibH7it5ge56pEZ96yoYp+z3LWBL9ft9aaPv2Pq2skHOMYmFuHE9DmImPYrfhn3rMhr6l7Y41wzN9pdszG8jmKD/iM4+vzzz/Vz/NPi/Xpc29R6qg7ZvcvJgT69nT52fenrG/GJkbhkbs9SsAsOwRtEHxlf10ge0MNZc91bupeeLcQ2MWxgWlm7nHV4X0R8omTeWb97qzJ7w8fr4j57XxdJPrBVmr2Wa1w/jetc14PMnGJZm+us61HX+3jNzZV+cHXwvj+lw6dfi/PtyxlPA6NiWi6umQeMWVys6tkPfePA3QfjJGPCicWYysUw2Eb2OQWOr33G17mQH4dqnnvZvliu+9Im1yava8Knp311/bgn1Wc9U7lEr017v3b67ltZH8ZgI4dcw2rXJ+qNHj8+w2DMNhIH+DDHXMOPJn6YU5k5xFbEpqcPueYal7URy3Vrcw5jwcV2lZm3rgWbY+HEkxsbXqn3qTZl7lPfK7gP1wxHVxvj0NuwTfmhk/S1D1dX/Tb2/N5rUr9xeLrC1Fp6nbkzV9irD3Jvqz76GmeqSErdNdcW3PQYoE+Migmw5D2FnVZxXWVwxnjINSMznph1D+idp8YlRt+YAx2891VnLDl+yhE35PrZP/Yp4lzg80zWa27Nd8/dk772ez/7dT50lfp+tbW/6b6keLYd1jqXP1c2lQttcHMiVzc1jmdZ/rcJPjc315bf4XBtPZfEgGu1D26YR5zAbfiIuYhtPvquk3EQfv1am2FtMx5j5xpr1aZ/5cRzzegh+spNse4Ti8/jexs+rN3CYK4Zjl6q+1PWVrk2uLGQt9Ej9vxdwyq/a9425nmwuVdyDtmf4hceFz41L71vjQOeKc44VxgMX64nhcF4T8bZJB5cU1SN1ONvQwe+6CPD6dc1pbvp4+PaxQe+kjGML3Y9s2vfefWVE2OqYVfvfP8/e2+3JOdxnOtO98xg8EMA/Kdo0xK3Fh1aDh/stULhiH2m0LlOfRO+Cut2pAvwoawLYIRPJMXawc2gZVoURZAECeJ/pnu/T00/rZzC14MZAAQGQGVEIbMys6qyst6vuroH3YWOvpk//U0RFwbeSuF1xtiNuXJl+lCG11Lb64M/1Ncndfk/O835Ofhnaj6GXXOiruKh2u1Hjj+4vp7iezl0PbG2XNDJezG+wwfV9cdOn+rg6Cx9HT0xwsGK8dS6fcW8tiPbl9w29AP+ar3iGrnW7V8e8zp+ZIn+2K+ZP/IU8X8LKL7m4eOc4JapdcEX0kd+qD38lxghbC8yMT9xIWe+5qTn2MjNVF5Yi69SHrZfvxYfziKcWezLfFeOzPozVuXoLeqjavOwjbihLfNCPxWzfvDaljplCr+9r7HAK/V1+uJ16vUU+piib6KkkEuJuC0P003h3bZ1/lUmTtvZf8+rf287C/U+PuvOy7VQb8zUa8G/J9aC/8+0Cde0Zz1ZV3DNvtSPE1Uj4ugLBtpTGB87sn0oG2dM65in4nWujkN7+6yy2MaGrE/EyRjRTxF98jr1RgqvBz0RN5jmNc/92rnIbVPrvdz7VLs2ObaNVM7Xx/pt7ODZGYy3zl18sH6bqPrrw5mQNeG9D/a+PTr65v/81Qul8cPWE3ptVcaPOqQe2bjhkNhHtn/boYNsD6ddrR8n922pQ7TZRPTPOYTXK/iUL8862OYsZ8zyqCYJe/VRVi/vG+un3jpxKWt7HrlzkDsvOXqK61Bl54uOPYb3jcfhmj6upPj/VSM2sm/HRHmcrB2suBcjG6vcfqlD1g9rf62jr0V75Q+zV98pmb2e/ZrnehOuOZuJ64hrcj6VayQuc+A8semrnzb8p2T9XgQ+NT/nDe8J/96ujtyyLptwTV9gj88D+H0Y9ibI/g5rD9arvvetNmX51Ny0yZ2jXH3lx9n0w+dhftj5jI/3jeB6ivg8hOI5ZMrHeW2y9fa+PtXuZdOZk4etGXnhtRNc8/ndJmLPYr8G1+ztPZ1kPGKpfsp9X7V+kvh7/9qmytXvNDJ98L7xcsrUfo2dz4gonOkq1TlWufpskvE/bZtNfT1RPZvcoJGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGUKX6HAABAAElEQVSBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZc4A/w40obCD823y5A28CPtksIz+x+nX+LlfSGnHjyCzcVvf/tbvhzUcJeL5JqcS/AWuQj04Pbt2wc/+clP7uey8v1cInZAie4+JRc738+leXceVnJx5L1cLnZv1Wb/s88+O0hb+zr4j//4jwPGy6Wj/tAI+W7xEN8Lmfwxqe8lA/mRGPAClriMfHH16lX4QS543M9lc63kQsV98Jj63dyFdzt30t3KZQiU74K3G7F9G/5tLsm7Htv11Pmi8/VcWnc9er7Y+I262L+lpH4jfTVOX/HhCzV3or9vyYWS+7kklRgOUhaUPAfrZ4/nMP2n2aCRgaMZ+Pzzz7eCs3aZbS4sXeTSxFTbLelcFMololz0fB++kvnBibuz+fx27roBi7eCw9uvv/763XAwtwlo7Lt3gs2buUea5wEs38rA6WfZfugsw96LfD+2/cQBvvejOyAe7pa8cePGgot3efa4vDS490wDH/SSZuB3v/vd7K233gJ3geV8lv208eBjHrxFNd8GQsEVF5XOgzEujeZLi3yBk0vS+YEQZG7BjU++sJzeot+6cvnyiS6U5qLotG/PSPi9jMcXSOtz0y7gDY55jVgkxgNKXkO2cjmwl0kPXCdpg7ZmuUwKPG79/ve/nwcf85yZd4KXdoF09sGdnHm9DH0neAK/e8H6+chcIH0uzo2D7WD6XPDYLkyPHJf51quvvppLpR/+ldW0S5N2qVnwOhPT96Nnb76fkBqu09cBe3J0izwLBzmPNEynurxy5cri3Xff5ew09uuXF9zzXPq4nR85mr/99tvzjz76aPvDDz9sl0nntV5og/Gd4B1Mg9m92Lg4mi+aw8E3P6ZwPrjey/aMjB785wbq7a3Ll6+cCNeBaFDdwM1nKO0sDU8/nHf4IYYDMJ3x2acBejuDRL/Me8p2ZgLXb7zxxsJzyHP0Q5KZxqAnkYH8IO485Qiu8znEzjvvvLMdbIDv3bxH3M3efC542gnkzgVT59irwfMhjtvl6BeCyQvgPnEF7zMwv5Pb9Gbxzxnk4Xv1aj7ssZxF2tk943EGafv1CudrbOOXOJp/zv6eodsezn49cL3K6EvGghcu3Z3/5je/abjmDMJ+Da7ffPPNec4O85xbOT+fC252sx/uBucNt9krzwdzbV+OfS945scHwTn4z569wnUAfsq0rnGdPvZzyL+fh6Lt1+m3vVfM2HzOl7K/zDMDfvmMhnYWnguKfUUc9LJkQFxnvg3X4WyqnLM5PyBTwLUFPTJ7cTt3rGTq4JqCbMH3kXGdtuzN7YxdZD+7loNdZDgklte4HueQw8Q86X/BD6/37I2r92ftM4OMA05a4XwbWf3DOG3EH589zLkgHb46VyCzFx+HqWajDX2txhfL9s8YYJM92litr/fq2HqcY7MNfZ6W2jkkjXpcU2/nkHBxW3GN/ACu8zqEbtDRDMzytzUunlYLHlgreY8B1311zlzva+11Ou348Ul+0Iwf7PNH++Do3fOQKe6JcvqkOEYduz0LeQ/I+0Bi264YT72nI7iOkfbOCZk5imvGozBenZf7srh2v34SuBbDdb8W0+zP7tHiOqpGD+A6+/XA9WFuWN+6xg0z0bGurrFYq1jkxxXfTOFHcRtuVtz+8P27lB+k8IPY+FL4cWgKPzpKH/yYH4UftfMZgIsbYxDX1I3RZ+5YXJe9XPxu59mtc1Zf58w4PlvOX2z3dfS0pZ/TkLgEt2K6na9X9YptfPVXlrufy08Tw3Ppm/cjS85cWUdyUKnmxNdC8otsoU7Rt9r7/uK2kcAQGAEPFbvu1XD2cZ+bihvaiTexIw7h9H0iXAffPg9w2tZ+0DkOmEbu9+taJ1biBNPoaUMspyFyaO7BcI9t89+vgethe/poul//+tenGf+59RXXqwmYD+dT81KxjNy/NpJz84z9tNTwl0Ziw71PfKDXpuyeCRdrYlL+JHFdx5nCNTH7zPl64jzwfxRcm1NxXTkydrg5F+NRrfdvbVsvAa6ZK7iVKqbFszp8ff2ruaw5xqfm1H4fhYNJ8MDeLU7g7Nvu2ZVXvIsjuFj3OZCLz55Xe+1HuY5ZcVtjRE/dNszlcci1ILd173AdzLt1uWuBnQLV9WwK9rWVvtXP4D/GB4fkyP3ctNtGO7kgL+YGO7pq1wdOeVbEGYE9EPxUXCGLLWXPMJ5rPOug932qtk3PDn1iE7M8A8TwLMh1ca2sux6sFzrsnl3Q6R+xEa8f+uJPkfr6Vt6D4/u0iTiM0bGNjfnWmLXDbUdbinO3jXo4Oos5g6PD/n0T6wCW2WfdW90XKweDFHUV52JdHzl6bcry/tmxX2Jwz38aGHctXAO4+Vd2PfWpuLY9vOIB2bqyPKZGy2eI62U+EzY+44FP6bRjY57moeIaH22V42O9+qOjmJPjxo3biYjXcYp4ti6eKsaVwZ24BpviUjyKV7iY10f/+tz0Om0V18RnnPAnRTWXrJE5RvZsWHWuJzrXFK5e2bWp/cetkTrrcttYf5q8jq3svIlDnRyddjlzR4bwQ4Yra4db8EHWj/97rF/EB6i9n4sWTmG/qzqwgc4iZip+KraRsVWsVfwpg19kMa5+Sudzoo9t1TumnBhr3H3duaqnPkXkkPxRzKf5dS3MbV/Xn35rG2QLNgl/+6g65crxfeqUvdox+/Gn6ugszpe6c7SNNvWModzb1JNz/h+9+zptemJN2QdZY9cbLr7FMxzCBm6nCrjaVMSk2IP3GK5tq3/VV5kYqMPFKJxYrRu/eurO0zHUxfQA8f0BcugawSuWyTV1ytS6Rd30tY19YZPQ9aROrr2vq//eeHlfW8cmj9TFG3UIXfXDDqk3F1WnDY7/VKk2vuPB66R9RzxCrCnvw1hj19d1h/c66mJa7Fiv+EIWg9qpM06t6yPGah259lPr6BnfvqwTn3H1WMZW5+NrBW1dk4hHqH1HJhrzXvNtnrVZN9e1js71tI86EL4npdP4nrTPY/024No2xEPZlEPtcOfe56ja6LfWzZv9sE9ziR0Xg2GbItaZvyGCqx7P2CQxLjYqF19y8ddjrtaRxXDPez/qYrW3OZb2Pi7q5lvunHie+RwGfOM3RVx2Rw7NKbzPc7UhS8h1HZWrj74n4vk/M451Iv8n7LRp7E16h9fu/OHoIGV9yK2y3HbW8eESO3ANxqcIPPA3dtbWdRfDcOUeH+Koxxz6ij1wV32rrfetNmXbyjfptcPFtvFP8bg1TPv5Ij5TxPd5ySG5lWqe0ZlveL9O1iuv7WlzWnqUNqcdY8rfefY259PrrdtObi6chxz/6qNf1SOj/zrlYbjm/4Fwxq7rn+q6LqarXR28YgrciS24dX3E3JRNXzh+cn1rW/uT1ziIU1/4VNxRN1x7iSV+UwSuySG5lMx3XQPlyvG3Thvb2c+jcvp8FuRc+rE36fXr5z6VB/uo3PboahtkfjPA9476VQ4u+P9O/I2krj8+1pEh6z1W0KuD1yJWxR9ce9Wprzr9eq5v1RsDOmSpl6lTyBXnL/5PF3On3RSJa89xtqU9ZM7JNWQdXgt2ffSD91Tj7W3W6fepE2fs1Tm7H/u4eLDVedO25qVvq61vU8dkLcA17+k9t1Q7MhjhHMLaQjWvyCcp4gtf5Yqvqrc/7BXDVe77qHX7rX2qE+/pusXhWNQh6hIyZ5CH7dfkj/2a/NX2rofr0PO4H7t+2E9KjnVS/+/F7yG4PkmMvQ/1PqfgGX3vy5zUwXnP8zBc839RWWPItoe1v47r+NiRpwr4grCJNbjyVJspXW1jf/pVGzpJ+3FcXzjzOAmuOVuzZ296fxJT68v1sC43n/Apuc7BNvAzR08A1/2cpvKhj7Y+P9ix8X4eXG/a12nH63GP6yl8xK2Rtr7OeL0NH3QQ/LQYtz+5/VivHNsU4dMTsfIa5f8nZ6+f8uOieYrnkIhrfCJL9EeR7Et9tenzsvLHzQVr4e9t1XUxn/TP+ZczJrhmLRwT2RLxATrOhrN2+QMdHKOwDXyKql0Zv03yVB/Mk7/dg20KuJ4i9oUe19WPfsxZ1R8nH+d/nO24Pp+IjU1n0MjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwHOXAX5Ygx+VTvE/5i9zWUm7RP0Pf/jD8pNPPtnKBXSL77777oBy+fLlVi5durT/yiuvHDys5JK6/Vx0fsBFX7TNpaiLixcvcg/78v3331/86Ec/YjzHJn/IfElp0xeV8Bk0MvBABlY/EoN+Cb5ysdxBLgA9uHbt2iIXlnL57UEuwbsP+LjkOZfg7edyvHuU1PmSPuVOLki4lYvqbufSOspNCjpKLq2zzqXoXKzOF5Du5Mt+d9Pt3fB70d3PeFy82y4thafdfi6PzJCLJRebps3Wp59+uv4CEBdkoxs0MjCVATCTffPwpueAKHhFBk/tEtzIDdvB2r3IfPn2br4Rd3e53AKTd4K/e3kWwF39Elk/FHvuvez3dzMcP8YCru/kEke+OEq/DdPRtQulGZsYUhplb1/mItW6l29lb9/ihxzTph9r1F+iDPzLv/xLuwAtF8Rx+fOMEqxycTrYmGXv3A6bp8DbpdPBV5MXcU6qKNtB/OrHGADUbCvPwdbVq1dPfqH06qL09MWl0uAdzpdH25lDOfG0Zyz6dlEpD1poje2B62TmJaZcjOeFfvNgASzPXn/99VnOyGB4ngt3uSAd2g5u2uXSwepObJTdbJi7OQ2cCxzbJer4oEtK2xd1s19v5Wx9Ilw3YGb/zwOR/fjwh9yj43WB14EF5470fcA5PnyNa9qtaI1rlnTs12ThpaN2cSr7NDMH08A1GNwGxNlj53kPF5hvg+vtnK2D3SVlN3g+F4xxcXTTpbk/1iq2z8XGczBjvz937tyJzgPpe5kXCjDMOaOV9NP268Sw3rdjW7Bf53bWRfqmGdTOJcwFYr+G8twewXpTjn9e2AwEB21/znvDNkdw/cEHH8yzv25zSXr26e18lrGdvZF9eTs4BqsN02nQeOp7gddenofdHFsatoPl84EYP7K5HaDNds/tZq8+8RkXDIpn8N3eG6KjQIn7IM/agpJxF4mX88nAdZLwMlMA0Pbp5KD9gE4utCQd7YJhcf3tt99u5xyyA65j286+vRP87LJng+/ocs5YnMueCX4pnDua/hDXy72Mw/MAxXRiaudpsJtyBNfplw8/GrbzT/brnYbn7NeLfP6yzHPIM+HeXAdVd+IghuPzl4Ee16sZgANKe+8X3vC84v6wpWcNMCyOxXW1oaNOHxVfqT6U2n4dL/bndh4Jb1gvfP0ecqVr+F7JYvi046b5oBNkoOEkGAIn87zWt/pqb5xq3vzwPUWhn9bv6nL0GeOsxmr95Gw5B8e1oPvVr36FvuKu9ZP+xDPtxTM6cdzj9/vGNdgW1+0skvomXINpfNeU943Ma9CDGZgFM2rJEesNVfyJBXBAAQNwMMC6e8kWvMra8eGH/Sn6wPkRMPdGcSVnfMeFW4e3tawYPyGu7aPi2TFqHMpiGj6Fd9qelqb2a/Hs/t3jWjyD6SO4Tp3n/LQxvAz+Ylnu2sPFsFhkvY9bS2z+ILQ/2MeP9vkDdsgWMA6u6+V0FUeM7bNjTPSPfCyug3F8pvZr+xHXjkG/yOIZDCOL5Z6Lc9qcliquxfOm/Rp7xTSyxXFbLqy86DzPMPOX+lygVyevuUU3tWfoa78P4+QczIALMQuOkXlWwI56sVTxRVt8xCN1+mxr+bOf/czzz7w7jzwM1/SDD2MhU5DFr/g2Nrjx1ZiNJ+YTk7lt7xnTquZZnPd4Zm3Mfd2vWx7yeovtpaAO186Z+de8WEdHIZ/kW711LgNDhk6bQzEpNirGkcG3mJGLMzFuH+LoSeGa/hxLLBODcYjrqlOGE1+LJfw0RC4t4tv8y10D6sgW647H5bmnXRPbPi/cHPc5IX7zBTc3ytbFsZyc60Mfj0PEBobEBXgGN+AJXZWtw8U9Mjjy+aCvindstYjZilvsjCenT8dHptA/YxofdcfUn3GfBNW8i/PKsVMXt66rdWOgblF3pvnq/0w6jz526uZGH/CD3OeDeepv7myLDdmCn/1he5pUsS/W5OCrnsnFn1xbxWZvo+7eXDGOzNjuDRGfKplz8+6eMrVWBFbjpE1dO23olWlTMUHdsZCfGv3yl7+c8f+BQ44vNwbqlBq7OuY5Reh97bM/OHrr5mhTH1P9Po7Ofbfit2KvyuDS95rItHFPFcNwsa2t+tlf3d/VwcE3MdW8pvq9EGOYb3AHqXM9WC8IvbqmWP3j+qmjbkHnPB7A9Sn/pmT/T4Iv85nw1Fzoe5MeW8Wk81JvHuHOH868q8561dHH4xLxgCnwQwFL9WwABqtOzOFT8YlcS4/haquy4xpDHVsdPsjWnyTOyae5jdjWAB1Fcl3UU3cdtVXf2ha9PnDpAZ9nhevVfk1cxmmMx+mIn7xB5gKZPrTB65ztXz1cubajX/uO+ACBh4oBxq9FG5wibsS3GK518SXWxah17Ohs+zDumMYAZzwKtqrXBnceEZuMv/lFxuc4Im/svebT/Pe5di3kdR3QOSZjVR/qlbBVsh91XDqn/FR5t1fXOA2o6owN3QNziA69Rbt126CniN9aV4ZPETGxZ7K+9CchY6tFHOFrEb/a4GJQnT5gVyyrq1xs60N7dfZVuePIq434auyptrp66vaNPEXkwJz2snlFT4GU4ditY6ukftOa6KufdTi6Z0V9PMZCniHq5rwpVjpzUXX2VfOIveqVK8eHNuw1fObnnhPxCLHO/A0GbBifDtTFr/GKC/VgibZgRJl6tYsfcWcdPrWP2x5/fKzTJzpisS/H0YYeuc7FeUR9JO+e7dFvInJ3L4Xcuj7m+bh6b6NNpRqfevu1Dp/SVfvTlB8WSz9H4ycXm4g22KuPuaONY6rTX1yzPlPjggH+zsie3edaPIgT62KqcnGlL9yCn1gGo7azjXW4OvymfLEbh/33XDu8L7ZH799PI24kMM13wMyv3DzX9aj5rfqNna8MtrPv6j+lq/azKBtznddUnDWH+JozuW3sr/qDZ9bFPUdfOevMxbviWhxgV668YqjHI37axSg6/bTB0YndyvWVa6tt6zjqa4zae531DN3mxvPM/yE4jsgdBaq5N9fyQ4/Df9XBeyIG6Ti/3sf6WeXHzaXHqXOobZR7G3XxrA919mu+f83aTPUPLt5MYe/qSRzA8XNNrIM9cSXXZr3iE9k9uLf3fVm3fZqux2IMx8FufYrbDg4xLn7QGylcOmwdXU9+f73mFJ+a69pGP/gU1bH0MW791T+sL/2fBTe2OrZxP0yH3fZ9Hvv84Fd9bOd+/TBcc8aeInN+HK8YRRZrYkg7fSiLW+ubuLiu4xOnfVVefewPXSV90L2eAq7x3UR895zfWKi5rb6uZR3H3Gur/lWeslfdSfupfT5Pcj+/OnfmYV2ujrXg/TxrA66rPdVWZ005h3jxLvpKrFffrq4hvtTFqXV0Ygv+sLq+tu+fDdpb9KEu0R5ynGqr8qHX4b/gmsJYm4jcsWeL6+pX88IY1Kuu+iJXW/Wt8VV936bv73mum4uaV/JQc+H89LUOB9ecrafO1/iDB3DNObP2W+WYjqwJ9UrVt8aFbEz6HMfFtj7W4egqUe/1tsOvyrarfSBzvmbum3CND/sB2HYeEde0SYe+2qq8bjwhnNRvoulzr6r43pQH1w87uGZtKMiVsIMN/9/1VH/q7NP2U3p94GJOHXV19GG959gk+6ntqs2+1ck36bXLr0TgdYr+p4h+yNvUnoC/OUCW0FnUDT6dgan84fmw/GHnfSPrwjmbZ6ISdt7HietNeFAvr30oY9uEP33g+D2sVH/lh42tvee2n+JgmvcVm3BNm025w/ZUKH9f3LT+T3x8wDBoZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGTgucvA6j/fty9OcMFHJuAXDLbefvvtxfvvv9/m9N577zX9Rx991C6G5HLIk042F1e3C9lv3Lix9dOf/nTx4Ycftqbpe+nFjFEs+SG7/MD14ml+IeCkcxh+Zz8D/FBdMNwC/eabbxqmcyne7IsvvlgEewdcDppL8LZyFx58m3qc9yPPudg0bbngfM4leekL3i7zhbcvjuzscDtj65cLGXOxXrtQN5eR7udyu30ua4zuXi5Bz32S9xf8ExsXqi/eeuut/cSR5gfL1157bXHz5s1Fni+/+LLMJVH80J71s5/sEeFTyUD2x+Wnn34KXtqXuMK32E+5TDEBcMnz/chc1gi/H84Xum4Fy+fSgD0aLO/kcmrwzYWmU19icy5c0vj1nTt3ruerdN/F90YMN6O7nXFuRuYL63y5905sdxlv9czsB+M8X4tcPtnwHZ8t9vewRX7IkWdmYJukvITERTSry/hmwe48e/Oc80Owk/ud51y2xD4LVufBFF8u38nlpO1C3qh3ZsF3fKi3i5nk8eOC6q1s3hGPp+BzK33up+299OUXodsPWKTecLyysZe3y9PzusD+zkXTUS2WGWt5+/btgevjU/3CW4OJCrhZ9ud59uXtnDG4aJfL0QPvHTB7LoyLdneDH37Isv2gZORcHr28EOifz6XRuWx3K3zOD7btRj/PIWbryhW+k34yYu/NC8L93Kp+d2t5kC9CzzjH3Ms44B0887qwnzFaSZ19Xmq4/vLLL7fefPPNsV+fLOUvjBd4y/uu9l7uxz/+ceN5jzfn8uiUeS5JB8/nuEQ6gDmXy5q5RHo3fC+4A8N70V8KzwUJlIOL6ZNyKZ1d2JrNz2dnB/vt/JJmgWkb5qE5zHPDeZkz9N30176onrbs35x19sP58v8RXLNn5/x9kHiXly9fXrLvr4gzyDiHmI0XkzdgBRdcYtJkLqX9x3/8x/m//du/zf7hH/5hFmxsX79+ff7uu+/uXrt2bS/79c758+f3/vSnP53P6/suOA7GLqSP88HeK5EvZi+9ELxdDB7bDyqkfjF+7OHgur0WnBTTpB1QhwDmvez/wfOsyekDXLczffq+n/Ha/k2T1Bc5ly8OX1aWy5znl5988slW9u3lxx9/PM7WJPbFJM7JW1zMw2W8THHFkS3sreBwltdwPqo4l3Mq52X26PN5X7YbKF3M3usPWr8yn+/khzQX/JgmezW4bthOG3zafn0aTKcNxHk5WGavnt0Lxtt5m706toNgF5zfB/w7OeFzzM8+vUh8B7ynjU0cKz+zywcSy6BHz0DD7HHNK571y+Wl4rnhPHow3XAd3nC94pyVwSk/ru3FYtT5sRsKOrCN7I/goKNd26/DT0N81tL26HB/MEcOthuuw9tnMitezxsP4DrvidXFfdBjZGCWz07n+XxVzNhVj6V2/lwZlfs2tu15PTe6bpU3Ofty3469uuqMyf1azn7b3v+Fu0fDxTYYbnv1ive45jl40rgW82C7nbPD0ZELuPOP2Kh9zselLcH2SjVYXg9dczlrbmHNqswe54UWyvggU5BrG9pC4pg1obBGrJlrxRq6N9X1pE/8XFdk2tMvbSn2GfHwPRzCKXENvsGy2K77s7h275bjQy6IxflFPBERN/Nkj3afpm4elCuuzQHzrWQ+e331eRnlimcxKVZZb/c0X6vh5JvPXrH1RFt+VJW1Yc3Xf2uIXPvAjwI2IJ8LZNphgxiHvlg315mYj8V17JXqHO2b/p0bXExP7ddiWQ7WwTXtngSuK77BL/NF57POvJ2vz3JUjV46XOf9TLbj9gdi5m4hGTVHyORPzJhLcotOjoyNfk6zP+ELdmkHHuiPwms8Ovr1B8+RWU+wQmE8SBzTDp11/9aGD3s0/U0R/hQxbf88ZxTim8K1OIYTe627X/N80PdpiDiZS8WzMvMzR+TDvLtOzlHuWlpPkxebOlwzf9aT+VPIH8XcmT/1fd6tYxcnER9K+Longx2xzd+QXT/w4rjszxDt0EnGT5zY2nqu/obcfI7BNfM25ortimtfS/r9use0Z27360fBNbGbT1+PpnDN/F2fNt/U4ZUW+Uxzmf8f9cLiGhzzvnh1thS/NQfI6MmNOEJn/si1+Daf5Jvcs37gE3w8KtHW13/wwhj0jUxM1Dm3OAZ18Yidtu61cM4uxIzNecFpA9fXdnDwy/nBPRp8Unje3JPBLoW4KFV2nzbGmB+ZyLv4Js/IrgHcNYLXNaPO/ChTtEk/5ftMdKvPRvm807WqcRC/a6oenXmo83Mdql3sws0rsnmzjX0/Lc644A6cub8ytmdwnw1iBqPOo84Xf/qhPX1Z6NOzhzhmjwa/6PF/VkT8Ylt8ux6sMzL6fs2jaoRdG2soDlxPnBjDPDWZ/RDD06TV55LL3/zmN9t8ljMxNjrmQmFNar36i1F0zldZXJg3cIMP9ae1zu6pjMueSN01ArvUmQPrKr6NG8zSDqrzJHYK/vjQh+dodOAYPKNDljMedvuK+L0Ra+A85MyRZ7auD7nQbl6iaoSfvuSBQl0/eVRND4eW+dy/8VZ7iv+szsiMSI6N33wTL6Rezrz0aQ7lH3ycO+0p5Is1Nx/Vp+ptB1Y29R/TiYg+6JuxwBxYok/GqPGk2rDseNpoi6w/vCfaUPAV14wDftEpg2lkuLHAKeDbQpvHJeI0v+Te+MEyhbo6ZdfJtYJD5kQZPX1TlOXoIO1V1tYcnsY/K1wTm2vksMfF0sduG7lzhVPAB/2bRzCHnnqV9WEvYa1Z9ynCBgaIg37Mv1imjg/92yd1CB39oneOtJOw0zeFuO2HcfSP2Ig+KPjiRz/0DX7VgXF0Fdf4UtBTkB0TTp/0RUGGkPVriol/iI/3DxTmYbzIFvNOXdm5WbddXI4Q9uqLH0Wd9cb5vzOrMwD1p0rgurwXNIfGR7zoKOqIT/1UvOjMGTK+FHXWpzj+YIn/Aw8OuFDGmCI2og5uKJ7Z0bHutAcXjovMOOIIPQUsVerxI8aIxfZw2vZE24o58UofyO7RUxg2LserfComzk/k5Tjic6DvUpwrvOZafE+tR9VNjbGpz5obc7Tmz+J8TfCrPVv8EE+ViZm6cUZseYKzDpVs5zxpg0y+WCe4Orj63oe14VzKBbv2GbER/WBjjVk/+sAHvX1TFyMRG75qTMaBPySGaAeWrdMH7YwP/z6eOhbtKlaRwaF7cpXpG3/jVKaNtjoWei8Gi7iRvonl2xTnW+N3HurMl3W4OZkaALuEn+Vh7WzzVHmH6zo2cZPbfq7OR06bugbmibVS7rlt4eAMO/7IrM3XKb6eR1wTa+76ghNxjQMxOCZ+9AnZtzowUok2FNpT8KNfCnrbRXyAHBMffcUmOvdp5Kqnrg69Mag3npjW/b4RmYscjyPyRmHO5BYy1+gozq3K+Gi3XVRHCLt96V/5EednXVm9Tvh/2pwT66UsN1TrcvRVrn7oayE39G0OHaf6XIudz8j+NmUKg5xPwPaXKXzHSWyDBfqF6BeMQPRNnYKPfVKH4K6ZMn70a5zGF9Wa8LUwFm3EpXX3ascVw/rZhn6QLfYb1Truv4nMxbvH0ecx/iWF1x1jdg5y9MpyfeVxeYCwSfZR+XFtbffUuOef7jNs8trPw7rx4zNF+mFDJnf4wiHb61f1yF+kgN0fpfTnSfDAnkXhPOLfyMFD3y9j4u/Y9C2OIjY9bbBTILBsG3TYqdMWuSfb2sb+qSODY7CtDKeNdv3htaS6jkn5hxHe7vTYKn2WCqXiuuZF2flQV5ZPzdMx9K++x/nb7qnzDtcnGf8k8+h9yAPrKa/j4EsxV+w57Es/TOEcbV9w8MDrMXZsvvenb0hf8QZWIOrKjKNMfxB2sCDpX+PSVrnj6E+/ynD69/VBm3brcGVtcEol8vFuCr5TRKx/XhXngs45MG9InXp1zbiyK1duO3XW4c8TGW+f3036Orc65yrrU3XIjsF+yTmEPee9FM4j2CXWVFxjA9euIX3oi4yvfauPqhF17OCO9a5224iD3h73NdEHYxk/9apzDOyMpe8Uj/mI3Toc+rsUziI+i+gqETe4/u8UPquG0Fmm6pt06KfIviqvfswLWyP3TOtnhBsfsVbapNen+jt/51vr+FPXXxvn5j+lcL7mrIFeAiecUdivxTXPAqSf/aFzXDht8RGn6qJat8UHws+2yPaNTcIuIU8V7OqrzDi21165vo6LjXyAa/d/fHribM2ewGegtDF2+5HH9ACd1Hac35FOzyiuj8T4iBVyK1VZHbzmCfl6CmeRH6Q8DNf1fWPc11ixT8eEu/+qw1/CH33l2sS69cprX1XGh/pUwTaFa/S1jypjA9NvpRyHa17r2Bd81iM2Yl6WlepYxtj491Tzo13e+7bPkB9Qnl2F8+jzftqIzZHt7JfPr8E25429FPUR25ryWQh7Nu8p+f961Z7qA+QaGW/vD8bQqcfPNnamzXrP7Rt9L1uX922tP8zOe0ZysukcQj98RkruPJuhg6biZ7w67+b4PP1z3AP+PM1jxDoyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDLwcmag/Wf/fFlqfYF60rD86U9/6hcM5Fu5UH35+9//fl0/Sbq4xLr40W+r5gfGtsoPjPHj1s/bF1vKtIZ4BjIgzhrGgtNlLjPdykWmi1wGupWLp5e5bG4rlz4ucyEel4Ru5TJHLnie5aK8XeRwbnvmUlGIyxq3U+Z86yu3Q25xoWja85xwoR0/AM0lo1yo2+rp/276Pchle1Et9uPLLaaLXNS44LK71157bcElpZGXq+eifaHmBf6i4hmAxfMdQrC6DDa5LJ0LTJe5CLRhOJcmHty6dYsvX4JXLg/lomcvOOcLnFyovpe2geEuPy7BF+A2fekSHN7/7rvvvszlkdcXW4vbgTY/eHgrffNjK7fTD9i+H9zf45FJaZfwBt8JcZ9HZPH222+D79xHvWjPXl4vuLwypkEjA/l25t4emJwFt1wyPQ9uAqvtOfts8LSWk6vt4I69l+/sNVvwuM0BITSPzD49Sx+oHpbaZXC9DC55Rng++HK6hR9gaCX69WXS7OnRN0xH3/Z5MM3Fuw42cG0mXh4O7jJbATfLJcyzYHqW/RVMzrM/bmeP3gG3UDDDnrsXLJ+jxIcfhToXzFL2AuV8YXmJnvpO6z94Tn8nwfVWnqOt4PogAF1diD67nz7aawE8YyHvJ5SG7ejaeYTXDs4jqbe9On6DXrIMZOlneQ/G5am8D9vKWXn+6aefzt55553ZzZs3ge/8jTfe2MnZlQukuSj9XDBzPpv0uWDqfDC6lz7Ox3Y+2L0YmF0Mb5elR98uUp8H55F3o+f8skU5CaXPrZxzuPh8heuthuvU1zxd5sWDL66D6XbBNGf5g5xflhknru2yt630tVy91zzJ0MPn+czALJ8fzL/44gswvcVnCVDeA87zPmue913zb7/9lh9C2ObcAYZfeeWV3eydO8F6oH0+b9ju5u3b3sXABeyeD4b4gZ+L2csvRr4UzF9CF46ePX03MoeWVE9OnC1CXI5e9ulDOX1ycfpBONhvZxAuSIdSX3COyfO5PoPcuHHDS8HWupNHMjzPaAb4sdl2xsilb43nUrQj547ETR3gza5duzbPXrxz9erVOft28A02d4IvfgyFCww4WzQsUxfH8QHLlwKtS8Fws6/a7Gb8k23U6bBQ9t+t7Nezdu5I/7xHRM5ZewHWG64zVrbk/YO7d28uEms7Y8fHHxESx3BLGWKIZyADDZPEIU5rTGK26Nb+6n7xi19UHTKXTWBGBntw3vshU5DBM5gH08iUNa4j86NW1pEpfO6BDl9/kDXiqah9xpIWDdcTnB/PAcdwZdpQKp5TXWNaPbpBj5CBXBAy7/ZFemlYWnFxpE47+l5mPfDrCb3r6JpVjmzp2/Z1sdz27RjbZxvhYLO9TwwH22DWIo6ncI2PuJ6KPeZjiXlNYdrPRtr5Iz5i2r2a+ZoTBljnI/s99UHTGTA5cLEJFsQB+9NUwY4e3+ovnqJek2vEmrFGcNbYteQH0NCp1wanP9rYh2vsesc0ScYhro0RbPbYFsfwul/XesU1fZ+WiL+fo5hmntjMh5y5Ot+Ia2rP9sD1Oh8I4LdiWJm1cu3BK7ilsLdRJ+/8XeJyyhThy2W19MHfHsBq+ztGuH1FbGPjw9rBxW3EtWxMrJ/x4l/X+VFxzXym9msx7J4NjtXBKe7Xj4JrYge/Fp9hse38enwPXCdpEJ/Z58zQnulUKxcXcPeEmkf3jZp7/cDXaYi153kAH/YHZuiPOhctGQdrCxErNojxsMOJ0To654S8iRi/Fp4hyiZcE6eYFse1Xvfr0+YiXa/nzVwo5kRe18GcO1c5/UDM/0SfneP3otAErpmaWCBn5MncmU84+DLPcvQU9tzTEGtPm4pr8GK/yI7Nvm58xNDWLZwYIfoS19hcZ/gmAsO0Eds9rsG352t4xbIyHGzDmQd+PKv0exoyZubL/OXmQh3zNSeuj3M1J4zb5Bf9HLLam8218zeX5gVuMWdwcwr3NdF829a+4/JI5N4NPlg3ziju3dS56AAiZuoS44tHYuA5IWa4sVGvhB9tGNO2m/Zo9+Oei2M4hfMH/T0uOT/yTA7MN3N2HZgPdeaHTHGucAqkrlXy+VHjZ/wfsVnDRKdeudb7OZufmht9yBsFmxi2DhYeF8fp4tTkmGAQsi5GwbI4wEccuM60gcQ1+6qFfdb3ixWr6Oj/WZHr6FrVdWFe1F0z17H62N4c4FN14sNcbn344Yf8/0X1T3vebdx8FlvHR7a4d1gnPuevXPPg/oZP1ZMj8YGeOly/p7Hm5Bz8gVVkY3BsYiF+CuS6OqeaI+zkhn6w0y8c/IJtZDj7MzZkz82M75gRv1ciZvPtfFwH666T61rryM4buzioHL20xnUU7VJnDU+bc3b61a9+tf7b8Gp85yKvYTk/dDUXyORBndw8ycWTvnB0Yg1MMG7NUaqnItqCO/qigC0ITDkWMjGKMcbEhj9tjRPuXCKuiTEotBerYhgdGAfL6MQ7frVgc7zHmW+6aTkjzppXcwtXdl761TbOU1+4GID3sjr16znw/w1+/vOfq0/Tp0vgOn+Hc1DjpK6y573NvJAD8IC/+ZFjs7DmyL2NnKDzMzv2unWeIkvoxCJrxJi0g1MgsMIYEDrwQztjcCzq2B3H/qjbh7g2DzE1wscx8SUmilgVz3CKeLauv23hyvYbVSN94ZuIHHB+In/IzK1i2Llj086c0KuTVx0+taS6riPTxtyQE8qSM8CzfL95zHtBYjWPxh1Vmwd5h9CbC+eHrtdjq7nSt7bVzmfS7G9cJtMTOYOws2bi0DGJi5jpF24cYAmyXmXXAh3taSuukI0r4gOkH2OJScYSo2BZHFdZH9r1xT5rXPh4do84ScTJdwgoxlzzW2XsFPOGTao69NbNXa+jHbbnhTbFWvXIlJqzqlOuPsjmtLZDx/rxeTOXKHFZ0Cbi9Z39nP2J/iDxQB/owBa86tExJoSNUvGDL3HA8UM2Lnwr0Q4/eMWmmGUsMY3deuW2Q0ehbp/0C9k/f6dizlNEbDzj5s68oleWMx9l7BZ1PY9LI/wk21if4uzXtc2Uz9PWEQ/5NP7KmTc2844NnVyZOmSeenuvFz9cbvV1Chdhsc5TxBq/mgKu6cd44OACsn/q9MP4m0pMjWhf+6OdODj0OPovfVtoiz9YhlPYo5XFuBi2HXZl50FdOWKzM9+p1zDszIs4v10V5w6veVdfdb1MvZZU14Qe2sQPrYf/ngVcEyd53ETVjjw1L3Q1j/Snb683v6xf9aENFxGyH7+TAgYqGSN7OXvTn1PYpyBsFPqEHFNcHWr/qqfO2LQBE8pwcYW8Cdd1vIpNYqY9pWK4ysaET5Ud175jboSefByHa+bLRY5fpSBLzMFi3msdGVInd97aex/rlSNLZwHXxgJ3HuR2ipw3NuXKN+nJKbmCkGkDZ83g0hcR+P8ff5PCflfJmN6M8gcp/51Cn+jlyOJF/1p3bMYHa/joF7HFpa7GiK0n/egf2XHEOf0r9/itbZAtER+Iib7/NmXT2Yw4IXLHvuAc0SlXjp42tqtytdFG0pd6lafqTXfGziHGTC4fRjUfVaYddfJCYc0gfcyxdW1w1oV9+N0U9u1KxMTrObgG939KYd+mf8eLuMYF/hTHxwa+IPS0gYxDne3Qq2uO3T/YIPq3DTJjUBfXEZuP+t6/1u2HNpX+LhXOZvj2RJw81+CaUvPrGsidK7ySenTa7Kf6VTux6qvPWnfGcG3cxPcwck7y3r/qkckTVNdGHzmvo+CaNeRvdpWICayAa/Yv9mvOlMYKrzLjMGY/HmPhh145YiPqxrJSbWR1LMe2Xzg4dmz11JErUVenbB0/2jBfnmX7i3iE+HsLewJnEc9mOJjzOq8q4+N85VWHXKn6qJ/SaXseufOpa8A80Gvr56VNO9z2yLxn/DwF7HIe0S9iI7DyegprDP55n2n7iEdkMEB71hYfedXTH3rXP+IRol0fgw7YHLty9XDGsl5l+rAN8iZibPx4/WLOxDtFYJncgWswbsxwS8S1Xrm31To+lbBN0Sb9lO/zoHM+/fqgP063yY6e/ZfXUt7/T+Ga/fq1FNb5Lyk9rqNqxPjGh6KPpzl1//RtNNd+1MlpU/tWVn9c3T7g+lddlXk/wbx5NnrimeQcwiXp5A8ZMm551TWH8g8++smLeW1DN2Wvvs+7zPxct0eZy1R7zsvsO1dS+PtLJcYC19h4D8XexN/X+hhq3TWoujQ5sjbYKHXPrv72QbuebHsSvX3K+za13vu8FSPP+tR+TXzEDqZvpIjriEfmSb2n4+bW+56pOkAYNDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAy8LxnoP4gwfoSskzqyH/4X11c/qhzXfeVy/r4QX5+FLJ+ieJR+x3tRgYankgDF0OB01wAucU9vO++++5WLqBb5oK89iWZXPi4XF1mvsiXume5lBHsH4Tn3ro5F4m2L81wEV4uy8Xe2qWvqBqEwSwX6DbOJY3pf8HFdvHZ53LdjJFL7nI5b8a9fPnyQS4G5nL0BZe2JzYxv34exvKNDGzKAPd/gqNgsWGOerAEFhfgO3jlolwux82duzMMt1O4nJQLeLdTXomeLzhOfcmRYe+lfJdLd78Ohm/QR8a4lb5vhd9e1e+mv7uR8zjcP+AiR7AO5nMBJZc7Lr755ptlnoUW6wcffNCwzQ85Zo9njEEvYQay/m3W2YtnwUrgk1vP9/bmwe88+JlnP9zOXglut4PxbezBK/WG1/B2Fgm+2IORG4bzLJz4ohf23dDd/FLunfRD5V665Uvq7blBjo79fxFcU5rM0PFpeI59yZmFC7OhgeuWhpftn/WXbLkwncuks/dtBzdcvrudvS/Q2Q6sd7ZzBuCwsBPcUOdS3d1gLxdNL/aCK37gisIXlilcJt2+n5o+Uz0ZcSF0sN0uks6DwyEGTLOXg+976ZMDDRjnbJLqop1XeO2IzxrXr7/+eturV6NWeaUa7AXMQNtHuXg3l07McunEVvbh2XvvvTe/fv36/M9//vP2V199tRs8cmMzGA+8z+0FS3s5E1wI56J0sKvMj1vxQ0AXgrnzK/25yDwDW6fZr/MscT5ve3P6AdNcJt0wHRl8N1zn5eAAXKfeztZxyRmJc/Zikdg5dw8sJzkvMLX9OOfL2c9+9rP13pz5zjhv5H3Wdl6zt7NHz37yk5/wnm6HfTrYOhc87rFXBz9g9HyOH7kofff8cnnv4mF9dim4vRjctQtpsoc3TKeP+Cxzrl7sckTJM7MV/xOl+O7dO4ujuG77dcN2uriXd5QN12A64zZcs3fnvMRe3c4mn3zyydb7778/cH2ijD8XTpxpa6DguAHqxz/+MXLFNfpmz/7GWXkWbM+vXr26yzk6e/VuXts5XwSbs/OxgVlwfj579iU4mI7uUjALzhvWV3t5w3VstA07FfG+lB+A4j0oeG6YzljtLJLp3FvZ3a8PEis/OsLEKWB9ee3ata033+R3twadpQxk7Rog8nntzPdzq/ge2Pj++Z//2dAFkXyt56yxImwUcY2afRpd26/DsfEjmZw1OCO7D7ezR+rtzLHiDdtFx5mkPQPh9HFaApft/FH4CtOH5+zowT1Ybvv1BD/ycMc+6DEzkNf7eV7ve+xVHIkfuHpG7eX2Oe8qHGz9WlGvP46Ea9urEEL61x9yPLT89d8aAzFTwLH4BsdiVGyDW94ItrNHx7FZaOvzEvFERMyUtl+Hi29xbb3iegrf9lMHNR9V9zLLrD0kBuTiQA4eKHwmIHe/q3sfNuq0Y90rflNt2GStKKyfa6xMW9eX9bZOP7UdGKcOua/1azs1F/pxLuKaOYHruk+Lbbm2x8F1hmixOmfmx1zlytidq/NkbnWe/Vz7etwHdRkAD+IZLlbFK3lnLTYR7cGJuOZiWdqiV8caOQayGBSr1JF9PvShPetPXV9kSr+29uk49iWuxbP4FrP9Xi22tbvHEwtjnIaI02e4Pr8V2+LaOTo3sQ3v59rXTxPTc+fLZ/Zd0NTNU80bGOnzTd7R1fxTZz1PQ6w9bcCDfYEdZDDvj7MSg5fBERtrTVvwiE0ZbuwRm+ycqEv42UZsEwe4Nh4w3eNaHItv8Dy1X9PPaYk4zSnzmyrM1eI84RbWcGpdo3456BhckyNyQ/7MFzgzz+Kv6rCxJu57EU9M4Mu/a4gT+wYz9Ess4Np1w+5Y2MRmxTX4NP5+rXtcU3evpp14Jq66FxNPj+0ngWviI1bmap7h5hqZ55y6uHZ9bEtdOeLWLO+rXUvqLzoxd9YRTjFPYgCOTjzBaxFzNe/4g63HIdoTF5gCS+DndorxIRszMUD4Q2AePEL4YxfXtoFDtoHjI545D/l8iVVxLJbhUzLxep6K+Fg0lX/mQ3FNkM2LnPm5huicd8RGy+DcHKg7s5zLf/n72YqcmxhzHnLckCnMveKVOnlRZ77kVW//cX8mBCbBY8UoMaEDX3AwC07FSc0BNottwCbnIdqDZ+VnPde6Vq4F3PWAH6dn/lKVzZ22dX7y2Sh+67oOz5gTk2tBbManDMeHXOAHp97nB71t9IFXWXufo7g9MbJv8MbY1HmtALPIFOJA557pmrOvOV/mCOHPvCliGoz7OoHOcwj9KcPxo/3TIOKuuSZ+StW7buicJ23q3u68o16Teatzob1kf9afNu9fW4zHuIlHXeXMlfmLa2TWTL35jGqtI1fVH+zoj145YusL/qhELBV3zIeYjJlYHM95oaPoiwxG8dMnYiP6tuDDeJ5BqCOzX4txbXAKeIdjp5+Kj1QfiYjROTlX12Gq7j5EG+eoXPtBhuwfueKDOoS9Uf5/wVpW95R5P76x17jR1UKI+pk37VP50ddcwTeVqQs2GK8SGILAA/0Qq9hQ9hkDP/hAyMSLL5w6skQbCn3QBh/7cX5RNaIdxTbI4hlecYtci7jGz2J/xh9TI/WMgzxFxMZrTcUpsVPMc10DdXD0+ulT26KjSLSBiBOSI1ffKmN7qpT/Q5A/O7f/GFHjm4rBuVU/Y+/zZB27MrzmS705pY4/F9jzeo1cx0p1Tdjxv5mCH4Qv605drPWyY8alxQLW6hi0Jx77wp86/VgiNhJv+DqeeKZecYysTX1tY1/olI2LOm3c2yM+QMTIfuD7cOOu3LkzD2U5uroO9fno5x3XRsRnjCtVY/hD9Xtuh5pn+6/z6ONWX7l5Yz2QtdV8qVdX84e/ejkXAPH+C9sm4jNpcl8vwcKXmMEB8TCOcYEpyPHkjOnaoKMt7SqnD2yWiI0cS46f2KW9Mlwb8lTBThv6Mh5lbDzH5ARsTxEx84yLbXM5xevcsdf10N+5ascHUo9MfNQrrev5vzlVfxblmmfjc37MG7tY0Fd75ebMXNU6MusKgVUuBlvnCGVHV1Nnb+IyU87AEO1tA6cOJiD1yIxF3THZC43bucBprw9csi994OISLo6n5CmbcdoHdfqkQNT5bOXyioc9QOSf/YDXOj6jrnNEthC7c3ce6mJa2/SvvPrjCxnjYa38e0ZxzRw2xdzngdmoq5ycHFfHVvPmWnJ5rOeMiJPEf6JkvwbXfCZtrPZRsYEOzEg1rqonHnzlyPjSl/OIeITwwU4/FOpgFx1FGZuY1h9fCjb95drsj9cnLrvjc+8pqrhmzyZudJSaZ+dh3mtdWf9N9XT50lDNgXlh8r3eutiqHH/W8YsU9idwu4l+EIP7Na+/kFgAGxBjQYyhjjr4knobfdBOTOBnzHJ0EL72qwyfwrJ2bMj1OaAPdJQpwhdcv5ECtqf8iJcLMCns2cZvfo3dOrwv+lSuD7qXiWoOlMmFuWfN1JubWlemjet7LTLr6OdttouqEWv2TsoHKV40y9pDjOuYyujRSVNjMj590AY7dcm59HFUu2PJGc+CjkL/6Kwry9FD2q3zLHC25jWKi3eniJxwduMZ5/WL+CnONWIj56Bev+qLDOljm0Pt5n+J1zZ4nbTd5h6frcX4yQdr5NzUw7FNzbv6up6cQ3i9/Z+lTcQ10dfbKf8jhcukwTZrLzkOdftkHGVihIzJmNUbEz7I4BF+HNHW/uG13sv0s8m32pAh2nPR8Fsp4Jq2PfHaRi7YrzmHOAfmCFk/rB3+q66fm/rarvep/SAT08N8+jZnuV7nogx3nnUN0OvDnPRDlvAHp39J+fuU2j7VNbF3gWv2J/Yp/PS13zqWNv20VT34EQcRG2Gf6m9lXjP7RVHl+kxUPbKkXo6+2umD1y9w/XoKcfZE3Lzfrvs1cTtP/I+ra2Pc2oZ2g/6aAXJT10ZLn7/ejzasD7j+UcqmPti3/q8U9iZwLX7w7/vs63Fp/Yph7FDftrbrbYctjv6LD1Q5svVmXP0zpat2ZWLgsz3+bsn5Gnz3bamzX3OuBtec35xbxDVO6cu5qq91dJA6+lVGb73q0D83tPpbTZ+/4+Jnro/ib67gyryW8prKWqmLuCbG4nO+v01hHVlPcL2J6KNS7bPK+Ojbr5362o9yb7Pec/3h2BxDv2pXxse/yfCeEVxP7dfkimecfPA5n31H3EhTPuim9Bs7eZaGevh8lnGMsUcGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBp5UBtqF6KWz9qUDLtorulOLaV+/QHPq9qPByMBxGRBf+UH89oWZXADJRZBbuax3mQscZ1yuy8W977zzziwXzR1wGeTt27e5iPogl59v50K8dsF0Lq7jAupZ9FuRuUidy6YPf5Gu/SzdEj2X3i1zOeOCC0uh+O+nvwMuaueS3ZSDV199tV1Omksdl5TY6xdmztqPkR2X3mF7+hlomLly5crBt99+uxV8gdV2i3oudNwPXrmVdyvY3Yl8F7zmot7bgSqXqYuzg9RzYenym3C+EMaX3+o+jswXQz+Pz5cpN1Lupr/b6eNG2tDf/KGxiAAAQABJREFUd9HdSsmPMezfyTh8eexext1PHPTPDzbs5zLUg1y6y/PAPu/4EQe9pBmY5Ufy52+//fY8OJ298cYb4JN9dQZschnuLJiZB2dR7cyzzc6X+8t5AIUu2+72DFtyNw/2+CJjw23kZfpcsl8fl1f8VtjkR0RuZxMH07fBdkx3wHb0fAGyldTvJS4uMd3P2DxnrWQfX6TN8rXXXlvk9WSZ15Xjhh22FzMDDcurCx8abv/4xz/u5Cwxz+v6TvANhneCn93ghy+Wn4t8PjhC3gvuzgdDXI5+If5cxnshuvXFB6lv80y8/vrrWxFPksEM0y7bZT++lQMJX2y+BcbDcwX64n76uRfeLk6PTx69+w3Peeb2Ix/cuHGj4TrxNFz/5S9/qRdanCSG4fP8ZWCeS1bA8kwsBwfbn3/++fZ77703u379+k5e13ezV28HF+dyiTR43c0ZZC/79YVgih8fvJjySvTgmR+9aT8qGfxeiZ0zxsVgk0umeRa2U7ZeeeWVk16UzmXnB1vuz7PZzWzy7ewRffbpRfbnGXv0vYwPxu/Dg+9ge3f/5s37nEfiulh+9tlnnMnHOSQL8qJR3uutLwEGx3ldnv/ud7/bAtuZ6zyv0fOPP/44y78zz3swdDt573Uu+9523p/tRb6QPXs32OFHrMDtubzOXw5urqacD4au5g3h1dl8djHb5tX0cwVMxzf4XgbXW/O9vV3O5Lw3jPrhlDb76eNu/NteHbmdS3LMuXNwsHVv/2D/fp63uyn38uxk777bziLxO1iVRZ7DRZ7V5fvvv7/45JNPHj7o8DhzGchaAphW2IdrgOB4db6c5TIgbP6AB9yDwTznhPl3333HZxbs1+Aaez6O2GN/5kdAwOrl7MnUr4Bn9uvgFXxfTQyX0IU3Gd/Iu9E5XlQnJt7/3Ul7ztYN2xkDbLf3ieHs05yx72X8e5xD8lpykOevvW+MnveLi3wm03jkQWcgA1lP8dcwms/ValTomn7FN8lTbTa1FePYwTDv/cA8P9bEWZk6Zw/OG+Aazo/7YIPzozfgHplzSXsGwunrUXENbsHy4fn6UF7jOnp+kNbCD+tQwLVFTMMHPWYGwCSfKazOrvTGuoonZOt+zoWtyv4OkL4xr9sjV+LsWAtr6HmS9VW2T+qMpz5ii8eY4MSCv/jm/WF7jxjO2RnMgnExDMbBNXV1YBtfngv6PA0RGxjtcQ2m2x4dzo+diWnkHtfmofGsx3jfmCRVCk4rvjCBC3XiQCyIB9aTwt5WCzrwQlGmLf3Qr8TasiauF2tnYT1ZY2yub7Wpr6/JyHWtU12TYzsn51JxzRzAdo9rcIwODrbBs+8jwTtzpN/TkLhmnnW/Zs5T+7Vzd75w58ucKYNOlgEw2BfxKS7AF/sLORY7EddEe54DnwXWh9d18ASOkOkLGXzoR53+0CnThrHwdx/zmWBdXWefl6jWZGxwivHX8ep+DY49f4Dnqf0aHcX4Ip6YiJF4+/0ajKOj+Dw7V+rOF+58K67JN32/rCQOWF/yQ+lzZj7Rk2f3Ejl5FrMRT0zkHswQA2vAWqKD6BOZQkzER4HwYzxsxIYvxfUlTvuk37q+j4pr9uWp/Rqdeza4Nv6IJyJiI27mwbxqIdfOr8rOlXYW58m8X2ZyrXtcV0yTP7HsviGuyT/rCLbxA2enJTDA3kgsyLxnklhPdOCQtRPX+LJfU8eOn2uPH/N5VFwzB+Kh8PrAHsz5uu7X7N+cQTyHuIfjSztiOi0RN3OomEb2HMJ8yDE+dX2cp1gmN8hwygtN+ewpx+Yl8wUjzrlyn3m4OSSPFdfmmNwik3fPEPDHJfAAfohLbIJdcc0YYA1SBoc+W9iMlzk4p359fVbom/b0Bfec4/tEYvF8IZbFsJhGTztifFxyzuSXvcPS110X5+o8xTNxoHN9qfP3euzPBeUzCGIlp6yV86jriGy+WEflim905IH8sb7mCWygI3/oxDv9UJ4VETsFPBIHuOLzCvZ644UTM3OzkAvbki8xTT/uz8pwfJ4luXbMQyzX+YF718TnmLnSzra0c33xkbBLyIyhbsE+qPEZccanVFz3obiucubHmtoWjk381jzWZ4F25hV84Pc08Q1+HQ/O+KwtcyF2YgOPxOlcIra6cxXXcPrAH86eD7bpi3HYq7Eh6/O0cM68XA/zzZzMvzoxq402zFOiH2zokCmQuTisHdZrW+RnTct8VrnMvl1xXfPvHIiV9XOOysSvjhw4f3NFX+rg6MknejjrLsbNG30/DtEfBM6Ijf6Iv84BHePBKcQlrmu8toND4hqZduAYzjzAdpXFODbt+CCDdew116k+EhkjcZNTc0wdGU4e8Ktzw6YdPXb8LNS1a4tqbUeG7BvO/zfA9yxQi2cVCHLNNXWK80Jmrq6vdvXkp+KUdaatxTxVn5hbn1wqoZ12NQ58IPS0BYP0iczY+iOjl6jrg57+0dE3sYpL9BTqrj3++NZCO/qD4IxLEcPIYBb84uueDZbxsQ630Ia+sNunnHbIU7mIusXKxbu87hC3+VN2Xs7JuvhnjpY6z6hbf+ZAH/T49VR1Ve79nlbduTgedfLYE/Mi/9jJkXLERuqdf82vOrj5ZgzryPhzyQyy+/jUWvp5AevNWtJHxVqqD+AaHeRcwRzjMAewBHe9qYsB+rYNHGKsWmhrP/ZV8SqO3aOt41v9iMd+kSnMlfeZ+GHriZjIwRcrTrzm1Pw7rzonZXj1d45y+6NuidhIn6l6b9PnqfHV5xzEYd6qbBzomCPrB9W4kbWbJ+vmrObHnDKedtaQNl+lILMXM5YxRVwTny/gw1rW8dDhTz9gprZVxoZsoT3tGEscIBsXHILTtm9vW9ogi2sxqw5corPgX2Xq9kEb4sPO5yo/SPE5jPgAkavPUvh8ydxWTuzGr566Mty5waHKtemvXZ/WYNWm6fJ/c5b5P5Hqnwk/Ba7rPKps3OjMYc0b62ROkPXp/an/JQXy8z/xeKg9/Jf9C/1/pbCm9iNWGQOMSNjtR5m6ceELhsQ1sRojHHKMw9phW8ezL/uBT8nGJcb1YWxtcPtF5jPA91P4rIb6FIHn/0zhUjXmUHPvXIzfebkecGyWiEdI/9peB3TSkfZnAderwIiLfBorck/a4M6XtYHQqa8yeYP0p98qm3f0lP9OYW04Z/N5wlQcb0UPNv4zhbVkPMh1p3+wQlt1EdfzUy9nDvgZCzI6+rFv5xRVI9rWYhsxSh2ZfvBTT51i3XZwSu0TP/4G+T9TwDVtpghcf5Tifk3czkWcm/PKmZN1/alDxAHpU/NwaDn6L/76HLU82xoxOZdNkRg3nPmTd6jXY6Mvc+ac8bPoYz2m1ua/wjlb/z8p7MtT9G6UnFX/v5SvU+gLYpy+iJvmkH+MVQzRljXVj3qVa5yOE5cjGLQv25EX4oCjU4+uytgt2uS2Iwf/dwr7Ns/yFPHa9rsU92tzSryWilt1cvqkTa2jg9TbJ3wTHWfb1Ob71hMTOT2OatzkgDWB0FuaYvUPOvxYI+1y9JA2ZPr7Uwp7zD+lcIFyT6zPD1JY449TrqXQp3jox4xpHSey5FyJA5mCTHtxjmx8yJVsb1s4vswBDiGrR1dL1dsHdmRIO/s1uIbzLE8R+/T/SeHSYnInhol5U4lpPdd+btgqabcvbeqp9zZ9nilfnbHN6aZYiF2fOif8+3n19dqnNnm1cQ7hzPy/Uzhv9ESbd1J4Tf5jyp9TiKnHJxiBjBe7umZY/YOOPm1vTOqpS9ro03612Tdc2eceX/W2rZivfdivnH36f6Wwb0/hGj8+D/l/U8B1xXSq63Ux9uO4/nDJ+cvVV65NXm3PVD4lrmv85n8qfvwoPabQ0U47HEIHTjmH/GMK+3JP+IJ3cM3eToFqH9SNC8744pY6GHPsKT06+5NHtdbZNzpJLGOzYFOW9zraYYOqz6Hm8FzNfg2ueY3SVzt19oGPU66ngGuJ2Otc0FedcvVX1tc6vpTnik6I6zon5tjnWHuvJ7eue81N1dOGwrkCXP99Crjux6HO+YT++Ozkv1I2kWNNxVN1yPral3b0FOu9va/jp68cn17u/bTL7ffNCD9K4f9I8Sz3durs039M4bN/cgoZdy83Y/6hnT7wnqZs+tm2b/My1c0PuaBI6Ps6tq9T+Cz2/RT2qN4vqnbW/Nvwz1NYy8fJtzE4jjzdNurr6ntOP/alzXrPtcu1U68y9ddS/i6FXLg3RFwTupspnN/Ad58L6uoiNqrYVwfv/fp69X3m8qYPh555YCOAkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBkYGRgZGBJ5mB/MCMXwR4kt2OvkYGnnQG+CJK+2JMLtNbfvTRR03OxXOLH//4x8s//al9ZzN30e1s5RI6bppecHl5vqw3+/LLL3MR9fYcGb4psFyst8hde4v0uaQ9v1ye+gFyLtpbMhYXt2OnzoWN6Yu46pdkqrxpqKEfGWgZyKWKwGzJxYlhfNF2P5eW5s7FORc7348d3HLhMxcucmk633navnv39jd7exc+jsyXw/iBs/qlMXD55+D5jyl8Oe4mfYRzQTo/6p3LSQ+4UPpe+sylpPQ959Ld/QsXLjB+w3yepWUuVeXy3obpDz/8cCsXsC7zA6npYtDLloGcFbjItF0ynUtNuSh3FpxyM/MyF5dyaS77KzicgZ1U54vF1jxXTsbrkMBzMMx+zM0QpJB/uLTcvbTiGPsRSi8H6WM/peE5Rn6A4W764ovQ98LRtwvSeYZSZ78+yAW8wfRB9vbD/ToXBi8uXbq0CNaXuSR9kXkx/qCXKAMr/DFjMNcw+dZbbzVMg9ZgZJYtcR78zHOWgG8HR+y/u8EfF+vuxH4uODsX+Vz6azp4AM8l6fjT/0kpTdrF0PfT3708QA3HuTi9YTrPTLsUPXE0XOMbXduraZhncJlL2Zc//OEP27P07rvvDlyfNPPPsR/7cgkfefbBBx/Mgr3tr7/+enbr1q1t8JqynX15J3jdDZ53c2Hz+ch7gc5e8HY+ZwLq51OHXwi/mAej8bS9uLK1sdL+xJekE1va7mejv5f+7oLnyOzX+3kZCLZ32wXSGY99ndJ+SCec14VlziTLzGF59epVzvSL9957T1y3FxD6H/T8ZiDr3jD1y1/+svHVRcCznIln//RP/zT77LPP5mA5WJi98cYb82vXru1yRs57vt3Ud4OP7ezDe4HLhWA4e2/D7oXU9yKD20sZgx/WvBjsvZIzycXsmxfBd3To88PAeQICTvbrJpwsneCP95icQXKOXrBv30+/HDkavvO4BePb/ODZfpS5CGa5uHfv7jJxtveUGa+dr9955x327AUXECUPEQc9Dxlg780P2gY5a2rn49TQNX3Ol5ybt8Ax2y9njJU3P0TWfowsr93zvHbvpMyDbX5sbAdcZ9+7kHMIP8yODrxeCp7OBWuXVtgG58j8WBl2Mb3C9dY2uD4lBcJLcM25o2E7dTB8P+OAa96XNkznuWt7dXS8kW0YjsxzYWlnEewpg55RBrI2oKDtrxMhqMfHgluvR1fttQ6OJXwarsPpQ5mzMzimzsEYjMIbrsP5gXZwzOcZ2OCWim38jC3iiant1/Fe4zpyw3PhDdepw8Es+KadOD6C6+zVA9dJzuPQr3/963n5TKniC5l1liNbwJI28aVNfVw2EutmYU0h68pw1xsZMj444zoWmATLxAV22bPRgV/3ZmW5evds2tDfaYkYwekUrtG1s0g4mMbPPZt2zNk5yhe//e1vOYvENGiVAde9T4h6OGtHARfgoC/ggf0P7t4HZtwT3Rfthz7FpGsHb6/J4awr7V1j26Nn7GqnzrrT3nWO2GQ45FwqronN+Cqu3bPl7tPu39TFNfOlz9MScVZcM5++MB+LuZI7Tzln60XOa6eN40X3Nz9TnLmjlyrOkSHyDw6to+uJ9ccuDsA4ddrCKawbhA1ZPRigHaU+X+Ce9o+K6037tdgV0/K6X4Nt9mvnE/HERD6JGyzXZ1kdemQLuZham6rTJ64vD+U9So627X1HXYc+L+BDjJAnZPLO+rmfuIfCwQUFrJ2G8Kcd+yT4YP0Yix/1NybGhXrsY2cO7NP0QztiRVfXFj/J5wMf2lBnr+5xjU4MExs4dp+uMjbK4+zXzJkcimufUfMrpuHMqxZzBHfO6qJ6eWiF6zp3ZTn5EdM1l+ZdXFNHFtdgAZychsAWuAQXFdf8Ldl4GAe5x3VU6z37tLjGH2wfh2viOcl+Da4fZ78m1+SwFnMMr7jGl0I+xLey+YK/7GQuxLJ5M5fmVfyae/Nujk+L56m8gzX2TbDEZRXGxJgQYzAefsgUngmLMcFtC2eOxgd3r3aP5nmkgE3GFqfsy1zS577dc/wY+0kQMRq/+wfzRsda9Nx1cp60d64R25zhzx3x2fsvfvGL5U9/+lPXjLn1xFydb58DcsW6kDfypN0cojOnVUcbx4z4zMg4wCkETo3X2JlTJZ8J2lJoA57h2Owz4jMnYmc+zgkO1uHYLM5VX9cyLuu9HVnsmxPqFuxnhYwJjCkTm5gjfmQ4dvOAzNzBqutZ7dj6XJkzODiC09axIn6vxDhgjn3V+B0bvXhljsTG3JgD5xv8JfwozIG+4MzD8zEYZx/W7hwdK6bvnZhDzT9zqfsKNn2QLXWNmLMl4hoHttNWc4PfmaB8Tlnj6mVjZy4WdXAxyjqrd97kSvwi42v+5OhYb7h4i/hEiJjEFOMRF/HAIcd2fDht9MWOL/OqhA9EXzwPcMYR43CwjZ8yHB/Lk97TiZl4zStxU69FH+eFD0W93H6cNz4QdWTXWZ1+1M8M5e8iW+XvIsbl3uIcKtcHnXnBn/2Kei3mGS5mjpOxcTYEF+ClJ8ahiE9joG/01G1HX+IHGUyJSdvRBqKNfdT4kfGlQI4Px59CW8axfzBMwYZuCtO2cVz76vvHbowRHyDi8xJH8cpcaxGn6Jyb87cur+0crM4fv1rHx9zofyb4BlzX2GoO0DsvuHkg91VvnuA1n71sG/zIP6+VfI7hukc8Qqw/GAL3+NMeXc/FCb4SY4gROGMwHqQ/faKvcWOXanva4AtnHAp192TkWtfHsWyvn3pjox8+T3HMiA8Q8XIpGJyY++L6OB/zL0df16C2Rw/JlW1D/bjYsD9LIu5N8WlzbnBLn4MpvT41v+YFHWuqjbVhr+YyIDDAuvZxsfbo+YwBTPIeyHHhYqPKjKFP7Y/xrNPOunEZJ217oh1FTMKJmX6U5cTLni3u9TPWyumTOpw2fE+GfqaIuMjXX1acuvmGMw+5snXnZBt59UvzRvpSQbY046qufJY4cZJH44eTW8l5VLs284g/sr7IEPVeT938wcUHOOWzOfYf9mPWFVslMIGNi+/w5W8v+EzFi45CDGDDOCI2ne3gys4DX4vtaQfpi4w/fcOJDZt4hiuDbeu2p01fomqEnr363RTabiKe6z+lgO8ar3knv+ZaOxw7VHXI1b85rP7RH27R3tfVn1VO/iVjl6NXJh8QdWTaaZPrY+7i0nCgP2vOGnEG+TJl06WcYJ3PgLmoFPyDa/oAB5JjUqdfyPXCBslrOzGGzThrX61h/mF+FtvAGUte92T0YJM2+iDXtvYnxw9c/3DVJmySwPMnKX5W77yMm3lQnFOV9Yl5vV7Vv/aFD1TbHGr+mkvrzwufmguxozcP1FknyTb6WNef9VOmDXVxzesql3OyL/cEPsD1D1Lw4z0TfYNbiBjol/7AhuNGbDbq2OA9oafQHrs84tpfn8oZ07pYFb/UkSn4WLcNegibPtSxM8+/T3nYfv1xfMC1c3VudQ69HPdGzNF52t46DurgkPXD2ovxL3Mi/xJ1csAaQM5ZXnX4QeZMH/vAxt7Dfv1FCrgF1/147Nf8DY/X589SbqTQB35y28ApNb4q921qjGnWYoXTb6XaP3r6pIhR63DHrzpl+4lbI+q1sF//JIU5TxG+7AWfpJA340dPzBR05rzn1S9u6zbI+upT7fYtx/a8Up0Dc4XU1fqh5TAvrB+EHwQnX+irLtVW530b5wrOIe+l9LiOqq0x7xnfSfljCu8xIfNvLIyDXAt+lYwBHzBpfLbVDrdf21u3f/TiFVk9OuXKqw9yT/iCa/Zr8rApBnL2nykV1/hSxKb1XheX5tfr9ccuoSMmeE9Tut7nrNWdz6a4nFM/Z+twSD/4lIwPa8TrKRdLs05TuPYcwvn6SkrFdaqtb8emDlk3lkPtX5+vGg84hNCBC6lvW/W20Qd+XKlYr/0g2wc+/M3yf6x42AOEL/v1H1O4WLrOI9V1HT9stWCHbKPPofbwX21V18tT7Xqfs1xnjsyhp15fc6G/OrhrSj/q7RNcs06+HwTXPfF+zPeNr0bmHDJF/dj6qKeOTAyUqjcudOrVRbXWIUvVF53t1Fuvtl6mDuHLeMzvYbjm+f80RVzXOKscl/Vc1ffccfWFv6jE3OuabJqnOaq5wdd6tW/qj/2R/Rpc83kI+1VPnBc4X7+Rgh+/czRFjjvFq79xoatxOe9qr+2qf21XfdRv4tW3yo7JeeuHKZxH7EM/4+Pc9nmKuMaOzT6sV45Mf9UHndS3R7/Jt7Xh/y3b+GlwNrdBIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDL3IGnup/1H+REznm9v1ngC+W/OpXv5rlBxEbbr/55ptFfqSZgWeffPLJPBdBbn377bcHe3t7y5XcLtvLhXWzK1eubOUivfnly5e3bt68eeQLNNGv61wu6oXnXKSbdsuvvvpqmXZcOt0uaszlfIs//OEPyx/96EfEsf4iZ37UjovRufR6PFffPxye6xFy8e4yWOMS0IapXPTIReTz1PeDn4PIB7n8lMufd7jdJBjmMmm+CMplorQ5uHbtq/3g83fBJhjkx1X4wSt8+ELotTt37nyU5+HL9Hkn/fBlOi5Hv5v2N9OeC9NvRebLkPyYxZ1c5HgvpV3weOXK7v4339zjAsiFMca2vHHjxjIXv4PxNBn0MmeAy3lzmWmgEHDducNF5/NgisvTwfEshUt70c3j0kpw14CTesRF7uJNg8jsu+A48kNTCkavX79+NxzsUr5Lu5spt9IdOKfcTf9gmWfhHs9S6nm2DvJczQ7u3Jkx1vKzzz5re/wXX3wxMJ1EvUwE9DLfBriPPvqIs8Is+zD4nb366quzXJy+nbPCbvbIHUrws5s25yLzIzeUduF0cMTl6Vw0zaW8e+gD93O5k2pOf5w5Yov6eErbRfZXLolmv+bLvLczHuUOJX3cjf5u7LwugOu2V+e1ZD/PD+3yyLVLpReff/75MhdKL//93/996+c///nxAw/rc52BYGPOOq8u62xnYbDM3gtxsXT2vx2wnLPxdvbq84Ha+bQDw3yhnILulej4ojk/IrG+fCYPBD8e8Uq6uhDc7cavYTqYO+lF6ctg9CD4bOcMsJxyN/2Bcfbs6A/u5bnCzl59nz0+8v3M4SBzOUi9vT5wbnrvvffa+TqxxGXQ856BrD/4bRvkz372s6233357njPmVi49n1+6dGn+7rvvshfvgGUo7892Xnvttd2ckbfzHu1c3r/tBTPbweXFYOhisHIubuCYH/HZS/9XgxV+GAT8vppbyq/m4HExPldiu5zC/t1wnf36RHv1Kuec38EmezFnjtvp53bigN9K/5yx25kbPCe2dh5ZLHaC69l+nsfF1atXF8E0Z+xF3sMuU9yvx3vIVZLPKsva+qK+Pkck1rXMZxLvv/9+q2dvxncGlvO5BT9c0urh2+AZW/a5nWAaeTv7NPxc9sydPAcXgw/26LZfB0f8IArnjSvB1evh/DgK+KbgF768Ej3Yz4vAOqSYTkRgj/d+bb+O3M7UOc9kv274bvt0YgLbbZ8G59mreQ72M58F72cjW+hPPMujGvS0MpD1AQRijmErKJDBJKS+5xXr+GKHqp8+jqMfHDyjp3BGRsc5A7xi44wBrtGxd/NZBrhGxw+3r3DdbPjwY23GEPFE1HAdT/dr3yu2vTv6huuVvWF5JTeMRxbP8qi2lqvLpJf/+q//Sn3QKTOwwqatejxRFzdgxgJmkLGpg+Ov3rZRTRJ4YC3FRa1XmcbU6U9iXPt3PPZnCtgEr+AUrHMOAdPgGSyDafDOfo2MnYI/86rjpHoi4seSj+zXqbf3kCs9eLaIZ7l4ljPXreC6ceRBAcDygXSwThYxCmcNwYAFTLC2FDCgDEaos/Z/k4If7d2XWB+wJUb5sT9k9Pi4nqyzctWDB9cYOxixD2T6Iv46scfBNfPgfaNnEc/gzPFR9us0a/FO4drPrd2zmac/hqgsnuUD12R0M5EfclXxgHfVVZvYxw6+fAZoM0X4u1ey//GcgHn04EPZ54f+1NPO/Qw/1t21F9diGn5SXNu/z+Vp9mvaPM5+Tc48e8jBdX2G8anPMDLzc61cG+p1bVJ96cgcmBM4e4KF3JHPih1ybe5ZezBGHVyIjYgnJnBHP2CX13b3U8YFwxTWDwyLd8akDeMZGzbixpfCXOCnwTX9neQcwpmEPZu9m5hpQ1vGOi0Ro7g2t3D3a/PfY5q5Mse6dq7ny47rpKU92+ZDLPS4Zs3Irzkm5xSw5N6JD3X4aQgs0E5cU6cwFjpxTb9gGfJ5Yo90r6YPMV3XHP+6zj43jOFzU2Nn76UwRj1nePYAw561tfOaQx/0eVoi58y1YhqZvPrMOkf3GeaH7HqJbdfxpJ+fp4vnm/JZUo7P6wM08zcX8JofsFFxTU7BDJxcI5t39eAAvFAeh8AF+ABvxACHiG/qTMIP7YpxzvR1T2MezFMeseFOPNMf/cPpg/bMB4zW9wXsyeg4W/teEY6eto8753TR4mSO5Fh8V1yjc19xjq6R61e5z7E4t55uzj7xvjd/j6ixMzfWCh0ya0rekckD64BN7CKjp67OvLk3m0/r9GGJ+ExJjDJn5+k8nD+ceUr44W8bOM8SevqjnAVybfr8uz5wbOIbzlydN3mwLqfPvmCTzsrct1Z/J3bdaszEy1qh6+fFnJkDevLB2ooH2qAjb8i+BuKPnlwiY2d/g/D7vsmcMybjEbv4JHb07LuuJ/HVeafa4qYNfcHdb22Ljj4ojKE94lMh1sp1qHh2PdQxt1qw0865O2941VV8xDSZH/RnjYgbqvEr93MVG72eHJlHfMwfMnkVV+rFODb2Pfe+iI9F9AuuwJrzYo0gYkHGRiFexiWG49aSPmkrt3847emL+XEmUeaMhU3s///s3WuXpUd1J/jMrItK1xK6IDACxMXGyJf2LHpm1uo107Dmnb8AX8fm6+AP4LfwtqeZdncbbIygAQuQ0AUhVamumTn/31P5P0Q+OlmqkgopSxV7rZ17x44dETt2/J84cU7VOcFX+3tBYm0ei83mnt18Kquv/bt+8iFPLVeOtuqVfOj4VNHR/3Vf57lxW8Pq5sCv5XWdvOBiRn75N89R36OPPtV/H7/iRZuRGqf9UBzaGA81Lm0bGzt8qdNWfGR1furZYc+adz0rtS23Lakdbh/aGxvDsDq6WFtHVlc3ttePfttf+4/pPSQeMXstdJmluJWxuEm5qaQXz6PvWN+2nTepHdn5R93oa5u6U0MrXDfWUYpV2fzkHXXutbcsN9ZlLMsNZh91vnKMupbe6/w2DBfWfU3GZ/fZgvY+UxGD9o1ZfeNkqx51wZFy17bj6qux0TsvOlJG2pbbtrI4JWG3uDaX4nzEdH201yfZvuz3/Uwl6ntIPOZg/m+F4XuMv/MhT9L5t36UnXvXsJK9eajPaEv16aHvfOc7u/3/AENUjVu+6aS5I+VR79zaRh7Uy1vbjXlrntTDQP2tE1y/HO5rd9RjpD8Y+WyYvzXVvthovDFt1qB1bNX5FUPwp4/ikD7OpfOL+RimlfUx9jNiu/3BbzGsfs2NKVULKfusxOcnPkfZRmLqXv1adJ93yLHYRx6xSx/L2/w7186/5TTd5JOOtvncqjm9fxuz9UdjWd7lDhVHnT+7fFlTsr61s8mtdnRrrG3bWJ+fhn1O5ntPa9LOXvalsHV9JezcyG4sZGzl0qjzGcc3rvrGq9y5irnzirroZMeq1GdZPxiO2aq3XNzXr+30VWbzeuT/Sfk88CSSK2e2X4ft22Jf85h3dSfhunNez7c5SNMN1adyU3GKFbGWzAnJMxrnMdbR+ZDY+tSXlM/a6a1b27WzX/9r+NmwS+3WxMde/vWwvfpXYf2xj3GmuFBtCt0zjYsac9uOsarvfOjqEF9ElmGUXqxW6h8bF575bMM1O7/2Rzf/58KebeVt1DPIL1PpGW+8lc0vWV0d3Xzqd5KMy2be/JuD2murZD81lH9vGf+/khjlF63nYf5dg+rWsPMi2RG/+pByWdtoX7eF638O/0n4M+E16cNe/h/Cb4R/GrYHFRf6FpOyMena0BE7H9R4yM6Dn/oxLvpI/BHZccmRGwMbHZ5b35iU9TFyioufc9bzYVLbbQTXb4Z/FrZ3i7vceXQuo32sY0fr+Sq3bedfyV/MbaN86uh9cD3OpXrnNM5lnGP15qz+tVc21/rho2ytfhj+XBi218TPfv03Ybj+lzBcI3WoEm6Qcm1k8WR9xYJqH9eycd7yuOXbftqm7ZSLW3pxrZ5eLI9668hy1IXMXQ7eD9e/i8/Pw/aD5rNzGOVYV3vnR9YWdZOTsZ7+SaD1POR9JHmo7aT5t4/Waz/mjw4L9VNv3/m3sL3Kuq7JmM7XL4a9X/IMwOdI+uNHFtu1FdPqx1hSXPzZG5M2eBvxQ2T1sW/6ulxfdrStzK7ea9WI646hvmQPgOtfhOmNtzKmjc1cO9/Wr+dWu7Gqjz6jru/7lcxjzOc4r9G+bX71Jcv81nptzSVcvxS2prC9Jn5w/efh18POLCfhOlXvwWjHt8ao47LDE1kbWWIvjXY25dqqk2v8tk6bUsdsuRKuy87n7b/1pD3a+8Z/D5+E61QtcyqmWx7nU50cdb7GPck2+vO9X0jcYz7X5fU81vXKqH1Uso2+o34jdb8Mw/Xnw2NeU1zIv3N8Jewc8j/DxfXY/7Z2cd3a3xpb7afxtx25pvrWrq/aRklvefStvpbeN8L1p8M+11y3jWl5r2i/7uchY7zqlWsb5Tb72l8Ztd2t0oP7t3kY16F667Zlpz6XUwnXPr89ab/2me5XwzfD4zmkfazHqT3uG6rPuo6dDVffNLoDBa5R+6e3Lzpaj3nL+oe/6n3OB9M+DzkJ1/aAt8M+6+x+HXUZu+OPY4966/mv6XZ1a1//n/Wu/N/TwQcwnPRG+gN0NZvMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAx8yAwc5ofj+uXKvW984xu+bLJ8gSaXQB7kEsjdXIjuwtCDXHK641Lq1O/nwrxdHJ+98E58jn1JJZdILmHlsnSX8B3m8t9DF0LnIrudXJ56+PTTTx/mYr6DXLZ3iF1C+rd/+7f6GPtZYvMDBZNmBu40A0eYWi4AjZ47FfddlH4jF0DqYrnENxeKqnep+k5wfDO/o587TA9dPHo1OHX5+Tu5jPfRYNePBgHg9XffvfR6Lk296k7o+Obi81sXRqf9Fe3S5fVcEPkunb+7J6MvF0pH3nznnb399LkP93keDnIR5eFXv/rVw5dffjnuk2YGjmcguAqclst5l4vUg7fd4PVMLgXdOAZz1e2bCr6E7KLR/aeeesr+PX4RuL6j1G4/e/i72ZtdjH4pZV8SdYn0cll6+vLlR19ed4m6H4a6nnE9M0fs+TmT0K55hhZcB+727h0XOM5LHJOxB4T8WOeLL764a+3Rb37zm93gcLl0Ovvq2ex/gILPBscuiCbOpkx3Aa+Lpn0h93zwfz72pRzcnQ+2zu3untnNRdU7abP0/35/stfezHkDXmF4wxljwXT6tG9fy1guUL+e8bK77y8XS0d6PdjPM7Sf882C6/RxmIuHl4tJJ67fL/v3Z31wsNvL083gpZde2gt2d7/85S/vBQtng5Uzef0+kzMr7J4PmPNSf/Z8sPIw7AarfqDKl+gvBFuPxfbYkc3F6I+F1T0e+yPRYX0vj8BOLma/44vS024frnOGuArLgar9+d2Ms1yYnlvUr+bF4GoQfC31AnX+uZEYb2YOxH4ulF7OIolxOXe7yAKm/dhu+kl3k+63DAQXu/bg4jd7lSnsBsO7OWta1DM/+9nPzoZ3nnnmGQeMs3mvthcsPfTpT3/67DvvvMPmB3seyt5pk4XfR49wCrMuSL8Q+WRsfkTh4WDvU3kkLkaH54vBziPhc2KxTwdvd4On/WD6RjDZs8eVjIXfje1qxrkC69GXcwjf1N3I84dvpngz7zn3M+7Bc889d5h5L+8nJ66zOqecghdnVZ8vLGsW2U2oZ9i9F154Yff111/Pku85V/Bd6rL2dLybzyjOpd5vWOxlzzsbTJwLnwmfDy4uhPnlxzHPPHbmzPJjqr3MzhtE+P1U3g0+kuP3xcT0qZQfjnwy0r59NrJxpXjH5Gx+I/14b5g9ejmLBNdn4HrBOHwn7r539OMj2I+w2KtJfRzkTOWzk53kIsVJH0MGdr/73e/uZY/dPdpfGwIsIvgolquzsy14jWSHQ8QGr6j1lfzaB1vt2tqfSQy7pB99xfqDa2w/tz+7vNHZhG7v5kfCtb70fbe04DqNFlxHOocsZ5FBV7fgOrK4Jr1XXfAdqZ/lHBI56cNloJghUcvFD1nc0IsjmCkOqvPjo1wc0ksdQ7nrR1rbrqk1LrHXb912jM8YxnY+hm1xwW7ZB8ywDbswDNNsMK6sTln7cZwU74jEfj28xnLxXbyTI6aL6+VzmNTpp3x4dJmF+U96bwas05pHTFSHDetabNjfsP3Mj/c/H/5i+PPh5UPfyHfCfgT6rbA1RMUpfFo3672cKyN9BqaMrXHt2vLVhm3beq/Xt3GTI647h2KahFkM17Dsko1tuDavD4prMZtTP9erZCt3vubPv3MecW2efcbFsp53TA8Mmfu4HsrNz+b5j43eHI6yPs2nOrmHkTshY497d8ttX6zBID/4gUVrD3fw3jWHcePDOKY3rqgbMkaxrc/u1x1Lv57L4vqk/RrO1WFx6fNuSXzyJfbimY6L6coR0yfhulg2x+pRHzgqhq2JHI+YLUbkUE7hR46LK+sAC9bfOsBIsaFfub1TMr62MNJ2sMkOd2KDHT7q6diYI65HTL8frvW73q/153VmjWs2OHYO6ZnEOaT7ubg+KK7lV16L5+K7eCbl/3a4Nlc5L5Ynrm9hxpoU493r1riWXxiSf5jahmu4wB8E19rBiTXBa1zDjnFRzzradM3FI2YMK31Ou9YxLaTvPi/bcO057Z7tOes5BI5xcQ3n6vh8GFx3z5DXYroYJ5v34rrPLmmOI6f4QNK4xnQYsMak/DRncGHNu1c395Xdu+FM7u1nH3Rt0/QYiQfDCwmHCIbFpEw3dscvDsRrDuLsnMjOu5jWr77w2Jc5wK35YDEoY3u183WxzrexRf1QJPdih2Fzge/qxXVfl8zHHDtXOlvnW5wvc/6Hf/iHnW9/+9upvr9o+Kysa0di87R+5olqG3PQXDQ3ctV8wUZxbA2bVzhQhonTQMWWuNCxdU3ZHJsbvsX2KNtHqk8FibdYb94ruy7WadS7rqO0rvqprXmIacmJcm2jrv400LgudDF2fWEbtbxNmrccYO1JOaOTcqiftQ7fxiI/KhJTn6nuu+IXgzg7l/U8xcnfuZpsP8rjs9p9PObFh/woSHxib47NpTzaRr1rxo9uzvqorD7mwryx8cpRj+nKHxvln7jyT1WHXa8xDjZzafytq32cZ3PQHFnzYoM+2unyqt/mks6ujOCLDX8Y0h7mUPsUK2qMxWTxwK/zqW/X1tzbJ6mPYnyNa+eb8YyivqzdvSDx4GK3srhtTpWrN+f1ZcfjnNdrvC7HfclDxycR+WHXbOnow/45wvUYyxhb4+0w5s6XHSvjlq0/Lmbkiz852unsctt905oro9+HnUPVFZdRj9G4J4rBmOIo1vTfvo2H2DoHfuLSP9ZWWQx0bTq3SnZ9aFtJ75jm0JirKxfjxvHcNPb6tv3YL7+T5p6qJUZn6H5OKW7xdw6kOYz21leqH9k8kXli5XHutZs7bpkssX/stAXXjakxm5d8j9S5bpNyZm7WjK7tmDt67aS1G328x/lt2L/HFA9RjxF/78m8PxIDiRpz8dB8dx1I45Mdk+Svn8ZGL7dP5ZI2uP20D1jufIpdtmJcXfXW13/sk83nJD5TuR25ZMYeYP63w688d27VlTvnzpU031Hyq626srmj5odEtd8qnc6/65jHcufRnJhz2dxqJ+USWzvraQ2Q9WPnr60yXL8c/kwYdvmvc8XPZws+J9PO2jYevurHNqPeuvppb4yOT+qr8Y9zjnnpV1u8xrZ+cOdpLFws0+vTurEPNv3ycXGSOd6OfpfKN8LFtdjLI37ZzGeU9Rsln863evPQcvMc141vbZXqTis1RlKuEb3zI9nZRrs81U63bs0de/PEJvddS37q4Pp/hZ8P+zzMnt3xoy6kje9Dwb5n5LWwvpB+GhM/uvbljqdMFwdp7MZJbx+jjHlD2heT7Us/xTVdPVlcKxfXrSPLjZH/58L9zlfUrWTer4R9V0YexL+eh3K59aNPbZXmi8Z58x/Li8Pwp22YRn1wOTVq4+t85Bwpm6e1aB0pL2zq+DZ3URe7emSdq4/+bQ/X/xb+y7DX4r7fi7ohfTwb/nwYnq2vdsZtXFEXElvxwtD4qncuJNYficb50VHz0D47pnHFBbe1KbMXy+z02tVhVL3+fxabf8NpPZ81vRzDb8LOI/KHxV69snNruZLdvFrfOca0sbeeLKs/icY+TvL5SOy3Pg7ZOpQYrcWa5KFr13l0zq0by82bfFqn+jS/+m8dfP5L+G/CXof9u+A6Btj4bPirYZ/J2rO8hxox0PHJsT295cYCZ42xddqxkaj90TtO+1Kmr/GqzC5ePts45oXah4J2fxX27Gp7Ev0iFf8edh7xPDbmxl0pt9VHudaVa4t6bM7j/NWh5uZW6dbfbbax/rTojdP6bKPWq6O3XJ1svvRRnd1a1o9d2WdS/xr+63DfO7KX+Fvrz4ftaV6DXw37XGDsL8WF2MbY6fpA1bfFpJ4dNUZ6+xolvVwsd1xyZPWt04aORpsyXD8X3vZ6pV4/vwyvcd1YYZluDqNs/TbZPLTN6JNujuVBWfx8UPWWb1nvr79iNw8kB9bkpBzwa54697ENvX3pA65/En4x7L2Tde3aR13GgWvnT7iGZ7j2Wlw/Ur8lGGi+x/EaT/1PmkP7Ua9NuXaSbRy/5fqqW9u0q52uHokXrj8T3vb+IuaFYBq/Fe5+Pc5h1DVQLrVOPnDLrd8m6yPO6uQnkcyr6zHq5tq5Nw+1kes2bev9z8/DXwt7Hd6Ga+vuHPKnYXh2vi6u2884ZvUR68VgY1xLbdYxxrSx0Ueq/0mSb+s69ig7Fj/P7dfD5ng7XP869b8K+zzI/lwyF9Q5Fbe1LZVHf+pTOdZVF9vt6uv3SZLmO65J5z/uQ+v5tg2J+NJJ+87L4d+Et+E65sVP3ZfD/awLruG9fUY9Fpcy6tijPq7bOJfxOVgab/nDf2wzlmsnze121BzU12vRF8In4Zqf1ynYNnf7Ads4/xQ3xL6uq22UmwYr/9v1Pbb5JOjNkznfKWkz5mhsS/dZrNdWZxDnS595jT7as6nja69+M9zPQ6JuqO0a56Yiijq8rttmG9tt07dhtrbGMMrqY19stZNfDjtrnYRr/cN1z2Djfh3zhsb5Va+s07pc+zZ5N77b2t8Tmxe0STMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzA6ckA348Tij5gQtfNOsXaw5zke/hD37wg91cPrebSxx3c8ne7iOPPHIzl+rVZ+fxxx/fdRnfSVNJ/VL1yiuv7OTiXpeuL2O5azoXSR7mEtVlHMO3DxeR5seilQ8aW+umnBnYkoFDP4qeS6cPXHSaiyF3Ll++vJcLH10muhP8nsn95i5Fh+OzwasvKe7kwsUzwbJfuoXLnVwuehhbYH723FtvveULoL+P/tv4L0Neu/Zu/JbL1Q/0Ed/rkTfT1pf7XU56PZi+njbXMpTLeW9k7Bu5XPVmLvfdD+aXi9nzTCwX78J/2i0XSn//+99fxph/ZgZk4Be/+MXexYsXlz3R/rstK8HtQqmzTx6kAJf7weXNJx5//NCenbrz4a3tj/q051/JPnw57XzJ0w8ELRdJsx8x+4LpSJeY3oT76PvRXZB+kPYHwbO+Dl28m0tYo056kDOQC6d3fv/73+9m/9sLPveCj8BmzwXTLlLPven7vmd61p4beSY+Z4Onc2Rs5+Lvst2lLvV7Bwf7e08++amd7K93nNbg0D7tx6/w1SN9kem79msZd7lIOnu4bRumYTvueZiC6+iHn/3sZzdnlDsOYDredxlwSec3v/nNJW7n36effno3r997wcZezrC7v/3tb50hzsBn6NyVyFwqfT5niXOHuWT6+sHBhWD7kfg8FCYfDYweToePBnPkw5EuS7c3n43v7pNPPnk3l6Tv5Czh3HEj/VxNPwuOMw4cZ/gD9mu7OZckvuts4WW/Tpz7ifMg0pnnGK5fe+21Bd9pu8x9/rkvM7AX7B5bwJyJ97IXs+0Fz2e/8pWvLHty8HImr9vns0eeyZn5XPbph4LpM8HPhWDk4eD9fHDzaNo9Hv1c9MeCmSeCKX7k47E9nH68yfMD9rC94Dp2e/7uhQsX7grX6X8/fTtjbPbrjH01XTlrX0/1gmc6W3xvxnfZqyMPclY6cB554oknYHnBc3Gd8qRTmoG///u/9yYLL2t2FKby7ssvv7yb/SpLvkeefeYZv12y+Kp3GFDnR3fwXjDH5kdM9vK+L3BYiM2PZD4UDJ0LPxIrbJ8P3mEXhi8EQ09km0951x5+MRjrD7g/fHBwmCCM+4E2SBj1vjPnaD+msmuvtncvuI59I+lwnefLj46Una3xztE5ZINvtkkfXQa++93v7uWzhnGPpa8Z3mqDU9hUXjA66GxjPb1c//bTturh2xhszhGYvpwzjsrwDdt+5IbE6v0Q8IL3o7K2+jTO3RJ8LriOXN4nHkmfiayZH9ameK6M6dizrzzpLjOQ/aRY6Vq2XEyRcFLe7JWx0Yuj6sVYZdu3346Tppsfp7Q3OW92jxr12pa9TKOBikFjlcUDv/DuwgX4tY/Dr70Zxv0AMmyzYTZ+y2tA5BhjindEMAq/m/eI0Yvv2kd8j7guvjvXzYB/93d/xzbpvRk4aY3YR+wWf/ALI9a4GIGPz4T/OvznYThpvzDohxffCP972BohEqu3vl1TmOt60+FAnbFI603XDrcfuF6v+0m41r64Frt4YboY7p494pqfdu0z6l2ROMXfuS3n7JQ7v8rmwdy6R1d2fiOWRz1NHihqPjrplkcs0EeMVF9jh73tRr047hgnSbiAD3tgnx39dD8Vm2cH7tT3+dGODteV69g6r7gsVAy27z6P6/3aXgzX3a+34frD7tdyBrMjnovx2otpcxz3a23LUTfP73q+6h5Uai4q5QuuYKQsv3Ju/eW3a+HfEdjhSp21RneK6Vvet/7Ctj0QGU8f8CwWsjosdp8kxcPWWMmueecU00J3iuv1OaS4Hvfw7tfi+iAkRnnEzWPzWly3Xnmcl5yYmz5Q50k+6CQHsNP80IsHOSy24aa4Lo5ath5di+JaP/huiL/2XR/9s8GMmOARdsXkGcLqjV1ck+rJzqP9xbTQiGt9ty/zwrDq2RzPIWw9XxfXbFj7D4prsTV3Yx7tE+avjsTm1PmZ40nz0+eDRsVa5941J5unYhmu5bGSLs/Nddeja1DcxeVDUWOEYfhqbPovforF7tuehz5v4hXbOJ8UN6Sf9tX22uoDOwsVsz2HFNfO1mLSrnFG/VBkfnJeHDefY37pxbX54WK7urK+ELlwPnuqbam4H/7kc9TDfG52mNgbrlw33+Zjbcd50ZuP5tIa0eWNPuapOVznlL37ZceL6VQQzI4xmdP9SNZEnte5V66968ZW/65Zn+vK4mHExBobp+L/BsI1ypxGUu660sd6eudJyoF8VJcfuGiOegbgR1dvX9F/Xxvp45gp/tGp8/NsiVf88Is7v85LecyBeWiDq3f/1y97+4/6kdK4DiN+6S13bbp2oxz15qHzl4PmZMxHJ8h2CFM1nGK5xDrEp9x5kuaJrWX15kaZXuYz6s11zJt8tQ283AtstI++NhjfWQGJ3zi4c4Brc1RWXx7XqrhtW2X9O4vURi/W6fpVx/deUfPfPJpbsds8d722zUf7+mnX/kbftifXHNMx8v9zD7/97W/z+9gp/79nJ5/Dj3GIq3joXFqv3LXmIweY3rxUb3nMU/3jvsmpta5dW//n0nsgdufSkwhO1jGwNX4S8ek8jFM7rFlXbdiNR2/cZNu1TUyLX/HZNtrBMclG1z+Ga7aWK9nKYsQt86GfROJ5J3w53NyJFz6Vzav2tdS2c1RHL7dcmapjOWg+2Ne01J2W/XoLrhtv50CW6M1JMVVcyEVxMfqxr1nerYH1a137tVa4nycYZxt5/6VOX9oas1hYt1FWXxl1gyFtGnvj7zq3X22R9libymLZXOi42KUX77XVr320H5K/58DzTJ5E4noz7AIpenM44nmcQ+vJ2rfZxrp1vtL0GMaVS2LX9tTQ0b+ZimsbmVu59eKX/+ag9WO5emVzqFz/5rhSnXWxD/m3RGv7qfBJ5HMzcXv/335HXzEaa5ybsUpwxceYdNx4Kxvruh99to0+RlanvMZxbfXVvv2Qbed59X9IfK5yEonvt0fc3BbTlbVXdk7K23RzXPuO8x/1uC4kZvYd+2P+n1l9lspT/Mf8xT5SYyebHz5yYs1qr+SjzjqOOW3btiPt4TBtH7K2/pPdevyYFnoqf/Vhb3fpW/2Mg5TFUDsd2T/ZjEfy1w+Jx7jpbRd1Q9q1rTlrB8ejTbl2csS1crl9kdrA86fD5n8SifdX4V+H6Y3ZnDAbbnmUo399Os+xXf3G+Y96uj9Gfc94O59jDf6YhaPPROR0G3W+Y13jJs3d+tSvcsxJc1U/ZeM1/13XmJa9861Ie5H92vpa6230uRjV9d/ZOgf4GXVtlcU2jmV8MbWuc2nslZ3T2JaOik1SLPURw4j30a9j1tY2pDZehz4fNv/b0U9TKU/i3MaNm2z92tY12FafZgtpU2r7lkcJ18qj/1j/kervg+t1LJ3XKOXEGpGodS2TbGRZAmrruirLs3PjK2H71WfD9tdt9IUYtXUO8V5T+7EvMbHVHnVTP+qNXWx01Fjavrb2P0ptlCvp8Fmcs4+6utF/bMcPrr8S9u/ut6Mfp9KevcZmy5Xm0Lyv9ZY7z/qRpdYp01HlrdKtv6cK10cxyvOd0nqeneNob15qI9ms4SjrZ3w+zob+jx5cPxv+TNjncupGsmbPh7X/r2Fnkc7BGB23/cNSqXUta9fx+Xes9lf/+tRfe7rxUPXK4ld51BfnI//qpHHgGp7/NGC8yT4AAEAASURBVHy7c0iqd/4t/MuwnKHG2Tko08utr6xf6/VRnQ+qb8u1jZKOThuub0V1d387T2s2Ejtb6+XJmirTi+uoiz76awevztdw/VzYOcTnIu0v6oY+H439B2Hn65GKbWOWir+O2TgbF3vHGXXta6ePc6avmY+xal/r6lHtdL7GgGt4huunw+zbSMwvhX8Z9p6kpA91jZ++Lo912rVMR2Mb5dZXsm2l0/IZ39bg7s5orqX1vJWtHapffcZy146UUxh1bnwtbM/u//GIuiHt/yRsTf9H2LOA2tet0h/GXdfxawz1rc9op6/7XPu3Hb/6Vh/l6Fd9lHR7QM8h5q68jcT1v8I/D/u/H6XGXlmMtr5SvbqScrk2cpttrD+mf4JwfWxeQ0E+SqNem/VmLw7Yle3XPud7Pew88lTY+6dtfdjP/zL8L2G4rk/7julY/8rbaB1HfTyT7bO2tVzjtvW1K49zXJfHOmP5zNrnIV8Kw3X3hajHiK+92uchziHrftSX4Zdeqr3ltRx9W/d+bRa/+xzX5rjOo3mNtmWeR3+aJ/Wjz6jXv7j23tG+be+y1u0j6tKHstfpr4b/Ney94zqumBYyzljX8lH1JqZxDHXb4mubk2TbVNZvXd5mN765ej/hjHU7XKd6wbTz2ngOYR/ncZLOT0zqRx/2U08Oa5NmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZOWQaOfuCiXzJcvvD1jW98Q5TjF1h2f/SjH9VnJ5fo7eaiupO+fLOZYfwOf/e73236yQWmh+l7U67j0Q9Frr8o1uopZwbekwE/7PXiiy9u7O4EzQWg+5cvX9595JFHdoO9m9euXXOB704ud16+fJvLHf2ANNzmEtwbuSR652aKLh713ae91J+Nr2eA29LWAOnbJevLReuxu5D0pgt38wxci/1GLk69ZozquWDVxdIulNb/wauvvnr49ttvi+8wl1Me5ELWHc9Bfphs80wZZ9KDnYFcNL0TLB7bV4Mrl5/7vXFY6R656GzBF4zdzCW4Ny/mRunYHkv5xO/ypd5F0ddzQe5bVy5f/n02Y1/yfCe2t1Pnh4J8QfQyPbYrwTlcX80z4Bm6HkxrD/8HuXR1P/qBy6Xz3B3kwuElvonrZOoBoeAEXvtFcXLv+eef3w0edgKRwCMbaSiv/eeC47PZjxdOOz9c5SJeX849H5fzcQV0dvJMymceeujCXvZN3cR8MsXfpn345ptv3szY72aPvhzvSzh2csF0/BZcp95lvNcSz7Vg2+W7N2KzZ++/9dZbB3kWD5599tnxmZv79cnpv69rsl/t/fCHP9zNJeo73/rWt/Zyefpu9jQ4PpPX7b3swWcDDWeDs7mM+lzqYPZcMOPHIR7NHvpQMPZY8PRobA/Tg+fHc03EI/l1JF+2v5jyw9mucxHN7nKrdbpxjobZO8rdO++8c5hnyD4Mv5fD7wS79uwF2+nk3TxLV9Lh1Tx4sO2iiOuJ+YbXhjfeeOMgj589O24HzuAHOdMf4rlf39ESnEon2P3e9763gCjY3Ql2zyh/7Wtf2/vxj38ciJzZzevyXvZFe+xezqZnH3300XPBk334Qs7IF4JDW/PDwdajkXDtgiQ/SPZQmlwMXvyIE/3pPAefCvYuRH8qGPtU2A8r+NGQM7Ht5Oy9k35TvDNKPAfhqxnD/gzX9ut3Ur6U8/nldBlc717JNK7Gfh2nf5zz+8FN52nnj7SF6QXX6W+D6+TnzgKZXh9ZBrJU8LoGCdveyy+/vJe9cS84OvPUU0+x1fds1nov63827Gywl33tXF7rzwfPyx5tb9Zv2sKkH6Q6EyyQFwLJc2fOnH80kAlW9zwL8L1gPPJiYno6W/GF9Avr9mx9PGKcWyGkdHcEkzB7KTLYdhY5dM5eysGus/aVxHE1zyA8L+eRxOv96HK+zvx6/qhcMJ4+lCd9RBnIeux2jz0a0jl3wWvkcuY9KsM0Zqu+we9g9/6s7WG2Pn0mls8jjvz11TLp7MFvOTcf1cG4PZgtZ4w/4Dq6H7Hyo4PLOSRywXVkx4p6VwR73jP23EF6z0hiuF6wHekMsrxvjPSDOn4syo8RLXjOe9DDozP2sm9PXCczH5DyGeru0UV7xVWldaZj+FneXx3J5RwbHSZap35k7cvFOon02R8itabLOh7JrjNbfeiI1JbUdzFenMOrmMQH287ZpHMJhnX7dHX7OJt2jS3qHZM4MKx634j9EBwuzv1AOIb9bbheMJ26dR78QKq+J91ZBuBipBEbxSVcwAdMfCr8xfDnwvAwUvdLdrq1sw9ZI5ikL++TjqR9q/tV11u5zLd9wDfunrZeY3Gbi5j7/IgZRtlgGiuLr1iG6+K5Ujt93C2JCa9xvXzGFzucd682386TfM9+HZu+iu8HGtee6by3ODy6VExOrHfz3Tyx4xEnxZ38ynP3k+Kw9d2P4/K+BGcYluAEXrT3fNDhzf5ordm65vDX8a2/GLpvi49uLiMV1/rHHc84t9uvnT/g2fmkWG+8Md0VNc8jru3T437dOXZefM2v8+o8x7Va+n3A9+vmwzoXu7BVDLNbd/kcdfm2/jClvnr3wO572twNaa8/uNWn+GANw57xOnb3bL7dp+1xnqnu0+bRtY+6IXE1Vv2ucW0c/ZoHHMMwW98v0rtf30tc9yzSc0hx3efWOhTb5tg1W7B8VI5Yfqhd3YNKzUclDCDrLG/W3v5QXNsz5ZgslvnSvX6OuORzt7hOk2XsPhfKJ+HamosF/rrWbN3LRmyv1/h2uBY33GJxnHQOYbdv/zFx3Wd32349zs+6WcNK55D1nFP9iSbzN2drO+K5+xopZ/ABs3ANP8UvDMmzPcWa6geu4U9/LUf90KQv/cJa9/H1fi0O8YiRFDcWp7lgJLaS50/f7bd99xnyrBTbsIuVYVmdXOjjXpH1EK/9unv1tvO1OTb/pHlaK+3LnXPX1r8TqbvvKJ9JjGtG7zysXefHZs7WhE0+sLWsLk/WuHt0cS2H7PALV92X4YIPPm10L3H3Uc/N+lirviZ5XuG8z6916jm7a0cW59oW56S62ooPZdTyrdIfsNPyxynFhruWjRWukbJ5qMfmKgdInXnzbY7ozRHdPgHDfHtGoNu7+OmzGG8MMX1k1GfLs9fXDYOPazkGI0bzGiX944i9cVkTOe3rIwnHsG1fwWwjnuW+6zTOtX3pD6tb148+dMS3+mI4RX8aW9eJ7NyEae3Hsj24bfrMazPqciefiNQHohfv8g4r+mIv1u7VXq5v445srcQpBuvR57Jr1vVM1YbEp6/iWn90cdIbt7x0LPq9xrw4RkyKXd5GHs9WMD5im6595zjOvxhmG3VlZGyMyNp38tq/0Zfaj/HP0YXS1makxle7Mr1zMl80lsccyLM1tp7FNV8Y0g9ZHEXd4IFubd46kj2Ds6+pz8QYS58DYyHjsxmTzrfYo4sB/vg3HnNVJpuHqIut+CT1idt/+yX1KT46XPOrrTE1F+2ndq9jbB0r6jESt3O0HMFr89v5yB9bsUvH6nHL5lsb2fmu5z/WxW2Tm7XeMvmx0xZcN5/WtvjonMVrrca6YmCcP13e9EWXa2Rt5ZW9OKIXH1EXej1/tbvd+yzvxWCjfXftYlrIWPoW7xhLY9A/1of5dZ07Nzb1a9JnYy4mG7+xqhfXxa+66vVha1/iMl//3t5nIeoxEps4fX4kR6QYm0t6cSsvI9en8+yajrJz37ambKXq9avdf9htXW2nQTbO5nqMqXXWpOtdm3LtpNx1zbqezbky4mcNEJsy0uevw/z9W4oz7zbyOQMsOEO+GbY/GRfpq3NobGx0PtWtqT6K4a6xGDq3qBtia7+M+ulY5tB5kPqt5NP6+rRtJX+fa38hbN781mR8OftdWI7Mu3Myr3Kx3TJ80/l2rvTOcT3vVG32LnX8Sm1Dlnfsj/6drk4ft/R8hcYwxoI13MR+5KRsrkju6fxIuaKT2/SubaqXtnxQ11pb+i/D6voZWdT3kH/nsK95r4/g29rBiX4wEldtZMv6b8zkyCku5TEXbCX9oI6jjDuPzrNyrK9PbZX2cv934M/D/m0SztckHph9I/zL8KvhYnct+dVGX8+369r1HOc/znv0SzfH8LDNj89ppDFW67ael5jlQJ01KjUv7M0hnV2ZLs9tQ7KjtqEb7ydhZ0e4todto2didBZx1tQv2RhgRZ+Yzo6M1zrSWJV8xNT5ty99sJElbVBtylh7NrI6fKpb28c++Hpdejr8v4V91s22jbwfhOt/C9u3i19zK44r2WqvXml+5lVJ31aOebGrK9W3crRXP21SrNZg2zwa6zgfeal/c2RN6IiUS9Sc0rUZ11Zd+/2X6NbP67G13kafiVE9PDuD9KwZdel3HRc7W+2k8WqrTiJ4rL4Yhj9iR2R1cy5+SeXOUblcuzo6Ume/fi78n8PO2Cft184Ur4V/dCRhuHklzadSXcujT+eqrjr5fhyXjQ8daVMa9dpOixRb10pMnascyL+6MX52Nlwf9fI4+rOpx3R1dNS2t0o7Oz+OYh/6T2FrvSbtimv7OrZ3sesLVRoLIzZ6x2sc9dG+fdQW03tI+/Zf2blypq+5beqnTEckXH86/M2wZ9kZaxt5hp2rfxh+Jdyzs3gbPyn/nUPtxXtl69cyTd9D9VFBL52kt/60yDHOrpnYah9to731JB7xMWKcHVXeKh3HmnOINv9n+LN1WEkYcA5xvvb/2Hzu1fUzfnHTOJTtj61rnOzVyVJtyqOdP0ZrfbRtw2/rx7ra7M/Phv+fI3nS+2U4dq7+l7D3jsqN1VzpYx7G8to+zqt9pPmGalv7cWjeFudT+jnIZiKDYi5dP+bObbSt7aMPXR5RX29rI4sxPsUHCc8/CyNnzc8t2nv/9HxtXZ1B4FrbxhB1E79+Ow5746J3PtqNbdWty2wjNe7axnL7JeEYjfW3LLf+ssO188d/Dntm4bp9RN2Qs8Vvw17TXg6PuBavuXUujX8sj3pcN2Sssa76xuFIYUeVt0qfjL+d05iLrkHliKPaOnvt27Z+Lav7Vdg6/2XYnryNfHbg321g+ffhnkOibvDQcdhKtTUm46OW1aOWb5Xe/y//sc1Yrr1Sb2vdfL8U/nr4ufBJ+3Vfn16Kj3MInKPOQ/x0snOJ+p4yGxr9Rl187XNxHP6M/Q7m06v29cR3CT9AlOZ7u3bNB5+1Xhv7b8I+x/tq2B62Jr4+M3gh7P2lNs6c1kFdaRyDreXWj7LtKt/PX/3oO/ZVfawf9W1tvX55bTJn+7Xz9rY23kt4r/yLcD/n42du4/xO0uO20NqfcWxzy+sU/rUBTJoZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGTiFGciXk5ao8uWkftHHF1b6JZlF5rL18UssLljcZl/6Uce/cpjysT5iVz48urhqrBuaTHVm4L0ZOPrhQxXF6U4uJz3EucD0IBcr7uc+yJvuhMwduDux7abuIGUyvjsuxD3MRYz74TPBvgtMXfC7fJk9z8TSb+yHsREudNxPGxeP7ruANGMvF+ymnUvRr4WXS6TjfzOXUt783e9+x//mF77whYOMf5jLKg/zXGz7cuR7JzgtD2QGAA1l8njBaPAFewe5xDQ4OvQjjb50C7cweNOlu08//fSjsfuhq4fDm2ci+jGKjy/wvptLR98JEJcfB0rf72aMy3kuXEh6JT7Y5aVXY7sWvh5Muyz9RupvhvdzGfV+6g9yOftBLmbt3t24j405C5/cDOTiyb2j1+/NJIOPXZf35jJbF07vBV97LlTPXuhy391g72xsvm/qy7mB1Zkz2R8XmbJLfveC7Z2LFy/uPP744ymeCOfNmLCYgsuk4dUl6e9mDFj3xV7sC83LxeixX0ss1xLn9fguF0kLAa5zMbYLpffhOv7F9ajHPOkTloG9v/iLv1imlAvUd4ONXRh+++2391w67TLq7HdnghUYPRf8ukD6XPh8sOSHEi7kVuqHsiE+HNvDseFHds+ceTgHjAvBMvuF7OrxP9h78sknd4Ixl7rcaRoPc4a5mfGdMZb9OQ2vpF+YvpqxFk7cLlK/nmfpevTrV69evZlxbuaCdz9SsZ9n4+CnP/3pskcH5zvOIkc/kHqncUy/U5qBb33rWyJbABV9N5crLxepB3e72UddkO58C79ng4PzZPihCxcuPBxM2Y8fC2ZcgA7bjwZrfgjioeDpifhdjIRzm/ETYX6PxfZofM9G2rN3cubdSVkcd0oLrtN+wXEaXUkcw/njILjeuZpt+VqGWM4g8YXtG+Gbwfd+4ncOOsgcN3u0957B9U5++PdO45h+H20Gjm182XPPfPWrX915+eWXnRPOBEvOD3v237wO24PP2YPDwLXgNxKmzwVzftAD/uDzoex9gcbZZU9O+Vyw+3DgEZzunk3do6nzgz4PBd8Xg9WL2gVzfhz2YiRcw/2jCfBsNsoF1ynfLdljndGXfTl9LriG7fDVTOJq3qAuMj7XM2c/7pfp3LiZ15YFzzknLeeZ2De4jt7zSNRJH1UGvvOd7+zaT44Idkd2hlWGTbpz7YLTI0mH0Z53SawN2R+kaVv2bbp+/DjkgvdIPz7VMh1u1ZGYbcH1kc7m/aEx9fVBCa7h1Z7ds/XmfH1Up94PnpW9T13OIJEbXD/77LMHefZ38uwfJsepmvRBM5D3YHBToo9svYspEsMK/GD7pTKuDid0stx+9F0MdX+yN/WH/diqV6ovR12oMeqrY3TcxgGz9myfa9DhWNmPtldnN4/GFPWuSFwwujmHRF9jWx1cF9v8l89fIs2xc17wPeBa35PuLAPwMJL1PInhBI6tOzzQt5H2sPSZsM+7rKs1so9ha9h9il/Xl24PVffukX15TT+y0a07qb/1OvcZaZzFtT49ZzAL02IvrpVHXPsBb3GcNLdU3ZbEJD5z6h69xrU62G4OiunOb8R152i/rp6mk5IB+SjDhTUbcSafI3f/qBzzz9b9OOodE8wVb2IRg3LtnhW6vunquvZwtl777t2p2tBJuNZenzC7bb92FsHFO/8Pul+n6QbX4h8xXZyz91kmm+cR19ZnfHa7fjE/8NRcVDZXMFGWS3mVX5iSc0y3z406H+tdPEa9K9IW9uyV7UdsxTIdpjDcd+1h8l7guvv1+hxSXNf+UeG68+vcuibWid71kpcR4yk+0NR89DVVWb5gqjmE6+7H8rwN13BlrdV3fyXvloyL7ZvbcG3tjGVfez9cd83juqFxv+5rg/7Gc4g9Wdl5Gq/PIWx/LFw3t2QxLffdr7sm5kbv+pH4QacxD3IEu2ssy6Wc2iuLZ1joHl18WQN6Oeo9I9iFK+OKAy5hCo+xiKlrL+Zx/bve5qc91lf71LZ9Gms8h3i+1LOLRdt7ReISs9yO5481ppWLbetUHudIt46da9T7mszDfLpm9DH36s0ZWRf1Zflha54qR3zIJ7w2r9YAW3vjdNyok+5BBqyNdeieQnZdyK5DZeutcf2qk9a/rO/iJepCyqjyVunj/3v4ve997/Do390aM6w1TtL82DpfWK6drXZ5GXFevfVyifVFwrd+4J7vx0meMSyeUV/HpA5VrvWl8iP8I96uRbEsr825NVEufsnq49pVr9SO3j2ssuOl6hgd5t+Hjhk+5oI4xbxeS3bUnKnvnOkjzvnJg9dmfTUf9VfHvzmNuvjDNlKPkdd2rJ97ifUmvWcR/YvHGPTGQMdiR+t1NA/cHND10bjpxiDrF/WeUuMVf/eKYrU5HnNvbu9X1mexwLd5qK2yfnE5RqcN14ITM7JW9GKADXVO7OZF4uaquvxVV7fWm1/rrd4a6Nt+rY4OD/5/mnqXJMEI/22kf221054fHVfnU9InP6QeG8+cyD5P49qNur60QdXbj7b6KLMX62T9xnq6fnB92W5H5uCyKHswTJsP7txaXkv1J7E5qiOrN48xLflsHaluTdtsa5+PuiwmuUWj3nLnyqfxs8md9WLvvJtf61S9+zh/66ZN67qm6ujYuqHPhL3nOmmtjeHfO5rrxhbTQi3z67z4In2KoazcOVRq0z7EhSqLU2W6MTq3lkm2kdnahh2xeb/R95gdQ91I7PD8Stj7xO7Rawwrm1fnsdaV69P513eUnTtZ+5iTmDdU343h41RyJsp/ldnclC5v2+Izp1Lryc5Vu+rkWKcsd9au+edf3K91fm8e+X/+yK/rn+KGtLNXfzasXxeDdRzjq8dj29pI44iN1I5f56D9yCkeo/ajbfvSXhnTzY9eWXt9Wo7L4ueiM5dG+QxQ3TYyls82fhH2b6zdr5tj8yjLSefDVp/KtW29Zi2PeRj1dHnqSbxI3rbROJ/68pMjbTB99FNec3Nu3dTJPWLvWpKvhfX5lXDfU65jU7aXfyls3/p1uONFXdrri1/bknxqozeWtiXROJdxztqO/bav4lqZ3nKlNqOujJH+XQb2bNjZi9820rd9+sdhl1fCdXM6xl8byV5Zn9a3TK7nq3xSfaruC+q6yRudHKlzZqtvdWXzt0Zk+6je3Mil9RrtcK29tuoR/Tdh5T8Ne23ets78fCb8tbCLHK2x1+iSOPigzqexkdX5iKnzIMvsI439sI/9F7N82JVP0lO18aGjL4bh+k/C7Tfqe8h+/T/CLhs25+a38ctbbfR1uXWkurbrnCvrN9bHfZMb+mknsaOu263S8b981HfenS+bHFgLeSp2t/k1x2M/zZ86pJ+Xw8p/HnZ+9lq+Jn04k/512HncHgbXxi3xQfoc7aPNOK0fY67Ot23119irV+pj1JXLfS7VI7L+nf+fxeb9xBfD9Y96jLSzX//XsHMXjDenYtRXy/TayJE75uivvlTfscwXtW70v1Vz+v42xub9pAg7p/opm69yWVtrVnvbKLMr8629snlT96uw9bHWLijt3hd1Q/qyl/9V2Br/c9g6628cP8WF2DpuY+3YZOPlh1pXfWxbH3Xti6y9+ihHv1E3jrn+ZRiuvxze9hzzk4fi2nsQ8xV3Y6WXRxudHdV+O9k+R38xtw37J4XMCZHmiKp3vvJhbZVHvfVrGbdNrtQhfXu/r701dt7cts787NcvhuH6f4atM2p89MbDhjvOOpaWtaGPvmxran/s2/TuuevxlfmjjmE8Zy5nkBfCPj/aRvr0mvRP4TfCPYdoL1+48yBL7KXWK1dvfctt23LbNt62rX0nHz3kI4jdttvYT7HSWLsW28psXS96fbZNa6yrb9e+/r+NItefD3s/tW2/Fo/ztT0drp05rbkze2ONupBxuibVVdS2OG0p136S7DiV9VOurVJd9daT4hFzzyFfin4+vCZ+nm//Z9xrU3HNPnKK7ymPtmK/NhLpA53U163aW3/rO9ruZ73z6fqs5/JB6ttGvvUL49aM3evySbjm189DnK//e9j+5TX9djTGboyxPLZrXKNtrY9tq6+lNrWN7Wszb5/nwPVXwl8I+z9U2wiufQ7yL2HnEM/DiNMUN/ikI/MYeTEOtpbX8k7mv25zP5U7v67DncSuzd34j31q5/ONX4dh2v9ntp7r/pTVef2mXwoX12vfVC3E3tgqj6oWURtZOqkv9WN/9a9Ud7u2/NoeNuH5hfDz4W24FpM8+BzkpbBnH64bK1k96oZG+6hzGP3Xde1g9KntY5WSMGlmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZmBmYGZgZuB0ZmD5MsrwQ6R+e8sX3JC693zhJpcsLpVjXX4Qdyc/iOuS86Wuso65LHgnF1W1PxdZn7ovwTTWKU93BmAntAT5+9///uDhhx/ezWWRZ3K57sFbb/k+Zr6ZeHDg4l6XOe/k8selQS5Z3IlvLlK/6dJTt07nTsidXDi9lzt8d9/zBeb0kXt8zxzkwkjjuYh9uSg69pvx7w/4uRj9+qVLl9wQfPOi+6xza6nLSXNBpbEOcrHjQS66W39Zcolz/pkZaAaCqd1gdjfYAe6F4Q4Gb+Hvpi8n4hvwF9xdyeW3LvH1Q32+kHzSjy3oyyWjbwSnl4JfPz77dtrnct2Dy+n7HX1F0pcL1IUSn6uRLlW/EbvxbsB4+tn33H3uc5+D78OJ7WTqAaPgwblgczZwebqLfN98883d7Ht7wfByaW8u8HWh+l4wdCZYW1g5be232XuXC6SZdu3T8JQLgM9l34bl9+zJsa3pMH1fv3z58o1I2L0Ex+nvnZTfOdIXXEf3wwxwfT311z0Q8VkuSofrT33qUzdfffVV+/3Bz3/+88MXXnjh4Ohcsx5zlj8hGfjmN7+5mQn85iJqr/l7ORjsnT9/frk4PfrZXNR8Nhczn8vF4+eDMdh8KPLh4Oih/Zs3H8nt548Ey/biR9mDteUSmtTTc9H0wdnHH39iJ/3spH4z5u2UtDvM83Az/cIsDC8cHY5hHc4XTMdn2atzvrke/NqnF2zDd2z7CX3/C1/4wn6ek4OJ69tl/b6p2817rAVIP/jBD3a/8Y1v7AW/y578zjvvnHnmmWdcpr73+uuvnwt8z0U/Exycz+s2zJ4NLh4JvmH2fLDxWGD2KJzG74nszk/meE3/VDj6IVxfTGY+Ff8LKT+e7dpF6nvBmfPKHWP6KLuH6cePpRTXl9K/H5twLnk3/cP2lRyzrybWyMNree5uJM4bLkn3TCT2mxl/oczxIPM9SB4OMncXszjvTDqdGRg3v+XMkDD3srb23DN5DVYfWJ05m7PD3iOPPGKv9fsUzgxZ9vN+eClvsm6S2Hs3WITRM0fS3ns+fUQePKL7vGV8PLZH8ybsoWCK/mTYj4I8HrzBuX3d8wD3KFV3TXDnzaIfb4NlmN7gOvq7eZ14N29Or8aJz7X4LmfryJuPP/6495R9X7lfXP/oRz/yuYq+J66ThI+KsiZ7+dxq2VMzZiUc0smycyqM4upwu2B2sLPVzrc6uZyHj3zVGYN97BNe+cF93++R8MzmxzGfCC+4joRx9jwDixTPByG48/mFH2+D62J72a9TXs4jkct7xkh+fjioWK605+Pls5C8Xk1MJxkfhoLPvXyu2i5gBhWXZPFYCVMwQcIJ/CjT7ZvsmL0YVVfM64eOu35kf/zM2vZHlOjLWg++URdqH/prbMYzrvHE4MeoYLcYh+9inJ2f2D8MrsU67tfbMH0Srvt5DDlxnSR8QIIFRBa7xcdoH3ECH3zsLTB2Emljf+QPO10r60W3V+kDnuxZyvaz7mHwwN46UruOqx/4H0lc23ANq3jENb1le3fxfi9wvZyv06c5OId0n17eM6Y84rp7tLmN3Gd4fI7j8mDT3/3d31lz61xSHnPV/aA4K37gamR7j32MzXrAqbUvpsYxYr4tdR+Eoe6lcGhft+b6Ngbms5xBj6T4igExn4RrY+i73NcPfRfHxqN3v17O3inXt3HGdFckJ7Ap/mL6JFzzMT9z6ryK686PnLhOElDe8+TIu7l4Sa6LaXmSu+638mkNrTncwgLMwhi8wbN14cMOD6jlW6U7/2tcrB9j6V9fyrUV18pisvZs4/p33ftspXohfeuvmO4YxhlxPZ5DPD/2axjn15ii3jUV12IecU3vnt35Fdfj8zriu3Msru86mE9agxWuTU9urHlxbe3hu7i2/taCtP7WYcQ1nd0PhyLtrf/dkhhQMayP4pzNOF33cb+GufEc0jV/P1zrD4aNs8b1+hzyx8B1sb3Gdc8jcr7GdddofG01z3LUB4d8LnW0RxfD8tDcFAfNmfVuPnvmKK7hSt6L8WJQ2Z6tLVx/WCrG4U2f+sfiwPBI9vzT/Zo0D3PzbBbb+tMP2dj1DdPiJj0rWN8kG1/zaTxRPzSJSWyNXT6Pf9536/ntXLsG437deerHXItrOuq8b5Xus7/f+c53DnJWFrXcd27K9OLWmhSzo66NdZOjSro8WnPYplt3OebfXFt7ZViZ9OEzYK2sUXNeKf/NORu2RiRMl7V9Px7xP+LejRxjOV19vPT9739frHv5tyaB0Luv0JF4zZedDSvLB0ySLcOpfME0sl/JobbFN92e7TnQ97inaf9xUuf+ccdxNzmQ++4lxa1cs5WVayuu1RXT5FjWJ7bWXX+y5cqYdnayNxLqTwUdnS3E2HUcdXGWaydx5y0fsDCW5Qdm0YjxtV4f+fZ8GEtbujrPhriKtagfmMY++jwZp2vX+Du/cd70kngaU/XGSxqn9ra5V7IxjbgsVuXtJOyqa5txDxp182+569tckM1BY2AbqfbR9rHpXjv+/u///vDoHCI28VoX1Fhrt2atJ7F8sK/xUbtcySuqrj9rYBx6sVzdWZGvy1SeDjvDnEQw2pisnT5Q5a3Srb9wV8w19jHuzklbOiLbVzFLjlxc67tjVIqvOjnqjYWPOerzJBKD+cmNC6PocjSyPOLRRq+dNF/MXn3MQfXmovNvDpobsraoO6fqHALXw+d14jMP+W6OG3vno97c0Tj35kjbbbqcjmusbI2NI8fVtbd25G/CfxL2vrLxRN0Qmzrt+fsshT5S42EzhpjJxkiaG6mO3rlWj2lDxlyz/srGG7lzVl+79srIa5I59N/Z+WwjsciLZ/3VsPOyud4pyzffcd6j3nXdlofmJc03WF7n5lThWqDBtv/z3rViKo2x05E5YlRdW/XKzZUcsitXt5bVya6tnHc9tfGZlfIvwl8O+zcN9jVp77O0T4fh5/Ww1wFxaK9N46azlRt74+1c2atXxrRQYyBH1qdYOmb12sfyGAcdrv1/v8+EfQ7IdxuJxecdvw3/Muz9SXMrl9VH/NKxOfFpXf210W9zQI7zH/XmojKup5tWuBY3knPUeZgj6rqwsyljurzQK6Mu69QyKad8utZRNzq7eriG0Z+E4dV3SdStSR8w8XyY38the5pYYAp1PnS21mnbmMc5srXctpWpWuIQy5o7H/biubrYqqurTnrP7HLhL4X92w3fk8iFaV7DXgrDuHyW5a1cW/PdeY726upaP857zENcNjmpTp5qCq6X+LJnnxRn56uebs4aNSfFS+uap7hssMS/ueTX9a0OF4ifLwLq44dhezVcbyNtYOJPw/Dx72Frr8/22zhjOhZLYzZO/UfJjthG0h9GoyyuO69Rdm5k26tH4n4u/GLYfn279xJvpB6ufxR2DmmeK5vflsnq6ujmM/rVp35jDkY9zY7lYp0X9aeKboPrMfbqnas8WCPrw6Y86spIDrue6mun219aR7ZPl3Dq87+FnTudM7aRve2Z8F+GvZ7/LGyfRx1LjI29NuM05tYrb+OYN8R3JP2xlcdydRKj6vzpxnO2/lz4P4Y9wz7TP4leS8Wvw/8U7utS8WpOuOVidy3rV5kmm1xsmz9baayv7dTK2+C6Ma/nxi4vpa7bOG86H2sot8Vt27G13bjO9P5buvWzV382vCb969O59K/C+vpZ2PkT6QdvI77qGm/j5MuGWtfyLevxfts/qc/Oh2/1jsWnfq03LlybH1x7hv0b5TbSD1z/Kux5d1ZrjFEXXU7Z9Dvy2tZ2J8k0P9Z3y+R9Q8G1+S2XuJ8QtHpr0jwUB10rslSfUapT1q7r3T6U6xt10eFavXOI/XgbrmNecO01vLj+X9G9To/xpLhQx1E3xrAeeywfNX2PGPuvPvargXLrPH9otNHN0Tnk8+H/I+wZdhZpu6jHCK7N75/Dl8Lai7eysVeyl2uLaaGWt0kO7Kj11UdJX6gYavk0yMZ09JnInYZkvs1/595cjH20rraxTW31IWHOXmQ9/jV8O1zzfTb8F2Ftfxn2Ol3qWC2TbHwr2VB91ZVGvTayvmtb7WT10b+2SnN0nv5i+Bth7xUeC7c+6obYfMb3Stj5Gq7FN7L+GvNoH/W4LFTbtjb1uWNZDN1xg4/AsTG9D66br3XOt9lra/Qtt23LrSfVsWOfYTkne98P1z7Dbn3UhfjB9dPhPw87q3uNhuuOM7apLdULaX8727ruqNlWMfqOOufblcXsMxD79H8Ie126Ha69J/bs/jjsNc0cRlIus6/r6zv6sIlxtLXd2t7275HF0Hsq7i+DeXe9qleOM6mNvBNqn/4tzWvuT8PeD550DlFnv9a/PR6u3wqXui4tj7JjsTW+2tZybLfW68s+6mu/lkcfe6Vzh/eLPg9xprodrmHZc+t5734ddSsm2VHnRlYf7XQkrtvVj3W3GnxM/8/pdh+ELoHNPzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzA6ciA8sXUvKFKl+iKfmVuepr2S/e7B5dunii47e//e0T69adzvLMwPtlwJf+UC4+havdf/zHf9z9+te/fpgLQneefvrpnVwe6eLbg1wc6kLnnVwueZC7I/evX7++H93FpWfj62LU3Ae547JUWF4uoe7Y8TuMv7aH8d93aWnYhewu5d3XX+6Qjsv1/VxUSb957dy5m2++9tqhS3dz2e9BxjhILMe+wCv2jjHlzIAMBE+HuTj9IJeA7l66dAk+XJJ7EKwsuIO56NiFob58fD36FZfiRvfDC/2yYffkmBaCvWvhV3P57yu5ANoXnJXfyaDXwu/mlxZ9CfJqbr4mfenzSi5YvZL+r4WXi9KDZ/elw/3NXPi7n4fm4De/+c1hcH+Yi3d3fvazn+1kj0/TSQ9IBjY4cwF19txl/7T35uJal0IfvvXWW7vZA/eCpT2YDXefDXz2Nu1twPDvIuk8A2efeOIJX+D1Y0/9sZGtKU1/frj0Ri59fvftt9++mqIv8L4dGwyTl/LcXMr472QPv5T6y9FdlJ6XhavXU76eMV2WfjPPEd5/7LHHjuH6tezl8d86/jTe3xkAn+9973s7ObvuwPDPf/7z3RdeeGH3d7/73d7Fixf3chn1Xl6/z2SPcxn1ueD0XPB8Pu3sty5Cv5CzxYWcIPyA0yOpfzg4ht1HUvdIcJNL1Xcu5Jxw7sKFh3YffdT30O+ccq64FlxfD2b96NuC5/RLv5QH6VIukXZx+uXE4AfP4Pqaw4iNOjbnn2W/znO4/6tf/eog5c1+PXF95+twCj338oP2O7n4dzeXg+8FX8vemzjPZO/dyx68d+XKlbPZ185k3zsfXJ4PJGD4QkwPp3wWPsOPhc8HMk/E9ngYrp/MVn0x2/NDqXsqeHY5+oXwk/TU+zGcC9mu9+zX6X/h2O6Y0u+No/33cvp95+AgeD6z83b6zx69c4mM/XIez3cT05XYrmWca7HfcN6xV0e/mb365ptvvul8f/DSSy8t55A8s3O/vuOV+Ggds+7jCym9r++7zz33HH0vr+Vn4DPngHPBiHOu36aA0bNwmLWHv8DhrL33IRBP+ZHIh4IJP15iL340Rwr2R4Ot7Ms73uf5QZDHcwh5KIdrGzE8P5Sx+C8/Bpz4zt46loxhpvbOyVn8xi3sLmfqd9Ln22FnbWeSSzt7e8H1of06uD68CtfRr+d1RtubeUaX95LFtdenvCdY3g+kftJHlIGszYLP7LF9rw6LJVgtfuFMHVyyY/sorp3Ozqd+pLa1863Orn94rr+6nonZ4JbNj0k6c7D1h2+MB+/K+sIfhvxYlB8QWs7Vkd4nOof0/WLlguvYF0xHLpiO1L7s/Wg/D1lw7TJlr2eT7i4DRxhtI3gpwxIeMQoDMILhqhiFIzpswRKdj3LxV9zB29i3/vt8dE1Ja91yf6CUH1upsZHGwWI0VuMUG2aDZft2bfzF82FInD4Pgeti2g+d0b2XLG/D9Rrb5tY5LzmZuE5G7p7gAZfoxZz1LgZhRZ79OJn1ejoMN9tIH7ANR9a8WIRNZWtpv7THdZ+zh/mBdMymjLvuZNuvcd2Yi2sxG3/EdeOBadgurvl8WFyLS9xrXNuzb51DbmG7uOa73rP1UZ64TjK2EBwVS11z5eYNtmAXVmAIZptr+461tgZwQoeJ6t1z9Xu3VLzZy40JW8bVv/GKjcZCiq/PQuMnR+pzKEb9YnEah60Y3rZf3ytcy5s5dL9ePhtJeY3rzs28cJ9bc8Qjpq2ZPI/PcYoPJDUXJi8f8gIHxTJpr4AF0nrQYcHrJX86TFS39u0XNtm1uVvSplijw7O9E97Ege2npDUnu+7K5mFOt8M1HPf5EfeIa2PrH3fse4nr7tc9g6z3685x3Ks7v+JanstRF1J+0Kn4I0dcw1HxLa/FrP1DHSx0L4YFOh92eGhuYf7D4hqW9FFsGav7tWer+3Txbc2tv/jLUTckfqxf8XUufYaMY882zngO8UzdC1zLs1hHXHe/7tma5LNtvza34ltfWL7LUR84Kt7gRD5QdeViufu1dbf3Wfvu13RYhgP44AML+imuixG2e0XFYp8ja2vc7mfiLIu/mCbNWyxkcS1u3LmIGeuTLO7532sSh7jEvn6/CO/Ys1vmh825snMku5YkXtb5H/7hH6Len5TPQZc5DBfvdu1MqPPs5JpPa9V8kGV5gw37BLLu1hherXP3a3ZlWNGX+kkfLgNdG/nvGQSu1zpcj89v1642a9hn2vp3nRecpFziox5tnoVbxY//b3Gdz9/E3dirN+7RzmbubPYq84ZPNmW6HMEqH3mUW3mAZcxePepS3/2PfdKdZ6D7tpzbN+TaWvSsJf8j81NfLq6Vq1sf61y8Vsa0rJ1645Lo4BR+PujfTpf/WJn4Gucoq4ufjs2zzysJy2wjxu3DbHAKs9rJaXW53qazdf+W6+LcGPeK9IXH14rOqfNteT3m2FZ71H7uZYy3ev7D3zHvPTcXm3Ipt5Xs9WEv19860Yvjrp21ZFPu/LvOxsfm2PpNrro/pu7UUP596TDPW9ek8ZPiJ7t+Y13rx/nLAV95JPnIH6yi0U6v3XrUH6blFr0e9v5LP/DdGKMeI68TGHVd6O2Trq1+2IzbuPl3LuKno9bfKv3hr370QTYeMeuzdmU6rk5WH/tgM0e+tyNxukCpZ2f5Y8PFKFvtbHRyrRer2tLXPOZDHjBbc9P6jS24TvWpI/E1sMasbD7y3fjHOvXKckK3PsVCcx3TZm35rtdeG2SM9kcqex39ZbjvKa29um3Uzxq0s+5d53WfjXeMVfydV9fPGHS8jRqv/hsv2zgfOts4Z+W2JT2LPjvxf6K8DzlpfuIzp9+Ei+3OkSzbH6qPsutBjnrnSBbbnXNz1fzEZYMDPurL6k47ibV4EH/XTtydxzj3+ph/10zu2s76dm35qENdd7p2xYR2ynD9k7DPypRhV902crFn8W/du76NVxt9KHcseteSbh7jvFof83uoMTae9rmeE/ua25YdlnvRu/mxbSOxwOkvw78N+xyvGDUHdS2TLZMjd76dqzK9c629kn3kFDdUO4OzrPKpoz8csY+FNsbaeZDmjcZ1aH1zZ/2wPBez/HHXlp0u99WjLj5w/c/h4tr6j+OluKFno8GFPuxp3bP1LS5ym24e2pCdF4k6n1ul43/1hSrFpZ/Ojb3zYau9ekyLzV7t/wj8adierc02Eosc/ST867B/i5HX5nrEdG381z5srSeL38pttrhtzUVzttSfUlx3Lbv2YqWLvWvCp+vIXl+5QMp0fmMbeu18lIuBrr3829MRXz5w/f+FPxtGT4RPWvcvpg4+YPulsM90u4ZRj8Ujhsbe9SSR2Me51b5UDn/Eh/RT6pzaf+fGF9deyeb/rTwT/pvwn4RPInHJ0T+FXw3/Ltz5ibH4rU0O18wPdy30uY35NA/b6te2uJ/a/VqsSM4bt7xXt0bmy7am+lQ2d/VVxojNGoxrrp1x5RvR+fm86r+EPxfmb78u9qMeoy+lBNew/z/D/r+UNdYX6vh0Nmxc46hr7GSJrq591D7KzrF9jmUxo9rIsr61cX56Lvyfwl8M1zfqMeIvP/9v2H7t/bT5ia/4rd64a69UXx5t/MutV0bKrauNvfpG3if7tXjX69myOvNVpm9j9SVrJY9Im+ZKuWtPH9cUfn1O9V/D9jGfhcBsP/OIuiHPyRfDMAL79rTuZ2LT7zgmW+Nr7OPc2Ma5pXiMWs+n7TgYZ5xDbXxqJ8c2zh6fDv/f4S+HzVv/I7UsZvn497AzNlyrY8dyrEy2LDds5fqO5VQvpA6JT32pvpXsrd/IU4rrzmGUnce4DmN99c5NuXqlXFnLlsnmjz72TR8Zrv9H2H52O1zr54vhp474B5HFtTVun/xGTnGDN7q6xqaMlLVXV2p/Y5le7Kofib117KPuHALX3wx/KbztuY15GR+O/1sYrl8LF7NixJ1by6Ps3Ebb2CbNN+3bT23b5GjbuY8wLW5k7mhci1uWP6y1PHStq2unzVjmw6aua2+/rl99K332+qOw94Q+N7Bfw7f6kfT3ubC92llE/RrXMS3Ucfm0HzZ6JcdRb5kstZ+WSbbR3nmNdWM9uzk5X/9f4RfC5reNxOcZ9Zy/HHYOUUbjXKrLCR2tbS2LpT71I0dqfeVYdz/rnc96Pe52Tu1nbMdm7Zvflutjf/pJ2D7sMzzvCbetu3afCT8WfilsTeHafjY+Q/zGeXTcmBdaj1/73cj2aV7bqFivn/36q+E/C78Q3ja/mJd5iM9z/m/hPrdRN9hUj0vF9mhTN/q1brS1/dq35bH+k6jLhfVZU3PVupbr3zXVbtTbDxv2WR1cW2vr7zOx8Tye4kLWD/b/Jgzbvwi/Ee7rtL5Q42j5/WxLo6Fdy5Xth6zeMfjUVv/a2Ovnef18GLafD5vrtnb8sef2p+G3wuZ3ErX/yrVf+xvta98xztHvY9e9CZk0MzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDMwMzAzMDNwf2bgxAsVb/3+bb5ds7vrC0OTZgY+0gy4cPy73/3uMubf/u3fugR076mnnjp45plnXEi+YDIX9h7m8tPdXCDp95oPc1HkYS593ItNPfbFSOW9XC65E958WSw2N01qv5OmLhp18WjuSz+Mup/7d2/J9Hkjl7DuRx5knIPnn3/+IG32c6njQS7vPXzxxRf7RTB9z2clSZh0PANvvPHGjguaA80FK8HWQsFjEHd9/+Bgdz91N2O8HpztMmbfvR55LXY/LqjdBrtD73584p1cJP1yLlT9fdrfTLsr4UuHabt75sy7ke/qJ98E9cNC/K+l/lrGvhaYL5ekp36hXIa9/8orrxyK9dlnnz28fPnyzje+8Y3DPG/DkFN9ADLQPW2ZavbJ5TLqT3/ab4D8gS5durSbi6IXLAdAy1ki+M09uHs72Rs5LnXB22H2bXuwH4nwxeSTvrirDTpIm/3g+mow+G70q9mi393d2b2cAwk8vxufdzPGcjF6ytc8Oy7cje/y7GTPvhH7vn5y8bD+bOj2+8Of/OQnO3lNmbheUv2J/bP5sYSLFy/uvfDCC7uvvfYaDO7mIua94HQv+DmTskupzwQrLlU/F4y4UPp8sLTRU+fCdBdKn49+PvU27nPB2Nn07SL2u0pixt8Jrm9kLPvxlfS74Dlj2KPfDcYv50UAtl0ifTV+G1wnRpdQO6sU18s5xH79T//0T8vrzF0FM51PVQZclvzDH/5w1+Xgw367+/rrr+9lP9zLPrp75cqVveCCvhcsnYdfuHWx+hE2L+R8+nDswe1eLlDffQR+g/fHAvH8OMRBLwV7PP4uV/eDEQ9H94MRu3kmdrKv33Ve7K3hGxnHfuwckr378N3ctx19J/v2ob28l6NH7ua8s3s9cS57dubgDLSf1xVn7cM8r4dPPPHE8lr0Z3/2Z8p3HdNs8MfPQNZsL5dZ7eZCdWfUDb/66qt7b7311t7Xvva1vZwrz2ad93Lhvc1yL/g6kzXOFrrQ2WAG4PzQ1NngwA99YHvyI8Hnokc+Gtwv54e8YXs0++TjGftcun0sEoa1J59I2RnD4cTzkZhOOkLH687IgeZqtt1gec+Prdiz7dceRuXlfJ14ryR+ZxE/oIVv5H3qzTyz+87XKWcaB4fPPffcwikfO2ulPOmjycCYd7rzQn8Qrbpy2Y/e0UnYgmMSNtlhr3Y6v/qo16d6drq69smuTfvpj/fo2w9U8fNjPf2xKvVs294TxnxX5AexnEOWM8iRXHAdHa7Vlb0XhelKbX3mseA6sjklq0eddI8y0PUmYYWsXszCUvEEI9Xtr2seccoXJvWnLxJ1LUnrbB+05qO95ZgXah8jzvVtvDJsYzHBNV0dP+0+DDXWbbjuvq0Ojsnu1ZWd43pehz/4wQ98/riT17oPE9+D1NZaIHKdz6Vi9Qd2ij3r8UbYa/pnBnvUrdRnQmXHg1nYtlfRPQ/6te72ua55pbWni7X7WtQNweZJuNa3vRmm4ZleXIvhXuB6OYekL7F3z+5clOll8zDvyuZgPa9ljVxIOnEd8OVNSyhpO7bHFU/FhXWwnmRZfu0p1rp7iz1tORtG0mGk+/CHwYNnRD/6KLb0bVwSBuhYXMVB4ydH0g/2DOmv+7Ux9AfHWHncrzt2zB+Y5La4LqZ7BinOi+nOq8+reWkL08W1/pYFjER0+Rpt7A8yNUeVxYVcyql1pTfP8g4TsGCN1MMzTBQzyh8WD9Zp7BMmjQl3fZZg2t5aXJPj+qe4Ie31KS7x4/Z1J7gudtLsrknb4ro43oZr85Hf5nrcr7suZNcq6kafuJaNP1BzVNn8WYeRYUaei2v4gLvuezBeXMPLvcQ13Fk30tqT3dfgelz/7mnkSNtw7fkoi9l8sD7xvXg+082CPbkUe3EtX8V2dfV4G66tj7VZ4zqmSUMGmp/miuxeZw26V5NyDafNe/dr61Jc02EPtvEfg4ylb7LPGdkYxW0eZJ/TqAv1DNI+zMfzUewq67v4j3rPSUxi9UwW36RyuTkesd3n1rysUedWrJOlw5y1x3Lt95M89O8U3/rWtxpz5wlfxal1qm7d6HLLhyyGyeatNjmWb2uvrbUvhoqLmJa+yEkfLAOwCrvNd7E9rk/ri3ESd936PHetYWHNMW1sO8HO4fe//32200bbnkvzgmV18gWPdPbOUy7YYbsYpo/7Nbu81YeOSHlH9jtl/doHjTvp/TNgLWB25OaVtJfIMb3YpnetyJH1h61f9a51TMv6kOiY3WcIt8yn6q+Y4G4k8yrRi3E63+K3uvyMGC8+5UhO+ZHyiuhyrr8R1/ZvzL99GlvffwwyjvkbY3yexG0Oa+KP+FZfDB/Bn+4XclY8jphtrovdsU6+R9a+/bEr61cu2KtHXebZsvqR1Z9WEudI67jNqetPN29EFgvNET8YbB1/edMn/MqfNuprh2N2pC086QfuXTLLz0VDJ+GoduccpK/OiezzRjduSRy49urqxS2O9sOGjDUym/7NQfvWdcxKdXQSkfrHtUXdSmKQi7fD3huKrSw32JybU3rtJDvWpnWkcutI4+D23XJMCymj5nsp+Nw71LrFdhr+5DVk+Q+UiWWMd4yzOlnu3JubSn1YP3miWzc5tHZky+qV+ZBdf5KPeq+jb4bRZ8NjfIvx6A87XLlwhn4pLJ7GXdy0zAezY2ORbaOuetvEtFDbKdCRtsVs61tWx1Z7y+bo39r7eUnUE0ks8CwXnnNl3BzZ0r1eAABAAElEQVQW12xyibfhml2bk3jsdz3vE8tw7XsU9wGNczDXrh972TTo6pF1bB1b6+jyqY9imt7c0rW1Dqj40sZ7/FcYQy+Etd9G2tirPx/Wl/X3fyX0gdonXT0SHzL+Om52Nu1IPqg6O1vtyvolUcv1qX8lu7l4Dv0fbPi+HcmVS7J/HTY3cZhbubkcpTq5x+zV2Ue/6q3Xd/VKtnLUhZQX+s53vlP11Mn8u2HXqLGJu7a13jmS5o6sGV0bsj7NTaU88imW2zdc0xFf+bdH/SrM1+fBPhveRurte38ahhfrb1/rWV5sqGMZn96Y6Y0v6kLrcu2k9rj9dj61t059dbJE9/rymfCz4b7ORN1KcuYM8u9hz/kYb3FJNm/FLlm99Z3XNqnfcutbTtWmrjq5c5pxvQR4/I/5yD9Zoptv16o6WYyoU0bNyVge28g10lb+6wen6uD6Z2F1L4Zhdxvxt+f9ZVgfPw/DQT8L7zzWcxnn0ViLVWX126g+rW8/tZO4drJcH7j+ctilqs+Fbzee+bu88cdhl93xNU8sT2X26uSI6dHetm1fqX37jrpZv7WufL+S+ZXo1gV17qMuL+qbE2tX25gz9q4r2TFIeS+psybOEi+F1f912Gv2NoLrJ8L/8ajyR5Fw4LkoNT59V2+M+h+5bRpry6NsPtjo7VeZ3ra18xkZrv88DNPPH9VFbCW5MJ8fhl8Pi7ss7urFbsuVax9lVPso6evy4vwA/mkerGHz0nVvuTmW+647XT1f9SW6tXQ2+UmY/1+F7W2jX4pLe2cPmP/fw3z/exgOPBdojKXY6rjqPReNU7m0Hqv29tEy2TEqxVG/2vh1XDF/PQzXXwzzV7cmducprz//HHYOEVfjpctjbc1p+yLVtb6y7d9PpulC5tA+j0y3RM4hJ9Ydczw9hc5jvS6NcJxP88NWe2X7qY/cdh3p9Rslu881fhqGAeeQZ8Psa1Lv/7La09XDtddr7fWJRknf1g98l8TaNrVVin1NfDtP+sijb/u1X5sTXH8h3GdrPaayZ9z7Ra9DvzkqRyzjmYc+Rznqjam2lrVf29S1njT2WE5xU6Yv5L3ZKf13mYZ4J7LzXftus49rpL4+1Sv5yXHx0nbOEf8/e/faZNlxnQe6qrobjStxBwgCJEEKEihKtuzhjCdi/EH+E/bfsfV3rK/+NBETpCYmLNljypItgiIJQrgQAAEQd/S96pTfZ1e9xezTp7pxR1UjV8Q6a+XKlbkzV757nTyn6ux8Mex772fDj4W1GYkvTMC1/bXyfw/73Og7hFL7HNv33mod3+P09rPuU7t2Y1v2zoe+Xude/KNw9yHKxrbupywHu0/tr30m7ndHURdqHBXEEaPOtZKtWG5968Y+1H2dSSy6DsfpjU/rSdR26/ro5/vr34R9F/L9MAx0zaIeEfz4X2fY1+/fhb1vb8rXvX6qN45hrOfzccl1y2ObcZ61u4Z78Q8O2f4arjeR9vYh7nHvXXAtf4+kv467esv1G+3rdXxGm2s2zvS25XeqyfvKhu/+PsmcGqeuK1ldP5t0bWoX10th77sPhr8T9tmw/UZdiD9cq/uTQwnX8rW/0SE+7XdsXxuf2kcb+3qZ7Tja5Ftb+yfZjPm74e+FvxW2LzmO4No9/lL4jfAmXMe8UK+jMOoHtQevrj/W0ccyr/Uy24mg4xLAiRjcHMSMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCni8Bt8EPZTzfx2epERCAPr/ODNj/6QsuPq3JI5P5vfvObVQ4738tBi6scVOogVD+8c7akwyId5utg310HpPq1t7JDf3WiSOZwVAecLj/iymGNW/qKW85KP6K9HNi4ytGUpEOkHbK7yuGVe7n2cuBuDl5dpW7pI2Pdf+655/ZzeOuJ/RGYeU/6aiLwwAMPwOh+DiKHsb277rorsNvbiWm1vw97q92cvXvVwaFGGLvDzc/mkOh3gjkPv/EDZT/YBHawXnCX8i9Tfuf9999/M+fuXg6G3TM5LH3/ozhcC9gvxvZB8O1A3gu59oXol9P3pfCV1F0LXw2mr+V+2c1hrStjy6G7e7lHVs8884z+HFSwyOiTvoYReOWVV7Zy0Pk48+3gZCuYG23R97aSTgO1/ZWcCY+A/uSTTz4cfD0c+5Oxn4/jko/XGo9FP7C/koOgL+QaH6QfP+b9aG+1ei/tYdqPlT8Ini8Fzx/mIOGLkX78DNtXwu6jqzl496rzqIPl3RyWvff00097kAMsT1wnCLcrBWfbOVxiwVgO7Nx++OGHtx1Gnfy7k0PVd4IV+4SF8x5+7sxqdS4J+Fywci5tc6D02XOB7fnwnfG7M+4w66D08ykvHPyfu/fee5c9h+uFbhrO+CwHC8ZpP9eEUQ+ScCD6++n3/ciPIj+IxB/iXP9iGMbl9gXXSdlX7777/uVQ6fjvZl6rf/2v//WC69dee231ox/9qO8Ncy9y0xU52ZWHh+oAFd5JLjwDx8HB2bw/nwsmHKgOo+eClaTXs3cFD/ekfEewdl/q7ov9fPT7c964DQjcPri/v/dA7HD9UPp9IG08DJa/frazL7YfjukT037un8vJxfK1B7W9l2t6aI59x4LrbLGD8a2PMtYLudSl2C9HLrjO/WAvci3z3JWzc58ue5DcK6vsb1aJx8T1J16SL6/B4cGxC1Zz1QW3wdGSb1Pe+eY3vwlUPn95HoWHd5zL56s7s+53BQ9n4Dc2D3BVd3fa3hN8LHrKix6fe4NvD5pKjt65N9i5OxiDd/p99Ei+96Tetc6kbCyhQ3FQ+CSvcOfBKMuDf/IR0t5jyddsuSa7B119lLF5mI58bS+y7EEO5bW8X3gICY7bXvcg3Vd7A5n5OsH5kmgEA5yUi1GyOCU9AM0egC5f4uoeEMWfjR87HPOvHY7p7WPUXZu9belj/x5crM/atdXms9KIa/l6wXUkLMN0ca2sHrbtw90LsG3zX4brYnrZixweDDdxncB8QQTDcFA8wAhecmskPMGRvAqjD4afDH8r/FCYLwxYX+tHZ9Mf7j1CHuWp6NaXb9ebXm6bmI7uKeNpv71HmteLe/beg9p+FjI++DQv+w84riyuSZ8x4Xr53BhZXI/YXvJ16hZMR9pfLzzzdaJxPMHDiIXiY5RaKxdblewl+cWDn+EHhmEZdjaR643XpMOUttr0WvKpfq2zta8ut9G75mNOi/mIitP2614pjt1zzf29/+p/1MGnVI7DtbzdnE3iW+FaX+XGfeU77InrROZ6Km7EqxiDDWxt5Y3mS2XrTsJH9dpjWvpgR32fPyh9sldjcV19dG9QLHuvNi7l7kU/Ca6NHY+4du81f7O7tnl9VoK/Tfkarm+Vr8ec3flZJ32ODNfKX2tyb/sb1b//9/9eLKwdCUekuImhdRVX9c21bKNu/cf82n5gRv4rNqN+Ymrb4hruimt5rWsO18Y75mzjwCOZBy6mR1ybk/G6Fp00V2PAn4WMY8T1uB9pnibtQ3D3Idrg3r/H4Xp5L524zkJ9Mlxb12K5GC/mNuE67ov/Z8W1fmCruHYta2uti+vm62JaPYalZb0jS8W1uegXrr2v6PfLwDXM2ldvwnUxTS7fiUTCc+9d8+sc1/P1xHWC08/PUZEYWW+yLH7Na8UCHIgfPMMDnQ0maleGJz4wjeifF+mr/bkWTLpOx70uU3Udtb3xa092furoXySJU+/J9e9E4NmeZMzb8N18Dd/u1xHb4z3c+zguC7nWqaZ8L29O1qRr3jJprbuefMSia0laXzHjY5271uxyWO0wVF2uRMr64KfdpE8WAdjDsArDZfEd9e5Lxvw96sU6ab2Ld33Te78X60f3wFtvvXWS/2eq8YEzunGPurkhWC3OR8yLR3EpP/DTj+8Z6HzhGoa1p/Onk7j3S/clrj/pxgh0fcRLfJuTSfiFV3ZsLWqjY3Zt6XzpeB3TXV9rRMeoWFkK/d+DpXDyXjrWYqnlys4JLusjFsWpmNARHZaRuLHrB5ZHvLPrF6arq9e/PpB2bPbH7T/q50qdz9ipMZ0UEoNiUFzgFzbpxfC6vViuj/Z0EhfXbHCL2YrhUVa3VsYiXuRpoY614zaP4q02sqweo8aFDhPipT86f8SmP3ZYpWtXLNPZ+NP5+f66n/n6t8L2l6rrSFu53v3TPNTxqUOk6+m71+ZjnGyIHOe2GA9fOneyY61tvAa919K0Zb6ub5ydd9RjyTjM5bWwvXNxyVackjDZ/Dxils63WFbmb+5tR8fqSNcUgzEOLY8yLltb+d8FtpNIHVel2CNlc1SmY/PuOo66mNRvXMPGS13xHnVZU36o/tX5aoetp89B2vrbYvfrUY+o49HPA2GfA2FAXusa8kHFa+dTjHct+XTebJvIdfTX8Vdveaxf15Xdp/7P2neO432f4nXUcfh8+EL4nXD3EM3Xxat5FvObdLbarZW5FceNNVuZrXql8dxAh7jeWHeD85ds8J0dymW7/uM46eZmTcj6kOXGJqbr1rzryk5vWYy11fdor95YvpR66wrPj4VhQruRlOETPxH2z9FvhR1SKld1zK6Fe92oR2vXOrbqlWylXrvzYGfruOktV6/kY4z+Z+rxsHF6b1G/iVzf2M3jH8Leu9yr8AjDYj5itTm89SPm2fhqUzzru+tGtkxi1x9pjMeojz4nSj8G152XOYr9KI1fuSQufLQhrSGqXrsybjxHn+rq9Y1fCBfX344ux7XvqAvxl/fw98MPh38T/m3Y9wL64YPo2htP9aiL3vmSI7ctG70c9UivrdI16B1rdfcnPD8dfjTsPq1P1OvI9Yzx7fB/DXvvMh+xK0ZJXCxXr+RbHFdX1m/L9JZ7zXH+6lqOerTGbKeBjFP8O97q5oXEnz6+d9fGXj/txE4dVtaGVEat77XYRx99sclT8El/NrzpO239Ftd/Gv1b4RfDL4R9p+sa5Y6hZdfpfDqWmJa5jGW2kj4wqjS+db1+lXzkZ/upPw5/Nwznrr+JXN/45Om/Cr8ZlpOLR/XiiNlgmWx97bXpq3WVvUYlH6y8zjEtNvI0kXl0bcZxsyPzRfVR7pqRYmXtGhdldjZ9kBiNce11yer64Pv34VfD+vmz8L1hpFxqvzDyv4WfCv8y/POwXN9+ox6Nja6dOtQxH5Sub8NWP9cdr11dX9XJlum1sxmj9xPj/KOwz49sm8g1jcue6v8Oew/qvkr81BXX9MZ03V58s9dvk17bGK+b6enuVJA5dA3GAY9zY1cuVReTUVfumlrPxozOzxrQEZ1v23fN2H4WlqfU/cuwvSkax0mXB72n85GvfxWW6+1NtW3f5Hit0V49Lot/x6o8Uq89yur86J0bvXUkDD8Shms5274Ktsdrp7gQm7j5vFhc21/Xrk6sMBv8tm7EcnV1re96tG3L9TlOpouF1J8KOtxjdw065k3jr89YRx/trRMv9vJYFlPr3zpt2o6N/o9huOYLC3CtbiRlePFdyI/CT4Xh+n+E/S9F+2z/4/VSvdT3emN5/TrqSut1xbH69l+9kt1+6aHwvwrL1/ZVsN0xRj0iNvEyh/8n/HJ4xHXr25YvvfaWK2sXS1Tf6ovx0L5ua92pk8fgepxf11I8SrWJXfeJY7zYkXWvXZvq6osJujrc2D8f3ecme8fjcK29a8P2Pw9/M/xCGK7lunG8KR7dF+wdy2inr7dhK2mzTuu2ltclXPf+6+cF2N5EjZG91E/Cr4R9bqx9lI1zx9069urrdbXH5YiMd2xzVBFlk/9YfyL1W+C669PYtNy5sI+2xoCtuN3k0/YkLPMf+eWU5Sv7SnsN+br9RV2IP7yo895u//pS2D6k+ZrPx6H6dZ43a1PfTT5j3ai7974Rdv/J18ZsH7KJGq/XUvk/w2IhX6OOjxxxqDzWtTzKth/92FBtB6Xfv5rDcXW/9zp9mjmN62MGta3Pd92vs63fGKPq5Kjzxa+HrRvMPx32uXETruEF7r8flv9eDPucZX+t/dh3ikc0junI+Dkorleit2zs9v/fDj8dhnHj3kTG7X3I50b7sVfD/h7TMTdGMS1Uu8Jx+qa60Xe9XvlEkQQ2aUZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBG4POMwPIjq8MH4W/lYNF97AI5AHXrnXfe2clBivsOLM0B5vs5jHc/By/uXbx4cceBkjn02RmQDkw9+vFbfoi6/KiMyCGjy0nV9PS7Sj/6ztmRKwegk/sOakzzlcPQc4j7Km1WudbKOH74wx/2x5FbDk5ysMrnOfnZ1+0TgRzcuxVc7sMUAq7QXrC3F3zl4NuzsHMtuL2aA1EdaOJg3LMOvk39C/fcc48fHvvR+iOxw7AHgHwQfP4yPhfS5dX4XYncTb9Xcx98FLerKftxsx+sq7sYvpQ2V8+dOxdIX1kO3A2WtVk498DeBx98sOD96aefPsJ32k/6Gkfg29/+9tarr766kwN7b4hC8LodvG0Fu062DcRyxHTyZvC35M7gcjd1HpDzcGwe6LOJ4B+uyUvp4v0c1u6AaA+3Ds53r+bgXZh2MPrF2C+k34vp92Kuvxy469DdtLuccny3r6ZuN4dJr7wn3H333StjSl/lmasTjNuUtv/iL/5i+8///M+PphcsbL/99tvbOVTcQXBwtm1/EEzsnD9/fpH5NbzDoneCn0Bm+0ywdDbK2WDtbPwctu6H5duPPvro8sP5lD0MZ7EddHl0uY3Koc+uvJu+L6b8ERlecJ1GDkXPAekrD2JYsJxxX8Kx+xG7DU3eH87K1W60vXfffXd13333+aH/guvcMxPXCcZppuwrYXf7pz/96XYOm91+/fXXdy5cuHDmmWee2cr6nsn+82z2ugtWsx+9I/g9F3w6+Px8cHFncHE+fFf0e+jBD+nB83Kvh4I4KJ1fHgyxf28ewXxHtsvn7r77nnSxbe/xacJnY7MbvhSMwrX8/FE6cii6/QcO5s9c3NnZvwzTfDOXy/YiKcvZu9H3YDvvMwueH3/88QXbL7744sT1p1mVr64NEO088sgjPnthedJzKOhns+c8nzU+m00sTGJ1dwUr9yTnngvfExx4cIlcG4zu3xc8LXokDMO7eg8uuSP19yqHz0Zf+oueKnD+VHjWFsGhvXbztFy94Do2uXrBtfqM3V5l2YtEXs69ac99LfPcvXTp0uquu+46ytNw/fzzz+/nnp64TrC+TMqabOc7hZ0cXOaywLHOsFq8Vtr4YhgcMVsMLvhNXfcEcMmv/qS+2Nt/ca/sQU361w9dXe303kfqPw8qrmEWho8wfagf4Tple4+Rfab0MDj3hX7gGo5Hfd/hXtmHxTzpc47AiFe4UC4+ii14gxUSruTMZw7525Fwqp1161rDgjVtH+2bH+Lbda605nREr6+y9voyjnLvI2U4J+sX9TOTsVwNm0sxbX7FuL31sr+OhGl+xTZca3uUp6Ob08j7f/mXf+nAmJgnrUcg741Jr4XDES5GTGjCoTyWq4/xpluTD8Me6vVI2APA1vuM6aYEY6hYg0P3AIZ5DAfNa8pwgFEn5br6wMU0qT/3Gv6icG1szdfisY7vYrt4HrHdeTW2N2AcrnMwuO+x0/WkQyxb92KnmB1j2HxJijGsiv86FmCk7+l9X4el4ql6TJ+Y2hYGXQf+sLEY1/h+rYxvhusxZ+tnfS69h1L1mUlMjRN2m6Mr4ZvefF08V47zsiYjpkc9VUf3L/1rTbm/V7nPN2FazNhJmIJnMaYXV+rhwT6WjuEOreOaj/XV/tPQiGt9uw42Luw+K56Vu+a9T2O67v4y7mK7fbF9Ufkarpuvm6tJuRuui+1N+br3rjmZI3ybV+eoPGmIwIDrrj/ZvFAMawEDxTW9eRnG7QeKa7jQTple8l2avj8PXLtmsQjD1hpmRlx3Dp1Xqo/GZQybcN37VZ3xm+fnQcZgnMZYLI/YLq7J5ulKOO8cOydSn+u4Zvs60/7w/UTXXYysN4mRdRVT0prDNV2svW9ae/Z+h1C86Yde7Hxe+EiXN5Br4Y7FfLrum9aZL2qbsXxQ88W9Gk/xPe5JYLzYhueyeJflbG2tTe/fMXffMOfP+N1kLnNiSNyskzkia42U17n4FZsRv2I3Ylk8i2nx1ie8ypfaYTpS12suhvlyywhYM2shzvJFMd39SCV88yGtDx3TrWHxrmytlUn9l1tWx7bQCT541/g6driuvoz7sDzi2rz4NRb8qrOLFyzTxQnTxRSm9U8vnmvXh3awDe/0SZsj0LjCMewWs9VJcS1+6W0zyuburm/XsRjeJGtLl1tbee9WPsnUe7DjhK9inA02Oyd2ujiwky03VsU1LNPFGF752TvT9QPf4s7umny1gev6k+1H/deFxAQXi2JbvVgudltWP9robdPcXPyOZbauY9fXtUcM1E6WRr22kyg7j+JnLNPNFcGaOCA2ujakeCESHknx7b0Cy8qwK+Z80OjDV97R9s3w42F78eb5qDeQ62vHh96xVho/eyV776/Oc5Spvo60RSR2LUSu1+l3rO99yk6vf9SNZBy+77CX/iAsTo1jcSpeuHWjvTZtRrY+XSNSDHDtLbs+nURjubbaF4eT9uIzwtrfVMyna9L5GLa1aFl942GtGo/Kxq7rK850NK6tfmofscLmfdb1Xjn0udnBLHE5yvP6hB33BVxYVzT2r99ii44RaQ4ts5XqT34cbgxJ71H9H6n+jb79HiffTkUZfsW02CWLa/Mb7SOOR7047tqoq63r1lg0BuvlNDk95P8D8l10B2xOxdo4L2uprrJ646S9NVTm05i1XuwRH/2TYku6DtIOscE1+lWY/yPhfhcY9QaSz7uHkbPlOTnP+utf3+O8lHvtXr8yVUdjqq1jI8v82k9tJGrZNWH5wbB70+8H+h4V9Vj6bWreCL8etldrHCvFs7hlK7ZrG6X6Mjvd+mHzW2d2tG5v+aD25L8ar3UgUWX11nVexXRjM5bFjH/rlMUShtiL6aiLTV2vXx9+ci37P4Tl3yfC8KFuE8E1P5ih/y4s38nb2pSjLnrn0v6UUe0Hpetf68va/siOe90uBsYEz/ZSsP3NsPvzZqTP34RfDb8chmvjKlbFFI7JcuvI0Vad1Icx0bs+nbdy9ahHxLbOR5WnWDEnc7Z2pc5TuXrjRFoXsbOmyvTiVz+Ncf1iOmpT3fey/H4a9v94T4b9HUebTcRHPezL1/IdXMvZSLu27RiXirwoI3MxPrJEb7tRjjpf5caoddqKATx/LyxXfzdsnJuo19L+F2Fz+HUYhtWJR7n4HePbulG2nlxnfbKRmzjmhdbraj+t0nzGNTKPcY7qlMUGNW7s1dnFuWu+jmvr0/3B6ONvDur+OizffT98s3x932G9fax8+HL4zbDDa5Ex6X8cP73XjLoQG6o8KP0+DpvK7ZvEJfP2/vFQ+Ifhh8N/FDbGTeSa7eO56PI1CdfiWbyu6+tlfqOtZbZ1ds2yuupRFzIettuNOk/rb97mWXyYq3r21m/SxbX40b7xqx7T0XryY5ev4fpvwjD7h2G47j0QdSHX58dHHpS34fqfwnD9Tlh/eH3c2rIjOqo8KB3/2vnwaB8de/swLu8d8vWfhuH6B2H3qTbi0rZRl2sry/EOxYbrn4XtQ5C4lbV1ncay9tpa33IlP1T/g9JBX3wQWX0xbCjf7v8HaP5dG7p4tUwWS7Wz4dG3/iNW4Fqe+tswHBTX1nxTzLsPkQvPhV8MvxW2F+k1K9v+OJkmt6RxrB2/RnT9YnM2Fnj+47DPviOuG5OYF9JGe33/PPxa+B/DxXX7jOmo/16rUp/VK0db226qY6svv3VS/3Wicb6NV/EsDrV1/etf2Vgp88G+D4Hr/xmGa+/f8vGmfK2dXP6dcHH9T9F/F4btYmV9TB1PXI6IbX1crdzk3zpyxLo+5Ey4lq/h2X6kuDYPGBpJG9dQ98swXJP97Ku+bfRdYseoen1HOdZv0tdtyl93alw3xeFmdfzXsaRsLb2Py1f2GHB9Z/i4fF1cy9uw9FL4nbB8jfRZ3N1sPPw+LWnb9q5h/Mbrvnw2DNfPhO8P81sfhzI7XL8Yhulfh8ViJH7F97pdXbl1ymi0H6cfeN44ttq/rlK8urZjDEb7uj76aYvlavnW9wLoD8P2zcUmW8kaq3syDPu+d3ghDNP2M73epnGl+gsh15RTjcv7zNPhp8K+73Ofju8dKS6kDbt74dUwTL8U9t6lrrSut0xu0je1q+042X6Oq//S7YIyaUZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBG4HONQB4Qt+9QonS6k4NR+4PE7RyeuHrnnXf2n3322ZwHubOfQ3C3HY4afZVDRLdzrqiDn3dyUOpWDv7d9MO368aZwxn3tYnUbj+H9OZsx9VyYHsOq1w9+OCDK4c45nDg5cdd0a/7kZcx5gCK62zXXWAWvpYRCHb2c7itQ9EWLMEUrAFX7H7kGEjtXuNDbq9WHpwA53DtYOrdN998c/db3/rWf0vx7jwM9PHwmTR3kHTOf37XAeh7seVA6O1rgbz+ruZyHvbmAYSXo3uQENty6G58r/FJf1dzSOlu5LXwroNKQ6uHHnpolXsBlheeB94lEpO2Hn74YaDsD4H3kwO3ghm2fTkTtqPvwVJwC8MOhHaoM+zdF9x5IARMtY8xqk4OvBafK2mb1P7Oe+lfEr4c2weBvPviQnw+DMOxQ6Yx/WLuHz/05Xs5Y7qS8eReOLML37lP9oJpbEwT12PUb0M978PbP/vZzxyift3sgoftAb9L3Z133rkd7CTtruwRdiJTPJvD1VdnkwrPxt+DEnaC4Z3Yz+WwdQdRe7iCH6bjW+4tgk+nUO8H1/s5yD2wvuRgaNj9MO2LaTn6Qvw+Sv8Xcr0L8c+B6dswfSV5+XLeS+Rs7xXXMu7djHUvh+yu8t6wYDoHxi+H7qafYjzqpNMUgWB359FHH912+NNzzz0nT24/8cQT2y+88MKyvw0WAoGdM4HC2eQ2WD2bfHdHbN687wwm7ozP+ci7gve7grHzwdHdqb8nugc8eHiJg9Lp99xxx3n+Z86fd576LaGcJjdS+rV3uZI9A1zDtBztwPQPMw54hm26B0rAtD3LlYz6yvnzO5dzn10N3u1Jdu+++24PNNnLvmb1+uuv72fu+4nDlsOkYy9HnXRSIpB1Hg9UN6wFt5EARSfPBh/Jq9tnw+cDWQ/QOZfd73kQjo7vSZ09Av3e4ObeYIbuoR/yrjYedHNfOr0j12W3J2Zf8B19J+w6MX0uZN+x5OvIJV8fSvqC60N8228ve5DIK7k3tcFXM2+5esF16o72IM8880zxPA9KT2C+DJJf83lmezjAe8QqnGLv+WXPTsEwBouk3ImV7QHkVD6wq7zgMZIPO5uH2VQnsfZ41F2/9uW+SdlYPjdApy/ksyFsLxge5BGuD21wjT0gqqyd9h40VFz7LHuE7ejyNnxP+nwjUByQ8FFZjIz4La5gz4Od/jj8nbCH4Fmb9gW/1tT6ymFIXfusH/tRzhp0dmuPuuYdV8djLL2nRjn2vXTwGV5cGy7hdROul71J6pZ9SGTz9YjrYhqu8XWYTnniOkG4BY3YKl7Wm7CLbfMGWWZvHZt1sK7vheVW+JFrPw12tCk2oy79uYbxeMBf15xk7/pHXahtSeP4snFdDBffLX+QsbDBdHHde1rssDmVO69lfX7yk5/4vEGfdGMEGhdS3OQ0UiyLA3mjeBB3uGj+rV0ebj6ka4vry++zUMeiH2wfYczGViyPeueV6qN7YuxjxLZxK6v/vKhja74uhovpYpzkM+JajPF6vu69rO/OrzKmSUMEGhdYxsg6wzUSW3mjmIAnOhxYI22U2dGIOX3L1cW7+s9CxTTp3nFt+frj4NoYO472U2x/GbjehGe24/L1iGvz6xzNWVy7bqMe86QhAmIjXhit41qMiwt5hV5saasMZ0jb5lJ13YPw/yzUa+oHHrvOPi9WX8/XHZu25bYf5ReJa/vn5uZiu3iuXN+HNF/LJ2PO7hqZF0aVB6Wv2Wu+u8rXRkchoIiRta4OG2KI5Gp611t8YUn8YZYdLnwXUbzBL71tWqf8RVMx+2Vc65PORXzFUuyKYzjHMN/PjTfbi2iPrdHGvXbsrjNyiqeX4PXHP/7xfv5mYU4IXju/3t+1iYu1VxYf2CyeYbeYhWFl9fAqf9CxumK5ew9lOJ708SJgfcS93/lUwn5zNWkN8KjDN1vxTeprZOur7Dp0RFZfDHkpTlo+MdLfEIJrh7kbU8fZ+cBbbeakbL5iQV8vNy+kaokd3PJpbPUl9rBO7x6j9wjMs8O/dpN+HwFxEaditd/nKY96cV0/8mZY7ppZV2vsOmRxrYzY8EitG20nQofrYX9hTMba8ZoHfHVO4gp7yuZdXIsNUk/XHmZrF1tYZRf36s3v+tIvO9KO3tzONtYr384kTmIinuIlHrhYZWuOLtbZ1jHcdqNsv13DSnas7PrlqAupYxtpvTzWfaX64b7Z+JofO1ayujG2TDYW7KMuxt2jjhgX12JZ7EcfZTFz/frAcPc770Z3j/je4uFwsR/1Our4ey8YV++7cewasXcMreO/TupQ+z4oXd++de2TxMZZafwdF9vNyDXtmR0mYs9cXItnMUyy48ZZHFtfHCuP3LUqfskRr+px5x31unUf7epOMhkrXo937aPs2pPFnbhYQzYxLF7I4nPENV+sXz7qen12RKqzbm+G5XX6Y2EYOY7Mwfcb2tqv85XXus7GWuoYlDtHesdARx3bQeng1XUar1FW79xd39j9PcnfQfVdn6gbSRx9Pnwt7HBV8zZ+sSXNoXqx3HLnqVzmr8+2Y6+NvXXVG4vKuCzUMlka9dpOjDz8bYd4d5xky6ONbv7WjeRDZxcr60aykxixiydSB++IjnuNrjubfq3pq2EYpT8V7veBUW8g7f1vkv77fyAwoi02nl5L/yW2csdTuT5PbdQhctQXY170bQzG7T7zt37vNd13RT2WjBGeXwjL2cZdLJLlTRhe99NX/ekjs5vbJm4sRslP+YgOf29zVD5lyjg3Qx/L63pjJH7WVuzQiHf2Ymr04csPwYo6a/pSGDZ83vyDsP3IcaS9Q+Xgx/89y5EOvZOzvae7RrFYPMa0zMnYR1I/ruNYpncO622U1cvVzdPeZ54Mw7kx6pfPJjJG/zvwXNh7Vd9vRkzCND+SnV5uefTfpHftumbKI3ZHPVXX1SmftoN3x7UcdVNpmdykN0Z8rbt4Wj92cdeGvfhl59O+uuYxLX7eZ18Iy3W+r30mLB8fR/p+JCxXkr8Ny/f2q+4L/RlPOepCHaP2HQsbHdNHUua7TmNb7yvG6t76dviPwrCON/UZ83Id8XAv/u2h7P3YWKnHI45rG2X9+VUny3zpxkIncW0tx7SQ8qmite9EjH99HTufzo00fzSuP5sYwSe9PqM+YoJv20c9wjub9bcmz4dhFK5/EJaPN5Exwdo3wzD1ePg34X8K24vAh/yvb0RW1xaj2uibbOyofqPkb67GYQzGCtvfC/+LsPcRzK/toh4Rm5jYf/x1+K2weYsDe9k11vURv/rvWBr7dRmXheq7Xh7to16/Ey8/Aa7X59L5ihm9eOZnjdhR14tP7da+seaD1CFSvbX6ddj+VL59NvxoGOmrxL/X/1Z07/fe++Fae/8zBNfe08drpLiU1/tiL3XMLZP66DXbH3vna+zw633G7w++F/7fw7Dufq3f2DbmJX72FsX1G9Hdk2zG0XjBNL1yXVce/duOrfbqm8pjXZrc9tT5WreSmKHa+HTN6y/+3XvURmrLt9yyvrB2L4a9J8OkfYg8vIn0p418Ddf8Xg3L9z6HuS/WcV1cdbwtx/WI9LvJvsk2zgmG3Y/ytXH/y7BxNV9v6leM3Mvy9H8Jw7V7Uhz4jzxitXplx6E8tknx6J6qna06WRp1tvXy8jvMOp9yOc5tXFd2DFejD11s+VYffdQpl8a2bfNKKv8+bG/8vTDcjn4pHvWvjXwOU/Yur4XhGjZgGrb5ILJ6+6usfXE85mVsX5fiSB38es+Qr78f/rOwz7/sCFbXrwPX7HD90/Bvw8V11GXexthxuh7qddnp6+W2qV2b2ka9/bLdkvzt45ZOp8fBXKxH57RJ73qt+3aWY5vayLFd8f967D8LW5OnwnC9idQj7/3/LAzX8t2vwyOuex/1WqleqPNp+ePKsR99wKVrnA0bg+9Evh2Ga9/l9HNjYxPTEcG1+8/n3L8Lv3Sod27alKMe6aONvVQ7+XFp3Xe9fNTPbYbro3ltUMSg61y9krv1UY9HO32d+MjRci6CE7j2vr5OvSZc2H/IkfCkre/Kug/xHo86hoPSweumMYz163qvWXvbmyNcG4t9yENh+P5B2JjMA9X/oHTwqo05+yzw8/DL4Y/CxXXU69rpo/0cp2uD6ndQur68Xlef6+RXjeMG7rpBzcKMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMBniUAO7FuFPbC2Pxoj93N44iqHoG7nQF0HrC+H+OagxS2H/OLYVjmYcdsh1TkAtW2PHYofaMXfodb7b7/99tZ99923/HDswQcfdCLwynVyvf0f/vCH7Os/+lp91T/wOnZis+Irj0DOtXVAbs4AXe3ngNtVDgcNJPccjg5H1xxYrj6H4J6J3Mkp1B4KAr/aODD12muvveZQ8500eSllP3bcTh/LD41hj09+F5yL7GjnoGgHo+vHj30vpky/wp5+FnvwfCXt9pRz7b2UV8H93s9//vP9xx57zNgW/nf/7t9Vj2nS1zECr7zyytb999+/Ci62f/e73x2FILiR+/aCU2DdC+b8UHgn2HSoc/C2/GDY6dIe+OBHvOtUbF2Lj4csXMxhz+9dunjx4s4hTmP343oPrrqYfv0g+XJysh/3fpDrXQ6m/ej3UvL/1div3nPPPVfjd+3KlSvLwdLJ4XsPPfTQ3osvvrj/9NNP93r7E9eJ2teIgsedjz76aMd56Xk/T9o7I3+Gr+0k/S4HRwdL0m+gd0fsUmlOW49fMHR/pB+lfy/sh+lL7o28FcnN7om9Dz744HJy7ILZ4JZ8O3YHonsQlAdUXoB1HPzC9IVIuL6SscvpVzOGBePvvffeclj6U089tZc9y8rhjT/60Y8WTvtiPF1MOi0RcDj1n//5nx/hKji1b104+Ws7KTHLf8Ye4Uxy3Jlg42z0s+fPn5df70juuyP4ujMu51O+K/LuYOzO6A5Sv3d7eyt1Z++JnwdNst+t7eE1Pk2Y4Gwl72ZPA8/2HHD8brB6Iddc9EgPG5G3YVsOh/OLV6/uXlmtzlw7e3bnatrJ1Vdzj+x+4xvfyLR2V8nfqxzWvf/9739/Pwd2u49cb9IJikDWDT7PHB6SY2TwW9zS7VXx2TvvvPNM1tR+9o6s753B4bnwnfmAdleeaHM+eL0nuPGQEvX3pe6+9A/L96VusafsIcT3rfb374gvXN+d+jPhc6nbyQfFXN3lPxMtuE4PHiiSvce+PfR76fadSFhecE3PGOxNsJvzYsZ9KffCldyHyz4kdn3Yb+Pd7G1Wjz76aD9Dus7EdYLwZRCsJp9sJ5esXw5OR9wCUG0epoTlSQ8zo3t4mActKcul9rV0GO2Dxdj4ePYK6UF6dH50/bfP5f5IWd/L/XQoIz5XWvCWHg9xvTyETV6Ga/tp+ruHuj3JgutImLcfsQcvlq/DdewwfYTrxHkr72euN+mLi0DzbGUxC090eCt+4fGJcD+DaVPiC7dYfu1aRj26L+gjdW0rx7pRH8c2XnP0+ay6MXgoGmwunwsju6eGZziWs3Fxza+4HrFcndRn2TX2i2vfSU76WBEQN3iCMVI84bO6ss9HeMwt4o/lHDlTne8QrKe2+pA/yc9CvWf0oT/UMS9rfmC64fXLxjWsys9wKwbFdXM2XJfl6jFfN5aNbzEtjsscsy/Zl68nrhOR62nEgHhZ92KXpzIMivGICe2QuvYBa2KvfXW4107u7b5A+bPSacE1nMLwpnwN48U0ydd9ICeINzyP2L4B16mf++sEYQMVk6qKZ7gTQ3Glkz77IOViWZnOVz/2Gfqgt906rttW/Wehk45rcRC39XzdPXZztzxebHtfK661xXAthuSI68Z54jqB2UAfB9fiKocgeCx+lekjrht7uOvaaNN8zb+4j/qpqePQwSfZh/DvPfFZ7y19bSLzEwfzb76G334PMuZudvttthHX4l1cN47NO+Q6rl3za0v5PitfVxyFgCI+1rkxs9bK1qVYVobHkpzLv9gqrpXdA63rQ3/tP74oDKXrE0vii+HS+x38du9B776bVG7udi/AOF7fk4hvc4c4t9xFvZ3+Z2Q/3/8WS8VPyzBZ/K7jL1XLPkJstINXsWzbdfymavFrny23X9hXhycdHwHrIWawbt+BYbr7a2XrUHzzg+/KEevWrntxfRbn63qqjnBQ/aTvYfZ9LjbYQyqOYbUYhFVzZcP0YlA+YeMDm+JGh2vMl+QvbrVrV7IX0FZdvx+u1PfXmboe4tg8DIvFtXgXy+xjnlaHxbp6sUxidWTXmO5aZfbio5LtpB80Y6x4zJPGXQwXV7WZr7mX4FFZH3A5YlxZu2KWj7jz0cY11fd76Zbbh/aI3XV990fvmKLediRGsNY8Cr+YTQ6uDqd0fqO9uG4f7af4FveymPIjrYNrV2+ZbeQUD8r2pQonlf7iL/7CIarj8Dpe0vwQLJkzW/FbfBZnYgR3fMSTXXu4VkcvLunq+arH2rgGqp2PQzVg33Xtu/nq5zjih/npD/O3nnR1yDVQx3VQOv614+0ceLIhEuu7smO+2VjjvpCxiBH8vRG2by522VsHy+YgVnRzKpbp7Lj+jWntjYc548bE9Wsjx3LjVJnqTPKz/8/A0s8X9bIB172U+VkT8+k81bGLD6KLDera8qXDVXVxrq5OO5LNPqRYYcfsrkH/Tdj3Aeih8Oi/GNde5HXs7+fNZd6r4aR96h8j1ziO+BjnOhWrrSN7L5E+7/Zv8/3OZb2Psew6xucz4Kvht8LwWnyuY5Z9Hb+1sfNXLiuXxxg31rWNuDem1tPxQj/5yU+2h//Lqfmky87HWpVrM3ZzHe3iZS1Jdr6tb24d7TDR+yLq4q+9NRjjqD+YeCHsH571+80wzPDX5yaCJ/xIGE6w7xJ8vique52YFtI3XifX2USdX8dgTnzNV552Tz18KH1PeStybTh2//46DNvuyRGXxXHx2brmYuVimo9ycVrdvNWRraOXG4OWydqukyd9H7L2/V2mcTSP6uZm/Sq7purZxAexW1/zH33YlEf7erzqDxeIr35h5Jdh781s3w3DLD9tRmq5/+f0RCr9LcM9If95b7e+XdeoS58dlzLqWA9KN752rK1p2Zjch/iB8JPh+8P2TiN1nKPNGODY/1n/LPxi2HuM8RaTJNyKS3E7SjpufeVo63q5Hv1mzKcc9YjYTvrnxmV8/o/uaNQHc2mx9sahayhmzbu1acMmVmzVrXOxLcby2hKbSNScyAeX9KPub8O/Dstnfxr2/07sHVvUhVqGKfy98G/Dr4fdF2+GYaPr3DGQrku2j6jXjZF9vb6+pPbuwe6BvFf8YRim7Z1GarvRpm9/X4Hrzte+xFiNWX11sccwLka103sP1Keyc+ajr+Okuk0c82I/kic9Xx+Od4y1eSmTJboYdf2VxYZf25J82k4Z/rSpnU2M+WDlSvZiPOrSv7b/Lfx82D7iR+FvhNtv1IX0U3owCv5B2Pv5S+HfHOp9n+54Yl6u37l07OzHkWs1DnzobHBtj4QfC/+LsLE+Hh5pHGvtrmu/5L3lr8M/D7uPjbO4pouRsdZevVL96MOv7VwD8y2v21pfe2WaLG2P5CnGtTmUzK8kJqjro9x1FsPRt3p91aP6q4dR7+Fty4b54L8LvxiWz/6P8M1wbSxytff/Pw7/SfiFMHy/HC6urX2vY2x0VL2SnY7XqTbSOOFavrafhuveg9+K3v6jbiT19klw/Tfhfwzbh4iJOamnj+Nexy+/+lfvdZXbT6W61kddaCyPusqWF3kKcH0wo9+/dvwsXbvRNuqtFyv4VEdnx8q1Rz2qY4cFPqSyNWmbqAux/4/wP4X/r/D/GYbZ9f21diW4xs+GYfvX4dfDm3Ad89F60ddp7HesG+30Edfytc+3fxY2Driuv/lsIna4fif8n8Py9Tqu+YyYFK/a6KhlfiPXPko6RtVbrm2U9BO/r14GefMXc7QenWvXRqvGofWV6kZdvIvr9sMHFdcHpd9jXnt11gVZY/sIufpfheVr9bhj1KakHv9hGK5fCP82/FLYd7767Xt71CPMjX2wfxIyR7m6/Hj0fxZ2D464TnEjmYf3o3fD/3+4uGY3XnITt65y3SfNrlsPZT5oXR5Yf//avn5vOdROYa6+YQ6DoXFgGjFQ+2jjI9ZsZX70+kddaKyvrW2V5dvXwv88fKt9SFyWz2r3Rn4vDNsvhH0f8nL4ati9Nr6fp3jdfJQ/Lhk7Ir2H+IyMHw4bL1zL3fWLegM1Hr4PeTFsvr8My9fqitmoi06u25WP4/qTqH7VF+Phi3GqR5UHpeH1NOK6Yx6+I+n8xrUZbfTj6kSjvvT1uCmX1de3fjD4Stia4++H5WL5kc9ILfse8Jnwd8M+i8G1fYhc2L/N6Ne1xuul+KnIdY3H+wdMu7776tnwo2F7kY4t6kYyjkthnwNeDD8fLq617Vg73pZTdTSHdb3ltlFG6+X2f1B7Ql8ljUkzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwJfVAT8QNGPxI7ohz/84eqnP/3p9l133bX95ptv7jzzzDN7b7zxxva3vvWtrRzMuI3Rvffeu5UDc4/9EdkDDzyw//bbb+ccyr39hx9+eD+Hq+7TXSgHBa/S734O2N3K9dZ//GVMt8OPy01j0hcYAXjKYaX7Dra9++67VzkfdJUDQ2FuN/a96PB6NXB1sO8qh59uRzpU/WzqHAbhx8Q7AebZnBxwJr5Gu2D68KyI3bTdjXlvd3f/WtrmcN1VDtc960ebfmh/Ldf2w+RrOVg4Z5Re24vcSz97OXh3L/dQmuwth+7mkPeVeyu+8F6OOmlG4CgC2znQd8F0sLwFo+E9WA7O4GoXZvf2tq4FhnD3xmFLP1ofCYY9AOLVHCT922DwcrB5NaC7lL52g/LL6eejnBRwNUeiXAhmP4r9SmzqYZu+HCCd++pKrp3rrYxjZRw58H3f+HLwsHsPlhdce6BuSHnS1ygCgcWy5vYFwdlODkDfvnRpK7n3KAjRzhztFXI4+fY3vnG/HPy9eNwfrN2v7ZH3TZT42hvI9TCNLub6HiwiH3+Ye8TD3C5Gfpi6C/G/mHwN1+oXbGd88viV9HP1MFev4gvbq1/96ldb3/nOdxZcZ/8jZxfPlelm0imPwPbvfve77bxHb1+8eHHbviA5cMFu5mWDm/3ClfC2hyjA6dng6Fyw4k3e4elxv8MG4lzq7sDpw8OesIeafSwsx+8GCi7tGQLFXQ+XgOtLsHyI8Y9y7Y9y3QuRy8Hoqbsc/UrklbQLvneuyNnx383cVhnnkreff/75rfvuu2/BtcPSf/SjHxXPlTeMZRq+mgjkfXR77cAFA4HZHZi9dOnSzje/+U0Y28l78NnkszPBpWx7Nrg5Fzycj+6heh7+UXk+GKHfDa+RHuJ6T7AEz3QPCFkeFhI/7fWfqk8N5TS/jvZyLQ85uZQ+g+Gti5EfxhZeebDIhVy3D1Xx4JElV2c+Vw7321cy9yvZz+xlj2S/oa/VO++8sxWswzDu/jrq3IcIwpdB//bf/luxL1AW3ByWRx0+sZw6snwJd56nQu/DmGAQy6keYFMswyo/Ep7pfNTrXxv9u3av+UXmOJjzORJ2l71HpLyNlWtTD9dH+5DoC8YPpT6OcB0dXYfrfF/S8kHtfP0yIlBcu1bxVByTY/1x4xmxyOfjtDmury/LDos+Y8IsDBfTpIdYscnbt8K1z6Ejrovh/XzPuP/CCy/4HrC2uE7aFIG8V+atcl8cYaf4adwqG+flvTF+JJZbsLUY2fqObD2RfNprLIbP6cX98lVTcS0PF9eVsL3sRSKbqzflazEb87UYj2uw/5d/+ZcT1wnKJjrEsnghOKMX2zBSzNoLFLdirmw95BztvM97v9dGHR2psy9AdHhG9C+CTgKuxVCMxGfM1dVhXNxulq+1H/O1dUDF9ro8qJ2vSwSC6y1JeggHvbgmYRlWqou1PWDxa+3ocN0crAzXsLuOa/vfL5Jc+6smMRQjsWmermy+HjHNb9xXV/84uE7TBevkpMMIrOVrVvhdxzVsysFyxjquvZeqh6cR1/Db+8XnN8QP/r9IOim4br4uniuL6+6vYbq4roTr5msxFHfcnEM2tlGv05W/ztS4NFZiIXZwQTZPVxfr4psOn9ZB3tEG7vv9Q/ch7K3jT/+6ULEnju59cYLt4pkcy8V07wdlevd+Y+6Wd1Cv0bW8Xf9nBO5KzbmwRB9jQB8xLGbaimFxTBdXeCStDVKWlxt/e2fXINlIfY1jSXHSEAEx7vte4wjnxba8QS/386U2/Itxa1S2xlh5fa2VRwykuLWfA0rZTzQdfl/cMXYe8FZdHUyaH8wV11EXuzp2caMjMRJDJNbysP7YlfXF1s+F1sE11bc/sv1F/VqSmIkjLmbFmV672LGV1dHZRz/rVhZnrP+uM4msZe3K1gqPVN/RdpL1zqc5s+Ov3fxGXZzqSxcrRIotX/ht7rffWMe79uLPRx8kG8zXDt/s2vd6UW8rKn7ErXhs3i2uay+ma9eGLu6t44vZujZ012mZ7HXpSHyt27jWXXP1W/mecJEn+SV/izbmYuW68cdubqhYo9en8Wl+FZfGRvzgWb9iSyoX1/rQZ32sS33Ysf57XfobYT7+Xtjv/KIeS3x7P7iO9Ta+rnPUZS788K2oPp1/x6mdOveh69T+cftNk2Vc70XaS/v7CzyP+DRuMTJ2vI7hdXvn2bmKX9n41ePaKju3dal+nficWLoJrq1Px052buOcG49KsbKeytaBb9eZbt3Fmo96uOs6saHW6YOO7SFfCiOHj36c7/y0g394cy/ADLzYc3ZsxsSvMup1pK5UnS82LzbSvFzLuNy7/T5e3cchcfttGLYd5mic4mKc6xgu3tWPPuxipq/Rp/glN+ldO3I9Dp1rZVy2tv7Nv/k3+bfZhmMxnYYXc0AG3vmQnUhtjWF9Gx9rWb0xLgYaW32JffMpnU27Xifq4qMtXP8irO6xsP8/uhXx5Qdv7gUHJfZv0TAOEyON1x310adzH23GB8cOj3a4k3vI/5s0d0e9JZn3y2GYfi1cXI/4XNeNXzxhv3itjcTaNOZdE3OoXllbqo6I7Qbyf9uHufCGuhNu6HysbfXO2xqKpL9gvQAAQABJREFUhTpMr038uidpvNjEt8TOhrSvP9t4PfWo1/G91v84LD8V6SA5dceROuNyKBeMPR6GmXfCcqLvgo3LvDrHqEd93qzvtunYXKf3ziPR4dt1uy+JeksSl+fDr4dfCntPMb7ikl5uDMWs8a0+lutPsncNSbauEbkpBjHfSKcY1+ZprUbqWrI1PnRryx8+2cWvOjtia39kY6xuxLVYt1x/Pq4B1z8Ny7/fDcuL7DcjfTwa5quNPGiP7uC7t8Py3M1oU//mWKK7hjHbf3gfeSpsjA+H2cZ5pHgs6evvw2+FfxX2mUScRvwV46OdPrKYK5NjW/2zlccyHVUelA5eN9nG+tOqd15dY+WyOVUXLz7WkU25UpzVKatXVxJ779ds/ErFQ9vA9d+EYeYHYfn6VqQPeZrvH4ZfDr8Uhuk3w7CzTtq4Zuc71rMj0rj51M/e41vhZ8Ly9TfDbOb2cUg//zXsvvtZ2NgaE7K667q+WJHsbMVyfevfcn2V0VgefQ5qD+bFzq/cutMqzaPrRUctH5R+/2ruxQK969h2ZOOmVX1rb5nPeI3qpDWzb4BrOfBPw3Jw3xei3kDa6Ruu+T4bfjn8T2G4/m3YHtY4+JajHo1jtLGXtEGVxlFcu39cD67h+2ZjTPUR8YNr+xC4tv9v3EjXGmV19mKcXt7UNtVH9fxQ/auT5j3Wj3X024HMzzxH6pzZ1uNS/+KVjxgXI+RYpiN2bRAbvdK6+dz4d2FYgWvS9w7jWFK8jtxjxfUfRX8l/FL4nTD8jLjuuI3jVtQ5tw1M3hl+Kixfw7Xc3c+OUY/itKl/Nn39NGxcz4WL6/Fazcm1xW1pJ06YfdTrV5nqxaeSvXrHcGg6wnZ9ar9dZOc1rgfbWN401/o0Xi3zXdeVi2P+5dEO1/8QhpU/CduPnA/fjODN5zht4O374RfC9tfytc9mqHOpHG2Lw+GL8ZSqk67jHnsy/Adh99yI67HfVG0kPj4Xw/U/ho1N3yMXu7Upj6SPdR++qG0OSgfl6pvqx7rbUW9cjlsb9a3bpLf9utSm/q2rbYxjbfabPk/Bc3EtH6+vbUxLvyS8PRS2d5Gbnw6/GPZ9n31scR11IdfCt6KOt9I9KV97b3DvGKN9CGkMt+pTe339PGyOr4ZHXKe4UK9HVldxnL5ep9yxtI3yGMPa6zuW2Sb9Pt6NJSlOLY8xGu2N5ejnc6M85jMSXPczmTUZ/VI8Irj3mfEH4W+Hfb/3cvjtsO+xj8P1puvH/Qb81M91jMe1XMd3IfYi3id813crMn786/AL4b6XtH+yHHUj1Xdj5WDc1M8t2/qf5KGPr0QV5EkzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwJfSAQOD3bojwj7o69th4PmcC4Pu/ND860curhz4YLfJ+dpFTksFdNzECOxkdJm65577tnKAY77H3744fJjrRzau+9AXX2H6G3bH4F5uN5X/sOuDmrKkxOB//Af/oOzdWDjTA5AXbDz4osv7t9///2r999/fyeH3y6Hk999d04U/XAFt9dyoKiDnRdcp6kDe1ex7YbP5tBQh+aeizyzFSWn/voxL8rB1TuHeNxf5Szg3VSlv2t+6Okw0t20uRZ5OZJ+NZi9Emzv5VrXol/LfUHfiw+5yr3gIGn32dJvfFxn0tc8Ak888cT+008/vcrBvmfuvfde8F599NFH2w64De0FJyj424Y3B1xcjs+lMHw7CPjv77rrLj+U95CQR8N+tI5+F76YvPtW+AJs5vjAvRz8q/1uOvKj+o9icwC6A9QdLH0199DFHLL7YaQHs13K4cIOWb/qwHQytAvbKPccfK+eeeaZI1y7R9Nu0tc4AsHKptkvGAnO1O3fd9/9Z4IzP05fHrYQ7BW3m9outuB2wX98HWx+Jdi/EHzCqcPQPRjCgyY+iN+7KV8KRD8I3tkvRufjB/uXct00vXQ5dbC/HJyeQ9J3g+Xd9957b8nZ6dd7ysrDftNm7kkShNuEtpOvtn/xi1/sPProo97njyh5zZvymeAEFs9eubJ3NpVng5dzwY+H3+BzwcodMd0TvDwZ38di85ASWCbtIT7tcwH2s1feS469kFx7JX2/Hyx7QISHQryX8ju5f+D4w8gPIi+eO3Pmo+1wxnkpbS/l3pPfrwbfVzPGq3Ad3z39Zi++F/uC6/SHDvc4B4X5ejIikPfQnewV1zeIyx4267yd/e5WcpfyTvLUgtdg5mzW+mzWObDMpnNvz0M+zscPZs8HA3el7fmwB4B4eJMk7YEg3wiORh12teleOOpnJjizX7mYa8GnHA3X8vL7sb2bcX2UMeIPol+IXa7+MOOHfXsQ7a7Adu7TK9kj7Wa/tDyc8qGHHtK3N5blzSVy4jpB+IpowWmuTVoHtGB1kPIrfJFwCnMLXiNh0ZcKD4b/LAyjj4f56scatz9t2l47OtI3n5HWy2Pdp9XNz3h8MbLsPSLfDduL23e8E4ZjvOxDhjIfe3CsLbaX8YDhBdeRxXXjuD/314nKV0twNLI183Ak2JM3j6O2Oa7+JNnhDfbk3uLXw2Tl7Er6kqMPbe6BlotrUnzKxXPlfr5nXP2n//SfJq4TpI9BzQPNZcpleUhc5T4SyyVi31wrRzbXWls5FcNt9eZQ/crDnyduO+50+5WQOYkLXMJx8So3e/gaTGNYVsbFNV8xw2O+Fl99Nv6k66yee+65fYdqJGenOGk9Atn3rbKfg80lXkP9iBN6Y8oX8W+76sW8+r6Hqus94PMZnMP/2H+Kn5k+7/4+6YDMs7iG0+J6zNf2JbAM97g63+br43BtP2INug6uhyfdGIHlcKjgWk2xWy/lxg1+G89imR+9+YQOv8p066OMulb6k7Px543Dz7u/DPETkbmJkZw7YnYd1/bSzdf05vYR192DbMrXXQfX6/pEnTRGIPk6sF7CUxzDJWqZXixzHHX7i+JaDu5nHD7WSVk/1ge20e2O6+5Dut+wD4Fd+B4/R8I2XDe3i0/3IcU1W+Pb2C6LlQNG93PgMoxPSgTg2Ofo7M2K2xHH1cWq9XT4RWzVlenNGeoae7q1ka/V20t3/x31tid4M//mYxiH7+5DuudmL67peMQ2XOtHXPte2BgX76laYtx1UL5dyJzGedFhq+9ZdDkUiYfY1EZWrw+8YuVy+2xe1rd2tZPFLwwj9ZMOIiA+sAmnsNs9NV2OL67JcU8C22NZ+5Gt5zpbX+vT9a+M6YD+6q/+iu2kk5gZZzFanb1sroiPerGgF+f8YLY5lg7b6otz7dhRv+dQbl/6GL/zUAfr7o2vG8Ybd7jE4grLcAyX1dUV5+xyvHLvAfXWrv10vdSzk2zY+ij32sr0Sjraz2GO1Q8sJ/O18zC64rZ6JWyZHxpx2HzMJq7FH12dvuGz7elscM1XWb90drgm2aoruzdq15f25O1C4leswWaxDKPV2eVefuwjfulwSvKhW4P2ScfiWhsf5bIxYHFe55iO6LTuzc0TznDxWEyZnLmrQ2Ms+IqZ9nBI1469/RSf8Nz+xRdpdxyWez/oTw5/LOzv3fq9GXUefPh2Hl2/rm3tpDYkLrWfys5pk9SG38chc4Zbh4TYN8OkXCx2xqgOHo0TZquPdrZiv7q2+lCu3j71VXb9dR5j0TiMsTgt+TpTu24dzLPrR7d2lZ1zTAvVT2HUtenaVteWjhonONe3MrYGLdNrZ7MWbL7Hfirs7+LwfjPSP0buGYca6ccaV1ZXdh3UMdA7L9L4XbOsz+6p6Oydb9RbkmvKw78NO9SJbo9cDMIlVl7HMrv2uHrzOf+ymKknMf/qZOe6SaZ6oa6XQnE92g68TtDr8F2dcVq7cbxd59rVsSkjcbGOlbWraxuy2KLz7zXY6WW4qO46vb7+uzYw8L3wI2GYOo5cq/iT4/EDYett/eEE9327Oa9j6zj0UzZen2tdF47brzKdLLaj3pT0b16+x3sp/MqhDtfFnrEWs2T10a4PY9emWCaV2w+fkRvbys55LHf+lelia8vfKWFmKZyOF2O1fiPVNkr1ymLAX7wQXRzZkTI/OMbqSNT+1nGtrTpUvdcqrl9N3bPhJ8KwhNrfQeng1fVhDzu4S65+PAwDsON9HdP1TVfX63Uc+sHGDrOu6f9SYbj9stHZXc+8Pg7Bn++ifxn+dbjfVxeDYlaMFrPqqqvHxl8/ZT6kGOJN5c6zca4v+yaO+dThelxDw2/ZXK1p14mdzRqPcxc3xBepL4bFt7o6VDyzN67so64OjpBrvR7+/8K/Cjv07vvhfieovteOupAy7GH/d4qfCsvP/f8KmKazwbV9QMfQ+ekHG7Px9P9Y26/3AOPQf/dGjVdMNyV49DeX58L/Pez6xiOeri92xWexbHxsfOjFLFlss9evPmTnRNZn3TaW43bUhr7QKcrX5oKsX+dFN3dyxGXrYz6q51N/dnrXpmXt6tf+rL816vUba234FB/s8vSPw3D9z8M/CMuPqH0flA5eXQvesD05/m4YfmFJboTrdw8lTPnMZjyoY6Lry3iKZX21X/sh+Rq+cd8jom6k9qtPuHb9vwv/TdiexLgah2JWuVhmG+2tq1Q3tj9ON45y1Bv02sjr6JTi2hzEohhU7lrQ0aZy42f9q+sDKY9tqrOjlsl1Hbat/+vhvwq/EP5nYTlb7hz77vViXsYPezD3YBjmvhOGa1h6LwzL/rcZvpsrx/vMWBqH4tp+Rn/F9WPRi+uHosO1+w2+kPGN4+r82ORXOIbr/xyWq5uvoy596Ecb/XRsbLVHXXT1bHzo2tRHubZ1ya+sDikfS6cF1x1n/tdjU/zNj32ca/3YxEKZtPaocWob9cW7euX2oVyqn/Wga6+d9Yfr/zf8T2GY9iABGOs6Rb2uT+3hDcbg8OHw0+HiGp6ar+Xp4rpY6NhTtYxBfzArV9tvwLV+m6/pWE4fcd1+tEdj2bzg+G/D/y1sTHJ258R31Ds2ttor69vy6NN2aXZ0/VHvmEYbHY11B5ZT8noMrsc5WRPzW18bPrWJIwzWd4xH9fpoR0f8a29b5dpJOejN8F+HXw4/G4Zr+Vrf49hSXEg72Gsuhbmnwt2HwBMsvx2Gb3tsuHIt1DHT9YXh2j5a7odfGH807DpsmI/PkJ3f2E/M1/ULb3D8P8M/Dbu+e6xzItvPKMc+R99RT9Pr+hnLdLTuf2C9TV5vgutNM2xMrfNI7GytV1ef4+rYW+eeOI5gDf7ktd+Gvx/+QRiuUe+Dg9LBq2vDHsy5Bsz5DqX4hSe4tich+3nStfivk/6K6+Zr7xfytWvAeHEtXxeH6311vnFZfF6PdK/C9jth992mNvpbt8e02EY7vbxev25XX1rvo/bbSsL6hn1Jcdq5igXbGBN1tY2SHdW3de3joPb3bcey/fVbYdiTz54Ofyt8q3zt+4vuGx6OLrfCDRzLjfI0XZ/6Vnccrt138Ivl7HGPYxyw7Frq4d+8OteoRzTOF1a9D8H2P4bh2jjEptR+2lel+tat6x+nXB9ypLH/0f6V6v1i7CsdxLz4jMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwIzAjMCMwO0bgf6A1AwPD3jwY6vtHM61SPbDQ56pWznYaPwh2GK72UsOsxx/vEV38FebtG45OEVdK6acEViLwIKR//gf/6OH5qraf/HFF3dySPPeW2+9tZVzT1c5AHd3b+9yDpcm93KW6M5eDkn1q9Gt1O1ErnJIqgPV6X7AeS76dnzP5PDRnRw4qt/lkIgIWIx55Qfsq7hdC19NOx17WIP2e+n3ag4ovZbr7OXQ3d0csqv/vZhWxnT58uVVDmg9wnUeZJ1mE+eC8HUm+fX555+Hi0AqwFyt9nOw7aLnMF+42z3EIzxdS3krOHVouR/jwuTO22+//ZsHHnjg7bvvvvvD2B9LY79J3Yn/uzkk/eq7776r3X76cQr0Xq50WV/hq+EL8b+a2+Fy2tIdhu7HxhimXcdB1OB9LfXXDrG9+sY3vrH37LPP9kEiC7YnrhOtScmzsLy1f9ddW/t7e2eXB4sGt/vBFkyvou8F3yLlx+p+lN4HsbFtIj9Il3898PLDNN/NfXJ5d2/3wpmdnSs5RfBisOlBJ3DsR/Pv5XKXkqYv5JzsPChiJ/q+H9Q7PP1y8H4lfcjjV3Nf7H744Ye7b7755m4Olt4rrh3eeLj/SbOFjvJ3DVOevgjYuzpcPeu+/d57720/+uijW/fcc882vuuuu7aTL3fsE/J+bS8gj55J6jub93X7gzPxuSPv6R7y4EE7z4S/ERzZQwD0J9oXx38kD3iwV7gUbHoIhAPPyXfzhIeLe6sV/b2M4WLG9WGuhy/tnD17IeORuy+n3XJAesa67Efiu4th+o033lg98cQTe3AdvO9nz7TgOX1MXCewJ4Wyjts5sG37cH/bYcHVwjnsng0uPfgDVtkXPe/NcOr9/2wwssjo8uudyYsenuMBIU+FPfhmsUfKwXxJ3P6ifi607J3Tkz3F+/YfZMbvoSKwLG+/R88YPwxePwiOL8Xeh6BcDr6XfUj213K2fffuvffe635p3+M+ZOI6gTlhVEzB6YLjSLr3fQx/lfIonD4d/rNDvQ+KSnF5EM74MJwF+7FrT/+yqNiDTRiGb/LdsL0GXc6G4+xBFmYv87ef8RkSL7iOXN4HIu15iuvV4SGOMc3PjYLwJRCclsb3SPrI1vHFcP09ROw0E9wVk3BbDJN42V8Pdj5s67iGbZhexzVMj7heDh9wIGfskz5ZBMTMejXviSscyqd0ucRaqmezJs25HgjWnNs9AD/7gmK59eRppxHX8LqO62K99hHX3Yus5+tiW994Hdf9HvG0x+6LHH9zqWuI4UhwKMYINsW/BM8l+NRWX3TrgJF7ACP7CLi3x+g9E/VUk3mLkdiMuO6+Go7pWH25mJa3tcXFs3jR9Y2PcB3dAUhbM18nEsdT38sqxRCWG0fYk5fVF9f05m7+yuu4ti766H2hTPcgXjkcthHbaScxgEFxam6G2eIajn1ulK9huPnafqx7EW3hmiy2SbHVv/jR8UL5XFp1yhsj0DhViiESNDayeZUOv7XbVxTX3Z8o04trbbtO9NsR1+IBj3g9X/vsCOPruGZbx3X7aLyKZTFtnF3L30r7t/UUJ4mAA88OI1HsKotb9w0jljfl6LaHX+2QNmOO75qww7Lv3Uj9sd2O1Dj6XgRmu/9o7u4+pFKuVudeKMa1he8xd8M5Lr7FuTiPulDXpOXbQua7n1Xu4XXMmCsMiQGcIeX6kVgdKRfXBrO1VW9Zf3R2/RWnjXf9yNZF/dqSdRAbWIVfWG6+VmbvvaBML8M4TPMh13O6fq1f84i1YcPFOhtGbPtyW/bnyiedirXiyPg7F2NnVzbf7oUbE3UwWvxqK372GUhMtWnbtufPR0x73fE7j+r20urh/OtA4icm4gWf4iee8jPc0ovrYpYfvf7FsH7omF7Wd9eP7NqS5agLKZcWXJ+iz5zGDjvF1ziPTfPsXBsb822e1ba5m71412a0Vy9+tRN3bRAdKfPRvz70Z5yVpxXv5tXYjjhszjV/OG2ObW7mO/q0fpTFMtk10p/rkbh47hjI2roGHeNYPk178457xHXnVDy1bpy/OjEii9Ooi01ZH+So60cfcInpbHz1VdKmJN58+ncKdn+Pkct999exRT2W+OCO1fXcL/ruXMlS9bar3bj0gcjqi+ETvMChvbHc+1ZYufimGxc57iHgnJ2t+ojhtudTTI96106c6etszmV11aMuOrk6JXuQcczFx/p8WibFCfFtnJTHNRa3rr/48tWWLA6qr/cXl4UaV4Xqy/9MpKzNo2GfJ78Rbp9Rj6XeR+4FY9GncXb9u9YxHV2Pn76Ntawf94P5YWV1n4T0C5u+78Cvh+VgY8Hw3LFVJ1uvLa5P5dhWjLC6cteLXOfGhJ1eVkbKW/nu29560ZVPOHXs4/oYu/L6/EylfqTYWXtSuSyWyNqLd/tT73qkteq1ox7haV3Xt/bymu8JtJPrHgw/FHaNWxEsYqQv49MPfBQPHWfnnKqj+Riv6/ibENaXe4Su7pOQ/uXb34bN6aWw/bPrGxdpzsZXTHaMra9vy6Q2lXSxJUc7W7nzVK5eGdNCyqeVzAuN62M+yp1n50du8ucrfoiEATZxbj8kal/uh7GvxpeP9uvXfjM2exGY8H2XnI2L16jHUvFYB5jRDzxVh/HOz1g6XtJY5WZ/F3IImP7ovn+sX9SF9LFuO6w6qpefXwnD9i/C9iPFc7E5Ypet9eRYN+ptS1Y3F2vSuUU90htjNn7jGrCpv12oc7E2jQVpbVtXe9e/a98Y1pddfNlR+6xdP1h5jKn2qP5w/nJYfpOr4fGx8ONhGCu1r5YrYRCjJ8MwDFvyP3zT9dkxjOM1BuOB63vC9j+uSeJ12jSG0UZ3rV+G3at/H/a3F9jDjRcJs8aybh992q5+Y7k2ctSNodw6ZXrtlTEd0G30f9vmhjZJNnEohukIDsRW/YjX4iPmpZ21aV5WN+rtkx0pvxR+I2xPCtvw+URY/iz1mmOZzmf0g2M5Uv4nlfVpTKhzoXds3hf87+v9Ybim2wut0/oY1NemLzpc/yxsb/1fwj47NGbFLD82Y2GDcbZRL4brN0o6f+1HHm10jKpXHliH19sI151V5wpfYmR91nU+YgmfpHp+9ac31lEX4sO/660P1OsdlA76eiUF+U1ug8Wnwt8M++zoGm2jL6TMjmBarnU9YyiWe4/AmdwNM+2H1Bc2xubofhfjuvb3nWfnBn8dA6mfUmPjPvqH8BthuH47vH5tY++89I1r67WUR3vr226U1cf5pfnRfNd15evoNsJ116TrdN08h0JjVZMYWm80xlOZnU2fJKKP16DrszLq1mth+xC4hkO4fiwMZ13ntolpad/rjLiGH+0xXMM43Z6df8cUdaGODa5hGfvMKG/L170vtXN9uEadDxtSLq5d7x/DcP1fw3A9zqF9jZI+lvW7XmZb55husNWn7Uef6uSkgwiIU7EodiOGu87kuq5sXdf9W9aXz1jW397BnhiuHwnDl7aIX/umGw+CQ3uWXke+xO+E4dp+G66bM6MufZHGoJ19iP206xXjD0dvfXGpj44h6kLGgvjSjf9XYe8/Pw03X2t3HNbYOx99jNw2oy0u1/m0jr30cW31v52kua+v08ed33rbxtH6jmRduubsbTf6/S52uRrDxZNhuLoVro0drr8ZputbvtTHu2H4ptuH+G5kExlHcS1fd08y5uvjcO16Jf3APX4x/Hz4hbA5ad/xtQ1ZzEa9DqfKpeN8xn426W1fWZ+Wp7x5BDbFq/dK61rWU21jr/L0L8LyKjx+O2x/a48BE0i7sZ/aYfKxwzo2OIZt3L02fKuDkXXq/tr9cV/YdyuuS+/fZootfYxjSPFoPnDNz17l1fA/hV8OwzV725nHegzG8lg/6ml2A92qXoOx7xs6+KoNAjxpRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEZgRmBGYEbgy4jAclivC+Uhdzt5kPT2T37yk60cFsp09EOsHKB6pKv4DORQX80/r/4+w1Bm09MSAYfYZqwLcB577LHViy++uPPggw+uPvjgg5yTu8rh03fk4OndnRyGei2Hhu7kYOftHPq8yqHTOzn8dpWyA9WdRn0th46ey4Gj25EOBfYjSIesb+egUddYDk5PH/z3cxCwg6tzNvDVpY+Ur6YPGGbbTZ36vTTdS91ySHraLtg+vGcW/RQ9oF04Jn0JEYDbd955Zz8H2zogffvixYsrOMvht6scTr2Xg6Fhezvla5FXg9fgfOVQ6p2333579/33378aHL4B1xnu2WBwJ5jvj3bjFuezZ/VxJT4OhvZDeT8y1s7B6Rdiu+aw3bT1g2N4Vse2694ytocffniVfvfg+vnnn9965plnlvsk/j3IkTrpaxqBO+8MekKmn/y7H5xswXBy6+rQvgdPoQVrcdv0o/aj6KWN/HoxB0dfTacfJH9fSJ9wfG1/tf/R3tbe1ZyyeCH4/SC+DkB3GPqHaXbp7M7Oxf2t7Qu5n5Yf1ccH9q/m2u6fqxnTtYxxN+8He7Hv3XfffUe4zmHaR7jOYJb5HA1qKqc2At27Zv23s2e4bh5XPvhgZ/vate1sCuTNMFic2w7WlO0ndoJdD1f4QfiBsIfyOIw94lNT4Lov11/KnkFu95DA92OTgz9M3+9nUw7/H2TMwfX+pfhccEB69MurYDzN4B6e7UeuBrvXgvndjNV94v7ae/zxx1fyNVxnP188V37qwc+Gn38EHNiWXkdQjfpywewJSHabTxhc8JmyB4KcyfoHDmf6cBAP2Hk27KEkT4c9dGRpeygjFrrhOq34lBL25N5reUfIw3lWeVDKfspy9V542wNOPLQHXwy+Pwov+Trjv5Tha+uBVfYqV8+fP+/hJB68szwM5Xe/+93qkUceGd8/Jp4TnBNExViHpGx/Wm698oLbSM9Ugdc/CD98WB7XtX6puo4+b+xe1/laAeaKyyVfp7zk60gPAyquPRCoD/Lpw3yUi+v2cR2uU7/+sJ/9HAK3lc+9qZr0BUWgGCOtL6Yfx/WRmzy0EYblpmfCHsbUhy9FPRXUecJkMQvbMAy7JGY7ytnR1RXbcL3k6kO5Cdeug5brHb7XHVjm6yeJgPjJeWSxqD1d/oBFmIRDOdNaWFs6m3xV3fo1F9sbaKes3gPF4JntNNKCswy8uIbt4rq5W84ebeLBr7wJ12LcPF0Z09a+78wPv6N07Uk3iUD2rfnosnxfUCx3vYpjuMPwywcpw28JnpF6eu8H+K2uzj1xd9jDTUecp3jqqHGSb4vXYlgZprsXkbeXPfahr3rxW8e1vo7219Gvw3XK6DQdMHow4q/gdQOu4RBurZu4HodruOQDr/QSXTsM49V7b/T+gHnceyXqqaJ1XHdf3X3IiGuYhvnuV8hNuB73IY2/9ei11mWqJm2KwAZcj7ET02JbHvGei2AUZvkiD9/li4prZbp29BHXKS7tbxdcd19xXL7u/hqWm9vpeH1/Ddti3tiTeFyX6jFPWouA2MiVYkY2VsqwyCa+4o7g8jhcw6f2qLlbe2300Wupw+y3E5mfeYoP3OJ+bqTDNQn3mN7cbS+yvh8Z83YxvgnfaZqF+mzfwy99nLQX+TZjWv34xz/ePvw/HENkK7csLmIEgyTsyrliCGfK6khYZlMeMVhMalf8Rj26B1yTv/yNtf86k3iIJ7zLzc3rcA3LI7b5iDs5Mps1Kncd9Vsese+afLr+6kpL3SFmajuRsmM8/OzXMXZOyp2nuTYH128d58UhzIqnNmyYDqtirk8+7GRzszjDtTJdPX30S/G2JjEVO/MXK3iu7L4DpumwWlncaou1IfWnL/Vk+2a3JmVl1LVfl+t1i/NJfRlwPQ6xc4Kp6uaPyMaALlZ8YI+OSGUkjvrRBobFl7+cDcPs9dWOb+3FuOvQkbao1+SPTxMZuzmNWCveYBYmxYKteww2ujYkFrvW81c39slW5ou7fi3Xxm5cmA11nAel39ezn2haw3XxsT5uZXUkLs4aIzbxK/aqs4uztrBbLNfOhtXj9kuvbzHOhrR14Iw19/31Y2HfZbefqLekXo+jdvpE4zUOLAevtY+2T6vDjPj4vsOhSSNe2cc8W53dfIvZ2vVVnU/r2at3jdRXN1/Mj63lSrYS2xEFL/TrbEeVJ0iB65B5FJMdXce+PlcTY9MGK2MxKrbEEC6XIKzZ1SF1rqmv9rEpnupqp1vH18L2lv5O/mTY99muvT6HmI4lvt3HH+fUGLjuzahzuJlP6+DNHByUYx79/q44hF8sntWL2WK7kr269iOe1Slj8Rt15U1sHrjxjno9Hf7vduNyfeUJKx1ie33txrXqPEjcecNG9U1xapw7Y/6uow84RNr12r0Ov+r15ys/W8eXwz47PRz+Xtj/2HW/HvWm1H7dd9jfeUrqer3qresYWx7luu9Yt64bvz2xAyl/He7fXopD+NyE0eK+GK+P/hr70Ydf+yymK+u/LhubynSxrEPLR7/7UXHSaW0v0uGOa0Xv3MSiuKuNZO/aqxdT9tro7JiNtA71YdMHoo/2xXj4ok3x8Hh0/ztqLyL3wunNSJ8l9wGW6zfR6Ku+86jvWK5vbZX1HaVc7b3m9fBzYQdJytnFabEJg7XRi1GSvXXKxWdxW1/l1hkjfd0W00Kdg0J1svpop594GnB9s/UwP3Hh07k2ZmxwWrvYNR+LMeo+gWx8+ZX4tY3+6GO/+u7nzl9Fl6+fCP9J+DthdePeJ8UbqONT4T7QxqGMI40+o726MY00+reucvSrTa6G69+E/zpsHnK2mOhLTIpV8jgdrrUpvrUrs7cdW/v9X+zd2ZJlx3U39hq6MTbmgQQF8oP4wVCIsuKjTfnCNyZ54Qs+APgQegmSr0M+AO8khoPhUIQCduizRVoSB4AAKA6Y0Y3ums7x+u06/4NVG6e6G0ADqKrOhVi1xsydufK/s3adxtlJioVjk/hWdDs5t+rjc4vfBq7NJ+vSaxCdVKvkkNFT475Py0dy6MF8dP5gPPcLGw6t178V2+O+Wvzfiv+HYs8om3CdcVR4vXauIx8/Xhzix5uo99P1nh9/ZO8nPpiG5VeL/7HYv7/kEMfUqmORzk92P1/yoycnbYwtMXrnMifiQ5G3q0+NzvKPj4nrTVNRE/VTT+uXNSx1bcOnnMRiJydrFptEyXcNuNXHvxf7N7ivFf9t8V8V+0xEHP7lhHp790QouPZsftqaJpdMP3M9WEqcjC4XmWsofyfar39WbK/2N6SxpY7GH44vWOXvuambvPjThgz3/uKr8Dreffwh/lDX47tIss/PGsaOjE8tUdZVHMc/x0DytEks6yaGtf11cXD9jdI9Y/ueFkyfhuusa6VMY+i45gtlDrEjjSfUdf32Nhl3cknj5pdnr/Ys8krx/1Fsr85+ndqkPumbTB1KXdewx+nd7n3RT2P9IfFQ1+O7iNI8+1pm3lkrc+46OzmRfCj2PN+a8JFwEEo+m5/9SrF979liezWG05vt1xWe9jNSH56vsc8K+zW6XqE1GVun2PCGY5PRk882dnODaWy//j+L7dXBtbxgs9S1bkz8GMUmu562c39sEs3lsfc2fuZ3+22knveU1Mia3EwXs7ZZ80251iXx9McXPEf+vnyeU8mvFwfXt7tfV5PpWd3zuoPOQ8aUccUX2ccVHynf7/+QvOTGZ9whn4fAsc9B/rn4T8Vw3jFZ5kTz8cTOGOe2Rpt88U+dzn6kr5l7s3kX4XpTAdRqvrY9r9cyed0nd+5nw0c+v4YLz6bPFX+5OM8hwX65Jko/jI4/mLZX49B8DPGTvZ/up9uvQ/LmufHp3/j9rWjs/1Ls307do/3a9NiR5VrTzeI9tm4wUzb1OUs5W6ZfxINGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgU+1wr88Ic/XBSvr1l6/xLk2v9xFf1+3DYjf1SgV8BLGGPXgb4OtvVFxsWjjz66XQdEb1+5sn909eo9+w6grsOedxxWXoeJHpZ0gLovRV5yaGrRbsWn7/DVF2PzZUgHCWxXbLHc319Wcp2xu+Mc3SVZfR5UX4tr164d1oHRh1evXuWjH1Rfizpgd1GHtx899dRTDr+mL1aHDk9fgKyub+eLkJnekBesAta/v3D2+eefX7788svLOtx2eeXKlYXDyE0ZpgpnDnKeMHzp0nKnzvS9VL6C5f5uxacDzCu1DtddXqpDoO8pebnYPr1Teb5MP33ht655VP6lvsp3o7DsZGvtrpXuoOi9wvb1wu9h9b1X9gcVO6yc/eK9GzduHLILz4c1zsXvfve7xbe+9S3jDJbzAkn2oLusAvZGh6kXTgrHjzrM3GHUi4LlorbdktMLlo/gq0pT56vv7Nf+ebX2zNdLd3iqlyp4AWCeMeBILvw5DP2t2le12S8MOyR9Uf4bdTNcrY2a78Zya+nL6/pxOPp7cFs3gUPS479e+rW6T6b75v7779/TV+HZHn7k7HW4/tOf/rR49dVXFy+88MKE7eonGK+uB533CtTBnNv1+3gLXjsVdrcfeKDeGbw4fjwtqG7fc8/uVmFm2tMKp1u1N+flDF+ptk5gD157VzfTp75WCS5kDz6qZ4Qbdb2rMFvQJt+q6zmIwEut3q6c62V7EZCX6PDbt2H8xvbR0QeF92u1Nx/Uvr1fON577733Dp544gnPI4f/9E//tPzmN7/peWXxD//wD3NcV1eDzlEFpt/nNV4S9vLMul377U4t905hop4Tjvz63y2MXCrceGHw14v/W3Fe9lfqZ0YwflQ3zqIepO25MAyztQ9vv1PDu17jer8evd+uJ+5Jr9g7Nc7rNe5p766hy79eWPYcsn/PPfd4OYm93UtW8WE98y8ffPDBo5KLeoaaXr7jkPTvf//74+/LKtAZp+DYMOdY9vcYnHoBTjBe6pkgzyTwtcLzJKc9euWL7sU52a+9HIrtOSQvRfPSP5gOrsnp2ajk8f1zfJ01rgvbC/ge9JlWIL+f1T3s75yus60Vjm5d/1xsb6J/qfjJYntv9uhSzyQFb8YOh3CLYRRmcdeD5eBZDAfb7o3g2p6dOqlhr+VytV+n5hUedKsK1O/3+pW4PrAmtVNb62fvtGeqMxv2+IJBnwmE8mJUbcWDaXG69vrxnGs/zvNu+irXmafMAx5h1P4cLHe9Y5wfxoNreGaTagLT+kt9TuD6pZde2qqDOpff/e53l/3z88ofdHoF4Dg4pGPYQ/CWeGwyOcnLmujHGlkv6+8FkXQ++zEcy4Vp7IWqwTR51im1yHznuO5Ypm/ar+3vp+E6+8AJXK+Kks/5znqNzsr4slYdw3yo+449H/7M3sKTdaYHx9Yme5I4TMO2dsE0eZ5wXcNd/94yp024NmcvqLwVrvMs0vfrjutgO2sxcF1F/Rj0SXCtjTWwX8OlNWbzZ78Wg+PgfNN+fVFwnX0Znue6ZxB+dcjzOL3jWv1w9oqsiRrSJ/a8uNJLDEoFUpd6loZFz8LqlGeJ1IzsJDefSci1j6DgWr714JdnfWCbzx5tDfm8FJgNy+lP3+eVzNuczQ1Gs3fDLiznmZq0dwfTdPnwj4Px1Ex/6qx+2SvYdNfL+uT6sSt0oWjpb4o2o8zdv0dEF4ahYJiubtrBGJ73kbb88t0HwTWf+gfb0bWBW+yQRe30fTeR2qiDmsAq7MJ0sAz/sEzGL0bnl8/O7730w8apORk9+4rrImMQ6+TfRfnPCxlrHy/d/Dqe2MF1pFrQE4sejOdzELacfO6hzmwYd+/k+tHFck8lx17N5xr4IlHmb67wiNU2+IXF4Fft+GE3OdGTw68PGIfN4Fn/YpiOg2tS3bHxiEUvdaLz9nxuHh0rmVfwaY75/I0eyv7LVhd9aJv7QS49uFZrBO9I3aLLhVukD37x+OnYNR0QE10bvlynz6PcZ4rMK3Pq+yaswiC8wagYHX6j8ycnmE0+vzrJEZtjWf9YTmTGwUfHxodI/th86Dzi+njkH/40T3jJHEVgJ/PlZwdHHdd8WB8ouvoj/mDdNZD+cj3x4Dq6eHR5xiHHHvVEsf3cZ4JiuX6pt0XyO83tHvu4unFjZP55ZnagSDAW3KmhnGCeFOOH15vp6tH70YbNT8fql72ajvt6sjPerpd7osRin2m5+jcVY+7rGZs0RzjMvDLnnl/hdQ6/mspDbHrys0frb45feVi9o+eZhC0/9wSMvFH8TPGjxf7N3F6e60SW6wSd5j+RVMbt5s3bdTv1M3bYfLPYAUoOTuq4oweLwTUfhkVy7u/5ySH5Y9PDahpObXudjRVlnSOPveU/Z8/X/l92/164Hv9qbtYVq0H2UklspCZZez52OuHfpJd77c/zRPpMjdnBOz1+ba2Xsfy52Gdf/1n8teIvFdu3+7/TlLkeHx1lvMfWyZ+JRZ6MfjKrz81zgsPM3IuvFcOqueHoZNc7ToNrOKVrF/x2Pbgm+SPp4awXmTFG8sXPN9GPfvSjqOdVZi5z2fdsMTXqGIjOj+TwpR/tY/Ph1JDsWO66/pJnjfQTXL9a+n8t/loxbOczlIwlskInxspGPX7suXM/+xzNwfPyb4v9P9q/KQ5+zalz98OttnzJic4f3EePnVz+6GrIxr32dD5xOur65IDr+jf4xCffOfzRx2+OsIT42fAQnJe6rhUfTKp99ng++eqL4o8uH6mtGOp15pPj2vrQ1+vFfpf/e7H/x/Qvi+Ha/88vjlHkXN9k890pSv1Ic8Gem35R7J78ZbFnabUUg8fMT+34Ox6DZX65ODnRSW16n/Q5u55r8ZOdy5xoky+x8yzNK5gw/+CNX12CabY4ks9Gc51PO/605dNv2vNH7/3Gz0fXB1wHH/9z6X9d/OXix4rFw6VO+ibJ91lR6kAGn/7G/b+K7df/T7HnEvMVVxs6CZ9pFz9f/HzBPj05uU76iT85+qSTneXHLnUi9kUk84KNOfX5zmuhPsETKa6O6Sd9po/s05UykfYY9b75ci8k7jk1uP5m6f9jsf368eI+hly73OtxdL3H+T8OZR6b2iRGBm/XS3+p2O+ZfymG88yZlNsxyNexrB85/PIi+RE7HPwmJ+NJHsmH1SB6qRP1/MlRzyHJW6Wce5G5m0jmS2YfzXwj5dFxKHr8pJqj3md08fTPN+c/lM9nZZ5D/mbFcO1vx36NMtc2HYl3mts9djM9Y92UkxgJY7AHx/+9GK5Jtrg6dBlMpm1kz+t68vmia4NDseOb2/ISm+tTH+fts5Bp0Df/Yb7WPvMODub+2HqL3tvQ47cGeabgY+s3fYuhuT99wAZc/2rF9usni+e4Tn8VWve9ySf+cclYTqPESFjD9uv/t9jvmf4cYo6ZF8lG3R99kz/58z7YoR6Lby6TH3kifgFxfWJ+ZaRGHYe9FvTgsueqf2+TfvnSvrdNPO0i5cD0e8Uvr/gbJT1bwzbKdUgUeWx9aM/9id+OzJg35SZGGndw/W+l/7bY3wc+HxFDZNrEx45vrqcNmVgkX6f0wdf1nnOr2Dz3ItmpScdC99E3xeLvsV7H+OUlV7z72SE5MO2zhd8WP1MM1/bqB4vze6DUdR+3q8u7Fbn+rajneAbBnpWN95Vin7vbv4PnPte03STnvupiTWKJc87tdeJM6W3WobO0P8//EFsPciijAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKfVwXqRUoO8s2XwT7xZcehSJ+4dKPhqgL1BcCtH//4x8unnnpqu16Mv1UHTk9fFPzSl760qINE60zcenvNvncI1huQ62BUsg5H9TLE7Tok96DEUR38zNypg6Wn7/BV3nYdODrh2wsTq0/NtpZ1MHQdSDodoF6mw60dhr7k01ddb1FtHW69wHWY79Hjjz++qAN5l6Uv6rDhfNnxvL2cfZr/+PGZVKB/sXWtP/roo8vCFJzA4qIwelT42qqDcXf29g5377vv3kX5d+ugaofjwu2iYjDt8N/DkpfqcF1v/NwtzpeNlzBaBLZOBt4rPizbfeDFZ4dlOzj6RjXXzX7l71eu/g7eeust8rAOvz567rnnDuuAu2UdLp0vBwfbkZ9JsUanZ7sChUHY2rpy5crSvlejZS/r0PElDBe2pheDFK582RwGaxvd36qDyt8pzHthmS/I/9fiB4q194V0L4jYq7a1jX6wX/t0XaZuhJ0de+5R4XevQHhteYxXB0lPB6hX7FqlXYXzaq/R9cL5Xsm9wvF+3TsHtV9j90C5j47qIOnDGqf7Da4X999//3TgyurFqMYz6IJV4O2339567DHvG/mQCpPb9Yu/XjV879al2l09R9SjxlZhCmfPs+96qeD0XPFh69vW3AuLg/39g+r8et0vcOig8/fhtLgOR995d8L3dFD6Dv90UHpJB6TfICtnOhy92u8Xbvft1XBd8aM6MB2sPY8cffOb31w888wzi9q3Fy+88MLA9W0v05lM9Hza/wab21u1/vX8e5QcGPXibC/V8VLuvGSz1M+EbPuHhc8bhW17+LX6TfBu6YXZrffqV4SH8uuF3aslvShl0mu87Bs19umAGc8g1c/eivXjl4A9/6h+xyzeeOONRe3ZR3BdsTx7LF988cXo5R50hisQfBpi1zNkvrP0e9dYPLt4XoZHL1adsFzy/ZUuRp9wXRKm4Zl/wnVJzyT+sAznBTzT74Tyw3P0YHn5i1/8InqFB33GFQjuUnMy62JtwtbOOsIDnbTWcGHf5Xu82IufHJa3Cefl/kIp85qelWskwTAcwyws0+E9Oj9s84W9MCqYJs09dco12L2mA9dVkE9C9fvV79nUUhdqnD2Trv5sNYdLeCStMx17jpWD6Sh6MM/O+tE9QziM5rN+jqhLfCrKmM0XpuEzzxzwC9PBOAnbwTUpH7Y34TrYzjVO4Ppb3/rWsv5u7GtT3Qy6WQVWeJYCY0ht6cEfH13tYReRyY+PDZvaY/6sU6nT/aAPlH3bWsF07gexs0qZiz0WNvt+Dd/BNexGD66zV5PauTfUIPt1cJ19+wSuKy+YJgfdRgVugWv1RcE1iYNrEiZTb7o1Cq6zTuVa/66lW0+H3Glnvz5PuM5+HVzbl+E1zx7R4+/P2B3XatBxHWzn/iE7nqOXe9CtKnCbuNaNvXiOazZ/x7X1mONaHoxbO/p8v7Zn859lMkfjh8Xs1/PnkGA5zyHygmv6rXCd2mVv6FjuenU16JQKBIvC6olgCwd/9lEYjL/USQ+W+bNf0/nhV3/BQfb8vlZ5ptbmvJL52bvhFmb7s0d0e3qwLyfP2fQ8j+gje3fudzK/61K3cq33D/rd8G/ragxLHX/BKqzRw3LUTO1Q2pBqGExrR1fzPHfkXmDT0zb+4L1CE8azD8u7W0id1TbYhWX7NJvMnh0bvvmC79RcH5ifL2sWyZc1zfrzqXX8pU7ElzVauc6FWPp/Curv5uAn82SH1YMOk4iuDkgd6NrZf/O8m7qKB9vy6JgOy/TeP32ek2vr+yKRmgWDMAqvbBLnuQV2+XtO1+WlH5Ktvlg9cdYpNun6uOvxlXtNfOeNMg/YCakBW4yefZsPqxcSDzbZdJwc9YXF+LqulvF3PfcFbPd7Qm7GJYdOyvs8/s2wLvOxKbU1P6xuaoLZ9lMMiySsisVP52NrG3+wKx6d1GdkrkeG9aFuJB/KGqe2GfNx9EMcxD5P0lwQPKLYdPNFibHVhC0v+22pk65m/DCnxvLlyE+7Uk/cAz1nrmuXtsG8fuQhzyvW3mHp/m1czlkg47PnGpu/CYNPvuAquGR3HX7Z5klqG50tP2341Tl9RvKHjcWakHxkfPGTiIw+OTbY8Z9l2ecRrM7HK0cdUPbR4I1USznBb3y9v1yHD7HpySG1D8XPprt+9ne6a/6++J1i/0PTk8VXiu3dZ4GM0dj8Hfh2cf7ug1FjzxyCyeCaHV1e18Xm+XJwMBxd/x3D0SNT/0o7geWsE3+I7zxSn6Pxs9UleIK35JBqI4aSR+fvudYg7eKXF8zO+4g/OfqODtPpi7R+Lxe/WQzTf1H8aLF/Sz8LZOxvFMO2A3fzOZ79OtgizUOdgl8+Oj+mJy/+2Mnp0nXFw2z1wvRwqZOPlCse6vrWD37wg+U5/V6OeQRj5pZ5BWdqQScRjPZaROeXh/kirRtKe/5+DTE+6xO/NrluqZMftpMj/uti2Hm6+OsrOcf1fG6Vdsdpfg1zQfDsvnut2P+H7XM7fwOaF1ajYNJ86Hx0nHj0xOb+tDOO9JtrkKnp3Bd/pZxOFxTXmbAapA6k2gbHiUWmfsEgv9wQPbkwAK9Ifp415thPH+nTWv9r8evFXy52UCm5Cdflnu4b8k6TcaFgOZL/lWLPIL8phnGY9jyS+pDqKDfY5TNHnHj07qdrk77SD1t/+FZ6pUyU/Mj4z7s0n6yHuXQ7c008dqR8sbBaRlfr1HaO6wpN1wnG2dFhOzq//lyPL2tsTf+l2F74leL/qfhrxf6NvZN2SB+nUXJOi99u28xbP/RfF9un/7341WK4tmcHg2RqRJqbsURXu8Sjd1sN5It1ltP9ZZ6w5fY5R4+UfxHIfPrazW1z7D51yRryY8Tf8Zj6wala92vwheK3rvzpT18o8Vwzz5n/vWL+dnym+JvFzxXDtc9Isrbpq1wTpa8+7sRuJdO25/X+xftnNvDsOeQ/ioNrz9m5NpkakdGDXfGui2dePT956bfnxEeiXCP2sfcmP8/xc8h8VpmzdaLP11NtOubYyS11Iu3SjzhKG7r8tEv/ZPTk5Pq9L7i2V3kO8fsdrv+2+Lni4Frf2uTapZ7oWyx9it0u9fHN24u5L0n36CvF9uv/r9jzkv3a5yO5NplxzrEYf8/hi38uM5b4K3Wi+BldP47exs/6X5DrfwXa/kRtb6P7s5Qyn2PWmn8eU2fx1Dv7efx9XtrGn7zI5MmBGb/P/63Y341fKnaw9HPFnq9P268zzkpZY4t+u9Tbp02fr3g+PzePl4vh+tfFwbVx9zZ0nPrM7Qqtx7opb57PDnWdL3baJK/Hum/SLyiuU4u+ppt8qUdisbvUxzweX6T8XGtTrri9zd9f8OLvsieL/6r4a8VwDVsdJ2VOlH4Z6TvyOOPmP3v73kdaief5Sr+ePXyv57fF/1nsGcTnfMY2p4yD7Hpy44utfXITi91j9FDyYkca92mx5Jx7ufr/T+dreNq81GNel3nb5OhjXr95bnLiT35scfs1XOeZ9anS/6L4vxTfWwxb1r9joLev0ETpOzL+TVJ7efN+0jZx147uGekPxX8uptur4TptSp10dvfFT6KbxY4zPv7PeZ8fv4fPoUV++X0OlxqXGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVOL0Cd8mXvU8vwIiclQosv//97y9//OMfG8/2N77xDV+k3H755Zcdhu6A6e1HHnlk6913362DfC8tb9y4sVWH4y4eeuih7Tr414HPXlywXYfn7pTfFyLr3N/9/hIKrjoH+N6tOnh0Uf3pf1mHoE+H6tL5HbBbB0oviqdDruuAUjnLZ5999qgObdyqceWLk13qetBdXIGC3nRC+s9+9rPt73znO1vPPffc8rXXXls6ZLqwtuPw5sLjIb3ksg503nEobh2GvuPcv9KXFdst+7BiB5W/W31eKvxdguuSO2SVeKd0lfZD30fl3i+fAzMO6qTgvTrZ+lA/Fb9R98N0wHpd04HpR1evXj2sA9oPHLhb+Uc1xsUTTzwxYb/yJ0w77K5eHnkuvqxbYx50hyvw6quvbtVeu1zhTO/L2jenvbGwuoCp2mPhCwkVExsAAEAASURBVH4dUH2jzoi+XGdUy9kp/P6yfA/WPv2nynnQyzf0VfD7oHjx/vvvL+pm2a5DpOH3sOJe8OPe2K/4dXbx9dryr1YzB0c7LP1qxb0U+0b1e63y9msMDle/UZg+Kt9Bjfmg8o7+/Oc/+31gnAt7ugMcq93Ehevp5il70AWpwOp38tZjjz3m+WC79rP1zAqLy3evX9/aKZwWRmrtl4XXekvJ0VZBZaLD2qO9rMmLprxg+2bf/w+OYN+LThaFzcPC4mRfv359rzD9Qb0/qfC8fa36fb/i+vUiqDosfbnHV1d9F26LYfo9vwdKn15cWbH9utf29KXfwvhBzWe/5lVmOQ4PJ1zXs4j7aFm/awauq7gXiE687KMwO02tcJIpWm85XhCF8uKPE+2OQ5/qJ3wH59PLJ2EZZmvvfq9wXi973y5ML94tzNqH3y9sT3rleenIe3WP7dXtcb3m8IG2nkFK3yt869defXDlypXpGk8++eR0P5V/eq4pOeG6+h37dRXjDFH2wAwpuOMP9Rxxa+gFS78r9tKcvDCn1M+d4CzY9mIcWPVc4eU+xli4nqSXQ9HFo/ccbdn29+m5pCQsT9heyVwrmCan2oznkKrEHaTaJ2qL6RCcOg8OydS+r0XWxxraTyOtp/W1+WLPBXBsbbUXf2DF4j5nyH1Q6udOmZ/5mAPcTs8TJYNxzyDwSsK0eNfFcNpqF2yT5h6pBq61ruVPfvKT5YsvvujvRr5Bn6wCATAZPKXWvcfE+Ojy04bUht8aWbfgAm7Z1hZ+2V6i6sV8pIcM3Psv8wujzKWPPzgNrmEZdyzHzj1wK1z7+xOn1mR4qu3AdVXkY5I9ueq2rJclB48dV8GZuqOpziVT945fsaxRxwIfHFhnOgxjexh8e86wd58HXAerwfV8v4bhYD25bHNNDezPYfd5apaadjnVezxfV5U+Jq2eNdQSwWnHdXzWIaTWqT1f9mS6POskbj+2njBujee4lmuvhmvSc0fuo1K/cMo8+z0Kt+axCdcwzk9GD87VoteAbf7BNalmroVz7QnXK7vEoNutwMfAtRojUu2tg3vAmmAUXAcLc1zLy3NHnkM6rmEbnwUKtszFvWq8cIrhl/S3I7wGy/Q8hwT72a/VQlyN9IXT9xzXaosGro/rcMufDcfBT2oXnOoDXtWfTxwFy9Hjz/4sN+tlnbTHdGuK5QbX2aONY/47olxnjsw396t5wTU8dywH4/msBKaj555Qo9wXuV/41Imduqtn5zKP18IaMi4y1RwX9f87bNffzX6Ho9Q/WFEb6xEcy0HiOLiKrT0fDpbTlxjdGuBcSx6yLtHtw3l2Tns5F5FSh45Z93GwnL26791yc7/DeWx68B2sp64ktqZiap01KnWtGw8i/Ru9/HNF7t3CtX93neMaLvnMCa6C79jBmjyUz9/41SrPunS++En1yud0dJ/nkWLRS13/u4m10D+ck/Jy3VLPFZknVsf8TjI/GIZJvuA3+7p9XA4ZHY4xP3x3PPOpOxldX3w4a5mxRPJHL3Vr+dJLL2393d/9Hf+5IrguMu5NuIadzAmWoptj8Jl9F96CZXnBnbhcFL/a9esFq+L0kLbIWshnJwf+MT8f3TXDpX4hZG6oYyjYIoNFc6HDGz+8wicdRrueNsnRd2+bPvSpPc71+aKrE9sY6cHwJlnh4ziMMM4TNVwHh5kzO9hVA7b6BN/0+EudapA28esL7ro/GOdP/3Qkv+PaNVD6s1+nTzHrp28YsObiPvvzOaB+YD3XK/Uzp+AKzvKZBvzZi4Mvsa4Hg+aQWMcsP9t8k0NPrr7o6YfkUzN5YT6xrC851+Mj13RBcG0+agIPMBM9GGSj4IVUO6R28U+O+pH2+kq9SJhLHbVPDB5zjfjZsJ82riPPOvmdnb+vrpT+UDEJ43g+nnJ9ZmQ87i/7rb/38nmH8RlzWF7wFnyS0YNr+Xzs6MlJX5H6jE6m/0g1pJNYvaNHlmu9JvSJziOuV0M3x77+wRhf5h991WTyq1Nvxw5+40/fbPULyRUL8+daJMrerR1cs8W0ZVtj++I7K36k5KPFpD3b3m08nxcZT+4zB91htv/nI1gL9swhOqltsEkGv/T4k6NtcqKT6pTrxN4ke51T62p6Yi1i1/+edf6eQwx+9SwSHK7nI8RYkfmzU5P4+ZKnhuLzWslNDh1Zg+R2HV7jTz/BtVjXHWoL0yQMPVH8+Eras/FpuNb3fEzluillPPN2se2rMOxe+2OxA8HYxgdvxq5GneGTHWzLCab5g+X4ky/W9eA5Uj42ZlJ+7FLXenzywuJomm/h49g6Zz+Ne/b/J5lr8ND1Pm+TFeukdiF6z7EG2cvlBL/J0XfX5fTraasNypjgBmb+UAzXTxc/VvxM8cPFcJ09v9Q1Teu1slzzdui0Nr295983iu3Rrxe/utL/VBI+9WHswRgJh/ykGomT7Oja0vlwb5+28aWd/M7ycv3Icq1rnHh8W/VdG/qW/09iUs7Zjw24No+sl9qg4DD2sfdDLAaz6kvXXo2jWyt9YDH9RE9b/uilrq9J7zE52sMLHMEQjH+l+MnirxbDN1x7Jp/TfJ30fSvqbXp+1+HaPWa//l3xb4s9Y/9ncXCtn2CQjD7Hq3rJ5Q/ee775d04/fNp1ji+ywifibDFz0W6ihuu4zpU85Tkk65V5nphzTTB16H65qR3soUix6PxsbD/lty6IL3iPTepXXvphw7T9Orj+i9I9izy7knDtGTvX0gaxN1HmkrnL6bldl4ONKeOHaxi2X79a/OviTbjOeDoWjS02ieXxh7sf3ns8fUZmrmT3RY+s8EdIbCLYrv+nLea5khtw3cefOWbNxbre7eTypa7WHInF1zHB1/sLdrXhD2asKT1xsTxXw5K9234dXHvOnuPaGMKlniD9ocxhbh9HT8aNpY8Rrj1Xw/UrK7Z3/744+7X807A2x3JqlnxSDoov80lut2+lH/d0/FPuRwg2PuI8J45b4Fr9UMcTO/O1Tpt0OUjM/ksmr9QJD8EEG7kWH0aumeuzk0/y+5sM+91v7/5VsecP+CYfXHGu3WWFTlCuecJZRh9z1+X38Yj5fM+9lv36lZVufJtwXe71/DJP/dBzrejxJ6/7xcKlrvtMH3xobh97b/LzAuP6JrNeh1KvYIPddYns5LHpcItOi3V/+uTDyF4IQ56t/d3422Kf8315JX3WZ8/uWCjzxDjYKH0eWyd/ZtyRyc9+nXHCrvvLv8P4HfK7le53SZ6XS50ofZFzltB96X9quIr1nFvpiXdJRxnHsTX7eZ5xPZvKZJ6yh6vBzdZf216n+XqIp/08b972dnLtj68Vw7Q9EeczbPu1Z+t7i10r1+t6uSeajyl24mRvz5aDg+08+8J1Pk83nreL/U6B603UxxM918810+40u/u7flo7ftf4SO5Zw3EKkYkMOSowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKnC3V8AbltXAl+0nqoNupy8i10G+23Wo8+7bb7+9U4ehbuPy7daho/X9wTqN9MaNqQ27DhrdfeCBB7bqEN2PfJeP3wHU3uTsAnW47qIO112U3+HVE//xj39cPv/884s63HpR/S7+4z/+Y+t73/teXthwPLDjn17Q/pEvNPaEod89FaiXeO3UYdQOdNj+6U9/uvvXf/3X23XY7U4d4jzh9PXXX999+umnL7/11lu7X/rSly6VvOe+++7bqYNwLxcc7y0879Sh5ZerzaWSu9pVbHq5WmF6pw7PheftOgd6q3B+VPcAGDuMvaB6ANNH23WYdJ2qPp0VXdjcr/YOQz9855139qv/o7reUfV9+PWvfx2eFy+//DLML90D9cL+9QsZBq7vDtzC7L/+679u//3f//20Vz700EP2z0uPPPLI7pe//GV77W7Z9xaGdkperj31/sLepXLfV7h5sHTYva9iVwq29cK03QcKfPfvbm9fqk36Hnlll7l9WT/2ZxiGr8LmsuT0kjKArVwvrXQw+kGZdVj68upisX1QtpftXCu5z194/6Da1uUP92rfvuFA6drTj2qvdqD0kcOk4fqXv/zl8tVXX13UwfALh5NWH6439usqxHknuP32t789PRvUnmrf9fvfC/u2Cwv2z3s8L9S+CH/3r/bUK3WO+pXC1D2FoYfK/3Bh7v7K81LL/714evFO4Xl6liis2A/ze5+EVT4vEzk6qj137+BgHxDts7U/3yhUXq8EL164Vlj3orP96s9LR+qw9GVhd/fq/v7h+zBdfL34vcrbq3uj8L4D1wc1nhsl965du3ak79qzD0rUcI8Wdf8dwXXNeezXVdTzQLXu055XY400bNjdfeONNy7VfkX3e94BNqT99P76fX259rQr912+/OBW7aXlf7hw8XDhxIvP/pfi/63Yi3SmZ4SSn5SmvbEak/CN92rcMBr8wixfsHyjxuElP+/Casngfa9w+kHdV7DPjz+o+RzUfKb9vezcS+6To3reXtTzUO6zXH/s11WcL4pmmIVP2J0wWxLe6DAZzHrxzX0r24udvLiM7eU4DxXD6bPF/+vKhmFt7bWfFr/VxakUbAdXMOglPtMeXTI4nXBdtmcNuOafnjtWNj2HH9D9DnAgAqlP7PfD9DxT0vVgeuC6ivB5UJ4JPMPW3zJzvMIY9ozgBU3h4BY+4TQv3PNyazFYhuH46XLZ8mFcX/rNfVLqZ04d17AMd8EonHr5GkxHj01ifnF6cB48iwXj8J3+s2+TuZ/yO2Ps11WUT0P23J/97Ge73/nOd3QT/GbPtU/SYTj7LswFf8EkGR1+MSzDKx1mSTnZl9lwDsf67lg2js+TbgfXcBpc26vZZMc7HYbhO7jO/QHTN8N1MA3jA9dVhE9DhWu4xQieYDl4zu//4Br2YBA+SZiETTifYxau+eDXvkwGy6Q2cJ/7hTQOY/gicZ1nBHgMJuG04zc2iTft1/LhOP14BmHnOSQyzyID11WcO0WeN+pF4MF1MH47uM6+bf+F79Nwzf94cbAfvM9xrY9g+izhGi6zL0eH5ezXt4vr+X49x3X26cjxOV8V+ZPSDNfwdLv7NVzDYp6L4RRmyezRwbLP2rJ35zlEzF5vn05fZ2m/zt+OsJx9OXp/DpnjWjt7Nb9naW3s55twnb8Z84y9fh6qz1+iV9NBt6rA6rmj74uwFCxnn4azOcNhOM8RsAqbZP72C36zL8/9wXLwnN8V1cWZIvsmtq/mOQNGYRau86zNDo7jt5fDtXx6nrW1wfAe1n/04DzXDrYnucJ6pV9sWn3O5tk3ODVh2IxvjllYEgtmo8Mpnzjs2ocxDJJ88BpcwypdO3qwnGeStM31zyp2a+ifiII3mMx+HOyTcAzruQ/oedYWt6cnh54+4Dv7Oj/dNUgxuO+yzOlvTL48v/BN+3/dB3znjla4huOOaxia4zr44sfaZL+kwyibDqNwKS+YpQfb8C9HjE5GD87lpx99Zo82Dtc5bziHj+ylcJb9F56CX9jLfh2/GB2WYVdbOpavH6zvjmO54sGxdnM9e3qFpmvkXmNPsQuCa/NBwTUd3mGMLzoswhpODGbpfHS4jp4YCZPBLNzKgWU6f9f1gV2bP3hOP/z5HUFP33RkvCjy2LqzP2EBBSMkHAbDdJgig0s2nQ8H48Fp8oJfOXS4DX7pwXh0Uq4cfbGNJ9eni7Ez3mA5vgpNNMXP63PLar+Gg772bHhD/PTk0GPDFD/ehC84DQa1gTtM736YZusn/rTNNeA7uKaLG5s4XZ+wn+eevtfrV1x+n2eZH5uCg+AlEu7gEUbtufCTGMwEj2T0YBD+gk19dB0+tQ/W6Xzdn3746K5LyjXe5NIzLnridG1wiM/nKd2X2LmQhW246BQsm1tw2yWMBCt0rI/giwzeYJEuh5684JQ/upictCHTd9r2fvoYtIVrhyh5pslnJrkeKf9O4DrYhAv4wZ4X4Nm/iztsRo76BUfBI8mXdvSO02A8/mA82NQe8ycnGOanw2Ly5MQm2ThYnvDb7FInmvznHNewYh5Z8+DaBLseHAUf2m3i4FiMHnyyo8NZ9l05cxbv/QTXrp1YHw8fLPuc27/hwLe9O/3mupljhT4xBTPBI4zB89vFMP1msRw4UtdgSX6wNcdix210OXTtu87uOek/feYaxiAWm45I48r45roc30kgxc4l1X4Nb8afNSfnHCyT0YPpji86jCUWXLH5EyOD2+QkHn9yteXrNl+ua6xi8PylYth+otjnhO4dbXMPafNpCX4wPHs+wPD852KY/kMxTKlpMJN7AZZwbBhLf9ETg10x/vjSlp8vbcjEIuNj44wl/oyvQus4HV0EXHc8m1PHNBsW4utY4uv4ovPJ6RiEK36+uV8bPjnpmx5/+ueTl2vGz0Zi9uivFj9VDNtPFud5ncw1Sv3EBAvBYf6ug+s3il8rtmf/rhjm5KJgSrtgSzx29OCRn57rxJ8+SZwc+O/9btJhmT8xbWN3We6JPFtTxM4lrf52NPZgJHpseKOHY3fZcRZMyo8uF8MfyR+cJYcUC66TFznHdcZTTab+/JvkXxZ/uRimSX8/egbpn6eU+akIjuHK34ieq+HbXv2bYrj+dXEwaIzBVHwwxRebxPEHp3KCcbp4cpJPJhbZ84JZMSQWrCYvdqS8uwHX1iYEY8ETHSO+2HMZPMqB3eR2jPc28Xdf9LRNP9XdtE7i9uu/LP6LYs8hc1x7Fkk/pa7Xl34zcs0QLATXMI3Z9utfF8P1b4phE2kLL9rBFj12cEXCJ7+c6Gy47v4y1/jufUYne//02CSSg2LP5RS7QPv1NNn2I+tJdj0pMJIYCWsoki6n4zptgq+0D075u57r8qUtHz1kXdhw/V+KnymGa7Lv18F1+qzwem3pp1HyXQd7roa37NfB9cvl85z978XZH9M2eIs/dvoMlvkT67ndHz15kemLnPvYoeSx6ShyMgrTJ+zJec5+tOeQ00ZubbI+cqJ3f/RNMnhM29hyu554cJ2+4u+5ifU18nfj14rt0zBO5vnD83VwrZ/Q7ayfa4Xgw14cXOdza38vvloM179exUucuP+0Db7IXJvsscwp/thpw0aJp8/YiSeHHV9kj9FP0F2Ca3Pua7tJ777ghq/7Y89l+k8u2fsQR92XPrJmbJ9bewbxmYjPQuA6fy9m39ZH+ulrXO5TKeOSAENwbX/N341szx+vF/u877fF2X/7OIO/Ck84y9j7OOjJm8djaz/P4evxuS3WaW732KRfBGzPJ3WLPbyvc9d1EzsyXbNv5uuxntv96b/HrY81hlVY9jlI9uv8/4D+bvS3KBlcz9c19vx61WQi/uRkvyZvFOd55I+lY8/a9nPkeulT+7BYaO7rdteTT27yz33sOW3yTTlnDcceXgeNCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAp8WIHppTH1JVBfFpy+vFgH+/qS5fYvfvGLrTpgd/Hwww8v63DR7dJ36tDyreLtJ554YrsO9F1cvXp1u+JbDjmvLxU6yDpfgFxfodot64DAvGhhqw4KXtbBpMvKXVbbxe9///tFHY6+rIODl3Xo7vSlxe9973v5Mm/68TKyU7/QmKQh794KwExhdvu5557bqgNut32xuQ523naQc2Fr689//jPMHsAxnJV0KvpO+Rz6XOYlX+DdLblb9nZhFFb5tuow60X5YXSr+oXlA/iv+KI6Pbi3+ig6rPvkoOJOSj+q+GHFHbK+gP8a0xrjzz//fPB9rl/0qzaDPl4F6rCnhQOfqtV6r3zmmWeWMPb4449vvfPOOzt1wPPClkzWAeSL+++//6gOfz6sPfMQLkvfvffeS3vidUY5XG/B8PLoKHvkTmH7oPKuF28XNl1v2kO1qb4P4bh4r/B5nV35e3Ws+geXL1/arxRfeHdY+gF/td8r/GtzUOM8rPuqLnfoAHa4X7z22mvT3v3qq69OuK77cOD648HiXGXXM8KEszpMffnee+9tP/XUU1vXrl2DSzhcPvDAAwu/3+kF1cLuLuxM+CnpOeH9wvG/1KS99G+3MOalJDBqb/USES8L2YexAv3W4eJ4u6wbZnFYgKuYF0TB3l6BGU7369oflD0dml72dDh6XWuvbpnrhfH3K+5+uV7XvfbBBx8cwHjdNzdqTz+se+zQfl0Hwx/W883RI488kkPSF7/61a+WcF28VYccD1xX4c8z1RobfvbJ6LE9FywKqIt6KUXtrbW5Hr+I34s/flfshR9eNuLFlZ3We3l3Nl3/yQHmsJeHYPfGHtyWZF8tfF6F2bJh+V3xle/dsr2M5EaN72pJe7jx4f3C877cwvnUd2H9qNodXrlyxT014brsJVy7R+teLvf5PnDABO4SgiPYIaMHS6S9EVtr7OVL/3exl5o9V+ylfV5m5gXweVnaiWeR8n8aylhgzzOEMdjPvZySD0aNyf7NR4dlOH63mF/++02XlxfxyNVP5hdpzr0uaoPGfn1ch8/kZx3Gu/zJT36SWk/1rh/BQPA4PXuW31rRrSUJf3QS56VN0bNfeqFT8K5dMJ4XmeXllxX6zMhcjN+14Q9OMTzDazCcl7DCL0yL0/mD+eSkrX7Fcr90TJ+Ga3+7GtOgT1mB73znO5vwC3vBX/Ac/Fr/EDxqL4cMNktd71Fi2lhfOpk9LC+XDJbzIu1+/Ur/zMh4jNncOq5hOviE1+gwDc9sescyu98T6S+4znVSo9Qs93Y1r6IPXE91+JQ/UtNgONicSlw/rDefOIno1gT3fZY/aybXumK6tc36Wns4FvOMgb1kEqbt0dmnM6ZyfWa0CdfGGRz3/RrWYRcH13Q57I5xucG1+aqj2vClRqmh+qS2A9dVjE9LnjeqDxzc0tU9vuA6+3KFJixbEzmeLbJmHePlXu/L/HALL9rBAVxr5xnlvODauPtzSDAOtzDNpsN0x7V2amq+A9dVhM+aVriGNbgOtm+Ga1iG0+w19lbrhU/DtX6tN1zru+MapmHbS6+/yP3auPr+mv3auINf46bDNtwG4+bVcZ22aqL9HNdq53qYrqZrHs8hVY2PSVWz+uhJCdcYDqZTVzhVbxjFMInoU8OVnvXgp6ef7EflWu9N2vFja539GZZdz56vn7NAqYOxwiNcwmywGvzCdfQ8g7D52Vh7DPf8+lLb7ANdpoaRqXWlT5+RdJvvotPRSy+9tFuf5wd/5q82wVvqEVtd5QZHpDVMHowhOdZCX2LwJ1fcmiU//ZRr/UxivcSzF5MXhcxLDdUMTtUIdoPnSDWih9UEvvm1i6Tzi+sz/bJzD2QNxIL7UqcaZzzsEB8+t+SzuBdffNH4g2t6x3ViqU3i6pY26gWfaqHO/PJhmJ49lc3PJ18ffNHTH19qm/vBGkUn5Sa/1DNJ5mC+xq4uZJ45SHWDz+zJwTc/PLPpHbs9h18Nw7lGrhnpulgeyR/cps6xKzT9u7+c80zGH5xlHnzBqTogOVknkp2YeoXoYsErnU9/GKk/PXiXE13f2uobx58xyaXLIeXri55cdq5f6jQe8k5Sr4X5YeONpPd9FB7FgtnEgll2dDny2dokl84XPyk316WrgzySPzUyXjaJ+FHmcWwd//RvO8nr/vOkZ/zwgjJP2IguFjzFr0Z8cuipmZqmL3VGwVjwl3j8bJhM3/rQL5Yjbh3oiC4X5fp81lk/uB+e5LOT+NOuXOtx0k8j/SPSuMwJ5zkgeDT/xOnGk9zupxundvKCTX6+YPi0fvUJ8/rv/eor141uzH382oih+Of6ZF+Avz0zv2CNbf7s6OaKgq/oaUPeTM81YEpdrSXy+UXaykkfWR+fc6StMcE1W5wOq2zsby798uvXv5s7VCmsL35jyDVLnSjXjU3muumfhCOYwvksg+6ZwZjEsbFievzwmDjMssXm2J/nsJNLz32Qtnz0zrn+JlmpH6HMNYGL8G/x5o762vJlX4tu7nQy+Opt0z6y0iZiyyOtT3RrG73UNY6ii8Fhas523fSfe0QO8v9dwJdDjPj8/yH+vyb4dhhePgdMH/pJX6VupFw7czdm+zR2uJ3/vyOfacBVMEk33mCu+8WC5ejJ039yoyen95kcvrSlJyfSuMOlTmOKHcnfdTbiO8+k/qivsTmx+3zhqM9V7dKGTD6/XP3SUb+GPGuR/N5WLtIu185Y+NMPX8YDp/KD61dLtzc/vmL4pl8p9rmKPT7XJDtlTPFlvq5Lh7Xs0w6RdoAjGwdfySW7L7qxZv+d63LEkjuX+pzH+bC+MN1Y44+MjwyXekJnh+ScW6rnKN/X6OOPkTVXFxhCqQcZ7PIHJ8Ga+qYfPsxHorSPrj18InrWhp1r8iWHT57+8iwC1/9e/JtiuP5S8VPF9uovF9u7+THKuI6tj/7M+DMWtmcOhzb6t5X/LP5Dsf2aDwaTW+o07uCMnx472NRnsCuHnn7i1ya6fLb2yefrzB/ufjo/iSKPrY/+vFX8oy3OkAeu0QzbfYRq0fGUmHlrTMo57ujDmpZrouQw5IXgKrVL2/SZa7JzL2gXPXns7L/2zF8Uw7Z9+ZnirxTbr8knim+G64yh0tbjch1sPNizrX3atV4vfm2l27dhTS7KnINRbYNp+hynic3z4+/t+eZ5GadYxlvqRIl1f3w9J3qknHNLt4Fr88ua97luqo36o6xr1oMdTEZmDaYG9SN9x68tzHbKOPjo2D2nT3voL4t/VZz9+tnS7dd/UQzX8C4mP+3TZ2SFprFkPKSxYLj2fYTg+pXS7dc5lDR5+kq7Pp/oYvTkRyYem0w/ZDh56afL5JBzSmyT/3Z885wzaxeup/nXft3XtY9XPLGu9xz61E9Ja9Hz2Sh4zpp3nxzx5CYn+OPPtdOP9vLYGK7/rfjXxfD7dLF9uuMapsW0S9tcq1wnxu16fU7GANdvFcP1q8X27I7rPsa0z9jZmd/cl9zkxE7eJlndTf3JRb3tsWfzz+Rvjl4Q78fE9c1mPa9X8MKP2cgaBVNdn4Itnpzuh199RSaH7bMQe/VviuH3yWL7tOfqZ4r97TjHtfYYRdIz5ujB1X45guvfl/6fxXA9fw7xOyR9dKkfFB+db+7P9SKTf5rUj1io63NfYpGJXyh5G7iezzf1mOMgtvgmvfeTPnquuHZ81jN9lLr2xycnbWGa3176SrF9FH59b9Hfiz7n8zckXPv8T0wblLbH1oc/9R3KeEjP0HDtcz6fJ8I1nc8zrxyc/s0j2Cx1ikUm93bsnkNH+kW9n2PPzX/KvysJ1m/yXNJrkhoFb4nN/XNbXvfR08fcnz7FE+v59kZk37Rn+4zCs4bP9fI5iGcROIfp/J2pv3CpH6F+reCT9Lm1z158dv2nle4ZyDNvsJ39ulwnxpw+u58eEk9OZGJdzmPBeM+Z6/M28/iZsgOGMzWoMZhRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBL7oCqy+A7vzsZz/brgPR+nC266DQnToUdfqOXh3+vOMg9Tqwevutt96afHVwbr7Y29t9RK+DSacvLtYh10sHkOI6wHR548aNyb86jLR/uTFfYpwOrv5Ih8MxKnBcAd9gXn9pvfC6C6+wWhLvvv/++zuFs906FPdSfeHZgemX6sDqy/fdd9924XK3DljfLblTB07vaFf6dunr76VWH8vybZHV1sHAdSb1YlF6qXVKcFH1fVSHR1ezQwe5T5Jeh0kv9vb2jkpfPvfcc/AdjOdw4bGOd2EFCrO72W9htvbVnQcffHDn2Wef3a0DyS/Da2HnUuHmnjrwebfse+tg9fsLvrsFt3ur/f21Z14q3N1T8gH+okuVe0/Fdxh17nPxh1+2r1idl748Kj4oHW4Pqt0NvpIOoKY7Y32/ur1ecfpB9b9XWD+se+CwsL1fe/+E6b/6q786fPnll5d1yPTi5z//+fKFF15Y1u+PgesLiOcf/vCHO9/+9ren3/UPPfTQ9hNPPLFbeL1UMLPHXip8XobTwsm95buvsHSpsPNA4eiBws89ZT9Q9kMlLxfGHi7/Q5V/f0kvQ7siv+Tlwtj00obK2a1981JJ+7sDFKcX/pc8KFzuw2/pDkH3IggHqF8v3/uVtndwcORllu+XDdMf4BrTfrW7XvJ69XtY99Je3WcOVYfxw9r3xRd1vx3VGI7qGWfaq+ugoGX9/hi4roKeJyo85Jkgv8fZXtaB6Zc9AxSG2fddvXr1/sKA54MH6hf9/QVCLxZ5pLDxYGGG7qUiXyv2csrnir0casJsSS/RcZ3p/iiJ9MsX5kNeHIKnfRg26z0gpW/dKP1ajdsLdUgvHoHJD+CaXvJaYZO+VzpMXyu8HtTtd7324OslD+p+2qt7ca+ebQ5rfoc1Py+eWqz27MPgunyer3Ger/O8Xa5Bn3cFar2Dk0hDgCEYW2O2dFjDDtbA9BxIAKdwyRbzMhwvx3GgqX2W7cU4XgDFTye1c43beRFUpZ14cU1ehAO3sMYm7ct8XgaF6V6eM+F35WPL9UIfePfCquSnj/QjhnP/6M+LeOzTfNN+XXLguorwedAGzNr/ss/CZXS4CsMivMGngwbYOBjmg+HE6MkJltM2fbpHcp/AMXIfhehw0X2xu5Qf/ARTwTO8Yc8WMAmLJLzywTIc85O4+9OOxPJIONcvGWzn2vCNMyYYz8FHfIPuQAXybLv67Cv7b/AUDGffjYS94JgMRmETlmPTg2X7rnjwTo8dLLNz7dxDxmQcc/okuA6mSBg8Ddewjee4hnf+YJwebAfTJDwH2/DsOgPXVYTPi2p/hpngJjrMBF95vgimSTiEQZjGsBuc9v2343ruTz6c60O/9FyXzHgyvnKt6dPiOtiDt+AzGI0dXPPD9Gn7tfzbxXWeRcZ+XUX7rGiFaxjBHUfwHIYxDM/BNQxm357jOpgNluV69oBfMXt3dG3Tb8e16/QxlXmCPgtcw2b2ZFgeuD5R8vNjfAJcB98wCJs4uKbneQN+O67n/k241o/+3U+fBtfVfKI8r2Zv7M8hfb/OPg3X9t5bPV/bt2G+3wd0rK/0neePPIvk70U2mp6tHaL8/e9/f9KP3ePnx6nA6m/C/E7PHk1mXyazN5OwxWc/xcEyzAbLfJ434JQeLIvT+96ddmLZ6/mC5T62cn+mBOsdZ/k7Dy7DeY5mB8vRs6/z0zvG4Voef/oVd191jMc2DnruQ5+pn7ArdtdQ4TQ4zJxhFEbyPLEJr3zwimFLPglffMFn9tNgmcTJzf4Lox2n+btRf/qQ75qfJ2brcneMYA3Ggk94tafnmbrv7x37/MF3ME6mvZg+2embr1+LHpt0T1hjku1+mKj+Hfao/vb370nreyOx8yZXzxBwGQquSTiCp/iCd7Lvw9GDa3H4zT5Ksjvm6bAMw9Hhly7XPq2f3Bv04DzXNz5jC5f6hVLwACvBHPzk2YIOq8FhnlVgMtimwzY7mNWenv0dHsWzfwf7/brBrBh/cGyM7MTpExWuF9/97nflnXta4Rp2QzASLGfPDr6zZ5KwxQ+HmA8G6fzBYPywqg3syuOH6Y59MW3jT9vkk9FzD/Qx0LVxncyDTRcjUdePPZt/WvNgNXgIJqw/H3yEs1eyYS42ibWZYzz+7MPBL7v3o22eSeSkf+NJ//LlZWzy+OZjNu7kZH7lmv7NUv65p9XzsrUPdQxED15IBDfBNam9WDAXPTjtWIZ7edp1nNKTH78c+fGT2PVwHwPdeNOGrm1ykk/qI355nTp+g5fgIhgJdiLFN2FcXJtgl50++YPN6Gy6vVhe2sKna2QPp8O9/uhyk8Puuj74MN04M8fIck3k33bknHta7dfBq/kEy1lvOKDj6CTWLvhgw1Fi9OCKDB7j0y5Ypsevffcnlv7l0XPtXC8+/t5X8nt7vyOMRy7OXEtdYwA24AwHv9Yci2G6WPAR7MTfc+jpp2O2+/jZHe/stCWTE79rpo/ork/PeIwvPnrGG71cx3gvXGtzIaiwbc07Za2td197eR3jYnwd22zcsdWx2XU5MMwXTtvgsfeTmNxcJ+NjR881IsXoeTYicfoIrrPewUyef9nZE4PZYDN4CYaCp/TBpsubt4VTPPfnWtqF5czz2blu+o8dmTmxw6We0NlbP/rRj5b1b8dyLgRtwHWw22Uw06X4HE+JB5fB1NyOP/s43OH45esrPn7c+xE3BlIsuhysbZ456LDsOT9/r6Zv7ULBD2zl8zd637fnuIOF4CcyWBULrqNrHz0xGI0uHp2c62kbLEfyJ0YisYyJj466PjkuIK7holPs4CTrHux0f/DGR4eVxIPN+NM+2JSbHDoORuny2fHT05aOc60uYVmedn4fRPf3KIZrn7eIpV3WGw5gDI79P3cYrtjBdnAuV0zbcPDSY+lTTnR52pI4e3H8wbJ8nJy0iT99Jif98dP5UffHltMp/+9U951bffWM3cdvrTGCHRRfcNAxNdfZHZexya7DbXAdDIvTe/t5LP2QfTxlTv3DdX4P2KOzZ8N0/p9A/w8rXKcv/QQHwa2DGzHM5XM1uArGYUas44OPjRPTr3Z8XecLTvnlZwzxd7zyxSZzrd5nrsGXcdBRfPTE6BPVfr11wZ5DrG2nYHjuC474owdXaRM/CY+JB5vs6HKC394+bcnOadtz6Uhe/NmnIzuu/VsQfMM1zKf/UieCleAWpt8uhrd8DgdbcM/ueCpzomCH1BcK1kg+fURPPrv7u16hNd47lruufbj3GV+kvtDc9nx90XAdbBzP+MOfwUnikTI6jnreaf5gWW5ygqm0jz85iXd/YmmT0bKtlVy/A7Jf25Ox68MzXHsO8X0ZObmG9ghWOq4dsgvX9uv5Z8rBaIUm0gdMIWMRR91H73hMjMTaJafUSU+s28GlWPxk2idOhuJjd/8Uvwj/zpiJThM8/u5Kd3U9601GF48ef7fFg8Wu99zE+eiox+OPr8d7/tSw/ZBvn4ZtWIbpPF/nudrfjnkO6fdb8ATH9mSYtmfbO/McApPisC9fDLkuCl7IYC54SqzjPb6eQ+856Zdfn/PcHt+k86G0O7Y2/LxI2K7n66zJhpmuXfMc9s18iSVvbuuYb47ReV6304Yvfr45Bc/67nu35478Pylkf77WR3ADt9h3uGAbdu3VsBxci98M1xVe9xedRMEm3TVRl8Ffl6flTI1b+3le4t3ffSf0i4TrExNrxga8n4al7r+VvikebOfqyYnk36R3n5xgI3iGb7junM9DYDzPJ70fmMt+bI/O9xODdRiHbfu5XIzSBznHo3jG1vX45lIO6v7ox5EPrxE7cp7Hv8k3fYc+jc6S9Mt20KjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKwCvtyK6iXovjjoC435cuPW888/ny88btVB1cuHH354uw7Q3a4DU7e/8pWvbNXB1Ys6eHSdP+t6y8HnfE899dQkq+2SD9fBwMtvfOMb/cuK0SPP7JcW5/Mc9hdWgWUd2rL14osvTgOAqcIsfcJtYbbOyt1Z1IG4W3Uw7lbp23VY7lYdrg5b23XA71FhcZe/Ds+dsO+L0HW47hTXUfW5Nd0g9UP/hfej+++/f1EHSNMPqr9lHdR7VH0cPfroow6Rdij64WOPPbaA+xrDQrvqKqzbNcYZg+66Clj/ad989913F3Uw8/abb765LDgurly5MmG3MLZdselFHoWtg8LvpTqkelH6hMnCnkPWj2C1yJfgdwuiDljf4a7ud7Y/3Jmng54dcq6v2ofZB8UOkz6MXm0P6xD3/cLwXnXvYPXDp59+2kHU9KPa74/qAPij9957b/nyyy/D+eLnP//58oUXXph+f3hp06CLXYFvfetb2ceWb7zxRsFiuazDxrcKF5NeP45qv7OHennCYeHLAwaM7UkobN4o/Pne/0HhbL/yvFjnUrW5v3KmlzRUzj3VrjA87cWawa199qAkPDpAfa/aXofdsusA9YWD0/XHd618+yWvl7xe/WnnkPXger/2+zWuaxxHf/rTnxb2b/fGL37xi4Hr8w1jzwXbeS6oqQSzW2+99dbW448/bu/yPICXhYUFjFXeUb09ZJKlHxaWjgo/MOxFN38o/b2V7oWUXmzmZVBeLgLPbPvvbuEs77WYninKX+6lMdS+62Ui2w4cKrm8Xl73yXQYTKW41tWKXYXf8nv58LXy0T8oea3G5IU7XlZy3fNHEUy7pw5hup51ppeXPPjgg353HNU9uij8+x1jXji1IFHksTV+fiEVgNd6Xtyuv8Ny/b5O0YNNa5v1nPbZsj0DwIkX4ERnIy/61YcYH4zAKwnDHiKCY23hN08PZMeI67GNgW4cMJkX95HwOWF2pbsOLHvBTvwObqTL7XoOkEmfrjFhumTmmuumBuRUI4c41v5d5okxswfdwQrUHrXa0tY4CUZI64FgJzih930RzoKx6SG2bO34s+b6svZwwgcTcMqe9tuSeUkfbOvHNfSB+jVyrYxTPOPMmDPW4My1XRPTg+0u6fCbAxCmvXyVS8fBMmns2tBdh63vXJvMeMhNXO5Bd6ICP/jBD6Za14FpO+0zsI4LuLE+3adN8MQ/9VHS2mH5WVMyaw27wQm9M/zai0kYhutgmXQ9eA62c/1IYwj1sdL7uHJvBYvBo30YLju2p+eP5svYyZ6fvjquzVvfru2axrF47bXXls8++6yxbuJyD7pDFUh94YWu/nTr0UkMJZ8+rdVKZi8MrrOmwY11hgVYhgMSdvNsPMe1fRues1ffCVxnjMYCg8YW3diCVdIY4bofHB1ci0eXl77oWJ84NVCTXqvUcC4rbdAdqkDw2nGdrhNL/eVYH3awb83YwYy49cTRrbU8OMZiJGzDBwnDXjBJYnGYdh2Y/6S4DqbIjBHmOgaD575X02EatuUaJ6bzBfuR5iSmneuchuuMp1LWe0TqyzfozlRATRHc0GExlFjqLie4plujrFPWMli2zmJ9reHXPtxxDRcwDLswEVzL3YRr1w2XOulkxho9Y874yNNwPcdzcN73a75NGNcWB9fmm1rAdq6bcRhXajyNsT4vSk0rNOjjVmD1N6FawgWJoqfe6t9jcqwPkmsNsi5ys15yrKeYtbXObPjE0YPz7NeeQ/K3Iml/hmd8p8m8+jyN3bjh0rhwMM1nf+5YzjMJn5jcyMyLz9zTZ65h/qlXahY746qUraVDvkjGXUo+I/L/H5h+8Kl+9rw8J6iPGH9qxUZpQ8JR4tqi2NlP5EWXH936wKRr5LrBOQnDuF+3zDNN5m5+5hTsB6vBMxuz4RrGce6RxNMufv1tYtfC6tmvz2csKPdE7MlZf/P7t9BJvwA/zB1nQnTzhi1s7mLqgmAxuOvt5PEjujzt9IXSR9roL9fIOuSzjKnBKu55WR/uMzK6Z47szfRQ5hH785DmlLoZn/nAX3BHh0v+4FQMftn2Zrie6+knbeVpxx/d9fSf2vCrf5g/Ommcselrguu1cf6VrEnwkHl3jJplj9NTA3VD7GBZW/VH8Cgf00NyMeLPdeNn0/XrGnKi8/NZX9eK7howLs6vDR2R4ijxY+v0n/rNPDM+vtMYpoxJPLo6BONiwS49ezRdDo7e8auNPvnil4f5I42VThovzlhjz2WlrClzXTvOuWKuyLpn3mzYYKtNYqT584kFK3Q1RdG1x3JI7eg4fZa6jvEFc/rQxnO1dvx80dnZrzOeXCN9wxYfkp++4R3+M/ZS1+QaSJ/BUK6rX35E4jmm5ODguuty+dMvHLPlBPvJl0NPm+j8rsvuzGecfNHJrovPuVxrkntRKPM0H+u8yc5czTu4DCbUEbGtQfzJE0Ps1M010pcYXT9wCnNy5egP/sTn+3Xs4DWYJfWlD5jG0bURJ3HipU7kmojUBwwFRxmjWFgOFkucbdzh9MOOHsyn/7k/8fQR7MtPP9r0a8bOWCKNtesZOzmnTb55znmyzcfah9SBDQN08ejBCD9iq2lqQvb+up2cSpn6zTWtVcevuFzXJF0reCx1ul5sEssJTo0HFmKXOunBs2vhxDOOjFVf6UM/7PiSExl/pHa44y/4lBNs8gWv9O6nJ5Y28z7ZYp2NKdfP+NjRSRT72Fr99O/GdfDuCd85N8wza2sqmf/cx6+OoR7n6zH1nJN4+o7UBz2cHDbcseGRTIy/4zpt9ZU2cMEO8+sHnv1ewPpIvNSJ9OU6sNafE4KjXEtyxpRxJYfE+hCL3mV0GN6ka9v96YdMTJzdmc8YUeYSfXKu/MmJb+suwbX1RllHtprBBw6pKYqv4yR11wc/mfapKz9f1gb2QtrDHko7esYhl19f2bP1B48YiWdMwTPpM0PtxTrpS//wpg9/2xkbn1jnMtfjpstJXvS0nWOcn8919ElPTteT1/uRH5uea5W6Hk8fZ/JJlNixdXF/mud8fTPb1EI8epfqy4YflDy1ji4nuty5rq0cOEvfpU4+eE3/wTCJs9+mjX71E1yzHTBK4uCZ9Jli2ieuH+0xvPkcAq7NJZgrdRqPNoiUj+SlPalN+uyx9JV+5URP+9PyEyd73/TYYiE+lHi3jyOrn3fBfn1ivs1IbbKWwQMpFglziE1X50g+1PtKWznx95z40i+ZfkgsJwSTOJQczyD59x24zn6deK6T/RKmfcZs/MFiqRNpE8q1gzV2cJk+2XQ5yZvryblZ295H+sk1Eut29LrsRGwUeWzVzwuI6/XcTlFSg01rmSZyEieDQf7g1Tr0nN5v98ufr5l477fMtZ22wTsM3gzX8N3364xVn64LV/ro+zUfzjhKnShzMxdt5+PmTyx6ZK6lIzqa97HJ7u3pIbns9BV/cuYy8btRphbWkx4MpRaJdzu5fHR17tjh5xPjzzqw4yt1nRM/n+tlHN2vHzYKLum+r4LEsl+TPhe3X6O01a+xBMPBNT+cd1znWtqKIzKcOcWex+d28k6TPZ+Okhs9kn9OPXceu5ttdclapg6pX/yxE4+fvSnGF3ynDd+8Xbc35cFWJ316hujX1Acc5+9F0vP1vK02wbXPVNIPXKe/jIfsuC5zInnhlWvdln1aLPdCz8k1523Sb5fJ7b70NfcN+8MKqFvW9EPv8TrF33Pmetr0XL45tvnkZJ2Sz4/ip/dYMCaez0PkIHni+UwExjFf+tAOZ7/3LAPbwXSuS2qHIhMzl+hTQvuxyT/3ze3WfK3KuZ08DTbm+f8y172dMSW/RM/YsMZwRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBUYFRgVGBb74CtQXBKcv2daJfvnipEH50mC+LLlVB6tPOfXi/O06nHqrDhSduA6C3qkDSNd5mc2rr7669dWvftXB6wsHBK8OQd+ql+7ny4iRuVbs5Vn+wmLmN+TZqICDHGokE/4KWzC686tf/WqrMLlwWLlRvv/++7t1OO6yDtDdroN1lw72vX79+k4dtr79zjvvOLB3TfJXNPVZB6I76HJZB+tOsto7JHrCaEkH+S7099hjjy0cLvzII48s6tpHcqqfRR3ivlwdmq3bYDtYX11qiLupAjDzj//4jzt16KRpT/h47rnnFn/84x+333zzTfjZeu+99+rc5iMHnS/ZxTt1aPXuffft1oEVu8vC5U7tqQ6MPqw0X0yH43JfhvH1F90rBseLOuR8wmMdGH1YOXDr4HQHph8VH9Y+PR2sXvpBHR69V9da1D3jAGx5hnJU/urmcPnwww8v/vmf/3nx9ttvL1944YXl6hAN/Q9cVxEuGnkZ1wqr09Tsr/U8MO2HMPDkk08eFX7gDq4OC6v22MuFoYPC2rL8lwqnO+LwCZO7u9tOLxfDsHtQKZcLX9V091LZ8o9PTl8e47fiE2ZrEEelw+v1kvB/o/LrgPTdg93dnevl/0B/xXvVn4PSdbpf47kBx4Xrw3vvvXeN69q74X9ZvxMWcP/zn/98juuLtqQXej617hNuapJ5Ls3etHz88ccnvZ5hjzzHej4tLHjpB7K/TS8EKcx4qQjcwqcXiRS+JvzBngPVL5f/Sl3rgeLduhnuK/u+inmBzvolOuXfquF4LsHL+q9eMrI8qkHsV7vrFYPfktteqgOTruMgsIMawwcVw4Xr3Q9wjY8/L5c6rP73i2/Y06uNeXiJCX2y3WP1rD5d/6WXXsqzyPFYKmnQF1+BWnsvE+8HkhnUGrMrPWs2rWX5rDV858U1pU4vwvFOFW29qExcHh8djsWQuLZeKgmvXv4kfgK/ZWuXNq6tPzapPZy5V2CSDsf09M3OS6PgOrpD7uSIGwO/fqb7oGRiwTLbNWOnDqmLMS3qEMdprBfs5ew1tbNHwW09H8AIshbIGiF+OomtsfWh52VK2rCtbbAFB1hbWPLCPTaM0h8ohtW8jI+EcbLjl96vVeZExoD1H93YjIWPDm/YdYNNevZeEvPBcnAf2fO0Z6dfbfTtWrlOrp0xsaex/eQnP1nCtXqXb9AdrEBq+uMf/1htYYVc1351KThKXCzx7IGR1jcc3MBDxy8M2+/46F6SSgbLwXWka8N2pPsm905kuSYyRhwM0Y3HeIO1jsGMNViONOY5rjueo2svL3iOzLVgO9eexvTss8+mdhnrwHUV6U4TXBepNYJrNK89n3VAYuHsxZHWMViBVXqwa82D5eAaduGaP7gm+TE8h+E6HDwbb8Zc6jRG48z46Nk/O9b4YDNjDZ7n0jixscN68E7K5Q/3ubtW7nVjYU+4LsleY5qevaX0QXeoAitc621Rn0ls12dPk14/Uvvs4fwIzhKDQetnraxr2FpbdzZcz/druODHefaAYy8I1icWyz7NDqbJm+G6whOGgh9jCK4yPjJ4hO05noPZHBwtdxOu01ZcHUi+Oa6NRVzdMq5Sj+s4cK0Ud5YarqfP2grXao+CXTosheiJWStsHWHFmgYzsEwPrsWCZbiJ3p9D6LeD6+zTkdVsoowddrI/GsPt4jr4Da7t1bAd/3y/Nicx+Zk/OzgWN6Zcnz7HtYOgM+4KD/okFagaLuq5I3gg1TmUmgfH6t3Xgp410sZaBjfWMAyf0eGXbb1hHQfLYn2/ZgfX2aON0f7cZZmnUsdIxp85GHvuw4yPhEtM7/vy/DkkzyRzvKdt+lET89VfrpnrksE9mZqXerxf1GcjfHctuc/r772j+vfirLtaZA3VJrhVZ7/TkdysfeL8m3Rrgkj9aasva4PowQdMJs8zBVs8Oiznmdl943oo8tj64n+qjXlg44dVEt7p8Brsx0fmnsjngfLgnz94D9ZJNRTTN46tzq7NxqmpcWG+rF+pW8v6fwe2/uZv/ubC3AuF663Ctc9AO64zPxJmghv1UQ82mT251AmzyYP/6GkjJ35t7aXphx9eXY+ftE782sMzPeuXfLinW6fgnK3fXD+yXHeMggkymCEzPuOBu9jBLLvrMMvufjjl721hWp+5J+iJuy7mi25cqSHJT/JnzNHLNfmzPuDnAABAAElEQVTq35yO/58ujvNO9uvVZxlzXJt38KEuwUf8pq5NiF+tUfri0xbRgz2+4C/+rAt/+gpmxbTNevK7lnuBn87numTXMxZ5GW985hRfqRO5NoKDjoXYpHHEdu3YdGx+8JnxBpdsevJgOvsuibVNjvzcB+kz/ZPi/CQ2JnbGFt2c6GT0Utc0zRkW1p5zrqxwbT7BrRmpSzAdPx9soMTp6on0QZdPV3fUcdPbz3V9ahc/zGrLn+dk/cfPZ63kwLF2dDK4jl2uyZ858aPYx9bxT2NAZGfjCDYyVjI4oxsfltdxl2cFOcGxHPgN/iO1T4785ORa6Z90DX59kZifNPbIuZ55VMqHdBfh2vqrDQoW4gvej6MfYoA/2BRLben8qXFy2NYCFulZIz45bEyXE4zTg9/EjI0eSQ92+eAgdsYfWaHp+mTIeDqby5wzPn5jxvFF7xinw7Cc6GkXfyR/8J789Jk2uVbGxY5Osvscul6hD+ki4Xo1K3Pt65vJdr8aoZ4nHuo6X/L4E4Oz2OqN9AufpBiJxeV3nS9+OA3G6Z07tvmNBcMCip0xHntP/sw45zLjy1gzpoyTTXet+OCXP1iMTc598vI8on3PEWP3/nMNMczGGXepE8XHEOs02RcN16tnkU1r3OcfvefBjHrFZ42C3dRNu7BcxO51th7BcKR4+qfzB//0rCNdHmkc9E12rgkzGW9kuT5C8lGX6SNjJ8NiHcsZn3iwG1/ygln+ntP1tJn3wxbL9bs0ljmLh8Q6ze0eO7d64dr/C9rHf8LogdJTn2AChkJ8at199PRHh00Eh/yYP7b+9SFPf/EnR5yOu86Wn1jsck3E9qyKM/YpcIsfGbs012OTiAzzGzdMJodNh1+63J4jdx6TE1xrm5z0Lx6djE2f2/NYpUw58j5CF3C/vh1cqxFsoNSP3rGXnNRTLFizfjCKkb7oPUe/fL199OBUTtfTHl7i75Ie8qxqv0baZX3pN6PkyaFnTNFjk9GNJ1jmo8vvfjrcJp78+JLfbTrq15KHyE16YuRdQ7fYr7Pmqdemuqhx8oKXuc96iAXXfQ344S97eWJ8OFiPTaYNGb3UtS4HRdLdW9j/E307pF80n3vGZ470yNP04DVxNiIxf8/pur7Tf9fTrsJTe33MObEu6XcF3eT52vzVKtR1PnZw1TGQvOCPbR2Cv7QL5ub+Sl33S0e5Dj3t+brORumPnmvQg2v628XaovRzbH1op7/4c0/CF9Iex47c5E+MxGnXc7svOYknln7ir67W44hOzkn+XUW3wHVqoZ4dI71OHRfBQo/rI+ugj8R6f113Lf1s4nJP49CHeNrlvhE/rZ0c/0Z9u6SfEN3vk4y9y64Hd5mDGI5/rife/XLjL/WEvsnmC2n3iegCPl/7N8e+hrdTF/W7WZte31vlul5y0mdvPx9PcvnlBzNpGz87rI08/0aNbta/ePqK7Pdj2ue6877Y4eT2nHlMTqfE0yZ2cuK/XTt5N5UXDdenTfaUfVxNs9a9aWot1nO6P/k9zpccetrTT6Ncv7eT2/uVk7z0I57PRPh6fnLmMn2kv3kbNg51nS92ZPed1mbun7ft9jw39qnyrOM3BT91AiMwKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCowKjAqMCrwYQVWX37OF+Q/DKy0dvjOqd/hqwNHt+rw83wh+CN9NMc4fKMVY6gfrwKFVS8NCQ4n+dOf/nTne9/7no7YO3Vo9fRCnzo8d8J0HbK7XYc9l9jZvnbt2nYdal6HUu9+BO/1Bdrt++677+j999/PYdWTrEN5l3Ug+uLRRx+d7DoE20uFlnWd9Rd233333cUM/wPnVmSQl7ft2kOV4umnn9555ZVXtv/2b/92p7B46amnntp+7733dp544olLb7zxxm5h81Jh81L5SuwWhC/dU7CE3Ut1IPRuYdEB6rt1ePTlwuqyfDvlm/oufasOuLYHL+sw6EpZHDnwvK5/VPrB/v7+cm9vbzpQ3SHSEh555JH9q1evLuqA7MM333zzqPpYVN6iDkw5hG+4dj+0Q6oGri84poNXB+7VwSk7hQV7rn119/nnn995/fXXdwtn99Q+eLnwdOn/Z+/8duSsrrzdVW2MDeTjT0IYIg6iKMoBc8gFgOZgpLmA5BJyMDcwh0xuYy4huYgwUk5RjoI0IxRlFDQMgQQSErCNu+pbz656il9vv9U2BBK7ey1p9/q797trvU+9Lje4No/Ner4+DqO3b29uXr++4oB0DlTnwPQbheu1zeZu6dX1isMvTPMlxYANy+saq2IdJnmmwhjP2M9gt3Rd5vbtYvZundF+e7W69mnF4fp2zR92pe8Uy5/WIe9n169fh+k79b44e+KJJ1CDdVTVnXEQfHNdXb0kUhzw/PPLxHhV/Nl++v77758WM9fqz+118XDtqaee4uCZcUhHPR+fqNyNet49VtzdKDaerOftYxV/quJPVt1jxeKTMFw4lj0Os7m55/Vx+K3BaSXwz/XGZ4Hyef4Ofmt+8bqGPb7U8natcbc+kvBFJZ9WjC9P40MJB2rcreujxwEytY9bta9bta/azmd3as1bxTTvB74g0y93533B2NTrHFzvD9wdz/+K+9mkn9fVjIdQYAduYFd+B7fl8/mVAdPwysDnQCUGz04YxSb31N4n/o0aHIyHTZxD8Zjr4XisyftgPH9Lj2d7aQVuGIOt0vA0nsX7GPzBMPzCNTZ52DWODc/UEMP3y12Nkxvsl3Ytmc5ra7OnwXYdkn5SB18119WQv7XsmZ25hS9i8gtbMouGN5+9eWgj/OKTg1XrjOFT41zWzeH1YFiOeS/57MOGGUSO5FkfhuEPhmHVZyz2eG7v4/pobfjF9j2BlmVt1+Z6XpM96I/3WzE99txcV2e+flnX4Xmr6jVX8vkr08mSTMky7MEivM9c+3yVbzQ1xrGTZdbxfeL6rMs11b6n3NsX4VqO4VqOiWnPDOtTI9fWov8qruvvEdurfhhp9fBrlXo2wzKsIF+Ga5+tspvMyjXcMpJlbd8fzGO4njyrL+J6PA9rbj4rYVhfrvGT2WSVeA5zcs0a5NFwrc11iHk9r3nP87pqfC9u6/O/f8ZUuOWr7gBc15+P64XntRz5nFbn8xQ2iRNLrn0uwzK2XGP7XLaGueSNuz4+e4Br2fY9iJYRbXxYSZ5gDd9nbHLtMxc+ycPvEssz19SwrrXNdTXjIZRVfQ65iGvYgt2LuIZBGIdJbJn1eS3zxqlLe4lreUa7B99rFTrIg3C99LyeufZZPTNOHLZZgxy+XGvjs57PajXvKXIItu/Ffl6Plny1P+oZDaMITDDkJfklBqMM4rA4D3n1eYzvoBbW4Zc8cVnG93OIa3otfJl2P/qVOifsHZEX2JEfeIKv1LAJi/nMxYdJn8ty7fMbLdfo8Xu/0q7j+4N52A6vjc/+9P1zBX/I/jOJr8HwldTxuVgm6YOc+owjJhMygiYmR9hwJk9y5vNXJonDZsZlMzm1xjWznlzuQy7Vlf6bSDLkewH+fa7DqAN+4Rk+ZVz2k3EOV2ANctjUuwa27ylq9LGdwz5gnRzafRmnLmXEL9vn9OAaJmBbwYYdeVfLM75cE5NnYtjwjg2D+NT4zDUunzDLcC6/l6Zezo0zH5u1yVHj+4r9eF1eCzliCP7MPH5yOfvMU3w2oh3wAWM+P7GTL3zY8hlNDrZ9rmvLqfWwLJfYxPGph29sa2FStrG5Br5x9DyYn7Lh94Y/+tGP5njWPHJ2cM3e5QCb+wxD6LSpkRny1sgUeVmjzji2jDNHm7jPZOLUJ+P4xpmDzRzfN/jYxBj47hGbvZsr8/B6iFPHQLj/MqtNnBj3XD5gB1u+tOGJnHHYw4dFc9jG4VSb5zXzGHKN7Xsi18R2Pa7tGuyTOHls9+n+jTMnBf9S/ved6XOyr1ke0MmALJhPjuCLvJxhwyXDuDnjMoovl/LL2jnXZzRxmUV7Xee7X2vcMxohz/3WJ4YQc4xA/ZBb4tqDhfJhhYEPU+ZhTcZkEM4yri37cgjLroNtnHqvp+0+8trup8rHXPft6yKfwhonl+1zCK9pzzX3OkU20GnDgr7PwdTk4ckYtr7sksOWcbQ2tdZhE8/52EvXIMZgbe1ZV2rs3dek5p4j3nu1MflRwwY1ckZcGw2Lcr1kG0Mz4BTNXJnVNm6t66O9LrncGzaCdp/4aeMjo/aScs39R7jPCjaMoOmHvOBTj7YGn7w1aPmDS+uSX2pkWe08fbkmbi613JpHG3Of6btnNKLeebufvFZ5II+tnzlisJXD2mQveZR18zKc8bTNew35RbsXbPL4avehJucglsJnEHzyl0rqec29R+b7jD8POUGTgyV0xn2+EtdOHtNm3jF+raMGW96x83rpY7tna/QrdchljHjeV2zvvzY6B3k4QhOXOeOyiDaHndxqo73OzLLXsJb1vQZzvI7z3Y91xOdRoYNcZq65x4h65+1Y0oYRWZht+UmmYJB6cnCLTR6b2DGbnPw6Fz3bXos4tjVq9zrrKj33OsmnwACSGltekhFi+eyUpYyTzxoZTk5lk3nmtX1P4FPnXuQdP+PUIcQQ63Pfu8zuJ/9tx7qMP/L2/ncivI75HssEOXgxb1ymyBNLpuROjskTk0Ft49axhu8Dba/j3Co5rON8anIP1ODnIIYQQ8ztvM+fa/hwgMiJfvIx8yRLySAxhjHnoGXWPDX5HjBP3PlcP2181zRHHsFH8LXVI0H8inMtC/RDhmYb7hBqqbFOG03NsTxxeZ/nmjOO78iYdqUP19FOrc0aCvc877t2xpMZ4jIz27JGPm3rMy7X8xoybjx9Yg7X1K/UYV/YCDlEvfPKv6xcH17g8YOl5UcG1EyVI2uIYRtHI+aNzzXEl3JZ5xrofA/hI9ZqG1/yiSFZ4z1X7yo+Z8E4Ogd1sIVYs8Qy+Yxbz9xkU5+8cfV83fSpUYzjp21+6GKa3KWW+Dyy9Dq9/0s6Y2mzDr6x5NZ4auuX6pZyxBDXdy1jxpf8B7mfzJ+Z0Hf+RZpcMso+cr6sznHXnOfKrflcyzVmbS3xe6S5PrRkZoWEMfWheJ8zjp7ti3zWcQ73R9s4GiHOe8F76Jrm0ieGLMV2md1P1zKGnzFtNXXaD6KpWaqb49a4vv6szaMVa/QX9VVgO1/4Az6/c8rMir7aWvyMYXMPjJk3Ztz5aGsypp25pbnWfVEtJz43j82nzlpqZt95S/Gl2P3WcD11XnvEHhV2+YVBS3egO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oDD9gB/gFhSf7Dx3P/sLIOGGUlYvf848P9JVZ1+Pmxf9xIyWHeo/KPFfevq9XD1wG+9JxDcw481qHqsMs/fj955513tt/4xjf4QpCTOkh3Wwfsrj766KNVHaC7ee655zhsfbBdB1aPeupSmFO12zqgd1vzTupA9mE/+eSTZ3UY70kNrjVY50D1Tz/99MC2cdZrzulCy74DHNK8fv7551e/+93vNnUY9fq3v/3tSR1Yvv2///s/eDupA6Dv1uHk29IndUD5qg6hht0xirl1HQh9VmyOL10rtk45HLpqy1yd3Lx5cwWbPMTretuqxT7jQPWPP/54W/Pq4OlrHEbNFz9u6lB0DpUuxDe1xNndGzduYGyK8btw/8ILL2zqsPftL3/5y+2HH3548uMf/1jG+cIm7b65l7cDm9dee239xhtvrOpZOpiql7r5/ve/vyoedh8WCpR69m2KPRi7WzwVZqfbxx//bL3ZnBZq4+DzNRwXkvB6VnzzhZDrYojD08eXatYyfoHP4Ld8BM4+qzU+g+PSd+o9crvWH4epV/4W8Xr+3nn88cdvY9c+btd+Piv/rJ7tZ8X0GXGkDoA/4wDSZ599dlPvrY1c/+AHP/AONtd24hHUPJNKDp8B6iUMZut5uylesTdPPfUU+TGKw5qyulvPzM/gs56X18rnS3g3xZpfcsnzcgWMxDabu58Vw3dONptr5T9W4et1TT5LnO51mUPGF+WxfsV5ng5+C9Xb166ti//1rYpx6Abrf1rxcfBA8f1p7eMWz+nKoW/X9mAYvu8Ut4PpyvHZ5jDk+qWXXtpgv/zyy5U+SHN9aMVDZ/hcHZ9Ha3f6cjo+w1bce00dbPAMRWAIIe8X9/FMRYjBMWvBNXHm+WXEHI4g5zx/fQaP90r57oV1WIPrcj181uGgGGOD5fLh2DiaA2QGy/uc9eRYh335xdfkiOVwL1x/7Kf+PDrh76JwXu8vYi1/vw7YfzT3Td8dwasxGedeIs6RLZhiDQ9d4rAlbAa8GIdfuIV3D/iYv7SVa3k9r4/mWvLldfHlEAax4Zn9oB3G8dkPI2OugWaug/VZl+H10ezHvZ3ANVJ/p22uRye+9h+bOjSNDw2yIh+wxP1ByHH/yHE/Ebki7n30HlvnvYcVeIUJ+U2W4Ze8Gq5z+Fz22exeq+zAjvtmD+5J1rg+e8HHTkbxc5Dj+W0d+9R2nq8L7fW8ltdmP4whE9f21XTrr7gD/JlYQp9lRT7ux7U7YS73knncW4a29x9eGV+Ga/YBz2r36ftKdty3nLkvfLicucZPnrVnron77CbHPDW217uQ66pTeF4313bja9IXcA039h9bdrmXssT95rlKXbKM7b3nfvscJibj8KLNM5zntc9sP4f4zIZr7JlpfPdS5oEx9vpluGZ/7Gvpee37AM3w9c1cc90cub9KjS9mJ9/y9XZgW5/56LPMcB/0ZVl+eGZyP71XyXWFx7MaNhHvvzwQx5Zl5vqZRO7NybN8f11c81p8FqtnrvEZ1Drk2j+f1PLs+4o+2asyh92fr+nE1yP0H1bouczKMlfM+4ENb9xLhHpqvXd5T4lR5zMam1hyIctw5PPZ57V8wzM53kcOfK6tYOuzH4Rr5b700eyJ/XBd9oOPTp7NoY3z7GYwl3pta1gH3skz8B3uRc0+GXPf8VuqA35+qL+PrOq/a9gT+4O2d/TUuCzQd2244X4gxLCpl/syh+/9wPc+YXsP06aWdeCUWrTPOmz55dpcB/23FPvj3tkjzDLYp7zzGuA3WebgaOP5+0APl3YNanzN2lwPm8E1temXvnvD536QY6QY875m7pG25bpeBFyk+FrR9gPbHmnjIzKOTYxhjWxzbxF6jbCuLFLL89X7QJw8cWzWJ4cNz/g+j30mE/N5TB2DfVDnPtmL+yvzIFxHwfbaxLC5NgObwbXgzX1p4/M6ZQ2WieFjU5c2vrwTZy71DGu5bq5PHXn2Qdy9OY/9L70G6lNGDb8zzOBlsINr73u+rHy99AxOEGuJYcMKvdWWHfqozVrcA8T+EnNNbO6XAovUuYY29bDL9dLmOswhljZ7Ioae91ehe4R9MLgeGuFa+GheM3FsXg9xYrJmnBh5nrvOS959HlOH7TrW5zrYub7ruSd8bMfSa6j04fVgI+N1wsDOvXQ/6Yf3PV9cvl5q8KnLenpKHJa4R3Jc5ohzP+SJGEIdMQTmmM/QJkcN/Br3+jLLMxvbe4rNfPegzVrYXs/96VfqHuGaXo8kNkOezHOtjJNn8JoZ2s6TWeZho8kZZy3eCxet6/XQDNdgT6xFDBtJ2z3vMrufl/p3hT/5yU+2r7/+Oq/0ontNj2CC/lCHpo/EyBFzPnFt49QjsrrzPu89a8g1OWzvC+v5/CaObYzruw9yDK5JHButX+aw3RP+knhdcuzb10rcwTUZ+LMNaw74pgZfZqknLpPa+L4frMlrWO/12Jf7cR9oe522tZUeYs2l/b1K/Tm0if9OmK+b186AA3sEK4ee7HOlDrxocw9kSia5Z4jzsblH+NaY83po1uH9gM31mUO97BJneE3i85BltJK2Ma7vHojps76MEUtfW95Sw7Lz2J9syi8+NazBMO6c1NpcX9tru0/i2uSwETT+klizlHtkY3DN5ottmDkmvna0PZIVGMo8vUVkMPlxvpq55PGph1ds9uSgxjg2ddbiU4dmwAnrkcfHVpd5eP/NeyKX4v6IYcuRezOmT94aNfuS02O285xDfa7p+8C6peuyNnHnaVfoIEsxk+Qunfj3hv0zO1+frxcG6J2MGEeb07aG+4CNYMOWMtuuRxweEeZgkzOujc9+jOfemMN1GWkbq/BhX9ru3X0Qx9bX5jrsC50xbOJocrJo3Fw+l4lRl/Wu7zVyHXM1ZczBd31tr08Nkj42I+XSfgbhRV7A9bkelEP/ZI0cvuzKGnFse8g9sgYb8T5gU6vIKX5eh/nM9bOHc7gGOdYjhp0sW6eu9KhxP/jHJDlIm33ka/O1oNOWWeuZg51xc+jZrtBYjziSa2uzZtq5T+Ys+cSV5vrzewkT9Euhr8RgZ45TI1PkqEWMYed68mbMNZmnjfZ62qydtus4p9JjDhoxr95FP//JevlayCzxk3XkfX3aaHml1jg2cXxtNJI1zska7KXBPMTczjv/k1wKXOPP8ay57LavnUYs2bx+OSHvmOP48Ia4Tt4TcgxirJc2vqPMg+11rWXdrKOWnHX4CL57wE8bHyE2D+cZty5fBzZ5dNrWoudnsfVoxHleR03OGrR1xBFzsz2S/eNcB+zVzAZxBtxkTdosJAvY1muTS+6cSx7B97qwMNdTg2QdPmsiXts1jI1k/XDe0nWpIW4ODUeuWeYhp22Nvto1Zl++zbO+NXvzcA1qHNY4T985rb9cB+hnsmJ/M5Yrez/mvIy4XuaNuY61+FknC8SdM9capybr8WfJuZljDYayZBs7VpvxB7GXrkXM68y29ffV/t3qvoWXqMDXvPB7ki/6Ku2/HB7zic81xtReW19tHE2Mgbjezvv857G4Fc7XV8/xv9Z3XTRrzevdL04+ZWk+v8Ot2/nw//fy+92UfKFtdwe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDtw/w5wstR9qx6Ff4R43xfRBY9EB/793/99XV84u/JQhzfffHP1yiuvcDjoqg7BXf3mN79Z1SG6q/fee2/1ne98h4NDVy+++OLh36DyL2Y/+uijg8+LroOiC/Md6HVILyekb//3f//3pA5E55Dg7Xe/+13/Ee+2rndS19Nnul/UdP83CtUtV60D65///OfjS0Y4hKQ4XRen44tMyj6tA6DX3/zmN1d/+ctfTutQag6kXtXh0NdqnNbh5qs6DBo96ovF8QVq+5pVzT2putHP0lsOta5R+G44QHpb+U35d+uA9Dqg/fGzGuMLJ+tw7M0f/vCHLYdj10HvZ3WNTR0kva39bH7xi19s64D0be11u/9yZ/m+avftSr7en/70pzDGobSrt99++5RnaXGzLj45AH1Vh6tf+/2tW499+8kn18XcdQ5FLx5Pz85u3bh+/cnHzs7OrtV4vGLYp5W/XmsQg+HTimPD7rp0nau+WVVNmWfb01POVN9+VpzfrTwMc5j6nb3+rOo4FP2slqsD3LfF8vWzYptyajY3btz47Pe///1ZjW3xfLee33zRCc/lTT23tx9//PHgeh9rrqsRj7rUfefPcthC0GN88MEH1771rW8N5irGl1NymMHp7du3rxeD8Hmtno0cFnaj+HmsmLpZDN4oBuHzidLUj3nF6I2y16Wrbl16fAHJeJ8UkzDM4AuatrBc4075m72+Xfpurcmz91aty5dMchjBrbouLN+p5+84qKBey53ifhxUcOvWrbvF8516322efPLJz+ozyxnP7LIPXNf7c/v9739fxv1M0lxXcx9m2TM7+Kl9wi+2rGrz5e4ewIHmcHRyg9nS5J+oAZvY5LFhFs2wfrC/z/lFrb5v5KbSu2dlaRglDtPwCGPw6xe3E2MQQ3OYDLXk8/AkD0YiTh01rM087bwWMfdz4JrPIfW533iVtPytOzA9Z2UHZrFlCt4cMJnj8DytOGziM7Cp00bjE2ddc9gOrsG18d1LmcNGI/ACQw55hjdZhUN5hFFsOMWWWbSck8sa4gxq5Bkfm+uitd2PHA9dfw5R1/K37QC/14KbecizfMkyWhaxYRIfVvPAUXwGOZ7H1sl4cu18tGui/XPgIq5lGXa0Z67hTjbRD8K1zLOW3LsOMUZzXU14SOXLcg2DDHmVU7RMy7XPbur/1lzLYHIts8T4vIFPnba18qyGa+rIN9fVhIdY7se1z0w/E/i8XuKa5zUsw7bPbmye174H5BrfOLbvAa7DHGI8p9XEEWKKf97n5wB4w2fIqyzKp8/rJa7JMRfNYK7ziDOHgd3P62rCwyr1OQRmjn0OIednAhhL7vAZcJgsz89r/o5obX4mwfZzB3PyPeM11Utc15QDW0ufQ2Rw5hpOYZZ88uvzmvqMJ9euBdcO+fZ95l6q5GTTn69pw9cvC7/T8PMr7DjkTdZ8hsKnz1Z/vyHbPq/J81xmWMN84nKNbcz5eU1sh89o33uVOggsyRGcwd2sicGmfMos2jia34fAtrybs564MflGO8izlxzsBV8Z+y3W0S1TB/bPWHhA8r7DpXFs2UATNw9vxojLGXGfvcRkVS2v1DCerEEdg5wa2xrj5LgW8dTu0dfBHv8a8bmZzMuePMLgMX5hF77lHtvfAWJ/UoN1yBOn3tol9snBt9fD1vc9Sc59a+f7odInn132Z//+mQsbssDrxpZlbH3r0DIkV9TLHzkZJI7NIE6NNowziPP8xWY9uPUzh+8Daqz3WtQRZ6TNNdgzcWrdPxoxhi0DaMRnJL7cEIM/fXhh4MMitnzKu89rcjJLjjhzsI2zDrbcyjZx5lPPHrDJaed+2K97J47PNdCMg9Tvwu/W78KpvbSy8FmC18r9lwttmTYuMzCETVwm5YwcDMGc3BGTZTmmPt8HyS82c1kHm/lchzmuj8+ghjg2+8FnuGc0ot55n9937rUMJCPYMoQNX/rY+vIKT/BnXFuu0QxYZh3j1qOTZXyvS602c90bmr2jHeYr9LkU12dXhGvuPeL9VsMIgo8tJ2riMmWNfMkxtcT0seGR9YjhMxeu5RQty9jWO5c1k1/iDONo1kQzEGPEGQg6n2dyQU57ZgQftmQGWx/+tOHSGmyZlX1y8I5mWMP6rjPb1qK9jvv0dZBjnnHsc1Jcb64418mEXKAdcCFPxGDNQVwbnWyaQ2uTX7KzJm2vh3ae+0LLr7a6UoccNvcfkYvUMDEzgi9XacucvKFnG1++sZN94uZyfddxL/hel7rk172T11ZXaMj4fwMvO9e80v3fHX2G7V79vc83uaBOGw2zaIe+rCXb2jKOTx1z5do19Z2jdl32Qcx6r6/OfVbZqPM1qolz35VkAFuWtNXwZE6eZTG5wzZuXbKbtrWsi53rzNfCZz20e0JfZFf6IPzOkNpLLUe45t47eP3YMKNOG76slTV5lTN9uZTTrLeGWNpZa73ros3n3ip82JN7QyP62PKAjXi/ZUR29NVylYxhy+PMqVyrqeV5jXaea1qTfl4Xm5wx16jQgXVyDuIpV4XrvM++fmPJAgwhaOLJlnF4NKeNz/M34zOP1CazS1wz3zXnPTi3Sg77m23mI2ps7r2irU5eZMRYcgXDCLlkkecxQizj1LNexom5jrVeKzU55hrTdn9LusrPyZX4/133vxPJe20TiBlHyxJ5czPb8GWt9fPzVGapk0dqL7Jd0xrnos3NdqUO+zTHfcdOIabIBT42/CDa5uELkS91cqeNlmXq8NXW6LO+ea9pjb6aOdiOMse66WPP0lyfZ0AeZEQtv/RPzrWpgUW0dclmrmGdc9J3vms471ic6yPWaY/gkR8zA/iywxTzxIwTkztqtHOu9anNu44546yDqImb05419cSQWe+iu59XguvRhN3/Y5qvXRsukORDX21u1sl45mY2WYcYHCNzfvZzrWM295UcMutddPnnEg/EcjATDpGMY2c8mZRfa1K7RtYYs85rqa3Vv0iTO8hV+DujL3b/WUR3ScuPOVnBhzsl67TV1GinNi6/6WtTf8x2LRjQthZtPGPYs8iS18JH1GlbSyxZtta8ftZoo7kWNdg5x3mpzVfpkNknuBTbVe9/Ntfn2oHj/c5EcnQsnvOyXtu82muZd13zs7beunyfGZu1axCXnblGP1mZa82xnjbzsInJsPOsMU4tMufn2CiKuswv5Yzdo68S1/e8+H3ggud4cpHTM/5FbdZxjtq10z9mL9UaUzNXhow9iF6aY0yd6xhTk0tbP2PH7KV17xcb+UeF4byh+cLa7g50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9AduBwd8DAoXg3/ttR/X6rmkHUOmB5+HZB7iO9f/uzvw5//A9433njjhAPROVS9DmvPf7jrP1jP2JX5Qhsb1fqLdYBD1evg9MHdf//3f6/+6Z/+aV0HP4+D1T/88MN15U7qcPLTYvb0k08+WT/99NN1ZvR6XYc9r+qAcw5aP60DoVc3b97ksHS/0Oewicqv6oDps5q/qbqTms/h6dtaa8sh07X+ptwNh6PXudRbRs3ZVG773HPPMWfzy1/+clt72T777LObOvx98F3/wFzeD9dq43J3gC+F+NGPfrT+t3/7tzW8/c///M/qX/7lX9bvv//+afGwqkPTrxWTdQz6el0Hlz/2zW9+k0PVT6v28Tqs/LEqWe9QvH6t+DqtsvFlxcyteGF/jTzvhXXxui37pMY4OL1yYHtW8z6rg9JhFo4/q/hZ8Yq+U/6m5n1We7j7+OOPn9U1z0p/VkzD9ubdd99l/oHrmret2u2vf/3rA9d17X5mXyKMi4n1z372s1U9t/jSm/HFUO+99x7P02tw98wzz5zCZj1PyT1evF6vMDw/Xjx7MMLjxeE43KbYG4d9lF/mKXnGaeFVPPOFauvBb8WGwF1xzrOSZ+td3hrYNTxko7607Ky++Pf0DrDf3W7vFMseSFCI3hlf4g7XNccvdOeLzvBZF/usXtO23nOb+mwyrlUxrqFdZnNNEx52KV5X9Rlz/Dn+2muvyRKamF8KjM2zEy2D5DxwhhwHL3kgE/aB5X0dvFPHHOxcf7xPKgZD48/7vYYnvwjVL/IlBpfyiM1hSHAJx7JMHpt51DCYa3xwXD55bbQcy7L+YV/1XtWu8pa/Rwfgtq4Lu+s9t8OvGFzJl1p+YZYBhwxsD6CRTePJNra8yrVrcg2v4/umQoe/CyY/yRSsyTBaH1vW4VfWZVieqctB3Lms5RpcE99rq3Nfle7nNU34O8mqDjBZvf766ycTz2wneYYvWINbeZRp/GQ2OYVx6+Qdnxp5Nz9zTdzrlnkh1+TlTp7Vskn+6+ZattlPf76mC38H8Rm9vzTc+owmJNc+P32GyiFaxuWaWD6Lk2viMv/Xci0/Pitr6aNc53N35lrmfXb7vHaO+aXn9bwHfGPsp7mmC38fyd/7PgjXsuyzNbkm52cP4gw+PxNnJOPYrsEcbK6ftjHiCO85JPlJrmEQ/pJB+VTDtexqk5u5di3i5HNNrrk0Ktxc04SHQJJr/8yXn+RK5uVahqlhyOyDcs2zW955dnutmevck/tKrvP5CH8zg/g+c9HJrzY1s+1avgfuxzX7QOQdu5/XdOFvJPx3jvodHFeDEwfc5pBX2UOThztsWJRNWUYTd+DzvDZOvbW5rlxzTfJcR86xFfcqQ/JNHp7kd35my7Nahv1Mgq8Nz9g+y835/mANrqWP5nrG0O5Lu0InHsZojlhLdGD/mTgZNLvEA/zIqHmZgiFsNAO+8NEySJxnsbGMP1XxrLeGA9NdE80ccgz2ktcnj5979LnMfrXLPGfjJ98yhJYzbXlHO2RbLdfk+V2gh6PLtaxzoDQsG0+dayf3xJ3je8496vtauA6vWX+8rvp9IXXGyrycUmz7POMFeu/R8mEMH1t2YEWuyGHDG3E0nBGXRWxifs4gziBODNs18DPuXOtl2D3IOXWsQZyBj2bf86jQEO4x9xwZ936v5YQYLKGJyZZ84ROXa3yf0dTANT42mjpsuTZujetwPWuxzbsfrqPNa/B1EMMmnzLixbX5zF06u7ie7zuvEQZkAl9OiCcvMGQdNryR1yaXjJOXQePU+xzHJm4NHDNnXof1Ge4lr0ut+yTva0EjaG15GIn64T1H+1xLvokna7AjX2hyMg6vMptx58up9cRzfeKuQZz18bHR5Nm/Gpu4rwk7ZcSvINf0wPuNDRNyQVx+sYkjxJIvbPJyZ94aNMwyH21c2/ollpmzxC9ziHvd3Bs2cUeZh9eEjcAJ9xyRCTS8mNPGx9aHHQZxeSUHg9Zh68smOeuZa412ziXGIOa11MQRcgja10DO10VuxPf/3TLj5C6dTM/rfH0zE/pqWIEpBjGGnMqnsYzLLDHjPp+dt1RjDu2Y90Dcvcjykq6yg8gBAWx50NZHM2ROW8bQDPnLuDxbw1xZtx4/1/Q6aOIM17TOveNrq41VasiIXyGuue+wkCILxLERmJlt51I3s2YMduUNrS/XrIHts3iphrUYztX3Gq5vnDWXRoUPcWzuNQIDiD6amHEZQcubtqzJp3HrZJo4tcaTcWPUyDt2DmvYG3buEVu/zGFTk0L+ZP85JOOX0o7fieTrgwkETpCZEeLGYApbxrCJGdcmn1zOcXKukTZ1xM2ln3Fs94FGjOnPmhqZGPedQImMwBWij5YvmcPHzri2uSX2jTFX3ud1vEZe172Q00YvjQofhPxV49oX730fLagfcKEkI9rk4Ix5DD/nYmccW39m1lrj+Npch3lobddxD87XV9eUA+fYCLWIGlsesJVkhpg1aFnFlkP5MyfXzMWGW+fKszUZzzVn2zq0dpljD8bQCJo9pYzc/nNIxi+lvX9e+9ryfmPro+FFMYeGM0Se0LMti9aTT15nP3PaXEPb/biP+ZrUmpttfTSSLMw+OYes42uj4RPRNifLGafWfPLOmvipvY5x5xnXr2mH17AUI48wj+f10NiXWR6Qa1oAJ4rc4ssPmjhiTN6sJ/6gbFLnmrme9kU59oBk7S6y+0k8hXs932/8JU6MmddnveTWOHUyju0gTz2CPQ/rUueaxBG1tr56FFl3Vbgezdj9/9K+/tTe/2OaWnJy61xicInIura11Lhusm6d+dTOpQZxbePW7rK7n15DnbnZThawHdSZM6aGNQRfW21N8muMGuvUmcNG5pw1u+y9e3Se+XO6uT7XDhwZMiEnqbWp0UbLXcYzRlyfegdxRF+dsSXbGPrLinyoXWeJM3LWoR3GnaPOPDHnUq+fMdcxlvPNpcZelOZ6sS0EYSslWZvj+Et5Y7mWXLuGNem73rFYrjfX6M9ryErmsY2rM28MzeC68Ig2Vua5NZwj2+aNL/kXxcgpuYaxRX2VuF5sQAWnz95z2RJD1CzFiX2RuOvMc46tQz1yv/yu6ov9TE6XZh7LH4uzxlJuKZbXI58y+5l7pP5+ON/kcy+kne5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdgcvTgTrAb10H+I1/X1qH+A1dB1P6Av13p2rjD6L9x7dD19ontW7G+mCZB+li14wO8A/tiyG/uOfk29/+Noefr+oQ6FUdXr5+8cUXT+qA9XX5p3/84x9Xzz777OqTTz4Z9fVFBStOoUazWB0uPeK3bt3i4CiZPKk5HIa+rXmrGzdunNVh16Q5kJpD1Ld1CPbmv/7rv4ZmnRdeeMEvLNu++eab248//nis9Z//+Z+bel9hH9amvuXKdGAcjPrqq6+uv/GNb6xu3ry5evnll/lSkvHFJB9++OG1Ym1dvJwWg9eeeuqp8SVTdYb59T2bpdbX66BymF3X4BB2vgBzxYHqrFOc20yY3t69e/ekYoPT8jeFK1/yOw5TrwPa67z0LbG7xfJn2DBd8hnGE088cfb73//+7P/9v/+3ee655/hSkbPf/OY3rLmt99Kmua6OXHIpJtY/+9nPVnX4GDwNTt99993TYmr9/PPPr4qDa7D56aefnhbTcDq+GL4YvV78AiNcjsM+ihu45YvkR009etH4a/g9PUWf8Ewez+OKVepkUz7sDTDLvltxnp/j0IHyq+juZ4X5HTiv6/KFfLeL7bN638D0Z/XnwFm9n87q2e2BGyzMGOvubZ/LxMbz+Sc/+Uk/r6sZj5oEs4PX2r/swiI2XDLIH3jc28Th0oOXqMEezJb2gBrnjuduxWWdODIYLp1/1id3cCqDeTAMz2e/uH2wvK/D9qANa2DVOHaur38P11W3qfeh8XJbHoYOFLdyKjv6MAVnsoYvb8RgkyG7atjG1ldn3Dxrsgba4fUrNHiGGWKyA2MMfNmTa3x4RROTU9mWZeuMo13LmCwTz2tyXa9fZnNNEx4iWdXBpeNzwv53B/KUGn7x5dvnrFzLJ8xa4zM7uZdt69HUq7HhGs31GAj6q+I6WU4b9i/iWr5lubnmzjykcsFzGpZgDC1naIbP1plTeSeeXGcdNfgO1sN27b+Ga5+1MuqzWt9nOFqG0T6/rWed+XndXFdTHiUptmEqn43ynFrekmttWZVr4n5mzlzyre26sq3PfnJPD/K8hkfYTC5lVX7JJdfask/edZiTPGuzFwcxxM/X2ORa/s4dOMI1u5J3WJM3WdaXW7i86HOIzFuDz3Ad5mujGV+G62RSpmXWZ7AsUyvvWesaxOBWje04x3X9Hmj7ox/9iHktf+MO7D9zwArMID4TZQg/WYPhHD5jqdHOzxvYxv19B7XWkLOGdbFdP6/rfip92CN7kyXi8IUvd7KHlkuYzeHnDX5Xwsgc88j7exRzxLFd1/cC18bm+mr3U6EhY7/1exJqWi7oQHwe5t7PfMKIcfmFJWLyg4YhRtrG8nBz2YQ/bepu7udTK7No4xmj3jVlHp3Dvfk+I4eNsHftwUn5aAReHLDFgD9j8CjLcppavmUZzUHp1GAzV9bxXc+4vu8Jr4XPII9e2hsxxL1Sl3JW7wdqfK2Zu3R2cC23vkbZNY5myIx5mMGWY/PJHlxSI7fUwDXxtFkruaWeOtfEll/q2A9rEKPGvXAtBv68f+LEFDnAx+a+o2VHTRxb1rRhTducXJODa+LUEGdoG0ennWvCJ/sh777MuyfWQ9y7dbvo7ufdq/T78OCaV889V7j3cIFgw42MyEayRK0caZP3WctcbePUYcs468KrvGc9teSoR+NTj582PnGHe0Y7yjwn8OCACXnBlhFj8gdL8qWND4fU+FyFY+eQ10bjs7712HKP7XrYrCfjXI/Bnsgx3H/GK3wQntfWHIKX2OD/24EBhPuuYMOIMWqw1eatkVF5gj3sjBMzfsymfq6RVePUMNwPNteyrsxztnsmnja+bGjrywpaVtCyRVx2icsrcXgkZtw69Mwy18s4NsN10NYQR9DE5r3qq6lV/P0KuSshxbVs5uuVGTRCDZJxbJmSK2LUOshjm9eXUXLJOL41aMY817WJO/Ia8x6rbOybOKLG5j57r9WwlIN48gWv+LKrhre0qfGZS5w8g7i29WjrjXkNrm/MOnIImnwO4tSlXEWuYQPxfqszjk2ckbYxWSTHkDPsZFMms55Ycp4547mma8zXyr2Rc2+zrtRBZh704WVmBl++0mYO8eRa/uTa+uTaGtdM7ZrWOB+NEKcGSTv3v8vWz/3fGQ/+VTCOfA7hpcsGdrJhfOZIztCwZx7b2JINx7JvHVq+57Vcw/WpzZF71a6Sw2vATpEFYtpyZAyfHNoxM6ePThuWmWs89byWOeu9JnFsffejj0as0d9Fa8/7z9f6l17v/+7I64SBFFgxho3IidoaNLwh2ubkkjmwqjaOZlDPkHHrvJZ1+K7tnPStV1f54XUQmwVGiCcT2LJDvTY6bXhD/FzhGsSpmzmd465l3Dle3zxamxz1inF8r48+SDFNzZWSC7he4gJ+EHP68mVcZjOetowam+uN+z5gXWPaqWebPVJPPGX2zSUHspG8yIX8MY+YNcaZS0xf27hzzM9x88bR2uQQtPH0sYkj6uE016MN/oCBmYOMpS1D1ssgayWz5M2hkYzNtnOJ58jrZVzbdfG19+a513Tu/leBvKiZYw06mUqbHKwixBkIMYZraC/NzfWZO9fom0Mjrp12xkb8qn0O4UUj8dzeBc4zvcQHdclmMrUUN49OLtOec/jIRfG5Zjdj99Oca2RO+x4G9gnjaAcp43JmbklnDXPTl/FckzWoQeb1jJsbRfXjWNz8I3UQ72HTX5GxwHWuLB+ztoa4OWL6xlJnTtt1kvFcJ23Xyths66MR5sDJg0jWaV+kzckXvjE08fSP2ewt18Bfqs04tnOwF+WqPqtpxn24zn4lV8RnNq21Tm2tOuPyfL+5OWdpnaW8az6oliXqtdGunZwSyxpt5iL4Dv1jemnuUi2xlHle5oZ9lbmem/EAnHuf56n4c05f7Rx9tfFcI3NpW2tMbfyr0EvMzDF9tdc95j9onHXm2mNrj/ijyO/XcdNsUuvuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YGHtAN1aDn/cP7k9ddfR31V/+Z0xQG7LFjr3/dLE6hr6Q4sdaD+sf3pG2+8ceCSwybffPPN1SuvvLKuA8tXdTD06k9/+tNpHVh9UgdGr//whz+c1EHVK0YduH6Y9/TTT6/qUPPVX/7yl/U//MM/3K3Dre+5HAej1/XGPyyvg6g377///kmtsbl9+/bmu9/97vbtt98+4XD0uv7JD37wg23txX+EfuW+LPKe5nVgdIDn6auvvrpOTiuxKpYK1Wsckg6DHLJ+WoyuOUi9QjyD16X50rRrddD5usa169evn2DvcweWyz9I4XpWB6Jv/vznP588+eSTd4vVbc3bVGx8gfsnn3yyqcPR79Y1t+hC/KzeC34Byd133nln+9JLL23feuutzS9+8Yttcl3P8G0/vw+tvowGhyrwumAMvhinxcSqmFj/+te/vva9732PGPnHPv300/GFrIXt+ML4xx9/nPj1YpSDPdbFHHEYHqOeocRdd13P53J3Ujme11ues+iKwqRfYn12t6TeI3drbb6U7A6M7/PUnN26deus9n735s2bsH+33kfOZa0D12XLOvHxYpvr6sQjLHXfB6f7lyCfxoBsPDNLw6tf9E7cw5mIDWb3WjvrZdm1Poe3JoUMpsqHM1mDWXlED2ZL80wmx8DmMI5zXO9z89xcV1vdXFfTHgUpbmEJTpHkVnbNo+VYDvHhUy3XMmsOxmXWueTyGuUearBT4IlaGMSWM5jFlmUZxzem7eEE1qAdWZtrk0eMHbgmVp+N8Fsesg7webd+dwAviuwRS+aMw68MG4NT+Z15Ni7LzNFmHXw013K93E+Fh8g1nMGYnKGJwSW2DKuJybPaerRDrvW5nnaZh+s113TjIZf9Zwx4UmQZX85kTy3bcim7Mj1zTp0sswY2mnrXvB/XVToE1mCVAWNoYhdxTQ6mm+tqwlWQiWufk3CIJHMyjGbApO+BmWv5zlo/U3+VXNcWDs/U5BrOk2G597A782jH0vOa9wxxxPfR/LwmR6zlIerA18C1TCfrxuCc94LPbuJwPg/fX5W6R+AwGUsu89kt17LpM1t+yTsXbdz1med6/rmAjwyO+/chu2b8nX/6uzjYQrg38DMzlT61fmbQRsNjssrfCY3xXDbHXGzm+LsR64jlmPcys81+k6+ZueQUW66TZ2Ienot2zlxD3PXJaaMdyX+Fh4w97v8uid3yYB1Y/fSnP13/8Ic/hI0UmYAjBB9mYBRNvTG5Qs8MyqFxtDySe7IG87DJ5XCujFtjnFr3455Yy336fpJn4tqwJNep5+etzCWz8o1mmEPPI2vIech0xrXRvh+wuTY+c7DZG3H2a07W9dEp471S74s5njWX0eaZy72GhxRicEFcFmTIejmhhkEe1uDOufjUZVybuAelW2O9DGecNYkziKPdH5qYe6PW1+D+zVfq8IzETq6xYSGfqcTw4dK4DBrHZx4MmqPeuExTTw0658Jdro/Nel6bWnzWQ6hnEOP1oa0v8yAckk4d61wlWdXv5Vb1eznueQq9YsALgi0X2rAjv9qyhq9NPbwusc+zmDrrk2tZRWu7ptd1T9YQ53oO8xU6xLzH6BzUyEpyQ41MocnJGVqOyc0sW0dNMp5xbNZ0HW0013YeNrWINppBrfVlHoTfh7OvqybzZ2Rff3JhDEbgRnbQCHH5gTtttMxiw56M4zM/eSdvvZxS51zqtY2jWZMcY7Z9HZU6cI0NC4psJB8yopZr+ZFF42hyxBlzfGYWn3rqnCu/XsO413Kf5LHJG9Ov0DnZXmGuZSEbIg9qcjCEJEPkiRuDR23i+tgM6pNZbHPazNfONYinj02MNc1po3Nw3/XLHCITONiIzMhW+vJFLHnElmVtaoxZr5/8uk5q9pLXcr77xcdWu3fWSBnxK8r16EN9xoaRWeDAuEzIEf5sy5a86aMZsKptTX6usJ6cI+uNob2+ebVx96uuKUPwEVlY0vDiIK8NN7NPLhnE1qfeuRknlhxbpzbPtRjEZ7tCI442xzzsFJ7XxK+kXMC1XCxpWDKuDXMyhpZB49T7LDZvPTUOY9a4jj6atbLOmHuq9KhBIxnHlwdtNXEZsUbWMm5MRvGNqeHZ9eSdXNqZ106WqTeurV+pIbN/iF9xrmFiFrkxbo18yJHaehnE16Ymh3H0bFtH3LXVrmmNcTV5BB/BNzYC0w94QFLLyBzzeWpextDmsJNlfIRYskycwVpZzzqIOfIM42r3QC0y+7toxYtrcldS6nktB/n6Zybw5cc6Y8adoy+z+A7noJNdbOutcY4649hLo8KLXFObkvcbO4c8Um88WcOGMXLY5owZ10dbg4ZlxHzmnOt1Z38383PWySPqnbf72VxnNz634Skl2SCnn3wZn2NL8eQ667GpZyDac0361OEjztMnlvbMQPrYDuaZkz1zaGIZx4ZVxHno5Np5xtHHBuu4vjYaYQ4y61109/Oqc533PPuCbe6YpgaOMq9tHN8Y+kHix2pynWN2XeJwPWzFenx5MKeWMWusW4qbS5atQy8xacy5s891jWmjEed4jV3087j+0Ff5MwgN2P83x3M9OeLAWoqcqMlZkzFsBzXmZDdj1qmXcsZcBx/RV++i53+ak5Hz2Z0HVykzR+SyRts611ZT72cObCX5JeZ87SVNDPGaO2/hZ3M9/lv6QmcWQ3JhMv1jNrXkMp8x4txTtO8L82gk47vI+fVy7bSt/SJaHtXOXfKNpU475xonpq3OWNqZJ44sxXaZ+HnVuY5WnDMf4Dm+xM+DxKxRe93ZJz7H9NXOTX1RLuuO2ce4yXjarHPMn+Nz7f3y7nGpbuQeVX7/2ptkY1p3B7oD3YHuQHegO9Ad6A50LYKKogAAQABJREFUB7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A48oh14gH/Q/MCv7FH9R7cP/AK78G/SAZn82c9+tn7++efHv4n+7//+79Urr7xyUoc/r15++eVVHVi9rgOrT959910OWl+98MILJx999BEHTo/655577qTGqmLDf+aZZ7Yffvjh2P/vf//7LT5Sc0+++c1vbuuQ9O2LL764rXVPat1NXXtbB2Fv33zzzTEnDkkfXwpSrBM/+g/Qx6T+cSU6wIGor7766viSETj953/+Z74k7eS73/0ukJz+4Q9/qPPT1+s6tHz99NNPFzqr0zrM/NqTTz457Nu3b48vB7xz585pBdYE66D1ARjrVHx1/fr1wRr6T3/6kzaHom/guOIcjl4Ybzb1HjkrdfCJ1Xth8957723rcPUNfNeym//4j/84Ca5Zky8f45LNNV24pFKccJPzi6GwD6Oek6fPPvvsYLeYPX3qqafIjYMQitV1sckXE48v3y6erj/22GOudzhc4e7du6tr166N90HVpgz2Kk+ML2wanO7t8QWptR6aL2vf1vXO6nojnjV7e/PBBx9sz87ONvX8H+syZ2k019WVR1tWP//5z09fe+01X4W8yh48pk0eHhnEtY3DM3EYJUfcL9x2nfFcrrjicxHWqJE59GB5H8OWWbQ2TGtnTdquxbVy/XNcc4BjHfYz9lNsu6+a0vKQdWAczMSe+IxQ/MINImNqWJNptTySy0E8mcV2fta5jtdAM44JvMnZzDM+efg1p43Wll98beequQY5R5knWz5zv/XWW9v6PEW85eHtgIcyrd54441kmh3DlyzKX2pz6ORbW67Jf1Vcy5taftXwJr/GZHrmePaZu8S176Oh+8Dd6tLDL4Pruler6VnNzpe4JgbbsJpc68N0cu0aHo63NJeY66IZx0Se1bKrlk2ZlWnyfBYxj2/NPJca19ceTO/j/J2ReMvD24ED1/WZUabkCg2jCNzi+7yW4+SU2DGufV47D+3cL8J1cgaP+HKpD69p68s1c4zNc513Idc1/0p/GXu9/odd7sc1/MGz+otwDeOy+3VwnUzLqlo+4VeG1VnzIFxTr8g7+qT/3mhb/q7az9KwhsCrw2cmPjyiiSWbsO3z2DgaZjOOb8w5xvAZrM0grp17qfCiwBgDrmQSXxsty7P2EGji/n4k67V9rvs+qPLD89/rU4sMvvcau5/jdOULSvyeGDbgQJENmSGujZ4HHPKZl3nJJjEZRPu5mJona7COces4QN24MbW8ey1ZJs4c/HwP+ZqM48NQ8iNbsi1/8i2zyTUxhmyjPVBaW96tI+5B6casIcf19Nmjw+u6H/c/uK861kLyNeF/doWf/zxzuecwoSQLxPEZspEMkZcn2EtbHwadI+fUcVA6g3WplXls4q4tw65jPWuyL+pcXz/3W+nD/rG5/zCCJAtyBTfa5PHhbubMOFzBHjXYGccmZg1cW2PcGrRzuS7Ddd0H+8JWW4NWtO9eca5nBuiPMZhBkhdt+GLAFFoOk7vZllHiN/dzWQ+WfR9oU8PaxnN94nldanOUO/bD2gxEWybwtWUF3wFjxGXNuM9P4mnDNT5xOWZOxrWJy/fS+uS5tuu5D+Nq42hF++wqc13/TWAVv7uwNzIAK7OdMVmjBs7wsamBR7RxbPLyKOPU+yx2PWuyfrbx3Qv20j4rPMQcmvvuvddWwxjMyE2ZB06Nw1raM9/kZBZbNpN3rkc8c+6BucyzRrtCox5tjBpt4sqIN9eH38nZF7TMyET6acsgMfnSRs9cyyMsa2c974d5TevQaefeWEMfrV/miKMV7rsiF8lI2vCYvKevjU6WWdM5GZdj8mlby3W1c40KD85zr9TmPqlRRvwKc+2BdzCQIh+yQZ/giTiSNjUMeaNGO+PYyevMe+acj864vHpNNXXuDZ2j3IPP60BSz7bsoB2wRp0+mpgjfeqMq52nn9p61ydHPb4xfTVxxLz+Lrr7uWmuB5fZE214UZIVeSKnTV4esY3PMfwc1lpnLuO5tuuiiVunnbrSQ4zhwIAcqI3Ln3FrZU2ueNaSwyeHLatzTD81tr5zXc+1q+RwDXPoHNYQm+VKc00z9r8TmfsiL8blCD9tOJQbNXk5xbY+bfk1Zj1raJtzL0vaGLWIPjoFnyEX5GArRd6oMYcNs4hxWaYGDhFi+NY7B531XmPW1jA/h+tkDBvJ2C6yiw37Kj+vR3N2v+uzL6llhRh2siInMGjcGDrZNM4a1mO7ZsZzLnbWLPmura4p5/bDvc+cLBCTD+YYN5a+DBKbbWNyaR5tzrWoybhzrKv0Ie8c682hzWEj+MrBbq7H77DtS2qYmkVG0Ej6MjjHrZFpfGqt17cu9VxHDsm5xtTmR+EFP2Y+KJULc+iZLX00A7EeO+PWus4Sy869SLOuYl3699jN9fj3KfYldXKCnT51xoyrZW6uyfqLbOYfm7tPnbs2a3Gvc03r1OQUapdEBsllTXKEPbNsfknPa841XOvYeuSUnEcMf1GuOs82Zf/f03WPaZkxn5wQM4+m5/rm1BfFsyZt5iz5+/C4lvnU5tWuA0fa5tDJDvnZzxrt5NbYrOWWeNquP9fbv8xbQ+xCaa537XlAru3lzEP6F9lLOWLeQ+zZ55rzvKwnj2TNLvLX/5z5yfdC5rD102YHxtOea8ghczzn7irOr2fsHt1c39OSc4H78H4RS8dyxBncs6wxfu76k5M183xLs8bYF9X5PD02d2Yw6y7KUXdsfV8TOmX2D7lHmd+8+YcX1EZ3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHegOdAe6A92B7kB3oDvQHXgIOrD66U9/Or5854c//OFJHTY5/n30N77xjaFfeeUVtuiX85z85je/4dDpkavDzlff+c53Fl9CHRi9rQOot3VA++Efkb/99tsctL59+eWXt2+++ebJxx9/vK3DWs1v61DAEw7cfZT/cfliMzr4V3eAL4QoNvmStCHwefPmzdUTTzyxhsfT09NVHWp+ul6vV3/605+IrSu2pq5k/emnn44vqKr8Gp9Fav5usfp569atw/cC3LhxY/vJJ58MLjebzVnV8cUJ2zqofVvXO/vjH/+4rXU5FP3s/fff3z7zzDObOqR989vf/vbk+eef3/zyl7/cfu9739vCN3kO3G2uD62+MkYxC2c+O+FrVc/A1fe///11cXEKmMUpzA4miyn4vgarlTotDte3b9/GHl+4ff36ddZYF5vXisMyT1bF3eE9QQCp94FflLqt5+1ZzfOL9eDYL/MldreutS2+sc/VfPDBB9tvfetb1G/eeecd3h+b2jfviTE8SLq5ro5cIqnPAqf1OcBn4WC2Xt7grvR4hpaGR2ODzX1Omxw2gzkZx/fLLmXXtQ6fBapGezx7y5fdMg+2zA6W93Ft5jMHf3BcWvb1KzRyg2mckg0HSTfXu2Y8Yj9X0yE2cIWgZQz+chCXU+PyCp8XxZgry9ThI15r5+1+zjzLnLxShS2vapjVNs/c2ZZpctiuf9DNdXXl0RMPL+Xz77r+vuQrkLFZyyNxbBnWTh9mk3XnuKbs4+co9yDwhczMzXwmw9TCNdo688ZYN2P48zUG2811deYRlP2X/Mmar0B/1nArg7IMn9oz10tx12SetmuiUx6Ua3mVVbkm7rNblqnRJi/P6sHzvobfh4zPIeX3QdI04RGRI1zLXHLn89Ucz2LyyW5yTc7D9Oa4a7k+3cJ24CMz18Rkd+YTP3Pa9+OaayTfzTVdfsQluE6m4A4hBpNoWZTrZHW2nTNznWu4jpprIGrs5poutBztwJ5f8nCEwE8OWSSmjfYzMvOw0QyYJZ815PPgx6xhjuvmOrkH7FnOPT8r6XMZTU7f5zI+tiN9a9U5h5jPbWzXnj+fVGrkxr7q95Poli/ZgT2XcAEfef+xZQ1eEBkyPvNHnFq4S61tHP/GvgYbZskxPIQ35xDPa3mQuvsxl68DW7bLPEjygp18zVySk1F5VnPwKAOfg6I9LBqdcQ8oRXNQOtfApg6b+dZouy/ivifIGUe7V+wU6jlMGn1lJbieGUiu5Thj2LADf8kXcTlNzrFll3nUMOZ41sg89Xktarwu18Mm7/7cW4WG4CNoOEgWuP/GYCU50ocpbVjT18aXa2ziDOZYg20N19C2xvXV1DDX/aDJIezXunwt5Ijz3+epv7ISXNMD77/9mFmBQQc18mYMHxvO5I6YtnFi8kt9cpp21ue1jLNfr53auK9HXeVDYIEY916mZ1bkBq1NvZxiy7cso+ca+WaNeW7Wc33XROOTN07MuHtFM1LGf/Op/3ZA7ZWVPdcwMd97emJcTUx2qWfgo+UKG+6Ma5PXpmbm13Vl1vVyjjVo4qyDGMd35J6psRY7WUhWkh1tNEwyB1sWiWHL/JJtjWtlTT6Licto2l6XXNruxTmVPsiIXfXndXWD/4YyM2CTjMuKOuPYS0PWyGmjteXVfMZdjxh1+qnJsZ+Mya5x/So7cM19V+Ri1nI4a+rgi0EudTKbNcRdh7i+c1lTlnNN4s4rc9jzPvXJKyPWXNeDYruFEfqRHNAnmEHQ5BzHfOMyip/8YZtL2zq1NfpcF9thPvdDDh+xfudd/FM21LA02/KlTg6JybGsolnDuPPMOyfj1OvP1zdnvErPcY6vsEb/t57qwf55PdrBjxC5SV6SGTnLOmy5kzV852Uu7ax1XbQ1zldbo4/OUe6Bc+xjAisIPMgPvrZxWc04uWQVP2PUznnXUc/1zHGQm+0KDTGnrybeXFcP9p+xRzv4EZKcYCMZw5fZjGPz+QGZ+Us/mXUdY9SxTtanb55r5LWJI8RS0ocVJW1ZSZaoyzg2TCLY5ojNrFIzx6znGtrWZGy23RNrIs7deZ//7H+rsO/FfbimSm7SlpPkSBvNcJ52amsyRr1x58q7vjXpG3N/auL3E3lBI/CCyFXa1sIhQq18zbbzM07s2FzXXtJcy/XQStqHWH22XoqbvzL6AbnOfsjLzFbG4RPJmplZmaYm7ZyjzVoX1ZDPWuwHERlY0sSWBqwi5ORam+v6/KVGrtN2zVyHGGIutfHUs42P9PN614fDz+D7ENsbMjJr0sa08RkwiJg3PucynvZu9ucsuxY1yNL6xM1jz2JOhjI/x2bmzC/xNsdknfVdR1vfOcS10YhaW19tHH1O+ll9rh3DuYDrLJY9Y7KCP9tLfs6/KM89tHau81pLcXPoLyozN7PPesTmuH7qi2xz7g/f2KyXaozdo5vre1qSf3+8N3k+kjxlRg4zhp31c405tXP15/p5vdl3nut8US1XzPsiNrVL9Usx9zTPybi2Otcxdo9uru9pydHAfZ7jxzh6kPhSzRybffa5FLsofvS1LSSW+FmKMTXjac+5JZ8YMs/bRXc/j+YedX6P3cB88W13B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YHuQHegO9Ad6A50B7oD3YG/SwfiH9mv6mDn8e+j6xDgkzpwcsWBk2+++ebh30z/+te/Xv3jP/7jA+3zV7/61QkHoVtc65z8+Mc/9stwTupaJ3Ud83w5E6X6TmvdHRgd4HBqjGTzrbfeWr/88suEV+++++7phx9+uP72t7+94kx1DlYfiQIL+fjjj1enp+O8db9IivSi1AHrm6eeempbc7Z1MLtf7gSbmzoc/aQOR9/W9TZnZ2fbl156acOB6CxU198m49TXpUk113ThCsn+uXpaz9GT/cG9PkfXsPriiy/iM/yCyvWf//zna8UdsfWnn356evPmzdWtW7dOb9y4sbp9+/b68ccfh135Xd25c+fk+vXrrntS/rZ8WBuj5pzVHP1NrXlWa+LD9N3i+6T49kv5iG2S67fffvvk+9///mF+5ZXm2k5cIr1ndu2f/fXSZEvm0B64MTgN34MMiOeXC2tbzxraZQ7BV+ANSe5kVg2ryW1+sTs2kvnBdsVcMzXP7/HnSuWbazr3CMue4fFZls8KJbCVA/585honZlxbTS2Cdh455lqDVoyjFblFI/rJpTbcYlMDy9rG03cddZXvvoCy3sPb999/f7vvQXNNZx5hKa4HY/wd7a/gGiZhmLW+CNfMy1HuELhL9rRlOX35JYbN0F6ql3M0Qu02ueaQ9Dq4a8RHRf945Dog17Vxn5fJGbasZpyYcTS5Ja6tsyb9mnKOadZQZCrZk9HkMmPYX5rrmus1T5prb8Ojq4NrXkSyqw2Lfp7ImHGZPcZ1zp259pqugY/IGKwi+Mnw7Jt7EK6du3QNYs01TXjE5QtwzSuduV76OyIcI8n5PA+OEePqXfRvy7V8p+aAI99T7qn1Q9iB4ld2UrPTZMxnKzGZ1XYeceoc5LGJZ864a6bGVlxXHz2em6HzeUwO38/ReViuz+sl7Rz+bkneNeU5Y+QQtTXN+64vf/XPPY8wwv1PHlxb7qyhDjvjzGMY41BdbGLYag/bhU9sfQ5MN4bteubN5frUEHffzqHGUeYQalKSa5mSy2SWHL6soh3wzjCvr6ZO25rb+3ri5LkmmkPTve68D/dA3n1jW5evjRi/a0FbW+bVlP1nBfnIJhAzDiv62AhcwRNxGLQGmzg+NdYZJ4etr806j9dwLnE4Zx1irKNNjnp9dA5yCvEU7zlaW07kR3aIwx4+I214lM9kWG6pn218r+Vc1pFFr8G+yCPkHPjuBTtlrNv/LXPXkvgMDDuzwAc8yQk12IzkSBaJyR928kjcXNowahzbtZyrT4370cYnz3BP6goNwU+RZWLYyZS2Ws7wGXKpLWMwKKdpU0+N9dYYM47vXrTRiIyjrWHeLOTOmutdW4Jr7/+sYQaRF7S2z0LZIw6biFyjGbBoHVqWZ9uanMO6Gcee90F9xsodPhrhvs8iH/Kilq3BSk2iTpvczCMx47DrfN8H5uWa+a5pTYUOa3CtHK5njLmzkOv/5rPvSnwOsU+wgajhBcFPe2bLPPHMYTPPOLY+euadGGtZ71rOy7leE52DmhRyCPde0ZYVtbypZZI8MXy1vFlDPNk1zlxtanJQ77VdT5867dTEU8ghzfWuD3kg2MwCFTM3xKiToSWbmPGZSXxyMuv6GZ/n68/62B5q+bE/NELdLHJAXF5mhvTR2nCnn/oYs0txrrc0t8KHvVhjjHUU95KvgRz//yu5lupAPa+973Azy5zTR1OfGlt/zuHLrjXpa1PnoI649WjtpfXNV9moQyvkFHlQE8fOIXfEkqOMy6zzzBF3jnb6rjnHiCPG1a5vXn9XHT+L6+Q/MlfPDK558Xn/9Zd4ISZb5tXJpXXWZs4YNTPXzss105b3eY/WEEfwU2TDWPpwhMhNcrVkE3NO8mucdXKeNUtxr6lmHzKaMW30LH2YdHTkPlxTmazMtvlklBp98sly5mQzY84z5lyvQ3weWWNdauxjIifkseGQ9bXNy2+lBm/mZU9+yWPrk881XMd85rTVrIWNWL/zPo/rD92fQz5vxxfkmoncd0Vb1ognZ8ZTZ01ybNxafGxqEOOpM542NQ8iciNLx3x5nPPG0bLnWvpZ457M4Wu7NjHXwEaW/F0mfjbX0Yy9OfE9F8jJMZ31skpMBpPNjOd61mZsnufcvIax1NgPKskTc/STJdk0by611+MZzWvInPZF6zgfbb2x2Td+ThfX1LVEB+7DdVSOe4af/C3lrcm6Jds6ddYYQyNzzpjxUbTwI/P3u/dLDMkjOdayRptL+tzFVnLefF1z1Lqe89TOURtf1M31vW35Alw7OVlZimU+bWrx59ixuHWzph4xPtsjuf8BF1mXubTlZ9bWEDdnDG1MbSz9uX4pZ0ydc+5rN9f3bdGh4AF4P8bLsbhrk/8qalwv9YOsTb38qHONi2zqL5pzvzxrz/Nnf/H6l4Hd+930xRfewe5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A78HfowKr+0T0Hda1effVVv4jnK9tGHYS9qbXHenVwY35pyFd2jV7ocneg+ORQ9cO/468DzIf99NNPr+uwcl48/roOvx38np6eDl1fXnCQizpU62w/+ugjvoR2yGazGfr5558fX6xQB6Sf1OHtm9rDyUsvvbTl0PXf/e53B5ZlvA8mvajLVyNX4Kz3B/YeeK1XPvjc69UHH3xw7Vvf+hYNWf/xj39cF38nH3/88emea2r58nj06tatW+sbN27kWhW+V6puMHvz5k24HNz+5S9/AeTNU089hZ9fKjn84np7dna2hWnnlD5wHXZ/+Wk14xILnwFk1JepPzisoF/Gh55tfA/0YD5f0oq4BnlEvfOWf8oq2QPLe1uGiZszJsOzb/zAdb0/OSR9xOsPCHTLJegADNe9Xde9hTtl5jd9OZZTv1yYeA7Wsja110C7BrbMJVvYsInIbmrseeQ6zCWPGHf+LrqLc1hGXtdc60e0A/fhWu6OcU3czxPJNDaSPLsWcWzEdbHlLvnClsMlTWweuQ453xdzvFJDxjWaa9txOXR85pA1Xpi8oWVTO31ifyuuZTz5npk2J8MPzPV40f3Mpg2XQu7D9cwwPgMxx+cQ4xnLGuPoFOPEZBGtyLI5OTaun9paa/J5TR1ijfaI9zN79OZS/PiKufaZ7t8V5TY1faMOQWvLGjoFLs3BH3ZyPNvWWvdAXDfT2fJHxh7/naN2K29sXKZkTt+/B+KTYxDLQQ7fnNoa/VzDWE17IJFLNXzKMAt42CgxcpnXzriHODLXOdpeA81AtPv3f7t+fKU/989TP8PCiSIz8mUcfvw9GzaH7cqU3KGpUXMIOjUMDkAnx8CmhjU8GN01yRNnUEPcNfGNsU/j1CC+Dnxt2SIvW3Ish3AqbxyK66HQ8os2Dsc5shabQ9Cpp8aD1bFZ3/jtvZ/XJ5f7KvfgM38W3hdcz9c056+kv+daRuYewEXmYIRhDBvu4MoctgzONjVyzRpya9x1me97gTVcn3za+Mx1n9iI2jwx7ju8eP/VMpUskZNh8zAlc3AKS+aIM2TZucyhRq5ZN9dxXq7jtdEMctrHuCZOTcu+A9PnX3mwP0u8EHNQDzvygzbnXDT8oqn3feA82ffZTQ21xnOuc8jPwz1U6iCsxUC876llBp029bJpLhn02UxOTsnjW5c12LLnemjfG+zJuWj9Mg82MdZekrv9+f18W4JrEjJgEX7yYt5nJr41yRnzsybZJG6OOeRYQ41NnOuiqdU2l9fKGLaCnX7yTE36yRo2Qh4WkzPZTR7lmDrrsY/FyTlcr0KjnmsyzOcesalfkrPm+t62FNtwgyQH+jBkXFYyloxpU4ctjxmXU2rMo4lT51znHFvHupoy5jkXX6GGocjN7MOROVki5rOYmKypZVJtXE3cQQzba8w1lRo5a/CpQdwPmvwsY2/N9dyWalz9f0YVzftPkb7MO5G4MW1rk8XZpoZBPHnWtt46OSfuPHMXxar8IM5LNkimjz3Y2Ou05Sxr4C2fy9bLqpq52OSxcy3jrIPk+rM958eE/FFMs3bL1IEjXFslQ/qyImPpU2M9+pgNy847xrX5Y+vk9dNmD4pxfHhBZm1MnlLPLMosWpaox84cMf1jNnlzZR5sYjnMGcOfpf//k7kj5e8/Y8PAksBdCnWwpiR3cqR2btak7VrG0Ej6rqUmlzb1roNOSR8uUtKXMdlRz3FZVVuX/BujJuO+D9TUuQ770kcj5BTXNGd86HpeZ+253FV27sO1rGWLki0ZS01t+tTLOHF815h1pQ6cLuWMUZe289ApXC9lZkNmrNFHw4v16cNm5rSzBluuzVfoMI+89cSxkTluLDX2QZrrQyvOGV+C62Ql+V2yuZZxbXiUSXOpqVvKO1/tnPSxU6hB5Gbn7X7KEB7sIdZlzrgxdNZn3Odx5uWaOkSdNa6R+VEc9c4zru7/ZmknJr1ne4oOVy7MJUvEMq9tjTrriMEsMuf10Uhqc3N8FO5rrTd2P52caKuZi62vrZZJtNc15lx95xhXm9df0hnDvkf6dyH3tOQQuIDrQ00YMub9jNThHpuzdq7JPLnZX4pZAye+N6wzh69kjDnH5Bh3c71rZD01xtOWWXPqrDGmJofgz7GRWPrRXC91ZRf7ElwfW0yW1NSl7Txjszaf86wxhz/Hst66++mZnYv8zGmr8zrE5vgxf46zzlIs17/Hbq7vacl9Aw/A+xJfue6xfMbTvt/cY7XOu1/eOvX9OJrzs886c2z2l2q8/v1yJ5eJ2y96c7JJbXcHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdge5Ad6A70B3oDnQHugPdgYepA6s62Py+/4a6avyykIdp772XS9KB4mv9q1/9avWv//qv51jcH5p+Ugefr15++WVyq3feeWdVh5rzylfvvffeufpj7XjhhRe2dSD6SR6I/tZbbx2+VOF3v/vdOb5fe+21zU9+8pOT119/vb9o7FhTr3C8vsSEL3fKL3iyG+e+zPKDDz4Y/unp6frZZ589+eijj1bPPPOM8wbPf/7zn9dPPfWU85c0nPole+aJwez2ww8/XN29e/fs+eef38D4iy++OOLkYpQ5RM6baztyRTTPWJ6hxcmqnm/5quFxsLjX+mpys838jOMj1M0ih8ZlUE6Jy/eB64qxPvG53vXQijXNtR25xBqW689mmfWV6i9puJRh6uWUWp7RaCTjxtS7ivM/5Y6otnziG0MbtzZj5tTUIPhjjcv0pU3jlfWPezrwEHGdHGqr4XEwudfGeT3mjM2aGoR4HyYwWnH5f+y/9C+fv7xonqsXjWPP5WNxn9PqpcbKIzltteySwzaunzFzamoQfOr4kj0Ufssl7cCX5Jr3AQM2xt8PSwPLw8L14He/v1JDmms7cQX0VeK6fs+3rc9d3FUY7+c1nXiEZf+7OZ6n8+cAfJ+92rxSY2jjHnbn89lnM9p6aq1HW1PmIY69JDxjfc6ifb6qzaP5HYhspo/tQY9lHtZwrnPU1CDD3/99Ervla+rA/jkqMzCSIjtyA1cIvnPU5GASP9lMm4OjreOwXWuNcz3jaA+aLvMQp4Y10dajEWNo1jYuX8kd9fpoBA2vMqtvHYfuevA5zDuoJ4ePdj6+tpq1nJfaPRJL22tX+CDk+buptYdEG7sOTJ8P5Nb2wAUxhsxgy0zyA2vyRo12xmWW+Qx8ao17PTk3XiVjPa/rfOPMQ9yj6xiXk8FD1aERNGzADiJnsgeLWUMerp0jy9TLLbmM6+c62NTn+sQYrKXtdfBT8Mn178izK2EH10RhLEVOiJtDy5d5NDEYthYfMU5N5rHJmXd9fTRcMy/XTL9Sh/cPNjkGwhxtOUlNDT4cLbEkU+bRMpo57BzUwavz5D2vZY37YX7a5d6zN2IpY07/jjxbct4utmEIkYOd97kvI3JDPbZx6rEzjm0ejeSzO/My7pquQ9wYa+RwL+ZZ39hs48vNkoYzhJyMyaWanDz6nMXPemxiPK+9jnOcb9w19KlDWAOx3vgu+vlP4v28/rwf91h7rmFiFmNyKTf4S7Y8yh81SzYxmDWndk05dz3j1LkmGskafOPOIYbIhxwRkx1j+oOZfd4YGuZglrzryTWaQRyNOMd4rpXXcC3rnWv9WGz6Meb383rqSrjFNbwgMrHzdj+JyZP59LWp1kZrM0f2Mo5N3Jg1eT1zxvC1yxw2PkPRV8MGkvoiO3mDR9lCM2TUuvSNoWc7/Uof1jXu+vhK5owNvf8747lYO+c78ABcy4gT5cu4OuNLNjEHc6w5FoN1xRp85+Ua1qHdD1qRGzU57dTJkjZraMsxc4gZT3+O+/6gBrEWPdtZk/aYGD/6v9VHM5bM4tr7r84yYg7jcIUYd56fh+fczKGMGqc+bZ/d1uV1iKWQy5i11Lgv+SE2s5I588RmXq2T66y13jkz18apc541+mri2l5zH/pc1fPaus+DbZ3rwH24pjZZwU8GM2/cerkynnOtIeewHu2ci2JzDesrri9LxLVnnYxoo+Uq64lnTpv1tdXEmKvvesQzhu81iCP66l10/7O5PteORedLcC1rrKctR8ZgTvuiGnLyuZvx+fso40t1ru+82fe6MxsX+eRysGb62sRhMDk0p6YGe6nGnJq6FH115rD7dyFzR474wff/b+9sduPI0msrlvu24ZFHhiceNIyCBzWtFyg/hPp1VHqd1kNYnrumNTAaRg8MGEaNDA8M494u3ljBXKmdhyfyh0xSpLQPEPz+T0Su3EylVN0Rsw41Qg0/4zFnTavGs8897Dlm7WXeZc4582nH2qiRWWwOq8+e+uYztp76JcfKfv27yqc97Us7+s6stv8OcoDjaHBC1zmrpsac8VZ91Fn2zWrsN+sZez2v9lRdTdqvzfxMg1lnJnusjda+tPgse9PP3No0+1Fdz6jMcxfomg1m2hlzYzybs0ebFzfmMk4/Z2bnGOvHtJO19NljK97Ke96sp299tnfW7vnV9T0kD0qcofljOuOcW/VZ/tycr2XWb+2Unelslst9xvoYH+s9t8b/L+HYvrnPq/Af8ya9ihfYiyyBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEvhqCNws/yf8ky/2S/s/jZ98wW14VgLDjSC++fjx4/r/6//Xf/3X/f+///vvv1+v6a/+6q9ufvvb3958++23Z1/jn/70p5vf/e53tz///PPt//zP/6yC/+mnn9b5f/iHf7hdHoh9++HDhzdv374lR33tWXRvjO0qgZXATq9qEzvzvZHfzX/+53/e/O3f/m32sA/xN//1X/9189d//dfE99ZSe7PUuBHZXpO7JuL1BmX/8R//8eZ///d/f0Xfu5o3Lnuz/B6t2o6Z6noH4ys065/1ywMPb7777rtVi3/zN39zs3z2qUuQ7DW7+Ks+d5y86V/mci5ndyN7k9pNnwZjNWuMZal9fGurv3xerz3LZ/Y+389r0HwVK7+33ixauFl0gB5TkxmnrgGknjO/NZv5EW7qlpq6VZPWtea1ztzyfWT5jsP3kFs0vfyevnn37t26X3U9Yv9i42vpGs2qbWCpYWz61GYr9Up91eHO4q/1X3755Xb5M0Qtp3Vmr2tnB127L/1dXy6BA10vL1MdqkVeuTn91K+f1/Rk3vlxlj1ma6ZR+syn7s2lzd706THmJnt7/y7dn18ogefQNehS3zOUM43SZ36ma+vUDvQbc/as9eoaHF/F2uuavy8u30PV3/rBtiNgjhA/P5fP+bx2Lvckl0v9bunz0breaZpzeo48f/1XRiD+LXnUpzozj1Wz6ZPLw5oPVHLe2bTSsgc7LjVNHh8NjzrmAUksbD7QK33nsO6ZvnrWsp/1L+5GwLy4l7h2ekQjPNhrXOoEbakjcvjm0vfhYNQ4fBg6PjXP40PQ2YsHo9vvXtR9YDo97qOPZdHvYQ6rTw9LjWnRGVrFsrAeaprYB0Lr+xB08/ZqqfMwdc5jLnvzHPj0+BDexV0XsX1e7660r/OgGXq6NgjEfwNBW6kHfaw1fA/1pBbVbfaTY5aec3z61Dn97MVS16PvuZhjeW3qwXlq5DyIUzvk1R8+NfVmH7EP3lWP1GY+uayxJzkOz0WdZY68fVjq2HH9v2p6RHI/Dl2jjdSBzeStqZvM0Zeft9T8PUhfXbMHvnuad09/D9Cy58t+917Kaz1jc9jZSp2oO3PEHuqSmrrD5mdp+tnj57Wz7uX5uC77PR+9Hlmjd1x/XnRNL0t7F/XnnkB8L0ZXLLWtJacG1Rk5tGaPdbU5WvrM4atTcuoYP/vU9ZI++D2hz0W/usY/tdRBaogZY23qTR+9qWX6zGPVLnl1iU+/sf2eYymt56WHHAtLn5bcuPKhu86NPV99/ABdw0z9YT3ULXW1Zs5+Y6w5eu0np681xwzL2dGnL1fG+f7rj9pRd6kreuzDqkF71ayWvL5zxu5rHpv+Eq6xeS1515rr57U4tu1E19msNlJL5DjUmb55LXXn9LX2OIuG7VXP9i6lfc1+rMt+46yZ06ILFjZ1NsupK/vUrDod96Ceh3Vz7se5yBmnbw1LnaW9i5a4369FsW3P1LVaSasO2Zy88Sk/+7Z66VGv2ZPn0qfO4Uqf3KgLc+rKOfVHnFqjL7VMbF1rzj3ce4zJs8a5u+zdtVozN9rqeiQyiUPXVEdNOIHGXPTw/qhP8uSM8WdH6nTsn82aY398DpYWP/chzkWNpZbSN4fVp66mtNbtIZ81fFbm+B0wz1zWch/mrOOziD2Msbn6MOmkseGfqWt1yi7qxdwsHrVnL/mZbw5Lj32Lu66sk8hY/67z00/yudQUudSaPaOejJ3Djp/b2aPv3uxLzti6eS11V/aQIx5XdT0SmcQP0DW7jJpRW9rsGXPGWPv8PSCnpu2767qvZfK879nnnqMexrx1591LjWXdHmoeWXc2c/jGzOin1Xcey9rK31WXevy90VztEQKDxmed6mO09JrTJzaXVn/sMz/a7MNnZY/+XeW8n2pHy5Q+Vt/djLM2+vaOvxtjbF/OH8tZ29vqeo/iLOcMXec+6Ck1dcw/VnNPe0Y71ontmdXMnWPVq70Zn/JndXOjZX9y5j3fsXz2HPjV9QGOk8GFuma/c/Vln3a8FvJbNc9zrJ77neqbaSvns57+2HOsRu+sPubGOM+x6VfXm2guLpyh+WN6OlbzWuzRmj9m7dUe680aenqQppY5v1fkflv+eI4x3pr74v53f5e+QZtgWiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEiiBEjggwP+nf/8AMio84Dc7/v7v/94bp2V60//v//7v9QYJPLB098DosZebi5k7+2YKDtR+tQTQqQ+gBsKq3aCxiuqPf/zjzbfffrsX2L//+7/f/N3f/R1t5+gYPR7cHORPf/rTm9/97neZo0fdps851nxvWgOKLgig2d2DHQn3utz5qeHUp32Zcz5nyM2WulSn9BzLZf3A70OkwdG1I+B3hVWffFdY/oxfSz/99NM333//PT41tKZO195JvKT2PfrYY+uYhtX6zGbuFk2zloetrvl+Xh9D/lXUHqNrAPE5rc4F5mf3mLeeFh16mDdeNbqrU8v4wK+uRVe7I7Cp66We+kRH6NRjN/5ZdZ3a5nqMv7gb6wm79nwCu5tZ5merfuraDWe6puYMvnNjnnhcaNHDmrE6ndnMpb/u0e8hovx67ajr+I6thlOz5gSmhrPHHD2ZdyYtmvQwbzzqNWN7xpk1rq7F8uVadRt65cWqNzSoj/UwP8bm1a4Pc3IPH8zEOVjm76JPP9UoGXz+HS+1ip8Pksl6+uPsuAexa1+r7kXyvHbRIvpAO+onL8C8GlJ7WGo+JNc+LL0+YBffw357fQi6dWbw3XNx14en089yT/XrnPW7ru2f6jIf4IWvps2jZX0sDyflMK+PzT4eps45nLHfHmIPcmp/dl1Leb+Y4b8Dcb6uMwmErplQM06jGTWsb0wP2iLPoU8dHx2y1K8+NXrM46tp9hl1TZ3FnLNoIWPqp5Y6Umf0oxn1gm+NXn2smrU/a+lTd59Znpo6Tuv5sOP69ePHj2/+8R//0esc640nBBZdq0uqashOauS05PXJoy1jLAcrP1vVH3l9ZrNHXZvHslLjnuuucncuz22/tZlFM2oJfbHUYPr2qUt60JSzmcc3T0/q1j7tUl7r2eO5qLkXfq61Z/m8pt51JoGdrtHFTBvqVEuPWuIMaI1l3hpWn56sZ35WM8f7id6ZzfklXJc56+a3rBpSV/Thc7D0s8/ema7pyxl1SV4t25N7jj7nzj7iXLfL31fe/P73v6+uk8oJ/0xdox2WWkpfXVnTprbVcubQ71be/dU4sb3sz/I8xnfZ4z9TP6O+ssYuahp7SrPqO2fS91yew/2x5Fj230Wffq6zu79/2vupWm9KYNG1+pjVqeVBT8ZqjTw+C+thr33E+lpzanjMU2eZx3dfLblz1qqRpTGtejLHPvjmsalr82PPmM+YXlbm8F25lzntOrvoOvut1W4QOKFrptSO1p2I1Zq1mc2ec3z1zXns573F53Dl+c0ds+yRB73Eas04e6xps/+U7345m3vr08ca47vsXZ7/rsk+XRcQ2GmbCbSSy1i9Uhtz1ras2nTWmH51qp/WfnIs5+6i+7H5Y1btYF3qJWujP2rTmD30x33Muxe9+lpzWOfxc9Hb/16fRM70j+h6RbrbRn2lxR9j2lOD9mi3aubtG/chzlrG5F2rDgwWa00tZT1z6TOT8ahRNZg9+pwaf9ZjDeue+CxmZmvN775fz+rNbRC4UNe5S+rsMX5qmv3dS+s5iXON9azN/NSedfWUtdFXg5lnPuOZT46lxvHJcd3WzGVMzrXmq2txXG5D37Ph1JR+Wt8vZjOfvrXM6Wctc+RZ5Mxr10LkjWeW65tpZ5a3Tzvq0v3HvP3jnpl3NnO8HmPrB7a6PsBxUXBC17mXukrL+2JM7+iPsfvN8mNu3Hs2a+6UnennVM46Vn88z1gz5rXkjL523GcaV9dTLGclL9C1+6X+Msd7Rs33NPtmOWbHHnKszKcWzGvvuk//ZI/chwn2GHPkzWnJjYua9dzHXPaTy56sbfrV9CaaRxdOaN73Cru1tnrMM+e8NvdSE5l7Sp/zzbQ5ntPrOta7WUOzsP1StTt7I0eAjUugBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBK5AYLw5xHKDdG6YdnItDwL2xghabvzo3D5norYEHkhgFdWi02O6nNX2Yjxy3lGnxlpH9zct+1Jv9uELrb0egeGzFT2mJvW1nFgfq0/+1KIXzXpk7Oxa4wEYPsR9KVTX0qk9h8CqyUXX9OKvcQxu5Wyxjl03sXDCbup6eQDX7S+//HIbmmYr+3sz6hNgW14JrDq+gq4vxalO/X3Y/06g6x9++GF9YFFo2/7q+lLSX2f/i9P18jbsNRxvyT7X79dBpe4WgZeg6/13591F7jUcF73PVddBpe4WgS1doyNqHjm/zuwSs3r2bvnqlPnqeotS8zMC3AXXfP47XGpx5pOzH59FPObsM782nvihntMyQoy+zWdOnxrLPvzsN15tP9fB8PnXokEfModO1JMXlhpSR+Q4mCPH4UNyja354OjMU/Nh0ezjQ9PJu8/ivvntclBnMe+exOTzvOSOLXTIAxl9KCO9PFCXmIVmOazjU/dB0dbcA2tuZsnN8v4+YKl7XYu7+qP9dfk98RqpdZ1JYNE1+lAn6shpYg40xbLXvDF1e9QyPdTVI7418+5NDz4aZ+HbS+we5NGCseenZ2sxo17VI73qLn11p+bVp5Z599CqTax7WnPOfcmzyNuPn4s8C/vnRdf62K4zCew+r2GIRlgryDt3/Uk+9UOdQy3SlD2pucwzo1addR9jLXvSS51rc09iltdD/tRiRh2hK3VDTp2RI1Zj5DnMYenJHD65nKVvls++0fecy+i6qLuqa0lcaEPXakbrTsTqE+bW1R2xOWZSg8ypVXrU4ZhTp1r3cV/3Ic/ynNl/V5n/HLVElxp0gpgjezOnb48x/ebwU9fulfmlZX+OrJN3kWfxPQRrjN91BoGdrrNTLZlTQ+aN1RQxvgvfw5ozqWdz9Jp3n5xjX/L2E1s3T+7YSl2pEXXJnDk0ySK2PuaoZV3ffOqavYzx1T8+yxlsLuPqOqlc4C+6RiOs1M1d5i6Hn3ojtlddGc9s9uhr3ds588Rq3fNZI3Y5Z7xl1U/W1S056+qOWF+r1tRp5kff82Tec8ys/Qe2f2c8wHFRcELX7pX60U9Ln7rDuugx1nfOfOrXPZhPP2epuQf2nJVash/NcbhSg+Qydj5z+lu9OUOPcfrkNld1vYnmZCF0Te9MJ2porGdeDZpzn4zxxz73NK81j2XlLFpwX2vYU0tdqSUs2sxlDzl1qzXnjJa8c+6JZc3iu8qnc9tr3niR9U2ew3rtGQTO1HXuhKZgn5+z1lN/5NQflpXxMZ9eNc65sneM3ZuZrcVMHsxkzJwaMk+ORd6alnz2kTfW2oNlkbdvTex+kM9lXF0nlQv9B+qas4x6UntegbE2Z8xhXWPOmLp9WmfQ/rkr9cbMGKfm1JZ9nmPssS/3MscM/S7z2jE/xtW1RB5hB30f20ltbdmcpSf79OkZa+awrKwbr4XhR+45lPbhqCUL5kdLndyYN7auzV5yrjHvvNa+qV2EfVbfdLjJlcAFupbYqDvz2NTa6GecM85Zx3Lw3pqj55ordZM+5yAec+TzM5jYtdWfe6Tv3KatrjfRnF14gK5z75nuTuVm9WN7nurP2Ut8taY9NkvPqb5ZfZY7dp61Vl2fRPSohgdo/pgGj9W2rtMZ7VbfJflzNHpsv5lWZ7npHl+DZq/5Zk0hNlkCJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJfA6CexuaJL3p7jkRn1bL3q8kdPt13CTjy0YzT8NgdCu+tVyQnxvQpN5cmNMf66czTyz7kl+9avtRFT/MQRC026DFlOv5rGjTse+1Kq1zL1ZHo7+5pdffrldHoyeeXXNOTJP3FUCFxNA1+/fv7959+6ds+hRTZrTkk/djX2zWub2umbD0Pbas3xekz7oJ9FVApcSeG5d765P7R7Y6vrSd6/9WwSq6y0yzb9mAi9B18v3oDfL9yD+TQSUfoa/Zqy99icggFaXbTnGf5NbhbM75azHB83kVblPzmb9lI9O87DfHPH60I0//vGPb7799tvVX3Kcb9T4Wqv+QfYyV2iPhyKN+uOi1RMP22WpK/t9mBJ5H8jLPhzUsg+fRV/2GLs3D03X/8vwF/fgeuwhv7XQIA8/H/XLQxnVbvbgW8PqZ17funtzHmoc5Jz19yJz9Ixr3Wf5ffm/vC/Lcm7sa3wGgYWhGhx1QuxBjz67qlGsefVJXZ+a+6tlauRZajj3t06P/tq8/HAPz2t+y6ottUaf+lp1tMTU0CRLnxp+Hv+XhmWRY19W7q/vvsT4rMwxb34t7n6Qf7Po2WvJWv3LCNz8+OOP/Puauhqn1ax6oq5WybHGHmJ0557OGqtJ4vSXcN0rtYxPn2s8t/kti37UkVrCbmnQmnNqM7VszV73d0+uxRqWw2VP5qzZy8OkZ3X7as8gsPsuoubGCTWblh76nRlrxKnrWeyM+2BZ9mJZ6v4u+vQ75Lz5LatWtPThq0XjmX7tcZY4c8bmtOzJck/mWXlec3eVTz/5AsJc1yMJnKFrzpC6I069qcFR5/ZQz9qWz7705pw+NZZ69px32e2falIdZYwOWeT8sx8/82qMfPpqWOscloOVNWJr7k9uXNX1SOQR8aJt9DNb6kct2mOcOkufvuzB52CNvufQOkfvlq6zh76thZb83LSHnNoatTbWUpujn3uwd9Zn8VaOPItzs9C2/l2mPx9E4Iiu2W/U65jL+kyb9KtPe1PjuV/2jvmMPQ+5Y0vdpk7MOUc8fhZTs0+bvx/kWKll+8baXefdz/F3IWvOVddJ5RH+omt1NttFLaaW8HNm7MnP07Hmnw3m3YeYZR6b+6zFXV3/HKte7CVWj+bUNTF1D/JchzOLu6/h5z6jZrOWc+w1W2u+n9UzNA/LndA1m6o1TzDTon3Y1GPOznxz2nEfYpc9WvNbdtSjfWpLm5rUp1efPg/y+lpzafN3JfPMzNaar65naB6We4CuPRH6cqk1c2mt0Ws+fXMza87z+DuF3dKIvditz0173CNt+vapceKxTuxhvz1jPOYP6tW1OB5vF12P2pltmj34GdufOf20+MbOYDOXPfqjFrI/95n54yw9Y26m2bGPmZybxcy4ck9zOW9utdXzAY6rBGfqOs+lrrSzWub8jM0cvvPaWf1YbeyfxTMtjZoc55zRUt/yx5p7zXRt7Z6tru8heXTiAbrOc56ru1nfLJd742/1bOXH+dRj1q6R39qD8xyr5XWsfnV9D8mzJC7Q/jl6O6eH13Vu3yUMLtHbub1n9X0t2n2KN+2SN7i9JVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJfAiCCw37smbpa03qvlabkTzIt6AXsTVCexuRjXeZ6g3SL866W74nASq6+ek3XM9F4EtXXP+fhd5rneh57k2ger62kS730sgsKFrLq3fsV/CG/QFXwPa8zvB4n/z4cOHm7dv3/KK8+97+vx7Rv77RpKhh2Ornr3ps6c3W5/d2JfcLM8e1vp7Ao1XttDeordvFr3lQ7vyVagnNJU9qbV8qJ0Phabfg7o95rDs4YOjcz/3WMrrspc98M9daJoHkGLZXw1jyfsgO+rHDvqsM4vvvsZZJ+dB3vMs7sG6Xdj/+eeff75dHu5NX9eVCCw8v1kels5u6m7cGT2krohZ6jDr+KlT5nJWf8znXmrXXs7FMtbeZbd/qqtRU+iHGhZt2mdOHWafPj1qXOu8PUvLurfWPPbeQte///3v2avrigTQNdst2k5t5RlSt2vvUrRXjRkzR87fEfKpU+q5X9bxWTl/l5mfz9qWTb2lpsizyKU2ie3Tpxd/3IvY2cVdl325xzhvb9o/L9/VnMl8/UcQ4HvI+/fvb3a6Zif1lbuqX6yLPg+0yzK2jzg1bh7LQZ1lnjhr1u0hzhz52aJHLapB+2Z5c/SgMQ/zxPpac8yQM8ay7Et7Vzn8uc7595DDUqOHEkDXu9nU1ridGrSXOr5548zZa4+WXn16csYa1ho+ixnn1sQZP9AUn6tYlzojVoNq0tqx2FrOO4d1T3zWGN9l737u56rrxHI9n3+vWHZTi+PGaoweln3mM3Yfcxln/1jPvfXvznb3033y/FkffTVDXm1lj/q0bxbTT915fFbOGOf82rTrG2etaX+tpkVxfXtC15wQHY56G3U6i52d1czZg1W/1HKRH8+f9S0fXakte9TlzNKTGk0tU3Nm3Ne8/dmbOfK5quukcWV/931k1JJnUX9jXZ1lftTlGLNn7pf+WPP8x/LZk746I4cGvUY1hk390pe1nDdvP73pO5sz5ug7tvrv48foPLJ2pq7Hs4y6VjtpU7fm2edU3nM5k2BGX4cAACEpSURBVFbfnplNjaEtZzI/+uxDjqVN/R7rV7/OjfZu1/s/q+v7TK6WeaCuPb+aIcb3ME6r74zWvDbz5FzurW7Mz+xWj3ls+uwxi815Ducyn/5sH2dHW12PRK4c77R9bNdRa2psnMk+/dEyM8u5l7UxHvPWZ1b9jbVRg9Qzp5/z5txrK858+s4d2P6d8QDHkwRn6Ho8rxrTZn3MZZy+M2NujO27llVz2nFf89qsH8vNajl74FfXBzieJHiArvM6tnQ4y89y5+yVPdfwj2kwa+lvnfecnnuz1fU9JM+euFD3p7Sb139Jb85d079El2f1fo2afQlv5DVF0b1KoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARKoARK4EEE8oY9y81o3OOsm9fYXFsCL4zAzaLre5f0Nd5s6R6EJl4zger6Nb97vfYtAtX1FpnmXzOB6vo1v3u99k0C+fdGm/r9WhK1z0EgNLj/h4vdeTP2wTWzS6Ive2c9Y46/WN7/y+Vdl/nR5h59WEbSeF3+qpVFd/kALx6W6/vNq1FT9mjNa8nzoHRie7AcPoDXeKyPMeef9XpdnOOcxYON8nCGnA+FZk9irfnMjf4473Wx/zifNeos5tejf8asPK79Y9UHn6cfP3785ocffmB/9JQrdTvz6c18ahQ9Z2yfOiee1TPvjOfBnrPUk5okzmOvrSGvLum1h/PhUzPvXuRZxvYYY8fFDPk+yHEkc50YzbzZfU9QP2suts+8ms/c6KtT8vgc6phtzeHbM+5h31gnf8lCO+rUOfWm/sinfle9LTmtGjR2Xj1bZ5/syTy1XLcfPny4ffv2bXWdVK7no5vUNeGaw9ktY+x40KKO8VO/Wcue1LUz5Fh5LmNy1sldstSglll9dWmsVY/E6Rt7fn4vWM6l79zasOvRz75+h08q1/NXHQ2f1+PuqTX8POw1l/qlps7dg5y6diYtdXszr099XOiK5dxddPdTLab2qBinNY8m1WXW07eXHL2uWQ818rn2ff1+nViu64eu2XimD3Wl9QKMnVHXxlk3N/ZkbI/X4byx573EqlFn9ppaEumrz8zpMzv67kuelXbsvev49HPt3WnauU/VelchcKauOZe6U29Y3pfMq1P7s3fMZZx+7jfz6WWNmrA3a/R4kGcRpy5zH2v2aXOP7KHOsu7vx132/jXa+6a6FtHT2J2u3Ty1kTnyWUufPmI0zbKGzcOadeLx94Acyzn9tPinFjpjqd+76O6nGiRK3x5n3GPsMU7rrDn3Np+WHnSNWX2crusSOKHr1CAnNtbOctawedhr3XhmzTnP+59z1I8t9YLVz35zY91Y64wxlqVN3561Yegxt++vrhPJ9f0TuuaEqaf0vZjMjT5x5txvzM963D/t2Jc1/dScOa21LUvfVm3Mj3vm7Ojbu89X14nkafxB2+ecxO8c9qbe0t+qZ0/62T/mx9jemVWD1M7xs89+7bg/+VltKz/Or/Hu+/W01uR1CDxA13li9LalOfPanMM/Njv2Xjse/4437n+OTs/pGfdd4+p6iuXqyUdq2+sZ9TvG9qXNnvSz59r+uXqkb7a28rPeaa66nmJ59uQDdX9Kp6fqz/E6j2n0WG3z2r5Gzb6EN3LzDWmhBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEqgBEpgSmC9t+xyA+Isjg9CyNq1fU+s9SFd1z5P9/vMBHY3uUZvs4eKenVoz4Mc/XnkrL7WPueNseSybwn3DwyjRk8uZzOHj073Wt0VeThBPujLunlrWuo+bBrf/FY/p7HHWeLZcj8eJL3VM5tr7oEEfvzxx2/evXv35qeffvqL77//nl1GLZFDeyy0xlKT9hpTo1dNpk/NPL4z5NyXvD3UPcjnIu9CM+NSR1gPesynHtUZNXVNzrw+dRaxe9qTs2tT/HBu7fkabwAfLJ7NjYcSqF3OnbohHrU2y6lBrXp1rzE2z3n1t/Ylf8lCQ6MemSdvTR/Lwqpre8ynfp1zf3pYzt5Fhz/3M9X1IZinikLXand2qqypQXIuNUtMPQ/7Mpd9uXfmPY+W2riooZnZQnfWtPSlHtWbdfXr7JjPfn32xHeGeLbWnkXX1PC7npBAfL8G+JaGtrTHlTnnbMajr8bHuVneHmwuz2NuSyNqbewz71xatZk5fA/20te6v78T5GeLPN+vqW31zOaaexiBO9C3t2pwtou1tXdpMKZ35psb+807h1XTY2/24LPsuYs+/ZzphJwHnfZg1aD5rDmzlRvz7MHie8ixdbtoOs97rLe1xxNYtRKf21s7pibpyXjLz8/59Ty7ze1Pm+dV65nDzz3GmnrLvBolZ91cxs6ou7HH/GwfZ50xHm11PRJ52njVyqJrzrKlG/Pa7CVnXqsux5p15llj/S776TPcHvOXWLSodp0zTg2aoydnMj/rz5yznmdm0XXuOetp7noEVq2d0DVnS02OvnHa9HPevLmMzaXFd4295rEzzZjT2jfG7uPnctbHGWtYfXvcZ2ar6xmVp83dXKDrLW1lHj9jrn7MWdf6CsfYvHZWT33Zhx3zxlp7jUc71sc97R/zzqWtrpPGM/q779inzjjqKuMt3z2znrnMp589qaGxJ2vOYGd5c9qt/kvrs/7cu//N/oDG8wVn6nq8IDWmtT7G186735YddTbGzl2Sz9703euo7ffro3ierPhAXXs9Wzq2jt3q2crn7DX9LU1u5fPc5/Rk/96vrvcoXpxzgfYfo9XHzCazB2tw2eSi2a9Zs9d6s/KNq18CJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJVACJfByCPiQkEuvaLl3bx8sdym0L7gfHfmAunyw1/iSue8xD4H2AdTeBxlrjRn83+wsfu5J7KKHmnXzWOfsN84ebljtg4/ME3PQ7w2t7bNm3tmxbp49xxl6Of7frobvNS7u/pz6PJj01IMe6e26PgF1zc5qLN8rz0iOQ82Stw/LrLF+5vWZY9GTD0tHIyz73Evrtd113WkoNUieWO0xp2/NfvL6WOfM0W9P7kGeHrTqjNdHjV7Xuld1LY5nt6lr3yNtXgw5DrXIezjq1/7UYPa4B33k3cs5rX2cQx+bS72pJerm7MtYHZozpnfV4DBvH3aso2vyW2s/2+9GW4iePJ+6zpONOlJfqVlzzI3fT+zLHvfkfadfzTPPok7NGftHS6/awXelVsllD/6oz7FnjN3POeosv1uw52yZ70N3Z3SeJzfTtTrKK5hpzT5r9Otv1dwTTY+6toZ1H3NjnJqlZ4zNaamrz7GXmJU9xmOOfO5DPC7342F3/g6MPY2fmEA8HMnP2K0zoi17Urf0Z14Namf7WRv3odca+tA3j2VR8yCmL2NyxC4/e43T0md9a4a857A39xj9dZ9+DxmxPF98oa7Vme+zcV6wubTWybn8XTDWOmeMneX83LSPa1r1ZGKIs6aPdR98Dq/R2Dp5c9hja61X18cQPW0tdM2JfO98bz05sQc53jd7Mk8t4+yhxrI+q911fNp7KyY/09aYM8aqz3HWvL3UWcTmsF7vse8W9q1zi66dZ7+uZyRwga65Kt5b3ztjre87MWsrNp+f1+buJu/PzvabaSZz+BmrX/bKfPblddCfNeao5z7kctFPz7p/dZ1ontd/pK692NSDOax57VZunMn+rKWvhsyNGiS/6mux7DfWrWnpzzX2U2Of6jopvXB/0Pc5V6v2sPrMqRNz2nFP5+zP+jhjrz0zzc32meXcQ5s6zfM6O9bNO3/P9nP6HpLPlniArvNa1R3veWoDf6YDe7S5F/5WfuzLeHYecrO8c1vX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'

	};

})();;(function(){

	'use strict';

	/**
	 * Modes
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

		this.animationDuration = 500;

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

		this.infospotAnimation = new TWEEN.Tween( this ).to( {}, this.animationDuration );

		this.addEventListener( 'load', this.fadeIn.bind( this ) );
		this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
		this.addEventListener( 'click', this.onClick.bind( this ) );

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
	 * Link two panorama bidirectionally by attaching infospot on each other
	 * @param  {PANOLENS.Panorama} pano  - The panorama to be linked to
	 * @param  {boolean} ended - If this linking is the second / last iteration
	 */
	PANOLENS.Panorama.prototype.link = function ( pano, ended ) {

		var scope = this, spot, raycaster, intersect, point;

		this.visible = true;

		raycaster = new THREE.Raycaster();
		raycaster.set( this.position, pano.position.clone().sub( this.position ).normalize() );
		intersect = raycaster.intersectObject( this );

		if ( intersect.length > 0 ) {

			point = intersect[ intersect.length - 1 ].point.clone().multiplyScalar( 0.99 );

		} else {

			console.warn( 'Panoramas should be at different position' );
			return;

		}

		spot = new PANOLENS.Infospot( 
			pano.linkingImageScale !== undefined ? pano.linkingImageScale : this.defaultInfospotSize, 
			pano.linkingImageURL !== undefined ? pano.linkingImageURL : PANOLENS.DataImage.Arrow 
		);
        spot.position.copy( point );
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

        if ( !ended ) {

        	pano.link( this, true );

        }

	};

	PANOLENS.Panorama.prototype.reset = function () {

		this.children.length = 0;	

	};

	/**
	 * Start fading in animation
	 * @fires PANOLENS.Panorama#enter-complete
	 */
	PANOLENS.Panorama.prototype.fadeIn = function () {

		new TWEEN.Tween( this.material )
		.to( { opacity: 1 }, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.onComplete( function () {

			this.toggleInfospotVisibility( true, this.animationDuration );

			/**
			 * Enter panorama complete event
			 * @event PANOLENS.Panorama#enter-complete
			 * @type {object} 
			 */
			this.dispatchEvent( { type: 'enter-complete' } );

		}.bind( this ) )
		.start();

	};

	/**
	 * Start fading out animation
	 */
	PANOLENS.Panorama.prototype.fadeOut = function () {

		new TWEEN.Tween( this.material )
		.to( { opacity: 0 }, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.start();

	};

	/**
	 * This will be called when entering a panorama 
	 * @fires PANOLENS.Panorama#enter
	 * @fires PANOLENS.Panorama#enter-animation-start
	 */
	PANOLENS.Panorama.prototype.onEnter = function () {

		new TWEEN.Tween( this )
		.to( {}, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.onStart( function () {

			/**
			 * Enter panorama and animation starting event
			 * @event PANOLENS.Panorama#enter-animation-start
			 * @type {object} 
			 */
			this.dispatchEvent( { type: 'enter-animation-start' } );

			if ( this.loaded ) {

				this.fadeIn();

			} else {

				this.load();

			}

			this.visible = true;
			this.material.visible = true;
		} )
		.delay( this.animationDuration )
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

		new TWEEN.Tween( this )
		.to( {}, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.onStart( function () {

			this.fadeOut();
			this.toggleInfospotVisibility( false );

		} )
		.onComplete( function () {

			this.visible = false;
			this.material.visible = true;

		} )
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

		PANOLENS.Panorama.prototype.onLoad.call( this );
		
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

		this.setupGoogleMapAPI();

	}

	PANOLENS.GoogleStreetviewPanorama.prototype = Object.create( PANOLENS.ImagePanorama.prototype );

	PANOLENS.GoogleStreetviewPanorama.constructor = PANOLENS.GoogleStreetviewPanorama;

	/**
	 * Load Google Street View by panorama id
	 * @param {string} panoId - Gogogle Street View panorama id
	 */
	PANOLENS.GoogleStreetviewPanorama.prototype.load = function ( panoId ) {

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

		if ( this.gsvLoader === {} ) {

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

		this.isIOS = /iPhone|iPad|iPod/i.test( navigator.userAgent );
		this.isMobile = this.isIOS || /Android|BlackBerry|Opera Mini|IEMobile/i.test( navigator.userAgent );

		this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.addEventListener( 'leave', this.resetVideo.bind( this ) );
		this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	};

	PANOLENS.VideoPanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.VideoPanorama.constructor = PANOLENS.VideoPanorama;

	/**
	 * [load description]
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
			scope.setVideoTexture( scope.videoElement );

			scope.onLoad();

			if ( scope.videoElement.autoplay ) {

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'updateVideoPlayButton'
				 * @property {boolean} data - Pause video or not
				 * @property {boolean} [ignoreUpdate] - Ignore passiveRendering update
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false, ignoreUpdate: true } );

			}

			// For mobile silent autoplay
			if ( scope.isIOS ) {

				if ( scope.videoElement.autoplay && scope.videoElement.muted ) {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 * @property {boolean} [ignoreUpdate] - Ignore passiveRendering update
					 */
					scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false, ignoreUpdate: true } );

				} else {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 * @property {boolean} [ignoreUpdate] - Ignore passiveRendering update
					 */
					scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true, ignoreUpdate: true } );


				}
				
			}
		};

		if (this.videoElement.readyState > 2) {
			onloadeddata();
		} else {
			if (!this.videoElement.querySelectorAll('source').length || !this.videoElement.src) this.videoElement.src =  src;
			this.videoElement.load();
		}

		this.videoElement.onloadeddata = onloadeddata;
		

		this.videoElement.ontimeupdate = function ( event ) {

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onVideoUpdate'
			 * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: this.currentTime / this.duration } );

		};

		this.videoElement.addEventListener( 'ended', function () {
			
			if ( !scope.options.loop ) {

				scope.resetVideo();
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true, ignoreUpdate: true } );

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

		if ( this.videoRenderObject && this.videoRenderObject.video && event.percentage !== 1 ) {

			this.videoRenderObject.video.currentTime = this.videoRenderObject.video.duration * event.percentage;

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
	 * */
	PANOLENS.VideoPanorama.prototype.getVideoElement = function () {
		return this.videoRenderObject.video;
	}
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
		this.passiveRendering = false;
		this.userMouse = new THREE.Vector2();

		this.quatA = new THREE.Quaternion();
		this.quatB = new THREE.Quaternion();
		this.quatCur = new THREE.Quaternion();
		this.quatSlerp = new THREE.Quaternion();

		this.vectorX = new THREE.Vector3( 1, 0, 0 );
		this.vectorY = new THREE.Vector3( 0, 1, 0 );

		this.addEventListener( 'panolens-passive-rendering', this.onPassiveRendering );
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
		
		if ( this.passiveRendering ) {

			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'render' } );

		}
		
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

		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: 0 } );

		window.cancelAnimationFrame( this.frameId );

		PANOLENS.Panorama.prototype.onLeave.call( this );
		
	};

	PANOLENS.LittlePlanet.prototype.onPassiveRendering = function ( event ) {

		this.passiveRendering = event && event.enabled;

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
		idleImageUrl = idleImageUrl || PANOLENS.DataImage.ReticleIdle;
		dwellImageUrl = dwellImageUrl || PANOLENS.DataImage.ReticleDwell;

		this.autoSelect = autoSelect != undefined ? autoSelect : true;

		this.dwellTime = dwellTime || 1500;
		this.dwellSpriteAmount = dwellSpriteAmount || 45;
		this.dwellInterval = this.dwellTime / this.dwellSpriteAmount;

		this.IDLE = 0;
		this.DWELLING = 1;
		this.status;

		this.scaleIdle = new THREE.Vector3( 0.2, 0.2, 1 );
		this.scaleDwell = new THREE.Vector3( 1, 0.8, 1 );

		this.idleTexture = PANOLENS.Utils.TextureLoader.load( idleImageUrl );
		this.dwellTexture = PANOLENS.Utils.TextureLoader.load( dwellImageUrl );

		this.setupDwellSprite( this.dwellTexture );

		THREE.Sprite.call( this, new THREE.SpriteMaterial( { map: this.idleTexture, color: color, depthTest: false } ) );

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
		this.TOUCH_ENABLED = 'ontouchstart' in window;
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
						handler: handler( 'enableControl', 0 )
					},
					{ 
						title: 'Sensor', 
						handler: handler( 'enableControl', 1 ) 
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

		var scope = this, item, isFullscreen = false;

		// Don't create button if no support
		if ( !document.fullscreenEnabled       && 
			 !document.webkitFullscreenEnabled &&
			 !document.mozFullScreenEnabled    &&
			 !document.msFullscreenEnabled ) {
			return;
		}

		function onTap () {

			if ( !isFullscreen ) {
			    scope.container.requestFullscreen && scope.container.requestFullscreen();
			    scope.container.msRequestFullscreen && scope.container.msRequestFullscreen();
			    scope.container.mozRequestFullScreen && scope.container.mozRequestFullScreen();
			    scope.container.webkitRequestFullscreen && scope.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				isFullscreen = true;
				attachInfospotsToContainer();
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

		function onFullScreenChange () {

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'toggleFullscreen' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleFullscreen', data: isFullscreen } );

		}

		document.addEventListener( 'fullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'webkitfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'mozfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'MSFullscreenChange', onFullScreenChange, false );

		// Attach infospot to container when fullscreen
		function attachInfospotsToContainer () {

			var infospotElements = document.querySelectorAll( '.panolens-infospot' );

			for ( var i = 0; i < infospotElements.length; i++ ) {

				if ( infospotElements[ i ].parentElement !== scope.container ) {

					scope.container.appendChild( infospotElements[ i ] );

				}
				
			}

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataImage.FullscreenEnter + '")' 

			},

			onTap : onTap

		} );

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
			item.seekBar.setProgress( 0 );
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

		function onTap () {

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
	 * @param {number} [scale=1] - Infospot scale
	 * @param {imageSrc} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
	 * @param {boolean} [animated=true] - Enable default hover animation
	 */
	PANOLENS.Infospot = function ( scale, imageSrc, animated ) {
		
		var scope = this, ratio, startScale, endScale, duration;

		scale = scale || 1;
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

			this.translateElement( event.mouseEvent.clientX, event.mouseEvent.clientY );

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

		if ( this.element && !this.element.locked && this.getContainer() ) {

			this.translateElement( event.mouseEvent.clientX, event.mouseEvent.clientY );

		}

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

			this.scaleDownAnimation.stop();
			this.scaleUpAnimation.start();

		}
		
		if ( this.element ) {

			if ( this.mode === PANOLENS.Modes.CARDBOARD ||this.mode === PANOLENS.Modes.STEREO ) {

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

			this.translateElement( event.mouseEvent.clientX, event.mouseEvent.clientY );
			
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

			this.scaleUpAnimation.stop();
			this.scaleDownAnimation.start();

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
		height = element._height;
		delta = 30;

		left = x - width - container.offsetLeft;
		top = y - height - delta;

		if ( ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) && element.left && element.right ) {

			left = container.clientWidth / 4 - width;
			top = container.clientHeight / 2 - height - delta;

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
	 */
	PANOLENS.Infospot.prototype.addHoverText = function ( text ) {

		if ( !this.element ) {

			this.element = document.createElement( 'div' );

			this.element.style.display = 'none';
			this.element.style.color = '#fff';
			this.element.style.top = 0;
			this.element.style.maxWidth = '50%';
			this.element.style.maxHeight = '50%';
			this.element.style.textShadow = '0 0 3px #000000';
			this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
			this.element.style.position = 'fixed';
			this.element.classList.add( 'panolens-infospot' );

		}

		this.setText( text );

	};

	/**
	 * Add hovering element by cloning an element
	 * @param {HTMLDOMElement} el - Element to be cloned and displayed
	 */
	PANOLENS.Infospot.prototype.addHoverElement = function ( el ) {

		if ( !this.element ) { 

			this.element = el.cloneNode( true );
			this.element.style.display = 'none';
			this.element.style.top = 0;
			this.element.style.position = 'fixed';
			this.element.classList.add( 'panolens-infospot' );

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
	 * @param {boolean} [options.passiveRendering=false] - Render only when control triggered by user input
	 * @param {boolean} [options.viewIndicator=false] - Adds an angle view indicator in upper left corner
	 * @param {number}  [options.indicatorSize=30] - size of View Indicator
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
		options.passiveRendering = options.passiveRendering || false;
		options.viewIndicator = options.viewIndicator !== undefined ? options.viewIndicator : false;
		options.indicatorSize = options.indicatorSize || 30;

		this.options = options;

		// Container
		if ( options.container ) {

			container = options.container;
			container._width = container.clientWidth;
			container._height = container.clientHeight;

		} else {

			container = document.createElement( 'div' );
			container.classList.add( 'panolens-container' );
			container.style.width = window.innerWidth + 'px';
			container.style.height = window.innerHeight + 'px';
			document.body.appendChild( container );

			// For matching body's width and height dynamically on the next tick to
			// avoid 0 height in the beginning
			setTimeout( function () {
				container.style.width = '100%';
				container.style.height = '100%';
				container._width = window.innerWidth;
				container._height = window.innerHeight;
			}, 0 );

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

		// Append Renderer Element to container
		this.renderer.domElement.classList.add( 'panolens-canvas' );
		this.renderer.domElement.style.display = 'block';
		this.container.appendChild( this.renderer.domElement );

		// Camera Controls
		this.OrbitControls = new THREE.OrbitControls( this.camera, this.container, this.options.passiveRendering );
		this.OrbitControls.name = 'orbit';
		this.OrbitControls.minDistance = 1;
		this.OrbitControls.noPan = true;
		this.DeviceOrientationControls = new THREE.DeviceOrientationControls( this.camera, this.container );
		this.DeviceOrientationControls.name = 'device-orientation';
		this.DeviceOrientationControls.enabled = false;

		// Register change event if passiveRenering
		if ( this.options.passiveRendering ) {

			this.OrbitControls.addEventListener( 'change', this.onChange.bind( this ) );
			this.DeviceOrientationControls.addEventListener( 'change', this.onChange.bind( this ) );

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
			this.reticle.show();
			this.registerReticleEvent();
		} else {
			this.registerMouseAndTouchEvents();
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
			object.dispatchEvent( { type: 'panolens-passive-rendering', enabled: this.options.passiveRendering } );

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

		if ( pano.type === 'panorama' ) {
			
			// Clear exisiting infospot
			this.hideInfospot();

			// Reset Current Panorama
			this.panorama && this.panorama.onLeave();

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

			this.options.passiveRendering && !event.ignoreUpdate && this.onChange();

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
	 * Disable additional rendering effect
	 */
	PANOLENS.Viewer.prototype.disableEffect = function () {

		if ( this.mode === PANOLENS.Modes.NORMAL ) { return; }

		this.mode = PANOLENS.Modes.NORMAL;
		this.disableReticleControl();

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
	 * Enable rendering effect
	 * @param  {PANOLENS.Modes} mode - Modes for effects
	 */
	PANOLENS.Viewer.prototype.enableEffect = function ( mode ) {

		if ( this.mode === mode ) { return; }

		var fov = this.camera.fov;

		this.mode = mode;

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

				return;

		}

		/**
		 * Dual eye effect event
		 * @type {object}
		 * @event PANOLENS.Viewer#panolens-dual-eye-effect
		 * @event PANOLENS.Infospot#panolens-dual-eye-effect
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: mode } );

		// Force effect stereo camera to update by refreshing fov
		this.camera.fov = fov + 10e-3;
		this.effect.setSize( this.container.clientWidth, this.container.clientHeight );
		this.render();
		this.camera.fov = fov;

	};

	/**
	 * Enable reticle control
	 */
	PANOLENS.Viewer.prototype.enableReticleControl = function () {

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

			if ( this.options.passiveRendering ) {

				if ( !pause ) {

					var loop = function (){
						this.requestAnimationId = window.requestAnimationFrame( loop.bind( this ) );
						this.onChange();
					}.bind(this);

					loop();

				} else {

					window.cancelAnimationFrame( this.requestAnimationId );

				}

			}

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
		pano.addEventListener( 'enter-animation-start', this.setCameraControl.bind( this ) );

		// Start panorama leaves
		pano.addEventListener( 'leave', function () {
			if ( scope.options.passiveRendering ) { 
				window.cancelAnimationFrame( scope.requestAnimationId );
				scope.animate(); 
			}
		} );

		// Render view once enter completes
		pano.addEventListener( 'enter-complete', function(){
			if ( scope.options.passiveRendering ) {
				scope.control.update( true );
				scope.render();
			}
		} );

		// Stop animation when infospot finally shows up
		pano.addEventListener( 'infospot-animation-complete', function( event ) {
			if ( scope.options.passiveRendering && event.visible ) {
				window.cancelAnimationFrame( scope.requestAnimationId );
				scope.render();
			}
		} );

		// Show and hide widget event only when it's PANOLENS.VideoPanorama
		if ( pano instanceof PANOLENS.VideoPanorama ) {

			pano.addEventListener( 'enter', this.showVideoWidget.bind( this ) );
			pano.addEventListener( 'leave', this.hideVideoWidget.bind( this ) );

		}

	};

	/**
	 * Set camera control
	 */
	PANOLENS.Viewer.prototype.setCameraControl = function () {

		this.camera.position.copy( this.panorama.position );
		this.camera.position.z += 1;
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
	 * @param  {number} index - Index of camera control
	 */
	PANOLENS.Viewer.prototype.enableControl = function ( index ) {

		index = ( index >= 0 && index < this.controls.length ) ? index : 0;

		this.control.enabled = false;

		this.control = this.controls[ index ];

		this.control.enabled = true;

		switch ( this.control.name ) {
			case 'orbit':
				this.camera.position.copy( this.panorama.position );
				this.camera.position.z += 1;
				break;
			case 'device-orientation':
				this.camera.position.copy( this.panorama.position );
				break;
			default:
				break;
		}

		this.control.update();

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
	 * Toggle fullscreen
	 * @param  {Boolean} isFullscreen - If it's fullscreen
	 */
	PANOLENS.Viewer.prototype.toggleFullscreen = function ( isFullscreen ) {

		if ( isFullscreen ) {
			this.container.style.width = '100%';
			this.container.style.height = '100%';
			this.container.isFullscreen = true;
		} else {
			this.container._width && ( this.container.style.width = this.container._width + 'px' );
			this.container._height && ( this.container.style.height = this.container._height + 'px' );
			if ( this.container.classList.contains( 'panolens-container' ) ) {
				this.container.style.width = '100%';
				this.container.style.height = '100%';
			}
			this.container.isFullscreen = false;
		}

		this.onWindowResize();

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
	 * This is called when window size is changed
	 * @fires PANOLENS.Viewer#window-resize
	 */
	PANOLENS.Viewer.prototype.onWindowResize = function () {

		var width, height, expand;

		expand = this.container.classList.contains( 'panolens-container' ) || this.container.isFullscreen;

		width = expand ? window.innerWidth : this.container._width;
		height = expand ? window.innerHeight : this.container._height;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( width, height );

		// Update reticle
		if ( this.options.enableReticle || this.tempEnableReticle ) {

			this.updateReticleEvent();

		}

		// Passive render after window size changes
		this.options.passiveRendering && this.render();

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

	/**
	 * Output infospot attach position in developer console by holding down Ctrl button
	 */
	PANOLENS.Viewer.prototype.outputInfospotPosition = function () {

		var intersects, point;

		intersects = this.raycaster.intersectObject( this.panorama, true );

		if ( intersects.length > 0 ) {

			point = intersects[0].point.clone();

			console.info( '{ ' 
				+ -point.x.toFixed(2) + ', '
				+  point.y.toFixed(2) + ', '
				+  point.z.toFixed(2) + ' }' );

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
		if ( this.OUTPUT_INFOSPOT ) { 

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

			if ( intersects[i].object && !intersects[i].object.passThrough ) {

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

		if ( event.key === 'Control' ) {

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

		!this.options.passiveRendering && this.control.update();

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

		this.update();

		!this.options.passiveRendering && this.render();

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
	 * View indicator in upper left
	 * */
	PANOLENS.Viewer.prototype.addViewIndicator = function () {

		var indicatorSvg = PANOLENS.DataImage.ViewIndicator;

		var viewIndicatorDiv = document.createElement( "div" );
		viewIndicatorDiv.innerHTML = indicatorSvg;
		viewIndicatorDiv.style.width = this.viewIndicatorSize + "px";
		viewIndicatorDiv.style.height = this.viewIndicatorSize + "px";
		viewIndicatorDiv.style.position = "absolute";
		viewIndicatorDiv.style.top = "6px";
		viewIndicatorDiv.style.left = "6px";
		viewIndicatorDiv.style.opacity = "0.7";
		viewIndicatorDiv.style.cursor = "pointer";
		viewIndicatorDiv.id = "view-indicator-container";

		this.container.appendChild( viewIndicatorDiv );

		var viewIndicator = document.getElementById( "view-indicator" );
		var indicator = document.getElementById( "indicator" );

		var setIndicatorD = function () {

			this.radius = this.viewIndicatorSize * 0.225;
			this.currentPanoAngle = this.camera.rotation.y - THREE.Math.degToRad( 90 );
			this.fovAngle = THREE.Math.degToRad( this.camera.fov ) ;
			this.leftAngle = -this.currentPanoAngle - this.fovAngle / 2;
			this.rightAngle = -this.currentPanoAngle + this.fovAngle / 2;
			this.leftX = this.radius * Math.cos( this.leftAngle );
			this.leftY = this.radius * Math.sin( this.leftAngle );
			this.rightX = this.radius * Math.cos( this.rightAngle );
			this.rightY = this.radius * Math.sin( this.rightAngle );
			this.indicatorD = "M " + this.leftX + " " + this.leftY + " A " + this.radius + " " + this.radius + " 0 0 1 " + this.rightX + " " + this.rightY;

			if ( this.leftX && this.leftY && this.rightX && this.rightY && this.radius ) {

				indicator.setAttribute( "d", this.indicatorD );

			}

		}.bind(this);

		this.addUpdateCallback( setIndicatorD );

		var indicatorOnMouseEnter = function () {

			viewIndicatorDiv.style.opacity = "1";
			viewIndicator.style.filter = "drop-shadow(rgb(255, 255, 255) 0px 0px 5px)";

		};

		var indicatorOnMouseLeave = function () {

			viewIndicatorDiv.style.opacity = "0.7";
			viewIndicator.style.filter = "drop-shadow(rgb(255, 255, 255) 0px 0px 5px)";

		};

		viewIndicatorDiv.addEventListener( "mouseenter", indicatorOnMouseEnter );
		viewIndicatorDiv.addEventListener( "mouseleave", indicatorOnMouseLeave );

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