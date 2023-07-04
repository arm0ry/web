import dispatch from "../reducer";
import {
  USER_LOADING,
  USER_SIGNIN,
  USER_SIGNOUT,
  GET_TRAVELER_PASS,
  CHECK_APPROVE,
  GET_QUEST_ID,
  UPDATE_TRAVELER_TASK,
  GET_TRAVELER_QUESTS,
  UPDATE_TRAVELER_QUESTS,
  GET_REVIEWER_XP,
  GET_TRAVELER_TASK,
  CHECK_MANAGER,
  userInitialState,
} from "../reducer/userReducer";
import { showModal, cleanModal } from "@context/actions/modalAction";
import { pushAlert } from "@context/actions/alertAction";
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
  getQuest,
  isQuestComeplete,
  travelerTaskState,
  travelerReviewerXP,
} from "@utils/contract";

export const signIn = async ({ address, taskId, missionId }) => {
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
      // userState.inQuest = true;
      // const _questID = await questing(address);
      // userState.questID = _questID;
      await getQuestId(address);
    case address:
      // const _travelerPass = await fetchTravelPass(tokenId);
      // userState.travelerPass = _travelerPass;
      // userState.isMinted = true;
      await getTravelerPass(tokenId);
      // const _isApproved = await isApproved(tokenId);
      // if (_isApproved) {
      //   userState.isApproved = true;
      // }
      await checkApprove(tokenId);
      // userState.isManager = await isManager(address);
      await checkManager(address);
      // userState.tasks = await travelerTaskState(address, taskId);
      await getTravelerTask(address, taskId);
      // userState.reviewerXP = await travelerReviewerXP(address);
      await getReviewerXP(address);
      await getTravelerQuest(address, missionId);
    case zero_address:
    // userState.tokenId = tokenId;
    // break;
    default:
      break;
  }

  dispatch.fn({
    type: USER_SIGNIN,
    payload: { tokenId: tokenId, status: 2 },
  });
  cleanModal();
};
export const signOut = () => {
  dispatch.fn({
    type: USER_SIGNOUT,
  });
};
export const getTravelerPass = async (tokenId) => {
  try {
    const _travelerPass = await fetchTravelPass(tokenId);
    dispatch.fn({
      type: GET_TRAVELER_PASS,
      payload: { travelerPass: _travelerPass },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Getting TravelerPass Error`, type: "failure" });
  }
};

export const checkApprove = async (tokenId) => {
  try {
    const _isApproved = await isApproved(tokenId);
    dispatch.fn({
      type: CHECK_APPROVE,
      payload: { isApproved: _isApproved },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Checking for Approve Error`, type: "failure" });
  }
};
export const checkManager = async (address) => {
  try {
    const _isManager = await isManager(address);
    dispatch.fn({
      type: CHECK_MANAGER,
      payload: { isManager: _isManager },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Checking for Manager Error `, type: "failure" });
  }
};
export const getQuestId = async (address) => {
  try {
    const _questID = await questing(address);
    let _inQuest = false;
    // * *******************
    if (_questID != 0){
      const _isQuestComeplete = await isQuestComeplete(address, _questID)
      if(!_isQuestComeplete){
        _inQuest = true;
        
      }
    }
    console.log("_inQuest", _inQuest)
    dispatch.fn({
      type: GET_QUEST_ID,
      payload: { questID: _questID, inQuest: _inQuest },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading QuestId error`, type: "failure" });
  }
};
export const getReviewerXP = async (address) => {
  try {
    const _reviewerXP = await travelerReviewerXP(address);
    dispatch.fn({
      type: GET_REVIEWER_XP,
      payload: { reviewerXP: _reviewerXP },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Getting reviewerXP error`, type: "failure" });
  }
};
export const getTravelerTask = async (address, taskId) => {
  try {
    const _tasks = await travelerTaskState(address, taskId);
    dispatch.fn({
      type: GET_TRAVELER_TASK,
      payload: { tasks: _tasks },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Getting traveler tasks error`, type: "failure" });
  }
};
export const getTravelerQuest = async (address, missionId) => {
  try {
    if (missionId <= 0) return;

    let _quests = {};

    await Promise.all(
      [...Array(missionId)].map(async (_, _id) => {
        const id = _id + 1;
        const [start, duration, complete, incomplete, progress, xp, claimed] = await getQuest(address, id);
        // TODO: Remove "start > 0" when contract is updated
        if(complete+incomplete > 0 || start > 0){
          _quests[id] = {
            start, duration, complete, incomplete, progress, xp, claimed
          };
        }
      })
    );
    dispatch.fn({
      type: GET_TRAVELER_QUESTS,
      payload: { quests: _quests },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Getting traveler quests error`, type: "failure" });
  }
};
export const updateTravelerQuest = async (address, missionId) => {
  try {
    const [start, duration, complete, incomplete, progress, xp, claimed] = await getQuest(address, missionId);
    dispatch.fn({
      type: UPDATE_TRAVELER_QUESTS,
      payload: {missionId,  quest: {start, duration, complete, incomplete, progress, xp, claimed} },
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Getting traveler quests error`, type: "failure" });
  }
};
export const updateTravelerTask = async (taskId) => {
  dispatch.fn({
    type: UPDATE_TRAVELER_TASK,
    payload: { taskId },
  });
};
