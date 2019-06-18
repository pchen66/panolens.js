import test from 'ava';
import * as THREE from 'three';
import { STEREOFORMAT } from '../../../src/Constants';
import { Stereo } from '../../../src/auxiliary/Stereo';
import { EquirectShader } from '../../../src/shaders/EquirectShader';

test('Update Uniform By Format', t => {
    const stereo = new Stereo();
    const uniforms = THREE.UniformsUtils.clone( EquirectShader.uniforms );
    stereo.updateUniformByFormat( STEREOFORMAT.TAB, uniforms );
    t.true(uniforms.repeat.value.equals( new THREE.Vector2( 1.0, 0.5 ) ));
    stereo.updateUniformByFormat( STEREOFORMAT.SBS, uniforms );
    t.true(uniforms.offset.value.equals( new THREE.Vector2( 0.0, 0.0 ) ));
    stereo.updateUniformByFormat( null, uniforms );
});

test('Update Left and Right Texture', t => {
    const stereo = new Stereo();
    const offset = new THREE.Vector2( 1.0, 0.5 );
    stereo.updateTextureToLeft( offset );
    t.true(stereo.loffset.equals( offset ));
    offset.set( 0.5, 1.0 );
    stereo.updateTextureToRight( offset );
    t.true(stereo.roffset.equals( offset ));
});
