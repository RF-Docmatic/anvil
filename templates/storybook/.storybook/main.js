const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-ant-design",
  ],
  webpackFinal: (config) => {
    config.plugins = [new AntdDayjsWebpackPlugin(), ...config.plugins];
    return config;
  },
  reactOptions: {
    fastRefresh: true,
  },
};
