require("dotenv").config();
const { ethers, Wallet } = require("ethers");
const OnboardingSupportToken_abi = require("../client/src/contract/OnboardingSupportToken.json");

const ACCOUNT = process.env.ARM0RY_ACCOUNT_ADDRESS;
const ACCOUNT_KEY = process.env.ARM0RY_ACCOUNT_PRIVATE_KEY;
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

async function sponsored_tally(taskId) {

  console.log(taskId)
  const OnboardingSupportToken = {
    address: "0x6656a64BB082Ca7BCda31B8D843AD498755EA7C1",
    abi: OnboardingSupportToken_abi,
  };

  const ostInstance = new ethers.Contract(OnboardingSupportToken.address, OnboardingSupportToken.abi, signer)

  try {
    const tx = await ostInstance.tally(taskId)
    const confirmations = await tx.wait(2);
    console.log("confirmation is here", confirmations)
    return confirmations.transactionHash;

  } catch (err) {
    console.error("error", err);
    return "Something went wrong."
  }
}

module.exports = sponsored_tally;
