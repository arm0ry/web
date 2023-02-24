import Arm0ryMissions_abi from "./Arm0ryMissions.json";
import Arm0ryTravelers_abi from "./Arm0ryTravelers.json";
import Arm0ryQuests_abi from "./Arm0ryQuests.json";
import KaliDAO_abi from "./KaliDAO.json";

export const Arm0ryMissions = {
  address: "0x72C96Ef2203FeDff01Cb420910b115b9E1372D7A",
  abi: Arm0ryMissions_abi.abi,
};

export const Arm0ryTravelers = {
  address: "0xFA3f2AE548f33DcCF0b9B5BB1Bd6d42CcD92c876",
  abi: Arm0ryTravelers_abi.abi,
};

export const Arm0ryQuests = {
  address: "0x0E89683E80D11fFd0437394E7627aBeEB2dC6F0E",
  abi: Arm0ryQuests_abi.abi,
};

export const KaliDAO = {
  address: "0x5e3255fee519ef9b7b41339d20abf5591f393c4d",
  abi: KaliDAO_abi,
};

const goerli = "https://rpc.ankr.com/eth_goerli";

export const RPC = { goerli };
