let provider, signer, contract, userAddress;

const connectBtn = document.getElementById("connectBtn");
const claimBtn = document.getElementById("claimBtn");
const statusText = document.getElementById("statusText");

connectBtn.addEventListener("click", async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();
    userAddress = await signer.getAddress();

    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    statusText.innerText = "⏳ Checking eligibility…";

    const claimed = await contract.hasClaimed(userAddress);
    const count = await contract.claimCount();

    if (claimed) {
        statusText.innerHTML = "🚫 لقد حصلت على حصتك سابقًا.";
        return;
    }

    const reward = count < 1000 ? 19 : 7;

    statusText.innerHTML =
        `🎁 حصتك ستكون <b>${reward} مليون CRAZYCODE</b>`;

    connectBtn.style.display = "none";
    claimBtn.style.display = "inline-block";

    updateCounter();
});

// === LIVE COUNTER ===
async function updateCounter() {
    if (!contract) return;

    const count = await contract.claimCount();
    const left = 10000 - Number(count);

    document.getElementById("counter").innerHTML =
        `Participants: <b>${count}</b> / 10000<br>Remaining: <b>${left}</b>`;
}

setInterval(updateCounter, 5000);

// === CLAIM ===
claimBtn.addEventListener("click", async () => {
    document.getElementById("loader").style.display = "block";
    claimBtn.style.display = "none";

    try {
        const tx = await contract.claimAirdrop();
        await tx.wait();

        window.location.href = "success.html?tx=" + tx.hash;

    } catch (err) {
        console.error(err);
        statusText.innerText = "❌ Failed: " + err.message;
        claimBtn.style.display = "inline-block";
        document.getElementById("loader").style.display = "none";
    }
});
