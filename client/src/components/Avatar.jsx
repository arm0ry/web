import React, { useState, useEffect } from "react";
// import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";
import { createAvatar } from "@dicebear/core";
import { openPeeps, micah, bigSmile } from "@dicebear/collection";
import * as style from "@dicebear/open-peeps";

const Avatar = ({ className }) => {
  const { address } = useAccount();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    createAvatar(bigSmile, {
      seed: address,
      backgroundColor: ["b6e3f4"],
    })
      .toDataUri()
      .then((data) => setAvatar(data));
  }, [address]);
  return (
    <>
      <img
        className={`${className} mb-3 h-12 w-12 rounded-full shadow-lg `}
        src={avatar}
        alt="avatar"
      />
    </>
  );
};

export default Avatar;
