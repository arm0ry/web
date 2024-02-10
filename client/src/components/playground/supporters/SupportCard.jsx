import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CurveCard from "../curves/CurveCard";
import { ImpactCurves, HackathonSupportToken, OnboardingSupportToken } from "@contract";

const SupportCard = ({ curveId, svg, supply }) => {
  const [curve, setCurve] = useState();

  const { data: owner } = useContractRead({
    ...ImpactCurves,
    functionName: "getCurveOwner",
    args: [curveId],
  })

  const { data: mintPrice } = useContractRead({
    ...ImpactCurves,
    functionName: 'getCurvePrice',
    args: [true, curveId, 0]
  })

  const { data: burnPrice } = useContractRead({
    ...ImpactCurves,
    functionName: 'getCurvePrice',
    args: [false, curveId, 0]
  })

  const { data: pool } = useContractRead({
    ...ImpactCurves,
    functionName: 'getCurveTreasury',
    args: [curveId]
  })

  const { data: formula } = useContractRead({
    ...ImpactCurves,
    functionName: 'getCurveFormula',
    args: [curveId]
  })

  useEffect(() => {
    if (supply) {
      setCurve({
        curveId: curveId,
        owner: owner,
        mintPrice: mintPrice,
        burnPrice: burnPrice,
        pool: pool,
        formula: formula,
        supply: parseInt(supply._hex)
      })
    }
  }, [owner, pool, formula, supply])

  return (
    <>
      <div className={`h-auto w-full`}>
        <div className="my-4 w-full flex flex-row items-center justify-center space-x-10 ">

          <div className="ml-10  flex items-center">
            <img
              className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg "
              src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
              alt="Supporter Token"
            ></img>
          </div>

          <div className="">
            {curve !== undefined ? (<CurveCard curve={curve} />) : (<></>)}
          </div>

          <div className="w-1/4 px-10 py-5 rounded-lg flex flex-col space-y-2 text-md font-normal text-gray-900 bg-yellow-50">
            <label className="text-sm font-md text-gray-900">已售出: {curve.supply}</label>
            <label className="text-sm font-md text-gray-900">買價: y = ({(ethers.utils.formatUnits(curve.formula[1], "wei") == 0) ? "" : `${ethers.utils.formatUnits(curve.formula[1], "wei")} x^2 + `}{ethers.utils.formatUnits(curve.formula[2], "wei")} x{(ethers.utils.formatUnits(curve.formula[3], "wei") == 0) ? "" : ` + ${ethers.utils.formatUnits(curve.formula[3], "wei")}`}) * {ethers.utils.formatEther(curve.formula[0])} Ξ</label>
            <label className="text-sm font-md text-gray-900">賣價: y = ({(ethers.utils.formatUnits(curve.formula[4], "wei") == 0) ? "" : `${ethers.utils.formatUnits(curve.formula[1], "wei")} x^2 + `}{ethers.utils.formatUnits(curve.formula[5], "wei")} x{(ethers.utils.formatUnits(curve.formula[6], "wei") == 0) ? "" : ` + ${ethers.utils.formatUnits(curve.formula[6], "wei")}`}) * {ethers.utils.formatEther(curve.formula[0])} Ξ</label>
            <label className="text-sm font-md text-gray-900">受益者：揪松.eth</label>
          </div>
        </div>
      </div >
    </>
  );
};

export default SupportCard;
