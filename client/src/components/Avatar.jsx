import React, { useState, useEffect } from "react";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react";

import { createAvatar } from "@dicebear/core";
import { openPeeps, micah, bigSmile } from "@dicebear/collection";
import * as style from "@dicebear/open-peeps";

const Avatar = ({className}) => {
  const { user, walletConnector } = useDynamicContext();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    createAvatar(bigSmile, {
      seed: user?.walletPublicKey,
      backgroundColor: ["b6e3f4"],
    })
      .toDataUri()
      .then((data) => setAvatar(data));
  }, [user, walletConnector]);
  return (
    <>
      <img
        className={`${className} w-12 h-12 mb-3 rounded-full shadow-lg `}
        src={avatar}
        alt="avatar"
      />
    </>
  );
};

export default Avatar;
