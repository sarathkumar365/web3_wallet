import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link , useNavigate} from 'react-router-dom';
import { retriveExistingWallets } from './addressManagement';
import MnemonicGenerator from './MnemonicGenerator';
import AccountPage from './AccountComp';  
import WalletPage from './newWalletPage';
import './css/App.css';


function App() {

  const currentPath = window.location.pathname;

  const navigate = useNavigate()

  const [createWallet, setCreateWallet] = useState(false);

  // check is wallets exists
  useEffect(() => {
    const walletExists = retriveExistingWallets()

    // if(walletExists.eth.length === 0 || walletExists.sol.length === 0) navigate('/')
    
    // if(walletExists.eth.length > 0 || walletExists.sol.length > 0) navigate('/wallet')

    // Dont redirect if on account page
    if(currentPath !== '/account') {
      if(walletExists.eth.length === 0 || walletExists.sol.length === 0) {
        navigate('/')
      } else {
        navigate('/wallet')
      }
    }

  },[])

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
          <Route path="/account" element={<AccountPage />} />

        </Routes>
      </div>
    // </Router>
  );
  
}

export default App;
