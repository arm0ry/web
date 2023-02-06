// import {
//   EthereumClient,
//   modalConnectors,
//   walletConnectProvider,
// } from "@web3modal/ethereum";

// import { createClient, configureChains } from "wagmi";

// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { InjectedConnector } from "wagmi/connectors/injected";

// import {
//   mainnet,
//   polygon,
//   optimism,
//   bsc,
//   avalanche,
//   goerli,
// } from "wagmi/chains";

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet, polygon, optimism, bsc, avalanche, goerli],
//   [publicProvider()]
// );
// // alchemyProvider({ apiKey: "yourAlchemyApiKey" })

// // Wagmi client
// // const { provider } = configureChains(chains, [
// //   walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
// // ]);
// export const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: modalConnectors({
//     appName: "web3Modal",
//     chains: [mainnet, avalanche, bsc, goerli, optimism],
//   }),
//   provider,
// });
// export const ethereumClient = new EthereumClient(wagmiClient, chains);

// // Set up client
// export const client = createClient({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: "wagmi",
//       },
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         qrcode: true,
//       },
//     }),
//     // new InjectedConnector({
//     //   chains,
//     //   options: {
//     //     name: "Injected",
//     //     shimDisconnect: true
//     //   }
//     // })
//   ],
//   provider,
//   webSocketProvider,
// });
