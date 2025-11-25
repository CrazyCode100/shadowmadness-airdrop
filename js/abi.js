// =========================================
// CRAZYCODE TOKEN ABI + CONTRACT ADDRESS
// =========================================

// 🔥 عنوان العقد على BSC Mainnet
const CRAZYCODE_ADDRESS = "0xE4d658bCCBB1B8e20BD0a81a3726fDF22f1A7997";

// 🔥 ABI الخاص بالعقد (مختصر — فقط الوظائف المطلوبة للموقع)
const CRAZYCODE_ABI = [

    // --- claimAirdrop ---
    {
        "inputs": [],
        "name": "claimAirdrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },

    // --- hasClaimed(address) ---
    {
        "inputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "name": "hasClaimed",
        "outputs": [
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },

    // --- claimCount() ---
    {
        "inputs": [],
        "name": "claimCount",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },

    // --- MAX_CLAIMERS() ---
    {
        "inputs": [],
        "name": "MAX_CLAIMERS",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },

    // --- EARLY_CLAIMERS() ---
    {
        "inputs": [],
        "name": "EARLY_CLAIMERS",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

