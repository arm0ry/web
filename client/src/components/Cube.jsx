import React from "react";
import "../styles/cube.css"

const style = {
  size:"5rem",
  size_m:"1.25rem"

}
const Cube = ({size}) => {
  return (
    <>
    <div className={`scene w-[8rem] h-[8rem] flex items-center justify-center`}>
        <div className="cube w-1/2 h-1/2 relative ">
          {/* <div className={`cube__face cube__face--front box-border absolute w-full h-full border-2 border-gray-400 [transform:rotateY(0deg)_translateZ(2rem)]`}></div>
          <div className={`cube__face cube__face--back box-border absolute w-full h-full border-2 border-gray-400 [transform:rotateY(180deg)_translateZ(2rem)]`}></div>
          <div className={`cube__face cube__face--right box-border absolute w-full h-full border-2 border-gray-400 [transform:rotateY(90deg)_translateZ(2rem)]`}></div>
          <div className={`cube__face cube__face--left box-border absolute w-full h-full border-2 border-gray-400 [transform:rotateY(-90deg)_translateZ(2rem)]`}></div>
          <div className={`cube__face cube__face--top box-border absolute w-full h-full border-2 border-gray-400 [transform:rotateX(90deg)_translateZ(2rem)]`}></div>
          <div className={`cube__face cube__face--bottom box-border absolute w-full h-full border-2 border-gray-400 [transform:rotateX(-90deg)_translateZ(2rem)]`}></div> */}
          <div className={`cube__face cube__face--front box-border absolute w-full h-full border-2 border-gray-400 `}></div>
          <div className={`cube__face cube__face--back box-border absolute w-full h-full border-2 border-gray-400 `}></div>
          <div className={`cube__face cube__face--right box-border absolute w-full h-full border-2 border-gray-400 `}></div>
          <div className={`cube__face cube__face--left box-border absolute w-full h-full border-2 border-gray-400 `}></div>
          <div className={`cube__face cube__face--top box-border absolute w-full h-full border-2 border-gray-400 `}></div>
          <div className={`cube__face cube__face--bottom box-border absolute w-full h-full border-2 border-gray-400 `}></div>
        </div></div>
    </>
  );
};

export default Cube;
