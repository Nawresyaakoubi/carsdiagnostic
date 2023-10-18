const LogIn = artifacts.require("LogIn");
const Functionss = artifacts.require("Functionss");

module.exports = function (deployer) {
  deployer.deploy(LogIn);
  deployer.deploy(Functionss);
};
