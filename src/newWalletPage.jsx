import { React, useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { retriveExistingWallets,storeWallets,genEthWallet,genSolanaWallet } from './addressManagement';

import WalletSectionComp from './WalletSectionComp';

import './newWalletPage.css'

function newWalletPage() {

    const [ethWallet, setETHWallet] = useState([])
    const [solWallet, setSOLWallet] = useState([])

    const [createBttnClicked,setCreateBttnClicked] = useState(true)
    const [dropdownVisible,setDropdownVisible] = useState(false)

    const location = useLocation(); 
    const { seed } = location.state || {};  

    useEffect(()=> {
        console.log('running');

        const existingWallets = retriveExistingWallets()
        // console.log(typeof existingWallets);
        
        if(existingWallets.eth || existingWallets.sol) {
            setETHWallet(existingWallets.eth)
            setSOLWallet(existingWallets.sol)
        }
        
    },[])


    const createEthWalet = () => {

        setCreateBttnClicked(false)
        
        let walletId = retriveExistingWallets('ethWallets').length + 1 || 1

        const ethWallet = genEthWallet(seed,walletId)
        setETHWallet(prevValue => [
            ...prevValue,
            ethWallet
        ])

        storeWallets(ethWallet)
        
    }

    const createSolWalet = () => {

        setCreateBttnClicked(false)

        let walletId = retriveExistingWallets('solWallets').length + 1 || 1

        const solWallet = genSolanaWallet(seed,walletId)
        setSOLWallet(prevValue => [
            ...prevValue,
            solWallet
        ])

        storeWallets(solWallet)
        
    }


    console.log(ethWallet,solWallet);
    

  return (
    <>
        <nav className='navbar flex'>
            <div className="logo">
                myst
            </div>

            <div
                className="add--wallet"
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => {
                    setTimeout(()=> setDropdownVisible(false),4000)
                }}
            >
                <button className='bttn--primary'>ADD WALLET</button>
                
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button onClick={() => createEthWalet()} className='dropdown-item'>ETH Wallet</button>
                        <button onClick={() => createSolWalet()} className='dropdown-item'>SOL Wallet</button>
                    </div>
                )}
            </div>
        </nav>

        {
            ( ethWallet.length > 0 || solWallet.length > 0 ) || 
            <section className="create--wallet flex">
            <div className="actions flex">
                <h2>Create your <span className='eth'>ETH</span>, <span className='sol'>SOL</span> Wallets</h2>
                <div className="action--bttns flex">
                    <button onClick={() => createEthWalet() } className='bttn--primary'>ETH Wallet</button>
                    <button onClick={() => createSolWalet()} className='bttn--primary'>SOL Wallet</button>
                </div>
            </div>
        </section>
        }

        {            
            // ethWallet && 
            // ethWallet.map(wallet => {
            //     <WalletSectionComp data = {wallet} />
            // })

            // Display eth wallets

        }
    </>
  )
}

export default newWalletPage
