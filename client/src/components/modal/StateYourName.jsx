import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { useGlobalContext } from "@context/store";
import { cleanModal } from "@context/actions/modalAction";
import { Spinner, Markdown } from "@components";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import CloseModalButton from "./CloseModalButton";
import useWriteContract from "@hooks/useWriteContract";
import { Arm0ryMissions, KaliDAO, Quest, Mission } from "@contract";
import SponsoredStartButton from "../SponsoredStartButton";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";

const StateYourNameModal = ({ modalPayload }) => {
  const [fetching, setFetching] = useState(false);


  console.log(modalPayload.content.missionId)
  const { address, isConnected, isDisconnected } = useAccount();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { seed: "" },
  });

  useEffect(() => {
    if (isConnected) {
      // cleanModal();
    }
  }, [isConnected]);

  const sponsoredStart = async (username) => {
    setFetching(true);
    try {
      // const body = JSON.stringify({ seed: username, mission: 0x0, missionId: modalPayload.content.missionId });
      const body = { seed: username, mission: Mission.address, missionId: modalPayload.content.missionId };
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

  const onSubmit = async (data) => {
    // setInPrepare(true);

    // const tx = await sponsored_start(data.seed, 0, Mission.address, questId);
    // console.log(tx)
    console.log(data.seed);

    sponsoredStart(data.seed);

  };

  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 pb-2 ">
        <CloseModalButton />
      </div>
      <div className="flex h-auto h- space-y-2 overflow-y-scroll px-6 py-4 bg-slate-100" >
        <div className="flex flex-col mx-auto items-center justify-center gap-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Visitor
              </label>
              <input
                type="text"
                id="seed"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="seed"
                required
                {...register("seed")}
              />
            </div>

            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                We do not store seed.
              </label>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Seed is used to simulate a blockchain address as visitor id.
              </label>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Please use this feature only for experimental purposes.
              </label>
            </div>
            <div className="w-full">
              <button
                type="submit"
                disabled={fetching}
                className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                Hello
              </button>
              {/* <SponsoredStartButton /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StateYourNameModal;
