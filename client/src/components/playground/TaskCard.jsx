import React, {useEffect, useState} from "react";

import { useContractRead } from 'wagmi'
import { ADDRESS, ABI } from "../../contract";

const TaskCard = ({taskId}) => {
  const [details, setDetails] = useState({})
  const { data: tasksdata, isLoading, isFetched } = useContractRead({
    address: ADDRESS,
    abi: ABI,
    functionName: 'tasks',
    args:[taskId]
  })
  // const details = JSON.parse(tasksdata); 
  useEffect(() => {
    if( isFetched){
      setDetails(JSON.parse(tasksdata.details))
    }
  }, [tasksdata])
  
  // const tasksdata = JSON.stringify(tasksdata)
  // 
  // console.log({tasksdata:tasksdata[1]})
  return (
    <>
      <div className="flex md:flex-row bg-amber-50 rounded-2xl flex-col">
        <div className="w-full grid grid-cols-1 md:grid-cols-[7.3fr_2.3fr] p-6">
          <div className="flex  w-full gap-1 flex-col items-start">
            <h4 className="text-blue text-xl leading-9 font-bold">
            {details?.title}
            </h4>
            <p className="text-black text-base leading-6">{tasksdata?.xp} points</p>
            <p className="text-black text-base leading-6">
              {details?.detail}
            </p>
          </div>
          <div className="flex mt-2 md:mt-0 items-start justify-start md:items-end md:justify-end">
            <div className="flex md:p-3 flex-col flex-nowrap">
              <p className="text-black font-bold text-base leading-6">
                Expiration
                </p>
                <button disabled="">
                  <p className="text-blue font-bold text-base leading-6">
                    {tasksdata.expiration}
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
