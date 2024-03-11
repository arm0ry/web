require("dotenv").config();
const { ethers, Wallet } = require("ethers");
const Quest_abi = require("../client/src/contract/Quest.json");

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
  const Quest = {
    address: "0x457c82B04aE6FDb81813081E63AEB1F8A6dC56aF",
    abi: Quest_abi,
  };

  const questInstance = new ethers.Contract(Quest.address, Quest.abi, signer)

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
    const tx = await questInstance.sponsoredStart(username, missions, missionId)
    const confirmations = await tx.wait(2);
    console.log("confirmation is here", confirmations)
    return confirmations.transactionHash;

  } catch (err) {
    console.error("error", err);
    return "Something went wrong."
  }
}

module.exports = sponsored_start;
