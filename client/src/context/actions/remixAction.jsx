import dispatch from "../reducer";
import { GET_REMIX  } from "../reducer/remixReducer";
import { pushAlert } from "@context/actions/alertAction";
import { Remix } from "@utils/contract";

export const loadRemix = async () => {
  try {
    const _layerId = await Remix.layerId();
    const layerId = parseInt(_layerId._hex);

    const _royalties = await Remix.ROYALTIES();
    const royalties = parseInt(_royalties._hex);
    const rootLayer = await Remix.getLayer(0);
    const rootLayerUri = await Remix.tokenURI(0);
    const _rootLayerPrice = await Remix.calculatePrice(0);
    const rootLayerPrice = parseInt(_rootLayerPrice._hex) / 10**18;
    
    let _layers = {};
    
    await Promise.all(
      [...Array(layerId)].map(async (_, _id) => {
        const id = _id + 1;
        const layer = await Remix.getLayer(id);
        const tokenURI = await Remix.tokenURI(id);
        
        _layers[id] = {
          mixer: layer[0],
          name: layer[1],
          symbol: layer[2],
          uri: tokenURI
        }
      })
    );

    let remix = {
      count: layerId,
      royalties: royalties,
      rootLayer: rootLayer,
      rootLayerUri: rootLayerUri,
      rootLayerPrice: rootLayerPrice,
      layers: _layers,
    };
    
    dispatch.fn({
      type: GET_REMIX,
      payload: remix,
    });
  } catch (error) {
    console.error(error);
    pushAlert({ msg: `Loading Tasks Data Error`, type: "failure" });
  }
};
