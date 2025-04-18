import React, { useState, useEffect } from "react";
import { Controller, get, useForm } from "react-hook-form";
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
import MultiSelectSort from "../MultiSelectSort";


const CommentModal = ({ modalPayload }) => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const { write: exchange, state: exchangeState } = useWriteContract({
    ...mBulletin,
    functionName: "trade",
  });
  
  const { bulletin } = useGlobalContext();
  const { address, isConnected } = useAccount();

  const utility = {
    digital: { tag: "digital", mandarin: "數位創作", english: "digital work" },
    physical: { tag: "physical", mandarin: "實體創作", english: "physical work" },
    shirt: { tag: "shirt", mandarin: "T恤", english: "t-shirt" },
    cap: {tag: "cap", mandarin: "帽子", english: "cap"},
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { resources: [], comments: "" },
  });

  useEffect(() => {
    setResources(
      Object.keys(bulletin.resources).map((id) => {
        return { value: id, label: bulletin.resources[id].title };
      })
    );
  }, [bulletin.resources]);
  
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
    let params = [];
    let values = [];
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;

    if (data.resources.length > 0) {
      for (let i = 0; i < data.resources.length; i++) {
        params.push("uint256");
        params.push("string");
        values.push(parseInt(data.resources[i].value));
        values.push(data.resources[i].label);
      };
    }
    let length = data.resources.length;
      do {
        params.push("uint256");
        params.push("string");
        values.push(0);
        values.push("");
        length++;
      } while (length < 5);
    structuredData = abiCoder.encode(params, values);

    if (isConnected) {
      try {
        const t = {
          approved: true,
          from: address,
          resource: ethers.constants.HashZero,
          currency: ethers.constants.AddressZero,
          amount: 0,
          content: data.comments,
          data: structuredData
        }
        console.log(modalPayload)
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
              留言 | Comment
            </label>
            <CloseModalButton />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1 justify-center items-start rounded-md">
              <label className="text-md font-normal text-gray-900">歡迎分享你對以下單一或多個元素的想法</label>
              <label className="text-xs font-normal text-gray-900">Share your feedback on one or more Elements</label>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Controller
                  control={control}
                  name="resources"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <MultiSelectSort
                      ref={ref}
                      placeholder={"Select Text..."}
                      options={resources}
                      value={value}
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
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
              <label className="mb-2 block text-sm font-medium text-red-500">{error ?? error}</label> 
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
            </div>}
        </form>
      </div>
    </>
  );
};

export default CommentModal;
