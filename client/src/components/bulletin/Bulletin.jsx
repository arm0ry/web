import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { ethers } from "ethers";
import { logo, KaliLogo, TaskIcon, QuestIcon, BuddiesIcon } from "@assets";
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
import { Avatar, Alert } from "@components";


const Bulletin = () => {
  const { address, isConnected } = useAccount();
    const [toggleMenu, setToggleMenu] = useState(false);
  const { bulletin } = useGlobalContext();

  const SidebarItem = ({ to, Icon, name, setToggleMenu, onClick = () => { } }) => {
    return (
      <li>
        <NavLink
          to={to}
          onClick={() => {
            // console.log(to);
            setToggleMenu(false);
            onClick();
          }}
          style={({ isActive }) =>
            isActive ? { background: "#F3F4F6" } : undefined
          }
          className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 "
        >
          <Icon className="h-6 w-6 text-gray-500 transition duration-75" />
          <span className="ml-3">{name}</span>
        </NavLink>
      </li>
    );
  };
  

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

      {/* <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen w-72 pt-20 transition-transform ${toggleMenu ? "transform-none" : "-translate-x-full"
          } border-r border-gray-200 bg-white md:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white px-3 pb-4  ">
      
          <ul className="space-y-2 border-tpt-4 ">
            <SidebarItem
              to="faq"
              name="Start here"
              Icon={TaskIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 ">
            <div className="">
              <label className="text-md font-semibold text-gray-900">
                ☕️   Chiado Coffee Shop
              </label>
            </div>
      
            <SidebarItem
              to="bulletin"
              name="Menu"
              Icon={QuestIcon}
              setToggleMenu={setToggleMenu}
            />
            <SidebarItem
              to="commons-reports"
              name="Marketplace"
              Icon={BuddiesIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>
      
      
          <li>
                  <div
                    onClick={() => {
                      window.open(
                        "https://app.kali.gg/daos/5/0xd758a44e66f1702c92761110dd90168f57007b8f"
                      );
                      setToggleMenu(false);
                    }}
                    className="flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
                  >
                    <KaliLogo className="h-6 w-6 rounded bg-gray-500 fill-current  p-1 text-white transition duration-75" />
                    <span className="ml-4 font-PasseroOne">PlaygroundDAO</span>
                  </div>
                </li>
          <Avatar
            className="mt-auto mb-3 h-12 w-12  shadow-lg "
            address={address}
          />
        </div>
      </aside> */}

      <div className="flex flex-col px-4 py-4 mt-14">
        <div className="flex flex-col space-y-4 md:flex-row justify-between rounded-lg p-5 bg-slate-50 items-end lg:items-center">
          <div className="w-full space-y-2">
            <div className="pb-1 space-y-1">
            <label className="block font-semibold text-lg text-gray-600">Launch a Brand using Mutual Credits</label>
            <label className="block text-xs text-gray-600">Share to earn credits, stake to coordinate, pool to fundraise</label>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="block text-sm text-gray-500"><s>0. Verify mutual credit-based coordination system on <a target="_blank" href="https://sepolia.etherscan.io/address/0x525019878fe91a326062F3CF2AF4B72979b0F386" className="underline">Sepolia</a></s></label>
              <label className="text-sm text-gray-500">1. Crowdsource 20 brand elements on <a target="_blank" href="https://sepolia.etherscan.io/address/0x525019878fe91a326062F3CF2AF4B72979b0F386" className="underline">Sepolia</a> testnet</label>
              <label className="block text-sm text-gray-500">2. CrowdSource 20 expressions of 20 elements in (1)</label>
            </div>
          </div>

          <div className="md:w-1/3 lg:w-1/3">
            {isConnected ? <CreditBalance /> : <CreditBalance />}
          </div>
        </div>
        <Asks />
        <Resources />
      </div>
    </>
  );
};

export default Bulletin;
