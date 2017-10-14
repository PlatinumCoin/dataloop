import babel from 'rollup-plugin-babel';
import babelConfig from './babel.config';

export default {
  entry: 'index.js',
  dest: 'dataloop.js',
  format: 'cjs',
  plugins: [babel(babelConfig)]
};
