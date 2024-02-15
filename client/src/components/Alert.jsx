import React from "react";
import { useGlobalContext } from "@context/store";
import { eraseAlert } from "@context/actions/alertAction";

const style = {
  info: "text-blue-700 bg-blue-100",
  success: "text-green-700 bg-green-100",
  failure: "text-red-700 bg-red-100  ",
};
const hoverStyle = {
  info: " hover:bg-blue-200",
  success: "hover:bg-green-200",
  failure: "hover:bg-red-200",
};

const Alert = () => {
  const { alerts } = useGlobalContext();

  return (
    <div className="absolute z-[101] top-10 left-0 right-0 flex flex-col items-center ">
      <div className="fixed flex flex-col items-center w-8/12  md:w-1/2  gap-3 ">

        {alerts.msg.map((m, i) => {
          return (
            <div
              className={`flex  p-4 opacity-90 w-full  transition-2 shadow-xl rounded-lg text-md ${style[m?.type]
                }`}
              role="alert"
              key={i}
            >
              <svg
                aria-hidden="true"
                className={`flex-shrink-0  w-6 h-6 mr-1 ${style[m?.type]}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {/* <div className="ml-3 text-sm font-medium">{m?.msg}{" "}</div> */}
              <div className="ml-1 text-sm font-medium max-w-[calc(100%_-_4.4rem)]">
                <p className="break-words">{m?.msg}</p>
              </div>

              {/* </div> */}
              <button
                type="button"
                className={` p-1.5 ${style[m?.type]} ${hoverStyle[m?.type]} ml-auto -mx-1.5 -my-1.5 rounded-lg  inline-flex h-8 w-8`}
                onClick={() => eraseAlert({ uid: m?.uid })}
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
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
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alert;
