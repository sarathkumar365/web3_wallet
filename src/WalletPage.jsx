import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {HDNodeWallet, Wallet}  from 'ethers'; 
import { Keypair } from '@solana/web3.js';

import './wallet.css';
import ETHWallet from './ETHWallet';
import SOLWallet from './SOLWallet';

const WalletPage = () => {
    const location = useLocation();
    const { seed } = location.state || {};    

    const [ethWallet, setEthWallet] = useState(false);
    const [solWallet, setSolWallet] = useState(false);

    const genEthWallet = (seed) => {
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
        setEthWallet({address,privateKey})
    };

    // Generate Solana wallet
    const genSolanaWallet = (seed) => {
        console.log("Generate solana wallet");

        // Derive a solana keypair from the seed
        const derivedSeed = seed.slice(0,32)
        const keyPair = Keypair.fromSeed(derivedSeed)

      
        return {
            publicKey: keyPair.publicKey.toBase58(),
            secretKey: keyPair.secretKey,
        };
    };
            
    return (
        <>
            <div className="wallet--container">
                <div className="container">
                    <h1>Generate your...</h1>
                    <div className="generates flex">
                        <button className='bttn-primary' onClick={() => {                            
                            genEthWallet(seed);
                        }}>ETH Wallet</button>

                        <button className='bttn-primary' onClick={() => {
                            const solanaWallet = genSolanaWallet(seed)
                            setSolWallet(solanaWallet)
                        }}>SOL Wallet</button>
                    </div>
                </div>

                <section className="wallets flex">
                    {ethWallet && <ETHWallet publicKey = {ethWallet} />}
                    {solWallet && <SOLWallet publicKey = {solWallet.publicKey} />}
                </section>
            </div>
        </>
    );
}

export default WalletPage;
