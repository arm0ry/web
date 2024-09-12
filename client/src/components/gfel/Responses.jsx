import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = ({ itemId }) => {
  const { playground } = useGlobalContext();
  const { loggerTps } = playground;
  const [touchpoints, setTouchpoint] = useState([])

  useEffect(() => {
    if (loggerTps !== undefined) {
      const _touchpoints = []

      for (let i = 0; i < loggerTps.length; i++) {
        if (parseInt(loggerTps[i].itemId._hex) === itemId) {
          _touchpoints.push(loggerTps[i])
        }
      }
      setTouchpoint(_touchpoints)
    }

  }, [loggerTps])

  return (
    <>
      <label className="w-full my-3 font-3xl text-slate-600 font-semibold ">
        Feedback | 心得 :
      </label>
      <div className="grid grid-cols-2 gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {(touchpoints.length > 0) ? (touchpoints.map((response, id) => {
          return <ResponseCard key={id} response={response} />;
        }))
          : (
            <div className="bg-slate-100 text-slate-400 h-32 rounded-lg flex items-center justify-center">
              Patiently waiting... | 等待中... 
            </div>
          )}
      </div>
    </>
  );
};

export default Responses;
