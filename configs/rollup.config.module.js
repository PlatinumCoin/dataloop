import babel from 'rollup-plugin-babel';
import babelConfig from './babel.config';

export default {
  entry: 'index.js',
  dest: 'dataloop.module.js',
  format: 'es',
  plugins: [babel(babelConfig)]
};
