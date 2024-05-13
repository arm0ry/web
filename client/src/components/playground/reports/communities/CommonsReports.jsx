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
          Pooled Impact [WIP]
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
                >bonding curve</a> to automate distribution of local currencies and stablecoins. Credit: <a target="_blank" href="https://p2pfoundation.net/" className="underline"
                >P2P Foundation</a> & <a target="_blank" href="http://regenerosity.com/" className="underline">Regeneorsity</a>.
              </label>
            </div>
            <div className="space-y-1">

              <label className=" block text-md font-normal text-gray-700">
                Bonding curves are autonomous markets. Its programmability enables communities to transact for local products and serivces, and also segment portions of transaction for infinite potential. They ensure token liquidity, facilitate price discovery, and increase asset efficiency.
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
              title={"Flat Collection: Community Onboarding"}
              description={"Flat Collections are static in amount to collect, the amount does not chage per token supplies or time."}
              engDescription={"Flat Collections are appropriate for Lists that involve personal time worked."}
              curveId={5}
              svg={svg}
              supply={listTokenSupply}
            />
          </div >
          <div>
            <SupportCard
              title={"Curved Support: Wildnerness Park (IRL activities)"}
              description={"Parallel Ownership"}
              engDescription={"While the trail posts are listed in the NFT rather than displayed beautifully over a satelite map of the trail, we can get an idea of how wilderness parks, managed by local governments or communities, may use this as real-time heatmap for trails. Most trail posts today have QR codes on them already, we can repurpose them for hikers to submit onchain check-ins and report trail conditions. Kind of like Waze for trails! In addition to being the medium for fundraising, this NFT can also help locals identify traffic on trails, assess maintainenance schedule, and potentially help locate hikers when they get lost. Best of all, this is cheap to do!"}
              curveId={6}
              svg={wpSvg}
              supply={wpSupply}
            />
          </div>
          <div>
            <SupportCard
              title={"Curved Support 2: Music Collection (IP)"}
              engDescription={"Practically, Curved Support adds a layer on top of Flat Collection & an offers opportunities for supporters to exit. It is appropriate for Lists that involve personal time worked, produce local values that circulate within local community, and external values that may enter or leave the local economy. The flat base of Curved Support operate similar to that of Flat Collections, and the upward curve represent values sustained by the collective impact and influence of the Lists. Here, we use the same NFT as a living album cover that showcase interactions with its content in real-time."}
              curveId={9}
              svg={nuSvg}
              supply={nuSupply}
            />
          </div>
          <div>
            <SupportCard
              title={"Harberger Sponsor: g0v Hackath0n [WIP]"}
              engDescription={"In addition to using bonding curves as the pricing and ownership mechanism for Lists, we can also use Harberger Tax to maintain serial ownership of the Lists. This mechanism is appropriate for supporters looking for more exclusive ownership and relationship with the Lists owners. "}
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
