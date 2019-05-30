import 'three';

const version="0.10.0";

const REVISION = version;
const CONTROLS = { ORBIT: 0, DEVICEORIENTATION: 1 };
const MODES = { UNKNOWN: 0, NORMAL: 1, CARDBOARD: 2, STEREO: 3 };

/**
 * Data Image
 * @memberOf PANOLENS
 * @enum {string}
 */
const DataImage = {
    Info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADBklEQVR42u2bP08UQRiHnzFaSYCI/xoksdBIqGwIiYWRUBISExpCQ0ej38FWOmlIKKhoMPEbaCxsrrHiYrQgOSlQEaICrT+LHSPZzNzt3s3c3Hn7lHvLzvv82L2dm30XKioqKgYY062BJF0HpoA7wARwBbhsPz4DjoEG8AnYNcZ8Sx1Op8IXJM1KWpdUV3nq9m9nJV1I7VNGfEzSM0mNNqR9NOwxx1L7NRMflbQm6SSgeJ4TO8Zoat+8/LKkg4jieQ4kLaf2RtKwpJ0uiufZkTScSn5S0l5C+b/sSZrstvyMpKPU5uc4kjTTjkvpeYCkaeA1/+7hvcIZMGuMqUULQNIU8Aa4ltrWwyHwyBizGzwASSPAe+B2assW7AH3jTE/i+xcZoa12Qfy2Bo3i+5cKABl99zF1GYlWFTBeULLS0DZrOsDcDNggTXgc27bLWA64BhfgHvGmB8dHUXZ1DM0S45xliKMs9bKr+klIOkqsBrwv9JtVq1DewEAT4Ch1BYdMGQdygeg7Df4SmqDAKyoyXpCszPgITCeuvoAjFuX0gE8jljUdv7bCtiOOJ7XpdUZ8L/gdXHOA5QtYH5NXXVgbrgWWn1nwFTqaiPgdPIFcDd1tRFwOl307DwRuZgXwLvctgfA04hjOp18AcReZ6sZY16e3yDpUuQxnU6+S2AkcjEpcDr1zxOXSPgCKLSa0mc4nXwB/EpdbQScTr4AGqmrjYDTyRfAx9TVRsDp5Aug8LJyH+F0cgZg58z11BUHpO5ruGh2G3ybuuqAeF2aBfAqddUB8bq0OgP2U1cegH3aOQOMMb+BrdTVB2DLupQLwLIOnKY26IBT6+ClaQDGmO/ARmqLDtiwDn7HVkcY+EdjNoTlCI+tYhO2iUppm6HKslPUq2qQKHpUe8AFsjaUXuUQWCgqXyoAG8IuME/WkNRrnAHzZfqDSgdgQ6gBc2Td3b3CMTBXtkOsIzTIjZLnQhjcVtlcEIPZLJ0LoVvt8s/Va+3yuSAG84UJRxB98cpM9dJURUVFxSDzBxKde4Lk3/h2AAAAAElFTkSuQmCC',
    Arrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADPklEQVR42u2bMUscQRiG30/SRaJEI1ZKUiRErNIELRUbQYSAnX8hpVUgkDYp0wgWVjYW+QcJaQzYpLojJIXhtDDEKBpj65ti58ixmdmb2ZvZ7+T2AUHudmfmeXf2bnb3O6CmpqZmgJGqOiI5AWAWwEMA0wDuArht3r4CcAagBeAbgIaI/NQOp1fhIZKLJN+SbDKcptl3keSQtk+I+BjJVyRbJaRdtEybY9p+ReKjJN+QvIwonufS9DGq7ZuXXyd5nFA8zzHJdW1vkLxDcrdC8Ty7JO9oyc+QPFCUb3NAcqZq+TmSp9rmHZySnCvjErwOIPkUwHv8+w7vF64ALIrIfrIASM4C+ADgnratgxMACyLSiB4AyREAnwE80LbswgGAJyJy4bNxyApr6wbIw4xxy3djrwCYfeeuaZsFsEbPdULXU4DZqusLgMkEA21P05EEbf8A8FhEzos28pkBLxLKL5s/r/M1kEkz9vKQHGeatf05yfmOfubNa7G5JDle5NhtBjwHMBz5yFwAWBaRT+0XzP8pZsKwcQiH2fX8Ycojb+kzxUw4ZJn7CSQXqpRPHMKCq7+iZJ71Mvdy/DftXSQ6HcJdSDaqPPKW/mPOBO+lcbvzCU35RCFM2PpwnQKzZQfdgfe0dxH5dLA6uQJ4pC2fIASrkyuA6X6QjxyC1ckVQNn7bNHlI4ZgdXIFUObiJJl8pBCsTjGfuIwA2Cv4FN7xbYjkjqsRAHuIePXoCiDF1Zk2VidXAL+1R5sAq5MrgJb2aBNgdXIF8FV7tAmwOrkCCFs73wysTtYATHFCU3vEEWm6Ci6KvgY/ao86Ik6XogDeaY86Ik6XbjPgSHvkEThCwQy45XpDRK5JbgN4GWkgUyR9H65MRQxgW0SunZ5FezK7pfwd8e8MV8UfAPdF5Jdrg8JrAbPjprZFD2wWyQP6j8ZSEufRmGlgQ9umBBvd5IOgbjFUKLu+XnWBhG+rpsFVZGUo/coJgFVf+aAATAgNACvICpL6jSsAKyH1QcEBmBD2ASwhq+7uF84ALIVWiPUEB7lQsiOEwS2VzQUxmMXSuRCqKpd/zX4rl88FMZg/mLAEcSN+MlP/aKqmpqZmkPkL0hSjwOpNKxwAAAAASUVORK5CYII=',
    FullscreenEnter: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik03IDE0SDV2NWg1di0ySDd2LTN6bS0yLTRoMlY3aDNWNUg1djV6bTEyIDdoLTN2Mmg1di01aC0ydjN6TTE0IDV2MmgzdjNoMlY1aC01eiIvPgo8L3N2Zz4=',
    FullscreenLeave: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE0SDE5VjE2SDE2VjE5SDE0VjE0TTUsMTRIMTBWMTlIOFYxNkg1VjE0TTgsNUgxMFYxMEg1VjhIOFY1TTE5LDhWMTBIMTRWNUgxNlY4SDE5WiIgLz48L3N2Zz4=',
    VideoPlay: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTgsNS4xNFYxOS4xNEwxOSwxMi4xNEw4LDUuMTRaIiAvPjwvc3ZnPg==',
    VideoPause: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE5LjE0SDE4VjUuMTRIMTRNNiwxOS4xNEgxMFY1LjE0SDZWMTkuMTRaIiAvPjwvc3ZnPg==',
    WhiteTile: 'data:image/png;base64,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',
    Setting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADn0lEQVR42u2bzUsVURjGnyO6CPzAMnTjppAo3LTwH1CqTfaxbeOiRS37A0wXtROFVi1aRBs3LWohSIGbQAQXViBGRhG0UIRKUCpK7q/FnOB2uc6cOXNmRnGe3eW+H8/7zLln3vNxpQoVKlQ4wjBFJAFOSRqX1O7osivpvjHmU1nChBZglvSYLYJbS0EanCvIJzWK+gnsyH34/8OuMaYjb265jwCgz6N4SWq3vodbAEmnS/KtBDgoAgyU5BteAOAkMAPcBroc7PskDWfgN+wyDwBdltMMcDI3tYBnde/pHeARMNTErgd4APzweP834oeN1dMkz5DlsFNn/yyv4kdiSK4At4AO4CqwGaDwRmza2B0210qM7YhrXU59ANAq6bWkwQTTn5KO5fIE0uVYlXTeGLOXFMx1DrjlULwKKN41x6DlnIjEEQCckPRe0okCiguJr5LOGGO+xhm5jICJQ1i8LOeJJKPYEQAMKvrtt5ZdjSf2FM0Fq/sZJI2A6UNcvCz36TiDfUcAcE1SPu/U6Mm8k/TFfu6XdFb5iX3dGPM8lQfwNod3+TowBnQ3yddtv1vPIe+b1JIBiwEJ1IAJ208k5W21trWA+V/5CHAcmAtU/A2P/DcCiTAHHE8tgCVhgLvAXgYCk17Jo/yTGfLuWe7Zd72AC8CWB4n3OAz7mLytNkZabAEXMhfeQKYfWEpJZCxA3rGUOZeA/qDF15FpAz47EvlNk9neI2e3jeWCz0BbmvipNkSMMX8kuSZYM8Z8zyqAjbHmaN5mOeYjgIXrU93MWrxHrNQjrqiDkQMLHwG+OdqF3NN3jeXKzU8AoF1SzdH8XKhJUO7HZDXLMbwAwICkJUULFxe0SbqSVQAbw3Xi7Ze0ZLmGAzAKbHs0JGU1QtvAaIjCW4B7ZOvJy2qFa5a730RPtBiaz0CgnkiZi6F5fBZDVMvho7EhcuS3xJJ2hV9IupgTqaLw0hhzab8vq23xOG/r+LDsKjLgYVzxUnU0ltwK2wDezUyJmEwqXgp/PL4rvxthaeCSI+zxuA10J8ZkWdJNSb2SLkvayKHwDRu71+ZajrG941J8agALDQ3GU/a/IvMkYCPzmCbtLNEVmacNtgs5iP9fYVNEV1Q6Hez7yNZSL+J2SarTcpqiyV2iUkG0IvPFvbz5FbEn+KEk3wMjwMeSfCsBXFBdly9CAPk9ydyffpECuB5tZfVJjaKWueOSfinln6YK4lahQoUKRxd/AcRPGTcQCAUQAAAAAElFTkSuQmCC',
    ChevronRight: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNTksMTYuNThMMTMuMTcsMTJMOC41OSw3LjQxTDEwLDZMMTYsMTJMMTAsMThMOC41OSwxNi41OFoiIC8+PC9zdmc+',
    Check: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WiIgLz48L3N2Zz4=',
    ViewIndicator: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0idmlldy1pbmRpY2F0b3IiIGhlaWdodD0iMzAiIHdpZHRoPSIzMCIgdmlld0JveD0iLTIuNSAtMSAzMCAzMCI+Cgk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7ZmlsbDpub25lO30uc3Qxe3N0cm9rZS13aWR0aDo2O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCTwvc3R5bGU+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNIDEyLjUgMCBBIDEyLjUgMTIuNSAwIDAgMCAtMTIuNSAwIEEgMTIuNSAxMi41IDAgMCAwIDEyLjUgMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMywxNS41KSI+PC9wYXRoPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0gMTMgMCBMIDEwIDIgTCAxNiAyIFoiPjwvcGF0aD4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNIDIgMCBBIDIgMiAwIDAgMCAtMiAwIEEgMiAyIDAgMCAwIDIgMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMywxNS41KSI+PC9wYXRoPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGlkPSJpbmRpY2F0b3IiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTMsMTUuNSkiPjwvcGF0aD4KCTwvZz4KPC9zdmc+'
};

/**
 * Image loader with progress based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js}
 * @memberOf PANOLENS
 * @namespace
 */
const ImageLoader = {

	load: function ( url, onLoad, onProgress, onError ) {

		// Enable cache
		THREE.Cache.enabled = true;

		let cached, request, arrayBufferView, blob, urlCreator, image, reference;
	
		// Reference key
		for ( let iconName in DataImage ) {
	
			if ( DataImage.hasOwnProperty( iconName ) && url === DataImage[ iconName ] ) {
	
				reference = iconName;
	
			}
	
		}
	
		// Cached
		cached = THREE.Cache.get( reference ? reference : url );
	
		if ( cached !== undefined ) {
	
			if ( onLoad ) {
	
				setTimeout( function () {
	
					if ( onProgress ) {
	
						onProgress( { loaded: 1, total: 1 } );
	
					} 
					
					onLoad( cached );
	
				}, 0 );
	
			}
	
			return cached;
	
		}
		
		// Construct a new XMLHttpRequest
		urlCreator = window.URL || window.webkitURL;
		image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
	
		// Add to cache
		THREE.Cache.add( reference ? reference : url, image );
	
		const onImageLoaded = () => {
	
			urlCreator.revokeObjectURL( image.src );
			onLoad && onLoad( image );
	
		};
	
		if ( url.indexOf( 'data:' ) === 0 ) {
	
			image.addEventListener( 'load', onImageLoaded, false );
			image.src = url;
			return image;
		}
	
		image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';
	
		request = new XMLHttpRequest();
		request.open( 'GET', url, true );
		request.responseType = 'arraybuffer';
		request.onprogress = function ( event ) {
	
				if ( event.lengthComputable ) {
	
					onProgress && onProgress( { loaded: event.loaded, total: event.total } );
	
				}
	
		};
		request.onloadend = function( event ) {
	
				arrayBufferView = new Uint8Array( this.response );
				blob = new Blob( [ arrayBufferView ] );
				
				image.addEventListener( 'load', onImageLoaded, false );
			image.src = urlCreator.createObjectURL( blob );
	
		};
	
		request.send(null);
	
	}

};

/**
 * Texture loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js}
 * @memberOf PANOLENS
 * @namespace
 */
const TextureLoader = {

	/**
	 * Load image texture
	 * @param  {string}   url        - An image url
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {THREE.Texture}   	 - Image texture
	 */
	load: function ( url, onLoad, onProgress, onError ) {

		var texture = new THREE.Texture(); 

		ImageLoader.load( url, function ( image ) {

			texture.image = image;

			// JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
			const isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

			texture.format = isJPEG ? THREE.RGBFormat : THREE.RGBAFormat;
			texture.needsUpdate = true;

			onLoad && onLoad( texture );

		}, onProgress, onError );

		return texture;

	}

};

/**
 * Cube Texture Loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/CubeTextureLoader.js}
 * @memberOf PANOLENS
 * @namespace
 */
const CubeTextureLoader = {

	/**
	* Load 6 images as a cube texture
	* @param  {array}   urls        - Array with 6 image urls
	* @param  {function} onLoad     - On load callback
	* @param  {function} onProgress - In progress callback
	* @param  {function} onError    - On error callback
	* @return {THREE.CubeTexture}   - Cube texture
	*/
   load: function ( urls, onLoad, onProgress, onError ) {

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

				   onLoad && onLoad( texture );

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

			   onProgress && onProgress( all );

		   }, onError );

	   } );

	   return texture;

   }

};

/**
 * User Media
 * @param {object} [constraints={ video: {}, audio: false, facingMode: 'environment' }]
 */
function Media ( constraints = { video: {}, audio: false, facingMode: 'environment' } ) {

    this.constraints = constraints;

    this.container;
    this.scene;
    this.element;
    this.streams = {};
    this.streamId;

}
Object.assign( Media.prototype, {

    start: function() {

        const optional = [
            { minWidth: 320  },
            { minWidth: 640  },
            { minWidth: 1024 },
            { minWidth: 1280 },
            { minWidth: 1920 }
        ];

        const { video } = this.constraints;

        if ( !video.optional ) {

            video.optional = optional;

        }

        this.element = this.createVideoElement();

        return navigator.mediaDevices.getUserMedia( this.constraints )
        .catch( error => { console.warn( `PANOLENS.Media: ${error}` ); } );

    },

    stop: function () {

        const stream = this.streams[ this.streamId ];

        if ( stream && stream.active ) {

            const track = stream.getTracks()[ 0 ];

            track.stop();

            window.removeEventListener( 'resize', this.onWindowResize.bind( this ) );

            this.element = null;
            this.streamId = null;
            this.streams = {};

        }

    },

    attachVideoSourceObject: function ( stream ) {

        this.streams[ stream.id ] = stream;
        
        if ( this.streamId ) { return; }
        
        this.streamId = stream.id;
        this.element.srcObject = stream;

        if ( this.scene ) {

            this.scene.background = this.createVideoTexture();

        }
        
        window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    },

    createVideoTexture: function () {

        const video = this.element;
        const texture = new THREE.VideoTexture( video );

        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.center.set( 0.5, 0.5 );

        video.addEventListener( 'canplay', this.onWindowResize.bind( this ) );

        return texture;

    },

    createVideoElement: function() {

        const video = document.createElement( 'video' );
        
        video.setAttribute( 'autoplay', '' );
        video.setAttribute( 'muted', '' );
        video.setAttribute( 'playsinline', '' );

        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectPosition = 'center';
        video.style.objectFit = 'cover';
        video.style.display = this.scene ? 'none' : '';

        return video;

    },

    onWindowResize: function ( event ) {

        if ( this.element && this.element.videoWidth && this.element.videoHeight && this.scene ) {

            const container = this.container;
            const texture = this.scene.background;
            const { videoWidth, videoHeight } = this.element;
            const cameraRatio = videoHeight / videoWidth;
            const viewportRatio = container ? container.clientWidth / container.clientHeight : 1.0;
            texture.repeat.set( -cameraRatio * viewportRatio, 1 );

        }

    }

} );

/**
 * Reticle 3D Sprite
 * @constructor
 * @param {THREE.Color} [color=0xffffff] - Color of the reticle sprite
 * @param {boolean} [autoSelect=true] - Auto selection
 * @param {number} [dwellTime=1500] - Duration for dwelling sequence to complete
 */

function Reticle ( color = 0xffffff, autoSelect = true, dwellTime = 1500 ) {

    this.dpr = window.devicePixelRatio;

    const { canvas, context } = this.createCanvas();
    const material = new THREE.SpriteMaterial( { color, map: this.createCanvasTexture( canvas ) } );

    THREE.Sprite.call( this, material );

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = context;
    this.color = color instanceof THREE.Color ? color : new THREE.Color( color );    

    this.autoSelect = autoSelect;
    this.dwellTime = dwellTime;
    this.position.z = -10;
    this.center.set( 0.5, 0.5 );
    this.scale.set( 0.5, 0.5, 1 );

    this.startTimestamp;
    this.timerId;
    this.callback;

    this.frustumCulled = false;

    this.updateCanvasArcByProgress( 0 );

}
Reticle.prototype = Object.assign( Object.create( THREE.Sprite.prototype ), {

    constructor: Reticle,

    setColor: function ( color ) {

        this.material.color.copy( color instanceof THREE.Color ? color : new THREE.Color( color ) );

    },

    createCanvasTexture: function ( canvas ) {

        const texture = new THREE.CanvasTexture( canvas );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        return texture;

    },

    createCanvas: function () {

        const width = 32;
        const height = 32;
        const canvas = document.createElement( 'canvas' );
        const context = canvas.getContext( '2d' );
        const dpr = this.dpr;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        context.scale( dpr, dpr );

        context.shadowBlur = 5;
        context.shadowColor = "rgba(200,200,200,0.9)";

        return { canvas, context };

    },

    updateCanvasArcByProgress: function ( progress ) {

        const context = this.context;
        const { canvasWidth, canvasHeight, material } = this;
        const dpr = this.dpr;
        const degree = progress * Math.PI * 2;
        const color = this.color.getStyle();
        const x = canvasWidth * 0.5 / dpr;
        const y = canvasHeight * 0.5 / dpr;
        const lineWidth = 3;
        
        context.clearRect( 0, 0, canvasWidth, canvasHeight );
        context.beginPath();

        if ( progress === 0 ) {
            context.arc( x, y, canvasWidth / 16, 0, 2 * Math.PI );
            context.fillStyle = color;
            context.fill();
        } else {
            context.arc( x, y, canvasWidth / 4 - lineWidth, -Math.PI / 2, -Math.PI / 2 + degree );
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.stroke();
        }

        context.closePath();

        material.map.needsUpdate = true;

    },

    ripple: function () {

        const context = this.context;
        const stop = this.stop.bind( this );
        const { canvasWidth, canvasHeight, material } = this;
        const duration = 500;
        const timestamp = performance.now();
        const color = this.color;
        const dpr = this.dpr;
        const x = canvasWidth * 0.5 / dpr;
        const y = canvasHeight * 0.5 / dpr;

        const update = () => {

            const timerId = requestAnimationFrame( update );
            const elapsed = performance.now() - timestamp;
            const progress = elapsed / duration;
            const opacity = 1.0 - progress > 0 ? 1.0 - progress : 0;
            const radius = progress * canvasWidth * 0.5 / dpr;

            context.clearRect( 0, 0, canvasWidth, canvasHeight );
            context.beginPath();
            context.arc( x, y, radius, 0, Math.PI * 2 );
            context.fillStyle = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${opacity})`;
            context.fill();
            context.closePath();

            if ( progress > 1.0 ) {

                cancelAnimationFrame( timerId );
                stop();

            }

            material.map.needsUpdate = true;

        };

        update();

    },

    /**
     * Make reticle visible
     */
    show: function () {

        this.visible = true;

    },

    /**
     * Make reticle invisible
     */
    hide: function () {

        this.visible = false;

    },

    /**
     * Start dwelling
     */
    start: function ( callback ) {

        if ( !this.autoSelect ) {

            return;

        }

        this.startTimestamp = performance.now();
        this.callback = callback;
        this.update();

    },

    /**
     * Stop dwelling
     */
    stop: function(){

        cancelAnimationFrame( this.timerId );

        this.updateCanvasArcByProgress( 0 );
        this.callback = null;
        this.timerId = null;

    },

    /**
     * Update dwelling
     */
    update: function () {

        this.timerId = requestAnimationFrame( this.update.bind( this ) );

        const elapsed = performance.now() - this.startTimestamp;
        const progress = elapsed / this.dwellTime;

        this.updateCanvasArcByProgress( progress );

        if ( progress > 1.0 ) {

            cancelAnimationFrame( this.timerId );
            this.ripple();
            this.callback && this.callback();
            this.stop();

        }

    }

} );

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Tween = createCommonjsModule(function (module, exports) {
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use self.performance.now if it is available.
else if (typeof (self) !== 'undefined' &&
         self.performance !== undefined &&
		 self.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onRepeatCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function () {
		return this._id;
	},

	isPlaying: function () {
		return this._isPlaying;
	},

	to: function (properties, duration) {

		this._valuesEnd = Object.create(properties);

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	duration: function duration(d) {
		this._duration = d;
		return this;
	},

	start: function (time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function () {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function () {

		this.update(Infinity);
		return this;

	},

	stopChainedTweens: function () {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function (group) {
		this._group = group;
		return this;
	},

	delay: function (amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function (times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function (amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function (yoyo) {

		this._yoyo = yoyo;
		return this;

	},

	easing: function (easingFunction) {

		this._easingFunction = easingFunction;
		return this;

	},

	interpolation: function (interpolationFunction) {

		this._interpolationFunction = interpolationFunction;
		return this;

	},

	chain: function () {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function (callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function (callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onRepeat: function onRepeat(callback) {

		this._onRepeatCallback = callback;
		return this;

	},

	onComplete: function (callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function (callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function (time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object, elapsed);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				if (this._onRepeatCallback !== null) {
					this._onRepeatCallback(this._object);
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	{

		// Node.js
		module.exports = TWEEN;

	}

})(commonjsGlobal);
});

/**
 * Information spot attached to panorama
 * @constructor
 * @param {number} [scale=300] - Default scale
 * @param {string} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
 * @param {boolean} [animated=true] - Enable default hover animation
 */
function Infospot ( scale = 300, imageSrc, animated ) {
	
	const duration = 500, scaleFactor = 1.3;

	imageSrc = imageSrc || DataImage.Info;

	THREE.Sprite.call( this );

	this.type = 'infospot';

	this.animated = animated !== undefined ? animated : true;
	this.isHovering = false;

	// TODO: Three.js bug hotfix for sprite raycasting r104
	// https://github.com/mrdoob/three.js/issues/14624
	this.frustumCulled = false;

	this.element;
	this.toPanorama;
	this.cursorStyle;

	this.mode = MODES.UNKNOWN;

	this.scale.set( scale, scale, 1 );
	this.rotation.y = Math.PI;

	this.container;

	this.originalRaycast = this.raycast;

	// Event Handler
	this.HANDLER_FOCUS;	

	this.material.side = THREE.DoubleSide;
	this.material.depthTest = false;
	this.material.transparent = true;
	this.material.opacity = 0;

	const postLoad = function ( texture ) {

		const ratio = texture.image.width / texture.image.height;
		const textureScale = new THREE.Vector3();

		texture.image.width = texture.image.naturalWidth || 64;
		texture.image.height = texture.image.naturalHeight || 64;

		this.scale.set( ratio * scale, scale, 1 );

		textureScale.copy( this.scale );

		this.scaleUpAnimation = new Tween.Tween( this.scale )
			.to( { x: textureScale.x * scaleFactor, y: textureScale.y * scaleFactor }, duration )
			.easing( Tween.Easing.Elastic.Out );

		this.scaleDownAnimation = new Tween.Tween( this.scale )
			.to( { x: textureScale.x, y: textureScale.y }, duration )
			.easing( Tween.Easing.Elastic.Out );

		this.material.map = texture;
		this.material.needsUpdate = true;

	}.bind( this );

	// Add show and hide animations
	this.showAnimation = new Tween.Tween( this.material )
		.to( { opacity: 1 }, duration )
		.onStart( this.enableRaycast.bind( this, true ) )
		.easing( Tween.Easing.Quartic.Out );

	this.hideAnimation = new Tween.Tween( this.material )
		.to( { opacity: 0 }, duration )
		.onStart( this.enableRaycast.bind( this, false ) )
		.easing( Tween.Easing.Quartic.Out );

	// Attach event listeners
	this.addEventListener( 'click', this.onClick );
	this.addEventListener( 'hover', this.onHover );
	this.addEventListener( 'hoverenter', this.onHoverStart );
	this.addEventListener( 'hoverleave', this.onHoverEnd );
	this.addEventListener( 'panolens-dual-eye-effect', this.onDualEyeEffect );
	this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
	this.addEventListener( 'dismiss', this.onDismiss );
	this.addEventListener( 'panolens-infospot-focus', this.setFocusMethod );
	this.addEventListener( 'panorama-enter', this.onPanoramaEnter );
	this.addEventListener( 'panorama-leave', this.onPanoramaLeave );

	TextureLoader.load( imageSrc, postLoad );	

}
Infospot.prototype = Object.assign( Object.create( THREE.Sprite.prototype ), {

	constructor: Infospot,

	onPanoramaEnter: function () {

		

	},

	onPanoramaLeave: function () {



	},

	/**
	 * Set infospot container
	 * @param {HTMLElement|object} data - Data with container information
	 */
	setContainer: function ( data ) {

		let container;
	
		if ( data instanceof HTMLElement ) {
	
			container = data;
	
		} else if ( data && data.container ) {
	
			container = data.container;
	
		}
	
		// Append element if exists
		if ( container && this.element ) {
	
			container.appendChild( this.element );
	
		}
	
		this.container = container;
	
	},

	/**
	 * Get container
	 * @return {HTMLElement} - The container of this infospot
	 */
	getContainer: function () {

		return this.container;

	},

	/**
	 * This will be called by a click event
	 * Translate and lock the hovering element if any
	 * @param  {object} event - Event containing mouseEvent with clientX and clientY
	 */
	onClick: function ( event ) {

		if ( this.element && this.getContainer() ) {

			this.onHoverStart( event );

			// Lock element
			this.lockHoverElement();

		}

	},

	/**
	 * Dismiss current element if any
	 * @param  {object} event - Dismiss event
	 */
	onDismiss: function ( event ) {

		if ( this.element ) {

			this.unlockHoverElement();
			this.onHoverEnd();

		}

	},

	/**
	 * This will be called by a mouse hover event
	 * Translate the hovering element if any
	 * @param  {object} event - Event containing mouseEvent with clientX and clientY
	 */
	onHover: function ( event ) {},

	/**
	 * This will be called on a mouse hover start
	 * Sets cursor style to 'pointer', display the element and scale up the infospot
	 */
	onHoverStart: function ( event ) {

		if ( !this.getContainer() ) { return; }

		const cursorStyle = this.cursorStyle || ( this.mode === MODES.NORMAL ? 'pointer' : 'default' );

		this.isHovering = true;
		this.container.style.cursor = cursorStyle;
		
		if ( this.animated ) {

			this.scaleDownAnimation && this.scaleDownAnimation.stop();
			this.scaleUpAnimation && this.scaleUpAnimation.start();

		}
		
		if ( this.element && event.mouseEvent.clientX >= 0 && event.mouseEvent.clientY >= 0 ) {

			if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

				this.element.style.display = 'none';
				this.element.left && ( this.element.left.style.display = 'block' );
				this.element.right && ( this.element.right.style.display = 'block' );

				// Store element width for reference
				this.element._width = this.element.left.clientWidth;
				this.element._height = this.element.left.clientHeight;

			} else {

				this.element.style.display = 'block';
				this.element.left && ( this.element.left.style.display = 'none' );
				this.element.right && ( this.element.right.style.display = 'none' );

				// Store element width for reference
				this.element._width = this.element.clientWidth;
				this.element._height = this.element.clientHeight;

			}
			
		}

	},

	/**
	 * This will be called on a mouse hover end
	 * Sets cursor style to 'default', hide the element and scale down the infospot
	 */
	onHoverEnd: function () {

		if ( !this.getContainer() ) { return; }

		this.isHovering = false;
		this.container.style.cursor = 'default';

		if ( this.animated ) {

			this.scaleUpAnimation && this.scaleUpAnimation.stop();
			this.scaleDownAnimation && this.scaleDownAnimation.start();

		}

		if ( this.element && !this.element.locked ) {

			this.element.style.display = 'none';
			this.element.left && ( this.element.left.style.display = 'none' );
			this.element.right && ( this.element.right.style.display = 'none' );

			this.unlockHoverElement();

		}

	},

	/**
	 * On dual eye effect handler
	 * Creates duplicate left and right element
	 * @param  {object} event - panolens-dual-eye-effect event
	 */
	onDualEyeEffect: function ( event ) {
		
		if ( !this.getContainer() ) { return; }

		let element, halfWidth, halfHeight;

		this.mode = event.mode;

		element = this.element;

		halfWidth = this.container.clientWidth / 2;
		halfHeight = this.container.clientHeight / 2;

		if ( !element ) {

			return;

		}

		if ( !element.left || !element.right ) {

			element.left = element.cloneNode( true );
			element.right = element.cloneNode( true );

		}

		if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

			element.left.style.display = element.style.display;
			element.right.style.display = element.style.display;
			element.style.display = 'none';

		} else {

			element.style.display = element.left.style.display;
			element.left.style.display = 'none';
			element.right.style.display = 'none';

		}

		// Update elements translation
		this.translateElement( halfWidth, halfHeight );

		this.container.appendChild( element.left );
		this.container.appendChild( element.right );

	},

	/**
	 * Translate the hovering element by css transform
	 * @param  {number} x - X position on the window screen
	 * @param  {number} y - Y position on the window screen
	 */
	translateElement: function ( x, y ) {

		if ( !this.element._width || !this.element._height || !this.getContainer() ) {

			return;

		}

		let left, top, element, width, height, delta, container;

		container = this.container;
		element = this.element;
		width = element._width / 2;
		height = element._height / 2;
		delta = element.verticalDelta !== undefined ? element.verticalDelta : 40;

		left = x - width;
		top = y - height - delta;

		if ( ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) 
				&& element.left && element.right
				&& !( x === container.clientWidth / 2 && y === container.clientHeight / 2 ) ) {

			left = container.clientWidth / 4 - width + ( x - container.clientWidth / 2 );
			top = container.clientHeight / 2 - height - delta + ( y - container.clientHeight / 2 );

			this.setElementStyle( 'transform', element.left, 'translate(' + left + 'px, ' + top + 'px)' );

			left += container.clientWidth / 2;

			this.setElementStyle( 'transform', element.right, 'translate(' + left + 'px, ' + top + 'px)' );

		} else {

			this.setElementStyle( 'transform', element, 'translate(' + left + 'px, ' + top + 'px)' );

		}

	},

	/**
	 * Set vendor specific css
	 * @param {string} type - CSS style name
	 * @param {HTMLElement} element - The element to be modified
	 * @param {string} value - Style value
	 */
	setElementStyle: function ( type, element, value ) {

		const style = element.style;

		if ( type === 'transform' ) {

			style.webkitTransform = style.msTransform = style.transform = value;

		}

	},

	/**
	 * Set hovering text content
	 * @param {string} text - Text to be displayed
	 */
	setText: function ( text ) {

		if ( this.element ) {

			this.element.textContent = text;

		}

	},

	/**
	 * Set cursor css style on hover
	 */
	setCursorHoverStyle: function ( style ) {

		this.cursorStyle = style;

	},

	/**
	 * Add hovering text element
	 * @param {string} text - Text to be displayed
	 * @param {number} [delta=40] - Vertical delta to the infospot
	 */
	addHoverText: function ( text, delta ) {

		if ( !this.element ) {

			this.element = document.createElement( 'div' );
			this.element.style.display = 'none';
			this.element.style.color = '#fff';
			this.element.style.top = 0;
			this.element.style.maxWidth = '50%';
			this.element.style.maxHeight = '50%';
			this.element.style.textShadow = '0 0 3px #000000';
			this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
			this.element.style.position = 'absolute';
			this.element.classList.add( 'panolens-infospot' );
			this.element.verticalDelta = delta !== undefined ? delta : 40;

		}

		this.setText( text );

	},

	/**
	 * Add hovering element by cloning an element
	 * @param {HTMLDOMElement} el - Element to be cloned and displayed
	 * @param {number} [delta=40] - Vertical delta to the infospot
	 */
	addHoverElement: function ( el, delta ) {

		if ( !this.element ) { 

			this.element = el.cloneNode( true );
			this.element.style.display = 'none';
			this.element.style.top = 0;
			this.element.style.position = 'absolute';
			this.element.classList.add( 'panolens-infospot' );
			this.element.verticalDelta = delta !== undefined ? delta : 40;

		}

	},

	/**
	 * Remove hovering element
	 */
	removeHoverElement: function () {

		if ( this.element ) { 

			if ( this.element.left ) {

				this.container.removeChild( this.element.left );
				this.element.left = null;

			}

			if ( this.element.right ) {

				this.container.removeChild( this.element.right );
				this.element.right = null;

			}

			this.container.removeChild( this.element );
			this.element = null;

		}

	},

	/**
	 * Lock hovering element
	 */
	lockHoverElement: function () {

		if ( this.element ) { 

			this.element.locked = true;

		}

	},

	/**
	 * Unlock hovering element
	 */
	unlockHoverElement: function () {

		if ( this.element ) { 

			this.element.locked = false;

		}

	},

	enableRaycast: function ( enabled = true ) {

		if ( enabled ) {

			this.raycast = this.originalRaycast;

		} else {

			this.raycast = () => {};

		}

	},

	/**
	 * Show infospot
	 * @param  {number} [delay=0] - Delay time to show
	 */
	show: function ( delay = 0 ) {

		if ( this.animated ) {

			this.hideAnimation && this.hideAnimation.stop();
			this.showAnimation && this.showAnimation.delay( delay ).start();

		} else {

			this.material.opacity = 1;

		}

	},

	/**
	 * Hide infospot
	 * @param  {number} [delay=0] - Delay time to hide
	 */
	hide: function ( delay = 0 ) {

		if ( this.animated ) {

			this.showAnimation && this.showAnimation.stop();
			this.hideAnimation && this.hideAnimation.delay( delay ).start();

		} else {

			this.material.opacity = 0;

		}
		
	},

	/**
	 * Set focus event handler
	 */
	setFocusMethod: function ( event ) {

		if ( event ) {

			this.HANDLER_FOCUS = event.method;

		}

	},

	/**
	 * Focus camera center to this infospot
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	focus: function ( duration, easing ) {

		if ( this.HANDLER_FOCUS ) {

			this.HANDLER_FOCUS( this.position, duration, easing );
			this.onDismiss();

		}

	},

	/**
	 * Dispose infospot
	 */
	dispose: function () {

		this.removeHoverElement();
		this.material.dispose();

		if ( this.parent ) {

			this.parent.remove( this );

		}

	}

} );

/**
 * Widget for controls
 * @constructor
 * @param {HTMLElement} container - A domElement where default control widget will be attached to
 */
function Widget ( container ) {

	if ( !container ) {

		console.warn( 'PANOLENS.Widget: No container specified' );

	}

	THREE.EventDispatcher.call( this );

	this.DEFAULT_TRANSITION  = 'all 0.27s ease';
	this.TOUCH_ENABLED = !!(( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch);
	this.PREVENT_EVENT_HANDLER = function ( event ) {
		event.preventDefault();
		event.stopPropagation();
	};

	this.container = container;

	this.barElement;
	this.fullscreenElement;
	this.videoElement;
	this.settingElement;

	this.mainMenu;

	this.activeMainItem;
	this.activeSubMenu;
	this.mask;

}

Widget.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	constructor: Widget,

	/**
	 * Add control bar
	 */
	addControlBar: function () {

		if ( !this.container ) {

			console.warn( 'Widget container not set' ); 
			return; 
		}

		var scope = this, bar, styleTranslate, styleOpacity, gradientStyle;

		gradientStyle = 'linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))';

		bar = document.createElement( 'div' );
		bar.style.width = '100%';
		bar.style.height = '44px';
		bar.style.float = 'left';
		bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = 'translateY(-100%)';
		bar.style.background = '-webkit-' + gradientStyle;
		bar.style.background = '-moz-' + gradientStyle;
		bar.style.background = '-o-' + gradientStyle;
		bar.style.background = '-ms-' + gradientStyle;
		bar.style.background = gradientStyle;
		bar.style.transition = this.DEFAULT_TRANSITION;
		bar.style.pointerEvents = 'none';
		bar.isHidden = false;
		bar.toggle = function () {
			bar.isHidden = !bar.isHidden;
			styleTranslate = bar.isHidden ? 'translateY(0)' : 'translateY(-100%)';
			styleOpacity = bar.isHidden ? 0 : 1;
			bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = styleTranslate;
			bar.style.opacity = styleOpacity;
		};

		// Menu
		var menu = this.createDefaultMenu();
		this.mainMenu = this.createMainMenu( menu );
		bar.appendChild( this.mainMenu );

		// Mask
		var mask = this.createMask();
		this.mask = mask;
		this.container.appendChild( mask );

		// Dispose
		bar.dispose = function () {

			if ( scope.fullscreenElement ) {

				bar.removeChild( scope.fullscreenElement );
				scope.fullscreenElement.dispose();
				scope.fullscreenElement = null;

			}

			if ( scope.settingElement ) {

				bar.removeChild( scope.settingElement );
				scope.settingElement.dispose();
				scope.settingElement = null;

			}

			if ( scope.videoElement ) {

				bar.removeChild( scope.videoElement );
				scope.videoElement.dispose();
				scope.videoElement = null;

			}

		};

		this.container.appendChild( bar );

		// Mask events
		this.mask.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			scope.mask.hide();
			scope.settingElement.deactivate();

		}, false );

		// Event listener
		this.addEventListener( 'control-bar-toggle', bar.toggle );

		this.barElement = bar;

	},

	/**
	 * Create default menu
	 */
	createDefaultMenu: function () {

		var scope = this, handler;

		handler = function ( method, data ) {

			return function () {

				scope.dispatchEvent( { 

					type: 'panolens-viewer-handler', 
					method: method, 
					data: data 

				} ); 

			}

		};

		return [

			{ 
				title: 'Control', 
				subMenu: [ 
					{ 
						title: this.TOUCH_ENABLED ? 'Touch' : 'Mouse', 
						handler: handler( 'enableControl', CONTROLS.ORBIT )
					},
					{ 
						title: 'Sensor', 
						handler: handler( 'enableControl', CONTROLS.DEVICEORIENTATION ) 
					} 
				]
			},

			{ 
				title: 'Mode', 
				subMenu: [ 
					{ 
						title: 'Normal',
						handler: handler( 'disableEffect' )
					}, 
					{ 
						title: 'Cardboard',
						handler: handler( 'enableEffect', MODES.CARDBOARD )
					},
					{ 
						title: 'Stereoscopic',
						handler: handler( 'enableEffect', MODES.STEREO )
					}
				]
			}

		];

	},

	/**
	 * Add buttons on top of control bar
	 * @param {string} name - The control button name to be created
	 */
	addControlButton: function ( name ) {

		let element;

		switch( name ) {

			case 'fullscreen':

				element = this.createFullscreenButton();
				this.fullscreenElement = element; 

				break;

			case 'setting':

				element = this.createSettingButton();
				this.settingElement = element;

				break;

			case 'video':

				element = this.createVideoControl();
				this.videoElement = element;

				break;

			default:

				return;

		}

		if ( !element ) {

			return;

		}

		this.barElement.appendChild( element );

	},

	createMask: function () {

		const element = document.createElement( 'div' );
		element.style.position = 'absolute';
		element.style.top = 0;
		element.style.left = 0;
		element.style.width = '100%';
		element.style.height = '100%';
		element.style.background = 'transparent';
		element.style.display = 'none';

		element.show = function () {

			this.style.display = 'block';

		};

		element.hide = function () {

			this.style.display = 'none';

		};

		return element;

	},

	/**
	 * Create Setting button to toggle menu
	 */
	createSettingButton: function () {

		let scope = this, item;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			scope.mainMenu.toggle();

			if ( this.activated ) {
	
				this.deactivate();

			} else {

				this.activate();

			}

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + DataImage.Setting + '")',
				webkitTransition : this.DEFAULT_TRANSITION,
				transition : this.DEFAULT_TRANSITION

			},

			onTap: onTap

		} );

		item.activate = function () {

			this.style.transform = 'rotate3d(0,0,1,90deg)';
			this.activated = true;
			scope.mask.show();

		};

		item.deactivate = function () {

			this.style.transform = 'rotate3d(0,0,0,0)';
			this.activated = false;
			scope.mask.hide();

			if ( scope.mainMenu && scope.mainMenu.visible ) {

				scope.mainMenu.hide();
				
			}

			if ( scope.activeSubMenu && scope.activeSubMenu.visible ) {

				scope.activeSubMenu.hide();

			}

			if ( scope.mainMenu && scope.mainMenu._width ) {

				scope.mainMenu.changeSize( scope.mainMenu._width );
				scope.mainMenu.unslideAll();

			}
			
		};

		item.activated = false;

		return item;

	},

	/**
	 * Create Fullscreen button
	 * @return {HTMLSpanElement} - The dom element icon for fullscreen
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	createFullscreenButton: function () {

		let scope = this, item, isFullscreen = false, tapSkipped = true, stylesheetId;

		stylesheetId = 'panolens-style-addon';

		// Don't create button if no support
		if ( !document.fullscreenEnabled       && 
			!document.webkitFullscreenEnabled &&
			!document.mozFullScreenEnabled    &&
			!document.msFullscreenEnabled ) {
			return;
		}

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			tapSkipped = false;

			if ( !isFullscreen ) {
				scope.container.requestFullscreen && scope.container.requestFullscreen();
				scope.container.msRequestFullscreen && scope.container.msRequestFullscreen();
				scope.container.mozRequestFullScreen && scope.container.mozRequestFullScreen();
				scope.container.webkitRequestFullscreen && scope.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				isFullscreen = true;
			} else {
				document.exitFullscreen && document.exitFullscreen();
				document.msExitFullscreen && document.msExitFullscreen();
				document.mozCancelFullScreen && document.mozCancelFullScreen();
				document.webkitExitFullscreen && document.webkitExitFullscreen();
				isFullscreen = false;
			}

			this.style.backgroundImage = ( isFullscreen ) 
				? 'url("' + DataImage.FullscreenLeave + '")' 
				: 'url("' + DataImage.FullscreenEnter + '")';

		}

		function onFullScreenChange (e) {

			if ( tapSkipped ) {

				isFullscreen = !isFullscreen; 

				item.style.backgroundImage = ( isFullscreen ) 
				? 'url("' + DataImage.FullscreenLeave + '")' 
				: 'url("' + DataImage.FullscreenEnter + '")';

			}

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onWindowResize' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onWindowResize', data: false } );

			tapSkipped = true;

		}

		document.addEventListener( 'fullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'webkitfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'mozfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'MSFullscreenChange', onFullScreenChange, false );

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + DataImage.FullscreenEnter + '")' 

			},

			onTap : onTap

		} );

		// Add fullscreen stlye if not exists
		if ( !document.querySelector( stylesheetId ) ) {
			const sheet = document.createElement( 'style' );
			sheet.id = stylesheetId;
			sheet.innerHTML = ':-webkit-full-screen { width: 100% !important; height: 100% !important }';
			document.body.appendChild( sheet );
		}
		
		return item;

	},

	/**
	 * Create video control container
	 * @return {HTMLSpanElement} - The dom element icon for video control
	 */
	createVideoControl: function () {

		const item = document.createElement( 'span' );
		item.style.display = 'none';
		item.show = function () { 

			item.style.display = '';

		};

		item.hide = function () { 

			item.style.display = 'none';
			item.controlButton.paused = true;
			item.controlButton.update();

		};

		item.controlButton = this.createVideoControlButton();
		item.seekBar = this.createVideoControlSeekbar();
		
		item.appendChild( item.controlButton );
		item.appendChild( item.seekBar );

		item.dispose = function () {

			item.removeChild( item.controlButton );
			item.removeChild( item.seekBar );

			item.controlButton.dispose();
			item.controlButton = null;

			item.seekBar.dispose();
			item.seekBar = null;

		};

		this.addEventListener( 'video-control-show', item.show );
		this.addEventListener( 'video-control-hide', item.hide );

		return item;

	},

	/**
	 * Create video control button
	 * @return {HTMLSpanElement} - The dom element icon for video control
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	createVideoControlButton: function () {

		const scope = this;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'toggleVideoPlay' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay', data: !this.paused } );

			this.paused = !this.paused;

			item.update();

		}
		const item = this.createCustomItem( { 

			style : { 

				float : 'left',
				backgroundImage : 'url("' + DataImage.VideoPlay + '")'

			},

			onTap : onTap

		} );

		item.paused = true;

		item.update = function ( paused ) {

			this.paused = paused !== undefined ? paused : this.paused;

			this.style.backgroundImage = 'url("' + ( this.paused 
				? DataImage.VideoPlay 
				: DataImage.VideoPause ) + '")';

		};

		return item;

	},

	/**
	 * Create video seekbar
	 * @return {HTMLSpanElement} - The dom element icon for video seekbar
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	createVideoControlSeekbar: function () {

		let scope = this, item, progressElement, progressElementControl,
			isDragging = false, mouseX, percentageNow, percentageNext;

		progressElement = document.createElement( 'div' );
		progressElement.style.width = '0%';
		progressElement.style.height = '100%';
		progressElement.style.backgroundColor = '#fff';

		progressElementControl = document.createElement( 'div' );
		progressElementControl.style.float = 'right';
		progressElementControl.style.width = '14px';
		progressElementControl.style.height = '14px';
		progressElementControl.style.transform = 'translate(7px, -5px)';
		progressElementControl.style.borderRadius = '50%';
		progressElementControl.style.backgroundColor = '#ddd';

		progressElementControl.addEventListener( 'mousedown', onMouseDown, { passive: true } );
		progressElementControl.addEventListener( 'touchstart', onMouseDown,  { passive: true } );

		function onMouseDown ( event ) {

			event.stopPropagation();
			
			isDragging = true;
			
			mouseX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );

			percentageNow = parseInt( progressElement.style.width ) / 100;

			addControlListeners();
		}

		function onVideoControlDrag ( event ) {

			if( isDragging ){

				const clientX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );
				
				percentageNext = ( clientX - mouseX ) / item.clientWidth;

				percentageNext = percentageNow + percentageNext;

				percentageNext = percentageNext > 1 ? 1 : ( ( percentageNext < 0 ) ? 0 : percentageNext );

				item.setProgress ( percentageNext );

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'setVideoCurrentTime' function call on PANOLENS.Viewer
				 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentageNext } );

			}

		}

		function onVideoControlStop ( event ) {

			event.stopPropagation();

			isDragging = false;

			removeControlListeners();

		}

		function addControlListeners () {

			scope.container.addEventListener( 'mousemove', onVideoControlDrag, { passive: true } );
			scope.container.addEventListener( 'mouseup', onVideoControlStop, { passive: true } );
			scope.container.addEventListener( 'touchmove', onVideoControlDrag, { passive: true } );
			scope.container.addEventListener( 'touchend', onVideoControlStop, { passive: true } );


		}

		function removeControlListeners () {

			scope.container.removeEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.removeEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'touchend', onVideoControlStop, false );

		}

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			if ( event.target === progressElementControl ) { return; }

			const percentage = ( event.changedTouches && event.changedTouches.length > 0 )
				? ( event.changedTouches[0].pageX - event.target.getBoundingClientRect().left ) / this.clientWidth
				: event.offsetX / this.clientWidth;

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'setVideoCurrentTime' function call on PANOLENS.Viewer
			 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentage } );

			item.setProgress( event.offsetX / this.clientWidth );

		}
		function onDispose () {

			removeControlListeners();
			progressElement = null;
			progressElementControl = null;

		}

		progressElement.appendChild( progressElementControl );

		item = this.createCustomItem( {

			style : { 

				float : 'left',
				width : '30%',
				height : '4px',
				marginTop : '20px',
				backgroundColor : 'rgba(188,188,188,0.8)'

			},

			onTap : onTap,
			onDispose: onDispose

		} );

		item.appendChild( progressElement );

		item.setProgress = function( percentage ) {

			progressElement.style.width = percentage * 100 + '%';

		};		

		this.addEventListener( 'video-update', function ( event ) { 

			item.setProgress( event.percentage ); 

		} );

		return item;

	},

	/**
	 * Create menu item
	 * @param  {string} title - Title to display
	 * @return {HTMLDomElement} - An anchor tag element
	 */
	createMenuItem: function ( title ) {

		const scope = this; 
		const item = document.createElement( 'a' );
		item.textContent = title;
		item.style.display = 'block';
		item.style.padding = '10px';
		item.style.textDecoration = 'none';
		item.style.cursor = 'pointer';
		item.style.pointerEvents = 'auto';
		item.style.transition = this.DEFAULT_TRANSITION;

		item.slide = function ( right ) {

			this.style.transform = 'translateX(' + ( right ? '' : '-' ) + '100%)';

		};

		item.unslide = function () {

			this.style.transform = 'translateX(0)';

		};

		item.setIcon = function ( url ) {

			if ( this.icon ) {

				this.icon.style.backgroundImage = 'url(' + url + ')';

			}

		};

		item.setSelectionTitle = function ( title ) {

			if ( this.selection ) {

				this.selection.textContent = title;

			}

		};

		item.addSelection = function ( name ) {
			
			const selection = document.createElement( 'span' );
			selection.style.fontSize = '13px';
			selection.style.fontWeight = '300';
			selection.style.float = 'right';

			this.selection = selection;
			this.setSelectionTitle( name );
			this.appendChild( selection );
			
			return this;

		};

		item.addIcon = function ( url = DataImage.ChevronRight, left = false, flip = false ) {
			
			const element = document.createElement( 'span' );
			element.style.float = left ? 'left' : 'right';
			element.style.width = '17px';
			element.style.height = '17px';
			element.style[ 'margin' + ( left ? 'Right' : 'Left' ) ] = '12px';
			element.style.backgroundSize = 'cover';

			if ( flip ) {

				element.style.transform = 'rotateZ(180deg)';

			}

			this.icon = element;
			this.setIcon( url );
			this.appendChild( element );

			return this;

		};

		item.addSubMenu = function ( title, items ) {

			this.subMenu = scope.createSubMenu( title, items );

			return this;

		};

		item.addEventListener( 'mouseenter', function () {
			
			this.style.backgroundColor = '#e0e0e0';

		}, false );

		item.addEventListener( 'mouseleave', function () {
			
			this.style.backgroundColor = '#fafafa';

		}, false );

		return item;

	},

	/**
	 * Create menu item header
	 * @param  {string} title - Title to display
	 * @return {HTMLDomElement} - An anchor tag element
	 */
	createMenuItemHeader: function ( title ) {

		const header = this.createMenuItem( title );

		header.style.borderBottom = '1px solid #333';
		header.style.paddingBottom = '15px';

		return header;

	},

	/**
	 * Create main menu
	 * @param  {array} menus - Menu array list
	 * @return {HTMLDomElement} - A span element
	 */
	createMainMenu: function ( menus ) {
		
		let scope = this, menu = this.createMenu();

		menu._width = 200;
		menu.changeSize( menu._width );

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			let mainMenu = scope.mainMenu, subMenu = this.subMenu;

			function onNextTick () {

				mainMenu.changeSize( subMenu.clientWidth );
				subMenu.show();
				subMenu.unslideAll();

			}

			mainMenu.hide();
			mainMenu.slideAll();
			mainMenu.parentElement.appendChild( subMenu );

			scope.activeMainItem = this;
			scope.activeSubMenu = subMenu;

			window.requestAnimationFrame( onNextTick );

		}
		for ( var i = 0; i < menus.length; i++ ) {

			var item = menu.addItem( menus[ i ].title );

			item.style.paddingLeft = '20px';

			item.addIcon()
				.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

			if ( menus[ i ].subMenu && menus[ i ].subMenu.length > 0 ) {

				var title = menus[ i ].subMenu[ 0 ].title;

				item.addSelection( title )
					.addSubMenu( menus[ i ].title, menus[ i ].subMenu );

			}

		}

		return menu;

	},

	/**
	 * Create sub menu
	 * @param {string} title - Sub menu title
	 * @param {array} items - Item array list
	 * @return {HTMLDomElement} - A span element
	 */
	createSubMenu: function ( title, items ) {

		let scope = this, menu, subMenu = this.createMenu();

		subMenu.items = items;
		subMenu.activeItem;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			menu = scope.mainMenu;
			menu.changeSize( menu._width );
			menu.unslideAll();
			menu.show();
			subMenu.slideAll( true );
			subMenu.hide();

			if ( this.type !== 'header' ) {

				subMenu.setActiveItem( this );
				scope.activeMainItem.setSelectionTitle( this.textContent );

				this.handler && this.handler();

			}

		}

		subMenu.addHeader( title ).addIcon( undefined, true, true ).addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

		for ( let i = 0; i < items.length; i++ ) {

			const item = subMenu.addItem( items[ i ].title );

			item.style.fontWeight = 300;
			item.handler = items[ i ].handler;
			item.addIcon( ' ', true );
			item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

			if ( !subMenu.activeItem ) {

				subMenu.setActiveItem( item );

			}

		}

		subMenu.slideAll( true );

		return subMenu;
		
	},

	/**
	 * Create general menu
	 * @return {HTMLDomElement} - A span element
	 */
	createMenu: function () {

		const scope = this;
		const menu = document.createElement( 'span' );
		const style = menu.style;

		style.padding = '5px 0';
		style.position = 'fixed';
		style.bottom = '100%';
		style.right = '14px';
		style.backgroundColor = '#fafafa';
		style.fontFamily = 'Helvetica Neue';
		style.fontSize = '14px';
		style.visibility = 'hidden';
		style.opacity = 0;
		style.boxShadow = '0 0 12pt rgba(0,0,0,0.25)';
		style.borderRadius = '2px';
		style.overflow = 'hidden';
		style.willChange = 'width, height, opacity';
		style.pointerEvents = 'auto';
		style.transition = this.DEFAULT_TRANSITION;

		menu.visible = false;

		menu.changeSize = function ( width, height ) {

			if ( width ) {

				this.style.width = width + 'px';

			}

			if ( height ) {

				this.style.height = height + 'px';

			}

		};

		menu.show = function () {

			this.style.opacity = 1;
			this.style.visibility = 'visible';
			this.visible = true;

		};

		menu.hide = function () {

			this.style.opacity = 0;
			this.style.visibility = 'hidden';
			this.visible = false;

		};

		menu.toggle = function () {

			if ( this.visible ) {

				this.hide();

			} else {

				this.show();

			}

		};

		menu.slideAll = function ( right ) {

			for ( let i = 0; i < menu.children.length; i++ ){

				if ( menu.children[ i ].slide ) {

					menu.children[ i ].slide( right );

				}

			}

		};

		menu.unslideAll = function () {

			for ( let i = 0; i < menu.children.length; i++ ){

				if ( menu.children[ i ].unslide ) {

					menu.children[ i ].unslide();

				}

			}

		};

		menu.addHeader = function ( title ) {

			const header = scope.createMenuItemHeader( title );
			header.type = 'header';

			this.appendChild( header );

			return header;

		};

		menu.addItem = function ( title ) {

			const item = scope.createMenuItem( title );
			item.type = 'item';

			this.appendChild( item );

			return item;

		};

		menu.setActiveItem = function ( item ) {

			if ( this.activeItem ) {

				this.activeItem.setIcon( ' ' );

			}

			item.setIcon( DataImage.Check );

			this.activeItem = item;

		};

		menu.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
		menu.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
		menu.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );

		return menu;

	},

	/**
	 * Create custom item element
	 * @return {HTMLSpanElement} - The dom element icon
	 */
	createCustomItem: function ( options = {} ) {

		const scope = this;
		const item = options.element || document.createElement( 'span' );

		item.style.cursor = 'pointer';
		item.style.float = 'right';
		item.style.width = '44px';
		item.style.height = '100%';
		item.style.backgroundSize = '60%';
		item.style.backgroundRepeat = 'no-repeat';
		item.style.backgroundPosition = 'center';
		item.style.webkitUserSelect = 
		item.style.MozUserSelect = 
		item.style.userSelect = 'none';
		item.style.position = 'relative';
		item.style.pointerEvents = 'auto';

		// White glow on icon
		item.addEventListener( scope.TOUCH_ENABLED ? 'touchstart' : 'mouseenter', function() {
			item.style.filter = 
			item.style.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
		}, { passive: true });
		item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'mouseleave', function() {
			item.style.filter = 
			item.style.webkitFilter = '';
		}, { passive: true });

		this.mergeStyleOptions( item, options.style );

		if ( options.onTap ) {

			item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

		}

		item.dispose = function () {

			item.removeEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

			options.onDispose && options.onDispose();

		};
		
		return item;

	},

	/**
	 * Merge item css style
	 * @param  {HTMLDOMElement} element - The element to be merged with style
	 * @param  {object} options - The style options
	 * @return {HTMLDOMElement} - The same element with merged styles
	 */
	mergeStyleOptions: function ( element, options = {} ) {

		for ( let property in options ){

			if ( options.hasOwnProperty( property ) ) {

				element.style[ property ] = options[ property ];

			}

		}

		return element;

	},

	/**
	 * Dispose widgets by detaching dom elements from container
	 */
	dispose: function () {

		if ( this.barElement ) {
			this.container.removeChild( this.barElement );
			this.barElement.dispose();
			this.barElement = null;

		}

	}
	
} );

/**
 * Skeleton panorama derived from THREE.Mesh
 * @constructor
 * @param {THREE.Geometry} geometry - The geometry for this panorama
 * @param {THREE.Material} material - The material for this panorama
 */
function Panorama ( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	this.type = 'panorama';

	this.ImageQualityLow = 1;
	this.ImageQualityFair = 2;
	this.ImageQualityMedium = 3;
	this.ImageQualityHigh = 4;
	this.ImageQualitySuperHigh = 5;

	this.animationDuration = 1000;

	this.defaultInfospotSize = 350;

	this.container = undefined;

	this.loaded = false;

	this.linkedSpots = [];

	this.isInfospotVisible = false;
	
	this.linkingImageURL = undefined;
	this.linkingImageScale = undefined;

	this.material.side = THREE.BackSide;
	this.material.opacity = 0;

	this.scale.x *= -1;
	this.renderOrder = -1;

	this.active = false;

	this.infospotAnimation = new Tween.Tween( this ).to( {}, this.animationDuration / 2 );

	this.addEventListener( 'load', this.fadeIn.bind( this ) );
	this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
	this.addEventListener( 'click', this.onClick.bind( this ) );

	this.setupTransitions();

}

Panorama.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {

	constructor: Panorama,

	/**
	 * Adding an object
	 * To counter the scale.x = -1, it will automatically add an 
	 * empty object with inverted scale on x
	 * @param {THREE.Object3D} object - The object to be added
	 */
	add: function ( object ) {

		let invertedObject;

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		// In case of infospots
		if ( object instanceof Infospot ) {

			invertedObject = object;

			if ( object.dispatchEvent ) {

				this.container && object.dispatchEvent( { type: 'panolens-container', container: this.container } );
				
				object.dispatchEvent( { type: 'panolens-infospot-focus', method: function ( vector, duration, easing ) {

					/**
					 * Infospot focus handler event
					 * @type {object}
					 * @event PANOLENS.Panorama#panolens-viewer-handler
					 * @property {string} method - Viewer function name
					 * @property {*} data - The argument to be passed into the method
					 */
					this.dispatchEvent( { type : 'panolens-viewer-handler', method: 'tweenControlCenter', data: [ vector, duration, easing ] } );


				}.bind( this ) } );
			}

		} else {

			// Counter scale.x = -1 effect
			invertedObject = new THREE.Object3D();
			invertedObject.scale.x = -1;
			invertedObject.scalePlaceHolder = true;
			invertedObject.add( object );

		}

		THREE.Object3D.prototype.add.call( this, invertedObject );

	},

	load: function () {

		this.onLoad();
		
	},

	/**
	 * Click event handler
	 * @param  {object} event - Click event
	 * @fires PANOLENS.Infospot#dismiss
	 */
	onClick: function ( event ) {

		if ( event.intersects && event.intersects.length === 0 ) {

			this.traverse( function ( object ) {

				/**
				 * Dimiss event
				 * @type {object}
				 * @event PANOLENS.Infospot#dismiss
				 */
				object.dispatchEvent( { type: 'dismiss' } );

			} );

		}

	},

	/**
	 * Set container of this panorama 
	 * @param {HTMLElement|object} data - Data with container information
	 * @fires PANOLENS.Infospot#panolens-container
	 */
	setContainer: function ( data ) {

		let container;

		if ( data instanceof HTMLElement ) {

			container = data;

		} else if ( data && data.container ) {

			container = data.container;

		}

		if ( container ) {

			this.children.forEach( function ( child ) {

				if ( child instanceof Infospot && child.dispatchEvent ) {

					/**
					 * Set container event
					 * @type {object}
					 * @event PANOLENS.Infospot#panolens-container
					 * @property {HTMLElement} container - The container of this panorama
					 */
					child.dispatchEvent( { type: 'panolens-container', container: container } );

				}

			} );

			this.container = container;

		}

	},

	/**
	 * This will be called when panorama is loaded
	 * @fires PANOLENS.Panorama#load
	 */
	onLoad: function () {

		this.loaded = true;

		/**
		 * Load panorama event
		 * @type {object}
		 * @event PANOLENS.Panorama#load
		 */
		this.dispatchEvent( { type: 'load' } );

	},

	/**
	 * This will be called when panorama is in progress
	 * @fires PANOLENS.Panorama#progress
	 */
	onProgress: function ( progress ) {

		/**
		 * Loading panorama progress event
		 * @type {object}
		 * @event PANOLENS.Panorama#progress
		 * @property {object} progress - The progress object containing loaded and total amount
		 */
		this.dispatchEvent( { type: 'progress', progress: progress } );

	},

	/**
	 * This will be called when panorama loading has error
	 * @fires PANOLENS.Panorama#error
	 */
	onError: function () {

		/**
		 * Loading panorama error event
		 * @type {object}
		 * @event PANOLENS.Panorama#error
		 */
		this.dispatchEvent( { type: 'error' } );

	},

	/**
	 * Get zoom level based on window width
	 * @return {number} zoom level indicating image quality
	 */
	getZoomLevel: function () {

		let zoomLevel;

		if ( window.innerWidth <= 800 ) {

			zoomLevel = this.ImageQualityFair;

		} else if ( window.innerWidth > 800 &&  window.innerWidth <= 1280 ) {

			zoomLevel = this.ImageQualityMedium;

		} else if ( window.innerWidth > 1280 && window.innerWidth <= 1920 ) {

			zoomLevel = this.ImageQualityHigh;

		} else if ( window.innerWidth > 1920 ) {

			zoomLevel = this.ImageQualitySuperHigh;

		} else {

			zoomLevel = this.ImageQualityLow;

		}

		return zoomLevel;

	},

	/**
	 * Update texture of a panorama
	 * @param {THREE.Texture} texture - Texture to be updated
	 */
	updateTexture: function ( texture ) {

		this.material.map = texture;
		this.material.needsUpdate = true;

	},

	/**
	 * Toggle visibility of infospots in this panorama
	 * @param  {boolean} isVisible - Visibility of infospots
	 * @param  {number} delay - Delay in milliseconds to change visibility
	 * @fires PANOLENS.Panorama#infospot-animation-complete
	 */
	toggleInfospotVisibility: function ( isVisible, delay ) {

		delay = ( delay !== undefined ) ? delay : 0;

		const visible = ( isVisible !== undefined ) ? isVisible : ( this.isInfospotVisible ? false : true );

		this.traverse( function ( object ) {

			if ( object instanceof Infospot ) {

				visible ? object.show( delay ) : object.hide( delay );

			}

		} );

		this.isInfospotVisible = visible;

		// Animation complete event
		this.infospotAnimation.onComplete( function () {

			/**
			 * Complete toggling infospot visibility
			 * @event PANOLENS.Panorama#infospot-animation-complete
			 * @type {object} 
			 */
			this.dispatchEvent( { type : 'infospot-animation-complete', visible: visible } );

		}.bind( this ) ).delay( delay ).start();

	},

	/**
	 * Set image of this panorama's linking infospot
	 * @param {string} url   - Url to the image asset
	 * @param {number} scale - Scale factor of the infospot
	 */
	setLinkingImage: function ( url, scale ) {

		this.linkingImageURL = url;
		this.linkingImageScale = scale;

	},

	/**
	 * Link one-way panorama
	 * @param  {PANOLENS.Panorama} pano  - The panorama to be linked to
	 * @param  {THREE.Vector3} position - The position of infospot which navigates to the pano
	 * @param  {number} [imageScale=300] - Image scale of linked infospot
	 * @param  {string} [imageSrc=PANOLENS.DataImage.Arrow] - The image source of linked infospot
	 */
	link: function ( pano, position, imageScale, imageSrc ) {

		let scale, img;

		this.visible = true;

		if ( !position ) {

			console.warn( 'Please specify infospot position for linking' );

			return;

		}

		// Infospot scale
		if ( imageScale !== undefined ) {

			scale = imageScale;

		} else if ( pano.linkingImageScale !== undefined ) {

			scale = pano.linkingImageScale;

		} else {

			scale = 300;

		}


		// Infospot image
		if ( imageSrc ) {

			img = imageSrc;

		} else if ( pano.linkingImageURL ) {

			img = pano.linkingImageURL;

		} else {

			img = DataImage.Arrow;

		}

		// Creates a new infospot
		const spot = new Infospot( scale, img );
		spot.position.copy( position );
		spot.toPanorama = pano;
		spot.addEventListener( 'click', function () {

			/**
			 * Viewer handler event
			 * @type {object}
			 * @event PANOLENS.Panorama#panolens-viewer-handler
			 * @property {string} method - Viewer function name
			 * @property {*} data - The argument to be passed into the method
			 */
			this.dispatchEvent( { type : 'panolens-viewer-handler', method: 'setPanorama', data: pano } );

		}.bind( this ) );

		this.linkedSpots.push( spot );

		this.add( spot );

		this.visible = false;

	},

	reset: function () {

		this.children.length = 0;	

	},

	setupTransitions: function () {

		this.fadeInAnimation = new Tween.Tween( this.material )
			.easing( Tween.Easing.Quartic.Out )
			.onStart( function () {

				this.visible = true;
				//this.material.visible = true;

				/**
				 * Enter panorama fade in start event
				 * @event PANOLENS.Panorama#enter-fade-start
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-fade-start' } );

			}.bind( this ) );

		this.fadeOutAnimation = new Tween.Tween( this.material )
			.easing( Tween.Easing.Quartic.Out )
			.onComplete( function () {

				this.visible = false;
				//this.material.visible = true;

				/**
				 * Leave panorama complete event
				 * @event PANOLENS.Panorama#leave-complete
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'leave-complete' } );

			}.bind( this ) );

		this.enterTransition = new Tween.Tween( this )
			.easing( Tween.Easing.Quartic.Out )
			.onComplete( function () {

				/**
				 * Enter panorama and animation complete event
				 * @event PANOLENS.Panorama#enter-animation-complete
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-animation-complete' } );

			}.bind ( this ) )
			.start();

		this.leaveTransition = new Tween.Tween( this )
			.easing( Tween.Easing.Quartic.Out );

	},

	onFadeAnimationUpdate: function () {

		const alpha = this.material.opacity;
		const { uniforms } = this.material;

		if ( uniforms && uniforms.opacity ) {
			uniforms.opacity.value = alpha;
		}

	},

	/**
	 * Start fading in animation
	 * @fires PANOLENS.Panorama#enter-fade-complete
	 */
	fadeIn: function ( duration ) {

		duration = duration >= 0 ? duration : this.animationDuration;

		this.fadeOutAnimation.stop();
		this.fadeInAnimation
		.to( { opacity: 1 }, duration )
		.onUpdate( this.onFadeAnimationUpdate.bind( this ) )
		.onComplete( function () {

				this.toggleInfospotVisibility( true, duration / 2 );

				/**
				 * Enter panorama fade complete event
				 * @event PANOLENS.Panorama#enter-fade-complete
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-fade-complete' } );			

			}.bind( this ) )
		.start();

	},

	/**
	 * Start fading out animation
	 */
	fadeOut: function ( duration ) {

		duration = duration >= 0 ? duration : this.animationDuration;

		this.fadeInAnimation.stop();
		this.fadeOutAnimation
		.to( { opacity: 0 }, duration )
		.onUpdate( this.onFadeAnimationUpdate.bind( this ) )
		.start();

	},

	/**
	 * This will be called when entering a panorama 
	 * @fires PANOLENS.Panorama#enter
	 * @fires PANOLENS.Panorama#enter-animation-start
	 */
	onEnter: function () {

		const duration = this.animationDuration;

		this.leaveTransition.stop();
		this.enterTransition
			.to( {}, duration )
			.onStart( function () {

				/**
				 * Enter panorama and animation starting event
				 * @event PANOLENS.Panorama#enter-animation-start
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'enter-animation-start' } );
				
				if ( this.loaded ) {

					this.fadeIn( duration );

				} else {

					this.load();

				}
				
			}.bind( this ) )
			.start();

		/**
		 * Enter panorama event
		 * @event PANOLENS.Panorama#enter
		 * @type {object} 
		 */
		this.dispatchEvent( { type: 'enter' } );

		this.children.forEach( child => {

			child.dispatchEvent( { type: 'panorama-enter' } );

		} );

		this.active = true;

	},

	/**
	 * This will be called when leaving a panorama
	 * @fires PANOLENS.Panorama#leave
	 */
	onLeave: function () {

		const duration = this.animationDuration;

		this.enterTransition.stop();
		this.leaveTransition
			.to( {}, duration )
			.onStart( function () {

				/**
				 * Leave panorama and animation starting event
				 * @event PANOLENS.Panorama#leave-animation-start
				 * @type {object} 
				 */
				this.dispatchEvent( { type: 'leave-animation-start' } );

				this.fadeOut( duration );
				this.toggleInfospotVisibility( false );

			}.bind( this ) )
			.start();

		/**
		 * Leave panorama event
		 * @event PANOLENS.Panorama#leave
		 * @type {object} 
		 */
		this.dispatchEvent( { type: 'leave' } );

		this.children.forEach( child => {

			child.dispatchEvent( { type: 'panorama-leave' } );

		} );

		this.active = false;

	},

	/**
	 * Dispose panorama
	 */
	dispose: function () {

		/**
		 * On panorama dispose handler
		 * @type {object}
		 * @event PANOLENS.Panorama#panolens-viewer-handler
		 * @property {string} method - Viewer function name
		 * @property {*} data - The argument to be passed into the method
		 */
		this.dispatchEvent( { type : 'panolens-viewer-handler', method: 'onPanoramaDispose', data: this } );

		// recursive disposal on 3d objects
		function recursiveDispose ( object ) {

			for ( var i = object.children.length - 1; i >= 0; i-- ) {

				recursiveDispose( object.children[i] );
				object.remove( object.children[i] );

			}

			if ( object instanceof Infospot ) {

				object.dispose();

			}
			
			object.geometry && object.geometry.dispose();
			object.material && object.material.dispose();
		}

		recursiveDispose( this );

		if ( this.parent ) {

			this.parent.remove( this );

		}

	}

} );

/**
 * Equirectangular based image panorama
 * @constructor
 * @param {string} image - Image url or HTMLImageElement
 */
function ImagePanorama ( image, _geometry, _material ) {

	const radius = 5000;
	const geometry = _geometry || new THREE.SphereBufferGeometry( radius, 60, 40 );
	const material = _material || new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

	Panorama.call( this, geometry, material );

	this.src = image;
	this.radius = radius;

}

ImagePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	constructor: ImagePanorama,

	/**
	 * Load image asset
	 * @param  {*} src - Url or image element
	 */
	load: function ( src ) {

		src = src || this.src;

		if ( !src ) { 

			console.warn( 'Image source undefined' );

			return; 

		} else if ( typeof src === 'string' ) {

			TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

		} else if ( src instanceof HTMLImageElement ) {

			this.onLoad( new THREE.Texture( src ) );

		}

	},

	/**
	 * This will be called when image is loaded
	 * @param  {THREE.Texture} texture - Texture to be updated
	 */
	onLoad: function ( texture ) {

		texture.minFilter = texture.magFilter = THREE.LinearFilter;
		texture.needsUpdate = true;
		
		this.updateTexture( texture );

		requestAnimationFrame( Panorama.prototype.onLoad.bind( this ) );

	},

	reset: function () {

		Panorama.prototype.reset.call( this );

	},

	dispose: function () {

		// Release cached image
		THREE.Cache.remove( this.src );

		this.material.map && this.material.map.dispose();

		Panorama.prototype.dispose.call( this );

	}

} );

/**
 * Empty panorama
 * @constructor
 */
function EmptyPanorama () {

	const geometry = new THREE.BufferGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

	geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );

	Panorama.call( this, geometry, material );

}

EmptyPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	constructor: EmptyPanorama

} );

/**
 * Cubemap-based panorama
 * @constructor
 * @param {array} images - An array of cubetexture containing six images
 */
function CubePanorama ( images = [] ){

	const edgeLength = 10000;
	const shader = JSON.parse( JSON.stringify( THREE.ShaderLib[ 'cube' ] ) );
	const geometry = new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );
	const material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		side: THREE.BackSide,
		transparent: true

	} );

	Panorama.call( this, geometry, material );

	this.images = images;
	this.edgeLength = edgeLength;
	this.material.uniforms.opacity.value = 0;

}

CubePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	constructor: CubePanorama,

	/**
	 * Load 6 images and bind listeners
	 */
	load: function () {

		CubeTextureLoader.load( 	

			this.images, 

			this.onLoad.bind( this ), 
			this.onProgress.bind( this ), 
			this.onError.bind( this ) 

		);

	},

	/**
	 * This will be called when 6 textures are ready
	 * @param  {THREE.CubeTexture} texture - Cube texture
	 */
	onLoad: function ( texture ) {
		
		this.material.uniforms[ 'tCube' ].value = texture;

		Panorama.prototype.onLoad.call( this );

	},

	dispose: function () {	

		this.images.forEach( ( image ) => { THREE.Cache.remove( image ); } );

		this.material.uniforms[ 'tCube' ] && this.material.uniforms[ 'tCube' ].value.dispose();

		Panorama.prototype.dispose.call( this );

	}

} );

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

/**
 * Video Panorama
 * @constructor
 * @param {string} src - Equirectangular video url
 * @param {object} [options] - Option for video settings
 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
 * @param {boolean} [options.muted=true] - Mute the video or not. Need to be true in order to autoplay on some browsers
 * @param {boolean} [options.autoplay=false] - Specify if the video should auto play
 * @param {boolean} [options.playsinline=true] - Specify if video should play inline for iOS. If you want it to auto play inline, set both autoplay and muted options to true
 * @param {string} [options.crossOrigin="anonymous"] - Sets the cross-origin attribute for the video, which allows for cross-origin videos in some browsers (Firefox, Chrome). Set to either "anonymous" or "use-credentials".
 * @param {number} [radius=5000] - The minimum radius for this panoram
 */
function VideoPanorama ( src, options = {} ) {

	const radius = 5000;
	const geometry = new THREE.SphereBufferGeometry( radius, 60, 40 );
	const material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

	Panorama.call( this, geometry, material );

	this.src = src;

	this.options = {

		videoElement: document.createElement( 'video' ),
		loop: true,
		muted: true,
		autoplay: false,
		playsinline: true,
		crossOrigin: 'anonymous'

	};

	Object.assign( this.options, options );

	this.videoElement = this.options.videoElement;
	this.videoProgress = 0;
	this.radius = radius;

	this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
	this.addEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
	this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
	this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

}
VideoPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	constructor: VideoPanorama,

	isMobile: function () {

		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})( navigator.userAgent || navigator.vendor || window.opera );
		return check;

	},

	/**
	 * Load video panorama
	 * @fires  PANOLENS.Panorama#panolens-viewer-handler
	 */
	load: function () {

		const { muted, loop, autoplay, playsinline, crossOrigin } = this.options;
		const video = this.videoElement;
		const material = this.material;
		const onProgress = this.onProgress.bind( this );
		const onLoad = this.onLoad.bind( this );

		video.loop = loop;
		video.autoplay = autoplay;
		video.playsinline = playsinline;
		video.crossOrigin = crossOrigin;
		video.muted = muted;
		
		if ( playsinline ) {

			video.setAttribute( 'playsinline', '' );
			video.setAttribute( 'webkit-playsinline', '' );

		} 

		const onloadeddata = function(event) {

			this.setVideoTexture( video );

			if ( autoplay ) {

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'updateVideoPlayButton'
				 * @property {boolean} data - Pause video or not
				 */
				this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

			}

			// For mobile silent autoplay
			if ( this.isMobile() ) {

				video.pause();

				if ( autoplay && muted ) {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 */
					this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

				} else {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 */
					this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

				}
				
			}

			const loaded = () => {

				// Fix for threejs r89 delayed update
				material.map.needsUpdate = true;

				onProgress( { loaded: 1, total: 1 } );
				onLoad();

			};

			requestAnimationFrame( loaded );
			
		};

		/**
		 * Ready state of the audio/video element
		 * 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
		 * 1 = HAVE_METADATA - metadata for the audio/video is ready
		 * 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
		 * 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
		 * 4 = HAVE_ENOUGH_DATA - enough data available to start playing
		 */
		if ( video.readyState > 2 ) {

			onloadeddata.call( this );

		} else {

			if ( !video.querySelectorAll( 'source' ).length || !video.src ) {

				video.src = this.src;

			}

			video.load();
		}

		video.addEventListener( 'loadeddata', onloadeddata.bind( this ) );
		
		video.addEventListener( 'timeupdate', function ( event ) {

			this.videoProgress = video.duration >= 0 ? video.currentTime / video.duration : 0;

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onVideoUpdate'
			 * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: this.videoProgress } );

		}.bind( this ) );

		video.addEventListener( 'ended', function () {
			
			if ( !loop ) {

				this.resetVideo();
				this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

			}

		}.bind( this ), false ); 

	},

	/**
	 * Set video texture
	 * @param {HTMLVideoElement} video  - The html5 video element
	 * @fires PANOLENS.Panorama#panolens-viewer-handler
	 */
	setVideoTexture: function ( video ) {

		if ( !video ) return;

		const videoTexture = new THREE.VideoTexture( video );
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.format = THREE.RGBFormat;

		this.updateTexture( videoTexture );
	
	},

	reset: function () {

		this.videoElement = undefined;	

		Panorama.prototype.reset.call( this );

	},

	/**
	 * Check if video is paused
	 * @return {boolean} - is video paused or not
	 */
	isVideoPaused: function () {

		return this.videoElement.paused;

	},

	/**
	 * Toggle video to play or pause
	 */
	toggleVideo: function () {

		const video = this.videoElement;

		if ( !video ) { return; }

		video[ video.paused ? 'play' : 'pause' ]();

	},

	/**
	 * Set video currentTime
	 * @param {object} event - Event contains percentage. Range from 0.0 to 1.0
	 */
	setVideoCurrentTime: function ( { percentage } ) {

		const video = this.videoElement;

		if ( video && !Number.isNaN( percentage ) && percentage !== 1 ) {

			video.currentTime = video.duration * percentage;

			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: percentage } );

		}

	},

	/**
	 * Play video
	 */
	playVideo: function () {

		const video = this.videoElement;

		if ( video && video.paused ) {

			video.play();

		}

		/**
		 * Play event
		 * @type {object}
		 * @event 'play'
		 * */
		this.dispatchEvent( { type: 'play' } );

	},

	/**
	 * Pause video
	 */
	pauseVideo: function () {

		const video = this.videoElement;

		if ( video && !video.paused ) {

			video.pause();

		}

		/**
		 * Pause event
		 * @type {object}
		 * @event 'pause'
		 * */
		this.dispatchEvent( { type: 'pause' } );

	},

	/**
	 * Resume video
	 */
	resumeVideoProgress: function () {

		const video = this.videoElement;

		if ( video.readyState >= 4 && video.autoplay && !this.isMobile() ) {

			this.playVideo();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'updateVideoPlayButton'
			 * @property {boolean} data - Pause video or not
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

		} else {

			this.pauseVideo();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'updateVideoPlayButton'
			 * @property {boolean} data - Pause video or not
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

		}

		this.setVideoCurrentTime( { percentage: this.videoProgress } );

	},

	/**
	 * Reset video at stating point
	 */
	resetVideo: function () {

		const video = this.videoElement;

		if ( video ) {

			this.setVideoCurrentTime( { percentage: 0 } );

		}

	},

	/**
	* Check if video is muted
	* @return {boolean} - is video muted or not
	*/
	isVideoMuted: function () {

		return this.videoElement.muted;

	},

	/**
	 * Mute video
	 */
	muteVideo: function () {

		const video = this.videoElement;

		if ( video && !video.muted ) {

			video.muted = true;

		}

		this.dispatchEvent( { type: 'volumechange' } );

	},

	/**
	 * Unmute video
	 */
	unmuteVideo: function () {

		const video = this.videoElement;

		if ( this.videoElement && this.isVideoMuted() ) {

			this.videoElement.muted = false;

		}

		this.dispatchEvent( { type: 'volumechange' } );

	},

	/**
	 * Returns the video element
	 */
	getVideoElement: function () {

		return this.videoElement;

	},

	/**
	 * Dispose video panorama
	 */
	dispose: function () {

		this.resetVideo();
		this.pauseVideo();
		
		this.removeEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.removeEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
		this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

		this.material.map && this.material.map.dispose();

		Panorama.prototype.dispose.call( this );

	}

} );

function GoogleStreetLoader ( parameters = {} ) {

	this._parameters = parameters;
	this._zoom;
	this._panoId;
	this._panoClient = new google.maps.StreetViewService();
	this._count = 0;
	this._total = 0;
	this._canvas = [];
	this._ctx = [];
	this._wc = 0;
	this._hc = 0;
	this.result = null;
	this.rotation = 0;
	this.copyright = '';
	this.onSizeChange = null;
	this.onPanoramaLoad = null;

	this.levelsW = [ 1, 2, 4, 7, 13, 26 ];
	this.levelsH = [ 1, 1, 2, 4, 7, 13 ];

	this.widths = [ 416, 832, 1664, 3328, 6656, 13312 ];
	this.heights = [ 416, 416, 832, 1664, 3328, 6656 ];

	let gl;

	try {

		const canvas = document.createElement( 'canvas' );

		gl = canvas.getContext( 'experimental-webgl' );

		if( !gl ) {

			gl = canvas.getContext( 'webgl' );

		}

	}
	catch ( error ) {

	}

	const maxTexSize = Math.max( gl.getParameter( gl.MAX_TEXTURE_SIZE ), 6656 );
	this.maxW = maxTexSize;
	this.maxH = maxTexSize;

}

Object.assign( GoogleStreetLoader.prototype, {

	constructor: GoogleStreetLoader,

	setProgress: function ( loaded, total ) {

		if ( this.onProgress ) {

			this.onProgress( { loaded: loaded, total: total } );

		}
		
	},

	throwError: function ( message ) {

		if ( this.onError ) {

			this.onError( message );
			
		} else {

			console.error( message );

		}
		
	},

	adaptTextureToZoom: function () {

		const w = this.widths [ this._zoom ];
		const h = this.heights[ this._zoom ];

		const maxW = this.maxW;
		const maxH = this.maxH;

		this._wc = Math.ceil( w / maxW );
		this._hc = Math.ceil( h / maxH );

		for( let y = 0; y < this._hc; y++ ) {
			for( let x = 0; x < this._wc; x++ ) {
				const c = document.createElement( 'canvas' );
				if( x < ( this._wc - 1 ) ) c.width = maxW; else c.width = w - ( maxW * x );
				if( y < ( this._hc - 1 ) ) c.height = maxH; else c.height = h - ( maxH * y );
				this._canvas.push( c );
				this._ctx.push( c.getContext( '2d' ) );
			}
		}

	},

	composeFromTile: function ( x, y, texture ) {

		const maxW = this.maxW;
		const maxH = this.maxH;

		x *= 512;
		y *= 512;

		const px = Math.floor( x / maxW );
		const py = Math.floor( y / maxH );

		x -= px * maxW;
		y -= py * maxH;

		this._ctx[ py * this._wc + px ].drawImage( texture, 0, 0, texture.width, texture.height, x, y, 512, 512 );

		this.progress();
		
	},

	progress: function() {

		this._count++;
		
		this.setProgress( this._count, this._total );
		
		if ( this._count === this._total) {

			this.canvas = this._canvas;
			this.panoId = this._panoId;
			this.zoom = this._zoom;

			if ( this.onPanoramaLoad ) {

				this.onPanoramaLoad( this._canvas[ 0 ] );

			}

		}
	},

	loadFromId: function( id ) {

		this._panoId = id;
		this.composePanorama();

	},

	composePanorama: function () {

		this.setProgress( 0, 1 );
		
		const w = this.levelsW[ this._zoom ];
		const h = this.levelsH[ this._zoom ];
		const self = this;
			
		this._count = 0;
		this._total = w * h;

		const { useWebGL } = this._parameters;

		for( let y = 0; y < h; y++ ) {
			for( let x = 0; x < w; x++ ) {
				const url = 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile&zoom=' + this._zoom + '&x=' + x + '&y=' + y + '&panoid=' + this._panoId + '&nbt&fover=2';
				( function( x, y ) { 
					if( useWebGL ) {
						const texture = TextureLoader.load( url, null, function() {
							self.composeFromTile( x, y, texture );
						} );
					} else {
						const img = new Image();
						img.addEventListener( 'load', function() {
							self.composeFromTile( x, y, this );			
						} );
						img.crossOrigin = '';
						img.src = url;
					}
				} )( x, y );
			}
		}
		
	},

	load: function ( panoid ) {

		this.loadPano( panoid );

	},

	loadPano: function( id ) {

		const self = this;
		this._panoClient.getPanoramaById( id, function (result, status) {
			if (status === google.maps.StreetViewStatus.OK) {
				self.result = result;
				if( self.onPanoramaData ) self.onPanoramaData( result );
				//var h = google.maps.geometry.spherical.computeHeading(location, result.location.latLng);
				//rotation = (result.tiles.centerHeading - h) * Math.PI / 180.0;
				self.copyright = result.copyright;
				self._panoId = result.location.pano;
				self.location = location;
				self.composePanorama();
			} else {
				if( self.onNoPanoramaData ) self.onNoPanoramaData( status );
				self.throwError('Could not retrieve panorama for the following reason: ' + status);
			}
		});
		
	},

	setZoom: function( z ) {
		this._zoom = z;
		this.adaptTextureToZoom();
	}
	
} );

/**
 * Google streetview panorama
 * 
 * [How to get Panorama ID]{@link http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id}
 * @constructor
 * @param {string} panoId - Panorama id from Google Streetview 
 * @param {string} [apiKey] - Google Street View API Key
 */
function GoogleStreetviewPanorama ( panoId, apiKey ) {

	ImagePanorama.call( this );

	this.panoId = panoId;

	this.gsvLoader = undefined;

	this.loadRequested = false;

	this.setupGoogleMapAPI( apiKey );

}

GoogleStreetviewPanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

	constructor: GoogleStreetviewPanorama,

	/**
	 * Load Google Street View by panorama id
	 * @param {string} panoId - Gogogle Street View panorama id
	 */
	load: function ( panoId ) {

		this.loadRequested = true;

		panoId = ( panoId || this.panoId ) || {};

		if ( panoId && this.gsvLoader ) {

			this.loadGSVLoader( panoId );

		} else {

			this.gsvLoader = {};

		}

	},

	/**
	 * Setup Google Map API
	 */
	setupGoogleMapAPI: function ( apiKey ) {

		const script = document.createElement( 'script' );
		script.src = 'https://maps.googleapis.com/maps/api/js?';
		script.src += apiKey ? 'key=' + apiKey : '';
		script.onreadystatechange = this.setGSVLoader.bind( this );
		script.onload = this.setGSVLoader.bind( this );

		document.querySelector( 'head' ).appendChild( script );

	},

	/**
	 * Set GSV Loader
	 */
	setGSVLoader: function () {

		this.gsvLoader = new GoogleStreetLoader();

		if ( this.gsvLoader === {} || this.loadRequested ) {

			this.load();

		}

	},

	/**
	 * Get GSV Loader
	 * @return {object} GSV Loader instance
	 */
	getGSVLoader: function () {

		return this.gsvLoader;

	},

	/**
	 * Load GSV Loader
	 * @param  {string} panoId - Gogogle Street View panorama id
	 */
	loadGSVLoader: function ( panoId ) {

		this.loadRequested = false;

		this.gsvLoader.onProgress = this.onProgress.bind( this );

		this.gsvLoader.onPanoramaLoad = this.onLoad.bind( this );

		this.gsvLoader.setZoom( this.getZoomLevel() );

		this.gsvLoader.load( panoId );

		this.gsvLoader.loaded = true;
	},

	/**
	 * This will be called when panorama is loaded
	 * @param  {HTMLCanvasElement} canvas - Canvas where the tiles have been drawn
	 */
	onLoad: function ( canvas ) {

		if ( !this.gsvLoader ) { return; }

		ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );

	},

	reset: function () {

		this.gsvLoader = undefined;

		ImagePanorama.prototype.reset.call( this );

	}

} );

/**
 * Stereographic projection shader
 * based on http://notlion.github.io/streetview-stereographic
 * @author pchen66
 */

const StereographicShader = {

	uniforms: {

		"tDiffuse":   { value: new THREE.Texture() },
		"resolution": { value: 1.0 },
		"transform":  { value: new THREE.Matrix4() },
		"zoom": 	  { value: 1.0 },
		"opacity":    { value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = vec4( position, 1.0 );",

		"}" 

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float resolution;",
		"uniform mat4 transform;",
		"uniform float zoom;",
		"uniform float opacity;",

		"varying vec2 vUv;",

		"const float PI = 3.141592653589793;",

		"void main(){",

			"vec2 position = -1.0 +  2.0 * vUv;",

			"position *= vec2( zoom * resolution, zoom * 0.5 );",

			"float x2y2 = position.x * position.x + position.y * position.y;",
			"vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );",

			"sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );",

			"vec2 sampleUV = vec2(",
				"(atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,",
				"(asin(sphere_pnt.z) / PI + 0.5)",
			");",

			"gl_FragColor = texture2D( tDiffuse, sampleUV );",

			"gl_FragColor.a *= opacity;",

		"}"

	].join( "\n" )

};

/**
 * Little Planet
 * @constructor
 * @param {string} type 		- Type of little planet basic class
 * @param {string} source 		- URL for the image source
 * @param {number} [size=10000] - Size of plane geometry
 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
 */
function LittlePlanet ( type = 'image', source, size = 10000, ratio = 0.5 ) {

	if ( type === 'image' ) {

		ImagePanorama.call( this, source, this.createGeometry( size, ratio ), this.createMaterial( size ) );

	}

	this.size = size;
	this.ratio = ratio;
	this.EPS = 0.000001;
	this.frameId;

	this.dragging = false;
	this.userMouse = new THREE.Vector2();

	this.quatA = new THREE.Quaternion();
	this.quatB = new THREE.Quaternion();
	this.quatCur = new THREE.Quaternion();
	this.quatSlerp = new THREE.Quaternion();

	this.vectorX = new THREE.Vector3( 1, 0, 0 );
	this.vectorY = new THREE.Vector3( 0, 1, 0 );

	this.addEventListener( 'window-resize', this.onWindowResize );

}

LittlePlanet.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

	constructor: LittlePlanet,

	add: function ( object ) {

		if ( arguments.length > 1 ) {
			
			for ( let i = 0; i < arguments.length; i ++ ) {

				this.add( argument );

			}

			return this;

		}

		if ( object instanceof Infospot ) {

			object.material.depthTest = false;
			
		}

		ImagePanorama.prototype.add.call( this, object );

	},

	createGeometry: function ( size, ratio ) {

		return new THREE.PlaneBufferGeometry( size, size * ratio );

	},

	createMaterial: function ( size ) {

		const shader = StereographicShader, uniforms = shader.uniforms;

		uniforms.zoom.value = size;
		uniforms.opacity.value = 0.0;

		return new THREE.ShaderMaterial( {

			uniforms: uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: THREE.BackSide,
			transparent: true

		} );
		
	},

	registerMouseEvents: function () {

		this.container.addEventListener( 'mousedown', this.onMouseDown.bind( this ), { passive: true } );
		this.container.addEventListener( 'mousemove', this.onMouseMove.bind( this ), { passive: true } );
		this.container.addEventListener( 'mouseup', this.onMouseUp.bind( this ), { passive: true } );
		this.container.addEventListener( 'touchstart', this.onMouseDown.bind( this ), { passive: true } );
		this.container.addEventListener( 'touchmove', this.onMouseMove.bind( this ), { passive: true } );
		this.container.addEventListener( 'touchend', this.onMouseUp.bind( this ), { passive: true } );
		this.container.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), { passive: false } );
		this.container.addEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), { passive: false } );
		this.container.addEventListener( 'contextmenu', this.onContextMenu.bind( this ), { passive: true } );
		
	},

	unregisterMouseEvents: function () {

		this.container.removeEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
		this.container.removeEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
		this.container.removeEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
		this.container.removeEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
		this.container.removeEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
		this.container.removeEventListener( 'touchend', this.onMouseUp.bind( this ), false );
		this.container.removeEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
		this.container.removeEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
		this.container.removeEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
		
	},

	onMouseDown: function ( event ) {

		const inputCount = ( event.touches && event.touches.length ) || 1 ;

		switch ( inputCount ) {

			case 1:

				const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
				const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

				this.dragging = true;
				this.userMouse.set( x, y );

				break;

			case 2:

				const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				const distance = Math.sqrt( dx * dx + dy * dy );
				this.userMouse.pinchDistance = distance;

				break;

			default:

				break;

		}

		this.onUpdateCallback();

	},

	onMouseMove: function ( event ) {

		const inputCount = ( event.touches && event.touches.length ) || 1 ;

		switch ( inputCount ) {

			case 1:

				const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
				const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

				const angleX = THREE.Math.degToRad( x - this.userMouse.x ) * 0.4;
				const angleY = THREE.Math.degToRad( y - this.userMouse.y ) * 0.4;

				if ( this.dragging ) {
					this.quatA.setFromAxisAngle( this.vectorY, angleX );
					this.quatB.setFromAxisAngle( this.vectorX, angleY );
					this.quatCur.multiply( this.quatA ).multiply( this.quatB );
					this.userMouse.set( x, y );
				}

				break;

			case 2:

				const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				const distance = Math.sqrt( dx * dx + dy * dy );

				this.addZoomDelta( this.userMouse.pinchDistance - distance );

				break;

			default:

				break;

		}

	},

	onMouseUp: function ( event ) {

		this.dragging = false;

	},

	onMouseWheel: function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		let delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}

		this.addZoomDelta( delta );
		this.onUpdateCallback();

	},

	addZoomDelta: function ( delta ) {

		const uniforms = this.material.uniforms;
		const lowerBound = this.size * 0.1;
		const upperBound = this.size * 10;

		uniforms.zoom.value += delta;

		if ( uniforms.zoom.value <= lowerBound ) {

			uniforms.zoom.value = lowerBound;

		} else if ( uniforms.zoom.value >= upperBound ) {

			uniforms.zoom.value = upperBound;

		}

	},

	onUpdateCallback: function () {

		this.frameId = requestAnimationFrame( this.onUpdateCallback.bind( this ) );

		this.quatSlerp.slerp( this.quatCur, 0.1 );
		this.material.uniforms.transform.value.makeRotationFromQuaternion( this.quatSlerp );
		
		if ( !this.dragging && 1.0 - this.quatSlerp.clone().dot( this.quatCur ) < this.EPS ) {
			
			cancelAnimationFrame( this.frameId );

		}

	},

	reset: function () {

		this.quatCur.set( 0, 0, 0, 1 );
		this.quatSlerp.set( 0, 0, 0, 1 );
		this.onUpdateCallback();

	},

	onLoad: function () {

		this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

		this.registerMouseEvents();
		this.onUpdateCallback();
		
		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' } );
		
	},

	onLeave: function () {

		this.unregisterMouseEvents();

		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: CONTROLS.ORBIT } );

		cancelAnimationFrame( this.frameId );

		ImagePanorama.prototype.onLeave.call( this );
		
	},

	onWindowResize: function () {

		this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

	},

	onContextMenu: function () {

		this.dragging = false;

	},

	dispose: function () {	

		ImagePanorama.prototype.dispose.call( this );

	}

});

/**
 * Image Little Planet
 * @constructor
 * @param {string} source 		- URL for the image source
 * @param {number} [size=10000] - Size of plane geometry
 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
 */
function ImageLittlePlanet ( source, size, ratio ) {

	LittlePlanet.call( this, 'image', source, size, ratio );

}

ImageLittlePlanet.prototype = Object.assign( Object.create( LittlePlanet.prototype ), {

	constructor: ImageLittlePlanet,

	onLoad: function ( texture ) {

		this.updateTexture( texture );

		LittlePlanet.prototype.onLoad.call( this );
		ImagePanorama.prototype.onLoad.call( this, texture );

	},
	
	updateTexture: function ( texture ) {

		texture.minFilter = texture.magFilter = THREE.LinearFilter;
		
		this.material.uniforms[ 'tDiffuse' ].value = texture;

	},

	dispose: function () {

		const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

		if ( tDiffuse && tDiffuse.value ) {

			tDiffuse.value.dispose();

		}

		LittlePlanet.prototype.dispose.call( this );

	}

} );

/**
 * Camera panorama
 * @constructor
 */
function CameraPanorama () {

	const radius = 5000;
	const geometry = new THREE.SphereBufferGeometry( radius, 60, 40 );
	const material = new THREE.MeshBasicMaterial( { visible: false });

	Panorama.call( this, geometry, material );

	this.media = new Media();
	this.radius = radius;

	this.addEventListener( 'enter', this.start.bind( this ) );
	this.addEventListener( 'leave', this.stop.bind( this ) );
	this.addEventListener( 'panolens-container', this.onPanolensContainer.bind( this ) );
	this.addEventListener( 'panolens-scene', this.onPanolensScene.bind( this ) );

}

CameraPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	constructor: CameraPanorama,

	onPanolensContainer: function ( { container } ) {

		this.media.container = container;

	},

	onPanolensScene: function ( { scene } ) {

		this.media.scene = scene;

	},

	start: function () {

		const media = this.media;

		media.start()
		.then( function ( stream ) {

			if ( this.active ) {

				media.attachVideoSourceObject( stream );

			}

		}.bind( this ) );

	},

	stop: function () {

		this.media.stop();

	},

} );

function OrbitControls ( object, domElement ) {

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.frameId;

	// API

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the control orbits around
	// and where it pans with respect to.
	this.target = new THREE.Vector3();

	// center is old, deprecated; use "target" instead
	this.center = this.target;

	// This option actually enables dollying in and out; left as "zoom" for
	// backwards compatibility
	this.noZoom = false;
	this.zoomSpeed = 1.0;

	// Limits to how far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// Limits to how far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// Set to true to disable this control
	this.noRotate = false;
	this.rotateSpeed = -0.15;

	// Set to true to disable this control
	this.noPan = true;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// Momentum
  	this.momentumDampingFactor = 0.90;
  	this.momentumScalingFactor = -0.005;
  	this.momentumKeydownFactor = 20;

  	// Fov
  	this.minFov = 30;
  	this.maxFov = 120;

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to disable use of the keys
	this.noKeys = false;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	////////////
	// internals

	var scope = this;

	var EPS = 10e-8;
	var MEPS = 10e-5;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();
	var panOffset = new THREE.Vector3();

	var offset = new THREE.Vector3();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	var theta;
	var phi;
	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;
	var pan = new THREE.Vector3();

	var lastPosition = new THREE.Vector3();
	var lastQuaternion = new THREE.Quaternion();

	var momentumLeft = 0, momentumUp = 0;
	var eventPrevious;
	var momentumOn = false;

	var keyUp, keyBottom, keyLeft, keyRight;

	var STATE = { NONE : -1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

	var state = STATE.NONE;

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	// so camera.up is the orbit axis

	var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
	var quatInverse = quat.clone().inverse();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	this.setLastQuaternion = function ( quaternion ) {
		lastQuaternion.copy( quaternion );
		scope.object.quaternion.copy( quaternion );
	};

	this.getLastPosition = function () {
		return lastPosition;
	};

	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;


	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	// pass in distance in world space to move left
	this.panLeft = function ( distance ) {

		var te = this.object.matrix.elements;

		// get X column of matrix
		panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
		panOffset.multiplyScalar( - distance );

		pan.add( panOffset );

	};

	// pass in distance in world space to move up
	this.panUp = function ( distance ) {

		var te = this.object.matrix.elements;

		// get Y column of matrix
		panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
		panOffset.multiplyScalar( distance );

		pan.add( panOffset );

	};

	// pass in x,y of change desired in pixel space,
	// right and down are positive
	this.pan = function ( deltaX, deltaY ) {

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			// perspective
			var position = scope.object.position;
			var offset = position.clone().sub( scope.target );
			var targetDistance = offset.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

			// we actually don't use screenWidth, since perspective camera is fixed to screen height
			scope.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
			scope.panUp( 2 * deltaY * targetDistance / element.clientHeight );

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			// orthographic
			scope.panLeft( deltaX * (scope.object.right - scope.object.left) / element.clientWidth );
			scope.panUp( deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight );

		} else {

			// camera neither orthographic or perspective
			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

		}

	};

	this.momentum = function(){
		
		if ( !momentumOn ) return;

		if ( Math.abs( momentumLeft ) < MEPS && Math.abs( momentumUp ) < MEPS ) { 

			momentumOn = false; 
			return;
		}

		momentumUp   *= this.momentumDampingFactor;
		momentumLeft *= this.momentumDampingFactor;

		thetaDelta -= this.momentumScalingFactor * momentumLeft;
		phiDelta   -= this.momentumScalingFactor * momentumUp;

	};

	this.dollyIn = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

		}

	};

	this.dollyOut = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

		}

	};

	this.update = function ( ignoreUpdate ) {

		var position = this.object.position;

		offset.copy( position ).sub( this.target );

		// rotate offset to "y-axis-is-up" space
		offset.applyQuaternion( quat );

		// angle from z-axis around y-axis

		theta = Math.atan2( offset.x, offset.z );

		// angle from y-axis

		phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

		if ( this.autoRotate && state === STATE.NONE ) {

			this.rotateLeft( getAutoRotationAngle() );

		}

		this.momentum();

		theta += thetaDelta;
		phi += phiDelta;

		// restrict theta to be between desired limits
		theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

		// restrict phi to be betwee EPS and PI-EPS
		phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

		var radius = offset.length() * scale;

		// restrict radius to be between desired limits
		radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

		// move target to panned location
		this.target.add( pan );

		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );

		// rotate offset back to "camera-up-vector-is-up" space
		offset.applyQuaternion( quatInverse );

		position.copy( this.target ).add( offset );

		this.object.lookAt( this.target );

		thetaDelta = 0;
		phiDelta = 0;
		scale = 1;
		pan.set( 0, 0, 0 );

		// update condition is:
		// min(camera displacement, camera rotation in radians)^2 > EPS
		// using small-angle approximation cos(x/2) = 1 - x^2 / 8
		if ( lastPosition.distanceToSquared( this.object.position ) > EPS
		    || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {

			ignoreUpdate !== true && this.dispatchEvent( changeEvent );

			lastPosition.copy( this.object.position );
			lastQuaternion.copy (this.object.quaternion );

		}

	};


	this.reset = function () {

		state = STATE.NONE;

		this.target.copy( this.target0 );
		this.object.position.copy( this.position0 );
		this.object.zoom = this.zoom0;

		this.object.updateProjectionMatrix();
		this.dispatchEvent( changeEvent );

		this.update();

	};

	this.getPolarAngle = function () {

		return phi;

	};

	this.getAzimuthalAngle = function () {

		return theta

	};

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function onMouseDown( event ) {

		momentumOn = false;

   		momentumLeft = momentumUp = 0;

		if ( scope.enabled === false ) return;
		event.preventDefault();

		if ( event.button === scope.mouseButtons.ORBIT ) {
			if ( scope.noRotate === true ) return;

			state = STATE.ROTATE;

			rotateStart.set( event.clientX, event.clientY );

		} else if ( event.button === scope.mouseButtons.ZOOM ) {
			if ( scope.noZoom === true ) return;

			state = STATE.DOLLY;

			dollyStart.set( event.clientX, event.clientY );

		} else if ( event.button === scope.mouseButtons.PAN ) {
			if ( scope.noPan === true ) return;

			state = STATE.PAN;

			panStart.set( event.clientX, event.clientY );

		}

		if ( state !== STATE.NONE ) {
			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );
			scope.dispatchEvent( startEvent );
		}

		scope.update();

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( state === STATE.ROTATE ) {

			if ( scope.noRotate === true ) return;

			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			// rotating across whole screen goes 360 degrees around
			scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

			rotateStart.copy( rotateEnd );

			if( eventPrevious ){
				momentumLeft = event.clientX - eventPrevious.clientX;
				momentumUp = event.clientY - eventPrevious.clientY;
			}

			eventPrevious = event;

		} else if ( state === STATE.DOLLY ) {

			if ( scope.noZoom === true ) return;

			dollyEnd.set( event.clientX, event.clientY );
			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				scope.dollyIn();

			} else if ( dollyDelta.y < 0 ) {

				scope.dollyOut();

			}

			dollyStart.copy( dollyEnd );

		} else if ( state === STATE.PAN ) {

			if ( scope.noPan === true ) return;

			panEnd.set( event.clientX, event.clientY );
			panDelta.subVectors( panEnd, panStart );

			scope.pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		if ( state !== STATE.NONE ) scope.update();

	}

	function onMouseUp( /* event */ ) {

		momentumOn = true;

		eventPrevious = undefined;

		if ( scope.enabled === false ) return;

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );
		scope.dispatchEvent( endEvent );
		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.noZoom === true || state !== STATE.NONE ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}

		if ( delta > 0 ) {

			//scope.dollyOut();
			scope.object.fov = ( scope.object.fov < scope.maxFov ) 
				? scope.object.fov + 1
				: scope.maxFov;
			scope.object.updateProjectionMatrix();

		} else if ( delta < 0 ) {

			//scope.dollyIn();
			scope.object.fov = ( scope.object.fov > scope.minFov ) 
				? scope.object.fov - 1
				: scope.minFov;
			scope.object.updateProjectionMatrix();

		}

		scope.update();
		scope.dispatchEvent( changeEvent );
		scope.dispatchEvent( startEvent );
		scope.dispatchEvent( endEvent );

	}

	function onKeyUp ( event ) {

		switch ( event.keyCode ) {

			case scope.keys.UP:
				keyUp = false;
				break;

			case scope.keys.BOTTOM:
				keyBottom = false;
				break;

			case scope.keys.LEFT:
				keyLeft = false;
				break;

			case scope.keys.RIGHT:
				keyRight = false;
				break;

		}

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.noKeys === true || scope.noRotate === true ) return;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				keyUp = true;
				break;

			case scope.keys.BOTTOM:
				keyBottom = true;
				break;

			case scope.keys.LEFT:
				keyLeft = true;
				break;

			case scope.keys.RIGHT:
				keyRight = true;
				break;

		}

		if (keyUp || keyBottom || keyLeft || keyRight) {

			momentumOn = true;

			if (keyUp) momentumUp = - scope.rotateSpeed * scope.momentumKeydownFactor;
			if (keyBottom) momentumUp = scope.rotateSpeed * scope.momentumKeydownFactor;
			if (keyLeft) momentumLeft = - scope.rotateSpeed * scope.momentumKeydownFactor;
			if (keyRight) momentumLeft = scope.rotateSpeed * scope.momentumKeydownFactor;

		}

	}

	function touchstart( event ) {

		momentumOn = false;

		momentumLeft = momentumUp = 0;

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.noRotate === true ) return;

				state = STATE.TOUCH_ROTATE;

				rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			case 2:	// two-fingered touch: dolly

				if ( scope.noZoom === true ) return;

				state = STATE.TOUCH_DOLLY;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				dollyStart.set( 0, distance );

				break;

			case 3: // three-fingered touch: pan

				if ( scope.noPan === true ) return;

				state = STATE.TOUCH_PAN;

				panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

	}

	function touchmove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.noRotate === true ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return;

				rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				rotateDelta.subVectors( rotateEnd, rotateStart );

				// rotating across whole screen goes 360 degrees around
				scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
				// rotating up and down along whole screen attempts to go 360, but limited to 180
				scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

				rotateStart.copy( rotateEnd );

				if( eventPrevious ){
					momentumLeft = event.touches[ 0 ].pageX - eventPrevious.pageX;
					momentumUp = event.touches[ 0 ].pageY - eventPrevious.pageY;
				}

				eventPrevious = {
					pageX: event.touches[ 0 ].pageX,
					pageY: event.touches[ 0 ].pageY,
				};

				scope.update();
				break;

			case 2: // two-fingered touch: dolly

				if ( scope.noZoom === true ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				dollyEnd.set( 0, distance );
				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y < 0 ) {

					scope.object.fov = ( scope.object.fov < scope.maxFov ) 
						? scope.object.fov + 1
						: scope.maxFov;
					scope.object.updateProjectionMatrix();

				} else if ( dollyDelta.y > 0 ) {

					scope.object.fov = ( scope.object.fov > scope.minFov ) 
						? scope.object.fov - 1
						: scope.minFov;
					scope.object.updateProjectionMatrix();

				}

				dollyStart.copy( dollyEnd );

				scope.update();
				scope.dispatchEvent( changeEvent );
				break;

			case 3: // three-fingered touch: pan

				if ( scope.noPan === true ) return;
				if ( state !== STATE.TOUCH_PAN ) return;

				panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				panDelta.subVectors( panEnd, panStart );

				scope.pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

				scope.update();
				break;

			default:

				state = STATE.NONE;

		}

	}

	function touchend( /* event */ ) {

		momentumOn = true;

		eventPrevious = undefined;

		if ( scope.enabled === false ) return;

		scope.dispatchEvent( endEvent );
		state = STATE.NONE;

	}

	//this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, { passive: false } );
	this.domElement.addEventListener( 'mousewheel', onMouseWheel, { passive: false } );
	this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, { passive: false } ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, { passive: false } );
	this.domElement.addEventListener( 'touchend', touchend, { passive: false } );
	this.domElement.addEventListener( 'touchmove', touchmove, { passive: false } );

	window.addEventListener( 'keyup', onKeyUp, { passive: false } );
	window.addEventListener( 'keydown', onKeyDown, { passive: false } );

	// force an update at start
	this.update();

}
OrbitControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	constructor: OrbitControls

} );

function DeviceOrientationControls ( camera, domElement ) {

	var scope = this;
	var changeEvent = { type: 'change' };

	var rotY = 0;
	var rotX = 0;
	var tempX = 0;
	var tempY = 0;

	this.camera = camera;
	this.camera.rotation.reorder( "YXZ" );
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alpha = 0;
	this.alphaOffsetAngle = 0;


	var onDeviceOrientationChangeEvent = function( event ) {

		scope.deviceOrientation = event;

	};

	var onScreenOrientationChangeEvent = function() {

		scope.screenOrientation = window.orientation || 0;

	};

	var onTouchStartEvent = function (event) {

		event.preventDefault();
		event.stopPropagation();

		tempX = event.touches[ 0 ].pageX;
		tempY = event.touches[ 0 ].pageY;

	};

	var onTouchMoveEvent = function (event) {

		event.preventDefault();
		event.stopPropagation();

		rotY += THREE.Math.degToRad( ( event.touches[ 0 ].pageX - tempX ) / 4 );
		rotX += THREE.Math.degToRad( ( tempY - event.touches[ 0 ].pageY ) / 4 );

		scope.updateAlphaOffsetAngle( rotY );

		tempX = event.touches[ 0 ].pageX;
		tempY = event.touches[ 0 ].pageY;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setCameraQuaternion = function( quaternion, alpha, beta, gamma, orient ) {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		var vectorFingerY;
		var fingerQY = new THREE.Quaternion();
		var fingerQX = new THREE.Quaternion();

		if ( scope.screenOrientation == 0 ) {

			vectorFingerY = new THREE.Vector3( 1, 0, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

		} else if ( scope.screenOrientation == 180 ) {

			vectorFingerY = new THREE.Vector3( 1, 0, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, rotX );

		} else if ( scope.screenOrientation == 90 ) {

			vectorFingerY = new THREE.Vector3( 0, 1, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, rotX );

		} else if ( scope.screenOrientation == - 90) {

			vectorFingerY = new THREE.Vector3( 0, 1, 0 );
			fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

		}

		q1.multiply( fingerQY );
		q1.multiply( fingerQX );

		euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

		quaternion.setFromEuler( euler ); // orient the device

		quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

		quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

	};

	this.connect = function() {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, { passive: true } );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, { passive: true } );
		window.addEventListener( 'deviceorientation', this.update.bind( this ), { passive: true } );

		scope.domElement.addEventListener( "touchstart", onTouchStartEvent, { passive: false } );
		scope.domElement.addEventListener( "touchmove", onTouchMoveEvent, { passive: false } );

		scope.enabled = true;

	};

	this.disconnect = function() {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', this.update.bind( this ), false );

		scope.domElement.removeEventListener( "touchstart", onTouchStartEvent, false );
		scope.domElement.removeEventListener( "touchmove", onTouchMoveEvent, false );

		scope.enabled = false;

	};

	this.update = function( ignoreUpdate ) {

		if ( scope.enabled === false ) return;

		var alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) + scope.alphaOffsetAngle : 0; // Z
		var beta = scope.deviceOrientation.beta ? THREE.Math.degToRad( scope.deviceOrientation.beta ) : 0; // X'
		var gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
		var orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

		setCameraQuaternion( scope.camera.quaternion, alpha, beta, gamma, orient );
		scope.alpha = alpha;

		ignoreUpdate !== true && scope.dispatchEvent( changeEvent );

	};

	this.updateAlphaOffsetAngle = function( angle ) {

		this.alphaOffsetAngle = angle;
		this.update();

	};

	this.dispose = function() {

		this.disconnect();

	};

	this.connect();

}
DeviceOrientationControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype), {

	constructor: DeviceOrientationControls

} );

function CardboardEffect ( renderer ) {

	var _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	var _scene = new THREE.Scene();

	var _stereo = new THREE.StereoCamera();
	_stereo.aspect = 0.5;

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	var _renderTarget = new THREE.WebGLRenderTarget( 512, 512, _params );
	_renderTarget.scissorTest = true;
	_renderTarget.texture.generateMipmaps = false;

	// Distortion Mesh ported from:
	// https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js

	var distortion = new THREE.Vector2( 0.441, 0.156 );

	var geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 20 ).removeAttribute( 'normal' ).toNonIndexed();

	var positions = geometry.attributes.position.array;
	var uvs = geometry.attributes.uv.array;

	// duplicate
	geometry.attributes.position.count *= 2;
	geometry.attributes.uv.count *= 2;

	var positions2 = new Float32Array( positions.length * 2 );
	positions2.set( positions );
	positions2.set( positions, positions.length );

	var uvs2 = new Float32Array( uvs.length * 2 );
	uvs2.set( uvs );
	uvs2.set( uvs, uvs.length );

	var vector = new THREE.Vector2();
	var length = positions.length / 3;

	for ( var i = 0, l = positions2.length / 3; i < l; i ++ ) {

		vector.x = positions2[ i * 3 + 0 ];
		vector.y = positions2[ i * 3 + 1 ];

		var dot = vector.dot( vector );
		var scalar = 1.5 + ( distortion.x + distortion.y * dot ) * dot;

		var offset = i < length ? 0 : 1;

		positions2[ i * 3 + 0 ] = ( vector.x / scalar ) * 1.5 - 0.5 + offset;
		positions2[ i * 3 + 1 ] = ( vector.y / scalar ) * 3.0;

		uvs2[ i * 2 ] = ( uvs2[ i * 2 ] + offset ) * 0.5;

	}

	geometry.attributes.position.array = positions2;
	geometry.attributes.uv.array = uvs2;

	//

	var material = new THREE.MeshBasicMaterial( { map: _renderTarget.texture } );
	var mesh = new THREE.Mesh( geometry, material );
	_scene.add( mesh );

	//

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

		var pixelRatio = renderer.getPixelRatio();

		_renderTarget.setSize( width * pixelRatio, height * pixelRatio );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		var width = _renderTarget.width / 2;
		var height = _renderTarget.height;

		if ( renderer.autoClear ) renderer.clear();

		_renderTarget.scissor.set( 0, 0, width, height );
		_renderTarget.viewport.set( 0, 0, width, height );
		renderer.setRenderTarget( _renderTarget );
		renderer.render( scene, _stereo.cameraL );

		renderer.clearDepth();

		_renderTarget.scissor.set( width, 0, width, height );
		_renderTarget.viewport.set( width, 0, width, height );
		renderer.setRenderTarget( _renderTarget );
		renderer.render( scene, _stereo.cameraR );

		renderer.clearDepth();

		renderer.setRenderTarget( null );
		renderer.render( _scene, _camera );
	};

}

const StereoEffect = function ( renderer ) {

	var _stereo = new THREE.StereoCamera();
	_stereo.aspect = 0.5;
	var size = new THREE.Vector2();

	this.setEyeSeparation = function ( eyeSep ) {

		_stereo.eyeSep = eyeSep;

	};

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		renderer.getSize( size );

		if ( renderer.autoClear ) renderer.clear();
		renderer.setScissorTest( true );

		renderer.setScissor( 0, 0, size.width / 2, size.height );
		renderer.setViewport( 0, 0, size.width / 2, size.height );
		renderer.render( scene, _stereo.cameraL );

		renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
		renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
		renderer.render( scene, _stereo.cameraR );

		renderer.setScissorTest( false );

	};

};

/**
 * Viewer contains pre-defined scene, camera and renderer
 * @constructor
 * @param {object} [options] - Use custom or default config options
 * @param {HTMLElement} [options.container] - A HTMLElement to host the canvas
 * @param {THREE.Scene} [options.scene=THREE.Scene] - A THREE.Scene which contains panorama and 3D objects
 * @param {THREE.Camera} [options.camera=THREE.PerspectiveCamera] - A THREE.Camera to view the scene
 * @param {THREE.WebGLRenderer} [options.renderer=THREE.WebGLRenderer] - A THREE.WebGLRenderer to render canvas
 * @param {boolean} [options.controlBar=true] - Show/hide control bar on the bottom of the container
 * @param {array}   [options.controlButtons=[]] - Button names to mount on controlBar if controlBar exists, Defaults to ['fullscreen', 'setting', 'video']
 * @param {boolean} [options.autoHideControlBar=false] - Auto hide control bar when click on non-active area
 * @param {boolean} [options.autoHideInfospot=true] - Auto hide infospots when click on non-active area
 * @param {boolean} [options.horizontalView=false] - Allow only horizontal camera control
 * @param {number}  [options.clickTolerance=10] - Distance tolerance to tigger click / tap event
 * @param {number}  [options.cameraFov=60] - Camera field of view value
 * @param {boolean} [options.reverseDragging=false] - Reverse dragging direction
 * @param {boolean} [options.enableReticle=false] - Enable reticle for mouseless interaction other than VR mode
 * @param {number}  [options.dwellTime=1500] - Dwell time for reticle selection in ms
 * @param {boolean} [options.autoReticleSelect=true] - Auto select a clickable target after dwellTime
 * @param {boolean} [options.viewIndicator=false] - Adds an angle view indicator in upper left corner
 * @param {number}  [options.indicatorSize=30] - Size of View Indicator
 * @param {string}  [options.output='none'] - Whether and where to output raycast position. Could be 'console' or 'overlay'
 * @param {boolean} [options.autoRotate=false] - Auto rotate
 * @param {number}  [options.autoRotateSpeed=2.0] - Auto rotate speed as in degree per second. Positive is counter-clockwise and negative is clockwise.
 * @param {number}  [options.autoRotateActivationDuration=5000] - Duration before auto rotatation when no user interactivity in ms
 */
function Viewer ( options ) {

	THREE.EventDispatcher.call( this );

	let container;

	options = options || {};
	options.controlBar = options.controlBar !== undefined ? options.controlBar : true;
	options.controlButtons = options.controlButtons || [ 'fullscreen', 'setting', 'video' ];
	options.autoHideControlBar = options.autoHideControlBar !== undefined ? options.autoHideControlBar : false;
	options.autoHideInfospot = options.autoHideInfospot !== undefined ? options.autoHideInfospot : true;
	options.horizontalView = options.horizontalView !== undefined ? options.horizontalView : false;
	options.clickTolerance = options.clickTolerance || 10;
	options.cameraFov = options.cameraFov || 60;
	options.reverseDragging = options.reverseDragging || false;
	options.enableReticle = options.enableReticle || false;
	options.dwellTime = options.dwellTime || 1500;
	options.autoReticleSelect = options.autoReticleSelect !== undefined ? options.autoReticleSelect : true;
	options.viewIndicator = options.viewIndicator !== undefined ? options.viewIndicator : false;
	options.indicatorSize = options.indicatorSize || 30;
	options.output = options.output ? options.output : 'none';
	options.autoRotate = options.autoRotate || false;
	options.autoRotateSpeed = options.autoRotateSpeed || 2.0;
	options.autoRotateActivationDuration = options.autoRotateActivationDuration || 5000;

	this.options = options;

	// CSS Icon
	//const styleLoader = new PANOLENS.StyleLoader();
	//styleLoader.inject( 'icono' );

	// Container
	if ( options.container ) {

		container = options.container;
		container._width = container.clientWidth;
		container._height = container.clientHeight;

	} else {

		container = document.createElement( 'div' );
		container.classList.add( 'panolens-container' );
		container.style.width = '100%';
		container.style.height = '100%';
		container._width = window.innerWidth;
		container._height = window.innerHeight;
		document.body.appendChild( container );

	}

	this.container = container;

	this.camera = options.camera || new THREE.PerspectiveCamera( this.options.cameraFov, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
	this.scene = options.scene || new THREE.Scene();
	this.renderer = options.renderer || new THREE.WebGLRenderer( { alpha: true, antialias: false } );
	this.sceneReticle = new THREE.Scene();

	this.viewIndicatorSize = this.options.indicatorSize;

	this.reticle = {};
	this.tempEnableReticle = this.options.enableReticle;

	this.mode = MODES.NORMAL;

	this.OrbitControls;
	this.DeviceOrientationControls;

	this.CardboardEffect;
	this.StereoEffect;

	this.controls;
	this.effect;
	this.panorama;
	this.widget;

	this.hoverObject;
	this.infospot;
	this.pressEntityObject;
	this.pressObject;

	this.raycaster = new THREE.Raycaster();
	this.raycasterPoint = new THREE.Vector2();
	this.userMouse = new THREE.Vector2();
	this.updateCallbacks = [];
	this.requestAnimationId;

	this.cameraFrustum = new THREE.Frustum();
	this.cameraViewProjectionMatrix = new THREE.Matrix4();

	this.autoRotateRequestId;

	this.outputDivElement;

	this.touchSupported = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

	// Handler references
	this.HANDLER_MOUSE_DOWN = this.onMouseDown.bind( this );
	this.HANDLER_MOUSE_UP = this.onMouseUp.bind( this );
	this.HANDLER_MOUSE_MOVE = this.onMouseMove.bind( this );
	this.HANDLER_WINDOW_RESIZE = this.onWindowResize.bind( this );
	this.HANDLER_KEY_DOWN = this.onKeyDown.bind( this );
	this.HANDLER_KEY_UP = this.onKeyUp.bind( this );
	this.HANDLER_TAP = this.onTap.bind( this, {
		clientX: this.container.clientWidth / 2,
		clientY: this.container.clientHeight / 2
	} );

	// Flag for infospot output
	this.OUTPUT_INFOSPOT = false;

	// Animations
	this.tweenLeftAnimation = new TWEEN.Tween();
	this.tweenUpAnimation = new TWEEN.Tween();

	// Renderer
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
	this.renderer.setClearColor( 0x000000, 0 );
	this.renderer.autoClear = false;

	// Append Renderer Element to container
	this.renderer.domElement.classList.add( 'panolens-canvas' );
	this.renderer.domElement.style.display = 'block';
	this.container.style.backgroundColor = '#000';
	this.container.appendChild( this.renderer.domElement );

	// Camera Controls
	this.OrbitControls = new OrbitControls( this.camera, this.container );
	this.OrbitControls.id = 'orbit';
	this.OrbitControls.minDistance = 1;
	this.OrbitControls.noPan = true;
	this.OrbitControls.autoRotate = this.options.autoRotate;
	this.OrbitControls.autoRotateSpeed = this.options.autoRotateSpeed;

	this.DeviceOrientationControls = new DeviceOrientationControls( this.camera, this.container );
	this.DeviceOrientationControls.id = 'device-orientation';
	this.DeviceOrientationControls.enabled = false;
	this.camera.position.z = 1;

	// Register change event if passiveRenering
	if ( this.options.passiveRendering ) {

		console.warn( 'passiveRendering is now deprecated' );

	}

	// Controls
	this.controls = [ this.OrbitControls, this.DeviceOrientationControls ];
	this.control = this.OrbitControls;

	// Cardboard effect
	this.CardboardEffect = new CardboardEffect( this.renderer );
	this.CardboardEffect.setSize( this.container.clientWidth, this.container.clientHeight );

	// Stereo effect
	this.StereoEffect = new StereoEffect( this.renderer );
	this.StereoEffect.setSize( this.container.clientWidth, this.container.clientHeight );

	this.effect = this.CardboardEffect;

	// Add default hidden reticle
	this.addReticle();

	// Lock horizontal view
	if ( this.options.horizontalView ) {
		this.OrbitControls.minPolarAngle = Math.PI / 2;
		this.OrbitControls.maxPolarAngle = Math.PI / 2;
	}

	// Add Control UI
	if ( this.options.controlBar !== false ) {
		this.addDefaultControlBar( this.options.controlButtons );
	}

	// Add View Indicator
	if ( this.options.viewIndicator ) {
		this.addViewIndicator();
	}

	// Reverse dragging direction
	if ( this.options.reverseDragging ) {
		this.reverseDraggingDirection();
	}

	// Register event if reticle is enabled, otherwise defaults to mouse
	if ( this.options.enableReticle ) {
		this.enableReticleControl();
	} else {
		this.registerMouseAndTouchEvents();
	}

	// Output infospot position to an overlay container if specified
	if ( this.options.output === 'overlay' ) {
		this.addOutputElement();
	}

	// Register dom event listeners
	this.registerEventListeners();

	// Animate
	this.animate.call( this );

}
Viewer.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	constructor: Viewer,

	/**
	 * Add an object to the scene
	 * Automatically hookup with panolens-viewer-handler listener
	 * to communicate with viewer method
	 * @param {THREE.Object3D} object - The object to be added
	 */
	add: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		this.scene.add( object );

		// All object added to scene has 'panolens-viewer-handler' event to handle viewer communication
		if ( object.addEventListener ) {

			object.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

		}

		// All object added to scene being passed with container
		if ( object instanceof Panorama && object.dispatchEvent ) {

			object.dispatchEvent( { type: 'panolens-container', container: this.container } );

		}

		if ( object instanceof CameraPanorama ) {

			object.dispatchEvent( { type: 'panolens-scene', scene: this.scene } );

		}

		// Hookup default panorama event listeners
		if ( object.type === 'panorama' ) {

			this.addPanoramaEventListener( object );

			if ( !this.panorama ) {

				this.setPanorama( object );

			}

		}

	},

	/**
	 * Remove an object from the scene
	 * @param  {THREE.Object3D} object - Object to be removed
	 */
	remove: function ( object ) {

		if ( object.removeEventListener ) {

			object.removeEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

		}

		this.scene.remove( object );

	},

	/**
	 * Add default control bar
	 * @param {array} array - The control buttons array
	 */
	addDefaultControlBar: function ( array ) {

		if ( this.widget ) {

			console.warn( 'Default control bar exists' );
			return;

		}

		const widget = new Widget( this.container );
		widget.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );
		widget.addControlBar();
		array.forEach( buttonName => {

			widget.addControlButton( buttonName );

		} );

		this.widget = widget;

	},

	/**
	 * Set a panorama to be the current one
	 * @param {PANOLENS.Panorama} pano - Panorama to be set
	 */
	setPanorama: function ( pano ) {

		const leavingPanorama = this.panorama;

		if ( pano.type === 'panorama' && leavingPanorama !== pano ) {

			// Clear exisiting infospot
			this.hideInfospot();

			const afterEnterComplete = function () {

				leavingPanorama && leavingPanorama.onLeave();
				pano.removeEventListener( 'enter-fade-start', afterEnterComplete );

			};

			pano.addEventListener( 'enter-fade-start', afterEnterComplete );

			// Assign and enter panorama
			(this.panorama = pano).onEnter();
			
		}

	},

	/**
	 * Event handler to execute commands from child objects
	 * @param {object} event - The dispatched event with method as function name and data as an argument
	 */
	eventHandler: function ( event ) {

		if ( event.method && this[ event.method ] ) {

			this[ event.method ]( event.data );

		}

	},

	/**
	 * Dispatch event to all descendants
	 * @param  {object} event - Event to be passed along
	 */
	dispatchEventToChildren: function ( event ) {

		this.scene.traverse( function ( object ) {

			if ( object.dispatchEvent ) {

				object.dispatchEvent( event );

			}

		});

	},

	/**
	 * Set widget content
	 * @param  {integer} controlIndex - Control index
	 * @param  {PANOLENS.Modes} mode - Modes for effects
	 */
	activateWidgetItem: function ( controlIndex, mode ) {

		const mainMenu = this.widget.mainMenu;
		const ControlMenuItem = mainMenu.children[ 0 ];
		const ModeMenuItem = mainMenu.children[ 1 ];

		let item;

		if ( controlIndex !== undefined ) {

			switch ( controlIndex ) {

				case 0:

					item = ControlMenuItem.subMenu.children[ 1 ];

					break;

				case 1:

					item = ControlMenuItem.subMenu.children[ 2 ];

					break;
					
				default:

					item = ControlMenuItem.subMenu.children[ 1 ];

					break;	

			}

			ControlMenuItem.subMenu.setActiveItem( item );
			ControlMenuItem.setSelectionTitle( item.textContent );

		}

		if ( mode !== undefined ) {

			switch( mode ) {

				case MODES.CARDBOARD:

					item = ModeMenuItem.subMenu.children[ 2 ];

					break;

				case MODES.STEREO:

					item = ModeMenuItem.subMenu.children[ 3 ];
					
					break;

				default:

					item = ModeMenuItem.subMenu.children[ 1 ];

					break;
			}

			ModeMenuItem.subMenu.setActiveItem( item );
			ModeMenuItem.setSelectionTitle( item.textContent );

		}

	},

	/**
	 * Enable rendering effect
	 * @param  {PANOLENS.Modes} mode - Modes for effects
	 */
	enableEffect: function ( mode ) {

		if ( this.mode === mode ) { return; }
		if ( mode === MODES.NORMAL ) { this.disableEffect(); return; }
		else { this.mode = mode; }

		const fov = this.camera.fov;

		switch( mode ) {

			case MODES.CARDBOARD:

				this.effect = this.CardboardEffect;
				this.enableReticleControl();

				break;

			case MODES.STEREO:

				this.effect = this.StereoEffect;
				this.enableReticleControl();
				
				break;

			default:

				this.effect = null;
				this.disableReticleControl();

				break;

		}

		this.activateWidgetItem( undefined, this.mode );

		/**
		 * Dual eye effect event
		 * @type {object}
		 * @event PANOLENS.Infospot#panolens-dual-eye-effect
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

		// Force effect stereo camera to update by refreshing fov
		this.camera.fov = fov + 10e-3;
		this.effect.setSize( this.container.clientWidth, this.container.clientHeight );
		this.render();
		this.camera.fov = fov;

		/**
		 * Dispatch mode change event
		 * @type {object}
		 * @event PANOLENS.Viewer#mode-change
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEvent( { type: 'mode-change', mode: this.mode } );

	},

	/**
	 * Disable additional rendering effect
	 */
	disableEffect: function () {

		if ( this.mode === MODES.NORMAL ) { return; }

		this.mode = MODES.NORMAL;
		this.disableReticleControl();

		this.activateWidgetItem( undefined, this.mode );

		/**
		 * Dual eye effect event
		 * @type {object}
		 * @event PANOLENS.Infospot#panolens-dual-eye-effect
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.render();

		/**
		 * Dispatch mode change event
		 * @type {object}
		 * @event PANOLENS.Viewer#mode-change
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEvent( { type: 'mode-change', mode: this.mode } );
	},

	/**
	 * Enable reticle control
	 */
	enableReticleControl: function () {

		if ( this.reticle.visible ) { return; }

		this.tempEnableReticle = true;

		// Register reticle event and unregister mouse event
		this.unregisterMouseAndTouchEvents();
		this.reticle.show();
		this.registerReticleEvent();
		this.updateReticleEvent();

	},

	/**
	 * Disable reticle control
	 */
	disableReticleControl: function () {

		this.tempEnableReticle = false;

		// Register mouse event and unregister reticle event
		if ( !this.options.enableReticle ) {

			this.reticle.hide();
			this.unregisterReticleEvent();
			this.registerMouseAndTouchEvents();

		} else {

			this.updateReticleEvent();

		}

	},

	/**
	 * Enable auto rotation
	 */
	enableAutoRate: function () {

		this.options.autoRotate = true;
		this.OrbitControls.autoRotate = true;

	},

	/**
	 * Disable auto rotation
	 */
	disableAutoRate: function () {

		clearTimeout( this.autoRotateRequestId );
		this.options.autoRotate = false;
		this.OrbitControls.autoRotate = false;

	},

	/**
	 * Toggle video play or stop
	 * @fires PANOLENS.Viewer#video-toggle
	 */
	toggleVideoPlay: function ( pause ) {

		if ( this.panorama instanceof VideoPanorama ) {

			/**
			 * Toggle video event
			 * @type {object}
			 * @event PANOLENS.Viewer#video-toggle
			 */
			this.panorama.dispatchEvent( { type: 'video-toggle', pause: pause } );

		}

	},

	/**
	 * Set currentTime in a video
	 * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	 * @fires PANOLENS.Viewer#video-time
	 */
	setVideoCurrentTime: function ( percentage ) {

		if ( this.panorama instanceof VideoPanorama ) {

			/**
			 * Setting video time event
			 * @type {object}
			 * @event PANOLENS.Viewer#video-time
			 * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
			 */
			this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

		}

	},

	/**
	 * This will be called when video updates if an widget is present
	 * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	 * @fires PANOLENS.Viewer#video-update
	 */
	onVideoUpdate: function ( percentage ) {

		/**
		 * Video update event
		 * @type {object}
		 * @event PANOLENS.Viewer#video-update
		 * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-update', percentage: percentage } );

	},

	/**
	 * Add update callback to be called every animation frame
	 */
	addUpdateCallback: function ( fn ) {

		if ( fn ) {

			this.updateCallbacks.push( fn );

		}

	},

	/**
	 * Remove update callback
	 * @param  {Function} fn - The function to be removed
	 */
	removeUpdateCallback: function ( fn ) {

		const index = this.updateCallbacks.indexOf( fn );

		if ( fn && index >= 0 ) {

			this.updateCallbacks.splice( index, 1 );

		}

	},

	/**
	 * Show video widget
	 */
	showVideoWidget: function () {

		/**
		 * Show video widget event
		 * @type {object}
		 * @event PANOLENS.Viewer#video-control-show
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-control-show' } );

	},

	/**
	 * Hide video widget
	 */
	hideVideoWidget: function () {

		/**
		 * Hide video widget
		 * @type {object}
		 * @event PANOLENS.Viewer#video-control-hide
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-control-hide' } );

	},

	updateVideoPlayButton: function ( paused ) {

		if ( this.widget && 
				this.widget.videoElement && 
				this.widget.videoElement.controlButton ) {

			this.widget.videoElement.controlButton.update( paused );

		}

	},

	/**
	 * Add default panorama event listeners
	 * @param {PANOLENS.Panorama} pano - The panorama to be added with event listener
	 */
	addPanoramaEventListener: function ( pano ) {

		// Set camera control on every panorama
		pano.addEventListener( 'enter-fade-start', this.setCameraControl.bind( this ) );

		// Show and hide widget event only when it's PANOLENS.VideoPanorama
		if ( pano instanceof VideoPanorama ) {

			pano.addEventListener( 'enter-fade-start', this.showVideoWidget.bind( this ) );
			pano.addEventListener( 'leave', function () {

				if ( !(this.panorama instanceof VideoPanorama) ) {

					this.hideVideoWidget.call( this );

				}
				
			}.bind( this ) );

		}

	},

	/**
	 * Set camera control
	 */
	setCameraControl: function () {

		this.OrbitControls.target.copy( this.panorama.position );

	},

	/**
	 * Get current camera control
	 * @return {object} - Current navigation control. THREE.OrbitControls or THREE.DeviceOrientationControls
	 */
	getControl: function () {

		return this.control;

	},

	/**
	 * Get scene
	 * @return {THREE.Scene} - Current scene which the viewer is built on
	 */
	getScene: function () {

		return this.scene;

	},

	/**
	 * Get camera
	 * @return {THREE.Camera} - The scene camera
	 */
	getCamera: function () {

		return this.camera;

	},

	/**
	 * Get renderer
	 * @return {THREE.WebGLRenderer} - The renderer using webgl
	 */
	getRenderer: function () {

		return this.renderer;

	},

	/**
	 * Get container
	 * @return {HTMLDOMElement} - The container holds rendererd canvas
	 */
	getContainer: function () {

		return this.container;

	},

	/**
	 * Get control name
	 * @return {string} - Control name. 'orbit' or 'device-orientation'
	 */
	getControlId: function () {

		return this.control.id;

	},

	/**
	 * Get next navigation control name
	 * @return {string} - Next control name
	 */
	getNextControlName: function () {

		return this.controls[ this.getNextControlIndex() ].id;

	},

	/**
	 * Get next navigation control index
	 * @return {number} - Next control index
	 */
	getNextControlIndex: function () {

		const controls = this.controls;
		const control = this.control;
		const nextIndex = controls.indexOf( control ) + 1;

		return ( nextIndex >= controls.length ) ? 0 : nextIndex;

	},

	/**
	 * Set field of view of camera
	 */
	setCameraFov: function ( fov ) {

		this.camera.fov = fov;
		this.camera.updateProjectionMatrix();

	},

	/**
	 * Enable control by index
	 * @param  {PANOLENS.Controls} index - Index of camera control
	 */
	enableControl: function ( index ) {

		index = ( index >= 0 && index < this.controls.length ) ? index : 0;

		this.control.enabled = false;

		this.control = this.controls[ index ];

		this.control.enabled = true;

		switch ( index ) {

			case CONTROLS.ORBIT:

				this.camera.position.copy( this.panorama.position );
				this.camera.position.z += 1;

				break;

			case CONTROLS.DEVICEORIENTATION:

				this.camera.position.copy( this.panorama.position );

				break;

			default:

				break;
		}

		this.control.update();

		this.activateWidgetItem( index, undefined );

	},

	/**
	 * Disable current control
	 */
	disableControl: function () {

		this.control.enabled = false;

	},

	/**
	 * Toggle next control
	 */
	toggleNextControl: function () {

		this.enableControl( this.getNextControlIndex() );

	},

	/**
	 * Screen Space Projection
	 */
	getScreenVector: function ( worldVector ) {

		const vector = worldVector.clone();
		const widthHalf = ( this.container.clientWidth ) / 2;
		const heightHalf = this.container.clientHeight / 2;

		vector.project( this.camera );

		vector.x = ( vector.x * widthHalf ) + widthHalf;
		vector.y = - ( vector.y * heightHalf ) + heightHalf;
		vector.z = 0;

		return vector;

	},

	/**
	 * Check Sprite in Viewport
	 */
	checkSpriteInViewport: function ( sprite ) {

		this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
		this.cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
		this.cameraFrustum.setFromMatrix( this.cameraViewProjectionMatrix );

		return sprite.visible && this.cameraFrustum.intersectsSprite( sprite );

	},

	/**
	 * Reverse dragging direction
	 */
	reverseDraggingDirection: function () {

		this.OrbitControls.rotateSpeed *= -1;
		this.OrbitControls.momentumScalingFactor *= -1;

	},

	/**
	 * Add reticle 
	 */
	addReticle: function () {

		this.reticle = new Reticle( 0xffffff, true, this.options.dwellTime );
		this.reticle.hide();
		this.camera.add( this.reticle );
		this.sceneReticle.add( this.camera );

	},

	/**
	 * Tween control looking center
	 * @param {THREE.Vector3} vector - Vector to be looked at the center
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	tweenControlCenter: function ( vector, duration, easing ) {

		if ( this.control !== this.OrbitControls ) {

			return;

		}

		// Pass in arguments as array
		if ( vector instanceof Array ) {

			duration = vector[ 1 ];
			easing = vector[ 2 ];
			vector = vector[ 0 ];

		}

		duration = duration !== undefined ? duration : 1000;
		easing = easing || TWEEN.Easing.Exponential.Out;

		var scope, ha, va, chv, cvv, hv, vv, vptc, ov, nv;

		scope = this;

		chv = this.camera.getWorldDirection( new THREE.Vector3() );
		cvv = chv.clone();

		vptc = this.panorama.getWorldPosition( new THREE.Vector3() ).sub( this.camera.getWorldPosition( new THREE.Vector3() ) );

		hv = vector.clone();
		// Scale effect
		hv.x *= -1;
		hv.add( vptc ).normalize();
		vv = hv.clone();

		chv.y = 0;
		hv.y = 0;

		ha = Math.atan2( hv.z, hv.x ) - Math.atan2( chv.z, chv.x );
		ha = ha > Math.PI ? ha - 2 * Math.PI : ha;
		ha = ha < -Math.PI ? ha + 2 * Math.PI : ha;
		va = Math.abs( cvv.angleTo( chv ) + ( cvv.y * vv.y <= 0 ? vv.angleTo( hv ) : -vv.angleTo( hv ) ) );
		va *= vv.y < cvv.y ? 1 : -1;

		ov = { left: 0, up: 0 };
		nv = { left: 0, up: 0 };

		this.tweenLeftAnimation.stop();
		this.tweenUpAnimation.stop();

		this.tweenLeftAnimation = new TWEEN.Tween( ov )
			.to( { left: ha }, duration )
			.easing( easing )
			.onUpdate(function(ov){
				scope.control.rotateLeft( ov.left - nv.left );
				nv.left = ov.left;
			})
			.start();

		this.tweenUpAnimation = new TWEEN.Tween( ov )
			.to( { up: va }, duration )
			.easing( easing )
			.onUpdate(function(ov){
				scope.control.rotateUp( ov.up - nv.up );
				nv.up = ov.up;
			})
			.start();

	},

	/**
	 * Tween control looking center by object
	 * @param {THREE.Object3D} object - Object to be looked at the center
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	tweenControlCenterByObject: function ( object, duration, easing ) {

		let isUnderScalePlaceHolder = false;

		object.traverseAncestors( function ( ancestor ) {

			if ( ancestor.scalePlaceHolder ) {

				isUnderScalePlaceHolder = true;

			}
		} );

		if ( isUnderScalePlaceHolder ) {

			var invertXVector = new THREE.Vector3( -1, 1, 1 );

			this.tweenControlCenter( object.getWorldPosition( new THREE.Vector3() ).multiply( invertXVector ), duration, easing );

		} else {

			this.tweenControlCenter( object.getWorldPosition( new THREE.Vector3() ), duration, easing );

		}

	},

	/**
	 * This is called when window size is changed
	 * @fires PANOLENS.Viewer#window-resize
	 * @param {number} [windowWidth] - Specify if custom element has changed width
	 * @param {number} [windowHeight] - Specify if custom element has changed height
	 */
	onWindowResize: function ( windowWidth, windowHeight ) {

		let width, height;

		const expand = this.container.classList.contains( 'panolens-container' ) || this.container.isFullscreen;

		if ( windowWidth !== undefined && windowHeight !== undefined ) {

			width = windowWidth;
			height = windowHeight;
			this.container._width = windowWidth;
			this.container._height = windowHeight;

		} else {

			const isAndroid = /(android)/i.test(navigator.userAgent);

			const adjustWidth = isAndroid 
				? Math.min(document.documentElement.clientWidth, window.innerWidth || 0) 
				: Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

			const adjustHeight = isAndroid 
				? Math.min(document.documentElement.clientHeight, window.innerHeight || 0) 
				: Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

			width = expand ? adjustWidth : this.container.clientWidth;
			height = expand ? adjustHeight : this.container.clientHeight;

			this.container._width = width;
			this.container._height = height;

		}

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( width, height );

		// Update reticle
		if ( this.options.enableReticle || this.tempEnableReticle ) {

			this.updateReticleEvent();

		}

		/**
		 * Window resizing event
		 * @type {object}
		 * @event PANOLENS.Viewer#window-resize
		 * @property {number} width  - Width of the window
		 * @property {number} height - Height of the window
		 */
		this.dispatchEvent( { type: 'window-resize', width: width, height: height });
		this.scene.traverse( function ( object ) {

			if ( object.dispatchEvent ) {

				object.dispatchEvent( { type: 'window-resize', width: width, height: height });

			}

		} );

	},

	addOutputElement: function () {

		const element = document.createElement( 'div' );
		element.style.position = 'absolute';
		element.style.right = '10px';
		element.style.top = '10px';
		element.style.color = "#fff";
		this.container.appendChild( element );
		this.outputDivElement = element;

	},

	/**
	 * Output infospot attach position in developer console by holding down Ctrl button
	 */
	outputInfospotPosition: function () {

		const intersects = this.raycaster.intersectObject( this.panorama, true );

		if ( intersects.length > 0 ) {

			const point = intersects[ 0 ].point.clone();
			const converter = new THREE.Vector3( -1, 1, 1 );
			const world = this.panorama.getWorldPosition( new THREE.Vector3() );
			point.sub( world ).multiply( converter );

			const message = `${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)}`;

			if ( point.length() === 0 ) { return; }

			switch ( this.options.output ) {

				case 'console':
					console.info( message );
					break;

				case 'overlay':
					this.outputDivElement.textContent = message;
					break;

				default:
					break;

			}

		}

	},

	onMouseDown: function ( event ) {

		event.preventDefault();

		this.userMouse.x = ( event.clientX >= 0 ) ? event.clientX : event.touches[0].clientX;
		this.userMouse.y = ( event.clientY >= 0 ) ? event.clientY : event.touches[0].clientY;
		this.userMouse.type = 'mousedown';
		this.onTap( event );

	},

	onMouseMove: function ( event ) {

		event.preventDefault();
		this.userMouse.type = 'mousemove';
		this.onTap( event );

	},

	onMouseUp: function ( event ) {

		let onTarget = false;

		this.userMouse.type = 'mouseup';

		const type = ( this.userMouse.x >= event.clientX - this.options.clickTolerance 
				&& this.userMouse.x <= event.clientX + this.options.clickTolerance
				&& this.userMouse.y >= event.clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.clientY + this.options.clickTolerance ) 
				||  ( event.changedTouches 
				&& this.userMouse.x >= event.changedTouches[0].clientX - this.options.clickTolerance
				&& this.userMouse.x <= event.changedTouches[0].clientX + this.options.clickTolerance 
				&& this.userMouse.y >= event.changedTouches[0].clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.changedTouches[0].clientY + this.options.clickTolerance ) 
		? 'click' : undefined;

		// Event should happen on canvas
		if ( event && event.target && !event.target.classList.contains( 'panolens-canvas' ) ) { return; }

		event.preventDefault();

		if ( event.changedTouches && event.changedTouches.length === 1 ) {

			onTarget = this.onTap( { clientX : event.changedTouches[0].clientX, clientY : event.changedTouches[0].clientY }, type );
		
		} else {

			onTarget = this.onTap( event, type );

		}

		this.userMouse.type = 'none';

		if ( onTarget ) { 

			return; 

		}

		if ( type === 'click' ) {

			this.options.autoHideInfospot && this.panorama && this.panorama.toggleInfospotVisibility();
			this.options.autoHideControlBar && this.toggleControlBar();

		}

	},

	onTap: function ( event, type ) {

		const { left, top } = this.container.getBoundingClientRect();
		const { clientWidth, clientHeight } = this.container;

		this.raycasterPoint.x = ( ( event.clientX - left ) / clientWidth ) * 2 - 1;
		this.raycasterPoint.y = - ( ( event.clientY - top ) / clientHeight ) * 2 + 1;

		this.raycaster.setFromCamera( this.raycasterPoint, this.camera );

		// Return if no panorama 
		if ( !this.panorama ) { 

			return; 

		}

		// output infospot information
		if ( event.type !== 'mousedown' && this.touchSupported || this.OUTPUT_INFOSPOT ) { 

			this.outputInfospotPosition(); 

		}

		const intersects = this.raycaster.intersectObjects( this.panorama.children, true );
		const intersect_entity = this.getConvertedIntersect( intersects );
		const intersect = ( intersects.length > 0 ) ? intersects[0].object : undefined;

		if ( this.userMouse.type === 'mouseup'  ) {

			if ( intersect_entity && this.pressEntityObject === intersect_entity && this.pressEntityObject.dispatchEvent ) {

				this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

			}

			this.pressEntityObject = undefined;

		}

		if ( this.userMouse.type === 'mouseup'  ) {

			if ( intersect && this.pressObject === intersect && this.pressObject.dispatchEvent ) {

				this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

			}

			this.pressObject = undefined;

		}

		if ( type === 'click' ) {

			this.panorama.dispatchEvent( { type: 'click', intersects: intersects, mouseEvent: event } );

			if ( intersect_entity && intersect_entity.dispatchEvent ) {

				intersect_entity.dispatchEvent( { type: 'click-entity', mouseEvent: event } );

			}

			if ( intersect && intersect.dispatchEvent ) {

				intersect.dispatchEvent( { type: 'click', mouseEvent: event } );

			}

		} else {

			this.panorama.dispatchEvent( { type: 'hover', intersects: intersects, mouseEvent: event } );

			if ( ( this.hoverObject && intersects.length > 0 && this.hoverObject !== intersect_entity )
				|| ( this.hoverObject && intersects.length === 0 ) ){

				if ( this.hoverObject.dispatchEvent ) {

					this.hoverObject.dispatchEvent( { type: 'hoverleave', mouseEvent: event } );

					this.reticle.stop();

				}

				this.hoverObject = undefined;

			}

			if ( intersect_entity && intersects.length > 0 ) {

				if ( this.hoverObject !== intersect_entity ) {

					this.hoverObject = intersect_entity;

					if ( this.hoverObject.dispatchEvent ) {

						this.hoverObject.dispatchEvent( { type: 'hoverenter', mouseEvent: event } );

						// Start reticle timer
						if ( this.options.autoReticleSelect && this.options.enableReticle || this.tempEnableReticle ) {
							this.reticle.start( this.onTap.bind( this, event, 'click' ) );
						}

					}

				}

				if ( this.userMouse.type === 'mousedown' && this.pressEntityObject != intersect_entity ) {

					this.pressEntityObject = intersect_entity;

					if ( this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressstart-entity', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousedown' && this.pressObject != intersect ) {

					this.pressObject = intersect;

					if ( this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressstart', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousemove' || this.options.enableReticle ) {

					if ( intersect && intersect.dispatchEvent ) {

						intersect.dispatchEvent( { type: 'hover', mouseEvent: event } );

					}

					if ( this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressmove-entity', mouseEvent: event } );

					}

					if ( this.pressObject && this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressmove', mouseEvent: event } );

					}

				}

			}

			if ( !intersect_entity && this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

				this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

				this.pressEntityObject = undefined;

			}

			if ( !intersect && this.pressObject && this.pressObject.dispatchEvent ) {

				this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

				this.pressObject = undefined;

			}

		}

		// Infospot handler
		if ( intersect && intersect instanceof Infospot ) {

			this.infospot = intersect;
			
			if ( type === 'click' ) {

				return true;

			}
			

		} else if ( this.infospot ) {

			this.hideInfospot();

		}

		// Auto rotate
		if ( this.options.autoRotate && this.userMouse.type !== 'mousemove' ) {

			// Auto-rotate idle timer
			clearTimeout( this.autoRotateRequestId );

			if ( this.control === this.OrbitControls ) {

				this.OrbitControls.autoRotate = false;
				this.autoRotateRequestId = window.setTimeout( this.enableAutoRate.bind( this ), this.options.autoRotateActivationDuration );

			}

		}		

	},

	getConvertedIntersect: function ( intersects ) {

		let intersect;

		for ( var i = 0; i < intersects.length; i++ ) {

			if ( intersects[i].distance >= 0 && intersects[i].object && !intersects[i].object.passThrough ) {

				if ( intersects[i].object.entity && intersects[i].object.entity.passThrough ) {
					continue;
				} else if ( intersects[i].object.entity && !intersects[i].object.entity.passThrough ) {
					intersect = intersects[i].object.entity;
					break;
				} else {
					intersect = intersects[i].object;
					break;
				}

			}

		}

		return intersect;

	},

	hideInfospot: function () {

		if ( this.infospot ) {

			this.infospot.onHoverEnd();

			this.infospot = undefined;

		}

	},

	/**
	 * Toggle control bar
	 * @fires [PANOLENS.Viewer#control-bar-toggle]
	 */
	toggleControlBar: function () {

		/**
		 * Toggle control bar event
		 * @type {object}
		 * @event PANOLENS.Viewer#control-bar-toggle
		 */
		this.widget && this.widget.dispatchEvent( { type: 'control-bar-toggle' } );

	},

	onKeyDown: function ( event ) {

		if ( this.options.output && this.options.output !== 'none' && event.key === 'Control' ) {

			this.OUTPUT_INFOSPOT = true;

		}

	},

	onKeyUp: function () {

		this.OUTPUT_INFOSPOT = false;

	},

	/**
	 * Update control and callbacks
	 */
	update: function () {

		TWEEN.update();

		this.updateCallbacks.forEach( function( callback ){ callback(); } );

		this.control.update();

		this.scene.traverse( function( child ){
			if ( child instanceof Infospot 
				&& child.element 
				&& ( this.hoverObject === child 
					|| child.element.style.display !== 'none' 
					|| (child.element.left && child.element.left.style.display !== 'none')
					|| (child.element.right && child.element.right.style.display !== 'none') ) ) {
				if ( this.checkSpriteInViewport( child ) ) {
					const { x, y } = this.getScreenVector( child.getWorldPosition( new THREE.Vector3() ) );
					child.translateElement( x, y );
				} else {
					child.onDismiss();
				}
				
			}
		}.bind( this ) );

	},

	/**
	 * Rendering function to be called on every animation frame
	 * Render reticle last
	 */
	render: function () {

		if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

			this.renderer.clear();
			this.effect.render( this.scene, this.camera );
			this.effect.render( this.sceneReticle, this.camera );
			

		} else {

			this.renderer.clear();
			this.renderer.render( this.scene, this.camera );
			this.renderer.clearDepth();
			this.renderer.render( this.sceneReticle, this.camera );

		}

	},

	animate: function () {

		this.requestAnimationId = requestAnimationFrame( this.animate.bind( this ) );

		this.onChange();

	},

	onChange: function () {

		this.update();
		this.render();

	},

	/**
	 * Register mouse and touch event on container
	 */
	registerMouseAndTouchEvents: function () {

		const options = { passive: false };

		this.container.addEventListener( 'mousedown' , 	this.HANDLER_MOUSE_DOWN, options );
		this.container.addEventListener( 'mousemove' , 	this.HANDLER_MOUSE_MOVE, options );
		this.container.addEventListener( 'mouseup'	 , 	this.HANDLER_MOUSE_UP  , options );
		this.container.addEventListener( 'touchstart', 	this.HANDLER_MOUSE_DOWN, options );
		this.container.addEventListener( 'touchend'  , 	this.HANDLER_MOUSE_UP  , options );

	},

	/**
	 * Unregister mouse and touch event on container
	 */
	unregisterMouseAndTouchEvents: function () {

		this.container.removeEventListener( 'mousedown' ,  this.HANDLER_MOUSE_DOWN, false );
		this.container.removeEventListener( 'mousemove' ,  this.HANDLER_MOUSE_MOVE, false );
		this.container.removeEventListener( 'mouseup'	,  this.HANDLER_MOUSE_UP  , false );
		this.container.removeEventListener( 'touchstart',  this.HANDLER_MOUSE_DOWN, false );
		this.container.removeEventListener( 'touchend'  ,  this.HANDLER_MOUSE_UP  , false );

	},

	/**
	 * Register reticle event
	 */
	registerReticleEvent: function () {

		this.addUpdateCallback( this.HANDLER_TAP );

	},

	/**
	 * Unregister reticle event
	 */
	unregisterReticleEvent: function () {

		this.removeUpdateCallback( this.HANDLER_TAP );

	},

	/**
	 * Update reticle event
	 */
	updateReticleEvent: function () {

		const clientX = this.container.clientWidth / 2 + this.container.offsetLeft;
		const clientY = this.container.clientHeight / 2;

		this.removeUpdateCallback( this.HANDLER_TAP );
		this.HANDLER_TAP = this.onTap.bind( this, { clientX, clientY } );
		this.addUpdateCallback( this.HANDLER_TAP );

	},

	/**
	 * Register container and window listeners
	 */
	registerEventListeners: function () {

		// Resize Event
		window.addEventListener( 'resize' , this.HANDLER_WINDOW_RESIZE, true );

		// Keyboard Event
		window.addEventListener( 'keydown', this.HANDLER_KEY_DOWN, true );
		window.addEventListener( 'keyup'  , this.HANDLER_KEY_UP	 , true );

	},

	/**
	 * Unregister container and window listeners
	 */
	unregisterEventListeners: function () {

		// Resize Event
		window.removeEventListener( 'resize' , this.HANDLER_WINDOW_RESIZE, true );

		// Keyboard Event
		window.removeEventListener( 'keydown', this.HANDLER_KEY_DOWN, true );
		window.removeEventListener( 'keyup'  , this.HANDLER_KEY_UP  , true );

	},

	/**
	 * Dispose all scene objects and clear cache
	 */
	dispose: function () {

		// Unregister dom event listeners
		this.unregisterEventListeners();

		// recursive disposal on 3d objects
		function recursiveDispose ( object ) {

			for ( var i = object.children.length - 1; i >= 0; i-- ) {

				recursiveDispose( object.children[i] );
				object.remove( object.children[i] );

			}

			if ( object instanceof Infospot ) {

				object.dispose();

			}

			object.geometry && object.geometry.dispose();
			object.material && object.material.dispose();
		}

		recursiveDispose( this.scene );

		// dispose widget
		if ( this.widget ) {

			this.widget.dispose();
			this.widget = null;

		}

		// clear cache
		if ( Cache && Cache.enabled ) {

			Cache.clear();

		}

	},

	/**
	 * Destory viewer by disposing and stopping requestAnimationFrame
	 */
	destory: function () {

		this.dispose();
		this.render();
		cancelAnimationFrame( this.requestAnimationId );		

	},

	/**
	 * On panorama dispose
	 */
	onPanoramaDispose: function ( panorama ) {

		if ( panorama instanceof VideoPanorama ) {

			this.hideVideoWidget();

		}

		if ( panorama === this.panorama ) {

			this.panorama = null;

		}

	},

	/**
	 * Load ajax call
	 * @param {string} url - URL to be requested
	 * @param {function} [callback] - Callback after request completes
	 */
	loadAsyncRequest: function ( url, callback ) {

		const request = new XMLHttpRequest();
		request.onloadend = function ( event ) {
			callback && callback( event );
		};
		request.open( "GET", url, true );
		request.send( null );

	},

	/**
	 * View indicator in upper left
	 */
	addViewIndicator: function () {

		const scope = this;

		function loadViewIndicator ( asyncEvent ) {

			if ( asyncEvent.loaded === 0 ) return;

			const viewIndicatorDiv = asyncEvent.target.responseXML.documentElement;
			viewIndicatorDiv.style.width = scope.viewIndicatorSize + "px";
			viewIndicatorDiv.style.height = scope.viewIndicatorSize + "px";
			viewIndicatorDiv.style.position = "absolute";
			viewIndicatorDiv.style.top = "10px";
			viewIndicatorDiv.style.left = "10px";
			viewIndicatorDiv.style.opacity = "0.5";
			viewIndicatorDiv.style.cursor = "pointer";
			viewIndicatorDiv.id = "panolens-view-indicator-container";

			scope.container.appendChild( viewIndicatorDiv );

			const indicator = viewIndicatorDiv.querySelector( "#indicator" );
			const setIndicatorD = function () {

				scope.radius = scope.viewIndicatorSize * 0.225;
				scope.currentPanoAngle = scope.camera.rotation.y - THREE.Math.degToRad( 90 );
				scope.fovAngle = THREE.Math.degToRad( scope.camera.fov ) ;
				scope.leftAngle = -scope.currentPanoAngle - scope.fovAngle / 2;
				scope.rightAngle = -scope.currentPanoAngle + scope.fovAngle / 2;
				scope.leftX = scope.radius * Math.cos( scope.leftAngle );
				scope.leftY = scope.radius * Math.sin( scope.leftAngle );
				scope.rightX = scope.radius * Math.cos( scope.rightAngle );
				scope.rightY = scope.radius * Math.sin( scope.rightAngle );
				scope.indicatorD = "M " + scope.leftX + " " + scope.leftY + " A " + scope.radius + " " + scope.radius + " 0 0 1 " + scope.rightX + " " + scope.rightY;

				if ( scope.leftX && scope.leftY && scope.rightX && scope.rightY && scope.radius ) {

					indicator.setAttribute( "d", scope.indicatorD );

				}

			};

			scope.addUpdateCallback( setIndicatorD );

			const indicatorOnMouseEnter = function () {

				this.style.opacity = "1";

			};

			const indicatorOnMouseLeave = function () {

				this.style.opacity = "0.5";

			};

			viewIndicatorDiv.addEventListener( "mouseenter", indicatorOnMouseEnter );
			viewIndicatorDiv.addEventListener( "mouseleave", indicatorOnMouseLeave );
		}

		this.loadAsyncRequest( DataImage.ViewIndicator, loadViewIndicator );

	},

	/**
	 * Append custom control item to existing control bar
	 * @param {object} [option={}] - Style object to overwirte default element style. It takes 'style', 'onTap' and 'group' properties.
	 */
	appendControlItem: function ( option ) {

		const item = this.widget.createCustomItem( option );		

		if ( option.group === 'video' ) {

			this.widget.videoElement.appendChild( item );

		} else {

			this.widget.barElement.appendChild( item );

		}

		return item;

	},

	/**
	 * Clear all cached files
	 */
	clearAllCache: function () {

		Cache.clear();

	}

} );

/**
 * Panolens.js
 * @author pchen66
 * @namespace PANOLENS
 */
window.TWEEN = Tween;

export { BasicPanorama, CONTROLS, CameraPanorama, CubePanorama, CubeTextureLoader, DataImage, EmptyPanorama, GoogleStreetviewPanorama, ImageLittlePlanet, ImageLoader, ImagePanorama, Infospot, LittlePlanet, MODES, Media, Panorama, REVISION, Reticle, TextureLoader, VideoPanorama, Viewer, Widget };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFub2xlbnMubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvQ29uc3RhbnRzLmpzIiwiLi4vc3JjL0RhdGFJbWFnZS5qcyIsIi4uL3NyYy9sb2FkZXJzL0ltYWdlTG9hZGVyLmpzIiwiLi4vc3JjL2xvYWRlcnMvVGV4dHVyZUxvYWRlci5qcyIsIi4uL3NyYy9sb2FkZXJzL0N1YmVUZXh0dXJlTG9hZGVyLmpzIiwiLi4vc3JjL21lZGlhL01lZGlhLmpzIiwiLi4vc3JjL2ludGVyZmFjZS9SZXRpY2xlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0B0d2VlbmpzL3R3ZWVuLmpzL3NyYy9Ud2Vlbi5qcyIsIi4uL3NyYy9pbmZvc3BvdC9JbmZvc3BvdC5qcyIsIi4uL3NyYy93aWRnZXQvV2lkZ2V0LmpzIiwiLi4vc3JjL3Bhbm9yYW1hL1Bhbm9yYW1hLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0ltYWdlUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvRW1wdHlQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9DdWJlUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvQmFzaWNQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9WaWRlb1Bhbm9yYW1hLmpzIiwiLi4vc3JjL2xvYWRlcnMvR29vZ2xlU3RyZWV0TG9hZGVyLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0dvb2dsZVN0cmVldHZpZXdQYW5vcmFtYS5qcyIsIi4uL3NyYy9zaGFkZXJzL1N0ZXJlb2dyYXBoaWNTaGFkZXIuanMiLCIuLi9zcmMvcGFub3JhbWEvTGl0dGxlUGxhbmV0LmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0ltYWdlTGl0dGxlUGxhbmV0LmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0NhbWVyYVBhbm9yYW1hLmpzIiwiLi4vc3JjL2xpYi9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzIiwiLi4vc3JjL2xpYi9jb250cm9scy9EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzLmpzIiwiLi4vc3JjL2xpYi9lZmZlY3RzL0NhcmRib2FyZEVmZmVjdC5qcyIsIi4uL3NyYy9saWIvZWZmZWN0cy9TdGVyZW9FZmZlY3QuanMiLCIuLi9zcmMvdmlld2VyL1ZpZXdlci5qcyIsIi4uL3NyYy9QYW5vbGVucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcblxuZXhwb3J0IGNvbnN0IFJFVklTSU9OID0gdmVyc2lvbjtcbmV4cG9ydCBjb25zdCBDT05UUk9MUyA9IHsgT1JCSVQ6IDAsIERFVklDRU9SSUVOVEFUSU9OOiAxIH07XG5leHBvcnQgY29uc3QgTU9ERVMgPSB7IFVOS05PV046IDAsIE5PUk1BTDogMSwgQ0FSREJPQVJEOiAyLCBTVEVSRU86IDMgfTsiLCIvKipcbiAqIERhdGEgSW1hZ2VcbiAqIEBtZW1iZXJPZiBQQU5PTEVOU1xuICogQGVudW0ge3N0cmluZ31cbiAqL1xuY29uc3QgRGF0YUltYWdlID0ge1xuICAgIEluZm86ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQUJJQUFBQVNBQkd5V3MrQUFBQUNYWndRV2NBQUFCQUFBQUFRQURxOC9oZ0FBQURCa2xFUVZSNDJ1MmJQMDhVUVJpSG56RmFTWUNJL3hva3NkQklxR3dJaVlXUlVCSVNFeHBDUTBlajM4RldPbWxJS0tob01QRWJhQ3hzcnJIaVlyUWdPU2xRRWFJQ3JUK0xIU1Baek56dDNzM2MzSG43bEh2THp2djgyTDJkbTMwWEtpb3FLZ1lZMDYyQkpGMEhwb0E3d0FSd0JiaHNQejREam9FRzhBbllOY1o4U3gxT3A4SVhKTTFLV3BkVVYzbnE5bTluSlYxSTdWTkdmRXpTTTBtTk5xUjlOT3d4eDFMN05STWZsYlFtNlNTZ2VKNFRPOFpvYXQrOC9MS2tnNGppZVE0a0xhZjJSdEt3cEowdWl1ZlprVFNjU241UzBsNUMrYi9zU1pyc3R2eU1wS1BVNXVjNGtqVFRqa3ZwZVlDa2FlQTEvKzdodmNJWk1HdU1xVVVMUU5JVThBYTRsdHJXd3lId3lCaXpHendBU1NQQWUrQjJhc3NXN0FIM2pURS9pK3hjWm9hMTJRZnkyQm8zaSs1Y0tBQmw5OXpGMUdZbFdGVEJlVUxMUzBEWnJPc0RjRE5nZ1RYZ2MyN2JMV0E2NEJoZmdIdkdtQjhkSFVYWjFETTBTNDV4bGlLTXM5YktyK2tsSU9rcXNCcnd2OUp0VnExRGV3RUFUNENoMUJZZE1HUWR5Z2VnN0RmNFNtcURBS3lveVhwQ3N6UGdJVENldXZvQWpGdVgwZ0U4amxqVWR2N2JDdGlPT0o3WHBkVVo4TC9nZFhIT0E1UXRZSDVOWFhWZ2JyZ1dXbjFud0ZUcWFpUGdkUElGY0RkMXRSRndPbDMwN0R3UnVaZ1h3THZjdGdmQTA0aGpPcDE4QWNSZVo2c1pZMTZlM3lEcFV1UXhuVTYrUzJBa2NqRXBjRHIxenhPWFNQZ0NLTFNhMG1jNG5Yd0IvRXBkYlFTY1RyNEFHcW1yallEVHlSZkF4OVRWUnNEcDVBdWc4TEp5SCtGMGNnWmc1OHoxMUJVSHBPNXJ1R2gyRzN5YnV1cUFlRjJhQmZBcWRkVUI4YnEwT2dQMlUxY2VnSDNhT1FPTU1iK0JyZFRWQjJETHVwUUx3TElPbktZMjZJQlQ2K0NsYVFER21PL0FSbXFMRHRpd0RuN0hWa2NZK0Vkak5vVGxDSSt0WWhPMmlVcHBtNkhLc2xQVXEycVFLSHBVZThBRnNqYVVYdVVRV0NncVh5b0FHOEl1TUUvV2tOUnJuQUh6WmZxRFNnZGdRNmdCYzJUZDNiM0NNVEJYdGtPc0l6VElqWkxuUWhqY1Z0bGNFSVBaTEowTG9WdnQ4cy9WYSszeXVTQUc4NFVKUnhCOThjcE05ZEpVUlVWRnhTRHpCeEtkZTRMazMvaDJBQUFBQUVsRlRrU3VRbUNDJyxcbiAgICBBcnJvdzogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFCQUNBWUFBQUNxYVhIZUFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBQklBQUFBU0FCR3lXcytBQUFBQ1had1FXY0FBQUJBQUFBQVFBRHE4L2hnQUFBRFBrbEVRVlI0MnUyYk1Vc2NRUmlHMzAvU1JhSkVJMVpLVWlSRXJOSUVMUlViUVlTQW5YOGhwVlVna0RZcDB3Z1dWallXK1FjSmFRellwTG9qSklYaHREREVLQnBqNjV0aTU4aXhtZG1iMlp2WjcrVDJBVUh1ZG1mbWVYZjJibmIzTzZDbXBxWm1nSkdxT2lJNUFXQVd3RU1BMHdEdUFyaHQzcjRDY0FhZ0JlQWJnSWFJL05RT3AxZmhJWktMSk4rU2JES2NwdGwza2VTUXRrK0krQmpKVnlSYkphUmR0RXliWTlwK1JlS2pKTitRdkl3b251ZlM5REdxN1p1WFh5ZDVuRkE4enpISmRXMXZrTHhEY3JkQzhUeTdKTzlveWMrUVBGQ1ViM05BY3FacStUbVNwOXJtSFp5U25DdmpFcndPSVBrVXdIdjgrdzd2RjY0QUxJcklmcklBU000QytBRGducmF0Z3hNQUN5TFNpQjRBeVJFQW53RTgwTGJzd2dHQUp5Snk0Yk54eUFwcjZ3Ykl3NHh4eTNkanJ3Q1lmZWV1YVpzRnNFYlBkVUxYVTREWnF1c0xnTWtFQTIxUDA1RUViZjhBOEZoRXpvczI4cGtCTHhMS0w1cy9yL00xa0Vrejl2S1FIR2VhdGYwNXlmbU9mdWJOYTdHNUpEbGU1Tmh0Qmp3SE1CejV5RndBV0JhUlQrMFh6UDhwWnNLd2NRaUgyZlg4WWNvamIra3p4VXc0WkpuN0NTUVhxcFJQSE1LQ3E3K2laSjcxTXZkeS9EZnRYU1E2SGNKZFNEYXFQUEtXL21QT0JPK2xjYnZ6Q1UzNVJDRk0yUHB3blFLelpRZmRnZmUwZHhINWRMQTZ1UUo0cEMyZklBU3JreXVBNlg2UWp4eUMxY2tWUU5uN2JOSGxJNFpnZFhJRlVPYmlKSmw4cEJDc1RqR2Z1SXdBMkN2NEZON3hiWWpranFzUkFIdUllUFhvQ2lERjFaazJWaWRYQUwrMVI1c0FxNU1yZ0piMmFCTmdkWElGOEZWN3RBbXdPcmtDQ0ZzNzN3eXNUdFlBVEhGQ1UzdkVFV202Q2k2S3ZnWS9hbzg2SWs2WG9nRGVhWTg2SWs2WGJqUGdTSHZrRVRoQ3dReTQ1WHBEUks1SmJnTjRHV2tnVXlSOUg2NU1SUXhnVzBTdW5aNUZleks3cGZ3ZDhlOE1WOFVmQVBkRjVKZHJnOEpyQWJQanByWkZEMndXeVFQNmo4WlNFdWZSbUdsZ1E5dW1CQnZkNUlPZ2JqRlVLTHUrWG5XQmhHK3Jwc0ZWWkdVby9jb0pnRlZmK2FBQVRBZ05BQ3ZJQ3BMNmpTc0FLeUgxUWNFQm1CRDJBU3docSs3dUY4NEFMSVZXaVBVRUI3bFFzaU9Fd1MyVnpRVXhtTVhTdVJDcUtwZC96WDRybDg4Rk1aZy9tTEFFY1NOK01sUC9hS3FtcHFabWtQa0wwaFNqd09wTkt4d0FBQUFBU1VWT1JLNUNZSUk9JyxcbiAgICBGdWxsc2NyZWVuRW50ZXI6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJtYVd4c1BTSWpSa1pHUmtaR0lpQm9aV2xuYUhROUlqSTBJaUIyYVdWM1FtOTRQU0l3SURBZ01qUWdNalFpSUhkcFpIUm9QU0l5TkNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0S0lDQWdJRHh3WVhSb0lHUTlJazB3SURCb01qUjJNalJJTUhvaUlHWnBiR3c5SW01dmJtVWlMejRLSUNBZ0lEeHdZWFJvSUdROUlrMDNJREUwU0RWMk5XZzFkaTB5U0RkMkxUTjZiUzB5TFRSb01sWTNhRE5XTlVnMWRqVjZiVEV5SURkb0xUTjJNbWcxZGkwMWFDMHlkak42VFRFMElEVjJNbWd6ZGpOb01sWTFhQzAxZWlJdlBnbzhMM04yWno0PScsXG4gICAgRnVsbHNjcmVlbkxlYXZlOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnYzNSNWJHVTlJbVpwYkd3NkkyWm1aaUlnWkQwaVRURTBMREUwU0RFNVZqRTJTREUyVmpFNVNERTBWakUwVFRVc01UUklNVEJXTVRsSU9GWXhOa2cxVmpFMFRUZ3NOVWd4TUZZeE1FZzFWamhJT0ZZMVRURTVMRGhXTVRCSU1UUldOVWd4TmxZNFNERTVXaUlnTHo0OEwzTjJaejQ9JyxcbiAgICBWaWRlb1BsYXk6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NDhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaVBqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCM2FXUjBhRDBpTWpRaUlHaGxhV2RvZEQwaU1qUWlJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0krUEhCaGRHZ2djM1I1YkdVOUltWnBiR3c2STJabVppSWdaRDBpVFRnc05TNHhORll4T1M0eE5Fd3hPU3d4TWk0eE5FdzRMRFV1TVRSYUlpQXZQand2YzNablBnPT0nLFxuICAgIFZpZGVvUGF1c2U6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NDhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaVBqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCM2FXUjBhRDBpTWpRaUlHaGxhV2RvZEQwaU1qUWlJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0krUEhCaGRHZ2djM1I1YkdVOUltWnBiR3c2STJabVppSWdaRDBpVFRFMExERTVMakUwU0RFNFZqVXVNVFJJTVRSTk5pd3hPUzR4TkVneE1GWTFMakUwU0RaV01Ua3VNVFJhSWlBdlBqd3ZjM1puUGc9PScsXG4gICAgV2hpdGVUaWxlOiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFnQUFBQUlBQkFNQUFBQUdWc25KQUFBQUJHZEJUVUVBQUxHUEMveGhCUUFBQUNCalNGSk5BQUI2SmdBQWdJUUFBUG9BQUFDQTZBQUFkVEFBQU9wZ0FBQTZtQUFBRjNDY3VsRThBQUFCMVdsVVdIUllUVXc2WTI5dExtRmtiMkpsTG5odGNBQUFBQUFBUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpV0UxUUlFTnZjbVVnTlM0MExqQWlQZ29nSUNBOGNtUm1PbEpFUmlCNGJXeHVjenB5WkdZOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2TURJdk1qSXRjbVJtTFhONWJuUmhlQzF1Y3lNaVBnb2dJQ0FnSUNBOGNtUm1Pa1JsYzJOeWFYQjBhVzl1SUhKa1pqcGhZbTkxZEQwaUlnb2dJQ0FnSUNBZ0lDQWdJQ0I0Yld4dWN6cDBhV1ptUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzUnBabVl2TVM0d0x5SStDaUFnSUNBZ0lDQWdJRHgwYVdabU9rTnZiWEJ5WlhOemFXOXVQakU4TDNScFptWTZRMjl0Y0hKbGMzTnBiMjQrQ2lBZ0lDQWdJQ0FnSUR4MGFXWm1Pazl5YVdWdWRHRjBhVzl1UGpFOEwzUnBabVk2VDNKcFpXNTBZWFJwYjI0K0NpQWdJQ0FnSUNBZ0lEeDBhV1ptT2xCb2IzUnZiV1YwY21salNXNTBaWEp3Y21WMFlYUnBiMjQrTWp3dmRHbG1aanBRYUc5MGIyMWxkSEpwWTBsdWRHVnljSEpsZEdGMGFXOXVQZ29nSUNBZ0lDQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNEtJQ0FnUEM5eVpHWTZVa1JHUGdvOEwzZzZlRzF3YldWMFlUNEtBdGlBQlFBQUFDUlFURlJGQUFBQUFBQUFCZ1lHQndjSEhoNGVLeXNyeDhmSHk4dkx6TXpNN096c0FBQUFCZ1lHK3E3U1pnQUFBQXAwVWs1VEFQNysvdjcrL3Y3Ky9pSngvYThBQUFPd1NVUkJWSGphN2QwaGJzTkFFQVZRbzZTRkk2WEVjQUxEY2dOTHZVQnZFQlFWaHBrV1ZZV2xoU3NWRlM3dDVRSXNoUnQ2OTVsRUFTWlArOGM3YTFrekRMMWZ6Ky96eXV2enA2RmJ2b2Rkckw2dURkMXlHWjVlWGxkZWIxOE4zZkl4N0ErNThwcm1obTY1RGZ2RGNkMDk1Mmx1NkphYkZiRC96VnByWmoxbHpjeXMrZmo5ejh4VFp0YlQ4cnY4eVdsdTZCWUFJZ0FBQUFBQUFBQUFBQUJBTTZRWEVBRUFBQUFBQUFBQWdKMmduYUFJaUlBM1EycUFHZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUUpzQURrVkZBQUFBQUFBOEJqMEdSVUFFUkVBRVJFQUVSRUFFUkVBRUFBQUFBQUFBQUFCMmduYUNJaUFDUHBsUkE5UUFOVUFFUkFBQUFFVlFFUlFCRVJDQlZsZkFjWjNhZVpvYnVzVUtNR0JoVjZLVUVsSEdLQkVSSlI2L2Z4RXhSa1FabDkvbFQ4UzFvVnN1aHF5WU1tUEtqQ2t6dmZjQ3BzeG9ocndZMFEwNkVBRUFBQUFBQUFBQUFBQ2dHZElMaUFBQUFBQUFBQUFBd0U3UVRsQUVSTUNiSVRWQURRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3S213UTFFUkFBQUFBQUNQUVk5QkVSQUJFUkFCRVJBQkVSQUJFUkFCQUFBQUFBQUFBSUNkb0oyZ0NJaUFUMmJVQURWQURSQUJFUUFBUUJGVUJFVkFCRVJnRXl2QWxKbStWNEFwTTZiTW1ESmp5b3dwTTZiTWROMExtREtqR2ZKaVJEZm9RQVFBQUFBQUFBQUFBQUNBWmtndklBSUFBQUFBQUFBQUFEdEJPMEVSRUFGdmh0UUFOUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUtmQ0RrVkZBQUFBQUFBOEJqMEdSVUFFUkVBRVJFQUVSRUFFUkVBRUFBQUFBQUFBQUFCMmduYUNJaUFDUHBsUkE5UUFOVUFFUkFBQUFFVlFFUlFCRVJDQlRhd0FVMmI2WGdHbXpKZ3lZOHFNS1RPbXpKZ3kwM1V2WU1xTVpzaUxFZDJnQXhFQUFBQUFBQUFBQUFBQW1pRzlnQWdBQUFBQUFBQUFBT3dFN1FSRlFBUzhHVklEMUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFKd0tPeFFWQVFBQUFBRHdHUFFZRkFFUkVBRVJFQUVSRUFFUkVBRVJBQUFBQUFBQUFBRFlDZG9KaW9BSStHUkdEVkFEMUFBUkVBRUFBQlJCUlZBRVJFQUVOckVDVEpucGV3V1lNbVBLakNrenBzeVlNbVBLVE5lOWdDa3ptaUV2Um5TRERrUUFBQUFBQUFBQUFBQUFhSWIwQWlJQUFBQUFBQUFBQUxBVHRCTVVBUkh3WmtnTlVBTUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBSEFxN0ZCVUJBQUFBQURBWTlCalVBUkVRQVJFUUFSRVFBUkVRQVJFQUFBQUFBQUFBQUJnSjJnbktBSWk0Sk1aTlVBTlVBTkVRQVFBQUZBRUZVRVJFQUVSMk1RS01HV203eFZneW93cE01MFBXZW45dWdOR1h6MVhhb2NBRmdBQUFBQkpSVTVFcmtKZ2dnPT0nLFxuICAgIFNldHRpbmc6ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQUJJQUFBQVNBQkd5V3MrQUFBQUNYWndRV2NBQUFCQUFBQUFRQURxOC9oZ0FBQURuMGxFUVZSNDJ1MmJ6VXNWVVJqR255TzZDUHpBTW5UanBwQW8zTFR3SDFDcVRmYXhiZU9pUlMzN0Ewd1h0Uk9GVmkxYVJCczNMV29oU0lHYlFBUVhWaUJHUmhHMFVJUktVQ3BLN3EvRm5PQjJ1YzZjT1hObVJuR2UzZVcrSDgvN3pMbG4zdk54cFFvVktsUTR3akJGSkFGT1NScVgxTzdvc2l2cHZqSG1VMW5DaEJaZ2x2U1lMWUpiUzBFYW5DdklKeldLK2duc3lIMzQvOE91TWFZamIyNjVqd0NnejZONFNXcTN2b2RiQUVtblMvS3RCRGdvQWd5VTVCdGVBT0FrTUFQY0Jyb2M3UHNrRFdmZ04rd3lEd0JkbHRNTWNESTN0WUJuZGUvcEhlQVJNTlRFcmdkNEFQendlUDgzNG9lTjFkTWt6NURsc0ZObi95eXY0a2RpU0s0QXQ0QU80Q3F3R2FEd1JtemEyQjAyMTBxTTdZaHJYVTU5QU5BcTZiV2t3UVRUbjVLTzVmSUUwdVZZbFhUZUdMT1hGTXgxRHJqbFVMd0tLTjQxeDZEbG5JakVFUUNja1BSZTBva0NpZ3VKcjVMT0dHTyt4aG01aklDSlExaThMT2VKSktQWUVRQU1LdnJ0dDVaZGpTZjJGTTBGcS9zWkpJMkE2VU5jdkN6MzZUaURmVWNBY0UxU1B1L1U2TW04ay9URmZ1NlhkRmI1aVgzZEdQTThsUWZ3Tm9kMytUb3dCblEzeWRkdHYxdlBJZStiMUpJQml3RUoxSUFKMjA4azVXMjF0cldBK1YvNUNIQWNtQXRVL0EyUC9EY0NpVEFISEU4dGdDVmhnTHZBWGdZQ2sxN0pvL3lUR2ZMdVdlN1pkNzJBQzhDV0I0bjNPQXo3bUx5dE5rWmFiQUVYTWhmZVFLWWZXRXBKWkN4QTNyR1VPWmVBL3FERjE1RnBBejQ3RXZsTms5bmVJMmUzamVXQ3owQmJtdmlwTmtTTU1YOGt1U1pZTThaOHp5cUFqYkhtYU41bU9lWWpnSVhyVTkzTVdyeEhyTlFqcnFpRGtRTUxId0crT2RxRjNOTjNqZVhLelU4QW9GMVN6ZEg4WEtoSlVPN0haRFhMTWJ3QXdJQ2tKVVVMRnhlMFNicVNWUUFidzNYaTdaZTBaTG1HQXpBS2JIczBKR1UxUXR2QWFJakNXNEI3Wk92SnkycUZhNWE3MzBSUHRCaWF6MENnbmtpWmk2RjVmQlpEVk12aG83RWhjdVMzeEpKMmhWOUl1cGdUcWFMdzBoaHphYjh2cTIzeE9HL3IrTERzS2pMZ1lWenhVblUwbHR3SzJ3RGV6VXlKbUV3cVhncC9QTDRydnh0aGFlQ1NJK3p4dUExMEo4WmtXZEpOU2IyU0xrdmF5S0h3RFJ1NzErWmFqckc5NDFKOGFnQUxEUTNHVS9hL0l2TWtZQ1B6bUNidExORVZtYWNOdGdzNWlQOWZZVk5FVjFRNkhlejd5TlpTTCtKMlNhclRjcHFpeVYyaVVrRzBJdlBGdmJ6NUZiRW4rS0VrM3dNandNZVNmQ3NCWEZCZGx5OUNBUGs5eWR5ZmZwRUN1QjV0WmZWSmphS1d1ZU9TZmlubG42WUs0bGFoUW9VS1J4ZC9BY1JQR1RjUUNBVVFBQUFBQUVsRlRrU3VRbUNDJyxcbiAgICBDaGV2cm9uUmlnaHQ6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NDhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaVBqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCM2FXUjBhRDBpTWpRaUlHaGxhV2RvZEQwaU1qUWlJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0krUEhCaGRHZ2daRDBpVFRndU5Ua3NNVFl1TlRoTU1UTXVNVGNzTVRKTU9DNDFPU3czTGpReFRERXdMRFpNTVRZc01USk1NVEFzTVRoTU9DNDFPU3d4Tmk0MU9Gb2lJQzgrUEM5emRtYysnLFxuICAgIENoZWNrOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnWkQwaVRUSXhMRGRNT1N3eE9Vd3pMalVzTVRNdU5VdzBMamt4TERFeUxqQTVURGtzTVRZdU1UZE1NVGt1TlRrc05TNDFPVXd5TVN3M1dpSWdMejQ4TDNOMlp6ND0nLFxuICAgIFZpZXdJbmRpY2F0b3I6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NEtQQ0ZFVDBOVVdWQkZJSE4yWnlCUVZVSk1TVU1nSWkwdkwxY3pReTh2UkZSRUlGTldSeUF4TGpFdkwwVk9JaUFpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2UjNKaGNHaHBZM012VTFaSEx6RXVNUzlFVkVRdmMzWm5NVEV1WkhSa0lqNEtQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhodGJHNXpPbmhzYVc1clBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1TDNoc2FXNXJJaUJwWkQwaWRtbGxkeTFwYm1ScFkyRjBiM0lpSUdobGFXZG9kRDBpTXpBaUlIZHBaSFJvUFNJek1DSWdkbWxsZDBKdmVEMGlMVEl1TlNBdE1TQXpNQ0F6TUNJK0NnazhjM1I1YkdVZ2RIbHdaVDBpZEdWNGRDOWpjM01pUGk1emREQjdjM1J5YjJ0bExYZHBaSFJvT2pJN2MzUnliMnRsTFcxcGRHVnliR2x0YVhRNk1UQTdabWxzYkRwdWIyNWxPMzB1YzNReGUzTjBjbTlyWlMxM2FXUjBhRG8yTzNOMGNtOXJaUzF0YVhSbGNteHBiV2wwT2pFd08zMEtDVHd2YzNSNWJHVStDZ2s4Wno0S0NRazhjR0YwYUNCamJHRnpjejBpYzNRd0lpQmtQU0pOSURFeUxqVWdNQ0JCSURFeUxqVWdNVEl1TlNBd0lEQWdNQ0F0TVRJdU5TQXdJRUVnTVRJdU5TQXhNaTQxSURBZ01DQXdJREV5TGpVZ01DSWdkSEpoYm5ObWIzSnRQU0p0WVhSeWFYZ29NU3d3TERBc01Td3hNeXd4TlM0MUtTSStQQzl3WVhSb1Bnb0pDVHh3WVhSb0lHTnNZWE56UFNKemRESWlJR1E5SWswZ01UTWdNQ0JNSURFd0lESWdUQ0F4TmlBeUlGb2lQand2Y0dGMGFENEtDUWs4Y0dGMGFDQmpiR0Z6Y3owaWMzUXlJaUJrUFNKTklESWdNQ0JCSURJZ01pQXdJREFnTUNBdE1pQXdJRUVnTWlBeUlEQWdNQ0F3SURJZ01DSWdkSEpoYm5ObWIzSnRQU0p0WVhSeWFYZ29NU3d3TERBc01Td3hNeXd4TlM0MUtTSStQQzl3WVhSb1Bnb0pDVHh3WVhSb0lHTnNZWE56UFNKemRERWlJR2xrUFNKcGJtUnBZMkYwYjNJaUlIUnlZVzV6Wm05eWJUMGliV0YwY21sNEtERXNNQ3d3TERFc01UTXNNVFV1TlNraVBqd3ZjR0YwYUQ0S0NUd3ZaejRLUEM5emRtYysnXG59O1xuXG5leHBvcnQgeyBEYXRhSW1hZ2UgfTsiLCJpbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UuanMnO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogSW1hZ2UgbG9hZGVyIHdpdGggcHJvZ3Jlc3MgYmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL2xvYWRlcnMvSW1hZ2VMb2FkZXIuanN9XG4gKiBAbWVtYmVyT2YgUEFOT0xFTlNcbiAqIEBuYW1lc3BhY2VcbiAqL1xuY29uc3QgSW1hZ2VMb2FkZXIgPSB7XG5cblx0bG9hZDogZnVuY3Rpb24gKCB1cmwsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuXHRcdC8vIEVuYWJsZSBjYWNoZVxuXHRcdFRIUkVFLkNhY2hlLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0bGV0IGNhY2hlZCwgcmVxdWVzdCwgYXJyYXlCdWZmZXJWaWV3LCBibG9iLCB1cmxDcmVhdG9yLCBpbWFnZSwgcmVmZXJlbmNlO1xuXHRcblx0XHQvLyBSZWZlcmVuY2Uga2V5XG5cdFx0Zm9yICggbGV0IGljb25OYW1lIGluIERhdGFJbWFnZSApIHtcblx0XG5cdFx0XHRpZiAoIERhdGFJbWFnZS5oYXNPd25Qcm9wZXJ0eSggaWNvbk5hbWUgKSAmJiB1cmwgPT09IERhdGFJbWFnZVsgaWNvbk5hbWUgXSApIHtcblx0XG5cdFx0XHRcdHJlZmVyZW5jZSA9IGljb25OYW1lO1xuXHRcblx0XHRcdH1cblx0XG5cdFx0fVxuXHRcblx0XHQvLyBDYWNoZWRcblx0XHRjYWNoZWQgPSBUSFJFRS5DYWNoZS5nZXQoIHJlZmVyZW5jZSA/IHJlZmVyZW5jZSA6IHVybCApO1xuXHRcblx0XHRpZiAoIGNhY2hlZCAhPT0gdW5kZWZpbmVkICkge1xuXHRcblx0XHRcdGlmICggb25Mb2FkICkge1xuXHRcblx0XHRcdFx0c2V0VGltZW91dCggZnVuY3Rpb24gKCkge1xuXHRcblx0XHRcdFx0XHRpZiAoIG9uUHJvZ3Jlc3MgKSB7XG5cdFxuXHRcdFx0XHRcdFx0b25Qcm9ncmVzcyggeyBsb2FkZWQ6IDEsIHRvdGFsOiAxIH0gKTtcblx0XG5cdFx0XHRcdFx0fSBcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRvbkxvYWQoIGNhY2hlZCApO1xuXHRcblx0XHRcdFx0fSwgMCApO1xuXHRcblx0XHRcdH1cblx0XG5cdFx0XHRyZXR1cm4gY2FjaGVkO1xuXHRcblx0XHR9XG5cdFx0XG5cdFx0Ly8gQ29uc3RydWN0IGEgbmV3IFhNTEh0dHBSZXF1ZXN0XG5cdFx0dXJsQ3JlYXRvciA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcblx0XHRpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnaW1nJyApO1xuXHRcblx0XHQvLyBBZGQgdG8gY2FjaGVcblx0XHRUSFJFRS5DYWNoZS5hZGQoIHJlZmVyZW5jZSA/IHJlZmVyZW5jZSA6IHVybCwgaW1hZ2UgKTtcblx0XG5cdFx0Y29uc3Qgb25JbWFnZUxvYWRlZCA9ICgpID0+IHtcblx0XG5cdFx0XHR1cmxDcmVhdG9yLnJldm9rZU9iamVjdFVSTCggaW1hZ2Uuc3JjICk7XG5cdFx0XHRvbkxvYWQgJiYgb25Mb2FkKCBpbWFnZSApO1xuXHRcblx0XHR9XG5cdFxuXHRcdGlmICggdXJsLmluZGV4T2YoICdkYXRhOicgKSA9PT0gMCApIHtcblx0XG5cdFx0XHRpbWFnZS5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIG9uSW1hZ2VMb2FkZWQsIGZhbHNlICk7XG5cdFx0XHRpbWFnZS5zcmMgPSB1cmw7XG5cdFx0XHRyZXR1cm4gaW1hZ2U7XG5cdFx0fVxuXHRcblx0XHRpbWFnZS5jcm9zc09yaWdpbiA9IHRoaXMuY3Jvc3NPcmlnaW4gIT09IHVuZGVmaW5lZCA/IHRoaXMuY3Jvc3NPcmlnaW4gOiAnJztcblx0XG5cdFx0cmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHJlcXVlc3Qub3BlbiggJ0dFVCcsIHVybCwgdHJ1ZSApO1xuXHRcdHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcblx0XHRyZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcblx0XHRcdFx0aWYgKCBldmVudC5sZW5ndGhDb21wdXRhYmxlICkge1xuXHRcblx0XHRcdFx0XHRvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MoIHsgbG9hZGVkOiBldmVudC5sb2FkZWQsIHRvdGFsOiBldmVudC50b3RhbCB9ICk7XG5cdFxuXHRcdFx0XHR9XG5cdFxuXHRcdH07XG5cdFx0cmVxdWVzdC5vbmxvYWRlbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFxuXHRcdFx0XHRhcnJheUJ1ZmZlclZpZXcgPSBuZXcgVWludDhBcnJheSggdGhpcy5yZXNwb25zZSApO1xuXHRcdFx0XHRibG9iID0gbmV3IEJsb2IoIFsgYXJyYXlCdWZmZXJWaWV3IF0gKTtcblx0XHRcdFx0XG5cdFx0XHRcdGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgb25JbWFnZUxvYWRlZCwgZmFsc2UgKTtcblx0XHRcdGltYWdlLnNyYyA9IHVybENyZWF0b3IuY3JlYXRlT2JqZWN0VVJMKCBibG9iICk7XG5cdFxuXHRcdH07XG5cdFxuXHRcdHJlcXVlc3Quc2VuZChudWxsKTtcblx0XG5cdH1cblxufTtcblxuZXhwb3J0IHsgSW1hZ2VMb2FkZXIgfTsiLCJpbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vSW1hZ2VMb2FkZXIuanMnO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogVGV4dHVyZSBsb2FkZXIgYmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL2xvYWRlcnMvVGV4dHVyZUxvYWRlci5qc31cbiAqIEBtZW1iZXJPZiBQQU5PTEVOU1xuICogQG5hbWVzcGFjZVxuICovXG5jb25zdCBUZXh0dXJlTG9hZGVyID0ge1xuXG5cdC8qKlxuXHQgKiBMb2FkIGltYWdlIHRleHR1cmVcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgIHVybCAgICAgICAgLSBBbiBpbWFnZSB1cmxcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259IG9uTG9hZCAgICAgLSBPbiBsb2FkIGNhbGxiYWNrXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvblByb2dyZXNzIC0gSW4gcHJvZ3Jlc3MgY2FsbGJhY2tcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259IG9uRXJyb3IgICAgLSBPbiBlcnJvciBjYWxsYmFja1xuXHQgKiBAcmV0dXJuIHtUSFJFRS5UZXh0dXJlfSAgIFx0IC0gSW1hZ2UgdGV4dHVyZVxuXHQgKi9cblx0bG9hZDogZnVuY3Rpb24gKCB1cmwsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuXHRcdHZhciB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoKTsgXG5cblx0XHRJbWFnZUxvYWRlci5sb2FkKCB1cmwsIGZ1bmN0aW9uICggaW1hZ2UgKSB7XG5cblx0XHRcdHRleHR1cmUuaW1hZ2UgPSBpbWFnZTtcblxuXHRcdFx0Ly8gSlBFR3MgY2FuJ3QgaGF2ZSBhbiBhbHBoYSBjaGFubmVsLCBzbyBtZW1vcnkgY2FuIGJlIHNhdmVkIGJ5IHN0b3JpbmcgdGhlbSBhcyBSR0IuXG5cdFx0XHRjb25zdCBpc0pQRUcgPSB1cmwuc2VhcmNoKCAvXFwuKGpwZ3xqcGVnKSQvICkgPiAwIHx8IHVybC5zZWFyY2goIC9eZGF0YVxcOmltYWdlXFwvanBlZy8gKSA9PT0gMDtcblxuXHRcdFx0dGV4dHVyZS5mb3JtYXQgPSBpc0pQRUcgPyBUSFJFRS5SR0JGb3JtYXQgOiBUSFJFRS5SR0JBRm9ybWF0O1xuXHRcdFx0dGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdG9uTG9hZCAmJiBvbkxvYWQoIHRleHR1cmUgKTtcblxuXHRcdH0sIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKTtcblxuXHRcdHJldHVybiB0ZXh0dXJlO1xuXG5cdH1cblxufTtcblxuZXhwb3J0IHsgVGV4dHVyZUxvYWRlciB9OyIsImltcG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9JbWFnZUxvYWRlci5qcyc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBDdWJlIFRleHR1cmUgTG9hZGVyIGJhc2VkIG9uIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL3NyYy9sb2FkZXJzL0N1YmVUZXh0dXJlTG9hZGVyLmpzfVxuICogQG1lbWJlck9mIFBBTk9MRU5TXG4gKiBAbmFtZXNwYWNlXG4gKi9cbmNvbnN0IEN1YmVUZXh0dXJlTG9hZGVyID0ge1xuXG5cdC8qKlxuXHQqIExvYWQgNiBpbWFnZXMgYXMgYSBjdWJlIHRleHR1cmVcblx0KiBAcGFyYW0gIHthcnJheX0gICB1cmxzICAgICAgICAtIEFycmF5IHdpdGggNiBpbWFnZSB1cmxzXG5cdCogQHBhcmFtICB7ZnVuY3Rpb259IG9uTG9hZCAgICAgLSBPbiBsb2FkIGNhbGxiYWNrXG5cdCogQHBhcmFtICB7ZnVuY3Rpb259IG9uUHJvZ3Jlc3MgLSBJbiBwcm9ncmVzcyBjYWxsYmFja1xuXHQqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbkVycm9yICAgIC0gT24gZXJyb3IgY2FsbGJhY2tcblx0KiBAcmV0dXJuIHtUSFJFRS5DdWJlVGV4dHVyZX0gICAtIEN1YmUgdGV4dHVyZVxuXHQqL1xuICAgbG9hZDogZnVuY3Rpb24gKCB1cmxzLCBvbkxvYWQsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKSB7XG5cblx0ICAgdmFyIHRleHR1cmUsIGxvYWRlZCwgcHJvZ3Jlc3MsIGFsbCwgbG9hZGluZ3M7XG5cblx0ICAgdGV4dHVyZSA9IG5ldyBUSFJFRS5DdWJlVGV4dHVyZSggW10gKTtcblxuXHQgICBsb2FkZWQgPSAwO1xuXHQgICBwcm9ncmVzcyA9IHt9O1xuXHQgICBhbGwgPSB7fTtcblxuXHQgICB1cmxzLm1hcCggZnVuY3Rpb24gKCB1cmwsIGluZGV4ICkge1xuXG5cdFx0ICAgSW1hZ2VMb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIGltYWdlICkge1xuXG5cdFx0XHQgICB0ZXh0dXJlLmltYWdlc1sgaW5kZXggXSA9IGltYWdlO1xuXG5cdFx0XHQgICBsb2FkZWQrKztcblxuXHRcdFx0ICAgaWYgKCBsb2FkZWQgPT09IDYgKSB7XG5cblx0XHRcdFx0ICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0ICAgb25Mb2FkICYmIG9uTG9hZCggdGV4dHVyZSApO1xuXG5cdFx0XHQgICB9XG5cblx0XHQgICB9LCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHQgICBwcm9ncmVzc1sgaW5kZXggXSA9IHsgbG9hZGVkOiBldmVudC5sb2FkZWQsIHRvdGFsOiBldmVudC50b3RhbCB9O1xuXG5cdFx0XHQgICBhbGwubG9hZGVkID0gMDtcblx0XHRcdCAgIGFsbC50b3RhbCA9IDA7XG5cdFx0XHQgICBsb2FkaW5ncyA9IDA7XG5cblx0XHRcdCAgIGZvciAoIHZhciBpIGluIHByb2dyZXNzICkge1xuXG5cdFx0XHRcdCAgIGxvYWRpbmdzKys7XG5cdFx0XHRcdCAgIGFsbC5sb2FkZWQgKz0gcHJvZ3Jlc3NbIGkgXS5sb2FkZWQ7XG5cdFx0XHRcdCAgIGFsbC50b3RhbCArPSBwcm9ncmVzc1sgaSBdLnRvdGFsO1xuXG5cdFx0XHQgICB9XG5cblx0XHRcdCAgIGlmICggbG9hZGluZ3MgPCA2ICkge1xuXG5cdFx0XHRcdCAgIGFsbC50b3RhbCA9IGFsbC50b3RhbCAvIGxvYWRpbmdzICogNjtcblxuXHRcdFx0ICAgfVxuXG5cdFx0XHQgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MoIGFsbCApO1xuXG5cdFx0ICAgfSwgb25FcnJvciApO1xuXG5cdCAgIH0gKTtcblxuXHQgICByZXR1cm4gdGV4dHVyZTtcblxuICAgfVxuXG59O1xuXG5leHBvcnQgeyBDdWJlVGV4dHVyZUxvYWRlciB9OyIsImltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIFVzZXIgTWVkaWFcbiAqIEBwYXJhbSB7b2JqZWN0fSBbY29uc3RyYWludHM9eyB2aWRlbzoge30sIGF1ZGlvOiBmYWxzZSwgZmFjaW5nTW9kZTogJ2Vudmlyb25tZW50JyB9XVxuICovXG5mdW5jdGlvbiBNZWRpYSAoIGNvbnN0cmFpbnRzID0geyB2aWRlbzoge30sIGF1ZGlvOiBmYWxzZSwgZmFjaW5nTW9kZTogJ2Vudmlyb25tZW50JyB9ICkge1xuXG4gICAgdGhpcy5jb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzO1xuXG4gICAgdGhpcy5jb250YWluZXJcbiAgICB0aGlzLnNjZW5lO1xuICAgIHRoaXMuZWxlbWVudDtcbiAgICB0aGlzLnN0cmVhbXMgPSB7fTtcbiAgICB0aGlzLnN0cmVhbUlkO1xuXG59O1xuXG5PYmplY3QuYXNzaWduKCBNZWRpYS5wcm90b3R5cGUsIHtcblxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBvcHRpb25hbCA9IFtcbiAgICAgICAgICAgIHsgbWluV2lkdGg6IDMyMCAgfSxcbiAgICAgICAgICAgIHsgbWluV2lkdGg6IDY0MCAgfSxcbiAgICAgICAgICAgIHsgbWluV2lkdGg6IDEwMjQgfSxcbiAgICAgICAgICAgIHsgbWluV2lkdGg6IDEyODAgfSxcbiAgICAgICAgICAgIHsgbWluV2lkdGg6IDE5MjAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IHsgdmlkZW8gfSA9IHRoaXMuY29uc3RyYWludHM7XG5cbiAgICAgICAgaWYgKCAhdmlkZW8ub3B0aW9uYWwgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLm9wdGlvbmFsID0gb3B0aW9uYWw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY3JlYXRlVmlkZW9FbGVtZW50KCk7XG5cbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKCB0aGlzLmNvbnN0cmFpbnRzIClcbiAgICAgICAgLmNhdGNoKCBlcnJvciA9PiB7IGNvbnNvbGUud2FybiggYFBBTk9MRU5TLk1lZGlhOiAke2Vycm9yfWAgKSB9ICk7XG5cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuc3RyZWFtc1sgdGhpcy5zdHJlYW1JZCBdO1xuXG4gICAgICAgIGlmICggc3RyZWFtICYmIHN0cmVhbS5hY3RpdmUgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gc3RyZWFtLmdldFRyYWNrcygpWyAwIF07XG5cbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcblxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zdHJlYW1JZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbXMgPSB7fTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgYXR0YWNoVmlkZW9Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uICggc3RyZWFtICkge1xuXG4gICAgICAgIHRoaXMuc3RyZWFtc1sgc3RyZWFtLmlkIF0gPSBzdHJlYW07XG4gICAgICAgIFxuICAgICAgICBpZiAoIHRoaXMuc3RyZWFtSWQgKSB7IHJldHVybjsgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zdHJlYW1JZCA9IHN0cmVhbS5pZDtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcblxuICAgICAgICBpZiAoIHRoaXMuc2NlbmUgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IHRoaXMuY3JlYXRlVmlkZW9UZXh0dXJlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgfSxcblxuICAgIGNyZWF0ZVZpZGVvVGV4dHVyZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlZpZGVvVGV4dHVyZSggdmlkZW8gKTtcblxuICAgICAgICB0ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuICAgICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHRleHR1cmUuZm9ybWF0ID0gVEhSRUUuUkdCRm9ybWF0O1xuICAgICAgICB0ZXh0dXJlLmNlbnRlci5zZXQoIDAuNSwgMC41ICk7XG5cbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lciggJ2NhbnBsYXknLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICAgfSxcblxuICAgIGNyZWF0ZVZpZGVvRWxlbWVudDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAndmlkZW8nICk7XG4gICAgICAgIFxuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoICdhdXRvcGxheScsICcnICk7XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSggJ211dGVkJywgJycgKTtcbiAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCAncGxheXNpbmxpbmUnLCAnJyApO1xuXG4gICAgICAgIHZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdmlkZW8uc3R5bGUudG9wID0gJzAnO1xuICAgICAgICB2aWRlby5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICB2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB2aWRlby5zdHlsZS5vYmplY3RQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgICAgICB2aWRlby5zdHlsZS5vYmplY3RGaXQgPSAnY292ZXInO1xuICAgICAgICB2aWRlby5zdHlsZS5kaXNwbGF5ID0gdGhpcy5zY2VuZSA/ICdub25lJyA6ICcnO1xuXG4gICAgICAgIHJldHVybiB2aWRlbztcblxuICAgIH0sXG5cbiAgICBvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQudmlkZW9XaWR0aCAmJiB0aGlzLmVsZW1lbnQudmlkZW9IZWlnaHQgJiYgdGhpcy5zY2VuZSApIHtcblxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5zY2VuZS5iYWNrZ3JvdW5kO1xuICAgICAgICAgICAgY29uc3QgeyB2aWRlb1dpZHRoLCB2aWRlb0hlaWdodCB9ID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgY2FtZXJhUmF0aW8gPSB2aWRlb0hlaWdodCAvIHZpZGVvV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydFJhdGlvID0gY29udGFpbmVyID8gY29udGFpbmVyLmNsaWVudFdpZHRoIC8gY29udGFpbmVyLmNsaWVudEhlaWdodCA6IDEuMDtcbiAgICAgICAgICAgIHRleHR1cmUucmVwZWF0LnNldCggLWNhbWVyYVJhdGlvICogdmlld3BvcnRSYXRpbywgMSApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBNZWRpYSB9OyIsIlxuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogUmV0aWNsZSAzRCBTcHJpdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtUSFJFRS5Db2xvcn0gW2NvbG9yPTB4ZmZmZmZmXSAtIENvbG9yIG9mIHRoZSByZXRpY2xlIHNwcml0ZVxuICogQHBhcmFtIHtib29sZWFufSBbYXV0b1NlbGVjdD10cnVlXSAtIEF1dG8gc2VsZWN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gW2R3ZWxsVGltZT0xNTAwXSAtIER1cmF0aW9uIGZvciBkd2VsbGluZyBzZXF1ZW5jZSB0byBjb21wbGV0ZVxuICovXG5cbmZ1bmN0aW9uIFJldGljbGUgKCBjb2xvciA9IDB4ZmZmZmZmLCBhdXRvU2VsZWN0ID0gdHJ1ZSwgZHdlbGxUaW1lID0gMTUwMCApIHtcblxuICAgIHRoaXMuZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cbiAgICBjb25zdCB7IGNhbnZhcywgY29udGV4dCB9ID0gdGhpcy5jcmVhdGVDYW52YXMoKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCggeyBjb2xvciwgbWFwOiB0aGlzLmNyZWF0ZUNhbnZhc1RleHR1cmUoIGNhbnZhcyApIH0gKTtcblxuICAgIFRIUkVFLlNwcml0ZS5jYWxsKCB0aGlzLCBtYXRlcmlhbCApO1xuXG4gICAgdGhpcy5jYW52YXNXaWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgaW5zdGFuY2VvZiBUSFJFRS5Db2xvciA/IGNvbG9yIDogbmV3IFRIUkVFLkNvbG9yKCBjb2xvciApOyAgICBcblxuICAgIHRoaXMuYXV0b1NlbGVjdCA9IGF1dG9TZWxlY3Q7XG4gICAgdGhpcy5kd2VsbFRpbWUgPSBkd2VsbFRpbWU7XG4gICAgdGhpcy5wb3NpdGlvbi56ID0gLTEwO1xuICAgIHRoaXMuY2VudGVyLnNldCggMC41LCAwLjUgKTtcbiAgICB0aGlzLnNjYWxlLnNldCggMC41LCAwLjUsIDEgKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lc3RhbXA7XG4gICAgdGhpcy50aW1lcklkO1xuICAgIHRoaXMuY2FsbGJhY2s7XG5cbiAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuICAgIHRoaXMudXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzcyggMCApO1xuXG59O1xuXG5SZXRpY2xlLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLlNwcml0ZS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IFJldGljbGUsXG5cbiAgICBzZXRDb2xvcjogZnVuY3Rpb24gKCBjb2xvciApIHtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsLmNvbG9yLmNvcHkoIGNvbG9yIGluc3RhbmNlb2YgVEhSRUUuQ29sb3IgPyBjb2xvciA6IG5ldyBUSFJFRS5Db2xvciggY29sb3IgKSApO1xuXG4gICAgfSxcblxuICAgIGNyZWF0ZUNhbnZhc1RleHR1cmU6IGZ1bmN0aW9uICggY2FudmFzICkge1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZSggY2FudmFzICk7XG4gICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcblxuICAgIH0sXG5cbiAgICBjcmVhdGVDYW52YXM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IDMyO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAzMjtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG4gICAgICAgIGNvbnN0IGRwciA9IHRoaXMuZHByO1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoICogZHByO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogZHByO1xuICAgICAgICBjb250ZXh0LnNjYWxlKCBkcHIsIGRwciApO1xuXG4gICAgICAgIGNvbnRleHQuc2hhZG93Qmx1ciA9IDU7XG4gICAgICAgIGNvbnRleHQuc2hhZG93Q29sb3IgPSBcInJnYmEoMjAwLDIwMCwyMDAsMC45KVwiO1xuXG4gICAgICAgIHJldHVybiB7IGNhbnZhcywgY29udGV4dCB9O1xuXG4gICAgfSxcblxuICAgIHVwZGF0ZUNhbnZhc0FyY0J5UHJvZ3Jlc3M6IGZ1bmN0aW9uICggcHJvZ3Jlc3MgKSB7XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCBtYXRlcmlhbCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgZHByID0gdGhpcy5kcHI7XG4gICAgICAgIGNvbnN0IGRlZ3JlZSA9IHByb2dyZXNzICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvci5nZXRTdHlsZSgpO1xuICAgICAgICBjb25zdCB4ID0gY2FudmFzV2lkdGggKiAwLjUgLyBkcHI7XG4gICAgICAgIGNvbnN0IHkgPSBjYW52YXNIZWlnaHQgKiAwLjUgLyBkcHI7XG4gICAgICAgIGNvbnN0IGxpbmVXaWR0aCA9IDM7XG4gICAgICAgIFxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCggMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCApO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGlmICggcHJvZ3Jlc3MgPT09IDAgKSB7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyggeCwgeSwgY2FudmFzV2lkdGggLyAxNiwgMCwgMiAqIE1hdGguUEkgKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKCB4LCB5LCBjYW52YXNXaWR0aCAvIDQgLSBsaW5lV2lkdGgsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgZGVncmVlICk7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIG1hdGVyaWFsLm1hcC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgcmlwcGxlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3Qgc3RvcCA9IHRoaXMuc3RvcC5iaW5kKCB0aGlzICk7XG4gICAgICAgIGNvbnN0IHsgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgbWF0ZXJpYWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gNTAwO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjb25zdCBkcHIgPSB0aGlzLmRwcjtcbiAgICAgICAgY29uc3QgeCA9IGNhbnZhc1dpZHRoICogMC41IC8gZHByO1xuICAgICAgICBjb25zdCB5ID0gY2FudmFzSGVpZ2h0ICogMC41IC8gZHByO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgdGltZXJJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSggdXBkYXRlICk7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gcGVyZm9ybWFuY2Uubm93KCkgLSB0aW1lc3RhbXA7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGVsYXBzZWQgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAxLjAgLSBwcm9ncmVzcyA+IDAgPyAxLjAgLSBwcm9ncmVzcyA6IDA7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSBwcm9ncmVzcyAqIGNhbnZhc1dpZHRoICogMC41IC8gZHByO1xuXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCggMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCApO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKCB4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyICk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7Y29sb3IuciAqIDI1NX0sICR7Y29sb3IuZyAqIDI1NX0sICR7Y29sb3IuYiAqIDI1NX0sICR7b3BhY2l0eX0pYDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgaWYgKCBwcm9ncmVzcyA+IDEuMCApIHtcblxuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKCB0aW1lcklkICk7XG4gICAgICAgICAgICAgICAgc3RvcCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hdGVyaWFsLm1hcC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgICAgfTtcblxuICAgICAgICB1cGRhdGUoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHJldGljbGUgdmlzaWJsZVxuICAgICAqL1xuICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ha2UgcmV0aWNsZSBpbnZpc2libGVcbiAgICAgKi9cbiAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgZHdlbGxpbmdcbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gKCBjYWxsYmFjayApIHtcblxuICAgICAgICBpZiAoICF0aGlzLmF1dG9TZWxlY3QgKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGFydFRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcCBkd2VsbGluZ1xuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMudGltZXJJZCApO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzcyggMCApO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy50aW1lcklkID0gbnVsbDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgZHdlbGxpbmdcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnRpbWVySWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMudXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSBwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lc3RhbXA7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gZWxhcHNlZCAvIHRoaXMuZHdlbGxUaW1lO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzcyggcHJvZ3Jlc3MgKTtcblxuICAgICAgICBpZiAoIHByb2dyZXNzID4gMS4wICkge1xuXG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy50aW1lcklkICk7XG4gICAgICAgICAgICB0aGlzLnJpcHBsZSgpO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0gKTtcblxuZXhwb3J0IHsgUmV0aWNsZSB9OyIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIHRoZW4gdGhlXG5cdFx0Ly8gbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC4gSG93ZXZlcixcblx0XHQvLyBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLCB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUodGltZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCFwcmVzZXJ2ZSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcblxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XG5UV0VFTi5fbmV4dElkID0gMDtcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcbn07XG5cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cbmlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xuXHRUV0VFTi5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuXG5cdFx0Ly8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cblx0XHRyZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcblx0fTtcbn1cbi8vIEluIGEgYnJvd3NlciwgdXNlIHNlbGYucGVyZm9ybWFuY2Uubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cbmVsc2UgaWYgKHR5cGVvZiAoc2VsZikgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICBzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcblx0XHQgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHQvLyBUaGlzIG11c3QgYmUgYm91bmQsIGJlY2F1c2UgZGlyZWN0bHkgYXNzaWduaW5nIHRoaXMgZnVuY3Rpb25cblx0Ly8gbGVhZHMgdG8gYW4gaW52b2NhdGlvbiBleGNlcHRpb24gaW4gQ2hyb21lLlxuXHRUV0VFTi5ub3cgPSBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKHNlbGYucGVyZm9ybWFuY2UpO1xufVxuLy8gVXNlIERhdGUubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cbmVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XG59XG4vLyBPdGhlcndpc2UsIHVzZSAnbmV3IERhdGUoKS5nZXRUaW1lKCknLlxuZWxzZSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH07XG59XG5cblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XG5cdHRoaXMuX3JlcGVhdCA9IDA7XG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5feW95byA9IGZhbHNlO1xuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9ncm91cCA9IGdyb3VwIHx8IFRXRUVOO1xuXHR0aGlzLl9pZCA9IFRXRUVOLm5leHRJZCgpO1xuXG59O1xuXG5UV0VFTi5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cdGdldElkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gT2JqZWN0LmNyZWF0ZShwcm9wZXJ0aWVzKTtcblxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcblx0XHR0aGlzLl9kdXJhdGlvbiA9IGQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uICh0aW1lKSB7XG5cblx0XHR0aGlzLl9ncm91cC5hZGQodGhpcyk7XG5cblx0XHR0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xuXG5cdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHR5cGVvZiB0aW1lID09PSAnc3RyaW5nJyA/IFRXRUVOLm5vdygpICsgcGFyc2VGbG9hdCh0aW1lKSA6IHRpbWUgOiBUV0VFTi5ub3coKTtcblx0XHR0aGlzLl9zdGFydFRpbWUgKz0gdGhpcy5fZGVsYXlUaW1lO1xuXG5cdFx0Zm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XG5cblx0XHRcdC8vIENoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGEgbG9jYWwgY29weSBvZiB0aGUgQXJyYXkgd2l0aCB0aGUgc3RhcnQgdmFsdWUgYXQgdGhlIGZyb250XG5cdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbdGhpcy5fb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGB0bygpYCBzcGVjaWZpZXMgYSBwcm9wZXJ0eSB0aGF0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3QsXG5cdFx0XHQvLyB3ZSBzaG91bGQgbm90IHNldCB0aGF0IHByb3BlcnR5IGluIHRoZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl9vYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlLlxuXHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fb2JqZWN0W3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKCh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3Ncblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cdFx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZShJbmZpbml0eSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gKCkge1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XG5cdFx0fVxuXG5cdH0sXG5cblx0Z3JvdXA6IGZ1bmN0aW9uIChncm91cCkge1xuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcblxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdDogZnVuY3Rpb24gKHRpbWVzKSB7XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XG5cblx0XHR0aGlzLl9yZXBlYXREZWxheVRpbWUgPSBhbW91bnQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR5b3lvOiBmdW5jdGlvbiAoeW95bykge1xuXG5cdFx0dGhpcy5feW95byA9IHlveW87XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlYXNpbmc6IGZ1bmN0aW9uIChlYXNpbmdGdW5jdGlvbikge1xuXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXNpbmdGdW5jdGlvbjtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIChpbnRlcnBvbGF0aW9uRnVuY3Rpb24pIHtcblxuXHRcdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVycG9sYXRpb25GdW5jdGlvbjtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNoYWluOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gYXJndW1lbnRzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25TdGFydDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uUmVwZWF0OiBmdW5jdGlvbiBvblJlcGVhdChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25Db21wbGV0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RvcDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSkge1xuXG5cdFx0dmFyIHByb3BlcnR5O1xuXHRcdHZhciBlbGFwc2VkO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcblxuXHRcdHZhbHVlID0gdGhpcy5fZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XG5cblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnQgPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoZW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcblxuXHRcdFx0XHRcdGlmIChlbmQuY2hhckF0KDApID09PSAnKycgfHwgZW5kLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZW5kID0gcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QsIGVsYXBzZWQpO1xuXHRcdH1cblxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XG5cblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XG5cblx0XHRcdFx0aWYgKGlzRmluaXRlKHRoaXMuX3JlcGVhdCkpIHtcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX3JlcGVhdERlbGF5VGltZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fZGVsYXlUaW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0XHR0aGlzLl9vblJlcGVhdENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsKSB7XG5cblx0XHRcdFx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdFx0XHQvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxuXHRcdFx0XHRcdC8vIGV2ZW4gaWYgdGhlIGB1cGRhdGUoKWAgbWV0aG9kIHdhcyBjYWxsZWQgd2F5IHBhc3QgdGhlIGR1cmF0aW9uIG9mIHRoZSB0d2VlblxuXHRcdFx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RhcnQodGhpcy5fc3RhcnRUaW1lICsgdGhpcy5fZHVyYXRpb24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9XG59O1xuXG5cblRXRUVOLkVhc2luZyA9IHtcblxuXHRMaW5lYXI6IHtcblxuXHRcdE5vbmU6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhZHJhdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiAoMiAtIGspO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKC0tayAqIChrIC0gMikgLSAxKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEN1YmljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFydGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtICgtLWsgKiBrICogayAqIGspO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgLSAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1aW50aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0U2ludXNvaWRhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5jb3MoayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNpbihrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RXhwb25lbnRpYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLSAxMCAqIGspO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgtIE1hdGgucG93KDIsIC0gMTAgKiAoayAtIDEpKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q2lyY3VsYXI6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gayAqIGspO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc3FydCgxIC0gKC0tayAqIGspKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gLSAwLjUgKiAoTWF0aC5zcXJ0KDEgLSBrICogaykgLSAxKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtIChrIC09IDIpICogaykgKyAxKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEVsYXN0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIE1hdGgucG93KDIsIC0xMCAqIGspICogTWF0aC5zaW4oKGsgLSAwLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRrICo9IDI7XG5cblx0XHRcdGlmIChrIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gLTAuNSAqIE1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAtMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCYWNrOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1OCAqIDEuNTI1O1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiAoayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJvdW5jZToge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPCAoMSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiBrICogaztcblx0XHRcdH0gZWxzZSBpZiAoayA8ICgyIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgxLjUgLyAyLjc1KSkgKiBrICsgMC43NTtcblx0XHRcdH0gZWxzZSBpZiAoayA8ICgyLjUgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuMjUgLyAyLjc1KSkgKiBrICsgMC45Mzc1O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjYyNSAvIDIuNzUpKSAqIGsgKyAwLjk4NDM3NTtcblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPCAwLjUpIHtcblx0XHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuSW4oayAqIDIpICogMC41O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoayAqIDIgLSAxKSAqIDAuNSArIDAuNTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cblRXRUVOLkludGVycG9sYXRpb24gPSB7XG5cblx0TGluZWFyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIGYgPSBtICogaztcblx0XHR2YXIgaSA9IE1hdGguZmxvb3IoZik7XG5cdFx0dmFyIGZuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5MaW5lYXI7XG5cblx0XHRpZiAoayA8IDApIHtcblx0XHRcdHJldHVybiBmbih2WzBdLCB2WzFdLCBmKTtcblx0XHR9XG5cblx0XHRpZiAoayA+IDEpIHtcblx0XHRcdHJldHVybiBmbih2W21dLCB2W20gLSAxXSwgbSAtIGYpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmbih2W2ldLCB2W2kgKyAxID4gbSA/IG0gOiBpICsgMV0sIGYgLSBpKTtcblxuXHR9LFxuXG5cdEJlemllcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBiID0gMDtcblx0XHR2YXIgbiA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgcHcgPSBNYXRoLnBvdztcblx0XHR2YXIgYm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkJlcm5zdGVpbjtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IG47IGkrKykge1xuXHRcdFx0YiArPSBwdygxIC0gaywgbiAtIGkpICogcHcoaywgaSkgKiB2W2ldICogYm4obiwgaSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGI7XG5cblx0fSxcblxuXHRDYXRtdWxsUm9tOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIGYgPSBtICogaztcblx0XHR2YXIgaSA9IE1hdGguZmxvb3IoZik7XG5cdFx0dmFyIGZuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5DYXRtdWxsUm9tO1xuXG5cdFx0aWYgKHZbMF0gPT09IHZbbV0pIHtcblxuXHRcdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRcdGkgPSBNYXRoLmZsb29yKGYgPSBtICogKDEgKyBrKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRcdHJldHVybiB2WzBdIC0gKGZuKHZbMF0sIHZbMF0sIHZbMV0sIHZbMV0sIC1mKSAtIHZbMF0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA+IDEpIHtcblx0XHRcdFx0cmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbaSA/IGkgLSAxIDogMF0sIHZbaV0sIHZbbSA8IGkgKyAxID8gbSA6IGkgKyAxXSwgdlttIDwgaSArIDIgPyBtIDogaSArIDJdLCBmIC0gaSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRVdGlsczoge1xuXG5cdFx0TGluZWFyOiBmdW5jdGlvbiAocDAsIHAxLCB0KSB7XG5cblx0XHRcdHJldHVybiAocDEgLSBwMCkgKiB0ICsgcDA7XG5cblx0XHR9LFxuXG5cdFx0QmVybnN0ZWluOiBmdW5jdGlvbiAobiwgaSkge1xuXG5cdFx0XHR2YXIgZmMgPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkZhY3RvcmlhbDtcblxuXHRcdFx0cmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XG5cblx0XHR9LFxuXG5cdFx0RmFjdG9yaWFsOiAoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgYSA9IFsxXTtcblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChuKSB7XG5cblx0XHRcdFx0dmFyIHMgPSAxO1xuXG5cdFx0XHRcdGlmIChhW25dKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFbbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gbjsgaSA+IDE7IGktLSkge1xuXHRcdFx0XHRcdHMgKj0gaTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFbbl0gPSBzO1xuXHRcdFx0XHRyZXR1cm4gcztcblxuXHRcdFx0fTtcblxuXHRcdH0pKCksXG5cblx0XHRDYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcblxuXHRcdFx0dmFyIHYwID0gKHAyIC0gcDApICogMC41O1xuXHRcdFx0dmFyIHYxID0gKHAzIC0gcDEpICogMC41O1xuXHRcdFx0dmFyIHQyID0gdCAqIHQ7XG5cdFx0XHR2YXIgdDMgPSB0ICogdDI7XG5cblx0XHRcdHJldHVybiAoMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSkgKiB0MyArICgtIDMgKiBwMSArIDMgKiBwMiAtIDIgKiB2MCAtIHYxKSAqIHQyICsgdjAgKiB0ICsgcDE7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG4vLyBVTUQgKFVuaXZlcnNhbCBNb2R1bGUgRGVmaW5pdGlvbilcbihmdW5jdGlvbiAocm9vdCkge1xuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblxuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIFRXRUVOO1xuXHRcdH0pO1xuXG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cblx0XHQvLyBOb2RlLmpzXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBUV0VFTjtcblxuXHR9IGVsc2UgaWYgKHJvb3QgIT09IHVuZGVmaW5lZCkge1xuXG5cdFx0Ly8gR2xvYmFsIHZhcmlhYmxlXG5cdFx0cm9vdC5UV0VFTiA9IFRXRUVOO1xuXG5cdH1cblxufSkodGhpcyk7XG4iLCJcbmltcG9ydCAndGhyZWUnO1xuaW1wb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi4vRGF0YUltYWdlJztcbmltcG9ydCB7IE1PREVTIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcbmltcG9ydCB7IFRleHR1cmVMb2FkZXIgfSBmcm9tICcuLi9sb2FkZXJzL1RleHR1cmVMb2FkZXInO1xuaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBzcG90IGF0dGFjaGVkIHRvIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2NhbGU9MzAwXSAtIERlZmF1bHQgc2NhbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaW1hZ2VTcmM9UEFOT0xFTlMuRGF0YUltYWdlLkluZm9dIC0gSW1hZ2Ugb3ZlcmxheSBpbmZvXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthbmltYXRlZD10cnVlXSAtIEVuYWJsZSBkZWZhdWx0IGhvdmVyIGFuaW1hdGlvblxuICovXG5mdW5jdGlvbiBJbmZvc3BvdCAoIHNjYWxlID0gMzAwLCBpbWFnZVNyYywgYW5pbWF0ZWQgKSB7XG5cdFxuXHRjb25zdCBkdXJhdGlvbiA9IDUwMCwgc2NhbGVGYWN0b3IgPSAxLjM7XG5cblx0aW1hZ2VTcmMgPSBpbWFnZVNyYyB8fCBEYXRhSW1hZ2UuSW5mbztcblxuXHRUSFJFRS5TcHJpdGUuY2FsbCggdGhpcyApO1xuXG5cdHRoaXMudHlwZSA9ICdpbmZvc3BvdCc7XG5cblx0dGhpcy5hbmltYXRlZCA9IGFuaW1hdGVkICE9PSB1bmRlZmluZWQgPyBhbmltYXRlZCA6IHRydWU7XG5cdHRoaXMuaXNIb3ZlcmluZyA9IGZhbHNlO1xuXG5cdC8vIFRPRE86IFRocmVlLmpzIGJ1ZyBob3RmaXggZm9yIHNwcml0ZSByYXljYXN0aW5nIHIxMDRcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMTQ2MjRcblx0dGhpcy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG5cblx0dGhpcy5lbGVtZW50O1xuXHR0aGlzLnRvUGFub3JhbWE7XG5cdHRoaXMuY3Vyc29yU3R5bGU7XG5cblx0dGhpcy5tb2RlID0gTU9ERVMuVU5LTk9XTjtcblxuXHR0aGlzLnNjYWxlLnNldCggc2NhbGUsIHNjYWxlLCAxICk7XG5cdHRoaXMucm90YXRpb24ueSA9IE1hdGguUEk7XG5cblx0dGhpcy5jb250YWluZXI7XG5cblx0dGhpcy5vcmlnaW5hbFJheWNhc3QgPSB0aGlzLnJheWNhc3Q7XG5cblx0Ly8gRXZlbnQgSGFuZGxlclxuXHR0aGlzLkhBTkRMRVJfRk9DVVM7XHRcblxuXHR0aGlzLm1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuXHR0aGlzLm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xuXHR0aGlzLm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcblx0dGhpcy5tYXRlcmlhbC5vcGFjaXR5ID0gMDtcblxuXHRjb25zdCBwb3N0TG9hZCA9IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuXHRcdGNvbnN0IHJhdGlvID0gdGV4dHVyZS5pbWFnZS53aWR0aCAvIHRleHR1cmUuaW1hZ2UuaGVpZ2h0O1xuXHRcdGNvbnN0IHRleHR1cmVTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHR0ZXh0dXJlLmltYWdlLndpZHRoID0gdGV4dHVyZS5pbWFnZS5uYXR1cmFsV2lkdGggfHwgNjQ7XG5cdFx0dGV4dHVyZS5pbWFnZS5oZWlnaHQgPSB0ZXh0dXJlLmltYWdlLm5hdHVyYWxIZWlnaHQgfHwgNjQ7XG5cblx0XHR0aGlzLnNjYWxlLnNldCggcmF0aW8gKiBzY2FsZSwgc2NhbGUsIDEgKTtcblxuXHRcdHRleHR1cmVTY2FsZS5jb3B5KCB0aGlzLnNjYWxlICk7XG5cblx0XHR0aGlzLnNjYWxlVXBBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMuc2NhbGUgKVxuXHRcdFx0LnRvKCB7IHg6IHRleHR1cmVTY2FsZS54ICogc2NhbGVGYWN0b3IsIHk6IHRleHR1cmVTY2FsZS55ICogc2NhbGVGYWN0b3IgfSwgZHVyYXRpb24gKVxuXHRcdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0ICk7XG5cblx0XHR0aGlzLnNjYWxlRG93bkFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5zY2FsZSApXG5cdFx0XHQudG8oIHsgeDogdGV4dHVyZVNjYWxlLngsIHk6IHRleHR1cmVTY2FsZS55IH0sIGR1cmF0aW9uIClcblx0XHRcdC5lYXNpbmcoIFRXRUVOLkVhc2luZy5FbGFzdGljLk91dCApO1xuXG5cdFx0dGhpcy5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuXHRcdHRoaXMubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH0uYmluZCggdGhpcyApO1xuXG5cdC8vIEFkZCBzaG93IGFuZCBoaWRlIGFuaW1hdGlvbnNcblx0dGhpcy5zaG93QW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLm1hdGVyaWFsIClcblx0XHQudG8oIHsgb3BhY2l0eTogMSB9LCBkdXJhdGlvbiApXG5cdFx0Lm9uU3RhcnQoIHRoaXMuZW5hYmxlUmF5Y2FzdC5iaW5kKCB0aGlzLCB0cnVlICkgKVxuXHRcdC5lYXNpbmcoIFRXRUVOLkVhc2luZy5RdWFydGljLk91dCApO1xuXG5cdHRoaXMuaGlkZUFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG5cdFx0LnRvKCB7IG9wYWNpdHk6IDAgfSwgZHVyYXRpb24gKVxuXHRcdC5vblN0YXJ0KCB0aGlzLmVuYWJsZVJheWNhc3QuYmluZCggdGhpcywgZmFsc2UgKSApXG5cdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0ICk7XG5cblx0Ly8gQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMub25DbGljayApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdob3ZlcicsIHRoaXMub25Ib3ZlciApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdob3ZlcmVudGVyJywgdGhpcy5vbkhvdmVyU3RhcnQgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnaG92ZXJsZWF2ZScsIHRoaXMub25Ib3ZlckVuZCApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCB0aGlzLm9uRHVhbEV5ZUVmZmVjdCApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1jb250YWluZXInLCB0aGlzLnNldENvbnRhaW5lci5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZGlzbWlzcycsIHRoaXMub25EaXNtaXNzICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWluZm9zcG90LWZvY3VzJywgdGhpcy5zZXRGb2N1c01ldGhvZCApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vcmFtYS1lbnRlcicsIHRoaXMub25QYW5vcmFtYUVudGVyICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9yYW1hLWxlYXZlJywgdGhpcy5vblBhbm9yYW1hTGVhdmUgKTtcblxuXHRUZXh0dXJlTG9hZGVyLmxvYWQoIGltYWdlU3JjLCBwb3N0TG9hZCApO1x0XG5cbn07XG5cbkluZm9zcG90LnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLlNwcml0ZS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBJbmZvc3BvdCxcblxuXHRvblBhbm9yYW1hRW50ZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFxuXG5cdH0sXG5cblx0b25QYW5vcmFtYUxlYXZlOiBmdW5jdGlvbiAoKSB7XG5cblxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBpbmZvc3BvdCBjb250YWluZXJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxvYmplY3R9IGRhdGEgLSBEYXRhIHdpdGggY29udGFpbmVyIGluZm9ybWF0aW9uXG5cdCAqL1xuXHRzZXRDb250YWluZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcblxuXHRcdGxldCBjb250YWluZXI7XG5cdFxuXHRcdGlmICggZGF0YSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICkge1xuXHRcblx0XHRcdGNvbnRhaW5lciA9IGRhdGE7XG5cdFxuXHRcdH0gZWxzZSBpZiAoIGRhdGEgJiYgZGF0YS5jb250YWluZXIgKSB7XG5cdFxuXHRcdFx0Y29udGFpbmVyID0gZGF0YS5jb250YWluZXI7XG5cdFxuXHRcdH1cblx0XG5cdFx0Ly8gQXBwZW5kIGVsZW1lbnQgaWYgZXhpc3RzXG5cdFx0aWYgKCBjb250YWluZXIgJiYgdGhpcy5lbGVtZW50ICkge1xuXHRcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cdFxuXHRcdH1cblx0XG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cdFxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgY29udGFpbmVyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIFRoZSBjb250YWluZXIgb2YgdGhpcyBpbmZvc3BvdFxuXHQgKi9cblx0Z2V0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXI7XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCBieSBhIGNsaWNrIGV2ZW50XG5cdCAqIFRyYW5zbGF0ZSBhbmQgbG9jayB0aGUgaG92ZXJpbmcgZWxlbWVudCBpZiBhbnlcblx0ICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIEV2ZW50IGNvbnRhaW5pbmcgbW91c2VFdmVudCB3aXRoIGNsaWVudFggYW5kIGNsaWVudFlcblx0ICovXG5cdG9uQ2xpY2s6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRpZiAoIHRoaXMuZWxlbWVudCAmJiB0aGlzLmdldENvbnRhaW5lcigpICkge1xuXG5cdFx0XHR0aGlzLm9uSG92ZXJTdGFydCggZXZlbnQgKTtcblxuXHRcdFx0Ly8gTG9jayBlbGVtZW50XG5cdFx0XHR0aGlzLmxvY2tIb3ZlckVsZW1lbnQoKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNtaXNzIGN1cnJlbnQgZWxlbWVudCBpZiBhbnlcblx0ICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIERpc21pc3MgZXZlbnRcblx0ICovXG5cdG9uRGlzbWlzczogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGlmICggdGhpcy5lbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLnVubG9ja0hvdmVyRWxlbWVudCgpO1xuXHRcdFx0dGhpcy5vbkhvdmVyRW5kKCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCBieSBhIG1vdXNlIGhvdmVyIGV2ZW50XG5cdCAqIFRyYW5zbGF0ZSB0aGUgaG92ZXJpbmcgZWxlbWVudCBpZiBhbnlcblx0ICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIEV2ZW50IGNvbnRhaW5pbmcgbW91c2VFdmVudCB3aXRoIGNsaWVudFggYW5kIGNsaWVudFlcblx0ICovXG5cdG9uSG92ZXI6IGZ1bmN0aW9uICggZXZlbnQgKSB7fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCBvbiBhIG1vdXNlIGhvdmVyIHN0YXJ0XG5cdCAqIFNldHMgY3Vyc29yIHN0eWxlIHRvICdwb2ludGVyJywgZGlzcGxheSB0aGUgZWxlbWVudCBhbmQgc2NhbGUgdXAgdGhlIGluZm9zcG90XG5cdCAqL1xuXHRvbkhvdmVyU3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRpZiAoICF0aGlzLmdldENvbnRhaW5lcigpICkgeyByZXR1cm47IH1cblxuXHRcdGNvbnN0IGN1cnNvclN0eWxlID0gdGhpcy5jdXJzb3JTdHlsZSB8fCAoIHRoaXMubW9kZSA9PT0gTU9ERVMuTk9STUFMID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnICk7XG5cblx0XHR0aGlzLmlzSG92ZXJpbmcgPSB0cnVlO1xuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IGN1cnNvclN0eWxlO1xuXHRcdFxuXHRcdGlmICggdGhpcy5hbmltYXRlZCApIHtcblxuXHRcdFx0dGhpcy5zY2FsZURvd25BbmltYXRpb24gJiYgdGhpcy5zY2FsZURvd25BbmltYXRpb24uc3RvcCgpO1xuXHRcdFx0dGhpcy5zY2FsZVVwQW5pbWF0aW9uICYmIHRoaXMuc2NhbGVVcEFuaW1hdGlvbi5zdGFydCgpO1xuXG5cdFx0fVxuXHRcdFxuXHRcdGlmICggdGhpcy5lbGVtZW50ICYmIGV2ZW50Lm1vdXNlRXZlbnQuY2xpZW50WCA+PSAwICYmIGV2ZW50Lm1vdXNlRXZlbnQuY2xpZW50WSA+PSAwICkge1xuXG5cdFx0XHRpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuQ0FSREJPQVJEIHx8IHRoaXMubW9kZSA9PT0gTU9ERVMuU1RFUkVPICkge1xuXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQubGVmdCAmJiAoIHRoaXMuZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snICk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5yaWdodCAmJiAoIHRoaXMuZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJyApO1xuXG5cdFx0XHRcdC8vIFN0b3JlIGVsZW1lbnQgd2lkdGggZm9yIHJlZmVyZW5jZVxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuX3dpZHRoID0gdGhpcy5lbGVtZW50LmxlZnQuY2xpZW50V2lkdGg7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5faGVpZ2h0ID0gdGhpcy5lbGVtZW50LmxlZnQuY2xpZW50SGVpZ2h0O1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0dGhpcy5lbGVtZW50LmxlZnQgJiYgKCB0aGlzLmVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnICk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5yaWdodCAmJiAoIHRoaXMuZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnICk7XG5cblx0XHRcdFx0Ly8gU3RvcmUgZWxlbWVudCB3aWR0aCBmb3IgcmVmZXJlbmNlXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5fd2lkdGggPSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGg7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5faGVpZ2h0ID0gdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodDtcblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgb24gYSBtb3VzZSBob3ZlciBlbmRcblx0ICogU2V0cyBjdXJzb3Igc3R5bGUgdG8gJ2RlZmF1bHQnLCBoaWRlIHRoZSBlbGVtZW50IGFuZCBzY2FsZSBkb3duIHRoZSBpbmZvc3BvdFxuXHQgKi9cblx0b25Ib3ZlckVuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCAhdGhpcy5nZXRDb250YWluZXIoKSApIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLmlzSG92ZXJpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG5cblx0XHRpZiAoIHRoaXMuYW5pbWF0ZWQgKSB7XG5cblx0XHRcdHRoaXMuc2NhbGVVcEFuaW1hdGlvbiAmJiB0aGlzLnNjYWxlVXBBbmltYXRpb24uc3RvcCgpO1xuXHRcdFx0dGhpcy5zY2FsZURvd25BbmltYXRpb24gJiYgdGhpcy5zY2FsZURvd25BbmltYXRpb24uc3RhcnQoKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy5lbGVtZW50ICYmICF0aGlzLmVsZW1lbnQubG9ja2VkICkge1xuXG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHRoaXMuZWxlbWVudC5sZWZ0ICYmICggdGhpcy5lbGVtZW50LmxlZnQuc3R5bGUuZGlzcGxheSA9ICdub25lJyApO1xuXHRcdFx0dGhpcy5lbGVtZW50LnJpZ2h0ICYmICggdGhpcy5lbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScgKTtcblxuXHRcdFx0dGhpcy51bmxvY2tIb3ZlckVsZW1lbnQoKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBPbiBkdWFsIGV5ZSBlZmZlY3QgaGFuZGxlclxuXHQgKiBDcmVhdGVzIGR1cGxpY2F0ZSBsZWZ0IGFuZCByaWdodCBlbGVtZW50XG5cdCAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgLSBwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QgZXZlbnRcblx0ICovXG5cdG9uRHVhbEV5ZUVmZmVjdDogZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRcblx0XHRpZiAoICF0aGlzLmdldENvbnRhaW5lcigpICkgeyByZXR1cm47IH1cblxuXHRcdGxldCBlbGVtZW50LCBoYWxmV2lkdGgsIGhhbGZIZWlnaHQ7XG5cblx0XHR0aGlzLm1vZGUgPSBldmVudC5tb2RlO1xuXG5cdFx0ZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuXHRcdGhhbGZXaWR0aCA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gMjtcblx0XHRoYWxmSGVpZ2h0ID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcblxuXHRcdGlmICggIWVsZW1lbnQgKSB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdGlmICggIWVsZW1lbnQubGVmdCB8fCAhZWxlbWVudC5yaWdodCApIHtcblxuXHRcdFx0ZWxlbWVudC5sZWZ0ID0gZWxlbWVudC5jbG9uZU5vZGUoIHRydWUgKTtcblx0XHRcdGVsZW1lbnQucmlnaHQgPSBlbGVtZW50LmNsb25lTm9kZSggdHJ1ZSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLm1vZGUgPT09IE1PREVTLkNBUkRCT0FSRCB8fCB0aGlzLm1vZGUgPT09IE1PREVTLlNURVJFTyApIHtcblxuXHRcdFx0ZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgPSBlbGVtZW50LnN0eWxlLmRpc3BsYXk7XG5cdFx0XHRlbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSBlbGVtZW50LnN0eWxlLmRpc3BsYXk7XG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBlbGVtZW50LmxlZnQuc3R5bGUuZGlzcGxheTtcblx0XHRcdGVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0ZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5cdFx0fVxuXG5cdFx0Ly8gVXBkYXRlIGVsZW1lbnRzIHRyYW5zbGF0aW9uXG5cdFx0dGhpcy50cmFuc2xhdGVFbGVtZW50KCBoYWxmV2lkdGgsIGhhbGZIZWlnaHQgKTtcblxuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBlbGVtZW50LmxlZnQgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggZWxlbWVudC5yaWdodCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRyYW5zbGF0ZSB0aGUgaG92ZXJpbmcgZWxlbWVudCBieSBjc3MgdHJhbnNmb3JtXG5cdCAqIEBwYXJhbSAge251bWJlcn0geCAtIFggcG9zaXRpb24gb24gdGhlIHdpbmRvdyBzY3JlZW5cblx0ICogQHBhcmFtICB7bnVtYmVyfSB5IC0gWSBwb3NpdGlvbiBvbiB0aGUgd2luZG93IHNjcmVlblxuXHQgKi9cblx0dHJhbnNsYXRlRWxlbWVudDogZnVuY3Rpb24gKCB4LCB5ICkge1xuXG5cdFx0aWYgKCAhdGhpcy5lbGVtZW50Ll93aWR0aCB8fCAhdGhpcy5lbGVtZW50Ll9oZWlnaHQgfHwgIXRoaXMuZ2V0Q29udGFpbmVyKCkgKSB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdGxldCBsZWZ0LCB0b3AsIGVsZW1lbnQsIHdpZHRoLCBoZWlnaHQsIGRlbHRhLCBjb250YWluZXI7XG5cblx0XHRjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblx0XHRlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXHRcdHdpZHRoID0gZWxlbWVudC5fd2lkdGggLyAyO1xuXHRcdGhlaWdodCA9IGVsZW1lbnQuX2hlaWdodCAvIDI7XG5cdFx0ZGVsdGEgPSBlbGVtZW50LnZlcnRpY2FsRGVsdGEgIT09IHVuZGVmaW5lZCA/IGVsZW1lbnQudmVydGljYWxEZWx0YSA6IDQwO1xuXG5cdFx0bGVmdCA9IHggLSB3aWR0aDtcblx0XHR0b3AgPSB5IC0gaGVpZ2h0IC0gZGVsdGE7XG5cblx0XHRpZiAoICggdGhpcy5tb2RlID09PSBNT0RFUy5DQVJEQk9BUkQgfHwgdGhpcy5tb2RlID09PSBNT0RFUy5TVEVSRU8gKSBcblx0XHRcdFx0JiYgZWxlbWVudC5sZWZ0ICYmIGVsZW1lbnQucmlnaHRcblx0XHRcdFx0JiYgISggeCA9PT0gY29udGFpbmVyLmNsaWVudFdpZHRoIC8gMiAmJiB5ID09PSBjb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMiApICkge1xuXG5cdFx0XHRsZWZ0ID0gY29udGFpbmVyLmNsaWVudFdpZHRoIC8gNCAtIHdpZHRoICsgKCB4IC0gY29udGFpbmVyLmNsaWVudFdpZHRoIC8gMiApO1xuXHRcdFx0dG9wID0gY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDIgLSBoZWlnaHQgLSBkZWx0YSArICggeSAtIGNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyICk7XG5cblx0XHRcdHRoaXMuc2V0RWxlbWVudFN0eWxlKCAndHJhbnNmb3JtJywgZWxlbWVudC5sZWZ0LCAndHJhbnNsYXRlKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4KScgKTtcblxuXHRcdFx0bGVmdCArPSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyO1xuXG5cdFx0XHR0aGlzLnNldEVsZW1lbnRTdHlsZSggJ3RyYW5zZm9ybScsIGVsZW1lbnQucmlnaHQsICd0cmFuc2xhdGUoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgpJyApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5zZXRFbGVtZW50U3R5bGUoICd0cmFuc2Zvcm0nLCBlbGVtZW50LCAndHJhbnNsYXRlKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4KScgKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgdmVuZG9yIHNwZWNpZmljIGNzc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIENTUyBzdHlsZSBuYW1lXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBiZSBtb2RpZmllZFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBTdHlsZSB2YWx1ZVxuXHQgKi9cblx0c2V0RWxlbWVudFN0eWxlOiBmdW5jdGlvbiAoIHR5cGUsIGVsZW1lbnQsIHZhbHVlICkge1xuXG5cdFx0Y29uc3Qgc3R5bGUgPSBlbGVtZW50LnN0eWxlO1xuXG5cdFx0aWYgKCB0eXBlID09PSAndHJhbnNmb3JtJyApIHtcblxuXHRcdFx0c3R5bGUud2Via2l0VHJhbnNmb3JtID0gc3R5bGUubXNUcmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPSB2YWx1ZTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgaG92ZXJpbmcgdGV4dCBjb250ZW50XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gVGV4dCB0byBiZSBkaXNwbGF5ZWRcblx0ICovXG5cdHNldFRleHQ6IGZ1bmN0aW9uICggdGV4dCApIHtcblxuXHRcdGlmICggdGhpcy5lbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLmVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBjdXJzb3IgY3NzIHN0eWxlIG9uIGhvdmVyXG5cdCAqL1xuXHRzZXRDdXJzb3JIb3ZlclN0eWxlOiBmdW5jdGlvbiAoIHN0eWxlICkge1xuXG5cdFx0dGhpcy5jdXJzb3JTdHlsZSA9IHN0eWxlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEFkZCBob3ZlcmluZyB0ZXh0IGVsZW1lbnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0IHRvIGJlIGRpc3BsYXllZFxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2RlbHRhPTQwXSAtIFZlcnRpY2FsIGRlbHRhIHRvIHRoZSBpbmZvc3BvdFxuXHQgKi9cblx0YWRkSG92ZXJUZXh0OiBmdW5jdGlvbiAoIHRleHQsIGRlbHRhICkge1xuXG5cdFx0aWYgKCAhdGhpcy5lbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gMDtcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5tYXhXaWR0aCA9ICc1MCUnO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICc1MCUnO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLnRleHRTaGFkb3cgPSAnMCAwIDNweCAjMDAwMDAwJztcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gJ1wiVHJlYnVjaGV0IE1TXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZic7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoICdwYW5vbGVucy1pbmZvc3BvdCcgKTtcblx0XHRcdHRoaXMuZWxlbWVudC52ZXJ0aWNhbERlbHRhID0gZGVsdGEgIT09IHVuZGVmaW5lZCA/IGRlbHRhIDogNDA7XG5cblx0XHR9XG5cblx0XHR0aGlzLnNldFRleHQoIHRleHQgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBZGQgaG92ZXJpbmcgZWxlbWVudCBieSBjbG9uaW5nIGFuIGVsZW1lbnRcblx0ICogQHBhcmFtIHtIVE1MRE9NRWxlbWVudH0gZWwgLSBFbGVtZW50IHRvIGJlIGNsb25lZCBhbmQgZGlzcGxheWVkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbZGVsdGE9NDBdIC0gVmVydGljYWwgZGVsdGEgdG8gdGhlIGluZm9zcG90XG5cdCAqL1xuXHRhZGRIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICggZWwsIGRlbHRhICkge1xuXG5cdFx0aWYgKCAhdGhpcy5lbGVtZW50ICkgeyBcblxuXHRcdFx0dGhpcy5lbGVtZW50ID0gZWwuY2xvbmVOb2RlKCB0cnVlICk7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAncGFub2xlbnMtaW5mb3Nwb3QnICk7XG5cdFx0XHR0aGlzLmVsZW1lbnQudmVydGljYWxEZWx0YSA9IGRlbHRhICE9PSB1bmRlZmluZWQgPyBkZWx0YSA6IDQwO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJlbW92ZSBob3ZlcmluZyBlbGVtZW50XG5cdCAqL1xuXHRyZW1vdmVIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdGhpcy5lbGVtZW50ICkgeyBcblxuXHRcdFx0aWYgKCB0aGlzLmVsZW1lbnQubGVmdCApIHtcblxuXHRcdFx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50LmxlZnQgKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmxlZnQgPSBudWxsO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggdGhpcy5lbGVtZW50LnJpZ2h0ICkge1xuXG5cdFx0XHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQucmlnaHQgKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnJpZ2h0ID0gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBudWxsO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIExvY2sgaG92ZXJpbmcgZWxlbWVudFxuXHQgKi9cblx0bG9ja0hvdmVyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB0aGlzLmVsZW1lbnQgKSB7IFxuXG5cdFx0XHR0aGlzLmVsZW1lbnQubG9ja2VkID0gdHJ1ZTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVbmxvY2sgaG92ZXJpbmcgZWxlbWVudFxuXHQgKi9cblx0dW5sb2NrSG92ZXJFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIHRoaXMuZWxlbWVudCApIHsgXG5cblx0XHRcdHRoaXMuZWxlbWVudC5sb2NrZWQgPSBmYWxzZTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGVuYWJsZVJheWNhc3Q6IGZ1bmN0aW9uICggZW5hYmxlZCA9IHRydWUgKSB7XG5cblx0XHRpZiAoIGVuYWJsZWQgKSB7XG5cblx0XHRcdHRoaXMucmF5Y2FzdCA9IHRoaXMub3JpZ2luYWxSYXljYXN0O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5yYXljYXN0ID0gKCkgPT4ge307XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogU2hvdyBpbmZvc3BvdFxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9IFtkZWxheT0wXSAtIERlbGF5IHRpbWUgdG8gc2hvd1xuXHQgKi9cblx0c2hvdzogZnVuY3Rpb24gKCBkZWxheSA9IDAgKSB7XG5cblx0XHRpZiAoIHRoaXMuYW5pbWF0ZWQgKSB7XG5cblx0XHRcdHRoaXMuaGlkZUFuaW1hdGlvbiAmJiB0aGlzLmhpZGVBbmltYXRpb24uc3RvcCgpO1xuXHRcdFx0dGhpcy5zaG93QW5pbWF0aW9uICYmIHRoaXMuc2hvd0FuaW1hdGlvbi5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5tYXRlcmlhbC5vcGFjaXR5ID0gMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBIaWRlIGluZm9zcG90XG5cdCAqIEBwYXJhbSAge251bWJlcn0gW2RlbGF5PTBdIC0gRGVsYXkgdGltZSB0byBoaWRlXG5cdCAqL1xuXHRoaWRlOiBmdW5jdGlvbiAoIGRlbGF5ID0gMCApIHtcblxuXHRcdGlmICggdGhpcy5hbmltYXRlZCApIHtcblxuXHRcdFx0dGhpcy5zaG93QW5pbWF0aW9uICYmIHRoaXMuc2hvd0FuaW1hdGlvbi5zdG9wKCk7XG5cdFx0XHR0aGlzLmhpZGVBbmltYXRpb24gJiYgdGhpcy5oaWRlQW5pbWF0aW9uLmRlbGF5KCBkZWxheSApLnN0YXJ0KCk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLm1hdGVyaWFsLm9wYWNpdHkgPSAwO1xuXG5cdFx0fVxuXHRcdFxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgZm9jdXMgZXZlbnQgaGFuZGxlclxuXHQgKi9cblx0c2V0Rm9jdXNNZXRob2Q6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRpZiAoIGV2ZW50ICkge1xuXG5cdFx0XHR0aGlzLkhBTkRMRVJfRk9DVVMgPSBldmVudC5tZXRob2Q7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogRm9jdXMgY2FtZXJhIGNlbnRlciB0byB0aGlzIGluZm9zcG90XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MTAwMF0gLSBEdXJhdGlvbiB0byB0d2VlblxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZWFzaW5nPVRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXRdIC0gRWFzaW5nIGZ1bmN0aW9uXG5cdCAqL1xuXHRmb2N1czogZnVuY3Rpb24gKCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG5cdFx0aWYgKCB0aGlzLkhBTkRMRVJfRk9DVVMgKSB7XG5cblx0XHRcdHRoaXMuSEFORExFUl9GT0NVUyggdGhpcy5wb3NpdGlvbiwgZHVyYXRpb24sIGVhc2luZyApO1xuXHRcdFx0dGhpcy5vbkRpc21pc3MoKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlIGluZm9zcG90XG5cdCAqL1xuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnJlbW92ZUhvdmVyRWxlbWVudCgpO1xuXHRcdHRoaXMubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG5cdFx0aWYgKCB0aGlzLnBhcmVudCApIHtcblxuXHRcdFx0dGhpcy5wYXJlbnQucmVtb3ZlKCB0aGlzICk7XG5cblx0XHR9XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IEluZm9zcG90IH07IiwiaW1wb3J0IHsgQ09OVFJPTFMsIE1PREVTIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBXaWRnZXQgZm9yIGNvbnRyb2xzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIEEgZG9tRWxlbWVudCB3aGVyZSBkZWZhdWx0IGNvbnRyb2wgd2lkZ2V0IHdpbGwgYmUgYXR0YWNoZWQgdG9cbiAqL1xuZnVuY3Rpb24gV2lkZ2V0ICggY29udGFpbmVyICkge1xuXG5cdGlmICggIWNvbnRhaW5lciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1BBTk9MRU5TLldpZGdldDogTm8gY29udGFpbmVyIHNwZWNpZmllZCcgKTtcblxuXHR9XG5cblx0VEhSRUUuRXZlbnREaXNwYXRjaGVyLmNhbGwoIHRoaXMgKTtcblxuXHR0aGlzLkRFRkFVTFRfVFJBTlNJVElPTiAgPSAnYWxsIDAuMjdzIGVhc2UnO1xuXHR0aGlzLlRPVUNIX0VOQUJMRUQgPSAhISgoICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyApIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCk7XG5cdHRoaXMuUFJFVkVOVF9FVkVOVF9IQU5ETEVSID0gZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9O1xuXG5cdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG5cdHRoaXMuYmFyRWxlbWVudDtcblx0dGhpcy5mdWxsc2NyZWVuRWxlbWVudDtcblx0dGhpcy52aWRlb0VsZW1lbnQ7XG5cdHRoaXMuc2V0dGluZ0VsZW1lbnQ7XG5cblx0dGhpcy5tYWluTWVudTtcblxuXHR0aGlzLmFjdGl2ZU1haW5JdGVtO1xuXHR0aGlzLmFjdGl2ZVN1Yk1lbnU7XG5cdHRoaXMubWFzaztcblxufVxuXG5XaWRnZXQucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IFdpZGdldCxcblxuXHQvKipcblx0ICogQWRkIGNvbnRyb2wgYmFyXG5cdCAqL1xuXHRhZGRDb250cm9sQmFyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoICF0aGlzLmNvbnRhaW5lciApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnV2lkZ2V0IGNvbnRhaW5lciBub3Qgc2V0JyApOyBcblx0XHRcdHJldHVybjsgXG5cdFx0fVxuXG5cdFx0dmFyIHNjb3BlID0gdGhpcywgYmFyLCBzdHlsZVRyYW5zbGF0ZSwgc3R5bGVPcGFjaXR5LCBncmFkaWVudFN0eWxlO1xuXG5cdFx0Z3JhZGllbnRTdHlsZSA9ICdsaW5lYXItZ3JhZGllbnQoYm90dG9tLCByZ2JhKDAsMCwwLDAuMiksIHJnYmEoMCwwLDAsMCkpJztcblxuXHRcdGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0YmFyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXHRcdGJhci5zdHlsZS5oZWlnaHQgPSAnNDRweCc7XG5cdFx0YmFyLnN0eWxlLmZsb2F0ID0gJ2xlZnQnO1xuXHRcdGJhci5zdHlsZS50cmFuc2Zvcm0gPSBiYXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYmFyLnN0eWxlLm1zVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTEwMCUpJztcblx0XHRiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctd2Via2l0LScgKyBncmFkaWVudFN0eWxlO1xuXHRcdGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gJy1tb3otJyArIGdyYWRpZW50U3R5bGU7XG5cdFx0YmFyLnN0eWxlLmJhY2tncm91bmQgPSAnLW8tJyArIGdyYWRpZW50U3R5bGU7XG5cdFx0YmFyLnN0eWxlLmJhY2tncm91bmQgPSAnLW1zLScgKyBncmFkaWVudFN0eWxlO1xuXHRcdGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gZ3JhZGllbnRTdHlsZTtcblx0XHRiYXIuc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuREVGQVVMVF9UUkFOU0lUSU9OO1xuXHRcdGJhci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXHRcdGJhci5pc0hpZGRlbiA9IGZhbHNlO1xuXHRcdGJhci50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRiYXIuaXNIaWRkZW4gPSAhYmFyLmlzSGlkZGVuO1xuXHRcdFx0c3R5bGVUcmFuc2xhdGUgPSBiYXIuaXNIaWRkZW4gPyAndHJhbnNsYXRlWSgwKScgOiAndHJhbnNsYXRlWSgtMTAwJSknO1xuXHRcdFx0c3R5bGVPcGFjaXR5ID0gYmFyLmlzSGlkZGVuID8gMCA6IDE7XG5cdFx0XHRiYXIuc3R5bGUudHJhbnNmb3JtID0gYmFyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGJhci5zdHlsZS5tc1RyYW5zZm9ybSA9IHN0eWxlVHJhbnNsYXRlO1xuXHRcdFx0YmFyLnN0eWxlLm9wYWNpdHkgPSBzdHlsZU9wYWNpdHk7XG5cdFx0fTtcblxuXHRcdC8vIE1lbnVcblx0XHR2YXIgbWVudSA9IHRoaXMuY3JlYXRlRGVmYXVsdE1lbnUoKTtcblx0XHR0aGlzLm1haW5NZW51ID0gdGhpcy5jcmVhdGVNYWluTWVudSggbWVudSApO1xuXHRcdGJhci5hcHBlbmRDaGlsZCggdGhpcy5tYWluTWVudSApO1xuXG5cdFx0Ly8gTWFza1xuXHRcdHZhciBtYXNrID0gdGhpcy5jcmVhdGVNYXNrKCk7XG5cdFx0dGhpcy5tYXNrID0gbWFzaztcblx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggbWFzayApO1xuXG5cdFx0Ly8gRGlzcG9zZVxuXHRcdGJhci5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmZ1bGxzY3JlZW5FbGVtZW50ICkge1xuXG5cdFx0XHRcdGJhci5yZW1vdmVDaGlsZCggc2NvcGUuZnVsbHNjcmVlbkVsZW1lbnQgKTtcblx0XHRcdFx0c2NvcGUuZnVsbHNjcmVlbkVsZW1lbnQuZGlzcG9zZSgpO1xuXHRcdFx0XHRzY29wZS5mdWxsc2NyZWVuRWxlbWVudCA9IG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5zZXR0aW5nRWxlbWVudCApIHtcblxuXHRcdFx0XHRiYXIucmVtb3ZlQ2hpbGQoIHNjb3BlLnNldHRpbmdFbGVtZW50ICk7XG5cdFx0XHRcdHNjb3BlLnNldHRpbmdFbGVtZW50LmRpc3Bvc2UoKTtcblx0XHRcdFx0c2NvcGUuc2V0dGluZ0VsZW1lbnQgPSBudWxsO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUudmlkZW9FbGVtZW50ICkge1xuXG5cdFx0XHRcdGJhci5yZW1vdmVDaGlsZCggc2NvcGUudmlkZW9FbGVtZW50ICk7XG5cdFx0XHRcdHNjb3BlLnZpZGVvRWxlbWVudC5kaXNwb3NlKCk7XG5cdFx0XHRcdHNjb3BlLnZpZGVvRWxlbWVudCA9IG51bGw7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggYmFyICk7XG5cblx0XHQvLyBNYXNrIGV2ZW50c1xuXHRcdHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblx0XHR0aGlzLm1hc2suYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuXHRcdHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblx0XHR0aGlzLm1hc2suYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHNjb3BlLm1hc2suaGlkZSgpO1xuXHRcdFx0c2NvcGUuc2V0dGluZ0VsZW1lbnQuZGVhY3RpdmF0ZSgpO1xuXG5cdFx0fSwgZmFsc2UgKTtcblxuXHRcdC8vIEV2ZW50IGxpc3RlbmVyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnY29udHJvbC1iYXItdG9nZ2xlJywgYmFyLnRvZ2dsZSApO1xuXG5cdFx0dGhpcy5iYXJFbGVtZW50ID0gYmFyO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBkZWZhdWx0IG1lbnVcblx0ICovXG5cdGNyZWF0ZURlZmF1bHRNZW51OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgc2NvcGUgPSB0aGlzLCBoYW5kbGVyO1xuXG5cdFx0aGFuZGxlciA9IGZ1bmN0aW9uICggbWV0aG9kLCBkYXRhICkge1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgXG5cblx0XHRcdFx0XHR0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBcblx0XHRcdFx0XHRtZXRob2Q6IG1ldGhvZCwgXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSBcblxuXHRcdFx0XHR9ICk7IFxuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0cmV0dXJuIFtcblxuXHRcdFx0eyBcblx0XHRcdFx0dGl0bGU6ICdDb250cm9sJywgXG5cdFx0XHRcdHN1Yk1lbnU6IFsgXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdHRpdGxlOiB0aGlzLlRPVUNIX0VOQUJMRUQgPyAnVG91Y2gnIDogJ01vdXNlJywgXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlQ29udHJvbCcsIENPTlRST0xTLk9SQklUIClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgXG5cdFx0XHRcdFx0XHR0aXRsZTogJ1NlbnNvcicsIFxuXHRcdFx0XHRcdFx0aGFuZGxlcjogaGFuZGxlciggJ2VuYWJsZUNvbnRyb2wnLCBDT05UUk9MUy5ERVZJQ0VPUklFTlRBVElPTiApIFxuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cblx0XHRcdHsgXG5cdFx0XHRcdHRpdGxlOiAnTW9kZScsIFxuXHRcdFx0XHRzdWJNZW51OiBbIFxuXHRcdFx0XHRcdHsgXG5cdFx0XHRcdFx0XHR0aXRsZTogJ05vcm1hbCcsXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyKCAnZGlzYWJsZUVmZmVjdCcgKVxuXHRcdFx0XHRcdH0sIFxuXHRcdFx0XHRcdHsgXG5cdFx0XHRcdFx0XHR0aXRsZTogJ0NhcmRib2FyZCcsXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlRWZmZWN0JywgTU9ERVMuQ0FSREJPQVJEIClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgXG5cdFx0XHRcdFx0XHR0aXRsZTogJ1N0ZXJlb3Njb3BpYycsXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlRWZmZWN0JywgTU9ERVMuU1RFUkVPIClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH1cblxuXHRcdF07XG5cblx0fSxcblxuXHQvKipcblx0ICogQWRkIGJ1dHRvbnMgb24gdG9wIG9mIGNvbnRyb2wgYmFyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIGNvbnRyb2wgYnV0dG9uIG5hbWUgdG8gYmUgY3JlYXRlZFxuXHQgKi9cblx0YWRkQ29udHJvbEJ1dHRvbjogZnVuY3Rpb24gKCBuYW1lICkge1xuXG5cdFx0bGV0IGVsZW1lbnQ7XG5cblx0XHRzd2l0Y2goIG5hbWUgKSB7XG5cblx0XHRcdGNhc2UgJ2Z1bGxzY3JlZW4nOlxuXG5cdFx0XHRcdGVsZW1lbnQgPSB0aGlzLmNyZWF0ZUZ1bGxzY3JlZW5CdXR0b24oKTtcblx0XHRcdFx0dGhpcy5mdWxsc2NyZWVuRWxlbWVudCA9IGVsZW1lbnQ7IFxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdzZXR0aW5nJzpcblxuXHRcdFx0XHRlbGVtZW50ID0gdGhpcy5jcmVhdGVTZXR0aW5nQnV0dG9uKCk7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ0VsZW1lbnQgPSBlbGVtZW50O1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICd2aWRlbyc6XG5cblx0XHRcdFx0ZWxlbWVudCA9IHRoaXMuY3JlYXRlVmlkZW9Db250cm9sKCk7XG5cdFx0XHRcdHRoaXMudmlkZW9FbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHRpZiAoICFlbGVtZW50ICkge1xuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHR0aGlzLmJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHR9LFxuXG5cdGNyZWF0ZU1hc2s6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gMDtcblx0XHRlbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3RyYW5zcGFyZW50Jztcblx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cblx0XHRlbGVtZW50LnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cblx0XHR9O1xuXG5cdFx0ZWxlbWVudC5oaWRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIFNldHRpbmcgYnV0dG9uIHRvIHRvZ2dsZSBtZW51XG5cdCAqL1xuXHRjcmVhdGVTZXR0aW5nQnV0dG9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRsZXQgc2NvcGUgPSB0aGlzLCBpdGVtO1xuXG5cdFx0ZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRzY29wZS5tYWluTWVudS50b2dnbGUoKTtcblxuXHRcdFx0aWYgKCB0aGlzLmFjdGl2YXRlZCApIHtcblx0XG5cdFx0XHRcdHRoaXMuZGVhY3RpdmF0ZSgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuYWN0aXZhdGUoKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSggeyBcblxuXHRcdFx0c3R5bGUgOiB7IFxuXG5cdFx0XHRcdGJhY2tncm91bmRJbWFnZSA6ICd1cmwoXCInICsgRGF0YUltYWdlLlNldHRpbmcgKyAnXCIpJyxcblx0XHRcdFx0d2Via2l0VHJhbnNpdGlvbiA6IHRoaXMuREVGQVVMVF9UUkFOU0lUSU9OLFxuXHRcdFx0XHR0cmFuc2l0aW9uIDogdGhpcy5ERUZBVUxUX1RSQU5TSVRJT05cblxuXHRcdFx0fSxcblxuXHRcdFx0b25UYXA6IG9uVGFwXG5cblx0XHR9ICk7XG5cblx0XHRpdGVtLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgwLDAsMSw5MGRlZyknO1xuXHRcdFx0dGhpcy5hY3RpdmF0ZWQgPSB0cnVlO1xuXHRcdFx0c2NvcGUubWFzay5zaG93KCk7XG5cblx0XHR9O1xuXG5cdFx0aXRlbS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgwLDAsMCwwKSc7XG5cdFx0XHR0aGlzLmFjdGl2YXRlZCA9IGZhbHNlO1xuXHRcdFx0c2NvcGUubWFzay5oaWRlKCk7XG5cblx0XHRcdGlmICggc2NvcGUubWFpbk1lbnUgJiYgc2NvcGUubWFpbk1lbnUudmlzaWJsZSApIHtcblxuXHRcdFx0XHRzY29wZS5tYWluTWVudS5oaWRlKCk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNjb3BlLmFjdGl2ZVN1Yk1lbnUgJiYgc2NvcGUuYWN0aXZlU3ViTWVudS52aXNpYmxlICkge1xuXG5cdFx0XHRcdHNjb3BlLmFjdGl2ZVN1Yk1lbnUuaGlkZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUubWFpbk1lbnUgJiYgc2NvcGUubWFpbk1lbnUuX3dpZHRoICkge1xuXG5cdFx0XHRcdHNjb3BlLm1haW5NZW51LmNoYW5nZVNpemUoIHNjb3BlLm1haW5NZW51Ll93aWR0aCApO1xuXHRcdFx0XHRzY29wZS5tYWluTWVudS51bnNsaWRlQWxsKCk7XG5cblx0XHRcdH1cblx0XHRcdFxuXHRcdH07XG5cblx0XHRpdGVtLmFjdGl2YXRlZCA9IGZhbHNlO1xuXG5cdFx0cmV0dXJuIGl0ZW07XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIEZ1bGxzY3JlZW4gYnV0dG9uXG5cdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH0gLSBUaGUgZG9tIGVsZW1lbnQgaWNvbiBmb3IgZnVsbHNjcmVlblxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuV2lkZ2V0I3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG5cdCAqL1xuXHRjcmVhdGVGdWxsc2NyZWVuQnV0dG9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRsZXQgc2NvcGUgPSB0aGlzLCBpdGVtLCBpc0Z1bGxzY3JlZW4gPSBmYWxzZSwgdGFwU2tpcHBlZCA9IHRydWUsIHN0eWxlc2hlZXRJZDtcblxuXHRcdHN0eWxlc2hlZXRJZCA9ICdwYW5vbGVucy1zdHlsZS1hZGRvbic7XG5cblx0XHQvLyBEb24ndCBjcmVhdGUgYnV0dG9uIGlmIG5vIHN1cHBvcnRcblx0XHRpZiAoICFkb2N1bWVudC5mdWxsc2NyZWVuRW5hYmxlZCAgICAgICAmJiBcblx0XHRcdCFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCAmJlxuXHRcdFx0IWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbmFibGVkICAgICYmXG5cdFx0XHQhZG9jdW1lbnQubXNGdWxsc2NyZWVuRW5hYmxlZCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHRhcFNraXBwZWQgPSBmYWxzZTtcblxuXHRcdFx0aWYgKCAhaXNGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRzY29wZS5jb250YWluZXIucmVxdWVzdEZ1bGxzY3JlZW4gJiYgc2NvcGUuY29udGFpbmVyLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdHNjb3BlLmNvbnRhaW5lci5tc1JlcXVlc3RGdWxsc2NyZWVuICYmIHNjb3BlLmNvbnRhaW5lci5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdHNjb3BlLmNvbnRhaW5lci5tb3pSZXF1ZXN0RnVsbFNjcmVlbiAmJiBzY29wZS5jb250YWluZXIubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcblx0XHRcdFx0c2NvcGUuY29udGFpbmVyLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuICYmIHNjb3BlLmNvbnRhaW5lci53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbihFbGVtZW50LkFMTE9XX0tFWUJPQVJEX0lOUFVUKTtcblx0XHRcdFx0aXNGdWxsc2NyZWVuID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuICYmIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4gJiYgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHRkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuICYmIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcblx0XHRcdFx0ZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4gJiYgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0aXNGdWxsc2NyZWVuID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gKCBpc0Z1bGxzY3JlZW4gKSBcblx0XHRcdFx0PyAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuTGVhdmUgKyAnXCIpJyBcblx0XHRcdFx0OiAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuRW50ZXIgKyAnXCIpJztcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uRnVsbFNjcmVlbkNoYW5nZSAoZSkge1xuXG5cdFx0XHRpZiAoIHRhcFNraXBwZWQgKSB7XG5cblx0XHRcdFx0aXNGdWxsc2NyZWVuID0gIWlzRnVsbHNjcmVlbjsgXG5cblx0XHRcdFx0aXRlbS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAoIGlzRnVsbHNjcmVlbiApIFxuXHRcdFx0XHQ/ICd1cmwoXCInICsgRGF0YUltYWdlLkZ1bGxzY3JlZW5MZWF2ZSArICdcIiknIFxuXHRcdFx0XHQ6ICd1cmwoXCInICsgRGF0YUltYWdlLkZ1bGxzY3JlZW5FbnRlciArICdcIiknO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ29uV2luZG93UmVzaXplJyBmdW5jdGlvbiBjYWxsIG9uIFBBTk9MRU5TLlZpZXdlclxuXHRcdFx0ICovXG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ29uV2luZG93UmVzaXplJywgZGF0YTogZmFsc2UgfSApO1xuXG5cdFx0XHR0YXBTa2lwcGVkID0gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSApO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSApO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3pmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSApO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG5cblx0XHRpdGVtID0gdGhpcy5jcmVhdGVDdXN0b21JdGVtKCB7IFxuXG5cdFx0XHRzdHlsZSA6IHsgXG5cblx0XHRcdFx0YmFja2dyb3VuZEltYWdlIDogJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkVudGVyICsgJ1wiKScgXG5cblx0XHRcdH0sXG5cblx0XHRcdG9uVGFwIDogb25UYXBcblxuXHRcdH0gKTtcblxuXHRcdC8vIEFkZCBmdWxsc2NyZWVuIHN0bHllIGlmIG5vdCBleGlzdHNcblx0XHRpZiAoICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBzdHlsZXNoZWV0SWQgKSApIHtcblx0XHRcdGNvbnN0IHNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3N0eWxlJyApO1xuXHRcdFx0c2hlZXQuaWQgPSBzdHlsZXNoZWV0SWQ7XG5cdFx0XHRzaGVldC5pbm5lckhUTUwgPSAnOi13ZWJraXQtZnVsbC1zY3JlZW4geyB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudCB9Jztcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHNoZWV0ICk7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSB2aWRlbyBjb250cm9sIGNvbnRhaW5lclxuXHQgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb24gZm9yIHZpZGVvIGNvbnRyb2xcblx0ICovXG5cdGNyZWF0ZVZpZGVvQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuXHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRpdGVtLnNob3cgPSBmdW5jdGlvbiAoKSB7IFxuXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuXHRcdH07XG5cblx0XHRpdGVtLmhpZGUgPSBmdW5jdGlvbiAoKSB7IFxuXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRpdGVtLmNvbnRyb2xCdXR0b24ucGF1c2VkID0gdHJ1ZTtcblx0XHRcdGl0ZW0uY29udHJvbEJ1dHRvbi51cGRhdGUoKTtcblxuXHRcdH07XG5cblx0XHRpdGVtLmNvbnRyb2xCdXR0b24gPSB0aGlzLmNyZWF0ZVZpZGVvQ29udHJvbEJ1dHRvbigpO1xuXHRcdGl0ZW0uc2Vla0JhciA9IHRoaXMuY3JlYXRlVmlkZW9Db250cm9sU2Vla2JhcigpO1xuXHRcdFxuXHRcdGl0ZW0uYXBwZW5kQ2hpbGQoIGl0ZW0uY29udHJvbEJ1dHRvbiApO1xuXHRcdGl0ZW0uYXBwZW5kQ2hpbGQoIGl0ZW0uc2Vla0JhciApO1xuXG5cdFx0aXRlbS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpdGVtLnJlbW92ZUNoaWxkKCBpdGVtLmNvbnRyb2xCdXR0b24gKTtcblx0XHRcdGl0ZW0ucmVtb3ZlQ2hpbGQoIGl0ZW0uc2Vla0JhciApO1xuXG5cdFx0XHRpdGVtLmNvbnRyb2xCdXR0b24uZGlzcG9zZSgpO1xuXHRcdFx0aXRlbS5jb250cm9sQnV0dG9uID0gbnVsbDtcblxuXHRcdFx0aXRlbS5zZWVrQmFyLmRpc3Bvc2UoKTtcblx0XHRcdGl0ZW0uc2Vla0JhciA9IG51bGw7XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tY29udHJvbC1zaG93JywgaXRlbS5zaG93ICk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tY29udHJvbC1oaWRlJywgaXRlbS5oaWRlICk7XG5cblx0XHRyZXR1cm4gaXRlbTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgdmlkZW8gY29udHJvbCBidXR0b25cblx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uIGZvciB2aWRlbyBjb250cm9sXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5XaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0ICovXG5cdGNyZWF0ZVZpZGVvQ29udHJvbEJ1dHRvbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICd0b2dnbGVWaWRlb1BsYXknIGZ1bmN0aW9uIGNhbGwgb24gUEFOT0xFTlMuVmlld2VyXG5cdFx0XHQgKi9cblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndG9nZ2xlVmlkZW9QbGF5JywgZGF0YTogIXRoaXMucGF1c2VkIH0gKTtcblxuXHRcdFx0dGhpcy5wYXVzZWQgPSAhdGhpcy5wYXVzZWQ7XG5cblx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cblx0XHR9O1xuXG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSggeyBcblxuXHRcdFx0c3R5bGUgOiB7IFxuXG5cdFx0XHRcdGZsb2F0IDogJ2xlZnQnLFxuXHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2UgOiAndXJsKFwiJyArIERhdGFJbWFnZS5WaWRlb1BsYXkgKyAnXCIpJ1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRvblRhcCA6IG9uVGFwXG5cblx0XHR9ICk7XG5cblx0XHRpdGVtLnBhdXNlZCA9IHRydWU7XG5cblx0XHRpdGVtLnVwZGF0ZSA9IGZ1bmN0aW9uICggcGF1c2VkICkge1xuXG5cdFx0XHR0aGlzLnBhdXNlZCA9IHBhdXNlZCAhPT0gdW5kZWZpbmVkID8gcGF1c2VkIDogdGhpcy5wYXVzZWQ7XG5cblx0XHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyAoIHRoaXMucGF1c2VkIFxuXHRcdFx0XHQ/IERhdGFJbWFnZS5WaWRlb1BsYXkgXG5cdFx0XHRcdDogRGF0YUltYWdlLlZpZGVvUGF1c2UgKSArICdcIiknO1xuXG5cdFx0fTtcblxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSB2aWRlbyBzZWVrYmFyXG5cdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH0gLSBUaGUgZG9tIGVsZW1lbnQgaWNvbiBmb3IgdmlkZW8gc2Vla2JhclxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuV2lkZ2V0I3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG5cdCAqL1xuXHRjcmVhdGVWaWRlb0NvbnRyb2xTZWVrYmFyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRsZXQgc2NvcGUgPSB0aGlzLCBpdGVtLCBwcm9ncmVzc0VsZW1lbnQsIHByb2dyZXNzRWxlbWVudENvbnRyb2wsXG5cdFx0XHRpc0RyYWdnaW5nID0gZmFsc2UsIG1vdXNlWCwgcGVyY2VudGFnZU5vdywgcGVyY2VudGFnZU5leHQ7XG5cblx0XHRwcm9ncmVzc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdHByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9ICcwJSc7XG5cdFx0cHJvZ3Jlc3NFbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblx0XHRwcm9ncmVzc0VsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG5cdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS5mbG9hdCA9ICdyaWdodCc7XG5cdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS53aWR0aCA9ICcxNHB4Jztcblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmhlaWdodCA9ICcxNHB4Jztcblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoN3B4LCAtNXB4KSc7XG5cdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGRkJztcblxuXHRcdHByb2dyZXNzRWxlbWVudENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdHByb2dyZXNzRWxlbWVudENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvbk1vdXNlRG93biwgIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cblx0XHRmdW5jdGlvbiBvbk1vdXNlRG93biAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFxuXHRcdFx0aXNEcmFnZ2luZyA9IHRydWU7XG5cdFx0XHRcblx0XHRcdG1vdXNlWCA9IGV2ZW50LmNsaWVudFggfHwgKCBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYICk7XG5cblx0XHRcdHBlcmNlbnRhZ2VOb3cgPSBwYXJzZUludCggcHJvZ3Jlc3NFbGVtZW50LnN0eWxlLndpZHRoICkgLyAxMDA7XG5cblx0XHRcdGFkZENvbnRyb2xMaXN0ZW5lcnMoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblZpZGVvQ29udHJvbERyYWcgKCBldmVudCApIHtcblxuXHRcdFx0aWYoIGlzRHJhZ2dpbmcgKXtcblxuXHRcdFx0XHRjb25zdCBjbGllbnRYID0gZXZlbnQuY2xpZW50WCB8fCAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggKTtcblx0XHRcdFx0XG5cdFx0XHRcdHBlcmNlbnRhZ2VOZXh0ID0gKCBjbGllbnRYIC0gbW91c2VYICkgLyBpdGVtLmNsaWVudFdpZHRoO1xuXG5cdFx0XHRcdHBlcmNlbnRhZ2VOZXh0ID0gcGVyY2VudGFnZU5vdyArIHBlcmNlbnRhZ2VOZXh0O1xuXG5cdFx0XHRcdHBlcmNlbnRhZ2VOZXh0ID0gcGVyY2VudGFnZU5leHQgPiAxID8gMSA6ICggKCBwZXJjZW50YWdlTmV4dCA8IDAgKSA/IDAgOiBwZXJjZW50YWdlTmV4dCApO1xuXG5cdFx0XHRcdGl0ZW0uc2V0UHJvZ3Jlc3MgKCBwZXJjZW50YWdlTmV4dCApO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3NldFZpZGVvQ3VycmVudFRpbWUnIGZ1bmN0aW9uIGNhbGwgb24gUEFOT0xFTlMuVmlld2VyXG5cdFx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhIC0gUGVyY2VudGFnZSBvZiBjdXJyZW50IHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcblx0XHRcdFx0ICovXG5cdFx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnc2V0VmlkZW9DdXJyZW50VGltZScsIGRhdGE6IHBlcmNlbnRhZ2VOZXh0IH0gKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25WaWRlb0NvbnRyb2xTdG9wICggZXZlbnQgKSB7XG5cblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpc0RyYWdnaW5nID0gZmFsc2U7XG5cblx0XHRcdHJlbW92ZUNvbnRyb2xMaXN0ZW5lcnMoKTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZENvbnRyb2xMaXN0ZW5lcnMgKCkge1xuXG5cdFx0XHRzY29wZS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uVmlkZW9Db250cm9sRHJhZywgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHRcdHNjb3BlLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uVmlkZW9Db250cm9sU3RvcCwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHRcdHNjb3BlLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25WaWRlb0NvbnRyb2xEcmFnLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdFx0c2NvcGUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVmlkZW9Db250cm9sU3RvcCwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlQ29udHJvbExpc3RlbmVycyAoKSB7XG5cblx0XHRcdHNjb3BlLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25WaWRlb0NvbnRyb2xEcmFnLCBmYWxzZSApO1xuXHRcdFx0c2NvcGUuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25WaWRlb0NvbnRyb2xTdG9wLCBmYWxzZSApO1xuXHRcdFx0c2NvcGUuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblZpZGVvQ29udHJvbERyYWcsIGZhbHNlICk7XG5cdFx0XHRzY29wZS5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgb25WaWRlb0NvbnRyb2xTdG9wLCBmYWxzZSApO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpZiAoIGV2ZW50LnRhcmdldCA9PT0gcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCApIHsgcmV0dXJuOyB9XG5cblx0XHRcdGNvbnN0IHBlcmNlbnRhZ2UgPSAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA+IDAgKVxuXHRcdFx0XHQ/ICggZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCApIC8gdGhpcy5jbGllbnRXaWR0aFxuXHRcdFx0XHQ6IGV2ZW50Lm9mZnNldFggLyB0aGlzLmNsaWVudFdpZHRoO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICdzZXRWaWRlb0N1cnJlbnRUaW1lJyBmdW5jdGlvbiBjYWxsIG9uIFBBTk9MRU5TLlZpZXdlclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEgLSBQZXJjZW50YWdlIG9mIGN1cnJlbnQgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuXHRcdFx0ICovXG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3NldFZpZGVvQ3VycmVudFRpbWUnLCBkYXRhOiBwZXJjZW50YWdlIH0gKTtcblxuXHRcdFx0aXRlbS5zZXRQcm9ncmVzcyggZXZlbnQub2Zmc2V0WCAvIHRoaXMuY2xpZW50V2lkdGggKTtcblxuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBvbkRpc3Bvc2UgKCkge1xuXG5cdFx0XHRyZW1vdmVDb250cm9sTGlzdGVuZXJzKCk7XG5cdFx0XHRwcm9ncmVzc0VsZW1lbnQgPSBudWxsO1xuXHRcdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbCA9IG51bGw7XG5cblx0XHR9XG5cblx0XHRwcm9ncmVzc0VsZW1lbnQuYXBwZW5kQ2hpbGQoIHByb2dyZXNzRWxlbWVudENvbnRyb2wgKTtcblxuXHRcdGl0ZW0gPSB0aGlzLmNyZWF0ZUN1c3RvbUl0ZW0oIHtcblxuXHRcdFx0c3R5bGUgOiB7IFxuXG5cdFx0XHRcdGZsb2F0IDogJ2xlZnQnLFxuXHRcdFx0XHR3aWR0aCA6ICczMCUnLFxuXHRcdFx0XHRoZWlnaHQgOiAnNHB4Jyxcblx0XHRcdFx0bWFyZ2luVG9wIDogJzIwcHgnLFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgOiAncmdiYSgxODgsMTg4LDE4OCwwLjgpJ1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRvblRhcCA6IG9uVGFwLFxuXHRcdFx0b25EaXNwb3NlOiBvbkRpc3Bvc2VcblxuXHRcdH0gKTtcblxuXHRcdGl0ZW0uYXBwZW5kQ2hpbGQoIHByb2dyZXNzRWxlbWVudCApO1xuXG5cdFx0aXRlbS5zZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKCBwZXJjZW50YWdlICkge1xuXG5cdFx0XHRwcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggPSBwZXJjZW50YWdlICogMTAwICsgJyUnO1xuXG5cdFx0fTtcdFx0XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd2aWRlby11cGRhdGUnLCBmdW5jdGlvbiAoIGV2ZW50ICkgeyBcblxuXHRcdFx0aXRlbS5zZXRQcm9ncmVzcyggZXZlbnQucGVyY2VudGFnZSApOyBcblxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBtZW51IGl0ZW1cblx0ICogQHBhcmFtICB7c3RyaW5nfSB0aXRsZSAtIFRpdGxlIHRvIGRpc3BsYXlcblx0ICogQHJldHVybiB7SFRNTERvbUVsZW1lbnR9IC0gQW4gYW5jaG9yIHRhZyBlbGVtZW50XG5cdCAqL1xuXHRjcmVhdGVNZW51SXRlbTogZnVuY3Rpb24gKCB0aXRsZSApIHtcblxuXHRcdGNvbnN0IHNjb3BlID0gdGhpczsgXG5cdFx0Y29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdhJyApO1xuXHRcdGl0ZW0udGV4dENvbnRlbnQgPSB0aXRsZTtcblx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGl0ZW0uc3R5bGUucGFkZGluZyA9ICcxMHB4Jztcblx0XHRpdGVtLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnO1xuXHRcdGl0ZW0uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcblx0XHRpdGVtLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTjtcblxuXHRcdGl0ZW0uc2xpZGUgPSBmdW5jdGlvbiAoIHJpZ2h0ICkge1xuXG5cdFx0XHR0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAoIHJpZ2h0ID8gJycgOiAnLScgKSArICcxMDAlKSc7XG5cblx0XHR9O1xuXG5cdFx0aXRlbS51bnNsaWRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDApJztcblxuXHRcdH07XG5cblx0XHRpdGVtLnNldEljb24gPSBmdW5jdGlvbiAoIHVybCApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmljb24gKSB7XG5cblx0XHRcdFx0dGhpcy5pY29uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHVybCArICcpJztcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdGl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUgPSBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuc2VsZWN0aW9uICkge1xuXG5cdFx0XHRcdHRoaXMuc2VsZWN0aW9uLnRleHRDb250ZW50ID0gdGl0bGU7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHRpdGVtLmFkZFNlbGVjdGlvbiA9IGZ1bmN0aW9uICggbmFtZSApIHtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG5cdFx0XHRzZWxlY3Rpb24uc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XG5cdFx0XHRzZWxlY3Rpb24uc3R5bGUuZm9udFdlaWdodCA9ICczMDAnO1xuXHRcdFx0c2VsZWN0aW9uLnN0eWxlLmZsb2F0ID0gJ3JpZ2h0JztcblxuXHRcdFx0dGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cdFx0XHR0aGlzLnNldFNlbGVjdGlvblRpdGxlKCBuYW1lICk7XG5cdFx0XHR0aGlzLmFwcGVuZENoaWxkKCBzZWxlY3Rpb24gKTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdFx0aXRlbS5hZGRJY29uID0gZnVuY3Rpb24gKCB1cmwgPSBEYXRhSW1hZ2UuQ2hldnJvblJpZ2h0LCBsZWZ0ID0gZmFsc2UsIGZsaXAgPSBmYWxzZSApIHtcblx0XHRcdFxuXHRcdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuXHRcdFx0ZWxlbWVudC5zdHlsZS5mbG9hdCA9IGxlZnQgPyAnbGVmdCcgOiAncmlnaHQnO1xuXHRcdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxN3B4Jztcblx0XHRcdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzE3cHgnO1xuXHRcdFx0ZWxlbWVudC5zdHlsZVsgJ21hcmdpbicgKyAoIGxlZnQgPyAnUmlnaHQnIDogJ0xlZnQnICkgXSA9ICcxMnB4Jztcblx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnY292ZXInO1xuXG5cdFx0XHRpZiAoIGZsaXAgKSB7XG5cblx0XHRcdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWigxODBkZWcpJztcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmljb24gPSBlbGVtZW50O1xuXHRcdFx0dGhpcy5zZXRJY29uKCB1cmwgKTtcblx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdFx0aXRlbS5hZGRTdWJNZW51ID0gZnVuY3Rpb24gKCB0aXRsZSwgaXRlbXMgKSB7XG5cblx0XHRcdHRoaXMuc3ViTWVudSA9IHNjb3BlLmNyZWF0ZVN1Yk1lbnUoIHRpdGxlLCBpdGVtcyApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XG5cdFx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZTBlMGUwJztcblxuXHRcdH0sIGZhbHNlICk7XG5cblx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XG5cdFx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmFmYWZhJztcblxuXHRcdH0sIGZhbHNlICk7XG5cblx0XHRyZXR1cm4gaXRlbTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgbWVudSBpdGVtIGhlYWRlclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlIC0gVGl0bGUgdG8gZGlzcGxheVxuXHQgKiBAcmV0dXJuIHtIVE1MRG9tRWxlbWVudH0gLSBBbiBhbmNob3IgdGFnIGVsZW1lbnRcblx0ICovXG5cdGNyZWF0ZU1lbnVJdGVtSGVhZGVyOiBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG5cdFx0Y29uc3QgaGVhZGVyID0gdGhpcy5jcmVhdGVNZW51SXRlbSggdGl0bGUgKTtcblxuXHRcdGhlYWRlci5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMXB4IHNvbGlkICMzMzMnO1xuXHRcdGhlYWRlci5zdHlsZS5wYWRkaW5nQm90dG9tID0gJzE1cHgnO1xuXG5cdFx0cmV0dXJuIGhlYWRlcjtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgbWFpbiBtZW51XG5cdCAqIEBwYXJhbSAge2FycmF5fSBtZW51cyAtIE1lbnUgYXJyYXkgbGlzdFxuXHQgKiBAcmV0dXJuIHtIVE1MRG9tRWxlbWVudH0gLSBBIHNwYW4gZWxlbWVudFxuXHQgKi9cblx0Y3JlYXRlTWFpbk1lbnU6IGZ1bmN0aW9uICggbWVudXMgKSB7XG5cdFx0XG5cdFx0bGV0IHNjb3BlID0gdGhpcywgbWVudSA9IHRoaXMuY3JlYXRlTWVudSgpO1xuXG5cdFx0bWVudS5fd2lkdGggPSAyMDA7XG5cdFx0bWVudS5jaGFuZ2VTaXplKCBtZW51Ll93aWR0aCApO1xuXG5cdFx0ZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRsZXQgbWFpbk1lbnUgPSBzY29wZS5tYWluTWVudSwgc3ViTWVudSA9IHRoaXMuc3ViTWVudTtcblxuXHRcdFx0ZnVuY3Rpb24gb25OZXh0VGljayAoKSB7XG5cblx0XHRcdFx0bWFpbk1lbnUuY2hhbmdlU2l6ZSggc3ViTWVudS5jbGllbnRXaWR0aCApO1xuXHRcdFx0XHRzdWJNZW51LnNob3coKTtcblx0XHRcdFx0c3ViTWVudS51bnNsaWRlQWxsKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0bWFpbk1lbnUuaGlkZSgpO1xuXHRcdFx0bWFpbk1lbnUuc2xpZGVBbGwoKTtcblx0XHRcdG1haW5NZW51LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIHN1Yk1lbnUgKTtcblxuXHRcdFx0c2NvcGUuYWN0aXZlTWFpbkl0ZW0gPSB0aGlzO1xuXHRcdFx0c2NvcGUuYWN0aXZlU3ViTWVudSA9IHN1Yk1lbnU7XG5cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIG9uTmV4dFRpY2sgKTtcblxuXHRcdH07XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBtZW51cy5sZW5ndGg7IGkrKyApIHtcblxuXHRcdFx0dmFyIGl0ZW0gPSBtZW51LmFkZEl0ZW0oIG1lbnVzWyBpIF0udGl0bGUgKTtcblxuXHRcdFx0aXRlbS5zdHlsZS5wYWRkaW5nTGVmdCA9ICcyMHB4JztcblxuXHRcdFx0aXRlbS5hZGRJY29uKClcblx0XHRcdFx0LmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb25UYXAsIGZhbHNlICk7XG5cblx0XHRcdGlmICggbWVudXNbIGkgXS5zdWJNZW51ICYmIG1lbnVzWyBpIF0uc3ViTWVudS5sZW5ndGggPiAwICkge1xuXG5cdFx0XHRcdHZhciB0aXRsZSA9IG1lbnVzWyBpIF0uc3ViTWVudVsgMCBdLnRpdGxlO1xuXG5cdFx0XHRcdGl0ZW0uYWRkU2VsZWN0aW9uKCB0aXRsZSApXG5cdFx0XHRcdFx0LmFkZFN1Yk1lbnUoIG1lbnVzWyBpIF0udGl0bGUsIG1lbnVzWyBpIF0uc3ViTWVudSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbWVudTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgc3ViIG1lbnVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlIC0gU3ViIG1lbnUgdGl0bGVcblx0ICogQHBhcmFtIHthcnJheX0gaXRlbXMgLSBJdGVtIGFycmF5IGxpc3Rcblx0ICogQHJldHVybiB7SFRNTERvbUVsZW1lbnR9IC0gQSBzcGFuIGVsZW1lbnRcblx0ICovXG5cdGNyZWF0ZVN1Yk1lbnU6IGZ1bmN0aW9uICggdGl0bGUsIGl0ZW1zICkge1xuXG5cdFx0bGV0IHNjb3BlID0gdGhpcywgbWVudSwgc3ViTWVudSA9IHRoaXMuY3JlYXRlTWVudSgpO1xuXG5cdFx0c3ViTWVudS5pdGVtcyA9IGl0ZW1zO1xuXHRcdHN1Yk1lbnUuYWN0aXZlSXRlbTtcblxuXHRcdGZ1bmN0aW9uIG9uVGFwICggZXZlbnQgKSB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0bWVudSA9IHNjb3BlLm1haW5NZW51O1xuXHRcdFx0bWVudS5jaGFuZ2VTaXplKCBtZW51Ll93aWR0aCApO1xuXHRcdFx0bWVudS51bnNsaWRlQWxsKCk7XG5cdFx0XHRtZW51LnNob3coKTtcblx0XHRcdHN1Yk1lbnUuc2xpZGVBbGwoIHRydWUgKTtcblx0XHRcdHN1Yk1lbnUuaGlkZSgpO1xuXG5cdFx0XHRpZiAoIHRoaXMudHlwZSAhPT0gJ2hlYWRlcicgKSB7XG5cblx0XHRcdFx0c3ViTWVudS5zZXRBY3RpdmVJdGVtKCB0aGlzICk7XG5cdFx0XHRcdHNjb3BlLmFjdGl2ZU1haW5JdGVtLnNldFNlbGVjdGlvblRpdGxlKCB0aGlzLnRleHRDb250ZW50ICk7XG5cblx0XHRcdFx0dGhpcy5oYW5kbGVyICYmIHRoaXMuaGFuZGxlcigpO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRzdWJNZW51LmFkZEhlYWRlciggdGl0bGUgKS5hZGRJY29uKCB1bmRlZmluZWQsIHRydWUsIHRydWUgKS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9uVGFwLCBmYWxzZSApO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKysgKSB7XG5cblx0XHRcdGNvbnN0IGl0ZW0gPSBzdWJNZW51LmFkZEl0ZW0oIGl0ZW1zWyBpIF0udGl0bGUgKTtcblxuXHRcdFx0aXRlbS5zdHlsZS5mb250V2VpZ2h0ID0gMzAwO1xuXHRcdFx0aXRlbS5oYW5kbGVyID0gaXRlbXNbIGkgXS5oYW5kbGVyO1xuXHRcdFx0aXRlbS5hZGRJY29uKCAnICcsIHRydWUgKTtcblx0XHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBvblRhcCwgZmFsc2UgKTtcblxuXHRcdFx0aWYgKCAhc3ViTWVudS5hY3RpdmVJdGVtICkge1xuXG5cdFx0XHRcdHN1Yk1lbnUuc2V0QWN0aXZlSXRlbSggaXRlbSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRzdWJNZW51LnNsaWRlQWxsKCB0cnVlICk7XG5cblx0XHRyZXR1cm4gc3ViTWVudTtcblx0XHRcblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIGdlbmVyYWwgbWVudVxuXHQgKiBAcmV0dXJuIHtIVE1MRG9tRWxlbWVudH0gLSBBIHNwYW4gZWxlbWVudFxuXHQgKi9cblx0Y3JlYXRlTWVudTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXHRcdGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcblx0XHRjb25zdCBzdHlsZSA9IG1lbnUuc3R5bGU7XG5cblx0XHRzdHlsZS5wYWRkaW5nID0gJzVweCAwJztcblx0XHRzdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cdFx0c3R5bGUuYm90dG9tID0gJzEwMCUnO1xuXHRcdHN0eWxlLnJpZ2h0ID0gJzE0cHgnO1xuXHRcdHN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmFmYWZhJztcblx0XHRzdHlsZS5mb250RmFtaWx5ID0gJ0hlbHZldGljYSBOZXVlJztcblx0XHRzdHlsZS5mb250U2l6ZSA9ICcxNHB4Jztcblx0XHRzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cdFx0c3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0c3R5bGUuYm94U2hhZG93ID0gJzAgMCAxMnB0IHJnYmEoMCwwLDAsMC4yNSknO1xuXHRcdHN0eWxlLmJvcmRlclJhZGl1cyA9ICcycHgnO1xuXHRcdHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0c3R5bGUud2lsbENoYW5nZSA9ICd3aWR0aCwgaGVpZ2h0LCBvcGFjaXR5Jztcblx0XHRzdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuXHRcdHN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTjtcblxuXHRcdG1lbnUudmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0bWVudS5jaGFuZ2VTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG5cdFx0XHRpZiAoIHdpZHRoICkge1xuXG5cdFx0XHRcdHRoaXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBoZWlnaHQgKSB7XG5cblx0XHRcdFx0dGhpcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0bWVudS5zaG93ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR0aGlzLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdFx0dGhpcy5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXHRcdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuXHRcdH07XG5cblx0XHRtZW51LmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0XHR0aGlzLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblx0XHRcdHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0fTtcblxuXHRcdG1lbnUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAoIHRoaXMudmlzaWJsZSApIHtcblxuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLnNob3coKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdG1lbnUuc2xpZGVBbGwgPSBmdW5jdGlvbiAoIHJpZ2h0ICkge1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBtZW51LmNoaWxkcmVuLmxlbmd0aDsgaSsrICl7XG5cblx0XHRcdFx0aWYgKCBtZW51LmNoaWxkcmVuWyBpIF0uc2xpZGUgKSB7XG5cblx0XHRcdFx0XHRtZW51LmNoaWxkcmVuWyBpIF0uc2xpZGUoIHJpZ2h0ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0bWVudS51bnNsaWRlQWxsID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBtZW51LmNoaWxkcmVuLmxlbmd0aDsgaSsrICl7XG5cblx0XHRcdFx0aWYgKCBtZW51LmNoaWxkcmVuWyBpIF0udW5zbGlkZSApIHtcblxuXHRcdFx0XHRcdG1lbnUuY2hpbGRyZW5bIGkgXS51bnNsaWRlKCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0bWVudS5hZGRIZWFkZXIgPSBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG5cdFx0XHRjb25zdCBoZWFkZXIgPSBzY29wZS5jcmVhdGVNZW51SXRlbUhlYWRlciggdGl0bGUgKTtcblx0XHRcdGhlYWRlci50eXBlID0gJ2hlYWRlcic7XG5cblx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoIGhlYWRlciApO1xuXG5cdFx0XHRyZXR1cm4gaGVhZGVyO1xuXG5cdFx0fTtcblxuXHRcdG1lbnUuYWRkSXRlbSA9IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cblx0XHRcdGNvbnN0IGl0ZW0gPSBzY29wZS5jcmVhdGVNZW51SXRlbSggdGl0bGUgKTtcblx0XHRcdGl0ZW0udHlwZSA9ICdpdGVtJztcblxuXHRcdFx0dGhpcy5hcHBlbmRDaGlsZCggaXRlbSApO1xuXG5cdFx0XHRyZXR1cm4gaXRlbTtcblxuXHRcdH07XG5cblx0XHRtZW51LnNldEFjdGl2ZUl0ZW0gPSBmdW5jdGlvbiAoIGl0ZW0gKSB7XG5cblx0XHRcdGlmICggdGhpcy5hY3RpdmVJdGVtICkge1xuXG5cdFx0XHRcdHRoaXMuYWN0aXZlSXRlbS5zZXRJY29uKCAnICcgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpdGVtLnNldEljb24oIERhdGFJbWFnZS5DaGVjayApO1xuXG5cdFx0XHR0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuXG5cdFx0fTtcblxuXHRcdG1lbnUuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMuUFJFVkVOVF9FVkVOVF9IQU5ETEVSLCB0cnVlICk7XG5cdFx0bWVudS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMuUFJFVkVOVF9FVkVOVF9IQU5ETEVSLCB0cnVlICk7XG5cdFx0bWVudS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblxuXHRcdHJldHVybiBtZW51O1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBjdXN0b20gaXRlbSBlbGVtZW50XG5cdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH0gLSBUaGUgZG9tIGVsZW1lbnQgaWNvblxuXHQgKi9cblx0Y3JlYXRlQ3VzdG9tSXRlbTogZnVuY3Rpb24gKCBvcHRpb25zID0ge30gKSB7XG5cblx0XHRjb25zdCBzY29wZSA9IHRoaXM7XG5cdFx0Y29uc3QgaXRlbSA9IG9wdGlvbnMuZWxlbWVudCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcblxuXHRcdGl0ZW0uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdGl0ZW0uc3R5bGUuZmxvYXQgPSAncmlnaHQnO1xuXHRcdGl0ZW0uc3R5bGUud2lkdGggPSAnNDRweCc7XG5cdFx0aXRlbS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG5cdFx0aXRlbS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICc2MCUnO1xuXHRcdGl0ZW0uc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuXHRcdGl0ZW0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG5cdFx0aXRlbS5zdHlsZS53ZWJraXRVc2VyU2VsZWN0ID0gXG5cdFx0aXRlbS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gXG5cdFx0aXRlbS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuXHRcdGl0ZW0uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXHRcdGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcblxuXHRcdC8vIFdoaXRlIGdsb3cgb24gaWNvblxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpdGVtLnN0eWxlLmZpbHRlciA9IFxuXHRcdFx0aXRlbS5zdHlsZS53ZWJraXRGaWx0ZXIgPSAnZHJvcC1zaGFkb3coMCAwIDVweCByZ2JhKDI1NSwyNTUsMjU1LDEpKSc7XG5cdFx0fSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aXRlbS5zdHlsZS5maWx0ZXIgPSBcblx0XHRcdGl0ZW0uc3R5bGUud2Via2l0RmlsdGVyID0gJyc7XG5cdFx0fSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG5cdFx0dGhpcy5tZXJnZVN0eWxlT3B0aW9ucyggaXRlbSwgb3B0aW9ucy5zdHlsZSApO1xuXG5cdFx0aWYgKCBvcHRpb25zLm9uVGFwICkge1xuXG5cdFx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb3B0aW9ucy5vblRhcCwgZmFsc2UgKTtcblxuXHRcdH1cblxuXHRcdGl0ZW0uZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9wdGlvbnMub25UYXAsIGZhbHNlICk7XG5cblx0XHRcdG9wdGlvbnMub25EaXNwb3NlICYmIG9wdGlvbnMub25EaXNwb3NlKCk7XG5cblx0XHR9O1xuXHRcdFxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIE1lcmdlIGl0ZW0gY3NzIHN0eWxlXG5cdCAqIEBwYXJhbSAge0hUTUxET01FbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gYmUgbWVyZ2VkIHdpdGggc3R5bGVcblx0ICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIHN0eWxlIG9wdGlvbnNcblx0ICogQHJldHVybiB7SFRNTERPTUVsZW1lbnR9IC0gVGhlIHNhbWUgZWxlbWVudCB3aXRoIG1lcmdlZCBzdHlsZXNcblx0ICovXG5cdG1lcmdlU3R5bGVPcHRpb25zOiBmdW5jdGlvbiAoIGVsZW1lbnQsIG9wdGlvbnMgPSB7fSApIHtcblxuXHRcdGZvciAoIGxldCBwcm9wZXJ0eSBpbiBvcHRpb25zICl7XG5cblx0XHRcdGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSggcHJvcGVydHkgKSApIHtcblxuXHRcdFx0XHRlbGVtZW50LnN0eWxlWyBwcm9wZXJ0eSBdID0gb3B0aW9uc1sgcHJvcGVydHkgXTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cblx0fSxcblxuXHQvKipcblx0ICogRGlzcG9zZSB3aWRnZXRzIGJ5IGRldGFjaGluZyBkb20gZWxlbWVudHMgZnJvbSBjb250YWluZXJcblx0ICovXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdGhpcy5iYXJFbGVtZW50ICkge1xuXHRcdFx0dGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQoIHRoaXMuYmFyRWxlbWVudCApO1xuXHRcdFx0dGhpcy5iYXJFbGVtZW50LmRpc3Bvc2UoKTtcblx0XHRcdHRoaXMuYmFyRWxlbWVudCA9IG51bGw7XG5cblx0XHR9XG5cblx0fVxuXHRcbn0gKTtcblxuZXhwb3J0IHsgV2lkZ2V0IH07IiwiaW1wb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0ICd0aHJlZSc7XG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xuXG4vKipcbiAqIFNrZWxldG9uIHBhbm9yYW1hIGRlcml2ZWQgZnJvbSBUSFJFRS5NZXNoXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VEhSRUUuR2VvbWV0cnl9IGdlb21ldHJ5IC0gVGhlIGdlb21ldHJ5IGZvciB0aGlzIHBhbm9yYW1hXG4gKiBAcGFyYW0ge1RIUkVFLk1hdGVyaWFsfSBtYXRlcmlhbCAtIFRoZSBtYXRlcmlhbCBmb3IgdGhpcyBwYW5vcmFtYVxuICovXG5mdW5jdGlvbiBQYW5vcmFtYSAoIGdlb21ldHJ5LCBtYXRlcmlhbCApIHtcblxuXHRUSFJFRS5NZXNoLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG5cdHRoaXMudHlwZSA9ICdwYW5vcmFtYSc7XG5cblx0dGhpcy5JbWFnZVF1YWxpdHlMb3cgPSAxO1xuXHR0aGlzLkltYWdlUXVhbGl0eUZhaXIgPSAyO1xuXHR0aGlzLkltYWdlUXVhbGl0eU1lZGl1bSA9IDM7XG5cdHRoaXMuSW1hZ2VRdWFsaXR5SGlnaCA9IDQ7XG5cdHRoaXMuSW1hZ2VRdWFsaXR5U3VwZXJIaWdoID0gNTtcblxuXHR0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gMTAwMDtcblxuXHR0aGlzLmRlZmF1bHRJbmZvc3BvdFNpemUgPSAzNTA7XG5cblx0dGhpcy5jb250YWluZXIgPSB1bmRlZmluZWQ7XG5cblx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblxuXHR0aGlzLmxpbmtlZFNwb3RzID0gW107XG5cblx0dGhpcy5pc0luZm9zcG90VmlzaWJsZSA9IGZhbHNlO1xuXHRcblx0dGhpcy5saW5raW5nSW1hZ2VVUkwgPSB1bmRlZmluZWQ7XG5cdHRoaXMubGlua2luZ0ltYWdlU2NhbGUgPSB1bmRlZmluZWQ7XG5cblx0dGhpcy5tYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG5cdHRoaXMubWF0ZXJpYWwub3BhY2l0eSA9IDA7XG5cblx0dGhpcy5zY2FsZS54ICo9IC0xO1xuXHR0aGlzLnJlbmRlck9yZGVyID0gLTE7XG5cblx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuXHR0aGlzLmluZm9zcG90QW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzICkudG8oIHt9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uIC8gMiApO1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzLmZhZGVJbi5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtY29udGFpbmVyJywgdGhpcy5zZXRDb250YWluZXIuYmluZCggdGhpcyApICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5vbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdHRoaXMuc2V0dXBUcmFuc2l0aW9ucygpO1xuXG59XG5cblBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLk1lc2gucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogUGFub3JhbWEsXG5cblx0LyoqXG5cdCAqIEFkZGluZyBhbiBvYmplY3Rcblx0ICogVG8gY291bnRlciB0aGUgc2NhbGUueCA9IC0xLCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgYWRkIGFuIFxuXHQgKiBlbXB0eSBvYmplY3Qgd2l0aCBpbnZlcnRlZCBzY2FsZSBvbiB4XG5cdCAqIEBwYXJhbSB7VEhSRUUuT2JqZWN0M0R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gYmUgYWRkZWRcblx0ICovXG5cdGFkZDogZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRsZXQgaW52ZXJ0ZWRPYmplY3Q7XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdHRoaXMuYWRkKCBhcmd1bWVudHNbIGkgXSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0Ly8gSW4gY2FzZSBvZiBpbmZvc3BvdHNcblx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG5cdFx0XHRpbnZlcnRlZE9iamVjdCA9IG9iamVjdDtcblxuXHRcdFx0aWYgKCBvYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHR0aGlzLmNvbnRhaW5lciAmJiBvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtY29udGFpbmVyJywgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lciB9ICk7XG5cdFx0XHRcdFxuXHRcdFx0XHRvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtaW5mb3Nwb3QtZm9jdXMnLCBtZXRob2Q6IGZ1bmN0aW9uICggdmVjdG9yLCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSW5mb3Nwb3QgZm9jdXMgaGFuZGxlciBldmVudFxuXHRcdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG5cdFx0XHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtIFZpZXdlciBmdW5jdGlvbiBuYW1lXG5cdFx0XHRcdFx0ICogQHByb3BlcnR5IHsqfSBkYXRhIC0gVGhlIGFyZ3VtZW50IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZXRob2Rcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZSA6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3R3ZWVuQ29udHJvbENlbnRlcicsIGRhdGE6IFsgdmVjdG9yLCBkdXJhdGlvbiwgZWFzaW5nIF0gfSApO1xuXG5cblx0XHRcdFx0fS5iaW5kKCB0aGlzICkgfSApO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ291bnRlciBzY2FsZS54ID0gLTEgZWZmZWN0XG5cdFx0XHRpbnZlcnRlZE9iamVjdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuXHRcdFx0aW52ZXJ0ZWRPYmplY3Quc2NhbGUueCA9IC0xO1xuXHRcdFx0aW52ZXJ0ZWRPYmplY3Quc2NhbGVQbGFjZUhvbGRlciA9IHRydWU7XG5cdFx0XHRpbnZlcnRlZE9iamVjdC5hZGQoIG9iamVjdCApO1xuXG5cdFx0fVxuXG5cdFx0VEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLmFkZC5jYWxsKCB0aGlzLCBpbnZlcnRlZE9iamVjdCApO1xuXG5cdH0sXG5cblx0bG9hZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5vbkxvYWQoKTtcblx0XHRcblx0fSxcblxuXHQvKipcblx0ICogQ2xpY2sgZXZlbnQgaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gQ2xpY2sgZXZlbnRcblx0ICogQGZpcmVzIFBBTk9MRU5TLkluZm9zcG90I2Rpc21pc3Ncblx0ICovXG5cdG9uQ2xpY2s6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRpZiAoIGV2ZW50LmludGVyc2VjdHMgJiYgZXZlbnQuaW50ZXJzZWN0cy5sZW5ndGggPT09IDAgKSB7XG5cblx0XHRcdHRoaXMudHJhdmVyc2UoIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBEaW1pc3MgZXZlbnRcblx0XHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLkluZm9zcG90I2Rpc21pc3Ncblx0XHRcdFx0ICovXG5cdFx0XHRcdG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNtaXNzJyB9ICk7XG5cblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgY29udGFpbmVyIG9mIHRoaXMgcGFub3JhbWEgXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8b2JqZWN0fSBkYXRhIC0gRGF0YSB3aXRoIGNvbnRhaW5lciBpbmZvcm1hdGlvblxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuSW5mb3Nwb3QjcGFub2xlbnMtY29udGFpbmVyXG5cdCAqL1xuXHRzZXRDb250YWluZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcblxuXHRcdGxldCBjb250YWluZXI7XG5cblx0XHRpZiAoIGRhdGEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApIHtcblxuXHRcdFx0Y29udGFpbmVyID0gZGF0YTtcblxuXHRcdH0gZWxzZSBpZiAoIGRhdGEgJiYgZGF0YS5jb250YWluZXIgKSB7XG5cblx0XHRcdGNvbnRhaW5lciA9IGRhdGEuY29udGFpbmVyO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBjb250YWluZXIgKSB7XG5cblx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggZnVuY3Rpb24gKCBjaGlsZCApIHtcblxuXHRcdFx0XHRpZiAoIGNoaWxkIGluc3RhbmNlb2YgSW5mb3Nwb3QgJiYgY2hpbGQuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFNldCBjb250YWluZXIgZXZlbnRcblx0XHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5JbmZvc3BvdCNwYW5vbGVucy1jb250YWluZXJcblx0XHRcdFx0XHQgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBjb250YWluZXIgLSBUaGUgY29udGFpbmVyIG9mIHRoaXMgcGFub3JhbWFcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRjaGlsZC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1jb250YWluZXInLCBjb250YWluZXI6IGNvbnRhaW5lciB9ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9ICk7XG5cblx0XHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBwYW5vcmFtYSBpcyBsb2FkZWRcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2xvYWRcblx0ICovXG5cdG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5sb2FkZWQgPSB0cnVlO1xuXG5cdFx0LyoqXG5cdFx0ICogTG9hZCBwYW5vcmFtYSBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2xvYWRcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xvYWQnIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gcGFub3JhbWEgaXMgaW4gcHJvZ3Jlc3Ncblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI3Byb2dyZXNzXG5cdCAqL1xuXHRvblByb2dyZXNzOiBmdW5jdGlvbiAoIHByb2dyZXNzICkge1xuXG5cdFx0LyoqXG5cdFx0ICogTG9hZGluZyBwYW5vcmFtYSBwcm9ncmVzcyBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI3Byb2dyZXNzXG5cdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IHByb2dyZXNzIC0gVGhlIHByb2dyZXNzIG9iamVjdCBjb250YWluaW5nIGxvYWRlZCBhbmQgdG90YWwgYW1vdW50XG5cdFx0ICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcm9ncmVzcycsIHByb2dyZXNzOiBwcm9ncmVzcyB9ICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHBhbm9yYW1hIGxvYWRpbmcgaGFzIGVycm9yXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5QYW5vcmFtYSNlcnJvclxuXHQgKi9cblx0b25FcnJvcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0LyoqXG5cdFx0ICogTG9hZGluZyBwYW5vcmFtYSBlcnJvciBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2Vycm9yXG5cdFx0ICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlcnJvcicgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCB6b29tIGxldmVsIGJhc2VkIG9uIHdpbmRvdyB3aWR0aFxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IHpvb20gbGV2ZWwgaW5kaWNhdGluZyBpbWFnZSBxdWFsaXR5XG5cdCAqL1xuXHRnZXRab29tTGV2ZWw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGxldCB6b29tTGV2ZWw7XG5cblx0XHRpZiAoIHdpbmRvdy5pbm5lcldpZHRoIDw9IDgwMCApIHtcblxuXHRcdFx0em9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlGYWlyO1xuXG5cdFx0fSBlbHNlIGlmICggd2luZG93LmlubmVyV2lkdGggPiA4MDAgJiYgIHdpbmRvdy5pbm5lcldpZHRoIDw9IDEyODAgKSB7XG5cblx0XHRcdHpvb21MZXZlbCA9IHRoaXMuSW1hZ2VRdWFsaXR5TWVkaXVtO1xuXG5cdFx0fSBlbHNlIGlmICggd2luZG93LmlubmVyV2lkdGggPiAxMjgwICYmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDE5MjAgKSB7XG5cblx0XHRcdHpvb21MZXZlbCA9IHRoaXMuSW1hZ2VRdWFsaXR5SGlnaDtcblxuXHRcdH0gZWxzZSBpZiAoIHdpbmRvdy5pbm5lcldpZHRoID4gMTkyMCApIHtcblxuXHRcdFx0em9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlTdXBlckhpZ2g7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eUxvdztcblxuXHRcdH1cblxuXHRcdHJldHVybiB6b29tTGV2ZWw7XG5cblx0fSxcblxuXHQvKipcblx0ICogVXBkYXRlIHRleHR1cmUgb2YgYSBwYW5vcmFtYVxuXHQgKiBAcGFyYW0ge1RIUkVFLlRleHR1cmV9IHRleHR1cmUgLSBUZXh0dXJlIHRvIGJlIHVwZGF0ZWRcblx0ICovXG5cdHVwZGF0ZVRleHR1cmU6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuXHRcdHRoaXMubWF0ZXJpYWwubWFwID0gdGV4dHVyZTtcblx0XHR0aGlzLm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBpbmZvc3BvdHMgaW4gdGhpcyBwYW5vcmFtYVxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBpc1Zpc2libGUgLSBWaXNpYmlsaXR5IG9mIGluZm9zcG90c1xuXHQgKiBAcGFyYW0gIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgaW4gbWlsbGlzZWNvbmRzIHRvIGNoYW5nZSB2aXNpYmlsaXR5XG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5QYW5vcmFtYSNpbmZvc3BvdC1hbmltYXRpb24tY29tcGxldGVcblx0ICovXG5cdHRvZ2dsZUluZm9zcG90VmlzaWJpbGl0eTogZnVuY3Rpb24gKCBpc1Zpc2libGUsIGRlbGF5ICkge1xuXG5cdFx0ZGVsYXkgPSAoIGRlbGF5ICE9PSB1bmRlZmluZWQgKSA/IGRlbGF5IDogMDtcblxuXHRcdGNvbnN0IHZpc2libGUgPSAoIGlzVmlzaWJsZSAhPT0gdW5kZWZpbmVkICkgPyBpc1Zpc2libGUgOiAoIHRoaXMuaXNJbmZvc3BvdFZpc2libGUgPyBmYWxzZSA6IHRydWUgKTtcblxuXHRcdHRoaXMudHJhdmVyc2UoIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG5cdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG5cdFx0XHRcdHZpc2libGUgPyBvYmplY3Quc2hvdyggZGVsYXkgKSA6IG9iamVjdC5oaWRlKCBkZWxheSApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLmlzSW5mb3Nwb3RWaXNpYmxlID0gdmlzaWJsZTtcblxuXHRcdC8vIEFuaW1hdGlvbiBjb21wbGV0ZSBldmVudFxuXHRcdHRoaXMuaW5mb3Nwb3RBbmltYXRpb24ub25Db21wbGV0ZSggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIENvbXBsZXRlIHRvZ2dsaW5nIGluZm9zcG90IHZpc2liaWxpdHlcblx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNpbmZvc3BvdC1hbmltYXRpb24tY29tcGxldGVcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZSA6ICdpbmZvc3BvdC1hbmltYXRpb24tY29tcGxldGUnLCB2aXNpYmxlOiB2aXNpYmxlIH0gKTtcblxuXHRcdH0uYmluZCggdGhpcyApICkuZGVsYXkoIGRlbGF5ICkuc3RhcnQoKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgaW1hZ2Ugb2YgdGhpcyBwYW5vcmFtYSdzIGxpbmtpbmcgaW5mb3Nwb3Rcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVybCAgIC0gVXJsIHRvIHRoZSBpbWFnZSBhc3NldFxuXHQgKiBAcGFyYW0ge251bWJlcn0gc2NhbGUgLSBTY2FsZSBmYWN0b3Igb2YgdGhlIGluZm9zcG90XG5cdCAqL1xuXHRzZXRMaW5raW5nSW1hZ2U6IGZ1bmN0aW9uICggdXJsLCBzY2FsZSApIHtcblxuXHRcdHRoaXMubGlua2luZ0ltYWdlVVJMID0gdXJsO1xuXHRcdHRoaXMubGlua2luZ0ltYWdlU2NhbGUgPSBzY2FsZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBMaW5rIG9uZS13YXkgcGFub3JhbWFcblx0ICogQHBhcmFtICB7UEFOT0xFTlMuUGFub3JhbWF9IHBhbm8gIC0gVGhlIHBhbm9yYW1hIHRvIGJlIGxpbmtlZCB0b1xuXHQgKiBAcGFyYW0gIHtUSFJFRS5WZWN0b3IzfSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBvZiBpbmZvc3BvdCB3aGljaCBuYXZpZ2F0ZXMgdG8gdGhlIHBhbm9cblx0ICogQHBhcmFtICB7bnVtYmVyfSBbaW1hZ2VTY2FsZT0zMDBdIC0gSW1hZ2Ugc2NhbGUgb2YgbGlua2VkIGluZm9zcG90XG5cdCAqIEBwYXJhbSAge3N0cmluZ30gW2ltYWdlU3JjPVBBTk9MRU5TLkRhdGFJbWFnZS5BcnJvd10gLSBUaGUgaW1hZ2Ugc291cmNlIG9mIGxpbmtlZCBpbmZvc3BvdFxuXHQgKi9cblx0bGluazogZnVuY3Rpb24gKCBwYW5vLCBwb3NpdGlvbiwgaW1hZ2VTY2FsZSwgaW1hZ2VTcmMgKSB7XG5cblx0XHRsZXQgc2NhbGUsIGltZztcblxuXHRcdHRoaXMudmlzaWJsZSA9IHRydWU7XG5cblx0XHRpZiAoICFwb3NpdGlvbiApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnUGxlYXNlIHNwZWNpZnkgaW5mb3Nwb3QgcG9zaXRpb24gZm9yIGxpbmtpbmcnICk7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdC8vIEluZm9zcG90IHNjYWxlXG5cdFx0aWYgKCBpbWFnZVNjYWxlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHNjYWxlID0gaW1hZ2VTY2FsZTtcblxuXHRcdH0gZWxzZSBpZiAoIHBhbm8ubGlua2luZ0ltYWdlU2NhbGUgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0c2NhbGUgPSBwYW5vLmxpbmtpbmdJbWFnZVNjYWxlO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0c2NhbGUgPSAzMDA7XG5cblx0XHR9XG5cblxuXHRcdC8vIEluZm9zcG90IGltYWdlXG5cdFx0aWYgKCBpbWFnZVNyYyApIHtcblxuXHRcdFx0aW1nID0gaW1hZ2VTcmNcblxuXHRcdH0gZWxzZSBpZiAoIHBhbm8ubGlua2luZ0ltYWdlVVJMICkge1xuXG5cdFx0XHRpbWcgPSBwYW5vLmxpbmtpbmdJbWFnZVVSTDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGltZyA9IERhdGFJbWFnZS5BcnJvdztcblxuXHRcdH1cblxuXHRcdC8vIENyZWF0ZXMgYSBuZXcgaW5mb3Nwb3Rcblx0XHRjb25zdCBzcG90ID0gbmV3IEluZm9zcG90KCBzY2FsZSwgaW1nICk7XG5cdFx0c3BvdC5wb3NpdGlvbi5jb3B5KCBwb3NpdGlvbiApO1xuXHRcdHNwb3QudG9QYW5vcmFtYSA9IHBhbm87XG5cdFx0c3BvdC5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSBWaWV3ZXIgZnVuY3Rpb24gbmFtZVxuXHRcdFx0ICogQHByb3BlcnR5IHsqfSBkYXRhIC0gVGhlIGFyZ3VtZW50IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZXRob2Rcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGUgOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdzZXRQYW5vcmFtYScsIGRhdGE6IHBhbm8gfSApO1xuXG5cdFx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHRoaXMubGlua2VkU3BvdHMucHVzaCggc3BvdCApO1xuXG5cdFx0dGhpcy5hZGQoIHNwb3QgKTtcblxuXHRcdHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG5cdH0sXG5cblx0cmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gMDtcdFxuXG5cdH0sXG5cblx0c2V0dXBUcmFuc2l0aW9uczogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5mYWRlSW5BbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMubWF0ZXJpYWwgKVxuXHRcdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0IClcblx0XHRcdC5vblN0YXJ0KCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcblx0XHRcdFx0Ly90aGlzLm1hdGVyaWFsLnZpc2libGUgPSB0cnVlO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBFbnRlciBwYW5vcmFtYSBmYWRlIGluIHN0YXJ0IGV2ZW50XG5cdFx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNlbnRlci1mYWRlLXN0YXJ0XG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1mYWRlLXN0YXJ0JyB9ICk7XG5cblx0XHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0XHR0aGlzLmZhZGVPdXRBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMubWF0ZXJpYWwgKVxuXHRcdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0IClcblx0XHRcdC5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cdFx0XHRcdC8vdGhpcy5tYXRlcmlhbC52aXNpYmxlID0gdHJ1ZTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogTGVhdmUgcGFub3JhbWEgY29tcGxldGUgZXZlbnRcblx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2xlYXZlLWNvbXBsZXRlXG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdsZWF2ZS1jb21wbGV0ZScgfSApO1xuXG5cdFx0XHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0dGhpcy5lbnRlclRyYW5zaXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMgKVxuXHRcdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0IClcblx0XHRcdC5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIEVudGVyIHBhbm9yYW1hIGFuZCBhbmltYXRpb24gY29tcGxldGUgZXZlbnRcblx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2VudGVyLWFuaW1hdGlvbi1jb21wbGV0ZVxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fSBcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZW50ZXItYW5pbWF0aW9uLWNvbXBsZXRlJyB9ICk7XG5cblx0XHRcdH0uYmluZCAoIHRoaXMgKSApXG5cdFx0XHQuc3RhcnQoKTtcblxuXHRcdHRoaXMubGVhdmVUcmFuc2l0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzIClcblx0XHRcdC5lYXNpbmcoIFRXRUVOLkVhc2luZy5RdWFydGljLk91dCApO1xuXG5cdH0sXG5cblx0b25GYWRlQW5pbWF0aW9uVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBhbHBoYSA9IHRoaXMubWF0ZXJpYWwub3BhY2l0eTtcblx0XHRjb25zdCB7IHVuaWZvcm1zIH0gPSB0aGlzLm1hdGVyaWFsO1xuXG5cdFx0aWYgKCB1bmlmb3JtcyAmJiB1bmlmb3Jtcy5vcGFjaXR5ICkge1xuXHRcdFx0dW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IGFscGhhO1xuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTdGFydCBmYWRpbmcgaW4gYW5pbWF0aW9uXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5QYW5vcmFtYSNlbnRlci1mYWRlLWNvbXBsZXRlXG5cdCAqL1xuXHRmYWRlSW46IGZ1bmN0aW9uICggZHVyYXRpb24gKSB7XG5cblx0XHRkdXJhdGlvbiA9IGR1cmF0aW9uID49IDAgPyBkdXJhdGlvbiA6IHRoaXMuYW5pbWF0aW9uRHVyYXRpb247XG5cblx0XHR0aGlzLmZhZGVPdXRBbmltYXRpb24uc3RvcCgpO1xuXHRcdHRoaXMuZmFkZUluQW5pbWF0aW9uXG5cdFx0LnRvKCB7IG9wYWNpdHk6IDEgfSwgZHVyYXRpb24gKVxuXHRcdC5vblVwZGF0ZSggdGhpcy5vbkZhZGVBbmltYXRpb25VcGRhdGUuYmluZCggdGhpcyApIClcblx0XHQub25Db21wbGV0ZSggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMudG9nZ2xlSW5mb3Nwb3RWaXNpYmlsaXR5KCB0cnVlLCBkdXJhdGlvbiAvIDIgKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogRW50ZXIgcGFub3JhbWEgZmFkZSBjb21wbGV0ZSBldmVudFxuXHRcdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjZW50ZXItZmFkZS1jb21wbGV0ZVxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fSBcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZW50ZXItZmFkZS1jb21wbGV0ZScgfSApO1x0XHRcdFxuXG5cdFx0XHR9LmJpbmQoIHRoaXMgKSApXG5cdFx0LnN0YXJ0KCk7XG5cblx0fSxcblxuXHQvKipcblx0ICogU3RhcnQgZmFkaW5nIG91dCBhbmltYXRpb25cblx0ICovXG5cdGZhZGVPdXQ6IGZ1bmN0aW9uICggZHVyYXRpb24gKSB7XG5cblx0XHRkdXJhdGlvbiA9IGR1cmF0aW9uID49IDAgPyBkdXJhdGlvbiA6IHRoaXMuYW5pbWF0aW9uRHVyYXRpb247XG5cblx0XHR0aGlzLmZhZGVJbkFuaW1hdGlvbi5zdG9wKCk7XG5cdFx0dGhpcy5mYWRlT3V0QW5pbWF0aW9uXG5cdFx0LnRvKCB7IG9wYWNpdHk6IDAgfSwgZHVyYXRpb24gKVxuXHRcdC5vblVwZGF0ZSggdGhpcy5vbkZhZGVBbmltYXRpb25VcGRhdGUuYmluZCggdGhpcyApIClcblx0XHQuc3RhcnQoKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gZW50ZXJpbmcgYSBwYW5vcmFtYSBcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2VudGVyXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5QYW5vcmFtYSNlbnRlci1hbmltYXRpb24tc3RhcnRcblx0ICovXG5cdG9uRW50ZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IGR1cmF0aW9uID0gdGhpcy5hbmltYXRpb25EdXJhdGlvbjtcblxuXHRcdHRoaXMubGVhdmVUcmFuc2l0aW9uLnN0b3AoKTtcblx0XHR0aGlzLmVudGVyVHJhbnNpdGlvblxuXHRcdFx0LnRvKCB7fSwgZHVyYXRpb24gKVxuXHRcdFx0Lm9uU3RhcnQoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogRW50ZXIgcGFub3JhbWEgYW5kIGFuaW1hdGlvbiBzdGFydGluZyBldmVudFxuXHRcdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjZW50ZXItYW5pbWF0aW9uLXN0YXJ0XG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1hbmltYXRpb24tc3RhcnQnIH0gKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmICggdGhpcy5sb2FkZWQgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmZhZGVJbiggZHVyYXRpb24gKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0dGhpcy5sb2FkKCk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0uYmluZCggdGhpcyApIClcblx0XHRcdC5zdGFydCgpO1xuXG5cdFx0LyoqXG5cdFx0ICogRW50ZXIgcGFub3JhbWEgZXZlbnRcblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjZW50ZXJcblx0XHQgKiBAdHlwZSB7b2JqZWN0fSBcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyJyB9ICk7XG5cblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goIGNoaWxkID0+IHtcblxuXHRcdFx0Y2hpbGQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub3JhbWEtZW50ZXInIH0gKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gbGVhdmluZyBhIHBhbm9yYW1hXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5QYW5vcmFtYSNsZWF2ZVxuXHQgKi9cblx0b25MZWF2ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgZHVyYXRpb24gPSB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uO1xuXG5cdFx0dGhpcy5lbnRlclRyYW5zaXRpb24uc3RvcCgpO1xuXHRcdHRoaXMubGVhdmVUcmFuc2l0aW9uXG5cdFx0XHQudG8oIHt9LCBkdXJhdGlvbiApXG5cdFx0XHQub25TdGFydCggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBMZWF2ZSBwYW5vcmFtYSBhbmQgYW5pbWF0aW9uIHN0YXJ0aW5nIGV2ZW50XG5cdFx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNsZWF2ZS1hbmltYXRpb24tc3RhcnRcblx0XHRcdFx0ICogQHR5cGUge29iamVjdH0gXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlLWFuaW1hdGlvbi1zdGFydCcgfSApO1xuXG5cdFx0XHRcdHRoaXMuZmFkZU91dCggZHVyYXRpb24gKTtcblx0XHRcdFx0dGhpcy50b2dnbGVJbmZvc3BvdFZpc2liaWxpdHkoIGZhbHNlICk7XG5cblx0XHRcdH0uYmluZCggdGhpcyApIClcblx0XHRcdC5zdGFydCgpO1xuXG5cdFx0LyoqXG5cdFx0ICogTGVhdmUgcGFub3JhbWEgZXZlbnRcblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjbGVhdmVcblx0XHQgKiBAdHlwZSB7b2JqZWN0fSBcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlJyB9ICk7XG5cblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goIGNoaWxkID0+IHtcblxuXHRcdFx0Y2hpbGQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub3JhbWEtbGVhdmUnIH0gKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cblx0fSxcblxuXHQvKipcblx0ICogRGlzcG9zZSBwYW5vcmFtYVxuXHQgKi9cblx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0LyoqXG5cdFx0ICogT24gcGFub3JhbWEgZGlzcG9zZSBoYW5kbGVyXG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gVmlld2VyIGZ1bmN0aW9uIG5hbWVcblx0XHQgKiBAcHJvcGVydHkgeyp9IGRhdGEgLSBUaGUgYXJndW1lbnQgdG8gYmUgcGFzc2VkIGludG8gdGhlIG1ldGhvZFxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlIDogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnb25QYW5vcmFtYURpc3Bvc2UnLCBkYXRhOiB0aGlzIH0gKTtcblxuXHRcdC8vIHJlY3Vyc2l2ZSBkaXNwb3NhbCBvbiAzZCBvYmplY3RzXG5cdFx0ZnVuY3Rpb24gcmVjdXJzaXZlRGlzcG9zZSAoIG9iamVjdCApIHtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cblx0XHRcdFx0cmVjdXJzaXZlRGlzcG9zZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG5cdFx0XHRcdG9iamVjdC5yZW1vdmUoIG9iamVjdC5jaGlsZHJlbltpXSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgSW5mb3Nwb3QgKSB7XG5cblx0XHRcdFx0b2JqZWN0LmRpc3Bvc2UoKTtcblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRvYmplY3QuZ2VvbWV0cnkgJiYgb2JqZWN0Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcblx0XHRcdG9iamVjdC5tYXRlcmlhbCAmJiBvYmplY3QubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXHRcdH1cblxuXHRcdHJlY3Vyc2l2ZURpc3Bvc2UoIHRoaXMgKTtcblxuXHRcdGlmICggdGhpcy5wYXJlbnQgKSB7XG5cblx0XHRcdHRoaXMucGFyZW50LnJlbW92ZSggdGhpcyApO1xuXG5cdFx0fVxuXG5cdH1cblxufSApO1xuXG5leHBvcnQgeyBQYW5vcmFtYSB9OyIsImltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9QYW5vcmFtYSc7XG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9UZXh0dXJlTG9hZGVyJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIEVxdWlyZWN0YW5ndWxhciBiYXNlZCBpbWFnZSBwYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSBJbWFnZSB1cmwgb3IgSFRNTEltYWdlRWxlbWVudFxuICovXG5mdW5jdGlvbiBJbWFnZVBhbm9yYW1hICggaW1hZ2UsIF9nZW9tZXRyeSwgX21hdGVyaWFsICkge1xuXG5cdGNvbnN0IHJhZGl1cyA9IDUwMDA7XG5cdGNvbnN0IGdlb21ldHJ5ID0gX2dlb21ldHJ5IHx8IG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeSggcmFkaXVzLCA2MCwgNDAgKTtcblx0Y29uc3QgbWF0ZXJpYWwgPSBfbWF0ZXJpYWwgfHwgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IG9wYWNpdHk6IDAsIHRyYW5zcGFyZW50OiB0cnVlIH0gKTtcblxuXHRQYW5vcmFtYS5jYWxsKCB0aGlzLCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuXHR0aGlzLnNyYyA9IGltYWdlO1xuXHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcblxufVxuXG5JbWFnZVBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IEltYWdlUGFub3JhbWEsXG5cblx0LyoqXG5cdCAqIExvYWQgaW1hZ2UgYXNzZXRcblx0ICogQHBhcmFtICB7Kn0gc3JjIC0gVXJsIG9yIGltYWdlIGVsZW1lbnRcblx0ICovXG5cdGxvYWQ6IGZ1bmN0aW9uICggc3JjICkge1xuXG5cdFx0c3JjID0gc3JjIHx8IHRoaXMuc3JjO1xuXG5cdFx0aWYgKCAhc3JjICkgeyBcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnSW1hZ2Ugc291cmNlIHVuZGVmaW5lZCcgKTtcblxuXHRcdFx0cmV0dXJuOyBcblxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBzcmMgPT09ICdzdHJpbmcnICkge1xuXG5cdFx0XHRUZXh0dXJlTG9hZGVyLmxvYWQoIHNyYywgdGhpcy5vbkxvYWQuYmluZCggdGhpcyApLCB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApLCB0aGlzLm9uRXJyb3IuYmluZCggdGhpcyApICk7XG5cblx0XHR9IGVsc2UgaWYgKCBzcmMgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLm9uTG9hZCggbmV3IFRIUkVFLlRleHR1cmUoIHNyYyApICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIGltYWdlIGlzIGxvYWRlZFxuXHQgKiBAcGFyYW0gIHtUSFJFRS5UZXh0dXJlfSB0ZXh0dXJlIC0gVGV4dHVyZSB0byBiZSB1cGRhdGVkXG5cdCAqL1xuXHRvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuXHRcdHRleHR1cmUubWluRmlsdGVyID0gdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG5cdFx0dGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XG5cdFx0dGhpcy51cGRhdGVUZXh0dXJlKCB0ZXh0dXJlICk7XG5cblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIFBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuYmluZCggdGhpcyApICk7XG5cblx0fSxcblxuXHRyZXNldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0UGFub3JhbWEucHJvdG90eXBlLnJlc2V0LmNhbGwoIHRoaXMgKTtcblxuXHR9LFxuXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIFJlbGVhc2UgY2FjaGVkIGltYWdlXG5cdFx0VEhSRUUuQ2FjaGUucmVtb3ZlKCB0aGlzLnNyYyApO1xuXG5cdFx0dGhpcy5tYXRlcmlhbC5tYXAgJiYgdGhpcy5tYXRlcmlhbC5tYXAuZGlzcG9zZSgpO1xuXG5cdFx0UGFub3JhbWEucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCggdGhpcyApO1xuXG5cdH1cblxufSApO1xuXG5leHBvcnQgeyBJbWFnZVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIEVtcHR5IHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRW1wdHlQYW5vcmFtYSAoKSB7XG5cblx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcblx0Y29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgY29sb3I6IDB4MDAwMDAwLCBvcGFjaXR5OiAwLCB0cmFuc3BhcmVudDogdHJ1ZSB9ICk7XG5cblx0Z2VvbWV0cnkuYWRkQXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBuZXcgRmxvYXQzMkFycmF5KCksIDEgKSApO1xuXG5cdFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG59XG5cbkVtcHR5UGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogRW1wdHlQYW5vcmFtYVxuXG59ICk7XG5cbmV4cG9ydCB7IEVtcHR5UGFub3JhbWEgfTsiLCJpbXBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4vUGFub3JhbWEnO1xuaW1wb3J0IHsgQ3ViZVRleHR1cmVMb2FkZXIgfSBmcm9tICcuLi9sb2FkZXJzL0N1YmVUZXh0dXJlTG9hZGVyJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIEN1YmVtYXAtYmFzZWQgcGFub3JhbWFcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHthcnJheX0gaW1hZ2VzIC0gQW4gYXJyYXkgb2YgY3ViZXRleHR1cmUgY29udGFpbmluZyBzaXggaW1hZ2VzXG4gKi9cbmZ1bmN0aW9uIEN1YmVQYW5vcmFtYSAoIGltYWdlcyA9IFtdICl7XG5cblx0Y29uc3QgZWRnZUxlbmd0aCA9IDEwMDAwO1xuXHRjb25zdCBzaGFkZXIgPSBKU09OLnBhcnNlKCBKU09OLnN0cmluZ2lmeSggVEhSRUUuU2hhZGVyTGliWyAnY3ViZScgXSApICk7XG5cdGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KCBlZGdlTGVuZ3RoLCBlZGdlTGVuZ3RoLCBlZGdlTGVuZ3RoICk7XG5cdGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCB7XG5cblx0XHRmcmFnbWVudFNoYWRlcjogc2hhZGVyLmZyYWdtZW50U2hhZGVyLFxuXHRcdHZlcnRleFNoYWRlcjogc2hhZGVyLnZlcnRleFNoYWRlcixcblx0XHR1bmlmb3Jtczogc2hhZGVyLnVuaWZvcm1zLFxuXHRcdHNpZGU6IFRIUkVFLkJhY2tTaWRlLFxuXHRcdHRyYW5zcGFyZW50OiB0cnVlXG5cblx0fSApO1xuXG5cdFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG5cdHRoaXMuaW1hZ2VzID0gaW1hZ2VzO1xuXHR0aGlzLmVkZ2VMZW5ndGggPSBlZGdlTGVuZ3RoO1xuXHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLm9wYWNpdHkudmFsdWUgPSAwO1xuXG59XG5cbkN1YmVQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBDdWJlUGFub3JhbWEsXG5cblx0LyoqXG5cdCAqIExvYWQgNiBpbWFnZXMgYW5kIGJpbmQgbGlzdGVuZXJzXG5cdCAqL1xuXHRsb2FkOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRDdWJlVGV4dHVyZUxvYWRlci5sb2FkKCBcdFxuXG5cdFx0XHR0aGlzLmltYWdlcywgXG5cblx0XHRcdHRoaXMub25Mb2FkLmJpbmQoIHRoaXMgKSwgXG5cdFx0XHR0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApLCBcblx0XHRcdHRoaXMub25FcnJvci5iaW5kKCB0aGlzICkgXG5cblx0XHQpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiA2IHRleHR1cmVzIGFyZSByZWFkeVxuXHQgKiBAcGFyYW0gIHtUSFJFRS5DdWJlVGV4dHVyZX0gdGV4dHVyZSAtIEN1YmUgdGV4dHVyZVxuXHQgKi9cblx0b25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cdFx0XG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3RDdWJlJyBdLnZhbHVlID0gdGV4dHVyZTtcblxuXHRcdFBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcyApO1xuXG5cdH0sXG5cblx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1x0XG5cblx0XHR0aGlzLmltYWdlcy5mb3JFYWNoKCAoIGltYWdlICkgPT4geyBUSFJFRS5DYWNoZS5yZW1vdmUoIGltYWdlICk7IH0gKTtcblxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbICd0Q3ViZScgXSAmJiB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zWyAndEN1YmUnIF0udmFsdWUuZGlzcG9zZSgpO1xuXG5cdFx0UGFub3JhbWEucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCggdGhpcyApO1xuXG5cdH1cblxufSApO1xuXG5leHBvcnQgeyBDdWJlUGFub3JhbWEgfTsiLCJpbXBvcnQgeyBDdWJlUGFub3JhbWEgfSBmcm9tICcuL0N1YmVQYW5vcmFtYSc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuXG4vKipcbiAqIEJhc2ljIHBhbm9yYW1hIHdpdGggNiBmYWNlcyB0aWxlIGltYWdlc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJhc2ljUGFub3JhbWEgKCkge1xuXG5cdGNvbnN0IGltYWdlcyA9IFtdO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IDY7IGkrKyApIHtcblxuXHRcdGltYWdlcy5wdXNoKCBEYXRhSW1hZ2UuV2hpdGVUaWxlICk7XG5cblx0fVxuXG5cdEN1YmVQYW5vcmFtYS5jYWxsKCB0aGlzLCBpbWFnZXMgKTtcblxufVxuXG5CYXNpY1Bhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIEN1YmVQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBCYXNpY1Bhbm9yYW1hXG5cbn0gKTtcblxuZXhwb3J0IHsgQmFzaWNQYW5vcmFtYSB9OyIsImltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9QYW5vcmFtYSc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBWaWRlbyBQYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0gRXF1aXJlY3Rhbmd1bGFyIHZpZGVvIHVybFxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbiBmb3IgdmlkZW8gc2V0dGluZ3NcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRpb25zLnZpZGVvRWxlbWVudF0gLSBIVE1MNSB2aWRlbyBlbGVtZW50IGNvbnRhaW5zIHRoZSB2aWRlb1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sb29wPXRydWVdIC0gU3BlY2lmeSBpZiB0aGUgdmlkZW8gc2hvdWxkIGxvb3AgaW4gdGhlIGVuZFxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5tdXRlZD10cnVlXSAtIE11dGUgdGhlIHZpZGVvIG9yIG5vdC4gTmVlZCB0byBiZSB0cnVlIGluIG9yZGVyIHRvIGF1dG9wbGF5IG9uIHNvbWUgYnJvd3NlcnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b3BsYXk9ZmFsc2VdIC0gU3BlY2lmeSBpZiB0aGUgdmlkZW8gc2hvdWxkIGF1dG8gcGxheVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wbGF5c2lubGluZT10cnVlXSAtIFNwZWNpZnkgaWYgdmlkZW8gc2hvdWxkIHBsYXkgaW5saW5lIGZvciBpT1MuIElmIHlvdSB3YW50IGl0IHRvIGF1dG8gcGxheSBpbmxpbmUsIHNldCBib3RoIGF1dG9wbGF5IGFuZCBtdXRlZCBvcHRpb25zIHRvIHRydWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1cImFub255bW91c1wiXSAtIFNldHMgdGhlIGNyb3NzLW9yaWdpbiBhdHRyaWJ1dGUgZm9yIHRoZSB2aWRlbywgd2hpY2ggYWxsb3dzIGZvciBjcm9zcy1vcmlnaW4gdmlkZW9zIGluIHNvbWUgYnJvd3NlcnMgKEZpcmVmb3gsIENocm9tZSkuIFNldCB0byBlaXRoZXIgXCJhbm9ueW1vdXNcIiBvciBcInVzZS1jcmVkZW50aWFsc1wiLlxuICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9NTAwMF0gLSBUaGUgbWluaW11bSByYWRpdXMgZm9yIHRoaXMgcGFub3JhbVxuICovXG5mdW5jdGlvbiBWaWRlb1Bhbm9yYW1hICggc3JjLCBvcHRpb25zID0ge30gKSB7XG5cblx0Y29uc3QgcmFkaXVzID0gNTAwMDtcblx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkoIHJhZGl1cywgNjAsIDQwICk7XG5cdGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IG9wYWNpdHk6IDAsIHRyYW5zcGFyZW50OiB0cnVlIH0gKTtcblxuXHRQYW5vcmFtYS5jYWxsKCB0aGlzLCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuXHR0aGlzLnNyYyA9IHNyYztcblxuXHR0aGlzLm9wdGlvbnMgPSB7XG5cblx0XHR2aWRlb0VsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICd2aWRlbycgKSxcblx0XHRsb29wOiB0cnVlLFxuXHRcdG11dGVkOiB0cnVlLFxuXHRcdGF1dG9wbGF5OiBmYWxzZSxcblx0XHRwbGF5c2lubGluZTogdHJ1ZSxcblx0XHRjcm9zc09yaWdpbjogJ2Fub255bW91cydcblxuXHR9O1xuXG5cdE9iamVjdC5hc3NpZ24oIHRoaXMub3B0aW9ucywgb3B0aW9ucyApO1xuXG5cdHRoaXMudmlkZW9FbGVtZW50ID0gdGhpcy5vcHRpb25zLnZpZGVvRWxlbWVudDtcblx0dGhpcy52aWRlb1Byb2dyZXNzID0gMDtcblx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XG5cblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnbGVhdmUnLCB0aGlzLnBhdXNlVmlkZW8uYmluZCggdGhpcyApICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCB0aGlzLnJlc3VtZVZpZGVvUHJvZ3Jlc3MuYmluZCggdGhpcyApICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXRvZ2dsZScsIHRoaXMudG9nZ2xlVmlkZW8uYmluZCggdGhpcyApICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXRpbWUnLCB0aGlzLnNldFZpZGVvQ3VycmVudFRpbWUuYmluZCggdGhpcyApICk7XG5cbn07XG5cblZpZGVvUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogVmlkZW9QYW5vcmFtYSxcblxuXHRpc01vYmlsZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0bGV0IGNoZWNrID0gZmFsc2U7XG5cdFx0KGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7fSkoIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEgKTtcblx0XHRyZXR1cm4gY2hlY2s7XG5cblx0fSxcblxuXHQvKipcblx0ICogTG9hZCB2aWRlbyBwYW5vcmFtYVxuXHQgKiBAZmlyZXMgIFBBTk9MRU5TLlBhbm9yYW1hI3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG5cdCAqL1xuXHRsb2FkOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB7IG11dGVkLCBsb29wLCBhdXRvcGxheSwgcGxheXNpbmxpbmUsIGNyb3NzT3JpZ2luIH0gPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblx0XHRjb25zdCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XG5cdFx0Y29uc3Qgb25Qcm9ncmVzcyA9IHRoaXMub25Qcm9ncmVzcy5iaW5kKCB0aGlzICk7XG5cdFx0Y29uc3Qgb25Mb2FkID0gdGhpcy5vbkxvYWQuYmluZCggdGhpcyApO1xuXG5cdFx0dmlkZW8ubG9vcCA9IGxvb3A7XG5cdFx0dmlkZW8uYXV0b3BsYXkgPSBhdXRvcGxheTtcblx0XHR2aWRlby5wbGF5c2lubGluZSA9IHBsYXlzaW5saW5lO1xuXHRcdHZpZGVvLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG5cdFx0dmlkZW8ubXV0ZWQgPSBtdXRlZDtcblx0XHRcblx0XHRpZiAoIHBsYXlzaW5saW5lICkge1xuXG5cdFx0XHR2aWRlby5zZXRBdHRyaWJ1dGUoICdwbGF5c2lubGluZScsICcnICk7XG5cdFx0XHR2aWRlby5zZXRBdHRyaWJ1dGUoICd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyApO1xuXG5cdFx0fSBcblxuXHRcdGNvbnN0IG9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHRcdHRoaXMuc2V0VmlkZW9UZXh0dXJlKCB2aWRlbyApO1xuXG5cdFx0XHRpZiAoIGF1dG9wbGF5ICkge1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcblx0XHRcdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogZmFsc2UgfSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBtb2JpbGUgc2lsZW50IGF1dG9wbGF5XG5cdFx0XHRpZiAoIHRoaXMuaXNNb2JpbGUoKSApIHtcblxuXHRcdFx0XHR2aWRlby5wYXVzZSgpO1xuXG5cdFx0XHRcdGlmICggYXV0b3BsYXkgJiYgbXV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nXG5cdFx0XHRcdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbicsIGRhdGE6IGZhbHNlIH0gKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuXHRcdFx0XHRcdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiB0cnVlIH0gKTtcblxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBsb2FkZWQgPSAoKSA9PiB7XG5cblx0XHRcdFx0Ly8gRml4IGZvciB0aHJlZWpzIHI4OSBkZWxheWVkIHVwZGF0ZVxuXHRcdFx0XHRtYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHRcdG9uUHJvZ3Jlc3MoIHsgbG9hZGVkOiAxLCB0b3RhbDogMSB9ICk7XG5cdFx0XHRcdG9uTG9hZCgpO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGxvYWRlZCApO1xuXHRcdFx0XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlYWR5IHN0YXRlIG9mIHRoZSBhdWRpby92aWRlbyBlbGVtZW50XG5cdFx0ICogMCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuXHRcdCAqIDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuXHRcdCAqIDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcblx0XHQgKiAzID0gSEFWRV9GVVRVUkVfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IGFuZCBhdCBsZWFzdCB0aGUgbmV4dCBmcmFtZSBpcyBhdmFpbGFibGVcblx0XHQgKiA0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG5cdFx0ICovXG5cdFx0aWYgKCB2aWRlby5yZWFkeVN0YXRlID4gMiApIHtcblxuXHRcdFx0b25sb2FkZWRkYXRhLmNhbGwoIHRoaXMgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggIXZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoICdzb3VyY2UnICkubGVuZ3RoIHx8ICF2aWRlby5zcmMgKSB7XG5cblx0XHRcdFx0dmlkZW8uc3JjID0gdGhpcy5zcmM7XG5cblx0XHRcdH1cblxuXHRcdFx0dmlkZW8ubG9hZCgpO1xuXHRcdH1cblxuXHRcdHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkZWRkYXRhJywgb25sb2FkZWRkYXRhLmJpbmQoIHRoaXMgKSApO1xuXHRcdFxuXHRcdHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICd0aW1ldXBkYXRlJywgZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdFx0dGhpcy52aWRlb1Byb2dyZXNzID0gdmlkZW8uZHVyYXRpb24gPj0gMCA/IHZpZGVvLmN1cnJlbnRUaW1lIC8gdmlkZW8uZHVyYXRpb24gOiAwO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICdvblZpZGVvVXBkYXRlJ1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEgLSBUaGUgcGVyY2VudGFnZSBvZiB2aWRlbyBwcm9ncmVzcy4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblZpZGVvVXBkYXRlJywgZGF0YTogdGhpcy52aWRlb1Byb2dyZXNzIH0gKTtcblxuXHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0XHR2aWRlby5hZGRFdmVudExpc3RlbmVyKCAnZW5kZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcblx0XHRcdGlmICggIWxvb3AgKSB7XG5cblx0XHRcdFx0dGhpcy5yZXNldFZpZGVvKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiB0cnVlIH0gKTtcblxuXHRcdFx0fVxuXG5cdFx0fS5iaW5kKCB0aGlzICksIGZhbHNlICk7IFxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCB2aWRlbyB0ZXh0dXJlXG5cdCAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudH0gdmlkZW8gIC0gVGhlIGh0bWw1IHZpZGVvIGVsZW1lbnRcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG5cdCAqL1xuXHRzZXRWaWRlb1RleHR1cmU6IGZ1bmN0aW9uICggdmlkZW8gKSB7XG5cblx0XHRpZiAoICF2aWRlbyApIHJldHVybjtcblxuXHRcdGNvbnN0IHZpZGVvVGV4dHVyZSA9IG5ldyBUSFJFRS5WaWRlb1RleHR1cmUoIHZpZGVvICk7XG5cdFx0dmlkZW9UZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcblx0XHR2aWRlb1RleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuXHRcdHZpZGVvVGV4dHVyZS5mb3JtYXQgPSBUSFJFRS5SR0JGb3JtYXQ7XG5cblx0XHR0aGlzLnVwZGF0ZVRleHR1cmUoIHZpZGVvVGV4dHVyZSApO1xuXHRcblx0fSxcblxuXHRyZXNldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQgPSB1bmRlZmluZWQ7XHRcblxuXHRcdFBhbm9yYW1hLnByb3RvdHlwZS5yZXNldC5jYWxsKCB0aGlzICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdmlkZW8gaXMgcGF1c2VkXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdmlkZW8gcGF1c2VkIG9yIG5vdFxuXHQgKi9cblx0aXNWaWRlb1BhdXNlZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgdmlkZW8gdG8gcGxheSBvciBwYXVzZVxuXHQgKi9cblx0dG9nZ2xlVmlkZW86IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cblx0XHRpZiAoICF2aWRlbyApIHsgcmV0dXJuOyB9XG5cblx0XHR2aWRlb1sgdmlkZW8ucGF1c2VkID8gJ3BsYXknIDogJ3BhdXNlJyBdKCk7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IHZpZGVvIGN1cnJlbnRUaW1lXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIEV2ZW50IGNvbnRhaW5zIHBlcmNlbnRhZ2UuIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuXHQgKi9cblx0c2V0VmlkZW9DdXJyZW50VGltZTogZnVuY3Rpb24gKCB7IHBlcmNlbnRhZ2UgfSApIHtcblxuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cblx0XHRpZiAoIHZpZGVvICYmICFOdW1iZXIuaXNOYU4oIHBlcmNlbnRhZ2UgKSAmJiBwZXJjZW50YWdlICE9PSAxICkge1xuXG5cdFx0XHR2aWRlby5jdXJyZW50VGltZSA9IHZpZGVvLmR1cmF0aW9uICogcGVyY2VudGFnZTtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ29uVmlkZW9VcGRhdGUnLCBkYXRhOiBwZXJjZW50YWdlIH0gKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBQbGF5IHZpZGVvXG5cdCAqL1xuXHRwbGF5VmlkZW86IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cblx0XHRpZiAoIHZpZGVvICYmIHZpZGVvLnBhdXNlZCApIHtcblxuXHRcdFx0dmlkZW8ucGxheSgpXG5cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBQbGF5IGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgJ3BsYXknXG5cdFx0ICogKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3BsYXknIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBQYXVzZSB2aWRlb1xuXHQgKi9cblx0cGF1c2VWaWRlbzogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHRcdGlmICggdmlkZW8gJiYgIXZpZGVvLnBhdXNlZCApIHtcblxuXHRcdFx0dmlkZW8ucGF1c2UoKTtcblxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFBhdXNlIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgJ3BhdXNlJ1xuXHRcdCAqICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYXVzZScgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJlc3VtZSB2aWRlb1xuXHQgKi9cblx0cmVzdW1lVmlkZW9Qcm9ncmVzczogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHRcdGlmICggdmlkZW8ucmVhZHlTdGF0ZSA+PSA0ICYmIHZpZGVvLmF1dG9wbGF5ICYmICF0aGlzLmlzTW9iaWxlKCkgKSB7XG5cblx0XHRcdHRoaXMucGxheVZpZGVvKCk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcblx0XHRcdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogZmFsc2UgfSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5wYXVzZVZpZGVvKCk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcblx0XHRcdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogdHJ1ZSB9ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnNldFZpZGVvQ3VycmVudFRpbWUoIHsgcGVyY2VudGFnZTogdGhpcy52aWRlb1Byb2dyZXNzIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXNldCB2aWRlbyBhdCBzdGF0aW5nIHBvaW50XG5cdCAqL1xuXHRyZXNldFZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG5cdFx0aWYgKCB2aWRlbyApIHtcblxuXHRcdFx0dGhpcy5zZXRWaWRlb0N1cnJlbnRUaW1lKCB7IHBlcmNlbnRhZ2U6IDAgfSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCogQ2hlY2sgaWYgdmlkZW8gaXMgbXV0ZWRcblx0KiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHZpZGVvIG11dGVkIG9yIG5vdFxuXHQqL1xuXHRpc1ZpZGVvTXV0ZWQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5tdXRlZDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBNdXRlIHZpZGVvXG5cdCAqL1xuXHRtdXRlVmlkZW86IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cblx0XHRpZiAoIHZpZGVvICYmICF2aWRlby5tdXRlZCApIHtcblxuXHRcdFx0dmlkZW8ubXV0ZWQgPSB0cnVlO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2b2x1bWVjaGFuZ2UnIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVbm11dGUgdmlkZW9cblx0ICovXG5cdHVubXV0ZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG5cdFx0aWYgKCB0aGlzLnZpZGVvRWxlbWVudCAmJiB0aGlzLmlzVmlkZW9NdXRlZCgpICkge1xuXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC5tdXRlZCA9IGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2b2x1bWVjaGFuZ2UnIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2aWRlbyBlbGVtZW50XG5cdCAqL1xuXHRnZXRWaWRlb0VsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlIHZpZGVvIHBhbm9yYW1hXG5cdCAqL1xuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnJlc2V0VmlkZW8oKTtcblx0XHR0aGlzLnBhdXNlVmlkZW8oKTtcblx0XHRcblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsZWF2ZScsIHRoaXMucGF1c2VWaWRlby5iaW5kKCB0aGlzICkgKTtcblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgdGhpcy5yZXN1bWVWaWRlb1Byb2dyZXNzLmJpbmQoIHRoaXMgKSApO1xuXHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXRvZ2dsZScsIHRoaXMudG9nZ2xlVmlkZW8uYmluZCggdGhpcyApICk7XG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAndmlkZW8tdGltZScsIHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZS5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHRoaXMubWF0ZXJpYWwubWFwICYmIHRoaXMubWF0ZXJpYWwubWFwLmRpc3Bvc2UoKTtcblxuXHRcdFBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuXHR9XG5cbn0gKTtcblxuZXhwb3J0IHsgVmlkZW9QYW5vcmFtYSB9OyIsIlxuaW1wb3J0IHsgVGV4dHVyZUxvYWRlciB9IGZyb20gJy4vVGV4dHVyZUxvYWRlcic7XG5cbmZ1bmN0aW9uIEdvb2dsZVN0cmVldExvYWRlciAoIHBhcmFtZXRlcnMgPSB7fSApIHtcblxuXHR0aGlzLl9wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcblx0dGhpcy5fem9vbTtcblx0dGhpcy5fcGFub0lkO1xuXHR0aGlzLl9wYW5vQ2xpZW50ID0gbmV3IGdvb2dsZS5tYXBzLlN0cmVldFZpZXdTZXJ2aWNlKCk7XG5cdHRoaXMuX2NvdW50ID0gMDtcblx0dGhpcy5fdG90YWwgPSAwO1xuXHR0aGlzLl9jYW52YXMgPSBbXTtcblx0dGhpcy5fY3R4ID0gW107XG5cdHRoaXMuX3djID0gMDtcblx0dGhpcy5faGMgPSAwO1xuXHR0aGlzLnJlc3VsdCA9IG51bGw7XG5cdHRoaXMucm90YXRpb24gPSAwO1xuXHR0aGlzLmNvcHlyaWdodCA9ICcnO1xuXHR0aGlzLm9uU2l6ZUNoYW5nZSA9IG51bGw7XG5cdHRoaXMub25QYW5vcmFtYUxvYWQgPSBudWxsO1xuXG5cdHRoaXMubGV2ZWxzVyA9IFsgMSwgMiwgNCwgNywgMTMsIDI2IF07XG5cdHRoaXMubGV2ZWxzSCA9IFsgMSwgMSwgMiwgNCwgNywgMTMgXTtcblxuXHR0aGlzLndpZHRocyA9IFsgNDE2LCA4MzIsIDE2NjQsIDMzMjgsIDY2NTYsIDEzMzEyIF07XG5cdHRoaXMuaGVpZ2h0cyA9IFsgNDE2LCA0MTYsIDgzMiwgMTY2NCwgMzMyOCwgNjY1NiBdO1xuXG5cdGxldCBnbDtcblxuXHR0cnkge1xuXG5cdFx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblxuXHRcdGdsID0gY2FudmFzLmdldENvbnRleHQoICdleHBlcmltZW50YWwtd2ViZ2wnICk7XG5cblx0XHRpZiggIWdsICkge1xuXG5cdFx0XHRnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICk7XG5cblx0XHR9XG5cblx0fVxuXHRjYXRjaCAoIGVycm9yICkge1xuXG5cdH1cblxuXHRjb25zdCBtYXhUZXhTaXplID0gTWF0aC5tYXgoIGdsLmdldFBhcmFtZXRlciggZ2wuTUFYX1RFWFRVUkVfU0laRSApLCA2NjU2ICk7XG5cdHRoaXMubWF4VyA9IG1heFRleFNpemU7XG5cdHRoaXMubWF4SCA9IG1heFRleFNpemU7XG5cbn1cblxuT2JqZWN0LmFzc2lnbiggR29vZ2xlU3RyZWV0TG9hZGVyLnByb3RvdHlwZSwge1xuXG5cdGNvbnN0cnVjdG9yOiBHb29nbGVTdHJlZXRMb2FkZXIsXG5cblx0c2V0UHJvZ3Jlc3M6IGZ1bmN0aW9uICggbG9hZGVkLCB0b3RhbCApIHtcblxuXHRcdGlmICggdGhpcy5vblByb2dyZXNzICkge1xuXG5cdFx0XHR0aGlzLm9uUHJvZ3Jlc3MoIHsgbG9hZGVkOiBsb2FkZWQsIHRvdGFsOiB0b3RhbCB9ICk7XG5cblx0XHR9XG5cdFx0XG5cdH0sXG5cblx0dGhyb3dFcnJvcjogZnVuY3Rpb24gKCBtZXNzYWdlICkge1xuXG5cdFx0aWYgKCB0aGlzLm9uRXJyb3IgKSB7XG5cblx0XHRcdHRoaXMub25FcnJvciggbWVzc2FnZSApO1xuXHRcdFx0XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS5lcnJvciggbWVzc2FnZSApO1xuXG5cdFx0fVxuXHRcdFxuXHR9LFxuXG5cdGFkYXB0VGV4dHVyZVRvWm9vbTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgdyA9IHRoaXMud2lkdGhzIFsgdGhpcy5fem9vbSBdO1xuXHRcdGNvbnN0IGggPSB0aGlzLmhlaWdodHNbIHRoaXMuX3pvb20gXTtcblxuXHRcdGNvbnN0IG1heFcgPSB0aGlzLm1heFc7XG5cdFx0Y29uc3QgbWF4SCA9IHRoaXMubWF4SDtcblxuXHRcdHRoaXMuX3djID0gTWF0aC5jZWlsKCB3IC8gbWF4VyApO1xuXHRcdHRoaXMuX2hjID0gTWF0aC5jZWlsKCBoIC8gbWF4SCApO1xuXG5cdFx0Zm9yKCBsZXQgeSA9IDA7IHkgPCB0aGlzLl9oYzsgeSsrICkge1xuXHRcdFx0Zm9yKCBsZXQgeCA9IDA7IHggPCB0aGlzLl93YzsgeCsrICkge1xuXHRcdFx0XHRjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblx0XHRcdFx0aWYoIHggPCAoIHRoaXMuX3djIC0gMSApICkgYy53aWR0aCA9IG1heFc7IGVsc2UgYy53aWR0aCA9IHcgLSAoIG1heFcgKiB4ICk7XG5cdFx0XHRcdGlmKCB5IDwgKCB0aGlzLl9oYyAtIDEgKSApIGMuaGVpZ2h0ID0gbWF4SDsgZWxzZSBjLmhlaWdodCA9IGggLSAoIG1heEggKiB5ICk7XG5cdFx0XHRcdHRoaXMuX2NhbnZhcy5wdXNoKCBjICk7XG5cdFx0XHRcdHRoaXMuX2N0eC5wdXNoKCBjLmdldENvbnRleHQoICcyZCcgKSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9LFxuXG5cdGNvbXBvc2VGcm9tVGlsZTogZnVuY3Rpb24gKCB4LCB5LCB0ZXh0dXJlICkge1xuXG5cdFx0Y29uc3QgbWF4VyA9IHRoaXMubWF4Vztcblx0XHRjb25zdCBtYXhIID0gdGhpcy5tYXhIO1xuXG5cdFx0eCAqPSA1MTI7XG5cdFx0eSAqPSA1MTI7XG5cblx0XHRjb25zdCBweCA9IE1hdGguZmxvb3IoIHggLyBtYXhXICk7XG5cdFx0Y29uc3QgcHkgPSBNYXRoLmZsb29yKCB5IC8gbWF4SCApO1xuXG5cdFx0eCAtPSBweCAqIG1heFc7XG5cdFx0eSAtPSBweSAqIG1heEg7XG5cblx0XHR0aGlzLl9jdHhbIHB5ICogdGhpcy5fd2MgKyBweCBdLmRyYXdJbWFnZSggdGV4dHVyZSwgMCwgMCwgdGV4dHVyZS53aWR0aCwgdGV4dHVyZS5oZWlnaHQsIHgsIHksIDUxMiwgNTEyICk7XG5cblx0XHR0aGlzLnByb2dyZXNzKCk7XG5cdFx0XG5cdH0sXG5cblx0cHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5fY291bnQrKztcblx0XHRcblx0XHR0aGlzLnNldFByb2dyZXNzKCB0aGlzLl9jb3VudCwgdGhpcy5fdG90YWwgKTtcblx0XHRcblx0XHRpZiAoIHRoaXMuX2NvdW50ID09PSB0aGlzLl90b3RhbCkge1xuXG5cdFx0XHR0aGlzLmNhbnZhcyA9IHRoaXMuX2NhbnZhcztcblx0XHRcdHRoaXMucGFub0lkID0gdGhpcy5fcGFub0lkO1xuXHRcdFx0dGhpcy56b29tID0gdGhpcy5fem9vbTtcblxuXHRcdFx0aWYgKCB0aGlzLm9uUGFub3JhbWFMb2FkICkge1xuXG5cdFx0XHRcdHRoaXMub25QYW5vcmFtYUxvYWQoIHRoaXMuX2NhbnZhc1sgMCBdICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblxuXHRsb2FkRnJvbUlkOiBmdW5jdGlvbiggaWQgKSB7XG5cblx0XHR0aGlzLl9wYW5vSWQgPSBpZDtcblx0XHR0aGlzLmNvbXBvc2VQYW5vcmFtYSgpO1xuXG5cdH0sXG5cblx0Y29tcG9zZVBhbm9yYW1hOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnNldFByb2dyZXNzKCAwLCAxICk7XG5cdFx0XG5cdFx0Y29uc3QgdyA9IHRoaXMubGV2ZWxzV1sgdGhpcy5fem9vbSBdO1xuXHRcdGNvbnN0IGggPSB0aGlzLmxldmVsc0hbIHRoaXMuX3pvb20gXTtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdFxuXHRcdHRoaXMuX2NvdW50ID0gMDtcblx0XHR0aGlzLl90b3RhbCA9IHcgKiBoO1xuXG5cdFx0Y29uc3QgeyB1c2VXZWJHTCB9ID0gdGhpcy5fcGFyYW1ldGVycztcblxuXHRcdGZvciggbGV0IHkgPSAwOyB5IDwgaDsgeSsrICkge1xuXHRcdFx0Zm9yKCBsZXQgeCA9IDA7IHggPCB3OyB4KysgKSB7XG5cdFx0XHRcdGNvbnN0IHVybCA9ICdodHRwczovL2dlbzAuZ2dwaHQuY29tL2Niaz9jYl9jbGllbnQ9bWFwc19zdi50YWN0aWxlJmF1dGh1c2VyPTAmaGw9ZW4mb3V0cHV0PXRpbGUmem9vbT0nICsgdGhpcy5fem9vbSArICcmeD0nICsgeCArICcmeT0nICsgeSArICcmcGFub2lkPScgKyB0aGlzLl9wYW5vSWQgKyAnJm5idCZmb3Zlcj0yJztcblx0XHRcdFx0KCBmdW5jdGlvbiggeCwgeSApIHsgXG5cdFx0XHRcdFx0aWYoIHVzZVdlYkdMICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdGV4dHVyZSA9IFRleHR1cmVMb2FkZXIubG9hZCggdXJsLCBudWxsLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5jb21wb3NlRnJvbVRpbGUoIHgsIHksIHRleHR1cmUgKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5jb21wb3NlRnJvbVRpbGUoIHgsIHksIHRoaXMgKTtcdFx0XHRcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdGltZy5jcm9zc09yaWdpbiA9ICcnO1xuXHRcdFx0XHRcdFx0aW1nLnNyYyA9IHVybDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKSggeCwgeSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblxuXHRsb2FkOiBmdW5jdGlvbiAoIHBhbm9pZCApIHtcblxuXHRcdHRoaXMubG9hZFBhbm8oIHBhbm9pZCApO1xuXG5cdH0sXG5cblx0bG9hZFBhbm86IGZ1bmN0aW9uKCBpZCApIHtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMuX3Bhbm9DbGllbnQuZ2V0UGFub3JhbWFCeUlkKCBpZCwgZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzKSB7XG5cdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5TdHJlZXRWaWV3U3RhdHVzLk9LKSB7XG5cdFx0XHRcdHNlbGYucmVzdWx0ID0gcmVzdWx0O1xuXHRcdFx0XHRpZiggc2VsZi5vblBhbm9yYW1hRGF0YSApIHNlbGYub25QYW5vcmFtYURhdGEoIHJlc3VsdCApO1xuXHRcdFx0XHQvL3ZhciBoID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsLmNvbXB1dGVIZWFkaW5nKGxvY2F0aW9uLCByZXN1bHQubG9jYXRpb24ubGF0TG5nKTtcblx0XHRcdFx0Ly9yb3RhdGlvbiA9IChyZXN1bHQudGlsZXMuY2VudGVySGVhZGluZyAtIGgpICogTWF0aC5QSSAvIDE4MC4wO1xuXHRcdFx0XHRzZWxmLmNvcHlyaWdodCA9IHJlc3VsdC5jb3B5cmlnaHQ7XG5cdFx0XHRcdHNlbGYuX3Bhbm9JZCA9IHJlc3VsdC5sb2NhdGlvbi5wYW5vO1xuXHRcdFx0XHRzZWxmLmxvY2F0aW9uID0gbG9jYXRpb247XG5cdFx0XHRcdHNlbGYuY29tcG9zZVBhbm9yYW1hKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiggc2VsZi5vbk5vUGFub3JhbWFEYXRhICkgc2VsZi5vbk5vUGFub3JhbWFEYXRhKCBzdGF0dXMgKTtcblx0XHRcdFx0c2VsZi50aHJvd0Vycm9yKCdDb3VsZCBub3QgcmV0cmlldmUgcGFub3JhbWEgZm9yIHRoZSBmb2xsb3dpbmcgcmVhc29uOiAnICsgc3RhdHVzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0fSxcblxuXHRzZXRab29tOiBmdW5jdGlvbiggeiApIHtcblx0XHR0aGlzLl96b29tID0gejtcblx0XHR0aGlzLmFkYXB0VGV4dHVyZVRvWm9vbSgpO1xuXHR9XG5cdFxufSApO1xuXG5leHBvcnQgeyBHb29nbGVTdHJlZXRMb2FkZXIgfTsiLCJpbXBvcnQgeyBJbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi9JbWFnZVBhbm9yYW1hJztcbmltcG9ydCB7IEdvb2dsZVN0cmVldExvYWRlciB9IGZyb20gJy4uL2xvYWRlcnMvR29vZ2xlU3RyZWV0TG9hZGVyJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIEdvb2dsZSBzdHJlZXR2aWV3IHBhbm9yYW1hXG4gKiBcbiAqIFtIb3cgdG8gZ2V0IFBhbm9yYW1hIElEXXtAbGluayBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5OTE2MTQ5L2dvb2dsZS1tYXBzLXN0cmVldHZpZXctaG93LXRvLWdldC1wYW5vcmFtYS1pZH1cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHBhbm9JZCAtIFBhbm9yYW1hIGlkIGZyb20gR29vZ2xlIFN0cmVldHZpZXcgXG4gKiBAcGFyYW0ge3N0cmluZ30gW2FwaUtleV0gLSBHb29nbGUgU3RyZWV0IFZpZXcgQVBJIEtleVxuICovXG5mdW5jdGlvbiBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWEgKCBwYW5vSWQsIGFwaUtleSApIHtcblxuXHRJbWFnZVBhbm9yYW1hLmNhbGwoIHRoaXMgKTtcblxuXHR0aGlzLnBhbm9JZCA9IHBhbm9JZDtcblxuXHR0aGlzLmdzdkxvYWRlciA9IHVuZGVmaW5lZDtcblxuXHR0aGlzLmxvYWRSZXF1ZXN0ZWQgPSBmYWxzZTtcblxuXHR0aGlzLnNldHVwR29vZ2xlTWFwQVBJKCBhcGlLZXkgKTtcblxufVxuXG5Hb29nbGVTdHJlZXR2aWV3UGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWEsXG5cblx0LyoqXG5cdCAqIExvYWQgR29vZ2xlIFN0cmVldCBWaWV3IGJ5IHBhbm9yYW1hIGlkXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYW5vSWQgLSBHb2dvZ2xlIFN0cmVldCBWaWV3IHBhbm9yYW1hIGlkXG5cdCAqL1xuXHRsb2FkOiBmdW5jdGlvbiAoIHBhbm9JZCApIHtcblxuXHRcdHRoaXMubG9hZFJlcXVlc3RlZCA9IHRydWU7XG5cblx0XHRwYW5vSWQgPSAoIHBhbm9JZCB8fCB0aGlzLnBhbm9JZCApIHx8IHt9O1xuXG5cdFx0aWYgKCBwYW5vSWQgJiYgdGhpcy5nc3ZMb2FkZXIgKSB7XG5cblx0XHRcdHRoaXMubG9hZEdTVkxvYWRlciggcGFub0lkICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLmdzdkxvYWRlciA9IHt9O1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldHVwIEdvb2dsZSBNYXAgQVBJXG5cdCAqL1xuXHRzZXR1cEdvb2dsZU1hcEFQSTogZnVuY3Rpb24gKCBhcGlLZXkgKSB7XG5cblx0XHRjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc2NyaXB0JyApO1xuXHRcdHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzPyc7XG5cdFx0c2NyaXB0LnNyYyArPSBhcGlLZXkgPyAna2V5PScgKyBhcGlLZXkgOiAnJztcblx0XHRzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gdGhpcy5zZXRHU1ZMb2FkZXIuYmluZCggdGhpcyApO1xuXHRcdHNjcmlwdC5vbmxvYWQgPSB0aGlzLnNldEdTVkxvYWRlci5iaW5kKCB0aGlzICk7XG5cblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnaGVhZCcgKS5hcHBlbmRDaGlsZCggc2NyaXB0ICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IEdTViBMb2FkZXJcblx0ICovXG5cdHNldEdTVkxvYWRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5nc3ZMb2FkZXIgPSBuZXcgR29vZ2xlU3RyZWV0TG9hZGVyKCk7XG5cblx0XHRpZiAoIHRoaXMuZ3N2TG9hZGVyID09PSB7fSB8fCB0aGlzLmxvYWRSZXF1ZXN0ZWQgKSB7XG5cblx0XHRcdHRoaXMubG9hZCgpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBHU1YgTG9hZGVyXG5cdCAqIEByZXR1cm4ge29iamVjdH0gR1NWIExvYWRlciBpbnN0YW5jZVxuXHQgKi9cblx0Z2V0R1NWTG9hZGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5nc3ZMb2FkZXI7XG5cblx0fSxcblxuXHQvKipcblx0ICogTG9hZCBHU1YgTG9hZGVyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGFub0lkIC0gR29nb2dsZSBTdHJlZXQgVmlldyBwYW5vcmFtYSBpZFxuXHQgKi9cblx0bG9hZEdTVkxvYWRlcjogZnVuY3Rpb24gKCBwYW5vSWQgKSB7XG5cblx0XHR0aGlzLmxvYWRSZXF1ZXN0ZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuZ3N2TG9hZGVyLm9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApO1xuXG5cdFx0dGhpcy5nc3ZMb2FkZXIub25QYW5vcmFtYUxvYWQgPSB0aGlzLm9uTG9hZC5iaW5kKCB0aGlzICk7XG5cblx0XHR0aGlzLmdzdkxvYWRlci5zZXRab29tKCB0aGlzLmdldFpvb21MZXZlbCgpICk7XG5cblx0XHR0aGlzLmdzdkxvYWRlci5sb2FkKCBwYW5vSWQgKTtcblxuXHRcdHRoaXMuZ3N2TG9hZGVyLmxvYWRlZCA9IHRydWU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBwYW5vcmFtYSBpcyBsb2FkZWRcblx0ICogQHBhcmFtICB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhcyAtIENhbnZhcyB3aGVyZSB0aGUgdGlsZXMgaGF2ZSBiZWVuIGRyYXduXG5cdCAqL1xuXHRvbkxvYWQ6IGZ1bmN0aW9uICggY2FudmFzICkge1xuXG5cdFx0aWYgKCAhdGhpcy5nc3ZMb2FkZXIgKSB7IHJldHVybjsgfVxuXG5cdFx0SW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUub25Mb2FkLmNhbGwoIHRoaXMsIG5ldyBUSFJFRS5UZXh0dXJlKCBjYW52YXMgKSApO1xuXG5cdH0sXG5cblx0cmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuZ3N2TG9hZGVyID0gdW5kZWZpbmVkO1xuXG5cdFx0SW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUucmVzZXQuY2FsbCggdGhpcyApO1xuXG5cdH1cblxufSApO1xuXG5leHBvcnQgeyBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWEgfTsiLCIvKipcbiAqIFN0ZXJlb2dyYXBoaWMgcHJvamVjdGlvbiBzaGFkZXJcbiAqIGJhc2VkIG9uIGh0dHA6Ly9ub3RsaW9uLmdpdGh1Yi5pby9zdHJlZXR2aWV3LXN0ZXJlb2dyYXBoaWNcbiAqIEBhdXRob3IgcGNoZW42NlxuICovXG5cbmltcG9ydCAndGhyZWUnO1xuXG5jb25zdCBTdGVyZW9ncmFwaGljU2hhZGVyID0ge1xuXG5cdHVuaWZvcm1zOiB7XG5cblx0XHRcInREaWZmdXNlXCI6ICAgeyB2YWx1ZTogbmV3IFRIUkVFLlRleHR1cmUoKSB9LFxuXHRcdFwicmVzb2x1dGlvblwiOiB7IHZhbHVlOiAxLjAgfSxcblx0XHRcInRyYW5zZm9ybVwiOiAgeyB2YWx1ZTogbmV3IFRIUkVFLk1hdHJpeDQoKSB9LFxuXHRcdFwiem9vbVwiOiBcdCAgeyB2YWx1ZTogMS4wIH0sXG5cdFx0XCJvcGFjaXR5XCI6ICAgIHsgdmFsdWU6IDEuMCB9XG5cblx0fSxcblxuXHR2ZXJ0ZXhTaGFkZXI6IFtcblxuXHRcdFwidmFyeWluZyB2ZWMyIHZVdjtcIixcblxuXHRcdFwidm9pZCBtYWluKCkge1wiLFxuXG5cdFx0XHRcInZVdiA9IHV2O1wiLFxuXHRcdFx0XCJnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcIixcblxuXHRcdFwifVwiIFxuXG5cdF0uam9pbiggXCJcXG5cIiApLFxuXG5cdGZyYWdtZW50U2hhZGVyOiBbXG5cblx0XHRcInVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1wiLFxuXHRcdFwidW5pZm9ybSBmbG9hdCByZXNvbHV0aW9uO1wiLFxuXHRcdFwidW5pZm9ybSBtYXQ0IHRyYW5zZm9ybTtcIixcblx0XHRcInVuaWZvcm0gZmxvYXQgem9vbTtcIixcblx0XHRcInVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcIixcblxuXHRcdFwidmFyeWluZyB2ZWMyIHZVdjtcIixcblxuXHRcdFwiY29uc3QgZmxvYXQgUEkgPSAzLjE0MTU5MjY1MzU4OTc5MztcIixcblxuXHRcdFwidm9pZCBtYWluKCl7XCIsXG5cblx0XHRcdFwidmVjMiBwb3NpdGlvbiA9IC0xLjAgKyAgMi4wICogdlV2O1wiLFxuXG5cdFx0XHRcInBvc2l0aW9uICo9IHZlYzIoIHpvb20gKiByZXNvbHV0aW9uLCB6b29tICogMC41ICk7XCIsXG5cblx0XHRcdFwiZmxvYXQgeDJ5MiA9IHBvc2l0aW9uLnggKiBwb3NpdGlvbi54ICsgcG9zaXRpb24ueSAqIHBvc2l0aW9uLnk7XCIsXG5cdFx0XHRcInZlYzMgc3BoZXJlX3BudCA9IHZlYzMoIDIuICogcG9zaXRpb24sIHgyeTIgLSAxLiApIC8gKCB4MnkyICsgMS4gKTtcIixcblxuXHRcdFx0XCJzcGhlcmVfcG50ID0gdmVjMyggdHJhbnNmb3JtICogdmVjNCggc3BoZXJlX3BudCwgMS4wICkgKTtcIixcblxuXHRcdFx0XCJ2ZWMyIHNhbXBsZVVWID0gdmVjMihcIixcblx0XHRcdFx0XCIoYXRhbihzcGhlcmVfcG50LnksIHNwaGVyZV9wbnQueCkgLyBQSSArIDEuMCkgKiAwLjUsXCIsXG5cdFx0XHRcdFwiKGFzaW4oc3BoZXJlX3BudC56KSAvIFBJICsgMC41KVwiLFxuXHRcdFx0XCIpO1wiLFxuXG5cdFx0XHRcImdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHNhbXBsZVVWICk7XCIsXG5cblx0XHRcdFwiZ2xfRnJhZ0NvbG9yLmEgKj0gb3BhY2l0eTtcIixcblxuXHRcdFwifVwiXG5cblx0XS5qb2luKCBcIlxcblwiIClcblxufTtcblxuZXhwb3J0IHsgU3RlcmVvZ3JhcGhpY1NoYWRlciB9OyIsImltcG9ydCB7IEltYWdlUGFub3JhbWEgfSBmcm9tICcuL0ltYWdlUGFub3JhbWEnO1xuaW1wb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5pbXBvcnQgeyBDT05UUk9MUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBTdGVyZW9ncmFwaGljU2hhZGVyIH0gZnJvbSAnLi4vc2hhZGVycy9TdGVyZW9ncmFwaGljU2hhZGVyJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIExpdHRsZSBQbGFuZXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXHRcdC0gVHlwZSBvZiBsaXR0bGUgcGxhbmV0IGJhc2ljIGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFx0XHQtIFVSTCBmb3IgdGhlIGltYWdlIHNvdXJjZVxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTEwMDAwXSAtIFNpemUgb2YgcGxhbmUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmF0aW89MC41XSAgLSBSYXRpbyBvZiBwbGFuZSBnZW9tZXRyeSdzIGhlaWdodCBhZ2FpbnN0IHdpZHRoXG4gKi9cbmZ1bmN0aW9uIExpdHRsZVBsYW5ldCAoIHR5cGUgPSAnaW1hZ2UnLCBzb3VyY2UsIHNpemUgPSAxMDAwMCwgcmF0aW8gPSAwLjUgKSB7XG5cblx0aWYgKCB0eXBlID09PSAnaW1hZ2UnICkge1xuXG5cdFx0SW1hZ2VQYW5vcmFtYS5jYWxsKCB0aGlzLCBzb3VyY2UsIHRoaXMuY3JlYXRlR2VvbWV0cnkoIHNpemUsIHJhdGlvICksIHRoaXMuY3JlYXRlTWF0ZXJpYWwoIHNpemUgKSApO1xuXG5cdH1cblxuXHR0aGlzLnNpemUgPSBzaXplO1xuXHR0aGlzLnJhdGlvID0gcmF0aW87XG5cdHRoaXMuRVBTID0gMC4wMDAwMDE7XG5cdHRoaXMuZnJhbWVJZDtcblxuXHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdHRoaXMudXNlck1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHR0aGlzLnF1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0dGhpcy5xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdHRoaXMucXVhdEN1ciA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdHRoaXMucXVhdFNsZXJwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXHR0aGlzLnZlY3RvclggPSBuZXcgVEhSRUUuVmVjdG9yMyggMSwgMCwgMCApO1xuXHR0aGlzLnZlY3RvclkgPSBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMSwgMCApO1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3dpbmRvdy1yZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplICk7XG5cbn1cblxuTGl0dGxlUGxhbmV0LnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIEltYWdlUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogTGl0dGxlUGxhbmV0LFxuXG5cdGFkZDogZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAxICkge1xuXHRcdFx0XG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdHRoaXMuYWRkKCBhcmd1bWVudCApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuXHRcdFx0b2JqZWN0Lm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xuXHRcdFx0XG5cdFx0fVxuXG5cdFx0SW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUuYWRkLmNhbGwoIHRoaXMsIG9iamVjdCApO1xuXG5cdH0sXG5cblx0Y3JlYXRlR2VvbWV0cnk6IGZ1bmN0aW9uICggc2l6ZSwgcmF0aW8gKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoIHNpemUsIHNpemUgKiByYXRpbyApO1xuXG5cdH0sXG5cblx0Y3JlYXRlTWF0ZXJpYWw6IGZ1bmN0aW9uICggc2l6ZSApIHtcblxuXHRcdGNvbnN0IHNoYWRlciA9IFN0ZXJlb2dyYXBoaWNTaGFkZXIsIHVuaWZvcm1zID0gc2hhZGVyLnVuaWZvcm1zO1xuXG5cdFx0dW5pZm9ybXMuem9vbS52YWx1ZSA9IHNpemU7XG5cdFx0dW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IDAuMDtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHtcblxuXHRcdFx0dW5pZm9ybXM6IHVuaWZvcm1zLFxuXHRcdFx0dmVydGV4U2hhZGVyOiBzaGFkZXIudmVydGV4U2hhZGVyLFxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IHNoYWRlci5mcmFnbWVudFNoYWRlcixcblx0XHRcdHNpZGU6IFRIUkVFLkJhY2tTaWRlLFxuXHRcdFx0dHJhbnNwYXJlbnQ6IHRydWVcblxuXHRcdH0gKTtcblx0XHRcblx0fSxcblxuXHRyZWdpc3Rlck1vdXNlRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V3aGVlbCcsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTU1vdXNlU2Nyb2xsJywgdGhpcy5vbk1vdXNlV2hlZWwuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCB0aGlzLm9uQ29udGV4dE1lbnUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdFxuXHR9LFxuXG5cdHVucmVnaXN0ZXJNb3VzZUV2ZW50czogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24uYmluZCggdGhpcyApLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIHRoaXMub25Nb3VzZURvd24uYmluZCggdGhpcyApLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ0RPTU1vdXNlU2Nyb2xsJywgdGhpcy5vbk1vdXNlV2hlZWwuYmluZCggdGhpcyApLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0TWVudS5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0XG5cdH0sXG5cblx0b25Nb3VzZURvd246IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRjb25zdCBpbnB1dENvdW50ID0gKCBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkgfHwgMSA7XG5cblx0XHRzd2l0Y2ggKCBpbnB1dENvdW50ICkge1xuXG5cdFx0XHRjYXNlIDE6XG5cblx0XHRcdFx0Y29uc3QgeCA9ICggZXZlbnQuY2xpZW50WCA+PSAwICkgPyBldmVudC5jbGllbnRYIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFg7XG5cdFx0XHRcdGNvbnN0IHkgPSAoIGV2ZW50LmNsaWVudFkgPj0gMCApID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LnRvdWNoZXNbIDAgXS5jbGllbnRZO1xuXG5cdFx0XHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnVzZXJNb3VzZS5zZXQoIHgsIHkgKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAyOlxuXG5cdFx0XHRcdGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuXHRcdFx0XHRjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcblx0XHRcdFx0Y29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG5cdFx0XHRcdHRoaXMudXNlck1vdXNlLnBpbmNoRGlzdGFuY2UgPSBkaXN0YW5jZTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdH1cblxuXHRcdHRoaXMub25VcGRhdGVDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0b25Nb3VzZU1vdmU6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRjb25zdCBpbnB1dENvdW50ID0gKCBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkgfHwgMSA7XG5cblx0XHRzd2l0Y2ggKCBpbnB1dENvdW50ICkge1xuXG5cdFx0XHRjYXNlIDE6XG5cblx0XHRcdFx0Y29uc3QgeCA9ICggZXZlbnQuY2xpZW50WCA+PSAwICkgPyBldmVudC5jbGllbnRYIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFg7XG5cdFx0XHRcdGNvbnN0IHkgPSAoIGV2ZW50LmNsaWVudFkgPj0gMCApID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LnRvdWNoZXNbIDAgXS5jbGllbnRZO1xuXG5cdFx0XHRcdGNvbnN0IGFuZ2xlWCA9IFRIUkVFLk1hdGguZGVnVG9SYWQoIHggLSB0aGlzLnVzZXJNb3VzZS54ICkgKiAwLjQ7XG5cdFx0XHRcdGNvbnN0IGFuZ2xlWSA9IFRIUkVFLk1hdGguZGVnVG9SYWQoIHkgLSB0aGlzLnVzZXJNb3VzZS55ICkgKiAwLjQ7XG5cblx0XHRcdFx0aWYgKCB0aGlzLmRyYWdnaW5nICkge1xuXHRcdFx0XHRcdHRoaXMucXVhdEEuc2V0RnJvbUF4aXNBbmdsZSggdGhpcy52ZWN0b3JZLCBhbmdsZVggKTtcblx0XHRcdFx0XHR0aGlzLnF1YXRCLnNldEZyb21BeGlzQW5nbGUoIHRoaXMudmVjdG9yWCwgYW5nbGVZICk7XG5cdFx0XHRcdFx0dGhpcy5xdWF0Q3VyLm11bHRpcGx5KCB0aGlzLnF1YXRBICkubXVsdGlwbHkoIHRoaXMucXVhdEIgKTtcblx0XHRcdFx0XHR0aGlzLnVzZXJNb3VzZS5zZXQoIHgsIHkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cblx0XHRcdFx0Y29uc3QgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblxuXHRcdFx0XHR0aGlzLmFkZFpvb21EZWx0YSggdGhpcy51c2VyTW91c2UucGluY2hEaXN0YW5jZSAtIGRpc3RhbmNlICk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRvbk1vdXNlVXA6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cblx0fSxcblxuXHRvbk1vdXNlV2hlZWw6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0bGV0IGRlbHRhID0gMDtcblxuXHRcdGlmICggZXZlbnQud2hlZWxEZWx0YSAhPT0gdW5kZWZpbmVkICkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblxuXHRcdFx0ZGVsdGEgPSBldmVudC53aGVlbERlbHRhO1xuXG5cdFx0fSBlbHNlIGlmICggZXZlbnQuZGV0YWlsICE9PSB1bmRlZmluZWQgKSB7IC8vIEZpcmVmb3hcblxuXHRcdFx0ZGVsdGEgPSAtIGV2ZW50LmRldGFpbDtcblxuXHRcdH1cblxuXHRcdHRoaXMuYWRkWm9vbURlbHRhKCBkZWx0YSApO1xuXHRcdHRoaXMub25VcGRhdGVDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0YWRkWm9vbURlbHRhOiBmdW5jdGlvbiAoIGRlbHRhICkge1xuXG5cdFx0Y29uc3QgdW5pZm9ybXMgPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zO1xuXHRcdGNvbnN0IGxvd2VyQm91bmQgPSB0aGlzLnNpemUgKiAwLjE7XG5cdFx0Y29uc3QgdXBwZXJCb3VuZCA9IHRoaXMuc2l6ZSAqIDEwO1xuXG5cdFx0dW5pZm9ybXMuem9vbS52YWx1ZSArPSBkZWx0YTtcblxuXHRcdGlmICggdW5pZm9ybXMuem9vbS52YWx1ZSA8PSBsb3dlckJvdW5kICkge1xuXG5cdFx0XHR1bmlmb3Jtcy56b29tLnZhbHVlID0gbG93ZXJCb3VuZDtcblxuXHRcdH0gZWxzZSBpZiAoIHVuaWZvcm1zLnpvb20udmFsdWUgPj0gdXBwZXJCb3VuZCApIHtcblxuXHRcdFx0dW5pZm9ybXMuem9vbS52YWx1ZSA9IHVwcGVyQm91bmQ7XG5cblx0XHR9XG5cblx0fSxcblxuXHRvblVwZGF0ZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMub25VcGRhdGVDYWxsYmFjay5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHRoaXMucXVhdFNsZXJwLnNsZXJwKCB0aGlzLnF1YXRDdXIsIDAuMSApO1xuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudHJhbnNmb3JtLnZhbHVlLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCB0aGlzLnF1YXRTbGVycCApO1xuXHRcdFxuXHRcdGlmICggIXRoaXMuZHJhZ2dpbmcgJiYgMS4wIC0gdGhpcy5xdWF0U2xlcnAuY2xvbmUoKS5kb3QoIHRoaXMucXVhdEN1ciApIDwgdGhpcy5FUFMgKSB7XG5cdFx0XHRcblx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKCB0aGlzLmZyYW1lSWQgKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnF1YXRDdXIuc2V0KCAwLCAwLCAwLCAxICk7XG5cdFx0dGhpcy5xdWF0U2xlcnAuc2V0KCAwLCAwLCAwLCAxICk7XG5cdFx0dGhpcy5vblVwZGF0ZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZSA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG5cdFx0dGhpcy5yZWdpc3Rlck1vdXNlRXZlbnRzKCk7XG5cdFx0dGhpcy5vblVwZGF0ZUNhbGxiYWNrKCk7XG5cdFx0XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ2Rpc2FibGVDb250cm9sJyB9ICk7XG5cdFx0XG5cdH0sXG5cblx0b25MZWF2ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy51bnJlZ2lzdGVyTW91c2VFdmVudHMoKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdlbmFibGVDb250cm9sJywgZGF0YTogQ09OVFJPTFMuT1JCSVQgfSApO1xuXG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMuZnJhbWVJZCApO1xuXG5cdFx0SW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUub25MZWF2ZS5jYWxsKCB0aGlzICk7XG5cdFx0XG5cdH0sXG5cblx0b25XaW5kb3dSZXNpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZSA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG5cdH0sXG5cblx0b25Db250ZXh0TWVudTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG5cdH0sXG5cblx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1x0XG5cblx0XHRJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgeyBMaXR0bGVQbGFuZXQgfTsiLCJpbXBvcnQgeyBMaXR0bGVQbGFuZXQgfSBmcm9tICcuL0xpdHRsZVBsYW5ldCc7XG5pbXBvcnQgeyBJbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi9JbWFnZVBhbm9yYW1hJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIEltYWdlIExpdHRsZSBQbGFuZXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcdFx0LSBVUkwgZm9yIHRoZSBpbWFnZSBzb3VyY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT0xMDAwMF0gLSBTaXplIG9mIHBsYW5lIGdlb21ldHJ5XG4gKiBAcGFyYW0ge251bWJlcn0gW3JhdGlvPTAuNV0gIC0gUmF0aW8gb2YgcGxhbmUgZ2VvbWV0cnkncyBoZWlnaHQgYWdhaW5zdCB3aWR0aFxuICovXG5mdW5jdGlvbiBJbWFnZUxpdHRsZVBsYW5ldCAoIHNvdXJjZSwgc2l6ZSwgcmF0aW8gKSB7XG5cblx0TGl0dGxlUGxhbmV0LmNhbGwoIHRoaXMsICdpbWFnZScsIHNvdXJjZSwgc2l6ZSwgcmF0aW8gKTtcblxufVxuXG5JbWFnZUxpdHRsZVBsYW5ldC5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBMaXR0bGVQbGFuZXQucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogSW1hZ2VMaXR0bGVQbGFuZXQsXG5cblx0b25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cblx0XHR0aGlzLnVwZGF0ZVRleHR1cmUoIHRleHR1cmUgKTtcblxuXHRcdExpdHRsZVBsYW5ldC5wcm90b3R5cGUub25Mb2FkLmNhbGwoIHRoaXMgKTtcblx0XHRJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgdGV4dHVyZSApO1xuXG5cdH0sXG5cdFxuXHR1cGRhdGVUZXh0dXJlOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cblx0XHR0ZXh0dXJlLm1pbkZpbHRlciA9IHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuXHRcdFxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbICd0RGlmZnVzZScgXS52YWx1ZSA9IHRleHR1cmU7XG5cblx0fSxcblxuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB0RGlmZnVzZSA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbICd0RGlmZnVzZScgXTtcblxuXHRcdGlmICggdERpZmZ1c2UgJiYgdERpZmZ1c2UudmFsdWUgKSB7XG5cblx0XHRcdHREaWZmdXNlLnZhbHVlLmRpc3Bvc2UoKTtcblxuXHRcdH1cblxuXHRcdExpdHRsZVBsYW5ldC5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKCB0aGlzICk7XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IEltYWdlTGl0dGxlUGxhbmV0IH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSAnLi4vbWVkaWEvTWVkaWEnO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogQ2FtZXJhIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FtZXJhUGFub3JhbWEgKCkge1xuXG5cdGNvbnN0IHJhZGl1cyA9IDUwMDA7XG5cdGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUJ1ZmZlckdlb21ldHJ5KCByYWRpdXMsIDYwLCA0MCApO1xuXHRjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyB2aXNpYmxlOiBmYWxzZSB9KTtcblxuXHRQYW5vcmFtYS5jYWxsKCB0aGlzLCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuXHR0aGlzLm1lZGlhID0gbmV3IE1lZGlhKCk7XG5cdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyJywgdGhpcy5zdGFydC5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnbGVhdmUnLCB0aGlzLnN0b3AuYmluZCggdGhpcyApICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIHRoaXMub25QYW5vbGVuc0NvbnRhaW5lci5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtc2NlbmUnLCB0aGlzLm9uUGFub2xlbnNTY2VuZS5iaW5kKCB0aGlzICkgKTtcblxufVxuXG5DYW1lcmFQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBDYW1lcmFQYW5vcmFtYSxcblxuXHRvblBhbm9sZW5zQ29udGFpbmVyOiBmdW5jdGlvbiAoIHsgY29udGFpbmVyIH0gKSB7XG5cblx0XHR0aGlzLm1lZGlhLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuXHR9LFxuXG5cdG9uUGFub2xlbnNTY2VuZTogZnVuY3Rpb24gKCB7IHNjZW5lIH0gKSB7XG5cblx0XHR0aGlzLm1lZGlhLnNjZW5lID0gc2NlbmU7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xuXG5cdFx0bWVkaWEuc3RhcnQoKVxuXHRcdC50aGVuKCBmdW5jdGlvbiAoIHN0cmVhbSApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmFjdGl2ZSApIHtcblxuXHRcdFx0XHRtZWRpYS5hdHRhY2hWaWRlb1NvdXJjZU9iamVjdCggc3RyZWFtICk7XG5cblx0XHRcdH1cblxuXHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm1lZGlhLnN0b3AoKTtcblxuXHR9LFxuXG59ICk7XG5cbmV4cG9ydCB7IENhbWVyYVBhbm9yYW1hIH07IiwiaW1wb3J0ICd0aHJlZSc7XG5cbmZ1bmN0aW9uIE9yYml0Q29udHJvbHMgKCBvYmplY3QsIGRvbUVsZW1lbnQgKSB7XG5cblx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuZG9tRWxlbWVudCA9ICggZG9tRWxlbWVudCAhPT0gdW5kZWZpbmVkICkgPyBkb21FbGVtZW50IDogZG9jdW1lbnQ7XG5cdHRoaXMuZnJhbWVJZDtcblxuXHQvLyBBUElcblxuXHQvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcblx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHQvLyBcInRhcmdldFwiIHNldHMgdGhlIGxvY2F0aW9uIG9mIGZvY3VzLCB3aGVyZSB0aGUgY29udHJvbCBvcmJpdHMgYXJvdW5kXG5cdC8vIGFuZCB3aGVyZSBpdCBwYW5zIHdpdGggcmVzcGVjdCB0by5cblx0dGhpcy50YXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdC8vIGNlbnRlciBpcyBvbGQsIGRlcHJlY2F0ZWQ7IHVzZSBcInRhcmdldFwiIGluc3RlYWRcblx0dGhpcy5jZW50ZXIgPSB0aGlzLnRhcmdldDtcblxuXHQvLyBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yXG5cdC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5cdHRoaXMubm9ab29tID0gZmFsc2U7XG5cdHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG5cdC8vIExpbWl0cyB0byBob3cgZmFyIHlvdSBjYW4gZG9sbHkgaW4gYW5kIG91dCAoIFBlcnNwZWN0aXZlQ2FtZXJhIG9ubHkgKVxuXHR0aGlzLm1pbkRpc3RhbmNlID0gMDtcblx0dGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG5cdC8vIExpbWl0cyB0byBob3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuXHR0aGlzLm1pblpvb20gPSAwO1xuXHR0aGlzLm1heFpvb20gPSBJbmZpbml0eTtcblxuXHQvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuXHR0aGlzLm5vUm90YXRlID0gZmFsc2U7XG5cdHRoaXMucm90YXRlU3BlZWQgPSAtMC4xNTtcblxuXHQvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuXHR0aGlzLm5vUGFuID0gdHJ1ZTtcblx0dGhpcy5rZXlQYW5TcGVlZCA9IDcuMDtcdC8vIHBpeGVscyBtb3ZlZCBwZXIgYXJyb3cga2V5IHB1c2hcblxuXHQvLyBTZXQgdG8gdHJ1ZSB0byBhdXRvbWF0aWNhbGx5IHJvdGF0ZSBhcm91bmQgdGhlIHRhcmdldFxuXHR0aGlzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblx0dGhpcy5hdXRvUm90YXRlU3BlZWQgPSAyLjA7IC8vIDMwIHNlY29uZHMgcGVyIHJvdW5kIHdoZW4gZnBzIGlzIDYwXG5cblx0Ly8gSG93IGZhciB5b3UgY2FuIG9yYml0IHZlcnRpY2FsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG5cdC8vIFJhbmdlIGlzIDAgdG8gTWF0aC5QSSByYWRpYW5zLlxuXHR0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG5cdHRoaXMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEk7IC8vIHJhZGlhbnNcblxuXHQvLyBNb21lbnR1bVxuICBcdHRoaXMubW9tZW50dW1EYW1waW5nRmFjdG9yID0gMC45MDtcbiAgXHR0aGlzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciA9IC0wLjAwNTtcbiAgXHR0aGlzLm1vbWVudHVtS2V5ZG93bkZhY3RvciA9IDIwO1xuXG4gIFx0Ly8gRm92XG4gIFx0dGhpcy5taW5Gb3YgPSAzMDtcbiAgXHR0aGlzLm1heEZvdiA9IDEyMDtcblxuXHQvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgaG9yaXpvbnRhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuXHQvLyBJZiBzZXQsIG11c3QgYmUgYSBzdWItaW50ZXJ2YWwgb2YgdGhlIGludGVydmFsIFsgLSBNYXRoLlBJLCBNYXRoLlBJIF0uXG5cdHRoaXMubWluQXppbXV0aEFuZ2xlID0gLSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuXHR0aGlzLm1heEF6aW11dGhBbmdsZSA9IEluZmluaXR5OyAvLyByYWRpYW5zXG5cblx0Ly8gU2V0IHRvIHRydWUgdG8gZGlzYWJsZSB1c2Ugb2YgdGhlIGtleXNcblx0dGhpcy5ub0tleXMgPSBmYWxzZTtcblxuXHQvLyBUaGUgZm91ciBhcnJvdyBrZXlzXG5cdHRoaXMua2V5cyA9IHsgTEVGVDogMzcsIFVQOiAzOCwgUklHSFQ6IDM5LCBCT1RUT006IDQwIH07XG5cblx0Ly8gTW91c2UgYnV0dG9uc1xuXHR0aGlzLm1vdXNlQnV0dG9ucyA9IHsgT1JCSVQ6IFRIUkVFLk1PVVNFLkxFRlQsIFpPT006IFRIUkVFLk1PVVNFLk1JRERMRSwgUEFOOiBUSFJFRS5NT1VTRS5SSUdIVCB9O1xuXG5cdC8vLy8vLy8vLy8vL1xuXHQvLyBpbnRlcm5hbHNcblxuXHR2YXIgc2NvcGUgPSB0aGlzO1xuXG5cdHZhciBFUFMgPSAxMGUtODtcblx0dmFyIE1FUFMgPSAxMGUtNTtcblxuXHR2YXIgcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0dmFyIHJvdGF0ZURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHR2YXIgcGFuU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0dmFyIHBhbkRlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0dmFyIHBhbk9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0dmFyIG9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0dmFyIGRvbGx5U3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgZG9sbHlFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgZG9sbHlEZWx0YSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0dmFyIHRoZXRhO1xuXHR2YXIgcGhpO1xuXHR2YXIgcGhpRGVsdGEgPSAwO1xuXHR2YXIgdGhldGFEZWx0YSA9IDA7XG5cdHZhciBzY2FsZSA9IDE7XG5cdHZhciBwYW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdHZhciBsYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR2YXIgbGFzdFF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdHZhciBtb21lbnR1bUxlZnQgPSAwLCBtb21lbnR1bVVwID0gMDtcblx0dmFyIGV2ZW50Q3VycmVudCwgZXZlbnRQcmV2aW91cztcblx0dmFyIG1vbWVudHVtT24gPSBmYWxzZTtcblxuXHR2YXIga2V5VXAsIGtleUJvdHRvbSwga2V5TGVmdCwga2V5UmlnaHQ7XG5cblx0dmFyIFNUQVRFID0geyBOT05FIDogLTEsIFJPVEFURSA6IDAsIERPTExZIDogMSwgUEFOIDogMiwgVE9VQ0hfUk9UQVRFIDogMywgVE9VQ0hfRE9MTFkgOiA0LCBUT1VDSF9QQU4gOiA1IH07XG5cblx0dmFyIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuXHQvLyBmb3IgcmVzZXRcblxuXHR0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuXHR0aGlzLnBvc2l0aW9uMCA9IHRoaXMub2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG5cdHRoaXMuem9vbTAgPSB0aGlzLm9iamVjdC56b29tO1xuXG5cdC8vIHNvIGNhbWVyYS51cCBpcyB0aGUgb3JiaXQgYXhpc1xuXG5cdHZhciBxdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMoIG9iamVjdC51cCwgbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKSApO1xuXHR2YXIgcXVhdEludmVyc2UgPSBxdWF0LmNsb25lKCkuaW52ZXJzZSgpO1xuXG5cdC8vIGV2ZW50c1xuXG5cdHZhciBjaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblx0dmFyIHN0YXJ0RXZlbnQgPSB7IHR5cGU6ICdzdGFydCcgfTtcblx0dmFyIGVuZEV2ZW50ID0geyB0eXBlOiAnZW5kJyB9O1xuXG5cdHRoaXMuc2V0TGFzdFF1YXRlcm5pb24gPSBmdW5jdGlvbiAoIHF1YXRlcm5pb24gKSB7XG5cdFx0bGFzdFF1YXRlcm5pb24uY29weSggcXVhdGVybmlvbiApO1xuXHRcdHNjb3BlLm9iamVjdC5xdWF0ZXJuaW9uLmNvcHkoIHF1YXRlcm5pb24gKTtcblx0fTtcblxuXHR0aGlzLmdldExhc3RQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbGFzdFBvc2l0aW9uO1xuXHR9XG5cblx0dGhpcy5yb3RhdGVMZWZ0ID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGlmICggYW5nbGUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0YW5nbGUgPSBnZXRBdXRvUm90YXRpb25BbmdsZSgpO1xuXG5cdFx0fVxuXG5cdFx0dGhldGFEZWx0YSAtPSBhbmdsZTtcblxuXG5cdH07XG5cblx0dGhpcy5yb3RhdGVVcCA9IGZ1bmN0aW9uICggYW5nbGUgKSB7XG5cblx0XHRpZiAoIGFuZ2xlID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGFuZ2xlID0gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKTtcblxuXHRcdH1cblxuXHRcdHBoaURlbHRhIC09IGFuZ2xlO1xuXG5cdH07XG5cblx0Ly8gcGFzcyBpbiBkaXN0YW5jZSBpbiB3b3JsZCBzcGFjZSB0byBtb3ZlIGxlZnRcblx0dGhpcy5wYW5MZWZ0ID0gZnVuY3Rpb24gKCBkaXN0YW5jZSApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcblxuXHRcdC8vIGdldCBYIGNvbHVtbiBvZiBtYXRyaXhcblx0XHRwYW5PZmZzZXQuc2V0KCB0ZVsgMCBdLCB0ZVsgMSBdLCB0ZVsgMiBdICk7XG5cdFx0cGFuT2Zmc2V0Lm11bHRpcGx5U2NhbGFyKCAtIGRpc3RhbmNlICk7XG5cblx0XHRwYW4uYWRkKCBwYW5PZmZzZXQgKTtcblxuXHR9O1xuXG5cdC8vIHBhc3MgaW4gZGlzdGFuY2UgaW4gd29ybGQgc3BhY2UgdG8gbW92ZSB1cFxuXHR0aGlzLnBhblVwID0gZnVuY3Rpb24gKCBkaXN0YW5jZSApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcblxuXHRcdC8vIGdldCBZIGNvbHVtbiBvZiBtYXRyaXhcblx0XHRwYW5PZmZzZXQuc2V0KCB0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdICk7XG5cdFx0cGFuT2Zmc2V0Lm11bHRpcGx5U2NhbGFyKCBkaXN0YW5jZSApO1xuXG5cdFx0cGFuLmFkZCggcGFuT2Zmc2V0ICk7XG5cblx0fTtcblxuXHQvLyBwYXNzIGluIHgseSBvZiBjaGFuZ2UgZGVzaXJlZCBpbiBwaXhlbCBzcGFjZSxcblx0Ly8gcmlnaHQgYW5kIGRvd24gYXJlIHBvc2l0aXZlXG5cdHRoaXMucGFuID0gZnVuY3Rpb24gKCBkZWx0YVgsIGRlbHRhWSApIHtcblxuXHRcdHZhciBlbGVtZW50ID0gc2NvcGUuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyBzY29wZS5kb21FbGVtZW50LmJvZHkgOiBzY29wZS5kb21FbGVtZW50O1xuXG5cdFx0aWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSApIHtcblxuXHRcdFx0Ly8gcGVyc3BlY3RpdmVcblx0XHRcdHZhciBwb3NpdGlvbiA9IHNjb3BlLm9iamVjdC5wb3NpdGlvbjtcblx0XHRcdHZhciBvZmZzZXQgPSBwb3NpdGlvbi5jbG9uZSgpLnN1Yiggc2NvcGUudGFyZ2V0ICk7XG5cdFx0XHR2YXIgdGFyZ2V0RGlzdGFuY2UgPSBvZmZzZXQubGVuZ3RoKCk7XG5cblx0XHRcdC8vIGhhbGYgb2YgdGhlIGZvdiBpcyBjZW50ZXIgdG8gdG9wIG9mIHNjcmVlblxuXHRcdFx0dGFyZ2V0RGlzdGFuY2UgKj0gTWF0aC50YW4oICggc2NvcGUub2JqZWN0LmZvdiAvIDIgKSAqIE1hdGguUEkgLyAxODAuMCApO1xuXG5cdFx0XHQvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XG5cdFx0XHRzY29wZS5wYW5MZWZ0KCAyICogZGVsdGFYICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xuXHRcdFx0c2NvcGUucGFuVXAoIDIgKiBkZWx0YVkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XG5cblx0XHR9IGVsc2UgaWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEgKSB7XG5cblx0XHRcdC8vIG9ydGhvZ3JhcGhpY1xuXHRcdFx0c2NvcGUucGFuTGVmdCggZGVsdGFYICogKHNjb3BlLm9iamVjdC5yaWdodCAtIHNjb3BlLm9iamVjdC5sZWZ0KSAvIGVsZW1lbnQuY2xpZW50V2lkdGggKTtcblx0XHRcdHNjb3BlLnBhblVwKCBkZWx0YVkgKiAoc2NvcGUub2JqZWN0LnRvcCAtIHNjb3BlLm9iamVjdC5ib3R0b20pIC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBvciBwZXJzcGVjdGl2ZVxuXHRcdFx0Y29uc29sZS53YXJuKCAnV0FSTklORzogT3JiaXRDb250cm9scy5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gcGFuIGRpc2FibGVkLicgKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMubW9tZW50dW0gPSBmdW5jdGlvbigpe1xuXHRcdFxuXHRcdGlmICggIW1vbWVudHVtT24gKSByZXR1cm47XG5cblx0XHRpZiAoIE1hdGguYWJzKCBtb21lbnR1bUxlZnQgKSA8IE1FUFMgJiYgTWF0aC5hYnMoIG1vbWVudHVtVXAgKSA8IE1FUFMgKSB7IFxuXG5cdFx0XHRtb21lbnR1bU9uID0gZmFsc2U7IFxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG1vbWVudHVtVXAgICAqPSB0aGlzLm1vbWVudHVtRGFtcGluZ0ZhY3Rvcjtcblx0XHRtb21lbnR1bUxlZnQgKj0gdGhpcy5tb21lbnR1bURhbXBpbmdGYWN0b3I7XG5cblx0XHR0aGV0YURlbHRhIC09IHRoaXMubW9tZW50dW1TY2FsaW5nRmFjdG9yICogbW9tZW50dW1MZWZ0O1xuXHRcdHBoaURlbHRhICAgLT0gdGhpcy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgKiBtb21lbnR1bVVwO1xuXG5cdH07XG5cblx0dGhpcy5kb2xseUluID0gZnVuY3Rpb24gKCBkb2xseVNjYWxlICkge1xuXG5cdFx0aWYgKCBkb2xseVNjYWxlID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGRvbGx5U2NhbGUgPSBnZXRab29tU2NhbGUoKTtcblxuXHRcdH1cblxuXHRcdGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgKSB7XG5cblx0XHRcdHNjYWxlIC89IGRvbGx5U2NhbGU7XG5cblx0XHR9IGVsc2UgaWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEgKSB7XG5cblx0XHRcdHNjb3BlLm9iamVjdC56b29tID0gTWF0aC5tYXgoIHRoaXMubWluWm9vbSwgTWF0aC5taW4oIHRoaXMubWF4Wm9vbSwgdGhpcy5vYmplY3Quem9vbSAqIGRvbGx5U2NhbGUgKSApO1xuXHRcdFx0c2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicgKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuZG9sbHlPdXQgPSBmdW5jdGlvbiAoIGRvbGx5U2NhbGUgKSB7XG5cblx0XHRpZiAoIGRvbGx5U2NhbGUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0ZG9sbHlTY2FsZSA9IGdldFpvb21TY2FsZSgpO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSApIHtcblxuXHRcdFx0c2NhbGUgKj0gZG9sbHlTY2FsZTtcblxuXHRcdH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuXHRcdFx0c2NvcGUub2JqZWN0Lnpvb20gPSBNYXRoLm1heCggdGhpcy5taW5ab29tLCBNYXRoLm1pbiggdGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSApICk7XG5cdFx0XHRzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1dBUk5JTkc6IE9yYml0Q29udHJvbHMuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoIGlnbm9yZVVwZGF0ZSApIHtcblxuXHRcdHZhciBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG5cdFx0b2Zmc2V0LmNvcHkoIHBvc2l0aW9uICkuc3ViKCB0aGlzLnRhcmdldCApO1xuXG5cdFx0Ly8gcm90YXRlIG9mZnNldCB0byBcInktYXhpcy1pcy11cFwiIHNwYWNlXG5cdFx0b2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdCApO1xuXG5cdFx0Ly8gYW5nbGUgZnJvbSB6LWF4aXMgYXJvdW5kIHktYXhpc1xuXG5cdFx0dGhldGEgPSBNYXRoLmF0YW4yKCBvZmZzZXQueCwgb2Zmc2V0LnogKTtcblxuXHRcdC8vIGFuZ2xlIGZyb20geS1heGlzXG5cblx0XHRwaGkgPSBNYXRoLmF0YW4yKCBNYXRoLnNxcnQoIG9mZnNldC54ICogb2Zmc2V0LnggKyBvZmZzZXQueiAqIG9mZnNldC56ICksIG9mZnNldC55ICk7XG5cblx0XHRpZiAoIHRoaXMuYXV0b1JvdGF0ZSAmJiBzdGF0ZSA9PT0gU1RBVEUuTk9ORSApIHtcblxuXHRcdFx0dGhpcy5yb3RhdGVMZWZ0KCBnZXRBdXRvUm90YXRpb25BbmdsZSgpICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLm1vbWVudHVtKCk7XG5cblx0XHR0aGV0YSArPSB0aGV0YURlbHRhO1xuXHRcdHBoaSArPSBwaGlEZWx0YTtcblxuXHRcdC8vIHJlc3RyaWN0IHRoZXRhIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcblx0XHR0aGV0YSA9IE1hdGgubWF4KCB0aGlzLm1pbkF6aW11dGhBbmdsZSwgTWF0aC5taW4oIHRoaXMubWF4QXppbXV0aEFuZ2xlLCB0aGV0YSApICk7XG5cblx0XHQvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuXHRcdHBoaSA9IE1hdGgubWF4KCB0aGlzLm1pblBvbGFyQW5nbGUsIE1hdGgubWluKCB0aGlzLm1heFBvbGFyQW5nbGUsIHBoaSApICk7XG5cblx0XHQvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlIEVQUyBhbmQgUEktRVBTXG5cdFx0cGhpID0gTWF0aC5tYXgoIEVQUywgTWF0aC5taW4oIE1hdGguUEkgLSBFUFMsIHBoaSApICk7XG5cblx0XHR2YXIgcmFkaXVzID0gb2Zmc2V0Lmxlbmd0aCgpICogc2NhbGU7XG5cblx0XHQvLyByZXN0cmljdCByYWRpdXMgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuXHRcdHJhZGl1cyA9IE1hdGgubWF4KCB0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbiggdGhpcy5tYXhEaXN0YW5jZSwgcmFkaXVzICkgKTtcblxuXHRcdC8vIG1vdmUgdGFyZ2V0IHRvIHBhbm5lZCBsb2NhdGlvblxuXHRcdHRoaXMudGFyZ2V0LmFkZCggcGFuICk7XG5cblx0XHRvZmZzZXQueCA9IHJhZGl1cyAqIE1hdGguc2luKCBwaGkgKSAqIE1hdGguc2luKCB0aGV0YSApO1xuXHRcdG9mZnNldC55ID0gcmFkaXVzICogTWF0aC5jb3MoIHBoaSApO1xuXHRcdG9mZnNldC56ID0gcmFkaXVzICogTWF0aC5zaW4oIHBoaSApICogTWF0aC5jb3MoIHRoZXRhICk7XG5cblx0XHQvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2Vcblx0XHRvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKCBxdWF0SW52ZXJzZSApO1xuXG5cdFx0cG9zaXRpb24uY29weSggdGhpcy50YXJnZXQgKS5hZGQoIG9mZnNldCApO1xuXG5cdFx0dGhpcy5vYmplY3QubG9va0F0KCB0aGlzLnRhcmdldCApO1xuXG5cdFx0dGhldGFEZWx0YSA9IDA7XG5cdFx0cGhpRGVsdGEgPSAwO1xuXHRcdHNjYWxlID0gMTtcblx0XHRwYW4uc2V0KCAwLCAwLCAwICk7XG5cblx0XHQvLyB1cGRhdGUgY29uZGl0aW9uIGlzOlxuXHRcdC8vIG1pbihjYW1lcmEgZGlzcGxhY2VtZW50LCBjYW1lcmEgcm90YXRpb24gaW4gcmFkaWFucyleMiA+IEVQU1xuXHRcdC8vIHVzaW5nIHNtYWxsLWFuZ2xlIGFwcHJveGltYXRpb24gY29zKHgvMikgPSAxIC0geF4yIC8gOFxuXHRcdGlmICggbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKCB0aGlzLm9iamVjdC5wb3NpdGlvbiApID4gRVBTXG5cdFx0ICAgIHx8IDggKiAoMSAtIGxhc3RRdWF0ZXJuaW9uLmRvdCh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKSkgPiBFUFMgKSB7XG5cblx0XHRcdGlnbm9yZVVwZGF0ZSAhPT0gdHJ1ZSAmJiB0aGlzLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cblx0XHRcdGxhc3RQb3NpdGlvbi5jb3B5KCB0aGlzLm9iamVjdC5wb3NpdGlvbiApO1xuXHRcdFx0bGFzdFF1YXRlcm5pb24uY29weSAodGhpcy5vYmplY3QucXVhdGVybmlvbiApO1xuXG5cdFx0fVxuXG5cdH07XG5cblxuXHR0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0c3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0dGhpcy50YXJnZXQuY29weSggdGhpcy50YXJnZXQwICk7XG5cdFx0dGhpcy5vYmplY3QucG9zaXRpb24uY29weSggdGhpcy5wb3NpdGlvbjAgKTtcblx0XHR0aGlzLm9iamVjdC56b29tID0gdGhpcy56b29tMDtcblxuXHRcdHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH07XG5cblx0dGhpcy5nZXRQb2xhckFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHBoaTtcblxuXHR9O1xuXG5cdHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhldGFcblxuXHR9O1xuXG5cdGZ1bmN0aW9uIGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkge1xuXG5cdFx0cmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHNjb3BlLmF1dG9Sb3RhdGVTcGVlZDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Wm9vbVNjYWxlKCkge1xuXG5cdFx0cmV0dXJuIE1hdGgucG93KCAwLjk1LCBzY29wZS56b29tU3BlZWQgKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gb25Nb3VzZURvd24oIGV2ZW50ICkge1xuXG5cdFx0bW9tZW50dW1PbiA9IGZhbHNlO1xuXG4gICBcdFx0bW9tZW50dW1MZWZ0ID0gbW9tZW50dW1VcCA9IDA7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoIGV2ZW50LmJ1dHRvbiA9PT0gc2NvcGUubW91c2VCdXR0b25zLk9SQklUICkge1xuXHRcdFx0aWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHJldHVybjtcblxuXHRcdFx0c3RhdGUgPSBTVEFURS5ST1RBVEU7XG5cblx0XHRcdHJvdGF0ZVN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG5cdFx0fSBlbHNlIGlmICggZXZlbnQuYnV0dG9uID09PSBzY29wZS5tb3VzZUJ1dHRvbnMuWk9PTSApIHtcblx0XHRcdGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRzdGF0ZSA9IFNUQVRFLkRPTExZO1xuXG5cdFx0XHRkb2xseVN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG5cdFx0fSBlbHNlIGlmICggZXZlbnQuYnV0dG9uID09PSBzY29wZS5tb3VzZUJ1dHRvbnMuUEFOICkge1xuXHRcdFx0aWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcblxuXHRcdFx0c3RhdGUgPSBTVEFURS5QQU47XG5cblx0XHRcdHBhblN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBzdGF0ZSAhPT0gU1RBVEUuTk9ORSApIHtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UgKTtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSApO1xuXHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuXHRcdH1cblxuXHRcdHNjb3BlLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBvbk1vdXNlTW92ZSggZXZlbnQgKSB7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBlbGVtZW50ID0gc2NvcGUuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyBzY29wZS5kb21FbGVtZW50LmJvZHkgOiBzY29wZS5kb21FbGVtZW50O1xuXG5cdFx0aWYgKCBzdGF0ZSA9PT0gU1RBVEUuUk9UQVRFICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRyb3RhdGVFbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cdFx0XHRyb3RhdGVEZWx0YS5zdWJWZWN0b3JzKCByb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0ICk7XG5cblx0XHRcdC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcblx0XHRcdHNjb3BlLnJvdGF0ZUxlZnQoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXG5cdFx0XHQvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcblx0XHRcdHNjb3BlLnJvdGF0ZVVwKCAyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG5cblx0XHRcdHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xuXG5cdFx0XHRpZiggZXZlbnRQcmV2aW91cyApe1xuXHRcdFx0XHRtb21lbnR1bUxlZnQgPSBldmVudC5jbGllbnRYIC0gZXZlbnRQcmV2aW91cy5jbGllbnRYO1xuXHRcdFx0XHRtb21lbnR1bVVwID0gZXZlbnQuY2xpZW50WSAtIGV2ZW50UHJldmlvdXMuY2xpZW50WTtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnRQcmV2aW91cyA9IGV2ZW50O1xuXG5cdFx0fSBlbHNlIGlmICggc3RhdGUgPT09IFNUQVRFLkRPTExZICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLm5vWm9vbSA9PT0gdHJ1ZSApIHJldHVybjtcblxuXHRcdFx0ZG9sbHlFbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cdFx0XHRkb2xseURlbHRhLnN1YlZlY3RvcnMoIGRvbGx5RW5kLCBkb2xseVN0YXJ0ICk7XG5cblx0XHRcdGlmICggZG9sbHlEZWx0YS55ID4gMCApIHtcblxuXHRcdFx0XHRzY29wZS5kb2xseUluKCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoIGRvbGx5RGVsdGEueSA8IDAgKSB7XG5cblx0XHRcdFx0c2NvcGUuZG9sbHlPdXQoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRkb2xseVN0YXJ0LmNvcHkoIGRvbGx5RW5kICk7XG5cblx0XHR9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuUEFOICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLm5vUGFuID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRwYW5FbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cdFx0XHRwYW5EZWx0YS5zdWJWZWN0b3JzKCBwYW5FbmQsIHBhblN0YXJ0ICk7XG5cblx0XHRcdHNjb3BlLnBhbiggcGFuRGVsdGEueCwgcGFuRGVsdGEueSApO1xuXG5cdFx0XHRwYW5TdGFydC5jb3B5KCBwYW5FbmQgKTtcblxuXHRcdH1cblxuXHRcdGlmICggc3RhdGUgIT09IFNUQVRFLk5PTkUgKSBzY29wZS51cGRhdGUoKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gb25Nb3VzZVVwKCAvKiBldmVudCAqLyApIHtcblxuXHRcdG1vbWVudHVtT24gPSB0cnVlO1xuXG5cdFx0ZXZlbnRQcmV2aW91cyA9IHVuZGVmaW5lZDtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlICk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XG5cdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggZW5kRXZlbnQgKTtcblx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIG9uTW91c2VXaGVlbCggZXZlbnQgKSB7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLm5vWm9vbSA9PT0gdHJ1ZSB8fCBzdGF0ZSAhPT0gU1RBVEUuTk9ORSApIHJldHVybjtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHR2YXIgZGVsdGEgPSAwO1xuXG5cdFx0aWYgKCBldmVudC53aGVlbERlbHRhICE9PSB1bmRlZmluZWQgKSB7IC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXG5cdFx0XHRkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGE7XG5cblx0XHR9IGVsc2UgaWYgKCBldmVudC5kZXRhaWwgIT09IHVuZGVmaW5lZCApIHsgLy8gRmlyZWZveFxuXG5cdFx0XHRkZWx0YSA9IC0gZXZlbnQuZGV0YWlsO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBkZWx0YSA+IDAgKSB7XG5cblx0XHRcdC8vc2NvcGUuZG9sbHlPdXQoKTtcblx0XHRcdHNjb3BlLm9iamVjdC5mb3YgPSAoIHNjb3BlLm9iamVjdC5mb3YgPCBzY29wZS5tYXhGb3YgKSBcblx0XHRcdFx0PyBzY29wZS5vYmplY3QuZm92ICsgMVxuXHRcdFx0XHQ6IHNjb3BlLm1heEZvdjtcblx0XHRcdHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHR9IGVsc2UgaWYgKCBkZWx0YSA8IDAgKSB7XG5cblx0XHRcdC8vc2NvcGUuZG9sbHlJbigpO1xuXHRcdFx0c2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA+IHNjb3BlLm1pbkZvdiApIFxuXHRcdFx0XHQ/IHNjb3BlLm9iamVjdC5mb3YgLSAxXG5cdFx0XHRcdDogc2NvcGUubWluRm92O1xuXHRcdFx0c2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdH1cblxuXHRcdHNjb3BlLnVwZGF0ZSgpO1xuXHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuXHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIG9uS2V5VXAgKCBldmVudCApIHtcblxuXHRcdHN3aXRjaCAoIGV2ZW50LmtleUNvZGUgKSB7XG5cblx0XHRcdGNhc2Ugc2NvcGUua2V5cy5VUDpcblx0XHRcdFx0a2V5VXAgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2NvcGUua2V5cy5CT1RUT006XG5cdFx0XHRcdGtleUJvdHRvbSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLkxFRlQ6XG5cdFx0XHRcdGtleUxlZnQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2NvcGUua2V5cy5SSUdIVDpcblx0XHRcdFx0a2V5UmlnaHQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIG9uS2V5RG93biggZXZlbnQgKSB7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLm5vS2V5cyA9PT0gdHJ1ZSB8fCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHJldHVybjtcblxuXHRcdHN3aXRjaCAoIGV2ZW50LmtleUNvZGUgKSB7XG5cblx0XHRcdGNhc2Ugc2NvcGUua2V5cy5VUDpcblx0XHRcdFx0a2V5VXAgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLkJPVFRPTTpcblx0XHRcdFx0a2V5Qm90dG9tID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2NvcGUua2V5cy5MRUZUOlxuXHRcdFx0XHRrZXlMZWZ0ID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2Ugc2NvcGUua2V5cy5SSUdIVDpcblx0XHRcdFx0a2V5UmlnaHQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdH1cblxuXHRcdGlmIChrZXlVcCB8fCBrZXlCb3R0b20gfHwga2V5TGVmdCB8fCBrZXlSaWdodCkge1xuXG5cdFx0XHRtb21lbnR1bU9uID0gdHJ1ZTtcblxuXHRcdFx0aWYgKGtleVVwKSBtb21lbnR1bVVwID0gLSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3Rvcjtcblx0XHRcdGlmIChrZXlCb3R0b20pIG1vbWVudHVtVXAgPSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3Rvcjtcblx0XHRcdGlmIChrZXlMZWZ0KSBtb21lbnR1bUxlZnQgPSAtIHNjb3BlLnJvdGF0ZVNwZWVkICogc2NvcGUubW9tZW50dW1LZXlkb3duRmFjdG9yO1xuXHRcdFx0aWYgKGtleVJpZ2h0KSBtb21lbnR1bUxlZnQgPSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3RvcjtcblxuXHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gdG91Y2hzdGFydCggZXZlbnQgKSB7XG5cblx0XHRtb21lbnR1bU9uID0gZmFsc2U7XG5cblx0XHRtb21lbnR1bUxlZnQgPSBtb21lbnR1bVVwID0gMDtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRzd2l0Y2ggKCBldmVudC50b3VjaGVzLmxlbmd0aCApIHtcblxuXHRcdFx0Y2FzZSAxOlx0Ly8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuXHRcdFx0XHRpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRcdHN0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuXG5cdFx0XHRcdHJvdGF0ZVN0YXJ0LnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjpcdC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuXHRcdFx0XHRpZiAoIHNjb3BlLm5vWm9vbSA9PT0gdHJ1ZSApIHJldHVybjtcblxuXHRcdFx0XHRzdGF0ZSA9IFNUQVRFLlRPVUNIX0RPTExZO1xuXG5cdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcblx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHR2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG5cblx0XHRcdFx0ZG9sbHlTdGFydC5zZXQoIDAsIGRpc3RhbmNlICk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG5cdFx0XHRcdGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSByZXR1cm47XG5cblx0XHRcdFx0c3RhdGUgPSBTVEFURS5UT1VDSF9QQU47XG5cblx0XHRcdFx0cGFuU3RhcnQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHR9XG5cblx0XHRpZiAoIHN0YXRlICE9PSBTVEFURS5OT05FICkgc2NvcGUuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuXG5cdH1cblxuXHRmdW5jdGlvbiB0b3VjaG1vdmUoIGV2ZW50ICkge1xuXG5cdFx0aWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHR2YXIgZWxlbWVudCA9IHNjb3BlLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gc2NvcGUuZG9tRWxlbWVudC5ib2R5IDogc2NvcGUuZG9tRWxlbWVudDtcblxuXHRcdHN3aXRjaCAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkge1xuXG5cdFx0XHRjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXG5cblx0XHRcdFx0aWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHJldHVybjtcblx0XHRcdFx0aWYgKCBzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUk9UQVRFICkgcmV0dXJuO1xuXG5cdFx0XHRcdHJvdGF0ZUVuZC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG5cdFx0XHRcdHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMoIHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQgKTtcblxuXHRcdFx0XHQvLyByb3RhdGluZyBhY3Jvc3Mgd2hvbGUgc2NyZWVuIGdvZXMgMzYwIGRlZ3JlZXMgYXJvdW5kXG5cdFx0XHRcdHNjb3BlLnJvdGF0ZUxlZnQoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXHRcdFx0XHQvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcblx0XHRcdFx0c2NvcGUucm90YXRlVXAoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogc2NvcGUucm90YXRlU3BlZWQgKTtcblxuXHRcdFx0XHRyb3RhdGVTdGFydC5jb3B5KCByb3RhdGVFbmQgKTtcblxuXHRcdFx0XHRpZiggZXZlbnRQcmV2aW91cyApe1xuXHRcdFx0XHRcdG1vbWVudHVtTGVmdCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50UHJldmlvdXMucGFnZVg7XG5cdFx0XHRcdFx0bW9tZW50dW1VcCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50UHJldmlvdXMucGFnZVk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRldmVudFByZXZpb3VzID0ge1xuXHRcdFx0XHRcdHBhZ2VYOiBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsXG5cdFx0XHRcdFx0cGFnZVk6IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzY29wZS51cGRhdGUoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjogLy8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG5cdFx0XHRcdGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xuXHRcdFx0XHRpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9ET0xMWSApIHJldHVybjtcblxuXHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcblx0XHRcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCBkeCAqIGR4ICsgZHkgKiBkeSApO1xuXG5cdFx0XHRcdGRvbGx5RW5kLnNldCggMCwgZGlzdGFuY2UgKTtcblx0XHRcdFx0ZG9sbHlEZWx0YS5zdWJWZWN0b3JzKCBkb2xseUVuZCwgZG9sbHlTdGFydCApO1xuXG5cdFx0XHRcdGlmICggZG9sbHlEZWx0YS55IDwgMCApIHtcblxuXHRcdFx0XHRcdHNjb3BlLm9iamVjdC5mb3YgPSAoIHNjb3BlLm9iamVjdC5mb3YgPCBzY29wZS5tYXhGb3YgKSBcblx0XHRcdFx0XHRcdD8gc2NvcGUub2JqZWN0LmZvdiArIDFcblx0XHRcdFx0XHRcdDogc2NvcGUubWF4Rm92O1xuXHRcdFx0XHRcdHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHRcdFx0fSBlbHNlIGlmICggZG9sbHlEZWx0YS55ID4gMCApIHtcblxuXHRcdFx0XHRcdHNjb3BlLm9iamVjdC5mb3YgPSAoIHNjb3BlLm9iamVjdC5mb3YgPiBzY29wZS5taW5Gb3YgKSBcblx0XHRcdFx0XHRcdD8gc2NvcGUub2JqZWN0LmZvdiAtIDFcblx0XHRcdFx0XHRcdDogc2NvcGUubWluRm92O1xuXHRcdFx0XHRcdHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvbGx5U3RhcnQuY29weSggZG9sbHlFbmQgKTtcblxuXHRcdFx0XHRzY29wZS51cGRhdGUoKTtcblx0XHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG5cdFx0XHRcdGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSByZXR1cm47XG5cdFx0XHRcdGlmICggc3RhdGUgIT09IFNUQVRFLlRPVUNIX1BBTiApIHJldHVybjtcblxuXHRcdFx0XHRwYW5FbmQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuXHRcdFx0XHRwYW5EZWx0YS5zdWJWZWN0b3JzKCBwYW5FbmQsIHBhblN0YXJ0ICk7XG5cblx0XHRcdFx0c2NvcGUucGFuKCBwYW5EZWx0YS54LCBwYW5EZWx0YS55ICk7XG5cblx0XHRcdFx0cGFuU3RhcnQuY29weSggcGFuRW5kICk7XG5cblx0XHRcdFx0c2NvcGUudXBkYXRlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdHN0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gdG91Y2hlbmQoIC8qIGV2ZW50ICovICkge1xuXG5cdFx0bW9tZW50dW1PbiA9IHRydWU7XG5cblx0XHRldmVudFByZXZpb3VzID0gdW5kZWZpbmVkO1xuXG5cdFx0aWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG5cdFx0c3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdH1cblxuXHQvL3RoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoIGV2ZW50ICkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9LCBmYWxzZSApO1xuXHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXdoZWVsJywgb25Nb3VzZVdoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Nb3VzZVNjcm9sbCcsIG9uTW91c2VXaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7IC8vIGZpcmVmb3hcblxuXHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0LCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIHRvdWNoZW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCB0b3VjaG1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBvbktleVVwLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgb25LZXlEb3duLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblxuXHQvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblx0dGhpcy51cGRhdGUoKTtcblxufTtcblxuT3JiaXRDb250cm9scy5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogT3JiaXRDb250cm9sc1xuXG59ICk7XG5cbmV4cG9ydCB7IE9yYml0Q29udHJvbHMgfTsiLCJpbXBvcnQgJ3RocmVlJztcblxuZnVuY3Rpb24gRGV2aWNlT3JpZW50YXRpb25Db250cm9scyAoIGNhbWVyYSwgZG9tRWxlbWVudCApIHtcblxuXHR2YXIgc2NvcGUgPSB0aGlzO1xuXHR2YXIgY2hhbmdlRXZlbnQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cblx0dmFyIHJvdFkgPSAwO1xuXHR2YXIgcm90WCA9IDA7XG5cdHZhciB0ZW1wWCA9IDA7XG5cdHZhciB0ZW1wWSA9IDA7XG5cblx0dGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cdHRoaXMuY2FtZXJhLnJvdGF0aW9uLnJlb3JkZXIoIFwiWVhaXCIgKTtcblx0dGhpcy5kb21FbGVtZW50ID0gKCBkb21FbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGRvbUVsZW1lbnQgOiBkb2N1bWVudDtcblxuXHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdHRoaXMuZGV2aWNlT3JpZW50YXRpb24gPSB7fTtcblx0dGhpcy5zY3JlZW5PcmllbnRhdGlvbiA9IDA7XG5cblx0dGhpcy5hbHBoYSA9IDA7XG5cdHRoaXMuYWxwaGFPZmZzZXRBbmdsZSA9IDA7XG5cblxuXHR2YXIgb25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0c2NvcGUuZGV2aWNlT3JpZW50YXRpb24gPSBldmVudDtcblxuXHR9O1xuXG5cdHZhciBvblNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlRXZlbnQgPSBmdW5jdGlvbigpIHtcblxuXHRcdHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID0gd2luZG93Lm9yaWVudGF0aW9uIHx8IDA7XG5cblx0fTtcblxuXHR2YXIgb25Ub3VjaFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHR0ZW1wWCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWDtcblx0XHR0ZW1wWSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWTtcblxuXHR9O1xuXG5cdHZhciBvblRvdWNoTW92ZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0cm90WSArPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIHRlbXBYICkgLyA0ICk7XG5cdFx0cm90WCArPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCAoIHRlbXBZIC0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICkgLyA0ICk7XG5cblx0XHRzY29wZS51cGRhdGVBbHBoYU9mZnNldEFuZ2xlKCByb3RZICk7XG5cblx0XHR0ZW1wWCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWDtcblx0XHR0ZW1wWSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWTtcblxuXHR9O1xuXG5cdC8vIFRoZSBhbmdsZXMgYWxwaGEsIGJldGEgYW5kIGdhbW1hIGZvcm0gYSBzZXQgb2YgaW50cmluc2ljIFRhaXQtQnJ5YW4gYW5nbGVzIG9mIHR5cGUgWi1YJy1ZJydcblxuXHR2YXIgc2V0Q2FtZXJhUXVhdGVybmlvbiA9IGZ1bmN0aW9uKCBxdWF0ZXJuaW9uLCBhbHBoYSwgYmV0YSwgZ2FtbWEsIG9yaWVudCApIHtcblxuXHRcdHZhciB6ZWUgPSBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMCwgMSApO1xuXG5cdFx0dmFyIGV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5cblx0XHR2YXIgcTAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0dmFyIHExID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oIC0gTWF0aC5zcXJ0KCAwLjUgKSwgMCwgMCwgTWF0aC5zcXJ0KCAwLjUgKSApOyAvLyAtIFBJLzIgYXJvdW5kIHRoZSB4LWF4aXNcblxuXHRcdHZhciB2ZWN0b3JGaW5nZXJZO1xuXHRcdHZhciBmaW5nZXJRWSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdFx0dmFyIGZpbmdlclFYID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXHRcdGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gMCApIHtcblxuXHRcdFx0dmVjdG9yRmluZ2VyWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAxLCAwLCAwICk7XG5cdFx0XHRmaW5nZXJRWS5zZXRGcm9tQXhpc0FuZ2xlKCB2ZWN0b3JGaW5nZXJZLCAtcm90WCApO1xuXG5cdFx0fSBlbHNlIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gMTgwICkge1xuXG5cdFx0XHR2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDEsIDAsIDAgKTtcblx0XHRcdGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIHJvdFggKTtcblxuXHRcdH0gZWxzZSBpZiAoIHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID09IDkwICkge1xuXG5cdFx0XHR2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKTtcblx0XHRcdGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIHJvdFggKTtcblxuXHRcdH0gZWxzZSBpZiAoIHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID09IC0gOTApIHtcblxuXHRcdFx0dmVjdG9yRmluZ2VyWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAxLCAwICk7XG5cdFx0XHRmaW5nZXJRWS5zZXRGcm9tQXhpc0FuZ2xlKCB2ZWN0b3JGaW5nZXJZLCAtcm90WCApO1xuXG5cdFx0fVxuXG5cdFx0cTEubXVsdGlwbHkoIGZpbmdlclFZICk7XG5cdFx0cTEubXVsdGlwbHkoIGZpbmdlclFYICk7XG5cblx0XHRldWxlci5zZXQoIGJldGEsIGFscGhhLCAtIGdhbW1hLCAnWVhaJyApOyAvLyAnWlhZJyBmb3IgdGhlIGRldmljZSwgYnV0ICdZWFonIGZvciB1c1xuXG5cdFx0cXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoIGV1bGVyICk7IC8vIG9yaWVudCB0aGUgZGV2aWNlXG5cblx0XHRxdWF0ZXJuaW9uLm11bHRpcGx5KCBxMSApOyAvLyBjYW1lcmEgbG9va3Mgb3V0IHRoZSBiYWNrIG9mIHRoZSBkZXZpY2UsIG5vdCB0aGUgdG9wXG5cblx0XHRxdWF0ZXJuaW9uLm11bHRpcGx5KCBxMC5zZXRGcm9tQXhpc0FuZ2xlKCB6ZWUsIC0gb3JpZW50ICkgKTsgLy8gYWRqdXN0IGZvciBzY3JlZW4gb3JpZW50YXRpb25cblxuXHR9O1xuXG5cdHRoaXMuY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0b25TY3JlZW5PcmllbnRhdGlvbkNoYW5nZUV2ZW50KCk7IC8vIHJ1biBvbmNlIG9uIGxvYWRcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvblNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdkZXZpY2VvcmllbnRhdGlvbicsIG9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2VFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy51cGRhdGUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXG5cdFx0c2NvcGUuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0RXZlbnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdHNjb3BlLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmVFdmVudCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cblx0XHRzY29wZS5lbmFibGVkID0gdHJ1ZTtcblxuXHR9O1xuXG5cdHRoaXMuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9uU2NyZWVuT3JpZW50YXRpb25DaGFuZ2VFdmVudCwgZmFsc2UgKTtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2RldmljZW9yaWVudGF0aW9uJywgb25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZUV2ZW50LCBmYWxzZSApO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cblx0XHRzY29wZS5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnRFdmVudCwgZmFsc2UgKTtcblx0XHRzY29wZS5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwidG91Y2htb3ZlXCIsIG9uVG91Y2hNb3ZlRXZlbnQsIGZhbHNlICk7XG5cblx0XHRzY29wZS5lbmFibGVkID0gZmFsc2U7XG5cblx0fTtcblxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCBpZ25vcmVVcGRhdGUgKSB7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0dmFyIGFscGhhID0gc2NvcGUuZGV2aWNlT3JpZW50YXRpb24uYWxwaGEgPyBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5hbHBoYSApICsgc2NvcGUuYWxwaGFPZmZzZXRBbmdsZSA6IDA7IC8vIFpcblx0XHR2YXIgYmV0YSA9IHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmJldGEgPyBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5iZXRhICkgOiAwOyAvLyBYJ1xuXHRcdHZhciBnYW1tYSA9IHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmdhbW1hID8gVEhSRUUuTWF0aC5kZWdUb1JhZCggc2NvcGUuZGV2aWNlT3JpZW50YXRpb24uZ2FtbWEgKSA6IDA7IC8vIFknJ1xuXHRcdHZhciBvcmllbnQgPSBzY29wZS5zY3JlZW5PcmllbnRhdGlvbiA/IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uICkgOiAwOyAvLyBPXG5cblx0XHRzZXRDYW1lcmFRdWF0ZXJuaW9uKCBzY29wZS5jYW1lcmEucXVhdGVybmlvbiwgYWxwaGEsIGJldGEsIGdhbW1hLCBvcmllbnQgKTtcblx0XHRzY29wZS5hbHBoYSA9IGFscGhhO1xuXG5cdFx0aWdub3JlVXBkYXRlICE9PSB0cnVlICYmIHNjb3BlLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cblx0fTtcblxuXHR0aGlzLnVwZGF0ZUFscGhhT2Zmc2V0QW5nbGUgPSBmdW5jdGlvbiggYW5nbGUgKSB7XG5cblx0XHR0aGlzLmFscGhhT2Zmc2V0QW5nbGUgPSBhbmdsZTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH07XG5cblx0dGhpcy5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLmRpc2Nvbm5lY3QoKTtcblxuXHR9O1xuXG5cdHRoaXMuY29ubmVjdCgpO1xuXG59O1xuXG5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUpLCB7XG5cblx0Y29uc3RydWN0b3I6IERldmljZU9yaWVudGF0aW9uQ29udHJvbHNcblxufSApO1xuXG5leHBvcnQgeyBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzIH07IiwiXG5pbXBvcnQgJ3RocmVlJztcblxuZnVuY3Rpb24gQ2FyZGJvYXJkRWZmZWN0ICggcmVuZGVyZXIgKSB7XG5cblx0dmFyIF9jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKCAtIDEsIDEsIDEsIC0gMSwgMCwgMSApO1xuXG5cdHZhciBfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuXHR2YXIgX3N0ZXJlbyA9IG5ldyBUSFJFRS5TdGVyZW9DYW1lcmEoKTtcblx0X3N0ZXJlby5hc3BlY3QgPSAwLjU7XG5cblx0dmFyIF9wYXJhbXMgPSB7IG1pbkZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLCBtYWdGaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsIGZvcm1hdDogVEhSRUUuUkdCQUZvcm1hdCB9O1xuXG5cdHZhciBfcmVuZGVyVGFyZ2V0ID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KCA1MTIsIDUxMiwgX3BhcmFtcyApO1xuXHRfcmVuZGVyVGFyZ2V0LnNjaXNzb3JUZXN0ID0gdHJ1ZTtcblx0X3JlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG5cdC8vIERpc3RvcnRpb24gTWVzaCBwb3J0ZWQgZnJvbTpcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2JvcmlzbXVzL3dlYnZyLWJvaWxlcnBsYXRlL2Jsb2IvbWFzdGVyL3NyYy9kaXN0b3J0aW9uL2JhcnJlbC1kaXN0b3J0aW9uLWZyYWdtZW50LmpzXG5cblx0dmFyIGRpc3RvcnRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMiggMC40NDEsIDAuMTU2ICk7XG5cblx0dmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoIDEsIDEsIDEwLCAyMCApLnJlbW92ZUF0dHJpYnV0ZSggJ25vcm1hbCcgKS50b05vbkluZGV4ZWQoKTtcblxuXHR2YXIgcG9zaXRpb25zID0gZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcblx0dmFyIHV2cyA9IGdlb21ldHJ5LmF0dHJpYnV0ZXMudXYuYXJyYXk7XG5cblx0Ly8gZHVwbGljYXRlXG5cdGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQgKj0gMjtcblx0Z2VvbWV0cnkuYXR0cmlidXRlcy51di5jb3VudCAqPSAyO1xuXG5cdHZhciBwb3NpdGlvbnMyID0gbmV3IEZsb2F0MzJBcnJheSggcG9zaXRpb25zLmxlbmd0aCAqIDIgKTtcblx0cG9zaXRpb25zMi5zZXQoIHBvc2l0aW9ucyApO1xuXHRwb3NpdGlvbnMyLnNldCggcG9zaXRpb25zLCBwb3NpdGlvbnMubGVuZ3RoICk7XG5cblx0dmFyIHV2czIgPSBuZXcgRmxvYXQzMkFycmF5KCB1dnMubGVuZ3RoICogMiApO1xuXHR1dnMyLnNldCggdXZzICk7XG5cdHV2czIuc2V0KCB1dnMsIHV2cy5sZW5ndGggKTtcblxuXHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0dmFyIGxlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGggLyAzO1xuXG5cdGZvciAoIHZhciBpID0gMCwgbCA9IHBvc2l0aW9uczIubGVuZ3RoIC8gMzsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHR2ZWN0b3IueCA9IHBvc2l0aW9uczJbIGkgKiAzICsgMCBdO1xuXHRcdHZlY3Rvci55ID0gcG9zaXRpb25zMlsgaSAqIDMgKyAxIF07XG5cblx0XHR2YXIgZG90ID0gdmVjdG9yLmRvdCggdmVjdG9yICk7XG5cdFx0dmFyIHNjYWxhciA9IDEuNSArICggZGlzdG9ydGlvbi54ICsgZGlzdG9ydGlvbi55ICogZG90ICkgKiBkb3Q7XG5cblx0XHR2YXIgb2Zmc2V0ID0gaSA8IGxlbmd0aCA/IDAgOiAxO1xuXG5cdFx0cG9zaXRpb25zMlsgaSAqIDMgKyAwIF0gPSAoIHZlY3Rvci54IC8gc2NhbGFyICkgKiAxLjUgLSAwLjUgKyBvZmZzZXQ7XG5cdFx0cG9zaXRpb25zMlsgaSAqIDMgKyAxIF0gPSAoIHZlY3Rvci55IC8gc2NhbGFyICkgKiAzLjA7XG5cblx0XHR1dnMyWyBpICogMiBdID0gKCB1dnMyWyBpICogMiBdICsgb2Zmc2V0ICkgKiAwLjU7XG5cblx0fVxuXG5cdGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXkgPSBwb3NpdGlvbnMyO1xuXHRnZW9tZXRyeS5hdHRyaWJ1dGVzLnV2LmFycmF5ID0gdXZzMjtcblxuXHQvL1xuXG5cdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBtYXA6IF9yZW5kZXJUYXJnZXQudGV4dHVyZSB9ICk7XG5cdHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXHRfc2NlbmUuYWRkKCBtZXNoICk7XG5cblx0Ly9cblxuXHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRyZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0ICk7XG5cblx0XHR2YXIgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblxuXHRcdF9yZW5kZXJUYXJnZXQuc2V0U2l6ZSggd2lkdGggKiBwaXhlbFJhdGlvLCBoZWlnaHQgKiBwaXhlbFJhdGlvICk7XG5cblx0fTtcblxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdF9zdGVyZW8udXBkYXRlKCBjYW1lcmEgKTtcblxuXHRcdHZhciB3aWR0aCA9IF9yZW5kZXJUYXJnZXQud2lkdGggLyAyO1xuXHRcdHZhciBoZWlnaHQgPSBfcmVuZGVyVGFyZ2V0LmhlaWdodDtcblxuXHRcdGlmICggcmVuZGVyZXIuYXV0b0NsZWFyICkgcmVuZGVyZXIuY2xlYXIoKTtcblxuXHRcdF9yZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIDAsIDAsIHdpZHRoLCBoZWlnaHQgKTtcblx0XHRfcmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggMCwgMCwgd2lkdGgsIGhlaWdodCApO1xuXHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggX3JlbmRlclRhcmdldCApO1xuXHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIF9zdGVyZW8uY2FtZXJhTCApO1xuXG5cdFx0cmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xuXG5cdFx0X3JlbmRlclRhcmdldC5zY2lzc29yLnNldCggd2lkdGgsIDAsIHdpZHRoLCBoZWlnaHQgKTtcblx0XHRfcmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggd2lkdGgsIDAsIHdpZHRoLCBoZWlnaHQgKTtcblx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIF9yZW5kZXJUYXJnZXQgKTtcblx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBfc3RlcmVvLmNhbWVyYVIgKTtcblxuXHRcdHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcblxuXHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXHRcdHJlbmRlcmVyLnJlbmRlciggX3NjZW5lLCBfY2FtZXJhICk7XG5cdH07XG5cbn07XG5cbmV4cG9ydCB7IENhcmRib2FyZEVmZmVjdCB9OyIsImltcG9ydCAndGhyZWUnO1xuXG5jb25zdCBTdGVyZW9FZmZlY3QgPSBmdW5jdGlvbiAoIHJlbmRlcmVyICkge1xuXG5cdHZhciBfc3RlcmVvID0gbmV3IFRIUkVFLlN0ZXJlb0NhbWVyYSgpO1xuXHRfc3RlcmVvLmFzcGVjdCA9IDAuNTtcblx0dmFyIHNpemUgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdHRoaXMuc2V0RXllU2VwYXJhdGlvbiA9IGZ1bmN0aW9uICggZXllU2VwICkge1xuXG5cdFx0X3N0ZXJlby5leWVTZXAgPSBleWVTZXA7XG5cblx0fTtcblxuXHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRyZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0ICk7XG5cblx0fTtcblxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdF9zdGVyZW8udXBkYXRlKCBjYW1lcmEgKTtcblxuXHRcdHJlbmRlcmVyLmdldFNpemUoIHNpemUgKTtcblxuXHRcdGlmICggcmVuZGVyZXIuYXV0b0NsZWFyICkgcmVuZGVyZXIuY2xlYXIoKTtcblx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggdHJ1ZSApO1xuXG5cdFx0cmVuZGVyZXIuc2V0U2Npc3NvciggMCwgMCwgc2l6ZS53aWR0aCAvIDIsIHNpemUuaGVpZ2h0ICk7XG5cdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIDAsIDAsIHNpemUud2lkdGggLyAyLCBzaXplLmhlaWdodCApO1xuXHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIF9zdGVyZW8uY2FtZXJhTCApO1xuXG5cdFx0cmVuZGVyZXIuc2V0U2Npc3Nvciggc2l6ZS53aWR0aCAvIDIsIDAsIHNpemUud2lkdGggLyAyLCBzaXplLmhlaWdodCApO1xuXHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCBzaXplLndpZHRoIC8gMiwgMCwgc2l6ZS53aWR0aCAvIDIsIHNpemUuaGVpZ2h0ICk7XG5cdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgX3N0ZXJlby5jYW1lcmFSICk7XG5cblx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggZmFsc2UgKTtcblxuXHR9O1xuXG59O1xuXG5leHBvcnQgeyBTdGVyZW9FZmZlY3QgfTsiLCJpbXBvcnQgeyBNT0RFUywgQ09OVFJPTFMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJy4uL2xpYi9jb250cm9scy9PcmJpdENvbnRyb2xzJztcbmltcG9ydCB7IERldmljZU9yaWVudGF0aW9uQ29udHJvbHMgfSBmcm9tICcuLi9saWIvY29udHJvbHMvRGV2aWNlT3JpZW50YXRpb25Db250cm9scyc7XG5pbXBvcnQgeyBDYXJkYm9hcmRFZmZlY3QgfSBmcm9tICcuLi9saWIvZWZmZWN0cy9DYXJkYm9hcmRFZmZlY3QnO1xuaW1wb3J0IHsgU3RlcmVvRWZmZWN0IH0gZnJvbSAnLi4vbGliL2VmZmVjdHMvU3RlcmVvRWZmZWN0JztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJy4uL3dpZGdldC9XaWRnZXQnO1xuaW1wb3J0IHsgUmV0aWNsZSB9IGZyb20gJy4uL2ludGVyZmFjZS9SZXRpY2xlJztcbmltcG9ydCB7IEluZm9zcG90IH0gZnJvbSAnLi4vaW5mb3Nwb3QvSW5mb3Nwb3QnO1xuaW1wb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi4vRGF0YUltYWdlJztcbmltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi4vcGFub3JhbWEvUGFub3JhbWEnO1xuaW1wb3J0IHsgVmlkZW9QYW5vcmFtYSB9IGZyb20gJy4uL3Bhbm9yYW1hL1ZpZGVvUGFub3JhbWEnO1xuaW1wb3J0IHsgQ2FtZXJhUGFub3JhbWEgfSBmcm9tICcuLi9wYW5vcmFtYS9DYW1lcmFQYW5vcmFtYSc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBWaWV3ZXIgY29udGFpbnMgcHJlLWRlZmluZWQgc2NlbmUsIGNhbWVyYSBhbmQgcmVuZGVyZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFVzZSBjdXN0b20gb3IgZGVmYXVsdCBjb25maWcgb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuY29udGFpbmVyXSAtIEEgSFRNTEVsZW1lbnQgdG8gaG9zdCB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge1RIUkVFLlNjZW5lfSBbb3B0aW9ucy5zY2VuZT1USFJFRS5TY2VuZV0gLSBBIFRIUkVFLlNjZW5lIHdoaWNoIGNvbnRhaW5zIHBhbm9yYW1hIGFuZCAzRCBvYmplY3RzXG4gKiBAcGFyYW0ge1RIUkVFLkNhbWVyYX0gW29wdGlvbnMuY2FtZXJhPVRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhXSAtIEEgVEhSRUUuQ2FtZXJhIHRvIHZpZXcgdGhlIHNjZW5lXG4gKiBAcGFyYW0ge1RIUkVFLldlYkdMUmVuZGVyZXJ9IFtvcHRpb25zLnJlbmRlcmVyPVRIUkVFLldlYkdMUmVuZGVyZXJdIC0gQSBUSFJFRS5XZWJHTFJlbmRlcmVyIHRvIHJlbmRlciBjYW52YXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY29udHJvbEJhcj10cnVlXSAtIFNob3cvaGlkZSBjb250cm9sIGJhciBvbiB0aGUgYm90dG9tIG9mIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSB7YXJyYXl9ICAgW29wdGlvbnMuY29udHJvbEJ1dHRvbnM9W11dIC0gQnV0dG9uIG5hbWVzIHRvIG1vdW50IG9uIGNvbnRyb2xCYXIgaWYgY29udHJvbEJhciBleGlzdHMsIERlZmF1bHRzIHRvIFsnZnVsbHNjcmVlbicsICdzZXR0aW5nJywgJ3ZpZGVvJ11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b0hpZGVDb250cm9sQmFyPWZhbHNlXSAtIEF1dG8gaGlkZSBjb250cm9sIGJhciB3aGVuIGNsaWNrIG9uIG5vbi1hY3RpdmUgYXJlYVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvSGlkZUluZm9zcG90PXRydWVdIC0gQXV0byBoaWRlIGluZm9zcG90cyB3aGVuIGNsaWNrIG9uIG5vbi1hY3RpdmUgYXJlYVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5ob3Jpem9udGFsVmlldz1mYWxzZV0gLSBBbGxvdyBvbmx5IGhvcml6b250YWwgY2FtZXJhIGNvbnRyb2xcbiAqIEBwYXJhbSB7bnVtYmVyfSAgW29wdGlvbnMuY2xpY2tUb2xlcmFuY2U9MTBdIC0gRGlzdGFuY2UgdG9sZXJhbmNlIHRvIHRpZ2dlciBjbGljayAvIHRhcCBldmVudFxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5jYW1lcmFGb3Y9NjBdIC0gQ2FtZXJhIGZpZWxkIG9mIHZpZXcgdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZURyYWdnaW5nPWZhbHNlXSAtIFJldmVyc2UgZHJhZ2dpbmcgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmVuYWJsZVJldGljbGU9ZmFsc2VdIC0gRW5hYmxlIHJldGljbGUgZm9yIG1vdXNlbGVzcyBpbnRlcmFjdGlvbiBvdGhlciB0aGFuIFZSIG1vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSAgW29wdGlvbnMuZHdlbGxUaW1lPTE1MDBdIC0gRHdlbGwgdGltZSBmb3IgcmV0aWNsZSBzZWxlY3Rpb24gaW4gbXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b1JldGljbGVTZWxlY3Q9dHJ1ZV0gLSBBdXRvIHNlbGVjdCBhIGNsaWNrYWJsZSB0YXJnZXQgYWZ0ZXIgZHdlbGxUaW1lXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpZXdJbmRpY2F0b3I9ZmFsc2VdIC0gQWRkcyBhbiBhbmdsZSB2aWV3IGluZGljYXRvciBpbiB1cHBlciBsZWZ0IGNvcm5lclxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5pbmRpY2F0b3JTaXplPTMwXSAtIFNpemUgb2YgVmlldyBJbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSAgW29wdGlvbnMub3V0cHV0PSdub25lJ10gLSBXaGV0aGVyIGFuZCB3aGVyZSB0byBvdXRwdXQgcmF5Y2FzdCBwb3NpdGlvbi4gQ291bGQgYmUgJ2NvbnNvbGUnIG9yICdvdmVybGF5J1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvUm90YXRlPWZhbHNlXSAtIEF1dG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmF1dG9Sb3RhdGVTcGVlZD0yLjBdIC0gQXV0byByb3RhdGUgc3BlZWQgYXMgaW4gZGVncmVlIHBlciBzZWNvbmQuIFBvc2l0aXZlIGlzIGNvdW50ZXItY2xvY2t3aXNlIGFuZCBuZWdhdGl2ZSBpcyBjbG9ja3dpc2UuXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmF1dG9Sb3RhdGVBY3RpdmF0aW9uRHVyYXRpb249NTAwMF0gLSBEdXJhdGlvbiBiZWZvcmUgYXV0byByb3RhdGF0aW9uIHdoZW4gbm8gdXNlciBpbnRlcmFjdGl2aXR5IGluIG1zXG4gKi9cbmZ1bmN0aW9uIFZpZXdlciAoIG9wdGlvbnMgKSB7XG5cblx0VEhSRUUuRXZlbnREaXNwYXRjaGVyLmNhbGwoIHRoaXMgKTtcblxuXHRsZXQgY29udGFpbmVyO1xuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmNvbnRyb2xCYXIgPSBvcHRpb25zLmNvbnRyb2xCYXIgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY29udHJvbEJhciA6IHRydWU7XG5cdG9wdGlvbnMuY29udHJvbEJ1dHRvbnMgPSBvcHRpb25zLmNvbnRyb2xCdXR0b25zIHx8IFsgJ2Z1bGxzY3JlZW4nLCAnc2V0dGluZycsICd2aWRlbycgXTtcblx0b3B0aW9ucy5hdXRvSGlkZUNvbnRyb2xCYXIgPSBvcHRpb25zLmF1dG9IaWRlQ29udHJvbEJhciAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5hdXRvSGlkZUNvbnRyb2xCYXIgOiBmYWxzZTtcblx0b3B0aW9ucy5hdXRvSGlkZUluZm9zcG90ID0gb3B0aW9ucy5hdXRvSGlkZUluZm9zcG90ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmF1dG9IaWRlSW5mb3Nwb3QgOiB0cnVlO1xuXHRvcHRpb25zLmhvcml6b250YWxWaWV3ID0gb3B0aW9ucy5ob3Jpem9udGFsVmlldyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5ob3Jpem9udGFsVmlldyA6IGZhbHNlO1xuXHRvcHRpb25zLmNsaWNrVG9sZXJhbmNlID0gb3B0aW9ucy5jbGlja1RvbGVyYW5jZSB8fCAxMDtcblx0b3B0aW9ucy5jYW1lcmFGb3YgPSBvcHRpb25zLmNhbWVyYUZvdiB8fCA2MDtcblx0b3B0aW9ucy5yZXZlcnNlRHJhZ2dpbmcgPSBvcHRpb25zLnJldmVyc2VEcmFnZ2luZyB8fCBmYWxzZTtcblx0b3B0aW9ucy5lbmFibGVSZXRpY2xlID0gb3B0aW9ucy5lbmFibGVSZXRpY2xlIHx8IGZhbHNlO1xuXHRvcHRpb25zLmR3ZWxsVGltZSA9IG9wdGlvbnMuZHdlbGxUaW1lIHx8IDE1MDA7XG5cdG9wdGlvbnMuYXV0b1JldGljbGVTZWxlY3QgPSBvcHRpb25zLmF1dG9SZXRpY2xlU2VsZWN0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmF1dG9SZXRpY2xlU2VsZWN0IDogdHJ1ZTtcblx0b3B0aW9ucy52aWV3SW5kaWNhdG9yID0gb3B0aW9ucy52aWV3SW5kaWNhdG9yICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnZpZXdJbmRpY2F0b3IgOiBmYWxzZTtcblx0b3B0aW9ucy5pbmRpY2F0b3JTaXplID0gb3B0aW9ucy5pbmRpY2F0b3JTaXplIHx8IDMwO1xuXHRvcHRpb25zLm91dHB1dCA9IG9wdGlvbnMub3V0cHV0ID8gb3B0aW9ucy5vdXRwdXQgOiAnbm9uZSc7XG5cdG9wdGlvbnMuYXV0b1JvdGF0ZSA9IG9wdGlvbnMuYXV0b1JvdGF0ZSB8fCBmYWxzZTtcblx0b3B0aW9ucy5hdXRvUm90YXRlU3BlZWQgPSBvcHRpb25zLmF1dG9Sb3RhdGVTcGVlZCB8fCAyLjA7XG5cdG9wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbiA9IG9wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbiB8fCA1MDAwO1xuXG5cdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0Ly8gQ1NTIEljb25cblx0Ly9jb25zdCBzdHlsZUxvYWRlciA9IG5ldyBQQU5PTEVOUy5TdHlsZUxvYWRlcigpO1xuXHQvL3N0eWxlTG9hZGVyLmluamVjdCggJ2ljb25vJyApO1xuXG5cdC8vIENvbnRhaW5lclxuXHRpZiAoIG9wdGlvbnMuY29udGFpbmVyICkge1xuXG5cdFx0Y29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG5cdFx0Y29udGFpbmVyLl93aWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aDtcblx0XHRjb250YWluZXIuX2hlaWdodCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cblx0fSBlbHNlIHtcblxuXHRcdGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0Y29udGFpbmVyLmNsYXNzTGlzdC5hZGQoICdwYW5vbGVucy1jb250YWluZXInICk7XG5cdFx0Y29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG5cdFx0Y29udGFpbmVyLl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdGNvbnRhaW5lci5faGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdH1cblxuXHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuXHR0aGlzLmNhbWVyYSA9IG9wdGlvbnMuY2FtZXJhIHx8IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSggdGhpcy5vcHRpb25zLmNhbWVyYUZvdiwgdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQsIDEsIDEwMDAwICk7XG5cdHRoaXMuc2NlbmUgPSBvcHRpb25zLnNjZW5lIHx8IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHR0aGlzLnJlbmRlcmVyID0gb3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlciggeyBhbHBoYTogdHJ1ZSwgYW50aWFsaWFzOiBmYWxzZSB9ICk7XG5cdHRoaXMuc2NlbmVSZXRpY2xlID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cblx0dGhpcy52aWV3SW5kaWNhdG9yU2l6ZSA9IHRoaXMub3B0aW9ucy5pbmRpY2F0b3JTaXplO1xuXG5cdHRoaXMucmV0aWNsZSA9IHt9O1xuXHR0aGlzLnRlbXBFbmFibGVSZXRpY2xlID0gdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGU7XG5cblx0dGhpcy5tb2RlID0gTU9ERVMuTk9STUFMO1xuXG5cdHRoaXMuT3JiaXRDb250cm9scztcblx0dGhpcy5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzO1xuXG5cdHRoaXMuQ2FyZGJvYXJkRWZmZWN0O1xuXHR0aGlzLlN0ZXJlb0VmZmVjdDtcblxuXHR0aGlzLmNvbnRyb2xzO1xuXHR0aGlzLmVmZmVjdDtcblx0dGhpcy5wYW5vcmFtYTtcblx0dGhpcy53aWRnZXQ7XG5cblx0dGhpcy5ob3Zlck9iamVjdDtcblx0dGhpcy5pbmZvc3BvdDtcblx0dGhpcy5wcmVzc0VudGl0eU9iamVjdDtcblx0dGhpcy5wcmVzc09iamVjdDtcblxuXHR0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcblx0dGhpcy5yYXljYXN0ZXJQb2ludCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdHRoaXMudXNlck1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0dGhpcy51cGRhdGVDYWxsYmFja3MgPSBbXTtcblx0dGhpcy5yZXF1ZXN0QW5pbWF0aW9uSWQ7XG5cblx0dGhpcy5jYW1lcmFGcnVzdHVtID0gbmV3IFRIUkVFLkZydXN0dW0oKTtcblx0dGhpcy5jYW1lcmFWaWV3UHJvamVjdGlvbk1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0dGhpcy5hdXRvUm90YXRlUmVxdWVzdElkO1xuXG5cdHRoaXMub3V0cHV0RGl2RWxlbWVudDtcblxuXHR0aGlzLnRvdWNoU3VwcG9ydGVkID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaDtcblxuXHQvLyBIYW5kbGVyIHJlZmVyZW5jZXNcblx0dGhpcy5IQU5ETEVSX01PVVNFX0RPV04gPSB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKTtcblx0dGhpcy5IQU5ETEVSX01PVVNFX1VQID0gdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApO1xuXHR0aGlzLkhBTkRMRVJfTU9VU0VfTU9WRSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApO1xuXHR0aGlzLkhBTkRMRVJfV0lORE9XX1JFU0laRSA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApO1xuXHR0aGlzLkhBTkRMRVJfS0VZX0RPV04gPSB0aGlzLm9uS2V5RG93bi5iaW5kKCB0aGlzICk7XG5cdHRoaXMuSEFORExFUl9LRVlfVVAgPSB0aGlzLm9uS2V5VXAuYmluZCggdGhpcyApO1xuXHR0aGlzLkhBTkRMRVJfVEFQID0gdGhpcy5vblRhcC5iaW5kKCB0aGlzLCB7XG5cdFx0Y2xpZW50WDogdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyAyLFxuXHRcdGNsaWVudFk6IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDJcblx0fSApO1xuXG5cdC8vIEZsYWcgZm9yIGluZm9zcG90IG91dHB1dFxuXHR0aGlzLk9VVFBVVF9JTkZPU1BPVCA9IGZhbHNlO1xuXG5cdC8vIEFuaW1hdGlvbnNcblx0dGhpcy50d2VlbkxlZnRBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oKTtcblx0dGhpcy50d2VlblVwQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCk7XG5cblx0Ly8gUmVuZGVyZXJcblx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyApO1xuXHR0aGlzLnJlbmRlcmVyLnNldFNpemUoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLCB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgKTtcblx0dGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCwgMCApO1xuXHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xuXG5cdC8vIEFwcGVuZCBSZW5kZXJlciBFbGVtZW50IHRvIGNvbnRhaW5lclxuXHR0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ3Bhbm9sZW5zLWNhbnZhcycgKTtcblx0dGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHR0aGlzLmNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuXHQvLyBDYW1lcmEgQ29udHJvbHNcblx0dGhpcy5PcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoIHRoaXMuY2FtZXJhLCB0aGlzLmNvbnRhaW5lciApO1xuXHR0aGlzLk9yYml0Q29udHJvbHMuaWQgPSAnb3JiaXQnO1xuXHR0aGlzLk9yYml0Q29udHJvbHMubWluRGlzdGFuY2UgPSAxO1xuXHR0aGlzLk9yYml0Q29udHJvbHMubm9QYW4gPSB0cnVlO1xuXHR0aGlzLk9yYml0Q29udHJvbHMuYXV0b1JvdGF0ZSA9IHRoaXMub3B0aW9ucy5hdXRvUm90YXRlO1xuXHR0aGlzLk9yYml0Q29udHJvbHMuYXV0b1JvdGF0ZVNwZWVkID0gdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGVTcGVlZDtcblxuXHR0aGlzLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHMgPSBuZXcgRGV2aWNlT3JpZW50YXRpb25Db250cm9scyggdGhpcy5jYW1lcmEsIHRoaXMuY29udGFpbmVyICk7XG5cdHRoaXMuRGV2aWNlT3JpZW50YXRpb25Db250cm9scy5pZCA9ICdkZXZpY2Utb3JpZW50YXRpb24nO1xuXHR0aGlzLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHMuZW5hYmxlZCA9IGZhbHNlO1xuXHR0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gMTtcblxuXHQvLyBSZWdpc3RlciBjaGFuZ2UgZXZlbnQgaWYgcGFzc2l2ZVJlbmVyaW5nXG5cdGlmICggdGhpcy5vcHRpb25zLnBhc3NpdmVSZW5kZXJpbmcgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdwYXNzaXZlUmVuZGVyaW5nIGlzIG5vdyBkZXByZWNhdGVkJyApO1xuXG5cdH1cblxuXHQvLyBDb250cm9sc1xuXHR0aGlzLmNvbnRyb2xzID0gWyB0aGlzLk9yYml0Q29udHJvbHMsIHRoaXMuRGV2aWNlT3JpZW50YXRpb25Db250cm9scyBdO1xuXHR0aGlzLmNvbnRyb2wgPSB0aGlzLk9yYml0Q29udHJvbHM7XG5cblx0Ly8gQ2FyZGJvYXJkIGVmZmVjdFxuXHR0aGlzLkNhcmRib2FyZEVmZmVjdCA9IG5ldyBDYXJkYm9hcmRFZmZlY3QoIHRoaXMucmVuZGVyZXIgKTtcblx0dGhpcy5DYXJkYm9hcmRFZmZlY3Quc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuXG5cdC8vIFN0ZXJlbyBlZmZlY3Rcblx0dGhpcy5TdGVyZW9FZmZlY3QgPSBuZXcgU3RlcmVvRWZmZWN0KCB0aGlzLnJlbmRlcmVyICk7XG5cdHRoaXMuU3RlcmVvRWZmZWN0LnNldFNpemUoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLCB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgKTtcblxuXHR0aGlzLmVmZmVjdCA9IHRoaXMuQ2FyZGJvYXJkRWZmZWN0O1xuXG5cdC8vIEFkZCBkZWZhdWx0IGhpZGRlbiByZXRpY2xlXG5cdHRoaXMuYWRkUmV0aWNsZSgpO1xuXG5cdC8vIExvY2sgaG9yaXpvbnRhbCB2aWV3XG5cdGlmICggdGhpcy5vcHRpb25zLmhvcml6b250YWxWaWV3ICkge1xuXHRcdHRoaXMuT3JiaXRDb250cm9scy5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDI7XG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gMjtcblx0fVxuXG5cdC8vIEFkZCBDb250cm9sIFVJXG5cdGlmICggdGhpcy5vcHRpb25zLmNvbnRyb2xCYXIgIT09IGZhbHNlICkge1xuXHRcdHRoaXMuYWRkRGVmYXVsdENvbnRyb2xCYXIoIHRoaXMub3B0aW9ucy5jb250cm9sQnV0dG9ucyApO1xuXHR9XG5cblx0Ly8gQWRkIFZpZXcgSW5kaWNhdG9yXG5cdGlmICggdGhpcy5vcHRpb25zLnZpZXdJbmRpY2F0b3IgKSB7XG5cdFx0dGhpcy5hZGRWaWV3SW5kaWNhdG9yKCk7XG5cdH1cblxuXHQvLyBSZXZlcnNlIGRyYWdnaW5nIGRpcmVjdGlvblxuXHRpZiAoIHRoaXMub3B0aW9ucy5yZXZlcnNlRHJhZ2dpbmcgKSB7XG5cdFx0dGhpcy5yZXZlcnNlRHJhZ2dpbmdEaXJlY3Rpb24oKTtcblx0fVxuXG5cdC8vIFJlZ2lzdGVyIGV2ZW50IGlmIHJldGljbGUgaXMgZW5hYmxlZCwgb3RoZXJ3aXNlIGRlZmF1bHRzIHRvIG1vdXNlXG5cdGlmICggdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgKSB7XG5cdFx0dGhpcy5lbmFibGVSZXRpY2xlQ29udHJvbCgpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMucmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzKCk7XG5cdH1cblxuXHQvLyBPdXRwdXQgaW5mb3Nwb3QgcG9zaXRpb24gdG8gYW4gb3ZlcmxheSBjb250YWluZXIgaWYgc3BlY2lmaWVkXG5cdGlmICggdGhpcy5vcHRpb25zLm91dHB1dCA9PT0gJ292ZXJsYXknICkge1xuXHRcdHRoaXMuYWRkT3V0cHV0RWxlbWVudCgpO1xuXHR9XG5cblx0Ly8gUmVnaXN0ZXIgZG9tIGV2ZW50IGxpc3RlbmVyc1xuXHR0aGlzLnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHQvLyBBbmltYXRlXG5cdHRoaXMuYW5pbWF0ZS5jYWxsKCB0aGlzICk7XG5cbn07XG5cblZpZXdlci5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogVmlld2VyLFxuXG5cdC8qKlxuXHQgKiBBZGQgYW4gb2JqZWN0IHRvIHRoZSBzY2VuZVxuXHQgKiBBdXRvbWF0aWNhbGx5IGhvb2t1cCB3aXRoIHBhbm9sZW5zLXZpZXdlci1oYW5kbGVyIGxpc3RlbmVyXG5cdCAqIHRvIGNvbW11bmljYXRlIHdpdGggdmlld2VyIG1ldGhvZFxuXHQgKiBAcGFyYW0ge1RIUkVFLk9iamVjdDNEfSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGJlIGFkZGVkXG5cdCAqL1xuXHRhZGQ6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0XHR0aGlzLmFkZCggYXJndW1lbnRzWyBpIF0gKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdHRoaXMuc2NlbmUuYWRkKCBvYmplY3QgKTtcblxuXHRcdC8vIEFsbCBvYmplY3QgYWRkZWQgdG8gc2NlbmUgaGFzICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicgZXZlbnQgdG8gaGFuZGxlIHZpZXdlciBjb21tdW5pY2F0aW9uXG5cdFx0aWYgKCBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lciApIHtcblxuXHRcdFx0b2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0fVxuXG5cdFx0Ly8gQWxsIG9iamVjdCBhZGRlZCB0byBzY2VuZSBiZWluZyBwYXNzZWQgd2l0aCBjb250YWluZXJcblx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFBhbm9yYW1hICYmIG9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtY29udGFpbmVyJywgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lciB9ICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIENhbWVyYVBhbm9yYW1hICkge1xuXG5cdFx0XHRvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtc2NlbmUnLCBzY2VuZTogdGhpcy5zY2VuZSB9ICk7XG5cblx0XHR9XG5cblx0XHQvLyBIb29rdXAgZGVmYXVsdCBwYW5vcmFtYSBldmVudCBsaXN0ZW5lcnNcblx0XHRpZiAoIG9iamVjdC50eXBlID09PSAncGFub3JhbWEnICkge1xuXG5cdFx0XHR0aGlzLmFkZFBhbm9yYW1hRXZlbnRMaXN0ZW5lciggb2JqZWN0ICk7XG5cblx0XHRcdGlmICggIXRoaXMucGFub3JhbWEgKSB7XG5cblx0XHRcdFx0dGhpcy5zZXRQYW5vcmFtYSggb2JqZWN0ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYW4gb2JqZWN0IGZyb20gdGhlIHNjZW5lXG5cdCAqIEBwYXJhbSAge1RIUkVFLk9iamVjdDNEfSBvYmplY3QgLSBPYmplY3QgdG8gYmUgcmVtb3ZlZFxuXHQgKi9cblx0cmVtb3ZlOiBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuXHRcdGlmICggb2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cblx0XHRcdG9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyKCAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCB0aGlzLmV2ZW50SGFuZGxlci5iaW5kKCB0aGlzICkgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuc2NlbmUucmVtb3ZlKCBvYmplY3QgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBZGQgZGVmYXVsdCBjb250cm9sIGJhclxuXHQgKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBjb250cm9sIGJ1dHRvbnMgYXJyYXlcblx0ICovXG5cdGFkZERlZmF1bHRDb250cm9sQmFyOiBmdW5jdGlvbiAoIGFycmF5ICkge1xuXG5cdFx0aWYgKCB0aGlzLndpZGdldCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnRGVmYXVsdCBjb250cm9sIGJhciBleGlzdHMnICk7XG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHRjb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KCB0aGlzLmNvbnRhaW5lciApO1xuXHRcdHdpZGdldC5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCB0aGlzLmV2ZW50SGFuZGxlci5iaW5kKCB0aGlzICkgKTtcblx0XHR3aWRnZXQuYWRkQ29udHJvbEJhcigpO1xuXHRcdGFycmF5LmZvckVhY2goIGJ1dHRvbk5hbWUgPT4ge1xuXG5cdFx0XHR3aWRnZXQuYWRkQ29udHJvbEJ1dHRvbiggYnV0dG9uTmFtZSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy53aWRnZXQgPSB3aWRnZXQ7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IGEgcGFub3JhbWEgdG8gYmUgdGhlIGN1cnJlbnQgb25lXG5cdCAqIEBwYXJhbSB7UEFOT0xFTlMuUGFub3JhbWF9IHBhbm8gLSBQYW5vcmFtYSB0byBiZSBzZXRcblx0ICovXG5cdHNldFBhbm9yYW1hOiBmdW5jdGlvbiAoIHBhbm8gKSB7XG5cblx0XHRjb25zdCBsZWF2aW5nUGFub3JhbWEgPSB0aGlzLnBhbm9yYW1hO1xuXG5cdFx0aWYgKCBwYW5vLnR5cGUgPT09ICdwYW5vcmFtYScgJiYgbGVhdmluZ1Bhbm9yYW1hICE9PSBwYW5vICkge1xuXG5cdFx0XHQvLyBDbGVhciBleGlzaXRpbmcgaW5mb3Nwb3Rcblx0XHRcdHRoaXMuaGlkZUluZm9zcG90KCk7XG5cblx0XHRcdGNvbnN0IGFmdGVyRW50ZXJDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRsZWF2aW5nUGFub3JhbWEgJiYgbGVhdmluZ1Bhbm9yYW1hLm9uTGVhdmUoKTtcblx0XHRcdFx0cGFuby5yZW1vdmVFdmVudExpc3RlbmVyKCAnZW50ZXItZmFkZS1zdGFydCcsIGFmdGVyRW50ZXJDb21wbGV0ZSApO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHRwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgYWZ0ZXJFbnRlckNvbXBsZXRlICk7XG5cblx0XHRcdC8vIEFzc2lnbiBhbmQgZW50ZXIgcGFub3JhbWFcblx0XHRcdCh0aGlzLnBhbm9yYW1hID0gcGFubykub25FbnRlcigpO1xuXHRcdFx0XG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEV2ZW50IGhhbmRsZXIgdG8gZXhlY3V0ZSBjb21tYW5kcyBmcm9tIGNoaWxkIG9iamVjdHNcblx0ICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIGRpc3BhdGNoZWQgZXZlbnQgd2l0aCBtZXRob2QgYXMgZnVuY3Rpb24gbmFtZSBhbmQgZGF0YSBhcyBhbiBhcmd1bWVudFxuXHQgKi9cblx0ZXZlbnRIYW5kbGVyOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0aWYgKCBldmVudC5tZXRob2QgJiYgdGhpc1sgZXZlbnQubWV0aG9kIF0gKSB7XG5cblx0XHRcdHRoaXNbIGV2ZW50Lm1ldGhvZCBdKCBldmVudC5kYXRhICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogRGlzcGF0Y2ggZXZlbnQgdG8gYWxsIGRlc2NlbmRhbnRzXG5cdCAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgLSBFdmVudCB0byBiZSBwYXNzZWQgYWxvbmdcblx0ICovXG5cdGRpc3BhdGNoRXZlbnRUb0NoaWxkcmVuOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0dGhpcy5zY2VuZS50cmF2ZXJzZSggZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0b2JqZWN0LmRpc3BhdGNoRXZlbnQoIGV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQgY29udGVudFxuXHQgKiBAcGFyYW0gIHtpbnRlZ2VyfSBjb250cm9sSW5kZXggLSBDb250cm9sIGluZGV4XG5cdCAqIEBwYXJhbSAge1BBTk9MRU5TLk1vZGVzfSBtb2RlIC0gTW9kZXMgZm9yIGVmZmVjdHNcblx0ICovXG5cdGFjdGl2YXRlV2lkZ2V0SXRlbTogZnVuY3Rpb24gKCBjb250cm9sSW5kZXgsIG1vZGUgKSB7XG5cblx0XHRjb25zdCBtYWluTWVudSA9IHRoaXMud2lkZ2V0Lm1haW5NZW51O1xuXHRcdGNvbnN0IENvbnRyb2xNZW51SXRlbSA9IG1haW5NZW51LmNoaWxkcmVuWyAwIF07XG5cdFx0Y29uc3QgTW9kZU1lbnVJdGVtID0gbWFpbk1lbnUuY2hpbGRyZW5bIDEgXTtcblxuXHRcdGxldCBpdGVtO1xuXG5cdFx0aWYgKCBjb250cm9sSW5kZXggIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0c3dpdGNoICggY29udHJvbEluZGV4ICkge1xuXG5cdFx0XHRcdGNhc2UgMDpcblxuXHRcdFx0XHRcdGl0ZW0gPSBDb250cm9sTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMSBdO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAxOlxuXG5cdFx0XHRcdFx0aXRlbSA9IENvbnRyb2xNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAyIF07XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdGl0ZW0gPSBDb250cm9sTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMSBdO1xuXG5cdFx0XHRcdFx0YnJlYWs7XHRcblxuXHRcdFx0fVxuXG5cdFx0XHRDb250cm9sTWVudUl0ZW0uc3ViTWVudS5zZXRBY3RpdmVJdGVtKCBpdGVtIClcblx0XHRcdENvbnRyb2xNZW51SXRlbS5zZXRTZWxlY3Rpb25UaXRsZSggaXRlbS50ZXh0Q29udGVudCApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBtb2RlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHN3aXRjaCggbW9kZSApIHtcblxuXHRcdFx0XHRjYXNlIE1PREVTLkNBUkRCT0FSRDpcblxuXHRcdFx0XHRcdGl0ZW0gPSBNb2RlTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMiBdO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSBNT0RFUy5TVEVSRU86XG5cblx0XHRcdFx0XHRpdGVtID0gTW9kZU1lbnVJdGVtLnN1Yk1lbnUuY2hpbGRyZW5bIDMgXTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0aXRlbSA9IE1vZGVNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAxIF07XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0TW9kZU1lbnVJdGVtLnN1Yk1lbnUuc2V0QWN0aXZlSXRlbSggaXRlbSApXG5cdFx0XHRNb2RlTWVudUl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUoIGl0ZW0udGV4dENvbnRlbnQgKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBFbmFibGUgcmVuZGVyaW5nIGVmZmVjdFxuXHQgKiBAcGFyYW0gIHtQQU5PTEVOUy5Nb2Rlc30gbW9kZSAtIE1vZGVzIGZvciBlZmZlY3RzXG5cdCAqL1xuXHRlbmFibGVFZmZlY3Q6IGZ1bmN0aW9uICggbW9kZSApIHtcblxuXHRcdGlmICggdGhpcy5tb2RlID09PSBtb2RlICkgeyByZXR1cm47IH1cblx0XHRpZiAoIG1vZGUgPT09IE1PREVTLk5PUk1BTCApIHsgdGhpcy5kaXNhYmxlRWZmZWN0KCk7IHJldHVybjsgfVxuXHRcdGVsc2UgeyB0aGlzLm1vZGUgPSBtb2RlOyB9XG5cblx0XHRjb25zdCBmb3YgPSB0aGlzLmNhbWVyYS5mb3Y7XG5cblx0XHRzd2l0Y2goIG1vZGUgKSB7XG5cblx0XHRcdGNhc2UgTU9ERVMuQ0FSREJPQVJEOlxuXG5cdFx0XHRcdHRoaXMuZWZmZWN0ID0gdGhpcy5DYXJkYm9hcmRFZmZlY3Q7XG5cdFx0XHRcdHRoaXMuZW5hYmxlUmV0aWNsZUNvbnRyb2woKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBNT0RFUy5TVEVSRU86XG5cblx0XHRcdFx0dGhpcy5lZmZlY3QgPSB0aGlzLlN0ZXJlb0VmZmVjdDtcblx0XHRcdFx0dGhpcy5lbmFibGVSZXRpY2xlQ29udHJvbCgpO1xuXHRcdFx0XHRcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0dGhpcy5lZmZlY3QgPSBudWxsO1xuXHRcdFx0XHR0aGlzLmRpc2FibGVSZXRpY2xlQ29udHJvbCgpO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5hY3RpdmF0ZVdpZGdldEl0ZW0oIHVuZGVmaW5lZCwgdGhpcy5tb2RlICk7XG5cblx0XHQvKipcblx0XHQgKiBEdWFsIGV5ZSBlZmZlY3QgZXZlbnRcblx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdCAqIEBldmVudCBQQU5PTEVOUy5JbmZvc3BvdCNwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3Rcblx0XHQgKiBAcHJvcGVydHkge1BBTk9MRU5TLk1vZGVzfSBtb2RlIC0gQ3VycmVudCBkaXNwbGF5IG1vZGVcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnRUb0NoaWxkcmVuKCB7IHR5cGU6ICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCBtb2RlOiB0aGlzLm1vZGUgfSApO1xuXG5cdFx0Ly8gRm9yY2UgZWZmZWN0IHN0ZXJlbyBjYW1lcmEgdG8gdXBkYXRlIGJ5IHJlZnJlc2hpbmcgZm92XG5cdFx0dGhpcy5jYW1lcmEuZm92ID0gZm92ICsgMTBlLTM7XG5cdFx0dGhpcy5lZmZlY3Quc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0dGhpcy5jYW1lcmEuZm92ID0gZm92O1xuXG5cdFx0LyoqXG5cdFx0ICogRGlzcGF0Y2ggbW9kZSBjaGFuZ2UgZXZlbnRcblx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdCAqIEBldmVudCBQQU5PTEVOUy5WaWV3ZXIjbW9kZS1jaGFuZ2Vcblx0XHQgKiBAcHJvcGVydHkge1BBTk9MRU5TLk1vZGVzfSBtb2RlIC0gQ3VycmVudCBkaXNwbGF5IG1vZGVcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ21vZGUtY2hhbmdlJywgbW9kZTogdGhpcy5tb2RlIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIGFkZGl0aW9uYWwgcmVuZGVyaW5nIGVmZmVjdFxuXHQgKi9cblx0ZGlzYWJsZUVmZmVjdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB0aGlzLm1vZGUgPT09IE1PREVTLk5PUk1BTCApIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLm1vZGUgPSBNT0RFUy5OT1JNQUw7XG5cdFx0dGhpcy5kaXNhYmxlUmV0aWNsZUNvbnRyb2woKTtcblxuXHRcdHRoaXMuYWN0aXZhdGVXaWRnZXRJdGVtKCB1bmRlZmluZWQsIHRoaXMubW9kZSApO1xuXG5cdFx0LyoqXG5cdFx0ICogRHVhbCBleWUgZWZmZWN0IGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuSW5mb3Nwb3QjcGFub2xlbnMtZHVhbC1leWUtZWZmZWN0XG5cdFx0ICogQHByb3BlcnR5IHtQQU5PTEVOUy5Nb2Rlc30gbW9kZSAtIEN1cnJlbnQgZGlzcGxheSBtb2RlXG5cdFx0ICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50VG9DaGlsZHJlbiggeyB0eXBlOiAncGFub2xlbnMtZHVhbC1leWUtZWZmZWN0JywgbW9kZTogdGhpcy5tb2RlIH0gKTtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cblx0XHQvKipcblx0XHQgKiBEaXNwYXRjaCBtb2RlIGNoYW5nZSBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciNtb2RlLWNoYW5nZVxuXHRcdCAqIEBwcm9wZXJ0eSB7UEFOT0xFTlMuTW9kZXN9IG1vZGUgLSBDdXJyZW50IGRpc3BsYXkgbW9kZVxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnbW9kZS1jaGFuZ2UnLCBtb2RlOiB0aGlzLm1vZGUgfSApO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBFbmFibGUgcmV0aWNsZSBjb250cm9sXG5cdCAqL1xuXHRlbmFibGVSZXRpY2xlQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB0aGlzLnJldGljbGUudmlzaWJsZSApIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLnRlbXBFbmFibGVSZXRpY2xlID0gdHJ1ZTtcblxuXHRcdC8vIFJlZ2lzdGVyIHJldGljbGUgZXZlbnQgYW5kIHVucmVnaXN0ZXIgbW91c2UgZXZlbnRcblx0XHR0aGlzLnVucmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzKCk7XG5cdFx0dGhpcy5yZXRpY2xlLnNob3coKTtcblx0XHR0aGlzLnJlZ2lzdGVyUmV0aWNsZUV2ZW50KCk7XG5cdFx0dGhpcy51cGRhdGVSZXRpY2xlRXZlbnQoKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIHJldGljbGUgY29udHJvbFxuXHQgKi9cblx0ZGlzYWJsZVJldGljbGVDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnRlbXBFbmFibGVSZXRpY2xlID0gZmFsc2U7XG5cblx0XHQvLyBSZWdpc3RlciBtb3VzZSBldmVudCBhbmQgdW5yZWdpc3RlciByZXRpY2xlIGV2ZW50XG5cdFx0aWYgKCAhdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgKSB7XG5cblx0XHRcdHRoaXMucmV0aWNsZS5oaWRlKCk7XG5cdFx0XHR0aGlzLnVucmVnaXN0ZXJSZXRpY2xlRXZlbnQoKTtcblx0XHRcdHRoaXMucmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzKCk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnVwZGF0ZVJldGljbGVFdmVudCgpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEVuYWJsZSBhdXRvIHJvdGF0aW9uXG5cdCAqL1xuXHRlbmFibGVBdXRvUmF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5vcHRpb25zLmF1dG9Sb3RhdGUgPSB0cnVlO1xuXHRcdHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gdHJ1ZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIGF1dG8gcm90YXRpb25cblx0ICovXG5cdGRpc2FibGVBdXRvUmF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y2xlYXJUaW1lb3V0KCB0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQgKTtcblx0XHR0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuXHRcdHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG5cblx0fSxcblxuXHQvKipcblx0ICogVG9nZ2xlIHZpZGVvIHBsYXkgb3Igc3RvcFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLXRvZ2dsZVxuXHQgKi9cblx0dG9nZ2xlVmlkZW9QbGF5OiBmdW5jdGlvbiAoIHBhdXNlICkge1xuXG5cdFx0aWYgKCB0aGlzLnBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUb2dnbGUgdmlkZW8gZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLXRvZ2dsZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLXRvZ2dsZScsIHBhdXNlOiBwYXVzZSB9ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IGN1cnJlbnRUaW1lIGluIGEgdmlkZW9cblx0ICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBQZXJjZW50YWdlIG9mIGEgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLXRpbWVcblx0ICovXG5cdHNldFZpZGVvQ3VycmVudFRpbWU6IGZ1bmN0aW9uICggcGVyY2VudGFnZSApIHtcblxuXHRcdGlmICggdGhpcy5wYW5vcmFtYSBpbnN0YW5jZW9mIFZpZGVvUGFub3JhbWEgKSB7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0dGluZyB2aWRlbyB0aW1lIGV2ZW50XG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciN2aWRlby10aW1lXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gcGVyY2VudGFnZSAtIFBlcmNlbnRhZ2Ugb2YgYSB2aWRlby4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMucGFub3JhbWEuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndmlkZW8tdGltZScsIHBlcmNlbnRhZ2U6IHBlcmNlbnRhZ2UgfSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiB2aWRlbyB1cGRhdGVzIGlmIGFuIHdpZGdldCBpcyBwcmVzZW50XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gUGVyY2VudGFnZSBvZiBhIHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcblx0ICogQGZpcmVzIFBBTk9MRU5TLlZpZXdlciN2aWRlby11cGRhdGVcblx0ICovXG5cdG9uVmlkZW9VcGRhdGU6IGZ1bmN0aW9uICggcGVyY2VudGFnZSApIHtcblxuXHRcdC8qKlxuXHRcdCAqIFZpZGVvIHVwZGF0ZSBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciN2aWRlby11cGRhdGVcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gcGVyY2VudGFnZSAtIFBlcmNlbnRhZ2Ugb2YgYSB2aWRlby4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG5cdFx0ICovXG5cdFx0dGhpcy53aWRnZXQgJiYgdGhpcy53aWRnZXQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndmlkZW8tdXBkYXRlJywgcGVyY2VudGFnZTogcGVyY2VudGFnZSB9ICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogQWRkIHVwZGF0ZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdCAqL1xuXHRhZGRVcGRhdGVDYWxsYmFjazogZnVuY3Rpb24gKCBmbiApIHtcblxuXHRcdGlmICggZm4gKSB7XG5cblx0XHRcdHRoaXMudXBkYXRlQ2FsbGJhY2tzLnB1c2goIGZuICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogUmVtb3ZlIHVwZGF0ZSBjYWxsYmFja1xuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuXHQgKi9cblx0cmVtb3ZlVXBkYXRlQ2FsbGJhY2s6IGZ1bmN0aW9uICggZm4gKSB7XG5cblx0XHRjb25zdCBpbmRleCA9IHRoaXMudXBkYXRlQ2FsbGJhY2tzLmluZGV4T2YoIGZuICk7XG5cblx0XHRpZiAoIGZuICYmIGluZGV4ID49IDAgKSB7XG5cblx0XHRcdHRoaXMudXBkYXRlQ2FsbGJhY2tzLnNwbGljZSggaW5kZXgsIDEgKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTaG93IHZpZGVvIHdpZGdldFxuXHQgKi9cblx0c2hvd1ZpZGVvV2lkZ2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKipcblx0XHQgKiBTaG93IHZpZGVvIHdpZGdldCBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciN2aWRlby1jb250cm9sLXNob3dcblx0XHQgKi9cblx0XHR0aGlzLndpZGdldCAmJiB0aGlzLndpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby1jb250cm9sLXNob3cnIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBIaWRlIHZpZGVvIHdpZGdldFxuXHQgKi9cblx0aGlkZVZpZGVvV2lkZ2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKipcblx0XHQgKiBIaWRlIHZpZGVvIHdpZGdldFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciN2aWRlby1jb250cm9sLWhpZGVcblx0XHQgKi9cblx0XHR0aGlzLndpZGdldCAmJiB0aGlzLndpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby1jb250cm9sLWhpZGUnIH0gKTtcblxuXHR9LFxuXG5cdHVwZGF0ZVZpZGVvUGxheUJ1dHRvbjogZnVuY3Rpb24gKCBwYXVzZWQgKSB7XG5cblx0XHRpZiAoIHRoaXMud2lkZ2V0ICYmIFxuXHRcdFx0XHR0aGlzLndpZGdldC52aWRlb0VsZW1lbnQgJiYgXG5cdFx0XHRcdHRoaXMud2lkZ2V0LnZpZGVvRWxlbWVudC5jb250cm9sQnV0dG9uICkge1xuXG5cdFx0XHR0aGlzLndpZGdldC52aWRlb0VsZW1lbnQuY29udHJvbEJ1dHRvbi51cGRhdGUoIHBhdXNlZCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEFkZCBkZWZhdWx0IHBhbm9yYW1hIGV2ZW50IGxpc3RlbmVyc1xuXHQgKiBAcGFyYW0ge1BBTk9MRU5TLlBhbm9yYW1hfSBwYW5vIC0gVGhlIHBhbm9yYW1hIHRvIGJlIGFkZGVkIHdpdGggZXZlbnQgbGlzdGVuZXJcblx0ICovXG5cdGFkZFBhbm9yYW1hRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKCBwYW5vICkge1xuXG5cdFx0Ly8gU2V0IGNhbWVyYSBjb250cm9sIG9uIGV2ZXJ5IHBhbm9yYW1hXG5cdFx0cGFuby5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXItZmFkZS1zdGFydCcsIHRoaXMuc2V0Q2FtZXJhQ29udHJvbC5iaW5kKCB0aGlzICkgKTtcblxuXHRcdC8vIFNob3cgYW5kIGhpZGUgd2lkZ2V0IGV2ZW50IG9ubHkgd2hlbiBpdCdzIFBBTk9MRU5TLlZpZGVvUGFub3JhbWFcblx0XHRpZiAoIHBhbm8gaW5zdGFuY2VvZiBWaWRlb1Bhbm9yYW1hICkge1xuXG5cdFx0XHRwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgdGhpcy5zaG93VmlkZW9XaWRnZXQuYmluZCggdGhpcyApICk7XG5cdFx0XHRwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdsZWF2ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoICEodGhpcy5wYW5vcmFtYSBpbnN0YW5jZW9mIFZpZGVvUGFub3JhbWEpICkge1xuXG5cdFx0XHRcdFx0dGhpcy5oaWRlVmlkZW9XaWRnZXQuY2FsbCggdGhpcyApO1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBjYW1lcmEgY29udHJvbFxuXHQgKi9cblx0c2V0Q2FtZXJhQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLnRhcmdldC5jb3B5KCB0aGlzLnBhbm9yYW1hLnBvc2l0aW9uICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IGN1cnJlbnQgY2FtZXJhIGNvbnRyb2xcblx0ICogQHJldHVybiB7b2JqZWN0fSAtIEN1cnJlbnQgbmF2aWdhdGlvbiBjb250cm9sLiBUSFJFRS5PcmJpdENvbnRyb2xzIG9yIFRIUkVFLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHNcblx0ICovXG5cdGdldENvbnRyb2w6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmNvbnRyb2w7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IHNjZW5lXG5cdCAqIEByZXR1cm4ge1RIUkVFLlNjZW5lfSAtIEN1cnJlbnQgc2NlbmUgd2hpY2ggdGhlIHZpZXdlciBpcyBidWlsdCBvblxuXHQgKi9cblx0Z2V0U2NlbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNjZW5lO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBjYW1lcmFcblx0ICogQHJldHVybiB7VEhSRUUuQ2FtZXJhfSAtIFRoZSBzY2VuZSBjYW1lcmFcblx0ICovXG5cdGdldENhbWVyYTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuY2FtZXJhO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCByZW5kZXJlclxuXHQgKiBAcmV0dXJuIHtUSFJFRS5XZWJHTFJlbmRlcmVyfSAtIFRoZSByZW5kZXJlciB1c2luZyB3ZWJnbFxuXHQgKi9cblx0Z2V0UmVuZGVyZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnJlbmRlcmVyO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBjb250YWluZXJcblx0ICogQHJldHVybiB7SFRNTERPTUVsZW1lbnR9IC0gVGhlIGNvbnRhaW5lciBob2xkcyByZW5kZXJlcmQgY2FudmFzXG5cdCAqL1xuXHRnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmNvbnRhaW5lcjtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgY29udHJvbCBuYW1lXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gLSBDb250cm9sIG5hbWUuICdvcmJpdCcgb3IgJ2RldmljZS1vcmllbnRhdGlvbidcblx0ICovXG5cdGdldENvbnRyb2xJZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuY29udHJvbC5pZDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgbmV4dCBuYXZpZ2F0aW9uIGNvbnRyb2wgbmFtZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IC0gTmV4dCBjb250cm9sIG5hbWVcblx0ICovXG5cdGdldE5leHRDb250cm9sTmFtZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuY29udHJvbHNbIHRoaXMuZ2V0TmV4dENvbnRyb2xJbmRleCgpIF0uaWQ7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IG5leHQgbmF2aWdhdGlvbiBjb250cm9sIGluZGV4XG5cdCAqIEByZXR1cm4ge251bWJlcn0gLSBOZXh0IGNvbnRyb2wgaW5kZXhcblx0ICovXG5cdGdldE5leHRDb250cm9sSW5kZXg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IGNvbnRyb2xzID0gdGhpcy5jb250cm9scztcblx0XHRjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuXHRcdGNvbnN0IG5leHRJbmRleCA9IGNvbnRyb2xzLmluZGV4T2YoIGNvbnRyb2wgKSArIDE7XG5cblx0XHRyZXR1cm4gKCBuZXh0SW5kZXggPj0gY29udHJvbHMubGVuZ3RoICkgPyAwIDogbmV4dEluZGV4O1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBmaWVsZCBvZiB2aWV3IG9mIGNhbWVyYVxuXHQgKi9cblx0c2V0Q2FtZXJhRm92OiBmdW5jdGlvbiAoIGZvdiApIHtcblxuXHRcdHRoaXMuY2FtZXJhLmZvdiA9IGZvdjtcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0fSxcblxuXHQvKipcblx0ICogRW5hYmxlIGNvbnRyb2wgYnkgaW5kZXhcblx0ICogQHBhcmFtICB7UEFOT0xFTlMuQ29udHJvbHN9IGluZGV4IC0gSW5kZXggb2YgY2FtZXJhIGNvbnRyb2xcblx0ICovXG5cdGVuYWJsZUNvbnRyb2w6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cblx0XHRpbmRleCA9ICggaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuY29udHJvbHMubGVuZ3RoICkgPyBpbmRleCA6IDA7XG5cblx0XHR0aGlzLmNvbnRyb2wuZW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5jb250cm9sID0gdGhpcy5jb250cm9sc1sgaW5kZXggXTtcblxuXHRcdHRoaXMuY29udHJvbC5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIENPTlRST0xTLk9SQklUOlxuXG5cdFx0XHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoIHRoaXMucGFub3JhbWEucG9zaXRpb24gKTtcblx0XHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueiArPSAxO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIENPTlRST0xTLkRFVklDRU9SSUVOVEFUSU9OOlxuXG5cdFx0XHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoIHRoaXMucGFub3JhbWEucG9zaXRpb24gKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRyb2wudXBkYXRlKCk7XG5cblx0XHR0aGlzLmFjdGl2YXRlV2lkZ2V0SXRlbSggaW5kZXgsIHVuZGVmaW5lZCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc2FibGUgY3VycmVudCBjb250cm9sXG5cdCAqL1xuXHRkaXNhYmxlQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5jb250cm9sLmVuYWJsZWQgPSBmYWxzZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgbmV4dCBjb250cm9sXG5cdCAqL1xuXHR0b2dnbGVOZXh0Q29udHJvbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5lbmFibGVDb250cm9sKCB0aGlzLmdldE5leHRDb250cm9sSW5kZXgoKSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNjcmVlbiBTcGFjZSBQcm9qZWN0aW9uXG5cdCAqL1xuXHRnZXRTY3JlZW5WZWN0b3I6IGZ1bmN0aW9uICggd29ybGRWZWN0b3IgKSB7XG5cblx0XHRjb25zdCB2ZWN0b3IgPSB3b3JsZFZlY3Rvci5jbG9uZSgpO1xuXHRcdGNvbnN0IHdpZHRoSGFsZiA9ICggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggKSAvIDI7XG5cdFx0Y29uc3QgaGVpZ2h0SGFsZiA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDI7XG5cblx0XHR2ZWN0b3IucHJvamVjdCggdGhpcy5jYW1lcmEgKTtcblxuXHRcdHZlY3Rvci54ID0gKCB2ZWN0b3IueCAqIHdpZHRoSGFsZiApICsgd2lkdGhIYWxmO1xuXHRcdHZlY3Rvci55ID0gLSAoIHZlY3Rvci55ICogaGVpZ2h0SGFsZiApICsgaGVpZ2h0SGFsZjtcblx0XHR2ZWN0b3IueiA9IDA7XG5cblx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIFNwcml0ZSBpbiBWaWV3cG9ydFxuXHQgKi9cblx0Y2hlY2tTcHJpdGVJblZpZXdwb3J0OiBmdW5jdGlvbiAoIHNwcml0ZSApIHtcblxuXHRcdHRoaXMuY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZS5nZXRJbnZlcnNlKCB0aGlzLmNhbWVyYS5tYXRyaXhXb3JsZCApO1xuXHRcdHRoaXMuY2FtZXJhVmlld1Byb2plY3Rpb25NYXRyaXgubXVsdGlwbHlNYXRyaWNlcyggdGhpcy5jYW1lcmEucHJvamVjdGlvbk1hdHJpeCwgdGhpcy5jYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICk7XG5cdFx0dGhpcy5jYW1lcmFGcnVzdHVtLnNldEZyb21NYXRyaXgoIHRoaXMuY2FtZXJhVmlld1Byb2plY3Rpb25NYXRyaXggKTtcblxuXHRcdHJldHVybiBzcHJpdGUudmlzaWJsZSAmJiB0aGlzLmNhbWVyYUZydXN0dW0uaW50ZXJzZWN0c1Nwcml0ZSggc3ByaXRlICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogUmV2ZXJzZSBkcmFnZ2luZyBkaXJlY3Rpb25cblx0ICovXG5cdHJldmVyc2VEcmFnZ2luZ0RpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLnJvdGF0ZVNwZWVkICo9IC0xO1xuXHRcdHRoaXMuT3JiaXRDb250cm9scy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgKj0gLTE7XG5cblx0fSxcblxuXHQvKipcblx0ICogQWRkIHJldGljbGUgXG5cdCAqL1xuXHRhZGRSZXRpY2xlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnJldGljbGUgPSBuZXcgUmV0aWNsZSggMHhmZmZmZmYsIHRydWUsIHRoaXMub3B0aW9ucy5kd2VsbFRpbWUgKTtcblx0XHR0aGlzLnJldGljbGUuaGlkZSgpO1xuXHRcdHRoaXMuY2FtZXJhLmFkZCggdGhpcy5yZXRpY2xlICk7XG5cdFx0dGhpcy5zY2VuZVJldGljbGUuYWRkKCB0aGlzLmNhbWVyYSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFR3ZWVuIGNvbnRyb2wgbG9va2luZyBjZW50ZXJcblx0ICogQHBhcmFtIHtUSFJFRS5WZWN0b3IzfSB2ZWN0b3IgLSBWZWN0b3IgdG8gYmUgbG9va2VkIGF0IHRoZSBjZW50ZXJcblx0ICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0xMDAwXSAtIER1cmF0aW9uIHRvIHR3ZWVuXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9VFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsLk91dF0gLSBFYXNpbmcgZnVuY3Rpb25cblx0ICovXG5cdHR3ZWVuQ29udHJvbENlbnRlcjogZnVuY3Rpb24gKCB2ZWN0b3IsIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cblx0XHRpZiAoIHRoaXMuY29udHJvbCAhPT0gdGhpcy5PcmJpdENvbnRyb2xzICkge1xuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHQvLyBQYXNzIGluIGFyZ3VtZW50cyBhcyBhcnJheVxuXHRcdGlmICggdmVjdG9yIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cblx0XHRcdGR1cmF0aW9uID0gdmVjdG9yWyAxIF07XG5cdFx0XHRlYXNpbmcgPSB2ZWN0b3JbIDIgXTtcblx0XHRcdHZlY3RvciA9IHZlY3RvclsgMCBdO1xuXG5cdFx0fVxuXG5cdFx0ZHVyYXRpb24gPSBkdXJhdGlvbiAhPT0gdW5kZWZpbmVkID8gZHVyYXRpb24gOiAxMDAwO1xuXHRcdGVhc2luZyA9IGVhc2luZyB8fCBUV0VFTi5FYXNpbmcuRXhwb25lbnRpYWwuT3V0O1xuXG5cdFx0dmFyIHNjb3BlLCBoYSwgdmEsIGNodiwgY3Z2LCBodiwgdnYsIHZwdGMsIG92LCBudjtcblxuXHRcdHNjb3BlID0gdGhpcztcblxuXHRcdGNodiA9IHRoaXMuY2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICk7XG5cdFx0Y3Z2ID0gY2h2LmNsb25lKCk7XG5cblx0XHR2cHRjID0gdGhpcy5wYW5vcmFtYS5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICkuc3ViKCB0aGlzLmNhbWVyYS5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICkgKTtcblxuXHRcdGh2ID0gdmVjdG9yLmNsb25lKCk7XG5cdFx0Ly8gU2NhbGUgZWZmZWN0XG5cdFx0aHYueCAqPSAtMTtcblx0XHRodi5hZGQoIHZwdGMgKS5ub3JtYWxpemUoKTtcblx0XHR2diA9IGh2LmNsb25lKCk7XG5cblx0XHRjaHYueSA9IDA7XG5cdFx0aHYueSA9IDA7XG5cblx0XHRoYSA9IE1hdGguYXRhbjIoIGh2LnosIGh2LnggKSAtIE1hdGguYXRhbjIoIGNodi56LCBjaHYueCApO1xuXHRcdGhhID0gaGEgPiBNYXRoLlBJID8gaGEgLSAyICogTWF0aC5QSSA6IGhhO1xuXHRcdGhhID0gaGEgPCAtTWF0aC5QSSA/IGhhICsgMiAqIE1hdGguUEkgOiBoYTtcblx0XHR2YSA9IE1hdGguYWJzKCBjdnYuYW5nbGVUbyggY2h2ICkgKyAoIGN2di55ICogdnYueSA8PSAwID8gdnYuYW5nbGVUbyggaHYgKSA6IC12di5hbmdsZVRvKCBodiApICkgKTtcblx0XHR2YSAqPSB2di55IDwgY3Z2LnkgPyAxIDogLTE7XG5cblx0XHRvdiA9IHsgbGVmdDogMCwgdXA6IDAgfTtcblx0XHRudiA9IHsgbGVmdDogMCwgdXA6IDAgfTtcblxuXHRcdHRoaXMudHdlZW5MZWZ0QW5pbWF0aW9uLnN0b3AoKTtcblx0XHR0aGlzLnR3ZWVuVXBBbmltYXRpb24uc3RvcCgpO1xuXG5cdFx0dGhpcy50d2VlbkxlZnRBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIG92IClcblx0XHRcdC50byggeyBsZWZ0OiBoYSB9LCBkdXJhdGlvbiApXG5cdFx0XHQuZWFzaW5nKCBlYXNpbmcgKVxuXHRcdFx0Lm9uVXBkYXRlKGZ1bmN0aW9uKG92KXtcblx0XHRcdFx0c2NvcGUuY29udHJvbC5yb3RhdGVMZWZ0KCBvdi5sZWZ0IC0gbnYubGVmdCApO1xuXHRcdFx0XHRudi5sZWZ0ID0gb3YubGVmdDtcblx0XHRcdH0pXG5cdFx0XHQuc3RhcnQoKTtcblxuXHRcdHRoaXMudHdlZW5VcEFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2Vlbiggb3YgKVxuXHRcdFx0LnRvKCB7IHVwOiB2YSB9LCBkdXJhdGlvbiApXG5cdFx0XHQuZWFzaW5nKCBlYXNpbmcgKVxuXHRcdFx0Lm9uVXBkYXRlKGZ1bmN0aW9uKG92KXtcblx0XHRcdFx0c2NvcGUuY29udHJvbC5yb3RhdGVVcCggb3YudXAgLSBudi51cCApO1xuXHRcdFx0XHRudi51cCA9IG92LnVwO1xuXHRcdFx0fSlcblx0XHRcdC5zdGFydCgpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFR3ZWVuIGNvbnRyb2wgbG9va2luZyBjZW50ZXIgYnkgb2JqZWN0XG5cdCAqIEBwYXJhbSB7VEhSRUUuT2JqZWN0M0R9IG9iamVjdCAtIE9iamVjdCB0byBiZSBsb29rZWQgYXQgdGhlIGNlbnRlclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTEwMDBdIC0gRHVyYXRpb24gdG8gdHdlZW5cblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1UV0VFTi5FYXNpbmcuRXhwb25lbnRpYWwuT3V0XSAtIEVhc2luZyBmdW5jdGlvblxuXHQgKi9cblx0dHdlZW5Db250cm9sQ2VudGVyQnlPYmplY3Q6IGZ1bmN0aW9uICggb2JqZWN0LCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG5cdFx0bGV0IGlzVW5kZXJTY2FsZVBsYWNlSG9sZGVyID0gZmFsc2U7XG5cblx0XHRvYmplY3QudHJhdmVyc2VBbmNlc3RvcnMoIGZ1bmN0aW9uICggYW5jZXN0b3IgKSB7XG5cblx0XHRcdGlmICggYW5jZXN0b3Iuc2NhbGVQbGFjZUhvbGRlciApIHtcblxuXHRcdFx0XHRpc1VuZGVyU2NhbGVQbGFjZUhvbGRlciA9IHRydWU7XG5cblx0XHRcdH1cblx0XHR9ICk7XG5cblx0XHRpZiAoIGlzVW5kZXJTY2FsZVBsYWNlSG9sZGVyICkge1xuXG5cdFx0XHR2YXIgaW52ZXJ0WFZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCAtMSwgMSwgMSApO1xuXG5cdFx0XHR0aGlzLnR3ZWVuQ29udHJvbENlbnRlciggb2JqZWN0LmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKS5tdWx0aXBseSggaW52ZXJ0WFZlY3RvciApLCBkdXJhdGlvbiwgZWFzaW5nICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnR3ZWVuQ29udHJvbENlbnRlciggb2JqZWN0LmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKSwgZHVyYXRpb24sIGVhc2luZyApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuVmlld2VyI3dpbmRvdy1yZXNpemVcblx0ICogQHBhcmFtIHtudW1iZXJ9IFt3aW5kb3dXaWR0aF0gLSBTcGVjaWZ5IGlmIGN1c3RvbSBlbGVtZW50IGhhcyBjaGFuZ2VkIHdpZHRoXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbd2luZG93SGVpZ2h0XSAtIFNwZWNpZnkgaWYgY3VzdG9tIGVsZW1lbnQgaGFzIGNoYW5nZWQgaGVpZ2h0XG5cdCAqL1xuXHRvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0ICkge1xuXG5cdFx0bGV0IHdpZHRoLCBoZWlnaHQ7XG5cblx0XHRjb25zdCBleHBhbmQgPSB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoICdwYW5vbGVucy1jb250YWluZXInICkgfHwgdGhpcy5jb250YWluZXIuaXNGdWxsc2NyZWVuO1xuXG5cdFx0aWYgKCB3aW5kb3dXaWR0aCAhPT0gdW5kZWZpbmVkICYmIHdpbmRvd0hlaWdodCAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHR3aWR0aCA9IHdpbmRvd1dpZHRoO1xuXHRcdFx0aGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xuXHRcdFx0dGhpcy5jb250YWluZXIuX3dpZHRoID0gd2luZG93V2lkdGg7XG5cdFx0XHR0aGlzLmNvbnRhaW5lci5faGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc3QgaXNBbmRyb2lkID0gLyhhbmRyb2lkKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblx0XHRcdGNvbnN0IGFkanVzdFdpZHRoID0gaXNBbmRyb2lkIFxuXHRcdFx0XHQ/IE1hdGgubWluKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgXG5cdFx0XHRcdDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcblxuXHRcdFx0Y29uc3QgYWRqdXN0SGVpZ2h0ID0gaXNBbmRyb2lkIFxuXHRcdFx0XHQ/IE1hdGgubWluKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSBcblx0XHRcdFx0OiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG5cblx0XHRcdHdpZHRoID0gZXhwYW5kID8gYWRqdXN0V2lkdGggOiB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcblx0XHRcdGhlaWdodCA9IGV4cGFuZCA/IGFkanVzdEhlaWdodCA6IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuXHRcdFx0dGhpcy5jb250YWluZXIuX3dpZHRoID0gd2lkdGg7XG5cdFx0XHR0aGlzLmNvbnRhaW5lci5faGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5jYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG5cdFx0dGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0ICk7XG5cblx0XHQvLyBVcGRhdGUgcmV0aWNsZVxuXHRcdGlmICggdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgfHwgdGhpcy50ZW1wRW5hYmxlUmV0aWNsZSApIHtcblxuXHRcdFx0dGhpcy51cGRhdGVSZXRpY2xlRXZlbnQoKTtcblxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFdpbmRvdyByZXNpemluZyBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciN3aW5kb3ctcmVzaXplXG5cdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoICAtIFdpZHRoIG9mIHRoZSB3aW5kb3dcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0IC0gSGVpZ2h0IG9mIHRoZSB3aW5kb3dcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3dpbmRvdy1yZXNpemUnLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuXHRcdHRoaXMuc2NlbmUudHJhdmVyc2UoIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG5cdFx0XHRpZiAoIG9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd3aW5kb3ctcmVzaXplJywgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH0sXG5cblx0YWRkT3V0cHV0RWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5yaWdodCA9ICcxMHB4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9ICcxMHB4Jztcblx0XHRlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjZmZmXCI7XG5cdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblx0XHR0aGlzLm91dHB1dERpdkVsZW1lbnQgPSBlbGVtZW50O1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIE91dHB1dCBpbmZvc3BvdCBhdHRhY2ggcG9zaXRpb24gaW4gZGV2ZWxvcGVyIGNvbnNvbGUgYnkgaG9sZGluZyBkb3duIEN0cmwgYnV0dG9uXG5cdCAqL1xuXHRvdXRwdXRJbmZvc3BvdFBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBpbnRlcnNlY3RzID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KCB0aGlzLnBhbm9yYW1hLCB0cnVlICk7XG5cblx0XHRpZiAoIGludGVyc2VjdHMubGVuZ3RoID4gMCApIHtcblxuXHRcdFx0Y29uc3QgcG9pbnQgPSBpbnRlcnNlY3RzWyAwIF0ucG9pbnQuY2xvbmUoKTtcblx0XHRcdGNvbnN0IGNvbnZlcnRlciA9IG5ldyBUSFJFRS5WZWN0b3IzKCAtMSwgMSwgMSApO1xuXHRcdFx0Y29uc3Qgd29ybGQgPSB0aGlzLnBhbm9yYW1hLmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKTtcblx0XHRcdHBvaW50LnN1Yiggd29ybGQgKS5tdWx0aXBseSggY29udmVydGVyICk7XG5cblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBgJHtwb2ludC54LnRvRml4ZWQoMil9LCAke3BvaW50LnkudG9GaXhlZCgyKX0sICR7cG9pbnQuei50b0ZpeGVkKDIpfWA7XG5cblx0XHRcdGlmICggcG9pbnQubGVuZ3RoKCkgPT09IDAgKSB7IHJldHVybjsgfVxuXG5cdFx0XHRzd2l0Y2ggKCB0aGlzLm9wdGlvbnMub3V0cHV0ICkge1xuXG5cdFx0XHRcdGNhc2UgJ2NvbnNvbGUnOlxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbyggbWVzc2FnZSApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ292ZXJsYXknOlxuXHRcdFx0XHRcdHRoaXMub3V0cHV0RGl2RWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH0sXG5cblx0b25Nb3VzZURvd246IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dGhpcy51c2VyTW91c2UueCA9ICggZXZlbnQuY2xpZW50WCA+PSAwICkgPyBldmVudC5jbGllbnRYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xuXHRcdHRoaXMudXNlck1vdXNlLnkgPSAoIGV2ZW50LmNsaWVudFkgPj0gMCApID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcblx0XHR0aGlzLnVzZXJNb3VzZS50eXBlID0gJ21vdXNlZG93bic7XG5cdFx0dGhpcy5vblRhcCggZXZlbnQgKTtcblxuXHR9LFxuXG5cdG9uTW91c2VNb3ZlOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnVzZXJNb3VzZS50eXBlID0gJ21vdXNlbW92ZSc7XG5cdFx0dGhpcy5vblRhcCggZXZlbnQgKTtcblxuXHR9LFxuXG5cdG9uTW91c2VVcDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGxldCBvblRhcmdldCA9IGZhbHNlO1xuXG5cdFx0dGhpcy51c2VyTW91c2UudHlwZSA9ICdtb3VzZXVwJztcblxuXHRcdGNvbnN0IHR5cGUgPSAoIHRoaXMudXNlck1vdXNlLnggPj0gZXZlbnQuY2xpZW50WCAtIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSBcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueCA8PSBldmVudC5jbGllbnRYICsgdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnkgPj0gZXZlbnQuY2xpZW50WSAtIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZVxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS55IDw9IGV2ZW50LmNsaWVudFkgKyB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2UgKSBcblx0XHRcdFx0fHwgICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnggPj0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZVxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS54IDw9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggKyB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2UgXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnkgPj0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZVxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS55IDw9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgKyB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2UgKSBcblx0XHQ/ICdjbGljaycgOiB1bmRlZmluZWQ7XG5cblx0XHQvLyBFdmVudCBzaG91bGQgaGFwcGVuIG9uIGNhbnZhc1xuXHRcdGlmICggZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmICFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCAncGFub2xlbnMtY2FudmFzJyApICkgeyByZXR1cm47IH1cblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA9PT0gMSApIHtcblxuXHRcdFx0b25UYXJnZXQgPSB0aGlzLm9uVGFwKCB7IGNsaWVudFggOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBjbGllbnRZIDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSB9LCB0eXBlICk7XG5cdFx0XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0b25UYXJnZXQgPSB0aGlzLm9uVGFwKCBldmVudCwgdHlwZSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy51c2VyTW91c2UudHlwZSA9ICdub25lJztcblxuXHRcdGlmICggb25UYXJnZXQgKSB7IFxuXG5cdFx0XHRyZXR1cm47IFxuXG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlID09PSAnY2xpY2snICkge1xuXG5cdFx0XHR0aGlzLm9wdGlvbnMuYXV0b0hpZGVJbmZvc3BvdCAmJiB0aGlzLnBhbm9yYW1hICYmIHRoaXMucGFub3JhbWEudG9nZ2xlSW5mb3Nwb3RWaXNpYmlsaXR5KCk7XG5cdFx0XHR0aGlzLm9wdGlvbnMuYXV0b0hpZGVDb250cm9sQmFyICYmIHRoaXMudG9nZ2xlQ29udHJvbEJhcigpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0b25UYXA6IGZ1bmN0aW9uICggZXZlbnQsIHR5cGUgKSB7XG5cblx0XHRjb25zdCB7IGxlZnQsIHRvcCB9ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0Y29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSB0aGlzLmNvbnRhaW5lcjtcblxuXHRcdHRoaXMucmF5Y2FzdGVyUG9pbnQueCA9ICggKCBldmVudC5jbGllbnRYIC0gbGVmdCApIC8gY2xpZW50V2lkdGggKSAqIDIgLSAxO1xuXHRcdHRoaXMucmF5Y2FzdGVyUG9pbnQueSA9IC0gKCAoIGV2ZW50LmNsaWVudFkgLSB0b3AgKSAvIGNsaWVudEhlaWdodCApICogMiArIDE7XG5cblx0XHR0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKCB0aGlzLnJheWNhc3RlclBvaW50LCB0aGlzLmNhbWVyYSApO1xuXG5cdFx0Ly8gUmV0dXJuIGlmIG5vIHBhbm9yYW1hIFxuXHRcdGlmICggIXRoaXMucGFub3JhbWEgKSB7IFxuXG5cdFx0XHRyZXR1cm47IFxuXG5cdFx0fVxuXG5cdFx0Ly8gb3V0cHV0IGluZm9zcG90IGluZm9ybWF0aW9uXG5cdFx0aWYgKCBldmVudC50eXBlICE9PSAnbW91c2Vkb3duJyAmJiB0aGlzLnRvdWNoU3VwcG9ydGVkIHx8IHRoaXMuT1VUUFVUX0lORk9TUE9UICkgeyBcblxuXHRcdFx0dGhpcy5vdXRwdXRJbmZvc3BvdFBvc2l0aW9uKCk7IFxuXG5cdFx0fVxuXG5cdFx0Y29uc3QgaW50ZXJzZWN0cyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoIHRoaXMucGFub3JhbWEuY2hpbGRyZW4sIHRydWUgKTtcblx0XHRjb25zdCBpbnRlcnNlY3RfZW50aXR5ID0gdGhpcy5nZXRDb252ZXJ0ZWRJbnRlcnNlY3QoIGludGVyc2VjdHMgKTtcblx0XHRjb25zdCBpbnRlcnNlY3QgPSAoIGludGVyc2VjdHMubGVuZ3RoID4gMCApID8gaW50ZXJzZWN0c1swXS5vYmplY3QgOiB1bmRlZmluZWQ7XG5cblx0XHRpZiAoIHRoaXMudXNlck1vdXNlLnR5cGUgPT09ICdtb3VzZXVwJyAgKSB7XG5cblx0XHRcdGlmICggaW50ZXJzZWN0X2VudGl0eSAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0ID09PSBpbnRlcnNlY3RfZW50aXR5ICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHR0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RvcC1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcmVzc0VudGl0eU9iamVjdCA9IHVuZGVmaW5lZDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy51c2VyTW91c2UudHlwZSA9PT0gJ21vdXNldXAnICApIHtcblxuXHRcdFx0aWYgKCBpbnRlcnNlY3QgJiYgdGhpcy5wcmVzc09iamVjdCA9PT0gaW50ZXJzZWN0ICYmIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHR0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RvcCcsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByZXNzT2JqZWN0ID0gdW5kZWZpbmVkO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlID09PSAnY2xpY2snICkge1xuXG5cdFx0XHR0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2NsaWNrJywgaW50ZXJzZWN0czogaW50ZXJzZWN0cywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRpZiAoIGludGVyc2VjdF9lbnRpdHkgJiYgaW50ZXJzZWN0X2VudGl0eS5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdGludGVyc2VjdF9lbnRpdHkuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnY2xpY2stZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggaW50ZXJzZWN0ICYmIGludGVyc2VjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdGludGVyc2VjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjbGljaycsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5wYW5vcmFtYS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdob3ZlcicsIGludGVyc2VjdHM6IGludGVyc2VjdHMsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0aWYgKCAoIHRoaXMuaG92ZXJPYmplY3QgJiYgaW50ZXJzZWN0cy5sZW5ndGggPiAwICYmIHRoaXMuaG92ZXJPYmplY3QgIT09IGludGVyc2VjdF9lbnRpdHkgKVxuXHRcdFx0XHR8fCAoIHRoaXMuaG92ZXJPYmplY3QgJiYgaW50ZXJzZWN0cy5sZW5ndGggPT09IDAgKSApe1xuXG5cdFx0XHRcdGlmICggdGhpcy5ob3Zlck9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0dGhpcy5ob3Zlck9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdob3ZlcmxlYXZlJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdFx0dGhpcy5yZXRpY2xlLnN0b3AoKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5ob3Zlck9iamVjdCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGludGVyc2VjdF9lbnRpdHkgJiYgaW50ZXJzZWN0cy5sZW5ndGggPiAwICkge1xuXG5cdFx0XHRcdGlmICggdGhpcy5ob3Zlck9iamVjdCAhPT0gaW50ZXJzZWN0X2VudGl0eSApIHtcblxuXHRcdFx0XHRcdHRoaXMuaG92ZXJPYmplY3QgPSBpbnRlcnNlY3RfZW50aXR5O1xuXG5cdFx0XHRcdFx0aWYgKCB0aGlzLmhvdmVyT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0XHRcdHRoaXMuaG92ZXJPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnaG92ZXJlbnRlcicsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0XHRcdFx0Ly8gU3RhcnQgcmV0aWNsZSB0aW1lclxuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLm9wdGlvbnMuYXV0b1JldGljbGVTZWxlY3QgJiYgdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgfHwgdGhpcy50ZW1wRW5hYmxlUmV0aWNsZSApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZXRpY2xlLnN0YXJ0KCB0aGlzLm9uVGFwLmJpbmQoIHRoaXMsIGV2ZW50LCAnY2xpY2snICkgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2Vkb3duJyAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0ICE9IGludGVyc2VjdF9lbnRpdHkgKSB7XG5cblx0XHRcdFx0XHR0aGlzLnByZXNzRW50aXR5T2JqZWN0ID0gaW50ZXJzZWN0X2VudGl0eTtcblxuXHRcdFx0XHRcdGlmICggdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RhcnQtZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHRoaXMudXNlck1vdXNlLnR5cGUgPT09ICdtb3VzZWRvd24nICYmIHRoaXMucHJlc3NPYmplY3QgIT0gaW50ZXJzZWN0ICkge1xuXG5cdFx0XHRcdFx0dGhpcy5wcmVzc09iamVjdCA9IGludGVyc2VjdDtcblxuXHRcdFx0XHRcdGlmICggdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RhcnQnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdGhpcy51c2VyTW91c2UudHlwZSA9PT0gJ21vdXNlbW92ZScgfHwgdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGludGVyc2VjdCAmJiBpbnRlcnNlY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHRcdFx0aW50ZXJzZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCB0aGlzLnByZXNzRW50aXR5T2JqZWN0ICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHRcdFx0dGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc21vdmUtZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCB0aGlzLnByZXNzT2JqZWN0ICYmIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHRcdFx0dGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc21vdmUnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggIWludGVyc2VjdF9lbnRpdHkgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdCAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0dGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc3N0b3AtZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdHRoaXMucHJlc3NFbnRpdHlPYmplY3QgPSB1bmRlZmluZWQ7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhaW50ZXJzZWN0ICYmIHRoaXMucHJlc3NPYmplY3QgJiYgdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdG9wJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdHRoaXMucHJlc3NPYmplY3QgPSB1bmRlZmluZWQ7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIEluZm9zcG90IGhhbmRsZXJcblx0XHRpZiAoIGludGVyc2VjdCAmJiBpbnRlcnNlY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuXHRcdFx0dGhpcy5pbmZvc3BvdCA9IGludGVyc2VjdDtcblx0XHRcdFxuXHRcdFx0aWYgKCB0eXBlID09PSAnY2xpY2snICkge1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9XG5cdFx0XHRcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuaW5mb3Nwb3QgKSB7XG5cblx0XHRcdHRoaXMuaGlkZUluZm9zcG90KCk7XG5cblx0XHR9XG5cblx0XHQvLyBBdXRvIHJvdGF0ZVxuXHRcdGlmICggdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGUgJiYgdGhpcy51c2VyTW91c2UudHlwZSAhPT0gJ21vdXNlbW92ZScgKSB7XG5cblx0XHRcdC8vIEF1dG8tcm90YXRlIGlkbGUgdGltZXJcblx0XHRcdGNsZWFyVGltZW91dCggdGhpcy5hdXRvUm90YXRlUmVxdWVzdElkICk7XG5cblx0XHRcdGlmICggdGhpcy5jb250cm9sID09PSB0aGlzLk9yYml0Q29udHJvbHMgKSB7XG5cblx0XHRcdFx0dGhpcy5PcmJpdENvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5hdXRvUm90YXRlUmVxdWVzdElkID0gd2luZG93LnNldFRpbWVvdXQoIHRoaXMuZW5hYmxlQXV0b1JhdGUuYmluZCggdGhpcyApLCB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbiApO1xuXG5cdFx0XHR9XG5cblx0XHR9XHRcdFxuXG5cdH0sXG5cblx0Z2V0Q29udmVydGVkSW50ZXJzZWN0OiBmdW5jdGlvbiAoIGludGVyc2VjdHMgKSB7XG5cblx0XHRsZXQgaW50ZXJzZWN0O1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgaW50ZXJzZWN0cy5sZW5ndGg7IGkrKyApIHtcblxuXHRcdFx0aWYgKCBpbnRlcnNlY3RzW2ldLmRpc3RhbmNlID49IDAgJiYgaW50ZXJzZWN0c1tpXS5vYmplY3QgJiYgIWludGVyc2VjdHNbaV0ub2JqZWN0LnBhc3NUaHJvdWdoICkge1xuXG5cdFx0XHRcdGlmICggaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5ICYmIGludGVyc2VjdHNbaV0ub2JqZWN0LmVudGl0eS5wYXNzVGhyb3VnaCApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fSBlbHNlIGlmICggaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5ICYmICFpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHkucGFzc1Rocm91Z2ggKSB7XG5cdFx0XHRcdFx0aW50ZXJzZWN0ID0gaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGludGVyc2VjdCA9IGludGVyc2VjdHNbaV0ub2JqZWN0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBpbnRlcnNlY3Q7XG5cblx0fSxcblxuXHRoaWRlSW5mb3Nwb3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdGhpcy5pbmZvc3BvdCApIHtcblxuXHRcdFx0dGhpcy5pbmZvc3BvdC5vbkhvdmVyRW5kKCk7XG5cblx0XHRcdHRoaXMuaW5mb3Nwb3QgPSB1bmRlZmluZWQ7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVG9nZ2xlIGNvbnRyb2wgYmFyXG5cdCAqIEBmaXJlcyBbUEFOT0xFTlMuVmlld2VyI2NvbnRyb2wtYmFyLXRvZ2dsZV1cblx0ICovXG5cdHRvZ2dsZUNvbnRyb2xCYXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZSBjb250cm9sIGJhciBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciNjb250cm9sLWJhci10b2dnbGVcblx0XHQgKi9cblx0XHR0aGlzLndpZGdldCAmJiB0aGlzLndpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjb250cm9sLWJhci10b2dnbGUnIH0gKTtcblxuXHR9LFxuXG5cdG9uS2V5RG93bjogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLm91dHB1dCAmJiB0aGlzLm9wdGlvbnMub3V0cHV0ICE9PSAnbm9uZScgJiYgZXZlbnQua2V5ID09PSAnQ29udHJvbCcgKSB7XG5cblx0XHRcdHRoaXMuT1VUUFVUX0lORk9TUE9UID0gdHJ1ZTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdG9uS2V5VXA6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuT1VUUFVUX0lORk9TUE9UID0gZmFsc2U7XG5cblx0fSxcblxuXHQvKipcblx0ICogVXBkYXRlIGNvbnRyb2wgYW5kIGNhbGxiYWNrc1xuXHQgKi9cblx0dXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRUV0VFTi51cGRhdGUoKTtcblxuXHRcdHRoaXMudXBkYXRlQ2FsbGJhY2tzLmZvckVhY2goIGZ1bmN0aW9uKCBjYWxsYmFjayApeyBjYWxsYmFjaygpOyB9ICk7XG5cblx0XHR0aGlzLmNvbnRyb2wudXBkYXRlKCk7XG5cblx0XHR0aGlzLnNjZW5lLnRyYXZlcnNlKCBmdW5jdGlvbiggY2hpbGQgKXtcblx0XHRcdGlmICggY2hpbGQgaW5zdGFuY2VvZiBJbmZvc3BvdCBcblx0XHRcdFx0JiYgY2hpbGQuZWxlbWVudCBcblx0XHRcdFx0JiYgKCB0aGlzLmhvdmVyT2JqZWN0ID09PSBjaGlsZCBcblx0XHRcdFx0XHR8fCBjaGlsZC5lbGVtZW50LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyBcblx0XHRcdFx0XHR8fCAoY2hpbGQuZWxlbWVudC5sZWZ0ICYmIGNoaWxkLmVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpXG5cdFx0XHRcdFx0fHwgKGNoaWxkLmVsZW1lbnQucmlnaHQgJiYgY2hpbGQuZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpICkgKSB7XG5cdFx0XHRcdGlmICggdGhpcy5jaGVja1Nwcml0ZUluVmlld3BvcnQoIGNoaWxkICkgKSB7XG5cdFx0XHRcdFx0Y29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldFNjcmVlblZlY3RvciggY2hpbGQuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApICk7XG5cdFx0XHRcdFx0Y2hpbGQudHJhbnNsYXRlRWxlbWVudCggeCwgeSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkLm9uRGlzbWlzcygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogUmVuZGVyaW5nIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0ICogUmVuZGVyIHJldGljbGUgbGFzdFxuXHQgKi9cblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuQ0FSREJPQVJEIHx8IHRoaXMubW9kZSA9PT0gTU9ERVMuU1RFUkVPICkge1xuXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmNsZWFyKCk7XG5cdFx0XHR0aGlzLmVmZmVjdC5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG5cdFx0XHR0aGlzLmVmZmVjdC5yZW5kZXIoIHRoaXMuc2NlbmVSZXRpY2xlLCB0aGlzLmNhbWVyYSApO1xuXHRcdFx0XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmNsZWFyKCk7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmVSZXRpY2xlLCB0aGlzLmNhbWVyYSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0YW5pbWF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5yZXF1ZXN0QW5pbWF0aW9uSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMuYW5pbWF0ZS5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHRoaXMub25DaGFuZ2UoKTtcblxuXHR9LFxuXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cblx0fSxcblxuXHQvKipcblx0ICogUmVnaXN0ZXIgbW91c2UgYW5kIHRvdWNoIGV2ZW50IG9uIGNvbnRhaW5lclxuXHQgKi9cblx0cmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBvcHRpb25zID0geyBwYXNzaXZlOiBmYWxzZSB9O1xuXG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicgLCBcdHRoaXMuSEFORExFUl9NT1VTRV9ET1dOLCBvcHRpb25zICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScgLCBcdHRoaXMuSEFORExFUl9NT1VTRV9NT1ZFLCBvcHRpb25zICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnXHQgLCBcdHRoaXMuSEFORExFUl9NT1VTRV9VUCAgLCBvcHRpb25zICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBcdHRoaXMuSEFORExFUl9NT1VTRV9ET1dOLCBvcHRpb25zICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJyAgLCBcdHRoaXMuSEFORExFUl9NT1VTRV9VUCAgLCBvcHRpb25zICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVW5yZWdpc3RlciBtb3VzZSBhbmQgdG91Y2ggZXZlbnQgb24gY29udGFpbmVyXG5cdCAqL1xuXHR1bnJlZ2lzdGVyTW91c2VBbmRUb3VjaEV2ZW50czogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicgLCAgdGhpcy5IQU5ETEVSX01PVVNFX0RPV04sIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScgLCAgdGhpcy5IQU5ETEVSX01PVVNFX01PVkUsIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnXHQsICB0aGlzLkhBTkRMRVJfTU9VU0VfVVAgICwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsICB0aGlzLkhBTkRMRVJfTU9VU0VfRE9XTiwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnICAsICB0aGlzLkhBTkRMRVJfTU9VU0VfVVAgICwgZmFsc2UgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciByZXRpY2xlIGV2ZW50XG5cdCAqL1xuXHRyZWdpc3RlclJldGljbGVFdmVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5hZGRVcGRhdGVDYWxsYmFjayggdGhpcy5IQU5ETEVSX1RBUCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFVucmVnaXN0ZXIgcmV0aWNsZSBldmVudFxuXHQgKi9cblx0dW5yZWdpc3RlclJldGljbGVFdmVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5yZW1vdmVVcGRhdGVDYWxsYmFjayggdGhpcy5IQU5ETEVSX1RBUCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFVwZGF0ZSByZXRpY2xlIGV2ZW50XG5cdCAqL1xuXHR1cGRhdGVSZXRpY2xlRXZlbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IGNsaWVudFggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDIgKyB0aGlzLmNvbnRhaW5lci5vZmZzZXRMZWZ0O1xuXHRcdGNvbnN0IGNsaWVudFkgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyO1xuXG5cdFx0dGhpcy5yZW1vdmVVcGRhdGVDYWxsYmFjayggdGhpcy5IQU5ETEVSX1RBUCApO1xuXHRcdHRoaXMuSEFORExFUl9UQVAgPSB0aGlzLm9uVGFwLmJpbmQoIHRoaXMsIHsgY2xpZW50WCwgY2xpZW50WSB9ICk7XG5cdFx0dGhpcy5hZGRVcGRhdGVDYWxsYmFjayggdGhpcy5IQU5ETEVSX1RBUCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIGNvbnRhaW5lciBhbmQgd2luZG93IGxpc3RlbmVyc1xuXHQgKi9cblx0cmVnaXN0ZXJFdmVudExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gUmVzaXplIEV2ZW50XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnICwgdGhpcy5IQU5ETEVSX1dJTkRPV19SRVNJWkUsIHRydWUgKTtcblxuXHRcdC8vIEtleWJvYXJkIEV2ZW50XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcy5IQU5ETEVSX0tFWV9ET1dOLCB0cnVlICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcgICwgdGhpcy5IQU5ETEVSX0tFWV9VUFx0ICwgdHJ1ZSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFVucmVnaXN0ZXIgY29udGFpbmVyIGFuZCB3aW5kb3cgbGlzdGVuZXJzXG5cdCAqL1xuXHR1bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIFJlc2l6ZSBFdmVudFxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJyAsIHRoaXMuSEFORExFUl9XSU5ET1dfUkVTSVpFLCB0cnVlICk7XG5cblx0XHQvLyBLZXlib2FyZCBFdmVudFxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMuSEFORExFUl9LRVlfRE9XTiwgdHJ1ZSApO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5dXAnICAsIHRoaXMuSEFORExFUl9LRVlfVVAgICwgdHJ1ZSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc3Bvc2UgYWxsIHNjZW5lIG9iamVjdHMgYW5kIGNsZWFyIGNhY2hlXG5cdCAqL1xuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBVbnJlZ2lzdGVyIGRvbSBldmVudCBsaXN0ZW5lcnNcblx0XHR0aGlzLnVucmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuXG5cdFx0Ly8gcmVjdXJzaXZlIGRpc3Bvc2FsIG9uIDNkIG9iamVjdHNcblx0XHRmdW5jdGlvbiByZWN1cnNpdmVEaXNwb3NlICggb2JqZWN0ICkge1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSApIHtcblxuXHRcdFx0XHRyZWN1cnNpdmVEaXNwb3NlKCBvYmplY3QuY2hpbGRyZW5baV0gKTtcblx0XHRcdFx0b2JqZWN0LnJlbW92ZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuXHRcdFx0XHRvYmplY3QuZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdG9iamVjdC5nZW9tZXRyeSAmJiBvYmplY3QuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuXHRcdFx0b2JqZWN0Lm1hdGVyaWFsICYmIG9iamVjdC5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cdFx0fVxuXG5cdFx0cmVjdXJzaXZlRGlzcG9zZSggdGhpcy5zY2VuZSApO1xuXG5cdFx0Ly8gZGlzcG9zZSB3aWRnZXRcblx0XHRpZiAoIHRoaXMud2lkZ2V0ICkge1xuXG5cdFx0XHR0aGlzLndpZGdldC5kaXNwb3NlKCk7XG5cdFx0XHR0aGlzLndpZGdldCA9IG51bGw7XG5cblx0XHR9XG5cblx0XHQvLyBjbGVhciBjYWNoZVxuXHRcdGlmICggQ2FjaGUgJiYgQ2FjaGUuZW5hYmxlZCApIHtcblxuXHRcdFx0Q2FjaGUuY2xlYXIoKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEZXN0b3J5IHZpZXdlciBieSBkaXNwb3NpbmcgYW5kIHN0b3BwaW5nIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHQgKi9cblx0ZGVzdG9yeTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5kaXNwb3NlKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy5yZXF1ZXN0QW5pbWF0aW9uSWQgKTtcdFx0XG5cblx0fSxcblxuXHQvKipcblx0ICogT24gcGFub3JhbWEgZGlzcG9zZVxuXHQgKi9cblx0b25QYW5vcmFtYURpc3Bvc2U6IGZ1bmN0aW9uICggcGFub3JhbWEgKSB7XG5cblx0XHRpZiAoIHBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuXHRcdFx0dGhpcy5oaWRlVmlkZW9XaWRnZXQoKTtcblxuXHRcdH1cblxuXHRcdGlmICggcGFub3JhbWEgPT09IHRoaXMucGFub3JhbWEgKSB7XG5cblx0XHRcdHRoaXMucGFub3JhbWEgPSBudWxsO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIExvYWQgYWpheCBjYWxsXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBVUkwgdG8gYmUgcmVxdWVzdGVkXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gLSBDYWxsYmFjayBhZnRlciByZXF1ZXN0IGNvbXBsZXRlc1xuXHQgKi9cblx0bG9hZEFzeW5jUmVxdWVzdDogZnVuY3Rpb24gKCB1cmwsIGNhbGxiYWNrICkge1xuXG5cdFx0Y29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHJlcXVlc3Qub25sb2FkZW5kID0gZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCBldmVudCApO1xuXHRcdH07XG5cdFx0cmVxdWVzdC5vcGVuKCBcIkdFVFwiLCB1cmwsIHRydWUgKTtcblx0XHRyZXF1ZXN0LnNlbmQoIG51bGwgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBWaWV3IGluZGljYXRvciBpbiB1cHBlciBsZWZ0XG5cdCAqL1xuXHRhZGRWaWV3SW5kaWNhdG9yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBzY29wZSA9IHRoaXM7XG5cblx0XHRmdW5jdGlvbiBsb2FkVmlld0luZGljYXRvciAoIGFzeW5jRXZlbnQgKSB7XG5cblx0XHRcdGlmICggYXN5bmNFdmVudC5sb2FkZWQgPT09IDAgKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHZpZXdJbmRpY2F0b3JEaXYgPSBhc3luY0V2ZW50LnRhcmdldC5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLndpZHRoID0gc2NvcGUudmlld0luZGljYXRvclNpemUgKyBcInB4XCI7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLmhlaWdodCA9IHNjb3BlLnZpZXdJbmRpY2F0b3JTaXplICsgXCJweFwiO1xuXHRcdFx0dmlld0luZGljYXRvckRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUudG9wID0gXCIxMHB4XCI7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLmxlZnQgPSBcIjEwcHhcIjtcblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXHRcdFx0dmlld0luZGljYXRvckRpdi5pZCA9IFwicGFub2xlbnMtdmlldy1pbmRpY2F0b3ItY29udGFpbmVyXCI7XG5cblx0XHRcdHNjb3BlLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggdmlld0luZGljYXRvckRpdiApO1xuXG5cdFx0XHRjb25zdCBpbmRpY2F0b3IgPSB2aWV3SW5kaWNhdG9yRGl2LnF1ZXJ5U2VsZWN0b3IoIFwiI2luZGljYXRvclwiICk7XG5cdFx0XHRjb25zdCBzZXRJbmRpY2F0b3JEID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHNjb3BlLnJhZGl1cyA9IHNjb3BlLnZpZXdJbmRpY2F0b3JTaXplICogMC4yMjU7XG5cdFx0XHRcdHNjb3BlLmN1cnJlbnRQYW5vQW5nbGUgPSBzY29wZS5jYW1lcmEucm90YXRpb24ueSAtIFRIUkVFLk1hdGguZGVnVG9SYWQoIDkwICk7XG5cdFx0XHRcdHNjb3BlLmZvdkFuZ2xlID0gVEhSRUUuTWF0aC5kZWdUb1JhZCggc2NvcGUuY2FtZXJhLmZvdiApIDtcblx0XHRcdFx0c2NvcGUubGVmdEFuZ2xlID0gLXNjb3BlLmN1cnJlbnRQYW5vQW5nbGUgLSBzY29wZS5mb3ZBbmdsZSAvIDI7XG5cdFx0XHRcdHNjb3BlLnJpZ2h0QW5nbGUgPSAtc2NvcGUuY3VycmVudFBhbm9BbmdsZSArIHNjb3BlLmZvdkFuZ2xlIC8gMjtcblx0XHRcdFx0c2NvcGUubGVmdFggPSBzY29wZS5yYWRpdXMgKiBNYXRoLmNvcyggc2NvcGUubGVmdEFuZ2xlICk7XG5cdFx0XHRcdHNjb3BlLmxlZnRZID0gc2NvcGUucmFkaXVzICogTWF0aC5zaW4oIHNjb3BlLmxlZnRBbmdsZSApO1xuXHRcdFx0XHRzY29wZS5yaWdodFggPSBzY29wZS5yYWRpdXMgKiBNYXRoLmNvcyggc2NvcGUucmlnaHRBbmdsZSApO1xuXHRcdFx0XHRzY29wZS5yaWdodFkgPSBzY29wZS5yYWRpdXMgKiBNYXRoLnNpbiggc2NvcGUucmlnaHRBbmdsZSApO1xuXHRcdFx0XHRzY29wZS5pbmRpY2F0b3JEID0gXCJNIFwiICsgc2NvcGUubGVmdFggKyBcIiBcIiArIHNjb3BlLmxlZnRZICsgXCIgQSBcIiArIHNjb3BlLnJhZGl1cyArIFwiIFwiICsgc2NvcGUucmFkaXVzICsgXCIgMCAwIDEgXCIgKyBzY29wZS5yaWdodFggKyBcIiBcIiArIHNjb3BlLnJpZ2h0WTtcblxuXHRcdFx0XHRpZiAoIHNjb3BlLmxlZnRYICYmIHNjb3BlLmxlZnRZICYmIHNjb3BlLnJpZ2h0WCAmJiBzY29wZS5yaWdodFkgJiYgc2NvcGUucmFkaXVzICkge1xuXG5cdFx0XHRcdFx0aW5kaWNhdG9yLnNldEF0dHJpYnV0ZSggXCJkXCIsIHNjb3BlLmluZGljYXRvckQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH07XG5cblx0XHRcdHNjb3BlLmFkZFVwZGF0ZUNhbGxiYWNrKCBzZXRJbmRpY2F0b3JEICk7XG5cblx0XHRcdGNvbnN0IGluZGljYXRvck9uTW91c2VFbnRlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcblxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgaW5kaWNhdG9yT25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG5cblx0XHRcdH07XG5cblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuYWRkRXZlbnRMaXN0ZW5lciggXCJtb3VzZWVudGVyXCIsIGluZGljYXRvck9uTW91c2VFbnRlciApO1xuXHRcdFx0dmlld0luZGljYXRvckRpdi5hZGRFdmVudExpc3RlbmVyKCBcIm1vdXNlbGVhdmVcIiwgaW5kaWNhdG9yT25Nb3VzZUxlYXZlICk7XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkQXN5bmNSZXF1ZXN0KCBEYXRhSW1hZ2UuVmlld0luZGljYXRvciwgbG9hZFZpZXdJbmRpY2F0b3IgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBlbmQgY3VzdG9tIGNvbnRyb2wgaXRlbSB0byBleGlzdGluZyBjb250cm9sIGJhclxuXHQgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbj17fV0gLSBTdHlsZSBvYmplY3QgdG8gb3ZlcndpcnRlIGRlZmF1bHQgZWxlbWVudCBzdHlsZS4gSXQgdGFrZXMgJ3N0eWxlJywgJ29uVGFwJyBhbmQgJ2dyb3VwJyBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0YXBwZW5kQ29udHJvbEl0ZW06IGZ1bmN0aW9uICggb3B0aW9uICkge1xuXG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMud2lkZ2V0LmNyZWF0ZUN1c3RvbUl0ZW0oIG9wdGlvbiApO1x0XHRcblxuXHRcdGlmICggb3B0aW9uLmdyb3VwID09PSAndmlkZW8nICkge1xuXG5cdFx0XHR0aGlzLndpZGdldC52aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoIGl0ZW0gKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMud2lkZ2V0LmJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoIGl0ZW0gKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENsZWFyIGFsbCBjYWNoZWQgZmlsZXNcblx0ICovXG5cdGNsZWFyQWxsQ2FjaGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdENhY2hlLmNsZWFyKCk7XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IFZpZXdlciB9OyIsIi8qKlxuICogUGFub2xlbnMuanNcbiAqIEBhdXRob3IgcGNoZW42NlxuICogQG5hbWVzcGFjZSBQQU5PTEVOU1xuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vQ29uc3RhbnRzJztcbmV4cG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4vRGF0YUltYWdlJztcbmV4cG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9sb2FkZXJzL0ltYWdlTG9hZGVyJztcbmV4cG9ydCB7IFRleHR1cmVMb2FkZXIgfSBmcm9tICcuL2xvYWRlcnMvVGV4dHVyZUxvYWRlcic7XG5leHBvcnQgeyBDdWJlVGV4dHVyZUxvYWRlciB9IGZyb20gJy4vbG9hZGVycy9DdWJlVGV4dHVyZUxvYWRlcic7XG5leHBvcnQgeyBNZWRpYSB9IGZyb20gJy4vbWVkaWEvTWVkaWEnO1xuZXhwb3J0IHsgUmV0aWNsZSB9IGZyb20gJy4vaW50ZXJmYWNlL1JldGljbGUnO1xuZXhwb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuL2luZm9zcG90L0luZm9zcG90JztcbmV4cG9ydCB7IFdpZGdldCB9IGZyb20gJy4vd2lkZ2V0L1dpZGdldCc7XG5leHBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvUGFub3JhbWEnO1xuZXhwb3J0IHsgSW1hZ2VQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvSW1hZ2VQYW5vcmFtYSc7XG5leHBvcnQgeyBFbXB0eVBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9FbXB0eVBhbm9yYW1hJztcbmV4cG9ydCB7IEN1YmVQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvQ3ViZVBhbm9yYW1hJztcbmV4cG9ydCB7IEJhc2ljUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0Jhc2ljUGFub3JhbWEnO1xuZXhwb3J0IHsgVmlkZW9QYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvVmlkZW9QYW5vcmFtYSc7XG5leHBvcnQgeyBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0dvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSc7XG5leHBvcnQgeyBMaXR0bGVQbGFuZXQgfSBmcm9tICcuL3Bhbm9yYW1hL0xpdHRsZVBsYW5ldCc7XG5leHBvcnQgeyBJbWFnZUxpdHRsZVBsYW5ldCB9IGZyb20gJy4vcGFub3JhbWEvSW1hZ2VMaXR0bGVQbGFuZXQnO1xuZXhwb3J0IHsgQ2FtZXJhUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0NhbWVyYVBhbm9yYW1hJztcbmV4cG9ydCB7IFZpZXdlciB9IGZyb20gJy4vdmlld2VyL1ZpZXdlcic7XG5cbi8vIGV4cG9zZSBUV0VFTlxuaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcbndpbmRvdy5UV0VFTiA9IFRXRUVOOyJdLCJuYW1l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QUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztHQUV0RTs7RUFFRCxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0dBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNaLE9BQU8sQ0FBQyxDQUFDO0lBQ1Q7O0dBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ1osT0FBTyxDQUFDLENBQUM7SUFDVDs7R0FFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztHQUVwRTs7RUFFRCxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0dBRW5CLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNaLE9BQU8sQ0FBQyxDQUFDO0lBQ1Q7O0dBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ1osT0FBTyxDQUFDLENBQUM7SUFDVDs7R0FFRCxDQUFDLElBQUksQ0FBQyxDQUFDOztHQUVQLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUNWLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUU7O0dBRUQsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O0dBRWhGOztFQUVEOztDQUVELElBQUksRUFBRTs7RUFFTCxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0dBRWhCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQzs7R0FFaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0dBRWpDOztFQUVELEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRTs7R0FFakIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDOztHQUVoQixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7R0FFdkM7O0VBRUQsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFFOztHQUVuQixJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDOztHQUV4QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDakIsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekM7O0dBRUQsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztHQUVwRDs7RUFFRDs7Q0FFRCxNQUFNLEVBQUU7O0VBRVAsRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFOztHQUVoQixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztHQUUxQzs7RUFFRCxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0dBRWpCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtJQUNuQixPQUFPLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0lBQzFCLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQy9DLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFO0lBQzVCLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ2xELE1BQU07SUFDTixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUNyRDs7R0FFRDs7RUFFRCxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0dBRW5CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtJQUNaLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDM0M7O0dBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOztHQUV0RDs7RUFFRDs7Q0FFRCxDQUFDOztBQUVGLEtBQUssQ0FBQyxhQUFhLEdBQUc7O0NBRXJCLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7O0VBRXZCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7RUFFMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0dBQ1YsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUN6Qjs7RUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7R0FDVixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDakM7O0VBRUQsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7RUFFakQ7O0NBRUQsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTs7RUFFdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7RUFDckIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUNsQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7O0VBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7R0FDNUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ25EOztFQUVELE9BQU8sQ0FBQyxDQUFDOztFQUVUOztDQUVELFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7O0VBRTNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7RUFFOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOztHQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDVixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDOztHQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztHQUUzRSxNQUFNOztHQUVOLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RDs7R0FFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDVixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFOztHQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztHQUU3Rjs7RUFFRDs7Q0FFRCxLQUFLLEVBQUU7O0VBRU4sTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7O0dBRTVCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7O0dBRTFCOztFQUVELFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRSxD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Q2pDLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztDQUVsQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRzs7RUFFekQsTUFBTSxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUNuQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDOztFQUVuQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO0VBQy9CLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDOztFQUUvRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O0VBRWhDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7RUFDckUsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sS0FBSyxHQUFHLENBQUM7O0VBRXRELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sS0FBSyxHQUFHLENBQUM7O0VBRWpEOztDQUVELFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7Q0FD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QUssR0FBRyxXQUFXLENBQUM7R0FDcEIsTUFBTSxHQUFHLFlBQVksQ0FBQztHQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7R0FDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDOztHQUV0QyxNQUFNOztHQUVOLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztHQUV6RCxNQUFNLFdBQVcsR0FBRyxTQUFTO01BQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7TUFDdEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDOztHQUUxRSxNQUFNLFlBQVksR0FBRyxTQUFTO01BQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7TUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDOztHQUU1RSxLQUFLLEdBQUcsTUFBTSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztHQUMxRCxNQUFNLEdBQUcsTUFBTSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQzs7R0FFN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0dBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7R0FFaEM7O0VBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFH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
