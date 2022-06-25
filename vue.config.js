process.env.VUE_APP_VERSION = require('./package.json').version;

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/style/_variables.scss"; @import "@/style/_mixins.scss";',
      },
    },
  },
});
