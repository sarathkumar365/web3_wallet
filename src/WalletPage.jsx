import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { genEthWallet,genSolanaWallet } from './walletGeneration';

import './wallet.css';
import Accounts from './AccountsComp'; 

const WalletPage = () => {
    const location = useLocation();
    const { seed } = location.state || {};    

    const [ethWallet, setEthWallet] = useState(false);
    const [solWallet, setSolWallet] = useState(false);

    useEffect(() => {
       
        if(ethWallet) {
            console.log('eth changed');
            storeWallets(ethWallet)
        }
        
    

    },[ethWallet])

    useEffect(() => {
       
        if(solWallet) {
            console.log('sol changed');
            storeWallets(solWallet)

        }
        
    

    },[solWallet])

    const storeWallets = (walletDetails) => {
        // check if any wallets exists
        const existingWallets =  JSON.parse(localStorage.getItem('wallets'))
        // console.log(existingWallets);

        // check if a sol / eth wallet already exists
        // if yes, store the corresponding wallet as current wallet no + 1
        

        // if yes, merge them
        if(existingWallets) {
            const updatedWalletsList = [existingWallets,walletDetails]
            localStorage.setItem('wallets', JSON.stringify(updatedWalletsList))
            console.log('exists');
            
        } else {
            localStorage.setItem('wallets', JSON.stringify(walletDetails))
            console.log('not exists');
        }

    }
        

    return (
        <>
            <div className="wallet--container">
                <div className="container">
                    <h1>Generate your...</h1>
                    <div className="generates flex">
                        <button className='bttn-primary' onClick={() => {                            
                            const ethWallet = genEthWallet(seed);
                            setEthWallet(
                                {
                                    ...ethWallet,
                                    eth:true
                                }
                            )

                        }}>ETH Wallet</button>

                        <button className='bttn-primary' onClick={() => {
                            const solWallet = genSolanaWallet(seed)
                            setSolWallet({
                                ...solWallet,
                                sol:true
                            })

                        }}>SOL Wallet</button>
                    </div>
                </div>

                {
                    (solWallet || ethWallet) && <h3>These are your accounts associated with this wallet.</h3>
                }
                {
                    (solWallet || ethWallet) && 
                    <section className="walletAccounts">
                            {/* <Accounts /> */}
                            { ethWallet && <Accounts data = {ethWallet}/> }
                            { solWallet && <Accounts data = {solWallet}/>}
                        </section>
                }

            </div>
        </>
    );
}

export default WalletPage;

