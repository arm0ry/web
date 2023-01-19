import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ethers } from "ethers";
import { getContract } from "@wagmi/core";
import { useNavigate } from "react-router-dom";

import { Arm0ryMissions, RPC } from "../contract";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  //*

  useEffect(async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
    const contract = getContract({
      ...Arm0ryMissions,
      signerOrProvider: provider,
    });
    const _taskId = await contract.taskId();
    // console.log({aaa:_taskId});
    //   [...Array(_taskId)].map((_, i) => {
    //     return <TaskCard key={i} taskId={i + 1} />;
    //   });
    // setDetails({
    //   ...JSON.parse(tasksdata.details),
    //   xp: tasksdata.xp,
    //   expiration: tasksdata.expiration,
    // });

    const data = await Promise.all(
      [...Array(_taskId)].map(async (_,id) => 
        await contract.tasks(id+1)
      )
    );
    
    // console.log({data})
    setTasks(data)
  }, []);

  //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //* Handle error messages
  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.reason
        ?.slice("execution reverted: ".length)
        .slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: "failure",
          message: parsedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        showAlert,
        setShowAlert,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
