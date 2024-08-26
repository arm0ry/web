/// $LOCAL

import BULLETIN_ABI from "./playground/Bulletin.json";
import LOGGER_ABI from "./playground/Log.json";
import TOKEN_MINTER_ABI from "./playground/TokenMinter.json";
import TOKEN_CURVE_ABI from "./playground/TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./playground/TokenUriBuilder.json";
import CURRENCY_ABI from "./playground/Currency.json";


export const Bulletin = {
  address: "0x1516eA29b019D43AbF06Ce9b28a8EbB1a8e0F429",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0xa666554DAc3012849680BFE85F338A28661F8cEC",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x39a37fa0399ABa243b9C127C96d369F2d4D8b915",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x0f9cc3E6893c11ba1EcE2817725078383D97Ddd2",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0x0e86De2973f63D7aAC26a7033e0e8576A9C3577b",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Coffee = {
  address: "0x93d3afa63dBd9957E42219C4cE3FEa570Ef12daa",
  abi: CURRENCY_ABI,
};

export const Croissant = {
  address: "0x092a414d0aAd8E90a2699Af400A506E542c7E914",
  abi: CURRENCY_ABI,
};

/// Remix

import REMIX_ABI from "./remix/Remix.json";

export const Remix = {
  address: "0x696e4A33D9741aB239482B3796dC23630a1e71E3",
  abi: REMIX_ABI,
};

/// RPC

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { chiado, sepolia};
export const zero_address = "0x0000000000000000000000000000000000000000"

