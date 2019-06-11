import test from 'ava';
import * as THREE from 'three';
import { Media } from '../../../src/media/Media';

const container = document.createElement( 'div' );
const scene = new THREE.Scene();

test.cb('Start Streaming', t => {
    const media = new Media();
    media.setContainer( container );
    media.setScene( scene );
    media.start();
    setTimeout( () => {
        t.truthy(media.stream);
        t.true(media.stream.active);
        media.switchNextVideoDevice();
        t.end();
    }, 1000);
});

test.cb( 'Stop Streaming', t => {
    const media = new Media();
    media.setContainer( container );
    media.setScene( scene );
    media.start();
    setTimeout( () => {
        media.stop();
        t.falsy(media.stream);
        t.end();
    }, 1000);
});

test.cb('Change Window Size after Start', t => {
    const media = new Media();
    media.setContainer( container );
    media.setScene( scene );
    media.start();
    setTimeout( () => {
        const texture = media.scene.background;
        t.truthy(media.element);
        t.is(scene, media.scene);
        media.onWindowResize();
        t.is(texture.repeat.y, 1);
        container.clientWidth = 1080;
        container.clientHeight = 1920;
        media.onWindowResize();
        t.is(texture.repeat.x, 1);
        t.end();
    }, 1000);
});

test.cb('Play and Pause', t => {
    const media = new Media();
    media.setContainer( container );
    media.setScene( scene );
    media.start();
    setTimeout( () => {
        media.playVideo();
        t.false(media.element.paused);
        media.pauseVideo();
        t.true(media.element.paused);
        t.end();
    }, 1000);
});