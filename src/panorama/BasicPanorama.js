import { CubePanorama } from './CubePanorama';
import { DataImage } from '../DataImage';

/**
 * @classdesc Basic panorama with 6 pre-defined grid images
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