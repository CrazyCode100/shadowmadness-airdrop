import { CONTRACT, ABI, REQUIRED_GAS } from "./config.js";
import { getSigner } from "./wallet.js";
import { isFollowed } from "./twitter-check.js";

const claimBtn = document.getElementById("claimAirdrop");
const claimStatus = document.getElementById("claimStatus");

claimBtn.addEventListener("click", async () => {

    if (!isFollowed()) {
        alert("يجب متابعة حساب تويتر قبل المطالبة!");
        return;
    }

    const signer = getSigner();
    if (!signer) {
        alert("يجب ربط المحفظة أولاً");
        return;
    }

    try {
        const contract = new ethers.Contract(CONTRACT, ABI, signer);

        const tx = await contract.claimAirdrop({
            value: ethers.utils.parseEther(REQUIRED_GAS)
        });

        claimStatus.innerHTML = "⏳ جارٍ تنفيذ العملية...";
        await tx.wait();

        claimStatus.innerHTML = "🎉 تمت المطالبة بنجاح!";
    }
    catch (err) {
        console.error(err);
        claimStatus.innerHTML = "❌ فشل تنفيذ العملية";
    }
});
