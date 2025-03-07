import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@context/store";
import AskCard from "./AskCard";
import CurrencyBalance from "./CurrencyBalance";

const Asks = () => {
  const { bulletin } = useGlobalContext();
  console.log(bulletin)
  return (
    <>
      <div className="flex justify-between items-center">
        <label className="px-4 m-2 text-2xl font-semibold text-slate-600">
          報到領取 | earn
        </label>
        {/* <CurrencyBalance /> */}
      </div>

      <div className="grid grid-cols-1 scroll-smooth gap-5 px-4 md:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2">
        {Object.keys(bulletin.asks).map((id) => {
          return <AskCard key={id} askId={id} />;
        })}
        {(Object.keys(bulletin.asks).length == 0) ?
          <div className="flex flex-col rounded-lg justify-between border border-gray-200 bg-white p-5 shadow">
            <div className="flex flex-row justify-between w-full">
              <div className="w-full">
                <h5 className="mb-2 text-2xl font-medium text-gray-900 ">
                  Loading...
                </h5>
                <p className="mb-5 text-sm font-light text-gray-500 line-clamp-3 overflow-scroll">
                  Loading...
                </p>
              </div>
              <div className="flex items-start justify-end rounded-md">
                <button className="flex items-center justify-center rounded-full p-3 text-black hover:bg-amber-100 bg-yellow-100">
                  🥩
                </button>
              </div>
            </div>
          </div >
          :
          <></>
        }
      </div>
    </>
  );
};

export default Asks;
