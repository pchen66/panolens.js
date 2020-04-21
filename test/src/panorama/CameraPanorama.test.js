import test from 'ava';
import { CameraPanorama } from '../../../src/panorama/CameraPanorama';

test.cb('Load Event', t => {
    const panorama = new CameraPanorama();
    panorama.addEventListener( 'loaded', () => {
        panorama.start();
        panorama.stop();
        t.end();
    } );
    panorama.load();
});