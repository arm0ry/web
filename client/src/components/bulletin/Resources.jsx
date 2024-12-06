import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import ItemCard from "./ResourceCard";

const Resources = () => {
  const { playground } = useGlobalContext();
  const { tasks } = playground;
  const navigate = useNavigate();
  // console.log(playground.tasks)
  return (
    <div className="h-screen">
      <div>Resource</div>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 p-4">
        {/* {Object.keys(tasks).map((id) => {
          return <ItemCard key={id} taskId={id} />;
        })} */}
      </div>
    </div>
  );
};

export default Resources;
