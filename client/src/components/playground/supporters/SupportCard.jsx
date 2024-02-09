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
        <div className="my-4 w-full h-2/3 flex flex-row items-center space-x-5 aspect-video bg-slate-100">
          <img
            className="h-2/3  ml-10 ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg transition duration-300 "
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="Supporter Token"
          ></img>

          <div className="w-full h-full">
            {curve !== undefined ? (<CurveCard curve={curve} />) : (<></>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportCard;
