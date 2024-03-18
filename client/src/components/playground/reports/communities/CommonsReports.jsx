import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import { MissionToken } from "@contract";
import SupportCard from "../ReportCard";

const CommonsReports = () => {
  const { data: svg } = useContractRead({
    ...MissionToken,
    functionName: 'generateSvg',
    args: [1]
  })

  const { data: missionTokenSupply } = useContractRead({
    ...MissionToken,
    functionName: 'totalSupply',
    args: []
  })

  useEffect(() => {
  }, [svg])

  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Impact Reports
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-3">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Through onchain interaction, we can rely on onchain data to multiple SVG NFTs to display data onchain.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Then we couple each SVG NFT with a <a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
                >bonding curve</a> to automate trading of the NFTs.
              </label>
            </div>
            <div className="space-y-1">

              <label className=" block text-md font-normal text-gray-700">
                Bonding curves are permissionless autonomous markets, it can increase token liquidity, facilitate price discovery, and raise asset efficiency.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Below we share 3 SVG NFTs reflecting the impact of g0v hackath0n~
              </label>
            </div>
          </div>
        </div >

        <div className="flex flex-col space-y-10">
          <div className="" >
            <SupportCard
              title={"Navigation Tutorial"}
              engDescription={"Show support for the website turorial using the green button to mint the SVG NFT on the left. Check the curve data to your right and view the token for sale on the left. You might also use the orange button to burn the SVG NFT and get back some ether."}
              curveId={5}
              svg={svg}
              supply={missionTokenSupply}
            />
          </div >
        </div>
      </div >
    </>
  );
};

export default CommonsReports;
