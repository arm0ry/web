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

// TokenMinter
export const LOAD_TOKEN_MINTER = "LOAD_TOKEN_MINTER";

// TokenUriBuilder
export const LOAD_TOKEN_URIBUILDER = "LOAD_TOKEN_URIBUILDER";

// TokenCurve
export const LOAD_TOKEN_CURVE = "LOAD_TOKEN_CURVE";

// Currency
export const LOAD_CURRENCY = "LOAD_CURRENCY";

export const playgroundInitialState = {
  logger: {},
  responses: {},
  items: {},
  lists: [],
  loggerTps: [],
  minter: {},
  uriBuilder: {},
  curve: {},
  currency: {},
  ipfs: {},
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
    case LOAD_TOKEN_MINTER:
      return {
        ...state,
        minter: action?.payload
      };
    case LOAD_TOKEN_URIBUILDER:
      return {
        ...state,
        uriBuilder: action?.payload
      };
    case LOAD_TOKEN_CURVE:
      return {
        ...state,
        curve: action?.payload
      };
    case LOAD_CURRENCY:
      return {
        ...state,
        currency: action?.payload
      };
    case LOAD_CID:
      return {
        ...state,
        ipfs: { ...state.ipfs, ...action?.payload },
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
