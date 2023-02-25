import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Cube } from "../";

const MissionCard = ({ missionId }) => {
  const { missions } = useGlobalContext();
  return (
    <>
      <div className="relative group flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-6 shadow">
        {/* <svg
          className="absolute -top-3 -left-3 mb-2 h-10 w-10 text-gray-500 "
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            d="M39 39.4v-6l3.4-10.7 2.1 2.4-2.5 4.1c-.4.7-.2 1.6.5 2.1.7.4 1.6.2 2.1-.5l3.1-5.1c.3-.6.3-1.3-.2-1.8L43 18.8c-.3-.4-.6-.6-1-.8l-5.3-1.7c-.6-.2-1.1-.1-1.6.2L29.8 19l-2.4-5.5c-.3-.8-1.2-1.1-2-.8s-1.1 1.2-.8 2l3 6.9c.3.8 1.2 1.1 2 .8l3.6-1.7-3.1 9.9-2.7 3.3c-.4.5-.6 1.2-.4 1.8l3 11c.3 1.1 1.4 1.7 2.5 1.4s1.7-1.4 1.4-2.5l-2.7-10 1.7-2 2.1.7V40c0 .4.1.8.3 1.1l3.9 6a2 2 0 0 0 2.8.6 2 2 0 0 0 .6-2.8z"
            data-original="#000000"
          />
          <path
            d="M23 33.7a3 3 0 0 0-.4-1l-3.8-4.5 2.8-14.5v-.3L31.1 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1l-9.6 10.4-5.4-1a2 2 0 0 0-1.5.4l-5.1 2.9c-.3.2-.5.4-.6.7l-3 7c-.3.8 0 1.6.8 2 .8.3 1.6 0 2-.8l2.8-6.5 1.9-1.1-1.9 9.7v.5L.3 40c-.6.9-.3 2.2.7 2.7.9.6 2.2.3 2.7-.7l8.4-14 1.4.3.1.1 5.6 6.6L21 46.3c.2 1.1 1.2 1.8 2.3 1.6s1.8-1.2 1.6-2.3z"
            data-original="#000000"
          />
          <circle cx="17" cy="4.5" r="4.5" data-original="#000000" />
          <circle cx="39.1" cy="11" r="4" data-original="#000000" />
          <path
            d="M3.1 8.9c1.5-.3 2.6-1.2 2.5-2.1 0-.2-.2-.4-.4-.6L3.7 1.1c1 .3 1.8.9 2.4 1.7l.9-.6C6.3.9 5 .1 3.6 0L2.3.1 4 5.7l-1.5.1C.9 6.1-.2 7 0 7.9s1.6 1.3 3.1 1zM46 32.5c-1.1-.5-1.7-.3-2.8-.2l1.7 5.6h-1.5c-1.5.3-2.6 1.2-2.5 2.1.2.9 1.6 1.3 3.1 1s2.6-1.2 2.5-2.1c0-.2-.2-.4-.4-.6l-1.5-5.1c1 .3 1.8.9 2.4 1.7l.9-.6c-.1-.4-.7-1.3-1.9-1.8z"
            data-original="#000000"
          />
        </svg> */}
        <div className="absolute bottom-1 right-1 mb-2 ">
          <Cube size={"200px"} />
        </div>

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
          {missions[missionId]?.title}
        </h5>
        <p className="mb-3 font-normal text-gray-500 ">
          {missions[missionId]?.info}
        </p>
        <Link
          to={missionId}
          className="mt-auto inline-flex items-center text-blue-600 hover:underline"
        >
          Read Detail →
        </Link>
      </div>
    </>
  );
};

export default MissionCard;
