const browsers = ['last 2 versions', 'ie 11'];

export default {
  babelrc: false,
  presets: [
    ['env', { modules: false, targets: { browsers } }]
  ],
  plugins: [
    'external-helpers'
  ]
};
