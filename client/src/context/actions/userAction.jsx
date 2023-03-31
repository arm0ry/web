import dispatch from "../reducer";
import {
  USER_SIGNIN,
  USER_SIGNOUT,
  MINT_PASS,
  APPROVE,
  START_QUEST,
  userInitialState,
} from "../reducer/userReducer";

import { ethers, BigNumber } from "ethers";
import {
  Arm0ryMissions,
  Arm0ryTravelers,
  Arm0ryQuests,
  zero_address,
} from "@contract";
import { whoOwnsPass, fetchTravelPass, isApproved, isManager, questing } from "@utils/contract";

export const signIn = async ({ address }) => {
  console.log("signIn", address)
  let userState = userInitialState;
  const tokenId = BigNumber.from(address).toBigInt().toString(10);
  const _ownerOf = await whoOwnsPass(tokenId)
  switch (_ownerOf) {
    case Arm0ryQuests.address:
      userState.inQuest = true
      const  _questID= await questing(address)
      userState.questID = _questID
    case address:
      console.log("match", address)
      const _travelerPass = await fetchTravelPass(tokenId)
      userState.travelerPass = _travelerPass
      userState.isMinted = true
      const _isApproved = await isApproved(tokenId)
      if(_isApproved){
        userState.isApproved = true
      }
      userState.isManager = await isManager()
    case zero_address:
      userState.tokenId = tokenId 
      // break;
    default:
      break;
  }
  console.log("userState", userState)
  dispatch.fn({
    type: USER_SIGNIN,
    payload: { ...userState },
  });
};
export const signOut =() =>{
  dispatch.fn({
    type: USER_SIGNOUT,
  });
}
export const mintSuccess = async (tokenId) =>{
  const _travelerPass = await fetchTravelPass(tokenId)
  dispatch.fn({
    type: MINT_PASS,
    payload:{travelerPass:_travelerPass}
  });
}

export const checkApprove =async(tokenId) =>{
  const _isApproved = await isApproved(tokenId)
  if(_isApproved){
    dispatch.fn({
      type: APPROVE,
    });
  }
  
}
export const updateQuestId =async(address) =>{
  const  _questID= await questing(address)
  dispatch.fn({
    type: START_QUEST,
    payload:{questID:_questID}
  });
  
}
