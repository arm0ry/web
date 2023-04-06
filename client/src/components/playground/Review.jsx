import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";

import ReviewCard from "./ReviewCard";

// const svg = avatar.toString();

const Review = () => {
  const { playground } = useGlobalContext();
  const { unreviews } = playground;
  
  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {unreviews.map((review, id) => {
          return <ReviewCard key={id} review={review} />;
        })}
      </div>
    </>
  );
};

export default Review;
