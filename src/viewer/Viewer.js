import { MODES, CONTROLS } from '../Constants';
import { OrbitControls } from '../lib/controls/OrbitControls';
import { DeviceOrientationControls } from '../lib/controls/DeviceOrientationControls';
import { CardboardEffect } from '../lib/effects/CardboardEffect';
import { StereoEffect } from '../lib/effects/StereoEffect';
import { Widget } from '../widget/Widget';
import { Reticle } from '../interface/Reticle';
import { Infospot } from '../infospot/Infospot';
import { DataImage } from '../DataImage';
import { Panorama } from '../panorama/Panorama';
import { VideoPanorama } from '../panorama/VideoPanorama';
import { isAndroid } from '../utils/Utility';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

/**
 * @classdesc Viewer contains pre-defined scene, camera and renderer
 * @constructor
 * @param {object} [options] - Use custom or default config options
 * @param {HTMLElement} [options.container] - A HTMLElement to host the canvas
 * @param {THREE.Scene} [options.scene=THREE.Scene] - A THREE.Scene which contains panorama and 3D objects
 * @param {THREE.Camera} [options.camera=THREE.PerspectiveCamera] - A THREE.Camera to view the scene
 * @param {THREE.WebGLRenderer} [options.renderer=THREE.WebGLRenderer] - A THREE.WebGLRenderer to render canvas
 * @param {boolean} [options.controlBar=true] - Show/hide control bar on the bottom of the container
 * @param {array}   [options.controlButtons=[]] - Button names to mount on controlBar if controlBar exists, Defaults to ['fullscreen', 'setting', 'video']
 * @param {boolean} [options.autoHideControlBar=false] - Auto hide control bar when click on non-active area
 * @param {boolean} [options.autoHideInfospot=true] - Auto hide infospots when click on non-active area
 * @param {boolean} [options.horizontalView=false] - Allow only horizontal camera control
 * @param {number}  [options.clickTolerance=10] - Distance tolerance to tigger click / tap event
 * @param {number}  [options.cameraFov=60] - Camera field of view value
 * @param {boolean} [options.enableReticle=false] - Enable reticle for mouseless interaction other than VR mode
 * @param {number}  [options.dwellTime=1500] - Dwell time for reticle selection in ms
 * @param {boolean} [options.autoReticleSelect=true] - Auto select a clickable target after dwellTime
 * @param {boolean} [options.viewIndicator=false] - Adds an angle view indicator in upper left corner
 * @param {number}  [options.indicatorSize=30] - Size of View Indicator
 * @param {string}  [options.output=null] - Whether and where to output raycast position. Could be 'console' or 'overlay'
 * @param {boolean} [options.autoRotate=false] - Auto rotate
 * @param {number}  [options.autoRotateSpeed=2.0] - Auto rotate speed as in degree per second. Positive is counter-clockwise and negative is clockwise.
 * @param {number}  [options.autoRotateActivationDuration=5000] - Duration before auto rotatation when no user interactivity in ms
 * @param {THREE.Vector3} [options.initialLookAt=new THREE.Vector3( 0, 0, -Number.MAX_SAFE_INTEGER )] - Initial looking at vector
 * @param {boolean} [options.momentum=true] - Use momentum even during mouse/touch move
 * @param {number} [options.rotateSpeed=-1.0] - Drag Rotation Speed
 * @param {number} [options.dampingFactor=.1] - Damping factor
 */
function Viewer ( options = {} ) {

    this.options = Object.assign( {

        container: this.setupContainer( options.container ),
        controlBar: true,
        controlButtons: [ 'fullscreen', 'setting', 'video' ],
        autoHideControlBar: false,
        autoHideInfospot: true,
        horizontalView: false,
        clickTolerance: 10,
        cameraFov: 60,
        reverseDragging: false,
        enableReticle: false,
        dwellTime: 1500,
        autoReticleSelect: true,
        viewIndicator: false,
        indicatorSize: 30,
        output: null,
        autoRotate: false,
        autoRotateSpeed: 2.0,
        autoRotateActivationDuration: 5000,
        initialLookAt: new THREE.Vector3( 0, 0, -Number.MAX_SAFE_INTEGER ),
        momentum: true,
        rotateSpeed: -1.0,
        dampingFactor: 0.1

    }, options );

    const { container, cameraFov, controlBar, controlButtons, viewIndicator, indicatorSize, enableReticle, reverseDragging, output, scene, camera, renderer } = this.options;
    const { clientWidth, clientHeight } = container;

    this.container = container;
    this.scene = this.setupScene( scene );
    this.sceneReticle = new THREE.Scene();
    this.camera = this.setupCamera( cameraFov, clientWidth / clientHeight, camera );
    this.renderer = this.setupRenderer( renderer, container );
    this.reticle = this.addReticle( this.camera, this.sceneReticle );
    this.control = this.setupControls( this.camera, container );
    this.effect = this.setupEffects( this.renderer, container );

    this.mode = MODES.NORMAL;
    this.panorama = null;
    this.widget = null;
    this.hoverObject = null;
    this.infospot = null;
    this.pressEntityObject = null;
    this.pressObject = null;
    this.raycaster = new THREE.Raycaster();
    this.raycasterPoint = new THREE.Vector2();
    this.userMouse = new THREE.Vector2();
    this.updateCallbacks = [];
    this.requestAnimationId = null;
    this.cameraFrustum = new THREE.Frustum();
    this.cameraViewProjectionMatrix = new THREE.Matrix4();
    this.autoRotateRequestId = null;
    this.outputDivElement = null;
    this.touchSupported = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
    this.tweenLeftAnimation = new TWEEN.Tween();
    this.tweenUpAnimation = new TWEEN.Tween();
    this.tweenCanvasOpacityOut = new TWEEN.Tween();
    this.tweenCanvasOpacityIn = new TWEEN.Tween();
    this.outputEnabled = false;
    this.viewIndicatorSize = indicatorSize;
    this.tempEnableReticle = enableReticle;

    this.setupTween();

    this.handlerMouseUp = this.onMouseUp.bind( this );
    this.handlerMouseDown = this.onMouseDown.bind( this );
    this.handlerMouseMove = this.onMouseMove.bind( this );
    this.handlerWindowResize = this.onWindowResize.bind( this );
    this.handlerKeyDown = this.onKeyDown.bind( this );
    this.handlerKeyUp = this.onKeyUp.bind( this );
    this.handlerTap = this.onTap.bind( this, { clientX: clientWidth / 2, clientY: clientHeight / 2 } );

    if ( controlBar ) this.addDefaultControlBar( controlButtons );
    if ( viewIndicator ) this.addViewIndicator();
    if ( reverseDragging ) this.reverseDraggingDirection();
    if ( enableReticle ) this.enableReticleControl(); else this.registerMouseAndTouchEvents(); 
    if ( output === 'overlay' ) this.addOutputElement();

    this.registerEventListeners();

    this.animate.call( this );

};

Viewer.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

    constructor: Viewer,

    setupScene: function ( scene = new THREE.Scene() ) {

        return scene;

    },

    setupCamera: function ( cameraFov, ratio, camera = new THREE.PerspectiveCamera( cameraFov, ratio, 1, 10000 ) ) {

        return camera;

    },

    setupRenderer: function ( renderer = new THREE.WebGLRenderer( { alpha: true, antialias: false } ), container ) {

        const { clientWidth, clientHeight } = container;

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( clientWidth, clientHeight );
        renderer.setClearColor( 0x000000, 0 );
        renderer.autoClear = false;
        renderer.domElement.classList.add( 'panolens-canvas' );
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.transition = 'opacity 0.5s ease';
        container.style.backgroundColor = '#000';
        container.appendChild( renderer.domElement );

        return renderer;

    },

    setupControls: function ( camera, container ) {

        const { autoRotate, autoRotateSpeed, horizontalView, momentum, rotateSpeed, dampingFactor } = this.options;

        const orbit = new OrbitControls( camera, container );
        orbit.id = 'orbit';
        orbit.index = CONTROLS.ORBIT;
        orbit.minDistance = 1;
        orbit.noPan = true;
        orbit.autoRotate = autoRotate;
        orbit.autoRotateSpeed = autoRotateSpeed;
        orbit.momentum = momentum;
        orbit.rotateSpeed = rotateSpeed;
        orbit.dampingFactor = dampingFactor;

        if ( horizontalView ) {

            orbit.minPolarAngle = Math.PI / 2;
            orbit.maxPolarAngle = Math.PI / 2;

        }

        const orient = new DeviceOrientationControls( camera );
        orient.id = 'device-orientation';
        orient.index = CONTROLS.DEVICEORIENTATION;
        orient.enabled = false;

        this.controls = [ orbit, orient ];
        this.OrbitControls = orbit;
        this.DeviceOrientationControls = orient;

        return orbit;
 
    },

    setupEffects: function ( renderer, { clientWidth, clientHeight } ) {

        const cardboard = new CardboardEffect( renderer );
        cardboard.setSize( clientWidth, clientHeight );

        const stereo = new StereoEffect( renderer );
        stereo.setSize( clientWidth, clientHeight );

        this.CardboardEffect = cardboard;
        this.StereoEffect = stereo;

        return cardboard;

    },

    setupContainer: function ( container ) {

        if ( container ) {

            container._width = container.clientWidth;
            container._height = container.clientHeight;

            return container;

        } else {

            const element = document.createElement( 'div' );
            element.classList.add( 'panolens-container' );
            element.style.width = '100%';
            element.style.height = '100%';
            document.body.appendChild( element );
            
            return element;
            
        }

    },

    setupTween: function() {

        this.tweenCanvasOpacityOut.to({}, 500).easing(TWEEN.Easing.Exponential.Out);
        this.tweenCanvasOpacityIn.to({}, 500).easing(TWEEN.Easing.Exponential.Out);

        this.tweenCanvasOpacityOut.chain(this.tweenCanvasOpacityIn);

    },

    /**
     * Add an object to the scene
     * Automatically hookup with panolens-viewer-handler listener
     * to communicate with viewer method
     * @param {THREE.Object3D} object - The object to be added
     * @memberOf Viewer
     * @instance
     */
    add: function ( object ) {

        const { container, scene, camera, controls } = this;

        if ( arguments.length > 1 ) {

            for ( let i = 0; i < arguments.length; i ++ ) {

                this.add( arguments[ i ] );

            }

            return this;

        }

        scene.add( object );

        // All object added to scene has 'panolens-viewer-handler' event to handle viewer communication
        if ( object.addEventListener ) {

            object.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

        }

        if ( object instanceof Panorama ) {

            // Dispatch viewer variables to panorama
            object.dispatchEvent( { type: 'panolens-container', container } );
            object.dispatchEvent( { type: 'panolens-scene', scene } );
            object.dispatchEvent( { type: 'panolens-camera', camera } );
            object.dispatchEvent( { type: 'panolens-controls', controls } );

            // Hookup default panorama event listeners
            this.addPanoramaEventListener( object );

            if ( !this.panorama ) {

                const { initialLookAt } = this.options;

                this.setPanorama( object );
                this.setControlCenter( initialLookAt );

            }

        }

    },

    /**
     * Remove an object from the scene
     * @param  {THREE.Object3D} object - Object to be removed
     * @memberOf Viewer
     * @instance
     */
    remove: function ( object ) {

        if ( object.removeEventListener ) {

            object.removeEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

        }

        this.scene.remove( object );

    },

    /**
     * Add default control bar
     * @param {array} array - The control buttons array
     * @memberOf Viewer
     * @instance
     */
    addDefaultControlBar: function ( array ) {

        if ( this.widget ) {

            console.warn( 'Default control bar exists' );
            return;

        }

        const widget = new Widget( this.container );
        widget.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );
        widget.addControlBar();
        array.forEach( buttonName => {

            widget.addControlButton( buttonName );

        } );

        this.widget = widget;

    },

    /**
     * Set a panorama to be the current one
     * @param {Panorama} pano - Panorama to be set
     * @memberOf Viewer
     * @instance
     */
    setPanorama: function ( ep ) {

        const lp = this.panorama;

        if ( ep instanceof Panorama && lp !== ep ) {

            // Clear exisiting infospot
            this.hideInfospot();

            const onSwitch = () => {

                if ( lp ) { 
                    
                    lp.onLeave(); 
                
                } else {

                    ep.fadeIn();

                }

            };

            if ( lp ) {

                const onLeaveComplete = () => {

                    ep.fadeIn();
                    lp.removeEventListener( 'leave-complete', onLeaveComplete );
    
                };

                lp.addEventListener( 'leave-complete', onLeaveComplete );

            }

            const onReady = () => {

                onSwitch();
                ep.removeEventListener( 'ready', onReady );

            };

            ep.addEventListener( 'ready', onReady );

            this.panorama = ep;
            this.panorama.onEnter();
			
        }

    },

    /**
     * Event handler to execute commands from child objects
     * @param {object} event - The dispatched event with method as function name and data as an argument
     * @memberOf Viewer
     * @instance
     */
    eventHandler: function ( event ) {

        if ( event.method && this[ event.method ] ) {

            this[ event.method ]( event.data );

        }

    },

    /**
     * Dispatch event to all descendants
     * @param  {object} event - Event to be passed along
     * @memberOf Viewer
     * @instance
     */
    dispatchEventToChildren: function ( event ) {

        this.scene.traverse( function ( object ) {

            if ( object.dispatchEvent ) {

                object.dispatchEvent( event );

            }

        });

    },

    /**
     * Set widget content
     * @method activateWidgetItem
     * @param  {integer} controlIndex - Control index
     * @param  {integer} mode - Modes for effects
     * @memberOf Viewer
     * @instance
     */
    activateWidgetItem: function ( controlIndex, mode ) {

        const mainMenu = this.widget.mainMenu;
        const ControlMenuItem = mainMenu.children[ 0 ];
        const ModeMenuItem = mainMenu.children[ 1 ];

        let item;

        if ( controlIndex !== undefined ) {

            switch ( controlIndex ) {

            case 0:

                item = ControlMenuItem.subMenu.children[ 1 ];

                break;

            case 1:

                item = ControlMenuItem.subMenu.children[ 2 ];

                break;
					
            default:

                item = ControlMenuItem.subMenu.children[ 1 ];

                break;	

            }

            ControlMenuItem.subMenu.setActiveItem( item );
            ControlMenuItem.setSelectionTitle( item.textContent );

        }

        if ( mode !== undefined ) {

            switch( mode ) {

            case MODES.CARDBOARD:

                item = ModeMenuItem.subMenu.children[ 2 ];

                break;

            case MODES.STEREO:

                item = ModeMenuItem.subMenu.children[ 3 ];
					
                break;

            default:

                item = ModeMenuItem.subMenu.children[ 1 ];

                break;
            }

            ModeMenuItem.subMenu.setActiveItem( item );
            ModeMenuItem.setSelectionTitle( item.textContent );

        }

    },

    /**
     * Enable rendering effect
     * @param  {MODES} mode - Modes for effects
     * @memberOf Viewer
     * @instance
     */
    enableEffect: function ( mode ) {

        if ( this.mode === mode ) { return; }
        if ( mode === MODES.NORMAL ) { this.disableEffect(); return; }
        else { this.mode = mode; }

        const fov = this.camera.fov;

        switch( mode ) {

        case MODES.CARDBOARD:

            this.effect = this.CardboardEffect;
            this.enableReticleControl();

            break;

        case MODES.STEREO:

            this.effect = this.StereoEffect;
            this.enableReticleControl();
				
            break;

        default:

            this.effect = null;
            this.disableReticleControl();

            break;

        }

        this.activateWidgetItem( undefined, this.mode );

        /**
         * Dual eye effect event
         * @type {object}
         * @event Infospot#panolens-dual-eye-effect
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

        // Force effect stereo camera to update by refreshing fov
        this.camera.fov = fov + 10e-3;
        this.effect.setSize( this.container.clientWidth, this.container.clientHeight );
        this.render();
        this.camera.fov = fov;

        /**
         * Dispatch mode change event
         * @type {object}
         * @event Viewer#mode-change
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEvent( { type: 'mode-change', mode: this.mode } );

    },

    /**
     * Disable additional rendering effect
     * @memberOf Viewer
     * @instance
     */
    disableEffect: function () {

        if ( this.mode === MODES.NORMAL ) { return; }

        this.mode = MODES.NORMAL;
        this.disableReticleControl();

        this.activateWidgetItem( undefined, this.mode );

        /**
         * Dual eye effect event
         * @type {object}
         * @event Infospot#panolens-dual-eye-effect
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

        this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
        this.render();

        /**
         * Dispatch mode change event
         * @type {object}
         * @event Viewer#mode-change
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEvent( { type: 'mode-change', mode: this.mode } );
    },

    /**
     * Enable reticle control
     * @memberOf Viewer
     * @instance
     */
    enableReticleControl: function () {

        if ( this.reticle.visible ) { return; }

        this.tempEnableReticle = true;

        // Register reticle event and unregister mouse event
        this.unregisterMouseAndTouchEvents();
        this.reticle.show();
        this.registerReticleEvent();
        this.updateReticleEvent();

    },

    /**
     * Disable reticle control
     * @memberOf Viewer
     * @instance
     */
    disableReticleControl: function () {

        this.tempEnableReticle = false;

        // Register mouse event and unregister reticle event
        if ( !this.options.enableReticle ) {

            this.reticle.hide();
            this.unregisterReticleEvent();
            this.registerMouseAndTouchEvents();

        } else {

            this.updateReticleEvent();

        }

    },

    /**
     * Enable auto rotation
     * @memberOf Viewer
     * @instance
     */
    enableAutoRate: function () {

        this.options.autoRotate = true;
        this.OrbitControls.autoRotate = true;

    },

    /**
     * Disable auto rotation
     * @memberOf Viewer
     * @instance
     */
    disableAutoRate: function () {

        clearTimeout( this.autoRotateRequestId );
        this.options.autoRotate = false;
        this.OrbitControls.autoRotate = false;

    },

    /**
     * Toggle video play or stop
     * @param {boolean} pause
     * @memberOf Viewer
     * @instance
     * @fires Viewer#video-toggle
     */
    toggleVideoPlay: function ( pause ) {

        if ( this.panorama instanceof VideoPanorama ) {

            /**
             * Toggle video event
             * @type {object}
             * @event Viewer#video-toggle
             */
            this.panorama.dispatchEvent( { type: 'video-toggle', pause: pause } );

        }

    },

    /**
     * Set currentTime in a video
     * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
     * @memberOf Viewer
     * @instance
     * @fires Viewer#video-time
     */
    setVideoCurrentTime: function ( percentage ) {

        if ( this.panorama instanceof VideoPanorama ) {

            /**
             * Setting video time event
             * @type {object}
             * @event Viewer#video-time
             * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
             */
            this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

        }

    },

    /**
     * This will be called when video updates if an widget is present
     * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
     * @memberOf Viewer
     * @instance
     * @fires Viewer#video-update
     */
    onVideoUpdate: function ( percentage ) {

        const { widget } = this;

        /**
         * Video update event
         * @type {object}
         * @event Viewer#video-update
         * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
         */
        if( widget ) { widget.dispatchEvent( { type: 'video-update', percentage: percentage } ); }

    },

    /**
     * Add update callback to be called every animation frame
     * @param {function} callback
     * @memberOf Viewer
     * @instance
     */
    addUpdateCallback: function ( fn ) {

        if ( fn ) {

            this.updateCallbacks.push( fn );

        }

    },

    /**
     * Remove update callback
     * @param  {function} fn - The function to be removed
     * @memberOf Viewer
     * @instance
     */
    removeUpdateCallback: function ( fn ) {

        const index = this.updateCallbacks.indexOf( fn );

        if ( fn && index >= 0 ) {

            this.updateCallbacks.splice( index, 1 );

        }

    },

    /**
     * Show video widget
     * @memberOf Viewer
     * @instance
     */
    showVideoWidget: function () {

        const { widget } = this;

        /**
         * Show video widget event
         * @type {object}
         * @event Viewer#video-control-show
         */
        if( widget ) { widget.dispatchEvent( { type: 'video-control-show' } ); }

    },

    /**
     * Hide video widget
     * @memberOf Viewer
     * @instance
     */
    hideVideoWidget: function () {

        const { widget } = this;

        /**
         * Hide video widget
         * @type {object}
         * @event Viewer#video-control-hide
         */
        if( widget ) { widget.dispatchEvent( { type: 'video-control-hide' } ); }

    },

    /**
     * Update video play button
     * @param {boolean} paused 
     * @memberOf Viewer
     * @instance
     */
    updateVideoPlayButton: function ( paused ) {

        const { widget } = this;

        if ( widget && widget.videoElement && widget.videoElement.controlButton ) {

            widget.videoElement.controlButton.update( paused );

        }

    },

    /**
     * Add default panorama event listeners
     * @param {Panorama} pano - The panorama to be added with event listener
     * @memberOf Viewer
     * @instance
     */
    addPanoramaEventListener: function ( pano ) {

        // Set camera control on every panorama
        pano.addEventListener( 'enter', this.setCameraControl.bind( this ) );

        // Show and hide widget event only when it's VideoPanorama
        if ( pano instanceof VideoPanorama ) {

            pano.addEventListener( 'enter-fade-start', this.showVideoWidget.bind( this ) );
            pano.addEventListener( 'leave', function () {

                if ( !(this.panorama instanceof VideoPanorama) ) {

                    this.hideVideoWidget.call( this );

                }
				
            }.bind( this ) );

        }

    },

    /**
     * Set camera control
     * @memberOf Viewer
     * @instance
     */
    setCameraControl: function () {

        if( this.panorama ) this.OrbitControls.target.copy( this.panorama.position );

    },

    /**
     * Get current camera control
     * @return {object} - Current navigation control
     * @memberOf Viewer
     * @instance
     * @returns {THREE.OrbitControls|THREE.DeviceOrientationControls}
     */
    getControl: function () {

        return this.control;

    },

    /**
     * Get scene
     * @memberOf Viewer
     * @instance
     * @return {THREE.Scene} - Current scene which the viewer is built on
     */
    getScene: function () {

        return this.scene;

    },

    /**
     * Get camera
     * @memberOf Viewer
     * @instance
     * @return {THREE.Camera} - The scene camera
     */
    getCamera: function () {

        return this.camera;

    },

    /**
     * Get renderer
     * @memberOf Viewer
     * @instance
     * @return {THREE.WebGLRenderer} - The renderer using webgl
     */
    getRenderer: function () {

        return this.renderer;

    },

    /**
     * Get container
     * @memberOf Viewer
     * @instance
     * @return {HTMLElement} - The container holds rendererd canvas
     */
    getContainer: function () {

        return this.container;

    },

    /**
     * Get control id
     * @memberOf Viewer
     * @instance
     * @return {string} - Control id. 'orbit' or 'device-orientation'
     */
    getControlId: function () {

        return this.control.id;

    },

    /**
     * Get next navigation control id
     * @memberOf Viewer
     * @instance
     * @return {string} - Next control id
     */
    getNextControlId: function () {

        return this.controls[ this.getNextControlIndex() ].id;

    },

    /**
     * Get next navigation control index
     * @memberOf Viewer
     * @instance
     * @return {number} - Next control index
     */
    getNextControlIndex: function () {

        const controls = this.controls;
        const control = this.control;
        const nextIndex = controls.indexOf( control ) + 1;

        return ( nextIndex >= controls.length ) ? 0 : nextIndex;

    },

    /**
     * Set field of view of camera
     * @param {number} fov
     * @memberOf Viewer
     * @instance
     */
    setCameraFov: function ( fov ) {

        this.camera.fov = fov;
        this.camera.updateProjectionMatrix();

    },

    /**
     * Get raycasted point of current panorama
     * @memberof Viewer
     * @instance
     * @returns {THREE.Vector3}
     */
    getRaycastViewCenter: function () {

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( new THREE.Vector2( 0, 0 ), this.camera );
        const intersect = raycaster.intersectObject( this.panorama );

        return intersect.length > 0 ? intersect[ 0 ].point : new THREE.Vector3( 0, 0, -1 );

    },

    /**
     * Enable control by index
     * @param  {CONTROLS} index - Index of camera control
     * @memberOf Viewer
     * @instance
     */
    enableControl: function ( index = CONTROLS.ORBIT ) {

        const { control: { index: currentControlIndex }, OrbitControls, DeviceOrientationControls, container } = this;
        const canvas = container.querySelector('canvas');

        if( index === currentControlIndex ) {                   // ignore

            return;

        } else if( index === CONTROLS.DEVICEORIENTATION ) {     // device orientation

            this.tweenCanvasOpacityOut.onStart(() => {
                OrbitControls.enabled = false;
                DeviceOrientationControls.enabled = false;
                canvas.style.opacity = 0;
            });

            this.tweenCanvasOpacityIn.onStart(() => {
                OrbitControls.enabled = true;
                DeviceOrientationControls.connect();
                canvas.style.opacity = 1;
            });

            this.tweenCanvasOpacityOut.start();


        } else {

            const { getAlpha, getBeta } = DeviceOrientationControls;
            const alpha = -getAlpha();
            const beta = Math.PI / 2 - getBeta();
            const center = this.getRaycastViewCenter();

            this.tweenCanvasOpacityOut.onStart(() => {
                OrbitControls.enabled = false;
                DeviceOrientationControls.disconnect();
                canvas.style.opacity = 0;
            });

            this.tweenCanvasOpacityIn.onStart(function() {
                OrbitControls.enabled = true;
                this.rotateControlLeft(alpha);
                this.rotateControlUp(beta);
                this.setControlCenter(center);
                canvas.style.opacity = 1;
            }.bind(this));

            this.tweenCanvasOpacityOut.start();

        }

        this.control = this.controls[ index ];
        this.activateWidgetItem( index, undefined );

    },

    /**
     * Disable current control
     * @memberOf Viewer
     * @instance
     */
    disableControl: function () {

        this.control.enabled = false;

    },

    /**
     * Toggle next control
     * @memberOf Viewer
     * @instance
     */
    toggleNextControl: function () {

        this.enableControl( this.getNextControlIndex() );

    },

    /**
     * Screen Space Projection
     * @memberOf Viewer
     * @instance
     */
    getScreenVector: function ( worldVector ) {

        const vector = worldVector.clone();
        const widthHalf = ( this.container.clientWidth ) / 2;
        const heightHalf = this.container.clientHeight / 2;

        vector.project( this.camera );

        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;
        vector.z = 0;

        return vector;

    },

    /**
     * Check Sprite in Viewport
     * @memberOf Viewer
     * @instance
     */
    checkSpriteInViewport: function ( sprite ) {

        this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
        this.cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
        this.cameraFrustum.setFromMatrix( this.cameraViewProjectionMatrix );

        return sprite.visible && this.cameraFrustum.intersectsSprite( sprite );

    },

    /**
     * Reverse dragging direction
     * @memberOf Viewer
     * @instance
     */
    reverseDraggingDirection: function () {

        console.warn('reverseDragging option is deprecated. Please use rotateSpeed to indicate strength and direction');
        this.OrbitControls.rotateSpeed *= -1;

    },

    /**
     * Add reticle 
     * @memberOf Viewer
     * @instance
     */
    addReticle: function ( camera, sceneReticle ) {

        const reticle = new Reticle( 0xffffff, true, this.options.dwellTime );
        reticle.hide();
        camera.add( reticle );
        sceneReticle.add( camera );

        return reticle;

    },

    rotateControlLeft: function ( left ) {

        this.OrbitControls.rotateLeftStatic( left );

    },

    rotateControlUp: function ( up ) {

        this.OrbitControls.rotateUpStatic( up );

    },

    rotateOrbitControl: function ( left, up ) {

        this.rotateControlLeft( left );
        this.rotateControlUp( up );

    },

    calculateCameraDirectionDelta: function ( vector ) {

        let ha, va, chv, cvv, hv, vv, vptc;

        chv = this.camera.getWorldDirection( new THREE.Vector3() );
        cvv = chv.clone();

        vptc = this.panorama.getWorldPosition( new THREE.Vector3() ).sub( this.camera.getWorldPosition( new THREE.Vector3() ) );

        hv = vector.clone();
        hv.add( vptc ).normalize();
        vv = hv.clone();

        chv.y = 0;
        hv.y = 0;

        ha = Math.atan2( hv.z, hv.x ) - Math.atan2( chv.z, chv.x );
        ha = ha > Math.PI ? ha - 2 * Math.PI : ha;
        ha = ha < -Math.PI ? ha + 2 * Math.PI : ha;
        va = Math.abs( cvv.angleTo( chv ) + ( cvv.y * vv.y <= 0 ? vv.angleTo( hv ) : -vv.angleTo( hv ) ) );
        va *= vv.y < cvv.y ? 1 : -1;

        return { left: ha, up: va };

    },

    /**
     * Set control center
     * @param {THREE.Vector3} vector - Vector to be looked at the center
     */
    setControlCenter: function( vector = this.options.initialLookAt ) {

        const { left, up } = this.calculateCameraDirectionDelta( vector );
        this.rotateOrbitControl( left, up );

    },

    /**
     * Tween control looking center
     * @param {THREE.Vector3} vector - Vector to be looked at the center
     * @param {number} [duration=1000] - Duration to tween
     * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
     * @memberOf Viewer
     * @instance
     */
    tweenControlCenter: function ( vector, duration, easing ) {

        if ( vector instanceof Array ) {

            easing = vector[ 2 ];
            duration = vector[ 1 ];
            vector = vector[ 0 ];

        }

        duration = duration !== undefined ? duration : 1000;
        easing = easing || TWEEN.Easing.Exponential.Out;

        const { left, up } = this.calculateCameraDirectionDelta( vector );
        const rotateControlLeft = this.rotateControlLeft.bind( this );
        const rotateControlUp = this.rotateControlUp.bind( this );

        const ov = { left: 0, up: 0 };
        const nv = { left: 0, up: 0 };

        this.tweenLeftAnimation.stop();
        this.tweenUpAnimation.stop();

        this.tweenLeftAnimation = new TWEEN.Tween( ov )
            .to( { left }, duration )
            .easing( easing )
            .onUpdate(function(ov){
                rotateControlLeft( ov.left - nv.left );
                nv.left = ov.left;
            })
            .start();

        this.tweenUpAnimation = new TWEEN.Tween( ov )
            .to( { up }, duration )
            .easing( easing )
            .onUpdate(function(ov){
                rotateControlUp( ov.up - nv.up );
                nv.up = ov.up;
            })
            .start();

    },

    /**
     * Tween control looking center by object
     * @param {THREE.Object3D} object - Object to be looked at the center
     * @param {number} [duration=1000] - Duration to tween
     * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
     * @memberOf Viewer
     * @instance
     */
    tweenControlCenterByObject: function ( object, duration, easing ) {

        this.tweenControlCenter( object.getWorldPosition( new THREE.Vector3() ), duration, easing );

    },

    /**
     * This is called when window size is changed
     * @fires Viewer#window-resize
     * @param {number} [windowWidth] - Specify if custom element has changed width
     * @param {number} [windowHeight] - Specify if custom element has changed height
     * @memberOf Viewer
     * @instance
     */
    onWindowResize: function ( windowWidth, windowHeight ) {

        let width, height;

        const expand = this.container.classList.contains( 'panolens-container' ) || this.container.isFullscreen;

        if ( windowWidth !== undefined && windowHeight !== undefined ) {

            width = windowWidth;
            height = windowHeight;
            this.container._width = windowWidth;
            this.container._height = windowHeight;

        } else {

            const adjustWidth = isAndroid 
                ? Math.min(document.documentElement.clientWidth, window.innerWidth || 0) 
                : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            const adjustHeight = isAndroid 
                ? Math.min(document.documentElement.clientHeight, window.innerHeight || 0) 
                : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            width = expand ? adjustWidth : this.container.clientWidth;
            height = expand ? adjustHeight : this.container.clientHeight;

            this.container._width = width;
            this.container._height = height;

        }

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( width, height );

        // Update reticle
        if ( this.options.enableReticle || this.tempEnableReticle ) {

            this.updateReticleEvent();

        }

        /**
         * Window resizing event
         * @type {object}
         * @event Viewer#window-resize
         * @property {number} width  - Width of the window
         * @property {number} height - Height of the window
         */
        this.dispatchEvent( { type: 'window-resize', width: width, height: height });
        this.scene.traverse( function ( object ) {

            if ( object.dispatchEvent ) {

                object.dispatchEvent( { type: 'window-resize', width: width, height: height });

            }

        } );

    },

    /**
     * Add output element
     * @memberOf Viewer
     * @instance
     */
    addOutputElement: function () {

        const element = document.createElement( 'div' );
        element.style.position = 'absolute';
        element.style.right = '10px';
        element.style.top = '10px';
        element.style.color = '#fff';
        this.container.appendChild( element );
        this.outputDivElement = element;

    },

    /**
     * Output position in developer console by holding down Ctrl button
     * @memberOf Viewer
     * @instance
     */
    outputPosition: function () {

        const intersects = this.raycaster.intersectObject( this.panorama, true );

        if ( intersects.length > 0 ) {

            const point = intersects[ 0 ].point.clone();
            const world = this.panorama.getWorldPosition( new THREE.Vector3() );
            point.sub( world );

            const message = `${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)}`;

            if ( point.length() === 0 ) { return; }

            switch ( this.options.output ) {

            case 'console':
                console.info( message );
                break;

            case 'overlay':
                this.outputDivElement.textContent = message;
                break;

            default:
                break;

            }

        }

    },

    /**
     * On mouse down
     * @param {MouseEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onMouseDown: function ( event ) {

        event.preventDefault();

        this.userMouse.x = ( event.clientX >= 0 ) ? event.clientX : event.touches[0].clientX;
        this.userMouse.y = ( event.clientY >= 0 ) ? event.clientY : event.touches[0].clientY;
        this.userMouse.type = 'mousedown';
        this.onTap( event );

    },

    /**
     * On mouse move
     * @param {MouseEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onMouseMove: function ( event ) {

        event.preventDefault();
        this.userMouse.type = 'mousemove';
        this.onTap( event );

    },

    /**
     * On mouse up
     * @param {MouseEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onMouseUp: function ( event ) {

        let onTarget = false;

        this.userMouse.type = 'mouseup';

        const type = ( this.userMouse.x >= event.clientX - this.options.clickTolerance 
				&& this.userMouse.x <= event.clientX + this.options.clickTolerance
				&& this.userMouse.y >= event.clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.clientY + this.options.clickTolerance ) 
				||  ( event.changedTouches 
				&& this.userMouse.x >= event.changedTouches[0].clientX - this.options.clickTolerance
				&& this.userMouse.x <= event.changedTouches[0].clientX + this.options.clickTolerance 
				&& this.userMouse.y >= event.changedTouches[0].clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.changedTouches[0].clientY + this.options.clickTolerance ) 
            ? 'click' : undefined;

        // Event should happen on canvas
        if ( event && event.target && !event.target.classList.contains( 'panolens-canvas' ) ) { return; }

        event.preventDefault();

        if ( event.changedTouches && event.changedTouches.length === 1 ) {

            onTarget = this.onTap( { clientX: event.changedTouches[0].clientX, clientY: event.changedTouches[0].clientY }, type );
		
        } else {

            onTarget = this.onTap( event, type );

        }

        this.userMouse.type = 'none';

        if ( onTarget ) { 

            return; 

        }

        if ( type === 'click' ) {

            const { options: { autoHideInfospot, autoHideControlBar }, panorama, toggleControlBar } = this;

            if ( autoHideInfospot && panorama ) {

                panorama.toggleInfospotVisibility();

            }

            if ( autoHideControlBar ) {

                toggleControlBar();

            }

        }

    },

    /**
     * On tap eveny frame
     * @param {MouseEvent} event 
     * @param {string} type 
     * @memberOf Viewer
     * @instance
     */
    onTap: function ( event, type ) {

        const { left, top } = this.container.getBoundingClientRect();
        const { clientWidth, clientHeight } = this.container;

        this.raycasterPoint.x = ( ( event.clientX - left ) / clientWidth ) * 2 - 1;
        this.raycasterPoint.y = - ( ( event.clientY - top ) / clientHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.raycasterPoint, this.camera );

        // Return if no panorama 
        if ( !this.panorama ) { 

            return; 

        }

        // output infospot information
        if ( event.type !== 'mousedown' && this.touchSupported || this.outputEnabled ) { 

            this.outputPosition(); 

        }

        const intersects = this.raycaster.intersectObjects( this.panorama.children, true );
        const intersect_entity = this.getConvertedIntersect( intersects );
        const intersect = ( intersects.length > 0 ) ? intersects[0].object : undefined;

        if ( this.userMouse.type === 'mouseup'  ) {

            if ( intersect_entity && this.pressEntityObject === intersect_entity && this.pressEntityObject.dispatchEvent ) {

                this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

            }

            this.pressEntityObject = undefined;

        }

        if ( this.userMouse.type === 'mouseup'  ) {

            if ( intersect && this.pressObject === intersect && this.pressObject.dispatchEvent ) {

                this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

            }

            this.pressObject = undefined;

        }

        if ( type === 'click' ) {
            
            this.panorama.dispatchEvent( { type: 'click', intersects: intersects, mouseEvent: event } );

            if ( intersect_entity && intersect_entity.dispatchEvent ) {

                intersect_entity.dispatchEvent( { type: 'click-entity', mouseEvent: event } );

            }

            if ( intersect && intersect.dispatchEvent ) {

                intersect.dispatchEvent( { type: 'click', mouseEvent: event } );

            }

        } else {

            this.panorama.dispatchEvent( { type: 'hover', intersects: intersects, mouseEvent: event } );

            if ( ( this.hoverObject && intersects.length > 0 && this.hoverObject !== intersect_entity )
				|| ( this.hoverObject && intersects.length === 0 ) ){

                if ( this.hoverObject.dispatchEvent ) {

                    this.hoverObject.dispatchEvent( { type: 'hoverleave', mouseEvent: event } );

                    this.reticle.end();

                }

                this.hoverObject = undefined;

            }

            if ( intersect_entity && intersects.length > 0 ) {

                if ( this.hoverObject !== intersect_entity ) {

                    this.hoverObject = intersect_entity;

                    if ( this.hoverObject.dispatchEvent ) {

                        this.hoverObject.dispatchEvent( { type: 'hoverenter', mouseEvent: event } );

                        // Start reticle timer
                        if ( this.options.autoReticleSelect && this.options.enableReticle || this.tempEnableReticle ) {
                            this.reticle.start( this.onTap.bind( this, event, 'click' ) );
                        }

                    }

                }

                if ( this.userMouse.type === 'mousedown' && this.pressEntityObject != intersect_entity ) {

                    this.pressEntityObject = intersect_entity;

                    if ( this.pressEntityObject.dispatchEvent ) {

                        this.pressEntityObject.dispatchEvent( { type: 'pressstart-entity', mouseEvent: event } );

                    }

                }

                if ( this.userMouse.type === 'mousedown' && this.pressObject != intersect ) {

                    this.pressObject = intersect;

                    if ( this.pressObject.dispatchEvent ) {

                        this.pressObject.dispatchEvent( { type: 'pressstart', mouseEvent: event } );

                    }

                }

                if ( this.userMouse.type === 'mousemove' || this.options.enableReticle ) {

                    if ( intersect && intersect.dispatchEvent ) {

                        intersect.dispatchEvent( { type: 'hover', mouseEvent: event } );

                    }

                    if ( this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

                        this.pressEntityObject.dispatchEvent( { type: 'pressmove-entity', mouseEvent: event } );

                    }

                    if ( this.pressObject && this.pressObject.dispatchEvent ) {

                        this.pressObject.dispatchEvent( { type: 'pressmove', mouseEvent: event } );

                    }

                }

            }

            if ( !intersect_entity && this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

                this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

                this.pressEntityObject = undefined;

            }

            if ( !intersect && this.pressObject && this.pressObject.dispatchEvent ) {

                this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

                this.pressObject = undefined;

            }

        }

        // Infospot handler
        if ( intersect && intersect instanceof Infospot ) {

            this.infospot = intersect;
			
            if ( type === 'click' ) {

                return true;

            }
			

        } else if ( this.infospot ) {

            this.hideInfospot();

        }

        // Auto rotate
        if ( this.options.autoRotate && this.userMouse.type !== 'mousemove' ) {

            // Auto-rotate idle timer
            clearTimeout( this.autoRotateRequestId );

            if ( this.control === this.OrbitControls ) {

                this.OrbitControls.autoRotate = false;
                this.autoRotateRequestId = window.setTimeout( this.enableAutoRate.bind( this ), this.options.autoRotateActivationDuration );

            }

        }		

    },

    /**
     * Get converted intersect
     * @param {array} intersects 
     * @memberOf Viewer
     * @instance
     */
    getConvertedIntersect: function ( intersects ) {

        let intersect;

        for ( let i = 0; i < intersects.length; i++ ) {

            if ( intersects[i].distance >= 0 && intersects[i].object && !intersects[i].object.passThrough ) {

                if ( intersects[i].object.entity && intersects[i].object.entity.passThrough ) {
                    continue;
                } else if ( intersects[i].object.entity && !intersects[i].object.entity.passThrough ) {
                    intersect = intersects[i].object.entity;
                    break;
                } else {
                    intersect = intersects[i].object;
                    break;
                }

            }

        }

        return intersect;

    },

    /**
     * Hide infospot
     * @memberOf Viewer
     * @instance
     */
    hideInfospot: function () {

        if ( this.infospot ) {

            this.infospot.onHoverEnd();

            this.infospot = undefined;

        }

    },

    /**
     * Toggle control bar
     * @memberOf Viewer
     * @instance
     * @fires Viewer#control-bar-toggle
     */
    toggleControlBar: function () {

        const { widget } = this;

        /**
         * Toggle control bar event
         * @type {object}
         * @event Viewer#control-bar-toggle
         */
        if ( widget ) {

            widget.dispatchEvent( { type: 'control-bar-toggle' } );

        }

    },

    /**
     * On key down
     * @param {KeyboardEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onKeyDown: function ( event ) {

        if ( this.options.output && this.options.output !== 'none' && event.key === 'Control' ) {

            this.outputEnabled = true;

        }

    },

    /**
     * On key up
     * @param {KeyboardEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onKeyUp: function () {

        this.outputEnabled = false;

    },

    /**
     * Update control and callbacks
     * @memberOf Viewer
     * @instance
     */
    update: function () {

        const { scene, control, OrbitControls, DeviceOrientationControls } = this;

        // Tween Update
        TWEEN.update();

        // Callbacks Update
        this.updateCallbacks.forEach( callback => callback() );

        // Control Update
        if ( OrbitControls.enabled ) OrbitControls.update();
        if ( control === DeviceOrientationControls ) {
            DeviceOrientationControls.update(OrbitControls.publicSphericalDelta.data);
        }

        // Infospot Update
        const v3 = new THREE.Vector3();

        scene.traverse( function( child ){
            if ( child instanceof Infospot 
                && child.element 
                && ( this.hoverObject === child 
                    || child.element.style.display !== 'none' 
                    || (child.element.left && child.element.left.style.display !== 'none')
                    || (child.element.right && child.element.right.style.display !== 'none') ) ) {
                if ( this.checkSpriteInViewport( child ) ) {
                    const { x, y } = this.getScreenVector( child.getWorldPosition( v3 ) );
                    child.translateElement( x, y );
                } else {
                    child.onDismiss();
                }
                
            }
        }.bind( this ) );

    },

    /**
     * Rendering function to be called on every animation frame
     * Render reticle last
     * @memberOf Viewer
     * @instance
     */
    render: function () {

        if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

            this.renderer.clear();
            this.effect.render( this.scene, this.camera, this.panorama );
            this.effect.render( this.sceneReticle, this.camera );
			

        } else {

            this.renderer.clear();
            this.renderer.render( this.scene, this.camera );
            this.renderer.clearDepth();
            this.renderer.render( this.sceneReticle, this.camera );

        }

    },

    /**
     * Animate
     * @memberOf Viewer
     * @instance
     */
    animate: function () {

        this.requestAnimationId = window.requestAnimationFrame( this.animate.bind( this ) );

        this.onChange();

    },

    /**
     * On change
     * @memberOf Viewer
     * @instance
     */
    onChange: function () {

        this.update();
        this.render();

    },

    /**
     * Register mouse and touch event on container
     * @memberOf Viewer
     * @instance
     */
    registerMouseAndTouchEvents: function () {

        const options = { passive: false };

        this.container.addEventListener( 'mousedown' , 	this.handlerMouseDown, options );
        this.container.addEventListener( 'mousemove' , 	this.handlerMouseMove, options );
        this.container.addEventListener( 'mouseup'	 , 	this.handlerMouseUp  , options );
        this.container.addEventListener( 'touchstart', 	this.handlerMouseDown, options );
        this.container.addEventListener( 'touchend'  , 	this.handlerMouseUp  , options );

    },

    /**
     * Unregister mouse and touch event on container
     * @memberOf Viewer
     * @instance
     */
    unregisterMouseAndTouchEvents: function () {

        this.container.removeEventListener( 'mousedown' ,  this.handlerMouseDown, false );
        this.container.removeEventListener( 'mousemove' ,  this.handlerMouseMove, false );
        this.container.removeEventListener( 'mouseup'	,  this.handlerMouseUp  , false );
        this.container.removeEventListener( 'touchstart',  this.handlerMouseDown, false );
        this.container.removeEventListener( 'touchend'  ,  this.handlerMouseUp  , false );

    },

    /**
     * Register reticle event
     * @memberOf Viewer
     * @instance
     */
    registerReticleEvent: function () {

        this.addUpdateCallback( this.handlerTap );

    },

    /**
     * Unregister reticle event
     * @memberOf Viewer
     * @instance
     */
    unregisterReticleEvent: function () {

        this.removeUpdateCallback( this.handlerTap );

    },

    /**
     * Update reticle event
     * @memberOf Viewer
     * @instance
     */
    updateReticleEvent: function () {

        const clientX = this.container.clientWidth / 2 + this.container.offsetLeft;
        const clientY = this.container.clientHeight / 2;

        this.removeUpdateCallback( this.handlerTap );
        this.handlerTap = this.onTap.bind( this, { clientX, clientY } );
        this.addUpdateCallback( this.handlerTap );

    },

    /**
     * Register container and window listeners
     * @memberOf Viewer
     * @instance
     */
    registerEventListeners: function () {

        // Resize Event
        window.addEventListener( 'resize' , this.handlerWindowResize, true );

        // Keyboard Event
        window.addEventListener( 'keydown', this.handlerKeyDown, true );
        window.addEventListener( 'keyup'  , this.handlerKeyUp	 , true );

    },

    /**
     * Unregister container and window listeners
     * @memberOf Viewer
     * @instance
     */
    unregisterEventListeners: function () {

        // Resize Event
        window.removeEventListener( 'resize' , this.handlerWindowResize, true );

        // Keyboard Event
        window.removeEventListener( 'keydown', this.handlerKeyDown, true );
        window.removeEventListener( 'keyup'  , this.handlerKeyUp  , true );

    },

    /**
     * Dispose all scene objects and clear cache
     * @memberOf Viewer
     * @instance
     */
    dispose: function () {

        this.disableAutoRate();

        this.tweenLeftAnimation.stop();
        this.tweenUpAnimation.stop();

        // Unregister dom event listeners
        this.unregisterEventListeners();

        // recursive disposal on 3d objects
        function recursiveDispose ( object ) {

            for ( let i = object.children.length - 1; i >= 0; i-- ) {

                recursiveDispose( object.children[i] );
                object.remove( object.children[i] );

            }

            if ( object instanceof Panorama || object instanceof Infospot ) {

                object.dispose();
                object = null;

            } else if ( object.dispatchEvent ){

                object.dispatchEvent( 'dispose' );

            }

        }

        recursiveDispose( this.scene );

        // dispose widget
        if ( this.widget ) {

            this.widget.dispose();
            this.widget = null;

        }

        // clear cache
        if ( THREE.Cache && THREE.Cache.enabled ) {

            THREE.Cache.clear();

        }

    },

    /**
     * Destroy viewer by disposing and stopping requestAnimationFrame
     * @memberOf Viewer
     * @instance
     */
    destroy: function () {

        this.dispose();
        this.render();
        window.cancelAnimationFrame( this.requestAnimationId );		

    },

    /**
     * On panorama dispose
     * @memberOf Viewer
     * @instance
     */
    onPanoramaDispose: function ( panorama ) {

        const { scene } = this;
        const infospotDisposeMapper = infospot => infospot.toPanorama !== panorama ? infospot : infospot.dispose();

        if ( panorama instanceof VideoPanorama ) {

            this.hideVideoWidget();

        }

        // traverse the scene to find association
        scene.traverse( object => {

            if ( object instanceof Panorama ) {

                object.linkedSpots = object.linkedSpots.map( infospotDisposeMapper ).filter( infospot => !!infospot );

            }

        } );

        if ( panorama === this.panorama ) {

            this.panorama = null;

        }

    },

    /**
     * Load ajax call
     * @param {string} url - URL to be requested
     * @param {function} [callback] - Callback after request completes
     * @memberOf Viewer
     * @instance
     */
    loadAsyncRequest: function ( url, callback = () => {} ) {

        const request = new window.XMLHttpRequest();
        request.onloadend = function ( event ) {
            callback( event );
        };
        request.open( 'GET', url, true );
        request.send( null );

    },

    /**
     * View indicator in upper left
     * @memberOf Viewer
     * @instance
     */
    addViewIndicator: function () {

        const scope = this;

        function loadViewIndicator ( asyncEvent ) {

            if ( asyncEvent.loaded === 0 ) return;

            const viewIndicatorDiv = asyncEvent.target.responseXML.documentElement;
            viewIndicatorDiv.style.width = scope.viewIndicatorSize + 'px';
            viewIndicatorDiv.style.height = scope.viewIndicatorSize + 'px';
            viewIndicatorDiv.style.position = 'absolute';
            viewIndicatorDiv.style.top = '10px';
            viewIndicatorDiv.style.left = '10px';
            viewIndicatorDiv.style.opacity = '0.5';
            viewIndicatorDiv.style.cursor = 'pointer';
            viewIndicatorDiv.id = 'panolens-view-indicator-container';

            scope.container.appendChild( viewIndicatorDiv );

            const indicator = viewIndicatorDiv.querySelector( '#indicator' );
            const setIndicatorD = function () {

                scope.radius = scope.viewIndicatorSize * 0.225;
                scope.currentPanoAngle = scope.camera.rotation.y - THREE.Math.degToRad( 90 );
                scope.fovAngle = THREE.Math.degToRad( scope.camera.fov ) ;
                scope.leftAngle = -scope.currentPanoAngle - scope.fovAngle / 2;
                scope.rightAngle = -scope.currentPanoAngle + scope.fovAngle / 2;
                scope.leftX = scope.radius * Math.cos( scope.leftAngle );
                scope.leftY = scope.radius * Math.sin( scope.leftAngle );
                scope.rightX = scope.radius * Math.cos( scope.rightAngle );
                scope.rightY = scope.radius * Math.sin( scope.rightAngle );
                scope.indicatorD = 'M ' + scope.leftX + ' ' + scope.leftY + ' A ' + scope.radius + ' ' + scope.radius + ' 0 0 1 ' + scope.rightX + ' ' + scope.rightY;

                if ( scope.leftX && scope.leftY && scope.rightX && scope.rightY && scope.radius ) {

                    indicator.setAttribute( 'd', scope.indicatorD );

                }

            };

            scope.addUpdateCallback( setIndicatorD );

            const indicatorOnMouseEnter = function () {

                this.style.opacity = '1';

            };

            const indicatorOnMouseLeave = function () {

                this.style.opacity = '0.5';

            };

            viewIndicatorDiv.addEventListener( 'mouseenter', indicatorOnMouseEnter );
            viewIndicatorDiv.addEventListener( 'mouseleave', indicatorOnMouseLeave );
        }

        this.loadAsyncRequest( DataImage.ViewIndicator, loadViewIndicator );

    },

    /**
     * Append custom control item to existing control bar
     * @param {object} [option={}] - Style object to overwirte default element style. It takes 'style', 'onTap' and 'group' properties.
     * @memberOf Viewer
     * @instance
     */
    appendControlItem: function ( option ) {

        const item = this.widget.createCustomItem( option );		

        if ( option.group === 'video' ) {

            this.widget.videoElement.appendChild( item );

        } else {

            this.widget.barElement.appendChild( item );

        }

        return item;

    },

    /**
     * Clear all cached files
     * @memberOf Viewer
     * @instance
     */
    clearAllCache: function () {

        THREE.Cache.clear();

    }

} );

export { Viewer };