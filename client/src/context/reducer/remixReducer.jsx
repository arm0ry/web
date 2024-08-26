import { useReducer } from "react";

export const GET_LAYER_COUNT = "LAYER_COUNT";
export const GET_ROYALTIES = "ROYALTIES";
export const GET_REMIX = "REMIX";

export const remixInitialState = () => {
    
  return {
    remix:{},
  };
}

const remixReducer = (state, action) => {
  switch (action?.type) {
    case GET_REMIX:
      return {
        ...state,
        ...action?.payload,
      };
    default:
      return state;
  }
};

export default () => {
  const [remix, remixDispatch] = useReducer(remixReducer, undefined, remixInitialState);
  return [remix, remixDispatch];
};
