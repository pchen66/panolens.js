import test from 'ava';
import { join } from 'path';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { Viewer } from '../../../src/viewer/Viewer';
import { ImagePanorama } from '../../../src/panorama/ImagePanorama';
import { Infospot } from '../../../src/infospot/Infospot';
import { CONTROLS, MODES } from '../../../src/Constants';
import { OrbitControls } from '../../../src/lib/controls/OrbitControls';
import { DeviceOrientationControls } from '../../../src/lib/controls/DeviceOrientationControls';
import { CardboardEffect } from '../../../src/lib/effects/CardboardEffect';
import { StereoEffect } from '../../../src/lib/effects/StereoEffect';
import { DataImage } from '../../../src/DataImage';
import { CubePanorama } from '../../../src/panorama/CubePanorama';
import { EmptyPanorama } from '../../../src/panorama/EmptyPanorama';
import { Panorama } from '../../../src/panorama/Panorama';
import { BasicPanorama } from '../../../src/panorama/BasicPanorama';
import { CameraPanorama } from '../../../src/panorama/CameraPanorama';
import { GoogleStreetviewPanorama } from '../../../src/panorama/GoogleStreetviewPanorama';
import { LittlePlanet } from '../../../src/panorama/LittlePlanet';
import { ImageLittlePlanet } from '../../../src/panorama/ImageLittlePlanet';
import { VideoPanorama } from '../../../src/panorama/VideoPanorama';

const localImageFolder = '../../../example/asset/textures/equirectangular';
const cabinImageURL = join( __dirname, localImageFolder, 'cabin.jpg' );

const intervalId = setInterval(() => TWEEN.update(), 16);
const keyboardDownEvent = new window.KeyboardEvent( 'keydown', {
    bubbles: true,
    cancelable: true,
    key: 'Control'
});
const keyboardUpEvent = new window.KeyboardEvent( 'keyup', {
    bubbles: true,
    cancelable: true,
    key: 'Control'
});

test.beforeEach(t => {
    const common = {
        preventDefault: () => {},
        stopPropogation: () => {}
    };
    const events = [
        { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 },
        { clientX: window.innerWidth / 2 + 5, clientY: window.innerHeight / 2 + 1 },
        { clientX: window.innerWidth / 2 + 10, clientY: window.innerHeight / 2 + 2 },
        { clientX: window.innerWidth / 2 + 15, clientY: window.innerHeight / 2 + 3 },
        { clientX: window.innerWidth / 2 + 20, clientY: window.innerHeight / 2 + 4 },
        { clientX: window.innerWidth / 2 + 25, clientY: window.innerHeight / 2 + 5 },
        { clientX: window.innerWidth / 2 + 30, clientY: window.innerHeight / 2 + 6 },
        { clientX: window.innerWidth / 2 + 35, clientY: window.innerHeight / 2 + 7 },
        { clientX: window.innerWidth / 2 + 40, clientY: window.innerHeight / 2 + 8 },
        { clientX: window.innerWidth / 2 + 45, clientY: window.innerHeight / 2 + 9 },
        { clientX: window.innerWidth / 2 + 50, clientY: window.innerHeight / 2 + 10 }
    ];
    let index = 0;
    let type = '';

    const fireEvent = () => {

        const frameId = window.requestAnimationFrame( fireEvent );

        if ( index === 0 ) {

            type = 'mousedown';

        } else if ( index >= events.length - 1 ) {

            type = 'mouseup';
            window.cancelAnimationFrame( frameId );
            t.context.end();

        } else {

            type = 'mousemove';

        }

        const event = { type, ...events[ index ], ...common };
        t.context.viewer.container.dispatchEvent( event );

        index++;
        
    };

    t.context = {
        viewer: new Viewer(),
        start: () => window.requestAnimationFrame( fireEvent ),
        end: () => {}
    };

});

test('Initialize Viewer without Container', t => {

    const viewer = new Viewer();
    const panorama = new ImagePanorama( cabinImageURL );
    viewer.add( panorama );
    t.is(panorama.parent, viewer.scene);

});

test('Initialize Viewer with Container', t => {

    const container = document.createElement( 'div' );
    const viewer = new Viewer( { container } );
    const panorama = new ImagePanorama( cabinImageURL );
    viewer.add( panorama );
    t.is(panorama.parent, viewer.scene);

});

test.cb('Panorama Enter and Leave', t => {

    t.plan(3);
    const pass = () => t.pass();
    const viewer = new Viewer();
    const panorama1 = new ImagePanorama( cabinImageURL );
    const panorama2 = new ImagePanorama( cabinImageURL );
    const advance = () => {
        viewer.setPanorama( panorama2 );
    };

    panorama1.addEventListener( 'enter', pass ); // yes
    panorama1.addEventListener( 'leave', pass ); // yes
    panorama1.addEventListener( 'leave-complete', () => t.end() )
    panorama2.addEventListener( 'enter', pass ); // yes
    panorama2.addEventListener( 'leave', pass ); // no
    viewer.add( panorama1, panorama2 );

    setTimeout( advance, 2000 );

});

test('Validate Non-Default Options', t => {
    const viewer = new Viewer( {
        controlButtons: ['fullscreen', 'setting', 'video', 'dummy'],
        autoHideControlBar: true,
        autoHideInfospot: false,
        horizontalView: true,
        clickTolerance: 20,
        cameraFov: 75,
        reverseDragging: true,
        enableReticle: true,
        dwellTime: 1000,
        autoReticleSelect: false,
        output: 'console',
        autoRotate: true,
        autoRotateSpeed: 3.0,
        autoRotateActivationDuration: 5000
    });
    viewer.setCameraFov( 60 );
    t.is(viewer.getCamera().fov, 60);
    t.true(viewer.camera === viewer.getCamera());
    t.true(viewer.scene === viewer.getScene());
    t.true(viewer.renderer === viewer.getRenderer());
    t.true(viewer.container === viewer.getContainer());
    viewer.disableAutoRate();
    t.false(viewer.OrbitControls.autoRotate);
});

test.cb('Mouse Down, Move and Up', t => {

    const viewer = new Viewer( { autoRotate: true, autoRotateActivationDuration: 50 } );
    const panorama = new ImagePanorama( cabinImageURL );

    viewer.add( panorama );

    t.context.viewer = viewer;
    t.context.end = () => t.end();
    t.context.start();

});

test.cb('Infospot with mouse events', t => {
    
    const viewer = new Viewer();
    const panorama = new ImagePanorama( cabinImageURL );
    const infospot = new Infospot();

    panorama.add( infospot );
    viewer.add( panorama );

    t.context.viewer = viewer;
    t.context.end = () => t.end();
    t.context.start();

});


test.cb('Output positions with mouse events - console', t => {
    
    const viewer = new Viewer( { output: 'console' } );
    const panorama = new ImagePanorama( cabinImageURL );

    viewer.add( panorama );

    t.context.viewer = viewer;
    t.context.end = () => {
        window.dispatchEvent( keyboardUpEvent );
        t.end();
    };
    t.context.start();

    window.dispatchEvent( keyboardDownEvent );

});

test.cb('Output positions with mouse events - overlay', t => {
    
    const viewer = new Viewer( { output: 'overlay' } );
    const panorama = new ImagePanorama( cabinImageURL );

    viewer.add( panorama );

    t.context.viewer = viewer;
    t.context.end = () => {
        window.dispatchEvent( keyboardUpEvent );
        t.end();
    };
    t.context.start();

    window.dispatchEvent( keyboardDownEvent );
});

test('Enable and Disable Controls', t => {
    
    const viewer = new Viewer();
    const panorama = new ImagePanorama( cabinImageURL );

    viewer.add( panorama );

    viewer.enableControl( CONTROLS.DEVICEORIENTATION );
    t.is(viewer.getControlId(), viewer.DeviceOrientationControls.id);
    t.true(viewer.getControl() instanceof DeviceOrientationControls);
    viewer.disableControl();
    t.false(viewer.getControl().enabled);
    t.is(viewer.getNextControlId(), viewer.OrbitControls.id);
    viewer.toggleNextControl();
    t.true(viewer.getControl() instanceof OrbitControls);

});

test('Enable and Disable Effects', t => {
    t.plan(6);
    const viewer = new Viewer();
    const panorama = new ImagePanorama( cabinImageURL );
    viewer.addEventListener( 'mode-change', () => t.pass() );

    viewer.add( panorama );

    viewer.enableEffect( MODES.CARDBOARD );             // 1
    t.true(viewer.effect instanceof CardboardEffect);   // 2
    viewer.enableEffect( MODES.STEREO );                // 3
    t.true(viewer.effect instanceof StereoEffect);      // 4
    viewer.disableEffect();                             // 5
    t.is(viewer.mode, MODES.NORMAL);                    // 6

});

test.cb('Infospot Focus', t => {
    
    const viewer = new Viewer( { enableReticle: true, dwellTime: 60 } );
    const panorama = new ImagePanorama( cabinImageURL );
    const infospot = new Infospot( 500, DataImage.WhiteTile, false );

    infospot.position.set( 0, 0,  -50 );
    infospot.addHoverText( 'panolens' );
    infospot.addEventListener( 'click', () => {
        infospot.focus( 20, TWEEN.Easing.Exponential.Out );
        t.end();
    } );

    panorama.add( infospot );
    viewer.add( panorama );

    t.context.viewer = viewer;
    t.context.start();
});

test.cb('Add and Remove Panoramas with Window Resize', t => {

    const viewer = new Viewer( { enableReticle: true, dwellTime: 60 } );
    const panorama = new Panorama();
    const empty = new EmptyPanorama();
    const image = new ImagePanorama( cabinImageURL );
    const cube = new CubePanorama( [ DataImage.WhiteTile, DataImage.WhiteTile, DataImage.WhiteTile, DataImage.WhiteTile, DataImage.WhiteTile, DataImage.WhiteTile ] );
    const basic = new BasicPanorama();
    const camera = new CameraPanorama();
    const video = new VideoPanorama( '../../../example/asset/textures/video/1941-battle-low.mp4' );
    const googlestreetview = new GoogleStreetviewPanorama( 'JmSoPsBPhqWvaBmOqfFzgA' );
    const planet = new LittlePlanet( 'image', cabinImageURL );
    const imagePlanet = new ImageLittlePlanet( cabinImageURL );

    viewer.add( panorama, empty, image, cube, basic, camera, video, googlestreetview, planet, imagePlanet );
    t.is(panorama.container, viewer.container);

    window.innerWidth = 1080;
    window.innerHeight = 1920;
    viewer.onWindowResize();
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    viewer.onWindowResize(1920, 1080);

    viewer.remove( googlestreetview );
    t.false(googlestreetview.hasEventListener( 'panolens-viewer-handler', viewer.eventHandler.bind( viewer ) ));

    t.context.viewer = viewer;
    t.context.start();
    
    setTimeout( () => {

        viewer.destroy();
        t.falsy(viewer.widget);
        t.falsy(image.geometry);
        t.falsy(image.material);
        t.end();

    }, 5000 );


});

test('Tween control center by object', t => {

    const viewer = new Viewer( { enableReticle: true, dwellTime: 60 } );
    const panorama = new Panorama();
    const box = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshNormalMaterial() );
    box.position.set( 100, 0, -4000)

    panorama.add( box );
    viewer.add( panorama );

    viewer.tweenControlCenterByObject( box );

    panorama.remove( box );
    viewer.add( box );
    viewer.tweenControlCenterByObject( box );
    
    t.pass();

});

test('Append Custom Control Widget', t => {
    const viewer = new Viewer( { enableReticle: true, dwellTime: 60 } );
    const panorama = new Panorama();
    const config1 = {
        style: {
            backgroundImage: `url(${cabinImageURL})`,
            float: 'left'
        },
        onTap: ()=>{}
    };
    const config2 = {
        style: {
            backgroundImage: `url(${cabinImageURL})`,
            float: 'right'
        },
        group: 'video',
        onTap: ()=>{}
    };
    const item1 = viewer.appendControlItem( config1 );
    const item2 = viewer.appendControlItem( config2 );
    viewer.add( panorama );
    t.true( viewer.widget.barElement.contains( item1 ) );
    viewer.widget.barElement.removeChild( item2 );
    t.false( viewer.widget.barElement.contains( item2 ) );
});