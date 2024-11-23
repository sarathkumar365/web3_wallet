import React from 'react'
import './account.css'

function AccountComp() {

  return (
    <section className='main'>
        <div className="heading">
            <h1>Wallet ID</h1>
            <p className="id">dsfdhgfbskfmsd89yhdj3b</p>
        </div>

        <div className="action--bttns">
            <button className='bttn--primary'>SEND</button>
            <button className='bttn--primary'>BUY</button>
        </div>

        <div className="account--details">
            <div className="balance">
                <p className="bal">1<span>sol</span></p>
            </div>
        </div>
    </section>
  )
}

export default AccountComp
