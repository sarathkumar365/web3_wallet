import React from 'react'
import './App.css'
import './wallet.css'

function ETHWallet() {


  return (
    <>
            <div className="container eth">
                <div className="wallet-page flex">
                    <section className="wallet-section">
                       <div className="info--section">
                            <h2>test wallet</h2>
                            <p>0x0064390Fa428a0470bF3c4C5cCB518611d7ac1a7</p>
                       </div>
                       <div className="details--section">
                        <p>0 ETH</p>
                        <p>0 USD</p>
                       </div>

                       <div className="actions--section">
                            <button className='bttn-primary'>BUY/SELL</button>
                            <button className='bttn-primary'>SEND</button>
                       </div>
                    </section>
                </div>
            </div>
    </>
  )
}

export default ETHWallet
