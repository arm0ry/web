import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { ethers } from "ethers";
import { logo } from "@assets";
import FacuetButton from "../FacuetButton";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";
import {
  loadBulletins, loadAsks, loadResources, loadCurrency, loadUser
} from "@context/actions/bulletinAction";
import { useGlobalContext } from "@context/store";
import Asks from "./Asks";
import Resources from "./Resources";
import Info from "./Info";

const Bulletin = () => {
  const { address, isConnected } = useAccount();
  const { bulletin } = useGlobalContext();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const load = async () => {
      await loadBulletins();
      await loadAsks();
      await loadResources();
      await loadCurrency();
      await loadUser(isConnected, address);
    }
    load()
  }, [isConnected]);

  return (
    <>
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-gray-200 bg-white ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="ml-2 flex md:mr-24">
                <img src={logo} alt="arm0ry" />
              </Link>
            </div>
            <label className="text-sm text-gray-500">G0V 65 大松</label>
            
            <div className="flex items-center">
              <div className="relative ml-3 flex items-center ">
                <Info />
                {/* <DynamicWidget
                  buttonClassName="connectButton"
                  innerButtonComponent="Connect Wallet"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col space-y-3 p-4 mt-14">
        
        <Asks></Asks>
        <Resources></Resources>
      </div>
    </>
  );

};

export default Bulletin;
