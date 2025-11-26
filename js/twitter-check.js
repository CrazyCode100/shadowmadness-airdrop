let followed = false;

document.getElementById("followBtn").onclick = () => {
    window.open("https://twitter.com/CrazyCoderLab", "_blank");
};

document.getElementById("confirmFollow").onclick = () => {
    followed = true;
    document.getElementById("followStatus").innerHTML =
        "✔ تم التأكيد أنك تتابع الحساب";
};
