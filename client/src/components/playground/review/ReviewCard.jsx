import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAccount } from "wagmi";
import { showModal, cleanModal } from "@context/actions/modalAction";
import { shortenAddress } from "@utils/shortenAddress";
import { useGlobalContext } from "@context/store";
import { Money, Avatar } from "@components";
import { ClockIcon } from "@assets";
const secondToDay = (s) => {
  return parseInt(s / 86400);
};
const ReviewCard = ({ review }) => {
  const { playground } = useGlobalContext();
  const { tasks } = playground;
  const { traveler, taskId: rTaskId, taskHomework, questing } = review;
  const { address, isConnected, isDisconnected } = useAccount();
  // const { data: tasksdata, isLoading, isFetched } = useContractRead({
  //   ...Arm0ryMissions,
  //   functionName: 'tasks',
  //   args:[taskId]
  // })
  // useEffect(() => {
  //   setDetails(JSON.parse(tasks[taskId].details))
  // }, [])
  const clickButton = () => {
    showModal({
      type: 6,
      size: "3xl",
      content: { traveler, taskId: rTaskId, taskHomework, questing },
    });
  };

  return (
    <>
      <div className={`h-30 group relative w-full overflow-hidden`}>
        <div className="absolute -inset-1 ml-2 mt-2 h-full w-full rounded-lg bg-gradient-to-r from-[#00C3FF]  via-[#fcfcc2] to-[#fffc00] opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
        <div className="relative flex h-full w-full flex-row items-center justify-between space-x-1 rounded-lg bg-white px-4 py-3 leading-none ring-1 ring-gray-900/5">
          <div className="shrink-1 ml-2 space-y-2">
            <div className="flex flex-row  ">
              <p className=" shrink-1 my-0 line-clamp-2 font-medium leading-5 text-slate-800  group-hover:font-semibold ">
                {tasks[rTaskId]?.title}
              </p>

              {/* <div className=" relative h-5 w-5 ml-2 opacity-100 ">
                <div
                  className={` visible absolute  left-[40%] top-0  flex  h-5 items-center justify-center rounded-r-full bg-[#B6E4F4] px-1 py-1 pr-3 text-xs font-semibold  text-black  shadow-sm`}
                >
                  <span className="ml-2 items-center">
                    {shortenAddress(traveler)}
                  </span>
                </div>
                <Avatar
                  className={`absolute top-0 left-0 h-5 w-5 `}
                  address={traveler}
                />
              </div> */}
              <div
                className={`flex shrink-0 flex-row items-center justify-center rounded-full bg-[#B6E4F4] h-fit md:px-2 md:py-1 text-xs font-semibold  text-black  shadow-sm`}
              >
                <Avatar className={`h-5 w-5 `} address={traveler} />
                <span className="ml-1 hidden items-center md:block">
                  {shortenAddress(traveler)}
                </span>
              </div>
            </div>

            <span
              onClick={clickButton}
              className={`block cursor-pointer	 transition duration-200 ${
                address !== traveler ? "text-indigo-500" : "text-gray-500"
              } `}
            >
              {address === traveler ? "My Homework" : " ✔ Click to Review"}
            </span>
          </div>
          <div className="mt-2 ml-auto flex shrink-0  items-start justify-end justify-items-end md:mt-0 md:items-end ">
            <div className="flex flex-col flex-nowrap gap-2 md:p-2">
              <div className="inline-flex w-fit items-center rounded-full bg-[#303481] px-2  py-1 text-sm font-bold text-[#D6E6F2]">
                <ClockIcon />
                <span className="ml-1">
                  {secondToDay(tasks[rTaskId]?.duration)}
                  {" days"}
                </span>
                {/* <span className="ml-1">10{" days"}</span> */}
              </div>
              <Money>
                {tasks[rTaskId]?.xp}
                <span className="ml-1 text-xs">xp</span>
              </Money>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          
        </div>
      </div> */}
    </>
  );
};

export default ReviewCard;
