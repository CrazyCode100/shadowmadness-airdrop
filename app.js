// إعدادات عامة
const CRAZYCODE_ADDRESS = "0xc00E9CB1f4449351E8240A0B7Cb80a60e4f3112F";
const CRAZYCODE_ABI = [
  "function claimAirdrop() external",
  "function hasClaimed(address) view returns (bool)"
];
const TWITTER_HANDLE = "ShadowMadnessLAP"; // غيّرها إذا كان اسم الحساب مختلفاً

let provider = null;
let signer = null;
let contract = null;
let walletAddress = null;
let hasConfirmedFollow = false;

const $ = (id) => document.getElementById(id);

// عناصر DOM
const walletStatus = $("wallet-status");
const networkPill = $("network-pill");
const addrDisplayStats = $("stats-address");
const statsClaimed = $("stats-claimed");
const statsFollow = $("stats-follow");
const toastEl = $("toast");

function showToast(message, isError = false) {
  toastEl.textContent = message;
  toastEl.classList.remove("error", "show");
  if (isError) toastEl.classList.add("error");
  void toastEl.offsetWidth;
  toastEl.classList.add("show");
}

function shortAddress(addr) {
  if (!addr) return "غير متصل";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function updateClaimButtonState() {
  const canClaim = hasConfirmedFollow && !!walletAddress;
  const btnClaim = $("btn-claim");
  btnClaim.disabled = !canClaim;
}

// فتح حساب تويتر
$("btn-open-twitter").addEventListener("click", () => {
  const url = `https://twitter.com/${TWITTER_HANDLE}`;
  window.open(url, "_blank", "noopener");
  showToast("تم فتح حساب X في نافذة جديدة، قم بالمتابعة ثم اضغط 'تأكيد المتابعة'.");
});

// تأكيد المتابعة (يدوي)
$("btn-confirm-follow").addEventListener("click", () => {
  hasConfirmedFollow = true;
  $("follow-state-label") && ( $("follow-state-label").textContent = "تم التأكيد (يدوياً)" );
  statsFollow.textContent = "تم التأكيد (يدوياً)";
  document.getElementById("step-follow").classList.add("done");
  updateClaimButtonState();
  showToast("تم تأكيد المتابعة يدويًا. يمكنك لاحقًا إضافة تحقق حقيقي عبر Backend + Twitter API.");
});

// ربط المحفظة
$("btn-connect-wallet").addEventListener("click", async () => {
  try {
    if (!window.ethereum) {
      showToast("لم يتم العثور على MetaMask. رجاءً قم بتثبيته أولاً.", true);
      return;
    }

    walletStatus.textContent = "جاري الاتصال...";
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    walletAddress = accounts[0];

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(CRAZYCODE_ADDRESS, CRAZYCODE_ABI, signer);

    walletStatus.textContent = "متصل";
    walletStatus.classList.add("connected");
    addrDisplayStats.textContent = shortAddress(walletAddress);

    const net = await provider.getNetwork();
    const chainId = Number(net.chainId);
    networkPill.classList.remove("error");

    if (chainId === 97) {
      networkPill.innerHTML = '<span class="dot"></span> BNB Testnet (97)';
    } else if (chainId === 56) {
      networkPill.innerHTML = '<span class="dot"></span> BNB Mainnet (56)';
    } else {
      networkPill.innerHTML = '<span class="dot"></span> شبكة غير متوقعة (' + chainId + ')';
      networkPill.classList.add("error");
    }

    updateClaimButtonState();
    showToast("تم ربط المحفظة بنجاح.");
  } catch (err) {
    console.error(err);
    walletStatus.textContent = "فشل الاتصال";
    walletStatus.classList.add("error");
    showToast("فشل ربط المحفظة: " + (err?.message || ""), true);
  }
});

// التحقق من حالة الكليم من العقد
async function refreshClaimed() {
  if (!contract || !walletAddress) {
    showToast("يجب أولاً ربط المحفظة.", true);
    return;
  }
  try {
    const claimed = await contract.hasClaimed(walletAddress);
    const text = claimed ? "لقد طالبت بالفعل من العقد ✅" : "لم تطالب بعد، يمكنك المحاولة.";
    statsClaimed.textContent = text;
    $("claimed-label") && ( $("claimed-label").textContent = text );
  } catch (err) {
    console.error(err);
    showToast("تعذر قراءة حالة الكليم من العقد.", true);
  }
}

$("btn-refresh-claimed").addEventListener("click", refreshClaimed);
$("btn-check-claimed").addEventListener("click", refreshClaimed);

// تنفيذ claimAirdrop
$("btn-claim").addEventListener("click", async () => {
  if (!contract || !walletAddress) {
    showToast("رجاءً اربط المحفظة أولاً.", true);
    return;
  }
  if (!hasConfirmedFollow) {
    showToast("يجب تأكيد متابعة حساب X قبل المطالبة.", true);
    return;
  }

  const btn = $("btn-claim");

  try {
    btn.disabled = true;
    btn.textContent = "جاري الإرسال...";
    showToast("يتم الآن إرسال المعاملة إلى العقد المجنون…");

    const tx = await contract.claimAirdrop();
    showToast("تم إرسال المعاملة. انتظر تأكيد الشبكة…");
    await tx.wait();

    document.getElementById("step-claim").classList.add("done");
    await refreshClaimed();
    btn.textContent = "تم الكليم ✅";
    showToast("مبروك! استلمت حصتك من CrazyCode. تحقق من رصيدك في المحفظة.");
  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = "🎁 Claim CRAZYCODE";
    const msg = err?.reason || err?.data?.message || err?.message || "فشل تنفيذ الكليم.";
    showToast(msg, true);
  }
});

// التبويبات
document.querySelectorAll(".tab-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    document.querySelectorAll(".tab-link").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"));
    document.getElementById("tab-" + tabId).classList.add("active");
  });
});
