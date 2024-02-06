import React, { useEffect } from "react";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";

const ResponseCard = ({ response }) => {
  return (
    <>
      <div className={`bg-blue-50 h-30 group relative w-full overflow-hidden rounded-lg`}>
        <div className="flex h-full w-full flex-col items-start justify-between  px-4 py-3 ">
          <div className="flex flex-row w-full items-center ">
            <label className="w-fit mx-3 font-medium text-slate-800  group-hover:font-semibold ">
              🎉
            </label>
            <div
              className={`flex space-x-2 shrink-0 flex-row items-center rounded-full bg-[#B6E4F4] h-min md:px-3 md:py-2 text-sm font-semibold  text-black  shadow-sm`}
            >
              <Avatar className={`h-5 w-5 `} address={response.user} />
              <span className=" hidden items-center md:block">
                {shortenAddress(response.user)}
              </span>
            </div>
          </div>
          <div className="my-3 px-3 py-2 font- text-slate-800 bg-slate-200 rounded-lg">
            {response.feedback}
          </div>
          {/* <div
            className={`flex shrink-0 flex-row items-center justify-center rounded-full h-fit md:px-2 md:py-1 text-md font-semibold  text-black`}
          >
            <span className="ml-1 hidden items-center md:block">
              選擇：{response.response}
            </span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ResponseCard;
