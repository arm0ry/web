import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0x7dDcafCa0c7183a86fb052466b7D8484ADBD2DC3",
  abi: Arm0ryMissions_abi,
};

export const Arm0ryTravelers = {
  address: "0x03743B75c3c047031f3E8eEC47C5113406597DdD",
  abi: Arm0ryTravelers_abi,
};

export const Arm0ryQuests = {
  address: "0x9eCe9c7D5A876619737F679cFd807CB2413bc648",
  abi: Arm0ryQuests_abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

const goerli = "https://rpc.ankr.com/eth_goerli";

export const RPC = { goerli };
export const zero_address = "0x0000000000000000000000000000000000000000"
