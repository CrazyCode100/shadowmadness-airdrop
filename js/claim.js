const claimBtn = document.getElementById("claimAirdrop");
const claimStatus = document.getElementById("claimStatus");

claimBtn.addEventListener("click", async () => {

    // 1) فحص المتابعة
    if (!window.CRAZY_STATE.followed) {
        alert("يجب أولاً متابعة حساب X @CrazyCoderLab ثم الضغط على (✔ أكّدت أني أتابع).");
        return;
    }

    // 2) فحص المحفظة
    const signer = window.CRAZY_STATE.signer;
    if (!signer) {
        alert("يجب ربط المحفظة أولاً.");
        return;
    }

    try {
        claimStatus.innerHTML = "⏳ جارٍ إرسال المعاملة...";

        const contract = new ethers.Contract(
            window.CRAZY_CONFIG.CONTRACT,
            window.CRAZY_CONFIG.ABI,
            signer
        );

        // استدعاء claimAirdrop مع قيمة BNB
        const tx = await contract.claimAirdrop({
            value: ethers.utils.parseEther(window.CRAZY_CONFIG.REQUIRED_GAS_BNB)
        });

        await tx.wait();

        claimStatus.innerHTML = "🎉 تم استلام التوزيع المجاني بنجاح!";

    } catch (err) {
        console.error(err);
        claimStatus.innerHTML = "❌ فشل تنفيذ العملية، قد تكون أخذت التوزيع مسبقاً أو ليس هناك رصيد كافٍ.";
    }
});
