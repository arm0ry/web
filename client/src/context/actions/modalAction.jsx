import dispatch from "../reducer";
import { SHOW_MODAL, CLEAN_MODAL } from "../reducer/modalReducer";

export const showModal = ({ type, ...detail }) => {
  dispatch.fn({
    type: SHOW_MODAL,
    payload: { type, ...detail },
  });
};
export const cleanModal = () => {
  dispatch.fn({
    type: CLEAN_MODAL,
  });
};
