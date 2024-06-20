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
  address: "0xD57303dC51b91a0eB7838b07fB2Dc9786a897531",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0xdA56ec13c92A126dd4ccF49F2CF20CD20aB8D3dB",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x15FD8505603dfEd7072CCfeE9f228091e5a35362",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x6e23eD341BD5F3374Da90bDA05babFFb5Da9Ca17",
  abi: TOKEN_CURVE_ABI,
};

export const TokenUriBuilder = {
  address: "0xD90c8d8C311Ca3A05B01a63E7EE419913FdA8e4D",
  abi: TOKEN_URI_BUILDER_ABI,
};

export const Currency = {
  address: "0x577Af132ba0D9Ac9c5FA3Ad473e2559Ef8b2fCAd",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
const chiado = "https://rpc.chiadochain.net";
export const RPC = { sepolia, chiado };
export const zero_address = "0x0000000000000000000000000000000000000000"
