import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import { useContractRead, useAccount, useProvider } from "wagmi";
import { getContract } from "@wagmi/core";
import { Arm0ryMissions,RPC } from "../../contract";

import{useGlobalContext} from "../../context/store"

import WalletBar from "../WalletBar";
import TaskCard from "./TaskCard";

// const svg = avatar.toString();

const Playground = () => {
  const{tasks}= useGlobalContext()
  const navigate = useNavigate();

  return (
    <>
      <div className="container min-h-screen">
        <WalletBar />
        {/* <p>{dc}</p> */}
        <div className="flex flex-col gap-3">
          {/* {isConnected &&
            } */}
            {tasks.map((data,i) => {
              return <TaskCard key={i} taskdata={data} />;
            })}
        </div>
        <button
          type="button"
          onClick={() => navigate("/playground/proposeTask")}
          className=" transition duration-300 ease-in-out w-fit text-gray bg-yellow-200 hover:ring-4 hover:ring-yellow-200 focus:ring-2 rounded-lg text-base  px-3 py-2 mt-3 text-center"
        >
          Propose Task
        </button>
      </div>
    </>
  );
};

export default Playground;
