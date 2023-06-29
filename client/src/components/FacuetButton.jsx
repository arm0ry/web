import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { getAuthToken } from "@dynamic-labs/sdk-react";
import { pushAlert } from "@context/actions/alertAction";

function FacuetButton() {
  const [fetching, setFetching] = useState(false);
  const [iSstudent, setISstudent] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    const authToken = getAuthToken();
    if (!authToken) {setISstudent(false);return;}
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get("/api/users", config)
      .then((res) => {
        setISstudent(res.data);
      })
      .catch((err) => {
        console.log(err);
        setISstudent(false);
      });
  }, [isConnected]);

  const facuet = async () => {
    setFetching(true);
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        pushAlert({ msg: "Please connect your wallet", type: "failure" });
        setFetching(false);
        return;
      }
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const body = JSON.stringify({ address });
      axios
        .post("/api/users/facuet", body, config)
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
                  href={`https://goerli.etherscan.io/tx/${res.data.txhash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-extrabold text-green-900"
                >
                  &nbsp;View on Etherscan &#128279;
                </a>
              </span>
            ),
            type: "success",
          });
        })
        .catch((err) => {
          console.error(err.response.data.msg);
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
      {isConnected && iSstudent && (
        <button
          onClick={facuet}
          disabled={fetching}
          className="hidden h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#B6E4F4] bg-[#B6E4F4] px-4 transition-all duration-150 [box-shadow:0_6px_0_0_#1aa4d2] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#1aa4d2] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#1aa4d2,0_0px_0_0_#1b70f841] disabled:pointer-events-none disabled:opacity-30 md:flex"
        >
          <span className="flex h-full flex-row items-center justify-center font-PasseroOne text-sm font-bold	 tracking-widest text-[#000]">
            Send Me ETH
          </span>
        </button>
      )}
    </>
  );
}

export default FacuetButton;
