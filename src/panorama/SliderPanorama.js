import { Panorama } from './Panorama';
import { TextureLoader } from '../loaders/TextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Cubemap-based panorama
 * @constructor
 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
 */
function SliderPanorama ( image ){

    // this.image = image;
    
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

    geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );

    Panorama.call( this, geometry, material );

    this.src = image;
}

SliderPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: SliderPanorama,

    /**
     * Load image and bind listeners
     * @memberOf SliderPanorama
     * @instance
     */
    load: function ( src ) {
        src = src || this.src;

        if (!src) {

            console.warn('Image source undefined');

            return;

        } else if (typeof src === 'string') {

            TextureLoader.load(src, this.onLoad.bind(this), this.onProgress.bind(this), this.onError.bind(this));

        } else if (src instanceof HTMLImageElement) {

            this.onLoad(new THREE.Texture(src));

        }
        // TextureLoader.load( this.image, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );
    },

    /**
     * This will be called when 6 textures are ready
     * @param  {THREE.CubeTexture} texture - List texture
     * @memberOf SliderPanorama
     * @instance
     */
    onLoad: function ( texture ) {
        var relAspect = (window.innerWidth / window.innerHeight) / ( texture.image.naturalWidth / texture.image.naturalHeight);

        texture.repeat = new THREE.Vector2( Math.min(relAspect, 1), Math.min(1/relAspect,1) ); 
        texture.offset = new THREE.Vector2( -Math.min(relAspect-1, 0)/2, -Math.min(1/relAspect-1, 0)/2 ); 

        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        texture.needsUpdate = true;

        this.updateTexture( texture );

        window.requestAnimationFrame( Panorama.prototype.onLoad.bind( this ) );
    },

    /**
     * Dispose
     * @memberOf SliderPanorama
     * @instance
     */
    dispose: function () {	

        if (this.material){
            const { material: { map } } = this;

            if ( map ) { map.dispose(); }}

        // Release cached image
        THREE.Cache.remove(this.src);
        
        Panorama.prototype.dispose.call( this );

    }

} );

export { SliderPanorama };