import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { Spinner, Markdown } from "@components";
import CloseModalButton from "./CloseModalButton";
import { Mission } from "@contract";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";
import { DynamicWidget } from "@dynamic-labs/sdk-react";


const StateYourNameModal = ({ modalPayload }) => {
  const [view, setView] = useState(false);
  const [fetching, setFetching] = useState(false);

  const taskId = modalPayload.content.taskId;
  const missionId = modalPayload.content.missionId;
  const { address, isConnected, isDisconnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { seed: "", moon: "1" },
  });

  useEffect(() => {
    if (isConnected) {
      // cleanModal();
    }
  }, [isConnected]);

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

  const sponsorStart = async (username) => {
    setFetching(true);
    console.log("starting")
    try {
      const body = { seed: username, mission: Mission.address, missionId: missionId };
      axios
        .post("/api/users/sponsored_start", body)
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            pushAlert({
              msg: (
                <span>
                  {res.data.msg}
                  <a
                    href={`https://goerli.etherscan.io/tx/${res.data.txhash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-extrabold text-green-900"
                  >
                    &nbsp;View on Etherscan &#128279;
                  </a>
                </span>
              ),
              type: "success",
            });
            return;
          }
        })
        .catch((err) => {
          console.error(err);
          pushAlert({
            msg: `Error! ${err.response.data.msg}`,
            type: "failure",
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const sponsorRespond = async (username, response, feedback) => {
    setFetching(true);
    try {
      const body = { seed: username, mission: Mission.address, missionId: missionId, taskId: taskId, response: response, feedback: feedback };
      axios
        .post("/api/users/sponsored_respond", body)
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            pushAlert({
              msg: (
                <span>
                  {res.data.msg}
                  <a
                    href={`https://goerli.etherscan.io/tx/${res.data.txhash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-extrabold text-green-900"
                  >
                    &nbsp;View on Etherscan &#128279;
                  </a>
                </span>
              ),
              type: "success",
            });
            return;
          }
        })
        .catch((err) => {
          console.error(err);
          pushAlert({
            msg: `Error! ${err.response.data.msg}`,
            type: "failure",
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const onSubmit = async (data) => {
    // setInPrepare(true);

    if (taskId == 0) sponsorStart(data.seed);
    else sponsorRespond(data.seed, data.moon, data.feedback);
  };

  useEffect(() => {

  }, [fetching])

  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 pb-2 text-gray-500  bg-slate-100">
        跟大家分享一下你的參與過程吧！
        <CloseModalButton />
      </div>
      {/* <DynamicWidget
        buttonClassName="connectButton"
        innerButtonComponent="Connect Wallet"
      /> */}
      {taskId == 0 ?
        (
          <div div className="flex h-auto h- space-y-2 overflow-y-scroll px-6 py-4 bg-slate-100" >
            <div className="w-full mx-auto items-center justify-center gap-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    稱呼
                  </label>
                  <input
                    type="text"
                    id="seed"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                    placeholder="沒有人"
                    required
                    {...register("seed")}
                  />
                </div>
                <label
                  className="mt-2 mb-4 block text-sm font-medium text-gray-900 "
                >

                </label>
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={fetching} // TODO: WHY IS THIS NOT WORKING?
                    className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
                  >
                    Start
                  </button>
                </div>
              </form>
            </div>
          </div >) :
        (<div div className="flex h-auto h-space-y-2 overflow-y-scroll px-6 py-4 bg-slate-100" >
          <div className="w-full mx-auto items-center justify-center gap-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  稱呼
                </label>
                <input
                  type="text"
                  id="seed"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="沒有人"
                  required
                  {...register("seed")}
                />
              </div>
              <div className="mb-6 ">
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  心情
                </label>
                <div className="flex flex-row items-center justify-between">
                  <MoodRadio moon="😁" value={"1"} register={register} />
                  <MoodRadio moon="🥱" value={"2"} register={register} />
                  <MoodRadio moon="🤩" value={"3"} register={register} />
                </div>
                {/* {errors.firstName?.type === "required" && (
                  <p role="alert">Required</p>
                )} */}
              </div>


              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  心得
                </label>
                <textarea
                  id="feedback"
                  className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="炸雞超好吃～"
                  {...register("feedback")}
                ></textarea>
              </div>

              {/* <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  We do not store seed.
                </label>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Seed is used to simulate a blockchain address as visitor id.
                </label>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Please use this feature only for experimental purposes.
                </label>
              </div> */}

              <div className="w-full">
                <button
                  type="submit"
                  disabled={fetching}
                  className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div >)}
    </>
  );
};

export default StateYourNameModal;
