import * as THREE from 'three';

/**
 * @classdesc Orbit Controls
 * @constructor
 * @external OrbitControls
 * @param {THREE.Object} object 
 * @param {HTMLElement} domElement 
 */
function OrbitControls ( object, domElement ) {

    this.object = object;
    this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.frameId = null;

    // API

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
    this.rotateSpeed = -0.15;

    // Set to true to disable this control
    this.noPan = true;
    this.keyPanSpeed = 7.0; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    /*
     * How far you can orbit vertically, upper and lower limits.
     * Range is 0 to Math.PI radians.
     */
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // Momentum
    this.momentumKeydownFactor = .05;
    this.speedLimit = 0.04;
    this.publicSphericalDelta = new THREE.Spherical();
    this.momentum = true;
    this.momentumFactor = 7.5;

    this.enableDamping = true;
    this.dampingFactor = 0.03;

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

    const scope = this;

    const EPS = 10e-8;

    const rotateStart = new THREE.Vector2();
    const rotateEnd = new THREE.Vector2();
    const rotateDelta = new THREE.Vector2();

    const panStart = new THREE.Vector2();
    const panEnd = new THREE.Vector2();
    const panDelta = new THREE.Vector2();
    const panOffset = new THREE.Vector3();

    const offset = new THREE.Vector3();

    const dollyStart = new THREE.Vector2();
    const dollyEnd = new THREE.Vector2();
    const dollyDelta = new THREE.Vector2();

    let theta = 0;
    let phi = 0;
    let phiDelta = 0;
    let thetaDelta = 0;
    let scale = 1;
    const pan = new THREE.Vector3();

    const lastPosition = new THREE.Vector3();
    const lastQuaternion = new THREE.Quaternion();

    const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

    let state = STATE.NONE;

    // eslint-disable-next-line no-unused-vars
    let keyUp, keyBottom, keyLeft, keyRight;

    // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;

    // so camera.up is the orbit axis

    const quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
    const quatInverse = quat.clone().inverse();

    // events

    const changeEvent = { type: 'change' };
    const startEvent = { type: 'start' };
    const endEvent = { type: 'end' };
    const fovEvent = { type: 'fov' };

    this.setLastQuaternion = function ( quaternion ) {
        lastQuaternion.copy( quaternion );
        scope.object.quaternion.copy( quaternion );
    };

    this.getLastPosition = function () {
        return lastPosition;
    };

    this.rotateLeft = function ( angle ) {

        if ( angle === undefined ) {

            angle = getAutoRotationAngle();

        }

        angle = this.momentum && !this.autoRotate ? angle /= this.momentumFactor : angle; 
        thetaDelta -= angle;

    };

    this.rotateUp = function ( angle ) {

        if ( angle === undefined ) {

            angle = getAutoRotationAngle();

        }

        angle = this.momentum && !this.autoRotate ? angle /= this.momentumFactor : angle; 
        phiDelta -= angle;

    };

    this.rotateLeftStatic = function ( angle ) {

        this.enableDamping = false;
        thetaDelta -= angle;
        this.update();
        this.enableDamping = true;

    };

    this.rotateUpStatic = function ( angle ) {

        this.enableDamping = false;
        phiDelta -= angle;
        this.update();
        this.enableDamping = true;

    };

    // pass in distance in world space to move left
    this.panLeft = function ( distance ) {

        const te = this.object.matrix.elements;

        // get X column of matrix
        panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
        panOffset.multiplyScalar( - distance );

        pan.add( panOffset );

    };

    // pass in distance in world space to move up
    this.panUp = function ( distance ) {

        const te = this.object.matrix.elements;

        // get Y column of matrix
        panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
        panOffset.multiplyScalar( distance );

        pan.add( panOffset );

    };

    /*
     * pass in x,y of change desired in pixel space,
     * right and down are positive
     */
    this.pan = function ( deltaX, deltaY ) {

        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if ( scope.object instanceof THREE.PerspectiveCamera ) {

            // perspective
            const position = scope.object.position;
            const offset = position.clone().sub( scope.target );
            let targetDistance = offset.length();

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

        const position = this.object.position;

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

        if (this.enableDamping === true ) {
            thetaDelta = THREE.Math.clamp(thetaDelta, -this.speedLimit, this.speedLimit);
            phiDelta = THREE.Math.clamp(phiDelta, -this.speedLimit, this.speedLimit);
        }
        
        theta += thetaDelta;
        phi += phiDelta;

        // DeviceOrientationControl support
        scope.publicSphericalDelta.data = { theta }; 

        // restrict theta to be between desired limits
        theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

        // restrict phi to be between desired limits
        phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

        // restrict phi to be betwee EPS and PI-EPS
        phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

        let radius = offset.length() * scale;

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

        if ( !this.autoRotate && this.enableDamping === true && ((this.momentum && (state === STATE.ROTATE || state === STATE.TOUCH_ROTATE)) || state === STATE.NONE ) ) {

            thetaDelta *= ( 1 - this.dampingFactor );
            phiDelta *= ( 1 - this.dampingFactor );

        } else {

            thetaDelta = 0;
            phiDelta = 0;

        }

        scale = 1;
        pan.set( 0, 0, 0 );

        /*
         * update condition is:
         * min(camera displacement, camera rotation in radians)^2 > EPS
         * using small-angle approximation cos(x/2) = 1 - x^2 / 8
         */
        if ( lastPosition.distanceToSquared( this.object.position ) > EPS
            || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {

            if ( ignoreUpdate !== true ) { this.dispatchEvent( changeEvent ); }

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

        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if ( state === STATE.ROTATE ) {

            if ( scope.noRotate === true ) return;

            rotateEnd.set( event.clientX, event.clientY );
            rotateDelta.subVectors( rotateEnd, rotateStart );

            if (rotateStart.x == 0 && rotateStart.y == 0) {
                rotateStart.set(rotateEnd.x, rotateEnd.y);
                rotateDelta.subVectors( rotateEnd, rotateStart );
                return;
            }

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight * scope.rotateSpeed );

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

        } else if ( state === STATE.PAN ) {

            if ( scope.noPan === true ) return;

            panEnd.set( event.clientX, event.clientY );
            panDelta.subVectors( panEnd, panStart );

            scope.pan( panDelta.x, panDelta.y );

            panStart.copy( panEnd );

        }

    }

    function onMouseUp( /* event */ ) {

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

        let delta = 0;

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
        scope.dispatchEvent( fovEvent );

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

        if ( scope.enabled === false || scope.noKeys === true || scope.noRotate === true || scope.autoRotate) return;

        const updatedMomentumKeydownFactor = scope.momentum && !scope.autoRotate ? scope.momentumKeydownFactor * scope.momentumFactor : scope.momentumKeydownFactor; // Handle difference in necessary rotateSpeed constants.

        switch ( event.keyCode ) {

        case scope.keys.UP:
            keyUp = true;
            scope.rotateUp( scope.rotateSpeed * updatedMomentumKeydownFactor );
            break;

        case scope.keys.BOTTOM:
            keyBottom = true;
            scope.rotateUp( - scope.rotateSpeed * updatedMomentumKeydownFactor );
            break;

        case scope.keys.LEFT:
            keyLeft = true;
            scope.rotateLeft( scope.rotateSpeed * updatedMomentumKeydownFactor );
            break;

        case scope.keys.RIGHT:
            keyRight = true;
            scope.rotateLeft( - scope.rotateSpeed * updatedMomentumKeydownFactor );
            break;

        }

    }

    function touchstart( event ) {


        if ( scope.enabled === false ) return;

        switch ( event.touches.length ) {

        case 1: // one-fingered touch: rotate

            if ( scope.noRotate === true ) return;

            state = STATE.TOUCH_ROTATE;

            rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
            break;

        case 2: // two-fingered touch: dolly

            if ( scope.noZoom === true ) return;

            state = STATE.TOUCH_DOLLY;

            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            const distance = Math.sqrt( dx * dx + dy * dy );

            dollyStart.set( 0, distance );

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

        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        switch ( event.touches.length ) {

        case 1: // one-fingered touch: rotate

            if ( scope.noRotate === true ) return;
            if ( state !== STATE.TOUCH_ROTATE ) return;

            rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
            rotateDelta.subVectors( rotateEnd, rotateStart );

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight * scope.rotateSpeed );
            // rotating up and down along whole screen attempts to go 360, but limited to 180
            scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

            rotateStart.copy( rotateEnd );

            break;

        case 2: // two-fingered touch: dolly

            if ( scope.noZoom === true ) return;
            if ( state !== STATE.TOUCH_DOLLY ) return;

            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            const distance = Math.sqrt( dx * dx + dy * dy );

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
            scope.dispatchEvent( fovEvent );
            break;

        case 3: // three-fingered touch: pan

            if ( scope.noPan === true ) return;
            if ( state !== STATE.TOUCH_PAN ) return;

            panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
            panDelta.subVectors( panEnd, panStart );

            scope.pan( panDelta.x, panDelta.y );

            panStart.copy( panEnd );

            break;

        default:

            state = STATE.NONE;

        }

    }

    function touchend( /* event */ ) {

        if ( scope.enabled === false ) return;

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

OrbitControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

    constructor: OrbitControls

} );

export { OrbitControls };