import { STEREOFORMAT } from '../Constants';
import { VideoPanorama } from './VideoPanorama';
import { EquirectShader } from '../shaders/EquirectShader';
import * as THREE from 'three';
import { Stereo } from '../auxiliary/Stereo';

/**
 * @classdesc Stereo Image Panorama
 * @constructor
 * @param {string} src - image source
 * @param {number} [stereo=new Stereo()] - stereo mixin
 */
function StereoVideoPanorama ( src, stereo = new Stereo() ){

    const edgeLength = 10000;
    const geometry = this.createGeometry( edgeLength );
    const material = this.createEquiShaderMaterial();

    VideoPanorama.call( this, src, {}, geometry, material );

    this.edgeLength = edgeLength;
    this.stereo = stereo;

}

StereoVideoPanorama.prototype = Object.assign( Object.create( VideoPanorama.prototype ), {

    constructor: StereoVideoPanorama,

    /**
     * Create a skybox geometry
     * @memberOf StereoVideoPanorama
     * @instance
     */
    createGeometry: function ( edgeLength ) {

        return new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );

    },

    /**
     * Create equirectangular shader material
     * @param {THREE.Vector2} [repeat=new THREE.Vector2( 1, 1 )] - Texture Repeat
     * @param {THREE.Vector2} [offset=new THREE.Vector2( 0, 0 )] - Texture Offset
     * @memberOf StereoVideoPanorama
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
     * This will be called when video texture is ready
     * @param  {THREE.VideoTexture} texture - Video texture
     * @memberOf StereoVideoPanorama
     * @instance
     */
    onLoad: function ( texture ) {

        const { videoWidth, videoHeight } = texture.image;
        let format = null;

        if ( videoWidth / videoHeight === 4 ) { 
            
            format = STEREOFORMAT.SBS;
        
        } else { 

            format = STEREOFORMAT.TAB;
        
        }

        this.stereo.updateUniformByFormat( format, this.material.uniforms );

        this.material.uniforms[ 'tEquirect' ].value = texture;

        VideoPanorama.prototype.onLoad.call( this );

    },

    /**
     * Update Texture for Stereo Left Eye
     * @memberOf StereoVideoPanorama
     * @instance
     */
    updateTextureToLeft: function() {

        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

    },

    /**
     * Update Texture for Stereo Right Eye
     * @memberOf StereoVideoPanorama
     * @instance
     */
    updateTextureToRight: function() {

        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

    },

    /**
     * Dispose
     * @memberOf StereoVideoPanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tEquirect;

        if ( value instanceof THREE.Texture ) {

            value.dispose();

        }

        VideoPanorama.prototype.dispose.call( this );

    }

} );

export { StereoVideoPanorama };