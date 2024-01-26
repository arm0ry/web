import React, { useEffect } from "react";
import { ImpactCurves } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CurveCard = ({ curve, supply }) => {
  const { address: user } = useAccount();
  const { write: clickMint } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'support',
    args: [supply + 1, user, ethers.utils.formatUnits(curve.mintPrice, 'wei')],
    overrides: { value: curve.mintPrice },
  })

  const { write: clickBurn } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'burn',
    args: [supply + 1, user]
  })

  const data = [
    {
      supply: '1 token',
      price: (parseInt(curve.formula[2]._hex) + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '10 tokens',
      price: (parseInt(curve.formula[2]._hex) * 5 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '20 tokens',
      price: (parseInt(curve.formula[2]._hex) * 10 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '30 tokens',
      price: (parseInt(curve.formula[2]._hex) * 15 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '40 tokens',
      price: (parseInt(curve.formula[2]._hex) * 20 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '50 tokens',
      price: (parseInt(curve.formula[2]._hex) * 25 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '60 tokens',
      price: (parseInt(curve.formula[2]._hex) * 30 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
  ];

  return (
    <>
      <div className={`h-full w-full mb-8 `}>
        <div className="flex flex-col h-full w-full items-center">
          <div className=" h-full w-full my-4">
            <ResponsiveContainer width="95%" height="100%">
              <LineChart
                label={"Impact Curve"}
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
                <Legend />
                <Tooltip />
                <Line type="monotone" dataKey="currentPrice" stroke="#82ca9d" />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-row w-5/6 h-max items-center justify-center space-x-10">
            <span
              className={`block cursor-pointer	 transition duration-200 `}
            >
              <button
                disabled={!clickMint}
                onClick={() => clickMint({
                  overrides: { value: curve.mintPrice }
                })}
                className="rounded-lg p-1 text-blue-900 hover:bg-blue-100 bg-blue-200"
              >
                <div className="text-xl font-semibold">Mint </div>
                <div className="mb-2 text-md font-semibold">@ {ethers.utils.formatEther(curve.mintPrice)} ether </div>
                <div className="text-xs mx-4">
                  y = ({ethers.utils.formatUnits(curve.formula[2], "wei")} x + {ethers.utils.formatUnits(curve.formula[3], "wei")}) * {ethers.utils.formatEther(curve.formula[0])} ether
                </div>
              </button>
            </span>
            <span
              className={`block cursor-pointer	 transition duration-200 `}
            >
              <button
                disabled={!clickBurn}
                onClick={() => clickBurn({
                })}
                className="rounded-lg p-1 text-red-900 hover:bg-red-100 bg-red-200"
              >
                <span className="text-xl font-semibold">Burn</span>
                <div className="mb-2 text-md font-semibold">@ {ethers.utils.formatEther(curve.burnPrice)} ether </div>
                <div className="text-xs mx-4">
                  y = ({ethers.utils.formatUnits(curve.formula[5], "wei")} x + {ethers.utils.formatUnits(curve.formula[6], "wei")}) * {ethers.utils.formatEther(curve.formula[0])} ether
                </div>
              </button>
            </span>
            <div className="flex flex-col h-full items-center justify-end ">
              <label className="text-lg font-semibold text-gray-900">已售出: {supply}</label>
              {/* <label className="text-lg font-semibold text-gray-900">已售出: {supply}</label> */}
            </div>

          </div>

        </div>

      </div >
    </>
  );
};

export default CurveCard;
