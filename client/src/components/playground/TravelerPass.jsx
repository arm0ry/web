import React from "react";
import { dancing, PassportIdIcon } from "@assets";

const TravelerPass = () => {
  return (
    <>
      <div className=" my-auto flex  min-h-[50vw] items-center justify-center p-4  text-center  align-middle">
        {/* <img
            className="m-1 bg-white h-auto max-w-full rounded-lg"
            src={dancing}
            alt="image description"
          /> */}
        <div class="flex min-h-[40vw] min-w-[40vw] max-w-full flex-col items-center justify-center rounded-lg border-4 border-dotted border-gray-400 pt-5 pb-6">
          <PassportIdIcon className="mb-3 h-28  w-28 stroke-[17px] text-gray-300" />

          <p class="mb-2 text-base text-gray-400 dark:text-gray-400">
            <span class="font-semibold">Please connect wallet</span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default TravelerPass;
