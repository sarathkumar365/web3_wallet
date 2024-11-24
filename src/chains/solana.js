import axios from 'axios'
import * as solanaWeb3 from "@solana/web3.js";

const ALCHEMY_API_KEY = '9qZNejVNdGJ91MBqGZqAEEK34zF84VHr'

const rpcDevnet = `https://solana-devnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
const rpcMainnet = `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

const connection = new solanaWeb3.Connection(rpcDevnet,'Confirmed')

export const latestSlot = async() => {
    const slot = await connection.getSlot()
    console.log(`Latest Slot : ${slot}`);
    
}

function lamportsToSOL(lamports) {
    const LAMPORTS_PER_SOL = 1_000_000_000; // 1 SOL = 1 billion lamports
    return lamports / LAMPORTS_PER_SOL;
}


const fetchBalance = async (walletId,mode) => {

    const config = {
        method: 'post',
        url: mode == 'Devnet' ? rpcDevnet : rpcMainnet,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [walletId]
        }
    };

    try {
        const response = await axios(config);
        const sol = lamportsToSOL(response.data.result.value)
        return sol        

    } catch (error) {
        console.error('Error fetching balance:', error);
    }
    
}

export const getBalance = async (walletId,mode) => {
    
    if(walletId.startsWith('0x')) {
        // TODO : Logic for getting eth balance
        return null
    } else {
        return await fetchBalance(walletId,mode)
 }

}