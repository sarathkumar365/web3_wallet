import { React, useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { retriveExistingWallets,storeWallets,genEthWallet,genSolanaWallet } from './addressManagement';

import WalletSectionComp from './WalletSectionComp';

import './newWalletPage.css'

function newWalletPage() {

    const [ethWallet,setEthWallet] = useState({})

    const location = useLocation();
    const { seed } = location.state || {};  


    const createEthWalet = () => {
        
        let walletId = retriveExistingWallets('ethWallets').length + 1 || 1

        const ethWallet = genEthWallet(seed,walletId)
        storeWallets(ethWallet)
        
    }

    const createSolWalet = () => {
        console.log('gen sol');

        let walletId = retriveExistingWallets('solWallets').length + 1 || 1

        const solWallet = genSolanaWallet(seed,walletId)
        storeWallets(solWallet)
        
    }


  return (
    <>
        <nav className='navbar flex'>
            <div className="logo">
                myst
            </div>

            <div className="add--wallet">
                <button className='bttn--primary'>ADD WALLET</button>
            </div>
        </nav>

        <section className="create--wallet flex">
            <div className="actions flex">
                <h2>Create your <span className='eth'>ETH</span>, <span className='sol'>SOL</span> Wallets</h2>
                <div className="action--bttns flex">
                    <button onClick={() => createEthWalet()} className='bttn--primary'>ETH Wallet</button>
                    <button onClick={() => createSolWalet()} className='bttn--primary'>SOL Wallet</button>
                </div>
            </div>
        </section>

        {/* show this for wallets
        <>
            <WalletSectionComp/>
        </> */}
    </>
  )
}

export default newWalletPage
