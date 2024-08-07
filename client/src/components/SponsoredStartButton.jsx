import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { getAuthToken } from "@dynamic-labs/sdk-react";
import { pushAlert } from "@context/actions/alertAction";

function SponsoredStartButton({ username }) {
  const [fetching, setFetching] = useState(false);
  const [iSstudent, setISstudent] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();

  const sponsoredStart = async () => {
    setFetching(true);
    try {
      // const authToken = getAuthToken();
      // if (!authToken) {
      //   pushAlert({ msg: "Please connect your wallet", type: "failure" });
      //   setFetching(false);
      //   return;
      // }
      // // Headers
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${authToken}`,
      //   },
      // };

      const body = JSON.stringify({ username });
      axios
        .post("/api/users/sponsored_start", body)
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            pushAlert({ msg: `${res.data.msg}`, type: "info" });
            return;
          }
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
    } finally {
      setFetching(false);
    }
  };
  return (
    <>
      <button
        onClick={sponsoredStart}
        disabled={fetching}
        className="w-full x  px-auto flex flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
      >
        <span className="flex h-full flex-row items-center justify-center font-PasseroOne text-sm font-bold	 tracking-widest text-[#000]">
          Start!
        </span>
      </button>
    </>
  );
}

export default SponsoredStartButton;
