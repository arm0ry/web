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
import CreditBalance from "./CreditBalance";


const Bulletin = () => {
  const { address, isConnected } = useAccount();
  const { bulletin } = useGlobalContext();

  console.log(bulletin.user, isConnected)

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
            <div className="flex flex-col justify-start w-2/3 overflow-auto">
              <Link to="/" className="flex md:mr-24">
                <label className="font-semibold text-gray-400">無頭牌｜Headless Brand</label>
              </Link>
            </div> 
            <div className="flex justify-end items-center w-1/3">
              <DynamicWidget
                buttonClassName="connectButton"
                innerButtonComponent="Connect Wallet"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col px-4 py-4 mt-14">
        <div className="flex justify-between rounded-lg p-5 bg-slate-50 items-center">
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Share to earn credits, stake credits to coordinate</label>
            <label className="block text-sm text-gray-600">Open testing on (<a target="_blank" href="https://sepolia.etherscan.io/address/0x525019878fe91a326062F3CF2AF4B72979b0F386" className="underline">Sepolia</a>) & Ethereum mainnet July, 2025</label>
          </div>
          {isConnected ? <CreditBalance /> : <></>}
        </div>
        <Asks />
        <Resources />
      </div>
    </>
  );
};

export default Bulletin;
