import React, { useState, useEffect } from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import AskCard from "./AskCard";
import { useAccount } from "wagmi";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";

const Asks = () => {
  const { bulletin } = useGlobalContext();
  const { address } = useAccount();
  
  const grantRoles = async () => {
    try {
      const body = { user: address};
      axios
        .post("/api/users/grant_roles", body)
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            pushAlert({
              msg: (
                <span>
                  {res.data.msg}
                  <a
                    href={`https://gnosis-chiado.blockscout.com/tx/${res.data.txhash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-extrabold text-green-900"
                  >
                    &nbsp;View on Blockscout &#128279;
                  </a>
                </span>
              ),
              type: "success",
            });
            setFetching(false);

          }
        })
        .catch((err) => {
          console.error(err);
          pushAlert({
            msg: `Error! ${err.response.data.msg}`,
            type: "failure",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-16">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Asks
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <div className="flex flex-row space-x-10 items-center">
            <div className="">
              <label className="py-5 text-md font-normal text-gray-900">
                💡
              </label>
            </div>
            <div className="w-3/4 space-y-4">
              <label className=" block text-md font-normal text-gray-900">
                This is a prototype built on the <a target="_blank" href="https://gnosis-chiado.blockscout.com/" className="underline"
                >Gnosis Chiado testnet</a> to demo a local currencies circulation system.
              </label>
            </div>
            {/* <div className="flex flex-row space-x-4 justify-end w-1/5">
              <button
                  disabled={!grantRoles}
                  onClick={() => grantRoles()}
                className=" w-full rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-amber-200"
              >
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <label className=" block text-md font-normal text-gray-700">
                    Get Permission
                  </label>
              </div>
              </button>
            
            </div> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 scroll-smooth gap-5 p-4 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {Object.keys(bulletin.asks).map((id) => {
          return <AskCard key={id} askId={id} />;
        })}
      </div >
    </>
  );
};

export default Asks;
