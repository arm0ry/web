import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { uploadJSON, unpinCID } from "@utils/ipfs";

import { Spinner } from "@components";
import Modal from "../../modal/Modal";

import { pushAlert } from "@context/actions/alertAction";
import { showModal } from "@context/actions/modalAction";
import { useGlobalContext } from "@context/store";
import useWriteContract from "@hooks/useWriteContract";
import { replaceMarkdownImageUrltoBase64 } from "@utils/encodeImageAsBase64"
import { Commons_Mission } from "@contract";

const encodeFunctionData = async (types, data, address, abi, method) => {
  try {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const detailBase64 = await replaceMarkdownImageUrltoBase64(data.detail)
    const ipfsCID = await uploadJSON({
      title: data.title,
      detail: detailBase64,
      creator: address,
      xp: data.point,
      expiration: data.expiration,
    });
    console.log({ ipfsCID });
    const values = [
      parseInt(data.point, 10),
      parseInt(data.expiration, 10),
      address,
      data.title,
      ipfsCID,
    ];
    const params = abiCoder.encode(
      types, // encode as address array
      values
    );
    console.log({ params });
    // encode Function Data
    const mInterface = new ethers.utils.Interface(abi);
    const callData = mInterface.encodeFunctionData(method, [[params]]);
    return { ipfsCID, callData };
  } catch (error) {
    if (ipfsCID) unpinCID(ipfsCID);
    throw error;
  }
};

const ProposeTask = ({ domain }) => {
  const [startDate, setStartDate] = useState(new Date());

  // const { alerts } = useGlobalContext();
  const { address, isConnected, isDisconnected } = useAccount();

  const [inPrepare, setInPrepare] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  // *
  const { write: proposeToCommons, state } = useWriteContract({
    ...Commons_Mission,
    functionName: "payToSetTasks",
  });



  const onSubmit = async (data) => {
    setInPrepare(true);
    console.log([[address], [Math.floor(new Date(startDate).getTime() / 1000)], [data.title], [data.detail]])
    if (domain === "commons") {
      const onSuccess = () => {
        reset();
      };
      const onError = () => {
        // unpinCID(ipfsCID);
      };

      try {
        proposeToCommons({
          args: [
            [address],
            [Math.floor(new Date(startDate).getTime() / 1000)],
            [data.title],
            [data.detail]
          ],
          onSuccess,
          onError
        })

        setInPrepare(false)
      } catch (error) {
        pushAlert({ msg: `Error! ${error}`, type: "failure" });
      }

    } else {
      // TODO: Make a DAO proposal
      // encodeFunctionData(
      //   ["uint8", "uint40", "address", "string", "string"],
      //   data,
      //   address,
      //   Arm0ryMissions.abi,
      //   "setTasks"
      // ).then(({ ipfsCID, callData }) => {
      //   setInPrepare(false);
      //   const onSuccess = () => {
      //     reset();
      //   };
      //   const onError = () => {
      //     // unpinCID(ipfsCID);
      //   };
      //   propose({
      //     args: [
      //       2,
      //       `[Set Task]\n${data.title}\n\nexpiration:${parseInt(
      //         data.expiration / 86400
      //       )}${" days"}\n${"     "}point:${data.point
      //       }${" xp"}\n\nDetail:\nhttps://cloudflare-ipfs.com/ipfs/${ipfsCID}\n${data.detail
      //       }`,
      //       [Arm0ryMissions.address],
      //       [0],
      //       [callData],
      //     ],
      //     onSuccess,
      //     onError,
      //   });
      // })
      //   .catch((error) => {
      //     pushAlert({ msg: `Error! ${error}`, type: "failure" });
      //   }).finally(() => {
      //     setInPrepare(false);
      //   });
    };
  }


  useEffect(() => {

    // console.log(domain)
    // console.log(Math.floor(new Date(startDate).getTime() / 1000))

  }, [startDate])

  return (
    <>
      <div className="w-5/6 mx-auto mt-2 mb-6 flex flex-row rounded-lg px-5 py-5  space-x-5">
        <div className="w-1/2 flex items-center">
          <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
            Add an Item
          </label>
        </div>
        <div className="flex items-center space-x-6 bg-slate-50 p-2">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <label className=" block text-md font-normal text-gray-900">
            An Item is something that invites onchain action and feedback.
          </label>
        </div>
      </div >

      <div className=" rounded-lg border-2 border-dashed border-gray-200 p-4 ">
        <div className="container ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  for="text"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="title for item"
                  required
                  {...register("title")}
                />
              </div>
              <div className="">
                <label
                  for="expiration"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  When does this item expire?
                </label>
                <div className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                for="detail"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Detail
              </label>

              <input
                type="text"
                id="detail"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="share an URL or a few words here"
                required
                {...register("detail")}
              />
            </div>
            <div className="mb-6 ">
              <div>
                <label
                  for="fee"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Fee: 0 Ξ
                </label>
              </div>
              {/* 
              // TODO: Markdown integration
               <textarea
                id="detail"
                rows="4"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Write task detail here..."
                {...register("detail")}
              ></textarea>
              <button
                type="button"
                className="mt-1 ml-2 text-sm text-gray-500 "
                onClick={() => {
                  showModal({
                    type: 2,
                    title: getValues("title"),
                    content: { text: getValues("detail") },
                    size: "5xl",
                  });
                }}
              >
                Preview Document
              </button> */}
            </div>


            {/* // TODO: Terms & Conditions checkbox 
             <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label
                for="remember"
                className="ml-2 text-sm font-medium text-gray-900 "
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div> */}

            <div className="w-fulll block">
              <button
                type="submit"
                disabled={!isConnected || state.writeStatus > 0 || inPrepare}
                className="x text-gray px-auto flex w-full flex-row items-center justify-center rounded-lg bg-yellow-200 py-2 text-center font-PasseroOne text-base  transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {!isConnected && "Please Connect Wallet"}
                {isConnected && state.writeStatus === 0 && (inPrepare ? "Wait..." : "Submit!")}
                {isConnected && state.writeStatus > 0 && <Spinner />}
                <div className={`${state.writeStatus > 0 ? "ml-2" : ""}`}>
                  {isConnected &&
                    state.writeStatus === 1 &&
                    "Waiting for approval"}
                  {isConnected && state.writeStatus === 2 && "pending"}
                </div>
              </button>
            </div>
          </form>
          <div>
            {/* <button
            onClick={() =>
              window.open(
                "https://app.kali.gg/daos/5/0x5e3255fee519ef9b7b41339d20abf5591f393c4d"
              )
            }
            className="text-center  gap-2  flex justify-center items-center  align-middle transition duration-300 ease-in-out w-full text-gray bg-black hover:ring-4 hover:ring-black active:ring-2 rounded-lg text-base  px-5 py-2  mt-5"
          >
            <KaliLogo className=" max-h-6 fill-current text-[#F40001]" />
            <span className="text-white font-bold"> Arm0ry Dao</span>
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposeTask;
