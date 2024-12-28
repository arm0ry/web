import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@context/store";
import { shortenAddress } from "@utils/shortenAddress";
import { Spinner, Markdown, Avatar } from "@components";

const secondToDay = (s) => {
  return parseInt(s / 86400);
};

const ResourceCard = ({ resourceId }) => {
  const { bulletin } = useGlobalContext();
  return (
    <>
      
      <div className={`flex flex-row bg-blue-50 h-30 group relative w-full overflow-hidden rounded-lg`}>
        <div className="flex h-full w-full flex-col items-start justify-between  px-4 py-3 ">
          <label className="w-fit mx-3 font-medium text-slate-800  group-hover:font-semibold ">
            #{resourceId}.
          </label>
            
          <div
            className={`flex space-x-2 shrink-0 flex-row items-center rounded-full bg-[#B6E4F4] h-min md:px-3 md:py-2 text-sm font-semibold  text-black  shadow-sm`}
          >
            <Avatar className={`h-5 w-5 `} address={bulletin.resources[resourceId]?.owner} />
            <span className=" hidden items-center md:block">
              {shortenAddress(bulletin.resources[resourceId]?.owner)}
            </span>
          </div>
          <div className="my-3 px-3 py-2 font- text-slate-800 bg-slate-200 rounded-lg">
            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              Role: {bulletin.resources[resourceId]?.role}
            </p>

            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              Title: {bulletin.resources[resourceId]?.title}
            </p>

            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              Detail: {bulletin.resources[resourceId]?.detail}
            </p>
          </div>
        </div>

         <div className="flex  w-1/3 justify-end">
          <button
            disabled={""}
            // onClick={() => approve(ask.trades[id].id)}
            className=" rounded-lg p-3 text-black hover:bg-amber-100 bg-green-500">
            <div className="flex flex-row space-x-4 items-center justify-center">
              Donate
              {/* <div className={`${(proposeState.writeStatus == 1 || proposeState.writeStatus == 2) ? "ml-2 text-slate-500" : ""}`}>    
              {(proposeState.writeStatus === 0) && "Approve"}
              {(proposeState.writeStatus === 1) && "Pending..."}
              {(proposeState.writeStatus === 2) && "Pending..."}
              {(proposeState.writeStatus === 3) && "Success!"}
              {(proposeState.writeStatus === 4) && "Error!"}
              </div> */}
            </div>
          </button>
        </div>
      </div>

            {/* <p className="text-slate-500 line-clamp-2 my-0 mx-auto  leading-5 font-normal  group-hover:font-semibold ">
              參與人數 | # of Participants：
            </p> */}
            {/* <Link
              to={`${itemId}`}
              state={{ items: items }}
              className="block pt-4 text-indigo-500 transition duration-200"
            >
              Read Detail →
            </Link> */}
    </>
  );
};

export default ResourceCard;
