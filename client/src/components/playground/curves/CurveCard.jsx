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

  console.log(curve, supply)

  const { write: clickBurn } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'burn',
    args: [supply + 1, user]
  })

  useEffect(() => {



  }, [curve, supply])

  const data = [
    // {
    //   supply: '1 token',
    //   price: (parseInt(curve.formula[2]._hex) + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    // },
    {
      supply: '10',
      price: (parseInt(curve.formula[2]._hex) * 10 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '20',
      price: (parseInt(curve.formula[2]._hex) * 20 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '30',
      price: (parseInt(curve.formula[2]._hex) * 30 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '40',
      price: (parseInt(curve.formula[2]._hex) * 40 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '50',
      price: (parseInt(curve.formula[2]._hex) * 50 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '60',
      price: (parseInt(curve.formula[2]._hex) * 60 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '70',
      price: (parseInt(curve.formula[2]._hex) * 70 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '80',
      price: (parseInt(curve.formula[2]._hex) * 80 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '90',
      price: (parseInt(curve.formula[2]._hex) * 90 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '100 token',
      price: (parseInt(curve.formula[2]._hex) * 100 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
  ];

  return (
    <>
      <div className={`h-full w-full mb-5`}>
        <div className="flex flex-col h-5/6 w-full justify-end ">
          <div className=" h-full w-full my-4">
            <ResponsiveContainer width="95%" height="100%">
              <LineChart
                label={"Impact Curve"}
                width={300}
                height={300}
                data={data}
                margin={{
                  top: 2,
                  right: 15,
                  left: 15,
                  bottom: 2,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="supply" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col w-full items-center space-x-10  ">
            <div className="my-2 flex flex-row h-full w-full justify-center space-x-10 ">
              <label className="text-sm font-md text-gray-900">已售出: {supply}</label>
              <label className="text-sm font-md text-gray-900">買價: y = ({ethers.utils.formatUnits(curve.formula[2], "wei")} x + {ethers.utils.formatUnits(curve.formula[3], "wei")}) * {ethers.utils.formatEther(curve.formula[0])} Ξ
              </label>
              <label className="text-sm font-md text-gray-900">賣價: y = ({ethers.utils.formatUnits(curve.formula[5], "wei")} x + {ethers.utils.formatUnits(curve.formula[6], "wei")}) * {ethers.utils.formatEther(curve.formula[0])} Ξ
              </label>
            </div>
            <div className="flex flex-row w-full h-full ">
              <div className="w-3/5 px-5 py-1 ">

                <button
                  disabled={!clickMint}
                  onClick={() => clickMint({
                    overrides: { value: curve.mintPrice }
                  })}
                  className="h-full w-full rounded-lg p-1 text-blue-900 hover:bg-blue-100 bg-blue-200"
                >
                  <div className="flex flex-row space-x-2 items-center justify-center">
                    <div className="text-xl font-semibold">Mint </div>
                    <div className="text-md font-normal">@ {ethers.utils.formatEther(curve.mintPrice)} Ξ </div>
                  </div>
                </button>
              </div>
              <div className="w-3/5 px-5 py-1">
                <button
                  disabled={!clickBurn}
                  onClick={() => clickBurn({
                  })}
                  className=" w-full h-full rounded-lg p-1 text-red-900 hover:bg-red-100 bg-red-200 items-center"
                >
                  <div className="flex flex-row space-x-2 items-center justify-center">
                    <div className="text-xl font-semibold">Burn </div>
                    <div className="text-md font-normal"> @ {ethers.utils.formatEther(curve.burnPrice)} Ξ</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default CurveCard;
