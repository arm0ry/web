import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { KaliLogo, ArrowSVG } from "@assets";
import { uploadJSON, unpinCID } from "@utils/ipfs";
import { Arm0ryMissions, KaliDAO } from "../../../contract";

import {Spinner} from "@components";
import Modal from "../../modal/Modal";

import { pushAlert } from "@context/actions/alertAction";
import { showModal } from "@context/actions/modalAction";
import { useGlobalContext } from "@context/store";
import useWriteContract from "@hooks/useWriteContract";
import { replaceMarkdownImageUrltoBase64} from "@utils/encodeImageAsBase64"

const prepareData = async (types, data, address) => {
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
    // * encode  Data
    const params = abiCoder.encode(
      types, // encode as address array
      values
    );
    console.log({ params });
    return { ipfsCID, params };
  } catch (error) {
    if (ipfsCID) unpinCID(ipfsCID);
    throw error;
  }
};

const SetTask = () => {
  // const { alerts } = useGlobalContext();
  const { address, isConnected, isDisconnected } = useAccount();
  const [inPrepare, setInPrepare] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { point: 0, expiration: 0 },
  });
  const { write: setTasks, state } = useWriteContract({
    ...Arm0ryMissions,
    functionName: "setTasks",
  });
  const onSubmit = async (data) => {
    setInPrepare(true);
    prepareData(
      ["uint8", "uint40", "address", "string", "string"],
      data,
      address,
    )
      .then(({ ipfsCID, params }) => {
        setInPrepare(false);
        const onSuccess = () => {
          reset();
        };
        const onError = () => {
          unpinCID(ipfsCID);
        };
        setTasks({ args: [[params]], onSuccess, onError });
      })
      .catch((error) => {
        pushAlert({ msg: `Error! ${error}`, type: "failure" });
      }).finally(() => {
        setInPrepare(false);
      });
  };

  return (
    <>
      {/* <Modal></Modal> */}
      <div className=" rounded-lg border-2 border-dashed border-gray-200 p-4 ">
        <div className="container ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
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
                placeholder="Title"
                required
                {...register("title")}
              />
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  for="point"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Point
                </label>

                <select
                  id="point"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=utf-8,${ArrowSVG}")`,
                  }}
                  className={`block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat p-2.5 pr-[2.5rem] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  required
                  defaultValue=""
                  {...register("point")}
                >
                  <option selected value="">
                    Choose a point
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label
                  for="expiration"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Expiration
                </label>
                <select
                  id="expiration"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=utf-8,${ArrowSVG}")`,
                  }}
                  className={`block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat p-2.5 pr-[2.5rem] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                  {...register("expiration")}
                >
                  <option value="">Choose...</option>
                  <option value="86400">1 Day</option>
                  <option value="172800">2 Days</option>
                  <option value="259200">3 Days</option>
                  <option value="345600">4 Days</option>
                  <option value="432000">5 Days</option>
                  <option value="518400">6 Days</option>
                  <option value="604800">7 Days</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label
                for="detail"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Detail
              </label>
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
              </button>
            </div>

            {/* <div className="flex items-start mb-6">
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
                {isConnected && state.writeStatus === 0 &&  (inPrepare? "Wait...": "Submit!")}
                {isConnected && state.writeStatus > 0 && <Spinner />}
                <div className={`${state.writeStatus > 0?"ml-2":""}`}>
                  {isConnected && state.writeStatus === 1 && "Waiting for approval"}
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

export default SetTask;
