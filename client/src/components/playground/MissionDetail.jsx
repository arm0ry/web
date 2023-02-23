import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

import { useGlobalContext } from "@context/store";
import TaskCard from "./TaskCard";
import { Arm0ryQuests } from "../../contract";
import { pushAlert } from "@context/actions/alertAction";

const MissionDetail = () => {
  const { missions } = useGlobalContext();
  const params = useParams();
  const missionId = params.id;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(missions);
    if (Object.keys(missions).length > 0) {
      if (missions[missionId] === undefined) {
        return navigate("/playground/missions");
      }
    }
  }, [missions]);
  const startQuest = async () => {
    console.log("startQuest")
    // write();
    // try {
    //   // setWriteState(1);
    //   const { hash } = await writeContract({
    //     mode: "recklesslyUnprepared",
    //     ...Arm0ryQuests,
    //     functionName: "startQuest",
    //     args: [parseInt(missionId, 10)],
    //   });
    //   pushAlert({ msg:<span> 區塊驗證中...<a
    //     href={`https://goerli.etherscan.io/tx/${hash}`}
    //     target="_blank"
    //     rel="noreferrer"
    //   >
    //     View on Etherscan
    //   </a></span>, type: "info" });

    //   // setWriteState(2);
      
    //   await waitForTransaction({
    //     hash,
    //   });


    //   pushAlert({ msg: "Success!", type: "success" });
    // } catch (error) {
    //   pushAlert({ msg: `Error! ${error}`, type: "failure" });
    // } finally {
    //   // setWriteState(0);
    // }
  };

  return (
    <>
      <div className="mx-auto max-w-[1024px]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
          >
            <span className="text-base font-medium">←Go Back</span>
          </button>
          <div onClick={startQuest} className="button h-10 w-36 cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  ">
            <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">
              Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-6">
          {missions[missionId]?.taskIds.map((id, i) => {
            if (i % 2 === 0) {
              return (
                <>
                  <TaskCard
                    key={id}
                    taskId={id}
                    className={"md:col-span-3 md:col-start-2"}
                  />
                </>
              );
            } else {
              return (
                <>
                  <TaskCard
                    key={id}
                    taskId={id}
                    className={"md:col-span-3 md:col-start-3"}
                  />
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MissionDetail;
