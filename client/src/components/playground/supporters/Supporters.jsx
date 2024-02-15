import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import { HackathonSupportToken, OnboardingSupportToken, ParticipantSupportToken } from "@contract";
import SupportCard from "./SupportCard";

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
    // console.log(pSvg)
  }, [pSvg])

  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          g0v 大松影響力 NFTs
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-100 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-2">
            <label className=" block text-md font-normal text-gray-900">
              透過“知識層”與“實作層”在區塊鏈上的互動，我們可以用 Dynamic NFT 來呈現所有在鏈上互動的紀錄。
            </label>
            <label className=" block text-md font-normal text-gray-900">
              如果再給每個 NFT 各自的交易曲線（<a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
              >bonding curve</a>），我們可以自動化交易 NFT 的過程。
            </label>
            <label className=" block text-md font-normal text-gray-900">
              交易曲線是一個無中間人和無權限的自動化市場，目的是要增加資產的流動性，促進價格發現（price discovery），提升資本效率。
            </label>
            <label className=" block text-md font-normal text-gray-900">
              以下是我們針對”鏈上大松“所發想的三個 Dynamic NFT 給大家參考～
            </label>
          </div>
        </div >

        {/* // TODO:  Hard coding curves for now. */}
        <div className="flex flex-col space-y-5 ">
          <div className="" >
            <SupportCard title={"🙌🏼 自己的大松自己救"} curveId={1} svg={mSvg} supply={hackathonTokenSupply} />
          </div >
          <div className="mb-5">
            <SupportCard title={"📝 大松新參者小紙條"} curveId={2} svg={qSvg} supply={onboardingTokenSupply} />
          </div >
          <div className="mb-5">
            <SupportCard title={"🎖️ 參與大松之影響力勳章"} curveId={3} svg={pSvg} supply={participantTokenSupply} />
          </div >
        </div>
      </div >
    </>
  );
};

export default Supporters;
