import { TWITTER } from "./config.js";

const followBtn = document.getElementById("followBtn");
const confirmBtn = document.getElementById("confirmFollow");
const followStatus = document.getElementById("followStatus");

let followed = false;

followBtn.addEventListener("click", () => {
    window.open(`https://twitter.com/${TWITTER}`, "_blank");
});

confirmBtn.addEventListener("click", () => {
    followed = true;
    followStatus.innerHTML = "✔ تم التأكيد أنك تتابع الحساب";
    confirmBtn.classList.add("disabled");
});

export function isFollowed() {
    return followed;
}
