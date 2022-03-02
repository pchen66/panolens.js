import { Panorama } from './Panorama';
import { Media } from '../media/Media';
import * as THREE from 'three';

/**
 * @classdesc Camera panorama
 * @description See {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints|MediaStreamConstraints} for constraints
 * @param {object} - camera constraints
 * @constructor
 */
class CameraPanorama extends Panorama {
    constructor( constraints ) {
        const radius = 5000;
        const geometry = new THREE.SphereBufferGeometry( radius, 60, 40 );
        const material = new THREE.MeshBasicMaterial( { visible: false });
    
        super(geometry, material);

        this.media = new Media( constraints );
        this.radius = radius;

        this.addEventListener( 'enter', this.start.bind( this ) );
        this.addEventListener( 'leave', this.stop.bind( this ) );
        this.addEventListener( 'panolens-container', this.onPanolensContainer.bind( this ) );
        this.addEventListener( 'panolens-scene', this.onPanolensScene.bind( this ) );

    }

    /**
     * On container event
     * @param {object} event
     * @memberOf CameraPanorama
     * @instance
     */
    onPanolensContainer ( { container } ) {
        this.media.setContainer( container );
    }

    /**
     * On scene event
     * @param {object} event 
     * @memberOf CameraPanorama
     * @instance
     */
    onPanolensScene( { scene } ) {
        this.media.setScene( scene );
    }

    /**
     * Start camera streaming
     * @memberOf CameraPanorama
     * @instance
     * @returns {Promise}
     */
    start() {
        return this.media.start();
    }

    /**
     * Stop camera streaming
     * @memberOf CameraPanorama
     * @instance
     */
    stop() {
        this.media.stop();
    }
}

export { CameraPanorama };