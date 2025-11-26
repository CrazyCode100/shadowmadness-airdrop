/* ============================================================
   web3modal-config.js — تهيئة Web3Modal للاتصال بالمحفظة
   ============================================================ */

import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { Web3Modal } from "@web3modal/standalone";

export const web3Modal = new Web3Modal({
    projectId: "shadow-madness-claim-001",   // اسم مخصص — يمكنك تغييره
    walletImages: {}, 
    themeMode: "dark",
    themeVariables: {
        "--w3m-accent-color": "#ff0066",
        "--w3m-background-color": "#0a0a0a"
    }
});

// تهيئة الإيثريوم — لدعم المحافظ في المستقبل لو احتجت
export async function getProvider() {
    try {
        const provider = await web3Modal.connectWallet();

        if (!provider) {
            alert("⚠ لم يتم ربط المحفظة");
            return null;
        }

        return provider;
    } catch (error) {
        console.error("❌ Web3Modal Provider Error:", error);
        return null;
    }
}
