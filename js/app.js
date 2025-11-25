let provider;
let signer;
let contract;

// ================================
//  CONNECT WALLET
// ================================
async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask غير مثبت!");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = address;

    contract = new ethers.Contract(
        CRAZYCODE_ADDRESS,
        CRAZYCODE_ABI,
        signer
    );

    await checkClaimStatus();
    await loadStats();
}

// ================================
//  CHECK CLAIM STATUS
// ================================
async function checkClaimStatus() {
    const address = await signer.getAddress();
    const claimed = await contract.hasClaimed(address);

    if (claimed) {
        document.getElementById("claimStatus").innerText = "✔ تم استلام التوزيع";
        document.getElementById("claimBtn").disabled = true;
        document.getElementById("claimBtn").innerText = "Already Claimed";
    } else {
        document.getElementById("claimStatus").innerText = "لم تستلم التوزيع بعد";
    }
}

// ================================
//  LOAD STATISTICS
// ================================
async function loadStats() {
    const total = await contract.claimCount();
    const max = await contract.MAX_CLAIMERS();
    const early = await contract.EARLY_CLAIMERS();

    document.getElementById("claimedCount").innerText = total.toString();
    document.getElementById("maxClaimers").innerText = max.toString();
    document.getElementById("earlyCount").innerText = early.toString();
}

// ================================
//  CLAIM AIRDROP
// ================================
async function claimAirdrop() {
    try {
        const tx = await contract.claimAirdrop();
        document.getElementById("claimBtn").innerText = "Processing...";
        await tx.wait();

        alert("🎉 تم استلام التوزيع بنجاح!");
        await checkClaimStatus();
        await loadStats();
    } catch (err) {
        console.error(err);
        alert("خطأ في تنفيذ العملية");
    }
}
