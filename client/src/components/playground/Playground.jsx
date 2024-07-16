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
  loadItems,
  loadLists,
  loadLogger,
  loadTokenCurves
} from "@context/actions/playgroundAction";
import { useGlobalContext } from "@context/store";
import { Avatar, Alert } from "@components";

// const svg = avatar.toString();
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

  // *
  // useContractEvent({
  //   ...Arm0ryMissions,
  //   eventName: "TaskUpdated",
  //   listener(node, label, owner) {
  //     console.log("TaskUpdated");
  //     loadTasksData();
  //   },
  //   chainId: 5,
  // });
  // useContractEvent({
  //   ...Arm0ryMissions,
  //   eventName: "MissionUpdated",
  //   listener(node, label, owner) {
  //     console.log("MissionUpdated");
  //     loadMissionsData(playground);
  //   },
  //   chainId: 5,
  // });
  // useContractEvent({
  //   ...Arm0ryQuests,
  //   eventName: "TaskSubmitted",
  //   listener(node, label, owner) {
  //     // console.log(node, label, owner);
  //     // loadUnreviews(playground.travelers, playground.taskId);
  //   },
  //   chainId: 5,
  // });
  // useContractEvent({
  //   ...Arm0ryQuests,
  //   eventName: "TaskReviewed",
  //   listener(node, label, owner) {
  //     // console.log(node, label, owner);
  //     // loadUnreviews(playground.travelers, playground.taskId);
  //   },
  //   chainId: 5,
  // });


  useEffect(() => {
    const load = async () => {
      await loadItems();
      await loadLists();
      await loadLogger();
      await loadTokenCurves();
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
                {/* <DynamicWidget buttonClassName="dynamic-connect__button" /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
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
              to="commons-reports" // todo: update to a logger page?
              name="Marketplace"
              Icon={BuddiesIcon}
              setToggleMenu={setToggleMenu}
            />
            <div className="pt-5">
              <label className="ml-2 font-medium">🧑‍🍳 Staff Only</label>
            </div>
            <SidebarItem
              to="propose-item"
              name="Add an Item"
              Icon={ProposeIcon}
              setToggleMenu={setToggleMenu}
            />
            <SidebarItem
              to="propose-list"
              name="Create a List"
              Icon={ProposeIcon}
              setToggleMenu={setToggleMenu}
            />
          </ul>


          {/* <li>
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
          </li> */}
          <Avatar
            className="mt-auto mb-3 h-12 w-12  shadow-lg "
            address={address}
          />
        </div>
      </aside>

      <div className="relative mt-16 p-4 md:ml-72">
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
