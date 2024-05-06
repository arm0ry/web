import KaliDAO_abi from "./KaliDAO.json";
import Mission_abi from "./Mission.json";
import Quest_abi from "./Quest.json";
import Bulletin_abi from "./Bulletin.json";
import Log_abi from "./Log.json";
import ImpactCurves_abi from "./ImpactCurves.json";
import ListToken_abi from "./ListToken.json";
import HackathonSupportToken_abi from "./HackathonSupportToken.json";
import OnboardingSupportToken_abi from "./OnboardingSupportToken.json";
import ParticipantSupportToken_abi from "./ParticipantSupportToken.json";

// ===================================
// g0v Use
// ===================================

export const Mission = {
  address: "0x9eCF21c5F83aC72f2767f2FBdAE779A022a8DD3D",
  abi: Mission_abi,
};

export const Quest = {
  address: "0x7E3425Bc90d952972F3c9E71966033Caa4F09DBC",
  abi: Quest_abi,
};

export const ImpactCurves = {
  address: "0x77463dD25fef7322f19c5eE0f8c84D308e0465Cc",
  abi: ImpactCurves_abi,
};

export const HackathonSupportToken = {
  address: "0x4D60b084C4D3b85057e454Ba43B089CE60b5cDD3",
  abi: HackathonSupportToken_abi,
};

export const OnboardingSupportToken = {
  address: "0xa0996abbE5a98D5C54aC7263c85Dd8c3DaF72e6B",
  abi: OnboardingSupportToken_abi,
};

export const ParticipantSupportToken = {
  address: "0x13555ae095f06b6d43efb96503b906aa85a4c3af",
  abi: ParticipantSupportToken_abi,
};


// ===================================
// Commons Use
// ===================================

export const Bulletin = {
  address: "0x1bf872b4A7D61EC57A42912671c69935154933Fd",
  abi: Bulletin_abi,
};

export const Logger = {
  address: "0x791aF9f6918148d05D06B27C9BD6D7F574A9f99C",
  abi: Log_abi,
};

export const ListToken = {
  address: "0x330049f432EDdaA559a75c89F2d63aB4b2555fC0",
  abi: ListToken_abi,
};

export const WildernessParkToken = {
  address: "0x898b5f83A34ef94130a94CB6ba19d96B078F80E1",
  abi: ListToken_abi,
};

export const NujabesToken = {
  address: "0x7095869c70943323f9B71DCde98302c27A48a397",
  abi: ListToken_abi,
};

const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
export const RPC = { sepolia };
export const zero_address = "0x0000000000000000000000000000000000000000"
