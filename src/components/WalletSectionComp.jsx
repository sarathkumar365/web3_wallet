import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

import deleteIcon from '../icons/delete.png'


function WalletSectionComp(walletDetails) {

    const navigate = useNavigate()


    const goToAccount = () => {                
        const data = { walletAddress : walletDetails.data.address };
        navigate('/account', {state : data}); // Navigates to /account
      };
    

  return (
    <>
        <section className='wallets--section flex'>
            <div className="wallet">
                <div className="row--1 flex">
                    <div className="wallet--id">{walletDetails.data.walletId}</div>
                    <div className="right">
                        <div className="viewAccount">
                            {/* <Link to={'account'}> */}
                                <button onClick={goToAccount} className='bttn--primary flex delete--bttn'>View Account  
                                </button>
                            {/* </Link> */}
                        </div>
                        <div className="delete">
                            {/* <img src={deleteIcon} alt="delete icon" /> */}
                            <button className='bttn--primary flex delete--bttn'>Delete Wallet  
                                <img src={deleteIcon} alt="delete bttn" />
                            </button>
                        </div>
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
