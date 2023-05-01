import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { Arm0ryQuests, Arm0ryTravelers } from "@contract";
import useWriteContract from "@hooks/useWriteContract";

import { useGlobalContext } from "@context/store";
import TaskCard from "./TaskCard";
import { PeopleIcon, PercentageIcon, TaskIcon, PauseIcon } from "@assets";
import Spinner from "../Spinner";
import { shortenAddress } from "@utils/shortenAddress";
import Avatar from "../Avatar";

const Quest = () => {
  const { playground, userInfo, isApproved, setIsApproved } =
    useGlobalContext();
  const { missions } = playground;
  const [tooltip, setTooltip] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const missionId = userInfo.questID;
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(missions).length > 0) {
      if (missionId === undefined) {
        return navigate("/playground/missions");
      }
    }
  }, [userInfo.questID]);
  const { write: _pauseQuest, state } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "pauseQuest",
  });
  const onSuccess = async () => {
    navigate("/playground/missions");
  };
  const clickButton = () => {
    _pauseQuest({
      args: [parseInt(missionId, 10)],
      onSuccess,
    });
  };

  return (
    <>
      {!isConnected || missions[missionId] == undefined ? (
        <div className="w-100 flex h-[calc(100vh_-_6rem)] flex-col items-center justify-center">
          <Spinner
            className="h-16 w-16 border-b-4"
            pathColor="border-gray-500"
          />
        </div>
      ) : (
        <div className="mx-auto max-w-[1024px]">
          <div className="flex items-center justify-end">
            <div
              onClick={clickButton}
              className="  h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
            >
              <span className="flex h-full flex-row items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">
                {state.writeStatus === 0 && (
                  <>
                    <PauseIcon className="mr-1 h-3 text-[#2b328e]" /> Pause
                  </>
                )}
                {state.writeStatus > 0 && (
                  <Spinner pathColor="border-[#2b328e]" />
                )}
                <div className={`${state.writeStatus > 0 ? "ml-2" : ""}`}>
                  {state.writeStatus === 1 && "Waiting for approval"}
                  {state.writeStatus === 2 && "pending"}
                </div>
              </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-between  border-b-2 pt-2 pb-2   leading-none">
            <div>
              <p className="text-3xl font-bold  text-slate-800 ">
                {missions[missionId]?.title}
              </p>
              <p className=" text-slate-80 my-1 text-sm">
                {/* {console.log(playground.ipfs[missions[missionId]?.details])} */}
                {playground.ipfs[missions[missionId]?.details]?.detail}
              </p>
              <div className="relative inline-block text-xs text-gray-600">
                <span className="group">
                  {" "}
                  {shortenAddress(missions[missionId]?.creator)}
                <div
                  className={` tooltip  absolute left-[100%] -top-1  z-10 hidden rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium text-black opacity-80 shadow-sm group-hover:inline-block`}
                >
                  {missions[missionId]?.creator}
                </div>
                </span>

              </div>
            </div>
            <div className="mt-2 ml-auto flex w-fit  items-end justify-end  self-end">
              <div className="flex flex-col  flex-nowrap gap-2 md:flex-row md:p-2">
                <div className="  relative inline-flex w-fit  items-center  whitespace-nowrap rounded-full bg-[#303481] px-2  py-1 text-sm  text-[#D6E6F2]">
                  <span className="peer mr-1 font-bold ">
                    <span className="mr-1 hidden md:inline">
                      Mission Impact
                    </span>
                    {missions[missionId]?.impact}
                  </span>
                  <PercentageIcon className="peer h-3" />
                  <div
                    className={` tooltip absolute left-[100%]  -top-1 z-10 inline-block -translate-y-full -translate-x-full  rounded-lg bg-gray-200 px-1 py-1 text-xs font-medium text-black  opacity-0 shadow-sm peer-hover:opacity-80 md:hidden`}
                  >
                    Mission Impact
                  </div>
                </div>
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
                <div className="border-1 ml-2 flex h-7 w-7 cursor-cell	items-center justify-center rounded-full border-white bg-[#f7f0eb] text-xs font-semibold text-black hover:bg-[#ece2dc]">
                  +{" "}
                  {Math.round(
                    (missions[missionId]?.completionsCount /
                      missions[missionId]?.impact) *
                      100
                  )}
                </div>
              </div>
              <span className="ml-2 text-sm font-semibold"></span>
              <div
                className={` tooltip absolute left-[100%]  bottom-0 z-10 inline-block translate-y-full -translate-x-full  rounded-lg bg-gray-200 px-1 py-1 text-xs font-medium text-black  opacity-0 shadow-sm peer-hover:opacity-80`}
              >
                {Math.round(
                  (missions[missionId]?.completionsCount /
                    missions[missionId]?.impact) *
                    100
                )}
                <span className="ml-2">participants</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-6">
            {missions[missionId]?.taskIds.map((id, i) => {
              if (i % 2 === 0) {
                return (
                  <>
                    <TaskCard
                      key={id}
                      taskId={id}
                      className={"md:col-span-3 md:col-start-2"}
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <TaskCard
                      key={id}
                      taskId={id}
                      className={"md:col-span-3 md:col-start-3"}
                    />
                  </>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Quest;
