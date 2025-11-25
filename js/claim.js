import { CONTRACT_ADDRESS, ABI } from "./config.js";
import { connectWallet } from "./connect-wallet.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const followBtn = document.getElementById("followTwitterBtn");
const checkBtn = document.getElementById("checkFollowBtn");
const claimBtn = document.getElementById("claimBtn");
const twitterStatus = document.getElementById("twitterStatus");

let following = false;

// زر المتابعة
followBtn.onclick = () => {
    window.open("https://twitter.com/CrazyCoderLab", "_blank");
};

// زر تأكيد المتابعة
checkBtn.onclick = () => {
    following = true;
    twitterStatus.innerHTML = "✔ تم التأكيد أنك تتابع الحساب";
    claimBtn.disabled = false;
    claimBtn.classList.remove("disabled");
};

// زر المطالبة
claimBtn.onclick = async () => {
    if (!following) return alert("يجب متابعة تويتر");

    const user = await connectWallet();
    if (!user) return;

    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const already = await contract.hasClaimed(user);
    if (already) return alert("لقد حصلت مسبقاً");

    const tx = await contract.claimAirdrop();
    await tx.wait();

    window.location.href = "success.html";
};

