import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { useAccount, useContractRead } from "wagmi";
import { Spinner, Markdown } from "@components";
import CloseModalButton from "./CloseModalButton";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { ethers } from "ethers";
import { Logger } from "@contract";
import useWriteContract from "@hooks/useWriteContract";
import { mBulletin } from "@contract";
import { shortenAddress } from "@utils/shortenAddress";

const TallyModal = ({ modalPayload }) => {
  const [inPrepare, setInPrepare] = useState(false);

  const checkin = modalPayload.content.checkin;
  
  const { write: proposeTrade, state: proposeState } = useWriteContract({
    ...mBulletin,
    functionName: "trade",
  });
  
  const { address, isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { seed: "", moon: ""},
  }); 


  useEffect(() => {
  }, [isConnected]);

  const MoodRadio = ({ moon, value, register }) => {
    return (
      <>
        <div className="flex items-center">
          <input
            type="checkbox"
            value={value}
            {...register("moon")}
          />

          <label
            className="ml-2 text-md font-normal text-gray-900 "
          >
            {moon}
          </label>
        </div>
      </>
    );
  };

 
   const onSubmit = async (data) => {
     let firstEmoji = false;
     let secondEmoji = false;
     let thirdEmoji = false;
     let fourthEmoji = false;
     let fifthEmoji = false;
 
     if (data.moon.length > 0) {
       for (let i = 0; i < data.moon.length; i++) {
             console.log(data.moon[i]);
 
         if (data.moon[i] == 1) {
           firstEmoji = true;
         } else if (data.moon[i]== 2) {
           secondEmoji = true;
         } else if (data.moon[i]== 3) {
           thirdEmoji = true;
         } else if (data.moon[i] == 4) {
           fourthEmoji = true;
         } else if (data.moon[i] == 5) {
           fifthEmoji = true;
         } else {}
       }
     }
     
     let structuredData = ethers.constants.HashZero;
     const abiCoder = ethers.utils.defaultAbiCoder;
     structuredData = abiCoder.encode(["bool", "bool", "bool", "bool", "bool"], [firstEmoji, secondEmoji, thirdEmoji, fourthEmoji, fifthEmoji]);
     
     console.log(structuredData);
     if (isConnected) {
       try {
         const tx = proposeTrade({
           args: [
             0,
             modalPayload.content.askId,
           {
             approved: true,
             from: address,
             resource: ethers.constants.HashZero,
             currency: ethers.constants.AddressZero,
             amount: 0,
             content: "TEST",
             data: structuredData
           }
           ]
         })
 
         pushAlert({
           msg: (
             <span>
               Success! Check your transaction on
               <a
                 href={`https://gnosis-chiado.blockscout.com/tx/${tx.hash}`}
                 target="_blank"
                 rel="noreferrer"
                 className="font-extrabold text-green-900"
               >
                 &nbsp;Blockscout &#128279;
               </a>
             </span>
           ),
           type: "success",
         });
         
       } catch (error) {
         console.log(error)
       }
     }
   };

  const TallyQs = () => {
    return (
      <>  
        <div className="flex flex-col space-y-2 mt-2 mb-5">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900 mb-1">
              這次大松自備的用具 | BYO-Utensils 🍴 
            </label>
            <CloseModalButton />
          </div>
          <div className="flex flex-row space-x-3 justify-star">
            <MoodRadio moon="筷子 | Chopsticks 🥢" value={"1"} register={register} />
          </div>

          <div className="flex flex-row space-x-3 justify-star">
            <MoodRadio moon="叉子 | Fork 🍴" value={"2"} register={register} />
          </div>

          <div className="flex flex-row space-x-3 justify-star">
            <MoodRadio moon="湯匙 | Spoon 🥄" value={"3"} register={register} />
          </div>
          <div className="flex flex-row space-x-3 justify-star">
            <MoodRadio moon="水壺 | Water Bottle 🫙" value={"4"} register={register} />
          </div>
          <div className="flex flex-row space-x-3 justify-star">
            <MoodRadio moon="吸管 | Straw" value={"5"} register={register} />
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <div div className="flex flex-col w-full space-y-2 px-6 py-4 bg-slate-100" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TallyQs />

          {isConnected ?
            <div className="flex flex-col w-full items-center">
              <button
                type="submit"
                disabled={proposeState.writeStatus > 0}
                className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {(proposeState.writeStatus === 0) && (inPrepare ? "Wait..." : "Share")}
                {(proposeState.writeStatus > 0) && <Spinner />}
                <div className={`${(proposeState.writeStatus > 0) ? "ml-2" : ""}`}>

                  {(proposeState.writeStatus === 1) && "Waiting for approval"}
                  {(proposeState.writeStatus === 2) && "pending"}
                </div>
              </button>
              <label className="mt-2 block text-xs font-medium text-gray-500 "> Connected: {shortenAddress(address)}  </label> 
            </div> :

            <DynamicWidget
              buttonClassName="connectButton"
              innerButtonComponent="Connect Wallet"
            />}
        </form>
      </div>
    </>
  );
};

export default TallyModal;
