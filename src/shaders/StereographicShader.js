/**
 * Stereographic projection shader
 * based on http://notlion.github.io/streetview-stereographic
 * @author pchen66
 */

import * as THREE from 'three';

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

export { StereographicShader };