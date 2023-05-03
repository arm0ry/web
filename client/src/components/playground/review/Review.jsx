import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "@context/store";
import { XpIcon } from "@assets";

import ReviewCard from "./ReviewCard";

// const svg = avatar.toString();

const Review = () => {
  const { playground, userInfo } = useGlobalContext();
  const { unreviews } = playground;

  return (
    <>
      {userInfo.reviewerXP >= 0 ? (
        <div className=" flex flex-row justify-end border-b-2 p-3">
          <div class="inline-flex w-fit items-center  ">
            <span className="mr-1 font-PasseroOne text-lg font-semibold text-gray-600">
              Reviewer
            </span>
            <XpIcon className="h-10" />
            <span className="ml-1 pb-1 font-PasseroOne text-2xl font-bold  text-gray-600">
              {userInfo.reviewerXP}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {unreviews.map((review, id) => {
          return <ReviewCard key={id} review={review} />;
        })}
      </div>
    </>
  );
};

export default Review;
