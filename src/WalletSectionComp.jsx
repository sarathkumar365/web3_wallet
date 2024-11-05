import React from 'react'
import deleteIcon from './icons/delete.png'


function WalletSectionComp(walletDetails) {
    

  return (
    <>
        <section className='wallets--section flex'>
            <div className="wallet">
                <div className="row--1 flex">
                    <div className="wallet--id">{walletDetails.data.walletId}</div>
                    <div className="delete">
                        {/* <img src={deleteIcon} alt="delete icon" /> */}
                        <button className='bttn--primary flex delete--bttn'>Delete Wallet  
                            <img src={deleteIcon} alt="delete bttn" />
                        </button>
                    </div>
                </div>

                <div className="row--2">
                    <p className="key">{walletDetails.data.address}</p>
                </div>

                <div className="row--3 flex">
                    <button className='bttn--primary'>BUY / SELL</button>
                    <button className='bttn--primary'>SEND</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default WalletSectionComp
