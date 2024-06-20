import React from "react";

const CurveData = ({ curve }) => {
  return (
    <>
      <div className="w-1/4 px-10 py-5 rounded-lg flex flex-col space-y-4 text-md font-normal text-gray-900 bg-gray-50">

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">max supply</label>
          <label className="text-sm font-normal text-gray-900">{(curve.tokenMarket !== undefined) ? curve.tokenMarket.limit : 0}</label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-500">total sold</label>
          <label className="text-sm font-normal text-gray-900">{(curve.tokenSupply !== undefined) ? curve.tokenSupply : 0}</label>
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
            {(curve.currencyCollected !== undefined) ? curve.currencyCollected : 0} $coffee
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
