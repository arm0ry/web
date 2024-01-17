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
    address: "0x678B60a491d2802EcECc5c8B1d9bEa64De960a9D",
    abi: Quest_abi,
  };

  const currentGasPrice = await provider.getGasPrice();
  const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
  const iface = new ethers.utils.Interface(Quest.abi);
  const data = iface.encodeFunctionData("sponsoredStart", [username, missions, missionId])

  const sendTokenTx = {
    from: ACCOUNT,
    to: Quest.address,
    nonce: provider.getTransactionCount(ACCOUNT, "latest"),
    data: data,
    gasLimit: ethers.utils.hexlify(300000), // 21000
    gasPrice: gas_price,
  };

  const txResponse = await signer.sendTransaction(sendTokenTx);

  return txResponse
}

module.exports = sponsored_start;
