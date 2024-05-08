import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import { ListToken, WildernessParkToken, NujabesToken, HackathonSupportToken } from "@contract";
import SupportCard from "../ReportCard";

const CommonsReports = () => {
  const { data: svg } = useContractRead({
    ...ListToken,
    functionName: 'generateSvg',
    args: [1]
  })

  const { data: listTokenSupply } = useContractRead({
    ...ListToken,
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

  const { data: nuSvg } = useContractRead({
    ...NujabesToken,
    functionName: 'generateSvg',
    args: [1]
  })

  const { data: nuSupply } = useContractRead({
    ...NujabesToken,
    functionName: 'totalSupply',
    args: []
  })

  const { data: mSvg } = useContractRead({
    ...HackathonSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })

  const { data: hackathonTokenSupply } = useContractRead({
    ...HackathonSupportToken,
    functionName: 'totalSupply',
    args: []
  })

  useEffect(() => {
  }, [svg])

  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Pooled Impact
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-3">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Through onchain interactions, we can build custom SVG NFTs as native community assets for fundraising, impact evaluation, and other purposes.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                We bond each SVG NFT to its own <a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
                >bonding curve</a> to automate trading of the NFTs and distribution of transaction fees.
              </label>
            </div>
            <div className="space-y-1">

              <label className=" block text-md font-normal text-gray-700">
                Bonding curves are autonomous markets, and they ensure token liquidity, facilitate price discovery, and increase asset efficiency.
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
              title={"Flat Donation: Community Onboarding"}
              engDescription={"Communities may use SVG NFTs to showcase live participation in community activities. This particular NFT reflects participation in the 'Create a List' tutorial. We welcome any flat donations for our effort."}
              curveId={5}
              svg={svg}
              supply={listTokenSupply}
            />
          </div >
          <div>
            <SupportCard
              title={"Curved Support: Wildnerness Park"}
              engDescription={"While the trail posts are listed in the NFT rather than displayed beautifully over a satelite map of the trail, we can get an idea of how wilderness parks, managed by local governments or communities, may use this as real-time heatmap for trails. Most trail posts today have QR codes on them already, we can repurpose them for hikers to submit onchain check-ins and report trail conditions. Kind of like Waze for trails! In addition to being the medium for fundraising, this NFT can also help locals identify traffic on trails, assess maintainenance schedule, and potentially help locate hikers when they get lost. Best of all, this is cheap to do!"}
              curveId={6}
              svg={wpSvg}
              supply={wpSupply}
            />
          </div>
          <div>
            <SupportCard
              title={"Curved Support 2: Music Collection"}
              engDescription={"The same NFT may also be used as a living album cover."}
              curveId={9}
              svg={nuSvg}
              supply={nuSupply}
            />
          </div>
          <div>
            <SupportCard
              title={"Harberger Sponsor: g0v Hackath0n [WIP]"}
              engDescription={"Similar to how TESTNET Wilderness Park may showcase a heat map of trail activities using the NFT, hackathon hosts may use similar techniques to preserve cumulative participation. What is different here is the use of Harberger Tax as the NFT's pricing and ownership (serial) mechanism, which is appropriate for supporters looking for more exclusive ownership and relationship with the hackathon hosts. "}
              curveId={9}
              svg={mSvg}
              supply={hackathonTokenSupply}
            />
          </div>
        </div>
      </div >
    </>
  );
};

export default CommonsReports;
