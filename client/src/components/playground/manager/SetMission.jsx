import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import { uploadJSON, unpinCID } from "@utils/ipfs";

import { Spinner } from "@components";
import MultiSelectSort from "../../MultiSelectSort";

import { pushAlert } from "@context/actions/alertAction";
import { showModal } from "@context/actions/modalAction";
import { useGlobalContext } from "@context/store";
import useWriteContract from "@hooks/useWriteContract";
import { replaceMarkdownImageUrltoBase64 } from "@utils/encodeImageAsBase64";

const prepareData = async (types, data, address) => {
  try {
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
    const params = [tasks, ipfsCID, data.title, address, data.fee];
    return { ipfsCID, params };
  } catch (error) {
    if (ipfsCID) unpinCID(ipfsCID);
    throw error;
  }
};

const SetMission = () => {
  const { playground } = useGlobalContext();
  const { tasks } = playground;
  const [taskOptions, setTaskOptions] = useState([]);
  const [inPrepare, setInPrepare] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    setTaskOptions(
      Object.keys(tasks).map((id) => {
        return { value: id, label: tasks[id].title };
      })
    );
  }, [tasks]);

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
  // const { write: setMission, state } = useWriteContract({
  //   ...Arm0ryMissions,
  //   functionName: "setMission",
  // });
  // console.log("tasks", watch("tasks"));
  const onSubmit = async (data) => {
    setInPrepare(true);
    prepareData(
      ["uint8[]", "string", "string", "address", "uint256"],
      data,
      address
    )
      .then(({ ipfsCID, params }) => {
        setInPrepare(false);
        const onSuccess = () => {
          reset();
        };
        const onError = () => {
          unpinCID(ipfsCID);
        };
        // setMission({ args: params, onSuccess, onError });
      })
      .catch((error) => {
        pushAlert({ msg: `Error! ${error}`, type: "failure" });
      })
      .finally(() => {
        setInPrepare(false);
      });
  };

  return (
    <>
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
            <div className="mb-6 ">
              <div>
                <label
                  for="fee"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Fee
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  id="fee"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="0"
                  required
                  {...register("fee")}
                />
              </div>
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

export default SetMission;
