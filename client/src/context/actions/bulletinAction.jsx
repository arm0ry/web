import dispatch from "../reducer";
import { LOAD_CURRENCY, LOAD_ASKS, LOAD_BULLETINS, LOAD_RESOURCES } from "../reducer/bulletinReducer";
import { pushAlert } from "@context/actions/alertAction";
import { BulletinFactory, mBulletin as Bulletin, mCurrency as Currency } from "@utils/contract";
import { ethers } from "ethers";

export const loadCurrency = async () => {
  try {
    const totalSupply = await Currency.totalSupply();
    const currency = {
      supply: ethers.utils.formatEther(totalSupply._hex)
    }
    dispatch.fn({
      type: LOAD_CURRENCY,
      payload: currency,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}

export const loadBulletins = async () => {
  // try {
  //   const _bulletinId = await BulletinFactory.bulletinId();
  //   const bulletinId = parseInt(_bulletinId._hex);
  //   if (bulletinId <= 0) return;
  //   let _bulletins = {};

  //   await Promise.all(
  //     [...Array(bulletinId)].map(async (_, _id) => {
  //       const id = _id + 1;
  //       const bulletin = await BulletinFactory.bulletins(id);
  //       _bulletins[id] = bulletin
  //     })
  //   );
  //   dispatch.fn({
  //     type: LOAD_BULLETINS,
  //     payload: _bulletins,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  // }
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
        if (ask[0] == ethers.constants.AddressZero) return;
        _asks[id] = {
          owner: ask[0],
          title: ask[1],
          detail: ask[2],
          currency: ask[3],
          drop: ethers.utils.formatEther(ask[4]),
          trades: []
        }

        const _responseId = await Bulletin.responseIdsPerRequest(id);
        const responseId = parseInt(_responseId._hex);
        // if (responseId <= 0) return;
        [...Array(responseId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const trade = await Bulletin.getResponse(id, id_);
          const role = await Bulletin.rolesOf(trade[1]);
          
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
          owner: resource[0],
          title: resource[1],
          detail: resource[2],
          exchanges: [],
          collection: 0
        }

        const _exchangeId = await Bulletin.exchangeIdsPerResource(id);
        const exchangeId = parseInt(_exchangeId._hex);
        console.log(exchangeId);
        // if (exchangeId <= 0) return;
        [...Array(exchangeId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const exchange = await Bulletin.getExchange(id, id_);

          _resources[id].exchanges.push({
            id: id_,
            approved: exchange[0],
            proposer: exchange[1],
            resource: exchange[2],
            currency: exchange[3],
            amount: ethers.utils.formatEther(exchange[4]),
            content: exchange[5],
            data: exchange[6]
          });

          _resources[id].exchanges.sort((a, b) => a.id - b.id);
          _resources[id].collection += (exchange[0]) ? parseFloat(ethers.utils.formatEther(exchange[4])) : 0;
        })
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
