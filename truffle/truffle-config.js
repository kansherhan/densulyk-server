const path = require("path");

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "..",
    "backend/src/contracts"
  ),

  networks: {
    development: {
      host: "127.0.0.1",
      port: 6398,
      network_id: 5777,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
