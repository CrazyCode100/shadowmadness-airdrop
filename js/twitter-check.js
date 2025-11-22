// =============================
// 🔵 Twitter Follow Check System
// =============================

// الحساب المطلوب متابعته
const REQUIRED_TWITTER = "CrazyCoderLab";

// زر المتابعة
const followBtn = document.getElementById("followBtn");
// النص الذي يظهر حالة المتابعة
const followStatus = document.getElementById("followStatus");

// رابط المتابعة
if (followBtn) {
    followBtn.addEventListener("click", () => {
        window.open(`https://twitter.com/${REQUIRED_TWITTER}`, "_blank");
    });
}

// دالة تتأكد أن المستخدم تابع الحساب
async function verifyTwitterFollow(username) {
    try {
        const response = await fetch(
            `https://api.codetabs.com/v1/proxy?quest=https://unfollow-monkey.vercel.app/api/check?username=${username}&target=${REQUIRED_TWITTER}`
        );

        const data = await response.json();

        if (data?.isFollowing === true) {
            followStatus.innerHTML = "✅ تم التأكد أنك متابع الحساب";
            followStatus.style.color = "#00ff99";
            return true;
        } else {
            followStatus.innerHTML = "❌ يجب متابعة حساب تويتر أولاً";
            followStatus.style.color = "#ff5555";
            return false;
        }

    } catch (error) {
        console.error("Twitter Check Error:", error);
        followStatus.innerHTML = "⚠ لا يمكن التأكد من المتابعة حالياً";
        followStatus.style.color = "#ff9900";
        return false;
    }
}

// جعل الدالة عالمية لتعمل داخل claim.js
window.verifyTwitterFollow = verifyTwitterFollow;

