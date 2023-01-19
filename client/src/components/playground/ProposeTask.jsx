import React from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { prepareWriteContract, writeContract } from "@wagmi/core";

import { Arm0ryMissions, KaliDAO } from "../../contract";
import WalletBar from "../WalletBar";

const Admin = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const abiCoder = ethers.utils.defaultAbiCoder;

  const onSubmit = async (d) => {
    const detail = { title: d.title, detail: d.detail };

    const params = abiCoder.encode(
      ["uint8", "uint40", "address", "string"], // encode as address array
      [
        parseInt(d.point, 10),
        parseInt(d.expiration, 10),
        address,
        JSON.stringify(detail),
      ]
    );
    console.log(params)
    // encode Function Data
    const mInterface = new ethers.utils.Interface(Arm0ryMissions.abi)
    const callData = mInterface.encodeFunctionData("setTasks", [[params]])
    // 
    const config = await prepareWriteContract({
      ...KaliDAO,
      functionName: "propose",
      args: [2,`setTask:\n${d.title}`, [Arm0ryMissions.address], [0], [callData]]
    });
    const data = await writeContract(config);
    console.log({data})

    // const ppconfig = await prepareWriteContract({
    //   ...Arm0ryMissions,
    //   functionName: "updatePermission",
    //   args: ["0x55C6F238B85F1808f0C105b817180213513E854A", "0x4744cda32bE7b3e75b9334001da9ED21789d4c0d"],
    // });
    // const ppdata = await writeContract(ppconfig);

    
  };
  console.log(watch("example"));

  return (
    <>
      <div className="container">
        <WalletBar />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              for="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
              {...register("title")}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="point"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Point
              </label>
              {/* <input
                type="text"
                id="point"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3"
                required
              /> */}
              <select
                id="point"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                defaultValue=""
                {...register("point")}
              >
                <option value="">Choose a point</option>
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Expiration
              </label>
              <select
                id="expiration"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                defaultValue=""
                {...register("expiration")}
              >
                <option value="">Choose...</option>
                <option value="86400">1 Day</option>
                <option value="172800">2 Days</option>
                <option value="259200">3 Days</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label
              for="detail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Detail
            </label>
            <textarea
              id="detail"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write task detail here..."
              {...register("detail")}
            ></textarea>
          </div>
          {/* <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div> */}
          <div className="block w-fulll">
            <button
              type="submit"
              disabled={!isConnected}
              className=" transition duration-300 ease-in-out w-full text-gray bg-yellow-200 hover:ring-4 hover:ring-yellow-200 focus:ring-2  font-PasseroOne rounded-lg text-base  px-auto py-2 text-center disabled:opacity-25 disabled:pointer-events-none"
            >
              {isConnected? "Submit": "Please Connect Wallet"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;
