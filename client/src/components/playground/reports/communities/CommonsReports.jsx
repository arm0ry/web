import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import { MissionToken, WildernessParkToken, NujabesToken } from "@contract";
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

  const { data: wpSvg } = useContractRead({
    ...WildernessParkToken,
    functionName: 'generateSvg',
    args: [1]
  })

  const { data: wpSupply } = useContractRead({
    ...WildernessParkToken,
    functionName: 'totalSupply',
    args: []
  })

  // const { data: nuSvg } = useContractRead({
  //   ...NujabesToken,
  //   functionName: 'generateSvg',
  //   args: [1]
  // })

  // const { data: nuSupply } = useContractRead({
  //   ...NujabesToken,
  //   functionName: 'totalSupply',
  //   args: []
  // })

  useEffect(() => {
  }, [svg])

  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Impact of Recipe Commons
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-3">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Through onchain interaction, we can build custom SVG NFTs as native community assets for fundraising, impact evaluation, and other purposes.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Then we bond each SVG NFT to its own <a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
                >bonding curve</a> to automate trading of the NFTs and distribution of transaction fees to communities.
              </label>
            </div>
            <div className="space-y-1">

              <label className=" block text-md font-normal text-gray-700">
                Bonding curves are autonomous markets, they ensure token liquidity, facilitate price discovery, and increase asset efficiency.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
              </label>
            </div>
          </div>
        </div >

        <div className="flex flex-col space-y-10">
          <div className="" >
            <SupportCard
              title={"Example 1: Community Onboarding"}
              engDescription={"Communities may use SVG NFTs as simple reports to showcase live updates of participation"}
              curveId={5}
              svg={svg}
              supply={missionTokenSupply}
            />
          </div >
          <div>
            <SupportCard
              title={"Example 2: Wildnerness Park"}
              engDescription={"While the trail posts are listed in the NFT rather than displayed beautifully over a satelite map of the trail, we can get an idea of how wilderness parks, managed by local governments or communities, may use this as real-time heatmap for trails. Most trail posts today have QR codes on them already, we can repurpose them for hikers to submit onchain check-ins and report trail conditions. Kind of like Waze for trails! In addition to being the medium for fundraising, this NFT can also help locals identify traffic on trails, assess maintainenance schedule, and potentially help locate hikers when they get lost. Best of all, this is cheap to do!"}
              curveId={6}
              svg={wpSvg}
              supply={wpSupply}
            />
          </div>
          {/* <div>
            <SupportCard
              title={"Example 3: Music Collection"}
              engDescription={"Show support for the website turorial using the green button to mint the SVG NFT on the left. Check the curve data to your right and view the token for sale on the left. You might also use the orange button to burn the SVG NFT and get back some ether."}
              curveId={9}
              svg={nuSvg}
              supply={nuSupply}
            />
          </div> */}
        </div>
      </div >
    </>
  );
};

export default CommonsReports;
