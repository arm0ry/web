import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, NavLink, Link, Outlet } from "react-router-dom";
import {
  logo,
  menuUp,
  menuDown,
  Passport,
  TaskIcon,
  MissionIcon,
  BuddiesIcon,
  ProposeIcon,
  KaliLogo,
  ManagerIcon,
} from "@assets";

import { DynamicWidget } from "@dynamic-labs/sdk-react";

import { ethers } from "ethers";
import { useContractRead, useAccount, useProvider } from "wagmi";
import { getContract } from "@wagmi/core";
import { Arm0ryMissions, RPC } from "../../contract";

import { useGlobalContext } from "@context/store";

import { Alert } from "../";
import Avatar from "../Avatar";

// const svg = avatar.toString();
const NavbarItem = ({ to, Icon, name, setToggleMenu }) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={() => setToggleMenu(false)}
        style={({ isActive }) =>
          isActive ? { background: "#F3F4F6" } : undefined
        }
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon className="w-6 h-6 text-gray-500 transition duration-75" />
        <span className="ml-3">{name}</span>
      </NavLink>
    </li>
  );
};

const Playground = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { tasks } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed h-16 top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => setToggleMenu((t) => !t)}
                className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
              >
                <span className="sr-only">Open main menu</span>
                {!toggleMenu ? (
                  <img src={menuDown} className="w-6 h-6" />
                ) : (
                  <img src={menuUp} className="w-6 h-6" />
                )}
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                <img src={logo} alt="arm0ry" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3 relative ">
                <DynamicWidget
                  buttonClassName="connectButton"
                  innerButtonComponent="Connect Wallet"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          toggleMenu ? "transform-none" : "-translate-x-full"
        } bg-white border-r border-gray-200 md:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white flex flex-col  ">
          <ul className="space-y-2">
            <NavbarItem
              to="passport"
              name="Passport"
              Icon={Passport}
              setToggleMenu={setToggleMenu}
            />
            <NavbarItem
              to="missions"
              name="Missions"
              Icon={MissionIcon}
              setToggleMenu={setToggleMenu}
            />
            <NavbarItem
              to="tasks"
              name="Tasks"
              Icon={TaskIcon}
              setToggleMenu={setToggleMenu}
            />
            <NavbarItem
              to="review"
              name="Review"
              Icon={BuddiesIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <NavbarItem
              to="propose-task"
              name="Propose Task"
              Icon={ProposeIcon}
              setToggleMenu={setToggleMenu}
            />

            <li>
              <div
                onClick={() => {
                  window.open(
                    "https://app.kali.gg/daos/5/0x5e3255fee519ef9b7b41339d20abf5591f393c4d"
                  );
                  setToggleMenu(false);
                }}
                className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100"
              >
                <KaliLogo className="w-6 h-6 bg-gray-500 text-white fill-current  p-1 rounded transition duration-75" />
                <span className="ml-4 font-PasseroOne">Arm0ry DAO</span>
              </div>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <NavbarItem
              to="manager"
              name="Manager"
              Icon={ManagerIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>
          <Avatar className="mt-auto " />
        </div>
      </aside>

      <div className="relative p-4 mt-16 md:ml-64">
      <Alert />
        
          
          <Outlet />
        {/* <div className="h-screen"></div> */}
      </div>
      {toggleMenu && (
        <div
          className="bg-gray-900 bg-opacity-50 fixed inset-0 z-30 md:hidden"
          onClick={() => setToggleMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Playground;
