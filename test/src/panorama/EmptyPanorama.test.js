import test from 'ava';
import { EmptyPanorama } from '../../../src/panorama/EmptyPanorama';

test('Load Event', t => {
    const panorama = new EmptyPanorama();
    panorama.load();
    t.true(panorama.loaded);
});
