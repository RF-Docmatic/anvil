import merge from "webpack-merge";
import devConfig = require("./webpack.dev");
import prodConfig = require("./webpack.prod");
import commonConfig = require("./webpack.common");

module.exports = ({ env }: { env: "dev" | "prod" }) => {
  const envConfig = env === "dev" ? devConfig : prodConfig;

  return merge(commonConfig, envConfig);
};
