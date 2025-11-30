import { CONTRACT, ABI } from "./config.js";

let provider;
let signer;
let user;

const connectBtn = document.getElementById("connectWallet");
const walletStatus = document.getElementById("walletStatus");

connectBtn.addEventListener("click", async () => {
    try {
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            signer = provider.getSigner();
            user = await signer.getAddress();

            walletStatus.innerHTML = `✔ تم الربط: ${user.substring(0,6)}...${user.slice(-4)}`;
            connectBtn.classList.add("disabled");

            document.getElementById("claimAirdrop").classList.remove("disabled");
            document.getElementById("claimAirdrop").disabled = false;

        } else {
            alert("⚠ لا يوجد MetaMask أو محفظة Web3، استخدم TrustWallet / Binance Wallet.");
        }
    } catch (err) {
        alert("❌ فشل ربط المحفظة");
    }
});

export function getSigner() {
    return signer;
}
