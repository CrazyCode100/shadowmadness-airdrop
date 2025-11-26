/* ============================================================
   connect-wallet.js — ربط المحفظة + التحقق من شبكة BSC
   ============================================================ */

export async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("⚠ الرجاء تثبيت MetaMask أولاً");
            return null;
        }

        // طلب توصيل المحفظة
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        const userAddress = accounts[0];

        // التحقق من الشبكة الصحيحة (BSC Mainnet)
        const chainId = await window.ethereum.request({ method: "eth_chainId" });

        if (chainId !== "0x38") {  
            try {
                // محاولة تغيير الشبكة إلى BNB Mainnet
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x38" }]
                });
            } catch (switchError) {
                // إذا الشبكة غير مضافة — يتم إضافتها تلقائياً
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x38",
                                chainName: "BNB Smart Chain Mainnet",
                                nativeCurrency: {
                                    name: "BNB",
                                    symbol: "BNB",
                                    decimals: 18
                                },
                                rpcUrls: ["https://bsc-dataseed.binance.org/"],
                                blockExplorerUrls: ["https://bscscan.com"]
                            }
                        ]
                    });
                }
            }
        }

        return userAddress;

    } catch (err) {
        console.error("❌ Wallet connect error:", err);
        return null;
    }
}
