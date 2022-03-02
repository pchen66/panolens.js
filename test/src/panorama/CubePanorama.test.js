import test from 'ava';
import * as THREE from 'three';
import { CubePanorama } from '../../../src/panorama/CubePanorama';

const path = '../../../example/asset/textures/cube/sand/';
const format = '.png';

const images = [
    `${path}px${format}`,
    `${path}ny${format}`,
    `${path}py${format}`,
    `${path}ny${format}`,
    `${path}pz${format}`,
    `${path}nz${format}`
];

test.skip('Load Event', t => {
    const panorama = new CubePanorama( images );
    panorama.addEventListener( 'load', () => {
        t.true(panorama.material.uniforms[ 'tCube' ].value instanceof THREE.CubeTexture);
        t.end();
    } );
    panorama.load();
});

test.skip('Dispose', t => {
    const panorama = new CubePanorama( images );
    panorama.addEventListener( 'load', () => {
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.falsy(panorama.material);
        t.end();
    } );
    panorama.load();
});