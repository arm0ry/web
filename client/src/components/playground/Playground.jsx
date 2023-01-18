import React, { useState, useEffect, useMemo } from "react";

import { useContractRead } from 'wagmi'
import { ADDRESS, ABI } from "../../contract";

import WalletBar from "../WalletBar"
import TaskCard from "./TaskCard"




// const svg = avatar.toString();

const Playground = () => {
  const { data: taskIDdata, isError, isSuccess, isLoading } = useContractRead({
    address: ADDRESS,
    abi: ABI,
    functionName: 'taskId',
  })

  
  return (
    <>
      <div className="container">
        <WalletBar/>
        <div className="flex flex-col gap-3">
        {[...Array(taskIDdata)].map((_, i)=>{
          return(<TaskCard taskId={i+1}/>)
          }
        )}
        {}
        </div>
      </div>
    </>
  );
};

export default Playground;
