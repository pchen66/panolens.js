import test from 'ava';
import { DeviceOrientationControls } from '../../../../src/lib/controls/DeviceOrientationControls';
import * as THREE from 'three';

const commonEventProperties = { preventDefault: () => {}, stopPropagation: () => {} };
const touchstartEvent = { type: 'touchstart', ...commonEventProperties };
const touchmoveEvent = { type: 'touchmove', ...commonEventProperties };
const touchObject = { pageX: 3, pageY: 3 };

const cloneTouchObject = () => {
    return Object.assign( {}, touchObject );
};

const generateTouchSequence = () => {

    const seq = [];
    seq.push( { ...touchstartEvent, touches: [ cloneTouchObject() ] } );
    for ( let i = 0; i < 10; i++ ) {
        const touch = cloneTouchObject();
        touch.pageX += i * 2.5;
        touch.pageY += i * 0.734;
        seq.push( { ...touchmoveEvent, touches: [ touch ] } );
    }
    return seq;
};

const start = ( element, onComplete = () => {} ) => {

    const seq = generateTouchSequence();
    let index = 0;

    const fireEvent = () => {

        const frameId = window.requestAnimationFrame( fireEvent );
        element.dispatchEvent( seq[ index++ ] );   
        
        if ( index >= seq.length ) {

            window.cancelAnimationFrame( frameId );
            onComplete();

        }
        
    };

    fireEvent();

};

test.cb('Touch Start and Move Events', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new DeviceOrientationControls( camera, container );
    start( container, () => { 
        control.enabled = false;
        control.update();
        control.dispose();
        t.end();
    } );
});

test('Window Orientation Change Event', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new DeviceOrientationControls( camera, container );
    const event = new window.Event( 'orientationchange' );
    window.orientation = 180;
    window.dispatchEvent( event );
    control.update();
    t.is(control.screenOrientation, window.orientation);
    window.orientation = 90;
    window.dispatchEvent( event );
    control.update();
    t.is(control.screenOrientation, window.orientation);
    window.orientation = -90;
    window.dispatchEvent( event );
    control.update();
    t.is(control.screenOrientation, window.orientation);
    window.orientation = 0;
});

test('Device Orientation Change Event', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new DeviceOrientationControls( camera, container );
    const event = new window.DeviceOrientationEvent();
    window.dispatchEvent( event );
    control.update();
    t.is(control.deviceOrientation, event);
    t.pass();
});

