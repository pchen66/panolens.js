import { Panorama } from './Panorama';
import { PanoMoments } from '../loaders/PanoMoments';
import { BallSpinerLoader } from '../lib/spinners/BallSpinner';
import * as THREE from 'three';

/**
 * @classdesc PanoMomentPanorama based panorama
 * @constructor
 * @param {object, bool} PanoMoments identifier and force reload option
 */

function PanoMomentPanorama ( identifier, forceReload ) {

    Panorama.call( this );

    this.identifier = identifier;
    this.PanoMomentss = null;
    this.momentData = null;
    this.camera = null;

    this.reload = false;
    this.forceReload = forceReload !== undefined ? forceReload : false; // Some use-cases won't require that the PanoMoment is disposed/re-loaded on enter/leave
    this.isReady = false;

    this.addEventListener( 'panolens-camera', this.onPanolensCamera.bind( this ) );
    this.addEventListener( 'panolens-orbitcontrols', this.onPanolensOrbitControls.bind( this ) );

}

PanoMomentPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: PanoMomentPanorama,

    /**
     * When camera reference dispatched
     * @param {THREE.Camera} camera 
     */
    onPanolensCamera: function( { camera } ) {
        this.camera = camera;
    },

    /**
     * When OrbitControls reference dispatched
     * @param {THREE.Camera} camera 
     */
    onPanolensOrbitControls: function( { OrbitControls } ) {
        this.OrbitControls = OrbitControls;
    },

    load: function () {
        this.PanoMoments = new PanoMoments(this.identifier, this.renderCallback.bind( this ), this.readyCallback.bind( this ), this.loadedCallback.bind( this ));
        this.spinner = new BallSpinerLoader({ groupRadius:20 }); 
        this.spinner.mesh.position.set(0,0,-600);
        this.addSpinner(this.spinner.mesh);
        console.log("PanoMoment Initialized.");

        this.dispatchEvent( { type: 'panoMomentLoad' } );
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' });
        
        Panorama.prototype.load.call( this );
    },

     /**
     * Add Spinner
     * @param {object} spinner.mesh 
     */
    addSpinner: function ( spinnerMesh ) {
        
        this.camera.add(spinnerMesh);
        spinnerMesh.name='spinner';

    },

     /**
     * Remove Spinner
     * @param {object} spinner.mesh 
     */
    removeSpinner: function ( spinnerMesh ) {

        this.camera.remove(this.camera.getObjectById(spinnerMesh.id));

    },

    /**
     * On Panolens update callback
     */
    updateCallback: function() {
        if (this.camera.getObjectByName('spinner') && this.spinner) { // Not sure if this is expensive to do...
            this.spinner.animate();
        }

        const { camera, momentData } = this;

        if(!momentData) return;
        
        const rotation = THREE.Math.radToDeg(camera.rotation.y) + 180;
        const yaw = (rotation * (momentData.clockwise ? -1.0 : 1.0) + 90) % 360;

        this.setPanoMomentYaw( yaw );
    },

    renderCallback: function (video, momentData) {
        
        if (!this.momentData) {

            this.momentData = momentData;

            const texture = new THREE.VideoTexture( video );
            texture.minFilter = texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.format = THREE.RGBFormat;         
            this.updateTexture( texture );

            this.OrbitControls.panorama = this;
            this.OrbitControls.AzimuthAngleLimits();
            this.camera.position.copy( this.position );
            this.camera.position.z += 1;
            this.OrbitControls.rotateLeft( THREE.Math.degToRad(this.momentData.start_frame + 180) ); // Needed a way to specify a starting viewing angle. Out of the box, OrbitControls doesn't provide this... I'm sure there's some other way to do this though.

            this.material.uniforms.offset.value.x = (this.momentData.max_horizontal_fov / 360 + .25) % 1;
            console.log('PanoMoments First Frame Decoded.');
        } else {
            // this.material.uniforms.offset.value.x = (this.momentData.max_horizontal_fov / 360 + .25) % 1;
        }
    },

    readyCallback: function (video, momentData) {
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl' }); // This won't work with cached PanoMoments as the callback doesn't happen. Using isReady for now.
        this.dispatchEvent( { type: 'panoMomentReady' } );
        console.log('PanoMoment Ready.');

        this.isReady = true;
        this.removeSpinner(this.spinner.mesh);
    },

    loadedCallback: function (video, momentData) {
        console.log("PanoMoment Download Complete.");
    },

    /**
     * Set PanoMoment yaw
     * @memberOf PanoMomentPanorama
     * @instance
     * @param {object} event - Event contains float. 0.0 to 360.0
     */

    setPanoMomentYaw: function (yaw) {

        if(!this.PanoMoments) return;

        const { momentData, PanoMoments: { render, FrameCount, textureReady } } = this;

        if(!momentData) return;

        render((yaw / 360) * FrameCount);

        if (textureReady) {
            this.getTexture().needsUpdate = true;
        }

    },

     /**
     * onEnter
     * @memberOf PanoMomentPanorama
     * @instance
     */
    onEnter: function () {

        // Add update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'addUpdateCallback', 
            data: this.updateCallback.bind(this)
        });

        if (this.reload && this.forceReload) {
            this.reload = false;
            this.load();
        }

        Panorama.prototype.onEnter.call( this );

    },

    /**
     * onLeave
     * @memberOf PanoMomentPanorama
     * @instance
     */
    onLeave: function () {

        // Remove update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'removeUpdateCallback', 
            data: this.updateCallback.bind(this)
        });

        this.removeSpinner(this.spinner.mesh);

        if (this.forceReload) {
            this.isReady = false;
            this.reload = true;
            this.spinner = null;
            this.PanoMoments.dispose(); // This currently doesn't stop an ongoing download which is a bit of an issue... Maybe for later though.
            this.PanoMoments = null; 
            this.momentData = null;
        }

        Panorama.prototype.onLeave.call( this );

    },

    /**
     * Reset
     * @memberOf PanoMomentPanorama
     * @instance
     */
    reset: function () {

        Panorama.prototype.reset.call( this );

    },

    /**
     * Dispose
     * @memberOf PanoMomentPanorama
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

export { PanoMomentPanorama };