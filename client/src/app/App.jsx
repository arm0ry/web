import { Navbar, Footer } from "../components/layout";
import { Alert } from "../components";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "@context/store";
import Routers from "./Routers";

import { WagmiConfig } from "wagmi";
// import { client, wagmiClient, ethereumClient } from "@context/connectors";
// import { Web3Modal } from "@web3modal/react";
// import { goerli } from "wagmi/chains";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

const VITE_DYNAMIC = import.meta.env.VITE_DYNAMIC;
const App = () => (
  <BrowserRouter>
    <GlobalContextProvider>
      <DynamicContextProvider
        settings={{
          environmentId: VITE_DYNAMIC,
        }}
      >
        <DynamicWagmiConnector>
          <Routers />
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);

export default App;
