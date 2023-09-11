require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY =
  "https://eth-goerli.g.alchemy.com/v2/FA9B2LF8mSrn3Go7uJa_N3Ne3BRqN1UV";

const GOERLI_PRIVATE_KEY =
  "ffa8ec0e66a07adcdf316ba4f7af55aa0063aa282f46d253743f66026252c671";

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
