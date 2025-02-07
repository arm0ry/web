import React from "react";
import { useGlobalContext } from "@context/store";
import { mCurrency } from "@contract";

const CurrencyBalance = () => {
  const { bulletin } = useGlobalContext();
  return (
    <div className="flex p-1 space-x-1  rounded-md">
      <div className="flex bg-slate-100 p-1 justify-center items-center space-x-2 rounded-sm">
        <label className="w-1/2 text-xs font-medium text-gray-400">
          <a target="_blank" href={`https://gnosis-chiado.blockscout.com/address/${mCurrency.address}`} className="underline">
            currency
          </a> balance
        </label>
        <label className="w-1/2 text-2xl font-semibold text-amber-500 flex justify-end">
          {(bulletin.user.balance != undefined) ? bulletin.user.balance : "..."}
        </label>
      </div>
    </div>
  );d
};

export default CurrencyBalance;
