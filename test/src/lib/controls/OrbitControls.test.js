import test from 'ava';
import { OrbitControls } from '../../../../src/lib/controls/OrbitControls';
import * as THREE from 'three';

const commonEventProperties = { preventDefault: () => {}, stopPropagation: () => {} };

const generateTouchEvent = ( eventType = 'touchstart', index = 0, { finger } ) => {
    const touches = [];
    for (let i = 0; i < finger; i++ ) {
        touches.push( Object.assign( {}, { pageX: index * 2.5 + i * 0.75 + (Math.random() - 0.5), pageY: index * 0.734 + i * 0.75 + (Math.random() - 0.5) } ) );
    }
    return { type: eventType, touches, ...commonEventProperties };
};

const generateMouseEvent = ( eventType = 'mousedown', index = 0, { button, scalarY = 1 } ) => {
    return { type: eventType, clientX: index * 2.5, clientY: index * 0.734 * scalarY, button, ...commonEventProperties };
};

const generateSequence = ( type = 'touch', options = {} ) => {

    const seq = [];
    const length = 10;
    let index = 0;

    seq.push( type === 'touch' ? generateTouchEvent( 'touchstart', index++, options ) : generateMouseEvent( 'mousedown', index++, options ) );
    for ( let i = index; i < length; i++ && index++ ) {
        seq.push( type === 'touch' ? generateTouchEvent( 'touchmove', i, options ) : generateMouseEvent( 'mousemove', i, options ) );
    }
    seq.push( type === 'touch' ? generateTouchEvent( 'touchend', index, options ) : generateMouseEvent( 'mouseup', index, options ) );

    return seq;
};

const start = ( type = 'touch', element, options = {}, onComplete = () => {} ) => {

    const seq = generateSequence( type, options );
    let index = 0;

    const fireEvent = () => {

        const frameId = window.requestAnimationFrame( fireEvent );
        const event = seq[ index++ ];

        if ( event.type.includes( 'mousemove' ) || event.type.includes( 'mouseup' ) ) {

            document.dispatchEvent( event );

        } else {

            element.dispatchEvent( event );

        }
        
        if ( index >= seq.length ) {

            window.cancelAnimationFrame( frameId );
            onComplete();

        }
        
    };

    fireEvent();

};

const onComplete = ( control, t ) => {

    return () => {

        control.enabled = false;
        control.update();
        control.dispose();
        t.end();

    };

};

test.cb('Touch Start, Move and End Events - One Finger', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'touch', container, { finger: 1 }, onComplete( control, t ) );
});

test.cb('Touch Start, Move and End Events - Two Fingers', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'touch', container, { finger: 2 }, onComplete( control, t ) );
});

test.cb('Touch Start, Move and End Events - Three Fingers', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    control.noPan = false;
    start( 'touch', container, { finger: 3 }, onComplete( control, t ) );
});

test.cb('Mouse Down, Move and Up Events - ROTATE', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'mouse', container, { button: THREE.MOUSE.LEFT }, onComplete( control, t ) );
});

test.cb('Mouse Down, Move and Up Events - DOLLY IN', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'mouse', container, { button: THREE.MOUSE.MIDDLE, scalarY: 1 }, onComplete( control, t ) );
});

test.cb('Mouse Down, Move and Up Events - DOLLY OUT', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'mouse', container, { button: THREE.MOUSE.MIDDLE, scalarY: -1 }, onComplete( control, t ) );
});

test.cb('Mouse Down, Move and Up Events - PAN', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    control.noPan = false;
    start( 'mouse', container, { button: THREE.MOUSE.RIGHT }, onComplete( control, t ) );
});

test('Mouse Wheel Event', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    const eventIncrease = new window.MouseWheelEvent( 1 );
    const eventDecrease = new window.MouseWheelEvent( -1 );
    container.dispatchEvent( eventIncrease );
    container.dispatchEvent( eventDecrease );
    control.update();
    control.reset();
    t.pass();
});

test('Keyboard Event', t => {
    const createKeyboardEvent = ( type, keyCode ) => new window.KeyboardEvent( type, { keyCode } );
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    window.dispatchEvent( createKeyboardEvent( 'keydown', 37 ) );
    window.dispatchEvent( createKeyboardEvent( 'keydown', 38 ) );
    window.dispatchEvent( createKeyboardEvent( 'keydown', 39 ) );
    window.dispatchEvent( createKeyboardEvent( 'keydown', 40 ) );
    window.dispatchEvent( createKeyboardEvent( 'keyup', 37 ) );
    window.dispatchEvent( createKeyboardEvent( 'keyup', 38 ) );
    window.dispatchEvent( createKeyboardEvent( 'keyup', 39 ) );
    window.dispatchEvent( createKeyboardEvent( 'keyup', 40 ) );
    control.update();
    control.reset();
    t.pass();
});

test.cb('OrthoCamera Mouse Down, Move and Up Events - DOLLY IN', t => {
    const camera = new THREE.OrthographicCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'mouse', container, { button: THREE.MOUSE.MIDDLE, scalarY: 1 }, onComplete( control, t ) );
});


test.cb('OrthoCamera Mouse Down, Move and Up Events - DOLLY OUT', t => {
    const camera = new THREE.OrthographicCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    start( 'mouse', container, { button: THREE.MOUSE.MIDDLE, scalarY: -1 }, onComplete( control, t ) );
});

test.cb('OrthoCamera Mouse Down, Move and Up Events - PAN', t => {
    const camera = new THREE.OrthographicCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    control.noPan = false;
    start( 'mouse', container, { button: THREE.MOUSE.RIGHT }, onComplete( control, t ) );
});

test('Access Internal Functions', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    const q = new THREE.Quaternion();
    control.setLastQuaternion( q );
    t.true(camera.quaternion.equals(q));
    const lastPos = control.getLastPosition();
    t.is(lastPos.length(), 0);
    control.rotateLeft();
    control.rotateUp();
    control.getPolarAngle();
    control.getAzimuthalAngle();
});

test.cb('Mouse Down, Move and Up Events - PAN - not recognized camera', t => {
    const camera = new THREE.Camera();
    const control = new OrbitControls( camera );
    control.noPan = false;
    control.pan( 20, 0 );
    start( 'mouse', document, { button: THREE.MOUSE.RIGHT }, onComplete( control, t ) );
});


test.cb('Mouse Down, Move and Up Events - Dolly In - not recognized camera', t => {
    const camera = new THREE.Camera();
    const control = new OrbitControls( camera );
    control.dollyIn( 1 );
    control.dollyOut( 1 );
    camera.position.x = 100;
    control.update( true );
    start( 'mouse', control.domElement, { button: THREE.MOUSE.MIDDLE }, onComplete( control, t ) );
});

test('Mouse Down with different options', t => {
    const camera = new THREE.PerspectiveCamera();
    const container = document.createElement( 'div' );
    const control = new OrbitControls( camera, container );
    const generateEvent = ( type = 'mousedown', button = THREE.MOUSE.LEFT ) => {
        return { type, preventDefault: () => {}, button }
    };
    control.enabled = false;
    container.dispatchEvent( generateEvent( 'mousedown', THREE.MOUSE.LEFT ) );
    control.enabled = true;
    container.dispatchEvent( generateEvent( 'mousedown', THREE.MOUSE.LEFT ) );
    document.dispatchEvent( generateEvent( 'mousemove', THREE.MOUSE.LEFT ) );
    document.dispatchEvent( generateEvent( 'mouseup', THREE.MOUSE.LEFT ) )
    control.enabled = true
    control.noRotate =  true;
    container.dispatchEvent( generateEvent( 'mousedown', THREE.MOUSE.LEFT ) );
    control.noRotate =  false;
    control.noZoom = true;
    container.dispatchEvent( generateEvent( 'mousedown', THREE.MOUSE.MIDDLE ) );
    control.noZoom =  false;
    control.noPan = true;
    container.dispatchEvent( generateEvent( 'mousedown', THREE.MOUSE.RIGHT ) );
    t.pass();
});
