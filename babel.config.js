const path = require('path');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'entry',
        corejs: 2,
        targets: { browsers: ['Chrome >= 49'] }
      }
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      path.resolve('./src/index.js'),
      {
        globals: {
          antd: 'antd',
          react: 'React',
          'react-dom': 'ReactDOM',
          'antd-plus': 'antd-plus'
        },
        exclude: [
          'antd-plus',
          'antd.css'
        ]
      }
    ],
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-transform-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-arrow-functions'
  ]
};
