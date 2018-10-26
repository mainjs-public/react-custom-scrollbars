import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import image from 'rollup-plugin-img';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    commonjs(),
    image()
  ]
};
