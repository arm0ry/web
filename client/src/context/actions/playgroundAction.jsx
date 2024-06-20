import dispatch from "../reducer";
import {
  LOAD_CID,
  LOAD_CURRENCY,
  LOAD_ITEMS,
  LOAD_LISTS,
  LOAD_LOGGER,
  LOAD_LOGGER_TPS,
  LOAD_TOKEN_CURVE,
  LOAD_TOKENS,
} from "../reducer/playgroundReducer";
import { pushAlert } from "@context/actions/alertAction";
import {
  Bulletin,
  Logger,
  TokenMinter,
  TokenCurve,
  TokenUriBuilder,
  Currency
} from "@utils/contract";
import { ethers } from "ethers";
import { fetchIpfsCID } from "@utils/ipfs";

export const loadItems = async () => {
  try {
    const _itemId = await Bulletin.itemId();
    const itemId = parseInt(_itemId._hex);
    if (itemId <= 0) return;
    let _items = {};

    await Promise.all(
      [...Array(itemId)].map(async (_, _id) => {
        const id = _id + 1;
        const item = await Bulletin.getItem(id);
        // console.log(item)
        _items[id] = item
      })
    );

    dispatch.fn({
      type: LOAD_ITEMS,
      payload: _items,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};

export const loadLists = async () => {
  try {
    const _listId = await Bulletin.listId();
    if (_listId <= 0) return;
    let _lists = {};
    let _list
    await Promise.all(
      [...Array(parseInt(_listId._hex))].map(async (_, _id) => {
        const id = _id + 1;
        const list = await Bulletin.getList(id);

        // loadIPFS(_mission[3], playground);

        let _ids = []
        for (let i = 0; i < list.itemIds.length; i++) {
          _ids.push(parseInt(list.itemIds[i]._hex))
        }

        _list = { title: list.title, owner: list.owner, schema: list.schema, detail: list.detail, itemIds: _ids }

        _lists[id] = _list;
      })
    );

    dispatch.fn({
      type: LOAD_LISTS,
      payload: _lists,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Missions Data Error`, type: "failure" });
  }
};

export const loadLogger = async () => {
  try {
    const _logId = await Logger.logId();
    const logId = parseInt(_logId._hex);
    if (logId <= 0) return;

    let logs = {};
    let loggerTps = []

    await Promise.all(
      [...Array(logId)].map(async (_, _id) => {
        const id = _id + 1;
        const log = await Logger.getLog(id);
        const tps = await Logger.getTouchpointsByLog(id)
        let _tps = []
        logs[id] = { logId: id, user: log.user, bulletin: log.bulletin, listId: parseInt(log.listId._hex), nonce: parseInt(log.nonce._hex), touchpoints: tps };


        for (let i = 0; i < tps.length; i++) {
          _tps[i] = {
            user: log.user,
            pass: tps[i].pass,
            itemId: tps[i].itemId,
            feedback: tps[i].feedback,
            data: tps[i].data
          }
        }

        loggerTps = loggerTps.concat(_tps)
        dispatch.fn({
          type: LOAD_LOGGER_TPS,
          payload: loggerTps,
        });

      })
    );

    dispatch.fn({
      type: LOAD_LOGGER,
      payload: logs,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};

export const loadTokenCurves = async () => {
  try {
    const _curveId = await TokenCurve.curveId()
    const curveId = parseInt(_curveId._hex)

    let curves = {}

    await Promise.all(
      [...Array(curveId)].map(async (_, _id) => {
        // Curve
        const id = _id + 1
        const curve = await TokenCurve.getCurve(id);
        const treasury = await TokenCurve.treasuries(id);
        const collected = await TokenCurve.collected(id);
        const currencyCollected = ethers.utils.formatEther(collected[0]);
        const stablecoinCollected = ethers.utils.formatEther(collected[1]);
        const mintPrice = await TokenCurve.getCurvePrice(true, id, 0);
        const burnPrice = await TokenCurve.getCurvePrice(false, id, 0);

        // Token
        const uri = await TokenMinter.svg(id);
        const _title = await TokenMinter.getTokenTitle(id)
        const title = { name: _title[0], desc: _title[1] }
        const _source = await TokenMinter.getTokenSource(id)
        const source = { bulletin: _source[0], id: parseInt(_source[1]._hex), logger: _source[2] }
        const _market = await TokenMinter.getTokenMarket(id)
        const market = { market: _market[0], limit: parseInt(_market[1]._hex) }
        curves[id] = {
          owner: curve.owner,
          treasury: ethers.utils.formatEther(treasury),
          curveType: curve.curveType,
          currency: curve.currency,
          scale: ethers.utils.formatEther(curve.scale),
          mint_a: curve.mint_a,
          mint_b: curve.mint_b,
          mint_c: curve.mint_c,
          burn_a: curve.burn_a,
          burn_b: curve.burn_b,
          burn_c: curve.burn_c,
          mintPrice: ethers.utils.formatEther(mintPrice),
          burnPrice: ethers.utils.formatEther(burnPrice),
          currencyCollected: currencyCollected,
          stablecoinCollected: stablecoinCollected,
          token: curve.token,
          tokenId: parseInt(curve.id._hex),
          tokenUri: uri,
          tokenTitle: title,
          tokenSource: source,
          tokenMarket: market,
          tokenSupply: parseInt(curve.supply._hex)
        }
      })
    )

    dispatch.fn({
      type: LOAD_TOKEN_CURVE,
      payload: curves
    })
  } catch (err) {
    console.log(err)
  }
}

export const loadCurrency = async () => {
  try {
    const name = await Currency.name()
    const symbol = await Currency.symbol()
    const owner = await Currency.owner();
    const currency = {
      name: name,
      symbol: symbol,
      owner: owner
    }

    dispatch.fn({
      type: LOAD_CURRENCY,
      payload: currency
    })
  } catch (err) {
    console.log(err)
  }
}

export const loadIPFS = async (CID, playground, callback = () => { }) => {
  // Do nothing if the CID is not given
  if (!CID) return;

  // If a cache exists for this url, return it
  if (playground.ipfs[CID]) {
    callback();
    return;
  }

  try {
    const response = await fetchIpfsCID(CID);
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    dispatch.fn({ type: LOAD_CID, payload: { [CID]: response.data } });
    callback();
  } catch (error) {
    console.error(error);
    dispatch.fn({ type: LOAD_CID, payload: { [CID]: response.data } });
  }
};