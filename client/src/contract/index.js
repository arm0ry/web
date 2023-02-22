import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0x94b60a3090F0a4266634eBECbaaBFA0aAB7edab5",
  abi: Arm0ryMissions_abi.abi,
};

export const Arm0ryTravelers = {
  address: "0x7EaEC42AefACF9f93Dc7b845e514785F3F001789",
  abi: Arm0ryTravelers_abi.abi,
};

export const Arm0ryQuests = {
  address: "0x366398fF881322575ab5e0233482E238b4485f63",
  abi: Arm0ryQuests_abi.abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

const goerli = "https://rpc.ankr.com/eth_goerli";

export const RPC = { goerli };
