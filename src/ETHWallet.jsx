import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy,faEye } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import './wallet.css'

function ETHWallet(props) {
  
  const [showAddress, setShowAddress] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('accountAddress').innerText;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleRevealClick = () => {
    setShowAddress(!showAddress);
};


  return (
    <>
            <div className="container eth">
                <div className="wallet-page flex">
                    <section className="wallet-section">
                    <div className="info--section">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p>Acc 1</p>
                          <FontAwesomeIcon
                              icon={faEye}
                              className="reveal-icon"
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                              onClick={handleRevealClick}
                              style={{ marginLeft: '10px', cursor: 'pointer' }}
                          />
                          {showTooltip && (
                              <span className="tooltip">Show your public key</span>
                          )}
                          {showAddress && (
                              <p style={{ marginLeft: '10px' }}>{props.publicKey}</p>
                          )}
                          <FontAwesomeIcon
                              icon={faCopy}
                              className="copy-icon"
                              onClick={handleCopy}
                              style={{ marginLeft: '10px', cursor: 'pointer' }}
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
