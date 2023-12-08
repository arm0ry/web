import React from "react";
import { KaliCurve } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";

const CurveCard = ({ curve }) => {
  // console.log(ethers.utils.formatUnits(curve[1], 'wei'))
  // console.log(ethers.utils.formatUnits(curve[2], 'wei'))

  const { address: user } = useAccount();
  const { write: clickMint } = useContractWrite({
    address: KaliCurve.address,
    abi: KaliCurve.abi,
    functionName: 'donate',
    args: [1, user, ethers.utils.formatUnits(curve[1], 'wei')],
    overrides: { value: curve[1] },
  })

  const { write: clickBurn } = useContractWrite({
    address: KaliCurve.address,
    abi: KaliCurve.abi,
    functionName: 'leave',
    args: [1, user]
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
                <Avatar className={`h-5 w-5 `} address={curve[0]} />
                <span className="ml-1 hidden items-center md:block">
                  {shortenAddress(curve[0])}
                </span>
              </div>
            </div>
          </div>
          <div>

            <div className="text-xs">
              Mint Status: {curve[3] ? "Open" : "Closed"}
            </div>
            <div className="text-xs">
              Curve Supply: {ethers.utils.formatUnits(curve[4], "wei")}
            </div>
            <div className="text-xs">
              Burn Ratio: {ethers.utils.formatUnits(curve[5][1], "wei")} %
            </div>
            <div className="text-xs">
              y = ({ethers.utils.formatUnits(curve[5][2], "wei")}x + {ethers.utils.formatUnits(curve[5][3], "wei")}) * {ethers.utils.formatEther(curve[5][0])} ether
            </div>
          </div>


          <div className="mt-2 ml-auto flex shrink-0  items-start justify-end justify-items-end md:mt-0 md:items-end ">
            <div className="flex flex-col flex-nowrap gap-2 md:p-2">
            </div>
          </div>
          <div>
            <span
              className={`block cursor-pointer	 transition duration-200 `}
            >
              <button
                disabled={!clickMint}
                onClick={() => clickMint({
                  overrides: { value: curve[1] }
                })}
                className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
              >
                <div className="text-base font-medium">Mint</div>
                <div className="text-xs">{ethers.utils.formatEther(curve[1])} ether</div>
              </button>
              <button
                disabled={!clickBurn}
                onClick={() => clickBurn({
                })}
                className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
              >
                <span className="text-base font-medium">Burn</span>
                <div className="text-xs">{ethers.utils.formatEther(curve[2])} ether</div>
              </button>
            </span>

          </div>
        </div>
      </div>
    </>
  );
};

export default CurveCard;
