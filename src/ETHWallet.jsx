import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import './wallet.css'

function ETHWallet(props) {
  
  const handleCopy = () => {
    const text = document.getElementById('accountAddress').innerText;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };


  return (
    <>
            <div className="container eth">
                <div className="wallet-page flex">
                    <section className="wallet-section">
                       <div className="info--section">
                          <p>Account 1</p>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p id="accountAddress" style={{ marginRight: '10px' }}>
                              {props.publicKey}
                            </p>
                            <FontAwesomeIcon
                              icon={faCopy}
                              className="copy-icon"
                              onClick={handleCopy}
                            />
                          </div>
                        </div>

                       <div className="details--section">
                        <p>0 ETH</p>
                        <p>0 USD</p>
                       </div>

                       <div className="actions--section flex">
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
