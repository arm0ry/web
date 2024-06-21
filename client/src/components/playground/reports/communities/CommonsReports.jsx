import React, { useState, useEffect } from "react";
import ReportCard from "../ReportCard";
import { useGlobalContext } from "@context/store";

const CommonsReports = () => {
  const { playground } = useGlobalContext();
  console.log(playground.curves)
  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Impact by Chiado Coffee Shop
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-3">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                And further build plurality of NFTs using onchain assets for fundraising, impact evaluation, and other purposes.
              </label>
            </div>
            {/* <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                We bond each SVG NFT to its own <a target="_blank" href="https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5" className="underline"
                >bonding curve</a> to automate price discovery and distribution of local currencies and stablecoins. Credit: <a target="_blank" href="https://p2pfoundation.net/" className="underline"
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
            </div> */}
          </div>
        </div >

        <div className="flex flex-col space-y-10">

          <div>
            <div className="">
              {(Object.keys(playground.curves).length > 0) ? Object.keys(playground.curves).map((id) => {
                return (
                  <div key={id} className="mb-8">
                    <ReportCard curve={playground.curves[id]} />
                  </div>
                )
              }) : <div className="">Loading...</div>}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default CommonsReports;
