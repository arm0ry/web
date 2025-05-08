import dispatch from "../reducer";
import { LOAD_CURRENCY, LOAD_ASKS, LOAD_BULLETINS, LOAD_RESOURCES, LOAD_USER } from "../reducer/bulletinReducer";
import { pushAlert } from "@context/actions/alertAction";
import { BulletinFactory, mBulletin as Bulletin, mCurrency as Currency } from "@utils/contract";
import { ethers } from "ethers";

export const loadUser = async (isConnected, address) => {
  address = (address == undefined) ? ethers.constants.AddressZero : address;
  if (!isConnected) return;
  try {
    const credit = await Bulletin.getCredit(address);
    const balance = await Currency.balanceOf(address);
    const user = {
      balance: parseFloat(ethers.utils.formatEther(balance)),
      credit: parseFloat(ethers.utils.formatEther(credit.amount)),
      limit: parseFloat(ethers.utils.formatEther(credit.limit))
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
  let data;
  const abiCoder = ethers.utils.defaultAbiCoder;
  
  try {
    const requestId = await Bulletin.requestId();
    if (requestId <= 0) return;

    let _asks = {};
    await Promise.all(
      [...Array(requestId)].map(async (_, _id) => {
        const id = _id + 1;
        const ask = await Bulletin.getRequest(id);
        if (ask[0] == ethers.constants.AddressZero) return;

        data = abiCoder.decode(["string", "string"], ask[3]);

        _asks[id] = {
          from: ask[0],
          title: data[0],
          detail: data[1],
          currency: ask[1],
          drop: ethers.utils.formatEther(ask[2]),
          trades: []
        }

        const _responseId = await Bulletin.responseIdsPerRequest(id);
        const responseId = parseInt(_responseId._hex);
        // if (responseId <= 0) return;
        [...Array(responseId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const trade = await Bulletin.getTrade(0, id, id_);
          const role = await Bulletin.rolesOf(trade[1]);
          const credit = await Bulletin.getCredit(trade[1])
          
          _asks[id].trades.push({
            id: id_,
            stake: (trade[3] == "0x000000000000000000000000000000000000bEEF") ? true : false,
            role: parseInt(role._hex),
            approved: trade[0],
            proposer: trade[1],
            resource: trade[2],
            currency: trade[3],
            amount: parseFloat(ethers.utils.formatEther(trade[4])),
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
  let data;
  const abiCoder = ethers.utils.defaultAbiCoder;

  try {
    const resourceId = await Bulletin.resourceId();
    if (resourceId <= 0) return;
    let _resources = [];
    await Promise.all(
      [...Array(resourceId)].map(async (_, _id) => {
        const id = _id + 1;
        const resource = await Bulletin.getResource(id);
        try {
          data = (resource[2] != "0x") ? abiCoder.decode(["string", "string"], resource[2]) : ethers.constants.HashZero;
          
        } catch (e) {
          console.log(e)
        }
        _resources[id] = {
          from: resource[0],
          stake: parseFloat(ethers.utils.formatEther(resource[1])),
          title: (data != ethers.constants.HashZero) ? data[0] : "",
          detail: (data != ethers.constants.HashZero) ? data[1] : "",
          exchanges: [],
          collection: 0
        }

        console.log("this is resource - ", resource, "this is data - ", data, "resources[id] - ", _resources[id])


        const _exchangeId = await Bulletin.exchangeIdsPerResource(id);
        const exchangeId = parseInt(_exchangeId._hex);
        // if (exchangeId <= 0) return;
         [...Array(exchangeId)].map(async (_, _id_) => {
          const id_ = _id_ + 1;
          const exchange = await Bulletin.getTrade(1, id, id_);
          const credit = await Bulletin.getCredit(exchange[1]);

          _resources[id].exchanges.push({
            id: id_,
            stake: (exchange[3] == "0x000000000000000000000000000000000000bEEF") ? true : false,
            approved: exchange[0],
            proposer: exchange[1],
            resource: exchange[2],
            currency: exchange[3],
            amount: parseFloat(ethers.utils.formatEther(exchange[4])),
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

        console.log("this is resource - ", _resources)


    dispatch.fn({
      type: LOAD_RESOURCES,
      payload: _resources.filter(item => item.from !== ethers.constants.AddressZero),
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Error loading bulletin factory`, type: "failure" });
  }
}
