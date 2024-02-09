import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

import { useGlobalContext } from "@context/store";
import { HackathonSupportToken, OnboardingSupportToken, ParticipantSupportToken } from "@contract";
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

  const { data: pSvg } = useContractRead({
    ...ParticipantSupportToken,
    functionName: 'generateSvg',
    args: [2]
  })

  console.log(pSvg)

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

  const { data: participantTokenSupply } = useContractRead({
    ...ParticipantSupportToken,
    functionName: 'totalSupply',
    args: []
  })

  useEffect(() => {
  }, [mSvg])

  useEffect(() => {
  }, [qSvg])

  useEffect(() => {
  }, [pSvg])

  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900">
          g0v 大松影響力 NFTs
        </label>
        <div className="px-10 py-5 bg-slate-100">
          <label className=" block text-md font-normal text-gray-900">
            💡 從“知識層”與“實作層”在鏈上的互動，我們客製化了三種不同用途的 Dynamic NFT．除此之外，這三個 NFT 各別擁有各自的自動市場機制，減少各個 NFT 市場被炒．
          </label>
        </div>
        {/*  Hard coding curves for now. */}
        <div className="mb-5" >
          <label className=" block text-md font-normal text-gray-900">
            💡
          </label>
          <SupportCard curveId={1} svg={mSvg} supply={hackathonTokenSupply} />
        </div>
        <div className="mb-5">
          <label className=" block text-md font-normal text-gray-900">
            💡
          </label>
          <SupportCard curveId={2} svg={qSvg} supply={onboardingTokenSupply} />
        </div >
        <div className="mb-5">
          <label className=" block text-md font-normal text-gray-900">
            💡
          </label>
          <SupportCard curveId={3} svg={pSvg} supply={participantTokenSupply} />
        </div >
      </div>
    </>
  );
};

export default Supporters;
