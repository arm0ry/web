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
export const goerli_provider = new ethers.providers.JsonRpcProvider(RPC.goerli);
export const Mission_contract = getContract({
  ...Mission,
  signerOrProvider: goerli_provider,
});
export const Quest_contract = getContract({
  ...Quest,
  signerOrProvider: goerli_provider,
});
export const ImpactCurves_contract = getContract({
  ...ImpactCurves,
  signerOrProvider: goerli_provider,
});
export const Commons_Mission_contract = getContract({
  ...Commons_Mission,
  signerOrProvider: goerli_provider,
});
export const Commons_Quest_contract = getContract({
  ...Commons_Quest,
  signerOrProvider: goerli_provider,
});