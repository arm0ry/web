import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";
import Mission_abi from "./Mission.json";
import Quest_abi from "./Quest.json";
import ImpactCurves_abi from "./ImpactCurves.json";

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

export const Mission = {
  address: "0x6b598dd9dBd13f0886bBDe2a71BC0A4965c40982",
  abi: Mission_abi,
};

export const Quest = {
  address: "0xDCa81BF85B8A305A1Eb66BeD401D7ceA138e47dd",
  abi: Quest_abi,
};

// TODO: ABI WAS KALICURVE SO NEED TO UPDATE
export const ImpactCurves = {
  address: "0x13DAc5c41817b540FB86e4C004Afcf1551587b7c",
  abi: ImpactCurves_abi,
};

// const goerli = "https://rpc.ankr.com/eth_goerli";
const goerli = "https://ethereum-goerli.publicnode.com";

export const RPC = { goerli };
export const zero_address = "0x0000000000000000000000000000000000000000"
