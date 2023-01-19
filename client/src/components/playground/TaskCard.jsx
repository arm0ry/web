import React, { useEffect, useState } from "react";
import Loader from "./Loader";

import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import { getContract } from "@wagmi/core";
import { Arm0ryMissions } from "../../contract";

const TaskCard = ({ taskId }) => {
  const [details, setDetails] = useState(undefined);
  // const { data: tasksdata, isLoading, isFetched } = useContractRead({
  //   ...Arm0ryMissions,
  //   functionName: 'tasks',
  //   args:[taskId]
  // })
  // useEffect(() => {
  //   if( isFetched){
  //     setDetails(JSON.parse(tasksdata.details))
  //   }
  // }, [tasksdata])
  const RPC = "https://rpc.ankr.com/eth_goerli";

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(RPC);
      const contract = await getContract({
        ...Arm0ryMissions,
        signerOrProvider: provider,
      });
      const tasksdata = await contract.tasks(taskId);
      console.log(tasksdata);
      setDetails({
        ...JSON.parse(tasksdata.details),
        xp: tasksdata.xp,
        expiration: tasksdata.expiration,
      });
    })();
  }, []);

  return (
    <>
      {details === undefined ? (
        <Loader />
      ) : (
        <div className="flex md:flex-row bg-amber-50 rounded-2xl flex-col">
          <div className="w-full grid grid-cols-1 md:grid-cols-[7.3fr_2.3fr] p-6">
            <div className="flex  w-full gap-1 flex-col items-start">
              <h4 className="text-blue text-xl leading-9 font-bold">
                {details?.title}
              </h4>
              <p className="text-black text-base leading-6">
                {details?.xp} points
              </p>
              <p className="text-black text-base leading-6">
                {details?.detail}
              </p>
            </div>
            <div className="flex mt-2 md:mt-0 items-start justify-start md:items-end md:justify-end">
              <div className="flex md:p-3 flex-col flex-nowrap">
                <p className="text-black font-bold text-base leading-6">
                  Expiration
                </p>
                <button disabled="">
                  <p className="text-blue font-bold text-base leading-6">
                    {details?.expiration}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
