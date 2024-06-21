import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./TokenUriBuilder.json";
import CURRENCY_ABI from "./Currency.json";

export const Bulletin = {
  address: "0x4FD531fFD8c3706F6D3D1DFd081703E35987148f",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x0857192c622f7c5868FC0f8a4dC7062b4175c0c9",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0xeb6787F750400EEac61B4f952DE7656Be205a7A3",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x42D191481046aFcA1934C29DC554B7Cd050dbB87",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0x0C1Ec3fEdCBb08DBE911720a98BCEAf0Bd9fF334",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Coffee = {
  address: "0xA1eB9702cEc88Cb414e44d2ed6851841884A0b14",
  abi: CURRENCY_ABI,
};

export const Croissant = {
  address: "0xC91D4FCfEa388Af5283fE5b6AbE0099562C9Ae63",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
