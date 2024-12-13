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
  } catch (error) {
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
          owner: ask[2],
          role: ask[1],
          title: ask[3],
          detail: ask[4],
          currency: ask[5],
          drop: parseInt(ask[6]._hex),
          trades: []
        }

        const _tradeId = await Bulletin.tradeIds(id);
        const tradeId = parseInt(_tradeId._hex);
        if (tradeId <= 0) return;
        [...Array(tradeId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const trade = await Bulletin.getTrade(id, id_);
          _asks[id].trades.push({
            id: id_,
            approved: trade[0],
            role: trade[1],
            proposer: trade[2],
            resource: trade[3],
            feedback: trade[4],
            data: trade[5]
          });

          _asks[id].trades.sort((a, b) => a.id - b.id);
        })
      })
    );
    dispatch.fn({
      type: LOAD_ASKS,
      payload: _asks,
    });

  } catch (error) {
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

    const usageId = await Bulletin.usageIds(id);
    if (usageId <= 0) return;
    [...Array(usageId)].map(async (_, _id_) => {
      const id_ = _id_ + 1;
      const usage = await Bulletin.getUsage(id, id_);
      _asks[id].trades.push({
        ask: usage[0],
        timestamp: usage[1],
        feedback: usage[2],
        data: usage[3]
      });
    })
    
    dispatch.fn({
      type: LOAD_RESOURCES,
      payload: _resources,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}
