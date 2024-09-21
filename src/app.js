const {generateMnemonic,mnemonicToSeed, mnemonicToSeedSync} = require("bip39");
const { Keypair, PublicKey } = require("@solana/web3.js")
const {BIP32Factory} = require('bip32')
const ecc = require('@bitcoinerlab/secp256k1')
const bip32 = BIP32Factory(ecc)
const nacl = require('tweetnacl');
const  {derivePath}  =  require("ed25519-hd-key");
const { hdkey } = require('ethereumjs-wallet');  // Ethereum HD wallet
const { publicToAddress } = ('ethereumjs-util');  // For Ethereum address
const { keccak256 } = ('js-sha3');  // Ethereum uses Keccak-256 hashing

// Store the state values
const path = "m/44'/501'/0'/0'"; // Derivation path for Solana
const ethDerivationPath = "m/44'/60'/0'/0/0"; //Derivation path for eth
// Mnemonic -> Seed -> Master Key -> Private Key

// STEP 1 : Generate a Mnemonic Phrase

// Generate a 12 word mnemonic
const mnemonic = generateMnemonic()
console.log('Generated Mnemonic : ', mnemonic);

// STEP 2 : Derive Public/Private Key Pairs

// Convert Mnemonic to Seed
const generateSeedFromMnemonic = () => {
    const seed = mnemonicToSeedSync(mnemonic)
    // console.log('Seed Phrase : ', seed);
    return seed;
}

const seed = generateSeedFromMnemonic()

const genSolanaWallet = () => {
    
// Why do we need to convert seed to derivedSeed ?
const derivedSeed = derivePath(path,seed.toString('hex')).key

// Derive private and public key from the seed
const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
console.log("Private Key:", keyPair.secretKey);
console.log("Public Key:", keyPair.publicKey);

// STEP 3 : Generate Wallet Addresses

const solanaKeypair = Keypair.fromSecretKey(keyPair.secretKey);
return solanaKeypair.publicKey.toBase58();
}

const genEthWallet = () => {

    // Derive eth keypairs
    const derivationPath = ethDerivationPath;
    const hdWallet = hdkey.fromMasterSeed(seed);

    // Derive the private and public keys from the Ethereum derivation path
    const wallet = hdWallet.derivePath(derivationPath).getWallet();
    const privateKey = wallet.getPrivateKey().toString('hex');
    const publicKey = wallet.getPublicKey().toString('hex');

    // Generate Ethereum Wallet Address
    const publicKeyBuffer = wallet.getPublicKey() // Get public key as a buffer
    const addressBuffer = publicToAddress(publicKeyBuffer,true);
    const ethAddress = `0x${addressBuffer.toString('hex')}`;

    return ethAddress

}

const solWallet = genSolanaWallet()
const ethWallet = genSolanaWallet()

console.log("Solana Wallet Address:", solWallet);
console.log("Ethereum Wallet Address:", ethWallet);

// STEP 4 : Create a User Interface (UI) for the Wallet
// Step 5: Integrate the Wallet with Solana Blockchain
