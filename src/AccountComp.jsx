import React from 'react'
import './account.css'

function AccountComp() {

    const sol = true
    const walletId = 'dsfdhgfbskfmsd89yhdj3b'

  return (
    <section className='main'>
        <div className="heading">
            <h1>Wallet ID</h1>
            <p className="id">{walletId}</p>
        </div>

        <div className="action--bttns">
            <button className='bttn--primary'>SEND</button>
            <button className='bttn--primary'>BUY</button>
        </div>

        <div className="account--details">
            <h3>Account Details</h3>
            <div className="balance">
                <p className="bal">
                    1<span>{
                        sol ? ' sol': ' eth'
                        }</span>
                    </p>
            </div>
        </div>
    </section>
  )
}

export default AccountComp
