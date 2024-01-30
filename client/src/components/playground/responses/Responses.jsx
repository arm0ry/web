import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = () => {
  const { playground } = useGlobalContext();
  const { missions, responses } = playground;
  const [filters, setFilters] = useState()

  console.log(missions[1]?.taskIdsLen)

  useEffect(() => {
    console.log(responses)
    var filters
    if (responses !== undefined) {
      let _responses = []
      filters = responses.reduce((filters, response) => {

        for (var i = 0; i < missions[1]?.taskIdsLen; i++) {
          if (response.taskId === i) {

            // TODO: HOW TO GET RESPONSES OF SAME TASKID?????
            // filters[i] = response
            _responses.push(response)
          }

        }



        console.log(_responses)
      })

    }

    console.log(filters)
  }, [responses])


  // useEffect(() => {
  //   console.log(filters)
  // }, [filters])

  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {/* <div>"{tasks[parseInt(response.taskId._hex)]?.content}"</div> */}
        {/* {responses !== undefined ? (
          responses.map((response, id) => {
            return (
              <div>
                <ResponseCard key={id} user={response.user} response={parseInt(response.response._hex)} feedback={response.feedback} />
              </div>
            )
          })
        ) : (
          <></>
        )} */}
        {/* {responses.map((response, id) => {
          return <ResponseCard key={id} taskId={parseInt(response.taskId._hex)} response={parseInt(response.response._hex)} feedback={response.feedback} />;
        })} */}
      </div>
    </>
  );
};

export default Responses;
