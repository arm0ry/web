import React from "react";
import CloseModalButton from "./CloseModalButton"

const InfoModal = ({modalPayload}) => {
  return (
    <>
      <div className="flex items-start justify-between rounded-t border-b p-4 ">
        <h3 className="text-xl font-semibold text-gray-900 ">
          {modalPayload?.title}
        </h3>
        <CloseModalButton />
      </div>

      <div className="space-y-6 p-6">
        <p className="text-base leading-relaxed text-gray-500 ">
          {modalPayload?.content?.text}
        </p>
      </div>
    </>
  );
};

export default InfoModal;
