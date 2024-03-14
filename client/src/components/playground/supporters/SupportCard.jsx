import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CurveCard from "../curves/CurveCard";
import { ImpactCurves, HackathonSupportToken, OnboardingSupportToken } from "@contract";

const SupportCard = ({ title, description, engDescription, curveId, svg, supply }) => {
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

  const { data: unclaimed } = useContractRead({
    ...ImpactCurves,
    functionName: 'getUnclaimed',
    args: [owner]
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
        supply: parseInt(supply._hex),
        unclaimed: unclaimed
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
              <img
                className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                alt="Supporter Token"
              ></img>
            </div>

            <div className="w-1/3">
              {curve !== undefined ? (<CurveCard curve={curve} />) : (<></>)}
            </div>

            {curve !== undefined
              ?
              (<div className="w-1/4 px-10 py-5 rounded-lg flex flex-col space-y-4 text-md font-normal text-gray-900 bg-slate-50">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-medium text-gray-600">曲線資金池 | curve treasury ： </label>
                  <label className="text-sm font-normal text-gray-900">
                    {ethers.utils.formatEther(curve.pool)} Ξ
                    {/* {(ethers.utils.formatUnits(curve.formula[1], "wei") == 0) ? "一元一次方程式 | Linear" : "一元二次方程式 | Parabola"} */}
                  </label>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-medium text-gray-600">已售出 | total supply ：</label>
                  <label className="text-sm font-normal text-gray-900">{curve.supply}</label>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-medium text-gray-600">曲線買價 | price to mint ：</label>
                  <label className="text-sm font-normal text-emerald-600">
                    y = ({(ethers.utils.formatUnits(curve.formula[1], "wei") == 0) ? "" : `${ethers.utils.formatUnits(curve.formula[1], "wei")} x^2 + `}{ethers.utils.formatUnits(curve.formula[2], "wei")} x{(ethers.utils.formatUnits(curve.formula[3], "wei") == 0) ? "" : ` + ${ethers.utils.formatUnits(curve.formula[3], "wei")}`}) * {ethers.utils.formatEther(curve.formula[0])} Ξ
                  </label>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-medium text-gray-600">曲線賣價 | price to burn ：</label>
                  <label className="text-sm font-normal text-amber-600">y = ({(ethers.utils.formatUnits(curve.formula[4], "wei") == 0) ? "" : `${ethers.utils.formatUnits(curve.formula[4], "wei")} x^2 + `}{ethers.utils.formatUnits(curve.formula[5], "wei")} x{(ethers.utils.formatUnits(curve.formula[6], "wei") == 0) ? "" : ` + ${ethers.utils.formatUnits(curve.formula[6], "wei")}`}) * {ethers.utils.formatEther(curve.formula[0])} Ξ</label>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-medium text-gray-600">集資進度 | raised ： </label>
                  <label className="text-sm font-normal text-gray-900">{ethers.utils.formatEther(curve.unclaimed)} Ξ</label>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-medium text-gray-600">管理員 | operator ：</label>
                  <label className="text-sm font-normal text-gray-900">揪松.eth</label>
                </div>
              </div>)
              :
              (<></>)}
          </div >
        </div >
      </div>
    </>
  );
};

export default SupportCard;
