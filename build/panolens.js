(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.PANOLENS = {}));
}(this, function (exports) { 'use strict';

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

	exports.BasicPanorama = BasicPanorama;
	exports.CONTROLS = CONTROLS;
	exports.CameraPanorama = CameraPanorama;
	exports.CubePanorama = CubePanorama;
	exports.CubeTextureLoader = CubeTextureLoader;
	exports.DataImage = DataImage;
	exports.EmptyPanorama = EmptyPanorama;
	exports.GoogleStreetviewPanorama = GoogleStreetviewPanorama;
	exports.ImageLittlePlanet = ImageLittlePlanet;
	exports.ImageLoader = ImageLoader;
	exports.ImagePanorama = ImagePanorama;
	exports.Infospot = Infospot;
	exports.LittlePlanet = LittlePlanet;
	exports.MODES = MODES;
	exports.Media = Media;
	exports.Panorama = Panorama;
	exports.REVISION = REVISION;
	exports.Reticle = Reticle;
	exports.TextureLoader = TextureLoader;
	exports.VideoPanorama = VideoPanorama;
	exports.Viewer = Viewer;
	exports.Widget = Widget;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFub2xlbnMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25zdGFudHMuanMiLCIuLi9zcmMvRGF0YUltYWdlLmpzIiwiLi4vc3JjL2xvYWRlcnMvSW1hZ2VMb2FkZXIuanMiLCIuLi9zcmMvbG9hZGVycy9UZXh0dXJlTG9hZGVyLmpzIiwiLi4vc3JjL2xvYWRlcnMvQ3ViZVRleHR1cmVMb2FkZXIuanMiLCIuLi9zcmMvbWVkaWEvTWVkaWEuanMiLCIuLi9zcmMvaW50ZXJmYWNlL1JldGljbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwiLi4vc3JjL2luZm9zcG90L0luZm9zcG90LmpzIiwiLi4vc3JjL3dpZGdldC9XaWRnZXQuanMiLCIuLi9zcmMvcGFub3JhbWEvUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvSW1hZ2VQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9FbXB0eVBhbm9yYW1hLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0N1YmVQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9CYXNpY1Bhbm9yYW1hLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL1ZpZGVvUGFub3JhbWEuanMiLCIuLi9zcmMvbG9hZGVycy9Hb29nbGVTdHJlZXRMb2FkZXIuanMiLCIuLi9zcmMvcGFub3JhbWEvR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hLmpzIiwiLi4vc3JjL3NoYWRlcnMvU3RlcmVvZ3JhcGhpY1NoYWRlci5qcyIsIi4uL3NyYy9wYW5vcmFtYS9MaXR0bGVQbGFuZXQuanMiLCIuLi9zcmMvcGFub3JhbWEvSW1hZ2VMaXR0bGVQbGFuZXQuanMiLCIuLi9zcmMvcGFub3JhbWEvQ2FtZXJhUGFub3JhbWEuanMiLCIuLi9zcmMvbGliL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanMiLCIuLi9zcmMvbGliL2NvbnRyb2xzL0RldmljZU9yaWVudGF0aW9uQ29udHJvbHMuanMiLCIuLi9zcmMvbGliL2VmZmVjdHMvQ2FyZGJvYXJkRWZmZWN0LmpzIiwiLi4vc3JjL2xpYi9lZmZlY3RzL1N0ZXJlb0VmZmVjdC5qcyIsIi4uL3NyYy92aWV3ZXIvVmlld2VyLmpzIiwiLi4vc3JjL1Bhbm9sZW5zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuXG5leHBvcnQgY29uc3QgUkVWSVNJT04gPSB2ZXJzaW9uO1xuZXhwb3J0IGNvbnN0IENPTlRST0xTID0geyBPUkJJVDogMCwgREVWSUNFT1JJRU5UQVRJT046IDEgfTtcbmV4cG9ydCBjb25zdCBNT0RFUyA9IHsgVU5LTk9XTjogMCwgTk9STUFMOiAxLCBDQVJEQk9BUkQ6IDIsIFNURVJFTzogMyB9OyIsIi8qKlxuICogRGF0YSBJbWFnZVxuICogQG1lbWJlck9mIFBBTk9MRU5TXG4gKiBAZW51bSB7c3RyaW5nfVxuICovXG5jb25zdCBEYXRhSW1hZ2UgPSB7XG4gICAgSW5mbzogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFCQUNBWUFBQUNxYVhIZUFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBQklBQUFBU0FCR3lXcytBQUFBQ1had1FXY0FBQUJBQUFBQVFBRHE4L2hnQUFBREJrbEVRVlI0MnUyYlAwOFVRUmlIbnpGYVNZQ0kveG9rc2RCSXFHd0lpWVdSVUJJU0V4cENRMGVqMzhGV09tbElLS2hvTVBFYmFDeHNyckhpWXJRZ09TbFFFYUlDclQrTEhTUFp6Tnp0M3MzYzNIbjdsSHZMenZ2ODJMMmRtMzBYS2lvcUtnWVkwNjJCSkYwSHBvQTd3QVJ3QmJoc1B6NERqb0VHOEFuWU5jWjhTeDFPcDhJWEpNMUtXcGRVVjNucTltOW5KVjFJN1ZOR2ZFelNNMG1OTnFSOU5Pd3h4MUw3TlJNZmxiUW02U1NnZUo0VE84Wm9hdCs4L0xLa2c0amllUTRrTGFmMlJ0S3dwSjB1aXVmWmtUU2NTbjVTMGw1QytiL3NTWnJzdHZ5TXBLUFU1dWM0a2pUVGprdnBlWUNrYWVBMS8rN2h2Y0laTUd1TXFVVUxRTklVOEFhNGx0cld3eUh3eUJpekd6d0FTU1BBZStCMmFzc1c3QUgzalRFL2kreGNab2ExMlFmeTJCbzNpKzVjS0FCbDk5ekYxR1lsV0ZUQmVVTExTMERack9zRGNETmdnVFhnYzI3YkxXQTY0QmhmZ0h2R21COGRIVVhaMURNMFM0NXhsaUtNczliS3Ira2xJT2txc0Jyd3Y5SnRWcTFEZXdFQVQ0Q2gxQllkTUdRZHlnZWc3RGY0U21xREFLeW95WHBDc3pQZ0lUQ2V1dm9BakZ1WDBnRThqbGpVZHY3YkN0aU9PSjdYcGRVWjhML2dkWEhPQTVRdFlINU5YWFZnYnJnV1duMW53RlRxYWlQZ2RQSUZjRGQxdFJGd09sMzA3RHdSdVpnWHdMdmN0Z2ZBMDRoak9wMThBY1JlWjZzWlkxNmUzeURwVXVReG5VNitTMkFrY2pFcGNEcjF6eE9YU1BnQ0tMU2EwbWM0blh3Qi9FcGRiUVNjVHI0QUdxbXJqWURUeVJmQXg5VFZSc0RwNUF1ZzhMSnlIK0YwY2daZzU4ejExQlVIcE81cnVHaDJHM3lidXVxQWVGMmFCZkFxZGRVQjhicTBPZ1AyVTFjZWdIM2FPUU9NTWIrQnJkVFZCMkRMdXBRTHdMSU9uS1kyNklCVDYrQ2xhUURHbU8vQVJtcUxEdGl3RG43SFZrY1krRWRqTm9UbENJK3RZaE8yaVVwcG02SEtzbFBVcTJxUUtIcFVlOEFGc2phVVh1VVFXQ2dxWHlvQUc4SXVNRS9Xa05Scm5BSHpaZnFEU2dkZ1E2Z0JjMlRkM2IzQ01UQlh0a09zSXpUSWpaTG5RaGpjVnRsY0VJUFpMSjBMb1Z2dDhzL1ZhKzN5dVNBRzg0VUpSeEI5OGNwTTlkSlVSVVZGeFNEekJ4S2RlNExrMy9oMkFBQUFBRWxGVGtTdVFtQ0MnLFxuICAgIEFycm93OiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBQUJtSkxSMFFBQUFBQUFBRDVRN3QvQUFBQUNYQklXWE1BQUFCSUFBQUFTQUJHeVdzK0FBQUFDWFp3UVdjQUFBQkFBQUFBUUFEcTgvaGdBQUFEUGtsRVFWUjQydTJiTVVzY1FSaUczMC9TUmFKRUkxWktVaVJFck5JRUxSVWJRWVNBblg4aHBWVWdrRFlwMHdnV1ZqWVcrUWNKYVF6WXBMb2pKSVhodERERUtCcGo2NXRpNThpeG1kbWIyWnZaNytUMkFVSHVkbWZtZVhmMmJuYjNPNkNtcHFabWdKR3FPaUk1QVdBV3dFTUEwd0R1QXJodDNyNENjQWFnQmVBYmdJYUkvTlFPcDFmaElaS0xKTitTYkRLY3B0bDNrZVNRdGsrSStCakpWeVJiSmFSZHRFeWJZOXArUmVLakpOK1F2SXdvbnVmUzlER3E3WnVYWHlkNW5GQTh6ekhKZFcxdmtMeERjcmRDOFR5N0pPOW95YytRUEZDVWIzTkFjcVpxK1RtU3A5cm1IWnlTbkN2akVyd09JUGtVd0h2OCt3N3ZGNjRBTElySWZySUFTTTRDK0FEZ25yYXRneE1BQ3lMU2lCNEF5UkVBbndFODBMYnN3Z0dBSnlKeTRiTnh5QXByNndiSXc0eHh5M2RqcndDWWZlZXVhWnNGc0ViUGRVTFhVNERacXVzTGdNa0VBMjFQMDVFRWJmOEE4RmhFem9zMjhwa0JMeExLTDVzL3IvTTFrRWt6OXZLUUhHZWF0ZjA1eWZtT2Z1Yk5hN0c1SkRsZTVOaHRCandITUJ6NXlGd0FXQmFSVCswWHpQOHBac0t3Y1FpSDJmWDhZY29qYitrenhVdzRaSm43Q1NRWHFwUlBITUtDcTcraVpKNzFNdmR5L0RmdFhTUTZIY0pkU0RhcVBQS1cvbVBPQk8rbGNidnpDVTM1UkNGTTJQcHduUUt6WlFmZGdmZTBkeEg1ZExBNnVRSjRwQzJmSUFTcmt5dUE2WDZRanh5QzFja1ZRTm43Yk5IbEk0WmdkWElGVU9iaUpKbDhwQkNzVGpHZnVJd0EyQ3Y0Rk43eGJZamtqcXNSQUh1SWVQWG9DaURGMVprMlZpZFhBTCsxUjVzQXE1TXJnSmIyYUJOZ2RYSUY4RlY3dEFtd09ya0NDRnM3M3d5c1R0WUFUSEZDVTN2RUVXbTZDaTZLdmdZL2FvODZJazZYb2dEZWFZODZJazZYYmpQZ1NIdmtFVGhDd1F5NDVYcERSSzVKYmdONEdXa2dVeVI5SDY1TVJReGdXMFN1blo1RmV6SzdwZndkOGU4TVY4VWZBUGRGNUpkcmc4SnJBYlBqcHJaRkQyd1d5UVA2ajhaU0V1ZlJtR2xnUTl1bUJCdmQ1SU9nYmpGVUtMdStYbldCaEcrcnBzRlZaR1VvL2NvSmdGVmYrYUFBVEFnTkFDdklDcEw2alNzQUt5SDFRY0VCbUJEMkFTd2hxKzd1Rjg0QUxJVldpUFVFQjdsUXNpT0V3UzJWelFVeG1NWFN1UkNxS3BkL3pYNHJsODhGTVpnL21MQUVjU04rTWxQL2FLcW1wcVpta1BrTDBoU2p3T3BOS3h3QUFBQUFTVVZPUks1Q1lJST0nLFxuICAgIEZ1bGxzY3JlZW5FbnRlcjogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJalJrWkdSa1pHSWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLSUNBZ0lEeHdZWFJvSUdROUlrMHdJREJvTWpSMk1qUklNSG9pSUdacGJHdzlJbTV2Ym1VaUx6NEtJQ0FnSUR4d1lYUm9JR1E5SWswM0lERTBTRFYyTldnMWRpMHlTRGQyTFRONmJTMHlMVFJvTWxZM2FETldOVWcxZGpWNmJURXlJRGRvTFROMk1tZzFkaTAxYUMweWRqTjZUVEUwSURWMk1tZ3pkak5vTWxZMWFDMDFlaUl2UGdvOEwzTjJaejQ9JyxcbiAgICBGdWxsc2NyZWVuTGVhdmU6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NDhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaVBqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCM2FXUjBhRDBpTWpRaUlHaGxhV2RvZEQwaU1qUWlJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0krUEhCaGRHZ2djM1I1YkdVOUltWnBiR3c2STJabVppSWdaRDBpVFRFMExERTBTREU1VmpFMlNERTJWakU1U0RFMFZqRTBUVFVzTVRSSU1UQldNVGxJT0ZZeE5rZzFWakUwVFRnc05VZ3hNRll4TUVnMVZqaElPRlkxVFRFNUxEaFdNVEJJTVRSV05VZ3hObFk0U0RFNVdpSWdMejQ4TDNOMlp6ND0nLFxuICAgIFZpZGVvUGxheTogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ2MzUjViR1U5SW1acGJHdzZJMlptWmlJZ1pEMGlUVGdzTlM0eE5GWXhPUzR4TkV3eE9Td3hNaTR4TkV3NExEVXVNVFJhSWlBdlBqd3ZjM1puUGc9PScsXG4gICAgVmlkZW9QYXVzZTogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ2MzUjViR1U5SW1acGJHdzZJMlptWmlJZ1pEMGlUVEUwTERFNUxqRTBTREU0VmpVdU1UUklNVFJOTml3eE9TNHhORWd4TUZZMUxqRTBTRFpXTVRrdU1UUmFJaUF2UGp3dmMzWm5QZz09JyxcbiAgICBXaGl0ZVRpbGU6ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBSUFCQU1BQUFBR1ZzbkpBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQ0JqU0ZKTkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUIxV2xVV0hSWVRVdzZZMjl0TG1Ga2IySmxMbmh0Y0FBQUFBQUFQSGc2ZUcxd2JXVjBZU0I0Yld4dWN6cDRQU0poWkc5aVpUcHVjenB0WlhSaEx5SWdlRHA0YlhCMGF6MGlXRTFRSUVOdmNtVWdOUzQwTGpBaVBnb2dJQ0E4Y21SbU9sSkVSaUI0Yld4dWN6cHlaR1k5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZNREl2TWpJdGNtUm1MWE41Ym5SaGVDMXVjeU1pUGdvZ0lDQWdJQ0E4Y21SbU9rUmxjMk55YVhCMGFXOXVJSEprWmpwaFltOTFkRDBpSWdvZ0lDQWdJQ0FnSUNBZ0lDQjRiV3h1Y3pwMGFXWm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNScFptWXZNUzR3THlJK0NpQWdJQ0FnSUNBZ0lEeDBhV1ptT2tOdmJYQnlaWE56YVc5dVBqRThMM1JwWm1ZNlEyOXRjSEpsYzNOcGIyNCtDaUFnSUNBZ0lDQWdJRHgwYVdabU9rOXlhV1Z1ZEdGMGFXOXVQakU4TDNScFptWTZUM0pwWlc1MFlYUnBiMjQrQ2lBZ0lDQWdJQ0FnSUR4MGFXWm1PbEJvYjNSdmJXVjBjbWxqU1c1MFpYSndjbVYwWVhScGIyNCtNand2ZEdsbVpqcFFhRzkwYjIxbGRISnBZMGx1ZEdWeWNISmxkR0YwYVc5dVBnb2dJQ0FnSUNBOEwzSmtaanBFWlhOamNtbHdkR2x2Ymo0S0lDQWdQQzl5WkdZNlVrUkdQZ284TDNnNmVHMXdiV1YwWVQ0S0F0aUFCUUFBQUNSUVRGUkZBQUFBQUFBQUJnWUdCd2NISGg0ZUt5c3J4OGZIeTh2THpNek03T3pzQUFBQUJnWUcrcTdTWmdBQUFBcDBVazVUQVA3Ky92NysvdjcrL2lKeC9hOEFBQU93U1VSQlZIamE3ZDBoYnNOQUVBVlFvNlNGSTZYRWNBTERjZ05MdlVCdkVCUVZocGtXVllXbGhTc1ZGUzd0NVFJc2hSdDY5NWxFQVNaUCs4YzdhMWt6REwxZnorL3p5dXZ6cDZGYnZvZGRyTDZ1RGQxeUdaNWVYbGRlYjE4TjNmSXg3QSs1OHBybWhtNjVEZnZEY2QwOTUybHU2SmFiRmJEL3pWcHJaajFsemN5cytmajl6OHhUWnRiVDhydjh5V2x1NkJZQUlnQUFBQUFBQUFBQUFBQkFNNlFYRUFFQUFBQUFBQUFBZ0oyZ25hQUlpSUEzUTJxQUdnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRSnNBRGtWRkFBQUFBQUE4QmowR1JVQUVSRUFFUkVBRVJFQUVSRUFFQUFBQUFBQUFBQUIyZ25hQ0lpQUNQcGxSQTlRQU5VQUVSQUFBQUVWUUVSUUJFUkNCVmxmQWNaM2FlWm9idXNVS01HQmhWNktVRWxIR0tCRVJKUjYvZnhFeFJrUVpsOS9sVDhTMW9Wc3VocXlZTW1QS2pDa3p2ZmNDcHN4b2hyd1kwUTA2RUFFQUFBQUFBQUFBQUFDZ0dkSUxpQUFBQUFBQUFBQUF3RTdRVGxBRVJNQ2JJVFZBRFFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdLbXdRMUVSQUFBQUFBQ1BRWTlCRVJBQkVSQUJFUkFCRVJBQkVSQUJBQUFBQUFBQUFJQ2RvSjJnQ0lpQVQyYlVBRFZBRFJBQkVRQUFRQkZVQkVWQUJFUmdFeXZBbEptK1Y0QXBNNmJNbURKanlvd3BNNmJNZE4wTG1ES2pHZkppUkRmb1FBUUFBQUFBQUFBQUFBQ0Faa2d2SUFJQUFBQUFBQUFBQUR0Qk8wRVJFQUZ2aHRRQU5RQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBS2ZDRGtWRkFBQUFBQUE4QmowR1JVQUVSRUFFUkVBRVJFQUVSRUFFQUFBQUFBQUFBQUIyZ25hQ0lpQUNQcGxSQTlRQU5VQUVSQUFBQUVWUUVSUUJFUkNCVGF3QVUyYjZYZ0dtekpneVk4cU1LVE9tekpneTAzVXZZTXFNWnNpTEVkMmdBeEVBQUFBQUFBQUFBQUFBbWlHOWdBZ0FBQUFBQUFBQUFPd0U3UVJGUUFTOEdWSUQxQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUp3S094UVZBUUFBQUFEd0dQUVlGQUVSRUFFUkVBRVJFQUVSRUFFUkFBQUFBQUFBQUFEWUNkb0ppb0FJK0dSR0RWQUQxQUFSRUFFQUFCUkJSVkFFUkVBRU5yRUNUSm5wZXdXWU1tUEtqQ2t6cHN5WU1tUEtUTmU5Z0Nrem1pRXZSblNERGtRQUFBQUFBQUFBQUFBQWFJYjBBaUlBQUFBQUFBQUFBTEFUdEJNVUFSSHdaa2dOVUFNQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFIQXE3RkJVQkFBQUFBREFZOUJqVUFSRVFBUkVRQVJFUUFSRVFBUkVBQUFBQUFBQUFBQmdKMmduS0FJaTRKTVpOVUFOVUFORVFBUUFBRkFFRlVFUkVBRVIyTVFLTUdXbTd4Vmd5b3dwTTUwUFdlbjl1Z05HWHoxWGFvY0FGZ0FBQUFCSlJVNUVya0pnZ2c9PScsXG4gICAgU2V0dGluZzogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFCQUNBWUFBQUNxYVhIZUFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBQklBQUFBU0FCR3lXcytBQUFBQ1had1FXY0FBQUJBQUFBQVFBRHE4L2hnQUFBRG4wbEVRVlI0MnUyYnpVc1ZVUmpHbnlPNkNQekFNblRqcHBBbzNMVHdIMUNxVGZheGJlT2lSUzM3QTB3WHRST0ZWaTFhUkJzM0xXb2hTSUdiUUFRWFZpQkdSaEcwVUlSS1VDcEs3cS9Gbk9CMnVjNmNPWE5tUm5HZTNlVytIOC83ekxsbjN2TnhwUW9WS2xRNHdqQkZKQUZPU1JxWDFPN29zaXZwdmpIbVUxbkNoQlpnbHZTWUxZSmJTMEVhbkN2SUp6V0srZ25zeUgzNC84T3VNYVlqYjI2NWp3Q2d6Nk40U1dxM3ZvZGJBRW1uUy9LdEJEZ29BZ3lVNUJ0ZUFPQWtNQVBjQnJvYzdQc2tEV2ZnTit3eUR3QmRsdE1NY0RJM3RZQm5kZS9wSGVBUk1OVEVyZ2Q0QVB6d2VQODM0b2VOMWRNa3o1RGxzRk5uL3l5djRrZGlTSzRBdDRBTzRDcXdHYUR3Um16YTJCMDIxMHFNN1loclhVNTlBTkFxNmJXa3dRVFRuNUtPNWZJRTB1VllsWFRlR0xPWEZNeDFEcmpsVUx3S0tONDF4NkRsbklqRUVRQ2NrUFJlMG9rQ2lndUpyNUxPR0dPK3hobTVqSUNKUTFpOExPZUpKS1BZRVFBTUt2cnR0NVpkalNmMkZNMEZxL3NaSkkyQTZVTmN2Q3ozNlRpRGZVY0FjRTFTUHUvVTZNbThrL1RGZnU2WGRGYjVpWDNkR1BNOGxRZndOb2QzK1Rvd0JuUTN5ZGR0djF2UEllK2IxSklCaXdFSjFJQUoyMDhrNVcyMXRyV0ErVi81Q0hBY21BdFUvQTJQL0RjQ2lUQUhIRTh0Z0NWaGdMdkFYZ1lDazE3Sm8veVRHZkx1V2U3WmQ3MkFDOENXQjRuM09BejdtTHl0TmtaYWJBRVhNaGZlUUtZZldFcEpaQ3hBM3JHVU9aZUEvcURGMTVGcEF6NDdFdmxOazluZUkyZTNqZVdDejBCYm12aXBOa1NNTVg4a3VTWllNOFo4enlxQWpiSG1hTjVtT2VZamdJWHJVOTNNV3J4SHJOUWpycWlEa1FNTEh3RytPZHFGM05OM2plWEt6VThBb0YxU3pkSDhYS2hKVU83SFpEWExNYndBd0lDa0pVVUxGeGUwU2JxU1ZRQWJ3M1hpN1plMFpMbUdBekFLYkhzMEpHVTFRdHZBYUlqQ1c0QjdaT3ZKeTJxRmE1YTczMFJQdEJpYXowQ2dua2laaTZGNWZCWkRWTXZobzdFaGN1UzN4SkoyaFY5SXVwZ1RxYUx3MGhoemFiOHZxMjN4T0cvcitMRHNLakxnWVZ6eFVuVTBsdHdLMndEZXpVeUptRXdxWGdwL1BMNHJ2eHRoYWVDU0krenh1QTEwSjhaa1dkSk5TYjJTTGt2YXlLSHdEUnU3MStaYWpyRzk0MUo4YWdBTERRM0dVL2EvSXZNa1lDUHptQ2J0TE5FVm1hY050Z3M1aVA5ZllWTkVWMVE2SGV6N3lOWlNMK0oyU2FyVGNwcWl5VjJpVWtHMEl2UEZ2Yno1RmJFbitLRWszd01qd01lU2ZDc0JYRkJkbHk5Q0FQazl5ZHlmZnBFQ3VCNXRaZlZKamFLV3VlT1NmaW5sbjZZSzRsYWhRb1VLUnhkL0FjUlBHVGNRQ0FVUUFBQUFBRWxGVGtTdVFtQ0MnLFxuICAgIENoZXZyb25SaWdodDogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ1pEMGlUVGd1TlRrc01UWXVOVGhNTVRNdU1UY3NNVEpNT0M0MU9TdzNMalF4VERFd0xEWk1NVFlzTVRKTU1UQXNNVGhNT0M0MU9Td3hOaTQxT0ZvaUlDOCtQQzl6ZG1jKycsXG4gICAgQ2hlY2s6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaVB6NDhJVVJQUTFSWlVFVWdjM1puSUZCVlFreEpReUFpTFM4dlZ6TkRMeTlFVkVRZ1UxWkhJREV1TVM4dlJVNGlJQ0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTlIY21Gd2FHbGpjeTlUVmtjdk1TNHhMMFJVUkM5emRtY3hNUzVrZEdRaVBqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCM2FXUjBhRDBpTWpRaUlHaGxhV2RvZEQwaU1qUWlJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0krUEhCaGRHZ2daRDBpVFRJeExEZE1PU3d4T1V3ekxqVXNNVE11TlV3MExqa3hMREV5TGpBNVREa3NNVFl1TVRkTU1Ua3VOVGtzTlM0MU9Vd3lNU3czV2lJZ0x6NDhMM04yWno0PScsXG4gICAgVmlld0luZGljYXRvcjogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BDRkVUME5VV1ZCRklITjJaeUJRVlVKTVNVTWdJaTB2TDFjelF5OHZSRlJFSUZOV1J5QXhMakV2TDBWT0lpQWlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZSM0poY0docFkzTXZVMVpITHpFdU1TOUVWRVF2YzNabk1URXVaSFJrSWo0S1BITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGh0Ykc1ek9uaHNhVzVyUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMM2hzYVc1cklpQnBaRDBpZG1sbGR5MXBibVJwWTJGMGIzSWlJR2hsYVdkb2REMGlNekFpSUhkcFpIUm9QU0l6TUNJZ2RtbGxkMEp2ZUQwaUxUSXVOU0F0TVNBek1DQXpNQ0krQ2drOGMzUjViR1VnZEhsd1pUMGlkR1Y0ZEM5amMzTWlQaTV6ZERCN2MzUnliMnRsTFhkcFpIUm9Pakk3YzNSeWIydGxMVzFwZEdWeWJHbHRhWFE2TVRBN1ptbHNiRHB1YjI1bE8zMHVjM1F4ZTNOMGNtOXJaUzEzYVdSMGFEbzJPM04wY205clpTMXRhWFJsY214cGJXbDBPakV3TzMwS0NUd3ZjM1I1YkdVK0NnazhaejRLQ1FrOGNHRjBhQ0JqYkdGemN6MGljM1F3SWlCa1BTSk5JREV5TGpVZ01DQkJJREV5TGpVZ01USXVOU0F3SURBZ01DQXRNVEl1TlNBd0lFRWdNVEl1TlNBeE1pNDFJREFnTUNBd0lERXlMalVnTUNJZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb01Td3dMREFzTVN3eE15d3hOUzQxS1NJK1BDOXdZWFJvUGdvSkNUeHdZWFJvSUdOc1lYTnpQU0p6ZERJaUlHUTlJazBnTVRNZ01DQk1JREV3SURJZ1RDQXhOaUF5SUZvaVBqd3ZjR0YwYUQ0S0NRazhjR0YwYUNCamJHRnpjejBpYzNReUlpQmtQU0pOSURJZ01DQkJJRElnTWlBd0lEQWdNQ0F0TWlBd0lFRWdNaUF5SURBZ01DQXdJRElnTUNJZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb01Td3dMREFzTVN3eE15d3hOUzQxS1NJK1BDOXdZWFJvUGdvSkNUeHdZWFJvSUdOc1lYTnpQU0p6ZERFaUlHbGtQU0pwYm1ScFkyRjBiM0lpSUhSeVlXNXpabTl5YlQwaWJXRjBjbWw0S0RFc01Dd3dMREVzTVRNc01UVXVOU2tpUGp3dmNHRjBhRDRLQ1R3dlp6NEtQQzl6ZG1jKydcbn07XG5cbmV4cG9ydCB7IERhdGFJbWFnZSB9OyIsImltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZS5qcyc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBJbWFnZSBsb2FkZXIgd2l0aCBwcm9ncmVzcyBiYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbG9hZGVycy9JbWFnZUxvYWRlci5qc31cbiAqIEBtZW1iZXJPZiBQQU5PTEVOU1xuICogQG5hbWVzcGFjZVxuICovXG5jb25zdCBJbWFnZUxvYWRlciA9IHtcblxuXHRsb2FkOiBmdW5jdGlvbiAoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0Ly8gRW5hYmxlIGNhY2hlXG5cdFx0VEhSRUUuQ2FjaGUuZW5hYmxlZCA9IHRydWU7XG5cblx0XHRsZXQgY2FjaGVkLCByZXF1ZXN0LCBhcnJheUJ1ZmZlclZpZXcsIGJsb2IsIHVybENyZWF0b3IsIGltYWdlLCByZWZlcmVuY2U7XG5cdFxuXHRcdC8vIFJlZmVyZW5jZSBrZXlcblx0XHRmb3IgKCBsZXQgaWNvbk5hbWUgaW4gRGF0YUltYWdlICkge1xuXHRcblx0XHRcdGlmICggRGF0YUltYWdlLmhhc093blByb3BlcnR5KCBpY29uTmFtZSApICYmIHVybCA9PT0gRGF0YUltYWdlWyBpY29uTmFtZSBdICkge1xuXHRcblx0XHRcdFx0cmVmZXJlbmNlID0gaWNvbk5hbWU7XG5cdFxuXHRcdFx0fVxuXHRcblx0XHR9XG5cdFxuXHRcdC8vIENhY2hlZFxuXHRcdGNhY2hlZCA9IFRIUkVFLkNhY2hlLmdldCggcmVmZXJlbmNlID8gcmVmZXJlbmNlIDogdXJsICk7XG5cdFxuXHRcdGlmICggY2FjaGVkICE9PSB1bmRlZmluZWQgKSB7XG5cdFxuXHRcdFx0aWYgKCBvbkxvYWQgKSB7XG5cdFxuXHRcdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbiAoKSB7XG5cdFxuXHRcdFx0XHRcdGlmICggb25Qcm9ncmVzcyApIHtcblx0XG5cdFx0XHRcdFx0XHRvblByb2dyZXNzKCB7IGxvYWRlZDogMSwgdG90YWw6IDEgfSApO1xuXHRcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdG9uTG9hZCggY2FjaGVkICk7XG5cdFxuXHRcdFx0XHR9LCAwICk7XG5cdFxuXHRcdFx0fVxuXHRcblx0XHRcdHJldHVybiBjYWNoZWQ7XG5cdFxuXHRcdH1cblx0XHRcblx0XHQvLyBDb25zdHJ1Y3QgYSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHR1cmxDcmVhdG9yID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuXHRcdGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICdpbWcnICk7XG5cdFxuXHRcdC8vIEFkZCB0byBjYWNoZVxuXHRcdFRIUkVFLkNhY2hlLmFkZCggcmVmZXJlbmNlID8gcmVmZXJlbmNlIDogdXJsLCBpbWFnZSApO1xuXHRcblx0XHRjb25zdCBvbkltYWdlTG9hZGVkID0gKCkgPT4ge1xuXHRcblx0XHRcdHVybENyZWF0b3IucmV2b2tlT2JqZWN0VVJMKCBpbWFnZS5zcmMgKTtcblx0XHRcdG9uTG9hZCAmJiBvbkxvYWQoIGltYWdlICk7XG5cdFxuXHRcdH1cblx0XG5cdFx0aWYgKCB1cmwuaW5kZXhPZiggJ2RhdGE6JyApID09PSAwICkge1xuXHRcblx0XHRcdGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgb25JbWFnZUxvYWRlZCwgZmFsc2UgKTtcblx0XHRcdGltYWdlLnNyYyA9IHVybDtcblx0XHRcdHJldHVybiBpbWFnZTtcblx0XHR9XG5cdFxuXHRcdGltYWdlLmNyb3NzT3JpZ2luID0gdGhpcy5jcm9zc09yaWdpbiAhPT0gdW5kZWZpbmVkID8gdGhpcy5jcm9zc09yaWdpbiA6ICcnO1xuXHRcblx0XHRyZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0cmVxdWVzdC5vcGVuKCAnR0VUJywgdXJsLCB0cnVlICk7XG5cdFx0cmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuXHRcdHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFxuXHRcdFx0XHRpZiAoIGV2ZW50Lmxlbmd0aENvbXB1dGFibGUgKSB7XG5cdFxuXHRcdFx0XHRcdG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyggeyBsb2FkZWQ6IGV2ZW50LmxvYWRlZCwgdG90YWw6IGV2ZW50LnRvdGFsIH0gKTtcblx0XG5cdFx0XHRcdH1cblx0XG5cdFx0fTtcblx0XHRyZXF1ZXN0Lm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XG5cdFx0XHRcdGFycmF5QnVmZmVyVmlldyA9IG5ldyBVaW50OEFycmF5KCB0aGlzLnJlc3BvbnNlICk7XG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYiggWyBhcnJheUJ1ZmZlclZpZXcgXSApO1xuXHRcdFx0XHRcblx0XHRcdFx0aW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCBvbkltYWdlTG9hZGVkLCBmYWxzZSApO1xuXHRcdFx0aW1hZ2Uuc3JjID0gdXJsQ3JlYXRvci5jcmVhdGVPYmplY3RVUkwoIGJsb2IgKTtcblx0XG5cdFx0fTtcblx0XG5cdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuXHRcblx0fVxuXG59O1xuXG5leHBvcnQgeyBJbWFnZUxvYWRlciB9OyIsImltcG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9JbWFnZUxvYWRlci5qcyc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBUZXh0dXJlIGxvYWRlciBiYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbG9hZGVycy9UZXh0dXJlTG9hZGVyLmpzfVxuICogQG1lbWJlck9mIFBBTk9MRU5TXG4gKiBAbmFtZXNwYWNlXG4gKi9cbmNvbnN0IFRleHR1cmVMb2FkZXIgPSB7XG5cblx0LyoqXG5cdCAqIExvYWQgaW1hZ2UgdGV4dHVyZVxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdXJsICAgICAgICAtIEFuIGltYWdlIHVybFxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Mb2FkICAgICAtIE9uIGxvYWQgY2FsbGJhY2tcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259IG9uUHJvZ3Jlc3MgLSBJbiBwcm9ncmVzcyBjYWxsYmFja1xuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25FcnJvciAgICAtIE9uIGVycm9yIGNhbGxiYWNrXG5cdCAqIEByZXR1cm4ge1RIUkVFLlRleHR1cmV9ICAgXHQgLSBJbWFnZSB0ZXh0dXJlXG5cdCAqL1xuXHRsb2FkOiBmdW5jdGlvbiAoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0dmFyIHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZSgpOyBcblxuXHRcdEltYWdlTG9hZGVyLmxvYWQoIHVybCwgZnVuY3Rpb24gKCBpbWFnZSApIHtcblxuXHRcdFx0dGV4dHVyZS5pbWFnZSA9IGltYWdlO1xuXG5cdFx0XHQvLyBKUEVHcyBjYW4ndCBoYXZlIGFuIGFscGhhIGNoYW5uZWwsIHNvIG1lbW9yeSBjYW4gYmUgc2F2ZWQgYnkgc3RvcmluZyB0aGVtIGFzIFJHQi5cblx0XHRcdGNvbnN0IGlzSlBFRyA9IHVybC5zZWFyY2goIC9cXC4oanBnfGpwZWcpJC8gKSA+IDAgfHwgdXJsLnNlYXJjaCggL15kYXRhXFw6aW1hZ2VcXC9qcGVnLyApID09PSAwO1xuXG5cdFx0XHR0ZXh0dXJlLmZvcm1hdCA9IGlzSlBFRyA/IFRIUkVFLlJHQkZvcm1hdCA6IFRIUkVFLlJHQkFGb3JtYXQ7XG5cdFx0XHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0b25Mb2FkICYmIG9uTG9hZCggdGV4dHVyZSApO1xuXG5cdFx0fSwgb25Qcm9ncmVzcywgb25FcnJvciApO1xuXG5cdFx0cmV0dXJuIHRleHR1cmU7XG5cblx0fVxuXG59O1xuXG5leHBvcnQgeyBUZXh0dXJlTG9hZGVyIH07IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL0ltYWdlTG9hZGVyLmpzJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIEN1YmUgVGV4dHVyZSBMb2FkZXIgYmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL2xvYWRlcnMvQ3ViZVRleHR1cmVMb2FkZXIuanN9XG4gKiBAbWVtYmVyT2YgUEFOT0xFTlNcbiAqIEBuYW1lc3BhY2VcbiAqL1xuY29uc3QgQ3ViZVRleHR1cmVMb2FkZXIgPSB7XG5cblx0LyoqXG5cdCogTG9hZCA2IGltYWdlcyBhcyBhIGN1YmUgdGV4dHVyZVxuXHQqIEBwYXJhbSAge2FycmF5fSAgIHVybHMgICAgICAgIC0gQXJyYXkgd2l0aCA2IGltYWdlIHVybHNcblx0KiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Mb2FkICAgICAtIE9uIGxvYWQgY2FsbGJhY2tcblx0KiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Qcm9ncmVzcyAtIEluIHByb2dyZXNzIGNhbGxiYWNrXG5cdCogQHBhcmFtICB7ZnVuY3Rpb259IG9uRXJyb3IgICAgLSBPbiBlcnJvciBjYWxsYmFja1xuXHQqIEByZXR1cm4ge1RIUkVFLkN1YmVUZXh0dXJlfSAgIC0gQ3ViZSB0ZXh0dXJlXG5cdCovXG4gICBsb2FkOiBmdW5jdGlvbiAoIHVybHMsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuXHQgICB2YXIgdGV4dHVyZSwgbG9hZGVkLCBwcm9ncmVzcywgYWxsLCBsb2FkaW5ncztcblxuXHQgICB0ZXh0dXJlID0gbmV3IFRIUkVFLkN1YmVUZXh0dXJlKCBbXSApO1xuXG5cdCAgIGxvYWRlZCA9IDA7XG5cdCAgIHByb2dyZXNzID0ge307XG5cdCAgIGFsbCA9IHt9O1xuXG5cdCAgIHVybHMubWFwKCBmdW5jdGlvbiAoIHVybCwgaW5kZXggKSB7XG5cblx0XHQgICBJbWFnZUxvYWRlci5sb2FkKCB1cmwsIGZ1bmN0aW9uICggaW1hZ2UgKSB7XG5cblx0XHRcdCAgIHRleHR1cmUuaW1hZ2VzWyBpbmRleCBdID0gaW1hZ2U7XG5cblx0XHRcdCAgIGxvYWRlZCsrO1xuXG5cdFx0XHQgICBpZiAoIGxvYWRlZCA9PT0gNiApIHtcblxuXHRcdFx0XHQgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0XHQgICBvbkxvYWQgJiYgb25Mb2FkKCB0ZXh0dXJlICk7XG5cblx0XHRcdCAgIH1cblxuXHRcdCAgIH0sIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRcdCAgIHByb2dyZXNzWyBpbmRleCBdID0geyBsb2FkZWQ6IGV2ZW50LmxvYWRlZCwgdG90YWw6IGV2ZW50LnRvdGFsIH07XG5cblx0XHRcdCAgIGFsbC5sb2FkZWQgPSAwO1xuXHRcdFx0ICAgYWxsLnRvdGFsID0gMDtcblx0XHRcdCAgIGxvYWRpbmdzID0gMDtcblxuXHRcdFx0ICAgZm9yICggdmFyIGkgaW4gcHJvZ3Jlc3MgKSB7XG5cblx0XHRcdFx0ICAgbG9hZGluZ3MrKztcblx0XHRcdFx0ICAgYWxsLmxvYWRlZCArPSBwcm9ncmVzc1sgaSBdLmxvYWRlZDtcblx0XHRcdFx0ICAgYWxsLnRvdGFsICs9IHByb2dyZXNzWyBpIF0udG90YWw7XG5cblx0XHRcdCAgIH1cblxuXHRcdFx0ICAgaWYgKCBsb2FkaW5ncyA8IDYgKSB7XG5cblx0XHRcdFx0ICAgYWxsLnRvdGFsID0gYWxsLnRvdGFsIC8gbG9hZGluZ3MgKiA2O1xuXG5cdFx0XHQgICB9XG5cblx0XHRcdCAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyggYWxsICk7XG5cblx0XHQgICB9LCBvbkVycm9yICk7XG5cblx0ICAgfSApO1xuXG5cdCAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICB9XG5cbn07XG5cbmV4cG9ydCB7IEN1YmVUZXh0dXJlTG9hZGVyIH07IiwiaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogVXNlciBNZWRpYVxuICogQHBhcmFtIHtvYmplY3R9IFtjb25zdHJhaW50cz17IHZpZGVvOiB7fSwgYXVkaW86IGZhbHNlLCBmYWNpbmdNb2RlOiAnZW52aXJvbm1lbnQnIH1dXG4gKi9cbmZ1bmN0aW9uIE1lZGlhICggY29uc3RyYWludHMgPSB7IHZpZGVvOiB7fSwgYXVkaW86IGZhbHNlLCBmYWNpbmdNb2RlOiAnZW52aXJvbm1lbnQnIH0gKSB7XG5cbiAgICB0aGlzLmNvbnN0cmFpbnRzID0gY29uc3RyYWludHM7XG5cbiAgICB0aGlzLmNvbnRhaW5lclxuICAgIHRoaXMuc2NlbmU7XG4gICAgdGhpcy5lbGVtZW50O1xuICAgIHRoaXMuc3RyZWFtcyA9IHt9O1xuICAgIHRoaXMuc3RyZWFtSWQ7XG5cbn07XG5cbk9iamVjdC5hc3NpZ24oIE1lZGlhLnByb3RvdHlwZSwge1xuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbmFsID0gW1xuICAgICAgICAgICAgeyBtaW5XaWR0aDogMzIwICB9LFxuICAgICAgICAgICAgeyBtaW5XaWR0aDogNjQwICB9LFxuICAgICAgICAgICAgeyBtaW5XaWR0aDogMTAyNCB9LFxuICAgICAgICAgICAgeyBtaW5XaWR0aDogMTI4MCB9LFxuICAgICAgICAgICAgeyBtaW5XaWR0aDogMTkyMCB9XG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgeyB2aWRlbyB9ID0gdGhpcy5jb25zdHJhaW50cztcblxuICAgICAgICBpZiAoICF2aWRlby5vcHRpb25hbCApIHtcblxuICAgICAgICAgICAgdmlkZW8ub3B0aW9uYWwgPSBvcHRpb25hbDtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jcmVhdGVWaWRlb0VsZW1lbnQoKTtcblxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoIHRoaXMuY29uc3RyYWludHMgKVxuICAgICAgICAuY2F0Y2goIGVycm9yID0+IHsgY29uc29sZS53YXJuKCBgUEFOT0xFTlMuTWVkaWE6ICR7ZXJyb3J9YCApIH0gKTtcblxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5zdHJlYW1zWyB0aGlzLnN0cmVhbUlkIF07XG5cbiAgICAgICAgaWYgKCBzdHJlYW0gJiYgc3RyZWFtLmFjdGl2ZSApIHtcblxuICAgICAgICAgICAgY29uc3QgdHJhY2sgPSBzdHJlYW0uZ2V0VHJhY2tzKClbIDAgXTtcblxuICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbUlkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtcyA9IHt9O1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBhdHRhY2hWaWRlb1NvdXJjZU9iamVjdDogZnVuY3Rpb24gKCBzdHJlYW0gKSB7XG5cbiAgICAgICAgdGhpcy5zdHJlYW1zWyBzdHJlYW0uaWQgXSA9IHN0cmVhbTtcbiAgICAgICAgXG4gICAgICAgIGlmICggdGhpcy5zdHJlYW1JZCApIHsgcmV0dXJuOyB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0cmVhbUlkID0gc3RyZWFtLmlkO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3JjT2JqZWN0ID0gc3RyZWFtO1xuXG4gICAgICAgIGlmICggdGhpcy5zY2VuZSApIHtcblxuICAgICAgICAgICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gdGhpcy5jcmVhdGVWaWRlb1RleHR1cmUoKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlVmlkZW9UZXh0dXJlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuVmlkZW9UZXh0dXJlKCB2aWRlbyApO1xuXG4gICAgICAgIHRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XG4gICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5mb3JtYXQgPSBUSFJFRS5SR0JGb3JtYXQ7XG4gICAgICAgIHRleHR1cmUuY2VudGVyLnNldCggMC41LCAwLjUgKTtcblxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCAnY2FucGxheScsIHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlVmlkZW9FbGVtZW50OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICd2aWRlbycgKTtcbiAgICAgICAgXG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSggJ2F1dG9wbGF5JywgJycgKTtcbiAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCAnbXV0ZWQnLCAnJyApO1xuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoICdwbGF5c2lubGluZScsICcnICk7XG5cbiAgICAgICAgdmlkZW8uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB2aWRlby5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIHZpZGVvLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB2aWRlby5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHZpZGVvLnN0eWxlLm9iamVjdFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIHZpZGVvLnN0eWxlLm9iamVjdEZpdCA9ICdjb3Zlcic7XG4gICAgICAgIHZpZGVvLnN0eWxlLmRpc3BsYXkgPSB0aGlzLnNjZW5lID8gJ25vbmUnIDogJyc7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvO1xuXG4gICAgfSxcblxuICAgIG9uV2luZG93UmVzaXplOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICYmIHRoaXMuZWxlbWVudC52aWRlb1dpZHRoICYmIHRoaXMuZWxlbWVudC52aWRlb0hlaWdodCAmJiB0aGlzLnNjZW5lICkge1xuXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLnNjZW5lLmJhY2tncm91bmQ7XG4gICAgICAgICAgICBjb25zdCB7IHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0IH0gPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjYW1lcmFSYXRpbyA9IHZpZGVvSGVpZ2h0IC8gdmlkZW9XaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0UmF0aW8gPSBjb250YWluZXIgPyBjb250YWluZXIuY2xpZW50V2lkdGggLyBjb250YWluZXIuY2xpZW50SGVpZ2h0IDogMS4wO1xuICAgICAgICAgICAgdGV4dHVyZS5yZXBlYXQuc2V0KCAtY2FtZXJhUmF0aW8gKiB2aWV3cG9ydFJhdGlvLCAxICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59ICk7XG5cbmV4cG9ydCB7IE1lZGlhIH07IiwiXG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBSZXRpY2xlIDNEIFNwcml0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1RIUkVFLkNvbG9yfSBbY29sb3I9MHhmZmZmZmZdIC0gQ29sb3Igb2YgdGhlIHJldGljbGUgc3ByaXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthdXRvU2VsZWN0PXRydWVdIC0gQXV0byBzZWxlY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZHdlbGxUaW1lPTE1MDBdIC0gRHVyYXRpb24gZm9yIGR3ZWxsaW5nIHNlcXVlbmNlIHRvIGNvbXBsZXRlXG4gKi9cblxuZnVuY3Rpb24gUmV0aWNsZSAoIGNvbG9yID0gMHhmZmZmZmYsIGF1dG9TZWxlY3QgPSB0cnVlLCBkd2VsbFRpbWUgPSAxNTAwICkge1xuXG4gICAgdGhpcy5kcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgIGNvbnN0IHsgY2FudmFzLCBjb250ZXh0IH0gPSB0aGlzLmNyZWF0ZUNhbnZhcygpO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlNwcml0ZU1hdGVyaWFsKCB7IGNvbG9yLCBtYXA6IHRoaXMuY3JlYXRlQ2FudmFzVGV4dHVyZSggY2FudmFzICkgfSApO1xuXG4gICAgVEhSRUUuU3ByaXRlLmNhbGwoIHRoaXMsIG1hdGVyaWFsICk7XG5cbiAgICB0aGlzLmNhbnZhc1dpZHRoID0gY2FudmFzLndpZHRoO1xuICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciBpbnN0YW5jZW9mIFRIUkVFLkNvbG9yID8gY29sb3IgOiBuZXcgVEhSRUUuQ29sb3IoIGNvbG9yICk7ICAgIFxuXG4gICAgdGhpcy5hdXRvU2VsZWN0ID0gYXV0b1NlbGVjdDtcbiAgICB0aGlzLmR3ZWxsVGltZSA9IGR3ZWxsVGltZTtcbiAgICB0aGlzLnBvc2l0aW9uLnogPSAtMTA7XG4gICAgdGhpcy5jZW50ZXIuc2V0KCAwLjUsIDAuNSApO1xuICAgIHRoaXMuc2NhbGUuc2V0KCAwLjUsIDAuNSwgMSApO1xuXG4gICAgdGhpcy5zdGFydFRpbWVzdGFtcDtcbiAgICB0aGlzLnRpbWVySWQ7XG4gICAgdGhpcy5jYWxsYmFjaztcblxuICAgIHRoaXMuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy51cGRhdGVDYW52YXNBcmNCeVByb2dyZXNzKCAwICk7XG5cbn07XG5cblJldGljbGUucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuU3ByaXRlLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogUmV0aWNsZSxcblxuICAgIHNldENvbG9yOiBmdW5jdGlvbiAoIGNvbG9yICkge1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY29sb3IuY29weSggY29sb3IgaW5zdGFuY2VvZiBUSFJFRS5Db2xvciA/IGNvbG9yIDogbmV3IFRIUkVFLkNvbG9yKCBjb2xvciApICk7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlQ2FudmFzVGV4dHVyZTogZnVuY3Rpb24gKCBjYW52YXMgKSB7XG5cbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKCBjYW52YXMgKTtcbiAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICAgfSxcblxuICAgIGNyZWF0ZUNhbnZhczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gMzI7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDMyO1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcbiAgICAgICAgY29uc3QgZHByID0gdGhpcy5kcHI7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGggKiBkcHI7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiBkcHI7XG4gICAgICAgIGNvbnRleHQuc2NhbGUoIGRwciwgZHByICk7XG5cbiAgICAgICAgY29udGV4dC5zaGFkb3dCbHVyID0gNTtcbiAgICAgICAgY29udGV4dC5zaGFkb3dDb2xvciA9IFwicmdiYSgyMDAsMjAwLDIwMCwwLjkpXCI7XG5cbiAgICAgICAgcmV0dXJuIHsgY2FudmFzLCBjb250ZXh0IH07XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzczogZnVuY3Rpb24gKCBwcm9ncmVzcyApIHtcblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCB7IGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIG1hdGVyaWFsIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBkcHIgPSB0aGlzLmRwcjtcbiAgICAgICAgY29uc3QgZGVncmVlID0gcHJvZ3Jlc3MgKiBNYXRoLlBJICogMjtcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yLmdldFN0eWxlKCk7XG4gICAgICAgIGNvbnN0IHggPSBjYW52YXNXaWR0aCAqIDAuNSAvIGRwcjtcbiAgICAgICAgY29uc3QgeSA9IGNhbnZhc0hlaWdodCAqIDAuNSAvIGRwcjtcbiAgICAgICAgY29uc3QgbGluZVdpZHRoID0gMztcbiAgICAgICAgXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0ICk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgaWYgKCBwcm9ncmVzcyA9PT0gMCApIHtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKCB4LCB5LCBjYW52YXNXaWR0aCAvIDE2LCAwLCAyICogTWF0aC5QSSApO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5hcmMoIHgsIHksIGNhbnZhc1dpZHRoIC8gNCAtIGxpbmVXaWR0aCwgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBkZWdyZWUgKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgbWF0ZXJpYWwubWFwLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIH0sXG5cbiAgICByaXBwbGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBzdG9wID0gdGhpcy5zdG9wLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3QgeyBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCBtYXRlcmlhbCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSA1MDA7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3I7XG4gICAgICAgIGNvbnN0IGRwciA9IHRoaXMuZHByO1xuICAgICAgICBjb25zdCB4ID0gY2FudmFzV2lkdGggKiAwLjUgLyBkcHI7XG4gICAgICAgIGNvbnN0IHkgPSBjYW52YXNIZWlnaHQgKiAwLjUgLyBkcHI7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCB0aW1lcklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB1cGRhdGUgKTtcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSBwZXJmb3JtYW5jZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gZWxhcHNlZCAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDEuMCAtIHByb2dyZXNzID4gMCA/IDEuMCAtIHByb2dyZXNzIDogMDtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IHByb2dyZXNzICogY2FudmFzV2lkdGggKiAwLjUgLyBkcHI7XG5cbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0ICk7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5hcmMoIHgsIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIgKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtjb2xvci5yICogMjU1fSwgJHtjb2xvci5nICogMjU1fSwgJHtjb2xvci5iICogMjU1fSwgJHtvcGFjaXR5fSlgO1xuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICBpZiAoIHByb2dyZXNzID4gMS4wICkge1xuXG4gICAgICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRpbWVySWQgKTtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWF0ZXJpYWwubWFwLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ha2UgcmV0aWNsZSB2aXNpYmxlXG4gICAgICovXG4gICAgc2hvdzogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFrZSByZXRpY2xlIGludmlzaWJsZVxuICAgICAqL1xuICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBkd2VsbGluZ1xuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG4gICAgICAgIGlmICggIXRoaXMuYXV0b1NlbGVjdCApIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXJ0VGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIGR3ZWxsaW5nXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oKXtcblxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy50aW1lcklkICk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNBcmNCeVByb2dyZXNzKCAwICk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnRpbWVySWQgPSBudWxsO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBkd2VsbGluZ1xuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMudGltZXJJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy51cGRhdGUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5zdGFydFRpbWVzdGFtcDtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBlbGFwc2VkIC8gdGhpcy5kd2VsbFRpbWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNBcmNCeVByb2dyZXNzKCBwcm9ncmVzcyApO1xuXG4gICAgICAgIGlmICggcHJvZ3Jlc3MgPiAxLjAgKSB7XG5cbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKCB0aGlzLnRpbWVySWQgKTtcbiAgICAgICAgICAgIHRoaXMucmlwcGxlKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBSZXRpY2xlIH07IiwiLyoqXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanMvZ3JhcGhzL2NvbnRyaWJ1dG9ycyBmb3IgdGhlIGZ1bGwgbGlzdCBvZiBjb250cmlidXRvcnMuXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcbiAqL1xuXG5cbnZhciBfR3JvdXAgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX3R3ZWVucyA9IHt9O1xuXHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xufTtcblxuX0dyb3VwLnByb3RvdHlwZSA9IHtcblx0Z2V0QWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoZnVuY3Rpb24gKHR3ZWVuSWQpIHtcblx0XHRcdHJldHVybiB0aGlzLl90d2VlbnNbdHdlZW5JZF07XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHR9LFxuXG5cdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5fdHdlZW5zID0ge307XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0dGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcblxuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldO1xuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXTtcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gKHRpbWUsIHByZXNlcnZlKSB7XG5cblx0XHR2YXIgdHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpO1xuXG5cdFx0aWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogVFdFRU4ubm93KCk7XG5cblx0XHQvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgdGhlbiB0aGVcblx0XHQvLyBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxuXHRcdC8vIElmIHlvdSByZW1vdmUgYSB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCBpdCBtYXkgb3IgbWF5IG5vdCBiZSB1cGRhdGVkLiBIb3dldmVyLFxuXHRcdC8vIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsIHRoZW4gaXQgd2lsbCBub3QgYmUgdXBkYXRlZC5cblx0XHR3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cblx0XHRcdFx0aWYgKHR3ZWVuICYmIHR3ZWVuLnVwZGF0ZSh0aW1lKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHR0d2Vlbi5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIXByZXNlcnZlKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xuXG5UV0VFTi5Hcm91cCA9IF9Hcm91cDtcblRXRUVOLl9uZXh0SWQgPSAwO1xuVFdFRU4ubmV4dElkID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gVFdFRU4uX25leHRJZCsrO1xufTtcblxuXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxuLy8gSW4gbm9kZS5qcywgdXNlIHByb2Nlc3MuaHJ0aW1lLlxuaWYgKHR5cGVvZiAoc2VsZikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugc2VsZi5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mIChzZWxmKSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCBzZWxmLnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XG5cbn07XG5cblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Z2V0SWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5faWQ7XG5cdH0sXG5cblx0aXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzUGxheWluZztcblx0fSxcblxuXHR0bzogZnVuY3Rpb24gKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBPYmplY3QuY3JlYXRlKHByb3BlcnRpZXMpO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkdXJhdGlvbjogZnVuY3Rpb24gZHVyYXRpb24oZCkge1xuXHRcdHRoaXMuX2R1cmF0aW9uID0gZDtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gKHRpbWUpIHtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSB0aGlzLl9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFt0aGlzLl9vYmplY3RbcHJvcGVydHldXS5jb25jYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMudXBkYXRlKEluZmluaXR5KTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcblx0XHR9XG5cblx0fSxcblxuXHRncm91cDogZnVuY3Rpb24gKGdyb3VwKSB7XG5cdFx0dGhpcy5fZ3JvdXAgPSBncm91cDtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRkZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xuXG5cdFx0dGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0OiBmdW5jdGlvbiAodGltZXMpIHtcblxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0RGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uICh5b3lvKSB7XG5cblx0XHR0aGlzLl95b3lvID0geW95bztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVhc2luZzogZnVuY3Rpb24gKGVhc2luZ0Z1bmN0aW9uKSB7XG5cblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aW50ZXJwb2xhdGlvbjogZnVuY3Rpb24gKGludGVycG9sYXRpb25GdW5jdGlvbikge1xuXG5cdFx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25SZXBlYXQ6IGZ1bmN0aW9uIG9uUmVwZWF0KGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25TdG9wOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RvcENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lKSB7XG5cblx0XHR2YXIgcHJvcGVydHk7XG5cdFx0dmFyIGVsYXBzZWQ7XG5cdFx0dmFyIHZhbHVlO1xuXG5cdFx0aWYgKHRpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcblxuXHRcdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGVsYXBzZWQgPSAodGltZSAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl9kdXJhdGlvbjtcblx0XHRlbGFwc2VkID0gKHRoaXMuX2R1cmF0aW9uID09PSAwIHx8IGVsYXBzZWQgPiAxKSA/IDEgOiBlbGFwc2VkO1xuXG5cdFx0dmFsdWUgPSB0aGlzLl9lYXNpbmdGdW5jdGlvbihlbGFwc2VkKTtcblxuXHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XG5cblx0XHRcdC8vIERvbid0IHVwZGF0ZSBwcm9wZXJ0aWVzIHRoYXQgZG8gbm90IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzdGFydCA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXHRcdFx0dmFyIGVuZCA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gUGFyc2VzIHJlbGF0aXZlIGVuZCB2YWx1ZXMgd2l0aCBzdGFydCBhcyBiYXNlIChlLmcuOiArMTAsIC0zKVxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnc3RyaW5nJykge1xuXG5cdFx0XHRcdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT09ICcrJyB8fCBlbmQuY2hhckF0KDApID09PSAnLScpIHtcblx0XHRcdFx0XHRcdGVuZCA9IHN0YXJ0ICsgcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUHJvdGVjdCBhZ2FpbnN0IG5vbiBudW1lcmljIHByb3BlcnRpZXMuXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vblVwZGF0ZUNhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XG5cdFx0fVxuXG5cdFx0aWYgKGVsYXBzZWQgPT09IDEpIHtcblxuXHRcdFx0aWYgKHRoaXMuX3JlcGVhdCA+IDApIHtcblxuXHRcdFx0XHRpZiAoaXNGaW5pdGUodGhpcy5fcmVwZWF0KSkge1xuXHRcdFx0XHRcdHRoaXMuX3JlcGVhdC0tO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVhc3NpZ24gc3RhcnRpbmcgdmFsdWVzLCByZXN0YXJ0IGJ5IG1ha2luZyBzdGFydFRpbWUgPSBub3dcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IHRtcDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fcmVwZWF0RGVsYXlUaW1lO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9kZWxheVRpbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fb25SZXBlYXRDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcbiIsIlxuaW1wb3J0ICd0aHJlZSc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0IHsgTU9ERVMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0IHsgVGV4dHVyZUxvYWRlciB9IGZyb20gJy4uL2xvYWRlcnMvVGV4dHVyZUxvYWRlcic7XG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xuXG4vKipcbiAqIEluZm9ybWF0aW9uIHNwb3QgYXR0YWNoZWQgdG8gcGFub3JhbWFcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtudW1iZXJ9IFtzY2FsZT0zMDBdIC0gRGVmYXVsdCBzY2FsZVxuICogQHBhcmFtIHtzdHJpbmd9IFtpbWFnZVNyYz1QQU5PTEVOUy5EYXRhSW1hZ2UuSW5mb10gLSBJbWFnZSBvdmVybGF5IGluZm9cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FuaW1hdGVkPXRydWVdIC0gRW5hYmxlIGRlZmF1bHQgaG92ZXIgYW5pbWF0aW9uXG4gKi9cbmZ1bmN0aW9uIEluZm9zcG90ICggc2NhbGUgPSAzMDAsIGltYWdlU3JjLCBhbmltYXRlZCApIHtcblx0XG5cdGNvbnN0IGR1cmF0aW9uID0gNTAwLCBzY2FsZUZhY3RvciA9IDEuMztcblxuXHRpbWFnZVNyYyA9IGltYWdlU3JjIHx8IERhdGFJbWFnZS5JbmZvO1xuXG5cdFRIUkVFLlNwcml0ZS5jYWxsKCB0aGlzICk7XG5cblx0dGhpcy50eXBlID0gJ2luZm9zcG90JztcblxuXHR0aGlzLmFuaW1hdGVkID0gYW5pbWF0ZWQgIT09IHVuZGVmaW5lZCA/IGFuaW1hdGVkIDogdHJ1ZTtcblx0dGhpcy5pc0hvdmVyaW5nID0gZmFsc2U7XG5cblx0Ly8gVE9ETzogVGhyZWUuanMgYnVnIGhvdGZpeCBmb3Igc3ByaXRlIHJheWNhc3RpbmcgcjEwNFxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8xNDYyNFxuXHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHR0aGlzLmVsZW1lbnQ7XG5cdHRoaXMudG9QYW5vcmFtYTtcblx0dGhpcy5jdXJzb3JTdHlsZTtcblxuXHR0aGlzLm1vZGUgPSBNT0RFUy5VTktOT1dOO1xuXG5cdHRoaXMuc2NhbGUuc2V0KCBzY2FsZSwgc2NhbGUsIDEgKTtcblx0dGhpcy5yb3RhdGlvbi55ID0gTWF0aC5QSTtcblxuXHR0aGlzLmNvbnRhaW5lcjtcblxuXHR0aGlzLm9yaWdpbmFsUmF5Y2FzdCA9IHRoaXMucmF5Y2FzdDtcblxuXHQvLyBFdmVudCBIYW5kbGVyXG5cdHRoaXMuSEFORExFUl9GT0NVUztcdFxuXG5cdHRoaXMubWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG5cdHRoaXMubWF0ZXJpYWwuZGVwdGhUZXN0ID0gZmFsc2U7XG5cdHRoaXMubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xuXHR0aGlzLm1hdGVyaWFsLm9wYWNpdHkgPSAwO1xuXG5cdGNvbnN0IHBvc3RMb2FkID0gZnVuY3Rpb24gKCB0ZXh0dXJlICkge1xuXG5cdFx0Y29uc3QgcmF0aW8gPSB0ZXh0dXJlLmltYWdlLndpZHRoIC8gdGV4dHVyZS5pbWFnZS5oZWlnaHQ7XG5cdFx0Y29uc3QgdGV4dHVyZVNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHRleHR1cmUuaW1hZ2Uud2lkdGggPSB0ZXh0dXJlLmltYWdlLm5hdHVyYWxXaWR0aCB8fCA2NDtcblx0XHR0ZXh0dXJlLmltYWdlLmhlaWdodCA9IHRleHR1cmUuaW1hZ2UubmF0dXJhbEhlaWdodCB8fCA2NDtcblxuXHRcdHRoaXMuc2NhbGUuc2V0KCByYXRpbyAqIHNjYWxlLCBzY2FsZSwgMSApO1xuXG5cdFx0dGV4dHVyZVNjYWxlLmNvcHkoIHRoaXMuc2NhbGUgKTtcblxuXHRcdHRoaXMuc2NhbGVVcEFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5zY2FsZSApXG5cdFx0XHQudG8oIHsgeDogdGV4dHVyZVNjYWxlLnggKiBzY2FsZUZhY3RvciwgeTogdGV4dHVyZVNjYWxlLnkgKiBzY2FsZUZhY3RvciB9LCBkdXJhdGlvbiApXG5cdFx0XHQuZWFzaW5nKCBUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQgKTtcblxuXHRcdHRoaXMuc2NhbGVEb3duQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLnNjYWxlIClcblx0XHRcdC50byggeyB4OiB0ZXh0dXJlU2NhbGUueCwgeTogdGV4dHVyZVNjYWxlLnkgfSwgZHVyYXRpb24gKVxuXHRcdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0ICk7XG5cblx0XHR0aGlzLm1hdGVyaWFsLm1hcCA9IHRleHR1cmU7XG5cdFx0dGhpcy5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0fS5iaW5kKCB0aGlzICk7XG5cblx0Ly8gQWRkIHNob3cgYW5kIGhpZGUgYW5pbWF0aW9uc1xuXHR0aGlzLnNob3dBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMubWF0ZXJpYWwgKVxuXHRcdC50byggeyBvcGFjaXR5OiAxIH0sIGR1cmF0aW9uIClcblx0XHQub25TdGFydCggdGhpcy5lbmFibGVSYXljYXN0LmJpbmQoIHRoaXMsIHRydWUgKSApXG5cdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0ICk7XG5cblx0dGhpcy5oaWRlQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLm1hdGVyaWFsIClcblx0XHQudG8oIHsgb3BhY2l0eTogMCB9LCBkdXJhdGlvbiApXG5cdFx0Lm9uU3RhcnQoIHRoaXMuZW5hYmxlUmF5Y2FzdC5iaW5kKCB0aGlzLCBmYWxzZSApIClcblx0XHQuZWFzaW5nKCBUV0VFTi5FYXNpbmcuUXVhcnRpYy5PdXQgKTtcblxuXHQvLyBBdHRhY2ggZXZlbnQgbGlzdGVuZXJzXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5vbkNsaWNrICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2hvdmVyJywgdGhpcy5vbkhvdmVyICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2hvdmVyZW50ZXInLCB0aGlzLm9uSG92ZXJTdGFydCApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdob3ZlcmxlYXZlJywgdGhpcy5vbkhvdmVyRW5kICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWR1YWwtZXllLWVmZmVjdCcsIHRoaXMub25EdWFsRXllRWZmZWN0ICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIHRoaXMuc2V0Q29udGFpbmVyLmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdkaXNtaXNzJywgdGhpcy5vbkRpc21pc3MgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtaW5mb3Nwb3QtZm9jdXMnLCB0aGlzLnNldEZvY3VzTWV0aG9kICk7XG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9yYW1hLWVudGVyJywgdGhpcy5vblBhbm9yYW1hRW50ZXIgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncGFub3JhbWEtbGVhdmUnLCB0aGlzLm9uUGFub3JhbWFMZWF2ZSApO1xuXG5cdFRleHR1cmVMb2FkZXIubG9hZCggaW1hZ2VTcmMsIHBvc3RMb2FkICk7XHRcblxufTtcblxuSW5mb3Nwb3QucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuU3ByaXRlLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IEluZm9zcG90LFxuXG5cdG9uUGFub3JhbWFFbnRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0XG5cblx0fSxcblxuXHRvblBhbm9yYW1hTGVhdmU6IGZ1bmN0aW9uICgpIHtcblxuXG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IGluZm9zcG90IGNvbnRhaW5lclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fG9iamVjdH0gZGF0YSAtIERhdGEgd2l0aCBjb250YWluZXIgaW5mb3JtYXRpb25cblx0ICovXG5cdHNldENvbnRhaW5lcjogZnVuY3Rpb24gKCBkYXRhICkge1xuXG5cdFx0bGV0IGNvbnRhaW5lcjtcblx0XG5cdFx0aWYgKCBkYXRhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG5cdFxuXHRcdFx0Y29udGFpbmVyID0gZGF0YTtcblx0XG5cdFx0fSBlbHNlIGlmICggZGF0YSAmJiBkYXRhLmNvbnRhaW5lciApIHtcblx0XG5cdFx0XHRjb250YWluZXIgPSBkYXRhLmNvbnRhaW5lcjtcblx0XG5cdFx0fVxuXHRcblx0XHQvLyBBcHBlbmQgZWxlbWVudCBpZiBleGlzdHNcblx0XHRpZiAoIGNvbnRhaW5lciAmJiB0aGlzLmVsZW1lbnQgKSB7XG5cdFxuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblx0XG5cdFx0fVxuXHRcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblx0XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBjb250YWluZXJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gVGhlIGNvbnRhaW5lciBvZiB0aGlzIGluZm9zcG90XG5cdCAqL1xuXHRnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmNvbnRhaW5lcjtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIGJ5IGEgY2xpY2sgZXZlbnRcblx0ICogVHJhbnNsYXRlIGFuZCBsb2NrIHRoZSBob3ZlcmluZyBlbGVtZW50IGlmIGFueVxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gRXZlbnQgY29udGFpbmluZyBtb3VzZUV2ZW50IHdpdGggY2xpZW50WCBhbmQgY2xpZW50WVxuXHQgKi9cblx0b25DbGljazogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGlmICggdGhpcy5lbGVtZW50ICYmIHRoaXMuZ2V0Q29udGFpbmVyKCkgKSB7XG5cblx0XHRcdHRoaXMub25Ib3ZlclN0YXJ0KCBldmVudCApO1xuXG5cdFx0XHQvLyBMb2NrIGVsZW1lbnRcblx0XHRcdHRoaXMubG9ja0hvdmVyRWxlbWVudCgpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc21pc3MgY3VycmVudCBlbGVtZW50IGlmIGFueVxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gRGlzbWlzcyBldmVudFxuXHQgKi9cblx0b25EaXNtaXNzOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0aWYgKCB0aGlzLmVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMudW5sb2NrSG92ZXJFbGVtZW50KCk7XG5cdFx0XHR0aGlzLm9uSG92ZXJFbmQoKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIGJ5IGEgbW91c2UgaG92ZXIgZXZlbnRcblx0ICogVHJhbnNsYXRlIHRoZSBob3ZlcmluZyBlbGVtZW50IGlmIGFueVxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gRXZlbnQgY29udGFpbmluZyBtb3VzZUV2ZW50IHdpdGggY2xpZW50WCBhbmQgY2xpZW50WVxuXHQgKi9cblx0b25Ib3ZlcjogZnVuY3Rpb24gKCBldmVudCApIHt9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIG9uIGEgbW91c2UgaG92ZXIgc3RhcnRcblx0ICogU2V0cyBjdXJzb3Igc3R5bGUgdG8gJ3BvaW50ZXInLCBkaXNwbGF5IHRoZSBlbGVtZW50IGFuZCBzY2FsZSB1cCB0aGUgaW5mb3Nwb3Rcblx0ICovXG5cdG9uSG92ZXJTdGFydDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGlmICggIXRoaXMuZ2V0Q29udGFpbmVyKCkgKSB7IHJldHVybjsgfVxuXG5cdFx0Y29uc3QgY3Vyc29yU3R5bGUgPSB0aGlzLmN1cnNvclN0eWxlIHx8ICggdGhpcy5tb2RlID09PSBNT0RFUy5OT1JNQUwgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcgKTtcblxuXHRcdHRoaXMuaXNIb3ZlcmluZyA9IHRydWU7XG5cdFx0dGhpcy5jb250YWluZXIuc3R5bGUuY3Vyc29yID0gY3Vyc29yU3R5bGU7XG5cdFx0XG5cdFx0aWYgKCB0aGlzLmFuaW1hdGVkICkge1xuXG5cdFx0XHR0aGlzLnNjYWxlRG93bkFuaW1hdGlvbiAmJiB0aGlzLnNjYWxlRG93bkFuaW1hdGlvbi5zdG9wKCk7XG5cdFx0XHR0aGlzLnNjYWxlVXBBbmltYXRpb24gJiYgdGhpcy5zY2FsZVVwQW5pbWF0aW9uLnN0YXJ0KCk7XG5cblx0XHR9XG5cdFx0XG5cdFx0aWYgKCB0aGlzLmVsZW1lbnQgJiYgZXZlbnQubW91c2VFdmVudC5jbGllbnRYID49IDAgJiYgZXZlbnQubW91c2VFdmVudC5jbGllbnRZID49IDAgKSB7XG5cblx0XHRcdGlmICggdGhpcy5tb2RlID09PSBNT0RFUy5DQVJEQk9BUkQgfHwgdGhpcy5tb2RlID09PSBNT0RFUy5TVEVSRU8gKSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5sZWZ0ICYmICggdGhpcy5lbGVtZW50LmxlZnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaycgKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnJpZ2h0ICYmICggdGhpcy5lbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snICk7XG5cblx0XHRcdFx0Ly8gU3RvcmUgZWxlbWVudCB3aWR0aCBmb3IgcmVmZXJlbmNlXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5fd2lkdGggPSB0aGlzLmVsZW1lbnQubGVmdC5jbGllbnRXaWR0aDtcblx0XHRcdFx0dGhpcy5lbGVtZW50Ll9oZWlnaHQgPSB0aGlzLmVsZW1lbnQubGVmdC5jbGllbnRIZWlnaHQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQubGVmdCAmJiAoIHRoaXMuZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScgKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnJpZ2h0ICYmICggdGhpcy5lbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScgKTtcblxuXHRcdFx0XHQvLyBTdG9yZSBlbGVtZW50IHdpZHRoIGZvciByZWZlcmVuY2Vcblx0XHRcdFx0dGhpcy5lbGVtZW50Ll93aWR0aCA9IHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRcdFx0dGhpcy5lbGVtZW50Ll9oZWlnaHQgPSB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCBvbiBhIG1vdXNlIGhvdmVyIGVuZFxuXHQgKiBTZXRzIGN1cnNvciBzdHlsZSB0byAnZGVmYXVsdCcsIGhpZGUgdGhlIGVsZW1lbnQgYW5kIHNjYWxlIGRvd24gdGhlIGluZm9zcG90XG5cdCAqL1xuXHRvbkhvdmVyRW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoICF0aGlzLmdldENvbnRhaW5lcigpICkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuaXNIb3ZlcmluZyA9IGZhbHNlO1xuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcblxuXHRcdGlmICggdGhpcy5hbmltYXRlZCApIHtcblxuXHRcdFx0dGhpcy5zY2FsZVVwQW5pbWF0aW9uICYmIHRoaXMuc2NhbGVVcEFuaW1hdGlvbi5zdG9wKCk7XG5cdFx0XHR0aGlzLnNjYWxlRG93bkFuaW1hdGlvbiAmJiB0aGlzLnNjYWxlRG93bkFuaW1hdGlvbi5zdGFydCgpO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLmVsZW1lbnQgJiYgIXRoaXMuZWxlbWVudC5sb2NrZWQgKSB7XG5cblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0dGhpcy5lbGVtZW50LmxlZnQgJiYgKCB0aGlzLmVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnICk7XG5cdFx0XHR0aGlzLmVsZW1lbnQucmlnaHQgJiYgKCB0aGlzLmVsZW1lbnQucmlnaHQuc3R5bGUuZGlzcGxheSA9ICdub25lJyApO1xuXG5cdFx0XHR0aGlzLnVubG9ja0hvdmVyRWxlbWVudCgpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIE9uIGR1YWwgZXllIGVmZmVjdCBoYW5kbGVyXG5cdCAqIENyZWF0ZXMgZHVwbGljYXRlIGxlZnQgYW5kIHJpZ2h0IGVsZW1lbnRcblx0ICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIHBhbm9sZW5zLWR1YWwtZXllLWVmZmVjdCBldmVudFxuXHQgKi9cblx0b25EdWFsRXllRWZmZWN0OiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFxuXHRcdGlmICggIXRoaXMuZ2V0Q29udGFpbmVyKCkgKSB7IHJldHVybjsgfVxuXG5cdFx0bGV0IGVsZW1lbnQsIGhhbGZXaWR0aCwgaGFsZkhlaWdodDtcblxuXHRcdHRoaXMubW9kZSA9IGV2ZW50Lm1vZGU7XG5cblx0XHRlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXG5cdFx0aGFsZldpZHRoID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyAyO1xuXHRcdGhhbGZIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyO1xuXG5cdFx0aWYgKCAhZWxlbWVudCApIHtcblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCAhZWxlbWVudC5sZWZ0IHx8ICFlbGVtZW50LnJpZ2h0ICkge1xuXG5cdFx0XHRlbGVtZW50LmxlZnQgPSBlbGVtZW50LmNsb25lTm9kZSggdHJ1ZSApO1xuXHRcdFx0ZWxlbWVudC5yaWdodCA9IGVsZW1lbnQuY2xvbmVOb2RlKCB0cnVlICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuQ0FSREJPQVJEIHx8IHRoaXMubW9kZSA9PT0gTU9ERVMuU1RFUkVPICkge1xuXG5cdFx0XHRlbGVtZW50LmxlZnQuc3R5bGUuZGlzcGxheSA9IGVsZW1lbnQuc3R5bGUuZGlzcGxheTtcblx0XHRcdGVsZW1lbnQucmlnaHQuc3R5bGUuZGlzcGxheSA9IGVsZW1lbnQuc3R5bGUuZGlzcGxheTtcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5O1xuXHRcdFx0ZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRlbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cblx0XHR9XG5cblx0XHQvLyBVcGRhdGUgZWxlbWVudHMgdHJhbnNsYXRpb25cblx0XHR0aGlzLnRyYW5zbGF0ZUVsZW1lbnQoIGhhbGZXaWR0aCwgaGFsZkhlaWdodCApO1xuXG5cdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIGVsZW1lbnQubGVmdCApO1xuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBlbGVtZW50LnJpZ2h0ICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVHJhbnNsYXRlIHRoZSBob3ZlcmluZyBlbGVtZW50IGJ5IGNzcyB0cmFuc2Zvcm1cblx0ICogQHBhcmFtICB7bnVtYmVyfSB4IC0gWCBwb3NpdGlvbiBvbiB0aGUgd2luZG93IHNjcmVlblxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9IHkgLSBZIHBvc2l0aW9uIG9uIHRoZSB3aW5kb3cgc2NyZWVuXG5cdCAqL1xuXHR0cmFuc2xhdGVFbGVtZW50OiBmdW5jdGlvbiAoIHgsIHkgKSB7XG5cblx0XHRpZiAoICF0aGlzLmVsZW1lbnQuX3dpZHRoIHx8ICF0aGlzLmVsZW1lbnQuX2hlaWdodCB8fCAhdGhpcy5nZXRDb250YWluZXIoKSApIHtcblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0bGV0IGxlZnQsIHRvcCwgZWxlbWVudCwgd2lkdGgsIGhlaWdodCwgZGVsdGEsIGNvbnRhaW5lcjtcblxuXHRcdGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXHRcdGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG5cdFx0d2lkdGggPSBlbGVtZW50Ll93aWR0aCAvIDI7XG5cdFx0aGVpZ2h0ID0gZWxlbWVudC5faGVpZ2h0IC8gMjtcblx0XHRkZWx0YSA9IGVsZW1lbnQudmVydGljYWxEZWx0YSAhPT0gdW5kZWZpbmVkID8gZWxlbWVudC52ZXJ0aWNhbERlbHRhIDogNDA7XG5cblx0XHRsZWZ0ID0geCAtIHdpZHRoO1xuXHRcdHRvcCA9IHkgLSBoZWlnaHQgLSBkZWx0YTtcblxuXHRcdGlmICggKCB0aGlzLm1vZGUgPT09IE1PREVTLkNBUkRCT0FSRCB8fCB0aGlzLm1vZGUgPT09IE1PREVTLlNURVJFTyApIFxuXHRcdFx0XHQmJiBlbGVtZW50LmxlZnQgJiYgZWxlbWVudC5yaWdodFxuXHRcdFx0XHQmJiAhKCB4ID09PSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyICYmIHkgPT09IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyICkgKSB7XG5cblx0XHRcdGxlZnQgPSBjb250YWluZXIuY2xpZW50V2lkdGggLyA0IC0gd2lkdGggKyAoIHggLSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyICk7XG5cdFx0XHR0b3AgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMiAtIGhlaWdodCAtIGRlbHRhICsgKCB5IC0gY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDIgKTtcblxuXHRcdFx0dGhpcy5zZXRFbGVtZW50U3R5bGUoICd0cmFuc2Zvcm0nLCBlbGVtZW50LmxlZnQsICd0cmFuc2xhdGUoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgpJyApO1xuXG5cdFx0XHRsZWZ0ICs9IGNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDI7XG5cblx0XHRcdHRoaXMuc2V0RWxlbWVudFN0eWxlKCAndHJhbnNmb3JtJywgZWxlbWVudC5yaWdodCwgJ3RyYW5zbGF0ZSgnICsgbGVmdCArICdweCwgJyArIHRvcCArICdweCknICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnNldEVsZW1lbnRTdHlsZSggJ3RyYW5zZm9ybScsIGVsZW1lbnQsICd0cmFuc2xhdGUoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgpJyApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCB2ZW5kb3Igc3BlY2lmaWMgY3NzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gQ1NTIHN0eWxlIG5hbWVcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGJlIG1vZGlmaWVkXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFN0eWxlIHZhbHVlXG5cdCAqL1xuXHRzZXRFbGVtZW50U3R5bGU6IGZ1bmN0aW9uICggdHlwZSwgZWxlbWVudCwgdmFsdWUgKSB7XG5cblx0XHRjb25zdCBzdHlsZSA9IGVsZW1lbnQuc3R5bGU7XG5cblx0XHRpZiAoIHR5cGUgPT09ICd0cmFuc2Zvcm0nICkge1xuXG5cdFx0XHRzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBzdHlsZS5tc1RyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBob3ZlcmluZyB0ZXh0IGNvbnRlbnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0IHRvIGJlIGRpc3BsYXllZFxuXHQgKi9cblx0c2V0VGV4dDogZnVuY3Rpb24gKCB0ZXh0ICkge1xuXG5cdFx0aWYgKCB0aGlzLmVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IGN1cnNvciBjc3Mgc3R5bGUgb24gaG92ZXJcblx0ICovXG5cdHNldEN1cnNvckhvdmVyU3R5bGU6IGZ1bmN0aW9uICggc3R5bGUgKSB7XG5cblx0XHR0aGlzLmN1cnNvclN0eWxlID0gc3R5bGU7XG5cblx0fSxcblxuXHQvKipcblx0ICogQWRkIGhvdmVyaW5nIHRleHQgZWxlbWVudFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQgdG8gYmUgZGlzcGxheWVkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbZGVsdGE9NDBdIC0gVmVydGljYWwgZGVsdGEgdG8gdGhlIGluZm9zcG90XG5cdCAqL1xuXHRhZGRIb3ZlclRleHQ6IGZ1bmN0aW9uICggdGV4dCwgZGVsdGEgKSB7XG5cblx0XHRpZiAoICF0aGlzLmVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9ICcjZmZmJztcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJzUwJSc7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzUwJSc7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUudGV4dFNoYWRvdyA9ICcwIDAgM3B4ICMwMDAwMDAnO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSAnXCJUcmVidWNoZXQgTVNcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJztcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ3Bhbm9sZW5zLWluZm9zcG90JyApO1xuXHRcdFx0dGhpcy5lbGVtZW50LnZlcnRpY2FsRGVsdGEgPSBkZWx0YSAhPT0gdW5kZWZpbmVkID8gZGVsdGEgOiA0MDtcblxuXHRcdH1cblxuXHRcdHRoaXMuc2V0VGV4dCggdGV4dCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEFkZCBob3ZlcmluZyBlbGVtZW50IGJ5IGNsb25pbmcgYW4gZWxlbWVudFxuXHQgKiBAcGFyYW0ge0hUTUxET01FbGVtZW50fSBlbCAtIEVsZW1lbnQgdG8gYmUgY2xvbmVkIGFuZCBkaXNwbGF5ZWRcblx0ICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YT00MF0gLSBWZXJ0aWNhbCBkZWx0YSB0byB0aGUgaW5mb3Nwb3Rcblx0ICovXG5cdGFkZEhvdmVyRWxlbWVudDogZnVuY3Rpb24gKCBlbCwgZGVsdGEgKSB7XG5cblx0XHRpZiAoICF0aGlzLmVsZW1lbnQgKSB7IFxuXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBlbC5jbG9uZU5vZGUoIHRydWUgKTtcblx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IDA7XG5cdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoICdwYW5vbGVucy1pbmZvc3BvdCcgKTtcblx0XHRcdHRoaXMuZWxlbWVudC52ZXJ0aWNhbERlbHRhID0gZGVsdGEgIT09IHVuZGVmaW5lZCA/IGRlbHRhIDogNDA7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogUmVtb3ZlIGhvdmVyaW5nIGVsZW1lbnRcblx0ICovXG5cdHJlbW92ZUhvdmVyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB0aGlzLmVsZW1lbnQgKSB7IFxuXG5cdFx0XHRpZiAoIHRoaXMuZWxlbWVudC5sZWZ0ICkge1xuXG5cdFx0XHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQubGVmdCApO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQubGVmdCA9IG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0aGlzLmVsZW1lbnQucmlnaHQgKSB7XG5cblx0XHRcdFx0dGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudC5yaWdodCApO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQucmlnaHQgPSBudWxsO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblx0XHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogTG9jayBob3ZlcmluZyBlbGVtZW50XG5cdCAqL1xuXHRsb2NrSG92ZXJFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIHRoaXMuZWxlbWVudCApIHsgXG5cblx0XHRcdHRoaXMuZWxlbWVudC5sb2NrZWQgPSB0cnVlO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFVubG9jayBob3ZlcmluZyBlbGVtZW50XG5cdCAqL1xuXHR1bmxvY2tIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdGhpcy5lbGVtZW50ICkgeyBcblxuXHRcdFx0dGhpcy5lbGVtZW50LmxvY2tlZCA9IGZhbHNlO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0ZW5hYmxlUmF5Y2FzdDogZnVuY3Rpb24gKCBlbmFibGVkID0gdHJ1ZSApIHtcblxuXHRcdGlmICggZW5hYmxlZCApIHtcblxuXHRcdFx0dGhpcy5yYXljYXN0ID0gdGhpcy5vcmlnaW5hbFJheWNhc3Q7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnJheWNhc3QgPSAoKSA9PiB7fTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTaG93IGluZm9zcG90XG5cdCAqIEBwYXJhbSAge251bWJlcn0gW2RlbGF5PTBdIC0gRGVsYXkgdGltZSB0byBzaG93XG5cdCAqL1xuXHRzaG93OiBmdW5jdGlvbiAoIGRlbGF5ID0gMCApIHtcblxuXHRcdGlmICggdGhpcy5hbmltYXRlZCApIHtcblxuXHRcdFx0dGhpcy5oaWRlQW5pbWF0aW9uICYmIHRoaXMuaGlkZUFuaW1hdGlvbi5zdG9wKCk7XG5cdFx0XHR0aGlzLnNob3dBbmltYXRpb24gJiYgdGhpcy5zaG93QW5pbWF0aW9uLmRlbGF5KCBkZWxheSApLnN0YXJ0KCk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLm1hdGVyaWFsLm9wYWNpdHkgPSAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEhpZGUgaW5mb3Nwb3Rcblx0ICogQHBhcmFtICB7bnVtYmVyfSBbZGVsYXk9MF0gLSBEZWxheSB0aW1lIHRvIGhpZGVcblx0ICovXG5cdGhpZGU6IGZ1bmN0aW9uICggZGVsYXkgPSAwICkge1xuXG5cdFx0aWYgKCB0aGlzLmFuaW1hdGVkICkge1xuXG5cdFx0XHR0aGlzLnNob3dBbmltYXRpb24gJiYgdGhpcy5zaG93QW5pbWF0aW9uLnN0b3AoKTtcblx0XHRcdHRoaXMuaGlkZUFuaW1hdGlvbiAmJiB0aGlzLmhpZGVBbmltYXRpb24uZGVsYXkoIGRlbGF5ICkuc3RhcnQoKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMubWF0ZXJpYWwub3BhY2l0eSA9IDA7XG5cblx0XHR9XG5cdFx0XG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBmb2N1cyBldmVudCBoYW5kbGVyXG5cdCAqL1xuXHRzZXRGb2N1c01ldGhvZDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGlmICggZXZlbnQgKSB7XG5cblx0XHRcdHRoaXMuSEFORExFUl9GT0NVUyA9IGV2ZW50Lm1ldGhvZDtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBGb2N1cyBjYW1lcmEgY2VudGVyIHRvIHRoaXMgaW5mb3Nwb3Rcblx0ICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0xMDAwXSAtIER1cmF0aW9uIHRvIHR3ZWVuXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9VFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsLk91dF0gLSBFYXNpbmcgZnVuY3Rpb25cblx0ICovXG5cdGZvY3VzOiBmdW5jdGlvbiAoIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cblx0XHRpZiAoIHRoaXMuSEFORExFUl9GT0NVUyApIHtcblxuXHRcdFx0dGhpcy5IQU5ETEVSX0ZPQ1VTKCB0aGlzLnBvc2l0aW9uLCBkdXJhdGlvbiwgZWFzaW5nICk7XG5cdFx0XHR0aGlzLm9uRGlzbWlzcygpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc3Bvc2UgaW5mb3Nwb3Rcblx0ICovXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMucmVtb3ZlSG92ZXJFbGVtZW50KCk7XG5cdFx0dGhpcy5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cblx0XHRpZiAoIHRoaXMucGFyZW50ICkge1xuXG5cdFx0XHR0aGlzLnBhcmVudC5yZW1vdmUoIHRoaXMgKTtcblxuXHRcdH1cblxuXHR9XG5cbn0gKTtcblxuZXhwb3J0IHsgSW5mb3Nwb3QgfTsiLCJpbXBvcnQgeyBDT05UUk9MUywgTU9ERVMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi4vRGF0YUltYWdlJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIFdpZGdldCBmb3IgY29udHJvbHNcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyIC0gQSBkb21FbGVtZW50IHdoZXJlIGRlZmF1bHQgY29udHJvbCB3aWRnZXQgd2lsbCBiZSBhdHRhY2hlZCB0b1xuICovXG5mdW5jdGlvbiBXaWRnZXQgKCBjb250YWluZXIgKSB7XG5cblx0aWYgKCAhY29udGFpbmVyICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnUEFOT0xFTlMuV2lkZ2V0OiBObyBjb250YWluZXIgc3BlY2lmaWVkJyApO1xuXG5cdH1cblxuXHRUSFJFRS5FdmVudERpc3BhdGNoZXIuY2FsbCggdGhpcyApO1xuXG5cdHRoaXMuREVGQVVMVF9UUkFOU0lUSU9OICA9ICdhbGwgMC4yN3MgZWFzZSc7XG5cdHRoaXMuVE9VQ0hfRU5BQkxFRCA9ICEhKCggJ29udG91Y2hzdGFydCcgaW4gd2luZG93ICkgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKTtcblx0dGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH07XG5cblx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cblx0dGhpcy5iYXJFbGVtZW50O1xuXHR0aGlzLmZ1bGxzY3JlZW5FbGVtZW50O1xuXHR0aGlzLnZpZGVvRWxlbWVudDtcblx0dGhpcy5zZXR0aW5nRWxlbWVudDtcblxuXHR0aGlzLm1haW5NZW51O1xuXG5cdHRoaXMuYWN0aXZlTWFpbkl0ZW07XG5cdHRoaXMuYWN0aXZlU3ViTWVudTtcblx0dGhpcy5tYXNrO1xuXG59XG5cbldpZGdldC5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogV2lkZ2V0LFxuXG5cdC8qKlxuXHQgKiBBZGQgY29udHJvbCBiYXJcblx0ICovXG5cdGFkZENvbnRyb2xCYXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggIXRoaXMuY29udGFpbmVyICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdXaWRnZXQgY29udGFpbmVyIG5vdCBzZXQnICk7IFxuXHRcdFx0cmV0dXJuOyBcblx0XHR9XG5cblx0XHR2YXIgc2NvcGUgPSB0aGlzLCBiYXIsIHN0eWxlVHJhbnNsYXRlLCBzdHlsZU9wYWNpdHksIGdyYWRpZW50U3R5bGU7XG5cblx0XHRncmFkaWVudFN0eWxlID0gJ2xpbmVhci1ncmFkaWVudChib3R0b20sIHJnYmEoMCwwLDAsMC4yKSwgcmdiYSgwLDAsMCwwKSknO1xuXG5cdFx0YmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRiYXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG5cdFx0YmFyLnN0eWxlLmhlaWdodCA9ICc0NHB4Jztcblx0XHRiYXIuc3R5bGUuZmxvYXQgPSAnbGVmdCc7XG5cdFx0YmFyLnN0eWxlLnRyYW5zZm9ybSA9IGJhci5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBiYXIuc3R5bGUubXNUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMTAwJSknO1xuXHRcdGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gJy13ZWJraXQtJyArIGdyYWRpZW50U3R5bGU7XG5cdFx0YmFyLnN0eWxlLmJhY2tncm91bmQgPSAnLW1vei0nICsgZ3JhZGllbnRTdHlsZTtcblx0XHRiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctby0nICsgZ3JhZGllbnRTdHlsZTtcblx0XHRiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctbXMtJyArIGdyYWRpZW50U3R5bGU7XG5cdFx0YmFyLnN0eWxlLmJhY2tncm91bmQgPSBncmFkaWVudFN0eWxlO1xuXHRcdGJhci5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5ERUZBVUxUX1RSQU5TSVRJT047XG5cdFx0YmFyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cdFx0YmFyLmlzSGlkZGVuID0gZmFsc2U7XG5cdFx0YmFyLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGJhci5pc0hpZGRlbiA9ICFiYXIuaXNIaWRkZW47XG5cdFx0XHRzdHlsZVRyYW5zbGF0ZSA9IGJhci5pc0hpZGRlbiA/ICd0cmFuc2xhdGVZKDApJyA6ICd0cmFuc2xhdGVZKC0xMDAlKSc7XG5cdFx0XHRzdHlsZU9wYWNpdHkgPSBiYXIuaXNIaWRkZW4gPyAwIDogMTtcblx0XHRcdGJhci5zdHlsZS50cmFuc2Zvcm0gPSBiYXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYmFyLnN0eWxlLm1zVHJhbnNmb3JtID0gc3R5bGVUcmFuc2xhdGU7XG5cdFx0XHRiYXIuc3R5bGUub3BhY2l0eSA9IHN0eWxlT3BhY2l0eTtcblx0XHR9O1xuXG5cdFx0Ly8gTWVudVxuXHRcdHZhciBtZW51ID0gdGhpcy5jcmVhdGVEZWZhdWx0TWVudSgpO1xuXHRcdHRoaXMubWFpbk1lbnUgPSB0aGlzLmNyZWF0ZU1haW5NZW51KCBtZW51ICk7XG5cdFx0YmFyLmFwcGVuZENoaWxkKCB0aGlzLm1haW5NZW51ICk7XG5cblx0XHQvLyBNYXNrXG5cdFx0dmFyIG1hc2sgPSB0aGlzLmNyZWF0ZU1hc2soKTtcblx0XHR0aGlzLm1hc2sgPSBtYXNrO1xuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBtYXNrICk7XG5cblx0XHQvLyBEaXNwb3NlXG5cdFx0YmFyLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmICggc2NvcGUuZnVsbHNjcmVlbkVsZW1lbnQgKSB7XG5cblx0XHRcdFx0YmFyLnJlbW92ZUNoaWxkKCBzY29wZS5mdWxsc2NyZWVuRWxlbWVudCApO1xuXHRcdFx0XHRzY29wZS5mdWxsc2NyZWVuRWxlbWVudC5kaXNwb3NlKCk7XG5cdFx0XHRcdHNjb3BlLmZ1bGxzY3JlZW5FbGVtZW50ID0gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNjb3BlLnNldHRpbmdFbGVtZW50ICkge1xuXG5cdFx0XHRcdGJhci5yZW1vdmVDaGlsZCggc2NvcGUuc2V0dGluZ0VsZW1lbnQgKTtcblx0XHRcdFx0c2NvcGUuc2V0dGluZ0VsZW1lbnQuZGlzcG9zZSgpO1xuXHRcdFx0XHRzY29wZS5zZXR0aW5nRWxlbWVudCA9IG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS52aWRlb0VsZW1lbnQgKSB7XG5cblx0XHRcdFx0YmFyLnJlbW92ZUNoaWxkKCBzY29wZS52aWRlb0VsZW1lbnQgKTtcblx0XHRcdFx0c2NvcGUudmlkZW9FbGVtZW50LmRpc3Bvc2UoKTtcblx0XHRcdFx0c2NvcGUudmlkZW9FbGVtZW50ID0gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBiYXIgKTtcblxuXHRcdC8vIE1hc2sgZXZlbnRzXG5cdFx0dGhpcy5tYXNrLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuXHRcdHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMuUFJFVkVOVF9FVkVOVF9IQU5ETEVSLCB0cnVlICk7XG5cdFx0dGhpcy5tYXNrLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuXHRcdHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0c2NvcGUubWFzay5oaWRlKCk7XG5cdFx0XHRzY29wZS5zZXR0aW5nRWxlbWVudC5kZWFjdGl2YXRlKCk7XG5cblx0XHR9LCBmYWxzZSApO1xuXG5cdFx0Ly8gRXZlbnQgbGlzdGVuZXJcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdjb250cm9sLWJhci10b2dnbGUnLCBiYXIudG9nZ2xlICk7XG5cblx0XHR0aGlzLmJhckVsZW1lbnQgPSBiYXI7XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIGRlZmF1bHQgbWVudVxuXHQgKi9cblx0Y3JlYXRlRGVmYXVsdE1lbnU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBzY29wZSA9IHRoaXMsIGhhbmRsZXI7XG5cblx0XHRoYW5kbGVyID0gZnVuY3Rpb24gKCBtZXRob2QsIGRhdGEgKSB7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggeyBcblxuXHRcdFx0XHRcdHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIFxuXHRcdFx0XHRcdG1ldGhvZDogbWV0aG9kLCBcblx0XHRcdFx0XHRkYXRhOiBkYXRhIFxuXG5cdFx0XHRcdH0gKTsgXG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHRyZXR1cm4gW1xuXG5cdFx0XHR7IFxuXHRcdFx0XHR0aXRsZTogJ0NvbnRyb2wnLCBcblx0XHRcdFx0c3ViTWVudTogWyBcblx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0dGl0bGU6IHRoaXMuVE9VQ0hfRU5BQkxFRCA/ICdUb3VjaCcgOiAnTW91c2UnLCBcblx0XHRcdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVDb250cm9sJywgQ09OVFJPTFMuT1JCSVQgKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdHRpdGxlOiAnU2Vuc29yJywgXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlQ29udHJvbCcsIENPTlRST0xTLkRFVklDRU9SSUVOVEFUSU9OICkgXG5cdFx0XHRcdFx0fSBcblx0XHRcdFx0XVxuXHRcdFx0fSxcblxuXHRcdFx0eyBcblx0XHRcdFx0dGl0bGU6ICdNb2RlJywgXG5cdFx0XHRcdHN1Yk1lbnU6IFsgXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdHRpdGxlOiAnTm9ybWFsJyxcblx0XHRcdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIoICdkaXNhYmxlRWZmZWN0JyApXG5cdFx0XHRcdFx0fSwgXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdHRpdGxlOiAnQ2FyZGJvYXJkJyxcblx0XHRcdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVFZmZlY3QnLCBNT0RFUy5DQVJEQk9BUkQgKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdHRpdGxlOiAnU3RlcmVvc2NvcGljJyxcblx0XHRcdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVFZmZlY3QnLCBNT0RFUy5TVEVSRU8gKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXG5cdFx0XTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBZGQgYnV0dG9ucyBvbiB0b3Agb2YgY29udHJvbCBiYXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgY29udHJvbCBidXR0b24gbmFtZSB0byBiZSBjcmVhdGVkXG5cdCAqL1xuXHRhZGRDb250cm9sQnV0dG9uOiBmdW5jdGlvbiAoIG5hbWUgKSB7XG5cblx0XHRsZXQgZWxlbWVudDtcblxuXHRcdHN3aXRjaCggbmFtZSApIHtcblxuXHRcdFx0Y2FzZSAnZnVsbHNjcmVlbic6XG5cblx0XHRcdFx0ZWxlbWVudCA9IHRoaXMuY3JlYXRlRnVsbHNjcmVlbkJ1dHRvbigpO1xuXHRcdFx0XHR0aGlzLmZ1bGxzY3JlZW5FbGVtZW50ID0gZWxlbWVudDsgXG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ3NldHRpbmcnOlxuXG5cdFx0XHRcdGVsZW1lbnQgPSB0aGlzLmNyZWF0ZVNldHRpbmdCdXR0b24oKTtcblx0XHRcdFx0dGhpcy5zZXR0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ3ZpZGVvJzpcblxuXHRcdFx0XHRlbGVtZW50ID0gdGhpcy5jcmVhdGVWaWRlb0NvbnRyb2woKTtcblx0XHRcdFx0dGhpcy52aWRlb0VsZW1lbnQgPSBlbGVtZW50O1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdGlmICggIWVsZW1lbnQgKSB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdHRoaXMuYmFyRWxlbWVudC5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXG5cdH0sXG5cblx0Y3JlYXRlTWFzazogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0ZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xuXHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRcdGVsZW1lbnQuc2hvdyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuXHRcdH07XG5cblx0XHRlbGVtZW50LmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRcdH07XG5cblx0XHRyZXR1cm4gZWxlbWVudDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgU2V0dGluZyBidXR0b24gdG8gdG9nZ2xlIG1lbnVcblx0ICovXG5cdGNyZWF0ZVNldHRpbmdCdXR0b246IGZ1bmN0aW9uICgpIHtcblxuXHRcdGxldCBzY29wZSA9IHRoaXMsIGl0ZW07XG5cblx0XHRmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHNjb3BlLm1haW5NZW51LnRvZ2dsZSgpO1xuXG5cdFx0XHRpZiAoIHRoaXMuYWN0aXZhdGVkICkge1xuXHRcblx0XHRcdFx0dGhpcy5kZWFjdGl2YXRlKCk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5hY3RpdmF0ZSgpO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpdGVtID0gdGhpcy5jcmVhdGVDdXN0b21JdGVtKCB7IFxuXG5cdFx0XHRzdHlsZSA6IHsgXG5cblx0XHRcdFx0YmFja2dyb3VuZEltYWdlIDogJ3VybChcIicgKyBEYXRhSW1hZ2UuU2V0dGluZyArICdcIiknLFxuXHRcdFx0XHR3ZWJraXRUcmFuc2l0aW9uIDogdGhpcy5ERUZBVUxUX1RSQU5TSVRJT04sXG5cdFx0XHRcdHRyYW5zaXRpb24gOiB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTlxuXG5cdFx0XHR9LFxuXG5cdFx0XHRvblRhcDogb25UYXBcblxuXHRcdH0gKTtcblxuXHRcdGl0ZW0uYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDAsMCwxLDkwZGVnKSc7XG5cdFx0XHR0aGlzLmFjdGl2YXRlZCA9IHRydWU7XG5cdFx0XHRzY29wZS5tYXNrLnNob3coKTtcblxuXHRcdH07XG5cblx0XHRpdGVtLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDAsMCwwLDApJztcblx0XHRcdHRoaXMuYWN0aXZhdGVkID0gZmFsc2U7XG5cdFx0XHRzY29wZS5tYXNrLmhpZGUoKTtcblxuXHRcdFx0aWYgKCBzY29wZS5tYWluTWVudSAmJiBzY29wZS5tYWluTWVudS52aXNpYmxlICkge1xuXG5cdFx0XHRcdHNjb3BlLm1haW5NZW51LmhpZGUoKTtcblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUuYWN0aXZlU3ViTWVudSAmJiBzY29wZS5hY3RpdmVTdWJNZW51LnZpc2libGUgKSB7XG5cblx0XHRcdFx0c2NvcGUuYWN0aXZlU3ViTWVudS5oaWRlKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5tYWluTWVudSAmJiBzY29wZS5tYWluTWVudS5fd2lkdGggKSB7XG5cblx0XHRcdFx0c2NvcGUubWFpbk1lbnUuY2hhbmdlU2l6ZSggc2NvcGUubWFpbk1lbnUuX3dpZHRoICk7XG5cdFx0XHRcdHNjb3BlLm1haW5NZW51LnVuc2xpZGVBbGwoKTtcblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fTtcblxuXHRcdGl0ZW0uYWN0aXZhdGVkID0gZmFsc2U7XG5cblx0XHRyZXR1cm4gaXRlbTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgRnVsbHNjcmVlbiBidXR0b25cblx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uIGZvciBmdWxsc2NyZWVuXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5XaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0ICovXG5cdGNyZWF0ZUZ1bGxzY3JlZW5CdXR0b246IGZ1bmN0aW9uICgpIHtcblxuXHRcdGxldCBzY29wZSA9IHRoaXMsIGl0ZW0sIGlzRnVsbHNjcmVlbiA9IGZhbHNlLCB0YXBTa2lwcGVkID0gdHJ1ZSwgc3R5bGVzaGVldElkO1xuXG5cdFx0c3R5bGVzaGVldElkID0gJ3Bhbm9sZW5zLXN0eWxlLWFkZG9uJztcblxuXHRcdC8vIERvbid0IGNyZWF0ZSBidXR0b24gaWYgbm8gc3VwcG9ydFxuXHRcdGlmICggIWRvY3VtZW50LmZ1bGxzY3JlZW5FbmFibGVkICAgICAgICYmIFxuXHRcdFx0IWRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbmFibGVkICYmXG5cdFx0XHQhZG9jdW1lbnQubW96RnVsbFNjcmVlbkVuYWJsZWQgICAgJiZcblx0XHRcdCFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbmFibGVkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uVGFwICggZXZlbnQgKSB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dGFwU2tpcHBlZCA9IGZhbHNlO1xuXG5cdFx0XHRpZiAoICFpc0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdHNjb3BlLmNvbnRhaW5lci5yZXF1ZXN0RnVsbHNjcmVlbiAmJiBzY29wZS5jb250YWluZXIucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0c2NvcGUuY29udGFpbmVyLm1zUmVxdWVzdEZ1bGxzY3JlZW4gJiYgc2NvcGUuY29udGFpbmVyLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0c2NvcGUuY29udGFpbmVyLm1velJlcXVlc3RGdWxsU2NyZWVuICYmIHNjb3BlLmNvbnRhaW5lci5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuXHRcdFx0XHRzY29wZS5jb250YWluZXIud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gJiYgc2NvcGUuY29udGFpbmVyLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKEVsZW1lbnQuQUxMT1dfS0VZQk9BUkRfSU5QVVQpO1xuXHRcdFx0XHRpc0Z1bGxzY3JlZW4gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4gJiYgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0ZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbiAmJiBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4gJiYgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdFx0XHRkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbiAmJiBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHRpc0Z1bGxzY3JlZW4gPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAoIGlzRnVsbHNjcmVlbiApIFxuXHRcdFx0XHQ/ICd1cmwoXCInICsgRGF0YUltYWdlLkZ1bGxzY3JlZW5MZWF2ZSArICdcIiknIFxuXHRcdFx0XHQ6ICd1cmwoXCInICsgRGF0YUltYWdlLkZ1bGxzY3JlZW5FbnRlciArICdcIiknO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25GdWxsU2NyZWVuQ2hhbmdlIChlKSB7XG5cblx0XHRcdGlmICggdGFwU2tpcHBlZCApIHtcblxuXHRcdFx0XHRpc0Z1bGxzY3JlZW4gPSAhaXNGdWxsc2NyZWVuOyBcblxuXHRcdFx0XHRpdGVtLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICggaXNGdWxsc2NyZWVuICkgXG5cdFx0XHRcdD8gJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkxlYXZlICsgJ1wiKScgXG5cdFx0XHRcdDogJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkVudGVyICsgJ1wiKSc7XG5cblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAnb25XaW5kb3dSZXNpemUnIGZ1bmN0aW9uIGNhbGwgb24gUEFOT0xFTlMuVmlld2VyXG5cdFx0XHQgKi9cblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnb25XaW5kb3dSZXNpemUnLCBkYXRhOiBmYWxzZSB9ICk7XG5cblx0XHRcdHRhcFNraXBwZWQgPSB0cnVlO1xuXG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ01TRnVsbHNjcmVlbkNoYW5nZScsIG9uRnVsbFNjcmVlbkNoYW5nZSwgZmFsc2UgKTtcblxuXHRcdGl0ZW0gPSB0aGlzLmNyZWF0ZUN1c3RvbUl0ZW0oIHsgXG5cblx0XHRcdHN0eWxlIDogeyBcblxuXHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2UgOiAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuRW50ZXIgKyAnXCIpJyBcblxuXHRcdFx0fSxcblxuXHRcdFx0b25UYXAgOiBvblRhcFxuXG5cdFx0fSApO1xuXG5cdFx0Ly8gQWRkIGZ1bGxzY3JlZW4gc3RseWUgaWYgbm90IGV4aXN0c1xuXHRcdGlmICggIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHN0eWxlc2hlZXRJZCApICkge1xuXHRcdFx0Y29uc3Qgc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3R5bGUnICk7XG5cdFx0XHRzaGVldC5pZCA9IHN0eWxlc2hlZXRJZDtcblx0XHRcdHNoZWV0LmlubmVySFRNTCA9ICc6LXdlYmtpdC1mdWxsLXNjcmVlbiB7IHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IGhlaWdodDogMTAwJSAhaW1wb3J0YW50IH0nO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggc2hlZXQgKTtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGl0ZW07XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIHZpZGVvIGNvbnRyb2wgY29udGFpbmVyXG5cdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH0gLSBUaGUgZG9tIGVsZW1lbnQgaWNvbiBmb3IgdmlkZW8gY29udHJvbFxuXHQgKi9cblx0Y3JlYXRlVmlkZW9Db250cm9sOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG5cdFx0aXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGl0ZW0uc2hvdyA9IGZ1bmN0aW9uICgpIHsgXG5cblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xuXG5cdFx0fTtcblxuXHRcdGl0ZW0uaGlkZSA9IGZ1bmN0aW9uICgpIHsgXG5cblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdGl0ZW0uY29udHJvbEJ1dHRvbi5wYXVzZWQgPSB0cnVlO1xuXHRcdFx0aXRlbS5jb250cm9sQnV0dG9uLnVwZGF0ZSgpO1xuXG5cdFx0fTtcblxuXHRcdGl0ZW0uY29udHJvbEJ1dHRvbiA9IHRoaXMuY3JlYXRlVmlkZW9Db250cm9sQnV0dG9uKCk7XG5cdFx0aXRlbS5zZWVrQmFyID0gdGhpcy5jcmVhdGVWaWRlb0NvbnRyb2xTZWVrYmFyKCk7XG5cdFx0XG5cdFx0aXRlbS5hcHBlbmRDaGlsZCggaXRlbS5jb250cm9sQnV0dG9uICk7XG5cdFx0aXRlbS5hcHBlbmRDaGlsZCggaXRlbS5zZWVrQmFyICk7XG5cblx0XHRpdGVtLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGl0ZW0ucmVtb3ZlQ2hpbGQoIGl0ZW0uY29udHJvbEJ1dHRvbiApO1xuXHRcdFx0aXRlbS5yZW1vdmVDaGlsZCggaXRlbS5zZWVrQmFyICk7XG5cblx0XHRcdGl0ZW0uY29udHJvbEJ1dHRvbi5kaXNwb3NlKCk7XG5cdFx0XHRpdGVtLmNvbnRyb2xCdXR0b24gPSBudWxsO1xuXG5cdFx0XHRpdGVtLnNlZWtCYXIuZGlzcG9zZSgpO1xuXHRcdFx0aXRlbS5zZWVrQmFyID0gbnVsbDtcblxuXHRcdH07XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd2aWRlby1jb250cm9sLXNob3cnLCBpdGVtLnNob3cgKTtcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd2aWRlby1jb250cm9sLWhpZGUnLCBpdGVtLmhpZGUgKTtcblxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSB2aWRlbyBjb250cm9sIGJ1dHRvblxuXHQgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb24gZm9yIHZpZGVvIGNvbnRyb2xcblx0ICogQGZpcmVzIFBBTk9MRU5TLldpZGdldCNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuXHQgKi9cblx0Y3JlYXRlVmlkZW9Db250cm9sQnV0dG9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBzY29wZSA9IHRoaXM7XG5cblx0XHRmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3RvZ2dsZVZpZGVvUGxheScgZnVuY3Rpb24gY2FsbCBvbiBQQU5PTEVOUy5WaWV3ZXJcblx0XHRcdCAqL1xuXHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd0b2dnbGVWaWRlb1BsYXknLCBkYXRhOiAhdGhpcy5wYXVzZWQgfSApO1xuXG5cdFx0XHR0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDtcblxuXHRcdFx0aXRlbS51cGRhdGUoKTtcblxuXHRcdH07XG5cblx0XHRjb25zdCBpdGVtID0gdGhpcy5jcmVhdGVDdXN0b21JdGVtKCB7IFxuXG5cdFx0XHRzdHlsZSA6IHsgXG5cblx0XHRcdFx0ZmxvYXQgOiAnbGVmdCcsXG5cdFx0XHRcdGJhY2tncm91bmRJbWFnZSA6ICd1cmwoXCInICsgRGF0YUltYWdlLlZpZGVvUGxheSArICdcIiknXG5cblx0XHRcdH0sXG5cblx0XHRcdG9uVGFwIDogb25UYXBcblxuXHRcdH0gKTtcblxuXHRcdGl0ZW0ucGF1c2VkID0gdHJ1ZTtcblxuXHRcdGl0ZW0udXBkYXRlID0gZnVuY3Rpb24gKCBwYXVzZWQgKSB7XG5cblx0XHRcdHRoaXMucGF1c2VkID0gcGF1c2VkICE9PSB1bmRlZmluZWQgPyBwYXVzZWQgOiB0aGlzLnBhdXNlZDtcblxuXHRcdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiJyArICggdGhpcy5wYXVzZWQgXG5cdFx0XHRcdD8gRGF0YUltYWdlLlZpZGVvUGxheSBcblx0XHRcdFx0OiBEYXRhSW1hZ2UuVmlkZW9QYXVzZSApICsgJ1wiKSc7XG5cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGl0ZW07XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIHZpZGVvIHNlZWtiYXJcblx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uIGZvciB2aWRlbyBzZWVrYmFyXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5XaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0ICovXG5cdGNyZWF0ZVZpZGVvQ29udHJvbFNlZWtiYXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGxldCBzY29wZSA9IHRoaXMsIGl0ZW0sIHByb2dyZXNzRWxlbWVudCwgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCxcblx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZSwgbW91c2VYLCBwZXJjZW50YWdlTm93LCBwZXJjZW50YWdlTmV4dDtcblxuXHRcdHByb2dyZXNzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0cHJvZ3Jlc3NFbGVtZW50LnN0eWxlLndpZHRoID0gJzAlJztcblx0XHRwcm9ncmVzc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuXHRcdHByb2dyZXNzRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmZsb2F0ID0gJ3JpZ2h0Jztcblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLndpZHRoID0gJzE0cHgnO1xuXHRcdHByb2dyZXNzRWxlbWVudENvbnRyb2wuc3R5bGUuaGVpZ2h0ID0gJzE0cHgnO1xuXHRcdHByb2dyZXNzRWxlbWVudENvbnRyb2wuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSg3cHgsIC01cHgpJztcblx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuXHRcdHByb2dyZXNzRWxlbWVudENvbnRyb2wuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnO1xuXG5cdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24sIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0cHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uTW91c2VEb3duLCAgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblxuXHRcdGZ1bmN0aW9uIG9uTW91c2VEb3duICggZXZlbnQgKSB7XG5cblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XG5cdFx0XHRpc0RyYWdnaW5nID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0bW91c2VYID0gZXZlbnQuY2xpZW50WCB8fCAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggKTtcblxuXHRcdFx0cGVyY2VudGFnZU5vdyA9IHBhcnNlSW50KCBwcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggKSAvIDEwMDtcblxuXHRcdFx0YWRkQ29udHJvbExpc3RlbmVycygpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uVmlkZW9Db250cm9sRHJhZyAoIGV2ZW50ICkge1xuXG5cdFx0XHRpZiggaXNEcmFnZ2luZyApe1xuXG5cdFx0XHRcdGNvbnN0IGNsaWVudFggPSBldmVudC5jbGllbnRYIHx8ICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCApO1xuXHRcdFx0XHRcblx0XHRcdFx0cGVyY2VudGFnZU5leHQgPSAoIGNsaWVudFggLSBtb3VzZVggKSAvIGl0ZW0uY2xpZW50V2lkdGg7XG5cblx0XHRcdFx0cGVyY2VudGFnZU5leHQgPSBwZXJjZW50YWdlTm93ICsgcGVyY2VudGFnZU5leHQ7XG5cblx0XHRcdFx0cGVyY2VudGFnZU5leHQgPSBwZXJjZW50YWdlTmV4dCA+IDEgPyAxIDogKCAoIHBlcmNlbnRhZ2VOZXh0IDwgMCApID8gMCA6IHBlcmNlbnRhZ2VOZXh0ICk7XG5cblx0XHRcdFx0aXRlbS5zZXRQcm9ncmVzcyAoIHBlcmNlbnRhZ2VOZXh0ICk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAnc2V0VmlkZW9DdXJyZW50VGltZScgZnVuY3Rpb24gY2FsbCBvbiBQQU5PTEVOUy5WaWV3ZXJcblx0XHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEgLSBQZXJjZW50YWdlIG9mIGN1cnJlbnQgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdzZXRWaWRlb0N1cnJlbnRUaW1lJywgZGF0YTogcGVyY2VudGFnZU5leHQgfSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblZpZGVvQ29udHJvbFN0b3AgKCBldmVudCApIHtcblxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuXHRcdFx0cmVtb3ZlQ29udHJvbExpc3RlbmVycygpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkQ29udHJvbExpc3RlbmVycyAoKSB7XG5cblx0XHRcdHNjb3BlLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25WaWRlb0NvbnRyb2xEcmFnLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdFx0c2NvcGUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25WaWRlb0NvbnRyb2xTdG9wLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdFx0c2NvcGUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblZpZGVvQ29udHJvbERyYWcsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0XHRzY29wZS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgb25WaWRlb0NvbnRyb2xTdG9wLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZW1vdmVDb250cm9sTGlzdGVuZXJzICgpIHtcblxuXHRcdFx0c2NvcGUuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvblZpZGVvQ29udHJvbERyYWcsIGZhbHNlICk7XG5cdFx0XHRzY29wZS5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvblZpZGVvQ29udHJvbFN0b3AsIGZhbHNlICk7XG5cdFx0XHRzY29wZS5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVmlkZW9Db250cm9sRHJhZywgZmFsc2UgKTtcblx0XHRcdHNjb3BlLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblZpZGVvQ29udHJvbFN0b3AsIGZhbHNlICk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmICggZXZlbnQudGFyZ2V0ID09PSBwcm9ncmVzc0VsZW1lbnRDb250cm9sICkgeyByZXR1cm47IH1cblxuXHRcdFx0Y29uc3QgcGVyY2VudGFnZSA9ICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID4gMCApXG5cdFx0XHRcdD8gKCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICkgLyB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRcdDogZXZlbnQub2Zmc2V0WCAvIHRoaXMuY2xpZW50V2lkdGg7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3NldFZpZGVvQ3VycmVudFRpbWUnIGZ1bmN0aW9uIGNhbGwgb24gUEFOT0xFTlMuVmlld2VyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gZGF0YSAtIFBlcmNlbnRhZ2Ugb2YgY3VycmVudCB2aWRlby4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG5cdFx0XHQgKi9cblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnc2V0VmlkZW9DdXJyZW50VGltZScsIGRhdGE6IHBlcmNlbnRhZ2UgfSApO1xuXG5cdFx0XHRpdGVtLnNldFByb2dyZXNzKCBldmVudC5vZmZzZXRYIC8gdGhpcy5jbGllbnRXaWR0aCApO1xuXG5cdFx0fTtcblxuXHRcdGZ1bmN0aW9uIG9uRGlzcG9zZSAoKSB7XG5cblx0XHRcdHJlbW92ZUNvbnRyb2xMaXN0ZW5lcnMoKTtcblx0XHRcdHByb2dyZXNzRWxlbWVudCA9IG51bGw7XG5cdFx0XHRwcm9ncmVzc0VsZW1lbnRDb250cm9sID0gbnVsbDtcblxuXHRcdH1cblxuXHRcdHByb2dyZXNzRWxlbWVudC5hcHBlbmRDaGlsZCggcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCApO1xuXG5cdFx0aXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSgge1xuXG5cdFx0XHRzdHlsZSA6IHsgXG5cblx0XHRcdFx0ZmxvYXQgOiAnbGVmdCcsXG5cdFx0XHRcdHdpZHRoIDogJzMwJScsXG5cdFx0XHRcdGhlaWdodCA6ICc0cHgnLFxuXHRcdFx0XHRtYXJnaW5Ub3AgOiAnMjBweCcsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvciA6ICdyZ2JhKDE4OCwxODgsMTg4LDAuOCknXG5cblx0XHRcdH0sXG5cblx0XHRcdG9uVGFwIDogb25UYXAsXG5cdFx0XHRvbkRpc3Bvc2U6IG9uRGlzcG9zZVxuXG5cdFx0fSApO1xuXG5cdFx0aXRlbS5hcHBlbmRDaGlsZCggcHJvZ3Jlc3NFbGVtZW50ICk7XG5cblx0XHRpdGVtLnNldFByb2dyZXNzID0gZnVuY3Rpb24oIHBlcmNlbnRhZ2UgKSB7XG5cblx0XHRcdHByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9IHBlcmNlbnRhZ2UgKiAxMDAgKyAnJSc7XG5cblx0XHR9O1x0XHRcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXVwZGF0ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7IFxuXG5cdFx0XHRpdGVtLnNldFByb2dyZXNzKCBldmVudC5wZXJjZW50YWdlICk7IFxuXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIGl0ZW07XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIG1lbnUgaXRlbVxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlIC0gVGl0bGUgdG8gZGlzcGxheVxuXHQgKiBAcmV0dXJuIHtIVE1MRG9tRWxlbWVudH0gLSBBbiBhbmNob3IgdGFnIGVsZW1lbnRcblx0ICovXG5cdGNyZWF0ZU1lbnVJdGVtOiBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzOyBcblx0XHRjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2EnICk7XG5cdFx0aXRlbS50ZXh0Q29udGVudCA9IHRpdGxlO1xuXHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0aXRlbS5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuXHRcdGl0ZW0uc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG5cdFx0aXRlbS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0aXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuXHRcdGl0ZW0uc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuREVGQVVMVF9UUkFOU0lUSU9OO1xuXG5cdFx0aXRlbS5zbGlkZSA9IGZ1bmN0aW9uICggcmlnaHQgKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArICggcmlnaHQgPyAnJyA6ICctJyApICsgJzEwMCUpJztcblxuXHRcdH07XG5cblx0XHRpdGVtLnVuc2xpZGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMCknO1xuXG5cdFx0fTtcblxuXHRcdGl0ZW0uc2V0SWNvbiA9IGZ1bmN0aW9uICggdXJsICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuaWNvbiApIHtcblxuXHRcdFx0XHR0aGlzLmljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgdXJsICsgJyknO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0aXRlbS5zZXRTZWxlY3Rpb25UaXRsZSA9IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cblx0XHRcdGlmICggdGhpcy5zZWxlY3Rpb24gKSB7XG5cblx0XHRcdFx0dGhpcy5zZWxlY3Rpb24udGV4dENvbnRlbnQgPSB0aXRsZTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdGl0ZW0uYWRkU2VsZWN0aW9uID0gZnVuY3Rpb24gKCBuYW1lICkge1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzZWxlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcblx0XHRcdHNlbGVjdGlvbi5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRcdHNlbGVjdGlvbi5zdHlsZS5mb250V2VpZ2h0ID0gJzMwMCc7XG5cdFx0XHRzZWxlY3Rpb24uc3R5bGUuZmxvYXQgPSAncmlnaHQnO1xuXG5cdFx0XHR0aGlzLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcblx0XHRcdHRoaXMuc2V0U2VsZWN0aW9uVGl0bGUoIG5hbWUgKTtcblx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoIHNlbGVjdGlvbiApO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0XHRpdGVtLmFkZEljb24gPSBmdW5jdGlvbiAoIHVybCA9IERhdGFJbWFnZS5DaGV2cm9uUmlnaHQsIGxlZnQgPSBmYWxzZSwgZmxpcCA9IGZhbHNlICkge1xuXHRcdFx0XG5cdFx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG5cdFx0XHRlbGVtZW50LnN0eWxlLmZsb2F0ID0gbGVmdCA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cdFx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gJzE3cHgnO1xuXHRcdFx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTdweCc7XG5cdFx0XHRlbGVtZW50LnN0eWxlWyAnbWFyZ2luJyArICggbGVmdCA/ICdSaWdodCcgOiAnTGVmdCcgKSBdID0gJzEycHgnO1xuXHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb3Zlcic7XG5cblx0XHRcdGlmICggZmxpcCApIHtcblxuXHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVaKDE4MGRlZyknO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaWNvbiA9IGVsZW1lbnQ7XG5cdFx0XHR0aGlzLnNldEljb24oIHVybCApO1xuXHRcdFx0dGhpcy5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0XHRpdGVtLmFkZFN1Yk1lbnUgPSBmdW5jdGlvbiAoIHRpdGxlLCBpdGVtcyApIHtcblxuXHRcdFx0dGhpcy5zdWJNZW51ID0gc2NvcGUuY3JlYXRlU3ViTWVudSggdGl0bGUsIGl0ZW1zICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNlMGUwZTAnO1xuXG5cdFx0fSwgZmFsc2UgKTtcblxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmYWZhZmEnO1xuXG5cdFx0fSwgZmFsc2UgKTtcblxuXHRcdHJldHVybiBpdGVtO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBtZW51IGl0ZW0gaGVhZGVyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gdGl0bGUgLSBUaXRsZSB0byBkaXNwbGF5XG5cdCAqIEByZXR1cm4ge0hUTUxEb21FbGVtZW50fSAtIEFuIGFuY2hvciB0YWcgZWxlbWVudFxuXHQgKi9cblx0Y3JlYXRlTWVudUl0ZW1IZWFkZXI6IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cblx0XHRjb25zdCBoZWFkZXIgPSB0aGlzLmNyZWF0ZU1lbnVJdGVtKCB0aXRsZSApO1xuXG5cdFx0aGVhZGVyLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxcHggc29saWQgIzMzMyc7XG5cdFx0aGVhZGVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAnMTVweCc7XG5cblx0XHRyZXR1cm4gaGVhZGVyO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBtYWluIG1lbnVcblx0ICogQHBhcmFtICB7YXJyYXl9IG1lbnVzIC0gTWVudSBhcnJheSBsaXN0XG5cdCAqIEByZXR1cm4ge0hUTUxEb21FbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG5cdCAqL1xuXHRjcmVhdGVNYWluTWVudTogZnVuY3Rpb24gKCBtZW51cyApIHtcblx0XHRcblx0XHRsZXQgc2NvcGUgPSB0aGlzLCBtZW51ID0gdGhpcy5jcmVhdGVNZW51KCk7XG5cblx0XHRtZW51Ll93aWR0aCA9IDIwMDtcblx0XHRtZW51LmNoYW5nZVNpemUoIG1lbnUuX3dpZHRoICk7XG5cblx0XHRmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGxldCBtYWluTWVudSA9IHNjb3BlLm1haW5NZW51LCBzdWJNZW51ID0gdGhpcy5zdWJNZW51O1xuXG5cdFx0XHRmdW5jdGlvbiBvbk5leHRUaWNrICgpIHtcblxuXHRcdFx0XHRtYWluTWVudS5jaGFuZ2VTaXplKCBzdWJNZW51LmNsaWVudFdpZHRoICk7XG5cdFx0XHRcdHN1Yk1lbnUuc2hvdygpO1xuXHRcdFx0XHRzdWJNZW51LnVuc2xpZGVBbGwoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRtYWluTWVudS5oaWRlKCk7XG5cdFx0XHRtYWluTWVudS5zbGlkZUFsbCgpO1xuXHRcdFx0bWFpbk1lbnUucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCggc3ViTWVudSApO1xuXG5cdFx0XHRzY29wZS5hY3RpdmVNYWluSXRlbSA9IHRoaXM7XG5cdFx0XHRzY29wZS5hY3RpdmVTdWJNZW51ID0gc3ViTWVudTtcblxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggb25OZXh0VGljayApO1xuXG5cdFx0fTtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IG1lbnVzLmxlbmd0aDsgaSsrICkge1xuXG5cdFx0XHR2YXIgaXRlbSA9IG1lbnUuYWRkSXRlbSggbWVudXNbIGkgXS50aXRsZSApO1xuXG5cdFx0XHRpdGVtLnN0eWxlLnBhZGRpbmdMZWZ0ID0gJzIwcHgnO1xuXG5cdFx0XHRpdGVtLmFkZEljb24oKVxuXHRcdFx0XHQuYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBvblRhcCwgZmFsc2UgKTtcblxuXHRcdFx0aWYgKCBtZW51c1sgaSBdLnN1Yk1lbnUgJiYgbWVudXNbIGkgXS5zdWJNZW51Lmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0dmFyIHRpdGxlID0gbWVudXNbIGkgXS5zdWJNZW51WyAwIF0udGl0bGU7XG5cblx0XHRcdFx0aXRlbS5hZGRTZWxlY3Rpb24oIHRpdGxlIClcblx0XHRcdFx0XHQuYWRkU3ViTWVudSggbWVudXNbIGkgXS50aXRsZSwgbWVudXNbIGkgXS5zdWJNZW51ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBtZW51O1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBzdWIgbWVudVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgLSBTdWIgbWVudSB0aXRsZVxuXHQgKiBAcGFyYW0ge2FycmF5fSBpdGVtcyAtIEl0ZW0gYXJyYXkgbGlzdFxuXHQgKiBAcmV0dXJuIHtIVE1MRG9tRWxlbWVudH0gLSBBIHNwYW4gZWxlbWVudFxuXHQgKi9cblx0Y3JlYXRlU3ViTWVudTogZnVuY3Rpb24gKCB0aXRsZSwgaXRlbXMgKSB7XG5cblx0XHRsZXQgc2NvcGUgPSB0aGlzLCBtZW51LCBzdWJNZW51ID0gdGhpcy5jcmVhdGVNZW51KCk7XG5cblx0XHRzdWJNZW51Lml0ZW1zID0gaXRlbXM7XG5cdFx0c3ViTWVudS5hY3RpdmVJdGVtO1xuXG5cdFx0ZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRtZW51ID0gc2NvcGUubWFpbk1lbnU7XG5cdFx0XHRtZW51LmNoYW5nZVNpemUoIG1lbnUuX3dpZHRoICk7XG5cdFx0XHRtZW51LnVuc2xpZGVBbGwoKTtcblx0XHRcdG1lbnUuc2hvdygpO1xuXHRcdFx0c3ViTWVudS5zbGlkZUFsbCggdHJ1ZSApO1xuXHRcdFx0c3ViTWVudS5oaWRlKCk7XG5cblx0XHRcdGlmICggdGhpcy50eXBlICE9PSAnaGVhZGVyJyApIHtcblxuXHRcdFx0XHRzdWJNZW51LnNldEFjdGl2ZUl0ZW0oIHRoaXMgKTtcblx0XHRcdFx0c2NvcGUuYWN0aXZlTWFpbkl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUoIHRoaXMudGV4dENvbnRlbnQgKTtcblxuXHRcdFx0XHR0aGlzLmhhbmRsZXIgJiYgdGhpcy5oYW5kbGVyKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHN1Yk1lbnUuYWRkSGVhZGVyKCB0aXRsZSApLmFkZEljb24oIHVuZGVmaW5lZCwgdHJ1ZSwgdHJ1ZSApLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb25UYXAsIGZhbHNlICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKyApIHtcblxuXHRcdFx0Y29uc3QgaXRlbSA9IHN1Yk1lbnUuYWRkSXRlbSggaXRlbXNbIGkgXS50aXRsZSApO1xuXG5cdFx0XHRpdGVtLnN0eWxlLmZvbnRXZWlnaHQgPSAzMDA7XG5cdFx0XHRpdGVtLmhhbmRsZXIgPSBpdGVtc1sgaSBdLmhhbmRsZXI7XG5cdFx0XHRpdGVtLmFkZEljb24oICcgJywgdHJ1ZSApO1xuXHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9uVGFwLCBmYWxzZSApO1xuXG5cdFx0XHRpZiAoICFzdWJNZW51LmFjdGl2ZUl0ZW0gKSB7XG5cblx0XHRcdFx0c3ViTWVudS5zZXRBY3RpdmVJdGVtKCBpdGVtICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHN1Yk1lbnUuc2xpZGVBbGwoIHRydWUgKTtcblxuXHRcdHJldHVybiBzdWJNZW51O1xuXHRcdFxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgZ2VuZXJhbCBtZW51XG5cdCAqIEByZXR1cm4ge0hUTUxEb21FbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG5cdCAqL1xuXHRjcmVhdGVNZW51OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBzY29wZSA9IHRoaXM7XG5cdFx0Y29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuXHRcdGNvbnN0IHN0eWxlID0gbWVudS5zdHlsZTtcblxuXHRcdHN0eWxlLnBhZGRpbmcgPSAnNXB4IDAnO1xuXHRcdHN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcblx0XHRzdHlsZS5ib3R0b20gPSAnMTAwJSc7XG5cdFx0c3R5bGUucmlnaHQgPSAnMTRweCc7XG5cdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmYWZhZmEnO1xuXHRcdHN0eWxlLmZvbnRGYW1pbHkgPSAnSGVsdmV0aWNhIE5ldWUnO1xuXHRcdHN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuXHRcdHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblx0XHRzdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRzdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDEycHQgcmdiYSgwLDAsMCwwLjI1KSc7XG5cdFx0c3R5bGUuYm9yZGVyUmFkaXVzID0gJzJweCc7XG5cdFx0c3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0XHRzdHlsZS53aWxsQ2hhbmdlID0gJ3dpZHRoLCBoZWlnaHQsIG9wYWNpdHknO1xuXHRcdHN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG5cdFx0c3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuREVGQVVMVF9UUkFOU0lUSU9OO1xuXG5cdFx0bWVudS52aXNpYmxlID0gZmFsc2U7XG5cblx0XHRtZW51LmNoYW5nZVNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRcdGlmICggd2lkdGggKSB7XG5cblx0XHRcdFx0dGhpcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhlaWdodCApIHtcblxuXHRcdFx0XHR0aGlzLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHRtZW51LnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0XHR0aGlzLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cdFx0XHR0aGlzLnZpc2libGUgPSB0cnVlO1xuXG5cdFx0fTtcblxuXHRcdG1lbnUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dGhpcy5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRcdHRoaXMuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXHRcdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cblx0XHR9O1xuXG5cdFx0bWVudS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmICggdGhpcy52aXNpYmxlICkge1xuXG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuc2hvdygpO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0bWVudS5zbGlkZUFsbCA9IGZ1bmN0aW9uICggcmlnaHQgKSB7XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IG1lbnUuY2hpbGRyZW4ubGVuZ3RoOyBpKysgKXtcblxuXHRcdFx0XHRpZiAoIG1lbnUuY2hpbGRyZW5bIGkgXS5zbGlkZSApIHtcblxuXHRcdFx0XHRcdG1lbnUuY2hpbGRyZW5bIGkgXS5zbGlkZSggcmlnaHQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHRtZW51LnVuc2xpZGVBbGwgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IG1lbnUuY2hpbGRyZW4ubGVuZ3RoOyBpKysgKXtcblxuXHRcdFx0XHRpZiAoIG1lbnUuY2hpbGRyZW5bIGkgXS51bnNsaWRlICkge1xuXG5cdFx0XHRcdFx0bWVudS5jaGlsZHJlblsgaSBdLnVuc2xpZGUoKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHRtZW51LmFkZEhlYWRlciA9IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cblx0XHRcdGNvbnN0IGhlYWRlciA9IHNjb3BlLmNyZWF0ZU1lbnVJdGVtSGVhZGVyKCB0aXRsZSApO1xuXHRcdFx0aGVhZGVyLnR5cGUgPSAnaGVhZGVyJztcblxuXHRcdFx0dGhpcy5hcHBlbmRDaGlsZCggaGVhZGVyICk7XG5cblx0XHRcdHJldHVybiBoZWFkZXI7XG5cblx0XHR9O1xuXG5cdFx0bWVudS5hZGRJdGVtID0gZnVuY3Rpb24gKCB0aXRsZSApIHtcblxuXHRcdFx0Y29uc3QgaXRlbSA9IHNjb3BlLmNyZWF0ZU1lbnVJdGVtKCB0aXRsZSApO1xuXHRcdFx0aXRlbS50eXBlID0gJ2l0ZW0nO1xuXG5cdFx0XHR0aGlzLmFwcGVuZENoaWxkKCBpdGVtICk7XG5cblx0XHRcdHJldHVybiBpdGVtO1xuXG5cdFx0fTtcblxuXHRcdG1lbnUuc2V0QWN0aXZlSXRlbSA9IGZ1bmN0aW9uICggaXRlbSApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmFjdGl2ZUl0ZW0gKSB7XG5cblx0XHRcdFx0dGhpcy5hY3RpdmVJdGVtLnNldEljb24oICcgJyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGl0ZW0uc2V0SWNvbiggRGF0YUltYWdlLkNoZWNrICk7XG5cblx0XHRcdHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XG5cblx0XHR9O1xuXG5cdFx0bWVudS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblx0XHRtZW51LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblx0XHRtZW51LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuXG5cdFx0cmV0dXJuIG1lbnU7XG5cblx0fSxcblxuXHQvKipcblx0ICogQ3JlYXRlIGN1c3RvbSBpdGVtIGVsZW1lbnRcblx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uXG5cdCAqL1xuXHRjcmVhdGVDdXN0b21JdGVtOiBmdW5jdGlvbiAoIG9wdGlvbnMgPSB7fSApIHtcblxuXHRcdGNvbnN0IHNjb3BlID0gdGhpcztcblx0XHRjb25zdCBpdGVtID0gb3B0aW9ucy5lbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuXG5cdFx0aXRlbS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0aXRlbS5zdHlsZS5mbG9hdCA9ICdyaWdodCc7XG5cdFx0aXRlbS5zdHlsZS53aWR0aCA9ICc0NHB4Jztcblx0XHRpdGVtLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblx0XHRpdGVtLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzYwJSc7XG5cdFx0aXRlbS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG5cdFx0aXRlbS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyJztcblx0XHRpdGVtLnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSBcblx0XHRpdGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBcblx0XHRpdGVtLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG5cdFx0aXRlbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cdFx0aXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuXG5cdFx0Ly8gV2hpdGUgZ2xvdyBvbiBpY29uXG5cdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGl0ZW0uc3R5bGUuZmlsdGVyID0gXG5cdFx0XHRpdGVtLnN0eWxlLndlYmtpdEZpbHRlciA9ICdkcm9wLXNoYWRvdygwIDAgNXB4IHJnYmEoMjU1LDI1NSwyNTUsMSkpJztcblx0XHR9LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpdGVtLnN0eWxlLmZpbHRlciA9IFxuXHRcdFx0aXRlbS5zdHlsZS53ZWJraXRGaWx0ZXIgPSAnJztcblx0XHR9LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cblx0XHR0aGlzLm1lcmdlU3R5bGVPcHRpb25zKCBpdGVtLCBvcHRpb25zLnN0eWxlICk7XG5cblx0XHRpZiAoIG9wdGlvbnMub25UYXAgKSB7XG5cblx0XHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBvcHRpb25zLm9uVGFwLCBmYWxzZSApO1xuXG5cdFx0fVxuXG5cdFx0aXRlbS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb3B0aW9ucy5vblRhcCwgZmFsc2UgKTtcblxuXHRcdFx0b3B0aW9ucy5vbkRpc3Bvc2UgJiYgb3B0aW9ucy5vbkRpc3Bvc2UoKTtcblxuXHRcdH07XG5cdFx0XG5cdFx0cmV0dXJuIGl0ZW07XG5cblx0fSxcblxuXHQvKipcblx0ICogTWVyZ2UgaXRlbSBjc3Mgc3R5bGVcblx0ICogQHBhcmFtICB7SFRNTERPTUVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBiZSBtZXJnZWQgd2l0aCBzdHlsZVxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgc3R5bGUgb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtIVE1MRE9NRWxlbWVudH0gLSBUaGUgc2FtZSBlbGVtZW50IHdpdGggbWVyZ2VkIHN0eWxlc1xuXHQgKi9cblx0bWVyZ2VTdHlsZU9wdGlvbnM6IGZ1bmN0aW9uICggZWxlbWVudCwgb3B0aW9ucyA9IHt9ICkge1xuXG5cdFx0Zm9yICggbGV0IHByb3BlcnR5IGluIG9wdGlvbnMgKXtcblxuXHRcdFx0aWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCBwcm9wZXJ0eSApICkge1xuXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGVbIHByb3BlcnR5IF0gPSBvcHRpb25zWyBwcm9wZXJ0eSBdO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gZWxlbWVudDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlIHdpZGdldHMgYnkgZGV0YWNoaW5nIGRvbSBlbGVtZW50cyBmcm9tIGNvbnRhaW5lclxuXHQgKi9cblx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB0aGlzLmJhckVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZCggdGhpcy5iYXJFbGVtZW50ICk7XG5cdFx0XHR0aGlzLmJhckVsZW1lbnQuZGlzcG9zZSgpO1xuXHRcdFx0dGhpcy5iYXJFbGVtZW50ID0gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cdFxufSApO1xuXG5leHBvcnQgeyBXaWRnZXQgfTsiLCJpbXBvcnQgeyBJbmZvc3BvdCB9IGZyb20gJy4uL2luZm9zcG90L0luZm9zcG90JztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5pbXBvcnQgJ3RocmVlJztcbmltcG9ydCBUV0VFTiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcyc7XG5cbi8qKlxuICogU2tlbGV0b24gcGFub3JhbWEgZGVyaXZlZCBmcm9tIFRIUkVFLk1lc2hcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtUSFJFRS5HZW9tZXRyeX0gZ2VvbWV0cnkgLSBUaGUgZ2VvbWV0cnkgZm9yIHRoaXMgcGFub3JhbWFcbiAqIEBwYXJhbSB7VEhSRUUuTWF0ZXJpYWx9IG1hdGVyaWFsIC0gVGhlIG1hdGVyaWFsIGZvciB0aGlzIHBhbm9yYW1hXG4gKi9cbmZ1bmN0aW9uIFBhbm9yYW1hICggZ2VvbWV0cnksIG1hdGVyaWFsICkge1xuXG5cdFRIUkVFLk1lc2guY2FsbCggdGhpcywgZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cblx0dGhpcy50eXBlID0gJ3Bhbm9yYW1hJztcblxuXHR0aGlzLkltYWdlUXVhbGl0eUxvdyA9IDE7XG5cdHRoaXMuSW1hZ2VRdWFsaXR5RmFpciA9IDI7XG5cdHRoaXMuSW1hZ2VRdWFsaXR5TWVkaXVtID0gMztcblx0dGhpcy5JbWFnZVF1YWxpdHlIaWdoID0gNDtcblx0dGhpcy5JbWFnZVF1YWxpdHlTdXBlckhpZ2ggPSA1O1xuXG5cdHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSAxMDAwO1xuXG5cdHRoaXMuZGVmYXVsdEluZm9zcG90U2l6ZSA9IDM1MDtcblxuXHR0aGlzLmNvbnRhaW5lciA9IHVuZGVmaW5lZDtcblxuXHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXG5cdHRoaXMubGlua2VkU3BvdHMgPSBbXTtcblxuXHR0aGlzLmlzSW5mb3Nwb3RWaXNpYmxlID0gZmFsc2U7XG5cdFxuXHR0aGlzLmxpbmtpbmdJbWFnZVVSTCA9IHVuZGVmaW5lZDtcblx0dGhpcy5saW5raW5nSW1hZ2VTY2FsZSA9IHVuZGVmaW5lZDtcblxuXHR0aGlzLm1hdGVyaWFsLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcblx0dGhpcy5tYXRlcmlhbC5vcGFjaXR5ID0gMDtcblxuXHR0aGlzLnNjYWxlLnggKj0gLTE7XG5cdHRoaXMucmVuZGVyT3JkZXIgPSAtMTtcblxuXHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG5cdHRoaXMuaW5mb3Nwb3RBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMgKS50bygge30sIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gLyAyICk7XG5cblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMuZmFkZUluLmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1jb250YWluZXInLCB0aGlzLnNldENvbnRhaW5lci5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLm9uQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0dGhpcy5zZXR1cFRyYW5zaXRpb25zKCk7XG5cbn1cblxuUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuTWVzaC5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBQYW5vcmFtYSxcblxuXHQvKipcblx0ICogQWRkaW5nIGFuIG9iamVjdFxuXHQgKiBUbyBjb3VudGVyIHRoZSBzY2FsZS54ID0gLTEsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGQgYW4gXG5cdCAqIGVtcHR5IG9iamVjdCB3aXRoIGludmVydGVkIHNjYWxlIG9uIHhcblx0ICogQHBhcmFtIHtUSFJFRS5PYmplY3QzRH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBhZGRlZFxuXHQgKi9cblx0YWRkOiBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuXHRcdGxldCBpbnZlcnRlZE9iamVjdDtcblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDEgKSB7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdFx0dGhpcy5hZGQoIGFyZ3VtZW50c1sgaSBdICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHQvLyBJbiBjYXNlIG9mIGluZm9zcG90c1xuXHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgSW5mb3Nwb3QgKSB7XG5cblx0XHRcdGludmVydGVkT2JqZWN0ID0gb2JqZWN0O1xuXG5cdFx0XHRpZiAoIG9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdHRoaXMuY29udGFpbmVyICYmIG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1jb250YWluZXInLCBjb250YWluZXI6IHRoaXMuY29udGFpbmVyIH0gKTtcblx0XHRcdFx0XG5cdFx0XHRcdG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1pbmZvc3BvdC1mb2N1cycsIG1ldGhvZDogZnVuY3Rpb24gKCB2ZWN0b3IsIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJbmZvc3BvdCBmb2N1cyBoYW5kbGVyIGV2ZW50XG5cdFx0XHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0XHRcdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gVmlld2VyIGZ1bmN0aW9uIG5hbWVcblx0XHRcdFx0XHQgKiBAcHJvcGVydHkgeyp9IGRhdGEgLSBUaGUgYXJndW1lbnQgdG8gYmUgcGFzc2VkIGludG8gdGhlIG1ldGhvZFxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlIDogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndHdlZW5Db250cm9sQ2VudGVyJywgZGF0YTogWyB2ZWN0b3IsIGR1cmF0aW9uLCBlYXNpbmcgXSB9ICk7XG5cblxuXHRcdFx0XHR9LmJpbmQoIHRoaXMgKSB9ICk7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb3VudGVyIHNjYWxlLnggPSAtMSBlZmZlY3Rcblx0XHRcdGludmVydGVkT2JqZWN0ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG5cdFx0XHRpbnZlcnRlZE9iamVjdC5zY2FsZS54ID0gLTE7XG5cdFx0XHRpbnZlcnRlZE9iamVjdC5zY2FsZVBsYWNlSG9sZGVyID0gdHJ1ZTtcblx0XHRcdGludmVydGVkT2JqZWN0LmFkZCggb2JqZWN0ICk7XG5cblx0XHR9XG5cblx0XHRUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUuYWRkLmNhbGwoIHRoaXMsIGludmVydGVkT2JqZWN0ICk7XG5cblx0fSxcblxuXHRsb2FkOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm9uTG9hZCgpO1xuXHRcdFxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDbGljayBldmVudCBoYW5kbGVyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgLSBDbGljayBldmVudFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuSW5mb3Nwb3QjZGlzbWlzc1xuXHQgKi9cblx0b25DbGljazogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGlmICggZXZlbnQuaW50ZXJzZWN0cyAmJiBldmVudC5pbnRlcnNlY3RzLmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdFx0dGhpcy50cmF2ZXJzZSggZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIERpbWlzcyBldmVudFxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuSW5mb3Nwb3QjZGlzbWlzc1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0b2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc21pc3MnIH0gKTtcblxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBjb250YWluZXIgb2YgdGhpcyBwYW5vcmFtYSBcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxvYmplY3R9IGRhdGEgLSBEYXRhIHdpdGggY29udGFpbmVyIGluZm9ybWF0aW9uXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5JbmZvc3BvdCNwYW5vbGVucy1jb250YWluZXJcblx0ICovXG5cdHNldENvbnRhaW5lcjogZnVuY3Rpb24gKCBkYXRhICkge1xuXG5cdFx0bGV0IGNvbnRhaW5lcjtcblxuXHRcdGlmICggZGF0YSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICkge1xuXG5cdFx0XHRjb250YWluZXIgPSBkYXRhO1xuXG5cdFx0fSBlbHNlIGlmICggZGF0YSAmJiBkYXRhLmNvbnRhaW5lciApIHtcblxuXHRcdFx0Y29udGFpbmVyID0gZGF0YS5jb250YWluZXI7XG5cblx0XHR9XG5cblx0XHRpZiAoIGNvbnRhaW5lciApIHtcblxuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCBmdW5jdGlvbiAoIGNoaWxkICkge1xuXG5cdFx0XHRcdGlmICggY2hpbGQgaW5zdGFuY2VvZiBJbmZvc3BvdCAmJiBjaGlsZC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogU2V0IGNvbnRhaW5lciBldmVudFxuXHRcdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLkluZm9zcG90I3Bhbm9sZW5zLWNvbnRhaW5lclxuXHRcdFx0XHRcdCAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIFRoZSBjb250YWluZXIgb2YgdGhpcyBwYW5vcmFtYVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGNoaWxkLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIGNvbnRhaW5lcjogY29udGFpbmVyIH0gKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gKTtcblxuXHRcdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHBhbm9yYW1hIGlzIGxvYWRlZFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuUGFub3JhbWEjbG9hZFxuXHQgKi9cblx0b25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmxvYWRlZCA9IHRydWU7XG5cblx0XHQvKipcblx0XHQgKiBMb2FkIHBhbm9yYW1hIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjbG9hZFxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnbG9hZCcgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBwYW5vcmFtYSBpcyBpbiBwcm9ncmVzc1xuXHQgKiBAZmlyZXMgUEFOT0xFTlMuUGFub3JhbWEjcHJvZ3Jlc3Ncblx0ICovXG5cdG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uICggcHJvZ3Jlc3MgKSB7XG5cblx0XHQvKipcblx0XHQgKiBMb2FkaW5nIHBhbm9yYW1hIHByb2dyZXNzIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjcHJvZ3Jlc3Ncblx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gcHJvZ3Jlc3MgLSBUaGUgcHJvZ3Jlc3Mgb2JqZWN0IGNvbnRhaW5pbmcgbG9hZGVkIGFuZCB0b3RhbCBhbW91bnRcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Byb2dyZXNzJywgcHJvZ3Jlc3M6IHByb2dyZXNzIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gcGFub3JhbWEgbG9hZGluZyBoYXMgZXJyb3Jcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2Vycm9yXG5cdCAqL1xuXHRvbkVycm9yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKipcblx0XHQgKiBMb2FkaW5nIHBhbm9yYW1hIGVycm9yIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjZXJyb3Jcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Vycm9yJyB9ICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IHpvb20gbGV2ZWwgYmFzZWQgb24gd2luZG93IHdpZHRoXG5cdCAqIEByZXR1cm4ge251bWJlcn0gem9vbSBsZXZlbCBpbmRpY2F0aW5nIGltYWdlIHF1YWxpdHlcblx0ICovXG5cdGdldFpvb21MZXZlbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0bGV0IHpvb21MZXZlbDtcblxuXHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPD0gODAwICkge1xuXG5cdFx0XHR6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eUZhaXI7XG5cblx0XHR9IGVsc2UgaWYgKCB3aW5kb3cuaW5uZXJXaWR0aCA+IDgwMCAmJiAgd2luZG93LmlubmVyV2lkdGggPD0gMTI4MCApIHtcblxuXHRcdFx0em9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlNZWRpdW07XG5cblx0XHR9IGVsc2UgaWYgKCB3aW5kb3cuaW5uZXJXaWR0aCA+IDEyODAgJiYgd2luZG93LmlubmVyV2lkdGggPD0gMTkyMCApIHtcblxuXHRcdFx0em9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlIaWdoO1xuXG5cdFx0fSBlbHNlIGlmICggd2luZG93LmlubmVyV2lkdGggPiAxOTIwICkge1xuXG5cdFx0XHR6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eVN1cGVySGlnaDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHpvb21MZXZlbCA9IHRoaXMuSW1hZ2VRdWFsaXR5TG93O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHpvb21MZXZlbDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGV4dHVyZSBvZiBhIHBhbm9yYW1hXG5cdCAqIEBwYXJhbSB7VEhSRUUuVGV4dHVyZX0gdGV4dHVyZSAtIFRleHR1cmUgdG8gYmUgdXBkYXRlZFxuXHQgKi9cblx0dXBkYXRlVGV4dHVyZTogZnVuY3Rpb24gKCB0ZXh0dXJlICkge1xuXG5cdFx0dGhpcy5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuXHRcdHRoaXMubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSB2aXNpYmlsaXR5IG9mIGluZm9zcG90cyBpbiB0aGlzIHBhbm9yYW1hXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGlzVmlzaWJsZSAtIFZpc2liaWxpdHkgb2YgaW5mb3Nwb3RzXG5cdCAqIEBwYXJhbSAge251bWJlcn0gZGVsYXkgLSBEZWxheSBpbiBtaWxsaXNlY29uZHMgdG8gY2hhbmdlIHZpc2liaWxpdHlcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2luZm9zcG90LWFuaW1hdGlvbi1jb21wbGV0ZVxuXHQgKi9cblx0dG9nZ2xlSW5mb3Nwb3RWaXNpYmlsaXR5OiBmdW5jdGlvbiAoIGlzVmlzaWJsZSwgZGVsYXkgKSB7XG5cblx0XHRkZWxheSA9ICggZGVsYXkgIT09IHVuZGVmaW5lZCApID8gZGVsYXkgOiAwO1xuXG5cdFx0Y29uc3QgdmlzaWJsZSA9ICggaXNWaXNpYmxlICE9PSB1bmRlZmluZWQgKSA/IGlzVmlzaWJsZSA6ICggdGhpcy5pc0luZm9zcG90VmlzaWJsZSA/IGZhbHNlIDogdHJ1ZSApO1xuXG5cdFx0dGhpcy50cmF2ZXJzZSggZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgSW5mb3Nwb3QgKSB7XG5cblx0XHRcdFx0dmlzaWJsZSA/IG9iamVjdC5zaG93KCBkZWxheSApIDogb2JqZWN0LmhpZGUoIGRlbGF5ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHRcdHRoaXMuaXNJbmZvc3BvdFZpc2libGUgPSB2aXNpYmxlO1xuXG5cdFx0Ly8gQW5pbWF0aW9uIGNvbXBsZXRlIGV2ZW50XG5cdFx0dGhpcy5pbmZvc3BvdEFuaW1hdGlvbi5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ29tcGxldGUgdG9nZ2xpbmcgaW5mb3Nwb3QgdmlzaWJpbGl0eVxuXHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2luZm9zcG90LWFuaW1hdGlvbi1jb21wbGV0ZVxuXHRcdFx0ICogQHR5cGUge29iamVjdH0gXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlIDogJ2luZm9zcG90LWFuaW1hdGlvbi1jb21wbGV0ZScsIHZpc2libGU6IHZpc2libGUgfSApO1xuXG5cdFx0fS5iaW5kKCB0aGlzICkgKS5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBpbWFnZSBvZiB0aGlzIHBhbm9yYW1hJ3MgbGlua2luZyBpbmZvc3BvdFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdXJsICAgLSBVcmwgdG8gdGhlIGltYWdlIGFzc2V0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZSAtIFNjYWxlIGZhY3RvciBvZiB0aGUgaW5mb3Nwb3Rcblx0ICovXG5cdHNldExpbmtpbmdJbWFnZTogZnVuY3Rpb24gKCB1cmwsIHNjYWxlICkge1xuXG5cdFx0dGhpcy5saW5raW5nSW1hZ2VVUkwgPSB1cmw7XG5cdFx0dGhpcy5saW5raW5nSW1hZ2VTY2FsZSA9IHNjYWxlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIExpbmsgb25lLXdheSBwYW5vcmFtYVxuXHQgKiBAcGFyYW0gIHtQQU5PTEVOUy5QYW5vcmFtYX0gcGFubyAgLSBUaGUgcGFub3JhbWEgdG8gYmUgbGlua2VkIHRvXG5cdCAqIEBwYXJhbSAge1RIUkVFLlZlY3RvcjN9IHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIGluZm9zcG90IHdoaWNoIG5hdmlnYXRlcyB0byB0aGUgcGFub1xuXHQgKiBAcGFyYW0gIHtudW1iZXJ9IFtpbWFnZVNjYWxlPTMwMF0gLSBJbWFnZSBzY2FsZSBvZiBsaW5rZWQgaW5mb3Nwb3Rcblx0ICogQHBhcmFtICB7c3RyaW5nfSBbaW1hZ2VTcmM9UEFOT0xFTlMuRGF0YUltYWdlLkFycm93XSAtIFRoZSBpbWFnZSBzb3VyY2Ugb2YgbGlua2VkIGluZm9zcG90XG5cdCAqL1xuXHRsaW5rOiBmdW5jdGlvbiAoIHBhbm8sIHBvc2l0aW9uLCBpbWFnZVNjYWxlLCBpbWFnZVNyYyApIHtcblxuXHRcdGxldCBzY2FsZSwgaW1nO1xuXG5cdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIXBvc2l0aW9uICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdQbGVhc2Ugc3BlY2lmeSBpbmZvc3BvdCBwb3NpdGlvbiBmb3IgbGlua2luZycgKTtcblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0Ly8gSW5mb3Nwb3Qgc2NhbGVcblx0XHRpZiAoIGltYWdlU2NhbGUgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0c2NhbGUgPSBpbWFnZVNjYWxlO1xuXG5cdFx0fSBlbHNlIGlmICggcGFuby5saW5raW5nSW1hZ2VTY2FsZSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRzY2FsZSA9IHBhbm8ubGlua2luZ0ltYWdlU2NhbGU7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRzY2FsZSA9IDMwMDtcblxuXHRcdH1cblxuXG5cdFx0Ly8gSW5mb3Nwb3QgaW1hZ2Vcblx0XHRpZiAoIGltYWdlU3JjICkge1xuXG5cdFx0XHRpbWcgPSBpbWFnZVNyY1xuXG5cdFx0fSBlbHNlIGlmICggcGFuby5saW5raW5nSW1hZ2VVUkwgKSB7XG5cblx0XHRcdGltZyA9IHBhbm8ubGlua2luZ0ltYWdlVVJMO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aW1nID0gRGF0YUltYWdlLkFycm93O1xuXG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlcyBhIG5ldyBpbmZvc3BvdFxuXHRcdGNvbnN0IHNwb3QgPSBuZXcgSW5mb3Nwb3QoIHNjYWxlLCBpbWcgKTtcblx0XHRzcG90LnBvc2l0aW9uLmNvcHkoIHBvc2l0aW9uICk7XG5cdFx0c3BvdC50b1Bhbm9yYW1hID0gcGFubztcblx0XHRzcG90LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtIFZpZXdlciBmdW5jdGlvbiBuYW1lXG5cdFx0XHQgKiBAcHJvcGVydHkgeyp9IGRhdGEgLSBUaGUgYXJndW1lbnQgdG8gYmUgcGFzc2VkIGludG8gdGhlIG1ldGhvZFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZSA6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3NldFBhbm9yYW1hJywgZGF0YTogcGFubyB9ICk7XG5cblx0XHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0dGhpcy5saW5rZWRTcG90cy5wdXNoKCBzcG90ICk7XG5cblx0XHR0aGlzLmFkZCggc3BvdCApO1xuXG5cdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cblx0fSxcblxuXHRyZXNldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1x0XG5cblx0fSxcblxuXHRzZXR1cFRyYW5zaXRpb25zOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmZhZGVJbkFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG5cdFx0XHQuZWFzaW5nKCBUV0VFTi5FYXNpbmcuUXVhcnRpYy5PdXQgKVxuXHRcdFx0Lm9uU3RhcnQoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnZpc2libGUgPSB0cnVlO1xuXHRcdFx0XHQvL3RoaXMubWF0ZXJpYWwudmlzaWJsZSA9IHRydWU7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIEVudGVyIHBhbm9yYW1hIGZhZGUgaW4gc3RhcnQgZXZlbnRcblx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2VudGVyLWZhZGUtc3RhcnRcblx0XHRcdFx0ICogQHR5cGUge29iamVjdH0gXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyLWZhZGUtc3RhcnQnIH0gKTtcblxuXHRcdFx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHRoaXMuZmFkZU91dEFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG5cdFx0XHQuZWFzaW5nKCBUV0VFTi5FYXNpbmcuUXVhcnRpYy5PdXQgKVxuXHRcdFx0Lm9uQ29tcGxldGUoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnZpc2libGUgPSBmYWxzZTtcblx0XHRcdFx0Ly90aGlzLm1hdGVyaWFsLnZpc2libGUgPSB0cnVlO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBMZWF2ZSBwYW5vcmFtYSBjb21wbGV0ZSBldmVudFxuXHRcdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjbGVhdmUtY29tcGxldGVcblx0XHRcdFx0ICogQHR5cGUge29iamVjdH0gXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlLWNvbXBsZXRlJyB9ICk7XG5cblx0XHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0XHR0aGlzLmVudGVyVHJhbnNpdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcyApXG5cdFx0XHQuZWFzaW5nKCBUV0VFTi5FYXNpbmcuUXVhcnRpYy5PdXQgKVxuXHRcdFx0Lm9uQ29tcGxldGUoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogRW50ZXIgcGFub3JhbWEgYW5kIGFuaW1hdGlvbiBjb21wbGV0ZSBldmVudFxuXHRcdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuUGFub3JhbWEjZW50ZXItYW5pbWF0aW9uLWNvbXBsZXRlXG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1hbmltYXRpb24tY29tcGxldGUnIH0gKTtcblxuXHRcdFx0fS5iaW5kICggdGhpcyApIClcblx0XHRcdC5zdGFydCgpO1xuXG5cdFx0dGhpcy5sZWF2ZVRyYW5zaXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMgKVxuXHRcdFx0LmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0ICk7XG5cblx0fSxcblxuXHRvbkZhZGVBbmltYXRpb25VcGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IGFscGhhID0gdGhpcy5tYXRlcmlhbC5vcGFjaXR5O1xuXHRcdGNvbnN0IHsgdW5pZm9ybXMgfSA9IHRoaXMubWF0ZXJpYWw7XG5cblx0XHRpZiAoIHVuaWZvcm1zICYmIHVuaWZvcm1zLm9wYWNpdHkgKSB7XG5cdFx0XHR1bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0gYWxwaGE7XG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFN0YXJ0IGZhZGluZyBpbiBhbmltYXRpb25cblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2VudGVyLWZhZGUtY29tcGxldGVcblx0ICovXG5cdGZhZGVJbjogZnVuY3Rpb24gKCBkdXJhdGlvbiApIHtcblxuXHRcdGR1cmF0aW9uID0gZHVyYXRpb24gPj0gMCA/IGR1cmF0aW9uIDogdGhpcy5hbmltYXRpb25EdXJhdGlvbjtcblxuXHRcdHRoaXMuZmFkZU91dEFuaW1hdGlvbi5zdG9wKCk7XG5cdFx0dGhpcy5mYWRlSW5BbmltYXRpb25cblx0XHQudG8oIHsgb3BhY2l0eTogMSB9LCBkdXJhdGlvbiApXG5cdFx0Lm9uVXBkYXRlKCB0aGlzLm9uRmFkZUFuaW1hdGlvblVwZGF0ZS5iaW5kKCB0aGlzICkgKVxuXHRcdC5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy50b2dnbGVJbmZvc3BvdFZpc2liaWxpdHkoIHRydWUsIGR1cmF0aW9uIC8gMiApO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBFbnRlciBwYW5vcmFtYSBmYWRlIGNvbXBsZXRlIGV2ZW50XG5cdFx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNlbnRlci1mYWRlLWNvbXBsZXRlXG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1mYWRlLWNvbXBsZXRlJyB9ICk7XHRcdFx0XG5cblx0XHRcdH0uYmluZCggdGhpcyApIClcblx0XHQuc3RhcnQoKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTdGFydCBmYWRpbmcgb3V0IGFuaW1hdGlvblxuXHQgKi9cblx0ZmFkZU91dDogZnVuY3Rpb24gKCBkdXJhdGlvbiApIHtcblxuXHRcdGR1cmF0aW9uID0gZHVyYXRpb24gPj0gMCA/IGR1cmF0aW9uIDogdGhpcy5hbmltYXRpb25EdXJhdGlvbjtcblxuXHRcdHRoaXMuZmFkZUluQW5pbWF0aW9uLnN0b3AoKTtcblx0XHR0aGlzLmZhZGVPdXRBbmltYXRpb25cblx0XHQudG8oIHsgb3BhY2l0eTogMCB9LCBkdXJhdGlvbiApXG5cdFx0Lm9uVXBkYXRlKCB0aGlzLm9uRmFkZUFuaW1hdGlvblVwZGF0ZS5iaW5kKCB0aGlzICkgKVxuXHRcdC5zdGFydCgpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBlbnRlcmluZyBhIHBhbm9yYW1hIFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuUGFub3JhbWEjZW50ZXJcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2VudGVyLWFuaW1hdGlvbi1zdGFydFxuXHQgKi9cblx0b25FbnRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgZHVyYXRpb24gPSB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uO1xuXG5cdFx0dGhpcy5sZWF2ZVRyYW5zaXRpb24uc3RvcCgpO1xuXHRcdHRoaXMuZW50ZXJUcmFuc2l0aW9uXG5cdFx0XHQudG8oIHt9LCBkdXJhdGlvbiApXG5cdFx0XHQub25TdGFydCggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBFbnRlciBwYW5vcmFtYSBhbmQgYW5pbWF0aW9uIHN0YXJ0aW5nIGV2ZW50XG5cdFx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNlbnRlci1hbmltYXRpb24tc3RhcnRcblx0XHRcdFx0ICogQHR5cGUge29iamVjdH0gXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyLWFuaW1hdGlvbi1zdGFydCcgfSApO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCB0aGlzLmxvYWRlZCApIHtcblxuXHRcdFx0XHRcdHRoaXMuZmFkZUluKCBkdXJhdGlvbiApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR0aGlzLmxvYWQoKTtcblxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fS5iaW5kKCB0aGlzICkgKVxuXHRcdFx0LnN0YXJ0KCk7XG5cblx0XHQvKipcblx0XHQgKiBFbnRlciBwYW5vcmFtYSBldmVudFxuXHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNlbnRlclxuXHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZW50ZXInIH0gKTtcblxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggY2hpbGQgPT4ge1xuXG5cdFx0XHRjaGlsZC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vcmFtYS1lbnRlcicgfSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBsZWF2aW5nIGEgcGFub3JhbWFcblx0ICogQGZpcmVzIFBBTk9MRU5TLlBhbm9yYW1hI2xlYXZlXG5cdCAqL1xuXHRvbkxlYXZlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBkdXJhdGlvbiA9IHRoaXMuYW5pbWF0aW9uRHVyYXRpb247XG5cblx0XHR0aGlzLmVudGVyVHJhbnNpdGlvbi5zdG9wKCk7XG5cdFx0dGhpcy5sZWF2ZVRyYW5zaXRpb25cblx0XHRcdC50bygge30sIGR1cmF0aW9uIClcblx0XHRcdC5vblN0YXJ0KCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIExlYXZlIHBhbm9yYW1hIGFuZCBhbmltYXRpb24gc3RhcnRpbmcgZXZlbnRcblx0XHRcdFx0ICogQGV2ZW50IFBBTk9MRU5TLlBhbm9yYW1hI2xlYXZlLWFuaW1hdGlvbi1zdGFydFxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fSBcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnbGVhdmUtYW5pbWF0aW9uLXN0YXJ0JyB9ICk7XG5cblx0XHRcdFx0dGhpcy5mYWRlT3V0KCBkdXJhdGlvbiApO1xuXHRcdFx0XHR0aGlzLnRvZ2dsZUluZm9zcG90VmlzaWJpbGl0eSggZmFsc2UgKTtcblxuXHRcdFx0fS5iaW5kKCB0aGlzICkgKVxuXHRcdFx0LnN0YXJ0KCk7XG5cblx0XHQvKipcblx0XHQgKiBMZWF2ZSBwYW5vcmFtYSBldmVudFxuXHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNsZWF2ZVxuXHRcdCAqIEB0eXBlIHtvYmplY3R9IFxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnbGVhdmUnIH0gKTtcblxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggY2hpbGQgPT4ge1xuXG5cdFx0XHRjaGlsZC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vcmFtYS1sZWF2ZScgfSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlIHBhbm9yYW1hXG5cdCAqL1xuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKipcblx0XHQgKiBPbiBwYW5vcmFtYSBkaXNwb3NlIGhhbmRsZXJcblx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdCAqIEBldmVudCBQQU5PTEVOUy5QYW5vcmFtYSNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSBWaWV3ZXIgZnVuY3Rpb24gbmFtZVxuXHRcdCAqIEBwcm9wZXJ0eSB7Kn0gZGF0YSAtIFRoZSBhcmd1bWVudCB0byBiZSBwYXNzZWQgaW50byB0aGUgbWV0aG9kXG5cdFx0ICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGUgOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblBhbm9yYW1hRGlzcG9zZScsIGRhdGE6IHRoaXMgfSApO1xuXG5cdFx0Ly8gcmVjdXJzaXZlIGRpc3Bvc2FsIG9uIDNkIG9iamVjdHNcblx0XHRmdW5jdGlvbiByZWN1cnNpdmVEaXNwb3NlICggb2JqZWN0ICkge1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSApIHtcblxuXHRcdFx0XHRyZWN1cnNpdmVEaXNwb3NlKCBvYmplY3QuY2hpbGRyZW5baV0gKTtcblx0XHRcdFx0b2JqZWN0LnJlbW92ZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuXHRcdFx0XHRvYmplY3QuZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdG9iamVjdC5nZW9tZXRyeSAmJiBvYmplY3QuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuXHRcdFx0b2JqZWN0Lm1hdGVyaWFsICYmIG9iamVjdC5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cdFx0fVxuXG5cdFx0cmVjdXJzaXZlRGlzcG9zZSggdGhpcyApO1xuXG5cdFx0aWYgKCB0aGlzLnBhcmVudCApIHtcblxuXHRcdFx0dGhpcy5wYXJlbnQucmVtb3ZlKCB0aGlzICk7XG5cblx0XHR9XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IFBhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCB7IFRleHR1cmVMb2FkZXIgfSBmcm9tICcuLi9sb2FkZXJzL1RleHR1cmVMb2FkZXInO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogRXF1aXJlY3Rhbmd1bGFyIGJhc2VkIGltYWdlIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIEltYWdlIHVybCBvciBIVE1MSW1hZ2VFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIEltYWdlUGFub3JhbWEgKCBpbWFnZSwgX2dlb21ldHJ5LCBfbWF0ZXJpYWwgKSB7XG5cblx0Y29uc3QgcmFkaXVzID0gNTAwMDtcblx0Y29uc3QgZ2VvbWV0cnkgPSBfZ2VvbWV0cnkgfHwgbmV3IFRIUkVFLlNwaGVyZUJ1ZmZlckdlb21ldHJ5KCByYWRpdXMsIDYwLCA0MCApO1xuXHRjb25zdCBtYXRlcmlhbCA9IF9tYXRlcmlhbCB8fCBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgb3BhY2l0eTogMCwgdHJhbnNwYXJlbnQ6IHRydWUgfSApO1xuXG5cdFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG5cdHRoaXMuc3JjID0gaW1hZ2U7XG5cdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXG59XG5cbkltYWdlUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuXHRjb25zdHJ1Y3RvcjogSW1hZ2VQYW5vcmFtYSxcblxuXHQvKipcblx0ICogTG9hZCBpbWFnZSBhc3NldFxuXHQgKiBAcGFyYW0gIHsqfSBzcmMgLSBVcmwgb3IgaW1hZ2UgZWxlbWVudFxuXHQgKi9cblx0bG9hZDogZnVuY3Rpb24gKCBzcmMgKSB7XG5cblx0XHRzcmMgPSBzcmMgfHwgdGhpcy5zcmM7XG5cblx0XHRpZiAoICFzcmMgKSB7IFxuXG5cdFx0XHRjb25zb2xlLndhcm4oICdJbWFnZSBzb3VyY2UgdW5kZWZpbmVkJyApO1xuXG5cdFx0XHRyZXR1cm47IFxuXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHNyYyA9PT0gJ3N0cmluZycgKSB7XG5cblx0XHRcdFRleHR1cmVMb2FkZXIubG9hZCggc3JjLCB0aGlzLm9uTG9hZC5iaW5kKCB0aGlzICksIHRoaXMub25Qcm9ncmVzcy5iaW5kKCB0aGlzICksIHRoaXMub25FcnJvci5iaW5kKCB0aGlzICkgKTtcblxuXHRcdH0gZWxzZSBpZiAoIHNyYyBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMub25Mb2FkKCBuZXcgVEhSRUUuVGV4dHVyZSggc3JjICkgKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gaW1hZ2UgaXMgbG9hZGVkXG5cdCAqIEBwYXJhbSAge1RIUkVFLlRleHR1cmV9IHRleHR1cmUgLSBUZXh0dXJlIHRvIGJlIHVwZGF0ZWRcblx0ICovXG5cdG9uTG9hZDogZnVuY3Rpb24gKCB0ZXh0dXJlICkge1xuXG5cdFx0dGV4dHVyZS5taW5GaWx0ZXIgPSB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcblx0XHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblx0XHRcblx0XHR0aGlzLnVwZGF0ZVRleHR1cmUoIHRleHR1cmUgKTtcblxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggUGFub3JhbWEucHJvdG90eXBlLm9uTG9hZC5iaW5kKCB0aGlzICkgKTtcblxuXHR9LFxuXG5cdHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRQYW5vcmFtYS5wcm90b3R5cGUucmVzZXQuY2FsbCggdGhpcyApO1xuXG5cdH0sXG5cblx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gUmVsZWFzZSBjYWNoZWQgaW1hZ2Vcblx0XHRUSFJFRS5DYWNoZS5yZW1vdmUoIHRoaXMuc3JjICk7XG5cblx0XHR0aGlzLm1hdGVyaWFsLm1hcCAmJiB0aGlzLm1hdGVyaWFsLm1hcC5kaXNwb3NlKCk7XG5cblx0XHRQYW5vcmFtYS5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKCB0aGlzICk7XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IEltYWdlUGFub3JhbWEgfTsiLCJpbXBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4vUGFub3JhbWEnO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogRW1wdHkgcGFub3JhbWFcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBFbXB0eVBhbm9yYW1hICgpIHtcblxuXHRjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXHRjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBjb2xvcjogMHgwMDAwMDAsIG9wYWNpdHk6IDAsIHRyYW5zcGFyZW50OiB0cnVlIH0gKTtcblxuXHRnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIG5ldyBGbG9hdDMyQXJyYXkoKSwgMSApICk7XG5cblx0UGFub3JhbWEuY2FsbCggdGhpcywgZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cbn1cblxuRW1wdHlQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBFbXB0eVBhbm9yYW1hXG5cbn0gKTtcblxuZXhwb3J0IHsgRW1wdHlQYW5vcmFtYSB9OyIsImltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9QYW5vcmFtYSc7XG5pbXBvcnQgeyBDdWJlVGV4dHVyZUxvYWRlciB9IGZyb20gJy4uL2xvYWRlcnMvQ3ViZVRleHR1cmVMb2FkZXInO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogQ3ViZW1hcC1iYXNlZCBwYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2FycmF5fSBpbWFnZXMgLSBBbiBhcnJheSBvZiBjdWJldGV4dHVyZSBjb250YWluaW5nIHNpeCBpbWFnZXNcbiAqL1xuZnVuY3Rpb24gQ3ViZVBhbm9yYW1hICggaW1hZ2VzID0gW10gKXtcblxuXHRjb25zdCBlZGdlTGVuZ3RoID0gMTAwMDA7XG5cdGNvbnN0IHNoYWRlciA9IEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KCBUSFJFRS5TaGFkZXJMaWJbICdjdWJlJyBdICkgKTtcblx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkoIGVkZ2VMZW5ndGgsIGVkZ2VMZW5ndGgsIGVkZ2VMZW5ndGggKTtcblx0Y29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHtcblxuXHRcdGZyYWdtZW50U2hhZGVyOiBzaGFkZXIuZnJhZ21lbnRTaGFkZXIsXG5cdFx0dmVydGV4U2hhZGVyOiBzaGFkZXIudmVydGV4U2hhZGVyLFxuXHRcdHVuaWZvcm1zOiBzaGFkZXIudW5pZm9ybXMsXG5cdFx0c2lkZTogVEhSRUUuQmFja1NpZGUsXG5cdFx0dHJhbnNwYXJlbnQ6IHRydWVcblxuXHR9ICk7XG5cblx0UGFub3JhbWEuY2FsbCggdGhpcywgZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cblx0dGhpcy5pbWFnZXMgPSBpbWFnZXM7XG5cdHRoaXMuZWRnZUxlbmd0aCA9IGVkZ2VMZW5ndGg7XG5cdHRoaXMubWF0ZXJpYWwudW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IDA7XG5cbn1cblxuQ3ViZVBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IEN1YmVQYW5vcmFtYSxcblxuXHQvKipcblx0ICogTG9hZCA2IGltYWdlcyBhbmQgYmluZCBsaXN0ZW5lcnNcblx0ICovXG5cdGxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdEN1YmVUZXh0dXJlTG9hZGVyLmxvYWQoIFx0XG5cblx0XHRcdHRoaXMuaW1hZ2VzLCBcblxuXHRcdFx0dGhpcy5vbkxvYWQuYmluZCggdGhpcyApLCBcblx0XHRcdHRoaXMub25Qcm9ncmVzcy5iaW5kKCB0aGlzICksIFxuXHRcdFx0dGhpcy5vbkVycm9yLmJpbmQoIHRoaXMgKSBcblxuXHRcdCk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIDYgdGV4dHVyZXMgYXJlIHJlYWR5XG5cdCAqIEBwYXJhbSAge1RIUkVFLkN1YmVUZXh0dXJlfSB0ZXh0dXJlIC0gQ3ViZSB0ZXh0dXJlXG5cdCAqL1xuXHRvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblx0XHRcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zWyAndEN1YmUnIF0udmFsdWUgPSB0ZXh0dXJlO1xuXG5cdFx0UGFub3JhbWEucHJvdG90eXBlLm9uTG9hZC5jYWxsKCB0aGlzICk7XG5cblx0fSxcblxuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XHRcblxuXHRcdHRoaXMuaW1hZ2VzLmZvckVhY2goICggaW1hZ2UgKSA9PiB7IFRIUkVFLkNhY2hlLnJlbW92ZSggaW1hZ2UgKTsgfSApO1xuXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3RDdWJlJyBdICYmIHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbICd0Q3ViZScgXS52YWx1ZS5kaXNwb3NlKCk7XG5cblx0XHRQYW5vcmFtYS5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKCB0aGlzICk7XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IEN1YmVQYW5vcmFtYSB9OyIsImltcG9ydCB7IEN1YmVQYW5vcmFtYSB9IGZyb20gJy4vQ3ViZVBhbm9yYW1hJztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5cbi8qKlxuICogQmFzaWMgcGFub3JhbWEgd2l0aCA2IGZhY2VzIHRpbGUgaW1hZ2VzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQmFzaWNQYW5vcmFtYSAoKSB7XG5cblx0Y29uc3QgaW1hZ2VzID0gW107XG5cblx0Zm9yICggbGV0IGkgPSAwOyBpIDwgNjsgaSsrICkge1xuXG5cdFx0aW1hZ2VzLnB1c2goIERhdGFJbWFnZS5XaGl0ZVRpbGUgKTtcblxuXHR9XG5cblx0Q3ViZVBhbm9yYW1hLmNhbGwoIHRoaXMsIGltYWdlcyApO1xuXG59XG5cbkJhc2ljUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggQ3ViZVBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IEJhc2ljUGFub3JhbWFcblxufSApO1xuXG5leHBvcnQgeyBCYXNpY1Bhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIFZpZGVvIFBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgLSBFcXVpcmVjdGFuZ3VsYXIgdmlkZW8gdXJsXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uIGZvciB2aWRlbyBzZXR0aW5nc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMudmlkZW9FbGVtZW50XSAtIEhUTUw1IHZpZGVvIGVsZW1lbnQgY29udGFpbnMgdGhlIHZpZGVvXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxvb3A9dHJ1ZV0gLSBTcGVjaWZ5IGlmIHRoZSB2aWRlbyBzaG91bGQgbG9vcCBpbiB0aGUgZW5kXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm11dGVkPXRydWVdIC0gTXV0ZSB0aGUgdmlkZW8gb3Igbm90LiBOZWVkIHRvIGJlIHRydWUgaW4gb3JkZXIgdG8gYXV0b3BsYXkgb24gc29tZSBicm93c2Vyc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvcGxheT1mYWxzZV0gLSBTcGVjaWZ5IGlmIHRoZSB2aWRlbyBzaG91bGQgYXV0byBwbGF5XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnBsYXlzaW5saW5lPXRydWVdIC0gU3BlY2lmeSBpZiB2aWRlbyBzaG91bGQgcGxheSBpbmxpbmUgZm9yIGlPUy4gSWYgeW91IHdhbnQgaXQgdG8gYXV0byBwbGF5IGlubGluZSwgc2V0IGJvdGggYXV0b3BsYXkgYW5kIG11dGVkIG9wdGlvbnMgdG8gdHJ1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCJdIC0gU2V0cyB0aGUgY3Jvc3Mtb3JpZ2luIGF0dHJpYnV0ZSBmb3IgdGhlIHZpZGVvLCB3aGljaCBhbGxvd3MgZm9yIGNyb3NzLW9yaWdpbiB2aWRlb3MgaW4gc29tZSBicm93c2VycyAoRmlyZWZveCwgQ2hyb21lKS4gU2V0IHRvIGVpdGhlciBcImFub255bW91c1wiIG9yIFwidXNlLWNyZWRlbnRpYWxzXCIuXG4gKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz01MDAwXSAtIFRoZSBtaW5pbXVtIHJhZGl1cyBmb3IgdGhpcyBwYW5vcmFtXG4gKi9cbmZ1bmN0aW9uIFZpZGVvUGFub3JhbWEgKCBzcmMsIG9wdGlvbnMgPSB7fSApIHtcblxuXHRjb25zdCByYWRpdXMgPSA1MDAwO1xuXHRjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeSggcmFkaXVzLCA2MCwgNDAgKTtcblx0Y29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgb3BhY2l0eTogMCwgdHJhbnNwYXJlbnQ6IHRydWUgfSApO1xuXG5cdFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG5cdHRoaXMuc3JjID0gc3JjO1xuXG5cdHRoaXMub3B0aW9ucyA9IHtcblxuXHRcdHZpZGVvRWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3ZpZGVvJyApLFxuXHRcdGxvb3A6IHRydWUsXG5cdFx0bXV0ZWQ6IHRydWUsXG5cdFx0YXV0b3BsYXk6IGZhbHNlLFxuXHRcdHBsYXlzaW5saW5lOiB0cnVlLFxuXHRcdGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJ1xuXG5cdH07XG5cblx0T2JqZWN0LmFzc2lnbiggdGhpcy5vcHRpb25zLCBvcHRpb25zICk7XG5cblx0dGhpcy52aWRlb0VsZW1lbnQgPSB0aGlzLm9wdGlvbnMudmlkZW9FbGVtZW50O1xuXHR0aGlzLnZpZGVvUHJvZ3Jlc3MgPSAwO1xuXHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcblxuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdsZWF2ZScsIHRoaXMucGF1c2VWaWRlby5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXItZmFkZS1zdGFydCcsIHRoaXMucmVzdW1lVmlkZW9Qcm9ncmVzcy5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tdG9nZ2xlJywgdGhpcy50b2dnbGVWaWRlby5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tdGltZScsIHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZS5iaW5kKCB0aGlzICkgKTtcblxufTtcblxuVmlkZW9QYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBWaWRlb1Bhbm9yYW1hLFxuXG5cdGlzTW9iaWxlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRsZXQgY2hlY2sgPSBmYWxzZTtcblx0XHQoZnVuY3Rpb24oYSl7aWYoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIGNoZWNrID0gdHJ1ZTt9KSggbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSApO1xuXHRcdHJldHVybiBjaGVjaztcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBMb2FkIHZpZGVvIHBhbm9yYW1hXG5cdCAqIEBmaXJlcyAgUEFOT0xFTlMuUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0ICovXG5cdGxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHsgbXV0ZWQsIGxvb3AsIGF1dG9wbGF5LCBwbGF5c2lubGluZSwgY3Jvc3NPcmlnaW4gfSA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXHRcdGNvbnN0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcblx0XHRjb25zdCBvblByb2dyZXNzID0gdGhpcy5vblByb2dyZXNzLmJpbmQoIHRoaXMgKTtcblx0XHRjb25zdCBvbkxvYWQgPSB0aGlzLm9uTG9hZC5iaW5kKCB0aGlzICk7XG5cblx0XHR2aWRlby5sb29wID0gbG9vcDtcblx0XHR2aWRlby5hdXRvcGxheSA9IGF1dG9wbGF5O1xuXHRcdHZpZGVvLnBsYXlzaW5saW5lID0gcGxheXNpbmxpbmU7XG5cdFx0dmlkZW8uY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcblx0XHR2aWRlby5tdXRlZCA9IG11dGVkO1xuXHRcdFxuXHRcdGlmICggcGxheXNpbmxpbmUgKSB7XG5cblx0XHRcdHZpZGVvLnNldEF0dHJpYnV0ZSggJ3BsYXlzaW5saW5lJywgJycgKTtcblx0XHRcdHZpZGVvLnNldEF0dHJpYnV0ZSggJ3dlYmtpdC1wbGF5c2lubGluZScsICcnICk7XG5cblx0XHR9IFxuXG5cdFx0Y29uc3Qgb25sb2FkZWRkYXRhID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0dGhpcy5zZXRWaWRlb1RleHR1cmUoIHZpZGVvICk7XG5cblx0XHRcdGlmICggYXV0b3BsYXkgKSB7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuXHRcdFx0XHQgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRhdGEgLSBQYXVzZSB2aWRlbyBvciBub3Rcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiBmYWxzZSB9ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIG1vYmlsZSBzaWxlbnQgYXV0b3BsYXlcblx0XHRcdGlmICggdGhpcy5pc01vYmlsZSgpICkge1xuXG5cdFx0XHRcdHZpZGVvLnBhdXNlKCk7XG5cblx0XHRcdFx0aWYgKCBhdXRvcGxheSAmJiBtdXRlZCApIHtcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG5cdFx0XHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcblx0XHRcdFx0XHQgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRhdGEgLSBQYXVzZSB2aWRlbyBvciBub3Rcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogZmFsc2UgfSApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nXG5cdFx0XHRcdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbicsIGRhdGE6IHRydWUgfSApO1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxvYWRlZCA9ICgpID0+IHtcblxuXHRcdFx0XHQvLyBGaXggZm9yIHRocmVlanMgcjg5IGRlbGF5ZWQgdXBkYXRlXG5cdFx0XHRcdG1hdGVyaWFsLm1hcC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0b25Qcm9ncmVzcyggeyBsb2FkZWQ6IDEsIHRvdGFsOiAxIH0gKTtcblx0XHRcdFx0b25Mb2FkKCk7XG5cblx0XHRcdH07XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggbG9hZGVkICk7XG5cdFx0XHRcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVhZHkgc3RhdGUgb2YgdGhlIGF1ZGlvL3ZpZGVvIGVsZW1lbnRcblx0XHQgKiAwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG5cdFx0ICogMSA9IEhBVkVfTUVUQURBVEEgLSBtZXRhZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG5cdFx0ICogMiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuXHRcdCAqIDMgPSBIQVZFX0ZVVFVSRV9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgYW5kIGF0IGxlYXN0IHRoZSBuZXh0IGZyYW1lIGlzIGF2YWlsYWJsZVxuXHRcdCAqIDQgPSBIQVZFX0VOT1VHSF9EQVRBIC0gZW5vdWdoIGRhdGEgYXZhaWxhYmxlIHRvIHN0YXJ0IHBsYXlpbmdcblx0XHQgKi9cblx0XHRpZiAoIHZpZGVvLnJlYWR5U3RhdGUgPiAyICkge1xuXG5cdFx0XHRvbmxvYWRlZGRhdGEuY2FsbCggdGhpcyApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCAhdmlkZW8ucXVlcnlTZWxlY3RvckFsbCggJ3NvdXJjZScgKS5sZW5ndGggfHwgIXZpZGVvLnNyYyApIHtcblxuXHRcdFx0XHR2aWRlby5zcmMgPSB0aGlzLnNyYztcblxuXHRcdFx0fVxuXG5cdFx0XHR2aWRlby5sb2FkKCk7XG5cdFx0fVxuXG5cdFx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWRlZGRhdGEnLCBvbmxvYWRlZGRhdGEuYmluZCggdGhpcyApICk7XG5cdFx0XG5cdFx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lciggJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHR0aGlzLnZpZGVvUHJvZ3Jlc3MgPSB2aWRlby5kdXJhdGlvbiA+PSAwID8gdmlkZW8uY3VycmVudFRpbWUgLyB2aWRlby5kdXJhdGlvbiA6IDA7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVmlld2VyIGhhbmRsZXIgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ29uVmlkZW9VcGRhdGUnXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gZGF0YSAtIFRoZSBwZXJjZW50YWdlIG9mIHZpZGVvIHByb2dyZXNzLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ29uVmlkZW9VcGRhdGUnLCBkYXRhOiB0aGlzLnZpZGVvUHJvZ3Jlc3MgfSApO1xuXG5cdFx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICdlbmRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFxuXHRcdFx0aWYgKCAhbG9vcCApIHtcblxuXHRcdFx0XHR0aGlzLnJlc2V0VmlkZW8oKTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbicsIGRhdGE6IHRydWUgfSApO1xuXG5cdFx0XHR9XG5cblx0XHR9LmJpbmQoIHRoaXMgKSwgZmFsc2UgKTsgXG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IHZpZGVvIHRleHR1cmVcblx0ICogQHBhcmFtIHtIVE1MVmlkZW9FbGVtZW50fSB2aWRlbyAgLSBUaGUgaHRtbDUgdmlkZW8gZWxlbWVudFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcblx0ICovXG5cdHNldFZpZGVvVGV4dHVyZTogZnVuY3Rpb24gKCB2aWRlbyApIHtcblxuXHRcdGlmICggIXZpZGVvICkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgdmlkZW9UZXh0dXJlID0gbmV3IFRIUkVFLlZpZGVvVGV4dHVyZSggdmlkZW8gKTtcblx0XHR2aWRlb1RleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuXHRcdHZpZGVvVGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG5cdFx0dmlkZW9UZXh0dXJlLmZvcm1hdCA9IFRIUkVFLlJHQkZvcm1hdDtcblxuXHRcdHRoaXMudXBkYXRlVGV4dHVyZSggdmlkZW9UZXh0dXJlICk7XG5cdFxuXHR9LFxuXG5cdHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnZpZGVvRWxlbWVudCA9IHVuZGVmaW5lZDtcdFxuXG5cdFx0UGFub3JhbWEucHJvdG90eXBlLnJlc2V0LmNhbGwoIHRoaXMgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiB2aWRlbyBpcyBwYXVzZWRcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gLSBpcyB2aWRlbyBwYXVzZWQgb3Igbm90XG5cdCAqL1xuXHRpc1ZpZGVvUGF1c2VkOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQucGF1c2VkO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSB2aWRlbyB0byBwbGF5IG9yIHBhdXNlXG5cdCAqL1xuXHR0b2dnbGVWaWRlbzogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHRcdGlmICggIXZpZGVvICkgeyByZXR1cm47IH1cblxuXHRcdHZpZGVvWyB2aWRlby5wYXVzZWQgPyAncGxheScgOiAncGF1c2UnIF0oKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgdmlkZW8gY3VycmVudFRpbWVcblx0ICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gRXZlbnQgY29udGFpbnMgcGVyY2VudGFnZS4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG5cdCAqL1xuXHRzZXRWaWRlb0N1cnJlbnRUaW1lOiBmdW5jdGlvbiAoIHsgcGVyY2VudGFnZSB9ICkge1xuXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHRcdGlmICggdmlkZW8gJiYgIU51bWJlci5pc05hTiggcGVyY2VudGFnZSApICYmIHBlcmNlbnRhZ2UgIT09IDEgKSB7XG5cblx0XHRcdHZpZGVvLmN1cnJlbnRUaW1lID0gdmlkZW8uZHVyYXRpb24gKiBwZXJjZW50YWdlO1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnb25WaWRlb1VwZGF0ZScsIGRhdGE6IHBlcmNlbnRhZ2UgfSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFBsYXkgdmlkZW9cblx0ICovXG5cdHBsYXlWaWRlbzogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHRcdGlmICggdmlkZW8gJiYgdmlkZW8ucGF1c2VkICkge1xuXG5cdFx0XHR2aWRlby5wbGF5KClcblxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFBsYXkgZXZlbnRcblx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdCAqIEBldmVudCAncGxheSdcblx0XHQgKiAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGxheScgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFBhdXNlIHZpZGVvXG5cdCAqL1xuXHRwYXVzZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG5cdFx0aWYgKCB2aWRlbyAmJiAhdmlkZW8ucGF1c2VkICkge1xuXG5cdFx0XHR2aWRlby5wYXVzZSgpO1xuXG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUGF1c2UgZXZlbnRcblx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdCAqIEBldmVudCAncGF1c2UnXG5cdFx0ICogKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3BhdXNlJyB9ICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogUmVzdW1lIHZpZGVvXG5cdCAqL1xuXHRyZXN1bWVWaWRlb1Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG5cdFx0aWYgKCB2aWRlby5yZWFkeVN0YXRlID49IDQgJiYgdmlkZW8uYXV0b3BsYXkgJiYgIXRoaXMuaXNNb2JpbGUoKSApIHtcblxuXHRcdFx0dGhpcy5wbGF5VmlkZW8oKTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuXHRcdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG5cdFx0XHQgKi9cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiBmYWxzZSB9ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnBhdXNlVmlkZW8oKTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuXHRcdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG5cdFx0XHQgKi9cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiB0cnVlIH0gKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZSggeyBwZXJjZW50YWdlOiB0aGlzLnZpZGVvUHJvZ3Jlc3MgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJlc2V0IHZpZGVvIGF0IHN0YXRpbmcgcG9pbnRcblx0ICovXG5cdHJlc2V0VmlkZW86IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cblx0XHRpZiAoIHZpZGVvICkge1xuXG5cdFx0XHR0aGlzLnNldFZpZGVvQ3VycmVudFRpbWUoIHsgcGVyY2VudGFnZTogMCB9ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0KiBDaGVjayBpZiB2aWRlbyBpcyBtdXRlZFxuXHQqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdmlkZW8gbXV0ZWQgb3Igbm90XG5cdCovXG5cdGlzVmlkZW9NdXRlZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50Lm11dGVkO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIE11dGUgdmlkZW9cblx0ICovXG5cdG11dGVWaWRlbzogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuXHRcdGlmICggdmlkZW8gJiYgIXZpZGVvLm11dGVkICkge1xuXG5cdFx0XHR2aWRlby5tdXRlZCA9IHRydWU7XG5cblx0XHR9XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZvbHVtZWNoYW5nZScgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFVubXV0ZSB2aWRlb1xuXHQgKi9cblx0dW5tdXRlVmlkZW86IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cblx0XHRpZiAoIHRoaXMudmlkZW9FbGVtZW50ICYmIHRoaXMuaXNWaWRlb011dGVkKCkgKSB7XG5cblx0XHRcdHRoaXMudmlkZW9FbGVtZW50Lm11dGVkID0gZmFsc2U7XG5cblx0XHR9XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZvbHVtZWNoYW5nZScgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHZpZGVvIGVsZW1lbnRcblx0ICovXG5cdGdldFZpZGVvRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50O1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc3Bvc2UgdmlkZW8gcGFub3JhbWFcblx0ICovXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMucmVzZXRWaWRlbygpO1xuXHRcdHRoaXMucGF1c2VWaWRlbygpO1xuXHRcdFxuXHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xlYXZlJywgdGhpcy5wYXVzZVZpZGVvLmJpbmQoIHRoaXMgKSApO1xuXHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCB0aGlzLnJlc3VtZVZpZGVvUHJvZ3Jlc3MuYmluZCggdGhpcyApICk7XG5cdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAndmlkZW8tdG9nZ2xlJywgdGhpcy50b2dnbGVWaWRlby5iaW5kKCB0aGlzICkgKTtcblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aWRlby10aW1lJywgdGhpcy5zZXRWaWRlb0N1cnJlbnRUaW1lLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0dGhpcy5tYXRlcmlhbC5tYXAgJiYgdGhpcy5tYXRlcmlhbC5tYXAuZGlzcG9zZSgpO1xuXG5cdFx0UGFub3JhbWEucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCggdGhpcyApO1xuXG5cdH1cblxufSApO1xuXG5leHBvcnQgeyBWaWRlb1Bhbm9yYW1hIH07IiwiXG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi9UZXh0dXJlTG9hZGVyJztcblxuZnVuY3Rpb24gR29vZ2xlU3RyZWV0TG9hZGVyICggcGFyYW1ldGVycyA9IHt9ICkge1xuXG5cdHRoaXMuX3BhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuXHR0aGlzLl96b29tO1xuXHR0aGlzLl9wYW5vSWQ7XG5cdHRoaXMuX3Bhbm9DbGllbnQgPSBuZXcgZ29vZ2xlLm1hcHMuU3RyZWV0Vmlld1NlcnZpY2UoKTtcblx0dGhpcy5fY291bnQgPSAwO1xuXHR0aGlzLl90b3RhbCA9IDA7XG5cdHRoaXMuX2NhbnZhcyA9IFtdO1xuXHR0aGlzLl9jdHggPSBbXTtcblx0dGhpcy5fd2MgPSAwO1xuXHR0aGlzLl9oYyA9IDA7XG5cdHRoaXMucmVzdWx0ID0gbnVsbDtcblx0dGhpcy5yb3RhdGlvbiA9IDA7XG5cdHRoaXMuY29weXJpZ2h0ID0gJyc7XG5cdHRoaXMub25TaXplQ2hhbmdlID0gbnVsbDtcblx0dGhpcy5vblBhbm9yYW1hTG9hZCA9IG51bGw7XG5cblx0dGhpcy5sZXZlbHNXID0gWyAxLCAyLCA0LCA3LCAxMywgMjYgXTtcblx0dGhpcy5sZXZlbHNIID0gWyAxLCAxLCAyLCA0LCA3LCAxMyBdO1xuXG5cdHRoaXMud2lkdGhzID0gWyA0MTYsIDgzMiwgMTY2NCwgMzMyOCwgNjY1NiwgMTMzMTIgXTtcblx0dGhpcy5oZWlnaHRzID0gWyA0MTYsIDQxNiwgODMyLCAxNjY0LCAzMzI4LCA2NjU2IF07XG5cblx0bGV0IGdsO1xuXG5cdHRyeSB7XG5cblx0XHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXG5cdFx0Z2wgPSBjYW52YXMuZ2V0Q29udGV4dCggJ2V4cGVyaW1lbnRhbC13ZWJnbCcgKTtcblxuXHRcdGlmKCAhZ2wgKSB7XG5cblx0XHRcdGdsID0gY2FudmFzLmdldENvbnRleHQoICd3ZWJnbCcgKTtcblxuXHRcdH1cblxuXHR9XG5cdGNhdGNoICggZXJyb3IgKSB7XG5cblx0fVxuXG5cdGNvbnN0IG1heFRleFNpemUgPSBNYXRoLm1heCggZ2wuZ2V0UGFyYW1ldGVyKCBnbC5NQVhfVEVYVFVSRV9TSVpFICksIDY2NTYgKTtcblx0dGhpcy5tYXhXID0gbWF4VGV4U2l6ZTtcblx0dGhpcy5tYXhIID0gbWF4VGV4U2l6ZTtcblxufVxuXG5PYmplY3QuYXNzaWduKCBHb29nbGVTdHJlZXRMb2FkZXIucHJvdG90eXBlLCB7XG5cblx0Y29uc3RydWN0b3I6IEdvb2dsZVN0cmVldExvYWRlcixcblxuXHRzZXRQcm9ncmVzczogZnVuY3Rpb24gKCBsb2FkZWQsIHRvdGFsICkge1xuXG5cdFx0aWYgKCB0aGlzLm9uUHJvZ3Jlc3MgKSB7XG5cblx0XHRcdHRoaXMub25Qcm9ncmVzcyggeyBsb2FkZWQ6IGxvYWRlZCwgdG90YWw6IHRvdGFsIH0gKTtcblxuXHRcdH1cblx0XHRcblx0fSxcblxuXHR0aHJvd0Vycm9yOiBmdW5jdGlvbiAoIG1lc3NhZ2UgKSB7XG5cblx0XHRpZiAoIHRoaXMub25FcnJvciApIHtcblxuXHRcdFx0dGhpcy5vbkVycm9yKCBtZXNzYWdlICk7XG5cdFx0XHRcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG5cblx0XHR9XG5cdFx0XG5cdH0sXG5cblx0YWRhcHRUZXh0dXJlVG9ab29tOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCB3ID0gdGhpcy53aWR0aHMgWyB0aGlzLl96b29tIF07XG5cdFx0Y29uc3QgaCA9IHRoaXMuaGVpZ2h0c1sgdGhpcy5fem9vbSBdO1xuXG5cdFx0Y29uc3QgbWF4VyA9IHRoaXMubWF4Vztcblx0XHRjb25zdCBtYXhIID0gdGhpcy5tYXhIO1xuXG5cdFx0dGhpcy5fd2MgPSBNYXRoLmNlaWwoIHcgLyBtYXhXICk7XG5cdFx0dGhpcy5faGMgPSBNYXRoLmNlaWwoIGggLyBtYXhIICk7XG5cblx0XHRmb3IoIGxldCB5ID0gMDsgeSA8IHRoaXMuX2hjOyB5KysgKSB7XG5cdFx0XHRmb3IoIGxldCB4ID0gMDsgeCA8IHRoaXMuX3djOyB4KysgKSB7XG5cdFx0XHRcdGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXHRcdFx0XHRpZiggeCA8ICggdGhpcy5fd2MgLSAxICkgKSBjLndpZHRoID0gbWF4VzsgZWxzZSBjLndpZHRoID0gdyAtICggbWF4VyAqIHggKTtcblx0XHRcdFx0aWYoIHkgPCAoIHRoaXMuX2hjIC0gMSApICkgYy5oZWlnaHQgPSBtYXhIOyBlbHNlIGMuaGVpZ2h0ID0gaCAtICggbWF4SCAqIHkgKTtcblx0XHRcdFx0dGhpcy5fY2FudmFzLnB1c2goIGMgKTtcblx0XHRcdFx0dGhpcy5fY3R4LnB1c2goIGMuZ2V0Q29udGV4dCggJzJkJyApICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH0sXG5cblx0Y29tcG9zZUZyb21UaWxlOiBmdW5jdGlvbiAoIHgsIHksIHRleHR1cmUgKSB7XG5cblx0XHRjb25zdCBtYXhXID0gdGhpcy5tYXhXO1xuXHRcdGNvbnN0IG1heEggPSB0aGlzLm1heEg7XG5cblx0XHR4ICo9IDUxMjtcblx0XHR5ICo9IDUxMjtcblxuXHRcdGNvbnN0IHB4ID0gTWF0aC5mbG9vciggeCAvIG1heFcgKTtcblx0XHRjb25zdCBweSA9IE1hdGguZmxvb3IoIHkgLyBtYXhIICk7XG5cblx0XHR4IC09IHB4ICogbWF4Vztcblx0XHR5IC09IHB5ICogbWF4SDtcblxuXHRcdHRoaXMuX2N0eFsgcHkgKiB0aGlzLl93YyArIHB4IF0uZHJhd0ltYWdlKCB0ZXh0dXJlLCAwLCAwLCB0ZXh0dXJlLndpZHRoLCB0ZXh0dXJlLmhlaWdodCwgeCwgeSwgNTEyLCA1MTIgKTtcblxuXHRcdHRoaXMucHJvZ3Jlc3MoKTtcblx0XHRcblx0fSxcblxuXHRwcm9ncmVzczogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLl9jb3VudCsrO1xuXHRcdFxuXHRcdHRoaXMuc2V0UHJvZ3Jlc3MoIHRoaXMuX2NvdW50LCB0aGlzLl90b3RhbCApO1xuXHRcdFxuXHRcdGlmICggdGhpcy5fY291bnQgPT09IHRoaXMuX3RvdGFsKSB7XG5cblx0XHRcdHRoaXMuY2FudmFzID0gdGhpcy5fY2FudmFzO1xuXHRcdFx0dGhpcy5wYW5vSWQgPSB0aGlzLl9wYW5vSWQ7XG5cdFx0XHR0aGlzLnpvb20gPSB0aGlzLl96b29tO1xuXG5cdFx0XHRpZiAoIHRoaXMub25QYW5vcmFtYUxvYWQgKSB7XG5cblx0XHRcdFx0dGhpcy5vblBhbm9yYW1hTG9hZCggdGhpcy5fY2FudmFzWyAwIF0gKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXG5cdGxvYWRGcm9tSWQ6IGZ1bmN0aW9uKCBpZCApIHtcblxuXHRcdHRoaXMuX3Bhbm9JZCA9IGlkO1xuXHRcdHRoaXMuY29tcG9zZVBhbm9yYW1hKCk7XG5cblx0fSxcblxuXHRjb21wb3NlUGFub3JhbWE6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuc2V0UHJvZ3Jlc3MoIDAsIDEgKTtcblx0XHRcblx0XHRjb25zdCB3ID0gdGhpcy5sZXZlbHNXWyB0aGlzLl96b29tIF07XG5cdFx0Y29uc3QgaCA9IHRoaXMubGV2ZWxzSFsgdGhpcy5fem9vbSBdO1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0XG5cdFx0dGhpcy5fY291bnQgPSAwO1xuXHRcdHRoaXMuX3RvdGFsID0gdyAqIGg7XG5cblx0XHRjb25zdCB7IHVzZVdlYkdMIH0gPSB0aGlzLl9wYXJhbWV0ZXJzO1xuXG5cdFx0Zm9yKCBsZXQgeSA9IDA7IHkgPCBoOyB5KysgKSB7XG5cdFx0XHRmb3IoIGxldCB4ID0gMDsgeCA8IHc7IHgrKyApIHtcblx0XHRcdFx0Y29uc3QgdXJsID0gJ2h0dHBzOi8vZ2VvMC5nZ3BodC5jb20vY2JrP2NiX2NsaWVudD1tYXBzX3N2LnRhY3RpbGUmYXV0aHVzZXI9MCZobD1lbiZvdXRwdXQ9dGlsZSZ6b29tPScgKyB0aGlzLl96b29tICsgJyZ4PScgKyB4ICsgJyZ5PScgKyB5ICsgJyZwYW5vaWQ9JyArIHRoaXMuX3Bhbm9JZCArICcmbmJ0JmZvdmVyPTInO1xuXHRcdFx0XHQoIGZ1bmN0aW9uKCB4LCB5ICkgeyBcblx0XHRcdFx0XHRpZiggdXNlV2ViR0wgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB0ZXh0dXJlID0gVGV4dHVyZUxvYWRlci5sb2FkKCB1cmwsIG51bGwsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLmNvbXBvc2VGcm9tVGlsZSggeCwgeSwgdGV4dHVyZSApO1xuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRcdGltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLmNvbXBvc2VGcm9tVGlsZSggeCwgeSwgdGhpcyApO1x0XHRcdFxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0aW1nLmNyb3NzT3JpZ2luID0gJyc7XG5cdFx0XHRcdFx0XHRpbWcuc3JjID0gdXJsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApKCB4LCB5ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHR9LFxuXG5cdGxvYWQ6IGZ1bmN0aW9uICggcGFub2lkICkge1xuXG5cdFx0dGhpcy5sb2FkUGFubyggcGFub2lkICk7XG5cblx0fSxcblxuXHRsb2FkUGFubzogZnVuY3Rpb24oIGlkICkge1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy5fcGFub0NsaWVudC5nZXRQYW5vcmFtYUJ5SWQoIGlkLCBmdW5jdGlvbiAocmVzdWx0LCBzdGF0dXMpIHtcblx0XHRcdGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLlN0cmVldFZpZXdTdGF0dXMuT0spIHtcblx0XHRcdFx0c2VsZi5yZXN1bHQgPSByZXN1bHQ7XG5cdFx0XHRcdGlmKCBzZWxmLm9uUGFub3JhbWFEYXRhICkgc2VsZi5vblBhbm9yYW1hRGF0YSggcmVzdWx0ICk7XG5cdFx0XHRcdC8vdmFyIGggPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZUhlYWRpbmcobG9jYXRpb24sIHJlc3VsdC5sb2NhdGlvbi5sYXRMbmcpO1xuXHRcdFx0XHQvL3JvdGF0aW9uID0gKHJlc3VsdC50aWxlcy5jZW50ZXJIZWFkaW5nIC0gaCkgKiBNYXRoLlBJIC8gMTgwLjA7XG5cdFx0XHRcdHNlbGYuY29weXJpZ2h0ID0gcmVzdWx0LmNvcHlyaWdodDtcblx0XHRcdFx0c2VsZi5fcGFub0lkID0gcmVzdWx0LmxvY2F0aW9uLnBhbm87XG5cdFx0XHRcdHNlbGYubG9jYXRpb24gPSBsb2NhdGlvbjtcblx0XHRcdFx0c2VsZi5jb21wb3NlUGFub3JhbWEoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKCBzZWxmLm9uTm9QYW5vcmFtYURhdGEgKSBzZWxmLm9uTm9QYW5vcmFtYURhdGEoIHN0YXR1cyApO1xuXHRcdFx0XHRzZWxmLnRocm93RXJyb3IoJ0NvdWxkIG5vdCByZXRyaWV2ZSBwYW5vcmFtYSBmb3IgdGhlIGZvbGxvd2luZyByZWFzb246ICcgKyBzdGF0dXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHR9LFxuXG5cdHNldFpvb206IGZ1bmN0aW9uKCB6ICkge1xuXHRcdHRoaXMuX3pvb20gPSB6O1xuXHRcdHRoaXMuYWRhcHRUZXh0dXJlVG9ab29tKCk7XG5cdH1cblx0XG59ICk7XG5cbmV4cG9ydCB7IEdvb2dsZVN0cmVldExvYWRlciB9OyIsImltcG9ydCB7IEltYWdlUGFub3JhbWEgfSBmcm9tICcuL0ltYWdlUGFub3JhbWEnO1xuaW1wb3J0IHsgR29vZ2xlU3RyZWV0TG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9Hb29nbGVTdHJlZXRMb2FkZXInO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogR29vZ2xlIHN0cmVldHZpZXcgcGFub3JhbWFcbiAqIFxuICogW0hvdyB0byBnZXQgUGFub3JhbWEgSURde0BsaW5rIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjk5MTYxNDkvZ29vZ2xlLW1hcHMtc3RyZWV0dmlldy1ob3ctdG8tZ2V0LXBhbm9yYW1hLWlkfVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFub0lkIC0gUGFub3JhbWEgaWQgZnJvbSBHb29nbGUgU3RyZWV0dmlldyBcbiAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpS2V5XSAtIEdvb2dsZSBTdHJlZXQgVmlldyBBUEkgS2V5XG4gKi9cbmZ1bmN0aW9uIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSAoIHBhbm9JZCwgYXBpS2V5ICkge1xuXG5cdEltYWdlUGFub3JhbWEuY2FsbCggdGhpcyApO1xuXG5cdHRoaXMucGFub0lkID0gcGFub0lkO1xuXG5cdHRoaXMuZ3N2TG9hZGVyID0gdW5kZWZpbmVkO1xuXG5cdHRoaXMubG9hZFJlcXVlc3RlZCA9IGZhbHNlO1xuXG5cdHRoaXMuc2V0dXBHb29nbGVNYXBBUEkoIGFwaUtleSApO1xuXG59XG5cbkdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSxcblxuXHQvKipcblx0ICogTG9hZCBHb29nbGUgU3RyZWV0IFZpZXcgYnkgcGFub3JhbWEgaWRcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhbm9JZCAtIEdvZ29nbGUgU3RyZWV0IFZpZXcgcGFub3JhbWEgaWRcblx0ICovXG5cdGxvYWQ6IGZ1bmN0aW9uICggcGFub0lkICkge1xuXG5cdFx0dGhpcy5sb2FkUmVxdWVzdGVkID0gdHJ1ZTtcblxuXHRcdHBhbm9JZCA9ICggcGFub0lkIHx8IHRoaXMucGFub0lkICkgfHwge307XG5cblx0XHRpZiAoIHBhbm9JZCAmJiB0aGlzLmdzdkxvYWRlciApIHtcblxuXHRcdFx0dGhpcy5sb2FkR1NWTG9hZGVyKCBwYW5vSWQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMuZ3N2TG9hZGVyID0ge307XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0dXAgR29vZ2xlIE1hcCBBUElcblx0ICovXG5cdHNldHVwR29vZ2xlTWFwQVBJOiBmdW5jdGlvbiAoIGFwaUtleSApIHtcblxuXHRcdGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzY3JpcHQnICk7XG5cdFx0c2NyaXB0LnNyYyA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/Jztcblx0XHRzY3JpcHQuc3JjICs9IGFwaUtleSA/ICdrZXk9JyArIGFwaUtleSA6ICcnO1xuXHRcdHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLnNldEdTVkxvYWRlci5iaW5kKCB0aGlzICk7XG5cdFx0c2NyaXB0Lm9ubG9hZCA9IHRoaXMuc2V0R1NWTG9hZGVyLmJpbmQoIHRoaXMgKTtcblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdoZWFkJyApLmFwcGVuZENoaWxkKCBzY3JpcHQgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgR1NWIExvYWRlclxuXHQgKi9cblx0c2V0R1NWTG9hZGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmdzdkxvYWRlciA9IG5ldyBHb29nbGVTdHJlZXRMb2FkZXIoKTtcblxuXHRcdGlmICggdGhpcy5nc3ZMb2FkZXIgPT09IHt9IHx8IHRoaXMubG9hZFJlcXVlc3RlZCApIHtcblxuXHRcdFx0dGhpcy5sb2FkKCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IEdTViBMb2FkZXJcblx0ICogQHJldHVybiB7b2JqZWN0fSBHU1YgTG9hZGVyIGluc3RhbmNlXG5cdCAqL1xuXHRnZXRHU1ZMb2FkZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmdzdkxvYWRlcjtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBMb2FkIEdTViBMb2FkZXJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBwYW5vSWQgLSBHb2dvZ2xlIFN0cmVldCBWaWV3IHBhbm9yYW1hIGlkXG5cdCAqL1xuXHRsb2FkR1NWTG9hZGVyOiBmdW5jdGlvbiAoIHBhbm9JZCApIHtcblxuXHRcdHRoaXMubG9hZFJlcXVlc3RlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5nc3ZMb2FkZXIub25Qcm9ncmVzcyA9IHRoaXMub25Qcm9ncmVzcy5iaW5kKCB0aGlzICk7XG5cblx0XHR0aGlzLmdzdkxvYWRlci5vblBhbm9yYW1hTG9hZCA9IHRoaXMub25Mb2FkLmJpbmQoIHRoaXMgKTtcblxuXHRcdHRoaXMuZ3N2TG9hZGVyLnNldFpvb20oIHRoaXMuZ2V0Wm9vbUxldmVsKCkgKTtcblxuXHRcdHRoaXMuZ3N2TG9hZGVyLmxvYWQoIHBhbm9JZCApO1xuXG5cdFx0dGhpcy5nc3ZMb2FkZXIubG9hZGVkID0gdHJ1ZTtcblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHBhbm9yYW1hIGlzIGxvYWRlZFxuXHQgKiBAcGFyYW0gIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzIC0gQ2FudmFzIHdoZXJlIHRoZSB0aWxlcyBoYXZlIGJlZW4gZHJhd25cblx0ICovXG5cdG9uTG9hZDogZnVuY3Rpb24gKCBjYW52YXMgKSB7XG5cblx0XHRpZiAoICF0aGlzLmdzdkxvYWRlciApIHsgcmV0dXJuOyB9XG5cblx0XHRJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgbmV3IFRIUkVFLlRleHR1cmUoIGNhbnZhcyApICk7XG5cblx0fSxcblxuXHRyZXNldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5nc3ZMb2FkZXIgPSB1bmRlZmluZWQ7XG5cblx0XHRJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5yZXNldC5jYWxsKCB0aGlzICk7XG5cblx0fVxuXG59ICk7XG5cbmV4cG9ydCB7IEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSB9OyIsIi8qKlxuICogU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uIHNoYWRlclxuICogYmFzZWQgb24gaHR0cDovL25vdGxpb24uZ2l0aHViLmlvL3N0cmVldHZpZXctc3RlcmVvZ3JhcGhpY1xuICogQGF1dGhvciBwY2hlbjY2XG4gKi9cblxuaW1wb3J0ICd0aHJlZSc7XG5cbmNvbnN0IFN0ZXJlb2dyYXBoaWNTaGFkZXIgPSB7XG5cblx0dW5pZm9ybXM6IHtcblxuXHRcdFwidERpZmZ1c2VcIjogICB7IHZhbHVlOiBuZXcgVEhSRUUuVGV4dHVyZSgpIH0sXG5cdFx0XCJyZXNvbHV0aW9uXCI6IHsgdmFsdWU6IDEuMCB9LFxuXHRcdFwidHJhbnNmb3JtXCI6ICB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4NCgpIH0sXG5cdFx0XCJ6b29tXCI6IFx0ICB7IHZhbHVlOiAxLjAgfSxcblx0XHRcIm9wYWNpdHlcIjogICAgeyB2YWx1ZTogMS4wIH1cblxuXHR9LFxuXG5cdHZlcnRleFNoYWRlcjogW1xuXG5cdFx0XCJ2YXJ5aW5nIHZlYzIgdlV2O1wiLFxuXG5cdFx0XCJ2b2lkIG1haW4oKSB7XCIsXG5cblx0XHRcdFwidlV2ID0gdXY7XCIsXG5cdFx0XHRcImdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApO1wiLFxuXG5cdFx0XCJ9XCIgXG5cblx0XS5qb2luKCBcIlxcblwiICksXG5cblx0ZnJhZ21lbnRTaGFkZXI6IFtcblxuXHRcdFwidW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XCIsXG5cdFx0XCJ1bmlmb3JtIGZsb2F0IHJlc29sdXRpb247XCIsXG5cdFx0XCJ1bmlmb3JtIG1hdDQgdHJhbnNmb3JtO1wiLFxuXHRcdFwidW5pZm9ybSBmbG9hdCB6b29tO1wiLFxuXHRcdFwidW5pZm9ybSBmbG9hdCBvcGFjaXR5O1wiLFxuXG5cdFx0XCJ2YXJ5aW5nIHZlYzIgdlV2O1wiLFxuXG5cdFx0XCJjb25zdCBmbG9hdCBQSSA9IDMuMTQxNTkyNjUzNTg5NzkzO1wiLFxuXG5cdFx0XCJ2b2lkIG1haW4oKXtcIixcblxuXHRcdFx0XCJ2ZWMyIHBvc2l0aW9uID0gLTEuMCArICAyLjAgKiB2VXY7XCIsXG5cblx0XHRcdFwicG9zaXRpb24gKj0gdmVjMiggem9vbSAqIHJlc29sdXRpb24sIHpvb20gKiAwLjUgKTtcIixcblxuXHRcdFx0XCJmbG9hdCB4MnkyID0gcG9zaXRpb24ueCAqIHBvc2l0aW9uLnggKyBwb3NpdGlvbi55ICogcG9zaXRpb24ueTtcIixcblx0XHRcdFwidmVjMyBzcGhlcmVfcG50ID0gdmVjMyggMi4gKiBwb3NpdGlvbiwgeDJ5MiAtIDEuICkgLyAoIHgyeTIgKyAxLiApO1wiLFxuXG5cdFx0XHRcInNwaGVyZV9wbnQgPSB2ZWMzKCB0cmFuc2Zvcm0gKiB2ZWM0KCBzcGhlcmVfcG50LCAxLjAgKSApO1wiLFxuXG5cdFx0XHRcInZlYzIgc2FtcGxlVVYgPSB2ZWMyKFwiLFxuXHRcdFx0XHRcIihhdGFuKHNwaGVyZV9wbnQueSwgc3BoZXJlX3BudC54KSAvIFBJICsgMS4wKSAqIDAuNSxcIixcblx0XHRcdFx0XCIoYXNpbihzcGhlcmVfcG50LnopIC8gUEkgKyAwLjUpXCIsXG5cdFx0XHRcIik7XCIsXG5cblx0XHRcdFwiZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgc2FtcGxlVVYgKTtcIixcblxuXHRcdFx0XCJnbF9GcmFnQ29sb3IuYSAqPSBvcGFjaXR5O1wiLFxuXG5cdFx0XCJ9XCJcblxuXHRdLmpvaW4oIFwiXFxuXCIgKVxuXG59O1xuXG5leHBvcnQgeyBTdGVyZW9ncmFwaGljU2hhZGVyIH07IiwiaW1wb3J0IHsgSW1hZ2VQYW5vcmFtYSB9IGZyb20gJy4vSW1hZ2VQYW5vcmFtYSc7XG5pbXBvcnQgeyBJbmZvc3BvdCB9IGZyb20gJy4uL2luZm9zcG90L0luZm9zcG90JztcbmltcG9ydCB7IENPTlRST0xTIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcbmltcG9ydCB7IFN0ZXJlb2dyYXBoaWNTaGFkZXIgfSBmcm9tICcuLi9zaGFkZXJzL1N0ZXJlb2dyYXBoaWNTaGFkZXInO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogTGl0dGxlIFBsYW5ldFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcdFx0LSBUeXBlIG9mIGxpdHRsZSBwbGFuZXQgYmFzaWMgY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgXHRcdC0gVVJMIGZvciB0aGUgaW1hZ2Ugc291cmNlXG4gKiBAcGFyYW0ge251bWJlcn0gW3NpemU9MTAwMDBdIC0gU2l6ZSBvZiBwbGFuZSBnZW9tZXRyeVxuICogQHBhcmFtIHtudW1iZXJ9IFtyYXRpbz0wLjVdICAtIFJhdGlvIG9mIHBsYW5lIGdlb21ldHJ5J3MgaGVpZ2h0IGFnYWluc3Qgd2lkdGhcbiAqL1xuZnVuY3Rpb24gTGl0dGxlUGxhbmV0ICggdHlwZSA9ICdpbWFnZScsIHNvdXJjZSwgc2l6ZSA9IDEwMDAwLCByYXRpbyA9IDAuNSApIHtcblxuXHRpZiAoIHR5cGUgPT09ICdpbWFnZScgKSB7XG5cblx0XHRJbWFnZVBhbm9yYW1hLmNhbGwoIHRoaXMsIHNvdXJjZSwgdGhpcy5jcmVhdGVHZW9tZXRyeSggc2l6ZSwgcmF0aW8gKSwgdGhpcy5jcmVhdGVNYXRlcmlhbCggc2l6ZSApICk7XG5cblx0fVxuXG5cdHRoaXMuc2l6ZSA9IHNpemU7XG5cdHRoaXMucmF0aW8gPSByYXRpbztcblx0dGhpcy5FUFMgPSAwLjAwMDAwMTtcblx0dGhpcy5mcmFtZUlkO1xuXG5cdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0dGhpcy51c2VyTW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdHRoaXMucXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXHR0aGlzLnF1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0dGhpcy5xdWF0Q3VyID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0dGhpcy5xdWF0U2xlcnAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdHRoaXMudmVjdG9yWCA9IG5ldyBUSFJFRS5WZWN0b3IzKCAxLCAwLCAwICk7XG5cdHRoaXMudmVjdG9yWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAxLCAwICk7XG5cblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnd2luZG93LXJlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUgKTtcblxufVxuXG5MaXR0bGVQbGFuZXQucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBMaXR0bGVQbGFuZXQsXG5cblx0YWRkOiBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdFx0dGhpcy5hZGQoIGFyZ3VtZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG5cdFx0XHRvYmplY3QubWF0ZXJpYWwuZGVwdGhUZXN0ID0gZmFsc2U7XG5cdFx0XHRcblx0XHR9XG5cblx0XHRJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5hZGQuY2FsbCggdGhpcywgb2JqZWN0ICk7XG5cblx0fSxcblxuXHRjcmVhdGVHZW9tZXRyeTogZnVuY3Rpb24gKCBzaXplLCByYXRpbyApIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggc2l6ZSwgc2l6ZSAqIHJhdGlvICk7XG5cblx0fSxcblxuXHRjcmVhdGVNYXRlcmlhbDogZnVuY3Rpb24gKCBzaXplICkge1xuXG5cdFx0Y29uc3Qgc2hhZGVyID0gU3RlcmVvZ3JhcGhpY1NoYWRlciwgdW5pZm9ybXMgPSBzaGFkZXIudW5pZm9ybXM7XG5cblx0XHR1bmlmb3Jtcy56b29tLnZhbHVlID0gc2l6ZTtcblx0XHR1bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0gMC4wO1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCgge1xuXG5cdFx0XHR1bmlmb3JtczogdW5pZm9ybXMsXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHNoYWRlci52ZXJ0ZXhTaGFkZXIsXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogc2hhZGVyLmZyYWdtZW50U2hhZGVyLFxuXHRcdFx0c2lkZTogVEhSRUUuQmFja1NpZGUsXG5cdFx0XHR0cmFuc3BhcmVudDogdHJ1ZVxuXG5cdFx0fSApO1xuXHRcdFxuXHR9LFxuXG5cdHJlZ2lzdGVyTW91c2VFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXdoZWVsJywgdGhpcy5vbk1vdXNlV2hlZWwuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnRE9NTW91c2VTY3JvbGwnLCB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0TWVudS5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0XG5cdH0sXG5cblx0dW5yZWdpc3Rlck1vdXNlRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V3aGVlbCcsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnRE9NTW91c2VTY3JvbGwnLCB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0dGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgdGhpcy5vbkNvbnRleHRNZW51LmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHRcblx0fSxcblxuXHRvbk1vdXNlRG93bjogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGNvbnN0IGlucHV0Q291bnQgPSAoIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggKSB8fCAxIDtcblxuXHRcdHN3aXRjaCAoIGlucHV0Q291bnQgKSB7XG5cblx0XHRcdGNhc2UgMTpcblxuXHRcdFx0XHRjb25zdCB4ID0gKCBldmVudC5jbGllbnRYID49IDAgKSA/IGV2ZW50LmNsaWVudFggOiBldmVudC50b3VjaGVzWyAwIF0uY2xpZW50WDtcblx0XHRcdFx0Y29uc3QgeSA9ICggZXZlbnQuY2xpZW50WSA+PSAwICkgPyBldmVudC5jbGllbnRZIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFk7XG5cblx0XHRcdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdFx0XHRcdHRoaXMudXNlck1vdXNlLnNldCggeCwgeSApO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cblx0XHRcdFx0Y29uc3QgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblx0XHRcdFx0dGhpcy51c2VyTW91c2UucGluY2hEaXN0YW5jZSA9IGRpc3RhbmNlO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5vblVwZGF0ZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRvbk1vdXNlTW92ZTogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGNvbnN0IGlucHV0Q291bnQgPSAoIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggKSB8fCAxIDtcblxuXHRcdHN3aXRjaCAoIGlucHV0Q291bnQgKSB7XG5cblx0XHRcdGNhc2UgMTpcblxuXHRcdFx0XHRjb25zdCB4ID0gKCBldmVudC5jbGllbnRYID49IDAgKSA/IGV2ZW50LmNsaWVudFggOiBldmVudC50b3VjaGVzWyAwIF0uY2xpZW50WDtcblx0XHRcdFx0Y29uc3QgeSA9ICggZXZlbnQuY2xpZW50WSA+PSAwICkgPyBldmVudC5jbGllbnRZIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFk7XG5cblx0XHRcdFx0Y29uc3QgYW5nbGVYID0gVEhSRUUuTWF0aC5kZWdUb1JhZCggeCAtIHRoaXMudXNlck1vdXNlLnggKSAqIDAuNDtcblx0XHRcdFx0Y29uc3QgYW5nbGVZID0gVEhSRUUuTWF0aC5kZWdUb1JhZCggeSAtIHRoaXMudXNlck1vdXNlLnkgKSAqIDAuNDtcblxuXHRcdFx0XHRpZiAoIHRoaXMuZHJhZ2dpbmcgKSB7XG5cdFx0XHRcdFx0dGhpcy5xdWF0QS5zZXRGcm9tQXhpc0FuZ2xlKCB0aGlzLnZlY3RvclksIGFuZ2xlWCApO1xuXHRcdFx0XHRcdHRoaXMucXVhdEIuc2V0RnJvbUF4aXNBbmdsZSggdGhpcy52ZWN0b3JYLCBhbmdsZVkgKTtcblx0XHRcdFx0XHR0aGlzLnF1YXRDdXIubXVsdGlwbHkoIHRoaXMucXVhdEEgKS5tdWx0aXBseSggdGhpcy5xdWF0QiApO1xuXHRcdFx0XHRcdHRoaXMudXNlck1vdXNlLnNldCggeCwgeSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgMjpcblxuXHRcdFx0XHRjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcblx0XHRcdFx0Y29uc3QgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG5cdFx0XHRcdGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCBkeCAqIGR4ICsgZHkgKiBkeSApO1xuXG5cdFx0XHRcdHRoaXMuYWRkWm9vbURlbHRhKCB0aGlzLnVzZXJNb3VzZS5waW5jaERpc3RhbmNlIC0gZGlzdGFuY2UgKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdG9uTW91c2VVcDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuXHR9LFxuXG5cdG9uTW91c2VXaGVlbDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRsZXQgZGVsdGEgPSAwO1xuXG5cdFx0aWYgKCBldmVudC53aGVlbERlbHRhICE9PSB1bmRlZmluZWQgKSB7IC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXG5cdFx0XHRkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGE7XG5cblx0XHR9IGVsc2UgaWYgKCBldmVudC5kZXRhaWwgIT09IHVuZGVmaW5lZCApIHsgLy8gRmlyZWZveFxuXG5cdFx0XHRkZWx0YSA9IC0gZXZlbnQuZGV0YWlsO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5hZGRab29tRGVsdGEoIGRlbHRhICk7XG5cdFx0dGhpcy5vblVwZGF0ZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRhZGRab29tRGVsdGE6IGZ1bmN0aW9uICggZGVsdGEgKSB7XG5cblx0XHRjb25zdCB1bmlmb3JtcyA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXM7XG5cdFx0Y29uc3QgbG93ZXJCb3VuZCA9IHRoaXMuc2l6ZSAqIDAuMTtcblx0XHRjb25zdCB1cHBlckJvdW5kID0gdGhpcy5zaXplICogMTA7XG5cblx0XHR1bmlmb3Jtcy56b29tLnZhbHVlICs9IGRlbHRhO1xuXG5cdFx0aWYgKCB1bmlmb3Jtcy56b29tLnZhbHVlIDw9IGxvd2VyQm91bmQgKSB7XG5cblx0XHRcdHVuaWZvcm1zLnpvb20udmFsdWUgPSBsb3dlckJvdW5kO1xuXG5cdFx0fSBlbHNlIGlmICggdW5pZm9ybXMuem9vbS52YWx1ZSA+PSB1cHBlckJvdW5kICkge1xuXG5cdFx0XHR1bmlmb3Jtcy56b29tLnZhbHVlID0gdXBwZXJCb3VuZDtcblxuXHRcdH1cblxuXHR9LFxuXG5cdG9uVXBkYXRlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5vblVwZGF0ZUNhbGxiYWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0dGhpcy5xdWF0U2xlcnAuc2xlcnAoIHRoaXMucXVhdEN1ciwgMC4xICk7XG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy50cmFuc2Zvcm0udmFsdWUubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHRoaXMucXVhdFNsZXJwICk7XG5cdFx0XG5cdFx0aWYgKCAhdGhpcy5kcmFnZ2luZyAmJiAxLjAgLSB0aGlzLnF1YXRTbGVycC5jbG9uZSgpLmRvdCggdGhpcy5xdWF0Q3VyICkgPCB0aGlzLkVQUyApIHtcblx0XHRcdFxuXHRcdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMuZnJhbWVJZCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0cmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMucXVhdEN1ci5zZXQoIDAsIDAsIDAsIDEgKTtcblx0XHR0aGlzLnF1YXRTbGVycC5zZXQoIDAsIDAsIDAsIDEgKTtcblx0XHR0aGlzLm9uVXBkYXRlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cblx0XHR0aGlzLnJlZ2lzdGVyTW91c2VFdmVudHMoKTtcblx0XHR0aGlzLm9uVXBkYXRlQ2FsbGJhY2soKTtcblx0XHRcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnZGlzYWJsZUNvbnRyb2wnIH0gKTtcblx0XHRcblx0fSxcblxuXHRvbkxlYXZlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnVucmVnaXN0ZXJNb3VzZUV2ZW50cygpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ2VuYWJsZUNvbnRyb2wnLCBkYXRhOiBDT05UUk9MUy5PUkJJVCB9ICk7XG5cblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy5mcmFtZUlkICk7XG5cblx0XHRJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5vbkxlYXZlLmNhbGwoIHRoaXMgKTtcblx0XHRcblx0fSxcblxuXHRvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cblx0fSxcblxuXHRvbkNvbnRleHRNZW51OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cblx0fSxcblxuXHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XHRcblxuXHRcdEltYWdlUGFub3JhbWEucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCggdGhpcyApO1xuXG5cdH1cblxufSk7XG5cbmV4cG9ydCB7IExpdHRsZVBsYW5ldCB9OyIsImltcG9ydCB7IExpdHRsZVBsYW5ldCB9IGZyb20gJy4vTGl0dGxlUGxhbmV0JztcbmltcG9ydCB7IEltYWdlUGFub3JhbWEgfSBmcm9tICcuL0ltYWdlUGFub3JhbWEnO1xuaW1wb3J0ICd0aHJlZSc7XG5cbi8qKlxuICogSW1hZ2UgTGl0dGxlIFBsYW5ldFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFx0XHQtIFVSTCBmb3IgdGhlIGltYWdlIHNvdXJjZVxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTEwMDAwXSAtIFNpemUgb2YgcGxhbmUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmF0aW89MC41XSAgLSBSYXRpbyBvZiBwbGFuZSBnZW9tZXRyeSdzIGhlaWdodCBhZ2FpbnN0IHdpZHRoXG4gKi9cbmZ1bmN0aW9uIEltYWdlTGl0dGxlUGxhbmV0ICggc291cmNlLCBzaXplLCByYXRpbyApIHtcblxuXHRMaXR0bGVQbGFuZXQuY2FsbCggdGhpcywgJ2ltYWdlJywgc291cmNlLCBzaXplLCByYXRpbyApO1xuXG59XG5cbkltYWdlTGl0dGxlUGxhbmV0LnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIExpdHRsZVBsYW5ldC5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBJbWFnZUxpdHRsZVBsYW5ldCxcblxuXHRvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuXHRcdHRoaXMudXBkYXRlVGV4dHVyZSggdGV4dHVyZSApO1xuXG5cdFx0TGl0dGxlUGxhbmV0LnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcyApO1xuXHRcdEltYWdlUGFub3JhbWEucHJvdG90eXBlLm9uTG9hZC5jYWxsKCB0aGlzLCB0ZXh0dXJlICk7XG5cblx0fSxcblx0XG5cdHVwZGF0ZVRleHR1cmU6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuXHRcdHRleHR1cmUubWluRmlsdGVyID0gdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG5cdFx0XG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3REaWZmdXNlJyBdLnZhbHVlID0gdGV4dHVyZTtcblxuXHR9LFxuXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHREaWZmdXNlID0gdGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3REaWZmdXNlJyBdO1xuXG5cdFx0aWYgKCB0RGlmZnVzZSAmJiB0RGlmZnVzZS52YWx1ZSApIHtcblxuXHRcdFx0dERpZmZ1c2UudmFsdWUuZGlzcG9zZSgpO1xuXG5cdFx0fVxuXG5cdFx0TGl0dGxlUGxhbmV0LnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuXHR9XG5cbn0gKTtcblxuZXhwb3J0IHsgSW1hZ2VMaXR0bGVQbGFuZXQgfTsiLCJpbXBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4vUGFub3JhbWEnO1xuaW1wb3J0IHsgTWVkaWEgfSBmcm9tICcuLi9tZWRpYS9NZWRpYSc7XG5pbXBvcnQgJ3RocmVlJztcblxuLyoqXG4gKiBDYW1lcmEgcGFub3JhbWFcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW1lcmFQYW5vcmFtYSAoKSB7XG5cblx0Y29uc3QgcmFkaXVzID0gNTAwMDtcblx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkoIHJhZGl1cywgNjAsIDQwICk7XG5cdGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IHZpc2libGU6IGZhbHNlIH0pO1xuXG5cdFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG5cdHRoaXMubWVkaWEgPSBuZXcgTWVkaWEoKTtcblx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XG5cblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXInLCB0aGlzLnN0YXJ0LmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdsZWF2ZScsIHRoaXMuc3RvcC5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtY29udGFpbmVyJywgdGhpcy5vblBhbm9sZW5zQ29udGFpbmVyLmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1zY2VuZScsIHRoaXMub25QYW5vbGVuc1NjZW5lLmJpbmQoIHRoaXMgKSApO1xuXG59XG5cbkNhbWVyYVBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cblx0Y29uc3RydWN0b3I6IENhbWVyYVBhbm9yYW1hLFxuXG5cdG9uUGFub2xlbnNDb250YWluZXI6IGZ1bmN0aW9uICggeyBjb250YWluZXIgfSApIHtcblxuXHRcdHRoaXMubWVkaWEuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG5cdH0sXG5cblx0b25QYW5vbGVuc1NjZW5lOiBmdW5jdGlvbiAoIHsgc2NlbmUgfSApIHtcblxuXHRcdHRoaXMubWVkaWEuc2NlbmUgPSBzY2VuZTtcblxuXHR9LFxuXG5cdHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBtZWRpYSA9IHRoaXMubWVkaWE7XG5cblx0XHRtZWRpYS5zdGFydCgpXG5cdFx0LnRoZW4oIGZ1bmN0aW9uICggc3RyZWFtICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuYWN0aXZlICkge1xuXG5cdFx0XHRcdG1lZGlhLmF0dGFjaFZpZGVvU291cmNlT2JqZWN0KCBzdHJlYW0gKTtcblxuXHRcdFx0fVxuXG5cdFx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR9LFxuXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubWVkaWEuc3RvcCgpO1xuXG5cdH0sXG5cbn0gKTtcblxuZXhwb3J0IHsgQ2FtZXJhUGFub3JhbWEgfTsiLCJpbXBvcnQgJ3RocmVlJztcblxuZnVuY3Rpb24gT3JiaXRDb250cm9scyAoIG9iamVjdCwgZG9tRWxlbWVudCApIHtcblxuXHR0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0dGhpcy5kb21FbGVtZW50ID0gKCBkb21FbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGRvbUVsZW1lbnQgOiBkb2N1bWVudDtcblx0dGhpcy5mcmFtZUlkO1xuXG5cdC8vIEFQSVxuXG5cdC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuXHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdC8vIFwidGFyZ2V0XCIgc2V0cyB0aGUgbG9jYXRpb24gb2YgZm9jdXMsIHdoZXJlIHRoZSBjb250cm9sIG9yYml0cyBhcm91bmRcblx0Ly8gYW5kIHdoZXJlIGl0IHBhbnMgd2l0aCByZXNwZWN0IHRvLlxuXHR0aGlzLnRhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0Ly8gY2VudGVyIGlzIG9sZCwgZGVwcmVjYXRlZDsgdXNlIFwidGFyZ2V0XCIgaW5zdGVhZFxuXHR0aGlzLmNlbnRlciA9IHRoaXMudGFyZ2V0O1xuXG5cdC8vIFRoaXMgb3B0aW9uIGFjdHVhbGx5IGVuYWJsZXMgZG9sbHlpbmcgaW4gYW5kIG91dDsgbGVmdCBhcyBcInpvb21cIiBmb3Jcblx0Ly8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblx0dGhpcy5ub1pvb20gPSBmYWxzZTtcblx0dGhpcy56b29tU3BlZWQgPSAxLjA7XG5cblx0Ly8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0ICggUGVyc3BlY3RpdmVDYW1lcmEgb25seSApXG5cdHRoaXMubWluRGlzdGFuY2UgPSAwO1xuXHR0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cblx0Ly8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiB6b29tIGluIGFuZCBvdXQgKCBPcnRob2dyYXBoaWNDYW1lcmEgb25seSApXG5cdHRoaXMubWluWm9vbSA9IDA7XG5cdHRoaXMubWF4Wm9vbSA9IEluZmluaXR5O1xuXG5cdC8vIFNldCB0byB0cnVlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG5cdHRoaXMubm9Sb3RhdGUgPSBmYWxzZTtcblx0dGhpcy5yb3RhdGVTcGVlZCA9IC0wLjE1O1xuXG5cdC8vIFNldCB0byB0cnVlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG5cdHRoaXMubm9QYW4gPSB0cnVlO1xuXHR0aGlzLmtleVBhblNwZWVkID0gNy4wO1x0Ly8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxuXG5cdC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG5cdHRoaXMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuXHR0aGlzLmF1dG9Sb3RhdGVTcGVlZCA9IDIuMDsgLy8gMzAgc2Vjb25kcyBwZXIgcm91bmQgd2hlbiBmcHMgaXMgNjBcblxuXHQvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cblx0Ly8gUmFuZ2UgaXMgMCB0byBNYXRoLlBJIHJhZGlhbnMuXG5cdHRoaXMubWluUG9sYXJBbmdsZSA9IDA7IC8vIHJhZGlhbnNcblx0dGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xuXG5cdC8vIE1vbWVudHVtXG4gIFx0dGhpcy5tb21lbnR1bURhbXBpbmdGYWN0b3IgPSAwLjkwO1xuICBcdHRoaXMubW9tZW50dW1TY2FsaW5nRmFjdG9yID0gLTAuMDA1O1xuICBcdHRoaXMubW9tZW50dW1LZXlkb3duRmFjdG9yID0gMjA7XG5cbiAgXHQvLyBGb3ZcbiAgXHR0aGlzLm1pbkZvdiA9IDMwO1xuICBcdHRoaXMubWF4Rm92ID0gMTIwO1xuXG5cdC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCBob3Jpem9udGFsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG5cdC8vIElmIHNldCwgbXVzdCBiZSBhIHN1Yi1pbnRlcnZhbCBvZiB0aGUgaW50ZXJ2YWwgWyAtIE1hdGguUEksIE1hdGguUEkgXS5cblx0dGhpcy5taW5BemltdXRoQW5nbGUgPSAtIEluZmluaXR5OyAvLyByYWRpYW5zXG5cdHRoaXMubWF4QXppbXV0aEFuZ2xlID0gSW5maW5pdHk7IC8vIHJhZGlhbnNcblxuXHQvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHVzZSBvZiB0aGUga2V5c1xuXHR0aGlzLm5vS2V5cyA9IGZhbHNlO1xuXG5cdC8vIFRoZSBmb3VyIGFycm93IGtleXNcblx0dGhpcy5rZXlzID0geyBMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIEJPVFRPTTogNDAgfTtcblxuXHQvLyBNb3VzZSBidXR0b25zXG5cdHRoaXMubW91c2VCdXR0b25zID0geyBPUkJJVDogVEhSRUUuTU9VU0UuTEVGVCwgWk9PTTogVEhSRUUuTU9VU0UuTUlERExFLCBQQU46IFRIUkVFLk1PVVNFLlJJR0hUIH07XG5cblx0Ly8vLy8vLy8vLy8vXG5cdC8vIGludGVybmFsc1xuXG5cdHZhciBzY29wZSA9IHRoaXM7XG5cblx0dmFyIEVQUyA9IDEwZS04O1xuXHR2YXIgTUVQUyA9IDEwZS01O1xuXG5cdHZhciByb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdHZhciByb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgcm90YXRlRGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdHZhciBwYW5TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdHZhciBwYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgcGFuRGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgcGFuT2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHR2YXIgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHR2YXIgZG9sbHlTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdHZhciBkb2xseUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdHZhciBkb2xseURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHR2YXIgdGhldGE7XG5cdHZhciBwaGk7XG5cdHZhciBwaGlEZWx0YSA9IDA7XG5cdHZhciB0aGV0YURlbHRhID0gMDtcblx0dmFyIHNjYWxlID0gMTtcblx0dmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0dmFyIGxhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHZhciBsYXN0UXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblx0dmFyIG1vbWVudHVtTGVmdCA9IDAsIG1vbWVudHVtVXAgPSAwO1xuXHR2YXIgZXZlbnRDdXJyZW50LCBldmVudFByZXZpb3VzO1xuXHR2YXIgbW9tZW50dW1PbiA9IGZhbHNlO1xuXG5cdHZhciBrZXlVcCwga2V5Qm90dG9tLCBrZXlMZWZ0LCBrZXlSaWdodDtcblxuXHR2YXIgU1RBVEUgPSB7IE5PTkUgOiAtMSwgUk9UQVRFIDogMCwgRE9MTFkgOiAxLCBQQU4gOiAyLCBUT1VDSF9ST1RBVEUgOiAzLCBUT1VDSF9ET0xMWSA6IDQsIFRPVUNIX1BBTiA6IDUgfTtcblxuXHR2YXIgc3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdC8vIGZvciByZXNldFxuXG5cdHRoaXMudGFyZ2V0MCA9IHRoaXMudGFyZ2V0LmNsb25lKCk7XG5cdHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcblx0dGhpcy56b29tMCA9IHRoaXMub2JqZWN0Lnpvb207XG5cblx0Ly8gc28gY2FtZXJhLnVwIGlzIHRoZSBvcmJpdCBheGlzXG5cblx0dmFyIHF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21Vbml0VmVjdG9ycyggb2JqZWN0LnVwLCBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMSwgMCApICk7XG5cdHZhciBxdWF0SW52ZXJzZSA9IHF1YXQuY2xvbmUoKS5pbnZlcnNlKCk7XG5cblx0Ly8gZXZlbnRzXG5cblx0dmFyIGNoYW5nZUV2ZW50ID0geyB0eXBlOiAnY2hhbmdlJyB9O1xuXHR2YXIgc3RhcnRFdmVudCA9IHsgdHlwZTogJ3N0YXJ0JyB9O1xuXHR2YXIgZW5kRXZlbnQgPSB7IHR5cGU6ICdlbmQnIH07XG5cblx0dGhpcy5zZXRMYXN0UXVhdGVybmlvbiA9IGZ1bmN0aW9uICggcXVhdGVybmlvbiApIHtcblx0XHRsYXN0UXVhdGVybmlvbi5jb3B5KCBxdWF0ZXJuaW9uICk7XG5cdFx0c2NvcGUub2JqZWN0LnF1YXRlcm5pb24uY29weSggcXVhdGVybmlvbiApO1xuXHR9O1xuXG5cdHRoaXMuZ2V0TGFzdFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBsYXN0UG9zaXRpb247XG5cdH1cblxuXHR0aGlzLnJvdGF0ZUxlZnQgPSBmdW5jdGlvbiAoIGFuZ2xlICkge1xuXG5cdFx0aWYgKCBhbmdsZSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRhbmdsZSA9IGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCk7XG5cblx0XHR9XG5cblx0XHR0aGV0YURlbHRhIC09IGFuZ2xlO1xuXG5cblx0fTtcblxuXHR0aGlzLnJvdGF0ZVVwID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGlmICggYW5nbGUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0YW5nbGUgPSBnZXRBdXRvUm90YXRpb25BbmdsZSgpO1xuXG5cdFx0fVxuXG5cdFx0cGhpRGVsdGEgLT0gYW5nbGU7XG5cblx0fTtcblxuXHQvLyBwYXNzIGluIGRpc3RhbmNlIGluIHdvcmxkIHNwYWNlIHRvIG1vdmUgbGVmdFxuXHR0aGlzLnBhbkxlZnQgPSBmdW5jdGlvbiAoIGRpc3RhbmNlICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5vYmplY3QubWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0Ly8gZ2V0IFggY29sdW1uIG9mIG1hdHJpeFxuXHRcdHBhbk9mZnNldC5zZXQoIHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0gKTtcblx0XHRwYW5PZmZzZXQubXVsdGlwbHlTY2FsYXIoIC0gZGlzdGFuY2UgKTtcblxuXHRcdHBhbi5hZGQoIHBhbk9mZnNldCApO1xuXG5cdH07XG5cblx0Ly8gcGFzcyBpbiBkaXN0YW5jZSBpbiB3b3JsZCBzcGFjZSB0byBtb3ZlIHVwXG5cdHRoaXMucGFuVXAgPSBmdW5jdGlvbiAoIGRpc3RhbmNlICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5vYmplY3QubWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0Ly8gZ2V0IFkgY29sdW1uIG9mIG1hdHJpeFxuXHRcdHBhbk9mZnNldC5zZXQoIHRlWyA0IF0sIHRlWyA1IF0sIHRlWyA2IF0gKTtcblx0XHRwYW5PZmZzZXQubXVsdGlwbHlTY2FsYXIoIGRpc3RhbmNlICk7XG5cblx0XHRwYW4uYWRkKCBwYW5PZmZzZXQgKTtcblxuXHR9O1xuXG5cdC8vIHBhc3MgaW4geCx5IG9mIGNoYW5nZSBkZXNpcmVkIGluIHBpeGVsIHNwYWNlLFxuXHQvLyByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcblx0dGhpcy5wYW4gPSBmdW5jdGlvbiAoIGRlbHRhWCwgZGVsdGFZICkge1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XG5cblx0XHRpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhICkge1xuXG5cdFx0XHQvLyBwZXJzcGVjdGl2ZVxuXHRcdFx0dmFyIHBvc2l0aW9uID0gc2NvcGUub2JqZWN0LnBvc2l0aW9uO1xuXHRcdFx0dmFyIG9mZnNldCA9IHBvc2l0aW9uLmNsb25lKCkuc3ViKCBzY29wZS50YXJnZXQgKTtcblx0XHRcdHZhciB0YXJnZXREaXN0YW5jZSA9IG9mZnNldC5sZW5ndGgoKTtcblxuXHRcdFx0Ly8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG5cdFx0XHR0YXJnZXREaXN0YW5jZSAqPSBNYXRoLnRhbiggKCBzY29wZS5vYmplY3QuZm92IC8gMiApICogTWF0aC5QSSAvIDE4MC4wICk7XG5cblx0XHRcdC8vIHdlIGFjdHVhbGx5IGRvbid0IHVzZSBzY3JlZW5XaWR0aCwgc2luY2UgcGVyc3BlY3RpdmUgY2FtZXJhIGlzIGZpeGVkIHRvIHNjcmVlbiBoZWlnaHRcblx0XHRcdHNjb3BlLnBhbkxlZnQoIDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XG5cdFx0XHRzY29wZS5wYW5VcCggMiAqIGRlbHRhWSAqIHRhcmdldERpc3RhbmNlIC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKTtcblxuXHRcdH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuXHRcdFx0Ly8gb3J0aG9ncmFwaGljXG5cdFx0XHRzY29wZS5wYW5MZWZ0KCBkZWx0YVggKiAoc2NvcGUub2JqZWN0LnJpZ2h0IC0gc2NvcGUub2JqZWN0LmxlZnQpIC8gZWxlbWVudC5jbGllbnRXaWR0aCApO1xuXHRcdFx0c2NvcGUucGFuVXAoIGRlbHRhWSAqIChzY29wZS5vYmplY3QudG9wIC0gc2NvcGUub2JqZWN0LmJvdHRvbSkgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gY2FtZXJhIG5laXRoZXIgb3J0aG9ncmFwaGljIG9yIHBlcnNwZWN0aXZlXG5cdFx0XHRjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBwYW4gZGlzYWJsZWQuJyApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5tb21lbnR1bSA9IGZ1bmN0aW9uKCl7XG5cdFx0XG5cdFx0aWYgKCAhbW9tZW50dW1PbiApIHJldHVybjtcblxuXHRcdGlmICggTWF0aC5hYnMoIG1vbWVudHVtTGVmdCApIDwgTUVQUyAmJiBNYXRoLmFicyggbW9tZW50dW1VcCApIDwgTUVQUyApIHsgXG5cblx0XHRcdG1vbWVudHVtT24gPSBmYWxzZTsgXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bW9tZW50dW1VcCAgICo9IHRoaXMubW9tZW50dW1EYW1waW5nRmFjdG9yO1xuXHRcdG1vbWVudHVtTGVmdCAqPSB0aGlzLm1vbWVudHVtRGFtcGluZ0ZhY3RvcjtcblxuXHRcdHRoZXRhRGVsdGEgLT0gdGhpcy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgKiBtb21lbnR1bUxlZnQ7XG5cdFx0cGhpRGVsdGEgICAtPSB0aGlzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciAqIG1vbWVudHVtVXA7XG5cblx0fTtcblxuXHR0aGlzLmRvbGx5SW4gPSBmdW5jdGlvbiAoIGRvbGx5U2NhbGUgKSB7XG5cblx0XHRpZiAoIGRvbGx5U2NhbGUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0ZG9sbHlTY2FsZSA9IGdldFpvb21TY2FsZSgpO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSApIHtcblxuXHRcdFx0c2NhbGUgLz0gZG9sbHlTY2FsZTtcblxuXHRcdH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuXHRcdFx0c2NvcGUub2JqZWN0Lnpvb20gPSBNYXRoLm1heCggdGhpcy5taW5ab29tLCBNYXRoLm1pbiggdGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tICogZG9sbHlTY2FsZSApICk7XG5cdFx0XHRzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1dBUk5JTkc6IE9yYml0Q29udHJvbHMuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5kb2xseU91dCA9IGZ1bmN0aW9uICggZG9sbHlTY2FsZSApIHtcblxuXHRcdGlmICggZG9sbHlTY2FsZSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRkb2xseVNjYWxlID0gZ2V0Wm9vbVNjYWxlKCk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhICkge1xuXG5cdFx0XHRzY2FsZSAqPSBkb2xseVNjYWxlO1xuXG5cdFx0fSBlbHNlIGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhICkge1xuXG5cdFx0XHRzY29wZS5vYmplY3Quem9vbSA9IE1hdGgubWF4KCB0aGlzLm1pblpvb20sIE1hdGgubWluKCB0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gLyBkb2xseVNjYWxlICkgKTtcblx0XHRcdHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnV0FSTklORzogT3JiaXRDb250cm9scy5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICggaWdub3JlVXBkYXRlICkge1xuXG5cdFx0dmFyIHBvc2l0aW9uID0gdGhpcy5vYmplY3QucG9zaXRpb247XG5cblx0XHRvZmZzZXQuY29weSggcG9zaXRpb24gKS5zdWIoIHRoaXMudGFyZ2V0ICk7XG5cblx0XHQvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2Vcblx0XHRvZmZzZXQuYXBwbHlRdWF0ZXJuaW9uKCBxdWF0ICk7XG5cblx0XHQvLyBhbmdsZSBmcm9tIHotYXhpcyBhcm91bmQgeS1heGlzXG5cblx0XHR0aGV0YSA9IE1hdGguYXRhbjIoIG9mZnNldC54LCBvZmZzZXQueiApO1xuXG5cdFx0Ly8gYW5nbGUgZnJvbSB5LWF4aXNcblxuXHRcdHBoaSA9IE1hdGguYXRhbjIoIE1hdGguc3FydCggb2Zmc2V0LnggKiBvZmZzZXQueCArIG9mZnNldC56ICogb2Zmc2V0LnogKSwgb2Zmc2V0LnkgKTtcblxuXHRcdGlmICggdGhpcy5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FICkge1xuXG5cdFx0XHR0aGlzLnJvdGF0ZUxlZnQoIGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMubW9tZW50dW0oKTtcblxuXHRcdHRoZXRhICs9IHRoZXRhRGVsdGE7XG5cdFx0cGhpICs9IHBoaURlbHRhO1xuXG5cdFx0Ly8gcmVzdHJpY3QgdGhldGEgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuXHRcdHRoZXRhID0gTWF0aC5tYXgoIHRoaXMubWluQXppbXV0aEFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhBemltdXRoQW5nbGUsIHRoZXRhICkgKTtcblxuXHRcdC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG5cdFx0cGhpID0gTWF0aC5tYXgoIHRoaXMubWluUG9sYXJBbmdsZSwgTWF0aC5taW4oIHRoaXMubWF4UG9sYXJBbmdsZSwgcGhpICkgKTtcblxuXHRcdC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWUgRVBTIGFuZCBQSS1FUFNcblx0XHRwaGkgPSBNYXRoLm1heCggRVBTLCBNYXRoLm1pbiggTWF0aC5QSSAtIEVQUywgcGhpICkgKTtcblxuXHRcdHZhciByYWRpdXMgPSBvZmZzZXQubGVuZ3RoKCkgKiBzY2FsZTtcblxuXHRcdC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG5cdFx0cmFkaXVzID0gTWF0aC5tYXgoIHRoaXMubWluRGlzdGFuY2UsIE1hdGgubWluKCB0aGlzLm1heERpc3RhbmNlLCByYWRpdXMgKSApO1xuXG5cdFx0Ly8gbW92ZSB0YXJnZXQgdG8gcGFubmVkIGxvY2F0aW9uXG5cdFx0dGhpcy50YXJnZXQuYWRkKCBwYW4gKTtcblxuXHRcdG9mZnNldC54ID0gcmFkaXVzICogTWF0aC5zaW4oIHBoaSApICogTWF0aC5zaW4oIHRoZXRhICk7XG5cdFx0b2Zmc2V0LnkgPSByYWRpdXMgKiBNYXRoLmNvcyggcGhpICk7XG5cdFx0b2Zmc2V0LnogPSByYWRpdXMgKiBNYXRoLnNpbiggcGhpICkgKiBNYXRoLmNvcyggdGhldGEgKTtcblxuXHRcdC8vIHJvdGF0ZSBvZmZzZXQgYmFjayB0byBcImNhbWVyYS11cC12ZWN0b3ItaXMtdXBcIiBzcGFjZVxuXHRcdG9mZnNldC5hcHBseVF1YXRlcm5pb24oIHF1YXRJbnZlcnNlICk7XG5cblx0XHRwb3NpdGlvbi5jb3B5KCB0aGlzLnRhcmdldCApLmFkZCggb2Zmc2V0ICk7XG5cblx0XHR0aGlzLm9iamVjdC5sb29rQXQoIHRoaXMudGFyZ2V0ICk7XG5cblx0XHR0aGV0YURlbHRhID0gMDtcblx0XHRwaGlEZWx0YSA9IDA7XG5cdFx0c2NhbGUgPSAxO1xuXHRcdHBhbi5zZXQoIDAsIDAsIDAgKTtcblxuXHRcdC8vIHVwZGF0ZSBjb25kaXRpb24gaXM6XG5cdFx0Ly8gbWluKGNhbWVyYSBkaXNwbGFjZW1lbnQsIGNhbWVyYSByb3RhdGlvbiBpbiByYWRpYW5zKV4yID4gRVBTXG5cdFx0Ly8gdXNpbmcgc21hbGwtYW5nbGUgYXBwcm94aW1hdGlvbiBjb3MoeC8yKSA9IDEgLSB4XjIgLyA4XG5cdFx0aWYgKCBsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQoIHRoaXMub2JqZWN0LnBvc2l0aW9uICkgPiBFUFNcblx0XHQgICAgfHwgOCAqICgxIC0gbGFzdFF1YXRlcm5pb24uZG90KHRoaXMub2JqZWN0LnF1YXRlcm5pb24pKSA+IEVQUyApIHtcblxuXHRcdFx0aWdub3JlVXBkYXRlICE9PSB0cnVlICYmIHRoaXMuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuXHRcdFx0bGFzdFBvc2l0aW9uLmNvcHkoIHRoaXMub2JqZWN0LnBvc2l0aW9uICk7XG5cdFx0XHRsYXN0UXVhdGVybmlvbi5jb3B5ICh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uICk7XG5cblx0XHR9XG5cblx0fTtcblxuXG5cdHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHR0aGlzLnRhcmdldC5jb3B5KCB0aGlzLnRhcmdldDAgKTtcblx0XHR0aGlzLm9iamVjdC5wb3NpdGlvbi5jb3B5KCB0aGlzLnBvc2l0aW9uMCApO1xuXHRcdHRoaXMub2JqZWN0Lnpvb20gPSB0aGlzLnpvb20wO1xuXG5cdFx0dGhpcy5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fTtcblxuXHR0aGlzLmdldFBvbGFyQW5nbGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gcGhpO1xuXG5cdH07XG5cblx0dGhpcy5nZXRBemltdXRoYWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGV0YVxuXG5cdH07XG5cblx0ZnVuY3Rpb24gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSB7XG5cblx0XHRyZXR1cm4gMiAqIE1hdGguUEkgLyA2MCAvIDYwICogc2NvcGUuYXV0b1JvdGF0ZVNwZWVkO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBnZXRab29tU2NhbGUoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5wb3coIDAuOTUsIHNjb3BlLnpvb21TcGVlZCApO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBvbk1vdXNlRG93biggZXZlbnQgKSB7XG5cblx0XHRtb21lbnR1bU9uID0gZmFsc2U7XG5cbiAgIFx0XHRtb21lbnR1bUxlZnQgPSBtb21lbnR1bVVwID0gMDtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICggZXZlbnQuYnV0dG9uID09PSBzY29wZS5tb3VzZUJ1dHRvbnMuT1JCSVQgKSB7XG5cdFx0XHRpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRzdGF0ZSA9IFNUQVRFLlJPVEFURTtcblxuXHRcdFx0cm90YXRlU3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cblx0XHR9IGVsc2UgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5aT09NICkge1xuXHRcdFx0aWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG5cblx0XHRcdHN0YXRlID0gU1RBVEUuRE9MTFk7XG5cblx0XHRcdGRvbGx5U3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cblx0XHR9IGVsc2UgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5QQU4gKSB7XG5cdFx0XHRpZiAoIHNjb3BlLm5vUGFuID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRzdGF0ZSA9IFNUQVRFLlBBTjtcblxuXHRcdFx0cGFuU3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHN0YXRlICE9PSBTVEFURS5OT05FICkge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0c2NvcGUudXBkYXRlKCk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIG9uTW91c2VNb3ZlKCBldmVudCApIHtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XG5cblx0XHRpZiAoIHN0YXRlID09PSBTVEFURS5ST1RBVEUgKSB7XG5cblx0XHRcdGlmICggc2NvcGUubm9Sb3RhdGUgPT09IHRydWUgKSByZXR1cm47XG5cblx0XHRcdHJvdGF0ZUVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblx0XHRcdHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMoIHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQgKTtcblxuXHRcdFx0Ly8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuXHRcdFx0c2NvcGUucm90YXRlTGVmdCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG5cblx0XHRcdC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuXHRcdFx0c2NvcGUucm90YXRlVXAoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogc2NvcGUucm90YXRlU3BlZWQgKTtcblxuXHRcdFx0cm90YXRlU3RhcnQuY29weSggcm90YXRlRW5kICk7XG5cblx0XHRcdGlmKCBldmVudFByZXZpb3VzICl7XG5cdFx0XHRcdG1vbWVudHVtTGVmdCA9IGV2ZW50LmNsaWVudFggLSBldmVudFByZXZpb3VzLmNsaWVudFg7XG5cdFx0XHRcdG1vbWVudHVtVXAgPSBldmVudC5jbGllbnRZIC0gZXZlbnRQcmV2aW91cy5jbGllbnRZO1xuXHRcdFx0fVxuXG5cdFx0XHRldmVudFByZXZpb3VzID0gZXZlbnQ7XG5cblx0XHR9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuRE9MTFkgKSB7XG5cblx0XHRcdGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRkb2xseUVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblx0XHRcdGRvbGx5RGVsdGEuc3ViVmVjdG9ycyggZG9sbHlFbmQsIGRvbGx5U3RhcnQgKTtcblxuXHRcdFx0aWYgKCBkb2xseURlbHRhLnkgPiAwICkge1xuXG5cdFx0XHRcdHNjb3BlLmRvbGx5SW4oKTtcblxuXHRcdFx0fSBlbHNlIGlmICggZG9sbHlEZWx0YS55IDwgMCApIHtcblxuXHRcdFx0XHRzY29wZS5kb2xseU91dCgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGRvbGx5U3RhcnQuY29weSggZG9sbHlFbmQgKTtcblxuXHRcdH0gZWxzZSBpZiAoIHN0YXRlID09PSBTVEFURS5QQU4gKSB7XG5cblx0XHRcdGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSByZXR1cm47XG5cblx0XHRcdHBhbkVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblx0XHRcdHBhbkRlbHRhLnN1YlZlY3RvcnMoIHBhbkVuZCwgcGFuU3RhcnQgKTtcblxuXHRcdFx0c2NvcGUucGFuKCBwYW5EZWx0YS54LCBwYW5EZWx0YS55ICk7XG5cblx0XHRcdHBhblN0YXJ0LmNvcHkoIHBhbkVuZCApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBzdGF0ZSAhPT0gU1RBVEUuTk9ORSApIHNjb3BlLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBvbk1vdXNlVXAoIC8qIGV2ZW50ICovICkge1xuXG5cdFx0bW9tZW50dW1PbiA9IHRydWU7XG5cblx0XHRldmVudFByZXZpb3VzID0gdW5kZWZpbmVkO1xuXG5cdFx0aWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UgKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcblx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCBlbmRFdmVudCApO1xuXHRcdHN0YXRlID0gU1RBVEUuTk9ORTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gb25Nb3VzZVdoZWVsKCBldmVudCApIHtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgfHwgc2NvcGUubm9ab29tID09PSB0cnVlIHx8IHN0YXRlICE9PSBTVEFURS5OT05FICkgcmV0dXJuO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdHZhciBkZWx0YSA9IDA7XG5cblx0XHRpZiAoIGV2ZW50LndoZWVsRGVsdGEgIT09IHVuZGVmaW5lZCApIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cblx0XHRcdGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YTtcblxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCAhPT0gdW5kZWZpbmVkICkgeyAvLyBGaXJlZm94XG5cblx0XHRcdGRlbHRhID0gLSBldmVudC5kZXRhaWw7XG5cblx0XHR9XG5cblx0XHRpZiAoIGRlbHRhID4gMCApIHtcblxuXHRcdFx0Ly9zY29wZS5kb2xseU91dCgpO1xuXHRcdFx0c2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA8IHNjb3BlLm1heEZvdiApIFxuXHRcdFx0XHQ/IHNjb3BlLm9iamVjdC5mb3YgKyAxXG5cdFx0XHRcdDogc2NvcGUubWF4Rm92O1xuXHRcdFx0c2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdH0gZWxzZSBpZiAoIGRlbHRhIDwgMCApIHtcblxuXHRcdFx0Ly9zY29wZS5kb2xseUluKCk7XG5cdFx0XHRzY29wZS5vYmplY3QuZm92ID0gKCBzY29wZS5vYmplY3QuZm92ID4gc2NvcGUubWluRm92ICkgXG5cdFx0XHRcdD8gc2NvcGUub2JqZWN0LmZvdiAtIDFcblx0XHRcdFx0OiBzY29wZS5taW5Gb3Y7XG5cdFx0XHRzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdFx0fVxuXG5cdFx0c2NvcGUudXBkYXRlKCk7XG5cdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG5cdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggZW5kRXZlbnQgKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gb25LZXlVcCAoIGV2ZW50ICkge1xuXG5cdFx0c3dpdGNoICggZXZlbnQua2V5Q29kZSApIHtcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLlVQOlxuXHRcdFx0XHRrZXlVcCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLkJPVFRPTTpcblx0XHRcdFx0a2V5Qm90dG9tID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIHNjb3BlLmtleXMuTEVGVDpcblx0XHRcdFx0a2V5TGVmdCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLlJJR0hUOlxuXHRcdFx0XHRrZXlSaWdodCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gb25LZXlEb3duKCBldmVudCApIHtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgfHwgc2NvcGUubm9LZXlzID09PSB0cnVlIHx8IHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0c3dpdGNoICggZXZlbnQua2V5Q29kZSApIHtcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLlVQOlxuXHRcdFx0XHRrZXlVcCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIHNjb3BlLmtleXMuQk9UVE9NOlxuXHRcdFx0XHRrZXlCb3R0b20gPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLkxFRlQ6XG5cdFx0XHRcdGtleUxlZnQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBzY29wZS5rZXlzLlJJR0hUOlxuXHRcdFx0XHRrZXlSaWdodCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0fVxuXG5cdFx0aWYgKGtleVVwIHx8IGtleUJvdHRvbSB8fCBrZXlMZWZ0IHx8IGtleVJpZ2h0KSB7XG5cblx0XHRcdG1vbWVudHVtT24gPSB0cnVlO1xuXG5cdFx0XHRpZiAoa2V5VXApIG1vbWVudHVtVXAgPSAtIHNjb3BlLnJvdGF0ZVNwZWVkICogc2NvcGUubW9tZW50dW1LZXlkb3duRmFjdG9yO1xuXHRcdFx0aWYgKGtleUJvdHRvbSkgbW9tZW50dW1VcCA9IHNjb3BlLnJvdGF0ZVNwZWVkICogc2NvcGUubW9tZW50dW1LZXlkb3duRmFjdG9yO1xuXHRcdFx0aWYgKGtleUxlZnQpIG1vbWVudHVtTGVmdCA9IC0gc2NvcGUucm90YXRlU3BlZWQgKiBzY29wZS5tb21lbnR1bUtleWRvd25GYWN0b3I7XG5cdFx0XHRpZiAoa2V5UmlnaHQpIG1vbWVudHVtTGVmdCA9IHNjb3BlLnJvdGF0ZVNwZWVkICogc2NvcGUubW9tZW50dW1LZXlkb3duRmFjdG9yO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiB0b3VjaHN0YXJ0KCBldmVudCApIHtcblxuXHRcdG1vbWVudHVtT24gPSBmYWxzZTtcblxuXHRcdG1vbWVudHVtTGVmdCA9IG1vbWVudHVtVXAgPSAwO1xuXG5cdFx0aWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdHN3aXRjaCAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkge1xuXG5cdFx0XHRjYXNlIDE6XHQvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG5cdFx0XHRcdGlmICggc2NvcGUubm9Sb3RhdGUgPT09IHRydWUgKSByZXR1cm47XG5cblx0XHRcdFx0c3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cblx0XHRcdFx0cm90YXRlU3RhcnQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAyOlx0Ly8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG5cdFx0XHRcdGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xuXG5cdFx0XHRcdHN0YXRlID0gU1RBVEUuVE9VQ0hfRE9MTFk7XG5cblx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuXHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG5cdFx0XHRcdHZhciBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblxuXHRcdFx0XHRkb2xseVN0YXJ0LnNldCggMCwgZGlzdGFuY2UgKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cblx0XHRcdFx0aWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcblxuXHRcdFx0XHRzdGF0ZSA9IFNUQVRFLlRPVUNIX1BBTjtcblxuXHRcdFx0XHRwYW5TdGFydC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdHN0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdH1cblxuXHRcdGlmICggc3RhdGUgIT09IFNUQVRFLk5PTkUgKSBzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHRvdWNobW92ZSggZXZlbnQgKSB7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdHZhciBlbGVtZW50ID0gc2NvcGUuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyBzY29wZS5kb21FbGVtZW50LmJvZHkgOiBzY29wZS5kb21FbGVtZW50O1xuXG5cdFx0c3dpdGNoICggZXZlbnQudG91Y2hlcy5sZW5ndGggKSB7XG5cblx0XHRcdGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuXHRcdFx0XHRpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXHRcdFx0XHRpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9ST1RBVEUgKSByZXR1cm47XG5cblx0XHRcdFx0cm90YXRlRW5kLnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcblx0XHRcdFx0cm90YXRlRGVsdGEuc3ViVmVjdG9ycyggcm90YXRlRW5kLCByb3RhdGVTdGFydCApO1xuXG5cdFx0XHRcdC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcblx0XHRcdFx0c2NvcGUucm90YXRlTGVmdCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG5cdFx0XHRcdC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuXHRcdFx0XHRzY29wZS5yb3RhdGVVcCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXG5cdFx0XHRcdHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xuXG5cdFx0XHRcdGlmKCBldmVudFByZXZpb3VzICl7XG5cdFx0XHRcdFx0bW9tZW50dW1MZWZ0ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnRQcmV2aW91cy5wYWdlWDtcblx0XHRcdFx0XHRtb21lbnR1bVVwID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnRQcmV2aW91cy5wYWdlWTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGV2ZW50UHJldmlvdXMgPSB7XG5cdFx0XHRcdFx0cGFnZVg6IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCxcblx0XHRcdFx0XHRwYWdlWTogZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNjb3BlLnVwZGF0ZSgpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cblx0XHRcdFx0aWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG5cdFx0XHRcdGlmICggc3RhdGUgIT09IFNUQVRFLlRPVUNIX0RPTExZICkgcmV0dXJuO1xuXG5cdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcblx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHR2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG5cblx0XHRcdFx0ZG9sbHlFbmQuc2V0KCAwLCBkaXN0YW5jZSApO1xuXHRcdFx0XHRkb2xseURlbHRhLnN1YlZlY3RvcnMoIGRvbGx5RW5kLCBkb2xseVN0YXJ0ICk7XG5cblx0XHRcdFx0aWYgKCBkb2xseURlbHRhLnkgPCAwICkge1xuXG5cdFx0XHRcdFx0c2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA8IHNjb3BlLm1heEZvdiApIFxuXHRcdFx0XHRcdFx0PyBzY29wZS5vYmplY3QuZm92ICsgMVxuXHRcdFx0XHRcdFx0OiBzY29wZS5tYXhGb3Y7XG5cdFx0XHRcdFx0c2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2xseURlbHRhLnkgPiAwICkge1xuXG5cdFx0XHRcdFx0c2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA+IHNjb3BlLm1pbkZvdiApIFxuXHRcdFx0XHRcdFx0PyBzY29wZS5vYmplY3QuZm92IC0gMVxuXHRcdFx0XHRcdFx0OiBzY29wZS5taW5Gb3Y7XG5cdFx0XHRcdFx0c2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZG9sbHlTdGFydC5jb3B5KCBkb2xseUVuZCApO1xuXG5cdFx0XHRcdHNjb3BlLnVwZGF0ZSgpO1xuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cblx0XHRcdFx0aWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcblx0XHRcdFx0aWYgKCBzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUEFOICkgcmV0dXJuO1xuXG5cdFx0XHRcdHBhbkVuZC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG5cdFx0XHRcdHBhbkRlbHRhLnN1YlZlY3RvcnMoIHBhbkVuZCwgcGFuU3RhcnQgKTtcblxuXHRcdFx0XHRzY29wZS5wYW4oIHBhbkRlbHRhLngsIHBhbkRlbHRhLnkgKTtcblxuXHRcdFx0XHRwYW5TdGFydC5jb3B5KCBwYW5FbmQgKTtcblxuXHRcdFx0XHRzY29wZS51cGRhdGUoKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0c3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiB0b3VjaGVuZCggLyogZXZlbnQgKi8gKSB7XG5cblx0XHRtb21lbnR1bU9uID0gdHJ1ZTtcblxuXHRcdGV2ZW50UHJldmlvdXMgPSB1bmRlZmluZWQ7XG5cblx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggZW5kRXZlbnQgKTtcblx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0fVxuXG5cdC8vdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIGZ1bmN0aW9uICggZXZlbnQgKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH0sIGZhbHNlICk7XG5cdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24sIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCBvbk1vdXNlV2hlZWwsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTU1vdXNlU2Nyb2xsJywgb25Nb3VzZVdoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTsgLy8gZmlyZWZveFxuXG5cdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdG91Y2hlbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRvdWNobW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsIG9uS2V5VXAsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBvbktleURvd24sIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG5cdC8vIGZvcmNlIGFuIHVwZGF0ZSBhdCBzdGFydFxuXHR0aGlzLnVwZGF0ZSgpO1xuXG59O1xuXG5PcmJpdENvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBPcmJpdENvbnRyb2xzXG5cbn0gKTtcblxuZXhwb3J0IHsgT3JiaXRDb250cm9scyB9OyIsImltcG9ydCAndGhyZWUnO1xuXG5mdW5jdGlvbiBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzICggY2FtZXJhLCBkb21FbGVtZW50ICkge1xuXG5cdHZhciBzY29wZSA9IHRoaXM7XG5cdHZhciBjaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblxuXHR2YXIgcm90WSA9IDA7XG5cdHZhciByb3RYID0gMDtcblx0dmFyIHRlbXBYID0gMDtcblx0dmFyIHRlbXBZID0gMDtcblxuXHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblx0dGhpcy5jYW1lcmEucm90YXRpb24ucmVvcmRlciggXCJZWFpcIiApO1xuXHR0aGlzLmRvbUVsZW1lbnQgPSAoIGRvbUVsZW1lbnQgIT09IHVuZGVmaW5lZCApID8gZG9tRWxlbWVudCA6IGRvY3VtZW50O1xuXG5cdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cblx0dGhpcy5kZXZpY2VPcmllbnRhdGlvbiA9IHt9O1xuXHR0aGlzLnNjcmVlbk9yaWVudGF0aW9uID0gMDtcblxuXHR0aGlzLmFscGhhID0gMDtcblx0dGhpcy5hbHBoYU9mZnNldEFuZ2xlID0gMDtcblxuXG5cdHZhciBvbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRzY29wZS5kZXZpY2VPcmllbnRhdGlvbiA9IGV2ZW50O1xuXG5cdH07XG5cblx0dmFyIG9uU2NyZWVuT3JpZW50YXRpb25DaGFuZ2VFdmVudCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0c2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPSB3aW5kb3cub3JpZW50YXRpb24gfHwgMDtcblxuXHR9O1xuXG5cdHZhciBvblRvdWNoU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdHRlbXBYID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYO1xuXHRcdHRlbXBZID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZO1xuXG5cdH07XG5cblx0dmFyIG9uVG91Y2hNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRyb3RZICs9IFRIUkVFLk1hdGguZGVnVG9SYWQoICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gdGVtcFggKSAvIDQgKTtcblx0XHRyb3RYICs9IFRIUkVFLk1hdGguZGVnVG9SYWQoICggdGVtcFkgLSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKSAvIDQgKTtcblxuXHRcdHNjb3BlLnVwZGF0ZUFscGhhT2Zmc2V0QW5nbGUoIHJvdFkgKTtcblxuXHRcdHRlbXBYID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYO1xuXHRcdHRlbXBZID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZO1xuXG5cdH07XG5cblx0Ly8gVGhlIGFuZ2xlcyBhbHBoYSwgYmV0YSBhbmQgZ2FtbWEgZm9ybSBhIHNldCBvZiBpbnRyaW5zaWMgVGFpdC1CcnlhbiBhbmdsZXMgb2YgdHlwZSBaLVgnLVknJ1xuXG5cdHZhciBzZXRDYW1lcmFRdWF0ZXJuaW9uID0gZnVuY3Rpb24oIHF1YXRlcm5pb24sIGFscGhhLCBiZXRhLCBnYW1tYSwgb3JpZW50ICkge1xuXG5cdFx0dmFyIHplZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAwLCAxICk7XG5cblx0XHR2YXIgZXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoKTtcblxuXHRcdHZhciBxMCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblx0XHR2YXIgcTEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbiggLSBNYXRoLnNxcnQoIDAuNSApLCAwLCAwLCBNYXRoLnNxcnQoIDAuNSApICk7IC8vIC0gUEkvMiBhcm91bmQgdGhlIHgtYXhpc1xuXG5cdFx0dmFyIHZlY3RvckZpbmdlclk7XG5cdFx0dmFyIGZpbmdlclFZID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0XHR2YXIgZmluZ2VyUVggPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0aWYgKCBzY29wZS5zY3JlZW5PcmllbnRhdGlvbiA9PSAwICkge1xuXG5cdFx0XHR2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDEsIDAsIDAgKTtcblx0XHRcdGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIC1yb3RYICk7XG5cblx0XHR9IGVsc2UgaWYgKCBzY29wZS5zY3JlZW5PcmllbnRhdGlvbiA9PSAxODAgKSB7XG5cblx0XHRcdHZlY3RvckZpbmdlclkgPSBuZXcgVEhSRUUuVmVjdG9yMyggMSwgMCwgMCApO1xuXHRcdFx0ZmluZ2VyUVkuc2V0RnJvbUF4aXNBbmdsZSggdmVjdG9yRmluZ2VyWSwgcm90WCApO1xuXG5cdFx0fSBlbHNlIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gOTAgKSB7XG5cblx0XHRcdHZlY3RvckZpbmdlclkgPSBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMSwgMCApO1xuXHRcdFx0ZmluZ2VyUVkuc2V0RnJvbUF4aXNBbmdsZSggdmVjdG9yRmluZ2VyWSwgcm90WCApO1xuXG5cdFx0fSBlbHNlIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gLSA5MCkge1xuXG5cdFx0XHR2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKTtcblx0XHRcdGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIC1yb3RYICk7XG5cblx0XHR9XG5cblx0XHRxMS5tdWx0aXBseSggZmluZ2VyUVkgKTtcblx0XHRxMS5tdWx0aXBseSggZmluZ2VyUVggKTtcblxuXHRcdGV1bGVyLnNldCggYmV0YSwgYWxwaGEsIC0gZ2FtbWEsICdZWFonICk7IC8vICdaWFknIGZvciB0aGUgZGV2aWNlLCBidXQgJ1lYWicgZm9yIHVzXG5cblx0XHRxdWF0ZXJuaW9uLnNldEZyb21FdWxlciggZXVsZXIgKTsgLy8gb3JpZW50IHRoZSBkZXZpY2VcblxuXHRcdHF1YXRlcm5pb24ubXVsdGlwbHkoIHExICk7IC8vIGNhbWVyYSBsb29rcyBvdXQgdGhlIGJhY2sgb2YgdGhlIGRldmljZSwgbm90IHRoZSB0b3BcblxuXHRcdHF1YXRlcm5pb24ubXVsdGlwbHkoIHEwLnNldEZyb21BeGlzQW5nbGUoIHplZSwgLSBvcmllbnQgKSApOyAvLyBhZGp1c3QgZm9yIHNjcmVlbiBvcmllbnRhdGlvblxuXG5cdH07XG5cblx0dGhpcy5jb25uZWN0ID0gZnVuY3Rpb24oKSB7XG5cblx0XHRvblNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlRXZlbnQoKTsgLy8gcnVuIG9uY2Ugb24gbG9hZFxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9uU2NyZWVuT3JpZW50YXRpb25DaGFuZ2VFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2RldmljZW9yaWVudGF0aW9uJywgb25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZUV2ZW50LCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cblx0XHRzY29wZS5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnRFdmVudCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0c2NvcGUuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZUV2ZW50LCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblxuXHRcdHNjb3BlLmVuYWJsZWQgPSB0cnVlO1xuXG5cdH07XG5cblx0dGhpcy5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG5cblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgb25TY3JlZW5PcmllbnRhdGlvbkNoYW5nZUV2ZW50LCBmYWxzZSApO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCBvbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlRXZlbnQsIGZhbHNlICk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMudXBkYXRlLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblxuXHRcdHNjb3BlLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydEV2ZW50LCBmYWxzZSApO1xuXHRcdHNjb3BlLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmVFdmVudCwgZmFsc2UgKTtcblxuXHRcdHNjb3BlLmVuYWJsZWQgPSBmYWxzZTtcblxuXHR9O1xuXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oIGlnbm9yZVVwZGF0ZSApIHtcblxuXHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHR2YXIgYWxwaGEgPSBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5hbHBoYSA/IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmFscGhhICkgKyBzY29wZS5hbHBoYU9mZnNldEFuZ2xlIDogMDsgLy8gWlxuXHRcdHZhciBiZXRhID0gc2NvcGUuZGV2aWNlT3JpZW50YXRpb24uYmV0YSA/IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmJldGEgKSA6IDA7IC8vIFgnXG5cdFx0dmFyIGdhbW1hID0gc2NvcGUuZGV2aWNlT3JpZW50YXRpb24uZ2FtbWEgPyBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5nYW1tYSApIDogMDsgLy8gWScnXG5cdFx0dmFyIG9yaWVudCA9IHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID8gVEhSRUUuTWF0aC5kZWdUb1JhZCggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gKSA6IDA7IC8vIE9cblxuXHRcdHNldENhbWVyYVF1YXRlcm5pb24oIHNjb3BlLmNhbWVyYS5xdWF0ZXJuaW9uLCBhbHBoYSwgYmV0YSwgZ2FtbWEsIG9yaWVudCApO1xuXHRcdHNjb3BlLmFscGhhID0gYWxwaGE7XG5cblx0XHRpZ25vcmVVcGRhdGUgIT09IHRydWUgJiYgc2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuXHR9O1xuXG5cdHRoaXMudXBkYXRlQWxwaGFPZmZzZXRBbmdsZSA9IGZ1bmN0aW9uKCBhbmdsZSApIHtcblxuXHRcdHRoaXMuYWxwaGFPZmZzZXRBbmdsZSA9IGFuZ2xlO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fTtcblxuXHR0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuZGlzY29ubmVjdCgpO1xuXG5cdH07XG5cblx0dGhpcy5jb25uZWN0KCk7XG5cbn07XG5cbkRldmljZU9yaWVudGF0aW9uQ29udHJvbHMucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSksIHtcblxuXHRjb25zdHJ1Y3RvcjogRGV2aWNlT3JpZW50YXRpb25Db250cm9sc1xuXG59ICk7XG5cbmV4cG9ydCB7IERldmljZU9yaWVudGF0aW9uQ29udHJvbHMgfTsiLCJcbmltcG9ydCAndGhyZWUnO1xuXG5mdW5jdGlvbiBDYXJkYm9hcmRFZmZlY3QgKCByZW5kZXJlciApIHtcblxuXHR2YXIgX2NhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIC0gMSwgMSwgMSwgLSAxLCAwLCAxICk7XG5cblx0dmFyIF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG5cdHZhciBfc3RlcmVvID0gbmV3IFRIUkVFLlN0ZXJlb0NhbWVyYSgpO1xuXHRfc3RlcmVvLmFzcGVjdCA9IDAuNTtcblxuXHR2YXIgX3BhcmFtcyA9IHsgbWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlciwgZm9ybWF0OiBUSFJFRS5SR0JBRm9ybWF0IH07XG5cblx0dmFyIF9yZW5kZXJUYXJnZXQgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQoIDUxMiwgNTEyLCBfcGFyYW1zICk7XG5cdF9yZW5kZXJUYXJnZXQuc2Npc3NvclRlc3QgPSB0cnVlO1xuXHRfcmVuZGVyVGFyZ2V0LnRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XG5cblx0Ly8gRGlzdG9ydGlvbiBNZXNoIHBvcnRlZCBmcm9tOlxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vYm9yaXNtdXMvd2VidnItYm9pbGVycGxhdGUvYmxvYi9tYXN0ZXIvc3JjL2Rpc3RvcnRpb24vYmFycmVsLWRpc3RvcnRpb24tZnJhZ21lbnQuanNcblxuXHR2YXIgZGlzdG9ydGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCAwLjQ0MSwgMC4xNTYgKTtcblxuXHR2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMSwgMSwgMTAsIDIwICkucmVtb3ZlQXR0cmlidXRlKCAnbm9ybWFsJyApLnRvTm9uSW5kZXhlZCgpO1xuXG5cdHZhciBwb3NpdGlvbnMgPSBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5O1xuXHR2YXIgdXZzID0gZ2VvbWV0cnkuYXR0cmlidXRlcy51di5hcnJheTtcblxuXHQvLyBkdXBsaWNhdGVcblx0Z2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAqPSAyO1xuXHRnZW9tZXRyeS5hdHRyaWJ1dGVzLnV2LmNvdW50ICo9IDI7XG5cblx0dmFyIHBvc2l0aW9uczIgPSBuZXcgRmxvYXQzMkFycmF5KCBwb3NpdGlvbnMubGVuZ3RoICogMiApO1xuXHRwb3NpdGlvbnMyLnNldCggcG9zaXRpb25zICk7XG5cdHBvc2l0aW9uczIuc2V0KCBwb3NpdGlvbnMsIHBvc2l0aW9ucy5sZW5ndGggKTtcblxuXHR2YXIgdXZzMiA9IG5ldyBGbG9hdDMyQXJyYXkoIHV2cy5sZW5ndGggKiAyICk7XG5cdHV2czIuc2V0KCB1dnMgKTtcblx0dXZzMi5zZXQoIHV2cywgdXZzLmxlbmd0aCApO1xuXG5cdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR2YXIgbGVuZ3RoID0gcG9zaXRpb25zLmxlbmd0aCAvIDM7XG5cblx0Zm9yICggdmFyIGkgPSAwLCBsID0gcG9zaXRpb25zMi5sZW5ndGggLyAzOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdHZlY3Rvci54ID0gcG9zaXRpb25zMlsgaSAqIDMgKyAwIF07XG5cdFx0dmVjdG9yLnkgPSBwb3NpdGlvbnMyWyBpICogMyArIDEgXTtcblxuXHRcdHZhciBkb3QgPSB2ZWN0b3IuZG90KCB2ZWN0b3IgKTtcblx0XHR2YXIgc2NhbGFyID0gMS41ICsgKCBkaXN0b3J0aW9uLnggKyBkaXN0b3J0aW9uLnkgKiBkb3QgKSAqIGRvdDtcblxuXHRcdHZhciBvZmZzZXQgPSBpIDwgbGVuZ3RoID8gMCA6IDE7XG5cblx0XHRwb3NpdGlvbnMyWyBpICogMyArIDAgXSA9ICggdmVjdG9yLnggLyBzY2FsYXIgKSAqIDEuNSAtIDAuNSArIG9mZnNldDtcblx0XHRwb3NpdGlvbnMyWyBpICogMyArIDEgXSA9ICggdmVjdG9yLnkgLyBzY2FsYXIgKSAqIDMuMDtcblxuXHRcdHV2czJbIGkgKiAyIF0gPSAoIHV2czJbIGkgKiAyIF0gKyBvZmZzZXQgKSAqIDAuNTtcblxuXHR9XG5cblx0Z2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheSA9IHBvc2l0aW9uczI7XG5cdGdlb21ldHJ5LmF0dHJpYnV0ZXMudXYuYXJyYXkgPSB1dnMyO1xuXG5cdC8vXG5cblx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IG1hcDogX3JlbmRlclRhcmdldC50ZXh0dXJlIH0gKTtcblx0dmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cdF9zY2VuZS5hZGQoIG1lc2ggKTtcblxuXHQvL1xuXG5cdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcblxuXHRcdHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcblxuXHRcdHZhciBwaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xuXG5cdFx0X3JlbmRlclRhcmdldC5zZXRTaXplKCB3aWR0aCAqIHBpeGVsUmF0aW8sIGhlaWdodCAqIHBpeGVsUmF0aW8gKTtcblxuXHR9O1xuXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG5cdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gbnVsbCApIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0X3N0ZXJlby51cGRhdGUoIGNhbWVyYSApO1xuXG5cdFx0dmFyIHdpZHRoID0gX3JlbmRlclRhcmdldC53aWR0aCAvIDI7XG5cdFx0dmFyIGhlaWdodCA9IF9yZW5kZXJUYXJnZXQuaGVpZ2h0O1xuXG5cdFx0aWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXG5cdFx0X3JlbmRlclRhcmdldC5zY2lzc29yLnNldCggMCwgMCwgd2lkdGgsIGhlaWdodCApO1xuXHRcdF9yZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCAwLCAwLCB3aWR0aCwgaGVpZ2h0ICk7XG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBfcmVuZGVyVGFyZ2V0ICk7XG5cdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgX3N0ZXJlby5jYW1lcmFMICk7XG5cblx0XHRyZW5kZXJlci5jbGVhckRlcHRoKCk7XG5cblx0XHRfcmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCB3aWR0aCwgMCwgd2lkdGgsIGhlaWdodCApO1xuXHRcdF9yZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCB3aWR0aCwgMCwgd2lkdGgsIGhlaWdodCApO1xuXHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggX3JlbmRlclRhcmdldCApO1xuXHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIF9zdGVyZW8uY2FtZXJhUiApO1xuXG5cdFx0cmVuZGVyZXIuY2xlYXJEZXB0aCgpO1xuXG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0cmVuZGVyZXIucmVuZGVyKCBfc2NlbmUsIF9jYW1lcmEgKTtcblx0fTtcblxufTtcblxuZXhwb3J0IHsgQ2FyZGJvYXJkRWZmZWN0IH07IiwiaW1wb3J0ICd0aHJlZSc7XG5cbmNvbnN0IFN0ZXJlb0VmZmVjdCA9IGZ1bmN0aW9uICggcmVuZGVyZXIgKSB7XG5cblx0dmFyIF9zdGVyZW8gPSBuZXcgVEhSRUUuU3RlcmVvQ2FtZXJhKCk7XG5cdF9zdGVyZW8uYXNwZWN0ID0gMC41O1xuXHR2YXIgc2l6ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0dGhpcy5zZXRFeWVTZXBhcmF0aW9uID0gZnVuY3Rpb24gKCBleWVTZXAgKSB7XG5cblx0XHRfc3RlcmVvLmV5ZVNlcCA9IGV5ZVNlcDtcblxuXHR9O1xuXG5cdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcblxuXHRcdHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcblxuXHR9O1xuXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG5cdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gbnVsbCApIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0X3N0ZXJlby51cGRhdGUoIGNhbWVyYSApO1xuXG5cdFx0cmVuZGVyZXIuZ2V0U2l6ZSggc2l6ZSApO1xuXG5cdFx0aWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXHRcdHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCB0cnVlICk7XG5cblx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCAwLCAwLCBzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgKTtcblx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggMCwgMCwgc2l6ZS53aWR0aCAvIDIsIHNpemUuaGVpZ2h0ICk7XG5cdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgX3N0ZXJlby5jYW1lcmFMICk7XG5cblx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCBzaXplLndpZHRoIC8gMiwgMCwgc2l6ZS53aWR0aCAvIDIsIHNpemUuaGVpZ2h0ICk7XG5cdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIHNpemUud2lkdGggLyAyLCAwLCBzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgKTtcblx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBfc3RlcmVvLmNhbWVyYVIgKTtcblxuXHRcdHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCBmYWxzZSApO1xuXG5cdH07XG5cbn07XG5cbmV4cG9ydCB7IFN0ZXJlb0VmZmVjdCB9OyIsImltcG9ydCB7IE1PREVTLCBDT05UUk9MUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vbGliL2NvbnRyb2xzL09yYml0Q29udHJvbHMnO1xuaW1wb3J0IHsgRGV2aWNlT3JpZW50YXRpb25Db250cm9scyB9IGZyb20gJy4uL2xpYi9jb250cm9scy9EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzJztcbmltcG9ydCB7IENhcmRib2FyZEVmZmVjdCB9IGZyb20gJy4uL2xpYi9lZmZlY3RzL0NhcmRib2FyZEVmZmVjdCc7XG5pbXBvcnQgeyBTdGVyZW9FZmZlY3QgfSBmcm9tICcuLi9saWIvZWZmZWN0cy9TdGVyZW9FZmZlY3QnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vd2lkZ2V0L1dpZGdldCc7XG5pbXBvcnQgeyBSZXRpY2xlIH0gZnJvbSAnLi4vaW50ZXJmYWNlL1JldGljbGUnO1xuaW1wb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuLi9wYW5vcmFtYS9QYW5vcmFtYSc7XG5pbXBvcnQgeyBWaWRlb1Bhbm9yYW1hIH0gZnJvbSAnLi4vcGFub3JhbWEvVmlkZW9QYW5vcmFtYSc7XG5pbXBvcnQgeyBDYW1lcmFQYW5vcmFtYSB9IGZyb20gJy4uL3Bhbm9yYW1hL0NhbWVyYVBhbm9yYW1hJztcbmltcG9ydCAndGhyZWUnO1xuXG4vKipcbiAqIFZpZXdlciBjb250YWlucyBwcmUtZGVmaW5lZCBzY2VuZSwgY2FtZXJhIGFuZCByZW5kZXJlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gVXNlIGN1c3RvbSBvciBkZWZhdWx0IGNvbmZpZyBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0aW9ucy5jb250YWluZXJdIC0gQSBIVE1MRWxlbWVudCB0byBob3N0IHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7VEhSRUUuU2NlbmV9IFtvcHRpb25zLnNjZW5lPVRIUkVFLlNjZW5lXSAtIEEgVEhSRUUuU2NlbmUgd2hpY2ggY29udGFpbnMgcGFub3JhbWEgYW5kIDNEIG9iamVjdHNcbiAqIEBwYXJhbSB7VEhSRUUuQ2FtZXJhfSBbb3B0aW9ucy5jYW1lcmE9VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmFdIC0gQSBUSFJFRS5DYW1lcmEgdG8gdmlldyB0aGUgc2NlbmVcbiAqIEBwYXJhbSB7VEhSRUUuV2ViR0xSZW5kZXJlcn0gW29wdGlvbnMucmVuZGVyZXI9VEhSRUUuV2ViR0xSZW5kZXJlcl0gLSBBIFRIUkVFLldlYkdMUmVuZGVyZXIgdG8gcmVuZGVyIGNhbnZhc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jb250cm9sQmFyPXRydWVdIC0gU2hvdy9oaWRlIGNvbnRyb2wgYmFyIG9uIHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIHthcnJheX0gICBbb3B0aW9ucy5jb250cm9sQnV0dG9ucz1bXV0gLSBCdXR0b24gbmFtZXMgdG8gbW91bnQgb24gY29udHJvbEJhciBpZiBjb250cm9sQmFyIGV4aXN0cywgRGVmYXVsdHMgdG8gWydmdWxsc2NyZWVuJywgJ3NldHRpbmcnLCAndmlkZW8nXVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvSGlkZUNvbnRyb2xCYXI9ZmFsc2VdIC0gQXV0byBoaWRlIGNvbnRyb2wgYmFyIHdoZW4gY2xpY2sgb24gbm9uLWFjdGl2ZSBhcmVhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9IaWRlSW5mb3Nwb3Q9dHJ1ZV0gLSBBdXRvIGhpZGUgaW5mb3Nwb3RzIHdoZW4gY2xpY2sgb24gbm9uLWFjdGl2ZSBhcmVhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmhvcml6b250YWxWaWV3PWZhbHNlXSAtIEFsbG93IG9ubHkgaG9yaXpvbnRhbCBjYW1lcmEgY29udHJvbFxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5jbGlja1RvbGVyYW5jZT0xMF0gLSBEaXN0YW5jZSB0b2xlcmFuY2UgdG8gdGlnZ2VyIGNsaWNrIC8gdGFwIGV2ZW50XG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmNhbWVyYUZvdj02MF0gLSBDYW1lcmEgZmllbGQgb2YgdmlldyB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXZlcnNlRHJhZ2dpbmc9ZmFsc2VdIC0gUmV2ZXJzZSBkcmFnZ2luZyBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZW5hYmxlUmV0aWNsZT1mYWxzZV0gLSBFbmFibGUgcmV0aWNsZSBmb3IgbW91c2VsZXNzIGludGVyYWN0aW9uIG90aGVyIHRoYW4gVlIgbW9kZVxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5kd2VsbFRpbWU9MTUwMF0gLSBEd2VsbCB0aW1lIGZvciByZXRpY2xlIHNlbGVjdGlvbiBpbiBtc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvUmV0aWNsZVNlbGVjdD10cnVlXSAtIEF1dG8gc2VsZWN0IGEgY2xpY2thYmxlIHRhcmdldCBhZnRlciBkd2VsbFRpbWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlld0luZGljYXRvcj1mYWxzZV0gLSBBZGRzIGFuIGFuZ2xlIHZpZXcgaW5kaWNhdG9yIGluIHVwcGVyIGxlZnQgY29ybmVyXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmluZGljYXRvclNpemU9MzBdIC0gU2l6ZSBvZiBWaWV3IEluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9ICBbb3B0aW9ucy5vdXRwdXQ9J25vbmUnXSAtIFdoZXRoZXIgYW5kIHdoZXJlIHRvIG91dHB1dCByYXljYXN0IHBvc2l0aW9uLiBDb3VsZCBiZSAnY29uc29sZScgb3IgJ292ZXJsYXknXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9Sb3RhdGU9ZmFsc2VdIC0gQXV0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSAgW29wdGlvbnMuYXV0b1JvdGF0ZVNwZWVkPTIuMF0gLSBBdXRvIHJvdGF0ZSBzcGVlZCBhcyBpbiBkZWdyZWUgcGVyIHNlY29uZC4gUG9zaXRpdmUgaXMgY291bnRlci1jbG9ja3dpc2UgYW5kIG5lZ2F0aXZlIGlzIGNsb2Nrd2lzZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSAgW29wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbj01MDAwXSAtIER1cmF0aW9uIGJlZm9yZSBhdXRvIHJvdGF0YXRpb24gd2hlbiBubyB1c2VyIGludGVyYWN0aXZpdHkgaW4gbXNcbiAqL1xuZnVuY3Rpb24gVmlld2VyICggb3B0aW9ucyApIHtcblxuXHRUSFJFRS5FdmVudERpc3BhdGNoZXIuY2FsbCggdGhpcyApO1xuXG5cdGxldCBjb250YWluZXI7XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdG9wdGlvbnMuY29udHJvbEJhciA9IG9wdGlvbnMuY29udHJvbEJhciAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jb250cm9sQmFyIDogdHJ1ZTtcblx0b3B0aW9ucy5jb250cm9sQnV0dG9ucyA9IG9wdGlvbnMuY29udHJvbEJ1dHRvbnMgfHwgWyAnZnVsbHNjcmVlbicsICdzZXR0aW5nJywgJ3ZpZGVvJyBdO1xuXHRvcHRpb25zLmF1dG9IaWRlQ29udHJvbEJhciA9IG9wdGlvbnMuYXV0b0hpZGVDb250cm9sQmFyICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmF1dG9IaWRlQ29udHJvbEJhciA6IGZhbHNlO1xuXHRvcHRpb25zLmF1dG9IaWRlSW5mb3Nwb3QgPSBvcHRpb25zLmF1dG9IaWRlSW5mb3Nwb3QgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXV0b0hpZGVJbmZvc3BvdCA6IHRydWU7XG5cdG9wdGlvbnMuaG9yaXpvbnRhbFZpZXcgPSBvcHRpb25zLmhvcml6b250YWxWaWV3ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmhvcml6b250YWxWaWV3IDogZmFsc2U7XG5cdG9wdGlvbnMuY2xpY2tUb2xlcmFuY2UgPSBvcHRpb25zLmNsaWNrVG9sZXJhbmNlIHx8IDEwO1xuXHRvcHRpb25zLmNhbWVyYUZvdiA9IG9wdGlvbnMuY2FtZXJhRm92IHx8IDYwO1xuXHRvcHRpb25zLnJldmVyc2VEcmFnZ2luZyA9IG9wdGlvbnMucmV2ZXJzZURyYWdnaW5nIHx8IGZhbHNlO1xuXHRvcHRpb25zLmVuYWJsZVJldGljbGUgPSBvcHRpb25zLmVuYWJsZVJldGljbGUgfHwgZmFsc2U7XG5cdG9wdGlvbnMuZHdlbGxUaW1lID0gb3B0aW9ucy5kd2VsbFRpbWUgfHwgMTUwMDtcblx0b3B0aW9ucy5hdXRvUmV0aWNsZVNlbGVjdCA9IG9wdGlvbnMuYXV0b1JldGljbGVTZWxlY3QgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXV0b1JldGljbGVTZWxlY3QgOiB0cnVlO1xuXHRvcHRpb25zLnZpZXdJbmRpY2F0b3IgPSBvcHRpb25zLnZpZXdJbmRpY2F0b3IgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMudmlld0luZGljYXRvciA6IGZhbHNlO1xuXHRvcHRpb25zLmluZGljYXRvclNpemUgPSBvcHRpb25zLmluZGljYXRvclNpemUgfHwgMzA7XG5cdG9wdGlvbnMub3V0cHV0ID0gb3B0aW9ucy5vdXRwdXQgPyBvcHRpb25zLm91dHB1dCA6ICdub25lJztcblx0b3B0aW9ucy5hdXRvUm90YXRlID0gb3B0aW9ucy5hdXRvUm90YXRlIHx8IGZhbHNlO1xuXHRvcHRpb25zLmF1dG9Sb3RhdGVTcGVlZCA9IG9wdGlvbnMuYXV0b1JvdGF0ZVNwZWVkIHx8IDIuMDtcblx0b3B0aW9ucy5hdXRvUm90YXRlQWN0aXZhdGlvbkR1cmF0aW9uID0gb3B0aW9ucy5hdXRvUm90YXRlQWN0aXZhdGlvbkR1cmF0aW9uIHx8IDUwMDA7XG5cblx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHQvLyBDU1MgSWNvblxuXHQvL2NvbnN0IHN0eWxlTG9hZGVyID0gbmV3IFBBTk9MRU5TLlN0eWxlTG9hZGVyKCk7XG5cdC8vc3R5bGVMb2FkZXIuaW5qZWN0KCAnaWNvbm8nICk7XG5cblx0Ly8gQ29udGFpbmVyXG5cdGlmICggb3B0aW9ucy5jb250YWluZXIgKSB7XG5cblx0XHRjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lcjtcblx0XHRjb250YWluZXIuX3dpZHRoID0gY29udGFpbmVyLmNsaWVudFdpZHRoO1xuXHRcdGNvbnRhaW5lci5faGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuXHR9IGVsc2Uge1xuXG5cdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRjb250YWluZXIuY2xhc3NMaXN0LmFkZCggJ3Bhbm9sZW5zLWNvbnRhaW5lcicgKTtcblx0XHRjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblx0XHRjb250YWluZXIuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0Y29udGFpbmVyLl9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggY29udGFpbmVyICk7XG5cblx0fVxuXG5cdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG5cdHRoaXMuY2FtZXJhID0gb3B0aW9ucy5jYW1lcmEgfHwgbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCB0aGlzLm9wdGlvbnMuY2FtZXJhRm92LCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCwgMSwgMTAwMDAgKTtcblx0dGhpcy5zY2VuZSA9IG9wdGlvbnMuc2NlbmUgfHwgbmV3IFRIUkVFLlNjZW5lKCk7XG5cdHRoaXMucmVuZGVyZXIgPSBvcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB7IGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IGZhbHNlIH0gKTtcblx0dGhpcy5zY2VuZVJldGljbGUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuXHR0aGlzLnZpZXdJbmRpY2F0b3JTaXplID0gdGhpcy5vcHRpb25zLmluZGljYXRvclNpemU7XG5cblx0dGhpcy5yZXRpY2xlID0ge307XG5cdHRoaXMudGVtcEVuYWJsZVJldGljbGUgPSB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZTtcblxuXHR0aGlzLm1vZGUgPSBNT0RFUy5OT1JNQUw7XG5cblx0dGhpcy5PcmJpdENvbnRyb2xzO1xuXHR0aGlzLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHM7XG5cblx0dGhpcy5DYXJkYm9hcmRFZmZlY3Q7XG5cdHRoaXMuU3RlcmVvRWZmZWN0O1xuXG5cdHRoaXMuY29udHJvbHM7XG5cdHRoaXMuZWZmZWN0O1xuXHR0aGlzLnBhbm9yYW1hO1xuXHR0aGlzLndpZGdldDtcblxuXHR0aGlzLmhvdmVyT2JqZWN0O1xuXHR0aGlzLmluZm9zcG90O1xuXHR0aGlzLnByZXNzRW50aXR5T2JqZWN0O1xuXHR0aGlzLnByZXNzT2JqZWN0O1xuXG5cdHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuXHR0aGlzLnJheWNhc3RlclBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0dGhpcy51c2VyTW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHR0aGlzLnVwZGF0ZUNhbGxiYWNrcyA9IFtdO1xuXHR0aGlzLnJlcXVlc3RBbmltYXRpb25JZDtcblxuXHR0aGlzLmNhbWVyYUZydXN0dW0gPSBuZXcgVEhSRUUuRnJ1c3R1bSgpO1xuXHR0aGlzLmNhbWVyYVZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHR0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQ7XG5cblx0dGhpcy5vdXRwdXREaXZFbGVtZW50O1xuXG5cdHRoaXMudG91Y2hTdXBwb3J0ZWQgPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoO1xuXG5cdC8vIEhhbmRsZXIgcmVmZXJlbmNlc1xuXHR0aGlzLkhBTkRMRVJfTU9VU0VfRE9XTiA9IHRoaXMub25Nb3VzZURvd24uYmluZCggdGhpcyApO1xuXHR0aGlzLkhBTkRMRVJfTU9VU0VfVVAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICk7XG5cdHRoaXMuSEFORExFUl9NT1VTRV9NT1ZFID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICk7XG5cdHRoaXMuSEFORExFUl9XSU5ET1dfUkVTSVpFID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICk7XG5cdHRoaXMuSEFORExFUl9LRVlfRE9XTiA9IHRoaXMub25LZXlEb3duLmJpbmQoIHRoaXMgKTtcblx0dGhpcy5IQU5ETEVSX0tFWV9VUCA9IHRoaXMub25LZXlVcC5iaW5kKCB0aGlzICk7XG5cdHRoaXMuSEFORExFUl9UQVAgPSB0aGlzLm9uVGFwLmJpbmQoIHRoaXMsIHtcblx0XHRjbGllbnRYOiB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDIsXG5cdFx0Y2xpZW50WTogdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMlxuXHR9ICk7XG5cblx0Ly8gRmxhZyBmb3IgaW5mb3Nwb3Qgb3V0cHV0XG5cdHRoaXMuT1VUUFVUX0lORk9TUE9UID0gZmFsc2U7XG5cblx0Ly8gQW5pbWF0aW9uc1xuXHR0aGlzLnR3ZWVuTGVmdEFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbigpO1xuXHR0aGlzLnR3ZWVuVXBBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oKTtcblxuXHQvLyBSZW5kZXJlclxuXHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG5cdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuXHR0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwLCAwICk7XG5cdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XG5cblx0Ly8gQXBwZW5kIFJlbmRlcmVyIEVsZW1lbnQgdG8gY29udGFpbmVyXG5cdHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKCAncGFub2xlbnMtY2FudmFzJyApO1xuXHR0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdHRoaXMuY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcblx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCApO1xuXG5cdC8vIENhbWVyYSBDb250cm9sc1xuXHR0aGlzLk9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyggdGhpcy5jYW1lcmEsIHRoaXMuY29udGFpbmVyICk7XG5cdHRoaXMuT3JiaXRDb250cm9scy5pZCA9ICdvcmJpdCc7XG5cdHRoaXMuT3JiaXRDb250cm9scy5taW5EaXN0YW5jZSA9IDE7XG5cdHRoaXMuT3JiaXRDb250cm9scy5ub1BhbiA9IHRydWU7XG5cdHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGU7XG5cdHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlU3BlZWQgPSB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZVNwZWVkO1xuXG5cdHRoaXMuRGV2aWNlT3JpZW50YXRpb25Db250cm9scyA9IG5ldyBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzKCB0aGlzLmNhbWVyYSwgdGhpcy5jb250YWluZXIgKTtcblx0dGhpcy5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzLmlkID0gJ2RldmljZS1vcmllbnRhdGlvbic7XG5cdHRoaXMuRGV2aWNlT3JpZW50YXRpb25Db250cm9scy5lbmFibGVkID0gZmFsc2U7XG5cdHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAxO1xuXG5cdC8vIFJlZ2lzdGVyIGNoYW5nZSBldmVudCBpZiBwYXNzaXZlUmVuZXJpbmdcblx0aWYgKCB0aGlzLm9wdGlvbnMucGFzc2l2ZVJlbmRlcmluZyApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ3Bhc3NpdmVSZW5kZXJpbmcgaXMgbm93IGRlcHJlY2F0ZWQnICk7XG5cblx0fVxuXG5cdC8vIENvbnRyb2xzXG5cdHRoaXMuY29udHJvbHMgPSBbIHRoaXMuT3JiaXRDb250cm9scywgdGhpcy5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzIF07XG5cdHRoaXMuY29udHJvbCA9IHRoaXMuT3JiaXRDb250cm9scztcblxuXHQvLyBDYXJkYm9hcmQgZWZmZWN0XG5cdHRoaXMuQ2FyZGJvYXJkRWZmZWN0ID0gbmV3IENhcmRib2FyZEVmZmVjdCggdGhpcy5yZW5kZXJlciApO1xuXHR0aGlzLkNhcmRib2FyZEVmZmVjdC5zZXRTaXplKCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCwgdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0ICk7XG5cblx0Ly8gU3RlcmVvIGVmZmVjdFxuXHR0aGlzLlN0ZXJlb0VmZmVjdCA9IG5ldyBTdGVyZW9FZmZlY3QoIHRoaXMucmVuZGVyZXIgKTtcblx0dGhpcy5TdGVyZW9FZmZlY3Quc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuXG5cdHRoaXMuZWZmZWN0ID0gdGhpcy5DYXJkYm9hcmRFZmZlY3Q7XG5cblx0Ly8gQWRkIGRlZmF1bHQgaGlkZGVuIHJldGljbGVcblx0dGhpcy5hZGRSZXRpY2xlKCk7XG5cblx0Ly8gTG9jayBob3Jpem9udGFsIHZpZXdcblx0aWYgKCB0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbFZpZXcgKSB7XG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gMjtcblx0XHR0aGlzLk9yYml0Q29udHJvbHMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEkgLyAyO1xuXHR9XG5cblx0Ly8gQWRkIENvbnRyb2wgVUlcblx0aWYgKCB0aGlzLm9wdGlvbnMuY29udHJvbEJhciAhPT0gZmFsc2UgKSB7XG5cdFx0dGhpcy5hZGREZWZhdWx0Q29udHJvbEJhciggdGhpcy5vcHRpb25zLmNvbnRyb2xCdXR0b25zICk7XG5cdH1cblxuXHQvLyBBZGQgVmlldyBJbmRpY2F0b3Jcblx0aWYgKCB0aGlzLm9wdGlvbnMudmlld0luZGljYXRvciApIHtcblx0XHR0aGlzLmFkZFZpZXdJbmRpY2F0b3IoKTtcblx0fVxuXG5cdC8vIFJldmVyc2UgZHJhZ2dpbmcgZGlyZWN0aW9uXG5cdGlmICggdGhpcy5vcHRpb25zLnJldmVyc2VEcmFnZ2luZyApIHtcblx0XHR0aGlzLnJldmVyc2VEcmFnZ2luZ0RpcmVjdGlvbigpO1xuXHR9XG5cblx0Ly8gUmVnaXN0ZXIgZXZlbnQgaWYgcmV0aWNsZSBpcyBlbmFibGVkLCBvdGhlcndpc2UgZGVmYXVsdHMgdG8gbW91c2Vcblx0aWYgKCB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSApIHtcblx0XHR0aGlzLmVuYWJsZVJldGljbGVDb250cm9sKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHMoKTtcblx0fVxuXG5cdC8vIE91dHB1dCBpbmZvc3BvdCBwb3NpdGlvbiB0byBhbiBvdmVybGF5IGNvbnRhaW5lciBpZiBzcGVjaWZpZWRcblx0aWYgKCB0aGlzLm9wdGlvbnMub3V0cHV0ID09PSAnb3ZlcmxheScgKSB7XG5cdFx0dGhpcy5hZGRPdXRwdXRFbGVtZW50KCk7XG5cdH1cblxuXHQvLyBSZWdpc3RlciBkb20gZXZlbnQgbGlzdGVuZXJzXG5cdHRoaXMucmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuXG5cdC8vIEFuaW1hdGVcblx0dGhpcy5hbmltYXRlLmNhbGwoIHRoaXMgKTtcblxufTtcblxuVmlld2VyLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUgKSwge1xuXG5cdGNvbnN0cnVjdG9yOiBWaWV3ZXIsXG5cblx0LyoqXG5cdCAqIEFkZCBhbiBvYmplY3QgdG8gdGhlIHNjZW5lXG5cdCAqIEF1dG9tYXRpY2FsbHkgaG9va3VwIHdpdGggcGFub2xlbnMtdmlld2VyLWhhbmRsZXIgbGlzdGVuZXJcblx0ICogdG8gY29tbXVuaWNhdGUgd2l0aCB2aWV3ZXIgbWV0aG9kXG5cdCAqIEBwYXJhbSB7VEhSRUUuT2JqZWN0M0R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gYmUgYWRkZWRcblx0ICovXG5cdGFkZDogZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdHRoaXMuYWRkKCBhcmd1bWVudHNbIGkgXSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5zY2VuZS5hZGQoIG9iamVjdCApO1xuXG5cdFx0Ly8gQWxsIG9iamVjdCBhZGRlZCB0byBzY2VuZSBoYXMgJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJyBldmVudCB0byBoYW5kbGUgdmlld2VyIGNvbW11bmljYXRpb25cblx0XHRpZiAoIG9iamVjdC5hZGRFdmVudExpc3RlbmVyICkge1xuXG5cdFx0XHRvYmplY3QuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgdGhpcy5ldmVudEhhbmRsZXIuYmluZCggdGhpcyApICk7XG5cblx0XHR9XG5cblx0XHQvLyBBbGwgb2JqZWN0IGFkZGVkIHRvIHNjZW5lIGJlaW5nIHBhc3NlZCB3aXRoIGNvbnRhaW5lclxuXHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgUGFub3JhbWEgJiYgb2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1jb250YWluZXInLCBjb250YWluZXI6IHRoaXMuY29udGFpbmVyIH0gKTtcblxuXHRcdH1cblxuXHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgQ2FtZXJhUGFub3JhbWEgKSB7XG5cblx0XHRcdG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1zY2VuZScsIHNjZW5lOiB0aGlzLnNjZW5lIH0gKTtcblxuXHRcdH1cblxuXHRcdC8vIEhvb2t1cCBkZWZhdWx0IHBhbm9yYW1hIGV2ZW50IGxpc3RlbmVyc1xuXHRcdGlmICggb2JqZWN0LnR5cGUgPT09ICdwYW5vcmFtYScgKSB7XG5cblx0XHRcdHRoaXMuYWRkUGFub3JhbWFFdmVudExpc3RlbmVyKCBvYmplY3QgKTtcblxuXHRcdFx0aWYgKCAhdGhpcy5wYW5vcmFtYSApIHtcblxuXHRcdFx0XHR0aGlzLnNldFBhbm9yYW1hKCBvYmplY3QgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbiBvYmplY3QgZnJvbSB0aGUgc2NlbmVcblx0ICogQHBhcmFtICB7VEhSRUUuT2JqZWN0M0R9IG9iamVjdCAtIE9iamVjdCB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRyZW1vdmU6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG5cdFx0aWYgKCBvYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblxuXHRcdFx0b2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5zY2VuZS5yZW1vdmUoIG9iamVjdCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEFkZCBkZWZhdWx0IGNvbnRyb2wgYmFyXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gVGhlIGNvbnRyb2wgYnV0dG9ucyBhcnJheVxuXHQgKi9cblx0YWRkRGVmYXVsdENvbnRyb2xCYXI6IGZ1bmN0aW9uICggYXJyYXkgKSB7XG5cblx0XHRpZiAoIHRoaXMud2lkZ2V0ICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdEZWZhdWx0IGNvbnRyb2wgYmFyIGV4aXN0cycgKTtcblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdGNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoIHRoaXMuY29udGFpbmVyICk7XG5cdFx0d2lkZ2V0LmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmQoIHRoaXMgKSApO1xuXHRcdHdpZGdldC5hZGRDb250cm9sQmFyKCk7XG5cdFx0YXJyYXkuZm9yRWFjaCggYnV0dG9uTmFtZSA9PiB7XG5cblx0XHRcdHdpZGdldC5hZGRDb250cm9sQnV0dG9uKCBidXR0b25OYW1lICk7XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLndpZGdldCA9IHdpZGdldDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgYSBwYW5vcmFtYSB0byBiZSB0aGUgY3VycmVudCBvbmVcblx0ICogQHBhcmFtIHtQQU5PTEVOUy5QYW5vcmFtYX0gcGFubyAtIFBhbm9yYW1hIHRvIGJlIHNldFxuXHQgKi9cblx0c2V0UGFub3JhbWE6IGZ1bmN0aW9uICggcGFubyApIHtcblxuXHRcdGNvbnN0IGxlYXZpbmdQYW5vcmFtYSA9IHRoaXMucGFub3JhbWE7XG5cblx0XHRpZiAoIHBhbm8udHlwZSA9PT0gJ3Bhbm9yYW1hJyAmJiBsZWF2aW5nUGFub3JhbWEgIT09IHBhbm8gKSB7XG5cblx0XHRcdC8vIENsZWFyIGV4aXNpdGluZyBpbmZvc3BvdFxuXHRcdFx0dGhpcy5oaWRlSW5mb3Nwb3QoKTtcblxuXHRcdFx0Y29uc3QgYWZ0ZXJFbnRlckNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGxlYXZpbmdQYW5vcmFtYSAmJiBsZWF2aW5nUGFub3JhbWEub25MZWF2ZSgpO1xuXHRcdFx0XHRwYW5vLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgYWZ0ZXJFbnRlckNvbXBsZXRlICk7XG5cblx0XHRcdH07XG5cblx0XHRcdHBhbm8uYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCBhZnRlckVudGVyQ29tcGxldGUgKTtcblxuXHRcdFx0Ly8gQXNzaWduIGFuZCBlbnRlciBwYW5vcmFtYVxuXHRcdFx0KHRoaXMucGFub3JhbWEgPSBwYW5vKS5vbkVudGVyKCk7XG5cdFx0XHRcblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogRXZlbnQgaGFuZGxlciB0byBleGVjdXRlIGNvbW1hbmRzIGZyb20gY2hpbGQgb2JqZWN0c1xuXHQgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgZGlzcGF0Y2hlZCBldmVudCB3aXRoIG1ldGhvZCBhcyBmdW5jdGlvbiBuYW1lIGFuZCBkYXRhIGFzIGFuIGFyZ3VtZW50XG5cdCAqL1xuXHRldmVudEhhbmRsZXI6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRpZiAoIGV2ZW50Lm1ldGhvZCAmJiB0aGlzWyBldmVudC5tZXRob2QgXSApIHtcblxuXHRcdFx0dGhpc1sgZXZlbnQubWV0aG9kIF0oIGV2ZW50LmRhdGEgKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNwYXRjaCBldmVudCB0byBhbGwgZGVzY2VuZGFudHNcblx0ICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIEV2ZW50IHRvIGJlIHBhc3NlZCBhbG9uZ1xuXHQgKi9cblx0ZGlzcGF0Y2hFdmVudFRvQ2hpbGRyZW46IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHR0aGlzLnNjZW5lLnRyYXZlcnNlKCBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuXHRcdFx0aWYgKCBvYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHRvYmplY3QuZGlzcGF0Y2hFdmVudCggZXZlbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IHdpZGdldCBjb250ZW50XG5cdCAqIEBwYXJhbSAge2ludGVnZXJ9IGNvbnRyb2xJbmRleCAtIENvbnRyb2wgaW5kZXhcblx0ICogQHBhcmFtICB7UEFOT0xFTlMuTW9kZXN9IG1vZGUgLSBNb2RlcyBmb3IgZWZmZWN0c1xuXHQgKi9cblx0YWN0aXZhdGVXaWRnZXRJdGVtOiBmdW5jdGlvbiAoIGNvbnRyb2xJbmRleCwgbW9kZSApIHtcblxuXHRcdGNvbnN0IG1haW5NZW51ID0gdGhpcy53aWRnZXQubWFpbk1lbnU7XG5cdFx0Y29uc3QgQ29udHJvbE1lbnVJdGVtID0gbWFpbk1lbnUuY2hpbGRyZW5bIDAgXTtcblx0XHRjb25zdCBNb2RlTWVudUl0ZW0gPSBtYWluTWVudS5jaGlsZHJlblsgMSBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHRpZiAoIGNvbnRyb2xJbmRleCAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRzd2l0Y2ggKCBjb250cm9sSW5kZXggKSB7XG5cblx0XHRcdFx0Y2FzZSAwOlxuXG5cdFx0XHRcdFx0aXRlbSA9IENvbnRyb2xNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAxIF07XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDE6XG5cblx0XHRcdFx0XHRpdGVtID0gQ29udHJvbE1lbnVJdGVtLnN1Yk1lbnUuY2hpbGRyZW5bIDIgXTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0aXRlbSA9IENvbnRyb2xNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAxIF07XG5cblx0XHRcdFx0XHRicmVhaztcdFxuXG5cdFx0XHR9XG5cblx0XHRcdENvbnRyb2xNZW51SXRlbS5zdWJNZW51LnNldEFjdGl2ZUl0ZW0oIGl0ZW0gKVxuXHRcdFx0Q29udHJvbE1lbnVJdGVtLnNldFNlbGVjdGlvblRpdGxlKCBpdGVtLnRleHRDb250ZW50ICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIG1vZGUgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0c3dpdGNoKCBtb2RlICkge1xuXG5cdFx0XHRcdGNhc2UgTU9ERVMuQ0FSREJPQVJEOlxuXG5cdFx0XHRcdFx0aXRlbSA9IE1vZGVNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAyIF07XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIE1PREVTLlNURVJFTzpcblxuXHRcdFx0XHRcdGl0ZW0gPSBNb2RlTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMyBdO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0XHRpdGVtID0gTW9kZU1lbnVJdGVtLnN1Yk1lbnUuY2hpbGRyZW5bIDEgXTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRNb2RlTWVudUl0ZW0uc3ViTWVudS5zZXRBY3RpdmVJdGVtKCBpdGVtIClcblx0XHRcdE1vZGVNZW51SXRlbS5zZXRTZWxlY3Rpb25UaXRsZSggaXRlbS50ZXh0Q29udGVudCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEVuYWJsZSByZW5kZXJpbmcgZWZmZWN0XG5cdCAqIEBwYXJhbSAge1BBTk9MRU5TLk1vZGVzfSBtb2RlIC0gTW9kZXMgZm9yIGVmZmVjdHNcblx0ICovXG5cdGVuYWJsZUVmZmVjdDogZnVuY3Rpb24gKCBtb2RlICkge1xuXG5cdFx0aWYgKCB0aGlzLm1vZGUgPT09IG1vZGUgKSB7IHJldHVybjsgfVxuXHRcdGlmICggbW9kZSA9PT0gTU9ERVMuTk9STUFMICkgeyB0aGlzLmRpc2FibGVFZmZlY3QoKTsgcmV0dXJuOyB9XG5cdFx0ZWxzZSB7IHRoaXMubW9kZSA9IG1vZGU7IH1cblxuXHRcdGNvbnN0IGZvdiA9IHRoaXMuY2FtZXJhLmZvdjtcblxuXHRcdHN3aXRjaCggbW9kZSApIHtcblxuXHRcdFx0Y2FzZSBNT0RFUy5DQVJEQk9BUkQ6XG5cblx0XHRcdFx0dGhpcy5lZmZlY3QgPSB0aGlzLkNhcmRib2FyZEVmZmVjdDtcblx0XHRcdFx0dGhpcy5lbmFibGVSZXRpY2xlQ29udHJvbCgpO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIE1PREVTLlNURVJFTzpcblxuXHRcdFx0XHR0aGlzLmVmZmVjdCA9IHRoaXMuU3RlcmVvRWZmZWN0O1xuXHRcdFx0XHR0aGlzLmVuYWJsZVJldGljbGVDb250cm9sKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHR0aGlzLmVmZmVjdCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuZGlzYWJsZVJldGljbGVDb250cm9sKCk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHR9XG5cblx0XHR0aGlzLmFjdGl2YXRlV2lkZ2V0SXRlbSggdW5kZWZpbmVkLCB0aGlzLm1vZGUgKTtcblxuXHRcdC8qKlxuXHRcdCAqIER1YWwgZXllIGVmZmVjdCBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLkluZm9zcG90I3Bhbm9sZW5zLWR1YWwtZXllLWVmZmVjdFxuXHRcdCAqIEBwcm9wZXJ0eSB7UEFOT0xFTlMuTW9kZXN9IG1vZGUgLSBDdXJyZW50IGRpc3BsYXkgbW9kZVxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudFRvQ2hpbGRyZW4oIHsgdHlwZTogJ3Bhbm9sZW5zLWR1YWwtZXllLWVmZmVjdCcsIG1vZGU6IHRoaXMubW9kZSB9ICk7XG5cblx0XHQvLyBGb3JjZSBlZmZlY3Qgc3RlcmVvIGNhbWVyYSB0byB1cGRhdGUgYnkgcmVmcmVzaGluZyBmb3Zcblx0XHR0aGlzLmNhbWVyYS5mb3YgPSBmb3YgKyAxMGUtMztcblx0XHR0aGlzLmVmZmVjdC5zZXRTaXplKCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCwgdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0ICk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHR0aGlzLmNhbWVyYS5mb3YgPSBmb3Y7XG5cblx0XHQvKipcblx0XHQgKiBEaXNwYXRjaCBtb2RlIGNoYW5nZSBldmVudFxuXHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0ICogQGV2ZW50IFBBTk9MRU5TLlZpZXdlciNtb2RlLWNoYW5nZVxuXHRcdCAqIEBwcm9wZXJ0eSB7UEFOT0xFTlMuTW9kZXN9IG1vZGUgLSBDdXJyZW50IGRpc3BsYXkgbW9kZVxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnbW9kZS1jaGFuZ2UnLCBtb2RlOiB0aGlzLm1vZGUgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc2FibGUgYWRkaXRpb25hbCByZW5kZXJpbmcgZWZmZWN0XG5cdCAqL1xuXHRkaXNhYmxlRWZmZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuTk9STUFMICkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMubW9kZSA9IE1PREVTLk5PUk1BTDtcblx0XHR0aGlzLmRpc2FibGVSZXRpY2xlQ29udHJvbCgpO1xuXG5cdFx0dGhpcy5hY3RpdmF0ZVdpZGdldEl0ZW0oIHVuZGVmaW5lZCwgdGhpcy5tb2RlICk7XG5cblx0XHQvKipcblx0XHQgKiBEdWFsIGV5ZSBlZmZlY3QgZXZlbnRcblx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdCAqIEBldmVudCBQQU5PTEVOUy5JbmZvc3BvdCNwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3Rcblx0XHQgKiBAcHJvcGVydHkge1BBTk9MRU5TLk1vZGVzfSBtb2RlIC0gQ3VycmVudCBkaXNwbGF5IG1vZGVcblx0XHQgKi9cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnRUb0NoaWxkcmVuKCB7IHR5cGU6ICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCBtb2RlOiB0aGlzLm1vZGUgfSApO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCwgdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0ICk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblxuXHRcdC8qKlxuXHRcdCAqIERpc3BhdGNoIG1vZGUgY2hhbmdlIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI21vZGUtY2hhbmdlXG5cdFx0ICogQHByb3BlcnR5IHtQQU5PTEVOUy5Nb2Rlc30gbW9kZSAtIEN1cnJlbnQgZGlzcGxheSBtb2RlXG5cdFx0ICovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdtb2RlLWNoYW5nZScsIG1vZGU6IHRoaXMubW9kZSB9ICk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEVuYWJsZSByZXRpY2xlIGNvbnRyb2xcblx0ICovXG5cdGVuYWJsZVJldGljbGVDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIHRoaXMucmV0aWNsZS52aXNpYmxlICkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMudGVtcEVuYWJsZVJldGljbGUgPSB0cnVlO1xuXG5cdFx0Ly8gUmVnaXN0ZXIgcmV0aWNsZSBldmVudCBhbmQgdW5yZWdpc3RlciBtb3VzZSBldmVudFxuXHRcdHRoaXMudW5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHMoKTtcblx0XHR0aGlzLnJldGljbGUuc2hvdygpO1xuXHRcdHRoaXMucmVnaXN0ZXJSZXRpY2xlRXZlbnQoKTtcblx0XHR0aGlzLnVwZGF0ZVJldGljbGVFdmVudCgpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc2FibGUgcmV0aWNsZSBjb250cm9sXG5cdCAqL1xuXHRkaXNhYmxlUmV0aWNsZUNvbnRyb2w6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMudGVtcEVuYWJsZVJldGljbGUgPSBmYWxzZTtcblxuXHRcdC8vIFJlZ2lzdGVyIG1vdXNlIGV2ZW50IGFuZCB1bnJlZ2lzdGVyIHJldGljbGUgZXZlbnRcblx0XHRpZiAoICF0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSApIHtcblxuXHRcdFx0dGhpcy5yZXRpY2xlLmhpZGUoKTtcblx0XHRcdHRoaXMudW5yZWdpc3RlclJldGljbGVFdmVudCgpO1xuXHRcdFx0dGhpcy5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHMoKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMudXBkYXRlUmV0aWNsZUV2ZW50KCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogRW5hYmxlIGF1dG8gcm90YXRpb25cblx0ICovXG5cdGVuYWJsZUF1dG9SYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSA9IHRydWU7XG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLmF1dG9Sb3RhdGUgPSB0cnVlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERpc2FibGUgYXV0byByb3RhdGlvblxuXHQgKi9cblx0ZGlzYWJsZUF1dG9SYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjbGVhclRpbWVvdXQoIHRoaXMuYXV0b1JvdGF0ZVJlcXVlc3RJZCApO1xuXHRcdHRoaXMub3B0aW9ucy5hdXRvUm90YXRlID0gZmFsc2U7XG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgdmlkZW8gcGxheSBvciBzdG9wXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5WaWV3ZXIjdmlkZW8tdG9nZ2xlXG5cdCAqL1xuXHR0b2dnbGVWaWRlb1BsYXk6IGZ1bmN0aW9uICggcGF1c2UgKSB7XG5cblx0XHRpZiAoIHRoaXMucGFub3JhbWEgaW5zdGFuY2VvZiBWaWRlb1Bhbm9yYW1hICkge1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRvZ2dsZSB2aWRlbyBldmVudFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBldmVudCBQQU5PTEVOUy5WaWV3ZXIjdmlkZW8tdG9nZ2xlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMucGFub3JhbWEuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndmlkZW8tdG9nZ2xlJywgcGF1c2U6IHBhdXNlIH0gKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgY3VycmVudFRpbWUgaW4gYSB2aWRlb1xuXHQgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudGFnZSAtIFBlcmNlbnRhZ2Ugb2YgYSB2aWRlby4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5WaWV3ZXIjdmlkZW8tdGltZVxuXHQgKi9cblx0c2V0VmlkZW9DdXJyZW50VGltZTogZnVuY3Rpb24gKCBwZXJjZW50YWdlICkge1xuXG5cdFx0aWYgKCB0aGlzLnBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXR0aW5nIHZpZGVvIHRpbWUgZXZlbnRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLXRpbWVcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gUGVyY2VudGFnZSBvZiBhIHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5wYW5vcmFtYS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby10aW1lJywgcGVyY2VudGFnZTogcGVyY2VudGFnZSB9ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHZpZGVvIHVwZGF0ZXMgaWYgYW4gd2lkZ2V0IGlzIHByZXNlbnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBQZXJjZW50YWdlIG9mIGEgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuXHQgKiBAZmlyZXMgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLXVwZGF0ZVxuXHQgKi9cblx0b25WaWRlb1VwZGF0ZTogZnVuY3Rpb24gKCBwZXJjZW50YWdlICkge1xuXG5cdFx0LyoqXG5cdFx0ICogVmlkZW8gdXBkYXRlIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLXVwZGF0ZVxuXHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gUGVyY2VudGFnZSBvZiBhIHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcblx0XHQgKi9cblx0XHR0aGlzLndpZGdldCAmJiB0aGlzLndpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby11cGRhdGUnLCBwZXJjZW50YWdlOiBwZXJjZW50YWdlIH0gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBZGQgdXBkYXRlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0ICovXG5cdGFkZFVwZGF0ZUNhbGxiYWNrOiBmdW5jdGlvbiAoIGZuICkge1xuXG5cdFx0aWYgKCBmbiApIHtcblxuXHRcdFx0dGhpcy51cGRhdGVDYWxsYmFja3MucHVzaCggZm4gKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgdXBkYXRlIGNhbGxiYWNrXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG5cdCAqL1xuXHRyZW1vdmVVcGRhdGVDYWxsYmFjazogZnVuY3Rpb24gKCBmbiApIHtcblxuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy51cGRhdGVDYWxsYmFja3MuaW5kZXhPZiggZm4gKTtcblxuXHRcdGlmICggZm4gJiYgaW5kZXggPj0gMCApIHtcblxuXHRcdFx0dGhpcy51cGRhdGVDYWxsYmFja3Muc3BsaWNlKCBpbmRleCwgMSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNob3cgdmlkZW8gd2lkZ2V0XG5cdCAqL1xuXHRzaG93VmlkZW9XaWRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qKlxuXHRcdCAqIFNob3cgdmlkZW8gd2lkZ2V0IGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLWNvbnRyb2wtc2hvd1xuXHRcdCAqL1xuXHRcdHRoaXMud2lkZ2V0ICYmIHRoaXMud2lkZ2V0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLWNvbnRyb2wtc2hvdycgfSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEhpZGUgdmlkZW8gd2lkZ2V0XG5cdCAqL1xuXHRoaWRlVmlkZW9XaWRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qKlxuXHRcdCAqIEhpZGUgdmlkZW8gd2lkZ2V0XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI3ZpZGVvLWNvbnRyb2wtaGlkZVxuXHRcdCAqL1xuXHRcdHRoaXMud2lkZ2V0ICYmIHRoaXMud2lkZ2V0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLWNvbnRyb2wtaGlkZScgfSApO1xuXG5cdH0sXG5cblx0dXBkYXRlVmlkZW9QbGF5QnV0dG9uOiBmdW5jdGlvbiAoIHBhdXNlZCApIHtcblxuXHRcdGlmICggdGhpcy53aWRnZXQgJiYgXG5cdFx0XHRcdHRoaXMud2lkZ2V0LnZpZGVvRWxlbWVudCAmJiBcblx0XHRcdFx0dGhpcy53aWRnZXQudmlkZW9FbGVtZW50LmNvbnRyb2xCdXR0b24gKSB7XG5cblx0XHRcdHRoaXMud2lkZ2V0LnZpZGVvRWxlbWVudC5jb250cm9sQnV0dG9uLnVwZGF0ZSggcGF1c2VkICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogQWRkIGRlZmF1bHQgcGFub3JhbWEgZXZlbnQgbGlzdGVuZXJzXG5cdCAqIEBwYXJhbSB7UEFOT0xFTlMuUGFub3JhbWF9IHBhbm8gLSBUaGUgcGFub3JhbWEgdG8gYmUgYWRkZWQgd2l0aCBldmVudCBsaXN0ZW5lclxuXHQgKi9cblx0YWRkUGFub3JhbWFFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAoIHBhbm8gKSB7XG5cblx0XHQvLyBTZXQgY2FtZXJhIGNvbnRyb2wgb24gZXZlcnkgcGFub3JhbWFcblx0XHRwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgdGhpcy5zZXRDYW1lcmFDb250cm9sLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgaGlkZSB3aWRnZXQgZXZlbnQgb25seSB3aGVuIGl0J3MgUEFOT0xFTlMuVmlkZW9QYW5vcmFtYVxuXHRcdGlmICggcGFubyBpbnN0YW5jZW9mIFZpZGVvUGFub3JhbWEgKSB7XG5cblx0XHRcdHBhbm8uYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCB0aGlzLnNob3dWaWRlb1dpZGdldC5iaW5kKCB0aGlzICkgKTtcblx0XHRcdHBhbm8uYWRkRXZlbnRMaXN0ZW5lciggJ2xlYXZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICggISh0aGlzLnBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSkgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmhpZGVWaWRlb1dpZGdldC5jYWxsKCB0aGlzICk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IGNhbWVyYSBjb250cm9sXG5cdCAqL1xuXHRzZXRDYW1lcmFDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLk9yYml0Q29udHJvbHMudGFyZ2V0LmNvcHkoIHRoaXMucGFub3JhbWEucG9zaXRpb24gKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgY3VycmVudCBjYW1lcmEgY29udHJvbFxuXHQgKiBAcmV0dXJuIHtvYmplY3R9IC0gQ3VycmVudCBuYXZpZ2F0aW9uIGNvbnRyb2wuIFRIUkVFLk9yYml0Q29udHJvbHMgb3IgVEhSRUUuRGV2aWNlT3JpZW50YXRpb25Db250cm9sc1xuXHQgKi9cblx0Z2V0Q29udHJvbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuY29udHJvbDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgc2NlbmVcblx0ICogQHJldHVybiB7VEhSRUUuU2NlbmV9IC0gQ3VycmVudCBzY2VuZSB3aGljaCB0aGUgdmlld2VyIGlzIGJ1aWx0IG9uXG5cdCAqL1xuXHRnZXRTY2VuZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmU7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IGNhbWVyYVxuXHQgKiBAcmV0dXJuIHtUSFJFRS5DYW1lcmF9IC0gVGhlIHNjZW5lIGNhbWVyYVxuXHQgKi9cblx0Z2V0Q2FtZXJhOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5jYW1lcmE7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IHJlbmRlcmVyXG5cdCAqIEByZXR1cm4ge1RIUkVFLldlYkdMUmVuZGVyZXJ9IC0gVGhlIHJlbmRlcmVyIHVzaW5nIHdlYmdsXG5cdCAqL1xuXHRnZXRSZW5kZXJlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyZXI7XG5cblx0fSxcblxuXHQvKipcblx0ICogR2V0IGNvbnRhaW5lclxuXHQgKiBAcmV0dXJuIHtIVE1MRE9NRWxlbWVudH0gLSBUaGUgY29udGFpbmVyIGhvbGRzIHJlbmRlcmVyZCBjYW52YXNcblx0ICovXG5cdGdldENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBjb250cm9sIG5hbWVcblx0ICogQHJldHVybiB7c3RyaW5nfSAtIENvbnRyb2wgbmFtZS4gJ29yYml0JyBvciAnZGV2aWNlLW9yaWVudGF0aW9uJ1xuXHQgKi9cblx0Z2V0Q29udHJvbElkOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5jb250cm9sLmlkO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBuZXh0IG5hdmlnYXRpb24gY29udHJvbCBuYW1lXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gLSBOZXh0IGNvbnRyb2wgbmFtZVxuXHQgKi9cblx0Z2V0TmV4dENvbnRyb2xOYW1lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5jb250cm9sc1sgdGhpcy5nZXROZXh0Q29udHJvbEluZGV4KCkgXS5pZDtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgbmV4dCBuYXZpZ2F0aW9uIGNvbnRyb2wgaW5kZXhcblx0ICogQHJldHVybiB7bnVtYmVyfSAtIE5leHQgY29udHJvbCBpbmRleFxuXHQgKi9cblx0Z2V0TmV4dENvbnRyb2xJbmRleDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzO1xuXHRcdGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG5cdFx0Y29uc3QgbmV4dEluZGV4ID0gY29udHJvbHMuaW5kZXhPZiggY29udHJvbCApICsgMTtcblxuXHRcdHJldHVybiAoIG5leHRJbmRleCA+PSBjb250cm9scy5sZW5ndGggKSA/IDAgOiBuZXh0SW5kZXg7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IGZpZWxkIG9mIHZpZXcgb2YgY2FtZXJhXG5cdCAqL1xuXHRzZXRDYW1lcmFGb3Y6IGZ1bmN0aW9uICggZm92ICkge1xuXG5cdFx0dGhpcy5jYW1lcmEuZm92ID0gZm92O1xuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBFbmFibGUgY29udHJvbCBieSBpbmRleFxuXHQgKiBAcGFyYW0gIHtQQU5PTEVOUy5Db250cm9sc30gaW5kZXggLSBJbmRleCBvZiBjYW1lcmEgY29udHJvbFxuXHQgKi9cblx0ZW5hYmxlQ29udHJvbDogZnVuY3Rpb24gKCBpbmRleCApIHtcblxuXHRcdGluZGV4ID0gKCBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5jb250cm9scy5sZW5ndGggKSA/IGluZGV4IDogMDtcblxuXHRcdHRoaXMuY29udHJvbC5lbmFibGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2xzWyBpbmRleCBdO1xuXG5cdFx0dGhpcy5jb250cm9sLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgQ09OVFJPTFMuT1JCSVQ6XG5cblx0XHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24uY29weSggdGhpcy5wYW5vcmFtYS5wb3NpdGlvbiApO1xuXHRcdFx0XHR0aGlzLmNhbWVyYS5wb3NpdGlvbi56ICs9IDE7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgQ09OVFJPTFMuREVWSUNFT1JJRU5UQVRJT046XG5cblx0XHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24uY29weSggdGhpcy5wYW5vcmFtYS5wb3NpdGlvbiApO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHRoaXMuY29udHJvbC51cGRhdGUoKTtcblxuXHRcdHRoaXMuYWN0aXZhdGVXaWRnZXRJdGVtKCBpbmRleCwgdW5kZWZpbmVkICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogRGlzYWJsZSBjdXJyZW50IGNvbnRyb2xcblx0ICovXG5cdGRpc2FibGVDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbnRyb2wuZW5hYmxlZCA9IGZhbHNlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSBuZXh0IGNvbnRyb2xcblx0ICovXG5cdHRvZ2dsZU5leHRDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmVuYWJsZUNvbnRyb2woIHRoaXMuZ2V0TmV4dENvbnRyb2xJbmRleCgpICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2NyZWVuIFNwYWNlIFByb2plY3Rpb25cblx0ICovXG5cdGdldFNjcmVlblZlY3RvcjogZnVuY3Rpb24gKCB3b3JsZFZlY3RvciApIHtcblxuXHRcdGNvbnN0IHZlY3RvciA9IHdvcmxkVmVjdG9yLmNsb25lKCk7XG5cdFx0Y29uc3Qgd2lkdGhIYWxmID0gKCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCApIC8gMjtcblx0XHRjb25zdCBoZWlnaHRIYWxmID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcblxuXHRcdHZlY3Rvci5wcm9qZWN0KCB0aGlzLmNhbWVyYSApO1xuXG5cdFx0dmVjdG9yLnggPSAoIHZlY3Rvci54ICogd2lkdGhIYWxmICkgKyB3aWR0aEhhbGY7XG5cdFx0dmVjdG9yLnkgPSAtICggdmVjdG9yLnkgKiBoZWlnaHRIYWxmICkgKyBoZWlnaHRIYWxmO1xuXHRcdHZlY3Rvci56ID0gMDtcblxuXHRcdHJldHVybiB2ZWN0b3I7XG5cblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgU3ByaXRlIGluIFZpZXdwb3J0XG5cdCAqL1xuXHRjaGVja1Nwcml0ZUluVmlld3BvcnQ6IGZ1bmN0aW9uICggc3ByaXRlICkge1xuXG5cdFx0dGhpcy5jYW1lcmEubWF0cml4V29ybGRJbnZlcnNlLmdldEludmVyc2UoIHRoaXMuY2FtZXJhLm1hdHJpeFdvcmxkICk7XG5cdFx0dGhpcy5jYW1lcmFWaWV3UHJvamVjdGlvbk1hdHJpeC5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLmNhbWVyYS5wcm9qZWN0aW9uTWF0cml4LCB0aGlzLmNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcblx0XHR0aGlzLmNhbWVyYUZydXN0dW0uc2V0RnJvbU1hdHJpeCggdGhpcy5jYW1lcmFWaWV3UHJvamVjdGlvbk1hdHJpeCApO1xuXG5cdFx0cmV0dXJuIHNwcml0ZS52aXNpYmxlICYmIHRoaXMuY2FtZXJhRnJ1c3R1bS5pbnRlcnNlY3RzU3ByaXRlKCBzcHJpdGUgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXZlcnNlIGRyYWdnaW5nIGRpcmVjdGlvblxuXHQgKi9cblx0cmV2ZXJzZURyYWdnaW5nRGlyZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLk9yYml0Q29udHJvbHMucm90YXRlU3BlZWQgKj0gLTE7XG5cdFx0dGhpcy5PcmJpdENvbnRyb2xzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciAqPSAtMTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBZGQgcmV0aWNsZSBcblx0ICovXG5cdGFkZFJldGljbGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMucmV0aWNsZSA9IG5ldyBSZXRpY2xlKCAweGZmZmZmZiwgdHJ1ZSwgdGhpcy5vcHRpb25zLmR3ZWxsVGltZSApO1xuXHRcdHRoaXMucmV0aWNsZS5oaWRlKCk7XG5cdFx0dGhpcy5jYW1lcmEuYWRkKCB0aGlzLnJldGljbGUgKTtcblx0XHR0aGlzLnNjZW5lUmV0aWNsZS5hZGQoIHRoaXMuY2FtZXJhICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVHdlZW4gY29udHJvbCBsb29raW5nIGNlbnRlclxuXHQgKiBAcGFyYW0ge1RIUkVFLlZlY3RvcjN9IHZlY3RvciAtIFZlY3RvciB0byBiZSBsb29rZWQgYXQgdGhlIGNlbnRlclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTEwMDBdIC0gRHVyYXRpb24gdG8gdHdlZW5cblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1UV0VFTi5FYXNpbmcuRXhwb25lbnRpYWwuT3V0XSAtIEVhc2luZyBmdW5jdGlvblxuXHQgKi9cblx0dHdlZW5Db250cm9sQ2VudGVyOiBmdW5jdGlvbiAoIHZlY3RvciwgZHVyYXRpb24sIGVhc2luZyApIHtcblxuXHRcdGlmICggdGhpcy5jb250cm9sICE9PSB0aGlzLk9yYml0Q29udHJvbHMgKSB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdC8vIFBhc3MgaW4gYXJndW1lbnRzIGFzIGFycmF5XG5cdFx0aWYgKCB2ZWN0b3IgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0ZHVyYXRpb24gPSB2ZWN0b3JbIDEgXTtcblx0XHRcdGVhc2luZyA9IHZlY3RvclsgMiBdO1xuXHRcdFx0dmVjdG9yID0gdmVjdG9yWyAwIF07XG5cblx0XHR9XG5cblx0XHRkdXJhdGlvbiA9IGR1cmF0aW9uICE9PSB1bmRlZmluZWQgPyBkdXJhdGlvbiA6IDEwMDA7XG5cdFx0ZWFzaW5nID0gZWFzaW5nIHx8IFRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXQ7XG5cblx0XHR2YXIgc2NvcGUsIGhhLCB2YSwgY2h2LCBjdnYsIGh2LCB2diwgdnB0Yywgb3YsIG52O1xuXG5cdFx0c2NvcGUgPSB0aGlzO1xuXG5cdFx0Y2h2ID0gdGhpcy5jYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKTtcblx0XHRjdnYgPSBjaHYuY2xvbmUoKTtcblxuXHRcdHZwdGMgPSB0aGlzLnBhbm9yYW1hLmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKS5zdWIoIHRoaXMuY2FtZXJhLmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKSApO1xuXG5cdFx0aHYgPSB2ZWN0b3IuY2xvbmUoKTtcblx0XHQvLyBTY2FsZSBlZmZlY3Rcblx0XHRodi54ICo9IC0xO1xuXHRcdGh2LmFkZCggdnB0YyApLm5vcm1hbGl6ZSgpO1xuXHRcdHZ2ID0gaHYuY2xvbmUoKTtcblxuXHRcdGNodi55ID0gMDtcblx0XHRodi55ID0gMDtcblxuXHRcdGhhID0gTWF0aC5hdGFuMiggaHYueiwgaHYueCApIC0gTWF0aC5hdGFuMiggY2h2LnosIGNodi54ICk7XG5cdFx0aGEgPSBoYSA+IE1hdGguUEkgPyBoYSAtIDIgKiBNYXRoLlBJIDogaGE7XG5cdFx0aGEgPSBoYSA8IC1NYXRoLlBJID8gaGEgKyAyICogTWF0aC5QSSA6IGhhO1xuXHRcdHZhID0gTWF0aC5hYnMoIGN2di5hbmdsZVRvKCBjaHYgKSArICggY3Z2LnkgKiB2di55IDw9IDAgPyB2di5hbmdsZVRvKCBodiApIDogLXZ2LmFuZ2xlVG8oIGh2ICkgKSApO1xuXHRcdHZhICo9IHZ2LnkgPCBjdnYueSA/IDEgOiAtMTtcblxuXHRcdG92ID0geyBsZWZ0OiAwLCB1cDogMCB9O1xuXHRcdG52ID0geyBsZWZ0OiAwLCB1cDogMCB9O1xuXG5cdFx0dGhpcy50d2VlbkxlZnRBbmltYXRpb24uc3RvcCgpO1xuXHRcdHRoaXMudHdlZW5VcEFuaW1hdGlvbi5zdG9wKCk7XG5cblx0XHR0aGlzLnR3ZWVuTGVmdEFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2Vlbiggb3YgKVxuXHRcdFx0LnRvKCB7IGxlZnQ6IGhhIH0sIGR1cmF0aW9uIClcblx0XHRcdC5lYXNpbmcoIGVhc2luZyApXG5cdFx0XHQub25VcGRhdGUoZnVuY3Rpb24ob3Ype1xuXHRcdFx0XHRzY29wZS5jb250cm9sLnJvdGF0ZUxlZnQoIG92LmxlZnQgLSBudi5sZWZ0ICk7XG5cdFx0XHRcdG52LmxlZnQgPSBvdi5sZWZ0O1xuXHRcdFx0fSlcblx0XHRcdC5zdGFydCgpO1xuXG5cdFx0dGhpcy50d2VlblVwQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCBvdiApXG5cdFx0XHQudG8oIHsgdXA6IHZhIH0sIGR1cmF0aW9uIClcblx0XHRcdC5lYXNpbmcoIGVhc2luZyApXG5cdFx0XHQub25VcGRhdGUoZnVuY3Rpb24ob3Ype1xuXHRcdFx0XHRzY29wZS5jb250cm9sLnJvdGF0ZVVwKCBvdi51cCAtIG52LnVwICk7XG5cdFx0XHRcdG52LnVwID0gb3YudXA7XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXJ0KCk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVHdlZW4gY29udHJvbCBsb29raW5nIGNlbnRlciBieSBvYmplY3Rcblx0ICogQHBhcmFtIHtUSFJFRS5PYmplY3QzRH0gb2JqZWN0IC0gT2JqZWN0IHRvIGJlIGxvb2tlZCBhdCB0aGUgY2VudGVyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MTAwMF0gLSBEdXJhdGlvbiB0byB0d2VlblxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZWFzaW5nPVRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXRdIC0gRWFzaW5nIGZ1bmN0aW9uXG5cdCAqL1xuXHR0d2VlbkNvbnRyb2xDZW50ZXJCeU9iamVjdDogZnVuY3Rpb24gKCBvYmplY3QsIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cblx0XHRsZXQgaXNVbmRlclNjYWxlUGxhY2VIb2xkZXIgPSBmYWxzZTtcblxuXHRcdG9iamVjdC50cmF2ZXJzZUFuY2VzdG9ycyggZnVuY3Rpb24gKCBhbmNlc3RvciApIHtcblxuXHRcdFx0aWYgKCBhbmNlc3Rvci5zY2FsZVBsYWNlSG9sZGVyICkge1xuXG5cdFx0XHRcdGlzVW5kZXJTY2FsZVBsYWNlSG9sZGVyID0gdHJ1ZTtcblxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdGlmICggaXNVbmRlclNjYWxlUGxhY2VIb2xkZXIgKSB7XG5cblx0XHRcdHZhciBpbnZlcnRYVmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoIC0xLCAxLCAxICk7XG5cblx0XHRcdHRoaXMudHdlZW5Db250cm9sQ2VudGVyKCBvYmplY3QuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApLm11bHRpcGx5KCBpbnZlcnRYVmVjdG9yICksIGR1cmF0aW9uLCBlYXNpbmcgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMudHdlZW5Db250cm9sQ2VudGVyKCBvYmplY3QuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApLCBkdXJhdGlvbiwgZWFzaW5nICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyBpcyBjYWxsZWQgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkXG5cdCAqIEBmaXJlcyBQQU5PTEVOUy5WaWV3ZXIjd2luZG93LXJlc2l6ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gW3dpbmRvd1dpZHRoXSAtIFNwZWNpZnkgaWYgY3VzdG9tIGVsZW1lbnQgaGFzIGNoYW5nZWQgd2lkdGhcblx0ICogQHBhcmFtIHtudW1iZXJ9IFt3aW5kb3dIZWlnaHRdIC0gU3BlY2lmeSBpZiBjdXN0b20gZWxlbWVudCBoYXMgY2hhbmdlZCBoZWlnaHRcblx0ICovXG5cdG9uV2luZG93UmVzaXplOiBmdW5jdGlvbiAoIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQgKSB7XG5cblx0XHRsZXQgd2lkdGgsIGhlaWdodDtcblxuXHRcdGNvbnN0IGV4cGFuZCA9IHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyggJ3Bhbm9sZW5zLWNvbnRhaW5lcicgKSB8fCB0aGlzLmNvbnRhaW5lci5pc0Z1bGxzY3JlZW47XG5cblx0XHRpZiAoIHdpbmRvd1dpZHRoICE9PSB1bmRlZmluZWQgJiYgd2luZG93SGVpZ2h0ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHdpZHRoID0gd2luZG93V2lkdGg7XG5cdFx0XHRoZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XG5cdFx0XHR0aGlzLmNvbnRhaW5lci5fd2lkdGggPSB3aW5kb3dXaWR0aDtcblx0XHRcdHRoaXMuY29udGFpbmVyLl9oZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zdCBpc0FuZHJvaWQgPSAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXHRcdFx0Y29uc3QgYWRqdXN0V2lkdGggPSBpc0FuZHJvaWQgXG5cdFx0XHRcdD8gTWF0aC5taW4oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKSBcblx0XHRcdFx0OiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuXG5cdFx0XHRjb25zdCBhZGp1c3RIZWlnaHQgPSBpc0FuZHJvaWQgXG5cdFx0XHRcdD8gTWF0aC5taW4oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApIFxuXHRcdFx0XHQ6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcblxuXHRcdFx0d2lkdGggPSBleHBhbmQgPyBhZGp1c3RXaWR0aCA6IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoO1xuXHRcdFx0aGVpZ2h0ID0gZXhwYW5kID8gYWRqdXN0SGVpZ2h0IDogdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG5cdFx0XHR0aGlzLmNvbnRhaW5lci5fd2lkdGggPSB3aWR0aDtcblx0XHRcdHRoaXMuY29udGFpbmVyLl9oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHR9XG5cblx0XHR0aGlzLmNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcblxuXHRcdC8vIFVwZGF0ZSByZXRpY2xlXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSB8fCB0aGlzLnRlbXBFbmFibGVSZXRpY2xlICkge1xuXG5cdFx0XHR0aGlzLnVwZGF0ZVJldGljbGVFdmVudCgpO1xuXG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogV2luZG93IHJlc2l6aW5nIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI3dpbmRvdy1yZXNpemVcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggIC0gV2lkdGggb2YgdGhlIHdpbmRvd1xuXHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBIZWlnaHQgb2YgdGhlIHdpbmRvd1xuXHRcdCAqL1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnd2luZG93LXJlc2l6ZScsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG5cdFx0dGhpcy5zY2VuZS50cmF2ZXJzZSggZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0b2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3dpbmRvdy1yZXNpemUnLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fSxcblxuXHRhZGRPdXRwdXRFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRlbGVtZW50LnN0eWxlLnJpZ2h0ID0gJzEwcHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gJzEwcHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNmZmZcIjtcblx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXHRcdHRoaXMub3V0cHV0RGl2RWxlbWVudCA9IGVsZW1lbnQ7XG5cblx0fSxcblxuXHQvKipcblx0ICogT3V0cHV0IGluZm9zcG90IGF0dGFjaCBwb3NpdGlvbiBpbiBkZXZlbG9wZXIgY29uc29sZSBieSBob2xkaW5nIGRvd24gQ3RybCBidXR0b25cblx0ICovXG5cdG91dHB1dEluZm9zcG90UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IGludGVyc2VjdHMgPSB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QoIHRoaXMucGFub3JhbWEsIHRydWUgKTtcblxuXHRcdGlmICggaW50ZXJzZWN0cy5sZW5ndGggPiAwICkge1xuXG5cdFx0XHRjb25zdCBwb2ludCA9IGludGVyc2VjdHNbIDAgXS5wb2ludC5jbG9uZSgpO1xuXHRcdFx0Y29uc3QgY29udmVydGVyID0gbmV3IFRIUkVFLlZlY3RvcjMoIC0xLCAxLCAxICk7XG5cdFx0XHRjb25zdCB3b3JsZCA9IHRoaXMucGFub3JhbWEuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApO1xuXHRcdFx0cG9pbnQuc3ViKCB3b3JsZCApLm11bHRpcGx5KCBjb252ZXJ0ZXIgKTtcblxuXHRcdFx0Y29uc3QgbWVzc2FnZSA9IGAke3BvaW50LngudG9GaXhlZCgyKX0sICR7cG9pbnQueS50b0ZpeGVkKDIpfSwgJHtwb2ludC56LnRvRml4ZWQoMil9YDtcblxuXHRcdFx0aWYgKCBwb2ludC5sZW5ndGgoKSA9PT0gMCApIHsgcmV0dXJuOyB9XG5cblx0XHRcdHN3aXRjaCAoIHRoaXMub3B0aW9ucy5vdXRwdXQgKSB7XG5cblx0XHRcdFx0Y2FzZSAnY29uc29sZSc6XG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKCBtZXNzYWdlICk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnb3ZlcmxheSc6XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXREaXZFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fSxcblxuXHRvbk1vdXNlRG93bjogZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR0aGlzLnVzZXJNb3VzZS54ID0gKCBldmVudC5jbGllbnRYID49IDAgKSA/IGV2ZW50LmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7XG5cdFx0dGhpcy51c2VyTW91c2UueSA9ICggZXZlbnQuY2xpZW50WSA+PSAwICkgPyBldmVudC5jbGllbnRZIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xuXHRcdHRoaXMudXNlck1vdXNlLnR5cGUgPSAnbW91c2Vkb3duJztcblx0XHR0aGlzLm9uVGFwKCBldmVudCApO1xuXG5cdH0sXG5cblx0b25Nb3VzZU1vdmU6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMudXNlck1vdXNlLnR5cGUgPSAnbW91c2Vtb3ZlJztcblx0XHR0aGlzLm9uVGFwKCBldmVudCApO1xuXG5cdH0sXG5cblx0b25Nb3VzZVVwOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0bGV0IG9uVGFyZ2V0ID0gZmFsc2U7XG5cblx0XHR0aGlzLnVzZXJNb3VzZS50eXBlID0gJ21vdXNldXAnO1xuXG5cdFx0Y29uc3QgdHlwZSA9ICggdGhpcy51c2VyTW91c2UueCA+PSBldmVudC5jbGllbnRYIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlIFxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS54IDw9IGV2ZW50LmNsaWVudFggKyB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2Vcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueSA+PSBldmVudC5jbGllbnRZIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnkgPD0gZXZlbnQuY2xpZW50WSArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSApIFxuXHRcdFx0XHR8fCAgKCBldmVudC5jaGFuZ2VkVG91Y2hlcyBcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueCA+PSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnggPD0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSBcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueSA+PSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnkgPD0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSApIFxuXHRcdD8gJ2NsaWNrJyA6IHVuZGVmaW5lZDtcblxuXHRcdC8vIEV2ZW50IHNob3VsZCBoYXBwZW4gb24gY2FudmFzXG5cdFx0aWYgKCBldmVudCAmJiBldmVudC50YXJnZXQgJiYgIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdwYW5vbGVucy1jYW52YXMnICkgKSB7IHJldHVybjsgfVxuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID09PSAxICkge1xuXG5cdFx0XHRvblRhcmdldCA9IHRoaXMub25UYXAoIHsgY2xpZW50WCA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGNsaWVudFkgOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIH0sIHR5cGUgKTtcblx0XHRcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRvblRhcmdldCA9IHRoaXMub25UYXAoIGV2ZW50LCB0eXBlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnVzZXJNb3VzZS50eXBlID0gJ25vbmUnO1xuXG5cdFx0aWYgKCBvblRhcmdldCApIHsgXG5cblx0XHRcdHJldHVybjsgXG5cblx0XHR9XG5cblx0XHRpZiAoIHR5cGUgPT09ICdjbGljaycgKSB7XG5cblx0XHRcdHRoaXMub3B0aW9ucy5hdXRvSGlkZUluZm9zcG90ICYmIHRoaXMucGFub3JhbWEgJiYgdGhpcy5wYW5vcmFtYS50b2dnbGVJbmZvc3BvdFZpc2liaWxpdHkoKTtcblx0XHRcdHRoaXMub3B0aW9ucy5hdXRvSGlkZUNvbnRyb2xCYXIgJiYgdGhpcy50b2dnbGVDb250cm9sQmFyKCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRvblRhcDogZnVuY3Rpb24gKCBldmVudCwgdHlwZSApIHtcblxuXHRcdGNvbnN0IHsgbGVmdCwgdG9wIH0gPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IHRoaXMuY29udGFpbmVyO1xuXG5cdFx0dGhpcy5yYXljYXN0ZXJQb2ludC54ID0gKCAoIGV2ZW50LmNsaWVudFggLSBsZWZ0ICkgLyBjbGllbnRXaWR0aCApICogMiAtIDE7XG5cdFx0dGhpcy5yYXljYXN0ZXJQb2ludC55ID0gLSAoICggZXZlbnQuY2xpZW50WSAtIHRvcCApIC8gY2xpZW50SGVpZ2h0ICkgKiAyICsgMTtcblxuXHRcdHRoaXMucmF5Y2FzdGVyLnNldEZyb21DYW1lcmEoIHRoaXMucmF5Y2FzdGVyUG9pbnQsIHRoaXMuY2FtZXJhICk7XG5cblx0XHQvLyBSZXR1cm4gaWYgbm8gcGFub3JhbWEgXG5cdFx0aWYgKCAhdGhpcy5wYW5vcmFtYSApIHsgXG5cblx0XHRcdHJldHVybjsgXG5cblx0XHR9XG5cblx0XHQvLyBvdXRwdXQgaW5mb3Nwb3QgaW5mb3JtYXRpb25cblx0XHRpZiAoIGV2ZW50LnR5cGUgIT09ICdtb3VzZWRvd24nICYmIHRoaXMudG91Y2hTdXBwb3J0ZWQgfHwgdGhpcy5PVVRQVVRfSU5GT1NQT1QgKSB7IFxuXG5cdFx0XHR0aGlzLm91dHB1dEluZm9zcG90UG9zaXRpb24oKTsgXG5cblx0XHR9XG5cblx0XHRjb25zdCBpbnRlcnNlY3RzID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyggdGhpcy5wYW5vcmFtYS5jaGlsZHJlbiwgdHJ1ZSApO1xuXHRcdGNvbnN0IGludGVyc2VjdF9lbnRpdHkgPSB0aGlzLmdldENvbnZlcnRlZEludGVyc2VjdCggaW50ZXJzZWN0cyApO1xuXHRcdGNvbnN0IGludGVyc2VjdCA9ICggaW50ZXJzZWN0cy5sZW5ndGggPiAwICkgPyBpbnRlcnNlY3RzWzBdLm9iamVjdCA6IHVuZGVmaW5lZDtcblxuXHRcdGlmICggdGhpcy51c2VyTW91c2UudHlwZSA9PT0gJ21vdXNldXAnICApIHtcblxuXHRcdFx0aWYgKCBpbnRlcnNlY3RfZW50aXR5ICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgPT09IGludGVyc2VjdF9lbnRpdHkgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdG9wLWVudGl0eScsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByZXNzRW50aXR5T2JqZWN0ID0gdW5kZWZpbmVkO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2V1cCcgICkge1xuXG5cdFx0XHRpZiAoIGludGVyc2VjdCAmJiB0aGlzLnByZXNzT2JqZWN0ID09PSBpbnRlcnNlY3QgJiYgdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdG9wJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucHJlc3NPYmplY3QgPSB1bmRlZmluZWQ7XG5cblx0XHR9XG5cblx0XHRpZiAoIHR5cGUgPT09ICdjbGljaycgKSB7XG5cblx0XHRcdHRoaXMucGFub3JhbWEuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnY2xpY2snLCBpbnRlcnNlY3RzOiBpbnRlcnNlY3RzLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdGlmICggaW50ZXJzZWN0X2VudGl0eSAmJiBpbnRlcnNlY3RfZW50aXR5LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0aW50ZXJzZWN0X2VudGl0eS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjbGljay1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpbnRlcnNlY3QgJiYgaW50ZXJzZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0aW50ZXJzZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2NsaWNrJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyJywgaW50ZXJzZWN0czogaW50ZXJzZWN0cywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRpZiAoICggdGhpcy5ob3Zlck9iamVjdCAmJiBpbnRlcnNlY3RzLmxlbmd0aCA+IDAgJiYgdGhpcy5ob3Zlck9iamVjdCAhPT0gaW50ZXJzZWN0X2VudGl0eSApXG5cdFx0XHRcdHx8ICggdGhpcy5ob3Zlck9iamVjdCAmJiBpbnRlcnNlY3RzLmxlbmd0aCA9PT0gMCApICl7XG5cblx0XHRcdFx0aWYgKCB0aGlzLmhvdmVyT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmhvdmVyT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVybGVhdmUnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0XHR0aGlzLnJldGljbGUuc3RvcCgpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmhvdmVyT2JqZWN0ID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggaW50ZXJzZWN0X2VudGl0eSAmJiBpbnRlcnNlY3RzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0aWYgKCB0aGlzLmhvdmVyT2JqZWN0ICE9PSBpbnRlcnNlY3RfZW50aXR5ICkge1xuXG5cdFx0XHRcdFx0dGhpcy5ob3Zlck9iamVjdCA9IGludGVyc2VjdF9lbnRpdHk7XG5cblx0XHRcdFx0XHRpZiAoIHRoaXMuaG92ZXJPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHRcdFx0dGhpcy5ob3Zlck9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdob3ZlcmVudGVyJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG5cdFx0XHRcdFx0XHQvLyBTdGFydCByZXRpY2xlIHRpbWVyXG5cdFx0XHRcdFx0XHRpZiAoIHRoaXMub3B0aW9ucy5hdXRvUmV0aWNsZVNlbGVjdCAmJiB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSB8fCB0aGlzLnRlbXBFbmFibGVSZXRpY2xlICkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJldGljbGUuc3RhcnQoIHRoaXMub25UYXAuYmluZCggdGhpcywgZXZlbnQsICdjbGljaycgKSApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHRoaXMudXNlck1vdXNlLnR5cGUgPT09ICdtb3VzZWRvd24nICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgIT0gaW50ZXJzZWN0X2VudGl0eSApIHtcblxuXHRcdFx0XHRcdHRoaXMucHJlc3NFbnRpdHlPYmplY3QgPSBpbnRlcnNlY3RfZW50aXR5O1xuXG5cdFx0XHRcdFx0aWYgKCB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0XHRcdHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdGFydC1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdGhpcy51c2VyTW91c2UudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgdGhpcy5wcmVzc09iamVjdCAhPSBpbnRlcnNlY3QgKSB7XG5cblx0XHRcdFx0XHR0aGlzLnByZXNzT2JqZWN0ID0gaW50ZXJzZWN0O1xuXG5cdFx0XHRcdFx0aWYgKCB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0XHRcdHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdGFydCcsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2Vtb3ZlJyB8fCB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSApIHtcblxuXHRcdFx0XHRcdGlmICggaW50ZXJzZWN0ICYmIGludGVyc2VjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0XHRpbnRlcnNlY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnaG92ZXInLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzbW92ZS1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIHRoaXMucHJlc3NPYmplY3QgJiYgdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzbW92ZScsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhaW50ZXJzZWN0X2VudGl0eSAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0ICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuXHRcdFx0XHR0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RvcC1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0dGhpcy5wcmVzc0VudGl0eU9iamVjdCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoICFpbnRlcnNlY3QgJiYgdGhpcy5wcmVzc09iamVjdCAmJiB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cblx0XHRcdFx0dGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc3N0b3AnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cblx0XHRcdFx0dGhpcy5wcmVzc09iamVjdCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0Ly8gSW5mb3Nwb3QgaGFuZGxlclxuXHRcdGlmICggaW50ZXJzZWN0ICYmIGludGVyc2VjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG5cdFx0XHR0aGlzLmluZm9zcG90ID0gaW50ZXJzZWN0O1xuXHRcdFx0XG5cdFx0XHRpZiAoIHR5cGUgPT09ICdjbGljaycgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdH1cblx0XHRcdFxuXG5cdFx0fSBlbHNlIGlmICggdGhpcy5pbmZvc3BvdCApIHtcblxuXHRcdFx0dGhpcy5oaWRlSW5mb3Nwb3QoKTtcblxuXHRcdH1cblxuXHRcdC8vIEF1dG8gcm90YXRlXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSAmJiB0aGlzLnVzZXJNb3VzZS50eXBlICE9PSAnbW91c2Vtb3ZlJyApIHtcblxuXHRcdFx0Ly8gQXV0by1yb3RhdGUgaWRsZSB0aW1lclxuXHRcdFx0Y2xlYXJUaW1lb3V0KCB0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQgKTtcblxuXHRcdFx0aWYgKCB0aGlzLmNvbnRyb2wgPT09IHRoaXMuT3JiaXRDb250cm9scyApIHtcblxuXHRcdFx0XHR0aGlzLk9yYml0Q29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQgPSB3aW5kb3cuc2V0VGltZW91dCggdGhpcy5lbmFibGVBdXRvUmF0ZS5iaW5kKCB0aGlzICksIHRoaXMub3B0aW9ucy5hdXRvUm90YXRlQWN0aXZhdGlvbkR1cmF0aW9uICk7XG5cblx0XHRcdH1cblxuXHRcdH1cdFx0XG5cblx0fSxcblxuXHRnZXRDb252ZXJ0ZWRJbnRlcnNlY3Q6IGZ1bmN0aW9uICggaW50ZXJzZWN0cyApIHtcblxuXHRcdGxldCBpbnRlcnNlY3Q7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnRlcnNlY3RzLmxlbmd0aDsgaSsrICkge1xuXG5cdFx0XHRpZiAoIGludGVyc2VjdHNbaV0uZGlzdGFuY2UgPj0gMCAmJiBpbnRlcnNlY3RzW2ldLm9iamVjdCAmJiAhaW50ZXJzZWN0c1tpXS5vYmplY3QucGFzc1Rocm91Z2ggKSB7XG5cblx0XHRcdFx0aWYgKCBpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHkgJiYgaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5LnBhc3NUaHJvdWdoICkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHkgJiYgIWludGVyc2VjdHNbaV0ub2JqZWN0LmVudGl0eS5wYXNzVGhyb3VnaCApIHtcblx0XHRcdFx0XHRpbnRlcnNlY3QgPSBpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aW50ZXJzZWN0ID0gaW50ZXJzZWN0c1tpXS5vYmplY3Q7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGludGVyc2VjdDtcblxuXHR9LFxuXG5cdGhpZGVJbmZvc3BvdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB0aGlzLmluZm9zcG90ICkge1xuXG5cdFx0XHR0aGlzLmluZm9zcG90Lm9uSG92ZXJFbmQoKTtcblxuXHRcdFx0dGhpcy5pbmZvc3BvdCA9IHVuZGVmaW5lZDtcblxuXHRcdH1cblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgY29udHJvbCBiYXJcblx0ICogQGZpcmVzIFtQQU5PTEVOUy5WaWV3ZXIjY29udHJvbC1iYXItdG9nZ2xlXVxuXHQgKi9cblx0dG9nZ2xlQ29udHJvbEJhcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0LyoqXG5cdFx0ICogVG9nZ2xlIGNvbnRyb2wgYmFyIGV2ZW50XG5cdFx0ICogQHR5cGUge29iamVjdH1cblx0XHQgKiBAZXZlbnQgUEFOT0xFTlMuVmlld2VyI2NvbnRyb2wtYmFyLXRvZ2dsZVxuXHRcdCAqL1xuXHRcdHRoaXMud2lkZ2V0ICYmIHRoaXMud2lkZ2V0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2NvbnRyb2wtYmFyLXRvZ2dsZScgfSApO1xuXG5cdH0sXG5cblx0b25LZXlEb3duOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMub3V0cHV0ICYmIHRoaXMub3B0aW9ucy5vdXRwdXQgIT09ICdub25lJyAmJiBldmVudC5rZXkgPT09ICdDb250cm9sJyApIHtcblxuXHRcdFx0dGhpcy5PVVRQVVRfSU5GT1NQT1QgPSB0cnVlO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0b25LZXlVcDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5PVVRQVVRfSU5GT1NQT1QgPSBmYWxzZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgY29udHJvbCBhbmQgY2FsbGJhY2tzXG5cdCAqL1xuXHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFRXRUVOLnVwZGF0ZSgpO1xuXG5cdFx0dGhpcy51cGRhdGVDYWxsYmFja3MuZm9yRWFjaCggZnVuY3Rpb24oIGNhbGxiYWNrICl7IGNhbGxiYWNrKCk7IH0gKTtcblxuXHRcdHRoaXMuY29udHJvbC51cGRhdGUoKTtcblxuXHRcdHRoaXMuc2NlbmUudHJhdmVyc2UoIGZ1bmN0aW9uKCBjaGlsZCApe1xuXHRcdFx0aWYgKCBjaGlsZCBpbnN0YW5jZW9mIEluZm9zcG90IFxuXHRcdFx0XHQmJiBjaGlsZC5lbGVtZW50IFxuXHRcdFx0XHQmJiAoIHRoaXMuaG92ZXJPYmplY3QgPT09IGNoaWxkIFxuXHRcdFx0XHRcdHx8IGNoaWxkLmVsZW1lbnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnIFxuXHRcdFx0XHRcdHx8IChjaGlsZC5lbGVtZW50LmxlZnQgJiYgY2hpbGQuZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJylcblx0XHRcdFx0XHR8fCAoY2hpbGQuZWxlbWVudC5yaWdodCAmJiBjaGlsZC5lbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykgKSApIHtcblx0XHRcdFx0aWYgKCB0aGlzLmNoZWNrU3ByaXRlSW5WaWV3cG9ydCggY2hpbGQgKSApIHtcblx0XHRcdFx0XHRjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0U2NyZWVuVmVjdG9yKCBjaGlsZC5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICkgKTtcblx0XHRcdFx0XHRjaGlsZC50cmFuc2xhdGVFbGVtZW50KCB4LCB5ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGQub25EaXNtaXNzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZW5kZXJpbmcgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHQgKiBSZW5kZXIgcmV0aWNsZSBsYXN0XG5cdCAqL1xuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdGhpcy5tb2RlID09PSBNT0RFUy5DQVJEQk9BUkQgfHwgdGhpcy5tb2RlID09PSBNT0RFUy5TVEVSRU8gKSB7XG5cblx0XHRcdHRoaXMucmVuZGVyZXIuY2xlYXIoKTtcblx0XHRcdHRoaXMuZWZmZWN0LnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblx0XHRcdHRoaXMuZWZmZWN0LnJlbmRlciggdGhpcy5zY2VuZVJldGljbGUsIHRoaXMuY2FtZXJhICk7XG5cdFx0XHRcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMucmVuZGVyZXIuY2xlYXIoKTtcblx0XHRcdHRoaXMucmVuZGVyZXIucmVuZGVyKCB0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSApO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5jbGVhckRlcHRoKCk7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZVJldGljbGUsIHRoaXMuY2FtZXJhICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRhbmltYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnJlcXVlc3RBbmltYXRpb25JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5hbmltYXRlLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0dGhpcy5vbkNoYW5nZSgpO1xuXG5cdH0sXG5cblx0b25DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciBtb3VzZSBhbmQgdG91Y2ggZXZlbnQgb24gY29udGFpbmVyXG5cdCAqL1xuXHRyZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7IHBhc3NpdmU6IGZhbHNlIH07XG5cblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJyAsIFx0dGhpcy5IQU5ETEVSX01PVVNFX0RPV04sIG9wdGlvbnMgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJyAsIFx0dGhpcy5IQU5ETEVSX01PVVNFX01PVkUsIG9wdGlvbnMgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCdcdCAsIFx0dGhpcy5IQU5ETEVSX01PVVNFX1VQICAsIG9wdGlvbnMgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIFx0dGhpcy5IQU5ETEVSX01PVVNFX0RPV04sIG9wdGlvbnMgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnICAsIFx0dGhpcy5IQU5ETEVSX01PVVNFX1VQICAsIG9wdGlvbnMgKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVbnJlZ2lzdGVyIG1vdXNlIGFuZCB0b3VjaCBldmVudCBvbiBjb250YWluZXJcblx0ICovXG5cdHVucmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJyAsICB0aGlzLkhBTkRMRVJfTU9VU0VfRE9XTiwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJyAsICB0aGlzLkhBTkRMRVJfTU9VU0VfTU9WRSwgZmFsc2UgKTtcblx0XHR0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCdcdCwgIHRoaXMuSEFORExFUl9NT1VTRV9VUCAgLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgIHRoaXMuSEFORExFUl9NT1VTRV9ET1dOLCBmYWxzZSApO1xuXHRcdHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcgICwgIHRoaXMuSEFORExFUl9NT1VTRV9VUCAgLCBmYWxzZSApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIHJldGljbGUgZXZlbnRcblx0ICovXG5cdHJlZ2lzdGVyUmV0aWNsZUV2ZW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmFkZFVwZGF0ZUNhbGxiYWNrKCB0aGlzLkhBTkRMRVJfVEFQICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVW5yZWdpc3RlciByZXRpY2xlIGV2ZW50XG5cdCAqL1xuXHR1bnJlZ2lzdGVyUmV0aWNsZUV2ZW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnJlbW92ZVVwZGF0ZUNhbGxiYWNrKCB0aGlzLkhBTkRMRVJfVEFQICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVXBkYXRlIHJldGljbGUgZXZlbnRcblx0ICovXG5cdHVwZGF0ZVJldGljbGVFdmVudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc3QgY2xpZW50WCA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gMiArIHRoaXMuY29udGFpbmVyLm9mZnNldExlZnQ7XG5cdFx0Y29uc3QgY2xpZW50WSA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDI7XG5cblx0XHR0aGlzLnJlbW92ZVVwZGF0ZUNhbGxiYWNrKCB0aGlzLkhBTkRMRVJfVEFQICk7XG5cdFx0dGhpcy5IQU5ETEVSX1RBUCA9IHRoaXMub25UYXAuYmluZCggdGhpcywgeyBjbGllbnRYLCBjbGllbnRZIH0gKTtcblx0XHR0aGlzLmFkZFVwZGF0ZUNhbGxiYWNrKCB0aGlzLkhBTkRMRVJfVEFQICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogUmVnaXN0ZXIgY29udGFpbmVyIGFuZCB3aW5kb3cgbGlzdGVuZXJzXG5cdCAqL1xuXHRyZWdpc3RlckV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBSZXNpemUgRXZlbnRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScgLCB0aGlzLkhBTkRMRVJfV0lORE9XX1JFU0laRSwgdHJ1ZSApO1xuXG5cdFx0Ly8gS2V5Ym9hcmQgRXZlbnRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzLkhBTkRMRVJfS0VZX0RPV04sIHRydWUgKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJyAgLCB0aGlzLkhBTkRMRVJfS0VZX1VQXHQgLCB0cnVlICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogVW5yZWdpc3RlciBjb250YWluZXIgYW5kIHdpbmRvdyBsaXN0ZW5lcnNcblx0ICovXG5cdHVucmVnaXN0ZXJFdmVudExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gUmVzaXplIEV2ZW50XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnICwgdGhpcy5IQU5ETEVSX1dJTkRPV19SRVNJWkUsIHRydWUgKTtcblxuXHRcdC8vIEtleWJvYXJkIEV2ZW50XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcy5IQU5ETEVSX0tFWV9ET1dOLCB0cnVlICk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXl1cCcgICwgdGhpcy5IQU5ETEVSX0tFWV9VUCAgLCB0cnVlICk7XG5cblx0fSxcblxuXHQvKipcblx0ICogRGlzcG9zZSBhbGwgc2NlbmUgb2JqZWN0cyBhbmQgY2xlYXIgY2FjaGVcblx0ICovXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIFVucmVnaXN0ZXIgZG9tIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHRoaXMudW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG5cblx0XHQvLyByZWN1cnNpdmUgZGlzcG9zYWwgb24gM2Qgb2JqZWN0c1xuXHRcdGZ1bmN0aW9uIHJlY3Vyc2l2ZURpc3Bvc2UgKCBvYmplY3QgKSB7XG5cblx0XHRcdGZvciAoIHZhciBpID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICkge1xuXG5cdFx0XHRcdHJlY3Vyc2l2ZURpc3Bvc2UoIG9iamVjdC5jaGlsZHJlbltpXSApO1xuXHRcdFx0XHRvYmplY3QucmVtb3ZlKCBvYmplY3QuY2hpbGRyZW5baV0gKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG5cdFx0XHRcdG9iamVjdC5kaXNwb3NlKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0b2JqZWN0Lmdlb21ldHJ5ICYmIG9iamVjdC5nZW9tZXRyeS5kaXNwb3NlKCk7XG5cdFx0XHRvYmplY3QubWF0ZXJpYWwgJiYgb2JqZWN0Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcblx0XHR9XG5cblx0XHRyZWN1cnNpdmVEaXNwb3NlKCB0aGlzLnNjZW5lICk7XG5cblx0XHQvLyBkaXNwb3NlIHdpZGdldFxuXHRcdGlmICggdGhpcy53aWRnZXQgKSB7XG5cblx0XHRcdHRoaXMud2lkZ2V0LmRpc3Bvc2UoKTtcblx0XHRcdHRoaXMud2lkZ2V0ID0gbnVsbDtcblxuXHRcdH1cblxuXHRcdC8vIGNsZWFyIGNhY2hlXG5cdFx0aWYgKCBDYWNoZSAmJiBDYWNoZS5lbmFibGVkICkge1xuXG5cdFx0XHRDYWNoZS5jbGVhcigpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0LyoqXG5cdCAqIERlc3Rvcnkgdmlld2VyIGJ5IGRpc3Bvc2luZyBhbmQgc3RvcHBpbmcgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdCAqL1xuXHRkZXN0b3J5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKCB0aGlzLnJlcXVlc3RBbmltYXRpb25JZCApO1x0XHRcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBPbiBwYW5vcmFtYSBkaXNwb3NlXG5cdCAqL1xuXHRvblBhbm9yYW1hRGlzcG9zZTogZnVuY3Rpb24gKCBwYW5vcmFtYSApIHtcblxuXHRcdGlmICggcGFub3JhbWEgaW5zdGFuY2VvZiBWaWRlb1Bhbm9yYW1hICkge1xuXG5cdFx0XHR0aGlzLmhpZGVWaWRlb1dpZGdldCgpO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBwYW5vcmFtYSA9PT0gdGhpcy5wYW5vcmFtYSApIHtcblxuXHRcdFx0dGhpcy5wYW5vcmFtYSA9IG51bGw7XG5cblx0XHR9XG5cblx0fSxcblxuXHQvKipcblx0ICogTG9hZCBhamF4IGNhbGxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVSTCB0byBiZSByZXF1ZXN0ZWRcblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGFmdGVyIHJlcXVlc3QgY29tcGxldGVzXG5cdCAqL1xuXHRsb2FkQXN5bmNSZXF1ZXN0OiBmdW5jdGlvbiAoIHVybCwgY2FsbGJhY2sgKSB7XG5cblx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0cmVxdWVzdC5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soIGV2ZW50ICk7XG5cdFx0fTtcblx0XHRyZXF1ZXN0Lm9wZW4oIFwiR0VUXCIsIHVybCwgdHJ1ZSApO1xuXHRcdHJlcXVlc3Quc2VuZCggbnVsbCApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFZpZXcgaW5kaWNhdG9yIGluIHVwcGVyIGxlZnRcblx0ICovXG5cdGFkZFZpZXdJbmRpY2F0b3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnN0IHNjb3BlID0gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGxvYWRWaWV3SW5kaWNhdG9yICggYXN5bmNFdmVudCApIHtcblxuXHRcdFx0aWYgKCBhc3luY0V2ZW50LmxvYWRlZCA9PT0gMCApIHJldHVybjtcblxuXHRcdFx0Y29uc3Qgdmlld0luZGljYXRvckRpdiA9IGFzeW5jRXZlbnQudGFyZ2V0LnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUud2lkdGggPSBzY29wZS52aWV3SW5kaWNhdG9yU2l6ZSArIFwicHhcIjtcblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUuaGVpZ2h0ID0gc2NvcGUudmlld0luZGljYXRvclNpemUgKyBcInB4XCI7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRcdFx0dmlld0luZGljYXRvckRpdi5zdHlsZS50b3AgPSBcIjEwcHhcIjtcblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUubGVmdCA9IFwiMTBweFwiO1xuXHRcdFx0dmlld0luZGljYXRvckRpdi5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcblx0XHRcdHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LmlkID0gXCJwYW5vbGVucy12aWV3LWluZGljYXRvci1jb250YWluZXJcIjtcblxuXHRcdFx0c2NvcGUuY29udGFpbmVyLmFwcGVuZENoaWxkKCB2aWV3SW5kaWNhdG9yRGl2ICk7XG5cblx0XHRcdGNvbnN0IGluZGljYXRvciA9IHZpZXdJbmRpY2F0b3JEaXYucXVlcnlTZWxlY3RvciggXCIjaW5kaWNhdG9yXCIgKTtcblx0XHRcdGNvbnN0IHNldEluZGljYXRvckQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0c2NvcGUucmFkaXVzID0gc2NvcGUudmlld0luZGljYXRvclNpemUgKiAwLjIyNTtcblx0XHRcdFx0c2NvcGUuY3VycmVudFBhbm9BbmdsZSA9IHNjb3BlLmNhbWVyYS5yb3RhdGlvbi55IC0gVEhSRUUuTWF0aC5kZWdUb1JhZCggOTAgKTtcblx0XHRcdFx0c2NvcGUuZm92QW5nbGUgPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5jYW1lcmEuZm92ICkgO1xuXHRcdFx0XHRzY29wZS5sZWZ0QW5nbGUgPSAtc2NvcGUuY3VycmVudFBhbm9BbmdsZSAtIHNjb3BlLmZvdkFuZ2xlIC8gMjtcblx0XHRcdFx0c2NvcGUucmlnaHRBbmdsZSA9IC1zY29wZS5jdXJyZW50UGFub0FuZ2xlICsgc2NvcGUuZm92QW5nbGUgLyAyO1xuXHRcdFx0XHRzY29wZS5sZWZ0WCA9IHNjb3BlLnJhZGl1cyAqIE1hdGguY29zKCBzY29wZS5sZWZ0QW5nbGUgKTtcblx0XHRcdFx0c2NvcGUubGVmdFkgPSBzY29wZS5yYWRpdXMgKiBNYXRoLnNpbiggc2NvcGUubGVmdEFuZ2xlICk7XG5cdFx0XHRcdHNjb3BlLnJpZ2h0WCA9IHNjb3BlLnJhZGl1cyAqIE1hdGguY29zKCBzY29wZS5yaWdodEFuZ2xlICk7XG5cdFx0XHRcdHNjb3BlLnJpZ2h0WSA9IHNjb3BlLnJhZGl1cyAqIE1hdGguc2luKCBzY29wZS5yaWdodEFuZ2xlICk7XG5cdFx0XHRcdHNjb3BlLmluZGljYXRvckQgPSBcIk0gXCIgKyBzY29wZS5sZWZ0WCArIFwiIFwiICsgc2NvcGUubGVmdFkgKyBcIiBBIFwiICsgc2NvcGUucmFkaXVzICsgXCIgXCIgKyBzY29wZS5yYWRpdXMgKyBcIiAwIDAgMSBcIiArIHNjb3BlLnJpZ2h0WCArIFwiIFwiICsgc2NvcGUucmlnaHRZO1xuXG5cdFx0XHRcdGlmICggc2NvcGUubGVmdFggJiYgc2NvcGUubGVmdFkgJiYgc2NvcGUucmlnaHRYICYmIHNjb3BlLnJpZ2h0WSAmJiBzY29wZS5yYWRpdXMgKSB7XG5cblx0XHRcdFx0XHRpbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCBcImRcIiwgc2NvcGUuaW5kaWNhdG9yRCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fTtcblxuXHRcdFx0c2NvcGUuYWRkVXBkYXRlQ2FsbGJhY2soIHNldEluZGljYXRvckQgKTtcblxuXHRcdFx0Y29uc3QgaW5kaWNhdG9yT25Nb3VzZUVudGVyID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBpbmRpY2F0b3JPbk1vdXNlTGVhdmUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcblxuXHRcdFx0fTtcblxuXHRcdFx0dmlld0luZGljYXRvckRpdi5hZGRFdmVudExpc3RlbmVyKCBcIm1vdXNlZW50ZXJcIiwgaW5kaWNhdG9yT25Nb3VzZUVudGVyICk7XG5cdFx0XHR2aWV3SW5kaWNhdG9yRGl2LmFkZEV2ZW50TGlzdGVuZXIoIFwibW91c2VsZWF2ZVwiLCBpbmRpY2F0b3JPbk1vdXNlTGVhdmUgKTtcblx0XHR9XG5cblx0XHR0aGlzLmxvYWRBc3luY1JlcXVlc3QoIERhdGFJbWFnZS5WaWV3SW5kaWNhdG9yLCBsb2FkVmlld0luZGljYXRvciApO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEFwcGVuZCBjdXN0b20gY29udHJvbCBpdGVtIHRvIGV4aXN0aW5nIGNvbnRyb2wgYmFyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uPXt9XSAtIFN0eWxlIG9iamVjdCB0byBvdmVyd2lydGUgZGVmYXVsdCBlbGVtZW50IHN0eWxlLiBJdCB0YWtlcyAnc3R5bGUnLCAnb25UYXAnIGFuZCAnZ3JvdXAnIHByb3BlcnRpZXMuXG5cdCAqL1xuXHRhcHBlbmRDb250cm9sSXRlbTogZnVuY3Rpb24gKCBvcHRpb24gKSB7XG5cblx0XHRjb25zdCBpdGVtID0gdGhpcy53aWRnZXQuY3JlYXRlQ3VzdG9tSXRlbSggb3B0aW9uICk7XHRcdFxuXG5cdFx0aWYgKCBvcHRpb24uZ3JvdXAgPT09ICd2aWRlbycgKSB7XG5cblx0XHRcdHRoaXMud2lkZ2V0LnZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZCggaXRlbSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy53aWRnZXQuYmFyRWxlbWVudC5hcHBlbmRDaGlsZCggaXRlbSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGl0ZW07XG5cblx0fSxcblxuXHQvKipcblx0ICogQ2xlYXIgYWxsIGNhY2hlZCBmaWxlc1xuXHQgKi9cblx0Y2xlYXJBbGxDYWNoZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Q2FjaGUuY2xlYXIoKTtcblxuXHR9XG5cbn0gKTtcblxuZXhwb3J0IHsgVmlld2VyIH07IiwiLyoqXG4gKiBQYW5vbGVucy5qc1xuICogQGF1dGhvciBwY2hlbjY2XG4gKiBAbmFtZXNwYWNlIFBBTk9MRU5TXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9Db25zdGFudHMnO1xuZXhwb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi9EYXRhSW1hZ2UnO1xuZXhwb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL2xvYWRlcnMvSW1hZ2VMb2FkZXInO1xuZXhwb3J0IHsgVGV4dHVyZUxvYWRlciB9IGZyb20gJy4vbG9hZGVycy9UZXh0dXJlTG9hZGVyJztcbmV4cG9ydCB7IEN1YmVUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi9sb2FkZXJzL0N1YmVUZXh0dXJlTG9hZGVyJztcbmV4cG9ydCB7IE1lZGlhIH0gZnJvbSAnLi9tZWRpYS9NZWRpYSc7XG5leHBvcnQgeyBSZXRpY2xlIH0gZnJvbSAnLi9pbnRlcmZhY2UvUmV0aWNsZSc7XG5leHBvcnQgeyBJbmZvc3BvdCB9IGZyb20gJy4vaW5mb3Nwb3QvSW5mb3Nwb3QnO1xuZXhwb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQvV2lkZ2V0JztcbmV4cG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9QYW5vcmFtYSc7XG5leHBvcnQgeyBJbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9JbWFnZVBhbm9yYW1hJztcbmV4cG9ydCB7IEVtcHR5UGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0VtcHR5UGFub3JhbWEnO1xuZXhwb3J0IHsgQ3ViZVBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9DdWJlUGFub3JhbWEnO1xuZXhwb3J0IHsgQmFzaWNQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvQmFzaWNQYW5vcmFtYSc7XG5leHBvcnQgeyBWaWRlb1Bhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9WaWRlb1Bhbm9yYW1hJztcbmV4cG9ydCB7IEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hJztcbmV4cG9ydCB7IExpdHRsZVBsYW5ldCB9IGZyb20gJy4vcGFub3JhbWEvTGl0dGxlUGxhbmV0JztcbmV4cG9ydCB7IEltYWdlTGl0dGxlUGxhbmV0IH0gZnJvbSAnLi9wYW5vcmFtYS9JbWFnZUxpdHRsZVBsYW5ldCc7XG5leHBvcnQgeyBDYW1lcmFQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvQ2FtZXJhUGFub3JhbWEnO1xuZXhwb3J0IHsgVmlld2VyIH0gZnJvbSAnLi92aWV3ZXIvVmlld2VyJztcblxuLy8gZXhwb3NlIFRXRUVOXG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xud2luZG93LlRXRUVOID0gVFdFRU47Il0sIm5hbWVzIjpbInRo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QUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9COztJQUVELE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRTVDOztHQUVEOztFQUVELFVBQVUsRUFBRTs7R0FFWCxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0lBRWhCLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRXJDOztHQUVELEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRTs7SUFFakIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQUVqQzs7R0FFRCxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUU7O0lBRW5CLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFekM7O0dBRUQ7O0VBRUQsV0FBVyxFQUFFOztHQUVaLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTs7SUFFaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRTNDOztHQUVELEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRTs7SUFFakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRS9DOztHQUVELEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRTs7SUFFbkIsSUFBSSxDQUFDLEtBQUss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QUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7R0FDckIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztHQUNsQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7O0dBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25EOztHQUVELE9BQU8sQ0FBQyxDQUFDOztHQUVUOztFQUVELFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7O0dBRTNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0dBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7R0FFOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOztJQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7S0FDVixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hDOztJQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQUUzRSxNQUFNOztJQUVOLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtLQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0RDs7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7S0FDVixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pFOztJQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMs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QUFJLENBQUMsT0FBTyxDQUFDOztDQUV6QixFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Q0FDN0MsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOztDQUUvQyxFQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUc7O0NBRWxCLEdBQUcsT0FBTzs7Q0FFVixHQUFHOztDQUVILEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHOztDQUV6QyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUM1QyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Q0FFN0MsR0FBRzs7Q0FFSCxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRzs7Q0FFckUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Q0FDdEQsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Q0FDdkQsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7O0NBRWxDLEdBQUcsTUFBTTs7Q0FFVCxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztDQUN0RCxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Q0FDdkMsR0FBRyxPQUFPLENB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Q0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztDQUN0RyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztDQUMxRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7Q0FDdkc7Q0FDQSxFQUFFOztDQUVGLENBQUMscUJBQXFCLEVBQUUsWUFBWTs7Q0FFcEMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUMxRixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQzFGLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7Q0FDdEYsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUMzRixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENB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
