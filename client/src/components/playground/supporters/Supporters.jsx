import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

import { useGlobalContext } from "@context/store";
import { SupportToken } from "@contract";

const Supporters = () => {
  const { data: uri } = useContractRead({
    ...SupportToken,
    functionName: 'tokenURI',
    args: [1]
  })

  const { data } = useContractInfiniteReads({
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


  useEffect(() => {

    // TODO: display base64 please
    console.log(data.pages[0])
    console.log(uri)
  }, [data])


  const uri2 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBzdHlsZT0iYmFja2dyb3VuZDojRkZGQkY1Ij48dGV4dCB4PSIyMCIgeT0iNDAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDA0MGEiID7mspLmnInkurogIzE8L3RleHQ+PHJlY3QgZmlsbD0iI0ZGQkUwQiIgeD0iMjAiIHk9IjUwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjUiID48L3JlY3Q+PHRleHQgeD0iMjAiIHk9IjEwMCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzAwMDQwYSIgPuWPsOeBo+mbtuaZguaUv+W6nOm7keWuouadvjwvdGV4dD48dGV4dCB4PSIyMCIgeT0iMjMwIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwNDBhIiA+bjBib2R5IOWPg+iIh+S6uuaVuO+8mjAg5Lq6PC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIyNTAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMwMDA0MGEiID7nuL3lj4PoiIfkurrmlbjvvJoxMSDkuro8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjI3MCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMDQwYSIgPjEwMCUg5Y+D6IiH5Lq65pW477yaNCDkuro8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjE3MCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMDQwYSIgPuesrCA2NCDmrKHlj4PoiIfkurrmlbjvvJo8L3RleHQ+PHRleHQgeD0iMTQwIiB5PSIxNzAiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiMwMDA0MGEiID41PC90ZXh0Pjx0ZXh0IHg9IjIzMCIgeT0iMTcwIiBmb250LXNpemU9IjExIiBmaWxsPSIjMDAwNDBhIiA+IOS6ujwvdGV4dD48L3N2Zz4="
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
            {data?.pages[0] !== undefined ? (
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
