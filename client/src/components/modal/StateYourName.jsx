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

const StateYourNameModal = ({ modalPayload }) => {
  const [inPrepare, setInPrepare] = useState(false);
  const [fetching, setFetching] = useState(false);

  const bulletin = modalPayload.content.bulletin;
  const listId = modalPayload.content.listId;
  const itemId = modalPayload.content.itemId;
  const uuid = (bulletin != undefined) ? bulletin.address + listId + itemId : "";

  const { address, isConnected, isDisconnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { seed: "", moon: "", string1: "", string2: "", slider: "", slider2: "", slider3: "", flavor: "", body: "", aroma: "" },
  });

  const { write: log, state: logState } = useWriteContract({
    ...Logger,
    functionName: "log",
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

  const logByBot = async (feedback, data) => {
    try {

      const body = { bulletin: bulletin.address, listId: listId, itemId: itemId, feedback: feedback, data: data };
      axios
        .post("/api/users/sponsored_respond", body)
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            pushAlert({
              msg: (
                <span>
                  {res.data.msg}
                  <a
                    href={`https://gnosis-chiado.blockscout.com/tx/${res.data.txhash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-extrabold text-green-900"
                  >
                    &nbsp;View on Etherscan &#128279;
                  </a>
                </span>
              ),
              type: "success",
            });
            setFetching(false);

          }
        })
        .catch((err) => {
          console.error(err);
          pushAlert({
            msg: `Error! ${err.response.data.msg}`,
            type: "failure",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {


    // TODO: Need to use switch to build the correct data structure for list and item
    let structuredData;
    const abiCoder = ethers.utils.defaultAbiCoder;
    structuredData = await abiCoder.encode(["uint256", "uint256", "uint256"], [data.flavor, data.body, data.aroma]);
    console.log(data, structuredData)

    // if (data.string1 != "") {
    //   structuredData = await abiCoder.encode(["string"], [data.string1]);
    // }

    if (isConnected) {
      setInPrepare(true);

      try {
        log({
          args: [bulletin.address, listId, itemId, data.feedback, structuredData],
        })
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      setInPrepare(true);

      try {
        logByBot(data.feedback, ethers.constants.HashZero)
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    }
  };

  const ListTouchpointDataStructure = () => {
    let address = ethers.constants.HashZero;
    address = (bulletin != undefined) ? bulletin.address : "";;

    switch (uuid) {
      case address + 1 + 0:
        return (
          <>
            <div className="flex flex-row justify-center space-x-20">
              <div className="flex flex-row space-x-5 items-center mb-6">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Flavor
                </label>
                <input required type="number" max={10} min={1} {...register("flavor")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
              <div className="flex flex-row space-x-5 items-center mb-6">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Body
                </label>
                <input required type="number" max={10} min={1} {...register("body")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
              <div className="flex flex-row space-x-5 items-center mb-6">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Aroma
                </label>
                <input required type="number" max={10} min={1} {...register("aroma")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
            </div>

          </>
        );
      case address + 2 + 0:
        return (
          <>
            <div className="flex flex-row justify-center space-x-20">
              <div className="flex flex-row space-x-5 items-center mb-6">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Flavor
                </label>
                <input required type="number" max={10} min={1} {...register("flavor")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
              <div className="flex flex-row space-x-5 items-center mb-6">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Body
                </label>
                <input required type="number" max={10} min={1} {...register("body")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
              <div className="flex flex-row space-x-5 items-center mb-6">
                <label
                  className=" block text-sm font-medium text-gray-900 "
                >
                  Aroma
                </label>
                <input required type="number" max={10} min={1} {...register("aroma")} className="rounded-md text-center p-1" placeholder="1" />
              </div>
            </div>

          </>
        );
      case address + 3 + 0:
        return (
          <>
            <div className="mb-6 ">
              <label
                className=" block text-sm font-medium text-gray-900 "
              >
                How satisfied are you with our espresso?
              </label>
              <div className="flex flex-col items-start justify-between">
                <MoodRadio moon="Not satisfied" value={"1"} register={register} />
                <MoodRadio moon="Moderately satisfied" value={"2"} register={register} />
                <MoodRadio moon="Satisfied" value={"3"} register={register} />
                <MoodRadio moon="Very satisfied" value={"4"} register={register} />
              </div>
            </div>
          </>);
      case address + 4 + 0:
        return (
          <>
            <div className="mb-6 ">
              <label
                className=" block text-sm font-medium text-gray-900 mb-2"
              >
                Is there anything you'd like to know more from our espress making process?
              </label>
              <div className="flex flex-col items-start justify-between">
                <input
                  type="text"
                  id="seed"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="..."
                  required
                  {...register("string1")}
                />
              </div>
            </div>
          </>);
      default:
        return (<></>);
    }
  }

  const ItemTouchpointDataStructure = () => {
    let address = ethers.constants.HashZero;
    const ds = (bulletin != undefined) ? bulletin.address + listId + itemId : "";
    address = (bulletin != undefined) ? bulletin.address : address;;

    switch (ds) {
      case address + 2 + 2:
        return (
          <>
            <div className="mb-6 ">
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
      case address + 3 + 4:
        return (
          <>
            <div className="mb-6 ">
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
      case address + 4 + 6:
        return (
          <>
            <div className="mb-6 ">
              <label
                className=" block text-sm font-medium text-gray-900 "
              >
                Which machine do you use?
              </label>
              <div className="flex flex-col items-start justify-between">
                <MoodRadio moon="Brand 1" value={"1"} register={register} />
                <MoodRadio moon="Brand 2" value={"2"} register={register} />
                <MoodRadio moon="Brand 2" value={"3"} register={register} />
              </div>
            </div>
          </>
        );
      case address + 4 + 7:
        return (
          <>
            <div className="mb-6 ">
              <label
                className=" block text-sm font-medium text-gray-900 "
              >
                Which grinder do you use?
              </label>
              <div className="flex flex-col items-start justify-between">
                <MoodRadio moon="Brand 1" value={"1"} register={register} />
                <MoodRadio moon="Brand 2" value={"2"} register={register} />
                <MoodRadio moon="Brand 2" value={"3"} register={register} />
              </div>
            </div>
          </>
        );
      case address + 4 + 9:
        return (
          <>
            <div className="mb-6 ">
              <label
                className=" block text-sm font-medium text-gray-900 "
              >
                How do you make own espresso?
              </label>
              <div className="flex flex-col items-start justify-between">
                <MoodRadio moon="Method 1" value={"1"} register={register} />
                <MoodRadio moon="Method 2" value={"2"} register={register} />
                <MoodRadio moon="Method 2" value={"3"} register={register} />
              </div>
            </div>
          </>
        );
      default:
        return (<></>);
    }
  }

  useEffect(() => {
  }, [fetching]);

  useEffect(() => {
  }, [bulletin]);

  return (
    <>
      <div className="flex items-start justify-between rounded-t px-4 pt-4 text-gray-500  bg-slate-100">
        <div className="flex flex-col">
          <label className="mb-2 block text-lg font-semibold text-gray-900">
            一起上鏈吧！ ｜ Let's get onchain!
          </label>
          <label className="mt-1 ml-3 mb-1 block text-sm font-medium text-gray-500">
            Connect your wallet or use a public alias to participate! Public alias feature is experimental, and recommended for single-use only.
          </label>

        </div>
        <CloseModalButton />
      </div>


      <div div className="flex h-auto h-space-y-2 overflow-y-scroll px-6 py-4 bg-slate-100" >
        <div className="w-full mx-auto items-center justify-center gap-3">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                {isConnected ? "地址 | Address" : "稱呼 | Name"}
              </label>
              <div className="flex space-x-4 items-center justify-start">
                <div className="w-2/3">
                  {isConnected ?
                    <label
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      {address}
                    </label> :
                    <input
                      type="text"
                      id="seed"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      placeholder="麵包小偷 | Baguette thief"
                      required
                      {...register("seed")}
                    />
                  }
                </div>
                <div className="flex w-1/3 items-center justify-center ">
                  {isConnected ? <></> : <DynamicWidget
                    buttonClassName="connectButton"
                    innerButtonComponent="Connect Wallet"
                  />}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                心得 | Feedback
              </label>
              <textarea
                id="feedback"
                className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="炸雞超好吃～ | Fried chicken was so good~"
                {...register("feedback")}
              ></textarea>
            </div>

            <div>
              <ListTouchpointDataStructure />
              <ItemTouchpointDataStructure />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <button
                type="submit"
                disabled={logState.writeStatus > 0 || fetching}
                className="text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {(logState.writeStatus === 0 && !fetching) && (inPrepare ? "Wait..." : "Share")}
                {(logState.writeStatus > 0 || fetching) && <Spinner />}
                <div className={`${(logState.writeStatus > 0 || fetching) ? "ml-2" : ""}`}>

                  {(logState.writeStatus === 1) && "Waiting for approval"}
                  {(logState.writeStatus === 2 || fetching) && "pending"}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div >
    </>
  );
};

export default StateYourNameModal;
