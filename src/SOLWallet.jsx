import React from 'react'
import './App.css'
import './wallet.css'

function SOLWallet(props) {
  
  return (
    <>
      
            <div className="container sol">
                <div className="wallet-page flex">
                    <section className="wallet-section">
                       <div className="info--section">
                            <h2>test wallet</h2>
                            <p>{props.publicKey}</p>
                       </div>
                       <div className="details--section">
                        <p>0 SOL</p>
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

export default SOLWallet
