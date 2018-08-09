// var SimpleStore = artifacts.require("./SimpleStore.sol");
var DappGameCom = artifacts.require("./DappGameCom.sol");

module.exports = function(deployer) {
  deployer.deploy(DappGameCom);
};
