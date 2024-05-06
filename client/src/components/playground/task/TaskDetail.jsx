import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { useGlobalContext } from "@context/store";
import { loadIPFS } from "@context/actions/playgroundAction";
import { fetchIpfsCID } from "@utils/ipfs";
import { shortenAddress } from "@utils/shortenAddress";
import { Spinner, Responses } from "@components";
import { showModal, cleanModal } from "@context/actions/modalAction";


const TaskDetail = () => {
  const { setTasks, playground, userInfo } = useGlobalContext();
  const [detail, setDetail] = useState(undefined);
  const [tooltip, setTooltip] = useState(false);
  const params = useParams();
  const location = useLocation()
  const listId = params.listId;
  const itemId = params.itemId;
  const tasks = location.state.tasks;
  const contract = location.state.contract;
  const domain = location.state.domain;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(undefined);
  console.log(tasks, contract, itemId, domain)
  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      if (tasks[itemId] === undefined) {
        return navigate("/playground/tasks");
      } else {
        setDetail(true);
        // loadIPFS(tasks[itemId]?.details, playground, () => {
        //   setDetail(true);
        // });
      }
    }
  }, [tasks]);
  console.log(itemId)
  const clickButton = () => {
    showModal({
      type: 4,
      size: "3xl",
      content: { contract: contract, missionId: listId, itemId: itemId },
    });
  };

  const loaded = () => {
    setLoading(false)
  }

  useEffect(() => {
  }, [loading])

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
            className="button h-10 w-fit cursor-pointer select-none rounded-xl border-b-[1px] border-yellow-200 bg-yellow-200 px-10 transition-all duration-150 [box-shadow:0_6px_0_0_#018edf] hover:-translate-y-1 hover:[box-shadow:0_10px_0_0_#018edf] active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_1px_0_0_#018edf,0_0px_0_0_#1b70f841]  "
          >
            <span className="flex h-full flex-col items-center justify-center font-PasseroOne text-lg font-bold	 tracking-widest text-[#2b328e]">

              {userInfo.tasks[itemId]?.state === -1 ? "Submit" : "分享 | Share"}
            </span>
          </div>
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
            <div className="flex flex-col space-y-4">
              <div className="group flex h-full w-full flex-row items-center justify-between  border-b-2 pt-2 pb-2   leading-none">
                <div className=" ">
                  <p className="text-3xl font-bold  text-slate-800 ">
                    {tasks[itemId]?.title}
                  </p>
                  <div
                    onMouseEnter={() => setTooltip(true)}
                    onMouseLeave={() => setTooltip(false)}
                    className="relative inline-block text-xs text-gray-600"
                  >
                    {shortenAddress(tasks[itemId]?.owner)}
                    <div
                      className={`${tooltip ? "visible opacity-70" : "invisible opacity-0"
                        } tooltip  absolute left-[100%] -top-1 z-10 inline-block rounded-lg bg-gray-200 px-1 py-1 text-xs  font-medium text-black shadow-sm`}
                    >
                      {tasks[itemId]?.owner}
                    </div>
                  </div>
                </div>
              </div>

              <Responses domain={domain} itemId={parseInt(itemId)} />


              <div className="" >
                {(tasks[itemId]?.detail.substring(0, 4) === "http")
                  ? (<iframe width="100%" height="1000" onLoad={loaded} src={tasks[itemId].detail} frameborder="0"></iframe>)
                  : (<div >
                    <span onLoad={loaded}>
                      {tasks[itemId]?.detail}

                    </span>
                  </div>)
                }

                {loading
                  ? (
                    <div className="w-100 flex h-[calc(100vh_-_6rem)] flex-col mt-10 items-center">
                      <Spinner
                        className="h-16 w-16 border-b-4"
                        pathColor="border-gray-500"
                      />
                      <span className="mt-3 text-lg font-medium text-gray-600">
                        Fetching data...
                      </span>
                    </div>)
                  : (<div></div>)}




              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default TaskDetail;
