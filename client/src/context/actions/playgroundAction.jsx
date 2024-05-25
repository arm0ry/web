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
  Currency
} from "@utils/contract";
import { Bulletin as ActiveBulletin } from "@contract";
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
        const tps = await Logger.getLogTouchpoints(id)
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

// TODO
export const loadTokens = async () => {
  try {
    const _tokenId = await TokenMinter.tokenId()
    const tokenId = parseInt(_tokenId._hex)

    let tokens = {}

    await Promise.all(
      [...Array(tokenId)].map(async (_, _id) => {
        const id = _id + 1
        const owner = await TokenMinter.ownerOf(id)
        const metadata = await TokenMinter.metadatas(id)
        const builder = await TokenMinter.builders(id)
        const market = await TokenMinter.markets(id)
        const uri = await TokenMinter.uri(id)

        tokens[id] = {
          id: id,
          owner: owner,
          uri: uri,
          metadata: metadata,
          builder: builder,
          market: market
        }
      })
    )

    dispatch.fn({
      type: LOAD_TOKENS,
      payload: tokens
    })
  } catch (err) {
    console.log(err)
  }
}

export const loadTokenCurves = async () => {
  try {
    const _curveId = await TokenCurve.curveId()
    const curveId = parseInt(_curveId._hex)

    let curves = {}

    await Promise.all(
      [...Array(curveId)].map(async (_, _id) => {
        const id = _id + 1
        const owner = await TokenMinter.ownerOf(id)
        const metadata = await TokenMinter.metadatas(id)
        const builder = await TokenMinter.builders(id)
        const market = await TokenMinter.markets(id)
        const uri = await TokenMinter.uri(id)

        curves[id] = {
          id: id,
          owner: owner,
          uri: uri,
          metadata: metadata,
          builder: builder,
          market: market
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