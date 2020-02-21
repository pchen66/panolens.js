import { Cache, Texture, RGBFormat, RGBAFormat, CubeTexture, EventDispatcher, VideoTexture, LinearFilter, SpriteMaterial, Sprite, Color, CanvasTexture, DoubleSide, Vector3, Mesh, BackSide, Object3D, SphereBufferGeometry, MeshBasicMaterial, BufferGeometry, BufferAttribute, ShaderLib, BoxBufferGeometry, ShaderMaterial, Matrix4, Vector2, Quaternion, PlaneBufferGeometry, Math as Math$1, MOUSE, PerspectiveCamera, OrthographicCamera, Euler, Scene, StereoCamera, WebGLRenderTarget, NearestFilter, WebGLRenderer, Raycaster, Frustum, REVISION as REVISION$1 } from 'three';

const version="0.11.0";const dependencies={three:"^0.113.2"};

/**
 * REVISION
 * @module REVISION
 * @example PANOLENS.REVISION
 * @type {string} revision
 */
const REVISION = version.split( '.' )[ 1 ];

/**
 * VERSION
 * @module VERSION
 * @example PANOLENS.VERSION
 * @type {string} version
 */
const VERSION = version;

/**
 * THREEJS REVISION
 * @module THREE_REVISION
 * @example PANOLENS.THREE_REVISION
 * @type {string} threejs revision
 */
const THREE_REVISION = dependencies.three.split( '.' )[ 1 ];

/**
 * THREEJS VERSION
 * @module THREE_VERSION
 * @example PANOLENS.THREE_VERSION
 * @type {string} threejs version
 */
const THREE_VERSION = dependencies.three.replace( /[^0-9.]/g, '' );

/**
 * CONTROLS
 * @module CONTROLS
 * @example PANOLENS.CONTROLS.ORBIT
 * @property {number} ORBIT 0
 * @property {number} DEVICEORIENTATION 1
 */
const CONTROLS = { ORBIT: 0, DEVICEORIENTATION: 1 };

/**
 * MODES
 * @module MODES
 * @example PANOLENS.MODES.UNKNOWN
 * @property {number} UNKNOWN 0
 * @property {number} NORMAL 1
 * @property {number} CARDBOARD 2
 * @property {number} STEREO 3
 */
const MODES = { UNKNOWN: 0, NORMAL: 1, CARDBOARD: 2, STEREO: 3 };

/**
 * Data URI Images
 * @module DataImage
 * @example PANOLENS.DataImage.Info
 * @property {string} Info Information Icon
 * @property {string} Arrow Arrow Icon
 * @property {string} FullscreenEnter Fullscreen Enter Icon
 * @property {string} FullscreenLeave Fullscreen Leave Icon
 * @property {string} VideoPlay Video Play Icon
 * @property {string} VideoPause Video Pause Icon
 * @property {string} WhiteTile White Tile Icon
 * @property {string} Setting Settings Icon
 * @property {string} ChevronRight Chevron Right Icon
 * @property {string} Check Check Icon
 * @property {string} ViewIndicator View Indicator Icon
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
 * @module ImageLoader
 * @description Image loader with progress based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js}
 */
const ImageLoader = {

    /**
     * Load image
     * @example PANOLENS.ImageLoader.load( IMAGE_URL )
     * @method load
     * @param  {string}   url        - An image url
     * @param  {function} onLoad     - On load callback
     * @param  {function} onProgress - In progress callback
     * @param  {function} onError    - On error callback
     */
    load: function ( url, onLoad = () => {}, onProgress = () => {}, onError = () => {} ) {

        // Enable cache
        Cache.enabled = true;

        let cached, request, arrayBufferView, blob, urlCreator, image, reference;
	
        // Reference key
        for ( let iconName in DataImage ) {
	
            if ( DataImage.hasOwnProperty( iconName ) && url === DataImage[ iconName ] ) {
	
                reference = iconName;
	
            }
	
        }
	
        // Cached
        cached = Cache.get( reference ? reference : url );
	
        if ( cached !== undefined ) {
	
            if ( onLoad ) {
	
                setTimeout( function () {
	
                    onProgress( { loaded: 1, total: 1 } );
                    onLoad( cached );
	
                }, 0 );
	
            }
	
            return cached;
	
        }
		
        // Construct a new XMLHttpRequest
        urlCreator = window.URL || window.webkitURL;
        image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
	
        // Add to cache
        Cache.add( reference ? reference : url, image );
	
        const onImageLoaded = () => {
	
            urlCreator.revokeObjectURL( image.src );
            onLoad( image );
	
        };

        if ( url.indexOf( 'data:' ) === 0 ) {

            image.addEventListener( 'load', onImageLoaded, false );
            image.src = url;
            return image;
        }
	
        image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';
	
        request = new window.XMLHttpRequest();
        request.open( 'GET', url, true );
        request.responseType = 'arraybuffer';
        request.addEventListener( 'error', onError );
        request.addEventListener( 'progress', event => {

            if  ( !event ) return;

            const { loaded, total, lengthComputable } = event;
            
            if ( lengthComputable ) {
	
                onProgress( { loaded, total } );
	
            }
	
        } );
        
        request.addEventListener( 'loadend', event => {

            if  ( !event ) return;
            const { currentTarget: { response } } = event;

            arrayBufferView = new Uint8Array( response );
            blob = new window.Blob( [ arrayBufferView ] );
				
            image.addEventListener( 'load', onImageLoaded, false );
            image.src = urlCreator.createObjectURL( blob );
	
        } );
	
        request.send(null);
	
    }

};

/**
 * @module TextureLoader
 * @description Texture loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js}
 */
const TextureLoader = {

    /**
     * Load image texture
     * @example PANOLENS.TextureLoader.load( IMAGE_URL )
     * @method load
     * @param  {string}   url        - An image url
     * @param  {function} onLoad     - On load callback
     * @param  {function} onProgress - In progress callback
     * @param  {function} onError    - On error callback
     * @return {THREE.Texture}   	 - Image texture
     */
    load: function ( url, onLoad = () => {}, onProgress, onError ) {

        var texture = new Texture(); 

        ImageLoader.load( url, function ( image ) {

            texture.image = image;

            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
            const isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

            texture.format = isJPEG ? RGBFormat : RGBAFormat;
            texture.needsUpdate = true;

            onLoad( texture );

        }, onProgress, onError );

        return texture;

    }

};

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

	   texture = new CubeTexture( [] );

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

/**
 * @classdesc User Media
 * @constructor
 * @param {object} [constraints={ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: { exact: 'environment' } }, audio: false }]
 */
function Media ( constraints ) {

    const defaultConstraints = { video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: { exact: 'environment' } }, audio: false };

    this.constraints = Object.assign( defaultConstraints, constraints );

    this.container = null;
    this.scene = null;
    this.element = null;
    this.devices = [];
    this.stream = null;
    this.ratioScalar = 1;
    this.videoDeviceIndex = 0;

}
Media.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

    setContainer: function ( container ) {

        this.container = container;

    },

    setScene: function ( scene ) {

        this.scene = scene;

    },

    /**
     * Enumerate devices
     * @memberOf Media
     * @instance
     * @returns {Promise}
     */
    enumerateDevices: function () {

        const devices = this.devices;
        const resolvedPromise = new Promise( resolve => { resolve( devices ); } );

        return devices.length > 0 ? resolvedPromise : window.navigator.mediaDevices.enumerateDevices();

    },

    /**
     * Switch to next available video device
     * @memberOf Media
     * @instance
     */
    switchNextVideoDevice: function () {

        const stop = this.stop.bind( this );
        const start = this.start.bind( this );
        const setVideDeviceIndex = this.setVideDeviceIndex.bind( this );

        let index = this.videoDeviceIndex;

        this.getDevices( 'video' )
            .then( devices => {
                stop();
                index++;
                if ( index >= devices.length ) {
                    setVideDeviceIndex( 0 );
                    index--;
                } else {
                    setVideDeviceIndex( index );
                }

                start( devices[ index ] );
            

            } );

    },

    /**
     * Get devices
     * @param {string} type - type keyword to match device.kind
     * @memberOf Media
     * @instance
     */
    getDevices: function ( type = 'video' ) {

        const devices = this.devices;
        const validate = _devices => {

            return _devices.map( device => { 
                
                if ( !devices.includes( device ) ) { devices.push( device ); }
                return device; 
            
            } );
            
        };
        const filter = _devices => {

            const reg = new RegExp( type, 'i' );
            return _devices.filter( device => reg.test( device.kind ) );

        };

        return this.enumerateDevices()
            .then( validate )
            .then( filter );

    },

    /**
     * Get user media
     * @param {MediaStreamConstraints} constraints
     * @memberOf Media
     * @instance
     */
    getUserMedia: function ( constraints ) {

        const setMediaStream = this.setMediaStream.bind( this );
        const playVideo = this.playVideo.bind( this );
        const onCatchError = error => { console.warn( `PANOLENS.Media: ${error}` ); };

        return window.navigator.mediaDevices.getUserMedia( constraints )
            .then( setMediaStream )
            .then( playVideo )
            .catch( onCatchError );

    },

    /**
     * Set video device index
     * @param {number} index 
     * @memberOf Media
     * @instance
     */
    setVideDeviceIndex: function ( index ) {

        this.videoDeviceIndex = index;

    },

    /**
     * Start streaming
     * @param {MediaDeviceInfo} [targetDevice]
     * @memberOf Media
     * @instance
     */
    start: function( targetDevice ) {

        const constraints = this.constraints;
        const getUserMedia = this.getUserMedia.bind( this );
        const onVideoDevices = devices => {

            if ( !devices || devices.length === 0 ) {

                throw Error( 'no video device found' );

            }

            const device = targetDevice || devices[ 0 ];
            constraints.video.deviceId = device.deviceId;

            return getUserMedia( constraints );

        };

        this.element = this.createVideoElement();

        return this.getDevices().then( onVideoDevices );

    },

    /**
     * Stop streaming
     * @memberOf Media
     * @instance
     */
    stop: function () {

        const stream = this.stream;

        if ( stream && stream.active ) {

            const track = stream.getTracks()[ 0 ];

            track.stop();

            window.removeEventListener( 'resize', this.onWindowResize.bind( this ) );

            this.element = null;
            this.stream = null;

        }

    },

    /**
     * Set media stream
     * @param {MediaStream} stream 
     * @memberOf Media
     * @instance
     */
    setMediaStream: function ( stream ) {

        this.stream = stream;
        this.element.srcObject = stream;

        if ( this.scene ) {

            this.scene.background = this.createVideoTexture();

        }
        
        window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    },

    /**
     * Play video element
     * @memberOf Media
     * @instance
     */
    playVideo: function () {

        const { element } = this;

        if ( element ) {

            element.play();
            this.dispatchEvent( { type: 'play' } );

        }

    },

    /**
     * Pause video element
     * @memberOf Media
     * @instance
     */
    pauseVideo: function () {

        const { element } = this;

        if ( element ) {

            element.pause();
            this.dispatchEvent( { type: 'pause' } );

        }

    },

    /**
     * Create video texture
     * @memberOf Media
     * @instance
     * @returns {THREE.VideoTexture}
     */
    createVideoTexture: function () {

        const video = this.element;
        const texture = new VideoTexture( video );

        texture.generateMipmaps = false;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.format = RGBFormat;
        texture.center.set( 0.5, 0.5 );

        video.addEventListener( 'canplay', this.onWindowResize.bind( this ) );

        return texture;

    },

    /**
     * Create video element
     * @memberOf Media
     * @instance
     * @returns {HTMLVideoElement}
     * @fires Media#canplay
     */
    createVideoElement: function() {

        const dispatchEvent = this.dispatchEvent.bind( this );
        const video = document.createElement( 'video' );

        /**
         * Video can play event
         * @type {object}
         * @event Media#canplay
         */
        const canPlay = () => dispatchEvent( { type: 'canplay' } );
        
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

        video.addEventListener( 'canplay', canPlay );

        return video;

    },

    /**
     * On window resize event
     * @param {Event} event 
     * @memberOf Media
     * @instance
     */
    onWindowResize: function () {

        if ( this.element && this.element.videoWidth && this.element.videoHeight && this.scene ) {

            const { clientWidth: width, clientHeight: height } = this.container;
            const texture = this.scene.background;
            const { videoWidth, videoHeight } = this.element;
            const cameraRatio = videoHeight / videoWidth;
            const viewportRatio = this.container ? width / height : 1.0;
            const ratio = cameraRatio * viewportRatio * this.ratioScalar;

            if ( width > height ) {
                texture.repeat.set( ratio, 1 );
            } else {
                texture.repeat.set( 1, 1 / ratio );
            }

        }

    }

} );

/**
 * @classdesc Reticle 3D Sprite
 * @constructor
 * @param {THREE.Color} [color=0xffffff] - Color of the reticle sprite
 * @param {boolean} [autoSelect=true] - Auto selection
 * @param {number} [dwellTime=1500] - Duration for dwelling sequence to complete
 */

function Reticle ( color = 0xffffff, autoSelect = true, dwellTime = 1500 ) {

    this.dpr = window.devicePixelRatio;

    const { canvas, context } = this.createCanvas();
    const material = new SpriteMaterial( { color, map: this.createCanvasTexture( canvas ) } );

    Sprite.call( this, material );

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = context;
    this.color = color instanceof Color ? color : new Color( color );    

    this.autoSelect = autoSelect;
    this.dwellTime = dwellTime;
    this.rippleDuration = 500;
    this.position.z = -10;
    this.center.set( 0.5, 0.5 );
    this.scale.set( 0.5, 0.5, 1 );

    this.startTimestamp = null;
    this.timerId = null;
    this.callback = null;

    this.frustumCulled = false;

    this.updateCanvasArcByProgress( 0 );

}
Reticle.prototype = Object.assign( Object.create( Sprite.prototype ), {

    constructor: Reticle,

    /**
     * Set material color
     * @param {THREE.Color} color 
     * @memberOf Reticle
     * @instance
     */
    setColor: function ( color ) {

        this.material.color.copy( color instanceof Color ? color : new Color( color ) );

    },

    /**
     * Create canvas texture
     * @param {HTMLCanvasElement} canvas 
     * @memberOf Reticle
     * @instance
     * @returns {THREE.CanvasTexture}
     */
    createCanvasTexture: function ( canvas ) {

        const texture = new CanvasTexture( canvas );
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = false;

        return texture;

    },

    /**
     * Create canvas element
     * @memberOf Reticle
     * @instance
     * @returns {object} object
     * @returns {HTMLCanvasElement} object.canvas
     * @returns {CanvasRenderingContext2D} object.context
     */
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
        context.shadowColor = 'rgba(200,200,200,0.9)';

        return { canvas, context };

    },

    /**
     * Update canvas arc by progress
     * @param {number} progress 
     * @memberOf Reticle
     * @instance
     */
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

    /**
     * Ripple effect
     * @memberOf Reticle
     * @instance
     * @fires Reticle#reticle-ripple-start
     * @fires Reticle#reticle-ripple-end
     */
    ripple: function () {

        const context = this.context;
        const { canvasWidth, canvasHeight, material } = this;
        const duration = this.rippleDuration;
        const timestamp = performance.now();
        const color = this.color;
        const dpr = this.dpr;
        const x = canvasWidth * 0.5 / dpr;
        const y = canvasHeight * 0.5 / dpr;

        const update = () => {

            const timerId = window.requestAnimationFrame( update );
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

            if ( progress >= 1.0 ) {

                window.cancelAnimationFrame( timerId );
                this.updateCanvasArcByProgress( 0 );

                /**
                 * Reticle ripple end event
                 * @type {object}
                 * @event Reticle#reticle-ripple-end
                 */
                this.dispatchEvent( { type: 'reticle-ripple-end' } );

            }

            material.map.needsUpdate = true;

        };

        /**
         * Reticle ripple start event
         * @type {object}
         * @event Reticle#reticle-ripple-start
         */
        this.dispatchEvent( { type: 'reticle-ripple-start' } );

        update();

    },

    /**
     * Make reticle visible
     * @memberOf Reticle
     * @instance
     */
    show: function () {

        this.visible = true;

    },

    /**
     * Make reticle invisible
     * @memberOf Reticle
     * @instance
     */
    hide: function () {

        this.visible = false;

    },

    /**
     * Start dwelling
     * @param {function} callback 
     * @memberOf Reticle
     * @instance
     * @fires Reticle#reticle-start
     */
    start: function ( callback ) {

        if ( !this.autoSelect ) {

            return;

        }

        /**
         * Reticle start event
         * @type {object}
         * @event Reticle#reticle-start
         */
        this.dispatchEvent( { type: 'reticle-start' } );

        this.startTimestamp = performance.now();
        this.callback = callback;
        this.update();

    },

    /**
     * End dwelling
     * @memberOf Reticle
     * @instance
     * @fires Reticle#reticle-end
     */
    end: function(){

        if ( !this.startTimestamp ) { return; }

        window.cancelAnimationFrame( this.timerId );

        this.updateCanvasArcByProgress( 0 );
        this.callback = null;
        this.timerId = null;
        this.startTimestamp = null;

        /**
         * Reticle end event
         * @type {object}
         * @event Reticle#reticle-end
         */
        this.dispatchEvent( { type: 'reticle-end' } );

    },

    /**
     * Update dwelling
     * @memberOf Reticle
     * @instance
     * @fires Reticle#reticle-update
     */
    update: function () {

        this.timerId = window.requestAnimationFrame( this.update.bind( this ) );

        const elapsed = performance.now() - this.startTimestamp;
        const progress = elapsed / this.dwellTime;

        this.updateCanvasArcByProgress( progress );

        /**
         * Reticle update event
         * @type {object}
         * @event Reticle#reticle-update
         */
        this.dispatchEvent( { type: 'reticle-update', progress } );

        if ( progress >= 1.0 ) {

            window.cancelAnimationFrame( this.timerId );
            if ( this.callback ) { this.callback(); }
            this.end();
            this.ripple();

        }

    }

} );

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

})();
});

/**
 * @classdesc Information spot attached to panorama
 * @constructor
 * @param {number} [scale=300] - Default scale
 * @param {string} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
 * @param {boolean} [animated=true] - Enable default hover animation
 */
function Infospot ( scale = 300, imageSrc, animated ) {
	
    const duration = 500, scaleFactor = 1.3;

    imageSrc = imageSrc || DataImage.Info;

    Sprite.call( this );

    this.type = 'infospot';

    this.animated = animated !== undefined ? animated : true;
    this.isHovering = false;

    /*
     * TODO: Three.js bug hotfix for sprite raycasting r104
     * https://github.com/mrdoob/three.js/issues/14624
     */
    this.frustumCulled = false;

    this.element = null;
    this.toPanorama = null;
    this.cursorStyle = null;

    this.mode = MODES.NORMAL;

    this.scale.set( scale, scale, 1 );
    this.rotation.y = Math.PI;

    this.container = null;

    this.originalRaycast = this.raycast;

    // Event Handler
    this.HANDLER_FOCUS = null;	

    this.material.side = DoubleSide;
    this.material.depthTest = false;
    this.material.transparent = true;
    this.material.opacity = 0;

    this.scaleUpAnimation = new Tween.Tween();
    this.scaleDownAnimation = new Tween.Tween();


    const postLoad = function ( texture ) {

        if ( !this.material ) { return; }

        const ratio = texture.image.width / texture.image.height;
        const textureScale = new Vector3();

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

    TextureLoader.load( imageSrc, postLoad );	

}
Infospot.prototype = Object.assign( Object.create( Sprite.prototype ), {

    constructor: Infospot,

    /**
     * Set infospot container
     * @param {HTMLElement|object} data - Data with container information
     * @memberOf Infospot
     * @instance
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
     * @memberOf Infospot
     * @instance
     * @return {HTMLElement} - The container of this infospot
     */
    getContainer: function () {

        return this.container;

    },

    /**
     * This will be called by a click event
     * Translate and lock the hovering element if any
     * @param  {object} event - Event containing mouseEvent with clientX and clientY
     * @memberOf Infospot
     * @instance
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
     * @memberOf Infospot
     * @instance
     */
    onDismiss: function () {

        if ( this.element ) {

            this.unlockHoverElement();
            this.onHoverEnd();

        }

    },

    /**
     * This will be called by a mouse hover event
     * Translate the hovering element if any
     * @param  {object} event - Event containing mouseEvent with clientX and clientY
     * @memberOf Infospot
     * @instance
     */
    onHover: function () {},

    /**
     * This will be called on a mouse hover start
     * Sets cursor style to 'pointer', display the element and scale up the infospot
     * @param {object} event
     * @memberOf Infospot
     * @instance
     */
    onHoverStart: function ( event ) {

        if ( !this.getContainer() ) { return; }

        const cursorStyle = this.cursorStyle || ( this.mode === MODES.NORMAL ? 'pointer' : 'default' );
        const { scaleDownAnimation, scaleUpAnimation, element } = this;

        this.isHovering = true;
        this.container.style.cursor = cursorStyle;
		
        if ( this.animated ) {

            scaleDownAnimation.stop();
            scaleUpAnimation.start();

        }
		
        if ( element && event.mouseEvent.clientX >= 0 && event.mouseEvent.clientY >= 0 ) {

            const { left, right, style } = element;

            if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

                style.display = 'none';
                left.style.display = 'block';
                right.style.display = 'block';

                // Store element width for reference
                element._width = left.clientWidth;
                element._height = left.clientHeight;

            } else {

                style.display = 'block';
                if ( left ) { left.style.display = 'none'; }
                if ( right ) { right.style.display = 'none'; }

                // Store element width for reference
                element._width = element.clientWidth;
                element._height = element.clientHeight;

            }
			
        }

    },

    /**
     * This will be called on a mouse hover end
     * Sets cursor style to 'default', hide the element and scale down the infospot
     * @memberOf Infospot
     * @instance
     */
    onHoverEnd: function () {

        if ( !this.getContainer() ) { return; }

        const { scaleDownAnimation, scaleUpAnimation, element } = this;

        this.isHovering = false;
        this.container.style.cursor = 'default';

        if ( this.animated ) {

            scaleUpAnimation.stop();
            scaleDownAnimation.start();

        }

        if ( element && !this.element.locked ) {

            const { left, right, style } = element;

            style.display = 'none';
            if ( left ) { left.style.display = 'none'; }
            if ( right ) { right.style.display = 'none'; }

            this.unlockHoverElement();

        }

    },

    /**
     * On dual eye effect handler
     * Creates duplicate left and right element
     * @param  {object} event - panolens-dual-eye-effect event
     * @memberOf Infospot
     * @instance
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

        if ( !element.left && !element.right ) {

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
     * @memberOf Infospot
     * @instance
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
     * @memberOf Infospot
     * @instance
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
     * @memberOf Infospot
     * @instance
     */
    setText: function ( text ) {

        if ( this.element ) {

            this.element.textContent = text;

        }

    },

    /**
     * Set cursor css style on hover
     * @memberOf Infospot
     * @instance
     */
    setCursorHoverStyle: function ( style ) {

        this.cursorStyle = style;

    },

    /**
     * Add hovering text element
     * @param {string} text - Text to be displayed
     * @param {number} [delta=40] - Vertical delta to the infospot
     * @memberOf Infospot
     * @instance
     */
    addHoverText: function ( text, delta = 40 ) {

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
            this.element.verticalDelta = delta;

        }

        this.setText( text );

    },

    /**
     * Add hovering element by cloning an element
     * @param {HTMLDOMElement} el - Element to be cloned and displayed
     * @param {number} [delta=40] - Vertical delta to the infospot
     * @memberOf Infospot
     * @instance
     */
    addHoverElement: function ( el, delta = 40 ) {

        if ( !this.element ) { 

            this.element = el.cloneNode( true );
            this.element.style.display = 'none';
            this.element.style.top = 0;
            this.element.style.position = 'absolute';
            this.element.classList.add( 'panolens-infospot' );
            this.element.verticalDelta = delta;

        }

    },

    /**
     * Remove hovering element
     * @memberOf Infospot
     * @instance
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
     * @memberOf Infospot
     * @instance
     */
    lockHoverElement: function () {

        if ( this.element ) { 

            this.element.locked = true;

        }

    },

    /**
     * Unlock hovering element
     * @memberOf Infospot
     * @instance
     */
    unlockHoverElement: function () {

        if ( this.element ) { 

            this.element.locked = false;

        }

    },

    /**
     * Enable raycasting
     * @param {boolean} [enabled=true]
     * @memberOf Infospot
     * @instance
     */
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
     * @memberOf Infospot
     * @instance
     */
    show: function ( delay = 0 ) {

        const { animated, hideAnimation, showAnimation, material } = this;

        if ( animated ) {

            hideAnimation.stop();
            showAnimation.delay( delay ).start();

        } else {

            this.enableRaycast( true );
            material.opacity = 1;

        }

    },

    /**
     * Hide infospot
     * @param  {number} [delay=0] - Delay time to hide
     * @memberOf Infospot
     * @instance
     */
    hide: function ( delay = 0 ) {

        const { animated, hideAnimation, showAnimation, material } = this;

        if ( animated ) {

            showAnimation.stop();
            hideAnimation.delay( delay ).start();

        } else {

            this.enableRaycast( false );
            material.opacity = 0;

        }
		
    },

    /**
     * Set focus event handler
     * @memberOf Infospot
     * @instance
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
     * @memberOf Infospot
     * @instance
     */
    focus: function ( duration, easing ) {

        if ( this.HANDLER_FOCUS ) {

            this.HANDLER_FOCUS( this.position, duration, easing );
            this.onDismiss();

        }

    },

    /**
     * Dispose
     * @memberOf Infospot
     * @instance
     */
    dispose: function () {

        const { geometry, material } = this;
        const { map } = material;

        this.removeHoverElement();

        if ( this.parent ) {

            this.parent.remove( this );

        }

        if ( map ) { map.dispose(); material.map = null; }
        if ( geometry ) { geometry.dispose(); this.geometry = null; }
        if ( material ) { material.dispose(); this.material = null; }

    }

} );

/**
 * @classdesc Widget for controls
 * @constructor
 * @param {HTMLElement} container - A domElement where default control widget will be attached to
 */
function Widget ( container ) {

    if ( !container ) {

        console.warn( 'PANOLENS.Widget: No container specified' );

    }

    EventDispatcher.call( this );

    this.DEFAULT_TRANSITION  = 'all 0.27s ease';
    this.TOUCH_ENABLED = !!(( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch);
    this.PREVENT_EVENT_HANDLER = function ( event ) {
        event.preventDefault();
        event.stopPropagation();
    };

    this.container = container;

    this.barElement = null;
    this.fullscreenElement = null;
    this.videoElement = null;
    this.settingElement = null;

    this.mainMenu = null;

    this.activeMainItem = null;
    this.activeSubMenu = null;
    this.mask = null;

}

Widget.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

    constructor: Widget,

    /**
     * Add control bar
     * @memberOf Widget
     * @instance
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
     * @memberOf Widget
     * @instance
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

            };

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
     * @memberOf Widget
     * @instance
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

    /**
     * Create modal mask
     * @memberOf Widget
     * @instance
     */
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
     * @memberOf Widget
     * @instance
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

            style: { 

                backgroundImage: 'url("' + DataImage.Setting + '")',
                webkitTransition: this.DEFAULT_TRANSITION,
                transition: this.DEFAULT_TRANSITION

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
     * @memberOf Widget
     * @instance
     * @fires Widget#panolens-viewer-handler
     */
    createFullscreenButton: function () {

        let scope = this, item, isFullscreen = false, tapSkipped = true, stylesheetId;

        const { container } = this;

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

                if ( container.requestFullscreen ) { container.requestFullscreen(); }
                if ( container.msRequestFullscreen ) { container.msRequestFullscreen(); }
                if ( container.mozRequestFullScreen ) { container.mozRequestFullScreen(); }
                if ( container.webkitRequestFullscreen ) { container.webkitRequestFullscreen( Element.ALLOW_KEYBOARD_INPUT ); }
              
                isFullscreen = true;

            } else {

                if ( document.exitFullscreen ) { document.exitFullscreen(); }
                if ( document.msExitFullscreen ) { document.msExitFullscreen(); }
                if ( document.mozCancelFullScreen ) { document.mozCancelFullScreen(); }
                if ( document.webkitExitFullscreen ) { document.webkitExitFullscreen( ); }

                isFullscreen = false;

            }

            this.style.backgroundImage = ( isFullscreen ) 
                ? 'url("' + DataImage.FullscreenLeave + '")' 
                : 'url("' + DataImage.FullscreenEnter + '")';

        }

        function onFullScreenChange () {

            if ( tapSkipped ) {

                isFullscreen = !isFullscreen; 

                item.style.backgroundImage = ( isFullscreen ) 
                    ? 'url("' + DataImage.FullscreenLeave + '")' 
                    : 'url("' + DataImage.FullscreenEnter + '")';

            }

            /**
             * Viewer handler event
             * @type {object}
             * @event Widget#panolens-viewer-handler
             * @property {string} method - 'onWindowResize' function call on Viewer
             */
            scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onWindowResize' } );

            tapSkipped = true;

        }

        document.addEventListener( 'fullscreenchange', onFullScreenChange, false );
        document.addEventListener( 'webkitfullscreenchange', onFullScreenChange, false );
        document.addEventListener( 'mozfullscreenchange', onFullScreenChange, false );
        document.addEventListener( 'MSFullscreenChange', onFullScreenChange, false );

        item = this.createCustomItem( { 

            style: { 

                backgroundImage: 'url("' + DataImage.FullscreenEnter + '")' 

            },

            onTap: onTap

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
     * @memberOf Widget
     * @instance
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
     * @memberOf Widget
     * @instance
     * @return {HTMLSpanElement} - The dom element icon for video control
     * @fires Widget#panolens-viewer-handler
     */
    createVideoControlButton: function () {

        const scope = this;

        function onTap ( event ) {

            event.preventDefault();
            event.stopPropagation();

            /**
             * Viewer handler event
             * @type {object}
             * @event Widget#panolens-viewer-handler
             * @property {string} method - 'toggleVideoPlay' function call on Viewer
             */
            scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay', data: !this.paused } );

            this.paused = !this.paused;

            item.update();

        }
        const item = this.createCustomItem( { 

            style: { 

                float: 'left',
                backgroundImage: 'url("' + DataImage.VideoPlay + '")'

            },

            onTap: onTap

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
     * @memberOf Widget
     * @instance
     * @return {HTMLSpanElement} - The dom element icon for video seekbar
     * @fires Widget#panolens-viewer-handler
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
                 * @event Widget#panolens-viewer-handler
                 * @property {string} method - 'setVideoCurrentTime' function call on Viewer
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
             * @property {string} method - 'setVideoCurrentTime' function call on Viewer
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

            style: { 

                float: 'left',
                width: '30%',
                height: '4px',
                marginTop: '20px',
                backgroundColor: 'rgba(188,188,188,0.8)'

            },

            onTap: onTap,
            onDispose: onDispose

        } );

        item.appendChild( progressElement );

        item.setProgress = function( percentage ) {

            progressElement.style.width = percentage * 100 + '%';

        };		

        this.addEventListener( 'video-update', function ( event ) { 

            item.setProgress( event.percentage ); 

        } );

        item.progressElement = progressElement;
        item.progressElementControl = progressElementControl;

        return item;

    },

    /**
     * Create menu item
     * @param  {string} title - Title to display
     * @memberOf Widget
     * @instance
     * @return {HTMLElement} - An anchor tag element
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
     * @memberOf Widget
     * @instance
     * @return {HTMLElement} - An anchor tag element
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
     * @memberOf Widget
     * @instance
     * @return {HTMLElement} - A span element
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
     * @memberOf Widget
     * @instance
     * @return {HTMLElement} - A span element
     */
    createSubMenu: function ( title, items ) {

        let scope = this, menu, subMenu = this.createMenu();

        subMenu.items = items;
        subMenu.activeItem = null;

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

                if ( this.handler ) { this.handler(); }

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
     * @memberOf Widget
     * @instance
     * @return {HTMLElement} - A span element
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
     * @memberOf Widget
     * @instance
     * @return {HTMLSpanElement} - The dom element icon
     */
    createCustomItem: function ( options = {} ) {

        const scope = this;
        const item = options.element || document.createElement( 'span' );
        const { onDispose } = options;

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

            if ( onDispose ) { options.onDispose(); }

        };
		
        return item;

    },

    /**
     * Merge item css style
     * @param  {HTMLElement} element - The element to be merged with style
     * @param  {object} options - The style options
     * @memberOf Widget
     * @instance
     * @return {HTMLElement} - The same element with merged styles
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
     * @memberOf Widget
     * @instance
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
 * @classdesc Base Panorama
 * @constructor
 * @param {THREE.Geometry} geometry - The geometry for this panorama
 * @param {THREE.Material} material - The material for this panorama
 */
function Panorama ( geometry, material ) {

    Mesh.call( this, geometry, material );

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

    this.material.side = BackSide;
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

Panorama.prototype = Object.assign( Object.create( Mesh.prototype ), {

    constructor: Panorama,

    /**
     * Adding an object
     * To counter the scale.x = -1, it will automatically add an 
     * empty object with inverted scale on x
     * @memberOf Panorama
     * @instance
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

                const { container } = this;

                if ( container ) { object.dispatchEvent( { type: 'panolens-container', container } ); }
				
                object.dispatchEvent( { type: 'panolens-infospot-focus', method: function ( vector, duration, easing ) {

                    /**
                     * Infospot focus handler event
                     * @type {object}
                     * @event Panorama#panolens-viewer-handler
                     * @property {string} method - Viewer function name
                     * @property {*} data - The argument to be passed into the method
                     */
                    this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'tweenControlCenter', data: [ vector, duration, easing ] } );


                }.bind( this ) } );
            }

        } else {

            // Counter scale.x = -1 effect
            invertedObject = new Object3D();
            invertedObject.scale.x = -1;
            invertedObject.scalePlaceHolder = true;
            invertedObject.add( object );

        }

        Object3D.prototype.add.call( this, invertedObject );

    },

    load: function () {

        this.onLoad();
		
    },

    /**
     * Click event handler
     * @param  {object} event - Click event
     * @memberOf Panorama
     * @instance
     * @fires Infospot#dismiss
     */
    onClick: function ( event ) {

        if ( event.intersects && event.intersects.length === 0 ) {

            this.traverse( function ( object ) {

                /**
                 * Dimiss event
                 * @type {object}
                 * @event Infospot#dismiss
                 */
                object.dispatchEvent( { type: 'dismiss' } );

            } );

        }

    },

    /**
     * Set container of this panorama 
     * @param {HTMLElement|object} data - Data with container information
     * @memberOf Panorama
     * @instance
     * @fires Infospot#panolens-container
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
                     * @event Infospot#panolens-container
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
     * @memberOf Panorama
     * @instance
     * @fires Panorama#load
     */
    onLoad: function () {

        this.loaded = true;

        /**
         * Load panorama event
         * @type {object}
         * @event Panorama#load
         */
        this.dispatchEvent( { type: 'load' } );

    },

    /**
     * This will be called when panorama is in progress
     * @memberOf Panorama
     * @instance
     * @fires Panorama#progress
     */
    onProgress: function ( progress ) {

        /**
         * Loading panorama progress event
         * @type {object}
         * @event Panorama#progress
         * @property {object} progress - The progress object containing loaded and total amount
         */
        this.dispatchEvent( { type: 'progress', progress: progress } );

    },

    /**
     * This will be called when panorama loading has error
     * @memberOf Panorama
     * @instance
     * @fires Panorama#error
     */
    onError: function () {

        /**
         * Loading panorama error event
         * @type {object}
         * @event Panorama#error
         */
        this.dispatchEvent( { type: 'error' } );

    },

    /**
     * Get zoom level based on window width
     * @memberOf Panorama
     * @instance
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
     * @memberOf Panorama
     * @instance
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
     * @memberOf Panorama
     * @instance
     * @fires Panorama#infospot-animation-complete
     */
    toggleInfospotVisibility: function ( isVisible, delay ) {

        delay = ( delay !== undefined ) ? delay : 0;

        const visible = ( isVisible !== undefined ) ? isVisible : ( this.isInfospotVisible ? false : true );

        this.traverse( function ( object ) {

            if ( object instanceof Infospot ) {

                if ( visible ) {

                    object.show( delay );

                } else {

                    object.hide( delay );

                }

            }

        } );

        this.isInfospotVisible = visible;

        // Animation complete event
        this.infospotAnimation.onComplete( function () {

            /**
             * Complete toggling infospot visibility
             * @event Panorama#infospot-animation-complete
             * @type {object} 
             */
            this.dispatchEvent( { type: 'infospot-animation-complete', visible: visible } );

        }.bind( this ) ).delay( delay ).start();

    },

    /**
     * Set image of this panorama's linking infospot
     * @memberOf Panorama
     * @instance
     * @param {string} url   - Url to the image asset
     * @param {number} scale - Scale factor of the infospot
     */
    setLinkingImage: function ( url, scale ) {

        this.linkingImageURL = url;
        this.linkingImageScale = scale;

    },

    /**
     * Link one-way panorama
     * @param  {Panorama} pano  - The panorama to be linked to
     * @param  {THREE.Vector3} position - The position of infospot which navigates to the pano
     * @param  {number} [imageScale=300] - Image scale of linked infospot
     * @param  {string} [imageSrc=DataImage.Arrow] - The image source of linked infospot
     * @memberOf Panorama
     * @instance
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
             * @event Panorama#panolens-viewer-handler
             * @property {string} method - Viewer function name
             * @property {*} data - The argument to be passed into the method
             */
            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setPanorama', data: pano } );

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
                // this.material.visible = true;

                /**
                 * Enter panorama fade in start event
                 * @event Panorama#enter-fade-start
                 * @type {object} 
                 */
                this.dispatchEvent( { type: 'enter-fade-start' } );

            }.bind( this ) );

        this.fadeOutAnimation = new Tween.Tween( this.material )
            .easing( Tween.Easing.Quartic.Out )
            .onComplete( function () {

                this.visible = false;
                // this.material.visible = true;

                /**
                 * Leave panorama complete event
                 * @event Panorama#leave-complete
                 * @type {object} 
                 */
                this.dispatchEvent( { type: 'leave-complete' } );

            }.bind( this ) );

        this.enterTransition = new Tween.Tween( this )
            .easing( Tween.Easing.Quartic.Out )
            .onComplete( function () {

                /**
                 * Enter panorama and animation complete event
                 * @event Panorama#enter-complete
                 * @type {object} 
                 */
                this.dispatchEvent( { type: 'enter-complete' } );

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
     * @memberOf Panorama
     * @instance
     * @fires Panorama#enter-fade-complete
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
                 * @event Panorama#enter-fade-complete
                 * @type {object} 
                 */
                this.dispatchEvent( { type: 'enter-fade-complete' } );			

            }.bind( this ) )
            .start();

    },

    /**
     * Start fading out animation
     * @memberOf Panorama
     * @instance
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
     * @memberOf Panorama
     * @instance
     * @fires Panorama#enter
     * @fires Panorama#enter-start
     */
    onEnter: function () {

        const duration = this.animationDuration;

        this.leaveTransition.stop();
        this.enterTransition
            .to( {}, duration )
            .onStart( function () {

                /**
                 * Enter panorama and animation starting event
                 * @event Panorama#enter-start
                 * @type {object} 
                 */
                this.dispatchEvent( { type: 'enter-start' } );
				
                if ( this.loaded ) {

                    this.fadeIn( duration );

                } else {

                    this.load();

                }
				
            }.bind( this ) )
            .start();

        /**
         * Enter panorama event
         * @event Panorama#enter
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
     * @memberOf Panorama
     * @instance
     * @fires Panorama#leave
     */
    onLeave: function () {

        const duration = this.animationDuration;

        this.enterTransition.stop();
        this.leaveTransition
            .to( {}, duration )
            .onStart( function () {

                /**
                 * Leave panorama and animation starting event
                 * @event Panorama#leave-start
                 * @type {object} 
                 */
                this.dispatchEvent( { type: 'leave-start' } );

                this.fadeOut( duration );
                this.toggleInfospotVisibility( false );

            }.bind( this ) )
            .start();

        /**
         * Leave panorama event
         * @event Panorama#leave
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
     * @memberOf Panorama
     * @instance
     */
    dispose: function () {

        this.infospotAnimation.stop();
        this.fadeInAnimation.stop();
        this.fadeOutAnimation.stop();
        this.enterTransition.stop();
        this.leaveTransition.stop();

        /**
         * On panorama dispose handler
         * @type {object}
         * @event Panorama#panolens-viewer-handler
         * @property {string} method - Viewer function name
         * @property {*} data - The argument to be passed into the method
         */
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onPanoramaDispose', data: this } );

        // recursive disposal on 3d objects
        function recursiveDispose ( object ) {

            const { geometry, material } = object;

            for ( var i = object.children.length - 1; i >= 0; i-- ) {

                recursiveDispose( object.children[i] );
                object.remove( object.children[i] );

            }

            if ( object instanceof Infospot ) {

                object.dispose();

            }
			
            if ( geometry ) { geometry.dispose(); object.geometry = null; }
            if ( material ) { material.dispose(); object.material = null; }

        }

        recursiveDispose( this );

        if ( this.parent ) {

            this.parent.remove( this );

        }

    }

} );

/**
 * @classdesc Equirectangular based image panorama
 * @constructor
 * @param {string} image - Image url or HTMLImageElement
 */
function ImagePanorama ( image, _geometry, _material ) {

    const radius = 5000;
    const geometry = _geometry || new SphereBufferGeometry( radius, 60, 40 );
    const material = _material || new MeshBasicMaterial( { opacity: 0, transparent: true } );

    Panorama.call( this, geometry, material );

    this.src = image;
    this.radius = radius;

}

ImagePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: ImagePanorama,

    /**
     * Load image asset
     * @param  {*} src - Url or image element
     * @memberOf ImagePanorama
     * @instance
     */
    load: function ( src ) {

        src = src || this.src;

        if ( !src ) { 

            console.warn( 'Image source undefined' );

            return; 

        } else if ( typeof src === 'string' ) {

            TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

        } else if ( src instanceof HTMLImageElement ) {

            this.onLoad( new Texture( src ) );

        }

    },

    /**
     * This will be called when image is loaded
     * @param  {THREE.Texture} texture - Texture to be updated
     * @memberOf ImagePanorama
     * @instance
     */
    onLoad: function ( texture ) {

        texture.minFilter = texture.magFilter = LinearFilter;
        texture.needsUpdate = true;
		
        this.updateTexture( texture );

        window.requestAnimationFrame( Panorama.prototype.onLoad.bind( this ) );

    },

    /**
     * Reset
     * @memberOf ImagePanorama
     * @instance
     */
    reset: function () {

        Panorama.prototype.reset.call( this );

    },

    /**
     * Dispose
     * @memberOf ImagePanorama
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        // Release cached image
        Cache.remove( this.src );

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

/**
 * @classdesc Empty panorama
 * @constructor
 */
function EmptyPanorama () {

    const geometry = new BufferGeometry();
    const material = new MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

    geometry.addAttribute( 'position', new BufferAttribute( new Float32Array(), 1 ) );

    Panorama.call( this, geometry, material );

}

EmptyPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: EmptyPanorama

} );

/**
 * @classdesc Cubemap-based panorama
 * @constructor
 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
 */
function CubePanorama ( images = [] ){

    const edgeLength = 10000;
    const shader = Object.assign( {}, ShaderLib[ 'cube' ] );
    const geometry = new BoxBufferGeometry( edgeLength, edgeLength, edgeLength );
    const material = new ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        side: BackSide,
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
     * @memberOf CubePanorama
     * @instance
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
     * @memberOf CubePanorama
     * @instance
     */
    onLoad: function ( texture ) {
		
        this.material.uniforms[ 'tCube' ].value = texture;

        Panorama.prototype.onLoad.call( this );

    },

    /**
     * Dispose
     * @memberOf CubePanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tCube;

        this.images.forEach( ( image ) => { Cache.remove( image ); } );

        if ( value instanceof CubeTexture ) {

            value.dispose();

        }

        Panorama.prototype.dispose.call( this );

    }

} );

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

/**
 * @classdesc Video Panorama
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
    const geometry = new SphereBufferGeometry( radius, 60, 40 );
    const material = new MeshBasicMaterial( { opacity: 0, transparent: true } );

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
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})( window.navigator.userAgent || window.navigator.vendor || window.opera );
        return check;

    },

    /**
     * Load video panorama
     * @memberOf VideoPanorama
     * @instance
     * @fires  Panorama#panolens-viewer-handler
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

        const onloadeddata = function() {

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

            window.requestAnimationFrame( loaded );
			
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

            if ( video.querySelectorAll( 'source' ).length === 0 ) {

                const source = document.createElement( 'source' );
                source.src = this.src;
                video.appendChild( source );

            }

            video.load();
        }

        video.addEventListener( 'loadeddata', onloadeddata.bind( this ) );
		
        video.addEventListener( 'timeupdate', function () {

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
     * @memberOf VideoPanorama
     * @instance
     * @param {HTMLVideoElement} video  - The html5 video element
     * @fires Panorama#panolens-viewer-handler
     */
    setVideoTexture: function ( video ) {

        if ( !video ) return;

        const videoTexture = new VideoTexture( video );
        videoTexture.minFilter = LinearFilter;
        videoTexture.magFilter = LinearFilter;
        videoTexture.format = RGBFormat;

        this.updateTexture( videoTexture );
	
    },

    /**
     * Reset
     * @memberOf VideoPanorama
     * @instance
     */
    reset: function () {

        this.videoElement = undefined;	

        Panorama.prototype.reset.call( this );

    },

    /**
     * Check if video is paused
     * @memberOf VideoPanorama
     * @instance
     * @return {boolean} - is video paused or not
     */
    isVideoPaused: function () {

        return this.videoElement.paused;

    },

    /**
     * Toggle video to play or pause
     * @memberOf VideoPanorama
     * @instance
     */
    toggleVideo: function () {

        const video = this.videoElement;

        if ( !video ) { return; }

        video[ video.paused ? 'play' : 'pause' ]();

    },

    /**
     * Set video currentTime
     * @memberOf VideoPanorama
     * @instance
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
     * @memberOf VideoPanorama
     * @instance
     * @fires VideoPanorama#play
     * @fires VideoPanorama#play-error
     */
    playVideo: function () {

        const video = this.videoElement;
        const playVideo = this.playVideo.bind( this );
        const dispatchEvent = this.dispatchEvent.bind( this );
        const onSuccess = () => {

            /**
             * Play event
             * @type {object}
             * @event VideoPanorama#play
             *
             */
            dispatchEvent( { type: 'play' } );

        };
        const onError = ( error ) => {

            // Error playing video. Retry next frame. Possibly Waiting for user interaction
            window.requestAnimationFrame( playVideo );

            /**
             * Play event
             * @type {object}
             * @event VideoPanorama#play-error
             *
             */
            dispatchEvent( { type: 'play-error', error } );

        };

        if ( video && video.paused ) {

            video.play().then( onSuccess ).catch( onError );

        }

    },

    /**
     * Pause video
     * @memberOf VideoPanorama
     * @instance
     * @fires VideoPanorama#pause
     */
    pauseVideo: function () {

        const video = this.videoElement;

        if ( video && !video.paused ) {

            video.pause();

        }

        /**
         * Pause event
         * @type {object}
         * @event VideoPanorama#pause
         *
         */
        this.dispatchEvent( { type: 'pause' } );

    },

    /**
     * Resume video
     * @memberOf VideoPanorama
     * @instance
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
     * @memberOf VideoPanorama
     * @instance
     */
    resetVideo: function () {

        const video = this.videoElement;

        if ( video ) {

            this.setVideoCurrentTime( { percentage: 0 } );

        }

    },

    /**
     * Check if video is muted
     * @memberOf VideoPanorama
     * @instance
     * @return {boolean} - is video muted or not
     */
    isVideoMuted: function () {

        return this.videoElement.muted;

    },

    /**
     * Mute video
     * @memberOf VideoPanorama
     * @instance
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
     * @memberOf VideoPanorama
     * @instance
     */
    unmuteVideo: function () {

        const video = this.videoElement;

        if ( video && this.isVideoMuted() ) {

            video.muted = false;

        }

        this.dispatchEvent( { type: 'volumechange' } );

    },

    /**
     * Returns the video element
     * @memberOf VideoPanorama
     * @instance
     * @returns {HTMLElement}
     */
    getVideoElement: function () {

        return this.videoElement;

    },

    /**
     * Dispose video panorama
     * @memberOf VideoPanorama
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        this.pauseVideo();
		
        this.removeEventListener( 'leave', this.pauseVideo.bind( this ) );
        this.removeEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
        this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
        this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

/**
 * @classdesc Google Street View Loader
 * @constructor
 * @param {object} parameters 
 */
function GoogleStreetviewLoader ( parameters = {} ) {

    this._parameters = parameters;
    this._zoom = null;
    this._panoId = null;
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

    this.maxW = 6656;
    this.maxH = 6656;

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

    this.maxW = Math.max( gl.getParameter( gl.MAX_TEXTURE_SIZE ), this.maxW );
    this.maxH = Math.max( gl.getParameter( gl.MAX_TEXTURE_SIZE ), this.maxH );

}

Object.assign( GoogleStreetviewLoader.prototype, {

    constructor: GoogleStreetviewLoader,

    /**
     * Set progress
     * @param {number} loaded 
     * @param {number} total 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    setProgress: function ( loaded, total ) {

        if ( this.onProgress ) {

            this.onProgress( { loaded: loaded, total: total } );

        }
		
    },

    /**
     * Adapt texture to zoom
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
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

    /**
     * Compose from tile
     * @param {number} x 
     * @param {number} y 
     * @param {*} texture 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
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

    /**
     * Progress
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
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

    /**
     * Compose panorama
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
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

    /**
     * Load
     * @param {string} panoid 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    load: function ( panoid ) {

        this.loadPano( panoid );

    },

    /**
     * Load panorama
     * @param {string} id
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    loadPano: function( id ) {

        const self = this;
        this._panoClient.getPanoramaById( id, function (result, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                self.result = result;
                self.copyright = result.copyright;
                self._panoId = result.location.pano;
                self.composePanorama();
            }
        });
		
    },

    /**
     * Set zoom level
     * @param {number} z 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    setZoom: function( z ) {

        this._zoom = z;
        this.adaptTextureToZoom();
    }
	
} );

/**
 * @classdesc Google streetview panorama
 * @description [How to get Panorama ID]{@link http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id}
 * @constructor
 * @param {string} panoId - Panorama id from Google Streetview 
 * @param {string} [apiKey] - Google Street View API Key
 */
function GoogleStreetviewPanorama ( panoId, apiKey ) {

    ImagePanorama.call( this );

    this.panoId = panoId;

    this.gsvLoader = null;

    this.loadRequested = false;

    this.setupGoogleMapAPI( apiKey );

}

GoogleStreetviewPanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

    constructor: GoogleStreetviewPanorama,

    /**
     * Load Google Street View by panorama id
     * @param {string} panoId - Gogogle Street View panorama id
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    load: function ( panoId ) {

        this.loadRequested = true;

        panoId = ( panoId || this.panoId ) || {};

        if ( panoId && this.gsvLoader ) {

            this.loadGSVLoader( panoId );

        }

    },

    /**
     * Setup Google Map API
     * @param {string}  apiKey
     * @memberOf GoogleStreetviewPanorama
     * @instance
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
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    setGSVLoader: function () {

        this.gsvLoader = new GoogleStreetviewLoader();

        if ( this.loadRequested ) {

            this.load();

        }

    },

    /**
     * Get GSV Loader
     * @memberOf GoogleStreetviewPanorama
     * @instance
     * @return {GoogleStreetviewLoader} GSV Loader instance
     */
    getGSVLoader: function () {

        return this.gsvLoader;

    },

    /**
     * Load GSV Loader
     * @param  {string} panoId - Gogogle Street View panorama id
     * @memberOf GoogleStreetviewPanorama
     * @instance
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
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    onLoad: function ( canvas ) {

        ImagePanorama.prototype.onLoad.call( this, new Texture( canvas ) );

    },

    /**
     * Reset
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
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

/**
 * @description Stereograhpic Shader
 * @module StereographicShader
 * @property {object} uniforms
 * @property {THREE.Texture} uniforms.tDiffuse diffuse map
 * @property {number} uniforms.resolution image resolution
 * @property {THREE.Matrix4} uniforms.transform transformation matrix
 * @property {number} uniforms.zoom image zoom factor
 * @property {number} uniforms.opacity image opacity
 * @property {string} vertexShader vertex shader
 * @property {string} fragmentShader fragment shader
 */
const StereographicShader = {

    uniforms: {

        'tDiffuse': { value: new Texture() },
        'resolution': { value: 1.0 },
        'transform': { value: new Matrix4() },
        'zoom': { value: 1.0 },
        'opacity': { value: 1.0 }

    },

    vertexShader: [

        'varying vec2 vUv;',

        'void main() {',

        'vUv = uv;',
        'gl_Position = vec4( position, 1.0 );',

        '}' 

    ].join( '\n' ),

    fragmentShader: [

        'uniform sampler2D tDiffuse;',
        'uniform float resolution;',
        'uniform mat4 transform;',
        'uniform float zoom;',
        'uniform float opacity;',

        'varying vec2 vUv;',

        'const float PI = 3.141592653589793;',

        'void main(){',

        'vec2 position = -1.0 +  2.0 * vUv;',

        'position *= vec2( zoom * resolution, zoom * 0.5 );',

        'float x2y2 = position.x * position.x + position.y * position.y;',
        'vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );',

        'sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );',

        'vec2 sampleUV = vec2(',
        '(atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,',
        '(asin(sphere_pnt.z) / PI + 0.5)',
        ');',

        'gl_FragColor = texture2D( tDiffuse, sampleUV );',

        'gl_FragColor.a *= opacity;',

        '}'

    ].join( '\n' )

};

/**
 * @classdesc Little Planet
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
    this.frameId = null;

    this.dragging = false;
    this.userMouse = new Vector2();

    this.quatA = new Quaternion();
    this.quatB = new Quaternion();
    this.quatCur = new Quaternion();
    this.quatSlerp = new Quaternion();

    this.vectorX = new Vector3( 1, 0, 0 );
    this.vectorY = new Vector3( 0, 1, 0 );

    this.addEventListener( 'window-resize', this.onWindowResize );

}

LittlePlanet.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

    constructor: LittlePlanet,

    add: function ( object ) {

        if ( arguments.length > 1 ) {
			
            for ( let i = 0; i < arguments.length; i ++ ) {

                this.add( arguments[ i ] );

            }

            return this;

        }

        if ( object instanceof Infospot ) {

            object.material.depthTest = false;
			
        }

        ImagePanorama.prototype.add.call( this, object );

    },

    createGeometry: function ( size, ratio ) {

        return new PlaneBufferGeometry( size, size * ratio );

    },

    createMaterial: function ( size ) {

        const shader = Object.assign( {}, StereographicShader ), uniforms = shader.uniforms;

        uniforms.zoom.value = size;
        uniforms.opacity.value = 0.0;

        return new ShaderMaterial( {

            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            side: BackSide,
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

        }

        this.onUpdateCallback();

    },

    onMouseMove: function ( event ) {

        const inputCount = ( event.touches && event.touches.length ) || 1 ;

        switch ( inputCount ) {

        case 1:

            const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
            const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

            const angleX = Math$1.degToRad( x - this.userMouse.x ) * 0.4;
            const angleY = Math$1.degToRad( y - this.userMouse.y ) * 0.4;

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

        }

    },

    onMouseUp: function () {

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

        this.frameId = window.requestAnimationFrame( this.onUpdateCallback.bind( this ) );

        this.quatSlerp.slerp( this.quatCur, 0.1 );

        if ( this.material ) {

            this.material.uniforms.transform.value.makeRotationFromQuaternion( this.quatSlerp );

        }
        
        if ( !this.dragging && 1.0 - this.quatSlerp.clone().dot( this.quatCur ) < this.EPS ) {
			
            window.cancelAnimationFrame( this.frameId );

        }

    },

    reset: function () {

        this.quatCur.set( 0, 0, 0, 1 );
        this.quatSlerp.set( 0, 0, 0, 1 );
        this.onUpdateCallback();

    },

    onLoad: function ( texture ) {

        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

        this.registerMouseEvents();
        this.onUpdateCallback();
		
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' } );

        ImagePanorama.prototype.onLoad.call( this, texture );
		
    },

    onLeave: function () {

        this.unregisterMouseEvents();

        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: CONTROLS.ORBIT } );

        window.cancelAnimationFrame( this.frameId );

        ImagePanorama.prototype.onLeave.call( this );
		
    },

    onWindowResize: function () {

        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

    },

    onContextMenu: function () {

        this.dragging = false;

    },

    dispose: function () {	

        this.unregisterMouseEvents();

        ImagePanorama.prototype.dispose.call( this );

    }

});

/**
 * @classdesc Image Little Planet
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

    /**
     * On loaded with texture
     * @param {THREE.Texture} texture
     * @memberOf ImageLittlePlanet
     * @instance
     */
    onLoad: function ( texture ) {

        this.updateTexture( texture );

        LittlePlanet.prototype.onLoad.call( this, texture );

    },
    
    /**
     * Update texture
     * @param {THREE.Texture} texture 
     * @memberOf ImageLittlePlanet
     * @instance
     */
    updateTexture: function ( texture ) {

        texture.minFilter = texture.magFilter = LinearFilter;
		
        this.material.uniforms[ 'tDiffuse' ].value = texture;

    },

    /**
     * Dispose
     * @memberOf ImageLittlePlanet
     * @instance
     */
    dispose: function () {

        const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

        if ( tDiffuse && tDiffuse.value ) {

            tDiffuse.value.dispose();

        }

        LittlePlanet.prototype.dispose.call( this );

    }

} );

/**
 * @classdesc Camera panorama
 * @description See {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints|MediaStreamConstraints} for constraints
 * @param {object} - camera constraints
 * @constructor
 */
function CameraPanorama ( constraints ) {

    const radius = 5000;
    const geometry = new SphereBufferGeometry( radius, 60, 40 );
    const material = new MeshBasicMaterial( { visible: false });

    Panorama.call( this, geometry, material );

    this.media = new Media( constraints );
    this.radius = radius;

    this.addEventListener( 'enter', this.start.bind( this ) );
    this.addEventListener( 'leave', this.stop.bind( this ) );
    this.addEventListener( 'panolens-container', this.onPanolensContainer.bind( this ) );
    this.addEventListener( 'panolens-scene', this.onPanolensScene.bind( this ) );

}

CameraPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: CameraPanorama,

    /**
     * On container event
     * @param {object} event
     * @memberOf CameraPanorama
     * @instance
     */
    onPanolensContainer: function ( { container } ) {

        this.media.setContainer( container );

    },

    /**
     * On scene event
     * @param {object} event 
     * @memberOf CameraPanorama
     * @instance
     */
    onPanolensScene: function ( { scene } ) {

        this.media.setScene( scene );

    },

    /**
     * Start camera streaming
     * @memberOf CameraPanorama
     * @instance
     * @returns {Promise}
     */
    start: function () {

        return this.media.start();

    },

    /**
     * Stop camera streaming
     * @memberOf CameraPanorama
     * @instance
     */
    stop: function () {

        this.media.stop();

    },

} );

/**
 * @classdesc Orbit Controls
 * @constructor
 * @external OrbitControls
 * @param {THREE.Object} object 
 * @param {HTMLElement} domElement 
 */
function OrbitControls ( object, domElement ) {

    this.object = object;
    this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.frameId = null;

    // API

    // Set to false to disable this control
    this.enabled = true;

    /*
     * "target" sets the location of focus, where the control orbits around
     * and where it pans with respect to.
     */
    this.target = new Vector3();

    // center is old, deprecated; use "target" instead
    this.center = this.target;

    /*
     * This option actually enables dollying in and out; left as "zoom" for
     * backwards compatibility
     */
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

    /*
     * How far you can orbit vertically, upper and lower limits.
     * Range is 0 to Math.PI radians.
     */
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // Momentum
  	this.momentumDampingFactor = 0.90;
  	this.momentumScalingFactor = -0.005;
  	this.momentumKeydownFactor = 20;

  	// Fov
  	this.minFov = 30;
  	this.maxFov = 120;

    /*
     * How far you can orbit horizontally, upper and lower limits.
     * If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
     */
    this.minAzimuthAngle = - Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to disable use of the keys
    this.noKeys = false;

    // The four arrow keys
    this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

    // Mouse buttons
    this.mouseButtons = { ORBIT: MOUSE.LEFT, ZOOM: MOUSE.MIDDLE, PAN: MOUSE.RIGHT };

    /*
     * //////////
     * internals
     */

    var scope = this;

    var EPS = 10e-8;
    var MEPS = 10e-5;

    var rotateStart = new Vector2();
    var rotateEnd = new Vector2();
    var rotateDelta = new Vector2();

    var panStart = new Vector2();
    var panEnd = new Vector2();
    var panDelta = new Vector2();
    var panOffset = new Vector3();

    var offset = new Vector3();

    var dollyStart = new Vector2();
    var dollyEnd = new Vector2();
    var dollyDelta = new Vector2();

    var theta = 0;
    var phi = 0;
    var phiDelta = 0;
    var thetaDelta = 0;
    var scale = 1;
    var pan = new Vector3();

    var lastPosition = new Vector3();
    var lastQuaternion = new Quaternion();

    var momentumLeft = 0, momentumUp = 0;
    var eventPrevious;
    var momentumOn = false;

    var keyUp, keyBottom, keyLeft, keyRight;

    var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

    var state = STATE.NONE;

    // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;

    // so camera.up is the orbit axis

    var quat = new Quaternion().setFromUnitVectors( object.up, new Vector3( 0, 1, 0 ) );
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

    /*
     * pass in x,y of change desired in pixel space,
     * right and down are positive
     */
    this.pan = function ( deltaX, deltaY ) {

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if ( scope.object instanceof PerspectiveCamera ) {

            // perspective
            var position = scope.object.position;
            var offset = position.clone().sub( scope.target );
            var targetDistance = offset.length();

            // half of the fov is center to top of screen
            targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

            // we actually don't use screenWidth, since perspective camera is fixed to screen height
            scope.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
            scope.panUp( 2 * deltaY * targetDistance / element.clientHeight );

        } else if ( scope.object instanceof OrthographicCamera ) {

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

        if ( scope.object instanceof PerspectiveCamera ) {

            scale /= dollyScale;

        } else if ( scope.object instanceof OrthographicCamera ) {

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

        if ( scope.object instanceof PerspectiveCamera ) {

            scale *= dollyScale;

        } else if ( scope.object instanceof OrthographicCamera ) {

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

        /*
         * update condition is:
         * min(camera displacement, camera rotation in radians)^2 > EPS
         * using small-angle approximation cos(x/2) = 1 - x^2 / 8
         */
        if ( lastPosition.distanceToSquared( this.object.position ) > EPS
		    || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {

            if ( ignoreUpdate !== true ) { this.dispatchEvent( changeEvent ); }

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

        return theta;

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

            // scope.dollyOut();
            scope.object.fov = ( scope.object.fov < scope.maxFov ) 
                ? scope.object.fov + 1
                : scope.maxFov;
            scope.object.updateProjectionMatrix();

        } else if ( delta < 0 ) {

            // scope.dollyIn();
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

    this.dispose = function() {

        this.domElement.removeEventListener( 'mousedown', onMouseDown );
        this.domElement.removeEventListener( 'mousewheel', onMouseWheel );
        this.domElement.removeEventListener( 'DOMMouseScroll', onMouseWheel );

        this.domElement.removeEventListener( 'touchstart', touchstart );
        this.domElement.removeEventListener( 'touchend', touchend );
        this.domElement.removeEventListener( 'touchmove', touchmove );

        window.removeEventListener( 'keyup', onKeyUp );
        window.removeEventListener( 'keydown', onKeyDown );

    };

    // this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
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
OrbitControls.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

    constructor: OrbitControls

} );

/**
 * @classdesc Device Orientation Control
 * @constructor
 * @external DeviceOrientationControls
 * @param {THREE.Camera} camera 
 * @param {HTMLElement} domElement 
 */
function DeviceOrientationControls ( camera, domElement ) {

    var scope = this;
    var changeEvent = { type: 'change' };

    var rotY = 0;
    var rotX = 0;
    var tempX = 0;
    var tempY = 0;

    this.camera = camera;
    this.camera.rotation.reorder( 'YXZ' );
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

        rotY += Math$1.degToRad( ( event.touches[ 0 ].pageX - tempX ) / 4 );
        rotX += Math$1.degToRad( ( tempY - event.touches[ 0 ].pageY ) / 4 );

        scope.updateAlphaOffsetAngle( rotY );

        tempX = event.touches[ 0 ].pageX;
        tempY = event.touches[ 0 ].pageY;

    };

    // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

    var setCameraQuaternion = function( quaternion, alpha, beta, gamma, orient ) {

        var zee = new Vector3( 0, 0, 1 );

        var euler = new Euler();

        var q0 = new Quaternion();

        var q1 = new Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

        var vectorFingerY;
        var fingerQY = new Quaternion();
        var fingerQX = new Quaternion();

        if ( scope.screenOrientation == 0 ) {

            vectorFingerY = new Vector3( 1, 0, 0 );
            fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

        } else if ( scope.screenOrientation == 180 ) {

            vectorFingerY = new Vector3( 1, 0, 0 );
            fingerQY.setFromAxisAngle( vectorFingerY, rotX );

        } else if ( scope.screenOrientation == 90 ) {

            vectorFingerY = new Vector3( 0, 1, 0 );
            fingerQY.setFromAxisAngle( vectorFingerY, rotX );

        } else if ( scope.screenOrientation == - 90) {

            vectorFingerY = new Vector3( 0, 1, 0 );
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

        scope.domElement.addEventListener( 'touchstart', onTouchStartEvent, { passive: false } );
        scope.domElement.addEventListener( 'touchmove', onTouchMoveEvent, { passive: false } );

        scope.enabled = true;

    };

    this.disconnect = function() {

        window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
        window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
        window.removeEventListener( 'deviceorientation', this.update.bind( this ), false );

        scope.domElement.removeEventListener( 'touchstart', onTouchStartEvent, false );
        scope.domElement.removeEventListener( 'touchmove', onTouchMoveEvent, false );

        scope.enabled = false;

    };

    this.update = function( ignoreUpdate ) {

        if ( scope.enabled === false ) return;

        var alpha = scope.deviceOrientation.alpha ? Math$1.degToRad( scope.deviceOrientation.alpha ) + scope.alphaOffsetAngle : 0; // Z
        var beta = scope.deviceOrientation.beta ? Math$1.degToRad( scope.deviceOrientation.beta ) : 0; // X'
        var gamma = scope.deviceOrientation.gamma ? Math$1.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
        var orient = scope.screenOrientation ? Math$1.degToRad( scope.screenOrientation ) : 0; // O

        setCameraQuaternion( scope.camera.quaternion, alpha, beta, gamma, orient );
        scope.alpha = alpha;

        if ( ignoreUpdate !== true ) { scope.dispatchEvent( changeEvent ); }

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
DeviceOrientationControls.prototype = Object.assign( Object.create( EventDispatcher.prototype), {

    constructor: DeviceOrientationControls

} );

/**
 * @classdesc Google Cardboard Effect Composer
 * @constructor
 * @external CardboardEffect
 * @param {THREE.WebGLRenderer} renderer 
 */
function CardboardEffect ( renderer ) {

    var _camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

    var _scene = new Scene();

    var _stereo = new StereoCamera();
    _stereo.aspect = 0.5;

    var _params = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat };

    var _renderTarget = new WebGLRenderTarget( 512, 512, _params );
    _renderTarget.scissorTest = true;
    _renderTarget.texture.generateMipmaps = false;

    /*
     * Distortion Mesh ported from:
     * https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js
     */

    var distortion = new Vector2( 0.441, 0.156 );

    var geometry = new PlaneBufferGeometry( 1, 1, 10, 20 ).removeAttribute( 'normal' ).toNonIndexed();

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

    var vector = new Vector2();
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

    var material = new MeshBasicMaterial( { map: _renderTarget.texture } );
    var mesh = new Mesh( geometry, material );
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

/**
 * @classdesc Stereo Effect Composer
 * @constructor
 * @external StereoEffect
 * @param {THREE.WebGLRenderer} renderer 
 */
const StereoEffect = function ( renderer ) {

    var _stereo = new StereoCamera();
    _stereo.aspect = 0.5;
    var size = new Vector2();

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
 * @classdesc Viewer contains pre-defined scene, camera and renderer
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

    /*
     * CSS Icon
     * const styleLoader = new StyleLoader();
     * styleLoader.inject( 'icono' );
     */

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

    this.camera = options.camera || new PerspectiveCamera( this.options.cameraFov, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
    this.scene = options.scene || new Scene();
    this.renderer = options.renderer || new WebGLRenderer( { alpha: true, antialias: false } );
    this.sceneReticle = new Scene();

    this.viewIndicatorSize = this.options.indicatorSize;

    this.reticle = {};
    this.tempEnableReticle = this.options.enableReticle;

    this.mode = MODES.NORMAL;

    this.panorama = null;
    this.widget = null;

    this.hoverObject = null;
    this.infospot = null;
    this.pressEntityObject = null;
    this.pressObject = null;

    this.raycaster = new Raycaster();
    this.raycasterPoint = new Vector2();
    this.userMouse = new Vector2();
    this.updateCallbacks = [];
    this.requestAnimationId = null;

    this.cameraFrustum = new Frustum();
    this.cameraViewProjectionMatrix = new Matrix4();

    this.autoRotateRequestId = null;

    this.outputDivElement = null;

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
    this.tweenLeftAnimation = new Tween.Tween();
    this.tweenUpAnimation = new Tween.Tween();

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
Viewer.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

    constructor: Viewer,

    /**
     * Add an object to the scene
     * Automatically hookup with panolens-viewer-handler listener
     * to communicate with viewer method
     * @param {THREE.Object3D} object - The object to be added
     * @memberOf Viewer
     * @instance
     */
    add: function ( object ) {

        if ( arguments.length > 1 ) {

            for ( let i = 0; i < arguments.length; i ++ ) {

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
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
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
     * @param {Panorama} pano - Panorama to be set
     * @memberOf Viewer
     * @instance
     */
    setPanorama: function ( pano ) {

        const leavingPanorama = this.panorama;

        if ( pano.type === 'panorama' && leavingPanorama !== pano ) {

            // Clear exisiting infospot
            this.hideInfospot();

            const afterEnterComplete = function () {

                if ( leavingPanorama ) { leavingPanorama.onLeave(); }
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
     * @memberOf Viewer
     * @instance
     */
    eventHandler: function ( event ) {

        if ( event.method && this[ event.method ] ) {

            this[ event.method ]( event.data );

        }

    },

    /**
     * Dispatch event to all descendants
     * @param  {object} event - Event to be passed along
     * @memberOf Viewer
     * @instance
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
     * @method activateWidgetItem
     * @param  {integer} controlIndex - Control index
     * @param  {integer} mode - Modes for effects
     * @memberOf Viewer
     * @instance
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
     * @param  {MODES} mode - Modes for effects
     * @memberOf Viewer
     * @instance
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
         * @event Infospot#panolens-dual-eye-effect
         * @property {MODES} mode - Current display mode
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
         * @event Viewer#mode-change
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEvent( { type: 'mode-change', mode: this.mode } );

    },

    /**
     * Disable additional rendering effect
     * @memberOf Viewer
     * @instance
     */
    disableEffect: function () {

        if ( this.mode === MODES.NORMAL ) { return; }

        this.mode = MODES.NORMAL;
        this.disableReticleControl();

        this.activateWidgetItem( undefined, this.mode );

        /**
         * Dual eye effect event
         * @type {object}
         * @event Infospot#panolens-dual-eye-effect
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

        this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
        this.render();

        /**
         * Dispatch mode change event
         * @type {object}
         * @event Viewer#mode-change
         * @property {MODES} mode - Current display mode
         */
        this.dispatchEvent( { type: 'mode-change', mode: this.mode } );
    },

    /**
     * Enable reticle control
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
     */
    enableAutoRate: function () {

        this.options.autoRotate = true;
        this.OrbitControls.autoRotate = true;

    },

    /**
     * Disable auto rotation
     * @memberOf Viewer
     * @instance
     */
    disableAutoRate: function () {

        clearTimeout( this.autoRotateRequestId );
        this.options.autoRotate = false;
        this.OrbitControls.autoRotate = false;

    },

    /**
     * Toggle video play or stop
     * @param {boolean} pause
     * @memberOf Viewer
     * @instance
     * @fires Viewer#video-toggle
     */
    toggleVideoPlay: function ( pause ) {

        if ( this.panorama instanceof VideoPanorama ) {

            /**
             * Toggle video event
             * @type {object}
             * @event Viewer#video-toggle
             */
            this.panorama.dispatchEvent( { type: 'video-toggle', pause: pause } );

        }

    },

    /**
     * Set currentTime in a video
     * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
     * @memberOf Viewer
     * @instance
     * @fires Viewer#video-time
     */
    setVideoCurrentTime: function ( percentage ) {

        if ( this.panorama instanceof VideoPanorama ) {

            /**
             * Setting video time event
             * @type {object}
             * @event Viewer#video-time
             * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
             */
            this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

        }

    },

    /**
     * This will be called when video updates if an widget is present
     * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
     * @memberOf Viewer
     * @instance
     * @fires Viewer#video-update
     */
    onVideoUpdate: function ( percentage ) {

        const { widget } = this;

        /**
         * Video update event
         * @type {object}
         * @event Viewer#video-update
         * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
         */
        if( widget ) { widget.dispatchEvent( { type: 'video-update', percentage: percentage } ); }

    },

    /**
     * Add update callback to be called every animation frame
     * @param {function} callback
     * @memberOf Viewer
     * @instance
     */
    addUpdateCallback: function ( fn ) {

        if ( fn ) {

            this.updateCallbacks.push( fn );

        }

    },

    /**
     * Remove update callback
     * @param  {function} fn - The function to be removed
     * @memberOf Viewer
     * @instance
     */
    removeUpdateCallback: function ( fn ) {

        const index = this.updateCallbacks.indexOf( fn );

        if ( fn && index >= 0 ) {

            this.updateCallbacks.splice( index, 1 );

        }

    },

    /**
     * Show video widget
     * @memberOf Viewer
     * @instance
     */
    showVideoWidget: function () {

        const { widget } = this;

        /**
         * Show video widget event
         * @type {object}
         * @event Viewer#video-control-show
         */
        if( widget ) { widget.dispatchEvent( { type: 'video-control-show' } ); }

    },

    /**
     * Hide video widget
     * @memberOf Viewer
     * @instance
     */
    hideVideoWidget: function () {

        const { widget } = this;

        /**
         * Hide video widget
         * @type {object}
         * @event Viewer#video-control-hide
         */
        if( widget ) { widget.dispatchEvent( { type: 'video-control-hide' } ); }

    },

    /**
     * Update video play button
     * @param {boolean} paused 
     * @memberOf Viewer
     * @instance
     */
    updateVideoPlayButton: function ( paused ) {

        const { widget } = this;

        if ( widget && widget.videoElement && widget.videoElement.controlButton ) {

            widget.videoElement.controlButton.update( paused );

        }

    },

    /**
     * Add default panorama event listeners
     * @param {Panorama} pano - The panorama to be added with event listener
     * @memberOf Viewer
     * @instance
     */
    addPanoramaEventListener: function ( pano ) {

        // Set camera control on every panorama
        pano.addEventListener( 'enter-fade-start', this.setCameraControl.bind( this ) );

        // Show and hide widget event only when it's VideoPanorama
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
     * @memberOf Viewer
     * @instance
     */
    setCameraControl: function () {

        this.OrbitControls.target.copy( this.panorama.position );

    },

    /**
     * Get current camera control
     * @return {object} - Current navigation control
     * @memberOf Viewer
     * @instance
     * @returns {THREE.OrbitControls|THREE.DeviceOrientationControls}
     */
    getControl: function () {

        return this.control;

    },

    /**
     * Get scene
     * @memberOf Viewer
     * @instance
     * @return {THREE.Scene} - Current scene which the viewer is built on
     */
    getScene: function () {

        return this.scene;

    },

    /**
     * Get camera
     * @memberOf Viewer
     * @instance
     * @return {THREE.Camera} - The scene camera
     */
    getCamera: function () {

        return this.camera;

    },

    /**
     * Get renderer
     * @memberOf Viewer
     * @instance
     * @return {THREE.WebGLRenderer} - The renderer using webgl
     */
    getRenderer: function () {

        return this.renderer;

    },

    /**
     * Get container
     * @memberOf Viewer
     * @instance
     * @return {HTMLElement} - The container holds rendererd canvas
     */
    getContainer: function () {

        return this.container;

    },

    /**
     * Get control id
     * @memberOf Viewer
     * @instance
     * @return {string} - Control id. 'orbit' or 'device-orientation'
     */
    getControlId: function () {

        return this.control.id;

    },

    /**
     * Get next navigation control id
     * @memberOf Viewer
     * @instance
     * @return {string} - Next control id
     */
    getNextControlId: function () {

        return this.controls[ this.getNextControlIndex() ].id;

    },

    /**
     * Get next navigation control index
     * @memberOf Viewer
     * @instance
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
     * @param {number} fov
     * @memberOf Viewer
     * @instance
     */
    setCameraFov: function ( fov ) {

        this.camera.fov = fov;
        this.camera.updateProjectionMatrix();

    },

    /**
     * Enable control by index
     * @param  {CONTROLS} index - Index of camera control
     * @memberOf Viewer
     * @instance
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
        }

        this.control.update();

        this.activateWidgetItem( index, undefined );

    },

    /**
     * Disable current control
     * @memberOf Viewer
     * @instance
     */
    disableControl: function () {

        this.control.enabled = false;

    },

    /**
     * Toggle next control
     * @memberOf Viewer
     * @instance
     */
    toggleNextControl: function () {

        this.enableControl( this.getNextControlIndex() );

    },

    /**
     * Screen Space Projection
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
     */
    checkSpriteInViewport: function ( sprite ) {

        this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
        this.cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
        this.cameraFrustum.setFromMatrix( this.cameraViewProjectionMatrix );

        return sprite.visible && this.cameraFrustum.intersectsSprite( sprite );

    },

    /**
     * Reverse dragging direction
     * @memberOf Viewer
     * @instance
     */
    reverseDraggingDirection: function () {

        this.OrbitControls.rotateSpeed *= -1;
        this.OrbitControls.momentumScalingFactor *= -1;

    },

    /**
     * Add reticle 
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
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
        easing = easing || Tween.Easing.Exponential.Out;

        let scope, ha, va, chv, cvv, hv, vv, vptc, ov, nv;

        scope = this;

        chv = this.camera.getWorldDirection( new Vector3() );
        cvv = chv.clone();

        vptc = this.panorama.getWorldPosition( new Vector3() ).sub( this.camera.getWorldPosition( new Vector3() ) );

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

        this.tweenLeftAnimation = new Tween.Tween( ov )
            .to( { left: ha }, duration )
            .easing( easing )
            .onUpdate(function(ov){
                scope.control.rotateLeft( ov.left - nv.left );
                nv.left = ov.left;
            })
            .start();

        this.tweenUpAnimation = new Tween.Tween( ov )
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
     * @memberOf Viewer
     * @instance
     */
    tweenControlCenterByObject: function ( object, duration, easing ) {

        let isUnderScalePlaceHolder = false;

        object.traverseAncestors( function ( ancestor ) {

            if ( ancestor.scalePlaceHolder ) {

                isUnderScalePlaceHolder = true;

            }
        } );

        if ( isUnderScalePlaceHolder ) {

            const invertXVector = new Vector3( -1, 1, 1 );

            this.tweenControlCenter( object.getWorldPosition( new Vector3() ).multiply( invertXVector ), duration, easing );

        } else {

            this.tweenControlCenter( object.getWorldPosition( new Vector3() ), duration, easing );

        }

    },

    /**
     * This is called when window size is changed
     * @fires Viewer#window-resize
     * @param {number} [windowWidth] - Specify if custom element has changed width
     * @param {number} [windowHeight] - Specify if custom element has changed height
     * @memberOf Viewer
     * @instance
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

            const isAndroid = /(android)/i.test(window.navigator.userAgent);

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
         * @event Viewer#window-resize
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

    /**
     * Add output element
     * @memberOf Viewer
     * @instance
     */
    addOutputElement: function () {

        const element = document.createElement( 'div' );
        element.style.position = 'absolute';
        element.style.right = '10px';
        element.style.top = '10px';
        element.style.color = '#fff';
        this.container.appendChild( element );
        this.outputDivElement = element;

    },

    /**
     * Output position in developer console by holding down Ctrl button
     * @memberOf Viewer
     * @instance
     */
    outputPosition: function () {

        const intersects = this.raycaster.intersectObject( this.panorama, true );

        if ( intersects.length > 0 ) {

            const point = intersects[ 0 ].point.clone();
            const converter = new Vector3( -1, 1, 1 );
            const world = this.panorama.getWorldPosition( new Vector3() );
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

            }

        }

    },

    /**
     * On mouse down
     * @param {MouseEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onMouseDown: function ( event ) {

        event.preventDefault();

        this.userMouse.x = ( event.clientX >= 0 ) ? event.clientX : event.touches[0].clientX;
        this.userMouse.y = ( event.clientY >= 0 ) ? event.clientY : event.touches[0].clientY;
        this.userMouse.type = 'mousedown';
        this.onTap( event );

    },

    /**
     * On mouse move
     * @param {MouseEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onMouseMove: function ( event ) {

        event.preventDefault();
        this.userMouse.type = 'mousemove';
        this.onTap( event );

    },

    /**
     * On mouse up
     * @param {MouseEvent} event 
     * @memberOf Viewer
     * @instance
     */
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

            onTarget = this.onTap( { clientX: event.changedTouches[0].clientX, clientY: event.changedTouches[0].clientY }, type );
		
        } else {

            onTarget = this.onTap( event, type );

        }

        this.userMouse.type = 'none';

        if ( onTarget ) { 

            return; 

        }

        if ( type === 'click' ) {

            const { options: { autoHideInfospot, autoHideControlBar }, panorama, toggleControlBar } = this;

            if ( autoHideInfospot && panorama ) {

                panorama.toggleInfospotVisibility();

            }

            if ( autoHideControlBar ) {

                toggleControlBar();

            }

        }

    },

    /**
     * On tap eveny frame
     * @param {MouseEvent} event 
     * @param {string} type 
     * @memberOf Viewer
     * @instance
     */
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

            this.outputPosition(); 

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

                    this.reticle.end();

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

    /**
     * Get converted intersect
     * @param {array} intersects 
     * @memberOf Viewer
     * @instance
     */
    getConvertedIntersect: function ( intersects ) {

        let intersect;

        for ( let i = 0; i < intersects.length; i++ ) {

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

    /**
     * Hide infospot
     * @memberOf Viewer
     * @instance
     */
    hideInfospot: function () {

        if ( this.infospot ) {

            this.infospot.onHoverEnd();

            this.infospot = undefined;

        }

    },

    /**
     * Toggle control bar
     * @memberOf Viewer
     * @instance
     * @fires Viewer#control-bar-toggle
     */
    toggleControlBar: function () {

        const { widget } = this;

        /**
         * Toggle control bar event
         * @type {object}
         * @event Viewer#control-bar-toggle
         */
        if ( widget ) {

            widget.dispatchEvent( { type: 'control-bar-toggle' } );

        }

    },

    /**
     * On key down
     * @param {KeyboardEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onKeyDown: function ( event ) {

        if ( this.options.output && this.options.output !== 'none' && event.key === 'Control' ) {

            this.OUTPUT_INFOSPOT = true;

        }

    },

    /**
     * On key up
     * @param {KeyboardEvent} event 
     * @memberOf Viewer
     * @instance
     */
    onKeyUp: function () {

        this.OUTPUT_INFOSPOT = false;

    },

    /**
     * Update control and callbacks
     * @memberOf Viewer
     * @instance
     */
    update: function () {

        Tween.update();

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
                    const { x, y } = this.getScreenVector( child.getWorldPosition( new Vector3() ) );
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
     * @memberOf Viewer
     * @instance
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

    /**
     * Animate
     * @memberOf Viewer
     * @instance
     */
    animate: function () {

        this.requestAnimationId = window.requestAnimationFrame( this.animate.bind( this ) );

        this.onChange();

    },

    /**
     * On change
     * @memberOf Viewer
     * @instance
     */
    onChange: function () {

        this.update();
        this.render();

    },

    /**
     * Register mouse and touch event on container
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
     */
    registerReticleEvent: function () {

        this.addUpdateCallback( this.HANDLER_TAP );

    },

    /**
     * Unregister reticle event
     * @memberOf Viewer
     * @instance
     */
    unregisterReticleEvent: function () {

        this.removeUpdateCallback( this.HANDLER_TAP );

    },

    /**
     * Update reticle event
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
     */
    dispose: function () {

        this.tweenLeftAnimation.stop();
        this.tweenUpAnimation.stop();

        // Unregister dom event listeners
        this.unregisterEventListeners();

        // recursive disposal on 3d objects
        function recursiveDispose ( object ) {

            for ( let i = object.children.length - 1; i >= 0; i-- ) {

                recursiveDispose( object.children[i] );
                object.remove( object.children[i] );

            }

            if ( object instanceof Panorama || object instanceof Infospot ) {

                object.dispose();
                object = null;

            } else if ( object.dispatchEvent ){

                object.dispatchEvent( 'dispose' );

            }

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
     * Destroy viewer by disposing and stopping requestAnimationFrame
     * @memberOf Viewer
     * @instance
     */
    destroy: function () {

        this.dispose();
        this.render();
        window.cancelAnimationFrame( this.requestAnimationId );		

    },

    /**
     * On panorama dispose
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
     */
    loadAsyncRequest: function ( url, callback = () => {} ) {

        const request = new window.XMLHttpRequest();
        request.onloadend = function ( event ) {
            callback( event );
        };
        request.open( 'GET', url, true );
        request.send( null );

    },

    /**
     * View indicator in upper left
     * @memberOf Viewer
     * @instance
     */
    addViewIndicator: function () {

        const scope = this;

        function loadViewIndicator ( asyncEvent ) {

            if ( asyncEvent.loaded === 0 ) return;

            const viewIndicatorDiv = asyncEvent.target.responseXML.documentElement;
            viewIndicatorDiv.style.width = scope.viewIndicatorSize + 'px';
            viewIndicatorDiv.style.height = scope.viewIndicatorSize + 'px';
            viewIndicatorDiv.style.position = 'absolute';
            viewIndicatorDiv.style.top = '10px';
            viewIndicatorDiv.style.left = '10px';
            viewIndicatorDiv.style.opacity = '0.5';
            viewIndicatorDiv.style.cursor = 'pointer';
            viewIndicatorDiv.id = 'panolens-view-indicator-container';

            scope.container.appendChild( viewIndicatorDiv );

            const indicator = viewIndicatorDiv.querySelector( '#indicator' );
            const setIndicatorD = function () {

                scope.radius = scope.viewIndicatorSize * 0.225;
                scope.currentPanoAngle = scope.camera.rotation.y - Math$1.degToRad( 90 );
                scope.fovAngle = Math$1.degToRad( scope.camera.fov ) ;
                scope.leftAngle = -scope.currentPanoAngle - scope.fovAngle / 2;
                scope.rightAngle = -scope.currentPanoAngle + scope.fovAngle / 2;
                scope.leftX = scope.radius * Math.cos( scope.leftAngle );
                scope.leftY = scope.radius * Math.sin( scope.leftAngle );
                scope.rightX = scope.radius * Math.cos( scope.rightAngle );
                scope.rightY = scope.radius * Math.sin( scope.rightAngle );
                scope.indicatorD = 'M ' + scope.leftX + ' ' + scope.leftY + ' A ' + scope.radius + ' ' + scope.radius + ' 0 0 1 ' + scope.rightX + ' ' + scope.rightY;

                if ( scope.leftX && scope.leftY && scope.rightX && scope.rightY && scope.radius ) {

                    indicator.setAttribute( 'd', scope.indicatorD );

                }

            };

            scope.addUpdateCallback( setIndicatorD );

            const indicatorOnMouseEnter = function () {

                this.style.opacity = '1';

            };

            const indicatorOnMouseLeave = function () {

                this.style.opacity = '0.5';

            };

            viewIndicatorDiv.addEventListener( 'mouseenter', indicatorOnMouseEnter );
            viewIndicatorDiv.addEventListener( 'mouseleave', indicatorOnMouseLeave );
        }

        this.loadAsyncRequest( DataImage.ViewIndicator, loadViewIndicator );

    },

    /**
     * Append custom control item to existing control bar
     * @param {object} [option={}] - Style object to overwirte default element style. It takes 'style', 'onTap' and 'group' properties.
     * @memberOf Viewer
     * @instance
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
     * @memberOf Viewer
     * @instance
     */
    clearAllCache: function () {

        Cache.clear();

    }

} );

if ( REVISION$1 != THREE_REVISION ) {

    console.warn( `three.js version is not matched. Please consider use the target revision ${THREE_REVISION}` );

}

/**
 * Panolens.js
 * @author pchen66
 * @namespace PANOLENS
 */
window.TWEEN = Tween;

export { BasicPanorama, CONTROLS, CameraPanorama, CubePanorama, CubeTextureLoader, DataImage, EmptyPanorama, GoogleStreetviewPanorama, ImageLittlePlanet, ImageLoader, ImagePanorama, Infospot, LittlePlanet, MODES, Media, Panorama, REVISION, Reticle, THREE_REVISION, THREE_VERSION, TextureLoader, VERSION, VideoPanorama, Viewer, Widget };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFub2xlbnMubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvQ29uc3RhbnRzLmpzIiwiLi4vc3JjL0RhdGFJbWFnZS5qcyIsIi4uL3NyYy9sb2FkZXJzL0ltYWdlTG9hZGVyLmpzIiwiLi4vc3JjL2xvYWRlcnMvVGV4dHVyZUxvYWRlci5qcyIsIi4uL3NyYy9sb2FkZXJzL0N1YmVUZXh0dXJlTG9hZGVyLmpzIiwiLi4vc3JjL21lZGlhL01lZGlhLmpzIiwiLi4vc3JjL2ludGVyZmFjZS9SZXRpY2xlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0B0d2VlbmpzL3R3ZWVuLmpzL3NyYy9Ud2Vlbi5qcyIsIi4uL3NyYy9pbmZvc3BvdC9JbmZvc3BvdC5qcyIsIi4uL3NyYy93aWRnZXQvV2lkZ2V0LmpzIiwiLi4vc3JjL3Bhbm9yYW1hL1Bhbm9yYW1hLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0ltYWdlUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvRW1wdHlQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9DdWJlUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvQmFzaWNQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9WaWRlb1Bhbm9yYW1hLmpzIiwiLi4vc3JjL2xvYWRlcnMvR29vZ2xlU3RyZWV0dmlld0xvYWRlci5qcyIsIi4uL3NyYy9wYW5vcmFtYS9Hb29nbGVTdHJlZXR2aWV3UGFub3JhbWEuanMiLCIuLi9zcmMvc2hhZGVycy9TdGVyZW9ncmFwaGljU2hhZGVyLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0xpdHRsZVBsYW5ldC5qcyIsIi4uL3NyYy9wYW5vcmFtYS9JbWFnZUxpdHRsZVBsYW5ldC5qcyIsIi4uL3NyYy9wYW5vcmFtYS9DYW1lcmFQYW5vcmFtYS5qcyIsIi4uL3NyYy9saWIvY29udHJvbHMvT3JiaXRDb250cm9scy5qcyIsIi4uL3NyYy9saWIvY29udHJvbHMvRGV2aWNlT3JpZW50YXRpb25Db250cm9scy5qcyIsIi4uL3NyYy9saWIvZWZmZWN0cy9DYXJkYm9hcmRFZmZlY3QuanMiLCIuLi9zcmMvbGliL2VmZmVjdHMvU3RlcmVvRWZmZWN0LmpzIiwiLi4vc3JjL3ZpZXdlci9WaWV3ZXIuanMiLCIuLi9zcmMvQ2hlY2suanMiLCIuLi9zcmMvUGFub2xlbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmVyc2lvbiwgZGVwZW5kZW5jaWVzIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcblxuLyoqXG4gKiBSRVZJU0lPTlxuICogQG1vZHVsZSBSRVZJU0lPTlxuICogQGV4YW1wbGUgUEFOT0xFTlMuUkVWSVNJT05cbiAqIEB0eXBlIHtzdHJpbmd9IHJldmlzaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBSRVZJU0lPTiA9IHZlcnNpb24uc3BsaXQoICcuJyApWyAxIF07XG5cbi8qKlxuICogVkVSU0lPTlxuICogQG1vZHVsZSBWRVJTSU9OXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5WRVJTSU9OXG4gKiBAdHlwZSB7c3RyaW5nfSB2ZXJzaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gdmVyc2lvbjtcblxuLyoqXG4gKiBUSFJFRUpTIFJFVklTSU9OXG4gKiBAbW9kdWxlIFRIUkVFX1JFVklTSU9OXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5USFJFRV9SRVZJU0lPTlxuICogQHR5cGUge3N0cmluZ30gdGhyZWVqcyByZXZpc2lvblxuICovXG5leHBvcnQgY29uc3QgVEhSRUVfUkVWSVNJT04gPSBkZXBlbmRlbmNpZXMudGhyZWUuc3BsaXQoICcuJyApWyAxIF07XG5cbi8qKlxuICogVEhSRUVKUyBWRVJTSU9OXG4gKiBAbW9kdWxlIFRIUkVFX1ZFUlNJT05cbiAqIEBleGFtcGxlIFBBTk9MRU5TLlRIUkVFX1ZFUlNJT05cbiAqIEB0eXBlIHtzdHJpbmd9IHRocmVlanMgdmVyc2lvblxuICovXG5leHBvcnQgY29uc3QgVEhSRUVfVkVSU0lPTiA9IGRlcGVuZGVuY2llcy50aHJlZS5yZXBsYWNlKCAvW14wLTkuXS9nLCAnJyApO1xuXG4vKipcbiAqIENPTlRST0xTXG4gKiBAbW9kdWxlIENPTlRST0xTXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5DT05UUk9MUy5PUkJJVFxuICogQHByb3BlcnR5IHtudW1iZXJ9IE9SQklUIDBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBERVZJQ0VPUklFTlRBVElPTiAxXG4gKi9cbmV4cG9ydCBjb25zdCBDT05UUk9MUyA9IHsgT1JCSVQ6IDAsIERFVklDRU9SSUVOVEFUSU9OOiAxIH07XG5cbi8qKlxuICogTU9ERVNcbiAqIEBtb2R1bGUgTU9ERVNcbiAqIEBleGFtcGxlIFBBTk9MRU5TLk1PREVTLlVOS05PV05cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBVTktOT1dOIDBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBOT1JNQUwgMVxuICogQHByb3BlcnR5IHtudW1iZXJ9IENBUkRCT0FSRCAyXG4gKiBAcHJvcGVydHkge251bWJlcn0gU1RFUkVPIDNcbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVTID0geyBVTktOT1dOOiAwLCBOT1JNQUw6IDEsIENBUkRCT0FSRDogMiwgU1RFUkVPOiAzIH07IiwiLyoqXG4gKiBEYXRhIFVSSSBJbWFnZXNcbiAqIEBtb2R1bGUgRGF0YUltYWdlXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5EYXRhSW1hZ2UuSW5mb1xuICogQHByb3BlcnR5IHtzdHJpbmd9IEluZm8gSW5mb3JtYXRpb24gSWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFycm93IEFycm93IEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBGdWxsc2NyZWVuRW50ZXIgRnVsbHNjcmVlbiBFbnRlciBJY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gRnVsbHNjcmVlbkxlYXZlIEZ1bGxzY3JlZW4gTGVhdmUgSWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IFZpZGVvUGxheSBWaWRlbyBQbGF5IEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBWaWRlb1BhdXNlIFZpZGVvIFBhdXNlIEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBXaGl0ZVRpbGUgV2hpdGUgVGlsZSBJY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU2V0dGluZyBTZXR0aW5ncyBJY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ2hldnJvblJpZ2h0IENoZXZyb24gUmlnaHQgSWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IENoZWNrIENoZWNrIEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBWaWV3SW5kaWNhdG9yIFZpZXcgSW5kaWNhdG9yIEljb25cbiAqL1xuY29uc3QgRGF0YUltYWdlID0ge1xuICAgIEluZm86ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQUJJQUFBQVNBQkd5V3MrQUFBQUNYWndRV2NBQUFCQUFBQUFRQURxOC9oZ0FBQURCa2xFUVZSNDJ1MmJQMDhVUVJpSG56RmFTWUNJL3hva3NkQklxR3dJaVlXUlVCSVNFeHBDUTBlajM4RldPbWxJS0tob01QRWJhQ3hzcnJIaVlyUWdPU2xRRWFJQ3JUK0xIU1Baek56dDNzM2MzSG43bEh2THp2djgyTDJkbTMwWEtpb3FLZ1lZMDYyQkpGMEhwb0E3d0FSd0JiaHNQejREam9FRzhBbllOY1o4U3gxT3A4SVhKTTFLV3BkVVYzbnE5bTluSlYxSTdWTkdmRXpTTTBtTk5xUjlOT3d4eDFMN05STWZsYlFtNlNTZ2VKNFRPOFpvYXQrOC9MS2tnNGppZVE0a0xhZjJSdEt3cEowdWl1ZlprVFNjU241UzBsNUMrYi9zU1pyc3R2eU1wS1BVNXVjNGtqVFRqa3ZwZVlDa2FlQTEvKzdodmNJWk1HdU1xVVVMUU5JVThBYTRsdHJXd3lId3lCaXpHendBU1NQQWUrQjJhc3NXN0FIM2pURS9pK3hjWm9hMTJRZnkyQm8zaSs1Y0tBQmw5OXpGMUdZbFdGVEJlVUxMUzBEWnJPc0RjRE5nZ1RYZ2MyN2JMV0E2NEJoZmdIdkdtQjhkSFVYWjFETTBTNDV4bGlLTXM5YktyK2tsSU9rcXNCcnd2OUp0VnExRGV3RUFUNENoMUJZZE1HUWR5Z2VnN0RmNFNtcURBS3lveVhwQ3N6UGdJVENldXZvQWpGdVgwZ0U4amxqVWR2N2JDdGlPT0o3WHBkVVo4TC9nZFhIT0E1UXRZSDVOWFhWZ2JyZ1dXbjFud0ZUcWFpUGdkUElGY0RkMXRSRndPbDMwN0R3UnVaZ1h3THZjdGdmQTA0aGpPcDE4QWNSZVo2c1pZMTZlM3lEcFV1UXhuVTYrUzJBa2NqRXBjRHIxenhPWFNQZ0NLTFNhMG1jNG5Yd0IvRXBkYlFTY1RyNEFHcW1yallEVHlSZkF4OVRWUnNEcDVBdWc4TEp5SCtGMGNnWmc1OHoxMUJVSHBPNXJ1R2gyRzN5YnV1cUFlRjJhQmZBcWRkVUI4YnEwT2dQMlUxY2VnSDNhT1FPTU1iK0JyZFRWQjJETHVwUUx3TElPbktZMjZJQlQ2K0NsYVFER21PL0FSbXFMRHRpd0RuN0hWa2NZK0Vkak5vVGxDSSt0WWhPMmlVcHBtNkhLc2xQVXEycVFLSHBVZThBRnNqYVVYdVVRV0NncVh5b0FHOEl1TUUvV2tOUnJuQUh6WmZxRFNnZGdRNmdCYzJUZDNiM0NNVEJYdGtPc0l6VElqWkxuUWhqY1Z0bGNFSVBaTEowTG9WdnQ4cy9WYSszeXVTQUc4NFVKUnhCOThjcE05ZEpVUlVWRnhTRHpCeEtkZTRMazMvaDJBQUFBQUVsRlRrU3VRbUNDJywgXG4gICAgQXJyb3c6ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQUJJQUFBQVNBQkd5V3MrQUFBQUNYWndRV2NBQUFCQUFBQUFRQURxOC9oZ0FBQURQa2xFUVZSNDJ1MmJNVXNjUVJpRzMwL1NSYUpFSTFaS1VpUkVyTklFTFJVYlFZU0FuWDhocFZVZ2tEWXAwd2dXVmpZVytRY0phUXpZcExvakpJWGh0RERFS0JwajY1dGk1OGl4bWRtYjJadlo3K1QyQVVIdWRtZm1lWGYyYm5iM082Q21wcVptZ0pHcU9pSTVBV0FXd0VNQTB3RHVBcmh0M3I0Q2NBYWdCZUFiZ0lhSS9OUU9wMWZoSVpLTEpOK1NiREtjcHRsM2tlU1F0aytJK0JqSlZ5UmJKYVJkdEV5Ylk5cCtSZUtqSk4rUXZJd29udWZTOURHcTdadVhYeWQ1bkZBOHp6SEpkVzF2a0x4RGNyZEM4VHk3Sk85b3ljK1FQRkNVYjNOQWNxWnErVG1TcDlybUhaeVNuQ3ZqRXJ3T0lQa1V3SHY4K3c3dkY2NEFMSXJJZnJJQVNNNEMrQURnbnJhdGd4TUFDeUxTaUI0QXlSRUFud0U4MExic3dnR0FKeUp5NGJOeHlBcHI2d2JJdzR4eHkzZGpyd0NZZmVldWFac0ZzRWJQZFVMWFU0RFpxdXNMZ01rRUEyMVAwNUVFYmY4QThGaEV6b3MyOHBrQkx4TEtMNXMvci9NMWtFa3o5dktRSEdlYXRmMDV5Zm1PZnViTmE3RzVKRGxlNU5odEJqd0hNQno1eUZ3QVdCYVJUKzBYelA4cFpzS3djUWlIMmZYOFljb2piK2t6eFV3NFpKbjdDU1FYcXBSUEhNS0NxNytpWko3MU12ZHkvRGZ0WFNRNkhjSmRTRGFxUFBLVy9tUE9CTytsY2J2ekNVMzVSQ0ZNMlBwd25RS3paUWZkZ2ZlMGR4SDVkTEE2dVFKNHBDMmZJQVNya3l1QTZYNlFqeHlDMWNrVlFObjdiTkhsSTRaZ2RYSUZVT2JpSkpsOHBCQ3NUakdmdUl3QTJDdjRGTjd4Yllqa2pxc1JBSHVJZVBYb0NpREYxWmsyVmlkWEFMKzFSNXNBcTVNcmdKYjJhQk5nZFhJRjhGVjd0QW13T3JrQ0NGczczd3lzVHRZQVRIRkNVM3ZFRVdtNkNpNkt2Z1kvYW84NklrNlhvZ0RlYVk4NklrNlhialBnU0h2a0VUaEN3UXk0NVhwRFJLNUpiZ040R1drZ1V5UjlINjVNUlF4Z1cwU3VuWjVGZXpLN3Bmd2Q4ZThNVjhVZkFQZEY1SmRyZzhKckFiUGpwclpGRDJ3V3lRUDZqOFpTRXVmUm1HbGdROXVtQkJ2ZDVJT2diakZVS0x1K1huV0JoRytycHNGVlpHVW8vY29KZ0ZWZithQUFUQWdOQUN2SUNwTDZqU3NBS3lIMVFjRUJtQkQyQVN3aHErN3VGODRBTElWV2lQVUVCN2xRc2lPRXdTMlZ6UVV4bU1YU3VSQ3FLcGQvelg0cmw4OEZNWmcvbUxBRWNTTitNbFAvYUtxbXBxWm1rUGtMMGhTandPcE5LeHdBQUFBQVNVVk9SSzVDWUlJPScsXG4gICAgRnVsbHNjcmVlbkVudGVyOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqUmtaR1JrWkdJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtJQ0FnSUR4d1lYUm9JR1E5SWswd0lEQm9NalIyTWpSSU1Ib2lJR1pwYkd3OUltNXZibVVpTHo0S0lDQWdJRHh3WVhSb0lHUTlJazAzSURFMFNEVjJOV2cxZGkweVNEZDJMVE42YlMweUxUUm9NbFkzYUROV05VZzFkalY2YlRFeUlEZG9MVE4yTW1nMWRpMDFhQzB5ZGpONlRURTBJRFYyTW1nemRqTm9NbFkxYUMwMWVpSXZQZ284TDNOMlp6ND0nLFxuICAgIEZ1bGxzY3JlZW5MZWF2ZTogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ2MzUjViR1U5SW1acGJHdzZJMlptWmlJZ1pEMGlUVEUwTERFMFNERTVWakUyU0RFMlZqRTVTREUwVmpFMFRUVXNNVFJJTVRCV01UbElPRll4TmtnMVZqRTBUVGdzTlVneE1GWXhNRWcxVmpoSU9GWTFUVEU1TERoV01UQklNVFJXTlVneE5sWTRTREU1V2lJZ0x6NDhMM04yWno0PScsXG4gICAgVmlkZW9QbGF5OiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnYzNSNWJHVTlJbVpwYkd3NkkyWm1aaUlnWkQwaVRUZ3NOUzR4TkZZeE9TNHhORXd4T1N3eE1pNHhORXc0TERVdU1UUmFJaUF2UGp3dmMzWm5QZz09JyxcbiAgICBWaWRlb1BhdXNlOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnYzNSNWJHVTlJbVpwYkd3NkkyWm1aaUlnWkQwaVRURTBMREU1TGpFMFNERTRWalV1TVRSSU1UUk5OaXd4T1M0eE5FZ3hNRlkxTGpFMFNEWldNVGt1TVRSYUlpQXZQand2YzNablBnPT0nLFxuICAgIFdoaXRlVGlsZTogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZ0FBQUFJQUJBTUFBQUFHVnNuSkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOQUFCNkpnQUFnSVFBQVBvQUFBQ0E2QUFBZFRBQUFPcGdBQUE2bUFBQUYzQ2N1bEU4QUFBQjFXbFVXSFJZVFV3NlkyOXRMbUZrYjJKbExuaHRjQUFBQUFBQVBIZzZlRzF3YldWMFlTQjRiV3h1Y3pwNFBTSmhaRzlpWlRwdWN6cHRaWFJoTHlJZ2VEcDRiWEIwYXowaVdFMVFJRU52Y21VZ05TNDBMakFpUGdvZ0lDQThjbVJtT2xKRVJpQjRiV3h1Y3pweVpHWTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1Rrdk1ESXZNakl0Y21SbUxYTjViblJoZUMxdWN5TWlQZ29nSUNBZ0lDQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJZ29nSUNBZ0lDQWdJQ0FnSUNCNGJXeHVjenAwYVdabVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM1JwWm1Zdk1TNHdMeUkrQ2lBZ0lDQWdJQ0FnSUR4MGFXWm1Pa052YlhCeVpYTnphVzl1UGpFOEwzUnBabVk2UTI5dGNISmxjM05wYjI0K0NpQWdJQ0FnSUNBZ0lEeDBhV1ptT2s5eWFXVnVkR0YwYVc5dVBqRThMM1JwWm1ZNlQzSnBaVzUwWVhScGIyNCtDaUFnSUNBZ0lDQWdJRHgwYVdabU9sQm9iM1J2YldWMGNtbGpTVzUwWlhKd2NtVjBZWFJwYjI0K01qd3ZkR2xtWmpwUWFHOTBiMjFsZEhKcFkwbHVkR1Z5Y0hKbGRHRjBhVzl1UGdvZ0lDQWdJQ0E4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRLSUNBZ1BDOXlaR1k2VWtSR1BnbzhMM2c2ZUcxd2JXVjBZVDRLQXRpQUJRQUFBQ1JRVEZSRkFBQUFBQUFBQmdZR0J3Y0hIaDRlS3lzcng4Zkh5OHZMek16TTdPenNBQUFBQmdZRytxN1NaZ0FBQUFwMFVrNVRBUDcrL3Y3Ky92NysvaUp4L2E4QUFBT3dTVVJCVkhqYTdkMGhic05BRUFWUW82U0ZJNlhFY0FMRGNnTkx2VUJ2RUJRVmhwa1dWWVdsaFNzVkZTN3Q1UUlzaFJ0Njk1bEVBU1pQKzhjN2Exa3pETDFmeisvenl1dnpwNkZidm9kZHJMNnVEZDF5R1o1ZVhsZGViMThOM2ZJeDdBKzU4cHJtaG02NURmdkRjZDA5NTJsdTZKYWJGYkQvelZwclpqMWx6Y3lzK2ZqOXo4eFRadGJUOHJ2OHlXbHU2QllBSWdBQUFBQUFBQUFBQUFCQU02UVhFQUVBQUFBQUFBQUFnSjJnbmFBSWlJQTNRMnFBR2dBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVFKc0FEa1ZGQUFBQUFBQThCajBHUlVBRVJFQUVSRUFFUkVBRVJFQUVBQUFBQUFBQUFBQjJnbmFDSWlBQ1BwbFJBOVFBTlVBRVJBQUFBRVZRRVJRQkVSQ0JWbGZBY1ozYWVab2J1c1VLTUdCaFY2S1VFbEhHS0JFUkpSNi9meEV4UmtRWmw5L2xUOFMxb1ZzdWhxeVlNbVBLakNrenZmY0Nwc3hvaHJ3WTBRMDZFQUVBQUFBQUFBQUFBQUNnR2RJTGlBQUFBQUFBQUFBQXdFN1FUbEFFUk1DYklUVkFEUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0ttd1ExRVJBQUFBQUFDUFFZOUJFUkFCRVJBQkVSQUJFUkFCRVJBQkFBQUFBQUFBQUlDZG9KMmdDSWlBVDJiVUFEVkFEUkFCRVFBQVFCRlVCRVZBQkVSZ0V5dkFsSm0rVjRBcE02Yk1tREpqeW93cE02Yk1kTjBMbURLakdmSmlSRGZvUUFRQUFBQUFBQUFBQUFDQVprZ3ZJQUlBQUFBQUFBQUFBRHRCTzBFUkVBRnZodFFBTlFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFLZkNEa1ZGQUFBQUFBQThCajBHUlVBRVJFQUVSRUFFUkVBRVJFQUVBQUFBQUFBQUFBQjJnbmFDSWlBQ1BwbFJBOVFBTlVBRVJBQUFBRVZRRVJRQkVSQ0JUYXdBVTJiNlhnR216Smd5WThxTUtUT216Smd5MDNVdllNcU1ac2lMRWQyZ0F4RUFBQUFBQUFBQUFBQUFtaUc5Z0FnQUFBQUFBQUFBQU93RTdRUkZRQVM4R1ZJRDFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBSndLT3hRVkFRQUFBQUR3R1BRWUZBRVJFQUVSRUFFUkVBRVJFQUVSQUFBQUFBQUFBQURZQ2RvSmlvQUkrR1JHRFZBRDFBQVJFQUVBQUJSQlJWQUVSRUFFTnJFQ1RKbnBld1dZTW1QS2pDa3pwc3lZTW1QS1ROZTlnQ2t6bWlFdlJuU0REa1FBQUFBQUFBQUFBQUFBYUliMEFpSUFBQUFBQUFBQUFMQVR0Qk1VQVJId1prZ05VQU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUhBcTdGQlVCQUFBQUFEQVk5QmpVQVJFUUFSRVFBUkVRQVJFUUFSRUFBQUFBQUFBQUFCZ0oyZ25LQUlpNEpNWk5VQU5VQU5FUUFRQUFGQUVGVUVSRUFFUjJNUUtNR1dtN3hWZ3lvd3BNNTBQV2VuOXVnTkdYejFYYW9jQUZnQUFBQUJKUlU1RXJrSmdnZz09JyxcbiAgICBTZXR0aW5nOiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBQUJtSkxSMFFBQUFBQUFBRDVRN3QvQUFBQUNYQklXWE1BQUFCSUFBQUFTQUJHeVdzK0FBQUFDWFp3UVdjQUFBQkFBQUFBUUFEcTgvaGdBQUFEbjBsRVFWUjQydTJielVzVlVSakdueU82Q1B6QU1uVGpwcEFvM0xUd0gxQ3FUZmF4YmVPaVJTMzdBMHdYdFJPRlZpMWFSQnMzTFdvaFNJR2JRQVFYVmlCR1JoRzBVSVJLVUNwSzdxL0ZuT0IydWM2Y09YTm1SbkdlM2VXK0g4Lzd6TGxuM3ZOeHBRb1ZLbFE0d2pCRkpBRk9TUnFYMU83b3NpdnB2akhtVTFuQ2hCWmdsdlNZTFlKYlMwRWFuQ3ZJSnpXSytnbnN5SDM0LzhPdU1hWWpiMjY1andDZ3o2TjRTV3Ezdm9kYkFFbW5TL0t0QkRnb0FneVU1QnRlQU9Ba01BUGNCcm9jN1Bza0RXZmdOK3d5RHdCZGx0TU1jREkzdFlCbmRlL3BIZUFSTU5URXJnZDRBUHp3ZVA4MzRvZU4xZE1rejVEbHNGTm4veXl2NGtkaVNLNEF0NEFPNENxd0dhRHdSbXphMkIwMjEwcU03WWhyWFU1OUFOQXE2Yldrd1FUVG41S081ZklFMHVWWWxYVGVHTE9YRk14MURyamxVTHdLS040MXg2RGxuSWpFRVFDY2tQUmUwb2tDaWd1SnI1TE9HR08reGhtNWpJQ0pRMWk4TE9lSkpLUFlFUUFNS3ZydHQ1WmRqU2YyRk0wRnEvc1pKSTJBNlVOY3ZDejM2VGlEZlVjQWNFMVNQdS9VNk1tOGsvVEZmdTZYZEZiNWlYM2RHUE04bFFmd05vZDMrVG93Qm5RM3lkZHR2MXZQSWUrYjFKSUJpd0VKMUlBSjIwOGs1VzIxdHJXQStWLzVDSEFjbUF0VS9BMlAvRGNDaVRBSEhFOHRnQ1ZoZ0x2QVhnWUNrMTdKby95VEdmTHVXZTdaZDcyQUM4Q1dCNG4zT0F6N21MeXROa1phYkFFWE1oZmVRS1lmV0VwSlpDeEEzckdVT1plQS9xREYxNUZwQXo0N0V2bE5rOW5lSTJlM2plV0N6MEJibXZpcE5rU01NWDhrdVNaWU04Wjh6eXFBamJIbWFONW1PZVlqZ0lYclU5M01XcnhIck5RanJxaURrUU1MSHdHK09kcUYzTk4zamVYS3pVOEFvRjFTemRIOFhLaEpVTzdIWkRYTE1id0F3SUNrSlVVTEZ4ZTBTYnFTVlFBYnczWGk3WmUwWkxtR0F6QUtiSHMwSkdVMVF0dkFhSWpDVzRCN1pPdkp5MnFGYTVhNzMwUlB0QmlhejBDZ25raVppNkY1ZkJaRFZNdmhvN0VoY3VTM3hKSjJoVjlJdXBnVHFhTHcwaGh6YWI4dnEyM3hPRy9yK0xEc0tqTGdZVnp4VW5VMGx0d0syd0RlelV5Sm1Fd3FYZ3AvUEw0cnZ4dGhhZUNTSSt6eHVBMTBKOFprV2RKTlNiMlNMa3ZheUtId0RSdTcxK1phanJHOTQxSjhhZ0FMRFEzR1UvYS9Jdk1rWUNQem1DYnRMTkVWbWFjTnRnczVpUDlmWVZORVYxUTZIZXo3eU5aU0wrSjJTYXJUY3BxaXlWMmlVa0cwSXZQRnZiejVGYkVuK0tFazN3TWp3TWVTZkNzQlhGQmRseTlDQVBrOXlkeWZmcEVDdUI1dFpmVkpqYUtXdWVPU2ZpbmxuNllLNGxhaFFvVUtSeGQvQWNSUEdUY1FDQVVRQUFBQUFFbEZUa1N1UW1DQycsXG4gICAgQ2hldnJvblJpZ2h0OiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnWkQwaVRUZ3VOVGtzTVRZdU5UaE1NVE11TVRjc01USk1PQzQxT1N3M0xqUXhUREV3TERaTU1UWXNNVEpNTVRBc01UaE1PQzQxT1N3eE5pNDFPRm9pSUM4K1BDOXpkbWMrJyxcbiAgICBDaGVjazogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ1pEMGlUVEl4TERkTU9Td3hPVXd6TGpVc01UTXVOVXcwTGpreExERXlMakE1VERrc01UWXVNVGRNTVRrdU5Ua3NOUzQxT1V3eU1TdzNXaUlnTHo0OEwzTjJaejQ9JyxcbiAgICBWaWV3SW5kaWNhdG9yOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejRLUENGRVQwTlVXVkJGSUhOMlp5QlFWVUpNU1VNZ0lpMHZMMWN6UXk4dlJGUkVJRk5XUnlBeExqRXZMMFZPSWlBaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdlIzSmhjR2hwWTNNdlUxWkhMekV1TVM5RVZFUXZjM1puTVRFdVpIUmtJajRLUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIaHRiRzV6T25oc2FXNXJQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySWlCcFpEMGlkbWxsZHkxcGJtUnBZMkYwYjNJaUlHaGxhV2RvZEQwaU16QWlJSGRwWkhSb1BTSXpNQ0lnZG1sbGQwSnZlRDBpTFRJdU5TQXRNU0F6TUNBek1DSStDZ2s4YzNSNWJHVWdkSGx3WlQwaWRHVjRkQzlqYzNNaVBpNXpkREI3YzNSeWIydGxMWGRwWkhSb09qSTdjM1J5YjJ0bExXMXBkR1Z5YkdsdGFYUTZNVEE3Wm1sc2JEcHViMjVsTzMwdWMzUXhlM04wY205clpTMTNhV1IwYURvMk8zTjBjbTlyWlMxdGFYUmxjbXhwYldsME9qRXdPMzBLQ1R3dmMzUjViR1UrQ2drOFp6NEtDUWs4Y0dGMGFDQmpiR0Z6Y3owaWMzUXdJaUJrUFNKTklERXlMalVnTUNCQklERXlMalVnTVRJdU5TQXdJREFnTUNBdE1USXVOU0F3SUVFZ01USXVOU0F4TWk0MUlEQWdNQ0F3SURFeUxqVWdNQ0lnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTVN3d0xEQXNNU3d4TXl3eE5TNDFLU0krUEM5d1lYUm9QZ29KQ1R4d1lYUm9JR05zWVhOelBTSnpkRElpSUdROUlrMGdNVE1nTUNCTUlERXdJRElnVENBeE5pQXlJRm9pUGp3dmNHRjBhRDRLQ1FrOGNHRjBhQ0JqYkdGemN6MGljM1F5SWlCa1BTSk5JRElnTUNCQklESWdNaUF3SURBZ01DQXRNaUF3SUVFZ01pQXlJREFnTUNBd0lESWdNQ0lnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTVN3d0xEQXNNU3d4TXl3eE5TNDFLU0krUEM5d1lYUm9QZ29KQ1R4d1lYUm9JR05zWVhOelBTSnpkREVpSUdsa1BTSnBibVJwWTJGMGIzSWlJSFJ5WVc1elptOXliVDBpYldGMGNtbDRLREVzTUN3d0xERXNNVE1zTVRVdU5Ta2lQand2Y0dGMGFENEtDVHd2Wno0S1BDOXpkbWMrJ1xufTtcblxuZXhwb3J0IHsgRGF0YUltYWdlIH07IiwiaW1wb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi4vRGF0YUltYWdlLmpzJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAbW9kdWxlIEltYWdlTG9hZGVyXG4gKiBAZGVzY3JpcHRpb24gSW1hZ2UgbG9hZGVyIHdpdGggcHJvZ3Jlc3MgYmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL2xvYWRlcnMvSW1hZ2VMb2FkZXIuanN9XG4gKi9cbmNvbnN0IEltYWdlTG9hZGVyID0ge1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBpbWFnZVxuICAgICAqIEBleGFtcGxlIFBBTk9MRU5TLkltYWdlTG9hZGVyLmxvYWQoIElNQUdFX1VSTCApXG4gICAgICogQG1ldGhvZCBsb2FkXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHVybCAgICAgICAgLSBBbiBpbWFnZSB1cmxcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Mb2FkICAgICAtIE9uIGxvYWQgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Qcm9ncmVzcyAtIEluIHByb2dyZXNzIGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uRXJyb3IgICAgLSBPbiBlcnJvciBjYWxsYmFja1xuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICggdXJsLCBvbkxvYWQgPSAoKSA9PiB7fSwgb25Qcm9ncmVzcyA9ICgpID0+IHt9LCBvbkVycm9yID0gKCkgPT4ge30gKSB7XG5cbiAgICAgICAgLy8gRW5hYmxlIGNhY2hlXG4gICAgICAgIFRIUkVFLkNhY2hlLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIGxldCBjYWNoZWQsIHJlcXVlc3QsIGFycmF5QnVmZmVyVmlldywgYmxvYiwgdXJsQ3JlYXRvciwgaW1hZ2UsIHJlZmVyZW5jZTtcblx0XG4gICAgICAgIC8vIFJlZmVyZW5jZSBrZXlcbiAgICAgICAgZm9yICggbGV0IGljb25OYW1lIGluIERhdGFJbWFnZSApIHtcblx0XG4gICAgICAgICAgICBpZiAoIERhdGFJbWFnZS5oYXNPd25Qcm9wZXJ0eSggaWNvbk5hbWUgKSAmJiB1cmwgPT09IERhdGFJbWFnZVsgaWNvbk5hbWUgXSApIHtcblx0XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlID0gaWNvbk5hbWU7XG5cdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgfVxuXHRcbiAgICAgICAgLy8gQ2FjaGVkXG4gICAgICAgIGNhY2hlZCA9IFRIUkVFLkNhY2hlLmdldCggcmVmZXJlbmNlID8gcmVmZXJlbmNlIDogdXJsICk7XG5cdFxuICAgICAgICBpZiAoIGNhY2hlZCAhPT0gdW5kZWZpbmVkICkge1xuXHRcbiAgICAgICAgICAgIGlmICggb25Mb2FkICkge1xuXHRcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbiAoKSB7XG5cdFxuICAgICAgICAgICAgICAgICAgICBvblByb2dyZXNzKCB7IGxvYWRlZDogMSwgdG90YWw6IDEgfSApO1xuICAgICAgICAgICAgICAgICAgICBvbkxvYWQoIGNhY2hlZCApO1xuXHRcbiAgICAgICAgICAgICAgICB9LCAwICk7XG5cdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG5cdFxuICAgICAgICB9XG5cdFx0XG4gICAgICAgIC8vIENvbnN0cnVjdCBhIG5ldyBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB1cmxDcmVhdG9yID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnaW1nJyApO1xuXHRcbiAgICAgICAgLy8gQWRkIHRvIGNhY2hlXG4gICAgICAgIFRIUkVFLkNhY2hlLmFkZCggcmVmZXJlbmNlID8gcmVmZXJlbmNlIDogdXJsLCBpbWFnZSApO1xuXHRcbiAgICAgICAgY29uc3Qgb25JbWFnZUxvYWRlZCA9ICgpID0+IHtcblx0XG4gICAgICAgICAgICB1cmxDcmVhdG9yLnJldm9rZU9iamVjdFVSTCggaW1hZ2Uuc3JjICk7XG4gICAgICAgICAgICBvbkxvYWQoIGltYWdlICk7XG5cdFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICggdXJsLmluZGV4T2YoICdkYXRhOicgKSA9PT0gMCApIHtcblxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCBvbkltYWdlTG9hZGVkLCBmYWxzZSApO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgICAgICB9XG5cdFxuICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IHRoaXMuY3Jvc3NPcmlnaW4gIT09IHVuZGVmaW5lZCA/IHRoaXMuY3Jvc3NPcmlnaW4gOiAnJztcblx0XG4gICAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbiggJ0dFVCcsIHVybCwgdHJ1ZSApO1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgb25FcnJvciApO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoICdwcm9ncmVzcycsIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgaWYgICggIWV2ZW50ICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCB7IGxvYWRlZCwgdG90YWwsIGxlbmd0aENvbXB1dGFibGUgfSA9IGV2ZW50O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIGxlbmd0aENvbXB1dGFibGUgKSB7XG5cdFxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MoIHsgbG9hZGVkLCB0b3RhbCB9ICk7XG5cdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgfSApO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCAnbG9hZGVuZCcsIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgaWYgICggIWV2ZW50ICkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0OiB7IHJlc3BvbnNlIH0gfSA9IGV2ZW50O1xuXG4gICAgICAgICAgICBhcnJheUJ1ZmZlclZpZXcgPSBuZXcgVWludDhBcnJheSggcmVzcG9uc2UgKTtcbiAgICAgICAgICAgIGJsb2IgPSBuZXcgd2luZG93LkJsb2IoIFsgYXJyYXlCdWZmZXJWaWV3IF0gKTtcblx0XHRcdFx0XG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIG9uSW1hZ2VMb2FkZWQsIGZhbHNlICk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB1cmxDcmVhdG9yLmNyZWF0ZU9iamVjdFVSTCggYmxvYiApO1xuXHRcbiAgICAgICAgfSApO1xuXHRcbiAgICAgICAgcmVxdWVzdC5zZW5kKG51bGwpO1xuXHRcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IEltYWdlTG9hZGVyIH07IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL0ltYWdlTG9hZGVyLmpzJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAbW9kdWxlIFRleHR1cmVMb2FkZXJcbiAqIEBkZXNjcmlwdGlvbiBUZXh0dXJlIGxvYWRlciBiYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbG9hZGVycy9UZXh0dXJlTG9hZGVyLmpzfVxuICovXG5jb25zdCBUZXh0dXJlTG9hZGVyID0ge1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBpbWFnZSB0ZXh0dXJlXG4gICAgICogQGV4YW1wbGUgUEFOT0xFTlMuVGV4dHVyZUxvYWRlci5sb2FkKCBJTUFHRV9VUkwgKVxuICAgICAqIEBtZXRob2QgbG9hZFxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB1cmwgICAgICAgIC0gQW4gaW1hZ2UgdXJsXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uTG9hZCAgICAgLSBPbiBsb2FkIGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uUHJvZ3Jlc3MgLSBJbiBwcm9ncmVzcyBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbkVycm9yICAgIC0gT24gZXJyb3IgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtUSFJFRS5UZXh0dXJlfSAgIFx0IC0gSW1hZ2UgdGV4dHVyZVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICggdXJsLCBvbkxvYWQgPSAoKSA9PiB7fSwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKCk7IFxuXG4gICAgICAgIEltYWdlTG9hZGVyLmxvYWQoIHVybCwgZnVuY3Rpb24gKCBpbWFnZSApIHtcblxuICAgICAgICAgICAgdGV4dHVyZS5pbWFnZSA9IGltYWdlO1xuXG4gICAgICAgICAgICAvLyBKUEVHcyBjYW4ndCBoYXZlIGFuIGFscGhhIGNoYW5uZWwsIHNvIG1lbW9yeSBjYW4gYmUgc2F2ZWQgYnkgc3RvcmluZyB0aGVtIGFzIFJHQi5cbiAgICAgICAgICAgIGNvbnN0IGlzSlBFRyA9IHVybC5zZWFyY2goIC9cXC4oanBnfGpwZWcpJC8gKSA+IDAgfHwgdXJsLnNlYXJjaCggL15kYXRhXFw6aW1hZ2VcXC9qcGVnLyApID09PSAwO1xuXG4gICAgICAgICAgICB0ZXh0dXJlLmZvcm1hdCA9IGlzSlBFRyA/IFRIUkVFLlJHQkZvcm1hdCA6IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgICAgICAgb25Mb2FkKCB0ZXh0dXJlICk7XG5cbiAgICAgICAgfSwgb25Qcm9ncmVzcywgb25FcnJvciApO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBUZXh0dXJlTG9hZGVyIH07IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL0ltYWdlTG9hZGVyLmpzJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAbW9kdWxlIEN1YmVUZXh0dXJlTG9hZGVyXG4gKiBAZGVzY3JpcHRpb24gQ3ViZSBUZXh0dXJlIExvYWRlciBiYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbG9hZGVycy9DdWJlVGV4dHVyZUxvYWRlci5qc31cbiAqL1xuY29uc3QgQ3ViZVRleHR1cmVMb2FkZXIgPSB7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIDYgaW1hZ2VzIGFzIGEgY3ViZSB0ZXh0dXJlXG4gICAgICogQGV4YW1wbGUgUEFOT0xFTlMuQ3ViZVRleHR1cmVMb2FkZXIubG9hZCggWyAncHgucG5nJywgJ254LnBuZycsICdweS5wbmcnLCAnbnkucG5nJywgJ3B6LnBuZycsICduei5wbmcnIF0gKVxuICAgICAqIEBtZXRob2QgbG9hZFxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgIHVybHMgICAgICAgIC0gYXJyYXkgb2YgNiB1cmxzIHRvIGltYWdlcywgb25lIGZvciBlYWNoIHNpZGUgb2YgdGhlIEN1YmVUZXh0dXJlLiBUaGUgdXJscyBzaG91bGQgYmUgc3BlY2lmaWVkIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6IHBvcy14LCBuZWcteCwgcG9zLXksIG5lZy15LCBwb3MteiwgbmVnLXpcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Mb2FkICAgICAtIE9uIGxvYWQgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Qcm9ncmVzcyAtIEluIHByb2dyZXNzIGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uRXJyb3IgICAgLSBPbiBlcnJvciBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge1RIUkVFLkN1YmVUZXh0dXJlfSAgIC0gQ3ViZSB0ZXh0dXJlXG4gICAgICovXG4gICAgbG9hZDogZnVuY3Rpb24gKCB1cmxzLCBvbkxvYWQgPSAoKSA9PiB7fSwgb25Qcm9ncmVzcyA9ICgpID0+IHt9LCBvbkVycm9yICkge1xuXG5cdCAgIHZhciB0ZXh0dXJlLCBsb2FkZWQsIHByb2dyZXNzLCBhbGwsIGxvYWRpbmdzO1xuXG5cdCAgIHRleHR1cmUgPSBuZXcgVEhSRUUuQ3ViZVRleHR1cmUoIFtdICk7XG5cblx0ICAgbG9hZGVkID0gMDtcblx0ICAgcHJvZ3Jlc3MgPSB7fTtcblx0ICAgYWxsID0ge307XG5cblx0ICAgdXJscy5tYXAoIGZ1bmN0aW9uICggdXJsLCBpbmRleCApIHtcblxuXHRcdCAgIEltYWdlTG9hZGVyLmxvYWQoIHVybCwgZnVuY3Rpb24gKCBpbWFnZSApIHtcblxuXHRcdFx0ICAgdGV4dHVyZS5pbWFnZXNbIGluZGV4IF0gPSBpbWFnZTtcblxuXHRcdFx0ICAgbG9hZGVkKys7XG5cblx0XHRcdCAgIGlmICggbG9hZGVkID09PSA2ICkge1xuXG5cdFx0XHRcdCAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHRcdCAgIG9uTG9hZCggdGV4dHVyZSApO1xuXG5cdFx0XHQgICB9XG5cblx0XHQgICB9LCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHQgICBwcm9ncmVzc1sgaW5kZXggXSA9IHsgbG9hZGVkOiBldmVudC5sb2FkZWQsIHRvdGFsOiBldmVudC50b3RhbCB9O1xuXG5cdFx0XHQgICBhbGwubG9hZGVkID0gMDtcblx0XHRcdCAgIGFsbC50b3RhbCA9IDA7XG5cdFx0XHQgICBsb2FkaW5ncyA9IDA7XG5cblx0XHRcdCAgIGZvciAoIHZhciBpIGluIHByb2dyZXNzICkge1xuXG5cdFx0XHRcdCAgIGxvYWRpbmdzKys7XG5cdFx0XHRcdCAgIGFsbC5sb2FkZWQgKz0gcHJvZ3Jlc3NbIGkgXS5sb2FkZWQ7XG5cdFx0XHRcdCAgIGFsbC50b3RhbCArPSBwcm9ncmVzc1sgaSBdLnRvdGFsO1xuXG5cdFx0XHQgICB9XG5cblx0XHRcdCAgIGlmICggbG9hZGluZ3MgPCA2ICkge1xuXG5cdFx0XHRcdCAgIGFsbC50b3RhbCA9IGFsbC50b3RhbCAvIGxvYWRpbmdzICogNjtcblxuXHRcdFx0ICAgfVxuXG5cdFx0XHQgICBvblByb2dyZXNzKCBhbGwgKTtcblxuXHRcdCAgIH0sIG9uRXJyb3IgKTtcblxuXHQgICB9ICk7XG5cblx0ICAgcmV0dXJuIHRleHR1cmU7XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IEN1YmVUZXh0dXJlTG9hZGVyIH07IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgVXNlciBNZWRpYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW2NvbnN0cmFpbnRzPXsgdmlkZW86IHsgd2lkdGg6IHsgaWRlYWw6IDE5MjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAxMDgwIH0sIGZhY2luZ01vZGU6IHsgZXhhY3Q6ICdlbnZpcm9ubWVudCcgfSB9LCBhdWRpbzogZmFsc2UgfV1cbiAqL1xuZnVuY3Rpb24gTWVkaWEgKCBjb25zdHJhaW50cyApIHtcblxuICAgIGNvbnN0IGRlZmF1bHRDb25zdHJhaW50cyA9IHsgdmlkZW86IHsgd2lkdGg6IHsgaWRlYWw6IDE5MjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAxMDgwIH0sIGZhY2luZ01vZGU6IHsgZXhhY3Q6ICdlbnZpcm9ubWVudCcgfSB9LCBhdWRpbzogZmFsc2UgfTtcblxuICAgIHRoaXMuY29uc3RyYWludHMgPSBPYmplY3QuYXNzaWduKCBkZWZhdWx0Q29uc3RyYWludHMsIGNvbnN0cmFpbnRzICk7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5zY2VuZSA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmRldmljZXMgPSBbXTtcbiAgICB0aGlzLnN0cmVhbSA9IG51bGw7XG4gICAgdGhpcy5yYXRpb1NjYWxhciA9IDE7XG4gICAgdGhpcy52aWRlb0RldmljZUluZGV4ID0gMDtcblxufTtcblxuTWVkaWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSApLCB7XG5cbiAgICBzZXRDb250YWluZXI6IGZ1bmN0aW9uICggY29udGFpbmVyICkge1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgfSxcblxuICAgIHNldFNjZW5lOiBmdW5jdGlvbiAoIHNjZW5lICkge1xuXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbnVtZXJhdGUgZGV2aWNlc1xuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGVudW1lcmF0ZURldmljZXM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBkZXZpY2VzID0gdGhpcy5kZXZpY2VzO1xuICAgICAgICBjb25zdCByZXNvbHZlZFByb21pc2UgPSBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiB7IHJlc29sdmUoIGRldmljZXMgKTsgfSApO1xuXG4gICAgICAgIHJldHVybiBkZXZpY2VzLmxlbmd0aCA+IDAgPyByZXNvbHZlZFByb21pc2UgOiB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoIHRvIG5leHQgYXZhaWxhYmxlIHZpZGVvIGRldmljZVxuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHN3aXRjaE5leHRWaWRlb0RldmljZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHN0b3AgPSB0aGlzLnN0b3AuYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnQuYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBzZXRWaWRlRGV2aWNlSW5kZXggPSB0aGlzLnNldFZpZGVEZXZpY2VJbmRleC5iaW5kKCB0aGlzICk7XG5cbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy52aWRlb0RldmljZUluZGV4O1xuXG4gICAgICAgIHRoaXMuZ2V0RGV2aWNlcyggJ3ZpZGVvJyApXG4gICAgICAgICAgICAudGhlbiggZGV2aWNlcyA9PiB7XG4gICAgICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKCBpbmRleCA+PSBkZXZpY2VzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VmlkZURldmljZUluZGV4KCAwICk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VmlkZURldmljZUluZGV4KCBpbmRleCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0YXJ0KCBkZXZpY2VzWyBpbmRleCBdICk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBkZXZpY2VzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB0eXBlIGtleXdvcmQgdG8gbWF0Y2ggZGV2aWNlLmtpbmRcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXREZXZpY2VzOiBmdW5jdGlvbiAoIHR5cGUgPSAndmlkZW8nICkge1xuXG4gICAgICAgIGNvbnN0IGRldmljZXMgPSB0aGlzLmRldmljZXM7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlID0gX2RldmljZXMgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gX2RldmljZXMubWFwKCBkZXZpY2UgPT4geyBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoICFkZXZpY2VzLmluY2x1ZGVzKCBkZXZpY2UgKSApIHsgZGV2aWNlcy5wdXNoKCBkZXZpY2UgKTsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZmlsdGVyID0gX2RldmljZXMgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKCB0eXBlLCAnaScgKTtcbiAgICAgICAgICAgIHJldHVybiBfZGV2aWNlcy5maWx0ZXIoIGRldmljZSA9PiByZWcudGVzdCggZGV2aWNlLmtpbmQgKSApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW51bWVyYXRlRGV2aWNlcygpXG4gICAgICAgICAgICAudGhlbiggdmFsaWRhdGUgKVxuICAgICAgICAgICAgLnRoZW4oIGZpbHRlciApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIG1lZGlhXG4gICAgICogQHBhcmFtIHtNZWRpYVN0cmVhbUNvbnN0cmFpbnRzfSBjb25zdHJhaW50c1xuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldFVzZXJNZWRpYTogZnVuY3Rpb24gKCBjb25zdHJhaW50cyApIHtcblxuICAgICAgICBjb25zdCBzZXRNZWRpYVN0cmVhbSA9IHRoaXMuc2V0TWVkaWFTdHJlYW0uYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBwbGF5VmlkZW8gPSB0aGlzLnBsYXlWaWRlby5iaW5kKCB0aGlzICk7XG4gICAgICAgIGNvbnN0IG9uQ2F0Y2hFcnJvciA9IGVycm9yID0+IHsgY29uc29sZS53YXJuKCBgUEFOT0xFTlMuTWVkaWE6ICR7ZXJyb3J9YCApOyB9O1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoIGNvbnN0cmFpbnRzIClcbiAgICAgICAgICAgIC50aGVuKCBzZXRNZWRpYVN0cmVhbSApXG4gICAgICAgICAgICAudGhlbiggcGxheVZpZGVvIClcbiAgICAgICAgICAgIC5jYXRjaCggb25DYXRjaEVycm9yICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHZpZGVvIGRldmljZSBpbmRleFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRWaWRlRGV2aWNlSW5kZXg6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cbiAgICAgICAgdGhpcy52aWRlb0RldmljZUluZGV4ID0gaW5kZXg7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgc3RyZWFtaW5nXG4gICAgICogQHBhcmFtIHtNZWRpYURldmljZUluZm99IFt0YXJnZXREZXZpY2VdXG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCB0YXJnZXREZXZpY2UgKSB7XG5cbiAgICAgICAgY29uc3QgY29uc3RyYWludHMgPSB0aGlzLmNvbnN0cmFpbnRzO1xuICAgICAgICBjb25zdCBnZXRVc2VyTWVkaWEgPSB0aGlzLmdldFVzZXJNZWRpYS5iaW5kKCB0aGlzICk7XG4gICAgICAgIGNvbnN0IG9uVmlkZW9EZXZpY2VzID0gZGV2aWNlcyA9PiB7XG5cbiAgICAgICAgICAgIGlmICggIWRldmljZXMgfHwgZGV2aWNlcy5sZW5ndGggPT09IDAgKSB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvciggJ25vIHZpZGVvIGRldmljZSBmb3VuZCcgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXZpY2UgPSB0YXJnZXREZXZpY2UgfHwgZGV2aWNlc1sgMCBdO1xuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBkZXZpY2UuZGV2aWNlSWQ7XG5cbiAgICAgICAgICAgIHJldHVybiBnZXRVc2VyTWVkaWEoIGNvbnN0cmFpbnRzICk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNyZWF0ZVZpZGVvRWxlbWVudCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldERldmljZXMoKS50aGVuKCBvblZpZGVvRGV2aWNlcyApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3Agc3RyZWFtaW5nXG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuc3RyZWFtO1xuXG4gICAgICAgIGlmICggc3RyZWFtICYmIHN0cmVhbS5hY3RpdmUgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gc3RyZWFtLmdldFRyYWNrcygpWyAwIF07XG5cbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcblxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zdHJlYW0gPSBudWxsO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgbWVkaWEgc3RyZWFtXG4gICAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gc3RyZWFtIFxuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldE1lZGlhU3RyZWFtOiBmdW5jdGlvbiAoIHN0cmVhbSApIHtcblxuICAgICAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcblxuICAgICAgICBpZiAoIHRoaXMuc2NlbmUgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IHRoaXMuY3JlYXRlVmlkZW9UZXh0dXJlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgdmlkZW8gZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHBsYXlWaWRlbzogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoIGVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwbGF5JyB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBhdXNlIHZpZGVvIGVsZW1lbnRcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwYXVzZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBlbGVtZW50IH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggZWxlbWVudCApIHtcblxuICAgICAgICAgICAgZWxlbWVudC5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYXVzZScgfSApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdmlkZW8gdGV4dHVyZVxuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtUSFJFRS5WaWRlb1RleHR1cmV9XG4gICAgICovXG4gICAgY3JlYXRlVmlkZW9UZXh0dXJlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuVmlkZW9UZXh0dXJlKCB2aWRlbyApO1xuXG4gICAgICAgIHRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XG4gICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5mb3JtYXQgPSBUSFJFRS5SR0JGb3JtYXQ7XG4gICAgICAgIHRleHR1cmUuY2VudGVyLnNldCggMC41LCAwLjUgKTtcblxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCAnY2FucGxheScsIHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHZpZGVvIGVsZW1lbnRcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7SFRNTFZpZGVvRWxlbWVudH1cbiAgICAgKiBAZmlyZXMgTWVkaWEjY2FucGxheVxuICAgICAqL1xuICAgIGNyZWF0ZVZpZGVvRWxlbWVudDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgZGlzcGF0Y2hFdmVudCA9IHRoaXMuZGlzcGF0Y2hFdmVudC5iaW5kKCB0aGlzICk7XG4gICAgICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3ZpZGVvJyApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWaWRlbyBjYW4gcGxheSBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgTWVkaWEjY2FucGxheVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgY2FuUGxheSA9ICgpID0+IGRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2NhbnBsYXknIH0gKTtcbiAgICAgICAgXG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSggJ2F1dG9wbGF5JywgJycgKTtcbiAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCAnbXV0ZWQnLCAnJyApO1xuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoICdwbGF5c2lubGluZScsICcnICk7XG5cbiAgICAgICAgdmlkZW8uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB2aWRlby5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIHZpZGVvLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB2aWRlby5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHZpZGVvLnN0eWxlLm9iamVjdFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIHZpZGVvLnN0eWxlLm9iamVjdEZpdCA9ICdjb3Zlcic7XG4gICAgICAgIHZpZGVvLnN0eWxlLmRpc3BsYXkgPSB0aGlzLnNjZW5lID8gJ25vbmUnIDogJyc7XG5cbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lciggJ2NhbnBsYXknLCBjYW5QbGF5ICk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICYmIHRoaXMuZWxlbWVudC52aWRlb1dpZHRoICYmIHRoaXMuZWxlbWVudC52aWRlb0hlaWdodCAmJiB0aGlzLnNjZW5lICkge1xuXG4gICAgICAgICAgICBjb25zdCB7IGNsaWVudFdpZHRoOiB3aWR0aCwgY2xpZW50SGVpZ2h0OiBoZWlnaHQgfSA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuc2NlbmUuYmFja2dyb3VuZDtcbiAgICAgICAgICAgIGNvbnN0IHsgdmlkZW9XaWR0aCwgdmlkZW9IZWlnaHQgfSA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGNhbWVyYVJhdGlvID0gdmlkZW9IZWlnaHQgLyB2aWRlb1dpZHRoO1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnRSYXRpbyA9IHRoaXMuY29udGFpbmVyID8gd2lkdGggLyBoZWlnaHQgOiAxLjA7XG4gICAgICAgICAgICBjb25zdCByYXRpbyA9IGNhbWVyYVJhdGlvICogdmlld3BvcnRSYXRpbyAqIHRoaXMucmF0aW9TY2FsYXI7XG5cbiAgICAgICAgICAgIGlmICggd2lkdGggPiBoZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZS5yZXBlYXQuc2V0KCByYXRpbywgMSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLnJlcGVhdC5zZXQoIDEsIDEgLyByYXRpbyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBNZWRpYSB9OyIsIlxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgUmV0aWNsZSAzRCBTcHJpdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtUSFJFRS5Db2xvcn0gW2NvbG9yPTB4ZmZmZmZmXSAtIENvbG9yIG9mIHRoZSByZXRpY2xlIHNwcml0ZVxuICogQHBhcmFtIHtib29sZWFufSBbYXV0b1NlbGVjdD10cnVlXSAtIEF1dG8gc2VsZWN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gW2R3ZWxsVGltZT0xNTAwXSAtIER1cmF0aW9uIGZvciBkd2VsbGluZyBzZXF1ZW5jZSB0byBjb21wbGV0ZVxuICovXG5cbmZ1bmN0aW9uIFJldGljbGUgKCBjb2xvciA9IDB4ZmZmZmZmLCBhdXRvU2VsZWN0ID0gdHJ1ZSwgZHdlbGxUaW1lID0gMTUwMCApIHtcblxuICAgIHRoaXMuZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cbiAgICBjb25zdCB7IGNhbnZhcywgY29udGV4dCB9ID0gdGhpcy5jcmVhdGVDYW52YXMoKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCggeyBjb2xvciwgbWFwOiB0aGlzLmNyZWF0ZUNhbnZhc1RleHR1cmUoIGNhbnZhcyApIH0gKTtcblxuICAgIFRIUkVFLlNwcml0ZS5jYWxsKCB0aGlzLCBtYXRlcmlhbCApO1xuXG4gICAgdGhpcy5jYW52YXNXaWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgaW5zdGFuY2VvZiBUSFJFRS5Db2xvciA/IGNvbG9yIDogbmV3IFRIUkVFLkNvbG9yKCBjb2xvciApOyAgICBcblxuICAgIHRoaXMuYXV0b1NlbGVjdCA9IGF1dG9TZWxlY3Q7XG4gICAgdGhpcy5kd2VsbFRpbWUgPSBkd2VsbFRpbWU7XG4gICAgdGhpcy5yaXBwbGVEdXJhdGlvbiA9IDUwMDtcbiAgICB0aGlzLnBvc2l0aW9uLnogPSAtMTA7XG4gICAgdGhpcy5jZW50ZXIuc2V0KCAwLjUsIDAuNSApO1xuICAgIHRoaXMuc2NhbGUuc2V0KCAwLjUsIDAuNSwgMSApO1xuXG4gICAgdGhpcy5zdGFydFRpbWVzdGFtcCA9IG51bGw7XG4gICAgdGhpcy50aW1lcklkID0gbnVsbDtcbiAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcblxuICAgIHRoaXMuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy51cGRhdGVDYW52YXNBcmNCeVByb2dyZXNzKCAwICk7XG5cbn07XG5cblJldGljbGUucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuU3ByaXRlLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogUmV0aWNsZSxcblxuICAgIC8qKlxuICAgICAqIFNldCBtYXRlcmlhbCBjb2xvclxuICAgICAqIEBwYXJhbSB7VEhSRUUuQ29sb3J9IGNvbG9yIFxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0Q29sb3I6IGZ1bmN0aW9uICggY29sb3IgKSB7XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jb2xvci5jb3B5KCBjb2xvciBpbnN0YW5jZW9mIFRIUkVFLkNvbG9yID8gY29sb3IgOiBuZXcgVEhSRUUuQ29sb3IoIGNvbG9yICkgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgY2FudmFzIHRleHR1cmVcbiAgICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXMgXG4gICAgICogQG1lbWJlck9mIFJldGljbGVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7VEhSRUUuQ2FudmFzVGV4dHVyZX1cbiAgICAgKi9cbiAgICBjcmVhdGVDYW52YXNUZXh0dXJlOiBmdW5jdGlvbiAoIGNhbnZhcyApIHtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoIGNhbnZhcyApO1xuICAgICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGNhbnZhcyBlbGVtZW50XG4gICAgICogQG1lbWJlck9mIFJldGljbGVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR9IG9iamVjdC5jYW52YXNcbiAgICAgKiBAcmV0dXJucyB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBvYmplY3QuY29udGV4dFxuICAgICAqL1xuICAgIGNyZWF0ZUNhbnZhczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gMzI7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDMyO1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcbiAgICAgICAgY29uc3QgZHByID0gdGhpcy5kcHI7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGggKiBkcHI7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiBkcHI7XG4gICAgICAgIGNvbnRleHQuc2NhbGUoIGRwciwgZHByICk7XG5cbiAgICAgICAgY29udGV4dC5zaGFkb3dCbHVyID0gNTtcbiAgICAgICAgY29udGV4dC5zaGFkb3dDb2xvciA9ICdyZ2JhKDIwMCwyMDAsMjAwLDAuOSknO1xuXG4gICAgICAgIHJldHVybiB7IGNhbnZhcywgY29udGV4dCB9O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjYW52YXMgYXJjIGJ5IHByb2dyZXNzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByb2dyZXNzIFxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzczogZnVuY3Rpb24gKCBwcm9ncmVzcyApIHtcblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCB7IGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIG1hdGVyaWFsIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBkcHIgPSB0aGlzLmRwcjtcbiAgICAgICAgY29uc3QgZGVncmVlID0gcHJvZ3Jlc3MgKiBNYXRoLlBJICogMjtcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yLmdldFN0eWxlKCk7XG4gICAgICAgIGNvbnN0IHggPSBjYW52YXNXaWR0aCAqIDAuNSAvIGRwcjtcbiAgICAgICAgY29uc3QgeSA9IGNhbnZhc0hlaWdodCAqIDAuNSAvIGRwcjtcbiAgICAgICAgY29uc3QgbGluZVdpZHRoID0gMztcbiAgICAgICAgXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0ICk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgaWYgKCBwcm9ncmVzcyA9PT0gMCApIHtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKCB4LCB5LCBjYW52YXNXaWR0aCAvIDE2LCAwLCAyICogTWF0aC5QSSApO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5hcmMoIHgsIHksIGNhbnZhc1dpZHRoIC8gNCAtIGxpbmVXaWR0aCwgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBkZWdyZWUgKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgbWF0ZXJpYWwubWFwLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSaXBwbGUgZWZmZWN0XG4gICAgICogQG1lbWJlck9mIFJldGljbGVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgUmV0aWNsZSNyZXRpY2xlLXJpcHBsZS1zdGFydFxuICAgICAqIEBmaXJlcyBSZXRpY2xlI3JldGljbGUtcmlwcGxlLWVuZFxuICAgICAqL1xuICAgIHJpcHBsZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgbWF0ZXJpYWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5yaXBwbGVEdXJhdGlvbjtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY29uc3QgZHByID0gdGhpcy5kcHI7XG4gICAgICAgIGNvbnN0IHggPSBjYW52YXNXaWR0aCAqIDAuNSAvIGRwcjtcbiAgICAgICAgY29uc3QgeSA9IGNhbnZhc0hlaWdodCAqIDAuNSAvIGRwcjtcblxuICAgICAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB1cGRhdGUgKTtcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSBwZXJmb3JtYW5jZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gZWxhcHNlZCAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDEuMCAtIHByb2dyZXNzID4gMCA/IDEuMCAtIHByb2dyZXNzIDogMDtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IHByb2dyZXNzICogY2FudmFzV2lkdGggKiAwLjUgLyBkcHI7XG5cbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0ICk7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5hcmMoIHgsIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIgKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtjb2xvci5yICogMjU1fSwgJHtjb2xvci5nICogMjU1fSwgJHtjb2xvci5iICogMjU1fSwgJHtvcGFjaXR5fSlgO1xuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICBpZiAoIHByb2dyZXNzID49IDEuMCApIHtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggdGltZXJJZCApO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzcyggMCApO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmV0aWNsZSByaXBwbGUgZW5kIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUmV0aWNsZSNyZXRpY2xlLXJpcHBsZS1lbmRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3JldGljbGUtcmlwcGxlLWVuZCcgfSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hdGVyaWFsLm1hcC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0aWNsZSByaXBwbGUgc3RhcnQgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFJldGljbGUjcmV0aWNsZS1yaXBwbGUtc3RhcnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncmV0aWNsZS1yaXBwbGUtc3RhcnQnIH0gKTtcblxuICAgICAgICB1cGRhdGUoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHJldGljbGUgdmlzaWJsZVxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2hvdzogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFrZSByZXRpY2xlIGludmlzaWJsZVxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgaGlkZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGR3ZWxsaW5nXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgXG4gICAgICogQG1lbWJlck9mIFJldGljbGVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgUmV0aWNsZSNyZXRpY2xlLXN0YXJ0XG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICggY2FsbGJhY2sgKSB7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5hdXRvU2VsZWN0ICkge1xuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRpY2xlIHN0YXJ0IGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBSZXRpY2xlI3JldGljbGUtc3RhcnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncmV0aWNsZS1zdGFydCcgfSApO1xuXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuZCBkd2VsbGluZ1xuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFJldGljbGUjcmV0aWNsZS1lbmRcbiAgICAgKi9cbiAgICBlbmQ6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5zdGFydFRpbWVzdGFtcCApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKCB0aGlzLnRpbWVySWQgKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc0FyY0J5UHJvZ3Jlc3MoIDAgKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIHRoaXMudGltZXJJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lc3RhbXAgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRpY2xlIGVuZCBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgUmV0aWNsZSNyZXRpY2xlLWVuZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdyZXRpY2xlLWVuZCcgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBkd2VsbGluZ1xuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFJldGljbGUjcmV0aWNsZS11cGRhdGVcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnRpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICBjb25zdCBlbGFwc2VkID0gcGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLnN0YXJ0VGltZXN0YW1wO1xuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGVsYXBzZWQgLyB0aGlzLmR3ZWxsVGltZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc0FyY0J5UHJvZ3Jlc3MoIHByb2dyZXNzICk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldGljbGUgdXBkYXRlIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBSZXRpY2xlI3JldGljbGUtdXBkYXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3JldGljbGUtdXBkYXRlJywgcHJvZ3Jlc3MgfSApO1xuXG4gICAgICAgIGlmICggcHJvZ3Jlc3MgPj0gMS4wICkge1xuXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMudGltZXJJZCApO1xuICAgICAgICAgICAgaWYgKCB0aGlzLmNhbGxiYWNrICkgeyB0aGlzLmNhbGxiYWNrKCk7IH1cbiAgICAgICAgICAgIHRoaXMuZW5kKCk7XG4gICAgICAgICAgICB0aGlzLnJpcHBsZSgpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBSZXRpY2xlIH07IiwiLyoqXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanMvZ3JhcGhzL2NvbnRyaWJ1dG9ycyBmb3IgdGhlIGZ1bGwgbGlzdCBvZiBjb250cmlidXRvcnMuXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcbiAqL1xuXG5cbnZhciBfR3JvdXAgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX3R3ZWVucyA9IHt9O1xuXHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xufTtcblxuX0dyb3VwLnByb3RvdHlwZSA9IHtcblx0Z2V0QWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoZnVuY3Rpb24gKHR3ZWVuSWQpIHtcblx0XHRcdHJldHVybiB0aGlzLl90d2VlbnNbdHdlZW5JZF07XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHR9LFxuXG5cdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5fdHdlZW5zID0ge307XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0dGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcblxuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldO1xuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXTtcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gKHRpbWUsIHByZXNlcnZlKSB7XG5cblx0XHR2YXIgdHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpO1xuXG5cdFx0aWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogVFdFRU4ubm93KCk7XG5cblx0XHQvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgdGhlbiB0aGVcblx0XHQvLyBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxuXHRcdC8vIElmIHlvdSByZW1vdmUgYSB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCBpdCBtYXkgb3IgbWF5IG5vdCBiZSB1cGRhdGVkLiBIb3dldmVyLFxuXHRcdC8vIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsIHRoZW4gaXQgd2lsbCBub3QgYmUgdXBkYXRlZC5cblx0XHR3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cblx0XHRcdFx0aWYgKHR3ZWVuICYmIHR3ZWVuLnVwZGF0ZSh0aW1lKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHR0d2Vlbi5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIXByZXNlcnZlKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xuXG5UV0VFTi5Hcm91cCA9IF9Hcm91cDtcblRXRUVOLl9uZXh0SWQgPSAwO1xuVFdFRU4ubmV4dElkID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gVFdFRU4uX25leHRJZCsrO1xufTtcblxuXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxuLy8gSW4gbm9kZS5qcywgdXNlIHByb2Nlc3MuaHJ0aW1lLlxuaWYgKHR5cGVvZiAoc2VsZikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugc2VsZi5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mIChzZWxmKSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCBzZWxmLnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XG5cbn07XG5cblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Z2V0SWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5faWQ7XG5cdH0sXG5cblx0aXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzUGxheWluZztcblx0fSxcblxuXHR0bzogZnVuY3Rpb24gKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBPYmplY3QuY3JlYXRlKHByb3BlcnRpZXMpO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkdXJhdGlvbjogZnVuY3Rpb24gZHVyYXRpb24oZCkge1xuXHRcdHRoaXMuX2R1cmF0aW9uID0gZDtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gKHRpbWUpIHtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSB0aGlzLl9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFt0aGlzLl9vYmplY3RbcHJvcGVydHldXS5jb25jYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcDogZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMudXBkYXRlKEluZmluaXR5KTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcblx0XHR9XG5cblx0fSxcblxuXHRncm91cDogZnVuY3Rpb24gKGdyb3VwKSB7XG5cdFx0dGhpcy5fZ3JvdXAgPSBncm91cDtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRkZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xuXG5cdFx0dGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0OiBmdW5jdGlvbiAodGltZXMpIHtcblxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0RGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uICh5b3lvKSB7XG5cblx0XHR0aGlzLl95b3lvID0geW95bztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVhc2luZzogZnVuY3Rpb24gKGVhc2luZ0Z1bmN0aW9uKSB7XG5cblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aW50ZXJwb2xhdGlvbjogZnVuY3Rpb24gKGludGVycG9sYXRpb25GdW5jdGlvbikge1xuXG5cdFx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25SZXBlYXQ6IGZ1bmN0aW9uIG9uUmVwZWF0KGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25TdG9wOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RvcENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lKSB7XG5cblx0XHR2YXIgcHJvcGVydHk7XG5cdFx0dmFyIGVsYXBzZWQ7XG5cdFx0dmFyIHZhbHVlO1xuXG5cdFx0aWYgKHRpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcblxuXHRcdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGVsYXBzZWQgPSAodGltZSAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl9kdXJhdGlvbjtcblx0XHRlbGFwc2VkID0gKHRoaXMuX2R1cmF0aW9uID09PSAwIHx8IGVsYXBzZWQgPiAxKSA/IDEgOiBlbGFwc2VkO1xuXG5cdFx0dmFsdWUgPSB0aGlzLl9lYXNpbmdGdW5jdGlvbihlbGFwc2VkKTtcblxuXHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XG5cblx0XHRcdC8vIERvbid0IHVwZGF0ZSBwcm9wZXJ0aWVzIHRoYXQgZG8gbm90IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzdGFydCA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXHRcdFx0dmFyIGVuZCA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gUGFyc2VzIHJlbGF0aXZlIGVuZCB2YWx1ZXMgd2l0aCBzdGFydCBhcyBiYXNlIChlLmcuOiArMTAsIC0zKVxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnc3RyaW5nJykge1xuXG5cdFx0XHRcdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT09ICcrJyB8fCBlbmQuY2hhckF0KDApID09PSAnLScpIHtcblx0XHRcdFx0XHRcdGVuZCA9IHN0YXJ0ICsgcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUHJvdGVjdCBhZ2FpbnN0IG5vbiBudW1lcmljIHByb3BlcnRpZXMuXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vblVwZGF0ZUNhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XG5cdFx0fVxuXG5cdFx0aWYgKGVsYXBzZWQgPT09IDEpIHtcblxuXHRcdFx0aWYgKHRoaXMuX3JlcGVhdCA+IDApIHtcblxuXHRcdFx0XHRpZiAoaXNGaW5pdGUodGhpcy5fcmVwZWF0KSkge1xuXHRcdFx0XHRcdHRoaXMuX3JlcGVhdC0tO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVhc3NpZ24gc3RhcnRpbmcgdmFsdWVzLCByZXN0YXJ0IGJ5IG1ha2luZyBzdGFydFRpbWUgPSBub3dcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IHRtcDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fcmVwZWF0RGVsYXlUaW1lO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9kZWxheVRpbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fb25SZXBlYXRDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5pbXBvcnQgeyBNT0RFUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9UZXh0dXJlTG9hZGVyJztcbmltcG9ydCBUV0VFTiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcyc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBJbmZvcm1hdGlvbiBzcG90IGF0dGFjaGVkIHRvIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2NhbGU9MzAwXSAtIERlZmF1bHQgc2NhbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaW1hZ2VTcmM9UEFOT0xFTlMuRGF0YUltYWdlLkluZm9dIC0gSW1hZ2Ugb3ZlcmxheSBpbmZvXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthbmltYXRlZD10cnVlXSAtIEVuYWJsZSBkZWZhdWx0IGhvdmVyIGFuaW1hdGlvblxuICovXG5mdW5jdGlvbiBJbmZvc3BvdCAoIHNjYWxlID0gMzAwLCBpbWFnZVNyYywgYW5pbWF0ZWQgKSB7XG5cdFxuICAgIGNvbnN0IGR1cmF0aW9uID0gNTAwLCBzY2FsZUZhY3RvciA9IDEuMztcblxuICAgIGltYWdlU3JjID0gaW1hZ2VTcmMgfHwgRGF0YUltYWdlLkluZm87XG5cbiAgICBUSFJFRS5TcHJpdGUuY2FsbCggdGhpcyApO1xuXG4gICAgdGhpcy50eXBlID0gJ2luZm9zcG90JztcblxuICAgIHRoaXMuYW5pbWF0ZWQgPSBhbmltYXRlZCAhPT0gdW5kZWZpbmVkID8gYW5pbWF0ZWQgOiB0cnVlO1xuICAgIHRoaXMuaXNIb3ZlcmluZyA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgKiBUT0RPOiBUaHJlZS5qcyBidWcgaG90Zml4IGZvciBzcHJpdGUgcmF5Y2FzdGluZyByMTA0XG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMTQ2MjRcbiAgICAgKi9cbiAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy50b1Bhbm9yYW1hID0gbnVsbDtcbiAgICB0aGlzLmN1cnNvclN0eWxlID0gbnVsbDtcblxuICAgIHRoaXMubW9kZSA9IE1PREVTLk5PUk1BTDtcblxuICAgIHRoaXMuc2NhbGUuc2V0KCBzY2FsZSwgc2NhbGUsIDEgKTtcbiAgICB0aGlzLnJvdGF0aW9uLnkgPSBNYXRoLlBJO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuXG4gICAgdGhpcy5vcmlnaW5hbFJheWNhc3QgPSB0aGlzLnJheWNhc3Q7XG5cbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgdGhpcy5IQU5ETEVSX0ZPQ1VTID0gbnVsbDtcdFxuXG4gICAgdGhpcy5tYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICB0aGlzLm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xuICAgIHRoaXMubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgIHRoaXMubWF0ZXJpYWwub3BhY2l0eSA9IDA7XG5cbiAgICB0aGlzLnNjYWxlVXBBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oKTtcbiAgICB0aGlzLnNjYWxlRG93bkFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbigpO1xuXG5cbiAgICBjb25zdCBwb3N0TG9hZCA9IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICBpZiAoICF0aGlzLm1hdGVyaWFsICkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCByYXRpbyA9IHRleHR1cmUuaW1hZ2Uud2lkdGggLyB0ZXh0dXJlLmltYWdlLmhlaWdodDtcbiAgICAgICAgY29uc3QgdGV4dHVyZVNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgICAgICB0ZXh0dXJlLmltYWdlLndpZHRoID0gdGV4dHVyZS5pbWFnZS5uYXR1cmFsV2lkdGggfHwgNjQ7XG4gICAgICAgIHRleHR1cmUuaW1hZ2UuaGVpZ2h0ID0gdGV4dHVyZS5pbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IDY0O1xuXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0KCByYXRpbyAqIHNjYWxlLCBzY2FsZSwgMSApO1xuXG4gICAgICAgIHRleHR1cmVTY2FsZS5jb3B5KCB0aGlzLnNjYWxlICk7XG5cbiAgICAgICAgdGhpcy5zY2FsZVVwQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLnNjYWxlIClcbiAgICAgICAgICAgIC50byggeyB4OiB0ZXh0dXJlU2NhbGUueCAqIHNjYWxlRmFjdG9yLCB5OiB0ZXh0dXJlU2NhbGUueSAqIHNjYWxlRmFjdG9yIH0sIGR1cmF0aW9uIClcbiAgICAgICAgICAgIC5lYXNpbmcoIFRXRUVOLkVhc2luZy5FbGFzdGljLk91dCApO1xuXG4gICAgICAgIHRoaXMuc2NhbGVEb3duQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLnNjYWxlIClcbiAgICAgICAgICAgIC50byggeyB4OiB0ZXh0dXJlU2NhbGUueCwgeTogdGV4dHVyZVNjYWxlLnkgfSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0ICk7XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIH0uYmluZCggdGhpcyApO1xuXG4gICAgLy8gQWRkIHNob3cgYW5kIGhpZGUgYW5pbWF0aW9uc1xuICAgIHRoaXMuc2hvd0FuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG4gICAgICAgIC50byggeyBvcGFjaXR5OiAxIH0sIGR1cmF0aW9uIClcbiAgICAgICAgLm9uU3RhcnQoIHRoaXMuZW5hYmxlUmF5Y2FzdC5iaW5kKCB0aGlzLCB0cnVlICkgKVxuICAgICAgICAuZWFzaW5nKCBUV0VFTi5FYXNpbmcuUXVhcnRpYy5PdXQgKTtcblxuICAgIHRoaXMuaGlkZUFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG4gICAgICAgIC50byggeyBvcGFjaXR5OiAwIH0sIGR1cmF0aW9uIClcbiAgICAgICAgLm9uU3RhcnQoIHRoaXMuZW5hYmxlUmF5Y2FzdC5iaW5kKCB0aGlzLCBmYWxzZSApIClcbiAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0ICk7XG5cbiAgICAvLyBBdHRhY2ggZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLm9uQ2xpY2sgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdob3ZlcicsIHRoaXMub25Ib3ZlciApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2hvdmVyZW50ZXInLCB0aGlzLm9uSG92ZXJTdGFydCApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2hvdmVybGVhdmUnLCB0aGlzLm9uSG92ZXJFbmQgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCB0aGlzLm9uRHVhbEV5ZUVmZmVjdCApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIHRoaXMuc2V0Q29udGFpbmVyLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2Rpc21pc3MnLCB0aGlzLm9uRGlzbWlzcyApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWluZm9zcG90LWZvY3VzJywgdGhpcy5zZXRGb2N1c01ldGhvZCApO1xuXG4gICAgVGV4dHVyZUxvYWRlci5sb2FkKCBpbWFnZVNyYywgcG9zdExvYWQgKTtcdFxuXG59O1xuXG5JbmZvc3BvdC5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5TcHJpdGUucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBJbmZvc3BvdCxcblxuICAgIC8qKlxuICAgICAqIFNldCBpbmZvc3BvdCBjb250YWluZXJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fG9iamVjdH0gZGF0YSAtIERhdGEgd2l0aCBjb250YWluZXIgaW5mb3JtYXRpb25cbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRDb250YWluZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcblxuICAgICAgICBsZXQgY29udGFpbmVyO1xuXHRcbiAgICAgICAgaWYgKCBkYXRhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG5cdFxuICAgICAgICAgICAgY29udGFpbmVyID0gZGF0YTtcblx0XG4gICAgICAgIH0gZWxzZSBpZiAoIGRhdGEgJiYgZGF0YS5jb250YWluZXIgKSB7XG5cdFxuICAgICAgICAgICAgY29udGFpbmVyID0gZGF0YS5jb250YWluZXI7XG5cdFxuICAgICAgICB9XG5cdFxuICAgICAgICAvLyBBcHBlbmQgZWxlbWVudCBpZiBleGlzdHNcbiAgICAgICAgaWYgKCBjb250YWluZXIgJiYgdGhpcy5lbGVtZW50ICkge1xuXHRcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cdFxuICAgICAgICB9XG5cdFxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblx0XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBUaGUgY29udGFpbmVyIG9mIHRoaXMgaW5mb3Nwb3RcbiAgICAgKi9cbiAgICBnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCBieSBhIGNsaWNrIGV2ZW50XG4gICAgICogVHJhbnNsYXRlIGFuZCBsb2NrIHRoZSBob3ZlcmluZyBlbGVtZW50IGlmIGFueVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgLSBFdmVudCBjb250YWluaW5nIG1vdXNlRXZlbnQgd2l0aCBjbGllbnRYIGFuZCBjbGllbnRZXG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25DbGljazogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCAmJiB0aGlzLmdldENvbnRhaW5lcigpICkge1xuXG4gICAgICAgICAgICB0aGlzLm9uSG92ZXJTdGFydCggZXZlbnQgKTtcblxuICAgICAgICAgICAgLy8gTG9jayBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLmxvY2tIb3ZlckVsZW1lbnQoKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzbWlzcyBjdXJyZW50IGVsZW1lbnQgaWYgYW55XG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIERpc21pc3MgZXZlbnRcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkRpc21pc3M6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCApIHtcblxuICAgICAgICAgICAgdGhpcy51bmxvY2tIb3ZlckVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMub25Ib3ZlckVuZCgpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIGJ5IGEgbW91c2UgaG92ZXIgZXZlbnRcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGhvdmVyaW5nIGVsZW1lbnQgaWYgYW55XG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIEV2ZW50IGNvbnRhaW5pbmcgbW91c2VFdmVudCB3aXRoIGNsaWVudFggYW5kIGNsaWVudFlcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkhvdmVyOiBmdW5jdGlvbiAoKSB7fSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgb24gYSBtb3VzZSBob3ZlciBzdGFydFxuICAgICAqIFNldHMgY3Vyc29yIHN0eWxlIHRvICdwb2ludGVyJywgZGlzcGxheSB0aGUgZWxlbWVudCBhbmQgc2NhbGUgdXAgdGhlIGluZm9zcG90XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50XG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Ib3ZlclN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggIXRoaXMuZ2V0Q29udGFpbmVyKCkgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGN1cnNvclN0eWxlID0gdGhpcy5jdXJzb3JTdHlsZSB8fCAoIHRoaXMubW9kZSA9PT0gTU9ERVMuTk9STUFMID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnICk7XG4gICAgICAgIGNvbnN0IHsgc2NhbGVEb3duQW5pbWF0aW9uLCBzY2FsZVVwQW5pbWF0aW9uLCBlbGVtZW50IH0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaXNIb3ZlcmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IGN1cnNvclN0eWxlO1xuXHRcdFxuICAgICAgICBpZiAoIHRoaXMuYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlRG93bkFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICBzY2FsZVVwQW5pbWF0aW9uLnN0YXJ0KCk7XG5cbiAgICAgICAgfVxuXHRcdFxuICAgICAgICBpZiAoIGVsZW1lbnQgJiYgZXZlbnQubW91c2VFdmVudC5jbGllbnRYID49IDAgJiYgZXZlbnQubW91c2VFdmVudC5jbGllbnRZID49IDAgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQsIHN0eWxlIH0gPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuQ0FSREJPQVJEIHx8IHRoaXMubW9kZSA9PT0gTU9ERVMuU1RFUkVPICkge1xuXG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBsZWZ0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIHJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgZWxlbWVudCB3aWR0aCBmb3IgcmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgZWxlbWVudC5fd2lkdGggPSBsZWZ0LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuX2hlaWdodCA9IGxlZnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgaWYgKCBsZWZ0ICkgeyBsZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH1cbiAgICAgICAgICAgICAgICBpZiAoIHJpZ2h0ICkgeyByaWdodC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBlbGVtZW50IHdpZHRoIGZvciByZWZlcmVuY2VcbiAgICAgICAgICAgICAgICBlbGVtZW50Ll93aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5faGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIH1cblx0XHRcdFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCBvbiBhIG1vdXNlIGhvdmVyIGVuZFxuICAgICAqIFNldHMgY3Vyc29yIHN0eWxlIHRvICdkZWZhdWx0JywgaGlkZSB0aGUgZWxlbWVudCBhbmQgc2NhbGUgZG93biB0aGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkhvdmVyRW5kOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5nZXRDb250YWluZXIoKSApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgeyBzY2FsZURvd25BbmltYXRpb24sIHNjYWxlVXBBbmltYXRpb24sIGVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pc0hvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcblxuICAgICAgICBpZiAoIHRoaXMuYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlVXBBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgc2NhbGVEb3duQW5pbWF0aW9uLnN0YXJ0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZWxlbWVudCAmJiAhdGhpcy5lbGVtZW50LmxvY2tlZCApIHtcblxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCByaWdodCwgc3R5bGUgfSA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpZiAoIGxlZnQgKSB7IGxlZnQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuICAgICAgICAgICAgaWYgKCByaWdodCApIHsgcmlnaHQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG4gICAgICAgICAgICB0aGlzLnVubG9ja0hvdmVyRWxlbWVudCgpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiBkdWFsIGV5ZSBlZmZlY3QgaGFuZGxlclxuICAgICAqIENyZWF0ZXMgZHVwbGljYXRlIGxlZnQgYW5kIHJpZ2h0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gcGFub2xlbnMtZHVhbC1leWUtZWZmZWN0IGV2ZW50XG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25EdWFsRXllRWZmZWN0OiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFxuICAgICAgICBpZiAoICF0aGlzLmdldENvbnRhaW5lcigpICkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgZWxlbWVudCwgaGFsZldpZHRoLCBoYWxmSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMubW9kZSA9IGV2ZW50Lm1vZGU7XG5cbiAgICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuICAgICAgICBoYWxmV2lkdGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgIGhhbGZIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyO1xuXG4gICAgICAgIGlmICggIWVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhZWxlbWVudC5sZWZ0ICYmICFlbGVtZW50LnJpZ2h0ICkge1xuXG4gICAgICAgICAgICBlbGVtZW50LmxlZnQgPSBlbGVtZW50LmNsb25lTm9kZSggdHJ1ZSApO1xuICAgICAgICAgICAgZWxlbWVudC5yaWdodCA9IGVsZW1lbnQuY2xvbmVOb2RlKCB0cnVlICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5tb2RlID09PSBNT0RFUy5DQVJEQk9BUkQgfHwgdGhpcy5tb2RlID09PSBNT0RFUy5TVEVSRU8gKSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBlbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBlbGVtZW50cyB0cmFuc2xhdGlvblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZUVsZW1lbnQoIGhhbGZXaWR0aCwgaGFsZkhlaWdodCApO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBlbGVtZW50LmxlZnQgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIGVsZW1lbnQucmlnaHQgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGhvdmVyaW5nIGVsZW1lbnQgYnkgY3NzIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSAge251bWJlcn0geCAtIFggcG9zaXRpb24gb24gdGhlIHdpbmRvdyBzY3JlZW5cbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkgLSBZIHBvc2l0aW9uIG9uIHRoZSB3aW5kb3cgc2NyZWVuXG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdHJhbnNsYXRlRWxlbWVudDogZnVuY3Rpb24gKCB4LCB5ICkge1xuXG4gICAgICAgIGlmICggIXRoaXMuZWxlbWVudC5fd2lkdGggfHwgIXRoaXMuZWxlbWVudC5faGVpZ2h0IHx8ICF0aGlzLmdldENvbnRhaW5lcigpICkge1xuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZWZ0LCB0b3AsIGVsZW1lbnQsIHdpZHRoLCBoZWlnaHQsIGRlbHRhLCBjb250YWluZXI7XG5cbiAgICAgICAgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIHdpZHRoID0gZWxlbWVudC5fd2lkdGggLyAyO1xuICAgICAgICBoZWlnaHQgPSBlbGVtZW50Ll9oZWlnaHQgLyAyO1xuICAgICAgICBkZWx0YSA9IGVsZW1lbnQudmVydGljYWxEZWx0YSAhPT0gdW5kZWZpbmVkID8gZWxlbWVudC52ZXJ0aWNhbERlbHRhIDogNDA7XG5cbiAgICAgICAgbGVmdCA9IHggLSB3aWR0aDtcbiAgICAgICAgdG9wID0geSAtIGhlaWdodCAtIGRlbHRhO1xuXG4gICAgICAgIGlmICggKCB0aGlzLm1vZGUgPT09IE1PREVTLkNBUkRCT0FSRCB8fCB0aGlzLm1vZGUgPT09IE1PREVTLlNURVJFTyApIFxuXHRcdFx0XHQmJiBlbGVtZW50LmxlZnQgJiYgZWxlbWVudC5yaWdodFxuXHRcdFx0XHQmJiAhKCB4ID09PSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyICYmIHkgPT09IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyICkgKSB7XG5cbiAgICAgICAgICAgIGxlZnQgPSBjb250YWluZXIuY2xpZW50V2lkdGggLyA0IC0gd2lkdGggKyAoIHggLSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyICk7XG4gICAgICAgICAgICB0b3AgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMiAtIGhlaWdodCAtIGRlbHRhICsgKCB5IC0gY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDIgKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50U3R5bGUoICd0cmFuc2Zvcm0nLCBlbGVtZW50LmxlZnQsICd0cmFuc2xhdGUoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgpJyApO1xuXG4gICAgICAgICAgICBsZWZ0ICs9IGNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDI7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudFN0eWxlKCAndHJhbnNmb3JtJywgZWxlbWVudC5yaWdodCwgJ3RyYW5zbGF0ZSgnICsgbGVmdCArICdweCwgJyArIHRvcCArICdweCknICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50U3R5bGUoICd0cmFuc2Zvcm0nLCBlbGVtZW50LCAndHJhbnNsYXRlKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4KScgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHZlbmRvciBzcGVjaWZpYyBjc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIENTUyBzdHlsZSBuYW1lXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGJlIG1vZGlmaWVkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gU3R5bGUgdmFsdWVcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRFbGVtZW50U3R5bGU6IGZ1bmN0aW9uICggdHlwZSwgZWxlbWVudCwgdmFsdWUgKSB7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBlbGVtZW50LnN0eWxlO1xuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3RyYW5zZm9ybScgKSB7XG5cbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHN0eWxlLm1zVHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID0gdmFsdWU7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBob3ZlcmluZyB0ZXh0IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQgdG8gYmUgZGlzcGxheWVkXG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0VGV4dDogZnVuY3Rpb24gKCB0ZXh0ICkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICkge1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgY3Vyc29yIGNzcyBzdHlsZSBvbiBob3ZlclxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldEN1cnNvckhvdmVyU3R5bGU6IGZ1bmN0aW9uICggc3R5bGUgKSB7XG5cbiAgICAgICAgdGhpcy5jdXJzb3JTdHlsZSA9IHN0eWxlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBob3ZlcmluZyB0ZXh0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQgdG8gYmUgZGlzcGxheWVkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YT00MF0gLSBWZXJ0aWNhbCBkZWx0YSB0byB0aGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRIb3ZlclRleHQ6IGZ1bmN0aW9uICggdGV4dCwgZGVsdGEgPSA0MCApIHtcblxuICAgICAgICBpZiAoICF0aGlzLmVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJzUwJSc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzUwJSc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudGV4dFNoYWRvdyA9ICcwIDAgM3B4ICMwMDAwMDAnO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSAnXCJUcmVidWNoZXQgTVNcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ3Bhbm9sZW5zLWluZm9zcG90JyApO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnZlcnRpY2FsRGVsdGEgPSBkZWx0YTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRUZXh0KCB0ZXh0ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGhvdmVyaW5nIGVsZW1lbnQgYnkgY2xvbmluZyBhbiBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRE9NRWxlbWVudH0gZWwgLSBFbGVtZW50IHRvIGJlIGNsb25lZCBhbmQgZGlzcGxheWVkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YT00MF0gLSBWZXJ0aWNhbCBkZWx0YSB0byB0aGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICggZWwsIGRlbHRhID0gNDAgKSB7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5lbGVtZW50ICkgeyBcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWwuY2xvbmVOb2RlKCB0cnVlICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAncGFub2xlbnMtaW5mb3Nwb3QnICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmVydGljYWxEZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgaG92ZXJpbmcgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbW92ZUhvdmVyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICkgeyBcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmVsZW1lbnQubGVmdCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQubGVmdCApO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5sZWZ0ID0gbnVsbDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZWxlbWVudC5yaWdodCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQucmlnaHQgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmlnaHQgPSBudWxsO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvY2sgaG92ZXJpbmcgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvY2tIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCApIHsgXG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5sb2NrZWQgPSB0cnVlO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmxvY2sgaG92ZXJpbmcgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVubG9ja0hvdmVyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICkgeyBcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgcmF5Y2FzdGluZ1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9dHJ1ZV1cbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBlbmFibGVSYXljYXN0OiBmdW5jdGlvbiAoIGVuYWJsZWQgPSB0cnVlICkge1xuXG4gICAgICAgIGlmICggZW5hYmxlZCApIHtcblxuICAgICAgICAgICAgdGhpcy5yYXljYXN0ID0gdGhpcy5vcmlnaW5hbFJheWNhc3Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5yYXljYXN0ID0gKCkgPT4ge307XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNob3cgaW5mb3Nwb3RcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IFtkZWxheT0wXSAtIERlbGF5IHRpbWUgdG8gc2hvd1xuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNob3c6IGZ1bmN0aW9uICggZGVsYXkgPSAwICkge1xuXG4gICAgICAgIGNvbnN0IHsgYW5pbWF0ZWQsIGhpZGVBbmltYXRpb24sIHNob3dBbmltYXRpb24sIG1hdGVyaWFsIH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIGhpZGVBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgc2hvd0FuaW1hdGlvbi5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUmF5Y2FzdCggdHJ1ZSApO1xuICAgICAgICAgICAgbWF0ZXJpYWwub3BhY2l0eSA9IDE7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhpZGUgaW5mb3Nwb3RcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IFtkZWxheT0wXSAtIERlbGF5IHRpbWUgdG8gaGlkZVxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGhpZGU6IGZ1bmN0aW9uICggZGVsYXkgPSAwICkge1xuXG4gICAgICAgIGNvbnN0IHsgYW5pbWF0ZWQsIGhpZGVBbmltYXRpb24sIHNob3dBbmltYXRpb24sIG1hdGVyaWFsIH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIHNob3dBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgaGlkZUFuaW1hdGlvbi5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUmF5Y2FzdCggZmFsc2UgKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgIH1cblx0XHRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGZvY3VzIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRGb2N1c01ldGhvZDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICB0aGlzLkhBTkRMRVJfRk9DVVMgPSBldmVudC5tZXRob2Q7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZvY3VzIGNhbWVyYSBjZW50ZXIgdG8gdGhpcyBpbmZvc3BvdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MTAwMF0gLSBEdXJhdGlvbiB0byB0d2VlblxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9VFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsLk91dF0gLSBFYXNpbmcgZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmb2N1czogZnVuY3Rpb24gKCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG4gICAgICAgIGlmICggdGhpcy5IQU5ETEVSX0ZPQ1VTICkge1xuXG4gICAgICAgICAgICB0aGlzLkhBTkRMRVJfRk9DVVMoIHRoaXMucG9zaXRpb24sIGR1cmF0aW9uLCBlYXNpbmcgKTtcbiAgICAgICAgICAgIHRoaXMub25EaXNtaXNzKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBnZW9tZXRyeSwgbWF0ZXJpYWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgbWFwIH0gPSBtYXRlcmlhbDtcblxuICAgICAgICB0aGlzLnJlbW92ZUhvdmVyRWxlbWVudCgpO1xuXG4gICAgICAgIGlmICggdGhpcy5wYXJlbnQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZSggdGhpcyApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG1hcCApIHsgbWFwLmRpc3Bvc2UoKTsgbWF0ZXJpYWwubWFwID0gbnVsbDsgfVxuICAgICAgICBpZiAoIGdlb21ldHJ5ICkgeyBnZW9tZXRyeS5kaXNwb3NlKCk7IHRoaXMuZ2VvbWV0cnkgPSBudWxsOyB9XG4gICAgICAgIGlmICggbWF0ZXJpYWwgKSB7IG1hdGVyaWFsLmRpc3Bvc2UoKTsgdGhpcy5tYXRlcmlhbCA9IG51bGw7IH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBJbmZvc3BvdCB9OyIsImltcG9ydCB7IENPTlRST0xTLCBNT0RFUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgV2lkZ2V0IGZvciBjb250cm9sc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgLSBBIGRvbUVsZW1lbnQgd2hlcmUgZGVmYXVsdCBjb250cm9sIHdpZGdldCB3aWxsIGJlIGF0dGFjaGVkIHRvXG4gKi9cbmZ1bmN0aW9uIFdpZGdldCAoIGNvbnRhaW5lciApIHtcblxuICAgIGlmICggIWNvbnRhaW5lciApIHtcblxuICAgICAgICBjb25zb2xlLndhcm4oICdQQU5PTEVOUy5XaWRnZXQ6IE5vIGNvbnRhaW5lciBzcGVjaWZpZWQnICk7XG5cbiAgICB9XG5cbiAgICBUSFJFRS5FdmVudERpc3BhdGNoZXIuY2FsbCggdGhpcyApO1xuXG4gICAgdGhpcy5ERUZBVUxUX1RSQU5TSVRJT04gID0gJ2FsbCAwLjI3cyBlYXNlJztcbiAgICB0aGlzLlRPVUNIX0VOQUJMRUQgPSAhISgoICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyApIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCk7XG4gICAgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB0aGlzLmJhckVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZnVsbHNjcmVlbkVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMudmlkZW9FbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnNldHRpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIHRoaXMubWFpbk1lbnUgPSBudWxsO1xuXG4gICAgdGhpcy5hY3RpdmVNYWluSXRlbSA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVTdWJNZW51ID0gbnVsbDtcbiAgICB0aGlzLm1hc2sgPSBudWxsO1xuXG59XG5cbldpZGdldC5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBXaWRnZXQsXG5cbiAgICAvKipcbiAgICAgKiBBZGQgY29udHJvbCBiYXJcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkQ29udHJvbEJhcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggIXRoaXMuY29udGFpbmVyICkge1xuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oICdXaWRnZXQgY29udGFpbmVyIG5vdCBzZXQnICk7IFxuICAgICAgICAgICAgcmV0dXJuOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzY29wZSA9IHRoaXMsIGJhciwgc3R5bGVUcmFuc2xhdGUsIHN0eWxlT3BhY2l0eSwgZ3JhZGllbnRTdHlsZTtcblxuICAgICAgICBncmFkaWVudFN0eWxlID0gJ2xpbmVhci1ncmFkaWVudChib3R0b20sIHJnYmEoMCwwLDAsMC4yKSwgcmdiYSgwLDAsMCwwKSknO1xuXG4gICAgICAgIGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgIGJhci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgYmFyLnN0eWxlLmhlaWdodCA9ICc0NHB4JztcbiAgICAgICAgYmFyLnN0eWxlLmZsb2F0ID0gJ2xlZnQnO1xuICAgICAgICBiYXIuc3R5bGUudHJhbnNmb3JtID0gYmFyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGJhci5zdHlsZS5tc1RyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC0xMDAlKSc7XG4gICAgICAgIGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gJy13ZWJraXQtJyArIGdyYWRpZW50U3R5bGU7XG4gICAgICAgIGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gJy1tb3otJyArIGdyYWRpZW50U3R5bGU7XG4gICAgICAgIGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gJy1vLScgKyBncmFkaWVudFN0eWxlO1xuICAgICAgICBiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctbXMtJyArIGdyYWRpZW50U3R5bGU7XG4gICAgICAgIGJhci5zdHlsZS5iYWNrZ3JvdW5kID0gZ3JhZGllbnRTdHlsZTtcbiAgICAgICAgYmFyLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTjtcbiAgICAgICAgYmFyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgIGJhci5pc0hpZGRlbiA9IGZhbHNlO1xuICAgICAgICBiYXIudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYmFyLmlzSGlkZGVuID0gIWJhci5pc0hpZGRlbjtcbiAgICAgICAgICAgIHN0eWxlVHJhbnNsYXRlID0gYmFyLmlzSGlkZGVuID8gJ3RyYW5zbGF0ZVkoMCknIDogJ3RyYW5zbGF0ZVkoLTEwMCUpJztcbiAgICAgICAgICAgIHN0eWxlT3BhY2l0eSA9IGJhci5pc0hpZGRlbiA/IDAgOiAxO1xuICAgICAgICAgICAgYmFyLnN0eWxlLnRyYW5zZm9ybSA9IGJhci5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBiYXIuc3R5bGUubXNUcmFuc2Zvcm0gPSBzdHlsZVRyYW5zbGF0ZTtcbiAgICAgICAgICAgIGJhci5zdHlsZS5vcGFjaXR5ID0gc3R5bGVPcGFjaXR5O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIE1lbnVcbiAgICAgICAgdmFyIG1lbnUgPSB0aGlzLmNyZWF0ZURlZmF1bHRNZW51KCk7XG4gICAgICAgIHRoaXMubWFpbk1lbnUgPSB0aGlzLmNyZWF0ZU1haW5NZW51KCBtZW51ICk7XG4gICAgICAgIGJhci5hcHBlbmRDaGlsZCggdGhpcy5tYWluTWVudSApO1xuXG4gICAgICAgIC8vIE1hc2tcbiAgICAgICAgdmFyIG1hc2sgPSB0aGlzLmNyZWF0ZU1hc2soKTtcbiAgICAgICAgdGhpcy5tYXNrID0gbWFzaztcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIG1hc2sgKTtcblxuICAgICAgICAvLyBEaXNwb3NlXG4gICAgICAgIGJhci5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLmZ1bGxzY3JlZW5FbGVtZW50ICkge1xuXG4gICAgICAgICAgICAgICAgYmFyLnJlbW92ZUNoaWxkKCBzY29wZS5mdWxsc2NyZWVuRWxlbWVudCApO1xuICAgICAgICAgICAgICAgIHNjb3BlLmZ1bGxzY3JlZW5FbGVtZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBzY29wZS5mdWxsc2NyZWVuRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBzY29wZS5zZXR0aW5nRWxlbWVudCApIHtcblxuICAgICAgICAgICAgICAgIGJhci5yZW1vdmVDaGlsZCggc2NvcGUuc2V0dGluZ0VsZW1lbnQgKTtcbiAgICAgICAgICAgICAgICBzY29wZS5zZXR0aW5nRWxlbWVudC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgc2NvcGUuc2V0dGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUudmlkZW9FbGVtZW50ICkge1xuXG4gICAgICAgICAgICAgICAgYmFyLnJlbW92ZUNoaWxkKCBzY29wZS52aWRlb0VsZW1lbnQgKTtcbiAgICAgICAgICAgICAgICBzY29wZS52aWRlb0VsZW1lbnQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHNjb3BlLnZpZGVvRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBiYXIgKTtcblxuICAgICAgICAvLyBNYXNrIGV2ZW50c1xuICAgICAgICB0aGlzLm1hc2suYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMuUFJFVkVOVF9FVkVOVF9IQU5ETEVSLCB0cnVlICk7XG4gICAgICAgIHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMuUFJFVkVOVF9FVkVOVF9IQU5ETEVSLCB0cnVlICk7XG4gICAgICAgIHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcbiAgICAgICAgdGhpcy5tYXNrLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBzY29wZS5tYXNrLmhpZGUoKTtcbiAgICAgICAgICAgIHNjb3BlLnNldHRpbmdFbGVtZW50LmRlYWN0aXZhdGUoKTtcblxuICAgICAgICB9LCBmYWxzZSApO1xuXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRyb2wtYmFyLXRvZ2dsZScsIGJhci50b2dnbGUgKTtcblxuICAgICAgICB0aGlzLmJhckVsZW1lbnQgPSBiYXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGRlZmF1bHQgbWVudVxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjcmVhdGVEZWZhdWx0TWVudTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzY29wZSA9IHRoaXMsIGhhbmRsZXI7XG5cbiAgICAgICAgaGFuZGxlciA9IGZ1bmN0aW9uICggbWV0aG9kLCBkYXRhICkge1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggeyBcblxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsIFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhIFxuXG4gICAgICAgICAgICAgICAgfSApOyBcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBbXG5cbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdDb250cm9sJywgXG4gICAgICAgICAgICAgICAgc3ViTWVudTogWyBcbiAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLlRPVUNIX0VOQUJMRUQgPyAnVG91Y2gnIDogJ01vdXNlJywgXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlQ29udHJvbCcsIENPTlRST0xTLk9SQklUIClcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU2Vuc29yJywgXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlQ29udHJvbCcsIENPTlRST0xTLkRFVklDRU9SSUVOVEFUSU9OICkgXG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01vZGUnLCBcbiAgICAgICAgICAgICAgICBzdWJNZW51OiBbIFxuICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdOb3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlciggJ2Rpc2FibGVFZmZlY3QnIClcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhcmRib2FyZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyKCAnZW5hYmxlRWZmZWN0JywgTU9ERVMuQ0FSREJPQVJEIClcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3RlcmVvc2NvcGljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVFZmZlY3QnLCBNT0RFUy5TVEVSRU8gKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGJ1dHRvbnMgb24gdG9wIG9mIGNvbnRyb2wgYmFyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgY29udHJvbCBidXR0b24gbmFtZSB0byBiZSBjcmVhdGVkXG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZENvbnRyb2xCdXR0b246IGZ1bmN0aW9uICggbmFtZSApIHtcblxuICAgICAgICBsZXQgZWxlbWVudDtcblxuICAgICAgICBzd2l0Y2goIG5hbWUgKSB7XG5cbiAgICAgICAgY2FzZSAnZnVsbHNjcmVlbic6XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmNyZWF0ZUZ1bGxzY3JlZW5CdXR0b24oKTtcbiAgICAgICAgICAgIHRoaXMuZnVsbHNjcmVlbkVsZW1lbnQgPSBlbGVtZW50OyBcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnc2V0dGluZyc6XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmNyZWF0ZVNldHRpbmdCdXR0b24oKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ0VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd2aWRlbyc6XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmNyZWF0ZVZpZGVvQ29udHJvbCgpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggIWVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iYXJFbGVtZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG1vZGFsIG1hc2tcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY3JlYXRlTWFzazogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIGVsZW1lbnQuc2hvdyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnQuaGlkZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIFNldHRpbmcgYnV0dG9uIHRvIHRvZ2dsZSBtZW51XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNyZWF0ZVNldHRpbmdCdXR0b246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgc2NvcGUgPSB0aGlzLCBpdGVtO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uVGFwICggZXZlbnQgKSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgc2NvcGUubWFpbk1lbnUudG9nZ2xlKCk7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5hY3RpdmF0ZWQgKSB7XG5cdFxuICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0gPSB0aGlzLmNyZWF0ZUN1c3RvbUl0ZW0oIHsgXG5cbiAgICAgICAgICAgIHN0eWxlOiB7IFxuXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiJyArIERhdGFJbWFnZS5TZXR0aW5nICsgJ1wiKScsXG4gICAgICAgICAgICAgICAgd2Via2l0VHJhbnNpdGlvbjogdGhpcy5ERUZBVUxUX1RSQU5TSVRJT04sXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogdGhpcy5ERUZBVUxUX1RSQU5TSVRJT05cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25UYXA6IG9uVGFwXG5cbiAgICAgICAgfSApO1xuXG4gICAgICAgIGl0ZW0uYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDAsMCwxLDkwZGVnKSc7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICBzY29wZS5tYXNrLnNob3coKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlM2QoMCwwLDAsMCknO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNjb3BlLm1hc2suaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm1haW5NZW51ICYmIHNjb3BlLm1haW5NZW51LnZpc2libGUgKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5tYWluTWVudS5oaWRlKCk7XG5cdFx0XHRcdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLmFjdGl2ZVN1Yk1lbnUgJiYgc2NvcGUuYWN0aXZlU3ViTWVudS52aXNpYmxlICkge1xuXG4gICAgICAgICAgICAgICAgc2NvcGUuYWN0aXZlU3ViTWVudS5oaWRlKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBzY29wZS5tYWluTWVudSAmJiBzY29wZS5tYWluTWVudS5fd2lkdGggKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5tYWluTWVudS5jaGFuZ2VTaXplKCBzY29wZS5tYWluTWVudS5fd2lkdGggKTtcbiAgICAgICAgICAgICAgICBzY29wZS5tYWluTWVudS51bnNsaWRlQWxsKCk7XG5cbiAgICAgICAgICAgIH1cblx0XHRcdFxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uYWN0aXZhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIEZ1bGxzY3JlZW4gYnV0dG9uXG4gICAgICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uIGZvciBmdWxsc2NyZWVuXG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBXaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgKi9cbiAgICBjcmVhdGVGdWxsc2NyZWVuQnV0dG9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IHNjb3BlID0gdGhpcywgaXRlbSwgaXNGdWxsc2NyZWVuID0gZmFsc2UsIHRhcFNraXBwZWQgPSB0cnVlLCBzdHlsZXNoZWV0SWQ7XG5cbiAgICAgICAgY29uc3QgeyBjb250YWluZXIgfSA9IHRoaXM7XG5cbiAgICAgICAgc3R5bGVzaGVldElkID0gJ3Bhbm9sZW5zLXN0eWxlLWFkZG9uJztcblxuICAgICAgICAvLyBEb24ndCBjcmVhdGUgYnV0dG9uIGlmIG5vIHN1cHBvcnRcbiAgICAgICAgaWYgKCAhZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQgICAgICAgJiYgXG5cdFx0XHQhZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVuYWJsZWQgJiZcblx0XHRcdCFkb2N1bWVudC5tb3pGdWxsU2NyZWVuRW5hYmxlZCAgICAmJlxuXHRcdFx0IWRvY3VtZW50Lm1zRnVsbHNjcmVlbkVuYWJsZWQgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRhcFNraXBwZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCAhaXNGdWxsc2NyZWVuICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBjb250YWluZXIucmVxdWVzdEZ1bGxzY3JlZW4gKSB7IGNvbnRhaW5lci5yZXF1ZXN0RnVsbHNjcmVlbigpOyB9XG4gICAgICAgICAgICAgICAgaWYgKCBjb250YWluZXIubXNSZXF1ZXN0RnVsbHNjcmVlbiApIHsgY29udGFpbmVyLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTsgfVxuICAgICAgICAgICAgICAgIGlmICggY29udGFpbmVyLm1velJlcXVlc3RGdWxsU2NyZWVuICkgeyBjb250YWluZXIubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTsgfVxuICAgICAgICAgICAgICAgIGlmICggY29udGFpbmVyLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuICkgeyBjb250YWluZXIud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oIEVsZW1lbnQuQUxMT1dfS0VZQk9BUkRfSU5QVVQgKTsgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpc0Z1bGxzY3JlZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBkb2N1bWVudC5leGl0RnVsbHNjcmVlbiApIHsgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTsgfVxuICAgICAgICAgICAgICAgIGlmICggZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbiApIHsgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpOyB9XG4gICAgICAgICAgICAgICAgaWYgKCBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuICkgeyBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7IH1cbiAgICAgICAgICAgICAgICBpZiAoIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuICkgeyBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbiggKTsgfVxuXG4gICAgICAgICAgICAgICAgaXNGdWxsc2NyZWVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAoIGlzRnVsbHNjcmVlbiApIFxuICAgICAgICAgICAgICAgID8gJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkxlYXZlICsgJ1wiKScgXG4gICAgICAgICAgICAgICAgOiAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuRW50ZXIgKyAnXCIpJztcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25GdWxsU2NyZWVuQ2hhbmdlICgpIHtcblxuICAgICAgICAgICAgaWYgKCB0YXBTa2lwcGVkICkge1xuXG4gICAgICAgICAgICAgICAgaXNGdWxsc2NyZWVuID0gIWlzRnVsbHNjcmVlbjsgXG5cbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICggaXNGdWxsc2NyZWVuICkgXG4gICAgICAgICAgICAgICAgICAgID8gJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkxlYXZlICsgJ1wiKScgXG4gICAgICAgICAgICAgICAgICAgIDogJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkVudGVyICsgJ1wiKSc7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBldmVudCBXaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAnb25XaW5kb3dSZXNpemUnIGZ1bmN0aW9uIGNhbGwgb24gVmlld2VyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnb25XaW5kb3dSZXNpemUnIH0gKTtcblxuICAgICAgICAgICAgdGFwU2tpcHBlZCA9IHRydWU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbFNjcmVlbkNoYW5nZSwgZmFsc2UgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG5cbiAgICAgICAgaXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSggeyBcblxuICAgICAgICAgICAgc3R5bGU6IHsgXG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCInICsgRGF0YUltYWdlLkZ1bGxzY3JlZW5FbnRlciArICdcIiknIFxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblRhcDogb25UYXBcblxuICAgICAgICB9ICk7XG5cbiAgICAgICAgLy8gQWRkIGZ1bGxzY3JlZW4gc3RseWUgaWYgbm90IGV4aXN0c1xuICAgICAgICBpZiAoICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBzdHlsZXNoZWV0SWQgKSApIHtcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3N0eWxlJyApO1xuICAgICAgICAgICAgc2hlZXQuaWQgPSBzdHlsZXNoZWV0SWQ7XG4gICAgICAgICAgICBzaGVldC5pbm5lckhUTUwgPSAnOi13ZWJraXQtZnVsbC1zY3JlZW4geyB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudCB9JztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHNoZWV0ICk7XG4gICAgICAgIH1cblx0XHRcbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHZpZGVvIGNvbnRyb2wgY29udGFpbmVyXG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH0gLSBUaGUgZG9tIGVsZW1lbnQgaWNvbiBmb3IgdmlkZW8gY29udHJvbFxuICAgICAqL1xuICAgIGNyZWF0ZVZpZGVvQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcbiAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpdGVtLnNob3cgPSBmdW5jdGlvbiAoKSB7IFxuXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uaGlkZSA9IGZ1bmN0aW9uICgpIHsgXG5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGl0ZW0uY29udHJvbEJ1dHRvbi5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgaXRlbS5jb250cm9sQnV0dG9uLnVwZGF0ZSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5jb250cm9sQnV0dG9uID0gdGhpcy5jcmVhdGVWaWRlb0NvbnRyb2xCdXR0b24oKTtcbiAgICAgICAgaXRlbS5zZWVrQmFyID0gdGhpcy5jcmVhdGVWaWRlb0NvbnRyb2xTZWVrYmFyKCk7XG5cdFx0XG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoIGl0ZW0uY29udHJvbEJ1dHRvbiApO1xuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKCBpdGVtLnNlZWtCYXIgKTtcblxuICAgICAgICBpdGVtLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoIGl0ZW0uY29udHJvbEJ1dHRvbiApO1xuICAgICAgICAgICAgaXRlbS5yZW1vdmVDaGlsZCggaXRlbS5zZWVrQmFyICk7XG5cbiAgICAgICAgICAgIGl0ZW0uY29udHJvbEJ1dHRvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICBpdGVtLmNvbnRyb2xCdXR0b24gPSBudWxsO1xuXG4gICAgICAgICAgICBpdGVtLnNlZWtCYXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgaXRlbS5zZWVrQmFyID0gbnVsbDtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLWNvbnRyb2wtc2hvdycsIGl0ZW0uc2hvdyApO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd2aWRlby1jb250cm9sLWhpZGUnLCBpdGVtLmhpZGUgKTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdmlkZW8gY29udHJvbCBidXR0b25cbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uIGZvciB2aWRlbyBjb250cm9sXG4gICAgICogQGZpcmVzIFdpZGdldCNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAqL1xuICAgIGNyZWF0ZVZpZGVvQ29udHJvbEJ1dHRvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcztcblxuICAgICAgICBmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgV2lkZ2V0I3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3RvZ2dsZVZpZGVvUGxheScgZnVuY3Rpb24gY2FsbCBvbiBWaWV3ZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd0b2dnbGVWaWRlb1BsYXknLCBkYXRhOiAhdGhpcy5wYXVzZWQgfSApO1xuXG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDtcblxuICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZUN1c3RvbUl0ZW0oIHsgXG5cbiAgICAgICAgICAgIHN0eWxlOiB7IFxuXG4gICAgICAgICAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCInICsgRGF0YUltYWdlLlZpZGVvUGxheSArICdcIiknXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uVGFwOiBvblRhcFxuXG4gICAgICAgIH0gKTtcblxuICAgICAgICBpdGVtLnBhdXNlZCA9IHRydWU7XG5cbiAgICAgICAgaXRlbS51cGRhdGUgPSBmdW5jdGlvbiAoIHBhdXNlZCApIHtcblxuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSBwYXVzZWQgIT09IHVuZGVmaW5lZCA/IHBhdXNlZCA6IHRoaXMucGF1c2VkO1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCInICsgKCB0aGlzLnBhdXNlZCBcbiAgICAgICAgICAgICAgICA/IERhdGFJbWFnZS5WaWRlb1BsYXkgXG4gICAgICAgICAgICAgICAgOiBEYXRhSW1hZ2UuVmlkZW9QYXVzZSApICsgJ1wiKSc7XG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdmlkZW8gc2Vla2JhclxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb24gZm9yIHZpZGVvIHNlZWtiYXJcbiAgICAgKiBAZmlyZXMgV2lkZ2V0I3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG4gICAgICovXG4gICAgY3JlYXRlVmlkZW9Db250cm9sU2Vla2JhcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGxldCBzY29wZSA9IHRoaXMsIGl0ZW0sIHByb2dyZXNzRWxlbWVudCwgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCxcbiAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZSwgbW91c2VYLCBwZXJjZW50YWdlTm93LCBwZXJjZW50YWdlTmV4dDtcblxuICAgICAgICBwcm9ncmVzc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggPSAnMCUnO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG4gICAgICAgIHByb2dyZXNzRWxlbWVudENvbnRyb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmZsb2F0ID0gJ3JpZ2h0JztcbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS53aWR0aCA9ICcxNHB4JztcbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS5oZWlnaHQgPSAnMTRweCc7XG4gICAgICAgIHByb2dyZXNzRWxlbWVudENvbnRyb2wuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSg3cHgsIC01cHgpJztcbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2RkZCc7XG5cbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24sIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHByb2dyZXNzRWxlbWVudENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvbk1vdXNlRG93biwgIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25Nb3VzZURvd24gKCBldmVudCApIHtcblxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcbiAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xuXHRcdFx0XG4gICAgICAgICAgICBtb3VzZVggPSBldmVudC5jbGllbnRYIHx8ICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCApO1xuXG4gICAgICAgICAgICBwZXJjZW50YWdlTm93ID0gcGFyc2VJbnQoIHByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCApIC8gMTAwO1xuXG4gICAgICAgICAgICBhZGRDb250cm9sTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblZpZGVvQ29udHJvbERyYWcgKCBldmVudCApIHtcblxuICAgICAgICAgICAgaWYoIGlzRHJhZ2dpbmcgKXtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudFggPSBldmVudC5jbGllbnRYIHx8ICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCApO1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlTmV4dCA9ICggY2xpZW50WCAtIG1vdXNlWCApIC8gaXRlbS5jbGllbnRXaWR0aDtcblxuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2VOZXh0ID0gcGVyY2VudGFnZU5vdyArIHBlcmNlbnRhZ2VOZXh0O1xuXG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZU5leHQgPSBwZXJjZW50YWdlTmV4dCA+IDEgPyAxIDogKCAoIHBlcmNlbnRhZ2VOZXh0IDwgMCApID8gMCA6IHBlcmNlbnRhZ2VOZXh0ICk7XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNldFByb2dyZXNzICggcGVyY2VudGFnZU5leHQgKTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgV2lkZ2V0I3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICdzZXRWaWRlb0N1cnJlbnRUaW1lJyBmdW5jdGlvbiBjYWxsIG9uIFZpZXdlclxuICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhIC0gUGVyY2VudGFnZSBvZiBjdXJyZW50IHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3NldFZpZGVvQ3VycmVudFRpbWUnLCBkYXRhOiBwZXJjZW50YWdlTmV4dCB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25WaWRlb0NvbnRyb2xTdG9wICggZXZlbnQgKSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJlbW92ZUNvbnRyb2xMaXN0ZW5lcnMoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkQ29udHJvbExpc3RlbmVycyAoKSB7XG5cbiAgICAgICAgICAgIHNjb3BlLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25WaWRlb0NvbnRyb2xEcmFnLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICAgICAgc2NvcGUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25WaWRlb0NvbnRyb2xTdG9wLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICAgICAgc2NvcGUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblZpZGVvQ29udHJvbERyYWcsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgICAgICBzY29wZS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgb25WaWRlb0NvbnRyb2xTdG9wLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNvbnRyb2xMaXN0ZW5lcnMgKCkge1xuXG4gICAgICAgICAgICBzY29wZS5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uVmlkZW9Db250cm9sRHJhZywgZmFsc2UgKTtcbiAgICAgICAgICAgIHNjb3BlLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uVmlkZW9Db250cm9sU3RvcCwgZmFsc2UgKTtcbiAgICAgICAgICAgIHNjb3BlLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25WaWRlb0NvbnRyb2xEcmFnLCBmYWxzZSApO1xuICAgICAgICAgICAgc2NvcGUuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVmlkZW9Db250cm9sU3RvcCwgZmFsc2UgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoIGV2ZW50LnRhcmdldCA9PT0gcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA+IDAgKVxuICAgICAgICAgICAgICAgID8gKCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICkgLyB0aGlzLmNsaWVudFdpZHRoXG4gICAgICAgICAgICAgICAgOiBldmVudC5vZmZzZXRYIC8gdGhpcy5jbGllbnRXaWR0aDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAnc2V0VmlkZW9DdXJyZW50VGltZScgZnVuY3Rpb24gY2FsbCBvbiBWaWV3ZXJcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhIC0gUGVyY2VudGFnZSBvZiBjdXJyZW50IHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdzZXRWaWRlb0N1cnJlbnRUaW1lJywgZGF0YTogcGVyY2VudGFnZSB9ICk7XG5cbiAgICAgICAgICAgIGl0ZW0uc2V0UHJvZ3Jlc3MoIGV2ZW50Lm9mZnNldFggLyB0aGlzLmNsaWVudFdpZHRoICk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBvbkRpc3Bvc2UgKCkge1xuXG4gICAgICAgICAgICByZW1vdmVDb250cm9sTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHByb2dyZXNzRWxlbWVudC5hcHBlbmRDaGlsZCggcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCApO1xuXG4gICAgICAgIGl0ZW0gPSB0aGlzLmNyZWF0ZUN1c3RvbUl0ZW0oIHtcblxuICAgICAgICAgICAgc3R5bGU6IHsgXG5cbiAgICAgICAgICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMzAlJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICc0cHgnLFxuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzIwcHgnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMTg4LDE4OCwxODgsMC44KSdcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25UYXA6IG9uVGFwLFxuICAgICAgICAgICAgb25EaXNwb3NlOiBvbkRpc3Bvc2VcblxuICAgICAgICB9ICk7XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZCggcHJvZ3Jlc3NFbGVtZW50ICk7XG5cbiAgICAgICAgaXRlbS5zZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKCBwZXJjZW50YWdlICkge1xuXG4gICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggPSBwZXJjZW50YWdlICogMTAwICsgJyUnO1xuXG4gICAgICAgIH07XHRcdFxuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXVwZGF0ZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7IFxuXG4gICAgICAgICAgICBpdGVtLnNldFByb2dyZXNzKCBldmVudC5wZXJjZW50YWdlICk7IFxuXG4gICAgICAgIH0gKTtcblxuICAgICAgICBpdGVtLnByb2dyZXNzRWxlbWVudCA9IHByb2dyZXNzRWxlbWVudDtcbiAgICAgICAgaXRlbS5wcm9ncmVzc0VsZW1lbnRDb250cm9sID0gcHJvZ3Jlc3NFbGVtZW50Q29udHJvbDtcblxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbWVudSBpdGVtXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB0aXRsZSAtIFRpdGxlIHRvIGRpc3BsYXlcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gQW4gYW5jaG9yIHRhZyBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlTWVudUl0ZW06IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzOyBcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdhJyApO1xuICAgICAgICBpdGVtLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGl0ZW0uc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICAgICAgaXRlbS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJztcbiAgICAgICAgaXRlbS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgaXRlbS5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5ERUZBVUxUX1RSQU5TSVRJT047XG5cbiAgICAgICAgaXRlbS5zbGlkZSA9IGZ1bmN0aW9uICggcmlnaHQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArICggcmlnaHQgPyAnJyA6ICctJyApICsgJzEwMCUpJztcblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0udW5zbGlkZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtLnNldEljb24gPSBmdW5jdGlvbiAoIHVybCApIHtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmljb24gKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgdXJsICsgJyknO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtLnNldFNlbGVjdGlvblRpdGxlID0gZnVuY3Rpb24gKCB0aXRsZSApIHtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLnNlbGVjdGlvbiApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uYWRkU2VsZWN0aW9uID0gZnVuY3Rpb24gKCBuYW1lICkge1xuXHRcdFx0XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5zdHlsZS5mb250U2l6ZSA9ICcxM3B4JztcbiAgICAgICAgICAgIHNlbGVjdGlvbi5zdHlsZS5mb250V2VpZ2h0ID0gJzMwMCc7XG4gICAgICAgICAgICBzZWxlY3Rpb24uc3R5bGUuZmxvYXQgPSAncmlnaHQnO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uVGl0bGUoIG5hbWUgKTtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoIHNlbGVjdGlvbiApO1xuXHRcdFx0XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uYWRkSWNvbiA9IGZ1bmN0aW9uICggdXJsID0gRGF0YUltYWdlLkNoZXZyb25SaWdodCwgbGVmdCA9IGZhbHNlLCBmbGlwID0gZmFsc2UgKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZmxvYXQgPSBsZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTdweCc7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxN3B4JztcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbICdtYXJnaW4nICsgKCBsZWZ0ID8gJ1JpZ2h0JyA6ICdMZWZ0JyApIF0gPSAnMTJweCc7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcblxuICAgICAgICAgICAgaWYgKCBmbGlwICkge1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWigxODBkZWcpJztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmljb24gPSBlbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5zZXRJY29uKCB1cmwgKTtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtLmFkZFN1Yk1lbnUgPSBmdW5jdGlvbiAoIHRpdGxlLCBpdGVtcyApIHtcblxuICAgICAgICAgICAgdGhpcy5zdWJNZW51ID0gc2NvcGUuY3JlYXRlU3ViTWVudSggdGl0bGUsIGl0ZW1zICk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFxuICAgICAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2UwZTBlMCc7XG5cbiAgICAgICAgfSwgZmFsc2UgKTtcblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmFmYWZhJztcblxuICAgICAgICB9LCBmYWxzZSApO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtZW51IGl0ZW0gaGVhZGVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB0aXRsZSAtIFRpdGxlIHRvIGRpc3BsYXlcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gQW4gYW5jaG9yIHRhZyBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlTWVudUl0ZW1IZWFkZXI6IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cbiAgICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5jcmVhdGVNZW51SXRlbSggdGl0bGUgKTtcblxuICAgICAgICBoZWFkZXIuc3R5bGUuYm9yZGVyQm90dG9tID0gJzFweCBzb2xpZCAjMzMzJztcbiAgICAgICAgaGVhZGVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAnMTVweCc7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlcjtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbWFpbiBtZW51XG4gICAgICogQHBhcmFtICB7YXJyYXl9IG1lbnVzIC0gTWVudSBhcnJheSBsaXN0XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlTWFpbk1lbnU6IGZ1bmN0aW9uICggbWVudXMgKSB7XG5cdFx0XG4gICAgICAgIGxldCBzY29wZSA9IHRoaXMsIG1lbnUgPSB0aGlzLmNyZWF0ZU1lbnUoKTtcblxuICAgICAgICBtZW51Ll93aWR0aCA9IDIwMDtcbiAgICAgICAgbWVudS5jaGFuZ2VTaXplKCBtZW51Ll93aWR0aCApO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uVGFwICggZXZlbnQgKSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgbGV0IG1haW5NZW51ID0gc2NvcGUubWFpbk1lbnUsIHN1Yk1lbnUgPSB0aGlzLnN1Yk1lbnU7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTmV4dFRpY2sgKCkge1xuXG4gICAgICAgICAgICAgICAgbWFpbk1lbnUuY2hhbmdlU2l6ZSggc3ViTWVudS5jbGllbnRXaWR0aCApO1xuICAgICAgICAgICAgICAgIHN1Yk1lbnUuc2hvdygpO1xuICAgICAgICAgICAgICAgIHN1Yk1lbnUudW5zbGlkZUFsbCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1haW5NZW51LmhpZGUoKTtcbiAgICAgICAgICAgIG1haW5NZW51LnNsaWRlQWxsKCk7XG4gICAgICAgICAgICBtYWluTWVudS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKCBzdWJNZW51ICk7XG5cbiAgICAgICAgICAgIHNjb3BlLmFjdGl2ZU1haW5JdGVtID0gdGhpcztcbiAgICAgICAgICAgIHNjb3BlLmFjdGl2ZVN1Yk1lbnUgPSBzdWJNZW51O1xuXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBvbk5leHRUaWNrICk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBtZW51cy5sZW5ndGg7IGkrKyApIHtcblxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBtZW51LmFkZEl0ZW0oIG1lbnVzWyBpIF0udGl0bGUgKTtcblxuICAgICAgICAgICAgaXRlbS5zdHlsZS5wYWRkaW5nTGVmdCA9ICcyMHB4JztcblxuICAgICAgICAgICAgaXRlbS5hZGRJY29uKClcbiAgICAgICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBvblRhcCwgZmFsc2UgKTtcblxuICAgICAgICAgICAgaWYgKCBtZW51c1sgaSBdLnN1Yk1lbnUgJiYgbWVudXNbIGkgXS5zdWJNZW51Lmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSBtZW51c1sgaSBdLnN1Yk1lbnVbIDAgXS50aXRsZTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkU2VsZWN0aW9uKCB0aXRsZSApXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTdWJNZW51KCBtZW51c1sgaSBdLnRpdGxlLCBtZW51c1sgaSBdLnN1Yk1lbnUgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVudTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgc3ViIG1lbnVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgLSBTdWIgbWVudSB0aXRsZVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gSXRlbSBhcnJheSBsaXN0XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlU3ViTWVudTogZnVuY3Rpb24gKCB0aXRsZSwgaXRlbXMgKSB7XG5cbiAgICAgICAgbGV0IHNjb3BlID0gdGhpcywgbWVudSwgc3ViTWVudSA9IHRoaXMuY3JlYXRlTWVudSgpO1xuXG4gICAgICAgIHN1Yk1lbnUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgc3ViTWVudS5hY3RpdmVJdGVtID0gbnVsbDtcblxuICAgICAgICBmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIG1lbnUgPSBzY29wZS5tYWluTWVudTtcbiAgICAgICAgICAgIG1lbnUuY2hhbmdlU2l6ZSggbWVudS5fd2lkdGggKTtcbiAgICAgICAgICAgIG1lbnUudW5zbGlkZUFsbCgpO1xuICAgICAgICAgICAgbWVudS5zaG93KCk7XG4gICAgICAgICAgICBzdWJNZW51LnNsaWRlQWxsKCB0cnVlICk7XG4gICAgICAgICAgICBzdWJNZW51LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLnR5cGUgIT09ICdoZWFkZXInICkge1xuXG4gICAgICAgICAgICAgICAgc3ViTWVudS5zZXRBY3RpdmVJdGVtKCB0aGlzICk7XG4gICAgICAgICAgICAgICAgc2NvcGUuYWN0aXZlTWFpbkl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUoIHRoaXMudGV4dENvbnRlbnQgKTtcblxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5oYW5kbGVyICkgeyB0aGlzLmhhbmRsZXIoKTsgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHN1Yk1lbnUuYWRkSGVhZGVyKCB0aXRsZSApLmFkZEljb24oIHVuZGVmaW5lZCwgdHJ1ZSwgdHJ1ZSApLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKysgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzdWJNZW51LmFkZEl0ZW0oIGl0ZW1zWyBpIF0udGl0bGUgKTtcblxuICAgICAgICAgICAgaXRlbS5zdHlsZS5mb250V2VpZ2h0ID0gMzAwO1xuICAgICAgICAgICAgaXRlbS5oYW5kbGVyID0gaXRlbXNbIGkgXS5oYW5kbGVyO1xuICAgICAgICAgICAgaXRlbS5hZGRJY29uKCAnICcsIHRydWUgKTtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBvblRhcCwgZmFsc2UgKTtcblxuICAgICAgICAgICAgaWYgKCAhc3ViTWVudS5hY3RpdmVJdGVtICkge1xuXG4gICAgICAgICAgICAgICAgc3ViTWVudS5zZXRBY3RpdmVJdGVtKCBpdGVtICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgc3ViTWVudS5zbGlkZUFsbCggdHJ1ZSApO1xuXG4gICAgICAgIHJldHVybiBzdWJNZW51O1xuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgZ2VuZXJhbCBtZW51XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlTWVudTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcztcbiAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG1lbnUuc3R5bGU7XG5cbiAgICAgICAgc3R5bGUucGFkZGluZyA9ICc1cHggMCc7XG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgc3R5bGUuYm90dG9tID0gJzEwMCUnO1xuICAgICAgICBzdHlsZS5yaWdodCA9ICcxNHB4JztcbiAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmYWZhZmEnO1xuICAgICAgICBzdHlsZS5mb250RmFtaWx5ID0gJ0hlbHZldGljYSBOZXVlJztcbiAgICAgICAgc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIHN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTJwdCByZ2JhKDAsMCwwLDAuMjUpJztcbiAgICAgICAgc3R5bGUuYm9yZGVyUmFkaXVzID0gJzJweCc7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIHN0eWxlLndpbGxDaGFuZ2UgPSAnd2lkdGgsIGhlaWdodCwgb3BhY2l0eSc7XG4gICAgICAgIHN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgIHN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTjtcblxuICAgICAgICBtZW51LnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICBtZW51LmNoYW5nZVNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cbiAgICAgICAgICAgIGlmICggd2lkdGggKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggaGVpZ2h0ICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbWVudS5oaWRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIG1lbnUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMudmlzaWJsZSApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIG1lbnUuc2xpZGVBbGwgPSBmdW5jdGlvbiAoIHJpZ2h0ICkge1xuXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBtZW51LmNoaWxkcmVuLmxlbmd0aDsgaSsrICl7XG5cbiAgICAgICAgICAgICAgICBpZiAoIG1lbnUuY2hpbGRyZW5bIGkgXS5zbGlkZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBtZW51LmNoaWxkcmVuWyBpIF0uc2xpZGUoIHJpZ2h0ICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIG1lbnUudW5zbGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbWVudS5jaGlsZHJlbi5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgaWYgKCBtZW51LmNoaWxkcmVuWyBpIF0udW5zbGlkZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBtZW51LmNoaWxkcmVuWyBpIF0udW5zbGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LmFkZEhlYWRlciA9IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHNjb3BlLmNyZWF0ZU1lbnVJdGVtSGVhZGVyKCB0aXRsZSApO1xuICAgICAgICAgICAgaGVhZGVyLnR5cGUgPSAnaGVhZGVyJztcblxuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCggaGVhZGVyICk7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXI7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LmFkZEl0ZW0gPSBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gc2NvcGUuY3JlYXRlTWVudUl0ZW0oIHRpdGxlICk7XG4gICAgICAgICAgICBpdGVtLnR5cGUgPSAnaXRlbSc7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoIGl0ZW0gKTtcblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LnNldEFjdGl2ZUl0ZW0gPSBmdW5jdGlvbiAoIGl0ZW0gKSB7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5hY3RpdmVJdGVtICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldEljb24oICcgJyApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uc2V0SWNvbiggRGF0YUltYWdlLkNoZWNrICk7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcbiAgICAgICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblxuICAgICAgICByZXR1cm4gbWVudTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgY3VzdG9tIGl0ZW0gZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb25cbiAgICAgKi9cbiAgICBjcmVhdGVDdXN0b21JdGVtOiBmdW5jdGlvbiAoIG9wdGlvbnMgPSB7fSApIHtcblxuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBvcHRpb25zLmVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG4gICAgICAgIGNvbnN0IHsgb25EaXNwb3NlIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIGl0ZW0uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICBpdGVtLnN0eWxlLmZsb2F0ID0gJ3JpZ2h0JztcbiAgICAgICAgaXRlbS5zdHlsZS53aWR0aCA9ICc0NHB4JztcbiAgICAgICAgaXRlbS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNjAlJztcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VXNlclNlbGVjdCA9IFxuXHRcdGl0ZW0uc3R5bGUuTW96VXNlclNlbGVjdCA9IFxuXHRcdGl0ZW0uc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcbiAgICAgICAgaXRlbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcblxuICAgICAgICAvLyBXaGl0ZSBnbG93IG9uIGljb25cbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZmlsdGVyID0gXG5cdFx0XHRpdGVtLnN0eWxlLndlYmtpdEZpbHRlciA9ICdkcm9wLXNoYWRvdygwIDAgNXB4IHJnYmEoMjU1LDI1NSwyNTUsMSkpJztcbiAgICAgICAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZmlsdGVyID0gXG5cdFx0XHRpdGVtLnN0eWxlLndlYmtpdEZpbHRlciA9ICcnO1xuICAgICAgICB9LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgdGhpcy5tZXJnZVN0eWxlT3B0aW9ucyggaXRlbSwgb3B0aW9ucy5zdHlsZSApO1xuXG4gICAgICAgIGlmICggb3B0aW9ucy5vblRhcCApIHtcblxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9wdGlvbnMub25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9wdGlvbnMub25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgICAgIGlmICggb25EaXNwb3NlICkgeyBvcHRpb25zLm9uRGlzcG9zZSgpOyB9XG5cbiAgICAgICAgfTtcblx0XHRcbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgaXRlbSBjc3Mgc3R5bGVcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGJlIG1lcmdlZCB3aXRoIHN0eWxlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIHN0eWxlIG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gVGhlIHNhbWUgZWxlbWVudCB3aXRoIG1lcmdlZCBzdHlsZXNcbiAgICAgKi9cbiAgICBtZXJnZVN0eWxlT3B0aW9uczogZnVuY3Rpb24gKCBlbGVtZW50LCBvcHRpb25zID0ge30gKSB7XG5cbiAgICAgICAgZm9yICggbGV0IHByb3BlcnR5IGluIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCBwcm9wZXJ0eSApICkge1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVsgcHJvcGVydHkgXSA9IG9wdGlvbnNbIHByb3BlcnR5IF07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB3aWRnZXRzIGJ5IGRldGFjaGluZyBkb20gZWxlbWVudHMgZnJvbSBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5iYXJFbGVtZW50ICkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQoIHRoaXMuYmFyRWxlbWVudCApO1xuICAgICAgICAgICAgdGhpcy5iYXJFbGVtZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuYmFyRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXHRcbn0gKTtcblxuZXhwb3J0IHsgV2lkZ2V0IH07IiwiaW1wb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcblxuXG4vKipcbiAqIEBjbGFzc2Rlc2MgQmFzZSBQYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1RIUkVFLkdlb21ldHJ5fSBnZW9tZXRyeSAtIFRoZSBnZW9tZXRyeSBmb3IgdGhpcyBwYW5vcmFtYVxuICogQHBhcmFtIHtUSFJFRS5NYXRlcmlhbH0gbWF0ZXJpYWwgLSBUaGUgbWF0ZXJpYWwgZm9yIHRoaXMgcGFub3JhbWFcbiAqL1xuZnVuY3Rpb24gUGFub3JhbWEgKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKSB7XG5cbiAgICBUSFJFRS5NZXNoLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG4gICAgdGhpcy50eXBlID0gJ3Bhbm9yYW1hJztcblxuICAgIHRoaXMuSW1hZ2VRdWFsaXR5TG93ID0gMTtcbiAgICB0aGlzLkltYWdlUXVhbGl0eUZhaXIgPSAyO1xuICAgIHRoaXMuSW1hZ2VRdWFsaXR5TWVkaXVtID0gMztcbiAgICB0aGlzLkltYWdlUXVhbGl0eUhpZ2ggPSA0O1xuICAgIHRoaXMuSW1hZ2VRdWFsaXR5U3VwZXJIaWdoID0gNTtcblxuICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSAxMDAwO1xuXG4gICAgdGhpcy5kZWZhdWx0SW5mb3Nwb3RTaXplID0gMzUwO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5saW5rZWRTcG90cyA9IFtdO1xuXG4gICAgdGhpcy5pc0luZm9zcG90VmlzaWJsZSA9IGZhbHNlO1xuXHRcbiAgICB0aGlzLmxpbmtpbmdJbWFnZVVSTCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxpbmtpbmdJbWFnZVNjYWxlID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5tYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgdGhpcy5tYXRlcmlhbC5vcGFjaXR5ID0gMDtcblxuICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcbiAgICB0aGlzLnJlbmRlck9yZGVyID0gLTE7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbmZvc3BvdEFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcyApLnRvKCB7fSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbiAvIDIgKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzLmZhZGVJbi5iaW5kKCB0aGlzICkgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1jb250YWluZXInLCB0aGlzLnNldENvbnRhaW5lci5iaW5kKCB0aGlzICkgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMub25DbGljay5iaW5kKCB0aGlzICkgKTtcblxuICAgIHRoaXMuc2V0dXBUcmFuc2l0aW9ucygpO1xuXG59XG5cblBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLk1lc2gucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBQYW5vcmFtYSxcblxuICAgIC8qKlxuICAgICAqIEFkZGluZyBhbiBvYmplY3RcbiAgICAgKiBUbyBjb3VudGVyIHRoZSBzY2FsZS54ID0gLTEsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGQgYW4gXG4gICAgICogZW1wdHkgb2JqZWN0IHdpdGggaW52ZXJ0ZWQgc2NhbGUgb24geFxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7VEhSRUUuT2JqZWN0M0R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gYmUgYWRkZWRcbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgIGxldCBpbnZlcnRlZE9iamVjdDtcblxuICAgICAgICBpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAxICkge1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICsrICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoIGFyZ3VtZW50c1sgaSBdICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluIGNhc2Ugb2YgaW5mb3Nwb3RzXG4gICAgICAgIGlmICggb2JqZWN0IGluc3RhbmNlb2YgSW5mb3Nwb3QgKSB7XG5cbiAgICAgICAgICAgIGludmVydGVkT2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBpZiAoIG9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250YWluZXIgfSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRhaW5lciApIHsgb2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIGNvbnRhaW5lciB9ICk7IH1cblx0XHRcdFx0XG4gICAgICAgICAgICAgICAgb2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLWluZm9zcG90LWZvY3VzJywgbWV0aG9kOiBmdW5jdGlvbiAoIHZlY3RvciwgZHVyYXRpb24sIGVhc2luZyApIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSW5mb3Nwb3QgZm9jdXMgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtIFZpZXdlciBmdW5jdGlvbiBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7Kn0gZGF0YSAtIFRoZSBhcmd1bWVudCB0byBiZSBwYXNzZWQgaW50byB0aGUgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndHdlZW5Db250cm9sQ2VudGVyJywgZGF0YTogWyB2ZWN0b3IsIGR1cmF0aW9uLCBlYXNpbmcgXSB9ICk7XG5cblxuICAgICAgICAgICAgICAgIH0uYmluZCggdGhpcyApIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBDb3VudGVyIHNjYWxlLnggPSAtMSBlZmZlY3RcbiAgICAgICAgICAgIGludmVydGVkT2JqZWN0ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgICAgICBpbnZlcnRlZE9iamVjdC5zY2FsZS54ID0gLTE7XG4gICAgICAgICAgICBpbnZlcnRlZE9iamVjdC5zY2FsZVBsYWNlSG9sZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGludmVydGVkT2JqZWN0LmFkZCggb2JqZWN0ICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIFRIUkVFLk9iamVjdDNELnByb3RvdHlwZS5hZGQuY2FsbCggdGhpcywgaW52ZXJ0ZWRPYmplY3QgKTtcblxuICAgIH0sXG5cbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5vbkxvYWQoKTtcblx0XHRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgLSBDbGljayBldmVudFxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBJbmZvc3BvdCNkaXNtaXNzXG4gICAgICovXG4gICAgb25DbGljazogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIGV2ZW50LmludGVyc2VjdHMgJiYgZXZlbnQuaW50ZXJzZWN0cy5sZW5ndGggPT09IDAgKSB7XG5cbiAgICAgICAgICAgIHRoaXMudHJhdmVyc2UoIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGltaXNzIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgSW5mb3Nwb3QjZGlzbWlzc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNtaXNzJyB9ICk7XG5cbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGNvbnRhaW5lciBvZiB0aGlzIHBhbm9yYW1hIFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8b2JqZWN0fSBkYXRhIC0gRGF0YSB3aXRoIGNvbnRhaW5lciBpbmZvcm1hdGlvblxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBJbmZvc3BvdCNwYW5vbGVucy1jb250YWluZXJcbiAgICAgKi9cbiAgICBzZXRDb250YWluZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcblxuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmICggZGF0YSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICkge1xuXG4gICAgICAgICAgICBjb250YWluZXIgPSBkYXRhO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGRhdGEgJiYgZGF0YS5jb250YWluZXIgKSB7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRhdGEuY29udGFpbmVyO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGNvbnRhaW5lciApIHtcblxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKCBmdW5jdGlvbiAoIGNoaWxkICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZCBpbnN0YW5jZW9mIEluZm9zcG90ICYmIGNoaWxkLmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNldCBjb250YWluZXIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAgICAgICAgICogQGV2ZW50IEluZm9zcG90I3Bhbm9sZW5zLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBjb250YWluZXIgLSBUaGUgY29udGFpbmVyIG9mIHRoaXMgcGFub3JhbWFcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIGNvbnRhaW5lcjogY29udGFpbmVyIH0gKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHBhbm9yYW1hIGlzIGxvYWRlZFxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNsb2FkXG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb2FkIHBhbm9yYW1hIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNsb2FkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xvYWQnIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gcGFub3JhbWEgaXMgaW4gcHJvZ3Jlc3NcbiAgICAgKiBAbWVtYmVyT2YgUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgUGFub3JhbWEjcHJvZ3Jlc3NcbiAgICAgKi9cbiAgICBvblByb2dyZXNzOiBmdW5jdGlvbiAoIHByb2dyZXNzICkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb2FkaW5nIHBhbm9yYW1hIHByb2dyZXNzIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNwcm9ncmVzc1xuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gcHJvZ3Jlc3MgLSBUaGUgcHJvZ3Jlc3Mgb2JqZWN0IGNvbnRhaW5pbmcgbG9hZGVkIGFuZCB0b3RhbCBhbW91bnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJvZ3Jlc3MnLCBwcm9ncmVzczogcHJvZ3Jlc3MgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBwYW5vcmFtYSBsb2FkaW5nIGhhcyBlcnJvclxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNlcnJvclxuICAgICAqL1xuICAgIG9uRXJyb3I6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTG9hZGluZyBwYW5vcmFtYSBlcnJvciBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjZXJyb3JcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZXJyb3InIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgem9vbSBsZXZlbCBiYXNlZCBvbiB3aW5kb3cgd2lkdGhcbiAgICAgKiBAbWVtYmVyT2YgUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHpvb20gbGV2ZWwgaW5kaWNhdGluZyBpbWFnZSBxdWFsaXR5XG4gICAgICovXG4gICAgZ2V0Wm9vbUxldmVsOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IHpvb21MZXZlbDtcblxuICAgICAgICBpZiAoIHdpbmRvdy5pbm5lcldpZHRoIDw9IDgwMCApIHtcblxuICAgICAgICAgICAgem9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlGYWlyO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHdpbmRvdy5pbm5lcldpZHRoID4gODAwICYmICB3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMjgwICkge1xuXG4gICAgICAgICAgICB6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eU1lZGl1bTtcblxuICAgICAgICB9IGVsc2UgaWYgKCB3aW5kb3cuaW5uZXJXaWR0aCA+IDEyODAgJiYgd2luZG93LmlubmVyV2lkdGggPD0gMTkyMCApIHtcblxuICAgICAgICAgICAgem9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlIaWdoO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHdpbmRvdy5pbm5lcldpZHRoID4gMTkyMCApIHtcblxuICAgICAgICAgICAgem9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlTdXBlckhpZ2g7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgem9vbUxldmVsID0gdGhpcy5JbWFnZVF1YWxpdHlMb3c7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB6b29tTGV2ZWw7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRleHR1cmUgb2YgYSBwYW5vcmFtYVxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7VEhSRUUuVGV4dHVyZX0gdGV4dHVyZSAtIFRleHR1cmUgdG8gYmUgdXBkYXRlZFxuICAgICAqL1xuICAgIHVwZGF0ZVRleHR1cmU6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsLm1hcCA9IHRleHR1cmU7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB2aXNpYmlsaXR5IG9mIGluZm9zcG90cyBpbiB0aGlzIHBhbm9yYW1hXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gaXNWaXNpYmxlIC0gVmlzaWJpbGl0eSBvZiBpbmZvc3BvdHNcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgaW4gbWlsbGlzZWNvbmRzIHRvIGNoYW5nZSB2aXNpYmlsaXR5XG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFBhbm9yYW1hI2luZm9zcG90LWFuaW1hdGlvbi1jb21wbGV0ZVxuICAgICAqL1xuICAgIHRvZ2dsZUluZm9zcG90VmlzaWJpbGl0eTogZnVuY3Rpb24gKCBpc1Zpc2libGUsIGRlbGF5ICkge1xuXG4gICAgICAgIGRlbGF5ID0gKCBkZWxheSAhPT0gdW5kZWZpbmVkICkgPyBkZWxheSA6IDA7XG5cbiAgICAgICAgY29uc3QgdmlzaWJsZSA9ICggaXNWaXNpYmxlICE9PSB1bmRlZmluZWQgKSA/IGlzVmlzaWJsZSA6ICggdGhpcy5pc0luZm9zcG90VmlzaWJsZSA/IGZhbHNlIDogdHJ1ZSApO1xuXG4gICAgICAgIHRoaXMudHJhdmVyc2UoIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgICAgICBpZiAoIG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCB2aXNpYmxlICkge1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5zaG93KCBkZWxheSApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuaGlkZSggZGVsYXkgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gKTtcblxuICAgICAgICB0aGlzLmlzSW5mb3Nwb3RWaXNpYmxlID0gdmlzaWJsZTtcblxuICAgICAgICAvLyBBbmltYXRpb24gY29tcGxldGUgZXZlbnRcbiAgICAgICAgdGhpcy5pbmZvc3BvdEFuaW1hdGlvbi5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29tcGxldGUgdG9nZ2xpbmcgaW5mb3Nwb3QgdmlzaWJpbGl0eVxuICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2luZm9zcG90LWFuaW1hdGlvbi1jb21wbGV0ZVxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnaW5mb3Nwb3QtYW5pbWF0aW9uLWNvbXBsZXRlJywgdmlzaWJsZTogdmlzaWJsZSB9ICk7XG5cbiAgICAgICAgfS5iaW5kKCB0aGlzICkgKS5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBpbWFnZSBvZiB0aGlzIHBhbm9yYW1hJ3MgbGlua2luZyBpbmZvc3BvdFxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgICAtIFVybCB0byB0aGUgaW1hZ2UgYXNzZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGUgLSBTY2FsZSBmYWN0b3Igb2YgdGhlIGluZm9zcG90XG4gICAgICovXG4gICAgc2V0TGlua2luZ0ltYWdlOiBmdW5jdGlvbiAoIHVybCwgc2NhbGUgKSB7XG5cbiAgICAgICAgdGhpcy5saW5raW5nSW1hZ2VVUkwgPSB1cmw7XG4gICAgICAgIHRoaXMubGlua2luZ0ltYWdlU2NhbGUgPSBzY2FsZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMaW5rIG9uZS13YXkgcGFub3JhbWFcbiAgICAgKiBAcGFyYW0gIHtQYW5vcmFtYX0gcGFubyAgLSBUaGUgcGFub3JhbWEgdG8gYmUgbGlua2VkIHRvXG4gICAgICogQHBhcmFtICB7VEhSRUUuVmVjdG9yM30gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gb2YgaW5mb3Nwb3Qgd2hpY2ggbmF2aWdhdGVzIHRvIHRoZSBwYW5vXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSBbaW1hZ2VTY2FsZT0zMDBdIC0gSW1hZ2Ugc2NhbGUgb2YgbGlua2VkIGluZm9zcG90XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbaW1hZ2VTcmM9RGF0YUltYWdlLkFycm93XSAtIFRoZSBpbWFnZSBzb3VyY2Ugb2YgbGlua2VkIGluZm9zcG90XG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgbGluazogZnVuY3Rpb24gKCBwYW5vLCBwb3NpdGlvbiwgaW1hZ2VTY2FsZSwgaW1hZ2VTcmMgKSB7XG5cbiAgICAgICAgbGV0IHNjYWxlLCBpbWc7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoICFwb3NpdGlvbiApIHtcblxuICAgICAgICAgICAgY29uc29sZS53YXJuKCAnUGxlYXNlIHNwZWNpZnkgaW5mb3Nwb3QgcG9zaXRpb24gZm9yIGxpbmtpbmcnICk7XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5mb3Nwb3Qgc2NhbGVcbiAgICAgICAgaWYgKCBpbWFnZVNjYWxlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlID0gaW1hZ2VTY2FsZTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBwYW5vLmxpbmtpbmdJbWFnZVNjYWxlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlID0gcGFuby5saW5raW5nSW1hZ2VTY2FsZTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzY2FsZSA9IDMwMDtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJbmZvc3BvdCBpbWFnZVxuICAgICAgICBpZiAoIGltYWdlU3JjICkge1xuXG4gICAgICAgICAgICBpbWcgPSBpbWFnZVNyYztcblxuICAgICAgICB9IGVsc2UgaWYgKCBwYW5vLmxpbmtpbmdJbWFnZVVSTCApIHtcblxuICAgICAgICAgICAgaW1nID0gcGFuby5saW5raW5nSW1hZ2VVUkw7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaW1nID0gRGF0YUltYWdlLkFycm93O1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGVzIGEgbmV3IGluZm9zcG90XG4gICAgICAgIGNvbnN0IHNwb3QgPSBuZXcgSW5mb3Nwb3QoIHNjYWxlLCBpbWcgKTtcbiAgICAgICAgc3BvdC5wb3NpdGlvbi5jb3B5KCBwb3NpdGlvbiApO1xuICAgICAgICBzcG90LnRvUGFub3JhbWEgPSBwYW5vO1xuICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtIFZpZXdlciBmdW5jdGlvbiBuYW1lXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgeyp9IGRhdGEgLSBUaGUgYXJndW1lbnQgdG8gYmUgcGFzc2VkIGludG8gdGhlIG1ldGhvZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnc2V0UGFub3JhbWEnLCBkYXRhOiBwYW5vIH0gKTtcblxuICAgICAgICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIHRoaXMubGlua2VkU3BvdHMucHVzaCggc3BvdCApO1xuXG4gICAgICAgIHRoaXMuYWRkKCBzcG90ICk7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IDA7XHRcblxuICAgIH0sXG5cbiAgICBzZXR1cFRyYW5zaXRpb25zOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5mYWRlSW5BbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMubWF0ZXJpYWwgKVxuICAgICAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0IClcbiAgICAgICAgICAgIC5vblN0YXJ0KCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubWF0ZXJpYWwudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBFbnRlciBwYW5vcmFtYSBmYWRlIGluIHN0YXJ0IGV2ZW50XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2VudGVyLWZhZGUtc3RhcnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyLWZhZGUtc3RhcnQnIH0gKTtcblxuICAgICAgICAgICAgfS5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB0aGlzLmZhZGVPdXRBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMubWF0ZXJpYWwgKVxuICAgICAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0IClcbiAgICAgICAgICAgIC5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm1hdGVyaWFsLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogTGVhdmUgcGFub3JhbWEgY29tcGxldGUgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjbGVhdmUtY29tcGxldGVcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlLWNvbXBsZXRlJyB9ICk7XG5cbiAgICAgICAgICAgIH0uYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgdGhpcy5lbnRlclRyYW5zaXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMgKVxuICAgICAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0IClcbiAgICAgICAgICAgIC5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBFbnRlciBwYW5vcmFtYSBhbmQgYW5pbWF0aW9uIGNvbXBsZXRlIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2VudGVyLWNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1jb21wbGV0ZScgfSApO1xuXG4gICAgICAgICAgICB9LmJpbmQgKCB0aGlzICkgKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5sZWF2ZVRyYW5zaXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIHRoaXMgKVxuICAgICAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0ICk7XG5cbiAgICB9LFxuXG4gICAgb25GYWRlQW5pbWF0aW9uVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgYWxwaGEgPSB0aGlzLm1hdGVyaWFsLm9wYWNpdHk7XG4gICAgICAgIGNvbnN0IHsgdW5pZm9ybXMgfSA9IHRoaXMubWF0ZXJpYWw7XG5cbiAgICAgICAgaWYgKCB1bmlmb3JtcyAmJiB1bmlmb3Jtcy5vcGFjaXR5ICkge1xuICAgICAgICAgICAgdW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IGFscGhhO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgZmFkaW5nIGluIGFuaW1hdGlvblxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNlbnRlci1mYWRlLWNvbXBsZXRlXG4gICAgICovXG4gICAgZmFkZUluOiBmdW5jdGlvbiAoIGR1cmF0aW9uICkge1xuXG4gICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gPj0gMCA/IGR1cmF0aW9uIDogdGhpcy5hbmltYXRpb25EdXJhdGlvbjtcblxuICAgICAgICB0aGlzLmZhZGVPdXRBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmZhZGVJbkFuaW1hdGlvblxuICAgICAgICAgICAgLnRvKCB7IG9wYWNpdHk6IDEgfSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLm9uVXBkYXRlKCB0aGlzLm9uRmFkZUFuaW1hdGlvblVwZGF0ZS5iaW5kKCB0aGlzICkgKVxuICAgICAgICAgICAgLm9uQ29tcGxldGUoIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSW5mb3Nwb3RWaXNpYmlsaXR5KCB0cnVlLCBkdXJhdGlvbiAvIDIgKTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEVudGVyIHBhbm9yYW1hIGZhZGUgY29tcGxldGUgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjZW50ZXItZmFkZS1jb21wbGV0ZVxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9IFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZW50ZXItZmFkZS1jb21wbGV0ZScgfSApO1x0XHRcdFxuXG4gICAgICAgICAgICB9LmJpbmQoIHRoaXMgKSApXG4gICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBmYWRpbmcgb3V0IGFuaW1hdGlvblxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZhZGVPdXQ6IGZ1bmN0aW9uICggZHVyYXRpb24gKSB7XG5cbiAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiA+PSAwID8gZHVyYXRpb24gOiB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uO1xuXG4gICAgICAgIHRoaXMuZmFkZUluQW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy5mYWRlT3V0QW5pbWF0aW9uXG4gICAgICAgICAgICAudG8oIHsgb3BhY2l0eTogMCB9LCBkdXJhdGlvbiApXG4gICAgICAgICAgICAub25VcGRhdGUoIHRoaXMub25GYWRlQW5pbWF0aW9uVXBkYXRlLmJpbmQoIHRoaXMgKSApXG4gICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gZW50ZXJpbmcgYSBwYW5vcmFtYSBcbiAgICAgKiBAbWVtYmVyT2YgUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgUGFub3JhbWEjZW50ZXJcbiAgICAgKiBAZmlyZXMgUGFub3JhbWEjZW50ZXItc3RhcnRcbiAgICAgKi9cbiAgICBvbkVudGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uO1xuXG4gICAgICAgIHRoaXMubGVhdmVUcmFuc2l0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy5lbnRlclRyYW5zaXRpb25cbiAgICAgICAgICAgIC50bygge30sIGR1cmF0aW9uIClcbiAgICAgICAgICAgIC5vblN0YXJ0KCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBFbnRlciBwYW5vcmFtYSBhbmQgYW5pbWF0aW9uIHN0YXJ0aW5nIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2VudGVyLXN0YXJ0XG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1zdGFydCcgfSApO1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMubG9hZGVkICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFkZUluKCBkdXJhdGlvbiApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcblxuICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0XG4gICAgICAgICAgICB9LmJpbmQoIHRoaXMgKSApXG4gICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW50ZXIgcGFub3JhbWEgZXZlbnRcbiAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2VudGVyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9IFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlcicgfSApO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggY2hpbGQgPT4ge1xuXG4gICAgICAgICAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vcmFtYS1lbnRlcicgfSApO1xuXG4gICAgICAgIH0gKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIGxlYXZpbmcgYSBwYW5vcmFtYVxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNsZWF2ZVxuICAgICAqL1xuICAgIG9uTGVhdmU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuYW5pbWF0aW9uRHVyYXRpb247XG5cbiAgICAgICAgdGhpcy5lbnRlclRyYW5zaXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmxlYXZlVHJhbnNpdGlvblxuICAgICAgICAgICAgLnRvKCB7fSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLm9uU3RhcnQoIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExlYXZlIHBhbm9yYW1hIGFuZCBhbmltYXRpb24gc3RhcnRpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjbGVhdmUtc3RhcnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlLXN0YXJ0JyB9ICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQoIGR1cmF0aW9uICk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVJbmZvc3BvdFZpc2liaWxpdHkoIGZhbHNlICk7XG5cbiAgICAgICAgICAgIH0uYmluZCggdGhpcyApIClcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMZWF2ZSBwYW5vcmFtYSBldmVudFxuICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjbGVhdmVcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlJyB9ICk7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKCBjaGlsZCA9PiB7XG5cbiAgICAgICAgICAgIGNoaWxkLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9yYW1hLWxlYXZlJyB9ICk7XG5cbiAgICAgICAgfSApO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBwYW5vcmFtYVxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmluZm9zcG90QW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy5mYWRlSW5BbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmZhZGVPdXRBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmVudGVyVHJhbnNpdGlvbi5zdG9wKCk7XG4gICAgICAgIHRoaXMubGVhdmVUcmFuc2l0aW9uLnN0b3AoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT24gcGFub3JhbWEgZGlzcG9zZSBoYW5kbGVyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gVmlld2VyIGZ1bmN0aW9uIG5hbWVcbiAgICAgICAgICogQHByb3BlcnR5IHsqfSBkYXRhIC0gVGhlIGFyZ3VtZW50IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZXRob2RcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblBhbm9yYW1hRGlzcG9zZScsIGRhdGE6IHRoaXMgfSApO1xuXG4gICAgICAgIC8vIHJlY3Vyc2l2ZSBkaXNwb3NhbCBvbiAzZCBvYmplY3RzXG4gICAgICAgIGZ1bmN0aW9uIHJlY3Vyc2l2ZURpc3Bvc2UgKCBvYmplY3QgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgZ2VvbWV0cnksIG1hdGVyaWFsIH0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICkge1xuXG4gICAgICAgICAgICAgICAgcmVjdXJzaXZlRGlzcG9zZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJlbW92ZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5kaXNwb3NlKCk7XG5cbiAgICAgICAgICAgIH1cblx0XHRcdFxuICAgICAgICAgICAgaWYgKCBnZW9tZXRyeSApIHsgZ2VvbWV0cnkuZGlzcG9zZSgpOyBvYmplY3QuZ2VvbWV0cnkgPSBudWxsOyB9XG4gICAgICAgICAgICBpZiAoIG1hdGVyaWFsICkgeyBtYXRlcmlhbC5kaXNwb3NlKCk7IG9iamVjdC5tYXRlcmlhbCA9IG51bGw7IH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmVjdXJzaXZlRGlzcG9zZSggdGhpcyApO1xuXG4gICAgICAgIGlmICggdGhpcy5wYXJlbnQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZSggdGhpcyApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBQYW5vcmFtYSB9OyIsImltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9QYW5vcmFtYSc7XG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9UZXh0dXJlTG9hZGVyJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEVxdWlyZWN0YW5ndWxhciBiYXNlZCBpbWFnZSBwYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSBJbWFnZSB1cmwgb3IgSFRNTEltYWdlRWxlbWVudFxuICovXG5mdW5jdGlvbiBJbWFnZVBhbm9yYW1hICggaW1hZ2UsIF9nZW9tZXRyeSwgX21hdGVyaWFsICkge1xuXG4gICAgY29uc3QgcmFkaXVzID0gNTAwMDtcbiAgICBjb25zdCBnZW9tZXRyeSA9IF9nZW9tZXRyeSB8fCBuZXcgVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkoIHJhZGl1cywgNjAsIDQwICk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBfbWF0ZXJpYWwgfHwgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IG9wYWNpdHk6IDAsIHRyYW5zcGFyZW50OiB0cnVlIH0gKTtcblxuICAgIFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG4gICAgdGhpcy5zcmMgPSBpbWFnZTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcblxufVxuXG5JbWFnZVBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogSW1hZ2VQYW5vcmFtYSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgaW1hZ2UgYXNzZXRcbiAgICAgKiBAcGFyYW0gIHsqfSBzcmMgLSBVcmwgb3IgaW1hZ2UgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbWFnZVBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgbG9hZDogZnVuY3Rpb24gKCBzcmMgKSB7XG5cbiAgICAgICAgc3JjID0gc3JjIHx8IHRoaXMuc3JjO1xuXG4gICAgICAgIGlmICggIXNyYyApIHsgXG5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybiggJ0ltYWdlIHNvdXJjZSB1bmRlZmluZWQnICk7XG5cbiAgICAgICAgICAgIHJldHVybjsgXG5cbiAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHNyYyA9PT0gJ3N0cmluZycgKSB7XG5cbiAgICAgICAgICAgIFRleHR1cmVMb2FkZXIubG9hZCggc3JjLCB0aGlzLm9uTG9hZC5iaW5kKCB0aGlzICksIHRoaXMub25Qcm9ncmVzcy5iaW5kKCB0aGlzICksIHRoaXMub25FcnJvci5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBzcmMgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ICkge1xuXG4gICAgICAgICAgICB0aGlzLm9uTG9hZCggbmV3IFRIUkVFLlRleHR1cmUoIHNyYyApICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBpbWFnZSBpcyBsb2FkZWRcbiAgICAgKiBAcGFyYW0gIHtUSFJFRS5UZXh0dXJlfSB0ZXh0dXJlIC0gVGV4dHVyZSB0byBiZSB1cGRhdGVkXG4gICAgICogQG1lbWJlck9mIEltYWdlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblx0XHRcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlKCB0ZXh0dXJlICk7XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggUGFub3JhbWEucHJvdG90eXBlLm9uTG9hZC5iaW5kKCB0aGlzICkgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNldFxuICAgICAqIEBtZW1iZXJPZiBJbWFnZVBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBQYW5vcmFtYS5wcm90b3R5cGUucmVzZXQuY2FsbCggdGhpcyApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VcbiAgICAgKiBAbWVtYmVyT2YgSW1hZ2VQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB7IG1hdGVyaWFsOiB7IG1hcCB9IH0gPSB0aGlzO1xuXG4gICAgICAgIC8vIFJlbGVhc2UgY2FjaGVkIGltYWdlXG4gICAgICAgIFRIUkVFLkNhY2hlLnJlbW92ZSggdGhpcy5zcmMgKTtcblxuICAgICAgICBpZiAoIG1hcCApIHsgbWFwLmRpc3Bvc2UoKTsgfVxuXG4gICAgICAgIFBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBJbWFnZVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEVtcHR5IHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRW1wdHlQYW5vcmFtYSAoKSB7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwMDAwMCwgb3BhY2l0eTogMCwgdHJhbnNwYXJlbnQ6IHRydWUgfSApO1xuXG4gICAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBuZXcgRmxvYXQzMkFycmF5KCksIDEgKSApO1xuXG4gICAgUGFub3JhbWEuY2FsbCggdGhpcywgZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cbn1cblxuRW1wdHlQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IEVtcHR5UGFub3JhbWFcblxufSApO1xuXG5leHBvcnQgeyBFbXB0eVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCB7IEN1YmVUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9DdWJlVGV4dHVyZUxvYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBDdWJlbWFwLWJhc2VkIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7YXJyYXl9IGltYWdlcyAtIEFycmF5IG9mIDYgdXJscyB0byBpbWFnZXMsIG9uZSBmb3IgZWFjaCBzaWRlIG9mIHRoZSBDdWJlVGV4dHVyZS4gVGhlIHVybHMgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOiBwb3MteCwgbmVnLXgsIHBvcy15LCBuZWcteSwgcG9zLXosIG5lZy16XG4gKi9cbmZ1bmN0aW9uIEN1YmVQYW5vcmFtYSAoIGltYWdlcyA9IFtdICl7XG5cbiAgICBjb25zdCBlZGdlTGVuZ3RoID0gMTAwMDA7XG4gICAgY29uc3Qgc2hhZGVyID0gT2JqZWN0LmFzc2lnbigge30sIFRIUkVFLlNoYWRlckxpYlsgJ2N1YmUnIF0gKTtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeSggZWRnZUxlbmd0aCwgZWRnZUxlbmd0aCwgZWRnZUxlbmd0aCApO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCB7XG5cbiAgICAgICAgZnJhZ21lbnRTaGFkZXI6IHNoYWRlci5mcmFnbWVudFNoYWRlcixcbiAgICAgICAgdmVydGV4U2hhZGVyOiBzaGFkZXIudmVydGV4U2hhZGVyLFxuICAgICAgICB1bmlmb3Jtczogc2hhZGVyLnVuaWZvcm1zLFxuICAgICAgICBzaWRlOiBUSFJFRS5CYWNrU2lkZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWVcblxuICAgIH0gKTtcblxuICAgIFBhbm9yYW1hLmNhbGwoIHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG4gICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgdGhpcy5lZGdlTGVuZ3RoID0gZWRnZUxlbmd0aDtcbiAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLm9wYWNpdHkudmFsdWUgPSAwO1xuXG59XG5cbkN1YmVQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IEN1YmVQYW5vcmFtYSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgNiBpbWFnZXMgYW5kIGJpbmQgbGlzdGVuZXJzXG4gICAgICogQG1lbWJlck9mIEN1YmVQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBDdWJlVGV4dHVyZUxvYWRlci5sb2FkKCBcdFxuXG4gICAgICAgICAgICB0aGlzLmltYWdlcywgXG5cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmJpbmQoIHRoaXMgKSwgXG4gICAgICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApLCBcbiAgICAgICAgICAgIHRoaXMub25FcnJvci5iaW5kKCB0aGlzICkgXG5cbiAgICAgICAgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gNiB0ZXh0dXJlcyBhcmUgcmVhZHlcbiAgICAgKiBAcGFyYW0gIHtUSFJFRS5DdWJlVGV4dHVyZX0gdGV4dHVyZSAtIEN1YmUgdGV4dHVyZVxuICAgICAqIEBtZW1iZXJPZiBDdWJlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblx0XHRcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3RDdWJlJyBdLnZhbHVlID0gdGV4dHVyZTtcblxuICAgICAgICBQYW5vcmFtYS5wcm90b3R5cGUub25Mb2FkLmNhbGwoIHRoaXMgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlXG4gICAgICogQG1lbWJlck9mIEN1YmVQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcdFxuXG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudEN1YmU7XG5cbiAgICAgICAgdGhpcy5pbWFnZXMuZm9yRWFjaCggKCBpbWFnZSApID0+IHsgVEhSRUUuQ2FjaGUucmVtb3ZlKCBpbWFnZSApOyB9ICk7XG5cbiAgICAgICAgaWYgKCB2YWx1ZSBpbnN0YW5jZW9mIFRIUkVFLkN1YmVUZXh0dXJlICkge1xuXG4gICAgICAgICAgICB2YWx1ZS5kaXNwb3NlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIFBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBDdWJlUGFub3JhbWEgfTsiLCJpbXBvcnQgeyBDdWJlUGFub3JhbWEgfSBmcm9tICcuL0N1YmVQYW5vcmFtYSc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgQmFzaWMgcGFub3JhbWEgd2l0aCA2IHByZS1kZWZpbmVkIGdyaWQgaW1hZ2VzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQmFzaWNQYW5vcmFtYSAoKSB7XG5cbiAgICBjb25zdCBpbWFnZXMgPSBbXTtcblxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IDY7IGkrKyApIHtcblxuICAgICAgICBpbWFnZXMucHVzaCggRGF0YUltYWdlLldoaXRlVGlsZSApO1xuXG4gICAgfVxuXG4gICAgQ3ViZVBhbm9yYW1hLmNhbGwoIHRoaXMsIGltYWdlcyApO1xuXG59XG5cbkJhc2ljUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggQ3ViZVBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogQmFzaWNQYW5vcmFtYVxuXG59ICk7XG5cbmV4cG9ydCB7IEJhc2ljUGFub3JhbWEgfTsiLCJpbXBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4vUGFub3JhbWEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgVmlkZW8gUGFub3JhbWFcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIEVxdWlyZWN0YW5ndWxhciB2aWRlbyB1cmxcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb24gZm9yIHZpZGVvIHNldHRpbmdzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0aW9ucy52aWRlb0VsZW1lbnRdIC0gSFRNTDUgdmlkZW8gZWxlbWVudCBjb250YWlucyB0aGUgdmlkZW9cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubG9vcD10cnVlXSAtIFNwZWNpZnkgaWYgdGhlIHZpZGVvIHNob3VsZCBsb29wIGluIHRoZSBlbmRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubXV0ZWQ9dHJ1ZV0gLSBNdXRlIHRoZSB2aWRlbyBvciBub3QuIE5lZWQgdG8gYmUgdHJ1ZSBpbiBvcmRlciB0byBhdXRvcGxheSBvbiBzb21lIGJyb3dzZXJzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9wbGF5PWZhbHNlXSAtIFNwZWNpZnkgaWYgdGhlIHZpZGVvIHNob3VsZCBhdXRvIHBsYXlcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGxheXNpbmxpbmU9dHJ1ZV0gLSBTcGVjaWZ5IGlmIHZpZGVvIHNob3VsZCBwbGF5IGlubGluZSBmb3IgaU9TLiBJZiB5b3Ugd2FudCBpdCB0byBhdXRvIHBsYXkgaW5saW5lLCBzZXQgYm90aCBhdXRvcGxheSBhbmQgbXV0ZWQgb3B0aW9ucyB0byB0cnVlXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIl0gLSBTZXRzIHRoZSBjcm9zcy1vcmlnaW4gYXR0cmlidXRlIGZvciB0aGUgdmlkZW8sIHdoaWNoIGFsbG93cyBmb3IgY3Jvc3Mtb3JpZ2luIHZpZGVvcyBpbiBzb21lIGJyb3dzZXJzIChGaXJlZm94LCBDaHJvbWUpLiBTZXQgdG8gZWl0aGVyIFwiYW5vbnltb3VzXCIgb3IgXCJ1c2UtY3JlZGVudGlhbHNcIi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzPTUwMDBdIC0gVGhlIG1pbmltdW0gcmFkaXVzIGZvciB0aGlzIHBhbm9yYW1cbiAqL1xuZnVuY3Rpb24gVmlkZW9QYW5vcmFtYSAoIHNyYywgb3B0aW9ucyA9IHt9ICkge1xuXG4gICAgY29uc3QgcmFkaXVzID0gNTAwMDtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeSggcmFkaXVzLCA2MCwgNDAgKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBvcGFjaXR5OiAwLCB0cmFuc3BhcmVudDogdHJ1ZSB9ICk7XG5cbiAgICBQYW5vcmFtYS5jYWxsKCB0aGlzLCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuICAgIHRoaXMuc3JjID0gc3JjO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuXG4gICAgICAgIHZpZGVvRWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3ZpZGVvJyApLFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICBtdXRlZDogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBwbGF5c2lubGluZTogdHJ1ZSxcbiAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnXG5cbiAgICB9O1xuXG4gICAgT2JqZWN0LmFzc2lnbiggdGhpcy5vcHRpb25zLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLnZpZGVvRWxlbWVudCA9IHRoaXMub3B0aW9ucy52aWRlb0VsZW1lbnQ7XG4gICAgdGhpcy52aWRlb1Byb2dyZXNzID0gMDtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2xlYXZlJywgdGhpcy5wYXVzZVZpZGVvLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCB0aGlzLnJlc3VtZVZpZGVvUHJvZ3Jlc3MuYmluZCggdGhpcyApICk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tdG9nZ2xlJywgdGhpcy50b2dnbGVWaWRlby5iaW5kKCB0aGlzICkgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd2aWRlby10aW1lJywgdGhpcy5zZXRWaWRlb0N1cnJlbnRUaW1lLmJpbmQoIHRoaXMgKSApO1xuXG59O1xuXG5WaWRlb1Bhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogVmlkZW9QYW5vcmFtYSxcblxuICAgIGlzTW9iaWxlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgY2hlY2sgPSB0cnVlO30pKCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCB3aW5kb3cubmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEgKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgdmlkZW8gcGFub3JhbWFcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyAgUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBtdXRlZCwgbG9vcCwgYXV0b3BsYXksIHBsYXlzaW5saW5lLCBjcm9zc09yaWdpbiB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XG4gICAgICAgIGNvbnN0IG9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBvbkxvYWQgPSB0aGlzLm9uTG9hZC5iaW5kKCB0aGlzICk7XG5cbiAgICAgICAgdmlkZW8ubG9vcCA9IGxvb3A7XG4gICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gYXV0b3BsYXk7XG4gICAgICAgIHZpZGVvLnBsYXlzaW5saW5lID0gcGxheXNpbmxpbmU7XG4gICAgICAgIHZpZGVvLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgICAgIHZpZGVvLm11dGVkID0gbXV0ZWQ7XG5cdFx0XG4gICAgICAgIGlmICggcGxheXNpbmxpbmUgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSggJ3BsYXlzaW5saW5lJywgJycgKTtcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSggJ3dlYmtpdC1wbGF5c2lubGluZScsICcnICk7XG5cbiAgICAgICAgfSBcblxuICAgICAgICBjb25zdCBvbmxvYWRlZGRhdGEgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdGhpcy5zZXRWaWRlb1RleHR1cmUoIHZpZGVvICk7XG5cbiAgICAgICAgICAgIGlmICggYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbicsIGRhdGE6IGZhbHNlIH0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGb3IgbW9iaWxlIHNpbGVudCBhdXRvcGxheVxuICAgICAgICAgICAgaWYgKCB0aGlzLmlzTW9iaWxlKCkgKSB7XG5cbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhdXRvcGxheSAmJiBtdXRlZCApIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nXG4gICAgICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbicsIGRhdGE6IGZhbHNlIH0gKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRhdGEgLSBQYXVzZSB2aWRlbyBvciBub3RcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiB0cnVlIH0gKTtcblxuICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGxvYWRlZCA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIEZpeCBmb3IgdGhyZWVqcyByODkgZGVsYXllZCB1cGRhdGVcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyggeyBsb2FkZWQ6IDEsIHRvdGFsOiAxIH0gKTtcbiAgICAgICAgICAgICAgICBvbkxvYWQoKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggbG9hZGVkICk7XG5cdFx0XHRcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVhZHkgc3RhdGUgb2YgdGhlIGF1ZGlvL3ZpZGVvIGVsZW1lbnRcbiAgICAgICAgICogMCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuICAgICAgICAgKiAxID0gSEFWRV9NRVRBREFUQSAtIG1ldGFkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbiAgICAgICAgICogMiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuICAgICAgICAgKiAzID0gSEFWRV9GVVRVUkVfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IGFuZCBhdCBsZWFzdCB0aGUgbmV4dCBmcmFtZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICogNCA9IEhBVkVfRU5PVUdIX0RBVEEgLSBlbm91Z2ggZGF0YSBhdmFpbGFibGUgdG8gc3RhcnQgcGxheWluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCB2aWRlby5yZWFkeVN0YXRlID4gMiApIHtcblxuICAgICAgICAgICAgb25sb2FkZWRkYXRhLmNhbGwoIHRoaXMgKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIHZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoICdzb3VyY2UnICkubGVuZ3RoID09PSAwICkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NvdXJjZScgKTtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3JjID0gdGhpcy5zcmM7XG4gICAgICAgICAgICAgICAgdmlkZW8uYXBwZW5kQ2hpbGQoIHNvdXJjZSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZpZGVvLmxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkZWRkYXRhJywgb25sb2FkZWRkYXRhLmJpbmQoIHRoaXMgKSApO1xuXHRcdFxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCAndGltZXVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy52aWRlb1Byb2dyZXNzID0gdmlkZW8uZHVyYXRpb24gPj0gMCA/IHZpZGVvLmN1cnJlbnRUaW1lIC8gdmlkZW8uZHVyYXRpb24gOiAwO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICdvblZpZGVvVXBkYXRlJ1xuICAgICAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEgLSBUaGUgcGVyY2VudGFnZSBvZiB2aWRlbyBwcm9ncmVzcy4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblZpZGVvVXBkYXRlJywgZGF0YTogdGhpcy52aWRlb1Byb2dyZXNzIH0gKTtcblxuICAgICAgICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICdlbmRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFxuICAgICAgICAgICAgaWYgKCAhbG9vcCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRWaWRlbygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiB0cnVlIH0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0uYmluZCggdGhpcyApLCBmYWxzZSApOyBcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmlkZW8gdGV4dHVyZVxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtIVE1MVmlkZW9FbGVtZW50fSB2aWRlbyAgLSBUaGUgaHRtbDUgdmlkZW8gZWxlbWVudFxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAqL1xuICAgIHNldFZpZGVvVGV4dHVyZTogZnVuY3Rpb24gKCB2aWRlbyApIHtcblxuICAgICAgICBpZiAoICF2aWRlbyApIHJldHVybjtcblxuICAgICAgICBjb25zdCB2aWRlb1RleHR1cmUgPSBuZXcgVEhSRUUuVmlkZW9UZXh0dXJlKCB2aWRlbyApO1xuICAgICAgICB2aWRlb1RleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB2aWRlb1RleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB2aWRlb1RleHR1cmUuZm9ybWF0ID0gVEhSRUUuUkdCRm9ybWF0O1xuXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dHVyZSggdmlkZW9UZXh0dXJlICk7XG5cdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNldFxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IHVuZGVmaW5lZDtcdFxuXG4gICAgICAgIFBhbm9yYW1hLnByb3RvdHlwZS5yZXNldC5jYWxsKCB0aGlzICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmlkZW8gaXMgcGF1c2VkXG4gICAgICogQG1lbWJlck9mIFZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHZpZGVvIHBhdXNlZCBvciBub3RcbiAgICAgKi9cbiAgICBpc1ZpZGVvUGF1c2VkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdmlkZW8gdG8gcGxheSBvciBwYXVzZVxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdG9nZ2xlVmlkZW86IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG4gICAgICAgIGlmICggIXZpZGVvICkgeyByZXR1cm47IH1cblxuICAgICAgICB2aWRlb1sgdmlkZW8ucGF1c2VkID8gJ3BsYXknIDogJ3BhdXNlJyBdKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHZpZGVvIGN1cnJlbnRUaW1lXG4gICAgICogQG1lbWJlck9mIFZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBFdmVudCBjb250YWlucyBwZXJjZW50YWdlLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgKi9cbiAgICBzZXRWaWRlb0N1cnJlbnRUaW1lOiBmdW5jdGlvbiAoIHsgcGVyY2VudGFnZSB9ICkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCB2aWRlbyAmJiAhTnVtYmVyLmlzTmFOKCBwZXJjZW50YWdlICkgJiYgcGVyY2VudGFnZSAhPT0gMSApIHtcblxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSB2aWRlby5kdXJhdGlvbiAqIHBlcmNlbnRhZ2U7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblZpZGVvVXBkYXRlJywgZGF0YTogcGVyY2VudGFnZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgdmlkZW9cbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBWaWRlb1Bhbm9yYW1hI3BsYXlcbiAgICAgKiBAZmlyZXMgVmlkZW9QYW5vcmFtYSNwbGF5LWVycm9yXG4gICAgICovXG4gICAgcGxheVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcbiAgICAgICAgY29uc3QgcGxheVZpZGVvID0gdGhpcy5wbGF5VmlkZW8uYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBkaXNwYXRjaEV2ZW50ID0gdGhpcy5kaXNwYXRjaEV2ZW50LmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3Qgb25TdWNjZXNzID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBsYXkgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgVmlkZW9QYW5vcmFtYSNwbGF5XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwbGF5JyB9ICk7XG5cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb25FcnJvciA9ICggZXJyb3IgKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIEVycm9yIHBsYXlpbmcgdmlkZW8uIFJldHJ5IG5leHQgZnJhbWUuIFBvc3NpYmx5IFdhaXRpbmcgZm9yIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHBsYXlWaWRlbyApO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBsYXkgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgVmlkZW9QYW5vcmFtYSNwbGF5LWVycm9yXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwbGF5LWVycm9yJywgZXJyb3IgfSApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCB2aWRlbyAmJiB2aWRlby5wYXVzZWQgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKS50aGVuKCBvblN1Y2Nlc3MgKS5jYXRjaCggb25FcnJvciApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSB2aWRlb1xuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFZpZGVvUGFub3JhbWEjcGF1c2VcbiAgICAgKi9cbiAgICBwYXVzZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuICAgICAgICBpZiAoIHZpZGVvICYmICF2aWRlby5wYXVzZWQgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXVzZSBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlkZW9QYW5vcmFtYSNwYXVzZVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYXVzZScgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc3VtZSB2aWRlb1xuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVzdW1lVmlkZW9Qcm9ncmVzczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCB2aWRlby5yZWFkeVN0YXRlID49IDQgJiYgdmlkZW8uYXV0b3BsYXkgJiYgIXRoaXMuaXNNb2JpbGUoKSApIHtcblxuICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8oKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuICAgICAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiBmYWxzZSB9ICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5wYXVzZVZpZGVvKCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogdHJ1ZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZSggeyBwZXJjZW50YWdlOiB0aGlzLnZpZGVvUHJvZ3Jlc3MgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHZpZGVvIGF0IHN0YXRpbmcgcG9pbnRcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2V0VmlkZW86IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG4gICAgICAgIGlmICggdmlkZW8gKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZSggeyBwZXJjZW50YWdlOiAwIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmlkZW8gaXMgbXV0ZWRcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdmlkZW8gbXV0ZWQgb3Igbm90XG4gICAgICovXG4gICAgaXNWaWRlb011dGVkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW9FbGVtZW50Lm11dGVkO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgdmlkZW9cbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG11dGVWaWRlbzogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCB2aWRlbyAmJiAhdmlkZW8ubXV0ZWQgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLm11dGVkID0gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2b2x1bWVjaGFuZ2UnIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm11dGUgdmlkZW9cbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVubXV0ZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuICAgICAgICBpZiAoIHZpZGVvICYmIHRoaXMuaXNWaWRlb011dGVkKCkgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLm11dGVkID0gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndm9sdW1lY2hhbmdlJyB9ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlkZW8gZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldFZpZGVvRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZGVvRWxlbWVudDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIHZpZGVvIHBhbm9yYW1hXG4gICAgICogQG1lbWJlck9mIFZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBtYXRlcmlhbDogeyBtYXAgfSB9ID0gdGhpcztcblxuICAgICAgICB0aGlzLnBhdXNlVmlkZW8oKTtcblx0XHRcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbGVhdmUnLCB0aGlzLnBhdXNlVmlkZW8uYmluZCggdGhpcyApICk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCB0aGlzLnJlc3VtZVZpZGVvUHJvZ3Jlc3MuYmluZCggdGhpcyApICk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXRvZ2dsZScsIHRoaXMudG9nZ2xlVmlkZW8uYmluZCggdGhpcyApICk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLXRpbWUnLCB0aGlzLnNldFZpZGVvQ3VycmVudFRpbWUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgaWYgKCBtYXAgKSB7IG1hcC5kaXNwb3NlKCk7IH1cblxuICAgICAgICBQYW5vcmFtYS5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKCB0aGlzICk7XG5cbiAgICB9XG5cbn0gKTtcblxuZXhwb3J0IHsgVmlkZW9QYW5vcmFtYSB9OyIsIlxuaW1wb3J0IHsgVGV4dHVyZUxvYWRlciB9IGZyb20gJy4vVGV4dHVyZUxvYWRlcic7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBHb29nbGUgU3RyZWV0IFZpZXcgTG9hZGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbWV0ZXJzIFxuICovXG5mdW5jdGlvbiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyICggcGFyYW1ldGVycyA9IHt9ICkge1xuXG4gICAgdGhpcy5fcGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gICAgdGhpcy5fem9vbSA9IG51bGw7XG4gICAgdGhpcy5fcGFub0lkID0gbnVsbDtcbiAgICB0aGlzLl9wYW5vQ2xpZW50ID0gbmV3IGdvb2dsZS5tYXBzLlN0cmVldFZpZXdTZXJ2aWNlKCk7XG4gICAgdGhpcy5fY291bnQgPSAwO1xuICAgIHRoaXMuX3RvdGFsID0gMDtcbiAgICB0aGlzLl9jYW52YXMgPSBbXTtcbiAgICB0aGlzLl9jdHggPSBbXTtcbiAgICB0aGlzLl93YyA9IDA7XG4gICAgdGhpcy5faGMgPSAwO1xuICAgIHRoaXMucmVzdWx0ID0gbnVsbDtcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICB0aGlzLmNvcHlyaWdodCA9ICcnO1xuICAgIHRoaXMub25TaXplQ2hhbmdlID0gbnVsbDtcbiAgICB0aGlzLm9uUGFub3JhbWFMb2FkID0gbnVsbDtcblxuICAgIHRoaXMubGV2ZWxzVyA9IFsgMSwgMiwgNCwgNywgMTMsIDI2IF07XG4gICAgdGhpcy5sZXZlbHNIID0gWyAxLCAxLCAyLCA0LCA3LCAxMyBdO1xuXG4gICAgdGhpcy53aWR0aHMgPSBbIDQxNiwgODMyLCAxNjY0LCAzMzI4LCA2NjU2LCAxMzMxMiBdO1xuICAgIHRoaXMuaGVpZ2h0cyA9IFsgNDE2LCA0MTYsIDgzMiwgMTY2NCwgMzMyOCwgNjY1NiBdO1xuXG4gICAgdGhpcy5tYXhXID0gNjY1NjtcbiAgICB0aGlzLm1heEggPSA2NjU2O1xuXG4gICAgbGV0IGdsO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXG4gICAgICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoICdleHBlcmltZW50YWwtd2ViZ2wnICk7XG5cbiAgICAgICAgaWYoICFnbCApIHtcblxuICAgICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApO1xuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBjYXRjaCAoIGVycm9yICkge1xuXG4gICAgfVxuXG4gICAgdGhpcy5tYXhXID0gTWF0aC5tYXgoIGdsLmdldFBhcmFtZXRlciggZ2wuTUFYX1RFWFRVUkVfU0laRSApLCB0aGlzLm1heFcgKTtcbiAgICB0aGlzLm1heEggPSBNYXRoLm1heCggZ2wuZ2V0UGFyYW1ldGVyKCBnbC5NQVhfVEVYVFVSRV9TSVpFICksIHRoaXMubWF4SCApO1xuXG59XG5cbk9iamVjdC5hc3NpZ24oIEdvb2dsZVN0cmVldHZpZXdMb2FkZXIucHJvdG90eXBlLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogR29vZ2xlU3RyZWV0dmlld0xvYWRlcixcblxuICAgIC8qKlxuICAgICAqIFNldCBwcm9ncmVzc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb2FkZWQgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsIFxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0UHJvZ3Jlc3M6IGZ1bmN0aW9uICggbG9hZGVkLCB0b3RhbCApIHtcblxuICAgICAgICBpZiAoIHRoaXMub25Qcm9ncmVzcyApIHtcblxuICAgICAgICAgICAgdGhpcy5vblByb2dyZXNzKCB7IGxvYWRlZDogbG9hZGVkLCB0b3RhbDogdG90YWwgfSApO1xuXG4gICAgICAgIH1cblx0XHRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRhcHQgdGV4dHVyZSB0byB6b29tXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdMb2FkZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGFwdFRleHR1cmVUb1pvb206IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy53aWR0aHMgWyB0aGlzLl96b29tIF07XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmhlaWdodHNbIHRoaXMuX3pvb20gXTtcblxuICAgICAgICBjb25zdCBtYXhXID0gdGhpcy5tYXhXO1xuICAgICAgICBjb25zdCBtYXhIID0gdGhpcy5tYXhIO1xuXG4gICAgICAgIHRoaXMuX3djID0gTWF0aC5jZWlsKCB3IC8gbWF4VyApO1xuICAgICAgICB0aGlzLl9oYyA9IE1hdGguY2VpbCggaCAvIG1heEggKTtcblxuICAgICAgICBmb3IoIGxldCB5ID0gMDsgeSA8IHRoaXMuX2hjOyB5KysgKSB7XG4gICAgICAgICAgICBmb3IoIGxldCB4ID0gMDsgeCA8IHRoaXMuX3djOyB4KysgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG4gICAgICAgICAgICAgICAgaWYoIHggPCAoIHRoaXMuX3djIC0gMSApICkgYy53aWR0aCA9IG1heFc7IGVsc2UgYy53aWR0aCA9IHcgLSAoIG1heFcgKiB4ICk7XG4gICAgICAgICAgICAgICAgaWYoIHkgPCAoIHRoaXMuX2hjIC0gMSApICkgYy5oZWlnaHQgPSBtYXhIOyBlbHNlIGMuaGVpZ2h0ID0gaCAtICggbWF4SCAqIHkgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMucHVzaCggYyApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5wdXNoKCBjLmdldENvbnRleHQoICcyZCcgKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29tcG9zZSBmcm9tIHRpbGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geSBcbiAgICAgKiBAcGFyYW0geyp9IHRleHR1cmUgXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdMb2FkZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb21wb3NlRnJvbVRpbGU6IGZ1bmN0aW9uICggeCwgeSwgdGV4dHVyZSApIHtcblxuICAgICAgICBjb25zdCBtYXhXID0gdGhpcy5tYXhXO1xuICAgICAgICBjb25zdCBtYXhIID0gdGhpcy5tYXhIO1xuXG4gICAgICAgIHggKj0gNTEyO1xuICAgICAgICB5ICo9IDUxMjtcblxuICAgICAgICBjb25zdCBweCA9IE1hdGguZmxvb3IoIHggLyBtYXhXICk7XG4gICAgICAgIGNvbnN0IHB5ID0gTWF0aC5mbG9vciggeSAvIG1heEggKTtcblxuICAgICAgICB4IC09IHB4ICogbWF4VztcbiAgICAgICAgeSAtPSBweSAqIG1heEg7XG5cbiAgICAgICAgdGhpcy5fY3R4WyBweSAqIHRoaXMuX3djICsgcHggXS5kcmF3SW1hZ2UoIHRleHR1cmUsIDAsIDAsIHRleHR1cmUud2lkdGgsIHRleHR1cmUuaGVpZ2h0LCB4LCB5LCA1MTIsIDUxMiApO1xuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoKTtcblx0XHRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvZ3Jlc3NcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld0xvYWRlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHByb2dyZXNzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLl9jb3VudCsrO1xuXHRcdFxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKCB0aGlzLl9jb3VudCwgdGhpcy5fdG90YWwgKTtcblx0XHRcbiAgICAgICAgaWYgKCB0aGlzLl9jb3VudCA9PT0gdGhpcy5fdG90YWwpIHtcblxuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLl9jYW52YXM7XG4gICAgICAgICAgICB0aGlzLnBhbm9JZCA9IHRoaXMuX3Bhbm9JZDtcbiAgICAgICAgICAgIHRoaXMuem9vbSA9IHRoaXMuX3pvb207XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5vblBhbm9yYW1hTG9hZCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMub25QYW5vcmFtYUxvYWQoIHRoaXMuX2NhbnZhc1sgMCBdICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvbXBvc2UgcGFub3JhbWFcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld0xvYWRlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbXBvc2VQYW5vcmFtYTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIDAsIDEgKTtcblx0XHRcbiAgICAgICAgY29uc3QgdyA9IHRoaXMubGV2ZWxzV1sgdGhpcy5fem9vbSBdO1xuICAgICAgICBjb25zdCBoID0gdGhpcy5sZXZlbHNIWyB0aGlzLl96b29tIF07XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0XG4gICAgICAgIHRoaXMuX2NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fdG90YWwgPSB3ICogaDtcblxuICAgICAgICBjb25zdCB7IHVzZVdlYkdMIH0gPSB0aGlzLl9wYXJhbWV0ZXJzO1xuXG4gICAgICAgIGZvciggbGV0IHkgPSAwOyB5IDwgaDsgeSsrICkge1xuICAgICAgICAgICAgZm9yKCBsZXQgeCA9IDA7IHggPCB3OyB4KysgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gJ2h0dHBzOi8vZ2VvMC5nZ3BodC5jb20vY2JrP2NiX2NsaWVudD1tYXBzX3N2LnRhY3RpbGUmYXV0aHVzZXI9MCZobD1lbiZvdXRwdXQ9dGlsZSZ6b29tPScgKyB0aGlzLl96b29tICsgJyZ4PScgKyB4ICsgJyZ5PScgKyB5ICsgJyZwYW5vaWQ9JyArIHRoaXMuX3Bhbm9JZCArICcmbmJ0JmZvdmVyPTInO1xuICAgICAgICAgICAgICAgICggZnVuY3Rpb24oIHgsIHkgKSB7IFxuICAgICAgICAgICAgICAgICAgICBpZiggdXNlV2ViR0wgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlID0gVGV4dHVyZUxvYWRlci5sb2FkKCB1cmwsIG51bGwsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29tcG9zZUZyb21UaWxlKCB4LCB5LCB0ZXh0dXJlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29tcG9zZUZyb21UaWxlKCB4LCB5LCB0aGlzICk7XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICkoIHgsIHkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMb2FkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhbm9pZCBcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld0xvYWRlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICggcGFub2lkICkge1xuXG4gICAgICAgIHRoaXMubG9hZFBhbm8oIHBhbm9pZCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgcGFub3JhbWFcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld0xvYWRlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWRQYW5vOiBmdW5jdGlvbiggaWQgKSB7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3Bhbm9DbGllbnQuZ2V0UGFub3JhbWFCeUlkKCBpZCwgZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5TdHJlZXRWaWV3U3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgc2VsZi5jb3B5cmlnaHQgPSByZXN1bHQuY29weXJpZ2h0O1xuICAgICAgICAgICAgICAgIHNlbGYuX3Bhbm9JZCA9IHJlc3VsdC5sb2NhdGlvbi5wYW5vO1xuICAgICAgICAgICAgICAgIHNlbGYuY29tcG9zZVBhbm9yYW1hKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgem9vbSBsZXZlbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6IFxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0Wm9vbTogZnVuY3Rpb24oIHogKSB7XG5cbiAgICAgICAgdGhpcy5fem9vbSA9IHo7XG4gICAgICAgIHRoaXMuYWRhcHRUZXh0dXJlVG9ab29tKCk7XG4gICAgfVxuXHRcbn0gKTtcblxuZXhwb3J0IHsgR29vZ2xlU3RyZWV0dmlld0xvYWRlciB9OyIsImltcG9ydCB7IEltYWdlUGFub3JhbWEgfSBmcm9tICcuL0ltYWdlUGFub3JhbWEnO1xuaW1wb3J0IHsgR29vZ2xlU3RyZWV0dmlld0xvYWRlciB9IGZyb20gJy4uL2xvYWRlcnMvR29vZ2xlU3RyZWV0dmlld0xvYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBHb29nbGUgc3RyZWV0dmlldyBwYW5vcmFtYVxuICogQGRlc2NyaXB0aW9uIFtIb3cgdG8gZ2V0IFBhbm9yYW1hIElEXXtAbGluayBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5OTE2MTQ5L2dvb2dsZS1tYXBzLXN0cmVldHZpZXctaG93LXRvLWdldC1wYW5vcmFtYS1pZH1cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHBhbm9JZCAtIFBhbm9yYW1hIGlkIGZyb20gR29vZ2xlIFN0cmVldHZpZXcgXG4gKiBAcGFyYW0ge3N0cmluZ30gW2FwaUtleV0gLSBHb29nbGUgU3RyZWV0IFZpZXcgQVBJIEtleVxuICovXG5mdW5jdGlvbiBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWEgKCBwYW5vSWQsIGFwaUtleSApIHtcblxuICAgIEltYWdlUGFub3JhbWEuY2FsbCggdGhpcyApO1xuXG4gICAgdGhpcy5wYW5vSWQgPSBwYW5vSWQ7XG5cbiAgICB0aGlzLmdzdkxvYWRlciA9IG51bGw7XG5cbiAgICB0aGlzLmxvYWRSZXF1ZXN0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuc2V0dXBHb29nbGVNYXBBUEkoIGFwaUtleSApO1xuXG59XG5cbkdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hLFxuXG4gICAgLyoqXG4gICAgICogTG9hZCBHb29nbGUgU3RyZWV0IFZpZXcgYnkgcGFub3JhbWEgaWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFub0lkIC0gR29nb2dsZSBTdHJlZXQgVmlldyBwYW5vcmFtYSBpZFxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbiAoIHBhbm9JZCApIHtcblxuICAgICAgICB0aGlzLmxvYWRSZXF1ZXN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHBhbm9JZCA9ICggcGFub0lkIHx8IHRoaXMucGFub0lkICkgfHwge307XG5cbiAgICAgICAgaWYgKCBwYW5vSWQgJiYgdGhpcy5nc3ZMb2FkZXIgKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEdTVkxvYWRlciggcGFub0lkICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwIEdvb2dsZSBNYXAgQVBJXG4gICAgICogQHBhcmFtIHtzdHJpbmd9ICBhcGlLZXlcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0dXBHb29nbGVNYXBBUEk6IGZ1bmN0aW9uICggYXBpS2V5ICkge1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzY3JpcHQnICk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzPyc7XG4gICAgICAgIHNjcmlwdC5zcmMgKz0gYXBpS2V5ID8gJ2tleT0nICsgYXBpS2V5IDogJyc7XG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLnNldEdTVkxvYWRlci5iaW5kKCB0aGlzICk7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSB0aGlzLnNldEdTVkxvYWRlci5iaW5kKCB0aGlzICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2hlYWQnICkuYXBwZW5kQ2hpbGQoIHNjcmlwdCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBHU1YgTG9hZGVyXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldEdTVkxvYWRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyID0gbmV3IEdvb2dsZVN0cmVldHZpZXdMb2FkZXIoKTtcblxuICAgICAgICBpZiAoIHRoaXMubG9hZFJlcXVlc3RlZCApIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBHU1YgTG9hZGVyXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0dvb2dsZVN0cmVldHZpZXdMb2FkZXJ9IEdTViBMb2FkZXIgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRHU1ZMb2FkZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5nc3ZMb2FkZXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTG9hZCBHU1YgTG9hZGVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBwYW5vSWQgLSBHb2dvZ2xlIFN0cmVldCBWaWV3IHBhbm9yYW1hIGlkXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWRHU1ZMb2FkZXI6IGZ1bmN0aW9uICggcGFub0lkICkge1xuXG4gICAgICAgIHRoaXMubG9hZFJlcXVlc3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyLm9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApO1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyLm9uUGFub3JhbWFMb2FkID0gdGhpcy5vbkxvYWQuYmluZCggdGhpcyApO1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyLnNldFpvb20oIHRoaXMuZ2V0Wm9vbUxldmVsKCkgKTtcblxuICAgICAgICB0aGlzLmdzdkxvYWRlci5sb2FkKCBwYW5vSWQgKTtcblxuICAgICAgICB0aGlzLmdzdkxvYWRlci5sb2FkZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gcGFub3JhbWEgaXMgbG9hZGVkXG4gICAgICogQHBhcmFtICB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhcyAtIENhbnZhcyB3aGVyZSB0aGUgdGlsZXMgaGF2ZSBiZWVuIGRyYXduXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTG9hZDogZnVuY3Rpb24gKCBjYW52YXMgKSB7XG5cbiAgICAgICAgSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUub25Mb2FkLmNhbGwoIHRoaXMsIG5ldyBUSFJFRS5UZXh0dXJlKCBjYW52YXMgKSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0XG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5nc3ZMb2FkZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUucmVzZXQuY2FsbCggdGhpcyApO1xuXG4gICAgfVxuXG59ICk7XG5cbmV4cG9ydCB7IEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSB9OyIsIi8qKlxuICogU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uIHNoYWRlclxuICogYmFzZWQgb24gaHR0cDovL25vdGxpb24uZ2l0aHViLmlvL3N0cmVldHZpZXctc3RlcmVvZ3JhcGhpY1xuICogQGF1dGhvciBwY2hlbjY2XG4gKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBTdGVyZW9ncmFocGljIFNoYWRlclxuICogQG1vZHVsZSBTdGVyZW9ncmFwaGljU2hhZGVyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdW5pZm9ybXNcbiAqIEBwcm9wZXJ0eSB7VEhSRUUuVGV4dHVyZX0gdW5pZm9ybXMudERpZmZ1c2UgZGlmZnVzZSBtYXBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1bmlmb3Jtcy5yZXNvbHV0aW9uIGltYWdlIHJlc29sdXRpb25cbiAqIEBwcm9wZXJ0eSB7VEhSRUUuTWF0cml4NH0gdW5pZm9ybXMudHJhbnNmb3JtIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuaWZvcm1zLnpvb20gaW1hZ2Ugem9vbSBmYWN0b3JcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1bmlmb3Jtcy5vcGFjaXR5IGltYWdlIG9wYWNpdHlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXIgdmVydGV4IHNoYWRlclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyIGZyYWdtZW50IHNoYWRlclxuICovXG5jb25zdCBTdGVyZW9ncmFwaGljU2hhZGVyID0ge1xuXG4gICAgdW5pZm9ybXM6IHtcblxuICAgICAgICAndERpZmZ1c2UnOiB7IHZhbHVlOiBuZXcgVEhSRUUuVGV4dHVyZSgpIH0sXG4gICAgICAgICdyZXNvbHV0aW9uJzogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgICd0cmFuc2Zvcm0nOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4NCgpIH0sXG4gICAgICAgICd6b29tJzogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgICdvcGFjaXR5JzogeyB2YWx1ZTogMS4wIH1cblxuICAgIH0sXG5cbiAgICB2ZXJ0ZXhTaGFkZXI6IFtcblxuICAgICAgICAndmFyeWluZyB2ZWMyIHZVdjsnLFxuXG4gICAgICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgICAgICAndlV2ID0gdXY7JyxcbiAgICAgICAgJ2dsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApOycsXG5cbiAgICAgICAgJ30nIFxuXG4gICAgXS5qb2luKCAnXFxuJyApLFxuXG4gICAgZnJhZ21lbnRTaGFkZXI6IFtcblxuICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7JyxcbiAgICAgICAgJ3VuaWZvcm0gZmxvYXQgcmVzb2x1dGlvbjsnLFxuICAgICAgICAndW5pZm9ybSBtYXQ0IHRyYW5zZm9ybTsnLFxuICAgICAgICAndW5pZm9ybSBmbG9hdCB6b29tOycsXG4gICAgICAgICd1bmlmb3JtIGZsb2F0IG9wYWNpdHk7JyxcblxuICAgICAgICAndmFyeWluZyB2ZWMyIHZVdjsnLFxuXG4gICAgICAgICdjb25zdCBmbG9hdCBQSSA9IDMuMTQxNTkyNjUzNTg5NzkzOycsXG5cbiAgICAgICAgJ3ZvaWQgbWFpbigpeycsXG5cbiAgICAgICAgJ3ZlYzIgcG9zaXRpb24gPSAtMS4wICsgIDIuMCAqIHZVdjsnLFxuXG4gICAgICAgICdwb3NpdGlvbiAqPSB2ZWMyKCB6b29tICogcmVzb2x1dGlvbiwgem9vbSAqIDAuNSApOycsXG5cbiAgICAgICAgJ2Zsb2F0IHgyeTIgPSBwb3NpdGlvbi54ICogcG9zaXRpb24ueCArIHBvc2l0aW9uLnkgKiBwb3NpdGlvbi55OycsXG4gICAgICAgICd2ZWMzIHNwaGVyZV9wbnQgPSB2ZWMzKCAyLiAqIHBvc2l0aW9uLCB4MnkyIC0gMS4gKSAvICggeDJ5MiArIDEuICk7JyxcblxuICAgICAgICAnc3BoZXJlX3BudCA9IHZlYzMoIHRyYW5zZm9ybSAqIHZlYzQoIHNwaGVyZV9wbnQsIDEuMCApICk7JyxcblxuICAgICAgICAndmVjMiBzYW1wbGVVViA9IHZlYzIoJyxcbiAgICAgICAgJyhhdGFuKHNwaGVyZV9wbnQueSwgc3BoZXJlX3BudC54KSAvIFBJICsgMS4wKSAqIDAuNSwnLFxuICAgICAgICAnKGFzaW4oc3BoZXJlX3BudC56KSAvIFBJICsgMC41KScsXG4gICAgICAgICcpOycsXG5cbiAgICAgICAgJ2dsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHNhbXBsZVVWICk7JyxcblxuICAgICAgICAnZ2xfRnJhZ0NvbG9yLmEgKj0gb3BhY2l0eTsnLFxuXG4gICAgICAgICd9J1xuXG4gICAgXS5qb2luKCAnXFxuJyApXG5cbn07XG5cbmV4cG9ydCB7IFN0ZXJlb2dyYXBoaWNTaGFkZXIgfTsiLCJpbXBvcnQgeyBJbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi9JbWFnZVBhbm9yYW1hJztcbmltcG9ydCB7IEluZm9zcG90IH0gZnJvbSAnLi4vaW5mb3Nwb3QvSW5mb3Nwb3QnO1xuaW1wb3J0IHsgQ09OVFJPTFMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0IHsgU3RlcmVvZ3JhcGhpY1NoYWRlciB9IGZyb20gJy4uL3NoYWRlcnMvU3RlcmVvZ3JhcGhpY1NoYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBMaXR0bGUgUGxhbmV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFx0XHQtIFR5cGUgb2YgbGl0dGxlIHBsYW5ldCBiYXNpYyBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcdFx0LSBVUkwgZm9yIHRoZSBpbWFnZSBzb3VyY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT0xMDAwMF0gLSBTaXplIG9mIHBsYW5lIGdlb21ldHJ5XG4gKiBAcGFyYW0ge251bWJlcn0gW3JhdGlvPTAuNV0gIC0gUmF0aW8gb2YgcGxhbmUgZ2VvbWV0cnkncyBoZWlnaHQgYWdhaW5zdCB3aWR0aFxuICovXG5mdW5jdGlvbiBMaXR0bGVQbGFuZXQgKCB0eXBlID0gJ2ltYWdlJywgc291cmNlLCBzaXplID0gMTAwMDAsIHJhdGlvID0gMC41ICkge1xuXG4gICAgaWYgKCB0eXBlID09PSAnaW1hZ2UnICkge1xuXG4gICAgICAgIEltYWdlUGFub3JhbWEuY2FsbCggdGhpcywgc291cmNlLCB0aGlzLmNyZWF0ZUdlb21ldHJ5KCBzaXplLCByYXRpbyApLCB0aGlzLmNyZWF0ZU1hdGVyaWFsKCBzaXplICkgKTtcblxuICAgIH1cblxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5yYXRpbyA9IHJhdGlvO1xuICAgIHRoaXMuRVBTID0gMC4wMDAwMDE7XG4gICAgdGhpcy5mcmFtZUlkID0gbnVsbDtcblxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnVzZXJNb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbiAgICB0aGlzLnF1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLnF1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLnF1YXRDdXIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMucXVhdFNsZXJwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIHRoaXMudmVjdG9yWCA9IG5ldyBUSFJFRS5WZWN0b3IzKCAxLCAwLCAwICk7XG4gICAgdGhpcy52ZWN0b3JZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3dpbmRvdy1yZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplICk7XG5cbn1cblxuTGl0dGxlUGxhbmV0LnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIEltYWdlUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBMaXR0bGVQbGFuZXQsXG5cbiAgICBhZGQ6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZCggYXJndW1lbnRzWyBpIF0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgb2JqZWN0Lm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xuXHRcdFx0XG4gICAgICAgIH1cblxuICAgICAgICBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5hZGQuY2FsbCggdGhpcywgb2JqZWN0ICk7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlR2VvbWV0cnk6IGZ1bmN0aW9uICggc2l6ZSwgcmF0aW8gKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCBzaXplLCBzaXplICogcmF0aW8gKTtcblxuICAgIH0sXG5cbiAgICBjcmVhdGVNYXRlcmlhbDogZnVuY3Rpb24gKCBzaXplICkge1xuXG4gICAgICAgIGNvbnN0IHNoYWRlciA9IE9iamVjdC5hc3NpZ24oIHt9LCBTdGVyZW9ncmFwaGljU2hhZGVyICksIHVuaWZvcm1zID0gc2hhZGVyLnVuaWZvcm1zO1xuXG4gICAgICAgIHVuaWZvcm1zLnpvb20udmFsdWUgPSBzaXplO1xuICAgICAgICB1bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0gMC4wO1xuXG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHtcblxuICAgICAgICAgICAgdW5pZm9ybXM6IHVuaWZvcm1zLFxuICAgICAgICAgICAgdmVydGV4U2hhZGVyOiBzaGFkZXIudmVydGV4U2hhZGVyLFxuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXI6IHNoYWRlci5mcmFnbWVudFNoYWRlcixcbiAgICAgICAgICAgIHNpZGU6IFRIUkVFLkJhY2tTaWRlLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWVcblxuICAgICAgICB9ICk7XG5cdFx0XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyTW91c2VFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V3aGVlbCcsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdET01Nb3VzZVNjcm9sbCcsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0TWVudS5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cdFx0XG4gICAgfSxcblxuICAgIHVucmVnaXN0ZXJNb3VzZUV2ZW50czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICksIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXdoZWVsJywgdGhpcy5vbk1vdXNlV2hlZWwuYmluZCggdGhpcyApLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnRE9NTW91c2VTY3JvbGwnLCB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKCB0aGlzICksIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0TWVudS5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cdFx0XG4gICAgfSxcblxuICAgIG9uTW91c2VEb3duOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGNvbnN0IGlucHV0Q291bnQgPSAoIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggKSB8fCAxIDtcblxuICAgICAgICBzd2l0Y2ggKCBpbnB1dENvdW50ICkge1xuXG4gICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgICAgY29uc3QgeCA9ICggZXZlbnQuY2xpZW50WCA+PSAwICkgPyBldmVudC5jbGllbnRYIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFg7XG4gICAgICAgICAgICBjb25zdCB5ID0gKCBldmVudC5jbGllbnRZID49IDAgKSA/IGV2ZW50LmNsaWVudFkgOiBldmVudC50b3VjaGVzWyAwIF0uY2xpZW50WTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVzZXJNb3VzZS5zZXQoIHgsIHkgKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOlxuXG4gICAgICAgICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG4gICAgICAgICAgICB0aGlzLnVzZXJNb3VzZS5waW5jaERpc3RhbmNlID0gZGlzdGFuY2U7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVXBkYXRlQ2FsbGJhY2soKTtcblxuICAgIH0sXG5cbiAgICBvbk1vdXNlTW92ZTogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBjb25zdCBpbnB1dENvdW50ID0gKCBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkgfHwgMSA7XG5cbiAgICAgICAgc3dpdGNoICggaW5wdXRDb3VudCApIHtcblxuICAgICAgICBjYXNlIDE6XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSAoIGV2ZW50LmNsaWVudFggPj0gMCApID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbIDAgXS5jbGllbnRYO1xuICAgICAgICAgICAgY29uc3QgeSA9ICggZXZlbnQuY2xpZW50WSA+PSAwICkgPyBldmVudC5jbGllbnRZIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlWCA9IFRIUkVFLk1hdGguZGVnVG9SYWQoIHggLSB0aGlzLnVzZXJNb3VzZS54ICkgKiAwLjQ7XG4gICAgICAgICAgICBjb25zdCBhbmdsZVkgPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCB5IC0gdGhpcy51c2VyTW91c2UueSApICogMC40O1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZHJhZ2dpbmcgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWF0QS5zZXRGcm9tQXhpc0FuZ2xlKCB0aGlzLnZlY3RvclksIGFuZ2xlWCApO1xuICAgICAgICAgICAgICAgIHRoaXMucXVhdEIuc2V0RnJvbUF4aXNBbmdsZSggdGhpcy52ZWN0b3JYLCBhbmdsZVkgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1YXRDdXIubXVsdGlwbHkoIHRoaXMucXVhdEEgKS5tdWx0aXBseSggdGhpcy5xdWF0QiApO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlck1vdXNlLnNldCggeCwgeSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6XG5cbiAgICAgICAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuICAgICAgICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRab29tRGVsdGEoIHRoaXMudXNlck1vdXNlLnBpbmNoRGlzdGFuY2UgLSBkaXN0YW5jZSApO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgb25Nb3VzZVVwOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgfSxcblxuICAgIG9uTW91c2VXaGVlbDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBsZXQgZGVsdGEgPSAwO1xuXG4gICAgICAgIGlmICggZXZlbnQud2hlZWxEZWx0YSAhPT0gdW5kZWZpbmVkICkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblxuICAgICAgICAgICAgZGVsdGEgPSBldmVudC53aGVlbERlbHRhO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCAhPT0gdW5kZWZpbmVkICkgeyAvLyBGaXJlZm94XG5cbiAgICAgICAgICAgIGRlbHRhID0gLSBldmVudC5kZXRhaWw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkWm9vbURlbHRhKCBkZWx0YSApO1xuICAgICAgICB0aGlzLm9uVXBkYXRlQ2FsbGJhY2soKTtcblxuICAgIH0sXG5cbiAgICBhZGRab29tRGVsdGE6IGZ1bmN0aW9uICggZGVsdGEgKSB7XG5cbiAgICAgICAgY29uc3QgdW5pZm9ybXMgPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zO1xuICAgICAgICBjb25zdCBsb3dlckJvdW5kID0gdGhpcy5zaXplICogMC4xO1xuICAgICAgICBjb25zdCB1cHBlckJvdW5kID0gdGhpcy5zaXplICogMTA7XG5cbiAgICAgICAgdW5pZm9ybXMuem9vbS52YWx1ZSArPSBkZWx0YTtcblxuICAgICAgICBpZiAoIHVuaWZvcm1zLnpvb20udmFsdWUgPD0gbG93ZXJCb3VuZCApIHtcblxuICAgICAgICAgICAgdW5pZm9ybXMuem9vbS52YWx1ZSA9IGxvd2VyQm91bmQ7XG5cbiAgICAgICAgfSBlbHNlIGlmICggdW5pZm9ybXMuem9vbS52YWx1ZSA+PSB1cHBlckJvdW5kICkge1xuXG4gICAgICAgICAgICB1bmlmb3Jtcy56b29tLnZhbHVlID0gdXBwZXJCb3VuZDtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgb25VcGRhdGVDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuZnJhbWVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMub25VcGRhdGVDYWxsYmFjay5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB0aGlzLnF1YXRTbGVycC5zbGVycCggdGhpcy5xdWF0Q3VyLCAwLjEgKTtcblxuICAgICAgICBpZiAoIHRoaXMubWF0ZXJpYWwgKSB7XG5cbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudHJhbnNmb3JtLnZhbHVlLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCB0aGlzLnF1YXRTbGVycCApO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICggIXRoaXMuZHJhZ2dpbmcgJiYgMS4wIC0gdGhpcy5xdWF0U2xlcnAuY2xvbmUoKS5kb3QoIHRoaXMucXVhdEN1ciApIDwgdGhpcy5FUFMgKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy5mcmFtZUlkICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5xdWF0Q3VyLnNldCggMCwgMCwgMCwgMSApO1xuICAgICAgICB0aGlzLnF1YXRTbGVycC5zZXQoIDAsIDAsIDAsIDEgKTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZUNhbGxiYWNrKCk7XG5cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vdXNlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMub25VcGRhdGVDYWxsYmFjaygpO1xuXHRcdFxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnZGlzYWJsZUNvbnRyb2wnIH0gKTtcblxuICAgICAgICBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgdGV4dHVyZSApO1xuXHRcdFxuICAgIH0sXG5cbiAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyTW91c2VFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnZW5hYmxlQ29udHJvbCcsIGRhdGE6IENPTlRST0xTLk9SQklUIH0gKTtcblxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMuZnJhbWVJZCApO1xuXG4gICAgICAgIEltYWdlUGFub3JhbWEucHJvdG90eXBlLm9uTGVhdmUuY2FsbCggdGhpcyApO1xuXHRcdFxuICAgIH0sXG5cbiAgICBvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZSA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG4gICAgfSxcblxuICAgIG9uQ29udGV4dE1lbnU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1x0XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyTW91c2VFdmVudHMoKTtcblxuICAgICAgICBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSk7XG5cbmV4cG9ydCB7IExpdHRsZVBsYW5ldCB9OyIsImltcG9ydCB7IExpdHRsZVBsYW5ldCB9IGZyb20gJy4vTGl0dGxlUGxhbmV0JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEltYWdlIExpdHRsZSBQbGFuZXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcdFx0LSBVUkwgZm9yIHRoZSBpbWFnZSBzb3VyY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT0xMDAwMF0gLSBTaXplIG9mIHBsYW5lIGdlb21ldHJ5XG4gKiBAcGFyYW0ge251bWJlcn0gW3JhdGlvPTAuNV0gIC0gUmF0aW8gb2YgcGxhbmUgZ2VvbWV0cnkncyBoZWlnaHQgYWdhaW5zdCB3aWR0aFxuICovXG5mdW5jdGlvbiBJbWFnZUxpdHRsZVBsYW5ldCAoIHNvdXJjZSwgc2l6ZSwgcmF0aW8gKSB7XG5cbiAgICBMaXR0bGVQbGFuZXQuY2FsbCggdGhpcywgJ2ltYWdlJywgc291cmNlLCBzaXplLCByYXRpbyApO1xuXG59XG5cbkltYWdlTGl0dGxlUGxhbmV0LnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIExpdHRsZVBsYW5ldC5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IEltYWdlTGl0dGxlUGxhbmV0LFxuXG4gICAgLyoqXG4gICAgICogT24gbG9hZGVkIHdpdGggdGV4dHVyZVxuICAgICAqIEBwYXJhbSB7VEhSRUUuVGV4dHVyZX0gdGV4dHVyZVxuICAgICAqIEBtZW1iZXJPZiBJbWFnZUxpdHRsZVBsYW5ldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTG9hZDogZnVuY3Rpb24gKCB0ZXh0dXJlICkge1xuXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dHVyZSggdGV4dHVyZSApO1xuXG4gICAgICAgIExpdHRsZVBsYW5ldC5wcm90b3R5cGUub25Mb2FkLmNhbGwoIHRoaXMsIHRleHR1cmUgKTtcblxuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRleHR1cmVcbiAgICAgKiBAcGFyYW0ge1RIUkVFLlRleHR1cmV9IHRleHR1cmUgXG4gICAgICogQG1lbWJlck9mIEltYWdlTGl0dGxlUGxhbmV0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdXBkYXRlVGV4dHVyZTogZnVuY3Rpb24gKCB0ZXh0dXJlICkge1xuXG4gICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG5cdFx0XG4gICAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbICd0RGlmZnVzZScgXS52YWx1ZSA9IHRleHR1cmU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzcG9zZVxuICAgICAqIEBtZW1iZXJPZiBJbWFnZUxpdHRsZVBsYW5ldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB0RGlmZnVzZSA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbICd0RGlmZnVzZScgXTtcblxuICAgICAgICBpZiAoIHREaWZmdXNlICYmIHREaWZmdXNlLnZhbHVlICkge1xuXG4gICAgICAgICAgICB0RGlmZnVzZS52YWx1ZS5kaXNwb3NlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIExpdHRsZVBsYW5ldC5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKCB0aGlzICk7XG5cbiAgICB9XG5cbn0gKTtcblxuZXhwb3J0IHsgSW1hZ2VMaXR0bGVQbGFuZXQgfTsiLCJpbXBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4vUGFub3JhbWEnO1xuaW1wb3J0IHsgTWVkaWEgfSBmcm9tICcuLi9tZWRpYS9NZWRpYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBDYW1lcmEgcGFub3JhbWFcbiAqIEBkZXNjcmlwdGlvbiBTZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NZWRpYVN0cmVhbUNvbnN0cmFpbnRzfE1lZGlhU3RyZWFtQ29uc3RyYWludHN9IGZvciBjb25zdHJhaW50c1xuICogQHBhcmFtIHtvYmplY3R9IC0gY2FtZXJhIGNvbnN0cmFpbnRzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FtZXJhUGFub3JhbWEgKCBjb25zdHJhaW50cyApIHtcblxuICAgIGNvbnN0IHJhZGl1cyA9IDUwMDA7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkoIHJhZGl1cywgNjAsIDQwICk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgdmlzaWJsZTogZmFsc2UgfSk7XG5cbiAgICBQYW5vcmFtYS5jYWxsKCB0aGlzLCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuICAgIHRoaXMubWVkaWEgPSBuZXcgTWVkaWEoIGNvbnN0cmFpbnRzICk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdlbnRlcicsIHRoaXMuc3RhcnQuYmluZCggdGhpcyApICk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAnbGVhdmUnLCB0aGlzLnN0b3AuYmluZCggdGhpcyApICk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtY29udGFpbmVyJywgdGhpcy5vblBhbm9sZW5zQ29udGFpbmVyLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLXNjZW5lJywgdGhpcy5vblBhbm9sZW5zU2NlbmUuYmluZCggdGhpcyApICk7XG5cbn1cblxuQ2FtZXJhUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBDYW1lcmFQYW5vcmFtYSxcblxuICAgIC8qKlxuICAgICAqIE9uIGNvbnRhaW5lciBldmVudFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBtZW1iZXJPZiBDYW1lcmFQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uUGFub2xlbnNDb250YWluZXI6IGZ1bmN0aW9uICggeyBjb250YWluZXIgfSApIHtcblxuICAgICAgICB0aGlzLm1lZGlhLnNldENvbnRhaW5lciggY29udGFpbmVyICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24gc2NlbmUgZXZlbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgXG4gICAgICogQG1lbWJlck9mIENhbWVyYVBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25QYW5vbGVuc1NjZW5lOiBmdW5jdGlvbiAoIHsgc2NlbmUgfSApIHtcblxuICAgICAgICB0aGlzLm1lZGlhLnNldFNjZW5lKCBzY2VuZSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGNhbWVyYSBzdHJlYW1pbmdcbiAgICAgKiBAbWVtYmVyT2YgQ2FtZXJhUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhLnN0YXJ0KCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcCBjYW1lcmEgc3RyZWFtaW5nXG4gICAgICogQG1lbWJlck9mIENhbWVyYVBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMubWVkaWEuc3RvcCgpO1xuXG4gICAgfSxcblxufSApO1xuXG5leHBvcnQgeyBDYW1lcmFQYW5vcmFtYSB9OyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIE9yYml0IENvbnRyb2xzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlcm5hbCBPcmJpdENvbnRyb2xzXG4gKiBAcGFyYW0ge1RIUkVFLk9iamVjdH0gb2JqZWN0IFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tRWxlbWVudCBcbiAqL1xuZnVuY3Rpb24gT3JiaXRDb250cm9scyAoIG9iamVjdCwgZG9tRWxlbWVudCApIHtcblxuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMuZG9tRWxlbWVudCA9ICggZG9tRWxlbWVudCAhPT0gdW5kZWZpbmVkICkgPyBkb21FbGVtZW50IDogZG9jdW1lbnQ7XG4gICAgdGhpcy5mcmFtZUlkID0gbnVsbDtcblxuICAgIC8vIEFQSVxuXG4gICAgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIC8qXG4gICAgICogXCJ0YXJnZXRcIiBzZXRzIHRoZSBsb2NhdGlvbiBvZiBmb2N1cywgd2hlcmUgdGhlIGNvbnRyb2wgb3JiaXRzIGFyb3VuZFxuICAgICAqIGFuZCB3aGVyZSBpdCBwYW5zIHdpdGggcmVzcGVjdCB0by5cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgICAvLyBjZW50ZXIgaXMgb2xkLCBkZXByZWNhdGVkOyB1c2UgXCJ0YXJnZXRcIiBpbnN0ZWFkXG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLnRhcmdldDtcblxuICAgIC8qXG4gICAgICogVGhpcyBvcHRpb24gYWN0dWFsbHkgZW5hYmxlcyBkb2xseWluZyBpbiBhbmQgb3V0OyBsZWZ0IGFzIFwiem9vbVwiIGZvclxuICAgICAqIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgICovXG4gICAgdGhpcy5ub1pvb20gPSBmYWxzZTtcbiAgICB0aGlzLnpvb21TcGVlZCA9IDEuMDtcblxuICAgIC8vIExpbWl0cyB0byBob3cgZmFyIHlvdSBjYW4gZG9sbHkgaW4gYW5kIG91dCAoIFBlcnNwZWN0aXZlQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMubWF4RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIC8vIExpbWl0cyB0byBob3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuICAgIHRoaXMubWluWm9vbSA9IDA7XG4gICAgdGhpcy5tYXhab29tID0gSW5maW5pdHk7XG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuICAgIHRoaXMubm9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLnJvdGF0ZVNwZWVkID0gLTAuMTU7XG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoaXMgY29udHJvbFxuICAgIHRoaXMubm9QYW4gPSB0cnVlO1xuICAgIHRoaXMua2V5UGFuU3BlZWQgPSA3LjA7XHQvLyBwaXhlbHMgbW92ZWQgcGVyIGFycm93IGtleSBwdXNoXG5cbiAgICAvLyBTZXQgdG8gdHJ1ZSB0byBhdXRvbWF0aWNhbGx5IHJvdGF0ZSBhcm91bmQgdGhlIHRhcmdldFxuICAgIHRoaXMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuYXV0b1JvdGF0ZVNwZWVkID0gMi4wOyAvLyAzMCBzZWNvbmRzIHBlciByb3VuZCB3aGVuIGZwcyBpcyA2MFxuXG4gICAgLypcbiAgICAgKiBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgdmVydGljYWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAgKiBSYW5nZSBpcyAwIHRvIE1hdGguUEkgcmFkaWFucy5cbiAgICAgKi9cbiAgICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gTW9tZW50dW1cbiAgXHR0aGlzLm1vbWVudHVtRGFtcGluZ0ZhY3RvciA9IDAuOTA7XG4gIFx0dGhpcy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgPSAtMC4wMDU7XG4gIFx0dGhpcy5tb21lbnR1bUtleWRvd25GYWN0b3IgPSAyMDtcblxuICBcdC8vIEZvdlxuICBcdHRoaXMubWluRm92ID0gMzA7XG4gIFx0dGhpcy5tYXhGb3YgPSAxMjA7XG5cbiAgICAvKlxuICAgICAqIEhvdyBmYXIgeW91IGNhbiBvcmJpdCBob3Jpem9udGFsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgICogSWYgc2V0LCBtdXN0IGJlIGEgc3ViLWludGVydmFsIG9mIHRoZSBpbnRlcnZhbCBbIC0gTWF0aC5QSSwgTWF0aC5QSSBdLlxuICAgICAqL1xuICAgIHRoaXMubWluQXppbXV0aEFuZ2xlID0gLSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuICAgIHRoaXMubWF4QXppbXV0aEFuZ2xlID0gSW5maW5pdHk7IC8vIHJhZGlhbnNcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGRpc2FibGUgdXNlIG9mIHRoZSBrZXlzXG4gICAgdGhpcy5ub0tleXMgPSBmYWxzZTtcblxuICAgIC8vIFRoZSBmb3VyIGFycm93IGtleXNcbiAgICB0aGlzLmtleXMgPSB7IExFRlQ6IDM3LCBVUDogMzgsIFJJR0hUOiAzOSwgQk9UVE9NOiA0MCB9O1xuXG4gICAgLy8gTW91c2UgYnV0dG9uc1xuICAgIHRoaXMubW91c2VCdXR0b25zID0geyBPUkJJVDogVEhSRUUuTU9VU0UuTEVGVCwgWk9PTTogVEhSRUUuTU9VU0UuTUlERExFLCBQQU46IFRIUkVFLk1PVVNFLlJJR0hUIH07XG5cbiAgICAvKlxuICAgICAqIC8vLy8vLy8vLy9cbiAgICAgKiBpbnRlcm5hbHNcbiAgICAgKi9cblxuICAgIHZhciBzY29wZSA9IHRoaXM7XG5cbiAgICB2YXIgRVBTID0gMTBlLTg7XG4gICAgdmFyIE1FUFMgPSAxMGUtNTtcblxuICAgIHZhciByb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdmFyIHJvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdmFyIHJvdGF0ZURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuICAgIHZhciBwYW5TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdmFyIHBhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdmFyIHBhbkRlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICB2YXIgcGFuT2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHZhciBvZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgdmFyIGRvbGx5U3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuICAgIHZhciBkb2xseUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdmFyIGRvbGx5RGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4gICAgdmFyIHRoZXRhID0gMDtcbiAgICB2YXIgcGhpID0gMDtcbiAgICB2YXIgcGhpRGVsdGEgPSAwO1xuICAgIHZhciB0aGV0YURlbHRhID0gMDtcbiAgICB2YXIgc2NhbGUgPSAxO1xuICAgIHZhciBwYW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgdmFyIGxhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdmFyIGxhc3RRdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIHZhciBtb21lbnR1bUxlZnQgPSAwLCBtb21lbnR1bVVwID0gMDtcbiAgICB2YXIgZXZlbnRQcmV2aW91cztcbiAgICB2YXIgbW9tZW50dW1PbiA9IGZhbHNlO1xuXG4gICAgdmFyIGtleVVwLCBrZXlCb3R0b20sIGtleUxlZnQsIGtleVJpZ2h0O1xuXG4gICAgdmFyIFNUQVRFID0geyBOT05FOiAtMSwgUk9UQVRFOiAwLCBET0xMWTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX0RPTExZOiA0LCBUT1VDSF9QQU46IDUgfTtcblxuICAgIHZhciBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAvLyBmb3IgcmVzZXRcblxuICAgIHRoaXMudGFyZ2V0MCA9IHRoaXMudGFyZ2V0LmNsb25lKCk7XG4gICAgdGhpcy5wb3NpdGlvbjAgPSB0aGlzLm9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuICAgIHRoaXMuem9vbTAgPSB0aGlzLm9iamVjdC56b29tO1xuXG4gICAgLy8gc28gY2FtZXJhLnVwIGlzIHRoZSBvcmJpdCBheGlzXG5cbiAgICB2YXIgcXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuc2V0RnJvbVVuaXRWZWN0b3JzKCBvYmplY3QudXAsIG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAxLCAwICkgKTtcbiAgICB2YXIgcXVhdEludmVyc2UgPSBxdWF0LmNsb25lKCkuaW52ZXJzZSgpO1xuXG4gICAgLy8gZXZlbnRzXG5cbiAgICB2YXIgY2hhbmdlRXZlbnQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG4gICAgdmFyIHN0YXJ0RXZlbnQgPSB7IHR5cGU6ICdzdGFydCcgfTtcbiAgICB2YXIgZW5kRXZlbnQgPSB7IHR5cGU6ICdlbmQnIH07XG5cbiAgICB0aGlzLnNldExhc3RRdWF0ZXJuaW9uID0gZnVuY3Rpb24gKCBxdWF0ZXJuaW9uICkge1xuICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5KCBxdWF0ZXJuaW9uICk7XG4gICAgICAgIHNjb3BlLm9iamVjdC5xdWF0ZXJuaW9uLmNvcHkoIHF1YXRlcm5pb24gKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRMYXN0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0UG9zaXRpb247XG4gICAgfTtcblxuICAgIHRoaXMucm90YXRlTGVmdCA9IGZ1bmN0aW9uICggYW5nbGUgKSB7XG5cbiAgICAgICAgaWYgKCBhbmdsZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBhbmdsZSA9IGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoZXRhRGVsdGEgLT0gYW5nbGU7XG5cblxuICAgIH07XG5cbiAgICB0aGlzLnJvdGF0ZVVwID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuICAgICAgICBpZiAoIGFuZ2xlID09PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGFuZ2xlID0gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcGhpRGVsdGEgLT0gYW5nbGU7XG5cbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkaXN0YW5jZSBpbiB3b3JsZCBzcGFjZSB0byBtb3ZlIGxlZnRcbiAgICB0aGlzLnBhbkxlZnQgPSBmdW5jdGlvbiAoIGRpc3RhbmNlICkge1xuXG4gICAgICAgIHZhciB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcblxuICAgICAgICAvLyBnZXQgWCBjb2x1bW4gb2YgbWF0cml4XG4gICAgICAgIHBhbk9mZnNldC5zZXQoIHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0gKTtcbiAgICAgICAgcGFuT2Zmc2V0Lm11bHRpcGx5U2NhbGFyKCAtIGRpc3RhbmNlICk7XG5cbiAgICAgICAgcGFuLmFkZCggcGFuT2Zmc2V0ICk7XG5cbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkaXN0YW5jZSBpbiB3b3JsZCBzcGFjZSB0byBtb3ZlIHVwXG4gICAgdGhpcy5wYW5VcCA9IGZ1bmN0aW9uICggZGlzdGFuY2UgKSB7XG5cbiAgICAgICAgdmFyIHRlID0gdGhpcy5vYmplY3QubWF0cml4LmVsZW1lbnRzO1xuXG4gICAgICAgIC8vIGdldCBZIGNvbHVtbiBvZiBtYXRyaXhcbiAgICAgICAgcGFuT2Zmc2V0LnNldCggdGVbIDQgXSwgdGVbIDUgXSwgdGVbIDYgXSApO1xuICAgICAgICBwYW5PZmZzZXQubXVsdGlwbHlTY2FsYXIoIGRpc3RhbmNlICk7XG5cbiAgICAgICAgcGFuLmFkZCggcGFuT2Zmc2V0ICk7XG5cbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBwYXNzIGluIHgseSBvZiBjaGFuZ2UgZGVzaXJlZCBpbiBwaXhlbCBzcGFjZSxcbiAgICAgKiByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcbiAgICAgKi9cbiAgICB0aGlzLnBhbiA9IGZ1bmN0aW9uICggZGVsdGFYLCBkZWx0YVkgKSB7XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSApIHtcblxuICAgICAgICAgICAgLy8gcGVyc3BlY3RpdmVcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHNjb3BlLm9iamVjdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBwb3NpdGlvbi5jbG9uZSgpLnN1Yiggc2NvcGUudGFyZ2V0ICk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0RGlzdGFuY2UgPSBvZmZzZXQubGVuZ3RoKCk7XG5cbiAgICAgICAgICAgIC8vIGhhbGYgb2YgdGhlIGZvdiBpcyBjZW50ZXIgdG8gdG9wIG9mIHNjcmVlblxuICAgICAgICAgICAgdGFyZ2V0RGlzdGFuY2UgKj0gTWF0aC50YW4oICggc2NvcGUub2JqZWN0LmZvdiAvIDIgKSAqIE1hdGguUEkgLyAxODAuMCApO1xuXG4gICAgICAgICAgICAvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XG4gICAgICAgICAgICBzY29wZS5wYW5MZWZ0KCAyICogZGVsdGFYICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xuICAgICAgICAgICAgc2NvcGUucGFuVXAoIDIgKiBkZWx0YVkgKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhICkge1xuXG4gICAgICAgICAgICAvLyBvcnRob2dyYXBoaWNcbiAgICAgICAgICAgIHNjb3BlLnBhbkxlZnQoIGRlbHRhWCAqIChzY29wZS5vYmplY3QucmlnaHQgLSBzY29wZS5vYmplY3QubGVmdCkgLyBlbGVtZW50LmNsaWVudFdpZHRoICk7XG4gICAgICAgICAgICBzY29wZS5wYW5VcCggZGVsdGFZICogKHNjb3BlLm9iamVjdC50b3AgLSBzY29wZS5vYmplY3QuYm90dG9tKSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gY2FtZXJhIG5laXRoZXIgb3J0aG9ncmFwaGljIG9yIHBlcnNwZWN0aXZlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBwYW4gZGlzYWJsZWQuJyApO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGlzLm1vbWVudHVtID0gZnVuY3Rpb24oKXtcblx0XHRcbiAgICAgICAgaWYgKCAhbW9tZW50dW1PbiApIHJldHVybjtcblxuICAgICAgICBpZiAoIE1hdGguYWJzKCBtb21lbnR1bUxlZnQgKSA8IE1FUFMgJiYgTWF0aC5hYnMoIG1vbWVudHVtVXAgKSA8IE1FUFMgKSB7IFxuXG4gICAgICAgICAgICBtb21lbnR1bU9uID0gZmFsc2U7IFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9tZW50dW1VcCAgICo9IHRoaXMubW9tZW50dW1EYW1waW5nRmFjdG9yO1xuICAgICAgICBtb21lbnR1bUxlZnQgKj0gdGhpcy5tb21lbnR1bURhbXBpbmdGYWN0b3I7XG5cbiAgICAgICAgdGhldGFEZWx0YSAtPSB0aGlzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciAqIG1vbWVudHVtTGVmdDtcbiAgICAgICAgcGhpRGVsdGEgICAtPSB0aGlzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciAqIG1vbWVudHVtVXA7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5kb2xseUluID0gZnVuY3Rpb24gKCBkb2xseVNjYWxlICkge1xuXG4gICAgICAgIGlmICggZG9sbHlTY2FsZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBkb2xseVNjYWxlID0gZ2V0Wm9vbVNjYWxlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlIC89IGRvbGx5U2NhbGU7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhICkge1xuXG4gICAgICAgICAgICBzY29wZS5vYmplY3Quem9vbSA9IE1hdGgubWF4KCB0aGlzLm1pblpvb20sIE1hdGgubWluKCB0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gKiBkb2xseVNjYWxlICkgKTtcbiAgICAgICAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybiggJ1dBUk5JTkc6IE9yYml0Q29udHJvbHMuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyApO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGlzLmRvbGx5T3V0ID0gZnVuY3Rpb24gKCBkb2xseVNjYWxlICkge1xuXG4gICAgICAgIGlmICggZG9sbHlTY2FsZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBkb2xseVNjYWxlID0gZ2V0Wm9vbVNjYWxlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlICo9IGRvbGx5U2NhbGU7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhICkge1xuXG4gICAgICAgICAgICBzY29wZS5vYmplY3Quem9vbSA9IE1hdGgubWF4KCB0aGlzLm1pblpvb20sIE1hdGgubWluKCB0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gLyBkb2xseVNjYWxlICkgKTtcbiAgICAgICAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybiggJ1dBUk5JTkc6IE9yYml0Q29udHJvbHMuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyApO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICggaWdub3JlVXBkYXRlICkge1xuXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG4gICAgICAgIG9mZnNldC5jb3B5KCBwb3NpdGlvbiApLnN1YiggdGhpcy50YXJnZXQgKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdCApO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcblxuICAgICAgICB0aGV0YSA9IE1hdGguYXRhbjIoIG9mZnNldC54LCBvZmZzZXQueiApO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20geS1heGlzXG5cbiAgICAgICAgcGhpID0gTWF0aC5hdGFuMiggTWF0aC5zcXJ0KCBvZmZzZXQueCAqIG9mZnNldC54ICsgb2Zmc2V0LnogKiBvZmZzZXQueiApLCBvZmZzZXQueSApO1xuXG4gICAgICAgIGlmICggdGhpcy5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FICkge1xuXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZUxlZnQoIGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb21lbnR1bSgpO1xuXG4gICAgICAgIHRoZXRhICs9IHRoZXRhRGVsdGE7XG4gICAgICAgIHBoaSArPSBwaGlEZWx0YTtcblxuICAgICAgICAvLyByZXN0cmljdCB0aGV0YSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHRoZXRhID0gTWF0aC5tYXgoIHRoaXMubWluQXppbXV0aEFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhBemltdXRoQW5nbGUsIHRoZXRhICkgKTtcblxuICAgICAgICAvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBwaGkgPSBNYXRoLm1heCggdGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhQb2xhckFuZ2xlLCBwaGkgKSApO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWUgRVBTIGFuZCBQSS1FUFNcbiAgICAgICAgcGhpID0gTWF0aC5tYXgoIEVQUywgTWF0aC5taW4oIE1hdGguUEkgLSBFUFMsIHBoaSApICk7XG5cbiAgICAgICAgdmFyIHJhZGl1cyA9IG9mZnNldC5sZW5ndGgoKSAqIHNjYWxlO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWF4KCB0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbiggdGhpcy5tYXhEaXN0YW5jZSwgcmFkaXVzICkgKTtcblxuICAgICAgICAvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cbiAgICAgICAgdGhpcy50YXJnZXQuYWRkKCBwYW4gKTtcblxuICAgICAgICBvZmZzZXQueCA9IHJhZGl1cyAqIE1hdGguc2luKCBwaGkgKSAqIE1hdGguc2luKCB0aGV0YSApO1xuICAgICAgICBvZmZzZXQueSA9IHJhZGl1cyAqIE1hdGguY29zKCBwaGkgKTtcbiAgICAgICAgb2Zmc2V0LnogPSByYWRpdXMgKiBNYXRoLnNpbiggcGhpICkgKiBNYXRoLmNvcyggdGhldGEgKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdEludmVyc2UgKTtcblxuICAgICAgICBwb3NpdGlvbi5jb3B5KCB0aGlzLnRhcmdldCApLmFkZCggb2Zmc2V0ICk7XG5cbiAgICAgICAgdGhpcy5vYmplY3QubG9va0F0KCB0aGlzLnRhcmdldCApO1xuXG4gICAgICAgIHRoZXRhRGVsdGEgPSAwO1xuICAgICAgICBwaGlEZWx0YSA9IDA7XG4gICAgICAgIHNjYWxlID0gMTtcbiAgICAgICAgcGFuLnNldCggMCwgMCwgMCApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIHVwZGF0ZSBjb25kaXRpb24gaXM6XG4gICAgICAgICAqIG1pbihjYW1lcmEgZGlzcGxhY2VtZW50LCBjYW1lcmEgcm90YXRpb24gaW4gcmFkaWFucyleMiA+IEVQU1xuICAgICAgICAgKiB1c2luZyBzbWFsbC1hbmdsZSBhcHByb3hpbWF0aW9uIGNvcyh4LzIpID0gMSAtIHheMiAvIDhcbiAgICAgICAgICovXG4gICAgICAgIGlmICggbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKCB0aGlzLm9iamVjdC5wb3NpdGlvbiApID4gRVBTXG5cdFx0ICAgIHx8IDggKiAoMSAtIGxhc3RRdWF0ZXJuaW9uLmRvdCh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKSkgPiBFUFMgKSB7XG5cbiAgICAgICAgICAgIGlmICggaWdub3JlVXBkYXRlICE9PSB0cnVlICkgeyB0aGlzLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7IH1cblxuICAgICAgICAgICAgbGFzdFBvc2l0aW9uLmNvcHkoIHRoaXMub2JqZWN0LnBvc2l0aW9uICk7XG4gICAgICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5ICh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uICk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgICAgdGhpcy50YXJnZXQuY29weSggdGhpcy50YXJnZXQwICk7XG4gICAgICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkoIHRoaXMucG9zaXRpb24wICk7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSB0aGlzLnpvb20wO1xuXG4gICAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiBwaGk7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBemltdXRoYWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhldGE7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHNjb3BlLmF1dG9Sb3RhdGVTcGVlZDtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvb21TY2FsZSgpIHtcblxuICAgICAgICByZXR1cm4gTWF0aC5wb3coIDAuOTUsIHNjb3BlLnpvb21TcGVlZCApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oIGV2ZW50ICkge1xuXG4gICAgICAgIG1vbWVudHVtT24gPSBmYWxzZTtcblxuICAgXHRcdG1vbWVudHVtTGVmdCA9IG1vbWVudHVtVXAgPSAwO1xuXG4gICAgICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5PUkJJVCApIHtcbiAgICAgICAgICAgIGlmICggc2NvcGUubm9Sb3RhdGUgPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuXG4gICAgICAgICAgICByb3RhdGVTdGFydC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5aT09NICkge1xuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuRE9MTFk7XG5cbiAgICAgICAgICAgIGRvbGx5U3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggZXZlbnQuYnV0dG9uID09PSBzY29wZS5tb3VzZUJ1dHRvbnMuUEFOICkge1xuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcblxuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5QQU47XG5cbiAgICAgICAgICAgIHBhblN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5OT05FICkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS51cGRhdGUoKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuUk9UQVRFICkge1xuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG4gICAgICAgICAgICByb3RhdGVFbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG4gICAgICAgICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKCByb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0ICk7XG5cbiAgICAgICAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgICAgICAgIHNjb3BlLnJvdGF0ZUxlZnQoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXG4gICAgICAgICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgICAgICAgIHNjb3BlLnJvdGF0ZVVwKCAyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG5cbiAgICAgICAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xuXG4gICAgICAgICAgICBpZiggZXZlbnRQcmV2aW91cyApe1xuICAgICAgICAgICAgICAgIG1vbWVudHVtTGVmdCA9IGV2ZW50LmNsaWVudFggLSBldmVudFByZXZpb3VzLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1VcCA9IGV2ZW50LmNsaWVudFkgLSBldmVudFByZXZpb3VzLmNsaWVudFk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50UHJldmlvdXMgPSBldmVudDtcblxuICAgICAgICB9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuRE9MTFkgKSB7XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBkb2xseUVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcbiAgICAgICAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyggZG9sbHlFbmQsIGRvbGx5U3RhcnQgKTtcblxuICAgICAgICAgICAgaWYgKCBkb2xseURlbHRhLnkgPiAwICkge1xuXG4gICAgICAgICAgICAgICAgc2NvcGUuZG9sbHlJbigpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBkb2xseURlbHRhLnkgPCAwICkge1xuXG4gICAgICAgICAgICAgICAgc2NvcGUuZG9sbHlPdXQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2xseVN0YXJ0LmNvcHkoIGRvbGx5RW5kICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc3RhdGUgPT09IFNUQVRFLlBBTiApIHtcblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcblxuICAgICAgICAgICAgcGFuRW5kLnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuICAgICAgICAgICAgcGFuRGVsdGEuc3ViVmVjdG9ycyggcGFuRW5kLCBwYW5TdGFydCApO1xuXG4gICAgICAgICAgICBzY29wZS5wYW4oIHBhbkRlbHRhLngsIHBhbkRlbHRhLnkgKTtcblxuICAgICAgICAgICAgcGFuU3RhcnQuY29weSggcGFuRW5kICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggc3RhdGUgIT09IFNUQVRFLk5PTkUgKSBzY29wZS51cGRhdGUoKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcCggLyogZXZlbnQgKi8gKSB7XG5cbiAgICAgICAgbW9tZW50dW1PbiA9IHRydWU7XG5cbiAgICAgICAgZXZlbnRQcmV2aW91cyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UgKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XG4gICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG4gICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VXaGVlbCggZXZlbnQgKSB7XG5cbiAgICAgICAgaWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSB8fCBzY29wZS5ub1pvb20gPT09IHRydWUgfHwgc3RhdGUgIT09IFNUQVRFLk5PTkUgKSByZXR1cm47XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdmFyIGRlbHRhID0gMDtcblxuICAgICAgICBpZiAoIGV2ZW50LndoZWVsRGVsdGEgIT09IHVuZGVmaW5lZCApIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cbiAgICAgICAgICAgIGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBldmVudC5kZXRhaWwgIT09IHVuZGVmaW5lZCApIHsgLy8gRmlyZWZveFxuXG4gICAgICAgICAgICBkZWx0YSA9IC0gZXZlbnQuZGV0YWlsO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRlbHRhID4gMCApIHtcblxuICAgICAgICAgICAgLy8gc2NvcGUuZG9sbHlPdXQoKTtcbiAgICAgICAgICAgIHNjb3BlLm9iamVjdC5mb3YgPSAoIHNjb3BlLm9iamVjdC5mb3YgPCBzY29wZS5tYXhGb3YgKSBcbiAgICAgICAgICAgICAgICA/IHNjb3BlLm9iamVjdC5mb3YgKyAxXG4gICAgICAgICAgICAgICAgOiBzY29wZS5tYXhGb3Y7XG4gICAgICAgICAgICBzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGRlbHRhIDwgMCApIHtcblxuICAgICAgICAgICAgLy8gc2NvcGUuZG9sbHlJbigpO1xuICAgICAgICAgICAgc2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA+IHNjb3BlLm1pbkZvdiApIFxuICAgICAgICAgICAgICAgID8gc2NvcGUub2JqZWN0LmZvdiAtIDFcbiAgICAgICAgICAgICAgICA6IHNjb3BlLm1pbkZvdjtcbiAgICAgICAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLnVwZGF0ZSgpO1xuICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG4gICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleVVwICggZXZlbnQgKSB7XG5cbiAgICAgICAgc3dpdGNoICggZXZlbnQua2V5Q29kZSApIHtcblxuICAgICAgICBjYXNlIHNjb3BlLmtleXMuVVA6XG4gICAgICAgICAgICBrZXlVcCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLkJPVFRPTTpcbiAgICAgICAgICAgIGtleUJvdHRvbSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLkxFRlQ6XG4gICAgICAgICAgICBrZXlMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHNjb3BlLmtleXMuUklHSFQ6XG4gICAgICAgICAgICBrZXlSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlEb3duKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLm5vS2V5cyA9PT0gdHJ1ZSB8fCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHJldHVybjtcblxuICAgICAgICBzd2l0Y2ggKCBldmVudC5rZXlDb2RlICkge1xuXG4gICAgICAgIGNhc2Ugc2NvcGUua2V5cy5VUDpcbiAgICAgICAgICAgIGtleVVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Ugc2NvcGUua2V5cy5CT1RUT006XG4gICAgICAgICAgICBrZXlCb3R0b20gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLkxFRlQ6XG4gICAgICAgICAgICBrZXlMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Ugc2NvcGUua2V5cy5SSUdIVDpcbiAgICAgICAgICAgIGtleVJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5VXAgfHwga2V5Qm90dG9tIHx8IGtleUxlZnQgfHwga2V5UmlnaHQpIHtcblxuICAgICAgICAgICAgbW9tZW50dW1PbiA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChrZXlVcCkgbW9tZW50dW1VcCA9IC0gc2NvcGUucm90YXRlU3BlZWQgKiBzY29wZS5tb21lbnR1bUtleWRvd25GYWN0b3I7XG4gICAgICAgICAgICBpZiAoa2V5Qm90dG9tKSBtb21lbnR1bVVwID0gc2NvcGUucm90YXRlU3BlZWQgKiBzY29wZS5tb21lbnR1bUtleWRvd25GYWN0b3I7XG4gICAgICAgICAgICBpZiAoa2V5TGVmdCkgbW9tZW50dW1MZWZ0ID0gLSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3RvcjtcbiAgICAgICAgICAgIGlmIChrZXlSaWdodCkgbW9tZW50dW1MZWZ0ID0gc2NvcGUucm90YXRlU3BlZWQgKiBzY29wZS5tb21lbnR1bUtleWRvd25GYWN0b3I7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hzdGFydCggZXZlbnQgKSB7XG5cbiAgICAgICAgbW9tZW50dW1PbiA9IGZhbHNlO1xuXG4gICAgICAgIG1vbWVudHVtTGVmdCA9IG1vbWVudHVtVXAgPSAwO1xuXG4gICAgICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cbiAgICAgICAgc3dpdGNoICggZXZlbnQudG91Y2hlcy5sZW5ndGggKSB7XG5cbiAgICAgICAgY2FzZSAxOlx0Ly8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHJldHVybjtcblxuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cbiAgICAgICAgICAgIHJvdGF0ZVN0YXJ0LnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcdC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfRE9MTFk7XG5cbiAgICAgICAgICAgIHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcbiAgICAgICAgICAgIHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblxuICAgICAgICAgICAgZG9sbHlTdGFydC5zZXQoIDAsIGRpc3RhbmNlICk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gdGhyZWUtZmluZ2VyZWQgdG91Y2g6IHBhblxuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm5vUGFuID09PSB0cnVlICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1BBTjtcblxuICAgICAgICAgICAgcGFuU3RhcnQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5OT05FICkgc2NvcGUuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2htb3ZlKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHZhciBlbGVtZW50ID0gc2NvcGUuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyBzY29wZS5kb21FbGVtZW50LmJvZHkgOiBzY29wZS5kb21FbGVtZW50O1xuXG4gICAgICAgIHN3aXRjaCAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkge1xuXG4gICAgICAgIGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1JvdGF0ZSA9PT0gdHJ1ZSApIHJldHVybjtcbiAgICAgICAgICAgIGlmICggc3RhdGUgIT09IFNUQVRFLlRPVUNIX1JPVEFURSApIHJldHVybjtcblxuICAgICAgICAgICAgcm90YXRlRW5kLnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcbiAgICAgICAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMoIHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQgKTtcblxuICAgICAgICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgICAgICAgc2NvcGUucm90YXRlTGVmdCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG4gICAgICAgICAgICAvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcbiAgICAgICAgICAgIHNjb3BlLnJvdGF0ZVVwKCAyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG5cbiAgICAgICAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xuXG4gICAgICAgICAgICBpZiggZXZlbnRQcmV2aW91cyApe1xuICAgICAgICAgICAgICAgIG1vbWVudHVtTGVmdCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50UHJldmlvdXMucGFnZVg7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1VcCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50UHJldmlvdXMucGFnZVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50UHJldmlvdXMgPSB7XG4gICAgICAgICAgICAgICAgcGFnZVg6IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCxcbiAgICAgICAgICAgICAgICBwYWdlWTogZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUudXBkYXRlKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIHR3by1maW5nZXJlZCB0b3VjaDogZG9sbHlcblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9ET0xMWSApIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuICAgICAgICAgICAgdmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCBkeCAqIGR4ICsgZHkgKiBkeSApO1xuXG4gICAgICAgICAgICBkb2xseUVuZC5zZXQoIDAsIGRpc3RhbmNlICk7XG4gICAgICAgICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoIGRvbGx5RW5kLCBkb2xseVN0YXJ0ICk7XG5cbiAgICAgICAgICAgIGlmICggZG9sbHlEZWx0YS55IDwgMCApIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLm9iamVjdC5mb3YgPSAoIHNjb3BlLm9iamVjdC5mb3YgPCBzY29wZS5tYXhGb3YgKSBcbiAgICAgICAgICAgICAgICAgICAgPyBzY29wZS5vYmplY3QuZm92ICsgMVxuICAgICAgICAgICAgICAgICAgICA6IHNjb3BlLm1heEZvdjtcbiAgICAgICAgICAgICAgICBzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBkb2xseURlbHRhLnkgPiAwICkge1xuXG4gICAgICAgICAgICAgICAgc2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA+IHNjb3BlLm1pbkZvdiApIFxuICAgICAgICAgICAgICAgICAgICA/IHNjb3BlLm9iamVjdC5mb3YgLSAxXG4gICAgICAgICAgICAgICAgICAgIDogc2NvcGUubWluRm92O1xuICAgICAgICAgICAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9sbHlTdGFydC5jb3B5KCBkb2xseUVuZCApO1xuXG4gICAgICAgICAgICBzY29wZS51cGRhdGUoKTtcbiAgICAgICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIHRocmVlLWZpbmdlcmVkIHRvdWNoOiBwYW5cblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcbiAgICAgICAgICAgIGlmICggc3RhdGUgIT09IFNUQVRFLlRPVUNIX1BBTiApIHJldHVybjtcblxuICAgICAgICAgICAgcGFuRW5kLnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcbiAgICAgICAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMoIHBhbkVuZCwgcGFuU3RhcnQgKTtcblxuICAgICAgICAgICAgc2NvcGUucGFuKCBwYW5EZWx0YS54LCBwYW5EZWx0YS55ICk7XG5cbiAgICAgICAgICAgIHBhblN0YXJ0LmNvcHkoIHBhbkVuZCApO1xuXG4gICAgICAgICAgICBzY29wZS51cGRhdGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaGVuZCggLyogZXZlbnQgKi8gKSB7XG5cbiAgICAgICAgbW9tZW50dW1PbiA9IHRydWU7XG5cbiAgICAgICAgZXZlbnRQcmV2aW91cyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG4gICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG4gICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgIH1cblxuICAgIHRoaXMuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24gKTtcbiAgICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXdoZWVsJywgb25Nb3VzZVdoZWVsICk7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnRE9NTW91c2VTY3JvbGwnLCBvbk1vdXNlV2hlZWwgKTtcblxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0ICk7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0b3VjaGVuZCApO1xuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRvdWNobW92ZSApO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5dXAnLCBvbktleVVwICk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIG9uS2V5RG93biApO1xuXG4gICAgfTtcblxuICAgIC8vIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoIGV2ZW50ICkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9LCBmYWxzZSApO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24sIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V3aGVlbCcsIG9uTW91c2VXaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Nb3VzZVNjcm9sbCcsIG9uTW91c2VXaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7IC8vIGZpcmVmb3hcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0b3VjaGVuZCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCB0b3VjaG1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsIG9uS2V5VXAsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIG9uS2V5RG93biwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cbiAgICAvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG59O1xuXG5PcmJpdENvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IE9yYml0Q29udHJvbHNcblxufSApO1xuXG5leHBvcnQgeyBPcmJpdENvbnRyb2xzIH07IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgRGV2aWNlIE9yaWVudGF0aW9uIENvbnRyb2xcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVybmFsIERldmljZU9yaWVudGF0aW9uQ29udHJvbHNcbiAqIEBwYXJhbSB7VEhSRUUuQ2FtZXJhfSBjYW1lcmEgXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21FbGVtZW50IFxuICovXG5mdW5jdGlvbiBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzICggY2FtZXJhLCBkb21FbGVtZW50ICkge1xuXG4gICAgdmFyIHNjb3BlID0gdGhpcztcbiAgICB2YXIgY2hhbmdlRXZlbnQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cbiAgICB2YXIgcm90WSA9IDA7XG4gICAgdmFyIHJvdFggPSAwO1xuICAgIHZhciB0ZW1wWCA9IDA7XG4gICAgdmFyIHRlbXBZID0gMDtcblxuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMuY2FtZXJhLnJvdGF0aW9uLnJlb3JkZXIoICdZWFonICk7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gKCBkb21FbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGRvbUVsZW1lbnQgOiBkb2N1bWVudDtcblxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICB0aGlzLmRldmljZU9yaWVudGF0aW9uID0ge307XG4gICAgdGhpcy5zY3JlZW5PcmllbnRhdGlvbiA9IDA7XG5cbiAgICB0aGlzLmFscGhhID0gMDtcbiAgICB0aGlzLmFscGhhT2Zmc2V0QW5nbGUgPSAwO1xuXG5cbiAgICB2YXIgb25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG4gICAgICAgIHNjb3BlLmRldmljZU9yaWVudGF0aW9uID0gZXZlbnQ7XG5cbiAgICB9O1xuXG4gICAgdmFyIG9uU2NyZWVuT3JpZW50YXRpb25DaGFuZ2VFdmVudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID0gd2luZG93Lm9yaWVudGF0aW9uIHx8IDA7XG5cbiAgICB9O1xuXG4gICAgdmFyIG9uVG91Y2hTdGFydEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGVtcFggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVg7XG4gICAgICAgIHRlbXBZID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZO1xuXG4gICAgfTtcblxuICAgIHZhciBvblRvdWNoTW92ZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgcm90WSArPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIHRlbXBYICkgLyA0ICk7XG4gICAgICAgIHJvdFggKz0gVEhSRUUuTWF0aC5kZWdUb1JhZCggKCB0ZW1wWSAtIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApIC8gNCApO1xuXG4gICAgICAgIHNjb3BlLnVwZGF0ZUFscGhhT2Zmc2V0QW5nbGUoIHJvdFkgKTtcblxuICAgICAgICB0ZW1wWCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWDtcbiAgICAgICAgdGVtcFkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVk7XG5cbiAgICB9O1xuXG4gICAgLy8gVGhlIGFuZ2xlcyBhbHBoYSwgYmV0YSBhbmQgZ2FtbWEgZm9ybSBhIHNldCBvZiBpbnRyaW5zaWMgVGFpdC1CcnlhbiBhbmdsZXMgb2YgdHlwZSBaLVgnLVknJ1xuXG4gICAgdmFyIHNldENhbWVyYVF1YXRlcm5pb24gPSBmdW5jdGlvbiggcXVhdGVybmlvbiwgYWxwaGEsIGJldGEsIGdhbW1hLCBvcmllbnQgKSB7XG5cbiAgICAgICAgdmFyIHplZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAwLCAxICk7XG5cbiAgICAgICAgdmFyIGV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5cbiAgICAgICAgdmFyIHEwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgICAgICB2YXIgcTEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbiggLSBNYXRoLnNxcnQoIDAuNSApLCAwLCAwLCBNYXRoLnNxcnQoIDAuNSApICk7IC8vIC0gUEkvMiBhcm91bmQgdGhlIHgtYXhpc1xuXG4gICAgICAgIHZhciB2ZWN0b3JGaW5nZXJZO1xuICAgICAgICB2YXIgZmluZ2VyUVkgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgICAgICB2YXIgZmluZ2VyUVggPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gICAgICAgIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gMCApIHtcblxuICAgICAgICAgICAgdmVjdG9yRmluZ2VyWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAxLCAwLCAwICk7XG4gICAgICAgICAgICBmaW5nZXJRWS5zZXRGcm9tQXhpc0FuZ2xlKCB2ZWN0b3JGaW5nZXJZLCAtcm90WCApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID09IDE4MCApIHtcblxuICAgICAgICAgICAgdmVjdG9yRmluZ2VyWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAxLCAwLCAwICk7XG4gICAgICAgICAgICBmaW5nZXJRWS5zZXRGcm9tQXhpc0FuZ2xlKCB2ZWN0b3JGaW5nZXJZLCByb3RYICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gOTAgKSB7XG5cbiAgICAgICAgICAgIHZlY3RvckZpbmdlclkgPSBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMSwgMCApO1xuICAgICAgICAgICAgZmluZ2VyUVkuc2V0RnJvbUF4aXNBbmdsZSggdmVjdG9yRmluZ2VyWSwgcm90WCApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID09IC0gOTApIHtcblxuICAgICAgICAgICAgdmVjdG9yRmluZ2VyWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAxLCAwICk7XG4gICAgICAgICAgICBmaW5nZXJRWS5zZXRGcm9tQXhpc0FuZ2xlKCB2ZWN0b3JGaW5nZXJZLCAtcm90WCApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBxMS5tdWx0aXBseSggZmluZ2VyUVkgKTtcbiAgICAgICAgcTEubXVsdGlwbHkoIGZpbmdlclFYICk7XG5cbiAgICAgICAgZXVsZXIuc2V0KCBiZXRhLCBhbHBoYSwgLSBnYW1tYSwgJ1lYWicgKTsgLy8gJ1pYWScgZm9yIHRoZSBkZXZpY2UsIGJ1dCAnWVhaJyBmb3IgdXNcblxuICAgICAgICBxdWF0ZXJuaW9uLnNldEZyb21FdWxlciggZXVsZXIgKTsgLy8gb3JpZW50IHRoZSBkZXZpY2VcblxuICAgICAgICBxdWF0ZXJuaW9uLm11bHRpcGx5KCBxMSApOyAvLyBjYW1lcmEgbG9va3Mgb3V0IHRoZSBiYWNrIG9mIHRoZSBkZXZpY2UsIG5vdCB0aGUgdG9wXG5cbiAgICAgICAgcXVhdGVybmlvbi5tdWx0aXBseSggcTAuc2V0RnJvbUF4aXNBbmdsZSggemVlLCAtIG9yaWVudCApICk7IC8vIGFkanVzdCBmb3Igc2NyZWVuIG9yaWVudGF0aW9uXG5cbiAgICB9O1xuXG4gICAgdGhpcy5jb25uZWN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgb25TY3JlZW5PcmllbnRhdGlvbkNoYW5nZUV2ZW50KCk7IC8vIHJ1biBvbmNlIG9uIGxvYWRcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgb25TY3JlZW5PcmllbnRhdGlvbkNoYW5nZUV2ZW50LCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2RldmljZW9yaWVudGF0aW9uJywgb25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZUV2ZW50LCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy51cGRhdGUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuXG4gICAgICAgIHNjb3BlLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnRFdmVudCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG4gICAgICAgIHNjb3BlLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlRXZlbnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG4gICAgICAgIHNjb3BlLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIHRoaXMuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvblNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlRXZlbnQsIGZhbHNlICk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCBvbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlRXZlbnQsIGZhbHNlICk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICksIGZhbHNlICk7XG5cbiAgICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydEV2ZW50LCBmYWxzZSApO1xuICAgICAgICBzY29wZS5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZUV2ZW50LCBmYWxzZSApO1xuXG4gICAgICAgIHNjb3BlLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCBpZ25vcmVVcGRhdGUgKSB7XG5cbiAgICAgICAgaWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuICAgICAgICB2YXIgYWxwaGEgPSBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5hbHBoYSA/IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmFscGhhICkgKyBzY29wZS5hbHBoYU9mZnNldEFuZ2xlIDogMDsgLy8gWlxuICAgICAgICB2YXIgYmV0YSA9IHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmJldGEgPyBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5iZXRhICkgOiAwOyAvLyBYJ1xuICAgICAgICB2YXIgZ2FtbWEgPSBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5nYW1tYSA/IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmdhbW1hICkgOiAwOyAvLyBZJydcbiAgICAgICAgdmFyIG9yaWVudCA9IHNjb3BlLnNjcmVlbk9yaWVudGF0aW9uID8gVEhSRUUuTWF0aC5kZWdUb1JhZCggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gKSA6IDA7IC8vIE9cblxuICAgICAgICBzZXRDYW1lcmFRdWF0ZXJuaW9uKCBzY29wZS5jYW1lcmEucXVhdGVybmlvbiwgYWxwaGEsIGJldGEsIGdhbW1hLCBvcmllbnQgKTtcbiAgICAgICAgc2NvcGUuYWxwaGEgPSBhbHBoYTtcblxuICAgICAgICBpZiAoIGlnbm9yZVVwZGF0ZSAhPT0gdHJ1ZSApIHsgc2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTsgfVxuXG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlQWxwaGFPZmZzZXRBbmdsZSA9IGZ1bmN0aW9uKCBhbmdsZSApIHtcblxuICAgICAgICB0aGlzLmFscGhhT2Zmc2V0QW5nbGUgPSBhbmdsZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgIH07XG5cbiAgICB0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcblxuICAgIH07XG5cbiAgICB0aGlzLmNvbm5lY3QoKTtcblxufTtcblxuRGV2aWNlT3JpZW50YXRpb25Db250cm9scy5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlKSwge1xuXG4gICAgY29uc3RydWN0b3I6IERldmljZU9yaWVudGF0aW9uQ29udHJvbHNcblxufSApO1xuXG5leHBvcnQgeyBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzIH07IiwiXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBHb29nbGUgQ2FyZGJvYXJkIEVmZmVjdCBDb21wb3NlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZXJuYWwgQ2FyZGJvYXJkRWZmZWN0XG4gKiBAcGFyYW0ge1RIUkVFLldlYkdMUmVuZGVyZXJ9IHJlbmRlcmVyIFxuICovXG5mdW5jdGlvbiBDYXJkYm9hcmRFZmZlY3QgKCByZW5kZXJlciApIHtcblxuICAgIHZhciBfY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSggLSAxLCAxLCAxLCAtIDEsIDAsIDEgKTtcblxuICAgIHZhciBfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgIHZhciBfc3RlcmVvID0gbmV3IFRIUkVFLlN0ZXJlb0NhbWVyYSgpO1xuICAgIF9zdGVyZW8uYXNwZWN0ID0gMC41O1xuXG4gICAgdmFyIF9wYXJhbXMgPSB7IG1pbkZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLCBtYWdGaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsIGZvcm1hdDogVEhSRUUuUkdCQUZvcm1hdCB9O1xuXG4gICAgdmFyIF9yZW5kZXJUYXJnZXQgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQoIDUxMiwgNTEyLCBfcGFyYW1zICk7XG4gICAgX3JlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IHRydWU7XG4gICAgX3JlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgKiBEaXN0b3J0aW9uIE1lc2ggcG9ydGVkIGZyb206XG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL2JvcmlzbXVzL3dlYnZyLWJvaWxlcnBsYXRlL2Jsb2IvbWFzdGVyL3NyYy9kaXN0b3J0aW9uL2JhcnJlbC1kaXN0b3J0aW9uLWZyYWdtZW50LmpzXG4gICAgICovXG5cbiAgICB2YXIgZGlzdG9ydGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCAwLjQ0MSwgMC4xNTYgKTtcblxuICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAxLCAxLCAxMCwgMjAgKS5yZW1vdmVBdHRyaWJ1dGUoICdub3JtYWwnICkudG9Ob25JbmRleGVkKCk7XG5cbiAgICB2YXIgcG9zaXRpb25zID0gZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcbiAgICB2YXIgdXZzID0gZ2VvbWV0cnkuYXR0cmlidXRlcy51di5hcnJheTtcblxuICAgIC8vIGR1cGxpY2F0ZVxuICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQgKj0gMjtcbiAgICBnZW9tZXRyeS5hdHRyaWJ1dGVzLnV2LmNvdW50ICo9IDI7XG5cbiAgICB2YXIgcG9zaXRpb25zMiA9IG5ldyBGbG9hdDMyQXJyYXkoIHBvc2l0aW9ucy5sZW5ndGggKiAyICk7XG4gICAgcG9zaXRpb25zMi5zZXQoIHBvc2l0aW9ucyApO1xuICAgIHBvc2l0aW9uczIuc2V0KCBwb3NpdGlvbnMsIHBvc2l0aW9ucy5sZW5ndGggKTtcblxuICAgIHZhciB1dnMyID0gbmV3IEZsb2F0MzJBcnJheSggdXZzLmxlbmd0aCAqIDIgKTtcbiAgICB1dnMyLnNldCggdXZzICk7XG4gICAgdXZzMi5zZXQoIHV2cywgdXZzLmxlbmd0aCApO1xuXG4gICAgdmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdmFyIGxlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGggLyAzO1xuXG4gICAgZm9yICggdmFyIGkgPSAwLCBsID0gcG9zaXRpb25zMi5sZW5ndGggLyAzOyBpIDwgbDsgaSArKyApIHtcblxuICAgICAgICB2ZWN0b3IueCA9IHBvc2l0aW9uczJbIGkgKiAzICsgMCBdO1xuICAgICAgICB2ZWN0b3IueSA9IHBvc2l0aW9uczJbIGkgKiAzICsgMSBdO1xuXG4gICAgICAgIHZhciBkb3QgPSB2ZWN0b3IuZG90KCB2ZWN0b3IgKTtcbiAgICAgICAgdmFyIHNjYWxhciA9IDEuNSArICggZGlzdG9ydGlvbi54ICsgZGlzdG9ydGlvbi55ICogZG90ICkgKiBkb3Q7XG5cbiAgICAgICAgdmFyIG9mZnNldCA9IGkgPCBsZW5ndGggPyAwIDogMTtcblxuICAgICAgICBwb3NpdGlvbnMyWyBpICogMyArIDAgXSA9ICggdmVjdG9yLnggLyBzY2FsYXIgKSAqIDEuNSAtIDAuNSArIG9mZnNldDtcbiAgICAgICAgcG9zaXRpb25zMlsgaSAqIDMgKyAxIF0gPSAoIHZlY3Rvci55IC8gc2NhbGFyICkgKiAzLjA7XG5cbiAgICAgICAgdXZzMlsgaSAqIDIgXSA9ICggdXZzMlsgaSAqIDIgXSArIG9mZnNldCApICogMC41O1xuXG4gICAgfVxuXG4gICAgZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheSA9IHBvc2l0aW9uczI7XG4gICAgZ2VvbWV0cnkuYXR0cmlidXRlcy51di5hcnJheSA9IHV2czI7XG5cbiAgICAvL1xuXG4gICAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IG1hcDogX3JlbmRlclRhcmdldC50ZXh0dXJlIH0gKTtcbiAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcbiAgICBfc2NlbmUuYWRkKCBtZXNoICk7XG5cbiAgICAvL1xuXG4gICAgdGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblxuICAgICAgICBfcmVuZGVyVGFyZ2V0LnNldFNpemUoIHdpZHRoICogcGl4ZWxSYXRpbywgaGVpZ2h0ICogcGl4ZWxSYXRpbyApO1xuXG4gICAgfTtcblxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG4gICAgICAgIHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cbiAgICAgICAgaWYgKCBjYW1lcmEucGFyZW50ID09PSBudWxsICkgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cbiAgICAgICAgX3N0ZXJlby51cGRhdGUoIGNhbWVyYSApO1xuXG4gICAgICAgIHZhciB3aWR0aCA9IF9yZW5kZXJUYXJnZXQud2lkdGggLyAyO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gX3JlbmRlclRhcmdldC5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXG4gICAgICAgIF9yZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIDAsIDAsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgX3JlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIDAsIDAsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBfcmVuZGVyVGFyZ2V0ICk7XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIF9zdGVyZW8uY2FtZXJhTCApO1xuXG4gICAgICAgIHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcblxuICAgICAgICBfcmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCB3aWR0aCwgMCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICBfcmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggd2lkdGgsIDAsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBfcmVuZGVyVGFyZ2V0ICk7XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIF9zdGVyZW8uY2FtZXJhUiApO1xuXG4gICAgICAgIHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcblxuICAgICAgICByZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIG51bGwgKTtcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKCBfc2NlbmUsIF9jYW1lcmEgKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgeyBDYXJkYm9hcmRFZmZlY3QgfTsiLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBTdGVyZW8gRWZmZWN0IENvbXBvc2VyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlcm5hbCBTdGVyZW9FZmZlY3RcbiAqIEBwYXJhbSB7VEhSRUUuV2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgXG4gKi9cbmNvbnN0IFN0ZXJlb0VmZmVjdCA9IGZ1bmN0aW9uICggcmVuZGVyZXIgKSB7XG5cbiAgICB2YXIgX3N0ZXJlbyA9IG5ldyBUSFJFRS5TdGVyZW9DYW1lcmEoKTtcbiAgICBfc3RlcmVvLmFzcGVjdCA9IDAuNTtcbiAgICB2YXIgc2l6ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbiAgICB0aGlzLnNldEV5ZVNlcGFyYXRpb24gPSBmdW5jdGlvbiAoIGV5ZVNlcCApIHtcblxuICAgICAgICBfc3RlcmVvLmV5ZVNlcCA9IGV5ZVNlcDtcblxuICAgIH07XG5cbiAgICB0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCApO1xuXG4gICAgfTtcblxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG4gICAgICAgIHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cbiAgICAgICAgaWYgKCBjYW1lcmEucGFyZW50ID09PSBudWxsICkgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cbiAgICAgICAgX3N0ZXJlby51cGRhdGUoIGNhbWVyYSApO1xuXG4gICAgICAgIHJlbmRlcmVyLmdldFNpemUoIHNpemUgKTtcblxuICAgICAgICBpZiAoIHJlbmRlcmVyLmF1dG9DbGVhciApIHJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCB0cnVlICk7XG5cbiAgICAgICAgcmVuZGVyZXIuc2V0U2Npc3NvciggMCwgMCwgc2l6ZS53aWR0aCAvIDIsIHNpemUuaGVpZ2h0ICk7XG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KCAwLCAwLCBzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgX3N0ZXJlby5jYW1lcmFMICk7XG5cbiAgICAgICAgcmVuZGVyZXIuc2V0U2Npc3Nvciggc2l6ZS53aWR0aCAvIDIsIDAsIHNpemUud2lkdGggLyAyLCBzaXplLmhlaWdodCApO1xuICAgICAgICByZW5kZXJlci5zZXRWaWV3cG9ydCggc2l6ZS53aWR0aCAvIDIsIDAsIHNpemUud2lkdGggLyAyLCBzaXplLmhlaWdodCApO1xuICAgICAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBfc3RlcmVvLmNhbWVyYVIgKTtcblxuICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yVGVzdCggZmFsc2UgKTtcblxuICAgIH07XG5cbn07XG5cbmV4cG9ydCB7IFN0ZXJlb0VmZmVjdCB9OyIsImltcG9ydCB7IE1PREVTLCBDT05UUk9MUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vbGliL2NvbnRyb2xzL09yYml0Q29udHJvbHMnO1xuaW1wb3J0IHsgRGV2aWNlT3JpZW50YXRpb25Db250cm9scyB9IGZyb20gJy4uL2xpYi9jb250cm9scy9EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzJztcbmltcG9ydCB7IENhcmRib2FyZEVmZmVjdCB9IGZyb20gJy4uL2xpYi9lZmZlY3RzL0NhcmRib2FyZEVmZmVjdCc7XG5pbXBvcnQgeyBTdGVyZW9FZmZlY3QgfSBmcm9tICcuLi9saWIvZWZmZWN0cy9TdGVyZW9FZmZlY3QnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vd2lkZ2V0L1dpZGdldCc7XG5pbXBvcnQgeyBSZXRpY2xlIH0gZnJvbSAnLi4vaW50ZXJmYWNlL1JldGljbGUnO1xuaW1wb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuLi9wYW5vcmFtYS9QYW5vcmFtYSc7XG5pbXBvcnQgeyBWaWRlb1Bhbm9yYW1hIH0gZnJvbSAnLi4vcGFub3JhbWEvVmlkZW9QYW5vcmFtYSc7XG5pbXBvcnQgeyBDYW1lcmFQYW5vcmFtYSB9IGZyb20gJy4uL3Bhbm9yYW1hL0NhbWVyYVBhbm9yYW1hJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCBUV0VFTiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcyc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBWaWV3ZXIgY29udGFpbnMgcHJlLWRlZmluZWQgc2NlbmUsIGNhbWVyYSBhbmQgcmVuZGVyZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFVzZSBjdXN0b20gb3IgZGVmYXVsdCBjb25maWcgb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMuY29udGFpbmVyXSAtIEEgSFRNTEVsZW1lbnQgdG8gaG9zdCB0aGUgY2FudmFzXG4gKiBAcGFyYW0ge1RIUkVFLlNjZW5lfSBbb3B0aW9ucy5zY2VuZT1USFJFRS5TY2VuZV0gLSBBIFRIUkVFLlNjZW5lIHdoaWNoIGNvbnRhaW5zIHBhbm9yYW1hIGFuZCAzRCBvYmplY3RzXG4gKiBAcGFyYW0ge1RIUkVFLkNhbWVyYX0gW29wdGlvbnMuY2FtZXJhPVRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhXSAtIEEgVEhSRUUuQ2FtZXJhIHRvIHZpZXcgdGhlIHNjZW5lXG4gKiBAcGFyYW0ge1RIUkVFLldlYkdMUmVuZGVyZXJ9IFtvcHRpb25zLnJlbmRlcmVyPVRIUkVFLldlYkdMUmVuZGVyZXJdIC0gQSBUSFJFRS5XZWJHTFJlbmRlcmVyIHRvIHJlbmRlciBjYW52YXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY29udHJvbEJhcj10cnVlXSAtIFNob3cvaGlkZSBjb250cm9sIGJhciBvbiB0aGUgYm90dG9tIG9mIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSB7YXJyYXl9ICAgW29wdGlvbnMuY29udHJvbEJ1dHRvbnM9W11dIC0gQnV0dG9uIG5hbWVzIHRvIG1vdW50IG9uIGNvbnRyb2xCYXIgaWYgY29udHJvbEJhciBleGlzdHMsIERlZmF1bHRzIHRvIFsnZnVsbHNjcmVlbicsICdzZXR0aW5nJywgJ3ZpZGVvJ11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b0hpZGVDb250cm9sQmFyPWZhbHNlXSAtIEF1dG8gaGlkZSBjb250cm9sIGJhciB3aGVuIGNsaWNrIG9uIG5vbi1hY3RpdmUgYXJlYVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvSGlkZUluZm9zcG90PXRydWVdIC0gQXV0byBoaWRlIGluZm9zcG90cyB3aGVuIGNsaWNrIG9uIG5vbi1hY3RpdmUgYXJlYVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5ob3Jpem9udGFsVmlldz1mYWxzZV0gLSBBbGxvdyBvbmx5IGhvcml6b250YWwgY2FtZXJhIGNvbnRyb2xcbiAqIEBwYXJhbSB7bnVtYmVyfSAgW29wdGlvbnMuY2xpY2tUb2xlcmFuY2U9MTBdIC0gRGlzdGFuY2UgdG9sZXJhbmNlIHRvIHRpZ2dlciBjbGljayAvIHRhcCBldmVudFxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5jYW1lcmFGb3Y9NjBdIC0gQ2FtZXJhIGZpZWxkIG9mIHZpZXcgdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZURyYWdnaW5nPWZhbHNlXSAtIFJldmVyc2UgZHJhZ2dpbmcgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmVuYWJsZVJldGljbGU9ZmFsc2VdIC0gRW5hYmxlIHJldGljbGUgZm9yIG1vdXNlbGVzcyBpbnRlcmFjdGlvbiBvdGhlciB0aGFuIFZSIG1vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSAgW29wdGlvbnMuZHdlbGxUaW1lPTE1MDBdIC0gRHdlbGwgdGltZSBmb3IgcmV0aWNsZSBzZWxlY3Rpb24gaW4gbXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b1JldGljbGVTZWxlY3Q9dHJ1ZV0gLSBBdXRvIHNlbGVjdCBhIGNsaWNrYWJsZSB0YXJnZXQgYWZ0ZXIgZHdlbGxUaW1lXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpZXdJbmRpY2F0b3I9ZmFsc2VdIC0gQWRkcyBhbiBhbmdsZSB2aWV3IGluZGljYXRvciBpbiB1cHBlciBsZWZ0IGNvcm5lclxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5pbmRpY2F0b3JTaXplPTMwXSAtIFNpemUgb2YgVmlldyBJbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSAgW29wdGlvbnMub3V0cHV0PSdub25lJ10gLSBXaGV0aGVyIGFuZCB3aGVyZSB0byBvdXRwdXQgcmF5Y2FzdCBwb3NpdGlvbi4gQ291bGQgYmUgJ2NvbnNvbGUnIG9yICdvdmVybGF5J1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvUm90YXRlPWZhbHNlXSAtIEF1dG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmF1dG9Sb3RhdGVTcGVlZD0yLjBdIC0gQXV0byByb3RhdGUgc3BlZWQgYXMgaW4gZGVncmVlIHBlciBzZWNvbmQuIFBvc2l0aXZlIGlzIGNvdW50ZXItY2xvY2t3aXNlIGFuZCBuZWdhdGl2ZSBpcyBjbG9ja3dpc2UuXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmF1dG9Sb3RhdGVBY3RpdmF0aW9uRHVyYXRpb249NTAwMF0gLSBEdXJhdGlvbiBiZWZvcmUgYXV0byByb3RhdGF0aW9uIHdoZW4gbm8gdXNlciBpbnRlcmFjdGl2aXR5IGluIG1zXG4gKi9cbmZ1bmN0aW9uIFZpZXdlciAoIG9wdGlvbnMgKSB7XG5cbiAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5jb250cm9sQmFyID0gb3B0aW9ucy5jb250cm9sQmFyICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNvbnRyb2xCYXIgOiB0cnVlO1xuICAgIG9wdGlvbnMuY29udHJvbEJ1dHRvbnMgPSBvcHRpb25zLmNvbnRyb2xCdXR0b25zIHx8IFsgJ2Z1bGxzY3JlZW4nLCAnc2V0dGluZycsICd2aWRlbycgXTtcbiAgICBvcHRpb25zLmF1dG9IaWRlQ29udHJvbEJhciA9IG9wdGlvbnMuYXV0b0hpZGVDb250cm9sQmFyICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmF1dG9IaWRlQ29udHJvbEJhciA6IGZhbHNlO1xuICAgIG9wdGlvbnMuYXV0b0hpZGVJbmZvc3BvdCA9IG9wdGlvbnMuYXV0b0hpZGVJbmZvc3BvdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5hdXRvSGlkZUluZm9zcG90IDogdHJ1ZTtcbiAgICBvcHRpb25zLmhvcml6b250YWxWaWV3ID0gb3B0aW9ucy5ob3Jpem9udGFsVmlldyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5ob3Jpem9udGFsVmlldyA6IGZhbHNlO1xuICAgIG9wdGlvbnMuY2xpY2tUb2xlcmFuY2UgPSBvcHRpb25zLmNsaWNrVG9sZXJhbmNlIHx8IDEwO1xuICAgIG9wdGlvbnMuY2FtZXJhRm92ID0gb3B0aW9ucy5jYW1lcmFGb3YgfHwgNjA7XG4gICAgb3B0aW9ucy5yZXZlcnNlRHJhZ2dpbmcgPSBvcHRpb25zLnJldmVyc2VEcmFnZ2luZyB8fCBmYWxzZTtcbiAgICBvcHRpb25zLmVuYWJsZVJldGljbGUgPSBvcHRpb25zLmVuYWJsZVJldGljbGUgfHwgZmFsc2U7XG4gICAgb3B0aW9ucy5kd2VsbFRpbWUgPSBvcHRpb25zLmR3ZWxsVGltZSB8fCAxNTAwO1xuICAgIG9wdGlvbnMuYXV0b1JldGljbGVTZWxlY3QgPSBvcHRpb25zLmF1dG9SZXRpY2xlU2VsZWN0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmF1dG9SZXRpY2xlU2VsZWN0IDogdHJ1ZTtcbiAgICBvcHRpb25zLnZpZXdJbmRpY2F0b3IgPSBvcHRpb25zLnZpZXdJbmRpY2F0b3IgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMudmlld0luZGljYXRvciA6IGZhbHNlO1xuICAgIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSA9IG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSB8fCAzMDtcbiAgICBvcHRpb25zLm91dHB1dCA9IG9wdGlvbnMub3V0cHV0ID8gb3B0aW9ucy5vdXRwdXQgOiAnbm9uZSc7XG4gICAgb3B0aW9ucy5hdXRvUm90YXRlID0gb3B0aW9ucy5hdXRvUm90YXRlIHx8IGZhbHNlO1xuICAgIG9wdGlvbnMuYXV0b1JvdGF0ZVNwZWVkID0gb3B0aW9ucy5hdXRvUm90YXRlU3BlZWQgfHwgMi4wO1xuICAgIG9wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbiA9IG9wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbiB8fCA1MDAwO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8qXG4gICAgICogQ1NTIEljb25cbiAgICAgKiBjb25zdCBzdHlsZUxvYWRlciA9IG5ldyBTdHlsZUxvYWRlcigpO1xuICAgICAqIHN0eWxlTG9hZGVyLmluamVjdCggJ2ljb25vJyApO1xuICAgICAqL1xuXG4gICAgLy8gQ29udGFpbmVyXG4gICAgaWYgKCBvcHRpb25zLmNvbnRhaW5lciApIHtcblxuICAgICAgICBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyLl93aWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29udGFpbmVyLl9oZWlnaHQgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCggJ3Bhbm9sZW5zLWNvbnRhaW5lcicgKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICBjb250YWluZXIuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNvbnRhaW5lci5faGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBjb250YWluZXIgKTtcblxuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5jYW1lcmEgPSBvcHRpb25zLmNhbWVyYSB8fCBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIHRoaXMub3B0aW9ucy5jYW1lcmFGb3YsIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0LCAxLCAxMDAwMCApO1xuICAgIHRoaXMuc2NlbmUgPSBvcHRpb25zLnNjZW5lIHx8IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBvcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB7IGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IGZhbHNlIH0gKTtcbiAgICB0aGlzLnNjZW5lUmV0aWNsZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgdGhpcy52aWV3SW5kaWNhdG9yU2l6ZSA9IHRoaXMub3B0aW9ucy5pbmRpY2F0b3JTaXplO1xuXG4gICAgdGhpcy5yZXRpY2xlID0ge307XG4gICAgdGhpcy50ZW1wRW5hYmxlUmV0aWNsZSA9IHRoaXMub3B0aW9ucy5lbmFibGVSZXRpY2xlO1xuXG4gICAgdGhpcy5tb2RlID0gTU9ERVMuTk9STUFMO1xuXG4gICAgdGhpcy5wYW5vcmFtYSA9IG51bGw7XG4gICAgdGhpcy53aWRnZXQgPSBudWxsO1xuXG4gICAgdGhpcy5ob3Zlck9iamVjdCA9IG51bGw7XG4gICAgdGhpcy5pbmZvc3BvdCA9IG51bGw7XG4gICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdCA9IG51bGw7XG4gICAgdGhpcy5wcmVzc09iamVjdCA9IG51bGw7XG5cbiAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcbiAgICB0aGlzLnJheWNhc3RlclBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICB0aGlzLnVzZXJNb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdGhpcy51cGRhdGVDYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25JZCA9IG51bGw7XG5cbiAgICB0aGlzLmNhbWVyYUZydXN0dW0gPSBuZXcgVEhSRUUuRnJ1c3R1bSgpO1xuICAgIHRoaXMuY2FtZXJhVmlld1Byb2plY3Rpb25NYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gICAgdGhpcy5hdXRvUm90YXRlUmVxdWVzdElkID0gbnVsbDtcblxuICAgIHRoaXMub3V0cHV0RGl2RWxlbWVudCA9IG51bGw7XG5cbiAgICB0aGlzLnRvdWNoU3VwcG9ydGVkID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaDtcblxuICAgIC8vIEhhbmRsZXIgcmVmZXJlbmNlc1xuICAgIHRoaXMuSEFORExFUl9NT1VTRV9ET1dOID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5IQU5ETEVSX01PVVNFX1VQID0gdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApO1xuICAgIHRoaXMuSEFORExFUl9NT1VTRV9NT1ZFID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5IQU5ETEVSX1dJTkRPV19SRVNJWkUgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKTtcbiAgICB0aGlzLkhBTkRMRVJfS0VZX0RPV04gPSB0aGlzLm9uS2V5RG93bi5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5IQU5ETEVSX0tFWV9VUCA9IHRoaXMub25LZXlVcC5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5IQU5ETEVSX1RBUCA9IHRoaXMub25UYXAuYmluZCggdGhpcywge1xuICAgICAgICBjbGllbnRYOiB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDIsXG4gICAgICAgIGNsaWVudFk6IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDJcbiAgICB9ICk7XG5cbiAgICAvLyBGbGFnIGZvciBpbmZvc3BvdCBvdXRwdXRcbiAgICB0aGlzLk9VVFBVVF9JTkZPU1BPVCA9IGZhbHNlO1xuXG4gICAgLy8gQW5pbWF0aW9uc1xuICAgIHRoaXMudHdlZW5MZWZ0QW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCk7XG4gICAgdGhpcy50d2VlblVwQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCk7XG5cbiAgICAvLyBSZW5kZXJlclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLCB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwLCAwICk7XG4gICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcblxuICAgIC8vIEFwcGVuZCBSZW5kZXJlciBFbGVtZW50IHRvIGNvbnRhaW5lclxuICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKCAncGFub2xlbnMtY2FudmFzJyApO1xuICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCApO1xuXG4gICAgLy8gQ2FtZXJhIENvbnRyb2xzXG4gICAgdGhpcy5PcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoIHRoaXMuY2FtZXJhLCB0aGlzLmNvbnRhaW5lciApO1xuICAgIHRoaXMuT3JiaXRDb250cm9scy5pZCA9ICdvcmJpdCc7XG4gICAgdGhpcy5PcmJpdENvbnRyb2xzLm1pbkRpc3RhbmNlID0gMTtcbiAgICB0aGlzLk9yYml0Q29udHJvbHMubm9QYW4gPSB0cnVlO1xuICAgIHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGU7XG4gICAgdGhpcy5PcmJpdENvbnRyb2xzLmF1dG9Sb3RhdGVTcGVlZCA9IHRoaXMub3B0aW9ucy5hdXRvUm90YXRlU3BlZWQ7XG5cbiAgICB0aGlzLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHMgPSBuZXcgRGV2aWNlT3JpZW50YXRpb25Db250cm9scyggdGhpcy5jYW1lcmEsIHRoaXMuY29udGFpbmVyICk7XG4gICAgdGhpcy5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzLmlkID0gJ2RldmljZS1vcmllbnRhdGlvbic7XG4gICAgdGhpcy5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gMTtcblxuICAgIC8vIFJlZ2lzdGVyIGNoYW5nZSBldmVudCBpZiBwYXNzaXZlUmVuZXJpbmdcbiAgICBpZiAoIHRoaXMub3B0aW9ucy5wYXNzaXZlUmVuZGVyaW5nICkge1xuXG4gICAgICAgIGNvbnNvbGUud2FybiggJ3Bhc3NpdmVSZW5kZXJpbmcgaXMgbm93IGRlcHJlY2F0ZWQnICk7XG5cbiAgICB9XG5cbiAgICAvLyBDb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSBbIHRoaXMuT3JiaXRDb250cm9scywgdGhpcy5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzIF07XG4gICAgdGhpcy5jb250cm9sID0gdGhpcy5PcmJpdENvbnRyb2xzO1xuXG4gICAgLy8gQ2FyZGJvYXJkIGVmZmVjdFxuICAgIHRoaXMuQ2FyZGJvYXJkRWZmZWN0ID0gbmV3IENhcmRib2FyZEVmZmVjdCggdGhpcy5yZW5kZXJlciApO1xuICAgIHRoaXMuQ2FyZGJvYXJkRWZmZWN0LnNldFNpemUoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLCB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgKTtcblxuICAgIC8vIFN0ZXJlbyBlZmZlY3RcbiAgICB0aGlzLlN0ZXJlb0VmZmVjdCA9IG5ldyBTdGVyZW9FZmZlY3QoIHRoaXMucmVuZGVyZXIgKTtcbiAgICB0aGlzLlN0ZXJlb0VmZmVjdC5zZXRTaXplKCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCwgdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0ICk7XG5cbiAgICB0aGlzLmVmZmVjdCA9IHRoaXMuQ2FyZGJvYXJkRWZmZWN0O1xuXG4gICAgLy8gQWRkIGRlZmF1bHQgaGlkZGVuIHJldGljbGVcbiAgICB0aGlzLmFkZFJldGljbGUoKTtcblxuICAgIC8vIExvY2sgaG9yaXpvbnRhbCB2aWV3XG4gICAgaWYgKCB0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbFZpZXcgKSB7XG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSSAvIDI7XG4gICAgfVxuXG4gICAgLy8gQWRkIENvbnRyb2wgVUlcbiAgICBpZiAoIHRoaXMub3B0aW9ucy5jb250cm9sQmFyICE9PSBmYWxzZSApIHtcbiAgICAgICAgdGhpcy5hZGREZWZhdWx0Q29udHJvbEJhciggdGhpcy5vcHRpb25zLmNvbnRyb2xCdXR0b25zICk7XG4gICAgfVxuXG4gICAgLy8gQWRkIFZpZXcgSW5kaWNhdG9yXG4gICAgaWYgKCB0aGlzLm9wdGlvbnMudmlld0luZGljYXRvciApIHtcbiAgICAgICAgdGhpcy5hZGRWaWV3SW5kaWNhdG9yKCk7XG4gICAgfVxuXG4gICAgLy8gUmV2ZXJzZSBkcmFnZ2luZyBkaXJlY3Rpb25cbiAgICBpZiAoIHRoaXMub3B0aW9ucy5yZXZlcnNlRHJhZ2dpbmcgKSB7XG4gICAgICAgIHRoaXMucmV2ZXJzZURyYWdnaW5nRGlyZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gUmVnaXN0ZXIgZXZlbnQgaWYgcmV0aWNsZSBpcyBlbmFibGVkLCBvdGhlcndpc2UgZGVmYXVsdHMgdG8gbW91c2VcbiAgICBpZiAoIHRoaXMub3B0aW9ucy5lbmFibGVSZXRpY2xlICkge1xuICAgICAgICB0aGlzLmVuYWJsZVJldGljbGVDb250cm9sKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBPdXRwdXQgaW5mb3Nwb3QgcG9zaXRpb24gdG8gYW4gb3ZlcmxheSBjb250YWluZXIgaWYgc3BlY2lmaWVkXG4gICAgaWYgKCB0aGlzLm9wdGlvbnMub3V0cHV0ID09PSAnb3ZlcmxheScgKSB7XG4gICAgICAgIHRoaXMuYWRkT3V0cHV0RWxlbWVudCgpO1xuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGRvbSBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIC8vIEFuaW1hdGVcbiAgICB0aGlzLmFuaW1hdGUuY2FsbCggdGhpcyApO1xuXG59O1xuXG5WaWV3ZXIucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogVmlld2VyLFxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIG9iamVjdCB0byB0aGUgc2NlbmVcbiAgICAgKiBBdXRvbWF0aWNhbGx5IGhvb2t1cCB3aXRoIHBhbm9sZW5zLXZpZXdlci1oYW5kbGVyIGxpc3RlbmVyXG4gICAgICogdG8gY29tbXVuaWNhdGUgd2l0aCB2aWV3ZXIgbWV0aG9kXG4gICAgICogQHBhcmFtIHtUSFJFRS5PYmplY3QzRH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBhZGRlZFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDEgKSB7XG5cbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZCggYXJndW1lbnRzWyBpIF0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoIG9iamVjdCApO1xuXG4gICAgICAgIC8vIEFsbCBvYmplY3QgYWRkZWQgdG8gc2NlbmUgaGFzICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicgZXZlbnQgdG8gaGFuZGxlIHZpZXdlciBjb21tdW5pY2F0aW9uXG4gICAgICAgIGlmICggb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cbiAgICAgICAgICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCB0aGlzLmV2ZW50SGFuZGxlci5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWxsIG9iamVjdCBhZGRlZCB0byBzY2VuZSBiZWluZyBwYXNzZWQgd2l0aCBjb250YWluZXJcbiAgICAgICAgaWYgKCBvYmplY3QgaW5zdGFuY2VvZiBQYW5vcmFtYSAmJiBvYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgb2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIgfSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG9iamVjdCBpbnN0YW5jZW9mIENhbWVyYVBhbm9yYW1hICkge1xuXG4gICAgICAgICAgICBvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtc2NlbmUnLCBzY2VuZTogdGhpcy5zY2VuZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhvb2t1cCBkZWZhdWx0IHBhbm9yYW1hIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICBpZiAoIG9iamVjdC50eXBlID09PSAncGFub3JhbWEnICkge1xuXG4gICAgICAgICAgICB0aGlzLmFkZFBhbm9yYW1hRXZlbnRMaXN0ZW5lciggb2JqZWN0ICk7XG5cbiAgICAgICAgICAgIGlmICggIXRoaXMucGFub3JhbWEgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhbm9yYW1hKCBvYmplY3QgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gb2JqZWN0IGZyb20gdGhlIHNjZW5lXG4gICAgICogQHBhcmFtICB7VEhSRUUuT2JqZWN0M0R9IG9iamVjdCAtIE9iamVjdCB0byBiZSByZW1vdmVkXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cbiAgICAgICAgaWYgKCBvYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblxuICAgICAgICAgICAgb2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZSggb2JqZWN0ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGRlZmF1bHQgY29udHJvbCBiYXJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBjb250cm9sIGJ1dHRvbnMgYXJyYXlcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkRGVmYXVsdENvbnRyb2xCYXI6IGZ1bmN0aW9uICggYXJyYXkgKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLndpZGdldCApIHtcblxuICAgICAgICAgICAgY29uc29sZS53YXJuKCAnRGVmYXVsdCBjb250cm9sIGJhciBleGlzdHMnICk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoIHRoaXMuY29udGFpbmVyICk7XG4gICAgICAgIHdpZGdldC5hZGRFdmVudExpc3RlbmVyKCAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCB0aGlzLmV2ZW50SGFuZGxlci5iaW5kKCB0aGlzICkgKTtcbiAgICAgICAgd2lkZ2V0LmFkZENvbnRyb2xCYXIoKTtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCggYnV0dG9uTmFtZSA9PiB7XG5cbiAgICAgICAgICAgIHdpZGdldC5hZGRDb250cm9sQnV0dG9uKCBidXR0b25OYW1lICk7XG5cbiAgICAgICAgfSApO1xuXG4gICAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBhIHBhbm9yYW1hIHRvIGJlIHRoZSBjdXJyZW50IG9uZVxuICAgICAqIEBwYXJhbSB7UGFub3JhbWF9IHBhbm8gLSBQYW5vcmFtYSB0byBiZSBzZXRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0UGFub3JhbWE6IGZ1bmN0aW9uICggcGFubyApIHtcblxuICAgICAgICBjb25zdCBsZWF2aW5nUGFub3JhbWEgPSB0aGlzLnBhbm9yYW1hO1xuXG4gICAgICAgIGlmICggcGFuby50eXBlID09PSAncGFub3JhbWEnICYmIGxlYXZpbmdQYW5vcmFtYSAhPT0gcGFubyApIHtcblxuICAgICAgICAgICAgLy8gQ2xlYXIgZXhpc2l0aW5nIGluZm9zcG90XG4gICAgICAgICAgICB0aGlzLmhpZGVJbmZvc3BvdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBhZnRlckVudGVyQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGxlYXZpbmdQYW5vcmFtYSApIHsgbGVhdmluZ1Bhbm9yYW1hLm9uTGVhdmUoKTsgfVxuICAgICAgICAgICAgICAgIHBhbm8ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCBhZnRlckVudGVyQ29tcGxldGUgKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGFuby5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXItZmFkZS1zdGFydCcsIGFmdGVyRW50ZXJDb21wbGV0ZSApO1xuXG4gICAgICAgICAgICAvLyBBc3NpZ24gYW5kIGVudGVyIHBhbm9yYW1hXG4gICAgICAgICAgICAodGhpcy5wYW5vcmFtYSA9IHBhbm8pLm9uRW50ZXIoKTtcblx0XHRcdFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciB0byBleGVjdXRlIGNvbW1hbmRzIGZyb20gY2hpbGQgb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBkaXNwYXRjaGVkIGV2ZW50IHdpdGggbWV0aG9kIGFzIGZ1bmN0aW9uIG5hbWUgYW5kIGRhdGEgYXMgYW4gYXJndW1lbnRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZXZlbnRIYW5kbGVyOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggZXZlbnQubWV0aG9kICYmIHRoaXNbIGV2ZW50Lm1ldGhvZCBdICkge1xuXG4gICAgICAgICAgICB0aGlzWyBldmVudC5tZXRob2QgXSggZXZlbnQuZGF0YSApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaCBldmVudCB0byBhbGwgZGVzY2VuZGFudHNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gRXZlbnQgdG8gYmUgcGFzc2VkIGFsb25nXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3BhdGNoRXZlbnRUb0NoaWxkcmVuOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIHRoaXMuc2NlbmUudHJhdmVyc2UoIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgICAgICBpZiAoIG9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0LmRpc3BhdGNoRXZlbnQoIGV2ZW50ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgd2lkZ2V0IGNvbnRlbnRcbiAgICAgKiBAbWV0aG9kIGFjdGl2YXRlV2lkZ2V0SXRlbVxuICAgICAqIEBwYXJhbSAge2ludGVnZXJ9IGNvbnRyb2xJbmRleCAtIENvbnRyb2wgaW5kZXhcbiAgICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBtb2RlIC0gTW9kZXMgZm9yIGVmZmVjdHNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWN0aXZhdGVXaWRnZXRJdGVtOiBmdW5jdGlvbiAoIGNvbnRyb2xJbmRleCwgbW9kZSApIHtcblxuICAgICAgICBjb25zdCBtYWluTWVudSA9IHRoaXMud2lkZ2V0Lm1haW5NZW51O1xuICAgICAgICBjb25zdCBDb250cm9sTWVudUl0ZW0gPSBtYWluTWVudS5jaGlsZHJlblsgMCBdO1xuICAgICAgICBjb25zdCBNb2RlTWVudUl0ZW0gPSBtYWluTWVudS5jaGlsZHJlblsgMSBdO1xuXG4gICAgICAgIGxldCBpdGVtO1xuXG4gICAgICAgIGlmICggY29udHJvbEluZGV4ICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoIGNvbnRyb2xJbmRleCApIHtcblxuICAgICAgICAgICAgY2FzZSAwOlxuXG4gICAgICAgICAgICAgICAgaXRlbSA9IENvbnRyb2xNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAxIF07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxOlxuXG4gICAgICAgICAgICAgICAgaXRlbSA9IENvbnRyb2xNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAyIF07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblx0XHRcdFx0XHRcbiAgICAgICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gQ29udHJvbE1lbnVJdGVtLnN1Yk1lbnUuY2hpbGRyZW5bIDEgXTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1x0XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgQ29udHJvbE1lbnVJdGVtLnN1Yk1lbnUuc2V0QWN0aXZlSXRlbSggaXRlbSApO1xuICAgICAgICAgICAgQ29udHJvbE1lbnVJdGVtLnNldFNlbGVjdGlvblRpdGxlKCBpdGVtLnRleHRDb250ZW50ICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbW9kZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBzd2l0Y2goIG1vZGUgKSB7XG5cbiAgICAgICAgICAgIGNhc2UgTU9ERVMuQ0FSREJPQVJEOlxuXG4gICAgICAgICAgICAgICAgaXRlbSA9IE1vZGVNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAyIF07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBNT0RFUy5TVEVSRU86XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gTW9kZU1lbnVJdGVtLnN1Yk1lbnUuY2hpbGRyZW5bIDMgXTtcblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBNb2RlTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMSBdO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGVNZW51SXRlbS5zdWJNZW51LnNldEFjdGl2ZUl0ZW0oIGl0ZW0gKTtcbiAgICAgICAgICAgIE1vZGVNZW51SXRlbS5zZXRTZWxlY3Rpb25UaXRsZSggaXRlbS50ZXh0Q29udGVudCApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgcmVuZGVyaW5nIGVmZmVjdFxuICAgICAqIEBwYXJhbSAge01PREVTfSBtb2RlIC0gTW9kZXMgZm9yIGVmZmVjdHNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZW5hYmxlRWZmZWN0OiBmdW5jdGlvbiAoIG1vZGUgKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLm1vZGUgPT09IG1vZGUgKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoIG1vZGUgPT09IE1PREVTLk5PUk1BTCApIHsgdGhpcy5kaXNhYmxlRWZmZWN0KCk7IHJldHVybjsgfVxuICAgICAgICBlbHNlIHsgdGhpcy5tb2RlID0gbW9kZTsgfVxuXG4gICAgICAgIGNvbnN0IGZvdiA9IHRoaXMuY2FtZXJhLmZvdjtcblxuICAgICAgICBzd2l0Y2goIG1vZGUgKSB7XG5cbiAgICAgICAgY2FzZSBNT0RFUy5DQVJEQk9BUkQ6XG5cbiAgICAgICAgICAgIHRoaXMuZWZmZWN0ID0gdGhpcy5DYXJkYm9hcmRFZmZlY3Q7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVJldGljbGVDb250cm9sKCk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgTU9ERVMuU1RFUkVPOlxuXG4gICAgICAgICAgICB0aGlzLmVmZmVjdCA9IHRoaXMuU3RlcmVvRWZmZWN0O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVSZXRpY2xlQ29udHJvbCgpO1xuXHRcdFx0XHRcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgIHRoaXMuZWZmZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJldGljbGVDb250cm9sKCk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGl2YXRlV2lkZ2V0SXRlbSggdW5kZWZpbmVkLCB0aGlzLm1vZGUgKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRHVhbCBleWUgZWZmZWN0IGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBJbmZvc3BvdCNwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3RcbiAgICAgICAgICogQHByb3BlcnR5IHtNT0RFU30gbW9kZSAtIEN1cnJlbnQgZGlzcGxheSBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnRUb0NoaWxkcmVuKCB7IHR5cGU6ICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCBtb2RlOiB0aGlzLm1vZGUgfSApO1xuXG4gICAgICAgIC8vIEZvcmNlIGVmZmVjdCBzdGVyZW8gY2FtZXJhIHRvIHVwZGF0ZSBieSByZWZyZXNoaW5nIGZvdlxuICAgICAgICB0aGlzLmNhbWVyYS5mb3YgPSBmb3YgKyAxMGUtMztcbiAgICAgICAgdGhpcy5lZmZlY3Quc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmNhbWVyYS5mb3YgPSBmb3Y7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BhdGNoIG1vZGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBWaWV3ZXIjbW9kZS1jaGFuZ2VcbiAgICAgICAgICogQHByb3BlcnR5IHtNT0RFU30gbW9kZSAtIEN1cnJlbnQgZGlzcGxheSBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ21vZGUtY2hhbmdlJywgbW9kZTogdGhpcy5tb2RlIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIGFkZGl0aW9uYWwgcmVuZGVyaW5nIGVmZmVjdFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNhYmxlRWZmZWN0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLm1vZGUgPT09IE1PREVTLk5PUk1BTCApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5tb2RlID0gTU9ERVMuTk9STUFMO1xuICAgICAgICB0aGlzLmRpc2FibGVSZXRpY2xlQ29udHJvbCgpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVXaWRnZXRJdGVtKCB1bmRlZmluZWQsIHRoaXMubW9kZSApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEdWFsIGV5ZSBlZmZlY3QgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IEluZm9zcG90I3Bhbm9sZW5zLWR1YWwtZXllLWVmZmVjdFxuICAgICAgICAgKiBAcHJvcGVydHkge01PREVTfSBtb2RlIC0gQ3VycmVudCBkaXNwbGF5IG1vZGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudFRvQ2hpbGRyZW4oIHsgdHlwZTogJ3Bhbm9sZW5zLWR1YWwtZXllLWVmZmVjdCcsIG1vZGU6IHRoaXMubW9kZSB9ICk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKCB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCwgdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0ICk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BhdGNoIG1vZGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBWaWV3ZXIjbW9kZS1jaGFuZ2VcbiAgICAgICAgICogQHByb3BlcnR5IHtNT0RFU30gbW9kZSAtIEN1cnJlbnQgZGlzcGxheSBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ21vZGUtY2hhbmdlJywgbW9kZTogdGhpcy5tb2RlIH0gKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHJldGljbGUgY29udHJvbFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBlbmFibGVSZXRpY2xlQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5yZXRpY2xlLnZpc2libGUgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMudGVtcEVuYWJsZVJldGljbGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIHJldGljbGUgZXZlbnQgYW5kIHVucmVnaXN0ZXIgbW91c2UgZXZlbnRcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyTW91c2VBbmRUb3VjaEV2ZW50cygpO1xuICAgICAgICB0aGlzLnJldGljbGUuc2hvdygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmV0aWNsZUV2ZW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlUmV0aWNsZUV2ZW50KCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSByZXRpY2xlIGNvbnRyb2xcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGlzYWJsZVJldGljbGVDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy50ZW1wRW5hYmxlUmV0aWNsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG1vdXNlIGV2ZW50IGFuZCB1bnJlZ2lzdGVyIHJldGljbGUgZXZlbnRcbiAgICAgICAgaWYgKCAhdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgKSB7XG5cbiAgICAgICAgICAgIHRoaXMucmV0aWNsZS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXJSZXRpY2xlRXZlbnQoKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVSZXRpY2xlRXZlbnQoKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIGF1dG8gcm90YXRpb25cbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZW5hYmxlQXV0b1JhdGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gdHJ1ZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIGF1dG8gcm90YXRpb25cbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGlzYWJsZUF1dG9SYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KCB0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQgKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5PcmJpdENvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdmlkZW8gcGxheSBvciBzdG9wXG4gICAgICogQHBhcmFtIHtib29sZWFufSBwYXVzZVxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgVmlld2VyI3ZpZGVvLXRvZ2dsZVxuICAgICAqL1xuICAgIHRvZ2dsZVZpZGVvUGxheTogZnVuY3Rpb24gKCBwYXVzZSApIHtcblxuICAgICAgICBpZiAoIHRoaXMucGFub3JhbWEgaW5zdGFuY2VvZiBWaWRlb1Bhbm9yYW1hICkge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRvZ2dsZSB2aWRlbyBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBldmVudCBWaWV3ZXIjdmlkZW8tdG9nZ2xlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucGFub3JhbWEuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndmlkZW8tdG9nZ2xlJywgcGF1c2U6IHBhdXNlIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGN1cnJlbnRUaW1lIGluIGEgdmlkZW9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudGFnZSAtIFBlcmNlbnRhZ2Ugb2YgYSB2aWRlby4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBWaWV3ZXIjdmlkZW8tdGltZVxuICAgICAqL1xuICAgIHNldFZpZGVvQ3VycmVudFRpbWU6IGZ1bmN0aW9uICggcGVyY2VudGFnZSApIHtcblxuICAgICAgICBpZiAoIHRoaXMucGFub3JhbWEgaW5zdGFuY2VvZiBWaWRlb1Bhbm9yYW1hICkge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNldHRpbmcgdmlkZW8gdGltZSBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBldmVudCBWaWV3ZXIjdmlkZW8tdGltZVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBQZXJjZW50YWdlIG9mIGEgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLXRpbWUnLCBwZXJjZW50YWdlOiBwZXJjZW50YWdlIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHZpZGVvIHVwZGF0ZXMgaWYgYW4gd2lkZ2V0IGlzIHByZXNlbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudGFnZSAtIFBlcmNlbnRhZ2Ugb2YgYSB2aWRlby4gUmFuZ2UgZnJvbSAwLjAgdG8gMS4wXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBWaWV3ZXIjdmlkZW8tdXBkYXRlXG4gICAgICovXG4gICAgb25WaWRlb1VwZGF0ZTogZnVuY3Rpb24gKCBwZXJjZW50YWdlICkge1xuXG4gICAgICAgIGNvbnN0IHsgd2lkZ2V0IH0gPSB0aGlzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWaWRlbyB1cGRhdGUgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFZpZXdlciN2aWRlby11cGRhdGVcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBQZXJjZW50YWdlIG9mIGEgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAgICAgKi9cbiAgICAgICAgaWYoIHdpZGdldCApIHsgd2lkZ2V0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLXVwZGF0ZScsIHBlcmNlbnRhZ2U6IHBlcmNlbnRhZ2UgfSApOyB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIHVwZGF0ZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkVXBkYXRlQ2FsbGJhY2s6IGZ1bmN0aW9uICggZm4gKSB7XG5cbiAgICAgICAgaWYgKCBmbiApIHtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYWxsYmFja3MucHVzaCggZm4gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHVwZGF0ZSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbW92ZVVwZGF0ZUNhbGxiYWNrOiBmdW5jdGlvbiAoIGZuICkge1xuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy51cGRhdGVDYWxsYmFja3MuaW5kZXhPZiggZm4gKTtcblxuICAgICAgICBpZiAoIGZuICYmIGluZGV4ID49IDAgKSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsbGJhY2tzLnNwbGljZSggaW5kZXgsIDEgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2hvdyB2aWRlbyB3aWRnZXRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2hvd1ZpZGVvV2lkZ2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyB3aWRnZXQgfSA9IHRoaXM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgdmlkZW8gd2lkZ2V0IGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBWaWV3ZXIjdmlkZW8tY29udHJvbC1zaG93XG4gICAgICAgICAqL1xuICAgICAgICBpZiggd2lkZ2V0ICkgeyB3aWRnZXQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndmlkZW8tY29udHJvbC1zaG93JyB9ICk7IH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHZpZGVvIHdpZGdldFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBoaWRlVmlkZW9XaWRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB7IHdpZGdldCB9ID0gdGhpcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSB2aWRlbyB3aWRnZXRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFZpZXdlciN2aWRlby1jb250cm9sLWhpZGVcbiAgICAgICAgICovXG4gICAgICAgIGlmKCB3aWRnZXQgKSB7IHdpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby1jb250cm9sLWhpZGUnIH0gKTsgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2aWRlbyBwbGF5IGJ1dHRvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGF1c2VkIFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1cGRhdGVWaWRlb1BsYXlCdXR0b246IGZ1bmN0aW9uICggcGF1c2VkICkge1xuXG4gICAgICAgIGNvbnN0IHsgd2lkZ2V0IH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggd2lkZ2V0ICYmIHdpZGdldC52aWRlb0VsZW1lbnQgJiYgd2lkZ2V0LnZpZGVvRWxlbWVudC5jb250cm9sQnV0dG9uICkge1xuXG4gICAgICAgICAgICB3aWRnZXQudmlkZW9FbGVtZW50LmNvbnRyb2xCdXR0b24udXBkYXRlKCBwYXVzZWQgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGRlZmF1bHQgcGFub3JhbWEgZXZlbnQgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtQYW5vcmFtYX0gcGFubyAtIFRoZSBwYW5vcmFtYSB0byBiZSBhZGRlZCB3aXRoIGV2ZW50IGxpc3RlbmVyXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZFBhbm9yYW1hRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKCBwYW5vICkge1xuXG4gICAgICAgIC8vIFNldCBjYW1lcmEgY29udHJvbCBvbiBldmVyeSBwYW5vcmFtYVxuICAgICAgICBwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgdGhpcy5zZXRDYW1lcmFDb250cm9sLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIC8vIFNob3cgYW5kIGhpZGUgd2lkZ2V0IGV2ZW50IG9ubHkgd2hlbiBpdCdzIFZpZGVvUGFub3JhbWFcbiAgICAgICAgaWYgKCBwYW5vIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgcGFuby5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXItZmFkZS1zdGFydCcsIHRoaXMuc2hvd1ZpZGVvV2lkZ2V0LmJpbmQoIHRoaXMgKSApO1xuICAgICAgICAgICAgcGFuby5hZGRFdmVudExpc3RlbmVyKCAnbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoICEodGhpcy5wYW5vcmFtYSBpbnN0YW5jZW9mIFZpZGVvUGFub3JhbWEpICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVZpZGVvV2lkZ2V0LmNhbGwoIHRoaXMgKTtcblxuICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0XG4gICAgICAgICAgICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgY2FtZXJhIGNvbnRyb2xcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0Q2FtZXJhQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy50YXJnZXQuY29weSggdGhpcy5wYW5vcmFtYS5wb3NpdGlvbiApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBjdXJyZW50IGNhbWVyYSBjb250cm9sXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIEN1cnJlbnQgbmF2aWdhdGlvbiBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtUSFJFRS5PcmJpdENvbnRyb2xzfFRIUkVFLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHN9XG4gICAgICovXG4gICAgZ2V0Q29udHJvbDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHNjZW5lXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge1RIUkVFLlNjZW5lfSAtIEN1cnJlbnQgc2NlbmUgd2hpY2ggdGhlIHZpZXdlciBpcyBidWlsdCBvblxuICAgICAqL1xuICAgIGdldFNjZW5lOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGNhbWVyYVxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtUSFJFRS5DYW1lcmF9IC0gVGhlIHNjZW5lIGNhbWVyYVxuICAgICAqL1xuICAgIGdldENhbWVyYTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbWVyYTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgcmVuZGVyZXJcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7VEhSRUUuV2ViR0xSZW5kZXJlcn0gLSBUaGUgcmVuZGVyZXIgdXNpbmcgd2ViZ2xcbiAgICAgKi9cbiAgICBnZXRSZW5kZXJlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gVGhlIGNvbnRhaW5lciBob2xkcyByZW5kZXJlcmQgY2FudmFzXG4gICAgICovXG4gICAgZ2V0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBjb250cm9sIGlkXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBDb250cm9sIGlkLiAnb3JiaXQnIG9yICdkZXZpY2Utb3JpZW50YXRpb24nXG4gICAgICovXG4gICAgZ2V0Q29udHJvbElkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbC5pZDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmV4dCBuYXZpZ2F0aW9uIGNvbnRyb2wgaWRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAtIE5leHQgY29udHJvbCBpZFxuICAgICAqL1xuICAgIGdldE5leHRDb250cm9sSWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sc1sgdGhpcy5nZXROZXh0Q29udHJvbEluZGV4KCkgXS5pZDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmV4dCBuYXZpZ2F0aW9uIGNvbnRyb2wgaW5kZXhcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7bnVtYmVyfSAtIE5leHQgY29udHJvbCBpbmRleFxuICAgICAqL1xuICAgIGdldE5leHRDb250cm9sSW5kZXg6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBjb250cm9scyA9IHRoaXMuY29udHJvbHM7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IGNvbnRyb2xzLmluZGV4T2YoIGNvbnRyb2wgKSArIDE7XG5cbiAgICAgICAgcmV0dXJuICggbmV4dEluZGV4ID49IGNvbnRyb2xzLmxlbmd0aCApID8gMCA6IG5leHRJbmRleDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgZmllbGQgb2YgdmlldyBvZiBjYW1lcmFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZm92XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldENhbWVyYUZvdjogZnVuY3Rpb24gKCBmb3YgKSB7XG5cbiAgICAgICAgdGhpcy5jYW1lcmEuZm92ID0gZm92O1xuICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIGNvbnRyb2wgYnkgaW5kZXhcbiAgICAgKiBAcGFyYW0gIHtDT05UUk9MU30gaW5kZXggLSBJbmRleCBvZiBjYW1lcmEgY29udHJvbFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBlbmFibGVDb250cm9sOiBmdW5jdGlvbiAoIGluZGV4ICkge1xuXG4gICAgICAgIGluZGV4ID0gKCBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5jb250cm9scy5sZW5ndGggKSA/IGluZGV4IDogMDtcblxuICAgICAgICB0aGlzLmNvbnRyb2wuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuY29udHJvbHNbIGluZGV4IF07XG5cbiAgICAgICAgdGhpcy5jb250cm9sLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHN3aXRjaCAoIGluZGV4ICkge1xuXG4gICAgICAgIGNhc2UgQ09OVFJPTFMuT1JCSVQ6XG5cbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoIHRoaXMucGFub3JhbWEucG9zaXRpb24gKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogKz0gMTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDT05UUk9MUy5ERVZJQ0VPUklFTlRBVElPTjpcblxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uY29weSggdGhpcy5wYW5vcmFtYS5wb3NpdGlvbiApO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGUoKTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlV2lkZ2V0SXRlbSggaW5kZXgsIHVuZGVmaW5lZCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgY3VycmVudCBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc2FibGVDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5jb250cm9sLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgbmV4dCBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRvZ2dsZU5leHRDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5lbmFibGVDb250cm9sKCB0aGlzLmdldE5leHRDb250cm9sSW5kZXgoKSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNjcmVlbiBTcGFjZSBQcm9qZWN0aW9uXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldFNjcmVlblZlY3RvcjogZnVuY3Rpb24gKCB3b3JsZFZlY3RvciApIHtcblxuICAgICAgICBjb25zdCB2ZWN0b3IgPSB3b3JsZFZlY3Rvci5jbG9uZSgpO1xuICAgICAgICBjb25zdCB3aWR0aEhhbGYgPSAoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoICkgLyAyO1xuICAgICAgICBjb25zdCBoZWlnaHRIYWxmID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcblxuICAgICAgICB2ZWN0b3IucHJvamVjdCggdGhpcy5jYW1lcmEgKTtcblxuICAgICAgICB2ZWN0b3IueCA9ICggdmVjdG9yLnggKiB3aWR0aEhhbGYgKSArIHdpZHRoSGFsZjtcbiAgICAgICAgdmVjdG9yLnkgPSAtICggdmVjdG9yLnkgKiBoZWlnaHRIYWxmICkgKyBoZWlnaHRIYWxmO1xuICAgICAgICB2ZWN0b3IueiA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHZlY3RvcjtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBTcHJpdGUgaW4gVmlld3BvcnRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY2hlY2tTcHJpdGVJblZpZXdwb3J0OiBmdW5jdGlvbiAoIHNwcml0ZSApIHtcblxuICAgICAgICB0aGlzLmNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UuZ2V0SW52ZXJzZSggdGhpcy5jYW1lcmEubWF0cml4V29ybGQgKTtcbiAgICAgICAgdGhpcy5jYW1lcmFWaWV3UHJvamVjdGlvbk1hdHJpeC5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLmNhbWVyYS5wcm9qZWN0aW9uTWF0cml4LCB0aGlzLmNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcbiAgICAgICAgdGhpcy5jYW1lcmFGcnVzdHVtLnNldEZyb21NYXRyaXgoIHRoaXMuY2FtZXJhVmlld1Byb2plY3Rpb25NYXRyaXggKTtcblxuICAgICAgICByZXR1cm4gc3ByaXRlLnZpc2libGUgJiYgdGhpcy5jYW1lcmFGcnVzdHVtLmludGVyc2VjdHNTcHJpdGUoIHNwcml0ZSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldmVyc2UgZHJhZ2dpbmcgZGlyZWN0aW9uXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJldmVyc2VEcmFnZ2luZ0RpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5yb3RhdGVTcGVlZCAqPSAtMTtcbiAgICAgICAgdGhpcy5PcmJpdENvbnRyb2xzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciAqPSAtMTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgcmV0aWNsZSBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkUmV0aWNsZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMucmV0aWNsZSA9IG5ldyBSZXRpY2xlKCAweGZmZmZmZiwgdHJ1ZSwgdGhpcy5vcHRpb25zLmR3ZWxsVGltZSApO1xuICAgICAgICB0aGlzLnJldGljbGUuaGlkZSgpO1xuICAgICAgICB0aGlzLmNhbWVyYS5hZGQoIHRoaXMucmV0aWNsZSApO1xuICAgICAgICB0aGlzLnNjZW5lUmV0aWNsZS5hZGQoIHRoaXMuY2FtZXJhICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVHdlZW4gY29udHJvbCBsb29raW5nIGNlbnRlclxuICAgICAqIEBwYXJhbSB7VEhSRUUuVmVjdG9yM30gdmVjdG9yIC0gVmVjdG9yIHRvIGJlIGxvb2tlZCBhdCB0aGUgY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0xMDAwXSAtIER1cmF0aW9uIHRvIHR3ZWVuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1UV0VFTi5FYXNpbmcuRXhwb25lbnRpYWwuT3V0XSAtIEVhc2luZyBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0d2VlbkNvbnRyb2xDZW50ZXI6IGZ1bmN0aW9uICggdmVjdG9yLCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG4gICAgICAgIGlmICggdGhpcy5jb250cm9sICE9PSB0aGlzLk9yYml0Q29udHJvbHMgKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFzcyBpbiBhcmd1bWVudHMgYXMgYXJyYXlcbiAgICAgICAgaWYgKCB2ZWN0b3IgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB2ZWN0b3JbIDEgXTtcbiAgICAgICAgICAgIGVhc2luZyA9IHZlY3RvclsgMiBdO1xuICAgICAgICAgICAgdmVjdG9yID0gdmVjdG9yWyAwIF07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gIT09IHVuZGVmaW5lZCA/IGR1cmF0aW9uIDogMTAwMDtcbiAgICAgICAgZWFzaW5nID0gZWFzaW5nIHx8IFRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXQ7XG5cbiAgICAgICAgbGV0IHNjb3BlLCBoYSwgdmEsIGNodiwgY3Z2LCBodiwgdnYsIHZwdGMsIG92LCBudjtcblxuICAgICAgICBzY29wZSA9IHRoaXM7XG5cbiAgICAgICAgY2h2ID0gdGhpcy5jYW1lcmEuZ2V0V29ybGREaXJlY3Rpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKTtcbiAgICAgICAgY3Z2ID0gY2h2LmNsb25lKCk7XG5cbiAgICAgICAgdnB0YyA9IHRoaXMucGFub3JhbWEuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApLnN1YiggdGhpcy5jYW1lcmEuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApICk7XG5cbiAgICAgICAgaHYgPSB2ZWN0b3IuY2xvbmUoKTtcbiAgICAgICAgLy8gU2NhbGUgZWZmZWN0XG4gICAgICAgIGh2LnggKj0gLTE7XG4gICAgICAgIGh2LmFkZCggdnB0YyApLm5vcm1hbGl6ZSgpO1xuICAgICAgICB2diA9IGh2LmNsb25lKCk7XG5cbiAgICAgICAgY2h2LnkgPSAwO1xuICAgICAgICBodi55ID0gMDtcblxuICAgICAgICBoYSA9IE1hdGguYXRhbjIoIGh2LnosIGh2LnggKSAtIE1hdGguYXRhbjIoIGNodi56LCBjaHYueCApO1xuICAgICAgICBoYSA9IGhhID4gTWF0aC5QSSA/IGhhIC0gMiAqIE1hdGguUEkgOiBoYTtcbiAgICAgICAgaGEgPSBoYSA8IC1NYXRoLlBJID8gaGEgKyAyICogTWF0aC5QSSA6IGhhO1xuICAgICAgICB2YSA9IE1hdGguYWJzKCBjdnYuYW5nbGVUbyggY2h2ICkgKyAoIGN2di55ICogdnYueSA8PSAwID8gdnYuYW5nbGVUbyggaHYgKSA6IC12di5hbmdsZVRvKCBodiApICkgKTtcbiAgICAgICAgdmEgKj0gdnYueSA8IGN2di55ID8gMSA6IC0xO1xuXG4gICAgICAgIG92ID0geyBsZWZ0OiAwLCB1cDogMCB9O1xuICAgICAgICBudiA9IHsgbGVmdDogMCwgdXA6IDAgfTtcblxuICAgICAgICB0aGlzLnR3ZWVuTGVmdEFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgIHRoaXMudHdlZW5VcEFuaW1hdGlvbi5zdG9wKCk7XG5cbiAgICAgICAgdGhpcy50d2VlbkxlZnRBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIG92IClcbiAgICAgICAgICAgIC50byggeyBsZWZ0OiBoYSB9LCBkdXJhdGlvbiApXG4gICAgICAgICAgICAuZWFzaW5nKCBlYXNpbmcgKVxuICAgICAgICAgICAgLm9uVXBkYXRlKGZ1bmN0aW9uKG92KXtcbiAgICAgICAgICAgICAgICBzY29wZS5jb250cm9sLnJvdGF0ZUxlZnQoIG92LmxlZnQgLSBudi5sZWZ0ICk7XG4gICAgICAgICAgICAgICAgbnYubGVmdCA9IG92LmxlZnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy50d2VlblVwQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCBvdiApXG4gICAgICAgICAgICAudG8oIHsgdXA6IHZhIH0sIGR1cmF0aW9uIClcbiAgICAgICAgICAgIC5lYXNpbmcoIGVhc2luZyApXG4gICAgICAgICAgICAub25VcGRhdGUoZnVuY3Rpb24ob3Ype1xuICAgICAgICAgICAgICAgIHNjb3BlLmNvbnRyb2wucm90YXRlVXAoIG92LnVwIC0gbnYudXAgKTtcbiAgICAgICAgICAgICAgICBudi51cCA9IG92LnVwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFR3ZWVuIGNvbnRyb2wgbG9va2luZyBjZW50ZXIgYnkgb2JqZWN0XG4gICAgICogQHBhcmFtIHtUSFJFRS5PYmplY3QzRH0gb2JqZWN0IC0gT2JqZWN0IHRvIGJlIGxvb2tlZCBhdCB0aGUgY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0xMDAwXSAtIER1cmF0aW9uIHRvIHR3ZWVuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1UV0VFTi5FYXNpbmcuRXhwb25lbnRpYWwuT3V0XSAtIEVhc2luZyBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0d2VlbkNvbnRyb2xDZW50ZXJCeU9iamVjdDogZnVuY3Rpb24gKCBvYmplY3QsIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cbiAgICAgICAgbGV0IGlzVW5kZXJTY2FsZVBsYWNlSG9sZGVyID0gZmFsc2U7XG5cbiAgICAgICAgb2JqZWN0LnRyYXZlcnNlQW5jZXN0b3JzKCBmdW5jdGlvbiAoIGFuY2VzdG9yICkge1xuXG4gICAgICAgICAgICBpZiAoIGFuY2VzdG9yLnNjYWxlUGxhY2VIb2xkZXIgKSB7XG5cbiAgICAgICAgICAgICAgICBpc1VuZGVyU2NhbGVQbGFjZUhvbGRlciA9IHRydWU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuXG4gICAgICAgIGlmICggaXNVbmRlclNjYWxlUGxhY2VIb2xkZXIgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGludmVydFhWZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyggLTEsIDEsIDEgKTtcblxuICAgICAgICAgICAgdGhpcy50d2VlbkNvbnRyb2xDZW50ZXIoIG9iamVjdC5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICkubXVsdGlwbHkoIGludmVydFhWZWN0b3IgKSwgZHVyYXRpb24sIGVhc2luZyApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMudHdlZW5Db250cm9sQ2VudGVyKCBvYmplY3QuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApLCBkdXJhdGlvbiwgZWFzaW5nICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZFxuICAgICAqIEBmaXJlcyBWaWV3ZXIjd2luZG93LXJlc2l6ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbd2luZG93V2lkdGhdIC0gU3BlY2lmeSBpZiBjdXN0b20gZWxlbWVudCBoYXMgY2hhbmdlZCB3aWR0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbd2luZG93SGVpZ2h0XSAtIFNwZWNpZnkgaWYgY3VzdG9tIGVsZW1lbnQgaGFzIGNoYW5nZWQgaGVpZ2h0XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uV2luZG93UmVzaXplOiBmdW5jdGlvbiAoIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQgKSB7XG5cbiAgICAgICAgbGV0IHdpZHRoLCBoZWlnaHQ7XG5cbiAgICAgICAgY29uc3QgZXhwYW5kID0gdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCAncGFub2xlbnMtY29udGFpbmVyJyApIHx8IHRoaXMuY29udGFpbmVyLmlzRnVsbHNjcmVlbjtcblxuICAgICAgICBpZiAoIHdpbmRvd1dpZHRoICE9PSB1bmRlZmluZWQgJiYgd2luZG93SGVpZ2h0ICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIHdpZHRoID0gd2luZG93V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5fd2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLl9oZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgaXNBbmRyb2lkID0gLyhhbmRyb2lkKS9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gICAgICAgICAgICBjb25zdCBhZGp1c3RXaWR0aCA9IGlzQW5kcm9pZCBcbiAgICAgICAgICAgICAgICA/IE1hdGgubWluKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgXG4gICAgICAgICAgICAgICAgOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuXG4gICAgICAgICAgICBjb25zdCBhZGp1c3RIZWlnaHQgPSBpc0FuZHJvaWQgXG4gICAgICAgICAgICAgICAgPyBNYXRoLm1pbihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCkgXG4gICAgICAgICAgICAgICAgOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG5cbiAgICAgICAgICAgIHdpZHRoID0gZXhwYW5kID8gYWRqdXN0V2lkdGggOiB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IGV4cGFuZCA/IGFkanVzdEhlaWdodCA6IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5faGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgIC8vIFVwZGF0ZSByZXRpY2xlXG4gICAgICAgIGlmICggdGhpcy5vcHRpb25zLmVuYWJsZVJldGljbGUgfHwgdGhpcy50ZW1wRW5hYmxlUmV0aWNsZSApIHtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVSZXRpY2xlRXZlbnQoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdpbmRvdyByZXNpemluZyBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlld2VyI3dpbmRvdy1yZXNpemVcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoICAtIFdpZHRoIG9mIHRoZSB3aW5kb3dcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCAtIEhlaWdodCBvZiB0aGUgd2luZG93XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3dpbmRvdy1yZXNpemUnLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgICB0aGlzLnNjZW5lLnRyYXZlcnNlKCBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuICAgICAgICAgICAgaWYgKCBvYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd3aW5kb3ctcmVzaXplJywgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgb3V0cHV0IGVsZW1lbnRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkT3V0cHV0RWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yaWdodCA9ICcxMHB4JztcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnMTBweCc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG4gICAgICAgIHRoaXMub3V0cHV0RGl2RWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT3V0cHV0IHBvc2l0aW9uIGluIGRldmVsb3BlciBjb25zb2xlIGJ5IGhvbGRpbmcgZG93biBDdHJsIGJ1dHRvblxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvdXRwdXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGludGVyc2VjdHMgPSB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QoIHRoaXMucGFub3JhbWEsIHRydWUgKTtcblxuICAgICAgICBpZiAoIGludGVyc2VjdHMubGVuZ3RoID4gMCApIHtcblxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBpbnRlcnNlY3RzWyAwIF0ucG9pbnQuY2xvbmUoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlciA9IG5ldyBUSFJFRS5WZWN0b3IzKCAtMSwgMSwgMSApO1xuICAgICAgICAgICAgY29uc3Qgd29ybGQgPSB0aGlzLnBhbm9yYW1hLmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKTtcbiAgICAgICAgICAgIHBvaW50LnN1Yiggd29ybGQgKS5tdWx0aXBseSggY29udmVydGVyICk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtwb2ludC54LnRvRml4ZWQoMil9LCAke3BvaW50LnkudG9GaXhlZCgyKX0sICR7cG9pbnQuei50b0ZpeGVkKDIpfWA7XG5cbiAgICAgICAgICAgIGlmICggcG9pbnQubGVuZ3RoKCkgPT09IDAgKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLm9wdGlvbnMub3V0cHV0ICkge1xuXG4gICAgICAgICAgICBjYXNlICdjb25zb2xlJzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oIG1lc3NhZ2UgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnb3ZlcmxheSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRwdXREaXZFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiBtb3VzZSBkb3duXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Nb3VzZURvd246IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnVzZXJNb3VzZS54ID0gKCBldmVudC5jbGllbnRYID49IDAgKSA/IGV2ZW50LmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgIHRoaXMudXNlck1vdXNlLnkgPSAoIGV2ZW50LmNsaWVudFkgPj0gMCApID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgdGhpcy51c2VyTW91c2UudHlwZSA9ICdtb3VzZWRvd24nO1xuICAgICAgICB0aGlzLm9uVGFwKCBldmVudCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIG1vdXNlIG1vdmVcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbk1vdXNlTW92ZTogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnVzZXJNb3VzZS50eXBlID0gJ21vdXNlbW92ZSc7XG4gICAgICAgIHRoaXMub25UYXAoIGV2ZW50ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24gbW91c2UgdXBcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbk1vdXNlVXA6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICAgICAgbGV0IG9uVGFyZ2V0ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy51c2VyTW91c2UudHlwZSA9ICdtb3VzZXVwJztcblxuICAgICAgICBjb25zdCB0eXBlID0gKCB0aGlzLnVzZXJNb3VzZS54ID49IGV2ZW50LmNsaWVudFggLSB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2UgXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnggPD0gZXZlbnQuY2xpZW50WCArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZVxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS55ID49IGV2ZW50LmNsaWVudFkgLSB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2Vcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueSA8PSBldmVudC5jbGllbnRZICsgdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlICkgXG5cdFx0XHRcdHx8ICAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzIFxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS54ID49IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2Vcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueCA8PSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYICsgdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlIFxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS55ID49IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2Vcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueSA8PSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZICsgdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlICkgXG4gICAgICAgICAgICA/ICdjbGljaycgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gRXZlbnQgc2hvdWxkIGhhcHBlbiBvbiBjYW52YXNcbiAgICAgICAgaWYgKCBldmVudCAmJiBldmVudC50YXJnZXQgJiYgIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdwYW5vbGVucy1jYW52YXMnICkgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgICAgIG9uVGFyZ2V0ID0gdGhpcy5vblRhcCggeyBjbGllbnRYOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBjbGllbnRZOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIH0sIHR5cGUgKTtcblx0XHRcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgb25UYXJnZXQgPSB0aGlzLm9uVGFwKCBldmVudCwgdHlwZSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVzZXJNb3VzZS50eXBlID0gJ25vbmUnO1xuXG4gICAgICAgIGlmICggb25UYXJnZXQgKSB7IFxuXG4gICAgICAgICAgICByZXR1cm47IFxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHR5cGUgPT09ICdjbGljaycgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9uczogeyBhdXRvSGlkZUluZm9zcG90LCBhdXRvSGlkZUNvbnRyb2xCYXIgfSwgcGFub3JhbWEsIHRvZ2dsZUNvbnRyb2xCYXIgfSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICggYXV0b0hpZGVJbmZvc3BvdCAmJiBwYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgICAgIHBhbm9yYW1hLnRvZ2dsZUluZm9zcG90VmlzaWJpbGl0eSgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYXV0b0hpZGVDb250cm9sQmFyICkge1xuXG4gICAgICAgICAgICAgICAgdG9nZ2xlQ29udHJvbEJhcigpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIHRhcCBldmVueSBmcmFtZVxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uVGFwOiBmdW5jdGlvbiAoIGV2ZW50LCB0eXBlICkge1xuXG4gICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICB0aGlzLnJheWNhc3RlclBvaW50LnggPSAoICggZXZlbnQuY2xpZW50WCAtIGxlZnQgKSAvIGNsaWVudFdpZHRoICkgKiAyIC0gMTtcbiAgICAgICAgdGhpcy5yYXljYXN0ZXJQb2ludC55ID0gLSAoICggZXZlbnQuY2xpZW50WSAtIHRvcCApIC8gY2xpZW50SGVpZ2h0ICkgKiAyICsgMTtcblxuICAgICAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKCB0aGlzLnJheWNhc3RlclBvaW50LCB0aGlzLmNhbWVyYSApO1xuXG4gICAgICAgIC8vIFJldHVybiBpZiBubyBwYW5vcmFtYSBcbiAgICAgICAgaWYgKCAhdGhpcy5wYW5vcmFtYSApIHsgXG5cbiAgICAgICAgICAgIHJldHVybjsgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG91dHB1dCBpbmZvc3BvdCBpbmZvcm1hdGlvblxuICAgICAgICBpZiAoIGV2ZW50LnR5cGUgIT09ICdtb3VzZWRvd24nICYmIHRoaXMudG91Y2hTdXBwb3J0ZWQgfHwgdGhpcy5PVVRQVVRfSU5GT1NQT1QgKSB7IFxuXG4gICAgICAgICAgICB0aGlzLm91dHB1dFBvc2l0aW9uKCk7IFxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnRlcnNlY3RzID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyggdGhpcy5wYW5vcmFtYS5jaGlsZHJlbiwgdHJ1ZSApO1xuICAgICAgICBjb25zdCBpbnRlcnNlY3RfZW50aXR5ID0gdGhpcy5nZXRDb252ZXJ0ZWRJbnRlcnNlY3QoIGludGVyc2VjdHMgKTtcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0ID0gKCBpbnRlcnNlY3RzLmxlbmd0aCA+IDAgKSA/IGludGVyc2VjdHNbMF0ub2JqZWN0IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICggdGhpcy51c2VyTW91c2UudHlwZSA9PT0gJ21vdXNldXAnICApIHtcblxuICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3RfZW50aXR5ICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgPT09IGludGVyc2VjdF9lbnRpdHkgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc3N0b3AtZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy51c2VyTW91c2UudHlwZSA9PT0gJ21vdXNldXAnICApIHtcblxuICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3QgJiYgdGhpcy5wcmVzc09iamVjdCA9PT0gaW50ZXJzZWN0ICYmIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdG9wJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ2NsaWNrJyApIHtcblxuICAgICAgICAgICAgdGhpcy5wYW5vcmFtYS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjbGljaycsIGludGVyc2VjdHM6IGludGVyc2VjdHMsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3RfZW50aXR5ICYmIGludGVyc2VjdF9lbnRpdHkuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgIGludGVyc2VjdF9lbnRpdHkuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnY2xpY2stZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggaW50ZXJzZWN0ICYmIGludGVyc2VjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2NsaWNrJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5wYW5vcmFtYS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdob3ZlcicsIGludGVyc2VjdHM6IGludGVyc2VjdHMsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuICAgICAgICAgICAgaWYgKCAoIHRoaXMuaG92ZXJPYmplY3QgJiYgaW50ZXJzZWN0cy5sZW5ndGggPiAwICYmIHRoaXMuaG92ZXJPYmplY3QgIT09IGludGVyc2VjdF9lbnRpdHkgKVxuXHRcdFx0XHR8fCAoIHRoaXMuaG92ZXJPYmplY3QgJiYgaW50ZXJzZWN0cy5sZW5ndGggPT09IDAgKSApe1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmhvdmVyT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Zlck9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdob3ZlcmxlYXZlJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0aWNsZS5lbmQoKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJPYmplY3QgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3RfZW50aXR5ICYmIGludGVyc2VjdHMubGVuZ3RoID4gMCApIHtcblxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5ob3Zlck9iamVjdCAhPT0gaW50ZXJzZWN0X2VudGl0eSApIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdmVyT2JqZWN0ID0gaW50ZXJzZWN0X2VudGl0eTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuaG92ZXJPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Zlck9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdob3ZlcmVudGVyJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdGFydCByZXRpY2xlIHRpbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5hdXRvUmV0aWNsZVNlbGVjdCAmJiB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSB8fCB0aGlzLnRlbXBFbmFibGVSZXRpY2xlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV0aWNsZS5zdGFydCggdGhpcy5vblRhcC5iaW5kKCB0aGlzLCBldmVudCwgJ2NsaWNrJyApICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2Vkb3duJyAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0ICE9IGludGVyc2VjdF9lbnRpdHkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdCA9IGludGVyc2VjdF9lbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdGFydC1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2Vkb3duJyAmJiB0aGlzLnByZXNzT2JqZWN0ICE9IGludGVyc2VjdCApIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNzT2JqZWN0ID0gaW50ZXJzZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RhcnQnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2Vtb3ZlJyB8fCB0aGlzLm9wdGlvbnMuZW5hYmxlUmV0aWNsZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGludGVyc2VjdCAmJiBpbnRlcnNlY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzbW92ZS1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5wcmVzc09iamVjdCAmJiB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3Ntb3ZlJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoICFpbnRlcnNlY3RfZW50aXR5ICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc3N0b3AtZW50aXR5JywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoICFpbnRlcnNlY3QgJiYgdGhpcy5wcmVzc09iamVjdCAmJiB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RvcCcsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5mb3Nwb3QgaGFuZGxlclxuICAgICAgICBpZiAoIGludGVyc2VjdCAmJiBpbnRlcnNlY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgdGhpcy5pbmZvc3BvdCA9IGludGVyc2VjdDtcblx0XHRcdFxuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnY2xpY2snICkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIH1cblx0XHRcdFxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHRoaXMuaW5mb3Nwb3QgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUluZm9zcG90KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF1dG8gcm90YXRlXG4gICAgICAgIGlmICggdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGUgJiYgdGhpcy51c2VyTW91c2UudHlwZSAhPT0gJ21vdXNlbW92ZScgKSB7XG5cbiAgICAgICAgICAgIC8vIEF1dG8tcm90YXRlIGlkbGUgdGltZXJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCggdGhpcy5hdXRvUm90YXRlUmVxdWVzdElkICk7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5jb250cm9sID09PSB0aGlzLk9yYml0Q29udHJvbHMgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLk9yYml0Q29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JvdGF0ZVJlcXVlc3RJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCB0aGlzLmVuYWJsZUF1dG9SYXRlLmJpbmQoIHRoaXMgKSwgdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGVBY3RpdmF0aW9uRHVyYXRpb24gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cdFx0XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGNvbnZlcnRlZCBpbnRlcnNlY3RcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBpbnRlcnNlY3RzIFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRDb252ZXJ0ZWRJbnRlcnNlY3Q6IGZ1bmN0aW9uICggaW50ZXJzZWN0cyApIHtcblxuICAgICAgICBsZXQgaW50ZXJzZWN0O1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGludGVyc2VjdHMubGVuZ3RoOyBpKysgKSB7XG5cbiAgICAgICAgICAgIGlmICggaW50ZXJzZWN0c1tpXS5kaXN0YW5jZSA+PSAwICYmIGludGVyc2VjdHNbaV0ub2JqZWN0ICYmICFpbnRlcnNlY3RzW2ldLm9iamVjdC5wYXNzVGhyb3VnaCApIHtcblxuICAgICAgICAgICAgICAgIGlmICggaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5ICYmIGludGVyc2VjdHNbaV0ub2JqZWN0LmVudGl0eS5wYXNzVGhyb3VnaCApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5ICYmICFpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHkucGFzc1Rocm91Z2ggKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdCA9IGludGVyc2VjdHNbaV0ub2JqZWN0LmVudGl0eTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0ID0gaW50ZXJzZWN0c1tpXS5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW50ZXJzZWN0O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhpZGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgaGlkZUluZm9zcG90OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLmluZm9zcG90ICkge1xuXG4gICAgICAgICAgICB0aGlzLmluZm9zcG90Lm9uSG92ZXJFbmQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbmZvc3BvdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGNvbnRyb2wgYmFyXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBWaWV3ZXIjY29udHJvbC1iYXItdG9nZ2xlXG4gICAgICovXG4gICAgdG9nZ2xlQ29udHJvbEJhcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHsgd2lkZ2V0IH0gPSB0aGlzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUb2dnbGUgY29udHJvbCBiYXIgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFZpZXdlciNjb250cm9sLWJhci10b2dnbGVcbiAgICAgICAgICovXG4gICAgICAgIGlmICggd2lkZ2V0ICkge1xuXG4gICAgICAgICAgICB3aWRnZXQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnY29udHJvbC1iYXItdG9nZ2xlJyB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIGtleSBkb3duXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25LZXlEb3duOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggdGhpcy5vcHRpb25zLm91dHB1dCAmJiB0aGlzLm9wdGlvbnMub3V0cHV0ICE9PSAnbm9uZScgJiYgZXZlbnQua2V5ID09PSAnQ29udHJvbCcgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuT1VUUFVUX0lORk9TUE9UID0gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24ga2V5IHVwXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25LZXlVcDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuT1VUUFVUX0lORk9TUE9UID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvbnRyb2wgYW5kIGNhbGxiYWNrc1xuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBUV0VFTi51cGRhdGUoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrcy5mb3JFYWNoKCBmdW5jdGlvbiggY2FsbGJhY2sgKXsgY2FsbGJhY2soKTsgfSApO1xuXG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGUoKTtcblxuICAgICAgICB0aGlzLnNjZW5lLnRyYXZlcnNlKCBmdW5jdGlvbiggY2hpbGQgKXtcbiAgICAgICAgICAgIGlmICggY2hpbGQgaW5zdGFuY2VvZiBJbmZvc3BvdCBcblx0XHRcdFx0JiYgY2hpbGQuZWxlbWVudCBcblx0XHRcdFx0JiYgKCB0aGlzLmhvdmVyT2JqZWN0ID09PSBjaGlsZCBcblx0XHRcdFx0XHR8fCBjaGlsZC5lbGVtZW50LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyBcblx0XHRcdFx0XHR8fCAoY2hpbGQuZWxlbWVudC5sZWZ0ICYmIGNoaWxkLmVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpXG5cdFx0XHRcdFx0fHwgKGNoaWxkLmVsZW1lbnQucmlnaHQgJiYgY2hpbGQuZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpICkgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmNoZWNrU3ByaXRlSW5WaWV3cG9ydCggY2hpbGQgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldFNjcmVlblZlY3RvciggY2hpbGQuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApICk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnRyYW5zbGF0ZUVsZW1lbnQoIHgsIHkgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5vbkRpc21pc3MoKTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdFxuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbmRlcmluZyBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG4gICAgICogUmVuZGVyIHJldGljbGUgbGFzdFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuQ0FSREJPQVJEIHx8IHRoaXMubW9kZSA9PT0gTU9ERVMuU1RFUkVPICkge1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmVmZmVjdC5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG4gICAgICAgICAgICB0aGlzLmVmZmVjdC5yZW5kZXIoIHRoaXMuc2NlbmVSZXRpY2xlLCB0aGlzLmNhbWVyYSApO1xuXHRcdFx0XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCB0aGlzLnNjZW5lUmV0aWNsZSwgdGhpcy5jYW1lcmEgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQW5pbWF0ZVxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhbmltYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLmFuaW1hdGUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIGNoYW5nZVxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgbW91c2UgYW5kIHRvdWNoIGV2ZW50IG9uIGNvbnRhaW5lclxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0geyBwYXNzaXZlOiBmYWxzZSB9O1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nICwgXHR0aGlzLkhBTkRMRVJfTU9VU0VfRE9XTiwgb3B0aW9ucyApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJyAsIFx0dGhpcy5IQU5ETEVSX01PVVNFX01PVkUsIG9wdGlvbnMgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnXHQgLCBcdHRoaXMuSEFORExFUl9NT1VTRV9VUCAgLCBvcHRpb25zICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgXHR0aGlzLkhBTkRMRVJfTU9VU0VfRE9XTiwgb3B0aW9ucyApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnICAsIFx0dGhpcy5IQU5ETEVSX01PVVNFX1VQICAsIG9wdGlvbnMgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIG1vdXNlIGFuZCB0b3VjaCBldmVudCBvbiBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdW5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJyAsICB0aGlzLkhBTkRMRVJfTU9VU0VfRE9XTiwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScgLCAgdGhpcy5IQU5ETEVSX01PVVNFX01PVkUsIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJ1x0LCAgdGhpcy5IQU5ETEVSX01PVVNFX1VQICAsIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgIHRoaXMuSEFORExFUl9NT1VTRV9ET1dOLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnICAsICB0aGlzLkhBTkRMRVJfTU9VU0VfVVAgICwgZmFsc2UgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciByZXRpY2xlIGV2ZW50XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlZ2lzdGVyUmV0aWNsZUV2ZW50OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5hZGRVcGRhdGVDYWxsYmFjayggdGhpcy5IQU5ETEVSX1RBUCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVucmVnaXN0ZXIgcmV0aWNsZSBldmVudFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyUmV0aWNsZUV2ZW50OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVVcGRhdGVDYWxsYmFjayggdGhpcy5IQU5ETEVSX1RBUCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSByZXRpY2xlIGV2ZW50XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZVJldGljbGVFdmVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGNsaWVudFggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDIgKyB0aGlzLmNvbnRhaW5lci5vZmZzZXRMZWZ0O1xuICAgICAgICBjb25zdCBjbGllbnRZID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcblxuICAgICAgICB0aGlzLnJlbW92ZVVwZGF0ZUNhbGxiYWNrKCB0aGlzLkhBTkRMRVJfVEFQICk7XG4gICAgICAgIHRoaXMuSEFORExFUl9UQVAgPSB0aGlzLm9uVGFwLmJpbmQoIHRoaXMsIHsgY2xpZW50WCwgY2xpZW50WSB9ICk7XG4gICAgICAgIHRoaXMuYWRkVXBkYXRlQ2FsbGJhY2soIHRoaXMuSEFORExFUl9UQVAgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBjb250YWluZXIgYW5kIHdpbmRvdyBsaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVnaXN0ZXJFdmVudExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIFJlc2l6ZSBFdmVudFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScgLCB0aGlzLkhBTkRMRVJfV0lORE9XX1JFU0laRSwgdHJ1ZSApO1xuXG4gICAgICAgIC8vIEtleWJvYXJkIEV2ZW50XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMuSEFORExFUl9LRVlfRE9XTiwgdHJ1ZSApO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJyAgLCB0aGlzLkhBTkRMRVJfS0VZX1VQXHQgLCB0cnVlICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlciBjb250YWluZXIgYW5kIHdpbmRvdyBsaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gUmVzaXplIEV2ZW50XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJyAsIHRoaXMuSEFORExFUl9XSU5ET1dfUkVTSVpFLCB0cnVlICk7XG5cbiAgICAgICAgLy8gS2V5Ym9hcmQgRXZlbnRcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcy5IQU5ETEVSX0tFWV9ET1dOLCB0cnVlICk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5dXAnICAsIHRoaXMuSEFORExFUl9LRVlfVVAgICwgdHJ1ZSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgYWxsIHNjZW5lIG9iamVjdHMgYW5kIGNsZWFyIGNhY2hlXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnR3ZWVuTGVmdEFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgIHRoaXMudHdlZW5VcEFuaW1hdGlvbi5zdG9wKCk7XG5cbiAgICAgICAgLy8gVW5yZWdpc3RlciBkb20gZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMudW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgLy8gcmVjdXJzaXZlIGRpc3Bvc2FsIG9uIDNkIG9iamVjdHNcbiAgICAgICAgZnVuY3Rpb24gcmVjdXJzaXZlRGlzcG9zZSAoIG9iamVjdCApIHtcblxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cbiAgICAgICAgICAgICAgICByZWN1cnNpdmVEaXNwb3NlKCBvYmplY3QuY2hpbGRyZW5baV0gKTtcbiAgICAgICAgICAgICAgICBvYmplY3QucmVtb3ZlKCBvYmplY3QuY2hpbGRyZW5baV0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFBhbm9yYW1hIHx8IG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSBudWxsO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBvYmplY3QuZGlzcGF0Y2hFdmVudCApe1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0LmRpc3BhdGNoRXZlbnQoICdkaXNwb3NlJyApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJlY3Vyc2l2ZURpc3Bvc2UoIHRoaXMuc2NlbmUgKTtcblxuICAgICAgICAvLyBkaXNwb3NlIHdpZGdldFxuICAgICAgICBpZiAoIHRoaXMud2lkZ2V0ICkge1xuXG4gICAgICAgICAgICB0aGlzLndpZGdldC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLndpZGdldCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIGNhY2hlXG4gICAgICAgIGlmICggVEhSRUUuQ2FjaGUgJiYgVEhSRUUuQ2FjaGUuZW5hYmxlZCApIHtcblxuICAgICAgICAgICAgVEhSRUUuQ2FjaGUuY2xlYXIoKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB2aWV3ZXIgYnkgZGlzcG9zaW5nIGFuZCBzdG9wcGluZyByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMucmVxdWVzdEFuaW1hdGlvbklkICk7XHRcdFxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIHBhbm9yYW1hIGRpc3Bvc2VcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25QYW5vcmFtYURpc3Bvc2U6IGZ1bmN0aW9uICggcGFub3JhbWEgKSB7XG5cbiAgICAgICAgaWYgKCBwYW5vcmFtYSBpbnN0YW5jZW9mIFZpZGVvUGFub3JhbWEgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZVZpZGVvV2lkZ2V0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcGFub3JhbWEgPT09IHRoaXMucGFub3JhbWEgKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFub3JhbWEgPSBudWxsO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGFqYXggY2FsbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBVUkwgdG8gYmUgcmVxdWVzdGVkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGFmdGVyIHJlcXVlc3QgY29tcGxldGVzXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWRBc3luY1JlcXVlc3Q6IGZ1bmN0aW9uICggdXJsLCBjYWxsYmFjayA9ICgpID0+IHt9ICkge1xuXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCBldmVudCApO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oICdHRVQnLCB1cmwsIHRydWUgKTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCBudWxsICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmlldyBpbmRpY2F0b3IgaW4gdXBwZXIgbGVmdFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRWaWV3SW5kaWNhdG9yOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRWaWV3SW5kaWNhdG9yICggYXN5bmNFdmVudCApIHtcblxuICAgICAgICAgICAgaWYgKCBhc3luY0V2ZW50LmxvYWRlZCA9PT0gMCApIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgdmlld0luZGljYXRvckRpdiA9IGFzeW5jRXZlbnQudGFyZ2V0LnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUud2lkdGggPSBzY29wZS52aWV3SW5kaWNhdG9yU2l6ZSArICdweCc7XG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLmhlaWdodCA9IHNjb3BlLnZpZXdJbmRpY2F0b3JTaXplICsgJ3B4JztcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgdmlld0luZGljYXRvckRpdi5zdHlsZS50b3AgPSAnMTBweCc7XG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLmxlZnQgPSAnMTBweCc7XG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgdmlld0luZGljYXRvckRpdi5pZCA9ICdwYW5vbGVucy12aWV3LWluZGljYXRvci1jb250YWluZXInO1xuXG4gICAgICAgICAgICBzY29wZS5jb250YWluZXIuYXBwZW5kQ2hpbGQoIHZpZXdJbmRpY2F0b3JEaXYgKTtcblxuICAgICAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gdmlld0luZGljYXRvckRpdi5xdWVyeVNlbGVjdG9yKCAnI2luZGljYXRvcicgKTtcbiAgICAgICAgICAgIGNvbnN0IHNldEluZGljYXRvckQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5yYWRpdXMgPSBzY29wZS52aWV3SW5kaWNhdG9yU2l6ZSAqIDAuMjI1O1xuICAgICAgICAgICAgICAgIHNjb3BlLmN1cnJlbnRQYW5vQW5nbGUgPSBzY29wZS5jYW1lcmEucm90YXRpb24ueSAtIFRIUkVFLk1hdGguZGVnVG9SYWQoIDkwICk7XG4gICAgICAgICAgICAgICAgc2NvcGUuZm92QW5nbGUgPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5jYW1lcmEuZm92ICkgO1xuICAgICAgICAgICAgICAgIHNjb3BlLmxlZnRBbmdsZSA9IC1zY29wZS5jdXJyZW50UGFub0FuZ2xlIC0gc2NvcGUuZm92QW5nbGUgLyAyO1xuICAgICAgICAgICAgICAgIHNjb3BlLnJpZ2h0QW5nbGUgPSAtc2NvcGUuY3VycmVudFBhbm9BbmdsZSArIHNjb3BlLmZvdkFuZ2xlIC8gMjtcbiAgICAgICAgICAgICAgICBzY29wZS5sZWZ0WCA9IHNjb3BlLnJhZGl1cyAqIE1hdGguY29zKCBzY29wZS5sZWZ0QW5nbGUgKTtcbiAgICAgICAgICAgICAgICBzY29wZS5sZWZ0WSA9IHNjb3BlLnJhZGl1cyAqIE1hdGguc2luKCBzY29wZS5sZWZ0QW5nbGUgKTtcbiAgICAgICAgICAgICAgICBzY29wZS5yaWdodFggPSBzY29wZS5yYWRpdXMgKiBNYXRoLmNvcyggc2NvcGUucmlnaHRBbmdsZSApO1xuICAgICAgICAgICAgICAgIHNjb3BlLnJpZ2h0WSA9IHNjb3BlLnJhZGl1cyAqIE1hdGguc2luKCBzY29wZS5yaWdodEFuZ2xlICk7XG4gICAgICAgICAgICAgICAgc2NvcGUuaW5kaWNhdG9yRCA9ICdNICcgKyBzY29wZS5sZWZ0WCArICcgJyArIHNjb3BlLmxlZnRZICsgJyBBICcgKyBzY29wZS5yYWRpdXMgKyAnICcgKyBzY29wZS5yYWRpdXMgKyAnIDAgMCAxICcgKyBzY29wZS5yaWdodFggKyAnICcgKyBzY29wZS5yaWdodFk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHNjb3BlLmxlZnRYICYmIHNjb3BlLmxlZnRZICYmIHNjb3BlLnJpZ2h0WCAmJiBzY29wZS5yaWdodFkgJiYgc2NvcGUucmFkaXVzICkge1xuXG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvci5zZXRBdHRyaWJ1dGUoICdkJywgc2NvcGUuaW5kaWNhdG9yRCApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5hZGRVcGRhdGVDYWxsYmFjayggc2V0SW5kaWNhdG9yRCApO1xuXG4gICAgICAgICAgICBjb25zdCBpbmRpY2F0b3JPbk1vdXNlRW50ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGluZGljYXRvck9uTW91c2VMZWF2ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgaW5kaWNhdG9yT25Nb3VzZUVudGVyICk7XG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgaW5kaWNhdG9yT25Nb3VzZUxlYXZlICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRBc3luY1JlcXVlc3QoIERhdGFJbWFnZS5WaWV3SW5kaWNhdG9yLCBsb2FkVmlld0luZGljYXRvciApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBjdXN0b20gY29udHJvbCBpdGVtIHRvIGV4aXN0aW5nIGNvbnRyb2wgYmFyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb249e31dIC0gU3R5bGUgb2JqZWN0IHRvIG92ZXJ3aXJ0ZSBkZWZhdWx0IGVsZW1lbnQgc3R5bGUuIEl0IHRha2VzICdzdHlsZScsICdvblRhcCcgYW5kICdncm91cCcgcHJvcGVydGllcy5cbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYXBwZW5kQ29udHJvbEl0ZW06IGZ1bmN0aW9uICggb3B0aW9uICkge1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLndpZGdldC5jcmVhdGVDdXN0b21JdGVtKCBvcHRpb24gKTtcdFx0XG5cbiAgICAgICAgaWYgKCBvcHRpb24uZ3JvdXAgPT09ICd2aWRlbycgKSB7XG5cbiAgICAgICAgICAgIHRoaXMud2lkZ2V0LnZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZCggaXRlbSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMud2lkZ2V0LmJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoIGl0ZW0gKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIGNhY2hlZCBmaWxlc1xuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjbGVhckFsbENhY2hlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgVEhSRUUuQ2FjaGUuY2xlYXIoKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBWaWV3ZXIgfTsiLCJpbXBvcnQgeyBUSFJFRV9SRVZJU0lPTiB9IGZyb20gJy4vQ29uc3RhbnRzJztcblxuaWYgKCBUSFJFRS5SRVZJU0lPTiAhPSBUSFJFRV9SRVZJU0lPTiApIHtcblxuICAgIGNvbnNvbGUud2FybiggYHRocmVlLmpzIHZlcnNpb24gaXMgbm90IG1hdGNoZWQuIFBsZWFzZSBjb25zaWRlciB1c2UgdGhlIHRhcmdldCByZXZpc2lvbiAke1RIUkVFX1JFVklTSU9OfWAgKTtcblxufSIsIi8qKlxuICogUGFub2xlbnMuanNcbiAqIEBhdXRob3IgcGNoZW42NlxuICogQG5hbWVzcGFjZSBQQU5PTEVOU1xuICovXG5leHBvcnQgKiBmcm9tICcuL0NvbnN0YW50cyc7XG5leHBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuL0RhdGFJbWFnZSc7XG5leHBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vbG9hZGVycy9JbWFnZUxvYWRlcic7XG5leHBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi9sb2FkZXJzL1RleHR1cmVMb2FkZXInO1xuZXhwb3J0IHsgQ3ViZVRleHR1cmVMb2FkZXIgfSBmcm9tICcuL2xvYWRlcnMvQ3ViZVRleHR1cmVMb2FkZXInO1xuZXhwb3J0IHsgTWVkaWEgfSBmcm9tICcuL21lZGlhL01lZGlhJztcbmV4cG9ydCB7IFJldGljbGUgfSBmcm9tICcuL2ludGVyZmFjZS9SZXRpY2xlJztcbmV4cG9ydCB7IEluZm9zcG90IH0gZnJvbSAnLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5leHBvcnQgeyBXaWRnZXQgfSBmcm9tICcuL3dpZGdldC9XaWRnZXQnO1xuZXhwb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL1Bhbm9yYW1hJztcbmV4cG9ydCB7IEltYWdlUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0ltYWdlUGFub3JhbWEnO1xuZXhwb3J0IHsgRW1wdHlQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvRW1wdHlQYW5vcmFtYSc7XG5leHBvcnQgeyBDdWJlUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0N1YmVQYW5vcmFtYSc7XG5leHBvcnQgeyBCYXNpY1Bhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9CYXNpY1Bhbm9yYW1hJztcbmV4cG9ydCB7IFZpZGVvUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL1ZpZGVvUGFub3JhbWEnO1xuZXhwb3J0IHsgR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9Hb29nbGVTdHJlZXR2aWV3UGFub3JhbWEnO1xuZXhwb3J0IHsgTGl0dGxlUGxhbmV0IH0gZnJvbSAnLi9wYW5vcmFtYS9MaXR0bGVQbGFuZXQnO1xuZXhwb3J0IHsgSW1hZ2VMaXR0bGVQbGFuZXQgfSBmcm9tICcuL3Bhbm9yYW1hL0ltYWdlTGl0dGxlUGxhbmV0JztcbmV4cG9ydCB7IENhbWVyYVBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9DYW1lcmFQYW5vcmFtYSc7XG5leHBvcnQgeyBWaWV3ZXIgfSBmcm9tICcuL3ZpZXdlci9WaWV3ZXInO1xuaW1wb3J0ICcuL0NoZWNrJztcblxuLy8gZXhwb3NlIFRXRUVOXG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xud2luZG93LlRXRUVOID0gVFdFRU47Il0sIm5hbWVzIjpbIlRIUkVFLkNhY2hlIiwiVEhSRUUuVGV4dHVyZSIsIlRIUkVFLlJHQkZvcm1hdCIsIlRIUkVFLlJHQkFGb3JtYXQiLCJUSFJFRS5DdWJlVGV4dHVyZSIsIlRIUkVFLkV2ZW50RGlzcGF0Y2hlciIsIlRIUkVFLlZpZGVvVGV4dHVyZSIsIlRIUkVFLkxpbmVhckZpbHRlciIsIlRIUkVFLlNwcml0ZU1hdGVyaWFsIiwiVEhSRUUuU3ByaXRlIiwiVEhSRUUuQ29sb3IiLCJUSFJFRS5DYW52YXNUZXh0dXJlIiwidGhpcyIsIlRIUkVFLkRvdWJsZVNpZGUiLCJUV0VFTiIsIlRIUkVFLlZlY3RvcjMiLCJUSFJFRS5NZXNoIiwiVEhSRUUuQmFja1NpZGUiLCJUSFJFRS5PYmplY3QzRCIsIlRIUkVFLlNwaGVyZUJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwiLCJUSFJFRS5CdWZmZXJHZW9tZXRyeSIsIlRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSIsIlRIUkVFLlNoYWRlckxpYiIsIlRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuU2hhZGVyTWF0ZXJpYWwiLCJUSFJFRS5NYXRyaXg0IiwiVEhSRUUuVmVjdG9yMiIsIlRIUkVFLlF1YXRlcm5pb24iLCJUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuTWF0aCIsIlRIUkVFLk1PVVNFIiwiVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEiLCJUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEiLCJUSFJFRS5FdWxlciIsIlRIUkVFLlNjZW5lIiwiVEhSRUUuU3RlcmVvQ2FtZXJhIiwiVEhSRUUuTmVhcmVzdEZpbHRlciIsIlRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0IiwiVEhSRUUuV2ViR0xSZW5kZXJlciIsIlRIUkVFLlJheWNhc3RlciIsIlRIUkVFLkZydXN0dW0iLCJUSFJFRS5SRVZJU0lPTiJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQVksTUFBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQVksTUFBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFBWSxNQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQVksTUFBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFD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QUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7R0FFekM7O0VBRUQ7O0NBRUQsV0FBVyxFQUFFOztFQUVaLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTs7R0FFaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0dBRTNDOztFQUVELEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRTs7R0FFakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0dBRS9DOztFQUVELEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRTs7R0FFbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ1osT0FBTyxDQUFDLENBQUM7SUFDVDs7R0FFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDWixPQUFPLENBQUMsQ0FBQztJQUNUOztHQUVELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUNqQixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkM7O0dBRUQsT0FBTyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7R0FFakQ7O0VBRUQ7O0NBRUQsUUFBUSxFQUFFOztFQUVULEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTs7R0FFaEIsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztHQUVoQzs7RUFFRCxHQUFHLEVBQUUsVUFBVSxDQUFD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O0VBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7RUFFOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOztHQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDVixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDOztHQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztHQUUzRSxNQUFNOztHQUVOLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RDs7R0FFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDVixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHO0FBQ3REO0FBQ0EsSUFBSSxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUM1QztBQUNBLElBQUksUUFBUSxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzFDO0FBQ0EsSUFBSUgsTUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUM5QjtBQUNBLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7QUFDM0I7QUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxLQUFLLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzdELElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDL0I7QUFDQSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDM0IsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUM1QjtBQUNBLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzdCO0FBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUM5QjtBQUNBLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDMUI7QUFDQSxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFB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Q2xGO0FBQ0EsWUFBWSxJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ3pGLFlBQVksR0FBRyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDbkc7QUFDQSxZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxHQUFHLElBQUksR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDO0FBQzFHO0FBQ0EsWUFBWSxJQUFJLElBQUksU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDOUM7QUFDQSxZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxHQUFHLElBQUksR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDO0FBQzNHO0FBQ0EsU0FBUyxNQUFNO0FBQ2Y7QUFDQSxZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLEdBQUcsSUFBSSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUM7QUFDckc7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxlQUFlLEVBQUUsV0FBVyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRztBQUN2RDtBQUNBLFFBQVEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUNwQztBQUNBLFFBQVEsS0FBSyxJQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3BDO0FBQ0EsWUFBWSxLQUFLLENB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QUUsV0FBVyxLQUFLLEdBQUc7QUFDcEM7QUFDQSxRQUFRLE1BQU0sVUFBVSxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLEVBQUU7QUFDM0U7QUFDQSxRQUFRLFNBQVMsVUFBVTtBQUMzQjtBQUNBLFFBQVEsS0FBSyxDQUFDO0FBQ2Q7QUFDQSxZQUFZLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUMxRixZQUFZLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUMxRjtBQUNBLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDakMsWUFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDdkM7QUFDQSxZQUFZLE1BQU07QUFDbEI7QUFDQSxRQUFRLEtBQUssQ0FBQztBQUNkO0FBQ0EsWUFBWSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUMzRSxZQUFZLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQzNFLFlBQVksTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVB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RUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQzlEO0FBQ0EsUUFBUSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzdDO0FBQ0E7QUFDQSxRQUFRLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7QUFDcEY7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDL0I7QUFDQSxRQUFRLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNoRSxRQUFRLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDNUMsUUFBUSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDaEU7QUFDQTtBQUNBLFFBQVEsTUFBTSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUM5QztBQUNBLFFBQVEsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ25EO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDMUM7QUFDQSxRQUFRLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDdkIsUUFBUSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFFBQVEsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNsQixRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLEtBQUssWUFBWSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRztBQUN6RSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHO0FBQ3RFO0FBQ0EsWUFBWSxLQUFLLFlBQVksS0FBSyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUU7QUFDL0U7QUFDQSxZQUFZLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0RCxZQUFZLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMxRDtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWTtBQUM3QjtBQUNBLFFBQVEsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDM0I7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDcEQsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3RDO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDN0MsUUFBUSxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQzFDO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdEI7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZO0FBQ3JDO0FBQ0EsUUFBUSxPQUFPLEdBQUcsQ0FBQztBQUNuQjtBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0EsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWTtBQUN6QztBQUNBLFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckI7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksU0FBUyxvQkFBb0IsR0FBRztBQUNwQztBQUNBLFFBQVEsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7QUFDN0Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsWUFBWSxHQUFHO0FBQzVCO0FBQ0EsUUFBUSxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxXQUFXLEVBQUUsS0FBSyxHQUFHO0FBQ2xDO0FBQ0EsUUFBUSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQzNCO0FBQ0EsS0FBSyxZQUFZLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNuQztBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssR0FBRyxPQUFPO0FBQzlDLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CO0FBQ0EsUUFBUSxLQUFLLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUc7QUFDekQsWUFBWSxLQUFLLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLE9BQU87QUFDbEQ7QUFDQSxZQUFZLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2pDO0FBQ0EsWUFBWSxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzVEO0FBQ0EsU0FBUyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRztBQUMvRCxZQUFZLEtBQUssS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsT0FBTztBQUNoRDtBQUNBLFlBQVksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDaEM7QUFDQSxZQUFZLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0Q7QUFDQSxTQUFTLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHO0FBQzlELFlBQVksS0FBSyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksR0FBRyxPQUFPO0FBQy9DO0FBQ0EsWUFBWSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUM5QjtBQUNBLFlBQVksUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6RDtBQUNBLFNBQVM7QUFDVDtBQUNBLFFBQVEsS0FBSyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksR0FBRztBQUNwQyxZQUFZLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3pFLFlBQVksUUFBUSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDckUsWUFBWSxLQUFLLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDO0FBQzlDLFNBQVM7QUFDVDtBQUNBLFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLFdBQVcsRUFBRSxLQUFLLEdBQUc7QUFDbEM7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLEdBQUcsT0FBTztBQUM5QztBQUNBLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CO0FBQ0EsUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVSxLQUFLLFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0FBQy9GO0FBQ0EsUUFBUSxLQUFLLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHO0FBQ3RDO0FBQ0EsWUFBWSxLQUFLLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLE9BQU87QUFDbEQ7QUFDQSxZQUFZLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDMUQsWUFBWSxXQUFXLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUM3RDtBQUNBO0FBQ0EsWUFBWSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDdEc7QUFDQTtBQUNBLFlBQVksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3JHO0FBQ0EsWUFBWSxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQzFDO0FBQ0EsWUFBWSxJQUFJLGFBQWEsRUFBRTtBQUMvQixnQkFBZ0IsWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUNyRSxnQkFBZ0IsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUNuRSxhQUFhO0FBQ2I7QUFDQSxZQUFZLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDbEM7QUFDQSxTQUFTLE1BQU0sS0FBSyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssR0FBRztBQUM1QztBQUNBLFlBQVksS0FBSyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksR0FBRyxPQUFPO0FBQ2hEO0FBQ0EsWUFBWSxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pELFlBQVksVUFBVSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDMUQ7QUFDQSxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDcEM7QUFDQSxnQkFBZ0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsYUFBYSxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDM0M7QUFDQSxnQkFBZ0IsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2pDO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsWUFBWSxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3hDO0FBQ0EsU0FBUyxNQUFNLEtBQUssS0FBSyxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUc7QUFDMUM7QUFDQSxZQUFZLEtBQUssS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLEdBQUcsT0FBTztBQUMvQztBQUNBLFlBQVksTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN2RCxZQUFZLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3BEO0FBQ0EsWUFBWSxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2hEO0FBQ0EsWUFBWSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ3BDO0FBQ0EsU0FBUztBQUNUO0FBQ0EsUUFBUSxLQUFLLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuRDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxTQUFTLGdCQUFnQjtBQUN0QztBQUNBLFFBQVEsVUFBVSxHQUFHLElBQUksQ0FBQztBQUMxQjtBQUNBLFFBQVEsYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUNsQztBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssR0FBRyxPQUFPO0FBQzlDO0FBQ0EsUUFBUSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxRQUFRLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3BFLFFBQVEsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUN4QyxRQUFRLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzNCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLFlBQVksRUFBRSxLQUFLLEdBQUc7QUFDbkM7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTztBQUMvRjtBQUNBLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CLFFBQVEsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsUUFBUSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdEI7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEdBQUc7QUFDOUM7QUFDQSxZQUFZLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0FBQ3JDO0FBQ0EsU0FBUyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEdBQUc7QUFDakQ7QUFDQSxZQUFZLEtBQUssR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbkM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRztBQUN6QjtBQUNBO0FBQ0EsWUFBWSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNO0FBQ2hFLGtCQUFrQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLGtCQUFrQixLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CLFlBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2xEO0FBQ0EsU0FBUyxNQUFNLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRztBQUNoQztBQUNBO0FBQ0EsWUFBWSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNO0FBQ2hFLGtCQUFrQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLGtCQUFrQixLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CLFlBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2xEO0FBQ0EsU0FBUztBQUNUO0FBQ0EsUUFBUSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIsUUFBUSxLQUFLLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQzNDLFFBQVEsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUMxQyxRQUFRLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDeEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsT0FBTyxHQUFHLEtBQUssR0FBRztBQUMvQjtBQUNBLFFBQVEsU0FBUyxLQUFLLENBQUMsT0FBTztBQUM5QjtBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDMUIsWUFBWSxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDOUIsWUFBWSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQzlCLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7QUFDNUIsWUFBWSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDN0IsWUFBWSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQzdCLFlBQVksTUFBTTtBQUNsQjtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxTQUFTLEVBQUUsS0FBSyxHQUFHO0FBQ2hDO0FBQ0EsUUFBUSxLQUFLLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLE9BQU87QUFDbEc7QUFDQSxRQUFRLFNBQVMsS0FBSyxDQUFDLE9BQU87QUFDOUI7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFCLFlBQVksS0FBSyxHQUFHLElBQUksQ0FBQztBQUN6QixZQUFZLE1BQU07QUFDbEI7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNO0FBQzlCLFlBQVksU0FBUyxHQUFHLElBQUksQ0FBQztBQUM3QixZQUFZLE1BQU07QUFDbEI7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQzVCLFlBQVksT0FBTyxHQUFHLElBQUksQ0FBQztBQUMzQixZQUFZLE1BQU07QUFDbEI7QUFDQSxRQUFRLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO0FBQzdCLFlBQVksUUFBUSxHQUFHLElBQUksQ0FBQztBQUM1QixZQUFZLE1BQU07QUFDbEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO0FBQ3ZEO0FBQ0EsWUFBWSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQzlCO0FBQ0EsWUFBWSxJQUFJLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRSxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztBQUN0RixZQUFZLElBQUksU0FBUyxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztBQUN4RixZQUFZLElBQUksT0FBTyxFQUFFLFlBQVksR0FBRyxFQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0FBQzFGLFlBQVksSUFBSSxRQUFRLEVBQUUsWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0FBQ3pGO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLFVBQVUsRUFBRSxLQUFLLEdBQUc7QUFDakM7QUFDQSxRQUFRLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDM0I7QUFDQSxRQUFRLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDO0FBQ0EsUUFBUSxLQUFLLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxHQUFHLE9BQU87QUFDOUM7QUFDQSxRQUFRLFNBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNO0FBQ3JDO0FBQ0EsUUFBUSxLQUFLLENBQUM7QUFDZDtBQUNBLFlBQVksS0FBSyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksR0FBRyxPQUFPO0FBQ2xEO0FBQ0EsWUFBWSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN2QztBQUNBLFlBQVksV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2xGLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxDQUFDO0FBQ2Q7QUFDQSxZQUFZLEtBQUssS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsT0FBTztBQUNoRDtBQUNBLFlBQVksS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDdEM7QUFDQSxZQUFZLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3pFLFlBQVksSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDekUsWUFBWSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQzFEO0FBQ0EsWUFBWSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUMxQztBQUNBLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxDQUFDO0FBQ2Q7QUFDQSxZQUFZLEtBQUssS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLEdBQUcsT0FBTztBQUMvQztBQUNBLFlBQVksS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDcEM7QUFDQSxZQUFZLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMvRSxZQUFZLE1BQU07QUFDbEI7QUFDQSxRQUFRO0FBQ1I7QUFDQSxZQUFZLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQy9CO0FBQ0EsU0FBUztBQUNUO0FBQ0EsUUFBUSxLQUFLLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDdEU7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsU0FBUyxFQUFFLEtBQUssR0FBRztBQUNoQztBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssR0FBRyxPQUFPO0FBQzlDO0FBQ0EsUUFBUSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDL0IsUUFBUSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDaEM7QUFDQSxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFVLEtBQUssUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDL0Y7QUFDQSxRQUFRLFNBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNO0FBQ3JDO0FBQ0EsUUFBUSxLQUFLLENBQUM7QUFDZDtBQUNBLFlBQVksS0FBSyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksR0FBRyxPQUFPO0FBQ2xELFlBQVksS0FBSyxLQUFLLEtBQUssS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPO0FBQ3ZEO0FBQ0EsWUFBWSxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEYsWUFBWSxXQUFXLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUM3RDtBQUNBO0FBQ0EsWUFBWSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDdEc7QUFDQSxZQUFZLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNyRztBQUNBLFlBQVksV0FBVyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUMxQztBQUNBLFlBQVksSUFBSSxhQUFhLEVBQUU7QUFDL0IsZ0JBQWdCLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO0FBQzlFLGdCQUFnQixVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUM1RSxhQUFhO0FBQ2I7QUFDQSxZQUFZLGFBQWEsR0FBRztBQUM1QixnQkFBZ0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSztBQUMvQyxnQkFBZ0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSztBQUMvQyxhQUFhLENBQUM7QUFDZDtBQUNBLFlBQVksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxDQUFDO0FBQ2Q7QUFDQSxZQUFZLEtBQUssS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsT0FBTztBQUNoRCxZQUFZLEtBQUssS0FBSyxLQUFLLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTztBQUN0RDtBQUNBLFlBQVksSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDekUsWUFBWSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUN6RSxZQUFZLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFDMUQ7QUFDQSxZQUFZLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3hDLFlBQVksVUFBVSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDMUQ7QUFDQSxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDcEM7QUFDQSxnQkFBZ0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTTtBQUNwRSxzQkFBc0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMxQyxzQkFBc0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNuQyxnQkFBZ0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3REO0FBQ0EsYUFBYSxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDM0M7QUFDQSxnQkFBZ0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTTtBQUNwRSxzQkFBc0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMxQyxzQkFBc0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNuQyxnQkFBZ0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3REO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsWUFBWSxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3hDO0FBQ0EsWUFBWSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsWUFBWSxLQUFLLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQy9DLFlBQVksTUFBTTtBQUNsQjtBQUNBLFFBQVEsS0FBSyxDQUFDO0FBQ2Q7QUFDQSxZQUFZLEtBQUssS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLEdBQUcsT0FBTztBQUMvQyxZQUFZLEtBQUssS0FBSyxLQUFLLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTztBQUNwRDtBQUNBLFlBQVksTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzdFLFlBQVksUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDcEQ7QUFDQSxZQUFZLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDaEQ7QUFDQSxZQUFZLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDcEM7QUFDQSxZQUFZLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzQixZQUFZLE1BQU07QUFDbEI7QUFDQSxRQUFRO0FBQ1I7QUFDQSxZQUFZLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQy9CO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLFFBQVEsZ0JBQWdCO0FBQ3JDO0FBQ0EsUUFBUSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQzFCO0FBQ0EsUUFBUSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBQ2xDO0FBQ0EsUUFBUSxLQUFLLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxHQUFHLE9BQU87QUFDOUM7QUFDQSxRQUFRLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDeEMsUUFBUSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztBQUMzQjtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXO0FBQzlCO0FBQ0EsUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUN4RSxRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDO0FBQzFFLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsQ0FBQztBQUM5RTtBQUNBLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDeEUsUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUNwRSxRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQ3RFO0FBQ0EsUUFBUSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ3ZELFFBQVEsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUMzRDtBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0FBQ3JGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7QUFDdkYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0FBQzNGO0FBQ0EsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztBQUNyRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0FBQ2pGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7QUFDbkY7QUFDQSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7QUFDcEUsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0FBQ3hFO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNsQjtBQUNBLENBQUMsQUFDRDtBQUNBLGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFNUIsZUFBcUIsQ0FBQyxTQUFTLEVBQUUsRUFBRTtBQUMzRjtBQUNBLElBQUksV0FBVyxFQUFFLGFBQWE7QUFDOUI7QUFDQSxDQUFDLEVBQUUsQ0FBQzs7QUMxMUJKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx5QkFBeUIsR0FBRyxNQUFNLEVBQUUsVUFBVSxHQUFHO0FBQzFEO0FBQ0EsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDckIsSUFBSSxJQUFJLFdBQVcsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUN6QztBQUNBLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCO0FBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUMxQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxVQUFVLEtBQUssU0FBUyxLQUFLLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDM0U7QUFDQSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3hCO0FBQ0EsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLElBQUksSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUMvQjtBQUNBLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQzlCO0FBQ0E7QUFDQSxJQUFJLElBQUksOEJBQThCLEdBQUcsVUFBVSxLQUFLLEdBQUc7QUFDM0Q7QUFDQSxRQUFRLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDeEM7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksSUFBSSw4QkFBOEIsR0FBRyxXQUFXO0FBQ3BEO0FBQ0EsUUFBUSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7QUFDMUQ7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksSUFBSSxpQkFBaUIsR0FBRyxVQUFVLEtBQUssRUFBRTtBQUM3QztBQUNBLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CLFFBQVEsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsUUFBUSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDekMsUUFBUSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDekM7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLEtBQUssRUFBRTtBQUM1QztBQUNBLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CLFFBQVEsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsUUFBUSxJQUFJLElBQUl5QixNQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ2hGLFFBQVEsSUFBSSxJQUFJQSxNQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ2hGO0FBQ0EsUUFBUSxLQUFLLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDN0M7QUFDQSxRQUFRLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUN6QyxRQUFRLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUN6QztBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxtQkFBbUIsR0FBRyxVQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEdBQUc7QUFDakY7QUFDQSxRQUFRLElBQUksR0FBRyxHQUFHLElBQUlmLE9BQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQy9DO0FBQ0EsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJbUIsS0FBVyxFQUFFLENBQUM7QUFDdEM7QUFDQSxRQUFRLElBQUksRUFBRSxHQUFHLElBQUlOLFVBQWdCLEVBQUUsQ0FBQztBQUN4QztBQUNBLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSUEsVUFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFDcEY7QUFDQSxRQUFRLElBQUksYUFBYSxDQUFDO0FBQzFCLFFBQVEsSUFBSSxRQUFRLEdBQUcsSUFBSUEsVUFBZ0IsRUFBRSxDQUFDO0FBQzlDLFFBQVEsSUFBSSxRQUFRLEdBQUcsSUFBSUEsVUFBZ0IsRUFBRSxDQUFDO0FBQzlDO0FBQ0EsUUFBUSxLQUFLLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLEdBQUc7QUFDNUM7QUFDQSxZQUFZLGFBQWEsR0FBRyxJQUFJYixPQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN6RCxZQUFZLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5RDtBQUNBLFNBQVMsTUFBTSxLQUFLLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxHQUFHLEdBQUc7QUFDckQ7QUFDQSxZQUFZLGFBQWEsR0FBRyxJQUFJQSxPQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN6RCxZQUFZLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDN0Q7QUFDQSxTQUFTLE1BQU0sS0FBSyxLQUFLLENBQUMsaUJBQWlCLElBQUksRUFBRSxHQUFHO0FBQ3BEO0FBQ0EsWUFBWSxhQUFhLEdBQUcsSUFBSUEsT0FBYSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDekQsWUFBWSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQzdEO0FBQ0EsU0FBUyxNQUFNLEtBQUssS0FBSyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsRUFBRSxFQUFFO0FBQ3JEO0FBQ0EsWUFBWSxhQUFhLEdBQUcsSUFBSUEsT0FBYSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDekQsWUFBWSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDOUQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDaEMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsUUFBUSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDakQ7QUFDQSxRQUFRLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDekM7QUFDQSxRQUFRLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDbEM7QUFDQSxRQUFRLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7QUFDcEU7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXO0FBQzlCO0FBQ0EsUUFBUSw4QkFBOEIsRUFBRSxDQUFDO0FBQ3pDO0FBQ0EsUUFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsOEJBQThCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUMxRyxRQUFRLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSw4QkFBOEIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQzFHLFFBQVEsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7QUFDcEc7QUFDQSxRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7QUFDakcsUUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0FBQy9GO0FBQ0EsUUFBUSxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUM3QjtBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0EsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVc7QUFDakM7QUFDQSxRQUFRLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNqRyxRQUFRLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNqRyxRQUFRLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUMzRjtBQUNBLFFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDdkYsUUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNyRjtBQUNBLFFBQVEsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDOUI7QUFDQSxLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLFlBQVksR0FBRztBQUMzQztBQUNBLFFBQVEsS0FBSyxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssR0FBRyxPQUFPO0FBQzlDO0FBQ0EsUUFBUSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHZSxNQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQ3RJLFFBQVEsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBR0EsTUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFHLFFBQVEsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBR0EsTUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdHLFFBQVEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixHQUFHQSxNQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsRztBQUNBLFFBQVEsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDbkYsUUFBUSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUM1QjtBQUNBLFFBQVEsS0FBSyxZQUFZLEtBQUssSUFBSSxHQUFHLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFO0FBQzVFO0FBQ0EsS0FBSyxDQUFDO0FBQ047QUFDQSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLEtBQUssR0FBRztBQUNwRDtBQUNBLFFBQVEsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUN0QyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN0QjtBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVc7QUFDOUI7QUFDQSxRQUFRLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMxQjtBQUNBLEtBQUssQ0FBQztBQUNOO0FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkI7QUFDQSxDQUFDLEFBQ0Q7QUFDQSx5QkFBeUIsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFekIsZUFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUN0RztBQUNBLElBQUksV0FBVyxFQUFFLHlCQUF5QjtBQUMxQztBQUNBLENBQUMsRUFBRSxDQUFDOztBQ3RMSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGVBQWUsR0FBRyxRQUFRLEdBQUc7QUFDdEM7QUFDQSxJQUFJLElBQUksT0FBTyxHQUFHLElBQUk0QixrQkFBd0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN2RTtBQUNBLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSUUsS0FBVyxFQUFFLENBQUM7QUFDbkM7QUFDQSxJQUFJLElBQUksT0FBTyxHQUFHLElBQUlDLFlBQWtCLEVBQUUsQ0FBQztBQUMzQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ3pCO0FBQ0EsSUFBSSxJQUFJLE9BQU8sR0FBRyxFQUFFLFNBQVMsRUFBRTdCLFlBQWtCLEVBQUUsU0FBUyxFQUFFOEIsYUFBbUIsRUFBRSxNQUFNLEVBQUVsQyxVQUFnQixFQUFFLENBQUM7QUFDOUc7QUFDQSxJQUFJLElBQUksYUFBYSxHQUFHLElBQUltQyxpQkFBdUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ3pFLElBQUksYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDckMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLFVBQVUsR0FBRyxJQUFJWCxPQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3ZEO0FBQ0EsSUFBSSxJQUFJLFFBQVEsR0FBRyxJQUFJRSxtQkFBeUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDNUc7QUFDQSxJQUFJLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN2RCxJQUFJLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUMzQztBQUNBO0FBQ0EsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzVDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUN0QztBQUNBLElBQUksSUFBSSxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUM5RCxJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDaEMsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbEQ7QUFDQSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksWUFBWSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDbEQsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hDO0FBQ0EsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJRixPQUFhLEVBQUUsQ0FBQztBQUNyQyxJQUFJLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDO0FBQ0EsSUFBSSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRztBQUM5RDtBQUNBLFFBQVEsTUFBTSxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUMzQyxRQUFRLE1BQU0sQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDM0M7QUFDQSxRQUFRLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDdkMsUUFBUSxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQztBQUN2RTtBQUNBLFFBQVEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDO0FBQ0EsUUFBUSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO0FBQzdFLFFBQVEsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sS0FBSyxHQUFHLENBQUM7QUFDOUQ7QUFDQSxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sS0FBSyxHQUFHLENBQUM7QUFDekQ7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7QUFDcEQsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxRQUFRLEdBQUcsSUFBSVAsaUJBQXVCLEVBQUUsRUFBRSxHQUFHLEVBQUUs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O0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0JBQWdCLEVBQUUsWUFBWTtBQUNsQztBQUNBLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDakU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksVUFBVSxFQUFFLFlBQVk7QUFDNUI7QUFDQSxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM1QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxFQUFFLFlBQVk7QUFDMUI7QUFDQSxRQUFRLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMxQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksU0FBUyxFQUFFLFlBQVk7QUFDM0I7QUFDQSxRQUFRLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksV0FBVyxFQUFFLFlBQVk7QUFDN0I7QUFDQSxRQUFRLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM3QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksWUFBWSxFQUFFLFlBQVk7QUFDOUI7QUFDQSxRQUFRLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUM5QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksWUFBWSxFQUFFLFlBQVk7QUFDOUI7QUFDQSxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDL0I7QUFDQSxLQUFLO0FBQ0w7QUFD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
