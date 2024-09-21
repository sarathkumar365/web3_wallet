import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MnemonicGenerator from './MnemonicGenerator';
import WalletPage from './WalletPage';  // Wallet page component
import './App.css';


function App() {
  const [createWallet, setCreateWallet] = useState(false);
  
  return (
    <Router>
      <div className="main">
        <Routes>
          {/* Home Page with Create Wallet */}
          <Route path="/" element={
            createWallet ? (
              <MnemonicGenerator />
            ) : (
              <>
                <h1>Welcome to web3 Wallet</h1>
                <div className="button-container">
                  <button className='bttn-primary' onClick={() => setCreateWallet(true)}>
                    Create your Wallet
                  </button>
                </div>
              </>
            )
          } />

          {/* Wallet Page Route */}
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
