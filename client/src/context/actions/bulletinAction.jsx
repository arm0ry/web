import dispatch from "../reducer";
import { LOAD_ASKS, LOAD_BULLETINS, LOAD_RESOURCES } from "../reducer/bulletinReducer";
import { pushAlert } from "@context/actions/alertAction";
import { BulletinFactory, mBulletin as Bulletin } from "@utils/contract";
import { ethers } from "ethers";
import BULLETIN_ABI from "../../contract/bulletin/Bulletin.json";

export const loadBulletins = async () => {
  try {
    const _bulletinId = await BulletinFactory.bulletinId();
    const bulletinId = parseInt(_bulletinId._hex);
    if (bulletinId <= 0) return;
    let _bulletins = {};

    await Promise.all(
      [...Array(bulletinId)].map(async (_, _id) => {
        const id = _id + 1;
        const bulletin = await BulletinFactory.bulletins(id);
        _bulletins[id] = bulletin
      })
    );
    dispatch.fn({
      type: LOAD_BULLETINS,
      payload: _bulletins,
    });
  } catch (e) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}

export const loadAsks = async () => {
  try {
    const askId = await Bulletin.askId();
    if (askId <= 0) return;

    let _asks = {};
    await Promise.all(
      [...Array(askId)].map(async (_, _id) => {
        const id = _id + 1;
        const ask = await Bulletin.getAsk(id);
        _asks[id] = {
          fulfilled: ask[0],
          owner: ask[1],
          role: ask[2]._hex,
          title: ask[3],
          detail: ask[4],
          currency: ask[5],
          drop: parseInt(ask[6]._hex)
        }
      })
    );
    dispatch.fn({
      type: LOAD_ASKS,
      payload: _asks,
    });

  } catch (e) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}

export const loadResources = async () => {
  try {
    const resourceId = await Bulletin.resourceId();
    if (resourceId <= 0) return;
    let _resources = {};

    await Promise.all(
      [...Array(resourceId)].map(async (_, _id) => {
        const id = _id + 1;
        const resource = await Bulletin.getResource(id);
        _resources[id] = {
          active: resource[0],
          owner: resource[2],
          role: resource[1],
          title: resource[3],
          detail: resource[4]
        }
      })
    );
    dispatch.fn({
      type: LOAD_RESOURCES,
      payload: _resources,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}
