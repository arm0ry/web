import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { ethers } from "ethers";
import { logo } from "@assets";
import FacuetButton from "../FacuetButton";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";
import {
  loadAsks, loadResources, loadCurrency, loadUser
} from "@context/actions/bulletinAction";
import { useGlobalContext } from "@context/store";
import Asks from "./Asks";
import Resources from "./Resources";

const Bulletin = () => {
  const { address, isConnected } = useAccount();
  const { bulletin } = useGlobalContext();

  useEffect(() => {
    const load = async () => {
      await loadAsks();
      await loadResources();
      await loadCurrency();
      await loadUser(isConnected, address);
    }
    load();
  }, [isConnected]);

  return (
    <>
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-gray-200 bg-white ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="ml-2 flex md:mr-24">
                <label className="text-lg font-semibold text-gray-500">Season Zer0</label>
              </Link>
            </div>
            
            <div className="flex items-center">
              <div className="relative ml-3 flex items-center ">
                <DynamicWidget
                  buttonClassName="connectButton"
                  innerButtonComponent="Connect Wallet"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col px-4 pt-4 mt-14">
        <div className="w-5/6 mx-auto flex flex-row rounded-lg p-5 bg-slate-50">
          <div className="flex flex-row space-x-10 items-center">
            <div className="">
              <label className="pl-4 py-5 text-md text-xl text-gray-400">
                第零季
              </label>
            </div>
            <div className="space-y-2">
              <label className=" block text-md font-normal text-gray-900">Self-finance a <b>headless</b> brand / gallery / community garden / community</label>
              <label className=" block text-md font-normal text-gray-900">Share to earn, earn to stake, stake to communicate and coordinate</label>
              <label className=" block text-md font-normal text-gray-900">
                Prototype is <b>OPEN</b> on <a target="_blank" href="https://sepolia.etherscan.io/address/0x54774F36d01afE8403475fE4d5635ED4BB124A9E" className="underline">Sepolia Testnet</a> for cosmo-local experimentation
              </label>
              <label className=" block text-md font-normal text-gray-900">Staking for Season Zer0 ends on day of <a target="_blank" href="https://g0v.hackmd.io/@jothon/g0v-hackath68n/" className="underline">g0v Hackath68n</a> (July 13th, 2025)</label>
              <label className=" block text-md font-normal text-gray-900">New season begins on day of <a target="_blank" href="https://g0v.hackmd.io/@jothon/g0v-hackath69n/" className="underline">g0v Hackath69n</a> (September, 2025)</label>
            </div>
          </div>
        </div>
        <Asks />
        <Resources />
      </div>
    </>
  );

};

export default Bulletin;
