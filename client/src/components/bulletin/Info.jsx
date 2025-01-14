import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@context/store";
import { mCurrency } from "@contract";

const Info = () => {
  const { bulletin } = useGlobalContext();
  return (
    <div className="flex p-1 px-3 bg-slate-50 rounded-md">
      <div className="flex">
        <label className="w-1/2 text-xs font-semibold text-gray-400">
          total <a target="_blank" href={`https://gnosis-chiado.blockscout.com/address/${mCurrency.address}`} className="underline">
            {(bulletin.currency.symbol != undefined) ? bulletin.currency.symbol : "---" }
          </a>
        </label>
        <label className="w-1/2 text-2xl font-semibold text-amber-500 flex justify-end">
          {(bulletin.currency.supply != undefined) ? bulletin.currency.supply : "-"}
        </label>
      </div>
    </div>
  );
};

export default Info;
