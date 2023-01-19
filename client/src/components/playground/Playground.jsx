import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import { useContractRead, useAccount, useProvider } from "wagmi";
import { getContract } from "@wagmi/core";
import { Arm0ryMissions } from "../../contract";

import WalletBar from "../WalletBar";
import TaskCard from "./TaskCard";

// const svg = avatar.toString();

const Playground = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [taskId, setTaskId] = useState(0);
  // const provider = useProvider()

  const RPC = "https://rpc.ankr.com/eth_goerli";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const contract = getContract({
    ...Arm0ryMissions,
    signerOrProvider: provider,
  });
  (async () => {
    const _taskId = await contract.taskId();
    setTaskId(_taskId);
  })();
  // console.log({ dc, provider });
  // const {
  //   data: taskIDdata,
  //   isError,
  //   isSuccess,
  //   isLoading,
  // } = useContractRead({
  //   ...Arm0ryMissions,
  //   functionName: "taskId",
  // });

  return (
    <>
      <div className="container">
        <WalletBar />
        {/* <p>{dc}</p> */}
        <div className="flex flex-col gap-3">
          {/* {isConnected &&
            } */}
            {[...Array(taskId)].map((_, i) => {
              return <TaskCard key={i} taskId={i + 1} />;
            })}
        </div>
        <button
          type="button"
          onClick={() => navigate("/playground/proposeTask")}
          className=" transition duration-300 ease-in-out w-fit text-gray bg-yellow-200 hover:ring-4 hover:ring-yellow-200 focus:ring-2 rounded-lg text-base  px-3 py-2 mt-3 text-center"
        >
          Propose Task
        </button>
      </div>
    </>
  );
};

export default Playground;
