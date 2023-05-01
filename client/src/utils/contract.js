import { useAccount } from "wagmi";
import { getContract } from "@wagmi/core";
import { ethers, BigNumber } from "ethers";

import { fetchIpfsCID } from "@utils/ipfs";
import {
  Arm0ryMissions,
  Arm0ryTravelers,
  Arm0ryQuests,
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
  const _missionId = await Arm0ryMissions_contract.missionId();
  return _missionId;
};
export const fetchMissionsData = async () => {
  let _missions = {};

  const _missionId = await howManyMissions();

  await Promise.all(
    [...Array(_missionId)].map(async (_, id) => {
      const _mission = await Arm0ryMissions_contract.missions(id);
      const _missionTasksId = await Arm0ryMissions_contract.getMissionTasks(id);
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
export const isManager = async (address) => {
  const _bool = await Arm0ryMissions_contract.isManager(address);
  return _bool;
};
export const whoOwnsPass = async (tokenId) => {
  const _ownerOf = await Arm0ryTravelers_contract.ownerOf(tokenId);
  return _ownerOf;
};
export const isApproved = async (tokenId) => {
  const _isApproved = await Arm0ryTravelers_contract.getApproved(tokenId);
  if (_isApproved === Arm0ryQuests.address) {
    return true;
  } else {
    return false;
  }
};
export const fetchTravelPass = async (tokenId) => {
  const svg = await Arm0ryTravelers_contract.generateImage(tokenId);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};
export const questing = async (address) => {
  const _questID = await Arm0ryQuests_contract.questing(address);
  return _questID;
};
// export const isQuestTaskCompleted = async (address, taskId) => {
//   const _bool = await Arm0ryQuests_contract.isQuestTaskCompleted(
//     address,
//     questId,
//     taskId
//   );
//   return _bool;
// };
export const isTravelerTaskReadyForReview = async (address, taskId) => {
  const taskHomework = await Arm0ryQuests_contract.taskHomework(
    address,
    taskId
  );
  if (taskHomework == "") {
    return { _bool: false, taskHomework };
  } else {
    return { _bool: true, taskHomework };
  }
};
export const taskReviews = async (address, taskId) => {
  const _state = await Arm0ryQuests_contract.taskReviews(address, taskId);
  return _state;
};
export const taskReadyForReviewList = async (addresses, tasksId) => {
  let _taskReadyForReviewList = [];
  // {address, questId, taskId, review}review:0, 1, 2
  await Promise.all(
    addresses.map(async (add, _) => {
      const _questing = await questing(add);
      // const _questing = await questing(add);
      if (_questing > 0) {
        await Promise.all(
          [...Array(tasksId)].map(async (_, _taskId) => {
            const taskId = _taskId + 1;
            const { _bool, taskHomework } = await isTravelerTaskReadyForReview(
              add,
              taskId
            );
            const _TaskState = await taskReviews(add, taskId);
            if (_bool && _TaskState != 1) {
              _taskReadyForReviewList.push({
                traveler: add,
                taskId,
                taskHomework,
                questing: _questing,
              });
            }
          })
        );
      }
    })
  );
  _taskReadyForReviewList.sort((a, b) => a.taskId - b.taskId);
  return _taskReadyForReviewList;
};
export const travelerTaskState = async (address, tasksId) => {
  let _travelerTasksState = {};
  // {address, questId, taskId, review}review:0, 1, 2
  await Promise.all(
    [...Array(tasksId)].map(async (_, _taskId) => {
      const taskId = _taskId + 1;
      const { _bool, taskHomework } = await isTravelerTaskReadyForReview(
        address,
        taskId
      );
      const _TaskState = await taskReviews(address, taskId);
      let state = -1;
      if (_bool) {
        if (_TaskState === 1) {
          state = 1;
        } else {
          state = 0;
        }
      }
      _travelerTasksState[taskId] = { state, taskHomework };
    })
  );

  return _travelerTasksState;
};

export const travelerReviewerXP = async (address) => {
  const _reviewerXP = await Arm0ryQuests_contract.reviewerXp(address);
  return _reviewerXP;
}

export const getQuest = async (address, taskId) => {
  const Quest = await Arm0ryQuests_contract.getQuest(address, taskId);
  return Quest
}