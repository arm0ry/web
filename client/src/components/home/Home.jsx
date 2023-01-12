import React from "react";
import bgHome from "../../assets/bg-home.svg";
import dancing from "../../assets/dancing.png";
import style from "../../styles";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative max-h-[100vh] overflow-hidden flex justify-center content-center lg:h-[90vh]">
        <div className="container w-full h-full mx-auto z-[1]  ">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2  mt-10 ">
            <div className="flex flex-wrap justify-center content-center mx-10 my-auto min-h-[35vh] col-span-2 md:col-span-1 md:mx-3 order-1  md:order-1">
              <div>
                <p className="text-3xl font-bold">
                  <span className="font-PasseroOne">arm0ry</span>
                  是一個 Web3 實驗廣場
                </p>
                <ul className="list-disc text-l font-bold">
                  <li>提供 Web3 資源，介紹 Web3 工具，帶你深入認識 Web3</li>
                  <li>開發 Web3 工具，提倡實作 Web3 題目，elevate g0v</li>
                  <li>培育 Web3 人才，提供小額資源補助，supercharge g0v</li>
                </ul>
                <div class="flex justify-center md:justify-start ">
                  <div>
                    <button
                      type="button"
                      className={`${style.btn} text-l mr-2 mb-2 mt-3`}
                      onClick={() => {
                        navigate("/onboard");
                      }}
                    >
                      Join Us
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center justify-center  my-auto col-span-2 md:col-span-1 order-2 md:order-2">
              <img
                alt="dancing"
                src={dancing}
                className="inline-block max-h-[50vw]"
              />
            </div>
          </div>
        </div>
        <div>
          <img
            src={bgHome}
            alt="logo"
            className="absolute bottom-[0vh] -left-5 -ml-4  min-w-[120vw] md:bottom-[1vh] xl:bottom-[1vh] md:min-w-[115vw] md:-left-9 2xl:bottom-[-3vh]"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
