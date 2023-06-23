import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0xE56512f78fdBCeb013C96E1D853Ad6574B67e486",
  abi: Arm0ryMissions_abi,
};

export const Arm0ryTravelers = {
  address: "0xd95C2fA80Cc1e89cBFDb94be14E56bc81436DD43",
  abi: Arm0ryTravelers_abi,
};

export const Arm0ryQuests = {
  address: "0xaBE2EaAB1bF51EDFb3b84dd5084136997Ddc9e5E",
  abi: Arm0ryQuests_abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

// const goerli = "https://rpc.ankr.com/eth_goerli";
const goerli = "https://ethereum-goerli.publicnode.com";

export const RPC = { goerli };
export const zero_address = "0x0000000000000000000000000000000000000000"
