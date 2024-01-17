import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useGlobalContext } from "@context/store";
import { loadIPFS } from "@context/actions/playgroundAction";
import { fetchIpfsCID } from "@utils/ipfs";
import { shortenAddress } from "@utils/shortenAddress";
import { Spinner } from "@components";
import { Money, Markdown } from "../..";
import { ClockIcon, PassIcon } from "@assets";
import { showModal, cleanModal } from "@context/actions/modalAction";

const TaskDetail = () => {
  const { setTasks, playground, userInfo } = useGlobalContext();
  const { missions } = playground;
  const [detail, setDetail] = useState(undefined);
  const [tooltip, setTooltip] = useState(false);
  const params = useParams();
  const missionId = params.missionId;
  const taskId = params.taskId;
  const { tasks } = playground;
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      if (tasks[taskId] === undefined) {
        return navigate("/playground/tasks");
      } else {
        setDetail(true);
        // loadIPFS(tasks[taskId]?.details, playground, () => {
        //   setDetail(true);
        // });
      }
    }
  }, [tasks]);
  const clickButton = () => {
    showModal({
      type: 4,
      size: "3xl",
      content: { missionId: missionId, taskId: taskId },
    });
  };

  // console.log(tasks[taskId]);
  return (
    <>
      <div className="mx-auto md:max-w-[1024px]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
          >
            <span className="text-base font-medium">←Go Back</span>
          </button>
          <div
            onClick={clickButton}
            className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
          >
            <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">

              {userInfo.tasks[taskId]?.state === -1 ? "Submit" : "Share"}
            </span>
          </div>
          {/* {userInfo?.questID &&
            missions[userInfo?.questID]?.taskIds.includes(Number(taskId)) ? (
            userInfo.tasks[taskId]?.state == 1 ? (
              <PassIcon className="h-12" />
            ) : (
              <div
                onClick={clickButton}
                className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-[#3cb7fe] bg-[#3cb7fe] px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
              >
                <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">

                  {userInfo.tasks[taskId]?.state === -1 ? "Submit" : "Edit"}
                </span>
              </div>
            )
          ) : (
            <></>
          )} */}
        </div>
        {detail === undefined ? (
          <div className="w-100 flex h-[calc(100vh_-_6rem)] flex-col items-center justify-center">
            <Spinner
              className="h-16 w-16 border-b-4"
              pathColor="border-gray-500"
            />
            <span className="mt-3 text-lg font-medium text-gray-600">
              Fetching data from IPFS...
            </span>
          </div>
        ) : (
          <>
            <div className="group flex h-full w-full flex-row items-center justify-between  border-b-2 pt-2 pb-2   leading-none">
              <div className=" ">
                <p className="text-3xl font-bold  text-slate-800 ">
                  {tasks[taskId]?.title}
                </p>
                <div
                  onMouseEnter={() => setTooltip(true)}
                  onMouseLeave={() => setTooltip(false)}
                  className="relative inline-block text-xs text-gray-600"
                >
                  {shortenAddress(tasks[taskId]?.creator)}
                  <div
                    className={`${tooltip ? "visible opacity-70" : "invisible opacity-0"
                      } tooltip  absolute left-[100%] -top-1 z-10 inline-block rounded-lg bg-gray-200 px-1 py-1 text-xs  font-medium text-black shadow-sm`}
                  >
                    {tasks[taskId]?.creator}
                  </div>
                </div>
              </div>
              {/* <div className="mt-2 ml-auto flex min-w-[7rem]  items-start justify-end justify-items-end md:mt-0 md:items-end md:justify-end">
                <div className="flex flex-col  flex-nowrap gap-2 md:flex-row md:p-2">
                  <div className="inline-flex w-fit items-center rounded-full bg-[#303481] px-2  py-1 text-sm font-bold text-[#D6E6F2]">
                    <ClockIcon />
                    <span className="ml-1">
                      {parseInt(tasks[taskId]?.duration / 86400)}
                      {" days"}
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <Markdown>{playground.ipfs[tasks[taskId].details].detail}</Markdown> */}
            <Markdown>{tasks[taskId].content}</Markdown>
          </>
        )}
      </div>
    </>
  );
};

export default TaskDetail;
