import babel from 'rollup-plugin-babel';

const babelConfig = {
  babelrc: false,
  presets: [
    ['es2015', { modules: false }]
  ],
  plugins: [
    'external-helpers'
  ]
};

export default {
  entry: 'index.js',
  dest: 'uni.js',
  format: 'cjs',
  plugins: [babel(babelConfig)]
};
