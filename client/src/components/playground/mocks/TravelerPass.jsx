import React, { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { useGlobalContext } from "@context/store";
import { LockIcon, PassportIdIcon } from "@assets";

import { Spinner } from "@components";

const TravelerPass = () => {
  const { userInfo, setTravelerPass, setIsMinted } = useGlobalContext();
  const { address, isConnected, isDisconnected } = useAccount();
  const [isLoaded, setIsLoaded] = useState(false);

  // const { write: mint, state } = useWriteContract({
  //   ...Arm0ryTravelers,
  //   functionName: "mintTravelerPass",
  // });

  const mintClick = () => {
    const onSuccess = () => {
      // getTravelerPass(userInfo.tokenId);
    };
    mint({ onSuccess });
  };


  return (
    <>

      <div className=" relative flex  h-[calc(100vh_-_8rem)] items-center justify-center p-4  text-center  align-middle">
        {userInfo.status === 1 ? (
          <div
            className={` absolute top-1/2 left-1/2 z-[11] flex h-[95vw] w-[95vw] -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center justify-center rounded-lg border-4 border-dotted border-gray-400 bg-[#fffcfa] p-6  pt-5 md:h-[40vw]  md:w-[40vw]`}
          >
            <Spinner
              className={"h-20 w-20 border-b-4"}
              pathColor={"text-gray-400"}
            />
          </div>
        ) : userInfo.isMinted ? (
          <>
            <div
              className={`${userInfo.inQuest
                ? isLoaded
                  ? "opacity-100"
                  : "opacity-0"
                : "hidden"
                } absolute  top-1/2 left-1/2 z-[11] flex h-[95vw] w-[95vw] -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center justify-center rounded-lg bg-gray-100 bg-opacity-60 p-6  pt-5 transition-all   duration-500 md:h-[40vw]  md:w-[40vw]`}
            >
              <LockIcon className={"h-40 w-40 opacity-80 "} />
            </div>
            <img
              className={`${isLoaded
                ? " opacity-100 blur-0"
                : " bg-gray-200 opacity-20  blur-2xl"
                } z-[10] m-1 h-[95vw] w-[95vw] max-w-full rounded-lg transition  duration-300 md:h-[40vw] md:w-[40vw]`}
              src={userInfo.travelerPass}
              alt="Traveler Pass"
              onLoad={() => setIsLoaded(true)}
            ></img>
          </>
        ) : (
          <div className="flex min-h-[95vw] min-w-[95vw] max-w-full select-none flex-col items-center justify-center rounded-lg border-4 border-dotted border-gray-400 pt-5 pb-6 md:min-h-[40vw] md:min-w-[40vw]">
            <PassportIdIcon className="mb-3 h-28  w-28 stroke-[17px] text-gray-300" />
            <div
              className={`group h-14 w-52 min-w-fit p-1.5 transition-all duration-150 active:p-0 ${(!isConnected || state.writeStatus > 0) && "pointer-events-none"
                }`}
            >
              <button
                type="button"
                disabled={!isConnected || state.writeStatus > 0}
                onClick={mintClick}
                className=" flex h-full w-full items-center justify-center   rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 px-3 py-2 text-center font-PasseroOne text-lg font-medium text-gray-900 hover:bg-gradient-to-br disabled:pointer-events-none disabled:opacity-30 "
              >
                {!isConnected && "Please Connect Wallet"}
                {isConnected && state.writeStatus === 0 && "Mint"}
                {isConnected && state.writeStatus > 0 && <Spinner />}
                <div className={`${state.writeStatus > 0 ? "ml-2" : ""}`}>
                  {isConnected &&
                    state.writeStatus === 1 &&
                    "Waiting for approval"}
                  {isConnected && state.writeStatus === 2 && "pending"}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TravelerPass;
