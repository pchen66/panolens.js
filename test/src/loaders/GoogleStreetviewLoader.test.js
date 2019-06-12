import test from 'ava';
import { GoogleStreetviewLoader } from '../../../src/loaders/GoogleStreetviewLoader';

test.cb('Initialize Google Street View Loader', t => {
    const init = () => {
        const loader = new GoogleStreetviewLoader();
        t.true(loader.maxW > 0);
        t.true(loader.maxH > 0);
        t.truthy(loader._panoClient);
        t.end();
    };
    const script = document.createElement( 'script' );
    script.onload = init;
});