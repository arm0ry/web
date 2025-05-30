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
import { useGlobalContext } from "@context/store";


const StakeModal = ({ modalPayload }) => {
  const [error, setError] = useState(".");
  const { write: exchange, state: exchangeState } = useWriteContract({
    ...mBulletin,
    functionName: "trade",
  });
  
  const { bulletin } = useGlobalContext();
  const { address, isConnected } = useAccount();

  const utility = {
    keep: { tag: "keep", mandarin: "保留", english: "keep" },
    remove: { tag: "remove", mandarin: "移除", english: "remove" }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { amount: 0, mood: "", comments: "" },
  });

  const MoodRadio = ({ utility, value, register }) => {
    return (
      <>
        <div className="flex items-center space-x-4">
          <input
            required
            type="radio"
            value={value}
            {...register("mood")}
          />
          <div className="flex flex-col">
            <label className="text-md text-gray-900 ">{utility.mandarin}</label>
            <label className="text-sm text-gray-600 ">{utility.english}</label>
          </div>
        </div>
      </>
    );
  };

  const Scoring = ({ utility, value, register }) => {
    return (
      <>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            className="border-2 "
            min={1}
            max={4}
            value={value}
            {...register(utility.tag)}
          />
          <div className="flex flex-col">
            <label className="text-md text-gray-900 ">{utility.mandarin}</label>
            <label className="text-sm text-gray-600 ">{utility.english}</label>
          </div>
        </div>
      </>
    );
  };
  
  
  const PaymentInput = ({ payment, value, register }) => {
    return (
      <>
        <div className="flex flex-col justify-start items-start">
          <label className=" text-md font-medium text-gray-900 mb-2">用信用點數投票 |  Stake：</label>
          <div className="flex items-end">
            <input
              type="number"
              placeholder="0"
              min={0}
              value={(bulletin.user.credit != undefined) ? (bulletin.user.credit == 0) ? 0 : value : 0}
              className="border-2 pl-2 rounded-sm w-1/5"
              {...register("amount")}
            />
            <label className="ml-2 text-sm text-gray-600 ">/</label>
            <label className="ml-2 text-amber-600 text-md">{(bulletin.user.credit != undefined) ? bulletin.user.credit : "-"}</label>
            <label className="ml-2 text-sm text-gray-600 ">{payment}</label>
          </div>
        </div>
      </>
    );
  };
  
  const Opinions = () => {
    return (
      <>
        <div className="flex flex-col space-y-3 pt-4">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900">要不要保留這個元素？ | Should we keep this element? </label>
          </div>
          <div className="grid grid-cols-2 justify-between">
            <MoodRadio utility={utility.keep} value="keep" register={register} />
            <MoodRadio utility={utility.remove} value="remove" register={register} />
          </div>
        </div>
      </>
    );
  };

  const Comments = () => {
    return (
      <div className="flex flex-col space-y-2 mt-2 mb-5">
        <div className="flex flex-col items-start space-y-1">
          <label className="text-md font-medium text-gray-900 mb-1">留言 | Comments：</label>
          <textarea className="border-2 rounded-sm w-full" {...register("comments")} />
        </div>
      </div>
    );
  };

  const onSubmit = async (data) => {
    
    const amount = parseInt(data.amount);
    if (amount > bulletin.user.credit) {
      setError("信用貨幣不足 | Insufficient crΞdit");
      return;
    }

    let params = [];
    let values = [];
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;

    // TRUE/FALSE
    if (data.mood == "keep") {
      params.push("string");
      params.push("string");
      values.push("Should we keep this element?");
      values.push("keep");
    } else {
      params.push("string");
      params.push("string");
      values.push("Should we keep this element?");
      values.push("remove");
    }

          structuredData = abiCoder.encode(params, values);

    // EVALUATE PRODUCTS
    // if (parseInt(data.digital) + parseInt(data.physical) + parseInt(data.shirt) + parseInt(data.cap) > 10) {
    //   setError("請重新排序 | Insufficient crΞdit");
    //   return;
    // }
    
    // if (data.amount > 0) {
    //   params.push("string");
    //   params.push("uint256");
    //   values.push(`${utility.digital.mandarin} | ${utility.digital.english}`);
    //   values.push(data.digital);
      
    //   params.push("string");
    //   params.push("uint256");
    //   values.push(`${utility.physical.mandarin} | ${utility.physical.english}`);
    //   values.push(data.physical);
      
    //   params.push("string");
    //   params.push("uint256");
    //   values.push(`${utility.shirt.mandarin} | ${utility.shirt.english}`);
    //   values.push(data.shirt);
      
    //   params.push("string");
    //   params.push("uint256");
    //   values.push(`${utility.cap.mandarin} | ${utility.cap.english}`);
    //   values.push(data.cap);
     
    //   structuredData = abiCoder.encode(params, values);
    // }

    if (isConnected) {
      try {
        const t = {
          approved: true,
          from: address,
          resource: ethers.constants.HashZero,
          currency: (amount > 0) ? "0x000000000000000000000000000000000000bEEF" : ethers.constants.AddressZero,
          amount: ethers.utils.parseEther(data.amount),
          content: data.comments,
          data: structuredData
        }
        const tx = exchange({ args: [modalPayload.content.type, modalPayload.content.subjectId, t] });
          
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
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center">
            <label className="text-md font-medium text-gray-900 mb-1">
              質押式投票 | Stake 🥩
            </label>
            <CloseModalButton />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1 justify-center items-start rounded-md pb-3">
              <label className="text-md font-normal text-gray-900">留言或是質押信用點數，表達你對於這個元素的想法</label>
              <label className="text-xs font-normal text-gray-900">Leave a comment or stake with crΞdit to communicate your preference for a production direction for this element  </label>
            </div>
            
            <div className="flex flex-col space-y-4">
              <PaymentInput payment="信用點數 ｜ crΞdit" register={register} />
              <Opinions />
              <Comments />
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <div div className="flex flex-col px-6 py-4 bg-slate-100 rounded-sm" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content />
          
          {isConnected ?
            <div className="flex flex-col items-center">
              <label className="mb-2 block text-xs font-medium text-red-500 ">{error ?? error}</label>
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
            <div className="mt-4">
              <DynamicWidget
                buttonClassName="connectButton"
                innerButtonComponent="Connect Wallet"
              />
            </div>
          }
        </form>
      </div>
    </>
  );
};

export default StakeModal;
