import dispatch from "../reducer";
import {
  LOAD_CID,
  LOAD_ITEMS,
  LOAD_LISTS,
  LOAD_LOGGER,
  LOAD_LOGGER_TPS,
} from "../reducer/playgroundReducer";
import { ethers } from "ethers";
import { pushAlert } from "@context/actions/alertAction";
import {
  Bulletin_contract,
  Logger_contract,
  ImpactCurves_contract,
} from "@utils/contract";
import { fetchIpfsCID } from "@utils/ipfs";

export const loadItems = async () => {
  try {
    const _itemId = await Bulletin_contract.itemId();
    const itemId = parseInt(_itemId._hex);
    if (itemId <= 0) return;
    let _items = {};

    await Promise.all(
      [...Array(itemId)].map(async (_, _id) => {
        const id = _id + 1;
        const item = await Bulletin_contract.getItem(id);
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
    const _listId = await Bulletin_contract.listId();
    if (_listId <= 0) return;
    let _lists = {};
    let _list
    await Promise.all(
      [...Array(parseInt(_listId._hex))].map(async (_, _id) => {
        const id = _id + 1;
        const list = await Bulletin_contract.getList(id);

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
    const _logId = await Logger_contract.logId();
    const logId = parseInt(_logId._hex);
    if (logId <= 0) return;

    let logs = {};
    let loggerTps = []

    await Promise.all(
      [...Array(logId)].map(async (_, _id) => {
        const id = _id + 1;
        const log = await Logger_contract.getLog(id);
        const tps = await Logger_contract.getLogTouchpoints(id)
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
        console.log(_tps)

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