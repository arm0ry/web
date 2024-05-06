import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { useGlobalContext } from "@context/store";
import MissionDetailTPL from "../lists/MissionDetailTPL";

const QuestDetail = () => {
  const { playground, userInfo } =
    useGlobalContext();
  const { missions } = playground;
  const { address, isConnected, isDisconnected } = useAccount();
  // const missionId = userInfo.questID;

  const params = useParams();
  const questId = params.questId;
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(missions).length > 0) {
      if (questId === undefined) {
        return navigate("/playground/missions");
      }
    }
  }, [userInfo.questID]);

  return (
    <>
      <MissionDetailTPL missionId={questId} magicButton="" />
    </>
  );
};

export default QuestDetail;
