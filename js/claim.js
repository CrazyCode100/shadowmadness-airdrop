import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/config.js";

document.getElementById("claimBtn").addEventListener("click", async () => {
    try {
        const wallet = await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const tx = await contract.claimAirdrop();
        await tx.wait();

        alert("🎉 تم إرسال المكافأة بنجاح!");

        window.location.href = "success.html";

    } catch (err) {
        console.log(err);
        alert("⚠ حدث خطأ أثناء المطالبة");
    }
});
