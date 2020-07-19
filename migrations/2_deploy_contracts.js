// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var LuckyGun = artifacts.require("./LuckyGun.sol");

module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage);
  deployer.deploy(LuckyGun);
};
