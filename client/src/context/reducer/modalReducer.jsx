// import { useReducer } from "react";

// export const SHOW_MODAL = "SHOW_MODAL";
// export const CLOSE_MODAL = "CLOSE_MODAL";

// const alertInitialState = {
//   title: "",
//   content: {},
//   callback:()=>{},
//   type: -1,
//   show: false,
// };
// const alertReducer = (state, action) => {
//   switch (action?.type) {
//     case SHOW_MODAL:
//       return {
//         ...state,
//         msg: [action?.payload?.msg, ...state?.msg],
//       };
//     case CLOSE_MODAL:
//       return {
//         ...state,
//         ...alertInitialState,
//       };
//     default:
//       return state;
//   }
// };

// export default () => {
//   const [alerts, alertDispatch] = useReducer(alertReducer, alertInitialState);
//   return [alerts, alertDispatch];
// };
