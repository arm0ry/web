import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = ({ taskId }) => {
  const { playground } = useGlobalContext();
  const { missions, responses } = playground;
  const [results, setResults] = useState([])

  console.log(responses)

  useEffect(() => {
    // const result = Object.groupBy(responses, ({ taskId }) => taskId)
    // Object.entries(result).map(([key, value]) => console.log(key, value))
    // setResult(result)
    if (responses !== undefined) {
      const _results = []

      for (let i = 0; i < responses.length; i++) {
        if (responses[i].taskId === taskId) {
          _results.push(responses[i])
        }
      }
      setResults(_results)
    }
  }, [responses])

  return (
    <>
      <label className="w-full my-3 font-3xl text-slate-600 font-semibold ">
        沒有人們的參與心得：
      </label>
      <div className="grid grid-cols-2 gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {(results.length > 0) ? (results.map((response, id) => {
          return <ResponseCard key={id} response={response} />;
        }))
          : (
            <>
            </>
          )}
      </div>
    </>
  );
};

export default Responses;
