import { createWeb3Modal, defaultConfig } from "https://esm.sh/@web3modal/ethers5";

export const projectId = "5b9f8c3e8b0fec7b8dce08512c9e0032"; // ID مجاني

export const chains = [
  {
    chainId: 97,
    name: "BNB Chain Testnet",
    currency: "tBNB",
    explorerUrl: "https://testnet.bscscan.com",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
  }
];

export const metadata = {
  name: "CrazyCode Airdrop",
  description: "AI-Managed Token Airdrop",
  url: "https://crazycode100.github.io/shadowmadness-airdrop/",
  icons: ["https://crazycode100.github.io/shadowmadness-airdrop/assets/logo.png"]
};

export const ethersConfig = defaultConfig({
  metadata,
  enableEmail: false,
  enableWalletConnect: true
});

createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  themeMode: "dark"
});
