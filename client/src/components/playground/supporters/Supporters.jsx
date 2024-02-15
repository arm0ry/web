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
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-2">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                透過“供應層”與“行動層”在區塊鏈上的互動，我們可以用 Dynamic NFT 來呈現所有在鏈上互動的紀錄。
              </label>
              <label className=" block text-sm font-normal text-gray-600">
                Through onchain interaction, we can rely on onchain data to populate multiple SVG NFTs with varying purposes.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                如果再給每個 NFT 各自的交易曲線（<a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
                >bonding curve</a>），我們可以自動化交易 NFT 的過程。
              </label>
              <label className=" block text-sm font-normal text-gray-600">
                Then we couple each SVG NFT with a <a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
                >bonding curve</a> to automate trading of the NFTs.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                交易曲線是一個無中間人和無權限的自動化市場，目的是要增加資產的流動性，促進價格發現（price discovery），提升資本效率。
              </label>

              <label className=" block text-sm font-normal text-gray-600">
                Bonding curves are permissionless autonomous markets, it can increase token liquidity, facilitate price discovery, and raise asset efficiency.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                以下是我們針對”鏈上大松“所發想的三個 Dynamic NFT 給大家參考～
              </label>
              <label className=" block text-sm font-normal text-gray-600">
                Below we share 3 SVG NFTs reflecting the impact of g0v hackath0n~
              </label>
            </div>
          </div>
        </div >

        {/* // TODO:  Hard coding curves for now. */}
        <div className="flex flex-col space-y-10">
          <div className="" >
            <SupportCard
              title={"🙌🏼 自己的大松自己救"}
              description={"支持 g0v 大松的沒有人，按下綠色按鈕 ether 鈕鑄造左側 SVG NFT ，按下橘紅色按鈕銷毀 SVG NFT 並取回部分 ether。"}
              engDescription={"Show support for g0v hackath0ns using the green button to mint the SVG NFT on the left. You might also use the orange button to burn the SVG NFT and get back some ether."}
              curveId={1}
              svg={mSvg}
              supply={hackathonTokenSupply}
            />
          </div >
          <div className="">
            <SupportCard
              title={"📝 大松新參者小紙條"}
              description={"支持 ”📝 大松新參者小紙條“ 的沒有人，按下綠色按鈕 ether 鈕鑄造左側 SVG NFT ，按下橘紅色按鈕銷毀 SVG NFT 並取回部分 ether。"}
              engDescription={"To support the onboarding process at g0v hackath0ns, use the green button to mint the SVG NFT on the left. You might also use the orange button to burn the SVG NFT and get back some ether."}
              curveId={2}
              svg={qSvg}
              supply={onboardingTokenSupply}
            />
          </div >
          <div className="">
            <SupportCard
              title={"🎖️ 參與大松之影響力勳章"}
              description={"支持 ”🎖️ 參與大松之影響力勳章“ 的沒有人，按下綠色按鈕 ether 鈕鑄造左側 SVG NFT ，按下橘紅色按鈕銷毀 SVG NFT 並取回部分 ether。"}
              engDescription={"To support those that have participated in past g0v hackath0ns, use the green button to mint the SVG NFT on the left. You might also use the orange button to burn the SVG NFT and get back some ether."}
              curveId={3}
              svg={pSvg}
              supply={participantTokenSupply}
            />
          </div >
        </div>
      </div >
    </>
  );
};

export default Supporters;
