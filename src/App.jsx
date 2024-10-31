import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link , useNavigate} from 'react-router-dom';
import { retriveExistingWallets } from './addressManagement';
import MnemonicGenerator from './MnemonicGenerator';
// import WalletPage from './WalletPage';  
import WalletPage from './newWalletPage';
import './App.css';


function App() {

  const navigate = useNavigate()

  const [createWallet, setCreateWallet] = useState(false);

  // check is wallets exists
  // useEffect(() => {
  //   const walletExists = retriveExistingWallets()
  //   if(walletExists) navigate('/wallet')
  // },[])

  return (
    // <Router>
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
    // </Router>
  );
  
}

export default App;
