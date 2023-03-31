import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { taskReadyForReviewList } from "@utils/contract";
import { useGlobalContext } from "@context/store";

import ReviewCard from "./ReviewCard";

// const svg = avatar.toString();

const Review = () => {
  const { playground } = useGlobalContext();
  const { unreviews } = playground;
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate();
  // console.log(playground.tasks)
  // useEffect(() => {
    // const asyncF = async() => {
    //   const _reviews = await taskReadyForReviewList(playground.travelers, playground.taskId);
    //   setReviews(_reviews)
    // }
    // asyncF();
  // }, [])
  
  return (
    <>
      <div className="grid grid-cols-1 gap-10 p-4 xl:grid-cols-2 2xl:grid-cols-3">
        {unreviews.map((review, id) => {
          console.log("review", review)
          return <ReviewCard key={id} review={review} />;
        })}
      </div>
    </>
  );
};

export default Review;
