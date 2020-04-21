import test from 'ava';
import { StereoImagePanorama } from '../../../src/panorama/StereoImagePanorama';
import { Stereo } from '../../../src/auxiliary/Stereo';
import { STEREOFORMAT } from '../../../src/Constants';

const SBSImageURL = '../../../example/asset/textures/stereo/paragon-SBS.jpeg';
const TABImageURL = '../../../example/asset/textures/stereo/hellblade-TAB.jpeg';

test('OnLoad SBS', t => {
    const stereo = new Stereo( 1 );
    const panorama = new StereoImagePanorama( SBSImageURL, stereo );
    const texture = { image: { width: 4096, height: 1024 } };
    panorama.onLoad( texture );
    t.is(panorama.stereo.format, STEREOFORMAT.SBS );
});

test('OnLoad TAB', t => {
    const stereo = new Stereo( 1 );
    const panorama = new StereoImagePanorama( TABImageURL, stereo );
    const texture = { image: { width: 1024, height: 1024 } };
    panorama.onLoad( texture );
    t.is(panorama.stereo.format, STEREOFORMAT.TAB );
});

test.cb('Dispose', t => {
    const stereo = new Stereo( 1 );
    const panorama = new StereoImagePanorama( TABImageURL, stereo );
    panorama.addEventListener( 'loaded', () => {
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.end();
    } );
    panorama.load();
});