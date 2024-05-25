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
  address: "0x3792519032d397CD6664cC865a29F5bB2f9F8C72",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x92eacC1858b07AE536129FDbDe0733457b00B548",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x14Be5A601F76941D30088D4db129B1c69f0DA5b5",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x249972ED9032599bDf10D2fA92d2eD5D1e4116aC",
  abi: TOKEN_CURVE_ABI,
};

export const Currency = {
  address: "0xd2993d2aCE4FecFBbA798262c2519bC0d007d0D8",
  abi: CURRENCY_ABI,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
export const RPC = { sepolia };
export const zero_address = "0x0000000000000000000000000000000000000000"
