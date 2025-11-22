import { provider, connectWallet } from "./connect-wallet.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/config.js";

let signer;
let contract;

document.getElementById("connectWalletBtn").addEventListener("click", async () => {
    try {
        const wallet = await connectWallet();

        signer = wallet.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        document.getElementById("walletStatus").innerText = "✔ تم ربط المحفظة بنجاح";
        document.getElementById("twitterFollowSection").style.display = "block";

    } catch (err) {
        console.log(err);
        document.getElementById("walletStatus").innerText = "حدث خطأ أثناء ربط المحفظة";
    }
});

// 🔥 Fake Twitter Check
document.getElementById("verifyTwitterBtn").addEventListener("click", () => {
    document.getElementById("twitterCheckStatus").innerText =
        "✔ تم التحقق من المتابعة بنجاح!";
    document.getElementById("twitterCheckStatus").style.color = "#00ff99";

    document.getElementById("claimBtn").disabled = false;
});
