import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Arm0ryMissions, Arm0ryQuests } from "@contract";

import { useGlobalContext } from "@context/store";
import TaskCard from "../task/TaskCard";
import { Spinner, Avatar, Markdown } from "@components";
import { PauseIcon, PercentageIcon, TaskIcon } from "@assets";
import { shortenAddress } from "@utils/shortenAddress";
import { getQuest } from "@utils/contract";
import { updateTravelerQuest } from "@context/actions/userAction";

import useWriteContract from "@hooks/useWriteContract";
import { pushAlert } from "@context/actions/alertAction";
import { showModal, cleanModal } from "@context/actions/modalAction";

const MissionDetailTPL = ({ missionId, magicButton }) => {
  const { playground, userInfo } = useGlobalContext();
  const { missions } = playground;
  const { address, isConnected, isDisconnected } = useAccount();
  const [buttonState, setButtonState] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const _p = Math.round(
      (missions[missionId]?.completionsCount / missions[missionId]?.impact) *
        100
    );
    if (!Number.isNaN(_p)) {
      setParticipants(_p);
    }
  }, [missions]);

  useEffect(() => {
    switch (true) {
      case isConnected != true:
        setButtonState(0);
        break;
      case userInfo.inQuest && userInfo.questID == missionId:
        setButtonState(2); //pause
        break;
      case userInfo.quests[missionId] === undefined && !userInfo.inQuest:
      // case userInfo.quests[missionId] !== undefined && !userInfo.inQuest && userInfo.quests[missionId]?.inComplete > 0:
      case !userInfo.inQuest && userInfo.quests[missionId]?.inComplete > 0:
        setButtonState(1); //Activate
        break;

      case userInfo.inQuest &&
        userInfo.quests[missionId]?.incomplete == 0 &&
        userInfo.quests[missionId]?.xp > userInfo.quests[missionId]?.claimed:
      case !userInfo.inQuest &&
        userInfo.quests[missionId]?.incomplete == 0 &&
        userInfo.quests[missionId]?.xp > userInfo.quests[missionId]?.claimed:
        console.log("Claim");
        setButtonState(3); //Claim
        break;
      default:
        setButtonState(0);
        break;
    }
  }, [userInfo.questID, userInfo.quests, userInfo.inQuest, isConnected]);

  const { write: _purchase, state } = useWriteContract({
    ...Arm0ryMissions,
    functionName: "purchase",
  });

  const purchase = () => {
    _purchase({
      args: [parseInt(missionId, 10)],
    });
  };

  const { write: _claimTravelerReward, state: claimState } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "claimTravelerReward",
  });
  const claimTravelerReward = () => {
    const onSuccess = async () => {
      updateTravelerQuest(address, missionId);
      showModal({
        type: 8,
      });
    };
    _claimTravelerReward({
      args: [parseInt(missionId, 10)],
      onSuccess,
    });
  };

  const { write: _pauseQuest, state: pauseState } = useWriteContract({
    ...Arm0ryQuests,
    functionName: "pauseQuest",
  });

  const pauseQuest = () => {
    const onSuccess = async () => {
      navigate("/playground/missions");
    };
    _pauseQuest({
      args: [parseInt(missionId, 10)],
      onSuccess,
    });
  };

  const activate = () => {
    showModal({
      type: 4,
      size: "3xl",
      content: { missionId: missionId },
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
            {magicButton}
            {/* // TODO */}
            {buttonState == 1 && (
              <>
                <div
                  onClick={activate} //show modal
                  className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
                >
                  <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">
                    Start
                  </span>
                </div>
              </>
            )}
            {buttonState == 2 && (
              <>
                <button
                  onClick={pauseQuest}
                  disabled={pauseState.writeStatus > 0}
                  className="  h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841] disabled:pointer-events-none disabled:opacity-30 "
                >
                  <span className="flex h-full flex-row items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">
                    {pauseState.writeStatus === 0 && (
                      <>
                        <PauseIcon className="mr-1 h-3 text-[#2b328e]" /> Pause
                      </>
                    )}
                    {pauseState.writeStatus > 0 && (
                      <Spinner pathColor="border-[#2b328e]" />
                    )}
                    <div
                      className={`${pauseState.writeStatus > 0 ? "ml-2" : ""}`}
                    >
                      {pauseState.writeStatus === 1 && "Waiting for approval"}
                      {pauseState.writeStatus === 2 && "pending"}
                    </div>
                  </span>
                </button>
              </>
            )}
            {buttonState == 3 && (
              <>
                <button
                  onClick={claimTravelerReward}
                  disabled={claimState.writeStatus > 0}
                  className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#a3e635] bg-[#a3e635] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#65a30d] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#65a30d] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#65a30d,0_0px_0_0_#1b70f841] disabled:pointer-events-none disabled:opacity-30"
                >
                  <span className="text-md flex h-full flex-row items-center justify-center font-PasseroOne font-bold	 tracking-widest text-[#000]">
                    {claimState.writeStatus === 0 && "Claim"}
                    {claimState.writeStatus > 0 && <Spinner />}
                    <div
                      className={`${claimState.writeStatus > 0 ? "ml-2" : ""}`}
                    >
                      {claimState.writeStatus === 1 && "Waiting for approval"}
                      {claimState.writeStatus === 2 && "Pending"}
                    </div>
                  </span>
                </button>
              </>
            )}
          </div>
          <div className="group flex h-full w-full flex-row items-center justify-between  border-b-2 pt-2 pb-2   leading-none">
            <div>
              <p className="text-2xl font-bold text-slate-800  md:text-3xl ">
                {missions[missionId]?.title}
              </p>
              <div className={`flex-col mt-1 text-md z-0   ${expanded ? "" : "cursor-pointer"}`}>
                {/* {console.log(playground.ipfs[missions[missionId]?.details])} */}
                {/* // TODO */}
                <div className={`${expanded ? "" : "line-clamp-3"}`}  onClick={() => setExpanded(true)}>
                  <Markdown>
                  {playground.ipfs[missions[missionId]?.details]?.detail}
                  </Markdown>
                </div>

                <div
                  className={`w-100 text-right text-blue-500 underline cursor-pointer z-10 ${expanded ? "-translate-y-4" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                >
                  <span className="">
                    {expanded ? "Hide" : "Read more"}
                  </span>
                </div>

                {/* {playground.ipfs[missions[missionId]?.details]?.detail} */}
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
                {/* // TODO */}
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
                  + {participants}
                </div>
              </div>
              <span className="ml-2 text-sm font-semibold"></span>
              <div
                className={` tooltip absolute left-[100%]  bottom-0 z-10 inline-block translate-y-full -translate-x-full  rounded-lg bg-gray-200 px-1 py-1 text-xs font-medium text-black  opacity-0 shadow-sm peer-hover:opacity-80`}
              >
                {participants}
                <span className="ml-2">participants</span>
              </div>
            </div>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-5 p-4 md:grid-cols-6">
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

          <footer className="fixed bottom-0 left-0 z-20 h-fit w-full bg-[#fffcfa] pb-2 md:pl-64 md:pb-0">
            <div className="mx-auto flex max-w-[1024px] flex-row items-center justify-between border-t-2 p-3">
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
                    className={` tooltip absolute left-[0%]  -top-1 z-10 inline-block -translate-y-full   rounded-lg bg-gray-200 px-1 py-1 text-xs font-medium text-black  opacity-0 shadow-sm peer-hover:opacity-80 md:hidden`}
                  >
                    Mission Impact
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={purchase}
                  disabled={!isConnected || state.writeStatus > 0}
                  className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#FFD707] bg-[#FFD707] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#DAC400] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#DAC400] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#DAC400,0_0px_0_0_#1b70f841] disabled:pointer-events-none disabled:opacity-30"
                >
                  <span className="text-md flex h-full flex-row items-center justify-center font-PasseroOne font-bold	 tracking-widest text-[#000]">
                    {!isConnected && "Please Connect Wallet"}
                    {isConnected && state.writeStatus === 0 && "Purchase"}
                    {isConnected && state.writeStatus > 0 && <Spinner />}
                    <div className={`${state.writeStatus > 0 ? "ml-2" : ""}`}>
                      {isConnected &&
                        state.writeStatus === 1 &&
                        "Waiting for approval"}
                      {isConnected && state.writeStatus === 2 && "Pending"}
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default MissionDetailTPL;