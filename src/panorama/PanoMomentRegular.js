import * as THREE from 'three';
import { PanoMoment } from './PanoMoment';
import { BackgroundShader } from '../shaders/BackgroundShader';

function PanoMomentRegular ( identifier ) {

    PanoMoment.call( this, identifier );

    this.scale2D = new THREE.Vector2( 1, 1 );

}

PanoMomentRegular.prototype = Object.assign( Object.create( PanoMoment.prototype ), {

    constructor: PanoMomentRegular,

    /**
     * When window is resized
     */
    onWindowResize: function() {

        this.update2DGeometryScale( false );

    },

    /**
     * Create Plane Geometry for Regular PanoMoment
     */
    createGeometry: function () {

        return new THREE.PlaneBufferGeometry( 1, 1 );
        
    },

    /**
     * Create Background Shader Material for Regular PanoMoment
     */
    createMaterial: function ( repeat = new THREE.Vector2( 1, 1 ), offset = new THREE.Vector2( 0, 0 ) ) {

        const { fragmentShader, vertexShader } = BackgroundShader;
        const uniforms = THREE.UniformsUtils.clone( BackgroundShader.uniforms );
        
        uniforms.repeat.value.copy( repeat );
        uniforms.offset.value.copy( offset );
        uniforms.opacity.value = 0.0;

        const material = new THREE.ShaderMaterial( {

            fragmentShader,
            vertexShader,
            uniforms,
            transparent: true
    
        } );

        return material;
    },

    /**
     * Update 2D Geometry Scale
     * @param [reset=false] whether to reset scale
     */
    update2DGeometryScale: function ( reset = false ) {

        if ( !this.momentData ) return;

        // reset geometric scale
        this.geometry.scale( 1 / this.scale2D.x, 1 / this.scale2D.y, 1 );

        if ( reset ) {

            this.scale2D.set( 1, 1 );
            return;

        }

        const { momentData: { aspect_ratio } } = this;

        const { fov, aspect } = this.camera;
        const scale = 2 * Math.tan( fov * Math.PI / 360 ) * Math.min( aspect_ratio, aspect );
 
        // update geometric scale
        this.scale2D.set( scale, scale / aspect_ratio );
        this.geometry.scale( this.scale2D.x, this.scale2D.y, 1 );

    },

    /**
     * Enter Panorama
     */
    enter: function() {

        this.position.set( 0, 0, -1 );
        this._parent = this.parent;
        this.camera.add( this );

        this.update2DGeometryScale();

        PanoMoment.prototype.enter.call( this );

    },

    /**
     * Enter Panorama
     */
    leave: function() {

        this.position.set( 0, 0, 0 );
        this._parent.add( this );
        delete this._parent;

        PanoMoment.prototype.leave.call( this );

    }

} );

export { PanoMomentRegular };