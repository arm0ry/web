import dispatch from "../reducer";
import {
  USER_LOADING,
  USER_SIGNIN,
  USER_SIGNOUT,
  MINT_PASS,
  APPROVE,
  START_QUEST,
  UPDATE_TRAVELER_TASK,
  userInitialState,
} from "../reducer/userReducer";
import { showModal, cleanModal } from "@context/actions/modalAction";
import { ethers, BigNumber } from "ethers";
import {
  Arm0ryMissions,
  Arm0ryTravelers,
  Arm0ryQuests,
  zero_address,
} from "@contract";
import {
  whoOwnsPass,
  fetchTravelPass,
  isApproved,
  isManager,
  questing,
  travelerTaskState,
  travelerReviewerXP
} from "@utils/contract";

export const signIn = async ({ address,taskId }) => {
  let userState = userInitialState();
  dispatch.fn({
    type: USER_LOADING,
  });
  showModal({
    type: 7,
  });
  const tokenId = BigNumber.from(address).toBigInt().toString(10);
  const _ownerOf = await whoOwnsPass(tokenId);
  switch (_ownerOf) {
    case Arm0ryQuests.address:
      userState.inQuest = true;
      const _questID = await questing(address);
      userState.questID = _questID;
    case address:
      const _travelerPass = await fetchTravelPass(tokenId);
      userState.travelerPass = _travelerPass;
      userState.isMinted = true;
      const _isApproved = await isApproved(tokenId);
      if (_isApproved) {
        userState.isApproved = true;
      }
      userState.isManager = await isManager(address);
      userState.tasks = await travelerTaskState(address, taskId);
      userState.reviewerXP = await travelerReviewerXP(address);
    case zero_address:
      userState.tokenId = tokenId;
    // break;
    default:
      break;
  }

  dispatch.fn({
    type: USER_SIGNIN,
    payload: { ...userState, status: 2 },
  });
  cleanModal();
};
export const signOut = () => {
  dispatch.fn({
    type: USER_SIGNOUT,
  });
};
// export const updateTask = async () =>{
//   await travelerTaskState(address, taskId);

// }
export const mintSuccess = async (tokenId) => {
  const _travelerPass = await fetchTravelPass(tokenId);
  dispatch.fn({
    type: MINT_PASS,
    payload: { travelerPass: _travelerPass },
  });
};

export const checkApprove = async (tokenId) => {
  const _isApproved = await isApproved(tokenId);
  if (_isApproved) {
    dispatch.fn({
      type: APPROVE,
    });
  }
};
export const updateQuestId = async (address) => {
  const _questID = await questing(address);
  dispatch.fn({
    type: START_QUEST,
    payload: { questID: _questID },
  });
};
export const updateTravelerTask = async (taskId) => {
  
  dispatch.fn({
    type: UPDATE_TRAVELER_TASK,
    payload: { taskId },
  });
};
