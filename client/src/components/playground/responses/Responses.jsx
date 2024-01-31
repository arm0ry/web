import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = () => {
  const { playground } = useGlobalContext();
  const { missions, responses } = playground;
  const [result, setResult] = useState([])

  console.log(missions[1]?.taskIdsLen)

  useEffect(() => {
    const result = Object.groupBy(responses, ({ taskId }) => taskId)
    Object.entries(result).map(([key, value]) => console.log(key, value))
    setResult(result)







    console.log(result)

  }, [responses])


  // useEffect(() => {
  //   console.log(filters)
  // }, [filters])

  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {/* <div>"{tasks[parseInt(response.taskId._hex)]?.content}"</div> */}
        {responses !== undefined ? (
          Object.entries(Object.groupBy(responses, ({ taskId }) => taskId)).map(([key, value]) => {
            return (
              <div>
                <ResponseCard key={key} id={key} responses={value} />
              </div>
            )
          })
        ) : (
          <></>
        )}
        {/* {responses.map((response, id) => {
          return <ResponseCard key={id} taskId={parseInt(response.taskId._hex)} response={parseInt(response.response._hex)} feedback={response.feedback} />;
        })} */}
      </div>
    </>
  );
};

export default Responses;
