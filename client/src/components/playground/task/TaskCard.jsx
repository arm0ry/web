import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { useGlobalContext } from "@context/store";
import { Money } from "../..";
import { ClockIcon, PassIcon, WaitIcon } from "@assets";
const secondToDay = (s) => {
  return parseInt(s / 86400);
};
const TaskCard = ({ taskId, className = "" }) => {
  const { playground, userInfo } = useGlobalContext();
  const { tasks } = playground;

  // console.log(tasks)
  return (
    <>
      <div className={`relative group h-34 w-full ${className}`}>
        <div className="absolute h-full w-full -inset-1 ml-2 mt-2 bg-gradient-to-r from-[#00C3FF] via-[#fcfcc2]  to-[#fffc00] rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        {userInfo.tasks[taskId]?.state === 1 && (<div className="absolute  top-1 left-1 z-10 -rotate-45 -translate-x-1/2 -translate-y-1/2"><PassIcon className="h-8" /></div>)}
        {userInfo.tasks[taskId]?.state === 0 && (<div className="absolute  top-1 left-1 z-10 -rotate-12 -translate-x-1/2 -translate-y-1/2"><WaitIcon className="h-6" /></div>)}


        <div className="relative h-full w-full px-4 py-3 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex justify-between flex-row items-center">
          <div className="space-y-2 ml-2 ">
            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              {tasks[taskId]?.content}
            </p>

            <p className="text-slate-800 line-clamp-2 my-0 mx-auto  leading-5 font-medium  group-hover:font-semibold ">
              參與人數：  {tasks[taskId]?.completions}
            </p>
            <Link
              to={`${taskId}`}
              className="block text-indigo-500 transition duration-200"
            >
              Read Detail →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
