import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import ItemCard from "./ItemCard";

const Tasks = () => {
  const { playground } = useGlobalContext();
  const navigate = useNavigate();
  // console.log(playground.tasks)
  return (
    <>
      {/* <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 p-4">
        {tasks.map((data, i) => {
          return <ItemCard key={i} taskdata={{...data, id:i+1}} />;
        })}
      </div> */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 p-4">
        {Object.keys(playground.tasks).map((id) => {
          return <ItemCard key={id} taskId={id} />;
        })}
      </div>
    </>
  );
};

export default Tasks;
