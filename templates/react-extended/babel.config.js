module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);

  const plugins = !(api.env("production") || api.env("test"))
    ? [
        "react-refresh/babel",
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
        "babel-plugin-styled-components",
        "@babel/plugin-syntax-dynamic-import",
      ]
    : [
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
        "babel-plugin-styled-components",
        "@babel/plugin-syntax-dynamic-import",
      ];
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          debug: true,
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
          targets: { node: "current" },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins,
  };
};
