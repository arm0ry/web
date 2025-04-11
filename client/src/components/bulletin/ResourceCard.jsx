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

  const endorse = async () => {
    showModal({
      type: 11,
      size: "3xl",
      content: { resourceId: resourceId, balance: bulletin.user.balance, credit: bulletin.user.credit },
    });

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
        <div className="flex flex-col p-3">
          <div className="flex flex-col space-y-1 m-3 text-slate-800 w-full">
            <label className="text-slate-800 text-xl font-medium h-2/3 justify-start overflow-auto">
              {resource.title}
            </label>
            <div className={`flex py-2 space-x-2 items-center text-xs font-light text-slate-500`}>
              <Avatar className={`h-5 w-5`} address={resource.from} />
              <span>
                {(resource.from == "0xc9e677d8a064808717C2F38b5d6Fe9eE69C1fa6a") ? "Arm0ry 機器人" : shortenAddress(resource.from)}
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex flex-col w-full pb-2">
            <div className="flex justify-start text-sm items-center pl-2 py-2 text-gray-600">肯定 | Endorsements</div>
            <div className="flex w-full pb-2 h-10">
              {Object.keys(basicExchange).map((id) => {
                return (
                  <div key={id} className="flex w-1/5 ">
                    <button
                      disabled={!approve}
                      onClick={() => approve(basicExchange[id].id)}
                      className="flex rounded-lg p-1 text-black hover:bg-amber-10"
                    >
                      <div className={`${(basicExchange[id].approved) ? "" : "opacity-40"} flex w-24 space-x-2 items-center`}>
                        <Avatar className={`h-8 w-8`} address={basicExchange[id].proposer} />
                        {/* <label>x {basicExchange[id].amount}</label> */}
                      </div>
                    </button>
                  </div>
                )
              }).filter((item) => !item.stake)}
            </div>
            <div className="flex justify-start text-sm items-center pl-2 py-2 text-gray-600">投票 | Votes </div>
            <div className="flex w-full h-10">
              {Object.keys(stakedExchange).map((id) => {
                return (
                  <div key={id} className="flex w-1/5 pb-2">
                    <button
                      className="flex rounded-lg p-1 text-black hover:bg-amber-10"
                    >
                      <div className="flex space-x-2 items-center">
                        <Avatar className={`h-8 w-8`} address={stakedExchange[id].proposer} />
                        {/* <label>{stakedExchange[id].amount}</label> */}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          
          
          <div className="flex flex-row w-full">
            <button disabled={""} onClick={() => endorse()} className="w-3/4 p-3 text-black hover:bg-blue-100 bg-blue-200">
              肯定 | Endorse
            </button>
            <button disabled={""} onClick={() => stake()} className="w-1/4 p-3 text-black hover:bg-amber-100 bg-yellow-100">
              🗳️ x {calculateStaked()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceCard;
