let walletConnected = false;
let twitterFollowed = false;

// زر متابعة تويتر
document.getElementById("followBtn").onclick = () => {
    window.open("https://twitter.com/CrazyCoderLab", "_blank");

    twitterFollowed = true;

    document.getElementById("followBtn").innerText = "✔ تمت المتابعة";
    document.getElementById("followBtn").classList.add("done");

    checkReady();
};

// ربط المحفظة
document.getElementById("connectWallet").onclick = async () => {
    try {
        const provider = await web3Modal.connect();
        walletConnected = true;

        document.getElementById("walletStatus").innerText = "✔ تم ربط المحفظة";
        checkReady();
    } catch (err) {
        alert("فشل ربط المحفظة");
    }
};

// تفعيل زر المطالبة
function checkReady() {
    if (walletConnected && twitterFollowed) {
        document.getElementById("claimBtn").disabled = false;
    }
}
