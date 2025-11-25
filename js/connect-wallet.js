import { providerOptions, WALLET_NETWORK } from "./web3modal-config.js";

const web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions
});

const btn = document.getElementById("connectWalletBtn");
const status = document.getElementById("walletStatus");

export async function connectWallet() {
    try {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        status.innerHTML = "✔ متصل: " + address.substring(0, 6) + "...";
        return address;

    } catch (e) {
        alert("فشل ربط المحفظة");
        return null;
    }
}

btn.addEventListener("click", connectWallet);

