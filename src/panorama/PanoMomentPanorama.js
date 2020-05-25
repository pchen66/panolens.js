import * as THREE from 'three';
import { PanoMoment } from './PanoMoment';

/**
 * PanoMoment Panorama
 * @param {object} identifier PanoMoment identifier
 */
function PanoMomentPanorama ( identifier ) {

    PanoMoment.call( this, identifier );

    // Event Bindings
    this.viewerResetControlLimits = () => this.resetControlLimits( false );

}

PanoMomentPanorama.prototype = Object.assign( Object.create( PanoMoment.prototype ), {

    constructor: PanoMomentPanorama,

    /**
     * When window is resized
     */
    onWindowResize: function() {

        this.resetControlLimits( false );

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
     * Update intial heading with texture offset
     */
    updateHeading: function() {

        if ( !this.momentData ) return;

        const { momentData: { max_horizontal_fov } } = this;

        this.material.uniforms.offset.value.x = ( max_horizontal_fov / 360 + .25 ) % 1;

        // control update
        this.resetControlLimits( false );

        PanoMoment.prototype.updateHeading.call( this );

    },

    /**
     * Reset Polar Angle Limit by momentData or default
     * @param {boolean} reset 
     */
    resetAzimuthAngleLimits: function( reset = false ) {

        const { 
            controls: [ OrbitControls ], 
            momentData: { contains_parallax, min_vertical_fov }, 
            defaults: { minPolarAngle, maxPolarAngle }, 
            camera 
        } = this;

        if ( !contains_parallax && !reset ) return;

        const delta = THREE.Math.degToRad( ( 0.95 * min_vertical_fov - camera.fov ) / 2 );
        const angles = {
            minPolarAngle: Math.PI / 2 - delta,
            maxPolarAngle: Math.PI / 2 + delta
        };

        Object.assign( OrbitControls, reset ? { minPolarAngle, maxPolarAngle } : angles );

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
     * Reset Polar Angle and FOV Limits
     * @param {boolean} reset
     */
    resetControlLimits: function( reset = false ) {

        if ( !this.momentData ) return;

        this.resetFOVLimits( reset );
        this.resetAzimuthAngleLimits( reset );

    },

    /**
     * Enter Panorama
     */
    enter: function() {

        this.attachFOVListener( true );
        this.resetControlLimits( false );

        PanoMoment.prototype.enter.call( this );

    },

    /**
     * Leave Panorama
     */
    leave: function() {

        this.attachFOVListener( false );
        this.resetControlLimits( true );

        PanoMoment.prototype.leave.call( this );

    }

} );

export { PanoMomentPanorama };