import { React, useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { retriveExistingWallets,storeWallets,genEthWallet,genSolanaWallet } from './addressManagement';

import WalletSectionComp from './WalletSectionComp';

import './css/newWalletPage.css'

function newWalletPage() {

    const [ethWallet, setETHWallet] = useState([])
    const [solWallet, setSOLWallet] = useState([])

    const [createBttnClicked,setCreateBttnClicked] = useState(true)
    const [dropdownVisible,setDropdownVisible] = useState(false)

    const location = useLocation(); 
    const { seed } = location.state || {};  

    

    useEffect(()=> {
        // Run this initially to set the state for already existing wallets.
        const existingWallets = retriveExistingWallets()

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

    // create arr to display wallets
    const ethArr = ethWallet?.map((wallet,id) => {                                
        return <WalletSectionComp data = {wallet}   key = {id} />
    })

    const solArr =  solWallet?.map((wallet,id) => {                                
        return <WalletSectionComp data = {wallet}   key = {id} />
    })
    
    // console.log(ethWallet,solWallet);
    
    

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
            ( ethWallet?.length > 0 || solWallet?.length > 0 ) || 
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

            // Display eth wallets
            ethArr?.length > 0 && ethArr

        }

        {          

        // Display sol wallets
        solArr?.length > 0 && solArr

        }
    </>
  )
}

export default newWalletPage
