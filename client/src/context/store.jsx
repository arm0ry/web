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
import dispatch, { alertReducer } from "./reducer";

const GlobalContext = createContext();
const combineDispatch =
  (...dispatches) =>
  (action) =>
    dispatches.forEach((dispatch) => dispatch(action));

export const GlobalContextProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  // const [modalPayload, set] = useState(null);
  const [travelerPass, setTravelerPass] = useState(null);
  const [isMinted, setIsMinted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasksDetail, setTasksDetail] = useState({});
  const [alerts, _alertDispatch] = alertReducer();

  if (!dispatch.isReady) {
    dispatch.isReady = true;
    // dispatch.fn = params => dispatch(params)
    dispatch.fn = combineDispatch(_alertDispatch);
    Object.freeze(dispatch);
  }
  const fetchSvgPass = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
    const contract = getContract({
      ...Arm0ryTravelers,
      signerOrProvider: provider,
    });

    let tokenId = BigNumber.from(address).toBigInt().toString(10);

    const _ownerOf = await contract.ownerOf(tokenId);
    console.log({ _ownerOf });
    if (_ownerOf === address) {
      setIsMinted(true);
      let svg = await contract.generateImage(tokenId);
      console.dir(svg)
      let blob = new Blob([svg], { type: "image/svg+xml" });
      let url = URL.createObjectURL(blob);
      setTravelerPass(url);
    }
  }, [address]);

  // const navigate = useNavigate();
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
          const _task = await contract.tasks(id + 1);
          // const res = await fetchIpfsCDI(_task.details);
          setTasksDetail((p) => {
            return { ...p, [id + 1]: "" };
          });
          return { ..._task, title: _task.title };
        })
      );
      setTasks(data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        tasksDetail,
        setTasksDetail,
        isMinted,
        travelerPass,
        setTravelerPass,
        setIsMinted,
        alerts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
