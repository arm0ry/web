import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useGlobalContext } from "@context/store";
import MissionDetailTPL from "./MissionDetailTPL";
import { Mission, Quest, Commons_Mission, Commons_Quest } from "@contract";

const MissionDetail = ({ domain }) => {
  const params = useParams();
  const missionId = params.missionId;
  const { playground, userInfo } = useGlobalContext();
  const { missions, commonsMissions, tasks, commonsTasks } = playground;
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (Object.keys(missions).length > 0) {
  //     if (missions[missionId] === undefined) {
  //       return navigate("/playground/missions");
  //     }
  //   }
  // }, [missions]);

  return (
    <>
      <MissionDetailTPL
        domain={domain}
        contract={(domain === "commons") ? Commons_Mission : Mission}
        missionId={missionId}
        missions={(domain === "commons") ? commonsMissions : missions}
        tasks={(domain === "commons") ? commonsTasks : tasks}
      />
    </>
  );
};

export default MissionDetail;
