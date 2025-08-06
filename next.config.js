const path = require("path");

module.exports = {
  reactStrictMode: false,
  // onDemandEntries: {
  //   maxInactiveAge: 25 * 1000,
  //   pagesBufferLength: 2,
  // },

  // experimental: {

  //   largePageDataBytes: 128 * 100000,
  // },

  images: {
    minimumCacheTTL: 120,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};
