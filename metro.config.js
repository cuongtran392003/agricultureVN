const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const path = require("path");
const { mergeConfig } = require("metro-config");

const config = getDefaultConfig(__dirname);

// Thêm alias cho @ -> ./src
config.resolver = config.resolver || {};
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  "@": path.resolve(__dirname, "src"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
