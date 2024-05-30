import React, { useEffect } from "react";
import CurveCard from "../curves/CurveCard";
import CurveData from "../curves/CurveData";

const ReportCard = ({ id, curve }) => {
  return (
    <>
      <div className={`h-auto w-5/6  mx-auto space-y-4`}>
        <label className="text-lg font-medium text-gray-600 ">
          {curve.tokenTitle.name}
        </label>
        <div className="flex flex-col space-y-1 bg-slate-50 p-5 rounded-lg">
          <label className="text-md font-normal text-gray-900 ">
            {curve.tokenTitle.desc}
          </label>
        </div>

        <div className="w-full flex justify-center space-x-16 bg-amber-50 rounded-lg">
          <div className="flex flex-row items-center space-x-14 ">
            <img
              className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(curve.tokenUri)}`}
              alt="Supporter Token"
            ></img>
            {curve !== undefined ? (<CurveCard curve={curve} />) : (<></>)}
          </div>

          {(curve !== undefined) ? (<CurveData curve={curve} />) : (<></>)}

        </div >
      </div >
    </>
  );
};

export default ReportCard;
