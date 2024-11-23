import {HDNodeWallet, Wallet}  from 'ethers'; 
import { Keypair } from '@solana/web3.js';
import { derivePath } from "ed25519-hd-key";
import { Buffer } from 'buffer';
import nacl from 'tweetnacl';
import { mnemonicToSeedSync } from 'bip39';


export const generateSeedFromMnemonic = () => {

    // retrive existing mnemonics
    const existingMnemonics =  localStorage.getItem('mnemonic')
    
    try {
        return mnemonicToSeedSync(existingMnemonics);
    } catch (error) {
        console.error("Error generating seed from mnemonic:", error);
        return null;
    }
};



export const genEthWallet = (seed,walletId) => {

    const ethDerivationPath = `m/44'/60'/0'/0/${walletId}`; //Derivation path for eth

    // Derive eth keypairs
    const derivationPath = ethDerivationPath;

     // check if seed exists, if not gen one
     if(!seed) seed = generateSeedFromMnemonic()
    
    const hdWallet = HDNodeWallet.fromSeed(seed);
    // An hdWallet object, which contains the master key (seed) and can derive child keys along different paths.

    // Derive the private and public keys from the Ethereum derivation path
    const hdNodeWallet = hdWallet.derivePath(derivationPath);
    // This derives the wallet at the specific Ethereum derivation path 
    // (m/44'/60'/0'/0/0). It generates the private and public keys for the first Ethereum account based on that path.
  
    const privateKey = hdNodeWallet.privateKey; //Private key
    const publicKey = hdNodeWallet.publicKey;
    // console.log({privateKey, publicKey});
    
    const wallet = new Wallet(privateKey);
    const address = wallet.address;
    // console.log({address}); // address generated from RAW public key. This can be shared
    // setEthWallet({address,privateKey})

    return {
        address,privateKey,walletId
    }
};

 // Generate Solana wallet
 export const genSolanaWallet = (seed,walletId) => {
    
    // check if seed exists, if not gen one
    if(!seed) seed = generateSeedFromMnemonic()


    const derivationPath = `m/44'/501'/${walletId}'/0'`;

    const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const address =  keypair.publicKey.toBase58()
    const privateKey = keypair.secretKey
        
   
    return {
        address,privateKey,walletId
    }
};


// Store wallets

export const storeWallets = (walletDetails) => {
    
    

    if(walletDetails.address.startsWith('0x'))  {

        // check if any wallets exists
        const existingWallets =  JSON.parse(localStorage.getItem('ethWallets'))


        // check if a sol / eth wallet already exists
        // if yes, store the corresponding wallet as current wallet no + 1
        
    
        // if yes, merge them
        if(existingWallets) {
            const updatedWalletsList = [...existingWallets,walletDetails]
            localStorage.setItem('ethWallets', JSON.stringify(updatedWalletsList))
            // console.log('exists');
            
        } else {
            localStorage.setItem('ethWallets', JSON.stringify([walletDetails]))
            // console.log('not exists');
        }

    } else {

        // check if any wallets exists
        const existingWallets =  JSON.parse(localStorage.getItem('solWallets'))

        if(existingWallets) {
            const updatedWalletsList = [...existingWallets,walletDetails]
            localStorage.setItem('solWallets', JSON.stringify(updatedWalletsList))
            // console.log('exists');
            
        } else {
            localStorage.setItem('solWallets', JSON.stringify([walletDetails]))
            // console.log('not exists');
        }
        
    }
    
    

}

// retrive existing wallets

export const retriveExistingWallets = (wallet = 'all') => {    
    
    if(wallet === 'all') {
        
        const wallets = {}
        const ethWallets = JSON.parse(localStorage.getItem('ethWallets')) || []
        const solWallets = JSON.parse(localStorage.getItem('solWallets')) || []
        
        // only return if they exist's || return empty arr []
        // so state will be initialized as empty []
        if(ethWallets || solWallets) {
            
            wallets.eth = ethWallets
            wallets.sol = solWallets

            return wallets
        }
        
        
        return []
        
        
    }
    
    
     // check if any wallets exists
     return JSON.parse(localStorage.getItem(wallet)) || []

}

const deleteWallet = (walletId) => {
    
}