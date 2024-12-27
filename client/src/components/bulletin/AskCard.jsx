import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Spinner } from "@components";
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

  const { write: proposeTrade, state: proposeState } = useWriteContract({
    ...mBulletin,
    functionName: "trade",
  });

  const { write: approveTrade, state: approveState } = useWriteContract({
    ...mBulletin,
    functionName: "approveTrade",
  });

  const { data: hasAnyRole } = useContractRead({
    ...mBulletin,
    functionName: 'hasAnyRole',
    args: [address, 2]
  })

   const { data: owner } = useContractRead({
    ...mBulletin,
    functionName: 'owner',
    args: []
  })

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
          <div className="flex flex-col">
            <div className="text-md">今日心情：</div>
            <div className="flex flex-row space-x-2">
              <div className="text-sm">{_data[0] ? "🥰" : ""}</div>
              <div className="text-sm">{_data[1] ? "😃" : ""}</div>
              <div className="text-sm">{_data[2] ? "🤫" : ""}</div>
              <div className="text-sm">{_data[3] ? "😋" : ""}</div>
              <div className="text-sm">{_data[4] ? "🫡" : ""}</div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
           <div className="flex flex-col">
            <div className="text-md">今日心情：</div>
            <div className="flex flex-row space-x-2">
            </div>
          </div>
        </>
      );
    }
  }

  const ButtonNameByAsk = () => {
    if (parseInt(askId) == 1) {
      return "Check-in";
    } else {
      return "Tally";
    }
  }

  useEffect(() => {
  }, [ask])

  return (
    <>
      <div className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow">
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              {ask.title}
            </h5>
            <p className="mb-3 font-normal text-gray-500 line-clamp-3 ">
              {ask.detail}
            </p>
          </div>
          {(owner || hasAnyRole) ? ( <div className="flex items-center justify-end w-1/2">
              <button
                  disabled={proposeState.writeStatus > 0 }
                  onClick={() => checkIn()}
                className="w-1/2 rounded-lg p-3 text-black hover:bg-amber-100 bg-amber-200"
              >
              <div className="flex flex-row space-x-4 items-center justify-center">
                  <div className={`${(proposeState.writeStatus == 1 || proposeState.writeStatus == 2) ? "ml-2 text-slate-500" : ""}`}>    
                  {(proposeState.writeStatus === 0) && ButtonNameByAsk()}
                  {(proposeState.writeStatus === 1) && "Pending..."}
                  {(proposeState.writeStatus === 2) && "Pending..."}
                  {(proposeState.writeStatus === 3) && "Success!"}
                  {(proposeState.writeStatus === 4) && "Error!"}
                  </div>
                
              </div>
              </button>
            </div>) : (<></>)}
        </div>

        <div className="grid grid-rows-5 grid-flow-col gap-2 bg-purple-50 w-full">
          {Object.keys(ask.trades).map((id) => {
            return (
              <div key={id} className="flex flex-row bg-slate-200 rounded-lg w-full">
                <div className="flex flex-col w-full space-y-2">
                  {/* <div>Trade ID: {ask.trades[id].id}</div> */}
                  {/* <div>
                    Approved: {(ask.trades[id].approved) ? "true" : "false"}
                  </div> */}
                  <div>Role: {ask.trades[id].role}</div>
                  <div>參與者: {shortenAddress(ask.trades[id].proposer)}</div>
                  {/* <div>Resource: {ask.trades[id].resource}</div> */}
                  {/* <div>Commentary: {ask.trades[id].feedback}</div> */}
                  {(ask.trades[id].data == 0) ? <div></div> : <DisplayDataByAsk id={id} />}
                  
                </div>
                {(ask.trades[id].approved) ? <div className="flex h-full p-4 justify-center items-center">✅</div> :
                  <button
                    disabled={!approve}
                    onClick={() => approve(ask.trades[id].id)}
                    className=" rounded-lg p-3 text-black hover:bg-amber-100 bg-green-500"
                  >
                    <div className="flex flex-row space-x-4 items-center justify-center">
                  <div className={`${(proposeState.writeStatus == 1 || proposeState.writeStatus == 2) ? "ml-2 text-slate-500" : ""}`}>    
                  {(proposeState.writeStatus === 0) && "Approve"}
                  {(proposeState.writeStatus === 1) && "Pending..."}
                  {(proposeState.writeStatus === 2) && "Pending..."}
                  {(proposeState.writeStatus === 3) && "Success!"}
                  {(proposeState.writeStatus === 4) && "Error!"}
                  </div>
                
              </div>
                  </button>}
                
              </div>
            )
          // return <ResourceCard key={id} resourceId={id} />;
          })}
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
