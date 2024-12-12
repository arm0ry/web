import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Spinner } from "@components";
import { ethers } from "ethers";
import { shortenAddress } from "@utils/shortenAddress";
import { useAccount, useContractRead } from "wagmi";
import { mBulletin } from "@contract";
import useWriteContract from "@hooks/useWriteContract";


const AskCard = ({ askId }) => {
  const { address, isConnected } = useAccount();
  const { bulletin } = useGlobalContext();
  const ask = bulletin.asks[askId];
  console.log(ask.trades)
  const [inPrepare, setInPrepare] = useState(false);

  const { write: proposeTrade } = useWriteContract({
    ...mBulletin,
    functionName: "trade",
  });

  const { write: approveTrade } = useWriteContract({
    ...mBulletin,
    functionName: "approveTrade",
  });

  const { data: hasAnyRole } = useContractRead({
    ...mBulletin,
    functionName: 'hasAnyRole',
    args: [address, 2]
  })

  const checkIn = async () => {
    let structuredData = ethers.constants.HashZero;
    let role = ethers.BigNumber.from(2);

    if (isConnected) {
      setInPrepare(true);

      try {
        proposeTrade({
          args: [
            askId,
          {
            approved: true,
            role: role,
            proposer: address,
            resource: structuredData,
            feedback: "TEST CHECKIN",
            data: structuredData
          }
          ]
        })
        
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    }
  };

  const approve = async (id) => {
   console.log(id)
    if (isConnected) {
      setInPrepare(true);

      try {
        approveTrade({
          args: [
            askId,
            id++
          ]
        })
        
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    }
  };


  useEffect(() => {

    // console.log(bulletin, askId, ask.trades)
console.log(ask.trades)

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
          {hasAnyRole ? ( <div className="flex items-center justify-end w-1/2">
              <button
                  disabled={inPrepare}
                  onClick={() => checkIn()}
                className=" w-1/2 rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-amber-200"
              >
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <label className=" block text-md font-normal text-gray-700">
                    Check-in
                  </label>
              </div>
              </button>
            </div>) : (<></>)}
        </div>

        <div className="grid grid-rows-5 grid-flow-col gap-2 bg-purple-50 w-full">
          {Object.keys(ask.trades).map((id) => {
            return (
              <div key={id} className="flex flex-row bg-slate-200 rounded-lg w-full">
                <div className="flex flex-col w-full">
                  <div>
                    Approved: {(ask.trades[id].approved) ? "true" : "false"}
                  </div>
                  <div>Role: {ask.trades[id].role}</div>
                  <div>Proposer: {shortenAddress(ask.trades[id].proposer)}</div>
                  <div>Resource: {ask.trades[id].resource}</div>
                  <div>Feedback: {ask.trades[id].feedback}</div>
                  <div>Data: {ask.trades[id].data}</div>
                </div>
                {(ask.trades[id].approved) ? "" :
                  <button
                    disabled={!approve}
                    onClick={() => approve(id)}
                    className=" rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-green-500"
                  >
                    <div className="flex flex-row space-x-4 items-center justify-center">
                    <label className=" text-md font-normal text-gray-700">
                      Approve
                    </label>
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
