import React from "react";

const delay = {
  1: "animate-[1.3s_linear_infinite_0.3s_ping]",
  2: "animate-[1.3s_linear_infinite_0.7s_ping]",
  3: "animate-[1.3s_linear_infinite_1s_ping]",
};
const Spinner = ({ id }) => {
  return (
    <div class="rotate-45">
      <div
        className={`text-primary inline-block h-8 w-8 ${delay[id]} rounded-lg border-4 border-gray-400 opacity-100 motion-reduce:${delay[id]}`}
      ></div>
    </div>
  );
};

const SpinnerModal = () => {
  return (
    <>
      <div className="py-auto flex flex-col items-center justify-center">
        {/* <div
          className={`${"h-12 w-12 border-b-4"} animate-spin rounded-full ${"border-gray-500"}`}
        ></div> */}
        <div className="flex items-center justify-center mb-2">
          <Spinner id={1} />
          <Spinner id={2} />
          <Spinner id={3} />
        </div>
        <span className="mt-3 font-medium text-gray-600">Loading traveler data...</span>
      </div>
    </>
  );
};

export default SpinnerModal;
