import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import { useContractRead, useAccount, useProvider } from "wagmi";
import { getContract } from "@wagmi/core";
import { Arm0ryMissions, RPC } from "../../contract";

import { useGlobalContext } from "@context/store";

import TaskCard from "./TaskCard";

// const svg = avatar.toString();

const Tasks = () => {
  const { tasks, tasksDetail } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 p-4">
        {tasks.map((data, i) => {
          return <TaskCard key={i} taskdata={{...data, id:i+1}} />;
        })}
      </div>
    </>
  );
};

export default Tasks;
