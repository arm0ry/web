import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = ({ domain, itemId }) => {
  const { playground } = useGlobalContext();
  const { logger, loggerTps, responses, commonsResponses } = playground;
  const [touchpoints, setTouchpoint] = useState([])

  console.log(domain, commonsResponses, logger, loggerTps)

  useEffect(() => {
    if (domain === "commons") {
      if (loggerTps !== undefined) {
        const _touchpoints = []

        for (let i = 0; i < loggerTps.length; i++) {
          if (parseInt(loggerTps[i].itemId._hex) === itemId) {
            _touchpoints.push(loggerTps[i])
          }
        }
        setTouchpoint(_touchpoints)
      }
    } else {
      if (responses !== undefined) {
        const _touchpoints = []

        for (let i = 0; i < responses.length; i++) {
          if (parseInt(responses[i].itemId._hex) === itemId) {
            _touchpoints.push(responses[i])
          }
        }
        setTouchpoint(_touchpoints)
      }
    }
  }, [responses, loggerTps])

  return (
    <>
      <label className="w-full my-3 font-3xl text-slate-600 font-semibold ">
        心得 ｜ Feedback：
      </label>
      <div className="grid grid-cols-2 gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {(touchpoints.length > 0) ? (touchpoints.map((response, id) => {
          return <ResponseCard key={id} response={response} />;
        }))
          : (
            <div className="bg-slate-100 text-slate-400 h-32 rounded-lg flex items-center justify-center">
              等待中... ｜ Patiently waiting...
            </div>
          )}
      </div>
    </>
  );
};

export default Responses;
