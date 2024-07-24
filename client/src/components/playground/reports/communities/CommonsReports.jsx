import React, { useState, useEffect } from "react";
import ReportCard from "../ReportCard";
import { useGlobalContext } from "@context/store";
import { useAccount } from "wagmi";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";

const CommonsReports = () => {
  const { playground } = useGlobalContext();
  const { address } = useAccount();

  const sendCurrency = async ({ _currency }) => {
    console.log(_currency, address)
    try {
      const body = { currency: _currency, recipient: address};
      axios
        .post("/api/users/send_currency", body)
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
      <div className="flex flex-col">
        <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
          Marketplace
        </label>
        <div className="w-5/6 mx-auto mb-10 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <div className="flex flex-row space-x-10 items-center">
            <div className="">
              <label className="py-5 text-md font-normal text-gray-900">
                💡
              </label>
            </div>
            <div className="w-3/4">
              <label className=" block text-md font-normal text-gray-700">
                Using Dynamic NFTs as medium, Chiado Coffee Shop can build intentional relationships within and across communities.
              </label>
            </div>
            <div className="flex flex-row space-x-4 justify-end w-1/5">
              <button
                  disabled={!sendCurrency}
                  onClick={() => sendCurrency({ _currency: "coffee"})}
                className=" w-full rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-amber-200"
              >
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <label className=" block text-md font-normal text-gray-700">
                    Get $☕️
                  </label>
              </div>
              </button>
              <button
                  disabled={!sendCurrency}
                onClick={() => sendCurrency({ _currency: "croissant"})}
                className=" w-full rounded-lg p-3 text-amber-600 hover:bg-amber-100 bg-amber-200"
              >
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <label className=" block text-md font-normal text-gray-700">
                    Get $🥐
                  </label>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-10">
          <div>
            <div className="">
              {(Object.keys(playground.curves).length > 0) ? Object.keys(playground.curves).map((id) => {
                return (
                  <div key={id} className="mb-8">
                    <ReportCard curve={playground.curves[id]} />
                  </div>
                )
              }) : <div className="">Loading...</div>}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default CommonsReports;
