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
  QuestIcon,
} from "@assets";
import FacuetButton from "../FacuetButton";
import { DynamicWidget } from "@dynamic-labs/sdk-react";

import { ethers } from "ethers";
import {
  useContractRead,
  useAccount,
  useProvider,
  useNetwork,
  useContractEvent,
  useBlockNumber,
} from "wagmi";
import { createClient, configureChains, mainnet, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { getContract } from "@wagmi/core";
import { Arm0ryMissions, Arm0ryQuests, RPC } from "../../contract";

import { fetchMissionsData, fetchTasksData } from "@utils/contract";

import {
  signIn,
  signOut,
  getTravelerTask,
  getTravelerQuest,
} from "@context/actions/userAction";
import {
  loadTasksData,
  loadMissionsData,
  loadTravelers,
  loadUnreviews,
} from "@context/actions/playgroundAction";
import { useGlobalContext } from "@context/store";

import { Avatar, Alert } from "@components";

// const svg = avatar.toString();
const SidebarItem = ({ to, Icon, name, setToggleMenu, onClick = () => {} }) => {
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
const SidebarMultiLevelMenu = ({ Icon, name, children }) => {
  const [taggle, setTaggle] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setTaggle((t) => !t)}
        onBlur={(e) => {
          e.preventDefault();
          setTimeout(() => setTaggle(false), 180);
        }}
        // style={({ isActive }) =>
        //   isActive ? { background: "#F3F4F6" } : undefined
        // }

        className={`
            group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 `}
      >
        <Icon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900" />
        <span className="ml-3 flex-1 whitespace-nowrap text-left">{name}</span>
        <img
          src={`data:image/svg+xml;charset=utf-8,${ArrowSVG}`}
          className="h-6 w-6"
        />
      </button>
      <ul className={`${taggle ? "" : "hidden"} mt-0 space-y-1 py-1`}>
        {children}
      </ul>
    </>
  );
};

const Playground = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { playground, userInfo } = useGlobalContext();
  const [toggleMenu, setToggleMenu] = useState(false);

  // const provider = useProvider();
  // const { chain, chains } = useNetwork();
  // useEffect(() => {
  //   console.log("provider", provider);
  //   console.log("chain", chain);
  //   console.log("chains", chains);
  // }, [chain, chains, provider]);

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
      getTravelerTask(address, playground.taskId);
      getTravelerQuest(address, playground.missionId);
    }
  }, [playground.taskId, playground.missionId]);
  useEffect(() => {
    if (isDisconnected) {
      signOut();
    }
  }, [isDisconnected]);

  // *
  useContractEvent({
    ...Arm0ryMissions,
    eventName: "TaskUpdated",
    listener(node, label, owner) {
      console.log("TaskUpdated");
      loadTasksData();
    },
    chainId: 5,
  });
  useContractEvent({
    ...Arm0ryMissions,
    eventName: "MissionUpdated",
    listener(node, label, owner) {
      console.log("MissionUpdated");
      loadMissionsData(playground);
    },
    chainId: 5,
  });
  useContractEvent({
    ...Arm0ryQuests,
    eventName: "TaskSubmitted",
    listener(node, label, owner) {
      // console.log(node, label, owner);
      loadUnreviews(playground.travelers, playground.taskId);
    },
    chainId: 5,
  });
  useContractEvent({
    ...Arm0ryQuests,
    eventName: "TaskReviewed",
    listener(node, label, owner) {
      // console.log(node, label, owner);
      loadUnreviews(playground.travelers, playground.taskId);
    },
    chainId: 5,
  });
  // *
  // const { data: blockNumber } = useBlockNumber({
  //   chainId: 5,
  //   watch: true,
  // });
  useEffect(() => {
    loadTasksData();
    loadMissionsData(playground);
    loadTravelers();
  }, []);
  // load Unreviews
  useEffect(() => {
    if (playground.travelers.length > 0 && playground.taskId > 0) {
      loadUnreviews(playground.travelers, playground.taskId);
    }
  }, [playground.travelers, playground.taskId]);

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
                {/* <DynamicWidget buttonClassName="dynamic-connect__button" /> */}
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
            {isConnected ? (
              <SidebarItem
                to="my-quest"
                name="My Quest"
                Icon={QuestIcon}
                setToggleMenu={setToggleMenu}
              />
            ) : (
              <></>
            )}

            <SidebarItem
              to="missions"
              name="Missions"
              Icon={MissionIcon}
              setToggleMenu={setToggleMenu}
            />
            {/* <SidebarItem
              to="tasks"
              name="Tasks"
              Icon={TaskIcon}
              setToggleMenu={setToggleMenu}
            /> */}
            <SidebarItem
              to="review"
              name="Review"
              Icon={BuddiesIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 ">
            <SidebarMultiLevelMenu name="Propose" Icon={ProposeIcon}>
              <SidebarItem
                to="propose-task"
                name="Task"
                Icon={() => <div className="pl-6" />}
                setToggleMenu={setToggleMenu}
              />
              <SidebarItem
                to="propose-mission"
                name="Mission"
                Icon={() => <div className="pl-6" />}
                setToggleMenu={setToggleMenu}
              />
            </SidebarMultiLevelMenu>

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
                <span className="ml-4 font-PasseroOne">Arm0ry DAO</span>
              </div>
            </li>
          </ul>
          {/* {userInfo.isManager ? (
            <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 ">
              <SidebarMultiLevelMenu name="Manager" Icon={ManagerIcon}>
                <SidebarItem
                  to="manager/set-task"
                  name="Set Task"
                  Icon={() => <div className="pl-6" />}
                  setToggleMenu={setToggleMenu}
                />
                <SidebarItem
                  to="manager/set-mission"
                  name="Set Mission"
                  Icon={() => <div className="pl-6" />}
                  setToggleMenu={setToggleMenu}
                />
              </SidebarMultiLevelMenu>
            </ul>
          ) : (
            <></>
          )} */}
          <Avatar
            className="mt-auto mb-3 h-12 w-12  shadow-lg "
            address={address}
          />
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
