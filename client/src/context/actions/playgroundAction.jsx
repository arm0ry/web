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
import { pushAlert } from "@context/actions/alertAction";
import {
  Arm0ryMissions_contract,
  Arm0ryTravelers_contract,
  Arm0ryQuests_contract,
  isApproved,
} from "@utils/contract";
import { fetchIpfsCID } from "@utils/ipfs";
import { taskReadyForReviewList } from "@utils/contract";

export const loadTasksData = async () => {
  try {
    const _taskId = await Arm0ryMissions_contract.taskId();
    dispatch.fn({
      type: LOAD_TASKID,
      payload: _taskId,
    });

    if (_taskId <= 0) return;

    let _tasks = {};

    await Promise.all(
      [...Array(_taskId)].map(async (_, _id) => {
        const id = _id + 1;
        const _task = await Arm0ryMissions_contract.tasks(id);
        _tasks[id] = { ..._task, content: "" };
      })
    );

    dispatch.fn({
      type: LOAD_TASKS,
      payload: _tasks,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};
export const loadMissionsData = async (playground) => {
  try {
    const _missionId = await Arm0ryMissions_contract.missionId();
    dispatch.fn({
      type: LOAD_MISSIONID,
      payload: _missionId,
    });

    if (_missionId <= 0) return;

    let _missions = {};

    await Promise.all(
      [...Array(_missionId)].map(async (_, _id) => {
        const id = _id + 1;
        // const _mission = await Arm0ryMissions_contract.missions(id);
        const _mission = await Arm0ryMissions_contract.getMission(id);
        const _completionsCount =
          await Arm0ryQuests_contract.getMissionCompletionsCount(id);
        const _impact = await Arm0ryQuests_contract.getMissionImpact(id);
        loadIPFS(_mission[3], playground);

        // console.log("_missions", {..._missions,info: res.data.detail, taskIds: _missionsTasksId} )
        _missions[id] = {
          xp: _mission[0],
          duration: _mission[1],
          taskIds: _mission[2],
          details: _mission[3],
          title: _mission[4],
          creator: _mission[5],
          fee: _mission[6],
          taskIdsLen: _mission[7],
          completionsCount: _completionsCount,
          impact: parseInt(_impact._hex),
          // info: res.data.detail,
        };
      })
    );
    dispatch.fn({
      type: LOAD_MISSIONS,
      payload: _missions,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Missions Data Error`, type: "failure" });
  }
};

export const loadTravelers = async () => {
  try {
    
  const _travelerCount = await Arm0ryTravelers_contract.travelerCount();
  const travelerCount = parseInt(_travelerCount._hex)
  dispatch.fn({
    type: LOAD_TRAVELERCOUNT,
    payload: travelerCount,
  });

  if (travelerCount <= 0) return;

  let _travelers = [];

  await Promise.all(
    [...Array(travelerCount)].map(async (_, id) => {
      const _traveler = await Arm0ryTravelers_contract.travelers(id);
      _travelers.push(_traveler);
    })
  );
  dispatch.fn({
    type: LOAD_TRAVELERS,
    payload: _travelers,
  });
  } catch (error) {
    
    console.error(error);
    pushAlert({ msg: `Loading Travelers  Error`, type: "failure" });
  }
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
