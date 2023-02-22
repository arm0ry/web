import axios from "axios";

export const convertIpfsHash = (source, gateway = 0) => {
  const gatewayPrefix = [
    "https://content.wrappr.wtf/ipfs/",
    "https://ipfs.filebase.io/ipfs/",
    "https://gateway.pinata.cloud/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.io/ipfs/",
  ];
  // const wrapprGatewayPrefix = "https://content.wrappr.wtf/ipfs/";
  // const filebaseGatewayPrefix = "https://ipfs.filebase.io/ipfs/";
  // const pinataGatewayPrefix = "https://gateway.pinata.cloud/ipfs/";
  // const CloudflareGatewayPrefix = "https://cloudflare-ipfs.com/ipfs/";
  // const ipfsGatewayPrefix = "https://ipfs.io/ipfs/";
  return gatewayPrefix[gateway] + source;
};
export const fetchIpfsCDI = async (source) => {
  // const p0 = axios.get(convertIpfsHash(source, 0));
  // const p1 = axios.get(convertIpfsHash(source, 1));
  // const p2 = axios.get(convertIpfsHash(source, 2));
  // const p3 = axios.get(convertIpfsHash(source, 3));
  // const p4 = axios.get(convertIpfsHash(source, 4));

  return await Promise.any([
    axios.get(convertIpfsHash(source, 0)),
    axios.get(convertIpfsHash(source, 1)),
  ])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);

      return Promise.any([
        axios.get(convertIpfsHash(source, 2)),
        axios.get(convertIpfsHash(source, 3)),
        axios.get(convertIpfsHash(source, 4)),
      ])
        .then((res) => {
          return res;
        })
        .catch((err) => {
          // TODO
          console.error(err);
          throw "";
        });
    });
};

export async function uploadJSON(obj) {
  const body = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: obj?.title,
    },
    pinataContent: { ...obj },
  });
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JSON_JWT}`,
        },
      }
    );
    return res.data.IpfsHash;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const unpinCID = async(cid)=>{
  try {
    const res = await axios.delete(
      `https://api.pinata.cloud/pinning/unpin/${cid}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JSON_JWT}`}
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}