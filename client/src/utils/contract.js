import { getContract } from "@wagmi/core";
import { ethers, BigNumber } from "ethers";

import { fetchIpfsCID } from "@utils/ipfs";
import {
  Mission,
  Quest,
  ImpactCurves,
  Bulletin,
  Logger,
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
export const Bulletin_contract = getContract({
  ...Bulletin,
  signerOrProvider: sepolia_provider,
});
export const Logger_contract = getContract({
  ...Logger,
  signerOrProvider: sepolia_provider,
});