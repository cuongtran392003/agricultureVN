const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const path = require("path");

const config = getDefaultConfig(__dirname);

// Thêm alias cho @ -> ./src
config.resolver = config.resolver || {};
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  "@": path.resolve(__dirname, "src"),
};

// tslib 2.3.0's ESM wrapper default-imports its CommonJS helpers, which
// Metro can evaluate as undefined. ECharts and zrender pin this version.
// Resolve their helper imports through the package's CommonJS entry instead.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const origin = context.originModulePath.replace(/\\/g, "/");
  if (moduleName === "tslib" && /\/node_modules\/(echarts|zrender)\//.test(origin)) {
    const entry = require.resolve("tslib", {
      paths: [path.dirname(context.originModulePath)],
    });
    return context.resolveRequest(context, entry, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
