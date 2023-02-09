import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0x9Ed2D1EbB1F92e031f361282E91F312A11C32E3b",
  abi: Arm0ryMissions_abi.abi,
};

export const Arm0ryTravelers = {
  address: "0x39c848e6AB0CD7A59fF96Bc79E2BE6Ef7cA5F5F8",
  abi: Arm0ryTravelers_abi.abi,
};

export const Arm0ryQuests = {
  address: "0xce8620e5eBeB5d767CB689e0E9e7dDC5c1A7FB38",
  abi: Arm0ryQuests_abi.abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

const goerli = "https://rpc.ankr.com/eth_goerli";

export const RPC = { goerli };
