import test from 'ava';
import { join } from 'path';
import * as THREE from 'three';
import { Panorama } from '../../../src/panorama/Panorama';
import { Infospot } from '../../../src/infospot/Infospot';
import TWEEN from '@tweenjs/tween.js';
import { DataImage } from '../../../src/DataImage';

const panorama = new Panorama();
const infospot = new Infospot();
const infospot2 = new Infospot();
const object3D = new THREE.Object3D();

test('Add Infospots to Panoramas', t => {
    panorama.add( infospot, infospot2 );
    t.true(panorama.children.includes( infospot ));
    t.true(panorama.children.includes( infospot2 ));
});

test('Add Object to Panoramas', t => {
    panorama.add( object3D );
    t.true(panorama.children.includes( object3D.parent ));
});

test('Infospot Event Delegation - Click', t => {
    infospot.addEventListener( 'dismiss', t.pass );
    panorama.dispatchEvent( { type: 'click', intersects: [] } );
    infospot.removeEventListener( 'dismiss', t.pass );
});

test('Infospot Event Delegation - Container', t => {
    const container = document.createElement( 'div' );
    const infospot3 = new Infospot();
    panorama.setContainer( container );
    panorama.add( infospot3 );
    t.is(infospot3.container, container);
    panorama.setContainer( { container } );
    t.is(infospot3.container, container);
    panorama.remove( infospot3 );
});

test('Remove Infospots from Panoramas', t => {
    panorama.remove( infospot, infospot2, object3D );
    t.false(panorama.children.includes( infospot ));
    t.false(panorama.children.includes( infospot2 ));
    t.false(panorama.children.includes( object3D ));
});

test('Load Panorama', t => {
    const panorama = new Panorama();
    panorama.load();
    t.is(panorama.loaded, true);
});

test('Link Panorama', t => {
    const localImageFolder = '../../../example/asset/textures/';
    const iconURL = join( __dirname, localImageFolder, 'danger.png' );
    const iconScale = 100;
    const panorama1 = new Panorama();
    const panorama2 = new Panorama();
    panorama1.link( panorama2 );
    t.is(panorama1.children.length, 0 );
    t.is(panorama1.linkedSpots.length, 0 );
    panorama1.link( panorama2, new THREE.Vector3( 0, 0, -2000 ) );
    t.true(panorama1.children[ 0 ] instanceof Infospot );
    panorama2.setLinkingImage( iconURL, iconScale );
    panorama1.link( panorama2, new THREE.Vector3( 0, 0, -1500 ) );
    t.true(panorama1.children[ 1 ] instanceof Infospot );
    panorama1.link( panorama2, new THREE.Vector3( 0, 0, -1000 ), 100, DataImage.Info );
    t.true(panorama1.children[ 2 ] instanceof Infospot );
    t.is(panorama1.linkedSpots[ 2 ].toPanorama, panorama2);
});

test('Get Zoom Level based on Window Inner Width', t => {
    const panorama = new Panorama();
    const { ImageQualityLow, ImageQualityFair, ImageQualityMedium, ImageQualityHigh, ImageQualitySuperHigh } = panorama;
    window.innerWidth = 640;
    t.is( panorama.getZoomLevel(), ImageQualityFair );
    window.innerWidth = 1024;
    t.is( panorama.getZoomLevel(), ImageQualityMedium );
    window.innerWidth = 1500;
    t.is( panorama.getZoomLevel(), ImageQualityHigh );
    window.innerWidth = 2048;
    t.is( panorama.getZoomLevel(), ImageQualitySuperHigh );
    window.innerWidth = NaN;
    t.is( panorama.getZoomLevel(), ImageQualityLow );
    window.innerWidth = 1024;
});

test('Reset Panorama', t => {
    const panorama = new Panorama();
    panorama.add( new Infospot() );
    panorama.reset();
    t.is(panorama.children.length, 0 );
});

test.cb('toggleInfospotVisibility', t => {
    const panorama = new Panorama();
    const infospot = new Infospot();
    const delay = 1000;
    const duration = panorama.animationDuration;
    const intervalId = setInterval(() => TWEEN.update(), 50);
    panorama.add( infospot );
    panorama.toggleInfospotVisibility( false, delay );
    setTimeout( () => {
        clearInterval(intervalId);
        t.is(infospot.material.opacity, 0);
        t.end();
    }, duration + delay );
});

test('Dispose Panorama', t => {
    const panorama = new Panorama();
    const infospot = new Infospot();
    panorama.add( infospot );
    panorama.dispose();
    t.falsy(panorama.geometry);
    t.falsy(panorama.material);
});


