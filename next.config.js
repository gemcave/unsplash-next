require("dotenv").config();

module.exports = {
  serverRuntimeConfig: {
    api_endpoint: "https://api.unsplash.com/photos/",
  },
  env: {
    ACCESS_KEY: process.env.ACCESS_KEY,
  },
};
