import * as THREE from 'three';

/**
 * @classdesc Spherical Controls
 * @constructor
 * @external SphericalControls
 * @param {THREE.Object} object 
 * @param {HTMLElement} domElement 
 */
function SphericalControls ( object, scene, domElement ) {
		
    this.object = object;
    this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.frameId = null;

    this.horizontalDummy = new THREE.Object3D();
    this.verticalDummy = new THREE.Object3D();

    this.horizontalDummy.add(this.verticalDummy);
    this.horizontalDummy.up.set(0, 1, 0);

    this.verticalDummy.add(this.object);
    this.verticalDummy.up.set(1, 0, 0);

    this.object.lookAt(new THREE.Vector3(0,0,1));
    scene.add(this.horizontalDummy);

    this.object.position.set(0,0,0);
    // Set to false to disable this control
    this.enabled = true;

    /*
     * "target" sets the location of focus, where the control orbits around
     * and where it pans with respect to.
     */
    this.target = new THREE.Vector3();

    // center is old, deprecated; use "target" instead
    this.center = this.target;

    /*
     * This option actually enables dollying in and out; left as "zoom" for
     * backwards compatibility
     */
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
    this.rotateSpeed = -0.02;

    this.enableDamping = true;

    // Set to true to disable this control
    this.noPan = true;
    this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    /*
     * How far you can orbit vertically, upper and lower limits.
     * Range is 0 to Math.PI radians.
     */
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // Mouse Momentum
    this.dampingFactor = 0.03;
    this.momentumKeydownFactor = 1;
    this.momentumLimit = 0.04;
    this.publicSphericalDelta = new THREE.Spherical();

    // Touch Momentum
    this.touchMomentumDampingFactor = 0.9;
    this.touchMomentumScalingFactor = -0.004;
    var momentumLeft = 0, momentumUp = 0;
    var eventPrevious;
    var momentumOn = false;

    // Fov
    this.minFov = 30;
    this.maxFov = 120;

    /*
     * How far you can orbit horizontally, upper and lower limits.
     * If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
     */
    this.minAzimuthAngle = - Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to disable use of the keys
    this.noKeys = false;

    // The four arrow keys
    this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

    // Mouse buttons
    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

    /*
     * //////////
     * internals
     */

    var scope = this;

    var MEPS = 10e-5;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();

    var theta = 0;
    var phi = 0;
    var phiDelta = 0;
    var thetaDelta = 0;

    var lastPosition = new THREE.Vector3();
    var lastQuaternion = new THREE.Quaternion();

    var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };
    var INPUT = { MOUSE: 0, TOUCH: 1, KEY: 2, OTHER: 3 };
    var state = STATE.NONE;
    var input = INPUT.MOUSE;

    // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;

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
    };

    this.rotateLeftStatic = function (angle) {

        this.enableDamping = false;
        thetaDelta -= angle;

        scope.horizontalDummy.rotation.y = thetaDelta;
        this.enableDamping = true;

    };

    this.rotateUpStatic = function (angle) {

        this.enableDamping = false;
        phiDelta -= angle;
        
        scope.verticalDummy.rotation.x = phiDelta;
        this.enableDamping = true;

    };

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

    this.dollyIn = function ( dollyScale ) {

        if ( dollyScale === undefined ) {

            dollyScale = getZoomScale();

        }

        if ( scope.object instanceof THREE.OrthographicCamera ) {

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

        if ( scope.object instanceof THREE.OrthographicCamera ) {

            scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
            scope.object.updateProjectionMatrix();
            scope.dispatchEvent( changeEvent );

        } else {

            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

        }

    };

    this.momentum = function () {
        if (input != INPUT.TOUCH) return; // only if touch input
        if (!momentumOn) return; // only if touch event is touchend()

        if (Math.abs(momentumLeft) < MEPS && Math.abs(momentumUp) < MEPS) {

            momentumOn = false;
            return;

        }

        momentumUp *= this.touchMomentumDampingFactor;
        momentumLeft *= this.touchMomentumDampingFactor;

        thetaDelta -= this.touchMomentumScalingFactor * momentumLeft;
        phiDelta -= this.touchMomentumScalingFactor * momentumUp;
    };

    this.centerTo = function (horizontalAngle, verticalAngle) {
        scope.enableDamping = false;
        if(horizontalAngle != 0) scope.horizontalDummy.rotation.y = horizontalAngle;
        if(verticalAngle != 0) scope.verticalDummy.rotation.x = verticalAngle;
        scope.enableDamping = true;
    };

    this.getRotations = function () {
        return {
            h: scope.horizontalDummy.rotation.y,
            v: scope.verticalDummy.rotation.x
        };
    };

    this.update = function () {

        if ( this.autoRotate && state === STATE.NONE ) {

            this.rotateLeft( getAutoRotationAngle() );

        }

        if (this.enableDamping === true && input !== INPUT.TOUCH) {
            thetaDelta = THREE.Math.clamp(thetaDelta, -this.momentumLimit, this.momentumLimit);
            phiDelta = THREE.Math.clamp(phiDelta, -this.momentumLimit, this.momentumLimit);
            scope.publicSphericalDelta.theta = thetaDelta; // for orientation controls
        } else if (input == INPUT.TOUCH) {
            this.momentum();
        }

        theta += thetaDelta;
        phi += phiDelta;

        scope.horizontalDummy.rotation.y += thetaDelta;
        scope.verticalDummy.rotation.x -= phiDelta;
        // this.object.lookAt( this.target );

        if (this.enableDamping === true && input != INPUT.TOUCH) {

            thetaDelta *= (1 - this.dampingFactor);
            phiDelta *= (1 - this.dampingFactor);

        } else {

            thetaDelta = 0;
            phiDelta = 0;

        }

        /*
         * update condition is:
         * min(camera displacement, camera rotation in radians)^2 > EPS
         * using small-angle approximation cos(x/2) = 1 - x^2 / 8
         */
        /*
         * if ( lastPosition.distanceToSquared( this.object.position ) > EPS
         *     || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {
         */

        //     if ( ignoreUpdate !== true ) { this.dispatchEvent( changeEvent ); }

        /*
         *     lastPosition.copy( this.object.position );
         *     lastQuaternion.copy (this.object.quaternion );
         */

        // }

    };

    this.resetMomentum = function () {
        momentumLeft = momentumUp = 0;
    };

    this.reset = function () {

        state = STATE.NONE;
        input = INPUT.MOUSE;
        
        this.target.set( 0, 0, 1 );
        this.object.position.set( 0, 0, 0 );
        this.object.zoom = this.zoom0;

        this.object.updateProjectionMatrix();
        this.dispatchEvent( changeEvent );

        this.update();

    };

    this.getPolarAngle = function () {

        return phi;

    };

    this.getAzimuthalAngle = function () {

        return theta;

    };

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

    }

    function getZoomScale() {

        return Math.pow( 0.95, scope.zoomSpeed );

    }

    function onMouseDown( event ) {

        if ( scope.enabled === false ) return;
        event.preventDefault();

        input = INPUT.MOUSE;

        if ( event.button === scope.mouseButtons.ORBIT ) {
            if ( scope.noRotate === true ) return;

            state = STATE.ROTATE;

            rotateStart.set( event.clientX, event.clientY );

        } else if ( event.button === scope.mouseButtons.ZOOM ) {
            if ( scope.noZoom === true ) return;

            state = STATE.DOLLY;

            dollyStart.set( event.clientX, event.clientY );

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

        input = INPUT.MOUSE;

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if ( state === STATE.ROTATE ) {

            if ( scope.noRotate === true ) return;

            rotateEnd.set( event.clientX, event.clientY );
            rotateDelta.subVectors( rotateEnd, rotateStart );

            if (rotateStart.x == 0 && rotateStart.y == 0) {
                rotateStart.set(rotateEnd.x, rotateEnd.y);
                rotateDelta.subVectors(rotateEnd, rotateStart);
                return;
            }

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight * scope.rotateSpeed); // element.clientWidth?

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

            rotateStart.copy( rotateEnd );

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

        } 

    }

    function onMouseUp( /* event */ ) {

        if ( scope.enabled === false ) return;

        input = INPUT.MOUSE;

        document.removeEventListener( 'mousemove', onMouseMove, false );
        document.removeEventListener( 'mouseup', onMouseUp, false );
        scope.dispatchEvent( endEvent );
        state = STATE.NONE;

    }

    function onMouseWheel( event ) {

        if ( scope.enabled === false || scope.noZoom === true || state !== STATE.NONE ) return;

        event.preventDefault();
        event.stopPropagation();

        input = INPUT.MOUSE;

        var delta = 0;

        if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if ( event.detail !== undefined ) { // Firefox

            delta = - event.detail;

        }

        if ( delta > 0 ) {

            // scope.dollyOut();
            scope.object.fov = ( scope.object.fov < scope.maxFov ) 
                ? scope.object.fov + 1
                : scope.maxFov;
            scope.object.updateProjectionMatrix();

        } else if ( delta < 0 ) {

            // scope.dollyIn();
            scope.object.fov = ( scope.object.fov > scope.minFov ) 
                ? scope.object.fov - 1
                : scope.minFov;
            scope.object.updateProjectionMatrix();

        }

        scope.dispatchEvent( changeEvent );
        scope.dispatchEvent( startEvent );
        scope.dispatchEvent( endEvent );

    }

    function onKeyUp ( event ) {

        input = INPUT.KEY;

        switch ( event.keyCode ) {

        case scope.keys.UP:
            break;

        case scope.keys.BOTTOM:
            break;

        case scope.keys.LEFT:
            break;

        case scope.keys.RIGHT:
            break;

        }

    }

    function onKeyDown( event ) {

        if ( scope.enabled === false || scope.noKeys === true || scope.noRotate === true ) return;

        input = INPUT.KEY;

        switch ( event.keyCode ) {

        case scope.keys.UP:
            scope.rotateUp(scope.rotateSpeed * scope.momentumKeydownFactor);
            break;

        case scope.keys.BOTTOM:
            scope.rotateUp(- scope.rotateSpeed * scope.momentumKeydownFactor);
            break;

        case scope.keys.LEFT:
            scope.rotateLeft(scope.rotateSpeed * scope.momentumKeydownFactor);
            break;

        case scope.keys.RIGHT:
            scope.rotateLeft(- scope.rotateSpeed * scope.momentumKeydownFactor);
            break;
        }

    }

    function touchstart( event ) {

        if ( scope.enabled === false ) return;

        input = INPUT.TOUCH;

        this.momentumOn = false;
        this.enableDamping = false;

        momentumLeft = momentumUp = 0;

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

            dollyStart.set( 0, distance );

            break;

        default:

            state = STATE.NONE;

        }

        if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

    }

    function touchmove( event ) {

        if ( scope.enabled === false ) return;

        input = INPUT.TOUCH;

        event.preventDefault();
        event.stopPropagation();

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        switch ( event.touches.length ) {

        case 1: // one-fingered touch: rotate

            if ( scope.noRotate === true ) return;
            if ( state !== STATE.TOUCH_ROTATE ) return;

            rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
            rotateDelta.subVectors( rotateEnd, rotateStart );

            const speedMultiplier = 10.5; // magic number - default rotateSpeed is too slow for our touch momentum

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed * speedMultiplier ); // TODO: Should probably be clientHeight
            // rotating up and down along whole screen attempts to go 360, but limited to 180
            scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed * speedMultiplier );

            rotateStart.copy( rotateEnd );

            if (eventPrevious) {
                momentumLeft = event.touches[0].pageX - eventPrevious.pageX;
                momentumUp = event.touches[0].pageY - eventPrevious.pageY;
            }

            eventPrevious = {
                pageX: event.touches[0].pageX,
                pageY: event.touches[0].pageY,
            };

            break;

        case 2: // two-fingered touch: dolly

            if ( scope.noZoom === true ) return;
            if ( state !== STATE.TOUCH_DOLLY ) return;

            var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            var distance = Math.sqrt( dx * dx + dy * dy );

            dollyEnd.set( 0, distance );
            dollyDelta.subVectors( dollyEnd, dollyStart );

            if ( dollyDelta.y < 0 ) {

                scope.object.fov = ( scope.object.fov < scope.maxFov ) 
                    ? scope.object.fov + 1
                    : scope.maxFov;
                scope.object.updateProjectionMatrix();

            } else if ( dollyDelta.y > 0 ) {

                scope.object.fov = ( scope.object.fov > scope.minFov ) 
                    ? scope.object.fov - 1
                    : scope.minFov;
                scope.object.updateProjectionMatrix();

            }

            dollyStart.copy( dollyEnd );

            scope.dispatchEvent( changeEvent );
            break;

        default:

            state = STATE.NONE;

        }

    }

    function touchend( /* event */ ) {

        if ( scope.enabled === false ) return;

        input = INPUT.TOUCH;

        momentumOn = true;

        eventPrevious = undefined;

        scope.dispatchEvent( endEvent );
        state = STATE.NONE;

    }

    this.dispose = function() {

        this.domElement.removeEventListener( 'mousedown', onMouseDown );
        this.domElement.removeEventListener( 'mousewheel', onMouseWheel );
        this.domElement.removeEventListener( 'DOMMouseScroll', onMouseWheel );

        this.domElement.removeEventListener( 'touchstart', touchstart );
        this.domElement.removeEventListener( 'touchend', touchend );
        this.domElement.removeEventListener( 'touchmove', touchmove );

        window.removeEventListener( 'keyup', onKeyUp );
        window.removeEventListener( 'keydown', onKeyDown );

    };

    // this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
    this.domElement.addEventListener( 'mousedown', onMouseDown, { passive: false } );
    this.domElement.addEventListener( 'mousewheel', onMouseWheel, { passive: false } );
    this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, { passive: false } ); // firefox

    this.domElement.addEventListener( 'touchstart', touchstart, { passive: false } );
    this.domElement.addEventListener( 'touchend', touchend, { passive: false } );
    this.domElement.addEventListener( 'touchmove', touchmove, { passive: false } );

    window.addEventListener( 'keyup', onKeyUp, { passive: false } );
    window.addEventListener( 'keydown', onKeyDown, { passive: false } );

    // force an update at start
    this.update();

};

SphericalControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

    constructor: SphericalControls

} );

export { SphericalControls };