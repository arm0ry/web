import React, { PureComponent } from "react";
import { ImpactCurves } from "../../../contract";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// TODO: Can use when we have more supporter info
const SupporterCard = () => {
  const { address: user } = useAccount();


  return (
    <>
      <div className={`h-40 group relative w-full overflow-hidden`}>
        <div className="absolute -inset-1 ml-2 mt-2 h-full w- rounded-lg bg-gradient-to-r from-[#00C3FF]  via-[#fcfcc2] to-[#fffc00] opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      </div>
    </>
  );
};

export default SupporterCard;
