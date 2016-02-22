/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function ( object ) {

	var scope = this;

	this.object = object;
	this.object.rotation.reorder( "YXZ" );

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	var onDeviceOrientationChangeEvent = function ( event ) {

		scope.deviceOrientation = event;

	};

	var onScreenOrientationChangeEvent = function () {

		scope.screenOrientation = window.orientation || 0;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' );                       // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler );                               // orient the device

			quaternion.multiply( q1 );                                      // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );    // adjust for screen orientation

		}

	}();

	this.connect = function() {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = true;

	};

	this.disconnect = function() {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = false;

	};

	this.update = function () {

		if ( scope.enabled === false ) return;

		var alpha  = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) : 0; // Z
		var beta   = scope.deviceOrientation.beta  ? THREE.Math.degToRad( scope.deviceOrientation.beta  ) : 0; // X'
		var gamma  = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
		var orient = scope.screenOrientation       ? THREE.Math.degToRad( scope.screenOrientation       ) : 0; // O

		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

	};

	this.dispose = function () {

		this.disconnect();

	};

	this.connect();

};
;/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 */

THREE.VRControls = function ( object, onError ) {

	var scope = this;

	var vrInputs = [];

	function gotVRDevices( devices ) {

		for ( var i = 0; i < devices.length; i ++ ) {

			if ( devices[ i ] instanceof PositionSensorVRDevice ) {

				vrInputs.push( devices[ i ] );

			}

		}

		if ( vrInputs.length === 0 ) {

			if ( onError ) onError( 'PositionSensorVRDevice not available' );

		}

	}

	if ( navigator.getVRDevices ) {

		navigator.getVRDevices().then( gotVRDevices );

	}

	// the Rift SDK returns the position in meters
	// this scale factor allows the user to define how meters
	// are converted to scene units.

	this.scale = 1;

	this.update = function () {

		for ( var i = 0; i < vrInputs.length; i ++ ) {

			var vrInput = vrInputs[ i ];

			var state = vrInput.getState();

			if ( state.orientation !== null ) {

				object.quaternion.copy( state.orientation );

			}

			if ( state.position !== null ) {

				object.position.copy( state.position ).multiplyScalar( scope.scale );

			}

		}

	};

	this.resetSensor = function () {

		for ( var i = 0; i < vrInputs.length; i ++ ) {

			var vrInput = vrInputs[ i ];

			if ( vrInput.resetSensor !== undefined ) {

				vrInput.resetSensor();

			} else if ( vrInput.zeroSensor !== undefined ) {

				vrInput.zeroSensor();

			}

		}

	};

	this.zeroSensor = function () {

		void 0;
		this.resetSensor();

	};

	this.dispose = function () {

		vrInputs = [];

	};

};
;/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 *
 * WebVR Spec: http://mozvr.github.io/webvr-spec/webvr.html
 *
 * Firefox: http://mozvr.com/downloads/
 * Chromium: https://drive.google.com/folderview?id=0BzudLt22BqGRbW9WTHMtOWMzNjQ&usp=sharing#list
 *
 */

THREE.VREffect = function ( renderer, onError ) {

	var vrHMD;
	var eyeTranslationL, eyeFOVL;
	var eyeTranslationR, eyeFOVR;

	function gotVRDevices( devices ) {

		for ( var i = 0; i < devices.length; i ++ ) {

			if ( devices[ i ] instanceof HMDVRDevice ) {

				vrHMD = devices[ i ];

				break; // We keep the first we encounter

			}

		}

		if ( vrHMD === undefined ) {

			if ( onError ) onError( 'HMD not available' );

		}

	}

	if ( navigator.getVRDevices ) {

		navigator.getVRDevices().then( gotVRDevices );

	}

	//

	this.scale = 1;

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

	};

	// fullscreen

	var isFullscreen = false;

	var canvas = renderer.domElement;
	var fullscreenchange = canvas.mozRequestFullScreen ? 'mozfullscreenchange' : 'webkitfullscreenchange';

	document.addEventListener( fullscreenchange, function ( event ) {

		isFullscreen = document.mozFullScreenElement || document.webkitFullscreenElement;

	}, false );

	this.setFullScreen = function ( boolean ) {

		if ( vrHMD === undefined ) return;
		if ( isFullscreen === boolean ) return;

		if ( canvas.mozRequestFullScreen ) {

			canvas.mozRequestFullScreen( { vrDisplay: vrHMD } );

		} else if ( canvas.webkitRequestFullscreen ) {

			canvas.webkitRequestFullscreen( { vrDisplay: vrHMD } );

		}

	};

	// render

	var cameraL = new THREE.PerspectiveCamera();
	cameraL.layers.enable( 1 );

	var cameraR = new THREE.PerspectiveCamera();
	cameraR.layers.enable( 2 );

	this.render = function ( scene, camera ) {

		if ( vrHMD ) {

			var eyeParamsL = vrHMD.getEyeParameters( 'left' );
			var eyeParamsR = vrHMD.getEyeParameters( 'right' );

			eyeTranslationL = eyeParamsL.eyeTranslation;
			eyeTranslationR = eyeParamsR.eyeTranslation;
			eyeFOVL = eyeParamsL.recommendedFieldOfView;
			eyeFOVR = eyeParamsR.recommendedFieldOfView;

			if ( Array.isArray( scene ) ) {

				void 0;
				scene = scene[ 0 ];

			}

			var size = renderer.getSize();

			renderer.setScissorTest( true );
			renderer.clear();

			if ( camera.parent === null ) camera.updateMatrixWorld();

			cameraL.projectionMatrix = fovToProjection( eyeFOVL, true, camera.near, camera.far );
			cameraR.projectionMatrix = fovToProjection( eyeFOVR, true, camera.near, camera.far );

			camera.matrixWorld.decompose( cameraL.position, cameraL.quaternion, cameraL.scale );
			camera.matrixWorld.decompose( cameraR.position, cameraR.quaternion, cameraR.scale );

			cameraL.translateX( eyeTranslationL.x * this.scale );
			cameraR.translateX( eyeTranslationR.x * this.scale );

			// render left eye
			renderer.setViewport( 0, 0, size.width / 2, size.height );
			renderer.setScissor( 0, 0, size.width / 2, size.height );
			renderer.render( scene, cameraL );

			// render right eye
			renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
			renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
			renderer.render( scene, cameraR );

			renderer.setScissorTest( false );

			return;

		}

		// Regular render mode if not HMD

		renderer.render( scene, camera );

	};

	//

	function fovToNDCScaleOffset( fov ) {

		var pxscale = 2.0 / ( fov.leftTan + fov.rightTan );
		var pxoffset = ( fov.leftTan - fov.rightTan ) * pxscale * 0.5;
		var pyscale = 2.0 / ( fov.upTan + fov.downTan );
		var pyoffset = ( fov.upTan - fov.downTan ) * pyscale * 0.5;
		return { scale: [ pxscale, pyscale ], offset: [ pxoffset, pyoffset ] };

	}

	function fovPortToProjection( fov, rightHanded, zNear, zFar ) {

		rightHanded = rightHanded === undefined ? true : rightHanded;
		zNear = zNear === undefined ? 0.01 : zNear;
		zFar = zFar === undefined ? 10000.0 : zFar;

		var handednessScale = rightHanded ? - 1.0 : 1.0;

		// start with an identity matrix
		var mobj = new THREE.Matrix4();
		var m = mobj.elements;

		// and with scale/offset info for normalized device coords
		var scaleAndOffset = fovToNDCScaleOffset( fov );

		// X result, map clip edges to [-w,+w]
		m[ 0 * 4 + 0 ] = scaleAndOffset.scale[ 0 ];
		m[ 0 * 4 + 1 ] = 0.0;
		m[ 0 * 4 + 2 ] = scaleAndOffset.offset[ 0 ] * handednessScale;
		m[ 0 * 4 + 3 ] = 0.0;

		// Y result, map clip edges to [-w,+w]
		// Y offset is negated because this proj matrix transforms from world coords with Y=up,
		// but the NDC scaling has Y=down (thanks D3D?)
		m[ 1 * 4 + 0 ] = 0.0;
		m[ 1 * 4 + 1 ] = scaleAndOffset.scale[ 1 ];
		m[ 1 * 4 + 2 ] = - scaleAndOffset.offset[ 1 ] * handednessScale;
		m[ 1 * 4 + 3 ] = 0.0;

		// Z result (up to the app)
		m[ 2 * 4 + 0 ] = 0.0;
		m[ 2 * 4 + 1 ] = 0.0;
		m[ 2 * 4 + 2 ] = zFar / ( zNear - zFar ) * - handednessScale;
		m[ 2 * 4 + 3 ] = ( zFar * zNear ) / ( zNear - zFar );

		// W result (= Z in)
		m[ 3 * 4 + 0 ] = 0.0;
		m[ 3 * 4 + 1 ] = 0.0;
		m[ 3 * 4 + 2 ] = handednessScale;
		m[ 3 * 4 + 3 ] = 0.0;

		mobj.transpose();

		return mobj;

	}

	function fovToProjection( fov, rightHanded, zNear, zFar ) {

		var DEG2RAD = Math.PI / 180.0;

		var fovPort = {
			upTan: Math.tan( fov.upDegrees * DEG2RAD ),
			downTan: Math.tan( fov.downDegrees * DEG2RAD ),
			leftTan: Math.tan( fov.leftDegrees * DEG2RAD ),
			rightTan: Math.tan( fov.rightDegrees * DEG2RAD )
		};

		return fovPortToProjection( fovPort, rightHanded, zNear, zFar );

	}

};
;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The base class for all VR devices.
 */
function VRDevice() {
  this.hardwareUnitId = 'webvr-polyfill hardwareUnitId';
  this.deviceId = 'webvr-polyfill deviceId';
  this.deviceName = 'webvr-polyfill deviceName';
}

/**
 * The base class for all VR HMD devices.
 */
function HMDVRDevice() {
}
HMDVRDevice.prototype = new VRDevice();

/**
 * The base class for all VR position sensor devices.
 */
function PositionSensorVRDevice() {
}
PositionSensorVRDevice.prototype = new VRDevice();

module.exports.VRDevice = VRDevice;
module.exports.HMDVRDevice = HMDVRDevice;
module.exports.PositionSensorVRDevice = PositionSensorVRDevice;

},{}],2:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var HMDVRDevice = _dereq_('./base.js').HMDVRDevice;

// Constants from vrtoolkit: https://github.com/googlesamples/cardboard-java.
var DEFAULT_INTERPUPILLARY_DISTANCE = 0.06;
var DEFAULT_FIELD_OF_VIEW = 40;

var Eye = {
  LEFT: 'left',
  RIGHT: 'right'
};

/**
 * The HMD itself, providing rendering parameters.
 */
function CardboardHMDVRDevice() {
  // From com/google/vrtoolkit/cardboard/FieldOfView.java.
  this.setMonocularFieldOfView_(DEFAULT_FIELD_OF_VIEW);
  // Set display constants.
  this.setInterpupillaryDistance(DEFAULT_INTERPUPILLARY_DISTANCE);
}
CardboardHMDVRDevice.prototype = new HMDVRDevice();

CardboardHMDVRDevice.prototype.getEyeParameters = function(whichEye) {
  var eyeTranslation;
  var fieldOfView;
  var renderRect;

  if (whichEye == Eye.LEFT) {
    eyeTranslation = this.eyeTranslationLeft;
    fieldOfView = this.fieldOfViewLeft;
    renderRect = this.renderRectLeft;
  } else if (whichEye == Eye.RIGHT) {
    eyeTranslation = this.eyeTranslationRight;
    fieldOfView = this.fieldOfViewRight;
    renderRect = this.renderRectRight;
  } else {
    void 0;
    return null;
  }
  return {
    recommendedFieldOfView: fieldOfView,
    eyeTranslation: eyeTranslation,
    renderRect: renderRect
  };
};

/**
 * Sets the field of view for both eyes. This is according to WebVR spec:
 *
 * @param {FieldOfView} opt_fovLeft Field of view of the left eye.
 * @param {FieldOfView} opt_fovRight Field of view of the right eye.
 * @param {Number} opt_zNear The near plane.
 * @param {Number} opt_zFar The far plane.
 *
 * http://mozvr.github.io/webvr-spec/webvr.html#dom-hmdvrdevice-setfieldofviewleftfov-rightfov-znear-zfar
 */
CardboardHMDVRDevice.prototype.setFieldOfView =
    function(opt_fovLeft, opt_fovRight, opt_zNear, opt_zFar) {
  if (opt_fovLeft) {
    this.fieldOfViewLeft = opt_fovLeft;
  }
  if (opt_fovRight) {
    this.fieldOfViewRight = opt_fovRight;
  }
  if (opt_zNear) {
    this.zNear = opt_zNear;
  }
  if (opt_zFar) {
    this.zFar = opt_zFar;
  }
};


/**
 * Changes the interpupillary distance of the rendered scene. This is useful for
 * changing Cardboard viewers.
 *
 * Possibly a useful addition to the WebVR spec?
 *
 * @param {Number} ipd Distance between eyes.
 */
CardboardHMDVRDevice.prototype.setInterpupillaryDistance = function(ipd) {
  this.eyeTranslationLeft = {
    x: ipd * -0.5,
    y: 0,
    z: 0
  };
  this.eyeTranslationRight = {
    x: ipd * 0.5,
    y: 0,
    z: 0
  };
};


/**
 * Changes the render rect (ie. viewport) where each eye is rendered. Again,
 * useful for changing Cardboard viewers.
 *
 * @param {Rect} opt_rectLeft Viewport for left eye.
 * @param {Rect} opt_rectRight Viewport for right eye.
 */
CardboardHMDVRDevice.prototype.setRenderRect = function(opt_rectLeft, opt_rectRight) {
  if (opt_rectLeft) {
    this.renderRectLeft = opt_rectLeft;
  }
  if (opt_rectRight) {
    this.renderRectRight = opt_rectRight;
  }
};

/**
 * Sets a symmetrical field of view for both eyes, with just one angle.
 *
 * @param {Number} angle Angle in degrees of left, right, top and bottom for
 * both eyes.
 */
CardboardHMDVRDevice.prototype.setMonocularFieldOfView_ = function(angle) {
  this.setFieldOfView(this.createSymmetricalFieldOfView_(angle),
                      this.createSymmetricalFieldOfView_(angle));
};

CardboardHMDVRDevice.prototype.createSymmetricalFieldOfView_ = function(angle) {
  return {
    upDegrees: angle,
    downDegrees: angle,
    leftDegrees: angle,
    rightDegrees: angle
  };
};

module.exports = CardboardHMDVRDevice;

},{"./base.js":1}],3:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * TODO: Fix up all "new THREE" instantiations to improve performance.
 */
var SensorSample = _dereq_('./sensor-sample.js');
var THREE = _dereq_('./three-math.js');
var Util = _dereq_('./util.js');

var DEBUG = false;

/**
 * An implementation of a simple complementary filter, which fuses gyroscope and
 * accelerometer data from the 'devicemotion' event.
 *
 * Accelerometer data is very noisy, but stable over the long term.
 * Gyroscope data is smooth, but tends to drift over the long term.
 *
 * This fusion is relatively simple:
 * 1. Get orientation estimates from accelerometer by applying a low-pass filter
 *    on that data.
 * 2. Get orientation estimates from gyroscope by integrating over time.
 * 3. Combine the two estimates, weighing (1) in the long term, but (2) for the
 *    short term.
 */
function ComplementaryFilter(kFilter) {
  this.kFilter = kFilter;

  // Raw sensor measurements.
  this.currentAccelMeasurement = new SensorSample();
  this.currentGyroMeasurement = new SensorSample();
  this.previousGyroMeasurement = new SensorSample();

  // Current filter orientation
  this.filterQ = new THREE.Quaternion();
  this.previousFilterQ = new THREE.Quaternion();

  // Orientation based on the accelerometer.
  this.accelQ = new THREE.Quaternion();
  // Whether or not the orientation has been initialized.
  this.isOrientationInitialized = false;
  // Running estimate of gravity based on the current orientation.
  this.estimatedGravity = new THREE.Vector3();
  // Measured gravity based on accelerometer.
  this.measuredGravity = new THREE.Vector3();

  // Debug only quaternion of gyro-based orientation.
  this.gyroIntegralQ = new THREE.Quaternion();
}

ComplementaryFilter.prototype.addAccelMeasurement = function(vector, timestampS) {
  this.currentAccelMeasurement.set(vector, timestampS);
};

ComplementaryFilter.prototype.addGyroMeasurement = function(vector, timestampS) {
  this.currentGyroMeasurement.set(vector, timestampS);

  var deltaT = timestampS - this.previousGyroMeasurement.timestampS;
  if (Util.isTimestampDeltaValid(deltaT)) {
    this.run_();
  }
  
  this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
};

ComplementaryFilter.prototype.run_ = function() {

  if (!this.isOrientationInitialized) {
    this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
    this.previousFilterQ.copy(this.accelQ);
    this.isOrientationInitialized = true;
    return;
  }

  var deltaT = this.currentGyroMeasurement.timestampS -
      this.previousGyroMeasurement.timestampS;

  // Convert gyro rotation vector to a quaternion delta.
  var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
  this.gyroIntegralQ.multiply(gyroDeltaQ);

  // filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.
  this.filterQ.copy(this.previousFilterQ);
  this.filterQ.multiply(gyroDeltaQ);

  // Calculate the delta between the current estimated gravity and the real
  // gravity vector from accelerometer.
  var invFilterQ = new THREE.Quaternion();
  invFilterQ.copy(this.filterQ);
  invFilterQ.inverse();

  this.estimatedGravity.set(0, 0, -1);
  this.estimatedGravity.applyQuaternion(invFilterQ);
  this.estimatedGravity.normalize();

  this.measuredGravity.copy(this.currentAccelMeasurement.sample);
  this.measuredGravity.normalize();

  // Compare estimated gravity with measured gravity, get the delta quaternion
  // between the two.
  var deltaQ = new THREE.Quaternion();
  deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
  deltaQ.inverse();

  if (DEBUG) {
    void 0;
  }

  // Calculate the SLERP target: current orientation plus the measured-estimated
  // quaternion delta.
  var targetQ = new THREE.Quaternion();
  targetQ.copy(this.filterQ);
  targetQ.multiply(deltaQ);

  // SLERP factor: 0 is pure gyro, 1 is pure accel.
  this.filterQ.slerp(targetQ, 1 - this.kFilter);

  this.previousFilterQ.copy(this.filterQ);
};

ComplementaryFilter.prototype.getOrientation = function() {
  return this.filterQ;
};

ComplementaryFilter.prototype.accelToQuaternion_ = function(accel) {
  var normAccel = new THREE.Vector3();
  normAccel.copy(accel);
  normAccel.normalize();
  var quat = new THREE.Quaternion();
  quat.setFromUnitVectors(new THREE.Vector3(0, 0, -1), normAccel);
  quat.inverse();
  return quat;
};

ComplementaryFilter.prototype.gyroToQuaternionDelta_ = function(gyro, dt) {
  // Extract axis and angle from the gyroscope data.
  var quat = new THREE.Quaternion();
  var axis = new THREE.Vector3();
  axis.copy(gyro);
  axis.normalize();
  quat.setFromAxisAngle(axis, gyro.length() * dt);
  return quat;
};


module.exports = ComplementaryFilter;

},{"./sensor-sample.js":8,"./three-math.js":9,"./util.js":11}],4:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PositionSensorVRDevice = _dereq_('./base.js').PositionSensorVRDevice;

var ComplementaryFilter = _dereq_('./complementary-filter.js');
var PosePredictor = _dereq_('./pose-predictor.js');
var TouchPanner = _dereq_('./touch-panner.js');
var THREE = _dereq_('./three-math.js');
var Util = _dereq_('./util.js');

/**
 * The positional sensor, implemented using DeviceMotion APIs.
 */
function FusionPositionSensorVRDevice() {
  this.deviceId = 'webvr-polyfill:fused';
  this.deviceName = 'VR Position Device (webvr-polyfill:fused)';

  this.accelerometer = new THREE.Vector3();
  this.gyroscope = new THREE.Vector3();

  window.addEventListener('devicemotion', this.onDeviceMotionChange_.bind(this));
  window.addEventListener('orientationchange', this.onScreenOrientationChange_.bind(this));

  this.filter = new ComplementaryFilter(WebVRConfig.K_FILTER || 0.98);
  this.posePredictor = new PosePredictor(WebVRConfig.PREDICTION_TIME_S || 0.040);
  this.touchPanner = new TouchPanner();

  this.filterToWorldQ = new THREE.Quaternion();

  // Set the filter to world transform, depending on OS.
  if (Util.isIOS()) {
    this.filterToWorldQ.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
  } else {
    this.filterToWorldQ.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI/2);
  }

  this.worldToScreenQ = new THREE.Quaternion();
  this.setScreenTransform_();

  // Keep track of a reset transform for resetSensor.
  this.resetQ = new THREE.Quaternion();

  this.isFirefoxAndroid = Util.isFirefoxAndroid();
  this.isIOS = Util.isIOS();
}
FusionPositionSensorVRDevice.prototype = new PositionSensorVRDevice();

/**
 * Returns {orientation: {x,y,z,w}, position: null}.
 * Position is not supported since we can't do 6DOF.
 */
FusionPositionSensorVRDevice.prototype.getState = function() {
  return {
    hasOrientation: true,
    orientation: this.getOrientation(),
    hasPosition: false,
    position: null
  }
};

FusionPositionSensorVRDevice.prototype.getOrientation = function() {
  // Convert from filter space to the the same system used by the
  // deviceorientation event.
  var orientation = this.filter.getOrientation();

  // Predict orientation.
  this.predictedQ = this.posePredictor.getPrediction(orientation, this.gyroscope, this.previousTimestampS);

  // Convert to THREE coordinate system: -Z forward, Y up, X right.
  var out = new THREE.Quaternion();
  out.copy(this.filterToWorldQ);
  out.multiply(this.resetQ);
  if (!WebVRConfig.TOUCH_PANNER_DISABLED) {
    out.multiply(this.touchPanner.getOrientation());
  }
  out.multiply(this.predictedQ);
  out.multiply(this.worldToScreenQ);

  // Handle the yaw-only case.
  if (WebVRConfig.YAW_ONLY) {
    // Make a quaternion that only turns around the Y-axis.
    out.x = 0;
    out.z = 0;
    out.normalize();
  }
  return out;
};

FusionPositionSensorVRDevice.prototype.resetSensor = function() {
  var euler = new THREE.Euler();
  euler.setFromQuaternion(this.filter.getOrientation());
  var yaw = euler.y;
  void 0;
  this.resetQ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -yaw);
  if (!WebVRConfig.TOUCH_PANNER_DISABLED) {
    this.touchPanner.resetSensor();
  }
};

FusionPositionSensorVRDevice.prototype.onDeviceMotionChange_ = function(deviceMotion) {
  var accGravity = deviceMotion.accelerationIncludingGravity;
  var rotRate = deviceMotion.rotationRate;
  var timestampS = deviceMotion.timeStamp / 1000;

  // Firefox Android timeStamp returns one thousandth of a millisecond.
  if (this.isFirefoxAndroid) {
    timestampS /= 1000;
  }

  var deltaS = timestampS - this.previousTimestampS;
  if (deltaS <= Util.MIN_TIMESTEP || deltaS > Util.MAX_TIMESTEP) {
    void 0;
    this.previousTimestampS = timestampS;
    return;
  }
  this.accelerometer.set(-accGravity.x, -accGravity.y, -accGravity.z);
  this.gyroscope.set(rotRate.alpha, rotRate.beta, rotRate.gamma);

  // With iOS and Firefox Android, rotationRate is reported in degrees,
  // so we first convert to radians.
  if (this.isIOS || this.isFirefoxAndroid) {
    this.gyroscope.multiplyScalar(Math.PI / 180);
  }

  this.filter.addAccelMeasurement(this.accelerometer, timestampS);
  this.filter.addGyroMeasurement(this.gyroscope, timestampS);

  this.previousTimestampS = timestampS;
};

FusionPositionSensorVRDevice.prototype.onScreenOrientationChange_ =
    function(screenOrientation) {
  this.setScreenTransform_();
};

FusionPositionSensorVRDevice.prototype.setScreenTransform_ = function() {
  this.worldToScreenQ.set(0, 0, 0, 1);
  switch (window.orientation) {
    case 0:
      break;
    case 90:
      this.worldToScreenQ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI/2);
      break;
    case -90:
      this.worldToScreenQ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
      break;
    case 180:
      // TODO.
      break;
  }
};


module.exports = FusionPositionSensorVRDevice;

},{"./base.js":1,"./complementary-filter.js":3,"./pose-predictor.js":7,"./three-math.js":9,"./touch-panner.js":10,"./util.js":11}],5:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var WebVRPolyfill = _dereq_('./webvr-polyfill.js');

// Initialize a WebVRConfig just in case.
window.WebVRConfig = window.WebVRConfig || {};
new WebVRPolyfill();

},{"./webvr-polyfill.js":12}],6:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PositionSensorVRDevice = _dereq_('./base.js').PositionSensorVRDevice;
var THREE = _dereq_('./three-math.js');
var Util = _dereq_('./util.js');

// How much to rotate per key stroke.
var KEY_SPEED = 0.15;
var KEY_ANIMATION_DURATION = 80;

// How much to rotate for mouse events.
var MOUSE_SPEED_X = 0.5;
var MOUSE_SPEED_Y = 0.3;

/**
 * A virtual position sensor, implemented using keyboard and
 * mouse APIs. This is designed as for desktops/laptops where no Device*
 * events work.
 */
function MouseKeyboardPositionSensorVRDevice() {
  this.deviceId = 'webvr-polyfill:mouse-keyboard';
  this.deviceName = 'VR Position Device (webvr-polyfill:mouse-keyboard)';

  // Attach to mouse and keyboard events.
  window.addEventListener('keydown', this.onKeyDown_.bind(this));
  window.addEventListener('mousemove', this.onMouseMove_.bind(this));
  window.addEventListener('mousedown', this.onMouseDown_.bind(this));
  window.addEventListener('mouseup', this.onMouseUp_.bind(this));

  this.phi = 0;
  this.theta = 0;

  // Variables for keyboard-based rotation animation.
  this.targetAngle = null;

  // State variables for calculations.
  this.euler = new THREE.Euler();
  this.orientation = new THREE.Quaternion();

  // Variables for mouse-based rotation.
  this.rotateStart = new THREE.Vector2();
  this.rotateEnd = new THREE.Vector2();
  this.rotateDelta = new THREE.Vector2();
}
MouseKeyboardPositionSensorVRDevice.prototype = new PositionSensorVRDevice();

/**
 * Returns {orientation: {x,y,z,w}, position: null}.
 * Position is not supported for parity with other PositionSensors.
 */
MouseKeyboardPositionSensorVRDevice.prototype.getState = function() {
  this.euler.set(this.phi, this.theta, 0, 'YXZ');
  this.orientation.setFromEuler(this.euler);

  return {
    hasOrientation: true,
    orientation: this.orientation,
    hasPosition: false,
    position: null
  }
};

MouseKeyboardPositionSensorVRDevice.prototype.onKeyDown_ = function(e) {
  // Track WASD and arrow keys.
  if (e.keyCode == 38) { // Up key.
    this.animatePhi_(this.phi + KEY_SPEED);
  } else if (e.keyCode == 39) { // Right key.
    this.animateTheta_(this.theta - KEY_SPEED);
  } else if (e.keyCode == 40) { // Down key.
    this.animatePhi_(this.phi - KEY_SPEED);
  } else if (e.keyCode == 37) { // Left key.
    this.animateTheta_(this.theta + KEY_SPEED);
  }
};

MouseKeyboardPositionSensorVRDevice.prototype.animateTheta_ = function(targetAngle) {
  this.animateKeyTransitions_('theta', targetAngle);
};

MouseKeyboardPositionSensorVRDevice.prototype.animatePhi_ = function(targetAngle) {
  // Prevent looking too far up or down.
  targetAngle = Util.clamp(targetAngle, -Math.PI/2, Math.PI/2);
  this.animateKeyTransitions_('phi', targetAngle);
};

/**
 * Start an animation to transition an angle from one value to another.
 */
MouseKeyboardPositionSensorVRDevice.prototype.animateKeyTransitions_ = function(angleName, targetAngle) {
  // If an animation is currently running, cancel it.
  if (this.angleAnimation) {
    clearInterval(this.angleAnimation);
  }
  var startAngle = this[angleName];
  var startTime = new Date();
  // Set up an interval timer to perform the animation.
  this.angleAnimation = setInterval(function() {
    // Once we're finished the animation, we're done.
    var elapsed = new Date() - startTime;
    if (elapsed >= KEY_ANIMATION_DURATION) {
      this[angleName] = targetAngle;
      clearInterval(this.angleAnimation);
      return;
    }
    // Linearly interpolate the angle some amount.
    var percent = elapsed / KEY_ANIMATION_DURATION;
    this[angleName] = startAngle + (targetAngle - startAngle) * percent;
  }.bind(this), 1000/60);
};

MouseKeyboardPositionSensorVRDevice.prototype.onMouseDown_ = function(e) {
  this.rotateStart.set(e.clientX, e.clientY);
  this.isDragging = true;
};

// Very similar to https://gist.github.com/mrflix/8351020
MouseKeyboardPositionSensorVRDevice.prototype.onMouseMove_ = function(e) {
  if (!this.isDragging && !this.isPointerLocked_()) {
    return;
  }
  // Support pointer lock API.
  if (this.isPointerLocked_()) {
    var movementX = e.movementX || e.mozMovementX || 0;
    var movementY = e.movementY || e.mozMovementY || 0;
    this.rotateEnd.set(this.rotateStart.x - movementX, this.rotateStart.y - movementY);
  } else {
    this.rotateEnd.set(e.clientX, e.clientY);
  }
  // Calculate how much we moved in mouse space.
  this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
  this.rotateStart.copy(this.rotateEnd);

  // Keep track of the cumulative euler angles.
  var element = document.body;
  this.phi += 2 * Math.PI * this.rotateDelta.y / element.clientHeight * MOUSE_SPEED_Y;
  this.theta += 2 * Math.PI * this.rotateDelta.x / element.clientWidth * MOUSE_SPEED_X;

  // Prevent looking too far up or down.
  this.phi = Util.clamp(this.phi, -Math.PI/2, Math.PI/2);
};

MouseKeyboardPositionSensorVRDevice.prototype.onMouseUp_ = function(e) {
  this.isDragging = false;
};

MouseKeyboardPositionSensorVRDevice.prototype.isPointerLocked_ = function() {
  var el = document.pointerLockElement || document.mozPointerLockElement ||
      document.webkitPointerLockElement;
  return el !== undefined;
};

MouseKeyboardPositionSensorVRDevice.prototype.resetSensor = function() {
  void 0;
};

module.exports = MouseKeyboardPositionSensorVRDevice;

},{"./base.js":1,"./three-math.js":9,"./util.js":11}],7:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var THREE = _dereq_('./three-math.js');

var DEBUG = false;

/**
 * Given an orientation and the gyroscope data, predicts the future orientation
 * of the head. This makes rendering appear faster.
 *
 * Also see: http://msl.cs.uiuc.edu/~lavalle/papers/LavYerKatAnt14.pdf
 *
 * @param {Number} predictionTimeS time from head movement to the appearance of
 * the corresponding image.
 */
function PosePredictor(predictionTimeS) {
  this.predictionTimeS = predictionTimeS;

  // The quaternion corresponding to the previous state.
  this.previousQ = new THREE.Quaternion();
  // Previous time a prediction occurred.
  this.previousTimestampS = null;

  // The delta quaternion that adjusts the current pose.
  this.deltaQ = new THREE.Quaternion();
  // The output quaternion.
  this.outQ = new THREE.Quaternion();
}

PosePredictor.prototype.getPrediction = function(currentQ, gyro, timestampS) {
  if (!this.previousTimestampS) {
    this.previousQ.copy(currentQ);
    this.previousTimestampS = timestampS;
    return currentQ;
  }

  // Calculate axis and angle based on gyroscope rotation rate data.
  var axis = new THREE.Vector3();
  axis.copy(gyro);
  axis.normalize();

  var angularSpeed = gyro.length();

  // If we're rotating slowly, don't do prediction.
  if (angularSpeed < THREE.Math.degToRad(20)) {
    if (DEBUG) {
      void 0;
    }
    this.outQ.copy(currentQ);
    this.previousQ.copy(currentQ);
    return this.outQ;
  }

  // Get the predicted angle based on the time delta and latency.
  var deltaT = timestampS - this.previousTimestampS;
  var predictAngle = angularSpeed * this.predictionTimeS;

  this.deltaQ.setFromAxisAngle(axis, predictAngle);
  this.outQ.copy(this.previousQ);
  this.outQ.multiply(this.deltaQ);

  this.previousQ.copy(currentQ);

  return this.outQ;
};


module.exports = PosePredictor;

},{"./three-math.js":9}],8:[function(_dereq_,module,exports){
function SensorSample(sample, timestampS) {
  this.set(sample, timestampS);
};

SensorSample.prototype.set = function(sample, timestampS) {
  this.sample = sample;
  this.timestampS = timestampS;
};

SensorSample.prototype.copy = function(sensorSample) {
  this.set(sensorSample.sample, sensorSample.timestampS);
};

module.exports = SensorSample;

},{}],9:[function(_dereq_,module,exports){
/*
 * A subset of THREE.js, providing mostly quaternion and euler-related
 * operations, manually lifted from
 * https://github.com/mrdoob/three.js/tree/master/src/math, as of 9c30286b38df039fca389989ff06ea1c15d6bad1
 */

// Only use if the real THREE is not provided.
var THREE = window.THREE || {};

// If some piece of THREE is missing, fill it in here.
if (!THREE.Quaternion || !THREE.Vector3 || !THREE.Vector2 || !THREE.Euler || !THREE.Math) {
void 0;


/*** START Quaternion ***/

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Quaternion = function ( x, y, z, w ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._w = ( w !== undefined ) ? w : 1;

};

THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,

	_x: 0,_y: 0, _z: 0, _w: 0,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;
		this.onChangeCallback();

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;
		this.onChangeCallback();

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;
		this.onChangeCallback();

	},

	get w () {

		return this._w;

	},

	set w ( value ) {

		this._w = value;
		this.onChangeCallback();

	},

	set: function ( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this.onChangeCallback();

		return this;

	},

	copy: function ( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this.onChangeCallback();

		return this;

	},

	setFromEuler: function ( euler, update ) {

		if ( euler instanceof THREE.Euler === false ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );
		}

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos( euler._x / 2 );
		var c2 = Math.cos( euler._y / 2 );
		var c3 = Math.cos( euler._z / 2 );
		var s1 = Math.sin( euler._x / 2 );
		var s2 = Math.sin( euler._y / 2 );
		var s3 = Math.sin( euler._z / 2 );

		if ( euler.order === 'XYZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'YXZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'ZXY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'ZYX' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'YZX' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'XZY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		if ( update !== false ) this.onChangeCallback();

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		var halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this.onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this.onChangeCallback();

		return this;

	},

	setFromUnitVectors: function () {

		// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

		// assumes direction vectors vFrom and vTo are normalized

		var v1, r;

		var EPS = 0.000001;

		return function ( vFrom, vTo ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			r = vFrom.dot( vTo ) + 1;

			if ( r < EPS ) {

				r = 0;

				if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

					v1.set( - vFrom.y, vFrom.x, 0 );

				} else {

					v1.set( 0, - vFrom.z, vFrom.y );

				}

			} else {

				v1.crossVectors( vFrom, vTo );

			}

			this._x = v1.x;
			this._y = v1.y;
			this._z = v1.z;
			this._w = r;

			this.normalize();

			return this;

		}

	}(),

	inverse: function () {

		this.conjugate().normalize();

		return this;

	},

	conjugate: function () {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this.onChangeCallback();

		return this;

	},

	dot: function ( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	},

	lengthSq: function () {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	},

	length: function () {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	},

	normalize: function () {

		var l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this.onChangeCallback();

		return this;

	},

	multiply: function ( q, p ) {

		if ( p !== undefined ) {

			void 0;
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	},

	multiplyQuaternions: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this.onChangeCallback();

		return this;

	},

	multiplyVector3: function ( vector ) {

		void 0;
		return vector.applyQuaternion( this );

	},

	slerp: function ( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var halfTheta = Math.acos( cosHalfTheta );
		var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

		if ( Math.abs( sinHalfTheta ) < 0.001 ) {

			this._w = 0.5 * ( w + this._w );
			this._x = 0.5 * ( x + this._x );
			this._y = 0.5 * ( y + this._y );
			this._z = 0.5 * ( z + this._z );

			return this;

		}

		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
		ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this.onChangeCallback();

		return this;

	},

	equals: function ( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this.onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	},

	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	onChangeCallback: function () {},

	clone: function () {

		return new THREE.Quaternion( this._x, this._y, this._z, this._w );

	}

};

THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	return qm.copy( qa ).slerp( qb, t );

}

/*** END Quaternion ***/
/*** START Vector2 ***/
/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,

	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			void 0;
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			void 0;
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},

	multiply: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;

		}

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		return this;
	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector2();
				max = new THREE.Vector2();

			}

			min.set( minVal, minVal );
			max.set( maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	},

	fromAttribute: function ( attribute, index, offset ) {

	    if ( offset === undefined ) offset = 0;

	    index = index * attribute.itemSize + offset;

	    this.x = attribute.array[ index ];
	    this.y = attribute.array[ index + 1 ];

	    return this;

	},

	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	}

};
/*** END Vector2 ***/
/*** START Vector3 ***/

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};

THREE.Vector3.prototype = {

	constructor: THREE.Vector3,

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			void 0;
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			void 0;
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},

	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			void 0;
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	},

	multiplyVectors: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	applyEuler: function () {

		var quaternion;

		return function ( euler ) {

			if ( euler instanceof THREE.Euler === false ) {

				void 0;

			}

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromEuler( euler ) );

			return this;

		};

	}(),

	applyAxisAngle: function () {

		var quaternion;

		return function ( axis, angle ) {

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			return this;

		};

	}(),

	applyMatrix3: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	},

	applyMatrix4: function ( m ) {

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;

	},

	applyProjection: function ( m ) {

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	},

	applyQuaternion: function ( q ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	},

	project: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.projectionMatrix, matrix.getInverse( camera.matrixWorld ) );
			return this.applyProjection( matrix );

		};

	}(),

	unproject: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.matrixWorld, matrix.getInverse( camera.projectionMatrix ) );
			return this.applyProjection( matrix );

		};

	}(),

	transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();

		return this;

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		return this;

	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector3();
				max = new THREE.Vector3();

			}

			min.set( minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	cross: function ( v, w ) {

		if ( w !== undefined ) {

			void 0;
			return this.crossVectors( v, w );

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},

	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	},

	projectOnVector: function () {

		var v1, dot;

		return function ( vector ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( vector ).normalize();

			dot = this.dot( v1 );

			return this.copy( v1 ).multiplyScalar( dot );

		};

	}(),

	projectOnPlane: function () {

		var v1;

		return function ( planeNormal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( this ).projectOnVector( planeNormal );

			return this.sub( v1 );

		}

	}(),

	reflect: function () {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1;

		return function ( normal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

		}

	}(),

	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, - 1, 1 ) );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	},

	setEulerFromRotationMatrix: function ( m, order ) {

		void 0;

	},

	setEulerFromQuaternion: function ( q, order ) {

		void 0;

	},

	getPositionFromMatrix: function ( m ) {

		void 0;

		return this.setFromMatrixPosition( m );

	},

	getScaleFromMatrix: function ( m ) {

		void 0;

		return this.setFromMatrixScale( m );
	},

	getColumnFromMatrix: function ( index, matrix ) {

		void 0;

		return this.setFromMatrixColumn( index, matrix );

	},

	setFromMatrixPosition: function ( m ) {

		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;

	},

	setFromMatrixScale: function ( m ) {

		var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
		var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
		var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	},

	setFromMatrixColumn: function ( index, matrix ) {

		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	},

	fromAttribute: function ( attribute, index, offset ) {

	    if ( offset === undefined ) offset = 0;

	    index = index * attribute.itemSize + offset;

	    this.x = attribute.array[ index ];
	    this.y = attribute.array[ index + 1 ];
	    this.z = attribute.array[ index + 2 ];

	    return this;

	},

	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	}

};
/*** END Vector3 ***/
/*** START Euler ***/
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Euler = function ( x, y, z, order ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._order = order || THREE.Euler.DefaultOrder;

};

THREE.Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

THREE.Euler.DefaultOrder = 'XYZ';

THREE.Euler.prototype = {

	constructor: THREE.Euler,

	_x: 0, _y: 0, _z: 0, _order: THREE.Euler.DefaultOrder,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;
		this.onChangeCallback();

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;
		this.onChangeCallback();

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;
		this.onChangeCallback();

	},

	get order () {

		return this._order;

	},

	set order ( value ) {

		this._order = value;
		this.onChangeCallback();

	},

	set: function ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this.onChangeCallback();

		return this;

	},

	copy: function ( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this.onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m, order, update ) {

		var clamp = THREE.Math.clamp;

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {

				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {

				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {

				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {

				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {

				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}

		} else {

			void 0

		}

		this._order = order;

		if ( update !== false ) this.onChangeCallback();

		return this;

	},

	setFromQuaternion: function () {

		var matrix;

		return function ( q, order, update ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();
			matrix.makeRotationFromQuaternion( q );
			this.setFromRotationMatrix( matrix, order, update );

			return this;

		};

	}(),

	setFromVector3: function ( v, order ) {

		return this.set( v.x, v.y, v.z, order || this._order );

	},

	reorder: function () {

		// WARNING: this discards revolution information -bhouston

		var q = new THREE.Quaternion();

		return function ( newOrder ) {

			q.setFromEuler( this );
			this.setFromQuaternion( q, newOrder );

		};

	}(),

	equals: function ( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	},

	fromArray: function ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this.onChangeCallback();

		return this;

	},

	toArray: function () {

		return [ this._x, this._y, this._z, this._order ];

	},

	toVector3: function ( optionalResult ) {

		if ( optionalResult ) {

			return optionalResult.set( this._x, this._y, this._z );

		} else {

			return new THREE.Vector3( this._x, this._y, this._z );

		}

	},

	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	onChangeCallback: function () {},

	clone: function () {

		return new THREE.Euler( this._x, this._y, this._z, this._order );

	}

};
/*** END Euler ***/
/*** START Math ***/
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Math = {

	generateUUID: function () {

		// http://www.broofa.com/Tools/Math.uuid.htm

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
		var uuid = new Array( 36 );
		var rnd = 0, r;

		return function () {

			for ( var i = 0; i < 36; i ++ ) {

				if ( i == 8 || i == 13 || i == 18 || i == 23 ) {

					uuid[ i ] = '-';

				} else if ( i == 14 ) {

					uuid[ i ] = '4';

				} else {

					if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
					r = rnd & 0xf;
					rnd = rnd >> 4;
					uuid[ i ] = chars[ ( i == 19 ) ? ( r & 0x3 ) | 0x8 : r ];

				}
			}

			return uuid.join( '' );

		};

	}(),

	// Clamp value to range <a, b>

	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	},

	// Clamp value to range <a, inf)

	clampBottom: function ( x, a ) {

		return x < a ? a : x;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	},

	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	},

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return Math.floor( this.randFloat( low, high ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	degToRad: function () {

		var degreeToRadiansFactor = Math.PI / 180;

		return function ( degrees ) {

			return degrees * degreeToRadiansFactor;

		};

	}(),

	radToDeg: function () {

		var radianToDegreesFactor = 180 / Math.PI;

		return function ( radians ) {

			return radians * radianToDegreesFactor;

		};

	}(),

	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	},

	nextPowerOfTwo: function ( value ) {

		value --;
		value |= value >> 1;
		value |= value >> 2;
		value |= value >> 4;
		value |= value >> 8;
		value |= value >> 16;
		value ++;

		return value;
	}

};

/*** END Math ***/

}

module.exports = THREE;

},{}],10:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var THREE = _dereq_('./three-math.js');
var Util = _dereq_('./util.js');

var ROTATE_SPEED = 0.5;
/**
 * Provides a quaternion responsible for pre-panning the scene before further
 * transformations due to device sensors.
 */
function TouchPanner() {
  window.addEventListener('touchstart', this.onTouchStart_.bind(this));
  window.addEventListener('touchmove', this.onTouchMove_.bind(this));
  window.addEventListener('touchend', this.onTouchEnd_.bind(this));

  this.isTouching = false;
  this.rotateStart = new THREE.Vector2();
  this.rotateEnd = new THREE.Vector2();
  this.rotateDelta = new THREE.Vector2();

  this.theta = 0;
  this.orientation = new THREE.Quaternion();
}

TouchPanner.prototype.getOrientation = function() {
  this.orientation.setFromEuler(new THREE.Euler(0, 0, this.theta));
  return this.orientation;
};

TouchPanner.prototype.resetSensor = function() {
  this.theta = 0;
};

TouchPanner.prototype.onTouchStart_ = function(e) {
  // Only respond if there is exactly one touch.
  if (e.touches.length != 1) {
    return;
  }
  this.rotateStart.set(e.touches[0].pageX, e.touches[0].pageY);
  this.isTouching = true;
};

TouchPanner.prototype.onTouchMove_ = function(e) {
  if (!this.isTouching) {
    return;
  }
  this.rotateEnd.set(e.touches[0].pageX, e.touches[0].pageY);
  this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
  this.rotateStart.copy(this.rotateEnd);

  // On iOS, direction is inverted.
  if (Util.isIOS()) {
    this.rotateDelta.x *= -1;
  }

  var element = document.body;
  this.theta += 2 * Math.PI * this.rotateDelta.x / element.clientWidth * ROTATE_SPEED;
};

TouchPanner.prototype.onTouchEnd_ = function(e) {
  this.isTouching = false;
};

module.exports = TouchPanner;

},{"./three-math.js":9,"./util.js":11}],11:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Util = window.Util || {};

Util.MIN_TIMESTEP = 0.001;
Util.MAX_TIMESTEP = 1;

Util.clamp = function(value, min, max) {
  return Math.min(Math.max(min, value), max);
};

Util.isIOS = function() {
  return /iPad|iPhone|iPod/.test(navigator.platform);
};

Util.isFirefoxAndroid = function() {
  return navigator.userAgent.indexOf('Firefox') !== -1 && navigator.userAgent.indexOf('Android') !== -1;
}

// Helper method to validate the time steps of sensor timestamps.
Util.isTimestampDeltaValid = function(timestampDeltaS) {
  if (isNaN(timestampDeltaS)) {
    return false;
  }
  if (timestampDeltaS <= Util.MIN_TIMESTEP) {
    return false;
  }
  if (timestampDeltaS > Util.MAX_TIMESTEP) {
    return false;
  }
  return true;
}

module.exports = Util;

},{}],12:[function(_dereq_,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var CardboardHMDVRDevice = _dereq_('./cardboard-hmd-vr-device.js');
//var OrientationPositionSensorVRDevice = require('./orientation-position-sensor-vr-device.js');
var FusionPositionSensorVRDevice = _dereq_('./fusion-position-sensor-vr-device.js');
var MouseKeyboardPositionSensorVRDevice = _dereq_('./mouse-keyboard-position-sensor-vr-device.js');
// Uncomment to add positional tracking via webcam.
//var WebcamPositionSensorVRDevice = require('./webcam-position-sensor-vr-device.js');
var HMDVRDevice = _dereq_('./base.js').HMDVRDevice;
var PositionSensorVRDevice = _dereq_('./base.js').PositionSensorVRDevice;

function WebVRPolyfill() {
  this.devices = [];

  if (!this.isWebVRAvailable()) {
    this.enablePolyfill();
  }
}

WebVRPolyfill.prototype.isWebVRAvailable = function() {
  return ('getVRDevices' in navigator) || ('mozGetVRDevices' in navigator);
};


WebVRPolyfill.prototype.enablePolyfill = function() {
  // Initialize our virtual VR devices.
  if (this.isCardboardCompatible()) {
    this.devices.push(new CardboardHMDVRDevice());
  }

  // Polyfill using the right position sensor.
  if (this.isMobile()) {
    //this.devices.push(new OrientationPositionSensorVRDevice());
    this.devices.push(new FusionPositionSensorVRDevice());
  } else {
    if (!WebVRConfig.MOUSE_KEYBOARD_CONTROLS_DISABLED) {
      this.devices.push(new MouseKeyboardPositionSensorVRDevice());
    }
    // Uncomment to add positional tracking via webcam.
    //this.devices.push(new WebcamPositionSensorVRDevice());
  }

  // Provide navigator.getVRDevices.
  navigator.getVRDevices = this.getVRDevices.bind(this);

  // Provide the CardboardHMDVRDevice and PositionSensorVRDevice objects.
  window.HMDVRDevice = HMDVRDevice;
  window.PositionSensorVRDevice = PositionSensorVRDevice;
};

WebVRPolyfill.prototype.getVRDevices = function() {
  var devices = this.devices;
  return new Promise(function(resolve, reject) {
    try {
      resolve(devices);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Determine if a device is mobile.
 */
WebVRPolyfill.prototype.isMobile = function() {
  return /Android/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

WebVRPolyfill.prototype.isCardboardCompatible = function() {
  // For now, support all iOS and Android devices.
  // Also enable the WebVRConfig.FORCE_VR flag for debugging.
  return this.isMobile() || WebVRConfig.FORCE_ENABLE_VR;
};

module.exports = WebVRPolyfill;

},{"./base.js":1,"./cardboard-hmd-vr-device.js":2,"./fusion-position-sensor-vr-device.js":4,"./mouse-keyboard-position-sensor-vr-device.js":6}]},{},[5]);
;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Responsible for showing the vertical alignment UI that separates left and
 * right eye images.
 */
function Aligner() {
  var el = document.createElement('div');
  var s = el.style;
  s.position = 'fixed';
  s.background = 'white';
  s.width = '2px';
  s.top = '0px';
  s.bottom = '48px';
  s.left = '50%';
  s.display = 'none';
  s.marginLeft = '-2px';
  s.border = '1px solid black';
  s.borderTop = '0px';
  this.el = el;

  document.body.appendChild(el);
}

Aligner.prototype.show = function() {
  this.el.style.display = 'block';
};

Aligner.prototype.hide = function() {
  this.el.style.display = 'none';
};

module.exports = Aligner;

},{}],2:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Aligner = require('./aligner.js');
var Emitter = require('./emitter.js');
var Modes = require('./modes.js');
var Util = require('./util.js');

/**
 * Everything having to do with the WebVR button.
 * Emits a 'click' event when it's clicked.
 */
function ButtonManager() {
  this.loadIcons_();

  // Make the fullscreen button.
  var fsButton = this.createButton();
  fsButton.src = this.ICONS.fullscreen;
  fsButton.title = 'Fullscreen mode';
  var s = fsButton.style;
  s.bottom = 0;
  s.right = 0;
  fsButton.addEventListener('click', this.createClickHandler_('fs'));
  document.body.appendChild(fsButton);
  this.fsButton = fsButton;

  // Make the VR button.
  var vrButton = this.createButton();
  vrButton.src = this.ICONS.cardboard;
  vrButton.title = 'Virtual reality mode';
  var s = vrButton.style;
  s.bottom = 0;
  s.right = '48px';
  vrButton.addEventListener('click', this.createClickHandler_('vr'));
  document.body.appendChild(vrButton);
  this.vrButton = vrButton;

  // Make the back button.
  var backButton = this.createButton();
  backButton.title = 'Back to previous mode';
  var s = backButton.style;
  s.left = 0;
  s.top = 0;
  backButton.src = this.ICONS.back;
  backButton.addEventListener('click', this.createClickHandler_('back'));
  document.body.appendChild(backButton);
  this.backButton = backButton;

  // Make the settings button, but only for mobile.
  var settingsButton = this.createButton();
  settingsButton.title = 'Configure viewer';
  var s = settingsButton.style;
  s.left = '50%';
  s.marginLeft = '-24px';
  s.bottom = 0;
  s.zIndex = 0;
  settingsButton.src = this.ICONS.settings;
  settingsButton.addEventListener('click', this.createClickHandler_('settings'));
  document.body.appendChild(settingsButton);
  this.settingsButton = settingsButton;

  this.isVisible = true;

  this.aligner = new Aligner();

}
ButtonManager.prototype = new Emitter();

ButtonManager.prototype.createButton = function() {
  var button = document.createElement('img');
  button.className = 'webvr-button';
  var s = button.style;
  s.position = 'fixed';
  s.width = '24px'
  s.height = '24px';
  s.backgroundSize = 'cover';
  s.backgroundColor = 'transparent';
  s.border = 0;
  s.userSelect = 'none';
  s.webkitUserSelect = 'none';
  s.MozUserSelect = 'none';
  s.cursor = 'pointer';
  s.padding = '12px';
  s.zIndex = 1;
  s.display = 'none';

  // Prevent button from being selected and dragged.
  button.draggable = false;
  button.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });

  // Style it on hover.
  button.addEventListener('mouseenter', function(e) {
    s.filter = s.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
  });
  button.addEventListener('mouseleave', function(e) {
    s.filter = s.webkitFilter = '';
  });
  return button;
};

ButtonManager.prototype.setMode = function(mode, isVRCompatible) {
  if (!this.isVisible) {
    return;
  }
  switch (mode) {
    case Modes.NORMAL:
      this.fsButton.style.display = 'block';
      this.fsButton.src = this.ICONS.fullscreen;
      this.vrButton.style.display = (isVRCompatible ? 'block' : 'none');
      this.backButton.style.display = 'none';
      this.settingsButton.style.display = 'none';
      this.aligner.hide();
      break;
    case Modes.MAGIC_WINDOW:
      this.fsButton.style.display = 'block';
      this.fsButton.src = this.ICONS.exitFullscreen;
      this.vrButton.style.display = (isVRCompatible ? 'block' : 'none');
      this.backButton.style.display = 'block';
      this.settingsButton.style.display = 'none';
      this.aligner.hide();
      break;
    case Modes.VR:
      this.fsButton.style.display = 'none';
      this.vrButton.style.display = 'none';
      // Hack for Firefox, since it doesn't display HTML content correctly in
      // VR at the moment.
      this.backButton.style.display = Util.isFirefox() ? 'none' : 'block';
      // Only show the settings button on mobile.
      var isSettingsVisible = Util.isMobile() || WebVRConfig.FORCE_ENABLE_VR;
      this.settingsButton.style.display = isSettingsVisible ? 'block' : 'none';
      this.aligner.show();
      break;
  }

  // Hack for Safari Mac/iOS to force relayout (svg-specific issue)
  // http://goo.gl/hjgR6r
  var oldValue = this.fsButton.style.display;
  this.fsButton.style.display = 'inline-block';
  this.fsButton.offsetHeight;
  this.fsButton.style.display = oldValue;
};

ButtonManager.prototype.setVisibility = function(isVisible) {
  this.isVisible = isVisible;
  this.fsButton.style.display = isVisible ? 'block' : 'none';
  this.vrButton.style.display = isVisible ? 'block' : 'none';
  this.backButton.style.display = isVisible ? 'block' : 'none';
};

ButtonManager.prototype.createClickHandler_ = function(eventName) {
  return function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.emit(eventName);
  }.bind(this);
};

ButtonManager.prototype.loadIcons_ = function() {
  // Preload some hard-coded SVG.
  this.ICONS = {};
  this.ICONS.cardboard = Util.base64('image/svg+xml', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMjAuNzQgNkgzLjIxQzIuNTUgNiAyIDYuNTcgMiA3LjI4djEwLjQ0YzAgLjcuNTUgMS4yOCAxLjIzIDEuMjhoNC43OWMuNTIgMCAuOTYtLjMzIDEuMTQtLjc5bDEuNC0zLjQ4Yy4yMy0uNTkuNzktMS4wMSAxLjQ0LTEuMDFzMS4yMS40MiAxLjQ1IDEuMDFsMS4zOSAzLjQ4Yy4xOS40Ni42My43OSAxLjExLjc5aDQuNzljLjcxIDAgMS4yNi0uNTcgMS4yNi0xLjI4VjcuMjhjMC0uNy0uNTUtMS4yOC0xLjI2LTEuMjh6TTcuNSAxNC42MmMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTMgMS4xOCAwIDIuMTIuOTYgMi4xMiAyLjEzcy0uOTUgMi4xMi0yLjEyIDIuMTJ6bTkgMGMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTNzMi4xMi45NiAyLjEyIDIuMTMtLjk1IDIuMTItMi4xMiAyLjEyeiIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+Cjwvc3ZnPgo=');
  this.ICONS.fullscreen = Util.base64('image/svg+xml', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNNyAxNEg1djVoNXYtMkg3di0zem0tMi00aDJWN2gzVjVINXY1em0xMiA3aC0zdjJoNXYtNWgtMnYzek0xNCA1djJoM3YzaDJWNWgtNXoiLz4KPC9zdmc+Cg==');
  this.ICONS.exitFullscreen = Util.base64('image/svg+xml', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNNSAxNmgzdjNoMnYtNUg1djJ6bTMtOEg1djJoNVY1SDh2M3ptNiAxMWgydi0zaDN2LTJoLTV2NXptMi0xMVY1aC0ydjVoNVY4aC0zeiIvPgo8L3N2Zz4K');
  this.ICONS.back = Util.base64('image/svg+xml', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnoiLz4KPC9zdmc+Cg==');
  this.ICONS.settings = Util.base64('image/svg+xml', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMTkuNDMgMTIuOThjLjA0LS4zMi4wNy0uNjQuMDctLjk4cy0uMDMtLjY2LS4wNy0uOThsMi4xMS0xLjY1Yy4xOS0uMTUuMjQtLjQyLjEyLS42NGwtMi0zLjQ2Yy0uMTItLjIyLS4zOS0uMy0uNjEtLjIybC0yLjQ5IDFjLS41Mi0uNC0xLjA4LS43My0xLjY5LS45OGwtLjM4LTIuNjVDMTQuNDYgMi4xOCAxNC4yNSAyIDE0IDJoLTRjLS4yNSAwLS40Ni4xOC0uNDkuNDJsLS4zOCAyLjY1Yy0uNjEuMjUtMS4xNy41OS0xLjY5Ljk4bC0yLjQ5LTFjLS4yMy0uMDktLjQ5IDAtLjYxLjIybC0yIDMuNDZjLS4xMy4yMi0uMDcuNDkuMTIuNjRsMi4xMSAxLjY1Yy0uMDQuMzItLjA3LjY1LS4wNy45OHMuMDMuNjYuMDcuOThsLTIuMTEgMS42NWMtLjE5LjE1LS4yNC40Mi0uMTIuNjRsMiAzLjQ2Yy4xMi4yMi4zOS4zLjYxLjIybDIuNDktMWMuNTIuNCAxLjA4LjczIDEuNjkuOThsLjM4IDIuNjVjLjAzLjI0LjI0LjQyLjQ5LjQyaDRjLjI1IDAgLjQ2LS4xOC40OS0uNDJsLjM4LTIuNjVjLjYxLS4yNSAxLjE3LS41OSAxLjY5LS45OGwyLjQ5IDFjLjIzLjA5LjQ5IDAgLjYxLS4yMmwyLTMuNDZjLjEyLS4yMi4wNy0uNDktLjEyLS42NGwtMi4xMS0xLjY1ek0xMiAxNS41Yy0xLjkzIDAtMy41LTEuNTctMy41LTMuNXMxLjU3LTMuNSAzLjUtMy41IDMuNSAxLjU3IDMuNSAzLjUtMS41NyAzLjUtMy41IDMuNXoiLz4KPC9zdmc+Cg==');
};

module.exports = ButtonManager;

},{"./aligner.js":1,"./emitter.js":9,"./modes.js":11,"./util.js":13}],3:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var BarrelDistortion = require('./distortion/barrel-distortion-fragment-v2.js');
var Util = require('./util.js');


function ShaderPass(shader) {
  this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  this.material = new THREE.ShaderMaterial({
    defines: shader.defines || {},
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });

  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene  = new THREE.Scene();
  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
  this.scene.add(this.quad);
};

ShaderPass.prototype.render = function(renderFunc, buffer) {
  this.uniforms.texture.value = buffer;
  this.quad.material = this.material;
  renderFunc(this.scene, this.camera);
};

function createRenderTarget(renderer) {
  var width  = renderer.context.canvas.width;
  var height = renderer.context.canvas.height;
  var parameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat,
    stencilBuffer: false
  };

  return new THREE.WebGLRenderTarget(width, height, parameters);
}

function CardboardDistorter(renderer) {
  this.shaderPass = new ShaderPass(BarrelDistortion);
  this.renderer = renderer;

  this.textureTarget = null;
  this.genuineRender = renderer.render;
  this.genuineSetSize = renderer.setSize;
  this.isActive = false;
}

CardboardDistorter.prototype.patch = function() {
  if (!this.isActive) {
    return;
  }
  this.textureTarget = createRenderTarget(this.renderer);

  this.renderer.render = function(scene, camera, renderTarget, forceClear) {
    this.genuineRender.call(this.renderer, scene, camera, this.textureTarget, forceClear);
  }.bind(this);

  this.renderer.setSize = function(width, height) {
    this.genuineSetSize.call(this.renderer, width, height);
    this.textureTarget = createRenderTarget(this.renderer);
  }.bind(this);
};

CardboardDistorter.prototype.unpatch = function() {
  if (!this.isActive) {
    return;
  }
  this.renderer.render = this.genuineRender;
  this.renderer.setSize = this.genuineSetSize;
};

CardboardDistorter.prototype.preRender = function() {
  if (!this.isActive) {
    return;
  }
  this.renderer.setRenderTarget(this.textureTarget);
};

CardboardDistorter.prototype.postRender = function() {
  if (!this.isActive) {
    return;
  }
  var size = this.renderer.getSize();
  this.renderer.setViewport(0, 0, size.width, size.height);
  this.shaderPass.render(this.genuineRender.bind(this.renderer), this.textureTarget);
};

/**
 * Toggles distortion. This is called externally by the boilerplate.
 * It should be enabled only if WebVR is provided by polyfill.
 */
CardboardDistorter.prototype.setActive = function(state) {
  this.isActive = state;
};

/**
 * Updates uniforms.
 */
CardboardDistorter.prototype.updateDeviceInfo = function(deviceInfo) {
  var uniforms = this.shaderPass.material.uniforms;

  var distortedProj = deviceInfo.getProjectionMatrixLeftEye();
  var undistortedProj = deviceInfo.getProjectionMatrixLeftEye(true);
  var viewport = deviceInfo.getUndistortedViewportLeftEye();

  var device = deviceInfo.device;
  var params = {
    xScale: viewport.width / (device.width / 2),
    yScale: viewport.height / device.height,
    xTrans: 2 * (viewport.x + viewport.width / 2) / (device.width / 2) - 1,
    yTrans: 2 * (viewport.y + viewport.height / 2) / device.height - 1
  }

  uniforms.projectionLeft.value.copy(
      Util.projectionMatrixToVector_(distortedProj));
  uniforms.unprojectionLeft.value.copy(
      Util.projectionMatrixToVector_(undistortedProj, params));

  // Set distortion coefficients.
  var coefficients = deviceInfo.viewer.distortionCoefficients;
  uniforms.distortion.value.set(coefficients[0], coefficients[1]);
      

  // For viewer profile debugging, show the lens center.
  if (WebVRConfig.SHOW_EYE_CENTERS) {
    uniforms.showCenter.value = 1;
  }

  // Allow custom background colors if this global is set.
  if (WebVRConfig.DISTORTION_BGCOLOR) {
    uniforms.backgroundColor.value =
        WebVRConfig.DISTORTION_BGCOLOR;
  }

  this.shaderPass.material.needsUpdate = true;
};


/**
 * Sets distortion coefficients as a Vector2.
 */
CardboardDistorter.prototype.setDistortionCoefficients = function(coefficients) {
  var value = new THREE.Vector2(coefficients[0], coefficients[1]);
  this.shaderPass.material.uniforms.distortion.value = value;
  this.shaderPass.material.needsUpdate = true;
};

module.exports = CardboardDistorter;

},{"./distortion/barrel-distortion-fragment-v2.js":5,"./util.js":13}],4:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Distortion = require('./distortion/distortion.js');
var Util = require('./util.js');

function Device(params) {
  this.width = params.width || Util.getScreenWidth();
  this.height = params.height || Util.getScreenHeight();
  this.widthMeters = params.widthMeters;
  this.heightMeters = params.heightMeters;
  this.bevelMeters = params.bevelMeters;
}


// Fallback Android device (based on Nexus 5 measurements) for use when
// we can't recognize an Android device.
var DEFAULT_ANDROID = new Device({
  widthMeters: 0.110,
  heightMeters: 0.062,
  bevelMeters: 0.004
});

// Fallback iOS device (based on iPhone6) for use when
// we can't recognize an Android device.
var DEFAULT_IOS = new Device({
  widthMeters: 0.1038,
  heightMeters: 0.0584,
  bevelMeters: 0.004
});


var Viewers = {
  CardboardV1: new CardboardViewer({
    id: 'CardboardV1',
    label: 'Cardboard I/O 2014',
    fov: 40,
    interLensDistance: 0.060,
    baselineLensDistance: 0.035,
    screenLensDistance: 0.042,
    distortionCoefficients: [0.441, 0.156],
    inverseCoefficients: [-0.4410035, 0.42756155, -0.4804439, 0.5460139,
      -0.58821183, 0.5733938, -0.48303202, 0.33299083, -0.17573841,
      0.0651772, -0.01488963, 0.001559834]
  }),
  CardboardV2: new CardboardViewer({
    id: 'CardboardV2',
    label: 'Cardboard I/O 2015',
    fov: 60,
    interLensDistance: 0.064,
    baselineLensDistance: 0.035,
    screenLensDistance: 0.039,
    distortionCoefficients: [0.34, 0.55],
    inverseCoefficients: [-0.33836704, -0.18162185, 0.862655, -1.2462051,
      1.0560602, -0.58208317, 0.21609078, -0.05444823, 0.009177956,
      -9.904169E-4, 6.183535E-5, -1.6981803E-6]
  })
};


var DEFAULT_LEFT_CENTER = {x: 0.5, y: 0.5};
var DEFAULT_RIGHT_CENTER = {x: 0.5, y: 0.5};

/**
 * Manages information about the device and the viewer.
 *
 * deviceParams indicates the parameters of the device to use (generally
 * obtained from dpdb.getDeviceParams()). Can be null to mean no device
 * params were found.
 */
function DeviceInfo(deviceParams) {
  this.viewer = Viewers.CardboardV1;
  this.updateDeviceParams(deviceParams);
}

DeviceInfo.prototype.updateDeviceParams = function(deviceParams) {
  this.device = this.determineDevice_(deviceParams) || this.device;
};

DeviceInfo.prototype.getDevice = function() {
  return this.device;
};

DeviceInfo.prototype.setViewer = function(viewer) {
  this.viewer = viewer;
};

DeviceInfo.prototype.determineDevice_ = function(deviceParams) {
  if (!deviceParams) {
    // No parameters, so use a default.
    if (Util.isIOS()) {
      void 0;
      return DEFAULT_IOS;
    } else {
      void 0;
      return DEFAULT_ANDROID;
    }
  }

  // Compute device screen dimensions based on deviceParams.
  var METERS_PER_INCH = 0.0254;
  var metersPerPixelX = METERS_PER_INCH / deviceParams.xdpi;
  var metersPerPixelY = METERS_PER_INCH / deviceParams.ydpi;
  var width = Util.getScreenWidth();
  var height = Util.getScreenHeight();
  return new Device({
    widthMeters: metersPerPixelX * width,
    heightMeters: metersPerPixelY * height,
    bevelMeters: deviceParams.bevelMm * 0.001,
  });
};

/**
 * Calculates field of view for the left eye.
 */
DeviceInfo.prototype.getDistortedFieldOfViewLeftEye = function() {
  var viewer = this.viewer;
  var device = this.device;

  var distortion = new Distortion(viewer.distortionCoefficients);

  // Device.height and device.width for device in portrait mode, so transpose.
  var eyeToScreenDistance = viewer.screenLensDistance;

  var outerDist = (device.widthMeters - viewer.interLensDistance) / 2;
  var innerDist = viewer.interLensDistance / 2;
  var bottomDist = viewer.baselineLensDistance - device.bevelMeters;
  var topDist = device.heightMeters - bottomDist;

  var outerAngle = THREE.Math.radToDeg(Math.atan(
      distortion.distort(outerDist / eyeToScreenDistance)));
  var innerAngle = THREE.Math.radToDeg(Math.atan(
      distortion.distort(innerDist / eyeToScreenDistance)));
  var bottomAngle = THREE.Math.radToDeg(Math.atan(
      distortion.distort(bottomDist / eyeToScreenDistance)));
  var topAngle = THREE.Math.radToDeg(Math.atan(
      distortion.distort(topDist / eyeToScreenDistance)));

  return {
    leftDegrees: Math.min(outerAngle, viewer.fov),
    rightDegrees: Math.min(innerAngle, viewer.fov),
    downDegrees: Math.min(bottomAngle, viewer.fov),
    upDegrees: Math.min(topAngle, viewer.fov)
  }
};

DeviceInfo.prototype.getFieldOfViewLeftEye = function(opt_isUndistorted) {
  return opt_isUndistorted ? this.getUndistortedFieldOfViewLeftEye() :
      this.getDistortedFieldOfViewLeftEye();
};

DeviceInfo.prototype.getFieldOfViewRightEye = function(opt_isUndistorted) {
  var fov = this.getFieldOfViewLeftEye(opt_isUndistorted);
  return {
    leftDegrees: fov.rightDegrees,
    rightDegrees: fov.leftDegrees,
    upDegrees: fov.upDegrees,
    downDegrees: fov.downDegrees
  };
};

/**
 * Calculates a projection matrix for the left eye.
 */
DeviceInfo.prototype.getProjectionMatrixLeftEye = function(opt_isUndistorted) {
  var fov = this.getFieldOfViewLeftEye(opt_isUndistorted);

  var projectionMatrix = new THREE.Matrix4();
  var near = 0.1;
  var far = 1000;
  var left = Math.tan(THREE.Math.degToRad(fov.leftDegrees)) * near;
  var right = Math.tan(THREE.Math.degToRad(fov.rightDegrees)) * near;
  var bottom = Math.tan(THREE.Math.degToRad(fov.downDegrees)) * near;
  var top = Math.tan(THREE.Math.degToRad(fov.upDegrees)) * near;

  // makeFrustum expects units in tan-angle space.
  projectionMatrix.makeFrustum(-left, right, -bottom, top, near, far);
  
  return projectionMatrix;
};


DeviceInfo.prototype.getUndistortedViewportLeftEye = function() {
  var p = this.getUndistortedParams_();
  var viewer = this.viewer;
  var device = this.device;

  var eyeToScreenDistance = viewer.screenLensDistance;
  var screenWidth = device.widthMeters / eyeToScreenDistance;
  var screenHeight = device.heightMeters / eyeToScreenDistance;
  var xPxPerTanAngle = device.width / screenWidth;
  var yPxPerTanAngle = device.height / screenHeight;

  var x = Math.round((p.eyePosX - p.outerDist) * xPxPerTanAngle);
  var y = Math.round((p.eyePosY - p.bottomDist) * yPxPerTanAngle);
  return {
    x: x,
    y: y,
    width: Math.round((p.eyePosX + p.innerDist) * xPxPerTanAngle) - x,
    height: Math.round((p.eyePosY + p.topDist) * yPxPerTanAngle) - y
  };
};

/**
 * Calculates undistorted field of view for the left eye.
 */
DeviceInfo.prototype.getUndistortedFieldOfViewLeftEye = function() {
  var p = this.getUndistortedParams_();

  return {
    leftDegrees: THREE.Math.radToDeg(Math.atan(p.outerDist)),
    rightDegrees: THREE.Math.radToDeg(Math.atan(p.innerDist)),
    downDegrees: THREE.Math.radToDeg(Math.atan(p.bottomDist)),
    upDegrees: THREE.Math.radToDeg(Math.atan(p.topDist))
  };
};

DeviceInfo.prototype.getUndistortedParams_ = function() {
  var viewer = this.viewer;
  var device = this.device;
  var distortion = new Distortion(viewer.distortionCoefficients);

  // Most of these variables in tan-angle units.
  var eyeToScreenDistance = viewer.screenLensDistance;
  var halfLensDistance = viewer.interLensDistance / 2 / eyeToScreenDistance;
  var screenWidth = device.widthMeters / eyeToScreenDistance;
  var screenHeight = device.heightMeters / eyeToScreenDistance;

  var eyePosX = screenWidth / 2 - halfLensDistance;
  var eyePosY = (viewer.baselineLensDistance - device.bevelMeters) / eyeToScreenDistance;

  var maxFov = viewer.fov;
  var viewerMax = distortion.distortInverse(Math.tan(THREE.Math.degToRad(maxFov)));
  var outerDist = Math.min(eyePosX, viewerMax);
  var innerDist = Math.min(halfLensDistance, viewerMax);
  var bottomDist = Math.min(eyePosY, viewerMax);
  var topDist = Math.min(screenHeight - eyePosY, viewerMax);

  return {
    outerDist: outerDist,
    innerDist: innerDist,
    topDist: topDist,
    bottomDist: bottomDist,
    eyePosX: eyePosX,
    eyePosY: eyePosY
  };
};


function CardboardViewer(params) {
  // A machine readable ID.
  this.id = params.id;
  // A human readable label.
  this.label = params.label;

  // Field of view in degrees (per side).
  this.fov = params.fov;

  // Distance between lens centers in meters.
  this.interLensDistance = params.interLensDistance;
  // Distance between viewer baseline and lens center in meters.
  this.baselineLensDistance = params.baselineLensDistance;
  // Screen-to-lens distance in meters.
  this.screenLensDistance = params.screenLensDistance;

  // Distortion coefficients.
  this.distortionCoefficients = params.distortionCoefficients;
  // Inverse distortion coefficients.
  // TODO: Calculate these from distortionCoefficients in the future.
  this.inverseCoefficients = params.inverseCoefficients;
}

// Export viewer information.
DeviceInfo.Viewers = Viewers;
module.exports = DeviceInfo;

},{"./distortion/distortion.js":6,"./util.js":13}],5:[function(require,module,exports){
var BarrelDistortionFragment = {
  type: 'fragment_v2',

  
  uniforms: {
    texture:   { type: 't', value: null },
    distortion: { type: 'v2', value: new THREE.Vector2(0.441, 0.156) },
    projectionLeft:    { type: 'v4', value: new THREE.Vector4(1.0, 1.0, -0.5, -0.5) },
    unprojectionLeft:  { type: 'v4', value: new THREE.Vector4(1.0, 1.0, -0.5, -0.5) },
    backgroundColor: { type: 'v4', value: new THREE.Vector4(0.0, 0.0, 0.0, 1.0) },
    showCenter: { type: 'i', value: 0},
    dividerColor: { type: 'v4', value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
  },

  vertexShader: [
  'varying vec2 vUV;',

  'void main() {',
    'vUV = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}'

  ].join('\n'),

  // TODO: use min/max/saturate instead of conditionals
  fragmentShader: [
    'uniform sampler2D texture;',

    'uniform vec2 distortion;',
    'uniform vec4 backgroundColor;',
    'uniform vec4 projectionLeft;',
    'uniform vec4 unprojectionLeft;',
    'uniform int showCenter;',
    'uniform vec4 dividerColor;',

    'varying vec2 vUV;',

    'float poly(float val) {',
      'return (showCenter == 1 && val < 0.00010) ? ',
      '10000.0 : 1.0 + (distortion.x + distortion.y * val) * val;',
    '}',

    'vec2 barrel(vec2 v, vec4 projection, vec4 unprojection) {',
      'vec2 w = (v + unprojection.zw) / unprojection.xy;',
      'return projection.xy * (poly(dot(w, w)) * w) - projection.zw;',
    '}',

    'void main() {',
      // right projections are shifted and vertically mirrored relative to left
      'vec4 projectionRight = ',
      '(projectionLeft + vec4(0.0, 0.0, 1.0, 0.0)) * vec4(1.0, 1.0, -1.0, 1.0);',
      'vec4 unprojectionRight = ',
      '(unprojectionLeft + vec4(0.0, 0.0, 1.0, 0.0)) * vec4(1.0, 1.0, -1.0, 1.0);',

      'vec2 a = (vUV.x < 0.5) ? ',
      'barrel(vec2(vUV.x / 0.5, vUV.y), projectionLeft, unprojectionLeft) : ',
      'barrel(vec2((vUV.x - 0.5) / 0.5, vUV.y), projectionRight, unprojectionRight);',

      'if (dividerColor.w > 0.0 && abs(vUV.x - 0.5) < .001) {',
        // Don't render the divider, since it's rendered in HTML.
        //'gl_FragColor = dividerColor;',
      '} else if (a.x < 0.0 || a.x > 1.0 || a.y < 0.0 || a.y > 1.0) {',
        'gl_FragColor = backgroundColor;',
      '} else {',
        'gl_FragColor = texture2D(texture, vec2(a.x * 0.5 + (vUV.x < 0.5 ? 0.0 : 0.5), a.y));',
      '}',
    '}'

    ].join('\n')
};

module.exports = BarrelDistortionFragment;

},{}],6:[function(require,module,exports){
/**
 * TODO(smus): Implement coefficient inversion.
 */
function Distortion(coefficients) {
  this.coefficients = coefficients;
}

/**
 * Calculates the inverse distortion for a radius.
 * </p><p>
 * Allows to compute the original undistorted radius from a distorted one.
 * See also getApproximateInverseDistortion() for a faster but potentially
 * less accurate method.
 *
 * @param {Number} radius Distorted radius from the lens center in tan-angle units.
 * @return {Number} The undistorted radius in tan-angle units.
 */
Distortion.prototype.distortInverse = function(radius) {
  // Secant method.
  var r0 = radius / 0.9;
  var r1 = radius * 0.9;
  var dr0 = radius - this.distort(r0);
  while (Math.abs(r1 - r0) > 0.0001 /** 0.1mm */) {
    var dr1 = radius - this.distort(r1);
    var r2 = r1 - dr1 * ((r1 - r0) / (dr1 - dr0));
    r0 = r1;
    r1 = r2;
    dr0 = dr1;
  }
  return r1;
}


/**
 * Distorts a radius by its distortion factor from the center of the lenses.
 *
 * @param {Number} radius Radius from the lens center in tan-angle units.
 * @return {Number} The distorted radius in tan-angle units.
 */
Distortion.prototype.distort = function(radius) {
  return radius * this.distortionFactor_(radius);
}

/**
 * Returns the distortion factor of a point.
 *
 * @param {Number} radius Radius of the point from the lens center in tan-angle units.
 * @return {Number} The distortion factor. Multiply by this factor to distort points.
 */
Distortion.prototype.distortionFactor_ = function(radius) {
  var result = 1.0;
  var rFactor = 1.0;
  var rSquared = radius * radius;

  for (var i = 0; i < this.coefficients.length; i++) {
    var ki = this.coefficients[i];
    rFactor *= rSquared;
    result += ki * rFactor;
  }

  return result;
}

module.exports = Distortion;

},{}],7:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * DPDB cache.
 */
var DPDB_CACHE = {
  "format": 1,
  "last_updated": "2016-01-26T23:11:18Z",
  "devices": [
  {
    "type": "android",
    "rules": [
      { "mdmh": "asus/*/Nexus 7/*" },
      { "ua": "Nexus 7" }
    ],
    "dpi": [ 320.8, 323.0 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "asus/*/ASUS_Z00AD/*" },
      { "ua": "ASUS_Z00AD" }
    ],
    "dpi": [ 403.0, 404.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "HTC/*/HTC6435LVW/*" },
      { "ua": "HTC6435LVW" }
    ],
    "dpi": [ 449.7, 443.3 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "HTC/*/HTC One XL/*" },
      { "ua": "HTC One XL" }
    ],
    "dpi": [ 315.3, 314.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "htc/*/Nexus 9/*" },
      { "ua": "Nexus 9" }
    ],
    "dpi": 289.0,
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "HTC/*/HTC One M9/*" },
      { "ua": "HTC One M9" }
    ],
    "dpi": [ 442.5, 443.3 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "HTC/*/HTC One_M8/*" },
      { "ua": "HTC One_M8" }
    ],
    "dpi": [ 449.7, 447.4 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "HTC/*/HTC One/*" },
      { "ua": "HTC One" }
    ],
    "dpi": 472.8,
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Huawei/*/Nexus 6P/*" },
      { "ua": "Nexus 6P" }
    ],
    "dpi": [ 515.1, 518.0 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/Nexus 5X/*" },
      { "ua": "Nexus 5X" }
    ],
    "dpi": [ 422.0, 419.9 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/LGMS345/*" },
      { "ua": "LGMS345" }
    ],
    "dpi": [ 221.7, 219.1 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/LG-D800/*" },
      { "ua": "LG-D800" }
    ],
    "dpi": [ 422.0, 424.1 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/LG-D850/*" },
      { "ua": "LG-D850" }
    ],
    "dpi": [ 537.9, 541.9 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/VS985 4G/*" },
      { "ua": "VS985 4G" }
    ],
    "dpi": [ 537.9, 535.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/Nexus 5/*" },
      { "ua": "Nexus 5 B" }
    ],
    "dpi": [ 442.4, 444.8 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/Nexus 4/*" },
      { "ua": "Nexus 4" }
    ],
    "dpi": [ 319.8, 318.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/LG-P769/*" },
      { "ua": "LG-P769" }
    ],
    "dpi": [ 240.6, 247.5 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/LGMS323/*" },
      { "ua": "LGMS323" }
    ],
    "dpi": [ 206.6, 204.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "LGE/*/LGLS996/*" },
      { "ua": "LGLS996" }
    ],
    "dpi": [ 403.4, 401.5 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Micromax/*/4560MMX/*" },
      { "ua": "4560MMX" }
    ],
    "dpi": [ 240.0, 219.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Micromax/*/A250/*" },
      { "ua": "Micromax A250" }
    ],
    "dpi": [ 480.0, 446.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Micromax/*/Micromax AQ4501/*" },
      { "ua": "Micromax AQ4501" }
    ],
    "dpi": 240.0,
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/DROID RAZR/*" },
      { "ua": "DROID RAZR" }
    ],
    "dpi": [ 368.1, 256.7 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT830C/*" },
      { "ua": "XT830C" }
    ],
    "dpi": [ 254.0, 255.9 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1021/*" },
      { "ua": "XT1021" }
    ],
    "dpi": [ 254.0, 256.7 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1023/*" },
      { "ua": "XT1023" }
    ],
    "dpi": [ 254.0, 256.7 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1028/*" },
      { "ua": "XT1028" }
    ],
    "dpi": [ 326.6, 327.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1034/*" },
      { "ua": "XT1034" }
    ],
    "dpi": [ 326.6, 328.4 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1053/*" },
      { "ua": "XT1053" }
    ],
    "dpi": [ 315.3, 316.1 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1562/*" },
      { "ua": "XT1562" }
    ],
    "dpi": [ 403.4, 402.7 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/Nexus 6/*" },
      { "ua": "Nexus 6 B" }
    ],
    "dpi": [ 494.3, 489.7 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1063/*" },
      { "ua": "XT1063" }
    ],
    "dpi": [ 295.0, 296.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1064/*" },
      { "ua": "XT1064" }
    ],
    "dpi": [ 295.0, 295.6 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1092/*" },
      { "ua": "XT1092" }
    ],
    "dpi": [ 422.0, 424.1 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "motorola/*/XT1095/*" },
      { "ua": "XT1095" }
    ],
    "dpi": [ 422.0, 423.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "OnePlus/*/A0001/*" },
      { "ua": "A0001" }
    ],
    "dpi": [ 403.4, 401.0 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "OnePlus/*/ONE E1005/*" },
      { "ua": "ONE E1005" }
    ],
    "dpi": [ 442.4, 441.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "OnePlus/*/ONE A2005/*" },
      { "ua": "ONE A2005" }
    ],
    "dpi": [ 391.9, 405.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "OPPO/*/X909/*" },
      { "ua": "X909" }
    ],
    "dpi": [ 442.4, 444.1 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9082/*" },
      { "ua": "GT-I9082" }
    ],
    "dpi": [ 184.7, 185.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G360P/*" },
      { "ua": "SM-G360P" }
    ],
    "dpi": [ 196.7, 205.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/Nexus S/*" },
      { "ua": "Nexus S" }
    ],
    "dpi": [ 234.5, 229.8 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9300/*" },
      { "ua": "GT-I9300" }
    ],
    "dpi": [ 304.8, 303.9 ],
    "bw": 5,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-T230NU/*" },
      { "ua": "SM-T230NU" }
    ],
    "dpi": 216.0,
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SGH-T399/*" },
      { "ua": "SGH-T399" }
    ],
    "dpi": [ 217.7, 231.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-N9005/*" },
      { "ua": "SM-N9005" }
    ],
    "dpi": [ 386.4, 387.0 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SAMSUNG-SM-N900A/*" },
      { "ua": "SAMSUNG-SM-N900A" }
    ],
    "dpi": [ 386.4, 387.7 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9500/*" },
      { "ua": "GT-I9500" }
    ],
    "dpi": [ 442.5, 443.3 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9505/*" },
      { "ua": "GT-I9505" }
    ],
    "dpi": 439.4,
    "bw": 4,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G900F/*" },
      { "ua": "SM-G900F" }
    ],
    "dpi": [ 415.6, 431.6 ],
    "bw": 5,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G900M/*" },
      { "ua": "SM-G900M" }
    ],
    "dpi": [ 415.6, 431.6 ],
    "bw": 5,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G800F/*" },
      { "ua": "SM-G800F" }
    ],
    "dpi": 326.8,
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G906S/*" },
      { "ua": "SM-G906S" }
    ],
    "dpi": [ 562.7, 572.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9300/*" },
      { "ua": "GT-I9300" }
    ],
    "dpi": [ 306.7, 304.8 ],
    "bw": 5,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-T535/*" },
      { "ua": "SM-T535" }
    ],
    "dpi": [ 142.6, 136.4 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-N920C/*" },
      { "ua": "SM-N920C" }
    ],
    "dpi": [ 515.1, 518.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9300I/*" },
      { "ua": "GT-I9300I" }
    ],
    "dpi": [ 304.8, 305.8 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-I9195/*" },
      { "ua": "GT-I9195" }
    ],
    "dpi": [ 249.4, 256.7 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SPH-L520/*" },
      { "ua": "SPH-L520" }
    ],
    "dpi": [ 249.4, 255.9 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SAMSUNG-SGH-I717/*" },
      { "ua": "SAMSUNG-SGH-I717" }
    ],
    "dpi": 285.8,
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SPH-D710/*" },
      { "ua": "SPH-D710" }
    ],
    "dpi": [ 217.7, 204.2 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/GT-N7100/*" },
      { "ua": "GT-N7100" }
    ],
    "dpi": 265.1,
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SCH-I605/*" },
      { "ua": "SCH-I605" }
    ],
    "dpi": 265.1,
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/Galaxy Nexus/*" },
      { "ua": "Galaxy Nexus" }
    ],
    "dpi": [ 315.3, 314.2 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-N910H/*" },
      { "ua": "SM-N910H" }
    ],
    "dpi": [ 515.1, 518.0 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-N910C/*" },
      { "ua": "SM-N910C" }
    ],
    "dpi": [ 515.2, 520.2 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G130M/*" },
      { "ua": "SM-G130M" }
    ],
    "dpi": [ 165.9, 164.8 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G928I/*" },
      { "ua": "SM-G928I" }
    ],
    "dpi": [ 515.1, 518.4 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G920F/*" },
      { "ua": "SM-G920F" }
    ],
    "dpi": 580.6,
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G920P/*" },
      { "ua": "SM-G920P" }
    ],
    "dpi": [ 522.5, 577.0 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G925F/*" },
      { "ua": "SM-G925F" }
    ],
    "dpi": 580.6,
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "samsung/*/SM-G925V/*" },
      { "ua": "SM-G925V" }
    ],
    "dpi": [ 522.5, 576.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Sony/*/C6903/*" },
      { "ua": "C6903" }
    ],
    "dpi": [ 442.5, 443.3 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Sony/*/D6653/*" },
      { "ua": "D6653" }
    ],
    "dpi": [ 428.6, 427.6 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Sony/*/E6653/*" },
      { "ua": "E6653" }
    ],
    "dpi": [ 428.6, 425.7 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Sony/*/E6853/*" },
      { "ua": "E6853" }
    ],
    "dpi": [ 403.4, 401.9 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "Sony/*/SGP321/*" },
      { "ua": "SGP321" }
    ],
    "dpi": [ 224.7, 224.1 ],
    "bw": 3,
    "ac": 500
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "TCT/*/ALCATEL ONE TOUCH Fierce/*" },
      { "ua": "ALCATEL ONE TOUCH Fierce" }
    ],
    "dpi": [ 240.0, 247.5 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "THL/*/thl 5000/*" },
      { "ua": "thl 5000" }
    ],
    "dpi": [ 480.0, 443.3 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "android",
    "rules": [
      { "mdmh": "ZTE/*/ZTE Blade L2/*" },
      { "ua": "ZTE Blade L2" }
    ],
    "dpi": 240.0,
    "bw": 3,
    "ac": 500
  },
  {
    "type": "ios",
    "rules": [ { "res": [ 640, 960 ] } ],
    "dpi": [ 325.1, 328.4 ],
    "bw": 4,
    "ac": 1000
  },
  {
    "type": "ios",
    "rules": [ { "res": [ 640, 1136 ] } ],
    "dpi": [ 317.1, 320.2 ],
    "bw": 3,
    "ac": 1000
  },
  {
    "type": "ios",
    "rules": [ { "res": [ 750, 1334 ] } ],
    "dpi": 326.4,
    "bw": 4,
    "ac": 1000
  },
  {
    "type": "ios",
    "rules": [ { "res": [ 1242, 2208 ] } ],
    "dpi": [ 453.6, 458.4 ],
    "bw": 4,
    "ac": 1000
  },
  {
    "type": "ios",
    "rules": [ { "res": [ 1125, 2001 ] } ],
    "dpi": [ 410.9, 415.4 ],
    "bw": 4,
    "ac": 1000
  }
]};

module.exports = DPDB_CACHE;


},{}],8:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Offline cache of the DPDB, to be used until we load the online one (and
// as a fallback in case we can't load the online one).
var DPDB_CACHE = require('./dpdb-cache.js');
var Util = require('./util.js');

// Online DPDB URL.
var ONLINE_DPDB_URL = 'https://storage.googleapis.com/cardboard-dpdb/dpdb.json';

/**
 * Calculates device parameters based on the DPDB (Device Parameter Database).
 * Initially, uses the cached DPDB values.
 *
 * If fetchOnline == true, then this object tries to fetch the online version
 * of the DPDB and updates the device info if a better match is found.
 * Calls the onDeviceParamsUpdated callback when there is an update to the
 * device information.
 */
function Dpdb(fetchOnline, onDeviceParamsUpdated) {
  // Start with the offline DPDB cache while we are loading the real one.
  this.dpdb = DPDB_CACHE;

  // Calculate device params based on the offline version of the DPDB.
  this.recalculateDeviceParams_();

  // XHR to fetch online DPDB file, if requested.
  if (fetchOnline) {
    // Set the callback.
    this.onDeviceParamsUpdated = onDeviceParamsUpdated;

    void 0;
    var xhr = new XMLHttpRequest();
    var obj = this;
    xhr.open('GET', ONLINE_DPDB_URL, true);
    xhr.addEventListener('load', function() {
      obj.loading = false;
      if (xhr.status >= 200 && xhr.status <= 299) {
        // Success.
        void 0;
        obj.dpdb = JSON.parse(xhr.response);
        obj.recalculateDeviceParams_();
      } else {
        // Error loading the DPDB.
        void 0;
      }
    });
    xhr.send();
  }
}

// Returns the current device parameters.
Dpdb.prototype.getDeviceParams = function() {
  return this.deviceParams;
};

// Recalculates this device's parameters based on the DPDB.
Dpdb.prototype.recalculateDeviceParams_ = function() {
  void 0;
  var newDeviceParams = this.calcDeviceParams_();
  void 0;
  void 0;
  if (newDeviceParams) {
    this.deviceParams = newDeviceParams;
    // Invoke callback, if it is set.
    if (this.onDeviceParamsUpdated) {
      this.onDeviceParamsUpdated(this.deviceParams);
    }
  } else {
    void 0;
  }
};

// Returns a DeviceParams object that represents the best guess as to this
// device's parameters. Can return null if the device does not match any
// known devices.
Dpdb.prototype.calcDeviceParams_ = function() {
  var db = this.dpdb; // shorthand
  if (!db) {
    void 0;
    return null;
  }
  if (db.format != 1) {
    void 0;
    return null;
  }
  if (!db.devices || !db.devices.length) {
    void 0;
    return null;
  }

  // Get the actual user agent and screen dimensions in pixels.
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var width = Util.getScreenWidth();
  var height = Util.getScreenHeight();
  void 0;
  void 0;
  void 0;

  if (!db.devices) {
    void 0;
    return null;
  }

  for (var i = 0; i < db.devices.length; i++) {
    var device = db.devices[i];
    if (!device.rules) {
      void 0;
      continue;
    }

    if (device.type != 'ios' && device.type != 'android') {
      void 0;
      continue;
    }

    // See if this device is of the appropriate type.
    if (Util.isIOS() != (device.type == 'ios')) continue;

    // See if this device matches any of the rules:
    var matched = false;
    for (var j = 0; j < device.rules.length; j++) {
      var rule = device.rules[j];
      if (this.matchRule_(rule, userAgent, width, height)) {
        void 0;
        void 0;
        matched = true;
        break;
      }
    }
    if (!matched) continue;

    // device.dpi might be an array of [ xdpi, ydpi] or just a scalar.
    var xdpi = device.dpi[0] || device.dpi;
    var ydpi = device.dpi[1] || device.dpi;

    return new DeviceParams({ xdpi: xdpi, ydpi: ydpi, bevelMm: device.bw });
  }

  void 0;
  return null;
};

Dpdb.prototype.matchRule_ = function(rule, ua, screenWidth, screenHeight) {
  // We can only match 'ua' and 'res' rules, not other types like 'mdmh'
  // (which are meant for native platforms).
  if (!rule.ua && !rule.res) return false;

  // If our user agent string doesn't contain the indicated user agent string,
  // the match fails.
  if (rule.ua && ua.indexOf(rule.ua) < 0) return false;

  // If the rule specifies screen dimensions that don't correspond to ours,
  // the match fails.
  if (rule.res) {
    if (!rule.res[0] || !rule.res[1]) return false;
    var resX = rule.res[0];
    var resY = rule.res[1];
    // Compare min and max so as to make the order not matter, i.e., it should
    // be true that 640x480 == 480x640.
    if (Math.min(screenWidth, screenHeight) != Math.min(resX, resY) ||
        (Math.max(screenWidth, screenHeight) != Math.max(resX, resY))) {
      return false;
    }
  }

  return true;
}

function DeviceParams(params) {
  this.xdpi = params.xdpi;
  this.ydpi = params.ydpi;
  this.bevelMm = params.bevelMm;
}

module.exports = Dpdb;

},{"./dpdb-cache.js":7,"./util.js":13}],9:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function Emitter() {
  this.callbacks = {};
}

Emitter.prototype.emit = function(eventName) {
  var callbacks = this.callbacks[eventName];
  if (!callbacks) {
    //console.log('No valid callback specified.');
    return;
  }
  var args = [].slice.call(arguments);
  // Eliminate the first param (the callback).
  args.shift();
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(this, args);
  }
};

Emitter.prototype.on = function(eventName, callback) {
  if (eventName in this.callbacks) {
    this.callbacks[eventName].push(callback);
  } else {
    this.callbacks[eventName] = [callback];
  }
};

module.exports = Emitter;

},{}],10:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var WebVRManager = require('./webvr-manager.js');

window.WebVRConfig = window.WebVRConfig || {};
window.WebVRManager = WebVRManager;

},{"./webvr-manager.js":16}],11:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Modes = {
  UNKNOWN: 0,
  // Not fullscreen, just tracking.
  NORMAL: 1,
  // Magic window immersive mode.
  MAGIC_WINDOW: 2,
  // Full screen split screen VR mode.
  VR: 3,
};

module.exports = Modes;

},{}],12:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Util = require('./util.js');

function RotateInstructions() {
  this.loadIcon_();

  var overlay = document.createElement('div');
  var s = overlay.style;
  s.position = 'fixed';
  s.top = 0;
  s.right = 0;
  s.bottom = 0;
  s.left = 0;
  s.backgroundColor = 'gray';
  s.fontFamily = 'sans-serif';

  var img = document.createElement('img');
  img.src = this.icon;
  var s = img.style;
  s.marginLeft = '25%';
  s.marginTop = '25%';
  s.width = '50%';
  overlay.appendChild(img);

  var text = document.createElement('div');
  var s = text.style;
  s.textAlign = 'center';
  s.fontSize = '16px';
  s.lineHeight = '24px';
  s.margin = '24px 25%';
  s.width = '50%';
  text.innerHTML = 'Place your phone into your Cardboard viewer.';
  overlay.appendChild(text);

  var snackbar = document.createElement('div');
  var s = snackbar.style;
  s.backgroundColor = '#CFD8DC';
  s.position = 'fixed';
  s.bottom = 0;
  s.width = '100%';
  s.height = '48px';
  s.padding = '14px 24px';
  s.boxSizing = 'border-box';
  s.color = '#656A6B';
  overlay.appendChild(snackbar);

  var snackbarText = document.createElement('div');
  snackbarText.style.float = 'left';
  snackbarText.innerHTML = 'No Cardboard viewer?';

  var snackbarButton = document.createElement('a');
  snackbarButton.href = 'https://www.google.com/get/cardboard/get-cardboard/';
  snackbarButton.innerHTML = 'get one';
  var s = snackbarButton.style;
  s.float = 'right';
  s.fontWeight = 600;
  s.textTransform = 'uppercase';
  s.borderLeft = '1px solid gray';
  s.paddingLeft = '24px';
  s.textDecoration = 'none';
  s.color = '#656A6B';

  snackbar.appendChild(snackbarText);
  snackbar.appendChild(snackbarButton);

  this.overlay = overlay;
  this.text = text;
  document.body.appendChild(overlay);

  this.hide();
}

RotateInstructions.prototype.show = function() {
  this.overlay.style.display = 'block';

  var img = this.overlay.querySelector('img');
  var s = img.style;

  if (Util.isLandscapeMode()) {
    s.width = '20%';
    s.marginLeft = '40%';
    s.marginTop = '3%';
  } else {
    s.width = '50%';
    s.marginLeft = '25%';
    s.marginTop = '25%';
  }
};

RotateInstructions.prototype.hide = function() {
  this.overlay.style.display = 'none';
};

RotateInstructions.prototype.showTemporarily = function(ms) {
  this.show();
  this.timer = setTimeout(this.hide.bind(this), ms);
};

RotateInstructions.prototype.disableShowTemporarily = function() {
  clearTimeout(this.timer);
};

RotateInstructions.prototype.loadIcon_ = function() {
  // Encoded asset_src/rotate-instructions.svg
  this.icon = Util.base64('image/svg+xml', 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE5OHB4IiBoZWlnaHQ9IjI0MHB4IiB2aWV3Qm94PSIwIDAgMTk4IDI0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMy4zICgxMjA4MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+dHJhbnNpdGlvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJ0cmFuc2l0aW9uIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIj4KICAgICAgICAgICAgPGcgaWQ9IkltcG9ydGVkLUxheWVycy1Db3B5LTQtKy1JbXBvcnRlZC1MYXllcnMtQ29weS0rLUltcG9ydGVkLUxheWVycy1Db3B5LTItQ29weSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iSW1wb3J0ZWQtTGF5ZXJzLUNvcHktNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEwNy4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQ5LjYyNSwyLjUyNyBDMTQ5LjYyNSwyLjUyNyAxNTUuODA1LDYuMDk2IDE1Ni4zNjIsNi40MTggTDE1Ni4zNjIsNy4zMDQgQzE1Ni4zNjIsNy40ODEgMTU2LjM3NSw3LjY2NCAxNTYuNCw3Ljg1MyBDMTU2LjQxLDcuOTM0IDE1Ni40Miw4LjAxNSAxNTYuNDI3LDguMDk1IEMxNTYuNTY3LDkuNTEgMTU3LjQwMSwxMS4wOTMgMTU4LjUzMiwxMi4wOTQgTDE2NC4yNTIsMTcuMTU2IEwxNjQuMzMzLDE3LjA2NiBDMTY0LjMzMywxNy4wNjYgMTY4LjcxNSwxNC41MzYgMTY5LjU2OCwxNC4wNDIgQzE3MS4wMjUsMTQuODgzIDE5NS41MzgsMjkuMDM1IDE5NS41MzgsMjkuMDM1IEwxOTUuNTM4LDgzLjAzNiBDMTk1LjUzOCw4My44MDcgMTk1LjE1Miw4NC4yNTMgMTk0LjU5LDg0LjI1MyBDMTk0LjM1Nyw4NC4yNTMgMTk0LjA5NSw4NC4xNzcgMTkzLjgxOCw4NC4wMTcgTDE2OS44NTEsNzAuMTc5IEwxNjkuODM3LDcwLjIwMyBMMTQyLjUxNSw4NS45NzggTDE0MS42NjUsODQuNjU1IEMxMzYuOTM0LDgzLjEyNiAxMzEuOTE3LDgxLjkxNSAxMjYuNzE0LDgxLjA0NSBDMTI2LjcwOSw4MS4wNiAxMjYuNzA3LDgxLjA2OSAxMjYuNzA3LDgxLjA2OSBMMTIxLjY0LDk4LjAzIEwxMTMuNzQ5LDEwMi41ODYgTDExMy43MTIsMTAyLjUyMyBMMTEzLjcxMiwxMzAuMTEzIEMxMTMuNzEyLDEzMC44ODUgMTEzLjMyNiwxMzEuMzMgMTEyLjc2NCwxMzEuMzMgQzExMi41MzIsMTMxLjMzIDExMi4yNjksMTMxLjI1NCAxMTEuOTkyLDEzMS4wOTQgTDY5LjUxOSwxMDYuNTcyIEM2OC41NjksMTA2LjAyMyA2Ny43OTksMTA0LjY5NSA2Ny43OTksMTAzLjYwNSBMNjcuNzk5LDEwMi41NyBMNjcuNzc4LDEwMi42MTcgQzY3LjI3LDEwMi4zOTMgNjYuNjQ4LDEwMi4yNDkgNjUuOTYyLDEwMi4yMTggQzY1Ljg3NSwxMDIuMjE0IDY1Ljc4OCwxMDIuMjEyIDY1LjcwMSwxMDIuMjEyIEM2NS42MDYsMTAyLjIxMiA2NS41MTEsMTAyLjIxNSA2NS40MTYsMTAyLjIxOSBDNjUuMTk1LDEwMi4yMjkgNjQuOTc0LDEwMi4yMzUgNjQuNzU0LDEwMi4yMzUgQzY0LjMzMSwxMDIuMjM1IDYzLjkxMSwxMDIuMjE2IDYzLjQ5OCwxMDIuMTc4IEM2MS44NDMsMTAyLjAyNSA2MC4yOTgsMTAxLjU3OCA1OS4wOTQsMTAwLjg4MiBMMTIuNTE4LDczLjk5MiBMMTIuNTIzLDc0LjAwNCBMMi4yNDUsNTUuMjU0IEMxLjI0NCw1My40MjcgMi4wMDQsNTEuMDM4IDMuOTQzLDQ5LjkxOCBMNTkuOTU0LDE3LjU3MyBDNjAuNjI2LDE3LjE4NSA2MS4zNSwxNy4wMDEgNjIuMDUzLDE3LjAwMSBDNjMuMzc5LDE3LjAwMSA2NC42MjUsMTcuNjYgNjUuMjgsMTguODU0IEw2NS4yODUsMTguODUxIEw2NS41MTIsMTkuMjY0IEw2NS41MDYsMTkuMjY4IEM2NS45MDksMjAuMDAzIDY2LjQwNSwyMC42OCA2Ni45ODMsMjEuMjg2IEw2Ny4yNiwyMS41NTYgQzY5LjE3NCwyMy40MDYgNzEuNzI4LDI0LjM1NyA3NC4zNzMsMjQuMzU3IEM3Ni4zMjIsMjQuMzU3IDc4LjMyMSwyMy44NCA4MC4xNDgsMjIuNzg1IEM4MC4xNjEsMjIuNzg1IDg3LjQ2NywxOC41NjYgODcuNDY3LDE4LjU2NiBDODguMTM5LDE4LjE3OCA4OC44NjMsMTcuOTk0IDg5LjU2NiwxNy45OTQgQzkwLjg5MiwxNy45OTQgOTIuMTM4LDE4LjY1MiA5Mi43OTIsMTkuODQ3IEw5Ni4wNDIsMjUuNzc1IEw5Ni4wNjQsMjUuNzU3IEwxMDIuODQ5LDI5LjY3NCBMMTAyLjc0NCwyOS40OTIgTDE0OS42MjUsMi41MjcgTTE0OS42MjUsMC44OTIgQzE0OS4zNDMsMC44OTIgMTQ5LjA2MiwwLjk2NSAxNDguODEsMS4xMSBMMTAyLjY0MSwyNy42NjYgTDk3LjIzMSwyNC41NDIgTDk0LjIyNiwxOS4wNjEgQzkzLjMxMywxNy4zOTQgOTEuNTI3LDE2LjM1OSA4OS41NjYsMTYuMzU4IEM4OC41NTUsMTYuMzU4IDg3LjU0NiwxNi42MzIgODYuNjQ5LDE3LjE1IEM4My44NzgsMTguNzUgNzkuNjg3LDIxLjE2OSA3OS4zNzQsMjEuMzQ1IEM3OS4zNTksMjEuMzUzIDc5LjM0NSwyMS4zNjEgNzkuMzMsMjEuMzY5IEM3Ny43OTgsMjIuMjU0IDc2LjA4NCwyMi43MjIgNzQuMzczLDIyLjcyMiBDNzIuMDgxLDIyLjcyMiA2OS45NTksMjEuODkgNjguMzk3LDIwLjM4IEw2OC4xNDUsMjAuMTM1IEM2Ny43MDYsMTkuNjcyIDY3LjMyMywxOS4xNTYgNjcuMDA2LDE4LjYwMSBDNjYuOTg4LDE4LjU1OSA2Ni45NjgsMTguNTE5IDY2Ljk0NiwxOC40NzkgTDY2LjcxOSwxOC4wNjUgQzY2LjY5LDE4LjAxMiA2Ni42NTgsMTcuOTYgNjYuNjI0LDE3LjkxMSBDNjUuNjg2LDE2LjMzNyA2My45NTEsMTUuMzY2IDYyLjA1MywxNS4zNjYgQzYxLjA0MiwxNS4zNjYgNjAuMDMzLDE1LjY0IDU5LjEzNiwxNi4xNTggTDMuMTI1LDQ4LjUwMiBDMC40MjYsNTAuMDYxIC0wLjYxMyw1My40NDIgMC44MTEsNTYuMDQgTDExLjA4OSw3NC43OSBDMTEuMjY2LDc1LjExMyAxMS41MzcsNzUuMzUzIDExLjg1LDc1LjQ5NCBMNTguMjc2LDEwMi4yOTggQzU5LjY3OSwxMDMuMTA4IDYxLjQzMywxMDMuNjMgNjMuMzQ4LDEwMy44MDYgQzYzLjgxMiwxMDMuODQ4IDY0LjI4NSwxMDMuODcgNjQuNzU0LDEwMy44NyBDNjUsMTAzLjg3IDY1LjI0OSwxMDMuODY0IDY1LjQ5NCwxMDMuODUyIEM2NS41NjMsMTAzLjg0OSA2NS42MzIsMTAzLjg0NyA2NS43MDEsMTAzLjg0NyBDNjUuNzY0LDEwMy44NDcgNjUuODI4LDEwMy44NDkgNjUuODksMTAzLjg1MiBDNjUuOTg2LDEwMy44NTYgNjYuMDgsMTAzLjg2MyA2Ni4xNzMsMTAzLjg3NCBDNjYuMjgyLDEwNS40NjcgNjcuMzMyLDEwNy4xOTcgNjguNzAyLDEwNy45ODggTDExMS4xNzQsMTMyLjUxIEMxMTEuNjk4LDEzMi44MTIgMTEyLjIzMiwxMzIuOTY1IDExMi43NjQsMTMyLjk2NSBDMTE0LjI2MSwxMzIuOTY1IDExNS4zNDcsMTMxLjc2NSAxMTUuMzQ3LDEzMC4xMTMgTDExNS4zNDcsMTAzLjU1MSBMMTIyLjQ1OCw5OS40NDYgQzEyMi44MTksOTkuMjM3IDEyMy4wODcsOTguODk4IDEyMy4yMDcsOTguNDk4IEwxMjcuODY1LDgyLjkwNSBDMTMyLjI3OSw4My43MDIgMTM2LjU1Nyw4NC43NTMgMTQwLjYwNyw4Ni4wMzMgTDE0MS4xNCw4Ni44NjIgQzE0MS40NTEsODcuMzQ2IDE0MS45NzcsODcuNjEzIDE0Mi41MTYsODcuNjEzIEMxNDIuNzk0LDg3LjYxMyAxNDMuMDc2LDg3LjU0MiAxNDMuMzMzLDg3LjM5MyBMMTY5Ljg2NSw3Mi4wNzYgTDE5Myw4NS40MzMgQzE5My41MjMsODUuNzM1IDE5NC4wNTgsODUuODg4IDE5NC41OSw4NS44ODggQzE5Ni4wODcsODUuODg4IDE5Ny4xNzMsODQuNjg5IDE5Ny4xNzMsODMuMDM2IEwxOTcuMTczLDI5LjAzNSBDMTk3LjE3MywyOC40NTEgMTk2Ljg2MSwyNy45MTEgMTk2LjM1NSwyNy42MTkgQzE5Ni4zNTUsMjcuNjE5IDE3MS44NDMsMTMuNDY3IDE3MC4zODUsMTIuNjI2IEMxNzAuMTMyLDEyLjQ4IDE2OS44NSwxMi40MDcgMTY5LjU2OCwxMi40MDcgQzE2OS4yODUsMTIuNDA3IDE2OS4wMDIsMTIuNDgxIDE2OC43NDksMTIuNjI3IEMxNjguMTQzLDEyLjk3OCAxNjUuNzU2LDE0LjM1NyAxNjQuNDI0LDE1LjEyNSBMMTU5LjYxNSwxMC44NyBDMTU4Ljc5NiwxMC4xNDUgMTU4LjE1NCw4LjkzNyAxNTguMDU0LDcuOTM0IEMxNTguMDQ1LDcuODM3IDE1OC4wMzQsNy43MzkgMTU4LjAyMSw3LjY0IEMxNTguMDA1LDcuNTIzIDE1Ny45OTgsNy40MSAxNTcuOTk4LDcuMzA0IEwxNTcuOTk4LDYuNDE4IEMxNTcuOTk4LDUuODM0IDE1Ny42ODYsNS4yOTUgMTU3LjE4MSw1LjAwMiBDMTU2LjYyNCw0LjY4IDE1MC40NDIsMS4xMTEgMTUwLjQ0MiwxLjExMSBDMTUwLjE4OSwwLjk2NSAxNDkuOTA3LDAuODkyIDE0OS42MjUsMC44OTIiIGlkPSJGaWxsLTEiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTYuMDI3LDI1LjYzNiBMMTQyLjYwMyw1Mi41MjcgQzE0My44MDcsNTMuMjIyIDE0NC41ODIsNTQuMTE0IDE0NC44NDUsNTUuMDY4IEwxNDQuODM1LDU1LjA3NSBMNjMuNDYxLDEwMi4wNTcgTDYzLjQ2LDEwMi4wNTcgQzYxLjgwNiwxMDEuOTA1IDYwLjI2MSwxMDEuNDU3IDU5LjA1NywxMDAuNzYyIEwxMi40ODEsNzMuODcxIEw5Ni4wMjcsMjUuNjM2IiBpZD0iRmlsbC0yIiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYzLjQ2MSwxMDIuMTc0IEM2My40NTMsMTAyLjE3NCA2My40NDYsMTAyLjE3NCA2My40MzksMTAyLjE3MiBDNjEuNzQ2LDEwMi4wMTYgNjAuMjExLDEwMS41NjMgNTguOTk4LDEwMC44NjMgTDEyLjQyMiw3My45NzMgQzEyLjM4Niw3My45NTIgMTIuMzY0LDczLjkxNCAxMi4zNjQsNzMuODcxIEMxMi4zNjQsNzMuODMgMTIuMzg2LDczLjc5MSAxMi40MjIsNzMuNzcgTDk1Ljk2OCwyNS41MzUgQzk2LjAwNCwyNS41MTQgOTYuMDQ5LDI1LjUxNCA5Ni4wODUsMjUuNTM1IEwxNDIuNjYxLDUyLjQyNiBDMTQzLjg4OCw1My4xMzQgMTQ0LjY4Miw1NC4wMzggMTQ0Ljk1Nyw1NS4wMzcgQzE0NC45Nyw1NS4wODMgMTQ0Ljk1Myw1NS4xMzMgMTQ0LjkxNSw1NS4xNjEgQzE0NC45MTEsNTUuMTY1IDE0NC44OTgsNTUuMTc0IDE0NC44OTQsNTUuMTc3IEw2My41MTksMTAyLjE1OCBDNjMuNTAxLDEwMi4xNjkgNjMuNDgxLDEwMi4xNzQgNjMuNDYxLDEwMi4xNzQgTDYzLjQ2MSwxMDIuMTc0IFogTTEyLjcxNCw3My44NzEgTDU5LjExNSwxMDAuNjYxIEM2MC4yOTMsMTAxLjM0MSA2MS43ODYsMTAxLjc4MiA2My40MzUsMTAxLjkzNyBMMTQ0LjcwNyw1NS4wMTUgQzE0NC40MjgsNTQuMTA4IDE0My42ODIsNTMuMjg1IDE0Mi41NDQsNTIuNjI4IEw5Ni4wMjcsMjUuNzcxIEwxMi43MTQsNzMuODcxIEwxMi43MTQsNzMuODcxIFoiIGlkPSJGaWxsLTMiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQ4LjMyNyw1OC40NzEgQzE0OC4xNDUsNTguNDggMTQ3Ljk2Miw1OC40OCAxNDcuNzgxLDU4LjQ3MiBDMTQ1Ljg4Nyw1OC4zODkgMTQ0LjQ3OSw1Ny40MzQgMTQ0LjYzNiw1Ni4zNCBDMTQ0LjY4OSw1NS45NjcgMTQ0LjY2NCw1NS41OTcgMTQ0LjU2NCw1NS4yMzUgTDYzLjQ2MSwxMDIuMDU3IEM2NC4wODksMTAyLjExNSA2NC43MzMsMTAyLjEzIDY1LjM3OSwxMDIuMDk5IEM2NS41NjEsMTAyLjA5IDY1Ljc0MywxMDIuMDkgNjUuOTI1LDEwMi4wOTggQzY3LjgxOSwxMDIuMTgxIDY5LjIyNywxMDMuMTM2IDY5LjA3LDEwNC4yMyBMMTQ4LjMyNyw1OC40NzEiIGlkPSJGaWxsLTQiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNjkuMDcsMTA0LjM0NyBDNjkuMDQ4LDEwNC4zNDcgNjkuMDI1LDEwNC4zNCA2OS4wMDUsMTA0LjMyNyBDNjguOTY4LDEwNC4zMDEgNjguOTQ4LDEwNC4yNTcgNjguOTU1LDEwNC4yMTMgQzY5LDEwMy44OTYgNjguODk4LDEwMy41NzYgNjguNjU4LDEwMy4yODggQzY4LjE1MywxMDIuNjc4IDY3LjEwMywxMDIuMjY2IDY1LjkyLDEwMi4yMTQgQzY1Ljc0MiwxMDIuMjA2IDY1LjU2MywxMDIuMjA3IDY1LjM4NSwxMDIuMjE1IEM2NC43NDIsMTAyLjI0NiA2NC4wODcsMTAyLjIzMiA2My40NSwxMDIuMTc0IEM2My4zOTksMTAyLjE2OSA2My4zNTgsMTAyLjEzMiA2My4zNDcsMTAyLjA4MiBDNjMuMzM2LDEwMi4wMzMgNjMuMzU4LDEwMS45ODEgNjMuNDAyLDEwMS45NTYgTDE0NC41MDYsNTUuMTM0IEMxNDQuNTM3LDU1LjExNiAxNDQuNTc1LDU1LjExMyAxNDQuNjA5LDU1LjEyNyBDMTQ0LjY0Miw1NS4xNDEgMTQ0LjY2OCw1NS4xNyAxNDQuNjc3LDU1LjIwNCBDMTQ0Ljc4MSw1NS41ODUgMTQ0LjgwNiw1NS45NzIgMTQ0Ljc1MSw1Ni4zNTcgQzE0NC43MDYsNTYuNjczIDE0NC44MDgsNTYuOTk0IDE0NS4wNDcsNTcuMjgyIEMxNDUuNTUzLDU3Ljg5MiAxNDYuNjAyLDU4LjMwMyAxNDcuNzg2LDU4LjM1NSBDMTQ3Ljk2NCw1OC4zNjMgMTQ4LjE0Myw1OC4zNjMgMTQ4LjMyMSw1OC4zNTQgQzE0OC4zNzcsNTguMzUyIDE0OC40MjQsNTguMzg3IDE0OC40MzksNTguNDM4IEMxNDguNDU0LDU4LjQ5IDE0OC40MzIsNTguNTQ1IDE0OC4zODUsNTguNTcyIEw2OS4xMjksMTA0LjMzMSBDNjkuMTExLDEwNC4zNDIgNjkuMDksMTA0LjM0NyA2OS4wNywxMDQuMzQ3IEw2OS4wNywxMDQuMzQ3IFogTTY1LjY2NSwxMDEuOTc1IEM2NS43NTQsMTAxLjk3NSA2NS44NDIsMTAxLjk3NyA2NS45MywxMDEuOTgxIEM2Ny4xOTYsMTAyLjAzNyA2OC4yODMsMTAyLjQ2OSA2OC44MzgsMTAzLjEzOSBDNjkuMDY1LDEwMy40MTMgNjkuMTg4LDEwMy43MTQgNjkuMTk4LDEwNC4wMjEgTDE0Ny44ODMsNTguNTkyIEMxNDcuODQ3LDU4LjU5MiAxNDcuODExLDU4LjU5MSAxNDcuNzc2LDU4LjU4OSBDMTQ2LjUwOSw1OC41MzMgMTQ1LjQyMiw1OC4xIDE0NC44NjcsNTcuNDMxIEMxNDQuNTg1LDU3LjA5MSAxNDQuNDY1LDU2LjcwNyAxNDQuNTIsNTYuMzI0IEMxNDQuNTYzLDU2LjAyMSAxNDQuNTUyLDU1LjcxNiAxNDQuNDg4LDU1LjQxNCBMNjMuODQ2LDEwMS45NyBDNjQuMzUzLDEwMi4wMDIgNjQuODY3LDEwMi4wMDYgNjUuMzc0LDEwMS45ODIgQzY1LjQ3MSwxMDEuOTc3IDY1LjU2OCwxMDEuOTc1IDY1LjY2NSwxMDEuOTc1IEw2NS42NjUsMTAxLjk3NSBaIiBpZD0iRmlsbC01IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIuMjA4LDU1LjEzNCBDMS4yMDcsNTMuMzA3IDEuOTY3LDUwLjkxNyAzLjkwNiw0OS43OTcgTDU5LjkxNywxNy40NTMgQzYxLjg1NiwxNi4zMzMgNjQuMjQxLDE2LjkwNyA2NS4yNDMsMTguNzM0IEw2NS40NzUsMTkuMTQ0IEM2NS44NzIsMTkuODgyIDY2LjM2OCwyMC41NiA2Ni45NDUsMjEuMTY1IEw2Ny4yMjMsMjEuNDM1IEM3MC41NDgsMjQuNjQ5IDc1LjgwNiwyNS4xNTEgODAuMTExLDIyLjY2NSBMODcuNDMsMTguNDQ1IEM4OS4zNywxNy4zMjYgOTEuNzU0LDE3Ljg5OSA5Mi43NTUsMTkuNzI3IEw5Ni4wMDUsMjUuNjU1IEwxMi40ODYsNzMuODg0IEwyLjIwOCw1NS4xMzQgWiIgaWQ9IkZpbGwtNiIgZmlsbD0iI0ZBRkFGQSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi40ODYsNzQuMDAxIEMxMi40NzYsNzQuMDAxIDEyLjQ2NSw3My45OTkgMTIuNDU1LDczLjk5NiBDMTIuNDI0LDczLjk4OCAxMi4zOTksNzMuOTY3IDEyLjM4NCw3My45NCBMMi4xMDYsNTUuMTkgQzEuMDc1LDUzLjMxIDEuODU3LDUwLjg0NSAzLjg0OCw0OS42OTYgTDU5Ljg1OCwxNy4zNTIgQzYwLjUyNSwxNi45NjcgNjEuMjcxLDE2Ljc2NCA2Mi4wMTYsMTYuNzY0IEM2My40MzEsMTYuNzY0IDY0LjY2NiwxNy40NjYgNjUuMzI3LDE4LjY0NiBDNjUuMzM3LDE4LjY1NCA2NS4zNDUsMTguNjYzIDY1LjM1MSwxOC42NzQgTDY1LjU3OCwxOS4wODggQzY1LjU4NCwxOS4xIDY1LjU4OSwxOS4xMTIgNjUuNTkxLDE5LjEyNiBDNjUuOTg1LDE5LjgzOCA2Ni40NjksMjAuNDk3IDY3LjAzLDIxLjA4NSBMNjcuMzA1LDIxLjM1MSBDNjkuMTUxLDIzLjEzNyA3MS42NDksMjQuMTIgNzQuMzM2LDI0LjEyIEM3Ni4zMTMsMjQuMTIgNzguMjksMjMuNTgyIDgwLjA1MywyMi41NjMgQzgwLjA2NCwyMi41NTcgODAuMDc2LDIyLjU1MyA4MC4wODgsMjIuNTUgTDg3LjM3MiwxOC4zNDQgQzg4LjAzOCwxNy45NTkgODguNzg0LDE3Ljc1NiA4OS41MjksMTcuNzU2IEM5MC45NTYsMTcuNzU2IDkyLjIwMSwxOC40NzIgOTIuODU4LDE5LjY3IEw5Ni4xMDcsMjUuNTk5IEM5Ni4xMzgsMjUuNjU0IDk2LjExOCwyNS43MjQgOTYuMDYzLDI1Ljc1NiBMMTIuNTQ1LDczLjk4NSBDMTIuNTI2LDczLjk5NiAxMi41MDYsNzQuMDAxIDEyLjQ4Niw3NC4wMDEgTDEyLjQ4Niw3NC4wMDEgWiBNNjIuMDE2LDE2Ljk5NyBDNjEuMzEyLDE2Ljk5NyA2MC42MDYsMTcuMTkgNTkuOTc1LDE3LjU1NCBMMy45NjUsNDkuODk5IEMyLjA4Myw1MC45ODUgMS4zNDEsNTMuMzA4IDIuMzEsNTUuMDc4IEwxMi41MzEsNzMuNzIzIEw5NS44NDgsMjUuNjExIEw5Mi42NTMsMTkuNzgyIEM5Mi4wMzgsMTguNjYgOTAuODcsMTcuOTkgODkuNTI5LDE3Ljk5IEM4OC44MjUsMTcuOTkgODguMTE5LDE4LjE4MiA4Ny40ODksMTguNTQ3IEw4MC4xNzIsMjIuNzcyIEM4MC4xNjEsMjIuNzc4IDgwLjE0OSwyMi43ODIgODAuMTM3LDIyLjc4NSBDNzguMzQ2LDIzLjgxMSA3Ni4zNDEsMjQuMzU0IDc0LjMzNiwyNC4zNTQgQzcxLjU4OCwyNC4zNTQgNjkuMDMzLDIzLjM0NyA2Ny4xNDIsMjEuNTE5IEw2Ni44NjQsMjEuMjQ5IEM2Ni4yNzcsMjAuNjM0IDY1Ljc3NCwxOS45NDcgNjUuMzY3LDE5LjIwMyBDNjUuMzYsMTkuMTkyIDY1LjM1NiwxOS4xNzkgNjUuMzU0LDE5LjE2NiBMNjUuMTYzLDE4LjgxOSBDNjUuMTU0LDE4LjgxMSA2NS4xNDYsMTguODAxIDY1LjE0LDE4Ljc5IEM2NC41MjUsMTcuNjY3IDYzLjM1NywxNi45OTcgNjIuMDE2LDE2Ljk5NyBMNjIuMDE2LDE2Ljk5NyBaIiBpZD0iRmlsbC03IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTQyLjQzNCw0OC44MDggTDQyLjQzNCw0OC44MDggQzM5LjkyNCw0OC44MDcgMzcuNzM3LDQ3LjU1IDM2LjU4Miw0NS40NDMgQzM0Ljc3MSw0Mi4xMzkgMzYuMTQ0LDM3LjgwOSAzOS42NDEsMzUuNzg5IEw1MS45MzIsMjguNjkxIEM1My4xMDMsMjguMDE1IDU0LjQxMywyNy42NTggNTUuNzIxLDI3LjY1OCBDNTguMjMxLDI3LjY1OCA2MC40MTgsMjguOTE2IDYxLjU3MywzMS4wMjMgQzYzLjM4NCwzNC4zMjcgNjIuMDEyLDM4LjY1NyA1OC41MTQsNDAuNjc3IEw0Ni4yMjMsNDcuNzc1IEM0NS4wNTMsNDguNDUgNDMuNzQyLDQ4LjgwOCA0Mi40MzQsNDguODA4IEw0Mi40MzQsNDguODA4IFogTTU1LjcyMSwyOC4xMjUgQzU0LjQ5NSwyOC4xMjUgNTMuMjY1LDI4LjQ2MSA1Mi4xNjYsMjkuMDk2IEwzOS44NzUsMzYuMTk0IEMzNi41OTYsMzguMDg3IDM1LjMwMiw0Mi4xMzYgMzYuOTkyLDQ1LjIxOCBDMzguMDYzLDQ3LjE3MyA0MC4wOTgsNDguMzQgNDIuNDM0LDQ4LjM0IEM0My42NjEsNDguMzQgNDQuODksNDguMDA1IDQ1Ljk5LDQ3LjM3IEw1OC4yODEsNDAuMjcyIEM2MS41NiwzOC4zNzkgNjIuODUzLDM0LjMzIDYxLjE2NCwzMS4yNDggQzYwLjA5MiwyOS4yOTMgNTguMDU4LDI4LjEyNSA1NS43MjEsMjguMTI1IEw1NS43MjEsMjguMTI1IFoiIGlkPSJGaWxsLTgiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQ5LjU4OCwyLjQwNyBDMTQ5LjU4OCwyLjQwNyAxNTUuNzY4LDUuOTc1IDE1Ni4zMjUsNi4yOTcgTDE1Ni4zMjUsNy4xODQgQzE1Ni4zMjUsNy4zNiAxNTYuMzM4LDcuNTQ0IDE1Ni4zNjIsNy43MzMgQzE1Ni4zNzMsNy44MTQgMTU2LjM4Miw3Ljg5NCAxNTYuMzksNy45NzUgQzE1Ni41Myw5LjM5IDE1Ny4zNjMsMTAuOTczIDE1OC40OTUsMTEuOTc0IEwxNjUuODkxLDE4LjUxOSBDMTY2LjA2OCwxOC42NzUgMTY2LjI0OSwxOC44MTQgMTY2LjQzMiwxOC45MzQgQzE2OC4wMTEsMTkuOTc0IDE2OS4zODIsMTkuNCAxNjkuNDk0LDE3LjY1MiBDMTY5LjU0MywxNi44NjggMTY5LjU1MSwxNi4wNTcgMTY5LjUxNywxNS4yMjMgTDE2OS41MTQsMTUuMDYzIEwxNjkuNTE0LDEzLjkxMiBDMTcwLjc4LDE0LjY0MiAxOTUuNTAxLDI4LjkxNSAxOTUuNTAxLDI4LjkxNSBMMTk1LjUwMSw4Mi45MTUgQzE5NS41MDEsODQuMDA1IDE5NC43MzEsODQuNDQ1IDE5My43ODEsODMuODk3IEwxNTEuMzA4LDU5LjM3NCBDMTUwLjM1OCw1OC44MjYgMTQ5LjU4OCw1Ny40OTcgMTQ5LjU4OCw1Ni40MDggTDE0OS41ODgsMjIuMzc1IiBpZD0iRmlsbC05IiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5NC41NTMsODQuMjUgQzE5NC4yOTYsODQuMjUgMTk0LjAxMyw4NC4xNjUgMTkzLjcyMiw4My45OTcgTDE1MS4yNSw1OS40NzYgQzE1MC4yNjksNTguOTA5IDE0OS40NzEsNTcuNTMzIDE0OS40NzEsNTYuNDA4IEwxNDkuNDcxLDIyLjM3NSBMMTQ5LjcwNSwyMi4zNzUgTDE0OS43MDUsNTYuNDA4IEMxNDkuNzA1LDU3LjQ1OSAxNTAuNDUsNTguNzQ0IDE1MS4zNjYsNTkuMjc0IEwxOTMuODM5LDgzLjc5NSBDMTk0LjI2Myw4NC4wNCAxOTQuNjU1LDg0LjA4MyAxOTQuOTQyLDgzLjkxNyBDMTk1LjIyNyw4My43NTMgMTk1LjM4NCw4My4zOTcgMTk1LjM4NCw4Mi45MTUgTDE5NS4zODQsMjguOTgyIEMxOTQuMTAyLDI4LjI0MiAxNzIuMTA0LDE1LjU0MiAxNjkuNjMxLDE0LjExNCBMMTY5LjYzNCwxNS4yMiBDMTY5LjY2OCwxNi4wNTIgMTY5LjY2LDE2Ljg3NCAxNjkuNjEsMTcuNjU5IEMxNjkuNTU2LDE4LjUwMyAxNjkuMjE0LDE5LjEyMyAxNjguNjQ3LDE5LjQwNSBDMTY4LjAyOCwxOS43MTQgMTY3LjE5NywxOS41NzggMTY2LjM2NywxOS4wMzIgQzE2Ni4xODEsMTguOTA5IDE2NS45OTUsMTguNzY2IDE2NS44MTQsMTguNjA2IEwxNTguNDE3LDEyLjA2MiBDMTU3LjI1OSwxMS4wMzYgMTU2LjQxOCw5LjQzNyAxNTYuMjc0LDcuOTg2IEMxNTYuMjY2LDcuOTA3IDE1Ni4yNTcsNy44MjcgMTU2LjI0Nyw3Ljc0OCBDMTU2LjIyMSw3LjU1NSAxNTYuMjA5LDcuMzY1IDE1Ni4yMDksNy4xODQgTDE1Ni4yMDksNi4zNjQgQzE1NS4zNzUsNS44ODMgMTQ5LjUyOSwyLjUwOCAxNDkuNTI5LDIuNTA4IEwxNDkuNjQ2LDIuMzA2IEMxNDkuNjQ2LDIuMzA2IDE1NS44MjcsNS44NzQgMTU2LjM4NCw2LjE5NiBMMTU2LjQ0Miw2LjIzIEwxNTYuNDQyLDcuMTg0IEMxNTYuNDQyLDcuMzU1IDE1Ni40NTQsNy41MzUgMTU2LjQ3OCw3LjcxNyBDMTU2LjQ4OSw3LjggMTU2LjQ5OSw3Ljg4MiAxNTYuNTA3LDcuOTYzIEMxNTYuNjQ1LDkuMzU4IDE1Ny40NTUsMTAuODk4IDE1OC41NzIsMTEuODg2IEwxNjUuOTY5LDE4LjQzMSBDMTY2LjE0MiwxOC41ODQgMTY2LjMxOSwxOC43MiAxNjYuNDk2LDE4LjgzNyBDMTY3LjI1NCwxOS4zMzYgMTY4LDE5LjQ2NyAxNjguNTQzLDE5LjE5NiBDMTY5LjAzMywxOC45NTMgMTY5LjMyOSwxOC40MDEgMTY5LjM3NywxNy42NDUgQzE2OS40MjcsMTYuODY3IDE2OS40MzQsMTYuMDU0IDE2OS40MDEsMTUuMjI4IEwxNjkuMzk3LDE1LjA2NSBMMTY5LjM5NywxMy43MSBMMTY5LjU3MiwxMy44MSBDMTcwLjgzOSwxNC41NDEgMTk1LjU1OSwyOC44MTQgMTk1LjU1OSwyOC44MTQgTDE5NS42MTgsMjguODQ3IEwxOTUuNjE4LDgyLjkxNSBDMTk1LjYxOCw4My40ODQgMTk1LjQyLDgzLjkxMSAxOTUuMDU5LDg0LjExOSBDMTk0LjkwOCw4NC4yMDYgMTk0LjczNyw4NC4yNSAxOTQuNTUzLDg0LjI1IiBpZD0iRmlsbC0xMCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNDUuNjg1LDU2LjE2MSBMMTY5LjgsNzAuMDgzIEwxNDMuODIyLDg1LjA4MSBMMTQyLjM2LDg0Ljc3NCBDMTM1LjgyNiw4Mi42MDQgMTI4LjczMiw4MS4wNDYgMTIxLjM0MSw4MC4xNTggQzExNi45NzYsNzkuNjM0IDExMi42NzgsODEuMjU0IDExMS43NDMsODMuNzc4IEMxMTEuNTA2LDg0LjQxNCAxMTEuNTAzLDg1LjA3MSAxMTEuNzMyLDg1LjcwNiBDMTEzLjI3LDg5Ljk3MyAxMTUuOTY4LDk0LjA2OSAxMTkuNzI3LDk3Ljg0MSBMMTIwLjI1OSw5OC42ODYgQzEyMC4yNiw5OC42ODUgOTQuMjgyLDExMy42ODMgOTQuMjgyLDExMy42ODMgTDcwLjE2Nyw5OS43NjEgTDE0NS42ODUsNTYuMTYxIiBpZD0iRmlsbC0xMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05NC4yODIsMTEzLjgxOCBMOTQuMjIzLDExMy43ODUgTDY5LjkzMyw5OS43NjEgTDcwLjEwOCw5OS42NiBMMTQ1LjY4NSw1Ni4wMjYgTDE0NS43NDMsNTYuMDU5IEwxNzAuMDMzLDcwLjA4MyBMMTQzLjg0Miw4NS4yMDUgTDE0My43OTcsODUuMTk1IEMxNDMuNzcyLDg1LjE5IDE0Mi4zMzYsODQuODg4IDE0Mi4zMzYsODQuODg4IEMxMzUuNzg3LDgyLjcxNCAxMjguNzIzLDgxLjE2MyAxMjEuMzI3LDgwLjI3NCBDMTIwLjc4OCw4MC4yMDkgMTIwLjIzNiw4MC4xNzcgMTE5LjY4OSw4MC4xNzcgQzExNS45MzEsODAuMTc3IDExMi42MzUsODEuNzA4IDExMS44NTIsODMuODE5IEMxMTEuNjI0LDg0LjQzMiAxMTEuNjIxLDg1LjA1MyAxMTEuODQyLDg1LjY2NyBDMTEzLjM3Nyw4OS45MjUgMTE2LjA1OCw5My45OTMgMTE5LjgxLDk3Ljc1OCBMMTE5LjgyNiw5Ny43NzkgTDEyMC4zNTIsOTguNjE0IEMxMjAuMzU0LDk4LjYxNyAxMjAuMzU2LDk4LjYyIDEyMC4zNTgsOTguNjI0IEwxMjAuNDIyLDk4LjcyNiBMMTIwLjMxNyw5OC43ODcgQzEyMC4yNjQsOTguODE4IDk0LjU5OSwxMTMuNjM1IDk0LjM0LDExMy43ODUgTDk0LjI4MiwxMTMuODE4IEw5NC4yODIsMTEzLjgxOCBaIE03MC40MDEsOTkuNzYxIEw5NC4yODIsMTEzLjU0OSBMMTE5LjA4NCw5OS4yMjkgQzExOS42Myw5OC45MTQgMTE5LjkzLDk4Ljc0IDEyMC4xMDEsOTguNjU0IEwxMTkuNjM1LDk3LjkxNCBDMTE1Ljg2NCw5NC4xMjcgMTEzLjE2OCw5MC4wMzMgMTExLjYyMiw4NS43NDYgQzExMS4zODIsODUuMDc5IDExMS4zODYsODQuNDA0IDExMS42MzMsODMuNzM4IEMxMTIuNDQ4LDgxLjUzOSAxMTUuODM2LDc5Ljk0MyAxMTkuNjg5LDc5Ljk0MyBDMTIwLjI0Niw3OS45NDMgMTIwLjgwNiw3OS45NzYgMTIxLjM1NSw4MC4wNDIgQzEyOC43NjcsODAuOTMzIDEzNS44NDYsODIuNDg3IDE0Mi4zOTYsODQuNjYzIEMxNDMuMjMyLDg0LjgzOCAxNDMuNjExLDg0LjkxNyAxNDMuNzg2LDg0Ljk2NyBMMTY5LjU2Niw3MC4wODMgTDE0NS42ODUsNTYuMjk1IEw3MC40MDEsOTkuNzYxIEw3MC40MDEsOTkuNzYxIFoiIGlkPSJGaWxsLTEyIiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2Ny4yMywxOC45NzkgTDE2Ny4yMyw2OS44NSBMMTM5LjkwOSw4NS42MjMgTDEzMy40NDgsNzEuNDU2IEMxMzIuNTM4LDY5LjQ2IDEzMC4wMiw2OS43MTggMTI3LjgyNCw3Mi4wMyBDMTI2Ljc2OSw3My4xNCAxMjUuOTMxLDc0LjU4NSAxMjUuNDk0LDc2LjA0OCBMMTE5LjAzNCw5Ny42NzYgTDkxLjcxMiwxMTMuNDUgTDkxLjcxMiw2Mi41NzkgTDE2Ny4yMywxOC45NzkiIGlkPSJGaWxsLTEzIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTkxLjcxMiwxMTMuNTY3IEM5MS42OTIsMTEzLjU2NyA5MS42NzIsMTEzLjU2MSA5MS42NTMsMTEzLjU1MSBDOTEuNjE4LDExMy41MyA5MS41OTUsMTEzLjQ5MiA5MS41OTUsMTEzLjQ1IEw5MS41OTUsNjIuNTc5IEM5MS41OTUsNjIuNTM3IDkxLjYxOCw2Mi40OTkgOTEuNjUzLDYyLjQ3OCBMMTY3LjE3MiwxOC44NzggQzE2Ny4yMDgsMTguODU3IDE2Ny4yNTIsMTguODU3IDE2Ny4yODgsMTguODc4IEMxNjcuMzI0LDE4Ljg5OSAxNjcuMzQ3LDE4LjkzNyAxNjcuMzQ3LDE4Ljk3OSBMMTY3LjM0Nyw2OS44NSBDMTY3LjM0Nyw2OS44OTEgMTY3LjMyNCw2OS45MyAxNjcuMjg4LDY5Ljk1IEwxMzkuOTY3LDg1LjcyNSBDMTM5LjkzOSw4NS43NDEgMTM5LjkwNSw4NS43NDUgMTM5Ljg3Myw4NS43MzUgQzEzOS44NDIsODUuNzI1IDEzOS44MTYsODUuNzAyIDEzOS44MDIsODUuNjcyIEwxMzMuMzQyLDcxLjUwNCBDMTMyLjk2Nyw3MC42ODIgMTMyLjI4LDcwLjIyOSAxMzEuNDA4LDcwLjIyOSBDMTMwLjMxOSw3MC4yMjkgMTI5LjA0NCw3MC45MTUgMTI3LjkwOCw3Mi4xMSBDMTI2Ljg3NCw3My4yIDEyNi4wMzQsNzQuNjQ3IDEyNS42MDYsNzYuMDgyIEwxMTkuMTQ2LDk3LjcwOSBDMTE5LjEzNyw5Ny43MzggMTE5LjExOCw5Ny43NjIgMTE5LjA5Miw5Ny43NzcgTDkxLjc3LDExMy41NTEgQzkxLjc1MiwxMTMuNTYxIDkxLjczMiwxMTMuNTY3IDkxLjcxMiwxMTMuNTY3IEw5MS43MTIsMTEzLjU2NyBaIE05MS44MjksNjIuNjQ3IEw5MS44MjksMTEzLjI0OCBMMTE4LjkzNSw5Ny41OTggTDEyNS4zODIsNzYuMDE1IEMxMjUuODI3LDc0LjUyNSAxMjYuNjY0LDczLjA4MSAxMjcuNzM5LDcxLjk1IEMxMjguOTE5LDcwLjcwOCAxMzAuMjU2LDY5Ljk5NiAxMzEuNDA4LDY5Ljk5NiBDMTMyLjM3Nyw2OS45OTYgMTMzLjEzOSw3MC40OTcgMTMzLjU1NCw3MS40MDcgTDEzOS45NjEsODUuNDU4IEwxNjcuMTEzLDY5Ljc4MiBMMTY3LjExMywxOS4xODEgTDkxLjgyOSw2Mi42NDcgTDkxLjgyOSw2Mi42NDcgWiIgaWQ9IkZpbGwtMTQiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTY4LjU0MywxOS4yMTMgTDE2OC41NDMsNzAuMDgzIEwxNDEuMjIxLDg1Ljg1NyBMMTM0Ljc2MSw3MS42ODkgQzEzMy44NTEsNjkuNjk0IDEzMS4zMzMsNjkuOTUxIDEyOS4xMzcsNzIuMjYzIEMxMjguMDgyLDczLjM3NCAxMjcuMjQ0LDc0LjgxOSAxMjYuODA3LDc2LjI4MiBMMTIwLjM0Niw5Ny45MDkgTDkzLjAyNSwxMTMuNjgzIEw5My4wMjUsNjIuODEzIEwxNjguNTQzLDE5LjIxMyIgaWQ9IkZpbGwtMTUiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTMuMDI1LDExMy44IEM5My4wMDUsMTEzLjggOTIuOTg0LDExMy43OTUgOTIuOTY2LDExMy43ODUgQzkyLjkzMSwxMTMuNzY0IDkyLjkwOCwxMTMuNzI1IDkyLjkwOCwxMTMuNjg0IEw5Mi45MDgsNjIuODEzIEM5Mi45MDgsNjIuNzcxIDkyLjkzMSw2Mi43MzMgOTIuOTY2LDYyLjcxMiBMMTY4LjQ4NCwxOS4xMTIgQzE2OC41MiwxOS4wOSAxNjguNTY1LDE5LjA5IDE2OC42MDEsMTkuMTEyIEMxNjguNjM3LDE5LjEzMiAxNjguNjYsMTkuMTcxIDE2OC42NiwxOS4yMTIgTDE2OC42Niw3MC4wODMgQzE2OC42Niw3MC4xMjUgMTY4LjYzNyw3MC4xNjQgMTY4LjYwMSw3MC4xODQgTDE0MS4yOCw4NS45NTggQzE0MS4yNTEsODUuOTc1IDE0MS4yMTcsODUuOTc5IDE0MS4xODYsODUuOTY4IEMxNDEuMTU0LDg1Ljk1OCAxNDEuMTI5LDg1LjkzNiAxNDEuMTE1LDg1LjkwNiBMMTM0LjY1NSw3MS43MzggQzEzNC4yOCw3MC45MTUgMTMzLjU5Myw3MC40NjMgMTMyLjcyLDcwLjQ2MyBDMTMxLjYzMiw3MC40NjMgMTMwLjM1Nyw3MS4xNDggMTI5LjIyMSw3Mi4zNDQgQzEyOC4xODYsNzMuNDMzIDEyNy4zNDcsNzQuODgxIDEyNi45MTksNzYuMzE1IEwxMjAuNDU4LDk3Ljk0MyBDMTIwLjQ1LDk3Ljk3MiAxMjAuNDMxLDk3Ljk5NiAxMjAuNDA1LDk4LjAxIEw5My4wODMsMTEzLjc4NSBDOTMuMDY1LDExMy43OTUgOTMuMDQ1LDExMy44IDkzLjAyNSwxMTMuOCBMOTMuMDI1LDExMy44IFogTTkzLjE0Miw2Mi44ODEgTDkzLjE0MiwxMTMuNDgxIEwxMjAuMjQ4LDk3LjgzMiBMMTI2LjY5NSw3Ni4yNDggQzEyNy4xNCw3NC43NTggMTI3Ljk3Nyw3My4zMTUgMTI5LjA1Miw3Mi4xODMgQzEzMC4yMzEsNzAuOTQyIDEzMS41NjgsNzAuMjI5IDEzMi43Miw3MC4yMjkgQzEzMy42ODksNzAuMjI5IDEzNC40NTIsNzAuNzMxIDEzNC44NjcsNzEuNjQxIEwxNDEuMjc0LDg1LjY5MiBMMTY4LjQyNiw3MC4wMTYgTDE2OC40MjYsMTkuNDE1IEw5My4xNDIsNjIuODgxIEw5My4xNDIsNjIuODgxIFoiIGlkPSJGaWxsLTE2IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2OS44LDcwLjA4MyBMMTQyLjQ3OCw4NS44NTcgTDEzNi4wMTgsNzEuNjg5IEMxMzUuMTA4LDY5LjY5NCAxMzIuNTksNjkuOTUxIDEzMC4zOTMsNzIuMjYzIEMxMjkuMzM5LDczLjM3NCAxMjguNSw3NC44MTkgMTI4LjA2NCw3Ni4yODIgTDEyMS42MDMsOTcuOTA5IEw5NC4yODIsMTEzLjY4MyBMOTQuMjgyLDYyLjgxMyBMMTY5LjgsMTkuMjEzIEwxNjkuOCw3MC4wODMgWiIgaWQ9IkZpbGwtMTciIGZpbGw9IiNGQUZBRkEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTQuMjgyLDExMy45MTcgQzk0LjI0MSwxMTMuOTE3IDk0LjIwMSwxMTMuOTA3IDk0LjE2NSwxMTMuODg2IEM5NC4wOTMsMTEzLjg0NSA5NC4wNDgsMTEzLjc2NyA5NC4wNDgsMTEzLjY4NCBMOTQuMDQ4LDYyLjgxMyBDOTQuMDQ4LDYyLjczIDk0LjA5Myw2Mi42NTIgOTQuMTY1LDYyLjYxMSBMMTY5LjY4MywxOS4wMSBDMTY5Ljc1NSwxOC45NjkgMTY5Ljg0NCwxOC45NjkgMTY5LjkxNywxOS4wMSBDMTY5Ljk4OSwxOS4wNTIgMTcwLjAzMywxOS4xMjkgMTcwLjAzMywxOS4yMTIgTDE3MC4wMzMsNzAuMDgzIEMxNzAuMDMzLDcwLjE2NiAxNjkuOTg5LDcwLjI0NCAxNjkuOTE3LDcwLjI4NSBMMTQyLjU5NSw4Ni4wNiBDMTQyLjUzOCw4Ni4wOTIgMTQyLjQ2OSw4Ni4xIDE0Mi40MDcsODYuMDggQzE0Mi4zNDQsODYuMDYgMTQyLjI5Myw4Ni4wMTQgMTQyLjI2Niw4NS45NTQgTDEzNS44MDUsNzEuNzg2IEMxMzUuNDQ1LDcwLjk5NyAxMzQuODEzLDcwLjU4IDEzMy45NzcsNzAuNTggQzEzMi45MjEsNzAuNTggMTMxLjY3Niw3MS4yNTIgMTMwLjU2Miw3Mi40MjQgQzEyOS41NCw3My41MDEgMTI4LjcxMSw3NC45MzEgMTI4LjI4Nyw3Ni4zNDggTDEyMS44MjcsOTcuOTc2IEMxMjEuODEsOTguMDM0IDEyMS43NzEsOTguMDgyIDEyMS43Miw5OC4xMTIgTDk0LjM5OCwxMTMuODg2IEM5NC4zNjIsMTEzLjkwNyA5NC4zMjIsMTEzLjkxNyA5NC4yODIsMTEzLjkxNyBMOTQuMjgyLDExMy45MTcgWiBNOTQuNTE1LDYyLjk0OCBMOTQuNTE1LDExMy4yNzkgTDEyMS40MDYsOTcuNzU0IEwxMjcuODQsNzYuMjE1IEMxMjguMjksNzQuNzA4IDEyOS4xMzcsNzMuMjQ3IDEzMC4yMjQsNzIuMTAzIEMxMzEuNDI1LDcwLjgzOCAxMzIuNzkzLDcwLjExMiAxMzMuOTc3LDcwLjExMiBDMTM0Ljk5NSw3MC4xMTIgMTM1Ljc5NSw3MC42MzggMTM2LjIzLDcxLjU5MiBMMTQyLjU4NCw4NS41MjYgTDE2OS41NjYsNjkuOTQ4IEwxNjkuNTY2LDE5LjYxNyBMOTQuNTE1LDYyLjk0OCBMOTQuNTE1LDYyLjk0OCBaIiBpZD0iRmlsbC0xOCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMDkuODk0LDkyLjk0MyBMMTA5Ljg5NCw5Mi45NDMgQzEwOC4xMiw5Mi45NDMgMTA2LjY1Myw5Mi4yMTggMTA1LjY1LDkwLjgyMyBDMTA1LjU4Myw5MC43MzEgMTA1LjU5Myw5MC42MSAxMDUuNjczLDkwLjUyOSBDMTA1Ljc1Myw5MC40NDggMTA1Ljg4LDkwLjQ0IDEwNS45NzQsOTAuNTA2IEMxMDYuNzU0LDkxLjA1MyAxMDcuNjc5LDkxLjMzMyAxMDguNzI0LDkxLjMzMyBDMTEwLjA0Nyw5MS4zMzMgMTExLjQ3OCw5MC44OTQgMTEyLjk4LDkwLjAyNyBDMTE4LjI5MSw4Ni45NiAxMjIuNjExLDc5LjUwOSAxMjIuNjExLDczLjQxNiBDMTIyLjYxMSw3MS40ODkgMTIyLjE2OSw2OS44NTYgMTIxLjMzMyw2OC42OTIgQzEyMS4yNjYsNjguNiAxMjEuMjc2LDY4LjQ3MyAxMjEuMzU2LDY4LjM5MiBDMTIxLjQzNiw2OC4zMTEgMTIxLjU2Myw2OC4yOTkgMTIxLjY1Niw2OC4zNjUgQzEyMy4zMjcsNjkuNTM3IDEyNC4yNDcsNzEuNzQ2IDEyNC4yNDcsNzQuNTg0IEMxMjQuMjQ3LDgwLjgyNiAxMTkuODIxLDg4LjQ0NyAxMTQuMzgyLDkxLjU4NyBDMTEyLjgwOCw5Mi40OTUgMTExLjI5OCw5Mi45NDMgMTA5Ljg5NCw5Mi45NDMgTDEwOS44OTQsOTIuOTQzIFogTTEwNi45MjUsOTEuNDAxIEMxMDcuNzM4LDkyLjA1MiAxMDguNzQ1LDkyLjI3OCAxMDkuODkzLDkyLjI3OCBMMTA5Ljg5NCw5Mi4yNzggQzExMS4yMTUsOTIuMjc4IDExMi42NDcsOTEuOTUxIDExNC4xNDgsOTEuMDg0IEMxMTkuNDU5LDg4LjAxNyAxMjMuNzgsODAuNjIxIDEyMy43OCw3NC41MjggQzEyMy43OCw3Mi41NDkgMTIzLjMxNyw3MC45MjkgMTIyLjQ1NCw2OS43NjcgQzEyMi44NjUsNzAuODAyIDEyMy4wNzksNzIuMDQyIDEyMy4wNzksNzMuNDAyIEMxMjMuMDc5LDc5LjY0NSAxMTguNjUzLDg3LjI4NSAxMTMuMjE0LDkwLjQyNSBDMTExLjY0LDkxLjMzNCAxMTAuMTMsOTEuNzQyIDEwOC43MjQsOTEuNzQyIEMxMDguMDgzLDkxLjc0MiAxMDcuNDgxLDkxLjU5MyAxMDYuOTI1LDkxLjQwMSBMMTA2LjkyNSw5MS40MDEgWiIgaWQ9IkZpbGwtMTkiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEzLjA5Nyw5MC4yMyBDMTE4LjQ4MSw4Ny4xMjIgMTIyLjg0NSw3OS41OTQgMTIyLjg0NSw3My40MTYgQzEyMi44NDUsNzEuMzY1IDEyMi4zNjIsNjkuNzI0IDEyMS41MjIsNjguNTU2IEMxMTkuNzM4LDY3LjMwNCAxMTcuMTQ4LDY3LjM2MiAxMTQuMjY1LDY5LjAyNiBDMTA4Ljg4MSw3Mi4xMzQgMTA0LjUxNyw3OS42NjIgMTA0LjUxNyw4NS44NCBDMTA0LjUxNyw4Ny44OTEgMTA1LDg5LjUzMiAxMDUuODQsOTAuNyBDMTA3LjYyNCw5MS45NTIgMTEwLjIxNCw5MS44OTQgMTEzLjA5Nyw5MC4yMyIgaWQ9IkZpbGwtMjAiIGZpbGw9IiNGQUZBRkEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTA4LjcyNCw5MS42MTQgTDEwOC43MjQsOTEuNjE0IEMxMDcuNTgyLDkxLjYxNCAxMDYuNTY2LDkxLjQwMSAxMDUuNzA1LDkwLjc5NyBDMTA1LjY4NCw5MC43ODMgMTA1LjY2NSw5MC44MTEgMTA1LjY1LDkwLjc5IEMxMDQuNzU2LDg5LjU0NiAxMDQuMjgzLDg3Ljg0MiAxMDQuMjgzLDg1LjgxNyBDMTA0LjI4Myw3OS41NzUgMTA4LjcwOSw3MS45NTMgMTE0LjE0OCw2OC44MTIgQzExNS43MjIsNjcuOTA0IDExNy4yMzIsNjcuNDQ5IDExOC42MzgsNjcuNDQ5IEMxMTkuNzgsNjcuNDQ5IDEyMC43OTYsNjcuNzU4IDEyMS42NTYsNjguMzYyIEMxMjEuNjc4LDY4LjM3NyAxMjEuNjk3LDY4LjM5NyAxMjEuNzEyLDY4LjQxOCBDMTIyLjYwNiw2OS42NjIgMTIzLjA3OSw3MS4zOSAxMjMuMDc5LDczLjQxNSBDMTIzLjA3OSw3OS42NTggMTE4LjY1Myw4Ny4xOTggMTEzLjIxNCw5MC4zMzggQzExMS42NCw5MS4yNDcgMTEwLjEzLDkxLjYxNCAxMDguNzI0LDkxLjYxNCBMMTA4LjcyNCw5MS42MTQgWiBNMTA2LjAwNiw5MC41MDUgQzEwNi43OCw5MS4wMzcgMTA3LjY5NCw5MS4yODEgMTA4LjcyNCw5MS4yODEgQzExMC4wNDcsOTEuMjgxIDExMS40NzgsOTAuODY4IDExMi45OCw5MC4wMDEgQzExOC4yOTEsODYuOTM1IDEyMi42MTEsNzkuNDk2IDEyMi42MTEsNzMuNDAzIEMxMjIuNjExLDcxLjQ5NCAxMjIuMTc3LDY5Ljg4IDEyMS4zNTYsNjguNzE4IEMxMjAuNTgyLDY4LjE4NSAxMTkuNjY4LDY3LjkxOSAxMTguNjM4LDY3LjkxOSBDMTE3LjMxNSw2Ny45MTkgMTE1Ljg4Myw2OC4zNiAxMTQuMzgyLDY5LjIyNyBDMTA5LjA3MSw3Mi4yOTMgMTA0Ljc1MSw3OS43MzMgMTA0Ljc1MSw4NS44MjYgQzEwNC43NTEsODcuNzM1IDEwNS4xODUsODkuMzQzIDEwNi4wMDYsOTAuNTA1IEwxMDYuMDA2LDkwLjUwNSBaIiBpZD0iRmlsbC0yMSIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNDkuMzE4LDcuMjYyIEwxMzkuMzM0LDE2LjE0IEwxNTUuMjI3LDI3LjE3MSBMMTYwLjgxNiwyMS4wNTkgTDE0OS4zMTgsNy4yNjIiIGlkPSJGaWxsLTIyIiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2OS42NzYsMTMuODQgTDE1OS45MjgsMTkuNDY3IEMxNTYuMjg2LDIxLjU3IDE1MC40LDIxLjU4IDE0Ni43ODEsMTkuNDkxIEMxNDMuMTYxLDE3LjQwMiAxNDMuMTgsMTQuMDAzIDE0Ni44MjIsMTEuOSBMMTU2LjMxNyw2LjI5MiBMMTQ5LjU4OCwyLjQwNyBMNjcuNzUyLDQ5LjQ3OCBMMTEzLjY3NSw3NS45OTIgTDExNi43NTYsNzQuMjEzIEMxMTcuMzg3LDczLjg0OCAxMTcuNjI1LDczLjMxNSAxMTcuMzc0LDcyLjgyMyBDMTE1LjAxNyw2OC4xOTEgMTE0Ljc4MSw2My4yNzcgMTE2LjY5MSw1OC41NjEgQzEyMi4zMjksNDQuNjQxIDE0MS4yLDMzLjc0NiAxNjUuMzA5LDMwLjQ5MSBDMTczLjQ3OCwyOS4zODggMTgxLjk4OSwyOS41MjQgMTkwLjAxMywzMC44ODUgQzE5MC44NjUsMzEuMDMgMTkxLjc4OSwzMC44OTMgMTkyLjQyLDMwLjUyOCBMMTk1LjUwMSwyOC43NSBMMTY5LjY3NiwxMy44NCIgaWQ9IkZpbGwtMjMiIGZpbGw9IiNGQUZBRkEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEzLjY3NSw3Ni40NTkgQzExMy41OTQsNzYuNDU5IDExMy41MTQsNzYuNDM4IDExMy40NDIsNzYuMzk3IEw2Ny41MTgsNDkuODgyIEM2Ny4zNzQsNDkuNzk5IDY3LjI4NCw0OS42NDUgNjcuMjg1LDQ5LjQ3OCBDNjcuMjg1LDQ5LjMxMSA2Ny4zNzQsNDkuMTU3IDY3LjUxOSw0OS4wNzMgTDE0OS4zNTUsMi4wMDIgQzE0OS40OTksMS45MTkgMTQ5LjY3NywxLjkxOSAxNDkuODIxLDIuMDAyIEwxNTYuNTUsNS44ODcgQzE1Ni43NzQsNi4wMTcgMTU2Ljg1LDYuMzAyIDE1Ni43MjIsNi41MjYgQzE1Ni41OTIsNi43NDkgMTU2LjMwNyw2LjgyNiAxNTYuMDgzLDYuNjk2IEwxNDkuNTg3LDIuOTQ2IEw2OC42ODcsNDkuNDc5IEwxMTMuNjc1LDc1LjQ1MiBMMTE2LjUyMyw3My44MDggQzExNi43MTUsNzMuNjk3IDExNy4xNDMsNzMuMzk5IDExNi45NTgsNzMuMDM1IEMxMTQuNTQyLDY4LjI4NyAxMTQuMyw2My4yMjEgMTE2LjI1OCw1OC4zODUgQzExOS4wNjQsNTEuNDU4IDEyNS4xNDMsNDUuMTQzIDEzMy44NCw0MC4xMjIgQzE0Mi40OTcsMzUuMTI0IDE1My4zNTgsMzEuNjMzIDE2NS4yNDcsMzAuMDI4IEMxNzMuNDQ1LDI4LjkyMSAxODIuMDM3LDI5LjA1OCAxOTAuMDkxLDMwLjQyNSBDMTkwLjgzLDMwLjU1IDE5MS42NTIsMzAuNDMyIDE5Mi4xODYsMzAuMTI0IEwxOTQuNTY3LDI4Ljc1IEwxNjkuNDQyLDE0LjI0NCBDMTY5LjIxOSwxNC4xMTUgMTY5LjE0MiwxMy44MjkgMTY5LjI3MSwxMy42MDYgQzE2OS40LDEzLjM4MiAxNjkuNjg1LDEzLjMwNiAxNjkuOTA5LDEzLjQzNSBMMTk1LjczNCwyOC4zNDUgQzE5NS44NzksMjguNDI4IDE5NS45NjgsMjguNTgzIDE5NS45NjgsMjguNzUgQzE5NS45NjgsMjguOTE2IDE5NS44NzksMjkuMDcxIDE5NS43MzQsMjkuMTU0IEwxOTIuNjUzLDMwLjkzMyBDMTkxLjkzMiwzMS4zNSAxOTAuODksMzEuNTA4IDE4OS45MzUsMzEuMzQ2IEMxODEuOTcyLDI5Ljk5NSAxNzMuNDc4LDI5Ljg2IDE2NS4zNzIsMzAuOTU0IEMxNTMuNjAyLDMyLjU0MyAxNDIuODYsMzUuOTkzIDEzNC4zMDcsNDAuOTMxIEMxMjUuNzkzLDQ1Ljg0NyAxMTkuODUxLDUyLjAwNCAxMTcuMTI0LDU4LjczNiBDMTE1LjI3LDYzLjMxNCAxMTUuNTAxLDY4LjExMiAxMTcuNzksNzIuNjExIEMxMTguMTYsNzMuMzM2IDExNy44NDUsNzQuMTI0IDExNi45OSw3NC42MTcgTDExMy45MDksNzYuMzk3IEMxMTMuODM2LDc2LjQzOCAxMTMuNzU2LDc2LjQ1OSAxMTMuNjc1LDc2LjQ1OSIgaWQ9IkZpbGwtMjQiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUzLjMxNiwyMS4yNzkgQzE1MC45MDMsMjEuMjc5IDE0OC40OTUsMjAuNzUxIDE0Ni42NjQsMTkuNjkzIEMxNDQuODQ2LDE4LjY0NCAxNDMuODQ0LDE3LjIzMiAxNDMuODQ0LDE1LjcxOCBDMTQzLjg0NCwxNC4xOTEgMTQ0Ljg2LDEyLjc2MyAxNDYuNzA1LDExLjY5OCBMMTU2LjE5OCw2LjA5MSBDMTU2LjMwOSw2LjAyNSAxNTYuNDUyLDYuMDYyIDE1Ni41MTgsNi4xNzMgQzE1Ni41ODMsNi4yODQgMTU2LjU0Nyw2LjQyNyAxNTYuNDM2LDYuNDkzIEwxNDYuOTQsMTIuMTAyIEMxNDUuMjQ0LDEzLjA4MSAxNDQuMzEyLDE0LjM2NSAxNDQuMzEyLDE1LjcxOCBDMTQ0LjMxMiwxNy4wNTggMTQ1LjIzLDE4LjMyNiAxNDYuODk3LDE5LjI4OSBDMTUwLjQ0NiwyMS4zMzggMTU2LjI0LDIxLjMyNyAxNTkuODExLDE5LjI2NSBMMTY5LjU1OSwxMy42MzcgQzE2OS42NywxMy41NzMgMTY5LjgxMywxMy42MTEgMTY5Ljg3OCwxMy43MjMgQzE2OS45NDMsMTMuODM0IDE2OS45MDQsMTMuOTc3IDE2OS43OTMsMTQuMDQyIEwxNjAuMDQ1LDE5LjY3IEMxNTguMTg3LDIwLjc0MiAxNTUuNzQ5LDIxLjI3OSAxNTMuMzE2LDIxLjI3OSIgaWQ9IkZpbGwtMjUiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEzLjY3NSw3NS45OTIgTDY3Ljc2Miw0OS40ODQiIGlkPSJGaWxsLTI2IiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExMy42NzUsNzYuMzQyIEMxMTMuNjE1LDc2LjM0MiAxMTMuNTU1LDc2LjMyNyAxMTMuNSw3Ni4yOTUgTDY3LjU4Nyw0OS43ODcgQzY3LjQxOSw0OS42OSA2Ny4zNjIsNDkuNDc2IDY3LjQ1OSw0OS4zMDkgQzY3LjU1Niw0OS4xNDEgNjcuNzcsNDkuMDgzIDY3LjkzNyw0OS4xOCBMMTEzLjg1LDc1LjY4OCBDMTE0LjAxOCw3NS43ODUgMTE0LjA3NSw3NiAxMTMuOTc4LDc2LjE2NyBDMTEzLjkxNCw3Ni4yNzkgMTEzLjc5Niw3Ni4zNDIgMTEzLjY3NSw3Ni4zNDIiIGlkPSJGaWxsLTI3IiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTY3Ljc2Miw0OS40ODQgTDY3Ljc2MiwxMDMuNDg1IEM2Ny43NjIsMTA0LjU3NSA2OC41MzIsMTA1LjkwMyA2OS40ODIsMTA2LjQ1MiBMMTExLjk1NSwxMzAuOTczIEMxMTIuOTA1LDEzMS41MjIgMTEzLjY3NSwxMzEuMDgzIDExMy42NzUsMTI5Ljk5MyBMMTEzLjY3NSw3NS45OTIiIGlkPSJGaWxsLTI4IiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExMi43MjcsMTMxLjU2MSBDMTEyLjQzLDEzMS41NjEgMTEyLjEwNywxMzEuNDY2IDExMS43OCwxMzEuMjc2IEw2OS4zMDcsMTA2Ljc1NSBDNjguMjQ0LDEwNi4xNDIgNjcuNDEyLDEwNC43MDUgNjcuNDEyLDEwMy40ODUgTDY3LjQxMiw0OS40ODQgQzY3LjQxMiw0OS4yOSA2Ny41NjksNDkuMTM0IDY3Ljc2Miw0OS4xMzQgQzY3Ljk1Niw0OS4xMzQgNjguMTEzLDQ5LjI5IDY4LjExMyw0OS40ODQgTDY4LjExMywxMDMuNDg1IEM2OC4xMTMsMTA0LjQ0NSA2OC44MiwxMDUuNjY1IDY5LjY1NywxMDYuMTQ4IEwxMTIuMTMsMTMwLjY3IEMxMTIuNDc0LDEzMC44NjggMTEyLjc5MSwxMzAuOTEzIDExMywxMzAuNzkyIEMxMTMuMjA2LDEzMC42NzMgMTEzLjMyNSwxMzAuMzgxIDExMy4zMjUsMTI5Ljk5MyBMMTEzLjMyNSw3NS45OTIgQzExMy4zMjUsNzUuNzk4IDExMy40ODIsNzUuNjQxIDExMy42NzUsNzUuNjQxIEMxMTMuODY5LDc1LjY0MSAxMTQuMDI1LDc1Ljc5OCAxMTQuMDI1LDc1Ljk5MiBMMTE0LjAyNSwxMjkuOTkzIEMxMTQuMDI1LDEzMC42NDggMTEzLjc4NiwxMzEuMTQ3IDExMy4zNSwxMzEuMzk5IEMxMTMuMTYyLDEzMS41MDcgMTEyLjk1MiwxMzEuNTYxIDExMi43MjcsMTMxLjU2MSIgaWQ9IkZpbGwtMjkiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEyLjg2LDQwLjUxMiBDMTEyLjg2LDQwLjUxMiAxMTIuODYsNDAuNTEyIDExMi44NTksNDAuNTEyIEMxMTAuNTQxLDQwLjUxMiAxMDguMzYsMzkuOTkgMTA2LjcxNywzOS4wNDEgQzEwNS4wMTIsMzguMDU3IDEwNC4wNzQsMzYuNzI2IDEwNC4wNzQsMzUuMjkyIEMxMDQuMDc0LDMzLjg0NyAxMDUuMDI2LDMyLjUwMSAxMDYuNzU0LDMxLjUwNCBMMTE4Ljc5NSwyNC41NTEgQzEyMC40NjMsMjMuNTg5IDEyMi42NjksMjMuMDU4IDEyNS4wMDcsMjMuMDU4IEMxMjcuMzI1LDIzLjA1OCAxMjkuNTA2LDIzLjU4MSAxMzEuMTUsMjQuNTMgQzEzMi44NTQsMjUuNTE0IDEzMy43OTMsMjYuODQ1IDEzMy43OTMsMjguMjc4IEMxMzMuNzkzLDI5LjcyNCAxMzIuODQxLDMxLjA2OSAxMzEuMTEzLDMyLjA2NyBMMTE5LjA3MSwzOS4wMTkgQzExNy40MDMsMzkuOTgyIDExNS4xOTcsNDAuNTEyIDExMi44Niw0MC41MTIgTDExMi44Niw0MC41MTIgWiBNMTI1LjAwNywyMy43NTkgQzEyMi43OSwyMy43NTkgMTIwLjcwOSwyNC4yNTYgMTE5LjE0NiwyNS4xNTggTDEwNy4xMDQsMzIuMTEgQzEwNS42MDIsMzIuOTc4IDEwNC43NzQsMzQuMTA4IDEwNC43NzQsMzUuMjkyIEMxMDQuNzc0LDM2LjQ2NSAxMDUuNTg5LDM3LjU4MSAxMDcuMDY3LDM4LjQzNCBDMTA4LjYwNSwzOS4zMjMgMTEwLjY2MywzOS44MTIgMTEyLjg1OSwzOS44MTIgTDExMi44NiwzOS44MTIgQzExNS4wNzYsMzkuODEyIDExNy4xNTgsMzkuMzE1IDExOC43MjEsMzguNDEzIEwxMzAuNzYyLDMxLjQ2IEMxMzIuMjY0LDMwLjU5MyAxMzMuMDkyLDI5LjQ2MyAxMzMuMDkyLDI4LjI3OCBDMTMzLjA5MiwyNy4xMDYgMTMyLjI3OCwyNS45OSAxMzAuOCwyNS4xMzYgQzEyOS4yNjEsMjQuMjQ4IDEyNy4yMDQsMjMuNzU5IDEyNS4wMDcsMjMuNzU5IEwxMjUuMDA3LDIzLjc1OSBaIiBpZD0iRmlsbC0zMCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNjUuNjMsMTYuMjE5IEwxNTkuODk2LDE5LjUzIEMxNTYuNzI5LDIxLjM1OCAxNTEuNjEsMjEuMzY3IDE0OC40NjMsMTkuNTUgQzE0NS4zMTYsMTcuNzMzIDE0NS4zMzIsMTQuNzc4IDE0OC40OTksMTIuOTQ5IEwxNTQuMjMzLDkuNjM5IEwxNjUuNjMsMTYuMjE5IiBpZD0iRmlsbC0zMSIgZmlsbD0iI0ZBRkFGQSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTQuMjMzLDEwLjQ0OCBMMTY0LjIyOCwxNi4yMTkgTDE1OS41NDYsMTguOTIzIEMxNTguMTEyLDE5Ljc1IDE1Ni4xOTQsMjAuMjA2IDE1NC4xNDcsMjAuMjA2IEMxNTIuMTE4LDIwLjIwNiAxNTAuMjI0LDE5Ljc1NyAxNDguODE0LDE4Ljk0MyBDMTQ3LjUyNCwxOC4xOTkgMTQ2LjgxNCwxNy4yNDkgMTQ2LjgxNCwxNi4yNjkgQzE0Ni44MTQsMTUuMjc4IDE0Ny41MzcsMTQuMzE0IDE0OC44NSwxMy41NTYgTDE1NC4yMzMsMTAuNDQ4IE0xNTQuMjMzLDkuNjM5IEwxNDguNDk5LDEyLjk0OSBDMTQ1LjMzMiwxNC43NzggMTQ1LjMxNiwxNy43MzMgMTQ4LjQ2MywxOS41NSBDMTUwLjAzMSwyMC40NTUgMTUyLjA4NiwyMC45MDcgMTU0LjE0NywyMC45MDcgQzE1Ni4yMjQsMjAuOTA3IDE1OC4zMDYsMjAuNDQ3IDE1OS44OTYsMTkuNTMgTDE2NS42MywxNi4yMTkgTDE1NC4yMzMsOS42MzkiIGlkPSJGaWxsLTMyIiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0NS40NDUsNzIuNjY3IEwxNDUuNDQ1LDcyLjY2NyBDMTQzLjY3Miw3Mi42NjcgMTQyLjIwNCw3MS44MTcgMTQxLjIwMiw3MC40MjIgQzE0MS4xMzUsNzAuMzMgMTQxLjE0NSw3MC4xNDcgMTQxLjIyNSw3MC4wNjYgQzE0MS4zMDUsNjkuOTg1IDE0MS40MzIsNjkuOTQ2IDE0MS41MjUsNzAuMDExIEMxNDIuMzA2LDcwLjU1OSAxNDMuMjMxLDcwLjgyMyAxNDQuMjc2LDcwLjgyMiBDMTQ1LjU5OCw3MC44MjIgMTQ3LjAzLDcwLjM3NiAxNDguNTMyLDY5LjUwOSBDMTUzLjg0Miw2Ni40NDMgMTU4LjE2Myw1OC45ODcgMTU4LjE2Myw1Mi44OTQgQzE1OC4xNjMsNTAuOTY3IDE1Ny43MjEsNDkuMzMyIDE1Ni44ODQsNDguMTY4IEMxNTYuODE4LDQ4LjA3NiAxNTYuODI4LDQ3Ljk0OCAxNTYuOTA4LDQ3Ljg2NyBDMTU2Ljk4OCw0Ny43ODYgMTU3LjExNCw0Ny43NzQgMTU3LjIwOCw0Ny44NCBDMTU4Ljg3OCw0OS4wMTIgMTU5Ljc5OCw1MS4yMiAxNTkuNzk4LDU0LjA1OSBDMTU5Ljc5OCw2MC4zMDEgMTU1LjM3Myw2OC4wNDYgMTQ5LjkzMyw3MS4xODYgQzE0OC4zNiw3Mi4wOTQgMTQ2Ljg1LDcyLjY2NyAxNDUuNDQ1LDcyLjY2NyBMMTQ1LjQ0NSw3Mi42NjcgWiBNMTQyLjQ3Niw3MSBDMTQzLjI5LDcxLjY1MSAxNDQuMjk2LDcyLjAwMiAxNDUuNDQ1LDcyLjAwMiBDMTQ2Ljc2Nyw3Mi4wMDIgMTQ4LjE5OCw3MS41NSAxNDkuNyw3MC42ODIgQzE1NS4wMSw2Ny42MTcgMTU5LjMzMSw2MC4xNTkgMTU5LjMzMSw1NC4wNjUgQzE1OS4zMzEsNTIuMDg1IDE1OC44NjgsNTAuNDM1IDE1OC4wMDYsNDkuMjcyIEMxNTguNDE3LDUwLjMwNyAxNTguNjMsNTEuNTMyIDE1OC42Myw1Mi44OTIgQzE1OC42Myw1OS4xMzQgMTU0LjIwNSw2Ni43NjcgMTQ4Ljc2NSw2OS45MDcgQzE0Ny4xOTIsNzAuODE2IDE0NS42ODEsNzEuMjgzIDE0NC4yNzYsNzEuMjgzIEMxNDMuNjM0LDcxLjI4MyAxNDMuMDMzLDcxLjE5MiAxNDIuNDc2LDcxIEwxNDIuNDc2LDcxIFoiIGlkPSJGaWxsLTMzIiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0OC42NDgsNjkuNzA0IEMxNTQuMDMyLDY2LjU5NiAxNTguMzk2LDU5LjA2OCAxNTguMzk2LDUyLjg5MSBDMTU4LjM5Niw1MC44MzkgMTU3LjkxMyw0OS4xOTggMTU3LjA3NCw0OC4wMyBDMTU1LjI4OSw0Ni43NzggMTUyLjY5OSw0Ni44MzYgMTQ5LjgxNiw0OC41MDEgQzE0NC40MzMsNTEuNjA5IDE0MC4wNjgsNTkuMTM3IDE0MC4wNjgsNjUuMzE0IEMxNDAuMDY4LDY3LjM2NSAxNDAuNTUyLDY5LjAwNiAxNDEuMzkxLDcwLjE3NCBDMTQzLjE3Niw3MS40MjcgMTQ1Ljc2NSw3MS4zNjkgMTQ4LjY0OCw2OS43MDQiIGlkPSJGaWxsLTM0IiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0NC4yNzYsNzEuMjc2IEwxNDQuMjc2LDcxLjI3NiBDMTQzLjEzMyw3MS4yNzYgMTQyLjExOCw3MC45NjkgMTQxLjI1Nyw3MC4zNjUgQzE0MS4yMzYsNzAuMzUxIDE0MS4yMTcsNzAuMzMyIDE0MS4yMDIsNzAuMzExIEMxNDAuMzA3LDY5LjA2NyAxMzkuODM1LDY3LjMzOSAxMzkuODM1LDY1LjMxNCBDMTM5LjgzNSw1OS4wNzMgMTQ0LjI2LDUxLjQzOSAxNDkuNyw0OC4yOTggQzE1MS4yNzMsNDcuMzkgMTUyLjc4NCw0Ni45MjkgMTU0LjE4OSw0Ni45MjkgQzE1NS4zMzIsNDYuOTI5IDE1Ni4zNDcsNDcuMjM2IDE1Ny4yMDgsNDcuODM5IEMxNTcuMjI5LDQ3Ljg1NCAxNTcuMjQ4LDQ3Ljg3MyAxNTcuMjYzLDQ3Ljg5NCBDMTU4LjE1Nyw0OS4xMzggMTU4LjYzLDUwLjg2NSAxNTguNjMsNTIuODkxIEMxNTguNjMsNTkuMTMyIDE1NC4yMDUsNjYuNzY2IDE0OC43NjUsNjkuOTA3IEMxNDcuMTkyLDcwLjgxNSAxNDUuNjgxLDcxLjI3NiAxNDQuMjc2LDcxLjI3NiBMMTQ0LjI3Niw3MS4yNzYgWiBNMTQxLjU1OCw3MC4xMDQgQzE0Mi4zMzEsNzAuNjM3IDE0My4yNDUsNzEuMDA1IDE0NC4yNzYsNzEuMDA1IEMxNDUuNTk4LDcxLjAwNSAxNDcuMDMsNzAuNDY3IDE0OC41MzIsNjkuNiBDMTUzLjg0Miw2Ni41MzQgMTU4LjE2Myw1OS4wMzMgMTU4LjE2Myw1Mi45MzkgQzE1OC4xNjMsNTEuMDMxIDE1Ny43MjksNDkuMzg1IDE1Ni45MDcsNDguMjIzIEMxNTYuMTMzLDQ3LjY5MSAxNTUuMjE5LDQ3LjQwOSAxNTQuMTg5LDQ3LjQwOSBDMTUyLjg2Nyw0Ny40MDkgMTUxLjQzNSw0Ny44NDIgMTQ5LjkzMyw0OC43MDkgQzE0NC42MjMsNTEuNzc1IDE0MC4zMDIsNTkuMjczIDE0MC4zMDIsNjUuMzY2IEMxNDAuMzAyLDY3LjI3NiAxNDAuNzM2LDY4Ljk0MiAxNDEuNTU4LDcwLjEwNCBMMTQxLjU1OCw3MC4xMDQgWiIgaWQ9IkZpbGwtMzUiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUwLjcyLDY1LjM2MSBMMTUwLjM1Nyw2NS4wNjYgQzE1MS4xNDcsNjQuMDkyIDE1MS44NjksNjMuMDQgMTUyLjUwNSw2MS45MzggQzE1My4zMTMsNjAuNTM5IDE1My45NzgsNTkuMDY3IDE1NC40ODIsNTcuNTYzIEwxNTQuOTI1LDU3LjcxMiBDMTU0LjQxMiw1OS4yNDUgMTUzLjczMyw2MC43NDUgMTUyLjkxLDYyLjE3MiBDMTUyLjI2Miw2My4yOTUgMTUxLjUyNSw2NC4zNjggMTUwLjcyLDY1LjM2MSIgaWQ9IkZpbGwtMzYiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTE1LjkxNyw4NC41MTQgTDExNS41NTQsODQuMjIgQzExNi4zNDQsODMuMjQ1IDExNy4wNjYsODIuMTk0IDExNy43MDIsODEuMDkyIEMxMTguNTEsNzkuNjkyIDExOS4xNzUsNzguMjIgMTE5LjY3OCw3Ni43MTcgTDEyMC4xMjEsNzYuODY1IEMxMTkuNjA4LDc4LjM5OCAxMTguOTMsNzkuODk5IDExOC4xMDYsODEuMzI2IEMxMTcuNDU4LDgyLjQ0OCAxMTYuNzIyLDgzLjUyMSAxMTUuOTE3LDg0LjUxNCIgaWQ9IkZpbGwtMzciIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTE0LDEzMC40NzYgTDExNCwxMzAuMDA4IEwxMTQsNzYuMDUyIEwxMTQsNzUuNTg0IEwxMTQsNzYuMDUyIEwxMTQsMTMwLjAwOCBMMTE0LDEzMC40NzYiIGlkPSJGaWxsLTM4IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iSW1wb3J0ZWQtTGF5ZXJzLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYyLjAwMDAwMCwgMC4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkuODIyLDM3LjQ3NCBDMTkuODM5LDM3LjMzOSAxOS43NDcsMzcuMTk0IDE5LjU1NSwzNy4wODIgQzE5LjIyOCwzNi44OTQgMTguNzI5LDM2Ljg3MiAxOC40NDYsMzcuMDM3IEwxMi40MzQsNDAuNTA4IEMxMi4zMDMsNDAuNTg0IDEyLjI0LDQwLjY4NiAxMi4yNDMsNDAuNzkzIEMxMi4yNDUsNDAuOTI1IDEyLjI0NSw0MS4yNTQgMTIuMjQ1LDQxLjM3MSBMMTIuMjQ1LDQxLjQxNCBMMTIuMjM4LDQxLjU0MiBDOC4xNDgsNDMuODg3IDUuNjQ3LDQ1LjMyMSA1LjY0Nyw0NS4zMjEgQzUuNjQ2LDQ1LjMyMSAzLjU3LDQ2LjM2NyAyLjg2LDUwLjUxMyBDMi44Niw1MC41MTMgMS45NDgsNTcuNDc0IDEuOTYyLDcwLjI1OCBDMS45NzcsODIuODI4IDIuNTY4LDg3LjMyOCAzLjEyOSw5MS42MDkgQzMuMzQ5LDkzLjI5MyA2LjEzLDkzLjczNCA2LjEzLDkzLjczNCBDNi40NjEsOTMuNzc0IDYuODI4LDkzLjcwNyA3LjIxLDkzLjQ4NiBMODIuNDgzLDQ5LjkzNSBDODQuMjkxLDQ4Ljg2NiA4NS4xNSw0Ni4yMTYgODUuNTM5LDQzLjY1MSBDODYuNzUyLDM1LjY2MSA4Ny4yMTQsMTAuNjczIDg1LjI2NCwzLjc3MyBDODUuMDY4LDMuMDggODQuNzU0LDIuNjkgODQuMzk2LDIuNDkxIEw4Mi4zMSwxLjcwMSBDODEuNTgzLDEuNzI5IDgwLjg5NCwyLjE2OCA4MC43NzYsMi4yMzYgQzgwLjYzNiwyLjMxNyA0MS44MDcsMjQuNTg1IDIwLjAzMiwzNy4wNzIgTDE5LjgyMiwzNy40NzQiIGlkPSJGaWxsLTEiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNODIuMzExLDEuNzAxIEw4NC4zOTYsMi40OTEgQzg0Ljc1NCwyLjY5IDg1LjA2OCwzLjA4IDg1LjI2NCwzLjc3MyBDODcuMjEzLDEwLjY3MyA4Ni43NTEsMzUuNjYgODUuNTM5LDQzLjY1MSBDODUuMTQ5LDQ2LjIxNiA4NC4yOSw0OC44NjYgODIuNDgzLDQ5LjkzNSBMNy4yMSw5My40ODYgQzYuODk3LDkzLjY2NyA2LjU5NSw5My43NDQgNi4zMTQsOTMuNzQ0IEw2LjEzMSw5My43MzMgQzYuMTMxLDkzLjczNCAzLjM0OSw5My4yOTMgMy4xMjgsOTEuNjA5IEMyLjU2OCw4Ny4zMjcgMS45NzcsODIuODI4IDEuOTYzLDcwLjI1OCBDMS45NDgsNTcuNDc0IDIuODYsNTAuNTEzIDIuODYsNTAuNTEzIEMzLjU3LDQ2LjM2NyA1LjY0Nyw0NS4zMjEgNS42NDcsNDUuMzIxIEM1LjY0Nyw0NS4zMjEgOC4xNDgsNDMuODg3IDEyLjIzOCw0MS41NDIgTDEyLjI0NSw0MS40MTQgTDEyLjI0NSw0MS4zNzEgQzEyLjI0NSw0MS4yNTQgMTIuMjQ1LDQwLjkyNSAxMi4yNDMsNDAuNzkzIEMxMi4yNCw0MC42ODYgMTIuMzAyLDQwLjU4MyAxMi40MzQsNDAuNTA4IEwxOC40NDYsMzcuMDM2IEMxOC41NzQsMzYuOTYyIDE4Ljc0NiwzNi45MjYgMTguOTI3LDM2LjkyNiBDMTkuMTQ1LDM2LjkyNiAxOS4zNzYsMzYuOTc5IDE5LjU1NCwzNy4wODIgQzE5Ljc0NywzNy4xOTQgMTkuODM5LDM3LjM0IDE5LjgyMiwzNy40NzQgTDIwLjAzMywzNy4wNzIgQzQxLjgwNiwyNC41ODUgODAuNjM2LDIuMzE4IDgwLjc3NywyLjIzNiBDODAuODk0LDIuMTY4IDgxLjU4MywxLjcyOSA4Mi4zMTEsMS43MDEgTTgyLjMxMSwwLjcwNCBMODIuMjcyLDAuNzA1IEM4MS42NTQsMC43MjggODAuOTg5LDAuOTQ5IDgwLjI5OCwxLjM2MSBMODAuMjc3LDEuMzczIEM4MC4xMjksMS40NTggNTkuNzY4LDEzLjEzNSAxOS43NTgsMzYuMDc5IEMxOS41LDM1Ljk4MSAxOS4yMTQsMzUuOTI5IDE4LjkyNywzNS45MjkgQzE4LjU2MiwzNS45MjkgMTguMjIzLDM2LjAxMyAxNy45NDcsMzYuMTczIEwxMS45MzUsMzkuNjQ0IEMxMS40OTMsMzkuODk5IDExLjIzNiw0MC4zMzQgMTEuMjQ2LDQwLjgxIEwxMS4yNDcsNDAuOTYgTDUuMTY3LDQ0LjQ0NyBDNC43OTQsNDQuNjQ2IDIuNjI1LDQ1Ljk3OCAxLjg3Nyw1MC4zNDUgTDEuODcxLDUwLjM4NCBDMS44NjIsNTAuNDU0IDAuOTUxLDU3LjU1NyAwLjk2NSw3MC4yNTkgQzAuOTc5LDgyLjg3OSAxLjU2OCw4Ny4zNzUgMi4xMzcsOTEuNzI0IEwyLjEzOSw5MS43MzkgQzIuNDQ3LDk0LjA5NCA1LjYxNCw5NC42NjIgNS45NzUsOTQuNzE5IEw2LjAwOSw5NC43MjMgQzYuMTEsOTQuNzM2IDYuMjEzLDk0Ljc0MiA2LjMxNCw5NC43NDIgQzYuNzksOTQuNzQyIDcuMjYsOTQuNjEgNy43MSw5NC4zNSBMODIuOTgzLDUwLjc5OCBDODQuNzk0LDQ5LjcyNyA4NS45ODIsNDcuMzc1IDg2LjUyNSw0My44MDEgQzg3LjcxMSwzNS45ODcgODguMjU5LDEwLjcwNSA4Ni4yMjQsMy41MDIgQzg1Ljk3MSwyLjYwOSA4NS41MiwxLjk3NSA4NC44ODEsMS42MiBMODQuNzQ5LDEuNTU4IEw4Mi42NjQsMC43NjkgQzgyLjU1MSwwLjcyNSA4Mi40MzEsMC43MDQgODIuMzExLDAuNzA0IiBpZD0iRmlsbC0yIiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTY2LjI2NywxMS41NjUgTDY3Ljc2MiwxMS45OTkgTDExLjQyMyw0NC4zMjUiIGlkPSJGaWxsLTMiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuMjAyLDkwLjU0NSBDMTIuMDI5LDkwLjU0NSAxMS44NjIsOTAuNDU1IDExLjc2OSw5MC4yOTUgQzExLjYzMiw5MC4wNTcgMTEuNzEzLDg5Ljc1MiAxMS45NTIsODkuNjE0IEwzMC4zODksNzguOTY5IEMzMC42MjgsNzguODMxIDMwLjkzMyw3OC45MTMgMzEuMDcxLDc5LjE1MiBDMzEuMjA4LDc5LjM5IDMxLjEyNyw3OS42OTYgMzAuODg4LDc5LjgzMyBMMTIuNDUxLDkwLjQ3OCBMMTIuMjAyLDkwLjU0NSIgaWQ9IkZpbGwtNCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy43NjQsNDIuNjU0IEwxMy42NTYsNDIuNTkyIEwxMy43MDIsNDIuNDIxIEwxOC44MzcsMzkuNDU3IEwxOS4wMDcsMzkuNTAyIEwxOC45NjIsMzkuNjczIEwxMy44MjcsNDIuNjM3IEwxMy43NjQsNDIuNjU0IiBpZD0iRmlsbC01IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTguNTIsOTAuMzc1IEw4LjUyLDQ2LjQyMSBMOC41ODMsNDYuMzg1IEw3NS44NCw3LjU1NCBMNzUuODQsNTEuNTA4IEw3NS43NzgsNTEuNTQ0IEw4LjUyLDkwLjM3NSBMOC41Miw5MC4zNzUgWiBNOC43Nyw0Ni41NjQgTDguNzcsODkuOTQ0IEw3NS41OTEsNTEuMzY1IEw3NS41OTEsNy45ODUgTDguNzcsNDYuNTY0IEw4Ljc3LDQ2LjU2NCBaIiBpZD0iRmlsbC02IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0Ljk4Niw4My4xODIgQzI0Ljc1Niw4My4zMzEgMjQuMzc0LDgzLjU2NiAyNC4xMzcsODMuNzA1IEwxMi42MzIsOTAuNDA2IEMxMi4zOTUsOTAuNTQ1IDEyLjQyNiw5MC42NTggMTIuNyw5MC42NTggTDEzLjI2NSw5MC42NTggQzEzLjU0LDkwLjY1OCAxMy45NTgsOTAuNTQ1IDE0LjE5NSw5MC40MDYgTDI1LjcsODMuNzA1IEMyNS45MzcsODMuNTY2IDI2LjEyOCw4My40NTIgMjYuMTI1LDgzLjQ0OSBDMjYuMTIyLDgzLjQ0NyAyNi4xMTksODMuMjIgMjYuMTE5LDgyLjk0NiBDMjYuMTE5LDgyLjY3MiAyNS45MzEsODIuNTY5IDI1LjcwMSw4Mi43MTkgTDI0Ljk4Niw4My4xODIiIGlkPSJGaWxsLTciIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuMjY2LDkwLjc4MiBMMTIuNyw5MC43ODIgQzEyLjUsOTAuNzgyIDEyLjM4NCw5MC43MjYgMTIuMzU0LDkwLjYxNiBDMTIuMzI0LDkwLjUwNiAxMi4zOTcsOTAuMzk5IDEyLjU2OSw5MC4yOTkgTDI0LjA3NCw4My41OTcgQzI0LjMxLDgzLjQ1OSAyNC42ODksODMuMjI2IDI0LjkxOCw4My4wNzggTDI1LjYzMyw4Mi42MTQgQzI1LjcyMyw4Mi41NTUgMjUuODEzLDgyLjUyNSAyNS44OTksODIuNTI1IEMyNi4wNzEsODIuNTI1IDI2LjI0NCw4Mi42NTUgMjYuMjQ0LDgyLjk0NiBDMjYuMjQ0LDgzLjE2IDI2LjI0NSw4My4zMDkgMjYuMjQ3LDgzLjM4MyBMMjYuMjUzLDgzLjM4NyBMMjYuMjQ5LDgzLjQ1NiBDMjYuMjQ2LDgzLjUzMSAyNi4yNDYsODMuNTMxIDI1Ljc2Myw4My44MTIgTDE0LjI1OCw5MC41MTQgQzE0LDkwLjY2NSAxMy41NjQsOTAuNzgyIDEzLjI2Niw5MC43ODIgTDEzLjI2Niw5MC43ODIgWiBNMTIuNjY2LDkwLjUzMiBMMTIuNyw5MC41MzMgTDEzLjI2Niw5MC41MzMgQzEzLjUxOCw5MC41MzMgMTMuOTE1LDkwLjQyNSAxNC4xMzIsOTAuMjk5IEwyNS42MzcsODMuNTk3IEMyNS44MDUsODMuNDk5IDI1LjkzMSw4My40MjQgMjUuOTk4LDgzLjM4MyBDMjUuOTk0LDgzLjI5OSAyNS45OTQsODMuMTY1IDI1Ljk5NCw4Mi45NDYgTDI1Ljg5OSw4Mi43NzUgTDI1Ljc2OCw4Mi44MjQgTDI1LjA1NCw4My4yODcgQzI0LjgyMiw4My40MzcgMjQuNDM4LDgzLjY3MyAyNC4yLDgzLjgxMiBMMTIuNjk1LDkwLjUxNCBMMTIuNjY2LDkwLjUzMiBMMTIuNjY2LDkwLjUzMiBaIiBpZD0iRmlsbC04IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjI2Niw4OS44NzEgTDEyLjcsODkuODcxIEMxMi41LDg5Ljg3MSAxMi4zODQsODkuODE1IDEyLjM1NCw4OS43MDUgQzEyLjMyNCw4OS41OTUgMTIuMzk3LDg5LjQ4OCAxMi41NjksODkuMzg4IEwyNC4wNzQsODIuNjg2IEMyNC4zMzIsODIuNTM1IDI0Ljc2OCw4Mi40MTggMjUuMDY3LDgyLjQxOCBMMjUuNjMyLDgyLjQxOCBDMjUuODMyLDgyLjQxOCAyNS45NDgsODIuNDc0IDI1Ljk3OCw4Mi41ODQgQzI2LjAwOCw4Mi42OTQgMjUuOTM1LDgyLjgwMSAyNS43NjMsODIuOTAxIEwxNC4yNTgsODkuNjAzIEMxNCw4OS43NTQgMTMuNTY0LDg5Ljg3MSAxMy4yNjYsODkuODcxIEwxMy4yNjYsODkuODcxIFogTTEyLjY2Niw4OS42MjEgTDEyLjcsODkuNjIyIEwxMy4yNjYsODkuNjIyIEMxMy41MTgsODkuNjIyIDEzLjkxNSw4OS41MTUgMTQuMTMyLDg5LjM4OCBMMjUuNjM3LDgyLjY4NiBMMjUuNjY3LDgyLjY2OCBMMjUuNjMyLDgyLjY2NyBMMjUuMDY3LDgyLjY2NyBDMjQuODE1LDgyLjY2NyAyNC40MTgsODIuNzc1IDI0LjIsODIuOTAxIEwxMi42OTUsODkuNjAzIEwxMi42NjYsODkuNjIxIEwxMi42NjYsODkuNjIxIFoiIGlkPSJGaWxsLTkiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuMzcsOTAuODAxIEwxMi4zNyw4OS41NTQgTDEyLjM3LDkwLjgwMSIgaWQ9IkZpbGwtMTAiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi4xMyw5My45MDEgQzUuMzc5LDkzLjgwOCA0LjgxNiw5My4xNjQgNC42OTEsOTIuNTI1IEMzLjg2LDg4LjI4NyAzLjU0LDgzLjc0MyAzLjUyNiw3MS4xNzMgQzMuNTExLDU4LjM4OSA0LjQyMyw1MS40MjggNC40MjMsNTEuNDI4IEM1LjEzNCw0Ny4yODIgNy4yMSw0Ni4yMzYgNy4yMSw0Ni4yMzYgQzcuMjEsNDYuMjM2IDgxLjY2NywzLjI1IDgyLjA2OSwzLjAxNyBDODIuMjkyLDIuODg4IDg0LjU1NiwxLjQzMyA4NS4yNjQsMy45NCBDODcuMjE0LDEwLjg0IDg2Ljc1MiwzNS44MjcgODUuNTM5LDQzLjgxOCBDODUuMTUsNDYuMzgzIDg0LjI5MSw0OS4wMzMgODIuNDgzLDUwLjEwMSBMNy4yMSw5My42NTMgQzYuODI4LDkzLjg3NCA2LjQ2MSw5My45NDEgNi4xMyw5My45MDEgQzYuMTMsOTMuOTAxIDMuMzQ5LDkzLjQ2IDMuMTI5LDkxLjc3NiBDMi41NjgsODcuNDk1IDEuOTc3LDgyLjk5NSAxLjk2Miw3MC40MjUgQzEuOTQ4LDU3LjY0MSAyLjg2LDUwLjY4IDIuODYsNTAuNjggQzMuNTcsNDYuNTM0IDUuNjQ3LDQ1LjQ4OSA1LjY0Nyw0NS40ODkgQzUuNjQ2LDQ1LjQ4OSA4LjA2NSw0NC4wOTIgMTIuMjQ1LDQxLjY3OSBMMTMuMTE2LDQxLjU2IEwxOS43MTUsMzcuNzMgTDE5Ljc2MSwzNy4yNjkgTDYuMTMsOTMuOTAxIiBpZD0iRmlsbC0xMSIgZmlsbD0iI0ZBRkFGQSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjMxNyw5NC4xNjEgTDYuMTAyLDk0LjE0OCBMNi4xMDEsOTQuMTQ4IEw1Ljg1Nyw5NC4xMDEgQzUuMTM4LDkzLjk0NSAzLjA4NSw5My4zNjUgMi44ODEsOTEuODA5IEMyLjMxMyw4Ny40NjkgMS43MjcsODIuOTk2IDEuNzEzLDcwLjQyNSBDMS42OTksNTcuNzcxIDIuNjA0LDUwLjcxOCAyLjYxMyw1MC42NDggQzMuMzM4LDQ2LjQxNyA1LjQ0NSw0NS4zMSA1LjUzNSw0NS4yNjYgTDEyLjE2Myw0MS40MzkgTDEzLjAzMyw0MS4zMiBMMTkuNDc5LDM3LjU3OCBMMTkuNTEzLDM3LjI0NCBDMTkuNTI2LDM3LjEwNyAxOS42NDcsMzcuMDA4IDE5Ljc4NiwzNy4wMjEgQzE5LjkyMiwzNy4wMzQgMjAuMDIzLDM3LjE1NiAyMC4wMDksMzcuMjkzIEwxOS45NSwzNy44ODIgTDEzLjE5OCw0MS44MDEgTDEyLjMyOCw0MS45MTkgTDUuNzcyLDQ1LjcwNCBDNS43NDEsNDUuNzIgMy43ODIsNDYuNzcyIDMuMTA2LDUwLjcyMiBDMy4wOTksNTAuNzgyIDIuMTk4LDU3LjgwOCAyLjIxMiw3MC40MjQgQzIuMjI2LDgyLjk2MyAyLjgwOSw4Ny40MiAzLjM3Myw5MS43MjkgQzMuNDY0LDkyLjQyIDQuMDYyLDkyLjg4MyA0LjY4Miw5My4xODEgQzQuNTY2LDkyLjk4NCA0LjQ4Niw5Mi43NzYgNC40NDYsOTIuNTcyIEMzLjY2NSw4OC41ODggMy4yOTEsODQuMzcgMy4yNzYsNzEuMTczIEMzLjI2Miw1OC41MiA0LjE2Nyw1MS40NjYgNC4xNzYsNTEuMzk2IEM0LjkwMSw0Ny4xNjUgNy4wMDgsNDYuMDU5IDcuMDk4LDQ2LjAxNCBDNy4wOTQsNDYuMDE1IDgxLjU0MiwzLjAzNCA4MS45NDQsMi44MDIgTDgxLjk3MiwyLjc4NSBDODIuODc2LDIuMjQ3IDgzLjY5MiwyLjA5NyA4NC4zMzIsMi4zNTIgQzg0Ljg4NywyLjU3MyA4NS4yODEsMy4wODUgODUuNTA0LDMuODcyIEM4Ny41MTgsMTEgODYuOTY0LDM2LjA5MSA4NS43ODUsNDMuODU1IEM4NS4yNzgsNDcuMTk2IDg0LjIxLDQ5LjM3IDgyLjYxLDUwLjMxNyBMNy4zMzUsOTMuODY5IEM2Ljk5OSw5NC4wNjMgNi42NTgsOTQuMTYxIDYuMzE3LDk0LjE2MSBMNi4zMTcsOTQuMTYxIFogTTYuMTcsOTMuNjU0IEM2LjQ2Myw5My42OSA2Ljc3NCw5My42MTcgNy4wODUsOTMuNDM3IEw4Mi4zNTgsNDkuODg2IEM4NC4xODEsNDguODA4IDg0Ljk2LDQ1Ljk3MSA4NS4yOTIsNDMuNzggQzg2LjQ2NiwzNi4wNDkgODcuMDIzLDExLjA4NSA4NS4wMjQsNC4wMDggQzg0Ljg0NiwzLjM3NyA4NC41NTEsMi45NzYgODQuMTQ4LDIuODE2IEM4My42NjQsMi42MjMgODIuOTgyLDIuNzY0IDgyLjIyNywzLjIxMyBMODIuMTkzLDMuMjM0IEM4MS43OTEsMy40NjYgNy4zMzUsNDYuNDUyIDcuMzM1LDQ2LjQ1MiBDNy4zMDQsNDYuNDY5IDUuMzQ2LDQ3LjUyMSA0LjY2OSw1MS40NzEgQzQuNjYyLDUxLjUzIDMuNzYxLDU4LjU1NiAzLjc3NSw3MS4xNzMgQzMuNzksODQuMzI4IDQuMTYxLDg4LjUyNCA0LjkzNiw5Mi40NzYgQzUuMDI2LDkyLjkzNyA1LjQxMiw5My40NTkgNS45NzMsOTMuNjE1IEM2LjA4Nyw5My42NCA2LjE1OCw5My42NTIgNi4xNjksOTMuNjU0IEw2LjE3LDkzLjY1NCBMNi4xNyw5My42NTQgWiIgaWQ9IkZpbGwtMTIiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy4zMTcsNjguOTgyIEM3LjgwNiw2OC43MDEgOC4yMDIsNjguOTI2IDguMjAyLDY5LjQ4NyBDOC4yMDIsNzAuMDQ3IDcuODA2LDcwLjczIDcuMzE3LDcxLjAxMiBDNi44MjksNzEuMjk0IDYuNDMzLDcxLjA2OSA2LjQzMyw3MC41MDggQzYuNDMzLDY5Ljk0OCA2LjgyOSw2OS4yNjUgNy4zMTcsNjguOTgyIiBpZD0iRmlsbC0xMyIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjkyLDcxLjEzMyBDNi42MzEsNzEuMTMzIDYuNDMzLDcwLjkwNSA2LjQzMyw3MC41MDggQzYuNDMzLDY5Ljk0OCA2LjgyOSw2OS4yNjUgNy4zMTcsNjguOTgyIEM3LjQ2LDY4LjkgNy41OTUsNjguODYxIDcuNzE0LDY4Ljg2MSBDOC4wMDMsNjguODYxIDguMjAyLDY5LjA5IDguMjAyLDY5LjQ4NyBDOC4yMDIsNzAuMDQ3IDcuODA2LDcwLjczIDcuMzE3LDcxLjAxMiBDNy4xNzQsNzEuMDk0IDcuMDM5LDcxLjEzMyA2LjkyLDcxLjEzMyBNNy43MTQsNjguNjc0IEM3LjU1Nyw2OC42NzQgNy4zOTIsNjguNzIzIDcuMjI0LDY4LjgyMSBDNi42NzYsNjkuMTM4IDYuMjQ2LDY5Ljg3OSA2LjI0Niw3MC41MDggQzYuMjQ2LDcwLjk5NCA2LjUxNyw3MS4zMiA2LjkyLDcxLjMyIEM3LjA3OCw3MS4zMiA3LjI0Myw3MS4yNzEgNy40MTEsNzEuMTc0IEM3Ljk1OSw3MC44NTcgOC4zODksNzAuMTE3IDguMzg5LDY5LjQ4NyBDOC4zODksNjkuMDAxIDguMTE3LDY4LjY3NCA3LjcxNCw2OC42NzQiIGlkPSJGaWxsLTE0IiBmaWxsPSIjODA5N0EyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuOTIsNzAuOTQ3IEM2LjY0OSw3MC45NDcgNi42MjEsNzAuNjQgNi42MjEsNzAuNTA4IEM2LjYyMSw3MC4wMTcgNi45ODIsNjkuMzkyIDcuNDExLDY5LjE0NSBDNy41MjEsNjkuMDgyIDcuNjI1LDY5LjA0OSA3LjcxNCw2OS4wNDkgQzcuOTg2LDY5LjA0OSA4LjAxNSw2OS4zNTUgOC4wMTUsNjkuNDg3IEM4LjAxNSw2OS45NzggNy42NTIsNzAuNjAzIDcuMjI0LDcwLjg1MSBDNy4xMTUsNzAuOTE0IDcuMDEsNzAuOTQ3IDYuOTIsNzAuOTQ3IE03LjcxNCw2OC44NjEgQzcuNTk1LDY4Ljg2MSA3LjQ2LDY4LjkgNy4zMTcsNjguOTgyIEM2LjgyOSw2OS4yNjUgNi40MzMsNjkuOTQ4IDYuNDMzLDcwLjUwOCBDNi40MzMsNzAuOTA1IDYuNjMxLDcxLjEzMyA2LjkyLDcxLjEzMyBDNy4wMzksNzEuMTMzIDcuMTc0LDcxLjA5NCA3LjMxNyw3MS4wMTIgQzcuODA2LDcwLjczIDguMjAyLDcwLjA0NyA4LjIwMiw2OS40ODcgQzguMjAyLDY5LjA5IDguMDAzLDY4Ljg2MSA3LjcxNCw2OC44NjEiIGlkPSJGaWxsLTE1IiBmaWxsPSIjODA5N0EyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTcuNDQ0LDg1LjM1IEM3LjcwOCw4NS4xOTggNy45MjEsODUuMzE5IDcuOTIxLDg1LjYyMiBDNy45MjEsODUuOTI1IDcuNzA4LDg2LjI5MiA3LjQ0NCw4Ni40NDQgQzcuMTgxLDg2LjU5NyA2Ljk2Nyw4Ni40NzUgNi45NjcsODYuMTczIEM2Ljk2Nyw4NS44NzEgNy4xODEsODUuNTAyIDcuNDQ0LDg1LjM1IiBpZD0iRmlsbC0xNiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03LjIzLDg2LjUxIEM3LjA3NCw4Ni41MSA2Ljk2Nyw4Ni4zODcgNi45NjcsODYuMTczIEM2Ljk2Nyw4NS44NzEgNy4xODEsODUuNTAyIDcuNDQ0LDg1LjM1IEM3LjUyMSw4NS4zMDUgNy41OTQsODUuMjg0IDcuNjU4LDg1LjI4NCBDNy44MTQsODUuMjg0IDcuOTIxLDg1LjQwOCA3LjkyMSw4NS42MjIgQzcuOTIxLDg1LjkyNSA3LjcwOCw4Ni4yOTIgNy40NDQsODYuNDQ0IEM3LjM2Nyw4Ni40ODkgNy4yOTQsODYuNTEgNy4yMyw4Ni41MSBNNy42NTgsODUuMDk4IEM3LjU1OCw4NS4wOTggNy40NTUsODUuMTI3IDcuMzUxLDg1LjE4OCBDNy4wMzEsODUuMzczIDYuNzgxLDg1LjgwNiA2Ljc4MSw4Ni4xNzMgQzYuNzgxLDg2LjQ4MiA2Ljk2Niw4Ni42OTcgNy4yMyw4Ni42OTcgQzcuMzMsODYuNjk3IDcuNDMzLDg2LjY2NiA3LjUzOCw4Ni42MDcgQzcuODU4LDg2LjQyMiA4LjEwOCw4NS45ODkgOC4xMDgsODUuNjIyIEM4LjEwOCw4NS4zMTMgNy45MjMsODUuMDk4IDcuNjU4LDg1LjA5OCIgaWQ9IkZpbGwtMTciIGZpbGw9IiM4MDk3QTIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy4yMyw4Ni4zMjIgTDcuMTU0LDg2LjE3MyBDNy4xNTQsODUuOTM4IDcuMzMzLDg1LjYyOSA3LjUzOCw4NS41MTIgTDcuNjU4LDg1LjQ3MSBMNy43MzQsODUuNjIyIEM3LjczNCw4NS44NTYgNy41NTUsODYuMTY0IDcuMzUxLDg2LjI4MiBMNy4yMyw4Ni4zMjIgTTcuNjU4LDg1LjI4NCBDNy41OTQsODUuMjg0IDcuNTIxLDg1LjMwNSA3LjQ0NCw4NS4zNSBDNy4xODEsODUuNTAyIDYuOTY3LDg1Ljg3MSA2Ljk2Nyw4Ni4xNzMgQzYuOTY3LDg2LjM4NyA3LjA3NCw4Ni41MSA3LjIzLDg2LjUxIEM3LjI5NCw4Ni41MSA3LjM2Nyw4Ni40ODkgNy40NDQsODYuNDQ0IEM3LjcwOCw4Ni4yOTIgNy45MjEsODUuOTI1IDcuOTIxLDg1LjYyMiBDNy45MjEsODUuNDA4IDcuODE0LDg1LjI4NCA3LjY1OCw4NS4yODQiIGlkPSJGaWxsLTE4IiBmaWxsPSIjODA5N0EyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTc3LjI3OCw3Ljc2OSBMNzcuMjc4LDUxLjQzNiBMMTAuMjA4LDkwLjE2IEwxMC4yMDgsNDYuNDkzIEw3Ny4yNzgsNy43NjkiIGlkPSJGaWxsLTE5IiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEwLjA4Myw5MC4zNzUgTDEwLjA4Myw0Ni40MjEgTDEwLjE0Niw0Ni4zODUgTDc3LjQwMyw3LjU1NCBMNzcuNDAzLDUxLjUwOCBMNzcuMzQxLDUxLjU0NCBMMTAuMDgzLDkwLjM3NSBMMTAuMDgzLDkwLjM3NSBaIE0xMC4zMzMsNDYuNTY0IEwxMC4zMzMsODkuOTQ0IEw3Ny4xNTQsNTEuMzY1IEw3Ny4xNTQsNy45ODUgTDEwLjMzMyw0Ni41NjQgTDEwLjMzMyw0Ni41NjQgWiIgaWQ9IkZpbGwtMjAiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMjUuNzM3LDg4LjY0NyBMMTE4LjA5OCw5MS45ODEgTDExOC4wOTgsODQgTDEwNi42MzksODguNzEzIEwxMDYuNjM5LDk2Ljk4MiBMOTksMTAwLjMxNSBMMTEyLjM2OSwxMDMuOTYxIEwxMjUuNzM3LDg4LjY0NyIgaWQ9IkltcG9ydGVkLUxheWVycy1Db3B5LTIiIGZpbGw9IiM0NTVBNjQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
};

module.exports = RotateInstructions;

},{"./util.js":13}],13:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Util = {};

Util.base64 = function(mimeType, base64) {
  return 'data:' + mimeType + ';base64,' + base64;
};

Util.isMobile = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

Util.isFirefox = function() {
  return /firefox/i.test(navigator.userAgent);
};

Util.isIOS = function() {
  return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
};

Util.isIFrame = function() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

Util.appendQueryParameter = function(url, key, value) {
  // Determine delimiter based on if the URL already GET parameters in it.
  var delimiter = (url.indexOf('?') < 0 ? '?' : '&');
  url += delimiter + key + '=' + value;
  return url;
};

// From http://goo.gl/4WX3tg
Util.getQueryParameter = function(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

Util.isLandscapeMode = function() {
  return (window.orientation == 90 || window.orientation == -90);
};

Util.getScreenWidth = function() {
  return Math.max(window.screen.width, window.screen.height) *
      window.devicePixelRatio;
};

Util.getScreenHeight = function() {
  return Math.min(window.screen.width, window.screen.height) *
      window.devicePixelRatio;
};

/**
 * Utility to convert the projection matrix to a vector accepted by the shader.
 *
 * @param {Object} opt_params A rectangle to scale this vector by.
 */
Util.projectionMatrixToVector_ = function(matrix, opt_params) {
  var params = opt_params || {};
  var xScale = params.xScale || 1;
  var yScale = params.yScale || 1;
  var xTrans = params.xTrans || 0;
  var yTrans = params.yTrans || 0;

  var elements = matrix.elements;
  var vec = new THREE.Vector4();
  vec.set(elements[4*0 + 0] * xScale,
          elements[4*1 + 1] * yScale,
          elements[4*2 + 0] - 1 - xTrans,
          elements[4*2 + 1] - 1 - yTrans).divideScalar(2);
  return vec;
};

Util.leftProjectionVectorToRight_ = function(left) {
  //projectionLeft + vec4(0.0, 0.0, 1.0, 0.0)) * vec4(1.0, 1.0, -1.0, 1.0);
  var out = new THREE.Vector4(0, 0, 1, 0);
  out.add(left); // out = left + (0, 0, 1, 0).
  out.z *= -1; // Flip z.

  return out;
};


module.exports = Util;

},{}],14:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Emitter = require('./emitter.js');
var Util = require('./util.js');

var DEFAULT_VIEWER = 'CardboardV1';
var VIEWER_KEY = 'WEBVR_CARDBOARD_VIEWER';

/**
 * Creates a viewer selector with the options specified. Supports being shown
 * and hidden. Generates events when viewer parameters change. Also supports
 * saving the currently selected index in localStorage.
 *
 * @param {Object} options Option labels for all valid selections {name: index}.
 */
function ViewerSelector(options) {
  // Try to load the selected key from local storage. If none exists, use the
  // default key.
  try {
    this.selectedKey = localStorage.getItem(VIEWER_KEY) || DEFAULT_VIEWER;
  } catch(error) {
    void 0;
  }
  this.dialog = this.createDialog_(options);
  this.options = options;
  document.body.appendChild(this.dialog);
}
ViewerSelector.prototype = new Emitter();

ViewerSelector.prototype.show = function() {
  //console.log('ViewerSelector.show');

  // Ensure the currently selected item is checked.
  var selected = this.dialog.querySelector('#' + this.selectedKey);
  selected.checked = true;

  // Show the UI.
  this.dialog.style.display = 'block';
};

ViewerSelector.prototype.hide = function() {
  //console.log('ViewerSelector.hide');
  this.dialog.style.display = 'none';
};

ViewerSelector.prototype.getSelectedKey_ = function() {
  var input = this.dialog.querySelector('input[name=field]:checked');
  if (input) {
    return input.id;
  }
  return null;
};

ViewerSelector.prototype.onSave_ = function() {
  this.selectedKey = this.getSelectedKey_();
  if (!this.selectedKey || !this.options[this.selectedKey]) {
    void 0;
    return;
  }

  this.emit('change', this.options[this.selectedKey]);

  // Attempt to save the viewer profile, but fails in private mode.
  try {
    localStorage.setItem(VIEWER_KEY, this.selectedKey);
  } catch(error) {
    void 0;
  }
  this.hide();
};

/**
 * Creates the dialog.
 */
ViewerSelector.prototype.createDialog_ = function(options) {
  var container = document.createElement('div');
  container.style.display = 'none';
  // Create an overlay that dims the background, and which goes away when you
  // tap it.
  var overlay = document.createElement('div');
  var s = overlay.style;
  s.position = 'fixed';
  s.left = 0;
  s.top = 0;
  s.width = '100%';
  s.height = '100%';
  s.background = 'rgba(0, 0, 0, 0.3)';
  overlay.addEventListener('click', this.hide.bind(this));

  var width = 280;
  var dialog = document.createElement('div');
  var s = dialog.style;
  s.boxSizing = 'border-box';
  s.position = 'fixed';
  s.top = '24px';
  s.left = '50%';
  s.marginLeft = (-width/2) + 'px';
  s.width = width + 'px';
  s.padding = '24px';
  s.overflow = 'hidden';
  s.background = '#fafafa';
  s.fontFamily = "'Roboto', sans-serif";
  s.boxShadow = '0px 5px 20px #666';

  dialog.appendChild(this.createH1_('Select your viewer'));
  for (var id in options) {
    dialog.appendChild(this.createChoice_(id, options[id].label));
  }
  dialog.appendChild(this.createButton_('Save', this.onSave_.bind(this)));

  container.appendChild(overlay);
  container.appendChild(dialog);

  return container;
};

ViewerSelector.prototype.createH1_ = function(name) {
  var h1 = document.createElement('h1');
  var s = h1.style;
  s.color = 'black';
  s.fontSize = '20px';
  s.fontWeight = 'bold';
  s.marginTop = 0;
  s.marginBottom = '24px';
  h1.innerHTML = name;
  return h1;
};

ViewerSelector.prototype.createChoice_ = function(id, name) {
  /*
  <div class="choice">
  <input id="v1" type="radio" name="field" value="v1">
  <label for="v1">Cardboard V1</label>
  </div>
  */
  var div = document.createElement('div');
  div.style.marginTop = '8px';
  div.style.color = 'black';

  var input = document.createElement('input');
  input.style.fontSize = '30px';
  input.setAttribute('id', id);
  input.setAttribute('type', 'radio');
  input.setAttribute('value', id);
  input.setAttribute('name', 'field');

  var label = document.createElement('label');
  label.style.marginLeft = '4px';
  label.setAttribute('for', id);
  label.innerHTML = name;

  div.appendChild(input);
  div.appendChild(label);

  return div;
};

ViewerSelector.prototype.createButton_ = function(label, onclick) {
  var button = document.createElement('button');
  button.innerHTML = label;
  var s = button.style;
  s.float = 'right';
  s.textTransform = 'uppercase';
  s.color = '#1094f7';
  s.fontSize = '14px';
  s.letterSpacing = 0;
  s.border = 0;
  s.background = 'none';
  s.marginTop = '16px';

  button.addEventListener('click', onclick);

  return button;
};

module.exports = ViewerSelector;

},{"./emitter.js":9,"./util.js":13}],15:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Util = require('./util.js');

/**
 * Android and iOS compatible wakelock implementation.
 *
 * Refactored thanks to dkovalev@.
 */
function AndroidWakeLock() {
  var video = document.createElement('video');

  video.addEventListener('ended', function() {
    video.play();
  });

  this.request = function() {
    if (video.paused) {
      // Base64 version of videos_src/no-sleep-120s.mp4.
      video.src = Util.base64('video/mp4', 'AAAAGGZ0eXBpc29tAAAAAG1wNDFhdmMxAAAIA21vb3YAAABsbXZoZAAAAADSa9v60mvb+gABX5AAlw/gAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAdkdHJhawAAAFx0a2hkAAAAAdJr2/rSa9v6AAAAAQAAAAAAlw/gAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAQAAAAHAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAJcP4AAAAAAAAQAAAAAG3G1kaWEAAAAgbWRoZAAAAADSa9v60mvb+gAPQkAGjneAFccAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAABodtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAZHc3RibAAAAJdzdHNkAAAAAAAAAAEAAACHYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAMABwASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAADFhdmNDAWQAC//hABlnZAALrNlfllw4QAAAAwBAAAADAKPFCmWAAQAFaOvssiwAAAAYc3R0cwAAAAAAAAABAAAAbgAPQkAAAAAUc3RzcwAAAAAAAAABAAAAAQAAA4BjdHRzAAAAAAAAAG4AAAABAD0JAAAAAAEAehIAAAAAAQA9CQAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEALcbAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAABuAAAAAQAAAcxzdHN6AAAAAAAAAAAAAABuAAADCQAAABgAAAAOAAAADgAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABMAAAAUc3RjbwAAAAAAAAABAAAIKwAAACt1ZHRhAAAAI6llbmMAFwAAdmxjIDIuMi4xIHN0cmVhbSBvdXRwdXQAAAAId2lkZQAACRRtZGF0AAACrgX//6vcRem95tlIt5Ys2CDZI+7veDI2NCAtIGNvcmUgMTQyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDEzIG1lPWhleCBzdWJtZT03IHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTEgdHJlbGxpcz0xIDh4OGRjdD0xIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MTIgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1hYnIgbWJ0cmVlPTEgYml0cmF0ZT0xMDAgcmF0ZXRvbD0xLjAgcWNvbXA9MC42MCBxcG1pbj0xMCBxcG1heD01MSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAU2WIhAAQ/8ltlOe+cTZuGkKg+aRtuivcDZ0pBsfsEi9p/i1yU9DxS2lq4dXTinViF1URBKXgnzKBd/Uh1bkhHtMrwrRcOJslD01UB+fyaL6ef+DBAAAAFEGaJGxBD5B+v+a+4QqF3MgBXz9MAAAACkGeQniH/+94r6EAAAAKAZ5hdEN/8QytwAAAAAgBnmNqQ3/EgQAAAA5BmmhJqEFomUwIIf/+4QAAAApBnoZFESw//76BAAAACAGepXRDf8SBAAAACAGep2pDf8SAAAAADkGarEmoQWyZTAgh//7gAAAACkGeykUVLD//voEAAAAIAZ7pdEN/xIAAAAAIAZ7rakN/xIAAAAAOQZrwSahBbJlMCCH//uEAAAAKQZ8ORRUsP/++gQAAAAgBny10Q3/EgQAAAAgBny9qQ3/EgAAAAA5BmzRJqEFsmUwIIf/+4AAAAApBn1JFFSw//76BAAAACAGfcXRDf8SAAAAACAGfc2pDf8SAAAAADkGbeEmoQWyZTAgh//7hAAAACkGflkUVLD//voAAAAAIAZ+1dEN/xIEAAAAIAZ+3akN/xIEAAAAOQZu8SahBbJlMCCH//uAAAAAKQZ/aRRUsP/++gQAAAAgBn/l0Q3/EgAAAAAgBn/tqQ3/EgQAAAA5Bm+BJqEFsmUwIIf/+4QAAAApBnh5FFSw//76AAAAACAGePXRDf8SAAAAACAGeP2pDf8SBAAAADkGaJEmoQWyZTAgh//7gAAAACkGeQkUVLD//voEAAAAIAZ5hdEN/xIAAAAAIAZ5jakN/xIEAAAAOQZpoSahBbJlMCCH//uEAAAAKQZ6GRRUsP/++gQAAAAgBnqV0Q3/EgQAAAAgBnqdqQ3/EgAAAAA5BmqxJqEFsmUwIIf/+4AAAAApBnspFFSw//76BAAAACAGe6XRDf8SAAAAACAGe62pDf8SAAAAADkGa8EmoQWyZTAgh//7hAAAACkGfDkUVLD//voEAAAAIAZ8tdEN/xIEAAAAIAZ8vakN/xIAAAAAOQZs0SahBbJlMCCH//uAAAAAKQZ9SRRUsP/++gQAAAAgBn3F0Q3/EgAAAAAgBn3NqQ3/EgAAAAA5Bm3hJqEFsmUwIIf/+4QAAAApBn5ZFFSw//76AAAAACAGftXRDf8SBAAAACAGft2pDf8SBAAAADkGbvEmoQWyZTAgh//7gAAAACkGf2kUVLD//voEAAAAIAZ/5dEN/xIAAAAAIAZ/7akN/xIEAAAAOQZvgSahBbJlMCCH//uEAAAAKQZ4eRRUsP/++gAAAAAgBnj10Q3/EgAAAAAgBnj9qQ3/EgQAAAA5BmiRJqEFsmUwIIf/+4AAAAApBnkJFFSw//76BAAAACAGeYXRDf8SAAAAACAGeY2pDf8SBAAAADkGaaEmoQWyZTAgh//7hAAAACkGehkUVLD//voEAAAAIAZ6ldEN/xIEAAAAIAZ6nakN/xIAAAAAOQZqsSahBbJlMCCH//uAAAAAKQZ7KRRUsP/++gQAAAAgBnul0Q3/EgAAAAAgBnutqQ3/EgAAAAA5BmvBJqEFsmUwIIf/+4QAAAApBnw5FFSw//76BAAAACAGfLXRDf8SBAAAACAGfL2pDf8SAAAAADkGbNEmoQWyZTAgh//7gAAAACkGfUkUVLD//voEAAAAIAZ9xdEN/xIAAAAAIAZ9zakN/xIAAAAAOQZt4SahBbJlMCCH//uEAAAAKQZ+WRRUsP/++gAAAAAgBn7V0Q3/EgQAAAAgBn7dqQ3/EgQAAAA5Bm7xJqEFsmUwIIf/+4AAAAApBn9pFFSw//76BAAAACAGf+XRDf8SAAAAACAGf+2pDf8SBAAAADkGb4EmoQWyZTAgh//7hAAAACkGeHkUVLD//voAAAAAIAZ49dEN/xIAAAAAIAZ4/akN/xIEAAAAOQZokSahBbJlMCCH//uAAAAAKQZ5CRRUsP/++gQAAAAgBnmF0Q3/EgAAAAAgBnmNqQ3/EgQAAAA5BmmhJqEFsmUwIIf/+4QAAAApBnoZFFSw//76BAAAACAGepXRDf8SBAAAACAGep2pDf8SAAAAADkGarEmoQWyZTAgh//7gAAAACkGeykUVLD//voEAAAAIAZ7pdEN/xIAAAAAIAZ7rakN/xIAAAAAPQZruSahBbJlMFEw3//7B');
      video.play();
    }
  };

  this.release = function() {
    video.pause();
    video.src = '';
  };
}

function iOSWakeLock() {
  var timer = null;

  this.request = function() {
    if (!timer) {
      timer = setInterval(function() {
        window.location = window.location;
        setTimeout(window.stop, 0);
      }, 30000);
    }
  }

  this.release = function() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
}


function getWakeLock() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    return iOSWakeLock;
  } else {
    return AndroidWakeLock;
  }
}

module.exports = getWakeLock();

},{"./util.js":13}],16:[function(require,module,exports){
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ButtonManager = require('./button-manager.js');
var CardboardDistorter = require('./cardboard-distorter.js');
var DeviceInfo = require('./device-info.js');
var Dpdb = require('./dpdb.js');
var Emitter = require('./emitter.js');
var Modes = require('./modes.js');
var RotateInstructions = require('./rotate-instructions.js');
var Util = require('./util.js');
var ViewerSelector = require('./viewer-selector.js');
var Wakelock = require('./wakelock.js');

/**
 * Helper for getting in and out of VR mode.
 * Here we assume VR mode == full screen mode.
 *
 * 1. Detects whether or not VR mode is possible by feature detecting for
 * WebVR (or polyfill).
 *
 * 2. If WebVR is available, shows a button that lets you enter VR mode.
 *
 * 3. Provides Cardboard-style distortion if the webvr-polyfill is being used.
 *
 * 4. Provides best practices while in VR mode.
 * - Full screen
 * - Wake lock
 * - Orientation lock (mobile only)
 */
function WebVRManager(renderer, effect, params) {
  this.params = params || {};

  this.mode = Modes.UNKNOWN;

  // Set option to hide the button.
  this.hideButton = this.params.hideButton || false;
  // Whether or not the FOV should be distorted or un-distorted. By default, it
  // should be distorted, but in the case of vertex shader based distortion,
  // ensure that we use undistorted parameters.
  this.isUndistorted = !!this.params.isUndistorted;

  // Save the THREE.js renderer and effect for later.
  this.renderer = renderer;
  this.effect = effect;
  this.button = new ButtonManager();
  this.rotateInstructions = new RotateInstructions();
  this.viewerSelector = new ViewerSelector(DeviceInfo.Viewers);

  // Load the DPDB.
  var shouldFetch = !WebVRConfig.NO_DPDB_FETCH;
  this.dpdb = new Dpdb(shouldFetch, this.onDeviceParamsUpdated_.bind(this));

  // Create device info and set the correct default viewer.
  this.deviceInfo = new DeviceInfo(this.dpdb.getDeviceParams());
  this.deviceInfo.viewer = DeviceInfo.Viewers[this.viewerSelector.selectedKey];
  void 0;

  this.distorter = new CardboardDistorter(renderer);
  this.distorter.updateDeviceInfo(this.deviceInfo);

  this.isVRCompatible = false;
  this.isFullscreenDisabled = !!Util.getQueryParameter('no_fullscreen');
  this.startMode = Modes.NORMAL;
  var startModeParam = parseInt(Util.getQueryParameter('start_mode'));
  if (!isNaN(startModeParam)) {
    this.startMode = startModeParam;
  }

  // Set the correct viewer profile, but only if this is Cardboard.
  if (Util.isMobile()) {
    this.onViewerChanged_(this.getViewer());
  }
  // Listen for changes to the viewer.
  this.viewerSelector.on('change', this.onViewerChanged_.bind(this));

  if (this.hideButton) {
    this.button.setVisibility(false);
  }

  // Check if the browser is compatible with WebVR.
  this.getDeviceByType_(HMDVRDevice).then(function(hmd) {
    // Activate either VR or Immersive mode.
    if (WebVRConfig.FORCE_DISTORTION) {
      this.distorter.setActive(true);
      this.isVRCompatible = true;
    } else if (hmd) {
      this.isVRCompatible = true;
      // Only enable distortion if we are dealing using the polyfill, we have a
      // perfect device match, and it's not prevented via configuration.
      if (hmd.deviceName.indexOf('webvr-polyfill') == 0 && this.deviceInfo.getDevice() &&
          !WebVRConfig.PREVENT_DISTORTION) {
        this.distorter.setActive(true);
      }
      this.hmd = hmd;
    }
    // Set the right mode.
    switch (this.startMode) {
      case Modes.MAGIC_WINDOW:
        this.normalToMagicWindow_();
        this.setMode_(Modes.MAGIC_WINDOW);
        break;
      case Modes.VR:
        this.anyModeToVR_();
        this.setMode_(Modes.VR);
        break;
      default:
        this.setMode_(Modes.NORMAL);
    }
    this.button.on('fs', this.onFSClick_.bind(this));
    this.button.on('vr', this.onVRClick_.bind(this));
    this.button.on('back', this.onBackClick_.bind(this));
    this.button.on('settings', this.onSettingsClick_.bind(this));
    this.emit('initialized');
  }.bind(this));

  // Save the input device for later sending timing data.
  this.getDeviceByType_(PositionSensorVRDevice).then(function(input) {
    this.input = input;
  }.bind(this));

  // Whenever we enter fullscreen, we are entering VR or immersive mode.
  document.addEventListener('webkitfullscreenchange',
      this.onFullscreenChange_.bind(this));
  document.addEventListener('mozfullscreenchange',
      this.onFullscreenChange_.bind(this));
  window.addEventListener('orientationchange',
      this.onOrientationChange_.bind(this));

  // Create the necessary elements for wake lock to work.
  this.wakelock = new Wakelock();

  // Save whether or not we want the touch panner to be enabled or disabled by
  // default.
  this.isTouchPannerEnabled = !WebVRConfig.TOUCH_PANNER_DISABLED;

}

WebVRManager.prototype = new Emitter();

// Expose these values externally.
WebVRManager.Modes = Modes;

/**
 * Promise returns true if there is at least one HMD device available.
 */
WebVRManager.prototype.getDeviceByType_ = function(type) {
  return new Promise(function(resolve, reject) {
    navigator.getVRDevices().then(function(devices) {
      // Promise succeeds, but check if there are any devices actually.
      for (var i = 0; i < devices.length; i++) {
        if (devices[i] instanceof type) {
          resolve(devices[i]);
          break;
        }
      }
      resolve(null);
    }, function() {
      // No devices are found.
      resolve(null);
    });
  });
};

WebVRManager.prototype.isVRMode = function() {
  return this.mode == Modes.VR;
};

WebVRManager.prototype.getViewer = function() {
  return this.deviceInfo.viewer;
};

WebVRManager.prototype.getDevice = function() {
  return this.deviceInfo.device;
};

WebVRManager.prototype.getDeviceInfo = function() {
  return this.deviceInfo;
};

WebVRManager.prototype.render = function(scene, camera, timestamp) {
  this.resizeIfNeeded_(camera);

  if (this.isVRMode()) {
    this.distorter.preRender();
    this.effect.render(scene, camera);
    this.distorter.postRender();
  } else {
    // Scene may be an array of two scenes, one for each eye.
    if (scene instanceof Array) {
      this.renderer.render(scene[0], camera);
    } else {
      this.renderer.render(scene, camera);
    }
  }
};


WebVRManager.prototype.setMode_ = function(mode) {
  var oldMode = this.mode;
  if (mode == this.mode) {
    void 0;
    return;
  }
  void 0;
  this.mode = mode;
  this.button.setMode(mode, this.isVRCompatible);

  if (this.mode == Modes.VR && Util.isLandscapeMode() && Util.isMobile()) {
    // In landscape mode, temporarily show the "put into Cardboard"
    // interstitial. Otherwise, do the default thing.
    this.rotateInstructions.showTemporarily(3000);
  } else {
    this.updateRotateInstructions_();
  }

  // Also hide the viewer selector.
  this.viewerSelector.hide();

  // Emit an event indicating the mode changed.
  this.emit('modechange', mode, oldMode);

  // Note: This is a nasty hack since we need to communicate to the polyfill
  // that touch panning is disabled, and the only way to do this currently is
  // via WebVRConfig.
  // TODO: Maybe move touch panning to the boilerplate to eliminate the hack.
  //
  // If we are in VR mode, always disable touch panning.
  if (this.isTouchPannerEnabled) {
    if (this.mode == Modes.VR) {
      WebVRConfig.TOUCH_PANNER_DISABLED = true;
    } else {
      WebVRConfig.TOUCH_PANNER_DISABLED = false;
    }
  }

  if (this.mode == Modes.VR) {
    // In VR mode, set the HMDVRDevice parameters.
    this.setHMDVRDeviceParams_(this.getViewer());
  }
};

/**
 * Main button was clicked.
 */
WebVRManager.prototype.onFSClick_ = function() {
  switch (this.mode) {
    case Modes.NORMAL:
      // TODO: Remove this hack when iOS has fullscreen mode.
      // If this is an iframe on iOS, break out and open in no_fullscreen mode.
      if (Util.isIOS() && Util.isIFrame()) {
        var url = window.location.href;
        url = Util.appendQueryParameter(url, 'no_fullscreen', 'true');
        url = Util.appendQueryParameter(url, 'start_mode', Modes.MAGIC_WINDOW);
        top.location.href = url;
        return;
      }
      this.normalToMagicWindow_();
      this.setMode_(Modes.MAGIC_WINDOW);
      break;
    case Modes.MAGIC_WINDOW:
      if (this.isFullscreenDisabled) {
        window.history.back();
      } else {
        this.anyModeToNormal_();
        this.setMode_(Modes.NORMAL);
      }
      break;
  }
};

/**
 * The VR button was clicked.
 */
WebVRManager.prototype.onVRClick_ = function() {
  // TODO: Remove this hack when iOS has fullscreen mode.
  // If this is an iframe on iOS, break out and open in no_fullscreen mode.
  if (this.mode == Modes.NORMAL && Util.isIOS() && Util.isIFrame()) {
    var url = window.location.href;
    url = Util.appendQueryParameter(url, 'no_fullscreen', 'true');
    url = Util.appendQueryParameter(url, 'start_mode', Modes.VR);
    top.location.href = url;
    return;
  }
  this.anyModeToVR_();
  this.setMode_(Modes.VR);
};

/**
 * Back button was clicked.
 */
WebVRManager.prototype.onBackClick_ = function() {
  if (this.isFullscreenDisabled) {
    window.history.back();
  } else {
    this.anyModeToNormal_();
    this.setMode_(Modes.NORMAL);
  }
};

WebVRManager.prototype.onSettingsClick_ = function() {
  // Show the viewer selection dialog.
  this.viewerSelector.show();
};

/**
 *
 * Methods to go between modes.
 *
 */
WebVRManager.prototype.normalToMagicWindow_ = function() {
  // TODO: Re-enable pointer lock after debugging.
  //this.requestPointerLock_();
  this.requestFullscreen_();
  this.wakelock.request();
};

WebVRManager.prototype.anyModeToVR_ = function() {
  // Don't do orientation locking for consistency.
  //this.requestOrientationLock_();
  this.requestFullscreen_();
  //this.effect.setFullScreen(true);
  this.wakelock.request();
  this.distorter.patch();
};

WebVRManager.prototype.vrToMagicWindow_ = function() {
  //this.releaseOrientationLock_();
  this.distorter.unpatch();

  // Android bug: when returning from VR, resize the effect.
  this.resize_();
}

WebVRManager.prototype.anyModeToNormal_ = function() {
  //this.effect.setFullScreen(false);
  this.exitFullscreen_();
  //this.releaseOrientationLock_();
  this.releasePointerLock_();
  this.wakelock.release();
  this.distorter.unpatch();

  // Android bug: when returning from VR, resize the effect.
  this.resize_();
};

WebVRManager.prototype.resizeIfNeeded_ = function(camera) {
  // Only resize the canvas if it needs to be resized.
  var size = this.renderer.getSize();
  if (size.width != window.innerWidth || size.height != window.innerHeight) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    this.resize_();
  }
};

WebVRManager.prototype.resize_ = function() {
  this.effect.setSize(window.innerWidth, window.innerHeight);
};

WebVRManager.prototype.onOrientationChange_ = function(e) {
  this.updateRotateInstructions_();
  // Also hide the viewer selector.
  this.viewerSelector.hide();
};

WebVRManager.prototype.updateRotateInstructions_ = function() {
  this.rotateInstructions.disableShowTemporarily();
  // In portrait VR mode, tell the user to rotate to landscape.
  if (this.mode == Modes.VR && !Util.isLandscapeMode() && Util.isMobile()) {
    this.rotateInstructions.show();
  } else {
    this.rotateInstructions.hide();
  }
};

WebVRManager.prototype.onFullscreenChange_ = function(e) {
  // If we leave full-screen, go back to normal mode.
  if (document.webkitFullscreenElement === null ||
      document.mozFullScreenElement === null) {
    this.anyModeToNormal_();
    this.setMode_(Modes.NORMAL);
  }
};

WebVRManager.prototype.requestPointerLock_ = function() {
  var canvas = this.renderer.domElement;
  canvas.requestPointerLock = canvas.requestPointerLock ||
      canvas.mozRequestPointerLock ||
      canvas.webkitRequestPointerLock;

  if (canvas.requestPointerLock) {
    canvas.requestPointerLock();
  }
};

WebVRManager.prototype.releasePointerLock_ = function() {
  document.exitPointerLock = document.exitPointerLock ||
      document.mozExitPointerLock ||
      document.webkitExitPointerLock;

  if (document.exitPointerLock) {
    document.exitPointerLock();
  }
};

WebVRManager.prototype.requestOrientationLock_ = function() {
  if (screen.orientation && Util.isMobile()) {
    screen.orientation.lock('landscape');
  }
};

WebVRManager.prototype.releaseOrientationLock_ = function() {
  if (screen.orientation) {
    screen.orientation.unlock();
  }
};

WebVRManager.prototype.requestFullscreen_ = function() {
  var canvas = document.body;
  //var canvas = this.renderer.domElement;
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen({vrDisplay: this.hmd});
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen({vrDisplay: this.hmd});
  }
};

WebVRManager.prototype.exitFullscreen_ = function() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

WebVRManager.prototype.onViewerChanged_ = function(viewer) {
  this.deviceInfo.setViewer(viewer);

  // Update the distortion appropriately.
  this.distorter.updateDeviceInfo(this.deviceInfo);

  // And update the HMDVRDevice parameters.
  this.setHMDVRDeviceParams_(viewer);

  // Notify anyone interested in this event.
  this.emit('viewerchange', viewer);
};

/**
 * Sets parameters on CardboardHMDVRDevice. These changes are ultimately handled
 * by VREffect.
 */
WebVRManager.prototype.setHMDVRDeviceParams_ = function(viewer) {
  this.getDeviceByType_(HMDVRDevice).then(function(hmd) {
    if (!hmd) {
      return;
    }

    // If we can set fields of view, do that now.
    if (hmd.setFieldOfView) {
      // Calculate the optimal field of view for each eye.
      hmd.setFieldOfView(this.deviceInfo.getFieldOfViewLeftEye(this.isUndistorted),
                         this.deviceInfo.getFieldOfViewRightEye(this.isUndistorted));
    }

    // Note: setInterpupillaryDistance is not part of the WebVR standard.
    if (hmd.setInterpupillaryDistance) {
      hmd.setInterpupillaryDistance(viewer.interLensDistance);
    }

    if (hmd.setRenderRect) {
      // TODO(smus): If we can set the render rect, do it.
      //var renderRect = this.deviceInfo.getUndistortedViewportLeftEye();
      //hmd.setRenderRect(renderRect, renderRect);
    }
  }.bind(this));
};

WebVRManager.prototype.onDeviceParamsUpdated_ = function(newParams) {
  void 0;
  this.deviceInfo.updateDeviceParams(newParams);
  this.distorter.updateDeviceInfo(this.deviceInfo);
}

module.exports = WebVRManager;

},{"./button-manager.js":2,"./cardboard-distorter.js":3,"./device-info.js":4,"./dpdb.js":8,"./emitter.js":9,"./modes.js":11,"./rotate-instructions.js":12,"./util.js":13,"./viewer-selector.js":14,"./wakelock.js":15}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWVicmV3L2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9hbGlnbmVyLmpzIiwic3JjL2J1dHRvbi1tYW5hZ2VyLmpzIiwic3JjL2NhcmRib2FyZC1kaXN0b3J0ZXIuanMiLCJzcmMvZGV2aWNlLWluZm8uanMiLCJzcmMvZGlzdG9ydGlvbi9iYXJyZWwtZGlzdG9ydGlvbi1mcmFnbWVudC12Mi5qcyIsInNyYy9kaXN0b3J0aW9uL2Rpc3RvcnRpb24uanMiLCJzcmMvZHBkYi1jYWNoZS5qcyIsInNyYy9kcGRiLmpzIiwic3JjL2VtaXR0ZXIuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9tb2Rlcy5qcyIsInNyYy9yb3RhdGUtaW5zdHJ1Y3Rpb25zLmpzIiwic3JjL3V0aWwuanMiLCJzcmMvdmlld2VyLXNlbGVjdG9yLmpzIiwic3JjL3dha2Vsb2NrLmpzIiwic3JjL3dlYnZyLW1hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3MUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFJlc3BvbnNpYmxlIGZvciBzaG93aW5nIHRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgVUkgdGhhdCBzZXBhcmF0ZXMgbGVmdCBhbmRcbiAqIHJpZ2h0IGV5ZSBpbWFnZXMuXG4gKi9cbmZ1bmN0aW9uIEFsaWduZXIoKSB7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB2YXIgcyA9IGVsLnN0eWxlO1xuICBzLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgcy5iYWNrZ3JvdW5kID0gJ3doaXRlJztcbiAgcy53aWR0aCA9ICcycHgnO1xuICBzLnRvcCA9ICcwcHgnO1xuICBzLmJvdHRvbSA9ICc0OHB4JztcbiAgcy5sZWZ0ID0gJzUwJSc7XG4gIHMuZGlzcGxheSA9ICdub25lJztcbiAgcy5tYXJnaW5MZWZ0ID0gJy0ycHgnO1xuICBzLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICBzLmJvcmRlclRvcCA9ICcwcHgnO1xuICB0aGlzLmVsID0gZWw7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG59XG5cbkFsaWduZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn07XG5cbkFsaWduZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBbGlnbmVyO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxudmFyIEFsaWduZXIgPSByZXF1aXJlKCcuL2FsaWduZXIuanMnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnLi9lbWl0dGVyLmpzJyk7XG52YXIgTW9kZXMgPSByZXF1aXJlKCcuL21vZGVzLmpzJyk7XG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgaGF2aW5nIHRvIGRvIHdpdGggdGhlIFdlYlZSIGJ1dHRvbi5cbiAqIEVtaXRzIGEgJ2NsaWNrJyBldmVudCB3aGVuIGl0J3MgY2xpY2tlZC5cbiAqL1xuZnVuY3Rpb24gQnV0dG9uTWFuYWdlcigpIHtcbiAgdGhpcy5sb2FkSWNvbnNfKCk7XG5cbiAgLy8gTWFrZSB0aGUgZnVsbHNjcmVlbiBidXR0b24uXG4gIHZhciBmc0J1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKCk7XG4gIGZzQnV0dG9uLnNyYyA9IHRoaXMuSUNPTlMuZnVsbHNjcmVlbjtcbiAgZnNCdXR0b24udGl0bGUgPSAnRnVsbHNjcmVlbiBtb2RlJztcbiAgdmFyIHMgPSBmc0J1dHRvbi5zdHlsZTtcbiAgcy5ib3R0b20gPSAwO1xuICBzLnJpZ2h0ID0gMDtcbiAgZnNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNyZWF0ZUNsaWNrSGFuZGxlcl8oJ2ZzJykpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZzQnV0dG9uKTtcbiAgdGhpcy5mc0J1dHRvbiA9IGZzQnV0dG9uO1xuXG4gIC8vIE1ha2UgdGhlIFZSIGJ1dHRvbi5cbiAgdmFyIHZyQnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oKTtcbiAgdnJCdXR0b24uc3JjID0gdGhpcy5JQ09OUy5jYXJkYm9hcmQ7XG4gIHZyQnV0dG9uLnRpdGxlID0gJ1ZpcnR1YWwgcmVhbGl0eSBtb2RlJztcbiAgdmFyIHMgPSB2ckJ1dHRvbi5zdHlsZTtcbiAgcy5ib3R0b20gPSAwO1xuICBzLnJpZ2h0ID0gJzQ4cHgnO1xuICB2ckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY3JlYXRlQ2xpY2tIYW5kbGVyXygndnInKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodnJCdXR0b24pO1xuICB0aGlzLnZyQnV0dG9uID0gdnJCdXR0b247XG5cbiAgLy8gTWFrZSB0aGUgYmFjayBidXR0b24uXG4gIHZhciBiYWNrQnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oKTtcbiAgYmFja0J1dHRvbi50aXRsZSA9ICdCYWNrIHRvIHByZXZpb3VzIG1vZGUnO1xuICB2YXIgcyA9IGJhY2tCdXR0b24uc3R5bGU7XG4gIHMubGVmdCA9IDA7XG4gIHMudG9wID0gMDtcbiAgYmFja0J1dHRvbi5zcmMgPSB0aGlzLklDT05TLmJhY2s7XG4gIGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNyZWF0ZUNsaWNrSGFuZGxlcl8oJ2JhY2snKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFja0J1dHRvbik7XG4gIHRoaXMuYmFja0J1dHRvbiA9IGJhY2tCdXR0b247XG5cbiAgLy8gTWFrZSB0aGUgc2V0dGluZ3MgYnV0dG9uLCBidXQgb25seSBmb3IgbW9iaWxlLlxuICB2YXIgc2V0dGluZ3NCdXR0b24gPSB0aGlzLmNyZWF0ZUJ1dHRvbigpO1xuICBzZXR0aW5nc0J1dHRvbi50aXRsZSA9ICdDb25maWd1cmUgdmlld2VyJztcbiAgdmFyIHMgPSBzZXR0aW5nc0J1dHRvbi5zdHlsZTtcbiAgcy5sZWZ0ID0gJzUwJSc7XG4gIHMubWFyZ2luTGVmdCA9ICctMjRweCc7XG4gIHMuYm90dG9tID0gMDtcbiAgcy56SW5kZXggPSAwO1xuICBzZXR0aW5nc0J1dHRvbi5zcmMgPSB0aGlzLklDT05TLnNldHRpbmdzO1xuICBzZXR0aW5nc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY3JlYXRlQ2xpY2tIYW5kbGVyXygnc2V0dGluZ3MnKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2V0dGluZ3NCdXR0b24pO1xuICB0aGlzLnNldHRpbmdzQnV0dG9uID0gc2V0dGluZ3NCdXR0b247XG5cbiAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuXG4gIHRoaXMuYWxpZ25lciA9IG5ldyBBbGlnbmVyKCk7XG5cbn1cbkJ1dHRvbk1hbmFnZXIucHJvdG90eXBlID0gbmV3IEVtaXR0ZXIoKTtcblxuQnV0dG9uTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlQnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgYnV0dG9uLmNsYXNzTmFtZSA9ICd3ZWJ2ci1idXR0b24nO1xuICB2YXIgcyA9IGJ1dHRvbi5zdHlsZTtcbiAgcy5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gIHMud2lkdGggPSAnMjRweCdcbiAgcy5oZWlnaHQgPSAnMjRweCc7XG4gIHMuYmFja2dyb3VuZFNpemUgPSAnY292ZXInO1xuICBzLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gIHMuYm9yZGVyID0gMDtcbiAgcy51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICBzLndlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gIHMuTW96VXNlclNlbGVjdCA9ICdub25lJztcbiAgcy5jdXJzb3IgPSAncG9pbnRlcic7XG4gIHMucGFkZGluZyA9ICcxMnB4JztcbiAgcy56SW5kZXggPSAxO1xuICBzLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgLy8gUHJldmVudCBidXR0b24gZnJvbSBiZWluZyBzZWxlY3RlZCBhbmQgZHJhZ2dlZC5cbiAgYnV0dG9uLmRyYWdnYWJsZSA9IGZhbHNlO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgLy8gU3R5bGUgaXQgb24gaG92ZXIuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSkge1xuICAgIHMuZmlsdGVyID0gcy53ZWJraXRGaWx0ZXIgPSAnZHJvcC1zaGFkb3coMCAwIDVweCByZ2JhKDI1NSwyNTUsMjU1LDEpKSc7XG4gIH0pO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICBzLmZpbHRlciA9IHMud2Via2l0RmlsdGVyID0gJyc7XG4gIH0pO1xuICByZXR1cm4gYnV0dG9uO1xufTtcblxuQnV0dG9uTWFuYWdlci5wcm90b3R5cGUuc2V0TW9kZSA9IGZ1bmN0aW9uKG1vZGUsIGlzVlJDb21wYXRpYmxlKSB7XG4gIGlmICghdGhpcy5pc1Zpc2libGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpdGNoIChtb2RlKSB7XG4gICAgY2FzZSBNb2Rlcy5OT1JNQUw6XG4gICAgICB0aGlzLmZzQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy5mc0J1dHRvbi5zcmMgPSB0aGlzLklDT05TLmZ1bGxzY3JlZW47XG4gICAgICB0aGlzLnZyQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAoaXNWUkNvbXBhdGlibGUgPyAnYmxvY2snIDogJ25vbmUnKTtcbiAgICAgIHRoaXMuYmFja0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5zZXR0aW5nc0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5hbGlnbmVyLmhpZGUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTW9kZXMuTUFHSUNfV0lORE9XOlxuICAgICAgdGhpcy5mc0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZnNCdXR0b24uc3JjID0gdGhpcy5JQ09OUy5leGl0RnVsbHNjcmVlbjtcbiAgICAgIHRoaXMudnJCdXR0b24uc3R5bGUuZGlzcGxheSA9IChpc1ZSQ29tcGF0aWJsZSA/ICdibG9jaycgOiAnbm9uZScpO1xuICAgICAgdGhpcy5iYWNrQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy5zZXR0aW5nc0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5hbGlnbmVyLmhpZGUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTW9kZXMuVlI6XG4gICAgICB0aGlzLmZzQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLnZyQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAvLyBIYWNrIGZvciBGaXJlZm94LCBzaW5jZSBpdCBkb2Vzbid0IGRpc3BsYXkgSFRNTCBjb250ZW50IGNvcnJlY3RseSBpblxuICAgICAgLy8gVlIgYXQgdGhlIG1vbWVudC5cbiAgICAgIHRoaXMuYmFja0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gVXRpbC5pc0ZpcmVmb3goKSA/ICdub25lJyA6ICdibG9jayc7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNldHRpbmdzIGJ1dHRvbiBvbiBtb2JpbGUuXG4gICAgICB2YXIgaXNTZXR0aW5nc1Zpc2libGUgPSBVdGlsLmlzTW9iaWxlKCkgfHwgV2ViVlJDb25maWcuRk9SQ0VfRU5BQkxFX1ZSO1xuICAgICAgdGhpcy5zZXR0aW5nc0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gaXNTZXR0aW5nc1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgdGhpcy5hbGlnbmVyLnNob3coKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gSGFjayBmb3IgU2FmYXJpIE1hYy9pT1MgdG8gZm9yY2UgcmVsYXlvdXQgKHN2Zy1zcGVjaWZpYyBpc3N1ZSlcbiAgLy8gaHR0cDovL2dvby5nbC9oamdSNnJcbiAgdmFyIG9sZFZhbHVlID0gdGhpcy5mc0J1dHRvbi5zdHlsZS5kaXNwbGF5O1xuICB0aGlzLmZzQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgdGhpcy5mc0J1dHRvbi5vZmZzZXRIZWlnaHQ7XG4gIHRoaXMuZnNCdXR0b24uc3R5bGUuZGlzcGxheSA9IG9sZFZhbHVlO1xufTtcblxuQnV0dG9uTWFuYWdlci5wcm90b3R5cGUuc2V0VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGlzVmlzaWJsZSkge1xuICB0aGlzLmlzVmlzaWJsZSA9IGlzVmlzaWJsZTtcbiAgdGhpcy5mc0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgdGhpcy52ckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gaXNWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgdGhpcy5iYWNrQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBpc1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xufTtcblxuQnV0dG9uTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlQ2xpY2tIYW5kbGVyXyA9IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuZW1pdChldmVudE5hbWUpO1xuICB9LmJpbmQodGhpcyk7XG59O1xuXG5CdXR0b25NYW5hZ2VyLnByb3RvdHlwZS5sb2FkSWNvbnNfID0gZnVuY3Rpb24oKSB7XG4gIC8vIFByZWxvYWQgc29tZSBoYXJkLWNvZGVkIFNWRy5cbiAgdGhpcy5JQ09OUyA9IHt9O1xuICB0aGlzLklDT05TLmNhcmRib2FyZCA9IFV0aWwuYmFzZTY0KCdpbWFnZS9zdmcreG1sJywgJ1BITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOSEI0SWlCb1pXbG5hSFE5SWpJMGNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0lnWm1sc2JEMGlJMFpHUmtaR1JpSStDaUFnSUNBOGNHRjBhQ0JrUFNKTk1qQXVOelFnTmtnekxqSXhRekl1TlRVZ05pQXlJRFl1TlRjZ01pQTNMakk0ZGpFd0xqUTBZekFnTGpjdU5UVWdNUzR5T0NBeExqSXpJREV1TWpob05DNDNPV011TlRJZ01DQXVPVFl0TGpNeklERXVNVFF0TGpjNWJERXVOQzB6TGpRNFl5NHlNeTB1TlRrdU56a3RNUzR3TVNBeExqUTBMVEV1TURGek1TNHlNUzQwTWlBeExqUTFJREV1TURGc01TNHpPU0F6TGpRNFl5NHhPUzQwTmk0Mk15NDNPU0F4TGpFeExqYzVhRFF1TnpsakxqY3hJREFnTVM0eU5pMHVOVGNnTVM0eU5pMHhMakk0VmpjdU1qaGpNQzB1TnkwdU5UVXRNUzR5T0MweExqSTJMVEV1TWpoNlRUY3VOU0F4TkM0Mk1tTXRNUzR4TnlBd0xUSXVNVE10TGprMUxUSXVNVE10TWk0eE1pQXdMVEV1TVRjdU9UWXRNaTR4TXlBeUxqRXpMVEl1TVRNZ01TNHhPQ0F3SURJdU1USXVPVFlnTWk0eE1pQXlMakV6Y3kwdU9UVWdNaTR4TWkweUxqRXlJREl1TVRKNmJUa2dNR010TVM0eE55QXdMVEl1TVRNdExqazFMVEl1TVRNdE1pNHhNaUF3TFRFdU1UY3VPVFl0TWk0eE15QXlMakV6TFRJdU1UTnpNaTR4TWk0NU5pQXlMakV5SURJdU1UTXRMamsxSURJdU1USXRNaTR4TWlBeUxqRXllaUl2UGdvZ0lDQWdQSEJoZEdnZ1ptbHNiRDBpYm05dVpTSWdaRDBpVFRBZ01HZ3lOSFl5TkVnd1ZqQjZJaTgrQ2p3dmMzWm5QZ289Jyk7XG4gIHRoaXMuSUNPTlMuZnVsbHNjcmVlbiA9IFV0aWwuYmFzZTY0KCdpbWFnZS9zdmcreG1sJywgJ1BITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOSEI0SWlCb1pXbG5hSFE5SWpJMGNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0lnWm1sc2JEMGlJMFpHUmtaR1JpSStDaUFnSUNBOGNHRjBhQ0JrUFNKTk1DQXdhREkwZGpJMFNEQjZJaUJtYVd4c1BTSnViMjVsSWk4K0NpQWdJQ0E4Y0dGMGFDQmtQU0pOTnlBeE5FZzFkalZvTlhZdE1rZzNkaTB6ZW0wdE1pMDBhREpXTjJnelZqVklOWFkxZW0weE1pQTNhQzB6ZGpKb05YWXROV2d0TW5ZemVrMHhOQ0ExZGpKb00zWXphREpXTldndE5Yb2lMejRLUEM5emRtYytDZz09Jyk7XG4gIHRoaXMuSUNPTlMuZXhpdEZ1bGxzY3JlZW4gPSBVdGlsLmJhc2U2NCgnaW1hZ2Uvc3ZnK3htbCcsICdQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkhCNElpQm9aV2xuYUhROUlqSTBjSGdpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJZ1ptbHNiRDBpSTBaR1JrWkdSaUkrQ2lBZ0lDQThjR0YwYUNCa1BTSk5NQ0F3YURJMGRqSTBTREI2SWlCbWFXeHNQU0p1YjI1bElpOCtDaUFnSUNBOGNHRjBhQ0JrUFNKTk5TQXhObWd6ZGpOb01uWXROVWcxZGpKNmJUTXRPRWcxZGpKb05WWTFTRGgyTTNwdE5pQXhNV2d5ZGkwemFETjJMVEpvTFRWMk5YcHRNaTB4TVZZMWFDMHlkalZvTlZZNGFDMHplaUl2UGdvOEwzTjJaejRLJyk7XG4gIHRoaXMuSUNPTlMuYmFjayA9IFV0aWwuYmFzZTY0KCdpbWFnZS9zdmcreG1sJywgJ1BITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOSEI0SWlCb1pXbG5hSFE5SWpJMGNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0lnWm1sc2JEMGlJMFpHUmtaR1JpSStDaUFnSUNBOGNHRjBhQ0JrUFNKTk1DQXdhREkwZGpJMFNEQjZJaUJtYVd4c1BTSnViMjVsSWk4K0NpQWdJQ0E4Y0dGMGFDQmtQU0pOTWpBZ01URklOeTQ0TTJ3MUxqVTVMVFV1TlRsTU1USWdOR3d0T0NBNElEZ2dPQ0F4TGpReExURXVOREZNTnk0NE15QXhNMGd5TUhZdE1ub2lMejRLUEM5emRtYytDZz09Jyk7XG4gIHRoaXMuSUNPTlMuc2V0dGluZ3MgPSBVdGlsLmJhc2U2NCgnaW1hZ2Uvc3ZnK3htbCcsICdQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkhCNElpQm9aV2xuYUhROUlqSTBjSGdpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJZ1ptbHNiRDBpSTBaR1JrWkdSaUkrQ2lBZ0lDQThjR0YwYUNCa1BTSk5NQ0F3YURJMGRqSTBTREI2SWlCbWFXeHNQU0p1YjI1bElpOCtDaUFnSUNBOGNHRjBhQ0JrUFNKTk1Ua3VORE1nTVRJdU9UaGpMakEwTFM0ek1pNHdOeTB1TmpRdU1EY3RMams0Y3kwdU1ETXRMalkyTFM0d055MHVPVGhzTWk0eE1TMHhMalkxWXk0eE9TMHVNVFV1TWpRdExqUXlMakV5TFM0Mk5Hd3RNaTB6TGpRMll5MHVNVEl0TGpJeUxTNHpPUzB1TXkwdU5qRXRMakl5YkMweUxqUTVJREZqTFM0MU1pMHVOQzB4TGpBNExTNDNNeTB4TGpZNUxTNDVPR3d0TGpNNExUSXVOalZETVRRdU5EWWdNaTR4T0NBeE5DNHlOU0F5SURFMElESm9MVFJqTFM0eU5TQXdMUzQwTmk0eE9DMHVORGt1TkRKc0xTNHpPQ0F5TGpZMVl5MHVOakV1TWpVdE1TNHhOeTQxT1MweExqWTVMams0YkMweUxqUTVMVEZqTFM0eU15MHVNRGt0TGpRNUlEQXRMall4TGpJeWJDMHlJRE11TkRaakxTNHhNeTR5TWkwdU1EY3VORGt1TVRJdU5qUnNNaTR4TVNBeExqWTFZeTB1TURRdU16SXRMakEzTGpZMUxTNHdOeTQ1T0hNdU1ETXVOall1TURjdU9UaHNMVEl1TVRFZ01TNDJOV010TGpFNUxqRTFMUzR5TkM0ME1pMHVNVEl1TmpSc01pQXpMalEyWXk0eE1pNHlNaTR6T1M0ekxqWXhMakl5YkRJdU5Ea3RNV011TlRJdU5DQXhMakE0TGpjeklERXVOamt1T1Roc0xqTTRJREl1TmpWakxqQXpMakkwTGpJMExqUXlMalE1TGpReWFEUmpMakkxSURBZ0xqUTJMUzR4T0M0ME9TMHVOREpzTGpNNExUSXVOalZqTGpZeExTNHlOU0F4TGpFM0xTNDFPU0F4TGpZNUxTNDVPR3d5TGpRNUlERmpMakl6TGpBNUxqUTVJREFnTGpZeExTNHlNbXd5TFRNdU5EWmpMakV5TFM0eU1pNHdOeTB1TkRrdExqRXlMUzQyTkd3dE1pNHhNUzB4TGpZMWVrMHhNaUF4TlM0MVl5MHhMamt6SURBdE15NDFMVEV1TlRjdE15NDFMVE11TlhNeExqVTNMVE11TlNBekxqVXRNeTQxSURNdU5TQXhMalUzSURNdU5TQXpMalV0TVM0MU55QXpMalV0TXk0MUlETXVOWG9pTHo0S1BDOXpkbWMrQ2c9PScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25NYW5hZ2VyO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxudmFyIEJhcnJlbERpc3RvcnRpb24gPSByZXF1aXJlKCcuL2Rpc3RvcnRpb24vYmFycmVsLWRpc3RvcnRpb24tZnJhZ21lbnQtdjIuanMnKTtcbnZhciBVdGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cblxuZnVuY3Rpb24gU2hhZGVyUGFzcyhzaGFkZXIpIHtcbiAgdGhpcy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMuY2xvbmUoc2hhZGVyLnVuaWZvcm1zKTtcblxuICB0aGlzLm1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcbiAgICBkZWZpbmVzOiBzaGFkZXIuZGVmaW5lcyB8fCB7fSxcbiAgICB1bmlmb3JtczogdGhpcy51bmlmb3JtcyxcbiAgICB2ZXJ0ZXhTaGFkZXI6IHNoYWRlci52ZXJ0ZXhTaGFkZXIsXG4gICAgZnJhZ21lbnRTaGFkZXI6IHNoYWRlci5mcmFnbWVudFNoYWRlclxuICB9KTtcblxuICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIDEsIC0xLCAwLCAxKTtcbiAgdGhpcy5zY2VuZSAgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgdGhpcy5xdWFkID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMiwgMiksIG51bGwpO1xuICB0aGlzLnNjZW5lLmFkZCh0aGlzLnF1YWQpO1xufTtcblxuU2hhZGVyUGFzcy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyRnVuYywgYnVmZmVyKSB7XG4gIHRoaXMudW5pZm9ybXMudGV4dHVyZS52YWx1ZSA9IGJ1ZmZlcjtcbiAgdGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcbiAgcmVuZGVyRnVuYyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVSZW5kZXJUYXJnZXQocmVuZGVyZXIpIHtcbiAgdmFyIHdpZHRoICA9IHJlbmRlcmVyLmNvbnRleHQuY2FudmFzLndpZHRoO1xuICB2YXIgaGVpZ2h0ID0gcmVuZGVyZXIuY29udGV4dC5jYW52YXMuaGVpZ2h0O1xuICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICBtaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlcixcbiAgICBtYWdGaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlcixcbiAgICBmb3JtYXQ6IFRIUkVFLlJHQkZvcm1hdCxcbiAgICBzdGVuY2lsQnVmZmVyOiBmYWxzZVxuICB9O1xuXG4gIHJldHVybiBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQod2lkdGgsIGhlaWdodCwgcGFyYW1ldGVycyk7XG59XG5cbmZ1bmN0aW9uIENhcmRib2FyZERpc3RvcnRlcihyZW5kZXJlcikge1xuICB0aGlzLnNoYWRlclBhc3MgPSBuZXcgU2hhZGVyUGFzcyhCYXJyZWxEaXN0b3J0aW9uKTtcbiAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXG4gIHRoaXMudGV4dHVyZVRhcmdldCA9IG51bGw7XG4gIHRoaXMuZ2VudWluZVJlbmRlciA9IHJlbmRlcmVyLnJlbmRlcjtcbiAgdGhpcy5nZW51aW5lU2V0U2l6ZSA9IHJlbmRlcmVyLnNldFNpemU7XG4gIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbn1cblxuQ2FyZGJvYXJkRGlzdG9ydGVyLnByb3RvdHlwZS5wYXRjaCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy50ZXh0dXJlVGFyZ2V0ID0gY3JlYXRlUmVuZGVyVGFyZ2V0KHRoaXMucmVuZGVyZXIpO1xuXG4gIHRoaXMucmVuZGVyZXIucmVuZGVyID0gZnVuY3Rpb24oc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyKSB7XG4gICAgdGhpcy5nZW51aW5lUmVuZGVyLmNhbGwodGhpcy5yZW5kZXJlciwgc2NlbmUsIGNhbWVyYSwgdGhpcy50ZXh0dXJlVGFyZ2V0LCBmb3JjZUNsZWFyKTtcbiAgfS5iaW5kKHRoaXMpO1xuXG4gIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmdlbnVpbmVTZXRTaXplLmNhbGwodGhpcy5yZW5kZXJlciwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy50ZXh0dXJlVGFyZ2V0ID0gY3JlYXRlUmVuZGVyVGFyZ2V0KHRoaXMucmVuZGVyZXIpO1xuICB9LmJpbmQodGhpcyk7XG59O1xuXG5DYXJkYm9hcmREaXN0b3J0ZXIucHJvdG90eXBlLnVucGF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucmVuZGVyZXIucmVuZGVyID0gdGhpcy5nZW51aW5lUmVuZGVyO1xuICB0aGlzLnJlbmRlcmVyLnNldFNpemUgPSB0aGlzLmdlbnVpbmVTZXRTaXplO1xufTtcblxuQ2FyZGJvYXJkRGlzdG9ydGVyLnByb3RvdHlwZS5wcmVSZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KHRoaXMudGV4dHVyZVRhcmdldCk7XG59O1xuXG5DYXJkYm9hcmREaXN0b3J0ZXIucHJvdG90eXBlLnBvc3RSZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBzaXplID0gdGhpcy5yZW5kZXJlci5nZXRTaXplKCk7XG4gIHRoaXMucmVuZGVyZXIuc2V0Vmlld3BvcnQoMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICB0aGlzLnNoYWRlclBhc3MucmVuZGVyKHRoaXMuZ2VudWluZVJlbmRlci5iaW5kKHRoaXMucmVuZGVyZXIpLCB0aGlzLnRleHR1cmVUYXJnZXQpO1xufTtcblxuLyoqXG4gKiBUb2dnbGVzIGRpc3RvcnRpb24uIFRoaXMgaXMgY2FsbGVkIGV4dGVybmFsbHkgYnkgdGhlIGJvaWxlcnBsYXRlLlxuICogSXQgc2hvdWxkIGJlIGVuYWJsZWQgb25seSBpZiBXZWJWUiBpcyBwcm92aWRlZCBieSBwb2x5ZmlsbC5cbiAqL1xuQ2FyZGJvYXJkRGlzdG9ydGVyLnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB0aGlzLmlzQWN0aXZlID0gc3RhdGU7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdW5pZm9ybXMuXG4gKi9cbkNhcmRib2FyZERpc3RvcnRlci5wcm90b3R5cGUudXBkYXRlRGV2aWNlSW5mbyA9IGZ1bmN0aW9uKGRldmljZUluZm8pIHtcbiAgdmFyIHVuaWZvcm1zID0gdGhpcy5zaGFkZXJQYXNzLm1hdGVyaWFsLnVuaWZvcm1zO1xuXG4gIHZhciBkaXN0b3J0ZWRQcm9qID0gZGV2aWNlSW5mby5nZXRQcm9qZWN0aW9uTWF0cml4TGVmdEV5ZSgpO1xuICB2YXIgdW5kaXN0b3J0ZWRQcm9qID0gZGV2aWNlSW5mby5nZXRQcm9qZWN0aW9uTWF0cml4TGVmdEV5ZSh0cnVlKTtcbiAgdmFyIHZpZXdwb3J0ID0gZGV2aWNlSW5mby5nZXRVbmRpc3RvcnRlZFZpZXdwb3J0TGVmdEV5ZSgpO1xuXG4gIHZhciBkZXZpY2UgPSBkZXZpY2VJbmZvLmRldmljZTtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICB4U2NhbGU6IHZpZXdwb3J0LndpZHRoIC8gKGRldmljZS53aWR0aCAvIDIpLFxuICAgIHlTY2FsZTogdmlld3BvcnQuaGVpZ2h0IC8gZGV2aWNlLmhlaWdodCxcbiAgICB4VHJhbnM6IDIgKiAodmlld3BvcnQueCArIHZpZXdwb3J0LndpZHRoIC8gMikgLyAoZGV2aWNlLndpZHRoIC8gMikgLSAxLFxuICAgIHlUcmFuczogMiAqICh2aWV3cG9ydC55ICsgdmlld3BvcnQuaGVpZ2h0IC8gMikgLyBkZXZpY2UuaGVpZ2h0IC0gMVxuICB9XG5cbiAgdW5pZm9ybXMucHJvamVjdGlvbkxlZnQudmFsdWUuY29weShcbiAgICAgIFV0aWwucHJvamVjdGlvbk1hdHJpeFRvVmVjdG9yXyhkaXN0b3J0ZWRQcm9qKSk7XG4gIHVuaWZvcm1zLnVucHJvamVjdGlvbkxlZnQudmFsdWUuY29weShcbiAgICAgIFV0aWwucHJvamVjdGlvbk1hdHJpeFRvVmVjdG9yXyh1bmRpc3RvcnRlZFByb2osIHBhcmFtcykpO1xuXG4gIC8vIFNldCBkaXN0b3J0aW9uIGNvZWZmaWNpZW50cy5cbiAgdmFyIGNvZWZmaWNpZW50cyA9IGRldmljZUluZm8udmlld2VyLmRpc3RvcnRpb25Db2VmZmljaWVudHM7XG4gIHVuaWZvcm1zLmRpc3RvcnRpb24udmFsdWUuc2V0KGNvZWZmaWNpZW50c1swXSwgY29lZmZpY2llbnRzWzFdKTtcbiAgICAgIFxuXG4gIC8vIEZvciB2aWV3ZXIgcHJvZmlsZSBkZWJ1Z2dpbmcsIHNob3cgdGhlIGxlbnMgY2VudGVyLlxuICBpZiAoV2ViVlJDb25maWcuU0hPV19FWUVfQ0VOVEVSUykge1xuICAgIHVuaWZvcm1zLnNob3dDZW50ZXIudmFsdWUgPSAxO1xuICB9XG5cbiAgLy8gQWxsb3cgY3VzdG9tIGJhY2tncm91bmQgY29sb3JzIGlmIHRoaXMgZ2xvYmFsIGlzIHNldC5cbiAgaWYgKFdlYlZSQ29uZmlnLkRJU1RPUlRJT05fQkdDT0xPUikge1xuICAgIHVuaWZvcm1zLmJhY2tncm91bmRDb2xvci52YWx1ZSA9XG4gICAgICAgIFdlYlZSQ29uZmlnLkRJU1RPUlRJT05fQkdDT0xPUjtcbiAgfVxuXG4gIHRoaXMuc2hhZGVyUGFzcy5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuXG5cbi8qKlxuICogU2V0cyBkaXN0b3J0aW9uIGNvZWZmaWNpZW50cyBhcyBhIFZlY3RvcjIuXG4gKi9cbkNhcmRib2FyZERpc3RvcnRlci5wcm90b3R5cGUuc2V0RGlzdG9ydGlvbkNvZWZmaWNpZW50cyA9IGZ1bmN0aW9uKGNvZWZmaWNpZW50cykge1xuICB2YXIgdmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMihjb2VmZmljaWVudHNbMF0sIGNvZWZmaWNpZW50c1sxXSk7XG4gIHRoaXMuc2hhZGVyUGFzcy5tYXRlcmlhbC51bmlmb3Jtcy5kaXN0b3J0aW9uLnZhbHVlID0gdmFsdWU7XG4gIHRoaXMuc2hhZGVyUGFzcy5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhcmRib2FyZERpc3RvcnRlcjtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbnZhciBEaXN0b3J0aW9uID0gcmVxdWlyZSgnLi9kaXN0b3J0aW9uL2Rpc3RvcnRpb24uanMnKTtcbnZhciBVdGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cbmZ1bmN0aW9uIERldmljZShwYXJhbXMpIHtcbiAgdGhpcy53aWR0aCA9IHBhcmFtcy53aWR0aCB8fCBVdGlsLmdldFNjcmVlbldpZHRoKCk7XG4gIHRoaXMuaGVpZ2h0ID0gcGFyYW1zLmhlaWdodCB8fCBVdGlsLmdldFNjcmVlbkhlaWdodCgpO1xuICB0aGlzLndpZHRoTWV0ZXJzID0gcGFyYW1zLndpZHRoTWV0ZXJzO1xuICB0aGlzLmhlaWdodE1ldGVycyA9IHBhcmFtcy5oZWlnaHRNZXRlcnM7XG4gIHRoaXMuYmV2ZWxNZXRlcnMgPSBwYXJhbXMuYmV2ZWxNZXRlcnM7XG59XG5cblxuLy8gRmFsbGJhY2sgQW5kcm9pZCBkZXZpY2UgKGJhc2VkIG9uIE5leHVzIDUgbWVhc3VyZW1lbnRzKSBmb3IgdXNlIHdoZW5cbi8vIHdlIGNhbid0IHJlY29nbml6ZSBhbiBBbmRyb2lkIGRldmljZS5cbnZhciBERUZBVUxUX0FORFJPSUQgPSBuZXcgRGV2aWNlKHtcbiAgd2lkdGhNZXRlcnM6IDAuMTEwLFxuICBoZWlnaHRNZXRlcnM6IDAuMDYyLFxuICBiZXZlbE1ldGVyczogMC4wMDRcbn0pO1xuXG4vLyBGYWxsYmFjayBpT1MgZGV2aWNlIChiYXNlZCBvbiBpUGhvbmU2KSBmb3IgdXNlIHdoZW5cbi8vIHdlIGNhbid0IHJlY29nbml6ZSBhbiBBbmRyb2lkIGRldmljZS5cbnZhciBERUZBVUxUX0lPUyA9IG5ldyBEZXZpY2Uoe1xuICB3aWR0aE1ldGVyczogMC4xMDM4LFxuICBoZWlnaHRNZXRlcnM6IDAuMDU4NCxcbiAgYmV2ZWxNZXRlcnM6IDAuMDA0XG59KTtcblxuXG52YXIgVmlld2VycyA9IHtcbiAgQ2FyZGJvYXJkVjE6IG5ldyBDYXJkYm9hcmRWaWV3ZXIoe1xuICAgIGlkOiAnQ2FyZGJvYXJkVjEnLFxuICAgIGxhYmVsOiAnQ2FyZGJvYXJkIEkvTyAyMDE0JyxcbiAgICBmb3Y6IDQwLFxuICAgIGludGVyTGVuc0Rpc3RhbmNlOiAwLjA2MCxcbiAgICBiYXNlbGluZUxlbnNEaXN0YW5jZTogMC4wMzUsXG4gICAgc2NyZWVuTGVuc0Rpc3RhbmNlOiAwLjA0MixcbiAgICBkaXN0b3J0aW9uQ29lZmZpY2llbnRzOiBbMC40NDEsIDAuMTU2XSxcbiAgICBpbnZlcnNlQ29lZmZpY2llbnRzOiBbLTAuNDQxMDAzNSwgMC40Mjc1NjE1NSwgLTAuNDgwNDQzOSwgMC41NDYwMTM5LFxuICAgICAgLTAuNTg4MjExODMsIDAuNTczMzkzOCwgLTAuNDgzMDMyMDIsIDAuMzMyOTkwODMsIC0wLjE3NTczODQxLFxuICAgICAgMC4wNjUxNzcyLCAtMC4wMTQ4ODk2MywgMC4wMDE1NTk4MzRdXG4gIH0pLFxuICBDYXJkYm9hcmRWMjogbmV3IENhcmRib2FyZFZpZXdlcih7XG4gICAgaWQ6ICdDYXJkYm9hcmRWMicsXG4gICAgbGFiZWw6ICdDYXJkYm9hcmQgSS9PIDIwMTUnLFxuICAgIGZvdjogNjAsXG4gICAgaW50ZXJMZW5zRGlzdGFuY2U6IDAuMDY0LFxuICAgIGJhc2VsaW5lTGVuc0Rpc3RhbmNlOiAwLjAzNSxcbiAgICBzY3JlZW5MZW5zRGlzdGFuY2U6IDAuMDM5LFxuICAgIGRpc3RvcnRpb25Db2VmZmljaWVudHM6IFswLjM0LCAwLjU1XSxcbiAgICBpbnZlcnNlQ29lZmZpY2llbnRzOiBbLTAuMzM4MzY3MDQsIC0wLjE4MTYyMTg1LCAwLjg2MjY1NSwgLTEuMjQ2MjA1MSxcbiAgICAgIDEuMDU2MDYwMiwgLTAuNTgyMDgzMTcsIDAuMjE2MDkwNzgsIC0wLjA1NDQ0ODIzLCAwLjAwOTE3Nzk1NixcbiAgICAgIC05LjkwNDE2OUUtNCwgNi4xODM1MzVFLTUsIC0xLjY5ODE4MDNFLTZdXG4gIH0pXG59O1xuXG5cbnZhciBERUZBVUxUX0xFRlRfQ0VOVEVSID0ge3g6IDAuNSwgeTogMC41fTtcbnZhciBERUZBVUxUX1JJR0hUX0NFTlRFUiA9IHt4OiAwLjUsIHk6IDAuNX07XG5cbi8qKlxuICogTWFuYWdlcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZGV2aWNlIGFuZCB0aGUgdmlld2VyLlxuICpcbiAqIGRldmljZVBhcmFtcyBpbmRpY2F0ZXMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGRldmljZSB0byB1c2UgKGdlbmVyYWxseVxuICogb2J0YWluZWQgZnJvbSBkcGRiLmdldERldmljZVBhcmFtcygpKS4gQ2FuIGJlIG51bGwgdG8gbWVhbiBubyBkZXZpY2VcbiAqIHBhcmFtcyB3ZXJlIGZvdW5kLlxuICovXG5mdW5jdGlvbiBEZXZpY2VJbmZvKGRldmljZVBhcmFtcykge1xuICB0aGlzLnZpZXdlciA9IFZpZXdlcnMuQ2FyZGJvYXJkVjE7XG4gIHRoaXMudXBkYXRlRGV2aWNlUGFyYW1zKGRldmljZVBhcmFtcyk7XG59XG5cbkRldmljZUluZm8ucHJvdG90eXBlLnVwZGF0ZURldmljZVBhcmFtcyA9IGZ1bmN0aW9uKGRldmljZVBhcmFtcykge1xuICB0aGlzLmRldmljZSA9IHRoaXMuZGV0ZXJtaW5lRGV2aWNlXyhkZXZpY2VQYXJhbXMpIHx8IHRoaXMuZGV2aWNlO1xufTtcblxuRGV2aWNlSW5mby5wcm90b3R5cGUuZ2V0RGV2aWNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmRldmljZTtcbn07XG5cbkRldmljZUluZm8ucHJvdG90eXBlLnNldFZpZXdlciA9IGZ1bmN0aW9uKHZpZXdlcikge1xuICB0aGlzLnZpZXdlciA9IHZpZXdlcjtcbn07XG5cbkRldmljZUluZm8ucHJvdG90eXBlLmRldGVybWluZURldmljZV8gPSBmdW5jdGlvbihkZXZpY2VQYXJhbXMpIHtcbiAgaWYgKCFkZXZpY2VQYXJhbXMpIHtcbiAgICAvLyBObyBwYXJhbWV0ZXJzLCBzbyB1c2UgYSBkZWZhdWx0LlxuICAgIGlmIChVdGlsLmlzSU9TKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVzaW5nIGZhbGxiYWNrIEFuZHJvaWQgZGV2aWNlIG1lYXN1cmVtZW50cy5cIik7XG4gICAgICByZXR1cm4gREVGQVVMVF9JT1M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVzaW5nIGZhbGxiYWNrIGlPUyBkZXZpY2UgbWVhc3VyZW1lbnRzLlwiKTtcbiAgICAgIHJldHVybiBERUZBVUxUX0FORFJPSUQ7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcHV0ZSBkZXZpY2Ugc2NyZWVuIGRpbWVuc2lvbnMgYmFzZWQgb24gZGV2aWNlUGFyYW1zLlxuICB2YXIgTUVURVJTX1BFUl9JTkNIID0gMC4wMjU0O1xuICB2YXIgbWV0ZXJzUGVyUGl4ZWxYID0gTUVURVJTX1BFUl9JTkNIIC8gZGV2aWNlUGFyYW1zLnhkcGk7XG4gIHZhciBtZXRlcnNQZXJQaXhlbFkgPSBNRVRFUlNfUEVSX0lOQ0ggLyBkZXZpY2VQYXJhbXMueWRwaTtcbiAgdmFyIHdpZHRoID0gVXRpbC5nZXRTY3JlZW5XaWR0aCgpO1xuICB2YXIgaGVpZ2h0ID0gVXRpbC5nZXRTY3JlZW5IZWlnaHQoKTtcbiAgcmV0dXJuIG5ldyBEZXZpY2Uoe1xuICAgIHdpZHRoTWV0ZXJzOiBtZXRlcnNQZXJQaXhlbFggKiB3aWR0aCxcbiAgICBoZWlnaHRNZXRlcnM6IG1ldGVyc1BlclBpeGVsWSAqIGhlaWdodCxcbiAgICBiZXZlbE1ldGVyczogZGV2aWNlUGFyYW1zLmJldmVsTW0gKiAwLjAwMSxcbiAgfSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgZmllbGQgb2YgdmlldyBmb3IgdGhlIGxlZnQgZXllLlxuICovXG5EZXZpY2VJbmZvLnByb3RvdHlwZS5nZXREaXN0b3J0ZWRGaWVsZE9mVmlld0xlZnRFeWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHZpZXdlciA9IHRoaXMudmlld2VyO1xuICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2U7XG5cbiAgdmFyIGRpc3RvcnRpb24gPSBuZXcgRGlzdG9ydGlvbih2aWV3ZXIuZGlzdG9ydGlvbkNvZWZmaWNpZW50cyk7XG5cbiAgLy8gRGV2aWNlLmhlaWdodCBhbmQgZGV2aWNlLndpZHRoIGZvciBkZXZpY2UgaW4gcG9ydHJhaXQgbW9kZSwgc28gdHJhbnNwb3NlLlxuICB2YXIgZXllVG9TY3JlZW5EaXN0YW5jZSA9IHZpZXdlci5zY3JlZW5MZW5zRGlzdGFuY2U7XG5cbiAgdmFyIG91dGVyRGlzdCA9IChkZXZpY2Uud2lkdGhNZXRlcnMgLSB2aWV3ZXIuaW50ZXJMZW5zRGlzdGFuY2UpIC8gMjtcbiAgdmFyIGlubmVyRGlzdCA9IHZpZXdlci5pbnRlckxlbnNEaXN0YW5jZSAvIDI7XG4gIHZhciBib3R0b21EaXN0ID0gdmlld2VyLmJhc2VsaW5lTGVuc0Rpc3RhbmNlIC0gZGV2aWNlLmJldmVsTWV0ZXJzO1xuICB2YXIgdG9wRGlzdCA9IGRldmljZS5oZWlnaHRNZXRlcnMgLSBib3R0b21EaXN0O1xuXG4gIHZhciBvdXRlckFuZ2xlID0gVEhSRUUuTWF0aC5yYWRUb0RlZyhNYXRoLmF0YW4oXG4gICAgICBkaXN0b3J0aW9uLmRpc3RvcnQob3V0ZXJEaXN0IC8gZXllVG9TY3JlZW5EaXN0YW5jZSkpKTtcbiAgdmFyIGlubmVyQW5nbGUgPSBUSFJFRS5NYXRoLnJhZFRvRGVnKE1hdGguYXRhbihcbiAgICAgIGRpc3RvcnRpb24uZGlzdG9ydChpbm5lckRpc3QgLyBleWVUb1NjcmVlbkRpc3RhbmNlKSkpO1xuICB2YXIgYm90dG9tQW5nbGUgPSBUSFJFRS5NYXRoLnJhZFRvRGVnKE1hdGguYXRhbihcbiAgICAgIGRpc3RvcnRpb24uZGlzdG9ydChib3R0b21EaXN0IC8gZXllVG9TY3JlZW5EaXN0YW5jZSkpKTtcbiAgdmFyIHRvcEFuZ2xlID0gVEhSRUUuTWF0aC5yYWRUb0RlZyhNYXRoLmF0YW4oXG4gICAgICBkaXN0b3J0aW9uLmRpc3RvcnQodG9wRGlzdCAvIGV5ZVRvU2NyZWVuRGlzdGFuY2UpKSk7XG5cbiAgcmV0dXJuIHtcbiAgICBsZWZ0RGVncmVlczogTWF0aC5taW4ob3V0ZXJBbmdsZSwgdmlld2VyLmZvdiksXG4gICAgcmlnaHREZWdyZWVzOiBNYXRoLm1pbihpbm5lckFuZ2xlLCB2aWV3ZXIuZm92KSxcbiAgICBkb3duRGVncmVlczogTWF0aC5taW4oYm90dG9tQW5nbGUsIHZpZXdlci5mb3YpLFxuICAgIHVwRGVncmVlczogTWF0aC5taW4odG9wQW5nbGUsIHZpZXdlci5mb3YpXG4gIH1cbn07XG5cbkRldmljZUluZm8ucHJvdG90eXBlLmdldEZpZWxkT2ZWaWV3TGVmdEV5ZSA9IGZ1bmN0aW9uKG9wdF9pc1VuZGlzdG9ydGVkKSB7XG4gIHJldHVybiBvcHRfaXNVbmRpc3RvcnRlZCA/IHRoaXMuZ2V0VW5kaXN0b3J0ZWRGaWVsZE9mVmlld0xlZnRFeWUoKSA6XG4gICAgICB0aGlzLmdldERpc3RvcnRlZEZpZWxkT2ZWaWV3TGVmdEV5ZSgpO1xufTtcblxuRGV2aWNlSW5mby5wcm90b3R5cGUuZ2V0RmllbGRPZlZpZXdSaWdodEV5ZSA9IGZ1bmN0aW9uKG9wdF9pc1VuZGlzdG9ydGVkKSB7XG4gIHZhciBmb3YgPSB0aGlzLmdldEZpZWxkT2ZWaWV3TGVmdEV5ZShvcHRfaXNVbmRpc3RvcnRlZCk7XG4gIHJldHVybiB7XG4gICAgbGVmdERlZ3JlZXM6IGZvdi5yaWdodERlZ3JlZXMsXG4gICAgcmlnaHREZWdyZWVzOiBmb3YubGVmdERlZ3JlZXMsXG4gICAgdXBEZWdyZWVzOiBmb3YudXBEZWdyZWVzLFxuICAgIGRvd25EZWdyZWVzOiBmb3YuZG93bkRlZ3JlZXNcbiAgfTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhIHByb2plY3Rpb24gbWF0cml4IGZvciB0aGUgbGVmdCBleWUuXG4gKi9cbkRldmljZUluZm8ucHJvdG90eXBlLmdldFByb2plY3Rpb25NYXRyaXhMZWZ0RXllID0gZnVuY3Rpb24ob3B0X2lzVW5kaXN0b3J0ZWQpIHtcbiAgdmFyIGZvdiA9IHRoaXMuZ2V0RmllbGRPZlZpZXdMZWZ0RXllKG9wdF9pc1VuZGlzdG9ydGVkKTtcblxuICB2YXIgcHJvamVjdGlvbk1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gIHZhciBuZWFyID0gMC4xO1xuICB2YXIgZmFyID0gMTAwMDtcbiAgdmFyIGxlZnQgPSBNYXRoLnRhbihUSFJFRS5NYXRoLmRlZ1RvUmFkKGZvdi5sZWZ0RGVncmVlcykpICogbmVhcjtcbiAgdmFyIHJpZ2h0ID0gTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZChmb3YucmlnaHREZWdyZWVzKSkgKiBuZWFyO1xuICB2YXIgYm90dG9tID0gTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZChmb3YuZG93bkRlZ3JlZXMpKSAqIG5lYXI7XG4gIHZhciB0b3AgPSBNYXRoLnRhbihUSFJFRS5NYXRoLmRlZ1RvUmFkKGZvdi51cERlZ3JlZXMpKSAqIG5lYXI7XG5cbiAgLy8gbWFrZUZydXN0dW0gZXhwZWN0cyB1bml0cyBpbiB0YW4tYW5nbGUgc3BhY2UuXG4gIHByb2plY3Rpb25NYXRyaXgubWFrZUZydXN0dW0oLWxlZnQsIHJpZ2h0LCAtYm90dG9tLCB0b3AsIG5lYXIsIGZhcik7XG4gIFxuICByZXR1cm4gcHJvamVjdGlvbk1hdHJpeDtcbn07XG5cblxuRGV2aWNlSW5mby5wcm90b3R5cGUuZ2V0VW5kaXN0b3J0ZWRWaWV3cG9ydExlZnRFeWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHAgPSB0aGlzLmdldFVuZGlzdG9ydGVkUGFyYW1zXygpO1xuICB2YXIgdmlld2VyID0gdGhpcy52aWV3ZXI7XG4gIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZTtcblxuICB2YXIgZXllVG9TY3JlZW5EaXN0YW5jZSA9IHZpZXdlci5zY3JlZW5MZW5zRGlzdGFuY2U7XG4gIHZhciBzY3JlZW5XaWR0aCA9IGRldmljZS53aWR0aE1ldGVycyAvIGV5ZVRvU2NyZWVuRGlzdGFuY2U7XG4gIHZhciBzY3JlZW5IZWlnaHQgPSBkZXZpY2UuaGVpZ2h0TWV0ZXJzIC8gZXllVG9TY3JlZW5EaXN0YW5jZTtcbiAgdmFyIHhQeFBlclRhbkFuZ2xlID0gZGV2aWNlLndpZHRoIC8gc2NyZWVuV2lkdGg7XG4gIHZhciB5UHhQZXJUYW5BbmdsZSA9IGRldmljZS5oZWlnaHQgLyBzY3JlZW5IZWlnaHQ7XG5cbiAgdmFyIHggPSBNYXRoLnJvdW5kKChwLmV5ZVBvc1ggLSBwLm91dGVyRGlzdCkgKiB4UHhQZXJUYW5BbmdsZSk7XG4gIHZhciB5ID0gTWF0aC5yb3VuZCgocC5leWVQb3NZIC0gcC5ib3R0b21EaXN0KSAqIHlQeFBlclRhbkFuZ2xlKTtcbiAgcmV0dXJuIHtcbiAgICB4OiB4LFxuICAgIHk6IHksXG4gICAgd2lkdGg6IE1hdGgucm91bmQoKHAuZXllUG9zWCArIHAuaW5uZXJEaXN0KSAqIHhQeFBlclRhbkFuZ2xlKSAtIHgsXG4gICAgaGVpZ2h0OiBNYXRoLnJvdW5kKChwLmV5ZVBvc1kgKyBwLnRvcERpc3QpICogeVB4UGVyVGFuQW5nbGUpIC0geVxuICB9O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHVuZGlzdG9ydGVkIGZpZWxkIG9mIHZpZXcgZm9yIHRoZSBsZWZ0IGV5ZS5cbiAqL1xuRGV2aWNlSW5mby5wcm90b3R5cGUuZ2V0VW5kaXN0b3J0ZWRGaWVsZE9mVmlld0xlZnRFeWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHAgPSB0aGlzLmdldFVuZGlzdG9ydGVkUGFyYW1zXygpO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdERlZ3JlZXM6IFRIUkVFLk1hdGgucmFkVG9EZWcoTWF0aC5hdGFuKHAub3V0ZXJEaXN0KSksXG4gICAgcmlnaHREZWdyZWVzOiBUSFJFRS5NYXRoLnJhZFRvRGVnKE1hdGguYXRhbihwLmlubmVyRGlzdCkpLFxuICAgIGRvd25EZWdyZWVzOiBUSFJFRS5NYXRoLnJhZFRvRGVnKE1hdGguYXRhbihwLmJvdHRvbURpc3QpKSxcbiAgICB1cERlZ3JlZXM6IFRIUkVFLk1hdGgucmFkVG9EZWcoTWF0aC5hdGFuKHAudG9wRGlzdCkpXG4gIH07XG59O1xuXG5EZXZpY2VJbmZvLnByb3RvdHlwZS5nZXRVbmRpc3RvcnRlZFBhcmFtc18gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHZpZXdlciA9IHRoaXMudmlld2VyO1xuICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2U7XG4gIHZhciBkaXN0b3J0aW9uID0gbmV3IERpc3RvcnRpb24odmlld2VyLmRpc3RvcnRpb25Db2VmZmljaWVudHMpO1xuXG4gIC8vIE1vc3Qgb2YgdGhlc2UgdmFyaWFibGVzIGluIHRhbi1hbmdsZSB1bml0cy5cbiAgdmFyIGV5ZVRvU2NyZWVuRGlzdGFuY2UgPSB2aWV3ZXIuc2NyZWVuTGVuc0Rpc3RhbmNlO1xuICB2YXIgaGFsZkxlbnNEaXN0YW5jZSA9IHZpZXdlci5pbnRlckxlbnNEaXN0YW5jZSAvIDIgLyBleWVUb1NjcmVlbkRpc3RhbmNlO1xuICB2YXIgc2NyZWVuV2lkdGggPSBkZXZpY2Uud2lkdGhNZXRlcnMgLyBleWVUb1NjcmVlbkRpc3RhbmNlO1xuICB2YXIgc2NyZWVuSGVpZ2h0ID0gZGV2aWNlLmhlaWdodE1ldGVycyAvIGV5ZVRvU2NyZWVuRGlzdGFuY2U7XG5cbiAgdmFyIGV5ZVBvc1ggPSBzY3JlZW5XaWR0aCAvIDIgLSBoYWxmTGVuc0Rpc3RhbmNlO1xuICB2YXIgZXllUG9zWSA9ICh2aWV3ZXIuYmFzZWxpbmVMZW5zRGlzdGFuY2UgLSBkZXZpY2UuYmV2ZWxNZXRlcnMpIC8gZXllVG9TY3JlZW5EaXN0YW5jZTtcblxuICB2YXIgbWF4Rm92ID0gdmlld2VyLmZvdjtcbiAgdmFyIHZpZXdlck1heCA9IGRpc3RvcnRpb24uZGlzdG9ydEludmVyc2UoTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZChtYXhGb3YpKSk7XG4gIHZhciBvdXRlckRpc3QgPSBNYXRoLm1pbihleWVQb3NYLCB2aWV3ZXJNYXgpO1xuICB2YXIgaW5uZXJEaXN0ID0gTWF0aC5taW4oaGFsZkxlbnNEaXN0YW5jZSwgdmlld2VyTWF4KTtcbiAgdmFyIGJvdHRvbURpc3QgPSBNYXRoLm1pbihleWVQb3NZLCB2aWV3ZXJNYXgpO1xuICB2YXIgdG9wRGlzdCA9IE1hdGgubWluKHNjcmVlbkhlaWdodCAtIGV5ZVBvc1ksIHZpZXdlck1heCk7XG5cbiAgcmV0dXJuIHtcbiAgICBvdXRlckRpc3Q6IG91dGVyRGlzdCxcbiAgICBpbm5lckRpc3Q6IGlubmVyRGlzdCxcbiAgICB0b3BEaXN0OiB0b3BEaXN0LFxuICAgIGJvdHRvbURpc3Q6IGJvdHRvbURpc3QsXG4gICAgZXllUG9zWDogZXllUG9zWCxcbiAgICBleWVQb3NZOiBleWVQb3NZXG4gIH07XG59O1xuXG5cbmZ1bmN0aW9uIENhcmRib2FyZFZpZXdlcihwYXJhbXMpIHtcbiAgLy8gQSBtYWNoaW5lIHJlYWRhYmxlIElELlxuICB0aGlzLmlkID0gcGFyYW1zLmlkO1xuICAvLyBBIGh1bWFuIHJlYWRhYmxlIGxhYmVsLlxuICB0aGlzLmxhYmVsID0gcGFyYW1zLmxhYmVsO1xuXG4gIC8vIEZpZWxkIG9mIHZpZXcgaW4gZGVncmVlcyAocGVyIHNpZGUpLlxuICB0aGlzLmZvdiA9IHBhcmFtcy5mb3Y7XG5cbiAgLy8gRGlzdGFuY2UgYmV0d2VlbiBsZW5zIGNlbnRlcnMgaW4gbWV0ZXJzLlxuICB0aGlzLmludGVyTGVuc0Rpc3RhbmNlID0gcGFyYW1zLmludGVyTGVuc0Rpc3RhbmNlO1xuICAvLyBEaXN0YW5jZSBiZXR3ZWVuIHZpZXdlciBiYXNlbGluZSBhbmQgbGVucyBjZW50ZXIgaW4gbWV0ZXJzLlxuICB0aGlzLmJhc2VsaW5lTGVuc0Rpc3RhbmNlID0gcGFyYW1zLmJhc2VsaW5lTGVuc0Rpc3RhbmNlO1xuICAvLyBTY3JlZW4tdG8tbGVucyBkaXN0YW5jZSBpbiBtZXRlcnMuXG4gIHRoaXMuc2NyZWVuTGVuc0Rpc3RhbmNlID0gcGFyYW1zLnNjcmVlbkxlbnNEaXN0YW5jZTtcblxuICAvLyBEaXN0b3J0aW9uIGNvZWZmaWNpZW50cy5cbiAgdGhpcy5kaXN0b3J0aW9uQ29lZmZpY2llbnRzID0gcGFyYW1zLmRpc3RvcnRpb25Db2VmZmljaWVudHM7XG4gIC8vIEludmVyc2UgZGlzdG9ydGlvbiBjb2VmZmljaWVudHMuXG4gIC8vIFRPRE86IENhbGN1bGF0ZSB0aGVzZSBmcm9tIGRpc3RvcnRpb25Db2VmZmljaWVudHMgaW4gdGhlIGZ1dHVyZS5cbiAgdGhpcy5pbnZlcnNlQ29lZmZpY2llbnRzID0gcGFyYW1zLmludmVyc2VDb2VmZmljaWVudHM7XG59XG5cbi8vIEV4cG9ydCB2aWV3ZXIgaW5mb3JtYXRpb24uXG5EZXZpY2VJbmZvLlZpZXdlcnMgPSBWaWV3ZXJzO1xubW9kdWxlLmV4cG9ydHMgPSBEZXZpY2VJbmZvO1xuIiwidmFyIEJhcnJlbERpc3RvcnRpb25GcmFnbWVudCA9IHtcbiAgdHlwZTogJ2ZyYWdtZW50X3YyJyxcblxuICBcbiAgdW5pZm9ybXM6IHtcbiAgICB0ZXh0dXJlOiAgIHsgdHlwZTogJ3QnLCB2YWx1ZTogbnVsbCB9LFxuICAgIGRpc3RvcnRpb246IHsgdHlwZTogJ3YyJywgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKDAuNDQxLCAwLjE1NikgfSxcbiAgICBwcm9qZWN0aW9uTGVmdDogICAgeyB0eXBlOiAndjQnLCB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMS4wLCAxLjAsIC0wLjUsIC0wLjUpIH0sXG4gICAgdW5wcm9qZWN0aW9uTGVmdDogIHsgdHlwZTogJ3Y0JywgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3I0KDEuMCwgMS4wLCAtMC41LCAtMC41KSB9LFxuICAgIGJhY2tncm91bmRDb2xvcjogeyB0eXBlOiAndjQnLCB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKSB9LFxuICAgIHNob3dDZW50ZXI6IHsgdHlwZTogJ2knLCB2YWx1ZTogMH0sXG4gICAgZGl2aWRlckNvbG9yOiB7IHR5cGU6ICd2NCcsIHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjUsIDAuNSwgMC41LCAxLjApIH0sXG4gIH0sXG5cbiAgdmVydGV4U2hhZGVyOiBbXG4gICd2YXJ5aW5nIHZlYzIgdlVWOycsXG5cbiAgJ3ZvaWQgbWFpbigpIHsnLFxuICAgICd2VVYgPSB1djsnLFxuICAgICdnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7JyxcbiAgJ30nXG5cbiAgXS5qb2luKCdcXG4nKSxcblxuICAvLyBUT0RPOiB1c2UgbWluL21heC9zYXR1cmF0ZSBpbnN0ZWFkIG9mIGNvbmRpdGlvbmFsc1xuICBmcmFnbWVudFNoYWRlcjogW1xuICAgICd1bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlOycsXG5cbiAgICAndW5pZm9ybSB2ZWMyIGRpc3RvcnRpb247JyxcbiAgICAndW5pZm9ybSB2ZWM0IGJhY2tncm91bmRDb2xvcjsnLFxuICAgICd1bmlmb3JtIHZlYzQgcHJvamVjdGlvbkxlZnQ7JyxcbiAgICAndW5pZm9ybSB2ZWM0IHVucHJvamVjdGlvbkxlZnQ7JyxcbiAgICAndW5pZm9ybSBpbnQgc2hvd0NlbnRlcjsnLFxuICAgICd1bmlmb3JtIHZlYzQgZGl2aWRlckNvbG9yOycsXG5cbiAgICAndmFyeWluZyB2ZWMyIHZVVjsnLFxuXG4gICAgJ2Zsb2F0IHBvbHkoZmxvYXQgdmFsKSB7JyxcbiAgICAgICdyZXR1cm4gKHNob3dDZW50ZXIgPT0gMSAmJiB2YWwgPCAwLjAwMDEwKSA/ICcsXG4gICAgICAnMTAwMDAuMCA6IDEuMCArIChkaXN0b3J0aW9uLnggKyBkaXN0b3J0aW9uLnkgKiB2YWwpICogdmFsOycsXG4gICAgJ30nLFxuXG4gICAgJ3ZlYzIgYmFycmVsKHZlYzIgdiwgdmVjNCBwcm9qZWN0aW9uLCB2ZWM0IHVucHJvamVjdGlvbikgeycsXG4gICAgICAndmVjMiB3ID0gKHYgKyB1bnByb2plY3Rpb24uencpIC8gdW5wcm9qZWN0aW9uLnh5OycsXG4gICAgICAncmV0dXJuIHByb2plY3Rpb24ueHkgKiAocG9seShkb3QodywgdykpICogdykgLSBwcm9qZWN0aW9uLnp3OycsXG4gICAgJ30nLFxuXG4gICAgJ3ZvaWQgbWFpbigpIHsnLFxuICAgICAgLy8gcmlnaHQgcHJvamVjdGlvbnMgYXJlIHNoaWZ0ZWQgYW5kIHZlcnRpY2FsbHkgbWlycm9yZWQgcmVsYXRpdmUgdG8gbGVmdFxuICAgICAgJ3ZlYzQgcHJvamVjdGlvblJpZ2h0ID0gJyxcbiAgICAgICcocHJvamVjdGlvbkxlZnQgKyB2ZWM0KDAuMCwgMC4wLCAxLjAsIDAuMCkpICogdmVjNCgxLjAsIDEuMCwgLTEuMCwgMS4wKTsnLFxuICAgICAgJ3ZlYzQgdW5wcm9qZWN0aW9uUmlnaHQgPSAnLFxuICAgICAgJyh1bnByb2plY3Rpb25MZWZ0ICsgdmVjNCgwLjAsIDAuMCwgMS4wLCAwLjApKSAqIHZlYzQoMS4wLCAxLjAsIC0xLjAsIDEuMCk7JyxcblxuICAgICAgJ3ZlYzIgYSA9ICh2VVYueCA8IDAuNSkgPyAnLFxuICAgICAgJ2JhcnJlbCh2ZWMyKHZVVi54IC8gMC41LCB2VVYueSksIHByb2plY3Rpb25MZWZ0LCB1bnByb2plY3Rpb25MZWZ0KSA6ICcsXG4gICAgICAnYmFycmVsKHZlYzIoKHZVVi54IC0gMC41KSAvIDAuNSwgdlVWLnkpLCBwcm9qZWN0aW9uUmlnaHQsIHVucHJvamVjdGlvblJpZ2h0KTsnLFxuXG4gICAgICAnaWYgKGRpdmlkZXJDb2xvci53ID4gMC4wICYmIGFicyh2VVYueCAtIDAuNSkgPCAuMDAxKSB7JyxcbiAgICAgICAgLy8gRG9uJ3QgcmVuZGVyIHRoZSBkaXZpZGVyLCBzaW5jZSBpdCdzIHJlbmRlcmVkIGluIEhUTUwuXG4gICAgICAgIC8vJ2dsX0ZyYWdDb2xvciA9IGRpdmlkZXJDb2xvcjsnLFxuICAgICAgJ30gZWxzZSBpZiAoYS54IDwgMC4wIHx8IGEueCA+IDEuMCB8fCBhLnkgPCAwLjAgfHwgYS55ID4gMS4wKSB7JyxcbiAgICAgICAgJ2dsX0ZyYWdDb2xvciA9IGJhY2tncm91bmRDb2xvcjsnLFxuICAgICAgJ30gZWxzZSB7JyxcbiAgICAgICAgJ2dsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXh0dXJlLCB2ZWMyKGEueCAqIDAuNSArICh2VVYueCA8IDAuNSA/IDAuMCA6IDAuNSksIGEueSkpOycsXG4gICAgICAnfScsXG4gICAgJ30nXG5cbiAgICBdLmpvaW4oJ1xcbicpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhcnJlbERpc3RvcnRpb25GcmFnbWVudDtcbiIsIi8qKlxuICogVE9ETyhzbXVzKTogSW1wbGVtZW50IGNvZWZmaWNpZW50IGludmVyc2lvbi5cbiAqL1xuZnVuY3Rpb24gRGlzdG9ydGlvbihjb2VmZmljaWVudHMpIHtcbiAgdGhpcy5jb2VmZmljaWVudHMgPSBjb2VmZmljaWVudHM7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBkaXN0b3J0aW9uIGZvciBhIHJhZGl1cy5cbiAqIDwvcD48cD5cbiAqIEFsbG93cyB0byBjb21wdXRlIHRoZSBvcmlnaW5hbCB1bmRpc3RvcnRlZCByYWRpdXMgZnJvbSBhIGRpc3RvcnRlZCBvbmUuXG4gKiBTZWUgYWxzbyBnZXRBcHByb3hpbWF0ZUludmVyc2VEaXN0b3J0aW9uKCkgZm9yIGEgZmFzdGVyIGJ1dCBwb3RlbnRpYWxseVxuICogbGVzcyBhY2N1cmF0ZSBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1cyBEaXN0b3J0ZWQgcmFkaXVzIGZyb20gdGhlIGxlbnMgY2VudGVyIGluIHRhbi1hbmdsZSB1bml0cy5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHVuZGlzdG9ydGVkIHJhZGl1cyBpbiB0YW4tYW5nbGUgdW5pdHMuXG4gKi9cbkRpc3RvcnRpb24ucHJvdG90eXBlLmRpc3RvcnRJbnZlcnNlID0gZnVuY3Rpb24ocmFkaXVzKSB7XG4gIC8vIFNlY2FudCBtZXRob2QuXG4gIHZhciByMCA9IHJhZGl1cyAvIDAuOTtcbiAgdmFyIHIxID0gcmFkaXVzICogMC45O1xuICB2YXIgZHIwID0gcmFkaXVzIC0gdGhpcy5kaXN0b3J0KHIwKTtcbiAgd2hpbGUgKE1hdGguYWJzKHIxIC0gcjApID4gMC4wMDAxIC8qKiAwLjFtbSAqLykge1xuICAgIHZhciBkcjEgPSByYWRpdXMgLSB0aGlzLmRpc3RvcnQocjEpO1xuICAgIHZhciByMiA9IHIxIC0gZHIxICogKChyMSAtIHIwKSAvIChkcjEgLSBkcjApKTtcbiAgICByMCA9IHIxO1xuICAgIHIxID0gcjI7XG4gICAgZHIwID0gZHIxO1xuICB9XG4gIHJldHVybiByMTtcbn1cblxuXG4vKipcbiAqIERpc3RvcnRzIGEgcmFkaXVzIGJ5IGl0cyBkaXN0b3J0aW9uIGZhY3RvciBmcm9tIHRoZSBjZW50ZXIgb2YgdGhlIGxlbnNlcy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzIFJhZGl1cyBmcm9tIHRoZSBsZW5zIGNlbnRlciBpbiB0YW4tYW5nbGUgdW5pdHMuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBkaXN0b3J0ZWQgcmFkaXVzIGluIHRhbi1hbmdsZSB1bml0cy5cbiAqL1xuRGlzdG9ydGlvbi5wcm90b3R5cGUuZGlzdG9ydCA9IGZ1bmN0aW9uKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogdGhpcy5kaXN0b3J0aW9uRmFjdG9yXyhyYWRpdXMpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpc3RvcnRpb24gZmFjdG9yIG9mIGEgcG9pbnQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1cyBSYWRpdXMgb2YgdGhlIHBvaW50IGZyb20gdGhlIGxlbnMgY2VudGVyIGluIHRhbi1hbmdsZSB1bml0cy5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGRpc3RvcnRpb24gZmFjdG9yLiBNdWx0aXBseSBieSB0aGlzIGZhY3RvciB0byBkaXN0b3J0IHBvaW50cy5cbiAqL1xuRGlzdG9ydGlvbi5wcm90b3R5cGUuZGlzdG9ydGlvbkZhY3Rvcl8gPSBmdW5jdGlvbihyYWRpdXMpIHtcbiAgdmFyIHJlc3VsdCA9IDEuMDtcbiAgdmFyIHJGYWN0b3IgPSAxLjA7XG4gIHZhciByU3F1YXJlZCA9IHJhZGl1cyAqIHJhZGl1cztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29lZmZpY2llbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtpID0gdGhpcy5jb2VmZmljaWVudHNbaV07XG4gICAgckZhY3RvciAqPSByU3F1YXJlZDtcbiAgICByZXN1bHQgKz0ga2kgKiByRmFjdG9yO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXN0b3J0aW9uO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBEUERCIGNhY2hlLlxuICovXG52YXIgRFBEQl9DQUNIRSA9IHtcbiAgXCJmb3JtYXRcIjogMSxcbiAgXCJsYXN0X3VwZGF0ZWRcIjogXCIyMDE2LTAxLTI2VDIzOjExOjE4WlwiLFxuICBcImRldmljZXNcIjogW1xuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJhc3VzLyovTmV4dXMgNy8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk5leHVzIDdcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDMyMC44LCAzMjMuMCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJhc3VzLyovQVNVU19aMDBBRC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkFTVVNfWjAwQURcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQwMy4wLCA0MDQuNiBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiSFRDLyovSFRDNjQzNUxWVy8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkhUQzY0MzVMVldcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQ0OS43LCA0NDMuMyBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiSFRDLyovSFRDIE9uZSBYTC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkhUQyBPbmUgWExcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDMxNS4zLCAzMTQuNiBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiaHRjLyovTmV4dXMgOS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk5leHVzIDlcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiAyODkuMCxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiSFRDLyovSFRDIE9uZSBNOS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkhUQyBPbmUgTTlcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQ0Mi41LCA0NDMuMyBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJIVEMvKi9IVEMgT25lX004LypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiSFRDIE9uZV9NOFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNDQ5LjcsIDQ0Ny40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkhUQy8qL0hUQyBPbmUvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJIVEMgT25lXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogNDcyLjgsXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJIdWF3ZWkvKi9OZXh1cyA2UC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk5leHVzIDZQXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA1MTUuMSwgNTE4LjAgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkxHRS8qL05leHVzIDVYLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiTmV4dXMgNVhcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQyMi4wLCA0MTkuOSBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiTEdFLyovTEdNUzM0NS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkxHTVMzNDVcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDIyMS43LCAyMTkuMSBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJMR0UvKi9MRy1EODAwLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiTEctRDgwMFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNDIyLjAsIDQyNC4xIF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkxHRS8qL0xHLUQ4NTAvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJMRy1EODUwXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA1MzcuOSwgNTQxLjkgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiTEdFLyovVlM5ODUgNEcvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJWUzk4NSA0R1wiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNTM3LjksIDUzNS42IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJMR0UvKi9OZXh1cyA1LypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiTmV4dXMgNSBCXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0NDIuNCwgNDQ0LjggXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkxHRS8qL05leHVzIDQvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJOZXh1cyA0XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzMTkuOCwgMzE4LjQgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkxHRS8qL0xHLVA3NjkvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJMRy1QNzY5XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAyNDAuNiwgMjQ3LjUgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkxHRS8qL0xHTVMzMjMvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJMR01TMzIzXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAyMDYuNiwgMjA0LjYgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIkxHRS8qL0xHTFM5OTYvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJMR0xTOTk2XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0MDMuNCwgNDAxLjUgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIk1pY3JvbWF4LyovNDU2ME1NWC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIjQ1NjBNTVhcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDI0MC4wLCAyMTkuNCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiTWljcm9tYXgvKi9BMjUwLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiTWljcm9tYXggQTI1MFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNDgwLjAsIDQ0Ni40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJNaWNyb21heC8qL01pY3JvbWF4IEFRNDUwMS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk1pY3JvbWF4IEFRNDUwMVwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IDI0MC4wLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJtb3Rvcm9sYS8qL0RST0lEIFJBWlIvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJEUk9JRCBSQVpSXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzNjguMSwgMjU2LjcgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIm1vdG9yb2xhLyovWFQ4MzBDLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiWFQ4MzBDXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAyNTQuMCwgMjU1LjkgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIm1vdG9yb2xhLyovWFQxMDIxLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiWFQxMDIxXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAyNTQuMCwgMjU2LjcgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwibW90b3JvbGEvKi9YVDEwMjMvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJYVDEwMjNcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDI1NC4wLCAyNTYuNyBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJtb3Rvcm9sYS8qL1hUMTAyOC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlhUMTAyOFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMzI2LjYsIDMyNy42IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJtb3Rvcm9sYS8qL1hUMTAzNC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlhUMTAzNFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMzI2LjYsIDMyOC40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIm1vdG9yb2xhLyovWFQxMDUzLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiWFQxMDUzXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzMTUuMywgMzE2LjEgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIm1vdG9yb2xhLyovWFQxNTYyLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiWFQxNTYyXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0MDMuNCwgNDAyLjcgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIm1vdG9yb2xhLyovTmV4dXMgNi8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk5leHVzIDYgQlwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNDk0LjMsIDQ4OS43IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJtb3Rvcm9sYS8qL1hUMTA2My8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlhUMTA2M1wiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMjk1LjAsIDI5Ni42IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJtb3Rvcm9sYS8qL1hUMTA2NC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlhUMTA2NFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMjk1LjAsIDI5NS42IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIm1vdG9yb2xhLyovWFQxMDkyLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiWFQxMDkyXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0MjIuMCwgNDI0LjEgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwibW90b3JvbGEvKi9YVDEwOTUvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJYVDEwOTVcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQyMi4wLCA0MjMuNCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiT25lUGx1cy8qL0EwMDAxLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiQTAwMDFcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQwMy40LCA0MDEuMCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiT25lUGx1cy8qL09ORSBFMTAwNS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk9ORSBFMTAwNVwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNDQyLjQsIDQ0MS40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJPbmVQbHVzLyovT05FIEEyMDA1LypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiT05FIEEyMDA1XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzOTEuOSwgNDA1LjQgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIk9QUE8vKi9YOTA5LypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiWDkwOVwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNDQyLjQsIDQ0NC4xIF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovR1QtSTkwODIvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJHVC1JOTA4MlwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMTg0LjcsIDE4NS40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU00tRzM2MFAvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTTS1HMzYwUFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMTk2LjcsIDIwNS40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovTmV4dXMgUy8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIk5leHVzIFNcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDIzNC41LCAyMjkuOCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL0dULUk5MzAwLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiR1QtSTkzMDBcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDMwNC44LCAzMDMuOSBdLFxuICAgIFwiYndcIjogNSxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU00tVDIzME5VLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiU00tVDIzME5VXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogMjE2LjAsXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TR0gtVDM5OS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNHSC1UMzk5XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAyMTcuNywgMjMxLjQgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1OOTAwNS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLU45MDA1XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzODYuNCwgMzg3LjAgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL1NBTVNVTkctU00tTjkwMEEvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTQU1TVU5HLVNNLU45MDBBXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzODYuNCwgMzg3LjcgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9HVC1JOTUwMC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkdULUk5NTAwXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0NDIuNSwgNDQzLjMgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL0dULUk5NTA1LypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiR1QtSTk1MDVcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiA0MzkuNCxcbiAgICBcImJ3XCI6IDQsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTAwRi8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MDBGXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0MTUuNiwgNDMxLjYgXSxcbiAgICBcImJ3XCI6IDUsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTAwTS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MDBNXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0MTUuNiwgNDMxLjYgXSxcbiAgICBcImJ3XCI6IDUsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HODAwRi8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc4MDBGXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogMzI2LjgsXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU00tRzkwNlMvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTTS1HOTA2U1wiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNTYyLjcsIDU3Mi40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovR1QtSTkzMDAvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJHVC1JOTMwMFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMzA2LjcsIDMwNC44IF0sXG4gICAgXCJid1wiOiA1LFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU00tVDUzNS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLVQ1MzVcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDE0Mi42LCAxMzYuNCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU00tTjkyMEMvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTTS1OOTIwQ1wiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgNTE1LjEsIDUxOC40IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovR1QtSTkzMDBJLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiR1QtSTkzMDBJXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAzMDQuOCwgMzA1LjggXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9HVC1JOTE5NS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkdULUk5MTk1XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyAyNDkuNCwgMjU2LjcgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL1NQSC1MNTIwLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiU1BILUw1MjBcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDI0OS40LCAyNTUuOSBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL1NBTVNVTkctU0dILUk3MTcvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTQU1TVU5HLVNHSC1JNzE3XCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogMjg1LjgsXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU1BILUQ3MTAvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTUEgtRDcxMFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMjE3LjcsIDIwNC4yIF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovR1QtTjcxMDAvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJHVC1ONzEwMFwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IDI2NS4xLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL1NDSC1JNjA1LypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiU0NILUk2MDVcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiAyNjUuMSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9HYWxheHkgTmV4dXMvKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJHYWxheHkgTmV4dXNcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDMxNS4zLCAzMTQuMiBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL1NNLU45MTBILypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiU00tTjkxMEhcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDUxNS4xLCA1MTguMCBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwic2Ftc3VuZy8qL1NNLU45MTBDLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiU00tTjkxMENcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDUxNS4yLCA1MjAuMiBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJzYW1zdW5nLyovU00tRzEzME0vKlwiIH0sXG4gICAgICB7IFwidWFcIjogXCJTTS1HMTMwTVwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMTY1LjksIDE2NC44IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTI4SS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MjhJXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA1MTUuMSwgNTE4LjQgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTIwRi8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MjBGXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogNTgwLjYsXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTIwUC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MjBQXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA1MjIuNSwgNTc3LjAgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTI1Ri8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MjVGXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogNTgwLjYsXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcInNhbXN1bmcvKi9TTS1HOTI1Vi8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNNLUc5MjVWXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA1MjIuNSwgNTc2LjYgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIlNvbnkvKi9DNjkwMy8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkM2OTAzXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0NDIuNSwgNDQzLjMgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiA1MDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiU29ueS8qL0Q2NjUzLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiRDY2NTNcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQyOC42LCA0MjcuNiBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiU29ueS8qL0U2NjUzLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiRTY2NTNcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQyOC42LCA0MjUuNyBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiU29ueS8qL0U2ODUzLypcIiB9LFxuICAgICAgeyBcInVhXCI6IFwiRTY4NTNcIiB9XG4gICAgXSxcbiAgICBcImRwaVwiOiBbIDQwMy40LCA0MDEuOSBdLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImFuZHJvaWRcIixcbiAgICBcInJ1bGVzXCI6IFtcbiAgICAgIHsgXCJtZG1oXCI6IFwiU29ueS8qL1NHUDMyMS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlNHUDMyMVwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMjI0LjcsIDIyNC4xIF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogNTAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIlRDVC8qL0FMQ0FURUwgT05FIFRPVUNIIEZpZXJjZS8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIkFMQ0FURUwgT05FIFRPVUNIIEZpZXJjZVwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IFsgMjQwLjAsIDI0Ny41IF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiYW5kcm9pZFwiLFxuICAgIFwicnVsZXNcIjogW1xuICAgICAgeyBcIm1kbWhcIjogXCJUSEwvKi90aGwgNTAwMC8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcInRobCA1MDAwXCIgfVxuICAgIF0sXG4gICAgXCJkcGlcIjogWyA0ODAuMCwgNDQzLjMgXSxcbiAgICBcImJ3XCI6IDMsXG4gICAgXCJhY1wiOiAxMDAwXG4gIH0sXG4gIHtcbiAgICBcInR5cGVcIjogXCJhbmRyb2lkXCIsXG4gICAgXCJydWxlc1wiOiBbXG4gICAgICB7IFwibWRtaFwiOiBcIlpURS8qL1pURSBCbGFkZSBMMi8qXCIgfSxcbiAgICAgIHsgXCJ1YVwiOiBcIlpURSBCbGFkZSBMMlwiIH1cbiAgICBdLFxuICAgIFwiZHBpXCI6IDI0MC4wLFxuICAgIFwiYndcIjogMyxcbiAgICBcImFjXCI6IDUwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiaW9zXCIsXG4gICAgXCJydWxlc1wiOiBbIHsgXCJyZXNcIjogWyA2NDAsIDk2MCBdIH0gXSxcbiAgICBcImRwaVwiOiBbIDMyNS4xLCAzMjguNCBdLFxuICAgIFwiYndcIjogNCxcbiAgICBcImFjXCI6IDEwMDBcbiAgfSxcbiAge1xuICAgIFwidHlwZVwiOiBcImlvc1wiLFxuICAgIFwicnVsZXNcIjogWyB7IFwicmVzXCI6IFsgNjQwLCAxMTM2IF0gfSBdLFxuICAgIFwiZHBpXCI6IFsgMzE3LjEsIDMyMC4yIF0sXG4gICAgXCJid1wiOiAzLFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiaW9zXCIsXG4gICAgXCJydWxlc1wiOiBbIHsgXCJyZXNcIjogWyA3NTAsIDEzMzQgXSB9IF0sXG4gICAgXCJkcGlcIjogMzI2LjQsXG4gICAgXCJid1wiOiA0LFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiaW9zXCIsXG4gICAgXCJydWxlc1wiOiBbIHsgXCJyZXNcIjogWyAxMjQyLCAyMjA4IF0gfSBdLFxuICAgIFwiZHBpXCI6IFsgNDUzLjYsIDQ1OC40IF0sXG4gICAgXCJid1wiOiA0LFxuICAgIFwiYWNcIjogMTAwMFxuICB9LFxuICB7XG4gICAgXCJ0eXBlXCI6IFwiaW9zXCIsXG4gICAgXCJydWxlc1wiOiBbIHsgXCJyZXNcIjogWyAxMTI1LCAyMDAxIF0gfSBdLFxuICAgIFwiZHBpXCI6IFsgNDEwLjksIDQxNS40IF0sXG4gICAgXCJid1wiOiA0LFxuICAgIFwiYWNcIjogMTAwMFxuICB9XG5dfTtcblxubW9kdWxlLmV4cG9ydHMgPSBEUERCX0NBQ0hFO1xuXG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMTUgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBPZmZsaW5lIGNhY2hlIG9mIHRoZSBEUERCLCB0byBiZSB1c2VkIHVudGlsIHdlIGxvYWQgdGhlIG9ubGluZSBvbmUgKGFuZFxuLy8gYXMgYSBmYWxsYmFjayBpbiBjYXNlIHdlIGNhbid0IGxvYWQgdGhlIG9ubGluZSBvbmUpLlxudmFyIERQREJfQ0FDSEUgPSByZXF1aXJlKCcuL2RwZGItY2FjaGUuanMnKTtcbnZhciBVdGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cbi8vIE9ubGluZSBEUERCIFVSTC5cbnZhciBPTkxJTkVfRFBEQl9VUkwgPSAnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2NhcmRib2FyZC1kcGRiL2RwZGIuanNvbic7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBkZXZpY2UgcGFyYW1ldGVycyBiYXNlZCBvbiB0aGUgRFBEQiAoRGV2aWNlIFBhcmFtZXRlciBEYXRhYmFzZSkuXG4gKiBJbml0aWFsbHksIHVzZXMgdGhlIGNhY2hlZCBEUERCIHZhbHVlcy5cbiAqXG4gKiBJZiBmZXRjaE9ubGluZSA9PSB0cnVlLCB0aGVuIHRoaXMgb2JqZWN0IHRyaWVzIHRvIGZldGNoIHRoZSBvbmxpbmUgdmVyc2lvblxuICogb2YgdGhlIERQREIgYW5kIHVwZGF0ZXMgdGhlIGRldmljZSBpbmZvIGlmIGEgYmV0dGVyIG1hdGNoIGlzIGZvdW5kLlxuICogQ2FsbHMgdGhlIG9uRGV2aWNlUGFyYW1zVXBkYXRlZCBjYWxsYmFjayB3aGVuIHRoZXJlIGlzIGFuIHVwZGF0ZSB0byB0aGVcbiAqIGRldmljZSBpbmZvcm1hdGlvbi5cbiAqL1xuZnVuY3Rpb24gRHBkYihmZXRjaE9ubGluZSwgb25EZXZpY2VQYXJhbXNVcGRhdGVkKSB7XG4gIC8vIFN0YXJ0IHdpdGggdGhlIG9mZmxpbmUgRFBEQiBjYWNoZSB3aGlsZSB3ZSBhcmUgbG9hZGluZyB0aGUgcmVhbCBvbmUuXG4gIHRoaXMuZHBkYiA9IERQREJfQ0FDSEU7XG5cbiAgLy8gQ2FsY3VsYXRlIGRldmljZSBwYXJhbXMgYmFzZWQgb24gdGhlIG9mZmxpbmUgdmVyc2lvbiBvZiB0aGUgRFBEQi5cbiAgdGhpcy5yZWNhbGN1bGF0ZURldmljZVBhcmFtc18oKTtcblxuICAvLyBYSFIgdG8gZmV0Y2ggb25saW5lIERQREIgZmlsZSwgaWYgcmVxdWVzdGVkLlxuICBpZiAoZmV0Y2hPbmxpbmUpIHtcbiAgICAvLyBTZXQgdGhlIGNhbGxiYWNrLlxuICAgIHRoaXMub25EZXZpY2VQYXJhbXNVcGRhdGVkID0gb25EZXZpY2VQYXJhbXNVcGRhdGVkO1xuXG4gICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIERQREIuLi4nKTtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIG9iaiA9IHRoaXM7XG4gICAgeGhyLm9wZW4oJ0dFVCcsIE9OTElORV9EUERCX1VSTCwgdHJ1ZSk7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG9iai5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8PSAyOTkpIHtcbiAgICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBsb2FkZWQgb25saW5lIERQREIuJyk7XG4gICAgICAgIG9iai5kcGRiID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICBvYmoucmVjYWxjdWxhdGVEZXZpY2VQYXJhbXNfKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBFcnJvciBsb2FkaW5nIHRoZSBEUERCLlxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIG9ubGluZSBEUERCIScpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHhoci5zZW5kKCk7XG4gIH1cbn1cblxuLy8gUmV0dXJucyB0aGUgY3VycmVudCBkZXZpY2UgcGFyYW1ldGVycy5cbkRwZGIucHJvdG90eXBlLmdldERldmljZVBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5kZXZpY2VQYXJhbXM7XG59O1xuXG4vLyBSZWNhbGN1bGF0ZXMgdGhpcyBkZXZpY2UncyBwYXJhbWV0ZXJzIGJhc2VkIG9uIHRoZSBEUERCLlxuRHBkYi5wcm90b3R5cGUucmVjYWxjdWxhdGVEZXZpY2VQYXJhbXNfID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdSZWNhbGN1bGF0aW5nIGRldmljZSBwYXJhbXMuJyk7XG4gIHZhciBuZXdEZXZpY2VQYXJhbXMgPSB0aGlzLmNhbGNEZXZpY2VQYXJhbXNfKCk7XG4gIGNvbnNvbGUubG9nKCdOZXcgZGV2aWNlIHBhcmFtZXRlcnM6Jyk7XG4gIGNvbnNvbGUubG9nKG5ld0RldmljZVBhcmFtcyk7XG4gIGlmIChuZXdEZXZpY2VQYXJhbXMpIHtcbiAgICB0aGlzLmRldmljZVBhcmFtcyA9IG5ld0RldmljZVBhcmFtcztcbiAgICAvLyBJbnZva2UgY2FsbGJhY2ssIGlmIGl0IGlzIHNldC5cbiAgICBpZiAodGhpcy5vbkRldmljZVBhcmFtc1VwZGF0ZWQpIHtcbiAgICAgIHRoaXMub25EZXZpY2VQYXJhbXNVcGRhdGVkKHRoaXMuZGV2aWNlUGFyYW1zKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlY2FsY3VsYXRlIGRldmljZSBwYXJhbWV0ZXJzLicpO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIGEgRGV2aWNlUGFyYW1zIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIGJlc3QgZ3Vlc3MgYXMgdG8gdGhpc1xuLy8gZGV2aWNlJ3MgcGFyYW1ldGVycy4gQ2FuIHJldHVybiBudWxsIGlmIHRoZSBkZXZpY2UgZG9lcyBub3QgbWF0Y2ggYW55XG4vLyBrbm93biBkZXZpY2VzLlxuRHBkYi5wcm90b3R5cGUuY2FsY0RldmljZVBhcmFtc18gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRiID0gdGhpcy5kcGRiOyAvLyBzaG9ydGhhbmRcbiAgaWYgKCFkYikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RQREIgbm90IGF2YWlsYWJsZS4nKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoZGIuZm9ybWF0ICE9IDEpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEUERCIGhhcyB1bmV4cGVjdGVkIGZvcm1hdCB2ZXJzaW9uLicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghZGIuZGV2aWNlcyB8fCAhZGIuZGV2aWNlcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEUERCIGRvZXMgbm90IGhhdmUgYSBkZXZpY2VzIHNlY3Rpb24uJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBHZXQgdGhlIGFjdHVhbCB1c2VyIGFnZW50IGFuZCBzY3JlZW4gZGltZW5zaW9ucyBpbiBwaXhlbHMuXG4gIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhO1xuICB2YXIgd2lkdGggPSBVdGlsLmdldFNjcmVlbldpZHRoKCk7XG4gIHZhciBoZWlnaHQgPSBVdGlsLmdldFNjcmVlbkhlaWdodCgpO1xuICBjb25zb2xlLmxvZygnVXNlciBhZ2VudDogJyArIHVzZXJBZ2VudCk7XG4gIGNvbnNvbGUubG9nKCdQaXhlbCB3aWR0aDogJyArIHdpZHRoKTtcbiAgY29uc29sZS5sb2coJ1BpeGVsIGhlaWdodDogJyArIGhlaWdodCk7XG5cbiAgaWYgKCFkYi5kZXZpY2VzKSB7XG4gICAgY29uc29sZS5lcnJvcignRFBEQiBoYXMgbm8gZGV2aWNlcyBzZWN0aW9uLicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYi5kZXZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRldmljZSA9IGRiLmRldmljZXNbaV07XG4gICAgaWYgKCFkZXZpY2UucnVsZXMpIHtcbiAgICAgIGNvbnNvbGUud2FybignRGV2aWNlWycgKyBpICsgJ10gaGFzIG5vIHJ1bGVzIHNlY3Rpb24uJyk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoZGV2aWNlLnR5cGUgIT0gJ2lvcycgJiYgZGV2aWNlLnR5cGUgIT0gJ2FuZHJvaWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0RldmljZVsnICsgaSArICddIGhhcyBpbnZhbGlkIHR5cGUuJyk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBTZWUgaWYgdGhpcyBkZXZpY2UgaXMgb2YgdGhlIGFwcHJvcHJpYXRlIHR5cGUuXG4gICAgaWYgKFV0aWwuaXNJT1MoKSAhPSAoZGV2aWNlLnR5cGUgPT0gJ2lvcycpKSBjb250aW51ZTtcblxuICAgIC8vIFNlZSBpZiB0aGlzIGRldmljZSBtYXRjaGVzIGFueSBvZiB0aGUgcnVsZXM6XG4gICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRldmljZS5ydWxlcy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIHJ1bGUgPSBkZXZpY2UucnVsZXNbal07XG4gICAgICBpZiAodGhpcy5tYXRjaFJ1bGVfKHJ1bGUsIHVzZXJBZ2VudCwgd2lkdGgsIGhlaWdodCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1J1bGUgbWF0Y2hlZDonKTtcbiAgICAgICAgY29uc29sZS5sb2cocnVsZSk7XG4gICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFtYXRjaGVkKSBjb250aW51ZTtcblxuICAgIC8vIGRldmljZS5kcGkgbWlnaHQgYmUgYW4gYXJyYXkgb2YgWyB4ZHBpLCB5ZHBpXSBvciBqdXN0IGEgc2NhbGFyLlxuICAgIHZhciB4ZHBpID0gZGV2aWNlLmRwaVswXSB8fCBkZXZpY2UuZHBpO1xuICAgIHZhciB5ZHBpID0gZGV2aWNlLmRwaVsxXSB8fCBkZXZpY2UuZHBpO1xuXG4gICAgcmV0dXJuIG5ldyBEZXZpY2VQYXJhbXMoeyB4ZHBpOiB4ZHBpLCB5ZHBpOiB5ZHBpLCBiZXZlbE1tOiBkZXZpY2UuYncgfSk7XG4gIH1cblxuICBjb25zb2xlLndhcm4oJ05vIERQREIgZGV2aWNlIG1hdGNoLicpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbkRwZGIucHJvdG90eXBlLm1hdGNoUnVsZV8gPSBmdW5jdGlvbihydWxlLCB1YSwgc2NyZWVuV2lkdGgsIHNjcmVlbkhlaWdodCkge1xuICAvLyBXZSBjYW4gb25seSBtYXRjaCAndWEnIGFuZCAncmVzJyBydWxlcywgbm90IG90aGVyIHR5cGVzIGxpa2UgJ21kbWgnXG4gIC8vICh3aGljaCBhcmUgbWVhbnQgZm9yIG5hdGl2ZSBwbGF0Zm9ybXMpLlxuICBpZiAoIXJ1bGUudWEgJiYgIXJ1bGUucmVzKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgb3VyIHVzZXIgYWdlbnQgc3RyaW5nIGRvZXNuJ3QgY29udGFpbiB0aGUgaW5kaWNhdGVkIHVzZXIgYWdlbnQgc3RyaW5nLFxuICAvLyB0aGUgbWF0Y2ggZmFpbHMuXG4gIGlmIChydWxlLnVhICYmIHVhLmluZGV4T2YocnVsZS51YSkgPCAwKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlIHJ1bGUgc3BlY2lmaWVzIHNjcmVlbiBkaW1lbnNpb25zIHRoYXQgZG9uJ3QgY29ycmVzcG9uZCB0byBvdXJzLFxuICAvLyB0aGUgbWF0Y2ggZmFpbHMuXG4gIGlmIChydWxlLnJlcykge1xuICAgIGlmICghcnVsZS5yZXNbMF0gfHwgIXJ1bGUucmVzWzFdKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIHJlc1ggPSBydWxlLnJlc1swXTtcbiAgICB2YXIgcmVzWSA9IHJ1bGUucmVzWzFdO1xuICAgIC8vIENvbXBhcmUgbWluIGFuZCBtYXggc28gYXMgdG8gbWFrZSB0aGUgb3JkZXIgbm90IG1hdHRlciwgaS5lLiwgaXQgc2hvdWxkXG4gICAgLy8gYmUgdHJ1ZSB0aGF0IDY0MHg0ODAgPT0gNDgweDY0MC5cbiAgICBpZiAoTWF0aC5taW4oc2NyZWVuV2lkdGgsIHNjcmVlbkhlaWdodCkgIT0gTWF0aC5taW4ocmVzWCwgcmVzWSkgfHxcbiAgICAgICAgKE1hdGgubWF4KHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQpICE9IE1hdGgubWF4KHJlc1gsIHJlc1kpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBEZXZpY2VQYXJhbXMocGFyYW1zKSB7XG4gIHRoaXMueGRwaSA9IHBhcmFtcy54ZHBpO1xuICB0aGlzLnlkcGkgPSBwYXJhbXMueWRwaTtcbiAgdGhpcy5iZXZlbE1tID0gcGFyYW1zLmJldmVsTW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHBkYjtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmZ1bmN0aW9uIEVtaXR0ZXIoKSB7XG4gIHRoaXMuY2FsbGJhY2tzID0ge307XG59XG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzW2V2ZW50TmFtZV07XG4gIGlmICghY2FsbGJhY2tzKSB7XG4gICAgLy9jb25zb2xlLmxvZygnTm8gdmFsaWQgY2FsbGJhY2sgc3BlY2lmaWVkLicpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgLy8gRWxpbWluYXRlIHRoZSBmaXJzdCBwYXJhbSAodGhlIGNhbGxiYWNrKS5cbiAgYXJncy5zaGlmdCgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxufTtcblxuRW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIGlmIChldmVudE5hbWUgaW4gdGhpcy5jYWxsYmFja3MpIHtcbiAgICB0aGlzLmNhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbY2FsbGJhY2tdO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMTUgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG52YXIgV2ViVlJNYW5hZ2VyID0gcmVxdWlyZSgnLi93ZWJ2ci1tYW5hZ2VyLmpzJyk7XG5cbndpbmRvdy5XZWJWUkNvbmZpZyA9IHdpbmRvdy5XZWJWUkNvbmZpZyB8fCB7fTtcbndpbmRvdy5XZWJWUk1hbmFnZXIgPSBXZWJWUk1hbmFnZXI7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMTUgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG52YXIgTW9kZXMgPSB7XG4gIFVOS05PV046IDAsXG4gIC8vIE5vdCBmdWxsc2NyZWVuLCBqdXN0IHRyYWNraW5nLlxuICBOT1JNQUw6IDEsXG4gIC8vIE1hZ2ljIHdpbmRvdyBpbW1lcnNpdmUgbW9kZS5cbiAgTUFHSUNfV0lORE9XOiAyLFxuICAvLyBGdWxsIHNjcmVlbiBzcGxpdCBzY3JlZW4gVlIgbW9kZS5cbiAgVlI6IDMsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVzO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxudmFyIFV0aWwgPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcblxuZnVuY3Rpb24gUm90YXRlSW5zdHJ1Y3Rpb25zKCkge1xuICB0aGlzLmxvYWRJY29uXygpO1xuXG4gIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzID0gb3ZlcmxheS5zdHlsZTtcbiAgcy5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gIHMudG9wID0gMDtcbiAgcy5yaWdodCA9IDA7XG4gIHMuYm90dG9tID0gMDtcbiAgcy5sZWZ0ID0gMDtcbiAgcy5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gIHMuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblxuICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSB0aGlzLmljb247XG4gIHZhciBzID0gaW1nLnN0eWxlO1xuICBzLm1hcmdpbkxlZnQgPSAnMjUlJztcbiAgcy5tYXJnaW5Ub3AgPSAnMjUlJztcbiAgcy53aWR0aCA9ICc1MCUnO1xuICBvdmVybGF5LmFwcGVuZENoaWxkKGltZyk7XG5cbiAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmFyIHMgPSB0ZXh0LnN0eWxlO1xuICBzLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICBzLmZvbnRTaXplID0gJzE2cHgnO1xuICBzLmxpbmVIZWlnaHQgPSAnMjRweCc7XG4gIHMubWFyZ2luID0gJzI0cHggMjUlJztcbiAgcy53aWR0aCA9ICc1MCUnO1xuICB0ZXh0LmlubmVySFRNTCA9ICdQbGFjZSB5b3VyIHBob25lIGludG8geW91ciBDYXJkYm9hcmQgdmlld2VyLic7XG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgdmFyIHNuYWNrYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzID0gc25hY2tiYXIuc3R5bGU7XG4gIHMuYmFja2dyb3VuZENvbG9yID0gJyNDRkQ4REMnO1xuICBzLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgcy5ib3R0b20gPSAwO1xuICBzLndpZHRoID0gJzEwMCUnO1xuICBzLmhlaWdodCA9ICc0OHB4JztcbiAgcy5wYWRkaW5nID0gJzE0cHggMjRweCc7XG4gIHMuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICBzLmNvbG9yID0gJyM2NTZBNkInO1xuICBvdmVybGF5LmFwcGVuZENoaWxkKHNuYWNrYmFyKTtcblxuICB2YXIgc25hY2tiYXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNuYWNrYmFyVGV4dC5zdHlsZS5mbG9hdCA9ICdsZWZ0JztcbiAgc25hY2tiYXJUZXh0LmlubmVySFRNTCA9ICdObyBDYXJkYm9hcmQgdmlld2VyPyc7XG5cbiAgdmFyIHNuYWNrYmFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBzbmFja2JhckJ1dHRvbi5ocmVmID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vZ2V0L2NhcmRib2FyZC9nZXQtY2FyZGJvYXJkLyc7XG4gIHNuYWNrYmFyQnV0dG9uLmlubmVySFRNTCA9ICdnZXQgb25lJztcbiAgdmFyIHMgPSBzbmFja2JhckJ1dHRvbi5zdHlsZTtcbiAgcy5mbG9hdCA9ICdyaWdodCc7XG4gIHMuZm9udFdlaWdodCA9IDYwMDtcbiAgcy50ZXh0VHJhbnNmb3JtID0gJ3VwcGVyY2FzZSc7XG4gIHMuYm9yZGVyTGVmdCA9ICcxcHggc29saWQgZ3JheSc7XG4gIHMucGFkZGluZ0xlZnQgPSAnMjRweCc7XG4gIHMudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG4gIHMuY29sb3IgPSAnIzY1NkE2Qic7XG5cbiAgc25hY2tiYXIuYXBwZW5kQ2hpbGQoc25hY2tiYXJUZXh0KTtcbiAgc25hY2tiYXIuYXBwZW5kQ2hpbGQoc25hY2tiYXJCdXR0b24pO1xuXG4gIHRoaXMub3ZlcmxheSA9IG92ZXJsYXk7XG4gIHRoaXMudGV4dCA9IHRleHQ7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG5cbiAgdGhpcy5oaWRlKCk7XG59XG5cblJvdGF0ZUluc3RydWN0aW9ucy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgdmFyIGltZyA9IHRoaXMub3ZlcmxheS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgdmFyIHMgPSBpbWcuc3R5bGU7XG5cbiAgaWYgKFV0aWwuaXNMYW5kc2NhcGVNb2RlKCkpIHtcbiAgICBzLndpZHRoID0gJzIwJSc7XG4gICAgcy5tYXJnaW5MZWZ0ID0gJzQwJSc7XG4gICAgcy5tYXJnaW5Ub3AgPSAnMyUnO1xuICB9IGVsc2Uge1xuICAgIHMud2lkdGggPSAnNTAlJztcbiAgICBzLm1hcmdpbkxlZnQgPSAnMjUlJztcbiAgICBzLm1hcmdpblRvcCA9ICcyNSUnO1xuICB9XG59O1xuXG5Sb3RhdGVJbnN0cnVjdGlvbnMucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG5Sb3RhdGVJbnN0cnVjdGlvbnMucHJvdG90eXBlLnNob3dUZW1wb3JhcmlseSA9IGZ1bmN0aW9uKG1zKSB7XG4gIHRoaXMuc2hvdygpO1xuICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLmhpZGUuYmluZCh0aGlzKSwgbXMpO1xufTtcblxuUm90YXRlSW5zdHJ1Y3Rpb25zLnByb3RvdHlwZS5kaXNhYmxlU2hvd1RlbXBvcmFyaWx5ID0gZnVuY3Rpb24oKSB7XG4gIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbn07XG5cblJvdGF0ZUluc3RydWN0aW9ucy5wcm90b3R5cGUubG9hZEljb25fID0gZnVuY3Rpb24oKSB7XG4gIC8vIEVuY29kZWQgYXNzZXRfc3JjL3JvdGF0ZS1pbnN0cnVjdGlvbnMuc3ZnXG4gIHRoaXMuaWNvbiA9IFV0aWwuYmFzZTY0KCdpbWFnZS9zdmcreG1sJywgJ1BEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0NqeHpkbWNnZDJsa2RHZzlJakU1T0hCNElpQm9aV2xuYUhROUlqSTBNSEI0SWlCMmFXVjNRbTk0UFNJd0lEQWdNVGs0SURJME1DSWdkbVZ5YzJsdmJqMGlNUzR4SWlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhodGJHNXpPbmhzYVc1clBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1TDNoc2FXNXJJaUI0Yld4dWN6cHphMlYwWTJnOUltaDBkSEE2THk5M2QzY3VZbTlvWlcxcFlXNWpiMlJwYm1jdVkyOXRMM05yWlhSamFDOXVjeUkrQ2lBZ0lDQThJUzB0SUVkbGJtVnlZWFJ2Y2pvZ1UydGxkR05vSURNdU15NHpJQ2d4TWpBNE1Ta2dMU0JvZEhSd09pOHZkM2QzTG1KdmFHVnRhV0Z1WTI5a2FXNW5MbU52YlM5emEyVjBZMmdnTFMwK0NpQWdJQ0E4ZEdsMGJHVStkSEpoYm5OcGRHbHZiand2ZEdsMGJHVStDaUFnSUNBOFpHVnpZejVEY21WaGRHVmtJSGRwZEdnZ1UydGxkR05vTGp3dlpHVnpZejRLSUNBZ0lEeGtaV1p6UGp3dlpHVm1jejRLSUNBZ0lEeG5JR2xrUFNKUVlXZGxMVEVpSUhOMGNtOXJaVDBpYm05dVpTSWdjM1J5YjJ0bExYZHBaSFJvUFNJeElpQm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpSUhOclpYUmphRHAwZVhCbFBTSk5VMUJoWjJVaVBnb2dJQ0FnSUNBZ0lEeG5JR2xrUFNKMGNtRnVjMmwwYVc5dUlpQnphMlYwWTJnNmRIbHdaVDBpVFZOQmNuUmliMkZ5WkVkeWIzVndJajRLSUNBZ0lDQWdJQ0FnSUNBZ1BHY2dhV1E5SWtsdGNHOXlkR1ZrTFV4aGVXVnljeTFEYjNCNUxUUXRLeTFKYlhCdmNuUmxaQzFNWVhsbGNuTXRRMjl3ZVMwckxVbHRjRzl5ZEdWa0xVeGhlV1Z5Y3kxRGIzQjVMVEl0UTI5d2VTSWdjMnRsZEdOb09uUjVjR1U5SWsxVFRHRjVaWEpIY205MWNDSStDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThaeUJwWkQwaVNXMXdiM0owWldRdFRHRjVaWEp6TFVOdmNIa3ROQ0lnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb01DNHdNREF3TURBc0lERXdOeTR3TURBd01EQXBJaUJ6YTJWMFkyZzZkSGx3WlQwaVRWTlRhR0Z3WlVkeWIzVndJajRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1UUTVMall5TlN3eUxqVXlOeUJETVRRNUxqWXlOU3d5TGpVeU55QXhOVFV1T0RBMUxEWXVNRGsySURFMU5pNHpOaklzTmk0ME1UZ2dUREUxTmk0ek5qSXNOeTR6TURRZ1F6RTFOaTR6TmpJc055NDBPREVnTVRVMkxqTTNOU3czTGpZMk5DQXhOVFl1TkN3M0xqZzFNeUJETVRVMkxqUXhMRGN1T1RNMElERTFOaTQwTWl3NExqQXhOU0F4TlRZdU5ESTNMRGd1TURrMUlFTXhOVFl1TlRZM0xEa3VOVEVnTVRVM0xqUXdNU3d4TVM0d09UTWdNVFU0TGpVek1pd3hNaTR3T1RRZ1RERTJOQzR5TlRJc01UY3VNVFUySUV3eE5qUXVNek16TERFM0xqQTJOaUJETVRZMExqTXpNeXd4Tnk0d05qWWdNVFk0TGpjeE5Td3hOQzQxTXpZZ01UWTVMalUyT0N3eE5DNHdORElnUXpFM01TNHdNalVzTVRRdU9EZ3pJREU1TlM0MU16Z3NNamt1TURNMUlERTVOUzQxTXpnc01qa3VNRE0xSUV3eE9UVXVOVE00TERnekxqQXpOaUJETVRrMUxqVXpPQ3c0TXk0NE1EY2dNVGsxTGpFMU1pdzROQzR5TlRNZ01UazBMalU1TERnMExqSTFNeUJETVRrMExqTTFOeXc0TkM0eU5UTWdNVGswTGpBNU5TdzROQzR4TnpjZ01Ua3pMamd4T0N3NE5DNHdNVGNnVERFMk9TNDROVEVzTnpBdU1UYzVJRXd4TmprdU9ETTNMRGN3TGpJd015Qk1NVFF5TGpVeE5TdzROUzQ1TnpnZ1RERTBNUzQyTmpVc09EUXVOalUxSUVNeE16WXVPVE0wTERnekxqRXlOaUF4TXpFdU9URTNMRGd4TGpreE5TQXhNall1TnpFMExEZ3hMakEwTlNCRE1USTJMamN3T1N3NE1TNHdOaUF4TWpZdU56QTNMRGd4TGpBMk9TQXhNall1TnpBM0xEZ3hMakEyT1NCTU1USXhMalkwTERrNExqQXpJRXd4TVRNdU56UTVMREV3TWk0MU9EWWdUREV4TXk0M01USXNNVEF5TGpVeU15Qk1NVEV6TGpjeE1pd3hNekF1TVRFeklFTXhNVE11TnpFeUxERXpNQzQ0T0RVZ01URXpMak15Tml3eE16RXVNek1nTVRFeUxqYzJOQ3d4TXpFdU16TWdRekV4TWk0MU16SXNNVE14TGpNeklERXhNaTR5Tmprc01UTXhMakkxTkNBeE1URXVPVGt5TERFek1TNHdPVFFnVERZNUxqVXhPU3d4TURZdU5UY3lJRU0yT0M0MU5qa3NNVEEyTGpBeU15QTJOeTQzT1Rrc01UQTBMalk1TlNBMk55NDNPVGtzTVRBekxqWXdOU0JNTmpjdU56azVMREV3TWk0MU55Qk1OamN1TnpjNExERXdNaTQyTVRjZ1F6WTNMakkzTERFd01pNHpPVE1nTmpZdU5qUTRMREV3TWk0eU5Ea2dOalV1T1RZeUxERXdNaTR5TVRnZ1F6WTFMamczTlN3eE1ESXVNakUwSURZMUxqYzRPQ3d4TURJdU1qRXlJRFkxTGpjd01Td3hNREl1TWpFeUlFTTJOUzQyTURZc01UQXlMakl4TWlBMk5TNDFNVEVzTVRBeUxqSXhOU0EyTlM0ME1UWXNNVEF5TGpJeE9TQkROalV1TVRrMUxERXdNaTR5TWprZ05qUXVPVGMwTERFd01pNHlNelVnTmpRdU56VTBMREV3TWk0eU16VWdRelkwTGpNek1Td3hNREl1TWpNMUlEWXpMamt4TVN3eE1ESXVNakUySURZekxqUTVPQ3d4TURJdU1UYzRJRU0yTVM0NE5ETXNNVEF5TGpBeU5TQTJNQzR5T1Rnc01UQXhMalUzT0NBMU9TNHdPVFFzTVRBd0xqZzRNaUJNTVRJdU5URTRMRGN6TGprNU1pQk1NVEl1TlRJekxEYzBMakF3TkNCTU1pNHlORFVzTlRVdU1qVTBJRU14TGpJME5DdzFNeTQwTWpjZ01pNHdNRFFzTlRFdU1ETTRJRE11T1RRekxEUTVMamt4T0NCTU5Ua3VPVFUwTERFM0xqVTNNeUJETmpBdU5qSTJMREUzTGpFNE5TQTJNUzR6TlN3eE55NHdNREVnTmpJdU1EVXpMREUzTGpBd01TQkROak11TXpjNUxERTNMakF3TVNBMk5DNDJNalVzTVRjdU5qWWdOalV1TWpnc01UZ3VPRFUwSUV3Mk5TNHlPRFVzTVRndU9EVXhJRXcyTlM0MU1USXNNVGt1TWpZMElFdzJOUzQxTURZc01Ua3VNalk0SUVNMk5TNDVNRGtzTWpBdU1EQXpJRFkyTGpRd05Td3lNQzQyT0NBMk5pNDVPRE1zTWpFdU1qZzJJRXcyTnk0eU5pd3lNUzQxTlRZZ1F6WTVMakUzTkN3eU15NDBNRFlnTnpFdU56STRMREkwTGpNMU55QTNOQzR6TnpNc01qUXVNelUzSUVNM05pNHpNaklzTWpRdU16VTNJRGM0TGpNeU1Td3lNeTQ0TkNBNE1DNHhORGdzTWpJdU56ZzFJRU00TUM0eE5qRXNNakl1TnpnMUlEZzNMalEyTnl3eE9DNDFOallnT0RjdU5EWTNMREU0TGpVMk5pQkRPRGd1TVRNNUxERTRMakUzT0NBNE9DNDROak1zTVRjdU9UazBJRGc1TGpVMk5pd3hOeTQ1T1RRZ1F6a3dMamc1TWl3eE55NDVPVFFnT1RJdU1UTTRMREU0TGpZMU1pQTVNaTQzT1RJc01Ua3VPRFEzSUV3NU5pNHdORElzTWpVdU56YzFJRXc1Tmk0d05qUXNNalV1TnpVM0lFd3hNREl1T0RRNUxESTVMalkzTkNCTU1UQXlMamMwTkN3eU9TNDBPVElnVERFME9TNDJNalVzTWk0MU1qY2dUVEUwT1M0Mk1qVXNNQzQ0T1RJZ1F6RTBPUzR6TkRNc01DNDRPVElnTVRRNUxqQTJNaXd3TGprMk5TQXhORGd1T0RFc01TNHhNU0JNTVRBeUxqWTBNU3d5Tnk0Mk5qWWdURGszTGpJek1Td3lOQzQxTkRJZ1REazBMakl5Tml3eE9TNHdOakVnUXprekxqTXhNeXd4Tnk0ek9UUWdPVEV1TlRJM0xERTJMak0xT1NBNE9TNDFOallzTVRZdU16VTRJRU00T0M0MU5UVXNNVFl1TXpVNElEZzNMalUwTml3eE5pNDJNeklnT0RZdU5qUTVMREUzTGpFMUlFTTRNeTQ0Tnpnc01UZ3VOelVnTnprdU5qZzNMREl4TGpFMk9TQTNPUzR6TnpRc01qRXVNelExSUVNM09TNHpOVGtzTWpFdU16VXpJRGM1TGpNME5Td3lNUzR6TmpFZ056a3VNek1zTWpFdU16WTVJRU0zTnk0M09UZ3NNakl1TWpVMElEYzJMakE0TkN3eU1pNDNNaklnTnpRdU16Y3pMREl5TGpjeU1pQkROekl1TURneExESXlMamN5TWlBMk9TNDVOVGtzTWpFdU9Ea2dOamd1TXprM0xESXdMak00SUV3Mk9DNHhORFVzTWpBdU1UTTFJRU0yTnk0M01EWXNNVGt1TmpjeUlEWTNMak15TXl3eE9TNHhOVFlnTmpjdU1EQTJMREU0TGpZd01TQkROall1T1RnNExERTRMalUxT1NBMk5pNDVOamdzTVRndU5URTVJRFkyTGprME5pd3hPQzQwTnprZ1REWTJMamN4T1N3eE9DNHdOalVnUXpZMkxqWTVMREU0TGpBeE1pQTJOaTQyTlRnc01UY3VPVFlnTmpZdU5qSTBMREUzTGpreE1TQkROalV1TmpnMkxERTJMak16TnlBMk15NDVOVEVzTVRVdU16WTJJRFl5TGpBMU15d3hOUzR6TmpZZ1F6WXhMakEwTWl3eE5TNHpOallnTmpBdU1ETXpMREUxTGpZMElEVTVMakV6Tml3eE5pNHhOVGdnVERNdU1USTFMRFE0TGpVd01pQkRNQzQwTWpZc05UQXVNRFl4SUMwd0xqWXhNeXcxTXk0ME5ESWdNQzQ0TVRFc05UWXVNRFFnVERFeExqQTRPU3czTkM0M09TQkRNVEV1TWpZMkxEYzFMakV4TXlBeE1TNDFNemNzTnpVdU16VXpJREV4TGpnMUxEYzFMalE1TkNCTU5UZ3VNamMyTERFd01pNHlPVGdnUXpVNUxqWTNPU3d4TURNdU1UQTRJRFl4TGpRek15d3hNRE11TmpNZ05qTXVNelE0TERFd015NDRNRFlnUXpZekxqZ3hNaXd4TURNdU9EUTRJRFkwTGpJNE5Td3hNRE11T0RjZ05qUXVOelUwTERFd015NDROeUJETmpVc01UQXpMamczSURZMUxqSTBPU3d4TURNdU9EWTBJRFkxTGpRNU5Dd3hNRE11T0RVeUlFTTJOUzQxTmpNc01UQXpMamcwT1NBMk5TNDJNeklzTVRBekxqZzBOeUEyTlM0M01ERXNNVEF6TGpnME55QkROalV1TnpZMExERXdNeTQ0TkRjZ05qVXVPREk0TERFd015NDRORGtnTmpVdU9Ea3NNVEF6TGpnMU1pQkROalV1T1RnMkxERXdNeTQ0TlRZZ05qWXVNRGdzTVRBekxqZzJNeUEyTmk0eE56TXNNVEF6TGpnM05DQkROall1TWpneUxERXdOUzQwTmpjZ05qY3VNek15TERFd055NHhPVGNnTmpndU56QXlMREV3Tnk0NU9EZ2dUREV4TVM0eE56UXNNVE15TGpVeElFTXhNVEV1TmprNExERXpNaTQ0TVRJZ01URXlMakl6TWl3eE16SXVPVFkxSURFeE1pNDNOalFzTVRNeUxqazJOU0JETVRFMExqSTJNU3d4TXpJdU9UWTFJREV4TlM0ek5EY3NNVE14TGpjMk5TQXhNVFV1TXpRM0xERXpNQzR4TVRNZ1RERXhOUzR6TkRjc01UQXpMalUxTVNCTU1USXlMalExT0N3NU9TNDBORFlnUXpFeU1pNDRNVGtzT1RrdU1qTTNJREV5TXk0d09EY3NPVGd1T0RrNElERXlNeTR5TURjc09UZ3VORGs0SUV3eE1qY3VPRFkxTERneUxqa3dOU0JETVRNeUxqSTNPU3c0TXk0M01ESWdNVE0yTGpVMU55dzROQzQzTlRNZ01UUXdMall3Tnl3NE5pNHdNek1nVERFME1TNHhOQ3c0Tmk0NE5qSWdRekUwTVM0ME5URXNPRGN1TXpRMklERTBNUzQ1Tnpjc09EY3VOakV6SURFME1pNDFNVFlzT0RjdU5qRXpJRU14TkRJdU56azBMRGczTGpZeE15QXhORE11TURjMkxEZzNMalUwTWlBeE5ETXVNek16TERnM0xqTTVNeUJNTVRZNUxqZzJOU3czTWk0d056WWdUREU1TXl3NE5TNDBNek1nUXpFNU15NDFNak1zT0RVdU56TTFJREU1TkM0d05UZ3NPRFV1T0RnNElERTVOQzQxT1N3NE5TNDRPRGdnUXpFNU5pNHdPRGNzT0RVdU9EZzRJREU1Tnk0eE56TXNPRFF1TmpnNUlERTVOeTR4TnpNc09ETXVNRE0ySUV3eE9UY3VNVGN6TERJNUxqQXpOU0JETVRrM0xqRTNNeXd5T0M0ME5URWdNVGsyTGpnMk1Td3lOeTQ1TVRFZ01UazJMak0xTlN3eU55NDJNVGtnUXpFNU5pNHpOVFVzTWpjdU5qRTVJREUzTVM0NE5ETXNNVE11TkRZM0lERTNNQzR6T0RVc01USXVOakkySUVNeE56QXVNVE15TERFeUxqUTRJREUyT1M0NE5Td3hNaTQwTURjZ01UWTVMalUyT0N3eE1pNDBNRGNnUXpFMk9TNHlPRFVzTVRJdU5EQTNJREUyT1M0d01ESXNNVEl1TkRneElERTJPQzQzTkRrc01USXVOakkzSUVNeE5qZ3VNVFF6TERFeUxqazNPQ0F4TmpVdU56VTJMREUwTGpNMU55QXhOalF1TkRJMExERTFMakV5TlNCTU1UVTVMall4TlN3eE1DNDROeUJETVRVNExqYzVOaXd4TUM0eE5EVWdNVFU0TGpFMU5DdzRMamt6TnlBeE5UZ3VNRFUwTERjdU9UTTBJRU14TlRndU1EUTFMRGN1T0RNM0lERTFPQzR3TXpRc055NDNNemtnTVRVNExqQXlNU3czTGpZMElFTXhOVGd1TURBMUxEY3VOVEl6SURFMU55NDVPVGdzTnk0ME1TQXhOVGN1T1RrNExEY3VNekEwSUV3eE5UY3VPVGs0TERZdU5ERTRJRU14TlRjdU9UazRMRFV1T0RNMElERTFOeTQyT0RZc05TNHlPVFVnTVRVM0xqRTRNU3cxTGpBd01pQkRNVFUyTGpZeU5DdzBMalk0SURFMU1DNDBORElzTVM0eE1URWdNVFV3TGpRME1pd3hMakV4TVNCRE1UVXdMakU0T1N3d0xqazJOU0F4TkRrdU9UQTNMREF1T0RreUlERTBPUzQyTWpVc01DNDRPVElpSUdsa1BTSkdhV3hzTFRFaUlHWnBiR3c5SWlNME5UVkJOalFpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk9UWXVNREkzTERJMUxqWXpOaUJNTVRReUxqWXdNeXcxTWk0MU1qY2dRekUwTXk0NE1EY3NOVE11TWpJeUlERTBOQzQxT0RJc05UUXVNVEUwSURFME5DNDRORFVzTlRVdU1EWTRJRXd4TkRRdU9ETTFMRFUxTGpBM05TQk1Oak11TkRZeExERXdNaTR3TlRjZ1REWXpMalEyTERFd01pNHdOVGNnUXpZeExqZ3dOaXd4TURFdU9UQTFJRFl3TGpJMk1Td3hNREV1TkRVM0lEVTVMakExTnl3eE1EQXVOell5SUV3eE1pNDBPREVzTnpNdU9EY3hJRXc1Tmk0d01qY3NNalV1TmpNMklpQnBaRDBpUm1sc2JDMHlJaUJtYVd4c1BTSWpSa0ZHUVVaQklqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVFl6TGpRMk1Td3hNREl1TVRjMElFTTJNeTQwTlRNc01UQXlMakUzTkNBMk15NDBORFlzTVRBeUxqRTNOQ0EyTXk0ME16a3NNVEF5TGpFM01pQkROakV1TnpRMkxERXdNaTR3TVRZZ05qQXVNakV4TERFd01TNDFOak1nTlRndU9UazRMREV3TUM0NE5qTWdUREV5TGpReU1pdzNNeTQ1TnpNZ1F6RXlMak00Tml3M015NDVOVElnTVRJdU16WTBMRGN6TGpreE5DQXhNaTR6TmpRc056TXVPRGN4SUVNeE1pNHpOalFzTnpNdU9ETWdNVEl1TXpnMkxEY3pMamM1TVNBeE1pNDBNaklzTnpNdU56Y2dURGsxTGprMk9Dd3lOUzQxTXpVZ1F6azJMakF3TkN3eU5TNDFNVFFnT1RZdU1EUTVMREkxTGpVeE5DQTVOaTR3T0RVc01qVXVOVE0xSUV3eE5ESXVOall4TERVeUxqUXlOaUJETVRRekxqZzRPQ3cxTXk0eE16UWdNVFEwTGpZNE1pdzFOQzR3TXpnZ01UUTBMamsxTnl3MU5TNHdNemNnUXpFME5DNDVOeXcxTlM0d09ETWdNVFEwTGprMU15dzFOUzR4TXpNZ01UUTBMamt4TlN3MU5TNHhOakVnUXpFME5DNDVNVEVzTlRVdU1UWTFJREUwTkM0NE9UZ3NOVFV1TVRjMElERTBOQzQ0T1RRc05UVXVNVGMzSUV3Mk15NDFNVGtzTVRBeUxqRTFPQ0JETmpNdU5UQXhMREV3TWk0eE5qa2dOak11TkRneExERXdNaTR4TnpRZ05qTXVORFl4TERFd01pNHhOelFnVERZekxqUTJNU3d4TURJdU1UYzBJRm9nVFRFeUxqY3hOQ3czTXk0NE56RWdURFU1TGpFeE5Td3hNREF1TmpZeElFTTJNQzR5T1RNc01UQXhMak0wTVNBMk1TNDNPRFlzTVRBeExqYzRNaUEyTXk0ME16VXNNVEF4TGprek55Qk1NVFEwTGpjd055dzFOUzR3TVRVZ1F6RTBOQzQwTWpnc05UUXVNVEE0SURFME15NDJPRElzTlRNdU1qZzFJREUwTWk0MU5EUXNOVEl1TmpJNElFdzVOaTR3TWpjc01qVXVOemN4SUV3eE1pNDNNVFFzTnpNdU9EY3hJRXd4TWk0M01UUXNOek11T0RjeElGb2lJR2xrUFNKR2FXeHNMVE1pSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRRNExqTXlOeXcxT0M0ME56RWdRekUwT0M0eE5EVXNOVGd1TkRnZ01UUTNMamsyTWl3MU9DNDBPQ0F4TkRjdU56Z3hMRFU0TGpRM01pQkRNVFExTGpnNE55dzFPQzR6T0RrZ01UUTBMalEzT1N3MU55NDBNelFnTVRRMExqWXpOaXcxTmk0ek5DQkRNVFEwTGpZNE9TdzFOUzQ1TmpjZ01UUTBMalkyTkN3MU5TNDFPVGNnTVRRMExqVTJOQ3cxTlM0eU16VWdURFl6TGpRMk1Td3hNREl1TURVM0lFTTJOQzR3T0Rrc01UQXlMakV4TlNBMk5DNDNNek1zTVRBeUxqRXpJRFkxTGpNM09Td3hNREl1TURrNUlFTTJOUzQxTmpFc01UQXlMakE1SURZMUxqYzBNeXd4TURJdU1Ea2dOalV1T1RJMUxERXdNaTR3T1RnZ1F6WTNMamd4T1N3eE1ESXVNVGd4SURZNUxqSXlOeXd4TURNdU1UTTJJRFk1TGpBM0xERXdOQzR5TXlCTU1UUTRMak15Tnl3MU9DNDBOekVpSUdsa1BTSkdhV3hzTFRRaUlHWnBiR3c5SWlOR1JrWkdSa1lpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk5qa3VNRGNzTVRBMExqTTBOeUJETmprdU1EUTRMREV3TkM0ek5EY2dOamt1TURJMUxERXdOQzR6TkNBMk9TNHdNRFVzTVRBMExqTXlOeUJETmpndU9UWTRMREV3TkM0ek1ERWdOamd1T1RRNExERXdOQzR5TlRjZ05qZ3VPVFUxTERFd05DNHlNVE1nUXpZNUxERXdNeTQ0T1RZZ05qZ3VPRGs0TERFd015NDFOellnTmpndU5qVTRMREV3TXk0eU9EZ2dRelk0TGpFMU15d3hNREl1TmpjNElEWTNMakV3TXl3eE1ESXVNalkySURZMUxqa3lMREV3TWk0eU1UUWdRelkxTGpjME1pd3hNREl1TWpBMklEWTFMalUyTXl3eE1ESXVNakEzSURZMUxqTTROU3d4TURJdU1qRTFJRU0yTkM0M05ESXNNVEF5TGpJME5pQTJOQzR3T0Rjc01UQXlMakl6TWlBMk15NDBOU3d4TURJdU1UYzBJRU0yTXk0ek9Ua3NNVEF5TGpFMk9TQTJNeTR6TlRnc01UQXlMakV6TWlBMk15NHpORGNzTVRBeUxqQTRNaUJETmpNdU16TTJMREV3TWk0d016TWdOak11TXpVNExERXdNUzQ1T0RFZ05qTXVOREF5TERFd01TNDVOVFlnVERFME5DNDFNRFlzTlRVdU1UTTBJRU14TkRRdU5UTTNMRFUxTGpFeE5pQXhORFF1TlRjMUxEVTFMakV4TXlBeE5EUXVOakE1TERVMUxqRXlOeUJETVRRMExqWTBNaXcxTlM0eE5ERWdNVFEwTGpZMk9DdzFOUzR4TnlBeE5EUXVOamMzTERVMUxqSXdOQ0JETVRRMExqYzRNU3cxTlM0MU9EVWdNVFEwTGpnd05pdzFOUzQ1TnpJZ01UUTBMamMxTVN3MU5pNHpOVGNnUXpFME5DNDNNRFlzTlRZdU5qY3pJREUwTkM0NE1EZ3NOVFl1T1RrMElERTBOUzR3TkRjc05UY3VNamd5SUVNeE5EVXVOVFV6TERVM0xqZzVNaUF4TkRZdU5qQXlMRFU0TGpNd015QXhORGN1TnpnMkxEVTRMak0xTlNCRE1UUTNMamsyTkN3MU9DNHpOak1nTVRRNExqRTBNeXcxT0M0ek5qTWdNVFE0TGpNeU1TdzFPQzR6TlRRZ1F6RTBPQzR6Tnpjc05UZ3VNelV5SURFME9DNDBNalFzTlRndU16ZzNJREUwT0M0ME16a3NOVGd1TkRNNElFTXhORGd1TkRVMExEVTRMalE1SURFME9DNDBNeklzTlRndU5UUTFJREUwT0M0ek9EVXNOVGd1TlRjeUlFdzJPUzR4TWprc01UQTBMak16TVNCRE5qa3VNVEV4TERFd05DNHpORElnTmprdU1Ea3NNVEEwTGpNME55QTJPUzR3Tnl3eE1EUXVNelEzSUV3Mk9TNHdOeXd4TURRdU16UTNJRm9nVFRZMUxqWTJOU3d4TURFdU9UYzFJRU0yTlM0M05UUXNNVEF4TGprM05TQTJOUzQ0TkRJc01UQXhMamszTnlBMk5TNDVNeXd4TURFdU9UZ3hJRU0yTnk0eE9UWXNNVEF5TGpBek55QTJPQzR5T0RNc01UQXlMalEyT1NBMk9DNDRNemdzTVRBekxqRXpPU0JETmprdU1EWTFMREV3TXk0ME1UTWdOamt1TVRnNExERXdNeTQzTVRRZ05qa3VNVGs0TERFd05DNHdNakVnVERFME55NDRPRE1zTlRndU5Ua3lJRU14TkRjdU9EUTNMRFU0TGpVNU1pQXhORGN1T0RFeExEVTRMalU1TVNBeE5EY3VOemMyTERVNExqVTRPU0JETVRRMkxqVXdPU3cxT0M0MU16TWdNVFExTGpReU1pdzFPQzR4SURFME5DNDROamNzTlRjdU5ETXhJRU14TkRRdU5UZzFMRFUzTGpBNU1TQXhORFF1TkRZMUxEVTJMamN3TnlBeE5EUXVOVElzTlRZdU16STBJRU14TkRRdU5UWXpMRFUyTGpBeU1TQXhORFF1TlRVeUxEVTFMamN4TmlBeE5EUXVORGc0TERVMUxqUXhOQ0JNTmpNdU9EUTJMREV3TVM0NU55QkROalF1TXpVekxERXdNaTR3TURJZ05qUXVPRFkzTERFd01pNHdNRFlnTmpVdU16YzBMREV3TVM0NU9ESWdRelkxTGpRM01Td3hNREV1T1RjM0lEWTFMalUyT0N3eE1ERXVPVGMxSURZMUxqWTJOU3d4TURFdU9UYzFJRXcyTlM0Mk5qVXNNVEF4TGprM05TQmFJaUJwWkQwaVJtbHNiQzAxSWlCbWFXeHNQU0lqTmpBM1JEaENJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRJdU1qQTRMRFUxTGpFek5DQkRNUzR5TURjc05UTXVNekEzSURFdU9UWTNMRFV3TGpreE55QXpMamt3Tml3ME9TNDNPVGNnVERVNUxqa3hOeXd4Tnk0ME5UTWdRell4TGpnMU5pd3hOaTR6TXpNZ05qUXVNalF4TERFMkxqa3dOeUEyTlM0eU5ETXNNVGd1TnpNMElFdzJOUzQwTnpVc01Ua3VNVFEwSUVNMk5TNDROeklzTVRrdU9EZ3lJRFkyTGpNMk9Dd3lNQzQxTmlBMk5pNDVORFVzTWpFdU1UWTFJRXcyTnk0eU1qTXNNakV1TkRNMUlFTTNNQzQxTkRnc01qUXVOalE1SURjMUxqZ3dOaXd5TlM0eE5URWdPREF1TVRFeExESXlMalkyTlNCTU9EY3VORE1zTVRndU5EUTFJRU00T1M0ek55d3hOeTR6TWpZZ09URXVOelUwTERFM0xqZzVPU0E1TWk0M05UVXNNVGt1TnpJM0lFdzVOaTR3TURVc01qVXVOalUxSUV3eE1pNDBPRFlzTnpNdU9EZzBJRXd5TGpJd09DdzFOUzR4TXpRZ1dpSWdhV1E5SWtacGJHd3ROaUlnWm1sc2JEMGlJMFpCUmtGR1FTSStQQzl3WVhSb1Bnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4TWk0ME9EWXNOelF1TURBeElFTXhNaTQwTnpZc056UXVNREF4SURFeUxqUTJOU3czTXk0NU9Ua2dNVEl1TkRVMUxEY3pMams1TmlCRE1USXVOREkwTERjekxqazRPQ0F4TWk0ek9Ua3NOek11T1RZM0lERXlMak00TkN3M015NDVOQ0JNTWk0eE1EWXNOVFV1TVRrZ1F6RXVNRGMxTERVekxqTXhJREV1T0RVM0xEVXdMamcwTlNBekxqZzBPQ3cwT1M0Mk9UWWdURFU1TGpnMU9Dd3hOeTR6TlRJZ1F6WXdMalV5TlN3eE5pNDVOamNnTmpFdU1qY3hMREUyTGpjMk5DQTJNaTR3TVRZc01UWXVOelkwSUVNMk15NDBNekVzTVRZdU56WTBJRFkwTGpZMk5pd3hOeTQwTmpZZ05qVXVNekkzTERFNExqWTBOaUJETmpVdU16TTNMREU0TGpZMU5DQTJOUzR6TkRVc01UZ3VOall6SURZMUxqTTFNU3d4T0M0Mk56UWdURFkxTGpVM09Dd3hPUzR3T0RnZ1F6WTFMalU0TkN3eE9TNHhJRFkxTGpVNE9Td3hPUzR4TVRJZ05qVXVOVGt4TERFNUxqRXlOaUJETmpVdU9UZzFMREU1TGpnek9DQTJOaTQwTmprc01qQXVORGszSURZM0xqQXpMREl4TGpBNE5TQk1OamN1TXpBMUxESXhMak0xTVNCRE5qa3VNVFV4TERJekxqRXpOeUEzTVM0Mk5Ea3NNalF1TVRJZ056UXVNek0yTERJMExqRXlJRU0zTmk0ek1UTXNNalF1TVRJZ056Z3VNamtzTWpNdU5UZ3lJRGd3TGpBMU15d3lNaTQxTmpNZ1F6Z3dMakEyTkN3eU1pNDFOVGNnT0RBdU1EYzJMREl5TGpVMU15QTRNQzR3T0Rnc01qSXVOVFVnVERnM0xqTTNNaXd4T0M0ek5EUWdRemc0TGpBek9Dd3hOeTQ1TlRrZ09EZ3VOemcwTERFM0xqYzFOaUE0T1M0MU1qa3NNVGN1TnpVMklFTTVNQzQ1TlRZc01UY3VOelUySURreUxqSXdNU3d4T0M0ME56SWdPVEl1T0RVNExERTVMalkzSUV3NU5pNHhNRGNzTWpVdU5UazVJRU01Tmk0eE16Z3NNalV1TmpVMElEazJMakV4T0N3eU5TNDNNalFnT1RZdU1EWXpMREkxTGpjMU5pQk1NVEl1TlRRMUxEY3pMams0TlNCRE1USXVOVEkyTERjekxqazVOaUF4TWk0MU1EWXNOelF1TURBeElERXlMalE0Tml3M05DNHdNREVnVERFeUxqUTROaXczTkM0d01ERWdXaUJOTmpJdU1ERTJMREUyTGprNU55QkROakV1TXpFeUxERTJMams1TnlBMk1DNDJNRFlzTVRjdU1Ua2dOVGt1T1RjMUxERTNMalUxTkNCTU15NDVOalVzTkRrdU9EazVJRU15TGpBNE15dzFNQzQ1T0RVZ01TNHpOREVzTlRNdU16QTRJREl1TXpFc05UVXVNRGM0SUV3eE1pNDFNekVzTnpNdU56SXpJRXc1TlM0NE5EZ3NNalV1TmpFeElFdzVNaTQyTlRNc01Ua3VOemd5SUVNNU1pNHdNemdzTVRndU5qWWdPVEF1T0Rjc01UY3VPVGtnT0RrdU5USTVMREUzTGprNUlFTTRPQzQ0TWpVc01UY3VPVGtnT0RndU1URTVMREU0TGpFNE1pQTROeTQwT0Rrc01UZ3VOVFEzSUV3NE1DNHhOeklzTWpJdU56Y3lJRU00TUM0eE5qRXNNakl1TnpjNElEZ3dMakUwT1N3eU1pNDNPRElnT0RBdU1UTTNMREl5TGpjNE5TQkROemd1TXpRMkxESXpMamd4TVNBM05pNHpOREVzTWpRdU16VTBJRGMwTGpNek5pd3lOQzR6TlRRZ1F6Y3hMalU0T0N3eU5DNHpOVFFnTmprdU1ETXpMREl6TGpNME55QTJOeTR4TkRJc01qRXVOVEU1SUV3Mk5pNDROalFzTWpFdU1qUTVJRU0yTmk0eU56Y3NNakF1TmpNMElEWTFMamMzTkN3eE9TNDVORGNnTmpVdU16WTNMREU1TGpJd015QkROalV1TXpZc01Ua3VNVGt5SURZMUxqTTFOaXd4T1M0eE56a2dOalV1TXpVMExERTVMakUyTmlCTU5qVXVNVFl6TERFNExqZ3hPU0JETmpVdU1UVTBMREU0TGpneE1TQTJOUzR4TkRZc01UZ3VPREF4SURZMUxqRTBMREU0TGpjNUlFTTJOQzQxTWpVc01UY3VOalkzSURZekxqTTFOeXd4Tmk0NU9UY2dOakl1TURFMkxERTJMams1TnlCTU5qSXVNREUyTERFMkxqazVOeUJhSWlCcFpEMGlSbWxzYkMwM0lpQm1hV3hzUFNJak5qQTNSRGhDSWo0OEwzQmhkR2crQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUUXlMalF6TkN3ME9DNDRNRGdnVERReUxqUXpOQ3cwT0M0NE1EZ2dRek01TGpreU5DdzBPQzQ0TURjZ016Y3VOek0zTERRM0xqVTFJRE0yTGpVNE1pdzBOUzQwTkRNZ1F6TTBMamMzTVN3ME1pNHhNemtnTXpZdU1UUTBMRE0zTGpnd09TQXpPUzQyTkRFc016VXVOemc1SUV3MU1TNDVNeklzTWpndU5qa3hJRU0xTXk0eE1ETXNNamd1TURFMUlEVTBMalF4TXl3eU55NDJOVGdnTlRVdU56SXhMREkzTGpZMU9DQkROVGd1TWpNeExESTNMalkxT0NBMk1DNDBNVGdzTWpndU9URTJJRFl4TGpVM015d3pNUzR3TWpNZ1F6WXpMak00TkN3ek5DNHpNamNnTmpJdU1ERXlMRE00TGpZMU55QTFPQzQxTVRRc05EQXVOamMzSUV3ME5pNHlNak1zTkRjdU56YzFJRU0wTlM0d05UTXNORGd1TkRVZ05ETXVOelF5TERRNExqZ3dPQ0EwTWk0ME16UXNORGd1T0RBNElFdzBNaTQwTXpRc05EZ3VPREE0SUZvZ1RUVTFMamN5TVN3eU9DNHhNalVnUXpVMExqUTVOU3d5T0M0eE1qVWdOVE11TWpZMUxESTRMalEyTVNBMU1pNHhOallzTWprdU1EazJJRXd6T1M0NE56VXNNell1TVRrMElFTXpOaTQxT1RZc016Z3VNRGczSURNMUxqTXdNaXcwTWk0eE16WWdNell1T1RreUxEUTFMakl4T0NCRE16Z3VNRFl6TERRM0xqRTNNeUEwTUM0d09UZ3NORGd1TXpRZ05ESXVORE0wTERRNExqTTBJRU0wTXk0Mk5qRXNORGd1TXpRZ05EUXVPRGtzTkRndU1EQTFJRFExTGprNUxEUTNMak0zSUV3MU9DNHlPREVzTkRBdU1qY3lJRU0yTVM0MU5pd3pPQzR6TnprZ05qSXVPRFV6TERNMExqTXpJRFl4TGpFMk5Dd3pNUzR5TkRnZ1F6WXdMakE1TWl3eU9TNHlPVE1nTlRndU1EVTRMREk0TGpFeU5TQTFOUzQzTWpFc01qZ3VNVEkxSUV3MU5TNDNNakVzTWpndU1USTFJRm9pSUdsa1BTSkdhV3hzTFRnaUlHWnBiR3c5SWlNMk1EZEVPRUlpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1UUTVMalU0T0N3eUxqUXdOeUJETVRRNUxqVTRPQ3d5TGpRd055QXhOVFV1TnpZNExEVXVPVGMxSURFMU5pNHpNalVzTmk0eU9UY2dUREUxTmk0ek1qVXNOeTR4T0RRZ1F6RTFOaTR6TWpVc055NHpOaUF4TlRZdU16TTRMRGN1TlRRMElERTFOaTR6TmpJc055NDNNek1nUXpFMU5pNHpOek1zTnk0NE1UUWdNVFUyTGpNNE1pdzNMamc1TkNBeE5UWXVNemtzTnk0NU56VWdRekUxTmk0MU15dzVMak01SURFMU55NHpOak1zTVRBdU9UY3pJREUxT0M0ME9UVXNNVEV1T1RjMElFd3hOalV1T0RreExERTRMalV4T1NCRE1UWTJMakEyT0N3eE9DNDJOelVnTVRZMkxqSTBPU3d4T0M0NE1UUWdNVFkyTGpRek1pd3hPQzQ1TXpRZ1F6RTJPQzR3TVRFc01Ua3VPVGMwSURFMk9TNHpPRElzTVRrdU5DQXhOamt1TkRrMExERTNMalkxTWlCRE1UWTVMalUwTXl3eE5pNDROamdnTVRZNUxqVTFNU3d4Tmk0d05UY2dNVFk1TGpVeE55d3hOUzR5TWpNZ1RERTJPUzQxTVRRc01UVXVNRFl6SUV3eE5qa3VOVEUwTERFekxqa3hNaUJETVRjd0xqYzRMREUwTGpZME1pQXhPVFV1TlRBeExESTRMamt4TlNBeE9UVXVOVEF4TERJNExqa3hOU0JNTVRrMUxqVXdNU3c0TWk0NU1UVWdRekU1TlM0MU1ERXNPRFF1TURBMUlERTVOQzQzTXpFc09EUXVORFExSURFNU15NDNPREVzT0RNdU9EazNJRXd4TlRFdU16QTRMRFU1TGpNM05DQkRNVFV3TGpNMU9DdzFPQzQ0TWpZZ01UUTVMalU0T0N3MU55NDBPVGNnTVRRNUxqVTRPQ3cxTmk0ME1EZ2dUREUwT1M0MU9EZ3NNakl1TXpjMUlpQnBaRDBpUm1sc2JDMDVJaUJtYVd4c1BTSWpSa0ZHUVVaQklqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEU1TkM0MU5UTXNPRFF1TWpVZ1F6RTVOQzR5T1RZc09EUXVNalVnTVRrMExqQXhNeXc0TkM0eE5qVWdNVGt6TGpjeU1pdzRNeTQ1T1RjZ1RERTFNUzR5TlN3MU9TNDBOellnUXpFMU1DNHlOamtzTlRndU9UQTVJREUwT1M0ME56RXNOVGN1TlRNeklERTBPUzQwTnpFc05UWXVOREE0SUV3eE5Ea3VORGN4TERJeUxqTTNOU0JNTVRRNUxqY3dOU3d5TWk0ek56VWdUREUwT1M0M01EVXNOVFl1TkRBNElFTXhORGt1TnpBMUxEVTNMalExT1NBeE5UQXVORFVzTlRndU56UTBJREUxTVM0ek5qWXNOVGt1TWpjMElFd3hPVE11T0RNNUxEZ3pMamM1TlNCRE1UazBMakkyTXl3NE5DNHdOQ0F4T1RRdU5qVTFMRGcwTGpBNE15QXhPVFF1T1RReUxEZ3pMamt4TnlCRE1UazFMakl5Tnl3NE15NDNOVE1nTVRrMUxqTTROQ3c0TXk0ek9UY2dNVGsxTGpNNE5DdzRNaTQ1TVRVZ1RERTVOUzR6T0RRc01qZ3VPVGd5SUVNeE9UUXVNVEF5TERJNExqSTBNaUF4TnpJdU1UQTBMREUxTGpVME1pQXhOamt1TmpNeExERTBMakV4TkNCTU1UWTVMall6TkN3eE5TNHlNaUJETVRZNUxqWTJPQ3d4Tmk0d05USWdNVFk1TGpZMkxERTJMamczTkNBeE5qa3VOakVzTVRjdU5qVTVJRU14TmprdU5UVTJMREU0TGpVd015QXhOamt1TWpFMExERTVMakV5TXlBeE5qZ3VOalEzTERFNUxqUXdOU0JETVRZNExqQXlPQ3d4T1M0M01UUWdNVFkzTGpFNU55d3hPUzQxTnpnZ01UWTJMak0yTnl3eE9TNHdNeklnUXpFMk5pNHhPREVzTVRndU9UQTVJREUyTlM0NU9UVXNNVGd1TnpZMklERTJOUzQ0TVRRc01UZ3VOakEySUV3eE5UZ3VOREUzTERFeUxqQTJNaUJETVRVM0xqSTFPU3d4TVM0d016WWdNVFUyTGpReE9DdzVMalF6TnlBeE5UWXVNamMwTERjdU9UZzJJRU14TlRZdU1qWTJMRGN1T1RBM0lERTFOaTR5TlRjc055NDRNamNnTVRVMkxqSTBOeXczTGpjME9DQkRNVFUyTGpJeU1TdzNMalUxTlNBeE5UWXVNakE1TERjdU16WTFJREUxTmk0eU1Ea3NOeTR4T0RRZ1RERTFOaTR5TURrc05pNHpOalFnUXpFMU5TNHpOelVzTlM0NE9ETWdNVFE1TGpVeU9Td3lMalV3T0NBeE5Ea3VOVEk1TERJdU5UQTRJRXd4TkRrdU5qUTJMREl1TXpBMklFTXhORGt1TmpRMkxESXVNekEySURFMU5TNDRNamNzTlM0NE56UWdNVFUyTGpNNE5DdzJMakU1TmlCTU1UVTJMalEwTWl3MkxqSXpJRXd4TlRZdU5EUXlMRGN1TVRnMElFTXhOVFl1TkRReUxEY3VNelUxSURFMU5pNDBOVFFzTnk0MU16VWdNVFUyTGpRM09DdzNMamN4TnlCRE1UVTJMalE0T1N3M0xqZ2dNVFUyTGpRNU9TdzNMamc0TWlBeE5UWXVOVEEzTERjdU9UWXpJRU14TlRZdU5qUTFMRGt1TXpVNElERTFOeTQwTlRVc01UQXVPRGs0SURFMU9DNDFOeklzTVRFdU9EZzJJRXd4TmpVdU9UWTVMREU0TGpRek1TQkRNVFkyTGpFME1pd3hPQzQxT0RRZ01UWTJMak14T1N3eE9DNDNNaUF4TmpZdU5EazJMREU0TGpnek55QkRNVFkzTGpJMU5Dd3hPUzR6TXpZZ01UWTRMREU1TGpRMk55QXhOamd1TlRRekxERTVMakU1TmlCRE1UWTVMakF6TXl3eE9DNDVOVE1nTVRZNUxqTXlPU3d4T0M0ME1ERWdNVFk1TGpNM055d3hOeTQyTkRVZ1F6RTJPUzQwTWpjc01UWXVPRFkzSURFMk9TNDBNelFzTVRZdU1EVTBJREUyT1M0ME1ERXNNVFV1TWpJNElFd3hOamt1TXprM0xERTFMakEyTlNCTU1UWTVMak01Tnl3eE15NDNNU0JNTVRZNUxqVTNNaXd4TXk0NE1TQkRNVGN3TGpnek9Td3hOQzQxTkRFZ01UazFMalUxT1N3eU9DNDRNVFFnTVRrMUxqVTFPU3d5T0M0NE1UUWdUREU1TlM0Mk1UZ3NNamd1T0RRM0lFd3hPVFV1TmpFNExEZ3lMamt4TlNCRE1UazFMall4T0N3NE15NDBPRFFnTVRrMUxqUXlMRGd6TGpreE1TQXhPVFV1TURVNUxEZzBMakV4T1NCRE1UazBMamt3T0N3NE5DNHlNRFlnTVRrMExqY3pOeXc0TkM0eU5TQXhPVFF1TlRVekxEZzBMakkxSWlCcFpEMGlSbWxzYkMweE1DSWdabWxzYkQwaUl6WXdOMFE0UWlJK1BDOXdZWFJvUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdROUlrMHhORFV1TmpnMUxEVTJMakUyTVNCTU1UWTVMamdzTnpBdU1EZ3pJRXd4TkRNdU9ESXlMRGcxTGpBNE1TQk1NVFF5TGpNMkxEZzBMamMzTkNCRE1UTTFMamd5Tml3NE1pNDJNRFFnTVRJNExqY3pNaXc0TVM0d05EWWdNVEl4TGpNME1TdzRNQzR4TlRnZ1F6RXhOaTQ1TnpZc056a3VOak0wSURFeE1pNDJOemdzT0RFdU1qVTBJREV4TVM0M05ETXNPRE11TnpjNElFTXhNVEV1TlRBMkxEZzBMalF4TkNBeE1URXVOVEF6TERnMUxqQTNNU0F4TVRFdU56TXlMRGcxTGpjd05pQkRNVEV6TGpJM0xEZzVMamszTXlBeE1UVXVPVFk0TERrMExqQTJPU0F4TVRrdU56STNMRGszTGpnME1TQk1NVEl3TGpJMU9TdzVPQzQyT0RZZ1F6RXlNQzR5Tml3NU9DNDJPRFVnT1RRdU1qZ3lMREV4TXk0Mk9ETWdPVFF1TWpneUxERXhNeTQyT0RNZ1REY3dMakUyTnl3NU9TNDNOakVnVERFME5TNDJPRFVzTlRZdU1UWXhJaUJwWkQwaVJtbHNiQzB4TVNJZ1ptbHNiRDBpSTBaR1JrWkdSaUkrUEM5d1lYUm9QZ29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR1E5SWswNU5DNHlPRElzTVRFekxqZ3hPQ0JNT1RRdU1qSXpMREV4TXk0M09EVWdURFk1TGprek15dzVPUzQzTmpFZ1REY3dMakV3T0N3NU9TNDJOaUJNTVRRMUxqWTROU3cxTmk0d01qWWdUREUwTlM0M05ETXNOVFl1TURVNUlFd3hOekF1TURNekxEY3dMakE0TXlCTU1UUXpMamcwTWl3NE5TNHlNRFVnVERFME15NDNPVGNzT0RVdU1UazFJRU14TkRNdU56Y3lMRGcxTGpFNUlERTBNaTR6TXpZc09EUXVPRGc0SURFME1pNHpNellzT0RRdU9EZzRJRU14TXpVdU56ZzNMRGd5TGpjeE5DQXhNamd1TnpJekxEZ3hMakUyTXlBeE1qRXVNekkzTERnd0xqSTNOQ0JETVRJd0xqYzRPQ3c0TUM0eU1Ea2dNVEl3TGpJek5pdzRNQzR4TnpjZ01URTVMalk0T1N3NE1DNHhOemNnUXpFeE5TNDVNekVzT0RBdU1UYzNJREV4TWk0Mk16VXNPREV1TnpBNElERXhNUzQ0TlRJc09ETXVPREU1SUVNeE1URXVOakkwTERnMExqUXpNaUF4TVRFdU5qSXhMRGcxTGpBMU15QXhNVEV1T0RReUxEZzFMalkyTnlCRE1URXpMak0zTnl3NE9TNDVNalVnTVRFMkxqQTFPQ3c1TXk0NU9UTWdNVEU1TGpneExEazNMamMxT0NCTU1URTVMamd5Tml3NU55NDNOemtnVERFeU1DNHpOVElzT1RndU5qRTBJRU14TWpBdU16VTBMRGs0TGpZeE55QXhNakF1TXpVMkxEazRMall5SURFeU1DNHpOVGdzT1RndU5qSTBJRXd4TWpBdU5ESXlMRGs0TGpjeU5pQk1NVEl3TGpNeE55dzVPQzQzT0RjZ1F6RXlNQzR5TmpRc09UZ3VPREU0SURrMExqVTVPU3d4TVRNdU5qTTFJRGswTGpNMExERXhNeTQzT0RVZ1REazBMakk0TWl3eE1UTXVPREU0SUV3NU5DNHlPRElzTVRFekxqZ3hPQ0JhSUUwM01DNDBNREVzT1RrdU56WXhJRXc1TkM0eU9ESXNNVEV6TGpVME9TQk1NVEU1TGpBNE5DdzVPUzR5TWprZ1F6RXhPUzQyTXl3NU9DNDVNVFFnTVRFNUxqa3pMRGs0TGpjMElERXlNQzR4TURFc09UZ3VOalUwSUV3eE1Ua3VOak0xTERrM0xqa3hOQ0JETVRFMUxqZzJOQ3c1TkM0eE1qY2dNVEV6TGpFMk9DdzVNQzR3TXpNZ01URXhMall5TWl3NE5TNDNORFlnUXpFeE1TNHpPRElzT0RVdU1EYzVJREV4TVM0ek9EWXNPRFF1TkRBMElERXhNUzQyTXpNc09ETXVOek00SUVNeE1USXVORFE0TERneExqVXpPU0F4TVRVdU9ETTJMRGM1TGprME15QXhNVGt1TmpnNUxEYzVMamswTXlCRE1USXdMakkwTml3M09TNDVORE1nTVRJd0xqZ3dOaXczT1M0NU56WWdNVEl4TGpNMU5TdzRNQzR3TkRJZ1F6RXlPQzQzTmpjc09EQXVPVE16SURFek5TNDRORFlzT0RJdU5EZzNJREUwTWk0ek9UWXNPRFF1TmpZeklFTXhORE11TWpNeUxEZzBMamd6T0NBeE5ETXVOakV4TERnMExqa3hOeUF4TkRNdU56ZzJMRGcwTGprMk55Qk1NVFk1TGpVMk5pdzNNQzR3T0RNZ1RERTBOUzQyT0RVc05UWXVNamsxSUV3M01DNDBNREVzT1RrdU56WXhJRXczTUM0ME1ERXNPVGt1TnpZeElGb2lJR2xrUFNKR2FXeHNMVEV5SWlCbWFXeHNQU0lqTmpBM1JEaENJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFMk55NHlNeXd4T0M0NU56a2dUREUyTnk0eU15dzJPUzQ0TlNCTU1UTTVMamt3T1N3NE5TNDJNak1nVERFek15NDBORGdzTnpFdU5EVTJJRU14TXpJdU5UTTRMRFk1TGpRMklERXpNQzR3TWl3Mk9TNDNNVGdnTVRJM0xqZ3lOQ3czTWk0d015QkRNVEkyTGpjMk9TdzNNeTR4TkNBeE1qVXVPVE14TERjMExqVTROU0F4TWpVdU5EazBMRGMyTGpBME9DQk1NVEU1TGpBek5DdzVOeTQyTnpZZ1REa3hMamN4TWl3eE1UTXVORFVnVERreExqY3hNaXcyTWk0MU56a2dUREUyTnk0eU15d3hPQzQ1TnpraUlHbGtQU0pHYVd4c0xURXpJaUJtYVd4c1BTSWpSa1pHUmtaR0lqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVGt4TGpjeE1pd3hNVE11TlRZM0lFTTVNUzQyT1RJc01URXpMalUyTnlBNU1TNDJOeklzTVRFekxqVTJNU0E1TVM0Mk5UTXNNVEV6TGpVMU1TQkRPVEV1TmpFNExERXhNeTQxTXlBNU1TNDFPVFVzTVRFekxqUTVNaUE1TVM0MU9UVXNNVEV6TGpRMUlFdzVNUzQxT1RVc05qSXVOVGM1SUVNNU1TNDFPVFVzTmpJdU5UTTNJRGt4TGpZeE9DdzJNaTQwT1RrZ09URXVOalV6TERZeUxqUTNPQ0JNTVRZM0xqRTNNaXd4T0M0NE56Z2dRekUyTnk0eU1EZ3NNVGd1T0RVM0lERTJOeTR5TlRJc01UZ3VPRFUzSURFMk55NHlPRGdzTVRndU9EYzRJRU14TmpjdU16STBMREU0TGpnNU9TQXhOamN1TXpRM0xERTRMamt6TnlBeE5qY3VNelEzTERFNExqazNPU0JNTVRZM0xqTTBOeXcyT1M0NE5TQkRNVFkzTGpNME55dzJPUzQ0T1RFZ01UWTNMak15TkN3Mk9TNDVNeUF4TmpjdU1qZzRMRFk1TGprMUlFd3hNemt1T1RZM0xEZzFMamN5TlNCRE1UTTVMamt6T1N3NE5TNDNOREVnTVRNNUxqa3dOU3c0TlM0M05EVWdNVE01TGpnM015dzROUzQzTXpVZ1F6RXpPUzQ0TkRJc09EVXVOekkxSURFek9TNDRNVFlzT0RVdU56QXlJREV6T1M0NE1ESXNPRFV1TmpjeUlFd3hNek11TXpReUxEY3hMalV3TkNCRE1UTXlMamsyTnl3M01DNDJPRElnTVRNeUxqSTRMRGN3TGpJeU9TQXhNekV1TkRBNExEY3dMakl5T1NCRE1UTXdMak14T1N3M01DNHlNamtnTVRJNUxqQTBOQ3czTUM0NU1UVWdNVEkzTGprd09DdzNNaTR4TVNCRE1USTJMamczTkN3M015NHlJREV5Tmk0d016UXNOelF1TmpRM0lERXlOUzQyTURZc056WXVNRGd5SUV3eE1Ua3VNVFEyTERrM0xqY3dPU0JETVRFNUxqRXpOeXc1Tnk0M016Z2dNVEU1TGpFeE9DdzVOeTQzTmpJZ01URTVMakE1TWl3NU55NDNOemNnVERreExqYzNMREV4TXk0MU5URWdRemt4TGpjMU1pd3hNVE11TlRZeElEa3hMamN6TWl3eE1UTXVOVFkzSURreExqY3hNaXd4TVRNdU5UWTNJRXc1TVM0M01USXNNVEV6TGpVMk55QmFJRTA1TVM0NE1qa3NOakl1TmpRM0lFdzVNUzQ0TWprc01URXpMakkwT0NCTU1URTRMamt6TlN3NU55NDFPVGdnVERFeU5TNHpPRElzTnpZdU1ERTFJRU14TWpVdU9ESTNMRGMwTGpVeU5TQXhNall1TmpZMExEY3pMakE0TVNBeE1qY3VOek01TERjeExqazFJRU14TWpndU9URTVMRGN3TGpjd09DQXhNekF1TWpVMkxEWTVMams1TmlBeE16RXVOREE0TERZNUxqazVOaUJETVRNeUxqTTNOeXcyT1M0NU9UWWdNVE16TGpFek9TdzNNQzQwT1RjZ01UTXpMalUxTkN3M01TNDBNRGNnVERFek9TNDVOakVzT0RVdU5EVTRJRXd4TmpjdU1URXpMRFk1TGpjNE1pQk1NVFkzTGpFeE15d3hPUzR4T0RFZ1REa3hMamd5T1N3Mk1pNDJORGNnVERreExqZ3lPU3cyTWk0Mk5EY2dXaUlnYVdROUlrWnBiR3d0TVRRaUlHWnBiR3c5SWlNMk1EZEVPRUlpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1UWTRMalUwTXl3eE9TNHlNVE1nVERFMk9DNDFORE1zTnpBdU1EZ3pJRXd4TkRFdU1qSXhMRGcxTGpnMU55Qk1NVE0wTGpjMk1TdzNNUzQyT0RrZ1F6RXpNeTQ0TlRFc05qa3VOamswSURFek1TNHpNek1zTmprdU9UVXhJREV5T1M0eE16Y3NOekl1TWpZeklFTXhNamd1TURneUxEY3pMak0zTkNBeE1qY3VNalEwTERjMExqZ3hPU0F4TWpZdU9EQTNMRGMyTGpJNE1pQk1NVEl3TGpNME5pdzVOeTQ1TURrZ1REa3pMakF5TlN3eE1UTXVOamd6SUV3NU15NHdNalVzTmpJdU9ERXpJRXd4TmpndU5UUXpMREU1TGpJeE15SWdhV1E5SWtacGJHd3RNVFVpSUdacGJHdzlJaU5HUmtaR1JrWWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOT1RNdU1ESTFMREV4TXk0NElFTTVNeTR3TURVc01URXpMamdnT1RJdU9UZzBMREV4TXk0M09UVWdPVEl1T1RZMkxERXhNeTQzT0RVZ1F6a3lMamt6TVN3eE1UTXVOelkwSURreUxqa3dPQ3d4TVRNdU56STFJRGt5TGprd09Dd3hNVE11TmpnMElFdzVNaTQ1TURnc05qSXVPREV6SUVNNU1pNDVNRGdzTmpJdU56Y3hJRGt5TGprek1TdzJNaTQzTXpNZ09USXVPVFkyTERZeUxqY3hNaUJNTVRZNExqUTROQ3d4T1M0eE1USWdRekUyT0M0MU1pd3hPUzR3T1NBeE5qZ3VOVFkxTERFNUxqQTVJREUyT0M0Mk1ERXNNVGt1TVRFeUlFTXhOamd1TmpNM0xERTVMakV6TWlBeE5qZ3VOallzTVRrdU1UY3hJREUyT0M0Mk5pd3hPUzR5TVRJZ1RERTJPQzQyTml3M01DNHdPRE1nUXpFMk9DNDJOaXczTUM0eE1qVWdNVFk0TGpZek55dzNNQzR4TmpRZ01UWTRMall3TVN3M01DNHhPRFFnVERFME1TNHlPQ3c0TlM0NU5UZ2dRekUwTVM0eU5URXNPRFV1T1RjMUlERTBNUzR5TVRjc09EVXVPVGM1SURFME1TNHhPRFlzT0RVdU9UWTRJRU14TkRFdU1UVTBMRGcxTGprMU9DQXhOREV1TVRJNUxEZzFMamt6TmlBeE5ERXVNVEUxTERnMUxqa3dOaUJNTVRNMExqWTFOU3czTVM0M016Z2dRekV6TkM0eU9DdzNNQzQ1TVRVZ01UTXpMalU1TXl3M01DNDBOak1nTVRNeUxqY3lMRGN3TGpRMk15QkRNVE14TGpZek1pdzNNQzQwTmpNZ01UTXdMak0xTnl3M01TNHhORGdnTVRJNUxqSXlNU3czTWk0ek5EUWdRekV5T0M0eE9EWXNOek11TkRNeklERXlOeTR6TkRjc056UXVPRGd4SURFeU5pNDVNVGtzTnpZdU16RTFJRXd4TWpBdU5EVTRMRGszTGprME15QkRNVEl3TGpRMUxEazNMamszTWlBeE1qQXVORE14TERrM0xqazVOaUF4TWpBdU5EQTFMRGs0TGpBeElFdzVNeTR3T0RNc01URXpMamM0TlNCRE9UTXVNRFkxTERFeE15NDNPVFVnT1RNdU1EUTFMREV4TXk0NElEa3pMakF5TlN3eE1UTXVPQ0JNT1RNdU1ESTFMREV4TXk0NElGb2dUVGt6TGpFME1pdzJNaTQ0T0RFZ1REa3pMakUwTWl3eE1UTXVORGd4SUV3eE1qQXVNalE0TERrM0xqZ3pNaUJNTVRJMkxqWTVOU3czTmk0eU5EZ2dRekV5Tnk0eE5DdzNOQzQzTlRnZ01USTNMamszTnl3M015NHpNVFVnTVRJNUxqQTFNaXczTWk0eE9ETWdRekV6TUM0eU16RXNOekF1T1RReUlERXpNUzQxTmpnc056QXVNakk1SURFek1pNDNNaXczTUM0eU1qa2dRekV6TXk0Mk9Ea3NOekF1TWpJNUlERXpOQzQwTlRJc056QXVOek14SURFek5DNDROamNzTnpFdU5qUXhJRXd4TkRFdU1qYzBMRGcxTGpZNU1pQk1NVFk0TGpReU5pdzNNQzR3TVRZZ1RERTJPQzQwTWpZc01Ua3VOREUxSUV3NU15NHhORElzTmpJdU9EZ3hJRXc1TXk0eE5ESXNOakl1T0RneElGb2lJR2xrUFNKR2FXeHNMVEUySWlCbWFXeHNQU0lqTmpBM1JEaENJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFMk9TNDRMRGN3TGpBNE15Qk1NVFF5TGpRM09DdzROUzQ0TlRjZ1RERXpOaTR3TVRnc056RXVOamc1SUVNeE16VXVNVEE0TERZNUxqWTVOQ0F4TXpJdU5Ua3NOamt1T1RVeElERXpNQzR6T1RNc056SXVNall6SUVNeE1qa3VNek01TERjekxqTTNOQ0F4TWpndU5TdzNOQzQ0TVRrZ01USTRMakEyTkN3M05pNHlPRElnVERFeU1TNDJNRE1zT1RjdU9UQTVJRXc1TkM0eU9ESXNNVEV6TGpZNE15Qk1PVFF1TWpneUxEWXlMamd4TXlCTU1UWTVMamdzTVRrdU1qRXpJRXd4TmprdU9DdzNNQzR3T0RNZ1dpSWdhV1E5SWtacGJHd3RNVGNpSUdacGJHdzlJaU5HUVVaQlJrRWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOT1RRdU1qZ3lMREV4TXk0NU1UY2dRemswTGpJME1Td3hNVE11T1RFM0lEazBMakl3TVN3eE1UTXVPVEEzSURrMExqRTJOU3d4TVRNdU9EZzJJRU01TkM0d09UTXNNVEV6TGpnME5TQTVOQzR3TkRnc01URXpMamMyTnlBNU5DNHdORGdzTVRFekxqWTROQ0JNT1RRdU1EUTRMRFl5TGpneE15QkRPVFF1TURRNExEWXlMamN6SURrMExqQTVNeXcyTWk0Mk5USWdPVFF1TVRZMUxEWXlMall4TVNCTU1UWTVMalk0TXl3eE9TNHdNU0JETVRZNUxqYzFOU3d4T0M0NU5qa2dNVFk1TGpnME5Dd3hPQzQ1TmprZ01UWTVMamt4Tnl3eE9TNHdNU0JETVRZNUxqazRPU3d4T1M0d05USWdNVGN3TGpBek15d3hPUzR4TWprZ01UY3dMakF6TXl3eE9TNHlNVElnVERFM01DNHdNek1zTnpBdU1EZ3pJRU14TnpBdU1ETXpMRGN3TGpFMk5pQXhOamt1T1RnNUxEY3dMakkwTkNBeE5qa3VPVEUzTERjd0xqSTROU0JNTVRReUxqVTVOU3c0Tmk0d05pQkRNVFF5TGpVek9DdzROaTR3T1RJZ01UUXlMalEyT1N3NE5pNHhJREUwTWk0ME1EY3NPRFl1TURnZ1F6RTBNaTR6TkRRc09EWXVNRFlnTVRReUxqSTVNeXc0Tmk0d01UUWdNVFF5TGpJMk5pdzROUzQ1TlRRZ1RERXpOUzQ0TURVc056RXVOemcySUVNeE16VXVORFExTERjd0xqazVOeUF4TXpRdU9ERXpMRGN3TGpVNElERXpNeTQ1Tnpjc056QXVOVGdnUXpFek1pNDVNakVzTnpBdU5UZ2dNVE14TGpZM05pdzNNUzR5TlRJZ01UTXdMalUyTWl3M01pNDBNalFnUXpFeU9TNDFOQ3czTXk0MU1ERWdNVEk0TGpjeE1TdzNOQzQ1TXpFZ01USTRMakk0Tnl3M05pNHpORGdnVERFeU1TNDRNamNzT1RjdU9UYzJJRU14TWpFdU9ERXNPVGd1TURNMElERXlNUzQzTnpFc09UZ3VNRGd5SURFeU1TNDNNaXc1T0M0eE1USWdURGswTGpNNU9Dd3hNVE11T0RnMklFTTVOQzR6TmpJc01URXpMamt3TnlBNU5DNHpNaklzTVRFekxqa3hOeUE1TkM0eU9ESXNNVEV6TGpreE55Qk1PVFF1TWpneUxERXhNeTQ1TVRjZ1dpQk5PVFF1TlRFMUxEWXlMamswT0NCTU9UUXVOVEUxTERFeE15NHlOemtnVERFeU1TNDBNRFlzT1RjdU56VTBJRXd4TWpjdU9EUXNOell1TWpFMUlFTXhNamd1TWprc056UXVOekE0SURFeU9TNHhNemNzTnpNdU1qUTNJREV6TUM0eU1qUXNOekl1TVRBeklFTXhNekV1TkRJMUxEY3dMamd6T0NBeE16SXVOemt6TERjd0xqRXhNaUF4TXpNdU9UYzNMRGN3TGpFeE1pQkRNVE0wTGprNU5TdzNNQzR4TVRJZ01UTTFMamM1TlN3M01DNDJNemdnTVRNMkxqSXpMRGN4TGpVNU1pQk1NVFF5TGpVNE5DdzROUzQxTWpZZ1RERTJPUzQxTmpZc05qa3VPVFE0SUV3eE5qa3VOVFkyTERFNUxqWXhOeUJNT1RRdU5URTFMRFl5TGprME9DQk1PVFF1TlRFMUxEWXlMamswT0NCYUlpQnBaRDBpUm1sc2JDMHhPQ0lnWm1sc2JEMGlJell3TjBRNFFpSStQQzl3WVhSb1Bnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4TURrdU9EazBMRGt5TGprME15Qk1NVEE1TGpnNU5DdzVNaTQ1TkRNZ1F6RXdPQzR4TWl3NU1pNDVORE1nTVRBMkxqWTFNeXc1TWk0eU1UZ2dNVEExTGpZMUxEa3dMamd5TXlCRE1UQTFMalU0TXl3NU1DNDNNekVnTVRBMUxqVTVNeXc1TUM0Mk1TQXhNRFV1TmpjekxEa3dMalV5T1NCRE1UQTFMamMxTXl3NU1DNDBORGdnTVRBMUxqZzRMRGt3TGpRMElERXdOUzQ1TnpRc09UQXVOVEEySUVNeE1EWXVOelUwTERreExqQTFNeUF4TURjdU5qYzVMRGt4TGpNek15QXhNRGd1TnpJMExEa3hMak16TXlCRE1URXdMakEwTnl3NU1TNHpNek1nTVRFeExqUTNPQ3c1TUM0NE9UUWdNVEV5TGprNExEa3dMakF5TnlCRE1URTRMakk1TVN3NE5pNDVOaUF4TWpJdU5qRXhMRGM1TGpVd09TQXhNakl1TmpFeExEY3pMalF4TmlCRE1USXlMall4TVN3M01TNDBPRGtnTVRJeUxqRTJPU3cyT1M0NE5UWWdNVEl4TGpNek15dzJPQzQyT1RJZ1F6RXlNUzR5TmpZc05qZ3VOaUF4TWpFdU1qYzJMRFk0TGpRM015QXhNakV1TXpVMkxEWTRMak01TWlCRE1USXhMalF6Tml3Mk9DNHpNVEVnTVRJeExqVTJNeXcyT0M0eU9Ua2dNVEl4TGpZMU5pdzJPQzR6TmpVZ1F6RXlNeTR6TWpjc05qa3VOVE0zSURFeU5DNHlORGNzTnpFdU56UTJJREV5TkM0eU5EY3NOelF1TlRnMElFTXhNalF1TWpRM0xEZ3dMamd5TmlBeE1Ua3VPREl4TERnNExqUTBOeUF4TVRRdU16Z3lMRGt4TGpVNE55QkRNVEV5TGpnd09DdzVNaTQwT1RVZ01URXhMakk1T0N3NU1pNDVORE1nTVRBNUxqZzVOQ3c1TWk0NU5ETWdUREV3T1M0NE9UUXNPVEl1T1RReklGb2dUVEV3Tmk0NU1qVXNPVEV1TkRBeElFTXhNRGN1TnpNNExEa3lMakExTWlBeE1EZ3VOelExTERreUxqSTNPQ0F4TURrdU9Ea3pMRGt5TGpJM09DQk1NVEE1TGpnNU5DdzVNaTR5TnpnZ1F6RXhNUzR5TVRVc09USXVNamM0SURFeE1pNDJORGNzT1RFdU9UVXhJREV4TkM0eE5EZ3NPVEV1TURnMElFTXhNVGt1TkRVNUxEZzRMakF4TnlBeE1qTXVOemdzT0RBdU5qSXhJREV5TXk0M09DdzNOQzQxTWpnZ1F6RXlNeTQzT0N3M01pNDFORGtnTVRJekxqTXhOeXczTUM0NU1qa2dNVEl5TGpRMU5DdzJPUzQzTmpjZ1F6RXlNaTQ0TmpVc056QXVPREF5SURFeU15NHdOemtzTnpJdU1EUXlJREV5TXk0d056a3NOek11TkRBeUlFTXhNak11TURjNUxEYzVMalkwTlNBeE1UZ3VOalV6TERnM0xqSTROU0F4TVRNdU1qRTBMRGt3TGpReU5TQkRNVEV4TGpZMExEa3hMak16TkNBeE1UQXVNVE1zT1RFdU56UXlJREV3T0M0M01qUXNPVEV1TnpReUlFTXhNRGd1TURnekxEa3hMamMwTWlBeE1EY3VORGd4TERreExqVTVNeUF4TURZdU9USTFMRGt4TGpRd01TQk1NVEEyTGpreU5TdzVNUzQwTURFZ1dpSWdhV1E5SWtacGJHd3RNVGtpSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRFekxqQTVOeXc1TUM0eU15QkRNVEU0TGpRNE1TdzROeTR4TWpJZ01USXlMamcwTlN3M09TNDFPVFFnTVRJeUxqZzBOU3czTXk0ME1UWWdRekV5TWk0NE5EVXNOekV1TXpZMUlERXlNaTR6TmpJc05qa3VOekkwSURFeU1TNDFNaklzTmpndU5UVTJJRU14TVRrdU56TTRMRFkzTGpNd05DQXhNVGN1TVRRNExEWTNMak0yTWlBeE1UUXVNalkxTERZNUxqQXlOaUJETVRBNExqZzRNU3czTWk0eE16UWdNVEEwTGpVeE55dzNPUzQyTmpJZ01UQTBMalV4Tnl3NE5TNDROQ0JETVRBMExqVXhOeXc0Tnk0NE9URWdNVEExTERnNUxqVXpNaUF4TURVdU9EUXNPVEF1TnlCRE1UQTNMall5TkN3NU1TNDVOVElnTVRFd0xqSXhOQ3c1TVM0NE9UUWdNVEV6TGpBNU55dzVNQzR5TXlJZ2FXUTlJa1pwYkd3dE1qQWlJR1pwYkd3OUlpTkdRVVpCUmtFaVBqd3ZjR0YwYUQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCa1BTSk5NVEE0TGpjeU5DdzVNUzQyTVRRZ1RERXdPQzQzTWpRc09URXVOakUwSUVNeE1EY3VOVGd5TERreExqWXhOQ0F4TURZdU5UWTJMRGt4TGpRd01TQXhNRFV1TnpBMUxEa3dMamM1TnlCRE1UQTFMalk0TkN3NU1DNDNPRE1nTVRBMUxqWTJOU3c1TUM0NE1URWdNVEExTGpZMUxEa3dMamM1SUVNeE1EUXVOelUyTERnNUxqVTBOaUF4TURRdU1qZ3pMRGczTGpnME1pQXhNRFF1TWpnekxEZzFMamd4TnlCRE1UQTBMakk0TXl3M09TNDFOelVnTVRBNExqY3dPU3czTVM0NU5UTWdNVEUwTGpFME9DdzJPQzQ0TVRJZ1F6RXhOUzQzTWpJc05qY3VPVEEwSURFeE55NHlNeklzTmpjdU5EUTVJREV4T0M0Mk16Z3NOamN1TkRRNUlFTXhNVGt1Tnpnc05qY3VORFE1SURFeU1DNDNPVFlzTmpjdU56VTRJREV5TVM0Mk5UWXNOamd1TXpZeUlFTXhNakV1TmpjNExEWTRMak0zTnlBeE1qRXVOamszTERZNExqTTVOeUF4TWpFdU56RXlMRFk0TGpReE9DQkRNVEl5TGpZd05pdzJPUzQyTmpJZ01USXpMakEzT1N3M01TNHpPU0F4TWpNdU1EYzVMRGN6TGpReE5TQkRNVEl6TGpBM09TdzNPUzQyTlRnZ01URTRMalkxTXl3NE55NHhPVGdnTVRFekxqSXhOQ3c1TUM0ek16Z2dRekV4TVM0Mk5DdzVNUzR5TkRjZ01URXdMakV6TERreExqWXhOQ0F4TURndU56STBMRGt4TGpZeE5DQk1NVEE0TGpjeU5DdzVNUzQyTVRRZ1dpQk5NVEEyTGpBd05pdzVNQzQxTURVZ1F6RXdOaTQzT0N3NU1TNHdNemNnTVRBM0xqWTVOQ3c1TVM0eU9ERWdNVEE0TGpjeU5DdzVNUzR5T0RFZ1F6RXhNQzR3TkRjc09URXVNamd4SURFeE1TNDBOemdzT1RBdU9EWTRJREV4TWk0NU9DdzVNQzR3TURFZ1F6RXhPQzR5T1RFc09EWXVPVE0xSURFeU1pNDJNVEVzTnprdU5EazJJREV5TWk0Mk1URXNOek11TkRBeklFTXhNakl1TmpFeExEY3hMalE1TkNBeE1qSXVNVGMzTERZNUxqZzRJREV5TVM0ek5UWXNOamd1TnpFNElFTXhNakF1TlRneUxEWTRMakU0TlNBeE1Ua3VOalk0TERZM0xqa3hPU0F4TVRndU5qTTRMRFkzTGpreE9TQkRNVEUzTGpNeE5TdzJOeTQ1TVRrZ01URTFMamc0TXl3Mk9DNHpOaUF4TVRRdU16Z3lMRFk1TGpJeU55QkRNVEE1TGpBM01TdzNNaTR5T1RNZ01UQTBMamMxTVN3M09TNDNNek1nTVRBMExqYzFNU3c0TlM0NE1qWWdRekV3TkM0M05URXNPRGN1TnpNMUlERXdOUzR4T0RVc09Ea3VNelF6SURFd05pNHdNRFlzT1RBdU5UQTFJRXd4TURZdU1EQTJMRGt3TGpVd05TQmFJaUJwWkQwaVJtbHNiQzB5TVNJZ1ptbHNiRDBpSXpZd04wUTRRaUkrUEM5d1lYUm9QZ29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR1E5SWsweE5Ea3VNekU0TERjdU1qWXlJRXd4TXprdU16TTBMREUyTGpFMElFd3hOVFV1TWpJM0xESTNMakUzTVNCTU1UWXdMamd4Tml3eU1TNHdOVGtnVERFME9TNHpNVGdzTnk0eU5qSWlJR2xrUFNKR2FXeHNMVEl5SWlCbWFXeHNQU0lqUmtGR1FVWkJJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFMk9TNDJOellzTVRNdU9EUWdUREUxT1M0NU1qZ3NNVGt1TkRZM0lFTXhOVFl1TWpnMkxESXhMalUzSURFMU1DNDBMREl4TGpVNElERTBOaTQzT0RFc01Ua3VORGt4SUVNeE5ETXVNVFl4TERFM0xqUXdNaUF4TkRNdU1UZ3NNVFF1TURBeklERTBOaTQ0TWpJc01URXVPU0JNTVRVMkxqTXhOeXcyTGpJNU1pQk1NVFE1TGpVNE9Dd3lMalF3TnlCTU5qY3VOelV5TERRNUxqUTNPQ0JNTVRFekxqWTNOU3czTlM0NU9USWdUREV4Tmk0M05UWXNOelF1TWpFeklFTXhNVGN1TXpnM0xEY3pMamcwT0NBeE1UY3VOakkxTERjekxqTXhOU0F4TVRjdU16YzBMRGN5TGpneU15QkRNVEUxTGpBeE55dzJPQzR4T1RFZ01URTBMamM0TVN3Mk15NHlOemNnTVRFMkxqWTVNU3cxT0M0MU5qRWdRekV5TWk0ek1qa3NORFF1TmpReElERTBNUzR5TERNekxqYzBOaUF4TmpVdU16QTVMRE13TGpRNU1TQkRNVGN6TGpRM09Dd3lPUzR6T0RnZ01UZ3hMams0T1N3eU9TNDFNalFnTVRrd0xqQXhNeXd6TUM0NE9EVWdRekU1TUM0NE5qVXNNekV1TURNZ01Ua3hMamM0T1N3ek1DNDRPVE1nTVRreUxqUXlMRE13TGpVeU9DQk1NVGsxTGpVd01Td3lPQzQzTlNCTU1UWTVMalkzTml3eE15NDROQ0lnYVdROUlrWnBiR3d0TWpNaUlHWnBiR3c5SWlOR1FVWkJSa0VpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1URXpMalkzTlN3M05pNDBOVGtnUXpFeE15NDFPVFFzTnpZdU5EVTVJREV4TXk0MU1UUXNOell1TkRNNElERXhNeTQwTkRJc056WXVNemszSUV3Mk55NDFNVGdzTkRrdU9EZ3lJRU0yTnk0ek56UXNORGt1TnprNUlEWTNMakk0TkN3ME9TNDJORFVnTmpjdU1qZzFMRFE1TGpRM09DQkROamN1TWpnMUxEUTVMak14TVNBMk55NHpOelFzTkRrdU1UVTNJRFkzTGpVeE9TdzBPUzR3TnpNZ1RERTBPUzR6TlRVc01pNHdNRElnUXpFME9TNDBPVGtzTVM0NU1Ua2dNVFE1TGpZM055d3hMamt4T1NBeE5Ea3VPREl4TERJdU1EQXlJRXd4TlRZdU5UVXNOUzQ0T0RjZ1F6RTFOaTQzTnpRc05pNHdNVGNnTVRVMkxqZzFMRFl1TXpBeUlERTFOaTQzTWpJc05pNDFNallnUXpFMU5pNDFPVElzTmk0M05Ea2dNVFUyTGpNd055dzJMamd5TmlBeE5UWXVNRGd6TERZdU5qazJJRXd4TkRrdU5UZzNMREl1T1RRMklFdzJPQzQyT0Rjc05Ea3VORGM1SUV3eE1UTXVOamMxTERjMUxqUTFNaUJNTVRFMkxqVXlNeXczTXk0NE1EZ2dRekV4Tmk0M01UVXNOek11TmprM0lERXhOeTR4TkRNc056TXVNems1SURFeE5pNDVOVGdzTnpNdU1ETTFJRU14TVRRdU5UUXlMRFk0TGpJNE55QXhNVFF1TXl3Mk15NHlNakVnTVRFMkxqSTFPQ3cxT0M0ek9EVWdRekV4T1M0d05qUXNOVEV1TkRVNElERXlOUzR4TkRNc05EVXVNVFF6SURFek15NDROQ3cwTUM0eE1qSWdRekUwTWk0ME9UY3NNelV1TVRJMElERTFNeTR6TlRnc016RXVOak16SURFMk5TNHlORGNzTXpBdU1ESTRJRU14TnpNdU5EUTFMREk0TGpreU1TQXhPREl1TURNM0xESTVMakExT0NBeE9UQXVNRGt4TERNd0xqUXlOU0JETVRrd0xqZ3pMRE13TGpVMUlERTVNUzQyTlRJc016QXVORE15SURFNU1pNHhPRFlzTXpBdU1USTBJRXd4T1RRdU5UWTNMREk0TGpjMUlFd3hOamt1TkRReUxERTBMakkwTkNCRE1UWTVMakl4T1N3eE5DNHhNVFVnTVRZNUxqRTBNaXd4TXk0NE1qa2dNVFk1TGpJM01Td3hNeTQyTURZZ1F6RTJPUzQwTERFekxqTTRNaUF4TmprdU5qZzFMREV6TGpNd05pQXhOamt1T1RBNUxERXpMalF6TlNCTU1UazFMamN6TkN3eU9DNHpORFVnUXpFNU5TNDROemtzTWpndU5ESTRJREU1TlM0NU5qZ3NNamd1TlRneklERTVOUzQ1Tmpnc01qZ3VOelVnUXpFNU5TNDVOamdzTWpndU9URTJJREU1TlM0NE56a3NNamt1TURjeElERTVOUzQzTXpRc01qa3VNVFUwSUV3eE9USXVOalV6TERNd0xqa3pNeUJETVRreExqa3pNaXd6TVM0ek5TQXhPVEF1T0Rrc016RXVOVEE0SURFNE9TNDVNelVzTXpFdU16UTJJRU14T0RFdU9UY3lMREk1TGprNU5TQXhOek11TkRjNExESTVMamcySURFMk5TNHpOeklzTXpBdU9UVTBJRU14TlRNdU5qQXlMRE15TGpVME15QXhOREl1T0RZc016VXVPVGt6SURFek5DNHpNRGNzTkRBdU9UTXhJRU14TWpVdU56a3pMRFExTGpnME55QXhNVGt1T0RVeExEVXlMakF3TkNBeE1UY3VNVEkwTERVNExqY3pOaUJETVRFMUxqSTNMRFl6TGpNeE5DQXhNVFV1TlRBeExEWTRMakV4TWlBeE1UY3VOemtzTnpJdU5qRXhJRU14TVRndU1UWXNOek11TXpNMklERXhOeTQ0TkRVc056UXVNVEkwSURFeE5pNDVPU3czTkM0Mk1UY2dUREV4TXk0NU1Ea3NOell1TXprM0lFTXhNVE11T0RNMkxEYzJMalF6T0NBeE1UTXVOelUyTERjMkxqUTFPU0F4TVRNdU5qYzFMRGMyTGpRMU9TSWdhV1E5SWtacGJHd3RNalFpSUdacGJHdzlJaU0wTlRWQk5qUWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRVekxqTXhOaXd5TVM0eU56a2dRekUxTUM0NU1ETXNNakV1TWpjNUlERTBPQzQwT1RVc01qQXVOelV4SURFME5pNDJOalFzTVRrdU5qa3pJRU14TkRRdU9EUTJMREU0TGpZME5DQXhORE11T0RRMExERTNMakl6TWlBeE5ETXVPRFEwTERFMUxqY3hPQ0JETVRRekxqZzBOQ3d4TkM0eE9URWdNVFEwTGpnMkxERXlMamMyTXlBeE5EWXVOekExTERFeExqWTVPQ0JNTVRVMkxqRTVPQ3cyTGpBNU1TQkRNVFUyTGpNd09TdzJMakF5TlNBeE5UWXVORFV5TERZdU1EWXlJREUxTmk0MU1UZ3NOaTR4TnpNZ1F6RTFOaTQxT0RNc05pNHlPRFFnTVRVMkxqVTBOeXcyTGpReU55QXhOVFl1TkRNMkxEWXVORGt6SUV3eE5EWXVPVFFzTVRJdU1UQXlJRU14TkRVdU1qUTBMREV6TGpBNE1TQXhORFF1TXpFeUxERTBMak0yTlNBeE5EUXVNekV5TERFMUxqY3hPQ0JETVRRMExqTXhNaXd4Tnk0d05UZ2dNVFExTGpJekxERTRMak15TmlBeE5EWXVPRGszTERFNUxqSTRPU0JETVRVd0xqUTBOaXd5TVM0ek16Z2dNVFUyTGpJMExESXhMak15TnlBeE5Ua3VPREV4TERFNUxqSTJOU0JNTVRZNUxqVTFPU3d4TXk0Mk16Y2dRekUyT1M0Mk55d3hNeTQxTnpNZ01UWTVMamd4TXl3eE15NDJNVEVnTVRZNUxqZzNPQ3d4TXk0M01qTWdRekUyT1M0NU5ETXNNVE11T0RNMElERTJPUzQ1TURRc01UTXVPVGMzSURFMk9TNDNPVE1zTVRRdU1EUXlJRXd4TmpBdU1EUTFMREU1TGpZM0lFTXhOVGd1TVRnM0xESXdMamMwTWlBeE5UVXVOelE1TERJeExqSTNPU0F4TlRNdU16RTJMREl4TGpJM09TSWdhV1E5SWtacGJHd3RNalVpSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRFekxqWTNOU3czTlM0NU9USWdURFkzTGpjMk1pdzBPUzQwT0RRaUlHbGtQU0pHYVd4c0xUSTJJaUJtYVd4c1BTSWpORFUxUVRZMElqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEV4TXk0Mk56VXNOell1TXpReUlFTXhNVE11TmpFMUxEYzJMak0wTWlBeE1UTXVOVFUxTERjMkxqTXlOeUF4TVRNdU5TdzNOaTR5T1RVZ1REWTNMalU0Tnl3ME9TNDNPRGNnUXpZM0xqUXhPU3cwT1M0Mk9TQTJOeTR6TmpJc05Ea3VORGMySURZM0xqUTFPU3cwT1M0ek1Ea2dRelkzTGpVMU5pdzBPUzR4TkRFZ05qY3VOemNzTkRrdU1EZ3pJRFkzTGprek55dzBPUzR4T0NCTU1URXpMamcxTERjMUxqWTRPQ0JETVRFMExqQXhPQ3czTlM0M09EVWdNVEUwTGpBM05TdzNOaUF4TVRNdU9UYzRMRGMyTGpFMk55QkRNVEV6TGpreE5DdzNOaTR5TnprZ01URXpMamM1Tml3M05pNHpORElnTVRFekxqWTNOU3czTmk0ek5ESWlJR2xrUFNKR2FXeHNMVEkzSWlCbWFXeHNQU0lqTkRVMVFUWTBJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRZM0xqYzJNaXcwT1M0ME9EUWdURFkzTGpjMk1pd3hNRE11TkRnMUlFTTJOeTQzTmpJc01UQTBMalUzTlNBMk9DNDFNeklzTVRBMUxqa3dNeUEyT1M0ME9ESXNNVEEyTGpRMU1pQk1NVEV4TGprMU5Td3hNekF1T1RjeklFTXhNVEl1T1RBMUxERXpNUzQxTWpJZ01URXpMalkzTlN3eE16RXVNRGd6SURFeE15NDJOelVzTVRJNUxqazVNeUJNTVRFekxqWTNOU3czTlM0NU9USWlJR2xrUFNKR2FXeHNMVEk0SWlCbWFXeHNQU0lqUmtGR1FVWkJJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFeE1pNDNNamNzTVRNeExqVTJNU0JETVRFeUxqUXpMREV6TVM0MU5qRWdNVEV5TGpFd055d3hNekV1TkRZMklERXhNUzQzT0N3eE16RXVNamMySUV3Mk9TNHpNRGNzTVRBMkxqYzFOU0JETmpndU1qUTBMREV3Tmk0eE5ESWdOamN1TkRFeUxERXdOQzQzTURVZ05qY3VOREV5TERFd015NDBPRFVnVERZM0xqUXhNaXcwT1M0ME9EUWdRelkzTGpReE1pdzBPUzR5T1NBMk55NDFOamtzTkRrdU1UTTBJRFkzTGpjMk1pdzBPUzR4TXpRZ1F6WTNMamsxTml3ME9TNHhNelFnTmpndU1URXpMRFE1TGpJNUlEWTRMakV4TXl3ME9TNDBPRFFnVERZNExqRXhNeXd4TURNdU5EZzFJRU0yT0M0eE1UTXNNVEEwTGpRME5TQTJPQzQ0TWl3eE1EVXVOalkxSURZNUxqWTFOeXd4TURZdU1UUTRJRXd4TVRJdU1UTXNNVE13TGpZM0lFTXhNVEl1TkRjMExERXpNQzQ0TmpnZ01URXlMamM1TVN3eE16QXVPVEV6SURFeE15d3hNekF1TnpreUlFTXhNVE11TWpBMkxERXpNQzQyTnpNZ01URXpMak15TlN3eE16QXVNemd4SURFeE15NHpNalVzTVRJNUxqazVNeUJNTVRFekxqTXlOU3czTlM0NU9USWdRekV4TXk0ek1qVXNOelV1TnprNElERXhNeTQwT0RJc056VXVOalF4SURFeE15NDJOelVzTnpVdU5qUXhJRU14TVRNdU9EWTVMRGMxTGpZME1TQXhNVFF1TURJMUxEYzFMamM1T0NBeE1UUXVNREkxTERjMUxqazVNaUJNTVRFMExqQXlOU3d4TWprdU9Ua3pJRU14TVRRdU1ESTFMREV6TUM0Mk5EZ2dNVEV6TGpjNE5pd3hNekV1TVRRM0lERXhNeTR6TlN3eE16RXVNems1SUVNeE1UTXVNVFl5TERFek1TNDFNRGNnTVRFeUxqazFNaXd4TXpFdU5UWXhJREV4TWk0M01qY3NNVE14TGpVMk1TSWdhV1E5SWtacGJHd3RNamtpSUdacGJHdzlJaU0wTlRWQk5qUWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRFeUxqZzJMRFF3TGpVeE1pQkRNVEV5TGpnMkxEUXdMalV4TWlBeE1USXVPRFlzTkRBdU5URXlJREV4TWk0NE5Ua3NOREF1TlRFeUlFTXhNVEF1TlRReExEUXdMalV4TWlBeE1EZ3VNellzTXprdU9Ua2dNVEEyTGpjeE55d3pPUzR3TkRFZ1F6RXdOUzR3TVRJc016Z3VNRFUzSURFd05DNHdOelFzTXpZdU56STJJREV3TkM0d056UXNNelV1TWpreUlFTXhNRFF1TURjMExETXpMamcwTnlBeE1EVXVNREkyTERNeUxqVXdNU0F4TURZdU56VTBMRE14TGpVd05DQk1NVEU0TGpjNU5Td3lOQzQxTlRFZ1F6RXlNQzQwTmpNc01qTXVOVGc1SURFeU1pNDJOamtzTWpNdU1EVTRJREV5TlM0d01EY3NNak11TURVNElFTXhNamN1TXpJMUxESXpMakExT0NBeE1qa3VOVEEyTERJekxqVTRNU0F4TXpFdU1UVXNNalF1TlRNZ1F6RXpNaTQ0TlRRc01qVXVOVEUwSURFek15NDNPVE1zTWpZdU9EUTFJREV6TXk0M09UTXNNamd1TWpjNElFTXhNek11TnprekxESTVMamN5TkNBeE16SXVPRFF4TERNeExqQTJPU0F4TXpFdU1URXpMRE15TGpBMk55Qk1NVEU1TGpBM01Td3pPUzR3TVRrZ1F6RXhOeTQwTURNc016a3VPVGd5SURFeE5TNHhPVGNzTkRBdU5URXlJREV4TWk0NE5pdzBNQzQxTVRJZ1RERXhNaTQ0Tml3ME1DNDFNVElnV2lCTk1USTFMakF3Tnl3eU15NDNOVGtnUXpFeU1pNDNPU3d5TXk0M05Ua2dNVEl3TGpjd09Td3lOQzR5TlRZZ01URTVMakUwTml3eU5TNHhOVGdnVERFd055NHhNRFFzTXpJdU1URWdRekV3TlM0Mk1ESXNNekl1T1RjNElERXdOQzQzTnpRc016UXVNVEE0SURFd05DNDNOelFzTXpVdU1qa3lJRU14TURRdU56YzBMRE0yTGpRMk5TQXhNRFV1TlRnNUxETTNMalU0TVNBeE1EY3VNRFkzTERNNExqUXpOQ0JETVRBNExqWXdOU3d6T1M0ek1qTWdNVEV3TGpZMk15d3pPUzQ0TVRJZ01URXlMamcxT1N3ek9TNDRNVElnVERFeE1pNDROaXd6T1M0NE1USWdRekV4TlM0d056WXNNemt1T0RFeUlERXhOeTR4TlRnc016a3VNekUxSURFeE9DNDNNakVzTXpndU5ERXpJRXd4TXpBdU56WXlMRE14TGpRMklFTXhNekl1TWpZMExETXdMalU1TXlBeE16TXVNRGt5TERJNUxqUTJNeUF4TXpNdU1Ea3lMREk0TGpJM09DQkRNVE16TGpBNU1pd3lOeTR4TURZZ01UTXlMakkzT0N3eU5TNDVPU0F4TXpBdU9Dd3lOUzR4TXpZZ1F6RXlPUzR5TmpFc01qUXVNalE0SURFeU55NHlNRFFzTWpNdU56VTVJREV5TlM0d01EY3NNak11TnpVNUlFd3hNalV1TURBM0xESXpMamMxT1NCYUlpQnBaRDBpUm1sc2JDMHpNQ0lnWm1sc2JEMGlJell3TjBRNFFpSStQQzl3WVhSb1Bnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4TmpVdU5qTXNNVFl1TWpFNUlFd3hOVGt1T0RrMkxERTVMalV6SUVNeE5UWXVOekk1TERJeExqTTFPQ0F4TlRFdU5qRXNNakV1TXpZM0lERTBPQzQwTmpNc01Ua3VOVFVnUXpFME5TNHpNVFlzTVRjdU56TXpJREUwTlM0ek16SXNNVFF1TnpjNElERTBPQzQwT1Rrc01USXVPVFE1SUV3eE5UUXVNak16TERrdU5qTTVJRXd4TmpVdU5qTXNNVFl1TWpFNUlpQnBaRDBpUm1sc2JDMHpNU0lnWm1sc2JEMGlJMFpCUmtGR1FTSStQQzl3WVhSb1Bnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4TlRRdU1qTXpMREV3TGpRME9DQk1NVFkwTGpJeU9Dd3hOaTR5TVRrZ1RERTFPUzQxTkRZc01UZ3VPVEl6SUVNeE5UZ3VNVEV5TERFNUxqYzFJREUxTmk0eE9UUXNNakF1TWpBMklERTFOQzR4TkRjc01qQXVNakEySUVNeE5USXVNVEU0TERJd0xqSXdOaUF4TlRBdU1qSTBMREU1TGpjMU55QXhORGd1T0RFMExERTRMamswTXlCRE1UUTNMalV5TkN3eE9DNHhPVGtnTVRRMkxqZ3hOQ3d4Tnk0eU5Ea2dNVFEyTGpneE5Dd3hOaTR5TmprZ1F6RTBOaTQ0TVRRc01UVXVNamM0SURFME55NDFNemNzTVRRdU16RTBJREUwT0M0NE5Td3hNeTQxTlRZZ1RERTFOQzR5TXpNc01UQXVORFE0SUUweE5UUXVNak16TERrdU5qTTVJRXd4TkRndU5EazVMREV5TGprME9TQkRNVFExTGpNek1pd3hOQzQzTnpnZ01UUTFMak14Tml3eE55NDNNek1nTVRRNExqUTJNeXd4T1M0MU5TQkRNVFV3TGpBek1Td3lNQzQwTlRVZ01UVXlMakE0Tml3eU1DNDVNRGNnTVRVMExqRTBOeXd5TUM0NU1EY2dRekUxTmk0eU1qUXNNakF1T1RBM0lERTFPQzR6TURZc01qQXVORFEzSURFMU9TNDRPVFlzTVRrdU5UTWdUREUyTlM0Mk15d3hOaTR5TVRrZ1RERTFOQzR5TXpNc09TNDJNemtpSUdsa1BTSkdhV3hzTFRNeUlpQm1hV3hzUFNJak5qQTNSRGhDSWo0OEwzQmhkR2crQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRURTBOUzQwTkRVc056SXVOalkzSUV3eE5EVXVORFExTERjeUxqWTJOeUJETVRRekxqWTNNaXczTWk0Mk5qY2dNVFF5TGpJd05DdzNNUzQ0TVRjZ01UUXhMakl3TWl3M01DNDBNaklnUXpFME1TNHhNelVzTnpBdU16TWdNVFF4TGpFME5TdzNNQzR4TkRjZ01UUXhMakl5TlN3M01DNHdOallnUXpFME1TNHpNRFVzTmprdU9UZzFJREUwTVM0ME16SXNOamt1T1RRMklERTBNUzQxTWpVc056QXVNREV4SUVNeE5ESXVNekEyTERjd0xqVTFPU0F4TkRNdU1qTXhMRGN3TGpneU15QXhORFF1TWpjMkxEY3dMamd5TWlCRE1UUTFMalU1T0N3M01DNDRNaklnTVRRM0xqQXpMRGN3TGpNM05pQXhORGd1TlRNeUxEWTVMalV3T1NCRE1UVXpMamcwTWl3Mk5pNDBORE1nTVRVNExqRTJNeXcxT0M0NU9EY2dNVFU0TGpFMk15dzFNaTQ0T1RRZ1F6RTFPQzR4TmpNc05UQXVPVFkzSURFMU55NDNNakVzTkRrdU16TXlJREUxTmk0NE9EUXNORGd1TVRZNElFTXhOVFl1T0RFNExEUTRMakEzTmlBeE5UWXVPREk0TERRM0xqazBPQ0F4TlRZdU9UQTRMRFEzTGpnMk55QkRNVFUyTGprNE9DdzBOeTQzT0RZZ01UVTNMakV4TkN3ME55NDNOelFnTVRVM0xqSXdPQ3cwTnk0NE5DQkRNVFU0TGpnM09DdzBPUzR3TVRJZ01UVTVMamM1T0N3MU1TNHlNaUF4TlRrdU56azRMRFUwTGpBMU9TQkRNVFU1TGpjNU9DdzJNQzR6TURFZ01UVTFMak0zTXl3Mk9DNHdORFlnTVRRNUxqa3pNeXczTVM0eE9EWWdRekUwT0M0ek5pdzNNaTR3T1RRZ01UUTJMamcxTERjeUxqWTJOeUF4TkRVdU5EUTFMRGN5TGpZMk55Qk1NVFExTGpRME5TdzNNaTQyTmpjZ1dpQk5NVFF5TGpRM05pdzNNU0JETVRRekxqSTVMRGN4TGpZMU1TQXhORFF1TWprMkxEY3lMakF3TWlBeE5EVXVORFExTERjeUxqQXdNaUJETVRRMkxqYzJOeXczTWk0d01ESWdNVFE0TGpFNU9DdzNNUzQxTlNBeE5Ea3VOeXczTUM0Mk9ESWdRekUxTlM0d01TdzJOeTQyTVRjZ01UVTVMak16TVN3Mk1DNHhOVGtnTVRVNUxqTXpNU3cxTkM0d05qVWdRekUxT1M0ek16RXNOVEl1TURnMUlERTFPQzQ0Tmpnc05UQXVORE0xSURFMU9DNHdNRFlzTkRrdU1qY3lJRU14TlRndU5ERTNMRFV3TGpNd055QXhOVGd1TmpNc05URXVOVE15SURFMU9DNDJNeXcxTWk0NE9USWdRekUxT0M0Mk15dzFPUzR4TXpRZ01UVTBMakl3TlN3Mk5pNDNOamNnTVRRNExqYzJOU3cyT1M0NU1EY2dRekUwTnk0eE9USXNOekF1T0RFMklERTBOUzQyT0RFc056RXVNamd6SURFME5DNHlOellzTnpFdU1qZ3pJRU14TkRNdU5qTTBMRGN4TGpJNE15QXhORE11TURNekxEY3hMakU1TWlBeE5ESXVORGMyTERjeElFd3hOREl1TkRjMkxEY3hJRm9pSUdsa1BTSkdhV3hzTFRNeklpQm1hV3hzUFNJak5qQTNSRGhDSWo0OEwzQmhkR2crQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRURTBPQzQyTkRnc05qa3VOekEwSUVNeE5UUXVNRE15TERZMkxqVTVOaUF4TlRndU16azJMRFU1TGpBMk9DQXhOVGd1TXprMkxEVXlMamc1TVNCRE1UVTRMak01Tml3MU1DNDRNemtnTVRVM0xqa3hNeXcwT1M0eE9UZ2dNVFUzTGpBM05DdzBPQzR3TXlCRE1UVTFMakk0T1N3ME5pNDNOemdnTVRVeUxqWTVPU3cwTmk0NE16WWdNVFE1TGpneE5pdzBPQzQxTURFZ1F6RTBOQzQwTXpNc05URXVOakE1SURFME1DNHdOamdzTlRrdU1UTTNJREUwTUM0d05qZ3NOalV1TXpFMElFTXhOREF1TURZNExEWTNMak0yTlNBeE5EQXVOVFV5TERZNUxqQXdOaUF4TkRFdU16a3hMRGN3TGpFM05DQkRNVFF6TGpFM05pdzNNUzQwTWpjZ01UUTFMamMyTlN3M01TNHpOamtnTVRRNExqWTBPQ3cyT1M0M01EUWlJR2xrUFNKR2FXeHNMVE0wSWlCbWFXeHNQU0lqUmtGR1FVWkJJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFME5DNHlOellzTnpFdU1qYzJJRXd4TkRRdU1qYzJMRGN4TGpJM05pQkRNVFF6TGpFek15dzNNUzR5TnpZZ01UUXlMakV4T0N3M01DNDVOamtnTVRReExqSTFOeXczTUM0ek5qVWdRekUwTVM0eU16WXNOekF1TXpVeElERTBNUzR5TVRjc056QXVNek15SURFME1TNHlNRElzTnpBdU16RXhJRU14TkRBdU16QTNMRFk1TGpBMk55QXhNemt1T0RNMUxEWTNMak16T1NBeE16a3VPRE0xTERZMUxqTXhOQ0JETVRNNUxqZ3pOU3cxT1M0d056TWdNVFEwTGpJMkxEVXhMalF6T1NBeE5Ea3VOeXcwT0M0eU9UZ2dRekUxTVM0eU56TXNORGN1TXprZ01UVXlMamM0TkN3ME5pNDVNamtnTVRVMExqRTRPU3cwTmk0NU1qa2dRekUxTlM0ek16SXNORFl1T1RJNUlERTFOaTR6TkRjc05EY3VNak0ySURFMU55NHlNRGdzTkRjdU9ETTVJRU14TlRjdU1qSTVMRFEzTGpnMU5DQXhOVGN1TWpRNExEUTNMamczTXlBeE5UY3VNall6TERRM0xqZzVOQ0JETVRVNExqRTFOeXcwT1M0eE16Z2dNVFU0TGpZekxEVXdMamcyTlNBeE5UZ3VOak1zTlRJdU9Ea3hJRU14TlRndU5qTXNOVGt1TVRNeUlERTFOQzR5TURVc05qWXVOelkySURFME9DNDNOalVzTmprdU9UQTNJRU14TkRjdU1Ua3lMRGN3TGpneE5TQXhORFV1TmpneExEY3hMakkzTmlBeE5EUXVNamMyTERjeExqSTNOaUJNTVRRMExqSTNOaXczTVM0eU56WWdXaUJOTVRReExqVTFPQ3czTUM0eE1EUWdRekUwTWk0ek16RXNOekF1TmpNM0lERTBNeTR5TkRVc056RXVNREExSURFME5DNHlOellzTnpFdU1EQTFJRU14TkRVdU5UazRMRGN4TGpBd05TQXhORGN1TURNc056QXVORFkzSURFME9DNDFNeklzTmprdU5pQkRNVFV6TGpnME1pdzJOaTQxTXpRZ01UVTRMakUyTXl3MU9TNHdNek1nTVRVNExqRTJNeXcxTWk0NU16a2dRekUxT0M0eE5qTXNOVEV1TURNeElERTFOeTQzTWprc05Ea3VNemcxSURFMU5pNDVNRGNzTkRndU1qSXpJRU14TlRZdU1UTXpMRFEzTGpZNU1TQXhOVFV1TWpFNUxEUTNMalF3T1NBeE5UUXVNVGc1TERRM0xqUXdPU0JETVRVeUxqZzJOeXcwTnk0ME1Ea2dNVFV4TGpRek5TdzBOeTQ0TkRJZ01UUTVMamt6TXl3ME9DNDNNRGtnUXpFME5DNDJNak1zTlRFdU56YzFJREUwTUM0ek1ESXNOVGt1TWpjeklERTBNQzR6TURJc05qVXVNelkySUVNeE5EQXVNekF5TERZM0xqSTNOaUF4TkRBdU56TTJMRFk0TGprME1pQXhOREV1TlRVNExEY3dMakV3TkNCTU1UUXhMalUxT0N3M01DNHhNRFFnV2lJZ2FXUTlJa1pwYkd3dE16VWlJR1pwYkd3OUlpTTJNRGRFT0VJaVBqd3ZjR0YwYUQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCa1BTSk5NVFV3TGpjeUxEWTFMak0yTVNCTU1UVXdMak0xTnl3Mk5TNHdOallnUXpFMU1TNHhORGNzTmpRdU1Ea3lJREUxTVM0NE5qa3NOak11TURRZ01UVXlMalV3TlN3Mk1TNDVNemdnUXpFMU15NHpNVE1zTmpBdU5UTTVJREUxTXk0NU56Z3NOVGt1TURZM0lERTFOQzQwT0RJc05UY3VOVFl6SUV3eE5UUXVPVEkxTERVM0xqY3hNaUJETVRVMExqUXhNaXcxT1M0eU5EVWdNVFV6TGpjek15dzJNQzQzTkRVZ01UVXlMamt4TERZeUxqRTNNaUJETVRVeUxqSTJNaXcyTXk0eU9UVWdNVFV4TGpVeU5TdzJOQzR6TmpnZ01UVXdMamN5TERZMUxqTTJNU0lnYVdROUlrWnBiR3d0TXpZaUlHWnBiR3c5SWlNMk1EZEVPRUlpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1URTFMamt4Tnl3NE5DNDFNVFFnVERFeE5TNDFOVFFzT0RRdU1qSWdRekV4Tmk0ek5EUXNPRE11TWpRMUlERXhOeTR3TmpZc09ESXVNVGswSURFeE55NDNNRElzT0RFdU1Ea3lJRU14TVRndU5URXNOemt1TmpreUlERXhPUzR4TnpVc056Z3VNaklnTVRFNUxqWTNPQ3czTmk0M01UY2dUREV5TUM0eE1qRXNOell1T0RZMUlFTXhNVGt1TmpBNExEYzRMak01T0NBeE1UZ3VPVE1zTnprdU9EazVJREV4T0M0eE1EWXNPREV1TXpJMklFTXhNVGN1TkRVNExEZ3lMalEwT0NBeE1UWXVOekl5TERnekxqVXlNU0F4TVRVdU9URTNMRGcwTGpVeE5DSWdhV1E5SWtacGJHd3RNemNpSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRFMExERXpNQzQwTnpZZ1RERXhOQ3d4TXpBdU1EQTRJRXd4TVRRc056WXVNRFV5SUV3eE1UUXNOelV1TlRnMElFd3hNVFFzTnpZdU1EVXlJRXd4TVRRc01UTXdMakF3T0NCTU1URTBMREV6TUM0ME56WWlJR2xrUFNKR2FXeHNMVE00SWlCbWFXeHNQU0lqTmpBM1JEaENJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThMMmMrQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WnlCcFpEMGlTVzF3YjNKMFpXUXRUR0Y1WlhKekxVTnZjSGtpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtEWXlMakF3TURBd01Dd2dNQzR3TURBd01EQXBJaUJ6YTJWMFkyZzZkSGx3WlQwaVRWTlRhR0Z3WlVkeWIzVndJajRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1Ua3VPREl5TERNM0xqUTNOQ0JETVRrdU9ETTVMRE0zTGpNek9TQXhPUzQzTkRjc016Y3VNVGswSURFNUxqVTFOU3d6Tnk0d09ESWdRekU1TGpJeU9Dd3pOaTQ0T1RRZ01UZ3VOekk1TERNMkxqZzNNaUF4T0M0ME5EWXNNemN1TURNM0lFd3hNaTQwTXpRc05EQXVOVEE0SUVNeE1pNHpNRE1zTkRBdU5UZzBJREV5TGpJMExEUXdMalk0TmlBeE1pNHlORE1zTkRBdU56a3pJRU14TWk0eU5EVXNOREF1T1RJMUlERXlMakkwTlN3ME1TNHlOVFFnTVRJdU1qUTFMRFF4TGpNM01TQk1NVEl1TWpRMUxEUXhMalF4TkNCTU1USXVNak00TERReExqVTBNaUJET0M0eE5EZ3NORE11T0RnM0lEVXVOalEzTERRMUxqTXlNU0ExTGpZME55dzBOUzR6TWpFZ1F6VXVOalEyTERRMUxqTXlNU0F6TGpVM0xEUTJMak0yTnlBeUxqZzJMRFV3TGpVeE15QkRNaTQ0Tml3MU1DNDFNVE1nTVM0NU5EZ3NOVGN1TkRjMElERXVPVFl5TERjd0xqSTFPQ0JETVM0NU56Y3NPREl1T0RJNElESXVOVFk0TERnM0xqTXlPQ0F6TGpFeU9TdzVNUzQyTURrZ1F6TXVNelE1TERrekxqSTVNeUEyTGpFekxEa3pMamN6TkNBMkxqRXpMRGt6TGpjek5DQkROaTQwTmpFc09UTXVOemMwSURZdU9ESTRMRGt6TGpjd055QTNMakl4TERrekxqUTROaUJNT0RJdU5EZ3pMRFE1TGprek5TQkRPRFF1TWpreExEUTRMamcyTmlBNE5TNHhOU3cwTmk0eU1UWWdPRFV1TlRNNUxEUXpMalkxTVNCRE9EWXVOelV5TERNMUxqWTJNU0E0Tnk0eU1UUXNNVEF1TmpjeklEZzFMakkyTkN3ekxqYzNNeUJET0RVdU1EWTRMRE11TURnZ09EUXVOelUwTERJdU5qa2dPRFF1TXprMkxESXVORGt4SUV3NE1pNHpNU3d4TGpjd01TQkRPREV1TlRnekxERXVOekk1SURnd0xqZzVOQ3d5TGpFMk9DQTRNQzQzTnpZc01pNHlNellnUXpnd0xqWXpOaXd5TGpNeE55QTBNUzQ0TURjc01qUXVOVGcxSURJd0xqQXpNaXd6Tnk0d056SWdUREU1TGpneU1pd3pOeTQwTnpRaUlHbGtQU0pHYVd4c0xURWlJR1pwYkd3OUlpTkdSa1pHUmtZaVBqd3ZjR0YwYUQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCa1BTSk5PREl1TXpFeExERXVOekF4SUV3NE5DNHpPVFlzTWk0ME9URWdRemcwTGpjMU5Dd3lMalk1SURnMUxqQTJPQ3d6TGpBNElEZzFMakkyTkN3ekxqYzNNeUJET0RjdU1qRXpMREV3TGpZM015QTROaTQzTlRFc016VXVOallnT0RVdU5UTTVMRFF6TGpZMU1TQkRPRFV1TVRRNUxEUTJMakl4TmlBNE5DNHlPU3cwT0M0NE5qWWdPREl1TkRnekxEUTVMamt6TlNCTU55NHlNU3c1TXk0ME9EWWdRell1T0RrM0xEa3pMalkyTnlBMkxqVTVOU3c1TXk0M05EUWdOaTR6TVRRc09UTXVOelEwSUV3MkxqRXpNU3c1TXk0M016TWdRell1TVRNeExEa3pMamN6TkNBekxqTTBPU3c1TXk0eU9UTWdNeTR4TWpnc09URXVOakE1SUVNeUxqVTJPQ3c0Tnk0ek1qY2dNUzQ1Tnpjc09ESXVPREk0SURFdU9UWXpMRGN3TGpJMU9DQkRNUzQ1TkRnc05UY3VORGMwSURJdU9EWXNOVEF1TlRFeklESXVPRFlzTlRBdU5URXpJRU16TGpVM0xEUTJMak0yTnlBMUxqWTBOeXcwTlM0ek1qRWdOUzQyTkRjc05EVXVNekl4SUVNMUxqWTBOeXcwTlM0ek1qRWdPQzR4TkRnc05ETXVPRGczSURFeUxqSXpPQ3cwTVM0MU5ESWdUREV5TGpJME5TdzBNUzQwTVRRZ1RERXlMakkwTlN3ME1TNHpOekVnUXpFeUxqSTBOU3cwTVM0eU5UUWdNVEl1TWpRMUxEUXdMamt5TlNBeE1pNHlORE1zTkRBdU56a3pJRU14TWk0eU5DdzBNQzQyT0RZZ01USXVNekF5TERRd0xqVTRNeUF4TWk0ME16UXNOREF1TlRBNElFd3hPQzQwTkRZc016Y3VNRE0ySUVNeE9DNDFOelFzTXpZdU9UWXlJREU0TGpjME5pd3pOaTQ1TWpZZ01UZ3VPVEkzTERNMkxqa3lOaUJETVRrdU1UUTFMRE0yTGpreU5pQXhPUzR6TnpZc016WXVPVGM1SURFNUxqVTFOQ3d6Tnk0d09ESWdRekU1TGpjME55d3pOeTR4T1RRZ01Ua3VPRE01TERNM0xqTTBJREU1TGpneU1pd3pOeTQwTnpRZ1RESXdMakF6TXl3ek55NHdOeklnUXpReExqZ3dOaXd5TkM0MU9EVWdPREF1TmpNMkxESXVNekU0SURnd0xqYzNOeXd5TGpJek5pQkRPREF1T0RrMExESXVNVFk0SURneExqVTRNeXd4TGpjeU9TQTRNaTR6TVRFc01TNDNNREVnVFRneUxqTXhNU3d3TGpjd05DQk1PREl1TWpjeUxEQXVOekExSUVNNE1TNDJOVFFzTUM0M01qZ2dPREF1T1RnNUxEQXVPVFE1SURnd0xqSTVPQ3d4TGpNMk1TQk1PREF1TWpjM0xERXVNemN6SUVNNE1DNHhNamtzTVM0ME5UZ2dOVGt1TnpZNExERXpMakV6TlNBeE9TNDNOVGdzTXpZdU1EYzVJRU14T1M0MUxETTFMams0TVNBeE9TNHlNVFFzTXpVdU9USTVJREU0TGpreU55d3pOUzQ1TWprZ1F6RTRMalUyTWl3ek5TNDVNamtnTVRndU1qSXpMRE0yTGpBeE15QXhOeTQ1TkRjc016WXVNVGN6SUV3eE1TNDVNelVzTXprdU5qUTBJRU14TVM0ME9UTXNNemt1T0RrNUlERXhMakl6Tml3ME1DNHpNelFnTVRFdU1qUTJMRFF3TGpneElFd3hNUzR5TkRjc05EQXVPVFlnVERVdU1UWTNMRFEwTGpRME55QkROQzQzT1RRc05EUXVOalEySURJdU5qSTFMRFExTGprM09DQXhMamczTnl3MU1DNHpORFVnVERFdU9EY3hMRFV3TGpNNE5DQkRNUzQ0TmpJc05UQXVORFUwSURBdU9UVXhMRFUzTGpVMU55QXdMamsyTlN3M01DNHlOVGtnUXpBdU9UYzVMRGd5TGpnM09TQXhMalUyT0N3NE55NHpOelVnTWk0eE16Y3NPVEV1TnpJMElFd3lMakV6T1N3NU1TNDNNemtnUXpJdU5EUTNMRGswTGpBNU5DQTFMall4TkN3NU5DNDJOaklnTlM0NU56VXNPVFF1TnpFNUlFdzJMakF3T1N3NU5DNDNNak1nUXpZdU1URXNPVFF1TnpNMklEWXVNakV6TERrMExqYzBNaUEyTGpNeE5DdzVOQzQzTkRJZ1F6WXVOemtzT1RRdU56UXlJRGN1TWpZc09UUXVOakVnTnk0M01TdzVOQzR6TlNCTU9ESXVPVGd6TERVd0xqYzVPQ0JET0RRdU56azBMRFE1TGpjeU55QTROUzQ1T0RJc05EY3VNemMxSURnMkxqVXlOU3cwTXk0NE1ERWdRemczTGpjeE1Td3pOUzQ1T0RjZ09EZ3VNalU1TERFd0xqY3dOU0E0Tmk0eU1qUXNNeTQxTURJZ1F6ZzFMamszTVN3eUxqWXdPU0E0TlM0MU1pd3hMamszTlNBNE5DNDRPREVzTVM0Mk1pQk1PRFF1TnpRNUxERXVOVFU0SUV3NE1pNDJOalFzTUM0M05qa2dRemd5TGpVMU1Td3dMamN5TlNBNE1pNDBNekVzTUM0M01EUWdPREl1TXpFeExEQXVOekEwSWlCcFpEMGlSbWxzYkMweUlpQm1hV3hzUFNJak5EVTFRVFkwSWo0OEwzQmhkR2crQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUWTJMakkyTnl3eE1TNDFOalVnVERZM0xqYzJNaXd4TVM0NU9Ua2dUREV4TGpReU15dzBOQzR6TWpVaUlHbGtQU0pHYVd4c0xUTWlJR1pwYkd3OUlpTkdSa1pHUmtZaVBqd3ZjR0YwYUQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCa1BTSk5NVEl1TWpBeUxEa3dMalUwTlNCRE1USXVNREk1TERrd0xqVTBOU0F4TVM0NE5qSXNPVEF1TkRVMUlERXhMamMyT1N3NU1DNHlPVFVnUXpFeExqWXpNaXc1TUM0d05UY2dNVEV1TnpFekxEZzVMamMxTWlBeE1TNDVOVElzT0RrdU5qRTBJRXd6TUM0ek9Ea3NOemd1T1RZNUlFTXpNQzQyTWpnc056Z3VPRE14SURNd0xqa3pNeXczT0M0NU1UTWdNekV1TURjeExEYzVMakUxTWlCRE16RXVNakE0TERjNUxqTTVJRE14TGpFeU55dzNPUzQyT1RZZ016QXVPRGc0TERjNUxqZ3pNeUJNTVRJdU5EVXhMRGt3TGpRM09DQk1NVEl1TWpBeUxEa3dMalUwTlNJZ2FXUTlJa1pwYkd3dE5DSWdabWxzYkQwaUl6WXdOMFE0UWlJK1BDOXdZWFJvUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdROUlrMHhNeTQzTmpRc05ESXVOalUwSUV3eE15NDJOVFlzTkRJdU5Ua3lJRXd4TXk0M01ESXNOREl1TkRJeElFd3hPQzQ0TXpjc016a3VORFUzSUV3eE9TNHdNRGNzTXprdU5UQXlJRXd4T0M0NU5qSXNNemt1TmpjeklFd3hNeTQ0TWpjc05ESXVOak0zSUV3eE15NDNOalFzTkRJdU5qVTBJaUJwWkQwaVJtbHNiQzAxSWlCbWFXeHNQU0lqTmpBM1JEaENJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRndU5USXNPVEF1TXpjMUlFdzRMalV5TERRMkxqUXlNU0JNT0M0MU9ETXNORFl1TXpnMUlFdzNOUzQ0TkN3M0xqVTFOQ0JNTnpVdU9EUXNOVEV1TlRBNElFdzNOUzQzTnpnc05URXVOVFEwSUV3NExqVXlMRGt3TGpNM05TQk1PQzQxTWl3NU1DNHpOelVnV2lCTk9DNDNOeXcwTmk0MU5qUWdURGd1Tnpjc09Ea3VPVFEwSUV3M05TNDFPVEVzTlRFdU16WTFJRXczTlM0MU9URXNOeTQ1T0RVZ1REZ3VOemNzTkRZdU5UWTBJRXc0TGpjM0xEUTJMalUyTkNCYUlpQnBaRDBpUm1sc2JDMDJJaUJtYVd4c1BTSWpOakEzUkRoQ0lqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEkwTGprNE5pdzRNeTR4T0RJZ1F6STBMamMxTml3NE15NHpNekVnTWpRdU16YzBMRGd6TGpVMk5pQXlOQzR4TXpjc09ETXVOekExSUV3eE1pNDJNeklzT1RBdU5EQTJJRU14TWk0ek9UVXNPVEF1TlRRMUlERXlMalF5Tml3NU1DNDJOVGdnTVRJdU55dzVNQzQyTlRnZ1RERXpMakkyTlN3NU1DNDJOVGdnUXpFekxqVTBMRGt3TGpZMU9DQXhNeTQ1TlRnc09UQXVOVFExSURFMExqRTVOU3c1TUM0ME1EWWdUREkxTGpjc09ETXVOekExSUVNeU5TNDVNemNzT0RNdU5UWTJJREkyTGpFeU9DdzRNeTQwTlRJZ01qWXVNVEkxTERnekxqUTBPU0JETWpZdU1USXlMRGd6TGpRME55QXlOaTR4TVRrc09ETXVNaklnTWpZdU1URTVMRGd5TGprME5pQkRNall1TVRFNUxEZ3lMalkzTWlBeU5TNDVNekVzT0RJdU5UWTVJREkxTGpjd01TdzRNaTQzTVRrZ1RESTBMams0Tml3NE15NHhPRElpSUdsa1BTSkdhV3hzTFRjaUlHWnBiR3c5SWlNMk1EZEVPRUlpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1UTXVNalkyTERrd0xqYzRNaUJNTVRJdU55dzVNQzQzT0RJZ1F6RXlMalVzT1RBdU56Z3lJREV5TGpNNE5DdzVNQzQzTWpZZ01USXVNelUwTERrd0xqWXhOaUJETVRJdU16STBMRGt3TGpVd05pQXhNaTR6T1Rjc09UQXVNems1SURFeUxqVTJPU3c1TUM0eU9Ua2dUREkwTGpBM05DdzRNeTQxT1RjZ1F6STBMak14TERnekxqUTFPU0F5TkM0Mk9Ea3NPRE11TWpJMklESTBMamt4T0N3NE15NHdOemdnVERJMUxqWXpNeXc0TWk0Mk1UUWdRekkxTGpjeU15dzRNaTQxTlRVZ01qVXVPREV6TERneUxqVXlOU0F5TlM0NE9Ua3NPREl1TlRJMUlFTXlOaTR3TnpFc09ESXVOVEkxSURJMkxqSTBOQ3c0TWk0Mk5UVWdNall1TWpRMExEZ3lMamswTmlCRE1qWXVNalEwTERnekxqRTJJREkyTGpJME5TdzRNeTR6TURrZ01qWXVNalEzTERnekxqTTRNeUJNTWpZdU1qVXpMRGd6TGpNNE55Qk1Nall1TWpRNUxEZ3pMalExTmlCRE1qWXVNalEyTERnekxqVXpNU0F5Tmk0eU5EWXNPRE11TlRNeElESTFMamMyTXl3NE15NDRNVElnVERFMExqSTFPQ3c1TUM0MU1UUWdRekUwTERrd0xqWTJOU0F4TXk0MU5qUXNPVEF1TnpneUlERXpMakkyTml3NU1DNDNPRElnVERFekxqSTJOaXc1TUM0M09ESWdXaUJOTVRJdU5qWTJMRGt3TGpVek1pQk1NVEl1Tnl3NU1DNDFNek1nVERFekxqSTJOaXc1TUM0MU16TWdRekV6TGpVeE9DdzVNQzQxTXpNZ01UTXVPVEUxTERrd0xqUXlOU0F4TkM0eE16SXNPVEF1TWprNUlFd3lOUzQyTXpjc09ETXVOVGszSUVNeU5TNDRNRFVzT0RNdU5EazVJREkxTGprek1TdzRNeTQwTWpRZ01qVXVPVGs0TERnekxqTTRNeUJETWpVdU9UazBMRGd6TGpJNU9TQXlOUzQ1T1RRc09ETXVNVFkxSURJMUxqazVOQ3c0TWk0NU5EWWdUREkxTGpnNU9TdzRNaTQzTnpVZ1RESTFMamMyT0N3NE1pNDRNalFnVERJMUxqQTFOQ3c0TXk0eU9EY2dRekkwTGpneU1pdzRNeTQwTXpjZ01qUXVORE00TERnekxqWTNNeUF5TkM0eUxEZ3pMamd4TWlCTU1USXVOamsxTERrd0xqVXhOQ0JNTVRJdU5qWTJMRGt3TGpVek1pQk1NVEl1TmpZMkxEa3dMalV6TWlCYUlpQnBaRDBpUm1sc2JDMDRJaUJtYVd4c1BTSWpOakEzUkRoQ0lqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEV6TGpJMk5pdzRPUzQ0TnpFZ1RERXlMamNzT0RrdU9EY3hJRU14TWk0MUxEZzVMamczTVNBeE1pNHpPRFFzT0RrdU9ERTFJREV5TGpNMU5DdzRPUzQzTURVZ1F6RXlMak15TkN3NE9TNDFPVFVnTVRJdU16azNMRGc1TGpRNE9DQXhNaTQxTmprc09Ea3VNemc0SUV3eU5DNHdOelFzT0RJdU5qZzJJRU15TkM0ek16SXNPREl1TlRNMUlESTBMamMyT0N3NE1pNDBNVGdnTWpVdU1EWTNMRGd5TGpReE9DQk1NalV1TmpNeUxEZ3lMalF4T0NCRE1qVXVPRE15TERneUxqUXhPQ0F5TlM0NU5EZ3NPREl1TkRjMElESTFMamszT0N3NE1pNDFPRFFnUXpJMkxqQXdPQ3c0TWk0Mk9UUWdNalV1T1RNMUxEZ3lMamd3TVNBeU5TNDNOak1zT0RJdU9UQXhJRXd4TkM0eU5UZ3NPRGt1TmpBeklFTXhOQ3c0T1M0M05UUWdNVE11TlRZMExEZzVMamczTVNBeE15NHlOallzT0RrdU9EY3hJRXd4TXk0eU5qWXNPRGt1T0RjeElGb2dUVEV5TGpZMk5pdzRPUzQyTWpFZ1RERXlMamNzT0RrdU5qSXlJRXd4TXk0eU5qWXNPRGt1TmpJeUlFTXhNeTQxTVRnc09Ea3VOakl5SURFekxqa3hOU3c0T1M0MU1UVWdNVFF1TVRNeUxEZzVMak00T0NCTU1qVXVOak0zTERneUxqWTROaUJNTWpVdU5qWTNMRGd5TGpZMk9DQk1NalV1TmpNeUxEZ3lMalkyTnlCTU1qVXVNRFkzTERneUxqWTJOeUJETWpRdU9ERTFMRGd5TGpZMk55QXlOQzQwTVRnc09ESXVOemMxSURJMExqSXNPREl1T1RBeElFd3hNaTQyT1RVc09Ea3VOakF6SUV3eE1pNDJOallzT0RrdU5qSXhJRXd4TWk0Mk5qWXNPRGt1TmpJeElGb2lJR2xrUFNKR2FXeHNMVGtpSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRJdU16Y3NPVEF1T0RBeElFd3hNaTR6Tnl3NE9TNDFOVFFnVERFeUxqTTNMRGt3TGpnd01TSWdhV1E5SWtacGJHd3RNVEFpSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTmk0eE15dzVNeTQ1TURFZ1F6VXVNemM1TERrekxqZ3dPQ0EwTGpneE5pdzVNeTR4TmpRZ05DNDJPVEVzT1RJdU5USTFJRU16TGpnMkxEZzRMakk0TnlBekxqVTBMRGd6TGpjME15QXpMalV5Tml3M01TNHhOek1nUXpNdU5URXhMRFU0TGpNNE9TQTBMalF5TXl3MU1TNDBNamdnTkM0ME1qTXNOVEV1TkRJNElFTTFMakV6TkN3ME55NHlPRElnTnk0eU1TdzBOaTR5TXpZZ055NHlNU3cwTmk0eU16WWdRemN1TWpFc05EWXVNak0ySURneExqWTJOeXd6TGpJMUlEZ3lMakEyT1N3ekxqQXhOeUJET0RJdU1qa3lMREl1T0RnNElEZzBMalUxTml3eExqUXpNeUE0TlM0eU5qUXNNeTQ1TkNCRE9EY3VNakUwTERFd0xqZzBJRGcyTGpjMU1pd3pOUzQ0TWpjZ09EVXVOVE01TERRekxqZ3hPQ0JET0RVdU1UVXNORFl1TXpneklEZzBMakk1TVN3ME9TNHdNek1nT0RJdU5EZ3pMRFV3TGpFd01TQk1OeTR5TVN3NU15NDJOVE1nUXpZdU9ESTRMRGt6TGpnM05DQTJMalEyTVN3NU15NDVOREVnTmk0eE15dzVNeTQ1TURFZ1F6WXVNVE1zT1RNdU9UQXhJRE11TXpRNUxEa3pMalEySURNdU1USTVMRGt4TGpjM05pQkRNaTQxTmpnc09EY3VORGsxSURFdU9UYzNMRGd5TGprNU5TQXhMamsyTWl3M01DNDBNalVnUXpFdU9UUTRMRFUzTGpZME1TQXlMamcyTERVd0xqWTRJREl1T0RZc05UQXVOamdnUXpNdU5UY3NORFl1TlRNMElEVXVOalEzTERRMUxqUTRPU0ExTGpZME55dzBOUzQwT0RrZ1F6VXVOalEyTERRMUxqUTRPU0E0TGpBMk5TdzBOQzR3T1RJZ01USXVNalExTERReExqWTNPU0JNTVRNdU1URTJMRFF4TGpVMklFd3hPUzQzTVRVc016Y3VOek1nVERFNUxqYzJNU3d6Tnk0eU5qa2dURFl1TVRNc09UTXVPVEF4SWlCcFpEMGlSbWxzYkMweE1TSWdabWxzYkQwaUkwWkJSa0ZHUVNJK1BDOXdZWFJvUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdROUlrMDJMak14Tnl3NU5DNHhOakVnVERZdU1UQXlMRGswTGpFME9DQk1OaTR4TURFc09UUXVNVFE0SUV3MUxqZzFOeXc1TkM0eE1ERWdRelV1TVRNNExEa3pMamswTlNBekxqQTROU3c1TXk0ek5qVWdNaTQ0T0RFc09URXVPREE1SUVNeUxqTXhNeXc0Tnk0ME5qa2dNUzQzTWpjc09ESXVPVGsySURFdU56RXpMRGN3TGpReU5TQkRNUzQyT1Rrc05UY3VOemN4SURJdU5qQTBMRFV3TGpjeE9DQXlMall4TXl3MU1DNDJORGdnUXpNdU16TTRMRFEyTGpReE55QTFMalEwTlN3ME5TNHpNU0ExTGpVek5TdzBOUzR5TmpZZ1RERXlMakUyTXl3ME1TNDBNemtnVERFekxqQXpNeXcwTVM0ek1pQk1NVGt1TkRjNUxETTNMalUzT0NCTU1Ua3VOVEV6TERNM0xqSTBOQ0JETVRrdU5USTJMRE0zTGpFd055QXhPUzQyTkRjc016Y3VNREE0SURFNUxqYzROaXd6Tnk0d01qRWdRekU1TGpreU1pd3pOeTR3TXpRZ01qQXVNREl6TERNM0xqRTFOaUF5TUM0d01Ea3NNemN1TWpreklFd3hPUzQ1TlN3ek55NDRPRElnVERFekxqRTVPQ3cwTVM0NE1ERWdUREV5TGpNeU9DdzBNUzQ1TVRrZ1REVXVOemN5TERRMUxqY3dOQ0JETlM0M05ERXNORFV1TnpJZ015NDNPRElzTkRZdU56Y3lJRE11TVRBMkxEVXdMamN5TWlCRE15NHdPVGtzTlRBdU56Z3lJREl1TVRrNExEVTNMamd3T0NBeUxqSXhNaXczTUM0ME1qUWdRekl1TWpJMkxEZ3lMamsyTXlBeUxqZ3dPU3c0Tnk0ME1pQXpMak0zTXl3NU1TNDNNamtnUXpNdU5EWTBMRGt5TGpReUlEUXVNRFl5TERreUxqZzRNeUEwTGpZNE1pdzVNeTR4T0RFZ1F6UXVOVFkyTERreUxqazROQ0EwTGpRNE5pdzVNaTQzTnpZZ05DNDBORFlzT1RJdU5UY3lJRU16TGpZMk5TdzRPQzQxT0RnZ015NHlPVEVzT0RRdU16Y2dNeTR5TnpZc056RXVNVGN6SUVNekxqSTJNaXcxT0M0MU1pQTBMakUyTnl3MU1TNDBOallnTkM0eE56WXNOVEV1TXprMklFTTBMamt3TVN3ME55NHhOalVnTnk0d01EZ3NORFl1TURVNUlEY3VNRGs0TERRMkxqQXhOQ0JETnk0d09UUXNORFl1TURFMUlEZ3hMalUwTWl3ekxqQXpOQ0E0TVM0NU5EUXNNaTQ0TURJZ1REZ3hMamszTWl3eUxqYzROU0JET0RJdU9EYzJMREl1TWpRM0lEZ3pMalk1TWl3eUxqQTVOeUE0TkM0ek16SXNNaTR6TlRJZ1F6ZzBMamc0Tnl3eUxqVTNNeUE0TlM0eU9ERXNNeTR3T0RVZ09EVXVOVEEwTERNdU9EY3lJRU00Tnk0MU1UZ3NNVEVnT0RZdU9UWTBMRE0yTGpBNU1TQTROUzQzT0RVc05ETXVPRFUxSUVNNE5TNHlOemdzTkRjdU1UazJJRGcwTGpJeExEUTVMak0zSURneUxqWXhMRFV3TGpNeE55Qk1OeTR6TXpVc09UTXVPRFk1SUVNMkxqazVPU3c1TkM0d05qTWdOaTQyTlRnc09UUXVNVFl4SURZdU16RTNMRGswTGpFMk1TQk1OaTR6TVRjc09UUXVNVFl4SUZvZ1RUWXVNVGNzT1RNdU5qVTBJRU0yTGpRMk15dzVNeTQyT1NBMkxqYzNOQ3c1TXk0Mk1UY2dOeTR3T0RVc09UTXVORE0zSUV3NE1pNHpOVGdzTkRrdU9EZzJJRU00TkM0eE9ERXNORGd1T0RBNElEZzBMamsyTERRMUxqazNNU0E0TlM0eU9USXNORE11TnpnZ1F6ZzJMalEyTml3ek5pNHdORGtnT0RjdU1ESXpMREV4TGpBNE5TQTROUzR3TWpRc05DNHdNRGdnUXpnMExqZzBOaXd6TGpNM055QTROQzQxTlRFc01pNDVOellnT0RRdU1UUTRMREl1T0RFMklFTTRNeTQyTmpRc01pNDJNak1nT0RJdU9UZ3lMREl1TnpZMElEZ3lMakl5Tnl3ekxqSXhNeUJNT0RJdU1Ua3pMRE11TWpNMElFTTRNUzQzT1RFc015NDBOallnTnk0ek16VXNORFl1TkRVeUlEY3VNek0xTERRMkxqUTFNaUJETnk0ek1EUXNORFl1TkRZNUlEVXVNelEyTERRM0xqVXlNU0EwTGpZMk9TdzFNUzQwTnpFZ1F6UXVOall5TERVeExqVXpJRE11TnpZeExEVTRMalUxTmlBekxqYzNOU3czTVM0eE56TWdRek11Tnprc09EUXVNekk0SURRdU1UWXhMRGc0TGpVeU5DQTBMamt6Tml3NU1pNDBOellnUXpVdU1ESTJMRGt5TGprek55QTFMalF4TWl3NU15NDBOVGtnTlM0NU56TXNPVE11TmpFMUlFTTJMakE0Tnl3NU15NDJOQ0EyTGpFMU9DdzVNeTQyTlRJZ05pNHhOamtzT1RNdU5qVTBJRXcyTGpFM0xEa3pMalkxTkNCTU5pNHhOeXc1TXk0Mk5UUWdXaUlnYVdROUlrWnBiR3d0TVRJaUlHWnBiR3c5SWlNME5UVkJOalFpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk55NHpNVGNzTmpndU9UZ3lJRU0zTGpnd05pdzJPQzQzTURFZ09DNHlNRElzTmpndU9USTJJRGd1TWpBeUxEWTVMalE0TnlCRE9DNHlNRElzTnpBdU1EUTNJRGN1T0RBMkxEY3dMamN6SURjdU16RTNMRGN4TGpBeE1pQkROaTQ0TWprc056RXVNamswSURZdU5ETXpMRGN4TGpBMk9TQTJMalF6TXl3M01DNDFNRGdnUXpZdU5ETXpMRFk1TGprME9DQTJMamd5T1N3Mk9TNHlOalVnTnk0ek1UY3NOamd1T1RneUlpQnBaRDBpUm1sc2JDMHhNeUlnWm1sc2JEMGlJMFpHUmtaR1JpSStQQzl3WVhSb1Bnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazAyTGpreUxEY3hMakV6TXlCRE5pNDJNekVzTnpFdU1UTXpJRFl1TkRNekxEY3dMamt3TlNBMkxqUXpNeXczTUM0MU1EZ2dRell1TkRNekxEWTVMamswT0NBMkxqZ3lPU3cyT1M0eU5qVWdOeTR6TVRjc05qZ3VPVGd5SUVNM0xqUTJMRFk0TGprZ055NDFPVFVzTmpndU9EWXhJRGN1TnpFMExEWTRMamcyTVNCRE9DNHdNRE1zTmpndU9EWXhJRGd1TWpBeUxEWTVMakE1SURndU1qQXlMRFk1TGpRNE55QkRPQzR5TURJc056QXVNRFEzSURjdU9EQTJMRGN3TGpjeklEY3VNekUzTERjeExqQXhNaUJETnk0eE56UXNOekV1TURrMElEY3VNRE01TERjeExqRXpNeUEyTGpreUxEY3hMakV6TXlCTk55NDNNVFFzTmpndU5qYzBJRU0zTGpVMU55dzJPQzQyTnpRZ055NHpPVElzTmpndU56SXpJRGN1TWpJMExEWTRMamd5TVNCRE5pNDJOellzTmprdU1UTTRJRFl1TWpRMkxEWTVMamczT1NBMkxqSTBOaXczTUM0MU1EZ2dRell1TWpRMkxEY3dMams1TkNBMkxqVXhOeXczTVM0ek1pQTJMamt5TERjeExqTXlJRU0zTGpBM09DdzNNUzR6TWlBM0xqSTBNeXczTVM0eU56RWdOeTQwTVRFc056RXVNVGMwSUVNM0xqazFPU3czTUM0NE5UY2dPQzR6T0Rrc056QXVNVEUzSURndU16ZzVMRFk1TGpRNE55QkRPQzR6T0Rrc05qa3VNREF4SURndU1URTNMRFk0TGpZM05DQTNMamN4TkN3Mk9DNDJOelFpSUdsa1BTSkdhV3hzTFRFMElpQm1hV3hzUFNJak9EQTVOMEV5SWo0OEwzQmhkR2crQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUWXVPVElzTnpBdU9UUTNJRU0yTGpZME9TdzNNQzQ1TkRjZ05pNDJNakVzTnpBdU5qUWdOaTQyTWpFc056QXVOVEE0SUVNMkxqWXlNU3czTUM0d01UY2dOaTQ1T0RJc05qa3VNemt5SURjdU5ERXhMRFk1TGpFME5TQkROeTQxTWpFc05qa3VNRGd5SURjdU5qSTFMRFk1TGpBME9TQTNMamN4TkN3Mk9TNHdORGtnUXpjdU9UZzJMRFk1TGpBME9TQTRMakF4TlN3Mk9TNHpOVFVnT0M0d01UVXNOamt1TkRnM0lFTTRMakF4TlN3Mk9TNDVOemdnTnk0Mk5USXNOekF1TmpBeklEY3VNakkwTERjd0xqZzFNU0JETnk0eE1UVXNOekF1T1RFMElEY3VNREVzTnpBdU9UUTNJRFl1T1RJc056QXVPVFEzSUUwM0xqY3hOQ3cyT0M0NE5qRWdRemN1TlRrMUxEWTRMamcyTVNBM0xqUTJMRFk0TGprZ055NHpNVGNzTmpndU9UZ3lJRU0yTGpneU9TdzJPUzR5TmpVZ05pNDBNek1zTmprdU9UUTRJRFl1TkRNekxEY3dMalV3T0NCRE5pNDBNek1zTnpBdU9UQTFJRFl1TmpNeExEY3hMakV6TXlBMkxqa3lMRGN4TGpFek15QkROeTR3TXprc056RXVNVE16SURjdU1UYzBMRGN4TGpBNU5DQTNMak14Tnl3M01TNHdNVElnUXpjdU9EQTJMRGN3TGpjeklEZ3VNakF5TERjd0xqQTBOeUE0TGpJd01pdzJPUzQwT0RjZ1F6Z3VNakF5TERZNUxqQTVJRGd1TURBekxEWTRMamcyTVNBM0xqY3hOQ3cyT0M0NE5qRWlJR2xrUFNKR2FXeHNMVEUxSWlCbWFXeHNQU0lqT0RBNU4wRXlJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRjdU5EUTBMRGcxTGpNMUlFTTNMamN3T0N3NE5TNHhPVGdnTnk0NU1qRXNPRFV1TXpFNUlEY3VPVEl4TERnMUxqWXlNaUJETnk0NU1qRXNPRFV1T1RJMUlEY3VOekE0TERnMkxqSTVNaUEzTGpRME5DdzROaTQwTkRRZ1F6Y3VNVGd4TERnMkxqVTVOeUEyTGprMk55dzROaTQwTnpVZ05pNDVOamNzT0RZdU1UY3pJRU0yTGprMk55dzROUzQ0TnpFZ055NHhPREVzT0RVdU5UQXlJRGN1TkRRMExEZzFMak0xSWlCcFpEMGlSbWxzYkMweE5pSWdabWxzYkQwaUkwWkdSa1pHUmlJK1BDOXdZWFJvUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdROUlrMDNMakl6TERnMkxqVXhJRU0zTGpBM05DdzROaTQxTVNBMkxqazJOeXc0Tmk0ek9EY2dOaTQ1Tmpjc09EWXVNVGN6SUVNMkxqazJOeXc0TlM0NE56RWdOeTR4T0RFc09EVXVOVEF5SURjdU5EUTBMRGcxTGpNMUlFTTNMalV5TVN3NE5TNHpNRFVnTnk0MU9UUXNPRFV1TWpnMElEY3VOalU0TERnMUxqSTROQ0JETnk0NE1UUXNPRFV1TWpnMElEY3VPVEl4TERnMUxqUXdPQ0EzTGpreU1TdzROUzQyTWpJZ1F6Y3VPVEl4TERnMUxqa3lOU0EzTGpjd09DdzROaTR5T1RJZ055NDBORFFzT0RZdU5EUTBJRU0zTGpNMk55dzROaTQwT0RrZ055NHlPVFFzT0RZdU5URWdOeTR5TXl3NE5pNDFNU0JOTnk0Mk5UZ3NPRFV1TURrNElFTTNMalUxT0N3NE5TNHdPVGdnTnk0ME5UVXNPRFV1TVRJM0lEY3VNelV4TERnMUxqRTRPQ0JETnk0d016RXNPRFV1TXpjeklEWXVOemd4TERnMUxqZ3dOaUEyTGpjNE1TdzROaTR4TnpNZ1F6WXVOemd4TERnMkxqUTRNaUEyTGprMk5pdzROaTQyT1RjZ055NHlNeXc0Tmk0Mk9UY2dRemN1TXpNc09EWXVOamszSURjdU5ETXpMRGcyTGpZMk5pQTNMalV6T0N3NE5pNDJNRGNnUXpjdU9EVTRMRGcyTGpReU1pQTRMakV3T0N3NE5TNDVPRGtnT0M0eE1EZ3NPRFV1TmpJeUlFTTRMakV3T0N3NE5TNHpNVE1nTnk0NU1qTXNPRFV1TURrNElEY3VOalU0TERnMUxqQTVPQ0lnYVdROUlrWnBiR3d0TVRjaUlHWnBiR3c5SWlNNE1EazNRVElpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk55NHlNeXc0Tmk0ek1qSWdURGN1TVRVMExEZzJMakUzTXlCRE55NHhOVFFzT0RVdU9UTTRJRGN1TXpNekxEZzFMall5T1NBM0xqVXpPQ3c0TlM0MU1USWdURGN1TmpVNExEZzFMalEzTVNCTU55NDNNelFzT0RVdU5qSXlJRU0zTGpjek5DdzROUzQ0TlRZZ055NDFOVFVzT0RZdU1UWTBJRGN1TXpVeExEZzJMakk0TWlCTU55NHlNeXc0Tmk0ek1qSWdUVGN1TmpVNExEZzFMakk0TkNCRE55NDFPVFFzT0RVdU1qZzBJRGN1TlRJeExEZzFMak13TlNBM0xqUTBOQ3c0TlM0ek5TQkROeTR4T0RFc09EVXVOVEF5SURZdU9UWTNMRGcxTGpnM01TQTJMamsyTnl3NE5pNHhOek1nUXpZdU9UWTNMRGcyTGpNNE55QTNMakEzTkN3NE5pNDFNU0EzTGpJekxEZzJMalV4SUVNM0xqSTVOQ3c0Tmk0MU1TQTNMak0yTnl3NE5pNDBPRGtnTnk0ME5EUXNPRFl1TkRRMElFTTNMamN3T0N3NE5pNHlPVElnTnk0NU1qRXNPRFV1T1RJMUlEY3VPVEl4TERnMUxqWXlNaUJETnk0NU1qRXNPRFV1TkRBNElEY3VPREUwTERnMUxqSTROQ0EzTGpZMU9DdzROUzR5T0RRaUlHbGtQU0pHYVd4c0xURTRJaUJtYVd4c1BTSWpPREE1TjBFeUlqNDhMM0JoZEdnK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVGMzTGpJM09DdzNMamMyT1NCTU56Y3VNamM0TERVeExqUXpOaUJNTVRBdU1qQTRMRGt3TGpFMklFd3hNQzR5TURnc05EWXVORGt6SUV3M055NHlOemdzTnk0M05qa2lJR2xrUFNKR2FXeHNMVEU1SWlCbWFXeHNQU0lqTkRVMVFUWTBJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFd0xqQTRNeXc1TUM0ek56VWdUREV3TGpBNE15dzBOaTQwTWpFZ1RERXdMakUwTml3ME5pNHpPRFVnVERjM0xqUXdNeXczTGpVMU5DQk1OemN1TkRBekxEVXhMalV3T0NCTU56Y3VNelF4TERVeExqVTBOQ0JNTVRBdU1EZ3pMRGt3TGpNM05TQk1NVEF1TURnekxEa3dMak0zTlNCYUlFMHhNQzR6TXpNc05EWXVOVFkwSUV3eE1DNHpNek1zT0RrdU9UUTBJRXczTnk0eE5UUXNOVEV1TXpZMUlFdzNOeTR4TlRRc055NDVPRFVnVERFd0xqTXpNeXcwTmk0MU5qUWdUREV3TGpNek15dzBOaTQxTmpRZ1dpSWdhV1E5SWtacGJHd3RNakFpSUdacGJHdzlJaU0yTURkRU9FSWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEd3ZaejRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4TWpVdU56TTNMRGc0TGpZME55Qk1NVEU0TGpBNU9DdzVNUzQ1T0RFZ1RERXhPQzR3T1Rnc09EUWdUREV3Tmk0Mk16a3NPRGd1TnpFeklFd3hNRFl1TmpNNUxEazJMams0TWlCTU9Ua3NNVEF3TGpNeE5TQk1NVEV5TGpNMk9Td3hNRE11T1RZeElFd3hNalV1TnpNM0xEZzRMalkwTnlJZ2FXUTlJa2x0Y0c5eWRHVmtMVXhoZVdWeWN5MURiM0I1TFRJaUlHWnBiR3c5SWlNME5UVkJOalFpSUhOclpYUmphRHAwZVhCbFBTSk5VMU5vWVhCbFIzSnZkWEFpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ1BDOW5QZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJRHd2Wno0S1BDOXpkbWMrJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdGF0ZUluc3RydWN0aW9ucztcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbnZhciBVdGlsID0ge307XG5cblV0aWwuYmFzZTY0ID0gZnVuY3Rpb24obWltZVR5cGUsIGJhc2U2NCkge1xuICByZXR1cm4gJ2RhdGE6JyArIG1pbWVUeXBlICsgJztiYXNlNjQsJyArIGJhc2U2NDtcbn07XG5cblV0aWwuaXNNb2JpbGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNoZWNrID0gZmFsc2U7XG4gIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSljaGVjayA9IHRydWV9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpO1xuICByZXR1cm4gY2hlY2s7XG59O1xuXG5VdGlsLmlzRmlyZWZveCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gL2ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xufTtcblxuVXRpbC5pc0lPUyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyhpUGFkfGlQaG9uZXxpUG9kKS9nLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59O1xuXG5VdGlsLmlzSUZyYW1lID0gZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblV0aWwuYXBwZW5kUXVlcnlQYXJhbWV0ZXIgPSBmdW5jdGlvbih1cmwsIGtleSwgdmFsdWUpIHtcbiAgLy8gRGV0ZXJtaW5lIGRlbGltaXRlciBiYXNlZCBvbiBpZiB0aGUgVVJMIGFscmVhZHkgR0VUIHBhcmFtZXRlcnMgaW4gaXQuXG4gIHZhciBkZWxpbWl0ZXIgPSAodXJsLmluZGV4T2YoJz8nKSA8IDAgPyAnPycgOiAnJicpO1xuICB1cmwgKz0gZGVsaW1pdGVyICsga2V5ICsgJz0nICsgdmFsdWU7XG4gIHJldHVybiB1cmw7XG59O1xuXG4vLyBGcm9tIGh0dHA6Ly9nb28uZ2wvNFdYM3RnXG5VdGlsLmdldFF1ZXJ5UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSkge1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxdXCIpO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiKSxcbiAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKGxvY2F0aW9uLnNlYXJjaCk7XG4gIHJldHVybiByZXN1bHRzID09PSBudWxsID8gXCJcIiA6IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuVXRpbC5pc0xhbmRzY2FwZU1vZGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICh3aW5kb3cub3JpZW50YXRpb24gPT0gOTAgfHwgd2luZG93Lm9yaWVudGF0aW9uID09IC05MCk7XG59O1xuXG5VdGlsLmdldFNjcmVlbldpZHRoID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLm1heCh3aW5kb3cuc2NyZWVuLndpZHRoLCB3aW5kb3cuc2NyZWVuLmhlaWdodCkgKlxuICAgICAgd2luZG93LmRldmljZVBpeGVsUmF0aW87XG59O1xuXG5VdGlsLmdldFNjcmVlbkhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5taW4od2luZG93LnNjcmVlbi53aWR0aCwgd2luZG93LnNjcmVlbi5oZWlnaHQpICpcbiAgICAgIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IHRvIGNvbnZlcnQgdGhlIHByb2plY3Rpb24gbWF0cml4IHRvIGEgdmVjdG9yIGFjY2VwdGVkIGJ5IHRoZSBzaGFkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdF9wYXJhbXMgQSByZWN0YW5nbGUgdG8gc2NhbGUgdGhpcyB2ZWN0b3IgYnkuXG4gKi9cblV0aWwucHJvamVjdGlvbk1hdHJpeFRvVmVjdG9yXyA9IGZ1bmN0aW9uKG1hdHJpeCwgb3B0X3BhcmFtcykge1xuICB2YXIgcGFyYW1zID0gb3B0X3BhcmFtcyB8fCB7fTtcbiAgdmFyIHhTY2FsZSA9IHBhcmFtcy54U2NhbGUgfHwgMTtcbiAgdmFyIHlTY2FsZSA9IHBhcmFtcy55U2NhbGUgfHwgMTtcbiAgdmFyIHhUcmFucyA9IHBhcmFtcy54VHJhbnMgfHwgMDtcbiAgdmFyIHlUcmFucyA9IHBhcmFtcy55VHJhbnMgfHwgMDtcblxuICB2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG4gIHZhciB2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yNCgpO1xuICB2ZWMuc2V0KGVsZW1lbnRzWzQqMCArIDBdICogeFNjYWxlLFxuICAgICAgICAgIGVsZW1lbnRzWzQqMSArIDFdICogeVNjYWxlLFxuICAgICAgICAgIGVsZW1lbnRzWzQqMiArIDBdIC0gMSAtIHhUcmFucyxcbiAgICAgICAgICBlbGVtZW50c1s0KjIgKyAxXSAtIDEgLSB5VHJhbnMpLmRpdmlkZVNjYWxhcigyKTtcbiAgcmV0dXJuIHZlYztcbn07XG5cblV0aWwubGVmdFByb2plY3Rpb25WZWN0b3JUb1JpZ2h0XyA9IGZ1bmN0aW9uKGxlZnQpIHtcbiAgLy9wcm9qZWN0aW9uTGVmdCArIHZlYzQoMC4wLCAwLjAsIDEuMCwgMC4wKSkgKiB2ZWM0KDEuMCwgMS4wLCAtMS4wLCAxLjApO1xuICB2YXIgb3V0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMCwgMCwgMSwgMCk7XG4gIG91dC5hZGQobGVmdCk7IC8vIG91dCA9IGxlZnQgKyAoMCwgMCwgMSwgMCkuXG4gIG91dC56ICo9IC0xOyAvLyBGbGlwIHouXG5cbiAgcmV0dXJuIG91dDtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL2VtaXR0ZXIuanMnKTtcbnZhciBVdGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cbnZhciBERUZBVUxUX1ZJRVdFUiA9ICdDYXJkYm9hcmRWMSc7XG52YXIgVklFV0VSX0tFWSA9ICdXRUJWUl9DQVJEQk9BUkRfVklFV0VSJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdmlld2VyIHNlbGVjdG9yIHdpdGggdGhlIG9wdGlvbnMgc3BlY2lmaWVkLiBTdXBwb3J0cyBiZWluZyBzaG93blxuICogYW5kIGhpZGRlbi4gR2VuZXJhdGVzIGV2ZW50cyB3aGVuIHZpZXdlciBwYXJhbWV0ZXJzIGNoYW5nZS4gQWxzbyBzdXBwb3J0c1xuICogc2F2aW5nIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5kZXggaW4gbG9jYWxTdG9yYWdlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbiBsYWJlbHMgZm9yIGFsbCB2YWxpZCBzZWxlY3Rpb25zIHtuYW1lOiBpbmRleH0uXG4gKi9cbmZ1bmN0aW9uIFZpZXdlclNlbGVjdG9yKG9wdGlvbnMpIHtcbiAgLy8gVHJ5IHRvIGxvYWQgdGhlIHNlbGVjdGVkIGtleSBmcm9tIGxvY2FsIHN0b3JhZ2UuIElmIG5vbmUgZXhpc3RzLCB1c2UgdGhlXG4gIC8vIGRlZmF1bHQga2V5LlxuICB0cnkge1xuICAgIHRoaXMuc2VsZWN0ZWRLZXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShWSUVXRVJfS0VZKSB8fCBERUZBVUxUX1ZJRVdFUjtcbiAgfSBjYXRjaChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHZpZXdlciBwcm9maWxlOiAlcycsIGVycm9yKTtcbiAgfVxuICB0aGlzLmRpYWxvZyA9IHRoaXMuY3JlYXRlRGlhbG9nXyhvcHRpb25zKTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XG59XG5WaWV3ZXJTZWxlY3Rvci5wcm90b3R5cGUgPSBuZXcgRW1pdHRlcigpO1xuXG5WaWV3ZXJTZWxlY3Rvci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAvL2NvbnNvbGUubG9nKCdWaWV3ZXJTZWxlY3Rvci5zaG93Jyk7XG5cbiAgLy8gRW5zdXJlIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBpcyBjaGVja2VkLlxuICB2YXIgc2VsZWN0ZWQgPSB0aGlzLmRpYWxvZy5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuc2VsZWN0ZWRLZXkpO1xuICBzZWxlY3RlZC5jaGVja2VkID0gdHJ1ZTtcblxuICAvLyBTaG93IHRoZSBVSS5cbiAgdGhpcy5kaWFsb2cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG5WaWV3ZXJTZWxlY3Rvci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAvL2NvbnNvbGUubG9nKCdWaWV3ZXJTZWxlY3Rvci5oaWRlJyk7XG4gIHRoaXMuZGlhbG9nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG5WaWV3ZXJTZWxlY3Rvci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRLZXlfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbnB1dCA9IHRoaXMuZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9ZmllbGRdOmNoZWNrZWQnKTtcbiAgaWYgKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0LmlkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuVmlld2VyU2VsZWN0b3IucHJvdG90eXBlLm9uU2F2ZV8gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZWxlY3RlZEtleSA9IHRoaXMuZ2V0U2VsZWN0ZWRLZXlfKCk7XG4gIGlmICghdGhpcy5zZWxlY3RlZEtleSB8fCAhdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRLZXldKSB7XG4gICAgY29uc29sZS5lcnJvcignVmlld2VyU2VsZWN0b3Iub25TYXZlXzogdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuIScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRLZXldKTtcblxuICAvLyBBdHRlbXB0IHRvIHNhdmUgdGhlIHZpZXdlciBwcm9maWxlLCBidXQgZmFpbHMgaW4gcHJpdmF0ZSBtb2RlLlxuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFZJRVdFUl9LRVksIHRoaXMuc2VsZWN0ZWRLZXkpO1xuICB9IGNhdGNoKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgdmlld2VyIHByb2ZpbGU6ICVzJywgZXJyb3IpO1xuICB9XG4gIHRoaXMuaGlkZSgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBkaWFsb2cuXG4gKi9cblZpZXdlclNlbGVjdG9yLnByb3RvdHlwZS5jcmVhdGVEaWFsb2dfID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAvLyBDcmVhdGUgYW4gb3ZlcmxheSB0aGF0IGRpbXMgdGhlIGJhY2tncm91bmQsIGFuZCB3aGljaCBnb2VzIGF3YXkgd2hlbiB5b3VcbiAgLy8gdGFwIGl0LlxuICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB2YXIgcyA9IG92ZXJsYXkuc3R5bGU7XG4gIHMucG9zaXRpb24gPSAnZml4ZWQnO1xuICBzLmxlZnQgPSAwO1xuICBzLnRvcCA9IDA7XG4gIHMud2lkdGggPSAnMTAwJSc7XG4gIHMuaGVpZ2h0ID0gJzEwMCUnO1xuICBzLmJhY2tncm91bmQgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblxuICB2YXIgd2lkdGggPSAyODA7XG4gIHZhciBkaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmFyIHMgPSBkaWFsb2cuc3R5bGU7XG4gIHMuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICBzLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgcy50b3AgPSAnMjRweCc7XG4gIHMubGVmdCA9ICc1MCUnO1xuICBzLm1hcmdpbkxlZnQgPSAoLXdpZHRoLzIpICsgJ3B4JztcbiAgcy53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgcy5wYWRkaW5nID0gJzI0cHgnO1xuICBzLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIHMuYmFja2dyb3VuZCA9ICcjZmFmYWZhJztcbiAgcy5mb250RmFtaWx5ID0gXCInUm9ib3RvJywgc2Fucy1zZXJpZlwiO1xuICBzLmJveFNoYWRvdyA9ICcwcHggNXB4IDIwcHggIzY2Nic7XG5cbiAgZGlhbG9nLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlSDFfKCdTZWxlY3QgeW91ciB2aWV3ZXInKSk7XG4gIGZvciAodmFyIGlkIGluIG9wdGlvbnMpIHtcbiAgICBkaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVDaG9pY2VfKGlkLCBvcHRpb25zW2lkXS5sYWJlbCkpO1xuICB9XG4gIGRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUJ1dHRvbl8oJ1NhdmUnLCB0aGlzLm9uU2F2ZV8uYmluZCh0aGlzKSkpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvdmVybGF5KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpYWxvZyk7XG5cbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn07XG5cblZpZXdlclNlbGVjdG9yLnByb3RvdHlwZS5jcmVhdGVIMV8gPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIHZhciBzID0gaDEuc3R5bGU7XG4gIHMuY29sb3IgPSAnYmxhY2snO1xuICBzLmZvbnRTaXplID0gJzIwcHgnO1xuICBzLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gIHMubWFyZ2luVG9wID0gMDtcbiAgcy5tYXJnaW5Cb3R0b20gPSAnMjRweCc7XG4gIGgxLmlubmVySFRNTCA9IG5hbWU7XG4gIHJldHVybiBoMTtcbn07XG5cblZpZXdlclNlbGVjdG9yLnByb3RvdHlwZS5jcmVhdGVDaG9pY2VfID0gZnVuY3Rpb24oaWQsIG5hbWUpIHtcbiAgLypcbiAgPGRpdiBjbGFzcz1cImNob2ljZVwiPlxuICA8aW5wdXQgaWQ9XCJ2MVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJmaWVsZFwiIHZhbHVlPVwidjFcIj5cbiAgPGxhYmVsIGZvcj1cInYxXCI+Q2FyZGJvYXJkIFYxPC9sYWJlbD5cbiAgPC9kaXY+XG4gICovXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnN0eWxlLm1hcmdpblRvcCA9ICc4cHgnO1xuICBkaXYuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuXG4gIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGlucHV0LnN0eWxlLmZvbnRTaXplID0gJzMwcHgnO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAncmFkaW8nKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGlkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZpZWxkJyk7XG5cbiAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbGFiZWwuc3R5bGUubWFyZ2luTGVmdCA9ICc0cHgnO1xuICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIGlkKTtcbiAgbGFiZWwuaW5uZXJIVE1MID0gbmFtZTtcblxuICBkaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gIHJldHVybiBkaXY7XG59O1xuXG5WaWV3ZXJTZWxlY3Rvci5wcm90b3R5cGUuY3JlYXRlQnV0dG9uXyA9IGZ1bmN0aW9uKGxhYmVsLCBvbmNsaWNrKSB7XG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLmlubmVySFRNTCA9IGxhYmVsO1xuICB2YXIgcyA9IGJ1dHRvbi5zdHlsZTtcbiAgcy5mbG9hdCA9ICdyaWdodCc7XG4gIHMudGV4dFRyYW5zZm9ybSA9ICd1cHBlcmNhc2UnO1xuICBzLmNvbG9yID0gJyMxMDk0ZjcnO1xuICBzLmZvbnRTaXplID0gJzE0cHgnO1xuICBzLmxldHRlclNwYWNpbmcgPSAwO1xuICBzLmJvcmRlciA9IDA7XG4gIHMuYmFja2dyb3VuZCA9ICdub25lJztcbiAgcy5tYXJnaW5Ub3AgPSAnMTZweCc7XG5cbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25jbGljayk7XG5cbiAgcmV0dXJuIGJ1dHRvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld2VyU2VsZWN0b3I7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMTUgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG4vKipcbiAqIEFuZHJvaWQgYW5kIGlPUyBjb21wYXRpYmxlIHdha2Vsb2NrIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIFJlZmFjdG9yZWQgdGhhbmtzIHRvIGRrb3ZhbGV2QC5cbiAqL1xuZnVuY3Rpb24gQW5kcm9pZFdha2VMb2NrKCkge1xuICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuXG4gIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgdmlkZW8ucGxheSgpO1xuICB9KTtcblxuICB0aGlzLnJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodmlkZW8ucGF1c2VkKSB7XG4gICAgICAvLyBCYXNlNjQgdmVyc2lvbiBvZiB2aWRlb3Nfc3JjL25vLXNsZWVwLTEyMHMubXA0LlxuICAgICAgdmlkZW8uc3JjID0gVXRpbC5iYXNlNjQoJ3ZpZGVvL21wNCcsICdBQUFBR0daMGVYQnBjMjl0QUFBQUFHMXdOREZoZG1NeEFBQUlBMjF2YjNZQUFBQnNiWFpvWkFBQUFBRFNhOXY2MG12YitnQUJYNUFBbHcvZ0FBRUFBQUVBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFJQUFBZGtkSEpoYXdBQUFGeDBhMmhrQUFBQUFkSnIyL3JTYTl2NkFBQUFBUUFBQUFBQWx3L2dBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBUUFBQUFBQVFBQUFBSEFBQUFBQUFKR1ZrZEhNQUFBQWNaV3h6ZEFBQUFBQUFBQUFCQUpjUDRBQUFBQUFBQVFBQUFBQUczRzFrYVdFQUFBQWdiV1JvWkFBQUFBRFNhOXY2MG12YitnQVBRa0FHam5lQUZjY0FBQUFBQUMxb1pHeHlBQUFBQUFBQUFBQjJhV1JsQUFBQUFBQUFBQUFBQUFBQVZtbGtaVzlJWVc1a2JHVnlBQUFBQm9kdGFXNW1BQUFBRkhadGFHUUFBQUFCQUFBQUFBQUFBQUFBQUFBa1pHbHVaZ0FBQUJ4a2NtVm1BQUFBQUFBQUFBRUFBQUFNZFhKc0lBQUFBQUVBQUFaSGMzUmliQUFBQUpkemRITmtBQUFBQUFBQUFBRUFBQUNIWVhaak1RQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBTUFCd0FTQUFBQUVnQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQmovL3dBQUFERmhkbU5EQVdRQUMvL2hBQmxuWkFBTHJObGZsbHc0UUFBQUF3QkFBQUFEQUtQRkNtV0FBUUFGYU92c3Npd0FBQUFZYzNSMGN3QUFBQUFBQUFBQkFBQUFiZ0FQUWtBQUFBQVVjM1J6Y3dBQUFBQUFBQUFCQUFBQUFRQUFBNEJqZEhSekFBQUFBQUFBQUc0QUFBQUJBRDBKQUFBQUFBRUFlaElBQUFBQUFRQTlDUUFBQUFBQkFBQUFBQUFBQUFFQUQwSkFBQUFBQVFCTVMwQUFBQUFCQUI2RWdBQUFBQUVBQUFBQUFBQUFBUUFQUWtBQUFBQUJBRXhMUUFBQUFBRUFIb1NBQUFBQUFRQUFBQUFBQUFBQkFBOUNRQUFBQUFFQVRFdEFBQUFBQVFBZWhJQUFBQUFCQUFBQUFBQUFBQUVBRDBKQUFBQUFBUUJNUzBBQUFBQUJBQjZFZ0FBQUFBRUFBQUFBQUFBQUFRQVBRa0FBQUFBQkFFeExRQUFBQUFFQUhvU0FBQUFBQVFBQUFBQUFBQUFCQUE5Q1FBQUFBQUVBVEV0QUFBQUFBUUFlaElBQUFBQUJBQUFBQUFBQUFBRUFEMEpBQUFBQUFRQk1TMEFBQUFBQkFCNkVnQUFBQUFFQUFBQUFBQUFBQVFBUFFrQUFBQUFCQUV4TFFBQUFBQUVBSG9TQUFBQUFBUUFBQUFBQUFBQUJBQTlDUUFBQUFBRUFURXRBQUFBQUFRQWVoSUFBQUFBQkFBQUFBQUFBQUFFQUQwSkFBQUFBQVFCTVMwQUFBQUFCQUI2RWdBQUFBQUVBQUFBQUFBQUFBUUFQUWtBQUFBQUJBRXhMUUFBQUFBRUFIb1NBQUFBQUFRQUFBQUFBQUFBQkFBOUNRQUFBQUFFQVRFdEFBQUFBQVFBZWhJQUFBQUFCQUFBQUFBQUFBQUVBRDBKQUFBQUFBUUJNUzBBQUFBQUJBQjZFZ0FBQUFBRUFBQUFBQUFBQUFRQVBRa0FBQUFBQkFFeExRQUFBQUFFQUhvU0FBQUFBQVFBQUFBQUFBQUFCQUE5Q1FBQUFBQUVBVEV0QUFBQUFBUUFlaElBQUFBQUJBQUFBQUFBQUFBRUFEMEpBQUFBQUFRQk1TMEFBQUFBQkFCNkVnQUFBQUFFQUFBQUFBQUFBQVFBUFFrQUFBQUFCQUV4TFFBQUFBQUVBSG9TQUFBQUFBUUFBQUFBQUFBQUJBQTlDUUFBQUFBRUFURXRBQUFBQUFRQWVoSUFBQUFBQkFBQUFBQUFBQUFFQUQwSkFBQUFBQVFCTVMwQUFBQUFCQUI2RWdBQUFBQUVBQUFBQUFBQUFBUUFQUWtBQUFBQUJBRXhMUUFBQUFBRUFIb1NBQUFBQUFRQUFBQUFBQUFBQkFBOUNRQUFBQUFFQVRFdEFBQUFBQVFBZWhJQUFBQUFCQUFBQUFBQUFBQUVBRDBKQUFBQUFBUUJNUzBBQUFBQUJBQjZFZ0FBQUFBRUFBQUFBQUFBQUFRQVBRa0FBQUFBQkFFeExRQUFBQUFFQUhvU0FBQUFBQVFBQUFBQUFBQUFCQUE5Q1FBQUFBQUVBVEV0QUFBQUFBUUFlaElBQUFBQUJBQUFBQUFBQUFBRUFEMEpBQUFBQUFRQk1TMEFBQUFBQkFCNkVnQUFBQUFFQUFBQUFBQUFBQVFBUFFrQUFBQUFCQUV4TFFBQUFBQUVBSG9TQUFBQUFBUUFBQUFBQUFBQUJBQTlDUUFBQUFBRUFMY2JBQUFBQUhITjBjMk1BQUFBQUFBQUFBUUFBQUFFQUFBQnVBQUFBQVFBQUFjeHpkSE42QUFBQUFBQUFBQUFBQUFCdUFBQURDUUFBQUJnQUFBQU9BQUFBRGdBQUFBd0FBQUFTQUFBQURnQUFBQXdBQUFBTUFBQUFFZ0FBQUE0QUFBQU1BQUFBREFBQUFCSUFBQUFPQUFBQURBQUFBQXdBQUFBU0FBQUFEZ0FBQUF3QUFBQU1BQUFBRWdBQUFBNEFBQUFNQUFBQURBQUFBQklBQUFBT0FBQUFEQUFBQUF3QUFBQVNBQUFBRGdBQUFBd0FBQUFNQUFBQUVnQUFBQTRBQUFBTUFBQUFEQUFBQUJJQUFBQU9BQUFBREFBQUFBd0FBQUFTQUFBQURnQUFBQXdBQUFBTUFBQUFFZ0FBQUE0QUFBQU1BQUFBREFBQUFCSUFBQUFPQUFBQURBQUFBQXdBQUFBU0FBQUFEZ0FBQUF3QUFBQU1BQUFBRWdBQUFBNEFBQUFNQUFBQURBQUFBQklBQUFBT0FBQUFEQUFBQUF3QUFBQVNBQUFBRGdBQUFBd0FBQUFNQUFBQUVnQUFBQTRBQUFBTUFBQUFEQUFBQUJJQUFBQU9BQUFBREFBQUFBd0FBQUFTQUFBQURnQUFBQXdBQUFBTUFBQUFFZ0FBQUE0QUFBQU1BQUFBREFBQUFCSUFBQUFPQUFBQURBQUFBQXdBQUFBU0FBQUFEZ0FBQUF3QUFBQU1BQUFBRWdBQUFBNEFBQUFNQUFBQURBQUFBQklBQUFBT0FBQUFEQUFBQUF3QUFBQVNBQUFBRGdBQUFBd0FBQUFNQUFBQUVnQUFBQTRBQUFBTUFBQUFEQUFBQUJNQUFBQVVjM1JqYndBQUFBQUFBQUFCQUFBSUt3QUFBQ3QxWkhSaEFBQUFJNmxsYm1NQUZ3QUFkbXhqSURJdU1pNHhJSE4wY21WaGJTQnZkWFJ3ZFhRQUFBQUlkMmxrWlFBQUNSUnRaR0YwQUFBQ3JnWC8vNnZjUmVtOTV0bEl0NVlzMkNEWkkrN3ZlREkyTkNBdElHTnZjbVVnTVRReUlDMGdTQzR5TmpRdlRWQkZSeTAwSUVGV1F5QmpiMlJsWXlBdElFTnZjSGxzWldaMElESXdNRE10TWpBeE5DQXRJR2gwZEhBNkx5OTNkM2N1ZG1sa1pXOXNZVzR1YjNKbkwzZ3lOalF1YUhSdGJDQXRJRzl3ZEdsdmJuTTZJR05oWW1GalBURWdjbVZtUFRNZ1pHVmliRzlqYXoweE9qQTZNQ0JoYm1Gc2VYTmxQVEI0TXpvd2VERXpJRzFsUFdobGVDQnpkV0p0WlQwM0lIQnplVDB4SUhCemVWOXlaRDB4TGpBd09qQXVNREFnYldsNFpXUmZjbVZtUFRFZ2JXVmZjbUZ1WjJVOU1UWWdZMmh5YjIxaFgyMWxQVEVnZEhKbGJHeHBjejB4SURoNE9HUmpkRDB4SUdOeGJUMHdJR1JsWVdSNmIyNWxQVEl4TERFeElHWmhjM1JmY0hOcmFYQTlNU0JqYUhKdmJXRmZjWEJmYjJabWMyVjBQUzB5SUhSb2NtVmhaSE05TVRJZ2JHOXZhMkZvWldGa1gzUm9jbVZoWkhNOU1TQnpiR2xqWldSZmRHaHlaV0ZrY3owd0lHNXlQVEFnWkdWamFXMWhkR1U5TVNCcGJuUmxjbXhoWTJWa1BUQWdZbXgxY21GNVgyTnZiWEJoZEQwd0lHTnZibk4wY21GcGJtVmtYMmx1ZEhKaFBUQWdZbVp5WVcxbGN6MHpJR0pmY0hseVlXMXBaRDB5SUdKZllXUmhjSFE5TVNCaVgySnBZWE05TUNCa2FYSmxZM1E5TVNCM1pXbG5hSFJpUFRFZ2IzQmxibDluYjNBOU1DQjNaV2xuYUhSd1BUSWdhMlY1YVc1MFBUSTFNQ0JyWlhscGJuUmZiV2x1UFRFZ2MyTmxibVZqZFhROU5EQWdhVzUwY21GZmNtVm1jbVZ6YUQwd0lISmpYMnh2YjJ0aGFHVmhaRDAwTUNCeVl6MWhZbklnYldKMGNtVmxQVEVnWW1sMGNtRjBaVDB4TURBZ2NtRjBaWFJ2YkQweExqQWdjV052YlhBOU1DNDJNQ0J4Y0cxcGJqMHhNQ0J4Y0cxaGVEMDFNU0J4Y0hOMFpYQTlOQ0JwY0Y5eVlYUnBiejB4TGpRd0lHRnhQVEU2TVM0d01BQ0FBQUFBVTJXSWhBQVEvOGx0bE9lK2NUWnVHa0tnK2FSdHVpdmNEWjBwQnNmc0VpOXAvaTF5VTlEeFMybHE0ZFhUaW5WaUYxVVJCS1hnbnpLQmQvVWgxYmtoSHRNcndyUmNPSnNsRDAxVUIrZnlhTDZlZitEQkFBQUFGRUdhSkd4QkQ1Qit2K2ErNFFxRjNNZ0JYejlNQUFBQUNrR2VRbmlILys5NHI2RUFBQUFLQVo1aGRFTi84UXl0d0FBQUFBZ0JubU5xUTMvRWdRQUFBQTVCbW1oSnFFRm9tVXdJSWYvKzRRQUFBQXBCbm9aRkVTdy8vNzZCQUFBQUNBR2VwWFJEZjhTQkFBQUFDQUdlcDJwRGY4U0FBQUFBRGtHYXJFbW9RV3laVEFnaC8vN2dBQUFBQ2tHZXlrVVZMRC8vdm9FQUFBQUlBWjdwZEVOL3hJQUFBQUFJQVo3cmFrTi94SUFBQUFBT1FacndTYWhCYkpsTUNDSC8vdUVBQUFBS1FaOE9SUlVzUC8rK2dRQUFBQWdCbnkxMFEzL0VnUUFBQUFnQm55OXFRMy9FZ0FBQUFBNUJtelJKcUVGc21Vd0lJZi8rNEFBQUFBcEJuMUpGRlN3Ly83NkJBQUFBQ0FHZmNYUkRmOFNBQUFBQUNBR2ZjMnBEZjhTQUFBQUFEa0diZUVtb1FXeVpUQWdoLy83aEFBQUFDa0dmbGtVVkxELy92b0FBQUFBSUFaKzFkRU4veElFQUFBQUlBWiszYWtOL3hJRUFBQUFPUVp1OFNhaEJiSmxNQ0NILy91QUFBQUFLUVovYVJSVXNQLysrZ1FBQUFBZ0JuL2wwUTMvRWdBQUFBQWdCbi90cVEzL0VnUUFBQUE1Qm0rQkpxRUZzbVV3SUlmLys0UUFBQUFwQm5oNUZGU3cvLzc2QUFBQUFDQUdlUFhSRGY4U0FBQUFBQ0FHZVAycERmOFNCQUFBQURrR2FKRW1vUVd5WlRBZ2gvLzdnQUFBQUNrR2VRa1VWTEQvL3ZvRUFBQUFJQVo1aGRFTi94SUFBQUFBSUFaNWpha04veElFQUFBQU9RWnBvU2FoQmJKbE1DQ0gvL3VFQUFBQUtRWjZHUlJVc1AvKytnUUFBQUFnQm5xVjBRMy9FZ1FBQUFBZ0JucWRxUTMvRWdBQUFBQTVCbXF4SnFFRnNtVXdJSWYvKzRBQUFBQXBCbnNwRkZTdy8vNzZCQUFBQUNBR2U2WFJEZjhTQUFBQUFDQUdlNjJwRGY4U0FBQUFBRGtHYThFbW9RV3laVEFnaC8vN2hBQUFBQ2tHZkRrVVZMRC8vdm9FQUFBQUlBWjh0ZEVOL3hJRUFBQUFJQVo4dmFrTi94SUFBQUFBT1FaczBTYWhCYkpsTUNDSC8vdUFBQUFBS1FaOVNSUlVzUC8rK2dRQUFBQWdCbjNGMFEzL0VnQUFBQUFnQm4zTnFRMy9FZ0FBQUFBNUJtM2hKcUVGc21Vd0lJZi8rNFFBQUFBcEJuNVpGRlN3Ly83NkFBQUFBQ0FHZnRYUkRmOFNCQUFBQUNBR2Z0MnBEZjhTQkFBQUFEa0didkVtb1FXeVpUQWdoLy83Z0FBQUFDa0dmMmtVVkxELy92b0VBQUFBSUFaLzVkRU4veElBQUFBQUlBWi83YWtOL3hJRUFBQUFPUVp2Z1NhaEJiSmxNQ0NILy91RUFBQUFLUVo0ZVJSVXNQLysrZ0FBQUFBZ0JuajEwUTMvRWdBQUFBQWdCbmo5cVEzL0VnUUFBQUE1Qm1pUkpxRUZzbVV3SUlmLys0QUFBQUFwQm5rSkZGU3cvLzc2QkFBQUFDQUdlWVhSRGY4U0FBQUFBQ0FHZVkycERmOFNCQUFBQURrR2FhRW1vUVd5WlRBZ2gvLzdoQUFBQUNrR2Voa1VWTEQvL3ZvRUFBQUFJQVo2bGRFTi94SUVBQUFBSUFaNm5ha04veElBQUFBQU9RWnFzU2FoQmJKbE1DQ0gvL3VBQUFBQUtRWjdLUlJVc1AvKytnUUFBQUFnQm51bDBRMy9FZ0FBQUFBZ0JudXRxUTMvRWdBQUFBQTVCbXZCSnFFRnNtVXdJSWYvKzRRQUFBQXBCbnc1RkZTdy8vNzZCQUFBQUNBR2ZMWFJEZjhTQkFBQUFDQUdmTDJwRGY4U0FBQUFBRGtHYk5FbW9RV3laVEFnaC8vN2dBQUFBQ2tHZlVrVVZMRC8vdm9FQUFBQUlBWjl4ZEVOL3hJQUFBQUFJQVo5emFrTi94SUFBQUFBT1FadDRTYWhCYkpsTUNDSC8vdUVBQUFBS1FaK1dSUlVzUC8rK2dBQUFBQWdCbjdWMFEzL0VnUUFBQUFnQm43ZHFRMy9FZ1FBQUFBNUJtN3hKcUVGc21Vd0lJZi8rNEFBQUFBcEJuOXBGRlN3Ly83NkJBQUFBQ0FHZitYUkRmOFNBQUFBQUNBR2YrMnBEZjhTQkFBQUFEa0diNEVtb1FXeVpUQWdoLy83aEFBQUFDa0dlSGtVVkxELy92b0FBQUFBSUFaNDlkRU4veElBQUFBQUlBWjQvYWtOL3hJRUFBQUFPUVpva1NhaEJiSmxNQ0NILy91QUFBQUFLUVo1Q1JSVXNQLysrZ1FBQUFBZ0JubUYwUTMvRWdBQUFBQWdCbm1OcVEzL0VnUUFBQUE1Qm1taEpxRUZzbVV3SUlmLys0UUFBQUFwQm5vWkZGU3cvLzc2QkFBQUFDQUdlcFhSRGY4U0JBQUFBQ0FHZXAycERmOFNBQUFBQURrR2FyRW1vUVd5WlRBZ2gvLzdnQUFBQUNrR2V5a1VWTEQvL3ZvRUFBQUFJQVo3cGRFTi94SUFBQUFBSUFaN3Jha04veElBQUFBQVBRWnJ1U2FoQmJKbE1GRXczLy83QicpO1xuICAgICAgdmlkZW8ucGxheSgpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlbGVhc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2aWRlby5wYXVzZSgpO1xuICAgIHZpZGVvLnNyYyA9ICcnO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpT1NXYWtlTG9jaygpIHtcbiAgdmFyIHRpbWVyID0gbnVsbDtcblxuICB0aGlzLnJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRpbWVyKSB7XG4gICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG4gICAgICAgIHNldFRpbWVvdXQod2luZG93LnN0b3AsIDApO1xuICAgICAgfSwgMzAwMDApO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMucmVsZWFzZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0V2FrZUxvY2soKSB7XG4gIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhO1xuICBpZiAodXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSkgfHwgdXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpKSB7XG4gICAgcmV0dXJuIGlPU1dha2VMb2NrO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBbmRyb2lkV2FrZUxvY2s7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRXYWtlTG9jaygpO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxudmFyIEJ1dHRvbk1hbmFnZXIgPSByZXF1aXJlKCcuL2J1dHRvbi1tYW5hZ2VyLmpzJyk7XG52YXIgQ2FyZGJvYXJkRGlzdG9ydGVyID0gcmVxdWlyZSgnLi9jYXJkYm9hcmQtZGlzdG9ydGVyLmpzJyk7XG52YXIgRGV2aWNlSW5mbyA9IHJlcXVpcmUoJy4vZGV2aWNlLWluZm8uanMnKTtcbnZhciBEcGRiID0gcmVxdWlyZSgnLi9kcGRiLmpzJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vZW1pdHRlci5qcycpO1xudmFyIE1vZGVzID0gcmVxdWlyZSgnLi9tb2Rlcy5qcycpO1xudmFyIFJvdGF0ZUluc3RydWN0aW9ucyA9IHJlcXVpcmUoJy4vcm90YXRlLWluc3RydWN0aW9ucy5qcycpO1xudmFyIFV0aWwgPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcbnZhciBWaWV3ZXJTZWxlY3RvciA9IHJlcXVpcmUoJy4vdmlld2VyLXNlbGVjdG9yLmpzJyk7XG52YXIgV2FrZWxvY2sgPSByZXF1aXJlKCcuL3dha2Vsb2NrLmpzJyk7XG5cbi8qKlxuICogSGVscGVyIGZvciBnZXR0aW5nIGluIGFuZCBvdXQgb2YgVlIgbW9kZS5cbiAqIEhlcmUgd2UgYXNzdW1lIFZSIG1vZGUgPT0gZnVsbCBzY3JlZW4gbW9kZS5cbiAqXG4gKiAxLiBEZXRlY3RzIHdoZXRoZXIgb3Igbm90IFZSIG1vZGUgaXMgcG9zc2libGUgYnkgZmVhdHVyZSBkZXRlY3RpbmcgZm9yXG4gKiBXZWJWUiAob3IgcG9seWZpbGwpLlxuICpcbiAqIDIuIElmIFdlYlZSIGlzIGF2YWlsYWJsZSwgc2hvd3MgYSBidXR0b24gdGhhdCBsZXRzIHlvdSBlbnRlciBWUiBtb2RlLlxuICpcbiAqIDMuIFByb3ZpZGVzIENhcmRib2FyZC1zdHlsZSBkaXN0b3J0aW9uIGlmIHRoZSB3ZWJ2ci1wb2x5ZmlsbCBpcyBiZWluZyB1c2VkLlxuICpcbiAqIDQuIFByb3ZpZGVzIGJlc3QgcHJhY3RpY2VzIHdoaWxlIGluIFZSIG1vZGUuXG4gKiAtIEZ1bGwgc2NyZWVuXG4gKiAtIFdha2UgbG9ja1xuICogLSBPcmllbnRhdGlvbiBsb2NrIChtb2JpbGUgb25seSlcbiAqL1xuZnVuY3Rpb24gV2ViVlJNYW5hZ2VyKHJlbmRlcmVyLCBlZmZlY3QsIHBhcmFtcykge1xuICB0aGlzLnBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICB0aGlzLm1vZGUgPSBNb2Rlcy5VTktOT1dOO1xuXG4gIC8vIFNldCBvcHRpb24gdG8gaGlkZSB0aGUgYnV0dG9uLlxuICB0aGlzLmhpZGVCdXR0b24gPSB0aGlzLnBhcmFtcy5oaWRlQnV0dG9uIHx8IGZhbHNlO1xuICAvLyBXaGV0aGVyIG9yIG5vdCB0aGUgRk9WIHNob3VsZCBiZSBkaXN0b3J0ZWQgb3IgdW4tZGlzdG9ydGVkLiBCeSBkZWZhdWx0LCBpdFxuICAvLyBzaG91bGQgYmUgZGlzdG9ydGVkLCBidXQgaW4gdGhlIGNhc2Ugb2YgdmVydGV4IHNoYWRlciBiYXNlZCBkaXN0b3J0aW9uLFxuICAvLyBlbnN1cmUgdGhhdCB3ZSB1c2UgdW5kaXN0b3J0ZWQgcGFyYW1ldGVycy5cbiAgdGhpcy5pc1VuZGlzdG9ydGVkID0gISF0aGlzLnBhcmFtcy5pc1VuZGlzdG9ydGVkO1xuXG4gIC8vIFNhdmUgdGhlIFRIUkVFLmpzIHJlbmRlcmVyIGFuZCBlZmZlY3QgZm9yIGxhdGVyLlxuICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gIHRoaXMuZWZmZWN0ID0gZWZmZWN0O1xuICB0aGlzLmJ1dHRvbiA9IG5ldyBCdXR0b25NYW5hZ2VyKCk7XG4gIHRoaXMucm90YXRlSW5zdHJ1Y3Rpb25zID0gbmV3IFJvdGF0ZUluc3RydWN0aW9ucygpO1xuICB0aGlzLnZpZXdlclNlbGVjdG9yID0gbmV3IFZpZXdlclNlbGVjdG9yKERldmljZUluZm8uVmlld2Vycyk7XG5cbiAgLy8gTG9hZCB0aGUgRFBEQi5cbiAgdmFyIHNob3VsZEZldGNoID0gIVdlYlZSQ29uZmlnLk5PX0RQREJfRkVUQ0g7XG4gIHRoaXMuZHBkYiA9IG5ldyBEcGRiKHNob3VsZEZldGNoLCB0aGlzLm9uRGV2aWNlUGFyYW1zVXBkYXRlZF8uYmluZCh0aGlzKSk7XG5cbiAgLy8gQ3JlYXRlIGRldmljZSBpbmZvIGFuZCBzZXQgdGhlIGNvcnJlY3QgZGVmYXVsdCB2aWV3ZXIuXG4gIHRoaXMuZGV2aWNlSW5mbyA9IG5ldyBEZXZpY2VJbmZvKHRoaXMuZHBkYi5nZXREZXZpY2VQYXJhbXMoKSk7XG4gIHRoaXMuZGV2aWNlSW5mby52aWV3ZXIgPSBEZXZpY2VJbmZvLlZpZXdlcnNbdGhpcy52aWV3ZXJTZWxlY3Rvci5zZWxlY3RlZEtleV07XG4gIGNvbnNvbGUubG9nKCdVc2luZyB0aGUgJXMgdmlld2VyLicsIHRoaXMuZ2V0Vmlld2VyKCkubGFiZWwpO1xuXG4gIHRoaXMuZGlzdG9ydGVyID0gbmV3IENhcmRib2FyZERpc3RvcnRlcihyZW5kZXJlcik7XG4gIHRoaXMuZGlzdG9ydGVyLnVwZGF0ZURldmljZUluZm8odGhpcy5kZXZpY2VJbmZvKTtcblxuICB0aGlzLmlzVlJDb21wYXRpYmxlID0gZmFsc2U7XG4gIHRoaXMuaXNGdWxsc2NyZWVuRGlzYWJsZWQgPSAhIVV0aWwuZ2V0UXVlcnlQYXJhbWV0ZXIoJ25vX2Z1bGxzY3JlZW4nKTtcbiAgdGhpcy5zdGFydE1vZGUgPSBNb2Rlcy5OT1JNQUw7XG4gIHZhciBzdGFydE1vZGVQYXJhbSA9IHBhcnNlSW50KFV0aWwuZ2V0UXVlcnlQYXJhbWV0ZXIoJ3N0YXJ0X21vZGUnKSk7XG4gIGlmICghaXNOYU4oc3RhcnRNb2RlUGFyYW0pKSB7XG4gICAgdGhpcy5zdGFydE1vZGUgPSBzdGFydE1vZGVQYXJhbTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgY29ycmVjdCB2aWV3ZXIgcHJvZmlsZSwgYnV0IG9ubHkgaWYgdGhpcyBpcyBDYXJkYm9hcmQuXG4gIGlmIChVdGlsLmlzTW9iaWxlKCkpIHtcbiAgICB0aGlzLm9uVmlld2VyQ2hhbmdlZF8odGhpcy5nZXRWaWV3ZXIoKSk7XG4gIH1cbiAgLy8gTGlzdGVuIGZvciBjaGFuZ2VzIHRvIHRoZSB2aWV3ZXIuXG4gIHRoaXMudmlld2VyU2VsZWN0b3Iub24oJ2NoYW5nZScsIHRoaXMub25WaWV3ZXJDaGFuZ2VkXy5iaW5kKHRoaXMpKTtcblxuICBpZiAodGhpcy5oaWRlQnV0dG9uKSB7XG4gICAgdGhpcy5idXR0b24uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBpcyBjb21wYXRpYmxlIHdpdGggV2ViVlIuXG4gIHRoaXMuZ2V0RGV2aWNlQnlUeXBlXyhITURWUkRldmljZSkudGhlbihmdW5jdGlvbihobWQpIHtcbiAgICAvLyBBY3RpdmF0ZSBlaXRoZXIgVlIgb3IgSW1tZXJzaXZlIG1vZGUuXG4gICAgaWYgKFdlYlZSQ29uZmlnLkZPUkNFX0RJU1RPUlRJT04pIHtcbiAgICAgIHRoaXMuZGlzdG9ydGVyLnNldEFjdGl2ZSh0cnVlKTtcbiAgICAgIHRoaXMuaXNWUkNvbXBhdGlibGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaG1kKSB7XG4gICAgICB0aGlzLmlzVlJDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgIC8vIE9ubHkgZW5hYmxlIGRpc3RvcnRpb24gaWYgd2UgYXJlIGRlYWxpbmcgdXNpbmcgdGhlIHBvbHlmaWxsLCB3ZSBoYXZlIGFcbiAgICAgIC8vIHBlcmZlY3QgZGV2aWNlIG1hdGNoLCBhbmQgaXQncyBub3QgcHJldmVudGVkIHZpYSBjb25maWd1cmF0aW9uLlxuICAgICAgaWYgKGhtZC5kZXZpY2VOYW1lLmluZGV4T2YoJ3dlYnZyLXBvbHlmaWxsJykgPT0gMCAmJiB0aGlzLmRldmljZUluZm8uZ2V0RGV2aWNlKCkgJiZcbiAgICAgICAgICAhV2ViVlJDb25maWcuUFJFVkVOVF9ESVNUT1JUSU9OKSB7XG4gICAgICAgIHRoaXMuZGlzdG9ydGVyLnNldEFjdGl2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaG1kID0gaG1kO1xuICAgIH1cbiAgICAvLyBTZXQgdGhlIHJpZ2h0IG1vZGUuXG4gICAgc3dpdGNoICh0aGlzLnN0YXJ0TW9kZSkge1xuICAgICAgY2FzZSBNb2Rlcy5NQUdJQ19XSU5ET1c6XG4gICAgICAgIHRoaXMubm9ybWFsVG9NYWdpY1dpbmRvd18oKTtcbiAgICAgICAgdGhpcy5zZXRNb2RlXyhNb2Rlcy5NQUdJQ19XSU5ET1cpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTW9kZXMuVlI6XG4gICAgICAgIHRoaXMuYW55TW9kZVRvVlJfKCk7XG4gICAgICAgIHRoaXMuc2V0TW9kZV8oTW9kZXMuVlIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuc2V0TW9kZV8oTW9kZXMuTk9STUFMKTtcbiAgICB9XG4gICAgdGhpcy5idXR0b24ub24oJ2ZzJywgdGhpcy5vbkZTQ2xpY2tfLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYnV0dG9uLm9uKCd2cicsIHRoaXMub25WUkNsaWNrXy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmJ1dHRvbi5vbignYmFjaycsIHRoaXMub25CYWNrQ2xpY2tfLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYnV0dG9uLm9uKCdzZXR0aW5ncycsIHRoaXMub25TZXR0aW5nc0NsaWNrXy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmVtaXQoJ2luaXRpYWxpemVkJyk7XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLy8gU2F2ZSB0aGUgaW5wdXQgZGV2aWNlIGZvciBsYXRlciBzZW5kaW5nIHRpbWluZyBkYXRhLlxuICB0aGlzLmdldERldmljZUJ5VHlwZV8oUG9zaXRpb25TZW5zb3JWUkRldmljZSkudGhlbihmdW5jdGlvbihpbnB1dCkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvLyBXaGVuZXZlciB3ZSBlbnRlciBmdWxsc2NyZWVuLCB3ZSBhcmUgZW50ZXJpbmcgVlIgb3IgaW1tZXJzaXZlIG1vZGUuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2VfLmJpbmQodGhpcykpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgIHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlXy5iaW5kKHRoaXMpKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJyxcbiAgICAgIHRoaXMub25PcmllbnRhdGlvbkNoYW5nZV8uYmluZCh0aGlzKSk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZWNlc3NhcnkgZWxlbWVudHMgZm9yIHdha2UgbG9jayB0byB3b3JrLlxuICB0aGlzLndha2Vsb2NrID0gbmV3IFdha2Vsb2NrKCk7XG5cbiAgLy8gU2F2ZSB3aGV0aGVyIG9yIG5vdCB3ZSB3YW50IHRoZSB0b3VjaCBwYW5uZXIgdG8gYmUgZW5hYmxlZCBvciBkaXNhYmxlZCBieVxuICAvLyBkZWZhdWx0LlxuICB0aGlzLmlzVG91Y2hQYW5uZXJFbmFibGVkID0gIVdlYlZSQ29uZmlnLlRPVUNIX1BBTk5FUl9ESVNBQkxFRDtcblxufVxuXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlID0gbmV3IEVtaXR0ZXIoKTtcblxuLy8gRXhwb3NlIHRoZXNlIHZhbHVlcyBleHRlcm5hbGx5LlxuV2ViVlJNYW5hZ2VyLk1vZGVzID0gTW9kZXM7XG5cbi8qKlxuICogUHJvbWlzZSByZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIEhNRCBkZXZpY2UgYXZhaWxhYmxlLlxuICovXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLmdldERldmljZUJ5VHlwZV8gPSBmdW5jdGlvbih0eXBlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICBuYXZpZ2F0b3IuZ2V0VlJEZXZpY2VzKCkudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAvLyBQcm9taXNlIHN1Y2NlZWRzLCBidXQgY2hlY2sgaWYgdGhlcmUgYXJlIGFueSBkZXZpY2VzIGFjdHVhbGx5LlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkZXZpY2VzW2ldIGluc3RhbmNlb2YgdHlwZSkge1xuICAgICAgICAgIHJlc29sdmUoZGV2aWNlc1tpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBObyBkZXZpY2VzIGFyZSBmb3VuZC5cbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5pc1ZSTW9kZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tb2RlID09IE1vZGVzLlZSO1xufTtcblxuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5nZXRWaWV3ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZGV2aWNlSW5mby52aWV3ZXI7XG59O1xuXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLmdldERldmljZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5kZXZpY2VJbmZvLmRldmljZTtcbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUuZ2V0RGV2aWNlSW5mbyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5kZXZpY2VJbmZvO1xufTtcblxuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihzY2VuZSwgY2FtZXJhLCB0aW1lc3RhbXApIHtcbiAgdGhpcy5yZXNpemVJZk5lZWRlZF8oY2FtZXJhKTtcblxuICBpZiAodGhpcy5pc1ZSTW9kZSgpKSB7XG4gICAgdGhpcy5kaXN0b3J0ZXIucHJlUmVuZGVyKCk7XG4gICAgdGhpcy5lZmZlY3QucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIHRoaXMuZGlzdG9ydGVyLnBvc3RSZW5kZXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTY2VuZSBtYXkgYmUgYW4gYXJyYXkgb2YgdHdvIHNjZW5lcywgb25lIGZvciBlYWNoIGV5ZS5cbiAgICBpZiAoc2NlbmUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmVbMF0sIGNhbWVyYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIH1cbiAgfVxufTtcblxuXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLnNldE1vZGVfID0gZnVuY3Rpb24obW9kZSkge1xuICB2YXIgb2xkTW9kZSA9IHRoaXMubW9kZTtcbiAgaWYgKG1vZGUgPT0gdGhpcy5tb2RlKSB7XG4gICAgY29uc29sZS5lcnJvcignTm90IGNoYW5naW5nIG1vZGVzLCBhbHJlYWR5IGluICVzJywgbW9kZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnNvbGUubG9nKCdNb2RlIGNoYW5nZTogJXMgPT4gJXMnLCB0aGlzLm1vZGUsIG1vZGUpO1xuICB0aGlzLm1vZGUgPSBtb2RlO1xuICB0aGlzLmJ1dHRvbi5zZXRNb2RlKG1vZGUsIHRoaXMuaXNWUkNvbXBhdGlibGUpO1xuXG4gIGlmICh0aGlzLm1vZGUgPT0gTW9kZXMuVlIgJiYgVXRpbC5pc0xhbmRzY2FwZU1vZGUoKSAmJiBVdGlsLmlzTW9iaWxlKCkpIHtcbiAgICAvLyBJbiBsYW5kc2NhcGUgbW9kZSwgdGVtcG9yYXJpbHkgc2hvdyB0aGUgXCJwdXQgaW50byBDYXJkYm9hcmRcIlxuICAgIC8vIGludGVyc3RpdGlhbC4gT3RoZXJ3aXNlLCBkbyB0aGUgZGVmYXVsdCB0aGluZy5cbiAgICB0aGlzLnJvdGF0ZUluc3RydWN0aW9ucy5zaG93VGVtcG9yYXJpbHkoMzAwMCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy51cGRhdGVSb3RhdGVJbnN0cnVjdGlvbnNfKCk7XG4gIH1cblxuICAvLyBBbHNvIGhpZGUgdGhlIHZpZXdlciBzZWxlY3Rvci5cbiAgdGhpcy52aWV3ZXJTZWxlY3Rvci5oaWRlKCk7XG5cbiAgLy8gRW1pdCBhbiBldmVudCBpbmRpY2F0aW5nIHRoZSBtb2RlIGNoYW5nZWQuXG4gIHRoaXMuZW1pdCgnbW9kZWNoYW5nZScsIG1vZGUsIG9sZE1vZGUpO1xuXG4gIC8vIE5vdGU6IFRoaXMgaXMgYSBuYXN0eSBoYWNrIHNpbmNlIHdlIG5lZWQgdG8gY29tbXVuaWNhdGUgdG8gdGhlIHBvbHlmaWxsXG4gIC8vIHRoYXQgdG91Y2ggcGFubmluZyBpcyBkaXNhYmxlZCwgYW5kIHRoZSBvbmx5IHdheSB0byBkbyB0aGlzIGN1cnJlbnRseSBpc1xuICAvLyB2aWEgV2ViVlJDb25maWcuXG4gIC8vIFRPRE86IE1heWJlIG1vdmUgdG91Y2ggcGFubmluZyB0byB0aGUgYm9pbGVycGxhdGUgdG8gZWxpbWluYXRlIHRoZSBoYWNrLlxuICAvL1xuICAvLyBJZiB3ZSBhcmUgaW4gVlIgbW9kZSwgYWx3YXlzIGRpc2FibGUgdG91Y2ggcGFubmluZy5cbiAgaWYgKHRoaXMuaXNUb3VjaFBhbm5lckVuYWJsZWQpIHtcbiAgICBpZiAodGhpcy5tb2RlID09IE1vZGVzLlZSKSB7XG4gICAgICBXZWJWUkNvbmZpZy5UT1VDSF9QQU5ORVJfRElTQUJMRUQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWJWUkNvbmZpZy5UT1VDSF9QQU5ORVJfRElTQUJMRUQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5tb2RlID09IE1vZGVzLlZSKSB7XG4gICAgLy8gSW4gVlIgbW9kZSwgc2V0IHRoZSBITURWUkRldmljZSBwYXJhbWV0ZXJzLlxuICAgIHRoaXMuc2V0SE1EVlJEZXZpY2VQYXJhbXNfKHRoaXMuZ2V0Vmlld2VyKCkpO1xuICB9XG59O1xuXG4vKipcbiAqIE1haW4gYnV0dG9uIHdhcyBjbGlja2VkLlxuICovXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLm9uRlNDbGlja18gPSBmdW5jdGlvbigpIHtcbiAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICBjYXNlIE1vZGVzLk5PUk1BTDpcbiAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGhhY2sgd2hlbiBpT1MgaGFzIGZ1bGxzY3JlZW4gbW9kZS5cbiAgICAgIC8vIElmIHRoaXMgaXMgYW4gaWZyYW1lIG9uIGlPUywgYnJlYWsgb3V0IGFuZCBvcGVuIGluIG5vX2Z1bGxzY3JlZW4gbW9kZS5cbiAgICAgIGlmIChVdGlsLmlzSU9TKCkgJiYgVXRpbC5pc0lGcmFtZSgpKSB7XG4gICAgICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgdXJsID0gVXRpbC5hcHBlbmRRdWVyeVBhcmFtZXRlcih1cmwsICdub19mdWxsc2NyZWVuJywgJ3RydWUnKTtcbiAgICAgICAgdXJsID0gVXRpbC5hcHBlbmRRdWVyeVBhcmFtZXRlcih1cmwsICdzdGFydF9tb2RlJywgTW9kZXMuTUFHSUNfV0lORE9XKTtcbiAgICAgICAgdG9wLmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMubm9ybWFsVG9NYWdpY1dpbmRvd18oKTtcbiAgICAgIHRoaXMuc2V0TW9kZV8oTW9kZXMuTUFHSUNfV0lORE9XKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTW9kZXMuTUFHSUNfV0lORE9XOlxuICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuRGlzYWJsZWQpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbnlNb2RlVG9Ob3JtYWxfKCk7XG4gICAgICAgIHRoaXMuc2V0TW9kZV8oTW9kZXMuTk9STUFMKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vKipcbiAqIFRoZSBWUiBidXR0b24gd2FzIGNsaWNrZWQuXG4gKi9cbldlYlZSTWFuYWdlci5wcm90b3R5cGUub25WUkNsaWNrXyA9IGZ1bmN0aW9uKCkge1xuICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBoYWNrIHdoZW4gaU9TIGhhcyBmdWxsc2NyZWVuIG1vZGUuXG4gIC8vIElmIHRoaXMgaXMgYW4gaWZyYW1lIG9uIGlPUywgYnJlYWsgb3V0IGFuZCBvcGVuIGluIG5vX2Z1bGxzY3JlZW4gbW9kZS5cbiAgaWYgKHRoaXMubW9kZSA9PSBNb2Rlcy5OT1JNQUwgJiYgVXRpbC5pc0lPUygpICYmIFV0aWwuaXNJRnJhbWUoKSkge1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB1cmwgPSBVdGlsLmFwcGVuZFF1ZXJ5UGFyYW1ldGVyKHVybCwgJ25vX2Z1bGxzY3JlZW4nLCAndHJ1ZScpO1xuICAgIHVybCA9IFV0aWwuYXBwZW5kUXVlcnlQYXJhbWV0ZXIodXJsLCAnc3RhcnRfbW9kZScsIE1vZGVzLlZSKTtcbiAgICB0b3AubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5hbnlNb2RlVG9WUl8oKTtcbiAgdGhpcy5zZXRNb2RlXyhNb2Rlcy5WUik7XG59O1xuXG4vKipcbiAqIEJhY2sgYnV0dG9uIHdhcyBjbGlja2VkLlxuICovXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLm9uQmFja0NsaWNrXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pc0Z1bGxzY3JlZW5EaXNhYmxlZCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFueU1vZGVUb05vcm1hbF8oKTtcbiAgICB0aGlzLnNldE1vZGVfKE1vZGVzLk5PUk1BTCk7XG4gIH1cbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUub25TZXR0aW5nc0NsaWNrXyA9IGZ1bmN0aW9uKCkge1xuICAvLyBTaG93IHRoZSB2aWV3ZXIgc2VsZWN0aW9uIGRpYWxvZy5cbiAgdGhpcy52aWV3ZXJTZWxlY3Rvci5zaG93KCk7XG59O1xuXG4vKipcbiAqXG4gKiBNZXRob2RzIHRvIGdvIGJldHdlZW4gbW9kZXMuXG4gKlxuICovXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLm5vcm1hbFRvTWFnaWNXaW5kb3dfID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRPRE86IFJlLWVuYWJsZSBwb2ludGVyIGxvY2sgYWZ0ZXIgZGVidWdnaW5nLlxuICAvL3RoaXMucmVxdWVzdFBvaW50ZXJMb2NrXygpO1xuICB0aGlzLnJlcXVlc3RGdWxsc2NyZWVuXygpO1xuICB0aGlzLndha2Vsb2NrLnJlcXVlc3QoKTtcbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUuYW55TW9kZVRvVlJfID0gZnVuY3Rpb24oKSB7XG4gIC8vIERvbid0IGRvIG9yaWVudGF0aW9uIGxvY2tpbmcgZm9yIGNvbnNpc3RlbmN5LlxuICAvL3RoaXMucmVxdWVzdE9yaWVudGF0aW9uTG9ja18oKTtcbiAgdGhpcy5yZXF1ZXN0RnVsbHNjcmVlbl8oKTtcbiAgLy90aGlzLmVmZmVjdC5zZXRGdWxsU2NyZWVuKHRydWUpO1xuICB0aGlzLndha2Vsb2NrLnJlcXVlc3QoKTtcbiAgdGhpcy5kaXN0b3J0ZXIucGF0Y2goKTtcbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUudnJUb01hZ2ljV2luZG93XyA9IGZ1bmN0aW9uKCkge1xuICAvL3RoaXMucmVsZWFzZU9yaWVudGF0aW9uTG9ja18oKTtcbiAgdGhpcy5kaXN0b3J0ZXIudW5wYXRjaCgpO1xuXG4gIC8vIEFuZHJvaWQgYnVnOiB3aGVuIHJldHVybmluZyBmcm9tIFZSLCByZXNpemUgdGhlIGVmZmVjdC5cbiAgdGhpcy5yZXNpemVfKCk7XG59XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUuYW55TW9kZVRvTm9ybWFsXyA9IGZ1bmN0aW9uKCkge1xuICAvL3RoaXMuZWZmZWN0LnNldEZ1bGxTY3JlZW4oZmFsc2UpO1xuICB0aGlzLmV4aXRGdWxsc2NyZWVuXygpO1xuICAvL3RoaXMucmVsZWFzZU9yaWVudGF0aW9uTG9ja18oKTtcbiAgdGhpcy5yZWxlYXNlUG9pbnRlckxvY2tfKCk7XG4gIHRoaXMud2FrZWxvY2sucmVsZWFzZSgpO1xuICB0aGlzLmRpc3RvcnRlci51bnBhdGNoKCk7XG5cbiAgLy8gQW5kcm9pZCBidWc6IHdoZW4gcmV0dXJuaW5nIGZyb20gVlIsIHJlc2l6ZSB0aGUgZWZmZWN0LlxuICB0aGlzLnJlc2l6ZV8oKTtcbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUucmVzaXplSWZOZWVkZWRfID0gZnVuY3Rpb24oY2FtZXJhKSB7XG4gIC8vIE9ubHkgcmVzaXplIHRoZSBjYW52YXMgaWYgaXQgbmVlZHMgdG8gYmUgcmVzaXplZC5cbiAgdmFyIHNpemUgPSB0aGlzLnJlbmRlcmVyLmdldFNpemUoKTtcbiAgaWYgKHNpemUud2lkdGggIT0gd2luZG93LmlubmVyV2lkdGggfHwgc2l6ZS5oZWlnaHQgIT0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgdGhpcy5yZXNpemVfKCk7XG4gIH1cbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUucmVzaXplXyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xufTtcblxuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5vbk9yaWVudGF0aW9uQ2hhbmdlXyA9IGZ1bmN0aW9uKGUpIHtcbiAgdGhpcy51cGRhdGVSb3RhdGVJbnN0cnVjdGlvbnNfKCk7XG4gIC8vIEFsc28gaGlkZSB0aGUgdmlld2VyIHNlbGVjdG9yLlxuICB0aGlzLnZpZXdlclNlbGVjdG9yLmhpZGUoKTtcbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUudXBkYXRlUm90YXRlSW5zdHJ1Y3Rpb25zXyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJvdGF0ZUluc3RydWN0aW9ucy5kaXNhYmxlU2hvd1RlbXBvcmFyaWx5KCk7XG4gIC8vIEluIHBvcnRyYWl0IFZSIG1vZGUsIHRlbGwgdGhlIHVzZXIgdG8gcm90YXRlIHRvIGxhbmRzY2FwZS5cbiAgaWYgKHRoaXMubW9kZSA9PSBNb2Rlcy5WUiAmJiAhVXRpbC5pc0xhbmRzY2FwZU1vZGUoKSAmJiBVdGlsLmlzTW9iaWxlKCkpIHtcbiAgICB0aGlzLnJvdGF0ZUluc3RydWN0aW9ucy5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yb3RhdGVJbnN0cnVjdGlvbnMuaGlkZSgpO1xuICB9XG59O1xuXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLm9uRnVsbHNjcmVlbkNoYW5nZV8gPSBmdW5jdGlvbihlKSB7XG4gIC8vIElmIHdlIGxlYXZlIGZ1bGwtc2NyZWVuLCBnbyBiYWNrIHRvIG5vcm1hbCBtb2RlLlxuICBpZiAoZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgPT09IG51bGwgfHxcbiAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ID09PSBudWxsKSB7XG4gICAgdGhpcy5hbnlNb2RlVG9Ob3JtYWxfKCk7XG4gICAgdGhpcy5zZXRNb2RlXyhNb2Rlcy5OT1JNQUwpO1xuICB9XG59O1xuXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLnJlcXVlc3RQb2ludGVyTG9ja18gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jayA9IGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2sgfHxcbiAgICAgIGNhbnZhcy5tb3pSZXF1ZXN0UG9pbnRlckxvY2sgfHxcbiAgICAgIGNhbnZhcy53ZWJraXRSZXF1ZXN0UG9pbnRlckxvY2s7XG5cbiAgaWYgKGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2spIHtcbiAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gIH1cbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUucmVsZWFzZVBvaW50ZXJMb2NrXyA9IGZ1bmN0aW9uKCkge1xuICBkb2N1bWVudC5leGl0UG9pbnRlckxvY2sgPSBkb2N1bWVudC5leGl0UG9pbnRlckxvY2sgfHxcbiAgICAgIGRvY3VtZW50Lm1vekV4aXRQb2ludGVyTG9jayB8fFxuICAgICAgZG9jdW1lbnQud2Via2l0RXhpdFBvaW50ZXJMb2NrO1xuXG4gIGlmIChkb2N1bWVudC5leGl0UG9pbnRlckxvY2spIHtcbiAgICBkb2N1bWVudC5leGl0UG9pbnRlckxvY2soKTtcbiAgfVxufTtcblxuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5yZXF1ZXN0T3JpZW50YXRpb25Mb2NrXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoc2NyZWVuLm9yaWVudGF0aW9uICYmIFV0aWwuaXNNb2JpbGUoKSkge1xuICAgIHNjcmVlbi5vcmllbnRhdGlvbi5sb2NrKCdsYW5kc2NhcGUnKTtcbiAgfVxufTtcblxuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5yZWxlYXNlT3JpZW50YXRpb25Mb2NrXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoc2NyZWVuLm9yaWVudGF0aW9uKSB7XG4gICAgc2NyZWVuLm9yaWVudGF0aW9uLnVubG9jaygpO1xuICB9XG59O1xuXG5XZWJWUk1hbmFnZXIucHJvdG90eXBlLnJlcXVlc3RGdWxsc2NyZWVuXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FudmFzID0gZG9jdW1lbnQuYm9keTtcbiAgLy92YXIgY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuICBpZiAoY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZiAoY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKHt2ckRpc3BsYXk6IHRoaXMuaG1kfSk7XG4gIH0gZWxzZSBpZiAoY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKHt2ckRpc3BsYXk6IHRoaXMuaG1kfSk7XG4gIH1cbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUuZXhpdEZ1bGxzY3JlZW5fID0gZnVuY3Rpb24oKSB7XG4gIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gIH1cbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUub25WaWV3ZXJDaGFuZ2VkXyA9IGZ1bmN0aW9uKHZpZXdlcikge1xuICB0aGlzLmRldmljZUluZm8uc2V0Vmlld2VyKHZpZXdlcik7XG5cbiAgLy8gVXBkYXRlIHRoZSBkaXN0b3J0aW9uIGFwcHJvcHJpYXRlbHkuXG4gIHRoaXMuZGlzdG9ydGVyLnVwZGF0ZURldmljZUluZm8odGhpcy5kZXZpY2VJbmZvKTtcblxuICAvLyBBbmQgdXBkYXRlIHRoZSBITURWUkRldmljZSBwYXJhbWV0ZXJzLlxuICB0aGlzLnNldEhNRFZSRGV2aWNlUGFyYW1zXyh2aWV3ZXIpO1xuXG4gIC8vIE5vdGlmeSBhbnlvbmUgaW50ZXJlc3RlZCBpbiB0aGlzIGV2ZW50LlxuICB0aGlzLmVtaXQoJ3ZpZXdlcmNoYW5nZScsIHZpZXdlcik7XG59O1xuXG4vKipcbiAqIFNldHMgcGFyYW1ldGVycyBvbiBDYXJkYm9hcmRITURWUkRldmljZS4gVGhlc2UgY2hhbmdlcyBhcmUgdWx0aW1hdGVseSBoYW5kbGVkXG4gKiBieSBWUkVmZmVjdC5cbiAqL1xuV2ViVlJNYW5hZ2VyLnByb3RvdHlwZS5zZXRITURWUkRldmljZVBhcmFtc18gPSBmdW5jdGlvbih2aWV3ZXIpIHtcbiAgdGhpcy5nZXREZXZpY2VCeVR5cGVfKEhNRFZSRGV2aWNlKS50aGVuKGZ1bmN0aW9uKGhtZCkge1xuICAgIGlmICghaG1kKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgY2FuIHNldCBmaWVsZHMgb2YgdmlldywgZG8gdGhhdCBub3cuXG4gICAgaWYgKGhtZC5zZXRGaWVsZE9mVmlldykge1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBvcHRpbWFsIGZpZWxkIG9mIHZpZXcgZm9yIGVhY2ggZXllLlxuICAgICAgaG1kLnNldEZpZWxkT2ZWaWV3KHRoaXMuZGV2aWNlSW5mby5nZXRGaWVsZE9mVmlld0xlZnRFeWUodGhpcy5pc1VuZGlzdG9ydGVkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldmljZUluZm8uZ2V0RmllbGRPZlZpZXdSaWdodEV5ZSh0aGlzLmlzVW5kaXN0b3J0ZWQpKTtcbiAgICB9XG5cbiAgICAvLyBOb3RlOiBzZXRJbnRlcnB1cGlsbGFyeURpc3RhbmNlIGlzIG5vdCBwYXJ0IG9mIHRoZSBXZWJWUiBzdGFuZGFyZC5cbiAgICBpZiAoaG1kLnNldEludGVycHVwaWxsYXJ5RGlzdGFuY2UpIHtcbiAgICAgIGhtZC5zZXRJbnRlcnB1cGlsbGFyeURpc3RhbmNlKHZpZXdlci5pbnRlckxlbnNEaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgaWYgKGhtZC5zZXRSZW5kZXJSZWN0KSB7XG4gICAgICAvLyBUT0RPKHNtdXMpOiBJZiB3ZSBjYW4gc2V0IHRoZSByZW5kZXIgcmVjdCwgZG8gaXQuXG4gICAgICAvL3ZhciByZW5kZXJSZWN0ID0gdGhpcy5kZXZpY2VJbmZvLmdldFVuZGlzdG9ydGVkVmlld3BvcnRMZWZ0RXllKCk7XG4gICAgICAvL2htZC5zZXRSZW5kZXJSZWN0KHJlbmRlclJlY3QsIHJlbmRlclJlY3QpO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcbn07XG5cbldlYlZSTWFuYWdlci5wcm90b3R5cGUub25EZXZpY2VQYXJhbXNVcGRhdGVkXyA9IGZ1bmN0aW9uKG5ld1BhcmFtcykge1xuICBjb25zb2xlLmxvZygnRFBEQiByZXBvcnRlZCB0aGF0IGRldmljZSBwYXJhbXMgd2VyZSB1cGRhdGVkLicpO1xuICB0aGlzLmRldmljZUluZm8udXBkYXRlRGV2aWNlUGFyYW1zKG5ld1BhcmFtcyk7XG4gIHRoaXMuZGlzdG9ydGVyLnVwZGF0ZURldmljZUluZm8odGhpcy5kZXZpY2VJbmZvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXZWJWUk1hbmFnZXI7XG4iXX0=
;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

// Include a performance.now polyfill
(function () {

	if ('performance' in window === false) {
		window.performance = {};
	}

	// IE 8
	Date.now = (Date.now || function () {
		return new Date().getTime();
	});

	if ('now' in window.performance === false) {
		var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart
		                                                                                    : Date.now();

		window.performance.now = function () {
			return Date.now() - offset;
		};
	}

})();

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

		update: function (time) {

			if (_tweens.length === 0) {
				return false;
			}

			var i = 0;

			time = time !== undefined ? time : window.performance.now();

			while (i < _tweens.length) {

				if (_tweens[i].update(time)) {
					i++;
				} else {
					_tweens.splice(i, 1);
				}

			}

			return true;

		}
	};

})();

TWEEN.Tween = function (object) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _valuesStartRepeat = {};
	var _duration = 1000;
	var _repeat = 0;
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

	// Set all starting values present on the target object
	for (var field in object) {
		_valuesStart[field] = parseFloat(object[field], 10);
	}

	this.to = function (properties, duration) {

		if (duration !== undefined) {
			_duration = duration;
		}

		_valuesEnd = properties;

		return this;

	};

	this.start = function (time) {

		TWEEN.add(this);

		_isPlaying = true;

		_onStartCallbackFired = false;

		_startTime = time !== undefined ? time : window.performance.now();
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
			if (_valuesStart[property] === undefined) {
				continue;
			}

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
			_onStopCallback.call(_object);
		}

		this.stopChainedTweens();
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
				_onStartCallback.call(_object);
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

					if (end.startsWith('+') || end.startsWith('-')) {
						end = start + parseFloat(end, 10);
					} else {
						end = parseFloat(end, 10);
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
						_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
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

				_startTime = time + _delayTime;

				return true;

			} else {

				if (_onCompleteCallback !== null) {
					_onCompleteCallback.call(_object);
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

			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}

			return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));

		},

		Out: function (k) {

			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}

			return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);

		},

		InOut: function (k) {

			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}

			if ((k *= 2) < 1) {
				return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
			}

			return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

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
	this.rotateSpeed = 0.15;

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
  	this.momentumScalingFactor = 0.005;

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

	var EPS = 0.000001;

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

	var momentumLeft, momentumUp;
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
			void 0;

		}

	};

	this.momentum = function(){
		
		if(!momentumOn) return;

		if(Math.abs(momentumUp + momentumLeft) < 10e-5){ momentumOn = false; return }

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

			void 0;

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

			void 0;

		}

	};

	this.update = function () {

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

			this.dispatchEvent( changeEvent );

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
		scope.dispatchEvent( startEvent );
		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.noKeys === true || scope.noPan === true ) return;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				scope.pan( 0, scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.BOTTOM:
				scope.pan( 0, - scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.LEFT:
				scope.pan( scope.keyPanSpeed, 0 );
				scope.update();
				break;

			case scope.keys.RIGHT:
				scope.pan( - scope.keyPanSpeed, 0 );
				scope.update();
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

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
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
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;;var GSVPANO = GSVPANO || {};
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
			void 0;
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
				var c = document.createElement('canvas');//c.style.height='200px';document.body.insertBefore(c, document.body.children[0]);
				if( x < ( _wc - 1 ) ) c.width = maxW; else c.width = w - ( maxW * x );
				if( y < ( _hc - 1 ) ) c.height = maxH; else c.height = h - ( maxH * y );
				//console.log( 'New canvas of ' + c.width + 'x' + c.height );
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

};; /** The Bend modifier lets you bend the current selection up to 90 degrees about a single axis,
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

		var InverseP =  new THREE.Matrix3().getInverse( P );
		var newVertices = []; var oldVertices = []; var anglesBetweenOldandNewVertices = [];

		var meshGeometryBoundingBoxMaxx = 0; var meshGeometryBoundingBoxMinx = 0;
		var meshGeometryBoundingBoxMaxy = 0; var meshGeometryBoundingBoxMiny = 0;

		for (var i = 0; i < geometry.vertices.length; i++)  {

			newVertices[i] = new THREE.Vector3(); newVertices[i].copy( geometry.vertices[i] ).applyMatrix3( InverseP );
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
 * @author pchen66
 */

window.PANOLENS = {

	// Placeholder for async bmfont texture loading
	Utils: {
		loadBMFont: function(){},
		textureLoader: function(){}
	}

};
;(function(){

	'use strict';

	PANOLENS.DataIcon = {

		Info: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEzLDlIMTFWN0gxM00xMywxN0gxMVYxMUgxM00xMiwyQTEwLDEwIDAgMCwwIDIsMTJBMTAsMTAgMCAwLDAgMTIsMjJBMTAsMTAgMCAwLDAgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMloiIC8+PC9zdmc+',
		Arrow: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyLDIyQTEwLDEwIDAgMCwxIDIsMTJBMTAsMTAgMCAwLDEgMTIsMkExMCwxMCAwIDAsMSAyMiwxMkExMCwxMCAwIDAsMSAxMiwyMk0xMiw3TDcsMTJIMTBWMTZIMTRWMTJIMTdMMTIsN1oiIC8+PC9zdmc+',
		FullscreenEnter: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik03IDE0SDV2NWg1di0ySDd2LTN6bS0yLTRoMlY3aDNWNUg1djV6bTEyIDdoLTN2Mmg1di01aC0ydjN6TTE0IDV2MmgzdjNoMlY1aC01eiIvPgo8L3N2Zz4=',
		FullscreenLeave: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE0SDE5VjE2SDE2VjE5SDE0VjE0TTUsMTRIMTBWMTlIOFYxNkg1VjE0TTgsNUgxMFYxMEg1VjhIOFY1TTE5LDhWMTBIMTRWNUgxNlY4SDE5WiIgLz48L3N2Zz4=',
		Orbit: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYwIDYwIiBoZWlnaHQ9IjY0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA2MCA2MCIgd2lkdGg9IjY0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGZpbGw9IiNmZmYiPjxnPjxnPjxwb2x5Z29uIHBvaW50cz0iNTYsMjUgNTMuNDM5LDI1IDU2LjY0MSwyOSA1MCwyOSA1MCwzMSA1Ni42MzksMzEgNTMuNDM5LDM1IDU2LDM1IDYwLDI5Ljk5OSAgICAiLz48cG9seWdvbiBwb2ludHM9IjQsMzUgNi41NjEsMzUgMy4zNTksMzEgMTAsMzEgMTAsMjkgMy4zNjEsMjkgNi41NjEsMjUgNCwyNSAwLDMwLjAwMSAgICAiLz48cG9seWdvbiBwb2ludHM9IjM1LDU2IDM1LDUzLjQzOCAzMSw1Ni42NCAzMSw1MCAyOSw1MCAyOSw1Ni42MzkgMjUsNTMuNDM4IDI1LDU2IDMwLjAwMiw2MCAgICAiLz48cG9seWdvbiBwb2ludHM9IjI1LDQgMjUsNi41NjIgMjksMy4zNTkgMjksMTAgMzEsMTAgMzEsMy4zNiAzNSw2LjU2MiAzNSw0IDI5Ljk5OCwwICAgICIvPjxnPjxwYXRoIGQ9Ik0zOC4wOTgsNDAuMTUyQzM3LjkyNCwyOC4xNjIsMzUuOTgyLDIzLDMwLDIzcy03LjkyNCw1LjE2Mi04LjA5OCwxNy4xNTJDMTguOTIsMzcuNzY5LDE3LDM0LjEwNiwxNywzMCAgICAgIGMwLTcuMTY5LDUuODMtMTMsMTMtMTNzMTMsNS44MzEsMTMsMTNDNDMsMzQuMTA2LDQxLjA4LDM3Ljc2OSwzOC4wOTgsNDAuMTUyIE0yOS45OCwzNC45ODhjLTYuMDE2LDAtNS4xMjctNy4zMS01LjEyNy03LjMxICAgICAgczEuMDI3LTIuMzE2LDUuMTI3LTIuMzE2YzQuMTAyLDAsNS4xNywyLjMxNiw1LjE3LDIuMzE2UzM1Ljk5NiwzNC45ODgsMjkuOTgsMzQuOTg4IE0zMCwxNWMtOC4yNzEsMC0xNSw2LjcyOS0xNSwxNSAgICAgIGMwLDguMjcxLDYuNzI5LDE1LDE1LDE1czE1LTYuNzI5LDE1LTE1QzQ1LDIxLjcyOSwzOC4yNzEsMTUsMzAsMTUiLz48L2c+PC9nPjwvZz48L3N2Zz4=', 
		Gyro: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSIxMjAgMTIwIDI2MCAyNjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwMCA1MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOTUuNiwyNjAuMWMxLjksMi43LDUuMSw0LjYsOC42LDQuNmM0LjQsMCw4LjctMy40LDguNy04LjRjMC00LjgtNC04LjUtOS4xLTguNWMtMS45LDAtMy44LDAuNS01LjYsMS4zDQoJCQl2LTUuM2w4LjctMTAuM2gtMTUuNXYtOGgyOC4ydjUuM2wtOC40LDEwLjNjNi40LDIuNSwxMC43LDgsMTAuNywxNWMwLDkuOC03LjcsMTYuNC0xNy4zLDE2LjRjLTUuOCwwLTExLjMtMi42LTE1LjQtNy4yDQoJCQlMMTk1LjYsMjYwLjF6Ii8+DQoJCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNTMuOSwyMjUuNmwtOC43LDE0LjhoMC42YzguOCwwLDE2LjIsNi43LDE2LjIsMTZjMCw5LTcuNSwxNi4zLTE2LjUsMTYuM2MtOC43LDAtMTctNi4yLTE3LTE1LjgNCgkJCWMwLTQuNiwyLjEtOC43LDQuNi0xMi44bDEwLjktMTguNEgyNTMuOXogTTIzNy4xLDI1Ni44YzAsNC40LDMuNyw3LjksOC4yLDcuOWM0LjYsMCw3LjgtMy42LDcuOC04LjFjMC00LjQtMy4zLTguMy04LjMtOC4zDQoJCQljLTEuNywwLTMuMiwwLjMtNSwxLjFDMjM4LjcsMjUxLjIsMjM3LjEsMjUzLjcsMjM3LjEsMjU2Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yODQuNiwyMjVjMTEuOSwwLDE2LjIsMTAuNywxNi4yLDIzLjljMCwxMy4yLTQuNCwyMy45LTE2LjIsMjMuOWMtMTEuOSwwLTE2LjItMTAuNy0xNi4yLTIzLjkNCgkJCUMyNjguMywyMzUuNiwyNzIuNywyMjUsMjg0LjYsMjI1eiBNMjg0LjYsMjMyLjljLTUuNCwwLTcuMyw3LjItNy4zLDE1LjljMCw4LjcsMS45LDE1LjksNy4zLDE1LjljNS40LDAsNy4zLTcuMiw3LjMtMTUuOQ0KCQkJQzI5MS44LDI0MC4xLDI4OS45LDIzMi45LDI4NC42LDIzMi45eiIvPg0KCQk8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzE2LjQsMjIxLjZjNCwwLDcuMywzLjIsNy4zLDcuM2MwLDQtMy4yLDcuMy03LjMsNy4zYy00LDAtNy4zLTMuMi03LjMtNy4zDQoJCQlDMzA5LjEsMjI0LjksMzEyLjMsMjIxLjYsMzE2LjQsMjIxLjZ6IE0zMTYuNCwyMzAuOWMxLjEsMCwyLTAuOSwyLTJjMC0xLjEtMC45LTItMi0yYy0xLjEsMC0yLDAuOS0yLDINCgkJCUMzMTQuNCwyMzAuMSwzMTUuMywyMzAuOSwzMTYuNCwyMzAuOXoiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNTAuNSwzNzYuNWMtNzAsMC0xMjctNTctMTI3LTEyN3M1Ny0xMjcsMTI3LTEyN2MyOC44LDAsNTYsOS40LDc4LjYsMjcuMmwtNy43LDkuOA0KCQkJYy0yMC40LTE2LTQ0LjktMjQuNS03MC44LTI0LjVDMTg3LjMsMTM1LDEzNiwxODYuMywxMzYsMjQ5LjVTMTg3LjMsMzY0LDI1MC41LDM2NGM2My4yLDAsMTE0LjUtNTEuNCwxMTQuNS0xMTQuNQ0KCQkJYzAtMjYuNy05LjQtNTIuNy0yNi41LTczLjNsOS42LThjMTguOSwyMi43LDI5LjQsNTEuNiwyOS40LDgxLjJDMzc3LjUsMzE5LjUsMzIwLjUsMzc2LjUsMjUwLjUsMzc2LjV6Ii8+DQoJCTxwb2x5Z29uIGZpbGw9IiNmZmYiIHBvaW50cz0iMzMxLjgsMTYwLjEgMzM1LjgsMTk4LjggMzY5LjcsMTcyLjYgCQkiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==',
		VideoPlay: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTgsNS4xNFYxOS4xNEwxOSwxMi4xNEw4LDUuMTRaIiAvPjwvc3ZnPg==',
		VideoPause: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE5LjE0SDE4VjUuMTRIMTRNNiwxOS4xNEgxMFY1LjE0SDZWMTkuMTRaIiAvPjwvc3ZnPg==',
		Cardboard: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMjAuNzQgNkgzLjIxQzIuNTUgNiAyIDYuNTcgMiA3LjI4djEwLjQ0YzAgLjcuNTUgMS4yOCAxLjIzIDEuMjhoNC43OWMuNTIgMCAuOTYtLjMzIDEuMTQtLjc5bDEuNC0zLjQ4Yy4yMy0uNTkuNzktMS4wMSAxLjQ0LTEuMDFzMS4yMS40MiAxLjQ1IDEuMDFsMS4zOSAzLjQ4Yy4xOS40Ni42My43OSAxLjExLjc5aDQuNzljLjcxIDAgMS4yNi0uNTcgMS4yNi0xLjI4VjcuMjhjMC0uNy0uNTUtMS4yOC0xLjI2LTEuMjh6TTcuNSAxNC42MmMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTMgMS4xOCAwIDIuMTIuOTYgMi4xMiAyLjEzcy0uOTUgMi4xMi0yLjEyIDIuMTJ6bTkgMGMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTNzMi4xMi45NiAyLjEyIDIuMTMtLjk1IDIuMTItMi4xMiAyLjEyeiIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+Cjwvc3ZnPgo='
	
	};

})();;(function(){
	
	'use strict';

	var loader = new THREE.TextureLoader();
	loader.crossOrigin = '';

	PANOLENS.Utils.TextureLoader = loader;

})();;( function () {

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

		this.loaded = false;

		this.linkedSpots = [];

		this.isChildrenVisible = false;
		
		this.linkingImageURL = undefined;
		this.linkingImageScale = undefined;

		this.geometry = geometry;

		this.material = material;
		this.material.side = THREE.DoubleSide;
		this.material.visible = false;

		this.scale.x *= -1;

		this.orbitRadius = ( geometry.parameter && geometry.parameter.radius ) 
			? geometry.parameter.radius
			: 100;

		this.addEventListener( 'load', this.fadeIn.bind( this ) );

	}

	PANOLENS.Panorama.prototype = Object.create( THREE.Mesh.prototype );

	PANOLENS.Panorama.prototype.constructor = PANOLENS.Panorama;

	PANOLENS.Panorama.prototype.add = function ( object ) {

		var invertedObject;

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		// Counter scale.x = -1 effect
		invertedObject = new THREE.Object3D();
		invertedObject.scale.x = -1;
		invertedObject.add( object );

		// Ignore infospots
		if ( object instanceof PANOLENS.Infospot ) {

			invertedObject = object;

		}

		THREE.Object3D.prototype.add.call( this, invertedObject );

	};

	PANOLENS.Panorama.prototype.load = function () {

		this.onLoad();
		
	};

	PANOLENS.Panorama.prototype.onLoad = function () {

		this.toggleChildrenVisibility( true );

		this.loaded = true;

		this.dispatchEvent( { type: 'load' } );

	};

	PANOLENS.Panorama.prototype.onProgress = function ( progress ) {

		this.dispatchEvent( { type: 'progress', progress: progress } );

	};

	PANOLENS.Panorama.prototype.onError = function () {

		this.dispatchEvent( { type: 'error' } );

	};

	PANOLENS.Panorama.prototype.getZoomLevel = function () {

		var zoomLevel;

		if ( window.innerWidth > 800 && window.innerWidth < 1920 ) {

			zoomLevel = this.ImageQualityHigh;

		} else if ( window.innerWidth >= 1920 ) {

			zoomLevel = this.ImageQualitySuperHigh;

		} else {

			zoomLevel = this.ImageQualityMedium;

		}

		return zoomLevel;

	};

	PANOLENS.Panorama.prototype.updatePanoObjectTexture = function ( texture ) {

		this.material.map = texture;

		this.material.needsUpdate = true;

	};

	PANOLENS.Panorama.prototype.toggleChildrenVisibility = function ( force, delay ) {

		delay = ( delay !== undefined ) ? delay : 0;

		var scope = this, 
			visible = ( force !== undefined ) ? force : ( this.isChildrenVisible ? false : true );

		this.traverse( function ( object ) {

			if ( object instanceof PANOLENS.Infospot ) {

				visible ? object.show( delay ) : object.hide( delay );

			}

		} );

		this.isChildrenVisible = visible;

	};

	PANOLENS.Panorama.prototype.setLinkingImage = function ( url, scale ) {

		this.linkingImageURL = url;
		this.linkingImageScale = scale;

	};

	PANOLENS.Panorama.prototype.link = function ( pano, ended ) {

		var scope = this, spot, raycaster, intersect, point;

		this.visible = true;

		raycaster = new THREE.Raycaster();
		raycaster.set( this.position, pano.position.clone().sub( this.position ).normalize() );
		intersect = raycaster.intersectObject( this );

		if ( intersect.length > 0 ) {

			point = intersect[ intersect.length - 1 ].point.clone().multiplyScalar( 0.99 );

		} else {

			void 0;
			return;

		}

		spot = new PANOLENS.Infospot( 
			pano.linkingImageScale !== undefined ? pano.linkingImageScale : this.defaultInfospotSize, 
			pano.linkingImageURL !== undefined ? pano.linkingImageURL : PANOLENS.DataIcon.Arrow 
		);
        spot.position.copy( point );
        spot.toPanorama = pano;
        spot.addEventListener( 'click', function () {

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

	PANOLENS.Panorama.prototype.fadeIn = function () {

		new TWEEN.Tween( this.material )
		.to( { opacity: 1 }, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.start();

	};

	PANOLENS.Panorama.prototype.fadeOut = function () {

		new TWEEN.Tween( this.material )
		.to( { opacity: 0 }, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.start();

	};

	PANOLENS.Panorama.prototype.onEnter = function () {

		new TWEEN.Tween( this )
		.to( {}, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.onStart( function () {

			this.dispatchEvent( { type: 'enter-start' } );

			if ( this.loaded ) {

				this.fadeIn();
				this.toggleChildrenVisibility( true, this.animationDuration );

			} else {

				this.load();

			}

			this.visible = true;
			this.material.visible = true;
		} )
		.delay( this.animationDuration )
		.start();

		this.dispatchEvent( { type: 'enter' } );

	};

	PANOLENS.Panorama.prototype.onLeave = function () {

		new TWEEN.Tween( this )
		.to( {}, this.animationDuration )
		.easing( TWEEN.Easing.Quartic.Out )
		.onStart( function () {

			this.fadeOut();
			this.toggleChildrenVisibility( false );

		} )
		.onComplete( function () {

			this.visible = false;
			this.material.visible = true;

		} )
		.start();

		this.dispatchEvent( { type: 'leave' } );

	};

} )();;(function(){
	
	/**
	 * Image-based panorama
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

	PANOLENS.ImagePanorama.prototype.load = function ( src ) {

		src = src || this.src;

		if ( !src ) { 

			void 0;

			return; 

		} else if ( typeof src === 'string' ) {

			PANOLENS.Utils.TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

		} else if ( src instanceof HTMLImageElement ) {

			this.onLoad( new THREE.Texture( src ) );

		}

		
	};

	PANOLENS.ImagePanorama.prototype.onLoad = function ( texture ) {

		texture.minFilter = texture.maxFilter = THREE.LinearFilter;

		texture.needsUpdate = true;

		this.updatePanoObjectTexture( texture );

		PANOLENS.Panorama.prototype.onLoad.call( this );
		
	};

	PANOLENS.ImagePanorama.prototype.reset = function () {

		PANOLENS.Panorama.prototype.reset.call( this );

	};

})();;(function(){

	/**
	 * Google streetview (tile-based) panorama
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

	PANOLENS.GoogleStreetviewPanorama.prototype.load = function ( panoId ) {

		panoId = ( panoId || this.panoId ) || {};

		if ( panoId && this.gsvLoader ) {

			this.loadGSVLoader( panoId );

		} else {

			this.gsvLoader = {};

		}

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.setupGoogleMapAPI = function () {

		var script = document.createElement( 'script' );
		script.src = 'https://maps.googleapis.com/maps/api/js';
		script.onreadystatechange = this.setGSVLoader.bind( this );
    	script.onload = this.setGSVLoader.bind( this );

		document.getElementsByTagName('head')[0].appendChild( script );

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.setGSVLoader = function () {

		this.gsvLoader = new GSVPANO.PanoLoader();

		if ( this.gsvLoader === {} ) {

			this.load();

		}

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.getGSVLoader = function () {

		return this.gsvLoader;

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.loadGSVLoader = function ( panoId ) {

		this.gsvLoader.onProgress = this.onProgress.bind( this );

		this.gsvLoader.onPanoramaLoad = this.onLoad.bind( this );

		this.gsvLoader.setZoom( this.getZoomLevel() );

		this.gsvLoader.load( panoId );

		this.gsvLoader.loaded = true;
	};

	PANOLENS.GoogleStreetviewPanorama.prototype.onLoad = function ( canvas ) {

		if ( !this.gsvLoader ) { return; }

		PANOLENS.ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.reset = function () {

		this.gsvLoader = undefined;

		PANOLENS.ImagePanorama.prototype.reset.call( this );

	};

})();;(function(){
	
	/**
	 * Cubemap-based panorama
	 * @constructor
	 * @param {array} images - An array of cubetexture containing six images
	 * @param {number} [edgeLength=10000] - The length of cube's edge
	 */
	PANOLENS.CubePanorama = function ( images, edgeLength ){

		var shader, material;

		edgeLength = edgeLength || 10000;

		shader = JSON.parse(JSON.stringify(THREE.ShaderLib[ "cube" ]));
		shader.uniforms[ "tCube" ].value = new THREE.CubeTextureLoader().load( images );

		material = new THREE.ShaderMaterial( {

			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			side: THREE.BackSide

		} );

		PANOLENS.Panorama.call( this, 
			new THREE.BoxGeometry( edgeLength, edgeLength, edgeLength ), 
			material
		);

		this.orbitRadius = edgeLength / 2;

		this.images = images || [];

	}

	PANOLENS.CubePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.CubePanorama.prototype.constructor = PANOLENS.CubePanorama;

	PANOLENS.CubePanorama.prototype.onLoad = function () {
		
		PANOLENS.Panorama.prototype.onLoad.call( this );

	};

})();;(function(){

	'use strict';

	/**
	 * Basic panorama with 6 faces tile images
	 */
	PANOLENS.BasicPanorama = function () {
		
		var tile = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAtiABQAAACRQTFRFAAAAAAAABgYGBwcHHh4eKysrx8fHy8vLzMzM7OzsAAAABgYG+q7SZgAAAAp0Uk5TAP7+/v7+/v7+/iJx/a8AAAOwSURBVHja7d0hbsNAEAVQo6SFI6XEcALDcgNLvUBvEBQVhpkWVYWlhSsVFS7t5QIshRt695lEASZP+8c7a1kzDL1fz+/zyuvzp6FbvoddrL6uDd1yGZ5eXldeb18N3fIx7A+58prmhm65DfvDcd0952lu6JabFbD/zVprZj1lzcys+fj9z8xTZtbT8rv8yWlu6BYAIgAAAAAAAAAAAABAM6QXEAEAAAAAAAAAgJ2gnaAIiIA3Q2qAGgAAAAAAAAAAAAAAAAAAAAAAAAAAQJsADkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBVlfAcZ3aeZobusUKMGBhV6KUElHGKBERJR6/fxExRkQZl9/lT8S1oVsuhqyYMmPKjCkzvfcCpsxohrwY0Q06EAEAAAAAAAAAAACgGdILiAAAAAAAAAAAwE7QTlAERMCbITVADQAAAAAAAAAAAAAAAAAAAAAAAAAAwKmwQ1ERAAAAAACPQY9BERABERABERABERABERABAAAAAAAAAICdoJ2gCIiAT2bUADVADRABEQAAQBFUBEVABERgEyvAlJm+V4ApM6bMmDJjyowpM6bMdN0LmDKjGfJiRDfoQAQAAAAAAAAAAACAZkgvIAIAAAAAAAAAADtBO0EREAFvhtQANQAAAAAAAAAAAAAAAAAAAAAAAAAAAKfCDkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBTawAU2b6XgGmzJgyY8qMKTOmzJgy03UvYMqMZsiLEd2gAxEAAAAAAAAAAAAAmiG9gAgAAAAAAAAAAOwE7QRFQAS8GVID1AAAAAAAAAAAAAAAAAAAAAAAAAAAAJwKOxQVAQAAAADwGPQYFAEREAEREAEREAEREAERAAAAAAAAAADYCdoJioAI+GRGDVAD1AAREAEAABRBRVAEREAENrECTJnpewWYMmPKjCkzpsyYMmPKTNe9gCkzmiEvRnSDDkQAAAAAAAAAAAAAaIb0AiIAAAAAAAAAALATtBMUARHwZkgNUAMAAAAAAAAAAAAAAAAAAAAAAAAAAHAq7FBUBAAAAADAY9BjUAREQAREQAREQAREQAREAAAAAAAAAABgJ2gnKAIi4JMZNUANUANEQAQAAFAEFUEREAER2MQKMGWm7xVgyowpM50PWen9ugNGXz1XaocAFgAAAABJRU5ErkJggg==';

		PANOLENS.CubePanorama.call( this, [ tile, tile, tile, tile, tile, tile ] );

	}

	PANOLENS.BasicPanorama.prototype = Object.create( PANOLENS.CubePanorama.prototype );

	PANOLENS.BasicPanorama.prototype.constructor = PANOLENS.BasicPanorama;

})();;(function(){

	/**
	 * @param {string} src - Equirectangular video url
	 * @param {object} [options] - Option for video settings
	 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
	 * @param {HTMLCanvasElement} [options.videoCanvas] - HTML5 canvas element for drawing the video
	 * @param {boolean} [options.muted=false] - Mute the video or not
	 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
	 * @param {number} [radius=5000] - The minimum radius for this panoram
	 */
	PANOLENS.VideoPanorama = function ( src, options, radius ) {

		radius = radius || 5000;

		var geometry = new THREE.SphereGeometry( radius, 60, 40 ),
			material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

		PANOLENS.Panorama.call( this, geometry, material );

		this.src = src;
		this.options = options;

		this.videoElement = undefined;
		this.videoCanvas = undefined;
		this.videoRenderObject = undefined;

		this.videoFramerate = 30;

		this.isIOS = /iPhone|iPad|iPod/i.test( navigator.userAgent );

		this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.addEventListener( 'leave', this.resetVideo.bind( this ) );
		this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	}

	PANOLENS.VideoPanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.VideoPanorama.constructor = PANOLENS.VideoPanorama;

	PANOLENS.VideoPanorama.prototype.load = function ( src, options ) {

		var scope = this;

		src = ( src || this.src ) || '';
		options = ( options || this.options ) || {};

		this.videoElement = options.videoElement || document.createElement( 'video' );
		this.videoCanvas = options.videoCanvas || document.createElement( 'canvas' );
		
		this.videoElement.muted = options.muted || false;
		this.videoElement.loop = ( options.loop !== undefined ) ? options.loop : true;
		this.videoElement.src =  src;
		this.videoElement.load();

		this.videoElement.onloadeddata = function(){

			scope.setVideoTexture( scope.videoElement, scope.videoCanvas );

			scope.onLoad();

		}

		this.videoElement.ontimeupdate = function ( event ) {

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: this.currentTime / this.duration } );

		};

	};

	PANOLENS.VideoPanorama.prototype.setVideoTexture = function ( video, canvas ) {

		var videoTexture, videoRenderObject, videoContext, scene, updateCallback;

		if ( !video || !canvas ) return;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		videoContext = canvas.getContext('2d');

		videoTexture = new THREE.Texture( canvas );
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.maxFilter = THREE.LinearFilter;

		videoRenderObject = {

			video : video,
			videoContext : videoContext,
			videoTexture: videoTexture,
			target : this

		};

		if ( this.isIOS ){
			
			videoRenderObject.fps = this.videoFramerate;
			videoRenderObject.lastTime = Date.now();
			videoRenderObject.video.pano_paused = true;
			videoRenderObject.video.play = function(){

				videoRenderObject.lastTime = Date.now();
				this.pano_paused = false;

			};
			videoRenderObject.video.pause = function(){

				this.pano_paused = true;

			};
			updateCallback = function () {

				if ( this.video.pano_paused ) { return; }

				var time = Date.now();
			    var elapsed = ( time - this.lastTime ) / 1000;

			    if ( this.video && elapsed >= ( ( 1000 / this.fps ) / 1000 ) ) {
			    	if ( this.video.currentTime + elapsed >= this.video.duration ) {
			    		this.video.currentTime = 0;
			    	} else {
			    		this.video.currentTime = this.video.currentTime + elapsed;
			    	}
			        this.videoContext.drawImage( this.video, 0, 0, this.video.videoWidth, this.video.videoHeight );
		        	this.videoTexture.needsUpdate = true;
			        this.lastTime = time;
			    }

			};

		} else {

			updateCallback = function () {

				if ( this.video.readyState === this.video.HAVE_ENOUGH_DATA ) {

					this.videoContext.drawImage( this.video, 0, 0 );

					if ( this.videoTexture ) {

						this.videoTexture.needsUpdate = true;

					}

				}

			};

		}

		this.updatePanoObjectTexture( videoTexture );

		this.videoRenderObject = videoRenderObject;

		// Notify Viewer to render object
		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'addUpdateCallback', data: updateCallback.bind( videoRenderObject ) } );
		
	};

	PANOLENS.VideoPanorama.prototype.reset = function () {

		this.videoElement = undefined;

		this.videoCanvas = undefined;	

		PANOLENS.Panorama.prototype.reset.call( this );

	};

	PANOLENS.VideoPanorama.prototype.isVideoPaused = function () {

		return ( this.isIOS ) 
			? this.videoRenderObject.video.pano_paused 
			: this.videoRenderObject.video.paused;

	};

	PANOLENS.VideoPanorama.prototype.toggleVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			if ( this.isVideoPaused() ) {

				this.videoRenderObject.video.play();

			} else {

				this.videoRenderObject.video.pause();

			}

		}

	};

	PANOLENS.VideoPanorama.prototype.setVideoCurrentTime = function ( event ) {

		if ( this.videoRenderObject && this.videoRenderObject.video && event.percentage !== 1 ) {

			this.videoRenderObject.video.currentTime = this.videoRenderObject.video.duration * event.percentage;

		}

	};

	PANOLENS.VideoPanorama.prototype.playVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && this.isVideoPaused() ) {

			this.videoRenderObject.video.play();

		}

	};

	PANOLENS.VideoPanorama.prototype.pauseVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && !this.isVideoPaused() ) {

			this.videoRenderObject.video.pause();

		}

	};

	PANOLENS.VideoPanorama.prototype.resetVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			this.setVideoCurrentTime( { percentage: 0 } );

		}

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

		this.entity = undefined;

		this.animationDuration = 500;
		this.animationFadeOut = undefined;
		this.animationFadeIn = undefined;
		this.animationTranslation = undefined;
		this.tweens = {};

		if ( forceAngle !== 0 ) {

			this.bend( forceDirection, forceAxis, forceAngle );

		}
		
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

	PANOLENS.Tile.prototype.setEntity = function ( entity ) {

		this.entity = entity;

	};

	/**
	 * Bend panel with direction, axis, and angle
	 * @param  {THREE.Vector3} direction - Force direction
	 * @param  {THREE.Vector3} axis - Along this axis
	 * @param  {number} angle - Angle to bend in radians
	 */
	PANOLENS.Tile.prototype.bend = function ( direction, axis, angle ) {

		var modifier = new THREE.BendModifier();

		modifier.set( direction, axis, angle ).modify( this.geometry );

	};

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

    PANOLENS.Tile.prototype.tweenTranslation = function ( position, duration, easing ) {

    	position = position || {};
    	duration = duration || 200;
    	easing = easing || TWEEN.Easing.Cubic.Out;

    	if ( this.animationTranslation ) {
    		this.animationTranslation.stop();
    	}

    	this.animationTranslation = new TWEEN.Tween( this.position )
        .to( position, duration )
        .easing( easing )
        .start();

    };

} )();;(function(){
	
	'use strict';

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

	PANOLENS.TileGroup.prototype.setTexture = function ( texture ) {

        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        this.material.visible = true;
        this.material.map = texture;
        this.material.needsUpdate = true;

    };

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

    PANOLENS.TileGroup.prototype.getIndex = function () {

    	return this.offset;

    };

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

	PANOLENS.SpriteText.prototype.setBMFont = function ( callback, font, texture ) {

		texture.needsUpdate = true;
	  	texture.minFilter = THREE.LinearMipMapLinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.generateMipmaps = true;
		texture.anisotropy = 16;

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

	PANOLENS.SpriteText.prototype.update = function ( options ) {

		var mesh;

		options = options || {};

		mesh = this.mesh;

		mesh.geometry.update( options );
		mesh.position.x = -mesh.geometry.layout.width / 2;
		mesh.position.y = mesh.geometry.layout.height * 1.035;

	};

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

	PANOLENS.SpriteText.prototype.setEntity = function ( entity ) {

		this.entity = entity;

	};

	PANOLENS.SpriteText.prototype.getLayout = function () {

		return this.mesh && this.mesh.geometry && this.mesh.geometry.layout || {};

	};

})();;(function () {
	
	/**
	 * Widget for controls
	 * @constructor
	 * @param {HTMLElement} container - A domElement where default control widget will be attached to
	 */
	PANOLENS.Widget = function ( container ) {

		THREE.EventDispatcher.call( this );

		this.container = container;

	}

	PANOLENS.Widget.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Widget.prototype.constructor = PANOLENS.Widget;

	PANOLENS.Widget.prototype.addDefaultControlBar = function () {

		if ( !this.container ) {

			void 0; 
			return; 
		}

		var scope = this, bar;

		bar = document.createElement( 'div' );
		bar.style.width = '100%';
		bar.style.height = '44px';
		bar.style.position = 'fixed';
		bar.style.bottom = '0';
		bar.style.background = 'rgba( 0, 0, 0, 0.3 )';
		bar.style.transition = 'all 0.5s ease';
		bar.toggle = function () {

			bar.style.transform = ( bar.style.transform !== 'translateY(100%)' ) ? 'translateY(100%)' : 'translateY(0)';

		};

		// Add Control Items
		bar.appendChild( this.createFullscreenButton() );
		bar.appendChild( this.createCameraControlButton() );
		bar.appendChild( this.createVRButton() );
		bar.appendChild( this.createVideoControl() );

		this.container.appendChild( bar );

		// Event listener
		this.addEventListener( 'control-bar-toggle', bar.toggle );

		return bar;

	};

	PANOLENS.Widget.prototype.createVRButton = function () {

		var scope = this, item;

		function onTap () {

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVR' } );

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataIcon.Cardboard + '")' 

			},

			onTap : onTap

		} );

		return item;

	}

	PANOLENS.Widget.prototype.createFullscreenButton = function () {

		var scope = this, item;

		function onTap () {

			var fullscreenElement;

			if (!document.fullscreenElement &&
			    !document.mozFullScreenElement &&
			    !document.webkitFullscreenElement &&
			    !document.msFullscreenElement ) {
			  if (document.documentElement.requestFullscreen) {
			    document.documentElement.requestFullscreen();
			  } else if (document.documentElement.msRequestFullscreen) {
			    document.documentElement.msRequestFullscreen();
			  } else if (document.documentElement.mozRequestFullScreen) {
			    document.documentElement.mozRequestFullScreen();
			  } else if (document.documentElement.webkitRequestFullscreen) {
			    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			  }
			} else {
			  if (document.exitFullscreen) {
			    document.exitFullscreen();
			  } else if (document.msExitFullscreen) {
			    document.msExitFullscreen();
			  } else if (document.mozCancelFullScreen) {
			    document.mozCancelFullScreen();
			  } else if (document.webkitExitFullscreen) {
			    document.webkitExitFullscreen();
			  }
			}

			fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

			this.style.backgroundImage = ( fullscreenElement !== null ) 
				? 'url("' + PANOLENS.DataIcon.FullscreenLeave + '")' 
				: 'url("' + PANOLENS.DataIcon.FullscreenEnter + '")';

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataIcon.FullscreenEnter + '")' 

			},

			onTap : onTap

		} );

		return item;

	};

	PANOLENS.Widget.prototype.createCameraControlButton = function () {

		var scope = this, item;

		function onTap(){

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleNextControl' } );

			this.controlName = ( this.controlName === 'orbit' ) ? 'device-orientation' : 'orbit';

			this.style.backgroundImage = 'url("' + ( this.controlName === 'orbit' 
				? PANOLENS.DataIcon.Gyro 
				: PANOLENS.DataIcon.Orbit ) + '")';

		}

		item = this.createCustomItem( {

			style: {

				backgroundImage: 'url("' + PANOLENS.DataIcon.Gyro + '")'

			},

			onTap : onTap

		} );

		item.controlName = 'orbit';

		return item;

	};

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

		this.addEventListener( 'video-control-show', item.show );
		this.addEventListener( 'video-control-hide', item.hide )

		return item;

	};

	PANOLENS.Widget.prototype.createVideoControlButton = function () {

		var scope = this, item;

		function onTap () {

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay' } );

			this.paused = !this.paused;

			item.update();

		};

		item = this.createCustomItem( { 

			style : { 

				float : 'left',
				backgroundImage : 'url("' + PANOLENS.DataIcon.VideoPlay + '")'

			},

			onTap : onTap

		} );

		item.paused = true;

		item.update = function () {

			this.style.backgroundImage = 'url("' + ( this.paused 
				? PANOLENS.DataIcon.VideoPlay 
				: PANOLENS.DataIcon.VideoPause ) + '")';

		};

		return item;

	};

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

			scope.container.addEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.addEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.addEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.addEventListener( 'touchend', onVideoControlStop, false );

		}

		function onVideoControlDrag ( event ) {

			var clientX;

			if( isDragging ){

				clientX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );
				
				percentageNext = ( clientX - mouseX ) / item.clientWidth;

				percentageNext = percentageNow + percentageNext;

				percentageNext = percentageNext > 1 ? 1 : ( ( percentageNext < 0 ) ? 0 : percentageNext );

				item.setProgress ( percentageNext );

				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentageNext } );

			}

		}

		function onVideoControlStop ( event ) {

			event.stopPropagation();

			isDragging = false;

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

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentage } );

			item.setProgress( event.offsetX / this.clientWidth );

		};

		progressElement.appendChild( progressElementControl );

		item = this.createCustomItem( {

			style : { 

				float : 'left',
				width : '30%',
				height : '4px',
				marginTop : '20px',
				backgroundColor : 'rgba(188,188,188,0.8)'

			},

			onTap : onTap

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

	PANOLENS.Widget.prototype.createCustomItem = function ( options ) {

		options = options || {};

		var item = options.element || document.createElement( 'span' );

		item.style.cursor = 'pointer';
		item.style.float = 'right';
		item.style.width = '44px';
		item.style.height = '100%';
		item.style.backgroundSize = '60%';
		item.style.backgroundRepeat = 'no-repeat';
		item.style.backgroundPosition = 'center';

		item.addEventListener('mouseenter', function(e) {
			item.style.filter = item.style.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
		});
		item.addEventListener('mouseleave', function(e) {
			item.style.filter = item.style.webkitFilter = '';
		});

		item = this.mergeStyleOptions( item, options.style );

		if ( options.onTap ) {
			[ 'click', 'touchend' ].forEach( function( event ) {
				item.addEventListener( event, options.onTap, false );
			} );
		}
		
		return item;

	};

	PANOLENS.Widget.prototype.mergeStyleOptions = function ( element, options ) {

		options = options || {};

		for ( var property in options ){

			if ( options.hasOwnProperty( property ) && element.style.hasOwnProperty( property ) ) {

				element.style[ property ] = options[ property ];

			}

		}

		return element;

	};

})();;( function () {

	/**
	 * Information spot attached to panorama
	 * @constructor
	 * @param {number} [scale=1] - Infospot scale
	 * @param {imageSrc} [imageSrc=PANOLENS.DataIcon.Info] - Image overlay info
	 */
	PANOLENS.Infospot = function ( scale, imageSrc ) {
		
		var scope = this, ratio;

		THREE.Sprite.call( this );

		this.type = 'infospot';

		this.isHovering = false;
		this.element;
		this.toPanorama;

		this.container = document.body;

		// Default is not visible until panorama is loaded
		this.visible = false;

		scale = scale || 1;
		imageSrc = imageSrc || PANOLENS.DataIcon.Info;

		this.scale.set( scale, scale, 1 );

		PANOLENS.Utils.TextureLoader.load( imageSrc, postLoad );		

		function postLoad ( texture ) {

			texture.minFilter = texture.maxFilter = THREE.LinearFilter;

			texture.wrapS = THREE.RepeatWrapping;

			texture.repeat.x = -1;

			scope.material.map = texture;
			scope.material.depthWrite = false;
			scope.material.depthTest = false;

			ratio = texture.image.width / texture.image.height;

			scope.scale.set( ratio * scale, scale, 1 );

			scope.hoverStartScale = scope.scale.clone();
			scope.hoverEndScale = scope.scale.clone().multiplyScalar( 1.3 );
			scope.hoverEndScale.z = 1;

			scope.scaleUpAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: scope.hoverEndScale.x, y: scope.hoverEndScale.y }, 500 )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.scaleDownAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: scope.hoverStartScale.x, y: scope.hoverStartScale.y }, 500 )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.showAnimation = new TWEEN.Tween( scope.material )
				.to( { opacity: 1 }, scope.animationDuration )
				.onStart( function () { scope.visible = true; } )
				.easing( TWEEN.Easing.Quartic.Out );

			scope.hideAnimation = new TWEEN.Tween( scope.material )
				.to( { opacity: 0 }, scope.animationDuration )
				.onComplete( function () { scope.visible = false; } )
				.easing( TWEEN.Easing.Quartic.Out );

		}

	}

	PANOLENS.Infospot.prototype = Object.create( THREE.Sprite.prototype );

	PANOLENS.Infospot.prototype.onClick = function () {

		if ( this.element ) {

			this.lockHoverElement();

		}

		this.dispatchEvent( { type: 'click' } );

	};

	PANOLENS.Infospot.prototype.onHover = function ( x, y ) {

		if ( !this.isHovering ) {

			this.onHoverStart();
			this.isHovering = true;

		}

		if ( !this.element || this.element.locked ) { return; }

		var left, top;

		left = x - this.element.clientWidth / 2;
		top = y - this.element.clientHeight - 30;

		this.element.style.webkitTransform =
		this.element.style.msTransform =
		this.element.style.transform = 'translate(' + left + 'px, ' + top + 'px)';

	};

	PANOLENS.Infospot.prototype.onHoverStart = function() {

		if ( !this.hoverEndScale.equals( this.scale ) ) {

			this.scaleDownAnimation.stop();
			this.scaleUpAnimation.start();

		}

		if ( this.element && this.element.style.display === 'none' ) {

			this.element.style.display = 'block';

		}

	};

	PANOLENS.Infospot.prototype.onHoverEnd = function() {

		this.isHovering = false;
		
		if ( !this.hoverStartScale.equals( this.scale ) ) {

			this.scaleUpAnimation.stop();
			this.scaleDownAnimation.start();

		}

		if ( this.element && this.element.style.display !== 'none' ) {

			this.element.style.display = 'none';
			this.unlockHoverElement();

		}

	};

	PANOLENS.Infospot.prototype.setText = function ( text ) {

		if ( this.element ) {

			this.element.textContent = text;

		}

	};

	PANOLENS.Infospot.prototype.addHoverText = function ( text ) {

		if ( !this.element ) {

			this.element = document.createElement( 'div' );

			this.element.style.color = '#fff';
			this.element.style.top = 0;
			this.element.style.maxWidth = '50%';
			this.element.style.maxHeight = '50%';
			this.element.style.textShadow = '0 0 3px #000000';
			this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
			this.element.style.position = 'absolute';
			this.element.style.display = 'none';

			this.container.appendChild( this.element );

		}

		this.setText( text );

	};

	PANOLENS.Infospot.prototype.addHoverElement = function ( el ) {

		if ( !this.element ) { 

			this.element = el.cloneNode( true );
			this.element.style.top = 0;
			this.element.style.position = 'absolute';
			this.element.style.display = 'none';

			this.container.appendChild( this.element );

		}

	};

	PANOLENS.Infospot.prototype.removeHoverElement = function () {

		if ( this.element ) { 

			this.container.removeChild( this.element );

			this.element = undefined;

		}

	};

	PANOLENS.Infospot.prototype.lockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = true;

		}

	};

	PANOLENS.Infospot.prototype.unlockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = false;

		}

	};

	PANOLENS.Infospot.prototype.show = function ( delay ) {

		delay = delay || 0;

		this.hideAnimation.stop();
		this.showAnimation.delay( delay ).start();

	};

	PANOLENS.Infospot.prototype.hide = function ( delay ) {

		delay = delay || 0;

		this.showAnimation.stop();
		this.hideAnimation.delay( delay ).start();
		
	};

} )();( function () {

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
	 * @param {boolean} [options.autoHideControlBar=false] - Auto hide control bar when click on non-active area
	 * @param {boolean} [options.autoHideInfospot=false] - Auto hide infospots when click on non-active area
	 * @param {boolean} [options.horizontalView=false] - Allow only horizontal camera control
	 * @param {object}  [options.WebVRConfig] - WebVR configuration
	 */
	PANOLENS.Viewer = function ( options ) {

		THREE.EventDispatcher.call( this );
		
		if ( !THREE ) {

			void 0;

			return;
		}

		options = options || {};
		options.controlBar = options.controlBar !== undefined ? options.controlBar : true;
		options.autoHideControlBar = options.autoHideControlBar !== undefined ? options.autoHideControlBar : false;
		options.autoHideInfospot = options.autoHideInfospot !== undefined ? options.autoHideInfospot : true;
		options.horizontalView = options.horizontalView !== undefined ? options.horizontalView : false;
		options.WebVRConfig = options.WebVRConfig || { FORCE_ENABLE_VR: true, FORCE_DISTORTION: true };
		options.clickTolerance = options.clickTolerance || 10;

		// WebVR Configuration
		if ( options.WebVRConfig ) {
			
			for ( var config in options.WebVRConfig ) {

				if ( options.WebVRConfig.hasOwnProperty( config ) ) {

					window.WebVRConfig[ config ] = options.WebVRConfig[ config ];

				}

			}

		}
		
		this.options = options;

		this.camera = options.camera || new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		this.scene = options.scene || new THREE.Scene();
		this.renderer = options.renderer || new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		this.VREffect;
		this.VRManager;
		this.container;

		this.OrbitControls;
		this.DeviceOrientationControls;
		this.VRControls;

		this.controls;
		this.panorama;
		this.widget;
		
		this.hoverObject;
		this.hoveringObject;
		this.pressEntityObject;
		this.pressObject;

		this.raycaster = new THREE.Raycaster();
		this.userMouse = new THREE.Vector2();
		this.updateCallbacks = [];
		this.DEBUG = false;

		// Renderer
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		// Container
		if ( options.container ) {

			this.container = options.container;

		} else {

			this.container = document.createElement('div');
			document.body.appendChild( this.container );

		}

		// Append Renderer Element to container
		this.renderer.domElement.classList.add( 'panolens-canvas' );
		this.container.appendChild( this.renderer.domElement );

		// Camera Controls
		this.OrbitControls = new THREE.OrbitControls( this.camera, this.container );
		this.OrbitControls.name = 'orbit';
		this.OrbitControls.minDistance = 1;
		this.OrbitControls.noPan = true;
		this.DeviceOrientationControls = new THREE.DeviceOrientationControls( this.camera );
		this.DeviceOrientationControls.name = 'device-orientation';
		this.VRControls = new THREE.VRControls( this.camera );

        // Apply VR stereo rendering to renderer.
        this.VREffect = new THREE.VREffect( this.renderer );
        this.VREffect.setSize( window.innerWidth, window.innerHeight );

        this.VRManager = new WebVRManager( this.renderer, this.VREffect, { 
            hideButton: true, isUndistorted: false } );

		this.controls = [ this.OrbitControls, this.DeviceOrientationControls ];
		this.control = this.OrbitControls;
		
		// Lock horizontal view
		if ( this.options.horizontalView ) {
			this.OrbitControls.minPolarAngle = Math.PI / 2;
			this.OrbitControls.maxPolarAngle = Math.PI / 2;
		}

		// Add Control UI
		if ( this.options.controlBar !== false ) {
			this.addDefaultControlBar();
		}
		
		// Mouse / Touch Event
		this.container.addEventListener( 'mousedown', this.onMouseDown.bind( this ), true );
		this.container.addEventListener( 'mousemove', this.onMouseMove.bind( this ), true );
		this.container.addEventListener( 'mouseup', this.onMouseUp.bind( this ), true );
		this.container.addEventListener( 'touchstart', this.onMouseDown.bind( this ), true );
		this.container.addEventListener( 'touchend', this.onMouseUp.bind( this ), true );

		// Resize Event
		window.addEventListener( 'resize', this.onWindowResize.bind( this ), true );

		// Keyboard Event
		window.addEventListener( 'keydown', this.onKeyDown.bind( this ), true );
		window.addEventListener( 'keyup', this.onKeyUp.bind( this ), true );

		// Animate
		this.animate.call( this );

	}

	PANOLENS.Viewer.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Viewer.prototype.constructor = PANOLENS.Viewer;

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

		if ( object.type === 'panorama' ) {

			this.addPanoramaEventListener( object );

			if ( !this.panorama ) {

				this.setPanorama( object );

			}

		}

	};

	PANOLENS.Viewer.prototype.addDefaultControlBar = function () {

		if ( this.widget ) {

			void 0;
			return;

		}

		this.widget = new PANOLENS.Widget( this.container );
		this.widget.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );
		this.widget.addDefaultControlBar();

	};

	PANOLENS.Viewer.prototype.setPanorama = function ( pano ) {

		if ( pano.type === 'panorama' ) {
			
			// Reset Current Panorama
			this.panorama && this.panorama.onLeave();

			// Assign and enter panorama
			(this.panorama = pano).onEnter();
			
		}

	};

	PANOLENS.Viewer.prototype.eventHandler = function ( event ) {

		if ( event.method && this[ event.method ] ) {

			this[ event.method ]( event.data );

		}

	};

	PANOLENS.Viewer.prototype.toggleVR = function () {

		if ( this.VRManager ) {
			if ( this.VRManager.mode !== WebVRManager.Modes.VR ) {
				this.VRManager.onVRClick_();
			} else {
				this.VRManager.onBackClick_();
			}
		}

	};

	PANOLENS.Viewer.prototype.toggleVideoPlay = function () {

		if ( this.panorama instanceof PANOLENS.VideoPanorama ) {

			this.panorama.dispatchEvent( { type: 'video-toggle' } );

		}

	};

	PANOLENS.Viewer.prototype.setVideoCurrentTime = function ( percentage ) {

		if ( this.panorama instanceof PANOLENS.VideoPanorama ) {

			this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

		}

	};

	PANOLENS.Viewer.prototype.onVideoUpdate = function ( percentage ) {

		this.widget && this.widget.dispatchEvent( { type: 'video-update', percentage: percentage } );

	};

	PANOLENS.Viewer.prototype.addUpdateCallback = function ( fn ) {

		if ( fn ) {

			this.updateCallbacks.push( fn );

		}

	};

	PANOLENS.Viewer.prototype.removeUpdateCallback = function ( fn ) {

		var index = this.updateCallbacks.indexOf( fn );

		if ( fn && index >= 0 ) {

			this.updateCallbacks.splice( index, 1 );

		}

	};

	PANOLENS.Viewer.prototype.showVideoWidget = function () {

		this.widget && this.widget.dispatchEvent( { type: 'video-control-show' } );

	};

	PANOLENS.Viewer.prototype.hideVideoWidget = function () {

		this.widget && this.widget.dispatchEvent( { type: 'video-control-hide' } );

	};

	PANOLENS.Viewer.prototype.addPanoramaEventListener = function ( pano ) {

		// Every panorama
		pano.addEventListener( 'enter-start', this.setCameraControl.bind( this ) );

		// VideoPanorama
		if ( pano instanceof PANOLENS.VideoPanorama ) {

			pano.addEventListener( 'enter', this.showVideoWidget.bind( this ) );
			pano.addEventListener( 'leave', this.hideVideoWidget.bind( this ) );

		}


	};

	PANOLENS.Viewer.prototype.setCameraControl = function () {

		this.camera.position.copy( this.panorama.position );
		this.camera.position.z += 1;
		this.OrbitControls.target.copy( this.panorama.position );

	};

	PANOLENS.Viewer.prototype.getControl = function () {

		return this.control;

	},

	PANOLENS.Viewer.prototype.getScene = function () {

		return this.scene;

	};

	PANOLENS.Viewer.prototype.getCamera = function () {

		return this.camera;

	},

	PANOLENS.Viewer.prototype.getRenderer = function () {

		return this.renderer;

	};

	PANOLENS.Viewer.prototype.getContainer = function () {

		return this.container;

	};

	PANOLENS.Viewer.prototype.getControlName = function () {

		return this.control.name;

	};

	PANOLENS.Viewer.prototype.getNextControlName = function () {

		return this.controls[ this.getNextControlIndex() ].name;

	};

	PANOLENS.Viewer.prototype.getNextControlIndex = function () {

		return ( this.controls.indexOf( this.control ) + 1 >= this.controls.length ) ? 0 : this.controls.indexOf( this.control ) + 1;

	};

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

	};

	PANOLENS.Viewer.prototype.toggleNextControl = function () {

		this.enableControl( this.getNextControlIndex() );

	};

	PANOLENS.Viewer.prototype.onWindowResize = function () {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.dispatchEvent( { type: 'window-resize', width: window.innerWidth, height: window.innerHeight })
	};

	PANOLENS.Viewer.prototype.render = function () {

		TWEEN.update();
		this.updateCallbacks.forEach( function( callback ){ callback(); } );
		this.control && this.control.update();
		this.VRManager && this.VRControls && this.VRManager.Mode === WebVRManager.Modes.VR && this.VRControls.update(); 
		this.VRManager.render( this.scene, this.camera );

	};

	PANOLENS.Viewer.prototype.onMouseDown = function ( event ) {

		event.preventDefault();

		this.userMouse.x = ( event.clientX ) ? event.clientX : event.touches[0].clientX;
		this.userMouse.y = ( event.clientY ) ? event.clientY : event.touches[0].clientY;
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

			this.options.autoHideInfospot && this.panorama && this.panorama.toggleChildrenVisibility();
			this.options.autoHideControlBar && toggleControlBar();

		}

	};

	PANOLENS.Viewer.prototype.onTap = function ( event, type ) {

		var point = {}, object, intersects, intersect_entity, intersect;

		point.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		point.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		this.raycaster.setFromCamera( point, this.camera );

		if ( !this.panorama ) { return; }

		// For Adding Infospot
		if ( this.DEBUG ) {

			intersects = this.raycaster.intersectObject( this.panorama, true );

			if ( intersects.length > 0 ) {

				intersects[0].point.applyAxisAngle( new THREE.Vector3( -1, 0, 0 ), this.panorama.rotation.x );
				intersects[0].point.applyAxisAngle( new THREE.Vector3( 0, -1, 0 ), this.panorama.rotation.y );
				intersects[0].point.applyAxisAngle( new THREE.Vector3( 0, 0, -1 ), this.panorama.rotation.z );

				intersects[0].point.sub( this.panorama.position );

				void 0;

			}
			
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

				}

				this.hoverObject = undefined;

			}

			if ( intersect_entity && intersects.length > 0 ) {

				if ( this.hoverObject !== intersect_entity ) {

					this.hoverObject = intersect_entity;

					if ( this.hoverObject.dispatchEvent ) {

						this.hoverObject.dispatchEvent( { type: 'hoverenter', mouseEvent: event } );

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

				if ( this.userMouse.type === 'mousemove' ) {

					if ( this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressmove-entity', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousemove' ) {

					if ( this.pressObject && this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressmove', mouseEvent: event } );

					}

				}

			}

		}

		if ( intersects.length > 0 && intersects[ 0 ].object instanceof PANOLENS.Infospot ) {

			object = intersects[ 0 ].object;

			if ( object.onHover ) {

				this.hoveringObject = object;

				this.container.style.cursor = 'pointer';

				object.onHover( event.clientX, event.clientY );

			}

			if ( type === 'click' && object.onClick ) {

				object.onClick();

				return true;

			}

		} else {

			this.container.style.cursor = 'default';

			this.hideHoveringObject();

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

	PANOLENS.Viewer.prototype.hideHoveringObject = function ( intersects ) {

		if ( this.hoveringObject ) {

			this.hoveringObject.onHoverEnd();

			this.hoveringObject = undefined;

		}

	};

	PANOLENS.Viewer.prototype.toggleControlBar = function () {

		widget && widget.dispatchEvent( { type: 'control-bar-toggle' } );

	};

	PANOLENS.Viewer.prototype.onKeyDown = function ( event ) {

		if ( event.keyCode === 17 || event.keyIdentifier === 'Control' ) {

			this.DEBUG = true;

		}

	};

	PANOLENS.Viewer.prototype.onKeyUp = function ( event ) {

		this.DEBUG = false;

	};

	PANOLENS.Viewer.prototype.animate = function () {

		window.requestAnimationFrame( this.animate.bind( this ) );

        this.render();

	};

} )();;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
	    void 0
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