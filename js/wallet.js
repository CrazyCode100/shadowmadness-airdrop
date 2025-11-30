// يعتمد على window.CRAZY_STATE + مكتبة ethers من الـ CDN

const connectBtn = document.getElementById("connectWallet");
const walletStatus = document.getElementById("walletStatus");

connectBtn.addEventListener("click", async () => {
    try {
        if (!window.ethereum) {
            alert("⚠ لم يتم العثور على محفظة Web3.\nجرّب MetaMask أو TrustWallet أو Binance Wallet من المتصفح.");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        window.CRAZY_STATE.provider = provider;
        window.CRAZY_STATE.signer = signer;
        window.CRAZY_STATE.userAddress = userAddress;

        walletStatus.innerHTML = `✔ تم الربط: ${userAddress.substring(0, 6)}...${userAddress.slice(-4)}`;
        connectBtn.classList.add("disabled");

        // لو هو متابع ومربوط محفظته → نفعّل زر الكليم من الآن
        if (window.CRAZY_STATE.followed) {
            const claimBtn = document.getElementById("claimAirdrop");
            claimBtn.classList.remove("disabled");
            claimBtn.disabled = false;
        }

    } catch (err) {
        console.error(err);
        alert("❌ فشل ربط المحفظة");
        walletStatus.innerHTML = "❌ فشل الربط";
    }
});
