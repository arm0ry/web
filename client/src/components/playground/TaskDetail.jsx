import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useGlobalContext } from "@context/store";
import { fetchIpfsCDI } from "@utils/ipfs";
import Spinner from "../Spinner";

const TaskDetail = () => {
  const { tasks, tasksDetail, setTasksDetail } = useGlobalContext();
  const [detail, setDetail] = useState(undefined);
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
        fetchData(tasks[taskId].details).catch((err) =>
          console.error(err)
        );
      }
    }
  }, [tasks]);

  return (
    <>
      {/* // TODO expiration xp ,address */}
      {detail === undefined ? (
        <div className="flex flex-col items-center justify-center w-100 h-[calc(100vh_-_6rem)]">
          <Spinner className="h-16 w-16 border-b-4" pathColor="border-gray-500" />
          <span className="mt-3 text-lg font-medium text-gray-600">Fetching data from IPFS...</span>
        </div>
      ) : (
        <ReactMarkdown className="markdown">{detail}</ReactMarkdown>
      )}
    </>
  );
};

export default TaskDetail;
