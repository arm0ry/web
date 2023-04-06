import { useReducer } from "react";

export const USER_LOADING = "USER_LOADING";
export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNOUT = "USER_SIGNOUT";
export const MINT_PASS = "MINT_PASS";
export const APPROVE = "APPROVE";
export const START_QUEST = "START_QUEST";
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
    case MINT_PASS:
      return {
        ...state,
        isMinted: true,
        travelerPass: action?.payload?.travelerPass,
        // ...action?.payload
      };
    case APPROVE:
      return {
        ...state,
        isMinted: true,
        isApproved: true,
        // ...action?.payload
      };
    case START_QUEST:
      return {
        ...state,
        inQuest: true,
        isApproved: false,
        questID: action?.payload?.questID,
        // ...action?.payload
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
