import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

import { useGlobalContext } from "@context/store";
import { mSupportToken, qSupportToken } from "@contract";
import { shortenAddress } from "@utils/shortenAddress";
import CurveCard from "../curves/CurveCard";
import SupportCard from "./SupportCard";
import { ImpactCurves } from "../../../contract";

const Supporters = () => {
  const { data: mSvg } = useContractRead({
    ...mSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })

  const { data: qSvg } = useContractRead({
    ...qSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })


  const { data: qSupporters } = useContractInfiniteReads({
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
  }, [mSvg])

  useEffect(() => {
  }, [qSvg])

  return (
    <>
      <div className="flex flex-col">

        <label
          className="p-4 mb-2 block text-5xl font-bold text-gray-900"
        >

          揪松影響力
        </label>
        <div className="mb-5" >
          <SupportCard curveId={3} svg={mSvg} />
        </div>
        <div className="mb-5">
          <SupportCard curveId={1} svg={qSvg} />
        </div >
      </div>
    </>
  );
};

export default Supporters;
