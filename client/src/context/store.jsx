import React, { createContext, useContext, } from "react";
import { useAccount } from "wagmi";
import dispatch, { alertReducer, modalReducer, userReducer, playgroundReducer, bulletinReducer, remixReducer } from "./reducer";

const GlobalContext = createContext();
const combineDispatch =
  (...dispatches) =>
    (action) =>
      dispatches.forEach((dispatch) => dispatch(action));

export const GlobalContextProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  
  const [alerts, _alertDispatch] = alertReducer();
  const [modalPayload, _modalDispatch] = modalReducer();
  const [userInfo, _userDispatch] = userReducer();
  const [playground, _playgroundDispatch] = playgroundReducer();
  const [bulletin, _bulletinDispatch] = bulletinReducer();
  const [remix, _remixDispatch] = remixReducer();

  // * dispatch set
  if (!dispatch.isReady) {
    dispatch.isReady = true;
    console.log("dispatch isReady");
    // dispatch.fn = params => dispatch(params)
    dispatch.fn = combineDispatch(
      _alertDispatch,
      _modalDispatch,
      _userDispatch,
      _playgroundDispatch,
      _bulletinDispatch,
      _remixDispatch,
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
        remix,
        bulletin
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
