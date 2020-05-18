/**
 * Equirectangular shader
 * based on three.js equirect shader
 * @author pchen66
 */

import * as THREE from 'three';

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

export { BackgroundShader };