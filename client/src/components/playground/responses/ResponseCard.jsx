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
const ResponseCard = ({ user, taskId, response, feedback }) => {
  const { playground } = useGlobalContext();
  const { tasks } = playground;
  const { address, isConnected, isDisconnected } = useAccount();

  const clickButton = () => {
    // showModal({
    //   type: 6,
    //   size: "3xl",
    //   content: { traveler, taskId: rTaskId, taskHomework, questing },
    // });
  };


  return (
    <>
      <div className={`h-30 group relative w-full overflow-hidden`}>
        <div className="absolute -inset-1 ml-2 mt-2 h-full w-1/2 rounded-lg bg-gradient-to-r from-[#00C3FF]  via-[#fcfcc2] to-[#fffc00] opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
        <div className="relative flex h-full w-full flex-row items-center justify-between space-x-1 rounded-lg bg-white px-4 py-3 leading-none ring-1 ring-gray-900/5">
          <div className="flex flex-row w-full bg-slate-200">
            <div className="flex flex-col w-full bg-slate-200">
              <div className="flex flex-col w-full  bg-slate-400">
                <div className="flex flex-row w-full items-center bg-slate-300">
                  <label className="w-fit my-5 mx-3 font-medium text-slate-800  group-hover:font-semibold ">
                    🎉
                  </label>
                  <div
                    className={`flex shrink-0 flex-row items-center rounded-full bg-[#B6E4F4] h-min md:px-2 md:py-1 text-sm font-semibold  text-black  shadow-sm`}
                  >
                    <Avatar className={`h-5 w-5 `} address={user} />
                    <span className="ml-1 hidden items-center md:block">
                      {shortenAddress(user)}
                    </span>
                  </div>
                  <label className="w-full my-5 mx-3 font-medium text-slate-800  group-hover:font-semibold ">
                    成功完成：
                  </label>
                </div>
                <label className="w-full my-5 font-medium text-slate-800  group-hover:font-semibold ">
                  "{tasks[taskId]?.content}"
                </label>
              </div>
              <div className="my-5 font-medium text-slate-800" >
                <span className="ml-1 hidden items-center md:block">
                  參與心得：{feedback}
                </span>

              </div>
            </div>
            <div
              className={`flex shrink-0 flex-row items-center justify-center rounded-full bg-[#B6E4F4] h-fit md:px-2 md:py-1 text-xs font-semibold  text-black  shadow-sm`}
            >
              <span className="ml-1 hidden items-center md:block">
                選擇：{response}
              </span>
            </div>
          </div>


          {/* <span
              onClick={clickButton}
              className={`block cursor-pointer	 transition duration-200 ${address !== traveler ? "text-indigo-500" : "text-gray-500"
                } `}
            >
            </span> */}
          {/* <div className="mt-2 ml-auto flex shrink-0  items-start justify-end justify-items-end md:mt-0 md:items-end ">
            <div className="flex flex-col flex-nowrap gap-2 md:p-2">
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ResponseCard;
