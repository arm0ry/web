import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./TokenUriBuilder.json";
import CURRENCY_ABI from "./Currency.json";

export const Bulletin = {
  address: "0x4C0Cf8be1a962CBF8d04456944Df4F145AC6D43E",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0xac380F556159CE3e182191fdb098f0050a7B3983",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x692867c265ea899e79EeE11b2AaD92735358d311",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x70eF77feACbf75db4C1ae2A3ca09D955a7479c7C",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0xd45e095301b9d855566227c92374f3015b6d08e2",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Coffee = {
  address: "0xD303E470D3C1E1Cf5F733b7B73e9B529aD14243a",
  abi: CURRENCY_ABI,
};

export const Croissant = {
  address: "0x7023f2856ADB2103b9B11052b44190Fb92121C21",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
