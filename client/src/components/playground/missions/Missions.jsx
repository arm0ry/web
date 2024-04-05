import React, { useState, useEffect } from "react";
import { LegoBrickIcon } from "@assets";
import { useGlobalContext } from "@context/store";
import MissionCard from "./MissionCard";

const Missions = ({ domain }) => {
  const { playground } = useGlobalContext();
  const { missions, commonsMissions } = playground;

  return (
    <>
      {(domain === "commons") ? (
        <div className="flex flex-col">
          <label className="p-4 mb-2 block text-2xl font-bold text-gray-900 mx-auto">
            Commons
          </label>
          <div className="w-5/6 mx-auto mt-2 mb-6 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
            <label className="py-5 text-md font-normal text-gray-900">
              💡
            </label>
            <div className="flex flex-col py-5 space-y-3">
              <div className="space-y-1">
                <label className=" block text-md font-normal text-gray-900">
                  This is a prototype built on the Sepolia testnet to demo how communities may build assets onchain.
                </label>
              </div>
              {/* <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                Two contracts are involved to build community assets onchain. Both contracts are verified on Etherscan and you may view them <a href="https://sepolia.etherscan.io/address/0xe1bB4F49942d4Da1f19B393B2d57c2F605b1aA48#code" target="_blank" class="underline">here</a> and <a href="https://sepolia.etherscan.io/address/0x73604b616e3ae61751f43679a6303ba6664e59c6#code" target="_blank" class="underline">here</a>.
              </label>
            </div> */}
              <div className="space-y-1">
                <label className=" block text-md font-normal text-gray-900">
                  Commons is an onchain space to share knowledge (in the form of Lists and Items), and anyone may interact with shared knowledge, also onchain.
                </label>
              </div>
              <div className="space-y-1">
                <label className=" block text-md font-normal text-gray-900">
                  Through interacting with onchain knowledge, we can pool actions together to build assets native to Commons that represent impact and at the same time, fundraise for Commons.
                </label>
              </div>
              <div>
                <label className=" block text-md font-normal text-gray-900">
                  To try out this prototype, check out knowledge dropped below or drop new ones by starting with "Add an Item" and "Create a List" tabs on the left.
                </label>
              </div>
            </div>
          </div >
        </div>
      ) : (
        <div className="w-5/6 mx-auto mt-2 mb-6 flex flex-row rounded-lg px-5 py-5 bg-slate-50 space-x-5">
          <label className="py-5 text-md font-normal text-gray-900">
            💡
          </label>
          <div className="flex flex-col py-5 space-y-3">
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                “知識派”提供想要開源的物件、清單、活動、音樂等，讓“行動派”在區塊鏈上與清單的內容互動，留下參與紀錄。
              </label>
              <label className=" block text-sm font-normal text-gray-600">
                Supply a living list of items, events, tracks, videos, or all of the above, and let the world interact with it onchain.
              </label>
            </div>
            <div className="space-y-1">
              <label className=" block text-md font-normal text-gray-900">
                以 g0v 為例，我們在區塊鏈上分享“台灣零時政府黑客松”的清單，讓參與大松的沒有人們紀錄參與大松當天的心得 🎉
              </label>
              <label className=" block text-sm font-normal text-gray-600">
                Here we provide a list of g0v's hackath0ns (try control+f 台灣零時政府黑客松). Take a look. You can also participate <a target="_blank" href="https://www.youtube.com/@g0vTW" class="underline"
                >online</a> and onchain here.
              </label>
            </div>
            <div>
              <label className=" block text-md font-normal text-gray-900">
                沒有以太錢包沒有問題 👍，用清單裡面的 “報到 ｜ Register” 按鈕就可以不具名（實驗用）參與喔！
              </label>
              <label className=" block text-sm font-normal text-gray-600">
                No wallet? no problem. Use the “報到 ｜ Register” button in each list to participate openly and anonymously!
              </label>
            </div>
          </div>
        </div >
      )}
      <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Object.keys((domain === "commons") ? commonsMissions : missions).map((id) => {
          return <MissionCard key={id} missionId={id} missions={(domain === "commons") ? commonsMissions : missions} />;
        })}
        <div className="flex h-52 max-w-sm items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-6 ">
          <LegoBrickIcon className="mb-2 h-20 w-20 text-gray-400 " />
        </div>
        <div className="flex h-52 max-w-sm items-center justify-center rounded-lg border-4 border-dashed border-gray-200 p-6 ">
          <LegoBrickIcon className="mb-2 h-20 w-20 text-gray-400 " />
        </div>
      </div >
    </>
  );
};

export default Missions;
