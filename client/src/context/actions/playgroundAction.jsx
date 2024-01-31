import dispatch from "../reducer";
import {
  LOAD_TRAVELERCOUNT,
  LOAD_TRAVELERS,
  LOAD_UNREVIEWS,
  LOAD_QUEST_ID,
  LOAD_QUESTS,
  LOAD_RESPONSES,
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

import { ethers } from "ethers";
import { pushAlert } from "@context/actions/alertAction";
import {
  Mission_contract,
  Quest_contract,
  ImpactCurves_contract,
} from "@utils/contract";
import { fetchIpfsCID } from "@utils/ipfs";

export const loadTasksData = async () => {
  try {
    const _taskId = await Mission_contract.getTaskId();
    const taskId = parseInt(_taskId._hex);
    // console.log(taskId)
    // dispatch.fn({
    //   type: LOAD_TASKID,
    //   payload: taskId,
    // });
    if (taskId <= 0) return;

    let _tasks = {};

    await Promise.all(
      [...Array(taskId)].map(async (_, _id) => {
        const id = _id + 1;
        const _taskCreator = await Mission_contract.getTaskCreator(id);
        const _taskDeadline = await Mission_contract.getTaskDeadline(id);
        const _taskDetail = await Mission_contract.getTaskDetail(id);
        const _totalTaskCompletions = await Mission_contract.getTotalTaskCompletions(id);
        // TODO: missiondId hardcoded to 1 for now
        const _totalTaskCompletionsByMission = await Mission_contract.getTotalTaskCompletionsByMission(1, id);
        _tasks[id] = { creator: _taskCreator, deadline: parseInt(_taskDeadline._hex), content: _taskDetail, completions: parseInt(_totalTaskCompletions._hex), completionsByMission: ethers.utils.formatUnits(_totalTaskCompletionsByMission, "wei") };
      })
    );
    // console.log(_tasks);

    dispatch.fn({
      type: LOAD_TASKS,
      payload: _tasks,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};
export const loadMissionsData = async () => {
  try {
    const _missionId = await Mission_contract.getMissionId();
    // dispatch.fn({
    //   type: LOAD_MISSIONID,
    //   payload: _missionId,
    // });

    console.log(parseInt(_missionId._hex))

    if (_missionId <= 0) return;

    let _missions = {};

    await Promise.all(
      [...Array(parseInt(_missionId._hex))].map(async (_, _id) => {
        const id = _id + 1;
        const _missionTitle = await Mission_contract.getMissionTitle(id);
        const _missionCreator = await Mission_contract.getMissionCreator(id);
        // TODO: Need to update contract first.
        // const _missionDeadline = await Mission_contract.getMissionDeadline(id);
        const _missionDetail = await Mission_contract.getMissionDetail(id);
        const _missionTaskIds = await Mission_contract.getMissionTaskIds(id);
        const _missionTaskCount = await Mission_contract.getMissionTaskCount(id);
        const _missionStarts = await Mission_contract.getMissionStarts(id);
        const _missionCompletions = await Mission_contract.getMissionCompletions(id);
        const _fee = await Mission_contract.getFee();

        // loadIPFS(_mission[3], playground);

        _missions[id] = {
          title: _missionTitle,
          taskCount: parseInt(_missionTaskCount._hex),
          // deadline: _missionDeadline,
          taskIds: _missionTaskIds,
          details: _missionDetail,
          creator: _missionCreator,
          fee: _fee,
          taskIdsLen: parseInt(_missionTaskCount._hex),
          startsCount: parseInt(_missionStarts._hex),
          completionsCount: parseInt(_missionCompletions._hex),
          // impact: parseInt(_impact._hex),
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

export const loadQuests = async () => {
  try {
    const _questId = await Quest_contract.getQuestId();
    const questId = parseInt(_questId._hex);
    // console.log(questId)
    dispatch.fn({
      type: LOAD_QUEST_ID,
      payload: questId, LOAD_QUESTS
    });
    if (questId <= 0) return;

    let quests = {};
    const allResponses = []


    await Promise.all(
      [...Array(questId)].map(async (_, _id) => {
        const id = _id + 1;
        const quest = await Quest_contract.getQuest(id);
        const taskIds = await Mission_contract.getMissionTaskIds(quest[2])
        const responses = []

        for (let i = 0; i < taskIds.length; i++) {
          const response = await Quest_contract.getTaskResponse(id, taskIds[i]);
          const feedback = await Quest_contract.getTaskFeedback(id, taskIds[i]);
          const responseObj = {
            taskId: parseInt(taskIds[i]._hex),
            response: parseInt(response._hex),
            feedback: feedback,
            user: quest[0]
          }
          responses.push(responseObj)
          allResponses.push(responseObj)
        }

        dispatch.fn({
          type: LOAD_RESPONSES,
          payload: allResponses,
        });

        quests[id] = { questId: id, user: quest[0], mission: quest[1], responses: responses };
      })
    );
    dispatch.fn({
      type: LOAD_QUESTS,
      payload: quests,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};

export const loadIPFS = async (CID, playground, callback = () => { }) => {
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