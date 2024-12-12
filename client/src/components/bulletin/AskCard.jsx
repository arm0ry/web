import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import { Spinner } from "@components";
import { ethers } from "ethers";

const AskCard = ({ askId }) => {
  const { bulletin } = useGlobalContext();
  console.log(bulletin);
  return (
    <>
      <div className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow">
        <div className="flex flex-row w-full bg-red-50">
          <div className="w-1/2 bg-red-50">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              {bulletin.asks[askId]?.title}
            </h5>
            <p className="mb-3 font-normal text-gray-500 line-clamp-3 ">
              {bulletin.asks[askId]?.detail}
            </p>
          </div>
          <div className="flex items-center justify-end w-1/2 bg-slate-50">
              <button
                  // disabled={!grantRoles}
                  // onClick={() => grantRoles()}
                className=" w-1/2 rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-amber-200"
              >
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <label className=" block text-md font-normal text-gray-700">
                    Check-in
                  </label>
              </div>
              </button>
            
            </div>
          {/* <div className="flex flex-row w-1/2 justify-end mr-10 bg-red-50">
            <p className="mb-3 mr-3 font-normal text-green-600 ">
              {ethers.utils.formatEther(bulletin.asks[askId]?.drop)}
            </p>
            <p className="mb-3 font-normal text-green-600 ">
              {(bulletin.asks[askId]?.currency == ethers.constants.AddressZero) ? "Ether" : "$LOCAL" }
            </p>
          </div> */}
        </div>

        <div className="grid grid-rows-5 grid-flow-col gap-2 bg-purple-50">
          {Object.keys(bulletin.asks[askId].trades).map((id) => {
            return (
              <div key={id} className="flex flex-row bg-slate-100">
                <div className="flex flex-col">
                  <div>Approved: {(bulletin.asks[askId].trades[id].approved) ? "true" : "false"}</div>
                  <div>Role: {bulletin.asks[askId].trades[id].role}</div>
                  <div>Proposer: {bulletin.asks[askId].trades[id].proposer}</div>
                  <div>Resource: {bulletin.asks[askId].trades[id].resource}</div>
                  <div>Feedback: {bulletin.asks[askId].trades[id].feedback}</div>
                  <div>Data: {bulletin.asks[askId].trades[id].data}</div>
                </div>
                <button
                  // disabled={!grantRoles}
                  // onClick={() => grantRoles()}
                className=" w-1/2 rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-amber-200"
              >
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <label className=" block text-md font-normal text-gray-700">
                    Check-in
                  </label>
              </div>
              </button>
              </div>
            )
          // return <ResourceCard key={id} resourceId={id} />;
          })}
        </div>
        
        {/* <Link
          to={askId}
          className="mt-auto inline-flex items-center text-blue-600 hover:underline"
        >
          Read Detail →
        </Link> */}
      </div>
    </>
  );
};

export default AskCard;
