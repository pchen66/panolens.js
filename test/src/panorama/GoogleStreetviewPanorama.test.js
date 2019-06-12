import test from 'ava';
import { GoogleStreetviewPanorama } from '../../../src/panorama/GoogleStreetviewPanorama';

const panoId = 'JmSoPsBPhqWvaBmOqfFzgA';

test.cb('Get Photos From Street View', t => {
    const panorama = new GoogleStreetviewPanorama( panoId );
    panorama.addEventListener( 'load', () => {
        t.end();
    } );
    panorama.load();
});

test('Reset', t => {
    const panorama = new GoogleStreetviewPanorama( panoId );
    panorama.reset();
    t.is(panorama.children.length, 0);
    t.falsy(panorama.getGSVLoader());
});