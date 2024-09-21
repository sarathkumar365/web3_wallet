import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HDKey } from 'ethereumjs-wallet';

import {ethers}  from 'ethers'; 
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import * as bip32  from 'bip32';

import './wallet.css';
import ETHWallet from './ETHWallet';
import SOLWallet from './SOLWallet';

const WalletPage = () => {
    const location = useLocation();
    const { seed } = location.state || {};    

    const [ethWallet, setEthWallet] = useState(false);
    const [solWallet, setSolWallet] = useState(false);

    // Generate ETH Wallet
    const genEthWallet = (seed) => {
        console.log("Generate Ethereum wallet");

        const ethDerivationPath = "m/44'/60'/0'/0/0"; //Derivation path for eth

        // Derive eth keypairs
        const derivationPath = ethDerivationPath;
        
        const hdWallet = HDKey.fromMasterSeed(seed);

        // Derive the private and public keys from the Ethereum derivation path
        const wallet = hdWallet.derivePath(derivationPath).getWallet();
        const privateKey = wallet.getPrivateKey().toString('hex');
        const publicKey = wallet.getPublicKey().toString('hex');

        // Generate Ethereum Wallet Address
        const publicKeyBuffer = wallet.getPublicKey() // Get public key as a buffer
        const addressBuffer = publicToAddress(publicKeyBuffer,true);
        const ethAddress = `0x${addressBuffer.toString('hex')}`;

        return ethAddress

    };

    // Generate Solana wallet
    const genSolanaWallet = (seed) => {
        console.log("Generate solana wallet");

        // Derive a solana keypair from the seed
        const derivedSeed = seed.slice(0,32)
        const keyPair = Keypair.fromSeed(derivedSeed)

        // console.log("Private Key:", keyPair.secretKey);
        // console.log("Public Key:", keyPair.publicKey.toBase58());

        return {
            publicKey: keyPair.publicKey.toBase58(),
            secretKey: keyPair.secretKey,
        };
    };
            
    return (
        <>
            <div className="wallet--container flex">
                <div className="container flex">
                    <h1>Generate your..</h1>
                    <div className="generates flex">
                        <button className='bttn-primary' onClick={() => {                            
                            const ethWallet = genEthWallet(seed);
                            console.log(ethWallet);
                            setEthWallet(true);
                        }}>ETH Wallet</button>

                        <button className='bttn-primary' onClick={() => {
                            const solanaWallet = genSolanaWallet(seed)
                            setSolWallet(solanaWallet)
                        }}>SOL Wallet</button>
                    </div>
                </div>

                <section className="wallets flex">
                    {ethWallet && <ETHWallet />}
                    {solWallet && <SOLWallet publicKey = {solWallet.publicKey} />}
                </section>
            </div>
        </>
    );
}

export default WalletPage;
