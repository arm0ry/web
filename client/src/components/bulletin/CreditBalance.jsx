import React from "react";
import { useGlobalContext } from "@context/store";

const CreditBalance = () => {
  const { bulletin } = useGlobalContext();
  return (
    <div className="flex flex-col px-2 rounded-sm bg-slate-100 justify-center items-end ">
      <div className="flex items-baseline space-x-1">
        <label className="text-xl font-semibold text-amber-500">
          {(bulletin.user.credit != undefined) ? bulletin.user.credit  : "..."}
        </label>
        <label className="text-sm font-normal text-amber-500">
          /
        </label>
        <label className="text-sm font-normal text-amber-500">
          {(bulletin.user.limit != undefined) ? bulletin.user.limit  : "..."}
        </label>
      </div>
      <div className="flex">
        <label className="text-xs text-gray-400">credits</label>
      </div>
    </div>
  );
};

export default CreditBalance;
