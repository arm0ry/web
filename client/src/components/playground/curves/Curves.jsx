import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { KaliCurve } from "../../../contract";
import { ethers } from "ethers";
import {
  useContractInfiniteReads,
  useContractRead,
  paginatedIndexesConfig,
} from "wagmi";
import CurveCard from "./CurveCard";

const Curves = () => {
  const [curves, setCurves] = useState();
  const { data, fetchNextPage, isFetched } = useContractInfiniteReads({
    cacheKey: "curves",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getCurveOwner",
            args: [index],
          },
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getPrice",
            args: [true, index],
          },
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getPrice",
            args: [false, index],
          },
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getCurveTreasury",
            args: [index],
          },
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getCurveSupply",
            args: [index],
          },
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getCurveData",
            args: [index],
          },
          {
            address: KaliCurve.address,
            abi: KaliCurve.abi,
            functionName: "getImpactDao",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 5, direction: "increment" }
    ),
  });

  useEffect(() => {
    if (data) {
      const tempData = data.pages[0];
      let innerArry = [];
      let outerArry = [];
      for (let i = 0; i < tempData.length; i++) {
        innerArry.push(tempData[i]);
        if (i % 7 === 6) {
          outerArry.push(innerArry);
          innerArry = [];
        }
      }
      setCurves(outerArry);
    }
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4">
        {curves !== undefined ? (
          curves?.map((curve, id) => {
            return <CurveCard key={id} curve={curve} />;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Curves;
