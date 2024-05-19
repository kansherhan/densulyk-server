const MyContract = artifacts.require("MyContract");
const TwoFactorAuth = artifacts.require("TwoFactorAuth");

module.exports = function (deployer) {
  deployer.deploy(MyContract, "Hello, Truffle!");
  deployer.deploy(TwoFactorAuth);
};
