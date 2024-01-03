import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { useAccount } from "wagmi";
import dispatch, { alertReducer, modalReducer, userReducer, playgroundReducer } from "./reducer";

const GlobalContext = createContext();
const combineDispatch =
  (...dispatches) =>
    (action) =>
      dispatches.forEach((dispatch) => dispatch(action));

export const GlobalContextProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  // 
  const [tasks, setTasks] = useState({});
  const [missions, setMissions] = useState({});
  // 
  const [alerts, _alertDispatch] = alertReducer();
  const [modalPayload, _modalDispatch] = modalReducer();
  const [userInfo, _userDispatch] = userReducer();
  const [playground, _playgroundDispatch] = playgroundReducer();

  // * dispatch set
  if (!dispatch.isReady) {
    dispatch.isReady = true;
    console.log("dispatch isReady");
    // dispatch.fn = params => dispatch(params)
    dispatch.fn = combineDispatch(
      _alertDispatch,
      _modalDispatch,
      _userDispatch,
      _playgroundDispatch
    );
    Object.freeze(dispatch);
  }



  return (
    <GlobalContext.Provider
      value={{
        userInfo,
        playground,
        alerts,
        modalPayload,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
