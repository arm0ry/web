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
    const requestId = await Bulletin.requestId();
    if (requestId <= 0) return;

    let _asks = {};
    await Promise.all(
      [...Array(requestId)].map(async (_, _id) => {
        const id = _id + 1;
        const ask = await Bulletin.getRequest(id);
        _asks[id] = {
          fulfilled: ask[0],
          owner: ask[1],
          title: ask[2],
          detail: ask[3],
          currency: ask[4],
          drop: parseInt(ask[5]._hex),
          trades: []
        }

        const _responseId = await Bulletin.responseIdsPerRequest(id);
        const responseId = parseInt(_responseId._hex);
        if (responseId <= 0) return;
        [...Array(responseId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const trade = await Bulletin.getResponse(id, id_);
          const role = await Bulletin.rolesOf(trade[1]);
          console.log(parseInt(role._hex), trade[1])
          _asks[id].trades.push({
            id: id_,
            role: parseInt(role._hex),
            approved: trade[0],
            proposer: trade[1],
            resource: trade[2],
            currency: trade[3],
            amount: trade[4],
            content: trade[5],
            data: trade[6]
          });

          _asks[id].trades.sort((a, b) => a.id - b.id);

          console.log(_asks , trade);
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
          owner: resource[1],
          title: resource[2],
          detail: resource[3]
        }
      })
    );

    const usageId = await Bulletin.exchangeIdsPerResource(resourceId);
    if (usageId <= 0) return;
    [...Array(usageId)].map(async (_, _id_) => {
      const id_ = _id_ + 1;
      const usage = await Bulletin.getExchange(resourceId, id_);
      _asks[id].trades.push({
        id: id_,
        approved: trade[0],
        proposer: trade[1],
        resource: trade[2],
        currency: trade[3],
        amount: trade[4],
        content: trade[5],
        data: trade[6]
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
