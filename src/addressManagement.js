import {HDNodeWallet, Wallet}  from 'ethers'; 
import { Keypair } from '@solana/web3.js';

export const genEthWallet = (seed) => {
    console.log("Generate Ethereum wallet");

    const ethDerivationPath = "m/44'/60'/0'/0/0"; //Derivation path for eth

    // Derive eth keypairs
    const derivationPath = ethDerivationPath;
    
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
        address,privateKey
    }
};

 // Generate Solana wallet
 export const genSolanaWallet = (seed) => {
    console.log("Generate solana wallet");

    // Derive a solana keypair from the seed
    const derivedSeed = seed.slice(0,32)
    const keyPair = Keypair.fromSeed(derivedSeed)

    
    const address =  keyPair.publicKey.toBase58()
    const privateKey = keyPair.secretKey
    
   
    return {
        address,privateKey
    }
};


// Store wallets

export const storeWallets = (walletDetails) => {
    console.log('Storing...');
    
    // check if any wallets exists
    const existingWallets =  JSON.parse(localStorage.getItem('wallets'))

    // check if a sol / eth wallet already exists
    // if yes, store the corresponding wallet as current wallet no + 1
    

    // if yes, merge them
    if(existingWallets) {
        const updatedWalletsList = [existingWallets,walletDetails]
        localStorage.setItem('wallets', JSON.stringify(updatedWalletsList))
        // console.log('exists');
        
    } else {
        localStorage.setItem('wallets', JSON.stringify(walletDetails))
        // console.log('not exists');
    }

}

// retrive existing wallets

export const retriveExistingWallets = () => {
     // check if any wallets exists
     return JSON.parse(localStorage.getItem('wallets'))

}