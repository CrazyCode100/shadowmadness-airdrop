const followBtn = document.getElementById("followBtn");
const confirmBtn = document.getElementById("confirmFollow");
const followStatus = document.getElementById("followStatus");

followBtn.addEventListener("click", () => {
    const username = window.CRAZY_CONFIG.TWITTER;
    window.open(`https://twitter.com/${username}`, "_blank");
});

confirmBtn.addEventListener("click", () => {
    window.CRAZY_STATE.followed = true;
    followStatus.innerHTML = "✔ تم التأكيد أنك تتابع حساب X المطلوب";

    confirmBtn.classList.add("disabled");

    // لو المحفظة مربوطة → نفعّل زر المطالبة
    if (window.CRAZY_STATE.signer && window.CRAZY_STATE.userAddress) {
        const claimBtn = document.getElementById("claimAirdrop");
        claimBtn.classList.remove("disabled");
        claimBtn.disabled = false;
    }
});
