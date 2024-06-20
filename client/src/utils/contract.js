import { getContract } from "@wagmi/core";
import { ethers } from "ethers";
import { fetchIpfsCID } from "@utils/ipfs";

import {
  Bulletin as _Bulletin,
  Logger as _Logger,
  TokenMinter as _TokenMinter,
  TokenCurve as _TokenCurve,
  TokenUriBuilder as _TokenUriBuilder,
  Currency as _Currency,
  RPC,
} from "@contract";

// Provider & Contract
export const sepolia_provider = new ethers.providers.JsonRpcProvider(RPC.sepolia);
export const chiado_provider = new ethers.providers.JsonRpcProvider(RPC.chiado);

export const Bulletin = getContract({
  ..._Bulletin,
  signerOrProvider: chiado_provider,
});

export const Logger = getContract({
  ..._Logger,
  signerOrProvider: chiado_provider,
});

export const TokenMinter = getContract({
  ..._TokenMinter,
  signerOrProvider: chiado_provider,
});

export const TokenCurve = getContract({
  ..._TokenCurve,
  signerOrProvider: chiado_provider,
});

export const TokenUriBuilder = getContract({
  ..._TokenUriBuilder,
  signerOrProvider: chiado_provider,
});

export const Currency = getContract({
  ..._Currency,
  signerOrProvider: chiado_provider,
});

