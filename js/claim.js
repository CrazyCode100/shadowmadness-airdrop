import { connectWallet, userAddress } from "./connect-wallet.js";
import { CONTRACT_ADDRESS, ABI, TWITTER_USERNAME } from "./config.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

let followed = false;

document.getElementById("followTwitterBtn").onclick = () => {
    window.open(`https://twitter.com/${TWITTER_USERNAME}`, "_blank");
};

document.getElementById("checkFollowBtn").onclick = () => {
    followed = true;
    document.getElementById("twitterStatus").innerHTML =
        `<span style="color:#4cff4c;">✔ تم تأكيد المتابعة</span>`;

    document.getElementById("claimBtn").disabled = false;
    document.getElementById("claimBtn").classList.remove("disabled");
};

document.getElementById("claimBtn").onclick = async () => {

    if (!followed) {
        alert("يجب متابعة حساب تويتر أولاً");
        return;
    }

    const addr = await connectWallet();
    if (!addr) {
        alert("فشل ربط المحفظة");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const claimed = await contract.hasClaimed(addr);
    if (claimed) {
        document.getElementById("claimStatus").innerHTML =
            `<span style="color:#ff4444;">❌ حصلت سابقاً</span>`;
        return;
    }

    try {
        const tx = await contract.claimAirdrop();
        await tx.wait();

        window.location.href = "success.html";

    } catch (err) {
        console.error(err);
        document.getElementById("claimStatus").innerHTML =
            `<span style="color:#ff4444;">❌ فشل تنفيذ العملية</span>`;
    }
};
