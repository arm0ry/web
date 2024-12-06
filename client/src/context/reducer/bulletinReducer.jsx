import { useReducer } from "react";

// IPFS
export const LOAD_BULLETINS = "LOAD_BULLETINS";
export const LOAD_ASKS = "LOAD_ASKS";
export const LOAD_RESOURCES = "LOAD_RESOURCES";

export const bulletinInitialState = {
  bulletins: {},
  asks: {},
  resources: {}
};

const bulletinReducer = (state, action) => {
  // console.log(state, action)

  switch (action?.type) {
    case LOAD_BULLETINS:
      return {
        ...state,
        bulletins: action?.payload
      };
    case LOAD_ASKS:
      return {
        ...state,
        asks: action?.payload
        // ...action?.payload
      };
    case LOAD_RESOURCES:
      return {
        ...state,
        resources: action?.payload
        // ...action?.payload
      };
    default:
      return state;
  }
};

export default () => {
  const [bulletins, bulletinDispatch] = useReducer(
    bulletinReducer,
    bulletinInitialState
  );
  return [bulletins, bulletinDispatch];
};
