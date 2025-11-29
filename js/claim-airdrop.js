import { ABI, CONTRACT_ADDRESS } from "./abi.js";
import { connectWallet } from "./wallet.js";

const claimBtn = document.getElementById("claimAirdrop");
const claimStatus = document.getElementById("claimStatus");

claimBtn.onclick = async () => {
    const user = await connectWallet();
    if (!user) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
        const already = await contract.hasClaimed(user);
        if (already) {
            claimStatus.innerHTML = "❌ لقد حصلت سابقاً";
            return;
        }

        const tx = await contract.claimAirdrop();
        await tx.wait();

        claimStatus.innerHTML = "🎉 تم استلام المكافأة!";
    } catch (err) {
        console.error(err);
        claimStatus.innerHTML = "❌ فشل تنفيذ العملية";
    }
};
