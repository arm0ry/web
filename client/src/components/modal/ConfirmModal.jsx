import React from "react";
import { InfoIcon, MenuUpIcon } from "@assets";
import { cleanModal } from "@context/actions/modalAction";

const ConfirmModal = ({ modalPayload }) => {
  return (
    <>
      <button
        type="button"
        className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
        onClick={cleanModal}
      >
        <MenuUpIcon className="h-5 w-5" />
        <span className="sr-only">Close modal</span>
      </button>
      <div className="p-6 text-center">
        <InfoIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
        <h3 className="mb-5 text-lg font-normal text-gray-500 ">
          {modalPayload?.title}
          <p className="text-sm ">{modalPayload?.content?.text}</p>
        </h3>

        <button
          data-modal-hide="popup-modal"
          type="button"
          onClick={async () => {
            await modalPayload.callback(true);
          }}
          className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  "
        >
          Yes, I'm sure
        </button>
        <button
          data-modal-hide="popup-modal"
          type="button"
          onClick={async () => {
            await modalPayload.callback(false);
          }}
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 "
        >
          No, cancel
        </button>
      </div>
    </>
  );
};

export default ConfirmModal;
