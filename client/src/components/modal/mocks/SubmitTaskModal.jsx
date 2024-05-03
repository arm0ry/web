import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAccount } from "wagmi";

import useWriteContract from "@hooks/useWriteContract";
// import { Arm0ryQuests } from "@contract";

import { useGlobalContext } from "@context/store";
// import { updateTravelerTask } from "@context/actions/userAction";
import { pushAlert } from "@context/actions/alertAction";
import { cleanModal } from "@context/actions/modalAction";
import { uploadJSON, unpinCID } from "@utils/ipfs";

import { Spinner, Markdown } from "@components";
import CloseModalButton from "../CloseModalButton";

const prepareData = async (types, questId, taskId, homework, address) => {
  try {
    const ipfsCID = await uploadJSON({
      title: `"[HomeWork]${address} ${questId} ${taskId}`,
      questId: questId,
      taskId: taskId,
      homework: homework,
      traveler: address,
      time: Date.now(),
    });
    // BigNumber.from(taskId).toBigInt().toString(10),
    console.log({ ipfsCID });
    const params = [questId, taskId, ipfsCID];
    return { ipfsCID, params };
  } catch (error) {
    if (ipfsCID) unpinCID(ipfsCID);
    throw error;
  }
};
const MoodRadio = ({ moon, value, register }) => {
  return (
    <>
      <div className="flex items-center">
        <input
          type="radio"
          value={value}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:ring-offset-gray-800 dark:focus:ring-blue-600 "
          {...register("moon", { required: true })}
        />

        <label
          for="default-radio-2"
          className="ml-2 text-xl font-medium text-gray-900 "
        >
          {moon}
        </label>
      </div>
    </>
  );
};
const SubmitTaskModal = ({ modalPayload }) => {
  const [view, setView] = useState(false);
  const [inPrepare, setInPrepare] = useState(false);
  const navigate = useNavigate();
  const { address, isConnected, isDisconnected } = useAccount();
  const { questID: questId, taskId } = modalPayload.content;
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { homework: "", moon: "1" },
  });
  const { write: submitTasks, state } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "submitTasks",
  });
  const onSubmit = async (data) => {
    setInPrepare(true);
    prepareData(
      ["uint8", "uint8", "string"],
      questId,
      taskId,
      data.homework,
      address
    )
      .then(({ ipfsCID, params }) => {
        setInPrepare(false);
        const onSuccess = () => {
          // reset();
          // updateTravelerTask(taskId);
          cleanModal();
          // navigate("/playground/review");
        };
        const onError = () => {
          unpinCID(ipfsCID);
        };
        submitTasks({ args: params, onSuccess, onError });
      })
      .catch((error) => {
        pushAlert({ msg: `Error! ${error}`, type: "failure" });
      })
      .finally(() => {
        setInPrepare(false);
      });
  };
  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 pb-2 ">
        <CloseModalButton />
      </div>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      <div className="h-[calc(100vh_-_6rem)] space-y-6 overflow-y-scroll px-6 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 ">
            {/* <label
                for="homework"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Homework
              </label> */}
            <div className="flex flex-row items-center justify-between">
              <MoodRadio moon="😁" value={"1"} register={register} />
              <MoodRadio moon="🥱" value={"2"} register={register} />
              <MoodRadio moon="🤩" value={"3"} register={register} />
            </div>
            {errors.firstName?.type === "required" && (
              <p role="alert">Required</p>
            )}
          </div>
          <div className="mb-6">
            <textarea
              id="homework"
              className={` ${view ? "hidden" : "block"
                } h-[calc(100vh_-_17rem)] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 `}
              placeholder="Homework..."
              {...register("homework")}
            ></textarea>
            <div
              className={`${!view ? "hidden" : "block"
                } h-[calc(100vh_-_17rem)] space-y-6 overflow-y-scroll  rounded-lg border-2 border-gray-400 p-6`}
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
              {view ? <span>&#x270E;Edit</span> : "Preview"}
            </button>
          </div>
          <div className="w-fulll block">
            <button
              type="submit"
              disabled={state.writeStatus > 0 || inPrepare}
              className="x text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
            >
              {state.writeStatus === 0 && (inPrepare ? "Wait..." : "Submit!")}
              {state.writeStatus > 0 && <Spinner />}
              <div className="ml-2">
                {state.writeStatus === 1 && "Waiting for approval"}
                {state.writeStatus === 2 && "pending"}
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitTaskModal;
