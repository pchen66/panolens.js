import { Panorama } from './Panorama';
import { PanoMoments } from '../loaders/PanoMoments';
import { BallSpinerLoader } from '../lib/spinners/BallSpinner';
import * as THREE from 'three';

/**
 * @classdesc PanoMomentRegular
 * @constructor
 * @param {object, bool} PanoMoments identifier and force reload option
 */

function PanoMomentRegular ( identifier, forceReload ) {


    this.geometry = new THREE.PlaneGeometry(1, 1);
    this.material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } ); // Apparently this isn't supported on the latest code. It was working (albeit in a major hackish way) on code based on current master.

    Panorama.call( this, this.geometry, this.material );

    this.identifier = identifier;
    this.PanoMomentss = null;
    this.momentData = null;
    this.camera = null;

    this.reload = false;
    this.forceReload = forceReload !== undefined ? forceReload : false; // Some use-cases won't require that the PanoMoment is disposed/re-loaded on enter/leave
    this.isReady = false;

    this.addEventListener( 'panolens-camera', this.onPanolensCamera.bind( this ) );

}

PanoMomentRegular.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: PanoMomentRegular,

    /**
     * When camera reference dispatched
     * @param {THREE.Camera} camera 
     */
    onPanolensCamera: function( { camera } ) {
        this.camera = camera;
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

        if(!momentData || !this.isReady) return;
        
        const rotation = THREE.Math.radToDeg(camera.rotation.y) + 180;
        const yaw = (rotation * (momentData.clockwise ? -1.0 : 1.0) + 90) % 360;

        this.setPanoMomentYaw( yaw );
    },

    renderCallback: function (video, momentData) { // All hacks...
        
        if (!this.momentData) {

            this.momentData = momentData;

            const texture = new THREE.VideoTexture( video );
            texture.minFilter = texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.format = THREE.RGBFormat;         
            this.updateTexture( texture );

            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'resetAzimuthAngleLimits' } );
            this.camera.position.copy( this.position );// This was in the old viewer.enableControl() but that's since been removed in the dev branch. My feeling is that Panoramas should reset to their original viewing angle on enter, and not use the previous panoramas angle. But that's debatable.
            this.camera.position.z += 1; 

            this.viewer.scene.add(this.camera);
            this.camera.add(this);
            this.position.set(0,0,-2);
            this.material.side = THREE.FrontSide;

            var windowAspectRatio = window.innerWidth / window.innerHeight;
            var videoAspectRatio = this.momentData.aspect_ratio ? this.momentData.aspect_ratio : 1.7777777; // Shouldn't really fall back to 16/9 but it's okay for now
            var distanceToPlane = Math.abs(this.position.z);

            var limit;
            if (videoAspectRatio < windowAspectRatio) {
                limit = (Math.tan (THREE.Math.degToRad(this.camera.fov * 0.5)) * distanceToPlane * 2.0) * videoAspectRatio; 
            } else {
                limit = (Math.tan (THREE.Math.degToRad(this.camera.fov * 0.5)) * distanceToPlane * 2.0) * windowAspectRatio 
            }

            var calcScale = new THREE.Vector3 (limit, limit / videoAspectRatio, 1);
            this.scale.set(calcScale.x,calcScale.y,1);

            viewer.camera.add(viewer.scene.children[0]);
            this.camera.children[3].material.opacity = 1;
            this.camera.children[3].position.set(0,0,-50);
            this.camera.children[3].scale.set(1,1,0.003333333333333334);
            
            this.dispatchEvent( { type: 'panoMomentFirstFrameDecoded' } );
            console.log('PanoMoments First Frame Decoded.');

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
     * @memberOf PanoMomentRegular
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
     * @memberOf PanoMomentRegular
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
     * @memberOf PanoMomentRegular
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
            this.updateTexture(null); // Get rid of the stale frame
        }

        Panorama.prototype.onLeave.call( this );

    },

    /**
     * Reset
     * @memberOf PanoMomentRegular
     * @instance
     */
    reset: function () {

        Panorama.prototype.reset.call( this );

    },

    /**
     * Dispose
     * @memberOf PanoMomentRegular
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

export { PanoMomentRegular };