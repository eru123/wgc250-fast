module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/wgc250-fast/" : "/",
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "WGCORP250";
      return args;
    });
  }
};
