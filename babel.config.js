module.exports = function (api) {
  api.cache(true);

  const presets =  ['@babel/env'];
  const plugins = ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"];

  return {
    presets,
    plugins
  };
}
