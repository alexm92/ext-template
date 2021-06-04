module.exports = function (api) {
  api.cache(false);

  const presets = [
    '@babel/preset-env',
  ];
  const plugins = [
    '@babel/plugin-transform-runtime', // To reuse babel helpers in order to reduce code size
    ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }]
  ];

  return {
    presets,
    plugins,
  };
};
