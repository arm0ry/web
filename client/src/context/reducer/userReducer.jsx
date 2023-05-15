import { useReducer } from "react";

export const USER_LOADING = "USER_LOADING";
export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNOUT = "USER_SIGNOUT";
export const GET_TRAVELER_PASS = "GET_TRAVELER_PASS";
export const CHECK_APPROVE = "CHECK_APPROVE";
export const CHECK_MANAGER = "CHECK_MANAGER";
export const GET_REVIEWER_XP = "GET_REVIEWER_XP";
export const GET_QUEST_ID = "GET_QUEST_ID";
export const GET_TRAVELER_TASK = "GET_TRAVELER_TASK";
export const GET_TRAVELER_QUESTS = "GET_TRAVELER_QUESTS";
export const UPDATE_TRAVELER_QUESTS = "UPDATE_TRAVELER_QUESTS";
// export const UPDATE_TASKS = "UPDATE_TASKS";
export const UPDATE_TRAVELER_TASK = "UPDATE_TRAVELER_TASK";

export const userInitialState = () => {
  return {
    isMinted: false,
    isApproved: false,
    inQuest: false,
    questID: undefined, //undefined
    tokenId: "",
    travelerPass: "",
    isManager: false,
    status:0,
    tasks:{},
    quests:{},
    reviewerXP:undefined
  };
};
const userReducer = (state, action) => {
  switch (action?.type) {
    case USER_LOADING:
      return {
        ...state,
        status:1
      };
    case USER_SIGNIN:
      return {
        ...state,
        // isMinted: action?.payload?.isMinted,
        // isApproved: action?.payload?.isApproved,
        // inQuest: action?.payload?.inQuest,
        // questID: action?.payload?.questID,
        // tokenId:action?.payload?.tokenId,
        // travelerPass: action?.payload?.travelerPass,
        ...action?.payload,
      };
    case GET_TRAVELER_PASS:
      return {
        ...state,
        isMinted: true,
        travelerPass: action?.payload?.travelerPass,
        // ...action?.payload
      };
    case CHECK_MANAGER:
      return {
        ...state,
        isManager: action?.payload?.isManager,
      };
    case CHECK_APPROVE:
      return {
        ...state,
        // isMinted: true,
        isApproved: action?.payload?.isApproved,
        // ...action?.payload?.isApproved
      };
    case GET_REVIEWER_XP:
      return {
        ...state,
        reviewerXP: action?.payload?.reviewerXP,
      };
    case GET_QUEST_ID:
      return {
        ...state,
        inQuest: true,
        isApproved: false,
        questID: action?.payload?.questID,
        // ...action?.payload
      };
    case GET_TRAVELER_TASK:
      return {
        ...state,
        tasks:action?.payload?.tasks,
      };
    case GET_TRAVELER_QUESTS:
      return {
        ...state,
        quests:action?.payload?.quests,
      };
    case UPDATE_TRAVELER_QUESTS:
      return {
        ...state,
        quests:{...state.quests,[action?.payload?.missionId]: action?.payload?.quest},
      };
    case UPDATE_TRAVELER_TASK:
      return {
        ...state,
        tasks:{...state.tasks,[action?.payload?.taskId]:{...state.tasks[action?.payload?.taskId], state:0} }
      };
    case USER_SIGNOUT:
      return userInitialState();
    default:
      return state;
  }
};

export default () => {
  const [userPayload, userDispatch] = useReducer(userReducer, undefined, userInitialState);
  return [userPayload, userDispatch];
};
