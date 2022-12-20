import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers"
import "@openzeppelin/hardhat-upgrades"
import "./tasks/Sequencer";

module.exports = {
  defaultNetwork: 'hardhat',
  defender: {
      apiKey: "[apiKey]",
      apiSecret: "[apiSecret]",
  },
  networks: {
      hardhat: {
          allowUnlimitedContractSize: true,
      },
      l1: {
        url: "http://localhost:9545",
        chainId: 31337,
        gas: 'auto',
        gasPrice: 'auto',
      }
  },
  solidity: {
      version: '0.8.12',
      settings: {
          optimizer: {
              enabled: true,
              runs: 1000,
          },
      }
  },
  gasReporter: {
      enabled: true,
      showMethodSig: true,
      maxMethodDiff: 10,
  },
  contractSizer: {
      alphaSort: true,
      runOnCompile: true,
      disambiguatePaths: false,
  },
  paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
  },
  abiExporter: {
      path: './abi',
      clear: true,
      spacing: 4,
  }
}