import React, { useState } from 'react';
import './accounts.css';
import ethIcon from '../public/icons/ethereum.png';

function Accounts() {
  // Tooltip visibility state
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);

  // Full Ethereum address
  const fullAddress = "0x16314A5A57Fb3661c7b0DF598f1459985B56866B";

  // Function to truncate the Ethereum address
  const truncateAddress = (address) => {
    return `${address.slice(0, 5)}.................${address.slice(-4)}`;
  };

  const handleAddressClick = () => {
    setIsFullAddressVisible(!isFullAddressVisible);
  };

  return (
    <>
      <section className='account container'>
        <div className="acc--info flex">
          <div className="icon">
            <img src={ethIcon} alt="Ethereum Icon" className="eth-icon" style={{ width: 28, height: 28 }} />
          </div>

          <div className="info">
            <p className="name">Account Name</p>

            {/* Truncated Ethereum address with hover tooltip */}
            <div className="address-container"
                onMouseEnter={() => setShowTooltip(true)} 
                onMouseLeave={() => setShowTooltip(false)} 
                style={{ cursor: 'pointer' }}> 
              
                <p className="address">0x.................866B</p>

                {showTooltip && (
                  <div className="tooltip" style={{ opacity: showTooltip ? 1 : 0 }}>
                    Show your private key
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
