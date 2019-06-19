import { Panorama } from './Panorama';
import * as THREE from 'three';

/**
 * @classdesc Empty panorama
 * @constructor
 */
function EmptyPanorama () {

    Panorama.call( this );

    this.type = 'empty_panorama';

}

EmptyPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: EmptyPanorama,

    /**
     * Create a skybox geometry
     * @memberOf EmptyPanorama
     * @instance
     */
    createGeometry: function() {

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );
        return geometry;

    },

    /**
     * Create material
     * @memberOf EmptyPanorama
     * @instance
     */
    createMaterial: function() {

        new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

    },

    getTexture: function () {

        return null;

    }

} );

export { EmptyPanorama };