import test from 'ava';
import * as THREE from 'three';
import { Reticle } from '../../../src/interface/Reticle';

test.cb('Reticle Lifecycle Event - Enabled autoSelect', t => {
    t.plan(5);
    const reticle = new Reticle( 0xff0000 );
    const callback = () => t.pass();
    reticle.addEventListener( 'reticle-start', callback );
    reticle.addEventListener( 'reticle-end', callback );
    reticle.addEventListener( 'reticle-ripple-start', callback );
    reticle.addEventListener( 'reticle-ripple-end', () => { callback(); t.end(); } );
    reticle.start( callback );
});

test.cb('Reticle Lifecycle Event - Disabled autoSelect', t => {
    t.plan(0);
    const reticle = new Reticle( 0x0000ff, false );
    const callback = () => t.pass();
    reticle.addEventListener( 'reticle-start', callback );
    reticle.addEventListener( 'reticle-end', callback );
    reticle.addEventListener( 'reticle-ripple-start', callback );
    reticle.addEventListener( 'reticle-ripple-end', () => { callback(); t.end(); } );
    reticle.start( callback );
    setTimeout( () => t.end(), reticle.dwellTime );
});

test('Show and Hide', t => {
    const reticle = new Reticle( 0x00ffff );
    reticle.show();
    t.true(reticle.visible);
    reticle.hide();
    t.false(reticle.visible);
});

test('End without Start', t => {
    const reticle = new Reticle( 0x0000ff, false );
    reticle.end();
    t.pass();
});

test('Set Color', t => {
    const reticle = new Reticle( 0xff0000 );
    reticle.setColor( 0xff00ff );
    reticle.setColor( new THREE.Color( 'rgb(10, 10, 255)' ) );
    t.pass();
});