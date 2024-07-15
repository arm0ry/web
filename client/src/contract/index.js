import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./TokenUriBuilder.json";
import CURRENCY_ABI from "./Currency.json";

export const Bulletin = {
  address: "0x82Aa0CBaC55618aF11104cC29761729bB237D455",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0xa61c0b3f59aCDF12a89dc57f951C95047217D7A7",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x57eAED22d70E111c8793214015352E0032c15A16",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x2BC74139e7f9989Aa0Acb0E4eFee81170ddaD1D0",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0xb10D45E3D0337cF9901e548c4CB2f3098405Fa11",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Coffee = {
  address: "0xDE5A492E017b77e450cdaC119a70B402C004937c",
  abi: CURRENCY_ABI,
};

export const Croissant = {
  address: "0x4Cf67c4EA25D45aB7B4eAe09a2cC316650D7E083",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
