import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import ResourceCard from "./ResourceCard";
import { LegoBrickIcon } from "@assets";
import { showModal } from "@context/actions/modalAction";
import { Spinner, Markdown, Avatar } from "@components";

const Resources = () => {
  const { bulletin } = useGlobalContext();

  const addResource = () => {
    showModal({
       type: 12,
       size: "3xl",
       content: {},
     });
  }

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <label className="p-4 m-2 text-2xl font-semibold text-slate-600">
        第零次專案列表 | hackath0n-chain projects
      </label>
      
      <div className="grid grid-cols-3 gap-5">
        {Object.keys(bulletin.resources).map((id) => {
          return <ResourceCard key={id} resourceId={id} />;
        })}
        
        <div className="flex w-full space-x-5">
          {(Object.keys(bulletin.resources).length == 0) ?
            <div className="flex flex-col justify-between bg-blue-50 rounded-lg  h-64">
            <div className="flex flex-col p-3">
              <div className="flex flex-col space-y-1 my-3 text-slate-800 w-96">
                <label className="text-slate-800 text-xl font-medium justify-start overflow-auto">
                  Loading...
                </label>
                <div className={`flex py-2 space-x-2 items-center text-xs font-light text-slate-500`}>
                  <Avatar className={`h-5 w-5`} address={0} />
                  <span>
                    Arm0ry 機器人
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-start text-sm items-center pl-2 py-2 text-gray-600">肯定 | Endorsements</div>
              <div className="flex justify-start text-sm items-center pl-2 py-2 text-gray-600">牛排 | Stakes</div>
            </div>
            <div className="flex flex-row w-full">
              <button disabled={""} className="w-3/4 p-3 text-black hover:bg-blue-100 bg-blue-200">
                肯定 | Endorse
              </button>
              <button disabled={""} className="w-1/4 p-3 text-black hover:bg-amber-100 bg-yellow-100">
                🥩
              </button>
            </div>
          </div>
            : <></>}
          
          <button onClick={addResource} className="flex w-full h-64 items-center justify-center rounded-lg border-4 border-dashed border-gray-200">
            <LegoBrickIcon className="h-12 w-12 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
