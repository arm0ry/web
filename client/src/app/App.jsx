import { Navbar, Footer } from "../components/layout";
import { Alert, Modal } from "../components";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "@context/store";
import Routers from "./Routers";

// import { WagmiConfig, createClient, configureChains, mainnet,goerli } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public';
// import { client, wagmiClient, ethereumClient } from "@context/connectors";
// import { Web3Modal } from "@web3modal/react";
// import {mainnet, goerli } from "wagmi/chains";
// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet, goerli],
//   [publicProvider()],
// )
// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// })

import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
const evmNetworks = [
  {
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
    chainId: 5,
    chainName: "Ethereum Goerli",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 5,
    rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
    shortName: "eth",
    vanityName: "Goerli",
  },
];
const VITE_DYNAMIC = import.meta.env.VITE_DYNAMIC;
const overrides = `

.wallet-list-item__tile:hover > img {
  animation: rotate 1s forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.connectButton {
  background-color: rgb(253 224 71);
  padding: 0.5rem 1.3rem ;
  border-color: rgb(248, 215, 48);
  color: #000000;
  z-index: 10;
  width: fit-content;
}
.connectButton:hover {
  background-color: rgb(255, 214, 9);
}
.dynamic-widget-inline-controls {
  --dynamic-base-1: #FFF0C8;
  --dynamic-base-4: #fae6ac;
  --dynamic-hover:#fae6ac;
  --dynamic-footer-background-color: #4779ff;
}
`;
const App = () => (
  <BrowserRouter>
    <GlobalContextProvider>
      <DynamicContextProvider
        theme="light"
        settings={{
          appName: "Arm0ry",
          environmentId: VITE_DYNAMIC,
          evmNetworks,
          cssOverrides: overrides,
        }}
      >
      {/* evmNetworks={evmNetworks} */}
        <DynamicWagmiConnector  >
          <Modal/>
          <Routers />
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);

export default App;
