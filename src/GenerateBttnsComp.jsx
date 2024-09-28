import React from 'react'
import { genEthWallet,genSolanaWallet } from './addressManagement';

function GenerateBttnsComp(props) {
    
    const {ethWallet,setEthWallet,solWallet,setSolWallet,seed} = props.data

  return (
    <>
        <div className={`container ${(ethWallet && solWallet) ? 'hidden' : ''}`}>
            <h1>Generate your...</h1>
            <div className="generates flex">
                <button className={`bttn-primary ${ethWallet ? 'hidden' : ''}`} onClick={() => {                            
                    const ethWallet = genEthWallet(seed);
                    setEthWallet(
                        {
                            ...ethWallet,
                            eth:true
                        }
                    )


                }}>ETH Wallet</button>

                <button className={`bttn-primary ${solWallet ? 'hidden' : ''}`} onClick={() => {
                    const solWallet = genSolanaWallet(seed)
                    setSolWallet({
                        ...solWallet,
                        sol:true
                    })

                }}>SOL Wallet</button>
            </div>
        </div>
    </>
  )
}

export default GenerateBttnsComp
