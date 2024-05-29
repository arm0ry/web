import React, { useEffect } from "react";
import CurveCard from "../curves/CurveCard";
import CurveData from "../curves/CurveData";

const ReportCard = ({ id, curve }) => {

  useEffect(() => {
    console.log("this is curve - ", curve);

  }, [curve])
  return (
    <>
      <div className="flex flex-col space-y-3">

        <div className={`h-auto w-5/6  mx-auto`}>
          <label className="text-lg font-medium text-gray-600 ">
            {curve.metadata.name}
          </label>
          <div className="flex flex-col space-y-1 bg-slate-50 p-5 rounded-lg">
            <label className="text-md font-normal text-gray-900 ">
              {curve.metadata.desc}
            </label>
            <label className="text-sm font-normal text-gray-600 ">
              {/* {engDescription} */}
            </label>
          </div>

          <div className="w-full flex items-center justify-center space-x-16 bg-amber-50 rounded-lg">
            <div className="">
              {(curve.uri !== undefined) ? (
                <img
                  className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
                  src={curve.uri}
                  alt="Supporter Token"
                ></img>
              ) : (
                <div>loading...</div>
              )}

            </div>

            <div className="w-1/3">
              {curve !== undefined ? (<CurveCard curve={curve} />) : (<></>)}
            </div>

            {(curve !== undefined) ? (<CurveData curve={curve} />) : (<></>)}
          </div >
        </div >
      </div >
    </>
  );
};

export default ReportCard;
