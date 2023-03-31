import React, { useState } from "react";
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
const SubmitTaskModal = ({ modalPayload }) => {
  const [view, setView] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const { questId, taskId } = modalPayload.content;
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { homework: "" },
  });
  const { write: submitTasks, state } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "submitTasks",
  });
  const onSubmit = async (data) => {
    prepareData(
      ["uint8", "uint8", "string"],
      questId,
      taskId,
      data.homework,
      address
    )
      .then(({ ipfsCID, params }) => {
        const onSuccess = () => {
          reset();
        };
        const onError = () => {
          unpinCID(ipfsCID);
        };
        submitTasks({ args: params, onSuccess, onError });
      })
      .catch((error) => {
        pushAlert({ msg: `Error! ${error}`, type: "failure" });
      });
  };
  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 pb-2 ">
        <CloseModalButton />
      </div>

      <div className="h-[calc(100vh_-_6rem)] space-y-6 overflow-y-scroll px-6 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            {/* <label
                for="homework"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Homework
              </label> */}
            <textarea
              id="homework"
              // rows="10"
              className={` ${
                view ? "hidden" : "block"
              } h-[calc(100vh_-_14rem)] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 `}
              placeholder="Homework..."
              {...register("homework")}
            ></textarea>
            <div
              className={`${
                !view ? "hidden" : "block"
              } h-[calc(100vh_-_14rem)] space-y-6 overflow-y-scroll  rounded-lg border-2 border-gray-400 p-6`}
            >
              <Markdown>{watch("homework")}</Markdown>
            </div>
            <button
              type="button"
              className="mt-1 ml-2 text-sm text-gray-500 "
              onClick={() => {
                setView((v) => !v);
              }}
            >
              {view ? (<span>&#x270E;Edit</span>) : "Preview"}
            </button>
          </div>
          <div className="w-fulll block">
            <button
              type="submit"
              disabled={ state.writeStatus > 0}
              className="x text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
            >
              
              { state.writeStatus === 0 && "Submit!"}
              { state.writeStatus > 0 && <Spinner />}
              <div className="ml-2">
                {
                  state.writeStatus === 1 &&
                  "Waiting for approval"}
                { state.writeStatus === 2 && "pending"}
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitTaskModal;