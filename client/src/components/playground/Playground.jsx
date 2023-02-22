import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, NavLink, Link, Outlet, redirect } from "react-router-dom";
import {
  logo,
  MenuUpIcon,
  MenuDownIcon,
  Passport,
  TaskIcon,
  MissionIcon,
  BuddiesIcon,
  ProposeIcon,
  KaliLogo,
  ManagerIcon,
  ArrowSVG,
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
const SidebarItem = ({ to, Icon, name, setToggleMenu, onClick=()=>{} }) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={() => {
          console.log(to);
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
const SidebarMultiLevelMenu = ({ Icon, name, children }) => {
  const [taggle, setTaggle] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setTaggle((t) => !t)}
        // style={({ isActive }) =>
        //   isActive ? { background: "#F3F4F6" } : undefined
        // }
        className={`
            group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 `}
      >
        <Icon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900" />
        <span className="ml-3 flex-1 whitespace-nowrap text-left">{name}</span>
        <img src={`data:image/svg+xml;charset=utf-8,${ArrowSVG}`} className="h-6 w-6"/>
      </button>

      <ul
        className={`${taggle ? "" : "hidden"} mt-0 space-y-1 py-1`}
        onClick={() => setTaggle((t) => !t)}
        // onBlur={() => setTaggle((t) => false)}
      >
        {children}
      </ul>
    </>
  );
};

const Playground = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { tasks } = useGlobalContext();
  const navigate = useNavigate();

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

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen w-64 pt-20 transition-transform ${
          toggleMenu ? "transform-none" : "-translate-x-full"
        } border-r border-gray-200 bg-white md:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white px-3 pb-4  ">
          <ul className="space-y-2">
            <SidebarItem
              to="traveller-pass"
              name="Passport"
              Icon={Passport}
              setToggleMenu={setToggleMenu}
            />
            <SidebarItem
              to="missions"
              name="Missions"
              Icon={MissionIcon}
              setToggleMenu={setToggleMenu}
            />
            <SidebarItem
              to="tasks"
              name="Tasks"
              Icon={TaskIcon}
              setToggleMenu={setToggleMenu}
            />
            <SidebarItem
              to="review"
              name="Review"
              Icon={BuddiesIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 ">
            <SidebarItem
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
                className="flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
              >
                <KaliLogo className="h-6 w-6 rounded bg-gray-500 fill-current  p-1 text-white transition duration-75" />
                <span className="ml-4 font-PasseroOne">Arm0ry DAO</span>
              </div>
            </li>
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 ">
            <SidebarMultiLevelMenu name="Manager" Icon={ManagerIcon}>
              <SidebarItem
                to="manager/set-task"
                name="Set Task"
                Icon={()=><div className="pl-6"/>}
                setToggleMenu={setToggleMenu}
              />
              <SidebarItem
                to="manager/set-mission"
                name="Set Mission"
                Icon={()=><div className="pl-6"/>}
                setToggleMenu={setToggleMenu}
              />
            </SidebarMultiLevelMenu>
          </ul>
          <Avatar className="mt-auto " />
        </div>
      </aside>

      <div className="relative mt-16 p-4 md:ml-64">
        <Alert />

        <Outlet />
        {/* <div className="h-screen"></div> */}
      </div>
      {toggleMenu && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 md:hidden"
          onClick={() => setToggleMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Playground;
