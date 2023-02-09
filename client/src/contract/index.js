import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0xF8F7c70Fc378474e1C2DF6b11ac4B7480c6fF9Bf",
  abi: Arm0ryMissions_abi.abi,
};

export const Arm0ryTravelers = {
  address: "0xA3d8E3Ffaa461A420616D55732603bC64264EAC6",
  abi: Arm0ryTravelers_abi.abi,
};

export const Arm0ryQuests = {
  address: "0x975bA0E4a1A77854901e7c1ca4F61d8e470a8A4f",
  abi: Arm0ryQuests_abi.abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

const goerli = "https://rpc.ankr.com/eth_goerli";

export const RPC = { goerli };
