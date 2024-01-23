import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = () => {
  const { playground, userInfo } = useGlobalContext();
  const { responses } = playground;
  console.log(responses)
  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {/* {parseInt(responses?.taskId?._hex)} */}
        {responses !== undefined ? (
          responses.map((response, id) => {
            return <ResponseCard key={id} taskId={parseInt(response.taskId._hex)} response={parseInt(response.response._hex)} feedback={response.feedback} />;
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
