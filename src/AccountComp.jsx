import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './account.css'

import {getBalance} from './chains/solana'

function AccountComp() {

    const [mode,setMode] = useState('Devnet')
    const [balance,setBalance] = useState('')

    const location = useLocation();
    const { walletAddress } = location.state || {}; 

    useEffect(() => {
        getBalance(walletId,mode).then(balance => setBalance(balance)).catch(err => console.log(err))
    },[])

    const sol = true
    const walletId = walletAddress
    
  return (
    <section className='main'>
        <div className="heading">
            <div className="heading--left">
                <h1>Wallet ID</h1>
                <p className="id">{walletId}</p>
            </div>
            <div className="heading--right">
                <button className='bttn--primary'>SEND</button>
                <button className='bttn--primary'>BUY</button>
                <button className='bttn--primary'>{mode}</button>
            </div>

        </div>

        <section className='details'>
            <div className="account--details">
                <h3>Account Details</h3>
                <div className="balance">
                    <p className="bal">Balance : 
                        {balance} <span>{
                            sol ? ' sol': ' eth'
                            }</span>
                        </p>
                </div>
            </div>
        </section>
    </section>
  )
}

export default AccountComp
