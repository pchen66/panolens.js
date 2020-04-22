import { Panorama } from './Panorama';
import { PanoMoments } from '../loaders/PanoMoments';
import * as THREE from 'three';

const PANOMOMENT = {
    NONE: 'panomoments.none',
    LOAD: 'panomoments.load',
    FIRST_FRAME_DECODED: 'panomoments.first_frame_decoded',
    READY: 'panomoments.ready',
    COMPLETED: 'panomoments.completed',
};

/**
 * PanoMoments Panorama
 * @param {object} identifier PanoMoment identifier
 * @param {object} options misc options for PanoMoments
 */
function PanoMomentPanorama ( identifier, options = {} ) {

    Panorama.call( this );

    // PanoMoments
    this.identifier = identifier;
    this.PanoMoments = null;
    this.momentData = null;
    this.status = PANOMOMENT.NONE;
    this.options = Object.assign( {
        dampingFactor: 0.95,
        maxMomentum: 10
    }, options );

    // Panolens
    this.camera = null;
    this.controls = null;
    this.defaults = {};

    // Setup Dispatcher
    this.setupDispatcher();

    // Event Bindings
    this.viewerUpdateCallback = () => this.updateCallback();
    this.viewerResetControlLimits = () => this.resetControlLimits( false );
    this.updateMomentum = ( up, left ) => this.momentumFunction( up, left );

    // Event Listeners
    this.addEventListener( 'panolens-camera', data => this.onPanolensCamera( data ) );
    this.addEventListener( 'panolens-controls', data => this.onPanolensControls( data ) );
    this.addEventListener( 'enter-start', () => this.enter() );
    this.addEventListener( 'leave-complete', () => this.leave() );
    this.addEventListener( PANOMOMENT.LOAD, () => this.disableControl() );
    this.addEventListener( PANOMOMENT.READY, () => this.enableControl() );

}

PanoMomentPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: PanoMomentPanorama,

    /**
     * When camera reference dispatched
     * @param {THREE.Camera} camera 
     */
    onPanolensCamera: function( { camera } ) {

        Object.assign( this.defaults, { fov: camera.fov } );

        this.camera = camera;

    },

    /**
     * When control references dispatched
     * @param {THREE.Object[]} controls 
     */
    onPanolensControls: function( { controls } ) {

        const [ { minPolarAngle, maxPolarAngle, updateMomentum } ] = controls;
        Object.assign( this.defaults, { minPolarAngle, maxPolarAngle, updateMomentum } );
        
        this.controls = controls;

    },

    /**
     * Intercept default dispatcher
     */
    setupDispatcher: function() {

        const dispatch = this.dispatchEvent.bind( this );
        const values = Object.values( PANOMOMENT );
  
        this.dispatchEvent = function( event ) {
 
            if ( values.includes( event.type ) ) {

                this.status = event.type;

            }

            dispatch( event );

        };

    },

    /**
     * Enable Control
     */
    enableControl: function() {

        const event = { type: 'panolens-viewer-handler', method: 'enableControl' };

        requestAnimationFrame( this.dispatchEvent.bind( this, event ) );

    },

    /**
     * Disable Control
     */
    disableControl: function() {

        const event = { type: 'panolens-viewer-handler', method: 'disableControl' };

        requestAnimationFrame( this.dispatchEvent.bind( this, event ) );

    },

    /**
     * Override default OrbitControl momentum update function
     * @param {boolean} override
     */
    overrideUpdateMomentum: function( override = true ) {

        const [ OrbitControls ] = this.controls;

        OrbitControls.updateMomentum = override ? this.updateMomentum : this.defaults.updateMomentum;

    },

    /**
     * Momentum Function
     * @param {number} up 
     * @param {number} left 
     */
    momentumFunction: function( up, left ) {

        const { dampingFactor, maxMomentum } = this.options;

        return [ 
            THREE.Math.clamp( up * dampingFactor, -maxMomentum, maxMomentum ),
            THREE.Math.clamp( left * dampingFactor, -maxMomentum, maxMomentum )
        ];

    },

    /**
     * Attch UI Event Listener to Container
     * @param {boolean} attach 
     */
    attachFOVListener: function( attach = true ) {

        const [ OrbitControls ] = this.controls;

        if ( attach ) {

            OrbitControls.addEventListener( 'fov', this.viewerResetControlLimits );

        } else {

            OrbitControls.removeEventListener( 'fov', this.viewerResetControlLimits );

        }
        
    },

    /**
     * Reset Polar Angle and FOV Limits
     * @param {boolean} reset
     */
    resetControlLimits: function( reset = false ) {

        const { momentData } = this;

        if ( !momentData ) return;

        this.resetAzimuthAngleLimits( reset );
        this.resetFOVLimits( reset );

    },

    /**
     * Update intial heading based on moment data
     */
    updateHeading: function() {

        if ( !this.momentData ) return;

        const { momentData: { start_frame, max_horizontal_fov } } = this;

        // reset center to initial lookat
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setControlCenter' } );

        // rotate to initial frame center
        const angle = (start_frame + 180) / 180 * Math.PI;
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'rotateControlLeft', data: angle } );

        // uv offset
        this.material.uniforms.offset.value.x = (max_horizontal_fov / 360 + .25) % 1;

        // control update
        this.resetControlLimits( false );

    },

    /**
     * Load Pano Moment Panorama
     */
    load: function () {
        
        const { identifier, renderCallback, readyCallback, loadedCallback } = this;

        this.PanoMoments = new PanoMoments(
            identifier, 
            renderCallback.bind( this ), 
            readyCallback.bind( this ), 
            loadedCallback.bind( this )
        );

        this.dispatchEvent( { type: PANOMOMENT.LOAD } );

    },

    /**
     * On Panolens update callback
     */
    updateCallback: function() {

        const { camera, momentData, status } = this;

        if( (status !== PANOMOMENT.FIRST_FRAME_DECODED && status !== PANOMOMENT.READY && status !== PANOMOMENT.COMPLETED) || !momentData ) return;
        
        const rotation = THREE.Math.radToDeg(camera.rotation.y) + 180;
        const yaw = (rotation * (momentData.clockwise ? -1.0 : 1.0) + 90) % 360;

        this.setPanoMomentYaw( yaw );
        
    },

    /**
     * On Pano Moment Render Callback
     */
    renderCallback: function (video, momentData) {

        if ( !this.momentData ) {

            this.momentData = momentData;

            const texture = new THREE.VideoTexture( video );
            texture.minFilter = texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.format = THREE.RGBFormat;   
            this.updateTexture( texture ); 

            this.dispatchEvent( { type: PANOMOMENT.FIRST_FRAME_DECODED } );
            console.log('PanoMoments First Frame Decoded');

            // actual load callback
            Panorama.prototype.load.call( this );

        }
    },

    /**
     * On Pano Moment Ready Callback
     */
    readyCallback: function () {

        this.dispatchEvent( { type: PANOMOMENT.READY } );
        console.log('PanoMoment Ready');
    },

    /**
     * On Pano Moment Loaded Callback
     */
    loadedCallback: function () {

        this.dispatchEvent( { type: PANOMOMENT.COMPLETED } );
        console.log('PanoMoment Download Completed');

    },

    /**
     * Reset Polar Angle Limit by momentData or default
     * @param {boolean} reset 
     */
    resetAzimuthAngleLimits: function( reset = false ) {

        const { controls: [ OrbitControls ], 
            momentData: { contains_parallax, min_vertical_fov } , defaults, camera } = this;

        if ( !contains_parallax ) return;

        const delta = THREE.Math.degToRad( ( 0.95 * min_vertical_fov - camera.fov ) / 2 );
        const angles = {
            minPolarAngle: Math.PI / 2 - delta,
            maxPolarAngle: Math.PI / 2 + delta
        };

        Object.assign( OrbitControls, reset ? defaults : angles );

    },

    /**
     * Calculate FOV limit
     * @param {number} fov 
     * @param {boolean} horizontal 
     */
    calculateFOV: function( fov, horizontal ) {

        const { camera: { aspect } } = this;
        const factor = horizontal ? aspect : ( 1 / aspect );

        return 2 * Math.atan( Math.tan( fov * Math.PI / 360 ) * factor ) / Math.PI * 180;

    },

    /**
     * Set FOV Limit by momentData or default
     * @param {boolean} reset 
     */
    resetFOVLimits: function ( reset = false ) {

        const { momentData, camera, controls: [ OrbitControls ], defaults: { fov } } = this;
        const fovH = this.calculateFOV( camera.fov, true ) ;

        if ( fovH > ( momentData.min_horizontal_fov * .95 ) ) {

            camera.fov = this.calculateFOV( momentData.min_horizontal_fov * .95, false );
        
        } else if ( fovH < OrbitControls.minFov ) {

            camera.fov = this.calculateFOV( OrbitControls.minFov, false );

        }

        camera.fov = reset ? fov : camera.fov;
        camera.updateProjectionMatrix();

    },

    /**
     * Set PanoMoment yaw
     * @memberOf PanoMomentPanorama
     * @param {number} yaw - yaw value from 0 to 360 in degree
     */
    setPanoMomentYaw: function (yaw) {

        const { status, momentData, PanoMoments: { render, FrameCount } } = this;

        if( (status !== PANOMOMENT.READY && status !== PANOMOMENT.COMPLETED) || !momentData ) return;

        render((yaw / 360) * FrameCount);

        // textureReady updated 
        if (this.PanoMoments.textureReady) this.getTexture().needsUpdate = true;

    },

    /**
     * Enter Panorama
     */
    enter: function() {

        this.updateHeading();
        this.attachFOVListener( true );
        this.resetControlLimits( false );
        this.overrideUpdateMomentum( true );

        // Add update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'addUpdateCallback', 
            data: this.viewerUpdateCallback
        });

    },

    /**
     * Leave Panorama
     */
    leave: function() {

        this.attachFOVListener( false );
        this.resetControlLimits( true );
        this.overrideUpdateMomentum( false );

        // Remove update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'removeUpdateCallback', 
            data: this.viewerUpdateCallback
        });

    },

    /**
     * Dispose Panorama
     */
    dispose: function() {

        this.leave();

        this.PanoMoments.dispose();
        this.PanoMoments = null;
        this.momentData = null;

        Panorama.prototype.dispose.call( this );

    }

} );

export { PanoMomentPanorama, PANOMOMENT };