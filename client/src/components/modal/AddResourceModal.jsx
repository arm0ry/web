import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { useAccount, useContractRead } from "wagmi";
import { Spinner, Markdown } from "@components";
import CloseModalButton from "./CloseModalButton";
import axios from "axios";
import { pushAlert } from "@context/actions/alertAction";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { ethers } from "ethers";
import useWriteContract from "@hooks/useWriteContract";
import { mBulletin, mCurrency } from "@contract";
import { shortenAddress } from "@utils/shortenAddress";

const AddResourceModal = ({ modalPayload }) => {
  const { write: proposeTrade, state: tradeState } = useWriteContract({
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
    defaultValues: {title: "", url: ""},
  }); 

  const onSubmit = async (data) => {
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;
    structuredData = abiCoder.encode(["string", "string"], [data.title, "https://ipfs.io/ipfs/bafkreiacht7yytvsc6y3alu7hnnqy5agih7psx2755kntnmjxtnsuug3fy"]);
    
    if (isConnected) {
      try {
        const tx = proposeTrade({
          args: [
            0, modalPayload.content.subjectId,
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
        });
        
        pushAlert({
          msg: (
            <span>
              Success! Check your transaction on
              <a href={`https://gnosis-chiado.blockscout.com/tx/${tx.hash}`} target="_blank" rel="noreferrer" className="font-extrabold text-green-900">
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


  const Content = () => {
    return (
      <>  
        <div className="flex flex-col space-y-2 mt-2 mb-5">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900 mb-1">
              推薦元素 ｜ Recommend an Element 
            </label>
            <CloseModalButton />
          </div>
          <div className="flex items-center justify-between space-x-2 py-2">
            <label className="text-sm font-normal text-gray-900">元素名稱 ｜ Title of Element：</label> 
            <input type="text" className="border-2 rounded-md w-3/5" {...register("title")}/>
          </div>
           {/* <div className="flex items-center justify-between space-x-2 py-2">
            <label className="text-sm font-normal text-gray-900">元素連結｜ Element URL：</label> 
            <input type="text" className="border-2 rounded-md w-3/5" {...register("url")}/>
          </div> */}
        </div>
      </>
    );
  }


  return (
    <>
      <div div className="flex flex-col space-y-2 px-6 py-4 bg-slate-100" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content />
          {isConnected ?
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={tradeState.writeStatus > 0}
                className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {(tradeState.writeStatus === 0) && "Submit"}
                {(tradeState.writeStatus > 0) && <Spinner />}
                <div className={`${(tradeState.writeStatus > 0) ? "ml-2" : ""}`}>

                  {(tradeState.writeStatus === 1) && "Waiting for approval"}
                  {(tradeState.writeStatus === 2) && "pending"}
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

export default AddResourceModal;
