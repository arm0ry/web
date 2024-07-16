import React, { useState, useEffect } from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import ListCard from "./ListCard";

const Lists = () => {
  const { playground } = useGlobalContext();
  const { lists } = playground;

  useEffect(() => {
  }, [lists]);

  return (
    <>
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Shop Menu
        </label>
        <div className="w-5/6 mx-auto mt-2 mb-6 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5">
            <div className="space-y-3">
              <label className=" block text-md font-normal text-gray-900">
                This is a prototype built on the <a target="_blank" href="https://gnosis-chiado.blockscout.com/" className="underline"
                >Gnosis Chiado testnet</a> to demo an onchain coordination system can enable reciprocity and mutuality onchain.
              </label>
              <label className=" block text-md font-normal text-gray-900">
                Here, we offer a fictional coffee shop that uses $coffee as a medium of exchange to illustrate how this system works.
              </label>
            </div>
          </div>
        </div >
      </div>

      <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Object.keys(lists).map((id) => {
          return <ListCard key={id} listId={id} lists={lists} />;
        })}
        <div className="flex h-52 max-w-sm items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-6 ">
          <LegoBrickIcon className="mb-2 h-20 w-20 text-gray-400 " />
        </div>
        <div className="flex h-52 max-w-sm items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-6 ">
          <LegoBrickIcon className="mb-2 h-20 w-20 text-gray-400 " />
        </div>
      </div >
    </>
  );
};

export default Lists;
