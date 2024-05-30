import { Navbar, Footer } from "../components/layout";
import { Alert, Modal } from "../components";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "@context/store";
import Routers from "./Routers";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

const evmNetworks = [
  {
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
    chainId: 11155111,
    chainName: "Ethereum Sepolia",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 11155111,
    rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com", "https://rpc.ankr.com/eth_sepolia"],
    shortName: "eth",
    vanityName: "Sepolia",
  },
  {
    blockExplorerUrls: ["https://gnosis-chiado.blockscout.com/"],
    chainId: 10200,
    chainName: "Gnosis Chiado Testnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/gnosis.svg"],
    nativeCurrency: {
      decimals: 18,
      name: "Chiado xDAI",
      symbol: "XDAI",
    },
    networkId: 10200,
    rpcUrls: ["https://rpc.chiadochain.net"],
    shortName: "chiado",
    vanityName: "Chiado",
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
        <DynamicWagmiConnector evmNetworks={evmNetworks}>
          <Modal />
          <Routers />
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);

export default App;
