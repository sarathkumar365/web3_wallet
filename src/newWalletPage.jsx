import { React, useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { retriveExistingWallets,storeWallets } from './addressManagement';

import './newWalletPage.css'
import deleteIcon from './icons/delete.png'
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

function newWalletPage() {
  return (
    <>
        <nav className='navbar flex'>
            <div className="logo">
                myst
            </div>

            <div className="add--wallet">
                <button className='bttn--primary'>ADD WALLET</button>
            </div>
        </nav>

        <section className='wallets--section flex'>
            <div className="wallet">
                <div className="row--1 flex">
                    <div className="wallet--id">Wallet 1</div>
                    <div className="delete">
                        {/* <img src={deleteIcon} alt="delete icon" /> */}
                        <button className='bttn--primary flex delete--bttn'>Delete Wallet  
                            <img src={deleteIcon} alt="delete bttn" />
                        </button>
                    </div>
                </div>

                <div className="row--2">
                    <p className="key">0x3bFf3Dcd5D0aBC3E06A9eBf93FcED3a2aD62D491</p>
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

export default newWalletPage
