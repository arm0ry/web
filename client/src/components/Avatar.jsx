import React, { useState, useEffect } from "react";
// import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useDynamicContext, DynamicWidget, shortenWalletAddress } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";
import { createAvatar } from "@dicebear/core";
import { openPeeps, micah, bigSmile } from "@dicebear/collection";
import * as style from "@dicebear/open-peeps";

const Avatar = ({ className, address, color}) => {
  // const { address } = useAccount();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    createAvatar(bigSmile, {
      seed: address,
      backgroundColor: [color ?? "b6e3f4"],
    })
      .toDataUri()
      .then((data) => setAvatar(data));
  }, [address]);
  return (
    <>
      <img
        className={`${className} rounded-full `}
        src={avatar}
        alt="avatar"
        title={shortenWalletAddress(address)}
      />
    </>
  );
};

export default Avatar;
