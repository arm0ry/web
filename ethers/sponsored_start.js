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

async function sponsored_start(username, missions, missionId) {
  const Logger = {
    address: "0x57EbaF0c83A37E685F013721329a77C1fB3eDCF7",
    abi: LOGGER_ABI,
  };

  const loggerInstance = new ethers.Contract(Logger.address, Logger.abi, signer)

  // TODO: How to cast to different types?
  // try {
  //   const user = address(uint160(uint256(ethers.utils.keccak256(abiCoder.encode(username)))));
  //   const existingUser = await quest.isPublicUser(user, missions, missionId);
  //   if (existingUser) return "Username already claimed."
  //   console.log("new user!!")
  // } catch (err) {
  //   console.error(err)
  //   return "Something went wrong."
  // }

  try {
    console.log(username, missions, missionId)
    const tx = await loggerInstance.sponsoredStart(username, missions, missionId)
    const confirmations = await tx.wait(2);
    console.log("confirmation is here", confirmations)
    return confirmations.transactionHash;

  } catch (err) {
    console.error("error", err);
    return "Something went wrong."
  }
}

module.exports = sponsored_start;
