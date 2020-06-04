import test from 'ava';
import * as THREE from 'three';
import { BasicPanorama } from '../../../src/panorama/BasicPanorama';

test.cb('Load Event', t => {
    const panorama = new BasicPanorama();
    panorama.addEventListener( 'load', () => {
        t.true(panorama.material.uniforms[ 'envMap' ].value instanceof THREE.CubeTexture);
        t.end();
    } );
    panorama.load();
});