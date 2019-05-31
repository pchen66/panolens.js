import { CubePanorama } from './CubePanorama';
import { DataImage } from '../DataImage';

/**
 * Basic panorama with 6 faces tile images
 * @constructor
 */
function BasicPanorama () {

    const images = [];

    for ( let i = 0; i < 6; i++ ) {

        images.push( DataImage.WhiteTile );

    }

    CubePanorama.call( this, images );

}

BasicPanorama.prototype = Object.assign( Object.create( CubePanorama.prototype ), {

    constructor: BasicPanorama

} );

export { BasicPanorama };