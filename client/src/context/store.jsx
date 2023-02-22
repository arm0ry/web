import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { ethers, BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { getContract } from "@wagmi/core";
import { useNavigate } from "react-router-dom";

import { fetchIpfsCDI } from "@utils/ipfs";
import { Arm0ryMissions, Arm0ryTravelers, RPC } from "@contract";
import dispatch, { alertReducer, modalReducer } from "./reducer";

const GlobalContext = createContext();
const combineDispatch =
  (...dispatches) =>
  (action) =>
    dispatches.forEach((dispatch) => dispatch(action));

export const GlobalContextProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  const [travelerPass, setTravelerPass] = useState(null);
  const [isMinted, setIsMinted] = useState(false);
  const [tasks, setTasks] = useState({});
  const [missions, setMissions] = useState({});
  const [alerts, _alertDispatch] = alertReducer();
  const [modalPayload, _modalDispatch] = modalReducer();

  // * dispatch set
  if (!dispatch.isReady) {
    dispatch.isReady = true;
    console.log("dispatch isReady")
    // dispatch.fn = params => dispatch(params)
    dispatch.fn = combineDispatch(_alertDispatch, _modalDispatch);
    Object.freeze(dispatch);
  }
  // * fetch Traveler Pass
  const fetchSvgPass = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
    const contract = getContract({
      ...Arm0ryTravelers,
      signerOrProvider: provider,
    });

    let tokenId = BigNumber.from(address).toBigInt().toString(10);

    const _ownerOf = await contract.ownerOf(tokenId);
    if (_ownerOf === address) {
      setIsMinted(true);
      let svg = await contract.generateImage(tokenId);
      let blob = new Blob([svg], { type: "image/svg+xml" });
      let url = URL.createObjectURL(blob);
      setTravelerPass(url);
    }
  }, [address]);

  // * Traveler Pass
  useEffect(() => {
    if (isConnected) {
      fetchSvgPass();
    }
  }, [isConnected]);
  useEffect(() => {
    if (isDisconnected) {
      setIsMinted(false);
      setTravelerPass(null);
    }
  }, [isDisconnected]);
  
  //* fetch missions data
  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
      const contract = getContract({
        ...Arm0ryMissions,
        signerOrProvider: provider,
      });

      const _missionId = await contract.missionId();

      await Promise.all(
        [...Array(_missionId)].map(async (_, id) => {
          const _missions = await contract.missions(id);
          const _missionsTasksId = await contract.getMissionTasks(id);
          const res = await fetchIpfsCDI(_missions.details);
          // console.log("_missions", {..._missions,info: res.data.detail, taskIds: _missionsTasksId} )
          setMissions((m) => {
            return { ...m, [id]:{..._missions,info: res.data.detail, taskIds: _missionsTasksId} };
          });
        })
      );
    };

    fetchData().catch(console.error);
  }, []);
  //* fetch tasks data
  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
      const contract = getContract({
        ...Arm0ryMissions,
        signerOrProvider: provider,
      });

      const _taskId = await contract.taskId();

      await Promise.all(
        [...Array(_taskId)].map(async (_, id) => {
          const _task = await contract.tasks(id);
          // const res = await fetchIpfsCDI(_task.details);
          setTasks((p) => {
            return { ...p, [id]:{..._task, content: ""} };
          });
        })
      );
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        missions,
        isMinted,
        travelerPass,
        setTravelerPass,
        setIsMinted,
        alerts,
        modalPayload
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
