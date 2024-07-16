import React, { useState, useEffect } from "react";
import ReportCard from "../ReportCard";
import { useGlobalContext } from "@context/store";

const CommonsReports = () => {
  const { playground } = useGlobalContext();
  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Marketplace
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-3">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-700">
                Using Dynamic NFTs as medium, Chiado Coffee Shop can build intentional relationships within and across communities.
              </label>
            </div>
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
