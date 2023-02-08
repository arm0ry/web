import React from "react";
import { dancing, PassportIdIcon } from "@assets";


const TravelerPass = () => {
  return (
    <>
      <div className=" p-4 text-center  min-h-[50vw] flex justify-center items-center  align-middle  my-auto">
        {/* <img
            className="m-1 bg-white h-auto max-w-full rounded-lg"
            src={dancing}
            alt="image description"
          /> */}
        <div class="min-h-[40vw] min-w-[40vw] max-w-full rounded-lg flex flex-col items-center justify-center pt-5 pb-6 border-4 border-dotted border-gray-400">
          
          <PassportIdIcon className="w-28 h-28  mb-3 text-gray-300 stroke-[17px]"/>
          
          <p class="mb-2 text-base text-gray-400 dark:text-gray-400"><span class="font-semibold">Please connect wallet</span> </p>
          
        
        </div>
      </div>
      <div class="flex items-center justify-center w-full">
        <input id="dropzone-file" type="file" class="hidden" />
      </div>
    </>
  );
};

export default TravelerPass;
