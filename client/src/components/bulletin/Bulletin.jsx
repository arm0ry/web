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
        <div className="px-3 py-3 ">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-start space-y-1">
              <Link to="/" className="flex md:mr-24">
                <label className="font-semibold text-gray-500">無頭牌｜Headless Brand</label>
              </Link>
              <label className=" block text-xs text-gray-400">
                share to earn, earn to stake, stake to coordinate (<a target="_blank" href="https://sepolia.etherscan.io/address/0x525019878fe91a326062F3CF2AF4B72979b0F386" className="underline">Sepolia Testnet</a>)
              </label>
            </div>
            <div className="flex items-center">
                <DynamicWidget
                  buttonClassName="connectButton"
                  innerButtonComponent="Connect Wallet"
                />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col px-4 pt-4 mt-14">
        {/* <div className=" mx-auto flex justify-center rounded-lg p-5 bg-slate-50">
          <div className="space-y-2">
            <label className=" block text-sm text-gray-600">
              share to earn, earn to stake, stake to coordinate (on <a target="_blank" href="https://sepolia.etherscan.io/address/0x54774F36d01afE8403475fE4d5635ED4BB124A9E" className="underline">Sepolia Testnet</a>)
            </label>
            <label className=" block text-md font-normal text-gray-900">Season Zer0 ends on July 13th, 2025 (<a target="_blank" href="https://g0v.hackmd.io/@jothon/g0v-hackath68n/" className="underline">g0v Hackath68n</a>)</label>
          </div>
        </div> */}
        <Asks />
        <Resources />
      </div>
    </>
  );
};

export default Bulletin;
