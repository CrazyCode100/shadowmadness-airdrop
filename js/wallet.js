import { providerOptions, BSC_PARAMS } from "./web3modal-config.js";

let web3Modal;
let provider;
let signer;
let user;

async function initModal() {
    web3Modal = new window.Web3Modal.default({
        cacheProvider: false,
        providerOptions,
        theme: "dark"
    });
}

await initModal();

export async function connectWallet() {
    try {
        provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);

        signer = ethersProvider.getSigner();
        user = await signer.getAddress();

        document.getElementById("walletStatus").innerHTML =
            `✔ متصل: ${user.substring(0, 6)}...${user.slice(-4)}`;

        document.getElementById("connectWallet").classList.add("disabled");

        return user;
    } catch (err) {
        console.error(err);
        alert("فشل ربط المحفظة!");
        return null;
    }
}
