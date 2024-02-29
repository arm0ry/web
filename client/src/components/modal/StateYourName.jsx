import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useContractRead } from "wagmi";
import { Spinner, Markdown } from "@components";
import CloseModalButton from "./CloseModalButton";
import { Mission, Quest } from "@contract";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import {
  goerli_provider
} from "@utils/contract";
import { ethers } from "ethers";

const StateYourNameModal = ({ modalPayload }) => {
  const questInstance = new ethers.Contract(Quest.address, Quest.abi, goerli_provider)

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
    defaultValues: { seed: "", moon: "" },
  });

  useEffect(() => {
    if (isConnected) {
      // cleanModal();
      console.log(isConnected)
    }
  }, [isConnected]);

  const MoodRadio = ({ moon, value, register }) => {
    return (
      <>
        <div className="flex items-center">
          <input
            type="checkbox"
            value={value}
            {...register("moon")}
          />

          <label
            className="ml-2 text-sm font-normal text-gray-900 "
          >
            {moon}
          </label>
        </div>
      </>
    );
  };

  const sponsorStart = async (username) => {
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
            setFetching(false);
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
    }
  };

  const sponsorRespond = async (username, response, feedback) => {
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

            // Tally onboardingSupportToken
            axios
              .post("/api/users/sponsored_tally", body)
              .then((res) => {
                console.log(res);
                if (res.status === 202) {
                  setFetching(false);
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
    }
  };

  const onSubmit = async (data) => {
    setFetching(true);

    // setInPrepare(true);

    let userResponse = 0
    for (let i = 0; i < data.moon.length; i++) {
      userResponse = userResponse + 10 ** parseInt(data.moon[i])
    }

    try {
      const userId = await questInstance.getPublicUserAddress(data.seed);
      const _isPublicUser = await questInstance.isPublicUser(userId, Mission.address, missionId);
      // console.log("responses", data.seed, userId, _isPublicUser, Mission.address, missionId)

      if (taskId == 0) {
        if (!_isPublicUser) {
          sponsorStart(data.seed)
        } else {
          pushAlert({
            msg: "這位沒有人已經報到過了 | This name is already in use.",
            type: "failure",
          });
        }

      } else {
        if (!_isPublicUser) {
          pushAlert({
            msg: "要先報道才能分享喔 | Please register before sharing.",
            type: "failure",
          });
        } else {
          sponsorRespond(data.seed, userResponse / 10, data.feedback)
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

  }, [fetching])

  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 text-gray-500  bg-slate-100">
        <div className="flex flex-col">
          <label className="block text-md font-semibold text-gray-900">
            跟大家分享一下你的參與過程吧！
          </label>
          <label className="mt-1 mb-2 block text-sm font-medium text-gray-500">
            Share your feedback!
          </label>
        </div>
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
                    稱呼 | Name
                  </label>
                  <input
                    type="text"
                    id="seed"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                    placeholder="麵包小偷 | Baguette thief"
                    required
                    {...register("seed")}
                  />
                </div>
                <label
                  className="mt-2 mb-4 block text-sm font-normal text-gray-600 "
                >
                </label>
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={fetching}
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
                  稱呼 | Name
                </label>
                <input
                  type="text"
                  id="seed"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="沒有人 | Nobody"

                  required
                  {...register("seed")}
                />
              </div>
              {(parseInt(missionId) === 1) ? (
                <div className="mb-6 ">
                  <label
                    className=" block text-sm font-medium text-gray-900 "
                  >
                    如果你今天有使用<a target="_blank" href="https://docs.google.com/document/d/1PHYvQ9r2kmGnGKK4_Yqh1Y-yXx61p78r21Rz2e41oPA/" class="underline"
                    >新參者求生小錦囊</a>，請點選以下完成的任務：
                  </label>
                  <label
                    className="mb-3 block text-sm font-normal text-gray-500"
                  >
                    If you've used the <a target="_blank" href="https://docs.google.com/document/d/1PHYvQ9r2kmGnGKK4_Yqh1Y-yXx61p78r21Rz2e41oPA/" class="underline"
                    >Newcomer Guide</a>, please check any that you've done!
                  </label>

                  <div className="flex flex-col items-start justify-between">
                    <MoodRadio moon="👍 幫 g0v 粉專按讚" value={"1"} register={register} />
                    <MoodRadio moon="🔔 打開任一專案頻道通知" value={"2"} register={register} />
                    <MoodRadio moon="📝 截圖任一提案的專案共筆" value={"3"} register={register} />
                    <MoodRadio moon="👀 瀏覽並截圖最新社群九分鐘" value={"4"} register={register} />
                    <MoodRadio moon="🎙️ 在有興趣的專案共筆上自我介紹" value={"5"} register={register} />
                    <MoodRadio moon="🏷️ 貼上三張符合你身份的技能貼紙" value={"6"} register={register} />
                    <MoodRadio moon="🧐 加入三個你有興趣的 Slack 頻道" value={"7"} register={register} />
                  </div>
                </div>
              ) : (<></>)}


              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  心得 | Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="炸雞超好吃～ | Fried chicken so good~"
                  {...register("feedback")}
                ></textarea>
              </div>

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
