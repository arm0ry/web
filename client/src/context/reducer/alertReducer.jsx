import { useReducer } from "react";

export const PUSH_ALERT = "PUSH_ALERT";
export const ERASE_ALERT = "ERASE_ALERT";
export const CLEAR_ALERTS = "CLEAR_ALERTS";

const alertInitialState = {
  msg: [], // {msg, type, status, id}{ msg: "Success! Minted", type: "success", status:"", id:"", uid:"7g4g" }
  show: true,
};
const alertReducer = (state, action) => {
  switch (action?.type) {
    case PUSH_ALERT:
      return {
        ...state,
        msg: [ action?.payload?.msg, ...state?.msg],
      };
    case ERASE_ALERT:
      return {
        ...state,
        msg: state?.msg?.filter((item) => item?.uid !== action?.payload?.uid),
      };
    case CLEAR_ALERTS:
      return {
        msg: [],
        show: false,
      };
    default:
      return state;
  }
};

export default () => {
  const [alerts, alertDispatch] = useReducer(alertReducer, alertInitialState);
  return [alerts, alertDispatch];
};