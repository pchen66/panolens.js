import { Panorama } from './Panorama';
import { Media } from '../media/Media';
import 'three';

/**
 * Camera panorama
 * @constructor
 */
function CameraPanorama () {

	const radius = 5000;
	const geometry = new THREE.SphereBufferGeometry( radius, 60, 40 );
	const material = new THREE.MeshBasicMaterial( { visible: false });

	Panorama.call( this, geometry, material );

	this.media = new Media();
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

		const media = this.media;

		media.start()
		.then( function ( stream ) {

			if ( this.active ) {

				media.attachVideoSourceObject( stream );

			}

		}.bind( this ) );

	},

	stop: function () {

		this.media.stop();

	},

} );

export { CameraPanorama };