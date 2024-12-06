import { getContract } from "@wagmi/core";
import { ethers } from "ethers";
import { fetchIpfsCID } from "@utils/ipfs";

import {
  Bulletin as _Bulletin,
  Logger as _Logger,
  TokenMinter as _TokenMinter,
  TokenCurve as _TokenCurve,
  TokenUriBuilder as _TokenUriBuilder,
  Coffee as _Coffee,
  Croissant as _Croissant,
  Remix as _Remix,
  BulletinFactory as _BulletinFactory,
  mBulletin as _mBulletin,
  RPC,
} from "@contract";

// Provider & Contract
export const sepolia_provider = new ethers.providers.JsonRpcProvider(RPC.sepolia);
export const chiado_provider = new ethers.providers.JsonRpcProvider(RPC.chiado);

// $LOCAL v0

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

export const Coffee = getContract({
  ..._Coffee,
  signerOrProvider: chiado_provider,
});

export const Croissant = getContract({
  ..._Croissant,
  signerOrProvider: chiado_provider,
});

// $LOCAL vMUTUAL
export const BulletinFactory = getContract({
  ..._BulletinFactory,
  signerOrProvider: chiado_provider,
});

export const mBulletin = getContract({
  ..._mBulletin,
  signerOrProvider: chiado_provider,
});

// REMIX

export const Remix = getContract({
  ..._Remix,
  signerOrProvider: sepolia_provider,
});

