import dispatch from "../reducer";
import { LOAD_CURRENCY, LOAD_ASKS, LOAD_BULLETINS, LOAD_RESOURCES, LOAD_USER } from "../reducer/bulletinReducer";
import { pushAlert } from "@context/actions/alertAction";
import { BulletinFactory, mBulletin as Bulletin, mCurrency as Currency } from "@utils/contract";
import { ethers } from "ethers";

export const loadUser = async (isConnected, address) => {
  if (!isConnected) return;
  try {
    const credit = await Bulletin.getCredit(address);
    const balance = await Currency.balanceOf(address);

    const user = {
      balance: ethers.utils.formatEther(balance),
      credit: ethers.utils.formatEther(credit.amount),
      limit: ethers.utils.formatEther(credit.limit)
    }
    dispatch.fn({
      type: LOAD_USER,
      payload: user,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}

export const loadCurrency = async () => {
  try {
    const totalSupply = await Currency.totalSupply();
    const name = await Currency.name();
    const symbol = await Currency.symbol();
    const currency = {
      supply: ethers.utils.formatEther(totalSupply._hex),
      name: name, 
      symbol: symbol
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
          const trade = await Bulletin.getTrade(true, id, id_);
          const role = await Bulletin.rolesOf(trade[1]);
          const credit = await Bulletin.getCredit(trade[1])
          
          _asks[id].trades.push({
            id: id_,
            role: parseInt(role._hex),
            approved: trade[0],
            proposer: trade[1],
            resource: trade[2],
            currency: trade[3],
            amount: trade[4],
            content: trade[5],
            data: trade[6],
            credit_limit: ethers.utils.formatEther(credit[0]),
            credit_amount: ethers.utils.formatEther(credit[1])
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
          beneficiary: resource[1],
          title: resource[2],
          detail: resource[3],
          exchanges: [],
          collection: 0
        }

        const _exchangeId = await Bulletin.exchangeIdsPerResource(id);
        const exchangeId = parseInt(_exchangeId._hex);
        // if (exchangeId <= 0) return;
        [...Array(exchangeId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const exchange = await Bulletin.getTrade(false ,id, id_);
          const credit = await Bulletin.getCredit(exchange[1])

          _resources[id].exchanges.push({
            id: id_,
            approved: exchange[0],
            proposer: exchange[1],
            resource: exchange[2],
            currency: exchange[3],
            amount: ethers.utils.formatEther(exchange[4]),
            content: exchange[5],
            data: exchange[6],
            credit_limit: ethers.utils.formatEther(credit[0]),
            credit_amount: ethers.utils.formatEther(credit[1])
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
