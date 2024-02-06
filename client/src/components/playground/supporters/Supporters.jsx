import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

import { useGlobalContext } from "@context/store";
import { HackathonSupportToken, OnboardingSupportToken } from "@contract";
import { shortenAddress } from "@utils/shortenAddress";
import CurveCard from "../curves/CurveCard";
import SupportCard from "./SupportCard";
import { ImpactCurves } from "../../../contract";

const Supporters = () => {
  const { data: mSvg } = useContractRead({
    ...HackathonSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })

  const { data: qSvg } = useContractRead({
    ...OnboardingSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })


  const { data: hackathonTokenSupply } = useContractRead({
    ...HackathonSupportToken,
    functionName: 'totalSupply',
    args: []
  })

  const { data: onboardingTokenSupply } = useContractRead({
    ...OnboardingSupportToken,
    functionName: 'totalSupply',
    args: []
  })


  const { data: qSupporters } = useContractInfiniteReads({
    cacheKey: "qSupporters",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: OnboardingSupportToken.address,
            abi: OnboardingSupportToken.abi,
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

          g0v 大松影響力
        </label>
        <div className="mb-5" >
          {/*  Hard coding curves for now. */}
          <SupportCard curveId={1} svg={mSvg} supply={hackathonTokenSupply} />
        </div>
        <div className="mb-5">
          <SupportCard curveId={2} svg={qSvg} supply={onboardingTokenSupply} />
        </div >
      </div>
    </>
  );
};

export default Supporters;
