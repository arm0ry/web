import React, { useCallback, useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useAccount, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

import { useGlobalContext } from "@context/store";
import { pushAlert } from "@context/actions/alertAction";
import { showModal } from "@context/actions/modalAction";
// import { getTravelerPass } from "@context/actions/userAction";
import { LockIcon, PassportIdIcon } from "@assets";
import { ImpactCurves, SupportToken } from "@contract";
import useWriteContract from "@hooks/useWriteContract";
import { Spinner } from "@components";
import SupporterCard from "./SupporterCard";
import { shortenAddress } from "@utils/shortenAddress";

const Supporters = () => {
  const { userInfo, setTravelerPass, setIsMinted } = useGlobalContext();
  const { address, isConnected, isDisconnected } = useAccount();

  const { data: uri } = useContractRead({
    ...SupportToken,
    functionName: 'tokenURI',
    args: [1]
  })


  const { data, fetchNextPage, isFetched } = useContractInfiniteReads({
    cacheKey: "supporters",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: SupportToken.address,
            abi: SupportToken.abi,
            functionName: "ownerOf",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
  });

  // TODO: display base64 please
  console.log(data.pages[0])
  console.log(uri)

  const uri2 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBzdHlsZT0iYmFja2dyb3VuZDojRkZGQkY1Ij48dGV4dCB4PSIyMCIgeT0iNDAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDA0MGEiID5TdXBwb3J0ICMxPC90ZXh0PjxyZWN0IGZpbGw9IiNGRkJFMEIiIHg9IjIwIiB5PSI1MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI1IiA+PC9yZWN0Pjx0ZXh0IHg9IjIwIiB5PSIxMDAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDA0MGEiID7lj7DngaPpm7bmmYLmlL/lupzpu5HlrqLmnb48L3RleHQ+PHRleHQgeD0iMjAiIHk9IjIxMCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMDQwYSIgPum7keWuouadvuasoeaVuO+8mjY0IOasoTwvdGV4dD48dGV4dCB4PSIyMCIgeT0iMjMwIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwNDBhIiA+5LiN5YW35ZCN5Y+D6IiH5Lq65pW477yaNiDkuro8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjI1MCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMDQwYSIgPuWFrOawkeWPg+iIh+S6uuaVuO+8mjcg5Lq6PC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIyNzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMwMDA0MGEiID7nuL3lrozmiJDkurrmlbjvvJoxIOS6ujwvdGV4dD48dGV4dCB4PSIyMCIgeT0iMTcwIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwNDBhIiA+56ysIDY0IOasoeWPg+iIh+S6uuaVuO+8mjwvdGV4dD48dGV4dCB4PSIxMzAiIHk9IjE3MCIgZm9udC1zaXplPSI0MCIgZmlsbD0iIzAwMDQwYSIgPjI8L3RleHQ+PHRleHQgeD0iMjEwIiB5PSIxNzAiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiMwMDA0MGEiID4g5qyhPC90ZXh0Pjwvc3ZnPg=="
  return (
    <>
      <div className=" mx-auto flex flex-row ">
        <img
          className=" mb-8 ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg transition  duration-300 md:h-[40vw] md:w-[40vw]"
          src={uri2}
          alt="Supporter Token"
        ></img>
        <div className="p-10  h-1/2">
          <label
            className="p-4 block text-2xl font-bold text-gray-900"
          >
            支持者:
          </label>
          <div className="grid grid-cols-1 gap-2 p-4 ">
            {data.pages[0] !== undefined ? (
              data.pages[0]?.map((supporter, id) => {
                return supporter !== null ? (
                  <div className="flex flex-col">
                    <label className="mb-2 block text-xl font-semibold text-gray-400">
                      Token #{id + 1}.
                    </label>
                    <label className="mb-2 block text-xl font-medium text-gray-900">
                      {supporter}
                    </label>
                  </div>
                ) : (<></>)
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Supporters;
