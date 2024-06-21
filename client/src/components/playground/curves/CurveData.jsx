import React from "react";

const CurveData = ({ curve }) => {
  return (
    <>
      <div className="w-1/4 px-10 py-5 rounded-lg flex flex-col space-y-4 text-md font-normal text-gray-900 bg-gray-50">

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">current / max supply</label>
          <label className="text-sm font-normal text-gray-900">{(curve.tokenSupply !== undefined) ? curve.tokenSupply : 0} / {(curve.tokenMarket !== undefined) ? curve.tokenMarket.limit : 0}</label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">price in $local</label>
          <label className="text-sm font-normal text-gray-900">{(curve.mintPrice !== undefined) ? curve.mintPrice : 0} ${(curve.currency_symbol !== undefined) ? String(curve.currency_symbol).toLowerCase() : ""}</label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">reserve for future burns </label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.treasury !== undefined) ? curve.treasury : 0} xDai
          </label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">$local collected</label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.currencyCollected !== undefined) ? curve.currencyCollected : 0} ${(curve.currency_symbol !== undefined) ? String(curve.currency_symbol).toLowerCase() : ""}
          </label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">$stablecoin collected</label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.stablecoinCollected !== undefined) ? curve.stablecoinCollected : 0} xDai
          </label>
        </div>

        {/* <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">impact generator</label>
          <label className="text-sm font-normal text-gray-900">{shortenAddress(curve.owner)}</label>
        </div> */}
      </div>
    </>
  );
};

export default CurveData;
