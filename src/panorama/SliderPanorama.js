import { Panorama } from './Panorama';
import { TextureLoader } from '../loaders/TextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Cubemap-based panorama
 * @constructor
 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
 */
function SliderPanorama ( images = [] ){

    this.images = images;
    this.slides = [];
    
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

    geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );

    Panorama.call( this, geometry, material );
}

SliderPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: SliderPanorama,

    /**
     * Load 6 images and bind listeners
     * @memberOf SliderPanorama
     * @instance
     */
    load: function () {
        this.images.forEach( ( image ) => { TextureLoader.load( image, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) ); } );
    },

    /**
     * This will be called when 6 textures are ready
     * @param  {THREE.CubeTexture} texture - List texture
     * @memberOf SliderPanorama
     * @instance
     */
    onLoad: function ( texture ) {
        var bgWidth = texture.image.naturalWidth;
        var bgHeight = texture.image.naturalHeight;

        var aspect = window.innerWidth / window.innerHeight;
        var texAspect = bgWidth / bgHeight;
        var relAspect = aspect / texAspect;

        texture.repeat = new THREE.Vector2( Math.min(relAspect, 1), Math.min(1/relAspect,1) ); 
        texture.offset = new THREE.Vector2( -Math.min(relAspect-1, 0)/2, -Math.min(1/relAspect-1, 0)/2 ); 

        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        this.slides.push(texture);

        Panorama.prototype.onLoad.call( this );

    },

    /**
     * Dispose
     * @memberOf SliderPanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tCube;

        this.images.forEach( ( image ) => { THREE.Cache.remove( image ); } );

        if ( value instanceof THREE.CubeTexture ) {

            value.dispose();

        }

        Panorama.prototype.dispose.call( this );

    }

} );

export { SliderPanorama };