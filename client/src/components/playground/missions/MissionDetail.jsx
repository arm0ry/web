import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { useGlobalContext } from "@context/store";

import MissionDetailTPL from "./MissionDetailTPL";

const MissionDetail = () => {
  const params = useParams();
  const missionId = params.missionId;
  const { playground, userInfo } = useGlobalContext();
  const { missions } = playground;
  const { address, isConnected, isDisconnected } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(missions).length > 0) {
      if (missions[missionId] === undefined) {
        return navigate("/playground/missions");
      }
    }
  }, [missions]);

  return (
    <>
      <MissionDetailTPL missionId={missionId} magicButton="" / >

    </>
  );
};

export default MissionDetail;
