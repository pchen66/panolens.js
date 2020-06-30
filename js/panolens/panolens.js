(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.PANOLENS = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	const version="0.12.0";const devDependencies={"@rollup/plugin-commonjs":"^11.0.2","@rollup/plugin-inject":"^4.0.1","@rollup/plugin-json":"^4.0.2","@rollup/plugin-node-resolve":"^7.1.1","@tweenjs/tween.js":"^18.5.0",ava:"^3.5.0","babel-eslint":"^10.1.0","browser-env":"^3.3.0",concurrently:"^5.1.0",coveralls:"^3.0.11",docdash:"^1.2.0",eslint:"^6.8.0",esm:"^3.2.25","google-closure-compiler":"^20200315.0.0","http-server":"^0.12.3",jsdoc:"^3.6.3","local-web-server":"^3.0.7",nyc:"^14.1.1",rollup:"^2.3.2",three:"^0.117.0",xmlhttprequest:"^1.8.0"};

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
	const THREE_REVISION = devDependencies.three.split( '.' )[ 1 ];

	/**
	 * THREEJS VERSION
	 * @module THREE_VERSION
	 * @example PANOLENS.THREE_VERSION
	 * @type {string} threejs version
	 */
	const THREE_VERSION = devDependencies.three.replace( /[^0-9.]/g, '' );

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
	 * STEREOFORMAT
	 * @module STEREOFORMAT
	 * @example PANOLENS.STEREOFORMAT.TAB
	 * @property {number} TAB 0
	 * @property {number} SBS 1
	 */
	const STEREOFORMAT = { TAB: 0, SBS: 1 };

	/**
	 * EVENTS
	 * @module EVENTS
	 * @example PANOLENS.EVENTS.LOAD
	 * @property {string} LOAD_START 0
	 * @property {string} INFOSPOT_ANIMATION 0
	 */
	const EVENTS = {
	    CONTAINER: 'panolens-container',
	    CAMERA: 'panolens-camera',
	    CONTROLS: 'panolens-controls',
	    LOAD_START: 'load-start',
	    LOAD: 'load',
	    LOADED: 'loaded',
	    READY: 'ready',
	    ERROR: 'error',
	    ENTER: 'enter',
	    ENTER_START: 'enter-start',
	    ENTER_FADE_START: 'enter-fade-start',
	    ENTER_FADE_COMPLETE: 'enter-fade-complete',
	    ENTER_COMPLETE: 'enter-complete',
	    FADE_IN: 'fade-in',
	    FADE_OUT: 'fade-out',
	    PROGRESS: 'progress',
	    LEAVE: 'leave',
	    LEAVE_START: 'leave-start',
	    LEAVE_COMPLETE: 'leave-complete',
	    INFOSPOT_ANIMATION_COMPLETE: 'infospot-animation-complete',
	    VIEWER_HANDLER: 'panolens-viewer-handler',
	    MODE_CHANGE: 'mode-change',
	    WIDNOW_RESIZE: 'window-resize',
	    MEDIA: {
	        PLAY: 'play',
	        PAUSE: 'pause',
	        VOLUME_CHANGE: 'volumechange'
	    },
	    RETICLE: {
	        RETICLE_RIPPLE_START: 'reticle-ripple-start',
	        RETICLE_RIPPLE_END: 'reticle-ripple-end',
	        RETICLE_START: 'reticle-start',
	        RETICLE_END: 'reticle-end',
	        RETICLE_UPDATE: 'reticle-update'
	    },
	    PANOMOMENT: {
	        NONE: 'panomoments.none',
	        FIRST_FRAME_DECODED: 'panomoments.first_frame_decoded',
	        READY: 'panomoments.ready',
	        COMPLETED: 'panomoments.completed'
	    }
	    
	};

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
	    WhiteTile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAtiABQAAACRQTFRFAAAAAAAABgYGBwcHHh4eKysrx8fHy8vLzMzM7OzsAAAABgYG+q7SZgAAAAp0Uk5TAP7+/v7+/v7+/iJx/a8AAAOwSURBVHja7d0hbsNAEAVQo6SFI6XEcALDcgNLvUBvEBQVhpkWVYWlhSsVFS7t5QIshRt695lEASZP+8c7a1kzDL1fz+/zyuvzp6FbvoddrL6uDd1yGZ5eXldeb18N3fIx7A+58prmhm65DfvDcd0952lu6JabFbD/zVprZj1lzcys+fj9z8xTZtbT8rv8yWlu6BYAIgAAAAAAAAAAAABAM6QXEAEAAAAAAAAAgJ2gnaAIiIA3Q2qAGgAAAAAAAAAAAAAAAAAAAAAAAAAAQJsADkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBVlfAcZ3aeZobusUKMGBhV6KUElHGKBERJR6/fxExRkQZl9/lT8S1oVsuhqyYMmPKjCkzvfcCpsxohrwY0Q06EAEAAAAAAAAAAACgGdILiAAAAAAAAAAAwE7QTlAERMCbITVADQAAAAAAAAAAAAAAAAAAAAAAAAAAwKmwQ1ERAAAAAACPQY9BERABERABERABERABERABAAAAAAAAAICdoJ2gCIiAT2bUADVADRABEQAAQBFUBEVABERgEyvAlJm+V4ApM6bMmDJjyowpM6bMdN0LmDKjGfJiRDfoQAQAAAAAAAAAAACAZkgvIAIAAAAAAAAAADtBO0EREAFvhtQANQAAAAAAAAAAAAAAAAAAAAAAAAAAAKfCDkVFAAAAAAA8Bj0GRUAEREAEREAEREAEREAEAAAAAAAAAAB2gnaCIiACPplRA9QANUAERAAAAEVQERQBERCBTawAU2b6XgGmzJgyY8qMKTOmzJgy03UvYMqMZsiLEd2gAxEAAAAAAAAAAAAAmiG9gAgAAAAAAAAAAOwE7QRFQAS8GVID1AAAAAAAAAAAAAAAAAAAAAAAAAAAAJwKOxQVAQAAAADwGPQYFAEREAEREAEREAEREAERAAAAAAAAAADYCdoJioAI+GRGDVAD1AAREAEAABRBRVAEREAENrECTJnpewWYMmPKjCkzpsyYMmPKTNe9gCkzmiEvRnSDDkQAAAAAAAAAAAAAaIb0AiIAAAAAAAAAALATtBMUARHwZkgNUAMAAAAAAAAAAAAAAAAAAAAAAAAAAHAq7FBUBAAAAADAY9BjUAREQAREQAREQAREQAREAAAAAAAAAABgJ2gnKAIi4JMZNUANUANEQAQAAFAEFUEREAER2MQKMGWm7xVgyowpM50PWen9ugNGXz1XaocAFgAAAABJRU5ErkJggg==',
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
		
	                requestAnimationFrame( () => {
		
	                    onProgress( { loaded: 1, total: 1 } );
	                    onLoad( cached );
		
	                });
		
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

	        const texture = new THREE.Texture(); 

	        ImageLoader.load( url, function ( image ) {

	            texture.image = image;

	            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
	            const isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

	            texture.format = isJPEG ? THREE.RGBFormat : THREE.RGBAFormat;
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

		   let texture, loaded, progress, all, loadings;

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

					   onProgress( { loaded, total: 6 } );
					   onLoad( texture );

				   }

			   }, function ( event ) {

				   progress[ index ] = { loaded: event.loaded, total: event.total };

				   all.loaded = 0;
				   all.total = 0;
				   loadings = 0;

				   for ( let i in progress ) {

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
	Media.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

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
	            this.dispatchEvent( { type: EVENTS.MEDIA.PLAY } );

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
	            this.dispatchEvent( { type: EVENTS.MEDIA.PAUSE } );

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
	        const texture = new THREE.VideoTexture( video );

	        texture.generateMipmaps = false;
	        texture.minFilter = THREE.LinearFilter;
	        texture.magFilter = THREE.LinearFilter;
	        texture.format = THREE.RGBFormat;
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
	 * @classdesc Stereo Mixin - format based on {@link https://opticalflow.wordpress.com/2010/09/19/side-by-side-versus-top-and-bottom-3d-formats/} will be determined by image width:height ratio (TAB is 1:1, SBS is 4:1)
	 * @constructor
	 * @param {number} [eyeSep=0.064] - eye separation distance
	 */
	function Stereo ( eyeSep = 0.064 ){

	    this.format = null;
	    this.eyeSep = eyeSep;

	    this.loffset = new THREE.Vector2();
	    this.roffset = new THREE.Vector2();

	}

	Object.assign( Stereo.prototype, {

	    constructor: Stereo,

	    /**
	     * Update unifroms by stereo format
	     * @param {integer} format - { @see STEREOFORMAT }
	     * @param {object} uniforms
	     */
	    updateUniformByFormat: function( format, uniforms ) {

	        this.format = format;

	        const repeat = uniforms.repeat.value;
	        const offset = uniforms.offset.value;
	        const loffset = this.loffset;
	        const roffset = this.roffset;

	        switch ( format ) {

	            case STEREOFORMAT.TAB:
	                repeat.set( 1.0, 0.5 );
	                offset.set( 0.0, 0.5 );
	                loffset.set( 0.0, 0.5 );
	                roffset.set( 0.0, 0.0 );
	                break;

	            case STEREOFORMAT.SBS:
	                repeat.set( 0.5, 1.0 );
	                offset.set( 0.0, 0.0 );
	                loffset.set( 0.0, 0.0 );
	                roffset.set( 0.5, 0.0 );
	                break;

	        }

	    },

	    /**
	     * Update Texture for Stereo Left Eye
	     */
	    updateTextureToLeft: function( offset ) {

	        offset.copy( this.loffset );

	    },

	    /**
	     * Update Texture for Stereo Right Eye
	     */
	    updateTextureToRight: function( offset ) {

	        offset.copy( this.roffset );

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
	    const material = new THREE.SpriteMaterial( { color, map: this.createCanvasTexture( canvas ) } );

	    THREE.Sprite.call( this, material );

	    this.canvasWidth = canvas.width;
	    this.canvasHeight = canvas.height;
	    this.context = context;
	    this.color = color instanceof THREE.Color ? color : new THREE.Color( color );    

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
	Reticle.prototype = Object.assign( Object.create( THREE.Sprite.prototype ), {

	    constructor: Reticle,

	    /**
	     * Set material color
	     * @param {THREE.Color} color 
	     * @memberOf Reticle
	     * @instance
	     */
	    setColor: function ( color ) {

	        this.material.color.copy( color instanceof THREE.Color ? color : new THREE.Color( color ) );

	    },

	    /**
	     * Create canvas texture
	     * @param {HTMLCanvasElement} canvas 
	     * @memberOf Reticle
	     * @instance
	     * @returns {THREE.CanvasTexture}
	     */
	    createCanvasTexture: function ( canvas ) {

	        const texture = new THREE.CanvasTexture( canvas );
	        texture.minFilter = THREE.LinearFilter;
	        texture.magFilter = THREE.LinearFilter;
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
	                this.dispatchEvent( { type: EVENTS.RETICLE.RETICLE_RIPPLE_END } );

	            }

	            material.map.needsUpdate = true;

	        };

	        /**
	         * Reticle ripple start event
	         * @type {object}
	         * @event Reticle#reticle-ripple-start
	         */
	        this.dispatchEvent( { type: EVENTS.RETICLE.RETICLE_RIPPLE_START } );

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
	        this.dispatchEvent( { type: EVENTS.RETICLE.RETICLE_START } );

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
	        this.dispatchEvent( { type: EVENTS.RETICLE.RETICLE_END } );

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
	        this.dispatchEvent( { type: EVENTS.RETICLE.RETICLE_UPDATE, progress } );

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

	    THREE.Sprite.call( this );

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

	    this.material.side = THREE.DoubleSide;
	    this.material.depthTest = false;
	    this.material.transparent = true;
	    this.material.opacity = 0;

	    this.scaleUpAnimation = new Tween.Tween();
	    this.scaleDownAnimation = new Tween.Tween();


	    const postLoad = function ( texture ) {

	        if ( !this.material ) { return; }

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
	    this.addEventListener( EVENTS.CONTAINER, this.setContainer.bind( this ) );
	    this.addEventListener( 'panorama-leave', this.onDismiss );
	    this.addEventListener( 'dismiss', this.onDismiss );
	    this.addEventListener( 'panolens-infospot-focus', this.setFocusMethod );

	    TextureLoader.load( imageSrc, postLoad );	

	}
	Infospot.prototype = Object.assign( Object.create( THREE.Sprite.prototype ), {

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

	    THREE.EventDispatcher.call( this );

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

	Widget.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

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

	        const scope = this;
	        const gradientStyle = 'linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))';

	        const bar = document.createElement( 'div' );
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
	            const styleTranslate = bar.isHidden ? 'translateY(0)' : 'translateY(-100%)';
	            const styleOpacity = bar.isHidden ? 0 : 1;
	            bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = styleTranslate;
	            bar.style.opacity = styleOpacity;
	        };

	        // Menu
	        const menu = this.createDefaultMenu();
	        this.mainMenu = this.createMainMenu( menu );
	        bar.appendChild( this.mainMenu );

	        // Mask
	        const mask = this.createMask();
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

	        const scope = this;
	        const handler = function ( method, data ) {

	            return function () {

	                scope.dispatchEvent( { 

	                    type: EVENTS.VIEWER_HANDLER, 
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
	            scope.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'onWindowResize' } );

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
	            document.head.appendChild( sheet );
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
	            scope.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'toggleVideoPlay', data: !this.paused } );

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
	                scope.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'setVideoCurrentTime', data: percentageNext } );

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
	            scope.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'setVideoCurrentTime', data: percentage } );

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
	        for ( let i = 0; i < menus.length; i++ ) {

	            const item = menu.addItem( menus[ i ].title );

	            item.style.paddingLeft = '20px';

	            item.addIcon()
	                .addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

	            if ( menus[ i ].subMenu && menus[ i ].subMenu.length > 0 ) {

	                const title = menus[ i ].subMenu[ 0 ].title;

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
	 * Equirectangular shader
	 * based on three.js equirect shader
	 * @author pchen66
	 */

	/**
	 * @description Equirectangular Shader
	 * @module EquirectShader
	 * @property {object} uniforms
	 * @property {THREE.Texture} uniforms.texture diffuse map
	 * @property {number} uniforms.opacity image opacity
	 * @property {string} vertexShader vertex shader
	 * @property {string} fragmentShader fragment shader
	 */
	const EquirectShader = {

	    uniforms: {

	        'texture': { value: new THREE.Texture() },
	        'repeat': { value: new THREE.Vector2( 1.0, 1.0 ) },
	        'offset': { value: new THREE.Vector2( 0.0, 0.0 ) },
	        'opacity': { value: 1.0 }

	    },

	    vertexShader: `
        varying vec3 vWorldDirection;
        #include <common>
        void main() {
            vWorldDirection = transformDirection( position, modelMatrix );
            #include <begin_vertex>
            #include <project_vertex>
        }
    `,

	    fragmentShader: `
        uniform sampler2D texture;
        uniform vec2 repeat;
        uniform vec2 offset;
        uniform float opacity;
        varying vec3 vWorldDirection;
        #include <common>
        void main() {
            vec3 direction = normalize( vWorldDirection );
            vec2 sampleUV;
            sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
            sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;
            sampleUV *= repeat;
            sampleUV += offset;
            sampleUV.x = fract(sampleUV.x);
            sampleUV.y = fract(sampleUV.y);
            gl_FragColor = vec4(texture2D( texture, sampleUV ).rgb, opacity);
        }
    `

	};

	/**
	 * @classdesc Base Panorama
	 * @constructor
	 */
	function Panorama () {

	    this.edgeLength = 10000;

	    THREE.Mesh.call( this, this.createGeometry( this.edgeLength ), this.createMaterial() );

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

	    this.renderOrder = -1;
	    this.visible = false;
	    this.active = false;

	    this.infospotAnimation = new Tween.Tween( this ).to( {}, this.animationDuration / 2 );

	    this.addEventListener( EVENTS.CONTAINER, this.setContainer.bind( this ) );
	    this.addEventListener( 'click', this.onClick.bind( this ) );

	    this.setupTransitions();

	}

	Panorama.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {

	    constructor: Panorama,

	    /**
	     * Create a skybox geometry
	     * @memberOf Panorama
	     * @instance
	     */
	    createGeometry: function ( edgeLength ) {

	        return new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );

	    },

	    /**
	     * Create equirectangular shader material
	     * @param {THREE.Vector2} [repeat=new THREE.Vector2( 1, 1 )] - Texture Repeat
	     * @param {THREE.Vector2} [offset=new THREE.Vector2( 0, 0 )] - Texture Offset
	     * @memberOf Panorama
	     * @instance
	     */
	    createMaterial: function ( repeat = new THREE.Vector2( 1, 1 ), offset = new THREE.Vector2( 0, 0 ) ) {

	        const { fragmentShader, vertexShader } = EquirectShader;
	        const uniforms = THREE.UniformsUtils.clone( EquirectShader.uniforms );
	        
	        uniforms.repeat.value.copy( repeat );
	        uniforms.offset.value.copy( offset );
	        uniforms.opacity.value = 0.0;

	        const material = new THREE.ShaderMaterial( {

	            fragmentShader,
	            vertexShader,
	            uniforms,
	            side: THREE.BackSide,
	            transparent: true
	    
	        } );

	        return material;

	    },

	    /**
	     * Adding an object
	     * @memberOf Panorama
	     * @instance
	     * @param {THREE.Object3D} object - The object to be added
	     */
	    add: function ( object ) {

	        if ( arguments.length > 1 ) {

	            for ( let i = 0; i < arguments.length; i ++ ) {

	                this.add( arguments[ i ] );

	            }

	            return this;

	        }

	        // In case of infospots
	        if ( object instanceof Infospot ) {

	            const { container } = this;

	            if ( container ) { 
	                
	                object.dispatchEvent( { type: EVENTS.CONTAINER, container } ); 
	            
	            }
	            
	            object.dispatchEvent( { type: 'panolens-infospot-focus', method: function ( vector, duration, easing ) {

	                /**
	                 * Infospot focus handler event
	                 * @type {object}
	                 * @event Panorama#panolens-viewer-handler
	                 * @property {string} method - Viewer function name
	                 * @property {*} data - The argument to be passed into the method
	                 */
	                this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'tweenControlCenter', data: [ vector, duration, easing ] } );


	            }.bind( this ) } );

	        }

	        THREE.Object3D.prototype.add.call( this, object );

	    },

	    getTexture: function(){

	        return this.material.uniforms.texture.value;

	    },

	    /**
	     * Load Panorama
	     * @param {boolean} immediate load immediately
	     */
	    load: function ( immediate = true ) {

	        /**
	         * Start loading panorama event
	         * @type {object}
	         * @event Panorama#load-start
	         */
	        this.dispatchEvent( { type: EVENTS.LOAD_START } );

	        if (immediate) this.onLoad();
			
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
	                    child.dispatchEvent( { type: EVENTS.CONTAINER, container: container } );

	                }

	            } );

	            this.container = container;

	        }

	    },

	    /**
	     * This will be called when panorama is loaded
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#loaded
	     */
	    onLoad: function () {

	        this.loaded = true;

	        /**
	         * Loaded panorama event
	         * @type {object}
	         * @event Panorama#loaded
	         */
	        this.dispatchEvent( { type: EVENTS.LOADED } );

	        /**
	         * Alias of loaded event
	         * @type {object}
	         * @event Panorama#load
	         */
	        this.dispatchEvent( { type: EVENTS.LOAD } );

	        /**
	         * Panorama is ready to be animated
	         * @event Panorama#ready
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: EVENTS.READY } );

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
	        this.dispatchEvent( { type: EVENTS.PROGRESS, progress: progress } );

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
	        this.dispatchEvent( { type: EVENTS.READY } );

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

	        this.material.uniforms.texture.value = texture;

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
	            this.dispatchEvent( { type: EVENTS.INFOSPOT_ANIMATION_COMPLETE, visible: visible } );

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
	            this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'setPanorama', data: pano } );

	        }.bind( this ) );

	        this.linkedSpots.push( spot );

	        this.add( spot );

	        this.visible = false;

	    },

	    reset: function () {

	        this.children.length = 0;	

	    },

	    setupTransitions: function () {

	        this.fadeInAnimation = new Tween.Tween();

	        this.fadeOutAnimation = new Tween.Tween();

	        this.enterTransition = new Tween.Tween( this )
	            .easing( Tween.Easing.Quartic.Out )
	            .onComplete( function () {

	                /**
	                 * Enter panorama and animation complete event
	                 * @event Panorama#enter-complete
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: EVENTS.ENTER_COMPLETE } );

	            }.bind ( this ) )
	            .start();

	        this.leaveTransition = new Tween.Tween( this )
	            .easing( Tween.Easing.Quartic.Out );

	    },

	    /**
	     * Start fading in animation
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#enter-fade-complete
	     */
	    fadeIn: function ( duration = this.animationDuration ) {

	        /**
	         * Fade in event
	         * @event Panorama#fade-in
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: EVENTS.FADE_IN } );

	        const { opacity } = this.material.uniforms ? this.material.uniforms : { opacity: this.material.opacity };
	        const onStart = function() {

	            this.visible = true;

	            /**
	             * Enter panorama fade in start event
	             * @event Panorama#enter-fade-start
	             * @type {object} 
	             */
	            this.dispatchEvent( { type: EVENTS.ENTER_FADE_START } );

	        }.bind( this );
	        const onComplete = function() {

	            this.toggleInfospotVisibility( true, duration / 2 );

	            /**
	             * Enter panorama fade complete event
	             * @event Panorama#enter-fade-complete
	             * @type {object} 
	             */
	            this.dispatchEvent( { type: EVENTS.ENTER_FADE_COMPLETE } );

	        }.bind( this );

	        this.fadeOutAnimation.stop();
	        this.fadeInAnimation = new Tween.Tween( opacity )
	            .to( { value: 1 }, duration )
	            .easing( Tween.Easing.Quartic.Out )
	            .onStart( onStart )
	            .onComplete( onComplete )
	            .start();
	        
	    },

	    /**
	     * Start fading out animation
	     * @memberOf Panorama
	     * @instance
	     */
	    fadeOut: function ( duration = this.animationDuration ) {

	        /**
	         * Fade out event
	         * @event Panorama#fade-out
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: EVENTS.FADE_OUT } );

	        const { opacity } = this.material.uniforms ? this.material.uniforms : { opacity: this.material.opacity };
	        const onComplete = function() {

	            this.visible = false;

	            /**
	             * Leave panorama complete event
	             * @event Panorama#leave-complete
	             * @type {object} 
	             */
	            this.dispatchEvent( { type: EVENTS.LEAVE_COMPLETE } );

	        }.bind( this );

	        this.fadeInAnimation.stop();
	        this.fadeOutAnimation = new Tween.Tween( opacity )
	            .to( { value: 0 }, duration )
	            .easing( Tween.Easing.Quartic.Out )
	            .onComplete( onComplete )
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

	        /**
	         * Enter panorama event
	         * @event Panorama#enter
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: EVENTS.ENTER } );

	        this.leaveTransition.stop();
	        this.enterTransition
	            .to( {}, duration )
	            .onStart( function () {

	                /**
	                 * Enter panorama and animation starting event
	                 * @event Panorama#enter-start
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: EVENTS.ENTER_START } );
					
	                if ( this.loaded ) {

	                    /**
	                     * Panorama is ready to go
	                     * @event Panorama#ready
	                     * @type {object} 
	                     */
	                    this.dispatchEvent( { type: EVENTS.READY } );

	                } else {

	                    this.load();

	                }
					
	            }.bind( this ) )
	            .start();

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
	                this.dispatchEvent( { type: EVENTS.LEAVE_START } );

	                this.fadeOut( duration );
	                this.toggleInfospotVisibility( false );

	            }.bind( this ) )
	            .start();

	        /**
	         * Leave panorama event
	         * @event Panorama#leave
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: EVENTS.LEAVE } );

	        // dispatch panorama-leave to descendents
	        this.traverse( child => child.dispatchEvent( { type: 'panorama-leave' } ));

	        // mark active
	        this.active = false;

	    },

	    /**
	     * Dispose panorama
	     * @memberOf Panorama
	     * @instance
	     */
	    dispose: function () {

	        const { material } = this;

	        if ( material && material.uniforms && material.uniforms.texture ) material.uniforms.texture.value.dispose();

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
	        this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'onPanoramaDispose', data: this } );

	        // recursive disposal on 3d objects
	        function recursiveDispose ( object ) {

	            const { geometry, material } = object;

	            for ( let i = object.children.length - 1; i >= 0; i-- ) {

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
	function ImagePanorama ( image ) {

	    Panorama.call( this );

	    this.src = image;
	    this.type = 'image_panorama';

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

	        Panorama.prototype.load.call( this, false );

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
	     * @memberOf ImagePanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        texture.minFilter = texture.magFilter = THREE.LinearFilter;
	        texture.generateMipmaps = false;
	        texture.format = THREE.RGBFormat;
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

	        // Release cached image
	        THREE.Cache.remove( this.src );

	        Panorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Empty panorama
	 * @constructor
	 */
	function EmptyPanorama () {

	    Panorama.call( this );

	    this.type = 'empty_panorama';

	}

	EmptyPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: EmptyPanorama,

	    /**
	     * Create a skybox geometry
	     * @memberOf EmptyPanorama
	     * @instance
	     */
	    createGeometry: function() {

	        const geometry = new THREE.BufferGeometry();
	        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );
	        return geometry;

	    },

	    /**
	     * Create material
	     * @memberOf EmptyPanorama
	     * @instance
	     */
	    createMaterial: function() {

	        return new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

	    },

	    getTexture: function () {

	        return null;

	    }

	} );

	/**
	 * @classdesc Cubemap-based panorama
	 * @constructor
	 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
	 */
	function CubePanorama ( images = [] ){

	    Panorama.call( this );

	    this.geometry.deleteAttribute( 'normal' );
	    this.geometry.deleteAttribute( 'uv' );

	    this.images = images;
	    this.type = 'cube_panorama';

	}

	CubePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: CubePanorama,

	    /**
	     * Create material
	     * @memberOf CubePanorama
	     * @instance
	     */
	    createMaterial: function() {

	        const { fragmentShader, vertexShader, uniforms: _uniforms } = THREE.ShaderLib[ 'cube' ];
	        const uniforms = THREE.UniformsUtils.clone( _uniforms );
	        
	        uniforms.opacity.value = 0;
	        uniforms.envMap.value = new THREE.CubeTexture();

	        const material = new THREE.ShaderMaterial( {

	            fragmentShader,
	            vertexShader,
	            uniforms,
	            side: THREE.BackSide,
	            opacity: 0,
	            transparent: true

	        } );

	        Object.defineProperty( material, 'envMap', {

	            get: function () {

	                return this.uniforms.envMap.value;
	        
	            }
	        
	        } );

	        return material;

	    },

	    /**
	     * Load 6 images and bind listeners
	     * @memberOf CubePanorama
	     * @instance
	     */
	    load: function () {

	        Panorama.prototype.load.call( this, false );

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

	        this.material.uniforms.envMap.value = texture;

	        Panorama.prototype.onLoad.call( this );

	    },

	    getTexture: function () {

	        return this.material.uniforms.envMap.value;

	    },

	    /**
	     * Dispose
	     * @memberOf CubePanorama
	     * @instance
	     */
	    dispose: function () {	

	        const { value } = this.material.uniforms.envMap;

	        this.images.forEach( ( image ) => { THREE.Cache.remove( image ); } );

	        if ( value instanceof THREE.CubeTexture ) {

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

	    this.type = 'basic_panorama';

	}

	BasicPanorama.prototype = Object.assign( Object.create( CubePanorama.prototype ), {

	    constructor: BasicPanorama

	} );

	/**
	 * User Agent
	 */
	const ua = window.navigator.userAgent || window.navigator.vendor || window.opera;

	/**
	 * Check if mobile device
	 */
	const isMobile = (() => {

	    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));

	})();

	/**
	 * Check if Android
	 */
	const isAndroid = (() => {

	    return /(android)/i.test(ua);

	})();

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

	    Panorama.call( this );

	    this.src = src;
	    this.options = Object.assign( {

	        videoElement: document.createElement( 'video' ),
	        loop: true,
	        muted: true,
	        autoplay: false,
	        playsinline: true,
	        crossOrigin: 'anonymous'

	    }, options );

	    this.videoElement = this.options.videoElement;
	    this.videoProgress = 0;

	    this.type = 'video_panorama';

	    this.addEventListener( EVENTS.LEAVE, this.pauseVideo.bind( this ) );
	    this.addEventListener( EVENTS.ENTER_FADE_START, this.resumeVideoProgress.bind( this ) );
	    this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
	    this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	}
	VideoPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: VideoPanorama,

	    /**
	     * Load video panorama
	     * @memberOf VideoPanorama
	     * @instance
	     * @fires  Panorama#panolens-viewer-handler
	     */
	    load: function () {

	        Panorama.prototype.load.call( this, false );

	        const { muted, loop, autoplay, playsinline, crossOrigin } = this.options;
	        const video = this.videoElement;
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

	            const videoTexture = this.setVideoTexture( video );

	            if ( autoplay ) {

	                /**
	                 * Viewer handler event
	                 * @type {object}
	                 * @property {string} method - 'updateVideoPlayButton'
	                 * @property {boolean} data - Pause video or not
	                 */
	                this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'updateVideoPlayButton', data: false } );

	            }

	            // For mobile silent autoplay
	            if ( isMobile ) {

	                video.pause();

	                if ( autoplay && muted ) {

	                    /**
	                     * Viewer handler event
	                     * @type {object}
	                     * @property {string} method - 'updateVideoPlayButton'
	                     * @property {boolean} data - Pause video or not
	                     */
	                    this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'updateVideoPlayButton', data: false } );

	                } else {

	                    /**
	                     * Viewer handler event
	                     * @type {object}
	                     * @property {string} method - 'updateVideoPlayButton'
	                     * @property {boolean} data - Pause video or not
	                     */
	                    this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'updateVideoPlayButton', data: true } );

	                }
					
	            }

	            const loaded = () => {

	                onProgress( { loaded: 1, total: 1 } );
	                onLoad( videoTexture );

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
	            this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'onVideoUpdate', data: this.videoProgress } );

	        }.bind( this ) );

	        video.addEventListener( 'ended', function () {
				
	            if ( !loop ) {

	                this.resetVideo();
	                this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'updateVideoPlayButton', data: true } );

	            }

	        }.bind( this ), false ); 

	    },

	    onLoad: function () {

	        Panorama.prototype.onLoad.call( this );

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

	        const videoTexture = new THREE.VideoTexture( video );
	        videoTexture.minFilter = THREE.LinearFilter;
	        videoTexture.magFilter = THREE.LinearFilter;
	        videoTexture.format = THREE.RGBFormat;
	        videoTexture.generateMipmaps = false;

	        this.updateTexture( videoTexture );

	        return videoTexture;
		
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

	            this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'onVideoUpdate', data: percentage } );

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
	            dispatchEvent( { type: EVENTS.MEDIA.PLAY } );

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
	        this.dispatchEvent( { type: EVENTS.MEDIA.PAUSE } );

	    },

	    /**
	     * Resume video
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    resumeVideoProgress: function () {

	        const video = this.videoElement;

	        if ( video.readyState >= 4 && video.autoplay && !isMobile ) {

	            this.playVideo();

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @property {string} method - 'updateVideoPlayButton'
	             * @property {boolean} data - Pause video or not
	             */
	            this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'updateVideoPlayButton', data: false } );

	        } else {

	            this.pauseVideo();

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @property {string} method - 'updateVideoPlayButton'
	             * @property {boolean} data - Pause video or not
	             */
	            this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'updateVideoPlayButton', data: true } );

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

	        this.dispatchEvent( { type: EVENTS.MEDIA.VOLUME_CHANGE } );

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

	        this.dispatchEvent( { type: EVENTS.MEDIA.VOLUME_CHANGE } );

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

	        this.pauseVideo();
			
	        this.removeEventListener( EVENTS.LEAVE, this.pauseVideo.bind( this ) );
	        this.removeEventListener( EVENTS.ENTER_FADE_START, this.resumeVideoProgress.bind( this ) );
	        this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
	        this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

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

	    this.type = 'google_streetview_panorama';

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

	        Panorama.prototype.load.call( this, false );

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

	        const scriptId = 'panolens-gmapscript';
	        const onScriptLoaded = this.setGSVLoader.bind( this );

	        if( document.querySelector( `#${scriptId}` ) ) {
	            onScriptLoaded();
	            return;
	        }

	        const script = document.createElement( 'script' );
	        script.id = scriptId;
	        script.src = 'https://maps.googleapis.com/maps/api/js?';
	        script.src += apiKey ? 'key=' + apiKey : '';
	        if( script.readyState ) { // IE
	            script.onreadystatechange = function() {
	                if ( script.readyState === EVENTS.LOADED || script.readyState === 'complete' ) {
	                    script.onreadystatechange = null;
	                    onScriptLoaded();
	                }
	            };
	        } else {
	            script.onload = onScriptLoaded;
	        }

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

	        ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );

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

	        'tDiffuse': { value: new THREE.Texture() },
	        'resolution': { value: 1.0 },
	        'transform': { value: new THREE.Matrix4() },
	        'zoom': { value: 1.0 },
	        'opacity': { value: 1.0 }

	    },

	    vertexShader: `

        varying vec2 vUv;

        void main() {

            vUv = uv;
            gl_Position = vec4( position, 1.0 );

        }

    `,

	    fragmentShader: `

        uniform sampler2D tDiffuse;
        uniform float resolution;
        uniform mat4 transform;
        uniform float zoom;
        uniform float opacity;

        varying vec2 vUv;

        const float PI = 3.141592653589793;

        void main(){

            vec2 position = -1.0 +  2.0 * vUv;

            position *= vec2( zoom * resolution, zoom * 0.5 );

            float x2y2 = position.x * position.x + position.y * position.y;
            vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );

            sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );

            vec2 sampleUV = vec2(
                (atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,
                (asin(sphere_pnt.z) / PI + 0.5)
            );

            gl_FragColor = texture2D( tDiffuse, sampleUV );
            gl_FragColor.a *= opacity;

        }
    `
	};

	/**
	 * @classdesc Little Planet
	 * @constructor
	 * @param {string} type 		- Type of little planet basic class
	 * @param {string} source 		- URL for the image source
	 */
	function LittlePlanet ( type = 'image', source ) {

	    if ( type === 'image' ) {

	        ImagePanorama.call( this, source );

	    }

	    this.EPS = 0.000001;
	    this.frameId = null;

	    this.dragging = false;
	    this.userMouse = new THREE.Vector2();

	    this.quatA = new THREE.Quaternion();
	    this.quatB = new THREE.Quaternion();
	    this.quatCur = new THREE.Quaternion();
	    this.quatSlerp = new THREE.Quaternion();

	    this.vectorX = new THREE.Vector3( 1, 0, 0 );
	    this.vectorY = new THREE.Vector3( 0, 1, 0 );

	    this.type = 'little_planet';

	    this.addEventListener( EVENTS.WIDNOW_RESIZE, this.onWindowResize );

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

	    /**
	     * Create a skybox geometry
	     * @memberOf LittlePlanet
	     * @instance
	     */
	    createGeometry: function ( edgeLength ) {

	        const ratio = 0.5;
	        return new THREE.PlaneBufferGeometry( edgeLength, ratio * edgeLength );

	    },

	    /**
	     * Create material
	     * @memberOf LittlePlanet
	     * @instance
	     */
	    createMaterial: function ( size = this.edgeLength ) {

	        const { fragmentShader, vertexShader, uniforms: _uniforms } = StereographicShader;
	        const uniforms = THREE.UniformsUtils.clone( _uniforms );

	        uniforms.zoom.value = size;
	        uniforms.opacity.value = 0.0;

	        return new THREE.ShaderMaterial( {

	            vertexShader,
	            fragmentShader,
	            uniforms,
	            transparent: true,
	            opacity: 0

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

	    updateTexture: function ( texture ) {

	        this.material.uniforms.tDiffuse.value = texture;

	    },

	    getTexture: function () {

	        return this.material.uniforms.tDiffuse.value;

	    },

	    onLoad: function ( texture ) {

	        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

	        this.registerMouseEvents();
	        this.onUpdateCallback();
			
	        this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'disableControl' } );

	        ImagePanorama.prototype.onLoad.call( this, texture );
			
	    },

	    onLeave: function () {

	        this.unregisterMouseEvents();

	        this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'enableControl', data: CONTROLS.ORBIT } );

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
	 */
	function ImageLittlePlanet ( source ) {

	    LittlePlanet.call( this, 'image', source );

	    this.type = 'image_little_planet';

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

	        texture.minFilter = texture.magFilter = THREE.LinearFilter;
			
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

	    Panorama.call( this );

	    this.media = new Media( constraints );

	    this.type = 'camera_panorama';

	    this.addEventListener( EVENTS.ENTER, this.start.bind( this ) );
	    this.addEventListener( EVENTS.LEAVE, this.stop.bind( this ) );
	    this.addEventListener( EVENTS.CONTAINER, this.onPanolensContainer.bind( this ) );
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
	 * @classdesc Stereo Image Panorama
	 * @constructor
	 * @param {string} src - image source
	 * @param {number} [stereo=new Stereo()] - stereo mixin
	 */
	function StereoImagePanorama ( src, stereo = new Stereo() ){

	    ImagePanorama.call( this, src );

	    this.stereo = stereo;
	    this.type = 'stereo_image_panorama';

	}

	StereoImagePanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

	    constructor: StereoImagePanorama,

	    /**
	     * This will be called when texture is ready
	     * @param  {THREE.Texture} texture - Image texture
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        const { width, height } = texture.image;
	        let format = null;

	        if ( width / height === 4 ) { 
	            
	            format = STEREOFORMAT.SBS;
	        
	        } else { 

	            format = STEREOFORMAT.TAB;
	        
	        }

	        this.stereo.updateUniformByFormat( format, this.material.uniforms );

	        this.material.uniforms[ 'texture' ].value = texture;

	        ImagePanorama.prototype.onLoad.call( this, texture );

	    },

	    /**
	     * Update Texture for Stereo Left Eye
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    updateTextureToLeft: function() {

	        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

	    },

	    /**
	     * Update Texture for Stereo Right Eye
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    updateTextureToRight: function() {

	        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

	    },

	    /**
	     * Dispose
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    dispose: function () {	

	        const { value } = this.material.uniforms.texture;

	        if ( value instanceof THREE.Texture ) {

	            value.dispose();

	        }

	        ImagePanorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Stereo Image Panorama
	 * @constructor
	 * @param {string} src - image source
	 * @param {object} options - { @see VideoPanorama }
	 * @param {number} [stereo=new Stereo()] - stereo mixin
	 */
	function StereoVideoPanorama ( src, options = {}, stereo = new Stereo() ){

	    VideoPanorama.call( this, src, options );

	    this.stereo = stereo;
	    this.type = 'stereo_video_panorama';

	}

	StereoVideoPanorama.prototype = Object.assign( Object.create( VideoPanorama.prototype ), {

	    constructor: StereoVideoPanorama,

	    /**
	     * This will be called when video texture is ready
	     * @param  {THREE.VideoTexture} texture - Video texture
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        const { videoWidth, videoHeight } = texture.image;
	        let format = null;

	        if ( videoWidth / videoHeight === 4 ) { 
	            
	            format = STEREOFORMAT.SBS;
	        
	        } else { 

	            format = STEREOFORMAT.TAB;
	        
	        }

	        this.stereo.updateUniformByFormat( format, this.material.uniforms );

	        this.material.uniforms[ 'texture' ].value = texture;

	        VideoPanorama.prototype.onLoad.call( this );

	    },

	    /**
	     * Update Texture for Stereo Left Eye
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    updateTextureToLeft: function() {

	        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

	    },

	    /**
	     * Update Texture for Stereo Right Eye
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    updateTextureToRight: function() {

	        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

	    },

	    /**
	     * Dispose
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    dispose: function () {	

	        const { value } = this.material.uniforms.texture;

	        if ( value instanceof THREE.Texture ) {

	            value.dispose();

	        }

	        VideoPanorama.prototype.dispose.call( this );

	    }

	} );

	/* eslint-disable */
	function PanoMoments(_0x7f43d,_0x15393b,_0xafd6c6,_0x4f697b){var _0x317fcf=this;var _0x77f828;var _0x4b83b1;var _0x28fee3=[];var _0x56872a;var _0x51245d=document['createElement']('video');var _0x3cdc1b=[];var _0x8d3da1;var _0x2d980b;var _0x52c0d1;var _0x29bec5;var _0xc61c01;var _0x3cce6c;var _0x107d3b;var _0x5b8589;var _0x3e48cc=[];var _0x5869cc=-0x1;var _0x44e325;var _0xb3fd4=[];var _0x3f75ad=0x0;var _0x626ae7=0x0;var _0x1c4db0;var _0x2ae9f0;var _0xc61c01;var _0x2af0b2={};var _0x31139b;var _0x28b79b;var _0x1f4e8e;var _0x4e8420;var _0x124c48;var _0x4e4077;var _0x593647;var _0x5eba13;var _0x39e97e=[0x70,0x61,0x73,0x70];var _0x19f523=[0x74,0x6b,0x68,0x64];var _0x117cd8;if(navigator['userAgent']['match'](/Android/i)){_0x52c0d1=!![];}else if(navigator['userAgent']['match'](/iPhone|iPad|iPod/i)){_0x2d980b=!![];}if(/Chrome/i['test'](navigator['userAgent']['toLowerCase']())||/Chrome WebView/i['test'](navigator['userAgent']['toLowerCase']())||/Chromium/i['test'](navigator['userAgent']['toLowerCase']())){_0x29bec5=!![];}else if(/Firefox/i['test'](navigator['userAgent']['toLowerCase']())||/Supermedium/i['test'](navigator['userAgent']['toLowerCase']())){_0xc61c01=!![];if(!_0x52c0d1){_0x29bec5=!![];}}else if(/Safari/i['test'](navigator['userAgent']['toLowerCase']())&&!/Chrome/i['test'](navigator['userAgent']['toLowerCase']()));if(!_0x29bec5){_0x51245d['setAttribute']('playsinline','');_0x51245d['muted']=!![];_0x51245d['autoplay']=!![];}else {_0x56872a=new MediaSource();_0x51245d['src']=window['URL']['createObjectURL'](_0x56872a);_0x51245d['preload']='auto';_0x56872a['addEventListener']('sourceopen',_0x2058e3);}fetch('https://my.panomoments.com/sdk/moment',{'method':'POST','body':'private_api_key='+_0x7f43d['private_api_key']+'&public_api_key='+_0x7f43d['public_api_key']+'&moment_id='+_0x7f43d['moment_id']+'&variation='+_0x7f43d['variation']+'&sdk_client_type=web','headers':{'Content-Type':'application/x-www-form-urlencoded'}})['then'](_0x4c841e=>_0x4c841e['json']())['then'](_0x385797=>{_0x2af0b2=_0x385797;_0x31139b=_0x2af0b2['web_mpd_url'];_0x28b79b=_0x2af0b2['web_video_url'];_0x2c8da1();});this['currentIndex']=0x0;this['frameCount']=0x0;this['render']=function(_0x527ec6){if(_0x1c4db0){_0x4e8420=_0x527ec6/_0x317fcf['frameCount']*0x168;_0x124c48=0x168/_0x317fcf['frameCount'];if(!_0x2af0b2['clockwise']){_0x4e8420=-_0x4e8420;_0x4e8420=0x21c+_0x4e8420;}else if(_0x4e8420<0x0){_0x4e8420=0x168+_0x4e8420;}_0x4e8420=_0x4e8420%0x168;_0x1f4e8e=parseInt(Math['round'](_0x4e8420/_0x124c48),0xa);if(_0x1f4e8e==_0x317fcf['frameCount']&&_0x2af0b2['moment_type']){_0x1f4e8e=_0x317fcf['frameCount']-0x1;}else if(_0x1f4e8e==_0x317fcf['frameCount']&&!_0x2af0b2['moment_type']||!_0x1f4e8e){_0x1f4e8e=0x0;}if(_0x317fcf['textureReady']()&&_0x5869cc!=_0x1f4e8e){_0x317fcf['currentIndex']=_0x3edb24();_0x26db5c(_0x317fcf['currentIndex']);_0x5869cc=_0x1f4e8e;}_0x15393b(_0x51245d,_0x2af0b2);}else {console['log']('Render\x20called\x20before\x20download\x20is\x20ready.\x20Wait\x20for\x20Ready\x20callback\x20before\x20calling\x20Render.');}};this['dispose']=function(){_0x51245d['src']='';_0x51245d=null;_0x15393b=null;_0xafd6c6=null;_0x4f697b=null;_0x77f828=null;_0x4b83b1=null;_0x28fee3=[];_0x56872a=null;_0x3cdc1b['splice'](0x0,_0x3cdc1b['length']);_0x8d3da1=null;_0x2d980b=null;_0x52c0d1=null;_0x29bec5=null;_0xc61c01=null;_0x3cce6c=null;_0x107d3b=null;_0x5b8589=null;_0x3e48cc=[];_0x3e48cc['splice'](0x0,_0x3e48cc['length']);_0x5869cc=null;_0x44e325=null;_0xb3fd4['splice'](0x0,_0xb3fd4['length']);_0x3f75ad=null;_0x626ae7=null;_0x1c4db0=null;_0x2ae9f0=null;_0xc61c01=null;_0x2af0b2={};_0x31139b=null;_0x28b79b=null;_0x1f4e8e=null;_0x4e8420=null;_0x124c48=null;_0x4e4077=null;_0x593647=null;_0x5eba13=null;_0x117cd8=null;console['log']('PanoMoment\x20Web\x20SDK\x20Disposed');};this['textureReady']=function(){if(!_0x29bec5&&_0x117cd8==!![]&&_0x51245d['readyState']===_0x51245d['HAVE_ENOUGH_DATA']){return !![];}else if(_0x29bec5&&(_0xc61c01&&_0x51245d['readyState']>=0x3||_0x51245d['readyState']===_0x51245d['HAVE_ENOUGH_DATA'])){return !![];}return ![];};function _0x2058e3(){_0x77f828=_0x56872a['addSourceBuffer']('video/mp4;\x20codecs=\x22avc1.640033\x22');_0x77f828['mode']='sequence';}function _0x2c8da1(){_0x5f2622(_0x31139b,{'responseType':'text','onreadystatechange':_0xcec5cc=>{const _0x17c737=_0xcec5cc['target'];if(_0x17c737&&_0x17c737['readyState']==_0x17c737['DONE']){var _0x52b104=new DOMParser();var _0x1a93a0=_0x52b104['parseFromString'](_0x17c737['response'],'text/xml',0x0);_0x396771(_0x1a93a0);if(!_0x2af0b2['allow_streaming']){_0x8d3da1=_0x317fcf['frameCount'];}else {_0x8d3da1=Math['min'](0x3c,_0x317fcf['frameCount']);}_0x32e123(_0x28b79b);}}});}const _0x32e123=async _0x5db756=>{var _0x3877be=new Headers();const _0x48fe57='bytes='+_0x3e48cc[0x0]['getAttribute']('range')['toString']();_0x2ae9f0=_0x2af0b2['aspect_ratio']?_0x2af0b2['aspect_ratio']:1.7777777;if(_0x5db756['indexOf']('https://data.panomoments.com/')>-0x1){_0x5db756=_0x5db756['replace'](/data.panomoments.com/i,'s3.amazonaws.com/data.panomoments.com');}else if(_0x5db756['indexOf']('https://staging-data.panomoments.com/')>-0x1){_0x5db756=_0x5db756['replace'](/staging-data.panomoments.com/i,'s3.amazonaws.com/staging-data.panomoments.com');}_0x3877be['append']('Range',_0x48fe57);let _0x106cca=0x0;let _0x5c882e=![];while(_0x106cca<0x5&&!_0x5c882e){try{const _0x589391=await fetch(_0x5db756,{'headers':_0x3877be,'method':'GET'});const _0x8cfd03=await _0x589391['arrayBuffer']();_0x5eba13=new Uint8Array(_0x8cfd03);var _0x3843a0=_0x15fc53(_0x5eba13,_0x39e97e);var _0x358dc5=_0x15fc53(_0x5eba13,_0x19f523);if(_0x358dc5>0x0&&_0x3843a0>0x0){var _0x58ed99=new ArrayBuffer(0x2);var _0x1171fb=new DataView(_0x58ed99);_0x1171fb['setInt8'](0x0,_0x5eba13[_0x358dc5+0x50]);_0x1171fb['setInt8'](0x1,_0x5eba13[_0x358dc5+0x51]);var _0x249ab5=_0x1171fb['getUint16'](0x0);_0x249ab5=_0x249ab5['toString']();var _0x127703=new ArrayBuffer(0x2);var _0x3430c6=new DataView(_0x127703);_0x3430c6['setInt8'](0x0,_0x5eba13[_0x358dc5+0x52]);_0x3430c6['setInt8'](0x1,_0x5eba13[_0x358dc5+0x53]);var _0x2bdb25=parseFloat(_0x3430c6['getUint16'](0x0))/Math['pow'](0x2,0x10);_0x2bdb25=_0x2bdb25['toString']()['substr'](0x1);var _0x35e1f=_0x249ab5['toString']()+_0x2bdb25['toString']();var _0x1f8a81=parseFloat(_0x5eba13[_0x3843a0+0x7])/parseFloat(_0x5eba13[_0x3843a0+0xb]);var _0x3cccf8=Math['round'](parseFloat(_0x35e1f)/_0x1f8a81);var _0x215d8b=new Uint8Array([_0x122c6a(_0x3cccf8)[0x2],_0x122c6a(_0x3cccf8)[0x3]]);_0x5eba13[_0x358dc5+0x50]=_0x122c6a(_0x3cccf8)[0x2];_0x5eba13[_0x358dc5+0x51]=_0x122c6a(_0x3cccf8)[0x3];_0x5eba13[_0x358dc5+0x52]=[0x0];_0x5eba13[_0x3843a0+0x7]=[0x1];_0x5eba13[_0x3843a0+0xb]=[0x1];}_0x181edc(_0x28b79b);_0x5c882e=!![];}catch(_0x4bccf0){console['log']('failure\x20during\x20init',_0x106cca,_0x4bccf0);_0x106cca++;}}};const _0x43f147=_0x18e50a=>{_0x3a8cdd(_0x18e50a);};const _0x3a8cdd=_0x5b38b1=>{if((!_0x77f828||_0x77f828&&_0x77f828['updating'])&&_0x626ae7==0x0){console['log']('Buffer\x20not\x20ready.\x20Retrying\x20in\x201\x20second.');_0x4e4077=setTimeout(()=>{_0x3a8cdd(_0x5b38b1);},0x3e8);return;}else if(_0x5b38b1&&_0x77f828&&!_0x77f828['updating']&&_0x626ae7==0x0){_0x51245d['currentTime']+=0x1/_0x4b83b1;_0x77f828['timestampOffset']=_0x51245d['currentTime'];_0x77f828['appendBuffer'](_0x5b38b1);_0x626ae7++;_0x4e4077=setTimeout(()=>{_0x3a8cdd(_0x5b38b1);},0x1f4);}};function _0x396771(_0x2d1894){try{var _0x18f3b0=_0x2d1894['querySelectorAll']('Representation');_0x4b83b1=0x1;_0x28fee3=_0x2d1894['querySelectorAll']('SegmentURL');_0x3e48cc=_0x2d1894['querySelectorAll']('Initialization');_0x317fcf['frameCount']=_0x28fee3['length'];}catch(_0x5c78e3){console['log'](_0x5c78e3);}}function _0x26db5c(_0xd644fe){if(_0x593647==_0xd644fe)return;_0x593647=_0xd644fe;if(!_0x29bec5){if(_0x2d980b||_0xc61c01){if(!_0x2af0b2['aligned']){_0x51245d['fastSeek']((_0xd644fe+framePadding)%_0x317fcf['frameCount']*0x1/_0x4b83b1);}else {_0x51245d['fastSeek'](_0xd644fe*0x1/_0x4b83b1);}}else {_0x51245d['currentTime']=_0xd644fe*0x1/_0x4b83b1;}}else if(_0xb3fd4[_0xd644fe]&&_0x77f828&&!_0x77f828['updating']&&_0x1c4db0){if(_0xd644fe<_0x317fcf['frameCount']){_0x51245d['currentTime']+=0x1/_0x4b83b1;_0x77f828['timestampOffset']=_0x51245d['currentTime'];if(!_0x2af0b2['aligned']){_0x77f828['appendBuffer'](_0xb3fd4[(_0xd644fe+framePadding)%_0x317fcf['frameCount']]);}else {_0x77f828['appendBuffer'](_0xb3fd4[_0xd644fe]);}}else {console['log']('Invalid\x20Index');}}}function _0x5b6490(_0xf98526,_0x950384){_0x3cce6c=_0x44e325['length'];_0x107d3b=0x0;_0x5b8589=0x0;var _0xf33569=0x8;if(_0x52c0d1){_0xf33569=0x4;}for(let _0x47c1b4=0x0;_0x47c1b4<_0xf33569;_0x47c1b4++){_0x3d91b6(_0xf98526,_0x8d3da1,()=>{if(!_0x1c4db0){_0xafd6c6(_0x51245d,_0x2af0b2);_0x1c4db0=!![];}for(let _0x21d89b=0x0;_0x21d89b<_0xf33569;_0x21d89b++){_0x3d91b6(_0xf98526,_0x3cce6c,()=>{_0x4f697b(_0x51245d,_0x2af0b2);});}});}}function _0x3d91b6(_0x36b045,_0x1b972f,_0x2466c9){setTimeout(_0x3fef35,0x0,_0x36b045,_0x1b972f,_0x2466c9);}async function _0x3fef35(_0x4074c9,_0x49508a,_0xc8be1e){while(_0x3f75ad<_0x49508a){let _0x9c76d1=0x0;let _0x3fb543=![];const _0x10e14c=_0x44e325[_0x107d3b++];_0x3f75ad++;while(_0x9c76d1<0x3&&!_0x3fb543){const _0x3878b7=new Headers();_0x3878b7['append']('Range',_0x10e14c['content']);_0x3878b7['append']('cache-control','no-store');_0x3878b7['append']('pragma','no-cache');_0x3878b7['append']('cache-control','no-cache');try{const _0x29df80=await fetch(_0x4074c9,{'headers':_0x3878b7,'method':'GET'});const _0x36e8f6=await _0x29df80['arrayBuffer']();_0x36c88c(_0x36e8f6,_0x10e14c['index']);_0x5b8589++;_0x3fb543=!![];}catch(_0xf1ef57){console['log']('exception\x20during\x20chunk\x20download,\x20retrying',++_0x9c76d1,_0xf1ef57);_0x9c76d1++;}finally{}}}if(_0x5b8589===_0x49508a){_0xc8be1e();}}function _0xc3f286(_0x5ba80d){_0x117cd8=![];_0x51245d['addEventListener']('loadeddata',_0x1ec302,![]);_0x51245d['addEventListener']('canplay',_0x4dd65d,![]);_0x51245d['addEventListener']('timeupdate',_0x2f15b8,![]);var _0x345bc3=new Uint8Array(_0x5ba80d);var _0x1369dd=_0x15fc53(_0x5eba13,_0x39e97e);var _0x12aa06=_0x15fc53(_0x5eba13,_0x19f523);if(_0x12aa06>0x0&&_0x1369dd>0x0){var _0x3e6bd8=new ArrayBuffer(0x2);var _0x4c28e8=new DataView(_0x3e6bd8);_0x4c28e8['setInt8'](0x0,_0x345bc3[_0x12aa06+0x50]);_0x4c28e8['setInt8'](0x1,_0x345bc3[_0x12aa06+0x51]);var _0x108efe=_0x4c28e8['getUint16'](0x0);_0x108efe=_0x108efe['toString']();var _0x5f0c1a=new ArrayBuffer(0x2);var _0x3c5250=new DataView(_0x5f0c1a);_0x3c5250['setInt8'](0x0,_0x345bc3[_0x12aa06+0x52]);_0x3c5250['setInt8'](0x1,_0x345bc3[_0x12aa06+0x53]);var _0x49c033=parseFloat(_0x3c5250['getUint16'](0x0))/Math['pow'](0x2,0x10);_0x49c033=_0x49c033['toString']()['substr'](0x1);var _0x34d52e=_0x108efe['toString']()+_0x49c033['toString']();var _0x691a4d=parseFloat(_0x345bc3[_0x1369dd+0x7])/parseFloat(_0x345bc3[_0x1369dd+0xb]);var _0x4f1010=Math['round'](parseFloat(_0x34d52e)/_0x691a4d);_0x345bc3[_0x12aa06+0x50]=_0x122c6a(_0x4f1010)[0x2];_0x345bc3[_0x12aa06+0x51]=_0x122c6a(_0x4f1010)[0x3];_0x345bc3[_0x12aa06+0x52]=[0x0];_0x345bc3[_0x1369dd+0x7]=[0x1];_0x345bc3[_0x1369dd+0xb]=[0x1];}_0x51245d['src']=window['URL']['createObjectURL'](new Blob([_0x345bc3],{'type':'video/mp4'}));_0x51245d['pause']();}function _0x1ec302(){_0x51245d['removeEventListener']('canplay',_0x4dd65d,![]);_0x51245d['currentTime']=_0x317fcf['currentIndex'];}function _0x4dd65d(){_0x51245d['removeEventListener']('loadeddata',_0x1ec302,![]);_0x51245d['currentTime']=_0x317fcf['currentIndex'];}function _0x2f15b8(){_0x51245d['currentTime']=_0x317fcf['currentIndex'];_0x1c4db0=!![];_0x117cd8=!![];_0xafd6c6(_0x51245d,_0x2af0b2);_0x4f697b(_0x51245d,_0x2af0b2);_0x51245d['removeEventListener']('loadeddata',_0x1ec302,![]);_0x51245d['removeEventListener']('canplay',_0x4dd65d,![]);_0x51245d['removeEventListener']('timeupdate',_0x2f15b8,![]);}function _0x5f2622(_0x5c7f13,_0x1c293e){if(_0x5c7f13!=null&&_0x5c7f13!==''){var _0x59d5d6=new XMLHttpRequest();_0x59d5d6['open']('GET',_0x5c7f13,!![]);if(_0x1c293e){_0x59d5d6['responseType']=_0x1c293e['responseType'];if(_0x1c293e['onreadystatechange']){_0x59d5d6['onreadystatechange']=_0x1c293e['onreadystatechange']['bind'](_0x59d5d6);}if(_0x1c293e['onload']){_0x59d5d6['onload']=_0x1c293e['onload'];}}_0x59d5d6['addEventListener']('error',function(_0x3e8922){console['log']('Error:\x20'+_0x3e8922+'\x20Could\x20not\x20load\x20url.');},![]);_0x59d5d6['send']();return _0x59d5d6;}}const _0x181edc=async _0x2f62e8=>{var _0x1d0fc0=new Headers();var _0x1bbbec=_0x2af0b2['start_frame']+0x5a;_0x124c48=0x168/_0x317fcf['frameCount'];if(!_0x2af0b2['clockwise']){_0x1bbbec=-_0x1bbbec;}if(_0x1bbbec<0x0){_0x1bbbec=0x168+_0x1bbbec;}_0x317fcf['currentIndex']=parseInt(Math['round'](_0x1bbbec/_0x124c48),0xa);const _0x4db74a='bytes='+_0x28fee3[_0x317fcf['currentIndex']]['getAttribute']('mediaRange')['toString']();_0x1d0fc0['append']('Range',_0x4db74a);if(_0x2f62e8['indexOf']('https://data.panomoments.com/')>-0x1){_0x2f62e8=_0x2f62e8['replace'](/data.panomoments.com/i,'s3.amazonaws.com/data.panomoments.com');}else if(_0x2f62e8['indexOf']('https://staging-data.panomoments.com/')>-0x1){_0x2f62e8=_0x2f62e8['replace'](/staging-data.panomoments.com/i,'s3.amazonaws.com/staging-data.panomoments.com');}let _0x36341f=0x0;let _0xc27971=![];while(_0x36341f<0x5&&!_0xc27971){try{const _0x39223a=await fetch(_0x2f62e8,{'headers':_0x1d0fc0,'method':'GET'});const _0x56487c=await _0x39223a['arrayBuffer']();var _0x6292b5=new Uint8Array(_0x56487c);var _0x30e016=new Int8Array(_0x5eba13['length']+_0x6292b5['length']);_0x30e016['set'](_0x5eba13);_0x30e016['set'](_0x6292b5,_0x5eba13['length']);if(!_0x29bec5){_0x51245d['addEventListener']('loadeddata',_0x2db252);_0x51245d['addEventListener']('canplay',_0x326727);_0x51245d['src']=window['URL']['createObjectURL'](new Blob([_0x30e016],{'type':'video/mp4'}));_0x51245d['pause']();}else {_0x36c88c(_0x56487c,_0x317fcf['currentIndex']);_0x43f147(_0x30e016);_0x15393b(_0x51245d,_0x2af0b2);_0x44e325=_0x45f0fa(_0x28fee3,_0x8d3da1,_0x3cdc1b,![]);}if(window['self']!==window['top']){_0x4b2f6d(_0x2f62e8);}else {_0x40845c(_0x2f62e8);}_0xc27971=!![];}catch(_0x5a3512){console['log']('failure\x20during\x20first\x20frame\x20download',_0x36341f,_0x5a3512);_0x36341f++;}}};const _0x4b2f6d=_0x1761ea=>{var _0x5c05be=document['createElement']('div');_0x5c05be['style']['margin']='1px';_0x5c05be['style']['height']='100%';_0x5c05be['style']['width']='100%';_0x5c05be['style']['pointerEvents']='none';_0x5c05be['style']['zIndex']=-0x1;_0x5c05be['style']['position']='fixed';_0x5c05be['style']['top']=0x0;document['body']['appendChild'](_0x5c05be);var _0x11a7f8=new IntersectionObserver(function(_0x5f1c5a){var _0x5f42ee=_0x5f1c5a[0x0]['isIntersecting'];if(_0x5f42ee){_0x11a7f8['disconnect']();document['body']['removeChild'](_0x5c05be);_0x40845c();}});_0x11a7f8['observe'](_0x5c05be);};const _0x40845c=_0x383490=>{if(!_0x29bec5){fetch(_0x28b79b)['then'](function(_0x3ba439){_0x3ba439['arrayBuffer']()['then'](function(_0x507bbc){_0xc3f286(_0x507bbc);});});}else {_0x5b6490(_0x28b79b);}};const _0x2db252=()=>{_0x117cd8=!![];_0x51245d['removeEventListener']('loadeddata',_0x2db252);_0x51245d['removeEventListener']('canplay',_0x326727);_0x15393b(_0x51245d,_0x2af0b2);};const _0x326727=()=>{_0x117cd8=!![];_0x51245d['removeEventListener']('canplay',_0x326727);_0x51245d['removeEventListener']('loadeddata',_0x2db252);_0x15393b(_0x51245d,_0x2af0b2);};function _0x36c88c(_0x459d6e,_0x424d4c){_0xb3fd4[_0x424d4c]=_0x459d6e;}const _0x3edb24=()=>{var _0x3f3557;if(!_0x29bec5){return _0x1f4e8e;}_0x3f3557=_0x1f4e8e;if(_0x44e325['length']!=0x0&&!_0xb3fd4[_0x1f4e8e]){var _0x15d0e4,_0x8d53d1,_0x533cf2,_0x13f6fa=![],_0x4e3100=![];_0x15d0e4=_0x1f4e8e;while(!_0x13f6fa&&_0x15d0e4<_0x317fcf['frameCount']){if(_0xb3fd4[_0x15d0e4]){_0x13f6fa=!![];_0x8d53d1=_0x15d0e4;}else {_0x15d0e4++;}}_0x15d0e4=_0x1f4e8e;while(!_0x4e3100&&_0x15d0e4>=0x0){if(_0xb3fd4[_0x15d0e4]){_0x4e3100=!![];_0x533cf2=_0x15d0e4;}else {_0x15d0e4--;}}if(!_0x8d53d1){_0x8d53d1=_0x317fcf['frameCount'];}if(Math['abs'](_0x1f4e8e-_0x8d53d1)<=Math['abs'](_0x1f4e8e-_0x533cf2)&&_0x8d53d1==_0x317fcf['frameCount']){_0x3f3557=0x0;}else if(Math['abs'](_0x1f4e8e-_0x8d53d1)<=Math['abs'](_0x1f4e8e-_0x533cf2)){_0x3f3557=_0x8d53d1;}else {_0x3f3557=_0x533cf2;}}else {_0x3f3557=_0x1f4e8e;}if(!_0x3f3557){_0x3f3557=0x0;}return _0x3f3557;};function _0x4a34e4(_0x523717,_0x4cbc29,_0x25557f,_0x17a741,_0x1e7e74){return {'header':'Range','content':'bytes='+_0x523717['getAttribute']('mediaRange')['toString'](),'index':_0x4cbc29,'countPosition':_0x25557f,'firstPass':_0x17a741,'firstPassCompleteIndex':_0x1e7e74};}function _0x45f0fa(_0x42bf5b,_0x12fdd9,_0x3d894d,_0x38bd6a=![]){var _0x1c9be3=[];var _0x364621=0x0;if(_0x38bd6a){for(var _0x236818=0x0;_0x236818<_0x42bf5b['length'];_0x236818++){_0x1c9be3['push'](_0x4a34e4(_0x42bf5b[_0x236818],_0x236818,![]));}return _0x1c9be3;}const _0x228433=parseInt(Math['round'](_0x42bf5b['length']/_0x12fdd9),0xa);const _0x493ee5=Math['ceil'](_0x42bf5b['length']/_0x12fdd9);var _0x457d47=_0x12fdd9+_0x493ee5;for(var _0x236818=0x0;_0x236818<_0x457d47;_0x236818++){if(_0x42bf5b[_0x236818*_0x228433]){_0x1c9be3['push'](_0x4a34e4(_0x42bf5b[_0x236818*_0x228433],_0x236818*_0x228433,_0x364621++,!![],_0x457d47));_0x3d894d['push'](_0x236818*_0x228433);}}_0x457d47=_0x1c9be3['length'];for(var _0x236818=0x0;_0x236818<_0x1c9be3['length'];_0x236818++){_0x1c9be3[_0x236818]['firstPassCompleteIndex']=_0x457d47;}var _0x7af6ec=_0x228433;_0x364621=0x0;for(var _0x4fcde5=Math['floor'](_0x228433/0x2);_0x4fcde5>0x1;_0x4fcde5=Math['floor'](_0x4fcde5/0x2)){for(var _0x236818=0x0;_0x236818<_0x42bf5b['length']/_0x7af6ec;_0x236818++){if(_0x42bf5b[_0x4fcde5+_0x236818*_0x7af6ec]){_0x1c9be3['push'](_0x4a34e4(_0x42bf5b[_0x4fcde5+_0x236818*_0x7af6ec],_0x4fcde5+_0x236818*_0x7af6ec,_0x364621++,![],_0x457d47));}}_0x7af6ec=Math['floor'](_0x4fcde5/0x2);}var _0x29f5c6=[];for(var _0x236818=0x0;_0x236818<_0x1c9be3['length'];_0x236818++){_0x29f5c6[_0x1c9be3[_0x236818]['index']]=_0x1c9be3[_0x236818]['index'];}for(var _0x236818=0x0;_0x236818<_0x42bf5b['length'];_0x236818++){if(!_0x29f5c6[_0x236818]){_0x1c9be3['push'](_0x4a34e4(_0x42bf5b[_0x236818],_0x236818,_0x364621++,![],_0x457d47));}}function _0x5606ab(_0x3441ce,_0x157e5a){return _0x3441ce['filter'](function(_0x396f24,_0x13c558,_0x517f7e){return _0x517f7e['map'](function(_0x4b9301){return _0x4b9301[_0x157e5a];})['indexOf'](_0x396f24[_0x157e5a])===_0x13c558;});}var _0x23af9d=_0x5606ab(_0x1c9be3,'index');_0x1c9be3=[];_0x29f5c6=[];return _0x23af9d;}function _0x122c6a(_0x1c6deb){var _0x466b45=new Uint8Array([(_0x1c6deb&0xff000000)>>0x18,(_0x1c6deb&0xff0000)>>0x10,(_0x1c6deb&0xff00)>>0x8,_0x1c6deb&0xff]);return _0x466b45;}const _0x15fc53=function(_0x44677b,_0x3b03ce,_0x57ede5){_0x57ede5=_0x57ede5||0x0;var _0x2acdf8=_0x44677b['indexOf'](_0x3b03ce[0x0],_0x57ede5);if(_0x3b03ce['length']===0x1||_0x2acdf8===-0x1){return _0x2acdf8;}for(var _0x2217b3=_0x2acdf8,_0x38e0ff=0x0;_0x38e0ff<_0x3b03ce['length']&&_0x2217b3<_0x44677b['length'];_0x2217b3++,_0x38e0ff++){if(_0x44677b[_0x2217b3]!==_0x3b03ce[_0x38e0ff]){return _0x15fc53(_0x5eba13,_0x3b03ce,_0x2acdf8+0x1);}}return _0x2217b3===_0x2acdf8+_0x3b03ce['length']?_0x2acdf8:-0x1;};}

	/**
	 * PanoMoments Panorama
	 * @param {object} identifier PanoMoment identifier
	 */
	function PanoMoment ( identifier ) {

	    Panorama.call( this );

	    // PanoMoments
	    this.identifier = identifier;
	    this.PanoMoments = null;
	    this.momentData = null;
	    this.status = EVENTS.PANOMOMENT.NONE;

	    // Panolens
	    this.container = null;
	    this.camera = null;
	    this.controls = null;
	    this.defaults = {};

	    // Setup Dispatcher
	    this.setupDispatcher();

	    // Event Bindings
	    this.handlerUpdateCallback = () => this.updateCallback();
	    this.handlerWindowResize = () => this.onWindowResize();

	    // Event Listeners
	    this.addEventListener( EVENTS.CONTAINER, ( { container } ) => this.onPanolensContainer( container ) );
	    this.addEventListener( EVENTS.CAMERA, ( { camera } ) => this.onPanolensCamera( camera ) );
	    this.addEventListener( EVENTS.CONTROLS, ( { controls } ) => this.onPanolensControls( controls ) );
	    this.addEventListener( EVENTS.FADE_IN, () => this.enter() );
	    this.addEventListener( EVENTS.LEAVE_COMPLETE, () => this.leave() );
	    this.addEventListener( EVENTS.LOAD_START, () => this.disableControl() );
	    this.addEventListener( EVENTS.PANOMOMENT.READY, () => this.enableControl() );

	}

	PanoMoment.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: PanoMoment,

	    /**
	     * When window is resized
	     * @virtual
	     */
	    onWindowResize: function() {},

	    /**
	     * When container reference dispatched
	     * @param {HTMLElement} container 
	     */
	    onPanolensContainer: function( container ) {

	        this.container = container;

	    },

	    /**
	     * When camera reference dispatched
	     * @param {THREE.Camera} camera 
	     */
	    onPanolensCamera: function( camera ) {

	        Object.assign( this.defaults, { fov: camera.fov } );

	        this.camera = camera;

	    },

	    /**
	     * When control references dispatched
	     * @param {THREE.Object[]} controls 
	     */
	    onPanolensControls: function( controls ) {

	        const [ { minPolarAngle, maxPolarAngle } ] = controls;

	        Object.assign( this.defaults, { minPolarAngle, maxPolarAngle } );
	        
	        this.controls = controls;

	    },

	    /**
	     * Intercept default dispatcher
	     */
	    setupDispatcher: function() {

	        const dispatch = this.dispatchEvent.bind( this );
	        const values = Object.values( EVENTS.PANOMOMENT );
	  
	        this.dispatchEvent = function( event ) {
	 
	            if ( values.includes( event.type ) ) {

	                this.status = event.type;

	            }

	            dispatch( event );

	        };

	    },

	    /**
	     * Enable Control
	     */
	    enableControl: function() {
	        
	        if ( !this.active ) return;

	        const [ OrbitControls ] = this.controls;

	        OrbitControls.enabled = true;

	    },

	    /**
	     * Disable Control
	     */
	    disableControl: function() {

	        if ( !this.active ) return;

	        const [ OrbitControls ] = this.controls;

	        OrbitControls.enabled = false;

	    },

	    /**
	     * Load Pano Moment Panorama
	     */
	    load: function () {

	        Panorama.prototype.load.call( this, false );
	        
	        const { identifier, renderCallback, readyCallback, loadedCallback } = this;

	        this.PanoMoments = new PanoMoments(
	            identifier, 
	            renderCallback.bind( this ), 
	            readyCallback.bind( this ), 
	            loadedCallback.bind( this )
	        );

	    },

	    /**
	     * Update intial heading based on moment data
	     */
	    updateHeading: function() {

	        if ( !this.momentData ) return;

	        const { momentData: { start_frame } } = this;
	        const angle = ( start_frame + 180 ) / 180 * Math.PI;

	        // reset center to initial lookat
	        this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'setControlCenter' } );

	        // rotate to initial frame center
	        this.dispatchEvent( { type: EVENTS.VIEWER_HANDLER, method: 'rotateControlLeft', data: angle } );

	    },

	    /**
	     * Get Camera Yaw for PanoMoment texture
	     */
	    getYaw: function() {

	        const { camera: { rotation: { y } }, momentData: { clockwise } } = this;
	        
	        const rotation = THREE.Math.radToDeg( y ) + 180;
	        const yaw = ( ( clockwise ? 90 : -90 ) - rotation ) % 360;

	        return yaw;
	        
	    },

	    /**
	     * On Panolens update callback
	     */
	    updateCallback: function() {

	        if ( !this.momentData || this.status === EVENTS.PANOMOMENT.NONE ) return;

	        this.setPanoMomentYaw( this.getYaw() );        

	    },

	    /**
	     * On Pano Moment Render Callback
	     */
	    renderCallback: function (video, momentData) {

	        if ( !this.momentData ) {

	            this.momentData = momentData;

	            const texture = new THREE.Texture( video );
	            texture.minFilter = texture.magFilter = THREE.LinearFilter;
	            texture.generateMipmaps = false;
	            texture.format = THREE.RGBFormat;
	            this.updateTexture( texture ); 

	            this.dispatchEvent( { type: EVENTS.PANOMOMENT.FIRST_FRAME_DECODED } );

	            Panorama.prototype.onLoad.call( this );

	        }
	    },

	    /**
	     * On Pano Moment Ready Callback
	     */
	    readyCallback: function () {

	        this.dispatchEvent( { type: EVENTS.PANOMOMENT.READY } );

	    },

	    /**
	     * On Pano Moment Loaded Callback
	     */
	    loadedCallback: function () {

	        this.dispatchEvent( { type: EVENTS.PANOMOMENT.COMPLETED } );

	    },

	    /**
	     * Set PanoMoment yaw
	     * @memberOf PanoMomentPanorama
	     * @param {number} yaw - yaw value from 0 to 360 in degree
	     */
	    setPanoMomentYaw: function (yaw) {

	        const { status, momentData, PanoMoments: { render, frameCount, textureReady } } = this;

	        // textureReady() must be called before render() 
	        if (textureReady()) this.getTexture().needsUpdate = true;

	        if( (status !== EVENTS.PANOMOMENT.READY && status !== EVENTS.PANOMOMENT.COMPLETED) || !momentData ) return;

	        render((yaw / 360) * frameCount);

	    },

	    /**
	     * Enter Panorama
	     */
	    enter: function() {

	        this.updateHeading();

	        this.addEventListener( EVENTS.WIDNOW_RESIZE, this.handlerWindowResize );

	        // Add update callback
	        this.dispatchEvent( { 
	            type: EVENTS.VIEWER_HANDLER, 
	            method: 'addUpdateCallback', 
	            data: this.handlerUpdateCallback
	        });

	    },

	    /**
	     * Leave Panorama
	     */
	    leave: function() {

	        const { camera, controls: [ OrbitControls ], defaults: { minPolarAngle, maxPolarAngle, fov } } = this;

	        Object.assign( OrbitControls, { minPolarAngle, maxPolarAngle } );

	        camera.fov = fov;
	        camera.updateProjectionMatrix();

	        this.removeEventListener( EVENTS.WIDNOW_RESIZE, this.handlerWindowResize );

	        // Remove update callback
	        this.dispatchEvent( { 
	            type: EVENTS.VIEWER_HANDLER, 
	            method: 'removeUpdateCallback', 
	            data: this.handlerUpdateCallback
	        });

	    },

	    /**
	     * Dispose Panorama
	     */
	    dispose: function() {

	        this.leave();

	        this.PanoMoments.dispose();
	        this.PanoMoments = null;
	        this.momentData = null;

	        this.container = null;
	        this.camera = null;
	        this.controls = null;
	        this.defaults = null;

	        Panorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * PanoMoment Panorama
	 * @param {object} identifier PanoMoment identifier
	 */
	function PanoMomentPanorama ( identifier ) {

	    PanoMoment.call( this, identifier );

	    // Event Bindings
	    this.viewerResetControlLimits = () => this.resetControlLimits( false );

	}

	PanoMomentPanorama.prototype = Object.assign( Object.create( PanoMoment.prototype ), {

	    constructor: PanoMomentPanorama,

	    /**
	     * When window is resized
	     */
	    onWindowResize: function() {

	        this.resetControlLimits( false );

	    },

	    /**
	     * Attch UI Event Listener to Container
	     * @param {boolean} attach 
	     */
	    attachFOVListener: function( attach = true ) {

	        const [ OrbitControls ] = this.controls;

	        if ( attach ) {

	            OrbitControls.addEventListener( 'fov', this.viewerResetControlLimits );

	        } else {

	            OrbitControls.removeEventListener( 'fov', this.viewerResetControlLimits );

	        }
	        
	    },

	    /**
	     * Update intial heading with texture offset
	     */
	    updateHeading: function() {

	        if ( !this.momentData ) return;

	        const { momentData: { max_horizontal_fov } } = this;

	        this.material.uniforms.offset.value.x = ( max_horizontal_fov / 360 + .25 ) % 1;

	        // control update
	        this.resetControlLimits( false );

	        PanoMoment.prototype.updateHeading.call( this );

	    },

	    /**
	     * Reset Polar Angle Limit by momentData or default
	     * @param {boolean} reset 
	     */
	    resetAzimuthAngleLimits: function( reset = false ) {

	        const { 
	            controls: [ OrbitControls ], 
	            momentData: { contains_parallax, min_vertical_fov }, 
	            defaults: { minPolarAngle, maxPolarAngle }, 
	            camera 
	        } = this;

	        if ( !contains_parallax && !reset ) return;

	        const delta = THREE.Math.degToRad( ( 0.95 * min_vertical_fov - camera.fov ) / 2 );
	        const angles = {
	            minPolarAngle: Math.PI / 2 - delta,
	            maxPolarAngle: Math.PI / 2 + delta
	        };

	        Object.assign( OrbitControls, reset ? { minPolarAngle, maxPolarAngle } : angles );

	    },

	    /**
	     * Calculate FOV limit
	     * @param {number} fov 
	     * @param {boolean} horizontal 
	     */
	    calculateFOV: function( fov, horizontal ) {

	        const { camera: { aspect } } = this;
	        const factor = horizontal ? aspect : ( 1 / aspect );

	        return 2 * Math.atan( Math.tan( fov * Math.PI / 360 ) * factor ) / Math.PI * 180;

	    },

	    /**
	     * Set FOV Limit by momentData or default
	     * @param {boolean} reset 
	     */
	    resetFOVLimits: function ( reset = false ) {

	        const { momentData, camera, controls: [ OrbitControls ], defaults: { fov } } = this;
	        const fovH = this.calculateFOV( camera.fov, true ) ;

	        if ( fovH > ( momentData.min_horizontal_fov * .95 ) ) {

	            camera.fov = this.calculateFOV( momentData.min_horizontal_fov * .95, false );
	        
	        } else if ( fovH < OrbitControls.minFov ) {

	            camera.fov = this.calculateFOV( OrbitControls.minFov, false );

	        }

	        camera.fov = reset ? fov : camera.fov;
	        camera.updateProjectionMatrix();

	    },

	    /**
	     * Reset Polar Angle and FOV Limits
	     * @param {boolean} reset
	     */
	    resetControlLimits: function( reset = false ) {

	        if ( !this.momentData ) return;

	        this.resetFOVLimits( reset );
	        this.resetAzimuthAngleLimits( reset );

	    },

	    /**
	     * Enter Panorama
	     */
	    enter: function() {

	        this.attachFOVListener( true );
	        this.resetControlLimits( false );

	        PanoMoment.prototype.enter.call( this );

	    },

	    /**
	     * Leave Panorama
	     */
	    leave: function() {

	        this.attachFOVListener( false );
	        this.resetControlLimits( true );

	        PanoMoment.prototype.leave.call( this );

	    }

	} );

	/**
	 * Equirectangular shader
	 * based on three.js equirect shader
	 * @author pchen66
	 */

	/**
	 * @description Background Shader
	 * @module BackgroundShader
	 * @property {object} uniforms
	 * @property {THREE.Texture} uniforms.texture diffuse map
	 * @property {number} uniforms.opacity image opacity
	 * @property {string} vertexShader vertex shader
	 * @property {string} fragmentShader fragment shader
	 */
	const BackgroundShader = {

	    uniforms: {

	        'texture': { value: new THREE.Texture() },
	        'repeat': { value: new THREE.Vector2( 1.0, 1.0 ) },
	        'offset': { value: new THREE.Vector2( 0.0, 0.0 ) },
	        'opacity': { value: 1.0 }

	    },

	    vertexShader: `
        varying vec2 vUv;
        #include <common>
        
        void main() {
        
            vUv = uv;
            gl_Position = vec4( position, 1.0 );
            #include <begin_vertex>
            #include <project_vertex>
        
        }
    `,

	    fragmentShader: `
        uniform sampler2D texture;
        uniform vec2 repeat;
        uniform vec2 offset;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {

            vec2 sampleUV = vUv;
            sampleUV = sampleUV * repeat + offset;
        
            gl_FragColor = texture2D( texture, sampleUV );
            gl_FragColor.a *= opacity;
        
        }
    `

	};

	function PanoMomentRegular ( identifier ) {

	    PanoMoment.call( this, identifier );

	    this.scale2D = new THREE.Vector2( 1, 1 );

	}

	PanoMomentRegular.prototype = Object.assign( Object.create( PanoMoment.prototype ), {

	    constructor: PanoMomentRegular,

	    /**
	     * When window is resized
	     */
	    onWindowResize: function() {

	        this.update2DGeometryScale( false );

	    },

	    /**
	     * Create Plane Geometry for Regular PanoMoment
	     */
	    createGeometry: function () {

	        return new THREE.PlaneBufferGeometry( 1, 1 );
	        
	    },

	    /**
	     * Create Background Shader Material for Regular PanoMoment
	     */
	    createMaterial: function ( repeat = new THREE.Vector2( 1, 1 ), offset = new THREE.Vector2( 0, 0 ) ) {

	        const { fragmentShader, vertexShader } = BackgroundShader;
	        const uniforms = THREE.UniformsUtils.clone( BackgroundShader.uniforms );
	        
	        uniforms.repeat.value.copy( repeat );
	        uniforms.offset.value.copy( offset );
	        uniforms.opacity.value = 0.0;

	        const material = new THREE.ShaderMaterial( {

	            fragmentShader,
	            vertexShader,
	            uniforms,
	            transparent: true
	    
	        } );

	        return material;
	    },

	    /**
	     * Update 2D Geometry Scale
	     * @param [reset=false] whether to reset scale
	     */
	    update2DGeometryScale: function ( reset = false ) {

	        if ( !this.momentData ) return;

	        // reset geometric scale
	        this.geometry.scale( 1 / this.scale2D.x, 1 / this.scale2D.y, 1 );

	        if ( reset ) {

	            this.scale2D.set( 1, 1 );
	            return;

	        }

	        const { momentData: { aspect_ratio } } = this;

	        const { fov, aspect } = this.camera;
	        const scale = 2 * Math.tan( fov * Math.PI / 360 ) * Math.min( aspect_ratio, aspect );
	 
	        // update geometric scale
	        this.scale2D.set( scale, scale / aspect_ratio );
	        this.geometry.scale( this.scale2D.x, this.scale2D.y, 1 );

	    },

	    /**
	     * Enter Panorama
	     */
	    enter: function() {

	        this.position.set( 0, 0, -1 );
	        this._parent = this.parent;
	        this.camera.add( this );

	        this.update2DGeometryScale();

	        PanoMoment.prototype.enter.call( this );

	    },

	    /**
	     * Enter Panorama
	     */
	    leave: function() {

	        this.position.set( 0, 0, 0 );
	        this._parent.add( this );
	        delete this._parent;

	        PanoMoment.prototype.leave.call( this );

	    }

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
	    this.target = new THREE.Vector3();

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
	    this.keyPanSpeed = 7.0; // pixels moved per arrow key push

	    // Set to true to automatically rotate around the target
	    this.autoRotate = false;
	    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	    /*
	     * How far you can orbit vertically, upper and lower limits.
	     * Range is 0 to Math.PI radians.
	     */
	    this.minPolarAngle = 0; // radians
	    this.maxPolarAngle = Math.PI; // radians

	    // Coord
	    this.spherical = new THREE.Spherical();

	    // Momentum
	    this.momentumKeydownFactor = .05;
	    this.momentum = true;
	    this.momentumFactor = 7.5;
	    this.dampingFactor = 0.9;

	    this.speedLimit = Number.MAX_VALUE;
	    this.enableDamping = true;

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
	    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	    /*
	     * //////////
	     * internals
	     */

	    const scope = this;

	    const EPS = 10e-8;

	    const rotateStart = new THREE.Vector2();
	    const rotateEnd = new THREE.Vector2();
	    const rotateDelta = new THREE.Vector2();

	    const panStart = new THREE.Vector2();
	    const panEnd = new THREE.Vector2();
	    const panDelta = new THREE.Vector2();
	    const panOffset = new THREE.Vector3();

	    const offset = new THREE.Vector3();

	    const dollyStart = new THREE.Vector2();
	    const dollyEnd = new THREE.Vector2();
	    const dollyDelta = new THREE.Vector2();

	    let theta = 0;
	    let phi = 0;
	    let phiDelta = 0;
	    let thetaDelta = 0;
	    let scale = 1;
	    const pan = new THREE.Vector3();

	    const lastPosition = new THREE.Vector3();
	    const lastQuaternion = new THREE.Quaternion();

	    const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	    let state = STATE.NONE;

	    // for reset

	    this.target0 = this.target.clone();
	    this.position0 = this.object.position.clone();
	    this.zoom0 = this.object.zoom;

	    // so camera.up is the orbit axis

	    const quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
	    const quatInverse = quat.clone().inverse();

	    // events

	    const changeEvent = { type: 'change' };
	    const startEvent = { type: 'start' };
	    const endEvent = { type: 'end' };
	    const fovEvent = { type: 'fov' };

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

	        angle = this.momentum && !this.autoRotate ? angle /= this.momentumFactor : angle; 
	        thetaDelta -= angle;

	    };

	    this.rotateUp = function ( angle ) {

	        if ( angle === undefined ) {

	            angle = getAutoRotationAngle();

	        }

	        angle = this.momentum && !this.autoRotate ? angle /= this.momentumFactor : angle; 
	        phiDelta -= angle;

	    };

	    this.rotateLeftStatic = function ( angle ) {

	        this.enableDamping = false;
	        thetaDelta -= angle;
	        this.update();
	        this.enableDamping = true;

	    };

	    this.rotateUpStatic = function ( angle ) {

	        this.enableDamping = false;
	        phiDelta -= angle;
	        this.update();
	        this.enableDamping = true;

	    };

	    // pass in distance in world space to move left
	    this.panLeft = function ( distance ) {

	        const te = this.object.matrix.elements;

	        // get X column of matrix
	        panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
	        panOffset.multiplyScalar( - distance );

	        pan.add( panOffset );

	    };

	    // pass in distance in world space to move up
	    this.panUp = function ( distance ) {

	        const te = this.object.matrix.elements;

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

	        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	        if ( scope.object instanceof THREE.PerspectiveCamera ) {

	            // perspective
	            const position = scope.object.position;
	            const offset = position.clone().sub( scope.target );
	            let targetDistance = offset.length();

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

	        const position = this.object.position;

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

	        // speed limit
	        if (this.enableDamping === true && this.speedLimit !== Number.MAX_VALUE) {
	            thetaDelta = THREE.Math.clamp(thetaDelta, -this.speedLimit, this.speedLimit);
	            phiDelta = THREE.Math.clamp(phiDelta, -this.speedLimit, this.speedLimit);
	        }
	        
	        theta += thetaDelta;
	        phi += phiDelta;

	        // restrict theta to be between desired limits
	        theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

	        // restrict phi to be between desired limits
	        phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

	        // restrict phi to be betwee EPS and PI-EPS
	        phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

	        let radius = offset.length() * scale;

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

	        // store spherical data
	        scope.spherical.set( radius, phi, theta );

	        if ( !this.autoRotate && this.enableDamping === true && ((this.momentum && (state === STATE.ROTATE || state === STATE.TOUCH_ROTATE)) || state === STATE.NONE ) ) {

	            thetaDelta *= this.dampingFactor;
	            phiDelta *= this.dampingFactor;

	        } else {

	            thetaDelta = 0;
	            phiDelta = 0;

	        }

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

	    }

	    function onMouseMove( event ) {

	        if ( scope.enabled === false ) return;

	        event.preventDefault();

	        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	        if ( state === STATE.ROTATE ) {

	            if ( scope.noRotate === true ) return;

	            rotateEnd.set( event.clientX, event.clientY );
	            rotateDelta.subVectors( rotateEnd, rotateStart );

	            if (rotateStart.x == 0 && rotateStart.y == 0) {
	                rotateStart.set(rotateEnd.x, rotateEnd.y);
	                rotateDelta.subVectors( rotateEnd, rotateStart );
	                return;
	            }

	            // rotating across whole screen goes 360 degrees around
	            scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight * scope.rotateSpeed );

	            // rotating up and down along whole screen attempts to go 360, but limited to 180
	            scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

	            rotateStart.copy( rotateEnd );

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

	    }

	    function onMouseUp( /* event */ ) {

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

	        let delta = 0;

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

	        scope.dispatchEvent( changeEvent );
	        scope.dispatchEvent( startEvent );
	        scope.dispatchEvent( endEvent );
	        scope.dispatchEvent( fovEvent );

	    }

	    function onKeyUp ( event ) {

	        switch ( event.keyCode ) {

	            case scope.keys.UP:
	                break;

	            case scope.keys.BOTTOM:
	                break;

	            case scope.keys.LEFT:
	                break;

	            case scope.keys.RIGHT:
	                break;

	        }

	    }

	    function onKeyDown( event ) {

	        if ( scope.enabled === false || scope.noKeys === true || scope.noRotate === true || scope.autoRotate) return;

	        const updatedMomentumKeydownFactor = scope.momentum && !scope.autoRotate ? scope.momentumKeydownFactor * scope.momentumFactor : scope.momentumKeydownFactor; // Handle difference in necessary rotateSpeed constants.

	        switch ( event.keyCode ) {

	            case scope.keys.UP:
	                scope.rotateUp( scope.rotateSpeed * updatedMomentumKeydownFactor );
	                break;

	            case scope.keys.BOTTOM:
	                scope.rotateUp( - scope.rotateSpeed * updatedMomentumKeydownFactor );
	                break;

	            case scope.keys.LEFT:
	                scope.rotateLeft( scope.rotateSpeed * updatedMomentumKeydownFactor );
	                break;

	            case scope.keys.RIGHT:
	                scope.rotateLeft( - scope.rotateSpeed * updatedMomentumKeydownFactor );
	                break;

	        }

	    }

	    function touchstart( event ) {


	        if ( scope.enabled === false ) return;

	        switch ( event.touches.length ) {

	            case 1: // one-fingered touch: rotate

	                if ( scope.noRotate === true ) return;

	                state = STATE.TOUCH_ROTATE;

	                rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	                break;

	            case 2: // two-fingered touch: dolly

	                if ( scope.noZoom === true ) return;

	                state = STATE.TOUCH_DOLLY;

	                const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	                const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	                const distance = Math.sqrt( dx * dx + dy * dy );

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

	        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	        switch ( event.touches.length ) {

	            case 1: // one-fingered touch: rotate

	                if ( scope.noRotate === true ) return;
	                if ( state !== STATE.TOUCH_ROTATE ) return;

	                rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	                rotateDelta.subVectors( rotateEnd, rotateStart );

	                // rotating across whole screen goes 360 degrees around
	                scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight * scope.rotateSpeed );
	                // rotating up and down along whole screen attempts to go 360, but limited to 180
	                scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

	                rotateStart.copy( rotateEnd );

	                break;

	            case 2: // two-fingered touch: dolly

	                if ( scope.noZoom === true ) return;
	                if ( state !== STATE.TOUCH_DOLLY ) return;

	                const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	                const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	                const distance = Math.sqrt( dx * dx + dy * dy );

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

	                scope.dispatchEvent( changeEvent );
	                scope.dispatchEvent( fovEvent );
	                break;

	            case 3: // three-fingered touch: pan

	                if ( scope.noPan === true ) return;
	                if ( state !== STATE.TOUCH_PAN ) return;

	                panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	                panDelta.subVectors( panEnd, panStart );

	                scope.pan( panDelta.x, panDelta.y );

	                panStart.copy( panEnd );

	                break;

	            default:

	                state = STATE.NONE;

	        }

	    }

	    function touchend( /* event */ ) {

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
	OrbitControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	    constructor: OrbitControls

	} );

	/**
	 * @classdesc Device Orientation Control
	 * @constructor
	 * @external DeviceOrientationControls
	 * @param {THREE.Object} object 
	 */
	function DeviceOrientationControls ( object ) {

	    const scope = this;

	    this.object = object;
	    this.object.rotation.reorder( 'YXZ' );

	    this.enabled = true;

	    this.deviceOrientation = null;
	    this.screenOrientation = 0;

	    this.alphaOffset = 0; // radians
	    this.initialOffset = null;

	    const onDeviceOrientationChangeEvent = function ( { alpha, beta, gamma } ) {

	        if( scope.initialOffset === null ) {
	            scope.initialOffset = alpha;
	        }

	        alpha = alpha - scope.initialOffset;

	        if(alpha < 0) alpha += 360;

	        scope.deviceOrientation = { alpha, beta, gamma };

	    };

	    const onScreenOrientationChangeEvent = function () {

	        scope.screenOrientation = window.orientation || 0;

	    };

	    const onRegisterEvent = function() {

	        window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
	        window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

	    }.bind( this );


	    // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	    const setObjectQuaternion = function () {

	        const zee = new THREE.Vector3( 0, 0, 1 );

	        const euler = new THREE.Euler();

	        const q0 = new THREE.Quaternion();

	        const q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

	        return function ( quaternion, alpha, beta, gamma, orient ) {

	            euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

	            quaternion.setFromEuler( euler ); // orient the device

	            quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

	            quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

	        };

	    }();

	    this.connect = function () {

	        onScreenOrientationChangeEvent(); // run once on load

	        // iOS 13+

	        if ( window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function' ) {

	            window.DeviceOrientationEvent.requestPermission().then( function ( response ) {

	                if ( response == 'granted' ) {

	                    onRegisterEvent();

	                }

	            } ).catch( function ( error ) {

	                console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );

	            } );

	        } else {

	            onRegisterEvent();

	        }

	        scope.enabled = true;

	    };

	    this.disconnect = function () {

	        window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
	        window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

	        scope.enabled = false;
	        scope.deviceOrientation = null;
	        scope.initialOffset = null;
	        
	    };

	    this.update = function ({ theta = 0 } = { theta: 0 }) {

	        if ( scope.enabled === false ) return;

	        const device = scope.deviceOrientation;

	        if ( device ) {

	            const alpha = device.alpha ? THREE.Math.degToRad( device.alpha ) + scope.alphaOffset : 0; // Z
	            
	            const beta = device.beta ? THREE.Math.degToRad( device.beta ) : 0; // X'

	            const gamma = device.gamma ? THREE.Math.degToRad( device.gamma ) : 0; // Y''

	            const orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

	            setObjectQuaternion( scope.object.quaternion, alpha + theta, beta, gamma, orient );

	        }


	    };

	    this.dispose = function () {

	        scope.disconnect();

	    };

	    this.getAlpha = function() {

	        const { deviceOrientation: device } = scope;

	        return device && device.alpha ? THREE.Math.degToRad( device.alpha ) + scope.alphaOffset : 0;

	    };

	    this.getBeta = function() {

	        const { deviceOrientation: device } = scope;

	        return device && device.beta ? THREE.Math.degToRad( device.beta ) : 0;

	    };

	}
	DeviceOrientationControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype), {

	    constructor: DeviceOrientationControls

	} );

	/**
	 * @classdesc Google Cardboard Effect Composer
	 * @constructor
	 * @external CardboardEffect
	 * @param {THREE.WebGLRenderer} renderer 
	 */
	function CardboardEffect ( renderer ) {

	    const _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	    const _scene = new THREE.Scene();

	    const _stereo = new THREE.StereoCamera();
	    _stereo.aspect = 0.5;

	    const _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	    const _renderTarget = new THREE.WebGLRenderTarget( 512, 512, _params );
	    _renderTarget.scissorTest = true;
	    _renderTarget.texture.generateMipmaps = false;

	    /*
	     * Distortion Mesh ported from:
	     * https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js
	     */

	    const distortion = new THREE.Vector2( 0.441, 0.156 );

	    const geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 20 ).deleteAttribute( 'normal' ).toNonIndexed();

	    const positions = geometry.attributes.position.array;
	    const uvs = geometry.attributes.uv.array;

	    // duplicate
	    geometry.attributes.position.count *= 2;
	    geometry.attributes.uv.count *= 2;

	    const positions2 = new Float32Array( positions.length * 2 );
	    positions2.set( positions );
	    positions2.set( positions, positions.length );

	    const uvs2 = new Float32Array( uvs.length * 2 );
	    uvs2.set( uvs );
	    uvs2.set( uvs, uvs.length );

	    const vector = new THREE.Vector2();
	    const length = positions.length / 3;

	    for ( let i = 0, l = positions2.length / 3; i < l; i ++ ) {

	        vector.x = positions2[ i * 3 + 0 ];
	        vector.y = positions2[ i * 3 + 1 ];

	        const dot = vector.dot( vector );
	        const scalar = 1.5 + ( distortion.x + distortion.y * dot ) * dot;

	        const offset = i < length ? 0 : 1;

	        positions2[ i * 3 + 0 ] = ( vector.x / scalar ) * 1.5 - 0.5 + offset;
	        positions2[ i * 3 + 1 ] = ( vector.y / scalar ) * 3.0;

	        uvs2[ i * 2 ] = ( uvs2[ i * 2 ] + offset ) * 0.5;

	    }

	    geometry.attributes.position.array = positions2;
	    geometry.attributes.uv.array = uvs2;

	    //

	    const material = new THREE.MeshBasicMaterial( { map: _renderTarget.texture } );
	    const mesh = new THREE.Mesh( geometry, material );
	    _scene.add( mesh );

	    //

	    this.setEyeSeparation = function ( eyeSep ) {

	        _stereo.eyeSep = eyeSep;

	    };

	    this.setSize = function ( width, height ) {

	        renderer.setSize( width, height );

	        const pixelRatio = renderer.getPixelRatio();

	        _renderTarget.setSize( width * pixelRatio, height * pixelRatio );

	    };

	    this.render = function ( scene, camera, panorama ) {

	        const stereoEnabled = panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama;

	        scene.updateMatrixWorld();

	        if ( stereoEnabled ) this.setEyeSeparation( panorama.stereo.eyeSep );

	        if ( camera.parent === null ) camera.updateMatrixWorld();

	        _stereo.update( camera );

	        const width = _renderTarget.width / 2;
	        const height = _renderTarget.height;

	        if ( renderer.autoClear ) renderer.clear();

	        if ( stereoEnabled ) panorama.updateTextureToLeft();

	        _renderTarget.scissor.set( 0, 0, width, height );
	        _renderTarget.viewport.set( 0, 0, width, height );
	        renderer.setRenderTarget( _renderTarget );
	        renderer.render( scene, _stereo.cameraL );

	        renderer.clearDepth();

	        if ( stereoEnabled ) panorama.updateTextureToRight();

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

	    const _stereo = new THREE.StereoCamera();
	    _stereo.aspect = 0.5;
	    const size = new THREE.Vector2();

	    this.setEyeSeparation = function ( eyeSep ) {

	        _stereo.eyeSep = eyeSep;

	    };

	    this.setSize = function ( width, height ) {

	        renderer.setSize( width, height );

	    };

	    this.render = function ( scene, camera, panorama ) {

	        const stereoEnabled = panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama;

	        scene.updateMatrixWorld();

	        if ( camera.parent === null ) camera.updateMatrixWorld();
	        
	        if ( stereoEnabled ) this.setEyeSeparation( panorama.stereo.eyeSep );

	        _stereo.update( camera );

	        renderer.getSize( size );

	        if ( renderer.autoClear ) renderer.clear();
	        renderer.setScissorTest( true );

	        if ( stereoEnabled ) panorama.updateTextureToLeft();

	        renderer.setScissor( 0, 0, size.width / 2, size.height );
	        renderer.setViewport( 0, 0, size.width / 2, size.height );
	        renderer.render( scene, _stereo.cameraL );

	        if ( stereoEnabled ) panorama.updateTextureToRight();

	        renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
	        renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
	        renderer.render( scene, _stereo.cameraR );

	        renderer.setScissorTest( false );

	        if ( stereoEnabled ) panorama.updateTextureToLeft();

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
	 * @param {boolean} [options.enableReticle=false] - Enable reticle for mouseless interaction other than VR mode
	 * @param {number}  [options.dwellTime=1500] - Dwell time for reticle selection in ms
	 * @param {boolean} [options.autoReticleSelect=true] - Auto select a clickable target after dwellTime
	 * @param {boolean} [options.viewIndicator=false] - Adds an angle view indicator in upper left corner
	 * @param {number}  [options.indicatorSize=30] - Size of View Indicator
	 * @param {string}  [options.output=null] - Whether and where to output raycast position. Could be 'console' or 'overlay'
	 * @param {boolean} [options.autoRotate=false] - Auto rotate
	 * @param {number}  [options.autoRotateSpeed=2.0] - Auto rotate speed as in degree per second. Positive is counter-clockwise and negative is clockwise.
	 * @param {number}  [options.autoRotateActivationDuration=5000] - Duration before auto rotatation when no user interactivity in ms
	 * @param {THREE.Vector3} [options.initialLookAt=new THREE.Vector3( 0, 0, -Number.MAX_SAFE_INTEGER )] - Initial looking at vector
	 * @param {boolean} [options.momentum=true] - Use momentum even during mouse/touch move
	 * @param {number} [options.rotateSpeed=-1.0] - Drag Rotation Speed
	 * @param {number} [options.dampingFactor=.9] - Damping factor
	 * @param {number} [options.speedLimit=Number.MAX_VALUE] - Speed limit for rotation, defaults to unlimited
	 */
	function Viewer ( options = {} ) {

	    this.options = Object.assign( {

	        container: this.setupContainer( options.container ),
	        controlBar: true,
	        controlButtons: [ 'fullscreen', 'setting', 'video' ],
	        autoHideControlBar: false,
	        autoHideInfospot: true,
	        horizontalView: false,
	        clickTolerance: 10,
	        cameraFov: 60,
	        reverseDragging: false,
	        enableReticle: false,
	        dwellTime: 1500,
	        autoReticleSelect: true,
	        viewIndicator: false,
	        indicatorSize: 30,
	        output: null,
	        autoRotate: false,
	        autoRotateSpeed: 2.0,
	        autoRotateActivationDuration: 5000,
	        initialLookAt: new THREE.Vector3( 0, 0, -Number.MAX_SAFE_INTEGER ),
	        momentum: true,
	        rotateSpeed: -1.0,
	        dampingFactor: 0.9,
	        speedLimit: Number.MAX_VALUE
	    }, options );

	    const { container, cameraFov, controlBar, controlButtons, viewIndicator, indicatorSize, enableReticle, reverseDragging, output, scene, camera, renderer } = this.options;
	    const { clientWidth, clientHeight } = container;

	    this.container = container;
	    this.scene = this.setupScene( scene );
	    this.sceneReticle = new THREE.Scene();
	    this.camera = this.setupCamera( cameraFov, clientWidth / clientHeight, camera );
	    this.renderer = this.setupRenderer( renderer, container );
	    this.reticle = this.addReticle( this.camera, this.sceneReticle );
	    this.control = this.setupControls( this.camera, container );
	    this.effect = this.setupEffects( this.renderer, container );

	    this.mode = MODES.NORMAL;
	    this.panorama = null;
	    this.widget = null;
	    this.hoverObject = null;
	    this.infospot = null;
	    this.pressEntityObject = null;
	    this.pressObject = null;
	    this.raycaster = new THREE.Raycaster();
	    this.raycasterPoint = new THREE.Vector2();
	    this.userMouse = new THREE.Vector2();
	    this.updateCallbacks = [];
	    this.requestAnimationId = null;
	    this.cameraFrustum = new THREE.Frustum();
	    this.cameraViewProjectionMatrix = new THREE.Matrix4();
	    this.autoRotateRequestId = null;
	    this.outputDivElement = null;
	    this.touchSupported = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
	    this.tweenLeftAnimation = new Tween.Tween();
	    this.tweenUpAnimation = new Tween.Tween();
	    this.tweenCanvasOpacityOut = new Tween.Tween();
	    this.tweenCanvasOpacityIn = new Tween.Tween();
	    this.outputEnabled = false;
	    this.viewIndicatorSize = indicatorSize;
	    this.tempEnableReticle = enableReticle;

	    this.setupTween();

	    this.handlerMouseUp = this.onMouseUp.bind( this );
	    this.handlerMouseDown = this.onMouseDown.bind( this );
	    this.handlerMouseMove = this.onMouseMove.bind( this );
	    this.handlerWindowResize = this.onWindowResize.bind( this );
	    this.handlerKeyDown = this.onKeyDown.bind( this );
	    this.handlerKeyUp = this.onKeyUp.bind( this );
	    this.handlerTap = this.onTap.bind( this, { clientX: clientWidth / 2, clientY: clientHeight / 2 } );

	    if ( controlBar ) this.addDefaultControlBar( controlButtons );
	    if ( viewIndicator ) this.addViewIndicator();
	    if ( reverseDragging ) this.reverseDraggingDirection();
	    if ( enableReticle ) this.enableReticleControl(); else this.registerMouseAndTouchEvents(); 
	    if ( output === 'overlay' ) this.addOutputElement();

	    this.registerEventListeners();

	    this.animate.call( this );

	}
	Viewer.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	    constructor: Viewer,

	    setupScene: function ( scene = new THREE.Scene() ) {

	        return scene;

	    },

	    setupCamera: function ( cameraFov, ratio, camera = new THREE.PerspectiveCamera( cameraFov, ratio, 1, 10000 ) ) {
	        
	        camera.position.set( 0, 0, 1 );
	        return camera;

	    },

	    setupRenderer: function ( renderer = new THREE.WebGLRenderer( { alpha: true, antialias: false } ), container ) {

	        const { clientWidth, clientHeight } = container;

	        renderer.setPixelRatio( window.devicePixelRatio );
	        renderer.setSize( clientWidth, clientHeight );
	        renderer.setClearColor( 0x000000, 0 );
	        renderer.autoClear = false;
	        renderer.domElement.classList.add( 'panolens-canvas' );
	        renderer.domElement.style.display = 'block';
	        renderer.domElement.style.transition = 'opacity 0.5s ease';
	        container.style.backgroundColor = '#000';
	        container.appendChild( renderer.domElement );

	        return renderer;

	    },

	    setupControls: function ( camera, container ) {

	        const { autoRotate, autoRotateSpeed, momentum, rotateSpeed, dampingFactor, speedLimit, horizontalView } = this.options;

	        const orbit = Object.assign( new OrbitControls( camera, container ), {

	            id: 'orbit',
	            index: CONTROLS.ORBIT,
	            noPan: true,
	            minDistance: 1.0,
	            autoRotate, 
	            autoRotateSpeed, 
	            momentum, 
	            rotateSpeed, 
	            dampingFactor, 
	            speedLimit

	        } );

	        if ( horizontalView ) {

	            orbit.minPolarAngle = Math.PI / 2;
	            orbit.maxPolarAngle = Math.PI / 2;

	        }

	        const orient = Object.assign( new DeviceOrientationControls( camera ), {

	            id: 'device-orientation',
	            index: CONTROLS.DEVICEORIENTATION,
	            enabled: false

	        } );

	        this.controls = [ orbit, orient ];
	        this.OrbitControls = orbit;
	        this.DeviceOrientationControls = orient;

	        return orbit;
	 
	    },

	    setupEffects: function ( renderer, { clientWidth, clientHeight } ) {

	        const cardboard = new CardboardEffect( renderer );
	        cardboard.setSize( clientWidth, clientHeight );

	        const stereo = new StereoEffect( renderer );
	        stereo.setSize( clientWidth, clientHeight );

	        this.CardboardEffect = cardboard;
	        this.StereoEffect = stereo;

	        return cardboard;

	    },

	    setupContainer: function ( container ) {

	        if ( container ) {

	            container._width = container.clientWidth;
	            container._height = container.clientHeight;

	            return container;

	        } else {

	            const element = document.createElement( 'div' );
	            element.classList.add( EVENTS.CONTAINER );
	            element.style.width = '100%';
	            element.style.height = '100%';
	            document.body.appendChild( element );
	            
	            return element;
	            
	        }

	    },

	    setupTween: function() {

	        this.tweenCanvasOpacityOut.to({}, 500).easing(Tween.Easing.Exponential.Out);
	        this.tweenCanvasOpacityIn.to({}, 500).easing(Tween.Easing.Exponential.Out);

	        this.tweenCanvasOpacityOut.chain(this.tweenCanvasOpacityIn);

	    },

	    /**
	     * Add an object to the scene
	     * Automatically hookup with panolens-viewer-handler listener
	     * to communicate with viewer method
	     * @param {THREE.Object3D} object - The object to be added
	     * @memberOf Viewer
	     * @instance
	     */
	    add: function ( object ) {

	        const { container, scene, camera, controls, options: { initialLookAt } } = this;

	        if ( arguments.length > 1 ) {

	            for ( let i = 0; i < arguments.length; i ++ ) {

	                this.add( arguments[ i ] );

	            }

	            return this;

	        }

	        scene.add( object );

	        // All object added to scene has EVENTS.VIEWER_HANDLER event to handle viewer communication
	        if ( object.addEventListener ) {

	            object.addEventListener( EVENTS.VIEWER_HANDLER, this.eventHandler.bind( this ) );

	        }

	        if ( object instanceof Panorama ) {

	            // Dispatch viewer variables to panorama
	            object.dispatchEvent( { type: EVENTS.CONTAINER, container } );
	            object.dispatchEvent( { type: 'panolens-scene', scene } );
	            object.dispatchEvent( { type: EVENTS.CAMERA, camera } );
	            object.dispatchEvent( { type: EVENTS.CONTROLS, controls } );

	            // Hookup default panorama event listeners
	            this.addPanoramaEventListener( object );

	            if ( !this.panorama ) {

	                this.setPanorama( object );
	                this.setControlCenter( initialLookAt );

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

	            object.removeEventListener( EVENTS.VIEWER_HANDLER, this.eventHandler.bind( this ) );

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
	        widget.addEventListener( EVENTS.VIEWER_HANDLER, this.eventHandler.bind( this ) );
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
	    setPanorama: function ( ep ) {

	        const lp = this.panorama;

	        if ( ep instanceof Panorama && lp !== ep ) {

	            // Clear exisiting infospot
	            this.hideInfospot();

	            if( lp ) {

	                if( ep instanceof PanoMoment ) {

	                    const onLeaveComplete = () => {
	    
	                        lp.removeEventListener( EVENTS.LEAVE_COMPLETE, onLeaveComplete );
	                        delete lp._onLeaveComplete;
	                        if ( ep.active && ep.loaded ) ep.fadeIn();
	        
	                    };
	    
	                    lp._onLeaveComplete = onLeaveComplete;
	                    lp.addEventListener( EVENTS.LEAVE_COMPLETE, onLeaveComplete );

	                    if(lp instanceof PanoMoment) lp.onLeave();
	                }

	                if ( lp._onReady ) {

	                    lp.removeEventListener( EVENTS.READY, lp._onReady );
	                    delete lp._onReady;

	                }

	                if ( lp._onEnterFadeStart ) {

	                    lp.removeEventListener( EVENTS.ENTER_FADE_START, lp._onEnterFadeStart );
	                    delete lp._onEnterFadeStart;

	                }

	            }

	            if( ep._onLeaveComplete ) {

	                ep.removeEventListener( EVENTS.LEAVE_COMPLETE, ep._onLeaveComplete );
	                delete ep._onLeaveComplete;
	    
	            }

	            const onReady = () => {        

	                ep.removeEventListener( EVENTS.READY, onReady );
	                delete ep._onReady;

	                if( !ep.active ) return;
	                if( !(ep instanceof PanoMoment) || (ep instanceof PanoMoment && !(lp instanceof PanoMoment && lp._onLeaveComplete))) {
	                    ep.fadeIn();
	                }

	            };

	            const onEnterFadeStart = function () {

	                if ( lp && lp.active ) { lp.onLeave(); }
	                ep.removeEventListener( EVENTS.ENTER_FADE_START, onEnterFadeStart );
	                delete ep._onEnterFadeStart;

	            };

	            ep.addEventListener( EVENTS.READY, onReady );
	            ep.addEventListener( EVENTS.ENTER_FADE_START, onEnterFadeStart );
	            ep._onReady = onReady;
	            ep._onEnterFadeStart = onEnterFadeStart;

	            this.panorama = ep;

	            requestAnimationFrame(() => ep.onEnter());
				
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
	        this.dispatchEvent( { type: EVENTS.MODE_CHANGE, mode: this.mode } );

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
	        this.dispatchEvent( { type: EVENTS.MODE_CHANGE, mode: this.mode } );
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
	        pano.addEventListener( EVENTS.ENTER, this.setCameraControl.bind( this ) );

	        // Show and hide widget event only when it's VideoPanorama
	        if ( pano instanceof VideoPanorama ) {

	            pano.addEventListener( EVENTS.ENTER_FADE_START, this.showVideoWidget.bind( this ) );
	            pano.addEventListener( EVENTS.LEAVE_START, function () {

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

	        if( this.panorama ) this.OrbitControls.target.copy( this.panorama.position );

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
	     * Get raycasted point of current panorama
	     * @memberof Viewer
	     * @instance
	     * @returns {THREE.Vector3}
	     */
	    getRaycastViewCenter: function () {

	        const raycaster = new THREE.Raycaster();
	        raycaster.setFromCamera( new THREE.Vector2( 0, 0 ), this.camera );
	        const intersect = raycaster.intersectObject( this.panorama );

	        return intersect.length > 0 ? intersect[ 0 ].point : new THREE.Vector3( 0, 0, -1 );

	    },

	    /**
	     * Enable control by index
	     * @param  {CONTROLS} index - Index of camera control
	     * @memberOf Viewer
	     * @instance
	     */
	    enableControl: function ( index = CONTROLS.ORBIT ) {

	        const { control: { index: currentControlIndex }, OrbitControls, DeviceOrientationControls, container } = this;
	        const canvas = container.querySelector('canvas');

	        if( index === currentControlIndex ) {                   // ignore

	            return;

	        } else if( index === CONTROLS.DEVICEORIENTATION ) {     // device orientation

	            this.tweenCanvasOpacityOut.onStart(() => {
	                OrbitControls.enabled = false;
	                DeviceOrientationControls.enabled = false;
	                canvas.style.opacity = 0;
	            });

	            this.tweenCanvasOpacityIn.onStart(() => {
	                OrbitControls.enabled = true;
	                DeviceOrientationControls.connect();
	                canvas.style.opacity = 1;
	            });

	            this.tweenCanvasOpacityOut.start();


	        } else {

	            const { getAlpha, getBeta } = DeviceOrientationControls;
	            const alpha = -getAlpha();
	            const beta = Math.PI / 2 - getBeta();
	            const center = this.getRaycastViewCenter();

	            this.tweenCanvasOpacityOut.onStart(() => {
	                OrbitControls.enabled = false;
	                DeviceOrientationControls.disconnect();
	                canvas.style.opacity = 0;
	            });

	            this.tweenCanvasOpacityIn.onStart(function() {
	                OrbitControls.enabled = true;
	                this.rotateControlLeft(alpha);
	                this.rotateControlUp(beta);
	                this.setControlCenter(center);
	                canvas.style.opacity = 1;
	            }.bind(this));

	            this.tweenCanvasOpacityOut.start();

	        }

	        this.control = this.controls[ index ];
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
	        this.cameraFrustum.setFromProjectionMatrix( this.cameraViewProjectionMatrix );

	        return sprite.visible && this.cameraFrustum.intersectsSprite( sprite );

	    },

	    /**
	     * Reverse dragging direction
	     * @memberOf Viewer
	     * @instance
	     */
	    reverseDraggingDirection: function () {

	        console.warn('reverseDragging option is deprecated. Please use rotateSpeed to indicate strength and direction');
	        this.OrbitControls.rotateSpeed *= -1;

	    },

	    /**
	     * Add reticle 
	     * @memberOf Viewer
	     * @instance
	     */
	    addReticle: function ( camera, sceneReticle ) {

	        const reticle = new Reticle( 0xffffff, true, this.options.dwellTime );
	        reticle.hide();
	        camera.add( reticle );
	        sceneReticle.add( camera );

	        return reticle;

	    },

	    rotateControlLeft: function ( left ) {

	        this.OrbitControls.rotateLeftStatic( left );

	    },

	    rotateControlUp: function ( up ) {

	        this.OrbitControls.rotateUpStatic( up );

	    },

	    rotateOrbitControl: function ( left, up ) {

	        this.rotateControlLeft( left );
	        this.rotateControlUp( up );

	    },

	    calculateCameraDirectionDelta: function ( vector ) {

	        let ha, va, chv, cvv, hv, vv, vptc;

	        chv = this.camera.getWorldDirection( new THREE.Vector3() );
	        cvv = chv.clone();

	        vptc = this.panorama.getWorldPosition( new THREE.Vector3() ).sub( this.camera.getWorldPosition( new THREE.Vector3() ) );

	        hv = vector.clone();
	        hv.add( vptc ).normalize();
	        vv = hv.clone();

	        chv.y = 0;
	        hv.y = 0;

	        ha = Math.atan2( hv.z, hv.x ) - Math.atan2( chv.z, chv.x );
	        ha = ha > Math.PI ? ha - 2 * Math.PI : ha;
	        ha = ha < -Math.PI ? ha + 2 * Math.PI : ha;
	        va = Math.abs( cvv.angleTo( chv ) + ( cvv.y * vv.y <= 0 ? vv.angleTo( hv ) : -vv.angleTo( hv ) ) );
	        va *= vv.y < cvv.y ? 1 : -1;

	        return { left: ha, up: va };

	    },

	    /**
	     * Set control center
	     * @param {THREE.Vector3} vector - Vector to be looked at the center
	     */
	    setControlCenter: function( vector = this.options.initialLookAt ) {

	        const { left, up } = this.calculateCameraDirectionDelta( vector );
	        this.rotateOrbitControl( left, up );

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

	        if ( vector instanceof Array ) {

	            easing = vector[ 2 ];
	            duration = vector[ 1 ];
	            vector = vector[ 0 ];

	        }

	        duration = duration !== undefined ? duration : 1000;
	        easing = easing || Tween.Easing.Exponential.Out;

	        const MEPS = 10e-5;

	        const { left, up } = this.calculateCameraDirectionDelta( vector );
	        const rotateControlLeft = this.rotateControlLeft.bind( this );
	        const rotateControlUp = this.rotateControlUp.bind( this );

	        const ov = { left: 0, up: 0 };
	        const nv = { left: 0, up: 0 };

	        this.tweenLeftAnimation.stop();
	        this.tweenUpAnimation.stop();

	        this.tweenLeftAnimation = new Tween.Tween( ov )
	            .to( { left }, duration )
	            .easing( easing )
	            .onUpdate(function(ov){
	                const diff = ov.left - nv.left;
	                if( Math.abs( diff ) < MEPS ) this.tweenLeftAnimation.stop();
	                rotateControlLeft( diff );
	                nv.left = ov.left;
	            }.bind(this))
	            .start();

	        this.tweenUpAnimation = new Tween.Tween( ov )
	            .to( { up }, duration )
	            .easing( easing )
	            .onUpdate(function(ov){
	                const diff = ov.up - nv.up;
	                if( Math.abs( diff ) < MEPS ) this.tweenUpAnimation.stop();
	                rotateControlUp( diff );
	                nv.up = ov.up;
	            }.bind(this))
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

	        this.tweenControlCenter( object.getWorldPosition( new THREE.Vector3() ), duration, easing );

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

	        const expand = this.container.classList.contains( EVENTS.CONTAINER ) || this.container.isFullscreen;

	        if ( windowWidth !== undefined && windowHeight !== undefined ) {

	            width = windowWidth;
	            height = windowHeight;
	            this.container._width = windowWidth;
	            this.container._height = windowHeight;

	        } else {

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
	        this.dispatchEvent( { type: EVENTS.WIDNOW_RESIZE, width: width, height: height });
	        this.scene.traverse( function ( object ) {

	            if ( object.dispatchEvent ) {

	                object.dispatchEvent( { type: EVENTS.WIDNOW_RESIZE, width: width, height: height });

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
	            const world = this.panorama.getWorldPosition( new THREE.Vector3() );
	            point.sub( world );

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
	        if ( event.type !== 'mousedown' && this.touchSupported || this.outputEnabled ) { 

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

	            this.outputEnabled = true;

	        }

	    },

	    /**
	     * On key up
	     * @param {KeyboardEvent} event 
	     * @memberOf Viewer
	     * @instance
	     */
	    onKeyUp: function () {

	        this.outputEnabled = false;

	    },

	    /**
	     * Update control and callbacks
	     * @memberOf Viewer
	     * @instance
	     */
	    update: function () {

	        const { scene, control, OrbitControls, DeviceOrientationControls } = this;

	        // Tween Update
	        Tween.update();

	        // Callbacks Update
	        this.updateCallbacks.forEach( callback => callback() );

	        // Control Update
	        if ( OrbitControls.enabled ) OrbitControls.update();
	        if ( control === DeviceOrientationControls ) {
	            DeviceOrientationControls.update(OrbitControls.spherical.theta);
	        }

	        // Infospot Update
	        const v3 = new THREE.Vector3();

	        scene.traverse( function( child ){
	            if ( child instanceof Infospot 
	                && child.element 
	                && ( this.hoverObject === child 
	                    || child.element.style.display !== 'none' 
	                    || (child.element.left && child.element.left.style.display !== 'none')
	                    || (child.element.right && child.element.right.style.display !== 'none') ) ) {
	                if ( this.checkSpriteInViewport( child ) ) {
	                    const { x, y } = this.getScreenVector( child.getWorldPosition( v3 ) );
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
	            this.effect.render( this.scene, this.camera, this.panorama );
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

	        this.container.addEventListener( 'mousedown' , 	this.handlerMouseDown, options );
	        this.container.addEventListener( 'mousemove' , 	this.handlerMouseMove, options );
	        this.container.addEventListener( 'mouseup'	 , 	this.handlerMouseUp  , options );
	        this.container.addEventListener( 'touchstart', 	this.handlerMouseDown, options );
	        this.container.addEventListener( 'touchend'  , 	this.handlerMouseUp  , options );

	    },

	    /**
	     * Unregister mouse and touch event on container
	     * @memberOf Viewer
	     * @instance
	     */
	    unregisterMouseAndTouchEvents: function () {

	        this.container.removeEventListener( 'mousedown' ,  this.handlerMouseDown, false );
	        this.container.removeEventListener( 'mousemove' ,  this.handlerMouseMove, false );
	        this.container.removeEventListener( 'mouseup'	,  this.handlerMouseUp  , false );
	        this.container.removeEventListener( 'touchstart',  this.handlerMouseDown, false );
	        this.container.removeEventListener( 'touchend'  ,  this.handlerMouseUp  , false );

	    },

	    /**
	     * Register reticle event
	     * @memberOf Viewer
	     * @instance
	     */
	    registerReticleEvent: function () {

	        this.addUpdateCallback( this.handlerTap );

	    },

	    /**
	     * Unregister reticle event
	     * @memberOf Viewer
	     * @instance
	     */
	    unregisterReticleEvent: function () {

	        this.removeUpdateCallback( this.handlerTap );

	    },

	    /**
	     * Update reticle event
	     * @memberOf Viewer
	     * @instance
	     */
	    updateReticleEvent: function () {

	        const clientX = this.container.clientWidth / 2 + this.container.offsetLeft;
	        const clientY = this.container.clientHeight / 2;

	        this.removeUpdateCallback( this.handlerTap );
	        this.handlerTap = this.onTap.bind( this, { clientX, clientY } );
	        this.addUpdateCallback( this.handlerTap );

	    },

	    /**
	     * Register container and window listeners
	     * @memberOf Viewer
	     * @instance
	     */
	    registerEventListeners: function () {

	        // Resize Event
	        window.addEventListener( 'resize' , this.handlerWindowResize, true );

	        // Keyboard Event
	        window.addEventListener( 'keydown', this.handlerKeyDown, true );
	        window.addEventListener( 'keyup'  , this.handlerKeyUp	 , true );

	    },

	    /**
	     * Unregister container and window listeners
	     * @memberOf Viewer
	     * @instance
	     */
	    unregisterEventListeners: function () {

	        // Resize Event
	        window.removeEventListener( 'resize' , this.handlerWindowResize, true );

	        // Keyboard Event
	        window.removeEventListener( 'keydown', this.handlerKeyDown, true );
	        window.removeEventListener( 'keyup'  , this.handlerKeyUp  , true );

	    },

	    /**
	     * Dispose all scene objects and clear cache
	     * @memberOf Viewer
	     * @instance
	     */
	    dispose: function () {

	        this.disableAutoRate();

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
	        if ( THREE.Cache && THREE.Cache.enabled ) {

	            THREE.Cache.clear();

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

	        const { scene } = this;
	        const infospotDisposeMapper = infospot => infospot.toPanorama !== panorama ? infospot : infospot.dispose();

	        if ( panorama instanceof VideoPanorama ) {

	            this.hideVideoWidget();

	        }

	        // traverse the scene to find association
	        scene.traverse( object => {

	            if ( object instanceof Panorama ) {

	                object.linkedSpots = object.linkedSpots.map( infospotDisposeMapper ).filter( infospot => !!infospot );

	            }

	        } );

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
	                scope.currentPanoAngle = scope.camera.rotation.y - THREE.Math.degToRad( 90 );
	                scope.fovAngle = THREE.Math.degToRad( scope.camera.fov ) ;
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
	     * Remove item within the control bar
	     * @param {HTMLElement} item item to be removed
	     */
	    removeControlItem: function( item ) {

	        const { barElement, videoElement } = this.widget;

	        const barElements = Array.prototype.slice.call( barElement.children );
	        const videoElements = Array.prototype.slice.call( videoElement.children );

	        if ( barElements.includes( item ) ) barElement.removeChild( item );
	        if ( videoElements.includes( item ) ) videoElement.removeChild( item );

	    },

	    /**
	     * Clear all cached files
	     * @memberOf Viewer
	     * @instance
	     */
	    clearAllCache: function () {

	        THREE.Cache.clear();

	    }

	} );

	if ( THREE.REVISION != THREE_REVISION ) {

	    console.warn( `three.js version is not matched. Please consider use the target revision ${THREE_REVISION}` );

	}

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
	exports.EVENTS = EVENTS;
	exports.EmptyPanorama = EmptyPanorama;
	exports.GoogleStreetviewPanorama = GoogleStreetviewPanorama;
	exports.ImageLittlePlanet = ImageLittlePlanet;
	exports.ImageLoader = ImageLoader;
	exports.ImagePanorama = ImagePanorama;
	exports.Infospot = Infospot;
	exports.LittlePlanet = LittlePlanet;
	exports.MODES = MODES;
	exports.Media = Media;
	exports.PanoMoment = PanoMoment;
	exports.PanoMomentPanorama = PanoMomentPanorama;
	exports.PanoMomentRegular = PanoMomentRegular;
	exports.Panorama = Panorama;
	exports.REVISION = REVISION;
	exports.Reticle = Reticle;
	exports.STEREOFORMAT = STEREOFORMAT;
	exports.Stereo = Stereo;
	exports.StereoImagePanorama = StereoImagePanorama;
	exports.StereoVideoPanorama = StereoVideoPanorama;
	exports.THREE_REVISION = THREE_REVISION;
	exports.THREE_VERSION = THREE_VERSION;
	exports.TextureLoader = TextureLoader;
	exports.VERSION = VERSION;
	exports.VideoPanorama = VideoPanorama;
	exports.Viewer = Viewer;
	exports.Widget = Widget;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
