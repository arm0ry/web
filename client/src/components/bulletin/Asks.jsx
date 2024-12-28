import React, { useState, useEffect } from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import AskCard from "./AskCard";

const Asks = () => {
  const { bulletin } = useGlobalContext();
  return (
    <>
      <div className="flex flex-col mt-16">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <div className="flex flex-row space-x-10 items-center">
            <div className="">
              <label className="py-5 text-md font-normal text-gray-900">
                💡
              </label>
            </div>
            <div className="space-y-4">
              <label className="text-md font-normal text-gray-900">
                This is a prototype built on the <a target="_blank" href="https://gnosis-chiado.blockscout.com/" className="underline"
                >Gnosis Chiado testnet</a> to demonstrate circulation of local currencies.
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 scroll-smooth gap-5 p-4 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {Object.keys(bulletin.asks).map((id) => {
          return <AskCard key={id} askId={id} />;
        })}
      </div >
    </>
  );
};

export default Asks;
