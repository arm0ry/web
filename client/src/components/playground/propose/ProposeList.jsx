import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useForm, Controller } from "react-hook-form";
import { useAccount } from "wagmi";
import { uploadJSON, unpinCID } from "@utils/ipfs";
import { Spinner } from "@components";
import MultiSelectSort from "../../MultiSelectSort";
import { Bulletin } from "@contract";
import { pushAlert } from "@context/actions/alertAction";
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

const ProposeList = () => {
  const { playground } = useGlobalContext();
  const { items, tasks } = playground;
  const [taskOptions, setTaskOptions] = useState([]);
  const [inPrepare, setInPrepare] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    console.log(items, tasks)
    setTaskOptions(
      Object.keys(items).map((id) => {
        return { value: id, label: `${id}. ${items[id].title}` };
      })
    );
  }, [items]);

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

  const { write: registerList, state } = useWriteContract({
    ...Bulletin,
    functionName: "registerList",
  });

  const onSubmit = async (data) => {
    setInPrepare(true);

    const onSuccess = () => {
      reset();
    };

    const onError = () => {
      // unpinCID(ipfsCID);
    };

    try {
      registerList({
        args: [{
          owner: address,
          title: data.title,
          detail: data.detail,
          schema: ethers.constants.HashZero,
          itemIds: data.tasks.map((item) => parseInt(item.value, 10))
        }],
        onSuccess,
        onError
      })

      setInPrepare(false)
    } catch (error) {
      pushAlert({ msg: `Error! ${error}`, type: "failure" });
    }
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
            A list consists of one or more items. Together, a list and its items provide context to collaborate onchain and open source impact.
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
                  Items
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

export default ProposeList;
