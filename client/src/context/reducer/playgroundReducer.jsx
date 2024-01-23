import { useReducer } from "react";

export const LOAD_TRAVELERCOUNT = "LOAD_TRAVELERCOUNT";
export const LOAD_TRAVELERS = "LOAD_TRAVELERS";
export const LOAD_UNREVIEWS = "LOAD_UNREVIEWS";
export const LOAD_QUEST_ID = "LOAD_QUEST_ID";
export const LOAD_QUESTS = "LOAD_QUESTS";
export const LOAD_RESPONSES = "LOAD_RESPONSES";
export const LOAD_CID = "LOAD_CID";

export const LOAD_TASKID = "LOAD_TASKID";
export const LOAD_TASKS = "LOAD_TASKS";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const LOAD_MISSIONID = "LOAD_MISSIONID";
export const LOAD_MISSIONS = "LOAD_MISSIONS";
export const ADD_MISSION = "ADD_MISSION";
export const UPDATE_MISSION = "UPDATE_MISSION";
export const DELETE_MISSION = "DELETE_MISSION";

export const playgroundInitialState = {
  // travelerCount: 0,
  // travelers: [],
  // unreviews: [],
  tasks: {},
  // taskId: 0,
  missions: {},
  quests: {},
  // missionId: 0,
  ipfs: {},
  managers: [],//pass
};

const playgroundReducer = (state, action) => {
  // console.log(state, action)

  switch (action?.type) {
    case LOAD_TRAVELERCOUNT:
      return {
        ...state,
        travelerCount: action?.payload
      };
    case LOAD_TRAVELERS:
      return {
        ...state,
        travelers: action?.payload
      };
    case LOAD_UNREVIEWS:
      return {
        ...state,
        unreviews: action?.payload
      };
    case LOAD_QUEST_ID:
      return {
        ...state,
        questId: action?.payload
      };
    case LOAD_QUESTS:
      return {
        ...state,
        quests: action?.payload
      };
    case LOAD_RESPONSES:
      return {
        ...state,
        responses: action?.payload
      };
    case LOAD_CID:
      return {
        ...state,
        ipfs: { ...state.ipfs, ...action?.payload },
      }
    case LOAD_TASKID:
      return {
        ...state,
        taskId: action?.payload
      };
    case LOAD_MISSIONID:
      return {
        ...state,
        missionId: action?.payload
      };
    case LOAD_TASKS:
      return {
        ...state,
        tasks: action?.payload
        // ...action?.payload
      };
    case LOAD_MISSIONS:
      return {
        ...state,
        missions: action?.payload
        // ...action?.payload
      };
    default:
      return state;
  }
};

export default () => {
  const [playground, playgroundDispatch] = useReducer(
    playgroundReducer,
    playgroundInitialState
  );
  return [playground, playgroundDispatch];
};
