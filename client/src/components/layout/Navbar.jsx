import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo, MenuUpIcon, MenuDownIcon } from "@assets";

const NavBarItem = ({ title, to, classprops, ...rest }) => (
  <li {...rest}>
    <Link
      to={to}
      className={`text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:py-auto  md:px-0 ${classprops}`}
    >
      {title}
    </Link>
  </li>
);
const NavbarDropdownItem = ({ title, to, classprops, link }) => (
  <li>
    <Link
      to={to}
      className={`text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 ${classprops}`}
    >
      {title}
    </Link>
  </li>
);

export const NavbarDropdown = ({ title, classprops, children }) => {
  const [taggle, setTaggle] = useState(false);
  return (
    <>
      <li className="relative aligin">
        <button
          onClick={() => setTaggle((t) => !t)}
          onBlur={() => setTaggle((t) => false)}
          className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:py-auto  md:px-0  font-medium flex items-center justify-between w-full md:w-auto"
        >
          {title}
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className={`inline w-4 h-4 mt-1 ml-1  transition-transform duration-200 transform md:-mt-1  ${taggle ? "rotate-180" : "rotate-0"
              }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {taggle && (
          <div className=" block bg-white left-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-auto md:absolute ">
            <ul className="py-1">{children}</ul>
            {/* <div className="py-1">
            </div> */}
          </div>
        )}
      </li>
    </>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-[#FFFCFA] border-b-2 border-gray-600 fixed z-[2147483648] top-0 left-0 w-full flex md:justify-center justify-between items-center p-4 h-auto md:h-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex h-8 md:h-auto ">
          <img src={logo} alt="arm0ry" />
        </Link>
        <button
          type="button"
          onClick={() => setToggleMenu((t) => !t)}
          className="h-8 md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
        >
          <span className="sr-only">Open main menu</span>
          {!toggleMenu ? (
            <MenuDownIcon className="w-6 h-6" />
          ) : (
            <MenuUpIcon className="w-6 h-6" />

          )}
        </button>
        <div
          className={`md:block w-full md:w-auto  my-auto ${!toggleMenu && "hidden"
            }`}
        >
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            {/* <NavBarItem title="OnBoard" to="/onboard" onClick={() => setToggleMenu(false)}/> */}

            <NavBarItem title="$LOCAL | $社群貨幣" disabled />
            <NavBarItem title="65 大松" to="/bulletin" onClick={() => setToggleMenu(false)} />

            {/* <NavbarDropdown title={"$LOCAL | $社區穩定幣"} to="/playground" >
              <NavbarDropdownItem key={0} title={"Prototype"} />
              <NavbarDropdownItem key={1} title={"General Forum on Ethereum Localism | 波特蘭篇"} />
            </NavbarDropdown> */}

            {/* <NavBarItem title="Funding" to="/funding" onClick={() => setToggleMenu(false)}/> */}
            {/* <NavBarItem disable title="Donate ｜ 抖內" to="/donate" onClick={() => setToggleMenu(false)} /> */}
            {/* <li>
                <CustomButton
                  title="connect wallet"
                  handleClick={() => {}}
                  restStyles="rounded-full bg-yellow-200 ml-5 hidden md:block"
                />
              </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
