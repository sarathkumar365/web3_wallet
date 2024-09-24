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

    setSolWallet({
        address: keyPair.publicKey.toBase58(),
        privateKey: keyPair.secretKey,
    })
   
    return {
        address,privateKey
    }
};

