import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@context/store";
import { shortenAddress } from "@utils/shortenAddress";
import { Spinner, Markdown, Avatar } from "@components";
import { useAccount, useContractRead } from "wagmi";
import useWriteContract from "@hooks/useWriteContract";
import { ethers } from "ethers";
import { mBulletin } from "@contract";
import { showModal, cleanModal } from "@context/actions/modalAction";

const ResourceCard = ({ resourceId }) => {
  const { bulletin } = useGlobalContext();
  const { address, isConnected } = useAccount();

  const { write: exchange, state: exchangeState } = useWriteContract({
    ...mBulletin,
    functionName: "exchange",
  });

   const support = async () => {
     if (isConnected) {
        try {
          const tx = exchange({
            args: [
              resourceId,
              0,
              {
                approved: true,
                from: address,
                resource: ethers.constants.HashZero,
                currency: ethers.constants.AddressZero,
                amount: 0,
                content: "TEST",
                data: ethers.constants.HashZero
              }
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

  return (
    <>
      <div className={`flex flex-col bg-blue-50 group relative overflow-hidden rounded-lg`}>
        <div className="flex h-full w-full flex-col items-start justify-between  px-4 py-3 ">
          <div className="my-3 px-3 py-2 font- text-slate-800 bg-slate-200 rounded-lg">
            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              {/* Role: {bulletin.resources[resourceId]?.role} */}
            </p>

            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              {bulletin.resources[resourceId]?.title}
            </p>

            <p className="text-slate-800 line-clamp-2 my-0 mx-auto leading-5 font-medium  group-hover:font-semibold ">
              {/* Detail: {bulletin.resources[resourceId]?.detail} */}
            </p>
          </div>

          <div
            className={`flex space-x-2 shrink-0 flex-row items-center rounded-full bg-[#B6E4F4] h-min md:px-3 md:py-2 text-sm font-semibold  text-black  shadow-sm`}
          >
            <Avatar className={`h-5 w-5 `} address={bulletin.resources[resourceId]?.owner} />
            <span className=" hidden items-center md:block">
              {shortenAddress(bulletin.resources[resourceId]?.owner)}
            </span>
          </div>
        </div>
         
        <div className="flex flex-row w-full">
          <button
            disabled={""}
            onClick={() => support()}
            className="w-1/2 p-3 text-black hover:bg-amber-100 bg-green-200">
            <div className="flex items-center justify-center">
              抖內 | Support 1 $ARM0RY
              {/* <div className={`${(proposeState.writeStatus == 1 || proposeState.writeStatus == 2) ? "ml-2 text-slate-500" : ""}`}>    
              {(proposeState.writeStatus === 0) && "Approve"}
              {(proposeState.writeStatus === 1) && "Pending..."}
              {(proposeState.writeStatus === 2) && "Pending..."}
              {(proposeState.writeStatus === 3) && "Success!"}
              {(proposeState.writeStatus === 4) && "Error!"}
              </div> */}
            </div>
          </button>
          <button
            disabled={""}
            // onClick={() => approve(ask.trades[id].id)}
            className="w-1/2 p-3 text-black hover:bg-amber-100 bg-blue-500">
            <div className="flex items-center justify-center">
              回饋 | Comments
              {/* <div className={`${(proposeState.writeStatus == 1 || proposeState.writeStatus == 2) ? "ml-2 text-slate-500" : ""}`}>    
              {(proposeState.writeStatus === 0) && "Approve"}
              {(proposeState.writeStatus === 1) && "Pending..."}
              {(proposeState.writeStatus === 2) && "Pending..."}
              {(proposeState.writeStatus === 3) && "Success!"}
              {(proposeState.writeStatus === 4) && "Error!"}
              </div> */}
            </div>
          </button>
        </div>
      </div>

            {/* <p className="text-slate-500 line-clamp-2 my-0 mx-auto  leading-5 font-normal  group-hover:font-semibold ">
              參與人數 | # of Participants：
            </p> */}
            {/* <Link
              to={`${itemId}`}
              state={{ items: items }}
              className="block pt-4 text-indigo-500 transition duration-200"
            >
              Read Detail →
            </Link> */}
    </>
  );
};

export default ResourceCard;
