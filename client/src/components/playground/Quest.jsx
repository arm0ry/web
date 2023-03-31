import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { ethers, BigNumber } from "ethers";

import { useGlobalContext } from "@context/store";
import TaskCard from "./TaskCard";
import { PeopleIcon, PercentageIcon } from "@assets";
import Spinner from "../Spinner";
import { shortenAddress } from "@utils/shortenAddress";
import { Arm0ryQuests, Arm0ryTravelers } from "@contract";
import useWriteContract from "@hooks/useWriteContract";
import { pushAlert } from "@context/actions/alertAction";
import { showModal, cleanModal } from "@context/actions/modalAction";

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

  const clickButton = () => {
    // TODO pause
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
          {/* <div className="flex items-center justify-end">
          <div
            onClick={clickButton}
            className="button h-10 w-fit px-10 cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
          >
            <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">
              Pause
            </span>
          </div>
        </div> */}
          <div className="group flex h-full w-full flex-row items-center justify-between  border-b-2 pt-2 pb-2   leading-none">
            <div>
              <p className="text-3xl font-bold  text-slate-800 ">
                {missions[missionId]?.title}
              </p>
              <div
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
                className="relative inline-block text-xs text-gray-600"
              >
                {shortenAddress(missions[missionId]?.creator)}
                <div
                  className={`${
                    tooltip ? "visible opacity-70" : "invisible opacity-0"
                  } tooltip  absolute left-[100%] -top-1 z-10 inline-block rounded-lg bg-gray-200 px-1 py-1 text-xs  font-medium text-black shadow-sm`}
                >
                  {missions[missionId]?.creator}
                </div>
              </div>
            </div>
            <div className="mt-2 ml-auto flex min-w-[7rem]  items-start justify-end justify-items-end md:mt-0 md:items-end md:justify-end">
              <div className="flex flex-col  flex-nowrap gap-2 md:flex-row md:p-2">
                <div class="inline-flex w-fit items-center rounded-full bg-[#303481] px-2  py-1 text-sm font-bold text-[#D6E6F2]">
                  <PeopleIcon className="h-3" />
                  <span class="ml-1">
                    {missions[missionId]?.completionsCount}
                    {" 人"}
                  </span>
                </div>
                <div class="inline-flex w-fit items-center rounded-full bg-[#303481] px-2  py-1 text-sm font-bold text-[#D6E6F2]">
                  <PercentageIcon className="h-3" />
                  <span class="ml-1">{missions[missionId]?.impact}</span>
                </div>
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
