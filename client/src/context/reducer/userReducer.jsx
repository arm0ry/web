import { useReducer } from "react";

export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNOUT = "USER_SIGNOUT";
export const MINT_PASS = "MINT_PASS";
export const APPROVE = "APPROVE";
export const START_QUEST = "START_QUEST";

export const userInitialState = {
  isMinted: false,
  isApproved: false,
  inQuest: false,
  questID: 0,//undefined
  tokenId:"",
  travelerPass: "",
  isManager: false,
};
const userReducer = (state, action) => {
  switch (action?.type) {
    case USER_SIGNIN:
      return {
        ...state,
        // isMinted: action?.payload?.isMinted,
        // isApproved: action?.payload?.isApproved,
        // inQuest: action?.payload?.inQuest,
        // questID: action?.payload?.questID,
        // tokenId:action?.payload?.tokenId,
        // travelerPass: action?.payload?.travelerPass,
        ...action?.payload
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
        questID:action?.payload?.questID
        // ...action?.payload
      };
    case USER_SIGNOUT:
      return {
        ...userInitialState,
      };
    default:
      return state;
  }
};

export default () => {
  const [userPayload, userDispatch] = useReducer(
    userReducer,
    userInitialState
  );
  return [userPayload, userDispatch];
};
