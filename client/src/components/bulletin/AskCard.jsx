import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Spinner } from "@components";

const AskCard = ({ askId }) => {
  const { bulletin } = useGlobalContext();
  
  return (
    <>
      <div className="group relative flex h-44 flex-col rounded-lg border border-gray-200 bg-white p-6 shadow">
        

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
          {bulletin.asks[askId]?.title}
        </h5>
        <p className="mb-3 font-normal text-gray-500 line-clamp-3 ">
          {bulletin.asks[askId]?.detail}
        </p>

        <Link
          to={askId}
          className="mt-auto inline-flex items-center text-blue-600 hover:underline"
        >
          Read Detail →
        </Link>
      </div>
    </>
  );
};

export default AskCard;
