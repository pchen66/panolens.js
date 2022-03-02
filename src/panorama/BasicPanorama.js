import { CubePanorama } from './CubePanorama';
import { DataImage } from '../DataImage';

/**
 * @classdesc Basic panorama with 6 pre-defined grid images
 * @constructor
 */
class BasicPanorama extends CubePanorama {

    constructor() {
        super();
        const images = [];

        for ( let i = 0; i < 6; i++ ) {
            images.push( DataImage.WhiteTile );
        }
    }
}

export { BasicPanorama };