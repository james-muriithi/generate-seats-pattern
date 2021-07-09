module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/generate-seats-pattern/" : "/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Seats - Home";
      return args;
    });
  }
};
