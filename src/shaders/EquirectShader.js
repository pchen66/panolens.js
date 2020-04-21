/**
 * Equirectangular shader
 * based on three.js equirect shader
 * @author pchen66
 */

import * as THREE from 'three';

/**
 * @description Equirectangular Shader
 * @module EquirectShader
 * @property {object} uniforms
 * @property {THREE.Texture} uniforms.tEquirect diffuse map
 * @property {number} uniforms.opacity image opacity
 * @property {string} vertexShader vertex shader
 * @property {string} fragmentShader fragment shader
 */
const EquirectShader = {

    uniforms: {

        'tEquirect': { value: new THREE.Texture() },
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
        uniform sampler2D tEquirect;
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
            gl_FragColor = vec4(texture2D( tEquirect, sampleUV ).rgb, opacity);
        }
    `

};

export { EquirectShader };