require("dotenv").config();
const { ethers, Wallet } = require("ethers");
const LOGGER_ABI = require("../client/src/contract/playground/Log.json");

const ACCOUNT_KEY = process.env.ARM0RY_DEPLOYER_ACCOUNT_PRIVATE_KEY;
const RPC_ENDPOINT = process.env.ARM0RY_RPC_ENDPOINT;

// account key loaded from env file previously
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
const signer = new Wallet(ACCOUNT_KEY, provider);

if (!ACCOUNT_KEY) {
  throw new Error("Account private key not provided in env file");
}

if (!RPC_ENDPOINT) {
  throw new Error("RPC endpoint not provided in env file");
}

async function grant_roles(user) {
  console.log(user);

  const Logger = {
    address: "0xa666554DAc3012849680BFE85F338A28661F8cEC",
    abi: LOGGER_ABI,
  };
  
  const STAFF = 1 << 7;
  const loggerInstance = new ethers.Contract(Logger.address, Logger.abi, signer);

  try {
    const tx = await loggerInstance.grantRoles(user, STAFF)
    const confirmations = await tx.wait(2);
    console.log("confirmation is here", confirmations)
    return confirmations.transactionHash;

  } catch (err) {
    console.error("error", err);
    return "Something went wrong."
  }
}

module.exports = grant_roles;
