import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { shortenAddress } from "@utils/shortenAddress";

const CurveData = ({ curve }) => {

  useEffect(() => {

  }, [curve])

  return (
    <>
      <div className="w-1/4 px-10 py-5 rounded-lg flex flex-col space-y-4 text-md font-normal text-gray-900 bg-slate-50">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">曲線資金池 | curve treasury ： </label>
          <label className="text-sm font-normal text-gray-900">
            {(curve.pool !== undefined) ? curve.pool : 0} Ξ
            {/* {(ethers.utils.formatUnits(curve.formula[1], "wei") == 0) ? "一元一次方程式 | Linear" : "一元二次方程式 | Parabola"} */}
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">已售出 | total supply ：</label>
          <label className="text-sm font-normal text-gray-900">{(curve.supply !== undefined) ? curve.supply : 0}</label>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">曲線買價 | price to mint ：</label>
          {(curve.formula[1] !== undefined && curve.formula[2] !== undefined && curve.formula[3] !== undefined) ? (
            <label className="text-sm font-normal text-emerald-600">
              y = ({(ethers.utils.formatUnits(curve.formula[1], "wei") == 0) ? "" : `${ethers.utils.formatUnits(curve.formula[1], "wei")} x^2 + `}{ethers.utils.formatUnits(curve.formula[2], "wei")} x{(ethers.utils.formatUnits(curve.formula[3], "wei") == 0) ? "" : ` + ${ethers.utils.formatUnits(curve.formula[3], "wei")}`}) * {ethers.utils.formatEther(curve.formula[0])} Ξ
            </label>
          ) : (
            <></>
          )}

        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">曲線賣價 | price to burn ：</label>
          {((curve.formula[4] !== undefined && curve.formula[5] !== undefined && curve.formula[6] !== undefined)) ? (
            <label className="text-sm font-normal text-amber-600">y = ({(ethers.utils.formatUnits(curve.formula[4], "wei") == 0) ? "" : `${ethers.utils.formatUnits(curve.formula[4], "wei")} x^2 + `}{ethers.utils.formatUnits(curve.formula[5], "wei")} x{(ethers.utils.formatUnits(curve.formula[6], "wei") == 0) ? "" : ` + ${ethers.utils.formatUnits(curve.formula[6], "wei")}`}) * {ethers.utils.formatEther(curve.formula[0])} Ξ</label>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">集資進度 | raised ： </label>
          <label className="text-sm font-normal text-gray-900">{(curve.unclaimed !== undefined) ? curve.unclaimed : 0} Ξ</label>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">管理員 | operator ：</label>
          <label className="text-sm font-normal text-gray-900">{shortenAddress(curve.owner)}</label>
        </div>
      </div>
    </>
  );
};

export default CurveData;
