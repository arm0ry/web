import React, { useState, useEffect, useMemo } from "react";
import { Container } from "@chakra-ui/react";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react";
import TaskCard from "./TaskCard";

import { createAvatar } from '@dicebear/core';
import { openPeeps, micah } from '@dicebear/collection';
import * as style from "@dicebear/open-peeps";


// const svg = avatar.toString();

const Playground = () => {
  const { user, handleLogOut, setShowAuthFlow, showAuthFlow, walletConnector } =
    useDynamicContext();
  const [balance, setBalance] = useState(null);
  const [avatar, setAvatar] = useState(null);

  
  
  useEffect(() => {
    if (user && walletConnector) {
      const provider = walletConnector.getWeb3Provider();
      provider.getBalance(user.walletPublicKey).then((balance) => {
        setBalance(balance.toString());
      });
    }
    createAvatar(micah, {
      seed: user?.walletPublicKey,
      backgroundColor: ["b6e3f4"]
    }).toDataUri().then((data)=>setAvatar(data))
  }, [user, walletConnector]);
  return (
    <>
      <div className="container">
        {/* {user && !showAuthFlow ? (
          <div>
            <p>User is logged in</p>
            <p>Address: {user.walletPublicKey}</p>
            <p>Chain: {user.chain}</p>
            <p>Balance: {balance}</p>
            <button type="button" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => setShowAuthFlow(true)}>
              Connect With My Wallet
            </button>
          </div>
        )} */}

        {/* <Web3Button balance="show" icon="show" /> */}
        <div className="flex flex-row justify-between py-5">
          
          <img
            class="w-[3rem] h-[3rem] mb-3 rounded-full shadow-lg"
            src={avatar}
            alt="avatar"
          />
          <DynamicWidget className="self-end"/>
        </div>
        <div className="flex flex-col gap-3">
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </div>
    </>
  );
};

export default Playground;
