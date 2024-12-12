import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { ethers } from "ethers";
import {
  logo,
  MenuUpIcon,
  MenuDownIcon,
  MissionIcon,
  BuddiesIcon,
  ProposeIcon,
  TaskIcon,
  ArrowSVG,
  QuestIcon,
} from "@assets";
import FacuetButton from "../FacuetButton";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";
import {
  signIn,
  signOut,
} from "@context/actions/userAction";
import {
  loadBulletins, loadAsks, loadResources
} from "@context/actions/bulletinAction";
import { useGlobalContext } from "@context/store";
import { Avatar, Alert } from "@components";
import Asks from "./Asks";
import Resources from "./Resources";

const Bulletin = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { playground, bulletin } = useGlobalContext();
  const [toggleMenu, setToggleMenu] = useState(false);
  
  useEffect(() => {
    if (isConnected) {
      signIn({
        address,
        taskId: playground.taskId,
        missionId: playground.missionId,
      });
    }
  }, [isConnected]);
  useEffect(() => {
    if (isConnected) {
      // getTravelerTask(address, playground.taskId);
      // getTravelerQuest(address, playground.missionId);
    }
  }, [playground.taskId, playground.missionId]);

  useEffect(() => {
    if (isDisconnected) {
      signOut();
    }
  }, [isDisconnected]);

  useEffect(() => {
    const load = async () => {
      await loadBulletins();
      await loadAsks();
      await loadResources();
    }
    load()
  }, []);


  return (
    <>
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-gray-200 bg-white ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => setToggleMenu((t) => !t)}
                className="ml-3 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 md:hidden"
              >
                <span className="sr-only">Open main menu</span>
                {!toggleMenu ? (
                  <MenuDownIcon className="h-6 w-6" />
                ) : (
                  <MenuUpIcon className="h-6 w-6" />
                )}
              </button>
              <Link to="/" className="ml-2 flex md:mr-24">
                <img src={logo} alt="arm0ry" />
              </Link>
            </div>
            <div className="flex items-center">
              <FacuetButton />
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

      <div className="mb-2 h-1/2 bg-amber-50">
        <Asks></Asks>
      </div>
      {/* <div className="h-1/2 bg-blue-200">
        <Resources></Resources>
      </div> */}
    </>
  );

};

export default Bulletin;
