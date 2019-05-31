import { Panorama } from './Panorama';
import { Media } from '../media/Media';
import 'three';

/**
 * Camera panorama
 * See https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints for constraints
 * @param {object} - camera constraints
 * @constructor
 */
function CameraPanorama ( constraints ) {

    const radius = 5000;
    const geometry = new THREE.SphereBufferGeometry( radius, 60, 40 );
    const material = new THREE.MeshBasicMaterial( { visible: false });

    Panorama.call( this, geometry, material );

    this.media = new Media( constraints );
    this.radius = radius;

    this.addEventListener( 'enter', this.start.bind( this ) );
    this.addEventListener( 'leave', this.stop.bind( this ) );
    this.addEventListener( 'panolens-container', this.onPanolensContainer.bind( this ) );
    this.addEventListener( 'panolens-scene', this.onPanolensScene.bind( this ) );

}

CameraPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: CameraPanorama,

    onPanolensContainer: function ( { container } ) {

        this.media.container = container;

    },

    onPanolensScene: function ( { scene } ) {

        this.media.scene = scene;

    },

    start: function () {

        return this.media.start();

    },

    stop: function () {

        this.media.stop();

    },

} );

export { CameraPanorama };