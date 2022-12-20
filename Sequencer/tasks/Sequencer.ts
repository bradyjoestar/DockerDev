import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

import { task, types } from "hardhat/config";
import { ethers } from "ethers";

const l1RpcProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545')
const amount = ethers.utils.parseEther('100')
const deposit = ethers.utils.parseEther('1')
const prvKeys = [
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
  // '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
  // '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
  // '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba'
]
const nodeIDs = [
  '0xa1095e2a5c49bf6248f6b304d2a143c747010eb975a0143bd6e6cc4982a4f122',
  '0xa7fedb1bf4cf7159730fdcfb479674718a14e9176db1d7fdab23d030d7d8adcd',
  '0xad53bc6d02a5d43d92c9fb0a5dd00fb48c411114bc2a3217d7da93c45e3de723',
  // '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
  // '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
  // '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba'
]
var wallets = new Array();

for (var i = 0; i < prvKeys.length; i++) {
  wallets.push(new ethers.Wallet(prvKeys[i], l1RpcProvider))
}

task("deploy")
  .setAction(async (taskArgs, hre) => {
      const bitAddress = String('0xd778E3b2Ab28dd5D7a46e3bCF4D6d8e6eb716B57')
      const sequencerAddress = String('0xBe0F340075060F856612d91e17cAe599dE92C745')


      const tokenFactory = await hre.ethers.getContractFactory('BitTokenERC20')
      const token = await tokenFactory.attach(bitAddress)
      const sequencerFactory = await hre.ethers.getContractFactory('Sequencer')
      const sequencer = await sequencerFactory.attach(sequencerAddress)

      for (var i = 0; i < wallets.length; i++) {
      await token.connect(wallets[i]).mint(amount)
      // console.log("balance of", wallets[i].address, "is:", await token.balanceOf(wallets[i].address))
    }

    await sequencer.initialize(token.address)
    console.log("sequencer contract owner :", await sequencer.owner())
    console.log("sequencer bit address :", await sequencer.bitToken())

    // create sequencer
    for (var i = 1; i < wallets.length; i++) {
      await token.connect(wallets[i]).approve(sequencer.address, deposit)
      await sequencer.connect(wallets[i]).createSequencer(deposit, wallets[i].address, nodeIDs[i])
    }
    await sequencer.updateSequencerLimit(100)

    await sequencer.updateScheduler(wallets[0].address)
    console.log("scheduler is :",await sequencer.scheduler())
  });

task("updateScheduler")
  .addParam("sequencer")
  .addParam("scheduler")
  .setAction(async (taskArgs, hre) => {
    const sequencerFactory = await hre.ethers.getContractFactory('Sequencer')
    const sequencer = sequencerFactory.attach(taskArgs.sequencer)
    await sequencer.updateScheduler(taskArgs.scheduler)
    console.log(await sequencer.scheduler())
  });
