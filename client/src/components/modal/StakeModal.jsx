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




const StakeModal = ({ modalPayload }) => {
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
    defaultValues: {amount: "", moon: 0},
  }); 

const MoodRadio = ({ mandarin, english, value, register }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          value={value}
          required
          {...register("moon")}
        />
        <div className="flex flex-col">
          <label className="text-md text-gray-900 ">{mandarin}</label>
          <label className="text-sm text-gray-600 ">{english}</label>
        </div>
      </div>
    </>
  );
};
  
  const Opinions = () => {
    return (
      <>
        <div className="flex flex-col space-y-2 mt-2 mb-5">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900 mb-1">想法：</label>
          </div>
          <MoodRadio mandarin="我有入坑，因為..." english={"I joined, because ..."} value={"1"} register={register} />
          <MoodRadio mandarin="我沒有入坑，因為..." english={"I did not join, because ..."} value={"2"} register={register} />
          <MoodRadio mandarin="我還想多了解..." english={"I want to learn more about ..."} value={"3"} register={register} />
          <MoodRadio mandarin="如果這個坑有...會更好" english={"I'd love it more if there was more of ..."} value={"4"} register={register} />
          <MoodRadio mandarin="我希望更多人知道這個坑，因為..." english={"More people should know about this, because ..."} value={"5"} register={register} />
        </div>
      </>
    );
  };

  const onSubmit = async (data) => {
    console.log(data, address)
    
    let option;
    if (data.moon == 1) {
      option = "我有入坑，因為... | I joined, because ...";
    } else if (data.moon == 2) {
      option = "我沒有入坑，因為... | I did not join, because ...";
    } else if (data.moon == 3) {
      option = "我還想多了解... | I want to learn more about ...";
    } else if (data.moon == 4) {
      option = "如果這個坑有...會更好 | I'd love it more if there was more of ...";
    } else if (data.moon == 5) {
      option = "我希望更多人知道這個坑，因為... | More people should know about this, because ...";
    } else { }
    
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;
    structuredData = abiCoder.encode(["uint256", "string"], [data.moon, option]);

    if (isConnected) {
      try {
        const t = {
          approved: true,
          from: address,
          resource: ethers.constants.HashZero,
          currency: "0x000000000000000000000000000000000000bEEF",
          amount: ethers.utils.parseEther(data.amount),
          content: "TEST",
          data: structuredData
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

  const PaymentInput = ({ payment, value, register }) => {
    return (
      <>
        <div className="flex flex-col justify-start items-start">
          <label className=" text-md font-medium text-gray-900 mb-2">牛排份量：</label>
          <div className="flex items-end">
            <input
              type="number"
              placeholder="0"
              min={0}
              value={value}
              required
              className="ml-2 pl-2 rounded-sm w-1/5"
              {...register("amount")}
            />
            <label className="ml-2 text-sm text-gray-600 ">/</label>
            <label className="ml-2 text-amber-600 text-md">{(modalPayload.content.credit != undefined) ? modalPayload.content.credit : "-"}</label>
            <label className="ml-2 text-sm text-gray-600 ">{payment}</label>
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
              送一份想法牛排 | Stake and voice your opinion 🥩
            </label>
            <CloseModalButton />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-1 justify-center items-start rounded-md">
              <label className="text-md font-normal text-gray-900">好比以太坊運用質押來提高本身的安全性與永續性，地方社群也可以質押信用，互挺社群內的資產或是給予回饋，建立社群互惠文化與資產，甚至作為未來申請補助的根據</label>
              <label className="text-xs font-normal text-gray-900">Stake with crΞdit to communicate preferences, distribute rewards, and potentially secure matched funding from local businesses or authorities  </label>
            </div>
            <div className="flex flex-col space-y-4">
              <PaymentInput payment="crΞdits" register={register}/>
              <Opinions />
            </div>
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

export default StakeModal;
