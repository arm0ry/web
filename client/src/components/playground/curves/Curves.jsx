import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";
import KaliDAO_abi from "../../../contract/KaliDAO.json";
import KaliCurve_abi from "../../../contract/KaliCurve.json";
import { ethers } from "ethers";
import { useAccount, useContractInfiniteReads, useContractRead, paginatedIndexesConfig} from "wagmi";
import CurveCard from "./CurveCard";

const Curves = () => {
  const { playground, userInfo } = useGlobalContext();
  const { unreviews } = playground;

  const { data: curveCount } = useContractRead({
    address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
    abi: KaliCurve_abi,
    functionName: 'getCurveCount',
    args:[]
  })

  console.log(ethers.utils.formatUnits(curveCount, "wei"))

  // TODO: GET ALL CURVES AND PASS DATA TO CURVECARD
  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: 'curves',
    ...paginatedIndexesConfig(
      (index) => {
      return [
        {
          address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
          abi: KaliCurve_abi,
          functionName: 'getCurveOwner',
          args,
        },
        {
          address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
          abi: KaliCurve_abi,
          functionName: 'getCurveTreasury',
          args,
        },
        {
          address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
          abi: KaliCurve_abi,
          functionName: 'getCurveSupply',
          args,
        },
        {
          address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
          abi: KaliCurve_abi,
          functionName: 'getCurveData',
          args,
        },
         {
          address: '0xDd1189bd8d9f2D6Cc838798356DF84F79e4a3cD3',
          abi: KaliCurve_abi,
          functionName: 'getImpactDao',
          args,
        },
      ]
    },
      { start: 1, perPage: 10, direction: 'increment' }, )
  })

  console.log(data.pages)
  // console.log(data.pages[0][0])
  // console.log(data.pages[0][1])
  // console.log(data.pages[0][2])
  // console.log(data.pages[0][3][0])
  // console.log(data.pages[0][3][1])
  // console.log(data.pages[0][3][2])
  // console.log(data.pages[0][3][3])
  // console.log(data.pages[0][3][4])

  const curveOwner = data.pages[0][0]
  const daoTreasury = data.pages[0][1]
  const curveSuppluy = data.pages[0][2]
  const curveScale = data.pages[0][3][0]
  const burnRatio = data.pages[0][3][1]
  const curveConstantA = data.pages[0][3][2]
  const curveConstantB = data.pages[0][3][3]
  const curveConstantC = data.pages[0][3][4]

  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {/* {unreviews.map((review, id) => {
          return <CurveCard key={id} review={review} />;
        })} */}
        {data.pages.map((data, id) => {
          return <CurveCard key={id} review={data} />;
        })}
      </div>
    </>
  );
};

export default Curves;
