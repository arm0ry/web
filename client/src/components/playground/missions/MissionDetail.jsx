import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useGlobalContext } from "@context/store";
import MissionDetailTPL from "./MissionDetailTPL";
import { Mission, Quest, Bulletin } from "@contract";

const MissionDetail = ({ domain }) => {
  const params = useParams();
  const listId = params.listId;
  const { playground, userInfo } = useGlobalContext();
  const { items, lists, logger } = playground;

  // console.log(items, lists, logger)
  return (
    <>
      <MissionDetailTPL
        domain={domain}
        contract={(domain === "commons") ? Bulletin : Mission}
        listId={listId}
        lists={(domain === "commons") ? lists : lists}
        tasks={(domain === "commons") ? items : items}
      />
    </>
  );
};

export default MissionDetail;
