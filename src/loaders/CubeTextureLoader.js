import { ImageLoader } from './ImageLoader.js';
import * as THREE from 'three';

/**
 * @module CubeTextureLoader
 * @description Cube Texture Loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/CubeTextureLoader.js}
 */
const CubeTextureLoader = {

    /**
     * Load 6 images as a cube texture
     * @example PANOLENS.CubeTextureLoader.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] )
     * @method load
     * @param  {array}   urls        - array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
     * @param  {function} onLoad     - On load callback
     * @param  {function} onProgress - In progress callback
     * @param  {function} onError    - On error callback
     * @return {THREE.CubeTexture}   - Cube texture
     */
    load: function ( urls, onLoad = () => {}, onProgress = () => {}, onError ) {

	   var texture, loaded, progress, all, loadings;

	   texture = new THREE.CubeTexture( [] );

	   loaded = 0;
	   progress = {};
	   all = {};

	   urls.map( function ( url, index ) {

		   ImageLoader.load( url, function ( image ) {

			   texture.images[ index ] = image;

			   loaded++;

			   if ( loaded === 6 ) {

				   texture.needsUpdate = true;

				   onLoad( texture );

			   }

		   }, function ( event ) {

			   progress[ index ] = { loaded: event.loaded, total: event.total };

			   all.loaded = 0;
			   all.total = 0;
			   loadings = 0;

			   for ( var i in progress ) {

				   loadings++;
				   all.loaded += progress[ i ].loaded;
				   all.total += progress[ i ].total;

			   }

			   if ( loadings < 6 ) {

				   all.total = all.total / loadings * 6;

			   }

			   onProgress( all );

		   }, onError );

	   } );

	   return texture;

    }

};

export { CubeTextureLoader };