import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAccount } from "wagmi";

import useWriteContract from "@hooks/useWriteContract";
import { Arm0ryQuests } from "@contract";

import { loadIPFS, loadUnreviews } from "@context/actions/playgroundAction";
import { useGlobalContext } from "@context/store";
import { pushAlert } from "@context/actions/alertAction";
import { showModal, cleanModal } from "@context/actions/modalAction";
import {  unpinCID } from "@utils/ipfs";

import Markdown from "../Markdown";
import Spinner from "../Spinner";
import CloseModalButton from "./CloseModalButton";

const ReviewTaskModal = ({ modalPayload }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { playground } = useGlobalContext();
  const [detail, setDetail] = useState(undefined);
  const {
    traveler,
    taskId: rTaskId,
    taskHomework,
    questing,
  } = modalPayload.content;
  useEffect(() => {
    loadIPFS(taskHomework, playground, () => {
      setDetail(true);
    });
  }, [taskHomework]);

  const { write: reviewTasks, state } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "reviewTasks",
  });

  const pass = async () => {
    const onSuccess = () => {
      cleanModal();
      loadUnreviews(playground.travelers, playground.taskId);
      unpinCID(taskHomework);
    };
    const onError = () => {
      cleanModal();
      loadUnreviews(playground.travelers, playground.taskId);
    };
    // TODO
    reviewTasks({
      args: [traveler, questing, rTaskId, 1, 0],
      onSuccess,
      onError,
    });
  };
  return (
    <>
      <div className="flex items-start justify-between px-4 pt-4 pb-2 ">
        {/* <button
          onClick={() => {
            window.open("https://hackmd.io/");
          }}
          className=" mr-2 mb-2 rounded-lg bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 px-5 py-2.5  text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-gray-300 "
        >
          Verify
        </button> */}

        <CloseModalButton />
      </div>

      <div className="h-[calc(88vh_-_6rem)] space-y-6 overflow-y-scroll px-6 py-4 md:h-[calc(95vh_-_6rem)]">
        <div
          className={`block h-[calc(88vh_-_14rem)] space-y-6 overflow-y-scroll  rounded-lg border-2 border-gray-400 px-6 pb-6 md:h-[calc(95vh_-_14rem)]`}
        >
          { detail === undefined? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Spinner
                className="h-16 w-16 border-b-4"
                pathColor="border-gray-500"
              />
              <span className="mt-3 text-lg font-medium text-gray-600">
                Fetching data from IPFS...
              </span>
            </div>
          ) : (
            <Markdown>{playground.ipfs[taskHomework].homework}</Markdown>
          )}
        </div>
        <div className="w-fulll block">
          <button
            type="button"
            onClick={pass}
            disabled={!isConnected || state.writeStatus > 0 || address === traveler}
            className="x text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
          >
            {!isConnected && "Please Connect Wallet"}
            {isConnected && state.writeStatus === 0 &&(  address !== traveler ? "PASS" : "My Homework") }
            {isConnected && state.writeStatus > 0 && <Spinner />}
            <div className={`${state.writeStatus > 0 ? "ml-2" : ""}`}>
              {isConnected && state.writeStatus === 1 && "Waiting for approval"}
              {isConnected && state.writeStatus === 2 && "pending"}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewTaskModal;
