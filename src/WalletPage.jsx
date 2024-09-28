import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { genEthWallet,genSolanaWallet,retriveExistingWallets,storeWallets } from './walletGeneration';

import './wallet.css';
import GenerateBttnsComp from './generateBttnsComp';
import Accounts from './AccountsComp'; 

const WalletPage = () => {
    const location = useLocation();
    const { seed } = location.state || {};    

    const [ethWallet, setEthWallet] = useState(false);
    const [solWallet, setSolWallet] = useState(false);

    const [existingWallets,setExistingWallets] = useState(null)

    // run an effect to see if we have an existing wallet, 
    // if yes, store them in existingWallets
    useEffect(()=> {

        const existingWallets = retriveExistingWallets()
        
        // return if no wallets exists
        if(!existingWallets) return
        
        // store them in state and display them
        setExistingWallets(existingWallets)
    },[])

    // if there is change to any wallet state, listen and store them
    //  (This will happen only for first pair of wallets generated)
   useEffect(()=>{        
        if(ethWallet)   storeWallets(ethWallet)
        
   },[ethWallet])

    useEffect(()=>{
        if(solWallet)   storeWallets(solWallet)        
    },[solWallet])

//    console.log(typeof existingWallets);
   

    return (
        <>
            <div className="wallet--container">
                {   
                    existingWallets ?   null : <GenerateBttnsComp data = {
                        { ethWallet,setEthWallet,solWallet,setSolWallet, seed }
                    }/>
                    
                }

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

                {/* display existing wallets if they exists */}
                <section className='walletAccounts'>
                    {
                        existingWallets?.map((element,index) => {
                            return <Accounts    key={index} data = {element}/>
                            
                        })
                    }
                </section>

            </div>
        </>
    );
}

export default WalletPage;

