import React, { useState } from 'react'
import './account.css'
import { useSearchParams } from 'react-router-dom'

function AccountComp() {

    const [mode,setMode] = useState('Testnet')

    const sol = true
    const walletId = 'dsfdhgfbskfmsd89yhdj3b'
    const walletBal = 2

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
                        {walletBal} <span>{
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
