import React, { useState, useEffect, useMemo, useRef } from "react";
import { useGlobalContext } from "@context/store";
import { cleanModal } from "@context/actions/modalAction";
import { Markdown } from ".";

import { InfoIcon, MenuUpIcon } from "@assets";
import useOnClickOutSide from "@hooks/useOnClickOutSide";
const sizeVariants = {
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  "2xl": 'max-w-2xl',
  "3xl": 'max-w-3xl',
  "4xl": 'max-w-4xl',
  "5xl": 'max-w-5xl',
}

export const CloseModalMutton = () => {
  return (
    <>
      <button
        type="button"
        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
        data-modal-hide="defaultModal"
        onClick={cleanModal}
      >
        <MenuUpIcon className="h-5 w-5" />
        <span className="sr-only">Close modal</span>
      </button>
    </>
  );
};

const Modal = ({ children }) => {
  const { modalPayload } = useGlobalContext();
  const ref = useRef(null)
  useOnClickOutSide(ref, cleanModal)
  // const [type, setType] = useState(1);
  // const [isApproved, setIsApproved] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (modalPayload.type >= 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [modalPayload.type]);
  // modalPayload, {title, detail, callback}

  const generateModal = useMemo(() => {
    switch (modalPayload.type) {
      case 0:
        return (
          <>
            <div className="flex items-start justify-between rounded-t border-b p-4 ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                {modalPayload?.title}
              </h3>
              <CloseModalMutton />
            </div>

            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-gray-500 ">
                {modalPayload?.content?.text}
              </p>
            </div>
          </>
        );

      case 1:
        // document Markdown
        // max-w-5xl
        return (
          <>
            <div className="flex  h-16 items-center justify-between rounded-t border-b p-4 ">
              <h3 className="text-xl font-semibold text-gray-900 ">
              {modalPayload?.title}
              </h3>
              <CloseModalMutton />
            </div>

            <div className="h-[calc(100vh_-_6rem)] space-y-6 overflow-y-scroll p-6">
              <Markdown>{modalPayload?.content?.text}</Markdown>
            </div>
          </>
        );

      case 2:
        // Alert

        return (
          <>
            <button
              type="button"
              className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
              data-modal-hide="popup-modal"
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
                onClick={async() => {
                  await modalPayload.callback(false);
                }}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 "
              >
                No, cancel
              </button>
            </div>
          </>
        );

      case 3:
        return <>{modalPayload.component}</>;
      case -1:
        return <></>;

      default:
        return <p></p>;
    }
  }, [modalPayload.type]);

  return (
    <>
      {modalIsOpen ? (
        <>
          {/* <div
            className="fixed  inset-0 z-[998]  overflow-y-auto overflow-x-hidden bg-white bg-opacity-10  backdrop-blur backdrop-filter md:h-full"
            onClick={cleanModal}
          /> */}

          <div className="fixed  inset-0 z-[999] flex w-full h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-white bg-opacity-10  backdrop-blur backdrop-filter">
            <div
              className={`relative h-auto w-full ${sizeVariants[modalPayload.size]} mx-2 md:h-auto`}
            >
              <div ref={ref} className="relative rounded-lg  bg-white shadow">
                {generateModal}
              </div>
            </div>
          </div>
          {/* <div class="fixed top-0 left-0 right-0 z-[999]  w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
            <div class="relative h-full w-full max-w-2xl md:h-auto">
              <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </h3>
                  <button
                    type="button"
                    class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  ><MenuUpIcon className="h-5 w-5" />
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
