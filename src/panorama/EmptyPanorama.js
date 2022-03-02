import { Panorama } from './Panorama';
import * as THREE from 'three';

/**
 * @classdesc Empty panorama
 * @constructor
 */
class EmptyPanorama extends Panorama {
    constructor() {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );
        super(geometry, material);
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );
    }
}

export { EmptyPanorama };