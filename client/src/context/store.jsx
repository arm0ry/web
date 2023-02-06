import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useReducer,
} from "react";
import { ethers } from "ethers";
import { getContract } from "@wagmi/core";
import { useNavigate } from "react-router-dom";

import { Arm0ryMissions, RPC } from "../contract";
import dispatch, { alertReducer } from "./reducer";

const GlobalContext = createContext();
const combineDispatch =
  (...dispatches) =>
  (action) =>
    dispatches.forEach((dispatch) => dispatch(action));

export const GlobalContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksDetail, setTasksDetail] = useState({});
  const [alerts, _alertDispatch] = alertReducer();

  if (!dispatch.isReady) {
    dispatch.isReady = true;
    // dispatch.fn = params => dispatch(params)
    dispatch.fn = combineDispatch(_alertDispatch);
    Object.freeze(dispatch);
  }

  const navigate = useNavigate();

  //*

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
      const contract = getContract({
        ...Arm0ryMissions,
        signerOrProvider: provider,
      });

      const _taskId = await contract.taskId();

      const data = await Promise.all(
        [...Array(_taskId)].map(async (_, id) => {
          setTasksDetail((p) => {
            return { ...p, [id + 1]: "" };
          });
          return await contract.tasks(id + 1);
        })
      );
      setTasks(data);
    };

    fetchData().catch(console.error);;
    
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        tasksDetail,
        setTasksDetail,
        alerts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
