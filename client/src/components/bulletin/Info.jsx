import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@context/store";

const Info = () => {
  const { bulletin } = useGlobalContext();
  return (
    <div className="flex flex-col space-y-3 items-center w-1/6 bg-slate-100 rounded-md p-2 my-4 mx-auto">
      
      <div className="flex items-baseline space-x-4 w-full">
        <label className="w-1/2 text-2xl font-semibold text-amber-500 flex justify-end">
          {(bulletin.currency.supply != undefined) ? bulletin.currency.supply : "-"}
        </label>
        <label className="w-1/2 text-xs font-semibold text-gray-400">
          total <a target="_blank" href="https://gnosis-chiado.blockscout.com/address/0x9c2471750cbc9abeebcd396fd84137977ab1b3a8" className="underline">
            $ARM0RY
          </a>
        </label>
      </div>

      {/* <div className="flex items-baseline space-x-4 w-full">
        <label className="w-1/2 text-2xl font-semibold text-amber-500 flex justify-end">
          {(bulletin.currency.supply != undefined) ? bulletin.currency.supply : "-"}
        </label>
        <label className="w-1/2 text-xs font-semibold text-gray-400">
          hodlers
        </label>
      </div> */}


    </div>
  );
};

export default Info;
