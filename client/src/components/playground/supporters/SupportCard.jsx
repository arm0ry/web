import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CurveCard from "../curves/CurveCard";
import { ImpactCurves, mSupportToken, qSupportToken } from "@contract";


// TODO: Can use when we have more supporter info
const SupportCard = ({ curveId, svg }) => {
  const [curve, setCurve] = useState();
  const [supply, setSupply] = useState(0);

  const { data: owner } = useContractRead({
    ...ImpactCurves,
    functionName: "getCurveOwner",
    args: [curveId],
  })

  const { data: mintPrice } = useContractRead({
    ...ImpactCurves,
    functionName: 'getPrice',
    args: [true, curveId, 0]
  })

  const { data: burnPrice } = useContractRead({
    ...ImpactCurves,
    functionName: 'getPrice',
    args: [false, curveId, 0]
  })

  const { data: pool } = useContractRead({
    ...ImpactCurves,
    functionName: 'getCurvePool',
    args: [curveId]
  })

  const { data: formula } = useContractRead({
    ...ImpactCurves,
    functionName: 'getCurveFormula',
    args: [curveId]
  })

  const { data: supporters } = useContractInfiniteReads({
    cacheKey: "mSupporters",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: mSupportToken.address,
            abi: mSupportToken.abi,
            functionName: "ownerOf",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
  });


  const { data: _supply } = useContractRead({
    ...mSupportToken,
    functionName: 'totalSupply',
    args: []
  })

  const { data: questSupporters } = useContractInfiniteReads({
    cacheKey: "qSupporters",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: qSupportToken.address,
            abi: qSupportToken.abi,
            functionName: "ownerOf",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
  });

  useEffect(() => {
    setCurve({
      owner: owner,
      mintPrice: mintPrice,
      burnPrice: burnPrice,
      pool: pool,
      formula: formula,
    })
  }, [owner, mintPrice, burnPrice, pool, formula])


  useEffect(() => {
    setSupply(parseInt(_supply._hex))
  }, [_supply])
  console.log(parseInt(_supply._hex))

  return (
    <>
      <div className={`h-auto w-full`}>
        <div className="my-4 w-full h-2/3 flex flex-row items-center space-x-5 aspect-video">
          <img
            className="w-2/3 h-full ml-10 ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg transition duration-300 "
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="Supporter Token"
          ></img>

          <div className="w-full h-full">
            {curve !== undefined ? (<CurveCard curve={curve} supply={supply} />) : (<></>)}
          </div>
        </div>
        {/* <div className="flex flex-col w-full h-1/3 ml-10 ">
          <label
            className="p-4 block text-2xl font-bold text-gray-900"
          >
            黑客松 NFT 支持者:
          </label>
          <div className="grid grid-cols-1 gap-2 p-4 w-1/2">
            {supporters?.pages[0] !== undefined ? (
              supporters.pages[0]?.map((supporter, id) => {
                return supporter !== null ? (
                  <div className="ml-4 flex flex-col items-start ">
                    <label className=" text-lg font-semibold text-gray-400">
                      Token #{id + 1}.
                    </label>
                    <label className=" text-xl font-medium text-gray-900">
                      {shortenAddress(supporter)}
                    </label>
                  </div>
                ) : (<></>)
              })
            ) : (
              <></>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SupportCard;
