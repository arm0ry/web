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
  const { bulletin } = useGlobalContext();
  const { address, isConnected } = useAccount();
  const resource = bulletin.resources[resourceId];
  const exchanges = bulletin.resources[resourceId].exchanges;
  const EXCHANGE = 1;

  const basicExchange = exchanges.filter(item => !item.stake);
  const stakedExchange = exchanges.filter(item => item.stake);

  const calculateStaked = () => {
    let staked = 0;
    for (let i = 0; i < stakedExchange.length; i++) {
      staked += stakedExchange[i].amount;
    }
    return staked;
  };
  
  const { write: approveExchange, state: approveState } = useWriteContract({
    ...mBulletin,
    functionName: "approveExchange",
  });
  

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

  const stake = async () => {
    showModal({
      type: 13,
      size: "3xl",
      content: { type: EXCHANGE, subjectId: resourceId },
    });
  };

  return (
    <>
      <div className={`flex flex-col bg-blue-50 justify-between rounded-lg`}>
        <div className="flex flex-col px-3 pt-3">
          
          <div className="relative w-full h-full">
            <img src={`https://ipfs.io/ipfs/${resource.detail}`} alt="logo" className="rounded-sm" />
            <h1 className="absolute text-2xl text-slate-800 font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{resource.title}</h1>
          </div>
          <div className="flex justify-end p-2 text-slate-800">
            <div className={`flex pt-2 space-x-2 items-center text-sm font-light text-slate-500`}>
              <Avatar className={`h-5 w-5`} address={resource.from} />
              <span>
                {(resource.from == "0xc9e677d8a064808717C2F38b5d6Fe9eE69C1fa6a") ? <a href={`https://sepolia.etherscan.io/address/${resource.from}`} target="_blank" rel="noreferrer" className="underline">Arm0ry</a> : shortenAddress(resource.from)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="">
          <div className="flex flex-col pb-2">
            <div className="flex flex-col p-2 h-20 overflow-scroll">
              {Object.keys(exchanges).map((id) => {
                return (
                  <div key={id} className="flex">
                    <button
                      disabled={!approve}
                      onClick={() => approve(exchanges[id].id)}
                      className="flex rounded-lg p-1 text-black hover:bg-amber-10"
                    >
                      <div className={`${(exchanges[id].stake) ? "" : "opacity-40"} flex space-x-2 text-start items-center`}>
                        <Avatar className={`h-8 w-8`} address={exchanges[id].proposer} />
                        <label className="text-sm">{exchanges[id].content}</label>
                      </div>
                    </button>
                  </div>
                )
              }).filter((item) => !item.stake)}
            </div>
          </div>
          
          
          <div className="flex flex-row w-full">
            <button disabled={""} onClick={() => stake()} className="w-full py-2 text-black rounded-sm hover:bg-blue-100 bg-blue-200">
              互動 | Engage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceCard;
