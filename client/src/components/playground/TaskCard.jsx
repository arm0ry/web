import React from "react";


const TaskCard = () => {
  return (
    <>
      <div className="flex md:flex-row bg-amber-50 rounded-2xl flex-col">
        <div className="w-full grid grid-cols-1 md:grid-cols-[7.3fr_2.3fr] p-6">
          <div className="flex  w-full gap-1 flex-col items-start">
            <h4 className="text-blue text-xl leading-9 font-bold">
              Intro to L2
            </h4>
            <p className="text-black text-base leading-6">27,860 minted</p>
            <p className="text-black text-base leading-6">
              Layer 2s (L2s) allow you to benefit from the security of Ethereum,
              while experiencing faster transactions at a cheaper cost. Complete
              this skill to learn more about how to use L2 solutions like
              Optimism to scale Ethereum’s network.
            </p>
          </div>
          <div className="flex mt-2 md:mt-0 items-start justify-start md:items-end md:justify-end">
            <div className="flex md:p-3 flex-col flex-nowrap">
              <p className="text-black font-bold text-base leading-6">
                  Progress
                </p>
                <button disabled="">
                  <p className="text-blue font-bold text-base leading-6">
                    Not Connected
                  </p>
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
