require("dotenv").config();

const ACCOUNT = process.env.ARM0RY_ACCOUNT_ADDRESS;
const ACCOUNT_KEY = process.env.ARM0RY_ACCOUNT_PRIVATE_KEY;
const RPC_ENDPOINT = process.env.ARM0RY_RPC_ENDPOINT;

if (!ACCOUNT_KEY) {
  throw new Error("Account private key not provided in env file");
}

if (!RPC_ENDPOINT) {
  throw new Error("RPC endpoint not provided in env file");
}

const { ethers, Wallet } = require("ethers");


// RPC loaded from env file previously
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);


// account key loaded from env file previously
const signer = new Wallet(ACCOUNT_KEY, provider);

const Quest = {
  address: "0x4A8A96dc4e98C07f2F81cc665a810757d6652364",
  abi: Quest_abi,
};
const questInstance = new ethers.Contract({ ...Quest }, signer)

// const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

async function sponsored_start(username, salt, missions, missionId) {

  const currentGasPrice = await provider.getGasPrice();
  const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));

  const tx = await questInstance.sponsoredStart(username, salt, missions, missionId);

  console.log(`Transaction signed and sent: ${tx}`);

  return tx
}

module.exports = sponsored_start;
