import { getContract } from "@wagmi/core";
import { ethers, BigNumber } from "ethers";

import { fetchIpfsCID } from "@utils/ipfs";
import {
  Mission,
  Quest,
  ImpactCurves,
  Commons_Mission,
  Commons_Quest,
  RPC,
  zero_address,
} from "@contract";

// Provider & Contract
export const sepolia_provider = new ethers.providers.JsonRpcProvider(RPC.sepolia);
export const Mission_contract = getContract({
  ...Mission,
  signerOrProvider: sepolia_provider,
});
export const Quest_contract = getContract({
  ...Quest,
  signerOrProvider: sepolia_provider,
});
export const ImpactCurves_contract = getContract({
  ...ImpactCurves,
  signerOrProvider: sepolia_provider,
});
export const Commons_Mission_contract = getContract({
  ...Commons_Mission,
  signerOrProvider: sepolia_provider,
});
export const Commons_Quest_contract = getContract({
  ...Commons_Quest,
  signerOrProvider: sepolia_provider,
});