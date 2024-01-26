import React, { PureComponent } from "react";
import { ImpactCurves } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CurveCard = ({ curve, id }) => {
  const { address: user } = useAccount();
  console.log(curve)
  const { write: clickMint } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'support',
    args: [id + 1, user, ethers.utils.formatUnits(curve[1], 'wei')],
    overrides: { value: curve[1] },
  })

  const { write: clickBurn } = useContractWrite({
    address: ImpactCurves.address,
    abi: ImpactCurves.abi,
    functionName: 'burn',
    args: [id + 1, user]
  })
  // console.log(id)
  // console.log(ethers.utils.formatUnits(curve[1], 'wei'))

  const data = [
    {
      supply: '1',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '10',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 5 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '20',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 10 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '30',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 15 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '40',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 20 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '50',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 25 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
    {
      supply: '60',
      price: (Number(ethers.utils.formatUnits(curve[4][2], "wei")) * 30 + Number(ethers.utils.formatUnits(curve[4][3], "wei"))) * Number(ethers.utils.formatEther(curve[4][0])),
    },
  ];

  return (
    <>
      <div className={`h-full w-full mb-8 relative overflow-hidden rounded-lg`}>

        <div className="flex flex-col h-full w-full justify-end items-end ">
          <div className="h-full w-full my-4">
            <ResponsiveContainer width="95%" height="100%">
              <LineChart
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
          </div>
          <div className="flex flex-row w-full h-max items-end justify-center space-x-10 ">
            <span
              className={`block cursor-pointer	 transition duration-200 `}
            >
              <button
                disabled={!clickMint}
                onClick={() => clickMint({
                  overrides: { value: curve[1] }
                })}
                className="rounded-lg p-1 text-blue-900 hover:bg-blue-100 bg-blue-200"
              >
                <div className="text-xl font-semibold">Mint </div>
                <div className="mb-2 text-md font-semibold">@ {ethers.utils.formatEther(curve[1])} ether </div>
                <div className="text-xs mx-4">
                  y = ({ethers.utils.formatUnits(curve[4][2], "wei")} x + {ethers.utils.formatUnits(curve[4][3], "wei")}) * {ethers.utils.formatEther(curve[4][0])} ether
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
                <div className="mb-2 text-md font-semibold">@ {ethers.utils.formatEther(curve[2])} ether </div>
                <div className="text-xs mx-4">
                  y = ({ethers.utils.formatUnits(curve[4][5], "wei")} x + {ethers.utils.formatUnits(curve[4][6], "wei")}) * {ethers.utils.formatEther(curve[4][0])} ether
                </div>
              </button>
            </span>

          </div>

        </div>

      </div >
    </>
  );
};

export default CurveCard;
