document.getElementById("claimAirdrop").onclick = async () => {
    if (!followed) {
        alert("❌ يجب متابعة حساب تويتر أولاً");
        return;
    }

    if (!userAccount) {
        alert("❌ يجب ربط المحفظة أولاً");
        return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    try {
        document.getElementById("claimStatus").innerHTML = "⏳ جاري التنفيذ...";

        const tx = await contract.methods.claimAirdrop().send({
            from: userAccount
        });

        document.getElementById("claimStatus").innerHTML =
            "🎉 تمت المطالبة بنجاح!";

    } catch (err) {
        console.log(err);
        document.getElementById("claimStatus").innerHTML =
            "❌ فشل تنفيذ العملية";
    }
};
