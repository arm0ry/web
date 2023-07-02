import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Cube } from "../..";
import {Spinner} from "@components";

const QuestCard = ({ missionId }) => {
  const { playground } = useGlobalContext();
  const { missions } = playground;
  return (
    <>
      <div className="group relative flex h-52 max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-6 shadow">
        
        <div className="absolute bottom-1 right-1 mb-2 ">
        </div>

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
          {missions[missionId]?.title}
        </h5>
        {playground.ipfs[missions[missionId]?.details] ? (
          <p className="mb-3 font-normal text-gray-500 line-clamp-2">
            {playground.ipfs[missions[missionId]?.details].detail}
          </p>
        ) : (
          <Spinner className="h-4 w-4 border-b-2" pathColor="border-gray-500" />
        )}

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

export default QuestCard;
