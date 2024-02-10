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
        <div className="w-5/6 mx-auto flex flex-row rounded-lg px-5 py-5 bg-slate-100 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-2">
            <label className=" block text-md font-normal text-gray-900">
              透過“知識層”與“實作層”在區塊鏈上的互動，我們用 Dynamic NFT 來呈現所有在鏈上的互動紀錄。
            </label>
            {/* <label className=" block text-md font-normal text-gray-900">
              當然，只要有新的紀錄上鏈，Dynamic NFT 也會即時更新。
            </label> */}
            <label className=" block text-md font-normal text-gray-900">
              再給每個 NFT 各自的影響力曲線（bonding curve），作為買賣這些 Dynamic NFT 的窗口。
            </label>
            <label className=" block text-md font-normal text-gray-900">
              影響力曲線是一個無中間人和無權限的自動化市場，可以用來增加資產的流動性，促進自動價格發現（automated price discovery），提升資本效率。
            </label>
            <label className=" block text-md font-normal text-gray-900">
              每個 Dynamic NFT 可以做到某些程度的客製化，給有興趣的朋友更多的發想空間。
            </label>
            <label className=" block text-md font-normal text-gray-900">
              以下是我們針對”戀上大松“所發想的三個 Dynamic NFT 給大家參考～
            </label>
          </div>
        </div >
        <label className=" block text-md font-normal text-gray-900">
          Benefits of svg nft and bonding curve
        </label>
        <label className=" block text-md font-normal text-gray-900">
          Describe below in categories:
          1. NFT - type (svg nft), content (how data is collected), customization (for future reference)
          2. Bonding curve - type (linear or poly) formula,
        </label>
        {/*  Hard coding curves for now. */}
        <div div className="mb-5" >
          <label className=" block text-md font-normal text-gray-900">
            💡
          </label>
          <SupportCard curveId={1} svg={mSvg} supply={hackathonTokenSupply} />
        </div >
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
      </div >
    </>
  );
};

export default Supporters;
