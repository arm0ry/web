import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";
import Mission_abi from "./Mission.json";
import Quest_abi from "./Quest.json";
import ImpactCurves_abi from "./ImpactCurves.json";
import HackathonSupportToken_abi from "./HackathonSupportToken.json";
import OnboardingSupportToken_abi from "./OnboardingSupportToken.json";
import ParticipantSupportToken_abi from "./ParticipantSupportToken.json";

export const Arm0ryMissions = {
  address: "0xf3dc858aB0b39daB2E382128c20A3f1f836a39C3",
  abi: Arm0ryMissions_abi,
};

export const Arm0ryTravelers = {
  address: "0x0f71487c93274574b54af96f7b76b6669fd79568",
  abi: Arm0ryTravelers_abi,
};

export const Arm0ryQuests = {
  address: "0xf15d23DcF26011246e1C9a54AbA6dC328A754cFd",
  abi: Arm0ryQuests_abi,
};

export const KaliDAO = {
  address: "0xd758a44e66f1702c92761110dd90168f57007b8f",
  abi: KaliDAO_abi,
};

// ===================================
// g0v Use
// ===================================

export const Mission = {
  address: "0xb46Ad0Ee2FF07aaf2Dae94f228462c4DdA8B17fC",
  abi: Mission_abi,
};

export const Quest = {
  address: "0xb6d0680EC01f938A960844772bfB4f045c8b8549",
  abi: Quest_abi,
};

export const ImpactCurves = {
  address: "0x4a16D6EB4fb07cfC66bD44A8ff489fcb12a99c5C",
  abi: ImpactCurves_abi,
};

export const HackathonSupportToken = {
  address: "0x94Ac6E8DB1bD5Ba664f5157C32806EdE6780b896",
  abi: HackathonSupportToken_abi,
};

export const OnboardingSupportToken = {
  address: "0xA3fC501fD44443DceCe0101feDB104d9BA02a63C",
  abi: OnboardingSupportToken_abi,
};

export const ParticipantSupportToken = {
  address: "0x94C2aCe02Fa024f46966692bD6Eb418130662DB8",
  abi: ParticipantSupportToken_abi,
};


// ===================================
// Commons Use
// ===================================

export const Commons_Mission = {
  address: "0xE0E912de474e1293E4cfA5E1b8F2B8b53675f395",
  abi: Mission_abi,
};

export const Commons_Quest = {
  address: "0x457c82B04aE6FDb81813081E63AEB1F8A6dC56aF",
  abi: Quest_abi,
};

const goerli = "https://ethereum-goerli.publicnode.com";
const sepolia = "https://ethereum-sepolia-rpc.publicnode.com";
export const RPC = { goerli, sepolia };
export const zero_address = "0x0000000000000000000000000000000000000000"
