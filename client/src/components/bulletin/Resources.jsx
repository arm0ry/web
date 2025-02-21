import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import ResourceCard from "./ResourceCard";
import { LegoBrickIcon } from "@assets";
import { showModal } from "@context/actions/modalAction";

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
          大松專案列表 | hackath65n Projects 
      </label>
      <div className="grid grid-cols-3 gap-5">
        {Object.keys(bulletin.resources).map((id) => {
          return <ResourceCard key={id} resourceId={id} />;
        })}
        <div className="flex w-full h-24 items-center justify-center rounded-lg border-4 border-dashed border-gray-200">
          <button onClick={addResource}>
            <LegoBrickIcon className="h-12 w-12 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
