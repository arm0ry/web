import React from "react";
import { MenuUpIcon } from "@assets";
import { cleanModal } from "@context/actions/modalAction";
const CloseModalButton = () => {
  return (
    <>
      <button
        type="button"
        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
        onClick={cleanModal}
      >
        <MenuUpIcon className="h-5 w-5" />
        <span className="sr-only">Close modal</span>
      </button>
    </>
  );
};

export default CloseModalButton;
