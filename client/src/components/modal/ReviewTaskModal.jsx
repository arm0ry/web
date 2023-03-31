import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAccount } from "wagmi";

import useWriteContract from "@hooks/useWriteContract";
import { Arm0ryQuests } from "@contract";

import { useGlobalContext } from "@context/store";
import { pushAlert } from "@context/actions/alertAction";
import { showModal } from "@context/actions/modalAction";
import { uploadJSON, unpinCID } from "@utils/ipfs";

import Markdown from "../Markdown";
import Spinner from "../Spinner";
import CloseModalButton from "./CloseModalButton";

const prepareData = async (types, questId, taskId, homework, address) => {
  try {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const tasks = data.tasks.map((item) => parseInt(item.value, 10));
    const ipfsCID = await uploadJSON({
      questId: questId,
      taskId: taskId,
      homework: homework,
      traveler: address,
      time: Date.now(),
    });
    console.log({ ipfsCID });
    const params = [questId, taskId, ipfsCID];
    return { ipfsCID, params };
  } catch (error) {
    if (ipfsCID) unpinCID(ipfsCID);
    throw error;
  }
};
const ReviewTaskModal = ({ modalPayload }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { playground } = useGlobalContext();
  const [detail, setDetail] = useState(undefined);
  const { traveler, taskId:rTaskId, taskHomework, questing } = modalPayload.content;
  useEffect(() => {
    loadIPFS(taskHomework, playground, () => {
      setDetail(true);
    });
  }, [taskHomework]);
  
  const { write: reviewTasks, state } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "reviewTasks",
  });
  const pass = async (data) => {
    const onSuccess = () => {
    };
    const onError = () => {
    };
    // TODO
    reviewTasks({ args: [traveler, questing, rTaskId, 1], onSuccess, onError });
  };
  return (
    <>
      <div className="flex items-start justify-between px-4 pt-4 pb-2 ">
        <button
          onClick={() => {
            window.open(
              "https://hackmd.io/"
            );
          }}
          className=" mr-2 mb-2 rounded-lg bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 px-5 py-2.5  text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-gray-300 "
        >
          Verify
        </button>

        <CloseModalButton />
      </div>

      <div className="h-[calc(100vh_-_6rem)] space-y-6 overflow-y-scroll px-6 py-4">
        <div
          className={`block h-[calc(100vh_-_14rem)] space-y-6 overflow-y-scroll  rounded-lg border-2 border-gray-400 p-6`}
        >
          {detail === undefined ? (
          <div className="w-96 flex h-full flex-col items-center justify-center">
            <Spinner
              className="h-16 w-16 border-b-4"
              pathColor="border-gray-500"
            />
            <span className="mt-3 text-lg font-medium text-gray-600">
              Fetching data from IPFS...
            </span>
          </div>
        ) : (<Markdown>{playground.ipfs[taskHomework]}</Markdown>)}
          
        </div>
        <div className="w-fulll block">
          <button
            type="button"
            onClick={pass}
            disabled={state.writeStatus > 0}
            className="x text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
          >
            {state.writeStatus === 0 && "PASS"}
            {state.writeStatus > 0 && <Spinner />}
            <div className="ml-2">
              {state.writeStatus === 1 && "Waiting for approval"}
              {state.writeStatus === 2 && "pending"}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewTaskModal;
