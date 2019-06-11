import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs'
import inject from 'rollup-plugin-inject';

export default {
    external: ['three'],
    input: 'src/Panolens.js',
    output: [
        {
            format: 'umd',
            name: 'PANOLENS',
            file: 'build/panolens.js',
            indent: '\t',
            globals: {three: 'THREE'}
        },
        {
            format: 'es',
            file: 'build/panolens.module.js',
            indent: '\t'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        json({
            include: 'package.json',
            exclude: [ 'node_modules/**' ],
            preferConst: true, 
            indent: '\t',
            compact: true, 
            namedExports: true 
        }),
        inject({
            THREE: [ 'three', '*' ]
        })
    ]
};