import React from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import MissionCard from "./MissionCard";

import { useSearchParams } from "react-router-dom";

const Missions = () => {
  
  const { playground } = useGlobalContext();
  const { missions } = playground;
  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Object.keys(missions).map((id) => {
          return <MissionCard key={id} missionId={id} />;
        })}
        <div className="flex h-52 max-w-sm items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-6 ">
          <LegoBrickIcon className="mb-2 h-20 w-20 text-gray-400 " />
        </div>
        <div className="flex h-52 max-w-sm items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-6 ">
          <LegoBrickIcon className="mb-2 h-20 w-20 text-gray-400 " />
        </div>
      </div>
    </>
  );
};

export default Missions;
