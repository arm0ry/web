import React, { useState, useEffect } from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import AskCard from "./AskCard";

const Asks = () => {
  const { bulletin } = useGlobalContext();
  return (
    <>
      {/* <div className="flex flex-col ">
        <label className="mb-2 text-2xl font-semibold text-gray-900 mx-auto">
          報到領取 Currency
        </label>
        
      </div> */}

      <div className="grid grid-cols-1 scroll-smooth gap-5 p-4 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {Object.keys(bulletin.asks).map((id) => {
          return <AskCard key={id} askId={id} />;
        })}
      </div >
    </>
  );
};

export default Asks;
