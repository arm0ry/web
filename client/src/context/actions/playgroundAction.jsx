import dispatch from "../reducer";
import {
  LOAD_TRAVELERCOUNT,
  LOAD_TRAVELERS,
  LOAD_UNREVIEWS,
  LOAD_QUESTS,
  LOAD_COMMONS_QUESTS,
  LOAD_RESPONSES,
  LOAD_COMMONS_RESPONSES,
  LOAD_CID,
  LOAD_TASKS,
  LOAD_COMMONS_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  LOAD_MISSIONS,
  LOAD_COMMONS_MISSIONS,
  ADD_MISSION,
  UPDATE_MISSION,
  DELETE_MISSION,
} from "../reducer/playgroundReducer";

import { ethers } from "ethers";
import { pushAlert } from "@context/actions/alertAction";
import {
  Mission_contract,
  Quest_contract,
  Commons_Mission_contract,
  Commons_Quest_contract,
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
        const _taskTitle = await Mission_contract.getTaskTitle(id);
        const _taskDetail = await Mission_contract.getTaskDetail(id);
        const _totalTaskCompletions = await Mission_contract.getTotalTaskCompletions(id);
        // TODO: missiondId hardcoded to 1 for now
        const _totalTaskCompletionsByMission = await Mission_contract.getTotalTaskCompletionsByMission(1, id);

        _tasks[id] = {
          creator: _taskCreator,
          deadline: parseInt(_taskDeadline._hex),
          title: _taskTitle,
          content: _taskDetail,
          completions: parseInt(_totalTaskCompletions._hex),
          completionsByMission: ethers.utils.formatUnits(_totalTaskCompletionsByMission, "wei")
        };
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
export const loadMissionsData = async () => {
  try {
    const _missionId = await Mission_contract.getMissionId();
    if (_missionId <= 0) return;

    let _missions = {};

    await Promise.all(
      [...Array(parseInt(_missionId._hex))].map(async (_, _id) => {
        const id = _id + 1;
        const _missionTitle = await Mission_contract.getMissionTitle(id);
        const _missionCreator = await Mission_contract.getMissionCreator(id);
        const _missionDetail = await Mission_contract.getMissionDetail(id);
        const _missionTaskIds = await Mission_contract.getMissionTaskIds(id);
        const _missionTaskCount = await Mission_contract.getMissionTaskCount(id);
        const _missionStarts = await Mission_contract.getMissionStarts(id);
        const _missionCompletions = await Mission_contract.getMissionCompletions(id);

        const _curveInfo = await Mission_contract.getPriceCurve();
        const _curve = _curveInfo[0];
        const _curveId = parseInt(_curveInfo[1]._hex);

        const _fee = await ImpactCurves_contract.getCurvePrice(true, _curveId, 0);

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
    // dispatch.fn({
    //   type: LOAD_QUEST_ID,
    //   payload: questId, LOAD_QUESTS
    // });
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

          if (parseInt(response._hex) === 0 && feedback === '') {
            continue
          }

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

export const loadCommonsTasksData = async () => {
  try {
    const _taskId = await Commons_Mission_contract.getTaskId();
    const taskId = parseInt(_taskId._hex);
    if (taskId <= 0) return;
    let _tasks = {};

    await Promise.all(
      [...Array(taskId)].map(async (_, _id) => {
        const id = _id + 1;
        const _taskCreator = await Commons_Mission_contract.getTaskCreator(id);
        const _taskDeadline = await Commons_Mission_contract.getTaskDeadline(id);
        const _taskTitle = await Commons_Mission_contract.getTaskTitle(id);
        const _taskDetail = await Commons_Mission_contract.getTaskDetail(id);
        const _totalTaskCompletions = await Commons_Mission_contract.getTotalTaskCompletions(id);
        // TODO: missiondId hardcoded to 1 for now
        const _totalTaskCompletionsByMission = await Commons_Mission_contract.getTotalTaskCompletionsByMission(1, id);

        _tasks[id] = {
          creator: _taskCreator,
          deadline: parseInt(_taskDeadline._hex),
          title: _taskTitle,
          content: _taskDetail,
          completions: parseInt(_totalTaskCompletions._hex),
          completionsByMission: parseInt(_totalTaskCompletionsByMission._hex)
        };
      })
    );
    dispatch.fn({
      type: LOAD_COMMONS_TASKS,
      payload: _tasks,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};
export const loadCommonsMissionsData = async () => {
  try {
    const _missionId = await Commons_Mission_contract.getMissionId();
    if (_missionId <= 0) return;
    let _missions = {};
    await Promise.all(
      [...Array(parseInt(_missionId._hex))].map(async (_, _id) => {
        const id = _id + 1;
        const _missionTitle = await Commons_Mission_contract.getMissionTitle(id);
        const _missionCreator = await Commons_Mission_contract.getMissionCreator(id);
        const _missionDetail = await Commons_Mission_contract.getMissionDetail(id);
        const _missionTaskIds = await Commons_Mission_contract.getMissionTaskIds(id);
        const _missionTaskCount = await Commons_Mission_contract.getMissionTaskCount(id);
        const _missionStarts = await Commons_Mission_contract.getMissionStarts(id);
        const _missionCompletions = await Commons_Mission_contract.getMissionCompletions(id);

        // const _curveInfo = await Commons_Mission_contract.getPriceCurve();
        // const _curve = _curveInfo[0];
        // const _curveId = parseInt(_curveInfo[1]._hex);

        // const _fee = await ImpactCurves_contract.getCurvePrice(true, _curveId, 0);

        // loadIPFS(_mission[3], playground);

        _missions[id] = {
          title: _missionTitle,
          taskCount: parseInt(_missionTaskCount._hex),
          // deadline: _missionDeadline,
          taskIds: _missionTaskIds,
          details: _missionDetail,
          creator: _missionCreator,
          fee: 0,
          taskIdsLen: parseInt(_missionTaskCount._hex),
          startsCount: parseInt(_missionStarts._hex),
          completionsCount: parseInt(_missionCompletions._hex),
        };
      })
    );
    // console.log(_missions)

    dispatch.fn({
      type: LOAD_COMMONS_MISSIONS,
      payload: _missions,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Missions Data Error`, type: "failure" });
  }
};

export const loadCommonsQuests = async () => {
  try {
    const _questId = await Commons_Quest_contract.getQuestId();
    const questId = parseInt(_questId._hex);
    if (questId <= 0) return;

    let quests = {};
    const allResponses = []


    await Promise.all(
      [...Array(questId)].map(async (_, _id) => {
        const id = _id + 1;
        const quest = await Commons_Quest_contract.getQuest(id);
        const taskIds = await Commons_Mission_contract.getMissionTaskIds(quest[2])

        const responses = []

        for (let i = 0; i < taskIds.length; i++) {
          const response = await Commons_Quest_contract.getTaskResponse(id, parseInt(taskIds[i]._hex));
          const feedback = await Commons_Quest_contract.getTaskFeedback(id, parseInt(taskIds[i]._hex));
          // console.log(feedback)
          if (parseInt(response._hex) === 0 && feedback === '') {
            continue
          }
          const responseObj = {
            taskId: parseInt(taskIds[i]._hex),
            response: parseInt(response._hex),
            feedback: feedback,
            user: quest[0]
          }
          responses.push(responseObj)
          allResponses.push(responseObj)
        }
        // console.log(allResponses)

        dispatch.fn({
          type: LOAD_COMMONS_RESPONSES,
          payload: allResponses,
        });

        quests[id] = { questId: id, user: quest[0], mission: quest[1], responses: responses };
      })
    );
    dispatch.fn({
      type: LOAD_COMMONS_QUESTS,
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