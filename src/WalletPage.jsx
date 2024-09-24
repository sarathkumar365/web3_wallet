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

    

    return (
        <>
            <div className="wallet--container">
                <div className="container">
                    <h1>Generate your...</h1>
                    <div className="generates flex">
                        <button className='bttn-primary' onClick={() => {                            
                            const ethWallet = genEthWallet(seed);
                            setEthWallet(ethWallet)
                        }}>ETH Wallet</button>

                        <button className='bttn-primary' onClick={() => {
                            const solWallet = genSolanaWallet(seed)
                            setSolWallet(solWallet)
                        }}>SOL Wallet</button>
                    </div>
                </div>

                {
                    (solWallet || ethWallet) && 
                        <section className="walletAccounts">
                            <h3>These are your accounts associated with this wallet.</h3>
                            {/* <Accounts /> */}
                            { ethWallet && <Accounts data = {ethWallet}/> }
                        </section>
                }

            </div>
        </>
    );
}

export default WalletPage;
