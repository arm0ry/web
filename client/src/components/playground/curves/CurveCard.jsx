import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KaliDAO_abi from "../../../contract/KaliDAO.json";
import KaliCurve_abi from "../../../contract/KaliCurve.json";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { showModal, cleanModal } from "@context/actions/modalAction";
import { shortenAddress } from "@utils/shortenAddress";
import { useGlobalContext } from "@context/store";
import { Money, Avatar } from "@components";
import { ClockIcon } from "@assets";


const CurveCard = ({ review }) => {
  console.log(review)
  const { playground } = useGlobalContext();
  const { tasks } = playground;
  // const { traveler, taskId: rTaskId, taskHomework, questing } = review;
  const { address, isConnected, isDisconnected } = useAccount();
  const { data: mintPrice, isLoading, isFetched } = useContractRead({
    address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
    abi: KaliCurve_abi,
    functionName: 'getPrice',
    args:[true, 1]
  })

console.log(ethers.utils.formatEther(mintPrice))
  
  const { write: clickMint } = useContractWrite({
    address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
    abi: KaliCurve_abi,
    functionName: 'donate',
        args: [1, address, ethers.utils.formatUnits(mintPrice, 'wei')],
    account: address,
    overrides: { value: mintPrice },
  })

  const { write: clickBurn } = useContractWrite({
    address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
    abi: KaliCurve_abi,
    functionName: 'leave',
    args: [1, address]
  })

  return (
    <>
      <div className={`h-30 group relative w-full overflow-hidden`}>
        <div className="absolute -inset-1 ml-2 mt-2 h-full w-full rounded-lg bg-gradient-to-r from-[#00C3FF]  via-[#fcfcc2] to-[#fffc00] opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
        <div className="relative flex h-full w-full flex-row items-center justify-between space-x-1 rounded-lg bg-white px-4 py-3 leading-none ring-1 ring-gray-900/5">
          <div className="shrink-1 ml-2 space-y-2">
            <div className="flex flex-row  ">
              <div
                className={`flex shrink-0 flex-row items-center justify-center rounded-full bg-[#B6E4F4] h-fit md:px-2 md:py-1 text-xs font-semibold  text-black  shadow-sm`}
              >
                <Avatar className={`h-5 w-5 `} address={review[0]} />
                <span className="ml-1 hidden items-center md:block">
                  {shortenAddress(review[0])}
                </span>
              </div>
            </div>
    

            <span
              className={`block cursor-pointer	 transition duration-200 `}
            >
              <button
                disabled={!clickMint}
                onClick={() => clickMint({
                   overrides: { value: mintPrice }
                })}
                className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
              >
              <span className="text-base font-medium">Mint</span>
              </button>
              <button
                disabled={!clickBurn}
                onClick={() => clickBurn({
                    args: [1, address],
                    from: address,
                })}
                className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
              >
              <span className="text-base font-medium">Burn</span>
            </button>
            </span>
          </div>
          <div className="mt-2 ml-auto flex shrink-0  items-start justify-end justify-items-end md:mt-0 md:items-end ">
            <div className="flex flex-col flex-nowrap gap-2 md:p-2">
            </div>
          </div>
                  <div>

              <div>
              Mint Status: {review[1] ? "Open" : "Closed"}
              </div>
              <div>
              Curve Supply: {ethers.utils.formatUnits(review[2], "wei")}
              </div>
              <div>
                Burn Ratio: {ethers.utils.formatUnits(review[3][1], "wei")}
              </div>
              <div>

              Curve Formula: y = ({ethers.utils.formatUnits(review[3][2], "wei")}x + {ethers.utils.formatUnits(review[3][3], "wei")}) * {ethers.utils.formatEther(review[3][0])} ether
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default CurveCard;
