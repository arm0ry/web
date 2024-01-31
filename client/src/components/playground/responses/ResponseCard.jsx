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
const ResponseCard = ({ id, responses }) => {
  const { playground } = useGlobalContext();
  const { tasks } = playground;

  useEffect(() => {
    // console.log(tasks)
  }, [responses, id])

  return (
    <>
      <div className={`h-30 group relative w-full overflow-hidden`}>
        <div className="absolute -inset-1 ml-2 mt-2 h-full w-1/2 rounded-lg bg-gradient-to-r  opacity-20 blur transition duration-1000"></div>
        <label className="w-full my-5 font-3xl text-slate-800 font-bold ">
          {tasks[id]?.content}
        </label>
        <div className="relative flex h-full w-full flex-row items-center justify-between space-x-5  px-4 py-3 leading-none">
          {responses.map((response, id) => {
            return <div key={id} className="flex flex-row w-full bg-slate-100 rounded-lg">
              <div className="flex flex-col w-full ">
                <div className="flex flex-row w-full items-center ">
                  <label className="w-fit my-5 mx-3 font-medium text-slate-800  group-hover:font-semibold ">
                    🎉
                  </label>
                  <div
                    className={`flex shrink-0 flex-row items-center rounded-full bg-[#B6E4F4] h-min md:px-2 md:py-1 text-sm font-semibold  text-black  shadow-sm`}
                  >
                    <Avatar className={`h-5 w-5 `} address={response.user} />
                    <span className="ml-1 hidden items-center md:block">
                      {shortenAddress(response.user)}
                    </span>
                  </div>
                </div>
                <div className="ml-5 my-2 font-medium text-slate-500" >
                  參與心得：


                </div>
                <div className="ml-5 mt-2 mb-4 font-medium text-slate-800">
                  {response.feedback}
                </div>
              </div>
              <div
                className={`flex shrink-0 flex-row items-center justify-center rounded-full bg-[#B6E4F4] h-fit md:px-2 md:py-1 text-xs font-semibold  text-black  shadow-sm`}
              >
                <span className="ml-1 hidden items-center md:block">
                  選擇：{response.response}
                </span>
              </div>
            </div>;
          })}





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
