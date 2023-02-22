import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useGlobalContext } from "@context/store";
import TaskCard from "./TaskCard";

const MissionDetail = () => {
  const { missions } = useGlobalContext();
  const params = useParams();
  const missionId = params.id;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(missions);
    if (Object.keys(missions).length > 0) {
      if (missions[missionId] === undefined) {
        return navigate("/playground/missions");
      }
    }
  }, [missions]);

  return (
    <>
      <div className="mx-auto max-w-[1024px]">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
        >
          <span className="text-base font-medium">←Go Back</span>
        </button>
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-6">
          {missions[missionId]?.taskIds.map((id, i) => {
            if(i%2 === 0){
              return <><TaskCard key={id} taskId={id} className={"md:col-start-2 md:col-span-3"} /></>
            }else{
              return <><TaskCard key={id} taskId={id} className={"md:col-start-3 md:col-span-3"} /></>
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MissionDetail;
