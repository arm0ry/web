import { getContract } from "@wagmi/core";
import { ethers, BigNumber } from "ethers";

import { fetchIpfsCID } from "@utils/ipfs";
import {
  Arm0ryMissions,
  Arm0ryTravelers,
  Arm0ryQuests,
  Mission,
  Quest,
  ImpactCurves,
  RPC,
  zero_address,
} from "@contract";

// Provider & Contract
export const goerli_provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
export const Arm0ryMissions_contract = getContract({
  ...Arm0ryMissions,
  signerOrProvider: goerli_provider,
});
export const Arm0ryTravelers_contract = getContract({
  ...Arm0ryTravelers,
  signerOrProvider: goerli_provider,
});
export const Arm0ryQuests_contract = getContract({
  ...Arm0ryQuests,
  signerOrProvider: goerli_provider,
});
export const Mission_contract = getContract({
  ...Mission,
  signerOrProvider: goerli_provider,
});
export const Quest_contract = getContract({
  ...Quest,
  signerOrProvider: goerli_provider,
});
export const ImpactCurves_contract = getContract({
  ...ImpactCurves,
  signerOrProvider: goerli_provider,
});

// Methods
export const howManyTasks = async () => {
  const _taskId = await Arm0ryMissions_contract.taskId();
  return _taskId;
};
export const fetchTasksData = async () => {
  let _tasks = {};

  const _taskId = await howManyTasks();

  await Promise.all(
    [...Array(_taskId)].map(async (_, id) => {
      const _task = await Arm0ryMissions_contract.tasks(id);
      // const res = await fetchIpfsCID(_task.details);
      _tasks[id] = { ..._task, content: "" };
      // _tasks = {..._tasks, [id]: { ..._task, content: "" }}
    })
  );
  return _tasks;
};
export const howManyMissions = async () => {
  const _missionId = await Mission_contract.getMissionId();
  return _missionId;
};
export const fetchMissionsData = async () => {
  let _missions = {};

  const _missionId = await howManyMissions();

  await Promise.all(
    [...Array(_missionId)].map(async (_, id) => {
      const _mission = await Mission_contract.missions(id);
      const _missionTasksId = await Mission_contract.getMissionTasks(id);
      const res = await fetchIpfsCID(_mission.details);
      // console.log("_missions", {..._missions,info: res.data.detail, taskIds: _missionsTasksId} )
      _missions[id] = {
        ..._mission,
        info: res.data.detail,
        taskIds: _missionTasksId,
      };
      // _missions = {
      //     ..._missions,
      //     [id]: {
      //       ..._mission,
      //       info: res.data.detail,
      //       taskIds: _missionTasksId,
      //     },
      //   }
    })
  );
  return _missions;
};
// export const isManager = async (address) => {
//   const _bool = await Arm0ryQuests_contract.isReviewer(address);//isReviewer
//   return _bool;
// };
// export const whoOwnsPass = async (tokenId) => {
//   const _ownerOf = await Arm0ryTravelers_contract.ownerOf(tokenId);
//   return _ownerOf;
// };
// export const isApproved = async (tokenId) => {
//   const _isApproved = await Arm0ryTravelers_contract.getApproved(tokenId);
//   if (_isApproved === Arm0ryQuests.address) {
//     return true;
//   } else {
//     return false;
//   }
// };
// export const fetchTravelPass = async (tokenId) => {
//   const svg = await Arm0ryTravelers_contract.generateImage(tokenId);
//   const blob = new Blob([svg.replace(/&(?!#?[a-z0-9]+;)/g, '&amp;')], { type: "image/svg+xml" });
//   return URL.createObjectURL(blob);
// };
// export const questing = async (address) => {
//   const _questID = await Arm0ryQuests_contract.questing(address);
//   return _questID;
// };
// export const isQuestTaskCompleted = async (address, taskId) => {
//   const _bool = await Arm0ryQuests_contract.isQuestTaskCompleted(
//     address,
//     questId,
//     taskId
//   );
//   return _bool;
// };

export const getQuest = async (address, taskId) => {
  const Quest = await Arm0ryQuests_contract.getQuest(address, taskId);
  return Quest
}
export const isQuestComeplete = async (address, taskId) => {
  // const Quest = await Arm0ryQuests_contract.getQuest(address, taskId);
  const [, , , incomplete, , ,] = await getQuest(address, taskId);
  console.log("incomplete", incomplete)
  if (incomplete != 0) {
    return false
  } else {
    return true
  }
}