import React, { useCallback, useState } from "react";
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

const Supporters = () => {
  const { userInfo, setTravelerPass, setIsMinted } = useGlobalContext();
  const { address, isConnected, isDisconnected } = useAccount();

  const { data: uri } = useContractRead({
    ...SupportToken,
    functionName: 'tokenURI',
    args: [1]
  })

  console.log(uri.image)

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
  return (
    <>
      <div className="p-4">
        <img
          className="opacity-100 blur-0 z-[10] m-1 h-[95vw] w-[95vw] max-w-full rounded-lg transition  duration-300 md:h-[40vw] md:w-[40vw]"
          src={uri.image}
          alt="Traveler Pass"
        ></img>
        <label
          className="mb-2 block text-sm font-medium text-gray-900 bg-slate-300 "
        >
          Supporters
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2 p-4">
        {data.pages[0] !== undefined ? (
          data.pages[0]?.map((supporter, id) => {
            return supporter !== null ? (<label
              className="mb-2 block text-sm font-medium text-gray-900 bg-slate-300 "
            >
              Token #{id + 1}. {supporter}
            </label>) : (<></>)
          })
        ) : (
          <></>
        )}
      </div>

    </>
  );
};

export default Supporters;
