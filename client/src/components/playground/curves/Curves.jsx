import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { TokenCurve } from "../../../contract";
import { ethers } from "ethers";
import {
  useContractInfiniteReads,
  useContractRead,
  paginatedIndexesConfig,
} from "wagmi";
import CurveCard from "./CurveCard";

const Curves = () => {
  const [curves, setCurves] = useState();
  const { playground } = useGlobalContext();
  const { missions, responses } = playground;
  console.log(missions)


  const { data, fetchNextPage, isFetched } = useContractInfiniteReads({
    cacheKey: "curves",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: TokenCurve.address,
            abi: TokenCurve.abi,
            functionName: "getCurveOwner",
            args: [index],
          },
          {
            address: TokenCurve.address,
            abi: TokenCurve.abi,
            functionName: "getCurvePrice",
            args: [true, index, 0],
          },
          {
            address: TokenCurve.address,
            abi: TokenCurve.abi,
            functionName: "getCurvePrice",
            args: [false, index, 0],
          },
          {
            address: TokenCurve.address,
            abi: TokenCurve.abi,
            functionName: "getCurveTreasury",
            args: [index],
          },
          {
            address: TokenCurve.address,
            abi: TokenCurve.abi,
            functionName: "getCurveFormula",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 4, direction: "increment" }
    ),
  });

  useEffect(() => {
    if (data) {
      const tempData = data.pages[0];
      let innerArry = [];
      let outerArry = [];
      for (let i = 0; i < tempData.length; i++) {
        innerArry.push(tempData[i]);
        if (i % 5 === 4) {
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
            return <CurveCard key={id} curve={curve} id={id} />;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Curves;
