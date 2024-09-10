require("dotenv").config();
const { ethers, Wallet } = require("ethers");
const CURRENCY_ABI = require("../client/src/contract/playground/Currency.json");
const TOKEN_CURVE_ABI = require("../client/src/contract/playground/TokenCurve.json");

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

async function send_currency(currency, recipient ) {
  console.log(signer.address, currency, recipient)
 
  const TokenCurve = {
    address: "0x0f9cc3E6893c11ba1EcE2817725078383D97Ddd2",
    abi: TOKEN_CURVE_ABI,
  };


  const Coffee = {
    address: "0x93d3afa63dBd9957E42219C4cE3FEa570Ef12daa",
    abi: CURRENCY_ABI,
  };

  const Croissant = {
    address: "0x092a414d0aAd8E90a2699Af400A506E542c7E914",
    abi: CURRENCY_ABI,
  };

  const coffee = new ethers.Contract(Coffee.address, Coffee.abi, signer)
  const croissant = new ethers.Contract(Croissant.address, Croissant.abi, signer)
  const SEND_TOKEN_AMOUNT = "20";

  try {
    const tx =
      (currency == "coffee") ?
        await coffee.mint(recipient, ethers.utils.parseEther(SEND_TOKEN_AMOUNT), TokenCurve.address) :
        await croissant.mint(recipient, ethers.utils.parseEther(SEND_TOKEN_AMOUNT), TokenCurve.address);

    const confirmations = await tx.wait(2);
    console.log("confirmation is here", confirmations);
    return confirmations.transactionHash;

  } catch (err) {
    console.error("error", err);
    return "Something went wrong."
  }
}

module.exports = send_currency;
