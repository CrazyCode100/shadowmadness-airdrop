import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { providerOptions, WALLET_NETWORK } from "./web3modal-config.js";

const web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark",
});

const walletBtn = document.getElementById("connectWalletBtn");
const statusText = document.getElementById("walletStatus");

let walletProvider = null;
let signer = null;
export let userAddress = null;

export async function connectWallet() {
    try {
        walletProvider = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(walletProvider);

        signer = provider.getSigner();
        userAddress = await signer.getAddress();

        statusText.innerHTML = `<span style="color:#4cff4c;">✔ متصل: ${short(userAddress)}</span>`;
        return userAddress;

    } catch (err) {
        console.error(err);
        return null;
    }
}

function short(addr) {
    return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
}
