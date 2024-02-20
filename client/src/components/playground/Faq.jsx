import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { useGlobalContext } from "@context/store";


const Faq = () => {
  const params = useParams();
  const missionId = params.missionId;
  const { playground, userInfo } = useGlobalContext();
  const { missions } = playground;
  const { address, isConnected, isDisconnected } = useAccount();
  const navigate = useNavigate();


  return (
    <>

      <div>

        <iframe width="100%" height="1000" src="https://hackmd.io/@audsssy/SktJjLKj6" ></iframe>
      </div>

    </>
  );
};

export default Faq;
