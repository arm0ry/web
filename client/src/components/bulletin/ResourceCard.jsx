import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@context/store";
import { shortenAddress } from "@utils/shortenAddress";
import { Spinner, Markdown, Avatar } from "@components";
import { useAccount, useContractRead } from "wagmi";
import useWriteContract from "@hooks/useWriteContract";
import { ethers } from "ethers";
import { mBulletin, mCurrency } from "@contract";
import { showModal, cleanModal } from "@context/actions/modalAction";
import { pushAlert } from "@context/actions/alertAction";

const ResourceCard = ({ resourceId }) => {
  const { bulletin, resources } = useGlobalContext();
  const { address, isConnected } = useAccount();

  const { write: exchange, state: exchangeState } = useWriteContract({
    ...mBulletin,
    functionName: "exchange",
  });

const { write: approveExchange, state: approveState } = useWriteContract({
    ...mBulletin,
    functionName: "approveExchange",
});
  
  
const { data:  balance} = useContractRead({
  ...mCurrency,
  functionName: 'balanceOf',
  args: [address]
})
  

const approve = async (id) => {
    if (isConnected) {
      try {
        const tx = approveExchange({
          args: [
            resourceId,
            id
          ]
        })
        
        
         pushAlert({
          msg: (
            <span>
              Success! Check your transaction on
              <a
                href={`https://gnosis-chiado.blockscout.com/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="font-extrabold text-green-900"
              >
                &nbsp;Blockscout &#128279;
              </a>
            </span>
          ),
          type: "success",
        });
      } catch (error) {
        console.log(error)
      }
    }
  };

  const support = async () => {
    showModal({
       type: 11,
       size: "3xl",
       content: { resourceId: resourceId, balance: balance},
    });
  };

  return (
    <>
      <div className={`flex flex-col bg-blue-50 group relative overflow-hidden rounded-lg`}>
        <div className="flex w-full h-full flex-col items-center justify-between px-6 py-3 ">
          <div className="flex flex-col space-y-1 my-3 text-slate-800">
            <label className="text-slate-800 text-xl font-medium  group-hover:font-semibold ">
              {bulletin.resources[resourceId]?.title}
            </label>

            <div className={`flex space-x-2 py-2 items-center text-xs font-light text-slate-500`}>
              <Avatar className={`h-5 w-5`} address={bulletin.resources[resourceId]?.owner} />
              <span className="items-center">
                {shortenAddress(bulletin.resources[resourceId]?.owner)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex mx-5 space-x-2 items-center ">
          <div className="flex justify-center text-md items-center h-10 w-1/6 text-gray-600">肯定: { bulletin.resources[resourceId]?.collection}</div>
          {Object.keys(bulletin.resources[resourceId]?.exchanges).map((id) => {
            return (
              <div key={id} className="flex overflow-scroll">
                <button
                  disabled={!approve}
                  onClick={() => approve(bulletin.resources[resourceId]?.exchanges[id].id)}
                  className=" rounded-lg p-3 text-black hover:bg-amber-10"
                >
                  <div className={`${(bulletin.resources[resourceId]?.exchanges[id].approved) ? "" : "opacity-40"}`}>
                    <Avatar className={`h-10 w-10`} address={bulletin.resources[resourceId]?.exchanges[id].proposer} />
                  </div>
                </button>
              </div>
            )})}
        </div>
        
         
        <div className="flex flex-row w-full">
          <button
            disabled={""}
            onClick={() => support()}
            className="w-full p-3 text-black hover:bg-amber-100 bg-green-200">
            <div className="flex text-md items-center justify-center">
              <div className={`${(exchangeState.writeStatus == 1 || exchangeState.writeStatus == 2) ? "ml-2 text-slate-500" : ""}`}>    
              {(exchangeState.writeStatus === 0) && "交流 | Engage"}
              {(exchangeState.writeStatus === 1) && "Pending..."}
              {(exchangeState.writeStatus === 2) && "Pending..."}
              {(exchangeState.writeStatus === 3) && "Success!"}
              {(exchangeState.writeStatus === 4) && "Error!"}
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ResourceCard;
