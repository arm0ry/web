import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Avatar } from "@components";
import { ethers } from "ethers";
import { shortenAddress } from "@utils/shortenAddress";
import { useAccount, useContractRead } from "wagmi";
import { mBulletin } from "@contract";
import useWriteContract from "@hooks/useWriteContract";
import { pushAlert } from "@context/actions/alertAction";
import { showModal, cleanModal } from "@context/actions/modalAction";

const AskCard = ({ subjectId }) => {
  const { address, isConnected } = useAccount();
  const { bulletin } = useGlobalContext();
  const ask = bulletin.asks[subjectId];
  const exchanges = ask?.trades;

  const basicExchange = exchanges?.filter(item => !item.stake);
  const stakedExchange = exchanges?.filter(item => item.stake);
  
  const calculateStaked = () => {
    let staked = 0;
    for (let i = 0; i < stakedExchange.length; i++) {
      staked += stakedExchange[i].amount;
    }
    return staked;
  };

  const { write: approveTrade, state: approveState } = useWriteContract({
    ...mBulletin,
    functionName: "approveResponse",
  });

  const checkIn = async () => {
    if (parseInt(subjectId) == 1) {
      showModal({
       type: 12,
       size: "3xl",
       content: { subjectId: subjectId },
     });
    } else {
      showModal({
        type: 14,
        size: "3xl",
        content: { type: 0, subjectId: subjectId },
      });
    }
  };

  const approve = async (id) => {
    if (isConnected) {
      
      try {
        const tx = approveTrade({
          args: [
            subjectId,
            id,
            ethers.utils.parseUnits("2", "ether")
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

  const DisplayDataByAsk = (data) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    if (parseInt(subjectId) == 1) {
      let _data;
      try {
        _data = abiCoder.decode(["string", "string"], basicExchange[data.id].data);
      } catch (e) {
        console.log(e);
      }

      return (
        <div className="relative h-full">
          <img src={`${_data[1] ?? _data[1]}`} alt="logo" className="w-32 h-full" />
          <h1 className="absolute text-2xl text-slate-800 font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{_data[0] ?? _data[0]}</h1>
        </div>
      );
    } else if (parseInt(subjectId) == 2) { 
      let _data;
      try {
        _data = abiCoder.decode(["uint256", "string", "uint256", "string", "uint256", "string", "uint256", "string", "uint256", "string"], basicExchange[data.id].data);
      } catch (e) {
        console.log(e);
      }

      return (
        <div className="flex flex-col space-y-3 max-h-52">
          <div className="flex space-x-2  items-start">
            {parseInt(_data[0]._hex) > 0 ? <label className="text-sm border-2 border-blue-200 bg-blue-200 rounded-md px-2 py-1">{_data[1]}</label> : <label className="h-10 w-12 block px-2 py-1 "></label>}
            {parseInt(_data[2]._hex) > 0 ? <label className="text-sm border-2 border-blue-200 bg-blue-200 rounded-md px-2 py-1">{_data[3]}</label> : <label className="h-10 w-12 block px-2 py-1 "></label>}
            {parseInt(_data[4]._hex) > 0 ? <label className="text-sm border-2 border-blue-200 bg-blue-200 rounded-md px-2 py-1">{_data[5]}</label> : <label className="h-10 w-12 block px-2 py-1 "></label>}
            {parseInt(_data[6]._hex) > 0 ? <label className="text-sm border-2 border-blue-200 bg-blue-200 rounded-md px-2 py-1">{_data[7]}</label> : ""}
            {parseInt(_data[8]._hex) > 0 ? <label className="text-sm border-2 border-blue-200 bg-blue-200 rounded-md px-2 py-1">{_data[9]}</label> : ""}
          </div>
          <div className="flex items-start text-start text-sm overflow-auto">{basicExchange[data.id].content}</div>
        </div>
      );
    } else {}
  }

  return (
    <>
      <div className="flex flex-col rounded-lg justify-between border border-gray-200 bg-white p-5 shadow">
        <div className="flex flex-row justify-between w-full">
          <div className="w-full">
            <h5 className="mb-2 text-2xl font-medium text-gray-900 ">
              {ask.title}
            </h5>
            <p className="mb-5 text-sm font-light text-gray-500 line-clamp-3 overflow-scroll">
              {ask.detail}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 w-full h-full mb-4 overflow-scroll">
          {Object.keys(basicExchange).map((id) => {
            return (
              <button disabled key={id} className="flex bg-slate-200 rounded-lg p-3">
                <div className={`flex flex-col justify-between space-y-2 ${(basicExchange[id].approved) ? "" : "opacity-50"}`}>
                  {(basicExchange[id].data == 0) ? <div></div> : <DisplayDataByAsk id={id} />}
                  <div className="flex items-center space-x-2">
                    <Avatar className={`h-8 w-8`} address={basicExchange[id].proposer} />
                    <label className="text-xs text-blue-700">{(basicExchange[id].credit_limit == 0) ? "路人 | Visitor" : "參與者 | Community"}</label>
                  </div>
                </div>
              </button>
            )
          })}
          <div className={`flex ${(basicExchange.length != 0) ? "h-full" : "h-52"}  w-32 items-center justify-center rounded-lg border-4 border-dashed border-gray-200`}>
            <button onClick={() => checkIn()} className="w-24 h-full">
              <div className="flex flex-col text-gray-600">
                <label className="text-sm">分享</label>
                <label className="text-sm">Share</label>
              </div>
            </button>
          </div>
        </div>
       
        <div className="flex w-full justify-between my-2">
          <div className={`flex pt-2 space-x-2 items-center text-sm font-light text-slate-500`}>
            主辦｜Host：
            <Avatar className={`h-5 w-5`} address={ask.from} />
            <span>
              {(ask.from == "0xc9e677d8a064808717C2F38b5d6Fe9eE69C1fa6a") ? <a href={`https://sepolia.etherscan.io/address/${ask.from}`} target="_blank" rel="noreferrer" className="underline">Bot</a> : shortenAddress(ask.from)}
            </span>
          </div>
          <div className="flex w-1/3 h-full space-x-1 text-gray-700 font-medium items-baseline justify-end">
            <label className="h-full text-sm">{(ask.currency == ethers.constants.AddressZero) ? "🐚" : "💰"} {ask.drop} </label>
            <label className="h-full text-sm">{(ask.currency == ethers.constants.AddressZero) ? "信用點數 | CrΞdit" : "社群貨幣 | Currency"} </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskCard;
