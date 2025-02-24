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




const EngageModal = ({ modalPayload }) => {
  const { write: exchange, state: exchangeState } = useWriteContract({
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
    defaultValues: {type: ""},
  }); 

  const onSubmit = async (data) => {
    console.log(data, address)
    if (isConnected) {
      try {
        const t = {
              approved: true,
              from: address,
              resource: ethers.constants.HashZero,
              currency: (data.type == "currency") ? mCurrency.address : ethers.constants.AddressZero,
              amount: ethers.utils.parseUnits("1", "ether"),
              content: "TEST",
              data: ethers.constants.HashZero
        }
        console.log(t)
        const tx = exchange({ args: [1, modalPayload.content.resourceId, t] });
          
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

  const PaymentRadio = ({ type, value, register }) => {
    return (
      <>
        <div className="flex items-center">
          <input
            type="radio"
            value={value}
            {...register("type")}
          />
          <div>
            <label className="ml-2 text-md font-normal text-gray-900 ">{type}</label>
          </div>
        </div>
      </>
    );
  };

  const Content = () => {
    return (
      <>  
        <div className="flex flex-col space-y-2 mt-2 mb-5">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900 mb-1">
              互相肯定 | Engage and endorse 🫡 
            </label>
            <CloseModalButton />
          </div>
          <div className="flex flex-col pb-2">
            <div>
              <label className="text-md font-normal text-gray-900">給予肯定所需要的數量：</label> 
              <label className="text-amber-600 text-lg font-semibold">1</label>
              <label className="text-md">枚社群貨幣或互惠信用</label>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-normal text-gray-900">Amount to endorse </label> 
            </div>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <PaymentRadio type="社群貨幣 | Currency" value={"currency"} register={register} />
            <label className="text-amber-600 text-md">{(modalPayload.content.balance != undefined) ? modalPayload.content.balance : "-"}</label>
          </div>

          <div className="flex items-center space-x-2 py-2">
            <PaymentRadio type="互惠信用 | CrΞdit" value={"credit"} register={register} />
            <label className="text-amber-600 text-md">{(modalPayload.content.credit != undefined) ? modalPayload.content.credit : "-"}</label>
          </div>

          
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
                disabled={exchangeState.writeStatus > 0}
                className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {(exchangeState.writeStatus === 0) && "Submit"}
                {(exchangeState.writeStatus > 0) && <Spinner />}
                <div className={`${(exchangeState.writeStatus > 0) ? "ml-2" : ""}`}>

                  {(exchangeState.writeStatus === 1) && "Waiting for approval"}
                  {(exchangeState.writeStatus === 2) && "pending"}
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

export default EngageModal;
