import BULLETIN_ABI from "./Bulletin.json";
import LOGGER_ABI from "./Log.json";
import TOKEN_MINTER_ABI from "./TokenMinter.json";
import TOKEN_CURVE_ABI from "./TokenCurve.json";
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
  address: "0x7a4FA2913B875Fb961115fA770e323FFb7D4c3aB",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x1FD2775fcb3Bf31eEf66eF6D96AFe34E68310De6",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x852310d7a78b9790B750487C88eaFabb36108211",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x52188896ebC407F7Eaf8000FA109482f37260f4e",
  abi: TOKEN_CURVE_ABI,
};

export const Currency = {
  address: "0xE0c1a5E685ca9a170bAEb4FA5a121de34aa10838",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://1rpc.io/gnosis	";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
