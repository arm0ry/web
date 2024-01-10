require("dotenv").config();

const Quest_abi = require("../client/src/contract/Quest.json");

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
  address: "0xDCa81BF85B8A305A1Eb66BeD401D7ceA138e47dd",
  abi: Quest_abi,
};

const questInstance = new ethers.Contract(Quest.address, Quest.abi, signer)

// const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

async function sponsored_start(username, salt, missions, missionId) {
  // console.log(username, salt, missions, missionId);
  const currentGasPrice = await provider.getGasPrice();
  const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
  const iface = new ethers.utils.Interface(Quest.abi);
  const data = iface.encodeFunctionData("sponsoredStart", [username, salt, missions, missionId])
  // const data = await questInstance.sponsoredStart(username, salt, missions, missionId);

  const sendTokenTx = {
    from: ACCOUNT,
    to: questInstance.address,
    nonce: provider.getTransactionCount(ACCOUNT, "latest"),
    data: data,
    gasLimit: ethers.utils.hexlify(300000), // 21000
    gasPrice: gas_price,
  };

  const txResponse = await signer.sendTransaction(sendTokenTx);


  // console.log(`Transaction signed and sent: ${txResponse}`);

  return txResponse
}

module.exports = sponsored_start;
