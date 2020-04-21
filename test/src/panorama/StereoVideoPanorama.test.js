import test from 'ava';
import { StereoVideoPanorama } from '../../../src/panorama/StereoVideoPanorama';
import { Stereo } from '../../../src/auxiliary/Stereo';
import { STEREOFORMAT } from '../../../src/Constants';

test('OnLoad SBS', t => {
    const stereo = new Stereo( 1 );
    const panorama = new StereoVideoPanorama( '../../../example/asset/textures/video/1941-battle-low.mp4', stereo );
    const texture = { image: { videoWidth: 4096, videoHeight: 1024 } };
    panorama.onLoad( texture );
    t.is(panorama.stereo.format, STEREOFORMAT.SBS );
});

test('OnLoad TAB', t => {
    const stereo = new Stereo( 1 );
    const panorama = new StereoVideoPanorama( '../../../example/asset/textures/video/1941-battle-low.mp4', stereo );
    const texture = { image: { videoWidth: 1024, videoHeight: 1024 } };
    panorama.onLoad( texture );
    t.is(panorama.stereo.format, STEREOFORMAT.TAB );
});

test.cb('Dispose', t => {
    const stereo = new Stereo( 1 );
    const panorama = new StereoVideoPanorama( '../../../example/asset/textures/video/1941-battle-low.mp4', stereo );
    panorama.addEventListener( 'loaded', () => {
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.end();
    } );
    panorama.load();
});