export let followConfirmed = false;

const followBtn = document.getElementById("followBtn");
const confirmBtn = document.getElementById("confirmFollow");
const statusBox = document.getElementById("followStatus");

followBtn.onclick = () => {
    window.open("https://twitter.com/CrazyCoderLab", "_blank");
};

confirmBtn.onclick = () => {
    followConfirmed = true;
    statusBox.innerHTML = "✔ تمّ التأكيد أنك تتابع الحساب";
    confirmBtn.classList.add("disabled");

    document.getElementById("claimAirdrop").disabled = false;
    document.getElementById("claimAirdrop").classList.remove("disabled");
};
