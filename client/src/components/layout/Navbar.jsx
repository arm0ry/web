import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CustomButton } from "../.";
import logo from "../../assets/logo.svg";
import { useGlobalContext } from "../../context/store";
// const NavBarItem = ({ title, classprops }) => (
//   <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
// );
const NavBarItem = ({ title, to, classprops }) => (
  <li>
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
            className={`inline w-4 h-4 mt-1 ml-1  transition-transform duration-200 transform md:-mt-1  ${
              taggle ? "rotate-180" : "rotate-0"
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
    <nav className="bg-[#FFFCFA] border-b-2 border-gray-600 fixed z-20 top-0 left-0 w-full flex md:justify-center justify-between items-center p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="107"
            height="29"
            fill="none"
            viewBox="0 0 107 29"
          >
            <g filter="url(#a)">
              <path
                stroke="#FFBE0B"
                stroke-linecap="round"
                stroke-width="2"
                d="M2.5 26.5c19.167-9 79.6-25.1 102-21.5"
              />
            </g>
            <path
              fill="#000"
              d="M14.523 18.121h-.773c-.438 0-1.129-.09-2.074-.27l-.89 4.337-2.79-.622 1.371-6.093 1.594-7.97a61.54 61.54 0 0 1 5.59-.714l1.851 8.04 1.43 7.054-2.848.457-1.254-6.914-1.218-5.836c-.446 0-.91.074-1.395.223L12.11 15.59l3.024.07-.363 2.45a2.725 2.725 0 0 1-.247.011Zm7.653-5.215-.024-2.168 2.496-.258.41 1.782 1.794-1.969h1.394l.586 2.742-1.84.399c-.586.125-1.191.261-1.816.41l-.164 8.015-2.649.235-.187-9.188Zm8.226-2.11 2.496-.316.41 1.782 2.063-1.782h2.32c.274 0 .559.153.856.457.453.446.707.876.762 1.29l2.015-1.747h2.824c.102 0 .29.106.563.317.281.21.473.387.574.527.11.14.164.301.164.48l-.41 10.22-2.613.21-.047-8.988c-.094-.031-.27-.047-.527-.047-.61 0-1.145.086-1.606.258l-.82.305-.364 8.261-2.519.211-.047-8.988c-.094-.031-.27-.047-.527-.047-.657 0-1.215.086-1.676.258l-.797.281-.316 8.192-2.567.164-.21-11.297Zm27.235 3.306a15.686 15.686 0 0 1-.059 2.473c-.047.57-.11 1.116-.187 1.64-.141 1.031-.278 1.754-.41 2.168a41.3 41.3 0 0 0-.247.832c-.03.14-.074.27-.129.387-.124.273-.292.445-.503.515-.204.07-.457.121-.762.152-.297.032-.598.051-.903.06-.515.023-.937.034-1.265.034-1.906 0-3.055-.222-3.445-.668-.407-.453-.735-2.023-.985-4.71-.086-.922-.129-1.594-.129-2.016 0-.43.004-.766.012-1.008.008-.25.023-.488.047-.715.07-.836.14-1.363.21-1.582.079-.219.161-.379.247-.48.18-.211.488-.368.926-.47a32.917 32.917 0 0 1 7.148-.76l.305.01a.344.344 0 0 0 .082.013l.21 2.707a6.141 6.141 0 0 0-.503-.024h-.55c-1.47 0-2.634.07-3.493.211-.86.133-1.367.223-1.523.27-.11.804-.165 1.84-.165 3.105 0 1.258.145 2.465.434 3.621h2.273c.25-1.172.426-2.734.528-4.687l.035-.692 2.8-.386Zm3.562-1.196-.023-2.168 2.496-.258.41 1.782 1.793-1.969h1.394l.587 2.742-1.84.399a77.98 77.98 0 0 0-1.817.41l-.164 8.015-2.648.235-.188-9.188Zm8.051-2.402 2.777-.574.223 9.457c.328.11.582.164.762.164h.469c.132-.008.285-.028.457-.059A5.34 5.34 0 0 0 75.297 19l.094-8.379 2.66-.328.14 13.184c0 .398-.254.777-.761 1.136-1.297.899-2.25 1.54-2.86 1.922l-1.687 1.043c-.531.305-1.051.59-1.559.856l-1.43-2.567c2.813-1.312 4.735-2.281 5.766-2.906l-.176-2.883L73.738 22h-3c-.234-.023-.472-.137-.715-.34-.375-.305-.562-.633-.562-.984l-.211-10.172Z"
            />
            <defs>
              <filter
                id="a"
                width="106"
                height="26.017"
                x=".5"
                y="2.484"
                color-interpolation-filters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_18_737"
                  stdDeviation=".5"
                />
              </filter>
            </defs>
          </svg>

          {/* <svg className="h-10 mr-3" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z" fill="#76A9FA"></path><path d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z" fill="#A4CAFE"></path><path d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z" fill="#1C64F2"></path></g><defs><clipPath id="clip0"><rect width="51" height="70" fill="white"></rect></clipPath></defs></svg>
          <span className="self-center text-lg font-semibold whitespace-nowrap">Arm0ry</span> */}
        </Link>
        <button
          type="button"
          onClick={() => setToggleMenu((t) => !t)}
          className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
        >
          <span className="sr-only">Open main menu</span>
          {!toggleMenu ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
        <div
          className={`md:block w-full md:w-auto  my-auto ${
            !toggleMenu && "hidden"
          }`}
        >
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <NavBarItem title="OnBoard" to="/onboard" />

            <NavBarItem title="Playground" to="/playground" />
            {/* <NavbarDropdown title={"Playground"} to="/playground" >
              <NavbarDropdownItem key={0} title={"Basics"} />
              <NavbarDropdownItem key={1} title={"Advance"} />
            </NavbarDropdown> */}

            <NavBarItem title="Funding" to="/funding" />
            <NavBarItem title="Donate" to="/funding" />
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
