import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

import { useGlobalContext } from "@context/store";
import { mSupportToken, qSupportToken } from "@contract";
import { shortenAddress } from "@utils/shortenAddress";
import CurveCard from "../curves/CurveCard";

const Supporters = () => {
  const { data: mSvg } = useContractRead({
    ...mSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })

  const { data: qSvg } = useContractRead({
    ...qSupportToken,
    functionName: 'generateSvg',
    args: [100]
  })

  const { data: mSupporters } = useContractInfiniteReads({
    cacheKey: "mSupporters",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: mSupportToken.address,
            abi: mSupportToken.abi,
            functionName: "ownerOf",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
  });

  const { data: qSupporters } = useContractInfiniteReads({
    cacheKey: "qSupporters",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: qSupportToken.address,
            abi: qSupportToken.abi,
            functionName: "ownerOf",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
  });

  const [curves, setCurves] = useState();
  const { data, fetchNextPage, isFetched } = useContractInfiniteReads({
    cacheKey: "curves",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: ImpactCurves.address,
            abi: ImpactCurves.abi,
            functionName: "getCurveOwner",
            args: [index],
          },
          {
            address: ImpactCurves.address,
            abi: ImpactCurves.abi,
            functionName: "getPrice",
            args: [true, index, 0],
          },
          {
            address: ImpactCurves.address,
            abi: ImpactCurves.abi,
            functionName: "getPrice",
            args: [false, index, 0],
          },
          {
            address: ImpactCurves.address,
            abi: ImpactCurves.abi,
            functionName: "getCurvePool",
            args: [index],
          },
          {
            address: ImpactCurves.address,
            abi: ImpactCurves.abi,
            functionName: "getCurveFormula",
            args: [index],
          },
        ];
      },
      { start: 1, perPage: 1, direction: "increment" }
    ),
  });

  useEffect(() => {
    if (data) {
      console.log(data)
      setCurves(data.pages[0]);
    }
  }, [data]);

  useEffect(() => {
  }, [mSvg])

  useEffect(() => {
  }, [qSvg])

  return (
    <>
      <label
        className="p-4 mb-2 block text-5xl font-bold text-gray-900"
      >
        揪松影響力
      </label>
      <div className="mt-5 mb-5 mx-auto flex flex-row">
        <img
          className=" mb-8 ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg transition  duration-300 md:h-[40vw] md:w-[40vw]"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(mSvg)}`}
          alt="Supporter Token"
        ></img>
        <div className="flex flex-col w-full ml-10 ">
          <label
            className="p-4 block text-2xl font-bold text-gray-900"
          >
            黑客松 NFT 支持者:
          </label>
          <div className="grid grid-cols-1 gap-2 p-4 ">
            {mSupporters?.pages[0] !== undefined ? (
              mSupporters.pages[0]?.map((supporter, id) => {
                return supporter !== null ? (
                  <div className="flex flex-col">
                    <label className="mb-2 block text-xl font-semibold text-gray-400">
                      Token #{id + 1}.
                    </label>
                    <label className="mb-2 block text-xl font-medium text-gray-900">
                      {shortenAddress(supporter)}
                    </label>
                  </div>
                ) : (<></>)
              })
            ) : (
              <></>
            )}
          </div>
          {curves !== undefined ? (<CurveCard curve={curves} />) : (<></>)}
        </div>
      </div>
      <div className="mt-5 mb-5 mx-auto flex flex-row ">
        <img
          className=" mb-8 ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg transition  duration-300 md:h-[40vw] md:w-[40vw]"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(qSvg)}`}
          alt="Supporter Token"
        ></img>
        <div className="ml-10  h-1/2">
          <label
            className="p-4 block text-2xl font-bold text-gray-900"
          >
            新手試煉 NFT 支持者:
          </label>
          <div className="grid grid-cols-1 gap-2 p-4 ">
            {qSupporters?.pages[0] !== undefined ? (
              qSupporters.pages[0]?.map((supporter, id) => {
                return supporter !== null ? (
                  <div className="flex flex-col">
                    <label className="mb-2 block text-xl font-semibold text-gray-400">
                      Token #{id + 1}.
                    </label>
                    <label className="mb-2 block text-xl font-medium text-gray-900">
                      {shortenAddress(supporter)}
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
