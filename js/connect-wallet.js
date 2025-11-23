/* ============================================================
   connect-wallet.js
   ربط جميع المحافظ (MetaMask - TrustWallet - Binance Wallet)
   باستخدام Web3Modal
   ============================================================ */

import { providerOptions, WALLET_NETWORK } from "./web3modal-config.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

/* ============================================================
   إنشاء Web3Modal
   ============================================================ */

const web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark",
});

/* عناصر الواجهة */
const walletBtn = document.getElementById("connectBtn");
const walletStatus = document.getElementById("walletStatus");

/* المتغيرات العامة */
let provider = null;
let signer = null;
let userAddress = null;

/* ============================================================
   🔥 ربط المحفظة
   ============================================================ */
export async function connectWallet() {
    try {
        provider = await web3Modal.connect();

        const web3Provider = new ethers.providers.Web3Provider(provider);
        signer = web3Provider.getSigner();
        userAddress = await signer.getAddress();

        walletStatus.innerHTML = `<span style="color:#4cff4c;">✔ تم الربط: ${short(userAddress)}</span>`;
        walletBtn.classList.add("disabled");

        return userAddress;

    } catch (err) {
        console.error("Wallet connection failed:", err);
        alert("⚠ فشل ربط المحفظة. تأكد من الموافقة داخل المحفظة.");
        return null;
    }
}

/* ============================================================
   🔥 اختصار العنوان
   ============================================================ */
function short(addr) {
    return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
}

/* ============================================================
   🔥 فصل المحفظة
   ============================================================ */
export async function disconnectWallet() {
    if (web3Modal) {
        await web3Modal.clearCachedProvider();
    }
    provider = null;
    signer = null;
    userAddress = null;

    walletStatus.innerHTML = "❌ لم يتم الربط";
    walletBtn.innerHTML = "ربط المحفظة";
    walletBtn.classList.remove("disabled");
}
