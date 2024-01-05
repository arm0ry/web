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

// const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

async function send_token(to_address) {
  const SEND_TOKEN_AMOUNT = "0.02";

  const currentGasPrice = await provider.getGasPrice();
  const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
  console.log(`gas_price: ${currentGasPrice}`);

  const sendTokenTx = {
    from: ACCOUNT,
    to: to_address,
    value: ethers.utils.parseEther(SEND_TOKEN_AMOUNT),
    nonce: provider.getTransactionCount(ACCOUNT, "latest"),
    gasLimit: ethers.utils.hexlify(21000), // 21000
    gasPrice: gas_price,
  };

  console.dir(sendTokenTx);
  // send transaction via signer so it's automatically signed
  const txResponse = await signer.sendTransaction(sendTokenTx);

  console.log(`Transaction signed and sent: ${txResponse.hash}`);

  return txResponse.hash
  // // wait for block
  // await txResponse.wait(1);
  // console.log(
  //   `Transaction has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
  // );
}

module.exports = send_token;
