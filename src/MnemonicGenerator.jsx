import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import './App.css'
// import * as bip39 from "bip39";

 
const MnemonicGenerator = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [showBanner, setShowBanner] = useState(false);

    const handleGenerateMnemonics = () => {
        console.log('Generate Mnemonics');
        
        try {
            const newMnemonics = generateMnemonic();
            setMnemonic(newMnemonics);
            localStorage.setItem('mnemonic', newMnemonics);
            console.log("Mnemonics stored in local storage");
        } catch (error) {
            console.error("Error generating mnemonics:", error);
        }
    };

    const generateSeedFromMnemonic = () => {
        try {
            return mnemonicToSeedSync(mnemonic);
        } catch (error) {
            console.error("Error generating seed from mnemonic:", error);
            return null;
        }
    };
    
    const seed = mnemonic ? generateSeedFromMnemonic() : null;
    

    return (
        <>
            <div className="panel">
                {mnemonic ? <p>Your mnemonics are:</p> : <p>Click here to generate your Mnemonics</p>}
                {!mnemonic && (
                    <div className="button-container">
                        <button className='bttn-primary' onClick={handleGenerateMnemonics}>Generate Mnemonic</button>
                    </div>
                )}
            </div>

            {mnemonic && (
                <div className="mnemonics-container">
                    {mnemonic.split(' ').map((word, index) => (
                        <div className="mnemonic-box" key={index}>
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
            )}

            {mnemonic && (
                <div className="button-container">
                    <button className='bttn-primary' onClick={() => {
                        setShowBanner(true);
                        setTimeout(() => setShowBanner(false), 3000);
                        navigator.clipboard.writeText(mnemonic).then(() => {
                            console.log("Copied to clipboard!");
                        }).catch(err => {
                            console.error('Failed to copy to clipboard!');
                        });
                    }}>
                        Copy to Clipboard
                    </button>

                    <Link to='wallet' state={{ seed }}>
                        <button className='bttn-primary'>Go to Your Wallet</button>
                    </Link>
                </div>
            )}

            {showBanner && <div className="success-banner">Successfully copied!</div>}
        </>
    );
};

export default MnemonicGenerator;
