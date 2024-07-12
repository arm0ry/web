import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./TokenUriBuilder.json";
import CURRENCY_ABI from "./Currency.json";

export const Bulletin = {
  address: "0x394AD964417ebF10c85222D3a9bB25d478f0a623",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x9aF5A3F02Cc6aaC14e37229c89821a475162F91f",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x9C1Dcf1c2EC80E7460beE9DC8C57750c81Ef03a3",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0xF6fefF6ad83B8Ae2358E1924B69826F5D8f23044",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0xbedb26104e57d75b7d06143fdB4FC48081398129",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Coffee = {
  address: "0x4A2ac571Aa67DCf0858Baa443Eb38B73CFF89dC2",
  abi: CURRENCY_ABI,
};

export const Croissant = {
  address: "0x14a2D5C282f68B26e24B669067Af5D566e9b131a",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
