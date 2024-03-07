import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { useGlobalContext } from "@context/store";
import TaskCard from "../task/TaskCard";
import { Spinner, Avatar, Markdown } from "@components";
import { PauseIcon, PercentageIcon, TaskIcon } from "@assets";
import { shortenAddress } from "@utils/shortenAddress";
import { showModal, cleanModal } from "@context/actions/modalAction";

const MissionDetailTPL = ({ domain, contract, missionId, missions, tasks }) => {
  const { playground, userInfo } = useGlobalContext();
  // const { missions } = playground;
  const { address, isConnected, isDisconnected } = useAccount();
  const [buttonState, setButtonState] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Number.isNaN(missions[missionId]?.startsCount)) {
      setParticipants(missions[missionId]?.startsCount);
    }
  }, [missions]);

  useEffect(() => {
    setButtonState(1); //Activate
  }, [userInfo.questID, userInfo.quests, userInfo.inQuest, isConnected]);

  const activate = () => {
    showModal({
      type: 4,
      size: "3xl",
      content: { contract: contract, missionId: missionId, taskId: 0 },
    });
  };

  return (
    <>
      {missions[missionId] == undefined ? (
        <div className="w-100 flex h-[calc(100vh_-_6rem)] flex-col items-center justify-center">
          <Spinner
            className="h-16 w-16 border-b-4"
            pathColor="border-gray-500"
          />
          <span className="mt-3 text-lg font-medium text-gray-600">
            Fetching data from IPFS...
          </span>
        </div>
      ) : (
        <div className="mx-auto md:max-w-[1024px]">
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
            >
              <span className="text-base font-medium">←Go Back</span>
            </button>
            {buttonState == 1 && (
              <>
                <div
                  onClick={activate} //show modal
                  className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-yellow-200 bg-yellow-200 px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
                >
                  <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">
                    報到 | Register
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="group flex h-full w-full flex-row items-center justify-between  border-b-2 pt-2 pb-2   leading-none">
            <div>
              <p className="text-2xl font-bold text-slate-800  md:text-3xl ">
                {missions[missionId]?.title}
              </p>
              <p className="text-2xl font-bold text-slate-800  md:text-3xl ">
                {/* 34253245 seconds */}
              </p>
              <div className={`flex-col mt-1 text-md z-0   ${expanded ? "" : "cursor-pointer"}`}>
                <div className={`${expanded ? "" : "line-clamp-3"}`} onClick={() => setExpanded(true)}>
                  <Markdown>
                    {missions[missionId]?.details}
                  </Markdown>
                </div>

                {/* // TODO: Restore after testing completes
                <div className={`${expanded ? "" : "line-clamp-3"}`} onClick={() => setExpanded(true)}>
                  <Markdown>
                    {playground.ipfs[missions[missionId]?.details]?.detail}
                  </Markdown>
                </div> */}

                <div
                  className={`w-100 text-right text-blue-500 underline cursor-pointer z-10 ${expanded ? "-translate-y-4" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                >
                  <span className="">
                    {expanded ? "Hide" : "Read more"}
                  </span>
                </div>
              </div>
              <div className="relative inline-block text-xs text-gray-600">
                <span className="peer">
                  {" "}
                  {shortenAddress(missions[missionId]?.creator)}
                </span>

                <div
                  className={` tooltip  absolute left-[100%]  -top-1 z-10 inline-block rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium text-black  opacity-0 shadow-sm peer-hover:opacity-70`}
                >
                  {missions[missionId]?.creator}
                </div>
              </div>
            </div>
            <div className="mt-2 ml-auto flex w-fit  items-end justify-end  self-end">
              <div className="flex flex-col  flex-nowrap gap-2 md:flex-row md:p-2">
              </div>
            </div>
          </div>
          <div className="m-2 flex flex-row justify-between">
            <div className="inline-flex w-fit items-center justify-center  whitespace-nowrap rounded-full  px-2  py-1  text-base ">
              <TaskIcon className="h-4 text-gray-700" />
              <span className="ml-1 font-semibold ">
                {missions[missionId]?.taskIds.length} tasks
              </span>
            </div>
            <div className="relative  flex flex-row items-center justify-center">
              <div className=" peer flex -space-x-[0.5rem]">
                {[...Array(5)].map((_, i) => {
                  return (
                    <>
                      <Avatar
                        className={"h-7 w-7 "}
                        address={Math.random()}
                        color="f7f0eb"
                      />
                    </>
                  );
                })}
                <div className="border-1 ml-2 flex h-7 w-12 cursor-cell	items-center justify-center rounded-full border-white bg-[#f7f0eb] text-xs font-semibold text-black hover:bg-[#ece2dc]">
                  + {participants} 人
                </div>
              </div>
            </div>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-5 p-4 md:grid-cols-6">
            {[...missions[missionId]?.taskIds].reverse().map((id, i) => {
              if (i % 2 === 0) {
                return (
                  <>
                    <TaskCard
                      key={id}
                      domain={domain}
                      contract={contract}
                      taskId={id}
                      tasks={tasks}
                      className={"md:col-span-3 md:col-start-2"}
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <TaskCard
                      key={id}
                      domain={domain}
                      contract={contract}
                      taskId={id}
                      tasks={tasks}
                      className={"md:col-span-3 md:col-start-3"}
                    />
                  </>
                );
              }
            })}
          </div>

          <footer className="fixed bottom-0 left-0 z-20 h-fit w-full bg-[#fffcfa] pb-2 md:pl-64 md:pb-0">
            <div className="mx-auto flex max-w-[1024px] flex-row items-center justify-between border-t-2 p-3">
              <div className="flex flex-col  flex-nowrap gap-2 md:flex-row md:p-2">
                <div className="  relative inline-flex w-fit  items-center  whitespace-nowrap rounded-full bg-[#303481] px-2  py-1 text-sm  text-[#D6E6F2]">
                  <span className="peer mr-1 font-bold ">
                    <span className="mr-1 hidden md:inline">
                      完成人數 ｜ # of Completions ：
                    </span>
                    {missions[missionId]?.completionsCount} 人
                  </span>
                  <div
                    className={` tooltip absolute left-[0%]  -top-1 z-10 inline-block -translate-y-full rounded-lg bg-gray-200 px-1 py-1 text-xs font-medium text-black  opacity-0 shadow-sm peer-hover:opacity-80 md:hidden`}
                  >
                    Mission Impact
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default MissionDetailTPL;
