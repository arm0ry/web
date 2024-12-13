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

const CheckinModal = ({ modalPayload }) => {
  const [inPrepare, setInPrepare] = useState(false);

  const checkin = modalPayload.content.checkin;
  console.log(checkin)
  
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
    defaultValues: { seed: "", moon: "", string1: "", string2: "", slider: "", slider2: "", slider3: "", number1: "", number2: "", number3: "" },
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
            className="ml-2 text-sm font-normal text-gray-900 "
          >
            {moon}
          </label>
        </div>
      </>
    );
  };

  const onSubmit = async (data) => {
    // TODO: Need to use switch to build the correct data structure for list and item
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;

    structuredData = abiCoder.encode(["uint256", "uint256", "uint256"], [ethers.utils.parseEther(data.number1), ethers.utils.parseEther(data.number2), ethers.utils.parseEther(data.number3)]);

    // if (data.string1 != "") {
    //   structuredData = await abiCoder.encode(["string"], [data.string1]);
    // }

    if (isConnected) {
      setInPrepare(true);

      try {
        // log({
        //   args: [STAFF, bulletin.address, listId, itemId, data.feedback, structuredData],
        // })
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    } 
  };

  const CheckinQs = () => {

  return (
    <>
      <div className="mb-6 ">
        <div className="flex flex-col space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-600">
            Costs: 
            </label>
            <div className="flex space-x-5 mb-6">
              <div className="flex flex-row space-x-5 items-center">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Delivery
                </label>
                <input required type="number" max={10} min={1} {...register("number1")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
              <div className="flex flex-row space-x-5 items-center">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Labor
                </label>
                <input required type="number" max={10} min={1} {...register("number2")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
              <div className="flex flex-row space-x-5 items-center">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Recycling
                </label>
                <input required type="number" max={10} min={1} {...register("number3")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
            </div>
          </div>
      <label
        className=" block text-sm font-medium text-gray-900 "
      >
        Do the suggested notes resonate with you?
      </label>
      <div className="flex flex-col items-start justify-between">
        <MoodRadio moon="Milk Chocoalate" value={"1"} register={register} />
        <MoodRadio moon="Strawberry" value={"2"} register={register} />
      </div>
    </div>
    </>
    );
  }


  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 text-gray-500  bg-slate-100">
        <div className="flex flex-col">
          <label className="mb-2 block text-lg font-semibold text-gray-900">
            Let's get onchain! | 一起上鏈吧！
          </label>
        </div>
        <CloseModalButton />
      </div>


      <div div className="flex w-full space-y-2 px-6 py-4 bg-slate-100" >
        <div className=" items-center w-full justify-center gap-3">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex justify-start mb-4">
              {isConnected ?
                <div>
                <label
                className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Address | 地址：
                  </label> 
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    {address} 
                  </label> 
                </div> :

                <DynamicWidget
                  buttonClassName="connectButton"
                  innerButtonComponent="Connect Wallet"
                />}
            </div>

            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Feedback | 心得 
              </label>
              <textarea
                id="feedback"
                className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Fried chicken was so good~"
                {...register("feedback")}
              ></textarea>
            </div>

            <div >
              <CheckinQs />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <button
                type="submit"
                disabled={proposeState.writeStatus > 0}
                className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {(proposeState.writeStatus === 0) && (inPrepare ? "Wait..." : "Share")}
                {(proposeState.writeStatus > 0 ) && <Spinner />}
                <div className={`${(proposeState.writeStatus > 0) ? "ml-2" : ""}`}>

                  {(proposeState.writeStatus === 1) && "Waiting for approval"}
                  {(proposeState.writeStatus === 2) && "pending"}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div >
    </>
  );
};

export default CheckinModal;
