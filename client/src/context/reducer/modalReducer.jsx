import { useReducer } from "react";

export const SHOW_MODAL = "SHOW_MODAL";
export const CLEAN_MODAL = "CLEAN_MODAL";

const modalInitialState = {
  title: "",
  content: {},
  callback:()=>{},
  type: -1,
  size:"lg",
  component:<></>
};
const modalReducer = (state, action) => {
  switch (action?.type) {
    case SHOW_MODAL:
      return {
        ...state,
        ...action?.payload
      };
    case CLEAN_MODAL:
      return {
        ...modalInitialState,
      };
    default:
      return state;
  }
};

export default () => {
  const [modalPayload, modalDispatch] = useReducer(modalReducer, modalInitialState);
  return [modalPayload, modalDispatch];
};
