import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useForm, Controller } from "react-hook-form";
import { useAccount } from "wagmi";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// const animatedComponents = makeAnimated();
import { uploadJSON, unpinCID } from "@utils/ipfs";
import { Arm0ryMissions, KaliDAO } from "../../../contract";

import { Spinner } from "@components";
import MultiSelectSort from "../../MultiSelectSort";
import { Commons_Mission } from "@contract";

import { pushAlert } from "@context/actions/alertAction";
import { showModal } from "@context/actions/modalAction";
import { useGlobalContext } from "@context/store";
import useWriteContract from "@hooks/useWriteContract";
import { replaceMarkdownImageUrltoBase64 } from "@utils/encodeImageAsBase64";

const encodeFunctionData = async (types, data, address, abi, method) => {
  try {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const tasks = data.tasks.map((item) => parseInt(item.value, 10));
    const detailBase64 = await replaceMarkdownImageUrltoBase64(data.detail);

    const ipfsCID = await uploadJSON({
      title: data.title,
      tasks: tasks,
      creator: address,
      detail: detailBase64,
      fee: data.fee,
    });
    console.log({ ipfsCID });
    const mInterface = new ethers.utils.Interface(abi);
    const callData = mInterface.encodeFunctionData(method, [
      tasks,
      ipfsCID,
      data.title,
      address,
      0,
      data.fee,
    ]);
    return { ipfsCID, callData };
  } catch (error) {
    if (ipfsCID) unpinCID(ipfsCID);
    throw error;
  }
};

const ProposeMission = ({ domain }) => {
  const { playground } = useGlobalContext();
  const { commonsTasks, tasks } = playground;
  const [taskOptions, setTaskOptions] = useState([]);
  const [inPrepare, setInPrepare] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    setTaskOptions(
      Object.keys(commonsTasks).map((id) => {
        return { value: id, label: commonsTasks[id].title };
      })
    );
  }, [commonsTasks]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { tasks: [] },
  });

  const { write: propose, state } = useWriteContract({
    ...KaliDAO,
    functionName: "propose",
  });
  const onSubmit = async (data) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner();
    const commonsMissionInstance = new ethers.Contract(Commons_Mission.address, Commons_Mission.abi, signer)

    setInPrepare(true);

    const tasks = data.tasks.map((item) => parseInt(item.value, 10))
    console.log(domain, [address, data.title, data.detail, tasks])

    if (domain === "commons") {
      const onSuccess = () => {
        reset();
      };
      const onError = () => {
        // unpinCID(ipfsCID);
      };

      try {
        console.log(tasks)
        const tx = await commonsMissionInstance.payToSetMission(address, data.title, data.detail, data.tasks.map((item) => parseInt(item.value, 10)))
        console.log(tx)
      } catch (error) {

      }
      // proposeToCommons({
      //   args: [
      //     [address],
      //     [Math.floor(new Date(startDate).getTime() / 1000)],
      //     [data.title],
      //     [data.detail]
      //   ],
      //   onSuccess,
      //   onError
      // })
    } else {
      // TODO: Make a DAO proposal
      //   encodeFunctionData(
      //   ["uint8[]", "string", "string", "address", "uint8", "uint256"],
      //   data,
      //   address,
      //   Arm0ryMissions.abi,
      //   "setMission"
      // )
      //   .then(({ ipfsCID, callData }) => {
      //     setInPrepare(false);
      //     const onSuccess = () => {
      //       reset();
      //     };
      //     const onError = () => {
      //       unpinCID(ipfsCID);
      //     };
      //     propose({
      //       args: [
      //         2,
      //         `[Set Mission]\n${data.title}\n\Tasks:${data.tasks
      //           .map((item) => item.label)
      //           .join(", ")}\n\Creator:${address}\nFee:${data.fee
      //         }${" xp"}\n\nDetail:\nhttps://cloudflare-ipfs.com/ipfs/${ipfsCID}\n${data.detail
      //         }`,
      //         [Arm0ryMissions.address],
      //         [0],
      //         [callData],
      //       ],
      //       onSuccess,
      //       onError,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("error123", error);
      //     pushAlert({ msg: `Error! ${error}`, type: "failure" });
      //   })
      //   .finally(() => {
      //     setInPrepare(false);
      //   });
    };
  }

  return (
    <>

      <div className="w-5/6 mx-auto mt-2 mb-6 flex flex-row rounded-lg px-5 py-5  space-x-5">
        <div className="w-1/2 flex items-center">
          <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
            Create a List
          </label>
        </div>
        <div className="flex items-center space-x-6 bg-slate-50 p-2">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <label className=" block text-md font-normal text-gray-900">
            A list consists of one or more tasks. Together, a list and its tasks provide context to collaborate onchain and open source impact.
          </label>
        </div>
      </div >

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
                placeholder="title for a list"
                required
                {...register("title")}
              />
            </div>
            <div className="mb-6 ">
              <div>
                <label
                  for="tasks"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Tasks
                </label>
                <Controller
                  control={control}
                  name="tasks"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <MultiSelectSort
                      ref={ref}
                      placeholder={"Select Text..."}
                      options={taskOptions}
                      // options={[
                      //   { label: "Defi", value: "1" },
                      //   { label: "UniSwap", value: "2" },
                      //   { label: "BlockChain", value: "3" },
                      //   { label: "DAO", value: "4" },
                      //   { label: "NFT", value: "5" },
                      // ]}
                      value={value}
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
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
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProposeMission;
