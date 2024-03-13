import React, { useState, useEffect } from "react";
import { ImpactCurves } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pushAlert } from "@context/actions/alertAction";

const CurveCard = ({ curve }) => {
  const [tokenId, setTokenId] = useState(0)
  const { address: user } = useAccount();

  // const { write: clickBurn } = useContractWrite({
  //   address: ImpactCurves.address,
  //   abi: ImpactCurves.abi,
  //   functionName: 'burn',
  //   args: [curve.curveId, user, 0]
  // })

  const clickMint = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner();
    const impactCurve = new ethers.Contract(ImpactCurves.address, ImpactCurves.abi, signer)

    try {
      // const curveId = await impactCurve.getCurveId();
      const tx = await impactCurve.support(curve.curveId, user, curve.mintPrice, { value: curve.mintPrice })
      console.log(curve.curveId, user, curve.mintPrice, tx)

      pushAlert({
        msg: (
          <span>
            Success! Check your mint transaction on
            <a
              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="font-extrabold text-green-900"
            >
              &nbsp;Etherscan &#128279;
            </a>
          </span>
        ),
        type: "success",
      });

    } catch (error) {
      console.log(error)
    }
  }

  const clickBurn = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner();
    const impactCurve = new ethers.Contract(ImpactCurves.address, ImpactCurves.abi, signer)

    try {
      // const curveId = await impactCurve.getCurveId();
      console.log(curve.curveId, user, tokenId)
      if (tokenId !== 0) {
        const tx = await impactCurve.burn(curve.curveId, user, tokenId)

        pushAlert({
          msg: (
            <span>
              Success! Check your burn transaction on
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="font-extrabold text-green-900"
              >
                &nbsp;Etherscan &#128279;
              </a>
            </span>
          ),
          type: "success",
        });
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => { }, [curve])

  const mintCurve = [
    {
      supply: '10',
      price: (parseInt(curve.formula[1]._hex) * (10 ^ 2) + parseInt(curve.formula[2]._hex) * 10 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '20',
      price: (parseInt(curve.formula[1]._hex) * (20 ^ 2) + parseInt(curve.formula[2]._hex) * 20 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '30',
      price: (parseInt(curve.formula[1]._hex) * (30 ^ 2) + parseInt(curve.formula[2]._hex) * 30 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '40',
      price: (parseInt(curve.formula[1]._hex) * (40 ^ 2) + parseInt(curve.formula[2]._hex) * 40 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '50',
      price: (parseInt(curve.formula[1]._hex) * (50 ^ 2) + parseInt(curve.formula[2]._hex) * 50 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '60',
      price: (parseInt(curve.formula[1]._hex) * (60 ^ 2) + parseInt(curve.formula[2]._hex) * 60 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '70',
      price: (parseInt(curve.formula[1]._hex) * (70 ^ 2) + parseInt(curve.formula[2]._hex) * 70 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '80',
      price: (parseInt(curve.formula[1]._hex) * (80 ^ 2) + parseInt(curve.formula[2]._hex) * 80 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '90',
      price: (parseInt(curve.formula[1]._hex) * (90 ^ 2) + parseInt(curve.formula[2]._hex) * 90 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '100 tokens',
      price: (parseInt(curve.formula[1]._hex) * (100 ^ 2) + parseInt(curve.formula[2]._hex) * 100 + parseInt(curve.formula[3]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
  ];

  const burnCurve = [
    {
      supply: '10',
      price: (parseInt(curve.formula[4]._hex) * (10 ^ 2) + parseInt(curve.formula[5]._hex) * 10 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '20',
      price: (parseInt(curve.formula[4]._hex) * (20 ^ 2) + parseInt(curve.formula[5]._hex) * 20 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '30',
      price: (parseInt(curve.formula[4]._hex) * (30 ^ 2) + parseInt(curve.formula[5]._hex) * 30 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '40',
      price: (parseInt(curve.formula[4]._hex) * (40 ^ 2) + parseInt(curve.formula[5]._hex) * 40 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '50',
      price: (parseInt(curve.formula[4]._hex) * (50 ^ 2) + parseInt(curve.formula[5]._hex) * 50 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '60',
      price: (parseInt(curve.formula[4]._hex) * (60 ^ 2) + parseInt(curve.formula[5]._hex) * 60 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '70',
      price: (parseInt(curve.formula[4]._hex) * (70 ^ 2) + parseInt(curve.formula[5]._hex) * 70 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '80',
      price: (parseInt(curve.formula[4]._hex) * (80 ^ 2) + parseInt(curve.formula[5]._hex) * 80 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '90',
      price: (parseInt(curve.formula[4]._hex) * (90 ^ 2) + parseInt(curve.formula[5]._hex) * 90 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
    {
      supply: '100 tokens',
      price: (parseInt(curve.formula[4]._hex) * (100 ^ 2) + parseInt(curve.formula[5]._hex) * 100 + parseInt(curve.formula[6]._hex)) * Number(ethers.utils.formatEther(curve.formula[0])),
    },
  ];

  return (
    <>
      <div className={`h-full w-full`}>
        <div className="flex flex-col h-5/6 aspect-video w-full justify-end ">
          <div className=" h-full w-full my-4">
            <ResponsiveContainer width="95%" height="100%">
              <LineChart
                label={"Impact Curve"}
                width={300}
                height={300}
                margin={{
                  top: 2,
                  right: 15,
                  left: 15,
                  bottom: 2,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="supply" type="number" domain={['auto', 'auto']} />
                <YAxis />
                <Tooltip />
                <Line data={mintCurve} type="monotone" dataKey="price" stroke="#82ca9d" />
                <Line data={burnCurve} type="monotone" dataKey="price" stroke="#ff7f00" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-row space-x-5 w-full h-1/5 ">
            <button
              disabled={!clickMint}
              onClick={() => clickMint()}
              className=" w-full rounded-lg p-1 text-emerald-600 hover:bg-emerald-100 bg-emerald-200"
            >
              <div className="flex flex-row space-x-4 items-center justify-center">
                <div className="text-md font-normal">{ethers.utils.formatEther(curve.mintPrice)} Ξ </div>
                <div className="text-xl font-semibold">🪙 </div>
              </div>
            </button>


            <button
              disabled={!clickBurn}
              onClick={() => clickBurn({
              })}
              className=" w-full rounded-lg p-1 text-amber-700 hover:bg-amber-100 bg-amber-200 "
            >
              <div className="flex flex-row space-x-5 px-5">
                <input type="text" id="idToBurn" className="w-5/6 rounded-lg pl-4" placeholder="id #" onChange={e => setTokenId(e.target.value)}
                  required />
                <div className="text-xl font-semibold">🔥 </div>
              </div>

            </button>
          </div>
        </div>
      </div >
    </>
  );
};

export default CurveCard;
