import React from "react";
import { showModal } from "@context/actions/modalAction";

const Review = () => {
  return (
    <>
      <button type="button" onClick={()=>{showModal({ type: 0, title: "Hello" })}}>
        Mooooodalllll
      </button>
    </>
  );
};

export default Review;
