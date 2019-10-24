import { ImagePanorama } from './ImagePanorama';
import { Infospot } from '../infospot/Infospot';
import { CONTROLS } from '../Constants';
import { StereographicShader } from '../shaders/StereographicShader';
import * as THREE from 'three';

/**
 * @classdesc Little Planet
 * @constructor
 * @param {string} type 		- Type of little planet basic class
 * @param {string} source 		- URL for the image source
 * @param {number} [size=10000] - Size of plane geometry
 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
 */
function LittlePlanet ( type = 'image', source, size = 10000, ratio = 0.5 ) {

    if ( type === 'image' ) {

        ImagePanorama.call( this, source, this.createGeometry( size, ratio ), this.createMaterial( size ) );

    }

    this.size = size;
    this.ratio = ratio;
    this.EPS = 0.000001;
    this.frameId = null;

    this.dragging = false;
    this.userMouse = new THREE.Vector2();

    this.quatA = new THREE.Quaternion();
    this.quatB = new THREE.Quaternion();
    this.quatCur = new THREE.Quaternion();
    this.quatSlerp = new THREE.Quaternion();

    this.vectorX = new THREE.Vector3( 1, 0, 0 );
    this.vectorY = new THREE.Vector3( 0, 1, 0 );

    this.addEventListener( 'window-resize', this.onWindowResize );

}

LittlePlanet.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

    constructor: LittlePlanet,

    add: function ( object ) {

        if ( arguments.length > 1 ) {
			
            for ( let i = 0; i < arguments.length; i ++ ) {

                this.add( arguments[ i ] );

            }

            return this;

        }

        if ( object instanceof Infospot ) {

            object.material.depthTest = false;
			
        }

        ImagePanorama.prototype.add.call( this, object );

    },

    createGeometry: function ( size, ratio ) {

        return new THREE.PlaneBufferGeometry( size, size * ratio );

    },

    createMaterial: function ( size ) {

        const shader = Object.assign( {}, StereographicShader ), uniforms = shader.uniforms;

        uniforms.zoom.value = size;
        uniforms.opacity.value = 0.0;

        return new THREE.ShaderMaterial( {

            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            side: THREE.BackSide,
            transparent: true

        } );
		
    },

    registerMouseEvents: function () {

        this.container.addEventListener( 'mousedown', this.onMouseDown.bind( this ), { passive: true } );
        this.container.addEventListener( 'mousemove', this.onMouseMove.bind( this ), { passive: true } );
        this.container.addEventListener( 'mouseup', this.onMouseUp.bind( this ), { passive: true } );
        this.container.addEventListener( 'touchstart', this.onMouseDown.bind( this ), { passive: true } );
        this.container.addEventListener( 'touchmove', this.onMouseMove.bind( this ), { passive: true } );
        this.container.addEventListener( 'touchend', this.onMouseUp.bind( this ), { passive: true } );
        this.container.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), { passive: false } );
        this.container.addEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), { passive: false } );
        this.container.addEventListener( 'contextmenu', this.onContextMenu.bind( this ), { passive: true } );
		
    },

    unregisterMouseEvents: function () {

        this.container.removeEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
        this.container.removeEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
        this.container.removeEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
        this.container.removeEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
        this.container.removeEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
        this.container.removeEventListener( 'touchend', this.onMouseUp.bind( this ), false );
        this.container.removeEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
        this.container.removeEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
        this.container.removeEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
		
    },

    onMouseDown: function ( event ) {

        const inputCount = ( event.touches && event.touches.length ) || 1 ;

        switch ( inputCount ) {

        case 1:

            const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
            const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

            this.dragging = true;
            this.userMouse.set( x, y );

            break;

        case 2:

            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            const distance = Math.sqrt( dx * dx + dy * dy );
            this.userMouse.pinchDistance = distance;

            break;

        default:

            break;

        }

        this.onUpdateCallback();

    },

    onMouseMove: function ( event ) {

        const inputCount = ( event.touches && event.touches.length ) || 1 ;

        switch ( inputCount ) {

        case 1:

            const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
            const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

            const angleX = THREE.Math.degToRad( x - this.userMouse.x ) * 0.4;
            const angleY = THREE.Math.degToRad( y - this.userMouse.y ) * 0.4;

            if ( this.dragging ) {
                this.quatA.setFromAxisAngle( this.vectorY, angleX );
                this.quatB.setFromAxisAngle( this.vectorX, angleY );
                this.quatCur.multiply( this.quatA ).multiply( this.quatB );
                this.userMouse.set( x, y );
            }

            break;

        case 2:

            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            const distance = Math.sqrt( dx * dx + dy * dy );

            this.addZoomDelta( this.userMouse.pinchDistance - distance );

            break;

        default:

            break;

        }

    },

    onMouseUp: function () {

        this.dragging = false;

    },

    onMouseWheel: function ( event ) {

        event.preventDefault();
        event.stopPropagation();

        let delta = 0;

        if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if ( event.detail !== undefined ) { // Firefox

            delta = - event.detail;

        }

        this.addZoomDelta( delta );
        this.onUpdateCallback();

    },

    addZoomDelta: function ( delta ) {

        const uniforms = this.material.uniforms;
        const lowerBound = this.size * 0.1;
        const upperBound = this.size * 10;

        uniforms.zoom.value += delta;

        if ( uniforms.zoom.value <= lowerBound ) {

            uniforms.zoom.value = lowerBound;

        } else if ( uniforms.zoom.value >= upperBound ) {

            uniforms.zoom.value = upperBound;

        }

    },

    onUpdateCallback: function () {

        this.frameId = window.requestAnimationFrame( this.onUpdateCallback.bind( this ) );

        this.quatSlerp.slerp( this.quatCur, 0.1 );

        if ( this.material ) {

            this.material.uniforms.transform.value.makeRotationFromQuaternion( this.quatSlerp );

        }
        
        if ( !this.dragging && 1.0 - this.quatSlerp.clone().dot( this.quatCur ) < this.EPS ) {
			
            window.cancelAnimationFrame( this.frameId );

        }

    },

    reset: function () {

        this.quatCur.set( 0, 0, 0, 1 );
        this.quatSlerp.set( 0, 0, 0, 1 );
        this.onUpdateCallback();

    },

    onLoad: function ( texture ) {

        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

        this.registerMouseEvents();
        this.onUpdateCallback();
		
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' } );

        ImagePanorama.prototype.onLoad.call( this, texture );
		
    },

    onLeave: function () {

        this.unregisterMouseEvents();

        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: CONTROLS.ORBIT } );

        window.cancelAnimationFrame( this.frameId );

        ImagePanorama.prototype.onLeave.call( this );
		
    },

    onWindowResize: function () {

        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

    },

    onContextMenu: function () {

        this.dragging = false;

    },

    dispose: function () {	

        this.unregisterMouseEvents();

        ImagePanorama.prototype.dispose.call( this );

    }

});

export { LittlePlanet };