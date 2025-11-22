import { ethers } from "https://esm.sh/ethers";
import { CONTRACT_ADDRESS, ABI, NETWORK } from "../config/config.js";

export let provider;
export let signer;

export async function connectWallet() {
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();

        const address = await signer.getAddress();
        document.getElementById("wallet-address").innerText = address;
        return address;
    } catch (err) {
        alert("فشل الاتصال بالمحفظة: " + err.message);
        return null;
    }
}
