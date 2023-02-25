import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0x93D5a1354286822566Ed3790EFC5eC5bdE97E51f",
  abi: Arm0ryMissions_abi,
};

export const Arm0ryTravelers = {
  address: "0xBD11eA24Fc663Cd8Ae2dD6A446A4CF25C7019CdD",
  abi: Arm0ryTravelers_abi,
};

export const Arm0ryQuests = {
  address: "0x8411456dD61F67EDf1056ee8aB5254CdFa47BdEF",
  abi: Arm0ryQuests_abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

const goerli = "https://rpc.ankr.com/eth_goerli";

export const RPC = { goerli };
export const zero_address = "0x0000000000000000000000000000000000000000"
