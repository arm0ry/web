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

  const { write: approveTrade, state: approveState } = useWriteContract({
    ...mBulletin,
    functionName: "approveResponse",
  });

  const checkIn = async () => {
    if (parseInt(askId) == 1) {
      showModal({
       type: 9,
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
        _data = abiCoder.decode(["bool", "bool", "bool", "bool", "bool"], ask.trades[data.id].data);
      } catch (e) {
        console.log(e);
      }

      return (
        <>
          <div className="flex flex-col items-start">
            <div className="text-xs text-gray-700 mb-1">自我介紹:</div>
            <div className="flex flex-col  items-start">
              <div className="text-sm">{_data[0] ? "我是新手" : ""}</div>
              <div className="text-sm">{_data[1] ? "我想入坑" : ""}</div>
              <div className="text-sm">{_data[2] ? "我想開坑" : ""}</div>
              <div className="text-sm">{_data[3] ? "我想拉人入坑" : ""}</div>
              <div className="text-sm">{_data[4] ? "我來逛逛" : ""}</div>
            </div>
          </div>
        </>
      );
    } else if (parseInt(askId) == 2) { 
      let _data;
      try {
        _data = abiCoder.decode(["bool", "bool", "bool", "bool", "bool"], ask.trades[data.id].data);
      } catch (e) {
        console.log(e);
      }

      return (
        <>
          <div className="flex flex-col items-start">
            <div className="text-xs text-gray-700 mb-1">自備:</div>
            <div className="flex flex-col items-start">
              <div className="text-sm">{_data[0] ? "筷子 🥢" : ""}</div>
              <div className="text-sm">{_data[1] ? "叉子 🍴" : ""}</div>
              <div className="text-sm">{_data[2] ? "湯匙 🥄" : ""}</div>
              <div className="text-sm">{_data[3] ? "水壺 🫙" : ""}</div>
              <div className="text-sm">{_data[4] ? "吸管" : ""}</div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
           <div className="flex flex-col">
            <div className="text-xs text-gray-700 mb-1">自我介紹 | Introduction：</div>
            <div className="flex text-gray-400">
              ...
            </div>
          </div>
        </>
      );
    }
  }

  const ButtonNameByAsk = () => {
    if (parseInt(askId) == 1) {
      return "報到 Check-in";
    } else {
      return "分享 Share";
    }
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
            <p className="mb-3 text-sm font-light text-gray-500 line-clamp-3 ">
              {ask.detail}
            </p>
          </div>
          <div className="flex w-1/3 items-center justify-end">
              <button
                  onClick={() => checkIn()}
                className="rounded-lg p-3 text-black hover:bg-amber-100 bg-amber-200"
              >
              <div className="flex flex-row space-x-4 items-center justify-center">
                {ButtonNameByAsk()}
              </div>
              </button>
          </div>
          
        </div>

        <div className="flex space-x-2 w-full overflow-auto">
          {Object.keys(ask.trades).map((id) => {
            return (
              <button disabled={ask.trades[id].approved} onClick={() => approve(ask.trades[id].id)} key={id} className="flex bg-slate-200 rounded-lg w-1/5">
                <div className={`flex flex-col w-full h-full space-y-1 items-start justify-start  ${(ask.trades[id].approved) ? "" : "opacity-50"}`}>
                  <Avatar className={`h-10 w-10`} address={ask.trades[id].proposer} />
                  <label className="text-xs">{shortenAddress(ask.trades[id].proposer)}</label>
                  <label className="text-xs text-blue-700 pb-2">{(ask.trades[id].credit_limit == 0) ? "遊客" : "新參者"}</label>
                  {(ask.trades[id].data == 0) ? <div></div> : <DisplayDataByAsk id={id} />}
                </div>
              </button>
            )
          })}
        </div>
       
        <div className="flex w-full justify-between my-2">
          <div className="font-extralight text-sm">主辦: <a href={`https://sepolia.etherscan.io/address/${ask.from}`} target="_blank" rel="noreferrer" className="underline">
            {(ask.from == "0xc9e677d8a064808717C2F38b5d6Fe9eE69C1fa6a") ? "Arm0ry 機器人" : shortenAddress(ask.from)}
          </a>
          </div>   
          <div className="flex w-1/3 h-full space-x-1 text-gray-700 font-medium items-baseline justify-end">
            <label className="h-full text-sm">💰 {ask.drop} </label>
            <label className="h-full text-sm">{(ask.currency == ethers.constants.AddressZero) ? "互惠信用 | CrΞdit" : "社群貨幣 | Currency"} </label>
          </div>
        </div>
        
      
        {/* <Link
          to={askId}
          className="mt-auto inline-flex items-center text-blue-600 hover:underline"
        >
          Read Detail →
        </Link> */}
      </div>
    </>
  );
};

export default AskCard;
