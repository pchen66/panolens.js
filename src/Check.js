import { THREE_REVISION } from './Constants';

if ( THREE.REVISION != THREE_REVISION ) {

    console.warn( `three.js version is not matched. Please consider use the target revision ${THREE_REVISION}` );

}