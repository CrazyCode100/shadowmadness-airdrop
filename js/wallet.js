let userAccount = null;

document.getElementById("connectWallet").onclick = async () => {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            document.getElementById("walletStatus").innerHTML =
                "✔ متصل: " + userAccount.substring(0, 6) + "..." + userAccount.slice(-4);

            document.getElementById("claimAirdrop").disabled = false;
            document.getElementById("claimAirdrop").classList.remove("disabled");

        } catch (err) {
            alert("❌ فشل ربط المحفظة");
        }
    } else {
        alert("❌ لا يوجد MetaMask");
    }
};
