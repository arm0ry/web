import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import { useGlobalContext } from "@context/store";
import { fetchIpfsCDI } from "@utils/ipfs";
import { shortenAddress } from "@utils/shortenAddress";
import Spinner from "../Spinner";
import { Money } from "../";
import { ClockIcon } from "@assets";

const TaskDetail = () => {
  const { tasks, tasksDetail, setTasksDetail } = useGlobalContext();
  const [detail, setDetail] = useState(undefined);
  const [tooltip, setTooltip] = useState(false);
  const params = useParams();
  const taskId = params.id - 1;
  //   if (params.id < "") {
  //     return redirect("/tasks");
  //   }
  useEffect(() => {
    const fetchData = async (cdi) => {
      const res = await fetchIpfsCDI(cdi);
      setDetail(res.data.detail);
      setTasksDetail((p) => {
        return { ...p, [params.id]: res.data.detail };
      });
    };
    if (tasks.length > 0) {
      if (tasksDetail[params.id] !== "") {
        setDetail(tasksDetail[params.id]);
      } else {
        fetchData(tasks[taskId].details).catch((err) => console.error(err));
      }
    }
  }, [tasks]);

  return (
    <>
      {/* // TODO expiration xp ,address */}
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
          <div className="p-4">
            <Link
              to="/playground/tasks"
              className="rounded-lg p-2 text-blue-900 hover:bg-blue-100"
            >
              <span className="text-base font-medium">←Go Back</span>
            </Link>
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
                    className={`${
                      tooltip ? "visible opacity-70" : "invisible opacity-0"
                    } tooltip  absolute left-[100%] -top-1 z-10 inline-block rounded-lg bg-gray-200 px-1 py-1 text-xs  font-medium text-black shadow-sm dark:bg-gray-700`}
                  >
                    {tasks[taskId]?.creator}
                  </div>
                </div>
              </div>
              <div className="mt-2 ml-auto flex min-w-[7rem]  items-start justify-end justify-items-end md:mt-0 md:items-end md:justify-end">
                <div className="flex flex-col  flex-nowrap gap-2 md:flex-row md:p-2">
                  <div class="inline-flex w-fit items-center rounded-full bg-[#303481] px-2  py-1 text-sm font-bold text-[#D6E6F2]">
                    <ClockIcon />
                    <span class="ml-1">
                      {parseInt(tasks[taskId]?.expiration / 86400)}
                      {" days"}
                    </span>
                    {/* <span class="ml-1">10{" days"}</span> */}
                  </div>
                  <Money>
                    {tasks[taskId]?.xp}
                    <span className="ml-1 text-sm">AMG</span>
                  </Money>
                </div>
              </div>
            </div>
            <ReactMarkdown className="markdown" remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{detail}</ReactMarkdown>
          </div>
        </>
      )}
    </>
  );
};

export default TaskDetail;
