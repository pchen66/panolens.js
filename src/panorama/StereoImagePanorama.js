import { STEREOFORMAT } from '../Constants';
import { ImagePanorama } from './ImagePanorama';
import { EquirectShader } from '../shaders/EquirectShader';
import * as THREE from 'three';
import { Stereo } from '../auxiliary/Stereo';

/**
 * @classdesc Stereo Image Panorama
 * @constructor
 * @param {string} src - image source
 * @param {number} [stereo=new Stereo()] - stereo mixin
 */
function StereoImagePanorama ( src, stereo = new Stereo() ){

    const edgeLength = 10000;
    const geometry = this.createGeometry( edgeLength );
    const material = this.createEquiShaderMaterial();

    ImagePanorama.call( this, src, geometry, material );

    this.edgeLength = edgeLength;
    this.stereo = stereo;

}

StereoImagePanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

    constructor: StereoImagePanorama,

    /**
     * Create a skybox geometry
     * @memberOf StereoImagePanorama
     * @instance
     */
    createGeometry: function ( edgeLength ) {

        return new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );

    },

    /**
     * Create equirectangular shader material
     * @param {THREE.Vector2} [repeat=new THREE.Vector2( 1, 1 )] - Texture Repeat
     * @param {THREE.Vector2} [offset=new THREE.Vector2( 0, 0 )] - Texture Offset
     * @memberOf StereoImagePanorama
     * @instance
     */
    createEquiShaderMaterial: function ( repeat = new THREE.Vector2( 1, 1 ), offset = new THREE.Vector2( 0, 0 ) ) {

        const { fragmentShader, vertexShader } = EquirectShader;
        const uniforms = THREE.UniformsUtils.clone( EquirectShader.uniforms );
        
        uniforms.repeat.value.copy( repeat );
        uniforms.offset.value.copy( offset );

        const material = new THREE.ShaderMaterial( {

            fragmentShader,
            vertexShader,
            uniforms,
            side: THREE.BackSide,
            transparent: true
    
        } );

        return material;

    },

    /**
     * This will be called when texture is ready
     * @param  {THREE.Texture} texture - Image texture
     * @memberOf StereoImagePanorama
     * @instance
     */
    onLoad: function ( texture ) {

        const { width, height } = texture.image;
        let format = null;

        if ( width / height === 4 ) { 
            
            format = STEREOFORMAT.SBS;
        
        } else { 

            format = STEREOFORMAT.TAB;
        
        }

        this.stereo.updateUniformByFormat( format, this.material.uniforms );

        this.material.uniforms[ 'tEquirect' ].value = texture;

        ImagePanorama.prototype.onLoad.call( this, texture );

    },

    /**
     * Update Texture for Stereo Left Eye
     * @memberOf StereoImagePanorama
     * @instance
     */
    updateTextureToLeft: function() {

        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

    },

    /**
     * Update Texture for Stereo Right Eye
     * @memberOf StereoImagePanorama
     * @instance
     */
    updateTextureToRight: function() {

        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

    },

    /**
     * Dispose
     * @memberOf StereoImagePanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tEquirect;

        if ( value instanceof THREE.Texture ) {

            value.dispose();

        }

        ImagePanorama.prototype.dispose.call( this );

    }

} );

export { StereoImagePanorama };