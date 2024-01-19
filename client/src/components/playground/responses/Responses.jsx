import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ResponseCard from "./ResponseCard";

// const svg = avatar.toString();

const Responses = () => {
  const { playground, userInfo } = useGlobalContext();
  const { unreviews } = playground;
  return (
    <>
      <div>Hello</div>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {unreviews.map((review, id) => {
          return <ResponseCard key={id} review={review} />;
        })}
      </div>
    </>
  );
};

export default Responses;
