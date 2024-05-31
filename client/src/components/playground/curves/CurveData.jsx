import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { shortenAddress } from "@utils/shortenAddress";

const CurveData = ({ curve }) => {

  return (
    <>
      <div className="w-1/4 px-10 py-5 rounded-lg flex flex-col space-y-4 text-md font-normal text-gray-900 bg-gray-50">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">total supply</label>
          <label className="text-sm font-normal text-gray-900">{(curve.supply !== undefined) ? curve.supply : 0}</label>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">reserve for future burns </label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.treasury !== undefined) ? curve.treasury : 0} xDai
          </label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">$currency collected</label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.treasury !== undefined) ? curve.currencyCollected : 0} $coffee
          </label>

        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">$stablecoin collected</label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.treasury !== undefined) ? curve.stablecoinCollected : 0} xDai
          </label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">impact generator</label>
          <label className="text-sm font-normal text-gray-900">{shortenAddress(curve.owner)}</label>
        </div>
      </div>
    </>
  );
};

export default CurveData;
