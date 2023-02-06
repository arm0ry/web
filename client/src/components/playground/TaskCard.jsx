import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Spinner from "../Spinner";

import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import { getContract } from "@wagmi/core";
import { Arm0ryMissions } from "../../contract";

import { Money } from "../";
import { ClockIcon } from "@assets";
const secondToDay = (s) => {
  return parseInt(s / 86400);
};
const TaskCard = ({ taskdata }) => {

  // const { data: tasksdata, isLoading, isFetched } = useContractRead({
  //   ...Arm0ryMissions,
  //   functionName: 'tasks',
  //   args:[taskId]
  // })
  // useEffect(() => {
  //   setDetails(JSON.parse(taskdata.details))
  // }, [])

  return (
    <>
      <div className="relative group h-30 w-full">
        <div className="absolute h-full w-full -inset-1 ml-2 mt-2 bg-gradient-to-r from-[#00C3FF] via-[#fcfcc2]  to-[#fffc00] rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative h-full w-full px-4 py-3 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex justify-between flex-row items-center space-x-1">
          <div className="space-y-2 ml-2 ">
            <p className="text-slate-800 line-clamp-2 leading-5 font-medium  group-hover:font-semibold ">
              {taskdata?.title}Arm0ry
            </p>
            <Link
              to={`${taskdata?.id}`}
              className="block text-indigo-500 transition duration-200"
            >
              Read Detail →
            </Link>
          </div>
          <div className="justify-items-end flex mt-2 ml-auto  min-w-[7rem] md:mt-0 items-start justify-start md:items-end md:justify-end">
            <div className="flex md:p-2 flex-col flex-nowrap gap-2">
              <div class="inline-flex items-center w-fit px-2 py-1 bg-[#303481]  rounded-full text-sm font-bold text-[#D6E6F2]">
                <ClockIcon />
                <span class="ml-1">{secondToDay(taskdata?.expiration)}{" days"}</span>
                {/* <span class="ml-1">10{" days"}</span> */}
              </div>
              <Money>
                {taskdata?.xp}<span className="text-xs ml-1">AMG</span>
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

export default TaskCard;
