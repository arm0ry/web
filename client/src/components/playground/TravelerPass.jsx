import React, { useCallback, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useAccount } from "wagmi";
import {
  getContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

import { useGlobalContext } from "@context/store";
import { pushAlert } from "@context/actions/alertAction";
import { dancing, PassportIdIcon } from "@assets";
import { Arm0ryTravelers, RPC } from "@contract";

import Spinner from "../Spinner";

const TravelerPass = () => {
  const { travelerPass, isMinted, setTravelerPass, setIsMinted } = useGlobalContext();
  const { address, isConnected, isDisconnected } = useAccount();
  const [writeState, setWriteState] = useState(0);

  const mineeeet = useCallback(async () => {
    try {
      setWriteState(1);
      const { hash } = await writeContract({
        mode: "recklesslyUnprepared",
        ...Arm0ryTravelers,
        functionName: "mintTravelerPass",
      });
      pushAlert({ msg: "區塊驗證中...", type: "info" });
      setWriteState(2);
      await waitForTransaction({
        hash,
      });
      pushAlert({ msg: "Success! Minted", type: "success" });
      // 
      const provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
      const contract = getContract({
        ...Arm0ryTravelers,
        signerOrProvider: provider,
      });

      let tokenId = BigNumber.from(address).toBigInt().toString(10)

      const _ownerOf = await contract.ownerOf(tokenId);
      if(_ownerOf === address){
        setIsMinted(true)
        let svg =  await contract.generateImage(tokenId);;
        let blob = new Blob([svg], { type: "image/svg+xml" });
        let url = URL.createObjectURL(blob);
        setTravelerPass(url)
      }
    } catch (error) {
      pushAlert({ msg: `Error! ${error}`, type: "failure" });
    } finally {
      setWriteState(0);
    }
    
  }, [address]);

  return (
    <>
      <div className=" flex  h-[calc(100vh_-_8rem)] items-center justify-center p-4  text-center  align-middle">
        {isConnected && isMinted && (
          <img
            className="z-[10] m-1 h-[95vw] w-[95vw] md:h-[40vw] md:w-[40vw] max-w-full rounded-lg bg-white"
            src={travelerPass}
            alt="image description"
          />
        )}
        {!isMinted && (
          <div className="flex min-h-[95vw] min-w-[95vw] max-w-full select-none flex-col items-center justify-center rounded-lg border-4 border-dotted border-gray-400 pt-5 pb-6 md:min-h-[40vw] md:min-w-[40vw]">
            <PassportIdIcon className="mb-3 h-28  w-28 stroke-[17px] text-gray-300" />
            <div  className={`group h-14 w-52 min-w-fit p-1.5 transition-all duration-150 active:p-0 ${(!isConnected || writeState > 0) && "pointer-events-none"}`}>
              <button
                type="button"
                disabled={!isConnected || writeState > 0}
                onClick={mineeeet}
                className=" flex h-full w-full items-center justify-center   rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 px-3 py-2 text-center font-PasseroOne text-lg font-medium text-gray-900 hover:bg-gradient-to-br disabled:pointer-events-none disabled:opacity-30 "
              >
                {!isConnected && "Please Connect Wallet"}
                {isConnected && writeState === 0 && "Mint"}
                {isConnected && writeState > 0 && <Spinner />}
                <div className="ml-2">
                  {isConnected && writeState === 1 && "Waiting for approval"}
                  {isConnected && writeState === 2 && "pending"}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* {!isConnected && !isMinted && (
          <div className="flex min-h-[95vw] min-w-[95vw] max-w-full select-none flex-col items-center justify-center rounded-lg border-4 border-dotted border-gray-400 pt-5 pb-6 md:min-h-[40vw] md:min-w-[40vw]">
            <PassportIdIcon className="mb-3 h-28  w-28 stroke-[17px] text-gray-300" />
            <div className="group h-14 w-48  p-1.5 active:p-0 transition-all duration-150">
              <button
                type="button"
                onClick={mineeeet}
                className="  flex items-center justify-center   h-full w-full rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 px-3 py-2 text-center font-PasseroOne text-lg font-medium text-gray-900 hover:bg-gradient-to-br "
              >
                Please connect wallet
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default TravelerPass;
