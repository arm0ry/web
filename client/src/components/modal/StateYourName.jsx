import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useContractRead } from "wagmi";
import { Spinner, Markdown } from "@components";
import CloseModalButton from "./CloseModalButton";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { ethers } from "ethers";
import { Logger } from "@contract";
import useWriteContract from "@hooks/useWriteContract";

const StateYourNameModal = ({ modalPayload }) => {
  const [inPrepare, setInPrepare] = useState(false);
  const [fetching, setFetching] = useState(false);

  const bulletin = modalPayload.content.bulletin;
  const listId = modalPayload.content.listId;
  const itemId = modalPayload.content.itemId;

  const { address, isConnected, isDisconnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { seed: "", moon: "" },
  });

  const { write: log, state: logState } = useWriteContract({
    ...Logger,
    functionName: "log",
  });

  useEffect(() => {
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

  const logByBot = async (feedback, data) => {
    try {
      const body = { bulletin: bulletin.address, listId: listId, itemId: itemId, feedback: feedback, data: data };
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
                    href={`https://sepolia.etherscan.io/tx/${res.data.txhash}`}
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
    if (isConnected) {
      setInPrepare(true);

      try {
        log({
          args: [bulletin.address, listId, itemId, data.feedback, ethers.constants.HashZero],
        })
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      setInPrepare(true);

      try {
        logByBot(data.feedback, ethers.constants.HashZero)
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {

  }, [fetching])

  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 text-gray-500  bg-slate-100">
        <div className="flex flex-col">
          <label className="mb-2 block text-lg font-semibold text-gray-900">
            一起上鏈吧！ ｜ Let's get onchain!
          </label>
          <label className="mt-1 ml-3 mb-1 block text-sm font-medium text-gray-500">
            Connect your wallet or use a public alias to participate! Public alias feature is experimental, and recommended for single-use only.
          </label>
          <label className="mt-1 ml-3 mb-2 block text-sm font-medium text-gray-500">
            The time it takes to post a transaction onchain varies. You should see a green notification when transaction is successful.
          </label>
        </div>
        <CloseModalButton />
      </div>

      {itemId == 0
        ? (
          <div div className="flex h-auto h- space-y-2 overflow-y-scroll px-6 py-4 bg-slate-100" >
            <div className="w-full mx-auto items-center justify-center gap-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    {isConnected ? "地址 | Wallet Address" : "稱呼 | Public Alias"}
                  </label>
                  <div className="flex space-x-4 items-center justify-start">
                    <div className="w-2/3">
                      {isConnected ?
                        <label
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {address}
                        </label> :
                        <input
                          type="text"
                          id="seed"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                          placeholder="麵包小偷 | Baguette thief"
                          required
                          {...register("seed")}
                        />
                      }
                    </div>
                    <div className="flex w-1/3 items-center justify-center ">
                      {isConnected ? <></> : <DynamicWidget
                        buttonClassName="connectButton"
                        innerButtonComponent="Connect Wallet"
                      />}
                    </div>
                  </div>
                </div>
                <label
                  className="mt-2 mb-4 block text-sm font-normal text-gray-600 "
                >
                </label>
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={startState.writeStatus > 0 || fetching}
                    className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
                  >
                    {startState.writeStatus === 0 && !fetching && (inPrepare ? "Wait..." : "Start")}
                    {(startState.writeStatus > 0 || fetching) && <Spinner />}
                    <div className={`${(startState.writeStatus > 0 || fetching) ? "ml-2" : ""}`}>
                      {startState.writeStatus === 1 && "Waiting for approval"}
                      {(startState.writeStatus === 2 || fetching) && "pending"}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div >
        ) : (
          <div div className="flex h-auto h-space-y-2 overflow-y-scroll px-6 py-4 bg-slate-100" >
            <div className="w-full mx-auto items-center justify-center gap-3">
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    {isConnected ? "地址 | Address" : "稱呼 | Name"}
                  </label>
                  <div className="flex space-x-4 items-center justify-start">
                    <div className="w-2/3">
                      {isConnected ?
                        <label
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {address}
                        </label> :
                        <input
                          type="text"
                          id="seed"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                          placeholder="麵包小偷 | Baguette thief"
                          required
                          {...register("seed")}
                        />
                      }
                    </div>
                    <div className="flex w-1/3 items-center justify-center ">
                      {isConnected ? <></> : <DynamicWidget
                        buttonClassName="connectButton"
                        innerButtonComponent="Connect Wallet"
                      />}
                    </div>
                  </div>
                </div>
                {/* {(parseInt(listId) === 1) ? (
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
                ) : (<></>)} */}
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    心得 | Feedback
                  </label>
                  <textarea
                    id="feedback"
                    className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="炸雞超好吃～ | Fried chicken was so good~"
                    {...register("feedback")}
                  ></textarea>
                </div>

                <div className="flex flex-col space-y-4 w-full">
                  <label
                    className="block text-sm font-medium text-gray-500 "
                  >
                  </label>
                  <button
                    type="submit"
                    disabled={logState.writeStatus > 0 || fetching}
                    className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
                  >
                    {(logState.writeStatus === 0 && !fetching) && (inPrepare ? "Wait..." : "Share")}
                    {(logState.writeStatus > 0 || fetching) && <Spinner />}
                    <div className={`${(logState.writeStatus > 0 || fetching) ? "ml-2" : ""}`}>
                      {(logState.writeStatus === 1) && "Waiting for approval"}
                      {(logState.writeStatus === 2 || fetching) && "pending"}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div >)}
    </>
  );
};

export default StateYourNameModal;
