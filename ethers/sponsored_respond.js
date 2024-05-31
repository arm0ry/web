require("dotenv").config();
const { ethers, Wallet } = require("ethers");
const LOGGER_ABI = require("../client/src/contract/Log.json");

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

async function sponsored_respond(username, missions, missionId, taskId, response, feedback) {
  console.log(username, missionId, taskId, response, feedback)

  const Logger = {
    address: "0x57EbaF0c83A37E685F013721329a77C1fB3eDCF7",
    abi: LOGGER_ABI,
  };

  const loggerInstance = new ethers.Contract(Logger.address, Logger.abi, signer)

  try {
    const tx = await loggerInstance.sponsoredRespond(username, missions, missionId, taskId, response, feedback)
    const confirmations = await tx.wait(2);
    console.log("confirmation is here", confirmations)
    return confirmations.transactionHash;

  } catch (err) {
    console.error("error", err);
    return "Something went wrong."
  }
}

module.exports = sponsored_respond;
