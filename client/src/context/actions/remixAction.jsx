import dispatch from "../reducer";
import { LOAD_ITEMS } from "../reducer/playgroundReducer";
import { pushAlert } from "@context/actions/alertAction";
import { Bulletin, Remix } from "@utils/contract";
import { ethers } from "ethers";
import { fetchIpfsCID } from "@utils/ipfs";
import CURRENCY_ABI from "../../contract/Currency.json";
import { useAccount } from "wagmi";

export const loadRemix = async () => {
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
