import { createWeb3Modal, defaultConfig } from 'https://esm.sh/@web3modal/ethers5';

const projectId = "demo"; // بدون API – وضع تجريبي

const bscTestnet = {
    chainId: 97,
    name: "BSC Testnet",
    currency: "tBNB",
    explorerUrl: "https://testnet.bscscan.com",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/"
};

const metadata = {
    name: "CrazyCode Airdrop",
    description: "Airdrop System",
    url: "https://crazycode100.github.io/shadowmadness-airdrop",
    icons: ["https://crazycode100.github.io/shadowmadness-airdrop/assets/logo.png"]
};

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [bscTestnet],
    projectId
});

export const provider = window.ethereum;
