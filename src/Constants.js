import { version } from '../package.json';

/**
 * REVISION
 * @module REVISION
 * @example PANOLENS.REVISION
 * @type {string} version
 */
export const REVISION = version;

/**
 * CONTROLS
 * @module CONTROLS
 * @example PANOLENS.CONTROLS.ORBIT
 * @property {number} ORBIT 0
 * @property {number} DEVICEORIENTATION 1
 */
export const CONTROLS = { ORBIT: 0, DEVICEORIENTATION: 1 };

/**
 * MODES
 * @module MODES
 * @example PANOLENS.MODES.UNKNOWN
 * @property {number} UNKNOWN 0
 * @property {number} NORMAL 1
 * @property {number} CARDBOARD 2
 * @property {number} STEREO 3
 */
export const MODES = { UNKNOWN: 0, NORMAL: 1, CARDBOARD: 2, STEREO: 3 };