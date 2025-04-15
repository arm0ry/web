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

const AskCard = ({ askId }) => {
  const { address, isConnected } = useAccount();
  const { bulletin } = useGlobalContext();
  const ask = bulletin.asks[askId];
  const exchanges = ask?.trades;
  const RESPONSE = 0;

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
    if (parseInt(askId) == 1) {
      showModal({
       type: 12,
       size: "3xl",
       content: { askId: askId },
     });
    } else {
      showModal({
       type: 10,
       size: "3xl",
       content: { askId: askId },
     });
    }
  };

  const stake = async () => {
      showModal({
        type: 13,
        size: "3xl",
        content: { type: RESPONSE, subjectId: askId },
      });
    };

  const approve = async (id) => {
    if (isConnected) {
      
      try {
        const tx = approveTrade({
          args: [
            askId,
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
    if (parseInt(askId) == 1) {
      let _data;
      try {
        _data = abiCoder.decode(["string", "string"], basicExchange[data.id].data);
      } catch (e) {
        console.log(e);
      }

      return (
        <div className="relative">
          <img src={`${_data[1] ?? _data[1]}`} alt="logo" className="w-32" />
          <h1 class="absolute text-3xl text-slate-800 font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{_data[0] ?? _data[0]}</h1>
        </div>
      );
    } else if (parseInt(askId) == 2) { 
      let _data;
      try {
        _data = abiCoder.decode(["uint256", "string", "uint256", "string", "uint256", "string", "uint256", "string", "uint256", "string"], basicExchange[data.id].data);
      } catch (e) {
        console.log(e);
      }

      return (
        <>
          <div className="flex flex-col items-start">
            {parseInt(_data[0]._hex) > 0 ? <label className="text-sm whitespace-nowrap">{_data[1]}</label> : ""}
            {parseInt(_data[2]._hex) > 0 ? <label className="text-sm whitespace-nowrap">{_data[3]}</label> : ""}
            {parseInt(_data[4]._hex) > 0 ? <label className="text-sm whitespace-nowrap">{_data[5]}</label> : ""}
            {parseInt(_data[6]._hex) > 0 ? <label className="text-sm whitespace-nowrap">{_data[7]}</label> : ""}
            {parseInt(_data[8]._hex) > 0 ? <label className="text-sm whitespace-nowrap">{_data[9]}</label> : ""}
          </div>
        </>
      );
    } else {}
  }

  useEffect(() => {
  }, [ask])

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
          <div className="flex w-full items-start justify-end rounded-md">
            <button onClick={() => stake()} className="flex items-center justify-center rounded-full py-4 px-4 text-black hover:bg-amber-100 bg-yellow-100">
              🗳️ x {calculateStaked()}
            </button>
          </div>
          
        </div>

        <div className="flex space-x-2 w-full h-full mb-4 overflow-scroll">
          {Object.keys(basicExchange).map((id) => {
            return (
              <button disabled={basicExchange[id].approved} onClick={() => approve(basicExchange[id].id)} key={id} className="flex h-full bg-slate-200 rounded-lg p-3">
                <div className={`flex flex-col space-y-2 ${(basicExchange[id].approved) ? "" : "opacity-50"}`}>
                  {(basicExchange[id].data == 0) ? <div></div> : <DisplayDataByAsk id={id} />}
                  <div className="flex items-center space-x-2">
                    <Avatar className={`h-8 w-8`} address={basicExchange[id].proposer} />
                    {/* <label className="text-xs">{shortenAddress(basicExchange[id].proposer)}</label> */}
                    <label className="text-xs text-blue-700">{(basicExchange[id].credit_limit == 0) ? "路過 | Visitor" : "參與者 | Community"}</label>
                  </div>
                </div>
              </button>
            )
          })}
          <div className={`flex ${(basicExchange.length != 0) ? "h-full" : "h-52" } w-32 items-center justify-center rounded-lg border-4 border-dashed border-gray-200`}>
            <button onClick={() => checkIn()} className="w-24 h-full">
              <div className="flex flex-col text-gray-600">
                <label className="text-sm">分享</label>
                <label className="text-sm">Share</label>
              </div>
            </button>
          </div>
        </div>
       
        <div className="flex w-full justify-between my-2">
          <div className="font-extralight text-sm">主辦: <a href={`https://sepolia.etherscan.io/address/${ask.from}`} target="_blank" rel="noreferrer" className="underline">
            {(ask.from == "0xc9e677d8a064808717C2F38b5d6Fe9eE69C1fa6a") ? "Arm0ry 機器人" : shortenAddress(ask.from)}
          </a>
          </div>
          <div className="flex w-1/3 h-full space-x-1 text-gray-700 font-medium items-baseline justify-end">
            <label className="h-full text-sm">{(ask.currency == ethers.constants.AddressZero) ? "🐚" : "💰"} {ask.drop} </label>
            <label className="h-full text-sm">{(ask.currency == ethers.constants.AddressZero) ? "信用貝幣 | CrΞdit" : "社群貨幣 | Currency"} </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskCard;
