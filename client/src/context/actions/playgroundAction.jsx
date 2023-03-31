import dispatch from "../reducer";
import {
  LOAD_TRAVELERCOUNT,
  LOAD_TRAVELERS,
  LOAD_UNREVIEWS,
  LOAD_CID,
  LOAD_TASKS,
  LOAD_TASKID,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  LOAD_MISSIONS,
  LOAD_MISSIONID,
  ADD_MISSION,
  UPDATE_MISSION,
  DELETE_MISSION,
} from "../reducer/playgroundReducer";

import { ethers, BigNumber } from "ethers";
import {
  Arm0ryMissions,
  Arm0ryTravelers,
  Arm0ryQuests,
  zero_address,
} from "@contract";
import { Arm0ryMissions_contract, Arm0ryTravelers_contract, Arm0ryQuests_contract, isApproved } from "@utils/contract";
import { fetchIpfsCID } from "@utils/ipfs";
import { taskReadyForReviewList } from "@utils/contract";

import { useGlobalContext } from "@context/store";

export const loadTravelerCount = async () => {
  // BigInt(_hex).toString()
  const _travelerCount = await Arm0ryTravelers_contract.travelerCount();
  dispatch.fn({
    type: LOAD_TRAVELERCOUNT,
    payload: parseInt(_travelerCount._hex),
  });
};
export const loadTaskId = async (taskId) => {
  const _taskId = await Arm0ryMissions_contract.taskId();
  if (taskId !== _taskId) {
    dispatch.fn({
      type: LOAD_TASKID,
      payload: _taskId,
    });
  }
};
export const loadMissionId = async (missionId) => {
  const _missionId = await Arm0ryMissions_contract.missionId();
  if (missionId !== _missionId) {
    dispatch.fn({
      type: LOAD_MISSIONID,
      payload: _missionId,
    });
  }
};
export const loadTasks = async (_taskId) => {
  let _tasks = {};

  // const _taskId = await Arm0ryMissions_contract.taskId();
  // console.log("loadTasks", _taskId)

  await Promise.all(
    [...Array(_taskId)].map(async (_, _id) => {
      const id = _id+1
      const _task = await Arm0ryMissions_contract.tasks(id);
      // const res = await fetchIpfsCID(_task.details);
      // loadIPFS(_task.details)
      _tasks[id] = { ..._task, content: "" };
      // _tasks = {..._tasks, [id]: { ..._task, content: "" }}
    })
  );

  dispatch.fn({
    type: LOAD_TASKS,
    payload: _tasks,
  });
};
export const loadMissions = async (_missionId, playground) => {
  let _missions = {};

  // const _missionId = await Arm0ryMissions_contract.missionId();
  // TODO missionId: _missionId-1   [id] -> -1
  await Promise.all(
    [...Array(_missionId)].map(async (_, _id) => {
      const id = _id+1
      // const _mission = await Arm0ryMissions_contract.missions(id);
      const _mission = await Arm0ryMissions_contract.getMission(id);
      const _completionsCount = await Arm0ryQuests_contract.getMissionCompletionsCount(id);
      const _impact = await Arm0ryQuests_contract.getMissionImpact(id);
      loadIPFS(_mission[3], playground);

      // console.log("_missions", {..._missions,info: res.data.detail, taskIds: _missionsTasksId} )
      _missions[id] = {
        xp:_mission[0],
        duration:_mission[1],
        taskIds: _mission[2],
        details: _mission[3],
        title: _mission[4],
        creator: _mission[5],
        fee: _mission[6],
        taskIdsLen: _mission[7],
        completionsCount:_completionsCount,
        impact:parseInt(_impact._hex),
        // info: res.data.detail,
      };
    })
  );
  dispatch.fn({
    type: LOAD_MISSIONS,
    payload: _missions,
  });
};
export const loadTravelers = async (travelerCount) => {
  let _travelers = [];

  await Promise.all(
    [...Array(travelerCount)].map(async (_, id) => {
      const _traveler = await Arm0ryTravelers_contract.travelers(id);
      _travelers.push(_traveler)
    })
  );

  dispatch.fn({
    type: LOAD_TRAVELERS,
    payload: _travelers,
  });
};
export const loadUnreviews = async (travelers, taskId) => {
  // taskReadyForReviewList
  const _unreviews = await taskReadyForReviewList(travelers, taskId);
  dispatch.fn({
    type: LOAD_UNREVIEWS,
    payload: _unreviews,
  });
};
export const loadIPFS = async (CID, playground, callback = () => {}) => {

  // Do nothing if the CID is not given
  if (!CID) return;

  // If a cache exists for this url, return it
  if (playground.ipfs[CID]) {
    callback();
    return;
  }

  try {
    const response = await fetchIpfsCID(CID);
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    dispatch.fn({ type: LOAD_CID, payload: { [CID]: response.data } });
    callback();
  } catch (error) {
    console.error(error);
    dispatch.fn({ type: LOAD_CID, payload: { [CID]: response.data } });
  }
};
