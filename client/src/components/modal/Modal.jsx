import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { useGlobalContext } from "@context/store";
import { cleanModal } from "@context/actions/modalAction";
import { Markdown } from "..";

import { InfoIcon, MenuUpIcon } from "@assets";
import useOnClickOutSide from "@hooks/useOnClickOutSide";
import CloseModalButton from "./CloseModalButton";
import InfoModal from "./InfoModal";
import DocModal from "./DocModal";
import ConfirmModal from "./ConfirmModal";
// import StartQuestModal from "./StartQuestModal";
// import SubmitTaskModal from "./SubmitTaskModal";
import ReviewTaskModal from "./ReviewTaskModal";
import StateYourNameModal from "./StateYourName";
import SpinnerModal from "./SpinnerModal";
import FallingFlowerModal from "./FallingFlowerModal";

const sizeVariants = {
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
};
function LockBodyScroll() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
  return <></>;
}

const Modal = ({ children }) => {
  const { modalPayload } = useGlobalContext();
  const ref = useRef(null);
  useOnClickOutSide(ref, cleanModal);
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
        return <>{modalPayload.component}</>;
      case 1:
        return (
          <>
            <InfoModal modalPayload={modalPayload} />
          </>
        );

      case 2:
        // document Markdown
        // max-w-5xl
        return (
          <>
            <DocModal modalPayload={modalPayload} />
          </>
        );

      case 3:
        return (
          <>
            <ConfirmModal modalPayload={modalPayload} />
          </>
        );
      case 4:
        return (
          <>
            <StateYourNameModal modalPayload={modalPayload} />
            {/* <StartQuestModal modalPayload={modalPayload} /> */}
          </>
        );
      case 5:
        return (
          <>
            <SubmitTaskModal modalPayload={modalPayload} />
          </>
        );
      case 6:
        return (
          <>
            <ReviewTaskModal modalPayload={modalPayload} />
          </>
        );
      case 7:
        return (
          <>
            <SpinnerModal modalPayload={modalPayload} />
          </>
        );
      case 8:
        return (
          <>
            <FallingFlowerModal modalPayload={modalPayload} />
          </>
        );
      case 9:
        return (
          <>
            <StateYourNameModal modalPayload={modalPayload} />
          </>
        );

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
          <LockBodyScroll />
          <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-white bg-opacity-10  backdrop-blur backdrop-filter">
            <div
              className={`relative h-auto w-1/2 ${sizeVariants[modalPayload.size]
                } mx-2 md:h-auto`}
            // className={`relative h-auto w-full max-w-3xl mx-2 md:h-auto`}
            >
              <div
                ref={ref}
                className={`relative rounded-lg ${modalPayload.type !== 7 ? "bg-white shadow" : ""
                  } `}
              >
                {generateModal}
              </div>
            </div>
          </div>
          {/* <div className="fixed top-0 left-0 right-0 z-[999]  w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
            <div className="relative h-full w-full max-w-2xl md:h-auto">
              <div className="relative rounded-lg bg-white shadow ">
                <div className="flex items-start justify-between rounded-t border-b p-4 ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Terms of Service
                  </h3>
                  <button
                    type="button"
                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
                    data-modal-hide="defaultModal"
                  ><MenuUpIcon className="h-5 w-5" />
                    <span className="sr-only">Close modal</span>
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
