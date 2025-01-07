import React, { useState, useEffect } from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import AskCard from "./AskCard";

const Asks = () => {
  const { bulletin } = useGlobalContext();
  console.log(bulletin.currency.supply)
  return (
    <>
      <div className="flex flex-col mt-16">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <div className="flex flex-row space-x-10 items-center">
            <div className="flex flex-col space-y-2">
              <label className="text-2xl font-semibold text-amber-500">
                {(bulletin.currency.supply != undefined) ?
                  bulletin.currency.supply : "-"}
              </label>
              <label className=" text-xs font-normal text-gray-400">
                <a target="_blank" href="https://gnosis-chiado.blockscout.com/address/0x9c2471750cbc9abeebcd396fd84137977ab1b3a8" className="underline">
                  $ARM0RY
                </a>
              </label>
            </div>
            <div className="flex flex-col">
              <div>
              <label className="text-md font-normal text-gray-900">
                用區塊鏈的社群貨幣具體化我們在 g0v 黑客松所創造的影響力～
              </label>
              </div>
              <div>
                <label className="text-sm font-normal text-gray-900">
                  This is a prototype built on the <a target="_blank" href="https://gnosis-chiado.blockscout.com/" className="underline"
                  >Gnosis Chiado testnet</a> to circulate $ARM0RY at g0v's bi-monthly hackathons.
                </label>
              </div>
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
