import React, { PureComponent } from "react";
import { ImpactCurves } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CurveCard = ({ curve }) => {
  const { address: user } = useAccount();

  const { write: clickMint } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'support',
    args: [4, user, ethers.utils.formatUnits(curve[1], 'wei')],
    overrides: { value: curve[1] },
  })

  const { write: clickBurn } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'burn',
    args: [4, user]
  })

  console.log(ethers.utils.formatUnits(curve[1], 'wei'))

  const data = [
    {
      supply: '1',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '5',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 5 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '10',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 10 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '15',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 15 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '20',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 20 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '25',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 25 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '30',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 30 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
  ];

  return (
    <>
      <div className={`h-40 group relative w-full overflow-hidden`}>
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
            <div className="text-xs">
              {/* {curve[3] ? "Open" : "Closed"} */}
            </div>
            <div className="text-xs">
              Burn: {ethers.utils.formatUnits(curve[4][1], "wei")} %
            </div>

            <div className="text-xs">
              y = ({ethers.utils.formatUnits(curve[4][2], "wei")} x + {ethers.utils.formatUnits(curve[4][3], "wei")}) * {ethers.utils.formatEther(curve[4][0])} ether
            </div>
          </div>
          <ResponsiveContainer width="80%" height="100%">
            <LineChart
              width={300}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="supply" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          {/* 
          <div className="mt-2 ml-auto flex shrink-0  items-start justify-end justify-items-end md:mt-0 md:items-end ">
            <div className="flex flex-col flex-nowrap gap-2 md:p-2" />
          </div> */}
          <div className="flex">
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
                className="rounded-lg p-2 text-red-900 hover:bg-red-100"
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
