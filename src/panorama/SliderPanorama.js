import { Panorama } from './Panorama';
import { TextureLoader } from '../loaders/TextureLoader';
import * as THREE from 'three';

/**
 * @classdesc SliderPanorama
 * @constructor
 * @param {string} image - image src
 */
function SliderPanorama ( image ) {

    // this.image = image;
    
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );
    

    geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );

    Panorama.call( this, geometry, material );

    this.src = image;
    this.spriteMaterial = new THREE.SpriteMaterial( { sizeAttenuation: false} );
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
     * Update texture of a panorama
     * @memberOf Panorama
     * @instance
     * @param {THREE.Texture} texture - Texture to be updated
     */
    updateTexture: function ( texture ) {
        if (!this.material) return;

        this.spriteMaterial.map = texture;
        this.width = texture.image.width;
        this.height = texture.image.height;
        this.spriteMaterial.needsUpdate = true;
    },
    /**
     * This will be called when 6 textures are ready
     * @param  {THREE.CubeTexture} texture - List texture
     * @memberOf SliderPanorama
     * @instance
     */
    onLoad: function ( texture ) {
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