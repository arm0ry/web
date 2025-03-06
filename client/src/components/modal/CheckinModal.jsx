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
import { useGlobalContext } from "@context/store";


const CheckinModal = ({ modalPayload }) => {
  const [inPrepare, setInPrepare] = useState(false);  
  const { write: proposeTrade, state: proposeState } = useWriteContract({
    ...mBulletin,
    functionName: "trade",
  });
  
  const { bulletin } = useGlobalContext();
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
    let params = [];
    let values = [];

    if (data.moon.length > 0) {
      for (let i = 0; i < data.moon.length; i++) {
        
        if (data.moon[i] == 1) {
          params.push("uint256");
          params.push("string");
          values.push(data.moon[i]);
          values.push("我是新手 | I'm new");
          console.log(params, values);
        } else if (data.moon[i] == 2) {
          params.push("uint256");
          params.push("string");
          values.push(data.moon[i]);
          values.push("我想入坑 | I want to join a project");
        } else if (data.moon[i] == 3) {
          params.push("uint256");
          params.push("string");
          values.push(data.moon[i]);
          values.push("我想開坑 | I want to start a project");
        } else if (data.moon[i] == 4) {
          params.push("uint256");
          params.push("string");
          values.push(data.moon[i]);
          values.push("我想拉人入坑 | I want to recruit others to join a project");
        } else if (data.moon[i] == 5) {
          params.push("uint256");
          params.push("string");
          values.push(data.moon[i]);
          values.push("我來逛逛 | I'm just hanging around");
        } else {}
      }
      
      let length = data.moon.length;
      do {
        params.push("uint256");
        params.push("string");
        values.push(0);
        values.push("");
        length++;
      } while (length < 5);
    }
    
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;
    structuredData = abiCoder.encode(params, values);
    
    console.log(structuredData);
    if (isConnected) {
      try {
        const tx = proposeTrade({
          args: [
            0, modalPayload.content.askId,
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

  const CheckinQs = () => {
    return (
      <>  
        <div className="flex flex-col space-y-2 mt-2 mb-5">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900 mb-1">
              自我介紹 | Introduction 📣
            </label>
            <CloseModalButton />
          </div>
            <MoodRadio moon="我是新手 | I'm new" value={"1"} register={register} />
            <MoodRadio moon="我想入坑 | I want to join a project" value={"2"} register={register} />
            <MoodRadio moon="我想開坑 | I want to start a project" value={"3"} register={register} />
            <MoodRadio moon="我想拉人入坑 | I want to recruit others to join a project" value={"4"} register={register} />
            <MoodRadio moon="我來逛逛 | I'm just hanging around" value={"5"} register={register} />
        </div>
      </>
    );
  }


  return (
    <>
      <div div className="flex flex-col space-y-2 px-6 py-4 bg-slate-100" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CheckinQs />

          {isConnected ?
            <div className="flex flex-col items-center">
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

export default CheckinModal;
