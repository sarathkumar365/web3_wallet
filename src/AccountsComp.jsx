import React, { useState } from 'react';
import './css/accounts.css';
import ethIcon from './icons/ethereum.png';
import solIcon from './icons/solana.png';

function Accounts(props) {    

  const address = props.data.address ? props.data.address : ''
  const [showFullAddress, setShowFullAddress] = useState(false);
  
  // Tooltip visibility state
  const [showTooltip, setShowTooltip] = useState(false);

  const truncateAddress = (address) => {
    
    return `${address.slice(0,5)}.....${address.slice(-4)}`
  }

  const handleAddressClick = () => {
    setShowFullAddress((prev) => !prev);

    setTimeout(() => {
      setShowFullAddress(false)
    }, 5000);
};



  return (
    <>
      <section className='account container'>
        <div className="acc--info flex">
          <div className="icon">
            <img src={props.data.eth ? ethIcon : solIcon} alt="Ethereum Icon" className="eth-icon" style={{ width: 28, height: 28 }} />
          </div>

          <div className="info">
            <p className="name">Account Name</p>

            {/* Truncated Ethereum address with hover tooltip */}
            <div className="address-container"
                onMouseEnter={() => setShowTooltip(true)} 
                onMouseLeave={() => setShowTooltip(false)} 
                style={{ cursor: 'pointer' }}> 
              
                <p onClick={handleAddressClick} className="address">
                  {showFullAddress ? props.data.address : truncateAddress(address)}
                  </p>

                {showTooltip && (
                  <div className="tooltip" style={{ opacity: showTooltip ? 1 : 0 }}>
                    Show your public key
                  </div>
                )}

            </div>

          </div>
        </div>

        <div className="acc--details">
          <p className="balance">$<span>0</span> ETH</p>
          <p className="usd">$<span>0</span> USD</p>
        </div>

        <div className="actions">
          <button className="bttn-primary">BUY/SELL</button>
          <button className="bttn-primary">SEND</button>
        </div>
      </section>
    </>
  );
}

export default Accounts;
