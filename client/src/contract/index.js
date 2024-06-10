import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
import TOKEN_URI_BUILDER_ABI from "./TokenUriBuilder.json";
import CURRENCY_ABI from "./Currency.json";

// ===================================
// g0v Use
// ===================================

// export const Mission = {
//   address: "0x9eCF21c5F83aC72f2767f2FBdAE779A022a8DD3D",
//   abi: Mission_abi,
// };

// export const Quest = {
//   address: "0x7E3425Bc90d952972F3c9E71966033Caa4F09DBC",
//   abi: Quest_abi,
// };

// export const ImpactCurves = {
//   address: "0x77463dD25fef7322f19c5eE0f8c84D308e0465Cc",
//   abi: ImpactCurves_abi,
// };

// export const HackathonSupportToken = {
//   address: "0x4D60b084C4D3b85057e454Ba43B089CE60b5cDD3",
//   abi: HackathonSupportToken_abi,
// };

// export const OnboardingSupportToken = {
//   address: "0xa0996abbE5a98D5C54aC7263c85Dd8c3DaF72e6B",
//   abi: OnboardingSupportToken_abi,
// };

// export const ParticipantSupportToken = {
//   address: "0x13555ae095f06b6d43efb96503b906aa85a4c3af",
//   abi: ParticipantSupportToken_abi,
// };


// ===================================
// Commons Use
// ===================================

export const Bulletin = {
  address: "0xdbe54c88a1dec1072aedb8322e13ede842d2de0f",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x51c86d11344861e733A5976a67486D1Bf9515221",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x83Ad8826166c23Bb7083B5403106859a4ab8C8eC",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x3081710c4f756a217E631Ad05F0b872A85e5A459",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0x76FC65cB8Ed8DE05c89f5E7ea231CD1015a14Ce0",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Currency = {
  address: "0xEE38f46bb8d2d12d10AA0c8fF82558f1b7320A0f",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://1rpc.io/gnosis	";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
