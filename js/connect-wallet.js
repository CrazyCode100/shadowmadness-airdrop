/* ============================================================
   connect-wallet.js
   ربط جميع المحافظ (MetaMask - TrustWallet - Binance Wallet)
   باستخدام Web3Modal v2 مع شبكة BSC Testnet
   ============================================================ */

import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { providerOptions, WALLET_NETWORK } from "./web3modal-config.js";

// إنشاء Web3Modal
const web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark",
});

// عناصر الواجهة
const walletBtn = document.getElementById("connectWalletBtn");
const statusText = document.getElementById("walletStatus");

// المتغير العام
let walletProvider = null;
let signer = null;
let userAddress = null;

/* ============================================================
   ربط المحفظة
   ============================================================ */
export async function connectWallet() {
    try {
        walletProvider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        signer = ethersProvider.getSigner();
        userAddress = await signer.getAddress();

        statusText.innerHTML = `<span style="color:#4cff4c;">✔ تم الربط: ${short(userAddress)}</span>`;
        walletBtn.classList.add("disabled");

        return userAddress;

    } catch (err) {
        console.error("Wallet connection failed:", err);
        alert("فشل ربط المحفظة ⚠\nتأكد من أنك وافقت على الاتصال.");
        return null;
    }
}

/* ============================================================
   دالة مساعدة لعرض العنوان بشكل مختصر
   ============================================================ */
function short(addr) {
    return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
}

/* ============================================================
   فصل المحفظة
   ============================================================ */
export async function disconnectWallet() {
    if (web3Modal) {
        await web3Modal.clearCachedProvider();
    }
    walletProvider = null;
    signer = null;
    userAddress = null;

    walletBtn.innerHTML = "ربط المحفظة";
    walletBtn.classList.remove("disabled");
    statusText.innerHTML = "❌ لم يتم الربط";
}
