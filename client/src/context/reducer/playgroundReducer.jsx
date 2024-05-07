import { useReducer } from "react";

// IPFS
export const LOAD_CID = "LOAD_CID";

// Logger
export const LOAD_LOGGER = "LOAD_LOGGER";
export const LOAD_LOGGER_TPS = "LOAD_LOGGER_TPS";
export const LOAD_RESPONSES = "LOAD_RESPONSES";

// Bulletin
export const LOAD_ITEMS = "LOAD_ITEMS";
export const LOAD_LISTS = "LOAD_LISTS";

export const playgroundInitialState = {
  logger: {},
  responses: {},
  items: {},
  lists: [],
  loggerTps: [],
  ipfs: {},
  // managers: [],//pass
};

const playgroundReducer = (state, action) => {
  // console.log(state, action)

  switch (action?.type) {
    case LOAD_ITEMS:
      return {
        ...state,
        items: action?.payload
        // ...action?.payload
      };
    case LOAD_LISTS:
      return {
        ...state,
        lists: action?.payload
        // ...action?.payload
      };
    case LOAD_LOGGER:
      return {
        ...state,
        logger: action?.payload
      };
    case LOAD_RESPONSES:
      return {
        ...state,
        responses: action?.payload
      };
    case LOAD_LOGGER_TPS:
      return {
        ...state,
        loggerTps: action?.payload
      };
    case LOAD_CID:
      return {
        ...state,
        ipfs: { ...state.ipfs, ...action?.payload },
      };
    // case LOAD_TRAVELERCOUNT:
    //   return {
    //     ...state,
    //     travelerCount: action?.payload
    //   };
    // case LOAD_TRAVELERS:
    //   return {
    //     ...state,
    //     travelers: action?.payload
    //   };
    // case LOAD_UNREVIEWS:
    //   return {
    //     ...state,
    //     unreviews: action?.payload
    //   };
    // case LOAD_QUEST_ID:
    //   return {
    //     ...state,
    //     questId: action?.payload
    //   };
    // case LOAD_QUESTS:
    //   return {
    //     ...state,
    //     quests: action?.payload
    //   };
    // case LOAD_TASKID:
    //   return {
    //     ...state,
    //     taskId: action?.payload
    //   };
    // case LOAD_MISSIONID:
    //   return {
    //     ...state,
    //     missionId: action?.payload
    //   };
    // case LOAD_TASKS:
    //   return {
    //     ...state,
    //     tasks: action?.payload
    //     // ...action?.payload
    //   };
    // case LOAD_MISSIONS:
    //   return {
    //     ...state,
    //     missions: action?.payload
    //     // ...action?.payload
    //   };
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
