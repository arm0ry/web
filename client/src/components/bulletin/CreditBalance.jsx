import React from "react";
import { useGlobalContext } from "@context/store";

const CreditBalance = () => {
  const { bulletin } = useGlobalContext();
  const user = bulletin.user;
  return (
    <div className="flex flex-col px-2 rounded-sm justify-center items-end">
      <div className="flex items-baseline space-x-2">
        <label className="pl-2 text-2xl font-semibold text-amber-500">
          {(user.credit != undefined) ? user.credit  : "..."}
        </label>
        <label className="text-md font-light text-amber-500">
          /
        </label>
        <label className="text-xl font-normal text-amber-500">
          {(user.limit != undefined) ? user.limit  : "..."}
        </label>
      </div>
      <div className="flex">
        <label className="text-xs text-gray-400">credit earned / line</label>
      </div>
    </div>
  );
};

export default CreditBalance;
