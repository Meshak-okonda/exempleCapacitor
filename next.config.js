const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
  env: {
    URL_GRAPHQL: "http://35.176.0.228:6000/graphql",
    URL_ClOUDINARY: "https://api.cloudinary.com/v1_1/drngt0gv3/image/upload",
  },
});
