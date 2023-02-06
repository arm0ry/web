import dispatch from "../reducer";
import { PUSH_ALERT, ERASE_ALERT, CLEAR_ALERTS } from "../reducer/alertReducer";

// *
export const pushAlert = ({ msg, type, status="", id="" }) => {
  const uid = ((Math.random() * 1679616) | 0).toString(36);
  dispatch.fn({
    type: PUSH_ALERT,
    payload: { msg: { msg, type, status, id, uid } },
  });
  console.log({ msg, type, status, id, uid})
  setTimeout(() => eraseAlert({ uid }), 5000);
};
// *
export const eraseAlert = ({ uid }) => {
  dispatch.fn({
    type: ERASE_ALERT,
    payload: { uid },
  });
};

// *
export const clearAlerts = () => {
  dispatch.fn({ type: CLEAR_ALERTS });
};
