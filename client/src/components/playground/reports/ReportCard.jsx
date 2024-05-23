import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import CurveCard from "../curves/CurveCard";
import { TokenCurve } from "@contract";
import { zero_address } from "../../../contract";
import CurveData from "../curves/CurveData";

const ReportCard = ({ title, description, engDescription, curveId, svg, supply }) => {
  const [curve, setCurve] = useState();

  const { data: owner } = useContractRead({
    ...TokenCurve,
    functionName: "getCurveOwner",
    args: [curveId],
  })

  const { data: mintPrice } = useContractRead({
    ...TokenCurve,
    functionName: 'getCurvePrice',
    args: [true, curveId, 0]
  })

  const { data: burnPrice } = useContractRead({
    ...TokenCurve,
    functionName: 'getCurvePrice',
    args: [false, curveId, 0]
  })

  const { data: pool } = useContractRead({
    ...TokenCurve,
    functionName: 'getCurveTreasury',
    args: [curveId]
  })

  const { data: formula } = useContractRead({
    ...TokenCurve,
    functionName: 'getCurveFormula',
    args: [curveId]
  })

  const { data: unclaimed } = useContractRead({
    ...TokenCurve,
    functionName: 'getUnclaimed',
    args: [owner]
  })

  useEffect(() => {

    if (supply) {
      setCurve({
        curveId: curveId,
        owner: owner ? owner : zero_address,
        mintPrice: mintPrice ? ethers.utils.formatEther(mintPrice) : 0,
        burnPrice: burnPrice ? ethers.utils.formatEther(burnPrice) : 0,
        pool: pool ? ethers.utils.formatEther(pool) : 0,
        formula: formula ? formula : 0,
        supply: parseInt(supply._hex),
        unclaimed: unclaimed ? ethers.utils.formatEther(unclaimed) : 0
      })
    }
  }, [curveId, owner, pool, mintPrice, burnPrice, formula, supply])

  return (
    <>
      <div className={`h-auto w-5/6  mx-auto`}>
        <div className="flex flex-col space-y-3">
          <label className="text-lg font-medium text-gray-600 ">
            {title}
          </label>
          <div className="flex flex-col space-y-1 bg-slate-50 p-5 rounded-lg">
            <label className="text-md font-normal text-gray-900 ">
              {description}
            </label>
            <label className="text-sm font-normal text-gray-600 ">
              {engDescription}
            </label>
          </div>

          <div className="w-full flex items-center justify-center space-x-16 bg-amber-50 rounded-lg">
            <div className="">
              {(svg !== undefined) ? (
                <img
                  className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                  alt="Supporter Token"
                ></img>
              ) : (
                <div>loading...</div>
              )}

            </div>

            <div className="w-1/3">
              {curve !== undefined ? (<CurveCard curve={curve} />) : (<></>)}
            </div>

            {(curve !== undefined) ? (<CurveData curve={curve} />) : (<></>)}
          </div >
        </div >
      </div>
    </>
  );
};

export default ReportCard;
