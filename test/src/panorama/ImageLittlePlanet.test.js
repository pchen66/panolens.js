import test from 'ava';
import { join } from 'path';
import { ImageLittlePlanet } from '../../../src/panorama/ImageLittlePlanet';

const localImageFolder = '../../../example/asset/textures/equirectangular';
const cabinImageURL = join( __dirname, localImageFolder, 'cabin.jpg' );
const container = document.createElement( 'div' );

test.cb('Load Event', t => {
    const panorama = new ImageLittlePlanet( cabinImageURL );
    panorama.setContainer( container );
    panorama.addEventListener( 'load', ()=>{
        t.end();
    } );
    panorama.load();
});

test.cb('Dispose', t => {
    const panorama = new ImageLittlePlanet( cabinImageURL );
    panorama.setContainer( container );
    panorama.addEventListener( 'load', ()=>{
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.falsy(panorama.material);
        t.falsy(panorama.parent);
        t.end();
    } );
    panorama.load();
});