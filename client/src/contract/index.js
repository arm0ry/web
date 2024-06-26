import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./TokenUriBuilder.json";
import CURRENCY_ABI from "./Currency.json";

export const Bulletin = {
  address: "0xd7A65C912c3e29F4f4A5faD44E901111a8FAe922",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x116f3f5bF4dC657D185D68B0000262254478575E",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0xA018CCC6ED7812F15401D58D42ec7365a4Be1FD4",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x30ee06aA12C198bdA24b913822E281C90CF7b2b9",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0x39524D7eaFF8D32D22C61241c8c4221D6bC8dC35",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Coffee = {
  address: "0x2762347379c2B541a803072A2E7ACeaEEd6Eb138",
  abi: CURRENCY_ABI,
};

export const Croissant = {
  address: "0xA2A8b0A550FB3adf414238fbb5b355a0cE2565f9",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
