import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import ResourceCard from "./ResourceCard";

const Resources = () => {
  const { bulletin } = useGlobalContext();
  const navigate = useNavigate();
  // console.log(playground.tasks)
  return (
    <div className="flex flex-col h-screen">
      <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Resources
        </label>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 p-4">
        {/* {Object.keys(tasks).map((id) => {
          return <ItemCard key={id} taskId={id} />;
        })} */}
      </div>
      <div className="m-4 grid grid-cols-2 gap-5 xl:grid-cols-3 2xl:grid-cols-4">
        {Object.keys(bulletin.resources).map((id) => {
          return <ResourceCard key={id} resourceId={id} />;
        })}
      </div>
    </div>
  );
};

export default Resources;
