import React, { useState, useEffect } from "react";
import { TokenCurve } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pushAlert } from "@context/actions/alertAction";

const CurveCard = ({ curve }) => {
  const [tokenId, setTokenId] = useState(0)
  const [mintCurve, setMintCurve] = useState()
  const [burnCurve, setBurnCurve] = useState()
  const { address: user } = useAccount();
  // console.log("curve - ", curve);

  const clickMint = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner();
    const tokenCurve = new ethers.Contract(TokenCurve.address, TokenCurve.abi, signer)

    try {
      const tx = await tokenCurve.support(curve.curveId, user, curve.mintPrice, { value: curve.mintPrice })

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
    const tokenCurve = new ethers.Contract(TokenCurve.address, TokenCurve.abi, signer)

    try {
      if (tokenId !== 0) {
        const tx = await tokenCurve.burn(curve.curveId, user, tokenId);
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


  useEffect(() => {
    setMintCurve([
      {
        supply: '10',
        price: (curve.mint_a * (10 ^ 2) + curve.mint_b * 10 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '20',
        price: (curve.mint_a * (20 ^ 2) + curve.mint_b * 20 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '30',
        price: (curve.mint_a * (30 ^ 2) + curve.mint_b * 30 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '40',
        price: (curve.mint_a * (40 ^ 2) + curve.mint_b * 40 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '50',
        price: (curve.mint_a * (50 ^ 2) + curve.mint_b * 50 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '60',
        price: (curve.mint_a * (60 ^ 2) + curve.mint_b * 60 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '70',
        price: (curve.mint_a * (70 ^ 2) + curve.mint_b * 70 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '80',
        price: (curve.mint_a * (80 ^ 2) + curve.mint_b * 80 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '90',
        price: (curve.mint_a * (90 ^ 2) + curve.mint_b * 90 + curve.mint_c) * Number(curve.scale),
      },
      {
        supply: '100 tokens',
        price: (curve.mint_a * (100 ^ 2) + curve.mint_b * 100 + curve.mint_c) * Number(curve.scale),
      },
    ])

    setBurnCurve([
      {
        supply: '10',
        price: (curve.burn_a * (10 ^ 2) + curve.burn_b * 10 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '20',
        price: (curve.burn_a * (20 ^ 2) + curve.burn_b * 20 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '30',
        price: (curve.burn_a * (30 ^ 2) + curve.burn_b * 30 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '40',
        price: (curve.burn_a * (40 ^ 2) + curve.burn_b * 40 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '50',
        price: (curve.burn_a * (50 ^ 2) + curve.burn_b * 50 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '60',
        price: (curve.burn_a * (60 ^ 2) + curve.burn_b * 60 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '70',
        price: (curve.burn_a * (70 ^ 2) + curve.burn_b * 70 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '80',
        price: (curve.burn_a * (80 ^ 2) + curve.burn_b * 80 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '90',
        price: (curve.burn_a * (90 ^ 2) + curve.burn_b * 90 + curve.burn_c) * Number(curve.scale),
      },
      {
        supply: '100 tokens',
        price: (curve.burn_a * (100 ^ 2) + curve.burn_b * 100 + curve.burn_c) * Number(curve.scale),
      },
    ])



    const calculateMintPrice = () => {

    }
    calculateMintPrice();
  }, [curve])

  return (
    <>
      <div className={`h-auto w-5/6  mx-auto`}>
        <div className="flex flex-col space-y-3">
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
                    <Line data={(mintCurve !== undefined) ? mintCurve : null} type="monotone" dataKey="price" stroke="#82ca9d" />
                    <Line data={(burnCurve !== undefined) ? burnCurve : null} type="monotone" dataKey="price" stroke="#ff7f00" />
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
                    <div className="text-md font-normal">{curve.mintPrice} Ξ </div>
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
            <div>
            </div>
          </div >
        </div>
      </div>
    </>
  );
};

export default CurveCard;
