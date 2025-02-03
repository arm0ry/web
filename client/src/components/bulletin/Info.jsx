import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@context/store";
import { mCurrency } from "@contract";

const Info = () => {
  const { bulletin } = useGlobalContext();
  return (
    <div className="flex p-1 px-3 bg-slate-50 rounded-md">
      <div className="flex">
        <label className="w-1/2 text-xs font-medium text-gray-400">
          <a target="_blank" href={`https://gnosis-chiado.blockscout.com/address/${mCurrency.address}`} className="underline">
            currency
          </a> supply
        </label>
        <label className="w-1/2 text-2xl font-semibold text-amber-500 flex justify-end">
          {(bulletin.currency.supply != undefined) ? bulletin.currency.supply : "..."}
        </label>
      </div>
    </div>
  );d
};

export default Info;
