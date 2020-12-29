module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          debug: true,
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(!api.env("production") && {
      plugins: [
        "react-refresh/babel",
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
      ],
    }),
  };
};
