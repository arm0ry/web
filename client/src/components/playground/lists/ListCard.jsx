import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Cube } from "../..";
import { Spinner } from "@components";

const ListCard = ({ listId, lists }) => {
  console.log(lists)
  return (
    <>
      <div className="group relative flex h-60 max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-6 shadow">
        <div className="absolute bottom-1 right-1 mb-2 ">
          {/* <Cube size={"200px"} /> */}
        </div>

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
          {lists[listId]?.title}
        </h5>
        <p className="mb-3 font-normal text-gray-500 line-clamp-3 ">
          {lists[listId]?.detail}
        </p>

        {/* // TODO: Restore after testing completes */}
        {/* {playground.ipfs[lists[listId]?.detail] ? (
          <p className="mb-3 font-normal text-gray-500 line-clamp-2 ">
            {playground.ipfs[lists[listId]?.detail].detail}
          </p>
        ) : (
          <Spinner className="h-4 w-4 border-b-2" pathColor="border-gray-500" />
        )} */}

        <Link
          to={listId}
          className="mt-auto inline-flex items-center text-blue-600 hover:underline"
        >
          Read Detail →
        </Link>
      </div>
    </>
  );
};

export default ListCard;
