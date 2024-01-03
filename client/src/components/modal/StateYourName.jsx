import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

import { useGlobalContext } from "@context/store";
// import { updateTravelerTask } from "@context/actions/userAction";
import { cleanModal } from "@context/actions/modalAction";

import { Spinner, Markdown } from "@components";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import CloseModalButton from "./CloseModalButton";

const StateYourNameModal = ({ modalPayload }) => {
  const [view, setView] = useState(false);
  const [inPrepare, setInPrepare] = useState(false);
  const navigate = useNavigate();
  const { address, isConnected, isDisconnected } = useAccount();
  const { questID: questId, taskId } = modalPayload.content;

  useEffect(() => {
    if (isConnected) {
      cleanModal();
    }
  }, [isConnected]);
  const onSubmit = async (data) => {
    setInPrepare(true);
  };

  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 pb-2 ">
        <CloseModalButton />
      </div>
      <div className="flex h-[calc(100vh_-_6rem)]  space-y-6 overflow-y-scroll px-6 py-4">
        <h2>Hello!</h2>
        <div className="flex flex-col mx-auto items-center justify-center gap-3">
          <DynamicWidget
            buttonClassName="connectButton"
            innerButtonComponent="Connect Wallet"
          />
          <button
            type="button"
            className=" text-md  rounded-xl bg-sky-200 px-6 py-1.5 font-bold text-black hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            Stranger
          </button>
        </div>
      </div>
    </>
  );
};

export default StateYourNameModal;
