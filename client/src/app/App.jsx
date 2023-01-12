import { Navbar, Footer } from "../components/layout";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "../context/store";
import Routers from "./Routers";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
const theme = extendTheme({ breakpoints })


import { WagmiConfig } from "wagmi";
import { client, wagmiClient, ethereumClient } from "../context/connectors";
import { Web3Modal } from "@web3modal/react";
import { goerli } from "wagmi/chains";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

const VITE_DYNAMIC = import.meta.env.VITE_DYNAMIC
const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        {/* <WagmiConfig client={wagmiClient}> */}
        {/* {console.log("VITE_DYNAMIC", VITE_DYNAMIC)} */}
        <DynamicContextProvider
          settings={{
            environmentId: VITE_DYNAMIC,
          }}
        >
          <DynamicWagmiConnector>
            <Navbar />

            <div className="mt-[4.1rem]">
              <Routers />
            </div>
            <div className="min-h-screen"></div>
            <Footer />
          </DynamicWagmiConnector>
        </DynamicContextProvider>

        {/* </WagmiConfig> */}
        {/* <Web3Modal
          // projectId={process.env.VITE_WEB3_ID}
          projectId={import.meta.env.VITE_WEB3_ID}
          ethereumClient={ethereumClient}
          defaultChain={goerli}
          enableNetworkView={true}
        /> */}
      </GlobalContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;
