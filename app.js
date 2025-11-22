let userAddress;

connectBtn.addEventListener("click", async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();

    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    // ==== NEW: فحص Claim سابق ====
    const already = await contract.hasClaimed(userAddress);

    if (already) {
        statusText.innerText = "🚫 لقد استلمت حصتك سابقًا";
        connectBtn.style.display = "none";
        followBtn.style.display = "none";
        claimBtn.style.display = "none";
        return;
    }

    // ==== عدد المشاركين ====
    const count = await contract.claimCount();
    const reward = count < 1000 ? 19 : 7;

    statusText.innerHTML = `🎁 حصتك ستكون <b>${reward} مليون CRAZYCODE</b><br>اضغط Claim`;

    connectBtn.style.display = "none";
    claimBtn.style.display = "inline-block";
});

